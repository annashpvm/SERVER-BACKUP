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
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankmaster'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_code', 'bank_name', 'branch_name', 'account_no', 'value_month', 'month_name', 'value_year', 'closing_balance_bankstatement', 'closing_balance_kgdlbankbook', 'active_status'])

    });
    var balancestore = new Ext.data.Store({
        id: 'balancestore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectclosingbalance'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_code','recon_date','db_closingbal_bankbook','cr_closingbal_bankbook','db_closingbal_bankstatement','cr_closingbal_bankstatement'])

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
                balancestore.removeAll();
                balancestore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectclosingbalance',
                        bcode: cmbbank.getValue(),
                        rdate: pdate.getValue(),
                    },
                    callback: function () {
                        var cnt = balancestore.getCount();
			txtdb_kgdlclosingbalance.setValue(balancestore.getAt(0).get('db_closingbal_bankbook'));
 			txtcr_kgdlclosingbalance.setValue(balancestore.getAt(0).get('cr_closingbal_bankbook'));
                        txtdb_bankclosingbalance.setValue(balancestore.getAt(0).get('db_closingbal_bankstatement'));                       
                        txtcr_bankclosingbalance.setValue(balancestore.getAt(0).get('cr_closingbal_bankstatement'));
if(txtcr_kgdlclosingbalance.getRawValue()>0)
{
cmbtypetwo.setRawValue('CR');
}
else if(txtdb_kgdlclosingbalance.getRawValue()>0)
{
cmbtypetwo.setRawValue('DB');
}

if(txtdb_bankclosingbalance.getRawValue()>0)
{
cmbtype.setRawValue('CR');
}
else if(txtdb_bankclosingbalance.getRawValue()>0)
{
cmbtype.setRawValue('DB');
}

                    }

                });
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
                balancestore.removeAll();
                balancestore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectclosingbalance',
                        bcode: cmbbank.getValue(),
                        rdate: pdate.getValue(),
                    },
                    callback: function () {
                        var cnt = balancestore.getCount();
                        //alert(cnt);
                      	txtdb_kgdlclosingbalance.setValue(balancestore.getAt(0).get('db_closingbal_bankbook'));
 			txtcr_kgdlclosingbalance.setValue(balancestore.getAt(0).get('cr_closingbal_bankbook'));
                        txtdb_bankclosingbalance.setValue(balancestore.getAt(0).get('db_closingbal_bankstatement'));                       
                        txtcr_bankclosingbalance.setValue(balancestore.getAt(0).get('cr_closingbal_bankstatement'));
if(txtcr_kgdlclosingbalance.getValue()>0)
{
cmbtypetwo.setValue('CR');
}
else if(txtdb_kgdlclosingbalance.getValue()>0)
{
cmbtypetwo.setValue('DB');
}

if(txtcr_bankclosingbalance.getValue()>0)
{
cmbtype.setValue('CR');
}
else if(txtdb_bankclosingbalance.getValue()>0)
{
cmbtype.setValue('DB');
}

                        
                    }

                });
            }
        }
    });
	var typesel = ['DB','CR'];
	var cmbtype = new Ext.form.ComboBox({
        fieldLabel: 'Closing balance (as per bank statement)',
        labelSeparator: "",
        width: 70,
        name: 'cmbtype',
        forceSelection: true,       
        emptyText: 'TYPE',
	 store: typesel,
        triggerAction: 'all',
        editable: true,        
        queryMode: 'local',
        typeAhead: 'true',
        allowBlank: false,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                if(cmbtype.getRawValue()=='DB')
			{
			txtcr_bankclosingbalance.setRawValue(0);
			txtcr_bankclosingbalance.disable();
			txtdb_bankclosingbalance.enable();
			}
  		else if(cmbtype.getRawValue()=='CR')
			{
			txtdb_bankclosingbalance.setRawValue(0);
			txtdb_bankclosingbalance.disable();
			txtcr_bankclosingbalance.enable();
			}
            }
        }
    });
	
    var txtdb_bankclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: '',
        id: 'txtdb_bankclosingbalance',
        name: 'txtdb_bankclosingbalance',
        width: 150,
       // allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });
    var txtcr_bankclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: '',
        id: 'txtcr_bankclosingbalance',
        name: 'txtcr_bankclosingbalance',
        width: 150,
        //allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });
