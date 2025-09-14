Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

    var GinUser = localStorage.getItem('ginusername');
    var GinFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');


   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));
   var  invfin = localStorage.getItem('invfin');

    var gstrcpttype;
    var gstPaytype;

    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";

    var ledgercode = 0;

var voufound = 0; 

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
                  CashPaymentEntryWindow.hide();

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

    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
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
function add_btn_click()
{


         //       flxDetail.getStore().removeAll();
                flxAdjustDetails.getStore().removeAll();

                var gstInsert = "true";
                if (ledgercode == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Payment", "Select Ledger");
                }
                if (txtAccountName.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Payment", "Select Ledger");
                }


                if (txtAccountName.getRawValue() == cmbHeadAccount.getRawValue()) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Payment", "Select Different Ledger");
                }



                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq == ledgercode) {
                        cnt = cnt + 1;
                    }
                }
                if (gstInsert == "true")
                {
                   if (gridedit === "false")
                   { 

		        if (cnt > 0){
		            gstInsert = "true";
                            cnt = 0;
		       //     Ext.MessageBox.alert("Receipt","This Ledger Already Entered");
		        }
                   }
                   if (gridedit === "true")
                   {


			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
	 		sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
			sel[idx].set('ledseq'  , ledgercode);
			sel[idx].set('ledtype' , ledtype);
           		sel[idx].set('narration' , txtRemarks.getRawValue().toUpperCase());
			flxDetail.getSelectionModel().clearSelections();
			gridedit = "false";
                        CalcTotalDebitCredit();
                        txtAccountName.setValue('');
                        txtRemarks.setValue('');
                        txtDebit.setValue('');

                           BillAdjustingDetail();

                          getAdjustmentDetails2();
              
                       //    txtAccountName.focus();
	            }//if(gridedit === "true")
                    else
                    if  (cnt ==0){
                       if (gstInsert == "true") {
                           var totamt;
                           var RowCnt = flxDetail.getStore().getCount() + 1;
                           flxDetail.getStore().insert(
                             flxDetail.getStore().getCount(),
                             new dgrecord({
                                slno: RowCnt,
                                ledname  : txtAccountName.getRawValue(),
                 
                                dbamt    : Number(txtDebit.getRawValue()),
                                cramt    : 0,
                                ledseq   : ledgercode,
                                ledtype  : ledtype,
                                narration : txtRemarks.getRawValue().toUpperCase(),
                             })
                            );
                           txtDebit.setRawValue('');
                           txtAccountName.setRawValue('');   
                           txtRemarks.setValue('');
                           CalcTotalDebitCredit();
                           BillAdjustingDetail();

                          getAdjustmentDetails2();
                        flxLedger.hide();
                        txtAccountName.focus();
                      }
                   }
//                   txtAccountName.setRawValue('');    
//                   ledgercode = 0;   
               }
}


    function Password() {
		   if (txtpass.getRawValue() === "ca") {
                        Ext.getCmp('editid').setVisible(true);
                    } else {
                        Ext.getCmp('editid').setVisible(false);
                    }
    }

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

 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsCashPayment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_ref','cust_type'
      ]),
    });

function LedgerSearch()
{
      ledgercode = 0;
        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsCashPayment.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}



var txtAccountName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                 if (ledgercode == 0)
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
                    flxLedger.getEl().setStyle('z-index','10000');
                ledgercode = 0;
                loadSearchLedgerListDatastore.removeAll();
                if (txtAccountName.getRawValue().trim() != '')

                    flxLedger.show();
                    LedgerSearch();
            }
         }  
    });


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		ledgercode = selrow.get('cust_code');
		ledtype    = selrow.get('cust_type');

	//				txtAccountName.setValue(selrow.get('cust_code'));
		txtAccountName.setValue(selrow.get('cust_ref'));
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
        id : flxLedger,
        x: 15,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
                   'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
                                   grid_chk_flxLedger();
                                }
                             });
                     },   
                   'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                          grid_chk_flxLedger();
                },

    
   }
   });

    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashPayment.php',      // File to connect to
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
'acctrail_crdays','invh_crd_days', 'invh_grace_days','rate_payterm_30days_cdamt', 'rate_payterm_60days_cdamt1' , 'rate_payterm_60days_cdamt2','invwt','invh_taxableamt','rate_cashdisc_per','invh_cgst_per','invh_sgst_per',
'invh_igst_per','invh_frt_amt'])
    });



