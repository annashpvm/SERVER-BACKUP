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

    var gstfincompcode = localStorage.getItem('gincompcode');

    var  invfin = localStorage.getItem('invfin');

    var hsncode = ''; 
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

    var partycode = 0;
    var dgrecord = Ext.data.Record.create([]);
    var dgaccrecord = Ext.data.Record.create([]);
 
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


    var quality = '';

    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsDebitNote.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "ControlDebitNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
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


var LoadDebitNoteVoucherTrailer2DataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherTrailer2DataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherDetailsTrailer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'dbcrt2_seqno', 'dbcrt2_inv_no', 'dbcrt2_inv_date', 'dbcrt2_sno', 'dbcrt2_hsn', 'dbcrt2_sizecode', 'dbcrt2_sizename', 'dbcrt2_weight', 'dbcrt2_rate', 'dbcrt2_taxable', 'dbcrt2_diff_rate', 'dbcrt2_diff_taxvalue'
      ]),
    });



    var txtPass = new Ext.form.TextField({
        fieldLabel : 'Password',
        id         : 'txtPass',
        name       : 'txtPass',
        inputType  : 'password',
        width      :  150,
        border     : false,
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
                            msg: 'Confirm Again Are you sure to Cancel the Debit No. ...'+cmbDNNo.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnDebitNoteCancelSave.php',
                               
             
                                       params :
				       {
		                                savetype  : gstFlag,
		                                finid     : ginfinid,
		                                compcode  : gstfincompcode,
		                                accrefseq : accseqno,
		                                dncrseqno : dncrseqno,
		                                conval    : vouseqno,
		                                vouno     : cmbDNNo.getRawValue(),
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("DEBIT NOTE Cancelled -" + obj['msg']);
                                                DebitNoteFormPanel.getForm().reset();
						flxDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("DEBIT NOTE Not Cancelled . Check " + obj['msg']);                                                  
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
       Ext.getCmp('cmbDNNo').setVisible(true);
       gstFlag = 'Edit';
       LoadDebitNoteVoucherDataStore.load({
           url: 'ClsDebitNote.php',
           params: {
	        task: 'LoadDebitNoteVoucherList',
	        fincode : ginfinid,
	        compcode: gstfincompcode,
                vtype   : 'SDN',
          },
          callback: function () {

          }
	});

}



 var EInvStatusDataStore = new Ext.data.Store({
      id: 'EInvStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
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
    height: 95,
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
    height  : 40,
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
		      url: 'FrmTrnDebitNoteE_Inv_Reupload.php',
		      params :
		      {
                        finid    : ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbDNNo.getRawValue(),
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
    text    : "GENERATE E-DEBIT NOTE",
    width   : 150,
    height  : 30,
    x       : 40,
    y       : 10,    
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
	      url: 'FrmTrnDebitNoteE_Inv_Confirm.php',
	      params :
	      {
                        finid: ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbDNNo.getRawValue(),
	      },
	      callback: function(options, success, response)
	      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("DEBIE NOTE Confirmed for E-Debit Note  -" + obj['vouno']);
//                      TrnSalesInvoicePanel.getForm().reset();
                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("DEBIT Note not Confirmed for E-Debit Note. Please check.." + obj['vouno']);                                                  
                  }
	      }
              }); 
            }
       }
   }
});




