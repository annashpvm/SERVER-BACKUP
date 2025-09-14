Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');

   var rounding = 0;

   var seqno = 0;
   var poseqno = 0;

   var gstStatus = "N";
   var gstFlag = "Edit";
   var gstStatus = "N";
   var itemgrpcode = 0;
   var gridedit = "false";
   var FrePaidby = 0;

   var lotcode = 0;

var ledgercode = 0;
var cgstledcode = 0;
var sgstledcode = 0;
var igstledcode = 0;
var cgstledger  = '';
var sgstledger  = '';
var igstledger  = '';
var grnitemcode = 0;


var degrchk = "true"; var editrow = 0; var cessmtval = 0; var dedqty; var lifelessqty; var moistureper; var frttype; var stper = 0;
var scper = 0; var stamt = 0; var scamt = 0; var gridfreqty = 0; var fareacode = 0; var freitem; var freqty; var tonfre = 0; //var gstGroup;
var supplierid = 77; var Validatechk = "true"; 

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var totgrnvalue,cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_billval, pdb_totedval, totgrnqty, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;


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
    fieldLabel  : 'PARTY',
    id          : 'lblParty',
    width       : 60
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN',
    id          : 'lblGRN',
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



var lblFixed = new Ext.form.Label({
    fieldLabel  : 'Fixed',
    id          : 'lblFixed',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblActual = new Ext.form.Label({
    fieldLabel  : 'Actual',
    id          : 'lblActual',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDiff2 = new Ext.form.Label({
    fieldLabel  : 'Diff',
    id          : 'lblDiff2',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


   var txtDegradeItem = new Ext.form.TextField({
        fieldLabel  : 'Item',
        id          : 'txtDegradeItem',
        name        : 'txtDegradeItem',
        width       :  250,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDegradeRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtDegradeRate',
        name        : 'txtDegradeRate',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDegradeValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtDegradeValue',
        name        : 'txtDegradeValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
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
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartySGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartySGST',
        name        : 'txtPartySGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtPartyIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyIGST',
        name        : 'txtPartyIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
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


  var txtgrnvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtgrnvalue',
        name        : 'txtgrnvalue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });


  var txtGRNWt2 = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty(t)',
        id          : 'txtGRNWt2',
        name        : 'txtGRNWt2',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

  var txtGRNValue2 = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNValue2',
        name        : 'txtGRNValue2',
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
var lblDedQty = new Ext.form.Label({
    fieldLabel  : 'Ded.Qty',
    id          : 'lblDedQty',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

   var txtHandlingAmount = new Ext.form.NumberField({
        fieldLabel  : 'Handling',
        id          : 'txtHandlingAmount',
        name        : 'txtHandlingAmount',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingcgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.CGST%',
        id          : 'txtHandlingcgstper',
        name        : 'txtHandlingcgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingsgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.SGST%',
        id          : 'txtHandlingsgstper',
        name        : 'txtHandlingsgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });


   var txtHandlingcgstamt = new Ext.form.NumberField({
        fieldLabel  : 'Handling.CGST',
        id          : 'txtHandlingcgstamt',
        name        : 'txtHandlingcgstamt',
        width       :  60,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingsgstamt = new Ext.form.NumberField({
        fieldLabel  : 'Handling.SGST',
        id          : 'txtHandlingsgstamt',
        name        : 'txtHandlingsgstamt',
        width       :  60,
	readOnly : true,
        tabindex : 2
   });


var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroupDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
  ])
})


    var VouNoDatastore = new Ext.data.Store({
        id: 'VouNoDatastore',
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
    




 var loadunloadpartydatastore = new Ext.data.Store({
      id: 'loadunloadpartydatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadunloadparty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });

 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });



 var loadGSTDatastore = new Ext.data.Store({
      id: 'loadGSTDatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGST"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype'
      ]),
    });


 var loaditemqtydatastore = new Ext.data.Store({
      id: 'loaditemqtydatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 'ordt_item_code','ordt_qty','tol_per','tol_all_qty' ,'ordt_pen_qty','ordt_unit_rate','ordt_edpercentage', 'ordt_moisper','ordt_purgrp'
      ]),
    });


    var loadfreightdatastore = new Ext.data.Store({
      id: 'loadfreightdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'aif_seqno','aif_tonfreight','aif_tonfreight_tipper','arf_seqno','arf_loadfreight','arf_loadfreight_tipper', 
'arf_loadfreight_10w', 'arf_loadfreight_12w'
      ]),
    });

    var loadfreighttondatastore = new Ext.data.Store({
      id: 'loadfreighttondatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreightton"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'aif_seqno', 'aif_party_code', 'aif_area_code', 'aif_type', 'aif_itmh_code', 'aif_tonfreight', 'aif_tonfreight_tipper'
      ]),
    });

    var loadaccupdhstore = new Ext.data.Store({
      id: 'loadaccupdhstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceipth"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_servicecharge', 'rech_handling_cgstper', 'rech_handling_sgstper', 'rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_royality', 'rech_royality_amt', 'rech_dmft', 'rech_dmft_amt', 'rech_nmet', 'rech_nmet_amt', 'rech_acc_seqno',  'sup_type', 'sup_name', 'frt_sup_name', 'handling_sup_name', 'cust_code', 'frt_cust_code', 'sup_led_code', 'sup_taxcode', 'frt_sup_led_code', 'tax_ledcode', 'handling_led_code'
      ]),
    });

    var loadaccupdtstore = new Ext.data.Store({
      id: 'loadaccupdtstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceiptt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount', 'rect_unloadparty', 'rect_lorry_wheels',  'itmh_name', 'lot_refno'
      ]),
    });

    var loadfreightloddatastore = new Ext.data.Store({
      id: 'loadfreightloddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreightlod"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'arf_seqno', 'arf_party_code', 'arf_area_code', 'arf_type', 'arf_loadfreight', 'arf_loadfreight_10w', 'arf_loadfreight_12w', 'arf_loadfreight_tipper'
      ]),
    });

 var loadlotnodatastore = new Ext.data.Store({
      id: 'loadlotnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlotno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_refno','lot_code'
      ]),
    });
var loadfilldtstore = new Ext.data.Store({
      id: 'loadfilldtstore',
	autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfilldt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_grnqty','amnt_unit_rate'
      ])
    });	
 var loadgrnpodatastore = new Ext.data.Store({
      id: 'loadgrnpodatastore',
	anchor     : '100%',
autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnpo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ordh_seqno','ordh_compcode','ordh_fincode','ordh_no','ordh_from','ordh_cust_code','ordh_date','ordh_terms','ordh_carriagetype',
'ordh_paymode','ordh_creditdays','ordh_overdueintper','ordh_payterms','ordh_remarks','ordh_frttype','ordh_frtparty_code','ordh_stper',
'ordh_scper','ordh_cgstper','ordh_sgstper','ordh_igstper','ordh_handling_mt','ordh_handling_cgstper','ordh_handling_sgstper','ordh_itemvalue','ordh_roundinff','ordh_totalvalue',
'ordh_status','ordh_amndstatus','ordh_amndposeqno','ordh_usr_code','ordh_entry_date','ordh_wef_date','ordh_custduty_mt','ordh_handling_mt',
'ordh_handling_party','ordh_gcv','ordh_gcv_tol','ordh_mois','ordh_mois_tol','ordh_inh_mois','ordh_inh_mois_tol','ordh_ash','ordh_ash_tol',
'ordh_sulpher','ordh_size','ordh_hgi','ordh_tcs','ordh_vol_meter','ordh_cess_pmt','ordh_royality','ordh_dmft','ordh_nmet','cancelflag','sup_type'


      ]),
    });

var TaxDataStore = new Ext.data.Store({
  id: 'TaxDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "taxdetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['cust_code', 'sup_name', 'cust_ref', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'tax_code', 'tax_name', 'tax_sales', 'tax_surcharge', 'tax_paidby', 'tax_type', 'tax_ledcode', 'tax_cgst_per', 'tax_sgst_per', 'tax_igst_per', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode'
  ])
})


	var loadgrnitemdatastore = new Ext.data.Store({
	id: 'loadgrnitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsFuGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadgrnitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code'
	]),
	});
var loadponodatastore = new Ext.data.Store({
      id: 'loadponodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_seqno','ordh_no'
      ]),
    });
	
var loadgrnnodatastore = new Ext.data.Store({
      id: 'loadgrnnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPendingGRNS"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno','rech_no', 'rech_seqno'
      ]),
    });

var loadgrneddtdatastore = new Ext.data.Store({
      id: 'loadgrneddtdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGrnQcCombine"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_handling_pmt', 'rech_handling_cgstper','rech_handling_sgstper','rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'sup_type', 'ordh_no','ordh_mois_tol','rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_geno', 'rech_gedate', 'rech_wtslipno', 'rech_truckno','rech_crdays','rech_roundneeded',  'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_ticketwt', 'qc_fuel_itemcode',  'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mios_arb_rate', 'qc_fuel_mois_arb_value', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_mois_adb_rate', 'qc_fuel_mois_adb_value', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_ash_rate', 'qc_fuel_ash_value', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_volatile_rate', 'qc_fuel_volatile_value', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fixedcarbon_rate', 'qc_fuel_fixedcarbon_value', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_iron_rate', 'qc_fuel_iron_value', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_adb_rate', 'qc_fuel_gcv_adb_value', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_gcv_arb_rate', 'qc_fuel_gcv_arb_value', 'itmh_name',  'cust_code', 'sup_name','cust_ref','qc_fuel_slno', 'wc_area_code','wc_unloadingtime','area_name','qc_fuel_area','qc_fuel_unloadingtime','itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc','qc_fuel_entryno','rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_mois_fixed', 'rect_mois_actual', 'rect_moisper', 'rect_moisqty', 'rect_sand_fixed', 'rect_sand_actual', 'rect_sandper', 'rect_sandqty', 'rect_fines_fixed', 'rect_fines_actual', 'rect_finesper', 'rect_finesqty', 'rect_othdedqty', 'rect_totdedqty', 'rect_itemrate', 'rect_grnqty', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_remarks', 'rech_purgrp','sup_type','sup_led_code','tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state','qc_fuel_otherdedqty','qc_fuel_debitamount','cust_state', 'qc_fuel_degrade_item', 'degrade_itemname','qc_fuel_degrade_rate','qc_fuel_degrade_qty'
      ]),
    });
    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'grn_item', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno','rect_gedate', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount','rect_unloadparty', 'rect_lorry_wheels','itmh_ledcode', 'act_rect_qty','rect_wtcardno','rect_othdedqty','itmh_name','lot_refno','rect_billvalue','rech_purgrp','rect_gcv','led_name'

      ]),
    });
var loaditempodatastore = new Ext.data.Store({
      id: 'loaditempodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditempo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','itmh_code'
      ]),
    });

var loadAreadatastore = new Ext.data.Store({
      id: 'loadAreadatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'area_name','area_code'
      ]),
    });
var loadordnodatastore = new Ext.data.Store({
      id: 'loadordnodatastore',
// autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadordno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'ordh_seqno', type: 'int',mapping:'ordh_seqno'},
	{name:'ordh_no', type: 'string',mapping:'ordh_no'}
      ])
    });	



var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        name        : 'txtGRNNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
enableKeyEvents: true, 
  listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpGRNDate.focus();
             }
       },
}		
});

var txtVouNo = new Ext.form.TextField({
    fieldLabel  : 'Voucher No',
    id          : 'txtVouNo',
    name        : 'txtVouNo',
    width       :  110,
    style       :  {textTransform: "uppercase"},
    readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true, 
    listeners:{

    }		
});


var dtVouDate = new Ext.form.DateField({
    fieldLabel : 'Voucher Date',
    id         : 'dtVouDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
 enableKeyEvents: true,   
//    anchor     : '100%',
    width : 100,
//	disabled:true,    
    //readOnly: true,
    listeners:{
    }
});