function getAdjustmentDetails()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
//   flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsCashPayment.php',
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
               BillAdjustingDetail();
               getAdjustmentDetails2();

              }   
              else
              {
     //       	    Ext.getCmp("optAdv").setValue(true);
     //               gstPaytype === "AD";              
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
           url: 'clsCashPayment.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {

               for(var j=0; j<cnt; j++) 
               {
  
                        invoiceno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invno');
                        adjusted = Number(LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjamount'));
	                invdate  = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invdate');

		        invamt  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_inv_value');
		        crdays  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_crdays');

		        voutype =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvoutype');

		        accrefseqno =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjseqno');
		        accrefvouno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvouno');

                        rowadjusted = 0;  
                        rowpending= 0;  
                        var PendAmount = Number(invamt); //- Number(adjusted);

			flxAdjustDetails.getSelectionModel().selectAll();
			var selrows = flxAdjustDetails.getSelectionModel().getCount();
			var sel = flxAdjustDetails.getSelectionModel().getSelections();
                        reccount = 0;   
			for (var i = 0; i < selrows; i++) {
			        if (sel[i].data.invno == invoiceno ) {

		                    rowadjusted = Number(sel[i].data.adjamt) + adjusted  ;
		                    rowpending = Number(sel[i].data.pendingamt) + adjusted  ;
		                    sel[i].set('adjamt', rowadjusted);
		                    sel[i].set('pendingamt', rowpending);
		                    reccount = reccount+1;
				}
                        }

		        if  (reccount == 0 )
		        {  



		                flxAdjustDetails.getStore().insert(
		                        flxAdjustDetails.getStore().getCount(),
		                        new dgadjrecord({
		                            invno: invoiceno,
		                            invdate: invdate,
		                            invamt: invamt,
		                            dbcramt: invamt,
		                            pendingamt: PendAmount,
		                            adjamt: adjusted,
		                            voutype: voutype,
		                            balamt:  PendAmount,
		                            Narrate: "",
		                            accrefseqno: accrefseqno,
		                            accrefvouno: accrefvouno,
		                        })
	 	                        );
	                      CalcSum();
		       }
	                      CalcSum();
		}



        CalcSum();


              }   
              else
              {
                    if (gstFlag == "Edit")
                    {
    //           	    Ext.getCmp("optAdv").setValue(true);
       //             gstPaytype === "AD";              
                    }
              }   
          }
      });  
}   



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


  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        finenddate = "03/31/" + gstfinyear.substring(5, 9);

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
    


    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCPVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','cust_type', 'led_custcode','acctran_narration'])
    });



    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Cash.Account',
        id: 'lblHeadAcnt',
        width: 50,
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


    var lblVouNo = new Ext.form.Label({
        fieldLabel: 'Vou. No.',
        id: 'lblVouNo',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblVouDate = new Ext.form.Label({
        fieldLabel: 'Vou.Date',
        id: 'lblVouDate',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var HeadAccountdatastore = new Ext.data.Store({
        id: 'HeadAccountdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbcashacct"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
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


    var headcode = 0;

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: HeadAccountdatastore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbHeadAccount',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
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
        columns: 1,
        rows :2,
        id: 'optPayType',
        layout: 'hbox',
        width: 185,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "OptType"},
        items: [
            {boxLabel: 'Against Bill', id: 'optBill', inputValue: 1,checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";

                        }
                    }
                }
            },
            {boxLabel: 'Advance', id: 'optAdv', inputValue: 2, 
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

    var dateon;
    var getdate;



    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 110,
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
                      voufound = 0;
     //                 Ext.getCmp('editchk').show();
                      flxDetail.getStore().removeAll();

     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashPayment.php',
	                   params: {
			        task: 'LoadCPVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                                
            //                  txtVouNo.setRawValue(cmbVouNo.getRawValue());
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {

//txtAccountName.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('cust_name'));
//txtDebit.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('acctran_dbamt'));
                                  voufound = 1;
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      if (Number(LoadVouNoDetailsdatastore.getAt(j).get('led_grp_code')) == 70)
                                        cmbHeadAccount.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'));
                                      else                                             
                                        ledgercode = LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code');




                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),                          				                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),
                                             narration : LoadVouNoDetailsdatastore.getAt(j).get('acctran_narration'),
	                                  })
                                      );
                                  }
                CalcTotalDebitCredit();
                getAdjustmentDetails();
            EditDateCheck();
                              }  
