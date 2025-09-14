Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var ginfinid = localStorage.getItem('ginfinid');
    var pst_ledprefix;
    var rsledname;
    var rc;

    var accnamedatastore = new Ext.data.Store({
        id: 'accnamedatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "chqaccname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo: {field: 'led_code', direction: "ASC"}
    });

    var PrefixDataStore = new Ext.data.Store({
        id: 'PrefixDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "Prefixledcode"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_prefix'
        ])
    });

    var LednameDataStore = new Ext.data.Store({
        id: 'LednameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "ChqLedgername"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
//        {name: 'led_code', type: 'int', mapping: 'led_code'},
            'led_name'
        ]),
    });

    var AmountDataStore = new Ext.data.Store({
        id: 'AmountDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "chqamt"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
//        {name: 'led_code', type: 'int', mapping: 'led_code'},
            'acctran_totamt'
        ]),
    });

    var VounoDataStore = new Ext.data.Store({
        id: 'VounoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Chqvouno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'accref_seqno', type: 'int', mapping: 'accref_seqno'},
            {name: 'accref_vouno', type: 'string', mapping: 'accref_vouno'}
        ]),
        sortInfo: {field: 'accref_seqno', direction: "DESC"}
    });

function loaddate(){
		pst_ledprefix='';	
 		PrefixDataStore.removeAll();
                VounoDataStore.removeAll();
                PrefixDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'Prefixledcode',
                        Accname: cmbaccname.getValue(),
                        gincompany: GinCompcode
                    },
                    callback: function () {
                        pst_ledprefix = PrefixDataStore.getAt(0).get('led_prefix');
                        VounoDataStore.load({
                            url: '/SHVPM/Financials/clsRepFinancials.php',
                            params: {
                                task: 'Chqvouno',
                                ledcode: cmbaccname.getValue(),
                                ledprefix: pst_ledprefix,
                                compcode: GinCompcode,
                                finid: ginfinid
                            }
                        });
                    }
                });
}

    var cmbaccname = new Ext.form.ComboBox({
        id: 'cmbaccname',
        width: 300,
        store: accnamedatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        fieldLabel: 'Account Name',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Account Name',
        allowBlank: false,
        tabIndex: 18,
        hidden: false,
        listeners: {
            select: function () {
               loaddate();
            },
            blur: function () {
               loaddate();
            }
        }
    });

    var vouseqno = 0;
    var cmbvouno = new Ext.form.ComboBox({
        id: 'cmbvouno',
        width: 200,
        store: VounoDataStore,
        displayField: 'accref_vouno',
        valueField: 'accref_seqno',
        hiddenName: 'accref_vouno',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        fieldLabel: 'Vou No',
        selectOnFocus: false,
        editable: true,
        emptyText: 'Select Vou No',
        allowBlank: false,
        tabIndex: 18,
        hidden: false,
        listeners: {
            select: function () {
                LednameDataStore.removeAll();
                vouseqno = cmbvouno.getValue();
                LednameDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'ChqLedgername',
                        vouno: vouseqno,
                        ledname: cmbaccname.getValue(),
                        compcode: GinCompcode
                    },
                    callback: function () {
                        rsledname = LednameDataStore.getCount();
                        if (rsledname > 0) {
                            txtledger.setRawValue(LednameDataStore.getAt(0).get('led_name'));
                        }
                    }
                });
            },
            blur: function () {
                LednameDataStore.removeAll();
                vouseqno = cmbvouno.getValue();
                LednameDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'ChqLedgername',
                        vouno: vouseqno,
                        ledname: cmbaccname.getValue(),
                        compcode: GinCompcode
                    },
                    callback: function () {
                        rsledname = LednameDataStore.getCount();
                        if (rsledname > 0) {
                            txtledger.setRawValue(LednameDataStore.getAt(0).get('led_name'));
                        }
                    }
                });
            }
        }
    });

    var txtledger = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtledger',
        width: 750,
        height: 40,
        name: 'txtledger'
    });

    var asondate = new Ext.form.DateField(
            {
                name: 'asondate',
                id: 'asondate',
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: 'Date',
                submitFormat: 'Y-m-d',
                allowBlank: false
            }
    );

