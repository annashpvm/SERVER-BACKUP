Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

   var GinUser = localStorage.getItem('ginusername');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

   var  invfin = localStorage.getItem('invfin');

   


    var gstrcpttype;
    var gstPaytype;
    var dateon;
    var getdate;
    var headcode = 0;
    var acccode = 0;
    var ledgercode = 0;

    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";

    var voutype = 'CHR';
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

function add_btn_click()
{
                flxDetail.getStore().removeAll();
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
		            gstInsert = "false";
		            Ext.MessageBox.alert("Receipt","This Ledger Already Entered");
		        }
                   }
                   if (gridedit === "true")
                   {


			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
			sel[idx].set('ledseq'  , ledgercode);
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
			gridedit = "false";
                        CalcTotalDebitCredit();
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
                                cramt    : Number(txtCredit.getRawValue()),
                                dbamt    : 0,
                                ledseq   : ledgercode,

                                ledtype  : ledtype,
                             })
                            );
//                           txtCredit.setRawValue('');
                           CalcTotalDebitCredit();
                           BillAdjustingDetail();
            getAdjustmentDetails2();

                      }
                   }
                   txtRefNo.focus();
//                   txtAccountName.setRawValue('');    
//                   ledgercode = 0;   
               }
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
                  url: 'clsCashReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCRVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','cust_type', 'led_custcode'])
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



 var HeadAccountdatastore = new Ext.data.Store({
      id: 'HeadAccountdatastore',
	//autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"cmbcashacct"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
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


    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsCashReceipt.php',      // File to connect to
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

/* var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsCashReceipt.php',      // File to connect to
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
    });*/
function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsCashReceipt.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}
/*
function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsCashReceipt.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}



var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search Ledger',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchLedgerListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     LedgerSearch();
            }
         }  
    });
*/


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
		txtCredit.focus() 
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
                   txtCredit.focus();
                 } 
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
                flxLedger.show();
                loadSearchLedgerListDatastore.removeAll();
                  if (txtAccountName.getRawValue() != '')
                     LedgerSearch();
            }
         }  
    });


    var txtVouNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtVouNo',
        width: 120,
        name: 'txtVouNo',
        readOnly : 'true',
        enableKeyEvents: true,
        listeners: {

        }
    });


    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Cash.Account',
        id: 'lblHeadAcnt',
        width: 50,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
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

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
	displayField    : 'cust_name',
	valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbHeadAccount',
        typeAhead       : true,
        mode            : 'local',
        store           : HeadAccountdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,

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
            {boxLabel: 'Against Bills', id: 'optBill', inputValue: 1,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";
                                 flxAdjustDetails.getStore().removeAll();
                                 BillAdjustingDetail();
                               
                        }
                    }
                }
            },
            {boxLabel: 'Others', id: 'optAdv', inputValue: 2, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "AD";
                                 flxAdjustDetails.getStore().removeAll();
                        }
                    }
                }
            }
        ]
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


    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashReceipt.php',      // File to connect to
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
'acctrail_crdays',
'invh_crd_days', 'invh_grace_days','rate_payterm_30days_cdamt', 'rate_payterm_60days_cdamt1' , 'rate_payterm_60days_cdamt2','invwt','invh_taxableamt','rate_cashdisc_per','invh_cgst_per','invh_sgst_per',
'invh_igst_per','invh_frt_amt'])
    });


function getAdjustmentDetails()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
       flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsCashReceipt.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
                compcode : GinCompcode,
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
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      })
}
/*
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
           url: 'clsCashReceipt.php',
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
                        invoiceno = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvno');
                        adjusted = Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));

                            invno = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvno');
                            invdate = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvdate');
                            invamt= LoadAdjustmentDetailsdatastore.getAt(j).get('refdnval');
                            dbcramt= LoadAdjustmentDetailsdatastore.getAt(j).get('recpay_amount');
                            totamt= 0;
                            pendingamt= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            adjamt= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            voutype= LoadAdjustmentDetailsdatastore.getAt(j).get('reftype');
                            balamt=  Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            Narrate= "";
                            accrefseqno= LoadAdjustmentDetailsdatastore.getAt(j).get('refinvseqno');
                            accrefvouno=LoadAdjustmentDetailsdatastore.getAt(j).get('refpurchaseno');


                        rowadjusted = 0;  
                        rowpending= 0;  

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
		}

                if  (reccount == 0 )
                {  


                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: invno,
                                    invdate: invdate,
                                    invamt: invamt,
                                    dbcramt: dbcramt,
                                    totamt: 0,
                                    pendingamt: pendingamt,
                                    adjamt: adjamt,
                                    voutype: voutype,
                                    balamt:  balamt,
                                    Narrate: "",
                                    accrefseqno: accrefseqno,
                                    accrefvouno: accrefvouno,
                                })
                                );
   CalcSum();
                    }
   CalcSum();
     


              }   
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   
*/

