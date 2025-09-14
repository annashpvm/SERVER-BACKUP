/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();

    var gstFlag;
    var gdt_enddate;
    var gst_depname;
    var OptExpComm;
    var invdate;
    var invcomm;
    var invdiscount;
    var invvalue;
    var totalinv;
    var invno;
    var gincrvalue = 0;
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfinuser = localStorage.getItem('ginuser');
    var gstfincompcode = localStorage.getItem('gincompcode');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');

    var invseqno = 0;
    var payterms = 0;
    var invvouno = '';
    var dnfor = 'R';
    var hsncode = '';
    var ledtype = '';
 

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

        var cdamt = 0;
        var ratediff = 0;
        var qtydiff = 0;     

    var quality = '';

var loadINVSeqnoDataStore = new Ext.data.Store({
      id: 'loadINVSeqnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvSeqno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invh_vouno','invh_crd_days','invh_acc_refno'
      ]),
    });



var LoadCreditNoteVoucherTypeDataStore = new Ext.data.Store({
      id: 'LoadCreditNoteVoucherTypeDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCNVouType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['nos' ]),
    });


    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 100,
        name: 'txtTotDebit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 100,
        name: 'txtTotCredit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    function CalcTotalDebitCredit() {


        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        var gintotgst = 0;
        var gintottds = 0;

        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.debit);
            gincrtotal = gincrtotal + Number(sel[i].data.credit);
   //         gintotgst = gintotgst + Number(sel[i].data.gst);
    //        gintottds = gintottds + Number(sel[i].data.tdsval);
        }
//        txtTotaldbamt.setValue(Number(gindbtotal) + Number(gintotgst));


        txtTotDebit.setRawValue(Ext.util.Format.number(gindbtotal,'0.00'));
        txtTotCredit.setRawValue(Ext.util.Format.number(gincrtotal,'0.00'));


    }



    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 80,
        name: 'txtRounding',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly : true,      
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        listeners: {
            keyup: function () {
               calculateGSTvalue()

            }   
        }
    });




    var partycode = 0;
    var partyledcode = 0;
    var ledstate = 0;

    var dgrecord = Ext.data.Record.create([]);
    var billflag;
    var gindbtotal;
    var taxtypenew = 'CS';
    var ledtype = "I";
    var partytype = "G";

    var voupoint;
    var accseqno = 0;
    var dncrseqno = 0;
    var vouseqno = 0;
    var dgrecord = Ext.data.Record.create([]);

    var dncndate = new Date();



    var txtPass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPass',
        name        : 'txtPass',
        inputType: 'password',
        width       :  150,
        border      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPass.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtPass.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Cancel the Credit No. ...'+cmbCNNo.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnCreditNoteCancelSave.php',
                               
             
                                       params :
				       {
		                                savetype  : gstFlag,
		                                finid     : ginfinid,
		                                compcode  : gstfincompcode,
		                                accrefseq : accseqno,
		                                dncrseqno : dncrseqno,
		                                conval    : vouseqno,
		                                vouno     : txtCNNo.getRawValue(),
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("CREDIT NOTE Cancelled -" + obj['msg']);
//                                                CreditNoteFormPanel.getForm().reset();
						flxDetail.getStore().removeAll();
                                                flxInvDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("CREDIT NOTE Not Cancelled . Check " + obj['msg']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });




    var txtPass2 = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPass2',
        name        : 'txtPass2',
        inputType: 'password',
        width       :  150,
        border      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPass2.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtPass2.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
//DELETE
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Delete the Credit No. ...'+cmbCNNo.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnCreditNoteDeleteSave.php',
                               
             
                                       params :
				       {
		                                savetype  : gstFlag,
		                                finid     : ginfinid,
		                                compcode  : gstfincompcode,
		                                accrefseq : accseqno,
		                                dncrseqno : dncrseqno,
		                                conval    : vouseqno,
		                                vouno     : txtCNNo.getRawValue(),
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("CREDIT NOTE Deleted -" + obj['msg']);
//                                                CreditNoteFormPanel.getForm().reset();
						flxDetail.getStore().removeAll();
                                                flxInvDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("CREDIT NOTE Not Deleted . Check " + obj['msg']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
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
                  DebitNoteWindow.hide();

            }
        }]);


function edit_click()
{
       Ext.getCmp('cmbCNNo').setVisible(true);
       gstFlag = 'Edit';
       LoadCreditNoteVoucherDataStore.load({
           url: 'ClsCreditNote.php',
           params: {
	        task: 'LoadCreditNoteVoucherList',
	        fincode : ginfinid,
	        compcode: gstfincompcode
          },
          callback: function () {

          }
	});

}

 var EInvStatusDataStore = new Ext.data.Store({
      id: 'EInvStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEInvStatus"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ErrorCode','ErrorDiscripion','InvStatus'
	 ]),
    })



var dgrecord1 = Ext.data.Record.create([]);
var flxEInvStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 200,
    hidden:false,
    title:'E-INV STATUS',
    width: 330,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "S/E", dataIndex:'ErrorCode',sortable:false,width:30,align:'left'},
       {header: "Description", dataIndex:'ErrorDiscripion',sortable:false,width:1000,align:'left'},

    ],
    store: EInvStatusDataStore,
});






var btnReupload = new Ext.Button({
    id      : 'btnReupload',
    style   : 'text-align:center;',
    text    : "RE UPLOAD",
    tooltip : 'Reupload',
    width   : 150,
    height  : 30,
    x       : 200,
    y       : 5,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){

		      Ext.Ajax.request({
		      url: 'FrmTrnCreditNoteE_Inv_Reupload.php',
		      params :
		      {
                        finid: ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbCNNo.getRawValue(),
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("E-Inv - Reuploaded "); 
	/*

		            var obj = Ext.decode(response.responseText);

		            if (obj['success']==="true")					     
		            {
		                Ext.MessageBox.alert("SMS SENT  -" + obj['msg']);
		            }  
		            else
		            {
		         Ext.MessageBox.alert("SMS not Send - Please check customer SMS Number.." + obj['msg']);                                                  
		            }

	*/
		      }
                      }); 
       }
   }
});       



var btnEInvoice = new Ext.Button({
    id      : 'btnEInvoice',
    style   : 'text-align:center;',
    text    : "GENERATE E-CREDIT NOTE",
    width   : 100,
    height  : 40,
    x       : 40,
    y       : 0,    
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   listeners:{
       click: function(){
             if (txtTotDebit.getValue() == 0 || txtTotCredit.getValue() == 0 )
             {
                 alert("Debit / Credit Amount is Empty.. ");
             }           
             else
             {
	      Ext.Ajax.request({
	      url: 'FrmTrnCreditNoteE_Inv_Confirm.php',
	      params :
	      {
                        finid: ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbCNNo.getRawValue(),
	      },
	      callback: function(options, success, response)
	      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("CREDIT NOTE Confirmed for E-Credit Note  -" + obj['vouno']);
//                      TrnSalesInvoicePanel.getForm().reset();
                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("Credit Note not Confirmed for E-Credit Note. Please check.." + obj['vouno']);                                                  
                  }
	      }
              }); 
            }
       }
   }
});


