Ext.onReady(function () {
    Ext.QuickTips.init();
    /*-----------------------Declare Varibles---------------------------------------------------------*/
    var gstFlag;
    var fst_qry;
    var fin_expv_seqno;
    var fin_expv_seqno1;
    var fbl_chk_flag;
    var fxd_group;
    var pst_grpcode;
    var pst_grpcode1;
    var rs_subgroup;
    var gintotDebitval;
    var gintotCreditval;
    var Billval;
    var gintotAdjusval;
    var ledprefix;
    var CurrentBalance;
    var totval;
    var totdr;
    var totcr;
    var Type;
    var Ctype="";
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinuser = localStorage.getItem('accuserid');
    var gstfincompcode = localStorage.getItem('acccompcode');
    var Valuecal;
    var Valuecal1;
    var tot;
    var ginledcode = 0;
    var gintotusd, gintotexg, ginavgexg, ginnetusd, ginnetamt;
    var compcode;
    var dgrecord = Ext.data.Record.create([]);
    var dgrecord1 = Ext.data.Record.create([]);
    var aacname, Currency, accamt, exchrate, dbamt, cramt, accref_narration, ledcode, type, lecode, curcode;
    var cinvo, invdate, totamt, efc, totamtefc, disexch, validateval, disexchtotalamt, cinseqno, Bankrefno;
    var dateon;
    var getdate;
    var ledprebal, flag;
    var fm = Ext.form;
    /*----------------------- END----------------------------------------------------------------------------*/
    /*----------------------- Functions Start---------------------------------------------------------------*/
    function find_subgroup() {
        FindsubgroupDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'Findsubgroup'
            },
            callback: function () {
                rs_subgroup = FindsubgroupDataStore.getCount();
                if (rs_subgroup > 0) {
                    pst_grpcode1 = FindsubgroupDataStore.getAt(0).get('grp_code');
                    pst_grpcode = FindsubgroupDataStore.getAt(0).get('grp_name');
                }
            }
        });
    }

    /*---------------------------------------------------------------------------------------------------------*/
    function billdisc_validate() {
        if (cmbAccountName.getRawValue() == "") {
            Ext.Msg.alert("Alert", " Account Ledger Name Should Not Be Empty ...")
        } else if (cmbCurrency.getRawValue() == "") {
            Ext.Msg.alert("Alert", " Currency Name Should Not Be Empty ....")
        } else if (cmbCurrency.getRawValue() == "INR") {
            if (txtAmt.getValue() <= "0") {
                Ext.Msg.alert("Alert", ".Amount Should Not be Zero.")
            }
        } else if (txtExgRate.getValue() == "") {
            Ext.Msg.alert("Alert", "Exg Rate Should Not be Zero")
        } else if (txtCredit.getValue() == "0" && txtDebit.getValue() == "0") {
            Ext.Msg.alert("Alert", "Credit [Or] Debit Amount Should Be Zero")
        }
    }
    /*---------------------------------------------------------------------------------------------------------*/
    function CalDebitValueTot()
    {
        gintotDebitval = 0;
        gintotCreditval = 0;
        var RowCnt = flxTransactionDetails.getStore().getCount();
        flxTransactionDetails.getSelectionModel().selectAll();
        var sel1 = flxTransactionDetails.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotDebitval = gintotDebitval + parseFloat(sel1[j].data.Debit);
            gintotCreditval = gintotCreditval + parseFloat(sel1[j].data.Credit);
        }
        txtTotDebit.setValue(gintotDebitval);
        txtCreditTotal.setValue(gintotCreditval);
    }
    /*---------------------------------------------------------------------------------------------------------*/
    function CalAdjustTot()
    {
        gintotusd = 0;
        gintotexg = 0;
        ginavgexg = 0;
        ginnetusd = 0;
        ginnetamt = 0;
        var rec;
        var Rowsno = flxAdjustDetails.getStore().getCount();
        flxAdjustDetails.getSelectionModel().selectAll();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        for (var t = 0; t < Rowsno; t++)
        {
            rec = flxAdjustDetails.getStore().getAt(t);
            ginnetusd = Ext.util.Format.number(rec.get("USDAmt") - rec.get("EEFC"), "0.00");
            rec.set("NetAmt", ginnetusd);
            ginnetamt = Ext.util.Format.number(rec.get("NetAmt") * rec.get("ExRate"), "0.000");
            rec.set("Amount", ginnetamt);
            gintotexg = parseFloat(sel[t].data.ExRate);
            gintotusd = gintotusd + parseFloat(sel[t].data.USDAmt);
        }
        ginavgexg = parseFloat(gintotexg / Rowsno);
        txtTotNetAmt.setValue(gintotusd);
        txtTotAmt.setValue(gintotexg);
    }
    /*---------------------------------------------------------------------------------------------------------*/
    function calcrdrvalue() {
        if (txtCreditTotal.getValue() - txtTotDebit.getValue() > 0) {
            totdr = Number(txtCreditTotal.getValue() - txtTotDebit.getValue());
        } else {
            totdr = 0;
        }
        if (txtTotDebit.getValue() - txtCreditTotal.getValue() > 0) {
            totcr = Number(txtTotDebit.getValue() - txtCreditTotal.getValue());
        } else {
            totcr = 0;
        }
        if (txtCreditTotal.getValue() - txtTotDebit.getValue() > 0) {
            totval = Number(txtCreditTotal.getValue() - txtTotDebit.getValue());
        } else {
            if (txtTotDebit.getValue() - txtCreditTotal.getValue() > 0) {
                totval = Number(txtTotDebit.getValue() - txtCreditTotal.getValue());
            }
        }
    }
    /*---------------------------------------------------------------------------------------------------------*/
    function Invoicechk() {
        InvoicechkDataStore.removeAll();
        InvoicechkDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'Invoicechk',
                Type: Type,
                bankcinv_seqno: cmbAccountName.getValue()
            },
            callback: function () {
                var invno = InvoicechkDataStore.getCount();
                if (invno > 0) {

                } else {
                    Ext.Msg.alert("Alert", "Bank Details Not Entered for this Invoice...Contact Export");
                }
            }
        });
    }
    /*----------------------- Functions END---------------------------------------------------------------*/
    /*----------------------- Stores Start-------------------------------------------------------------------*/
    var FindsubgroupDataStore = new Ext.data.Store({
        id: 'FindsubgroupDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Findsubgroup"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'grp_code', 'grp_name'
        ])
    });

    var ExportBillDetailsDateDetailsDataStore = new Ext.data.Store({
        id: 'ExportBillDetailsDateDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ExportBillDetailsDateDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
           'pack_no','bl_date','cinv_premium_days','datenew'
        ])
    });


    var TypeDateStore = new Ext.data.SimpleStore({
        fields: ['Type_code', 'Type_name'],
        data: [['1', 'DR'], ['2', 'CR']]
    });

    var AccountPartyNameDataStore = new Ext.data.Store({
        id: 'AccountPartyNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AccountPartyName"}, // this parameter asks for listing
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

    var HeadAccountNameDataStore = new Ext.data.Store({
        id: 'HeadAccountNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbHeadAccount"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'grp_code', type: 'int', mapping: 'led_code'},
            {name: 'grp_name', type: 'string', mapping: 'led_name'}
        ])
    });

    var CurrencyDataStore = new Ext.data.Store({
        id: 'CurrencyDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbCurrency"}, // this parameter asks for listing
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

    var VocNoDataStore = new Ext.data.Store({
        id: 'VocNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbVocNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_seqno', 'accref_vouno'
        ])
    });

    var AccDetailsDataStore = new Ext.data.Store({
        id: 'AccDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AccDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_voudate', 'acctran_led_code', 'acctran_cur_code', 'accref_narration', 'acctran_cur_amt', 'acctran_exch_rate', 'acctran_dbamt', 'acctran_cramt', ''
        ])
    });

    var AccbankDetailsDataStore = new Ext.data.Store({
        id: 'AccbankDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AccbankDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cinv_no', 'cinv_date', 'cinv_total_invamt', 'cinv_efc', 'bank_discnt_exchrate', 'bank_refno', 'cinv_seqno'
        ])
    });

    var ExportBillDetailsDataStore = new Ext.data.Store({
        id: 'ExportBillDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ExportBillDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno', 'acctrail_inv_no'
        ])
    });

    var AdjustDetails2DataStore = new Ext.data.Store({
        id: 'AdjustDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AdjustDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cinv_efc', 'bank_refno', 'cinv_seqno', 'CinvSeqno', 'CinvEfc'
        ])
    });
    var AdjustDetailsDataStore = new Ext.data.Store({
        id: 'AdjustDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AdjustDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_inv_no', 'acctrail_inv_date', 'acctran_cur_amt', 'cinv_efc', 'bank_refno', 'cinv_seqno', 'accref_seqno'
        ])
    });

    var LedgerDataStore = new Ext.data.Store({
        id: 'LedgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LedgerDetail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_prefix'
        ])
    });

    var CurrentBalDataStore = new Ext.data.Store({
        id: 'CurrentBalDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "CurrentBal"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'curbal_pay_seqno'
        ])
    });

    var BankDetails2DataStore = new Ext.data.Store({
        id: 'BankDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "BankDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'bank_cinv_seqno', 'cinv_date', 'cinv_no'
        ])
    });
    var InvoicechkDataStore = new Ext.data.Store({
        id: 'InvoicechkDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Invoicechk"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'BankCinvSeqno'
        ])
    });

    var BankDetailsDataStore = new Ext.data.Store({
        id: 'BankDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "BankDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'bank_cinv_seqno', 'cinv_date', 'cinv_no'
        ])
    });

    var InvDateDataStore = new Ext.data.Store({
        id: 'InvDateDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvDate"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno'
        ])
    });

    var SeqnoRefDataStore = new Ext.data.Store({
        id: 'SeqnoRefDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "SeqnoRef"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'acctran_dbamt'
        ])
    });


    var BilldiscDataStore = new Ext.data.Store({
        id: 'BilldiscDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Billdisc"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
        ])
    });

    /*----------------------- Stores END-------------------------------------------------------------------*/
    /*----------------------- Design Start-------------------------------------------------------------------*/
    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Head.Account',
        id: 'lblHeadAcnt',
        width: 50
    });

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 350,
        store: HeadAccountNameDataStore,
        displayField: 'grp_name',
        valueField: 'grp_code',
        hiddenName: 'grp_code',
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
                VocNoDataStore.removeAll();
                VocNoDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'cmbVocNo',
                        gincompany: gstfincompcode,
                        ginfinid: ginfinid,
                        acctranled_code: cmbHeadAccount.getValue()
                    },
                    callback: function () {
                        var cnt = VocNoDataStore.getCount();
                        if (cnt == 0 || cnt == "") {
                            LedgerDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2.php',
                                params: {
                                    task: 'LedgerDetail',
                                    ledgercode: cmbHeadAccount.getValue()
                                },
                                callback: function () {
                                    var leddata = LedgerDataStore.getCount();
                                    if (leddata > 0) {
                                        ledprefix = LedgerDataStore.getAt(0).get('led_prefix');
                                        CurrentBalDataStore.load({
                                            url: '/SHVPM/Financials/clsFinancials2.php',
                                            params: {
                                                task: 'CurrentBal',
                                                led_code: cmbHeadAccount.getValue()
                                            },
                                            callback: function () {
                                                var CurrentBal = CurrentBalDataStore.getCount();
                                                if (CurrentBal > 0) {
                                                    CurrentBalance = CurrentBalDataStore.getAt(0).get('curbal_pay_seqno');
                                                    ledprebal = ledprefix + "P" + CurrentBalance;
                                                    Ext.MessageBox.show({
                                                        title: 'Financials',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Saved the details with Voucher Number -: ' + ledprebal,
                                                        fn: function (btn) {
                                                            if (btn == 'yes') {
                                                                flag = "Add";
                                                            } else if (btn == 'no') {
                                                                cmbHeadAccount.focus();
                                                                HeadAccountNameDataStore.load({
                                                                    url: '/SHVPM/Financials/clsFinancials2.php',
                                                                    params: {
                                                                        task: 'cmbHeadAccount',
                                                                        gincompany: gstfincompcode
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    CurrentBalance = cmbVocNo.getRawValue();
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });

            }
        }
    });

    var lblVocherDate = new Ext.form.Label({
        fieldLabel: 'Voc Date',
        id: 'lblVocherDate',
        width: 50
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
        fieldLabel: '',
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

    var lblVocherNo = new Ext.form.Label({
        fieldLabel: 'Voc No', hidden: true,
        id: 'lblVocherNo',
        width: 50
    });

    var cmbVocNo = new Ext.form.ComboBox({
        fieldLabel: '', hidden: true,
        width: 120,
        store: VocNoDataStore,
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
                AccDetailsDataStore.removeAll();
                AccDetailsDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'AccDetails',
                        accrefseqno: this.getValue(),
                        gincompany: gstfincompcode,
                        ginfinid: ginfinid,
                        accledcode: cmbHeadAccount.getValue()
                    },
                    callback: function () {
                        var cnt = AccDetailsDataStore.getCount();
                        if (cnt > 0) {
                            ledcode = AccDetailsDataStore.getAt(0).get('acctran_led_code');
                            cramt = AccDetailsDataStore.getAt(0).get('acctran_cramt');
                            dbamt = AccDetailsDataStore.getAt(0).get('acctran_dbamt');
                            Currency = AccDetailsDataStore.getAt(0).get('acctran_cur_code');
                            for (var i = 0; i < cnt; i++) {
                                if (ledcode !== cmbHeadAccount.getValue()) {
                                    aacname = AccDetailsDataStore.getAt(i).get('acctran_led_code');
                                    Currency = AccDetailsDataStore.getAt(i).get('acctran_cur_code');
                                    if (Currency !== "INR") {
                                        accamt = AccDetailsDataStore.getAt(i).get('acctran_cur_amt');
                                        exchrate = AccDetailsDataStore.getAt(i).get('acctran_exch_rate');
                                    }
                                    if (dbamt > 0) {
                                        dbamt = AccDetailsDataStore.getAt(i).get('acctran_dbamt');
                                        cramt = 0;
                                        type = "Dr";
                                    }
                                    if (cramt > 0) {
                                        dbamt = 0;
                                        cramt = AccDetailsDataStore.getAt(i).get('acctran_cramt');
                                        type = "Cr";
                                    }
                                    accref_narration = AccDetailsDataStore.getAt(i).get('accref_narration');
                                    lecode = AccDetailsDataStore.getAt(i).get('acctran_led_code');
                                    curcode = AccDetailsDataStore.getAt(i).get('acctran_cur_code');
                                    txtNarration.setRawValue(accref_narration);
                                }
                                flxTransactionDetails.getStore().insert(
                                        flxTransactionDetails.getStore().getCount(),
                                        new dgrecord1({
                                            Sno: i + 1,
                                            AccName: aacname,
                                            Currency: Currency,
                                            CurAmt: accamt,
                                            ExRate: exchrate,
                                            Type: type,
                                            Debit: dbamt,
                                            Credit: cramt,
                                            curcode: curcode,
                                            ledcode: lecode
                                        })
                                        );
                                CalDebitValueTot();
                            }
                        } else {
                            AccbankDetailsDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2.php',
                                params: {
                                    task: 'AccbankDetails',
                                    bank_discnt_vouno: this.getValue(),
                                    gincompany: gstfincompcode
                                },
                                callback: function () {
                                    var rs_bank = AccbankDetailsDataStore.getCount();
                                    if (rs_bank > 0) {
                                        for (var i = 0; i < cnt; i++) {
                                            cinvo = AccbankDetailsDataStore.getAt(i).get('cinv_no');
                                            invdate = AccbankDetailsDataStore.getAt(i).get('cinv_date');
                                            totamt = AccbankDetailsDataStore.getAt(i).get('cinv_total_invamt');
                                            efc = AccbankDetailsDataStore.getAt(i).get('cinv_efc');
                                            totamtefc = Number(totamt) - Number(efc);
                                            var disexch1 = AccbankDetailsDataStore.getAt(0).get('bank_discnt_exchrate');
                                            if (disexch1 > 0) {
                                                disexch = AccbankDetailsDataStore.getAt(i).get('bank_discnt_exchrate');
                                                validateval = Number(disexch) * NUmber(totamtefc);
                                            }
                                            disexchtotalamt = Number(disexch + totamt);
                                            var Bankrefno1 = AccbankDetailsDataStore.getAt(0).get('bank_refno');
                                            if (Bankrefno1 > 0) {
                                                Bankrefno = AccbankDetailsDataStore.getAt(i).get('bank_refno');
                                            } else {
                                                Bankrefno = "";
                                            }
                                            cinseqno = AccbankDetailsDataStore.getAt(i).get('cinv_seqno');
                                            flxAdjustDetails.getStore().insert(
                                                    flxAdjustDetails.getStore().getCount(),
                                                    new dgrecord({
                                                        SNo: i + 1,
                                                        InvNo: cinvo,
                                                        Date: invdate,
                                                        USDAmt: totamt,
                                                        EEFC: efc,
                                                        NetAmt: totamtefc,
                                                        ExRate: disexch,
                                                        Amount: disexchtotalamt,
                                                        Bankref: Bankrefno,
                                                        cinvseq: cinseqno
                                                    })
                                                    );
                                        }
                                    }
                                }
                            });
                        }
                    }
                });

            }
        }
    });

    var optTypeDep = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 280,
        height: 80,
        border: false,
        items: [{
                xtype: 'radiogroup',
                columns: 3,
                rows: 1,
                id: 'optTypeDep',
                items: [
                    {boxLabel: 'KGDL', name: 'optTypeDep', inputValue: 1, checked: true,id:'kgdlid',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    Type = "K";
				    Ctype = "K";
                                    compcode = 1;
                                }
                            }
                        }},
                    {boxLabel: 'FABRIC', name: 'optTypeDep', inputValue: 2,id:'fabid',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    Type = "F";
				    Ctype = "F";
                                   // compcode = 4;
					compcode = 1;
                                }
                            }
                        }},
                    {boxLabel: 'MADEUPS', name: 'optTypeDep', inputValue: 3,id:'madeid',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    Type = "M";
				    Ctype = "M";
                                    compcode = 4;
                                }
                            }
                        }}
                ]
            }]
    });

    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Account',
        id: 'lblAccount',
        width: 50
    });

    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 340,
        store: AccountPartyNameDataStore,
        displayField: 'Party_Name',
        valueField: 'Party_code',
        hiddenName: 'Party_Name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency',
        width: 50
    });

    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 60,
        store: CurrencyDataStore,
        displayField: 'Currency_name',
        valueField: 'Currency_code',
        hiddenName: 'Currency_name',
        id: 'cmbCurrency',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmt.disable();
                    txtExgRate.disable();
                } else
                {
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
        store: TypeDateStore,
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
                if (this.getValue() == 1) {
                    txtDebit.enable();
                    txtCredit.disable();
                    txtCredit.setValue("");
                } else if (this.getValue() == 2) {
                    txtDebit.disable();
                    txtCredit.enable();
                    txtDebit.setValue("");
                } else {
                    txtDebit.disable();
                    txtCredit.disable();
                    txtDebit.setValue("");
                    txtCredit.setValue("");
                }
                if (cmbCurrency.getRawValue() != "INR") {
                    if (this.getValue() == 1) {
                        txtDebit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtCredit.setValue("");
                    } else if (this.getValue() == 2) {
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtDebit.setValue("");
                    }
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
        width: 80,
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
        width: 80,
        name: 'Credit',
        disabled: true
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 70,
        listeners: {
            click: function () {
                calcrdrvalue();
                flxTransactionDetails.getSelectionModel().selectAll();
                var selro = flxTransactionDetails.getSelectionModel().getCount();
                var sele = flxTransactionDetails.getSelectionModel().getSelections();
                var cnt = 0;
                var partyledcode;

                for (var t = 0; t < selro; t++) {
                    partyledcode = sele[0].data.lecode;
                    if (sele[t].data.AccName == cmbAccountName.getRawValue())
                    {
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0) {
                    Ext.MessageBox.alert("Financials", "The Selected Ledger Account Already Entered In this Voucher No...");
                } else {
                    if (cmbType.getRawValue() == "DR") {
                        var RowCnt = flxTransactionDetails.getStore().getCount() + 1;
                        flxTransactionDetails.getStore().insert(
                                flxTransactionDetails.getStore().getCount(),
                                new dgrecord({
                                    AccName: cmbAccountName.getRawValue(),
                                    Currency: cmbCurrency.getRawValue(),
                                    CurAmt: Number(txtAmt.getValue()),
                                    ExRate: Number(txtExgRate.getValue()),
                                    Type: cmbType.getRawValue(),
                                    Debit: Number(txtDebit.getValue()),
                                    Credit: '0',
                                    curcode: cmbCurrency.getValue(),
                                    lecode: cmbAccountName.getValue(),
                                    totamt: Number(txtDebit.getValue())
                                })
                                );
                        CalDebitValueTot();
                    }

                    if (cmbType.getRawValue() == "CR") {
                        var RowCnt1 = flxTransactionDetails.getStore().getCount() + 1;
                        flxTransactionDetails.getStore().insert(
                                flxTransactionDetails.getStore().getCount(),
                                new dgrecord({
                                    AccName: cmbAccountName.getRawValue(),
                                    Currency: cmbCurrency.getRawValue(),
                                    CurAmt: Number(txtAmt.getValue()),
                                    ExRate: Number(txtExgRate.getValue()),
                                    Type: cmbType.getRawValue(),
                                    Debit: '0',
                                    Credit: Number(txtCredit.getValue()),
                                    curcode: cmbCurrency.getValue(),
                                    lecode: cmbAccountName.getValue(),
                                    totamt: Number(txtCredit.getValue())
                                })
                                );
                        CalDebitValueTot();
                    }
                }
                if (selro == 0) {
                    partyledcode = cmbAccountName.getValue();
                    cmbPartyName.setValue(partyledcode);
                    ExportBillDetailsDataStore.removeAll();
                    ExportBillDetailsDataStore.load({
                        url: '/SHVPM/Financials/clsFinancials2.php',
                        params: {
                            task: 'ExportBillDetails',
                            acctranled_code: cmbPartyName.getValue(),
                            compcode: compcode
                        }
                    });
                }

            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 70,
        listeners: {
            click: function () {
                var sm = flxTransactionDetails.getSelectionModel();
                var selrow = sm.getSelected();
                flxTransactionDetails.getStore().remove(selrow);
                flxTransactionDetails.getSelectionModel().selectAll();
                var selrows = flxTransactionDetails.getSelectionModel().getCount();
                var sel = flxTransactionDetails.getSelectionModel().getSelections();
                var gintotqty = 0;
                for (var i = 0; i < selrows; i++) {
                    gintotqty = gintotqty + sel[i].data.Debit;
                }
                txtTotDebit.setValue(gintotqty);
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
        }, ['AccName', 'Currency', 'CurAmt', 'ExRate', 'Type', 'Debit', 'Credit', 'lecode', 'curcode', 'totamt'])
    });

    var flxTransactionDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 70,
        width: 920,
        x: 0,
        y: 0,
        columns: [
            {header: "Acc.Name", dataIndex: 'AccName', sortable: true, width: 350, align: 'left'},
            {header: "Currency", dataIndex: 'Currency', sortable: true, width: 60, align: 'left'},
            {header: "Cur.Amount", dataIndex: 'CurAmt', sortable: true, width: 80, align: 'left'},
            {header: "Ex.Rate", dataIndex: 'ExRate', sortable: true, width: 70, align: 'left'},
            {header: "Type", dataIndex: 'Type', sortable: true, width: 60, align: 'left'},
            {header: "Debit", dataIndex: 'Debit', sortable: true, width: 90, align: 'left'},
            {header: "Credit", dataIndex: 'Credit', sortable: true, width: 90, align: 'left'},
            {header: "curcode", dataIndex: 'curcode', sortable: true, width: 10, align: 'left', hidden: true},
            {header: "lecode", dataIndex: 'lecode', sortable: true, width: 10, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left', hidden: false}
        ]
    });

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotDebit',
        width: 90,
        name: 'TotDebit'
    });

    var txtCreditTotal = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCreditTotal',
        width: 90,
        name: 'Total'
    });

    var lblPartyName = new Ext.form.Label({
        fieldLabel: 'Party Name',
        id: 'lblPartyName',
        width: 50
    });

    var cmbPartyName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: AccountPartyNameDataStore,
        displayField: 'Party_Name',
        valueField: 'Party_code',
        hiddenName: 'Party_Name',
        id: 'cmbPartyName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                ExportBillDetailsDataStore.removeAll();