var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroup"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname'
  ])
})


var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:30,
    height: 180,
    hidden:false,
    width: 1000,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:400,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});






var dramt = 0;
function flxaccupdation() {


        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        flxAccounts.getStore().removeAll();
//Party Account - Credit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : ledgercode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : "0",
              credit    : Ext.util.Format.number(txtGRNValue.getRawValue(),'0.00'),
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

//Purchase Account - Debit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : cmbPurchaseLedger.getValue(),
	      ledname   : cmbPurchaseLedger.getRawValue(),
	      debit     : Ext.util.Format.number(txtTotGRNValue.getRawValue(),'0.00'),
              credit    : 0,
              ledtype   : "G",
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              }) 
        );
//CGST Account - Debit

// alert(txtCGSTValue.getValue());
        if (txtCGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledger,
		      debit     :  Ext.util.Format.number(txtCGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//SGST Account - Debit

        if (txtSGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledger,
		      debit     :  Ext.util.Format.number(txtSGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//IGST Account - Debit

        if (txtIGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledger,
		      debit     : Ext.util.Format.number(txtIGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//TCS Account - Debit

        if (txtTCSValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1865',
		      ledname   : 'TCS PAID-PURCHASE',
		      debit     : txtTCSValue.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
		      }) 
		);
         }

//CESS Account - Debit

        if (txtCessValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "2026",
		      ledname   : "COMPENSATION CESS @400/ PER/MTS",
		      debit     : txtCessValue.getValue(),
		      credit    : 0,
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
                      ledtype   : "G",
		      }) 
		);
         }


//HANDLING Account - Debit

         if (txtHandCharges.getValue() > 0 )
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "1757",
		      ledname   : "HANDLING CHARGES-GST 18%",
		      debit     : txtHandCharges.getRawValue(),
		      credit    : 0,
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
                      ledtype   : "G",

		      }) 
		);
         }


       if (txtHandCharges.getValue() > 0  &&  txtHandlingcgstval.getRawValue() > 0)
         {

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1669',
		      ledname   : 'INPUT CGST @9%',
		      debit     :txtHandlingcgstval.getRawValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1676',
		      ledname   : 'INPUT SGST @9%',
		      debit     :txtHandlingsgstval.getRawValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);

         }

        rounding = Number(txtroundoff.getValue()); 
	var rounddr = 0;
	var roundcr = 0;
	if ( rounding  > 0)
	   rounddr = rounding;
	else
	   roundcr = Math.abs(rounding);


	if (rounding != 0)
	{
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : 1859,
		      ledname   : 'ROUNDED OFF',
		      debit     : Ext.util.Format.number(rounddr,'0.00'),
		      credit    : Ext.util.Format.number(roundcr,'0.00'),
		      billno    : txtBillno.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
	}

       grid_tot_acc();
}

var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Ledger',
    width           : 170,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,

    labelStyle	: "font-size:12px;font-weight:bold;",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    enableKeyEvents: true, 
    listeners:{
         select: function () 
        { 
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{



                  txtCGSTPer.setRawValue('');
                  txtSGSTPer.setRawValue('');
                  txtIGSTPer.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';


 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();

                    if (cnt >0)
                    {


                                        if (suptype == 24)
                                        {  

					txtCGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
					txtSGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
					txtIGSTPer.setValue(0);
                                        }   

                                        else
                                        {  
					txtCGSTPer.setValue(0);
					txtSGSTPer.setValue(0);
					txtIGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
                                        }   


                          cgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');

                    } 
  //                  find_value(); 

 //               flxaccupdation(); 


                grid_tot(); 
  
		}
	      });  

      } ,  

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtbillqty.focus();
             }
       },
}
});


function calcost(){



		var Rowk= flxDetail.getStore().getCount();
        	flxDetail.getSelectionModel().selectAll();
		
		var selk=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{


                   pdb_costvalue =  Number(txtLandingCost.getValue())/Number(txtTotGRNQty.getValue())* Number(selk[i].get('partygrnqty'));
                   pdb_costrate =   pdb_costvalue / Number(selk[i].get('partygrnqty'));
                   selk[i].set('costval', Ext.util.Format.number(pdb_costvalue,'0.00'));
                   selk[i].set('costrate', Ext.util.Format.number(pdb_costrate,'0.00000'));
		}

}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function Refresh(){

   rounding = 0;

	txtbillqty.setValue('');
	txtMillQty.setValue('');
	txtFixedMoisPer.setValue('');
	txtMoisQty.setValue('');

	txtOtherDedQty.setValue('');
	txtFinesQty.setValue('');
	txtdegradeqty.setValue('');
	txtTotDedQty.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');

	txtOtherDedQty.setValue('');
        txtFixedFinesPer.setValue('');
        txtRate.setValue('');
        txtRemarks.setRawValue('');

        txtTotDedQty.setValue('');
        txtSandQty.setValue('');
        txtDegradeItem.setValue('');
        txtDegradeRate.setValue('');
        txtDegradeQty.setValue('');


  }

function findLandingCost()
{
	var tcs_calc =0;

        var billcgst = 0;
        var billsgst = 0;
        var billigst = 0;


        var grncgst = 0;
        var grnsgst = 0;
        var grnigst = 0;

        var grntcs =0;

	txtTotGRNValue.setRawValue(Ext.util.Format.number(lbl_totitem_value),"0.00");
        txtTotGRNQty.setRawValue(Ext.util.Format.number(lbl_totitemqty,"0.000"));


        grncgst = (txtTotGRNValue.getValue() * txtCGSTPer.getValue()) / 100;
        grncgst = Math.round(grncgst * 100) / 100;
        grnsgst = (txtTotGRNValue.getValue() * txtSGSTPer.getValue()) / 100;
        grnsgst = Math.round(grnsgst * 100) / 100;
        grnigst = (txtTotGRNValue.getValue() * txtIGSTPer.getValue()) / 100;
        grnigst = Math.round(grnigst * 100) / 100;

        grncgst1 = Number(grncgst)+ Number(txtCGSTPM.getValue());
        grnsgst1 = Number(grnsgst)+ Number(txtSGSTPM.getValue());
        grnigst1 = Number(grnigst)+ Number(txtIGSTPM.getValue());


        txtCGSTValue.setValue(Ext.util.Format.number(grncgst1, "0.00"));
    	txtSGSTValue.setValue(Ext.util.Format.number(grnsgst1, "0.00"));
    	txtIGSTValue.setValue(Ext.util.Format.number(grnigst1, "0.00"));



//Modified on 21/06/2024 for TCS calculation
	tcs_calc = Number(lbl_totitem_value) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue();

	tcs_calc = Number(lbl_totitem_value) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue()+ Number(txtCessValue.getValue()) + Number(txtHandCharges.getValue())+Number(txtHandlingcgstval.getValue()) +Number(txtHandlingsgstval.getValue());


	txtTCSValue.setRawValue(Ext.util.Format.number((txtTCSPer.getValue() * (tcs_calc / 100) ), "0"));

	txtTotGRNQtybill.setValue(Ext.util.Format.number(tot_billqty,"0.000"));
	txttotBillValue.setValue(pdb_tot_billval);










	pdb_grn_value = Number(lbl_totitem_value) + Number(txtCGSTValue.getValue()) + Number(txtSGSTValue.getValue()) + Number(txtIGSTValue.getValue())+Number(handlingval1)  + Number(txtCessValue.getValue())+Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) +Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());


//  alert(roundoff);

//annadurai 
      pdb_landingcost = Number(lbl_totitem_value) +Number(handlingval1)  + Number(txtCessValue.getValue()) + Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue())+Number(txtFrtValue.getValue());

  //     txtroundoff.setValue(0);



        totgrnvalue = pdb_grn_value
//alert(totgrnvalue);
        if (roundoff == "Y")     
        {         

           pdb_grn_value =  pdb_grn_value.toFixed(0) ;
           pdb_landingcost =  pdb_landingcost.toFixed(0) ;
           txtroundoff.setRawValue(Ext.util.Format.number(pdb_grn_value-totgrnvalue,"0.00"));
        }


         if (roundoff == "M")  
    
	{

	     pdb_grn_value =  Number(totgrnvalue) + Number(txtroundoff.getValue());

	}


	txtLandingCost.setRawValue(Ext.util.Format.number((pdb_landingcost), "0.00"));
//	txtGRNValue.setRawValue(Ext.util.Format.number((pdb_grn_value), "0.00"));
//	txtGRNValue.setRawValue(pdb_grn_value);
        txtGRNValue.setRawValue(Ext.util.Format.number(pdb_grn_value,"0.00"));

        billcgst = (txtPartyValue.getValue() * txtCGSTPer.getValue()) / 100;
        billcgst = Math.round(billcgst * 100) / 100;
        billsgst = (txtPartyValue.getValue() * txtSGSTPer.getValue()) / 100;
        billsgst = Math.round(billsgst * 100) / 100;
        billigst = (txtPartyValue.getValue() * txtIGSTPer.getValue()) / 100;
        billigst = Math.round(billigst * 100) / 100;

//        billtcs  = Math.round((Number(txtPartyValue.getValue()) +amt_cgst+amt_sgst+amt_cgst) * Number(txtTCSPer.getValue())/100,0);

        if (Number(txtTCSPer.getValue()) > 0)
        {  
           billtcs  = Math.round((Number(txtPartyValue.getValue()) +billcgst+billsgst+billigst) *  Number(txtTCSPer.getValue())/100,0);

           grntcs  = Math.round((Number(txtGRNValue.getValue()) +grncgst+grnsgst+grnigst) *  Number(txtTCSPer.getValue())/100,0);
        }  
        else
        { 
          billtcs  = 0;
          grntcs  = 0;
        }  


        billcess = Math.round(Number(txtPartyValue.getValue()) * Number(txtCessPerMT.getValue()) ,0);
        grncess = Math.round(Number(txtGRNValue.getValue()) * Number(txtCessPerMT.getValue()) ,0);

        txtPartyCGST.setValue(Ext.util.Format.number(billcgst, "0.00"));
    	txtPartySGST.setValue(Ext.util.Format.number(billsgst, "0.00"));
    	txtPartyIGST.setValue(Ext.util.Format.number(billigst, "0.00"));
        txtPartyTCS.setValue(Ext.util.Format.number(billtcs,"0.00")); 
        txtPartyCess.setValue(Ext.util.Format.number(billcess,"0.00"));

        txtGRNWt.setValue(txtTotGRNQty.getRawValue()); 
        txtGRNCGST.setValue(txtCGSTValue.getValue()); 
	txtGRNSGST.setValue(txtSGSTValue.getValue()); 
	txtGRNIGST.setValue(txtIGSTValue.getValue()); 
	txtGRNTCS.setValue(Ext.util.Format.number(grntcs,"0.00")); 
	txtGRNCess.setValue(Ext.util.Format.number(grncess,"0.00")); 
        txtgrnvalue.setRawValue(txtGRNValue.getRawValue()); 




	if (Number(txtPartyValue.getValue() ) >  Number(txtGRNValue.getValue()))
	{
            txtDiffValue.setValue(Ext.util.Format.number(txtPartyValue.getValue()-txtGRNValue.getValue(),"0.00"));
	}
	else
	{
           txtDiffValue.setValue('');
	}
                          
	if (Number(txtPartyValue.getValue() ) >  Number(txtGRNWt.getValue()))
	{
            txtDiffWt.setValue(Ext.util.Format.number(txtPartyWT.getValue()-txtGRNWt.getValue(),"0.00"));
	}
	else
	{
           txtDiffWt.setValue('');
	}
	txtDiffCGST.setValue(Ext.util.Format.number(billcgst-grncgst,"0.00"));
	txtDiffSGST.setValue(Ext.util.Format.number(billsgst-grnsgst,"0.00"));
	txtDiffIGST.setValue(Ext.util.Format.number(billigst-grnigst,"0.00"));
	txtDiffCess.setValue(Ext.util.Format.number(billcess-grncess,"0.00"));
	txtDiffTCS.setValue(Ext.util.Format.number(billtcs-grntcs,"0.00"));