function save_click()
{
           var gstInsert = "true";
           if (txtInvDate.getRawValue() == '')
              dncndate = Ext.util.Format.date(dtpDate.getValue(), "Y-m-d");
           else  
              dncndate = Ext.util.Format.date(dtpInvDate.getRawValue(), "Y-m-d");


            var fromdate;
            var todate;
            var gstRefno;
            fromdate = "04/01/" + gstfinyear.substring(0, 4);
            todate = "03/31/" + gstfinyear.substring(5, 9);
            if (gstFlag == "Edit" && (txtReason.getRawValue() == '' || txtReason.getRawValue().length <5  )  )
            {
               Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
		Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
		    if (btn == 'ok'){
			txtReason.setRawValue(text)
                        save_click();
		    }
		});
            }
            else if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                Ext.MessageBox.alert("Alert", "Voucher Date is not in current finance year");
            } else if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                Ext.MessageBox.alert("Alert", "Voucher Date is not in current finance year");
            }  else if (txtAccountName.getRawValue() === cmbDRCRledger.getRawValue()) {
                Ext.MessageBox.alert("Credit Note", "Party and Creditor Names Are Equal");
            } else if (partyledcode == 0) {
                Ext.MessageBox.alert("Credit Note", "Customer Name Should Not be Empty");
            } else if (cmbDRCRledger.getValue() == 0) {
                Ext.MessageBox.alert("Credit Note", "Creditor Name Should Not be Empty");
//                            } else if (Number(txtTotTaxable.getValue()) <= 0) {
//                                Ext.MessageBox.alert("Credit Note", "Total Value  Should Not Be Zero");
            } else if (Number(txtTaxable.getValue()) <= 0) {
                Ext.MessageBox.alert("Credit Note", "Taxable  Value  Should Not Be Zero");
            } else if  ((taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                Ext.MessageBox.alert("Credit Note", "Select CGST / SGST Ledger Names");
            } else if  ( (taxtypenew == "I")  && (cmbIGSTledger.getValue() == '')) {
                Ext.MessageBox.alert("Credit Note", "Select IGST Ledger Names");
            } else if  (txtCgstvalue.getValue() > 0 && Number(txtCgstper.getValue()) == 0) {
                Ext.MessageBox.alert("Credit Note", "Select GST %");
            } 
            else if  ( Number(txtTotCredit.getValue()) == 0 || Number(txtPartyCredit.getValue()) == 0) {
                Ext.MessageBox.alert("Credit Note", "Check Ledger Details and Continue");
            } 
            else if (flxDetail.getStore().getCount()==0)
            {
                Ext.Msg.alert('Credit Note','Grid should not be empty..');
            }
           else {
                gstInsert = "true";

                if (gstInsert === "true") {
                    Ext.Msg.show({
                        title: 'Credit Note',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Save This Record?',
                        fn: function (btn) {
                            if (btn === 'yes') {


                               var accData = flxDetail.getStore().getRange();
                               var accupdData = new Array();
                               Ext.each(accData, function (record) {
                                  accupdData.push(record.data);
                               });

                               var invData = flxInvDetail.getStore().getRange();
                               var invupdData = new Array();
                               Ext.each(invData, function (record) {
                                  invupdData.push(record.data);
                               });



                                Ext.Ajax.request({
                                    url: 'FrmTrnCreditNoteSave.php',
                                    params: {

                                        griddet: Ext.util.JSON.encode(accupdData),
                                        cnt: accData.length,

                                        griddet2: Ext.util.JSON.encode(invupdData),
                                        cnt2: invupdData.length,

                                        savetype: gstFlag,
                                        finid: ginfinid,
                                        finyear: gstfinyear,
                                        compcode: gstfincompcode,

                                        accrefseq : accseqno,
                                        dncrseqno : dncrseqno,
                                        conval    : vouseqno,

                                        vouno   : txtCNNo.getRawValue(),
                                        voudate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        bankname: "",
                                        refno: "",
                                        refdate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        narration: txtNarration.getRawValue(),
                                        paytype: "CNG",
                                        paymode: "",
                                        output: output,
                                        payno: "",
                                        paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        party   : partycode,
                                        partyledcode : partyledcode,
                                        drcrledger: cmbDRCRledger.getValue(),
                                        tdsper  : txttdsper.getValue(),
                                        tdsvalue: txttdsvalue.getValue(),
                                        taxtype: taxtypenew,
                                        cgstper: txtCgstper.getValue(),
                                        cgstval: txtCgstvalue.getRawValue(),
                                        sgstper: txtSgstper.getValue(),
                                        sgstval: txtSgstvalue.getRawValue(),
                                        igstper: txtIgstper.getValue(),
                                        igstval: txtIgstvalue.getRawValue(),


                                        TCSVAL: txttcsvalue.getRawValue(),
                                        taxable: Number(txtTaxable.getValue()),
                                        CreditValue: Number(txtPartyCredit.getValue()),

                                        billmode: billflag,
                             
                                        cgst  : cmbCGSTledger.getValue(),
                                        sgst  : cmbSGSTledger.getValue(),
                                        igst  : cmbIGSTledger.getValue(),
//''                                                        cnt: accData.length,
                                        gltype   : 'C',
                                        invno    : cmbInvNo.getRawValue(),
                                        invdate  : dncndate,
                                        usercode : GinUserid, 
                                        rounding : txtRounding.getValue(),
                                        reason   : txtReason.getRawValue(), 
                                        hsncode  : hsncode, 
                                        invvouno : invvouno,  
                                        payterms : payterms,  
                                        invseqno : invseqno,

                                        qty      : txtQty.getRawValue(),
                                        cdreason : cmbReason.getRawValue(),
                                       itemname  : quality,

                                    },
                                    callback: function (options, success, response)
                                    {
                                        var obj = Ext.decode(response.responseText);
                                        if (obj['success'] === "true") {

                 					flxDetail.getStore().removeAll();
                                                        flxInvDetail.getStore().removeAll();
                                                        RefreshData();


                                            Ext.Msg.show({
                                                title: 'Saved',
                                                icon: Ext.Msg.QUESTION,
                                                buttons: Ext.MessageBox.OK,
                                                msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                fn: function (btn) {
                                                    if (btn === 'ok') {

                 					flxDetail.getStore().removeAll();
                                                        flxInvDetail.getStore().removeAll();
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
                            }
}

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



var PackslipdetailDataStoreNew = new Ext.data.Store({
      id: 'PackslipdetailDataStoreNew',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invt_hsncode','var_name','unit','size','nos','weight','rate','amount','varcode','sizecode','taxval','invh_cgst_per','invh_sgst_per','invh_igst_per',
'tax_sal_led_code','tax_cgst_ledcode','tax_sgst_ledcode','tax_igst_ledcode','vargrp_type_name'
      ]),
    });



var LoadCreditNoteVoucherDetailDataStore = new Ext.data.Store({
      id: 'LoadCreditNoteVoucherDetailDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadCreditNoteVoucherDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'dbcr_vouno', 'dbcr_date','dbcr_partycode', 'dbcr_partyledcode', 'dbcr_ledcode', 'dbcr_value', 'dbcr_narration', 'dbcr_party_type', 'dbcrt_serialno', 'dbcrt_inv_no', 'dbcrt_inv_date', 'dbcrt_grossvalue', 'dbcrt_value', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_igstper', 'dbcr_party_type',
'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode','dbcrt,_tcsvalue', 'dbcrt_tcsper', 'dbcrt_tcsledcode', 'cust_name' ,'dbcr_accseqno','dbcr_seqno','dbcr_no','dbcrt_rounding','U_AckNo', 'accref_link_seqno','dbcr_reason'
      ]),
    });



  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpDate.getValue();

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


 	    if (LoadCreditNoteVoucherDetailDataStore.getAt(0).get('accref_link_seqno')  > 0)
	    {
	       alert("This Credit Note hase been generated Through Bank Receipt.  You can't Modify this Credit Note...");
	       Ext.getCmp('save').setDisabled(true);  
	    }
	    else
	    {     
	       Ext.getCmp('save').setDisabled(false);    
	    }   

       if (LoadCreditNoteVoucherDetailDataStore.getAt(0).get('U_AckNo') == '')
       {  

           Ext.getCmp('save').setDisabled(false);
       } 
       else  
       {    
           alert("E-Credit Note Generated. Can't Modify this document. .." );
           Ext.getCmp('save').setDisabled(true);
           Ext.getCmp('btnEInvoice').setDisabled(true);
       } 


     
 }

var LoadCreditNoteVoucherTrailer2DataStore = new Ext.data.Store({
      id: 'LoadCreditNoteVoucherTrailer2DataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadCreditNoteVoucherDetailsTrailer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'dbcrt2_seqno', 'dbcrt2_inv_no', 'dbcrt2_inv_date', 'dbcrt2_sno', 'dbcrt2_hsn', 'dbcrt2_sizecode', 'dbcrt2_sizename', 'dbcrt2_weight', 'dbcrt2_rate', 'dbcrt2_taxable', 'dbcrt2_diff_rate', 'dbcrt2_diff_taxvalue',
'dbcrt_cd_perton', 'dbcrt_cd_taxvalue', 'dbcrt2_diff_rate', 'dbcrt2_diff_taxvalue', 'dbcrt_diff_qty', 'dbcrt_diff_qty_taxvalue', 'dbcrt_DN_taxvalue'
      ]),
    });



var LoadCreditNoteVoucherDataStore = new Ext.data.Store({
      id: 'LoadCreditNoteVoucherDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadCreditNoteVoucherList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dbcr_vouno','dbcr_seqno'
      ]),
    });




var LoadCreditNoteDataStore = new Ext.data.Store({
      id: 'LoadCreditNoteDataStoref',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCNNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'hsncode','var_name','unit','size','nos','weight','rate','amount','varcode','sizecode','taxval','invh_cgst_per','invh_sgst_per','invh_igst_per',
'tax_sal_led_code','tax_cgst_ledcode','tax_sgst_ledcode','tax_igst_ledcode'
      ]),
    });

function calculateValue(){

   var dcgst  = 0;
   var dsgst  = 0;
   var digst  = 0;
   var dtaxval =0;
   var tottaxval =0;
   var totqty = 0;

   var Row= flxInvDetail.getStore().getCount();



        flxInvDetail.getSelectionModel().selectAll();

        var sel=flxInvDetail.getSelectionModel().getSelections();


/*
        for(var i=0;i<Row;i++)
        {
           cdamt = 0;
           ratediff = 0;
           qtydiff = 0;     

           hsncode =  sel[i].data.invt_hsncode;
           tdisc = 0;
           if (sel[0].data.cdperton > 0 ) 
              cdamt   = sel[0].data.cdperton;
  
           sel[i].set('cdperton', Ext.util.Format.number(cdamt,'0.00'));
        }   

*/
        totqty = 0;
        var tottaxval =0;
        for(var i=0;i<Row;i++)
        {
           cdamt = 0;
           ratediff = 0;
           qtydiff = 0;     

           hsncode =  sel[i].data.invt_hsncode;
           tdisc = 0;
           if (sel[i].data.cdperton > 0 ) 
              cdamt = Number(sel[i].data.cdperton)* Number(sel[i].data.weight)
           if (sel[i].data.diffrate > 0 ) 
	      ratediff = Number(sel[i].data.diffrate)* Number(sel[i].data.weight)
           if (sel[i].data.diffqty > 0 ) 
              qtydiff  = Number(sel[i].data.rate)* Number(sel[i].data.diffqty)


           dtaxval = Number(cdamt)+Number(ratediff)+Number(qtydiff);
           tottaxval += Number(dtaxval)
           sel[i].set('difftaxval', Ext.util.Format.number(dtaxval,'0.00'));
           
           if (Number(dtaxval) > 0)
              totqty =  Number(totqty) +  Number(sel[i].data.weight);
        }   

        txtQty.setRawValue(Ext.util.Format.number(totqty,'0.000'));
        txtTaxable.setRawValue(Ext.util.Format.number(tottaxval,'0.00'));
        txtTotTaxable.setRawValue(Ext.util.Format.number(tottaxval,'0.00'));
        calculateGSTvalue();

}

function calculateGSTvalue(){

       var cgst = (Number(txtTaxable.getValue()) * Number(txtCgstper.getValue())/100).toFixed(2);    
       var sgst = (Number(txtTaxable.getValue()) * Number(txtSgstper.getValue())/100).toFixed(2);   
       var igst = (Number(txtTaxable.getValue()) * Number(txtIgstper.getValue())/100).toFixed(2);    

       if ( txtTaxable.getValue() > 0 && txtCgstper.getValue()>0)
             txtCgstvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));
       else
             txtCgstvalue.setValue('');

       if (txtTaxable.getValue() > 0 && txtSgstper.getValue()>0)
             txtSgstvalue.setRawValue(Ext.util.Format.number(sgst,'0.00'));
       else
             txtSgstvalue.setValue('');
        if (txtTaxable.getValue() > 0 && txtIgstper.getValue()>0)
             txtIgstvalue.setRawValue(Ext.util.Format.number(igst,'0.00'));

       else
             txtIgstvalue.setValue('');
 
   //    txtPartyCredit.setRawValue(Ext.util.Format.number(Number(txtTaxable.getValue()) + Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue())+ Number(txtRounding.getValue()),'0.00') );

       partyvalue = Number(txtTaxable.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtOtherAmount.getValue()); 

    //   txtPartyCredit.setRawValue(Ext.util.Format.number( partyvalue,'0.00'));

         txtPartyCredit.setRawValue(Ext.util.Format.number(Math.round(partyvalue),'0.00'));

          invround = Number(txtPartyCredit.getValue()) - Number(partyvalue);
          txtRounding.setRawValue(Ext.util.Format.number(invround,'0.00'));

          if (Number(txtPartyCredit.getValue()) >  Number(txtInvBalance.getValue()))
          {
            alert("Credit Note Amount is Greater then Invoice Balance... Unable to save the Record");
            Ext.getCmp('save').setDisabled(true);
          }  
          else
          {
            Ext.getCmp('save').setDisabled(false);

          } 

                        txtNarration.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS FOR OUR INV NO. " + cmbInvNo.getRawValue() + " DT. " + Ext.util.Format.date(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'), "d-m-Y") +" " +  cmbReason.getRawValue() +  " QTY " + txtQty.getRawValue()  +  " MTS CREDIT AMOUNT " + txtPartyCredit.getRawValue() + "/-" );
}

