/*Developed by : SASIKALA. T -- Feb,10 2019
 * ROLL NO : 7055
 * This form is used to do Bank Reconciliation.
 */

/* global Ext, Datagridd */
Ext.onReady(function () {
    Ext.QuickTips.init();
    //  var loginid = localStorage.getItem("tempuserid");
    var loginid = 7055;
    var cstatus = 'N';
    var dgrecord = Ext.data.Record.create([]);
    var actionType;
    function update()
    {
        actionType = 'Add';
        Ext.MessageBox.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do u want to save',
            fn: function (btn) {
                if (btn === 'yes') {

                    var Datanew = Datagridd.getStore().getRange();
                    var Dataupd = new Array();
                    Ext.each(Datanew, function (record) {
                        Dataupd.push(record.data);
                    });
                    Ext.Ajax.request({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/Bank_Reconciliation/Bank_Reconciliation_Save.php',
                        params: {
                            kgdlbankbookdetails: Ext.util.JSON.encode(Dataupd),
                            userid: loginid,
                            kgdlbankbookcnt: Datanew.length
                        },
                        callback: function (options, success, response)
                        {
                            var obj = Ext.decode(response.responseText);
                            if (obj['success'] === "true") {
                                Ext.Msg.alert("Alert", "Updated");
                                Datagridd.getStore().removeAll();
                                Datagridd.getStore().sync();

                                showdisable();
                            } else {
                                Ext.Msg.alert("Alert", "Failed");

                            }
                        }
                    });

                    var Datanew = Datagridbank.getStore().getRange();
                    var Dataupd = new Array();
                    Ext.each(Datanew, function (record) {
                        Dataupd.push(record.data);
                    });
                    Ext.Ajax.request({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/Bank_Reconciliation/Bank_Reconciliation_Save.php',
                        params: {
                            bankstatementdetails: Ext.util.JSON.encode(Dataupd),
                            userid: loginid,
                            bankstatement: Datanew.length
                        },
                        callback: function (options, success, response)
                        {
                            var obj = Ext.decode(response.responseText);
                            if (obj['success'] === "true") {
                                Ext.Msg.alert("Alert", "Updated");
                                Datagridbank.getStore().removeAll();
                                Datagridbank.getStore().sync();

                                showdisable();
                            } else {
                                Ext.Msg.alert("Alert", "Failed");
                            }
                        }
                    });


                }
            }
        });
    }


    function showenable()
    {
        cmbbank.enable();
        year.enable();
        month.enable();
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
        fieldLabel: 'Bank Reconciliation',
        id: 'lbl',
        labelSeparator: "",
        labelStyle: 'font-size: 20px; font-weight: bold; color:green;'
    });
    var Bankstore = new Ext.data.Store({
        id: 'Bankstore',
        proxy: new Ext.data.HttpProxy({
            url: '/hr_class.php',
            method: 'POST'
        }),
        baseParams: {task: "CmbBank"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['dept_code', 'dept_name'])
    });
    var bankstore = new Ext.data.Store({
        id: 'bankstore',
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
    var cmbbank = new Ext.form.ComboBox({
        fieldLabel: 'Bank',
        labelSeparator: "",
        width: 150,
        name: 'cmbbank',
        forceSelection: true,
        store: bankstore,
        emptyText: 'Select Bank',
        triggerAction: 'all',
        editable: false,
        valueField: 'bank_code',
        displayField: 'bank_name',
        queryMode: 'local',
        typeAhead: 'true',
        allowBlank: false,
        disabled: true,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {

            }
        }
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
    var act3 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act3',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var label1 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'label1',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var year = new Ext.form.DateField({
        id: 'year',
        fieldLabel: 'Year',
        width: 60,
        name: 'year',
        format: 'Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: ""
    });

    var pdate = new Ext.form.DateField({
        id: 'pdate',
        fieldLabel: 'From Date',
        width: 90,
        name: 'pdate',
        format: 'd-m-Y',
        value: new Date(),
        allowBlank: false,
        labelSeparator: "",
  listeners: {
            select: function () {

                todate.setMaxValue(new Date(pdate.getValue().getFullYear(), pdate.getValue().getMonth()+1, 0).format('d-m-Y'));
            }
        }

    });

	    var todate = new Ext.form.DateField({
        id: 'todate',
        fieldLabel: 'To Date',
        width: 90,
        name: 'todate',
        format: 'd-m-Y',
       // value: new Date(),
        allowBlank: false,
        labelSeparator: ""
    });


	    var clearedfromdate = new Ext.form.DateField({
        id: 'clearedfromdate',
        fieldLabel: 'Reconciled From',
        width: 90,
        name: 'clearedfromdate',
        format: 'd-m-Y',
	disabled:true,
        value: new Date(),
        allowBlank: false,
        labelSeparator: ""
    });

	    var clearedtodate = new Ext.form.DateField({
        id: 'clearedtodate',
        fieldLabel: ' Reconciled To',
        width: 90,
        name: 'clearedtodate',
        format: 'd-m-Y',
	disabled:true,
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
    var chstatus = new Ext.form.Checkbox({
        name: 'chstatus',
        labelSeparator: "",
        boxLabel: '',
        fieldLabel: 'Reverse',
        id: 'chstatus',
        width: 100,
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

    var bankstatementstore = new Ext.data.Store({
        id: 'bankstatementstore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankstatement'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['seqno', 'bank_code', 'bank_name', 'value_date', 'particulars', 'cheque_no', 'debit_amount', 'credit_amount', 'active_status', 'Flagnew', 'Flag', 'kgdlbankbookseqno'])

    });

    var bankbookstore = new Ext.data.Store({
        id: 'bankbookstore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankbook'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_vouno', 'accref_voudate', 'led_name', 'accref_payref_no', 'accref_payref_date', 'acctran_dbamt', 'acctran_cramt', 'Flagnew', 'Flag', 'cleared_date', 'bankstatement_seqno', 'difference_amount'])

    });
    var partystore = new Ext.data.Store({
        id: 'partystore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectparty'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['acctran_led_code', 'led_name', 'acctran_dbamt', 'acctran_cramt', 'accref_narration'])

    });

    var Partygrid = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        // hideHeaders: true,
        hidden: true,
        height: 80,
        width: 950,
        x: 200,
        y: 595,
        columns: [
            {header: "Particular", dataIndex: 'led_name', sortable: true, width: 290, align: 'left'},
            {header: "Debit", dataIndex: 'acctran_dbamt', sortable: true, width: 80, align: 'left'},
            {header: "Credit", dataIndex: 'acctran_cramt', sortable: true, width: 75, align: 'left'},
            {header: "Narration", dataIndex: 'accref_narration', sortable: true, width: 550, align: 'left'}
        ],
        store: 'partystore'
    });

    var lblact = new Ext.form.Label({
        fieldLabel: '* fields are mandatory.',
        id: 'lblact',
        labelSeparator: "",
        labelStyle: 'font-size: 13px;color:red;'
    });
    var lblbankstatement = new Ext.form.Label({
        fieldLabel: 'Bank Statement',
        id: 'lblbankstatement',
        width: 390,
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var lblkgdlbook = new Ext.form.Label({
        fieldLabel: 'Company Bank Book',
        id: 'lblkgdlbook',
        width: 390,
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var rtype = 'Exclude';
    var recontype = new Ext.form.RadioGroup({
        fieldLabel: '',
        id: 'recontype',
        columns: 2,
        allowBlank: false,
        msgTarget: 'side',
        // disabled: true,
        items: [
            {boxLabel: 'Include Reconciled', name: 'recontype', inputValue: 1, id: 'xx',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            rtype = 'Include';
				clearedfromdate.enable();
				clearedtodate.enable();
                        }
                    }
                }
            },
            {boxLabel: 'Exclude Reconciled', name: 'recontype', inputValue: 2, id: 'yy', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            rtype = 'Exclude';
				clearedfromdate.disable();
				clearedtodate.disable();
                        }
                    }
                }
            }

        ]
    });
    var labelsum = new Ext.form.TextField({
        fieldLabel: '',
        id: 'labelsum',
        name: 'labelsum',
        width: 130,
        hidden: true,
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });
    var Datagridd = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 375,
        width: 590,
        x: 560,
        y:210,
        columns: [
            {header: "Seq", dataIndex: 'accref_seqno', sortable: true, width: 65, align: 'left', hidden: true},
            {header: "V.Date", dataIndex: 'accref_voudate', sortable: true, width: 70, align: 'left'},
            {header: "Voucher No", dataIndex: 'accref_vouno', sortable: true, width: 80, align: 'left'},
            {header: "Particulars", dataIndex: 'led_name', sortable: true, width: 130, align: 'left', hidden: true},
            {header: "Cheque No", dataIndex: 'accref_payref_no', sortable: true, width: 70, align: 'left'},
            {header: "Cheque Date.", dataIndex: 'accref_payref_date', sortable: true, width: 80, align: 'left', hidden: true},
            {header: "Debit", dataIndex: 'acctran_dbamt', sortable: true, width: 80, align: 'left'},
            {header: "Credit", dataIndex: 'acctran_cramt', sortable: true, width: 80, align: 'left'},
            {header: "Difference", dataIndex: 'difference_amount', sortable: true, width: 80, align: 'left'},
            {header: "Status", dataIndex: 'Flagnew', sortable: true, width: 43, align: 'left'},
            {header: "SFlag", dataIndex: 'Flag', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "Cleared Date", dataIndex: 'cleared_date', sortable: true, width: 85, align: 'left'},
            {header: "Bstmt Seq", dataIndex: 'bankstatement_seqno', sortable: true, width: 80, align: 'left', hidden: true}
        ],
        store: 'bankbookstore',
        clicksToEdit: 2,
        listeners: {
            'rowdblClick': function (Datagridd, rowIndex, cellIndex, e) {

                if (cstatus === 'N') {
                    var selected_rows1 = Datagridbank.getSelectionModel().getSelections();
                    var selected_rows2 = Datagridd.getSelectionModel().getSelections();

                    for (var j = 0; j < selected_rows1.length; j++) {
                        for (var i = 0; i < selected_rows2.length; i++) {


                            var bseq = selected_rows1[j].data.seqno;
                            var ftype1 = selected_rows1[j].data.Flag;
                            // alert(ftype1);
                            var debitamt = selected_rows1[j].data.debit_amount;
                            var creditamt = selected_rows1[j].data.credit_amount;
                            var valuedate = selected_rows1[j].data.value_date;
                            var kgdlbankbkseqno = selected_rows1[j].data.kgdlbankbookseqno;
                            var ftypetwo;

                            var seq = selected_rows2[i].data.accref_seqno;
                            var voudate = selected_rows2[i].data.accref_voudate;
                            var ftype = selected_rows2[i].data.Flag;
                            // alert(ftype);
                            var dbamt = selected_rows2[i].data.acctran_dbamt;
                            var cramt = selected_rows2[i].data.acctran_cramt;
                            var bankstatementtseq = selected_rows2[i].data.bankstatement_seqno;



                            if (ftype === 'check' && ftype1 === 'Selected' && valuedate >= voudate && parseFloat(debitamt) >= parseFloat(cramt))
                            {
                                // alert('ssss');
                                selected_rows2[i].set('Flag', 'Selected');
                                ftypetwo = selected_rows2[i].data.Flag;
                                selected_rows2[i].set('Flagnew', '✔');
                                selected_rows2[i].set('bankstatement_seqno', bseq);
                                selected_rows2[i].set('cleared_date', valuedate);
                                selected_rows2[i].set('difference_amount', diffamnt);

                                selected_rows1[j].set('kgdlbankbookseqno', seq);

                                var diffamnt = parseFloat(debitamt) - parseFloat(cramt);
                                if (ftypetwo === 'Selected')
                                {
                                    var sm = Datagridd.getSelectionModel().selectAll();
                                    var bankbkkselect = Datagridd.getSelectionModel().getSelections();
                                    for (var k = 0; k < bankbkkselect.length; k++) {

                                        var bcode = bankbkkselect[k].data.bankstatement_seqno;
                                        if (seq === bcode) {
                                            bankbkkselect[k].set('bankstatement_seqno', '');
                                            bankbkkselect[k].set('Flag', 'check');
                                            bankbkkselect[k].set('Flagnew', '□');
                                        }
                                    }
                                    Datagridd.getSelectionModel().deselectRange(0, 10000);
                                    Datagridd.getSelectionModel().clearSelections();
                                }

                                selected_rows2[i].set('Flag', 'Selected');
                                //ftypetwo = selected_rows1[j].data.Flag;
                                selected_rows2[i].set('Flagnew', '✔');
                                selected_rows2[i].set('bankstatement_seqno', bseq);
                                selected_rows2[i].set('cleared_date', valuedate);
                                var diffamnt2 = parseFloat(debitamt) - parseFloat(cramt);
                                var diffamnt3 = parseFloat(creditamt) - parseFloat(dbamt);
				
                                if (creditamt > 0) {

                                    selected_rows2[i].set('difference_amount', diffamnt3);
                                }
                                if (debitamt > 0) {

                                    selected_rows2[i].set('difference_amount', diffamnt2);
                                }
                                selected_rows1[j].set('kgdlbankbookseqno', seq);

                            } else if (labelsum.getValue() > 0 && Math.abs(labelsum.getValue()) >= parseFloat(cramt) && valuedate >= voudate)
                            {
 
                                var diflabellsum = labelsum.getValue() - parseFloat(cramt);
                                selected_rows2[i].set('Flag', 'Selected');
                                ftypetwo = selected_rows2[i].data.Flag;
                                selected_rows2[i].set('Flagnew', '✔');
                                selected_rows2[i].set('bankstatement_seqno', bseq);
                                selected_rows2[i].set('cleared_date', valuedate);
                                selected_rows2[i].set('difference_amount', diflabellsum);

                                selected_rows1[j].set('kgdlbankbookseqno', seq);

                            } else if (labelsum.getValue() <= 0 && Math.abs(labelsum.getValue()) >= parseFloat(dbamt) && valuedate >= voudate)
                            {

         
           			selected_rows2[i].set('Flag', 'Selected');
                                ftypetwo = selected_rows2[i].data.Flag;
                                selected_rows2[i].set('Flagnew', '✔');
                                selected_rows2[i].set('bankstatement_seqno', bseq);
                                selected_rows2[i].set('cleared_date', valuedate);
				var diflabellsum = Math.abs(labelsum.getValue()) - parseFloat(dbamt);
				/*var diffamnt2 = parseFloat(debitamt) - parseFloat(cramt);
                                var diffamnt3 = parseFloat(creditamt) - parseFloat(dbamt);
 				var diffamnt4 = parseFloat(cramt) - parseFloat(debitamt);
				
                                if (creditamt > 0) {
                                    selected_rows2[i].set('difference_amount', diffamnt3);
                                }
				if (cramt > 0) {
                                    selected_rows2[i].set('difference_amount', diffamnt4);
                                }
                                if (debitamt > 0) {
                                    selected_rows2[i].set('difference_amount', diffamnt2);
                                }*/
                                selected_rows2[i].set('difference_amount', diflabellsum);
                                selected_rows1[j].set('kgdlbankbookseqno', seq);

                            } else
                            {
                                 Ext.MessageBox.alert("Alert", "Voucher date is after check date OR Bank books credit amount is greater than bank statement debit amount");

                             
                                            selected_rows2[i].set('Flag', 'Selected');
                                            ftypetwo = selected_rows2[i].data.Flag;
                                            selected_rows2[i].set('Flagnew', '✔');
                                            selected_rows2[i].set('bankstatement_seqno', bseq);
                                            selected_rows2[i].set('cleared_date', valuedate);
						var diffamnt2 = parseFloat(debitamt) - parseFloat(cramt);
                                		var diffamnt3 = parseFloat(creditamt) - parseFloat(dbamt);
 					        var diflabellsum = labelsum.getValue() - parseFloat(cramt);
						var diflabellsum2 = Math.abs(labelsum.getValue()) - parseFloat(dbamt);	
			
				if (creditamt > 0) {

                                    selected_rows2[i].set('difference_amount', diffamnt3);
                                }
				if (cramt > 0 && Math.abs(labelsum.getValue()) > 0) {

                                     selected_rows2[i].set('difference_amount', diflabellsum);
                                }
				if (dbamt > 0 && labelsum.getValue() < 0) {

                                     selected_rows2[i].set('difference_amount', diflabellsum2);
                                }
				
                                
                                
                                          
                                            selected_rows1[j].set('kgdlbankbookseqno', seq);

                                       
                                       /*
                                            selected_rows2[i].set('Flag', 'check');
                                            selected_rows2[i].set('Flagnew', '□');
                                            selected_rows2[i].set('bankstatement_seqno', '');
                                            selected_rows2[i].set('difference_amount', '');
                                            selected_rows2[i].set('cleared_date', '');

                                            Datagridbank.getSelectionModel().selectAll();
                                            var banksttkselect = Datagridbank.getSelectionModel().getSelections();
                                            for (var k = 0; k < banksttkselect.length; k++) {

                                                var bacode = banksttkselect[k].data.kgdlbankbookseqno;
                                                if (seq === bacode) {
                                                    banksttkselect[k].set('kgdlbankbookseqno', '');
                                                    banksttkselect[k].set('Flag', 'check');
                                                    banksttkselect[k].set('Flagnew', '□');
                                                }
                                            }
                                            Datagridbank.getSelectionModel().deselectRange(0, 10000);
                                            Datagridbank.getSelectionModel().clearSelections();
					*/
                               

                            }
                        }
                    }
                } else if (cstatus === 'Y')
                {
Ext.MessageBox.alert("Alert",'Reverse option selected.');
			var dd = new Date().format('Y-m-d');

                    var selected_rows2 = Datagridd.getSelectionModel().getSelections();
                    for (var i = 0; i < selected_rows2.length; i++) {

                        var seq = selected_rows2[i].data.accref_seqno;
                        var voudate = selected_rows2[i].data.accref_voudate;
                        var ftype = selected_rows2[i].data.Flag;
                        
                        var dbamt = selected_rows2[i].data.acctran_dbamt;
                        var cramt = selected_rows2[i].data.acctran_cramt;			
                        var bankstatementtseq = selected_rows2[i].data.bankstatement_seqno;
                        if (ftype === 'check')
                        {
                           
                            selected_rows2[i].set('Flag', 'Selected');
                            selected_rows2[i].set('Flagnew', '✔');
                            selected_rows2[i].set('cleared_date', dd);
                        }
                    }
                }
            },
            cellClick: function (Datagridd, rowIndex, cellIndex, e) {
                // Ext.Msg.alert('hi ', record.get('title'));
                //  alert('dddd');
                //   Datagridbank.getSelectionModel().selectRow();
                //  var selected_rows = Datagridd.getSelectionModel().getSelections();
                Partygrid.show();
                var sm = Datagridd.getSelectionModel();
                var selrow = sm.getSelected();
                var vouno = selrow.data.accref_seqno;

                partystore.removeAll();
                partystore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectparty',
                        vouno: vouno
                    },
                    callback: function () {

                        var xx = partystore.getCount();

                    }
                });
            }
        }

    });
    var Datagridbank = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 375,
        width: 530,
        x: 20,
        y: 210,
        columns: [
            {header: "Bseq", dataIndex: 'seqno', sortable: true, width: 80, align: 'left', hidden: true},
            {header: "Bank code", dataIndex: 'bank_code', sortable: true, width: 80, align: 'left', hidden: true},
            {header: "Value Date", dataIndex: 'value_date', sortable: true, width: 70, align: 'left'},
            {header: "Particulars", dataIndex: 'particulars', sortable: true, width: 140, align: 'left'},
            {header: "Cheque No.", dataIndex: 'cheque_no', sortable: true, width: 70, align: 'left'},
            {header: "Debit", dataIndex: 'debit_amount', sortable: true, width: 100, align: 'left'},
            {header: "Credit", dataIndex: 'credit_amount', sortable: true, width: 90, align: 'left'},
            {header: "Status", dataIndex: 'Flagnew', sortable: true, width: 43, align: 'left'},
            {header: "SFlag", dataIndex: 'Flag', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "kseq", dataIndex: 'kgdlbankbookseqno', sortable: true, width: 80, align: 'left', hidden: true},
        ],
        store: 'bankstatementstore',
        clicksToEdit: 2,
        listeners: {
            'rowdblClick': function (Datagridbank, rowIndex, cellIndex, e) {

                if (cstatus === 'N') {
                    var selected_rows = Datagridbank.getSelectionModel().getSelections();
                    for (var i = 0; i < selected_rows.length; i++) {
                        var ftype = selected_rows[i].data.Flag;
                        var fseq = selected_rows[i].data.seqno;

                        if (ftype === 'check')
                        {
                            selected_rows[i].set('Flag', 'Selected');
                            selected_rows[i].set('Flagnew', '✔');
                        } else
                        {
                            selected_rows[i].set('Flag', 'check');
                            selected_rows[i].set('Flagnew', '□');
                            selected_rows[i].set('kgdlbankbookseqno', '');

                            var sm = Datagridd.getSelectionModel().selectAll();
                            var bankbbkselect = Datagridd.getSelectionModel().getSelections();
                            for (var k = 0; k < bankbbkselect.length; k++) {
                                var bstcode = bankbbkselect[k].data.bankstatement_seqno;
                                if (fseq === bstcode) {
                                    bankbbkselect[k].set('bankstatement_seqno', '');
                                    bankbbkselect[k].set('Flag', 'check');
                                    bankbbkselect[k].set('Flagnew', '□');
                                    bankbbkselect[k].set('cleared_date', '');
                                    bankbbkselect[k].set('difference_amount', '');
                                }
                            }
                            Datagridd.getSelectionModel().deselectRange(0, 10000);
                            Datagridd.getSelectionModel().clearSelections();
                        }
                    }
                } else if (cstatus === 'Y')
                {
Ext.MessageBox.alert("Alert",'Reverse option selected.');
                    var selected_rows = Datagridbank.getSelectionModel().getSelections();
                    for (var i = 0; i < selected_rows.length; i++) {

                        var ftype = selected_rows[i].data.Flag;
                        var fseq = selected_rows[i].data.seqno;
                        if (ftype === 'check')
                        {
                            selected_rows[i].set('Flag', 'Selected');
                            selected_rows[i].set('Flagnew', '✔');
                        }
                    }
                }
            },
            cellClick: function (Datagridbank, rowIndex, cellIndex, e) {

                Datagridbank.getSelectionModel().selectRow();
                var selected_rows = Datagridbank.getSelectionModel().getSelections();

                var db = 0;
                var cr = 0;
                var summ = 0;
                for (var k = 0; k < selected_rows.length; k++) {
                    db += parseFloat(selected_rows[k].data.debit_amount);
                    cr += parseFloat(selected_rows[k].data.credit_amount);

                }
                summ = db - cr;
                labelsum.show();
                labelsum.setValue(summ);
//alert(parseFloat(labelsum.getValue()));
                Math.abs(summ);

            }
        }

    });

    var btnautomatch = new Ext.Button({
        style: 'text-align:center; font-size: 18px; color:red;',
        text: "Auto Match",
        height: 35,
        labelStyle: 'font-size: 18px; color:red;',
        icon: '/KgDenim/Pictures/login.ico',
        listeners: {
            click: function () {

                var sm = Datagridd.getSelectionModel().selectAll();
                var selected_rows = Datagridd.getSelectionModel().getSelections();
                var sm2 = Datagridbank.getSelectionModel().selectAll();
                var selected_rows2 = Datagridbank.getSelectionModel().getSelections();


                for (var j = 0; j < selected_rows2.length; j++) {
                    for (var i = 0; i < selected_rows.length; i++) {

                        var kgdlBankbookkseq2 = selected_rows[i].data.accref_seqno;
                        var voudate = selected_rows[i].data.accref_voudate;
                        var chequeno = selected_rows[i].data.accref_payref_no;
                        var dbamt = selected_rows[i].data.acctran_dbamt;
                        var cramt = selected_rows[i].data.acctran_cramt;
                        var kgdlftype = selected_rows[i].data.Flag;
                        var ccno = 100 + chequeno;

                        var bseq = selected_rows2[j].data.seqno;
                        var valuedate = selected_rows2[j].data.value_date;
                        var cno = selected_rows2[j].data.cheque_no;
//if(cno==='' || cno===null){cno=0;}
                        var debitamt = selected_rows2[j].data.debit_amount;
                        var creditamt = selected_rows2[j].data.credit_amount;
                        var bankcode = selected_rows2[j].data.bank_code;
                        var party = selected_rows2[j].data.particulars;
                        var bankftype = selected_rows2[j].data.Flag;
                        var rescheque = cno.substr(-6);
                        var newcno = party.split("~");

                        var newcheque2 = newcno[1];
			//var newcheque=newcheque2.trim();
			var newcheque=newcheque2;

                        var difamntt = parseFloat(debitamt) - parseFloat(cramt);
                        var difamnttrev = parseFloat(creditamt) - parseFloat(dbamt);

                        if (bankcode === '5')
                        {
                            if (parseFloat(rescheque) > 0 && kgdlftype === 'check' && bankftype === 'check')
                            {
                                if (parseFloat(chequeno) === parseFloat(rescheque) && parseFloat(cramt) > 0 && parseFloat(cramt) === parseFloat(debitamt) && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                                if (parseFloat(chequeno) === parseFloat(rescheque) && parseFloat(dbamt) > 0 && parseFloat(dbamt) === parseFloat(creditamt) && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                            } else if (!(chequeno > 0) && parseFloat(cramt) === parseFloat(debitamt) && parseFloat(cramt) !== 0 && valuedate >= voudate && kgdlftype === 'check' && bankftype === 'check')
                            {
                                selected_rows[i].set('bankstatement_seqno', bseq);
                                selected_rows[i].set('Flag', 'Selected');
                                selected_rows[i].set('Flagnew', '✔');
                                selected_rows[i].set('cleared_date', valuedate);
                                selected_rows[i].set('difference_amount', difamntt);
                                selected_rows2[j].set('Flag', 'Selected');
                                selected_rows2[j].set('Flagnew', '✔');
                                selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                continue;
                            } else if (!(chequeno > 0) && parseFloat(dbamt) === parseFloat(creditamt) && parseFloat(dbamt) !== 0 && valuedate >= voudate && kgdlftype === 'check' && bankftype === 'check')
                            {
                                selected_rows[i].set('bankstatement_seqno', bseq);
                                selected_rows[i].set('Flag', 'Selected');
                                selected_rows[i].set('Flagnew', '✔');
                                selected_rows[i].set('cleared_date', valuedate);
                                selected_rows[i].set('difference_amount', difamnttrev);
                                selected_rows2[j].set('Flag', 'Selected');
                                selected_rows2[j].set('Flagnew', '✔');
                                selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                continue;
                            }
                        } else if (bankcode === '2')
                        {

                            if (newcheque.length === 8 && kgdlftype === 'check' && bankftype === 'check')
                            {

                                if (parseInt(chequeno) === parseInt(newcheque) && parseFloat(cramt) > 0 && parseFloat(cramt) === parseFloat(debitamt) && valuedate >= voudate)
                                {

                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                                if (parseInt(chequeno) === parseInt(rescheque) && parseFloat(dbamt) > 0 && parseFloat(dbamt) === parseFloat(creditamt) && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                            } else if (newcheque.length === 2 && kgdlftype === 'check' && bankftype === 'check') {

                                if (!(chequeno > 0) && parseFloat(cramt) === parseFloat(debitamt) && parseFloat(cramt) !== 0 && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                } else if (!(chequeno > 0) && parseFloat(dbamt) === parseFloat(creditamt) && parseFloat(dbamt) !== 0 && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamnttrev);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                            } else {

                            }


                        } else
                        {

                            if (parseInt(cno) > 0 && kgdlftype === 'check' && bankftype === 'check')
                            {

                                if (parseInt(chequeno) === parseInt(cno) && parseFloat(cramt) > 0 && parseFloat(cramt) === parseFloat(debitamt) && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                                if (parseInt(chequeno) === parseInt(cno) && parseFloat(dbamt) > 0 && parseFloat(dbamt) === parseFloat(creditamt) && valuedate >= voudate)
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }
                            } else
                            {
                                // chequeno ==='' || isNaN(chequeno)
                                if (!(chequeno > 0) && parseFloat(cramt) === parseFloat(debitamt) && parseFloat(cramt) !== 0 && valuedate >= voudate && kgdlftype === 'check' && bankftype === 'check')
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamntt);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }

                                if (!(chequeno > 0) && parseFloat(dbamt) === parseFloat(creditamt) && parseFloat(dbamt) !== 0 && valuedate >= voudate && kgdlftype === 'check' && bankftype === 'check')
                                {
                                    selected_rows[i].set('bankstatement_seqno', bseq);
                                    selected_rows[i].set('Flag', 'Selected');
                                    selected_rows[i].set('Flagnew', '✔');
                                    selected_rows[i].set('cleared_date', valuedate);
                                    selected_rows[i].set('difference_amount', difamnttrev);
                                    selected_rows2[j].set('Flag', 'Selected');
                                    selected_rows2[j].set('Flagnew', '✔');
                                    selected_rows2[j].set('kgdlbankbookseqno', kgdlBankbookkseq2);
                                    continue;
                                }


                            }


                        }
                    }
                }
            }
        }

    });
    var btnload = new Ext.Button({
        style: 'text-align:center;',
        text: "Load",
        icon: '/KgDenim/Pictures/login.ico',
        listeners: {
            click: function () {
                if (rtype === 'Include')
                {
                    bankstatementstore.load({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                        params: {
                            task: 'selectbankstatement',
                            bankcode: cmbbank.getValue(),
                            pdate: pdate.getValue(),
			    todate: todate.getValue(),
                            reconstatus: '%',
 			    cfromdate: clearedfromdate.getValue(),
			    ctodate: clearedtodate.getValue(),
				
                        },
                        callback: function () {
                            var cnt = bankstatementstore.getCount();

                            if (cnt > 0) {


                            } else
                            {
                                //  Ext.MessageBox.alert("Alert", "Bank Statement Not Found.");
                            }
                        }
                    });


                    bankbookstore.load({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                        params: {
                            task: 'selectbankbook',
                            bankcode: cmbbank.getValue(),
                            pdate: pdate.getValue(),
			    todate: todate.getValue(),
			    reconstatus: '%',
			    cfromdate: clearedfromdate.getValue(),
			    ctodate: clearedtodate.getValue(),
				
                        },
                        callback: function () {
                            var cnt = bankbookstore.getCount();
                           // alert(cnt);
                            /*
                             if (cnt > 0) {
                             for (var i = 0; i < cnt; i++) {
                             Datagridd.getStore().insert(
                             Datagridd.getStore().getCount(),
                             new dgrecord({
                             Flagnew: "□",
                             // Flagnew: "✔",
                             accref_voudate: bankbookstore.getAt(i).get('accref_voudate'),
                             accref_vouno: bankbookstore.getAt(i).get('accref_vouno'),
                             led_name: bankbookstore.getAt(i).get('led_name'),
                             accref_payref_no: bankbookstore.getAt(i).get('accref_payref_no'),
                             accref_payref_date: bankbookstore.getAt(i).get('accref_payref_date'),
                             acctran_dbamt: bankbookstore.getAt(i).get('acctran_dbamt'),
                             acctran_cramt: bankbookstore.getAt(i).get('acctran_cramt'),
                             //  type: bankbookstore.getAt(i).get('type')
                             })
                             );
                             }
                             } else
                             {
                             Ext.Msg.alert("Alert", "KGDL Bank Book Data Not Found");
                             }
                             */
                        }
                    });
                } else if (rtype === 'Exclude')
                {
                    bankstatementstore.load({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                        params: {
                            task: 'selectbankstatement',
                            bankcode: cmbbank.getValue(),
                            pdate: pdate.getValue(),
			    todate: todate.getValue(),
                            reconstatus: 'check'
                        },
                        callback: function () {
                            var cnt = bankstatementstore.getCount();
                            //   alert(cnt);
                            if (cnt > 0) {

                            } else
                            {
                                Ext.Msg.alert("Alert", "Bank Statement Not Found");
                            }
                        }
                    });


                    bankbookstore.load({
                        url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                        params: {
                            task: 'selectbankbook',
                            bankcode: cmbbank.getValue(),
                            pdate: pdate.getValue(),
		            todate: todate.getValue(),
                            reconstatus: 'check'
                        },
                        callback: function () {
                            var cnt = bankbookstore.getCount();
//alert(cnt);
                        }
                    });
                }

            }
        }
    });
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 7500,
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
                            actionType = "Add";
                            showenable();
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
                            update();
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
                            LOGFormWindow.hide();
                        }
                    }
                }
            ]
        },
        items: [Datagridd, Datagridbank, Partygrid,
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 350,
                y: 10,
                border: false,
                items: [txtid]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 322,
                width: 320,
                x: 450,
                y: -10,
                border: false,
                items: [lbl]
            },
            {
                xtype: 'fieldset',
                layout: 'absolute',
                title: 'Bank Details',
                labelWidth: 80,
                x:160,
                y: 40,
                height: 145,
                width: 800,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: 0,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [ast1]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 30,
                        width: 210,
                        x: 10,
                        y: 0,
                        border: false,
                        items: [cmbbank]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        x: 210,
                        y: -10,
                        width: 25,
                        border: false,
                        items: [act2]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 180,
                        x: 220,
                        y: 0,
                        border: false,
                        items: [pdate]
                    },
			 {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 45,
                        width: 180,
                        x: 400,
                        y: 0,
                        border: false,
                        items: [todate]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Reconciliation Type',
                        layout: 'absolute',
                        labelWidth: 300,
                        width: 750,
                        height: 60,
                        x: 10,
                        y: 50,
                        border: true,
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 1150,
                                x: -10,
                                y: -10,
                                border: false,
                                items: [recontype]
                            },
			{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 95,
                        width: 210,
                        x: 150,
                        y: -10,
                        border: false,
                        items: [clearedfromdate]
                    },
			 {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 85,
                        width: 210,
                        x: 360,
                        y: -10,
                        border: false,
                        items: [clearedtodate]
                    }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 150,
                        labelWidth: 10,
                        x: 580,
                        y: 0,
                        border: false,
                        allowblank: false,
                        items: [btnload]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 150,
                        labelWidth: 60,
                        x: 660,
                        y: 5,
                        border: false,
                        allowblank: false,
                        items: [chstatus]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 150,
                labelWidth: 10,
                x: 980,
                y: 90,
                border: false,
                allowblank: false,
                items: [btnautomatch]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 300,
                width: 300,
                x: 175,
                y: 175,
                border: false,
                items: [lblbankstatement]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 300,
                width: 350,
                x: 790,
                y: 175,
                border: false,
                items: [lblkgdlbook]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                width: 170,
                x: 0,
                y: 590,
                border: false,
                items: [labelsum]
            }



        ]
    });


    function load() {
        bankstore.load({
            url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
            params: {
                task: 'selectbankmaster'
            }
        });


    }


    var LOGFormWindow = new Ext.Window({
        height: 750,
        width: 1180,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 60,
        items: [FormPanel],
        title: 'Bank Reconciliation',
        layout: 'absolute',
        border: false,
        draggable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        listeners: {
            show: function () {
                monthstore.load({
                    url: '/DPM/Financials/CashandBank/Bank_Reconciliation/classfile.php',
                    params: {
                        task: 'selectMonth'
                    }
                });
                load();
            }
        }
    });
    LOGFormWindow.show();
});