calcost(); 

}

function grid_tot_acc(){
        var dr = 0;
        var cr = 0;
         txtTotDebit.setRawValue(0);
         txtTotCredit.setRawValue(0);



        var selrows = flxAccounts.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxAccounts.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));


        }

            dr = Math.round(dr * 100) / 100;
            cr = Math.round(cr * 100) / 100;


         txtTotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));


}


var itemnamelist = 'Received ';

function grid_tot(){

var chkfrepaidby;

	    pdb_totval = 0;
	    pdb_totedval = 0;
	    pdb_totqty = 0;
	    totgrdothrchrg = 0;
	    pdb_freightadvance = 0;
	    tot_billqty = 0;
	    pdb_tot_millqty = 0;
	    totgrnqty = 0;
	    pdb_tot_billval = 0;
	    totgrdothrchrg = 0;
	    pdb_totgrn_value2 = 0;
	    //txt_gate_entryno.Text = "";
	    pdb_unloading = 0;
	    handlingval1 =0;

            partyvalue = 0;

            var Row= flxDetail.getStore().getCount();
	    flxDetail.getSelectionModel().selectAll();
            var sel=flxDetail.getSelectionModel().getSelections();
        itemnamelist = 'Received ';

	    for(var i=0;i<Row;i++)
	    {
/*
             if (itemnamelist ==  'Received ')
                 itemnamelist = itemnamelist +  sel[i].data.itemname;
              else
                 itemnamelist = itemnamelist + ' , '+ sel[i].data.itemname;
*/


			pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(sel[i].data.itemvalue)), "0.00");
			totgrnqty = Ext.util.Format.number(Number(totgrnqty) + Number(sel[i].data.partygrnqty),"0.000");

			pdb_tot_millqty = Ext.util.Format.number(Number(pdb_tot_millqty) + Number(sel[i].data.millqty),"0.000");

			tot_billqty = Ext.util.Format.number(Number(tot_billqty) + Number(sel[i].data.billqty), "0.000");

			partyvalue =  Number(sel[i].data.billqty) * Number(sel[i].data.itemrate);
	     }

             pdb_tot_billval = Number(txtBillValue.getValue());




            handlingval1 = totgrnqty * txtHandlingPMT.getValue();
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100), "0.00" ));
            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtCessValue.setValue(Ext.util.Format.number( Number(totgrnqty) * txtCessPerMT.getValue(),"0.00"));
		
             addnlfrt  = Number(totgrnqty) * Number(txtFrtMT.getValue());
            txtFrtValue.setValue(addnlfrt);

            lbl_tot_millqty = Ext.util.Format.number(pdb_tot_millqty, "0.000");
            lbl_tot_value_for_millqty = Ext.util.Format.number(pdb_tot_billval, "0.000");

            lbl_totitem_value = Ext.util.Format.number(pdb_totval, "0.00");
            lbl_totitemqty = Ext.util.Format.number(totgrnqty, "0.000");
	  
	

	     newtaxval = Number(lbl_tot_value_for_millqty); 
    	
//alert(partyvalue);
             txtPartyWt.setRawValue(Ext.util.Format.number(tot_billqty, "0.000"));
             txtPartyValue.setRawValue(Ext.util.Format.number(partyvalue, "0.00"));

//alert(newtaxval);
//alert(txtCGSTPer.getValue());




             //txtCGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtCGSTPer.getValue()) / 100), "0.00"));
//    	     txtSGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtSGSTPer.getValue()) / 100), "0.00"));
//    	     txtIGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtIGSTPer.getValue()) / 100), "0.00"));
  


//       txtRemarksAcc.setRawValue(itemnamelist + " vide your Bill Number " + txtBillno.getRawValue() + " Dt. " +   Ext.util.Format.date(dtpBillDate.getValue(),"d-m-Y"),)  
	    
       findLandingCost();
    	
        flxaccupdation();

}

var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 400,
    height:55,
    defaultType : 'textfield',
    x:700,
    y:40,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 Ext.getCmp('txtroundoff').setReadOnly(true);  
                 txtroundoff.setValue('0');
                 findLandingCost();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                 txtroundoff.setValue('0');
                 Ext.getCmp('txtroundoff').setReadOnly(true);  
                findLandingCost();   
               }
              }
             }} ,
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="M";
                 Ext.getCmp('txtroundoff').setReadOnly(false); 
          
                findLandingCost(); 

               }
              }
             }} 

        ],
    },

    ],
});







function calculateItemvalue(){

   var totdedqty = 0;
   var grnqty = 0;

       totdedqty =  Number(txtMoisQty.getValue())+Number(txtFinesQty.getValue())+Number(txtSandQty.getValue()) + Number(txtOtherDedQty.getValue());

       txtTotDedQty.setRawValue(Ext.util.Format.number(totdedqty, "0.000"));
       grnqty =  Number(txtMillQty.getValue()) - Number(totdedqty) ;
       txtGRNQty.setRawValue(Ext.util.Format.number(grnqty, "0.000"));

       grnvalue = Number(grnqty) * Number(txtRate.getValue());
       txtItemValue.setRawValue(Ext.util.Format.number(grnvalue, "0.00"));

    
}

function CalculateTax()
{


}

function validatechkgrid()
{

	Validatechk="true";
	if (cmbitem.getValue()==0 || cmbitem.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Item Code');
		Validatechk="false";
	}
	else if (txtRate.getValue()==0 || txtRate.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Item Rate should not be empty');
		Validatechk="false";
	}
	else if (txtBillno.getValue()==0 || txtBillno.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Bill No to be Entered');
		Validatechk="false";
	}
	else if (txtLorryNo.getValue()==0 || txtLorryNo.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Lorry No to be Entered');
		Validatechk="false";
	}

	else if (txtbillqty.getValue()==0 || txtbillqty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtbillqty.focus();
	}

	else if (txtMillQty.getValue()==0 || txtMillQty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Mill Qty Should be Greater than Zero');
		Validatechk="false";
	}

	else if (Number(txtFixedMoisPer.getValue()) >  100)
	{
		Ext.Msg.alert('Fuel-GRN','Moisture % Should not be Greater than 100%');
		Validatechk="false";
	}


	else if (txtBillValue.getValue()==0 || txtBillValue.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Value Should be Greater than Zero');
		Validatechk="false";
	}
}

var txtHandlingcgst = new Ext.form.TextField({
    fieldLabel  : 'H.CGST %',
    id          : 'txtHandlingcgst',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    enableKeyEvents: true,
    listeners:{
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
    }
});

var txtHandlingsgst = new Ext.form.TextField({
    fieldLabel  : 'H.SGST %',
    id          : 'txtHandlingsgst',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
   enableKeyEvents: true,
    listeners:{
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
    }
});



var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 90,
    height  : 30,
    x       : 1020,
    y       : 160,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    labelStyle	: "font-size:12px;font-weight:bold;",

    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    

		validatechkgrid();

		
		if (Validatechk === "true")
		{

			flxDetail.getSelectionModel().selectAll();
		        var selrows = flxDetail.getSelectionModel().getCount();
		        var sel = flxDetail.getSelectionModel().getSelections();

		        var cnt = 0,gecnt = 0;
		        for (var i=0;i<selrows;i++)
			{

		            if (sel[i].data.geno == txtGENo.getRawValue())
			    {
		                cnt = cnt + 1;
		            }
		        }

			if(gridedit === "true")
			{
				var itemseq = cmbitem.getValue();
				//alert(cmbunloadparty.getValue());
				Ext.getCmp('cmbitem').setDisabled(false);

	
			



				var idx = flxDetail.getStore().indexOf(editrow);

				sel[idx].set('itemcode', cmbitem.getValue());
				sel[idx].set('itemname', cmbitem.getRawValue());
			
				sel[idx].set('billqty', txtbillqty.getRawValue());
				sel[idx].set('millqty', txtMillQty.getValue());
				sel[idx].set('fixedMois', txtFixedMoisPer.getValue());
				sel[idx].set('actualMois', txtMoisQty.getValue());
				sel[idx].set('ExMoisper', txtFixedMoisPer.getValue());

				sel[idx].set('moisqty', txtMoisQty.getValue());	
				sel[idx].set('fixedfines', txtFixedMoisPer.getValue());
				sel[idx].set('actualfines', txtMoisQty.getValue());
				sel[idx].set('Exfines', txtFixedMoisPer.getValue());
				sel[idx].set('finesqty', txtMoisQty.getValue());	
				sel[idx].set('fixedsand', txtFinesQty.getValue());
				sel[idx].set('actualsand', txtFixedFinesPer.getValue());
				sel[idx].set('Exsand', txtFinesQty.getValue());
				sel[idx].set('sandqty', txtFixedFinesPer.getValue());

				sel[idx].set('othdedqty', txtOtherDedQty.getValue());

	             		sel[idx].set('totdedqty', txtTotDedQty.getValue());
	             		sel[idx].set('dnvalue', txtDNValue.getValue());
				sel[idx].set('partygrnqty', txtGRNQty.getValue());
                  		sel[idx].set('millgrnqty', txtMillGRNWt.getValue());       
				sel[idx].set('itemrate', txtRate.getValue());
				sel[idx].set('itemvalue',txtItemValue.getValue());
		


                                Refresh();
                                grid_tot();
				//if(fareacode > 0) {  }


				//flxDetail.getSelectionModel().clearSelections();
				gridedit = "false";
				

			}//if(gridedit === "true")var 
			else{
				if (cnt ==0)
				{
				 
		           	 	var RowCnt = flxDetail.getStore().getCount() + 1;
		            		flxDetail.getStore().insert(
		                	flxDetail.getStore().getCount(),
		               		new dgrecord({
				            	slno:RowCnt,

						itemcode	:	cmbitem.getValue(),
				            	itemname	:	cmbitem.getRawValue(),
			
					    	billqty		:	txtbillqty.getRawValue(),
						millqty		:	txtMillQty.getRawValue(),
						moisper		:	txtFixedMoisPer.getRawValue(),
						moisqty		:	txtMoisQty.getRawValue(),

						othdedqty	:	txtOtherDedQty.getValue(),
                                                rejper          :	txtFixedFinesPer.getValue(),

						rejqty		:	txtFinesQty.getValue(),
						totdedqty       :	txtTotDedQty.getValue(),
						grnqty		:	txtGRNQty.getValue(),
                  				millgrnqty	:	txtMillGRNWt.getValue(),

     
						itemrate	:	txtRate.getValue(),
		
						itemvalue	:	txtItemValue.getRawValue(),
			
						remarks		:	txtRemarks.getRawValue(),
			
		
						billno		:	txtBillno.getRawValue(),
						lorryno		:	txtLorryNo.getRawValue(),
						billdate	:	Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),

						geno		:	txtGENo.getValue(),
                                      		gedate     	:	Ext.util.Format.date(dtpGEDate.getValue(),"Y-m-d"),
						billvalue	:	txtBillValue.getValue(),
                                                wtcardno        :       txtTicketNo.getValue(),
						grpname         :       cmbPurchaseLedger.getRawValue(),
						grpcode         :       cmbPurchaseLedger.getValue(),
			                }) 
			                );

	
                                        Refresh();
grid_tot();  
					//if(fareacode > 0) {  }

				}//if cnt==0
				else
				{

					if(cnt == 1){
						alert("Gate Entry Number already selected");
					}
					else if(gecnt == 1){
						alert("Gate Entry Number already selected");
					}
			
				}//else cnt=0
			}//else(gridedit === "true")
		}//if (Validatechk === "true")

            }
}
});

var dtpGRNDate = new Ext.form.DateField({
    fieldLabel : 'GRN. Date',
    id         : 'dtpGRNDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
 enableKeyEvents: true,   
//    anchor     : '100%',
    width : 100,
//	disabled:true,    
    //readOnly: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplierName.focus();
             }
       },
            change:function(){
         
  
 

	
            }
    }
});

