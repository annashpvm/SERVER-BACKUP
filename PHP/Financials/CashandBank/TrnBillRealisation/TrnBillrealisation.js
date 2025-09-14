Ext.onReady(function () {
    Ext.QuickTips.init();

    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfincompcode = localStorage.getItem('acccompcode');
    var gstFlag;
    var gstoption='E';

    var BankDataStore = new Ext.data.Store({
        id: 'BankDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php',
            method: 'POST'
        }),
        baseParams: {task: "cmbbankacct"}, // this parameter asks for listing
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

    var LedgerDataStore = new Ext.data.Store({
        id: 'LedgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php',
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

    var CurrencyDataStore = new Ext.data.Store({
        id: 'CurrencyDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php',
            method: 'POST'
        }),
        baseParams: {task: "cmbCurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'currency_code', type: 'int', mapping: 'currency_code'},
            {name: 'currency_symbol', type: 'string', mapping: 'currency_symbol'}
        ]),
        sortInfo: {field: 'currency_code', direction: "DESC"}
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

    var InvDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'InvDataStore'
        }, [
            'invno', 'invdt', 'usdamt', 'eefc', 'refno', 'realusd', 'exrate', 'amount', 'valuedt', 'invseq'
        ])
    });

    var ExportInvoiceDetaildatastore = new Ext.data.Store({
        id: 'ExportInvoiceDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getexpoinvdet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cinv_seqno', 'cinv_no', 'cinv_date', 'cinv_total_invamt', 'bank_refno'])
    });

    var InvoiceDataStore = new Ext.data.Store({
        id: 'InvoiceDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php',
            method: 'POST'
        }),
        baseParams: {task: "cmbBillRealInv"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cinv_seqno', type: 'int', mapping: 'cinv_seqno'},
            {name: 'cinv_no', type: 'string', mapping: 'cinv_no'}
        ]),
        sortInfo: {field: 'cinv_seqno', direction: "DESC"}
    });

    var VoucherDataStore = new Ext.data.Store({
        id: 'VoucherDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php',
            method: 'POST'
        }),
        baseParams: {task: "cmbBillRealVouNo"}, // this parameter asks for listing
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
    var gstledcode;
    var cmbBank = new Ext.form.ComboBox({
        id: 'cmbBank',
        fieldLabel: '',
        width: 310,
        store: BankDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Account Name',
        listeners: {
            select: function () {
                gstledcode = this.getValue();
                VoucherDataStore.load
                        (
                                {
                                    url: '/SHVPM/Financials/clsFinancials.php',
                                    parms:
                                            {
                                                task: "cmbBillRealVouNo",
                                                ledcode: this.getValue()
                                            }
                                }
                        );
            }
        }

    });

    var cmbLedger = new Ext.form.ComboBox({
        id: 'cmbLedger',
        fieldLabel: '',
        width: 240,
        store: LedgerDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Account Name',
        listeners: {
            select: function () {
                InvoiceDataStore.removeAll();
                InvoiceDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbBillRealInv",
                                ledcode: cmbLedger.getValue(),
                                compcode: gstfincompcode
                            }
                });
            }
        }

    });
    var cmbCurrency = new Ext.form.ComboBox({
        id: 'cmbCurrency',
        fieldLabel: '',
        width: 70,
        store: CurrencyDataStore,
        displayField: 'currency_symbol',
        valueField: 'currency_code',
        hiddenName: 'currency_symbol',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Currency',
        listeners: {
            select: function () {
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmount.disable();
                    txtExgRate.disable();
                    txtAmount.setValue("");
                    txtExgRate.setValue("");
                } else {
                    txtAmount.enable();
                    txtExgRate.enable();
                }
            }
        }
    });
    var cmbVoucher = new Ext.form.ComboBox({
        id: 'cmbVoucher',
        fieldLabel: '',
        width: 110, hidden: true,
        store: VoucherDataStore,
        displayField: 'accref_vouno',
        valueField: 'accref_seqno',
        hiddenName: 'accref_vouno',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Type'
    });

    var cmbType = new Ext.form.ComboBox({
        id: 'cmbFinyear',
        fieldLabel: '',
        width: 70,
        store: [['1', 'Dr'], ['2', 'Cr']],
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Type',
        listeners: {
            blur: function () {
                if (cmbType.getValue() == 1) {
                    txtDebitAmt.enable();
                    txtCrAmt.disable();
                    txtCrAmt.setValue("");
                } else if (cmbType.getValue() == 2) {
                    txtDebitAmt.disable();
                    txtCrAmt.enable();
                    txtDebitAmt.setValue("");
                } else {
                    txtDebitAmt.disable();
                    txtCrAmt.disable();
                    txtDebitAmt.setValue("");
                    txtCrAmt.setValue("");
                }
                if (cmbCurrency.getRawValue() != "INR") {
                    if (cmbType.getValue() == 1) {
                        txtDebitAmt.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtCrAmt.setValue("");
                    } else if (cmbType.getValue() == 2) {
                        txtCrAmt.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtDebitAmt.setValue("");
                    }
                }
            }
        }


    });

    var cmbMode = new Ext.form.ComboBox({
        id: 'cmbVarity',
        fieldLabel: '',
        width: 100,
        store: ['CQ', 'DD', 'MT', 'TT'],
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Mode'
    });

    var cmbInvNo = new Ext.form.ComboBox({
        id: 'cmbInvNo',
        fieldLabel: '',
        width: 100,
        displayField: 'cinv_no',
        valueField: 'cinv_seqno',
        hiddenName: 'cinv_no',
        store: InvoiceDataStore,
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        emptyText: 'Select Invoice',
        listeners: {
            select: function () {
                ExportInvoiceDetaildatastore.removeAll();
                ExportInvoiceDetaildatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "getexpoinvdet",
                                cinvseqno: cmbInvNo.getValue(),
                                cinvno: cmbInvNo.getRawValue(),
                                compcode: gstfincompcode,
				flag:gstoption
                            },
                    callback: function () {
                        var ginusdamount = 0;
                        if (Number(ExportInvoiceDetaildatastore.getAt(0).get('cinv_commission')) > 0) {
                            ginusdamount = Number(ExportInvoiceDetaildatastore.getAt(0).get('cinv_total_invamt')) +
                                    Number(ExportInvoiceDetaildatastore.getAt(0).get('cinv_commission'));
                        } else {
                            ginusdamount = Number(ExportInvoiceDetaildatastore.getAt(0).get('cinv_total_invamt'));
                        }

                        txtDate.setValue(ExportInvoiceDetaildatastore.getAt(0).get('cinv_date'));
                        txtUsdAmt.setValue(ginusdamount);
                        txtEefc.setValue(ExportInvoiceDetaildatastore.getAt(0).get('cinv_efc'));
                        txtBankRefNo.setValue(ExportInvoiceDetaildatastore.getAt(0).get('bank_refno'));
                    }
                });
            }
        }
    });

    var dateon;
    var getdate;

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


    var dtpVoudate = new Ext.form.DateField({
        name: 'dtpVoudate',
        id: 'dtpVoudate',
        fieldLabel: '',
        format: 'd-m-Y',
        value: new Date(),
        width: 100,
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

    var lblHeadAccount = new Ext.form.Label({
        fieldLabel: 'Head Account',
        id: 'lblHeadAccount',
        name: 'lblHeadAccount',
        width: 50
    });
    var lblVocDate = new Ext.form.Label({
        fieldLabel: 'Voc Date',
        id: 'lblVocDate',
        name: 'lblVocDate',
        width: 50
    });
    var lblVocNo = new Ext.form.Label({
        fieldLabel: 'Voc No',
        id: 'lblVocNo', hidden: true,
        name: 'lblVocNo',
        width: 50
    });
    var txtAmount = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmount',
        name: 'txtAmount',
        width: 100
    });
    var txtExgRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtExgRate',
        name: 'txtExgRate',
        width: 100
    });
    var txtDebitAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDebitAmt',
        name: 'txtDebitAmt',
        width: 100
    });
    var txtCrAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCrAmt',
        name: 'txtCrAmt',
        width: 100
    });
    var txtTotCrAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotCrAmt',
        name: 'txtTotCrAmt',
        width: 100
    });
    var txtTotDbtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotDbtAmt',
        name: 'txtTotDbtAmt',
        width: 100
    });
    var txtDate = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtDate',
        name: 'cinv_date',
        width: 100
    });
    var txtUsdAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtUsdAmt',
        name: 'cinv_total_invamt',
        width: 100
    });
    var txtEefc = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtEefc',
        name: 'txtEefc',
        width: 100
    });
    var txtBankRefNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtBankRefNo',
        name: 'txtBankRefNo',
        width: 100,
        style: {textTransform: "uppercase"}
    });
    var txtRealUsd = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtRealUsd',
        name: 'txtRealUsd',
        width: 100,
	enableKeyEvents:true,
        listeners: {
            'keyup': function () {
                txtAdjAmt.setValue(parseInt(Number(txtRealUsd.getValue()) * Number(txtDocExRate.getValue())));
            }
        }
    });
    var txtDocExRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDocExRate',
        name: 'txtDocExRate',
        width: 100,enableKeyEvents:true,
        listeners: {
            'keyup': function () {
                txtAdjAmt.setValue(parseInt(Number(txtRealUsd.getValue()) * Number(txtDocExRate.getValue())));
            }
        }
    });
    var txtAdjAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAdjAmt',
        name: 'txtAdjAmt',
        width: 100,
        readonly: true
    });
    var RealValueDate = new Ext.form.DateField({
        name: 'RealValueDate',
        id: 'RealValueDate',
        fieldLabel: '',
        format: 'd-m-Y',
        value: new Date(),
        width: 100

    });
    var txtTotAdjAmt = new Ext.form.NumberField({
        fieldLabel: 'Total',
        id: 'txtTotAdjAmt',readOnly:true,
        name: 'txtTotAdjAmt',
        width: 100
    });
    var txtRefNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtRefNo',
        name: 'txtRefNo',
        width: 100,
        style: {textTransform: "uppercase"}
    });
    var RefDate = new Ext.form.DateField({
        name: 'RefDate',
        id: 'RefDate',
        fieldLabel: '',
        format: 'd-m-Y',
        value: new Date(),
        width: 100

    });
    var txtNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtNo',
        name: 'txtNo',
        width: 100,
        style: {textTransform: "uppercase"}
    });
    var EntDate = new Ext.form.DateField({
        name: 'EntDate',
        id: 'EntDate',
        fieldLabel: '',
        format: 'd-m-Y',
        value: new Date(),
        width: 100

    });
    var txtNarration = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtNarration',
        name: 'txtNarration',
        width: 800,
        height: 50,
        style: {textTransform: "uppercase"}
    });
    var txtCurrcode = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtCurrcode',
        name: 'txtCurrcode',
        width: 800,
        height: 50
    });
    var txtCurAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCurAmt',
        name: 'txtCurAmt',
        width: 800,
        height: 50
    });
    var txtCurexrate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCurexrate',
        name: 'txtCurexrate',
        width: 800,
        height: 50
    });
    var lblRefNo = new Ext.form.Label({
        fieldLabel: 'Ref No',
        id: 'lblRefNo',
        name: 'lblRefNo',
        width: 50
    });
    var lblRefDt = new Ext.form.Label({
        fieldLabel: 'Ref Date',
        id: 'lblRefDt',
        name: 'lblRefDt',
        width: 50
    });
    var lblPaymentMode = new Ext.form.Label({
        fieldLabel: 'Payment Mode',
        id: 'lblPaymentMode',
        name: 'lblPaymentMode',
        width: 50
    });
    var lblNo = new Ext.form.Label({
        fieldLabel: 'No',
        id: 'lblNo',
        name: 'lblNo',
        width: 50
    });
    var lblDate = new Ext.form.Label({
        fieldLabel: 'Date',
        id: 'lblDate',
        name: 'lblDate',
        width: 50
    });
    var lblNarattion = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarattion',
        name: 'lblNarattion',
        width: 50
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Submit",
        width: 60,
        x: 400,
        y: 255,
        listeners: {
            click: function () {
                var gstInsert = "true";
                if (cmbLedger.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Bill Realisation", "Select Ledger");
                } else if (cmbCurrency.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Bill Realisation", "Select Currency");
                } else if (cmbCurrency.getRawValue() != "INR") {
                    if (txtAmount.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Bill Realisation", "Enter the Amount");
                    }
                    if (txtExgRate.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Bill Realisation", "Enter Exchange Rate");
                    }
                } else if (cmbType.getValue() == 1) {
                    if (txtDebitAmt.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Bill Realisation", "Enter Debit Amount");
                    }
                } else if (cmbType.getValue() == 2) {
                    if (txtCrAmt.getRawValue() == "") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Bill Realisation", "Enter Credit Amount");
                    }
                }
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq == cmbLedger.getValue()) {
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Bill Realisation", "This Ledger Already Entered");
                }
                if (gstInsert == "true") {
                    var totamt;
                    if (cmbType.getValue() == 1) {
                        totamt = Number(txtDebitAmt.getRawValue())
                    } else if (cmbType.getValue() == 2) {
                        totamt = Number(txtCrAmt.getRawValue())
                    }
                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                            flxDetail.getStore().getCount(),
                            new dgaccrecord({
                                slno: RowCnt,
                                ledname: cmbLedger.getRawValue(),
                                currency: cmbCurrency.getRawValue(),
                                amount: Number(txtAmount.getRawValue()),
                                exgrate: Number(txtExgRate.getRawValue()),
                                type: cmbType.getRawValue(),
                                dbamt: Number(txtDebitAmt.getRawValue()),
                                cramt: Number(txtCrAmt.getRawValue()),
                                ledseq: cmbLedger.getValue(),
                                curseq: cmbCurrency.getValue(),
                                totamt: totamt
                            })
                            );
                    CalcTotalDebitCredit();
                    RefreshGridData();
                }
            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 60,
        x: 400,
        y: 255,
        handler: function () {
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();

            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
        }

    });
    var btnAdjAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Submit",
        width: 60,
        x: 400,
        y: 255,
        listeners: {
            click: function () {
                if (cmbInvNo.getValue() == 0) {
                    Ext.MessageBox.alert("Inv No", "Select Invoice Number..");
                } else if (txtAdjAmt.getValue() == 0) {
                    Ext.MessageBox.alert("Adjust Amount", "Enter Adjust Amount..");

                } else {
                    var gininvno = cmbInvNo.getRawValue();

                    flxInvDet.getSelectionModel().selectAll();
                    var selrows = flxInvDet.getSelectionModel().getCount();
                    var sel = flxInvDet.getSelectionModel().getSelections();

                    var cnt = 0;
                    for (var i = 0; i < selrows; i++) {
                        if (sel[i].data.invno == gininvno) {
                            cnt = cnt + 1;
                        }
                    }
                    if (cnt > 0) {
                        Ext.MessageBox.alert("Grid", "Same Invoice No already exists");
                    } else {
                        var RowCnt = flxInvDet.getStore().getCount() + 1;
                        flxInvDet.getStore().insert(
                                flxInvDet.getStore().getCount(),
                                new dgrecord({
                                    invno: cmbInvNo.getRawValue(),
                                    invdt: txtDate.getRawValue(),
                                    usdamt: txtUsdAmt.getValue(),
                                    eefc: txtEefc.getValue(),
                                    refno: txtBankRefNo.getRawValue(),
                                    realusd: txtRealUsd.getValue(),
                                    exrate: txtDocExRate.getValue(),
                                    amount: txtAdjAmt.getValue(),
                                    valuedt: Ext.util.Format.date(RealValueDate.getValue(), "Y-m-d"),
                                    invseq: cmbInvNo.getValue()
                                })
                                );

                        CalcTotalAdjustAmount();
                        cmbInvNo.reset();
                        txtDate.setValue("");
                        txtUsdAmt.setValue("");
                        txtEefc.setValue("");
                        txtBankRefNo.setValue("");
                        txtRealUsd.setValue("");
                        txtDocExRate.setValue("");
                        txtAdjAmt.setValue("");
                    }
                }

            }
        }
    });

    var btnAdjRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 60,
        x: 400,
        y: 255,
        handler: function () {
            var sm = flxInvDet.getSelectionModel();
            var selrow = sm.getSelected();

            flxInvDet.getStore().remove(selrow);
            CalcTotalAdjustAmount();
        }

    });

    var dgaccrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 80,
        width: 730,
        x: 0,
        y: 35,
        columns: [
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 300, align: 'left'},
            {header: "Currency", dataIndex: 'currency', sortable: true, width: 70, align: 'left'},
            {header: "Cur. Amount", dataIndex: 'amount', sortable: true, width: 80, align: 'left'},
            {header: "Ex. Rate", dataIndex: 'exgrate', sortable: true, width: 60, align: 'left'},
            {header: "Type", dataIndex: 'type', sortable: true, width: 50, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 80, align: 'left'},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 80, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Curseqno", dataIndex: 'curseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var dgrecord = Ext.data.Record.create([]);
    var flxInvDet = new Ext.grid.EditorGridPanel({
        frame: false,
        store: InvDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 120,
        width: 730,
        x: 0,
        y: 35,
        columns: [
            {header: "Inv.No", dataIndex: 'invno', sortable: true, width: 90, align: 'left'},
            {header: "Date", dataIndex: 'invdt', sortable: true, width: 80, align: 'center'},
            {header: "USD Amt", dataIndex: 'usdamt', sortable: true, width: 80, align: 'center'},
            {header: "EEFC", dataIndex: 'eefc', sortable: true, width: 70, align: 'center', hidden: false},
            {header: "Bank RefNo", dataIndex: 'refno', sortable: true, width: 100, align: 'center'},
            {header: "Real USD", dataIndex: 'realusd', sortable: true, width: 80, align: 'center'},
            {header: "Ex.Rate", dataIndex: 'exrate', sortable: true, width: 80, align: 'center'},
            {header: "Amount", dataIndex: 'amount', sortable: true, width: 80, align: 'center'},
            {header: "ValueDate", dataIndex: 'valuedt', sortable: true, width: 80, align: 'center'},
            {header: "Invseq", dataIndex: 'invseq', sortable: true, width: 40, align: 'left'}
        ]
    });

    var BillRealisationFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bill Realisation Entry',
        header: false,
        width: 850,
        height: 750,
        x: 0,
        y: 0,
        bodyStyle: {"background-color": "#336666"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        frame: false,
        id: 'BillRealisationFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['cinv_date',
            'cinv_total_invamt']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: ' Add',
                    style: 'text-align:center;', hidden: true,
                    tooltip: 'Add Details...', height: 40, fontSize: 20, width: 50,
                    align: 'right',
                    icon: '/Pictures/Add.png',
                    listeners: {
                        click: function () {
                            gstFlag = "Add";
                        }
                    }
                }, '-',
                {
                    text: 'Edit',
                    fontSize: 18, hidden: true,
                    style: 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40, fontSize:20, width: 50,
                    icon: '/Pictures/edit.png',
                    listeners: {
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                }, '-',
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                            var rcnt = flxDetail.getStore().getCount();
                            var ginrcptamt = 0;
                            ginrcptamt = Number(txtTotCrAmt.getRawValue()) - Number(txtTotDbtAmt.getRawValue());
                            var fromdate;
                            var todate;
                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);
                            if (Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (rcnt <= 0) {
                                Ext.MessageBox.alert("Bill Realisation", "Transactions Details Not Avaliable ..");
                            } else if (Number(txtTotAdjAmt.getRawValue()) != ginrcptamt) {
                                Ext.MessageBox.alert("Bill Realisation", "Voucher Amount not equal to Bill amount");
                            } else if (cmbBank.getValue() == 0) {
                                Ext.MessageBox.alert("Bill Realisation", "Select the Head of Account");
                            } else {
                                Ext.Msg.show({
                                    title: 'Bill Realisation',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.YESNO,
                                    msg: 'Are You Sure to Add This Record?',
                                    fn: function (btn) {
                                        if (btn == 'yes') {
                                            var accData = flxDetail.getStore().getRange();
                                            var accupdData = new Array();
                                            Ext.each(accData, function (record) {
                                                accupdData.push(record.data);
                                            });
                                            var accadjData = flxInvDet.getStore().getRange();
                                            var accadjupdData = new Array();
                                            Ext.each(accadjData, function (record) {
                                                accadjupdData.push(record.data);
                                            });
                                            Ext.Ajax.request({
                                                url: '/SHVPM/Financials/CashandBank/TrnBillrealisation/FrmTrnBillRealisationSave.php',
                                                params: {
                                                    griddet: Ext.util.JSON.encode(accupdData),
                                                    gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                    finid: ginfinid,
                                                    finyear: gstfinyear,
                                                    compcode: gstfincompcode,
                                                    accrefseq: 0,
                                                    vouno: cmbVoucher.getRawValue(),
                                                    voudate: Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d"),
                                                    bankname: "",
                                                    refno: txtRefNo.getRawValue(),
                                                    refdate: Ext.util.Format.date(RefDate.getValue(), "Y-m-d"),
                                                    narration: txtNarration.getRawValue(),
                                                    paytype: "BR",
                                                    paymode: cmbMode.getRawValue(),
                                                    payno: txtNo.getRawValue(),
                                                    paydate: Ext.util.Format.date(EntDate.getValue(), "Y-m-d"),
                                                    headacct: cmbBank.getValue(),
                                                    rcptamt: ginrcptamt,
                                                    totadjamt: Number(txtTotAdjAmt.getRawValue()),
                                                    exptype: gstoption,
                                                    flagtype: gstFlag,
                                                    cnt: accData.length,
                                                    adjcnt: accadjData.length
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

                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            window.location.reload();
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
                            BillRealisationWindow.hide();
                        }
                    }
                }
            ]

        },
        items: [
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: true,
                height: 70,
                width: 600,
                layout      : 'absolute',
                        x: 10,
                y: 0,
                items: [
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: 80,
                        y: -15,
                        border: false,
                        labelWidth: 85,
                        items: [lblHeadAccount]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 320,
                        x: 350,
                        y: -15,
                        border: false,
                        labelWidth: 70,
                        items: [lblVocDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: 470,
                        y: -15,
                        border: false,
                        labelWidth: 70,
                        items: [lblVocNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: -15,
                        y: 10,
                        border: false,
                        labelWidth: 10,
                        items: [cmbBank]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 130,
                        x: 320,
                        y: 10,
                        border: false,
                        labelWidth: 5,
                        items: [dtpVoudate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 140,
                        x: 440,
                        y: 10,
                        border: false,
                        labelWidth: 5,
                        items: [cmbVoucher]
                    }
                ]
            },
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: true,
                height: 70,
                width: 210,
                layout      : 'absolute',
                        x: 620,
                y: 0,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 0,
                        y: 0,
                        columns: 2,
                        items: [
                            {boxLabel: 'KGDL', name: 'OptType', id: 'optKgdl', inputValue: 1, checked: true, height: 30,
                                listeners: {
                                    'check': function (rb, checked) {
                                        if (checked == true) {
                                            gstoption = "E";
                                        }
                                    }
                                }
                            },
                            {boxLabel: 'FABRIC', name: 'OptType', id: 'optFabric', inputValue: 2, height: 30,
                                listeners: {
                                    'check': function (rb, checked) {
                                        if (checked == true) {
                                            gstoption = "F";
                                        }
                                    }
                                }},
                            {boxLabel: 'MADEUPS', name: 'OptType', id: 'optMadeups', inputValue: 3,
                                listeners: {
                                    'check': function (rb, checked) {
                                        if (checked == true) {
                                            gstoption = "M";
                                        }
                                    }
                                }
                            }


                        ]
                    }
                ]
            },
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: true,
                height: 165,
                width: 820,
                layout      : 'absolute',
                        x: 10,
                y: 75,
                items: [
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: -15,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [cmbLedger]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 150,
                        x: 240,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [cmbCurrency]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 320,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtAmount]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 400,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtExgRate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 480,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [cmbType]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 560,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtDebitAmt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 640,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtCrAmt]
                    },
                    flxDetail,
                    {xtype: 'fieldset',
                        title: '',
                        width: 120,
                        x: 725,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [btnAdd]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 120,
                        x: 725,
                        y: 20,
                        border: false,
                        labelWidth: 05,
                        items: [btnRemove]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 550,
                        y: 110,
                        border: false,
                        labelWidth: 05,
                        items: [txtTotDbtAmt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 625,
                        y: 110,
                        border: false,
                        labelWidth: 05,
                        items: [txtTotCrAmt]
                    }
                ]
            },
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: true,
                height: 175,
                width: 820,
                layout      : 'absolute',
                        x: 10,
                y: 240,
                items: [
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: -15,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [cmbInvNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 95,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 170,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtUsdAmt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 245,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtEefc]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 320,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtBankRefNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 395,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtRealUsd]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 470,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtDocExRate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 90,
                        x: 545,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [txtAdjAmt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 130,
                        x: 610,
                        y: -10,
                        border: false,
                        labelWidth: 05,
                        items: [RealValueDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 120,
                        x: 725,
                        y: -10,
                        border: false,
                        labelWidth: 01,
                        items: [btnAdjAdd]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 130,
                        x: 725,
                        y: 20,
                        border: false,
                        labelWidth: 01,
                        items: [btnAdjRemove]
                    },
                    flxInvDet
                ]
            },
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: true,
                height: 170,
                width: 820,
                layout      : 'absolute',
                        x: 10,
                y: 410,
                items: [
                    {xtype: 'fieldset',
                        title: '',
                        width: 350,
                        x: 10,
                        y: 0,
                        border: false,
                        labelWidth: 70,
                        items: [lblRefNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 130,
                        y: 0,
                        border: false,
                        labelWidth: 70,
                        items: [lblRefDt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 110,
                        x: 230,
                        y: 0,
                        border: false,
                        labelWidth: 110,
                        items: [lblPaymentMode]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 390,
                        y: 0,
                        border: false,
                        labelWidth: 05,
                        items: [lblNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: 510,
                        y: 0,
                        border: false,
                        labelWidth: 05,
                        items: [lblDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 100,
                        x: -10,
                        y: 30,
                        border: false,
                        labelWidth: 05,
                        items: [txtRefNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 130,
                        x: 100,
                        y: 30,
                        border: false,
                        labelWidth: 05,
                        items: [RefDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 150,
                        x: 220,
                        y: 30,
                        border: false,
                        labelWidth: 05,
                        items: [cmbMode]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 125,
                        x: 340,
                        y: 30,
                        border: false,
                        labelWidth: 05,
                        items: [txtNo]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 150,
                        x: 470,
                        y: 30,
                        border: false,
                        labelWidth: 05,
                        items: [EntDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 150,
                        x: 600,
                        y: -10,
                        border: false,
                        labelWidth: 50,
                        items: [txtTotAdjAmt]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 150,
                        x: 0,
                        y: 60,
                        border: false,
                        labelWidth: 05,
                        items: [lblNarattion]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 1000,
                        x: -10,
                        y: 90,
                        border: false,
                        labelWidth: 05,
                        items: [txtNarration]
                    }

                ]
            }
        ]
    });


    function CalcTotalDebitCredit() {
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
        }
        txtTotDbtAmt.setValue(gindbtotal);
        txtTotCrAmt.setValue(gincrtotal);
    }
    ;

    function CalcTotalAdjustAmount() {
        flxInvDet.getSelectionModel().selectAll();
        var selrows = flxInvDet.getSelectionModel().getCount();
        var sel = flxInvDet.getSelectionModel().getSelections();
        var ginadjtotal = 0;
        for (var i = 0; i < selrows; i++) {
            ginadjtotal = ginadjtotal + Number(sel[i].data.amount);
        }
        txtTotAdjAmt.setValue(ginadjtotal);
    }

    function RefreshGridData() {
        txtDebitAmt.setValue("");
        txtCrAmt.setValue("");
        txtAmount.setValue("");
        txtExgRate.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue('Cr');
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbLedger.setValue("");
    }
    ;

    function RefreshData() {
        gstFlag = "Add";
        gstoption = "E";
        BankDataStore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbbankacct",
                        compcode: gstfincompcode
                    }
        });
        LedgerDataStore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbacctname",
                        compcode: gstfincompcode
                    }
        });
        CurrencyDataStore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbcurrency"
                    }
        });
        txtDebitAmt.disable();
        txtCrAmt.disable();
        txtTotDbtAmt.disable();
        txtTotCrAmt.disable();
        txtAmount.disable();
        txtExgRate.disable();
        cmbType.setValue(2);
        cmbType.setRawValue('Cr');
        cmbCurrency.setValue(2);
        cmbCurrency.setRawValue('INR');
        flxDetail.getStore().removeAll();
        flxInvDet.getStore().removeAll();
        txtAdjAmt.setValue('');
        txtAmount.setValue('');
        txtBankRefNo.setValue('');
        txtCrAmt.setValue('');
        txtCurAmt.setValue('');
        txtCurexrate.setValue('');
        txtDate.setValue('');
        txtDebitAmt.setValue('');
        txtDocExRate.setValue('');
        txtEefc.setValue('');
        txtExgRate.setValue('');
        txtNarration.setValue('');
        txtNo.setValue('');
        txtRealUsd.setValue('');
        txtRefNo.setValue('');
        txtTotAdjAmt.setValue('');
        txtTotCrAmt.setValue('');
        txtTotDbtAmt.setValue('');
        txtUsdAmt.setValue('');
        cmbBank.setValue('');
        cmbInvNo.setValue('');
        cmbLedger.setValue('');
        cmbMode.setValue('');
        cmbVoucher.setValue('');
    }
    ;

    var BillRealisationWindow = new Ext.Window({
        height: 660,
        width: 850,
        y: 60,
        layout: 'fit',
        title: 'Bill Realisation Entry',
        items: BillRealisationFormPanel,
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        bodyStyle: {"background-color": "#d7d5fa"},
        listeners:
                {
                    show: function () {
                        gstFlag = "Add";
                        gstoption = "E";
			if(gstfinyear.substring(5,9)==='2018'){
			  dtpVoudate.setRawValue('31-'+'03-'+gstfinyear.substring(5,9));
			}
                        BankDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbbankacct",
                                        compcode: gstfincompcode
                                    }
                        });

                        LedgerDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbacctname",
                                        compcode: gstfincompcode
                                    }
                        });

                        CurrencyDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbcurrency"
                                    }
                        });

                        txtDebitAmt.disable();
                        txtCrAmt.disable();
                        txtTotDbtAmt.disable();
                        txtTotCrAmt.disable();
                        txtAmount.disable();
                        txtExgRate.disable();
                        cmbType.setValue(2);
                        cmbType.setRawValue('Cr');
                        cmbCurrency.setValue(2);
                        cmbCurrency.setRawValue('INR');
                    }
                }
    });
    BillRealisationWindow.show();
});
