Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var userid = localStorage.getItem('ginuser');

var invseqno = 0;

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var partycode = 0;


function grid_tot(){
        var totval = 0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totval =  totval + Number(sel[i].data.invamt);               
        }
          txtTotalClearing.setValue(Ext.util.Format.number(totval,'0.00'));
}


function grid_tot2(){
        var totval = 0;

        flxDetail.getSelectionModel().clearSelections();
       flxDetail.getSelectionModel().selectAll();
        var Row= flxDetail.getStore().getCount();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totval =  totval + Number(sel[i].data.invamt);               
        }

//             frt = Math.round(Number(txttotqty.getRawValue()/1000) * Number(txtFrt.getRawValue()));
  

          txtTotalClearing.setValue(Ext.util.Format.number(totval,'0.00'));
}

//                flxDetail.getSelectionModel().selectAll();
//                var selrows = flxDetail.getSelectionModel().getCount();
//                var sel = flxDetail.getSelectionModel().getSelections();




var loadINVNoDetailDataStore = new Ext.data.Store({
  id: 'loadINVNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportExpenses.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_seqno', 'invh_compcode', 'invh_fincode', 'invh_invoiceno', 'invh_invoicerefno', 'invh_date', 'invh_refno', 'invh_refdate', 'invh_poseqno', 'invh_sup_code', 'invh_agent', 'invh_payterms', 'invh_deliveryterms', 'invh_shiftment', 'invh_origincountry', 'invh_originport', 'invh_arrivalport', 'invh_bankacno', 'invh_bankname', 'invh_bankcode', 'invh_branchcode', 'invh_swiftcode', 'invh_bankadd1', 'invh_bankadd2', 'invh_bankadd3', 'invh_billladingno', 'invh_billladingdate', 'invh_billentryno', 'invh_billentrydate', 'invh_exchangerate', 'invh_invoicevalue', 'invh_BCD', 'invh_ACD', 'invh_SWS', 'invh_CVD', 'invh_IGST', 'invh_otherduty', 'invh_interest', 'invh_penalty', 'invh_fine', 'invh_totduty', 'invh_clearing','invh_vesselname', 'invh_shipmentdate', 'invh_doccleared', 'invh_partyaccstat', 'invh_partyvouno', 'invh_dutyaccstat', 'invh_dutyvouno', 'invh_jv_vouno', 'invt_seqno', 'invt_item_code', 'invt_qty', 'invt_portqty', 'invt_recqty', 'invt_moisper', 'invt_outthroughper', 'invt_dedper', 'invt_itemrate', 'invt_itemvalue','ordh_no' , 'ordh_date', 'invh_20feet_container','invh_40feet_container','itmh_name' , 'invt_item_code'
  ])
});



var loadINVExpensesDetailDataStore = new Ext.data.Store({
  id: 'loadINVExpensesDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportExpenses.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVExpensesDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invc_hdcode', 'invc_slno', 'invc_party', 'invc_invno', 'invc_date', 'invc_handling', 'invc_maintenance', 'invc_usage', 'invc_admin', 'invc_clearing', 'invc_additional', 'invc_custduty', 'invc_demurrage', 'invc_service', 'invc_others', 'invc_taxable', 'invc_cgstper', 'invc_cgstamt', 'invc_sgstper', 'invc_sgstamt', 'invc_igstper', 'invc_igstamt', 'invc_invamt', 'sup_code', 'sup_name', 'sup_refname','sup_led_code'
  ])
});


var loadInvNoListDataStore = new Ext.data.Store({
  id: 'loadInvNoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportExpenses.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadInvNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_invoicerefno','invh_invoiceno'
  ])
});