var dtpGEDate = new Ext.form.DateField({
    fieldLabel : 'Gate Entry Date',
    id         : 'dtpGEDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
//    anchor     : '100%',
    width : 100,
enableKeyEvents: true, 
    //readOnly: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtLorryNo.focus();
             }
       },
            change:function(){
           /*     duedateval=this.getValue();loadgrnpo
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);*/
            }
    }
});

var cmbitem = new Ext.form.ComboBox({
        fieldLabel      : 'Item',
        width           : 290,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitem',
        typeAhead       : true,
        mode            : 'local',
        store           : loaditempodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
        listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurchaseLedger.focus();
             }
       },
	select : function(){

		loaditemqtydatastore.removeAll();
		loaditemqtydatastore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loaditemqty",
		    itemcode : cmbitem.getValue(),
		    ordcode : cmbOrderNo.getValue(),
		    gstFlag : gstFlag
		},
		scope : this,
		callback:function()
		{

                        cmbPurchaseLedger.setValue(loaditemqtydatastore.getAt(0).get('ordt_purgrp'));
			loadfilldtstore.removeAll();
			loadfilldtstore.load({
			url : 'ClsFuGrn.php',
			params : 
			{
				task : "loadfilldt",
				qrycode: "GRN",
				grnno:  cmbGRNNo.getValue(),
				itemcode: cmbitem.getValue()
			},
			
			callback : function()
			{

				var fillcnt;
				fillcnt =   loadfilldtstore.getCount();

				if (fillcnt > 0 )//&& (!loadfilldtstore.getAt(0).get('rect_grnqty') == "null"))
				{

				if (loadfilldtstore.getAt(0).get('rect_grnqty') !== null) {
					pdb_grnqty = loadfilldtstore.getAt(0).get('rect_grnqty');
				}

				}
				//pdb_grnqty = Number(Ext.isEmpty(loadfilldtstore.getAt(0).get('rect_grnqty') ? 0 : loadfilldtstore.getAt(0).get('rect_grnqty')) );

			var toleranceallqty = Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('tol_all_qty')), "0.000");
			
			txtFixedMoisPer.setValue(Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000"));
			moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
                        txtRate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
			calculateItemvalue();
				
/*
			loadfilldtstore.removeAll();

			loadfilldtstore.load({
			url : 'ClsFuGrn.php',
			params : 
			{
				task : "loadfilldt",
				qrycode: "RATE",
				grnno:  cmbOrderNo.getValue(),
				itemcode: cmbitem.getValue(),
				billdate: Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
			},
			
			callback : function()
			{
				var fillcnt;
				fillcnt =   loadfilldtstore.getCount();

				if (fillcnt > 0 )//&& (!loadfilldtstore.getAt(0).get('amnt_unit_rate') == "null"))
				{
				
					//pdb_itemrate = Number(Ext.isEmpty(loadfilldtstore.getAt(0).get('amnt_unit_rate') ? 0 : loadfilldtstore.getAt(0).get('amnt_unit_rate')) );
					//pdb_itemrate = loadfilldtstore.getAt(0).get('amnt_unit_rate');
					if((cmbOrderNo.getRawValue().charAt(2)) == "A"){
						txtRate.setValue(Ext.util.Format.number(loadfilldtstore.getAt(0).get('amnt_unit_rate'), "0.00"));
					}
					else{
						txtRate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
					}
				}
			}
			});
*/

			}
			});



			
		}
	    	});
	}
        
	}
   });


 var frtype="0";


var cmbOrderNo = new Ext.form.ComboBox({
    fieldLabel      : 'Order No',
    width           : 150,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : '',
    id              : 'cmbOrderNo',
    typeAhead       : true,
    mode            : 'local',
    store           : loadordnodatastore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    //tabindex	    : 0,
    allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    

    listeners:{

 		specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbArea.focus();
             }
       },

 select: function(){

                        poseqno = cmbOrderNo.getValue();  	

			loaditempodatastore.removeAll();
			    loaditempodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditempo",
				    ordcode: cmbOrderNo.getValue()
				}
			    });

/*
			loadfreighttondatastore.removeAll();
			loadfreighttondatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightton",
				    suplrcode :txtSupplierName.getValue()
				}
			});
			loadfreightloddatastore.removeAll();
			loadfreightloddatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightlod",
				    suplrcode :txtSupplierName.getValue()
				}
			});

*/
			loadgrnpodatastore.removeAll();
			loadgrnpodatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadgrnpo",
				 ordcode : cmbOrderNo.getValue()
                        	 },

			callback : function()
			{
				var grnpocount;
                   		grnpocount=0;
                   		grnpocount=loadgrnpodatastore.getCount();

				dtpBillDate.setValue(new Date(loadgrnpodatastore.getAt(0).get('ordh_date')));
				FrePaidby = loadgrnpodatastore.getAt(0).get('ordh_frttype');
//Ext.getCmp('optfrtype').setValue(loadgrnpodatastore.getAt(0).get('ordh_frttype'));




                          	txtCrdays.setValue(loadgrnpodatastore.getAt(0).get('ordh_creditdays'));
				txtCGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_cgstper'));
				txtSGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_sgstper'));
				txtIGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_igstper'));
				

				txtTCSPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_tcs'));

				moistol = loadgrnpodatastore.getAt(0).get('ordh_mois_tol');	
				txtCessPerMT.setValue(Ext.isEmpty(loadgrnpodatastore.getAt(0).get('ordh_cess_pmt')) ? 0 : loadgrnpodatastore.getAt(0).get('ordh_cess_pmt'));
				txtHandlingPMT.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_mt'));
				txtHandlingcgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_sgstper'));
																


			}
				 
			});


	},


	}
   });
  
var txtSupplierName = new Ext.form.TextField({
    fieldLabel  : 'Supplier Name',
    id          : 'txtSupplieName',
    width       : 280,
    name        : 'txtSupplierName',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true,
    readOnly   : true,

    listeners:{

     }
});


function getGRNDetails()
{
	tabgrn.setActiveTab(0);

        flxDetail.getStore().removeAll();
	loadgrneddtdatastore.removeAll();
	loadgrneddtdatastore.load({
		url:'ClsFuGrn.php',
		params:
		{
		task:"loadGrnQcCombine",
		finid : GinFinid,
		compcode : Gincompcode,
		grnno : cmbGRNNo.getValue()
		},
		callback:function()
		{

                       	var RowCnt = loadgrneddtdatastore.getCount();

			if ((loadgrneddtdatastore.getCount()) == 0){
				Ext.Msg.alert('Fuel-GRN','Receipt Details not Found');
			}
			else{


 //                     if (loadgrneddtdatastore.getAt(0).get('rech_roundneeded') == "Y")
//                           Ext.getCmp("optRounding").setValue(1);
//                        else
//                           Ext.getCmp("optRounding").setValue(2);



			
                        seqno = loadgrneddtdatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');

                        txtCrdays.setValue(loadgrneddtdatastore.getAt(0).get('rech_crdays'));


			dtpGRNDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
			dtVouDate.setValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));

                	suptype = loadgrneddtdatastore.getAt(0).get('cust_state');


                	supcode = loadgrneddtdatastore.getAt(0).get('rech_sup_code');

			txtSupplierName.setRawValue(loadgrneddtdatastore.getAt(0).get('cust_ref'));

                        ledgercode = loadgrneddtdatastore.getAt(0).get('rech_sup_code');

                        txtQCNo.setValue(loadgrneddtdatastore.getAt(0).get('qc_fuel_entryno'));
                        txtTicketNo.setValue(loadgrneddtdatastore.getAt(0).get('qc_fuel_ticketno'));
			txtBillno.setValue(loadgrneddtdatastore.getAt(0).get('rech_billno'));
			dtpBillDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_billdate'),'d-m-Y'));       
			txtBillValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));
			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtLorryNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_truckno'));        
                        cmbPurchaseLedger.setValue(loadgrneddtdatastore.getAt(0).get('rech_purgrp')); 
                        cmbArea.setValue(loadgrneddtdatastore.getAt(0).get('rech_area_code')); 
                        grnitemcode = loadgrneddtdatastore.getAt(0).get('rect_item_code'),

                        txtFrtMT.setRawValue('');
                        if (grnitemcode == 23)
                        {

                           txtFrtMT.setValue('450.00');
                           txtFrtMT.setRawValue('450.00');
                        }
                     

                        txtGRNNo.setValue(cmbGRNNo.getRawValue());
	                for (var i=0;i<RowCnt;i++)
			{






                        moisqtyded  = loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_qty')/1000;
                        sandqtyded  = loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_qty')/1000;
                        finesqtyded = loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_qty')/1000;

                        otherdedqty = loadgrneddtdatastore.getAt(i).get('qc_fuel_otherdedqty')/1000;


                        moisqtyded =  Ext.util.Format.number(moisqtyded, "0.000");
                        sandqtyded =  Ext.util.Format.number(sandqtyded, "0.000");
                        finesqtyded =  Ext.util.Format.number(finesqtyded, "0.000");
                        otherdedqty =  Ext.util.Format.number(otherdedqty, "0.000");

   
                        dedqty = Number(moisqtyded)+Number(sandqtyded)+Number(finesqtyded)+Number(otherdedqty);;

                        grnqty = Number(loadgrneddtdatastore.getAt(i).get('rect_grnqty'));

                        millgrnqty = Number(loadgrneddtdatastore.getAt(i).get('rect_grnqty'))- Number(dedqty);


                        grnqty =  Ext.util.Format.number(grnqty, "0.000");
                        millgrnqty =  Ext.util.Format.number(millgrnqty, "0.000");

                        debitvalue =  Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_debitamount'));

                        grnvalue = Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate'))* Number(grnqty)


                        grnvalue = Math.round(grnvalue * 100) / 100;
                        grnvalue =  Ext.util.Format.number(grnvalue, "0.00");
                        
                        lotcode = loadgrneddtdatastore.getAt(i).get('rect_lotno')

       


                        var remarks ='';
                        if (Number(moisqtyded) > 0)
                           remarks = "Qty " + moisqtyded + " Deducted due to Ex-Mois % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_diff');

                        if (Number(finesqtyded) > 0)
                           remarks = remarks +  " Qty " + finesqtyded + " Deducted due to Ex-Fines % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_diff');

                        if (Number(sandqtyded) > 0)
                           remarks = remarks +  " Qty " + sandqtyded + " Deducted due to Ex-Sand % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_diff');

                        var degval = 0;
                        if ( Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate')) >0 && Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty')) > 0) 
                            degval =  Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate')) * Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty'))/1000;



			flxDetail.getStore().insert(
			flxDetail.getStore().getCount(),
			new dgrecord({
				slno:i + 1,
				itemcode  : loadgrneddtdatastore.getAt(i).get('rect_item_code'),
            			itemname  : loadgrneddtdatastore.getAt(i).get('itmh_name'),
			    	billqty   : loadgrneddtdatastore.getAt(i).get('rect_billqty'),
				millqty   : loadgrneddtdatastore.getAt(i).get('rect_millqty'),

				fixedMois : loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_fixed'),
				actualMois: loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_actual'),
				ExMoisper : loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_diff'),
				moisqty   : moisqtyded,

				fixedfines : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_fixed'),
				actualfines: loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_actual'),
				Exfines    : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_diff'),
				finesqty   : finesqtyded,

				fixedsand  : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_fixed'),
				actualsand : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_actual'),
				Exsand     : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_diff'),
				sandqty    : sandqtyded,
                                othdedqty  : otherdedqty,
				totdedqty  : dedqty,
                                dnvalue    : debitvalue, 
				partygrnqty: grnqty,
				millgrnqty : millgrnqty,
				itemrate: loadgrneddtdatastore.getAt(i).get('rect_itemrate'),
				itemvalue: grnvalue,
				remarks: remarks,

		
	
				costval: loadgrneddtdatastore.getAt(i).get('rect_costvalue'),
                        	costrate: loadgrneddtdatastore.getAt(i).get('rect_costrate'),

                                degitemname :  loadgrneddtdatastore.getAt(i).get('degrade_itemname'),
				degitem : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_item'),
                        	degrate : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate'),				
                        	degqty  : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty'),
                                degvalue : degval,
				}) 
				);   
 
                        }
  

			loadGSTDatastore.removeAll();
			loadGSTDatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadGST",
				    taxcode : loadgrneddtdatastore.getAt(0).get('rech_purgrp'),

				},
				callback : function() {
		                    var cnt = loadGSTDatastore.getCount();
		                    if (cnt > 0) {

//suptype = loadgrneddtdatastore.getAt(0).get('sup_type');

//alert(loadgrneddtdatastore.getAt(0).get('sup_type')); 
                                        if (suptype == 24)
                                        {  
					txtCGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_cgstper'));
					txtSGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_sgstper'));
					txtIGSTPer.setValue(0);
                                        }   

                                        else 
                                        {  
					txtCGSTPer.setValue(0);
					txtSGSTPer.setValue(0);
					txtIGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_igstper'));
                                        }   


				          cgstledcode = loadGSTDatastore.getAt(0).get('tax_cgstledcode');
				          sgstledcode = loadGSTDatastore.getAt(0).get('tax_sgstledcode');
				          igstledcode = loadGSTDatastore.getAt(0).get('tax_igstledcode');
				          cgstledger  = loadGSTDatastore.getAt(0).get('tax_cgstledger');
				          sgstledger  = loadGSTDatastore.getAt(0).get('tax_sgstledger');
				          igstledger  = loadGSTDatastore.getAt(0).get('tax_igstledger');
                                    }
                                }
			});

               


			loadordnodatastore.removeAll();
			loadordnodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadordno",
				    compcode : Gincompcode,
				    finid : GinFinid,
				    supcode : loadgrneddtdatastore.getAt(0).get('rech_sup_code'),
				    gstFlag : gstFlag
				},
				callback : function() {
                                        cmbOrderNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno')); 
                                }
			});


			edpono = loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
                 	txtOtherChrges.setValue(loadgrneddtdatastore.getAt(0).get('rech_othcharges'));



			txtCGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_cgst_per'));
			txtSGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_sgst_per'));
			txtIGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_igst_per'));
			
	
						
			txtIGSTValue.setDisabled(true);
			txtTCSPer.setRawValue(loadgrneddtdatastore.getAt(0).get('rech_tcs_per'));
			txtTCSValue.setDisabled(true);
			txtCessPerMT.setValue(loadgrneddtdatastore.getAt(0).get('rech_cess_pmt'));
                        txtCessValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_cess_amount'));