function getAdjustmentDetails2()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;
  //  flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsCashReceipt.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
                compcode : GinCompcode,
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
//alert(invoiceno);
		        PMT30dayscdamt = LoadAdjustmentDetailsdatastore.getAt(j).get('rate_payterm_30days_cdamt');

                        crddays = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_crd_days');
                        PMT60dayscdamt1 =  LoadAdjustmentDetailsdatastore.getAt(j).get('rate_payterm_60days_cdamt1');
                        PMT60dayscdamt2 =  LoadAdjustmentDetailsdatastore.getAt(j).get('rate_payterm_60days_cdamt2');
                        invwt    =  LoadAdjustmentDetailsdatastore.getAt(j).get('invwt');
                        taxable = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_taxableamt')-LoadAdjustmentDetailsdatastore.getAt(j).get('invh_frt_amt');
                        cdper = LoadAdjustmentDetailsdatastore.getAt(j).get('rate_cashdisc_per');
                        cdvalue = 0;
                        cgstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_cgst_per');
                        cgstamount= 0;
                        sgstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_sgst_per');
                        sgstamount= 0;
                        igstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_igst_per');
                        igstamount= 0;
                        cdamount = 0;


                        rowadjusted = 0;  
                        rowpending= 0;  

			flxAdjustDetails.getSelectionModel().selectAll();
			var selrows = flxAdjustDetails.getSelectionModel().getCount();
			var sel = flxAdjustDetails.getSelectionModel().getSelections();
                        reccount = 0;  
			for (var i = 0; i < selrows; i++) {

			        if (sel[i].data.invno == invoiceno ) {
		                    rowadjusted = Number(sel[i].data.adjamt) + Number(adjusted) ;
		                    rowpending = Number(sel[i].data.pendingamt) + Number(adjusted);
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
		                    invdate2:   Ext.util.Format.date(invdate, "d-m-Y"),

		                    invamt: invamt,
		                    payterms: crdays,
		                    totamt: invamt,
		                    pendingamt: adjusted ,
		                    pendingamt2: adjusted ,
		                    adjamt: adjusted ,
		                    voutype: voutype,
		         //           balamt:  balamt,

		                    accrefseqno: accrefseqno,
		                    accrefvouno: accrefvouno,
                                    PMT30dayscdamt: PMT30dayscdamt,
                                    crddays: crddays,
                                    PMT60dayscdamt1: PMT60dayscdamt1,
                                    PMT60dayscdamt2: PMT60dayscdamt2,
                                    invwt: invwt,
                                    taxable: taxable,
                                    cdper: cdper,

                                    cdvalue : 0,
                                    cgstper  : cgstper,
                                    cgstamount: 0,
                                    sgstper  : sgstper,
                                    sgstamount: 0,
                                    igstper  : igstper,
                                    igstamount: 0,
                                    cdamount: 0,


		                })
		                );



		                CalcSum();
		        }

	                CalcSum();

		}

     


              } 