//Ext.MessageBox.alert(compcode, cmbPartyName.getValue());
                ExportBillDetailsDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'ExportBillDetails',
                        acctranled_code: cmbPartyName.getValue(),
                        compcode: compcode
                    }
                });
            }
        }
    });

    var lbldetail = new Ext.form.Label({
        fieldLabel: '',
        id: 'lbldetail',
        width: 300
    });

    var Billno = '';
    var Billnodate='';
    var Billing = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (Billing) {

                var selected_rows = flxBillDetails.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++) {
                    Billno = (selected_rows[i].data.acctrail_accref_seqno);
		    Billnodate = (selected_rows[i].data.acctrail_inv_no);
                }
		ExportBillDetailsDateDetailsDataStore.removeAll();
                ExportBillDetailsDateDetailsDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'ExportBillDetailsDateDetails',
                        accinv: Billnodate,
			flag:Type
                    },
			callback:function(){
				lbldetail.setText("");
				lbldetail.setText("Days : "+"     "+ExportBillDetailsDateDetailsDataStore.getAt(0).get('cinv_premium_days')+"         "+"DueDate : "+ExportBillDetailsDateDetailsDataStore.getAt(0).get('datenew'));

			}
                });
            }
        }
    });

    var lblExportBillNo = new Ext.form.Label({
        fieldLabel: 'Export BillNo',
        id: 'lblExportBillNo',
        width: 50
    });

    var flxBillDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        hideHeaders: true,
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 55,
        width: 120,
        x: 0,
        y: 0,
        selModel: Billing,
        columns: [
            {header: "", dataIndex: 'acctrail_inv_no', sortable: true, width: 100, align: 'left'},
            {header: "", dataIndex: 'acctrail_accref_seqno', sortable: true, width: 110, align: 'left', hidden: true}
        ],
        store: ExportBillDetailsDataStore
    });

    var lblInterestVal = new Ext.form.Label({
        fieldLabel: 'Interest Value',
        id: 'lblInterestVal',
        width: 50
    });

    var txtInterestVal = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtInterestVal',
        width: 80,
        name: 'InterestVal'
    });

    var lblDueDate = new Ext.form.Label({
        fieldLabel: 'Due Date',
        id: 'lblDueDatel',
        width: 50
    });

    var dtpDueDate = new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpDueDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%'
    });

    var btnAdd1 = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 70,
        listeners: {
            click: function () {
                var sel = flxBillDetails.getSelectionModel().getSelections();
                AdjustDetailsDataStore.removeAll();
                Billval = ""
                for (var t = 0; t < sel.length; t++)
                {
                    Billval = Billval + "" + sel[t].data.acctrail_inv_no
                }


                AdjustDetailsDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'AdjustDetails',
                        ledcode: cmbPartyName.getValue(),
                        seqno: Billno,
                        type: Type,
			compcode:compcode
                    },
                    callback: function () {
                        var adjval = AdjustDetailsDataStore.getCount();
//Ext.MessageBox.alert(Type, cmbPartyName.getValue());
                        if (adjval > 0) {
                            var invno = AdjustDetailsDataStore.getAt(0).get('acctrail_inv_no');
                            var invdate1 = AdjustDetailsDataStore.getAt(0).get('acctrail_inv_date');
                            var totamt1 = AdjustDetailsDataStore.getAt(0).get('acctran_cur_amt');
                            var cinvefc = AdjustDetailsDataStore.getAt(0).get('cinv_efc');
                            var cinseqno1 = AdjustDetailsDataStore.getAt(0).get('cinv_seqno');
                            var accrefseqno1 = AdjustDetailsDataStore.getAt(0).get('accref_seqno');
                            var totamtefc1 = Number(totamt1 - cinvefc);
			  //  flxAdjustDetails.getStore().removeAll();
                            flxAdjustDetails.getStore().insert(
                                    flxAdjustDetails.getStore().getCount(),
                                    new dgrecord({
                                        InvNo: invno,
                                        Date: invdate1,
                                        USDAmt: totamt1,
                                        EEFC: cinvefc,
                                        NetAmt: totamtefc1,
                                        ExRate: 0,
                                        Amount: 0,
                                        Bankref:'',
                                        cinvseq: cinseqno1,
                                        accrefseq: accrefseqno1
                                    })
                                    );
                            CalAdjustTot();
			    SeqnoRefDataStore.removeAll();
			    flxAccTranDetails.getStore().removeAll();	
                            SeqnoRefDataStore.load({
                                url: '/SHVPM/Financials/clsFinancials2.php',
                                params: {
                                    task: 'SeqnoRef',
                                    cinvseqno: accrefseqno1
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    var flxAccTranDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        autoShow: true,
        stripeRows: true,
        scrollable: true, hidden: true,
        height: 90,
        width: 220,
        x: 0,
        y: 0,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
            {header: "Seqno", dataIndex: 'acctran_accref_seqno', sortable: true, width: 70, align: 'left'},
            {header: "SlNo", dataIndex: 'acctran_serialno', sortable: true, width: 40, align: 'left'},
            {header: "DebitAmt", dataIndex: 'acctran_dbamt', sortable: true, width: 80, align: 'left'},
            {header: "CreditAmt", dataIndex: 'acctran_cramt', sortable: true, width: 80, align: 'left'}
        ],
        store: SeqnoRefDataStore
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',
        id: 'lblAdjustingDoc',
        width: 50
    });


    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 90,
        width: 920,
        x: 0,
        y: 0,
        columns: [
            {header: "Inv.No", dataIndex: 'InvNo', sortable: true, width: 150, align: 'left'},
            {header: "Date", dataIndex: 'Date', sortable: true, width: 110, align: 'left'},
            {header: "USD.Amount", dataIndex: 'USDAmt', sortable: true, width: 100, align: 'left'},
            {header: "EEFC", dataIndex: 'EEFC', sortable: true, width: 80, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var rec = sm.getSelected();
                            if (Number(this.getRawValue()) > Number(rec.get('USDAmt'))) {
                                Ext.MessageBox.alert("Alert", "EEFC Amount greater than Invoice Amount");
                                this.setValue("");
                            }
			    ginnetusd=0;
			    ginnetamt=0;
			    ginnetusd = Ext.util.Format.number(rec.get("USDAmt") - this.getValue(), "0.00");
			    rec.set("NetAmt", ginnetusd);
			    ginnetamt = Ext.util.Format.number(rec.get("NetAmt") * rec.get("ExRate"), "0.000");
			    rec.set("Amount", ginnetamt);
                        }
                    }
                }
            },
            {header: "Net Amount", dataIndex: 'NetAmt', sortable: true, width: 90, align: 'left'},
            {header: "Ex.Rate", dataIndex: 'ExRate', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var rec = sm.getSelected();
			    ginnetusd=0;
			    ginnetamt=0;
			    ginnetusd = Ext.util.Format.number(rec.get("USDAmt") - rec.get("EEFC"), "0.00");
			    rec.set("NetAmt", ginnetusd);
			    ginnetamt = Ext.util.Format.number(rec.get("NetAmt") * this.getValue(), "0.000");
			    rec.set("Amount", ginnetamt);
                        }
                    }
                }
            },
            {header: "Amount", dataIndex: 'Amount', sortable: true, width: 100, align: 'left'},
            {header: "Bankref", dataIndex: 'Bankref', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }
            },
            {header: "cinvseq", dataIndex: 'cinvseq', sortable: true, width: 100, align: 'left', hidden: true},
            {header: "accrefseq", dataIndex: 'accrefseq', sortable: true, width: 100, align: 'left', hidden: true}
        ],
        store: []
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'Total Net Amt',
        id: 'txtTotNetAmt',readOnly:true,
        width: 150,
        name: 'TotNetAmt'
    });

    var txtTotAmt = new Ext.form.NumberField({
        fieldLabel: 'Total',
        id: 'txtTotAmt',readOnly:true,
        width: 150,
        name: 'TotAmt'
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
        name: 'Narration'
    });


    var BillDiscountEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bill Discount Entry',
        bodyStyle: {"background-color": "#344F8C"},
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
        id: 'BillDiscountEntryFormPanel',
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
                    text: ' Add',
                    style: 'text-align:center;',
                    tooltip: 'Add Details...',
                    height: 40, hidden: true,
                    fontSize: 20,
                    width: 50,
                    align: 'right',
                    icon: '/Pictures/Add.png',
                    listeners: {
                        click: function () {
                            gstFlag = "Add";
                        }
                    }
                }, '-',
                {
                    text: 'Calculate',
                    fontSize: 18,
                    style: 'text-align:center;',
                    tooltip: 'Modify Details...',
                    height: 40,
                    width: 50,
                    icon: '/Pictures/edit.png',
                    listeners: {
                        click: function () {
                            CalAdjustTot();
                        }
                    }
                }, '-',
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
			    CalAdjustTot();
                            var rcnt = flxTransactionDetails.getStore().getCount();
                            var ginrcptamt = 0;
                            var gindbamt = 0;
                            var gincramt = 0;
                            var fromdate;
                            var todate;
                            if (Number(txtTotDebit.getRawValue()) - Number(txtCreditTotal.getRawValue()) > 0) {
                                ginrcptamt = Number(txtTotDebit.getRawValue()) - Number(txtCreditTotal.getRawValue());
                                gindbamt = 0;
                                gincramt = Number(txtTotDebit.getRawValue()) - Number(txtCreditTotal.getRawValue());
                            } else if (Number(txtCreditTotal.getRawValue()) - Number(txtTotDebit.getRawValue()) > 0) {
                                ginrcptamt = Number(txtCreditTotal.getRawValue()) - Number(txtTotDebit.getRawValue());
                                gindbamt = Number(txtCreditTotal.getRawValue()) - Number(txtTotDebit.getRawValue());
                                gincramt = 0;
                            }
                            var exrcnt = 0;
                            var refcnt = 0;
                            flxAdjustDetails.getSelectionModel().selectAll();
                            var selrows = flxAdjustDetails.getSelectionModel().getCount();
                            var sel = flxAdjustDetails.getSelectionModel().getSelections();
                            for (var i = 0; i < selrows; i++) {
                                if (Number(sel[i].data.ExRate) <= 0) {
                                    exrcnt = exrcnt + 1;
                                }
                                if (sel[i].data.Bankref == '') {
                                    refcnt = refcnt + 1;
                                }
                            }

                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);
                            if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (rcnt <= 0) {
                                Ext.MessageBox.alert("Bill Discounting", "Transactions Details Not Avaliable ..");
                            } else if (exrcnt > 0) {
                                Ext.MessageBox.alert("Bill Discounting", "Exchange Rate must not be zero ..");
                            } else if (refcnt > 0) {
                                Ext.MessageBox.alert("Bill Discounting", "Enter Bank Reference No ..");
                            } else if (Number(txtInterestVal.getRawValue()) <= 0) {
                                Ext.MessageBox.alert("Bill Discounting", "Enter valid Interest Value ..");
                            }
                            if (Ext.util.Format.date(dtpDueDate.getValue(), "Y-m-d") < Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Enter valid due date ..");
                            } else {
                                Ext.Msg.show({
                                    title: 'Bill Discounting',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.YESNO,
                                    msg: 'Save This Record?',
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

                                            var acctranData = flxAccTranDetails.getStore().getRange();
                                            var acctranupdData = new Array();
                                            Ext.each(acctranData, function (record) {
                                                acctranupdData.push(record.data);
                                            });
                                            Ext.Ajax.request({
                                                url: '/SHVPM/Financials/CashandBank/TrnBilldiscount/FrmTrnBilldiscountSave.php',
                                                params: {
                                                    griddet: Ext.util.JSON.encode(accupdData),
                                                    gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                    gridtrandet: Ext.util.JSON.encode(acctranupdData),
                                                    finid: ginfinid,
                                                    finyear: gstfinyear,
                                                    compcode: gstfincompcode,
                                                    accrefseq: 0,
                                                    vouno: cmbVocNo.getRawValue(),
                                                    voudate: Ext.util.Format.date(dtpVocDate.getValue(), "Y-m-d"),
                                                    bankname: "",
                                                    narration: txtNarration.getRawValue(),
                                                    paytype: "BP",
                                                    headacct: cmbHeadAccount.getValue(),
                                                    rcptamt: ginrcptamt,
                                                    hdaccdbamt: gindbamt,
                                                    hdacccramt: gincramt,
                                                    intamt: Number(txtInterestVal.getRawValue()),
                                                    duedate: Ext.util.Format.date(dtpDueDate.getValue(), "Y-m-d"),
                                                    comptype: Type,
                                                    flagtype: gstFlag,
                                                    cnt: accData.length,
                                                    adjcnt: accadjData.length,
                                                    trancnt: acctranData.length,
						    comptype:Ctype
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
                    tooltip: 'View Details...', hidden: true,
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {

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
                            BillDiscountEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 70,
                x: 5,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 20,
                        y: 0,
                        border: false,
                        items: [lblHeadAcnt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 380,
                        x: 0,
                        y: 20,
                        border: false,
                        items: [cmbHeadAccount]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 120,
                        x: 365,
                        y: 0,
                        border: false,
                        items: [lblVocherDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 120,
                        x: 360,
                        y: 20,
                        border: false,
                        items: [dtpVocDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 465,
                        y: 0,
                        border: false,
                        items: [lblVocherNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 250,
                        x: 460,
                        y: 20,
                        border: false,
                        items: [cmbVocNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 280,
                        height: 60,
                        x: 610,
                        y: 2,
                        border: true,
                        style: 'padding:0px',
                        layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 0,
                                border: false,
                                items: [optTypeDep]
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 170,
                x: 5,
                y: 80,
                border: true,
                style: 'padding:0px',
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
                        width: 380,
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
                        x: 355,
                        y: 0,
                        border: false,
                        items: [lblCurrency]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 350,
                        y: 20,
                        border: false,
                        items: [cmbCurrency]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 420,
                        y: 0,
                        border: false,
                        items: [lblAmt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 415,
                        y: 20,
                        border: false,
                        items: [txtAmt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 495,
                        y: 0,
                        border: false,
                        items: [lblExgRate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 490,
                        y: 20,
                        border: false,
                        items: [txtExgRate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 560,
                        y: 0,
                        border: false,
                        items: [lblType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 555,
                        y: 20,
                        border: false,
                        items: [cmbType]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 625,
                        y: 0,
                        border: false,
                        items: [lblDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 620,
                        y: 20,
                        border: false,
                        items: [txtDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 710,
                        y: 0,
                        border: false,
                        items: [lblCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 705,
                        y: 20,
                        border: false,
                        items: [txtCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 815,
                        y: 20,
                        border: false,
                        items: [btnAdd]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 815,
                        y: 130,
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
                        labelWidth: 1,
                        width: 150,
                        x: 605,
                        y: 125,
                        border: false,
                        items: [txtTotDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 700,
                        y: 125,
                        border: false,
                        items: [txtCreditTotal]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 150,
                x: 5,
                y: 240,
                border: false,
                items: [lblPartyName]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 350,
                x: 0,
                y: 260,
                border: false,
                items: [cmbPartyName]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 150,
                x: 335,
                y: 240,
                border: false,
                items: [lblExportBillNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 400,
                x: 330,
                y: 257,
                border: false,
                items: [flxBillDetails]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 150,
                x: 780,
                y: 240,
                border: false,
                items: [lblInterestVal]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 500,
                y: 260,
                border: false,
                items: [btnAdd1]
            }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 500,
                        x: 505,
                        y: 290,
                        border: false,
                        items: [lbldetail]
                    },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 780,
                y: 260,
                border: false,
                items: [txtInterestVal]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 150,
                x: 630,
                y: 240,
                border: false,
                items: [lblDueDate]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 120,
                x: 625,
                y: 260,
                border: false,
                items: [dtpDueDate]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 130,
                width: 150,
                x: 10,
                y: 290,
                border: false,
                items: [lblAdjustingDoc]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 1000,
                x: 10,
                y: 315,
                border: false,
                items: [flxAdjustDetails]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 200,
                x: 552,
                y: 415,
                border: false,
                items: [txtTotNetAmt]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 50,
                width: 150,
                x: 750,
                y: 415,
                border: false,
                items: [txtTotAmt]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 130,
                width: 150,
                x: 10,
                y: 415,
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
                y: 435,
                border: false,
                items: [txtNarration]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 400,
                x: 630,
                y: 470,
                border: false,
                items: [flxAccTranDetails]
            }
        ]
    });

    function RefreshData() {
        gstFlag = "Add";
        AccountPartyNameDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'AccountPartyName',
                gincompany: gstfincompcode
            }
        });
        Ext.getCmp('cmbType').bindStore(TypeDateStore);
        CurrencyDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'cmbCurrency'
            },
            callback: function () {
                var cnt = CurrencyDataStore.getCount();
                if (cnt > 0) {
                    cmbCurrency.setRawValue('INR');
                }
            }
        });
        HeadAccountNameDataStore.load({
            url: '/SHVPM/Financials/clsFinancials2.php',
            params: {
                task: 'cmbHeadAccount',
                gincompany: gstfincompcode
            }
        });
        txtAmt.setValue('');
        txtCredit.setValue('');
        txtCreditTotal.setValue('');
        txtDebit.setValue('');
        txtExgRate.setValue('');
        txtInterestVal.setValue('');
        txtNarration.setValue('');
        txtTotAmt.setValue('');
        txtTotDebit.setValue('');
        txtTotNetAmt.setValue('');
        cmbAccountName.setValue('');
        cmbHeadAccount.setValue('');
        cmbPartyName.setValue('');
        cmbVocNo.setValue('');
        cmbType.setRawValue('DR');
        cmbType.setValue(1);
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
                if(compcode==='1'){
		Ext.getCmp('kgdlid').setValue(true);
		Ext.getCmp('fabid').setValue(false);
		Ext.getCmp('madeid').setValue(false);
		Type = "K";
		compcode = 1;
		}else if(compcode==='4'){
		Ext.getCmp('kgdlid').setValue(false);
		Ext.getCmp('fabid').setValue(true);
		Ext.getCmp('madeid').setValue(false);
		Type = "F";
		compcode = 4;
		}
        find_subgroup();
        flxTransactionDetails.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        flxBillDetails.getStore().removeAll();
        flxAccTranDetails.getStore().removeAll();
    }

    var BillDiscountEntryWindow = new Ext.Window({
        width: 925,
        height: 560,
        y: 60,
        items: BillDiscountEntryFormPanel,
        title: 'Bill Discount Entry',
        bodyStyle: {"background-color": "#3399CC"},
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners: {
            show: function () {
			if(gstfinyear.substring(5,9)==='2018'){
			  dtpVocDate.setRawValue('31-'+'03-'+gstfinyear.substring(5,9));
			}
                AccountPartyNameDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'AccountPartyName',
                        gincompany: gstfincompcode
                    }
                });
                Ext.getCmp('cmbType').bindStore(TypeDateStore);
                CurrencyDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'cmbCurrency'
                    },
                    callback: function () {
                        var cnt = CurrencyDataStore.getCount();
                        if (cnt > 0) {
                            cmbCurrency.setRawValue('INR');
                        }
                    }
                });
                if (cmbCurrency.getRawValue() > 0) {
                    cmbCurrency.setValue('INR');
                }
                HeadAccountNameDataStore.load({
                    url: '/SHVPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'cmbHeadAccount',
                        gincompany: gstfincompcode
                    }
                });
                cmbType.setRawValue('DR');
                compcode = localStorage.getItem('acccompcode');
                if(compcode==='1'){
		Ext.getCmp('kgdlid').setValue(true);
		Ext.getCmp('fabid').setValue(false);
		Ext.getCmp('madeid').setValue(false);
		Type = "K";
		compcode = 1;
		}else if(compcode==='4'){
		Ext.getCmp('kgdlid').setValue(false);
		Ext.getCmp('fabid').setValue(true);
		Ext.getCmp('madeid').setValue(false);
		Type = "F";
		compcode = 4;
		}
                find_subgroup();
            }
        }
    });
    BillDiscountEntryWindow.show();
});