//	
			moistol =  loadgrneddtdatastore.getAt(0).get('ordh_mois_tol');
				txtHandlingPMT.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_pmt'));
				txtHandlingcgst.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_sgstper'));				
			edsuptype = loadgrneddtdatastore.getAt(0).get('sup_type');
			edacctflag = loadgrneddtdatastore.getAt(0).get('rech_acctflag');


				loaditempodatastore.removeAll();
				    loaditempodatastore.load({
					url: 'ClsFuGrn.php',
					params:
					{
					    task:"loaditempo",
					    ordcode: edpono
					}
				    });

	//		}//else

                        }  
//alert(edacctflag);



                      grid_tot();


			if(edacctflag == "Y"){
				Ext.getCmp('save').setDisabled(true);
//				Ext.getCmp('Confirm').setDisabled(true);
				Ext.Msg.alert('Fuel-GRN','Sorry!!! A/C Updatation has been done.\n U can view the data, Edit Option not Allowed');
				//Ext.getCmp('save').setDisabled(false);Ext.getCmp('Confirm').setDisabled(false);
			}
			else{
				Ext.getCmp('save').setDisabled(false);
			}

		}


	});
grid_tot();
	

    }


var cmbGRNNo = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        labelStyle	: "font-size:12px;font-weight:bold;",
       style      :"border-radius: 5px; ",
        width           : 100,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        hiddenName      : '',
        id              : 'cmbGRNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadgrnnodatastore,
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,        
        listeners:{
        select:function(){
             getGRNDetails();
        } 
        }
   });

/*
 var txtBillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtBillno',
        name        : 'txtBillno',
        width       :  100,

        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	

    });

*/
var txtBillno = new Ext.form.TextField({
        fieldLabel  : 'Party Bill No',
        id          : 'txtBillno',
        name        : 'txtBillno',
        width       :  150,
        
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px;  textTransform: uppercase ", 
	enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpBillDate.focus();
             }
           },
	     blur:function()
		{
                 grid_tot();   
		},


    }
});


var dtpBillDate = new Ext.form.DateField({
    fieldLabel : 'Party Bill Date',
    id         : 'dtpBillDate',
    name       : 'PBilldate',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
enableKeyEvents: true,   
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillValue.focus();
             }
          },
	     blur:function()
		{
                 grid_tot();   
		},
    }
       
});





 var txtLorryNo = new Ext.form.TextField({
        fieldLabel  : 'Lorry No',
        id          : 'txtLorryNo',
        name        : 'txtLorryNo',
        width       :  100,
	border : true,
       // style       :  {border-radius:5},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
 enableKeyEvents: true,   
	tabindex : 1,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTicketNo.focus();
             }
       },
    }
	
    });


 var txtFixedFinesPer = new Ext.form.NumberField({
        fieldLabel  : 'Fines % ',
        id          : 'txtFixedFinesPer',
        name        : 'txtFixedFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtActualFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualFinesPer',
        name        : 'txtActualFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtDiffFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffFinesPer',
        name        : 'txtDiffFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });


function find_item_value()
{
     var ivalue = 0;
     var ivalue2 = 0;


     ivalue = Number(txtGRNQty.getValue()) * Number(txtRate.getValue());

     txtItemValue.setRawValue(Ext.util.Format.number( ivalue,'0.00'));


}

var txtFinesQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFinesQty',
        name        : 'txtFinesQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtFinesQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtFinesQty.focus();
			txtFinesQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });



 var txtFixedSandPer = new Ext.form.NumberField({
        fieldLabel  : 'Sand % ',
        id          : 'txtFixedSandPer',
        name        : 'txtFixedSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtActualSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualSandPer',
        name        : 'txtActualSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtDiffSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSandPer',
        name        : 'txtDiffSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });



var txtSandQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSandQty',
        name        : 'txtSandQty',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtFinesQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtFinesQty.focus();
			txtFinesQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });

   var txtRemarksAcc = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarksAcc',
        width       : 700,
        height      : 40,

   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtRemarks',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
}
   });

   var txtRemarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        width       : 700,
        height      : 40,

   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtRemarks',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
}
   });


/*var cmbGIENo = new Ext.form.ComboBox({
        fieldLabel      : 'Gate Inward Entry No.',
        width           : 100,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbGIENo',
        typeAhead       : true,
        mode            : 'local',
        store           : [],
       // forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true
   });*/
var txtGENo = new Ext.form.TextField({
        fieldLabel  : 'Gate Entry No.',
        id          : 'txtGENo',
        name        : 'txtGENo',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpGEDate.focus();
             }
       },
    }
    });

var txtTicketNo = new Ext.form.NumberField({
        fieldLabel  : 'Ticket No.',
        id          : 'txtTicketNo',
        name        : 'txtTicketNo',
        width       :  100,
        allowBlank  :  false,
        readOnly    : true,
	tabindex : 1,
enableKeyEvents: true,  
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
           //       cmbitem.focus();
             }
       },
    }	
    });


var txtQCNo = new Ext.form.NumberField({
        fieldLabel  : 'QC Ent No.',
        id          : 'txtQCNo',
        name        : 'txtQCNo',
        width       :  100,
        allowBlank  :  false,
        readOnly    : true,
	tabindex : 1,
enableKeyEvents: true,  
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
           //       cmbitem.focus();
             }
       },
    }	
    });

var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 210,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAreadatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillno.focus();
             }
       },

	   select:function()
		{

			fareacode = cmbArea.getValue();
			txttonnage.setValue('0');
grid_tot();
if(fareacode > 0) {


}

	   	},
	   change:function()
	   	{

			if (frtype === "2" || frtype === "0" || frtype === "3"){
				
				if (Number(txttonnage.getValue()) > Number(txtload.getValue())){
					valoffreight = txtload.getValue();
					txtFreight.setValue(txtload.getValue());
				}
				else{
					valoffreight = txttonnage.getValue();
					txtFreight.setValue(txttonnage.getValue()); 
				}
			}
			else{
				txtFreight.setValue('0'); valoffreight = 0;
			}
	
	   	},
		
		

	}
   });





var txttransport = new Ext.form.TextField({
        fieldLabel  : 'Transport',
        id          : 'txttransport',
        name        : 'txttransport',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttonnage = new Ext.form.TextField({
        fieldLabel  : 'Tonnage Based',
        id          : 'txttonnage',
        name        : 'txttonnage',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
    });

var txtload = new Ext.form.TextField({
        fieldLabel  : 'Load Based',
        id          : 'txtload',
        name        : 'txtload',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
	tabindex : 1,
	listeners : {
		keyup : function(){
			if (frtype === "3" || frtype === "0" || frtype === "2"){
				
				if (Number(txttonnage.getValue()) > Number(txtload.getValue())){
					valoffreight = txtload.getValue();
					txtFreight.setValue(txtload.getValue());
				}
				else{
					valoffreight = txttonnage.getValue();
					txtFreight.setValue(txttonnage.getValue());
				}
			}
			else{
				txtFreight.setValue('0'); valoffreight = 0;
			}
		}
	}
    });



 var txtbillqty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtbillqty',
        name        : 'txtbillqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtMillQty.focus();
             }
       },
    }
    });




var txtMillQty = new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtMillQty',
        name        : 'txtMillQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFixedMoisPer.focus();
             }
       },

	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
}
    });

var txtOtherDedQty = new Ext.form.TextField({
        fieldLabel  : 'Oth.Ded.Qty',
        id          : 'txtOtherDedQty',
        name        : 'txtOtherDedQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function()
		{
			calculateItemvalue();
       	find_item_value();   
/*
			if (txtFixedMoisPer.getValue() < Number(moistureper + moistol))
			{
				txtMoisQty.setValue(0);
			}
			else
			{
			var totmois = 0;
			totmois = Number(moistureper) + Number(moistol);
				txtMoisQty.setValue(Ext.util.Format.number((txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()) * (txtFixedMoisPer.getValue() - totmois) / 100,"0.000"));
				
			}
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtFinesQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if (Number(txtOtherDedQty.getValue())>Number(txtMillQty.getValue()))
			{
			alert("Lifeless Qty Should Not be Greater than Mill Qty..");
			txtOtherDedQty.focus();
			txtOtherDedQty.setValue("0");
			}
			else
			{
			//txtGRNQty.setValue(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue());
txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue((txttareqty.getValue())+(txtOtherDedQty.getValue())+(txtFinesQty.getValue())+(txtdegradeqty.getValue()));
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));

			}
*/
		}
	    
}
    });

var txtFixedMoisPer = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtFixedMoisPer',
        name        : 'txtFixedMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });


var txtActualMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtActualMoisPer',
        name        : 'txtActualMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtDiffMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDiffMoisPer',
        name        : 'txtDiffMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtMoisQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMoisQty',
        name        : 'txtMoisQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFinesQty.focus();
             }
       },
}
    });
