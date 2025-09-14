/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
     var GinUser = localStorage.getItem('ginusername');
    var GinFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var  invfin = localStorage.getItem('invfin');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');  

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });

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
    var gstPaytype = "BB";
    var ginAmountbal;
    var pdb_recpay_seqno;
    var pst_ledprefix;
    var dgrecord = Ext.data.Record.create([]);
    var dgrecord1 = Ext.data.Record.create([]);

    var dgadjrecord = Ext.data.Record.create([]);
    var fm = Ext.form;

    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";


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

    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";



new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                if (gstFlag == "Edit")
                {

		Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
		    if (btn == 'ok'){
			txtReason.setRawValue(text)
 
		    }
		});
                } 

                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  CashReceiptEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);




    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 400,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });


function save_click()
{
                            CheckNoValidateDataStore.removeAll();
                            CheckNoValidateDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
                                params: {
                                    task: 'CheckNoValidate',
                                    chkno: txtmodeNo.getRawValue(),
                                    headled: cmbHeadAccount.getValue()
                                },
                                callback: function () {
                                    var cntnew = CheckNoValidateDataStore.getAt(0).get('cnt');
                                    if (cntnew <= 0) {
                                        var rcnt = flxDetail.getStore().getCount();
                                        var fromdate;
                                        var todate;
                                        fromdate = "04/01/" + gstfinyear.substring(0, 4);
                                        todate = "03/31/" + gstfinyear.substring(5, 9);
                                        if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length <5  )  )
                                        {
                                          Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setRawValue(text)
		                        save_click();
				    }
				});
                                         }
                                        else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                                        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                                        } else if (cmbHeadAccount.getRawValue() === '') {
                                            Ext.MessageBox.alert("Payment", "Select the Head of Account");
                                        } else if (rcnt <= 0) {
                                            Ext.MessageBox.alert("Payment", "Transactions Details Not Available ..");
                                        } else if (cmbHeadAccount.getValue() <= 0) {
                                            Ext.MessageBox.alert("Payment", "Select the Head of Account");
                                        } else if (txtTotAdjAmt.getRawValue() <= 0 && gstPaytype === "BB") {
                                            Ext.MessageBox.alert("Payment", "You have selected Bill to Bill mode & no bills are adjusted");
                                        } else if (txtTotAdjAmt.getRawValue() > 0 && gstPaytype === "AD") {
                                            Ext.MessageBox.alert("Payment", "You have to select Bill to Bill mode in order to adjust bills");
                                        } else if (txtTotDebit.getRawValue() <= 0 && txtTotCredit.getRawValue() <= 0)                                      {
                                            Ext.MessageBox.alert("Payment", "Invalid Debit/Credit Amt!");

                                        } else if (Number(txtTotAdjAmt.getRawValue())>txtTotDebit.getRawValue() )                                      {
                                            Ext.MessageBox.alert("Payment", "Adjusted Amt is greater than Debit Amt!");
                                        } 

                                         else {
                                            Ext.MessageBox.show({
                                                title: 'Confirmation',
                                                icon: Ext.Msg.QUESTION,
                                                buttons: Ext.MessageBox.YESNO,
                                                msg: 'Do u want to Save',
                                                fn: function (btn) {
                                                    if (btn === 'yes') {


                                                        var accData = flxDetail.getStore().getRange();
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
                                                            url: 'FrmTrnBankPaymentSave.php',
                                                            params: {
                                                                griddet: Ext.util.JSON.encode(accupdData),
                                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                                finid: GinFinid,
                                                                finyear: gstfinyear,
                                                                compcode: GinCompcode,
                                                                accrefseq: seqno,
                                                                vouno: txtVouNo.getRawValue(),
                                                                voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                                refno: txtRefNo.getRawValue(),
                                                                refdate: Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
                                                                narration: txtNarration.getRawValue(),
                                                                user: txtNameuser.getRawValue(),
                                                                paytype: gstPaytype,
                                                                bankname: txtBankName.getRawValue(),
                                                                paymode: cmbPaymode.getRawValue(),
                                                                payno: txtmodeNo.getRawValue(),
                                                                paydate: Ext.util.Format.date(dtpmodeDate.getValue(), "Y-m-d"),
                                                                headacct: cmbHeadAccount.getValue(),
                                                                rcptamt: Number(txtTotDebit.getRawValue()) - Number(txtTotCredit.getRawValue()),
                                                                totadjamt: Number(txtTotAdjAmt.getRawValue()),
                                                                usercode : GinUserid, 
                                                                reason   : txtReason.getRawValue(),
                                                                flagtype: gstFlag,
                                                                cnt: accData.length,
                                                                adjcnt: accadjData.length,
  
                                                                finsuffix :invfin,
                                                            },
                                                            callback: function (options, success, response)
                                                            {
                                                                var obj = Ext.decode(response.responseText);
                                                                if (obj['success'] === "true") {

                                                                    RefreshData();
                                                                    Ext.Msg.show({
                                                                        title: 'Saved',
                                                                        icon: Ext.Msg.QUESTION,
                                                                        buttons: Ext.MessageBox.YESNO,
                                                                        msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                                        fn: function (btn) {
                                                                            if (btn === 'yes') {
                                                                                RefreshData();
                                                                            } else {
                                                                                RefreshData();
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
  
function edit_click()
{
    gstFlag = "Edit";
    cmbVouNo.show();
	Voucherdatastore.load({
	    url: '/SHVPM/Accounts/clsAccounts.php',
	    params:
	    {
		task: "cmbvoucher",
		finid    : GinFinid,
		compcode : GinCompcode,
		voutype  :'BKP',
	    }
	});
}

    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBillAdjustmentDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['ref_slno', 'ref_docseqno', 'ref_docno', 'ref_docdate', 'ref_adjseqno', 'ref_adjvouno', 'ref_invno', 'ref_invdate', 'ref_adjamount', 'ref_paymt_terms', 'ref_adj_days', 'ref_adj_by', 'ref_adjusted_on',
'acctrail_accref_seqno' , 'acctrail_inv_value',  'acctrail_led_code','acctrail_crdays','ref_adjvoutype',
'acctrail_crdays','invh_crd_days','acctrail_adj_value','accref_vou_type' ])
    });


function add_btn_click()
{
                var gstInsert = "true";
/*
                if (gstPaytype === "BB") {
                    txtDebit.setRawValue("");
                    flxDetail.getStore().removeAll();
                    val = "";
                    var RowCnt = flxAdjustDetails.getStore().getCount();
                    flxAdjustDetails.getSelectionModel().selectAll();
                    var sel1 = flxAdjustDetails.getSelectionModel().getSelections();
                    for (var j = 0; j < RowCnt; j++)
                    {
                        val = Number(val) + Number(sel1[j].data.Adjusted);
                    }
                    txtDebit.setRawValue(val);
                    txtTotAdjAmt.setRawValue(val);
                }
*/

      if (gstPaytype === "BB") {
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
      } 
                flxDetail.getSelectionModel().selectAll();
                var selro = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
/*
                for (var t = 0; t < selro; t++) {
                    if (sel[t].data.ledname === txtAccountName.getRawValue())
                    {
                        cnt = cnt + 1;
                    }
                }
*/                
              
                if (txtAccountName.getRawValue() === "") {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Select Account Name");


                } else if (txtDebit.getValue() === 0 || txtDebit.getRawValue() === "" )  {
                    gstInsert = "false";
                    Ext.Msg.alert("Alert", "Enter the debit Amount");
//                } else if (cnt > 0) {
//                    gstInsert = "false";
//                    Ext.MessageBox.alert("Financials", "Details for this account already added");
                }
                if (grpcodetds == 65000) {
                    if ((txttdstax.getRawValue() === "" || txttdstax.getValue() == 0) ) {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Financials", "Enter Tds Percentage!");
                    } else if ((txttdstaxVAL.getRawValue() === "" || txttdstaxVAL.getValue() == 0)=== "Cr") {
                        gstInsert = "false";
                        Ext.MessageBox.alert("Financials", "Enter Tds Value!");
                    }
                }



     

                if (gstInsert === "true")
                {
                   if (gridedit === "false")
                   { 
                        if (cnt > 0) {
                            gstInsert = "false";
                            Ext.MessageBox.alert("Receipt", "This Ledger Already Entered");
                        }
                  }

                  if (gridedit === "true")
                  {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
	 		sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
			//sel[idx].set('ledseq'  , txtAccountName.getValue());
sel[idx].set('ledseq'  , ledgercode);
         		sel[idx].set('totamt'  , Number(txtDebit.getRawValue()) + Number(txtCredit.getRawValue()));
			sel[idx].set('ledtype' , ledtype);
			sel[idx].set('narration' , txtRemarks.getRawValue().toUpperCase());
			flxDetail.getSelectionModel().clearSelections();
                        txtAccountName.setValue('');
                        txtDebit.setValue('');
                        txtRemarks.setValue('');
                        CalcTotalDebitCredit();
                        Bill_details();
	          }//if(gridedit === "true")
                  else
                      {
	                if (gstInsert === "true") {
                        var RowCnt = flxDetail.getStore().getCount() + 1;
                        flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                    ledname: txtAccountName.getRawValue(),

                                    dbamt: Number(txtDebit.getRawValue()),
                                   cramt: '0',
                                  //  ledseq: txtAccountName.getValue(),
			            ledseq   : ledgercode,
                                    totamt: Number(txtDebit.getRawValue())+ Number(txtCredit.getRawValue()),
                                    tdsper: Number(txttdstax.getRawValue()),
                                    tdsvalue: Number(txttdstaxVAL.getRawValue()),
                                    ledtype : ledtype,
                                    narration : txtRemarks.getRawValue().toUpperCase(),

                                })
                                );
                        txtAccountName.setValue('');
                        txtDebit.setValue('');
                        CalDebitCreditTot();
                        Bill_details();
                       getAdjustmentDetails2();
//                        txtDebit.setRawValue('')
                        txttdstax.setValue('');
                        txtRemarks.setValue('');

                        txttdstaxVAL.setValue('');
                        txttdstax.hide();
                        txttdstaxVAL.hide();
                        lblTDSVAL.hide();
                        lblTDS.hide();
                        flxLedger.hide();
                        txtAccountName.focus();

                            
                }
             }

}
}

/*
 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankPayment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name'
      ]),
    });

function itemSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsBankPayment.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}

*/
var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankPayment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_type'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsBankPayment.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		ledgercode = selrow.get('cust_code');
		ledtype    = selrow.get('cust_type');
		txtAccountName.setValue(selrow.get('cust_name'));
                txtDebit.focus() 
                flxLedger.hide();   


	}
}

var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        //id : flxLedger,
        x: 15,
        y: 130,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                      grid_chk_flxLedger();
		},

                   'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
                                   grid_chk_flxLedger();
                                }
                             });
                     },
 
    
   }
   });
    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBPVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','cust_type', 'led_custcode' ,'led_grp_code','acctran_narration'])
    });




    var LoadBankNameDetailsdatastore = new Ext.data.Store({
        id: 'LoadBankNameDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBPNameDetail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['acctran_led_code'])
    });



    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbvoucher"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
          {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
//        sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });

    var chkremark = new Ext.form.Checkbox({
        name: 'Remark',
        boxLabel: 'Remark',
        id: 'chkremark',
        checked: false,
        width: 80,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    remarkfun();
                } else if (checked === false) {
                    txtNarration.setRawValue("");
                }
            }
        }
    });


    function remarkfun() {
        Caladj();
//        txtRefBills.setRawValue('');
        txtNarration.setRawValue("");
        flxAdjustDetails.getSelectionModel().selectAll();
        var selrows = flxAdjustDetails.getSelectionModel().getCount();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        gstbillnos = "";
        narra = '';
        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.adjamt) > 0) {
                narra = narra + sel[i].data.Narrate;
                gstbillnos = gstbillnos + sel[i].data.invno + "/";
            }
        }
   //     txtRefBills.setRawValue(gstbillnos);
        txtNarration.setRawValue("PAYMENT VIDE BY " + txtBankName.getRawValue() + " - " + cmbPaymode.getRawValue() + " No. " + txtRefNo.getRawValue() +   "  Dated : " + dtpRefDate.getRawValue() + "      " + "RefNo:" + gstbillnos  );
    }

    function Caladj() {

        flxAdjustDetails.getSelectionModel().selectAll();
        var selrows = flxAdjustDetails.getSelectionModel().getCount();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        totadjamtvalue = 0;
        for (var i = 0; i < selrows; i++) {

            if (Number(sel[i].data.Adjusted) > 0) {
                totadjamtvalue = Number(totadjamtvalue) + Number(sel[i].data.Adjusted);
            }
        }
        txtTotAdjAmt.setValue(totadjamtvalue);
    }


    var HeadAccountNameDataStore = new Ext.data.Store({
        id: 'HeadAccountNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "cmbbankacct"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ])
    });


   var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'},
            {name: 'cust_type', type: 'string', mapping: 'cust_type'},
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


    var LoadAllLedgerListDataStore = new Ext.data.Store({
        id: 'LoadAllLedgerListDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "LoadAllLedgerList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Party_code', type: 'int', mapping: 'cust_code'},
            {name: 'Party_Name', type: 'string', mapping: 'cust_name'}
        ])
    });



    var CurBalance1DataStore = new Ext.data.Store({
        id: 'CurBalance1DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            'acctran_exch_rate', 'acctran_pass_no', 'acctran_paytype', 'cust_name'
        ])
    });

    var AccountRefTrailDataStore = new Ext.data.Store({
        id: 'AccountRefTrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/datechk.php',
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            'dbcr_finid','dbcr_type'
        ])
    });

    var CurBalanceDataStore = new Ext.data.Store({
        id: 'CurBalanceDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
    var dbcr_typenew;


    function Bill_details() {
//alert(txtAccountName.getValue())

     if (flxDetail.getStore().getCount() == 1 && gstPaytype === "BB") {
        var ginledcode = flxDetail.getStore().getAt(0).get('ledseq');
        PaymentBilldetailsDataStore.removeAll();
        PaymentBilldetailsDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'PaymentBilldetails',
                accname: ginledcode, // txtAccountName.getValue(),
                gincompany: GinCompcode,
                finid: GinFinid
            },
            callback: function () {
                var cnt1 = PaymentBilldetailsDataStore.getCount();

//			alert(GinCompcode);
//			alert(txtAccountName.getValue());
//		alert(cnt1);

                if (cnt1 > 0) {
                    for (var i = 0; i < cnt1; i++) {
                        acctrail_inv_value = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_value');
                        if (acctrail_inv_value > 0) {
                            acctrail_inv_value = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_value');
                            acctrailadjvalue = PaymentBilldetailsDataStore.getAt(i).get('acctrail_adj_value');
                            acctrailinvno = PaymentBilldetailsDataStore.getAt(i).get('acctrail_inv_no');
                            dbcr_typenew = PaymentBilldetailsDataStore.getAt(i).get('dbcr_type');


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
				if(dbcr_typenew==="DN"){
                                Dncn = Ext.util.Format.number(Number(acctrail_inv_value) - Number(dbcrvalue),'0.00');
                                totamt = Ext.util.Format.number(Number(acctrail_inv_value) - Number(acctrailadjvalue),'0.00');
				}else if(dbcr_typenew==="CN"){
                                Dncn = Ext.util.Format.number(Number(acctrail_inv_value),'0.00');
                                totamt = Ext.util.Format.number(Number(acctrail_inv_value) - Number(acctrailadjvalue),'0.00');
				}else {
                                Dncn = Ext.util.Format.number(Number(acctrail_inv_value) - Number(dbcrvalue),'0.00');
                                totamt = Ext.util.Format.number(Number(acctrail_inv_value) - Number(acctrailadjvalue),'0.00');
				}
                                accref_credamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_cramt');
                                accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
/*
                                if (accref_credamt > 0) {
                                    accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
                                } else
                                {
                                    accref_vou_type = "AD";
                                }
*/
                                accref_seqno = PaymentBilldetailsDataStore.getAt(i).get('accref_seqno');
                                accrefvouno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                                flxAdjustDetails.getStore().insert(
                                        flxAdjustDetails.getStore().getCount(),
                                        new dgrecord1({
                                            InvNo: acctrailinvno,
                                            InvDate: acctrail_inv_date,
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

				if(dbcr_typenew==="DN"){
                                Dncn = Ext.util.Format.number(Number(acctran_totamt) - Number(dbcrvalue),'0.00');
				}else if(dbcr_typenew==="CN"){
                                Dncn = Ext.util.Format.number(Number(acctran_totamt),'0.00');
				}else {
                                Dncn = Ext.util.Format.number(Number(acctran_totamt) - Number(dbcrvalue),'0.00');
				}

                            totamount = PaymentBilldetailsDataStore.getAt(i).get('acctran_totamt');
                            accref_credamt = PaymentBilldetailsDataStore.getAt(i).get('acctran_cramt');

                            accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
/*
                            if (accref_credamt > 0) {
                                accref_vou_type = PaymentBilldetailsDataStore.getAt(i).get('accref_vou_type');
                            } else
                            {
                                accref_vou_type = "AD";
                            }
*/
                            accref_seqno = PaymentBilldetailsDataStore.getAt(i).get('accref_seqno');
                            accrefvouno = PaymentBilldetailsDataStore.getAt(i).get('accref_vouno');
                            flxAdjustDetails.getStore().insert(
                                    flxAdjustDetails.getStore().getCount(),
                                    new dgrecord1({
                                        InvNo: acctrailinvno,
                                        InvDate: acctrail_inv_date,
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
                else
                {
                   alert("Bill Details not found for this ledger...");
                } 
            }
        });
  }
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
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'CurBalance',
                accname: txtAccountName.getValue(),
                gincompany: GinCompcode,
                ginfinid: GinFinid
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
        var RowCnt = flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel1 = flxDetail.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {

            gintotDebitval = gintotDebitval + Number(sel1[j].data.dbamt);
            gintotCreditval = gintotCreditval + Number(sel1[j].data.cramt);
        }
        txtTotDebit.setValue(gintotDebitval);
        txtTotCredit.setValue(gintotCreditval);
    }


    function CalTotalBilladjusted()
    {
        Ext.getCmp('chkremark').setValue(false);
        txtNarration.setRawValue("");
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
//        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        txtTotAdjAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (rec.get('voutype') !== 'AD') {
                if (Number(rec.get('Adjusted')) > 0 && i !== rownum) {
                    txtTotAdjAmt.setValue(Number(txtTotAdjAmt.getRawValue()) + Number(rec.get('Adjusted')));
                }
            }
        }
        if (selrow.get('voutype') !== 'AD') {

            if (Number(txtTotAdjAmt.getRawValue()) < Number(txtTotDebit.getRawValue())) {
                if (Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()) > selrow.get('PendAmount') && selrow.get('PendAmount') > 0) {
                    selrow.set('Adjusted', selrow.get('PendAmount'));
                } else if (selrow.get('PendAmount') > 0) {
                    selrow.set('Adjusted', Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()));
                } else {
                    selrow.set('Adjusted', 0);
                }
                selrow.set('balamt', selrow.get('PendAmount') - selrow.get('Adjusted'));
                CalcSum();
            }
        }
/*
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        var gstbillnos = "";
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()) - Number(txtTotCredit.getRawValue()));
  //      txtDebit.setValue("");
        txtTotAdjAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {

 alert("1 Test");
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('Adjusted')) > 0 && i !== rownum) {
                if (rec.get('Type') !== 'AD') {
//                    txtTotAdjAmt.setValue(Number(txtTotAdjAmt.getRawValue()) + Number(rec.get('Adjusted')));
//                    txtDebit.setValue(Number(txtDebit.getRawValue()) + Number(rec.get('Adjusted')));
//                    gstbillnos = gstbillnos + rec.get('InvNo') + "/";
 alert("Test");
            if (Number(txtTotAdjAmt.getRawValue()) < Number(txtTotDebit.getRawValue())) {
 alert("Test - 1");
                if (Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()) > selrow.get('PendAmount') && selrow.get('PendAmount') > 0) {
 alert("Test - 2");
                    selrow.set('Adjusted', selrow.get('PendAmount'));
                } else if (selrow.get('PendAmount') > 0) {
                    selrow.set('Adjusted', Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()));
                } else {
                    selrow.set('Adjusted', 0);
                }
                selrow.set('balamt', selrow.get('PendAmount') - selrow.get('Adjusted'));
                CalcSum();
            }
                } else {
                }
            }
        }
        if (selrow.get('Type') === 'AD') {

        } else {
            selrow.set('Adjusted', selrow.get('PendAmount'));
            CalcSum();
        }
*/
    }




    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Head.Account',
        id: 'lblHeadAcnt', hidden: true,
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblPayMode = new Ext.form.Label({
        fieldLabel: 'Payment Mode',
        id: 'lblPayMode',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var lblRefNo = new Ext.form.Label({
        fieldLabel: 'Ref.No.',
        id: 'lblRefNo',
        width: 80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblRefDate = new Ext.form.Label({
        fieldLabel: 'Ref. Date.',
        id: 'lblRefDate',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var lblBank = new Ext.form.Label({
        fieldLabel: 'Party Bank Name.',
        id: 'lblBank',
        width: 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var lblVouNo = new Ext.form.Label({
        fieldLabel: 'Vou. No.',
        id: 'lblVouNo',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblVouDate = new Ext.form.Label({
        fieldLabel: 'Vou.Date',
        id: 'lblVouDate',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Bank.Account',
        id: 'lblHeadAcnt', 
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtVouNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtVouNo',
        width: 110,
        name: 'txtVouNo',
        readOnly : 'true',
        enableKeyEvents: true,
        listeners: {

        }
    });


    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 115,
        store: Voucherdatastore,
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbVouNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners:{
           select: function(){
  //                     Ext.getCmp('editchk').show();

    	               LoadBankNameDetailsdatastore.removeAll();
     	               LoadBankNameDetailsdatastore.load({
                           url: 'clsBankPayment.php',
	                   params: {
			        task: 'LoadBPNameDetail',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadBankNameDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                               cmbHeadAccount.setValue(LoadBankNameDetailsdatastore.getAt(0).get('acctran_led_code'));
                              }

                          }    
                      });

                      flxDetail.getStore().removeAll();
                       LoadVouNoDetailsdatastore.removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsBankPayment.php',
	                   params: {
			        task: 'LoadBPVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
                                headled: cmbHeadAccount.getValue()
	                  },
		          callback: function () {

        RefreshGridData();
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtNarration.setValue("");
        txtTotAdjAmt.setValue("");


                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
//txtAccountName.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('cust_name'));
//txtDebit.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('acctran_dbamt'));
                                  for(var j=0; j<cnt; j++) 
                                  {
                                      ledgercode = LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code');
                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');

                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      txtBankName.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_bank_name'));
                                      cmbPaymode.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_paymode'));
                                      var drcr = '';
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';




                    if (Number(LoadVouNoDetailsdatastore.getAt(j).get('led_grp_code')) != 28)
                                      {
                                     ledtype = LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),               
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),                          				                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : ledtype,
                                             narration : LoadVouNoDetailsdatastore.getAt(j).get('acctran_narration'),

	                                  })
                                      );
                                     }     
                                  }
                CalcTotalDebitCredit();
                getAdjustmentDetails();
                EditDateCheck();

                              }  
                          }
                      });  
            }    
        }

    });

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: HeadAccountNameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
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
                    if (cmbHeadAccount.getRawValue() === txtAccountName.getRawValue()) {
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
                    if (cmbHeadAccount.getRawValue() === txtAccountName.getRawValue()) {
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
        title: '',
        layout: 'vbox',
        width: 135,
        height: 70,
        border: false,
        x: 20,
        y: 15,
        items: [{
                xtype: 'radiogroup',
		columns: 1,
		rows :2,
                id: 'optTypeDep',
                items: [
                    {
                        boxLabel: 'Against Bills',
                        name: 'optType',
                        id: 'optBill',
                        inputValue: 1,

                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    gstPaytype = "BB";
                                    txtNameuser.hide();
                                    flxAdjustDetails.getStore().removeAll();
                                     Bill_details();
//                                    RefreshData();
                                }
                            }
                        }
                    },
                    {
                        boxLabel: 'Advance/Others',
                        name: 'optType',
                        inputValue: 2,
                        id: 'optAdv',
                        checked: true,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    gstPaytype = "AD";
                                     txtTotAdjAmt.setRawValue(0) 
                                    txtNameuser.show();
                                     flxAdjustDetails.getStore().removeAll();
  //                                  RefreshData();
                                }
                            }
                        }
                    }
                ]
            }]
    });


  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinNewDays+1))
        {     
             alert("You are Not Allowed to Raise the document in the date of " +  Ext.util.Format.date(dt_voucher,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the document in Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Document Date is not in current finance year. Please check");
    }

 }


  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinEditDays+1))
        {     
             alert("You are Not Allowed to Modify this document. Contact HOD for Corrections.." );
             Ext.getCmp('save').setDisabled(true);  
        }
        else
        {
             Ext.getCmp('save').setDisabled(false);  

        }       
 }




    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
        }  	
        
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
        ;
        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
