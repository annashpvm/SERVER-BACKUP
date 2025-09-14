/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinuser = localStorage.getItem('accuserid');
    var compcode = localStorage.getItem('acccompcode');



    function save() {
        var gtestData = Datagridd.getStore().getRange();
        var tds = new Array();
        Ext.each(gtestData, function (record) {
            tds.push(record.data);
        });
        Ext.Ajax.request({
            url: '/SHVPM/Financials/General/TDS/TaxdsSave.php',
            params: {
                griddet:Ext.util.JSON.encode(tds),
                finid:ginfinid,
                compcode:compcode,
                fromdate:FDate.getValue(),
                todate:TDate.getValue(),
                ledgerid:cmbLedger.getValue(),
                ledgername:cmbLedger.getRawValue(),
                section:sect,
                cnt:gtestData.length
            },
            callback: function (options, success, response)
            {
                var obj = Ext.decode(response.responseText);
                if (obj['success'] === "true") {
                    Ext.MessageBox.alert("Alert", "Added");
                    window.location.reload();
                } else {
                    Ext.MessageBox.alert("Alert", "Failed");
                }
            }
        });
    }

    var total;
    function sum() {
        total = 0;
        lbltotal.setText('0');
        lbltotal2.setText('0');
        var RowCnt = Datagridd.getStore().getCount();
        Datagridd.getSelectionModel().selectAll();
        var sel1 = Datagridd.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            total = total + parseFloat(sel1[j].data.amt);
        }
        lbltotal.setText(Ext.util.Format.number(total,'0.00'));
        lbltotal2.setText(Math.round(total));
    }

    var LedgerStore = new Ext.data.Store({
        id: 'LedgerStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'GetLedger'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });

    var LedgerdetailStore = new Ext.data.Store({
        id: 'LedgerdetailStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'GetLedgerAllDetail'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name', 'tds_percent', 'accref_voudate', 'accref_vouno', 'amt', 'tds_section', 'gross', 'acctran_cramt', 'grossamt', 'accref_narration', 'accref_vou_type'])
    });


    var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
        fieldLabel: 'From Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });

var sect='';
    var cmbLedger = new Ext.form.ComboBox({
        fieldLabel: 'Payment Type',
        width: 280,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_code',
        id: 'cmbLedger',
        typeAhead: true,
        mode: 'local',
        store: LedgerStore,
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        labelSeparator: "",
        allowBlank: false,
        listeners:
                {
                    select: function ()
                    {
                        lbltotal.setText('0');
                        lbltotal2.setText('0');
                        Datagridd.getStore().removeAll();
                        txtsection.setText('');
                        LedgerdetailStore.removeAll();
                        LedgerdetailStore.load({
                            url: '/SHVPM/Financials/classfile.php',
                            params: {
                                task: 'GetLedgerAllDetail',
                                ledger: cmbLedger.getValue(),
                                fdate: FDate.getValue(),
                                tdate: TDate.getValue(),
                                finid: ginfinid,
                                compcode: compcode
                            },
                            callback: function () {
                                var cnt = LedgerdetailStore.getCount();
                                if (cnt > 0) {
                                    sect='';
                                    txtsection.setText(LedgerdetailStore.getAt(0).get('tds_section'));
                                    sect=LedgerdetailStore.getAt(0).get('tds_section');
                                    sum();
                                } else
                                {
                                    Ext.Msg.alert('Alert', 'Details Not Found!');
                                }
                            }
                        });

                    }
                }
    });


    var txtsection = new Ext.form.Label({
        fieldLabel: '',
        id: 'txtsection',
        width: 100
    });

    var lbltotal = new Ext.form.Label({
        fieldLabel: '',
        id: 'lbltotal',
        width: 100
    });

    var lbltotal2 = new Ext.form.Label({
        fieldLabel: '',
        id: 'lbltotal2',
        width: 100
    });

    var Datagridd = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 300,
        // renderTo: Ext.getBody(),
        width: 850,
        x: 20,
        style: {
            color: 'DarkBlue',
            backgroundColor: 'White'

        },
        columnLines: true,
        y: 100,
        columns: [
            {header: "S.No", dataIndex: 'sno', sortable: true, width: 40, align: 'left', renderer: function (value, metadata, record, rowIndex) {
                    return rowIndex + 1;
                }
            },
            {header: "Voucher No", dataIndex: 'accref_vouno', sortable: true, width: 75, align: 'left'},
            {header: "Vou.Type", dataIndex: 'accref_vou_type', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Voucher Date", dataIndex: 'accref_voudate', sortable: true, width: 80, align: 'left'},
            {header: "Customer Code", dataIndex: 'led_code', sortable: true, width: 80, align: 'left', hidden: true},
            {header: "Customer Name", dataIndex: 'led_name', sortable: true, width: 240, align: 'left'},
            {header: "TDS%", dataIndex: 'tds_percent', sortable: true, width: 39, align: 'right'
                        /*editor: {
                         xtype: 'textfield',
                         align: 'right',
                         enableKeyEvents: true, listeners: {
                         keyup: function () {
                         var sm = Datagridd.getSelectionModel();
                         var selrow = sm.getSelected();
                         var grsamt = Number(selrow.get('grossamt'));
                         var totamt = Number((grsamt * this.getValue()) / 100);
                         var selected_rows = Datagridd.getSelectionModel().getSelections();
                         for (var a = 0; a < selected_rows.length; a++)
                         {
                         selected_rows[a].set('amt', Ext.util.Format.number(Number(totamt), '0.00'));
                         }
                         }
                         }}*/
            },
            {header: "TDS Gross", dataIndex: 'grossamt', sortable: true, width: 80, align: 'right',
                editor: {
                    xtype: 'textfield',
                    align: 'right',
                    enableKeyEvents: true, listeners: {
                        keyup: function () {
                            var sm = Datagridd.getSelectionModel();
                            var selrow = sm.getSelected();
                            var tdspercent = Number(selrow.get('tds_percent'));
                            var totamt = Number((this.getValue() * tdspercent) / 100);
                            var selected_rows = Datagridd.getSelectionModel().getSelections();
                            for (var a = 0; a < selected_rows.length; a++)
                            {
                                selected_rows[a].set('amt', Ext.util.Format.number(Number(totamt), '0.00'));
                            }
                        }
                    }}},
            {header: "TDS Amt", dataIndex: 'amt', sortable: true, width: 70, align: 'right'},
            {header: "Narration", dataIndex: 'accref_narration', sortable: true, width: 1300, align: 'left'}
        ],
        store: LedgerdetailStore,
        clicksToEdit: 1
    });


    var TDSFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Tax Deduction at Source',
        width: 950,
        height: 550,
        bodyStyle: {"background-color": "#344F8C"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        frame: false,
        id: 'RepWIPFormPanel',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            bodyStyle: {"background-color": "green"},
            items: [
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    listeners: {
                        click:function(){
                            save();
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;', icon: '/Pictures/view.png',
                    tooltip: 'Refresh Details...', height: 40,
                    listeners: {
                        click:
                                function () {
                                    window.location.reload();
                                }

                    }

                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            TDSWindow.hide();
                        }
                    }
                }
            ]

        },
        items: [
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: false,
                height: 550,
                width: 900,
                layout: 'absolute',
                        x: 10,
                y: 0,
                items: [Datagridd,
                    {xtype: 'fieldset',
                        title: '',
                        width: 250,
                        x: 10,
                        y: 0,
                        border: false,
                        labelWidth: 78,
                        items: [FDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 250,
                        x: 210,
                        y: 0,
                        border: false,
                        labelWidth: 55,
                        items: [TDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 400,
                        x: 10,
                        y: 40,
                        border: false,
                        items: [cmbLedger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 200,
                        x: 400,
                        y: 40,
                        border: false,
                        items: [txtsection]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 200,
                        x: 550,
                        y: 40,
                        border: false,
                        items: [lbltotal]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 200,
                        x: 650,
                        y: 40,
                        border: false,
                        items: [lbltotal2]
                    }
                ]
            }
        ]
    });

    var TDSWindow = new Ext.Window({
        height: 550,
        width: 950,
        items: TDSFormPanel,
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        bodyStyle: {"background-color": "#3399CC"},
        y: 55,
        listeners: {
            show: function () {
                LedgerStore.load({
                    url: '/SHVPM/Financials/classfile.php',
                    params: {
                        task: 'GetLedger',
                        compcode: compcode
                    }
                });
            }
        }
    });
    TDSWindow.show();
});