/*
var txtdegradeqty = new Ext.form.TextField({
        fieldLabel  : 'Degrade Qty',
        id          : 'txtdegradeqty',
        name        : 'txtdegradeqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:14px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	

	listeners:{
	keyup:function()
		{
		
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtFinesQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((txtdegradeqty.getValue())>(txtMillQty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue()  ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtRate.getValue()  ),'0.000'));

			//txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
		}
	    
}
    });
*/
var txtTotDedQty = new Ext.form.TextField({
        fieldLabel  : 'Tot.Ded.Qty',
        id          : 'txtTotDedQty',
        name        : 'txtTotDedQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtDNValue = new Ext.form.NumberField({
        fieldLabel  : 'DNOTE VALUE',
        id          : 'txtDNValue',
        name        : 'txtDNValue',
        width       :  110,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


  var txtMillGRNWt = new Ext.form.TextField({
        fieldLabel  : 'Final GRN Qty',
        id          : 'txtMillGRNWt',
        name        : 'txtMillGRNWt',
        width       :  80,
	readOnly : true,
    	labelStyle : "font-size:12px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

var txtGRNQty = new Ext.form.TextField({
        fieldLabel  : 'Party GRN Qty',
        id          : 'txtGRNQty',
        name        : 'txtGRNQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	

 enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
        }      	
    });

var txtRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
 enableKeyEvents: true,   
	listeners:{


	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
},


    });



var txtItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtItemValue',
        name        : 'txtItemValue',
        width       :  80,
//        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


var txtTotGRNQty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txtTotGRNQty',
        name        : 'txtTotGRNQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtTotGRNValue= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotGRNValue',
        name        : 'txtTotGRNValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });
var txtTotGRNQtybill= new Ext.form.TextField({
        fieldLabel  : 'Party Qty',
        id          : 'txtTotGRNQtybill',
        name        : 'txtTotGRNQtybill',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttotBillValue= new Ext.form.NumberField({
        fieldLabel  : 'Party Bill Value',
        id          : 'txttotBillValue',
        name        : 'txttotBillValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	

    });
var txtGRNValue= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txtGRNValue',
        name        : 'txtGRNValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Round Off',
        id          : 'txtroundoff',
        name        : 'txtroundoff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	value	    :  0,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
        enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
		 findLandingCost(); 	
		},
	    change:function()
		{
                 findLandingCost(); 
           	},
	    keyup:function()
		{
                 findLandingCost(); 
           	},  
        } 


    });

var txtLandingCost = new Ext.form.NumberField({
        fieldLabel  : 'Landing Cost',
        id          : 'txtLandingCost',
        name        : 'txtLandingCost',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtOtherChrges = new Ext.form.NumberField({
        fieldLabel  : 'Other Charges',
        id          : 'txtOtherChrges',
        name        : 'txtOtherChrges',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
       	enableKeyEvents: true, 
    style      :"border-radius: 5px; ",	
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });


var txtFreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtFreight',
        name        : 'txtFreight',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });


var txtFrtMT= new Ext.form.NumberField({
        fieldLabel  : 'Freight/MT',
        id          : 'txtFrtMT',
        name        : 'txtFrtMT',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });

var txtFrtValue = new Ext.form.NumberField({
        fieldLabel  : 'Freight AMOUNT',
        id          : 'txtFrtValue',
        name        : 'txtFrtValue',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });

var txtHandlingcgstval = new Ext.form.TextField({
    fieldLabel  : 'H.SGST.Value',
    id          : 'txtHandlingcgstval',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
       	enableKeyEvents: true, 
    listeners:{
       change: function(){
	
               
         }
    }
});

var txtHandlingsgstval = new Ext.form.TextField({
    fieldLabel  : 'H.CGST.Value',
    id          : 'txtHandlingsgstval',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
   
    listeners:{
       change: function(){
	
         }
    }
});    

var txtBillValue = new Ext.form.NumberField({
        fieldLabel  : 'Bill Value',
        id          : 'txtBillValue',
        name        : 'txtBillValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	//readOnly : true
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCrdays.focus();
             }
       },
 
	keyup:function(){
//		grid_tot();
	}
	}

    });

var txtCrdays = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtCrdays',
        name        : 'txtCrdays',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	//readOnly : true
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGENo.focus();
             }
       },
 
	keyup:function(){
//		grid_tot();
	}
	}

    });




var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtCGSTPer',
        name        : 'txtCGSTPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtCGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'CGST Value',
        id          : 'txtCGSTValue',
        name        : 'txtCGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtSGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtSGSTPer',
        name        : 'txtSGSTPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtSGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'SGST Value',
        id          : 'txtSGSTValue',
        name        : 'txtSGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtIGSTPer',
        name        : 'txtIGSTPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtIGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'IGST Value',
        id          : 'txtIGSTValue',
        name        : 'txtIGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });




     var txtCGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtCGSTPM',
        width       : 75,
        maxvalue    : 2.00,
        name        : 'txtCGSTPM',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        decimalPrecision: 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        listeners:{
          change:function(){
        
              if (Number(txttotcgst.getValue()) > 0 )        
              {
               txtSGSTPM.setValue(txtCGSTPM.getValue());
              }
              else
              {

                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);        
              }           
              if (Number(txtCGSTPM.getValue()) > 2)
              {   
                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);
              } 
              grid_tot();
          },
          keyup:function(){
              if (Number(txtCGSTPM.getValue()) > 2)
              {   
                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);
              } 
          grid_tot();
         }
        } 
   }); 

     var txtSGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtSGSTPM',
        width       : 75,
        name        : 'txtSGSTPM',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              grid_tot();
          },
          keyup:function(){
           grid_tot();
         }
        } 
   }); 
     var txtIGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtIGSTPM',
        width       : 75,
        name        : 'txtIGSTPM',
         decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              grid_tot();
          },
          keyup:function(){
          grid_tot();
         }
        } 
   }); 


var txtTCSPer = new Ext.form.TextField({
        fieldLabel  : 'TCS%',
        id          : 'txtTCSPer',
        name        : 'txtTCSPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    	enableKeyEvents: true, 
	listeners:{
 
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
       }

    });

var txtTCSValue = new Ext.form.NumberField({
        fieldLabel  : 'TCS Value',
        id          : 'txtTCSValue',
        name        : 'txtTCSValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });
var txtCessPerMT = new Ext.form.NumberField({
        fieldLabel  : 'Cess / MT ',
        id          : 'txtCessPerMT',
        name        : 'txtCessPerMT',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    	enableKeyEvents: true, 
	listeners:{
 
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
       }
    });

var txtCessValue = new Ext.form.NumberField({
        fieldLabel  : 'Cess Amount',
        id          : 'txtCessValue',
        name        : 'txtCessValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


var txtHandlingPMT = new Ext.form.NumberField({
        fieldLabel  : 'Handling	 /MT',
        id          : ' txtHandlingPMT',
        name        : ' txtHandlingPMT',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	disabled:true,
//	readOnly : true,
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function(){
		grid_tot();
	}
	}	
    }); 


    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 100,
        name: 'txtTotDebit',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 100,
        name: 'txtTotCredit',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

    });


    
var txtHandCharges = new Ext.form.NumberField({
        fieldLabel  : 'Amount',
        id          : 'txtHandCharges',
        name        : 'txtHandCharges',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	value	    :  0,
	tabindex : 1,
//	disabled:true,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });    

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:195,
    height: 100,
    hidden:false,
    width: 1080,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},//1
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'right'},//3
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'right'},//4
	{header: "Party GRN Qty",  dataIndex:'partygrnqty',sortable:true,width:120,align:'right'}, //12
 	{header: "Item Rate",dataIndex:'itemrate',sortable:true,width:100,align:'center'}, //13
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},//15

 	{header: "Mois%(F)", dataIndex: 'fixedMois',sortable:true,width:90,align:'right'},//4
 	{header: "Mois%(A)", dataIndex: 'actualMois',sortable:true,width:90,align:'right'},//4
	{header: "Ex.Mois%", dataIndex:'ExMoisper',sortable:true,width:90,align:'right'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'right'}, //6
	{header: "Fines%(F)", dataIndex:'fixedfines',sortable:true,width:90,align:'right'}, //5
        {header: "Fines%(A)", dataIndex: 'actualfines',sortable:true,width:90,align:'right'},//9
        {header: "Ex.Fines%", dataIndex: 'Exfines',sortable:true,width:90,align:'right'},//9
        {header: "Fines Qty", dataIndex: 'finesqty',sortable:true,width:90,align:'right'},//7
  
	{header: "Sand%(F)", dataIndex:'fixedsand',sortable:true,width:90,align:'right'}, //5
        {header: "Sand%(A)", dataIndex: 'actualsand',sortable:true,width:90,align:'right'},//9
        {header: "Ex.Sand%", dataIndex: 'Exsand',sortable:true,width:90,align:'right'},//9
        {header: "Sand Qty", dataIndex: 'sandqty',sortable:true,width:90,align:'right'},//7
        {header: "Oth Ded",  dataIndex: 'othdedqty',sortable:true,width:90,align:'right'},//11
        {header: "Tot Ded",  dataIndex: 'totdedqty',sortable:true,width:90,align:'right'},//11
        {header: "DNOTE Amount",  dataIndex: 'dnvalue',sortable:true,width:120,align:'right'},//11

	{header: "Final GRN Qty",  dataIndex:'millgrnqty',sortable:true,width:120,align:'right'}, //12

        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:130,align:'left'},//17
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'right'},//,hidden:true},//31
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'right'},//,hidden:true},//32
		{dataIndex:'cgstpm', header: "CGST PM",width: 60,align: 'center',sortable: true},
		{dataIndex:'sgstpm', header: "SGST PM",width: 60,align: 'center',sortable: true},
		{dataIndex:'igstpm', header: "IGST PM",width: 60,align: 'center',sortable: true},  
		{dataIndex:'degitemname', header: "Deg.Itemname",width: 60,align: 'center',sortable: true},
		{dataIndex:'degitem', header: "Deg.Item",width: 60,align: 'center',sortable: true},
		{dataIndex:'degrate', header: "Deg.Rate",width: 60,align: 'center',sortable: true},
		{dataIndex:'degqty', header: "Deg.Qty",width: 60,align: 'center',sortable: true},  
		{dataIndex:'degvalue', header: "Deg.Value",width: 60,align: 'center',sortable: true},  
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES GRN',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,

		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('itemcode'));


			if ((selrow != null)){

				Ext.getCmp('cmbitem').setDisabled(true);

				gridedit = "true";
				editrow = selrow;

				cmbitem.setValue(selrow.get('itemcode'));
				cmbitem.setRawValue(selrow.get('itemname'));

				txtbillqty.setValue(selrow.get('billqty'));
				txtMillQty.setValue(selrow.get('millqty'));

				txtFixedMoisPer.setValue(selrow.get('fixedMois'));
                                txtActualMoisPer.setValue(selrow.get('actualMois'));
                                txtDiffMoisPer.setValue(selrow.get('ExMoisper'));
				txtMoisQty.setValue(selrow.get('moisqty'));

				txtFixedFinesPer.setValue(selrow.get('fixedfines'));
                                txtActualFinesPer.setValue(selrow.get('actualfines'));
                                txtDiffFinesPer.setValue(selrow.get('Exfines'));
				txtFinesQty.setValue(selrow.get('finesqty'));

				txtFixedSandPer.setValue(selrow.get('fixedsand'));
                                txtActualSandPer.setValue(selrow.get('actualsand'));
                                txtDiffSandPer.setValue(selrow.get('Exsand'));
				txtSandQty.setValue(selrow.get('sandqty'));


				txtOtherDedQty.setValue(selrow.get('othdedqty'));
	

                                txtTotDedQty.setRawValue(Ext.util.Format.number(selrow.get('totdedqty')), "0.000");
                                txtDNValue.setRawValue(Ext.util.Format.number(selrow.get('dnvalue')), "0.00");

		//		txtTotDedQty.setValue(selrow.get('totdedqty'));
				txtGRNQty.setValue(selrow.get('partygrnqty'));
				txtMillGRNWt.setValue(selrow.get('millgrnqty'));


				txtRate.setValue(selrow.get('itemrate'));
		
				txtItemValue.setRawValue(selrow.get('itemvalue'));
				txtRemarks.setValue(selrow.get('remarks'));

                                txtDegradeItem.setValue(selrow.get('degitemname'));
                                txtDegradeRate.setValue(selrow.get('degrate'));
                                txtDegradeQty.setValue(selrow.get('degqty'));
                                txtDegradeValue.setValue(selrow.get('degvalue'));

           /*
	
				//txtGRNQty.setValue(selrow.get('pregrnqty'));

		
		
				loaditemqtydatastore.removeAll();
				loaditemqtydatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditemqty",
				    itemcode : cmbitem.getValue(),
				    ordcode : edpono,
				    gstFlag : gstFlag
				},
				callback :function() {
					moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
				}
				});
*/
				
				flxDetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('itemcode'));
		var chkgen = (selrow.get('geno'));
		flxDetail.getStore().remove(selrow);
		flxDetail.getSelectionModel().selectAll();



                Refresh();
                grid_tot();


		}
		}

     });   
     
    }

   }
});



