Ext.onReady(function () {

    var pageSize = 40;
    var grid = null;
    var store = null;
    var allData = [];

    /* ===============================
       NUMBER FIELD + BUTTON
       =============================== */

    var fromDate = new Ext.form.DateField({
        width: 110,
        format: 'd-m-Y',
        emptyText: 'From Date',
        style: 'margin-right:10px'
    });
    
    var toDate = new Ext.form.DateField({
        width: 110,
        format: 'd-m-Y',
        emptyText: 'To Date',
        style: 'margin-right:10px'
    });       
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
        tbar: [
            'Number : ', txtSearch,
            'From : ', fromDate,
            'To : ', toDate,
            btnLoad
        ]
    });

    /* ===============================
       LOAD DATA
       =============================== */
    function loadData() {

        Ext.Ajax.request({
            url: 'Data.php',
            method: 'POST',
            params: {
                search: txtSearch.getValue(),
                fromdate  : Ext.util.Format.date(fromDate.getValue(),"Y-m-d"),
                todate    : Ext.util.Format.date(toDate.getValue(),"Y-m-d"),                
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
                        hidden: (keyUpper === 'ACCREF_SEQNO'),
                    
                        renderer: (function(isAmt) {
                            return function(v, meta, rec) {
                    
                                if (rec.get('__isTotal') === true) {
                                    meta.css = 'total-cell';
                                }
                    
                                // Hide zero in all numeric/amount columns
                                if (isAmt === true) {
                                    if (!v || parseFloat(v) === 0) {
                                        return '';
                                    }
                                }
                    
                                return (v === null || v === '') ? '&nbsp;' : v;
                            };
                        })(isAmount)
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
                                    exportGrid('excel','A4');
                                }
                            },
                            '-',
                            {
                                text: 'Export PDF',
                                handler: function () {
                                    Ext.Msg.show({
                                        title: 'Paper Size',
                                        msg: 'Select Paper Size:',
                                        buttons: {
                                            ok: 'A4',
                                            yes: 'LEGAL'
                                        },
                                        fn: function(btn) {
                            
                                            var paper = (btn === 'yes') ? 'LEGAL' : 'A4';
                                            exportGrid('pdf', paper);
                                        }
                                    });
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

    // Get current page data
    var pageData = allData.slice(start, start + pageSize);
    var totals = {};

    var cm = grid.getColumnModel();

    /* ==========================
       Collect numeric columns
       ========================== */
    Ext.each(cm.config, function (col, index) {

        // Skip hidden columns
        if (cm.isHidden(index)) return;

        if (col.isAmount === true) {
            totals[col.dataIndex] = 0;
        }
    });

    /* ==========================
       Calculate totals
       ========================== */
    Ext.each(pageData, function (row) {

        Ext.iterate(totals, function (key) {

            var value = parseFloat(row[key]);

            if (!isNaN(value)) {
                totals[key] += value;
            }
        });
    });

    /* ==========================
       Build TOTAL row
       ========================== */
    var totalRow = {};
    var labelPlaced = false;

    Ext.each(cm.config, function (col, index) {

        // Skip hidden columns
        if (cm.isHidden(index)) return;

        // Place TOTAL text in first non-amount column
        if (!labelPlaced && col.isAmount !== true) {
            totalRow[col.dataIndex] = 'TOTAL';
            labelPlaced = true;
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

    /* ==========================
       Load into store
       ========================== */
    store.loadData(pageData);
    store.totalLength = allData.length;
    grid.getBottomToolbar().updateInfo();
}
/*
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
                var v = parseFloat(row[k]);
                if (!isNaN(v)) {
                    totals[k] += v;
                }
            });
        });
    

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

*/


function loadPage(start) {

    // Get current page data
    var pageData = allData.slice(start, start + pageSize);
    var totals = {};

    var cm = grid.getColumnModel();

    /* ==========================
       Collect numeric columns
       ========================== */
    Ext.each(cm.config, function (col, index) {

        // Skip hidden columns
        if (cm.isHidden(index)) return;

        if (col.isAmount === true) {
            totals[col.dataIndex] = 0;
        }
    });

    /* ==========================
       Calculate totals
       ========================== */
    Ext.each(pageData, function (row) {

        Ext.iterate(totals, function (key) {

            var value = parseFloat(row[key]);

            if (!isNaN(value)) {
                totals[key] += value;
            }
        });
    });

    /* ==========================
       Build TOTAL row
       ========================== */
    var totalRow = {};
    var labelPlaced = false;

    Ext.each(cm.config, function (col, index) {

        // Skip hidden columns
        if (cm.isHidden(index)) return;

        // Place TOTAL text in first non-amount column
        if (!labelPlaced && col.isAmount !== true) {
            totalRow[col.dataIndex] = 'GRAND TOTAL';
            labelPlaced = true;
        }
        else if (totals[col.dataIndex] !== undefined) {
            var upperName = col.dataIndex.toUpperCase();

            if (upperName.indexOf('QTY') !== -1) {
                totalRow[col.dataIndex] = totals[col.dataIndex].toFixed(3);
            } else {
                totalRow[col.dataIndex] = totals[col.dataIndex].toFixed(2);
            }
        }
        else {
            totalRow[col.dataIndex] = '';
        }
    });

    totalRow.__isTotal = true;

    pageData.push(totalRow);

    /* ==========================
       Load into store
       ========================== */
    store.loadData(pageData);
    store.totalLength = allData.length;
    grid.getBottomToolbar().updateInfo();
}


    function exportGrid(type, paper) {

        var millname = "SRI HARI VENKATESWARA PAPER MILLS (P) LTD";
        var heading = "REPORT FROM ";
        var fromdate = Ext.util.Format.date(fromDate.getValue(),"d-m-Y");
        var todate = Ext.util.Format.date(toDate.getValue(),"d-m-Y");


        var cleanColumns = [];
        var totals = {};
        var exportData = Ext.decode(Ext.encode(allData)); // clone data
    

        var cm = grid.getColumnModel();

        for (var i = 0; i < cm.getColumnCount(); i++) {

            if (!cm.isHidden(i)) {   // ✅ ONLY visible columns

                var c = cm.getColumnAt(i);

                cleanColumns.push({
                    header: c.header,
                    dataIndex: c.dataIndex,
                    align: c.align || 'left',
                    isAmount: c.isAmount === true
                });

                if (c.isAmount === true) {
                    totals[c.dataIndex] = 0;
                }
            }
        }
    
        // calculate GRAND TOTAL from FULL DATA (not page only)
        Ext.each(exportData, function (row) {
            Ext.iterate(totals, function (k) {
                var v = parseFloat(row[k]);
                if (!isNaN(v)) {
                    totals[k] += v;
                }
            });
        });
    
        // create grand total row
        var totalRow = {};
        var labelPlaced = false;

        Ext.each(cleanColumns, function (col) {
        
            if (!labelPlaced && col.isAmount !== true) {
                totalRow[col.dataIndex] = 'GRAND TOTAL';
                labelPlaced = true;
            }
            else if (totals[col.dataIndex] !== undefined) {
                totalRow[col.dataIndex] = totals[col.dataIndex].toFixed(2);
            }
            else {
                totalRow[col.dataIndex] = '';
            }
        });
    
        exportData.push(totalRow);
    
        // Create hidden form
        var form = document.createElement("form");
        form.method = "POST";
        form.action = "export_" + type + ".php";
        if (type === 'pdf') {
            form.target = "_blank";
        }
        var colInput = document.createElement("input");
        colInput.type = "hidden";
        colInput.name = "columns";
        colInput.value = Ext.encode(cleanColumns);
        form.appendChild(colInput);
    
        var dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = Ext.encode(exportData);
        form.appendChild(dataInput);
    
        var fileInput = document.createElement("input");
        fileInput.type = "hidden";
        fileInput.name = "fname";
        fileInput.value = "columnar_report";
        form.appendChild(fileInput);

        var paperInput = document.createElement("input");
        paperInput.type = "hidden";
        paperInput.name = "paper";
        paperInput.value = paper || 'A4';
        form.appendChild(paperInput);        
    

// mill name
var millInput = document.createElement("input");
millInput.type = "hidden";
millInput.name = "millname";
millInput.value = millname;
form.appendChild(millInput);

// heading
var headInput = document.createElement("input");
headInput.type = "hidden";
headInput.name = "heading";
headInput.value = heading;
form.appendChild(headInput);

// from date
var fromInput = document.createElement("input");
fromInput.type = "hidden";
fromInput.name = "fromdate";
fromInput.value = fromdate;
form.appendChild(fromInput);

// to date
var toInput = document.createElement("input");
toInput.type = "hidden";
toInput.name = "todate";
toInput.value = todate;
form.appendChild(toInput);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
});