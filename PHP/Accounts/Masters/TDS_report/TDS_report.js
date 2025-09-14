/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinuser = localStorage.getItem('accuserid');
    var compcode = localStorage.getItem('acccompcode');

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
        allowBlank: false
    });


    var TDSFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Tax Deduction at Source',
        width: 950,
        height: 550,
        bodyStyle: {"background-color": "#AAAAFF"},
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
                    text: 'View',
                    style: 'text-align:center;', icon: '/Pictures/refresh.png',
                    tooltip: 'View Details...', height: 40,
                    listeners:
                            {
                                click: function ()
                                {
                                    var fromdate = Ext.getCmp('FDate').value;
                                    var todate = Ext.getCmp('TDate').value;
                                    var ledger = cmbLedger.getValue();

                                    var d1 = fromdate;
                                    var d2 = todate;
                                    var d3 = ledger;

                                    var p1 = "&fromdate=" + encodeURIComponent(d1);
                                    var p2 = "&todate=" + encodeURIComponent(d2);
                                    var p3 = "&ledger=" + encodeURIComponent(d3);
                                    
                                    var param=p1+p2+p3;
				    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/tds_report.rptdesign'+param,  '_blank' );

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
                items: [
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
                    }

                ]
            }
        ]
    });



    var TDSWindow = new Ext.Window({
        height: 200,
        width: 470,
        items: TDSFormPanel,
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        bodyStyle: {"background-color": "#3399CC"},
        y: 100,
        listeners: {
            show: function () {
                LedgerStore.load({
                    url:  '/SHVPM/Financials/classfile.php', 
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

