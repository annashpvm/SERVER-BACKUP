Ext.onReady(function () {


    var Gincompcode = localStorage.getItem('gincompcode');
    var GinFinid = localStorage.getItem('ginfinid');
    var finstartdate = localStorage.getItem('gfinstdate');
    var finenddate  = localStorage.getItem('gfineddate');
 
    var yearfin  = localStorage.getItem('gstyear'); 
 
    var yr  = localStorage.getItem('gstyear');
 
    var yrfrom = yr.substr(0,4);  
    var yrto  = yr.substr(5,4);  
    var printtype='PDF';

    var companyName = 'SRI HARI VENKATESWARA PAPER MILLS (P) LTD';
    function printTree() {

        var from = Ext.Date.format(fromDateField.getValue(), 'd-m-Y');
        var to   = Ext.Date.format(toDateField.getValue(), 'd-m-Y');
    
        var html = '<html><head><title>Trial Balance</title>';
    
        html += '<style>';
    
        // 🔥 GENERAL FONT (Reduced)
        html += 'body{font-family:Arial;font-size:10px;}';
    
        // 🔥 TABLE
        html += 'table{border-collapse:collapse;width:100%;}';
        html += 'th,td{padding:4px;}';
        html += '.right{text-align:right;}';
    
        // 🔥 HEADER LINES (TOP & BOTTOM)
        html += '.report-header{';
        html += 'text-align:center;';
        html += 'border-top:2px solid black;';
        html += 'border-bottom:2px solid black;';
        html += 'padding:5px 0;margin-bottom:10px;';
        html += '}';
    
        // 🔥 REPEAT HEADER EVERY PAGE
        html += 'thead{display:table-header-group;}';
    
        // 🔥 PAGE NUMBER
        html += '@media print {';
        html += '  .pagenum:after {';
        html += '    content: "Page " counter(page);';
        html += '  }';
        html += '}';
    
        html += '</style></head><body>';
    
        // ✅ HEADER (WITH LINES)
        html += '<div class="report-header">';
        html += '<div><b>SRI HARI VENKATESWARA PAPER MILLS (P) LTD</b></div>';
        html += '<div><b>Trial Balance</b></div>';
        html += '<div>For the period from ' + from + ' to ' + to + '</div>';
        html += '</div>';
    
        // ✅ TABLE START
        html += '<table>';
    
        // 🔥 THEAD → repeats on every page
        html += '<thead>';
        html += '<tr>';
        html += '<th align="left">Particulars</th>';
        html += '<th align="right">Debit</th>';
        html += '<th align="right">Credit</th>';
        html += '</tr>';
        html += '</thead>';
    
        html += '<tbody>';
    
        var root = tree.getRootNode();
    
        root.cascadeBy(function(node) {
    
            if (node.isRoot()) return;
            if (!node.isVisible()) return;
    
            var text = node.get('text');
            var closing = parseFloat(node.get('closing')) || 0;
    
            var debit = '';
            var credit = '';
    
            if (closing > 0) {
                debit = formatIndianNumber(closing);
            } else if (closing < 0) {
                credit = formatIndianNumber(Math.abs(closing));
            }
    
            var indent = node.getDepth() * 20;
    
            html += '<tr>';
            html += '<td style="padding-left:' + indent + 'px;">' + text + '</td>';
            html += '<td class="right">' + debit + '</td>';
            html += '<td class="right">' + credit + '</td>';
            html += '</tr>';
        });
    
        // ✅ TOTAL
        html += '<tr style="font-weight:bold;border-top:1px solid black;">';
        html += '<td>Total</td>';
        html += '<td class="right">' + tree.down('#debitTotal').getValue() + '</td>';
        html += '<td class="right">' + tree.down('#creditTotal').getValue() + '</td>';
        html += '</tr>';
    
        html += '</tbody></table>';
    
        // 🔥 PAGE NUMBER DISPLAY
        html += '<div class="pagenum" style="text-align:right;margin-top:10px;"></div>';
    
        html += '</body></html>';
    
        var win = window.open('', '', 'width=900,height=700');
        win.document.write(html);
        win.document.close();
        win.print();
    }

    function formatIndianNumber(x) {
        if (!x) return '';
    
        x = parseFloat(x).toFixed(2);
        var parts = x.split('.');
        var intPart = parts[0];
        var decimal = parts[1];
    
        var lastThree = intPart.substring(intPart.length - 3);
        var otherNumbers = intPart.substring(0, intPart.length - 3);
    
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
    
        var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    
        return result + '.' + decimal;
    }
    Ext.create('Ext.container.Container', {
        renderTo: Ext.getBody(),
        layout: {
            type: 'hbox',
            pack: 'end'   // 🔥 moves items to RIGHT
        },
        width: 1100,      // same as your main panel (important)
        margin: '10 10 5 10',
    
        items: [
            {
                xtype: 'button',
                text: 'Expand All',
                width: 120,
                handler: function () {
                    tree.expandAll();
                }
            },
            {
                xtype: 'button',
                text: 'Collapse All',
                width: 120,
                margin: '0 0 0 10',
                handler: function () {
                    tree.collapseAll();
                }
            },
            {
                xtype: 'button',
                text: 'Print',
                margin: '0 0 0 10',
                width: 100,
                handler: function () {
                    printTree();
                }
            }
        ]
    });

    // ✅ MODEL
    Ext.define('TrialBalanceModel', {
        extend: 'Ext.data.Model',
        fields: [
            'text','debit','credit','closing',
            'level','mgrpcode','subgrp','subgrp2'
        ]
    });

var parsedDate = Ext.Date.parse(finstartdate, 'd-m-Y') ||
                 Ext.Date.parse(finstartdate, 'Y-m-d') ||
                 new Date(finstartdate);

var fromDateField = Ext.create('Ext.form.field.Date', {
    fieldLabel: 'From Date',
    labelWidth: 70,
    format: 'd-m-Y',
    value: parsedDate || new Date(),
    width: 180
});



    var toDateField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'To Date',
        labelWidth: 60,
        format: 'd-m-Y',
        value: new Date(),
        width: 170,

        listeners: {
            change: function(field, newValue, oldValue) {
    
                // optional validation
                if (!newValue) {
                    return;
                }
    
                // 🔥 reload store
                store.load();
            }
        }        
    });


    var totalDebitField = Ext.create('Ext.form.field.Display', {
        value: '0.00',
        width: 150
    });
    
    var totalCreditField = Ext.create('Ext.form.field.Display', {
        value: '0.00',
        width: 150
    });

    // ✅ STORE
    var store = Ext.create('Ext.data.TreeStore', {
        model: 'TrialBalanceModel',

        proxy: {
            type: 'ajax',
            url: 'getTrialBalanceTree.php',
            reader: {
                type: 'json',
                root: 'children'
            },
            extraParams: {
                level: 'GROUP',
                finid: 25,
                compcode: 1,
                startdate: '',
                enddate: ''
            }
        },

        root: {
            text: 'Root',
            expanded: true,
            level: 'GROUP'
        },

        listeners: {
            beforeload: function (store, operation) {

                var node = operation.node;

                // 🔥 dynamic hierarchy params
                store.getProxy().extraParams.level    = node.get('level') || 'GROUP';
                store.getProxy().extraParams.mgrpcode = node.get('mgrpcode') || 0;
                store.getProxy().extraParams.subgrp   = node.get('subgrp') || 0;
                store.getProxy().extraParams.subgrp2  = node.get('subgrp2') || 0;

                // ✅ SAFE date access
                var from = fromDateField.getValue();
                var to   = toDateField.getValue();
                var finDateObj = Ext.Date.parse(finstartdate, 'd-m-Y') || 
                 Ext.Date.parse(finstartdate, 'Y-m-d');

                
                 store.getProxy().extraParams.finid = GinFinid;
                 store.getProxy().extraParams.compcode = Gincompcode;
                if (from && to && finDateObj) {
                    store.getProxy().extraParams.startdate = Ext.Date.format(from, 'Y-m-d');
                    store.getProxy().extraParams.enddate   = Ext.Date.format(to, 'Y-m-d');
                    store.getProxy().extraParams.finfirstdate = Ext.Date.format(finDateObj, 'Y-m-d');
                }
            }
        }
    });
    
    store.on('load', function(store) {

        var totalDebit = 0;
        var totalCredit = 0;
    
        var root = store.getRootNode();
    
        root.eachChild(function(node) {   // ✔ ONLY top-level nodes
    
            var closing = parseFloat(node.get('closing')) || 0;
    
            if (closing > 0) {
                totalDebit += closing;
            } else if (closing < 0) {
                totalCredit += Math.abs(closing);
            }
        });
    
        tree.down('#debitTotal').setValue('<b>' + formatIndianNumber(totalDebit) + '</b>');
        tree.down('#creditTotal').setValue('<b>' + formatIndianNumber(totalCredit) + '</b>');
    });
    // ✅ TREE PANEL
    var tree = Ext.create('Ext.tree.Panel', {
        region: 'center',
        store: store,
        rootVisible: false,
        useArrows: true,
        border: true,
        bbar: [
            {
                xtype: 'displayfield',
                value: '<b>Total :</b>',
                width: 600
            },
            {
                xtype: 'displayfield',
                itemId: 'debitTotal',
                width: 200,
                fieldStyle: 'text-align:right;font-weight:bold;'
            },
            {
                xtype: 'displayfield',
                itemId: 'creditTotal',
                width: 200,
                fieldStyle: 'text-align:right;font-weight:bold;'
            }
        ],
        columns: [
            {
                xtype: 'treecolumn',
                text: 'Particulars',
                dataIndex: 'text',
                width: 600,   // ✔ fixed
                renderer: function (value, meta, record) {
                    if (record.parentNode && record.parentNode.isRoot()) {
                        return '<b>' + value + '</b>';
                    }
                    return value;
                }
            },
            {
                text: 'Debit',
                width: 200,   // ✔ fixed
                align: 'right',
                renderer: function (v, meta, rec) {
            
                    var closing = parseFloat(rec.get('closing')) || 0;
                    var value = (closing > 0) ? formatIndianNumber(closing) : '';
            
                    if (rec.parentNode && rec.parentNode.isRoot()) {
                        return value ? '<b>' + value + '</b>' : '';
                    }
            
                    return value;
                }
            },
            {
                text: 'Credit',
                width: 200,   // ✔ fixed
                align: 'right',
                renderer: function (v, meta, rec) {
            
                    var closing = parseFloat(rec.get('closing')) || 0;
                    var value = (closing < 0) ? formatIndianNumber(Math.abs(closing)) : '';
            
                    if (rec.parentNode && rec.parentNode.isRoot()) {
                        return value ? '<b>' + value + '</b>' : '';
                    }
            
                    return value;
                }
            }
        ]
    });

    // ✅ PROCESS BUTTON
    var processBtn = Ext.create('Ext.button.Button', {
        text: 'PROCESS',
        width: 100,
        handler: function () {

            var from = fromDateField.getValue();
            var to   = toDateField.getValue();

            if (!from || !to) {
                Ext.Msg.alert('Error', 'Select From and To Date');
                return;
            }

            // 🔥 set params
            store.getProxy().extraParams.startdate = Ext.Date.format(from, 'Y-m-d');
            store.getProxy().extraParams.enddate   = Ext.Date.format(to, 'Y-m-d');

            // reload full tree
            store.load();
        }
    });

    // ✅ TOP PANEL (LIKE YOUR SCREEN)
    var topPanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        height: 70,
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        bodyPadding: 10,
        items: [
            {
                xtype: 'displayfield',
                value: '<b>SRI HARI VENKATESWARA PAPER MILLS (P) LTD</b>',
                width: 350
            },
            {
                xtype: 'displayfield',
                value: '<b>Finance Year: 2026-2027</b>',
                width: 200
            },
            fromDateField,
            { xtype: 'tbspacer', width: 10 },
            toDateField,
            { xtype: 'tbspacer', width: 10 },
            processBtn,
            { xtype: 'tbfill' },
            {
                xtype: 'radio',
                boxLabel: 'PDF',
                name: 'export'
            },
            {
                xtype: 'radio',
                boxLabel: 'Excel',
                name: 'export'
            },
            {
                xtype: 'radio',
                boxLabel: 'Others',
                name: 'export'
            }
        ]
    });

    // ✅ MAIN CONTAINER
    Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        width: 1300,
        height: 600,
        layout: 'border',
        title: 'Trial Balance',

        items: [
            topPanel,
            tree
        ]
    });

});