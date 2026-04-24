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

                    var keyUpper = key.toUpperCase();

 
                    /* fields that should NEVER be totaled */
                    var nonAmount =
                        keyUpper.indexOf('QTY') !== -1 ||
                        keyUpper.indexOf('RATE') !== -1 ||
                        keyUpper.indexOf('UOM') !== -1 ||
                        keyUpper.indexOf('NO') !== -1 ||
                        keyUpper.indexOf('DATE') !== -1 ||
                        keyUpper.indexOf('GSTIN') !== -1;
                    
                    /* detect numeric column from data */
                    var numericValue =
                        value !== null &&
                        value !== '' &&
                        !isNaN(value);
                    
                    /* FINAL decision */
                    var isAmount = numericValue && !nonAmount;

                    columns.push({
                        header: keyUpper,
                        dataIndex: key,
                        width: 120,
                        align: isAmount ? 'right' : 'left',
                        isAmount: isAmount,
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
    
        /* collect amount columns */
        Ext.each(grid.getColumnModel().config, function (col) {
            if (col.isAmount === true) {
                totals[col.dataIndex] = 0;
            }
        });
    
        /* sum values safely */
        Ext.each(pageData, function (row) {
            Ext.iterate(totals, function (k) {
                var v = parseFloat(row[k]);
                if (!isNaN(v)) {
                    totals[k] += v;
                }
            });
        });
    
        /* build TOTAL row */
        var totalRow = {};
    
        Ext.each(grid.getColumnModel().config, function (col, i) {
    
            if (i === 0) {
                totalRow[col.dataIndex] = 'TOTAL';
            }
            else if (totals[col.dataIndex] !== undefined) {
                totalRow[col.dataIndex] = totals[col.dataIndex].toFixed(2);
            }
            else {
                totalRow[col.dataIndex] = '';
            }
        });
    
        totalRow.__isTotal = true;
        pageData.push(totalRow);
    
        store.loadData(pageData);
        store.totalLength = allData.length;
        grid.getBottomToolbar().updateInfo();
    }


    function loadPage(start) {

        var pageData = allData.slice(start, start + pageSize);
        var totals = {};
    
        /* collect amount columns */
        Ext.each(grid.getColumnModel().config, function (col) {
            if (col.isAmount === true) {
                totals[col.dataIndex] = 0;
            }
        });
    
        /* sum values safely */
        Ext.each(pageData, function (row) {
            Ext.iterate(totals, function (k) {
                var v = parseFloat(row[k]);
                if (!isNaN(v)) {
                    totals[k] += v;
                }
            });
        });
    
        /* build TOTAL row */
        var totalRow = {};
    
        Ext.each(grid.getColumnModel().config, function (col, i) {
    
            if (i === 0) {
                totalRow[col.dataIndex] = 'TOTAL';
            }
            else if (totals[col.dataIndex] !== undefined) {
                totalRow[col.dataIndex] = totals[col.dataIndex].toFixed(2);
            }
            else {
                totalRow[col.dataIndex] = '';
            }
        });
    
        totalRow.__isTotal = true;
        pageData.push(totalRow);
    
        store.loadData(pageData);
        store.totalLength = allData.length;
        grid.getBottomToolbar().updateInfo();
    }
    

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

        var filename = "http://10.0.0.251/SHVPM/Report/columnar_report.xls";
        Ext.Ajax.request({
            url: 'export_' + type + '.php',
            method: 'POST',
            params: {
                columns: Ext.encode(cleanColumns),
                data: Ext.encode(allData),
                fname: filename
            },
            success: function (resp) {
                var findUrl =  filename;
                var redirectWindow = window.open(findUrl, '_blank');
                redirectWindow.location;
            }
        });
    }


});