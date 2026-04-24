Ext.onReady(function () {

    var pageSize = 40;
    var grid = null;
    var store = null;
    var allData = [];

    /* ===============================
       NUMBER FIELD + BUTTON
       =============================== */
    var txtSearch = new Ext.form.NumberField({
        width: 200,
        allowDecimals: false,
        allowNegative: false,
        emptyText: 'Enter number...',
        style: 'margin-right:10px'
    });

    var btnLoad = new Ext.Button({
        text: 'Load Data',
        handler: function () {
            if (!txtSearch.getValue()) {
                Ext.Msg.alert('Validation', 'Please enter a number');
                return;
            }
            loadData();
        }
    });

    new Ext.Panel({
        renderTo: Ext.getBody(),
        border: false,
        padding: 10,
        tbar: ['Number : ', txtSearch, btnLoad]
    });

    /* ===============================
       LOAD DATA
       =============================== */
    function loadData() {

        Ext.Ajax.request({
            url: 'Data.php',
            method: 'POST',
            params: {
                search: txtSearch.getValue()
            },
            success: function (resp) {

                var obj = Ext.decode(resp.responseText);
                allData = obj.data || [];

                if (allData.length === 0) {
                    Ext.Msg.alert('Info', 'No data found');
                    return;
                }

                /* ===============================
                   BUILD COLUMNS DYNAMICALLY
                   =============================== */
                var fields = [];
                var columns = [];

                Ext.iterate(allData[0], function (key, value) {

                    fields.push({ name: key });

                    var isNumber = Ext.isNumber(value);

                    columns.push({
                        header: key.toUpperCase(),
                        dataIndex: key,
                        width: 120,
                        align: isNumber ? 'right' : 'left',
                        isAmount: isNumber === true,
                        renderer: function (v, meta, rec) {
                            if (rec.get('__isTotal') === true) {
                                meta.css = 'total-cell';
                            }
                            return v === null || v === '' ? '&nbsp;' : v;
                        }
                    });
                });

                /* ===============================
                   CREATE GRID ONCE
                   =============================== */
                if (!store) {

                    store = new Ext.data.JsonStore({
                        fields: fields,
                        data: []
                    });

                    grid = new Ext.grid.GridPanel({
                        renderTo: Ext.getBody(),
                        store: store,
                        columns: columns,
                        width: 1200,
                        height: 600,
                        title: 'COLUMNAR REPORT',
                        autoScroll: true,

                        listeners: {
                            rowdblclick: function (g, rowIndex) {
                                var rec = g.getStore().getAt(rowIndex);
                                alert(rec.get('accref_seqno'));
                            }
                        },

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

                } else {
                    grid.reconfigure(store, columns);
                }

                loadPage(0);
            }
        });
    }

    /* ===============================
       PAGING + TOTAL ROW
       =============================== */
    function loadPage(start) {

        var pageData = allData.slice(start, start + pageSize);
        var totals = {};

        Ext.each(grid.getColumnModel().config, function (col) {
            if (col.isAmount === true) {
                totals[col.dataIndex] = 0;
            }
        });

        Ext.each(pageData, function (row) {
            Ext.iterate(totals, function (k) {
                totals[k] += parseFloat(row[k] || 0);
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
       EXPORT
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