/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var divisiontype;
    var vv;


    var lbl = new Ext.form.Label({
        fieldLabel: 'Funds Planning',
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

    var reporttype = 'Abstract';
    var reportradios = new Ext.form.RadioGroup({
        //fieldLabel: 'Favorite Framework',
        disabled: false,
        border: true,
        allowBlank: false,
        columns: 2, //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'Detailed', name: 'reportradios', inputValue: '1',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Detailed';
				cmbbanktwo.enable();
				chkstatus.enable();
				cmbbank.reset();
				cmbbank.disable();
                        }
                    }
                }
            },
            {boxLabel: 'Abstract', name: 'reportradios', inputValue: '2',  checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Abstract';
				cmbbanktwo.disable();
				chkstatus.disable();
				cmbbanktwo.reset();
				chkstatus.reset();
				cmbbank.enable();


                        }
                    }
                }
            }
        ]
    });
    var cmbbank = new Ext.form.ComboBox({
        fieldLabel: 'Include Cheques on hand for the Bank',
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
        fieldLabel: 'Date',
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

    var cmbbanktwo = new Ext.form.ComboBox({
        fieldLabel: 'Bank',
        labelSeparator: "",
        width: 200,
        name: 'cmbbanktwo',
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
	disabled:true,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                
            }
        }
    });
   var cstatus;
   var chkstatus = new Ext.form.Checkbox({
        name: 'chkstatus',
        boxLabel: '',
        labelSeparator: "",
        fieldLabel: 'Include cheques on hand',
        id: 'chkstatus',
	disabled:true,
        //checked: true,
        width: 100,       
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    cstatus = 'Y';
                } else {
                    cstatus = 'N';
                }
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
                            var fdate = Ext.util.Format.date(pdate.getValue(), 'Y-m-d');
                            var p2 = fdate;
                            var p1 = cmbbank.getValue();
                            var p3 = cmbbank.getRawValue();

			    var p4 = cmbbanktwo.getValue();
			    var p5 = cmbbanktwo.getRawValue();
			    var p6 = cstatus;

                            var bcode = "&bankcode=" + encodeURIComponent(p1);
                            var uptodate = "&uptodate=" + encodeURIComponent(p2);
                            var bankname = "&bankname=" + encodeURIComponent(p3);

			    var bcodetwo = "&bankcode=" + encodeURIComponent(p4);
			    var banknametwo = "&bankname=" + encodeURIComponent(p5);
			    var chequestatus = "&chequestatus=" + encodeURIComponent(p6);

                            var param = bcode + uptodate + bankname;
			    var paramtwo = bcodetwo + uptodate + banknametwo + chequestatus;
			
                            if (reporttype === 'Detailed')
                            {
                                window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/funds_planning_detailed.rptdesign' + paramtwo, '_blank');
                            } else if (reporttype === 'Abstract')
                            {
				window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/Funds_Planning_new.rptdesign' + param, '_blank');
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
                x: 200,
                y: 5,
                border: false,
                items: [lbl]
            },
   	{
                xtype: 'fieldset',
                layout: 'absolute',
                title: '',
                labelWidth: 80,
                x: 30,
                y: 50,
                height: 140,
                width: 500,
                border: true,
                items: [
 	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 25,
                y:0,
                border: false,
                items: [reportradios]
            },
            
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 50,
                x: 150,
                y: 40,
                border: false,
                height: 300,
                width: 250,
                items: [pdate]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                x: 50,
                y: 80,
                border: false,
                height: 300,
                width: 400,
                items: [cmbbank]
            },
]
},
           
	    {
                xtype: 'fieldset',
                layout: 'absolute',
                title: 'For Detailed Report',
                labelWidth: 80,
                x: 30,
                y: 200,
                height: 80,
                width: 500,
                border: true,
                items: [
			{
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 50,
		        x: 10,
		        y: 5,
		        border: false,
		        height: 300,
		        width: 400,
		        items: [cmbbanktwo]
               	    },
			{
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        x: 310,
		        y: 5,
		        border: false,
		        height: 300,
		        width: 400,
		        items: [chkstatus]
               	    },
		]
	   }
            
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
            }
        }
    });
    repWindow.show();
});