//        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
    }




/*
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
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'AccRef',
                        vocno: this.getValue()
                    },
                    callback: function () {
                        rs_accref = AccRefDataStore.getCount();
                        if (rs_accref > 0) {
                            dtpVouDate.setRawValue(AccRefDataStore.getAt(0).get('accref_voudate'));
                            txtBankName.setRawValue(AccRefDataStore.getAt(0).get('accref_bank_name'));
                            cmbPaymode.setValue(AccRefDataStore.getAt(0).get('accref_paymode'));
                            txtRefNo.setValue(AccRefDataStore.getAt(0).get('accref_payref_no'));
                            dtpRefDate.setRawValue(AccRefDataStore.getAt(0).get('accref_payref_date'));
                            txtNarration.setRawValue(AccRefDataStore.getAt(0).get('accref_narration'));

                            AccRefSeqnoDataStore.load({
                                url: '/SHVPM/Accounts/clsAccounts.php',
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
                                            Ext.getCmp("optBill").setValue(false);
                                            Ext.getCmp("optAdv").setValue(true);
                                        } else {
                                            Ext.getCmp("optBill").setValue(true);
                                            Ext.getCmp("optAdv").setValue(false);
                                        }
                                        var acctran_led_code = AccRefSeqnoDataStore.getAt(0).get('acctran_led_code');
                                        if (acctran_led_code < cmbHeadAccount.getRawValue() && acctran_led_code > cmbHeadAccount.getRawValue()) {
                                            var led_name = AccRefSeqnoDataStore.getAt(0).get('cust_name');
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
                                            var RowCnt = flxDetail.getStore().getCount() + 1;
                                            flxDetail.getStore().insert(
                                                    flxDetail.getStore().getCount(),
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
                                        flxDetail.getSelectionModel().selectAll();
                                        var selro = flxDetail.getSelectionModel().getCount();
                                        var sele = flxDetail.getSelectionModel().getSelections();
                                        var cnt = 0;
                                        for (var t = 0; t < selro; t++) {
                                            if (sele[t].data.AccName == txtAccountName.getRawValue())
                                            {
                                                cnt = cnt + 1;
                                            }
                                        }
                                        if (cnt > 1) {
                                            RecPayDataStore.load({
                                                url: '/SHVPM/Accounts/clsAccounts.php',
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
                                                url: '/SHVPM/Accounts/clsAccounts.php',
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
                                url: '/SHVPM/Accounts/clsAccounts.php',
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
*/



    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Ledger Name',
        id: 'lblAccount',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var grpcodetds = 0;

   /* var txtAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 350,
        store: LoadAllLedgerListDataStore,
        displayField: 'Party_Name',
        valueField: 'Party_code',
        hiddenName: 'Party_Name',
        id: 'txtAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER && txtAccountName.getRawValue() != '' )
             {
              
                   txtDebit.focus();
             }
          },

            blur: function () {
//alert(txtAccountName.getValue());
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: txtAccountName.getValue(),
		            },
                    callback: function () {
                            var cnt  = findLedgerdatastore.getCount();
                            if (cnt > 0)
                            {
                            ledtype =  findLedgerdatastore.getAt(0).get('cust_type');
                            }
//alert(ledtype);
                      }
		});


                if (txtAccountName.getRawValue() !== "") {
                    if (cmbHeadAccount.getRawValue() === txtAccountName.getRawValue()) {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Same Head Account and AccName!',
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    txtAccountName.setRawValue("");
                                    txtAccountName.focus();
                                } else {
                                    txtAccountName.setRawValue("");
                                    txtAccountName.focus();
                                }
                            }
                        });
                    } else {
                        txtDebit.setRawValue("");
                        txtCredit.setRawValue("");
                        curbal_payment();
                        if (gstPaytype === "BB") {
                            flxAdjustDetails.getStore().removeAll();
    //                        Bill_details();
                        } else {
                            flxAdjustDetails.getStore().removeAll();
                        }
                        grpcodetds = 0;
/*
                        txttdstax.setValue('');
                        txttdstaxVAL.setValue('');
                        TdsLedgergetDataStore.removeAll();
                        TdsLedgergetDataStore.load({
                            url: '/SHVPM/Accounts/datechk.php',
                            params: {
                                task: 'TdsLedgerget',
                                ledger: txtAccountName.getValue()
                            },
                            callback: function () {
                                grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                                if (grpcodetds === '65') {
                                    txttdstax.setValue('');
                                    txttdstaxVAL.setValue('');
                                    txttdstax.show();
                                    txttdstaxVAL.show();
                                    lblTDSVAL.show();
                                    lblTDS.show();
                                    Ext.getCmp('txttdstax').focus(true, 1);
                                } else {
                                    txttdstax.setValue('');
                                    txttdstaxVAL.setValue('');
                                    txttdstax.hide();
                                    txttdstaxVAL.hide();
                                    lblTDSVAL.hide();
                                    lblTDS.hide();
    
                                }
                            }
                        });

                    }
                }
            }
        }
    });

*/
var txtAccountName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtDebit.focus();

                 if (ledgercode == 0 && txtAccountName != '' )
                 {    
                    alert("Select Ledger Name ...");
                    txtAccountName.focus();
                 }
                 else
                 {    
                   txtDebit.focus();
                 } 

             }
             if (e.getKey() == e.ESC)
             {

                   flxLedger.hide();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },

	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                flxLedger.getEl().setStyle('z-index','10000');
                ledgercode = 0;
                loadSearchLedgerListDatastore.removeAll();
                  if (txtAccountName.getRawValue() != '')
                  {    
                     flxLedger.show();
                     LedgerSearch();
                  }   
            }
         }  
    });


    var lblAmt = new Ext.form.Label({
        fieldLabel: 'Amount', hidden: true,
        id: 'lblAmt',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
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

                txtCredit.enable();
                txtDebit.disable();
                txtDebit.setValue('');
            }
        }
    });


    var lblRemarks = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblRemarks',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtRemarks = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtRemarks',
        width: 350,
        name: 'txtRemarks',
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'59'},
	style      :"border-radius: 5px;textTransform: uppercase; ", 	
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  add_btn_click();
             }       
             },
    //        blur: function () {