//  + cmbReason.getRawValue() +  " QTY " + txtQty.getRawValue() 

var dgaccrecord  = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 180,
    hidden:false,
    width: 780,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
 //   	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "Led. Code", dataIndex:'ledcode',sortable:false,width:100,align:'left',hidden : true},
       {header: "Led. Name", dataIndex:'ledname',sortable:false,width:400,align:'left'},
       {header: "Debit", dataIndex:'debit',sortable:false,width:120,align:'right'},
       {header: "Credit", dataIndex:'credit',sortable:false,width:120,align:'right'},
       {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left',hidden : false}
    ],

    store: [],

    listeners:{

        keyup:function(){
           calculateItemValue();
        },
        keydown:function(){ 
           calculateItemValue();
        },
       blur:function(){
           calculateItemValue();

        }      
    }
});

var flxInvDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 120,
    hidden:false,
    width: 850,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
 //   	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "HSN", dataIndex:'invt_hsncode',sortable:false,width:90,align:'left'},
       {header: "Size Code", dataIndex:'var_name',sortable:false,width:170,align:'left'},
       {header: "Size", dataIndex:'size',sortable:false,width:50,align:'left',hidden:true} ,
       {header: "Weight", dataIndex:'weight',sortable:false,width:80,align:'right'},
       {header: "Rate", dataIndex:'rate',sortable:false,width:80,align:'right'},
       {header: "Tax Value", dataIndex:'taxval',sortable:false,width:90,align:'right'},
       {header: "CD/MT", dataIndex:'cdperton',sortable:false,width:80,align:'right',
	editor:{
/*
                    beforeedit: function(e, editor){
                    if (dnfor == "Q")

                      var sm = flxInvDetail.getSelectionModel();
                      var selrow = sm.getSelected();
                      selrow.set('diffrate', "0");

                    return false;
                    },
*/
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{


                        focus: function () {
                            var sm = flxInvDetail.getSelectionModel();
                            var selrow = sm.getSelected();

                            this.setValue(Number(selrow.get('cdperton')));


                        },

             	    blur: function () {
                              calculateValue();}


	}}},
       {header: "Diff Rate", dataIndex:'diffrate',sortable:false,width:80,align:'right',
	editor:{
/*
                    beforeedit: function(e, editor){
                    if (dnfor == "Q")

                      var sm = flxInvDetail.getSelectionModel();
                      var selrow = sm.getSelected();
                      selrow.set('diffrate', "0");

                    return false;
                    },
*/
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {

                              calculateValue();
                    },
             	    keydown: function () {
                              calculateValue();},
             	    blur: function () {
                              calculateValue();}


	}}},
       {header: "Diff Qty", dataIndex:'diffqty',sortable:false,width:80,align:'right',
	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
                              calculateValue();
                    },
             	    keydown: function () {
                              calculateValue();},
             	    blur: function () {
                              calculateValue();}


	}}},
       {header: "Diff TaxVal", dataIndex:'difftaxval',sortable:false,width:90,align:'right'},



    ],

    store: PackslipdetailDataStoreNew,

    listeners:{

        keyup:function(){

        },
        keydown:function(){ 

        },
       blur:function(){


        }      
/*
         'cellclick': function (flxInvDetail, rowIndex, cellIndex, e) {
	        var selected_rows = flxInvDetail.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++)
                {
		   colname = 'value';
                   selected_rows[i].set(colname, '100000');
                }
          }
*/
    }
