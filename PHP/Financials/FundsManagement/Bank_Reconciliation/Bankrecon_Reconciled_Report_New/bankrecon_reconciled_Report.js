/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var divisiontype;
    var vv;


    var lbl = new Ext.form.Label({
        fieldLabel: 'Reconciliation Report',
        id: 'lbl',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; font-weight: bold; color:green;'
    });
    var bankstore = new Ext.data.Store({
        id: 'bankstore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankmaster'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_code', 'bank_name', 'branch_name', 'account_no', 'value_month', 'month_name', 'value_year', 'closing_balance_bankstatement', 'closing_balance_kgdlbankbook', 'active_status'])

    });
    
    var reporttype = 'Detailed';
    var reportradios = new Ext.form.RadioGroup({
        //fieldLabel: 'Favorite Framework',
        disabled: false,
        border: true,
        allowBlank: false,
        columns: 2, //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'Detailed', name: 'reportradios', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Detailed';


                        }
                    }
                }
            },
            {boxLabel: 'Abstract', name: 'reportradios', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Abstract';



                        }
                    }
                }
            }
        ]
    });
    var cmbbank = new Ext.form.ComboBox({
        fieldLabel: 'Bank',
        labelSeparator: "",
        width: 200,
        name: 'cmbbank',
        forceSelection: true,
        store: bankstore,
        emptyText: 'Select Bank',
        triggerAction: 'all',
        editable: true,
        valueField: 'bank_code',
        displayField: 'bank_name',
        queryMode: 'local',
        typeAhead: 'true',
        allowBlank: false,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                
            }
        }
    });
    var pdate = new Ext.form.DateField({
        id: 'pdate',
        fieldLabel: 'From Date',
        width: 100,
        name: 'pdate',
        format: 'd-m-Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: "",
        listeners: {
            select: function ()
            {
                
            }
        }
    });
    
  var txttodate = new Ext.form.DateField({
        id: 'txttodate',
        fieldLabel: 'To Date',
        width: 100,
        name: 'txttodate',
        format: 'd-m-Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: "",
        listeners: {
            select: function ()
            {
                
            }
        }
    });
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 300,
        border: false,
        frame: false,
        id: 'FormPanel',
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'black',
            'style': 'Helvetica',
            'font-size': '17px', 'font-weight': 'bold'
        },
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/KgDenim/Pictures/save1.ico',
                    listeners: {
                        click: function ()
                        {
                        
                            var p2 = Ext.util.Format.date(pdate.getValue(), 'Y-m-d');
  
                            var p1 = cmbbank.getValue();
                            var p3 = cmbbank.getRawValue();
 
			    var p4 = Ext.util.Format.date(txttodate.getValue(), 'Y-m-d');

                            var bcode = "&bankcode=" + encodeURIComponent(p1);
                            var uptodate = "&uptodate=" + encodeURIComponent(p2);
                            var bankname = "&bankname=" + encodeURIComponent(p3);
			    var todate = "&todate=" + encodeURIComponent(p4);

                            var param = bcode + uptodate + bankname + todate;
                            if (reporttype === 'Detailed')
                            {

                                window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/bankrecon_reconcileddetailed_new.rptdesign' + param, '_blank');
                            } else if (reporttype === 'Abstract')
                            {

                               // window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/bankrecon_abstract.rptdesign' + param, '_blank');

				window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/bank_recon_abstracttwo.rptdesign' + param, '_blank');
                            }


                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30, id: 'newview',
                    width: 70,
                    icon: '/KgDenim/Pictures/refresh.ico',
                    listeners: {
                        click: function () {
                            window.location.reload();
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/KgDenim/Pictures/exit.ico',
                    listeners: {
                        click: function () {
                            repWindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 320,
                width: 320,
                x: 130,
                y: 5,
                border: false,
                items: [lbl]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 15,
                y: 50,
                border: false,
                items: [reportradios]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                x: 80,
                y: 100,
                border: false,
                height: 300,
                width: 300,
                items: [cmbbank]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                x: 80,
                y: 150,
                border: false,
                height: 300,
                width: 200,
                items: [pdate]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                x: 80,
                y: 190,
                border: false,
                height: 300,
                width: 200,
                items: [txttodate]
            },
           
        ]
    });
    var repWindow = new Ext.Window({
        height: 300,
        width: 435,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 80,
        items: [FormPanel],
        title: 'Bank Reconciliation',
        layout: 'absolute',
        border: false,
        draggable: false,
        resizable: false,
        listeners: {
            show: function () {

                bankstore.load({
                    url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectbankmaster'
                    }
                });
            }
        }
    });
    repWindow.show();
});