//                add_btn_click();
//            }
          }
    });


    var lblDebit = new Ext.form.Label({
        fieldLabel: 'Debit',
        id: 'lblDebit',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDebit',
        width: 100,
        name: 'Debit',
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRemarks.focus();
             }       
             },
    //        blur: function () {
//                add_btn_click();
//            }
          }
    });

    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Credit',
        id: 'lblCredit',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',
        width: 100,
        name: 'Credit'
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Submit",
        width: 80,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {

                add_btn_click();


            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Remove",
        width: 60,
        listeners: {
            click: function () {
                var sm = flxDetail.getSelectionModel();
                var selrow = sm.getSelected();
                flxDetail.getStore().remove(selrow);
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var gintotqty = 0;
                var gintotcred = 0;
                for (var i = 0; i < selrows; i++) {
                    gintotqty = gintotqty + sel[i].data.dbamt;
                    gintotcred = gintotcred + sel[i].data.cramt;
                }
                txtTotDebit.setValue(gintotqty);
                txtTotCredit.setValue(gintotcred);
            }
        }
    });

    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 100,
        width: 850,
        x: 0,
        y: 0,
        columns: [
            {header: "Acc.Name", dataIndex: 'ledname', sortable: true, width: 380, align: 'left'},
            {header: "Type", dataIndex: 'Type', sortable: true, width: 70, align: 'left', hidden: true},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 110, align: 'right'},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 110, align: 'right', hidden: true },
            {header: "acctran_led_code", dataIndex: 'ledseq', sortable: true, width: 110, align: 'left', hidden: true},
            {header: "acctran_cur_code", dataIndex: 'acctran_cur_code', sortable: true, width: 110, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'right', hidden: true},
            {header: "tdsper", dataIndex: 'tdsper', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "tdsvalue", dataIndex: 'tdsvalue', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Narration", dataIndex: 'narration', sortable: true, width: 300, align: 'left', hidden: false}

        ],
        store: [],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
                    gridedit = "true";
		    editrow  = selrow;
                    txtAccountName.setRawValue(selrow.get('ledname'));
                   // txtAccountName.setValue(selrow.get('ledseq'));
                    ledgercode = selrow.get('ledseq');
                    txtCredit.setValue(selrow.get('cramt'));
                    txtDebit.setValue(selrow.get('dbamt'));
                    ledtype =  selrow.get('ledtype');
                    txtRemarks.setValue(selrow.get('narration'));
                    flxDetail.getSelectionModel().clearSelections();

		}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
         CalcTotalDebitCredit();
             }
        });         
    }
   }

    });

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Total Debit',
        id: 'txtTotDebit', readOnly: true,
        width: 120,
        name: 'TotDebit'
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit',
        id: 'txtTotCredit', readOnly: true,
        width: 80,
        name: 'TotCredit'
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtRefNo',
        width: 140,
        name: 'RefNo',
       autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'29'},
    });

    var txtAmtbalance = new Ext.form.NumberField({
        fieldLabel: 'Balance Amount ',
        id: 'txtAmtbalance',
        readOnly: true,
        width: 150,
        name: 'AmountBalance',
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblAmtbal = new Ext.form.Label({
        fieldLabel: '',
        id: 'lblAmtbal',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtBankName',
        width: 150,
        name: 'BankName',
        listeners: {
            focus: function () {
/*
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
*/
            }
        }
    });


    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 80,
        store: [[1, 'NEFT'] , [2, 'RTGS'], [3, 'CHQ'], [4, 'DD']],

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
        fieldLabel: 'No',
        id: 'txtmodeNo',
        width: 60,
        name: 'No'
    });


    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpRefDate',
        name: 'RefDate',
        format: 'd-m-Y',
        value: new Date(),
	//value: '2020-03-31',
        anchor: '100%'
    });



    var dtpmodeDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpmodeDate',
        name: 'Date',
        format: 'Y-m-d',
        value: new Date(),
	//value: '2020-03-31',
        anchor: '100%'
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',
        id: 'lblAdjustingDoc',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 150,
        width: 900,
        x: 0,
        y: 0,
        columns: [
            {header: "VOU No", dataIndex: 'Vocno', sortable: true, width: 80, align: 'left'},
            {header: "Inv.No", dataIndex: 'InvNo', sortable: true, width: 100, align: 'left'},
            {header: "Date", dataIndex: 'InvDate', sortable: true, width: 85, align: 'left'},
            {header: "Inv.Amount", dataIndex: 'InvAmt', sortable: true, width: 100, align: 'left'},
            {header: "DN/CN", dataIndex: 'DNCN', sortable: true, width: 75, align: 'left', hidden: true},
            {header: "Total Amount", dataIndex: 'TotAmt', sortable: true, width: 100, align: 'left', hidden: true},
            {header: "Pending Amount", dataIndex: 'PendAmount', sortable: true, width: 100, align: 'left'},
            {header: "Adjusted", dataIndex: 'Adjusted', sortable: true, width: 100, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                     focus: function () {

                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('Adjusted')));
                            txtTotAdjAmt.setValue(Number(txtTotAdjAmt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {

                            CalcSum();
                        },
                        keyup: function () {

                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
                            pendingamt = Number(selrow.get('PendAmount'));
                            if (Number(this.getRawValue()) > Number(pendingamt)) {
                                Ext.MessageBox.alert(" Payment ", "Adjusted amount cannot be greater than pending amount");
                                this.setValue("0");
                                selrow.set('Adjusted', "0");
                                CalcSum();
                            } else {
                                if (Number(txtTotAdjAmt.getRawValue()) < Number(txtTotDebit.getRawValue())) {
                                    if (Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtTotDebit.getRawValue()) - Number(txtTotAdjAmt.getRawValue()));
                                    }
                                } else {
                                    this.setValue("");
                                }
                            }
                        }
/*

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
                            txtTotAdjAmt.setValue(Number(txtTotAdjAmt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {
                            CalcSum();
                        }

*/
                    }
                },
                listeners: {
                    click: function () {
//                        flxDetail.getStore().removeAll();
//                        txtTotDebit.setRawValue('');
//                        txtTotCredit.setRawValue('');

                        CalTotalBilladjusted();
                    }
                }
            },

            {header: "Balance", dataIndex: 'Balance', sortable: true, width: 100, align: 'left',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.Adjusted) > 0) {
                        retval = Number(record.data.PendAmount) - Number(record.data.Adjusted);
                    } else {
                        retval = Number(record.data.PendAmount);
                    }
                    return retval;
                }
            },
            {header: "Type", dataIndex: 'Type', sortable: true, width: 60, align: 'left'},
            {header: "seqno", dataIndex: 'Billseqno', sortable: true, width: 80, align: 'left'},

        ],
        store: []
    });

    var txtPayAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtPayAmt',
        width: 80,
        name: 'PayAmt'
    });

    var txtTotAdjAmt = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted',
        id: 'txtTotAdjAmt',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        name: 'TotNetAmt',
        readOnly : true,
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
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: '',
        id: 'txtNarration',
        width: 650,
        height: 30,
        name: 'Narration',
	style      :"border-radius: 5px;textTransform: uppercase; ", 	
        value: "PAYMENT TO "
    });

    var CheckNoValidateDataStore = new Ext.data.Store({
        id: 'CheckNoValidateDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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



function getAdjustmentDetails()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
//   flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsBankPayment.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {
	       Ext.getCmp("optBill").setValue(true);
               gstPaytype === "BB";	
               Bill_details();
               getAdjustmentDetails2();

              }   
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   


function getAdjustmentDetails2()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;
    flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsBankPayment.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
          },
          callback: function () {
              var cntadj=LoadAdjustmentDetailsdatastore.getCount();


              if (cntadj>0)
              {

               for(var aj=0; aj<cntadj; aj++) 
               {
                reccount = 0;  
                adjvouno = LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_adjvouno');
                invoiceno = LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_invno');
                adjusted = Number(LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_adjamount'));
                invdate  = LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_invdate');

	        invamt  =  LoadAdjustmentDetailsdatastore.getAt(aj).get('acctrail_inv_value');
                invadj  =  LoadAdjustmentDetailsdatastore.getAt(aj).get('acctrail_adj_value');

	        crdays  =  LoadAdjustmentDetailsdatastore.getAt(aj).get('acctrail_crdays');

	        voutype =  LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_adjvoutype');

	        accrefseqno =  LoadAdjustmentDetailsdatastore.getAt(aj).get('ref_adjseqno');
	        adjvoutype =  LoadAdjustmentDetailsdatastore.getAt(aj).get('accref_vou_type');


                pendamt = Number(invamt)  -Number(invadj) + Number(adjusted);
                rowadjusted = 0;  
                rowpending= 0;  

		flxAdjustDetails.getSelectionModel().selectAll();
		var selrows = flxAdjustDetails.getSelectionModel().getCount();


		var sel = flxAdjustDetails.getSelectionModel().getSelections();
		for (var i = 0; i < selrows; i++) {

	
                        if (sel[i].data.InvNo == invoiceno ) {
                            rowadjusted = Number(sel[i].data.Adjusted) + adjusted  ;
                            rowpending = Number(sel[i].data.PendAmount) + adjusted  ;
                            sel[i].set('Adjusted', rowadjusted);
                            sel[i].set('PendAmount', rowpending);
                            reccount = reccount+1;
			}
                 }



		        if  (reccount == 0 )
		        {  

			        flxAdjustDetails.getStore().insert(
	                        flxAdjustDetails.getStore().getCount(),
	                        new dgadjrecord({
                                    Vocno: adjvouno,
	                            InvNo: invoiceno,
	                            InvDate: invdate,
	                            InvAmt: invamt,
		                    TotAmt: 0,
	                            PendAmount:pendamt ,
	                            Adjusted: adjusted ,
	                            Balance:  0,
	                            Billseqno: accrefseqno,
                                    Type : adjvoutype,

	                        })
	                        );
                                CalcSum();
                                reccount == 0; 
		         }

                             CalcSum();

		}



        CalcSum();


              }   
              else
              {
                    if (gstFlag == "Edit")
                    {
               	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
                    }              
              }   
          }
      });  
}   


    var CashBankpaymentFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'PAYMENT-BANK PAYMENT',
        header: false,
        bodyStyle: {"background-color": "#fff0ff"},
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
                    id  : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                                  if (gstFlag == "Edit")
                        {
			Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
			    if (btn == 'ok'){
				txtReason.setRawValue(text)
			    }
			});
                        }      
                            save_click();


                        }
                    }
                }, '-',