/*
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxInvDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxInvDetail.getStore().remove(selrow);
        flxInvDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         

    }

   }
*/

});




var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadSGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadIGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var cmbReason = new Ext.form.ComboBox({
        fieldLabel      : 'Reason',
        width           : 150,
        displayField    :  '', 
        valueField      :  '',
        hiddenName      : '',
        id              : 'cmbReason',
        typeAhead       : true,
        mode            : 'local',
        store           :  ['CASH DISC','RATE DIFF','QTY DIFF','QLY','QLY DIFF','SAL RETURN','OTHERS'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
        listeners:{
           select: function(){

           }
        } 
})

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbIGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});

var cmbCNNo = new Ext.form.ComboBox({
        fieldLabel: 'Credit Note No',
        width           : 100,
        displayField    : 'dbcr_vouno', 
        valueField      : 'dbcr_seqno',
        hiddenName      : '',
        id              : 'cmbCNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCreditNoteVoucherDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){

                       Ext.getCmp('EInv').setVisible(true);

                       flxInvDetail.getStore().removeAll();
                       flxDetail.getStore().removeAll();
     	               LoadCreditNoteVoucherDetailDataStore.load({
                           url: 'ClsCreditNote.php',
	                   params: {
			        task: 'LoadCreditNoteVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbCNNo.getRawValue(),
	                  },
		          callback: function () {


                       LoadCreditNoteVoucherTypeDataStore.removeAll();
     	               LoadCreditNoteVoucherTypeDataStore.load({
                           url: 'ClsCreditNote.php',
	                   params: {
			        task: 'loadCNVouType',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbCNNo.getRawValue(),
	                  },
		          callback: function () {


                        if (LoadCreditNoteVoucherTypeDataStore.getAt(0).get('nos') >0 )
               	       {  
                          alert("We can't Change the Credit Note... Because this entry made from Auto Adjustments");
                  	   Ext.getCmp('save').setDisabled(true);
                       } 
                          }
                          });  





                               Ext.getCmp('doccancel').show();
//                             alert(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno'));
                                txtCNNo.setRawValue(cmbCNNo.getRawValue());
                                dtpDate.setRawValue(Ext.util.Format.date(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_date'),"d-m-Y")); 
                                accseqno = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno');    
                                dncrseqno = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_seqno');   
                                vouseqno  = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_no'); 
                                partycode = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode');
                                partytype = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_party_type');
                                partyledcode = LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode');


                                txtAccountName.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('cust_name'));
				txtPartyCredit.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_value'));
				cmbInvNo.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'));
				txtInvDate.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'));
                                dtpInvDate.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'));

				txtTotTaxable.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtTaxable.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtCgstper.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstper'));
				txtCgstvalue.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstvalue'));
				txtSgstper.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstper'));
				txtSgstvalue.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstvalue'));
				txtIgstper.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstper'));
				txtIgstvalue.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstvalue'));
				txtNarration.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_narration'));
				cmbDRCRledger.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_ledcode'));
				cmbCGSTledger.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstledcode'));
				cmbSGSTledger.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstledcode'));
				cmbIGSTledger.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstledcode'));
				txtRounding.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_rounding'));






       if (LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_reason') == 'SAL RETURN')
       {  

           Ext.getCmp('save').setDisabled(true);
           alert("This Credit Note hase been Generated through SALES RETURN. Can't Modify this document. .." );
           Ext.getCmp('btnEInvoice').setDisabled(true);
           Ext.getCmp('btnReupload').setDisabled(true);
       } 
       else  
       {    

           Ext.getCmp('save').setDisabled(false);

       }  
 

	    if (LoadCreditNoteVoucherDetailDataStore.getAt(0).get('accref_link_seqno')  > 0)
	    {
	       alert("This Credit Note has been generated Through Bank Receipt.  You can't Modify this Credit Note...");
	       Ext.getCmp('save').setDisabled(true);  
	    }
	    else
	    {   
  
       if (LoadCreditNoteVoucherDetailDataStore.getAt(0).get('U_AckNo') == '')
       {  

           Ext.getCmp('save').setDisabled(false);

       } 
       else  
       {    
           alert("E-Credit Note Generated. Can't Modify this document. .." );
           Ext.getCmp('save').setDisabled(true);
           Ext.getCmp('btnEInvoice').setDisabled(true);
           Ext.getCmp('btnReupload').setDisabled(true);
       }  





	    }   



	     	               LoadCreditNoteVoucherTrailer2DataStore.load({
		                   url: 'ClsCreditNote.php',
			           params: {
					task: 'LoadCreditNoteVoucherDetailsTrailer',
		                        seqno  : cmbCNNo.getValue(),
			          },
				  callback: function () {
                                  var cnt=LoadCreditNoteVoucherTrailer2DataStore.getCount();
	                           if(cnt>0)
                                   {   
                                   for(var j=0; j<cnt; j++) 
                                   {
                                       flxInvDetail.getStore().insert(
                                       flxInvDetail.getStore().getCount(),
                                       new dgrecord({
                                           invt_hsncode : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_hsn'),        
			            	   var_name      : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_sizename'),
					   size         : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_sizecode'),
					   weight     : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_weight'),
			                   rate        : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_rate'),
					   taxval       : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_taxable'),
					   diffrate    : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt2_diff_rate'),
					   cdperton    : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt_cd_perton'),
					   diffqty     : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt_diff_qty'),
					   difftaxval      : LoadCreditNoteVoucherTrailer2DataStore.getAt(j).get('dbcrt_DN_taxvalue'),
	                                })
                               	        );

                                   } 
  EditDateCheck();
                                  }




		                  }
		               });  

   	EInvStatusDataStore.removeAll();
    	EInvStatusDataStore.load({
		url: 'ClsCreditNote.php',
		params: {
			task: 'loadEInvStatus',
			invno:cmbCNNo.getRawValue(),
		        fincode : ginfinid,
		        compcode: gstfincompcode,
             



		},
	      	callback:function()
	  	{

              } 
        });    

	     	               loadINVSeqnoDataStore.load({
		                   url: 'ClsCreditNote.php',
			           params: {
					task: 'loadInvSeqno',
		 			compcode : gstfincompcode,
                                        invoiceno: LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'),
			          },
				  callback: function () {
                                  var cnt=loadINVSeqnoDataStore.getCount();
                                  if(cnt>0)
                                  {   

				        invseqno = loadINVSeqnoDataStore.getAt(0).get('invh_acc_refno');
				        invvouno = loadINVSeqnoDataStore.getAt(0).get('invh_vouno');
				        payterms = loadINVSeqnoDataStore.getAt(0).get('invh_crd_days');

                                  }
	                  }
		               }); 
 
                               add_btn_click(); 

	                  }
			});

           }
        } 
});


    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/datechk.php', // File to connect to
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

    var CustNameDataStore = new Ext.data.Store({
        id: 'CustNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadCustNameList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });


    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "GeneralLedger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });


    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ControlCreditNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_vouno'])
    });



    var InvoiceDetails2DataStore = new Ext.data.Store({
        id: 'InvoiceDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_inv_date', 'acctran_totamt', 'acctrail_inv_value','balanceamt',
'acctrail_accref_seqno','acctrail_inv_no', 'accref_vou_type', 'acctrail_crdays', 'accref_vouno'
        ])
    });


 var TdsLedgergetDataStore = new Ext.data.Store({
      id: 'TdsLedgergetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/datechk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"TdsLedgerget"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'led_grp_code'

      ]),
    });

    var InvoicNoDataStore = new Ext.data.Store({
        id: 'InvoicNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadDebitBills"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_accref_seqno', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_value',
            'accref_vou_type', 'acctrail_adj_value'
        ])
    });

    var PartyAddressDataStore = new Ext.data.Store({
        id: 'PartyAddressDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Address"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_addr1', 'led_addr2'
        ])
    });

