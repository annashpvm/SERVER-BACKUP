/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
    var slno;
    var accledcode = 0;
    var flag;
    var curcode;
    var dgaccrecord = Ext.data.Record.create([]);
    var dateon;
    var getdate;
    var taxtypenew = 'CS';
    var powerid=localStorage.getItem('powerid');	
    var voupoint
    var ledtype ="G";
    var taxtypenew = 'CS';

    function RefreshData() {
        flxDetailpbm.hide();
        gstFlag = "Add";
        txtDebit.disable();
        txtCredit.disable();
        txtAmount.enable();
        txtExgrate.disable();
        cmbsection.disable();
        txtTotalcramt.setValue("");
        txtTotaldbamt.setValue("");
        txtAmount.setValue("");
        txtCredit.setValue("");
        txtDebit.setValue("");
        txtExgrate.setValue("");
        txtNarration.setValue("");
        txtRefno.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue("Dr");
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbAcctname.setValue("");
        flag = "A";
        flxDetail.getStore().removeAll();
        Currencydatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcurrency"
                    }
        });
	
        Ledgerdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbacctname",
                        compcode: gstfincompcode
                    }
        });
        Voucherdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbvoucher",
                        finid: ginfinid,
                        voutype: 'EX'
                    }
        });
        
        VouNodatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "getvouno",
                        finyear: ginfinid,
                        compcode: gstfincompcode
                    },
            callback: function () {
                cmbVouno.setValue("EX" + VouNodatastore.getAt(0).get('con_value'));
            }
        });
        if (gstfinyear.substring(5, 9) === '2019') {
            dtpVoudate.setRawValue('31-' + '03-' + gstfinyear.substring(5, 9));
        }
        flxDetailpbm.getStore().removeAll();
        ExpbmDataStore.removeAll();
        ExpbmDataStore.load({
            url: '/SHVPM/Financials/datechk.php',
            params: {
                task: 'Expbm',
                finid: ginfinid
            },
            callback: function () {
                var cnt = ExpbmDataStore.getCount();
                if (cnt > 0) {
                    flxDetailpbm.hide();
                } else {
                    flxDetailpbm.hide();
                }
            }
        });
	    if(ginfinid<27 && powerid==='capitalacc'){
		    ExpensesEntryWindow.show();
	    }else if(ginfinid>26 && powerid==='capital'){
		    ExpensesEntryWindow.show();
	    }else if(ginfinid<27 && powerid==='capital'){
		    ExpensesEntryWindow.hide();
	    }	
    }

    function RefreshGridData() {
        txtDebit.setValue("");
        txtCredit.setValue("");
        txtAmount.setValue("");
        txtExgrate.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue('Dr');
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbAcctname.setValue("");
        txtgstvalue.setRawValue('');
        txtper.setRawValue('');
        txthsn.setRawValue('');
    }

    function CalcTotalDebitCredit() {
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        var gintotgst = 0;
        var gintottds = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
            gintotgst = gintotgst + Number(sel[i].data.gst);
            gintottds = gintottds + Number(sel[i].data.tdsval);
        }
        txtTotaldbamt.setValue(Number(gindbtotal) + Number(gintotgst));
        txtTotalcramt.setValue(gincrtotal);
        txtTotalgst.setValue(gintotgst);
        txtTotaltds.setValue(gintottds);
        if(Number(txtTotaltds.getValue() > 0))
                {
                cmbsection.enable();
                }
                else
                {
                 cmbsection.disable();
                 cmbsection.setRawValue('');
                }
    }


    var ExpbmDataStore = new Ext.data.Store({
        id: 'ExpbmDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/datechk.php',
            method: 'POST'
        }),
        baseParams: {task: "Expbm"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_comp_code', 'accref_vouno'
        ])
    });


    var TdsLedgergetDataStore = new Ext.data.Store({
        id: 'TdsLedgergetDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/datechk.php',
            method: 'POST'
        }),
        baseParams: {task: "TdsLedgerget"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_grp_code'
        ])
    });

    var Currencydatastore = new Ext.data.Store({
        id: 'Currencydatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbcurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cur_code', type: 'int', mapping: 'currency_code'},
            {name: 'cur_name', type: 'string', mapping: 'currency_symbol'}
        ]),
        sortInfo: {field: 'cur_code', direction: "ASC"}
    });

    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbacctname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'},
            {name: 'led_type', type: 'string', mapping: 'led_type'},
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });


    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'},
            {name: 'led_type', type: 'string', mapping: 'led_type'},
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });


    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbvoucher"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
            {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
        sortInfo: {field: 'vou_seqno', direction: "ASC"}
    });

    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/datechk.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DATECHECKING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['date'])
    });

    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getvouno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['con_value'])
    });

    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel: 'Vou No',
        width: 90,
        store: Voucherdatastore,
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbVouno', readOnly: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false
    });
    
    var cmbsection = new Ext.form.ComboBox({
        fieldLabel: 'Section',
        width: 90,
        store: ['194C','194F','194H','194I','194J'],
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbsection', readOnly: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false
    });

    var dtpVoudate = new Ext.form.DateField({
        fieldLabel: 'Vou Date',
        id: 'dtpVoudate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        listeners: {
            select: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVoudate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            },
            blur: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVoudate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });

    var lblAcctname = new Ext.form.Label({
        fieldLabel: 'Account Name',
        id: 'lblAcctname',
        width: 70
    });