//
if (voufound == 0)
{

   	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashPayment.php',
	                   params: {
			        task: 'LoadCPVoucherDetails_2',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                                
                              txtVouNo.setRawValue(cmbVouNo.getRawValue());
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {

                                  for(var j=0; j<cnt; j++) 
                                  {

                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';

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
	                                  })
                                      );
                                  }
                CalcTotalDebitCredit();
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
        fieldLabel: 'Ledger Name',
        id: 'lblAccount',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadAllLedgerList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });

    var acccode = 0;
    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 400,
        store: Ledgerdatastore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtDebit.focus();
             }
          },
	    keyup: function () {
                loadSearchLedgerListDatastore.removeAll();
                  if (txtAccountName.getRawValue() != '')
                     LedgerSearch();
            },
            select: function () {
                acccode = cmbAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('cust_type');
                      }
		});

            }, blur: function () {
                acccode = cmbAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('cust_type');
                      }
		});

            }
        }
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var Currencydatastore = new Ext.data.Store({
        id: 'Currencydatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
	readOnly:true,	
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
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmt',
        width: 70,
        name: 'Amount',
        disabled: true,

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
        fieldLabel: 'Payment',
        id: 'lblDebit',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDebit',
        width: 100,
        name: 'Debit',
        disabled: false,
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRemarks.focus();
             }
          },
        }

    });


      var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 70,
        x: 940,
        y: 25,
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
        text: "Del",
        width: 40,
        x: 720,
        y: 30,
        handler: function () {
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
            if (flxDetail.getStore().getCount() >= 1) {
                BillAdjustingDetail();
            } else {
                flxAdjustDetails.getStore().removeAll();
            }
        }
    });

    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'AccountDetDataStore'
        }, ['slno', 'ledname', 'currency', 'amount', 'exgrate', 'type', 'dbamt', 'cramt', 'ledseq', 'curseq', 'totamt'])
    });

    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 90,
        width: 900,
        x: 0,
        y: 0,
        columns: [
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 120, align: 'right'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left' , hidden: true},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Narration", dataIndex: 'narration', sortable: true, width: 300, align: 'left', hidden: false}
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'CP ENTRY',
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
//                    cmbAccountName.setValue(selrow.get('ledseq'));
                    ledgercode = selrow.get('ledseq');
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
        fieldLabel: 'Total Debit', readOnly: true,
        id: 'txtTotDebit',
        width: 100,
        name: 'TotDebit',
        readOnly : true,
    });



    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 110,
        name: 'RefNo',
        style: {textTransform: "uppercase"},
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'29'},
        listeners: {
            change: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            },
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpRefDate.focus();
             }
            }  
        }
    });

    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefDate',
        name: 'RefDate',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        listeners: {

             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtNarration.focus();
             }
          }
        }
    });

    var txtPayAmt = new Ext.form.NumberField({
        fieldLabel: 'Payment Amount',
        id: 'txtPayAmt',
        width: 80,
        name: 'PayAmt'
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',
        width: 60,
       store: [[1, 'CHQ'], [2, 'DD'], [3, 'NEFT']],
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
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var PaymentAdjBillDetdatastore = new Ext.data.Store({
        id: 'PaymentAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getpayadjbilldet"}, // this parameter asks for listing
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'dbcramt', 'totamt', 'pendingamt', 'adjamt', 'voutype', 'balamt',
            'accrefseqno', 'accrefvouno'])
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
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'left' },
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 60, align: 'left' , hidden : 'true'},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left' , hidden : 'true' },
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
                                if (Number(txtTotNetAmt.getRawValue()) < Number(txtPayAmt.getRawValue())) {
                                    if (Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
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
                        UpdatePaymentBillsAdjusted();
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
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left', hidden: false}
        ]
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted ',
        id: 'txtTotNetAmt', readOnly: true,
        readOnly:true,
                width: 80,
        name: 'TotNetAmt'
    });

    var lblNarration = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarration',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtNarration = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtNarration',
        width: 600,
        height: 40,
        name: 'Narration',
        style: {textTransform: "uppercase"},
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'498'},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }


    });


    var tabCashPayment = new Ext.TabPanel({
        id: 'tabCashPaymentDetail',
        bodyStyle: {"background-color": "#fffffe"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        xtype: 'tabpanel',
        activeTab: 0,
        height: 565,
        width: 1350,
        items: [
            {
                xtype: 'panel',
                title: 'Payment Details',
                bodyStyle: {"background-color": "#fffffe"},
                style: {
                    'color': 'blue',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                layout: 'absolute',
                items: [


                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 1100,
                        height: 75,
x: 10,
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
                                items: [lblVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [txtVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [cmbVouNo]
                            },
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 180,
                                y: 0,
                                border: false,
                                items: [lblVouDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 180,
                                y: 20,
                                border: false,
                                items: [dtpVouDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 310,
                                y: 0,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 300,
                                y: 20,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 180,
                                height: 70,
                                x: 680,
                                y: -10,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [optPayType]
                            },

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 300,
                                x: 850,
                                y: 15,
                                border: false,
                                items: [txtUserName]
                            },


                        ]
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



                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 1300,
                        height: 410,
                        x: 10,
                        y: 87,
                        border: true,
                        style       : 'padding:0px',
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
//                                items: [cmbAccountName]
                                items: [txtAccountName]
                            }, 


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 430,
                                x: 470,
                                y: -5,
                                border: false,
                                items: [lblDebit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 440,
                                y: 17,
                                border: false,
                                items: [txtDebit]
                            },  btnAdd, // btnRemove,



                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 150,
                        x: 620,
                        y: -5,
                        border: false,
                        items: [lblRemarks]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 400,
                        x: 550,
                        y: 17,
                        border: false,
                        items: [txtRemarks]
                    },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 1000,
                                x: 0,
                                y: 50,
                                border: false,
                                items: [flxDetail]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 300,
                                x: 950,
                                y: 60,
                                border: false,
                                items: [txtRefNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 215,
                                x: 950,
                                y: 90,
                                border: false,
                                items: [dtpRefDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 250,
                                x: 620,
                                y: 150,
                                border: false,
                                items: [txtTotDebit]
                            },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 10,
                                y: 140,
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
                                y: 160,
                                border: false,
                                items: [txtNarration]
                            },

                         {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 230,
                                width: 150,
                                x: 10,
                                y: 210,
                                border: false,
                                items: [lblAdjustingDoc]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 850,
                                x: 10,
                                y: 230,
                                border: false,
                                items: [flxAdjustDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 400,
                                x: 150,
                                y: 370,
                                border: false,
                                items: [txtTotNetAmt]
                            }, flxLedger,


                        ]
                    },
/*
                      { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 60,
		                width       : 150,
		                x           : 120,
		                y           : 300,
		                border      : false,
		                items: [txtpass]
		            },
*/

                ]
            },
/*
            {
                xtype: 'panel',
                title: 'Other Details',
                layout: 'absolute',
                bodyStyle: {"background-color": "#fffffe"},
                style: {
                    'color': 'white',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
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
                                y: 60,
                                border: false,
                                items: [txtPayAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                bodyStyle: {"background-color": "#fffffe"},
                                style: {
                                    'color': 'white',
                                    'style': 'Helvetica',
                                    'font-size': '15px', 'font-weight': 'bold'
                                },
                                width: 465,
                                height: 115,
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

                        ]
                    }
                ]
            }
*/
        ]
    });


 function edit_click()
 {
        gstFlag = "Edit";
        cmbVouNo.show();
	Voucherdatastore.load({
	    url: '/SHVPM/Accounts/clsAccounts.php',
	    params:
	    {
		task: "cmbvoucher",
		finid: GinFinid,
		voutype: 'CHP',
		compcode: GinCompcode
	    }
	});
}

 function save_click()
 {
                CalcSum();



                var rcnt = flxDetail.getStore().getCount();
                var fromdate;
		var crdr=Number(txtTotDebit.getRawValue());
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
                } 
                else if (rcnt == 0) {
                    Ext.MessageBox.alert("Alert", "Check Payment Amount and Enter Key in Receipt Amount");
                } 
               else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                    Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                } else if (rcnt <= 0) {
                    Ext.MessageBox.alert("Payment", "Transactions Details Not Available ..");
                } else if (cmbHeadAccount.getValue() == 0) {
                    Ext.MessageBox.alert("Payment", "Select the Head of Account");
                } else if ( Number(txtTotNetAmt.getRawValue()) <= 0 && gstPaytype == "BB") {
                    Ext.MessageBox.alert("Payment", "You have selected Bill to Bill mode & no bills are adjusted");
//                } else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
//                    Ext.MessageBox.alert("Payment", "You have to select Bill to Bill mode in order to adjust bills");
                } else if (crdr <= 0) {
                    Ext.MessageBox.alert("Payment", "check details!");
                } 
