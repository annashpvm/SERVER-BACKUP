/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();

    var gstFlag;
    var gdt_enddate;
    var gst_depname;
    var OptExpComm;
    var invdate;
    var invcomm;
    var invdiscount;
    var invvalue;
    var totalinv;
    var invno;
    var gincrvalue = 0;
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfinuser = localStorage.getItem('ginuser');
    var gstfincompcode = localStorage.getItem('gincompcode');
    var dgrecord = Ext.data.Record.create([]);
    var billflag;
    var gindbtotal;
    var taxtypenew = 'CS';
    var ledtype = "I";

    var partytype = "G";

   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var voupoint;


var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
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
      autoLoad : true,
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
      autoLoad : true,
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

    function calculatedbvalue() {
        flxBillDetail.getSelectionModel().selectAll();
        var selrows = flxBillDetail.getSelectionModel().getCount();
        var sel = flxBillDetail.getSelectionModel().getSelections();
        gindbtotal = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.Debit_val);
        }
        txtDebitVal.setValue(parseFloat(gindbtotal));
    }

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

    var PartynameDataStore = new Ext.data.Store({
        id: 'PartynameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Partyname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });


    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadLedgerlist"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });


    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ControlDebitNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_vouno'])
    });

    var ReasonDataStore = new Ext.data.Store({
        id: 'ReasonDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbReason"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Reason_code', type: 'int', mapping: 'reason_code'},
            {name: 'Reason_name', type: 'string', mapping: 'reason_name'}
        ])
    });

    var InvoiceDetails2DataStore = new Ext.data.Store({
        id: 'InvoiceDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_inv_date', 'acctran_totamt', 'acctrail_inv_value'
        ])
    });


 var TdsLedgergetDataStore = new Ext.data.Store({
      id: 'TdsLedgergetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/datechk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"TdsLedgerget"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'led_grp_code'

      ]),
    });

    var InvoicNoDataStore = new Ext.data.Store({
        id: 'InvoicNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbInvNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_value',
            'accref_vou_type', 'acctrail_adj_value'
        ])
    });

    var PartyAddressDataStore = new Ext.data.Store({
        id: 'PartyAddressDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Address"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_addr1', 'led_addr2'
        ])
    });

    var bill;
    var optOption = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 400,
        height: 100,
        border: false,
        items: [{xtype: 'radiogroup', columns: 1, rows: 1, id: 'optOption',
                items: [
                    {boxLabel: 'With Bill', name: 'optOption', inputValue: 1, checked: 'true',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    bill = true;
                                    billflag = 'D';
                                    PartynameDataStore.load({
                                        url: '/SHVPM/Financials/clsFinancials2.php',
                                        params: {
                                            task: 'Partyname',
                                            gincompany: gstfincompcode,
                                            ginfinid: ginfinid,
                                            bill: bill
                                        }
                                    });
                                    btnAdd.enable();
                                    btnRemove.enable();
                                    flxBillDetail.enable();
                                    txtDebitValue.enable();
                                    txtInvValue.enable();
                                    txtInvDate.enable();
                                    cmbInvNo.enable();
                                }
                            }
                        }},
                    {boxLabel: 'WithOut Bill', name: 'optOption', inputValue: 2,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    bill = false;
                                    billflag = 'O';
                                    PartynameDataStore.load({
                                        url: '/SHVPM/Financials/clsFinancials2.php',
                                        params: {
                                            task: 'Partyname',
                                            gincompany: gstfincompcode,
                                            ginfinid: ginfinid,
                                            bill: bill
                                        }
                                    });
                                    btnAdd.disable();
                                    btnRemove.disable();
                                    flxBillDetail.disable();
                                    txtDebitValue.disable();
                                    txtInvValue.disable();
                                    txtInvDate.disable();
                                    cmbInvNo.disable();
                                }
                            }
                        }}
                ]
            }]
    });

    var txtDnNo = new Ext.form.TextField({
        fieldLabel: 'Debit Note No',
        id: 'txtDnNo',
        width: 100,
        name: '',
        readOnly: true
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



    var cmbPartyname = new Ext.form.ComboBox({
        fieldLabel: 'Party Name',
        width: 350,
        store: PartynameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbPartyname',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            /*change: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            },*/
            select: function () {
                var Invseq = 0;

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Financials/clsFinancials.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbPartyname.getValue(),
		            },
                    callback: function () {
                            partytype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});

                PartyAddressDataStore.removeAll();
                InvoicNoDataStore.removeAll();
                if (billflag === "D") {
                    InvoicNoDataStore.load({
                        url: '/SHVPM/Financials/clsFinancials2.php',
                        params: {
                            task: 'cmbDnInvNo',
                            ledgercode: this.getValue(),
                            ginfinid: ginfinid,
                            gincompany: gstfincompcode
                        },
                        callback: function () {
                            var cnt = InvoicNoDataStore.getCount();
                            if (cnt > 0) {
                                invno = InvoicNoDataStore.getAt(0).get('acctrail_inv_no');
                                Invseq = InvoicNoDataStore.getAt(0).get('acctrail_accref_seqno');
                            } else {
                                Ext.Msg.alert("Alert", "This Party  Does Not have the transaction to Raising the debit Note With Bill");
                            }
                        }
                    });
                }
                ;
            }
        }
    });

    var dateon;
    var getdate;
    var dtpDate = new Ext.form.DateField({
        fieldLabel: 'Debit Note Date',
        id: 'dtpDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
//value: '2020-03-31',
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
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
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
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });

    var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel: 'Invoice No',
        width: 140,
        store: InvoicNoDataStore,
        displayField: 'acctrail_inv_no',
        valueField: 'acctrail_accref_seqno',
        hiddenName: 'acctrail_inv_no',
        id: 'cmbInvNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            select: function () {
                InvoiceDetails2DataStore.removeAll();
                InvoiceDetails2DataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'InvDetails2',
                        invoiceno: cmbInvNo.getValue(),
                        ledgercode: cmbPartyname.getValue(),
                        compcode: gstfincompcode,
                        finid: ginfinid
                    },
                    callback: function () {
                        txtInvDate.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'));
                        txtInvValue.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_value'));
                    }
                });
            }
        }
    });

    var txtInvDate = new Ext.form.TextField({
        fieldLabel: 'Invoice  Date',
        id: 'txtInvDate',
        name: 'date',
        width: 90,
        format: 'd-m-Y',
        readOnly: true
    });

    var txtInvValue = new Ext.form.NumberField({
        fieldLabel: 'Invoice Value',
        id: 'txtInvValue',
        width: 60,
        name: 'InvValue',
        readOnly: true
    });

    var txtDebitValue = new Ext.form.NumberField({
        fieldLabel: 'Debit Value',
        id: 'txtDebitValue',
        width: 60,
        name: 'DebitValue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txtDebitValue.getValue() > txtInvValue.getValue()) {
                    Ext.Msg.alert("Alert", "Debit Note value should not be greater than invoice value");
                    txtDebitValue.setValue('');
                }
            }
        }
    });

    var txtQty = new Ext.form.NumberField({
        fieldLabel: 'Qty',
        id: 'txtQty',
        width: 60,
        name: 'Qty'
    });

    var flxBillDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 100,
        width: 500,
        x: 5,
        y: 5,
        columns: [
            {
                header: "Invoice No",
                dataIndex: 'Inv_no',
                sortable: true,
                width: 90,
                align: 'left'
            },
            {
                header: "Invoice Date",
                dataIndex: 'Invoice_date',
                sortable: true,
                width: 110,
                align: 'left'
            },
            {
                header: "Invoice Value",
                dataIndex: 'Invoice_val',
                sortable: true,
                width: 80,
                align: 'left'
            },
            {
                header: "Debit Value",
                dataIndex: 'Debit_val',
                sortable: true,
                width: 90,
                align: 'left'
            },
            {
                header: "",
                dataIndex: 'value',
                sortable: true,
                width: 80,
                align: 'left'
            }
        ],
        store: []
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 60,
        x: 630,
        y: 420,
        listeners: {
            click: function () {
                flxBillDetail.getStore().removeAll();
                flxBillDetail.getSelectionModel().selectAll();
                var selro = flxBillDetail.getSelectionModel().getCount();
                var sele = flxBillDetail.getSelectionModel().getSelections();
                var cnt1 = 0;
                for (var t = 0; t < selro; t++) {
                    if (sele[t].data.Inv_no === cmbInvNo.getRawValue())
                    {
                        cnt1 = cnt1 + 1;
                    }
                }
                if (cnt1 > 0) {
                    Ext.MessageBox.alert("Bill", "Bill already entered");
                } else if (Number(txtDebitValue.getValue()) > Number(txtInvValue.getValue())) {
                    Ext.Msg.alert("Alert", "Debit Note value should not be greater than invoice value");
                } else if (Number(txtDebitValue.getValue()) < 0) {
                    Ext.Msg.alert("Alert", "Debit Note value should not be empty");
                } else if (Number(txtInvValue.getValue()) <= 0) {
                    Ext.Msg.alert("Alert", "Inv value should not be empty");
                } else {
                    var rowcnt = flxBillDetail.getStore().getCount() + 1;
                    flxBillDetail.getStore().insert(
                            flxBillDetail.getStore().getCount(),
                            new dgrecord({
                                Sno: rowcnt,
                                Inv_no: cmbInvNo.getRawValue(),
                                Invoice_date: txtInvDate.getValue(),
                                Debit_val: txtDebitValue.getValue(),
                                Invoice_val: txtInvValue.getValue(),
                                value: cmbInvNo.getValue()
                            })
                            );
                    calculatedbvalue();
                    txtInvDate.setValue('');
                    txtInvValue.setValue('');
                    txtDebitValue.setValue('');
                    cmbInvNo.setValue('');
                }
            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 60,
        x: 630,
        y: 420,
        handler: function () {
            var sm = flxBillDetail.getSelectionModel();
            var selrow = sm.getSelected();
            flxBillDetail.getStore().remove(selrow);
            calculatedbvalue();
        }
    });

    var grpcodetds = 0;
    var cmbCreditor = new Ext.form.ComboBox({
        fieldLabel: 'Creditor',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbCreditor',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            /*blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }, */
            select: function () {
                grpcodetds = 0;
                txttdsper.setValue('');
                txttdsvalue.setValue('');
                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbCreditor.getValue()
                    },
                    callback: function () {
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                        if (grpcodetds === '65') {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.show();
                            txttdsvalue.show();
                        } else {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.hide();
                            txttdsvalue.hide();
                        }
                    }
                });
            }
        }
    });

    var txttdsper = new Ext.form.NumberField({
        fieldLabel: 'TDS%',
        id: 'txttdsper', hidden: true,
        width: 100,
        name: 'txttdsper'
    });

    var txttdsvalue = new Ext.form.NumberField({
        fieldLabel: 'TDS AMT',
        id: 'txttdsvalue', hidden: true,
        width: 100,
        name: 'txttdsvalue'
    });

    var cmbReason = new Ext.form.ComboBox({
        fieldLabel: 'Reason',
        width: 200,
        store: ReasonDataStore,
        displayField: 'Reason_name',
        valueField: 'Reason_code',
        hiddenName: 'Reason_name',
        id: 'cmbReason',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
           /* blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }*/
        }
    });

    var txtDebitVal = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtDebitVal',
        width: 100,
        name: 'DebitVal'
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 600,
        height: 50,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
          /*  blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }*/
        }
    });

    var lblIns = new Ext.form.Label({
        fieldLabel: 'Enter Debit Value = (Base Value-(CGST+SGST Or + IGST))',
        id: 'lblIns',
        labelSeparator: '',
        name: 'lblIns',
        width: 200
    });




