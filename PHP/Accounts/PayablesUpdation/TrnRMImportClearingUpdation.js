Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var partyledcode = 0;
   var partycode = 0;
   var purledgercode = 0;
   var purledgername = 0;
   var purledgername = 0;
   var cgstledgercode = 0;
   var cgstledgername = 0;
   var sgstledgercode =0;
   var sgstledgername = 0;
   var igstledgercode = 0;
   var igstledgername = 0;
   var itemname = "";

   var invwt = 0;  
   var portwt = 0;
   var millwt = 0;
   var grnwt = 0;
  

function calculateDutyValue()
{
   txtTotalDuty.setValue(Number(txtBCD.getValue())  + Number(txtACD.getValue()) +  Number(txtSWS.getValue()) + Number(txtCVD.getValue()) + Number(txtOtherDuty.getValue()) + Number(txtInterest.getValue()) + Number(txtPenalty.getValue())  + Number(txtFine.getValue())  + Number(txtCustomsIGST.getValue()));
}



var loadINVExpensesDetailDataStore = new Ext.data.Store({
  id: 'loadINVExpensesDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
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



var loadGRNAmountDataStore = new Ext.data.Store({
  id: 'loadGRNAmountDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadImportGRNValue"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['grnamt'
  ])
});



 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      autoLoad : true,   
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });

var loadInvNoListDataStore = new Ext.data.Store({
  id: 'loadInvNoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadInvNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_invoicerefno','invh_seqno'
  ])
});


var loadINVNoDetailDataStore = new Ext.data.Store({
  id: 'loadINVNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_seqno', 'invh_compcode', 'invh_fincode', 'invh_invoiceno', 'invh_invoicerefno', 'invh_date', 'invh_refno', 'invh_refdate', 'invh_poseqno', 'invh_sup_code', 'invh_agent', 'invh_payterms', 'invh_deliveryterms', 'invh_shiftment', 'invh_origincountry', 'invh_originport', 'invh_arrivalport', 'invh_bankacno', 'invh_bankname', 'invh_bankcode', 'invh_branchcode', 'invh_swiftcode', 'invh_bankadd1', 'invh_bankadd2', 'invh_bankadd3', 'invh_billladingno', 'invh_billladingdate', 'invh_billentryno', 'invh_billentrydate', 'invh_exchangerate', 'invh_invoicevalue', 'invh_BCD', 'invh_ACD', 'invh_SWS', 'invh_CVD', 'invh_IGST', 'invh_otherduty', 'invh_interest', 'invh_penalty', 'invh_fine', 'invh_totduty', 'invh_clearing','invh_vesselname', 'invh_shipmentdate', 'invh_doccleared', 'invh_partyaccstat', 'invh_partyvouno', 'invh_dutyaccstat', 'invh_dutyvouno', 'invh_jv_vouno', 'invt_seqno', 'invt_item_code', 'invt_qty', 'invt_portqty','invt_millqty', 'invt_recqty', 'invt_moisper', 'invt_outthroughper', 'invt_dedper', 'invt_itemrate', 'invt_itemvalue','ordh_no' , 'ordh_date', 'invh_20feet_container','invh_40feet_container','itmh_name' , 'invt_item_code','rech_totalamount'
  ])
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

var LoadGSTDataStore = new Ext.data.Store({
      id: 'LoadGSTDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWPL_Ledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'tax_name', 'purledcode', 'purledname', 'tax_cgst_per', 'tax_sgst_per','tax_igst_per', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode', 
 'cgstledname', 'sgstledname', 'igstledname'
      ]),
    });

var LoadLedgerDataStore = new Ext.data.Store({
      id: 'LoadLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	  'led_code', 'led_name'
      ]),
    });




var txtBCD = new Ext.form.TextField({
        fieldLabel  : 'BCD ',
        id          : 'txtBCD',
        name        : 'txtBCD',
        width       :  110,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(T)',
    id          : 'lblqty',
    width       : 60
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 60
});

var lblCGST = new Ext.form.Label({
    fieldLabel  : 'CGST',
    id          : 'lblCGST',
    width       : 60
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'SGST',
    id          : 'lblSGST',
    width       : 60
});

var lblIGST = new Ext.form.Label({
    fieldLabel  : 'IGST',
    id          : 'lblIGST',
    width       : 60
});

var lblParty = new Ext.form.Label({
    fieldLabel  : 'PORT',
    id          : 'lblParty',
    width       : 60
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN',
    id          : 'lblGRN',
    width       : 60
});