/*  
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }  
*/ 
          }
      });  
}   


    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 120,
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
  //                    Ext.getCmp('editchk').show();
                       Refresh();
                       seqno = 0;
                       LoadVouNoDetailsdatastore.removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashReceipt.php',
	                   params: {
			        task: 'LoadCRVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                              txtVouNo.setRawValue(cmbVouNo.getRawValue());
                              seqno = cmbVouNo.getValue();
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {





txtAccountName.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('cust_name'));
txtCredit.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('acctran_cramt'));
             


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

                                      ledtype = LoadVouNoDetailsdatastore.getAt(j).get('cust_type');
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),                          				                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),
	                                  })
                                      );
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

   /* var txtAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 400,
        store: Ledgerdatastore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'txtAccountName',
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
                   txtCredit.focus();
             }
          },
            select: function () {
                acccode = txtAccountName.getValue();

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: txtAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('cust_type');
                      }
		});

            }, blur: function () {
                acccode = txtAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: txtAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('cust_type');
                      }
		});
            }
        }
    });*/

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency',
        width: 50,
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });



    var curcode = 0;

 


    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Receipt Amount',
        id: 'lblCredit',
        width: 50,
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',
        width: 90,
        name: 'Credit',
        disabled: true,
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},

        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  add_btn_click();
             }
          }
        }
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 70,
        x: 600,
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
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 0,
        width: 0,
       id: 'my-grid',  
        x: 10,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 60, align: 'left',hidden: true},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 120, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left',hidden: true},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left'},
        ],
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
  ledgercode = selrow.get('ledseq');
                   // ledgercode.setValue(selrow.get('ledseq'));
                    txtCredit.setValue(selrow.get('cramt'));
                    ledtype =  selrow.get('ledtype');
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
        fieldLabel: '',
        id: 'txtTotDebit', readOnly: true,
        width: 80,
        name: 'TotDebit'
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Total Amount',
        id: 'txtTotCredit', readOnly: true,
        width: 80,
        name: 'TotCredit'
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 80,
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

    var txtRecAmt = new Ext.form.NumberField({
        fieldLabel: 'Receipt Amount',
        id: 'txtRecAmt',
        width: 80,
        name: 'RecAmt',
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    //              btnAdd.focus();
                add_btn_click();

             }
          }
     }
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        listeners: {

        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',
        width: 60,
        store: [[1, 'CQ'], [2, 'DD'], [3, 'MT'], [4, 'TT']],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
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
        width: 200,
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var ReceiptAdjBillDetdatastore = new Ext.data.Store({
        id: 'ReceiptAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getrcptadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_comp_code',
            'accref_finid', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_date2','acctrail_inv_value',
            'acctrail_adj_value', 'acctran_cramt', 'acctran_dbamt', 'dbcr_invvalue','acctrail_crdays',
'invh_crd_days', 'invh_grace_days','rate_payterm_30days_cdamt', 'rate_payterm_60days_cdamt1' , 'rate_payterm_60days_cdamt2','invwt','invh_taxableamt','rate_cashdisc_per','invh_cgst_per','invh_sgst_per','invh_igst_per','invh_frt_amt'])
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
            'accrefseqno', 'accrefvouno',
  'acctrail_led_code', 'accref_comp_code', 'accref_finid', 'accref_seqno', 'accref_vouno', 'accref_vou_type',
'invh_crd_days', 'invh_grace_days','rate_payterm_30days_cdamt', 'rate_payterm_60days_cdamt1' , 'rate_payterm_60days_cdamt2'])
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
        width: 800,
        x: 0,
        y: 0,
        columns: [
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 80, align: 'left'},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 90, align: 'left', hidden: true},
            {header: "Date", dataIndex: 'invdate2', sortable: true, width: 90, align: 'center'},
            {header: "P.Terms", dataIndex: 'payterms', sortable: true, width: 70, align: 'centert'},
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'left' },
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 60, align: 'left' , hidden : 'true'},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left', hidden : 'true' },
            {header: "Pending Amt", dataIndex: 'pendingamt', sortable: true, width: 100, align: 'left'},
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
                                if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                                    if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
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
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left'},
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left'},
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left'}
        ]
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'TOTAL ADJUSTED ',readOnly:true,
        id: 'txtTotNetAmt',
        width: 120,
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
        listeners: {

        }
    });


