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
   var gstFlag = "Add";
   var gstStatus = "N";
   var itemgrpcode = 0;
   var gridedit = "false";
   var FrePaidby = 0;

   var supcode = 0;
var degrchk = "true"; var editrow = 0; var cessmtval = 0; var dedqty; var lifelessqty; var moistureper; var frttype; var stper = 0;
var scper = 0; var stamt = 0; var scamt = 0; var gridfreqty = 0; var fareacode = 0; var freitem; var freqty; var tonfre = 0; //var gstGroup;
var supplierid = 77; var Validatechk = "true"; 

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var totgrnvalue,cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_billval, pdb_totedval, totgrnqty, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;

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
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'sup_code', 'sup_name','sup_state'
 

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
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });
/*
 var loadthirdpdatastore = new Ext.data.Store({
      id: 'loadthirdpdatastore',
	autoLoad : true,
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
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });
*/

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
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_servicecharge', 'rech_handling_cgstper', 'rech_handling_sgstper', 'rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_royality', 'rech_royality_amt', 'rech_dmft', 'rech_dmft_amt', 'rech_nmet', 'rech_nmet_amt', 'rech_acc_seqno',  'sup_type', 'sup_name', 'frt_sup_name', 'handling_sup_name', 'sup_code', 'frt_sup_code', 'sup_led_code', 'sup_taxcode', 'frt_sup_led_code', 'tax_ledcode', 'handling_led_code'
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
	'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount', 'rect_unloadparty', 'rect_lorry_wheels',  'itmh_name', 'lot_refno', 'rect_sandper', 'rect_sandqty', 'rect_finesper', 'rect_finesqty',
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
      },['ordh_seqno','ordh_compcode','ordh_fincode','ordh_no','ordh_from','ordh_sup_code','ordh_date','ordh_terms','ordh_carriagetype',
'ordh_paymode','ordh_creditdays','ordh_overdueintper','ordh_payterms','ordh_remarks','ordh_frttype','ordh_frtparty_code','ordh_stper',
'ordh_scper','ordh_cgstper','ordh_sgstper','ordh_igstper','ordh_handling_mt','ordh_handling_cgstper','ordh_handling_sgstper','ordh_itemvalue','ordh_roundinff','ordh_totalvalue',
'ordh_status','ordh_amndstatus','ordh_amndposeqno','ordh_usr_code','ordh_entry_date','ordh_wef_date','ordh_custduty_mt','ordh_handling_mt',
'ordh_handling_party','ordh_gcv','ordh_gcv_tol','ordh_mois','ordh_mois_tol','ordh_inh_mois','ordh_inh_mois_tol','ordh_ash','ordh_ash_tol',
'ordh_sulpher','ordh_size','ordh_hgi','ordh_tcs','ordh_vol_meter','ordh_cess_pmt','ordh_royality','ordh_dmft','ordh_nmet','cancelflag','sup_type',
'ordt_unit_rate'

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
  },['sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'tax_code', 'tax_name', 'tax_sales', 'tax_surcharge', 'tax_paidby', 'tax_type', 'tax_ledcode', 'tax_cgst_per', 'tax_sgst_per', 'tax_igst_per', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode'
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
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
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
            baseParams:{task:"loadgrneddt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_handling_pmt', 'rech_handling_cgstper','rech_handling_sgstper','rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'sup_type', 'ordh_no','ordh_mois_tol','rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_geno', 'rech_gedate', 'rech_wtslipno', 'rech_truckno','rech_crdays','rech_roundneeded','rech_qcseqno','rech_ticketno'

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
      },['party_item', 'grn_item', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno','rect_gedate', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount','rect_unloadparty', 'rect_lorry_wheels','itmh_ledcode', 'act_rect_qty','rect_wtcardno','rect_othdedqty','itmh_name','lot_refno','rect_billvalue','rect_purgrp','rect_gcv','led_name'

      ]),
    });
var loaditempodatastore = new Ext.data.Store({
      id: 'loaditempodatastore',
      autoLoad : true,
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
autoLoad: true,
  
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
	var txtgrnno = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtgrnno',
        name        : 'txtgrnno',
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
                  dtpgrndate.focus();
             }
       },
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
  },['led_code','led_name'
  ])
})


var cmbPurGroup = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Group',
    width           : 200,
    displayField    : 'led_name',
    valueField      : 'led_code',
    hiddenName      : 'led_name',
    id              : 'cmbPurGroup',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
enableKeyEvents: true, 
  listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillQty.focus();
             }
       },
}
});


function calcost(){



}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function Refresh(){

   rounding = 0;
/*
	txtBillQty.setValue('');
	txtMillQty.setValue('');
	txtMoisPer.setValue('');
	txtMoisQty.setValue('');


	txtSandQty.setValue('');
	txtdegradeqty.setValue('');
	txtTotDedQty.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');
	cmblot.reset();	

        txtSandPer.setValue('');
        txtRate.setValue('');
        txtRemarks.setRawValue('');
        txtGCV.setRawValue('');
        txtitemval.setValue('');
*/
  }

function find_item_value()
{
     var ivalue = 0

     ivalue = Number(txtGRNQty.getValue()) * Number(txtRate.getValue());
     txtitemval.setRawValue(Ext.util.Format.number( ivalue,'0.00'));
     txttotitemqty.setValue(Ext.util.Format.number(txtGRNQty.getValue(),"0.000"));
     txttotitemval.setValue(Ext.util.Format.number(ivalue,"0.00"));
     txttotitemval.setRawValue(Ext.util.Format.number(ivalue,"0.00"));


     findLandingCost();


}


