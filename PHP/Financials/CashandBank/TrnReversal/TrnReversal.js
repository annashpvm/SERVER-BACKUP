Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;
    var gsttype = 'P';
/*
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfincompcode = localStorage.getItem('acccompcode');

*/
    var gstfincompcode = localStorage.getItem('gincompcode');
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');

   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');

    var voupoint;

    var gintotal;

    function calculatevalue() {
        txtInvValue.setRawValue('');
        flxAdjdocDetail.getSelectionModel().selectAll();
        var selrows = flxAdjdocDetail.getSelectionModel().getCount();
        var sel = flxAdjdocDetail.getSelectionModel().getSelections();
        gintotal = 0;
        for (var i = 0; i < selrows; i++) {
            gintotal = gintotal + Number(sel[i].data.adjamt);
        }
        txtInvValue.setValue(Ext.util.Format.number(gintotal, '0.00'));
    }

    var FinyearDatastore = new Ext.data.Store({
        id: 'FinyearDatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbfinyear"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'fin_code', type: 'int', mapping: 'fin_code'},
            {name: 'fin_year', type: 'string', mapping: 'fin_year'}
        ]),
        sortInfo: {field: 'fin_code', direction: "DESC"}
    });

    var PartynameDatastore = new Ext.data.Store({
        id: 'PartynameDatastore',
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

    var HeadAccountdatastore = new Ext.data.Store({
        id: 'HeadAccountdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
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

    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbreversevoucher"}, // this parameter asks for listing
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
        baseParams: {task: "getrevoudet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_name', 'accref_voudate', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt'])
    });
    var VoucherNoDetailDatedatastore = new Ext.data.Store({
        id: 'VoucherNoDetailDatedatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "VoucherNoDetailDate"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_voudate1'])
    });

    var AdjustedBillDetaildatastore = new Ext.data.Store({
        id: 'AdjustedBillDetaildatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['recpay_ref_no', 'recpay_ref_date', 'acctran_cramt', 'recpay_amount', 'accref_vou_type', 'accref_seqno', 'Voucher', 'voudate'])
    });

    var cmbFinyear = new Ext.form.ComboBox({
        fieldLabel: 'FinYear',
        width: 120,
        store: FinyearDatastore,
        displayField: 'fin_year',
        valueField: 'fin_code',
        hiddenName: 'fin_year',
        id: 'cmbFinyear',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: false,
        allowblank: false,
        listeners: {
            select: function () {
                cmbVouno.setRawValue('');
                txtNarration.setValue('');
                flxDetail.getStore().removeAll();
                VoucherNoDetaildatastore.removeAll();
                VoucherNoDetailDatedatastore.removeAll();
                flxAdjdocDetail.getStore().removeAll();
		cmbHeadacctname.setRawValue('');
		cmbPartyname.setRawValue('');
            }
        }
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
                cmbVouno.setRawValue('');
                flxDetail.getStore().removeAll();
                txtNarration.setValue('');
                VoucherNoDetaildatastore.removeAll();
                VoucherNoDetailDatedatastore.removeAll();
                flxAdjdocDetail.getStore().removeAll();
		cmbHeadacctname.setRawValue('');
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
                flxDetail.getStore().removeAll();
                VoucherNoDetaildatastore.removeAll();
                VoucherNoDetailDatedatastore.removeAll();
                txtNarration.setValue('');
                flxAdjdocDetail.getStore().removeAll();
                VoucherNoDetaildatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "getrevoudet",
                                accrefseq: cmbVouno.getValue()
                            }
                });
                VoucherNoDetailDatedatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "VoucherNoDetailDate",
                                accrefseq: cmbVouno.getValue()
                            },
                    callback: function () {
                        dtpVoudate.setRawValue(VoucherNoDetailDatedatastore.getAt(0).get('accref_voudate1'));
                    }
                });
                InsertBillAdjustmentDetail();
            }
        }
    });

    var cmbHeadacctname = new Ext.form.ComboBox({
        fieldLabel: 'Head Account',
        width: 320,
        store: HeadAccountdatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbHeadacctname',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            select: function () {
                Voucherdatastore.removeAll();
                cmbVouno.setValue('');
                txtNarration.setValue('');
                flxAdjdocDetail.getStore().removeAll();
                Voucherdatastore.load({
                    url: '/SHVPM/Financials/clsFinancials.php',
                    params:
                            {
                                task: "cmbreversevoucher",
                                acctname: cmbHeadacctname.getValue(),
                                partyname: cmbPartyname.getValue(),
                                finid: cmbFinyear.getValue(),
                                voutype: gsttype
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

    var optType = new Ext.form.RadioGroup({
        title: '',
        columns: 1,
        rows: 2,
        id: 'optType',
        layout: 'vbox',
        width: 185,
        x: 440,
        y: 40,
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
            {boxLabel: 'Receipt', id: 'optReceipt', inputValue: 2,
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
        height: 82,
        width: 515,
        x: 5,
        y: 130,
        columns: [
            {header: "Account Name", dataIndex: 'led_name', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'acctran_dbamt', sortable: true, width: 80, align: 'left'},
            {header: "Credit", dataIndex: 'acctran_cramt', sortable: true, width: 80, align: 'left'},
            {header: "Ledseqno", dataIndex: 'acctran_led_code', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'acctran_totamt', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var BillDetailDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'adjamt', 'balamt', 'voutype', 'accrefseqno', 'Voucher', 'voudate'])
    });

    var dgadjrecord = Ext.data.Record.create([]);
    var flxAdjdocDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 115,
        width: 515,
        x: 5,
        y: 5,
        columns: [
            {header: "Voucher", dataIndex: 'Voucher', sortable: true, width: 60, align: 'left'},
            {header: "Date", dataIndex: 'voudate', sortable: true, width: 90, align: 'left'},
            {header: "Invoice Amt", dataIndex: 'invamt', sortable: true, width: 90, align: 'left'},
            {header: "Adjusted", dataIndex: 'adjamt', sortable: true, width: 90, align: 'left'},
            {header: "Balance", dataIndex: 'balamt', sortable: true, width: 80, align: 'left'},
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 100, align: 'left'},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 90, align: 'left', hidden: true}
        ]
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 450,
        height: 35,
        name: 'narration',
        style: {textTransform: "uppercase"}
    });

    var txtInvValue = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted Value',
        id: 'txtInvValue',
        width: 100,
        name: 'InvValue',
        readOnly: true
    });

    var ReversalEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Reversal Entry',
        header: false,
        width: 438,
        height: 280,
        x: 0,
        y: 0,
        bodyStyle: {"background-color": "#344F8C"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        frame: false,
        id: 'ReversalEntryFormPanel',
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
                    text: 'Edit', hidden: true,
                    fontSize: 18,
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
                    handler: function () {
                        var adjcnt = flxAdjdocDetail.getStore().getCount();
                        if (adjcnt > 0) {
                            Ext.Msg.show({
                                title: 'Reversal Entry',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Reverse This Entry?',
                                fn: function (btn) {
                                    if (btn === 'yes') {

                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        var accadjData = flxAdjdocDetail.getStore().getRange();
                                        var accadjupdData = new Array();
                                        Ext.each(accadjData, function (record) {
                                            accadjupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
//                                            url: '/SHVPM/Financials/CashandBank/TrnReversal/FrmTrnReversalSave.php',
                                            url: 'FrmTrnReversalSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: cmbVouno.getValue(),
                                                vouno: cmbVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(), "Y-m-d"),
                                                bankname: "",
                                                refno: cmbVouno.getRawValue(),
                                                narration: txtNarration.getRawValue(),
                                                paytype: gsttype,
                                                paymode: "",
                                                payno: "",
                                                headacct: cmbHeadacctname.getValue(),
                                                partyacct: cmbPartyname.getValue(),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                adjcnt: accadjData.length,
                                                entrypoint : voupoint,
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
                                                            if (btn == 'yes') {
                                                                window.location.reload();
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }
                                                    });
                                                } else {
//						    window.location.reload();
                                                    Ext.MessageBox.alert("Alert", "Record not saved - " + obj['vouno']);					
                                                }
                                            }
                                        });
                                    }else{
 				//window.location.reload();
				  }
                                }
                            });
                        } else {
                            Ext.MessageBox.alert("Alert", "Invoice Details Not Found!");
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
                    text: 'View',
                    style: 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/view.png', hidden: true,
                    //fp.getForm().reset();
                    listeners: {
                        click: function () {

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
                            ReversalEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 525,
                height: 220,
                x: 2,
                y: 2,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 240,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [cmbFinyear]
                    },
                    {
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
                        width: 440,
                        x: 0,
                        y: 60,
                        border: false,
                        items: [cmbHeadacctname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 240,
                        x: 0,
                        y: 90,
                        border: false,
                        items: [cmbVouno]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 245,
                        y: 90,
                        labelWidth: 60,
                        border: false,
                        items: [dtpVoudate]
                    }, optType, flxDetail
                ]
            },
            {xtype: 'fieldset',
                title: '',
                width: 525,
                height: 150,
                x: 2,
                y: 220,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [flxAdjdocDetail, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 550,
                        x: 110,
                        y: 115,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvValue]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 60,
                width: 550,
                x: 0,
                y: 365,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
            }
        ]
    });


    function RefreshData() {
        gstFlag = "Add";
        cmbFinyear.setValue('');
        cmbHeadacctname.setValue('');
        cmbPartyname.setValue('');
        cmbVouno.setValue('');
        txtNarration.setValue('');
        dtpVoudate.setValue(new Date());
        flxDetail.getStore().removeAll();
        flxAdjdocDetail.getStore().removeAll();
    }

    function InsertBillAdjustmentDetail() {
        flxAdjdocDetail.getStore().removeAll();
        AdjustedBillDetaildatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
                    {
                        task: "getadjbilldet",
                        accrefseq: cmbVouno.getValue(),
                        partyname: cmbPartyname.getValue(),
                        voutype: gsttype
                    },
            callback: function () {
                var RowCnt = AdjustedBillDetaildatastore.getCount();
                for (var i = 0; i < RowCnt; i++) {
                    flxAdjdocDetail.getStore().insert(
                            flxAdjdocDetail.getStore().getCount(),
                            new dgadjrecord({
                                voudate: AdjustedBillDetaildatastore.getAt(i).get('voudate'),
                                Voucher: AdjustedBillDetaildatastore.getAt(i).get('Voucher'),
                                invno: AdjustedBillDetaildatastore.getAt(i).get('recpay_ref_no'),
                                invdate: AdjustedBillDetaildatastore.getAt(i).get('recpay_ref_date'),
                                invamt: AdjustedBillDetaildatastore.getAt(i).get('acctran_cramt'),
                                adjamt: AdjustedBillDetaildatastore.getAt(i).get('recpay_amount'),
                                balamt: Ext.util.Format.number(Number(AdjustedBillDetaildatastore.getAt(i).get('acctran_cramt') -
                                        Number(AdjustedBillDetaildatastore.getAt(i).get('recpay_amount'))), '0.00'),
                                voutype: AdjustedBillDetaildatastore.getAt(i).get('accref_vou_type'),
                                accrefseqno: AdjustedBillDetaildatastore.getAt(i).get('accref_seqno')
                            })
                            );
                }
                calculatevalue();
            }
        });
    }
    ;

    var ReversalEntryWindow = new Ext.Window({
        height: 490,
        width: 545,
        y: 62,
        title: 'Reversal Entry',
        items: ReversalEntryFormPanel,
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

               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }
                        gstFlag = "Add";
                        FinyearDatastore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbfinyear"
                                    }
                        });

                        PartynameDatastore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbacctname",
                                        compcode: gstfincompcode
                                    }
                        });

                        HeadAccountdatastore.load({
                            url: '/SHVPM/Financials/clsFinancials.php',
                            params:
                                    {
                                        task: "cmbbankacct",
                                        compcode: gstfincompcode
                                    }
                        });
                    }
                }
    });
    ReversalEntryWindow.show();
});

