/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();

    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfinuser = localStorage.getItem('ginuser');
    var gstfincompcode = localStorage.getItem('gincompcode');
    var usertype = localStorage.getItem('ginuser');
    var UserName = localStorage.getItem('ginusername');
    var hsncode = ''; 
    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

    var partycode = 0;
    var accseqno = 0;

    var dncrseqno = 0;
    var vouseqno = 0;
    var payterms = 0;
    var taxtag = 0;
    var invvouno = '';
var quality = '';
new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

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



var txtTCS = new Ext.form.NumberField({
	fieldLabel  : 'TCS',
	id          : 'txtTCS',
	name        : 'txtTCS',
	width       :  80,
	readOnly : true,
	tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

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


var LoadFreightLedgerDataStore = new Ext.data.Store({
      id: 'LoadFreightLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFreightLeders"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    });



 var loadInvVarietyDatastore = new Ext.data.Store({
      id: 'loadInvVarietyDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceVarity"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'vargrp_type_name'
      ]),
    });

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
'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode','dbcrt_tcsvalue','dbcrt_tcsper', 'dbcrt_tcsper', 'dbcrt_tcsledcode', 'cust_name' ,'dbcr_accseqno','dbcr_seqno','dbcr_no','dbcrt_rounding','U_AckNo', 'accref_link_seqno'
      ]),
    });

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