function findLandingCost()
{
	var tcs_calc =0;
        var amt_cgst = 0;
        var amt_sgst = 0;
        var amt_igst = 0;
        var totgrnqty =  Number(txtGRNQty.getValue());

 	txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));


	tcs_calc = Number(txtitemval.getValue()) + txtcgstval.getValue() + txtsgstval.getValue() + txtigstval.getValue();


       amt_cgst = (txttotitemval.getValue() * txtcgstper.getValue()) / 100;
       amt_cgst = Math.round(amt_cgst * 100) / 100;
       amt_sgst = (txttotitemval.getValue() * txtsgstper.getValue()) / 100;
       amt_sgst = Math.round(amt_sgst * 100) / 100;
       amt_igst = (txttotitemval.getValue() * txtigstper.getValue()) / 100;
       amt_igst = Math.round(amt_igst * 100) / 100;

             txtcgstval.setValue(Ext.util.Format.number(amt_cgst, "0.00"));
    	     txtsgstval.setValue(Ext.util.Format.number(amt_sgst, "0.00"));
    	     txtigstval.setValue(Ext.util.Format.number(amt_igst, "0.00"));


            handlingval1 = totgrnqty * txtHandlingPMT.getValue();
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100), "0.00" ));
            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtcessval.setRawValue(Ext.util.Format.number(Ext.util.Format.number(txtBillQty.getValue(),"0.000") * txtcessper.getValue(),"0"));
		





	pdb_grn_value = Number(txttotitemval.getValue())  + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+Number(handlingval1)  + Number(txtcessval.getValue()) +Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) +Number(txttcsval.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());

      pdb_landingcost = Number(txttotitemval.getValue())   +Number(handlingval1)  + Number(txtcessval.getValue()) + Number(txttcsval.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());

       txtroundoff.setValue(0);
        totgrnvalue = pdb_grn_value
        if (roundoff == "Y")     
        {         

           pdb_grn_value =  pdb_grn_value.toFixed(0) ;
           pdb_landingcost =  pdb_landingcost.toFixed(0) ;
           txtroundoff.setValue(Ext.util.Format.number(pdb_grn_value-totgrnvalue,"0.00"));
        }

  


	txtLandingCost.setRawValue(Ext.util.Format.number((pdb_landingcost), "0.00"));
	txttotgrnval.setRawValue(Ext.util.Format.number((pdb_grn_value), "0.00"));

calcost(); 

}




var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 160,
    height:80,
    defaultType : 'textfield',
    x:540,
    y:40,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
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
                findLandingCost();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});




/*
function old_tot(){
			totgrnqty=0;
			totgrnvalue=0;
			cgstval = 0;
			sgstval = 0;
			grnrate = 0;
			totbillqty = 0;
			totbillvalue = 0;
			cessmtval = 0;
			totgrdothrchrg = 0;
			totcbill = 0;
			//totgieno = 0;
			//totgrndrqty=0;
			//totgrndrvalue=0;
			//grndrrate=0;

        		var Row= flxDetail.getStore().getCount();
        		flxDetail.getSelectionModel().selectAll();
			

        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    totgrnqty=(totgrnqty)+(sel[i].data.grnqty);
				    totgrnvalue=Number(totgrnvalue)+Number(sel[i].data.itemvalue);
				    grnrate=Number(grnrate)+Number(sel[i].data.itemrate);
				    totbillqty=(totbillqty)+(sel[i].data.millqty);
				    totcbill=(totcbill)+(sel[i].data.billqty);
				    totbillvalue=Number(totbillvalue)+Number(sel[i].data.billvalue);
				    cessmtval = (cessmtval)+(sel[i].data.billqty * txtcessper.getValue());
				    totgrdothrchrg = (totgrdothrchrg)+(sel[i].data.othrchrg);
				    
        			}
				    txttotitemqty.setValue(Ext.util.Format.number(totgrnqty,"0.000"));
				    txttotitemval.setValue(totgrnvalue);
				    txtcgstval.setValue(Number(totgrnvalue)*txtcgstper.getValue()/100);
				    txtsgstval.setValue(Number(totgrnvalue)*txtsgstper.getValue()/100);
				    txtigstval.setValue(Ext.util.Format.number((Number(totgrnvalue)*txtigstper.getValue()/100),"0"));

txttotitemqtybill.setValue(Ext.util.Format.number(totbillqty,"0.000"));
txttotBillValue.setValue(totbillvalue);
cessmtval = Ext.util.Format.number(totcbill,"0.000") * txtcessper.getValue();
txtcessval.setValue(Ext.util.Format.number(totcbill,"0.000") * txtcessper.getValue());
txttotgrnval.setValue(totgrnvalue + totgrndrvalue + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue())  + Number(txtcessval.getValue()));




txtLandingCost.setValue(Ext.util.Format.number((Number(txttotBillValue.getValue()) + Number(totgrdothrchrg) + Number(cessmtval)),'0.00'));
//txtpartybillTotalValue.setRawValue(Number(txttotitemval.getValue())+Number(txtcgstval.getValue())+Number(txtsgstval.getValue()));
txtOtherChrges.setRawValue(Ext.util.Format.number(Number(totgrdothrchrg)),"0.000");

calcost();
}


*/