var dgrecord = Ext.data.Record.create([]);



function RefreshData(){
//    TrnGrnformpanel.getForm().reset();
    flxDetail.getStore().removeAll();

	txtFrtMT.setValue('');
	txtFrtValue.setValue('');
	txtTicketNo.setValue('');
	txtQCNo.setValue('');
	txtSupplierName.setValue('');
	txtBillno.setValue('');

	txtBillValue.setValue('');
	txtCrdays.setValue('');
	txtGENo.setValue('');
	txtLorryNo.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');

	txtActualMoisPer.setValue('');
	txtActualFinesPer.setValue('');
	txtActualSandPer.setValue('');

        cmbGRNNo.setValue('');
        cmbGRNNo.setRawValue('');
    InitialData();
};

function InitialData(){
	if (userid == 1) {
		Ext.getCmp('dtpGRNDate').setDisabled(false);
		Ext.getCmp('dtpGRNDate').setReadOnly(false);
	}
	gstFlag="Edit";
	Ext.getCmp('txtGRNNo').hide();
	Ext.getCmp('cmbGRNNo').show();

  cmbGRNNo.setRawValue('FU');
//Ext.getCmp('Confirm').setDisabled(true);			

	tabgrn.setActiveTab(0);
	loadgrnnodatastore.removeAll();
	loadgrnnodatastore.load({
		url:'ClsFuGrn.php',
		params:
		{
			task:"loadPendingGRNS",
			finid : GinFinid,
			compcode : Gincompcode,
			gstFlag : gstFlag
		},
		callback:function()
		{
			//cmbGRNNo.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
		}
	});

	VouNoDatastore.load({
		url: '/SHVPM/Accounts/clsAccounts.php',
		params:
		{
		task: "LoadLastVouNo",
		finyear  : GinFinid,
		compcode : Gincompcode,
		voutype  : 'PFU'
		},
		callback: function(){


		txtVouNo.setValue("PFU"+VouNoDatastore.getAt(0).get('con_value'));

		}
	});

};



var tabgrn = new Ext.TabPanel({
    	id          : 'GRN',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#FFFEF2"},
	activeTab   : 0,
	height      : 375,
	width       : 1260,	
	x           : 0,
	y           : 0,
        listeners: {
          'tabchange': function(tabPanel, tab) {
           grid_tot();
        }},

    items       : [
	{
            xtype: 'panel',
            title: 'Item Details',bodyStyle:{"background-color":"#FFFEF2"},
            layout: 'absolute',
            items: [
			{ xtype   : 'fieldset',
	                title   : 'Item Details',
		  	layout  : 'hbox',
        	        border  : true,
        	        height  : 330,
        	        width   : 1140,
			style:{ border:'1px solid red',color:' #581845 ' },
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 10,
        	        items:[

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 480,
		                    y           : -15,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblFixed]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 585,
		                    y           : -15,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblActual]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 690,
		                    y           : -15,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDiff2]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 770,
		                    y           : -15,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDedQty]
		                },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 430,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbitem]
                            	},

                        	
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtbillqty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtMillQty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 390,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtFixedMoisPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 500,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtActualMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 600,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtDiffMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 700,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtMoisQty]
                            	},      
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 390,
                                	y           : 35,
                                    	border      : false,
                                	items: [txtFixedFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 500,
                                	y           : 35,
                                    	border      : false,
                                	items: [txtActualFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 600,
                                	y           : 35,
                                    	border      : false,
                                	items: [txtDiffFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 700,
                                	y           : 35,
                                    	border      : false,
                                	items: [txtFinesQty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 390,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtFixedSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 500,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtActualSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 600,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtDiffSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 700,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtSandQty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 670,
                                	y           : 85,
                                    	border      : false,
                                	items: [txtOtherDedQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 670,
                                	y           : 115,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 430,
                                	y           : 115,
                                    	border      : false,
                                	items: [txtDNValue]
                            	},





				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 875,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtGRNQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 875,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtRate]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 875,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtItemValue]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 875,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtMillGRNWt]
                            	},

//annadurai

		{
			xtype       : 'fieldset',
			title       : 'Degrade Details',
			width       : 380,
			height      : 102,
			x           : 10,
			y           : 85,
			border      : true,
			layout      : 'absolute',
			items:[
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtDegradeItem]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 12,
                                    	border      : false,
                                	items: [txtDegradeQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 34,
                                    	border      : false,
                                	items: [txtDegradeRate]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 180,
                                	y           : 34,
                                    	border      : false,
                                	items: [txtDegradeValue]
                            },
                         ]
                   } ,   

	

btnSubmit,flxDetail,


	

			     ]	//item detail frame
                	},
            	]//1st tab
        },//panel1sttab
        			{ 
				xtype   : 'fieldset',
			        title   : 'Value Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

					{ 
	                                	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 0,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNQty]
                            		},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 400,
		                        	x           : 230,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNValue]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 450,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNQtybill]
		                    	},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 750,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txttotBillValue]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTValue]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 440,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTPM]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTValue]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 440,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTPM]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTValue]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 440,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTPM]
		                    	},
				{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 130,
		                            	border      : false,
						items: [txtCessPerMT]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 130,
		                            	border      : false,
						items: [txtCessValue]
		                        	
		                    	},

				{ 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 110,
	                        	width       : 320,
	                        	x           : 0,
	                        	y           : 160,
	                            	border      : false,
	                        	items: [txtHandlingPMT]
	                    	},
				{ 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 90,
	                        	width       : 320,
	                        	x           : 230,
	                        	y           : 160,
	                            	border      : false,
	                        	items: [txtHandCharges]
	                    	},                           	

				{ 

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtHandlingcgst]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 230,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtHandlingcgstval]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtHandlingsgst]
                            	},optRounding,

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 230,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtHandlingsgstval]
                            	},  

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSValue]
		                    	},


	
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 450,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtOtherChrges]
                            	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 160,
		                            	border      : false,
		                        	items: [txtFreight]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 190,
		                            	border      : false,
		                        	items: [txtroundoff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 220,
		                            	border      : false,
		                        	items: [txtGRNValue]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtLandingCost]
		                    	},

					{ 
					xtype   : 'fieldset',
					title   : 'Freight for Steam Coal',bodyStyle:{"background-color":"#FFFEF2"},
					border  : true,
					height  : 200,
					width   : 440,
					style:{ border:'1px solid red',color:' #581845 '},
					layout  : 'absolute',
					x       : 700,
					y       : 110,
					items:[
						{ 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 120,
				                	width       : 320,
				                	x           : 10,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtFrtMT]
				            	},
						{ 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 120,
				                	width       : 320,
				                	x           : 10,
				                	y           : 35,
				                    	border      : false,
				                	items: [txtFrtValue]
				            	},

                                        ]
                                        }    



				]//tax
			},   //tax

/*
       			{ 
				xtype   : 'fieldset',
			        title   : 'Party Difference Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 85,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 155,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 300,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 355,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 420,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCess]

                        },

		   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 495,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTCS]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty]

                        },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 10,
		         border      : false,
		         items:[txtPartyWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 10,
		         border      : false,
		         items:[txtPartyValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 10,
		         border      : false,
		         items:[txtPartySGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 10,
		         border      : false,
		         items:[txtPartyIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCess],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 10,
		         border      : false,
		         items:[txtPartyTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 35,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblGRN]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 35,
		         border      : false,
		         items:[txtGRNWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 35,
		         border      : false,
		         items:[txtgrnvalue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 35,
		         border      : false,
		         items:[txtGRNSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 35,
		         border      : false,
		         items:[txtGRNIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 35,
		         border      : false,
		         items:[txtGRNTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 60,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiff]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 60,
		         border      : false,
		         items:[txtDiffWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 60,
		         border      : false,
		         items:[txtDiffValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 60,
		         border      : false,
		         items:[txtDiffSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 60,
		         border      : false,
		         items:[txtDiffIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCess],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 60,
		         border      : false,
		         items:[txtDiffTCS],
		     },





		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 220,
                         labelWidth  : 70, 
		         x           : 0,
		         y           : 100,
		         border      : false,
		         items:[txtHandlingAmount],
		     	},


				{  xtype       : 'fieldset',
				 title       : '',
				 width       : 200,
		                 labelWidth  : 100, 
				 x           : 180,
				 y           : 100,
				 border      : false,
				 items:[txtHandlingcgstper],
			     	},


				{  xtype       : 'fieldset',
				 title       : '',
				 width       : 200,
		                 labelWidth  : 100, 
				 x           : 350,
				 y           : 100,
				 border      : false,
				 items:[txtHandlingsgstper],
			     	},
		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 180,
		         y           : 125,
		         border      : false,
		         items:[txtHandlingcgstamt],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 350,
		         y           : 125,
		         border      : false,
		         items:[txtHandlingsgstamt],
		     	},


                                ]
                         },  
*/
       			{ 
				xtype   : 'fieldset',
			        title   : 'Ledger Posting Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 40,
                                	y           : 0,
                                    	border      : false,
     //                           	items: [txtVouNo]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 400,
                                	y           : 0,
                                    	border      : false,
    //                            	items: [dtVouDate]
                            },


                    flxAccounts,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 100,
		        y: 230,
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
		        y: 230,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCredit]
		    }, 


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 65,
                                	width       : 1110,
                                	x           : 10,
                                	y           : 260,
                                    	border      : false,
         //                       	items: [txtRemarksAcc]
                            	},

                                ]
                         },       
],


});


   var TrnGrnformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Goods Recipt Note (Local)',
        header      : false,
        width       : 927,	
	bodyStyle   :{"background-color":"#ECE5B6"},
        height      : 690,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnGrnformpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #FFFEF2;",
            height: 40,
            style   :'background-color:#FFFEF2',
            fontSize:18,
            items: [

			{
				text: 'Edit',
				id :'Edit',
				style  : 'text-align:center;',
				tooltip: 'Modify Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
					click: function () {
						gstFlag = "Edit";
//edit
/*
						if (gstFlag === "Edit") {
						Ext.getCmp('Confirm').setDisabled(false);
						}
						else {
						Ext.getCmp('Confirm').setDisabled(true);
						}
*/						
						flxDetail.getStore().removeAll();
			


						loadgrnnodatastore.removeAll();
						loadgrnnodatastore.load({
							url:'ClsFuGrn.php',
							params:
							{
								task:"loadgrnno",
								finid : GinFinid,
								compcode : Gincompcode,
								gstFlag : gstFlag
							},
							callback:function()
							{
								//cmbGRNNo.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
                                                    cmbGRNNo.setRawValue('FU');

							}
						});
  cmbGRNNo.setRawValue('FU');

					}
				}
			},'-',