function save_click()
{
			CalcSum();
                        var rcnt = flxDetail.getStore().getCount();


                        var fromdate;
                        var todate;
                        fromdate = "04/01/" + GinYear.substring(0, 4);
                        todate = "03/31/" + GinYear.substring(5, 9);


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
                        else if (rcnt == 0) {
                            Ext.MessageBox.alert("Alert", "Check Receipt Amount and Press Enter Key in the Receipt Amount");
                        } 
                        else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if ( gstPaytype == 'BB' && rcnt <= 0) {
                            Ext.MessageBox.alert("Receipt", "Transactions Details Not Available ..");
                        } else if (cmbHeadAccount.getValue() == 0) {
                            Ext.MessageBox.alert("Receipt", "Select the Head of Account");
                        } else if (txtTotNetAmt.getRawValue() <= 0 && gstPaytype == "BB") {
                            Ext.MessageBox.alert("Receipt", "You have selected Bill to Bill mode & no bills are adjusted");
                        } else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
                            Ext.MessageBox.alert("Receipt", "You have to select Bill to Bill mode in order to adjust bills");
                        } 
else if (Number(txtTotNetAmt.getRawValue()) > Number(txtTotCredit.getRawValue()) ) {
	    Ext.MessageBox.alert("Receipt", "Adjusted Amout is heigh then received amount");
	} 