var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadSGSTLedgerDataStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadIGSTLedgerDataStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbIGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});



    var grpcodetds = 0;
    var cmbAcctname = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: Ledgerdatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbAcctname',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                txtper.setValue('');
                txtgstvalue.setValue('');
                txtper.show();
                txtgstvalue.show();
                lblPer.show();
                lblgstvalue.show();
                txtpertds.setValue('');
                txtgstvaluetds.setValue('');
                txtpertds.hide();
                txtgstvaluetds.hide();
                lblPertds.hide();
                lblgstvaluetds.hide();



                grpcodetds = 0;

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Financials/clsFinancials.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAcctname.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});



                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbAcctname.getValue()
                    },
                    callback: function () {
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                        if (grpcodetds === '157') {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.show();
                            txtgstvalue.show();
                            lblPer.show();
                            lblgstvalue.show();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.hide();
                            txtgstvaluetds.hide();
                            lblPertds.hide();
                            lblgstvaluetds.hide();
                        } else if (grpcodetds === '65') {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.hide();
                            txtgstvalue.hide();
                            lblPer.hide();
                            lblgstvalue.hide();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.show();
                            txtgstvaluetds.show();
                            lblPertds.show();
                            lblgstvaluetds.show();
                        } else {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.show();
                            txtgstvalue.show();
                            lblPer.show();
                            lblgstvalue.show();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.hide();
                            txtgstvaluetds.hide();
                            lblPertds.hide();
                            lblgstvaluetds.hide();
                        }
                    }
                });
            },
            blur: function () {
                grpcodetds = 0;
                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbAcctname.getValue()
                    },
                    callback: function () {
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');//grp as 65
                        if (grpcodetds === '157') {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.show();
                            txtgstvalue.show();
                            lblPer.show();
                            lblgstvalue.show();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.hide();
                            txtgstvaluetds.hide();
                            lblPertds.hide();
                            lblgstvaluetds.hide();
                        } else if (grpcodetds === '65') {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.hide();
                            txtgstvalue.hide();
                            lblPer.hide();
                            lblgstvalue.hide();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.show();
                            txtgstvaluetds.show();
                            lblPertds.show();
                            lblgstvaluetds.show();
                        } else {
                            txtper.setValue('');
                            txtgstvalue.setValue('');
                            txtper.show();
                            txtgstvalue.show();
                            lblPer.show();
                            lblgstvalue.show();
                            txtpertds.setValue('');
                            txtgstvaluetds.setValue('');
                            txtpertds.hide();
                            txtgstvaluetds.hide();
                            lblPertds.hide();
                            lblgstvaluetds.hide();
                        }
                    }
                });
            }
        }
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency', hidden: true,
        width: 70
    });

    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 70,
        store: Currencydatastore,
        displayField: 'cur_name',
        valueField: 'cur_code',
        hiddenName: 'cur_name', hidden: true,
        id: 'cmbCurrency',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmount.enable();
                    txtExgrate.disable();
                    txtAmount.setValue("");
                    txtExgrate.setValue("");
                } else {
                    txtAmount.enable();
                    txtExgrate.enable();
                }
            }
        }
    });

    var opttax = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 300,
        height: 100,
        border: false,
        items: [{xtype: 'radiogroup', columns: 3, rows: 1, id: 'opttax',
                items: [
                    {boxLabel: 'CGST/SGST', name: 'opttax', inputValue: 1, id: 'opttaxcsgst', checked: true,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    taxtypenew = 'CS';
				    txtper.enable();
				    txtgstvalue.enable();
                                    cmbCGSTledger.enable();
                                    cmbSGSTledger.enable();
                                    cmbIGSTledger.disable();

                                }
                            }
                        }
                    }, {boxLabel: 'IGST', name: 'opttax', inputValue: 2, id: 'opttaxisgst',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    taxtypenew = 'I';
				    txtper.enable();
				    txtgstvalue.enable();
                                    cmbCGSTledger.disable();
                                    cmbSGSTledger.disable();
                                    cmbIGSTledger.enable();

                                }
                            }
                        }
                    }, {boxLabel: 'NO GST', name: 'opttax', inputValue: 3, id: 'opttaxnogst',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    taxtypenew = 'N';
				    txtper.disable();
				    txtgstvalue.disable();
                                    cmbCGSTledger.disable();
                                    cmbSGSTledger.disable();
                                    cmbIGSTledger.disable();

                                }
                            }
                        }
                    },


                ]
            }
        ]
    });

    var lblPertds = new Ext.form.Label({
        fieldLabel: 'TDS %',
        id: 'lblPertds', hidden: true,
        width: 70
    });

    var txtpertds = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtpertds',
        hidden: true,
        width: 50,
        name: 'txtpertds'
    });

    var lblPer = new Ext.form.Label({
        fieldLabel: 'GST %',
        id: 'lblPer',
        width: 70
    });

    var txtper = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtper',
        width: 50,
        name: 'txtper',
        enableKeyEvents:true,
        listeners: {
            keyup: function () {
                if (txtper.getValue() != 0 ) {
                    txtgstper.setValue(txtper.getValue());
                }
                loadgstledgers();
            }
        }    
       });

    var txtgstper = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtgstper',
        width: 50,
        name: 'txtgstper',
        readOnly : true,
        enableKeyEvents:true,
        listeners: {
            keyup: function () {
                loadgstledgers();
            }
        }  

    });


    /*   var txtper = new Ext.form.TextField({
     fieldLabel  : '',
     id          : 'txtper',
     width       : 50,
     name        : 'txtper',
     enableKeyEvents:true,
     listeners:{
     keyup:function(){
     if(txtDebit.getRawValue()>0){
     txtgstvalue.setRawValue("0");
     var newvvalue=(Number(txtper.getRawValue())*Number(txtDebit.getRawValue()))/Number(100);
     newvvalue = newvvalue.toString(); 
     newvvalue = newvvalue.slice(0, (newvvalue.indexOf("."))+3); 
     txtgstvalue.setRawValue(Number(newvvalue));
     }
     }
     }
     });*/

    var lblgstvaluetds = new Ext.form.Label({
        fieldLabel: 'TDS Tax',
        id: 'lblgstvaluetds', hidden: true,
        width: 70
    });

    var txtgstvaluetds = new Ext.form.NumberField({
        fieldLabel: '',
        hidden: true,
        id: 'txtgstvaluetds',
        width: 130,
        name: 'txtgstvaluetds',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                cmbType.setRawValue('Cr');
                txtDebit.disable();
                txtCredit.enable();
                txtDebit.setValue("");
                txtCredit.setValue(Math.round((Number(txtpertds.getValue()) * Number(txtgstvaluetds.getValue())) / Number(100)));
            }
        }
    });

    var lblgstvalue = new Ext.form.Label({
        fieldLabel: 'GST Tax',
        id: 'lblgstvalue',
        width: 70
    });

    var txtgstvalue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        width: 130,
        name: 'txtgstvalue'
    });

    var lblAmount = new Ext.form.Label({
        fieldLabel: 'Per%', hidden: true,
        id: 'lblAmount',
        width: 70
    });

    var txtAmount = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmount', hidden: true,
        width: 70,
        name: 'amount'
    });

    var lblExgrate = new Ext.form.Label({
        fieldLabel: 'Exg Rate',
        id: 'lblExgrate', hidden: true,
        width: 60
    });

    var txtExgrate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtExgrate',
        width: 60, hidden: true,
        name: 'exgrate'
    });

    var txthsn = new Ext.form.NumberField({
        fieldLabel: 'HSN',
        id: 'txthsn',
        width: 100,
        name: 'txthsn'
    });

    var lblType = new Ext.form.Label({
        fieldLabel: 'Type',
        id: 'lblType',
        width: 50
    });

    var cmbType = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 50,
        displayField: 'type_name',
        valueField: 'type_code',
        hiddenName: 'type_name',
        id: 'cmbType',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false,
        store: [['1', 'Dr'], ['2', 'Cr']],
        listeners: {
            	blur: function () {
		//alert(cmbType.getRawValue())
                if (cmbType.getValue() == 1) {
                    txtDebit.enable();
                    txtCredit.disable();
                    txtCredit.setValue("");
                } else if (cmbType.getValue() == 2) {
                    txtDebit.disable();
                    txtCredit.enable();
                    txtDebit.setValue("");
                } else {
                    txtDebit.disable();
                    txtCredit.disable();
                    txtDebit.setValue("");
                    txtCredit.setValue("");
                }
                if (cmbCurrency.getRawValue() !== "INR") {
                    if (cmbType.getValue() == 1) {
                        txtDebit.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue()) * Number(txtExgrate.getRawValue())), "0.00"));
                        txtCredit.setValue("");
                    } else if (cmbType.getValue() == 2) {
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue()) * Number(txtExgrate.getRawValue())), "0.00"));
                        txtDebit.setValue("");
                    }
                }
            },select: function () {
                if (cmbType.getRawValue() === 'Dr') {
                    txtDebit.enable();
                    txtCredit.disable();
                    txtCredit.setValue("");
                } else if (cmbType.getRawValue() === 'Cr') {
                    txtDebit.disable();
                    txtCredit.enable();
                    txtDebit.setValue("");
                } else {
                    txtDebit.disable();
                    txtCredit.disable();
                    txtDebit.setValue("");
                    txtCredit.setValue("");
                }
            }
        }
    });

    var lblDebit = new Ext.form.Label({
        fieldLabel: 'Debit',
        id: 'lblDebit',
        width: 70
    });

    var txtDebit = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtDebit',
        width: 70,
        name: 'debit'
    });

    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Credit',
        id: 'lblCredit',
        width: 70
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',
        width: 70,
        name: 'credit'
    });

    var btnSubmit = new Ext.Button({
        style: 'text-align:center;',
        text: "Submit",
        width: 60,
        x: 715,
        y: 5,
        listeners: {
            click: function () {
                var gstInsert = "true";
                if (cmbAcctname.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Expenses", "Select Ledger");
                } else if (cmbCurrency.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Expenses", "Select Currency");
                } else if (cmbCurrency.getRawValue() != "INR") {
                    if (txtAmount.getRawValue() === "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter the Amount");
                    }
                    if (txtExgrate.getRawValue() === "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter Exchange Rate");
                    }
                } else if (cmbType.getValue() == 1) {
                    if (txtDebit.getRawValue() === "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter Debit Amount");
                    }
                } else if (cmbType.getValue() == 2) {
                    if (txtCredit.getRawValue() === "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter Credit Amount");
                    }
                } 
		   if (grpcodetds==65) {
                    if (txtpertds.getRawValue() === "" || txtpertds.getValue() ==0) {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter Tds Percentage!");
                    } 
		    else if (txtgstvaluetds.getRawValue() === ""|| txtgstvaluetds.getValue() ==0) {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Expenses", "Enter Tds Value!");
                    }
                  }