var btnSubmit = new Ext.Button({
 //  style   : 'text-align:left;font-size:14px;font-weight:bold',
 
/*  style : {
        'color' : 'red',
        'font-size' : '15px',
        'font-weight' : 'bold'
    },
*/ 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 80,
    height  : 35,
  // labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//bodyStyle:{"background-color":"#ebebdf"},
//style : "font-size:14px;font-weight:bold",
 listeners:{
        click: function(){       
	    var gstadd="true";
//alert(cmbCustomer.getValue());

	    if(cmbHandlingParty.getRawValue()=="" || cmbHandlingParty.getValue()==0)
	    {
		alert("Select Supplier Name ");
                gstadd="false";
                cmbHandlingParty.setFocus();
	    }

	    if(txtHandlingInvNo.getRawValue()=="")
	    {
		alert("Enter Invoice Number ..");
                gstadd="false";
                txtHandlingInvNo.setFocus();
	    }



	    if(txtHandlingTaxableTotal.getRawValue()=="" || txtHandlingTaxableTotal.getValue()==0)
	    {
		alert("Taxable Value is zero..");
                gstadd="false";
                txtHandlingTaxableTotal.setFocus();
	    }

	    if(txtHandlingInvAmt.getRawValue()=="" || txtHandlingInvAmt.getValue()==0)
	    {
		alert("Invoice Amount is zero..");
                gstadd="false";
                txtHandlingInvAmt.setFocus();
	    }

            if(gstadd=="true")
            { 
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.invno === txtHandlingInvNo.getRawValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('parycode'  , cmbHandlingParty.getValue());
			sel[idx].set('partyname' , cmbHandlingParty.getRawValue());
			sel[idx].set('invno'     , txtHandlingInvNo.getRawValue());
			sel[idx].set('invdate'   , Ext.util.Format.date(dtpHandlingInvdate.getValue(),"Y-m-d"));
			sel[idx].set('handling'  , txtHandling.getValue());
			sel[idx].set('maint'     , txtMaint.getValue());
			sel[idx].set('usage'     , txtUsage.getValue());
			sel[idx].set('admin'     , txtAdmin.getValue());
			sel[idx].set('clearing'  , txtClearing.getValue());
			sel[idx].set('additional', txtAdditional.getValue());
			sel[idx].set('custduty'  , txtCustDuty.getValue());
			sel[idx].set('demurrage' , txtDemmurage.getValue()); 
                	sel[idx].set('service'   , txtService.getValue());
			sel[idx].set('others'     , txtHandlingOthers.getValue());
			sel[idx].set('taxable'    , txtHandlingTaxableTotal.getValue());
			sel[idx].set('cgstper'    , Number(txtCGST.getValue()));
			sel[idx].set('cgstamt'    , Number(txtCGSTAmt.getValue()));
			sel[idx].set('sgstper'    , Number(txtSGST.getValue()));
			sel[idx].set('sgstamt'    , Number(txtSGSTAmt.getValue()));
			sel[idx].set('igstper'    , Number(txtIGST.getValue()));
			sel[idx].set('igstamt'    , Number(txtIGSTAmt.getValue()));	
			sel[idx].set('invamt'    , Number(txtHandlingInvAmt.getValue()));	

			flxDetail.getSelectionModel().clearSelections();

			       txtHandlingInvNo.setRawValue('');
                               txtHandling.setValue('');
			       txtMaint.setValue('');
			       txtUsage.setValue('');
			       txtAdmin.setValue('');
			       txtClearing.setValue('');
			       txtAdditional.setValue('');
			       txtCustDuty.setValue('');
                               txtDemmurage.setValue('');
			       txtService.setValue('');
			       txtHandlingOthers.setValue('');
			       txtHandlingTaxableTotal.setValue('');
			       txtCGST.setValue('');
			       txtCGSTAmt.setValue('');
			       txtSGST.setValue('');
			       txtSGSTAmt.setValue('');
		               txtIGST.setValue('');
			       txtIGSTAmt.setValue('');
			       txtHandlingInvAmt.setValue('');


		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      
                        var RowCnt = flxDetail.getStore().getCount() + 1;
                        flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
		                   parycode   : cmbHandlingParty.getValue(),
		                   partyname  : cmbHandlingParty.getRawValue(),
			           invno      : txtHandlingInvNo.getRawValue(),
                                   invdate    :  Ext.util.Format.date(dtpHandlingInvdate.getValue(),"Y-m-d"), 
				   handling   : Number(txtHandling.getValue()),
				   maint      : Number(txtMaint.getValue()),
			           usage      : txtUsage.getValue(),
				   admin      : txtAdmin.getRawValue(),
				   clearing   : Number(txtClearing.getValue()),
				   additional : txtAdditional.getValue(),
				   custduty   : Number(txtCustDuty.getValue()),
                                   demurrage  : Number(txtDemmurage.getValue()),
				   service    : Number(txtService.getValue()),
			           others     : txtHandlingOthers.getValue(),
				   taxable    : txtHandlingTaxableTotal.getValue(),
				   cgstper    : Number(txtCGST.getValue()),
			           cgstamt    : Number(txtCGSTAmt.getValue()),
				   sgstper    : Number(txtSGST.getValue()),
			           sgstamt    : Number(txtSGSTAmt.getValue()),
				   igstper    : Number(txtIGST.getValue()),
			           igstamt    : Number(txtIGSTAmt.getValue()),
			           invamt     : Number(txtHandlingInvAmt.getValue()),
                         }) 
                         );
		       txtHandlingInvNo.setRawValue('');
                       txtHandling.setValue('');
		       txtMaint.setValue('');
		       txtUsage.setValue('');
		       txtAdmin.setValue('');
		       txtClearing.setValue('');
		       txtAdditional.setValue('');
		       txtCustDuty.setValue('');
                       txtDemmurage.setValue('');
		       txtService.setValue('');
		       txtHandlingOthers.setValue('');
		       txtHandlingTaxableTotal.setValue('');
		       txtCGST.setValue('');
		       txtCGSTAmt.setValue('');
		       txtSGST.setValue('');
		       txtSGSTAmt.setValue('');
	               txtIGST.setValue('');
		       txtIGSTAmt.setValue('');
		       txtHandlingInvAmt.setValue('');
                }

             }
 grid_tot();
      }
      
     }
});