var lblMILL = new Ext.form.Label({
    fieldLabel  : 'MILL',
    id          : 'lblMILL',
    width       : 60
});

var lblDiff = new Ext.form.Label({
    fieldLabel  : 'DIFF.',
    id          : 'lblDiff',
    width       : 60
});

var lblCess = new Ext.form.Label({
    fieldLabel  : 'CESS',
    id          : 'lblCess',
    width       : 60
});

var lblTCS = new Ext.form.Label({
    fieldLabel  : 'TCS',
    id          : 'lblTCS',
    width       : 60
});

var lblpurchase = new Ext.form.Label({
    fieldLabel  : 'PURCHASE DETAILS',
    id          : 'lblpurchase',
    width       : 500,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",     
});


var lbldebitnote = new Ext.form.Label({
    fieldLabel  : 'DEBIT NOTE DETAILS',
    id          : 'lbldebitnote',
    width       : 500,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",     
});
   var txtPartyWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtPartyWt',
        name        : 'txtPartyWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyValue',
        name        : 'txtPartyValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCGST',
        name        : 'txtPartyCGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffCGST.setValue(Number(txtPartyCGST.getValue())-Number(txtGRNCGST.getValue()));
                 flxaccupdation(); 
          }

        }      

   });

   var txtPartySGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartySGST',
        name        : 'txtPartySGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffSGST.setValue(Number(txtPartySGST.getValue())-Number(txtGRNSGST.getValue()));
                 flxaccupdation(); 
          }

        } 
   });
   var txtPartyIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyIGST',
        name        : 'txtPartyIGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffIGST.setValue(Number(txtPartyIGST.getValue())-Number(txtGRNIGST.getValue()));
                 flxaccupdation(); 
          }

        } 
   });

   var txtPartyCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCess',
        name        : 'txtPartyCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyTCS',
        name        : 'txtPartyTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMILLWt',
        name        : 'txtMILLWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLValue',
        name        : 'txtMILLValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLCGST',
        name        : 'txtMILLCGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{


        }      

   });

   var txtMILLSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLSGST',
        name        : 'txtMILLSGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){

          }

        } 
   });
   var txtMILLIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLIGST',
        name        : 'txtMILLIGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
          }

        } 
   });

   var txtMILLCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLCess',
        name        : 'txtMILLCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLTCS',
        name        : 'txtMILLTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffWt',
        name        : 'txtDiffWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffValue',
        name        : 'txtDiffValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSGST',
        name        : 'txtDiffSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtDiffIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffIGST',
        name        : 'txtDiffIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtDiffCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCess',
        name        : 'txtDiffCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffTCS',
        name        : 'txtDiffTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtVouNo = new Ext.form.NumberField({
        fieldLabel  : 'Vou No.',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        width       :  70,
	readOnly : true,
//    	labelStyle : "font-size:10px;font-weight:bold;",
	//style      : "border-radius:5px;",     
        tabindex : 2
   });

   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });


   var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 190,
        width: 680,
        x: 0,
        y: 5,
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
            {header: "Taxable", dataIndex: 'taxable', sortable:true,width:100,align:'left', menuDisabled: true },   
            {header: "CGST %", dataIndex: 'cgstper', sortable:true,width:50,align:'left', menuDisabled: true },  
            {header: "CGST Amt", dataIndex: 'cgstamt', sortable:true,width:60,align:'left', menuDisabled: true },  
            {header: "SGST %", dataIndex: 'sgstper', sortable:true,width:50,align:'left', menuDisabled: true },  
            {header: "SGST Amt", dataIndex: 'sgstamt', sortable:true,width:60,align:'left', menuDisabled: true },  
            {header: "IGST %", dataIndex: 'igstper', sortable:true,width:50,align:'left', menuDisabled: true },  
            {header: "IGST Amt", dataIndex: 'igstamt', sortable:true,width:60,align:'left', menuDisabled: true },  
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


