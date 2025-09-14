/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();

    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');

    var adjamt;
    var gstFlag;
    var PaymentType;
    var rs_accref;
    var rs_acctran;
    var rs_acctrail;
    var rs_recpay;
    var rs_obdetails;
    var rs_debitnote;
    var pst_vou_no = "";
    var gintotDebitval;
    var gintotCreditval;
    var gstPaytype = "AD";
    var ginAmountbal;
    var pdb_recpay_seqno;
    var pst_ledprefix;
    var dgrecord = Ext.data.Record.create([]);
    var dgrecord1 = Ext.data.Record.create([]);

    var acctrailinvno;
    var acctrail_inv_date;
    var acctran_totamt;
    var dbcrvalue;
    var acctrail_inv_value;
    var Dncn;
    var totamount;
    var accref_credamt;
    var accref_vou_type;
    var accref_seqno;
    var accrefvouno;
    var totamt;
    var acctrailadjvalue;
    var totadjamt;
    var totpayamt;
    var fm = Ext.form;
    var val = "";
    var b = "";
    var c = "";
    var powerid = localStorage.getItem('powerid');

    var HeadAccountNameDataStore = new Ext.data.Store({
        id: 'HeadAccountNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "BankPayAccount"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'}
        ])
    });

    var AccountPartyNameDataStore = new Ext.data.Store({
        id: 'AccountPartyNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "AccountPartyName"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Party_code', type: 'int', mapping: 'led_code'},
            {name: 'Party_Name', type: 'string', mapping: 'led_name'}
        ])
    });

    var CurrencyDataStore = new Ext.data.Store({
        id: 'CurrencyDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "cmbCurrency"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Currency_code', type: 'int', mapping: 'currency_code'},
            {name: 'Currency_name', type: 'string', mapping: 'currency_symbol'}
        ])
    });

    var CurBalance1DataStore = new Ext.data.Store({
        id: 'CurBalance1DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "CurBalance1"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'curbal_pay_seqno'
        ])
    });
    var PrefixDataStore = new Ext.data.Store({
        id: 'PrefixDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
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

    var VocnoDataStore = new Ext.data.Store({
        id: 'VocnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "VocnoBank"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'accref_seqno', type: 'int', mapping: 'accref_seqno'},
            {name: 'accref_vouno', type: 'string', mapping: 'accref_vouno'}
        ])
    });

    var AccRefDataStore = new Ext.data.Store({
        id: 'AccRefDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "AccRef"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_seqno', 'accref_vouno', 'accref_comp_code', 'accref_finid',
            'accref_voudate', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
            'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status'
        ])
    });

    var AccRefSeqnoDataStore = new Ext.data.Store({
        id: 'AccRefSeqnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "AccRefSeqno"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctran_accref_seqno', 'acctran_serialno', 'acctran_led_code', 'acctran_dbamt',
            'acctran_cramt', 'acctran_totamt', 'acctran_cur_code', 'acctran_cur_amt',
            'acctran_exch_rate', 'acctran_pass_no', 'acctran_paytype', 'led_name'
        ])
    });

    var AccountRefTrailDataStore = new Ext.data.Store({
        id: 'AccountRefTrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "AccountRefTrail"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno', 'acctrail_serialno', 'acctrail_inv_no', 'acctrail_inv_date',
            'acctrail_inv_value', 'acctrail_adj_value', 'acctrail_led_code'
        ])
    });

    var RecPayDataStore = new Ext.data.Store({
        id: 'RecPayDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "RecPaytransac"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'recpay_ref_no', 'recpay_ref_date', 'acctran_totamt', 'recpay_dncn_amount', 'recpay_amount',
            'accref_vou_type', 'accref_seqno', 'accref_vouno'
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

    var RecPaytransDataStore = new Ext.data.Store({
        id: 'RecPaytransDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "RecPayTran"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'ob_seqno', 'ob_ref_no', 'ob_ref_date', 'ob_totamt', 'recpay_dncn_amount', 'ob_totamt',
            'ob_adjamt', 'recpay_amount', 'ob_seqno', 'ob_vou_no'
        ])
    });

    var PaymentBilldetailsDataStore = new Ext.data.Store({
        id: 'PaymentBilldetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "PaymentBilldetails"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_seqno', 'accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_comp_code', 'accref_finid',
            'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_value', 'acctrail_adj_value', 'acctran_cramt', 'acctran_totamt',
            'acctran_led_code', 'dbcr_invvalue', 'dbcr_adjvalue', 'dbcr_ledcode', 'dbcr_invno', 'dbcr_invdate', 'dbcr_compcode',
            'dbcr_finid'
        ])
    });

    var CurBalanceDataStore = new Ext.data.Store({
        id: 'CurBalanceDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "CurBalance"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'curbalcr', 'curbaldb'
        ])
    });

    function Bill_details() {
        PaymentBilldetailsDataStore.removeAll();
        PaymentBilldetailsDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2A.php',
            params: {
                task: 'PaymentBilldetails',
                accname: cmbAccountName.getValue(),
                gincompany: gstfincompcode
            },
            callback: function () {
                var cnt1 = PaymentBilldetailsDataStore.getCount();
                if (cnt1 > 0) {
                    for (var i = 0; i < cnt1; i++) {
                        acctrail_inv_value = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_value');
                        if (acctrail_inv_value > 0) {
                            acctrail_inv_value = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_value');
                            acctrailadjvalue = PaymentBilldetailsDataStore.getAt(i).get('acctrail_adj_value');
                            acctrailinvno = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_no');
                            if (acctrailadjvalue !== acctrail_inv_value) {
                                if (acctrailinvno !== "") {
                                    acctrailinvno = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_no');
                                    acctrail_inv_date = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_date');
                                } else
                                {
                                    acctrailinvno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                                    acctrail_inv_date = PaymentBilldetailsDataStore.getAt(i).get('accref_voudate');
                                }
                                acctrail_inv_value = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_value');
                                dbcrvalue = PaymentBilldetailsDataStore.getAt(i).get('dbcr_invvalue');
                                if (dbcrvalue > 0) {
                                    dbcrvalue = PaymentBilldetailsDataStore.getAt(i).get('dbcr_invvalue');
                                } else
                                {
                                    dbcrvalue = "0";
                                }
                                acctran_totamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_totamt');
                                Dncn = parseFloat(acctrail_inv_value - dbcrvalue);
                                totamt = parseFloat(acctrail_inv_value - acctrailadjvalue);
                                accref_credamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_cramt');
                                if (accref_credamt > 0) {
                                    accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
                                } else
                                {
                                    accref_vou_type = "AD";
                                }
                                accref_seqno = PaymentBilldetailsDataStore.getAt(i).get('accref_seqno');
                                accrefvouno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                                flxAdjustDetails.getStore().insert(
                                        flxAdjustDetails.getStore().getCount(),
                                        new dgrecord1({
                                            InvNo: acctrailinvno,
                                            Date: acctrail_inv_date,
                                            InvAmt: acctrail_inv_value,
                                            DNCN: dbcrvalue,
                                            TotAmt: Dncn,
                                            PendAmount: totamt,
                                            Adjusted: '',
                                            Type: accref_vou_type,
                                            Billseqno: accref_seqno,
                                            Vocno: accrefvouno
                                        })
                                        );
                            }
                        } else {
                            acctrailinvno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                            acctrail_inv_date = PaymentBilldetailsDataStore.getAt(i).get('accref_voudate');
                            acctran_totamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_totamt');
                            dbcrvalue = PaymentBilldetailsDataStore.getAt(i).get('dbcr_invvalue');
                            if (dbcrvalue !== "") {
                                dbcrvalue = PaymentBilldetailsDataStore.getAt(i).get('dbcr_invvalue');
                            } else
                            {
                                dbcrvalue = "0";
                            }
                            Dncn = parseFloat(acctran_totamt - dbcrvalue);
                            totamount = PaymentBilldetailsDataStore.getAt(i).get('acctran_totamt');
                            accref_credamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_cramt');
                            if (accref_credamt > 0) {
                                accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
                            } else
                            {
                                accref_vou_type = "AD";
                            }
                            accref_seqno = PaymentBilldetailsDataStore.getAt(i).get('accref_seqno');
                            accrefvouno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                            flxAdjustDetails.getStore().insert(
                                    flxAdjustDetails.getStore().getCount(),
                                    new dgrecord1({
                                        InvNo: acctrailinvno,
                                        Date: acctrail_inv_date,
                                        InvAmt: acctran_totamt,
                                        DNCN: Dncn,
                                        TotAmt: acctran_totamt,
                                        PendAmount: '',
                                        Adjusted: '',
                                        Type: accref_vou_type,
                                        Billseqno: accref_seqno,
                                        Vocno: accrefvouno
                                    })
                                    );
                        }
                    }
                }
            }
        });
    }

    function calc_sum() {
        txtAmtbalance.setRawValue(parseFloat(txtTotDebit.getValue() - txtTotCredit.getValue()));
        totadjamt = "";
        totpayamt = "";
        var rowcnt = flxAdjustDetails.getStore().getCount();
        flxAdjustDetails.getSelectionModel().selectAll();
        var sel1 = flxAdjustDetails.getSelectionModel().getSelections();
        for (var i = 0; i < rowcnt; i++) {
            if (Number(sel1[i].data.Adjusted) > 0) {
                if (sel1[i].data.Type !== "AD") {
                    totadjamt = Number(totadjamt) + Number(sel1[i].data.Adjusted);
                } else {
                    totpayamt = Number(totpayamt) + Number(sel1[i].data.Adjusted);
                }
            }
        }
    }

    function curbal_payment() {
        CurBalanceDataStore.removeAll();
        CurBalanceDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2A.php',
            params: {
                task: 'CurBalance',
                accname: cmbAccountName.getValue(),
                gincompany: gstfincompcode,
                ginfinid: ginfinid
            },
            callback: function () {
                var rs_curbal_pay = CurBalanceDataStore.getCount();
                if (rs_curbal_pay > 0) {
                    var curbalcr = CurBalanceDataStore.getAt(0).get('curbalcr');
                    var curbaldb = CurBalanceDataStore.getAt(0).get('curbaldb');
                    if (curbalcr > 0) {
                        txtAmtbalance.setRawValue(CurBalanceDataStore.getAt(0).get('curbalcr'));
                        lblAmtbal.setText("Cr");
                    } else if (curbaldb > 0) {
                        txtAmtbalance.setRawValue(CurBalanceDataStore.getAt(0).get('curbaldb'));
                        lblAmtbal.setText("Dr");
                    } else {
                        txtAmtbalance.setRawValue("0");
                    }
                } else {
                    txtAmtbalance.setRawValue("0");
                }
            }
        });
    }

    function CalDebitCreditTot()
    {
        gintotDebitval = 0;
        gintotCreditval = 0;
        var RowCnt = flxTransactionDetails.getStore().getCount();
        flxTransactionDetails.getSelectionModel().selectAll();
        var sel1 = flxTransactionDetails.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotDebitval = gintotDebitval + Number(sel1[j].data.Debit);
            gintotCreditval = gintotCreditval + Number(sel1[j].data.Credit);
        }
        txtTotDebit.setValue(gintotDebitval);
        txtTotCredit.setValue(gintotCreditval);
    }


    function CalTotalBilladjusted()
    {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        var gstbillnos = "";
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()) - Number(txtTotCredit.getRawValue()));
        txtDebit.setValue("");
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('Adjusted')) > 0 && i !== rownum) {
                if (rec.get('Type') !== 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('Adjusted')));
                    txtDebit.setValue(Number(txtDebit.getRawValue()) + Number(rec.get('Adjusted')));
                    gstbillnos = gstbillnos + rec.get('InvNo') + "/";
                } else {
                }
            }
        }
        if (selrow.get('Type') === 'AD') {

        } else {
            selrow.set('Adjusted', selrow.get('PendAmount'));
            CalcSum();
        }
    }

    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Head.Account',
        id: 'lblHeadAcnt', hidden: true,
        width: 50
    });

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: 'From Bank',
        width: 310,
        store: HeadAccountNameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbHeadAccount',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                if (cmbHeadAccount.getRawValue() !== "") {
                    if (cmbHeadAccount.getRawValue() === cmbAccountName.getRawValue()) {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Same Head Account and AccName!',
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    cmbHeadAccount.setRawValue("");
                                    cmbHeadAccount.focus();
                                } else {
                                    cmbHeadAccount.setRawValue("");
                                    cmbHeadAccount.focus();
                                }
                            }
                        });
                    }
                }
            }, blur: function () {
                if (cmbHeadAccount.getRawValue() !== "") {
                    if (cmbHeadAccount.getRawValue() === cmbAccountName.getRawValue()) {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Same Head Account and AccName!',
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    cmbHeadAccount.setRawValue("");
                                    cmbHeadAccount.focus();
                                } else {
                                    cmbHeadAccount.setRawValue("");
                                    cmbHeadAccount.focus();
                                }
                            }
                        });
                    }
                }
            }
        }
    });

    var optType = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',hidden:true,
        layout: 'vbox',
        width: 160,
        height: 50,
        border: false,
        items: [{
                xtype: 'radiogroup',
                columns: 2,
                rows: 1,
                id: 'optTypeDep',
                items: [
                    {
                        boxLabel: 'Bill',
                        name: 'optType',
                        id: 'optbill',
                        inputValue: 1,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    gstPaytype = "BB";
                                    txtNameuser.hide();
                                    RefreshData();
                                }
                            }
                        }
                    },
                    {
                        boxLabel: 'Advance',
                        name: 'optType',
                        inputValue: 2,
                        checked: true,
                        id: 'optAdv',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    gstPaytype = "AD";
                                    txtNameuser.show();
                                    RefreshData();
                                }
                            }
                        }
                    }
                ]
            }]
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

    var dtpVocDate = new Ext.form.DateField({
        fieldLabel: 'Voc Date',
        id: 'dtpVocDate',
        name: 'date',
        format: 'Y-m-d',
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
                            dtpVocDate.setRawValue(new Date().format('Y-m-d'));
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
                            dtpVocDate.setRawValue(new Date().format('Y-m-d'));
                        }
                    }
                });
            }
        }
    });

    var cmbVocNo = new Ext.form.ComboBox({
        fieldLabel: 'Voc No',
        width: 120,
        hidden: true,
        store: VocnoDataStore,
        displayField: 'accref_vouno',
        valueField: 'accref_seqno',
        hiddenName: 'accref_vouno',
        id: 'cmbVocNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                AccRefDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2A.php',
                    params: {
                        task: 'AccRef',
                        vocno: this.getValue()
                    },
                    callback: function () {
                        rs_accref = AccRefDataStore.getCount();
                        if (rs_accref > 0) {
                            dtpVocDate.setRawValue(AccRefDataStore.getAt(0).get('accref_voudate'));
                            txtBankName.setRawValue(AccRefDataStore.getAt(0).get('accref_bank_name'));
                            cmbPaymode.setValue(AccRefDataStore.getAt(0).get('accref_paymode'));
                            txtmodeNo.setValue(AccRefDataStore.getAt(0).get('accref_payref_no'));
                            dtpmodeDate.setRawValue(AccRefDataStore.getAt(0).get('accref_payref_date'));
                            txtNarration.setRawValue(AccRefDataStore.getAt(0).get('accref_narration'));

                            AccRefSeqnoDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2A.php',
                                params: {
                                    task: 'AccRefSeqno',
                                    vocno: cmbVocNo.getValue()
                                },
                                callback: function () {
                                    rs_acctran = AccRefSeqnoDataStore.getCount();
                                    if (rs_acctran > 0) {
                                        txtTotDebit.setValue("");
                                        txtTotCredit.setValue("");
                                        var acctran_paytype = AccRefSeqnoDataStore.getAt(0).get('acctran_paytype');
                                        if (acctran_paytype == "AD") {
                                            Ext.getCmp("optbill").setValue(false);
                                            Ext.getCmp("optAdv").setValue(true);
                                        } else {
                                            Ext.getCmp("optbill").setValue(true);
                                            Ext.getCmp("optAdv").setValue(false);
                                        }
                                        var acctran_led_code = AccRefSeqnoDataStore.getAt(0).get('acctran_led_code');
                                        if (acctran_led_code < cmbHeadAccount.getRawValue() && acctran_led_code > cmbHeadAccount.getRawValue()) {
                                            var led_name = AccRefSeqnoDataStore.getAt(0).get('led_name');
                                            var acctran_cur_code = AccRefSeqnoDataStore.getAt(0).get('acctran_cur_code');
                                            var acctran_cur_amt = AccRefSeqnoDataStore.getAt(0).get('acctran_cur_amt');
                                            var acctran_exch_rate = AccRefSeqnoDataStore.getAt(0).get('acctran_exch_rate');
                                            var acctran_dbamt = AccRefSeqnoDataStore.getAt(0).get('acctran_dbamt');
                                            if (acctran_dbamt > 0) {
                                                var amt = 'Dr';
                                            } else {
                                                amt = 'Cr';
                                            }
                                            var acctran_cramt = AccRefSeqnoDataStore.getAt(0).get('acctran_cramt');
                                            var totdebit = parseFloat(txtTotDebit.getValue() + AccRefSeqnoDataStore.getAt(0).get('acctran_dbamt'));
                                            var totcredit = parseFloat(txtTotCredit.getValue() + AccRefSeqnoDataStore.getAt(0).get('acctran_cramt'));
                                            var RowCnt = flxTransactionDetails.getStore().getCount() + 1;
                                            flxTransactionDetails.getStore().insert(
                                                    flxTransactionDetails.getStore().getCount(),
                                                    new dgrecord({
                                                        AccName: led_name,
                                                        Currency: acctran_cur_code,
                                                        CurAmt: acctran_cur_amt,
                                                        ExRate: acctran_exch_rate,
                                                        Type: amt,
                                                        Debit: totdebit,
                                                        Credit: totcredit,
                                                        acctran_led_code: acctran_led_code
                                                    })
                                                    );
                                        }
                                        flxTransactionDetails.getSelectionModel().selectAll();
                                        var selro = flxTransactionDetails.getSelectionModel().getCount();
                                        var sele = flxTransactionDetails.getSelectionModel().getSelections();
                                        var cnt = 0;
                                        for (var t = 0; t < selro; t++) {
                                            if (sele[t].data.AccName == cmbAccountName.getRawValue())
                                            {
                                                cnt = cnt + 1;
                                            }
                                        }
                                        if (cnt > 1) {
                                            RecPayDataStore.load({
                                                url: '/SHVPM/Financials/clsFinancials2A.php',
                                                params: {
                                                    task: 'RecPaytransac',
                                                    vocno: cmbVocNo.getValue(),
                                                    ledcode: acctran_led_code
                                                },
                                                callback: function () {
                                                    var recpay_ref_no = RecPayDataStore.getAt(0).get('recpay_ref_no');
                                                    var recpay_ref_date = RecPayDataStore.getAt(0).get('recpay_ref_date');
                                                    var acctran_totamt = RecPayDataStore.getAt(0).get('acctran_totamt');
                                                    var recpay_dncn_amount = RecPayDataStore.getAt(0).get('recpay_dncn_amount');
                                                    var totamt1 = parseFloat(acctran_totamt - recpay_dncn_amount);
                                                    var recpay_amount = RecPayDataStore.getAt(0).get('recpay_amount');
                                                    var accref_vou_type = RecPayDataStore.getAt(0).get('accref_vou_type');
                                                    var balan1 = parseFloat(totamt1 - recpay_amount);
                                                    var accref_seqno = RecPayDataStore.getAt(0).get('accref_seqno');
                                                    var accref_vouno = RecPayDataStore.getAt(0).get('accref_vouno');
                                                    var RowCnt = flxAdjustDetails.getStore().getCount() + 1;
                                                    flxAdjustDetails.getStore().insert(
                                                            flxAdjustDetails.getStore().getCount(),
                                                            new dgrecord({
                                                                recpay_ref_no: InvNo,
                                                                recpay_ref_date: Date,
                                                                acctran_totamt: InvAmt,
                                                                recpay_dncn_amount: DNCN,
                                                                totamt1: TotAmt,
                                                                totamt1:PendAmount,
                                                                        recpay_amount: Adjusted,
                                                                accref_vou_type: Type,
                                                                balan1: Balance,
                                                                accref_seqno: Billseqno,
                                                                accref_vouno: Vocno
                                                            })
                                                            );
                                                }
                                            });
                                            RecPaytransDataStore.load({
                                                url: '/SHVPM/Financials/clsFinancials2A.php',
                                                params: {
                                                    task: 'RecPayTran',
                                                    accrefseqno: cmbVocNo.getValue()
                                                },
                                                callback: function () {
                                                    var ob_ref_no = RecPaytransDataStore.getAt(0).get('ob_ref_no');
                                                    var ob_ref_date = RecPaytransDataStore.getAt(0).get('ob_ref_date');
                                                    var recpay_dncn_amount = RecPaytransDataStore.getAt(0).get('recpay_dncn_amount');
                                                    var ob_totamt = RecPaytransDataStore.getAt(0).get('ob_totamt');
                                                    var totamt = parseFloat(ob_totamt - recpay_dncn_amount);
                                                    var ob_adjamt = RecPaytransDataStore.getAt(0).get('ob_adjamt');
                                                    var totamtadjamt = parseFloat(ob_totamt - ob_adjamt);
                                                    var recpay_amount = RecPaytransDataStore.getAt(0).get('recpay_amount');
                                                    var typ = "OB";
                                                    var balan = parseFloat(totamtadjamt + recpay_amount);
                                                    var ob_seqno = RecPaytransDataStore.getAt(0).get('ob_seqno');
                                                    var ob_vou_no = RecPaytransDataStore.getAt(0).get('ob_vou_no');
                                                    var RowCnt = flxAdjustDetails.getStore().getCount() + 1;
                                                    flxAdjustDetails.getStore().insert(
                                                            flxAdjustDetails.getStore().getCount(),
                                                            new dgrecord({
                                                                ob_ref_no: InvNo,
                                                                ob_ref_date: Date,
                                                                ob_totamt: InvAmt,
                                                                recpay_dncn_amount: DNCN,
                                                                totamt: TotAmt,
                                                                totamtadjamt: PendAmount,
                                                                recpay_amount: Adjusted,
                                                                typ: Type,
                                                                balan: Balance,
                                                                ob_seqno: Billseqno,
                                                                ob_vou_no: Vocno
                                                            })
                                                            );
                                                }
                                            });
                                        }
                                        Bill_details();
                                    }
                                }
                            });
                            calc_sum();

                            AccountRefTrailDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2A.php',
                                params: {
                                    task: 'AccountRefTrail',
                                    vocno: cmbVocNo.getValue()
                                },
                                callback: function () {
                                    rs_acctrail = AccountRefTrailDataStore.getCount();
                                    if (rs_acctrail > 0) {
                                        txtRefNo.setValue(AccRefDataStore.getAt(0).get('acctrail_inv_no'));
                                        txtAmtbalance.setValue(parseFloat(txtTotDebit.getValue() - txtTotCredit.getValue()));
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Account',
        id: 'lblAccount',
        width: 50
    });

    var grpcodetds = 0;
    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: 'To Bank',
        width: 310,
        store: HeadAccountNameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbAccountName.getRawValue() !== "") {
                    if (cmbHeadAccount.getRawValue() === cmbAccountName.getRawValue()) {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Same Head Account and AccName!',
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    cmbAccountName.setRawValue("");
                                    cmbAccountName.focus();
                                } else {
                                    cmbAccountName.setRawValue("");
                                    cmbAccountName.focus();
                                }
                            }
                        });
                    } 
                }
            },select: function () {
                if (cmbAccountName.getRawValue() !== "") {
                    if (cmbHeadAccount.getRawValue() === cmbAccountName.getRawValue()) {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Same Head Account and AccName!',
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    cmbAccountName.setRawValue("");
                                    cmbAccountName.focus();
                                } else {
                                    cmbAccountName.setRawValue("");
                                    cmbAccountName.focus();
                                }
                            }
                        });
                    } 
                }
            }
        }
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency', hidden: true,
        width: 50
    });

    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel: '',hidden:true,
        width: 55,
        store: CurrencyDataStore, readOnly: true,
        displayField: 'Currency_name',
        valueField: 'Currency_code',
        hiddenName: 'Currency_name',
        id: 'cmbCurrency', hidden: true,
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbCurrency.getRawValue() === "INR") {
                    txtAmt.disable();
                    txtExRate.disable();
                } else
                {
                    txtAmt.enable();
                    txtExRate.enable();
                }
            }
        }
    });

    var lblAmt = new Ext.form.Label({
        fieldLabel: 'Amount', hidden: true,
        id: 'lblAmt',
        width: 50
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmt', hidden: true,
        width: 70,
        name: 'Amount',
        disabled: true
    });

    var lblExRate = new Ext.form.Label({
        fieldLabel: 'Exg.Rate',
        id: 'lblExgRate', hidden: true,
        width: 50
    });

    var txtExRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtExgRate',
        width: 60, hidden: true,
        name: 'ExgRate',
        disabled: true,
        listeners: {
            blur: function () {
                if (txtAmt.getValue() > 0 && txtExRate.getValue() > 0) {
                    if (cmbType.getRawValue() === "Dr") {
                        txtDebit.setValue(parseFloat(txtAmt.getValue() * txtExRate.getValue()));
                    } else if (cmbType.getRawValue() === "Cr") {
                        txtCredit.setValue(parseFloat(txtAmt.getValue() * txtExRate.getValue()));
                    }
                }
            }
        }
    });

    var lblTDS = new Ext.form.Label({
        fieldLabel: 'TDS%',
        id: 'lblTDS', hidden: true,
        width: 50
    });

    var txttdstax = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txttdstax', hidden: true,
        width: 30,
        name: 'txttdstax',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                txtCredit.setRawValue("0.00");
                txtCredit.setRawValue(Ext.util.Format.number((Number(txttdstaxVAL.getValue()) * Number(txttdstax.getValue())) / (100), '0.00'));
                cmbType.setRawValue('Cr');
                txtCredit.enable();
                txtDebit.disable();
                txtDebit.setValue('');
            }
        }
    });

    var lblTDSVAL = new Ext.form.Label({
        fieldLabel: 'TDS VALUE',
        id: 'lblTDSVAL', hidden: true,
        width: 50
    });

    var txttdstaxVAL = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txttdstaxVAL', hidden: true,
        width: 90,
        name: 'txttdstaxVAL',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                txtCredit.setRawValue("0.00");
                txtCredit.setRawValue(Ext.util.Format.number((Number(txttdstaxVAL.getValue()) * Number(txttdstax.getValue())) / (100), '0.00'));
                cmbType.setRawValue('Cr');
                txtCredit.enable();
                txtDebit.disable();
                txtDebit.setValue('');
            }
        }
    });

    var lblType = new Ext.form.Label({
        fieldLabel: 'Type',
        id: 'lblType',hidden:true,
        width: 50
    });

    var cmbType = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 45,hidden:true,
        store: ['Dr', 'Cr'],
        displayField: 'Type_name',
        valueField: 'Type_code',
        hiddenName: 'Type_name',
        id: 'cmbType',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbType.getRawValue() === "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                    txtCredit.setValue('');
                } else
                if (cmbType.getRawValue() === "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                    txtDebit.setValue('');
                }
            },
            select: function () {
                if (cmbType.getRawValue() === "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                    txtCredit.setValue('');
                } else
                if (cmbType.getRawValue() === "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                    txtDebit.setValue('');
                }
            }
        }
    });

    var lblDebit = new Ext.form.Label({
        fieldLabel: 'Debit',
        id: 'lblDebit',hidden:true,
        width: 50
    });

    var txtDebit = new Ext.form.NumberField({
        fieldLabel: 'Amount',
        id: 'txtDebit',
        width: 120,
        name: 'Debit'
    });

    var txtcharges = new Ext.form.NumberField({
        fieldLabel: 'Bank Charges',
        id: 'txtcharges',
        width: 120,
        name: 'txtcharges'
    });

    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Credit',
        id: 'lblCredit',hidden:true,
        width: 50
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',hidden:true,
        width: 80,
        name: 'Credit'
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Submit",hidden:true,
        width: 50,
        listeners: {
            click: function () {
                var gstInsert = "true";
                if (gstPaytype === "BB") {
                    txtDebit.setRawValue("");
                    flxTransactionDetails.getStore().removeAll();
                    val = "";
                    var RowCnt = flxAdjustDetails.getStore().getCount();
                    flxAdjustDetails.getSelectionModel().selectAll();
                    var sel1 = flxAdjustDetails.getSelectionModel().getSelections();
                    for (var j = 0; j < RowCnt; j++)
                    {
                        val = Number(val) + Number(sel1[j].data.Adjusted);
                    }
                    txtDebit.setRawValue(val);
                    txtTotNetAmt.setRawValue(val);
                }
                flxTransactionDetails.getSelectionModel().selectAll();
                var selro = flxTransactionDetails.getSelectionModel().getCount();
                var sele = flxTransactionDetails.getSelectionModel().getSelections();
                var cnt = 0;
                for (var t = 0; t < selro; t++) {
                    if (sele[t].data.AccName === cmbAccountName.getRawValue())
                    {
                        cnt = cnt + 1;
                    }
                }
                if (cmbAccountName.getRawValue() === "") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Select Account Name");
                } else if (cmbCurrency.getRawValue() === "") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Select Currency");
                } else if (txtAmt.getValue() === "0" && cmbCurrency.getRawValue() === "INR") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Enter the Currency Amount");
                } else if (txtExRate.getValue() === "0" && cmbCurrency.getRawValue() === "INR") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Enter the Exchange Rate");
                } else if (txtDebit.getValue() === "0" && txtCredit.getValue() === "0" && cmbType.getRawValue() === "Dr") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Enter the debit Amount");
                } else if (txtDebit.getValue() === "0" && txtCredit.getValue() === "0" && cmbType.getRawValue() === "Cr") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Enter the Credit Amount");
                } else if (cnt > 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Financials", "Details for this account already added");
                }
                if (grpcodetds == 65) {
                    if ((txttdstax.getRawValue() === "" || txttdstax.getValue() == 0) && cmbType.getRawValue() === "Cr") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Financials", "Enter Tds Percentage!");
                    } else if ((txttdstaxVAL.getRawValue() === "" || txttdstaxVAL.getValue() == 0) && cmbType.getRawValue() === "Cr") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Financials", "Enter Tds Value!");
                    }
                }

                if (gstInsert === "true") {
                    if (cmbType.getRawValue() === "Dr") {
                        var RowCnt = flxTransactionDetails.getStore().getCount() + 1;
                        flxTransactionDetails.getStore().insert(
                                flxTransactionDetails.getStore().getCount(),
                                new dgrecord({
                                    AccName: cmbAccountName.getRawValue(),
                                    Currency: cmbCurrency.getRawValue(),
                                    CurAmt: txtAmt.getValue(),
                                    ExRate: txtExRate.getValue(),
                                    Type: cmbType.getRawValue(),
                                    Debit: Number(txtDebit.getRawValue()),
                                    Credit: '0',
                                    acctran_led_code: cmbAccountName.getValue(),
                                    acctran_cur_code: cmbCurrency.getValue(),
                                    totamt: Number(txtDebit.getRawValue()),
                                    tdsper: Number(txttdstax.getRawValue()),
                                    tdsvalue: Number(txttdstaxVAL.getRawValue())
                                })
                                );
                        CalDebitCreditTot();
                        txttdstax.setValue('');
                        txttdstaxVAL.setValue('');
                        txttdstax.hide();
                        txttdstaxVAL.hide();
                        lblTDSVAL.hide();
                        lblTDS.hide();
                        cmbAccountName.setValue('');
                        cmbAccountName.focus();
                    } else if (cmbType.getRawValue() === "Cr") {
                        var RowCnt1 = flxTransactionDetails.getStore().getCount() + 1;
                        flxTransactionDetails.getStore().insert(
                                flxTransactionDetails.getStore().getCount(),
                                new dgrecord({
                                    AccName: cmbAccountName.getRawValue(),
                                    Currency: cmbCurrency.getRawValue(),
                                    CurAmt: txtAmt.getValue(),
                                    ExRate: txtExRate.getValue(),
                                    Type: cmbType.getRawValue(),
                                    Debit: '0',
                                    Credit: Number(txtCredit.getRawValue()),
                                    acctran_led_code: cmbAccountName.getValue(),
                                    acctran_cur_code: cmbCurrency.getValue(),
                                    totamt: Number(txtCredit.getRawValue()),
                                    tdsper: Number(txttdstax.getRawValue()),
                                    tdsvalue: Number(txttdstaxVAL.getRawValue())
                                })
                                );
                        CalDebitCreditTot();
                        txttdstax.setValue('');
                        txttdstaxVAL.setValue('');
                        txttdstax.hide();
                        txttdstaxVAL.hide();
                        lblTDSVAL.hide();
                        lblTDS.hide();
                        cmbAccountName.setValue('');
                        cmbAccountName.focus();
                    } else {
                        Ext.Msg.alert("Alert", "Select Dr Or Cr...");
                    }
                }
            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",hidden:true,
        width: 60,
        listeners: {
            click: function () {
                var sm = flxTransactionDetails.getSelectionModel();
                var selrow = sm.getSelected();
                flxTransactionDetails.getStore().remove(selrow);
                flxTransactionDetails.getSelectionModel().selectAll();
                var selrows = flxTransactionDetails.getSelectionModel().getCount();
                var sel = flxTransactionDetails.getSelectionModel().getSelections();
                var gintotqty = 0;
                var gintotcred = 0;
                for (var i = 0; i < selrows; i++) {
                    gintotqty = gintotqty + sel[i].data.Debit;
                    gintotcred = gintotcred + sel[i].data.Credit;
                }
                txtTotDebit.setValue(gintotqty);
                txtTotCredit.setValue(gintotcred);
            }
        }
    });

    var flxTransactionDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',hidden:true,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 100,
        width: 770,
        x: 0,
        y: 0,
        columns: [
            {header: "Acc.Name", dataIndex: 'AccName', sortable: true, width: 380, align: 'left'},
            {header: "Currency", dataIndex: 'Currency', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Cur.Amount", dataIndex: 'CurAmt', sortable: true, width: 90, align: 'left', hidden: true},
            {header: "Ex.Rate", dataIndex: 'ExRate', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Type", dataIndex: 'Type', sortable: true, width: 70, align: 'left'},
            {header: "Debit", dataIndex: 'Debit', sortable: true, width: 110, align: 'left'},
            {header: "Credit", dataIndex: 'Credit', sortable: true, width: 110, align: 'left'},
            {header: "acctran_led_code", dataIndex: 'acctran_led_code', sortable: true, width: 110, align: 'left', hidden: true},
            {header: "acctran_cur_code", dataIndex: 'acctran_cur_code', sortable: true, width: 110, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "tdsper", dataIndex: 'tdsper', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "tdsvalue", dataIndex: 'tdsvalue', sortable: true, width: 60, align: 'left', hidden: true}
        ],
        store: []
    });

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit',
        id: 'txtTotDebit', readOnly: true,hidden:true,
        width: 80,
        name: 'TotDebit'
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit',
        id: 'txtTotCredit', readOnly: true,
        width: 80,hidden:true,
        name: 'TotCredit'
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Reference No',
        id: 'txtRefNo',
        width: 130,
        name: 'RefNo'
    });

    var txtAmtbalance = new Ext.form.NumberField({
        fieldLabel: 'Amount Balance',
        id: 'txtAmtbalance',
        readOnly: true,hidden:true,
        width: 150,
        name: 'AmountBalance'
    });

    var lblAmtbal = new Ext.form.Label({
        fieldLabel: '',
        id: 'lblAmtbal',hidden:true,
        width: 50
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',hidden:true,
        width: 150,
        name: 'BankName',
        listeners: {
            focus: function () {
                txtDebit.setValue("");
                val = "";
                var RowCnt = flxAdjustDetails.getStore().getCount();
                flxAdjustDetails.getSelectionModel().selectAll();
                var sel1 = flxAdjustDetails.getSelectionModel().getSelections();
                for (var j = 0; j < RowCnt; j++)
                {
                    val = Number(val) + Number(sel1[j].data.Adjusted);
                }
                txtDebit.setRawValue(val);
            }
        }
    });


    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',hidden:true,
        width: 60,
        store: ['CQ', 'DD', 'MT', 'TT'],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false
    });

    var txtmodeNo = new Ext.form.NumberField({
        fieldLabel: 'Check No',
        id: 'txtmodeNo',
        width: 100,
        name: 'No'
    });

    var dtpmodeDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpmodeDate',
        name: 'Date',
        format: 'Y-m-d',
        value: new Date(),
        anchor: '100%'
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',hidden:true,
        id: 'lblAdjustingDoc',
        width: 50
    });

    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,hidden:true,
        scrollable: true,
        height: 120,
        width: 770,
        x: 0,
        y: 0,
        columns: [
            {header: "Inv.No", dataIndex: 'InvNo', sortable: true, width: 120, align: 'left'},
            {header: "Date", dataIndex: 'Date', sortable: true, width: 100, align: 'left'},
            {header: "Inv.Amount", dataIndex: 'InvAmt', sortable: true, width: 110, align: 'left'},
            {header: "DN/CN", dataIndex: 'DNCN', sortable: true, width: 80, align: 'left'},
            {header: "Total Amount", dataIndex: 'TotAmt', sortable: true, width: 110, align: 'left'},
            {header: "Pending Amount", dataIndex: 'PendAmount', sortable: true, width: 110, align: 'left'},
            {header: "Adjusted", dataIndex: 'Adjusted', sortable: true, width: 110, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
                            pendingamt = Number(selrow.get('PendAmount'));

                            if (Number(this.getRawValue()) > Number(pendingamt)) {
                                Ext.MessageBox.alert("Payment", "Adjusted amount cannot be greater than pending amount");
                                this.setValue(pendingamt);
                                selrow.set('Adjusted', pendingamt);
                                CalcSum();
                            }
                        }, focus: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('Adjusted')));
                            txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {
                            CalcSum();
                        }
                    }
                },
                listeners: {
                    click: function () {
                        flxTransactionDetails.getStore().removeAll();
                        txtTotDebit.setRawValue('');
                        txtTotCredit.setRawValue('');
                        CalTotalBilladjusted();
                    }
                }
            },
            {header: "Type", dataIndex: 'Type', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Balance", dataIndex: 'Balance', sortable: true, width: 100, align: 'left', hidden: true,
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.Adjusted) > 0) {
                        retval = Number(record.data.TotAmt) - Number(record.data.Adjusted);
                    } else {
                        retval = Number(record.data.TotAmt);
                    }
                    return retval;
                }
            },
            {header: "seqno", dataIndex: 'Billseqno', sortable: true, width: 80, align: 'left', hidden: true},
            {header: "vocno", dataIndex: 'Vocno', sortable: true, width: 80, align: 'left', hidden: true}
        ],
        store: []
    });

    var txtPayAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtPayAmt',hidden:true,
        width: 80,
        name: 'PayAmt'
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: '',hidden:true,
        id: 'txtTotNetAmt',
        width: 80,
        name: 'TotNetAmt'
    });

    var txtNameuser = new Ext.form.TextField({
        fieldLabel: 'Requested By',
        id: 'txtNameuser',
        hidden: true,
        style: {
            'textTransform': 'uppercase'
        },
        width: 200,
        name: 'txtNameuser'
    });

    var lblNarration = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarration',
        width: 50
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: '',
        id: 'txtNarration',
        width: 685,
        height: 60,
        name: 'Narration'
    });

    var CheckNoValidateDataStore = new Ext.data.Store({
        id: 'CheckNoValidateDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "CheckNoValidate"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cnt'
        ])
    });

    var CashBankpaymentFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'PAYMENT-BANK PAYMENT-BANK TO BANK',
        header: false,
        bodyStyle: {"background-color": "#2471a3"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashBankpaymentFormPanel',
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
                    tooltip: 'Save Details...', id: 'saveidnew',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                            CheckNoValidateDataStore.removeAll();
                            CheckNoValidateDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2A.php',
                                params: {
                                    task: 'CheckNoValidate',
                                    chkno: txtmodeNo.getRawValue(),
                                    headled: cmbHeadAccount.getValue()
                                },
                                callback: function () {
                                    var cntnew = CheckNoValidateDataStore.getAt(0).get('cnt');
                                    if (cntnew <= 0) {
                                        var rcnt = flxTransactionDetails.getStore().getCount();
                                        var fromdate;
                                        var todate;
                                        fromdate = "04/01/" + gstfinyear.substring(0, 4);
                                        todate = "03/31/" + gstfinyear.substring(5, 9);
                                        if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                                        } else if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                                        } else if (cmbHeadAccount.getRawValue() === '') {
                                            Ext.MessageBox.alert("Payment", "Select the Head of Account");
                                        }  else if (cmbHeadAccount.getValue() <= 0) {
                                            Ext.MessageBox.alert("Payment", "Select the Head of Account");
                                        } else if (cmbHeadAccount.getRawValue() === cmbAccountName.getRawValue()) {
                                            Ext.MessageBox.alert("Payment", "Selected Same Account! pls check!");
                                        } else if (cmbAccountName.getValue() <= 0) {
                                            Ext.MessageBox.alert("Payment", "Selected AccountName!");
                                        } else if (txtDebit.getValue() <= 0) {
                                            Ext.MessageBox.alert("Payment", "Enter Amount!");
                                        } else {
                                            Ext.MessageBox.show({
                                                title: 'Confirmation',
                                                icon: Ext.Msg.QUESTION,
                                                buttons: Ext.MessageBox.YESNO,
                                                msg: 'Do u want to Save',
                                                fn: function (btn) {
                                                    if (btn === 'yes') {
                                                        Ext.getCmp('saveidnew').setVisible(false);
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
                                                            url: 'TrnBankPaymentBtoBSave.php',
                                                            params: {
                                                                griddet: Ext.util.JSON.encode(accupdData),
                                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                                finid: ginfinid,
                                                                finyear: gstfinyear,
                                                                compcode: gstfincompcode,
                                                                voudate: Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d"),
                                                                refno: txtRefNo.getRawValue(),
								charges:Number(txtcharges.getRawValue()),
								Debit:Number(txtDebit.getRawValue()),
								headacct2: cmbAccountName.getValue(),
								frmbank: cmbHeadAccount.getRawValue(),
								tobank: cmbAccountName.getRawValue(),							
                                                                refdate: Ext.util.Format.date(dtpmodeDate.getValue(), "Y-m-d"),
                                                                narration: txtNarration.getRawValue(),
                                                                paymode: cmbPaymode.getRawValue(),
                                                                payno: txtmodeNo.getRawValue(),
                                                                paydate: Ext.util.Format.date(dtpmodeDate.getValue(), "Y-m-d"),
                                                                headacct: cmbHeadAccount.getValue(),
                                                                cnt: accData.length,
                                                                adjcnt: accadjData.length
                                                            },
                                                            callback: function (options, success, response)
                                                            {
                                                                var obj = Ext.decode(response.responseText);
                                                                if (obj['success'] === "true") {
                                                                    Ext.Msg.show({
                                                                        title: 'Saved',
                                                                        icon: Ext.Msg.QUESTION,
                                                                        buttons: Ext.MessageBox.YESNO,
                                                                        msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                                        fn: function (btn) {
                                                                            if (btn === 'yes') {
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
                                    }else{
                                        Ext.MessageBox.alert("Payment", "Check No or RefNo Already Exits!");
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
                            CashBankpaymentWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 700,
                height: 70,
                x: 2,
                y: 3,
                border: true,
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 78,
                        width: 450,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [cmbHeadAccount]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 400,
                        x: 0,
                        y: 50,
                        border: false,
                        items: [txtNameuser]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        x: 420,
                        y: 0,
                        border: false,
                        items: [optType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 250,
                        x: 540,
                        y: 30,
                        border: false,
                        items: [cmbVocNo]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 55,
                        width: 185,
                        x: 450,
                        y: 12,
                        border: false,
                        items: [dtpVocDate]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 700,
                height: 90,
                x: 2,
                y: 76,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth:78 ,
                        width: 500,
                        x: 10,
                        y: 20,
                        border: false,
                        items: [cmbAccountName]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 70,
                        x: 320,
                        y: 0,
                        border: false,
                        items: [lblTDS]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 320,
                        y: 20,
                        border: false,
                        items: [txttdstax]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 70,
                        x: 380,
                        y: 0,
                        border: false,
                        items: [lblTDSVAL]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 370,
                        y: 20,
                        border: false,
                        items: [txttdstaxVAL]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 480,
                        y: 0,
                        border: false,
                        items: [lblType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 475,
                        y: 20,
                        border: false,
                        items: [cmbType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 530,
                        y: 0,
                        border: false,
                        items: [lblDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 350,
                        x: 450,
                        y: 20,
                        border: false,
                        items: [txtDebit]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 350,
                        x: 450,
                        y: 50,
                        border: false,
                        items: [txtcharges]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 620,
                        y: 0,
                        border: false,
                        items: [lblCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 615,
                        y: 20,
                        border: false,
                        items: [txtCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 710,
                        y: 20,
                        border: false,
                        items: [btnAdd]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 280,
                        y: 0,
                        border: false,
                        items: [lblCurrency]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 275,
                        y: 20,
                        border: false,
                        items: [cmbCurrency]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 340,
                        y: 0,
                        border: false,
                        items: [lblAmt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 335,
                        y: 20,
                        border: false,
                        items: [txtAmt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 415,
                        y: 0,
                        border: false,
                        items: [lblExRate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 410,
                        y: 20,
                        border: false,
                        items: [txtExRate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 700,
                        y: 160,
                        border: false,
                        items: [btnRemove]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 1000,
                        x: 0,
                        y: 50,
                        border: false,
                        items: [flxTransactionDetails]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 0,
                        y: 160,
                        border: false,
                        items: [txtAmtbalance]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 250,
                        x: 400,
                        y: 160,
                        border: false,
                        items: [lblAmtbal]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 150,
                        x: 400,
                        y: 160,
                        border: false,
                        items: [txtTotDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 150,
                        x: 535,
                        y: 160,
                        border: false,
                        items: [txtTotCredit]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 850,
                height: 850,
                x: 0,
                y: 275,
                border: false,
                items: [flxAdjustDetails]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 680,
                y: 435,
                border: false,
                items: [txtTotNetAmt]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 680,
                y: 460,
                border: false,
                items: [txtPayAmt]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 350,
                x: 0,
                y: 400,
                border: false,
                items: [txtBankName]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 250,
                x: 10,
                y: 200,
                border: false,
                items: [txtmodeNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 250,
                x: 380,
                y: 400,
                border: false,
                items: [cmbPaymode]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 50,
                width: 200,
                x: 265,
                y: 200,
                border: false,
                items: [dtpmodeDate]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 255,
                x: 475,
                y: 200,
                border: false,
                items: [txtRefNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 130,
                width: 150,
                x: 0,
                y: 240,
                border: false,
                items: [lblNarration]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 800,
                height: 200,
                x: 0,
                y: 265,
                border: false,
                items: [txtNarration]
            },
        ]
    });

    function RefreshGridData() {
        txtDebit.setValue("");
        txtCredit.setValue("");
        txtAmt.setValue("");
        txtExRate.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue('Dr');
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbAccountName.setValue("");
    }

    function RefreshData() {
        gstFlag = "Add";
        txtRefNo.setValue("");
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtmodeNo.setValue("");
        txtTotDebit.setValue("");
        txtTotCredit.setValue("");
        cmbVocNo.setValue("");
        RefreshGridData();
        flxTransactionDetails.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        cmbPaymode.setValue('CQ');
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        Ext.getCmp('saveidnew').setVisible(true);
    }


    function CalcSum() {
        var selrows = flxAdjustDetails.getStore().getCount();
        var ginadjtotal = 0;
        var gstbillnos = "";
        txtNarration.setRawValue("");
        txtTotNetAmt.setValue("");
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()) - Number(txtTotCredit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('Adjusted')) > 0) {
                if (rec.get('Type') !== "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('Adjusted'));
                    gstbillnos = gstbillnos + rec.get('InvNo') + "/";
                }
            }
        }
        txtTotNetAmt.setValue(ginadjtotal);
        txtDebit.setValue(ginadjtotal);
        txtNarration.setRawValue("PAYMENT FOR:" + gstbillnos);
    }


    var CashBankpaymentWindow = new Ext.Window({
        width: 720,
        height: 420,
        y: 80,
        items: CashBankpaymentFormPanel,
        bodyStyle: {"background-color": " #2471a3 "},
        title: 'BANK PAYMENT-BANK TO BANK-TRANSFER',
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
                        gstFlag = "Add";
                        PaymentType = "BANK PAYMENTS";
                        var yearproc = gstfinyear.substring(5, 9);
                        if (gstfinyear.substring(5, 9) === '2019') {
                            dtpVocDate.setRawValue(gstfinyear.substring(5, 9) + '-03-' + '31');
                        }
                        HeadAccountNameDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials2A.php',
                            params: {
                                task: 'BankPayAccount',
                                PaymentType: PaymentType,
                                compcode: gstfincompcode
                            }
                        });
                        AccountPartyNameDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials2A.php',
                            params: {
                                task: 'AccountPartyName',
                                compcode: gstfincompcode
                            }
                        });
                        CurrencyDataStore.load({
                            url: '/SHVPM/Financials/clsFinancials2A.php',
                            params: {
                                task: 'cmbCurrency'
                            }
                        });
                        gstPaytype = "AD";
                        cmbCurrency.setRawValue("INR");
                        cmbPaymode.setRawValue("CQ");
                        cmbType.setRawValue("Dr");
                        txtCredit.disable();
                        if (ginfinid < 25 && powerid === 'capitalacc') {
                            CashBankpaymentWindow.show();
                        } else if (ginfinid > 24 && powerid === 'capital') {
                            CashBankpaymentWindow.show();
                        } else if (ginfinid < 25 && powerid === 'capital') {
                            CashBankpaymentWindow.hide();
                        }
                    }
                }
    });
    CashBankpaymentWindow.show();
});