function Left(str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }

    function Right(str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

var chkpayv = 'N';
var chkPAY = new Ext.form.Checkbox({
	name: 'Chk Pay',
	boxLabel: 'A/C Payee',
	id: 'chkPAY',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    chkpayv = 'Y';
		}else{
		    chkpayv = 'N';
		}
	    }
	}
});

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'CHEQUE PRINTING',
        width: 620,
        height: 450, bodyStyle: {"background-color": "#3399CC"},
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
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png'
                }, '-',
                {
                    text: 'View',
                    style: 'text-align:center;',
                    tooltip: 'View Details...', height: 40,hidden:true,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            AmountDataStore.removeAll();
                            AmountDataStore.load({
                                url: '/SHVPM/Financials/clsRepFinancials.php',
                                params: {
                                    task: 'chqamt',
                                    vouno: vouseqno,
                                    ledname: cmbaccname.getValue()
                                },
                                callback: function () {
                                    rc = AmountDataStore.getCount();
                                    if (rc > 0) {
                                        var d1 = Ext.getCmp('asondate').value;

                                        var chqdate = d1 + " 00:00:00.000";

                                        // var chqdate=Ext.getCmp('asondate').value;
                                        var lednm = txtledger.getRawValue();
                                        var ld = cmbaccname.getRawValue();
//Ext.Msg.alert(ld);
                                        var amt = AmountDataStore.getAt(0).get('acctran_totamt');
//			var d1 =  chqdate + " 00:00:00.000";
//Ext.Msg.alert(d1);
                                        var cq = "&chqdate=" + encodeURIComponent(chqdate);
                                        var comp = 1;
                                        var ln = "&ledname=" + encodeURIComponent(ld);
                                        var cd = "&compcode=" + encodeURIComponent(GinCompcode);
                                        var at = "&amount=" + encodeURIComponent(amt);
                                        var t = "&led=" + encodeURIComponent(lednm);
                                       
                                        var param = (ln + cd + at + cq + t + cp);

					if (Left(ld,6) == "ANDHRA")
                                        window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepChequePrintAndhraBank.rptdesign' + param, '_blank');
					else
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepChequePrint.rptdesign' + param, '_blank');

                                        /*fp.getForm().submit({
                                         url: 'SaveChkprint.php',
                                         method:'POST',
                                         params:{
                                         'accseqno':vouseqno
                                         }
                                         success:function()
                                         {
                                         Ext.MessageBox.alert("Alert","Check Updated SuccessFully!");
                                         },
                                         failure: function()
                                         {
                                         Ext.MessageBox.alert("Alert","Not Saved");
                                         }
                                         });*/
                                    } else
                                    {
                                        Ext.Msg.alert("Some Voucher Details Not Found...");
                                    }
                                }
                            });

                        }}
                }, '-',
                {
                    text: 'Print',
                    style: 'text-align:center;',
                    tooltip: 'Print Report...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            AmountDataStore.removeAll();
                            AmountDataStore.load({
                                url: '/SHVPM/Financials/clsRepFinancials.php',
                                params: {
                                    task: 'chqamt',
                                    vouno: vouseqno,
                                    ledname: cmbaccname.getValue()
                                },
                                callback: function () {
                                    rc = AmountDataStore.getCount();
                                    if (rc > 0) {
                                        var d1 = Ext.getCmp('asondate').value;
                                        var chqdate = d1 + " 00:00:00.000";
                                        var lednm = txtledger.getRawValue();
                                        var ld = cmbaccname.getRawValue();
                                        var amt = AmountDataStore.getAt(0).get('acctran_totamt');
                                        var cq = "&chqdate=" + encodeURIComponent(chqdate);
                                        var comp = 1;
                                        var ln = "&ledname=" + encodeURIComponent(ld);
                                        var cd = "&compcode=" + encodeURIComponent(GinCompcode);
                                        var at = "&amount=" + encodeURIComponent(amt);
                                        var t = "&led=" + encodeURIComponent(lednm);
 var cp = "&cp=" + encodeURIComponent(chkpayv);                                        
                                        var param = (ln + cd + at + cq + t + cp);
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepChequePrint.rptdesign' + param, '_blank');
                                        fp.getForm().submit({
                                            url: 'SaveChkprint.php',
                                            method: 'POST',
                                            params: {
                                                accseqno:vouseqno
                                            }
                                        });
					loaddate();
                                    } else
                                    {
                                        Ext.Msg.alert("Some Voucher Details Not Found...");
                                    }
                                }
                            });

                        }}
                }, '-',
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
            {
                xtype: 'fieldset',
                title: '',
                width: 400,
                border: false,
                labelWidth: 70,
                x: 20,
                y: 20,
                items: [cmbaccname]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 300,
                border: false,
                labelWidth: 70,
                x: 20,
                y: 70,
                items: [cmbvouno]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 300,
                border: false,
                labelWidth: 70,
                x: 20,
                y: 160,
                items: [txtledger]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 300,
                border: false,
                labelWidth: 70,
                x: 20,
                y: 110,
                items: [asondate]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 120,
                border: false,
                labelWidth: 1,
                x: 220,
                y: 115,
                items: [chkPAY]
            }            
        ]
    });

    var frmwindow = new Ext.Window({
        height: 450,
        width: 650,
        bodyStyle: 'padding: 10px',
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field', bodyStyle:{"background-color": "#3399CC"},
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        title: 'CHEQUE PRINTING',
        y: 120,
        items: fp,
        listeners:
                {
                    show: function () {
                        accnamedatastore.load({
                            url: '/SHVPM/Financials/clsRepFinancials.php',
                            params: {
                                task: 'chqaccname',
                                compcode: GinCompcode
                            }
                        });
                    }
                }
    }).show();
});