var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No. ',
        width           : 250,
        displayField    : 'invh_invoicerefno', 
        valueField      : 'invh_seqno',
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
                        url: 'clsPayableUpdation.php',
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
//   alert(loadINVNoDetailDataStore.getAt(0).get('invh_seqno'));


                                dtInvNo.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_date'),'d-m-Y'));
  
                                txtBillAmt.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_invoicevalue'));
                                txtPartyValue.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_invoicevalue'));
                                txtGRNValue.setValue(loadINVNoDetailDataStore.getAt(0).get('rech_totalamount'));

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


				var RowCnt = loadINVNoDetailDataStore.getCount();
 			        for (var i=0;i<RowCnt;i++)
                                {
                                   invwt = Number(invwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_qty'));
                                   portwt = Number(portwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_portqty'));
                                   millwt = Number(millwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_millqty'));
                                   grnwt = Number(grnwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_recqty'));

                                }    
                                txtBillQty.setValue(invwt);					
                                txtPartyWt.setValue(portwt);	
                                txtMILLWt.setValue(millwt);	
                                txtGRNWt.setValue(grnwt);

	


                            }  
                        });   
                        loadGRNAmountDataStore.removeAll();
			loadGRNAmountDataStore.load({
                        url: 'clsPayableUpdation.php',
                        params:
                            {
                                task:"loadImportGRNValue",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {

                                txtGRNValue.setValue(loadGRNAmountDataStore.getAt(0).get('grnamt'));


                            }  
                        });  

                        flxDetail.getStore().removeAll();

                        loadINVExpensesDetailDataStore.removeAll();
			loadINVExpensesDetailDataStore.load({
                        url: 'clsPayableUpdation.php',
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
					   parycode   : loadINVExpensesDetailDataStore.getAt(j).get('sup_led_code'),
					   partyname  : loadINVExpensesDetailDataStore.getAt(j).get('sup_refname'),
					   invno      : loadINVExpensesDetailDataStore.getAt(j).get('invc_invno'),
			                   invdate    : Ext.util.Format.date(loadINVExpensesDetailDataStore.getAt(j).get('invc_date'),"Y-m-d"), 
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
flxaccupdation();
           grid_tot();
          
                                }
                           }
                        });   


flxaccupdation();
                   }
         }
  });


   var txtBillAmt = new Ext.form.NumberField({
        fieldLabel  : 'Bill Amount',
        id          : 'txtBillAmt',
        name        : 'txtBillAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   });

   var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty(t)',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  90,
	readOnly : true,
        tabindex : 2,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   });


   var txtGRNAmt = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNAmt',
        name        : 'txtGRNAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2
   });

  var txtGRNWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtGRNWt',
        name        : 'txtGRNWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

  var txtGRNValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNValue',
        name        : 'txtGRNValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCGST',
        name        : 'txtGRNCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNSGST',
        name        : 'txtGRNSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });
   var txtGRNCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCess',
        name        : 'txtGRNCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNIGST',
        name        : 'txtGRNIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });


   var txtGRNTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNTCS',
        name        : 'txtGRNTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });



   var txttotDebit = new Ext.form.TextField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotDebitDNote = new Ext.form.TextField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebitDNote',
        name        : 'txttotDebitDNote',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotCreditDNote = new Ext.form.TextField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCreditDNote',
        name        : 'txttotCreditDNote',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtPurchaseRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtPurchaseRemarks',
        name        : 'txtPurchaseRemarks',
        width       :  450,
        height      : 70,
//	readOnly : true,
        tabindex : 2
   });

   var txtDNoteRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtDNoteRemarks',
        name        : 'txtDNoteRemarks',
        width       :  450,
	readOnly : true,
        tabindex : 2
   });

   var dtInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtInvNo',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });



function grid_tot(){
        var dr = 0;
        var cr = 0;
         txttotDebit.setRawValue(0);
         txttotCredit.setRawValue(0);
         txttotDebitDNote.setRawValue(0);
         txttotCreditDNote.setRawValue(0);


	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 
         txttotDebit.setRawValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));
        dr = 0;
        cr = 0;


	var Row= flxAccountsDNote.getStore().getCount();
        flxAccountsDNote.getSelectionModel().selectAll();
        var sel=flxAccountsDNote.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 
         txttotDebitDNote.setValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCreditDNote.setValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));


}







var loadGRNdetailsStore = new Ext.data.Store({
      id: 'loadGRNdetailsStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewWPLGrnDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
'rech_sup_code', 'rech_date','rech_sgst_per','rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt',
'rech_tcs_per', 'rech_tcs_amt', 'rech_servicecharge', 'rech_freight', 'rech_totalamount', 'rech_billno', 'rech_billdate', 
'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno','rech_geno','rech_gedate', 'rect_seqno', 'rect_item_code', 'rect_billqty', 'rect_millqty', 
'rect_grnqty','rect_itemrate', 'rect_partyitemcode', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'itmh_name', 'itmh_ledcode',
'led_name','sup_refname','sup_led_code','sup_taxcode','rect_degqty'

      ]),
    });


var LoadGRNDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWPLgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_grnno'
      ]),
    });


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Get-Remarks",
    width   : 60,
    height  : 50,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){     
            txtPurchaseRemarks.setRawValue("DUTY AND CLEARNING EXPENSES OF BILL NO." + cmbInvNo.getRawValue() + " Dt. " + Ext.util.Format.date(dtInvNo.getValue(),"d-m-Y") );
	if (txttotDebitDNote.getValue() > 0)
	{  
            txtDNoteRemarks.setRawValue("DEBITED TO YOUR ACCOUNT - EX.MOIS/QTY Shortage AGAINST YOUR B.No." + cmbInvNo.getRawValue() + " Dt. " +  Ext.util.Format.date	(dtInvNo.getValue(),"d-m-Y") + " - OUR GRN NO. " +  cmbPartyName.getRawValue());  
        }
        }
    }
});  


var cmbPartyName = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name. ',
        width           : 300,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbPartyName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsupplierdatastore,
       labelStyle       : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){
               loadInvNoListDataStore.removeAll();
	       loadInvNoListDataStore.load({
			url: 'ClsImportExpenses.php',
			params: {
			    task: 'LoadInvClearingList',
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



function flxaccupdation() {
        var cgstledcode = '';
        var sgstledcode = '';       
        var igstledcode = '';
        var cgstledname = '';
        var sgstledname = '';
        var igstledname = '';



        flxAccounts.getStore().removeAll();
        flxAccountsDNote.getStore().removeAll();



        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel1 = flxDetail.getSelectionModel().getSelections();
        for (var i=0;i<selrows;i++){
              
            parycode  = sel1[i].data.parycode;
            partyname = sel1[i].data.partyname;
            invno     = sel1[i].data.invno;
            invdate   = sel1[i].data.invdate;
            taxable   = sel1[i].data.taxable;
            cgstper   = sel1[i].data.cgstper;
            cgstamt   = sel1[i].data.cgstamt;
            sgstper   = sel1[i].data.sgstper;
            sgstamt   = sel1[i].data.sgstamt;
            igstper   = sel1[i].data.igstper;
            igstamt   = sel1[i].data.igstamt;
            invamt    = sel1[i].data.invamt;

            if (cgstper == 2.5)
            {
		cgstledcode = '1667';
		sgstledcode = '1674';       
		igstledcode = '';
		cgstledname = 'INPUT CGST@2.5%';
		sgstledname = 'INPUT SGST@2.5%';
		igstledname = '';
            }       
            else if (cgstper == 6.0)

            {
		cgstledcode = '1668';
		sgstledcode = '1675';       
		igstledcode = '';
		cgstledname = 'INPUT -CGST @ 6%';
		sgstledname = 'INPUT -SGST @ 6%';
		igstledname = '';
            }   
            else if (cgstper == 9.0)

            {
		cgstledcode = '1669';
		sgstledcode = '1676';       
		igstledcode = '';
		cgstledname = 'INPUT CGST @9%';
		sgstledname = 'INPUT SGST @9%';
		igstledname = '';
            } 
            else if (igstper == 5.0)

            {
		cgstledcode = '';
		sgstledcode = '';       
		igstledcode = '1672';
		cgstledname = '';
		sgstledname = '';
		igstledname = 'INPUT -IGST@5%';
            } 
            else if (igstper == 12.0)

            {
		cgstledcode = '';
		sgstledcode = '';       
		igstledcode = '1670';
		cgstledname = '';
		sgstledname = '';
		igstledname = 'INPUT -IGST @ 12%';
            } 
            else if (igstper == 18.0)

            {
		cgstledcode = '';
		sgstledcode = '';       
		igstledcode = '1671';
		cgstledname = '';
		sgstledname = '';
		igstledname = 'INPUT IGST @18%';
            } 

  


//Party Account - Credit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : parycode,
	      ledname   : partyname,
	      debit     : "0",
              credit    : invamt,
              billno    : invno,
              billdt    : Ext.util.Format.date(invdate,"Y-m-d"),
              ledtype   : "P",
              }) 
        );
//Purchase Account - Debit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : '1785',
	      ledname   : 'WASTE PAPER PURCHASE-IMPORT',
	      debit     : taxable,
              credit    : 0,
              ledtype   : "G",
              }) 
        );

//CGST Account - Debit

        if (cgstamt > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledname,
		      debit     : cgstamt,
		      credit    : 0,
                      ledtype   : "G",
		      }) 
		);
         }