var typesel2 = ['DB','CR'];
	var cmbtypetwo = new Ext.form.ComboBox({
        fieldLabel: 'Closing balance (as per kgdl bank book)',
        labelSeparator: "",
        width: 70,
        name: 'cmbtypetwo',
        forceSelection: true,       
        emptyText: 'TYPE',
	 store: typesel2,
        triggerAction: 'all',
        editable: true,        
        queryMode: 'local',
        typeAhead: 'true',
        allowBlank: false,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                if(cmbtypetwo.getRawValue()=='DB')
			{
			txtcr_kgdlclosingbalance.setRawValue(0);
			txtcr_kgdlclosingbalance.disable();
			txtdb_kgdlclosingbalance.enable();
			}
  		else if(cmbtypetwo.getRawValue()=='CR')
			{
			txtdb_kgdlclosingbalance.setRawValue(0);
			txtdb_kgdlclosingbalance.disable();
			txtcr_kgdlclosingbalance.enable();
			}
            }
        }
    });
    var txtdb_kgdlclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: '',
        id: 'txtdb_kgdlclosingbalance',
        name: 'txtdb_kgdlclosingbalance',
        width: 150,
        //allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });
  var txtcr_kgdlclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: '',
        id: 'txtcr_kgdlclosingbalance',
        name: 'txtcr_kgdlclosingbalance',
        width: 150,
       // allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 15

    });
    var btnsave = new Ext.Button({
        style: 'text-align:center;',
        text: "Save",
        icon: '/KgDenim/Pictures/login.ico',
        listeners: {
            click: function () {
              

                            
                             FormPanel.getForm().submit({
                                url: '/DPM/Financials/CashandBank/Bank_Reconciliation/Bankrecon_Report/bankrecon_Save.php',
                                params: {                                   
                                    bcode:cmbbank.getValue(),
                                    rdate:pdate.getValue(),				   
				    db_bankstatementbal :txtdb_bankclosingbalance.getRawValue(),
				    cr_bankstatementbal:txtcr_bankclosingbalance.getRawValue(),
				    db_bankbookbal:txtdb_kgdlclosingbalance.getRawValue(), 				
				    cr_bankbookbal :txtcr_kgdlclosingbalance.getRawValue()
                                },
                               success: function () {
                               Ext.MessageBox.alert("Alert", "Added");
                               
                             // FormPanel.getForm().reset();
                             //load();

                           },
                           failure: function () {
                            Ext.MessageBox.alert("Alert", "Failed");
 
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
                            var fdate = Ext.util.Format.date(pdate.getValue(), 'Y-m-d');
                            var p2 = fdate;
                            var p1 = cmbbank.getValue();
                            var p3 = cmbbank.getRawValue();

                            var bcode = "&bankcode=" + encodeURIComponent(p1);
                            var uptodate = "&uptodate=" + encodeURIComponent(p2);
                            var bankname = "&bankname=" + encodeURIComponent(p3);

                            var param = bcode + uptodate + bankname;
                            if (reporttype === 'Detailed')
                            {

                                window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=bankrecon/bank_recon_detailed.rptdesign' + param, '_blank');
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
                x: 200,
                y: 5,
                border: false,
                items: [lbl]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 85,
                y: 50,
                border: false,
                items: [reportradios]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                x: 130,
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
                x: 130,
                y: 150,
                border: false,
                height: 300,
                width: 200,
                items: [pdate]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                x: 50,
                y: 200,
                border: false,
                height: 300,
                width: 200,
                items: [cmbtype]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 230,
                y: 200,
                border: false,
                height: 300,
                width: 200,
                items: [txtdb_bankclosingbalance]
            },
   	 {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 400,
                y: 200,
                border: false,
                height: 300,
                width: 200,
                items: [txtcr_bankclosingbalance]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                x: 50,
                y: 260,
                border: false,
                height: 300,
                width: 200,
                items: [cmbtypetwo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 230,
                y: 260,
                border: false,
                height: 300,
                width: 200,
                items: [txtdb_kgdlclosingbalance]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 400,
                y: 260,
                border: false,
                height: 300,
                width: 200,
                items: [txtcr_kgdlclosingbalance]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                x: 220,
                y: 300,
                border: false,
                height: 300,
                width: 100,
                items: [btnsave]
            },
        ]
    });
    var repWindow = new Ext.Window({
        height: 420,
        width: 595,
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
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectbankmaster'
                    }
                });
            }
        }
    });
    repWindow.show();
});