/*
    var optOption = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'hbox',
        width: 300,
        height: 40,
        border: false,
        items: [{xtype: 'radiogroup', columns: 2, rows: 1, id: 'optOption',
                items: [
                    {boxLabel: 'Rate Difference', name: 'optOption', inputValue: 1, checked: 'true',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    dnfor = 'R';

                                }
                            }
                        }},
                    {boxLabel: 'QTY Difference', name: 'optOption', inputValue: 2,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    dnfor = 'Q';
             
                                }
                            }
                        }}
                ]
            }]
    });
*/
    var txtCNNo = new Ext.form.TextField({
        fieldLabel: 'Credit Note No',
        id: 'txtCNNo',
        width: 100,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
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
            {name: 'led_custcode', type: 'string', mapping: 'led_custcode'},
            {name: 'statecode', type: 'string', mapping: 'statecode'},

        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code','led_custcode','cust_name','cust_type','cust_state'
      ]),
    });



function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsCreditNote.php',
		params:
		{
			task:"loadPartyList",
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
		partycode    = selrow.get('cust_code');
		partyledcode = selrow.get('cust_code');
		ledtype      = selrow.get('cust_type');
            	ledstate     = selrow.get('cust_state');
                partytype    = selrow.get('cust_type');
		txtAccountName.setValue(selrow.get('cust_name'));
                flxLedger.hide();   
                cmbInvNo.focus();
                InvoicNoDataStore.removeAll();
                InvoicNoDataStore.load({
                        url: 'ClsCreditNote.php',
                        params: {
                            task: 'loadDebitBills',
                            ledgercode: partyledcode,
                            ginfinid: ginfinid,
                            gincompany: gstfincompcode
                        },
                        callback: function () {
                            var cnt = InvoicNoDataStore.getCount();
                            if (cnt > 0) {
                                invno = InvoicNoDataStore.getAt(0).get('acctrail_inv_no');
                                Invseq = InvoicNoDataStore.getAt(0).get('acctrail_accref_seqno');
                            } else {
                                Ext.Msg.alert("Alert", "This Party  Does Not have the transaction to Raising the Credit Note With Bill");
                            }
                        }
                    });

/*
	        if (cngsttype == "G")
		{    
			Ext.getCmp('txtCgstper').setDisabled(false);
		        Ext.getCmp('txtSgstper').setDisabled(false)
		        Ext.getCmp('txtIgstper').setDisabled(false);
			Ext.getCmp('cmbCGSTledger').setDisabled(false);
			Ext.getCmp('cmbSGSTledger').setDisabled(false);
			Ext.getCmp('cmbIGSTledger').setDisabled(false);
		        txtIgstper.setValue(0); 
		        txtIgstvalue.setValue(0); 
		        cmbIGSTledger.setValue(''); 
                }   
*/
               if (ledstate == 24)
		{    
			Ext.getCmp('txtCgstper').setDisabled(false);
		        Ext.getCmp('txtSgstper').setDisabled(false)
		        Ext.getCmp('txtIgstper').setDisabled(true);
			Ext.getCmp('cmbCGSTledger').setDisabled(false);
			Ext.getCmp('cmbSGSTledger').setDisabled(false);
			Ext.getCmp('cmbIGSTledger').setDisabled(true);
		        txtCgstper.setValue('');
		        txtSgstper.setValue('');
		        txtIgstper.setValue('');
		        txtCgstvalue.setValue(''); 
		        txtSgstvalue.setValue(''); 
		        txtIgstvalue.setValue(''); 
           	}
                else if (ledstate != 24)
		{    
			Ext.getCmp('txtCgstper').setDisabled(true);
		        Ext.getCmp('txtSgstper').setDisabled(true)
		        Ext.getCmp('txtIgstper').setDisabled(false);
			Ext.getCmp('cmbCGSTledger').setDisabled(true);
			Ext.getCmp('cmbSGSTledger').setDisabled(true);
			Ext.getCmp('cmbIGSTledger').setDisabled(false);
		        txtCgstper.setValue('');
		        txtSgstper.setValue('');
		        txtIgstper.setValue('');
		        txtCgstvalue.setValue(''); 
		        txtSgstvalue.setValue(''); 
		        txtIgstvalue.setValue(''); 
           	}
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
        x: 530,
        y: 55,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true}, 
		{header: "Party Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:60,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:60,align:'left'},
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
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
   }
   });




var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Credited To',
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
                   flxLedger.hide();
                   cmbInvNo.focus();

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
                if (txtAccountName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtAccountName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
    });


/*

/*
    var cmbCustomer1Name = new Ext.form.ComboBox({
        fieldLabel: 'Customer Name',
        width: 350,
        store: CustNameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'txtAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {

           specialkey:function(f,e){
            if (e.getKey() == e.ENTER)
            {
              cmbInvNo.focus();
            }      
            },
            select: function () {
                var Invseq = 0;

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: txtAccountName.getValue(),
		            },
                    callback: function () {
                            partytype =  findLedgerdatastore.getAt(0).get('cust_type');
                            partycode =  findLedgerdatastore.getAt(0).get('led_custcode');
// alert(partytype);
                      }
		});

                PartyAddressDataStore.removeAll();
                InvoicNoDataStore.removeAll();
                if (billflag === "C") {
                    InvoicNoDataStore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params: {
                            task: 'cmbDnInvNo',
                            ledgercode: this.getValue(),
                            ginfinid: ginfinid,
                            gincompany: gstfincompcode
                        },
                        callback: function () {
                            var cnt = InvoicNoDataStore.getCount();
                            if (cnt > 0) {
                                invno = InvoicNoDataStore.getAt(0).get('acctrail_inv_no');
                                Invseq = InvoicNoDataStore.getAt(0).get('acctrail_accref_seqno');
                            } else {
                                Ext.Msg.alert("Alert", "This Party  Does Not have the transaction to Raising the Credit Note With Bill");
                            }
                        }
                    });
                }
                ;
            }
        }
    });


*/



    var dateon;
    var getdate;
    var dtpDate = new Ext.form.DateField({
        fieldLabel: 'Credit Note Date',
        id: 'dtpDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
//value: '2020-03-31',
        anchor: '100%',
        listeners: {
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
            select: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            },
            blur: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });


    var dtpInvDate = new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpInvDate',
        name: 'dtpInvDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
