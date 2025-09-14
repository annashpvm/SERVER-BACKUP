Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
    var fmdate = new Ext.form.DateField({
        name: 'fmdate',
        id: 'fmdate',
        fieldLabel: 'As On Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var todate = new Ext.form.DateField({
        name: 'todate',
        id: 'todate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: '', bodyStyle: {"background-color": "WHITE"},
        width: 660,
        height: 500,
        x: 25,
        y: 25,
        frame: false,
        id: 'fp',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', id: 'viewid1',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                                var p3 = "&compcode="+encodeURIComponent(GinCompcode);
                                var p5 = "&fromdate="+encodeURIComponent(fdate);

                                var param = (p3+p5);
                                
                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccPayablesAgewise.rptdesign' + param,  '_blank' );                            

                        }
                    }
                }, '-',
                {
                 //   text: 'Note:Debit Note/Credit Note/Bank Payment/Bank Receipt/All Voucher wise Report Combine Input Result',
                    style: 'text-align:center;',
                     height: 40,
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 230,
                x: 85,
                y: 10,
                border: false,
                labelWidth: 65,
                items: [fmdate]
            },
            {xtype: 'fieldset',
                title: '',
                width: 300,
                x: 320,
                y: 10,
                border: false,
                labelWidth: 65,
               // items: [todate]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 230,
                width: 500,
                x: 130, border: false,
                y: 65,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 2,
                        items: [
                            {boxLabel: 'Common Stores', name: 'options', inputValue: '1',  id: 'comstore'},
                            {boxLabel: 'Yarn', name: 'options', inputValue: '2', id: 'yarnpur'},
                            {boxLabel: 'Cotton', name: 'options', inputValue: '3', id: 'cott'},
                            {boxLabel: 'Fabric', name: 'options', inputValue: '4', id: 'fabri'},
                            {boxLabel: 'WorkOrder', name: 'options', inputValue: '5', id: 'worder'},
                            {boxLabel: 'Expense', name: 'options', inputValue: '6', hidden: true, id: 'expen',hidden:true},
                            {boxLabel: 'DebitNote', name: 'options', inputValue: '7', id: 'dbnote'},
                            {boxLabel: 'Store Machinary', name: 'options', inputValue: '8', id: 'ifd'},
                            {boxLabel: 'CreditNote Input/Output', name: 'options', inputValue: '9', id: 'crnotr'},
                            {boxLabel: 'Contra', name: 'options', inputValue: '10', id: 'contra'},
                            {boxLabel: 'Journal', name: 'options', inputValue: '11', id: 'Journal'},
                            {boxLabel: 'BankPayment', name: 'options', inputValue: '12', id: 'bpay'},
                            {boxLabel: 'BankReceipt', name: 'options', inputValue: '13', id: 'brep'},
                            {boxLabel: 'Madeups', name: 'options', inputValue: '14', id: 'idMadeups'},
                            {boxLabel: 'POWERPLANT STORES', name: 'options', inputValue: '15', id: 'idPPS'},
                            {boxLabel: 'POWERPLANT WORKORDER', name: 'options', inputValue: '16', id: 'idPPW'},
                            {boxLabel: 'HOMETEX FABRIC', name: 'options', inputValue: '17', id: 'idhfab'},
                            {boxLabel: 'ALL Vou Datewise', name: 'options', inputValue: '18', id: 'idall',checked: true,hidden:true},
                            {boxLabel: 'ALL Inv Datewise', name: 'options', inputValue: '19', id: 'idadatell',hidden:true},
                            {boxLabel: 'ALL Company', name: 'options', inputValue: '20', id: 'idnoall',hidden:true}
                        ]
                    }
                ]
            }
        ]
    });

    var frmwindow = new Ext.Window({
        height: 150,
        width: 660,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 70,
        items: fp,
        listeners:
                {
                    show: function () {
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                            Ext.getCmp('comstore').setVisible(false);
                            Ext.getCmp('yarnpur').setVisible(false);
                            Ext.getCmp('cott').setVisible(false);
                            Ext.getCmp('fabri').setVisible(false);
                            Ext.getCmp('worder').setVisible(false);
                            Ext.getCmp('expen').setVisible(false);
                            Ext.getCmp('dbnote').setVisible(false);
                            Ext.getCmp('ifd').setVisible(false);
                            Ext.getCmp('crnotr').setVisible(false);
                            Ext.getCmp('contra').setVisible(false);
                            Ext.getCmp('Journal').setVisible(false);
                            Ext.getCmp('bpay').setVisible(false);
                            Ext.getCmp('brep').setVisible(false);
                            Ext.getCmp('idMadeups').setVisible(false);
                            Ext.getCmp('idPPS').setVisible(false);
                            Ext.getCmp('idPPW').setVisible(false);
                            Ext.getCmp('idhfab').setVisible(false);
                            Ext.getCmp('idnoall').setVisible(false);
                        
                    }
                }
    }).show();
});

