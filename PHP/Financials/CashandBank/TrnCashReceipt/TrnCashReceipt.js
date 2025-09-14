Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var GinYear = localStorage.getItem('gstyear');
   var fineddate = localStorage.getItem('gfineddate');

    var gstrcpttype;
    var gstPaytype;
    var dateon;
    var getdate;
    var headcode = 0;
    var acccode = 0;

    var voupoint;
    var ledtype ="G";

    function Password() {
		   if (txtpass.getRawValue() === "ca") {
                        Ext.getCmp('editid').setVisible(true);
                    } else {
                        Ext.getCmp('editid').setVisible(false);
                    }
    }


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



 var HeadAccountdatastore = new Ext.data.Store({
      id: 'HeadAccountdatastore',
	//autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"cmbcashacct"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    });    

    var txtpass = new Ext.form.TextField({
        fieldLabel: 'Password',
        id: 'txtpass',
        inputType: 'password',
        width: 60,
        name: 'txtpass',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                Password();
            }
        }
    });


    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Head.Account',
        id: 'lblHeadAcnt',
        width: 50
    });


    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
	displayField    : 'led_name',
	valueField      : 'led_code',
        hiddenName      : 'led_code',
        id              : 'cmbHeadAccount',
        typeAhead       : true,
        mode            : 'local',
        store           : HeadAccountdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,

        listeners: {
            select: function () {
                headcode = cmbHeadAccount.getValue();
            }, blur: function () {
                headcode = cmbHeadAccount.getValue();
            }
        }
    });

    var optPayType = new Ext.form.RadioGroup({
        title: '',
        columns: 2,
        id: 'optPayType',
        layout: 'hbox',
        width: 185,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "OptType"},
        items: [
            {boxLabel: 'Bill', id: 'optBill', inputValue: 1,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";
                        }
                    }
                }
            },
            {boxLabel: 'Adv', id: 'optAdv', inputValue: 2, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "AD";
                        }
                    }
                }
            }
        ]
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

    var dtpVocDate = new Ext.form.DateField({
        fieldLabel: 'Voc Date',
        id: 'dtpVocDate',
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
                            dtpVocDate.setRawValue(new Date().format('d-m-Y'));
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
                            dtpVocDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });


    var cmbVocNo = new Ext.form.ComboBox({
        fieldLabel: 'Voc No',
        width: 120,
        store: [],
        displayField: 'accref_vouno',
        valueField: 'accref_seqno', hidden: true,
        hiddenName: 'accref_vouno',
        id: 'cmbVocNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false
    });

    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Account',
        id: 'lblAccount',
        width: 50
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
            {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });

    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: Ledgerdatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                acccode = cmbAccountName.getValue();

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Financials/clsFinancials.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});

            }, blur: function () {
                acccode = cmbAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Financials/clsFinancials.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});
            }
        }
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency',
        width: 50
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

    var curcode = 0;
    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 60,
        store: Currencydatastore,
        displayField: 'cur_name',
        valueField: 'cur_code',
        hiddenName: 'cur_name',
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
                curcode = cmbCurrency.getValue();
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmt.disable();
                    txtExgRate.disable();
                    txtAmt.setValue("");
                    txtExgRate.setValue("");
                } else {
                    txtAmt.enable();
                    txtExgRate.enable();
                }
            }, blur: function () {
                curcode = cmbCurrency.getValue();
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmt.disable();
                    txtExgRate.disable();
                    txtAmt.setValue("");
                    txtExgRate.setValue("");
                } else {
                    txtAmt.enable();
                    txtExgRate.enable();
                }
            }
        }
    });

    var lblAmt = new Ext.form.Label({
        fieldLabel: 'Amount',
        id: 'lblAmt',
        width: 50
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmt',
        width: 70,
        name: 'Amount',
        disabled: true
    });

    var lblExgRate = new Ext.form.Label({
        fieldLabel: 'Exg.Rate',
        id: 'lblExgRate',
        width: 50
    });

    var txtExgRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtExgRate',
        width: 60,
        name: 'ExgRate',
        disabled: true
    });

    var lblType = new Ext.form.Label({
        fieldLabel: 'Type',
        id: 'lblType',
        width: 50
    });

    var cmbType = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 60,
        store: [[1, 'Cr'], [2, 'Dr']],
        displayField: 'Type_name',
        valueField: 'Type_code',
        hiddenName: 'Type_name',
        id: 'cmbType',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbType.getRawValue() == "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                } else
                if (cmbType.getRawValue() == "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                }
                if (cmbCurrency.getRawValue() != "INR") {
                    if (this.getValue() == 1) {
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtDebit.setValue("");
                    } else if (this.getValue() == 2) {
                        txtDebit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtCredit.setValue("");
                    }
                }
            },
            select: function () {
                if (cmbType.getRawValue() == "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                } else
                if (cmbType.getRawValue() == "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                }
            }
        }
    });

    var lblDebit = new Ext.form.Label({
        fieldLabel: 'Debit',
        id: 'lblDebit',
        width: 50
    });

    var txtDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDebit',
        width: 60,
        name: 'Debit'
    });

    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Credit',
        id: 'lblCredit',
        width: 50
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',
        width: 60,
        name: 'Credit',
        disabled: true
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 40,
        x: 720,
        y: 0,
        listeners: {
            click: function () {
                var gstInsert = "true";
                if (cmbAccountName.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Select Ledger");
                } else if (cmbCurrency.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Select Currency");
                } else if (cmbCurrency.getRawValue() != "INR") {
                    if (txtAmt.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Receipt", "Enter the Amount");
                    }
                    if (txtExgRate.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Receipt", "Enter Exchange Rate");
                    }
                } else if (cmbType.getValue() == 2) {
                    if (txtDebit.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Receipt", "Enter Debit Amount");
                    }
                } else if (cmbType.getValue() == 1) {
                    if (txtCredit.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Receipt", "Enter Credit Amount");
                    }
                } else if ((Number(txtTotDebit) + Number(txtDebit)) > (Number(txtTotCredit) + Number(txtCredit))) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Credit should be greater than debit");
                }
                flxTransactionDetails.getSelectionModel().selectAll();
                var selrows = flxTransactionDetails.getSelectionModel().getCount();
                var sel = flxTransactionDetails.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq == cmbAccountName.getValue()) {
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "This Ledger Already Entered");
                }

                if (gstInsert == "true") {
                    var totamt;

//                    if (cmbType.getValue() == 2) {
//                        totamt = Number(txtDebit.getRawValue())
//                    } else if (cmbType.getValue() == 1) {
//                        totamt = Number(txtCredit.getRawValue()) 
//                  }
                    totamt = Number(txtCredit.getRawValue()) + Number(txtDebit.getRawValue());
                    var RowCnt = flxTransactionDetails.getStore().getCount() + 1;
                    flxTransactionDetails.getStore().insert(
                            flxTransactionDetails.getStore().getCount(),
                            new dgaccrecord({
                                slno: RowCnt,
                                ledname  : cmbAccountName.getRawValue(),
                                currency : cmbCurrency.getRawValue(),
                                amount   : Number(txtAmt.getRawValue()),
                                exgrate  : Number(txtExgRate.getRawValue()),
                                type     : cmbType.getRawValue(),
                                dbamt    : Number(txtDebit.getRawValue()),
                                cramt    : Number(txtCredit.getRawValue()),
                                ledseq   : acccode,
                                curseq   : curcode,
                                totamt   : totamt,
                                ledtype  : ledtype,
                            })
                            );
                    CalcTotalDebitCredit();
                    BillAdjustingDetail();
                }
            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Del",
        width: 40,
        x: 720,
        y: 30,
        handler: function () {
            var sm = flxTransactionDetails.getSelectionModel();
            var selrow = sm.getSelected();

            flxTransactionDetails.getStore().remove(selrow);
            CalcTotalDebitCredit();
            if (flxTransactionDetails.getStore().getCount() >= 1) {
                BillAdjustingDetail();
            } else {
                flxAdjustDetails.getStore().removeAll();
            }
        }
    });

    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'AccountDetDataStore'
        }, ['slno', 'ledname', 'currency', 'amount', 'exgrate', 'type', 'dbamt', 'cramt', 'ledseq', 'curseq', 'totamt'])
    });

    var dgaccrecord = Ext.data.Record.create([]);
    var flxTransactionDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 150,
        width: 730,
        x: 0,
        y: 0,
        columns: [
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 270, align: 'left'},
            {header: "Currency", dataIndex: 'currency', sortable: true, width: 70, align: 'left'},
            {header: "Cur. Amount", dataIndex: 'amount', sortable: true, width: 80, align: 'left'},
            {header: "Ex. Rate", dataIndex: 'exgrate', sortable: true, width: 60, align: 'left'},
            {header: "Type", dataIndex: 'type', sortable: true, width: 50, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 80, align: 'left'},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 80, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Curseqno", dataIndex: 'curseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left',},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left'},
        ]
    });

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotDebit', readOnly: true,
        width: 80,
        name: 'TotDebit'
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotCredit', readOnly: true,
        width: 80,
        name: 'TotCredit'
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 80,
        name: 'RefNo',
        style: {textTransform: "uppercase"},
        listeners: {

        }
    });

    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefDate',
        name: 'RefDate',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%'
    });

    var txtRecAmt = new Ext.form.NumberField({
        fieldLabel: 'Receipt Amount',
        id: 'txtRecAmt',
        width: 80,
        name: 'RecAmt'
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        listeners: {

        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',
        width: 60,
        store: [[1, 'CQ'], [2, 'DD'], [3, 'MT'], [4, 'TT']],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false
    });

    var txtNo = new Ext.form.TextField({
        fieldLabel: 'No',
        id: 'txtNo',
        width: 60,
        name: 'No'
    });

    var dtpDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpDate',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%'
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',
        id: 'lblAdjustingDoc',
        width: 50
    });

    var ReceiptAdjBillDetdatastore = new Ext.data.Store({
        id: 'ReceiptAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getrcptadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_comp_code',
            'accref_finid', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_value',
            'acctrail_adj_value', 'acctran_cramt', 'acctran_dbamt', 'dbcr_invvalue'])
    });

    var OpeningBillDetdatastore = new Ext.data.Store({
        id: 'OpeningBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getobadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ob_seqno', 'ob_vou_no', 'ob_vou_date', 'ob_comp_code', 'ob_fin_id', 'ob_led_code', 'ob_ref_no',
            'ob_ref_date', 'ob_totamt', 'ob_adjamt', 'ob_cramt', 'ob_dbamt', 'dbcr_invvalue'])
    });

    var BillDetailDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'dbcramt', 'totamt', 'pendingamt', 'adjamt', 'voutype', 'balamt',
            'accrefseqno', 'accrefvouno'])
    });

    var lblCompany = new Ext.form.Label({
        fieldLabel: 'Welcome',
        id: 'lblCompany',
        width: 50
    });

    var dgadjrecord = Ext.data.Record.create([]);
    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: BillDetailDataStore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 130,
        width: 685,
        x: 0,
        y: 0,
        columns: [
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 80, align: 'left'},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 80, align: 'left'},
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'left'},
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 60, align: 'left'},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left'},
            {header: "Pending Amt", dataIndex: 'pendingamt', sortable: true, width: 80, align: 'left'},
            {header: "Adjusted", dataIndex: 'adjamt', sortable: true, width: 80, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {
                            CalcSum();
                        },
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
                            pendingamt = Number(selrow.get('pendingamt'));

                            if (Number(this.getRawValue()) > Number(pendingamt)) {
                                Ext.MessageBox.alert("Regional Receipt", "Adjusted amount cannot be greater than pending amount");
                                this.setValue("");
                                selrow.set('adjamt', "");
                                CalcSum();
                            } else {
                                if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                                    if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                                    }
                                } else {
                                    this.setValue("");
                                }
                            }
                        }
                    }
                },
                listeners: {
                    click: function () {
                        UpdateReceiptBillsAdjusted();
                    }
                }
            },
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left'},
            {header: "Balance", dataIndex: 'balamt', sortable: true, width: 70, align: 'left',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.adjamt) > 0) {
                        retval = Number(record.data.pendingamt) - Number(record.data.adjamt);
                    } else {
                        retval = Number(record.data.pendingamt);
                    }
                    return retval;
                }
            },
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: '',readOnly:true,
        id: 'txtTotNetAmt',
        width: 80,
        name: 'TotNetAmt'
    });

    var lblNarration = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarration',
        width: 50
    });

    var txtNarration = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtNarration',
        width: 600,
        height: 40,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {

        }
    });

    var tabCashReceipt = new Ext.TabPanel({
        id: 'tabCashReceiptDetail',
        bodyStyle: {"background-color": "#336666"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        xtype: 'tabpanel',
        activeTab: 0,
        height: 565,
        width: 1000,
        items: [
            {
                xtype: 'panel',
                title: 'Receipt Details',
                bodyStyle: {"background-color": "#336666"},
                style: {
                    'color': 'white',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#336666"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 75,
                        x: 5,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: 0,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 180,
                                height: 70,
                                x: 350,
                                y: 10,
                                border: false,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [
                                    optPayType
                                ]
                            }, {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 60,
                                width: 200,
                                x: 550,
                                y: 0,
                                border: false,
                                items: [lblCompany]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 60,
                                width: 200,
                                x: 550,
                                y: 20,
                                border: false,
                                items: [dtpVocDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 60,
                                width: 250,
                                x: 550,
                                y: 45,
                                border: false,
                                items: [cmbVocNo]
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#336666"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 270,
                        x: 5,
                        y: 82,
                        border: true,
                        style       : 'padding:0px',
                                layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: 0,
                                border: false,
                                items: [lblAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 330,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [cmbAccountName]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 310,
                                y: 0,
                                border: false,
                                items: [lblCurrency]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 90,
                                x: 305,
                                y: 20,
                                border: false,
                                items: [cmbCurrency]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 375,
                                y: 0,
                                border: false,
                                items: [lblAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 100,
                                x: 370,
                                y: 20,
                                border: false,
                                items: [txtAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 450,
                                y: 0,
                                border: false,
                                items: [lblExgRate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 90,
                                x: 445,
                                y: 20,
                                border: false,
                                items: [txtExgRate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 515,
                                y: 0,
                                border: false,
                                items: [lblType]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 90,
                                x: 510,
                                y: 20,
                                border: false,
                                items: [cmbType]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 580,
                                y: 0,
                                border: false,
                                items: [lblDebit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 90,
                                x: 575,
                                y: 20,
                                border: false,
                                items: [txtDebit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 645,
                                y: 0,
                                border: false,
                                items: [lblCredit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 90,
                                x: 640,
                                y: 20,
                                border: false,
                                items: [txtCredit]
                            }, btnAdd, btnRemove,
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 800,
                                x: 0,
                                y: 50,
                                border: false,
                                items: [flxTransactionDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 550,
                                y: 210,
                                border: false,
                                items: [txtTotDebit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 650,
                                y: 210,
                                border: false,
                                items: [txtTotCredit]
                            },
                        ]
                    },{ 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 60,
		                width       : 150,
		                x           : 120,
		                y           : 300,
		                border      : false,
		                items: [txtpass]
		            },
                ]
            },
            {
                xtype: 'panel',
                title: 'Other Details',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#336666"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 390,
                        x: 2,
                        y: 2,
                        border: true,
                        layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 250,
                                x: 0,
                                y: 0,
                                border: false,
                                items: [txtRefNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 215,
                                x: 0,
                                y: 30,
                                border: false,
                                items: [dtpRefDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 250,
                                x: 0,
                                y: 60,
                                border: false,
                                items: [txtRecAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                bodyStyle: {"background-color": "#336666"},
                                style: {
                                    'color': 'white',
                                    'style': 'Helvetica',
                                    'font-size': '15px', 'font-weight': 'bold'
                                },
                                width: 465,
                                height: 100,
                                x: 230,
                                y: 2,
                                border: true,
                                layout: 'absolute',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 100,
                                        width: 350,
                                        x: 0,
                                        y: 0,
                                        border: false,
                                        items: [txtBankName]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 100,
                                        width: 250,
                                        x: 0,
                                        y: 40,
                                        border: false,
                                        items: [cmbPaymode]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 30,
                                        width: 250,
                                        x: 170,
                                        y: 40,
                                        border: false,
                                        items: [txtNo]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 30,
                                        width: 180,
                                        x: 270,
                                        y: 40,
                                        border: false,
                                        items: [dtpDate]
                                    },
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 0,
                                y: 90,
                                border: false,
                                items: [lblAdjustingDoc]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 850,
                                x: 0,
                                y: 110,
                                border: false,
                                items: [flxAdjustDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 600,
                                y: 250,
                                border: false,
                                items: [txtTotNetAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 10,
                                y: 260,
                                border: false,
                                items: [lblNarration]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 800,
                                height: 200,
                                x: 10,
                                y: 280,
                                border: false,
                                items: [txtNarration]
                            },
                        ]
                    }
                ]
            }
        ]
    });
    var totalval;
    var CashReceiptEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Cash Receipt Entry',
        bodyStyle: {"background-color": "#336666"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashReceiptEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,id:'editid',hidden:false,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    handler: function () {
			CalcSum();
                        var rcnt = flxTransactionDetails.getStore().getCount();
                        var fromdate;
                        var todate;
                        fromdate = "04/01/" + GinYear.substring(0, 4);
                        todate = "03/31/" + GinYear.substring(5, 9);
                        if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (rcnt <= 0) {
                            Ext.MessageBox.alert("Receipt", "Transactions Details Not Available ..");
                        } else if (cmbHeadAccount.getValue() == 0) {
                            Ext.MessageBox.alert("Receipt", "Select the Head of Account");
                        } else if (txtTotNetAmt.getRawValue() <= 0 && gstPaytype == "BB") {
                            Ext.MessageBox.alert("Receipt", "You have selected Bill to Bill mode & no bills are adjusted");
                        } else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
                            Ext.MessageBox.alert("Receipt", "You have to select Bill to Bill mode in order to adjust bills");
                        } else {
                            Ext.Msg.show({
                                title: 'Receipt Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Are You Sure to Add This Record?',
                                fn: function (btn) {
                                    if (btn == 'yes') {
                                        var accData = flxTransactionDetails.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        var accadjData = flxAdjustDetails.getStore().getRange();
                                        var accadjupdData = new Array();
                                        Ext.each(accadjData, function (record) {
                                            accadjupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnCashReceiptSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                finid: GinFinid,
                                                finyear: GinYear,
                                                compcode: GinCompcode,
                                                accrefseq: 0,
                                                vouno: cmbVocNo.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d"),
                                                bankname: txtBankName.getRawValue(),
                                                refno: txtRefNo.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: gstPaytype,
                                                paymode: cmbPaymode.getRawValue(),
                                                payno: txtNo.getRawValue(),
                                                paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                headacct: headcode,
                                                rcptamt: Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()),
                                                totadjamt: Number(txtTotNetAmt.getRawValue()),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                adjcnt: accadjData.length,
                                                entrypoint : voupoint,

                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] == "true") {
                                                    Ext.Msg.show({
                                                        title: 'Saved',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                        fn: function (btn) {
                                                            if (btn == 'yes') {
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
                            window.location.reload();
                        }
                    }
                }, '-',
                {
                    text: 'View',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30, hidden: false,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            window.open('/SHVPM/Financials/CashandBank/CR.php');
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
                            CashReceiptEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            tabCashReceipt
        ]
    });

    function RefreshData() {
        gstFlag = "Add";
        flxTransactionDetails.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtRefNo.setValue("");
        txtRecAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");
        cmbAccountName.setValue("");
        txtTotCredit.setValue("");
        cmbVocNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        gstrcpttype = "CASH RECEIPTS";
        cmbCurrency.setRawValue('INR');
   
        if (GinYear.substring(5, 9) === '2017') {
            dtpVocDate.setRawValue('31-' + '03-' + GinYear.substring(5, 9));
        }
        Ext.getCmp('optBill').setValue(true);
        Ext.getCmp('optAdv').setValue(false);
        Currencydatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcurrency"
                    }
        });
        cmbCurrency.setRawValue('INR');
        cmbType.setRawValue('Cr');
        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode: GinCompcode,
                        entrypoint : voupoint,
                    }
        });


     gstPaytype = "AD";


        curcode = 1;

/*
        if (GinCompcode == "1") {
            lblCompany.setText("DENIM");
            lblCompany.getEl().setStyle('color', 'yellow');
            cmbHeadAccount.setRawValue("CASH BOOK");
            headcode = 69;
        } else if (GinCompcode == "4") {
            lblCompany.setText("SBM");
            lblCompany.getEl().setStyle('color', 'white');
            cmbHeadAccount.setRawValue("CASH BOOK");
            headcode = 12899;
        }
*/

        Ledgerdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbacctname",
                        compcode: GinCompcode
                    }
        });
    }

    function CalcTotalDebitCredit() {
        flxTransactionDetails.getSelectionModel().selectAll();
        var selrows = flxTransactionDetails.getSelectionModel().getCount();
        var sel = flxTransactionDetails.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
        }
        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
    }

    function BillAdjustingDetail() {
        if (flxTransactionDetails.getStore().getCount() == 1 && gstPaytype == "BB") {
            var ginledcode = flxTransactionDetails.getStore().getAt(0).get('ledseq');
            flxAdjustDetails.getStore().removeAll();
            OpeningBillDetdatastore.removeAll();
            OpeningBillDetdatastore.load({
                url: '/SHVPM/Financials/clsFinancials.php',
                params:
                        {
                            task: "getobadjbilldet",
                            finid: 11,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = OpeningBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {
                        var voutype;
                        if (OpeningBillDetdatastore.getAt(i).get('ob_dbamt') > 0) {
                            voutype = "OB";
                        } else {
                            voutype = "AD";
                        }
                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: OpeningBillDetdatastore.getAt(i).get('ob_ref_no'),
                                    invdate: OpeningBillDetdatastore.getAt(i).get('ob_ref_date'),
                                    invamt: OpeningBillDetdatastore.getAt(i).get('ob_totamt'),
                                    dbcramt: OpeningBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: Number(OpeningBillDetdatastore.getAt(i).get('ob_totamt')) -
                                            Number(OpeningBillDetdatastore.getAt(i).get('dbcr_invvalue')),
                                    pendingamt: Number(OpeningBillDetdatastore.getAt(i).get('ob_totamt')) -
                                            Number(OpeningBillDetdatastore.getAt(i).get('ob_adjamt')),
                                    adjamt: "",
                                    voutype: voutype,
                                    balamt: "",
                                    accrefseqno: OpeningBillDetdatastore.getAt(i).get('ob_seqno'),
                                    accrefvouno: OpeningBillDetdatastore.getAt(i).get('ob_vou_no')
                                })
                                );
                    }
                }
            });
            ReceiptAdjBillDetdatastore.removeAll();
            ReceiptAdjBillDetdatastore.load({
                url: '/SHVPM/Financials/clsFinancials.php',
                params:
                        {
                            task: "getrcptadjbilldet",
                            finid: GinFinid,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = ReceiptAdjBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {
                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invamt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    dbcramt: ReceiptAdjBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('dbcr_invvalue')),
                                    pendingamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    voutype: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
                                    balamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    accrefseqno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vouno')
                                })
                                );
                    }
                    CalcSum();
                    RefreshGridData();
                }
            });
        } else if (flxTransactionDetails.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtRecAmt.getRawValue())) {
                var sm = flxAdjustDetails.getSelectionModel();
                var selrow = sm.getSelected();
                var rcnt = flxAdjustDetails.getStore().getCount();
                for (var i = 0; i < rcnt; i++) {
                    var rec = flxAdjustDetails.getStore().getAt(i);
                    rec.set('adjamt', 0);
                }
                CalcSum();
            }
        }
    }

    function CalcSum() {
        var selrows = flxAdjustDetails.getStore().getCount();
        var ginadjtotal = 0;
        txtTotNetAmt.setValue("");
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                }
            }
        }
        txtTotNetAmt.setValue(ginadjtotal);
    }

    function UpdateReceiptBillsAdjusted() {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {
            selrow.set('adjamt', selrow.get('pendingamt'));
            CalcSum();
        } else {
            if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();
            }
        }
    }

    function RefreshGridData() {
        txtDebit.setValue("");
        txtCredit.setValue("");
        txtAmt.setValue("");
        txtExgRate.setValue("");
        cmbAccountName.setValue("");
        gstFlag = "Add";



               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }

        gstrcpttype = "CASH RECEIPTS";
