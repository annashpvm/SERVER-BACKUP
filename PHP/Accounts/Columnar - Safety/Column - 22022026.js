Ext.onReady(function () {

    var pageSize = 40;
    var grid, store, allData = [];

    Ext.Ajax.request({
        url: 'Data.php',
        success: function (resp) {

            var obj = Ext.decode(resp.responseText);
            allData = obj.data;

            Ext.each(obj.columns, function (col) {

                var oldRenderer = col.renderer;

                col.renderer = function (value, meta, record) {

                    var v = value;

                    if (oldRenderer) {
                        v = oldRenderer(value, meta, record);
                    }

                    if (record && record.get('__isTotal') === true) {
                        meta.css = 'total-cell';
                        return v === '' || v === null ? '&nbsp;' : v;
                    }
                    return v;
                };

                if (col.isAmount === true) {
                    col.align = 'right';
                }
            });

            store = new Ext.data.JsonStore({
                fields: Ext.pluck(obj.columns, 'dataIndex'),
                data: []
            });

            grid = new Ext.grid.GridPanel({
                store: store,
                columns: obj.columns,
                renderTo: Ext.getBody(),
                width: 1200,
                height: 600,
                title: 'COLUMNAR ',
                autoScroll: true,
                listeners:{	

                    'rowDblclick': function (grid, rowIndex, cellIndex, e) {

                            var sm = grid.getSelectionModel();
                            var selrow = sm.getSelected();
                            alert(selrow.get('accref_seqno'));

             
                     } },                     

                /* ✅ EXPORT BUTTONS */
                tbar: [
                    {
                        text: 'Export Excel',
                        handler: function () {
                            exportGrid('excel');
                        }
                    },
                    '-',
                    {
                        text: 'Export PDF',
                        handler: function () {
                            exportGrid('pdf');
                        }
                    }
                ],

                bbar: new Ext.PagingToolbar({
                    pageSize: pageSize,
                    store: store,
                    displayInfo: true,
                    doLoad: function (start) {
                        loadPage(start);
                    }
                })
            });

            loadPage(0);
        }
    });

    /* ===============================
       PAGE LOAD + TOTAL
       =============================== */
    function loadPage(start) {

        var pageData = allData.slice(start, start + pageSize);

        var totals = {};
        var numericCols = [];

        Ext.each(grid.getColumnModel().config, function (col) {
            if (col.isAmount === true) {
                totals[col.dataIndex] = 0;
                numericCols.push(col.dataIndex);
            }
        });

        Ext.each(pageData, function (row) {
            Ext.each(numericCols, function (f) {
                totals[f] += parseFloat(row[f] || 0);
            });
        });

        var totalRow = {};
        Ext.each(grid.getColumnModel().config, function (col, i) {
            if (i === 0) {
                totalRow[col.dataIndex] = 'TOTAL';
            } else if (totals[col.dataIndex] !== undefined) {
                totalRow[col.dataIndex] = totals[col.dataIndex];
            } else {
                totalRow[col.dataIndex] = '';
            }
        });

        totalRow.__isTotal = true;
        pageData.push(totalRow);

        store.loadData(pageData);
        store.totalLength = allData.length;
        grid.getBottomToolbar().updateInfo();
    }

    /* ===============================
       ✅ EXPORT FUNCTION (FIXED)
       =============================== */
       function exportGrid(type) {

        var cleanColumns = [];
    
        Ext.each(grid.getColumnModel().config, function (c) {
    
            cleanColumns.push({
                header: c.header,
                dataIndex: c.dataIndex,
                align: c.align || 'left',
                isAmount: c.isAmount === true
            });
        });
    
        Ext.Ajax.request({
            url: 'export_' + type + '.php',
            method: 'POST',
            params: {
                columns: Ext.encode(cleanColumns),
                data: Ext.encode(allData)
            },
            success: function (resp) {
                var obj = Ext.decode(resp.responseText);
                if (obj.file) {
                    window.open(obj.file);
                }
            }
        });
    }

});