//view
                {
                    text: 'View',

                    style  : 'text-align:center;',
		    id	:  'view',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                printtype = "PDF";
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(cmbGRNNo.getRawValue());
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 

                           

                        }
                    }
                },'-',  


                {
//save
                    text: 'Save',
                    id : 'Save',
                    style  : 'text-align:center;',
		    id	:  'save',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                 	tabgrn.setActiveTab(1);
                 	tabgrn.setActiveTab(2);
                 	tabgrn.setActiveTab(0);
			var gstSave;
                        var remarks;

	                    gstSave="true";


        var dtgrn  = dtpGRNDate.getValue();
        var dtbill = dtpBillDate.getValue();
        var diffdays = dtgrn.getTime()-dtbill.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 




			    if( diffdays < 0  ){

             		       Ext.Msg.alert("Alert","GRN Date is Greater than Bill Date. Please check");
//				gstSave="false";
			    }


        	            if (txtSupplierName.getValue()==0 || txtSupplierName.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Supplier Name');
        	                gstSave="false";
        	            }
    	                   if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Area Name');
        	                gstSave="false";
        	            }
                    
    	                   if (txtBillno.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Bill Number is Empty. Please check');
        	                gstSave="false";
                                txtBillno.focus();
        	            }


			    if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Grid should not be empty');
        	                gstSave="false";
	                    } 


			    if (flxAccounts.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Check Value & Ledger Posting Details ');
        	                gstSave="false";
	                    } 


    	                   if (Number(txtGRNValue.getValue())== 0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Check Value Tab and Contiue');
        	                gstSave="false";
                                txtBillno.focus();
        	            }

                            if(Number(txtTotDebit.getRawValue())!=Number(txtTotCredit.getRawValue())){
                               gstSave="false";
                                Ext.MessageBox.alert("Fuel-GRN","The Transactions Debit and Credit Amount are not  Equal");
                            }

        	            if ( gstSave == "true")
				{
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
		                    var grnData = flxDetail.getStore().getRange();                                        
		                    var grnupdData = new Array();
		                    Ext.each(grnData, function (record) {
		                        grnupdData.push(record.data);
		                    });

		                   
		                    var accData = flxAccounts.getStore().getRange();                                        
		                    var accupdData = new Array();
		                    Ext.each(accData, function (record) {
		                       accupdData.push(record.data);
		                    });

		                        remarks = "Received ";    
					var Row= flxDetail.getStore().getCount();
					flxDetail.getSelectionModel().selectAll();
					totgieno='';
					var sel=flxDetail.getSelectionModel().getSelections();
					for(var i=0;i<Row;i++)
					{
						remarks = remarks + sel[i].data.itemname + "- Qty : " + sel[i].data.millgrnqty + " MT Rate : "  + sel[i].data.itemrate  + "/MT" ;
					}




                            Ext.Ajax.request({
                            url: 'TrnFuGRNSave.php',
                            params :
                             {

                             	griddet         : Ext.util.JSON.encode(grnupdData),                          
				cnt		: grnData.length,
                             	griddetacc      : Ext.util.JSON.encode(accupdData),                          
				cntacc		: accData.length,		
				gstFlaggrn	: gstFlag,
				compcode	: Gincompcode,
                                finid		: GinFinid,
				grnno		: cmbGRNNo.getRawValue(),
				edgrnno		: cmbGRNNo.getValue(),
                                seqno           : seqno,
                                crdays		: txtCrdays.getValue(),
				grndate		: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
				areacode	: cmbArea.getValue(),
				itemvalue 	: txtGRNValue.getValue(),
				sgstper		: txtSGSTPer.getValue(),
				sgstamt		: Ext.util.Format.number(txtSGSTValue.getValue(), "0.00"),
				cgstper 	: txtCGSTPer.getValue(),
				cgstamt 	: Ext.util.Format.number(txtCGSTValue.getValue(), "0.00"),
				igstper 	: txtIGSTPer.getValue(),
				igstamt 	: Ext.util.Format.number(txtIGSTValue.getValue(), "0.00"),
                         	handlingmt	: txtHandlingPMT.getValue(),
				handlingcgst	: txtHandlingcgst.getValue(),
                                handlingsgst	: txtHandlingsgst.getValue(), 
				handlingcgstamt	: txtHandlingcgstval.getValue(),
                                handlingsgstamt	: txtHandlingsgstval.getValue(), 	
		
				tcsper 		: txtTCSPer.getValue(),
				tcsamt		: Ext.util.Format.number(txtTCSValue.getValue(), "0.00"),

				cessmt		: txtCessPerMT.getValue(),
				cessamt 	: Ext.util.Format.number(txtCessValue.getValue(), "0.00"),
			
				freight		: Ext.util.Format.number(txtFreight.getValue(), "0"),
				othrchrg	: Ext.util.Format.number(txtOtherChrges.getValue(),"0.00"),
                                roundoff	: txtroundoff.getValue(),
				totamt		: Ext.util.Format.number(txtGRNValue.getValue(), "0.00"),
				billno		: txtBillno.getRawValue(),
				billdate	: Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
				billval		: txtBillValue.getValue(),	
				usrcode		: userid,
                                roundneed       : roundoff,
                                lotcode         : lotcode,
                                remarks         : remarks,
                                remarksacc      : txtRemarks.getRawValue(),

	                  	vouno   	: txtVouNo.getValue(),
				voudate		: Ext.util.Format.date(dtVouDate.getValue(),"Y-m-d"),
                              	qcentno         : txtQCNo.getValue(),

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("GRN Saved GRN No.-" + obj['GRNNo']);
                  //                  TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();

                                    RefreshData();
                                  }else
				  {
                     	Ext.MessageBox.alert("GRN Not Saved! Pls Check!");                                                  
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
/*
                {
			text: 'Confirm',
			id : 'Confirm',
			style  : 'text-align:center;',
			tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
			icon: '/Pictures/refresh.png',
			listeners:{
			click: function () {
			gstFlag = "Confirm";
			Ext.Msg.show({
			title: 'Confirmation',
			icon: Ext.Msg.QUESTION,
			buttons: Ext.MessageBox.YESNO,
			msg: 'Do You Want To Receipt Updation...',
			fn: function(btn)
			{
			if (btn === 'yes'){ 
			
			loadaccupdhstore.removeAll();
			loadaccupdhstore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadreceipth",
				    edgrnno	: cmbGRNNo.getValue()
				},
				callback : function() {
				
				
				receiptdt = loadaccupdhstore.getAt(0).get('rech_date');
				supledcode = loadaccupdhstore.getAt(0).get('sup_led_code');
				
				billdt = loadaccupdhstore.getAt(0).get('rech_billdate');
				billvalueh = loadaccupdhstore.getAt(0).get('rech_billvalue');
				tcsamth = loadaccupdhstore.getAt(0).get('rech_tcs_amt');
				cessmth = loadaccupdhstore.getAt(0).get('rech_cess_pmt');
				handlingmt = loadaccupdhstore.getAt(0).get('rech_handling_mt');
				cgstph = loadaccupdhstore.getAt(0).get('rech_cgst_per');
				sgstph = loadaccupdhstore.getAt(0).get('rech_sgst_per');
				igstph = loadaccupdhstore.getAt(0).get('rech_igst_per');
				chkgrnh = loadaccupdhstore.getAt(0).get('rech_no');
				frtsupledcode = loadaccupdhstore.getAt(0).get('frt_sup_led_code');
				handlingledcode = loadaccupdhstore.getAt(0).get('handling_led_code');
				
				
				loadaccupdtstore.removeAll();
				loadaccupdtstore.load({
					url: 'ClsFuGrn.php',
					params:
					{
					task:"loadreceiptt",
					edgrnno	: cmbGRNNo.getValue()
					},
					callback : function() {
					
					for(j=0;j<loadaccupdtstore.getCount();j++){
						
						chkdel = j;
						billnoh = loadaccupdtstore.getAt(j).get('rect_billno');
						chklotno = loadaccupdtstore.getAt(j).get('rect_lotno');
						itemval2 = loadaccupdtstore.getAt(j).get('rect_itemvalue2');
						billqtyt = loadaccupdtstore.getAt(j).get('rect_billqty');
						lorrynot = loadaccupdtstore.getAt(j).get('rect_lorryno');
						grnqtyt = loadaccupdtstore.getAt(j).get('rect_grnqty');
						frtval = loadaccupdtstore.getAt(j).get('rect_freightvalue');
						unloadexpt = loadaccupdtstore.getAt(j).get('rect_unloadamount');
						unloadledcode = loadaccupdtstore.getAt(j).get('rect_unloadparty');
						
		                    Ext.Ajax.request({
		                    url: 'TrnFuGRNSave.php',
		                    params :
		                     {
					gstFlaggrn	: gstFlag,
					chkdel		: chkdel,
					compcode	: Gincompcode,
		                       finid		: GinFinid,
					edgrnno  	: cmbGRNNo.getValue(),
					receiptdt	: receiptdt,
					supledcode	: supledcode,
					billnoh	: billnoh,
					billdt		: billdt,
					billvalueh	: billvalueh,
					tcsamth	: tcsamth,
					cessmth	: cessmth,
					handlingmt	: handlingmt,
					cgstph		: cgstph,
					sgstph		: sgstph,
					igstph		: igstph,
					chkgrnh	: chkgrnh,
					frtsupledcode	: frtsupledcode,
					handlingledcode : handlingledcode,
					chklotno	: chklotno,
					itemval2	: itemval2,
					billqtyt	: billqtyt,
					lorrynot	: lorrynot,
					grnqtyt	: grnqtyt,
					frtval		: frtval,
					unloadledcode	: unloadledcode, 
					unloadexpt	: unloadexpt,				


					},
		                      callback: function(options, success, response)
		                      {
		                        var obj = Ext.decode(response.responseText);
		                         if (obj['success']==="true")
						{                                
		                            Ext.MessageBox.alert("GRN Account Updtion Done -" + obj['GRNNo']);
		                            TrnGrnformpanel.getForm().reset();
		                            flxDetail.getStore().removeAll();
			
		                            RefreshData();
		                          }else
					  {
				Ext.MessageBox.alert("GRN Account Updtion Not Saved! Pls Check!- " + obj['GRNNo']);                                                  
		                            }
		                        }
		                   });  						
						
					}
					}

				});
				
				
				}
			});					
					
					
					
					
    
					}
					else {
					}

				}
				});               

			}
			}
                },'-',   
*/                           
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
			InitialData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    
                    handler: function(){ 
                            TrnGrnWindow.hide();
                        }
                        
                }]
        },
        items: [


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1285,
			height      : 130,
			x           : 10,
			y           : 0,
			border      : true,
			layout      : 'absolute',
			items:[
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGRNNo]
                            },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbGRNNo]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpGRNDate]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 700,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtTicketNo]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 700,
                                	x           : 0,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtQCNo]
                            	},


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 630,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtSupplierName]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 280,
                                	x           : 200,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbOrderNo]
                            },


					{ 
				        	xtype       : 'fieldset',
				        	labelWidth  : 100,
				        	width       : 350,
				        	x           : 200,
				        	y           : 60,
				            	border      : false,
				        	items: [cmbArea]
				    	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 350,
                                	x           : 600,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtBillno]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 600,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpBillDate]
                            	},
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 600,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtBillValue]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 600,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtCrdays]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 280,
                                	x           : 875,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGENo]
                            	},

               			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 875,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpGEDate]
                            	},

	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 700,
                                	x           : 875,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtLorryNo]
                            	},
			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 875,
                            y           : 75,
                            border      : false,
                            items: [cmbPurchaseLedger]
                        },


                        ]
                },


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1285,
			height      : 390,
			x           : 10,
			y           : 135,
			border      : true,
			layout      : 'absolute',
			items:[tabgrn] 
		}]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      :  600,
        width       : 1320,
 //       x	     : 20,
        y           : 35,
        title       : 'Goods Recipt Note (Fuel)',
        items       : TrnGrnformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFEF2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			InitialData();

	   			 }
			
		}
    });
    TrnGrnWindow.show();  
});
