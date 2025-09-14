Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;
    var gsttype = 'P';
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfincompcode = localStorage.getItem('acccompcode');
    var dgadjrecord = Ext.data.Record.create([]);
    var gstfin = '';

    function Password() {
		   if (txtpass.getRawValue() === "pay") {
                        Ext.getCmp('editid').setVisible(true);
                    } else {
                        Ext.getCmp('editid').setVisible(false);
                    }
    }

    var txtpass = new Ext.form.TextField({
        fieldLabel: 'Password',
        id: 'txtpass',
        inputType: 'password',
        width: 100,
        name: 'txtpass',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                Password();
            }
        }
    });

    function InsertBillAdjustmentDetail() {
        flxAdjdocDetail.getStore().removeAll();
        AdjustedBillDetaildatastore.removeAll();
        AdjustedBillDetaildatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "getbilladjbilldet",
                        accrefseq: cmbVouno.getValue(),
                        ledcode: cmbPartyname.getValue()
                    },
            callback: function () {
                var RowCnt = AdjustedBillDetaildatastore.getCount();
                if (AdjustedBillDetaildatastore.getAt(i).get('recpay_amount') == Number(AdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value')) -
                        Number(AdjustedBillDetaildatastore.getAt(i).get('acctrail_adj_value')) +
                        Number(AdjustedBillDetaildatastore.getAt(i).get('recpay_amount'))) {
                    for (var i = 0; i < RowCnt; i++) {
                        var finid = AdjustedBillDetaildatastore.getAt(i).get('accref_finid');
                        if (finid == 16) {
                            gstfin = "2009-2010";
                        } else if (finid == 17) {
                            gstfin = "2010-2011";
                        } else if (finid == 18) {
                            gstfin = "2011-2012";
                        } else if (finid == 19) {
                            gstfin = "2012-2013";
                        } else if (finid == 20) {
                            gstfin = "2013-2014";
                        } else if (finid == 21) {
                            gstfin = "2014-2015";
                        } else if (finid == 22) {
                            gstfin = "2015-2016";
                        } else if (finid == 23) {
                            gstfin = "2016-2017";
                        } else if (finid == 24) {
                            gstfin = "2017-2018";
                        } else if (finid == 25) {
                            gstfin = "2018-2019";
                        } else if (finid == 26) {
                            gstfin = "2019-2020";
                        }else if (finid == 27) {
                        gstfin = "2020-2021";
                    }else if (finid == 28) {
                        gstfin = "2021-2022";
                    }else if (finid == 29) {
                        gstfin = "2022-2023";
                    }else if (finid == 30) {
                        gstfin = "2023-2024";
                    }else if (finid == 31) {
                        gstfin = "2024-2025";
                    }else if (finid == 32) {
                        gstfin = "2025-2026";
                    }
                        flxAdjdocDetail.getStore().insert(
                                flxAdjdocDetail.getStore().getCount(),
                                new dgadjrecord({
                                    invno: AdjustedBillDetaildatastore.getAt(i).get('recpay_ref_no'),
                                    invdate: AdjustedBillDetaildatastore.getAt(i).get('recpay_ref_date'),
                                    invamt: AdjustedBillDetaildatastore.getAt(i).get('acctran_totamt'),
                                    dbcramt: Ext.util.Format.number(AdjustedBillDetaildatastore.getAt(i).get('recpay_dncn_amount'), "0.00"),
                                    pendingamt: Number(AdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(AdjustedBillDetaildatastore.getAt(i).get('acctrail_adj_value')) +
                                            Number(AdjustedBillDetaildatastore.getAt(i).get('recpay_amount')),
                                    adjamt: AdjustedBillDetaildatastore.getAt(i).get('recpay_amount'),
                                    Year: gstfin,
                                    voutype: AdjustedBillDetaildatastore.getAt(i).get('accref_vou_type'),
                                    accrefseqno: AdjustedBillDetaildatastore.getAt(i).get('recpay_oaccref_seqno'),
                                    accrefvouno: AdjustedBillDetaildatastore.getAt(i).get('accref_vouno'),
                                    recpayamt: AdjustedBillDetaildatastore.getAt(i).get('recpay_amount')
                                })
                                );
                    }
                }
                CalcSum();
            }
        });
    }

    function InsertUnAdjustedBillDetail() {
        UnAdjustedBillDetaildatastore.removeAll();
        flxAdjdocDetail.getStore().removeAll();
        UnAdjustedBillDetaildatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "getunadjbilldetpay",
                        compcode: gstfincompcode,
                        ledcode: cmbPartyname.getValue(),
                        voutype: gsttype,
			finid:ginfinid
                    },
            callback: function () {
                var RowCnt = UnAdjustedBillDetaildatastore.getCount();
                for (var i = 0; i < RowCnt; i++) {
                    var finid = UnAdjustedBillDetaildatastore.getAt(i).get('accref_finid');
                    if (finid == 16) {
                        gstfin = "2009-2010";
                    } else if (finid == 17) {
                        gstfin = "2010-2011";
                    } else if (finid == 18) {
                        gstfin = "2011-2012";
                    } else if (finid == 19) {
                        gstfin = "2012-2013";
                    } else if (finid == 20) {
                        gstfin = "2013-2014";
                    } else if (finid == 21) {
                        gstfin = "2014-2015";
                    } else if (finid == 22) {
                        gstfin = "2015-2016";
                    } else if (finid == 23) {
                        gstfin = "2016-2017";
                    } else if (finid == 24) {
                        gstfin = "2017-2018";
                    } else if (finid == 25) {
                        gstfin = "2018-2019";
                    } else if (finid == 26) {
                        gstfin = "2019-2020";
                    }else if (finid == 27) {
                        gstfin = "2020-2021";
                    }else if (finid == 28) {
                        gstfin = "2021-2022";
                    }else if (finid == 29) {
                        gstfin = "2022-2023";
                    }else if (finid == 30) {
                        gstfin = "2023-2024";
                    }else if (finid == 31) {
                        gstfin = "2024-2025";
                    }else if (finid == 32) {
                        gstfin = "2025-2026";
                    }
                    flxAdjdocDetail.getStore().insert(
                            flxAdjdocDetail.getStore().getCount(),
                            new dgadjrecord({
                                invno: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_no'),
                                invdate: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_date'),
                                invamt: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value'),
                                dbcramt: Ext.util.Format.number(UnAdjustedBillDetaildatastore.getAt(i).get('dbcr_invvalue'), "0.00"),
                                totamt: Ext.util.Format.number(Number(UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value')) -
                                        Number(UnAdjustedBillDetaildatastore.getAt(i).get('dbcr_invvalue')), '0.00'),
                                pendingamt: Ext.util.Format.number(UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value') -
                                        Number(UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_adj_value')), '0.00'),
                                voutype: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vou_type'),
                                Year: gstfin,
                                accrefseqno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_seqno'),
                                accrefvouno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vouno')
                            })
                            );
			CalcSumnew();
                }
            }
        });
    }

    function CalcSumnew() {
        var ginpendtotal = 0;
        txtTotalpend.setValue("");
        flxAdjdocDetail.getSelectionModel().selectAll();
        var selrows = flxAdjdocDetail.getSelectionModel().getCount();
        var sel = flxAdjdocDetail.getSelectionModel().getSelections();
        ginpendtotal = 0;
        for (var i = 0; i < selrows; i++) {
            ginpendtotal = ginpendtotal + Number(sel[i].data.pendingamt);
        }
        txtTotalpend.setValue(Ext.util.Format.number(ginpendtotal, '0.00'));
    }

    function CalcSum() {
        var selrows = flxAdjdocDetail.getStore().getCount();
        var ginadjtotal = 0;
        txtTotadjamt.setValue("");
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjdocDetail.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                } else {
                }
            }
        }
        txtTotadjamt.setValue(ginadjtotal);
    }

    function UpdateReceiptBillsAdjusted() {
        var sm = flxAdjdocDetail.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjdocDetail.store.indexOf(selrow);
        var rcnt = flxAdjdocDetail.getStore().getCount();
        txtTotadjamt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjdocDetail.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotadjamt.setValue(Number(txtTotadjamt.getRawValue()) + Number(rec.get('adjamt')));
                } else {
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {

        } else {
            if (Number(txtTotadjamt.getRawValue()) < Number(txtAmount.getRawValue())) {
                if (Number(txtAmount.getRawValue()) - Number(txtTotadjamt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Ext.util.Format.number(Number(txtAmount.getRawValue()) - Number(txtTotadjamt.getRawValue()), '0.00'));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', Ext.util.Format.number(selrow.get('pendingamt') - selrow.get('adjamt'), '0.00'));
                CalcSum();
            }
        }
    }

    var PartynameDatastore = new Ext.data.Store({
        id: 'PartynameDatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbpartynamepayab"}, // this parameter asks for listing
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

    var BillDetailDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'dbcramt', 'totamt', 'pendingamt', 'adjamt', 'voutype', 'balamt',
            'accrefseqno', 'accrefvouno', 'recpayamt'])
    });

    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbadjvoucherpayment"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
            {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
        sortInfo: {field: 'vou_seqno', direction: "DESC"}
    });

    var VoucherNoDetaildatastore = new Ext.data.Store({
        id: 'VoucherNoDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getrevoudetpay"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_name', 'accref_voudate', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt'])
    });

    var VoucherDetaildatastore = new Ext.data.Store({
        id: 'VoucherDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getacctraildetpay"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_voudate', 'accref_narration', 'acctrail_inv_value', 'acctrail_adj_value'])
    });

    var AdjustedBillDetaildatastore = new Ext.data.Store({
        id: 'AdjustedBillDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getbilladjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['recpay_ref_no', 'recpay_ref_date', 'acctran_totamt', 'recpay_dncn_amount', 'acctrail_inv_value', 'accref_finid',
            'acctrail_adj_value', 'recpay_amount', 'accref_vou_type', 'recpay_oaccref_seqno', 'accref_vouno'])
    });

    var UnAdjustedBillDetaildatastore = new Ext.data.Store({
        id: 'UnAdjustedBillDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getunadjbilldetpay"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['acctrail_inv_no', 'acctrail_inv_date', 'dbcr_invvalue', 'acctrail_inv_value', 'accref_finid',
            'acctrail_adj_value', 'accref_vou_type', 'accref_seqno', 'accref_vouno'])
    });

    var cmbPartyname = new Ext.form.ComboBox({
        fieldLabel: 'Party Name',
        width: 320,
        store: PartynameDatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbPartyname',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            select: function () {
                flxDetail.getStore().removeAll();
                flxAdjdocDetail.getStore().removeAll();
                Voucherdatastore.removeAll();
                cmbVouno.setValue('');
                txtAmount.setValue('');
                txtNarration.setValue('');
                Voucherdatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbadjvoucherpayment",
                                partyname: cmbPartyname.getValue(),
                                finid: ginfinid,
                                compcode: gstfincompcode,
                                voutype: gsttype
                            }
                });
                InsertUnAdjustedBillDetail();
            }
        }
    });

    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel: 'Voucher No',
        width: 120,
        store: Voucherdatastore,
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbVouno',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                VoucherDetaildatastore.removeAll();
                flxAdjdocDetail.getStore().removeAll();
                txtAmount.setValue('');
                txtNarration.setValue('');
                VoucherDetaildatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "getacctraildetpay",
                                accrefseq: cmbVouno.getValue(),
                                ledcode: cmbPartyname.getValue()
                            },
                    callback: function () {
                        dtpVoudate.setValue(VoucherDetaildatastore.getAt(0).get('accref_voudate'));
                        var inval = Number(VoucherDetaildatastore.getAt(0).get('acctrail_inv_value'));
                        var adjval = Number(VoucherDetaildatastore.getAt(0).get('acctrail_adj_value'));
                        if (inval == adjval) {
                            txtAmount.setValue(Number(inval));
                        } else {
                            var valuevalidate = 0;
                            valuevalidate = Ext.util.Format.number(inval - adjval, "0.00");
                            txtAmount.setValue(valuevalidate);
                        }
                        txtNarration.setValue(VoucherDetaildatastore.getAt(0).get('accref_narration'));
                        flxDetail.getStore().removeAll();
                        VoucherNoDetaildatastore.removeAll();
                        VoucherNoDetaildatastore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "getrevoudetpay",
                                        accrefseq: cmbVouno.getValue()
                                    }
                        });
                        // InsertBillAdjustmentDetail();
                        InsertUnAdjustedBillDetail();
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

    var txtAmount = new Ext.form.TextField({
        fieldLabel: 'Amount',
        id: 'txtAmount',
        width: 90,
        name: 'amount',
        readOnly: true
    });

    var optType = new Ext.form.RadioGroup({
        title: 'Type',
        columns: 2,
        rows: 1,
        id: 'optType',
        layout: 'hbox', hidden: true,
        width: 175,
        x: 100,
        y: 5,
        defaults: {xtype: "radio", name: "OptPayType"},
        items: [
            {boxLabel: 'Payment', id: 'optPayment', inputValue: 1, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gsttype = "P";
                            RefreshData();
                        }
                    }
                }
            },
            {boxLabel: 'Receipt', id: 'optReceipt', inputValue: 2, hidden: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gsttype = "R";
                            RefreshData();
                        }
                    }
                }
            }
        ]
    });

    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: VoucherNoDetaildatastore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 70,
        width: 500,
        x: 105,
        y: 100,
        columns: [
            {header: "Account Name", dataIndex: 'led_name', sortable: true, width: 300, align: 'left'},
            {header: "Debit", dataIndex: 'acctran_dbamt', sortable: true, width: 90, align: 'left'},
            {header: "Credit", dataIndex: 'acctran_cramt', sortable: true, width: 90, align: 'left'},
            {header: "Ledseqno", dataIndex: 'acctran_led_code', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'acctran_totamt', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var flxAdjdocDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 130,
        width: 660,
        x: 5,
        y: 5,
        columns: [
            {header: "Voucher", dataIndex: 'accrefvouno', sortable: true, width: 80, align: 'left'},
            {header: "Year", dataIndex: 'Year', sortable: true, width: 85, align: 'left'},
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'left'},
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.dbcramt) > 0) {
                        retval = Ext.util.Format.number(Number(record.data.invamt) - Number(record.data.dbcramt), "0.00");
                    } else {
                        retval = Number(record.data.invamt);
                    }
                    return retval;
                }
            },
            {header: "Pending Amt", dataIndex: 'pendingamt', sortable: true, width: 80, align: 'left'},
            {header: "Adjusted", dataIndex: 'adjamt', sortable: true, width: 110, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxAdjdocDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotadjamt.setValue(Number(txtTotadjamt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {
                            CalcSum();
                        },
                        keyup: function () {
                            var sm = flxAdjdocDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
                            pendingamt = Number(selrow.get('pendingamt'));
                            if (Number(this.getRawValue()) > Number(pendingamt)) {
                                Ext.MessageBox.alert("Bill Adjustment", "Adjusted amount cannot be greater than pending amount");
                                this.setValue("");
                                selrow.set('adjamt', "");
                                CalcSum();
                            } else {
                                if (Number(txtTotadjamt.getRawValue()) < Number(txtAmount.getRawValue())) {
                                    if (Number(txtAmount.getRawValue()) - Number(txtTotadjamt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtAmount.getRawValue()) - Number(txtTotadjamt.getRawValue()));
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
            {header: "Balance", dataIndex: 'balamt', sortable: true, width: 90, align: 'left',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.adjamt) > 0) {
                        retval = Ext.util.Format.number(Number(record.data.pendingamt) - Number(record.data.adjamt), "0.00");
                    } else {
                        retval = Number(record.data.pendingamt);
                    }
                    return retval;
                }
            },
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Recpayamt", dataIndex: 'recpayamt', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 500,
        height: 55,
        name: 'narration',
        style: {textTransform: "uppercase"}
    });

    var txtTotadjamt = new Ext.form.TextField({
        fieldLabel: 'Total',
        id: 'txtTotadjamt',
        width: 110, readOnly: true,
        name: 'adjamount'
    });

    var txtTotalpend = new Ext.form.TextField({
        fieldLabel: 'Total Pending',
        id: 'txtTotalpend',
        width: 110, readOnly: true,
        name: 'txtTotalpend'
    });


    var BillAdjustmentEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bill Adjustment Payables',
        header: false,
        width: 438,
        height: 280, bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x: 0,
        y: 0,
        frame: false,
        id: 'BillAdjustmentEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, []),
        tbar: {
            xtype: 'toolbar', bodyStyle: {
                "background-color": "#3399CC"
            },
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Save',id:'editid',hidden:true,
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/save.png',
                    handler: function () {
                        var rcnt = flxAdjdocDetail.getStore().getCount();
                        if (rcnt <= 0) {
                            Ext.MessageBox.alert("Bill Adjustment", "No bills adjusted..");
                        } else if (cmbPartyname.getValue() == 0) {
                            Ext.MessageBox.alert("Bill Adjustment", "Select the Partyname");
                        } else if (cmbVouno.getValue() == 0) {
                            Ext.MessageBox.alert("Bill Adjustment", "Select the Voucher number");
                        } else {
                            Ext.Msg.show({
                                title: 'Bill Adjustment',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Update Bills?',
                                fn: function (btn) {
                                    if (btn == 'yes') {
                                        var accadjData = flxAdjdocDetail.getStore().getRange();
                                        var accadjupdData = new Array();
                                        Ext.each(accadjData, function (record) {
                                            accadjupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: '/SHVPM/Financials/Payables/TrnBilladjustmentpay/FrmTrnBilladjustmentpaySave.php',
                                            params: {
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                finid: ginfinid,
                                                compcode: gstfincompcode,
                                                accrefseq: cmbVouno.getValue(),
                                                accvoudate: dtpVoudate.getValue(),
                                                narration: txtNarration.getRawValue(),
                                                partyacct: cmbPartyname.getValue(),
                                                vouno: cmbVouno.getRawValue(),
                                                totadjamt: Number(txtTotadjamt.getValue()),
                                                flagtype: gstFlag,
                                                adjcnt: accadjData.length
                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] == "true") {
                                                    window.location.reload();
                                                    Ext.Msg.show({
                                                        title: 'Bill Adjustment Pay',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Bills adjusted successfully',
                                                        fn: function (btn) {
                                                            if (btn == 'yes') {
                                                                window.location.reload();
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    Ext.Msg.show({
                                                        title: 'Failed',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Bills not adjusted -',
                                                        fn: function (btn) {
                                                            if (btn === 'yes') {
                                                                window.location.reload();
                                                            } else {
                                                                window.location.reload();
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
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            BillAdjustmentEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 680,
                height: 250,
                x: 2,
                y: 2,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 90,
		                width       : 250,
		                x           : 0,
		                y           : 0,
		                border      : false,
		                items: [txtpass]
		            },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 440,
                        x: 0,
                        y: 30,
                        border: false,
                        items: [cmbPartyname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 240,
                        x: 0,
                        y: 60,
                        border: false,
                        items: [cmbVouno]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 430,
                        y: 60,
                        labelWidth: 60,
                        border: false,
                        items: [dtpVoudate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 78,
                        width: 210,
                        x: 240,
                        y: 60,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAmount]
                    }, optType, flxDetail,
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 88,
                        width: 650,
                        x: 0,
                        y: 170,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtNarration]
                    },
                ]
            },
            {xtype: 'fieldset',
                title: '',
                width: 680,
                height: 170,
                x: 2,
                y: 250,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [flxAdjdocDetail,
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 38,
                        width: 350,
                        x: 500,
                        y: 130,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotadjamt]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 85,
                        width: 350,
                        x: 270,
                        y: 130,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTotalpend]
                    }
                ]
            }
        ]
    });


    function RefreshData() {
        gstFlag = "Add";
        cmbPartyname.setValue('');
        cmbVouno.setValue('');
        txtNarration.setValue('');
        dtpVoudate.setValue(new Date());
        txtAmount.setValue('');
        txtTotadjamt.setValue('');
        PartynameDatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "cmbpartynamepayab",
                        compcode: gstfincompcode
                    }
        });
        flxDetail.getStore().removeAll();
        flxAdjdocDetail.getStore().removeAll();
    }

    var BillAdjustmentEntryWindow = new Ext.Window({
        height: 490,
        width: 700,
        y: 55,
        title: 'Bill Adjustment Entry-PAYABLES',
        items: BillAdjustmentEntryFormPanel,
        layout: 'fit', bodyStyle: {
            "background-color": "#3399CC"
        },
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
                        gsttype = 'P';
                        if (gstfinyear.substring(5, 9) === '2018') {
                            dtpVoudate.setRawValue('31-' + '03-' + gstfinyear.substring(5, 9));
                        }
                        PartynameDatastore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbpartynamepayab",
                                        compcode: gstfincompcode
                                    }
                        });
                    }
                }
    });
    BillAdjustmentEntryWindow.show();
});