function save_click()
{
                           if (txtInvDate.getRawValue() == '')
                              dncndate = Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d");
                           else  
                              dncndate = Ext.util.Format.date(txtInvDate.getRawValue(), "Y-m-d");




                            var gstInsert = "true";

                            var fromdate;
                            var todate;
                            var gstRefno;
                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);
                            if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length    <5  )  )
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
                            }  else if (txtAccountName.getRawValue() === cmbDRCRledger.getRawValue()) {
                                Ext.MessageBox.alert("Debit Note", "Party and Creditor Names Are Equal");
                            } else if (partyledcode == 0) {
                                Ext.MessageBox.alert("Debit Note", "Party Name Should Not be Empty");
                            } else if (cmbDRCRledger.getValue() == 0) {
                                Ext.MessageBox.alert("Debit Note", "Creditor Name Should Not be Empty");
//                            } else if (Number(txtTotTaxable.getValue()) <= 0) {
//                                Ext.MessageBox.alert("Debit Note", "Total Value  Should Not Be Zero");
                            } else if (Number(txtTaxable.getValue()) <= 0) {
                                Ext.MessageBox.alert("Debit Note", "Taxable  Value  Should Not Be Zero");
                            } else if  ((taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                                Ext.MessageBox.alert("Debit Note", "Select CGST / SGST Ledger Names");
                            } else if  ( (taxtypenew == "I")  && (cmbIGSTledger.getValue() == '')) {
                                Ext.MessageBox.alert("Debit Note", "Select IGST Ledger Names");
                            } else if  (txtCgstvalue.getValue() > 0 && Number(txtCgstper.getValue()) == 0) {
                                Ext.MessageBox.alert("Debit Note", "Select GST %");

                            } 
			    else if (flxDetail.getStore().getCount()==0)
			    {
				Ext.Msg.alert('Debit Note','Grid should not be empty..');
			    }
                            else {
                                gstInsert = "true";
/*
                                if (grpcodetds == 65 && cmbDRCRledger.getRawValue()!== "TCS @0.075% ON SALES") {
                                    if (txttdsper.getRawValue() === "" || txttdsper.getValue() == 0) {
                                        gstInsert = "false";
                                        Ext.MessageBox.alert("Expenses", "Enter Tds Percentage!");
                                    } else if (txttdsvalue.getRawValue() === "" || txttdsvalue.getValue() == 0) {
                                        gstInsert = "false";
                                        Ext.MessageBox.alert("Expenses", "Enter Tds Value!");
                                    }
                                }
*/
                                if (gstInsert === "true") {
                                    Ext.Msg.show({
                                        title: 'Debit Note',
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
                                                    url: 'FrmTrnDebitNoteSave.php',
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

                                                        vouno: txtDnNo.getRawValue(),
                                                        voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        bankname: "",
                                                        refno: "",
                                                        refdate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        narration: txtNarration.getRawValue(),
                                                        paytype: "DNG",
                                                        paymode: "",
                                                        output: output,
                                                        payno: "",
                                                        paydate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
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
                                                        debitvalue: Number(txtPartyDebit.getValue()),

                                                        billmode: billflag,
                                             
                                                        cgst  : cmbCGSTledger.getValue(),
                                                        sgst  : cmbSGSTledger.getValue(),
                                                        igst  : cmbIGSTledger.getValue(),
//''                                                        cnt: accData.length,
                                                        gltype : partytype,
                                                        invno  :  cmbInvNo.getRawValue(),
                                                        invdate : dncndate,
                                                        usercode : GinUserid, 
                                                        rounding : txtRounding.getValue(),
                                                        reason   : txtReason.getRawValue(),
                                                        hsncode  : hsncode, 
				                        qty      : txtQty.getRawValue(),
                                                        finsuffix :invfin,
 			                                cdreason : cmbReason.getRawValue(),                                
                                                        itemname  : quality,

                                                    },
                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] === "true") {

							    Ext.MessageBox.alert("Record saved with Voucher No - -" + obj['vouno']);
							    DebitNoteFormPanel.getForm().reset();
							    flxDetail.getStore().removeAll();
							    RefreshData();
/*

*/
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


var PackslipdetailDataStoreNew = new Ext.data.Store({
      id: 'PackslipdetailDataStoreNew',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
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



var LoadDebitNoteVoucherDetailDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherDetailDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'dbcr_vouno', 'dbcr_date','dbcr_partycode','dbcr_partyledcode', 'dbcr_ledcode', 'dbcr_value', 'dbcr_narration', 'dbcr_party_type', 'dbcrt_serialno', 'dbcrt_inv_no', 'dbcrt_inv_date', 'dbcrt_grossvalue', 'dbcrt_value', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_igstper', 'dbcr_party_type',
'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode','dbcrt,_tcsvalue', 'dbcrt_tcsper', 'dbcrt_tcsledcode', 'cust_name' ,'dbcr_accseqno','dbcr_seqno','dbcr_no','dbcrt_rounding','U_AckNo'
      ]),
    });




var LoadDebitNoteVoucherDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dbcr_vouno','dbcr_seqno'
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

var LoadDebitNoteDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteDataStoref',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDNNoDetails"}, // this parameter asks for listing
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
   var Row= flxInvDetail.getStore().getCount();

 flxInvDetail.getSelectionModel().selectAll();
        var sel=flxInvDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
tdisc = 0;
           hsncode =  sel[i].data.invt_hsncode;
           if (sel[i].data.diffrate > 0 ) {
              dcgst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;
              dsgst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;
              digst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;

              dtaxval = Number(sel[i].data.diffrate)* Number(sel[i].data.weight)
              dtaxval =  Ext.util.Format.number(dtaxval,'0.00')
              sel[i].set('difftaxval', dtaxval);
           }
           else
           {
                   sel[i].set('difftaxval', '');
           }
        }
       dtaxval =0;
        var totqty = 0;
        for(i=0;i<Row;i++)
        {
           if (sel[i].data.difftaxval > 0 ) {
              dtaxval = dtaxval +  Number(sel[i].data.difftaxval);
              totqty  = Number(totqty) + Number(sel[i].data.weight);

           }
        }
        dtaxval =  Ext.util.Format.number(dtaxval,'0.00')
        totqty  =  Ext.util.Format.number(totqty,'0.000')

        txtTotTaxable.setRawValue(dtaxval);