function calculateDutyValue()
{
   txtTotalDuty.setValue(Number(txtBCD.getValue())  + Number(txtACD.getValue()) +  Number(txtSWS.getValue()) + Number(txtCVD.getValue()) + Number(txtOtherDuty.getValue()) + Number(txtInterest.getValue()) + Number(txtPenalty.getValue())  + Number(txtFine.getValue())  + Number(txtCustomsIGST.getValue()));
}


function calculateClearingValue()
{

   var tothandling = 0;          
   var cgst = 0;
   var sgst = 0;
   var igst = 0;

   tothandling = Number(txtHandling.getValue())  + Number(txtMaint.getValue()) +  Number(txtUsage.getValue()) + Number(txtAdmin.getValue()) + Number(txtClearing.getValue()) + Number(txtAdditional.getValue()) + Number(txtCustDuty.getValue())  + Number(txtDemmurage.getValue())  + Number(txtService.getValue())+ Number(txtHandlingOthers.getValue());

 cgst = Number(tothandling) * Number(txtCGST.getValue())/100;
 sgst = Number(tothandling) * Number(txtSGST.getValue())/100;
 igst = Number(tothandling) * Number(txtIGST.getValue())/100;


 txtHandlingTaxableTotal.setValue(tothandling);
 txtCGSTAmt.setValue(cgst);
 txtSGSTAmt.setValue(sgst);
 txtIGSTAmt.setValue(igst);


 txtHandlingInvAmt.setValue(Number(tothandling)+cgst+sgst+igst);
}






var txtBCD = new Ext.form.TextField({
        fieldLabel  : 'BCD ',
        id          : 'txtBCD',
        name        : 'txtBCD',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });

var txtACD = new Ext.form.TextField({
        fieldLabel  : 'ACD ',
        id          : 'txtACD',
        name        : 'txtACD',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });

var txtSWS = new Ext.form.TextField({
        fieldLabel  : 'SWS ',
        id          : 'txtSWS',
        name        : 'txtSWS',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });


var txtCVD = new Ext.form.TextField({
        fieldLabel  : 'CVD ',
        id          : 'txtCVD',
        name        : 'txtCVD',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });


var txtCustomsIGST = new Ext.form.TextField({
        fieldLabel  : 'IGST ',
        id          : 'txtCustomsIGST',
        name        : 'txtCustomsIGST',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });

var txtOtherDuty = new Ext.form.TextField({
        fieldLabel  : 'Other Duties ',
        id          : 'txtOtherDuty',
        name        : 'txtOtherDuty',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });


var txtInterest = new Ext.form.TextField({
        fieldLabel  : 'Interest',
        id          : 'txtInterest',
        name        : 'txtInterest',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });

var txtPenalty = new Ext.form.TextField({
        fieldLabel  : 'Penalty',
        id          : 'txtPenalty',
        name        : 'txtPenalty',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });


var txtFine = new Ext.form.TextField({
        fieldLabel  : 'Fine',
        id          : 'txtFine',
        name        : 'txtFine',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           blur:function(){
              calculateDutyValue();
           },
           keyup:function(){
              calculateDutyValue();
           },
        }

  });