/*
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq === cmbAcctname.getValue()) {
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Expenses", "This Ledger Already Entered");
                }
*/

var tamt = 0;
var tdsamt1 =0;
                if (gstInsert === "true") {
                    var totamt;
                    if (cmbType.getValue() == 1) {
                        totamt = Number(txtDebit.getRawValue())
                    } else if (cmbType.getValue() == 2) {
                        totamt = Number(txtCredit.getRawValue())
                    }
                    if (totamt > 0) {
                        flag = "A";
                        if (flag === "A") {
                            var RowCnt = flxDetail.getStore().getCount() + 1;
                            tamt =0;
                            if (ledtype != "G")   
                            {
                               tamt =  totamt;              
                            } 
                            flxDetail.getStore().insert(
                                    flxDetail.getStore().getCount(),
                                    new dgaccrecord({
                                        slno: RowCnt,
                                        ledname: cmbAcctname.getRawValue(),
                                        currency: cmbCurrency.getRawValue(),
                                        amount: Number(txtper.getRawValue()),
                                        gst: Number(txtgstvalue.getRawValue()),
                                        hsn: txthsn.getRawValue(),
                                        exgrate: Number(txtExgrate.getRawValue()),
                                        type: cmbType.getRawValue(),
                                        dbamt: Number(txtDebit.getRawValue()),
                                        cramt: Number(txtCredit.getRawValue()),
                                        ledseq: cmbAcctname.getValue(),
                                        curseq: cmbCurrency.getValue(),
                                        totamt: totamt,
                                        tdsper: Number(txtpertds.getRawValue()),
                                        tdsval: Number(txtgstvaluetds.getRawValue()),
                                        ledtype : ledtype,
                                        total1  :tamt,

                                    })
                                    );

					flxDetail.getSelectionModel().selectAll();
					var selrows = flxDetail.getSelectionModel().getCount();
					var sel = flxDetail.getSelectionModel().getSelections();
					for (var i = 0; i < selrows; i++) {
                                           if (sel[i].data.ledname.substring(0,6) == 'TDS ON') 
                                           {
                                               tdsamt1 =  Number(sel[i].data.totamt);
                                           }
					}

		                       if (Number(tdsamt1) > 0)

		                        {
						flxDetail.getSelectionModel().selectAll();
						var selrows = flxDetail.getSelectionModel().getCount();
						var sel = flxDetail.getSelectionModel().getSelections();
						for (var i = 0; i < selrows; i++) {
		                                   if (sel[i].data.total1 > 0) 
		                                   {
		                                       tamt1 =  Number(sel[i].data.total1) - tdsamt1 ;
						       sel[i].set('total1', tamt1);
		                                   }
						}

		                        }  


                            CalcTotalDebitCredit();
                            RefreshGridData();
                        } else if (flag === "E") {
                            var RowCnt = flxDetail.getStore().getCount() + 1;
                            flxDetail.getStore().insert(
                                    flxDetail.getStore().getCount(),
                                    new dgaccrecord({
                                        slno: slno,
                                        ledname: cmbAcctname.getRawValue(),
                                        currency: cmbCurrency.getRawValue(),
                                        amount: Number(txtper.getRawValue()),
                                        gst: Number(txtgstvalue.getRawValue()),
                                        hsn: txthsn.getRawValue(),
                                        exgrate: Number(txtExgrate.getRawValue()),
                                        type: cmbType.getRawValue(),
                                        dbamt: Number(txtDebit.getRawValue()),
                                        cramt: Number(txtCredit.getRawValue()),
                                        ledseq: accledcode,
                                        curseq: curcode,
                                        totamt: totamt,
                                        tdsper: Number(txtpertds.getRawValue()),
                                        tdsval: Number(txtgstvaluetds.getRawValue())
                                    })
                                    );
                            CalcTotalDebitCredit();
                            RefreshGridData();
			   cmbAcctname.setRawValue('');
			   cmbAcctname.focus();
                        }
                    } else {
                        Ext.Msg.alert("Alert", "Check The Amount!");
                    }
                }
                
            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 60,
        x: 715,
        y: 35,
        handler: function () {
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
        }
    });

    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'InvoiceDetDataStore'
        }, ['slno', 'ledname', 'currency', 'amount', 'exgrate', 'type', 'dbamt', 'cramt', 'ledseq', 'curseq'])
    });


    var flxDetailpbm = new Ext.grid.EditorGridPanel({
        frame: false,
        store: ExpbmDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,hidden:true,
        scrollable: true,
        hideHeaders: true,
        height: 100,
        width: 130,
        x: 660,
        y: 3,
        columns: [
            {header: "", dataIndex: 'accref_vouno', sortable: true, width: 60, align: 'left'},
            {header: "", dataIndex: 'accref_comp_code', sortable: true, width: 60, align: 'left'}
        ]
    });

    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 110,
        width: 760,
        x: 10,
        y: 60,
        columns: [
            {header: "Sl No", dataIndex: 'slno', sortable: true, width: 40, align: 'left'},
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 270, align: 'left'},
            {header: "Currency", dataIndex: 'currency', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "GST%", dataIndex: 'amount', sortable: true, width: 80, align: 'left'},
            {header: "GST Tax", dataIndex: 'gst', sortable: true, width: 80, align: 'left'},
            {header: "HSN", dataIndex: 'hsn', sortable: true, width: 80, align: 'left'},
            {header: "Ex. Rate", dataIndex: 'exgrate', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Type", dataIndex: 'type', sortable: true, width: 50, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 90, align: 'left'},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 90, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Curseqno", dataIndex: 'curseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "TOTAL", dataIndex: 'totamt', sortable: true, width: 60, align: 'left'},
            {header: "tdsper", dataIndex: 'tdsper', sortable: true, width: 40, align: 'left', hidden: false},
            {header: "tdsval", dataIndex: 'tdsval', sortable: true, width: 40, align: 'left', hidden: false},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 40, align: 'left'},
            {header: "total1", dataIndex: 'total1', sortable: true, width: 40, align: 'left'},

        ],
        listeners: {
            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
                Ext.Msg.show({
                    title: 'Expenses',
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.MessageBox.YESNO,
                    msg: 'Do You Want To Edit This Record!',
                    fn: function (btn) {
                        if (btn === 'yes') {
                            flag = "E";
                            var sto = flxDetail.getStore().getAt(rowIndex);
                            var column = flxDetail.getColumnModel().getDataIndex(0);
                            slno = sto.get(column);

                            var store = flxDetail.getStore().getAt(rowIndex);
                            var columnName = flxDetail.getColumnModel().getDataIndex(1);
                            var accname = store.get(columnName);
                            cmbAcctname.setRawValue(accname);

                            var store1 = flxDetail.getStore().getAt(rowIndex);
                            var columnName1 = flxDetail.getColumnModel().getDataIndex(2);
                            var accname1 = store1.get(columnName1);
                            cmbCurrency.setRawValue(accname1);

                            var store2 = flxDetail.getStore().getAt(rowIndex);
                            var columnName2 = flxDetail.getColumnModel().getDataIndex(3);
                            var accname2 = store2.get(columnName2);
                            txtAmount.setRawValue(accname2);

                            var store3 = flxDetail.getStore().getAt(rowIndex);
                            var columnName3 = flxDetail.getColumnModel().getDataIndex(4);
                            var accname3 = store3.get(columnName3);
                            txtExgrate.setRawValue(accname3);

                            var store4 = flxDetail.getStore().getAt(rowIndex);
                            var columnName4 = flxDetail.getColumnModel().getDataIndex(5);
                            var accname4 = store4.get(columnName4);
                            cmbType.setRawValue(accname4);

                            var store5 = flxDetail.getStore().getAt(rowIndex);
                            var columnName5 = flxDetail.getColumnModel().getDataIndex(6);
                            var accname5 = store5.get(columnName5);
                            txtDebit.setRawValue(accname5);

                            var store6 = flxDetail.getStore().getAt(rowIndex);
                            var columnName6 = flxDetail.getColumnModel().getDataIndex(7);
                            var accname6 = store6.get(columnName6);
                            txtCredit.setRawValue(accname6);

                            var store7 = flxDetail.getStore().getAt(rowIndex);
                            var columnName7 = flxDetail.getColumnModel().getDataIndex(8);
                            accledcode = store7.get(columnName7);

                            var store8 = flxDetail.getStore().getAt(rowIndex);
                            var columnName8 = flxDetail.getColumnModel().getDataIndex(9);
                            curcode = store8.get(columnName8);

                            var storetdsper = flxDetail.getStore().getAt(rowIndex);
                            var columnNametdsper = flxDetail.getColumnModel().getDataIndex(10);
                            var accnametds = storetdsper.get(columnNametdsper);
                            txtpertds.setRawValue(accnametds);

                            var storetdsval = flxDetail.getStore().getAt(rowIndex);
                            var columnNametdsval = flxDetail.getColumnModel().getDataIndex(11);
                            var accnametdval = storetdsval.get(columnNametdsval);
                            txtgstvaluetds.setRawValue(accnametdval);

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            CalcTotalDebitCredit();
                        }
                    }
                });
            }
        }
    });


    var txtTotaltds = new Ext.form.NumberField({
        fieldLabel: 'TDS TaxTotal',
        id: 'txtTotaltds',
        width: 80, readOnly: true,
        name: 'txtTotaltds'
    });

    var txtTotalgst = new Ext.form.NumberField({
        fieldLabel: 'GST TaxTotal',
        id: 'txtTotalgst',
        width: 80, readOnly: true,
        name: 'txtTotalgst'
    });

    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel: '',
        readOnly: true,
        id: 'txtTotaldbamt',
        width: 80,
        name: 'totaldbamt'
    });

    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotalcramt', readOnly: true,
        width: 80,
        name: 'totalcramt'
    });

    var txtRefno = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefno',
        width: 100,
        name: 'refno',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var dtpRefdate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefdate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
	//value: '2020-03-31',
        anchor: '100%'
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 685,
        height: 50,
        name: 'narration',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var cmbEXType = new Ext.form.ComboBox({
        fieldLabel: 'Division',
        width: 150,
        displayField: 'type_name',
        valueField: 'type_code',
        hiddenName: 'type_name',
        id: 'cmbEXType',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false,
        store: [['1', 'SHVPM-I'], ['2', 'SHVPM-II'], ['3', 'SHVPM-III'], ['4', 'VJPM'], ['5', 'POWER PLANT'], ['6', 'VJPM BOILER']],
	});	

    var txtqty = new Ext.form.NumberField({
        fieldLabel: 'Qty',
        id: 'txtqty',
        width: 70,
        name: 'txtqty'
    });

    var cmbExTypeMtr = new Ext.form.ComboBox({
        fieldLabel: 'Mtr/Kgs',
        width: 60,
        displayField: 'type_name',
        valueField: 'type_code',
        hiddenName: 'type_name',
        id: 'cmbExTypeMtr',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false,
        store: [['1', 'METER'], ['2', 'KGS']],
	});

    var cmbNature = new Ext.form.ComboBox({
        fieldLabel: 'Nature Of Jobwork',
        width: 150,
        displayField: 'type_name',
        valueField: 'type_code',
        hiddenName: 'type_name',
        id: 'cmbNature',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false,
        store: [['1', 'AS PER BILL'], ['2', 'SERVICE'], ['3', 'PRINTING'], ['4', 'STENTER'], ['5', 'WARPING & SIZING'], ['6', 'FINAL INSPECTION'], ['7', 'GREY INSPECTION'], ['8', 'PACKING'], ['9', 'LOAD AND UNLOAD'], ['10', 'MENDING'], ['11', 'INCENTIVE '], ['12', 'TERRY DYEING ']],
	});

    var ExpensesEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Expenses Entry',
        header: false,
        width: 438,
        height: 280,
        bodyStyle: {"background-color": "#768761"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x: 0,
        y: 0,
        frame: false,
        id: 'ExpensesEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, []),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
              {
                    text: 'Add',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                           gstFlag = "Add";
                           cmbVouno.setRawValue('');
                           Voucherdatastore.removeAll();
        		    VouNodatastore.load({
			    url: '/SHVPM/Financials/clsFinancials.php',
			    params:
				    {
				        task: "getvouno",
				        finyear: ginfinid,
				        compcode: gstfincompcode
				    },
			    callback: function () {
				cmbVouno.setValue("EX" + VouNodatastore.getAt(0).get('con_value'));
				cmbVouno.readOnly(true);
			    }
        		   });

                        }
                    }
                }, '-',
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/save.png',
                    handler: function () {
                        var rcnt = flxDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        fromdate = "04/01/" + gstfinyear.substring(0, 4);
                        todate = "03/31/" + gstfinyear.substring(5, 9);
                        
                        if (Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (rcnt <= 0) {
                            Ext.MessageBox.alert("Expenses", "Transactions Details Not Avaliable ..");
                        } else if (Number(txtTotaldbamt.getRawValue()) !== Number(txtTotalcramt.getRawValue())) {
                            Ext.MessageBox.alert("Expenses", "The Transactions Debit and Credit Amount are not  Equal");
                        } else if  ((taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                            Ext.MessageBox.alert("Expenses", "Select CGST / SGST Ledger Names");
                        } else if  (taxtypenew == "I"  && cmbICGSTledger.getValue() == '') {
                            Ext.MessageBox.alert("Expenses", "Select IGST Ledger Names");            
                        }
                        else if(Number(txtTotaltds.getValue()) > 0)
                        	{
                        	if(cmbsection.getRawValue()=='' || cmbsection.getRawValue()== 0 )
                        		{
                        		 Ext.MessageBox.alert("Expenses", "Select Section");   
                        		}
                        	else
                        		{
                        		 Ext.Msg.show({
		                        title: 'Expenses Voucher',
		                        icon: Ext.Msg.QUESTION,
		                        buttons: Ext.MessageBox.YESNO,
		                        msg: 'Are You Sure to Add This Record?',
		                        fn: function (btn) {
                                    	 if (btn === 'yes') {
                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnExpensesSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: 0,
                                                taxtype: taxtypenew,
                                                per: txtper.getRawValue(),
                                                taxval: txtTotalgst.getRawValue(),
                                                vouno: cmbVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d"),
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(), "Y-m-d"),
                                                narration: txtNarration.getRawValue(),
						extype:cmbEXType.getRawValue(),
						exqty:txtqty.getValue(),
						ExTypeMtr:cmbExTypeMtr.getRawValue(),
						Nature:cmbNature.getRawValue(),
                                                cgst  : cmbCGSTledger.getValue(),
                                                sgst  : cmbSGSTledger.getValue(),
                                                igst  : cmbIGSTledger.getValue(),
                                                entrypoint : voupoint,
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                tdssection:cmbsection.getRawValue()
                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] === "true") {
                                                    Ext.Msg.show({
                                                        title: 'Financial',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Expense Saved with Voucher No -' + obj['vouno'],
                                                        fn: function (btn) {
                                                            if (btn == 'yes') {
                                                                window.location.reload();
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    Ext.MessageBox.alert("Financial", "Record Failed / CGST/SGST/IGST Tax Decimal Value Not Accepted!");
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        		}
                        	}

 			else {
                            Ext.Msg.show({
                                title: 'Expenses Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Are You Sure to Add This Record?',
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnExpensesSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: 0,
                                                taxtype: taxtypenew,
                                                per: txtper.getRawValue(),
                                                taxval: txtTotalgst.getRawValue(),
                                                vouno: cmbVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d"),
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(), "Y-m-d"),
                                                narration: txtNarration.getRawValue(),
						extype:cmbEXType.getRawValue(),
						exqty:txtqty.getValue(),
						ExTypeMtr:cmbExTypeMtr.getRawValue(),
						Nature:cmbNature.getRawValue(),
                                                cgst  : cmbCGSTledger.getValue(),
                                                sgst  : cmbSGSTledger.getValue(),
                                                igst  : cmbIGSTledger.getValue(),
                                                entrypoint : voupoint,
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                tdssection:cmbsection.getRawValue()
                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] === "true") {
                                                    Ext.Msg.show({
                                                        title: 'Financial',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Expense Saved with Voucher No -' + obj['vouno'],
                                                        fn: function (btn) {
                                                            if (btn == 'yes') {
                                                                window.location.reload();
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    Ext.MessageBox.alert("Financial", "Record Failed / CGST/SGST/IGST Tax Decimal Value Not Accepted!");
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }, '-',
                 {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                           gstFlag = "Edit";
                           Voucherdatastore.load({
			     url: '/SHVPM/Financials/clsFinancials.php',
			     params:
				    {
				        task: "cmbvoucher",
				        finid: ginfinid,
				        gincompcode:gstfincompcode,
				        voutype: 'EX'
				    }
        		     });
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
                        }
                    }
                }, '-',
                 {
                    text: 'View',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                        
                        if(gstFlag == 'Edit')
                        {
                        var v1 = gstfincompcode
                        var v2 = ginfinid
                        var v3=Ext.getCmp('cmbVouno').getValue();
                        var v4=Ext.getCmp('cmbVouno').getValue();
                        var p1 = "&compcode=" + encodeURIComponent(v1);
			 var p2 = "&finid=" + encodeURIComponent(v2);
			 var p3 = "&vounofrom=" + encodeURIComponent(v3);
			 var p4 = "&vounoto=" + encodeURIComponent(v4);
                        var param = (p1+p2+p3+p4) ;
                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepVoucherprint.rptdesign' + param, '_blank'); 
                        }
                        }
                    }
                }, '-',
                
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            ExpensesEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 785,
                height: 60,
                x: 2,
                y: 0,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 170,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [cmbVouno]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 150,
                        y: 10,
                        labelWidth: 60,
                        border: false,
                        items: [dtpVoudate]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        width: 300,
                        x: 325,
                        y: 0,
                        labelWidth: 200,
                        border: false,
                        items: [opttax]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 250,
                        x: 600,
                        y: 10,
                        defaultType: 'textfield',
                        border: false,
                        items: [txthsn]
                    },
                ]
            },
            {xtype: 'fieldset',
                title: '',
                width: 785,
                height: 290,
                x: 2,
                y: 60,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 5,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblAcctname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 350,
                        x: 0,
                        y: 20,
                        border: false,
                        items: [cmbAcctname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 350,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblCurrency]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 345,
                        y: 20,
                        border: false,
                        items: [cmbCurrency]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 315,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblPertds]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 305,
                        y: 20,
                        border: false,
                        items: [txtpertds]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 360,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblgstvaluetds]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 300,
                        x: 355,
                        y: 20,
                        border: false,
                        items: [txtgstvaluetds]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 315,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblPer]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 305,
                        y: 20,
                        border: false,
                        items: [txtper]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 360,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblgstvalue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 300,
                        x: 355,
                        y: 20,
                        border: false,
                        items: [txtgstvalue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 420,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblAmount]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 415,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAmount]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 90,
                        x: 430,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblExgrate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 90,
                        x: 425,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtExgrate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 80,
                        x: 495,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 80,
                        x: 490,
                        y: 20,
                        border: false,
                        items: [cmbType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 550,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 545,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 625,
                        y: 0,
                        defaultType: 'Label',
                        border: false,
                        items: [lblCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 100,
                        x: 620,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtCredit]
                    }, btnSubmit, btnRemove, flxDetail,
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 85,
                        width: 300,
                        x: 400,
                        y: 165,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotalgst]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 85,
                        width: 300,
                        x: 150,
                        y: 165,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotaltds]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 110,
                        x: 565,
                        y: 165,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotaldbamt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 110,
                        x: 650,
                        y: 165,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotalcramt]
                    },    
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 0,
                        y: 190,
                        border: false,
                        items: [cmbCGSTledger]
                    },
                   {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 10,
                        width: 100,
                        x: 500,
                        y: 190,
                        border: false,
                        items: [txtgstper]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 0,
                        y: 220,
                        border: false,
                        items: [cmbSGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 0,
                        y: 250,
                        border: false,
                        items: [cmbIGSTledger]
                    },
                     {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 500,
                        x: 470,
                        y: 250,
                        border: false,
                        items: [cmbsection]
                    },
                    
                    


                ]
            },
            {xtype: 'fieldset',
                title: '',
                width: 785,
                height: 100,
                x: 2,
                y: 350,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 200,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtRefno]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 200,
                        y: 0,
                        labelWidth: 60,
                        border: false,
                        items: [dtpRefdate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 775,
                        x: 0,
                        y: 30,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtNarration]
                    }, flxDetailpbm
                ]
            }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 775,
                        x: 0,
                        y: 450,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbEXType]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 20,
                        width: 250,
                        x: 250,
                        y: 450,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtqty]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 775,
                        x: 350,
                        y: 450,
                        border: false,
                        items: [cmbExTypeMtr]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 110,
                        width: 775,
                        x: 470,
                        y: 450,
                        border: false,
                        items: [cmbNature]
                    },
        ]
    });

function loadgstledgers()
{
         	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : txtgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : txtgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : txtgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
                       cmbIGSTledger.disable();


}


    var ExpensesEntryWindow = new Ext.Window({
        height: 560,
        width: 802,
        y: 60,
        title: 'Expenses Entry',
        items: ExpensesEntryFormPanel,
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners:
                {
                    show: function () {
                        RefreshData();

               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }

              loadgstledgers();  
                    }
                }
    });
    ExpensesEntryWindow.show();
});