//SGST Account - Debit

        if (sgstamt > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledname,
		      debit     : sgstamt,
		      credit    : 0,
                      ledtype   : "G",
		      }) 
		);
         }

//IGST Account - Debit

        if (igstamt > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledname,
		      debit     : igstamt,
		      credit    : 0,
                      ledtype   : "G",
		      }) 
		);
         }

 }

//alert("testing");

 
grid_tot();

         var diff = 0;
         diff =  txttotDebit.getValue()-txttotCredit.getValue(); 
         var sel1 = flxAccounts.getSelectionModel().getSelections();           		
         sel1[1].set('debit',sel1[1].get('debit')-diff);
         diff =  txttotDebitDNote.getValue()-txttotCreditDNote.getValue(); 
         var sel1 = flxAccountsDNote.getSelectionModel().getSelections();           		
         sel1[1].set('Credit',sel1[1].get('Crdit')-diff);


}
 
    





var dgrecord = Ext.data.Record.create([]);


var gstcalc ="G";






var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:15,
    height: 270,
    hidden:false,
    width: 530,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:280,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:85,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:85,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});


var flxAccountsDNote = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:280,
    height: 130,
    hidden:false,
    width: 530,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:280,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:85,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:85,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},

    ],
    store: [],
    listeners:{	
    }

});




var TrnRMPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnRMPayableUpdationPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                    var gstSave;
                    gstSave="true";
                    if (cmbPartyName.getRawValue()==0 || cmbPartyName.getRawValue()=="")
                    {
                        Ext.Msg.alert('Updation','GRN no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxAccounts.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Updation','Grid should not be empty..');
        	                gstSave="false";
	                    }
          	    else if (flxAccounts.getStore().getCount()==0)
         	            {
        	                Ext.Msg.alert('Updation','Accounts Grid should not be empty..');
        	                gstSave="false";
	                    }

                    else if (Number(txttotDebit.getValue()) != Number(txttotCredit.getValue()))
                    {
                        Ext.Msg.alert('Updation','Total Debit and Credit is Not Tallied......');
                        gstSave="false";
                    }

                    else if (txtPurchaseRemarks.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Remarks for Purchase .....');
                        txtPurchaseRemarks.focus();
                        gstSave="false";
                    }
                    else if (Number(txttotDebitDNote.getValue()) > 0 &&  txtDNoteRemarks.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Remarks for Debit Note .....');
                        txtDNoteRemarks.focus();
                        gstSave="false";
                    }



                    else{



                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{
                            if (btn === 'yes')
				{
                            if (gstSave === "true")
	                        {  


                           
                            var accData = flxAccounts.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(accData, function (record) {
                                poupdData.push(record.data);
                            });


                            var accDatadn = flxAccountsDNote.getStore().getRange();                                        
                            var poupdDatadn = new Array();
                            Ext.each(accDatadn, function (record) {
                                poupdDatadn.push(record.data);
                            });



                            Ext.Ajax.request({
                            url: 'FrmPayableDataSave.php',
    //                    url: 'test1.php',
                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: accData.length  ,

				griddetdn: Ext.util.JSON.encode(poupdDatadn),     
			        cntdn: accDatadn.length  ,


//                                savetype:gstFlag,
                                paymode   :"RM",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,


                             	voutype   :"PIC",
                              	voutypedn :"DNW",
                              	
				partyledcodeh : partyledcode,
				dnremarks     : txtDNoteRemarks.getRawValue(),
				vouno         : txtVouNo.getRawValue(),
				voudate       : Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				grnno     :cmbPartyName.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				refno     : cmbInvNo.getRawValue(),
				refdate   : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                                narration : txtPurchaseRemarks.getRawValue(),
                   		grnamount : txtGRNValue.getValue(),
                                debitamount :txttotCreditDNote.getValue(),
                                
                                dnamt : txtDiffValue.getValue(),
                                dnqty : txtDiffWt.getValue(),
                                
                                dncgst : txtDiffCGST.getValue(),
                                dnsgst : txtDiffSGST.getValue(),
                                dnigst : txtDiffIGST.getValue(),
                                dncess : txtDiffCess.getValue(),
                                dntcs  : txtDiffTCS.getValue(),
                                
                                dncgstp : 0, // dncgstper,
                                dnsgstp : 0, //dnsgstper,
                                dnigstp : 0, //dnigstper,
                                purledcode : 0, //purledgercode,
                                dncgstcode : 0, //cgstledgercode,
                                dnsgstcode : 0, //sgstledgercode,
                                dnigstcode : 0, //igstledgercode,
                                creditdays : 0,
                                invseqno   :cmbInvNo.getValue(),
  
				},
                              callback: function(options, success, response)
                              {

                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("RAWMATERIAL GRN Updated - " + obj['vno']);

                                    TrnRMPayableUpdationPanel.getForm().reset();
                                   
			            flxAccounts.getStore().removeAll();
			            flxAccountsDNote.getStore().removeAll();

                                    RefreshData();
                                  }else
	         { Ext.MessageBox.alert("Updation Error- " + obj['vno']);                                                  
                                    }
                                }
                           });       
                             	}
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
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    TrnRMPayableUpdationPanel.getForm().reset();
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnRMPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 745,
                 height      : 500,
                 x           : 10,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 height      : 50,
				 x           : 10,
				 y           : 0,
				 border      : true,
				 layout      : 'absolute',
				 items:[
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 70,
				          width       : 200,
				          x           : 0,
				          y           :-5,
				          border      : false,
				          items: [txtVouNo]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 200,
				          x           : 200,
				          y           : -5,
				          border      : false,
				          items: [dtVouNo]
				       },
				     ],
				}, 



                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 55,
                          border      : false,
                          items: [cmbPartyName]
                       },




                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 390,
                          x           : 0,
                          y           :105,
                          border      : false,
                          items: [cmbInvNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 300,
                          x           : 0,
                          y           : 155,
                          border      : false,
                          items: [dtInvNo]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 205,
                          border      : false,
                          items: [txtBillAmt]
                       },
  
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 80,
                          width       : 210,
                          x           : 250,
                          y           : 205,
                          border      : false,
                          items: [txtBillQty]
                       },


                       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 260,
		         height      : 240,
		         x           : 450,
		         y           : 0,
		         border      : true,
		         layout      : 'absolute',
		         items:[
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : -10,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtBCD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 10,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtACD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 30,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtSWS]
		                },

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 50,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtCVD]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 70,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtCustomsIGST]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 90,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtOtherDuty]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 110,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtInterest]
		                },		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 130,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtPenalty]
		                },
   		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 150,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtFine]
		                },		              
   		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 300,
		                    x           : 10,
		                    y           : 180,
		                    labelWidth  : 90,
		                    border      : false,
		                    items : [txtTotalDuty]
		                },		              



		         ]
		      },   

                 

                       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 720,
		         height      : 220,
		         x           : 0,
		         y           : 250,
		         border      : true,
		         layout      : 'absolute',
		         items:[
                                   flxDetail,
		         ]
		      },   

  
                      ],

              }  ,

       

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 565,
                 height      : 500,
                 x           : 760,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 400,
                            labelWidth  : 200,
                            x           : 0,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblpurchase]

                        },

	
	           flxAccounts,
                  
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 300,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 300,
		         border      : false,
		         items:[txttotCredit],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
                         labelWidth  : 70,
		         width       : 600,
		         x           : 5,
		         y           : 350,
		         border      : false,
		         items:[txtPurchaseRemarks],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 600,
		         x           : 0,
		         y           : 400,
		         border      : false,
		         items:[btnSubmit],
                       },