var txtTotalDuty = new Ext.form.TextField({
        fieldLabel  : 'Total Duty',
        id          : 'txtTotalDuty',
        name        : 'txtTotalDuty',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtTotalClearing = new Ext.form.TextField({
        fieldLabel  : 'Total Clearing',
        id          : 'txtTotalClearing',
        name        : 'txtTotalClearing',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtHandlingInvNo = new Ext.form.TextField({
        fieldLabel  : 'Invoice No.',
        id          : 'txtHandlingInvNo',
        name        : 'txtHandlingInvNo',
        width       :  160,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })


var txtCGST = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCGST',
        name        : 'txtCGST',
        width       :  40,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },

        }

  })

var txtCGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtCGSTAmt',
        name        : 'txtCGSTAmt',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })



var txtSGST = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSGST',
        name        : 'txtSGST',
        width       :  40,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },

        }

  })

var txtSGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtSGSTAmt',
        name        : 'txtSGSTAmt',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

var txtIGST = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIGST',
        name        : 'txtIGST',
        width       :  40,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },

        }



  })

var txtIGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtIGSTAmt',
        name        : 'txtIGSTAmt',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

var txtHandlingInvAmt = new Ext.form.NumberField({
        fieldLabel  : 'Invoice Amt',
        id          : 'txtHandlingInvAmt',
        name        : 'txtHandlingInvAmt',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })



var txtBLNo = new Ext.form.TextField({
        fieldLabel  : 'Bill of Lading No.',
        id          : 'txtBLNo',
        name        : 'txtBLNo',
        width       :  160,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })




var txtBENo = new Ext.form.TextField({
        fieldLabel  : 'Bill of Entry No.',
        id          : 'txtBENo',
        name        : 'txtBENo',
        width       :  160,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })



var dtpInvdate = new Ext.form.DateField({
    fieldLabel : 'Invoice Date ',
    id         : 'dtpInvdate',
    name       : 'dtpInvdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});

var dtpHandlingInvdate = new Ext.form.DateField({
    fieldLabel : 'Invoice Date ',
    id         : 'dtpHandlingInvdate',
    name       : 'dtpHandlingInvdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpHandlingInvdate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});

var dtpBLdate = new Ext.form.DateField({
    fieldLabel : 'Bill of Lading Date',
    id         : 'dtpBLdate',
    name       : 'dtpBLdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});



var dtpBEdate = new Ext.form.DateField({
    fieldLabel : 'Bill of Entry Date',
    id         : 'dtpBEdate',
    name       : 'dtpBEdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});


var lblHandling = new Ext.form.Label({
    fieldLabel  : 'Handling',
    id          : 'lblHandling',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblMaint = new Ext.form.Label({
    fieldLabel  : 'Maintenance',
    id          : 'lblMaint',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblUsage = new Ext.form.Label({
    fieldLabel  : 'Usage',
    id          : 'lblUsage',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblAdmin = new Ext.form.Label({
    fieldLabel  : 'Admin',
    id          : 'lblAdmin',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblClearing = new Ext.form.Label({
    fieldLabel  : 'Clearing',
    id          : 'lblClearing',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})


var lblAdditional = new Ext.form.Label({
    fieldLabel  : 'Additional',
    id          : 'lblAdditional',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblCustDuty = new Ext.form.Label({
    fieldLabel  : 'Cust Duty',
    id          : 'lblCustDuty',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblDemmurage = new Ext.form.Label({
    fieldLabel  : 'demurrage',
    id          : 'lblDemmurage',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblService = new Ext.form.Label({
    fieldLabel  : 'Service',
    id          : 'lblService',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblHandlingOthers = new Ext.form.Label({
    fieldLabel  : 'Others',
    id          : 'lblHandlingOthers',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblTaxable = new Ext.form.Label({
    fieldLabel  : 'Taxable Value',
    id          : 'lblTaxable',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})


var txtHandlingTaxableTotal = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtHandlingTaxableTotal',
        name        : 'txtHandlingTaxableTotal',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        readOnly : true,
    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

var txtHandling = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtHandling',
        name        : 'txtHandling',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },



        }

  });

var txtMaint = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMaint',
        name        : 'txtMaint',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });


var txtUsage  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtUsage',
        name        : 'txtUsage',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });

var txtAdmin  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdmin',
        name        : 'txtAdmin',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });


var txtClearing  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtClearing',
        name        : 'txtClearing',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });

var txtAdditional  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdditional',
        name        : 'txtAdditional',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });



var txtCustDuty  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtCustDuty',
        name        : 'txtCustDuty',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });

var txtDemmurage  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDemmurage',
        name        : 'txtDemmurage',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });


var txtService  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtService',
        name        : 'txtService',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });

var txtHandlingOthers  = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtHandlingOthers',
        name        : 'txtHandlingOthers',
        width       :  70,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {

           blur:function(){
              calculateClearingValue();
           },
           keyup:function(){
              calculateClearingValue();
           },
        }

  });

var LoadPortDataStore = new Ext.data.Store({
      id: 'LoadPortDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPort.php',      // File to connect toClsMasPort
                method: 'POST'
            }),
            baseParams:{task:"loadPortList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'port_code', 'port_name','country_code','country_name',
      ]),
    });



var LoadCountryDataStore = new Ext.data.Store({
      id: 'LoadCountryDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPort.php',      // File to connect toClsMasPort
                method: 'POST'
            }),
            baseParams:{task:"loadCountryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'country_code','country_name'
      ]),
    });	