//        txtTaxable.setValue(Math.round(dtaxval));
        txtTaxable.setRawValue(dtaxval);
        txtQty.setRawValue(totqty);
        calculateGSTvalue();

}

function calculateGSTvalue(){
var partyvalue = 0;




       if ( txtTaxable.getValue() > 0 && txtCgstper.getValue()>0)
             txtCgstvalue.setRawValue(Ext.util.Format.number(txtTaxable.getValue() * Number(txtCgstper.getValue())/100).toFixed(2),'0.00');
       else
             txtCgstvalue.setValue('');

       if (txtTaxable.getValue() > 0 && txtSgstper.getValue()>0)
             txtSgstvalue.setRawValue(Ext.util.Format.number(txtTaxable.getValue() * Number(txtSgstper.getValue())/100).toFixed(2),'0.00');
       else
             txtSgstvalue.setValue('');

        if ( Number(txtTaxable.getValue()) > 0 && Number(txtIgstper.getValue())>0)
             txtIgstvalue.setRawValue(Ext.util.Format.number(txtTaxable.getValue() * Number(txtIgstper.getValue())/100).toFixed(2),'0.00');
       else
             txtIgstvalue.setValue('');

// alert(txtRounding.getValue());

 //      partyvalue = Number(txtTaxable.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtRounding.getValue())

  //     txtPartyDebit.setRawValue(Ext.util.Format.number( partyvalue,'0.00'));

       partyvalue = Number(txtTaxable.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtOtherAmount.getValue()); 



         txtPartyDebit.setRawValue(Ext.util.Format.number(Math.round(partyvalue),'0.00'));

          invround = Number(txtPartyDebit.getValue()) - Number(partyvalue);
          txtRounding.setRawValue(Ext.util.Format.number(invround,'0.00'))



}

