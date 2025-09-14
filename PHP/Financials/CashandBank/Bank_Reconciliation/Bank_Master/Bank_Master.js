/*Developed by : SASIKALA.T Jan 2019
 * ROLL NO : 7055
 * This form is used to create a Bank Master
 */

/* global Ext, Datagridd */
Ext.onReady(function () {
    Ext.QuickTips.init();
    // var loginid = localStorage.getItem("tempuserid");
    var loginid = 7055;
    var cstatus = 'Y';
    var dgrecord = Ext.data.Record.create([]);
    var actiontype;
    function save()
    {
        actiontype = 'Add';
        Ext.MessageBox.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do u want to save',
            fn: function (btn) {
                if (btn === 'yes') {

                    var Datanew1 = lstcompany.getSelectionModel().getSelections();
                    //   var Datanew1 = lstcompany.getStore().getRange();
                    var Dataupd1 = new Array();
                    Ext.each(Datanew1, function (record) {
                        Dataupd1.push(record.data);
                    });
                    // var Datanew2 = lstledgercode.getStore().getRange();
                    var Datanew2 = lstledgercode.getSelectionModel().getSelections();
                    var Dataupd2 = new Array();
                    Ext.each(Datanew2, function (record) {
                        Dataupd2.push(record.data);
                    });
                    FormPanel.getForm().submit({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/Bank_Master/Bank_Master_Save.php',
                        method: 'POST',
                        //Ext.Ajax.request({
                        //     url: '/DPM/Financials/Bank_Master/Bank_Master_Save.php',
                        params: {
                            companydetails: Ext.util.JSON.encode(Dataupd1),
                            companycnt: Datanew1.length,
                            ledgerdetails: Ext.util.JSON.encode(Dataupd2),
                            ledgercnt: Datanew2.length,
                            action: actiontype,
                            bank: txtbank.getRawValue(),
                            branch: txtbranch.getRawValue(),
                            accno: txtaccno.getRawValue(),
                            yearr: year.getRawValue(),
                            monthh: month.getValue(),
                            bankclosingbal: txtbankclosingbalance.getRawValue(),
                            kgdlclosingbal: txtkgdlclosingbalance.getRawValue(),
                            status: 'Y',
                            userid: loginid
                        },
                        success: function () {
                            Ext.MessageBox.alert("Alert", "Added");
                            lstledgercode.getStore().removeAll();
                            lstcompany.getStore().removeAll();
                            FormPanel.getForm().reset();
                            load();

                        },
                        failure: function () {
                            Ext.MessageBox.alert("Alert", "Failed");

                        }
                        /*  callback: function (options, success, response)
                         {
                         var obj = Ext.decode(response.responseText);
                         if (obj['success'] === "true") {
                         Ext.Msg.alert("Alert", "Added");
                         FormPanel.getForm().reset();
                         lstledgercode.getStore().removeAll();
                         lstcompany.getStore().removeAll();
                         //   Gridview.getStore().removeAll();
                         //   Gridview.getStore().sync();
                         
                         //  showdisable();
                         } else {
                         Ext.Msg.alert("Alert", "Failed");
                         }
                         }
                         
                         */
                    });
                    /*
                     FormPanel.getForm().submit({
                     url: '/DPM/Financials/Bank_Master/Bank_Master_Save.php',
                     method: 'POST',
                     params:
                     {
                     action: actiontype,
                     bank: txtbank.getRawValue(),
                     branch: txtbranch.getRawValue(),
                     accno: txtaccno.getRawValue(),
                     yearr: year.getRawValue(),
                     monthh: month.getValue(),
                     bankclosingbal: txtbankclosingbalance.getRawValue(),
                     kgdlclosingbal: txtkgdlclosingbalance.getRawValue(),
                     division: compcodee,
                     ledger: ledcodee,
                     status: 'Y',
                     userid: loginid
                     },
                     success: function () {
                     Ext.MessageBox.alert("Alert", "Added Sucessfully");
                     lstledgercode.getStore().removeAll();
                     lstcompany.getStore().removeAll();
                     FormPanel.getForm().reset();
                     
                     },
                     failure: function () {
                     Ext.MessageBox.alert("Alert", "Failed");
                     
                     }
                     });
                     */
                }
            }
        });
    }


    function updatenew() {
        actiontype = 'Edit';
        Ext.MessageBox.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do u want to edit ',
            fn: function (btn) {
                if (btn === 'yes') {
                    //  lstcompanytwo.getSelectionModel().getSelections();
                    var Datanew1 = lstcompanytwo.getSelectionModel().getSelections();
                    // var Datanew1 = lstcompanytwo.getStore().getRange();
                    var Dataupd1 = new Array();
                    Ext.each(Datanew1, function (record) {
                        Dataupd1.push(record.data);
                    });
                    var Datanew2 = lstledgercodetwo.getSelectionModel().getSelections();
                    // var Datanew2 = lstledgercodetwo.getStore().getRange();
                    var Dataupd2 = new Array();
                    Ext.each(Datanew2, function (record) {
                        Dataupd2.push(record.data);
                    });
                    FormPanel.getForm().submit({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/Bank_Master/Bank_Master_Save.php',
                        method: 'POST',
                        //  Ext.Ajax.request({
                        //     url: '/DPM/Financials/Bank_Master/Bank_Master_Save.php',
                        params: {
                            companydetails: Ext.util.JSON.encode(Dataupd1),
                            companycnt: Datanew1.length,
                            ledgerdetails: Ext.util.JSON.encode(Dataupd2),
                            ledgercnt: Datanew2.length,
                            action: actiontype,
                            idd: txtid.getRawValue(),
                            bank: txtbank.getRawValue(),
                            branch: txtbranch.getRawValue(),
                            accno: txtaccno.getRawValue(),
                            yearr: year.getRawValue(),
                            monthh: ason_month,
                            bankclosingbal: txtbankclosingbalance.getRawValue(),
                            kgdlclosingbal: txtkgdlclosingbalance.getRawValue(),
                            status: 'Y',
                            userid: loginid
                        },
                        success: function () {
                            Ext.MessageBox.alert("Alert", "Edited");
                            lstledgercodetwo.getStore().removeAll();
                            lstcompanytwo.getStore().removeAll();
                            FormPanel.getForm().reset();
                            load();

                        },
                        failure: function () {
                            Ext.MessageBox.alert("Alert", "Failed");

                        }
                        /*
                         callback: function (options, success, response)
                         {
                         var obj = Ext.decode(response.responseText);
                         if (obj['success'] === "true") {
                         Ext.Msg.alert("Alert", "Edited");
                         FormPanel.getForm().reset();
                         lstledgercodetwo.getStore().removeAll();
                         lstcompanytwo.getStore().removeAll();
                         
                         
                         
                         } else {
                         Ext.Msg.alert("Alert", "Failed");
                         }
                         }
                         
                         */
                    });
                }
            }
        });
    }

    function showenable()
    {
        txtbank.enable();
        txtbranch.enable();
        txtaccno.enable();
        year.enable();
        month.enable();
        txtbankclosingbalance.enable();
        txtkgdlclosingbalance.enable();
        chkstatus.disable();
    }
    function showdisable()
    {
        txtbank.disable();
        txtbranch.disable();
        txtaccno.disable();
        year.disable();
        month.disable();
        txtbankclosingbalance.disable();
        txtkgdlclosingbalance.disable();
        chkstatus.disable();
    }

    function refresh()
    {
        txtbank.reset();
        txtbranch.reset();
        txtaccno.reset();
        chkstatus.reset();
    }

    var act1 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act1',
        labelSeparator: "",
        labelStyle: 'font-size: 15px;color:red;'
    });
    var txtid = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtid',
        width: 150,
        name: 'txtid'
    });
    txtid.setVisible(false);
    var lbl = new Ext.form.Label({
        fieldLabel: 'BANK MASTER',
        id: 'lbl',
        labelSeparator: "",
        labelStyle: 'font-size: 20px; font-weight: bold; color:green;'
    });
    var txtbank = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        labelSeparator: "",
        id: 'txtbank',
        name: 'Bank',
        width: 180,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 2,
        maxLength: 40,
        regex: /^[0-9.a-zA-Z -]+$/,
        disabled: true,
        style: {
            textTransform: "uppercase"
        }
    });
    var branchStore = new Ext.data.Store({
        id: 'branchStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'branchcheck'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_name', 'branch_name'])
    });
    var ledgerstore = new Ext.data.Store({
        id: 'ledgerstore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'ledgerstore'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });
    var act2 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act2',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast1 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast1',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast2 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast2',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast3 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast3',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast4 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast4',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast5 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast5',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var ast6 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'ast6',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var txtbranch = new Ext.form.TextField({
        fieldLabel: 'Branch Name',
        labelSeparator: "",
        id: 'txtbranch',
        name: 'Branch',
        width: 150,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 2,
        maxLength: 40,
        disabled: true,
        regex: /^[0-9.a-zA-Z -]+$/,
        style: {
            textTransform: "uppercase"
        },
        listeners:
                {
                    change: function ()
                    {
                        branchStore.removeAll();
                        branchStore.load({
                            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                            params: {
                                task: 'branchcheck',
                                bank: txtbank.getRawValue(),
                                branch: txtbranch.getRawValue()
                            },
                            callback: function () {
                                var cnt = branchStore.getCount();
                                if (cnt > 0)
                                {
                                    Ext.Msg.alert("Alert", "Already Exists");
                                    txtbank.setRawValue('');
                                    txtbranch.setRawValue('');
                                }
                            }
                        });
                    }
                }
    });
    var act3 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act3',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var txtaccno = new Ext.form.TextField({
        fieldLabel: 'Account Number',
        labelSeparator: "",
        id: 'txtaccno',
        name: 'Acc no',
        width: 180,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 10,
        maxLength: 16,
        disabled: true,
        regex: /^[0-9.a-zA-Z -]+$/,
        style: {
            'text-transform': 'uppercase'
        },
    });
    var txtbankclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: 'Closing balance (as per bank statement)',
        id: 'txtbankclosingbalance',
        name: 'txtbankclosingbalance',
        width: 100,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 12,
        disabled: true
    });
    var txtkgdlclosingbalance = new Ext.form.NumberField({
        labelSeparator: "",
        fieldLabel: 'Closing balance (as per kgdl bank book)',
        id: 'txtkgdlclosingbalance',
        name: 'txtkgdlclosingbalance',
        width: 100,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 1,
        maxLength: 12,
        disabled: true
    });
    var year = new Ext.form.DateField({
        id: 'year',
        width: 60,
        name: 'year',
        format: 'Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: ""
    });
    var monthstore = new Ext.data.Store({
        id: 'monthstore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectMonth"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['month_code', 'month_name'])
    });
    var ason_month;
    var month = new Ext.form.ComboBox({
        labelSeparator: "",
        id: 'month',
        fieldLabel: 'As on',
        width: 110,
        store: monthstore,
        displayField: 'month_name',
        valueField: 'month_code',
        hiddenName: 'month_name',
        allowBlank: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        emptyText: 'Select Month',
        listeners: {
            select: function () {
                ason_month = month.getValue();
            }
        }
    });
    var chkstatus = new Ext.form.Checkbox({
        name: 'chkstatus',
        boxLabel: '',
        labelSeparator: "",
        fieldLabel: 'Active',
        id: 'chkstatus',
        checked: true,
        width: 100,
        disabled: true,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    cstatus = 'Y';
                } else {
                    cstatus = 'N';
                }
            }
        }
    });
    var companystore = new Ext.data.Store({
        id: 'companystore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectcompany"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['comp_code', 'comp_name'])
    });
    var traileronestore = new Ext.data.Store({
        id: 'traileronestore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectbanktrailerone"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['seqno', 'header_seqno', 'company_code', 'comp_name'])
    });
    var trailertwostore = new Ext.data.Store({
        id: 'trailertwostore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectbanktrailertwo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['header_seqno', 'ledger_code', 'led_name'])
    });
    var dgrecord = Ext.data.Record.create([]);
    var cmbdivision = new Ext.form.ComboBox({
        labelSeparator: "",
        id: 'cmbdivision',
        fieldLabel: 'Company',
        width: 160,
        //x: 490,
        // y: 20,
        store: companystore,
        displayField: 'comp_name',
        valueField: 'comp_code',
        hiddenName: 'comp_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        listeners: {
            select: function () {
                if (actiontype === 'Add')
                {

                    var sel2 = lstcompany.getSelectionModel().getSelections();
                    var selrows = lstcompany.getSelectionModel().getCount();
                    var cnt = 0;
                    for (var i = 0; i < selrows; i++) {
                        if (sel2[i].data.comp_code === cmbdivision.getValue()) {
                            cnt = cnt + 1;
                        }
                    }

                    if (cnt > 0) {
                        Ext.MessageBox.alert("Alert", "Company Already Exists!");
                    } else {

                        lstcompany.getStore().insert(
                                lstcompany.getStore().getCount(),
                                new dgrecord({
                                    comp_code: cmbdivision.getValue(),
                                    comp_name: cmbdivision.getRawValue()
                                })
                                );
                        lstcompany.getSelectionModel().selectAll();
                    }
                }





                if (actiontype === 'Edit')
                {

                    // lstcompanytwo.getSelectionModel().selectAll();
                    var sel2 = lstcompanytwo.getSelectionModel().getSelections();
                    var selrows = lstcompanytwo.getSelectionModel().getCount();
                    var cnt = 0;
                    for (var i = 0; i < selrows; i++) {
                        if (sel2[i].data.company_code === cmbdivision.getValue()) {
                            cnt = cnt + 1;
                        }
                    }

                    if (cnt > 0) {
                        Ext.MessageBox.alert("Alert", "Company Already Exists!");
                    } else {

                        lstcompanytwo.getStore().insert(
                                lstcompanytwo.getStore().getCount(),
                                new dgrecord({
                                    company_code: cmbdivision.getValue(),
                                    comp_name: cmbdivision.getRawValue()
                                })
                                );
                        //lstcompanytwo.getSelectionModel().selectAll();
                    }
                }


            }
        }
    });
    var compcodee;
    var sm = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (sm) {
                var compcode = "";
                var sel2 = lstcompany.getSelectionModel().getSelections();
                var selrows = lstcompany.getSelectionModel().getCount();
                for (var i = 0; i < selrows; i++) {

                    if (compcode === "")
                    {
                        compcode = sel2[i].data.comp_code;
                    } else
                    {
                        compcode = compcode + "," + sel2[i].data.comp_code;
                    }

                }



                ledgerstore.removeAll();
                ledgerstore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectledger',
                        company: compcode
                    },
                    callback: function () {
                        var cnt = ledgerstore.getCount();
                        // alert(cnt);
                    }

                });
                compcodee = compcode;
            }

        }
    });
    var sm2 = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (sm2) {
                var compcode = "";
                var sel2 = lstcompanytwo.getSelectionModel().getSelections();
                var selrows = lstcompanytwo.getSelectionModel().getCount();
                //  alert(selrows);
                for (var i = 0; i < selrows; i++) {

                    if (compcode === "")
                    {
                        compcode = sel2[i].data.company_code;
                    } else
                    {
                        compcode = compcode + "," + sel2[i].data.company_code;
                    }

                }


                ledgerstore.removeAll();
                ledgerstore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectledger',
                        company: compcode
                    },
                    callback: function () {
                        var cnt = ledgerstore.getCount();
                        // alert(cnt);
                    }

                });
                compcodee = compcode;
            }

        }
    });
    var fm = Ext.form;
    var lstcompany = new Ext.grid.EditorGridPanel({
        frame: false,
        id: lstcompany,
        hideHeaders: true,
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        editable: true,
        height: 60,
        width: 160,
        x: 65,
        y: 73,
        selModel: sm,
        columns: [sm,
            {header: "Division", dataIndex: 'comp_code', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Division", dataIndex: 'comp_name', sortable: true, width: 120, align: 'left',
                editor: new Ext.form.TextField({allowBlank: false})}
        ],
        store: [],
        listeners: {
            'cellClick': function (lstcompany, rowIndex, cellIndex, e) {



            }
        }

    });
    var lstcompanytwo = new Ext.grid.EditorGridPanel({
        frame: false,
        id: lstcompanytwo,
        hideHeaders: true,
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        editable: true,
        height: 60,
        hidden: 'true',
        width: 160,
        x: 65,
        y: 73,
        selModel: sm2,
        columns: [sm2,
            // {header: "Seqno", dataIndex: 'seqno', sortable: true, width: 200, align: 'left', hidden: true},
            // {header: "Division", dataIndex: 'header_seqno', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Division", dataIndex: 'company_code', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Division", dataIndex: 'comp_name', sortable: true, width: 120, align: 'left',
                editor: new fm.TextField({allowBlank: false})}
        ],
        store: traileronestore,
        listeners: {
            'cellClick': function (lstcompanytwo, rowIndex, cellIndex, e) {



            }
        }

    });
    var ledgerstore = new Ext.data.Store({
        id: 'ledgerstore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: "selectledger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });
    //var dgrecord = Ext.data.Record.create([]);
    var cmbledgercode = new Ext.form.ComboBox({
        labelSeparator: "",
        id: 'cmbledgercode',
        fieldLabel: 'Ledger',
        width: 310,
        //x: 490,
        // y: 20,
        store: ledgerstore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        listeners: {
            select: function () {
                if (actiontype === 'Add')
                {
                    var sel2 = lstledgercode.getSelectionModel().getSelections();
                    var selrows = lstledgercode.getSelectionModel().getCount();
                    var cnt = 0;
                    for (var i = 0; i < selrows; i++) {
                        if (sel2[i].data.led_code === cmbledgercode.getValue()) {
                            cnt = cnt + 1;
                        }
                    }

                    if (cnt > 0) {
                        Ext.MessageBox.alert("Alert", "Ledger Already Exists!");
                    } else {

                        lstledgercode.getStore().insert(
                                lstledgercode.getStore().getCount(),
                                new dgrecord({
                                    led_code: cmbledgercode.getValue(),
                                    led_name: cmbledgercode.getRawValue()
                                })
                                );
                        lstledgercode.getSelectionModel().selectAll();
                    }
                }

                if (actiontype === 'Edit')
                {
                    var sel2 = lstledgercodetwo.getSelectionModel().getSelections();
                    var selrows = lstledgercodetwo.getSelectionModel().getCount();
                    var cnt = 0;
                    for (var i = 0; i < selrows; i++) {
                        if (sel2[i].data.ledger_code === cmbledgercode.getValue()) {
                            cnt = cnt + 1;
                        }
                    }

                    if (cnt > 0) {
                        Ext.MessageBox.alert("Alert", "Ledger Already Exists!");
                    } else {

                        lstledgercodetwo.getStore().insert(
                                lstledgercodetwo.getStore().getCount(),
                                new dgrecord({
                                    ledger_code: cmbledgercode.getValue(),
                                    led_name: cmbledgercode.getRawValue()
                                })
                                );
                        lstledgercodetwo.getSelectionModel().selectAll();
                    }
                }
            }
        }
    });
    var ledcodee;
    var lm = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (lm) {
                var ledcode = "";
                var sel2 = lstledgercode.getSelectionModel().getSelections();
                var selrows = lstledgercode.getSelectionModel().getCount();
                for (var i = 0; i < selrows; i++) {

                    if (ledcode === "")
                    {
                        ledcode = sel2[i].data.led_code;
                    } else
                    {
                        ledcode = ledcode + "," + sel2[i].data.led_code;
                    }

                }
                ledcodee = ledcode;
            }

        }
    });
    var lm2 = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (lm2) {
                var ledcode = "";
                var sel2 = lstledgercode.getSelectionModel().getSelections();
                var selrows = lstledgercode.getSelectionModel().getCount();
                for (var i = 0; i < selrows; i++) {

                    if (ledcode === "")
                    {
                        ledcode = sel2[i].data.led_code;
                    } else
                    {
                        ledcode = ledcode + "," + sel2[i].data.led_code;
                    }

                }
                ledcodee = ledcode;
            }

        }
    });
    var fm = Ext.form;
    var lstledgercode = new Ext.grid.EditorGridPanel({
        frame: false,
        id: lstledgercode,
        hideHeaders: true,
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        editable: true,
        height: 60,
        width: 310,
        x: 325,
        y: 73,
        selModel: lm,
        columns: [lm,
            {header: "Ledger code", dataIndex: 'led_code', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Ledger", dataIndex: 'led_name', sortable: true, width: 280, align: 'left',
                editor: new fm.TextField({allowBlank: false})}
        ],
        store: []
    });
    var lstledgercodetwo = new Ext.grid.EditorGridPanel({
        frame: false,
        id: lstledgercodetwo,
        hideHeaders: true,
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        editable: true,
        hidden: 'true',
        height: 60,
        width: 310,
        x: 325,
        y: 73,
        selModel: lm2,
        columns: [lm2,
            //   {header: "Seqno", dataIndex: 'seqno', sortable: true, width: 200, align: 'left', hidden: true},
            //   {header: "H.Seqno", dataIndex: 'header_seqno', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Ledger code", dataIndex: 'ledger_code', sortable: true, width: 200, align: 'left', hidden: true},
            {header: "Ledger", dataIndex: 'led_name', sortable: true, width: 280, align: 'left',
                editor: new fm.TextField({allowBlank: false})}
        ],
        store: trailertwostore,
        listeners: {
            'cellClick': function (lstledgercodetwo, rowIndex, cellIndex, e) {

            }
        }
    });
    var gridView = new Ext.data.Store({
        id: 'gridView',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankmaster'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_code', 'bank_name', 'branch_name', 'account_no', 'value_month', 'month_name', 'value_year', 'closing_balance_bankstatement', 'closing_balance_kgdlbankbook', 'active_status'])

    });
    var lblact = new Ext.form.Label({
        fieldLabel: '* fields are mandatory. Double Click the records to edit.',
        id: 'lblact',
        labelSeparator: "",
        labelStyle: 'font-size: 13px;color:red;'
    });
    var Datagridd = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 140,
        width: 770,
        x: 30,
        y: 320,
        columns: [
            {header: "Bank code", dataIndex: 'bank_code', sortable: true, width: 100, align: 'left', hidden: 'true'},
            {header: "Bank Name", dataIndex: 'bank_name', sortable: true, width: 130, align: 'left'},
            {header: "Branch Name", dataIndex: 'branch_name', sortable: true, width: 140, align: 'left'},
            {header: "Account No", dataIndex: 'account_no', sortable: true, width: 105, align: 'left'},
            {header: "Month", dataIndex: 'value_month', sortable: true, width: 70, align: 'left', hidded: 'true'},
            {header: "Month", dataIndex: 'month_name', sortable: true, width: 70, align: 'left'},
            {header: "Year", dataIndex: 'value_year', sortable: true, width: 70, align: 'left'},
            {header: "Bank Bal", dataIndex: 'closing_balance_bankstatement', sortable: true, width: 70, align: 'left'},
            {header: "Kgdl Book", dataIndex: 'closing_balance_kgdlbankbook', sortable: true, width: 70, align: 'left'},
            {header: "Active Status", dataIndex: 'active_status', sortable: true, width: 70, align: 'left'}
        ],
        store: 'gridView',
        clicksToEdit: 2,
        listeners: {
            'rowDblClick': function (Datagrid, rowIndex, cellIndex, e) {
                actiontype = 'Edit';
                showenable();
                chkstatus.enable();
                lstcompany.hide();
                lstledgercode.hide();
                lstcompanytwo.show();
                lstledgercodetwo.show();
                var data1 = Datagrid.getStore().getAt(rowIndex);
                var column1 = Datagrid.getColumnModel().getDataIndex(0);
                var val1 = data1.get(column1);
                txtid.setValue(val1);
                traileronestore.removeAll();
                traileronestore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectbanktrailerone',
                        headerseq: val1
                    },
                    callback: function () {
                        var cnt = traileronestore.getCount();
                        lstcompanytwo.getSelectionModel().selectAll();
                    }

                });
                trailertwostore.removeAll();
                trailertwostore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectbanktrailertwo',
                        headerseq: val1
                    },
                    callback: function () {
                        var cnt = trailertwostore.getCount();
                        lstledgercodetwo.getSelectionModel().selectAll();
                        // alert(cnt);
                    }

                });
                var data2 = Datagrid.getStore().getAt(rowIndex);
                var column2 = Datagrid.getColumnModel().getDataIndex(1);
                var val2 = data2.get(column2);
                txtbank.setValue(val2);
                var data3 = Datagrid.getStore().getAt(rowIndex);
                var column3 = Datagrid.getColumnModel().getDataIndex(2);
                var val3 = data3.get(column3);
                txtbranch.setValue(val3);
                var data4 = Datagrid.getStore().getAt(rowIndex);
                var column4 = Datagrid.getColumnModel().getDataIndex(3);
                var val4 = data4.get(column4);
                txtaccno.setValue(val4);
                var data5 = Datagrid.getStore().getAt(rowIndex);
                var column5 = Datagrid.getColumnModel().getDataIndex(4);
                ason_month = data5.get(column5);
                var data6 = Datagrid.getStore().getAt(rowIndex);
                var column6 = Datagrid.getColumnModel().getDataIndex(5);
                var val6 = data6.get(column6);
                month.setRawValue(val6);
                var data7 = Datagrid.getStore().getAt(rowIndex);
                var column7 = Datagrid.getColumnModel().getDataIndex(6);
                var val7 = data7.get(column7);
                year.setValue(val7);
                var data8 = Datagrid.getStore().getAt(rowIndex);
                var column8 = Datagrid.getColumnModel().getDataIndex(7);
                var val8 = data8.get(column8);
                txtbankclosingbalance.setRawValue(val8);
                var data9 = Datagrid.getStore().getAt(rowIndex);
                var column9 = Datagrid.getColumnModel().getDataIndex(8);
                var val9 = data9.get(column9);
                txtkgdlclosingbalance.setRawValue(val9);
                var data10 = Datagrid.getStore().getAt(rowIndex);
                var column10 = Datagrid.getColumnModel().getDataIndex(9);
                var val10 = data10.get(column10);
                /*
                 var a = val10;
                 var x = new Array();
                 x = a.split(",");
                 var b = x.length;
                 // alert(x.length);
                 var companyname = new Array();
                 for (var i = 0; i < b; i++) {
                 //alert(x[i]);
                 
                 /*     companynamestore.load({
                 url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                 method: 'POST',
                 params: {
                 task: 'selectcompanyname',
                 companycode: x[i]
                 },
                 callback: function () {
                 var cnt = companynamestore.getCount();
                 
                 if (cnt > 0)
                 {
                 companyname = companynamestore.getAt(0).get('comp_name')
                 // alert(companyname);
                 
                 
                 }
                 }
                 });
                 
                 companyname[1] = 'KG DENIM LIMITED';
                 if (x[i] === 1)
                 {
                 companyname[i] = 'KG DENIM LIMITED';
                 } else if (x[i] === 4)
                 {
                 companyname[i] = 'HOMETEXTILES';
                 } else if (x[i] === 8)
                 {
                 companyname[i] = 'POWER PLANT II';
                 } else if (x[i] === 11)
                 {
                 companyname[i] = 'SRINIVASA AGRO';
                 } else
                 {
                 
                 }
                 alert(companyname[1]);
                 lstcompany.getStore().insert(
                 lstcompany.getStore().getCount(),
                 new dgrecord({
                 comp_code: x[i],
                 comp_name: companyname[i]
                 })
                 );
                 lstcompany.getSelectionModel().selectAll();
                 
                 }
                 
                 
                 
                 
                 if (tt === 'Y')
                 {
                 Ext.getCmp('chkstatus').setValue(true);
                 } else if (tt === 'N')
                 {
                 Ext.getCmp('chkstatus').setValue(false);
                 } else
                 {
                 Ext.getCmp('chkstatus').setValue(true);
                 }
                 */
            }
        }

    });
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 600,
        // x: 10,
        border: false,
        // y: 10,
        frame: false,
        id: 'FormPanel',
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'black',
            'style': 'Helvetica',
            'font-size': '17px', 'font-weight': 'bold'
        },
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'New',
                    style: 'text-align:center;',
                    icon: '/KgDenim/Pictures/add.ico',
                    height: 40, id: 'newstart',
                    fontSize: 30,
                    width: 70,
                    listeners: {
                        click: function () {
                            actiontype = "Add";
                            showenable();
                            FormPanel.getForm().reset();
                            lstcompany.show();
                            lstledgercode.show();
                        }
                    }
                }, '-',
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    height: 40, id: 'newsave',
                    fontSize: 30,
                    width: 70,
                    icon: '/KgDenim/Pictures/save1.ico',
                    listeners: {
                        click: function () {
                            if (actiontype === 'Add')
                            {
                                save();
                            } else if (actiontype === 'Edit')
                            {
                                Ext.getCmp('chkstatus').enable();
                                updatenew();
                            } else
                            {

                            }
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30, id: 'newview',
                    width: 70,
                    icon: '/KgDenim/Pictures/refresh.ico',
                    listeners: {
                        click: function () {
                            window.location.reload();
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
                    icon: '/KgDenim/Pictures/exit.ico',
                    listeners: {
                        click: function () {
                            //open(location, '_self').close();
				LOGFormWindow.hide();
                        }
                    }
                }
            ]
        },
        items: [Datagridd,
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 300,
                y: 10,
                border: false,
                items: [txtid]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 322,
                width: 320,
                x: 300,
                y: 0,
                border: false,
                items: [lbl]
            },
            {
                xtype: 'fieldset',
                layout: 'absolute',
                title: 'Bank Details',
                labelWidth: 80,
                x: 30,
                y: 60,
                height: 80,
                width: 770,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: -10,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [ast1]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 300,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [txtbank]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: 250,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [act2]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 250,
                        x: 260,
                        y: 0,
                        border: false,
                        items: [txtbranch]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 25,
                        x: 490,
                        y: -10,
                        border: false,
                        items: [act3]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 300,
                        x: 500,
                        y: 0,
                        border: false,
                        items: [txtaccno]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                layout: 'absolute',
                title: 'Balance Details',
                labelWidth: 80,
                x: 30,
                y: 150,
                height: 170,
                width: 770,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: -10,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [ast2]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 180,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [month]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 10,
                        width: 100,
                        x: 160,
                        y: 0,
                        border: false,
                        items: [year]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 25,
                        x: 250,
                        y: -10,
                        border: false,
                        items: [ast5]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 110,
                        width: 250,
                        x: 260,
                        y: 0,
                        border: false,
                        items: [txtbankclosingbalance]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: 490,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [ast4]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 110,
                        width: 250,
                        x: 500,
                        y: 0,
                        border: false,
                        items: [txtkgdlclosingbalance]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        width: 250,
                        x: 0,
                        y: 40,
                        border: false,
                        items: [cmbdivision]
                    }, lstcompany, lstcompanytwo,
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 420,
                        x: 250,
                        y: 40,
                        border: false,
                        items: [cmbledgercode]
                    }, lstledgercode, lstledgercodetwo,
                            /*
                             {
                             xtype: 'fieldset',
                             title: '',
                             labelWidth: 50,
                             width: 150,
                             x: 0,
                             y: 70,
                             border: false,
                             items: [chkstatus]
                             }
                             */
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 450,
                width: 450,
                x: 190,
                y: 460,
                border: false,
                items: [lblact]
            }
        ]
    });
    function load() {

        gridView.load({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            params: {
                task: 'selectbankmaster'
            }
        });
    }
    var LOGFormWindow = new Ext.Window({
        height: 560,
        width: 840,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 60,
        items: [FormPanel],
        title: 'HRD',
        layout: 'absolute',
        border: false,
        draggable: false,
        resizable: false,
        listeners: {
            show: function () {
                monthstore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectMonth'
                    }
                });
                companystore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectcompany'
                    }
                });
                load();
            }
        }
    });
    LOGFormWindow.show();
});