//value: '2020-03-31',
        anchor: '100%',
        hidden : true,
        listeners: {

        }
    });



    var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel: 'Inv. No',
        width: 140,
        store: InvoicNoDataStore,
        displayField: 'acctrail_inv_no',
        valueField: 'acctrail_accref_seqno',
        hiddenName: 'acctrail_inv_no',
        id: 'cmbInvNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {


            select: function () {

                InvoiceDetails2DataStore.removeAll();
                InvoiceDetails2DataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'InvDetails2',
                        invoiceno: cmbInvNo.getValue(),
                        ledgercode: partyledcode,
                        compcode: gstfincompcode,
                        finid: ginfinid
                    },
                    callback: function () {

                        txtTotTaxable.setValue('0');
                        txtTaxable.setValue('0');

                        txtCgstper.setValue('0');
                        txtSgstper.setValue('0');
                        txtIgstper.setValue('0');

                        txtCgstvalue.setValue('0');
                        txtSgstvalue.setValue('0');
                        txtIgstvalue.setValue('0');

                        txtRounding.setValue('0');
                        txtPartyCredit.setValue('0');
                        txtNarration.setRawValue('');

                        txtInvDate.setValue(Ext.util.Format.date(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'), "d-m-Y"));

                        dtpInvDate.setRawValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'));
                        txtInvValue.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_value'));
                        txtInvBalance.setValue(InvoiceDetails2DataStore.getAt(0).get('balanceamt'));

                        invseqno = InvoiceDetails2DataStore.getAt(0).get('acctrail_accref_seqno');
                        invvouno = InvoiceDetails2DataStore.getAt(0).get('accref_vouno');
                        payterms = InvoiceDetails2DataStore.getAt(0).get('acctrail_crdays');


                        txtNarration.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS FOR OUR INV NO. " + cmbInvNo.getRawValue() + " DT. " + Ext.util.Format.date(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'), "d-m-Y")  );

                    }
                });
		PackslipdetailDataStoreNew.removeAll();
		PackslipdetailDataStoreNew.load({

		url: 'ClsCreditNote.php',
		params:
		    {
			task:"loadInvDetails",
			invno :  cmbInvNo.getRawValue(),
			fincode : ginfinid,
			compcode : gstfincompcode,   
		
		    },
		    scope: this,
		    callback:function() 
			{
                           txtCgstper.setValue(PackslipdetailDataStoreNew.getAt(0).get('invh_cgst_per'));
                           txtSgstper.setValue(PackslipdetailDataStoreNew.getAt(0).get('invh_sgst_per'));
                           txtIgstper.setValue(PackslipdetailDataStoreNew.getAt(0).get('invh_igst_per'));
                           cmbDRCRledger.setValue(PackslipdetailDataStoreNew.getAt(0).get('tax_sal_led_code'));
                           cmbCGSTledger.setValue(PackslipdetailDataStoreNew.getAt(0).get('tax_cgst_ledcode'));
                           cmbSGSTledger.setValue(PackslipdetailDataStoreNew.getAt(0).get('tax_sgst_ledcode'));
                           cmbIGSTledger.setValue(PackslipdetailDataStoreNew.getAt(0).get('tax_igst_ledcode'));
                           quality = PackslipdetailDataStoreNew.getAt(0).get('vargrp_type_name');

		        }
	      
		});

            }
        }
    });

    var txtInvDate = new Ext.form.TextField({
        fieldLabel: 'Invoice  Date',
        id: 'txtInvDate',
        name: 'date',
        width: 90,
        format: 'd-m-Y',
        readOnly: true
    });

    var txtInvValue = new Ext.form.NumberField({
        fieldLabel: 'Invoice Value',
        id: 'txtInvValue',
        width: 60,
        name: 'InvValue',
        readOnly: true
    });
    var txtInvBalance = new Ext.form.NumberField({
        fieldLabel: 'Balance',
        id: 'txtInvBalance',
        width: 90,
        name: 'txtInvBalance',
        readOnly: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtOtherAmount= new Ext.form.NumberField({
        fieldLabel: 'Other Amount ',
        id: 'Others',
        width: 110,
        name: 'txtOtherAmount',
        enableKeyEvents: true,
        //allowDecimals: false,
//        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });




    var txtCreditValue = new Ext.form.NumberField({
        fieldLabel: 'Debit 1 Value',
        id: 'txtCreditValue',
        width: 60,
        name: 'CreditValue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txtCreditValue.getValue() > txtInvValue.getValue()) {
                    Ext.Msg.alert("Alert", "Credit Note value should not be greater than invoice value");
                    txtCreditValue.setValue('');
                }
            }
        }
    });

    var grpcodetds = 0;
    var cmbDRCRledger = new Ext.form.ComboBox({
        fieldLabel: 'Debit Ledger',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbDRCRledger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            /*blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }, */
            select: function () {
                grpcodetds = 0;
                txttdsper.setValue('');
                txttdsvalue.setValue('');
                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbDRCRledger.getValue()
                    },
                    callback: function () {
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                        if (grpcodetds === '65') {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.show();
                            txttdsvalue.show();
                        } else {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.hide();
                            txttdsvalue.hide();
                        }
                    }
                });
            }
        }
    });

    var txttdsper = new Ext.form.NumberField({
        fieldLabel: 'TDS%',
        id: 'txttdsper', hidden: true,
        width: 100,
        name: 'txttdsper'
    });

    var txttdsvalue = new Ext.form.NumberField({
        fieldLabel: 'TDS AMT',
        id: 'txttdsvalue', hidden: true,
        width: 100,
        name: 'txttdsvalue'
    });

    var txtQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtQty',
        width       : 90,
        name        : 'txtQty',
        readOnly : 'true',
        decimalPrecision: 3,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        enableKeyEvents: true,
        listeners:{

        } 
    });

    var txtTotTaxable = new Ext.form.NumberField({
        fieldLabel: 'Taxable Total',
        id: 'txtTotTaxable',
        width: 100,
        name: 'txtTotTaxable',
        readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 600,
        height: 50,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
          /*  blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }*/
        }
    });

    var lblIns = new Ext.form.Label({
        fieldLabel: 'Enter Credit Value = (Base Value-(CGST+SGST Or + IGST))',
        id: 'lblIns',
        labelSeparator: '',
        name: 'lblIns',
        width: 200
    });

                 function findledgers()
                   {
            	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtCgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });

               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtCgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtIgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

}


    var txtTaxable = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value',
        id: 'txtTaxable',
        width: 80,
        name: 'txtTaxable',
        readOnly : true,
        enableKeyEvents: true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        //allowDecimals: false,
        listeners: {
              keyup: function () {
                  calculateGSTvalue();
                },
              keychange: function () {
                  calculateGSTvalue();
                },

        }
    });

    var txtPartyCredit = new Ext.form.NumberField({
        fieldLabel: 'Credited Amount',
        id: 'txtPartyCredit',
        width: 80,
        name: 'txtPartyCredit',
        enableKeyEvents: true,
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
    });


    var txtCgstper = new Ext.form.NumberField({
        fieldLabel: 'CGST % Amt',
        id: 'txtCgstper',
        width: 40,
        name: 'txtCgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });


    var txtCgstvalue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCgstvalue',
        width: 80,
        name: 'txtCgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtSgstper = new Ext.form.NumberField({
        fieldLabel: 'SGST % Amt',
        id: 'txtSgstper',
        width: 40,
        name: 'txtSgstper',
        enableKeyEvents: true,
        readOnly: true,
        //allowDecimals: false,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtSgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtSgstvalue',
        width: 80,
        name: 'txtSgstvalue',
        enableKeyEvents: true,
        readOnly: true,
        //allowDecimals: false,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtIgstper = new Ext.form.NumberField({
        fieldLabel: 'IGST % Amt',
        id: 'txtIgstper',
        width: 40,
        name: 'txtIgstper',
        enableKeyEvents: true,
        //allowDecimals: false,

        readOnly: true,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtIgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtIgstvalue',
        width: 80,
        name: 'txtIgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });




function add_btn_click()
{

                flxDetail.getStore().removeAll();

                var gstInsert = "true";
                if (partyledcode == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select Debit Party / Ledger");
                }
/*
                if (GSTYN == "Y")
                {    
		        if (cmbCreditLedger.getValue() == 0) {
		            gstInsert = "false";
		            Ext.MessageBox.alert("Debit Note", "Select Credit Ledger");
		        }
                }
*/
                if (cmbCGSTledger.getValue() == 0 && txtCgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select CGST Ledger");
                    cmbCGSTledger.focus();
                }


                if (cmbSGSTledger.getValue() == 0 && txtSgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select SGST Ledger");
                    cmbSGSTledger.focus();
                }

                if (cmbIGSTledger.getValue() == 0 && txtIgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select IGST Ledger");
                    cmbIGSTledger.focus();
                }


                var cnt = 0;

/*
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq === partyledcode) {
                        cnt = cnt + 1;
                    }
                }
*/

                if (gstInsert == "true")
                {

    
                        if (gstInsert === "true") {
                           var totamt;
                           var RowCnt = flxDetail.getStore().getCount() + 1;
                           flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgaccrecord({
                                    slno: RowCnt,
                                    ledcode: partyledcode,
                                    ledname: txtAccountName.getRawValue(),
                                    debit : 0,
                                    credit : Ext.util.Format.number(Number(txtPartyCredit.getRawValue()),'0.00'),
                                    ledtype : partytype
                                })
                          );
//anna
                          if (Number(txtTaxable.getValue()) > 0)
                          {  
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbDRCRledger.getValue(),
		                            ledname: cmbDRCRledger.getRawValue(),
		                            debit : Ext.util.Format.number(Number(txtTaxable.getRawValue()),'0.00'),
		                            credit : 0,
		                            ledtype : 'G'
		                        })
		                  );
                          }


                          if (Number(txtCgstvalue.getValue()) > 0)
                          { 
	                   flxDetail.getStore().insert(
	                        flxDetail.getStore().getCount(),
	                        new dgaccrecord({
	                            slno: RowCnt,
	                            ledcode: cmbCGSTledger.getValue(),
	                            ledname: cmbCGSTledger.getRawValue(),
	                            debit : Ext.util.Format.number(Number(txtCgstvalue.getRawValue()),'0.00'),
                                    credit : 0,
                                    ledtype : 'G'
	                        })
	                  );
                          }
                          if (Number(txtSgstvalue.getValue()) > 0)
                          { 
	                   flxDetail.getStore().insert(
	                        flxDetail.getStore().getCount(),
	                        new dgaccrecord({
	                            slno: RowCnt,
	                            ledcode: cmbSGSTledger.getValue(),
	                            ledname: cmbSGSTledger.getRawValue(),
	                            debit  : Ext.util.Format.number(Number(txtSgstvalue.getRawValue()),'0.00'),
                                    credit : 0,

	                            ledtype : 'G'
	                        })
	                  );
                          }
                          if (Number(txtIgstvalue.getValue()) > 0)
                          { 
	                   flxDetail.getStore().insert(
	                        flxDetail.getStore().getCount(),
	                        new dgaccrecord({
	                            slno: RowCnt,
	                            ledcode: cmbIGSTledger.getValue(),
	                            ledname: cmbIGSTledger.getRawValue(),
	                            debit :  Ext.util.Format.number(Number(txtIgstvalue.getRawValue()),'0.00'),
                                    credit : 0,
	                            ledtype : 'G'
	                        })
	                  );
                          }
                          if (Number(txtRounding.getValue()) > 0)
                          { 
	                   flxDetail.getStore().insert(
	                        flxDetail.getStore().getCount(),
	                        new dgaccrecord({
	                            slno: RowCnt,
	                            ledcode: 1859,
	                            ledname: 'ROUNDED OFF',
	                            debit : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),
                                    credit : 0,
	                            ledtype : 'G'
	                        })
	                  );
                          }

                          if (Number(txtRounding.getValue()) < 0)
                          { 
	                   flxDetail.getStore().insert(
	                        flxDetail.getStore().getCount(),
	                        new dgaccrecord({
	                            slno    : RowCnt,
	                            ledcode : 1859,
	                            ledname : 'ROUNDED OFF',
	                            credit  : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),
                                    debit   : 0,
	                            ledtype : 'G'
	                        })
	                  );
                          }

                          CalcTotalDebitCredit();
                          //BillAdjustingDetail();
                          //txtCredit.setRawValue('');