function calculateItemvalue(){



		if (txtMoisPer.getValue() < (Number(moistureper) + Number(moistol)))
		{
			txtMoisQty.setValue(0);
		}
		else
		{
		var totmois = 0;
		totmois = Number(moistureper) + Number(moistol);
			txtMoisQty.setValue(Ext.util.Format.number((txtMillQty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()) * (txtMoisPer.getValue() - totmois) / 100,"0.000"));
			
		}
	if(txtMoisQty.getValue() > 0 ){
		txtRemarks.setRawValue("Ex. Moisture " + Ext.util.Format.number((txtMoisPer.getValue() - totmois), "0.00") + "(%)" + " Qty : " + Ext.util.Format.number(txtMoisQty.getValue(), "0.000") + " MT Deducted" + " ,");

	}
	else{
		txtRemarks.setRawValue("Ex. Moisture NIL");
	}		
    
}

function CalculateTax()
{


}

function validatechkgrid()
{

	Validatechk="true";
	if (cmbItemName.getValue()==0 || cmbItemName.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Item Code');
		Validatechk="false";
	}
	else if (txtRate.getValue()==0 || txtRate.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Item Rate should not be empty');
		Validatechk="false";
	}
	else if (txtPartybillno.getValue()==0 || txtPartybillno.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Bill No to be Entered');
		Validatechk="false";
	}
	else if (txtTruckNo.getValue()==0 || txtTruckNo.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Lorry No to be Entered');
		Validatechk="false";
	}
//	else if (txtGCV.getRawValue()=="" )
	//{
//		Ext.Msg.alert('Fuel-GRN','Enter GCV');
//		Validatechk="false";
//	}
	else if (txtGENo.getValue()==0 || txtGENo.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Select Gate Entry No');
		Validatechk="false";
	}
	else if (txtBillQty.getValue()==0 || txtBillQty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtBillQty.focus();
	}
	else if (Number(txtBillQty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (txtMillQty.getValue()==0 || txtMillQty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Mill Qty Should be Greater than Zero');
		Validatechk="false";
	}
	else if (Number(txtMillQty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('Fuel-GRN','Mill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (Number(txtMoisPer.getValue()) >  100)
	{
		Ext.Msg.alert('Fuel-GRN','Moisture % Should not be Greater than 100%');
		Validatechk="false";
	}
	else if (cmblot.getValue()==0 || cmblot.getRawValue()=="" || cmblot.getRawValue() < 0 )
	{
		Ext.Msg.alert('Fuel-GRN','Lot No Should be Selected ');
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
       Keyup: function(){

         }
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
       keyup: function(){

         }
    }
});

var loadQCFuelEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCFuelEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCFuelEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_ticketwt', 'qc_fuel_itemcode', 
 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mios_arb_rate', 'qc_fuel_mois_arb_value', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_mois_adb_rate', 'qc_fuel_mois_adb_value', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_ash_rate', 'qc_fuel_ash_value', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_volatile_rate', 'qc_fuel_volatile_value', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fixedcarbon_rate', 'qc_fuel_fixedcarbon_value', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_iron_rate', 'qc_fuel_iron_value', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_adb_rate', 'qc_fuel_gcv_adb_value', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_gcv_arb_rate', 'qc_fuel_gcv_arb_value', 'itmh_name',  'sup_code', 'sup_name','sup_refname','qc_fuel_slno', 'wc_area_code','wc_unloadingtime','area_name','qc_fuel_area','qc_fuel_unloadingtime',
'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc',
'qc_fuel_acceptqty','qc_fuel_tot_ded_qty','qc_fuel_grn_status'

      ]),
    });


 var loadQCFuelEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entryno',
      ]),
    });



var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'QC Entry No.',
        width           : 120,
        displayField    : 'qc_fuel_entryno', 
        valueField      : 'qc_fuel_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadQCFuelEntryNoListDatastore,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){

                loadQCFuelEntryNoDetailDatastore.removeAll();
		loadQCFuelEntryNoDetailDatastore.load({
		 	url:'ClsQC.php',
			params:
	   		{
			task:"loadQCFuelEntryNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){
			
                        cmbArea.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_area'));


                        areacode = loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_area');

                        txtTruckNo.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_truck'));

                        txtTicketNo.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketno'));
                        cmbItemName.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_itemcode'));
       
			txtMillQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketwt')/1000,"0.000"));
			txtMoisPer.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff'),"0.00"));
			txtMoisQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_qty')/1000,"0.000"));

			txtSandPer.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff'),"0.00"));
			txtSandQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_qty')/1000,"0.000"));
			txtFinesPer.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff'),"0.00"));
			txtFinesQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty')/1000,"0.000"));

//			txtGCV.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty'));
			txtTotDedQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_tot_ded_qty')/1000,"0.000"));

			txtGRNQty.setRawValue(Ext.util.Format.number(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_acceptqty')/1000,"0.000"));

         
/*

('qc_fuel_mois_arb_diff')





			flxDetail.getSelectionModel().selectAll();
			var selrows = flxDetail.getSelectionModel().getCount();
			var sel = flxDetail.getSelectionModel().getSelections();


			for (var i = 0; i < selrows; i++) {

                        if (sel[i].data.parameter  == "TOTAL MOISTURE" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_moisture_ARB_qc'));

			}
                        if (sel[i].data.parameter  == "INHERENT MOISTURE" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_moisture_ADB_qc'));
			}
                        if (sel[i].data.parameter  == "ASH" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_ash_qc'));

			}
                        if (sel[i].data.parameter  == "VOLATILE MATTER" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_volatile_qc'));

			}
                        if (sel[i].data.parameter  == "FIXED CARBON" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_fixedcarbon_qc'));

			}
                        if (sel[i].data.parameter  == "FINES" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_fines_qc'));

			}
                        if (sel[i].data.parameter  == "SAND" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_sand_qc'));

			}
                        if (sel[i].data.parameter  == "IRON" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_iron_qc'));

			}
                        if (sel[i].data.parameter  == "GCV(KCAL/KG)" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_gcv_ADB_qc'));

			}
                        if (sel[i].data.parameter  == "GCV(KCAL /KG)" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_gcv_ARB_qc'));

			}
			}
	*/
                 }    
	        });			
      
	   }
        }      
   });