else if (Number(txtTotNetAmt.getRawValue()) > Number(txtTotDebit.getRawValue()) ) {
	    Ext.MessageBox.alert("Payment", "Adjusted Amout is heigh then Payment amount");
	} 
          else {
                    Ext.Msg.show({
                        title: 'Payment Voucher',
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
                                var accadjData = flxAdjustDetails.getStore().getRange();
                                var accadjupdData = new Array();
                                Ext.each(accadjData, function (record) {
                                    accadjupdData.push(record.data);
                                });
                                Ext.Ajax.request({
                                    url: 'FrmTrnCashPaymentSave.php',
                                    params: {
                                        griddet: Ext.util.JSON.encode(accupdData),
                                        gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                        finid: GinFinid,
                                        finyear: gstfinyear,
                                        compcode: GinCompcode,
                                        accrefseq: seqno,
                                        vouno: txtVouNo.getRawValue(),

                                        voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                        bankname: txtBankName.getRawValue(),
                                        refno: txtRefNo.getRawValue(),
                                        refdate: Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
                                        narration: txtNarration.getRawValue(),
                                        paytype: gstPaytype,
                                        paymode: cmbPaymode.getRawValue(),
                                        payno: txtNo.getRawValue(),
                                        paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        headacct: headcode,
                                        rcptamt: Number(txtTotDebit.getRawValue()),
                                        totadjamt: Number(txtTotNetAmt.getRawValue()),
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
                                        if (obj['success'] == "true") {

/*                                            Ext.Msg.show({
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
*/
//				    CashPaymentEntryFormPanel.getForm().reset();
				    flxLedger.getStore().removeAll();
				    flxDetail.getStore().removeAll();
				    flxAdjustDetails.getStore().removeAll();

				    RefreshGridData();
                   		    RefreshData();
                                    Ext.MessageBox.alert( 'Cash Payment saved with Voucher No -' + obj['vouno']);


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


    var totalval;
    var CashPaymentEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Cash Payment Entry',
        bodyStyle: {"background-color": "#3399CC"},
        header: false,
        width: 1300,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashPaymentEntryFormPanel',
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
                    tooltip: 'Add Details...', hidden: true,
                    height: 40,
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
                             cmbVouNo.setRawValue('CHP/');
                             edit_click();
                        }
                    }
                }, '-',



                {
                    text: 'Save',
                    id: 'save',
                    style: 'text-align:center;', //hidden: true,
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
               listeners: {
                  click: function() {
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
				var docno = "&seqno=" + encodeURIComponent(seqno);

				var param =(compcode+fincode+docno);
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
                                  RefreshGridData() 
                        }
                    }
                }, '-',
                {
                    text: 'View',
                    style: 'text-align:center;', hidden: true,
                    tooltip: 'View Details...',
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
                            CashPaymentEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            tabCashPayment
        ]
    });

    function RefreshData() {

        Ext.getCmp('editchk').hide();
        Ext.getCmp('save').setDisabled(false);  
        voufound = 0;
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        gstFlag = "Add";
        txtRefNo.setValue("");
        txtDebit.setValue("");
   //     txtCredit.setValue("");
        txtRefNo.setValue("");
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        cmbAccountName.setValue("");
        txtTotDebit.setValue("");

        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        txtAmt.setValue("");
        txtExgRate.setValue("");
        Ext.getCmp('optBill').setValue(true);
        Ext.getCmp('optAdv').setValue(false);
        gstPaytype = "BB";
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");

        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        gstrcpttype = "CASH PAYMENT";
    //    cmbCurrency.setRawValue('INR');
        cmbType.setRawValue('Dr');
        headcode = '2139';
        cmbVouNo.hide();
				const input = document.getElementById('dtpVouDate');
				const end = input.value.length;
				input.setSelectionRange(0,0);
				input.focus();
    }

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
        txtTotDebit.setValue(gindbtotal);
  
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
    }

    function BillAdjustingDetail() {
        if (flxDetail.getStore().getCount() == 1 && gstPaytype == "BB") {
            var ginledcode = flxDetail.getStore().getAt(0).get('ledseq');
            flxAdjustDetails.getStore().removeAll();
/*
            OpeningBillDetdatastore.removeAll();
            OpeningBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
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

*/


            PaymentAdjBillDetdatastore.removeAll();
            PaymentAdjBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getpayadjbilldet",
                            finid: GinFinid,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = PaymentAdjBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {
                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invamt: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    adjamt:0, 
                                    dbcramt: PaymentAdjBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('dbcr_invvalue')),
                                    pendingamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    voutype: PaymentAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
                                    balamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    accrefseqno: PaymentAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: PaymentAdjBillDetdatastore.getAt(i).get('accref_vouno')
                                })
                                );
                    }
                    CalcSum();
       //             RefreshGridData();
                }
            });
        } else if (flxDetail.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtPayAmt.getRawValue())) {
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
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                } else {

                }
            }

        }
        txtTotNetAmt.setValue(ginadjtotal);
    }

    function UpdatePaymentBillsAdjusted() {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                } else {
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {
            selrow.set('adjamt', selrow.get('pendingamt'));
            CalcSum();
        } else {
            if (Number(txtTotNetAmt.getRawValue()) < Number(txtPayAmt.getRawValue())) {
                if (Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();
            }
        }
    }

    function RefreshGridData() {
        cmbAccountName.setValue("");
        gstFlag = "Add";
        dtpVouDate.focus();
        flxLedger.hide();

        gstrcpttype = "CASH PAYMENT";
        gstPaytype = "BB";

        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode  : GinCompcode,
                         
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); 
                     cmbHeadAccount.setValue(2139);
                     }
        });



	    VouNodatastore.load({
		url: '/SHVPM/Accounts/clsAccounts.php',
		params:
		{
		    task: "LoadLastVouNo",
		    finyear: GinFinid,
		    compcode: GinCompcode,
		    voutype : 'CHP'
		},
		callback: function(){

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


		             vno =  "CHP/"+vno.slice(-4);  
		             vno = vno.trim() +'/'+ invfin; 
		             txtVouNo.setValue(vno);
		          }
		          else
		          {
		              txtVouNo.setRawValue("CHP"+VouNodatastore.getAt(0).get('con_value'));

		          } 
		}
	    });

        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "LoadAllLedgerList",
                        compcode: GinCompcode
                    },
                     callback : function() {  

			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
                     }
        });
        cmbHeadAccount.setValue(2139);
        headcode = '2139';
        cmbVouNo.hide();

			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();

    }

    var CashPaymentEntryWindow = new Ext.Window({
        width: 1350,
        height: 600,
        y: 25,
        items: CashPaymentEntryFormPanel,
        bodyStyle: {"background-color": "#3399CC"},
        title: 'Cash Payment Entry',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
         onEsc:function(){
},
        listeners: {
                 


            show: function () {
                gstFlag = "Add";
		RefreshGridData(); 
                curcode = 1;
                txtUserName.setRawValue(GinUser);   
     //           Ext.getCmp('optBill').setValue(true);
//                Ext.getCmp('optAdv').setValue(false);
                Ext.getCmp('editchk').hide();
                cmbType.disable();


            }
        }
    });
    CashPaymentEntryWindow.show();
});