var dgrecord1 = Ext.data.Record.create([]);
var flxEInvStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:150,
    height: 155,
    hidden:false,
    title:'E-INV STATUS',
    width: 240,
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
    height  : 50,
    x       : 40,
    y       : 60,    
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

              dncndate = Ext.util.Format.date(dtpInvDate.getRawValue(), "Y-m-d");


            var fromdate;
            var todate;
            var gstRefno;
            fromdate = "04/01/" + gstfinyear.substring(0, 4);
            todate = "03/31/" + gstfinyear.substring(5, 9);
            if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                Ext.MessageBox.alert("Alert", "Voucher Date is not in current finance year");
            } else if (Ext.util.Format.date(dtpDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                Ext.MessageBox.alert("Alert", "Voucher Date is not in current finance year");
            }  else if (cmbCustomerName.getRawValue() === cmbDRCRledger.getRawValue()) {
                Ext.MessageBox.alert("Credit Note", "Party and Creditor Names Are Equal");
            } else if (partycode == 0) {
                Ext.MessageBox.alert("Credit Note", "Customer Name Should Not be Empty");
            } else if (cmbDRCRledger.getValue() == 0) {
                Ext.MessageBox.alert("Credit Note", "Creditor Name Should Not be Empty");
//                            } else if (Number(txtTotTaxable.getValue()) <= 0) {
//                                Ext.MessageBox.alert("Credit Note", "Total Value  Should Not Be Zero");
            } else if (Number(txtTaxable.getValue()) <= 0) {
                Ext.MessageBox.alert("Credit Note", "Taxable  Value  Should Not Be Zero");
            } else if  (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == '') {
                Ext.MessageBox.alert("Credit Note", "Select CGST / SGST Ledger Names");
            } else if   (cmbIGSTledger.getValue() == '') {
                Ext.MessageBox.alert("Credit Note", "Select IGST Ledger Names");
            } else if  (txtCgstvalue.getValue() > 0 && Number(txtCgstper.getValue()) == 0) {
                Ext.MessageBox.alert("Credit Note", "Select GST %");

            } 
            else if (flxAccounts.getStore().getCount()==0)
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


                               var accData = flxAccounts.getStore().getRange();
                               var accupdData = new Array();
                               Ext.each(accData, function (record) {
                                  accupdData.push(record.data);
                               });

              



                                Ext.Ajax.request({
                                    url: 'FrmTrnCreditNoteSaveSalesReturn.php',
                                    params: {

                                        griddet: Ext.util.JSON.encode(accupdData),
                                        cnt: accData.length,


                                        savetype: gstFlag,
                                        finid: ginfinid,
                                        finyear: gstfinyear,
                                        compcode: gstfincompcode,

                                        accrefseq : accseqno,
                                        dncrseqno : dncrseqno,
                                        conval    : vouseqno,

                                        vouno: txtCNNo.getRawValue(),
                                        voudate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        bankname: "",
                                        invno:  cmbInvNo.getRawValue(),
                                        invdate: Ext.util.Format.date(dtpInvDate.getValue(), "Y-m-d"),
                                        narration: txtNarration.getRawValue(),
                                        paytype: "CNG",
                                        paymode: "",
                                        output: 'N',
                                        payno: "",
                                        paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        party   : partycode,
                                        partyledcode : cmbCustomerName.getValue(),
                                        drcrledger: cmbDRCRledger.getValue(),
                                        tdsper  : 0,
                                        tdsvalue: 0,
                                        taxtype: 0,
                                        cgstper: txtCgstper.getValue(),
                                        cgstval: txtCgstvalue.getRawValue(),
                                        sgstper: txtSgstper.getValue(),
                                        sgstval: txtSgstvalue.getRawValue(),
                                        igstper: txtIgstper.getValue(),
                                        igstval: txtIgstvalue.getRawValue(),
     

                                        TCSVAL: 0,
                                        taxable: Number(txtTaxable.getValue()),
                                        CreditValue: Number(txtPartyCredit.getValue()),

                                        billmode: '',
                             
                                        cgst  : cmbCGSTledger.getValue(),
                                        sgst  : cmbSGSTledger.getValue(),
                                        igst  : cmbIGSTledger.getValue(),
                                        tcsper: txtTCSper.getValue(),
                                        tcsledger: cmbTCSledger.getValue(),
                                        tcsvalue : txtTCS.getValue(),

                                        frtledger: cmbFrtLedger.getValue(),
                                        frtvalue : txtFrtAmount.getValue(),


//''                                                        cnt: accData.length,
                                        gltype : 'C',
                                        invno  :  cmbInvNo.getRawValue(),
                                        usercode : GinUserid, 
                                        rounding : txtRounding.getValue(),                               
                                        hsncode  : txtHSN.getValue(),
                                        invvouno : invvouno,  
                                        payterms : payterms,                              

                                        qty      : txtReturnQty.getRawValue(),
                                        cdreason : 'SAL RETURN',
                                        itemname    : quality,

                                    },
                                    callback: function (options, success, response)
                                    {
                                        var obj = Ext.decode(response.responseText);
                                        if (obj['success'] === "true") {


                                            RefreshData();

                                            Ext.Msg.show({
                                                title: 'Saved',
                                                icon: Ext.Msg.QUESTION,
                                                buttons: Ext.MessageBox.OK,
                                                msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                fn: function (btn) {
                                                    if (btn === 'ok') {
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

    var loadCreditLedgerDataStore = new Ext.data.Store({
        id: 'loadCreditLedgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadCreditLeders"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });


	var InvoicNoListDataStore = new Ext.data.Store({
	id: 'InvoicNoListDataStore',
	proxy: new Ext.data.HttpProxy({
	    url: 'ClsCreditNote.php', // File to connect to
	    method: 'POST'
	}),
	baseParams: {task: "loadSRInvNoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
	    // we tell the datastore where to get his data from
	    root: 'results',
	    totalProperty: 'total',
	    id: 'id'
	}, [
	    'reth_invno'
	])
	});


	var InvoicNoDetailDataStore = new Ext.data.Store({
	id: 'InvoicNoDetailDataStore',
	proxy: new Ext.data.HttpProxy({
	    url: 'ClsCreditNote.php', // File to connect to
	    method: 'POST'
	}),
	baseParams: {task: "loadSRInvNoDetail"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
	    // we tell the datastore where to get his data from
	    root: 'results',
	    totalProperty: 'total',
	    id: 'id'
	}, [
	    'reth_no', 'reth_date', 'reth_cust', 'reth_noofreels', 'reth_totwt', 'reth_taxtag', 'reth_insper', 'reth_insamt', 'reth_frieght', 'reth_roff', 'reth_amt', 'reth_invno', 'reth_invdate', 'reth_taxable', 'reth_cgst_per', 'reth_cgst_amt', 'reth_sgst_per', 'reth_sgst_amt', 'reth_igst_per', 'reth_igst_amt', 'reth_slipno', 'reth_vouno', 'reth_vouyear', 'reth_accrefno', 'reth_voudate', 'reth_accupd', 'invh_totwt','invh_acc_refno','invh_vouno','invh_crd_days',
'reth_return_wt','reth_tcs','invh_tcs_per','reth_frieght','invh_taxtag'

	])
	});


var loadHSNDataStore = new Ext.data.Store({
id: 'loadHSNDataStore',
proxy: new Ext.data.HttpProxy({
    url: 'ClsCreditNote.php', // File to connect to
    method: 'POST'
}),
baseParams: {task: "loadSRInvNoHSN"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
    // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
}, [
    'hsncode'

])
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



    var CustNameDataStore = new Ext.data.Store({
        id: 'CustNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSRCustNameList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_ref', 'cust_code'])
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


var LoadTCSLedgerDataStore = new Ext.data.Store({
      id: 'LoadTCSLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsCreditNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTCSledgers"}, // this parameter asks for listing
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


var cmbTCSledger = new Ext.form.ComboBox({
        fieldLabel      : 'TCS Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbTCSledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadTCSLedgerDataStore,
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

    var cmbDRCRledger = new Ext.form.ComboBox({
        fieldLabel: 'Credit Ledger',
        width: 300,
        store: loadCreditLedgerDataStore,
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


            }
        }
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 695,
        height: 50,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
          /*  blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }*/
        }
    });

    var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel: 'Inv. No',
        width: 140,
        store: InvoicNoListDataStore,
        displayField: 'reth_invno',
        valueField: 'reth_invno',
        hiddenName: 'reth_invno',
        id: 'cmbInvNo',
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
            select: function () {

                InvoicNoDetailDataStore.removeAll();
                InvoicNoDetailDataStore.load({
                    url: 'ClsCreditNote.php',
                    params: {
                        task: 'loadSRInvNoDetail',
                        invoiceno  : cmbInvNo.getRawValue(),
		        ginfinid   : ginfinid,
		        gincompcode: gstfincompcode,
                        ledcode    : cmbCustomerName.getValue(),
                        editchk    : 'N',
                    },
                    callback: function () {
                        dtpInvDate.setValue(Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_invdate'), "d-m-Y"));
                        dtpInvRetDate.setRawValue(Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_date'), "d-m-Y"));
                        txtRRNo.setRawValue(InvoicNoDetailDataStore.getAt(0).get('reth_no'));

                        txtInvQty.setRawValue(Ext.util.Format.number(Number(InvoicNoDetailDataStore.getAt(0).get('invh_totwt')/1000),'0.000'));
                        txtReturnQty.setRawValue(Ext.util.Format.number(Number(InvoicNoDetailDataStore.getAt(0).get('reth_return_wt')/1000),'0.000'));
                        txtTaxable.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_taxable'),'0.00'));
                        txtCgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_cgst_per'),'0.00'));
                        txtCgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_cgst_amt'),'0.00'));

                        txtSgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_sgst_per'),'0.00'));
                        txtSgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_sgst_amt'),'0.00'));

                        txtIgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_igst_per'),'0.00'));
                        txtIgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_igst_amt'),'0.00'));

                        txtRounding.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_roff'),'0.00'));

                        txtPartyCredit.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_amt'),'0.00'));

                        txtTCSper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('invh_tcs_per'),'0.00'));
                        txtTCS.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_tcs'),'0.00'));
                        txtFrtAmount.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_frieght'),'0.00'));


                        taxtag = InvoicNoDetailDataStore.getAt(0).get('invh_taxtag');
                        partycode = InvoicNoDetailDataStore.getAt(0).get('reth_cust');
                        accseqno = InvoicNoDetailDataStore.getAt(0).get('invh_acc_refno');
                        invvouno = InvoicNoDetailDataStore.getAt(0).get('invh_vouno');
                        payterms = InvoicNoDetailDataStore.getAt(0).get('invh_crd_days');



		        loadCreditLedgerDataStore.removeAll();
		        loadCreditLedgerDataStore.load({
		            url: 'ClsCreditNote.php',
		            params: {
		                task: 'loadCreditLeders',
		                gsttype : InvoicNoDetailDataStore.getAt(0).get('reth_taxtag'),
		            },
		            callback: function () {
                               cmbDRCRledger.setValue(loadCreditLedgerDataStore.getAt(0).get('cust_code')); 
                            }
                        });   


		        LoadFreightLedgerDataStore.removeAll();
		        LoadFreightLedgerDataStore.load({
		            url: 'ClsCreditNote.php',
		            params: {
		                task: 'loadFreightLeders',
		                gsttype : InvoicNoDetailDataStore.getAt(0).get('reth_taxtag'),
		            },
		            callback: function () {
                               cmbFrtLedger.setValue(LoadFreightLedgerDataStore.getAt(0).get('cust_code')); 
                            }
                        }); 


                        findledgers();
                        txtNarration.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS REEL RETURN FOR OUR INV NO." + cmbInvNo.getRawValue() + " DT. " + Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_invdate'), "d-m-Y") + " RETURN QTY " +  txtReturnQty.getRawValue() + " MT  -  CREDIT AMOUNT : " + txtPartyCredit.getRawValue()+ "/-"  );
                        

                    }
                });



                loadHSNDataStore.removeAll();
                loadHSNDataStore.load({
                    url: 'ClsCreditNote.php',
                    params: {
                        task: 'loadSRInvNoHSN',
                        invoiceno  : cmbInvNo.getRawValue(),
		        ginfinid   : ginfinid,
		        gincompcode: gstfincompcode,

                    },
                    callback: function () {
                     txtHSN.setRawValue(loadHSNDataStore.getAt(0).get('hsncode'));
                    }
                 });    

        quality  = '';
        loadInvVarietyDatastore.removeAll();
        loadInvVarietyDatastore.load({
            url: 'ClsCreditNote.php',
            params:
                    {
                        task  :"loadInvoiceVarity",
                        compcode : gstfincompcode,
                        invno : cmbInvNo.getRawValue(),   
                  
                    },
                     callback : function() {  
         	var cnt = loadInvVarietyDatastore.getCount();
                if (cnt > 0)
                {
                     quality  = loadInvVarietyDatastore.getAt(0).get('vargrp_type_name');   

                } 

                     }
        });

            }
        }
    });


    var txtInvQty = new Ext.form.NumberField({
        fieldLabel: 'Invoiec Qty(t)',
        id: 'txtInvQty',
        width: 90,
        name: 'txtInvQty',
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
        }
    });


    var txtReturnQty = new Ext.form.NumberField({
        fieldLabel: 'Return Qty(t)',
        id: 'txtReturnQty',
        width: 90,
        name: 'txtReturnQty',
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
        }
    });


    var txtHSN = new Ext.form.NumberField({
        fieldLabel: 'HSN',
        id: 'txtHSN',
        width: 100,
        name: 'txtHSN',
        readOnly : true,
        enableKeyEvents: true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        //allowDecimals: false,
        listeners: {
        }
    });


 function findledgers()
   {
        LoadCGSTLedgerDataStore.removeAll();
        LoadCGSTLedgerDataStore.load({
           url: 'ClsCreditNote',
           params: {
                task: "loadCGSTledgers",
           },
  	   callback:function()
           {
             cmbCGSTledger.setValue(LoadCGSTLedgerDataStore.getAt(0).get('cust_code')); 


           } 
       });
        LoadSGSTLedgerDataStore.removeAll();
        LoadSGSTLedgerDataStore.load({
           url: 'ClsCreditNote',
           params: {
                task: "loadSGSTledgers",
           },
  	   callback:function()
           {
             cmbSGSTledger.setValue(LoadSGSTLedgerDataStore.getAt(0).get('cust_code')); 
             ViewAccounts();
           } 
       });

        LoadIGSTLedgerDataStore.removeAll();
        LoadIGSTLedgerDataStore.load({
           url: 'ClsCreditNote',
           params: {
                task: "loadIGSTledgers",
           },
  	   callback:function()
           {
             cmbIGSTledger.setValue(LoadIGSTLedgerDataStore.getAt(0).get('cust_code')); 
             ViewAccounts();
           } 
       });

        LoadTCSLedgerDataStore.removeAll();
        LoadTCSLedgerDataStore.load({
           url: 'ClsCreditNote',
           params: {
                task: "loadTCSledgers",
           },
  	   callback:function()
           {
             cmbTCSledger.setValue(LoadTCSLedgerDataStore.getAt(0).get('cust_code')); 
             ViewAccounts();
           } 
       });


        LoadFreightLedgerDataStore.removeAll();
        LoadFreightLedgerDataStore.load({
           url: 'ClsCreditNote',
           params: {
                task: "loadFreightLeders",
           },
  	   callback:function()
           {
             cmbFrtLedger.setValue(LoadFreightLedgerDataStore.getAt(0).get('cust_code')); 
             ViewAccounts();
           } 
       });

   }



    var txtTaxable = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value',
        id: 'txtTaxable',
        width: 90,
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
        width: 90,
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
        width: 90,
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
        width: 90,
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
 
            }
        }
    });

    var txtFrtAmount= new Ext.form.NumberField({
        fieldLabel: 'Freight Amount ',
        id: 'txtFrtAmount',
        width: 90,
        name: 'txtFrtAmount',
        enableKeyEvents: true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        listeners: {
              keyup: function () {
                  findTaxableValue();
                },
              keychange: function () {
                  findTaxableValue();
                },

        }
    });


var cmbFrtLedger = new Ext.form.ComboBox({
        fieldLabel      : 'Freight Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbFrtLedger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadFreightLedgerDataStore,
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


    var txtTCSper = new Ext.form.NumberField({
        fieldLabel: 'TCS % Amt',
        id: 'txtTCSper',
        width: 40,
        name: 'txtTCSper',
        enableKeyEvents: true,
        //allowDecimals: false,

        readOnly: true,
        listeners: {
            keyup: function () {
              findledgers()
            }   
        }
    });

    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 90,
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

            }   
        }
    });

    var txtPartyCredit = new Ext.form.NumberField({
        fieldLabel: 'Credited Amount',
        id: 'txtPartyCredit',
        width: 90,
        name: 'txtPartyCredit',
        enableKeyEvents: true,
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:16px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
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


var dgaccrecord  = Ext.data.Record.create([]);
var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 140,
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
       {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 100, align: 'left',hidden : false}
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

    var dtpInvDate = new Ext.form.DateField({
        fieldLabel: ' Date',
        id: 'dtpInvDate',
        name: 'dtpInvDate',
        format: 'd-m-Y',
        value: new Date(),
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
        }
      });     


    var txtRRNo = new Ext.form.TextField({
        fieldLabel: 'Sales Return No',
        id: 'txtRRNo',
        width: 100,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var dtpInvRetDate = new Ext.form.DateField({
        fieldLabel: 'Return Date',
        id: 'dtpInvRetDate',
        name: 'dtpInvRetDate',
        format: 'd-m-Y',
        value: new Date(),
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
        }
      });    

    var txtCNNo = new Ext.form.TextField({
        fieldLabel: 'Credit Note No',
        id: 'txtCNNo',
        width: 100,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });

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
/*
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
*/
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

                       if (gstfincompcode == 1)  
                           Ext.getCmp('EInv').setVisible(true);
                       else
                            Ext.getCmp('EInv').setVisible(false);

                   
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


                                cmbCustomerName.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('cust_name'));
//                                cmbCustomerName.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode'));
				txtPartyCredit.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_value'));
				cmbInvNo.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'));

                                dtpInvDate.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'));
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
				txtTCSper.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_tcsper'));
				txtTCS.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_tcsvalue'));
				cmbTCSledger.setValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstledcode'));


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



                InvoicNoDetailDataStore.removeAll();
                InvoicNoDetailDataStore.load({
                    url: 'ClsCreditNote.php',
                    params: {
                        task: 'loadSRInvNoDetail',
                        invoiceno  : cmbInvNo.getRawValue(),
		        ginfinid   : ginfinid,
		        gincompcode: gstfincompcode,
                        ledcode    : partycode,
                        editchk    : 'Y',
                    },
                    callback: function () {
                        dtpInvDate.setValue(Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_invdate'), "d-m-Y"));
                        dtpInvRetDate.setRawValue(Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_date'), "d-m-Y"));
                        txtRRNo.setRawValue(InvoicNoDetailDataStore.getAt(0).get('reth_no'));

                        txtInvQty.setRawValue(Ext.util.Format.number(Number(InvoicNoDetailDataStore.getAt(0).get('invh_totwt')/1000),'0.000'));
                        txtReturnQty.setRawValue(Ext.util.Format.number(Number(InvoicNoDetailDataStore.getAt(0).get('reth_totwt')/1000),'0.000'));
                        txtTaxable.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_taxable'),'0.00'));
                        txtCgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_cgst_per'),'0.00'));
                        txtCgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_cgst_amt'),'0.00'));

                        txtSgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_sgst_per'),'0.00'));
                        txtSgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_sgst_amt'),'0.00'));

                        txtIgstper.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_igst_per'),'0.00'));
                        txtIgstvalue.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_igst_amt'),'0.00'));

                        txtRounding.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_roff'),'0.00'));

                        txtPartyCredit.setRawValue(Ext.util.Format.number(InvoicNoDetailDataStore.getAt(0).get('reth_amt'),'0.00'));

                        partycode = InvoicNoDetailDataStore.getAt(0).get('reth_cust');
                        accseqno = InvoicNoDetailDataStore.getAt(0).get('invh_acc_refno');
                        invvouno = InvoicNoDetailDataStore.getAt(0).get('invh_vouno');
                        payterms = InvoicNoDetailDataStore.getAt(0).get('invh_crd_days');


		        loadCreditLedgerDataStore.removeAll();
		        loadCreditLedgerDataStore.load({
		            url: 'ClsCreditNote.php',
		            params: {
		                task: 'loadCreditLeders',
		                gsttype : InvoicNoDetailDataStore.getAt(0).get('reth_taxtag'),
		            },
		            callback: function () {
                               cmbDRCRledger.setValue(loadCreditLedgerDataStore.getAt(0).get('cust_code')); 
                            }
                        });   

                        findledgers();
                        txtNarration.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS REEL RETURN FOR OUR INV NO." + cmbInvNo.getRawValue() + " DT. " + Ext.util.Format.date(InvoicNoDetailDataStore.getAt(0).get('reth_invdate'), "d-m-Y") + " RETURN QTY " + Ext.util.Format.number(Number(InvoicNoDetailDataStore.getAt(0).get('reth_totwt')/1000),'0.000') + " MT  -  CREDIT AMOUNT : " + txtPartyCredit.getRawValue()+ "/-"  );
                        
				txtNarration.setRawValue(LoadCreditNoteVoucherDetailDataStore.getAt(0).get('dbcr_narration'));
                    }
                });
 
                loadHSNDataStore.removeAll();
                loadHSNDataStore.load({
                    url: 'ClsCreditNote.php',
                    params: {
                        task: 'loadSRInvNoHSN',
                        invoiceno  : cmbInvNo.getRawValue(),
		        ginfinid   : ginfinid,
		        gincompcode: gstfincompcode,

                    },
                    callback: function () {
                     txtHSN.setRawValue(loadHSNDataStore.getAt(0).get('hsncode'));
                    }
                 });    
ViewAccounts();


	                  }
			});









           }
        }
});  



    function CalcTotalDebitCredit() {


        flxAccounts.getSelectionModel().selectAll();
        var selrows = flxAccounts.getSelectionModel().getCount();
        var sel = flxAccounts.getSelectionModel().getSelections();
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


function ViewAccounts()
{

                flxAccounts.getStore().removeAll();

                var gstInsert = "true";
                if (partycode == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select Debit Party / Ledger");
                }

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
                flxAccounts.getSelectionModel().selectAll();
                var selrows = flxAccounts.getSelectionModel().getCount();
                var sel = flxAccounts.getSelectionModel().getSelections();

                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq === cmbCustomerName.getValue()) {
                        cnt = cnt + 1;
                    }
                }
