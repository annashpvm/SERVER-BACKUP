Ext.onReady(function () {
    Ext.QuickTips.init();
    var dgrecord = Ext.data.Record.create([]);
    var compcode = localStorage.getItem('gincompcode');
    var GinFinid = localStorage.getItem('ginfinid');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');


    var seqno = 0;
    var gindbtotal;
    var gincrtotal;
    var fm = Ext.form;
    var lednewcode;
    var led;

    function RefreshData() {
        flxRef.getStore().removeAll();
        flxTrail.getStore().removeAll();
        flxTran.getStore().removeAll();
        flxRefbills.getStore().removeAll();
        flxRefbills2.getStore().removeAll();
        btnTranAdd.hide();
        btnTrailAdd.hide();
    }

    var LedAgsDataStore = new Ext.data.Store({
        id: 'LedAgsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LedAgs"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cust_code',
            'cust_name'
        ])
    });

    var LedgerDataStore = new Ext.data.Store({
        id: 'LedgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LedgerNewEdit"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cust_code',
            'cust_name'
        ])
    });

    var TrailBills2DataStore = new Ext.data.Store({
        id: 'TrailBills2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/class.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TrailBills2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'refpurchaseno',
            'refamount',
            'refpartyinvdate'
        ])
    });

    var TrailBillsDataStore = new Ext.data.Store({
        id: 'TrailBillsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/class.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TrailBills"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'refpurchaseno',
            'refamount',
            'refpartyinvdate'
        ])
    });

    var TranDataStore = new Ext.data.Store({
        id: 'TranDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/class.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Tran"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctran_accref_seqno',
            'acctran_serialno',
            'acctran_led_code',
            'acctran_dbamt', 'cust_name',
            'acctran_cramt',
            'acctran_totamt',
            'acctran_cur_code',
            'acctran_cur_amt',
            'acctran_exch_rate',
            'acctran_pass_no',
            'acctran_paytype',
            'cust_type','acctran_narration'
        ])
    });

    var ApprovecheckDataStore = new Ext.data.Store({
        id: 'ApprovecheckDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Approvecheck"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'cnt'
        ])
    });

    var TrailDataStore = new Ext.data.Store({
        id: 'TrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/class.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Trail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno',
            'acctrail_serialno',
            'acctrail_inv_no',
            'acctrail_inv_date1',
            'acctrail_inv_value',
            'acctrail_adj_value',
            'acctrail_led_code', 'cust_name','acctrail_amtmode','acctrail_crdays','acctrail_gracedays'
        ])
    });

    var VouNoDataStore = new Ext.data.Store({
        id: 'VouNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/class.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "VouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_seqno',
            'accref_vouno',
            'accref_comp_code',
            'accref_finid',
            'accref_voudate1',
            'accref_vou_type',
            'accref_bank_name',
            'accref_paymode',
            'accref_payref_no',
            'accref_payref_date1',
            'accref_narration',
            'accref_chq_status',
            'accref_reverse_status'
        ])
    });

    function calculatedbvalue() {
        flxTran.getSelectionModel().selectAll();
        var selrows = flxTran.getSelectionModel().getCount();
        var sel = flxTran.getSelectionModel().getSelections();
        gindbtotal = 0;
        gincrtotal = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.acctran_dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.acctran_cramt);
        }
        txtValueDebit.setValue(Ext.util.Format.number(gindbtotal, "0.00"));
        txtValueCredit.setValue(Ext.util.Format.number(gincrtotal, "0.00"));
    }

    var txtValueDebit = new Ext.form.TextField({
        fieldLabel: 'Debit',
        id: 'txtValueDebit',
        hidden: true,
        width: 150, readOnly: true,
        name: 'txtValueDebit'
    });

    var txtValueCredit = new Ext.form.TextField({
        fieldLabel: 'Credit',
        id: 'txtValueCredit', hidden: true,
        width: 150, readOnly: true,
        name: 'txtValueCredit'
    });

    var txtpass = new Ext.form.TextField({
        fieldLabel: 'Password',
        id: 'txtpass', inputType: 'password',
        width: 150,
        name: 'txtpass',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
              if (txtpass.getRawValue() === "correction") {
                    flxTran.show();
                    flxRef.show();
                    flxTrail.show();
                    flxRefbills.show();
                    flxRefbills2.show();
                    txtVocherNo.show();
                    txtValueDebit.show();
                    txtValueCredit.show();
                    txtpass.hide();
                    txtValueDebit.setRawValue('');
                    txtValueCredit.setRawValue('');
                    txtVocherNo.setRawValue();
                    txtVocherNo.focus();
                } else {
                    flxTran.hide();
                    flxRef.hide();
                    flxTrail.hide();
                    flxRefbills.hide();
                    flxRefbills2.hide();
                    txtVocherNo.hide();
                    txtValueDebit.hide();
                    txtValueCredit.hide();
                    txtpass.show();
                }
            }
        }
    });

    var btnTranAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Tran",
        width: 60,
        x: 630,
        y: 420,
        listeners: {
            click: function () {


                var rcnt = flxTran.getStore().getCount();
                if (rcnt > 0) {
                    Ext.Ajax.request({
                        url: 'Traninsert.php',
                        params:
                                {
                                    accseqno: seqno

                                },
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Row Inserted in TRANS-");
                  }else
			{
                    Ext.MessageBox.alert("Not Inserted ");                                                  
                    }
                }
                    });
                } else {
                    Ext.MessageBox.alert("Alert", "Not Found..!");
                }
            }
        }
    });


    var btnTrailAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Trail",
        width: 60,
        x: 630,
        y: 420,
        listeners: {
            click: function () {
                var rcnt = flxTrail.getStore().getCount();
                if (rcnt > 0) {
                    EntryFormPanel.getForm().submit({
                        url: 'Trailinsert.php',
                        params:
                                {
                                    accseqno: seqno
                                },
                        success: function ()
                        {
                            Ext.MessageBox.show({
                                title: 'Success!',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Inserted Tran Table...',
                                fn: function (btn) {
                                    if (btn == 'yes') {
                                        load();
                                    } else {
                                        load();
                                    }
                                }
                            });
                        },
                        failure: function ()
                        {
                            Ext.MessageBox.alert("Alert", "Not Inserted..!");
                        }
                    });
                } else {
                    Ext.MessageBox.alert("Alert", "Not Found..!");
                }
            }
        }
    });

    function load() {
        flxRef.getStore().removeAll();
        flxTrail.getStore().removeAll();
        flxTran.getStore().removeAll();
        flxRefbills.getStore().removeAll();
        flxRefbills2.getStore().removeAll();
        VouNoDataStore.removeAll();
        TrailDataStore.removeAll();
        TranDataStore.removeAll();
        txtValueDebit.setValue("");
        txtValueCredit.setValue("");
        TrailBillsDataStore.removeAll();
        TrailBills2DataStore.removeAll();
        VouNoDataStore.load({
            url: '/SHVPM/Accounts/class.php',
            params: {
                task: 'VouNo',
                comp: compcode,
                finid: GinFinid,
                vouno: txtVocherNo.getRawValue()
            }, callback: function () {
                var cnt = VouNoDataStore.getCount();
//alert(cnt);
                if (cnt > 0) {
                    seqno = VouNoDataStore.getAt(0).get('accref_seqno');
                    Ext.getCmp('approved').setText(seqno);
                    ApprovecheckDataStore.removeAll();
                    ApprovecheckDataStore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params: {
                            task: 'Approvecheck',
                            seqaccref: seqno
                        },
                        callback: function () {
                            var cnt = ApprovecheckDataStore.getAt(0).get('cnt');
                            if (cnt > 0) {
                                Ext.getCmp('approved').setText('Approval OK!');
                            } else {
                                Ext.getCmp('approved').setText('Approval NOT OK!');
                            }
                        }
                    });
                    for (var i = 0; i < cnt; i++) {
                        if (VouNoDataStore.getAt(i).get('accref_comp_code') == 90) {
                            var compcodenew = "TEST-COMPANY";
                        } else if (VouNoDataStore.getAt(i).get('accref_comp_code') == 1) {
                            compcodenew = "SRI HARI VENKATESWARA PAPER MILLS (P) LTD";
                        } 
                        if (VouNoDataStore.getAt(i).get('accref_finid') == 23) {
                            finyear = "2023-2024";
                        } else if (VouNoDataStore.getAt(i).get('accref_finid') == 24) {
                            finyear = "2024-2025";
                        } else if (VouNoDataStore.getAt(i).get('accref_finid') == 25) {
                            finyear = "2025-2026";

                        }

                        flxRef.getStore().insert(
                                flxRef.getStore().getCount(),
                                new dgrecord({
                                    Ref: "AccRef",
                                    accref_seqno: VouNoDataStore.getAt(i).get('accref_seqno'),
                                    accref_vouno: VouNoDataStore.getAt(i).get('accref_vouno'),
                                    accref_comp_code: compcodenew,
                                    accref_finid: finyear,
                                    accref_voudate: VouNoDataStore.getAt(i).get('accref_voudate1'),
                                    accref_bank_name: VouNoDataStore.getAt(i).get('accref_bank_name'),
                                    accref_paymode: VouNoDataStore.getAt(i).get('accref_paymode'),
                                    accref_payref_no: VouNoDataStore.getAt(i).get('accref_payref_no'),
                                    accref_vou_type: VouNoDataStore.getAt(i).get('accref_vou_type'),
                                    accref_payref_date: VouNoDataStore.getAt(i).get('accref_payref_date1'),
                                    accref_narration: VouNoDataStore.getAt(i).get('accref_narration'),
                                    accref_chq_status: VouNoDataStore.getAt(i).get('accref_chq_status'),
                                    accref_reverse_status: VouNoDataStore.getAt(i).get('accref_reverse_status')
                                }));
                    }
                    Ext.getCmp('title').setText('');
                    TrailDataStore.load({
                        url: '/SHVPM/Accounts/class.php',
                        params: {
                            task: 'Trail',
                            seqno: seqno,
                            compcode: compcode
                        },
                        callback: function () {
                            var cnt = TrailDataStore.getCount();
                          //  if (cnt > 0) {
                                for (var i = 0; i < cnt; i++) {
                                    if (TrailDataStore.getAt(i).get('acctrail_adj_value') > 0) {
                                        Ext.getCmp('title').setText('Voucher Already Make Adjust!');
                                    }
                                    flxTrail.getStore().insert(
                                            flxTrail.getStore().getCount(),
                                            new dgrecord({
                                                Trail: "AccTrail",
                                                acctrail_accref_seqno: TrailDataStore.getAt(i).get('acctrail_accref_seqno'),
                                                acctrail_serialno: TrailDataStore.getAt(i).get('acctrail_serialno'),
                                                acctrail_inv_no: TrailDataStore.getAt(i).get('acctrail_inv_no'),
                                                acctrail_inv_date: TrailDataStore.getAt(i).get('acctrail_inv_date1'),
                                                acctrail_inv_value: TrailDataStore.getAt(i).get('acctrail_inv_value'),
                                                acctrail_adj_value: TrailDataStore.getAt(i).get('acctrail_adj_value'),
                                                acctrail_led_code: TrailDataStore.getAt(i).get('acctrail_led_code'),
                                                led_name: TrailDataStore.getAt(i).get('cust_name'),
                                                acctrail_amtmode: TrailDataStore.getAt(i).get('acctrail_amtmode'),
                                                acctrail_crdays: TrailDataStore.getAt(i).get('acctrail_crdays'),
                                                acctrail_gracedays: TrailDataStore.getAt(i).get('acctrail_gracedays'),
                                            }));
                                }
                                TranDataStore.load({
                                    url: '/SHVPM/Accounts/class.php',
                                    params: {
                                        task: 'Tran',
                                        seqno: seqno,
                                        compcode: compcode
                                    },
                                    callback: function () {
                                        var cnt = TranDataStore.getCount();
                                        if (cnt > 0) {
                                            for (var i = 0; i < cnt; i++) {
                                                flxTran.getStore().insert(
                                                        flxTran.getStore().getCount(),
                                                        new dgrecord({
                                                            Tran: "AccTran",
                                                            acctran_accref_seqno: TranDataStore.getAt(i).get('acctran_accref_seqno'),
                                                            acctran_serialno: TranDataStore.getAt(i).get('acctran_serialno'),
                                                            acctran_led_code: TranDataStore.getAt(i).get('acctran_led_code'),
                                                            old_led_code: TranDataStore.getAt(i).get('acctran_led_code'),
                                                            led_name: TranDataStore.getAt(i).get('cust_name'),
                                                            acctran_dbamt: TranDataStore.getAt(i).get('acctran_dbamt'),
                                                            acctran_cramt: TranDataStore.getAt(i).get('acctran_cramt'),
                                                            acctran_totamt: TranDataStore.getAt(i).get('acctran_totamt'),
                                                            acctran_cur_code: TranDataStore.getAt(i).get('acctran_cur_code'),
                                                            acctran_cur_amt: TranDataStore.getAt(i).get('acctran_cur_amt'),
                                                            acctran_exch_rate: TranDataStore.getAt(i).get('acctran_exch_rate'),
                                                            acctran_pass_no: TranDataStore.getAt(i).get('acctran_pass_no'),
                                                            acctran_paytype: TranDataStore.getAt(i).get('acctran_paytype'),
                                                            ledtype : TranDataStore.getAt(i).get('cust_type'),
                                                            acctran_narration : TranDataStore.getAt(i).get('acctran_narration')


                                                        }));
                                                            acctran_narration : TranDataStore.getAt(i).get('acctran_narration')

                                                calculatedbvalue();
                                            }
                                            TrailBillsDataStore.load({
                                                url: '/SHVPM/Accounts/class.php',
                                                params: {
                                                    task: 'TrailBills',
                                                    seq: seqno
                                                }
                                            });
                                            TrailBills2DataStore.load({
                                                url: '/SHVPM/Accounts/class.php',
                                                params: {
                                                    task: 'TrailBills2',
                                                    seq: seqno
                                                }
                                            });
                                        } else {
                                            //Ext.Msg.alert("Alert","Not Found");
                                            flxRef.getStore().removeAll();
                                            flxTrail.getStore().removeAll();
                                            flxTran.getStore().removeAll();
                                            VouNoDataStore.removeAll();
                                            TrailDataStore.removeAll();
                                            TranDataStore.removeAll();
                                        }
                                    }
                                });
                            /*} else {
                                //Ext.Msg.alert("Alert","Not Found");
                                flxRef.getStore().removeAll();
                                flxTrail.getStore().removeAll();
                                flxTran.getStore().removeAll();
                                VouNoDataStore.removeAll();
                                TrailDataStore.removeAll();
                                TranDataStore.removeAll();
                            }*/
                        }
                    });
                } else {
                    // Ext.Msg.alert("Alert","Not Found");
                    flxRef.getStore().removeAll();
                    flxTrail.getStore().removeAll();
                    flxTran.getStore().removeAll();
                    VouNoDataStore.removeAll();
                    TrailDataStore.removeAll();
                    TranDataStore.removeAll();
                }
            }
        });
    }

    var txtVocherNo = new Ext.form.TextField({
        fieldLabel: 'VoucherNo.',
        id: 'txtVocherNo',
        width: 150, hidden: true,
        name: 'VocherNo', enableKeyEvents: true,
        listeners: {
            blur: function () {
                load();
            },
            change: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var flxRef = new Ext.grid.EditorGridPanel({
        frame: true,
        fieldLabel: '',
        id: 'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true, hidden: true,
        scrollable: true,
        height: 100,
        width: 1450,
        x: 0,
        y: 45,
        columns: [
            {header: "Table", dataIndex: 'Ref', sortable: true, width: 80, align: 'left'},
            {header: "Seqno", dataIndex: 'accref_seqno', sortable: true, width: 100, align: 'center'},
            {header: "VouNo", dataIndex: 'accref_vouno', sortable: true, width: 140, align: 'left'},
            {header: "VouDate", dataIndex: 'accref_voudate', sortable: true, width: 120, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }
            },
            {header: "Company", dataIndex: 'accref_comp_code', sortable: true, width: 100, align: 'left',hidden:true},
            {header: "Finyear", dataIndex: 'accref_finid', sortable: true, width: 100, align: 'left'},

            {header: "Narration", dataIndex: 'accref_narration', sortable: true, width: 500, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }
            },
            {header: "BankName", dataIndex: 'accref_bank_name', sortable: true, width: 100, align: 'left'},
            {header: "Paymode", dataIndex: 'accref_paymode', sortable: true, width: 100, align: 'left'},
            {header: "RefNo", dataIndex: 'accref_payref_no', sortable: true, width: 100, align: 'left'},
            {header: "VouType", dataIndex: 'accref_vou_type', sortable: true, width: 100, align: 'left'},
            {header: "Ref Date", dataIndex: 'accref_payref_date1', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "Check Status", dataIndex: 'accref_chq_status', sortable: true, width: 100, align: 'left'},
            {header: "Reverse Status", dataIndex: 'accref_reverse_status', sortable: true, width: 100, align: 'left'}
        ],
        store: []
    });


    var flxTran = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '', hidden: true,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true, id: 'my-grid2',
        stripeRows: true,
        scrollable: true,
        height: 190,
        width: 1450,
        x: 0,
        y: 160,
        columns: [
            {header: "Table", dataIndex: 'Tran', sortable: true, width: 80, align: 'left', hidden : true},
            {header: "Seqno", dataIndex: 'acctran_accref_seqno', sortable: true, width: 100, align: 'left', hidden : true},
            {header: "Sno", dataIndex: 'acctran_serialno', sortable: true, width: 50, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "Ledcode", dataIndex: 'old_led_code', sortable: true, width: 60, align: 'left', hidden : true},
            {header: "Ledcode", dataIndex: 'acctran_led_code', sortable: true, width: 60, align: 'left', hidden : true},
            {header: "LedName", dataIndex: 'led_name', sortable: true, width: 400, align: 'left',
                editor: new fm.ComboBox({
                    allowBlank: false,
                    store: 'LedgerDataStore',
                    displayField: 'cust_name',
                    valueField: 'cust_name',
                    hiddenName: 'cust_name',
                    id: 'cmbledger',
                    typeAhead: true,
                    mode: 'local',
                    forceSelection: false,
                    triggerAction: 'all',
                    selectOnFocus: false,
                    editable: true,
                    allowblank: false,
                    listeners: {
                        keyup: function () {
                            led = this.getRawValue();
                            LedgerDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
                                params: {
                                    task: 'LedgerNewEdit',
                                    compcode: compcode,
                                    ledname: this.getRawValue() + '%'
                                }
                            });
                        }, select: function () {
                            led = this.getRawValue();
                            
                            LedAgsDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
                                params: {
                                    task: 'LedAgs',
                                    ledname: led,
                                    compcode: compcode
                                },
                                callback: function () {
                                    lednewcode = LedAgsDataStore.getAt(0).get('cust_code');
                                    var selected_rows = flxTran.getSelectionModel().getSelections();
                                    for (var i = 0; i < selected_rows.length; i++)
                                    {
                                        selected_rows[i].set('acctran_led_code', lednewcode);
                                    }
                                }
                            });
                        }
                    }
                })},
            {header: "Debit", dataIndex: 'acctran_dbamt', sortable: true, width: 100, align: 'right',
/*
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxTran.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxTran.getSelectionModel().getSelections();
                            var acctran_cramt = Number(selrow.get('acctran_cramt'));
                            var toot = Ext.util.Format.number(Number(this.getValue()) + Number(acctran_cramt), '0.00');
                            for (var a = 0; a < selected_rows.length; a++)
                            {
                                selected_rows[a].set('acctran_totamt', toot);
                            }
                        }
                    }
                }
*/
            },
            {header: "Credit", dataIndex: 'acctran_cramt', sortable: true, width: 100, align: 'right',
/*
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxTran.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxTran.getSelectionModel().getSelections();
                            var acctran_dbamt = Number(selrow.get('acctran_dbamt'));
                            var toot = Ext.util.Format.number(Number(this.getValue()) + Number(acctran_dbamt), '0.00');
                            for (var a = 0; a < selected_rows.length; a++)
                            {
                                selected_rows[a].set('acctran_totamt', toot);
                            }
                        }
                    }
                }
*/
            },

            {header: "TotAmt", dataIndex: 'acctran_totamt', sortable: true, width: 100, align: 'right'},