var dgaccrecord = Ext.data.Record.create([]);
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
       {header: "Led. Code", dataIndex:'ledcode',sortable:false,width:100,align:'left',hidden:true},
       {header: "Led. Name", dataIndex:'ledname',sortable:false,width:400,align:'left'},
       {header: "Debit", dataIndex:'debit',sortable:false,width:120,align:'right'},
       {header: "Credit", dataIndex:'credit',sortable:false,width:120,align:'right'},
       {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 100, align: 'left',hidden:true}
    ],

    store: [],

    listeners:{

        keyup:function(){
           calculateValue();
        },
        keydown:function(){ 
           calculateValue();
        },
       blur:function(){
           calculateValue();

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
    width: 670,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
 //   	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "HSN", dataIndex:'invt_hsncode',sortable:false,width:90,align:'left'},
       {header: "Size Code", dataIndex:'var_name',sortable:false,width:110,align:'left'},
       {header: "Size", dataIndex:'size',sortable:false,width:50,align:'left'},
       {header: "Weight", dataIndex:'weight',sortable:false,width:60,align:'left'},
       {header: "Rate", dataIndex:'rate',sortable:false,width:70,align:'left'},
       {header: "Tax Value", dataIndex:'taxval',sortable:false,width:90,align:'left'},

       {header: "Diff Rate", dataIndex:'diffrate',sortable:false,width:70,align:'left',
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
       {header: "Diff TaxVal", dataIndex:'difftaxval',sortable:false,width:90,align:'left'},



    ],

    store: PackslipdetailDataStoreNew,

    listeners:{

        keyup:function(){
           calculateValue();
        },
        keydown:function(){ 
           calculateValue();
        },
       blur:function(){
           calculateValue();

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
                url: 'ClsDebitNote.php',      // File to connect to
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
                url: 'ClsDebitNote.php',      // File to connect to
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
                url: 'ClsDebitNote.php',      // File to connect to
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




var cmbDNNo = new Ext.form.ComboBox({
        fieldLabel: 'Debit Note No',
        width           : 120,
        displayField    : 'dbcr_vouno', 
        valueField      : 'dbcr_seqno',
        hiddenName      : '',
        id              : 'cmbDNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadDebitNoteVoucherDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){
                       Ext.getCmp('editchk').hide();

                      if (gstfincompcode == 1)
                         Ext.getCmp('EInv').setVisible(true);
                      else  
                         Ext.getCmp('EInv').setVisible(false);


                       flxInvDetail.getStore().removeAll();
                       flxDetail.getStore().removeAll();
     	               LoadDebitNoteVoucherDetailDataStore.load({
                           url: 'ClsDebitNote.php',
	                   params: {
			        task: 'LoadDebitNoteVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbDNNo.getRawValue(),
	                  },
		          callback: function () {
                 Ext.getCmp('doccancel').show();
//                             alert(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno'));
                                txtDnNo.setRawValue(cmbDNNo.getRawValue());
                                dtpVouDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_date'),"d-m-Y")); 
                                accseqno = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno');    
                                dncrseqno = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_seqno');   
                                vouseqno  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_no'); 
                                partycode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode');
                                partytype = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_party_type');
                                partyledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode');
                                txtAccountName.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('cust_name'));
				txtPartyDebit.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_value'));
				cmbInvNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'));
				txtInvDate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'));
                                dtpInvDate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'));

				txtTotTaxable.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtTaxable.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtCgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstper'));
				txtCgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstvalue'));
				txtSgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstper'));
				txtSgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstvalue'));
				txtIgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstper'));
				txtIgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstvalue'));
				txtNarration.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_narration'));
				cmbDRCRledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_ledcode'));
				cmbCGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstledcode'));
				cmbSGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstledcode'));
				cmbIGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstledcode'));
				txtRounding.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_rounding'));


                InvoiceDetails2DataStore.removeAll();
                InvoiceDetails2DataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'InvDetails2',
                        invoiceno: LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'),
                        ledgercode: partyledcode,
                        compcode: gstfincompcode,
                        finid: ginfinid
                    },
                    callback: function () {
                        txtInvDate.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'));
                        txtInvValue.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_value'));
                    }
                });
		PackslipdetailDataStoreNew.removeAll();
		PackslipdetailDataStoreNew.load({

		url: 'ClsDebiteNote.php',
		params:
		    {
			task:"loadInvDetails",
			invno :  LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'),
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




       if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('U_AckNo') == '')
       {  

           Ext.getCmp('save').setDisabled(false);

       } 
       else  
       {    
           alert("E-Debit Note Generated. Can't Modify this document. .." );
           Ext.getCmp('save').setDisabled(true);
           Ext.getCmp('btnEInvoice').setDisabled(true);
           Ext.getCmp('btnReupload').setDisabled(true);
       }  




 
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

    var PartynameDataStore = new Ext.data.Store({
        id: 'PartynameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Partyname"}, // this parameter asks for listing
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
            'acctrail_inv_date', 'acctran_totamt', 'acctrail_inv_value'
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
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbInvNo"}, // this parameter asks for listing
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

    var bill;
    var optOption = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'hbox',
        width: 300,
        height: 40,
        border: false,
        items: [{xtype: 'radiogroup', columns: 2, rows: 1, id: 'optOption',
                items: [
                    {boxLabel: 'Against Invoice', name: 'optOption', inputValue: 1, checked: 'true',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    bill = true;
                                    billflag = 'D';
                                    PartynameDataStore.load({
                                        url: '/SHVPM/Accounts/clsAccounts.php',
                                        params: {
                                            task: 'Partyname',
                                            gincompany: gstfincompcode,
                                            ginfinid: ginfinid,
                                            bill: bill
                                        }
                                    });

                                    txtDebitValue.enable();
                                    txtInvValue.enable();
                                    txtInvDate.enable();
                                    cmbInvNo.enable();

                                    Ext.getCmp('txtCgstper').setReadOnly(true);  
                                    Ext.getCmp('txtSgstper').setReadOnly(true);  
                                    Ext.getCmp('txtIgstper').setReadOnly(true);  
                                }
                            }
                        }},
                    {boxLabel: 'Non Against Invoice', name: 'optOption', inputValue: 2,
                        listeners: {
                            check: function (rb, checked) {
                                if (checked === true) {
                                    bill = false;
                                    billflag = 'O';
                                    PartynameDataStore.load({
                                        url: '/SHVPM/Accounts/clsAccounts.php',
                                        params: {
                                            task: 'Partyname',
                                            gincompany: gstfincompcode,
                                            ginfinid: ginfinid,
                                            bill: bill
                                        }
                                    });

                                    txtDebitValue.disable();
                                    txtInvValue.disable();
                                    txtInvDate.disable();
                                    cmbInvNo.disable();

                                    Ext.getCmp('txtCgstper').setReadOnly(false);  
                                    Ext.getCmp('txtSgstper').setReadOnly(false);  
                                    Ext.getCmp('txtIgstper').setReadOnly(false);  

                                }
                            }
                        }}
                ]
            }]
    });

    var txtDnNo = new Ext.form.TextField({
        fieldLabel: 'Debit Note No',
        id: 'txtDnNo',
        width: 120,
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
                url: 'ClsDebitNote.php',      // File to connect to
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
		url: 'ClsDebitNote.php',
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
		partytype    = selrow.get('cust_type');
            	ledstate     = selrow.get('cust_state');
		txtAccountName.setValue(selrow.get('cust_name'));
                flxLedger.hide();   

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


                InvoicNoDataStore.removeAll();
                InvoicNoDataStore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params: {
                            task: 'cmbDnInvNo',
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
                                Ext.Msg.alert("Alert", "This Party  Does Not have the transaction to Raising the debit Note With Bill");
                            }
                        }
                    });

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
        x: 400,
        y: 120,
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
        fieldLabel  : 'Debited To',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  370,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   cmbType.focus();

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
    var cmbPartyname = new Ext.form.ComboBox({
        fieldLabel: 'Party Name',
        width: 350,
        store: PartynameDataStore,
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

            select: function () {
                var Invseq = 0;

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: partyledcode,
		            },
                    callback: function () {
                            partytype =  findLedgerdatastore.getAt(0).get('cust_type');
                            partycode =  findLedgerdatastore.getAt(0).get('led_custcode');

                      }
		});

                PartyAddressDataStore.removeAll();
                InvoicNoDataStore.removeAll();
                if (billflag === "D") {
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
                                Ext.Msg.alert("Alert", "This Party  Does Not have the transaction to Raising the debit Note With Bill");
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
    var dtpVouDate = new Ext.form.DateField({
        fieldLabel: 'Debit Note Date',
        id: 'dtpVouDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
//value: '2020-03-31',
        anchor: '100%',
        listeners: {
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
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
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
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
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
    })
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
                        txtInvDate.setRawValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'));
                        txtInvValue.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_value'));
                    }
                });
		PackslipdetailDataStoreNew.removeAll();
		PackslipdetailDataStoreNew.load({

		url: 'ClsDebiteNote.php',
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

    var txtDebitValue = new Ext.form.NumberField({
        fieldLabel: 'Debit 1 Value',
        id: 'txtDebitValue',
        width: 60,
        name: 'DebitValue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txtDebitValue.getValue() > txtInvValue.getValue()) {
                    Ext.Msg.alert("Alert", "Debit Note value should not be greater than invoice value");
                    txtDebitValue.setValue('');
                }
            }
        }
    });



    var grpcodetds = 0;
    var cmbDRCRledger = new Ext.form.ComboBox({
        fieldLabel: 'Credit Ledger',
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
		    'font-size': '14px','font-weight':'bold'
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
        fieldLabel: 'Enter Debit Value = (Base Value-(CGST+SGST Or + IGST))',
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
			 	gstper  : txtCgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
     calculateGSTvalue();
}



    var txtTaxable = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value',
        id: 'txtTaxable',
        width: 110,
        name: 'txtTaxable',
        enableKeyEvents: true,
        style : "font-size:14px;font-weight:bold",
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

    var txtPartyDebit = new Ext.form.NumberField({
        fieldLabel: 'Debited Amount',
        id: 'txtPartyDebit',
        width: 110,
        name: 'txtPartyDebit',
        enableKeyEvents: true,
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
    });

    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 60,
        name: 'txtRounding',
        enableKeyEvents: true,
        //allowDecimals: false,

        listeners: {
            keyup: function () {
               calculateGSTvalue()

            }   
        }
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
        width: 110,
        name: 'txtCgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
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
        width: 110,
        name: 'txtSgstvalue',
        enableKeyEvents: true,
        readOnly: true,
        //allowDecimals: false,
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
        width: 110,
        name: 'txtIgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
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
                                    debit : Ext.util.Format.number(Number(txtPartyDebit.getRawValue()),'0.00'),

                                    credit : 0,
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
		                            debit : 0,
		 
		                            credit : Ext.util.Format.number(Number(txtTaxable.getRawValue()),'0.00'),

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
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtCgstvalue.getRawValue()),'0.00'),
	
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
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtSgstvalue.getRawValue()),'0.00'),

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
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtIgstvalue.getRawValue()),'0.00'),

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
		                            debit : 0,
                                            credit : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),

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
		                            credit  : 0,
                                            debit   : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),
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
        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