else {
                            Ext.Msg.show({
                                title: 'Receipt Voucher',
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
                                            url: 'FrmTrnCashReceiptSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                finid: GinFinid,
                                                finyear: GinYear,
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
                                                rcptamt: Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()),
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

/*
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
*/

//				    CashReceiptEntryFormPanel.getForm().reset();
				    flxLedger.getStore().removeAll();
				    flxDetail.getStore().removeAll();
 				    flxAdjustDetails.getStore().removeAll();
                                    RefreshData();
                                    RefreshGridData();

                                    Ext.MessageBox.alert( 'Cash Receipt saved with Voucher No -' + obj['vouno']);
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
					voutype: 'CHR',
					compcode: GinCompcode
				    }
				});

 }


    var tabCashReceipt = new Ext.TabPanel({
        id: 'tabCashReceiptDetail',
        bodyStyle: {"background-color": "#ffffdb"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        xtype: 'tabpanel',
        activeTab: 0,
        height: 565,
        width: 1300,
        items: [
            {
                xtype: 'panel',
                title: 'Receipt Details',
                bodyStyle: {"background-color": "#ffffdb"},
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
                                labelWidth: 90,
                                width: 300,
                                x: 5,
                                y: 25,
                                border: false,
                                items: [txtUserName]
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
                        width: 880,
                        height: 75,
                        x: 240,
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
                                x: 190,
                                y: 0,
                                border: false,
                                items: [lblVouDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 185,
                                y: 20,
                                border: false,
                                items: [dtpVouDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 345,
                                y: 0,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 345,
                                y: 20,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 180,
                                height: 70,
                                x: 700,
                                y: -10,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [
                                    optPayType
                                ]
                            },
/*
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 60,
                                width: 250,
                                x: 550,
                                y: 45,
                                border: false,
                                items: [cmbVouNo]
                            },
*/
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
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 880,
                        height: 400,
                        x: 240,
                        y: 82,
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
                          /*  {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 430,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [txtAccountName]
                            },*/
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

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 440,
                                y: -5,
                                border: false,
                                items: [lblCredit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 130,
                                x: 440,
                                y: 17,
                                border: false,
                                items: [txtCredit]
                            }, // btnAdd, // btnRemove,
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 800,
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
                                width: 150,
                                x: 550,
                                y: 210,
                                border: false,
                                items: [txtTotDebit]
                            },
*/


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 250,
                                x: 0,
                                y: 80,
                                border: false,
                                items: [txtRefNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 215,
                                x: 250,
                                y: 80,
                                border: false,
                                items: [dtpRefDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 10,
                                y: 110,
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
                                y: 130,
                                border: false,
                                items: [txtNarration]
                            },

/*
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 350,
                                x: 500,
                                y: 120,
                                border: false,
                                items: [txtTotCredit]
                            },

*/
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 280,
                                width: 250,
                                x: 0,
                                y: 180,
                                border: false,
                                items: [lblAdjustingDoc]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 850,
                                x: 0,
                                y: 200,
                                border: false,
                                items: [flxAdjustDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 350,
                                x: 0,
                                y: 360,
                                border: false,
                                items: [txtTotNetAmt]
                            },flxLedger,
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


        ]
    });
    var totalval;
    var CashReceiptEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Cash Receipt Entry',
        bodyStyle: {"background-color": "#ffffdb"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 1100,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashReceiptEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
/*
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
*/
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
//save
                    text: 'Save',             
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,id:'save',hidden:false,
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
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshGridData();
                            RefreshData();
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
                            cmbVouNo.setRawValue('CHR/');
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
				var docno = "&seqno=" + encodeURIComponent(seqno);

				var param =(compcode+fincode+docno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param, '_blank'); 
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
                            CashReceiptEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            tabCashReceipt
        ]
    });

    function Refresh() {
        alloweddays = GinNewDays;        
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();

        txtRefNo.setValue("");
        txtRecAmt.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");
        txtAccountName.setValue("");
        txtTotCredit.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        txtCredit.setValue("");
    }


    function RefreshData() {
        Ext.getCmp('editchk').hide();
        gstFlag = "Add";
        Ext.getCmp('save').setDisabled(false);  
        alloweddays = GinNewDays;        
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtRefNo.setValue("");
        txtRecAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");
        txtAccountName.setValue("");
        txtTotCredit.setValue("");
        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        gstrcpttype = "CASH RECEIPTS";
       dtpVouDate.focus();
   

        Ext.getCmp('optBill').setValue(true);
        Ext.getCmp('optAdv').setValue(false);
//        gstPaytype = "AD";
        //cmbType.setRawValue('Cr');
        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode: GinCompcode,
                    }
        });





        curcode = 1;



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
        txtTotCredit.setValue(gincrtotal);
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
    }

    function BillAdjustingDetail() {


        if (flxDetail.getStore().getCount() == 1 && gstPaytype == "BB") {
            var ginledcode = flxDetail.getStore().getAt(0).get('ledseq');
            flxAdjustDetails.getStore().removeAll();

            ReceiptAdjBillDetdatastore.removeAll();
            ReceiptAdjBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getrcptadjbilldet",
                            finid: GinFinid,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = ReceiptAdjBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {

                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invdate2: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date2'),
                                    payterms: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_crdays'),
                                    invamt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    dbcramt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    totamt: 0,
                                    adjamt: "",
                                 pendingamt: 
Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    voutype: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
                                    balamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    accrefseqno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vouno')
                                })
                                );
                    }
                    CalcSum();
               //     RefreshGridData();
                }
            });
        } else if (flxDetail.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtRecAmt.getRawValue())) {
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
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                }
            }
        }
        txtTotNetAmt.setValue(ginadjtotal);
    }

    function UpdateReceiptBillsAdjusted() {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {
            selrow.set('adjamt', selrow.get('pendingamt'));
            CalcSum();
        } else {
            if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();
            }
        }
    }

    function RefreshGridData() {
        
        txtCredit.setValue("");
        txtAccountName.setRawValue("");
        gstFlag = "Add";
   flxLedger.hide();
dtpVouDate.focus()

        gstrcpttype = "CASH RECEIPTS";
//        gstPaytype = "BB";


        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task      : "cmbcashacct",
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
                            voutype : 'CHR'
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


                                     vno =  "CHR/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtVouNo.setValue(vno);





                                  }
                                  else
                                  {
                                      txtVouNo.setRawValue("CHR"+VouNodatastore.getAt(0).get('con_value'));
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
        headcode = '2139';
        cmbVouNo.hide();
    }

    var CashReceiptEntryWindow = new Ext.Window({
        width: 1300,
        height: 600,
        y: 25,
        items: CashReceiptEntryFormPanel,
        bodyStyle: {"background-color": "#ffffdb"},
        title: 'Cash Receipt Entry',
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
dtpVouDate.focus();
                txtUserName.setRawValue(GinUser);   
                Ext.getCmp('optBill').setValue(false);
                Ext.getCmp('optAdv').setValue(true);
                Ext.getCmp('editchk').hide();
                txtCredit.enable();

			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
            }
        }
    });
    CashReceiptEntryWindow.show();
});