//edit
                {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30, hidden: false,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                              cmbVouNo.setRawValue('BKP/');
                              edit_click();
                        }
                    }
                }, '-',

                {
                    text: 'View',
                    id: 'view',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var vouno = "&seqno=" + encodeURIComponent(seqno);

				var param =(compcode+fincode+vouno);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param, '_blank'); 
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
                                labelWidth: 90,
                                width: 300,
                                x: 900,
                                y: 30,
                                border: false,
                                items: [txtUserName]
                            },

            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 67,
                x: 2,
                y: 0,
                border: true,
                layout: 'absolute',
                items: [
 
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: -15,
                                border: false,
                                items: [lblVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 12,
                                border: false,
                                items: [txtVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 12,
                                border: false,
                                items: [cmbVouNo]
                            },
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 135,
                                y: -15,
                                border: false,
                                items: [lblVouDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 130,
                                y: 12,
                                border: false,
                                items: [dtpVouDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 267,
                                y: -15,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 265,
                                y: 12,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 180,
                                height: 80,
                                x: 600,
                                y: -25,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [
                                    optType
                                ]
                            },

                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 170,
                x: 2,
                y: 70,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 180,
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
                                width: 430,
                                x: 0,
                                y: 20,
                                border: false,
//                                items: [txtAccountName]
                                items: [txtAccountName]
                            }, 

                 /*   {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 400,
                        x: 0,
                        y: 20,
                        border: false,
                        items: [txtAccountName]
                    },*/
/*
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
*/
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 400,
                        y: 0,
                        border: false,
                        items: [lblDebit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 250,
                        x: 375,
                        y: 20,
                        border: false,
                        items: [txtDebit]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 550,
                        y: 0,
                        border: false,
                        items: [lblRemarks]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 400,
                        x: 525,
                        y: 20,
                        border: false,
                        items: [txtRemarks]
                    },


/*
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 520,
                        y: 0,
                        border: false,
                        items: [lblCredit]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 250,
                        x: 515,
                        y: 20,
                        border: false,
                        items: [txtCredit]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 650,
                        y: 15,
                        border: false,
                        items: [btnAdd]
                    },
*/
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

/*
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
*/
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 900,
                        x: 0,
                        y: 50,
                        border: false,
                        items: [flxDetail]
                    },



/*
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 250,
                        x: 250,
                        y: 160,
                        border: false,
                        items: [lblAmtbal]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 250,
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
*/
                ]
            },

