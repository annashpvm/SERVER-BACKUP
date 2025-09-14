/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var divisiontype;
    var vv;


    var lbl = new Ext.form.Label({
        fieldLabel: 'Interest Calculation',
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
   

  var year = new Ext.form.DateField({
        id: 'year',
        width: 60,
        name: 'year',
        format: 'Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: ""
    });
    var monthstore = new Ext.data.Store({
        id: 'monthstore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectMonth"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['month_code', 'month_name'])
    });
    var ason_month;
    var month = new Ext.form.ComboBox({
        labelSeparator: "",
        id: 'month',
        fieldLabel: 'as on',
        width: 110,
        store: monthstore,
        displayField: 'month_name',
        valueField: 'month_code',
        hiddenName: 'month_name',
        allowBlank: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        emptyText: 'Select Month',
        listeners: {
            select: function () {
                ason_month = month.getValue();
            }
        }
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
  
	
	
 var txtopeningbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: 'Opening Balance',
        id: 'txtopeningbalance',
        name: 'txtopeningbalance',
        width: 150,
       // allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });

 var txtinscredit = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: 'Interest for credit balance',
        id: 'txtinscredit',
        name: 'txtinscredit',
        width: 80,
       // allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });

 var txtinsdebit = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: 'Interest for debit balance',
        id: 'txtinsdebit',
        name: 'txtinsdebit',
        width: 80,
       // allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });

var inscalcstore = new Ext.data.Store({
        id: 'inscalcstore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "inscalculation"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, )
    });

    var btnsave = new Ext.Button({
        style: 'text-align:center;',
        text: "Process",
        icon: '/KgDenim/Pictures/login.ico',
        listeners: {
            click: function () {

                    inscalcstore.load({
                    url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'inscalculation',
			tmonth: month.getValue(),
			tyear: Ext.util.Format.date(year.getValue(), 'Y'),
			bankcode: cmbbank.getValue(),
			closingbal: txtopeningbalance.getRawValue()
                    },
                        callback: function () {
                            var cnt = inscalcstore.getCount();
                        }
                });      

               }
        }
    });
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 600,
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
                          
 		

                            var p2 = Ext.util.Format.date(year.getValue(), 'Y');

   			    var p4 = month.getValue();
                            var p1 = cmbbank.getValue();
                            var p3 = cmbbank.getRawValue();
				 var p5 = txtinscredit.getRawValue();
				 var p6 = txtinsdebit.getRawValue();
				 var p7 = month.getRawValue();
				var p8= txtopeningbalance.getRawValue();

                            var bcode = "&bankcode=" + encodeURIComponent(p1);
                            var tyear = "&tyear=" + encodeURIComponent(p2);
 			    var tmonth = "&tmonth=" + encodeURIComponent(p4);
                            var bankname = "&bankname=" + encodeURIComponent(p3);
			    var inscredit = "&creditinterest=" + encodeURIComponent(p5);
			    var insdebit = "&debitinterest=" + encodeURIComponent(p6);
			    var monthname = "&monthname=" + encodeURIComponent(p7);
			    var closingbal = "&closingbal=" + encodeURIComponent(p8);

                            var param = bcode + tyear+ tmonth + bankname + inscredit + insdebit + monthname + closingbal;
                           
				window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/interest_calculation.rptdesign' + param, '_blank');
                          


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
                x: 200,
                y: 5,
                border: false,
                items: [lbl]
            },           
            
            
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 100,
                y: 80,
                border: false,
                height: 300,
                width: 400,
                items: [cmbbank]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 100,
                y: 120,
                border: false,
                height: 300,
                width: 400,
                items: [txtopeningbalance]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 30,
                x: 345,
                y: 120,
                border: false,
                height: 300,
                width: 170,
                items: [month]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                x: 495,
                y: 120,
                border: false,
                height: 300,
                width: 200,
                items: [year]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 100,
                y: 160,
                border: false,
                height: 300,
                width: 200,
                items: [txtinscredit]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 100,
                y: 200,
                border: false,
                height: 300,
                width: 200,
                items: [txtinsdebit]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 220,
                y: 240,
                border: false,
                height: 300,
                width: 200,
                items: [btnsave]
            },
            
        ]
    });
    var repWindow = new Ext.Window({
        height: 380,
        width: 595,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 80,
        items: [FormPanel],
        title: 'Funds Planning',
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
		monthstore.load({
                    url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectMonth'
                    }
                });
            }
        }
    });
    repWindow.show();
});