var cmbCountry = new Ext.form.ComboBox({
        fieldLabel      : 'Country of Orgin ',
        width           : 200,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbCountry',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });





var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No. ',
        width           : 220,
        displayField    : 'invh_invoicerefno', 
        valueField      : 'invh_invoiceno',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                        loadINVNoDetailDataStore.removeAll();
			loadINVNoDetailDataStore.load({
                        url: 'ClsImportExpenses.php',
                        params:
                            {
                                task:"loadINVNoDetail",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {
                                txtBLNo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_billladingno')),
                                dtpBLdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_billladingdate'),'d-m-Y'));
                                txtBENo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_billentryno'));
                                dtpBEdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_billentrydate'),'d-m-Y')); 
                                invseqno = loadINVNoDetailDataStore.getAt(0).get('invh_seqno');
                                txtBCD.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_BCD'));      
                                txtACD.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_ACD'));      
                                txtSWS.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_SWS'));      
                                txtCVD.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_CVD'));      
                                txtCustomsIGST.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_IGST'));      
                                txtOtherDuty.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_otherduty'));      
                                txtInterest.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_interest'));      
                                txtPenalty.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_penalty'));      
                                txtFine.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_fine'));      
                                calculateDutyValue();
                            }  
                        });   

                        tabInvoice.setActiveTab(1);

                        flxDetail.getStore().removeAll();

                        loadINVExpensesDetailDataStore.removeAll();
			loadINVExpensesDetailDataStore.load({
                        url: 'ClsImportExpenses.php',
                        params:
                            {
                                task:"loadINVExpensesDetail",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {
                               var cnt=loadINVExpensesDetailDataStore.getCount();
	                       if(cnt>0)
		               {
                                for(var j=0; j<cnt; j++) 
                                { 
				        var RowCnt = flxDetail.getStore().getCount() + 1;
				        flxDetail.getStore().insert(
				        flxDetail.getStore().getCount(),
					new dgrecord({
					   parycode   : loadINVExpensesDetailDataStore.getAt(j).get('sup_code'),
					   partyname  : loadINVExpensesDetailDataStore.getAt(j).get('sup_refname'),
					   invno      : loadINVExpensesDetailDataStore.getAt(j).get('invc_invno'),
			                   invdate    : Ext.util.Format.date(loadINVExpensesDetailDataStore.getAt(j).get('invc_date'),"Y-m-d"), 
					   handling   : loadINVExpensesDetailDataStore.getAt(j).get('invc_handling'),
					   maint      : loadINVExpensesDetailDataStore.getAt(j).get('invc_maintenance'),
					   usage      : loadINVExpensesDetailDataStore.getAt(j).get('invc_usage'),
					   admin      : loadINVExpensesDetailDataStore.getAt(j).get('invc_admin'),
					   clearing   : loadINVExpensesDetailDataStore.getAt(j).get('invc_clearing'),
					   additional : loadINVExpensesDetailDataStore.getAt(j).get('invc_additional'),
					   custduty   : loadINVExpensesDetailDataStore.getAt(j).get('invc_custduty'),
			                   demurrage  : loadINVExpensesDetailDataStore.getAt(j).get('invc_demurrage'),
					   service    : loadINVExpensesDetailDataStore.getAt(j).get('invc_service'),
					   others     : loadINVExpensesDetailDataStore.getAt(j).get('invc_others'),
					   taxable    : loadINVExpensesDetailDataStore.getAt(j).get('invc_taxable'),
					   cgstper    : loadINVExpensesDetailDataStore.getAt(j).get('invc_cgstper'),
					   cgstamt    : loadINVExpensesDetailDataStore.getAt(j).get('invc_cgstamt'),
					   sgstper    : loadINVExpensesDetailDataStore.getAt(j).get('invc_sgstper'),
					   sgstamt    : loadINVExpensesDetailDataStore.getAt(j).get('invc_sgstamt'),
					   igstper    : loadINVExpensesDetailDataStore.getAt(j).get('invc_igstper'),
					   igstamt    : loadINVExpensesDetailDataStore.getAt(j).get('invc_igstamt'),
					   invamt     : loadINVExpensesDetailDataStore.getAt(j).get('invc_invamt'),
			               })
		                     ); 
                                     }  

           grid_tot();
                                 grid_tot2();
                                }
                           }
                        });   

           tabInvoice.setActiveTab(0);
	//flxDetail.getSelectionModel().clearSelections();
           grid_tot();
                        grid_tot2();
                        calculateDutyValue();
       }

     }
 
  });