function findledgers()
{
            	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : ledtype,
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
				ledtype : ledtype,
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
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

}

    var opttax = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 200,
        height: 90,
        x: 350,
        y: 300,
        border: false,
        items: [{xtype: 'radiogroup', columns: 2, rows: 1, id: 'opttax',
                items: [
                    {boxLabel: 'CGST/SGST', name: 'opttax', inputValue: 1, id: 'opttaxcsgst', checked: true,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    taxtypenew = 'CS';
                                    cmbCGSTledger.enable();
                                    cmbSGSTledger.enable();
                                    cmbIGSTledger.disable();
                                }
                            }
                        }
                    }, {boxLabel: 'IGST', name: 'opttax', inputValue: 2, id: 'opttaxcsigst',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    taxtypenew = 'I';
                                    cmbCGSTledger.disable();
                                    cmbSGSTledger.disable();
                                    cmbIGSTledger.enable();
                                }
                            }
                        }
                    }
                ]
            }
        ]
    });


    var txtgstper = new Ext.form.NumberField({
        fieldLabel: 'GST % Amt',
        id: 'txtgstper',
        width: 40,
        name: 'txtgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });

    var txtgstvalue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtgstvalue',
        width: 80,
        name: 'txtgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        listeners: {
            keyup: function () {
                if (txtgstvalue.getRawValue() > 0) {
                    calculatedbvalue();
                    txtDebitVal.setRawValue(Number(gindbtotal) + Number(txtgstvalue.getRawValue()) + Number(txttcsvalue.getRawValue()));
                } else {
                    calculatedbvalue();
                }
            }
        }
    });

    var txttcsvalue = new Ext.form.NumberField({
        fieldLabel: 'TCS',
        id: 'txttcsvalue',
        width: 100,
        name: 'txttcsvalue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txttcsvalue.getRawValue() > 0) {
                    calculatedbvalue();
                    txtDebitVal.setRawValue(Number(gindbtotal) + Number(txtgstvalue.getRawValue()) + Number(txttcsvalue.getRawValue()));
                } else {
                    calculatedbvalue();
                }
            }
        }
    });

    var output = 'N';
    var chkremark = new Ext.form.Checkbox({
        name: 'Output',
        boxLabel: 'Output',
        id: 'chkremark',
        checked: false,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    output = 'Y';
                    ledtype = "O";

                } else {
                    output = 'N';
                    ledtype = "I";
                }
                findledgers();
            }
        }
    });

    var DebitNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Debit Note',
        header: false,