var dtpgrndate = new Ext.form.DateField({
    fieldLabel : 'GRN. Date',
    id         : 'dtpgrndate',
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
                  txtSupplier.focus();
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
                  txtTruckNo.focus();
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

var cmbItemName = new Ext.form.ComboBox({
        fieldLabel      : 'Item',
        width           : 290,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
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
                  cmbPurGroup.focus();
             }
       },
	select : function(){

		loaditemqtydatastore.removeAll();
		loaditemqtydatastore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loaditemqty",
		    itemcode : cmbItemName.getValue(),
		    ordcode : cmborder.getValue(),
		    gstFlag : gstFlag
		},
		scope : this,
		callback:function()
		{

                        cmbPurGroup.setValue(loaditemqtydatastore.getAt(0).get('ordt_purgrp'));
			loadfilldtstore.removeAll();
			loadfilldtstore.load({
			url : 'ClsFuGrn.php',
			params : 
			{
				task : "loadfilldt",
				qrycode: "GRN",
				grnno:  cmbgrnno.getValue(),
				itemcode: cmbItemName.getValue()
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
	//			txtpendqty.setValue(Ext.util.Format.number((Number(loaditemqtydatastore.getAt(0).get('ordt_pen_qty')) + (Number(pdb_grnqty))),"0.000"));
//			var toleranceallqty = Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('tol_all_qty')), "0.000");
			
//			txtMoisPer.setValue(Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000"));
//			moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
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
				grnno:  cmborder.getValue(),
				itemcode: cmbItemName.getValue(),
				billdate: Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"),
			},
			
			callback : function()
			{
				var fillcnt;
				fillcnt =   loadfilldtstore.getCount();

				if (fillcnt > 0 )//&& (!loadfilldtstore.getAt(0).get('amnt_unit_rate') == "null"))
				{
				
					//pdb_itemrate = Number(Ext.isEmpty(loadfilldtstore.getAt(0).get('amnt_unit_rate') ? 0 : loadfilldtstore.getAt(0).get('amnt_unit_rate')) );
					//pdb_itemrate = loadfilldtstore.getAt(0).get('amnt_unit_rate');
					if((cmborder.getRawValue().charAt(2)) == "A"){
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


var cmborder = new Ext.form.ComboBox({
    fieldLabel      : 'PO No',
    width           : 120,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : '',
    id              : 'cmborder',
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


                        poseqno = cmborder.getValue();
			loaditempodatastore.removeAll();
			    loaditempodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditempo",
				    ordcode: cmborder.getValue()
				}
			    });


			loadgrnpodatastore.removeAll();
			loadgrnpodatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadgrnpo",
				 ordcode : cmborder.getValue()
                        	 },

			callback : function()
			{
				var grnpocount;
                   		grnpocount=0;
                   		grnpocount=loadgrnpodatastore.getCount();


                          	txtRate.setValue(loadgrnpodatastore.getAt(0).get('ordt_unit_rate'));

                          	txtCrdays.setValue(loadgrnpodatastore.getAt(0).get('ordh_creditdays'));
				txtcgstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_cgstper'));
				txtsgstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_sgstper'));
				txtigstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_igstper'));
				

				txttcsper.setValue(loadgrnpodatastore.getAt(0).get('ordh_tcs'));
				txtcessper.setValue(Ext.isEmpty(loadgrnpodatastore.getAt(0).get('ordh_cess_pmt')) ? 0 : loadgrnpodatastore.getAt(0).get('ordh_cess_pmt'));
				txtHandlingPMT.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_mt'));
				txtHandlingcgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_sgstper'));
				find_item_value(); 												


			}
				 
			});


	},


	}
   });


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplier.getRawValue(),
		},
        });
}


function flx_party_click()
{
flxParty.hide();
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('sup_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('sup_code');
				supname = selrow.get('sup_name');
                                txtSupplier.setRawValue(selrow.get('sup_name'));

	
				loadQCFuelEntryNoListDatastore.removeAll();
				    loadQCFuelEntryNoListDatastore.load({
					url: 'ClsRMGrn.php',
					params:
					{
					    task:"loadQCEntryList",
					    compcode : Gincompcode,
					    finid : GinFinid,
					    supcode : supcode
					},
					callback : function(){

					}
                                });



	loadordnodatastore.removeAll();
	cmborder.reset();
            loadordnodatastore.load({
                url: 'ClsFuGrn.php',
                params:
                {
                    task:"loadordno",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    supcode : supcode,
		    gstFlag : gstFlag
                },
		scope: this,
	        callback: function () 
		{
			

        	}

            });
	

 			}


}

var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 390,
        id : flxParty,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'sup_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'sup_name',sortable:true,width:330,align:'left'},
		{header: "Sup state", dataIndex: 'sup_state',sortable:true,width:60,align:'left',hidden:true},   
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flx_party_click();
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                flx_party_click();
               }
          }

   });

var txtSupplier = new Ext.form.TextField({
    fieldLabel  : 'Supplier Name',
    id          : 'txtSupplier',
    width       : 320,
    name        : 'txtSupplier',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
//                  txtpartyrefdate.focus();
               flx_party_click();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
             },
	    keyup: function () {
	        flxParty.getEl().setStyle('z-index','10000');
	        flxParty.show();
                loadSearchPartyListDatastore.removeAll();
                  if (txtSupplier.getRawValue() != '')
                     PartySearch();
            }
}
});