var cmbLoadingPort= new Ext.form.ComboBox({
        fieldLabel      : 'Loading Port',
        width           : 200,
        displayField    : 'port_code', 
        valueField      : 'port_name',
        hiddenName      : '',
        id              : 'cmbLoadingPort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });

var cmbDischargePort= new Ext.form.ComboBox({
        fieldLabel      : 'Discharge Port',
        width           : 200,
        displayField    : 'port_code', 
        valueField      : 'port_name',
        hiddenName      : '',
        id              : 'cmbDischargePort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });



var  AllVendorDataStore = new Ext.data.Store({
  id: 'AllVendorDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportExpenses.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadAllsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'sup_code', type: 'int', mapping: 'sup_code'},
    {name: 'sup_refname', type: 'string', mapping: 'sup_refname'}
  ])
});



var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportExpenses.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'sup_code', type: 'int', mapping: 'sup_code'},
    {name: 'sup_refname', type: 'string', mapping: 'sup_refname'}
  ])
});



var cmbPartyName = new Ext.form.ComboBox({
    fieldLabel      : 'Supplier',
    width           : 350,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPartyName',
    typeAhead       : true,
    mode            : 'local',
    store           : VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
           loadInvNoListDataStore.removeAll();
	   loadInvNoListDataStore.load({
		url: 'ClsImportExpenses.php',
	        params: {
	            task: 'LoadInvNoList',
		    compcode : Gincompcode,
		    finid    : GinFinid,
                    supcode  : cmbPartyName.getValue(),
	        },
               callback: function () {
        
		}
	  });
        }
    }
});


var cmbHandlingParty = new Ext.form.ComboBox({
    fieldLabel      : 'Handling Party',
    width           : 280,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbHandlingParty',
    typeAhead       : true,
    mode            : 'local',
    store           : AllVendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});

var cmbPayTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Terms',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPayTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['100% DP','100% DA','LC 30 DAYS'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});

var cmbDeliveryTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Delivery Terms',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbDeliveryTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['CIF TUTICORIN'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});



var cmbItem = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbItem',
    typeAhead       : true,
    mode            : 'local',
    store           : [],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});


   function RefreshData(){
 	flxDetail.getStore().removeAll();
	LoadPortDataStore.load({
        	 url: 'ClsMasPort.php', 
              	 params:
        	 {
                	 task:"loadPortList"
               	 }
	});	
};

   var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 1050,
        x: 5,
        y: 120,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  
//        deferredRender: false,

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "Party code", dataIndex: 'parycode', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true},       
            {header: "Party Name", dataIndex: 'partyname', sortable:true,width:200,align:'left', menuDisabled: true},
            {header: "Invoice No", dataIndex: 'invno', sortable:true,width:100,align:'left', menuDisabled: true},
            {header: "Inv.Date", dataIndex: 'invdate', sortable:true,width:100,align:'left', menuDisabled: true },       
            {header: "Handling", dataIndex: 'handling', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "Maintenance", dataIndex: 'maint', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "Usage", dataIndex: 'usage', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "Admin", dataIndex: 'admin', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "Clearing", dataIndex: 'clearing', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "Additional", dataIndex: 'additional', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "Custduty", dataIndex: 'custduty', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "Demurrage", dataIndex: 'demurrage', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "Service", dataIndex: 'service', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "Others", dataIndex: 'others', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "Taxable", dataIndex: 'taxable', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "CGST %", dataIndex: 'cgstper', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "CGST Amt", dataIndex: 'cgstamt', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "SGST %", dataIndex: 'sgstper', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "SGST Amt", dataIndex: 'sgstamt', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "IGST %", dataIndex: 'igstper', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "IGST Amt", dataIndex: 'igstamt', sortable:true,width:100,align:'left', menuDisabled: true },  
            {header: "INV Amt", dataIndex: 'invamt', sortable:true,width:100,align:'left', menuDisabled: true },  

           ],