//        gstPaytype = "BB";
        Currencydatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcurrency"
                    }
        });
        cmbCurrency.setRawValue('INR');
        cmbType.setRawValue('Cr');

//alert(voupoint);
        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode  : GinCompcode,
                        entrypoint : voupoint,
                        
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); }
        });



        curcode = 1;
/*
        if (GinCompcode == "1") {
            lblCompany.setText("DENIM");
            lblCompany.getEl().setStyle('color', 'yellow');
            cmbHeadAccount.setRawValue("CASH BOOK");
            headcode = 69;
        } else if (GinCompcode == "4") {
            lblCompany.setText("SBM");
            lblCompany.getEl().setStyle('color', 'white');
            cmbHeadAccount.setRawValue("CASH BOOK");
            headcode = 12899;
        }
*/        
          Ledgerdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbacctname",
                        compcode: GinCompcode
                    }
        });
    }

    var CashReceiptEntryWindow = new Ext.Window({
        width: 800,
        height: 450,
        y: 65,
        items: CashReceiptEntryFormPanel,
        bodyStyle: {"background-color": "#3399CC"},
        title: 'Cash Receipt Entry',
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
		RefreshGridData(); 

/*

               if (GinUser === 'Accounts-HO')
               {
                  voutype = 'H';
               }
               else
               {
                  voutype = 'M';
               }
  

alert(voutype);
                gstrcpttype = "CASH RECEIPTS";

                if (GinYear.substring(5, 9) === '2018') {
                    dtpVocDate.setRawValue('31-' + '03-' + GinYear.substring(5, 9));
                }
                gstPaytype = "BB";

                Currencydatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbcurrency"
                            }
                });
                cmbCurrency.setRawValue('INR');
                cmbType.setRawValue('Cr');
                
                HeadAccountdatastore.removeAll();
                HeadAccountdatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbcashacct",
                                compcode : GinCompcode,
                                usertype : voutype,
                            },
                            callback : function(){
//                            if (HeadAccountdatastore.getAt(0).get('led_code') == "149"){
//                            	cmbHeadAccount.setValue(HeadAccountdatastore.getAt(0).get('led_code'));
//                            }
alert(HeadAccountdatastore.getCount());
                            }
                });
                curcode = 1;


                //if (GinCompcode == "1") {
//                   var testcode = 149;
                    
                    lblCompany.setText("SHVPM");
                    lblCompany.getEl().setStyle('color', 'yellow');
                   //cmbHeadAccount.focus();
//                    headcode = "149";
                    
//                }
/* else if (GinCompcode == "4") {
                    lblCompany.setText("SBM");
                    lblCompany.getEl().setStyle('color', 'white');
                    cmbHeadAccount.setRawValue("CASH BOOK");
                    headcode = 12899;


                Ledgerdatastore.removeAll();
                Ledgerdatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbacctname",
                                compcode: GinCompcode
                            }
                });
                }*/

                Ext.getCmp('optBill').setValue(false);
                Ext.getCmp('optAdv').setValue(true);
                txtDebit.disable();
                txtCredit.enable();
                cmbType.disable();
            }
        }
    });
    CashReceiptEntryWindow.show();
});