//        bodyStyle: {"background-color": "#acbf95"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'DebitNoteFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
//            bodyStyle: "background: #d7d5fa;",
            height: 40,
  //          style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                            var gstInsert = "true";
                            var rcnt = flxBillDetail.getStore().getCount();
                            var fromdate;
                            var todate;
                            var gstRefno;
                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);
                            if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (billflag === 'D' && rcnt <= 0) {
                                Ext.MessageBox.alert("Debit Note", "Bill Details Not Avaliable");
                            } else if (cmbPartyname.getRawValue() === cmbCreditor.getRawValue()) {
                                Ext.MessageBox.alert("Debit Note", "Party and Creditor Names Are Equal");
                            } else if (cmbPartyname.getValue() == 0) {
                                Ext.MessageBox.alert("Debit Note", "Party Name Should Not be Empty");
                            } else if (cmbCreditor.getValue() == 0) {
                                Ext.MessageBox.alert("Debit Note", "Creditor Name Should Not be Empty");
                            } else if (Number(txtDebitVal.getValue()) <= 0) {
                                Ext.MessageBox.alert("Debit Note", "Total Value  Should Not Be Zero");
                            } else if  ((taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                                Ext.MessageBox.alert("Expenses", "Select CGST / SGST Ledger Names");
                            } else if  ( (taxtypenew == "I")  && (cmbIGSTledger.getValue() == '')) {
                                Ext.MessageBox.alert("Expenses", "Select IGST Ledger Names");
                            } else if  (txtgstvalue.getValue() > 0 && Number(txtgstper.getValue()) == 0) {
                                Ext.MessageBox.alert("Expenses", "Select GST %");

                            } else {
                                gstInsert = "true";
                                if (grpcodetds == 65 && cmbCreditor.getRawValue()!== "TCS @0.075% ON SALES") {
                                    if (txttdsper.getRawValue() === "" || txttdsper.getValue() == 0) {
                                        gstInsert = "false";
                                        Ext.MessageBox.alert("Expenses", "Enter Tds Percentage!");
                                    } else if (txttdsvalue.getRawValue() === "" || txttdsvalue.getValue() == 0) {
                                        gstInsert = "false";
                                        Ext.MessageBox.alert("Expenses", "Enter Tds Value!");
                                    }
                                }
                                if (gstInsert === "true") {
                                    Ext.Msg.show({
                                        title: 'Debit Note',
                                        icon: Ext.Msg.QUESTION,
                                        buttons: Ext.MessageBox.YESNO,
                                        msg: 'Save This Record?',
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                                var accData = flxBillDetail.getStore().getRange();
                                                var accupdData = new Array();
                                                Ext.each(accData, function (record) {
                                                    accupdData.push(record.data);
                                                });
                                                Ext.Ajax.request({
                                                    url: 'FrmTrnDebitNoteSave.php',
                                                    params: {
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        finid: ginfinid,
                                                        finyear: gstfinyear,
                                                        compcode: gstfincompcode,
                                                        accrefseq: 0,
                                                        vouno: txtDnNo.getRawValue(),
                                                        voudate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        bankname: "",
                                                        refno: "",
                                                        refdate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        narration: txtNarration.getRawValue(),
                                                        paytype: "DN",
                                                        paymode: "",
                                                        Qty: txtQty.getRawValue(),
                                                        output: output,
                                                        payno: "",
                                                        paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        party: cmbPartyname.getValue(),
                                                        creditor: cmbCreditor.getValue(),
                                                        tdsper: txttdsper.getValue(),
                                                        tdsvalue: txttdsvalue.getValue(),
                                                        taxtype: taxtypenew,
                                                        gstper: txtgstper.getValue(),
                                                        TAXVAL: txtgstvalue.getRawValue(),
                                                        TCSVAL: txttcsvalue.getRawValue(),
                                                        totalval: Number(txtDebitVal.getValue()),
                                                        reason: cmbReason.getValue(),
                                                        billmode: billflag,
                                                        flagtype: gstFlag,
                                                        cgst  : cmbCGSTledger.getValue(),
                                                        sgst  : cmbSGSTledger.getValue(),
                                                        igst  : cmbIGSTledger.getValue(),
                                                        cnt: accData.length,
                                                        entrypoint : voupoint,
                                                        gltype     : partytype
                                                    },
                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] === "true") {
                                                            Ext.Msg.show({
                                                                title: 'Saved',
                                                                icon: Ext.Msg.QUESTION,
                                                                buttons: Ext.MessageBox.OK,
                                                                msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                                fn: function (btn) {
                                                                    if (btn === 'ok') {
                                                                        window.location.reload();
                                                                    } else {
                                                                        window.location.reload();
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            Ext.MessageBox.alert("Alert", "Record not saved - " + obj['vouno']);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
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
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            DebitNoteWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 150,
                height: 110,
                x: 5,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 230,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [optOption]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 570,
                height: 100,
                x: 160,
                y: 17,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtDnNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 0,
                        y: 25,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 500,
                        x: 0,
                        y: 50,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbPartyname]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 400,
                        width: 500,
                        x: 220,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [lblIns]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 725,
                height: 150,
                x: 5,
                y: 120,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 250,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbInvNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 220,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 400,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvValue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 550,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtDebitValue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 700,
                        x: 5,
                        y: 30,
                        border: false,
                        items: [flxBillDetail]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 700,
                        x: 550,
                        y: 60,
                        border: false,
                        items: [btnAdd]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 700,
                        x: 550,
                        y: 100,
                        border: false,
                        items: [btnRemove]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 0,
                y: 265,
                defaultType: 'textfield',
                border: false,
                items: [cmbCreditor]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 0,
                y: 320,
                defaultType: 'textfield',
                border: false,
                items: [txttdsper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 190,
                y: 320,
                defaultType: 'textfield',
                border: false,
                items: [txttdsvalue]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 300,
                x: 0,
                y: 350,
                defaultType: 'textfield',
                border: false,
                items: [cmbReason]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 350,
                x: 380,
                y: 265,
                defaultType: 'textfield',
                border: false,
                items: [txtDebitVal]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 520,
                y: 270,
                defaultType: 'textfield',
                border: false,
                items: [chkremark]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 700,
                height: 100,
                x: 0,
                y: 385,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 700,
                height: 100,
                x: 0,
                y: 445,
                defaultType: 'textfield',
                border: false,
                items: [txtQty]
            }, opttax, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 200,
                x: 380,
                y: 330,
                defaultType: 'textfield',
                border:false,
                items: [txtgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 120,
                x: 500,
                y: 330,
                defaultType: 'textfield',
                border: false,
                items: [txtgstvalue]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 200,
                x: 380,
                y: 360,
                defaultType: 'textfield',
                border: false,
                items: [txttcsvalue]
            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 600,
                        y: 300,
                        border: false,
                        items: [cmbCGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 600,
                        y: 330,
                        border: false,
                        items: [cmbSGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 600,
                        y: 360,
                        border: false,
                        items: [cmbIGSTledger]
                    },


        ]
    });

    function RefreshData() {
        gstFlag = "Add";
        billflag = "D";
        cmbCreditor.setValue('');
        cmbPartyname.setValue('');
        cmbReason.setValue('');
        txtDnNo.setValue('');
        txtDebitVal.setValue('');
        txttcsvalue.setValue('');
        txtDebitValue.setValue('');
        txtInvDate.setValue('');
        txtInvValue.setValue('');
        txtNarration.setValue('');
        ControlmasterDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'ControlDebitNo',
                ginfinid: ginfinid,
                gincompcode: gstfincompcode
            },
            callback: function () {
                txtDnNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
            }
        });
        flxBillDetail.getStore().removeAll();
    }

    var DebitNoteWindow = new Ext.Window({
        width: 1200,
        height: 580,
        y: 50,
        items: DebitNoteFormPanel,
        bodyStyle: {"background-color": "#acbf95"},
        title: 'Debit Note',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners: {
            show: function () {
                gstFlag = "Add";
                billflag = "D";

                gdt_enddate = "31/03/2016";
//alert(gstfinyear.substring(5,9))
                if (gstfinyear.substring(5, 9) === '2020') {
                    dtpDate.setRawValue('31-' + '03-' + gstfinyear.substring(5, 9));
                }

               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }
                ControlmasterDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'ControlDebitNo',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                        txtDnNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                });



                LedgernameDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'LoadLedgerlist',
        
                    },
        
                });


                ReasonDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'cmbReason'
                    }
                });
                gst_depname = "A";
               	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/SHVPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
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
			 	gstper  : 0,
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
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
                       cmbIGSTledger.disable();

            }
        }
    });
    DebitNoteWindow.show();
});