/*  
var cmbsupplier = new Ext.form.ComboBox({

	fieldLabel      : 'Party',
	width           : 350,
	displayField    : 'sup_refname',
	valueField      : 'sup_code',
	hiddenName      : 'sup_code',
	id              : 'cmbsupplier',
	typeAhead       : true,
	mode            : 'local',
	store           : loadsupplierdatastore,
	forceSelection  : true,
	triggerAction   : 'all',
	selectOnFocus   : false,
	editable        : true,
	//tabindex	    : 1,
	allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	//lastQuery : '',
	//autoLoad: true,

    listeners:{


  

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmborder.focus();
             }
       },


   select: function(){

            TaxDataStore.removeAll();
            TaxDataStore.load({
                url: 'ClsFuGrn.php',
                params:
                {
                    task:"taxdetails",
                    Vendorcode: cmbsupplier.getValue()
                },
                scope: this,
                callback: function () {
			fin_taxtype = TaxDataStore.getAt(0).get('tax_paidby');
			fin_vattax = TaxDataStore.getAt(0).get('tax_code');
			fin_vattaxledger = TaxDataStore.getAt(0).get('tax_ledcode');
		}
	    });	



	loadordnodatastore.removeAll();
	cmborder.reset();
            loadordnodatastore.load({
                url: 'ClsFuGrn.php',
                params:
                {
                    task:"loadordno",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    supcode : cmbsupplier.getValue(),
		    gstFlag : gstFlag
                },
		scope: this,
	        callback: function () 
		{
			

			var cnt;
			cnt =0;
			cnt=loadordnodatastore.getCount();

			if (cnt > 0 )
			{	

		
				//cmborder.setValue(loadordnodatastore.getAt(0).get('ordh_no'));
				tabgrn.items.each(function(c){c.enable();})
			}
			else
			{

				tabgrn.items.each(function(c){c.disable();})

				

	
			}
        	}

            });
	
	}
	}
   });


*/

var cmblot = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 80,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'cmblot',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadlotnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabindex	: 0,
        allowblank      : true,
 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",   
enableKeyEvents: true,  
 listeners:{


  

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGCV.focus();
             }
       },
}     
   });


var cmbgrnno = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        labelStyle	: "font-size:12px;font-weight:bold;",
       style      :"border-radius: 5px; ",
        width           : 100,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        hiddenName      : '',
        id              : 'cmbgrnno',
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
 /*
           //    tabgrn.setActiveTab(2);tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
			loadthirdpdatastore.removeAll();
			loadthirdpdatastore.load({
			url: 'ClsFuGrn.php',
			params: {
			    task: 'loadsupplier',
			    supplierid: 143
			}
			});
	///	flxDetail.getStore().removeAll();
		

*/

	loadgrneddtdatastore.removeAll();
	loadgrneddtdatastore.load({
		url:'ClsFuGrn.php',
		params:
		{
		task:"loadgrneddt",
		finid : GinFinid,
		compcode : Gincompcode,
		grnno : cmbgrnno.getValue()
		},
		callback:function()
		{

			if ((loadgrneddtdatastore.getCount()) == 0){
				Ext.Msg.alert('Fuel-GRN','Receipt Details not Found');
			}
			else{


                        if (loadgrneddtdatastore.getAt(0).get('rech_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else
                           Ext.getCmp("optRounding").setValue(2);


			
                        seqno = loadgrneddtdatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
                        cmbQCEntNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_qcseqno'));
                        txtTicketNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_ticketno'));

                        txtCrdays.setValue(loadgrneddtdatastore.getAt(0).get('rech_crdays'));

   			cmbArea.setValue(loadgrneddtdatastore.getAt(0).get('rech_area_code'));

			dtpgrndate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
			txtSupplier.setValue(loadgrneddtdatastore.getAt(0).get('rech_sup_code'));
		txtPartybillno.setValue(loadgrneddtdatastore.getAt(0).get('rech_billno'));
			dtppartybilldate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_billdate'),'d-m-Y'));

			edpono = loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
			txtBillValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));

                        txtgrnno.setValue(cmbgrnno.getRawValue());

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
				callback : function() {cmborder.setValue(loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno')); 
}
			});

			
//			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));						
//			dtpGEDate.setValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
	
			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtTruckNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_truckno'));
		
			txtcgstper.setValue(loadgrneddtdatastore.getAt(0).get('rech_cgst_per'));
			txtsgstper.setValue(loadgrneddtdatastore.getAt(0).get('rech_sgst_per'));
			txtigstper.setValue(loadgrneddtdatastore.getAt(0).get('rech_igst_per'));
			
	
						
			txtigstval.setDisabled(true);
			txttcsper.setRawValue(loadgrneddtdatastore.getAt(0).get('rech_tcs_per'));
			txttcsval.setDisabled(true);
			txtcessper.setValue(loadgrneddtdatastore.getAt(0).get('rech_cess_pmt'));

//			txtcessval.setValue()
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

			loadgrnitemdetaildatastore.removeAll();//spfu_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    grnno: cmbgrnno.getValue(),
				    ordno: edpono
				},
				callback: function()
                                {
		                	var RowCnt = loadgrnitemdetaildatastore.getCount();
					var j = 0;
					totgrndrqty=0;
					totgrndrvalue=0;
					grndrrate=0;

			    		txtBillQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_billqty'));
					txtMillQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_millqty'));
					txtMoisPer.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_moisper'));
					txtMoisQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_moisqty'));
					txtSandPer.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_sandper'));
					txtSandQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_sandqty'));
					txtFinesPer.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_finesper'));
					txtFinesQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_finesqty'));
                                        txtRate.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_itemrate'));
                          		txtGRNQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_grnqty'));
                                txtTotDedQty.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_totdedqty'));

                               	cmbItemName.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_item_code'));
                                cmbPurGroup.setValue(loadgrnitemdetaildatastore.getAt(0).get('rect_purgrp'));
                                find_item_value();        






				}//callback function loadgrnitemdetail

			});//loadgrnitemdetail
			}//else