//*---


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 300,
                        x: 900,
                        y: 200,
                        border: false,
                        items: [txtTotDebit]
                    },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 250,
                x: 0,
                y: 235,
                border: false,
                items: [lblPayMode]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 0,
                y: 255,
                border: false,
                items: [cmbPaymode]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 250,
                x: 160,
                y: 235,
                border: false,
                items: [lblRefNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 180,
                x: 140,
                y: 255,
                border: false,
                items: [txtRefNo]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 250,
                x: 350,
                y: 235,
                border: false,
                items: [lblRefDate]
            },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 55,
                width: 180,
                x: 290,
                y: 255,
                border: false,
                items: [dtpRefDate]
            },
/*
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 250,
                x: 350,
                y: 265,
                border: false,
                items: [txtRecAmt]
            },
*/
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 300,
                x: 530,
                y: 235,
                border: false,
                items: [lblBank]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 290,
                x: 520,
                y: 255,
                border: false,
                items: [txtBankName]
            },
/*
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 30,
                width: 250,
                x: 340,
                y: 290,
                border: false,
                items: [txtNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 30,
                width: 180,
                x: 500,
                y: 290,
                border: false,
                items: [dtpDate]
            },
*/

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 950,
                x: 0,
                y: 285,
                border: false,
                items: [flxAdjustDetails]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 350,
                y: 450,
                border: false,
                items: [txtTotAdjAmt]
            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 300,
                        x: 600,
                        y: 450,
                        border: false,
                        items: [txtAmtbalance]
                    },


               flxLedger,

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 130,
                width: 150,
                x: 0,
                y: 460,
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
                y: 480,
                border: false,
                items: [txtNarration]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                width: 150,
                height: 50,
                x: 650,
                y: 480,
                border: false,
                items: [chkremark]
            },

                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        id : 'editchk',
                        width: 480,
                        height: 80,
                        x: 800,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [


                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 300,
                                width: 250,
                                x: 5,
                                y: -10,
                                border: false,
                                items: [lblReason]
                            },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 5,
                        	width       : 520,
                        	x           : 5,
                        	y           : 15,
                            	border      : false,
                        	items: [txtReason]
                    },


                        ]  
                    },

        ]
    });

    function RefreshGridData() {
        txtDebit.setValue("");

flxLedger.hide();
        txtAccountName.setValue("");
    }




    function CalcSum() {
        var selrows = flxAdjustDetails.getStore().getCount();
        var ginadjtotal = 0;
        var gstbillnos = "";
    //    txtNarration.setRawValue("");
        txtTotAdjAmt.setValue("");
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
        txtTotAdjAmt.setValue(ginadjtotal);
    //    txtDebit.setValue(ginadjtotal);
        if (gstFlag == "Add")
           txtNarration.setRawValue("PAYMENT FOR:" + gstbillnos);


    }


    function RefreshData() {
         Ext.getCmp('save').setDisabled(false);  
         Ext.getCmp('editchk').hide();
        gstFlag = "Add";
        txtRefNo.setValue("");
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtmodeNo.setValue("");
        txtTotDebit.setValue("");
        txtTotCredit.setValue("");
//        cmbVocNo.setValue("");
        RefreshGridData();
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtNarration.setValue("");
        txtTotAdjAmt.setValue("");
        cmbPaymode.setValue('CHQ');
        cmbVouNo.hide();
        gstPaytype = "AD";
        Ext.getCmp("optAdv").setValue(true);
        gstFlag = "Add";
        PaymentType = "BANK PAYMENTS";
        var yearproc = gstfinyear.substring(5, 9);
        dtpVouDate.focus();
        HeadAccountNameDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'cmbbankacct',
                PaymentType: PaymentType,
                compcode: GinCompcode
            },
             callback : function() 
             { 
                HeadAccountNameDataStore.getCount(); 
                cmbHeadAccount.setValue(1653);
             }
        });
        LoadAllLedgerListDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'LoadAllLedgerList',
                compcode: GinCompcode
            },
                     callback : function() {  

			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
                     }
        });

                   VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'BKP'
                        },
                        callback: function(){

                       //     txtVouNo.setRawValue("BKP"+VouNodatastore.getAt(0).get('con_value'));
                                 if (GinFinid >= 24)  
                                  {    
//                                     var vno = VouNodatastore.getAt(0).get('con_value');
                                       if (VouNodatastore.getAt(0).get('con_value') < 10)
                                        {                                              
                                          vno = "00"+VouNodatastore.getAt(0).get('con_value');
                                        }                                      
                                        else
                                        {  
                                             if (VouNodatastore.getAt(0).get('con_value') < 100) 
                                             {                                              
                                              vno = "0"+VouNodatastore.getAt(0).get('con_value');                   
                                             }
                                             else 
                                             {      
                                               vno = VouNodatastore.getAt(0).get('con_value');  
                                             }
                                        } 


                                     vno =  "BKP/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtVouNo.setValue(vno);





                                  }
                                  else
                                  {
                                      txtVouNo.setRawValue("BKP"+VouNodatastore.getAt(0).get('con_value'));
                                  } 

                        }
                    });

        gstPaytype = "AD";

        cmbPaymode.setRawValue("CHQ");

 //       txtCredit.disable();
    }



    var CashBankpaymentWindow = new Ext.Window({
        width: 1300,
        height: 600,
        y: 30,
        items: CashBankpaymentFormPanel,
        bodyStyle: {"background-color": "#fff0ff"},
        title: 'PAYMENT-BANK PAYMENT',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
  onEsc:function(){
},
        listeners:
                {
                    show: function () {
			dtpVouDate.setRawValue(new Date().format('d-m-Y'));
			dtpRefDate.setRawValue(new Date().format('d-m-Y'));
                        txtUserName.setRawValue(GinUser);   
                        RefreshData();

                    }
                }
    });
    CashBankpaymentWindow.show();
});