*/

                if (gstInsert == "true")
                {

    
                        if (gstInsert === "true") {
                           var totamt;
                           var RowCnt = flxAccounts.getStore().getCount() + 1;
                           flxAccounts.getStore().insert(
                                flxAccounts.getStore().getCount(),
                                new dgaccrecord({
                                    slno: RowCnt,
                                    ledcode: partycode,
                                    ledname: cmbCustomerName.getRawValue(),
                                    debit : 0,
                                    credit : Ext.util.Format.number(Number(txtPartyCredit.getRawValue()),'0.00'),
                                    ledtype : 'C'
                                })
                          );


             var taxval = Number(txtTaxable.getValue()) - Number(txtFrtAmount.getValue());
       
//anna
                          if (Number(txtTaxable.getValue()) > 0)
                          {  
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbDRCRledger.getValue(),
		                            ledname: cmbDRCRledger.getRawValue(),
		                            debit : Ext.util.Format.number(Number(taxval),'0.00'),
		                            credit : 0,
		                            ledtype : 'G'
		                        })
		                  );
                          }



                          if (Number(txtFrtAmount.getValue()) > 0)
                          {  
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbFrtLedger.getValue(),
		                            ledname: cmbFrtLedger.getRawValue(),
		                            debit : Ext.util.Format.number(Number(txtFrtAmount.getRawValue()),'0.00'),
		                            credit : 0,
		                            ledtype : 'G'
		                        })
		                  );
                          }


                          if (Number(txtCgstvalue.getValue()) > 0)
                          { 
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
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
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
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
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
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
                          if (Number(txtTCS.getValue()) > 0)
                          { 
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
	                        new dgaccrecord({
	                            slno: RowCnt,
	                            ledcode: cmbTCSledger.getValue(),
	                            ledname: cmbTCSledger.getRawValue(),
	                            debit :  Ext.util.Format.number(Number(txtTCS.getRawValue()),'0.00'),
                                    credit : 0,
	                            ledtype : 'G'
	                        })
	                  );
                          }
                          if (Number(txtRounding.getValue()) > 0)
                          { 
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
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
	                   flxAccounts.getStore().insert(
	                        flxAccounts.getStore().getCount(),
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
//                          cmbCustomerName.setRawValue('');
//                          cmbCustomerName.focus();
                       }

              }
}