//                          txtAccountName.setRawValue('');
//                          txtAccountName.focus();
                       }

              }
}


    var txttcsvalue = new Ext.form.NumberField({
        fieldLabel: 'TCS',
        id: 'txttcsvalue',
        width: 100,
        name: 'txttcsvalue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txttcsvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var output = 'N';
    var chkremark = new Ext.form.Checkbox({
        name: 'Output',
        boxLabel: 'Output',
        id: 'chkremark',
        checked: false,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    output = 'Y';
                    ledtype = "O";

                } else {
                    output = 'N';
                    ledtype = "I";
                }
                findledgers();
            }
        }
    });



    var tabCreditNote = new Ext.TabPanel({
        id: 'tabCreditNote',
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
listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabCreditNote.getActiveTab();
                    if (activeTab.id == 'tab2')
    //                   alert("The active tab in the panel is " + activeTab.id);
           add_btn_click(); 

        }
},

        items: [
            {
                xtype: 'panel',
                title: ' Entry',
                     id   : 'tab1', 
                bodyStyle: {"background-color": "#ffffdb"},
                style: {
                    'color': 'blue',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                layout: 'absolute',
                items: [
/*
            {
                xtype: 'fieldset',
                title: '',
                width: 300,
                height: 60,
                x: 405,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 800,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [optOption]
                    },
                ]
            },
*/
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 1000,
                y: 460,
                defaultType: 'textfield',
                border: false,
                items: [txtPass]
 
           },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 1000,
                y: 460,
                defaultType: 'textfield',
                border: false,
                items: [txtPass2]
 
           },
            {
                xtype: 'fieldset',
                title: '',
                width: 800,
                height: 80,
                x: 100,
                y: 5,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 300,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtCNNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 300,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbCNNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 260,
                        x: 0,
                        y: 35,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 500,
                        x: 300,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAccountName]
                    }, 
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 500,
                        x: 300,
                        y: 30,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbReason]
                    }, 
/*
                  {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 400,
                        width: 500,
                        x: 220,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [lblIns]
                    },
*/
                ]
            },flxLedger,


            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 420,
                x: 5,
                y: 90,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [

            {
                xtype: 'fieldset',
                title: '',
                width: 880,
                height: 190,
                x: 5,
                y: 5,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 250,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbInvNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 220,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 220,
                        y: -10,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpInvDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 200,
                        x: 400,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvValue]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 200,
                        x: 560,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvBalance]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 870,
                        x: 10,
                        y: 30,
                        defaultType: 'textfield',
                        border: false,
                        items: [flxInvDetail]
                    },


                ]
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
                labelWidth: 70,
                width: 400,
                x: 0,
                y: 320,
                defaultType: 'textfield',
                border: false,
                items: [txttdsper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 190,
                y: 320,
                defaultType: 'textfield',
                border: false,
                items: [txttdsvalue]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 60,
                width: 350,
                x: 250,
                y: 250,
                defaultType: 'textfield',
                border: false,
                items: [txtQty]
            }, 



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 490,
                y: 250,
                defaultType: 'textfield',
                border: false,
                items: [txtTotTaxable]
            }, 



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 20,
                y: 280,
                defaultType: 'textfield',
                border: false,
                items: [txtTaxable]
            },
 
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 500,
                x: 300,
                y: 280,
                defaultType: 'textfield',
                border: false,
                items: [cmbDRCRledger]
            },



             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 310,
                defaultType: 'textfield',
                border:false,
                items: [txtCgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 120,
                x: 170,
                y: 310,
                defaultType: 'textfield',
                border: false,
                items: [txtCgstvalue]
            },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 300,
                        y: 310,
                        border: false,
                        items: [cmbCGSTledger]
                    },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 340,
                defaultType: 'textfield',
                border:false,
                items: [txtSgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 120,
                x: 170,
                y: 340,
                defaultType: 'textfield',
                border: false,
                items: [txtSgstvalue]
            },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 300,
                        y: 340,
                        border: false,
                        items: [cmbSGSTledger]
                    },

             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 370,
                defaultType: 'textfield',
                border:false,
                items: [txtIgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 120,
                x: 170,
                y: 370,
                defaultType: 'textfield',
                border: false,
                items: [txtIgstvalue]
            },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 300,
                        y: 370,
                        border: false,
                        items: [cmbIGSTledger]
                    },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 500,
                x: 710,
                y: 360,
                defaultType: 'textfield',
                border: false,
                items: [txtRounding]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 640,
                y: 400,
                defaultType: 'textfield',
                border: false,
                items: [txtPartyCredit]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 800,
                height: 100,
                x: 0,
                y: 435,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
            }, 




		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE - CREDIT NOTE',
		                       width       : 370,
		                       height      : 280,
		                       x           : 910,
		                       y           : 0,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnEInvoice,btnReupload,flxEInvStatus
             
                                       ]
		                          
		                },



                ]  
             },
            {
                xtype: 'panel',
                title: ' Ledger Details',
                     id   : 'tab2', 
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
			labelWidth: 100,
			width: 1000,
			x: 10,
			y: 50,
			defaultType: 'textfield',
			border: false,
			items: [flxDetail]
		    }, 

	
		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 100,
			width: 350,
			x: 100,
			y: 360,
			defaultType: 'textfield',
			border: false,
			items: [txtTotDebit]
		    }, 

		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 100,
			width: 350,
			x: 320,
			y: 360,
			defaultType: 'textfield',
			border: false,
			items: [txtTotCredit]
		    },


                ] 

             }
        ]       
   });
    var CreditNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Credit Note',
        header: false,