//alert(edacctflag);


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


    },

    }
   });
 var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtbillno',
        name        : 'txtbillno',
        width       :  100,

        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	

    });
 var txtPartybillno = new Ext.form.TextField({
        fieldLabel  : 'Party Bill No',
        id          : 'txtPartybillno',
        name        : 'txtPartybillno',
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
                  dtppartybilldate.focus();
             }
       },
    }
       


    });
var dtppartybilldate = new Ext.form.DateField({
    fieldLabel : 'Party Bill Date',
    id         : 'dtppartybilldate',
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
    }
       
});





 var txtTruckNo = new Ext.form.TextField({
        fieldLabel  : 'Lorry No',
        id          : 'txtTruckNo',
        name        : 'txtTruckNo',
        width       :  120,
	border : true,
       // style       :  {border-radius:5},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
        readOnly    : true,
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


 var txtSandPer = new Ext.form.NumberField({
        fieldLabel  : 'Sand % ',
        id          : 'txtSandPer',
        name        : 'txtSandPer',
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
           
             }
       },
	keyup : function () {

		
	}
	}
    });


 var txtFinesPer = new Ext.form.NumberField({
        fieldLabel  : 'Fines % ',
        id          : 'txtFinesPer',
        name        : 'txtFinesPer',
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
           
             }
       },
	keyup : function () {

	}
	}
    });

 var txtGCV = new Ext.form.NumberField({
        fieldLabel  : 'GCV',
        id          : 'txtGCV',
        name        : 'txtGCV',
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
                  txtRemarks.focus();
             }
       },
}     

    });
var txtRemarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
enableKeyEvents: true,  
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnSubmit.focus();
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
        id          : 'txtTicketNof',
        name        : 'txtTicketNo',
        width       :  80,
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
                  cmbItemName.focus();
             }
       },
    }	
    });
var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 220,
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
                  txtPartybillno.focus();
             }
       },

	   select:function()
		{

			fareacode = cmbArea.getValue();
			txttonnage.setValue('0');

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



var txtarea = new Ext.form.TextField({
        fieldLabel  : 'Area',
        id          : 'txtarea',
        name        : 'txtarea',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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



 var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
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
              }
       },

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
		}
    }
    });




var txtMillQty = new Ext.form.NumberField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtMillQty',
        name        : 'txtMillQty',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtMoisPer.focus();
             }
         }
       },
    });



var txtSandQty = new Ext.form.TextField({
        fieldLabel  : 'Sand Qty',
        id          : 'txtSandQty',
        name        : 'txtSandQty',
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
                  cmblot.focus();
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtSandQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtSandQty.focus();
			txtSandQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtitemval.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });


var txtFinesQty = new Ext.form.TextField({
        fieldLabel  : 'Fines Qty',
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
                  cmblot.focus();
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtSandQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtSandQty.focus();
			txtSandQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtitemval.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });

var txtMoisPer = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtMoisPer',
        name        : 'txtMoisPer',
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
          //        cmblot.focus();
             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtMoisQty = new Ext.form.TextField({
        fieldLabel  : 'Mois Qty',
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
                  txtSandQty.focus();
             }
       },
}
    });

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
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function()
		{
		
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtSandQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((txtdegradeqty.getValue())>(txtMillQty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtitemval.setValue(txtGRNQty.getValue()*(txtRate.getValue()  ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue()  ),'0.000'));

			//txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
		}
	    
}
    });

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

var txtGRNQty = new Ext.form.NumberField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtGRNQty',
        name        : 'txtGRNQty',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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



var txtitemval = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtitemval',
        name        : 'txtitemval',
        width       :  80,
//        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


var txttotitemqty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txttotitemqty',
        name        : 'txttotitemqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttotitemval= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotitemval',
        name        : 'txttotitemval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });



var txttotgrnval= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txttotgrnval',
        name        : 'txttotgrnval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
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

var txtOtherChrges = new Ext.form.TextField({
        fieldLabel  : 'Other Charges',
        id          : 'txtOtherChrges',
        name        : 'txtOtherChrges',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
       	enableKeyEvents: true, 
    style      :"border-radius: 5px; ",	
	listeners : {
		keyup:function(){
	
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
//		 
	}
	}

    });

var txtCrdays = new Ext.form.NumberField({
        fieldLabel  : 'Cr. Days',
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
//		 
	}
	}

    });




var txtcgstper = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtcgstper',
        name        : 'txtcgstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : 'CGST Value',
        id          : 'txtcgstval',
        name        : 'txtcgstval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtsgstper = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtsgstper',
        name        : 'txtsgstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : 'SGST Value',
        id          : 'txtsgstval',
        name        : 'txtsgstval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtigstper = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtigstper',
        name        : 'txtigstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtigstval = new Ext.form.NumberField({
        fieldLabel  : 'IGST Value',
        id          : 'txtigstval',
        name        : 'txtigstval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });



var txttcsper = new Ext.form.TextField({
        fieldLabel  : 'TCS%',
        id          : 'txttcsper',
        name        : 'txttcsper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttcsval = new Ext.form.NumberField({
        fieldLabel  : 'TCS Value',
        id          : 'txttcsval',
        name        : 'txttcsval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });
var txtcessper = new Ext.form.NumberField({
        fieldLabel  : 'Cess / MT ',
        id          : 'txtcessper',
        name        : 'txtcessper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtcessval = new Ext.form.NumberField({
        fieldLabel  : 'Cess Amount',
        id          : 'txtcessval',
        name        : 'txtcessval',
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
	readOnly : true,
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function(){
		 
	}
	}	
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

var dgrecord = Ext.data.Record.create([]);

var dgrecord = Ext.data.Record.create([]);



function RefreshData(){
    TrnGrnformpanel.getForm().reset();

    InitialData();
};

function InitialData(){
flxParty.hide();
if (userid == 1) {
Ext.getCmp('dtpgrndate').setDisabled(false);
Ext.getCmp('dtpgrndate').setReadOnly(false);
}
gstFlag="Add";
//			Ext.getCmp('txtgrnno').setDisabled(true);
			Ext.getCmp('txtgrnno').show();
			Ext.getCmp('cmbgrnno').hide();
			cmbgrnno.setDisabled(true);

//Ext.getCmp('Confirm').setDisabled(true);			

			tabgrn.setActiveTab(0);
		//	tabgrn.items.each(function(c){c.disable();})

			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier",
//				 supplierid : 77
                        	 }
				 });
supplierid = "143";
/*
			loadthirdpdatastore.removeAll();
			loadthirdpdatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier",
				 supplierid : 143
                        	 }
				 });
*/
supplierid = "77";


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
				txtgrnno.setValue(loadgrnnodatastore.getAt(0).get('grnno'));
				}
				 });
			loadunloadpartydatastore.removeAll();
			loadunloadpartydatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadunloadparty"
				 
                        	 }
				 });

};