function refresh()
{
      if (gstfincompcode == 90)
           Ext.getCmp('EInv').setVisible(false);


      txtNarration.setRawValue('');
      flxAccounts.getStore().removeAll();
      InvoicNoListDataStore.removeAll();
      cmbInvNo.clearValue();
      cmbCGSTledger.clearValue();
      cmbSGSTledger.clearValue();
      cmbIGSTledger.clearValue();
      cmbDRCRledger.clearValue();
      dtpInvDate.setValue('');
      dtpInvRetDate.setRawValue('');
      txtRRNo.setRawValue('');
      txtInvQty.setRawValue('');
      txtReturnQty.setRawValue('');
      txtTaxable.setRawValue('');
      txtCgstper.setRawValue('');
      txtCgstvalue.setRawValue('');
      txtSgstper.setRawValue('');
      txtSgstvalue.setRawValue('');
      txtIgstper.setRawValue('');
      txtIgstvalue.setRawValue('');
      txtRounding.setRawValue('');
      txtPartyCredit.setRawValue('');
      txtHSN.setRawValue('');
}

    var cmbCustomerName = new Ext.form.ComboBox({
        fieldLabel: 'Customer Name',
        width: 350,
        store: CustNameDataStore,
        displayField: 'cust_ref',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbCustomerName',
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
            /*change: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            },*/
            select: function () {
                refresh();
                partycode = cmbCustomerName.getValue();
                InvoicNoListDataStore.removeAll();
		InvoicNoListDataStore.load({
		    url: 'ClsCreditNote.php',
		    params: {
		        task: 'loadSRInvNoList',
		        ginfinid   : ginfinid,
		        gincompcode: gstfincompcode,
                        ledcode    : cmbCustomerName.getValue(),
		    },
		    callback: function () {
		   
		    }
        });



            }
        }
    });



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


    var CreditNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Credit Note - For Sales Return',
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
                    id  : 'save',
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
   
        {
                xtype: 'fieldset',
                title: '',
                width: 1165,
                height: 80,
                x: 10,
                y: 0,
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
                        items: [cmbCustomerName]
                    }, 

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 350,
                        x: 300,
                        y: 35,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbInvNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 350,
                        x: 600,
                        y: 35,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpInvDate]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 300,
                        x: 850,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtRRNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 260,
                        x: 850,
                        y: 35,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpInvRetDate]
                    },
                ]
            },

           {
                xtype: 'fieldset',
                title: '',
                width: 1165,
                height: 465,
                x: 10,
                y: 80,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 20,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtInvQty]
            },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtReturnQty]
            },

             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 50,
                width: 500,
                x: 570,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtHSN]
            },

           {

                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 350,
                x: 20,
                y: 40,
                defaultType: 'textfield',
                border: false,
                items: [txtFrtAmount]
            },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 300,
                        y: 40,
                        border: false,
                        items: [cmbFrtLedger]
                    },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 20,
                y: 70,
                defaultType: 'textfield',
                border: false,
                items: [txtTaxable]
            },
              {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 70,
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
                y: 100,
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
                y: 100,
                defaultType: 'textfield',
                border: false,
                items: [txtCgstvalue]
            },

              {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 100,
                defaultType: 'textfield',
                border: false,
                items: [cmbCGSTledger]
            },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 130,
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
                y: 130,
                defaultType: 'textfield',
                border: false,
                items: [txtSgstvalue]
            },
              {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 130,
                defaultType: 'textfield',
                border: false,
                items: [cmbSGSTledger]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 800,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtRounding]
            },

             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 160,
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
                y: 160,
                defaultType: 'textfield',
                border: false,
                items: [txtIgstvalue]
            },

              {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 160,
                defaultType: 'textfield',
                border: false,
                items: [cmbIGSTledger]
            },



             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 20,
                y: 190,
                defaultType: 'textfield',
                border:false,
                items: [txtTCSper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 20,
                y: 190,
                defaultType: 'textfield',
                border: false,
                items: [txtTCS]
            },
              {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 300,
                y: 190,
                defaultType: 'textfield',
                border: false,
                items: [cmbTCSledger]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 800,
                y: 40,
                defaultType: 'textfield',
                border: false,
                items: [txtPartyCredit]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                x: 20,
                y: 220,
                defaultType: 'textfield',
                border: false,
                items: [flxAccounts]
            },

		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 100,
			width: 350,
			x: 200,
			y: 370,
			defaultType: 'textfield',
			border: false,
			items: [txtTotDebit]
		    }, 

		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 100,
			width: 350,
			x: 500,
			y: 370,
			defaultType: 'textfield',
			border: false,
			items: [txtTotCredit]
		    }, 
		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 80,
			width: 950,
			x: 20,
			y: 400,
			defaultType: 'textfield',
			border: false,
			items: [txtNarration]
		    }, 

		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE - CREDIT NOTE',
		                       width       : 300,
		                       height      : 350,
		                       x           : 820,
		                       y           : 100,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnEInvoice,btnReupload,flxEInvStatus
             
                                       ]
		                          
		                },


                ] 
           }  

        ]
    });

    function RefreshData() {

         Ext.getCmp('cmbCNNo').setVisible(false);
        gstFlag = "Add";
        Ext.getCmp('btnEInvoice').setDisabled(false); 
        Ext.getCmp('btnReupload').setDisabled(false); 
        Ext.getCmp('EInv').setVisible(false);
        cmbCustomerName.setValue('');
        txtCNNo.setValue('');
        refresh();

        txtCgstper.setValue('');
        txtCgstvalue.setRawValue('');
        txtSgstper.setValue('');
        txtSgstvalue.setRawValue('');
        txtIgstper.setValue('');
        txtIgstvalue.setRawValue('');

        txtTaxable.setValue('');
      dtpDate.focus();
        flxAccounts.getStore().removeAll();
        ControlmasterDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'ControlCreditNo',
                ginfinid: ginfinid,
                gincompcode: gstfincompcode
            },
            callback: function () {
                  if (ginfinid >= 24)  
                  {    
  //                   var vno = "00"+ControlmasterDataStore.getAt(0).get('accref_vouno');   
  //                   vno =  "CNG-"+vno.slice(-4);  
  //                   txtCNNo.setValue(vno);

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
  //              txtCNNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
            }
        });


        CustNameDataStore.load({
            url: 'ClsCreditNote.php',
            params: {
                task: 'loadSRCustNameList',
                ginfinid: ginfinid,
                gincompcode: gstfincompcode
            },
            callback: function () {
     			const input = document.getElementById('dtpDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();      
            }
        });

    }




    var CreditNoteWindow = new Ext.Window({
        width: 1200,
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
               RefreshData(); 
            }
        }
    });
    CreditNoteWindow.show();

});