//        txtTotalgst.setValue(gintotgst);
//        txtTotaltds.setValue(gintottds);

    }




    var tabDebitNote = new Ext.TabPanel({
        id: 'tabDebitNote',
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
                    var activeTab = tabDebitNote.getActiveTab();
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
      flxLedger,
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 850,
                y:  10,
                defaultType: 'textfield',
                border: false,
                items: [txtPass]
 
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
                width: 800,
                height: 80,
                x: 5,
                y: 80,
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
                        items: [txtDnNo]
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
                        items: [cmbDNNo]
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
                        items: [dtpVouDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
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
                        labelWidth: 100,
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
            },


            {
                xtype: 'fieldset',
                title: '',
                width: 1170,
                height: 330,
                x: 5,
                y: 175,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [

            {
                xtype: 'fieldset',
                title: '',
                width: 725,
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
                        x: 400,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtInvValue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 700,
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
                labelWidth: 50,
                width: 350,
                x: 200,
                y: 335,
                defaultType: 'textfield',
                border: false,
                items: [txtQty]
            }, 

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 380,
                y: 335,
                defaultType: 'textfield',
                border: false,
                items: [txtTotTaxable]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 700,
                height: 100,
                x: 0,
                y: 385,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 1000,
                y: 280,
                defaultType: 'textfield',
                border: false,
                items: [chkremark]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 750,
                y: 190,
                defaultType: 'textfield',
                border: false,
                items: [txtTaxable]
            },
 
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 750,
                y: 220,
                defaultType: 'textfield',
                border:false,
                items: [txtCgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 900,
                y: 220,
                defaultType: 'textfield',
                border: false,
                items: [txtCgstvalue]
            },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 750,
                y: 250,
                defaultType: 'textfield',
                border:false,
                items: [txtSgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 900,
                y: 250,
                defaultType: 'textfield',
                border: false,
                items: [txtSgstvalue]
            },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 200,
                x: 750,
                y: 280,
                defaultType: 'textfield',
                border:false,
                items: [txtIgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 900,
                y: 280,
                defaultType: 'textfield',
                border: false,
                items: [txtIgstvalue]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 750,
                y: 310,
                defaultType: 'textfield',
                border: false,
                items: [txtRounding]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 750,
                y: 340,
                defaultType: 'textfield',
                border: false,
                items: [txtPartyDebit]
            },
/*
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 200,
                x: 750,
                y: 270,
                defaultType: 'textfield',
                border: false,
                items: [txttcsvalue]
            },
*/

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 500,
                x: 750,
                y: 370,
                defaultType: 'textfield',
                border: false,
                items: [cmbDRCRledger]
            },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 750,
                        y: 400,
                        border: false,
                        items: [cmbCGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 750,
                        y: 430,
                        border: false,
                        items: [cmbSGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 500,
                        x: 750,
                        y: 460,
                        border: false,
                        items: [cmbIGSTledger]
                    },



		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE - DEBIT NOTE',
		                       width       : 370,
		                       height      : 175,
		                       x           : 820,
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
                title: 'Ledger Details',
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
            },
         ]      
    });

    var DebitNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Debit Note',
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
        id: 'DebitNoteFormPanel',
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
				var vouno = "&vouno=" + encodeURIComponent(cmbDNNo.getRawValue());

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',

                {
                    text: 'View -E-Debit Note',
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
				var vouno = "&vouno=" + encodeURIComponent(cmbDNNo.getRawValue());

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
                }, 


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
                            DebitNoteWindow.hide();
                        }
                    }
                }]
        },
        items: [
             tabDebitNote
        ]
    });

    function RefreshData() {

        Ext.getCmp('btnEInvoice').setDisabled(false); 
        Ext.getCmp('btnReupload').setDisabled(false); 
        Ext.getCmp('EInv').setVisible(false);

               flxLedger.hide();
       Ext.getCmp('cmbDNNo').setVisible(false);
        Ext.getCmp('editchk').hide();
        Ext.getCmp('doccancel').hide();
        Ext.getCmp('txtPass').hide();
        gstFlag = "Add";
        billflag = "D";
        cmbDRCRledger.setValue('');
        txtAccountName.setValue('');
        

        txtDnNo.setValue('');
        txtQty.setValue('');
        txtTotTaxable.setValue('');
        txttcsvalue.setValue('');
        txtDebitValue.setValue('');
        txtInvDate.setValue('');
        txtInvValue.setValue('');
        txtNarration.setValue('');


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
        txtPartyDebit.setValue('');

        flxInvDetail.getStore().removeAll();





    }

    var DebitNoteWindow = new Ext.Window({
        width: 1260,
        height: 610,
        y: 30,
        items: DebitNoteFormPanel,
        bodyStyle: {"background-color": "#acbf95"},
        title: 'Debit Note',
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


                cmbReason.setRawValue('OTHERS')
                gstFlag = "Add";
                billflag = "D";
               flxLedger.hide();

               Ext.getCmp('cmbDNNo').setVisible(false);
        Ext.getCmp('btnEInvoice').setDisabled(false); 
        Ext.getCmp('btnReupload').setDisabled(false); 
        Ext.getCmp('EInv').setVisible(false);
        Ext.getCmp('doccancel').hide();
        Ext.getCmp('txtPass').hide();
       
                  VouNodatastore.load({
                    url: 'ClsDebitNote.php',
                    params: {
                        task: 'ControlDebitNo',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                             if (ginfinid >= 24)  
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


                                     vno =  "SDN/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtDnNo.setValue(vno);
                               }
                    }
                  });


                LedgernameDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'GeneralLedger',
        
                    },
        
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
                Ext.getCmp('editchk').hide();
            }
        }
    });
    DebitNoteWindow.show();
});