store:[],
    listeners:{	
         'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
             Ext.Msg.show({
             title: 'SO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {

     		       var sm = flxDetail.getSelectionModel();
	               var selrow = sm.getSelected();

              	       gridedit = "true";
                       editrow = selrow;	
                       saveflag = "Edit";
	               partycode = selrow.get('parycode');
                       cmbHandlingParty.setRawValue(selrow.get('partyname'));
                       cmbHandlingParty.setValue(selrow.get('parycode'));
		       txtHandlingInvNo.setRawValue(selrow.get('invno'));
                       txtHandling.setValue(selrow.get('handling'));
		       txtMaint.setValue(selrow.get('maint'));
		       txtUsage.setValue(selrow.get('usage'));
		       txtAdmin.setValue(selrow.get('admin'));
		       txtClearing.setValue(selrow.get('clearing'));
		       txtAdditional.setValue(selrow.get('additional'));
		       txtCustDuty.setValue(selrow.get('custduty'));
                       txtDemmurage.setValue(selrow.get('demurrage'));
		       txtService.setValue(selrow.get('service'));
		       txtHandlingOthers.setValue(selrow.get('others'));
		       txtHandlingTaxableTotal.setValue(selrow.get('taxable'));
		       txtCGST.setValue(selrow.get('cgstper'));
		       txtCGSTAmt.setValue(selrow.get('cgstamt'));
		       txtSGST.setValue(selrow.get('sgstper'));
		       txtSGSTAmt.setValue(selrow.get('sgstamt'));
	               txtIGST.setValue(selrow.get('igstper'));
		       txtIGSTAmt.setValue(selrow.get('cgstamt'));
		       txtHandlingInvAmt.setValue(selrow.get('invamt'));
                       flxDetail.getSelectionModel().clearSelections();

		    }
                    else if (btn === 'no')
                    {
                         var sm = flxDetail.getSelectionModel();
	                 var selrow = sm.getSelected();
		         flxDetail.getStore().remove(selrow);
                         flxDetail.getSelectionModel().selectAll();
                     }
          }
          });
      }
   }
   });