/*
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            labelWidth  : 200,
                            x           : 0,
                            y           : 245,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbldebitnote]

                        },
			flxAccountsDNote,

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 410,
		         border      : false,
		         items:[txttotDebitDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 410,
		         border      : false,
		         items:[txttotCreditDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
                         labelWidth  : 70,
		         width       : 600,
		         x           : 5,
		         y           : 440,
		         border      : false,
		         items:[txtDNoteRemarks],
                       },
*/

                ]
             }    
 
            ], 
 


});
 	


    function RefreshData() {
                  VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PIC'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PIC"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadWPLgrnno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      
 }



    var TrnRMPayableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'WASTE PAPER IMPORT - CLEARING UPDATION- Accounting Screen',
        items       : TrnRMPayableUpdationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFFE0"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

onEsc:function(){
},
	listeners:{
             show:function(){
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadWPLgrnno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      	        LoadGSTDataStore.removeAll();
           	LoadGSTDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadgstledger"
		     // gstper : gst 
                   },
		   callback:function()
	          {
                  } 
           	});  			

      	        LoadLedgerDataStore.removeAll();
           	LoadLedgerDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadledgers"
                   },
		   callback:function()
	          {
                  } 
           	}); 
                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PIC'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PIC"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
  
             }    
          } 
    });
       TrnRMPayableUpdationWindow.show();  
});