var tabgrn = new Ext.TabPanel({
    	id          : 'GRN',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#FFFEF2"},
	activeTab   : 0,
	height      : 360,
	width       : 1165,	
	x           : 0,
	y           : 0,
listeners: {
    'tabchange': function(tabPanel, tab) {
        find_item_value();
    }
} ,

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
        	        height  : 320,
        	        width   : 1140,
			style:{ border:'1px solid red',color:' #581845 ' },
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 10,
        	        items:[


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 430,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbItemName]
                            	},

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 500,
                            x           : 400,
                            y           : 0,
                            border      : false,
                            items: [cmbPurGroup]
                        },
                        	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtMillQty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 220,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtMoisPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtMoisQty]
                            	},      
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtSandPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 200,
                                	x           : 200,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtSandQty]
                            	},
                          	
					{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtFinesPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 200,
                                	x           : 200,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtFinesQty]
                            	},
                          	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},
				{			 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 180,
                                    	border      : false,
                                	items: [txtGCV]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 210,
                                    	border      : false,
                                	items: [cmblot]
                            	},







				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 200,
                                	x           : 400,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtGRNQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 400,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtRate]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 200,
                                	x           : 400,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtitemval]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 800,
                                	x           : 400,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRemarks]
                            	},




	



	

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
		                        	items: [txttotitemqty]
                            		},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 400,
		                        	x           : 230,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txttotitemval]
		                    	},



	

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtcgstper]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtcgstval]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtsgstper]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtsgstval]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtigstper]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtigstval]
		                    	},
				{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 130,
		                            	border      : false,
						items: [txtcessper]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 130,
		                            	border      : false,
						items: [txtcessval]
		                        	
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
		                        	items: [txttcsper]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 230,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txttcsval]
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
		                        	items: [txttotgrnval]
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









				]//tax
			},   //tax

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
				text: ' Add',
				style  : 'text-align:center;',
				tooltip: 'Add Details...',
				height: 40,
				fontSize:20,
				width:50,
				align : 'right',
				icon: '/Pictures/Add.png',
				listeners:{
					click: function () {
						gstFlag = "Add";

//                        	if (gstFlag === "Edit") {
//                        	Ext.getCmp('Confirm').setDisabled(false);
//                        	}
//                        	else {
//                        	Ext.getCmp('Confirm').setDisabled(true);
//                        	}						
						Ext.getCmp('txtgrnno').setDisabled(true);
						Ext.getCmp('txtgrnno').show();
						Ext.getCmp('cmbgrnno').hide();		
						//txtgrnno.setFocus();
						//txtcgstper.setRawValue('2.5');
						//txtsgstper.setRawValue('2.5');
						txtigstper.setDisabled(true);
						txtigstval.setDisabled(true);
						txttcsper.setDisabled(true);
						txttcsval.setDisabled(true);
						loadsupplierdatastore.removeAll();
						loadsupplierdatastore.load({
							 url:'ClsFuGrn.php',
							 params:
					       		 {
						 	 task:"loadsupplier",
							 supplierid : 77
							 }
							 });

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
							txtgrnno.setValue(loadgrnnodatastore.getAt(0).get('grnno'));
							}
							 });
	
					}
				}
			},'-',
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
/*
						if (gstFlag === "Edit") {
						Ext.getCmp('Confirm').setDisabled(false);
						}
						else {
						Ext.getCmp('Confirm').setDisabled(true);
						}
*/						
				
						Ext.getCmp('txtgrnno').hide();
						Ext.getCmp('cmbgrnno').setDisabled(false);
						Ext.getCmp('cmbgrnno').show();

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
								tabgrn.items.each(function(c){c.enable();})
								//cmbgrnno.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
							}
						});
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

			var gstSave;

	                    gstSave="true";

        	            if ( supcode ==0 || txtSupplier.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Supplier Name');
                                txtSupplier.focus();
        	                gstSave="false";
        	            }
    	                   if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Area Name');
        	                gstSave="false";
        	            }
       	                   if (Number(txtBillValue.getValue()) ==0 )
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Enter Party Bill Value');
                                txtBillValue.focus();
        	                gstSave="false";
        	            }
                                    
       	                   if (Number(txtBillQty.getValue()) ==0 )
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Enter Party Bill Quantity');
                                txtBillQty.focus();
        	                gstSave="false";
        	            }
                                 	
        	            else
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
 




                            Ext.Ajax.request({
                            url: 'TrnFuGRNSave.php',
                            params :
                             {

				gstFlaggrn	: gstFlag,
				compcode	: Gincompcode,
                                finid		: GinFinid,

                                qcentno          : cmbQCEntNo.getValue(),
				edgrnno		: txtgrnno.getValue(),
				edpono		: edpono,
                                supcode 	: supcode,

				ordseqno   	: poseqno,
                                seqno           : seqno,
                                crdays		: txtCrdays.getValue(),

				grndate		: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				areacode	: cmbArea.getValue(),

 
	
				sgstper		: txtsgstper.getValue(),
				sgstamt		: Ext.util.Format.number(txtsgstval.getValue(), "0.00"),
				cgstper 	: txtcgstper.getValue(),
				cgstamt 	: Ext.util.Format.number(txtcgstval.getValue(), "0.00"),
				igstper 	: txtigstper.getValue(),
				igstamt 	: Ext.util.Format.number(txtigstval.getValue(), "0.00"),
                         	handlingmt	: txtHandlingPMT.getValue(),
				handlingcgst	: txtHandlingcgst.getValue(),
                                handlingsgst	: txtHandlingsgst.getValue(), 
				handlingcgstamt	: txtHandlingcgstval.getValue(),
                                handlingsgstamt	: txtHandlingsgstval.getValue(), 	

		
				tcsper 		: txttcsper.getValue(),
				tcsamt		: Ext.util.Format.number(txttcsval.getValue(), "0.00"),

				cessmt		: txtcessper.getValue(),
				cessamt 	: Ext.util.Format.number(txtcessval.getValue(), "0.00"),
			
				freight		: Ext.util.Format.number(txtFreight.getValue(), "0"),
				othrchrg	: Ext.util.Format.number(txtOtherChrges.getValue(),"0.00"),
                                roundoff	: txtroundoff.getValue(),
				totamt		: Ext.util.Format.number(txttotgrnval.getValue(), "0.00"),

				billno		: txtPartybillno.getRawValue(),
				billdate	: Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"),
				billqty		: txtBillQty.getValue(),	                                 
				billvalue	: txtBillValue.getValue(),	

				
				vouno		: 0,
				acctflag	: '',
				accdate		: '',
				status		: '',
				usrcode		: userid,
				entrydate	: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				geno            : txtGENo.getValue(),
				gedate          : Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"), 
				lorryno         : txtTruckNo.getRawValue(),
				wtslipno        : txtTicketNo.getValue(),
                                roundneed       : roundoff,

                                itemcode        : cmbItemName.getValue(),
                                
                                millqty         : txtMillQty.getValue(),
                                moisper         : txtMoisPer.getValue(),
                                moisqty         : txtMoisQty.getValue(),
                                sandper         : txtSandPer.getValue(),
                                sandqty         : txtSandQty.getValue(),
                                finesper        : txtFinesPer.getValue(),
                                finesqty        : txtFinesQty.getValue(),
                                totdedqty       : txtTotDedQty.getValue(),
                                grnqty          : txtGRNQty.getValue(),
                                rate            : txtRate.getValue(),
			        itemvalue 	: txtitemval.getValue(),

                                gcv             : txtGCV.getValue(),                        
                                lotcode         : cmblot.getValue(),
                                purcode         : cmbPurGroup.getValue(),

                        

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("GRN Saved GRN No.-" + obj['GRNNo']);
                                    TrnGrnformpanel.getForm().reset();
                           

                                    RefreshData();
                                  }else
				  {
			Ext.MessageBox.alert("GRN Not Saved! Pls Check!- " + obj['GRNNo']);                                                  
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
				    edgrnno	: cmbgrnno.getValue()
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
					edgrnno	: cmbgrnno.getValue()
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
					edgrnno  	: cmbgrnno.getValue(),
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
			width       : 1290,
			height      : 160,
			x           : 10,
			y           : 0,
			border      : true,
			layout      : 'absolute',
			items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpgrndate]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 280,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtGENo]
                            	},

               			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [dtpGEDate]
                            	},


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 250,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtSupplier]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 250,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbQCEntNo]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 250,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmborder]
                            },


			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 700,
                                	x           : 690,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtTicketNo]
                            	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 690,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtTruckNo]
                            	},

				{ 
			        	xtype       : 'fieldset',
			        	labelWidth  : 70,
			        	width       : 350,
			        	x           : 690,
			        	y           : 60,
			            	border      : false,
			        	items: [cmbArea]
				 },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 350,
                                	x           : 1010,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtPartybillno]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 1010,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtppartybilldate]
                            	},
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 1010,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtBillQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 1010,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtBillValue]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 1010,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtCrdays]
                            	},

	


                        ]
                },


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1290,
			height      : 380,
			x           : 10,
			y           : 160,
			border      : true,
			layout      : 'absolute',
			items:[tabgrn] 
		},

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 75,
                            width       : 700,
                            x           : 350,
                            y           : 30,
                            border      : false,
                            items: [flxParty]
                        },

]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      :  600,
        width       : 1320,
        x	     : 20,
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
                        cmblot.setValue(1);
			InitialData();

	   			 }
			
		}
    });
    TrnGrnWindow.show();  
});