var tabInvoice = new Ext.TabPanel({
    id          : 'tabInvoice',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 320,
    width       : 1080,
    items       : [
                   {
                     xtype: 'panel',
                     title: 'DUTY DETAILS',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 0,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtBCD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 30,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtACD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 60,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtSWS]
		                },

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 90,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtCVD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 120,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtCustomsIGST]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 150,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtOtherDuty]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 180,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtInterest]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 210,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtPenalty]
		                },
   		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 300,
		                    y           : 0,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtFine]
		                },		              
   		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 300,
		                    y           : 30,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtTotalDuty]
		                },		              

                     ]
                   },    
                   {
                     xtype: 'panel',
                     title: 'ALL CLEARING EXPENSES',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 420,
		                    x           : 10,
		                    y           : 0,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [cmbHandlingParty]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 420,
		                    y           : 0,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [txtHandlingInvNo]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 250,
		                    x           : 700,
		                    y           : 0,
		                    labelWidth  : 110,
		                    border      : false,
		                    items : [dtpHandlingInvdate]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 10,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblHandling]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 5,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtHandling]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 90,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblMaint]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 90,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtMaint]
		                },


                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 200,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblUsage]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 190,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtUsage]
		                },
                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 300,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblAdmin]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 290,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtAdmin]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 400,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblClearing]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 390,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtClearing]
		                },


                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 490,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblAdditional]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 490,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtAdditional]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 595,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblCustDuty]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 590,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtCustDuty]
		                },


                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 690,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDemmurage]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 690,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtDemmurage]
		                },


                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 790,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblService]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 780,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtService]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 880,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblHandlingOthers]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 870,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtHandlingOthers]
		                },

                                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 960,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblTaxable]
		                },
	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 965,
		                    y           : 55,
		                    labelWidth  : 1,
		                    border      : false,
		                    items : [txtHandlingTaxableTotal]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 10,
		                    y           : 90,
		                    labelWidth  : 70,
		                    border      : false,
		                    items : [txtCGST]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 140,
		                    y           : 90,
		                    labelWidth  : 50,
		                    border      : false,
		                    items : [txtCGSTAmt]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 270,
		                    y           : 90,
		                    labelWidth  : 70,
		                    border      : false,
		                    items : [txtSGST]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 400,
		                    y           : 90,
		                    labelWidth  : 50,
		                    border      : false,
		                    items : [txtSGSTAmt]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 530,
		                    y           : 90,
		                    labelWidth  : 70,
		                    border      : false,
		                    items : [txtIGST]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 660,
		                    y           : 90,
		                    labelWidth  : 50,
		                    border      : false,
		                    items : [txtIGSTAmt]
		                },

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 200,
		                    x           : 790,
		                    y           : 90,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtHandlingInvAmt]
		                },
		                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 1,
		                    width       : 100,
		                    x           : 975,
		                    y           : 80,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [btnSubmit]
		                },


                                flxDetail, 

	   		      {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 400,
		                    x           : 600,
		                    y           : 250,
		                    labelWidth  : 120,
		                    border      : false,
		                    items : [txtTotalClearing]
		                },
                     ]
                   },
 
    
    ]
})


   var MasImportExpenesPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'COUNTRY NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasImportExpenesPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
                        //alert(txtEntryNo.getRawValue());
		              if(cmbPartyName.getRawValue()=="" || cmbPartyName.getValue()==0)
			        {
					alert("Select Party Name..");
					cmbPartyName.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
		                                    var poData = flxDetail.getStore().getRange();                                        
				                    var poupdData = new Array();
                              		            Ext.each(poData, function (record) {
				                    poupdData.push(record.data);
				                });
						Ext.Ajax.request({
		                            	url: 'TrnImportExpensesSave.php',
                		       	        params:
						{

				             	griddet: Ext.util.JSON.encode(poupdData),  
			    			cnt: poData.length,  
						     savetype   : saveflag,
				                     compcode   : Gincompcode,
				                     finid      : GinFinid,
                                                     invseqno   : invseqno,
                                                     invhno     : cmbInvNo.getRawValue(),
                                                     bcd        : Number(txtBCD.getValue()),
                                                     acd        : Number(txtACD.getValue()),
                                                     sws        : Number(txtSWS.getValue()),
                                                     cvd        : Number(txtCVD.getValue()),
                                                     otherdurty : Number(txtOtherDuty.getValue()),
                                                     interest   : Number(txtInterest.getValue()), 
                                                     penalty    : Number(txtPenalty.getValue()), 
                                                     fine       : Number(txtFine.getValue()), 
                                                     igst       : Number(txtCustomsIGST.getValue()),
                                                     totduty    : Number(txtTotalDuty.getValue()),  
                                                     totclearing : Number(txtTotalClearing.getValue()),      

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                //    msg: 'Lot No Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasAgentformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Import Expenses Saved ");
						    MasImportExpenesPanel.getForm().reset();
						    RefreshData();
                                                }
                                             	else 
						{
                                              /*  Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Failed Contact MIS',
                                                    fn: function (btn) 
							{
                                                        if (btn === 'ok') 
							{*/
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     /*   }
                                                    	}
                                                	});*/
                                            	}
                                      
					 	}   
			        		});
			    	
		         		}
                                }
 		    	});
				}
                        }
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasImportExpenesWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 140,
                width   : 900,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 50,
                y       : 3,	
                items:[
	
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbPartyName]
                        },


    

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbInvNo]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 260,
                            x           : 0,
                            y           : 70,
                            labelWidth  : 110,
                            border      : false,
                            items : [dtpInvdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 350,
                            x           : 550,
                            y           : -10,
                            labelWidth  : 130,
                            border      : false,
                            items : [txtBLNo]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 260,
                            x           : 550,
                            y           : 20,
                            labelWidth  : 130,
                            border      : false,
                            items : [dtpBLdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 350,
                            x           : 550,
                            y           : 50,
                            labelWidth  : 130,
                            border      : false,
                            items : [txtBENo]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 260,
                            x           : 550,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [dtpBEdate]
                        },

                ]

            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 380,
                width   : 1150,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 20,
                y       : 150,	
                items:[

                    
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 1100,
                            x           : 10,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [tabInvoice]
                        },



                ]
           },
        ],
    });
    
   
    var MasImportExpenesWindow = new Ext.Window({
	height      : 590,
        width       : 1200,
        y           : 35,
        title       : 'IMPORT INVOICE EXPENSES ENTRY',
        items       : MasImportExpenesPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
//			txtEntryNo.focus();
//	   	        txtEntryNo.setHeight(25);
  		 }
			
		}
    });
    MasImportExpenesWindow.show();  
});