//        bodyStyle: {"background-color": "#acbf95"},
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
        id: 'CreditNoteFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
//            bodyStyle: "background: #d7d5fa;",
            height: 40,
  //          style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
//save
                    text: 'Save',
                    id : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                          save_click();
                        }
                    }
                }, '-',

                {
//Edit
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
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
				var compcode = "&compcode=" + encodeURIComponent(gstfincompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginfinid);
				var vouno = "&vouno=" + encodeURIComponent(cmbCNNo.getRawValue());

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',



                {
                    text: 'View -E-Credit Note',
                    id: 'viewcM',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(gstfincompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginfinid);
				var vouno = "&vouno=" + encodeURIComponent(cmbCNNo.getRawValue());

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrint_ECreditNote.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',

                {
//CANCEL
                    text: 'CANCEL',
                    id  : 'doccancel',
                    style: 'text-align:center;',
                    tooltip: 'Cancel Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtPass').show();
                        }
                    }
                }, '-',
                {
//DELETE
                    text: 'DELETE',
                    id  : 'docdelete',
                    style: 'text-align:center;',
                    tooltip: 'Delete Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
alert("HELLO");
                              Ext.getCmp('txtPass2').show();
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
                            CreditNoteWindow.hide();
                        }
                    }
                }]
        },
        items: [
              tabCreditNote


        ]
    });

    function RefreshData() {
        flxLedger.hide();
        Ext.getCmp('save').setDisabled(false); 
        Ext.getCmp('btnEInvoice').setDisabled(false); 
        Ext.getCmp('btnReupload').setDisabled(false); 
        Ext.getCmp('EInv').setVisible(false);
        Ext.getCmp('editchk').hide();
        Ext.getCmp('doccancel').hide();
        Ext.getCmp('txtPass').hide();
        Ext.getCmp('txtPass2').hide();
         Ext.getCmp('cmbCNNo').setVisible(false);


         cmbReason.setRawValue("CASH DISC");
      if (gstfincompcode == 90)
           Ext.getCmp('EInv').setVisible(false);


        gstFlag = "Add";
        billflag = "C";
        cmbDRCRledger.setValue('');
        txtAccountName.setValue('');
        txtCNNo.setValue('');
        txtTotTaxable.setValue('');
        txttcsvalue.setValue('');
        txtCreditValue.setValue('');
        txtInvDate.setValue('');
        txtInvValue.setValue('');
        txtNarration.setValue('');
        txtInvBalance.setValue('');
        txttdsper.setValue('');
        txttdsvalue.setValue('');
        txtCgstper.setValue('');
        txtCgstvalue.setRawValue('');
        txtSgstper.setValue('');
        txtSgstvalue.setRawValue('');
        txtIgstper.setValue('');
        txtIgstvalue.setRawValue('');
        txttcsvalue.setRawValue('');
        txtTaxable.setValue('');
        txtPartyCredit.setValue('');
        txtTotDebit.setValue('');
        txtTotCredit.setValue('');
        txtRounding.setValue('');
        flxInvDetail.getStore().removeAll();
        txtAccountName.focus();
        ControlmasterDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'ControlCreditNo',
                ginfinid: ginfinid,
                gincompcode: gstfincompcode
            },
            callback: function () {
                       if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 10)
                        {                                              
                          vno = "00"+ControlmasterDataStore.getAt(0).get('accref_vouno');
                        }                                      
                        else
                        {  
                             if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 100) 
                             {                                              
                              vno = "0"+ControlmasterDataStore.getAt(0).get('accref_vouno');                   
                             }
                             else 
                             {      
                               vno = ControlmasterDataStore.getAt(0).get('accref_vouno');  
                             }
                        } 


                     vno =  "CNG-"+vno.slice(-4);  
//                                     vno = vno.trim() +'/'+ invfin; 
                     txtCNNo.setValue(vno);      

            }
        });

    }

    var CreditNoteWindow = new Ext.Window({
        width: 1300,
        height: 620,
        y: 20,
        items: CreditNoteFormPanel,
        bodyStyle: {"background-color": "#acbf95"},
        title: 'Credit Note',
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
 cmbReason.setRawValue("CASH DISC");
           Ext.getCmp('EInv').setVisible(false);
                gstFlag = "Add";
                billflag = "C";
               Ext.getCmp('editchk').hide();
               flxLedger.hide();              
               Ext.getCmp('cmbCNNo').setVisible(false);
               Ext.getCmp('doccancel').hide();

        dtpDate.focus();

      if (gstfincompcode == 90)
           Ext.getCmp('EInv').setVisible(false);
              Ext.getCmp('txtPass').hide();
              Ext.getCmp('txtPass2').hide();
                ControlmasterDataStore.load({
                    url: 'ClsCreditNote.php',
                    params: {
                        task: 'ControlCreditNo',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                                  if (ginfinid >= 24)  
                                  { 


//                                     var vno = "00"+ControlmasterDataStore.getAt(0).get('accref_vouno');   
//                                     vno =  "CNG-"+vno.slice(-4);  
//  	                             txtCNNo.setValue(vno);

                                       if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 10)
                                        {                                              
                                          vno = "00"+ControlmasterDataStore.getAt(0).get('accref_vouno');
                                        }                                      
                                        else
                                        {  
                                             if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 100) 
                                             {                                              
                                              vno = "0"+ControlmasterDataStore.getAt(0).get('accref_vouno');                   
                                             }
                                             else 
                                             {      
                                               vno = ControlmasterDataStore.getAt(0).get('accref_vouno');  
                                             }
                                        } 


                                     vno =  "CNG-"+vno.slice(-4);  
//                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtCNNo.setValue(vno);

                                  }
                                  else
                                  {
                                     txtCNNo.setValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                                  } 

                //        txtCNNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                });




                                    CustNameDataStore.load({
                                        url: 'ClsCreditNote.php',
                                        params: {
                                            task: 'loadCustNameList',
                                            gincompany: gstfincompcode,
                                            ginfinid: ginfinid,
                  
                                        }
                                    });



                LedgernameDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'GeneralLedger',
        
                    },
                      callback : function() {  

			const input = document.getElementById('dtpDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
                     }       
                });

                gst_depname = "A";
               	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: '/SHVPM/Accounts/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
                       cmbIGSTledger.disable();

              txtAccountName.focus();
            }
        }
    });
    CreditNoteWindow.show();
});
	