/*
            {header: "CurCode", dataIndex: 'acctran_cur_code', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "Cur Amt", dataIndex: 'acctran_cur_amt', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "Exch Date", dataIndex: 'acctran_exch_rate', sortable: true, width: 80, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }
            },
            {header: "PassNo", dataIndex: 'acctran_pass_no', sortable: true, width: 100, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
*/
            {header: "PayType", dataIndex: 'acctran_paytype', sortable: true, width: 80, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }, hidden : true},
            {header: "LedType", dataIndex: 'ledtype', sortable: true, width: 80, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                } , hidden : true},
               {header: "Narration", dataIndex: 'acctran_narration', sortable: true, width: 300, align: 'left',

                editor: {
                    xtype: 'textfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxTran.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxTran.getSelectionModel().getSelections();

                        }
                    }
                }
},   

        ],
        store: []
    });

    var flxTrail = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true, id: 'my-grid3',
        stripeRows: true,
        scrollable: true, hidden: true,
        height: 100,
        width: 1450,
        x: 0,
        y: 380,
        columns: [
            {header: "Table", dataIndex: 'Trail', sortable: true, width: 80, align: 'left',
                renderer: function (value, meta, record) {
                    var iss = record.get('acctrail_adj_value');
                    if (parseInt(iss) > 0) {
                        meta.style = "background-color:RED;";
                    } else {
                        meta.style = "background-color:yellow;";
                    }
                    return value;
                }},
            {header: "Seqno", dataIndex: 'acctrail_accref_seqno', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "S.No", dataIndex: 'acctrail_serialno', sortable: true, width: 50, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "LedName", dataIndex: 'led_name', sortable: true, width: 200, align: 'left',
                editor: new fm.ComboBox({
                    allowBlank: false,
                    store: 'LedgerDataStore',
                    displayField: 'cust_name',
                    valueField: 'cust_name',
                    hiddenName: 'cust_name',
                    id: 'cmbledgernew',
                    typeAhead: true,
                    mode: 'local',
                    forceSelection: false,
                    triggerAction: 'all',
                    selectOnFocus: false,
                    editable: true,
                    allowblank: false,
                    listeners: {
                        keyup: function () {
                            led = this.getRawValue();
                            LedgerDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
                                params: {
                                    task: 'LedgerNewEdit',
                                    compcode: compcode,
                                    ledname: this.getRawValue() + '%'
                                }
                            });
                        }, select: function () {
                            led = this.getRawValue();
                            LedAgsDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
                                params: {
                                    task: 'LedAgs',
                                    ledname: led,
                                    compcode: compcode
                                },
                                callback: function () {
                                    lednewcode = LedAgsDataStore.getAt(0).get('cust_code');
                                    var selected_rows = flxTrail.getSelectionModel().getSelections();
                                    for (var i = 0; i < selected_rows.length; i++)
                                    {
                                        selected_rows[i].set('acctrail_led_code', lednewcode);
                                    }
                                }
                            });
                        }
                    }
                })},
            {header: "InvNo", dataIndex: 'acctrail_inv_no', sortable: true, width: 130, align: 'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "InvDate", dataIndex: 'acctrail_inv_date', sortable: true, width: 120, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "InvValue", dataIndex: 'acctrail_inv_value', sortable: true, width: 100, align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "AdjuseVal", dataIndex: 'acctrail_adj_value', sortable: true, width: 100, align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }, },
            {header: "Ledcode", dataIndex: 'acctrail_led_code', sortable: true, width: 80, align: 'left'},
            {header: "DR/CR", dataIndex: 'acctrail_amtmode', sortable: true, width: 70, align: 'left'},
            {header: "Payment Terms", dataIndex: 'acctrail_crdays', sortable: true, width: 120, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxTrail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxTrail.getSelectionModel().getSelections();
                            for (var a = 0; a < selected_rows.length; a++)
                            {
                                selected_rows[a].set('acctrail_crdays', this.getValue());
                            }
                        }
                    }
                }
            },
            {header: "GRACE DAYS", dataIndex: 'acctrail_gracedays', sortable: true, width: 90, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var sm = flxTrail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxTrail.getSelectionModel().getSelections();
                            for (var a = 0; a < selected_rows.length; a++)
                            {
                                selected_rows[a].set('acctrail_gracedays', this.getValue());
                            }
                        }
                    }
                }
            },
        ],
        store: []
    });


    var flxRefbills = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        id: 'my-grid4', hidden: true,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 200,
        width: 500,
        x: 0,
        y: 410,
        columns: [
            {header: "Bills", dataIndex: 'refpurchaseno', sortable: true, width: 150, align: 'left'},
            {header: "Amount", dataIndex: 'refamount', sortable: true, width: 150, align: 'left'},
            {header: "Inv Date", dataIndex: 'refpartyinvdate', sortable: true, width: 150, align: 'left'}
        ],
        store: TrailBillsDataStore
    });

    var flxRefbills2 = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '', hidden: true,
        id: 'my-grid5',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 200,
        width: 500,
        x: 560,
        y: 410,
        columns: [
            {header: "Bills", dataIndex: 'refpurchaseno', sortable: true, width: 150, align: 'left'},
            {header: "Amount", dataIndex: 'refamount', sortable: true, width: 150, align: 'left'},
            {header: "Inv Date", dataIndex: 'refpartyinvdate', sortable: true, width: 150, align: 'left'}
        ],
        store: TrailBills2DataStore
    });


    var cmbApprove = new Ext.form.ComboBox({
        fieldLabel: 'Approve By',
        width: 150,
        store: ['MANAGER'],
        displayField: 'approve',
        valueField: 'approve',
        hiddenName: 'approve',
        id: 'cmbApprove',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"}
    });



    var cmbRequest = new Ext.form.ComboBox({
        fieldLabel: 'Request By',
        width: 150,
        store: ['MANAGER'],
        displayField: 'Request',
        valueField: 'Request',
        hiddenName: 'Request',
        id: 'cmbRequest',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"}
    });


    var EntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Accounts',
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
        id: 'EntryFormPanel',
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
                    text: 'Update',
                    style: 'text-align:center;',
                    tooltip: 'Update Details...',
                    height: 40, style: 'background-color: yellow;',
                            fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {


                        click: function () {


			  if(cmbApprove.getRawValue()===""){
 						 alert('Select Approval');
			 }else if(cmbRequest.getRawValue()===""){
 						alert('Select Request');

			 }  else{



                            if (txtpass.getRawValue() == "correction") {
                                Ext.getCmp('approved').setText(seqno);

                                ApprovecheckDataStore.removeAll();
                                ApprovecheckDataStore.load({
                                    url: '/SHVPM/Accounts/clsAccounts.php',
                                    params: {
                                        task: 'Approvecheck',
//                                        seqaccref: seqno
                                        seqaccref: 28671

                                    },
                                    callback: function () {
                                        var cnt = ApprovecheckDataStore.getAt(0).get('cnt');
                              
                                        if (cnt >= 0) {


                                            Ext.getCmp('approved').setText('Approval OK!');
                                            var trancnt = flxTran.getStore().getCount();
                                            var refcnt = flxRef.getStore().getCount();
                                            var trailcnt = flxTrail.getStore().getCount();
//                                            if (trancnt > 0 && refcnt > 0 && trailcnt > 0) {
                                            if (trancnt > 0 && refcnt > 0) {

                                                var refData = flxRef.getStore().getRange();
                                                var refData1 = new Array();
                                                Ext.each(refData, function (record) {
                                                    refData1.push(record.data);
                                                });
                                                var tranData = flxTran.getStore().getRange();
                                                var tranData1 = new Array();
                                                Ext.each(tranData, function (record) {
                                                    tranData1.push(record.data);
                                                });
                                                var trailData = flxTrail.getStore().getRange();
                                                var trailData1 = new Array();
                                                Ext.each(trailData, function (record) {
                                                    trailData1.push(record.data);
                                                });
                                                	
                                                Ext.Ajax.request({
                                                    url: '/SHVPM/Accounts/EditAccounts/EditSave.php',
                                                    params: {
                                                        ref: Ext.util.JSON.encode(refData1),
                                                        tran: Ext.util.JSON.encode(tranData1),
                                                        trail: Ext.util.JSON.encode(trailData1),
                                                        accref_comp_code: compcode,
                                                        accref_finid: GinFinid,
                                                        pass: txtpass.getRawValue(),
                                                        accref_seqno: seqno,
                                                        Approve: cmbApprove.getRawValue(),
                                                        Request: cmbRequest.getRawValue(),
                                                        refcnt: refData.length,
                                                        trancnt: tranData.length,
                                                        trailcnt: trailData.length,
                                                        usercode : GinUserid, 
                                                        vouno    :txtVocherNo.getRawValue(),

                                                    },
                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] == "true") {
                                                            Ext.MessageBox.show({
                                                                title: 'Accounts Update Alert',
                                                                icon: Ext.Msg.QUESTION,
                                                                buttons: Ext.MessageBox.YESNO,
                                                                msg: 'Updated Vocher No :-' + obj['msg'],
                                                                fn: function (btn) {
                                                                    if (btn == 'yes') {
                                                                        RefreshData();
                                                                        txtValueDebit.setRawValue('');
                                                                        txtValueCredit.setRawValue('');
                                                                        load();
                                                                    } else {
                                                                        RefreshData();
                                                                        txtValueDebit.setRawValue('');
                                                                        txtValueCredit.setRawValue('');
                                                                        load();
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            Ext.MessageBox.show({
                                                                title: 'Failed!',
                                                                icon: Ext.Msg.QUESTION,
                                                                buttons: Ext.MessageBox.YESNO,
                                                                msg: 'Contact MIS!' + obj['msg'],
                                                                fn: function (btn) {
                                                                    if (btn == 'yes') {
                                                                    } else {
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }

                                        } else {
                                            Ext.getCmp('approved').setText('Approval NOT OK!');
                                        }

                                    }

                                });
                            } 
/*
               else if (txtpass.getRawValue() === "mishari") {
       

                     	
                                var trancnt = flxTran.getStore().getCount();
                                var refcnt = flxRef.getStore().getCount();
                                var trailcnt = flxTrail.getStore().getCount();


                                if (trancnt > 0 && refcnt > 0 ) {



                                    var refData = flxRef.getStore().getRange();
                                    var refData1 = new Array();
                                    Ext.each(refData, function (record) {
                                        refData1.push(record.data);
                                    });
                                    var tranData = flxTran.getStore().getRange();
                                    var tranData1 = new Array();
                                    Ext.each(tranData, function (record) {
                                        tranData1.push(record.data);
                                    });



                                    var trailData = flxTrail.getStore().getRange();
                                    var trailData1 = new Array();
                                    Ext.each(trailData, function (record) {
                                        trailData1.push(record.data);
                                    });
                                    
                                    Ext.Ajax.request({
                                        url: '/SHVPM/Accounts/EditAccounts/EditSave.php',
                                        params: {
                                            ref: Ext.util.JSON.encode(refData1),
                                            tran: Ext.util.JSON.encode(tranData1),
                                            trail: Ext.util.JSON.encode(trailData1),
                                            accref_comp_code: compcode,
                                            accref_finid: GinFinid,
                                            pass: txtpass.getRawValue(),
                                            accref_seqno: seqno,
                                            Approve: cmbApprove.getRawValue(),
                                            Request: cmbRequest.getRawValue(),
                                            refcnt: refData.length,
                                            trancnt: tranData.length,
                                            trailcnt: trailData.length
                                        },
                                        callback: function (options, success, response)
                                        {
                                            var obj = Ext.decode(response.responseText);
                                            if (obj['success'] == "true") {
                                                Ext.MessageBox.show({
                                                    title: 'Accounts Update Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.YESNO,
                                                    msg: 'Updated Vocher No :-' + obj['msg'],
                                                    fn: function (btn) {
                                                        if (btn == 'yes') {
                                                            RefreshData();
                                                            txtValueDebit.setRawValue('');
                                                            txtValueCredit.setRawValue('');
                                                            load();
                                                        } else {
                                                            RefreshData();
                                                            txtValueDebit.setRawValue('');
                                                            txtValueCredit.setRawValue('');
                                                            load();
                                                        }
                                                    }
                                                });
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Failed!',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.YESNO,
                                                    msg: 'Contact MIS!' + obj['msg'],
                                                    fn: function (btn) {
                                                        if (btn == 'yes') {
                                                        } else {
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
				 }
                                }
*/


                            }
                        }
                    }
                }, '-',

/*
                {
                    text: 'Insert',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30, style: 'background-color: white;',
                            width: 70,
                    listeners: {
                        click: function () {

//alert("Hai");

                            btnTranAdd.show();
                            btnTrailAdd.show();
                        }
                    }
                }, '-',

                {
                    text: 'Delete',
                    style: 'text-align:center;',
                    height: 40, style: 'background-color: yellow;',
                            fontSize: 30,
                    width: 70,
                    listeners: {
                        click: function () {
                            Ext.getCmp('deltran').setVisible(true);
                            Ext.getCmp('deltrail').setVisible(true);
                        }
                    }
                }, '-',
                {
                    text: 'Delete Tran',
                    style: 'text-align:center;',
                    height: 40, hidden: true, style: 'background-color: white;',
                            fontSize: 30, id: 'deltran',
                    width: 70,
                    listeners: {
                        click: function () {
                            var sm = flxTran.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxTran.getStore().remove(selrow);
                        }
                    }
                }, '-',
                {
                    text: 'Delete Trail',
                    style: 'text-align:center;',
                    height: 40, id: 'deltrail', style: 'background-color: yellow;',
                            fontSize: 30, hidden: true,
                    width: 70,
                    listeners: {
                        click: function () {
                            var sm = flxTrail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxTrail.getStore().remove(selrow);
                        }
                    }
                }, '-',
*/
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30, style: 'background-color: white;',
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
                    tooltip: 'Close...', style: 'background-color: orange;',
                            height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            EntryWindow.hide();
                        }
                    }
                },

                {   
                    text: '',
                    style: 'text-align:center;', style: 'background-color: pink;',
                            height: 40, id: 'title',
                    fontSize: 30,
                    width: 70
                }, {
                    text: '',
                    style: 'text-align:center;', style: 'background-color: yellow;',
                            height: 40, id: 'approved',
                    fontSize: 30,
                    width: 70
                }

               ]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 1800,
                height: 80,
                x: 0,
                y: 0,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 500,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [txtpass]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 500,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [txtVocherNo]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 500,
                        x: 230,
                        y: 0,
                        border: false,
                        items: [txtValueDebit]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 500,
                        x: 430,
                        y: 0,
                        border: false,
                        items: [txtValueCredit]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 500,
                        x: 640,
                        y: 0,
                        border: false,
                        items: [cmbApprove]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 500,
                        x: 900,
                        y: 0,
                        border: false,
                        items: [cmbRequest]
                    },
/*
                  {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 500,
                        x: 1150,
                        y: 0,
                        border: false,
                        items: [btnTranAdd]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 500,
                        x: 1210,
                        y: 0,
                        border: false,
                        items: [btnTrailAdd]
                    }
*/
                ]
            }, //flxRef,
 flxTran, 
//flxTrail,
 // flxRefbills, flxRefbills2,
        ]
    });

    var EntryWindow = new Ext.Window({
        width: 1300,
        height: 650,
        y: 23,
//        maximized: true,
        items: EntryFormPanel,
        bodyStyle: {
            "background-color": "#3399CC"
        },
        title: 'Edit Accounts',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners: {
            show: function () {
            
                RefreshData();
                
            }
        }
    });
    EntryWindow.show();
});








