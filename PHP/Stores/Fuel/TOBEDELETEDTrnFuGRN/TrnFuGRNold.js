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
      },['ordh_seqno','ordh_compcode','ordh_fincode','ordh_no','ordh_from','ordh_sup_code','ordh_date','ordh_terms','ordh_carriagetype',
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
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_handling_pmt', 'rech_handling_cgstper','rech_handling_sgstper','rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'sup_type', 'ordh_no','ordh_mois_tol','rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_geno', 'rech_gedate', 'rech_wtslipno', 'rech_truckno','rech_crdays','rech_roundneeded'

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
	{name:'ord_no', type: 'string',mapping:'ord_no'}
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

                   pdb_costvalue =  Number(txtLandingCost.getValue())/Number(txttotitemqty.getValue())* Number(selk[i].get('grnqty'));
                   pdb_costrate =   pdb_costvalue / Number(selk[i].get('grnqty'));
                   selk[i].set('costval', Ext.util.Format.number(pdb_costvalue,'0.00'));
                   selk[i].set('costrate', Ext.util.Format.number(pdb_costrate,'0.00000'));
		}

}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function Refresh(){
//	txtpendqty.setValue('');
   rounding = 0;

	txtbillqty.setValue('');
	txtmillqty.setValue('');
	txtmoisper.setValue('');
	txtmoisqty.setValue('');
	txttareqty.setValue('');
	txtOtherDedQty.setValue('');
	txtrejqty.setValue('');
	txtdegradeqty.setValue('');
	txtTotDedQty.setValue('');
	txtgrnqty.setValue('');
	txtrate.setValue('');
	cmblot.reset();	
	txtOtherDedQty.setValue('');
        txtRejPer.setValue('');
        txtrate.setValue('');
        txtRemarks.setRawValue('');
        txtGCV.setRawValue('');
        txtitemval.setValue('');
  }

function findLandingCost()
{
	var tcs_calc =0;
        var amt_cgst = 0;
        var amt_sgst = 0;
        var amt_igst = 0;

	tcs_calc = Number(lbl_totitem_value) + txtcgstval.getValue() + txtsgstval.getValue() + txtigstval.getValue();
	txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));

	txttotitemqtybill.setValue(Ext.util.Format.number(tot_billqty,"0.000"));
	txttotBillValue.setValue(pdb_tot_billval);

        txttotitemqty.setValue(Ext.util.Format.number(lbl_totitemqty,"0.000"));



	txttotitemval.setRawValue(Ext.util.Format.number(lbl_totitem_value),"0.00");


       amt_cgst = (txttotitemval.getValue() * txtcgstper.getValue()) / 100;
       amt_cgst = Math.round(amt_cgst * 100) / 100;
       amt_sgst = (txttotitemval.getValue() * txtsgstper.getValue()) / 100;
       amt_sgst = Math.round(amt_sgst * 100) / 100;
       amt_igst = (txttotitemval.getValue() * txtigstper.getValue()) / 100;
       amt_igst = Math.round(amt_igst * 100) / 100;

             txtcgstval.setValue(Ext.util.Format.number(amt_cgst, "0.00"));
    	     txtsgstval.setValue(Ext.util.Format.number(amt_sgst, "0.00"));
    	     txtigstval.setValue(Ext.util.Format.number(amt_igst, "0.00"));




	pdb_grn_value = Number(lbl_totitem_value) + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+Number(handlingval1)  + Number(txtcessval.getValue()) +Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) +Number(txttcsval.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());

      pdb_landingcost = Number(lbl_totitem_value) +Number(handlingval1)  + Number(txtcessval.getValue()) + Number(txttcsval.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());

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

            var Row= flxDetail.getStore().getCount();
	    flxDetail.getSelectionModel().selectAll();
            var sel=flxDetail.getSelectionModel().getSelections();
	    for(var i=0;i<Row;i++)
	    {

			pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(sel[i].data.itemvalue)), "0.00");
			totgrnqty = Ext.util.Format.number(Number(totgrnqty) + Number(sel[i].data.grnqty),"0.000");

			pdb_tot_millqty = Ext.util.Format.number(Number(pdb_tot_millqty) + Number(sel[i].data.millqty),"0.000");

			tot_billqty = Ext.util.Format.number(Number(tot_billqty) + Number(sel[i].data.billqty), "0.000");
			
	     }

             pdb_tot_billval = Number(txtBillValue.getValue());


            handlingval1 = totgrnqty * txtHandlingPMT.getValue();
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100), "0.00" ));
            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtcessval.setValue(Ext.util.Format.number(Ext.util.Format.number(tot_billqty,"0.000") * txtcessper.getValue(),"0"));
		


            lbl_tot_millqty = Ext.util.Format.number(pdb_tot_millqty, "0.000");
            lbl_tot_value_for_millqty = Ext.util.Format.number(pdb_tot_billval, "0.000");

            lbl_totitem_value = Ext.util.Format.number(pdb_totval, "0.00");
            lbl_totitemqty = Ext.util.Format.number(totgrnqty, "0.000");
	  
	

	     newtaxval = Number(lbl_tot_value_for_millqty); 
    	

//alert(newtaxval);
//alert(txtcgstper.getValue());




             //txtcgstval.setValue(Ext.util.Format.number(((newtaxval * txtcgstper.getValue()) / 100), "0.00"));
//    	     txtsgstval.setValue(Ext.util.Format.number(((newtaxval * txtsgstper.getValue()) / 100), "0.00"));
//    	     txtigstval.setValue(Ext.util.Format.number(((newtaxval * txtigstper.getValue()) / 100), "0.00"));
    	    
       findLandingCost();
    	

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



		if (txtmoisper.getValue() < (Number(moistureper) + Number(moistol)))
		{
			txtmoisqty.setValue(0);
		}
		else
		{
		var totmois = 0;
		totmois = Number(moistureper) + Number(moistol);
			txtmoisqty.setValue(Ext.util.Format.number((txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()) * (txtmoisper.getValue() - totmois) / 100,"0.000"));
			
		}
	if(txtmoisqty.getValue() > 0 ){
		txtRemarks.setRawValue("Ex. Moisture " + Ext.util.Format.number((txtmoisper.getValue() - totmois), "0.00") + "(%)" + " Qty : " + Ext.util.Format.number(txtmoisqty.getValue(), "0.000") + " MT Deducted" + " ,");

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
	if (cmbitem.getValue()==0 || cmbitem.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Item Code');
		Validatechk="false";
	}
	else if (txtrate.getValue()==0 || txtrate.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Item Rate should not be empty');
		Validatechk="false";
	}
	else if (txtPartybillno.getValue()==0 || txtPartybillno.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Bill No to be Entered');
		Validatechk="false";
	}
	else if (txtLorryNo.getValue()==0 || txtLorryNo.getRawValue()=="" )
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
	else if (txtbillqty.getValue()==0 || txtbillqty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtbillqty.focus();
	}
	else if (Number(txtbillqty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (txtmillqty.getValue()==0 || txtmillqty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Mill Qty Should be Greater than Zero');
		Validatechk="false";
	}
	else if (Number(txtmillqty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('Fuel-GRN','Mill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (Number(txtmoisper.getValue()) >  100)
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



var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 70,
    height  : 30,
    x       : 1020,
    y       : 160,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
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
				sel[idx].set('ordqty', txtpendqty.getRawValue());
				sel[idx].set('billqty', txtbillqty.getRawValue());
				sel[idx].set('millqty', txtmillqty.getValue());
				sel[idx].set('moisper', txtmoisper.getValue());
				sel[idx].set('moisqty', txtmoisqty.getValue());
				sel[idx].set('tarqty', txttareqty.getValue());
				sel[idx].set('othdedqty', txtOtherDedQty.getValue());
				sel[idx].set('rejqty', txtrejqty.getValue());
				sel[idx].set('rejper', txtRejPer.getValue());
	             		sel[idx].set('totdedqty', txtTotDedQty.getValue());
				sel[idx].set('grnqty', txtgrnqty.getValue());
				sel[idx].set('itemrate', txtrate.getValue());
				sel[idx].set('itemvalue',txtitemval.getValue());
				sel[idx].set('lotno', cmblot.getRawValue());

				sel[idx].set('remarks', txtRemarks.getValue());
				sel[idx].set('lotcode', cmblot.getValue());

				sel[idx].set('billdate', Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"));
		
				sel[idx].set('gcv', txtGCV.getRawValue());
	
				sel[idx].set('geno',txtGENo.getValue());
                        	sel[idx].set('gedate',Ext.util.Format.date(dtpGEDate.getValue(),"Y-m-d"),);

               			sel[idx].set('wtcardno',txtWeightSlipNo.getValue());
                             	sel[idx].set('grpname', cmbPurGroup.getRawValue());
                             	sel[idx].set('grpcode', cmbPurGroup.getValue());


                                Refresh();
                                grid_tot();
				//if(fareacode > 0) {  }


				//flxDetail.getSelectionModel().clearSelections();
				gridedit = "false";
				

			}//if(gridedit === "true")
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
					    	ordqty		:	txtpendqty.getRawValue(),
					    	billqty		:	txtbillqty.getRawValue(),
						millqty		:	txtmillqty.getRawValue(),
						moisper		:	txtmoisper.getRawValue(),
						moisqty		:	txtmoisqty.getRawValue(),
						tarqty		:	txttareqty.getValue(),
						othdedqty	:	txtOtherDedQty.getValue(),
                                                rejper          :	txtRejPer.getValue(),

						rejqty		:	txtrejqty.getValue(),
						totdedqty       :	txtTotDedQty.getValue(),
						grnqty		:	txtgrnqty.getValue(),
						itemrate	:	txtrate.getValue(),
		
						itemvalue	:	txtitemval.getRawValue(),
						lotno		:	cmblot.getRawValue(),
						remarks		:	txtRemarks.getRawValue(),
						lotcode		:	cmblot.getValue(),
		
						billno		:	txtPartybillno.getRawValue(),
						lorryno		:	txtLorryNo.getRawValue(),
						billdate	:	Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"),
						gcv		:	txtGCV.getRawValue(),
						geno		:	txtGENo.getValue(),
                                      		gedate     	:	Ext.util.Format.date(dtpGEDate.getValue(),"Y-m-d"),
						billvalue	:	txtBillValue.getValue(),
                                                wtcardno        :       txtWeightSlipNo.getValue(),
						grpname         :       cmbPurGroup.getRawValue(),
						grpcode         :       cmbPurGroup.getValue(),
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
                  cmbsupplier.focus();
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
		    itemcode : cmbitem.getValue(),
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
				txtpendqty.setValue(Ext.util.Format.number((Number(loaditemqtydatastore.getAt(0).get('ordt_pen_qty')) + (Number(pdb_grnqty))),"0.000"));
			var toleranceallqty = Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('tol_all_qty')), "0.000");
			
			txtmoisper.setValue(Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000"));
			moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
                        txtrate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
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
				itemcode: cmbitem.getValue(),
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
						txtrate.setValue(Ext.util.Format.number(loadfilldtstore.getAt(0).get('amnt_unit_rate'), "0.00"));
					}
					else{
						txtrate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
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
    fieldLabel      : 'Order No',
    width           : 100,
    displayField    : 'ord_no',
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
 tabgrn.setActiveTab(2);tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
                        poseqno = cmborder.getValue();  	
			loadthirdpdatastore.removeAll();

			loadthirdpdatastore.load({
			url: 'ClsFuGrn.php',
			params: {
			    task: 'loadsupplier',
			    supplierid: 143
			}
			});
			
			loaditempodatastore.removeAll();
			    loaditempodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditempo",
				    ordcode: cmborder.getValue()
				}
			    });

/*
			loadfreighttondatastore.removeAll();
			loadfreighttondatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightton",
				    suplrcode :cmbsupplier.getValue()
				}
			});
			loadfreightloddatastore.removeAll();
			loadfreightloddatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightlod",
				    suplrcode :cmbsupplier.getValue()
				}
			});

*/
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

				dtppartybilldate.setValue(new Date(loadgrnpodatastore.getAt(0).get('ordh_date')));
				FrePaidby = loadgrnpodatastore.getAt(0).get('ordh_frttype');
//Ext.getCmp('optfrtype').setValue(loadgrnpodatastore.getAt(0).get('ordh_frttype'));




                          	txtCrdays.setValue(loadgrnpodatastore.getAt(0).get('ordh_creditdays'));
				txtcgstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_cgstper'));
				txtsgstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_sgstper'));
				txtigstper.setValue(loadgrnpodatastore.getAt(0).get('ordh_igstper'));
				

				txttcsper.setValue(loadgrnpodatastore.getAt(0).get('ordh_tcs'));
				txtGCV.setValue(loadgrnpodatastore.getAt(0).get('ordh_gcv_tol'));
				moistol = loadgrnpodatastore.getAt(0).get('ordh_mois_tol');	
				txtcessper.setValue(Ext.isEmpty(loadgrnpodatastore.getAt(0).get('ordh_cess_pmt')) ? 0 : loadgrnpodatastore.getAt(0).get('ordh_cess_pmt'));
				txtHandlingPMT.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_mt'));
				txtHandlingcgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_sgstper'));
																


			}
				 
			});


	},


	}
   });
  
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

				cmborder.setDisabled(false);
				//cmborder.setValue(loadordnodatastore.getAt(0).get('ord_no'));
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
 
               tabgrn.setActiveTab(2);tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
			loadthirdpdatastore.removeAll();
			loadthirdpdatastore.load({
			url: 'ClsFuGrn.php',
			params: {
			    task: 'loadsupplier',
			    supplierid: 143
			}
			});
		flxDetail.getStore().removeAll();
		



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

                        txtCrdays.setValue(loadgrneddtdatastore.getAt(0).get('rech_crdays'));


			dtpgrndate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
			cmbsupplier.setValue(loadgrneddtdatastore.getAt(0).get('rech_sup_code'));


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
			txtPartybillno.setValue(loadgrneddtdatastore.getAt(0).get('rech_billno'));
			dtppartybilldate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_billdate'),'d-m-Y'));
			//cmborder.setValue(loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno'));
			//cmborder.setRawValue(loadgrneddtdatastore.getAt(0).get('ordh_no'));
			Ext.getCmp('cmborder').setDisabled(true);

			edpono = loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
//			edfradvvouno = loadgrneddtdatastore.getAt(0).get('rech_fradvvouno');
//			edfreightadvance = loadgrneddtdatastore.getAt(0).get('rech_freightadvance');
	//		txtpartybillTotalValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));
                 	txtOtherChrges.setValue(loadgrneddtdatastore.getAt(0).get('rech_othcharges'));

			txtBillValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));
			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtLorryNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_truckno'));
			txtWeightSlipNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_wtslipno'));

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
					for (var i=0;i<RowCnt;i++)
					{
			          	FrePaidby = loadgrneddtdatastore.getAt(0).get('rech_freighttype');
				/*
						if(gstFlag === "Add") {
						Ext.getCmp('optfrtype').setValue(Number(FrePaidby - 1)); 
						}
						else {
		
						Ext.getCmp('optfrtype').setValue(Number(FrePaidby));


						}
				*/
						   			cmbArea.setValue(loadgrneddtdatastore.getAt(0).get('rech_area_code'));
                    			freitemcode = loadgrnitemdetaildatastore.getAt(i).get('rect_item_code');
                         		fareacode = loadgrneddtdatastore.getAt(0).get('rech_area_code');
                			txtFreight.setValue(loadgrneddtdatastore.getAt(0).get('rech_freight'));
					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('itmh_name'),
				    		ordqty: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
					    	billqty: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
						millqty: loadgrnitemdetaildatastore.getAt(i).get('rect_millqty'),
						moisper: loadgrnitemdetaildatastore.getAt(i).get('rect_moisper'),
						moisqty: loadgrnitemdetaildatastore.getAt(i).get('rect_moisqty'),
						tarqty: loadgrnitemdetaildatastore.getAt(i).get('rect_tareqty'),
               					rejper: loadgrnitemdetaildatastore.getAt(i).get('rect_rejper'),
						rejqty: loadgrnitemdetaildatastore.getAt(i).get('rect_rejqty'),
						othdedqty: loadgrnitemdetaildatastore.getAt(i).get('rect_othdedqty'),
						totdedqty: loadgrnitemdetaildatastore.getAt(i).get('rect_totdedqty'),
						grnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						itemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						itemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),

						gcv: loadgrnitemdetaildatastore.getAt(i).get('rect_gcv'),					
			
						costval: loadgrnitemdetaildatastore.getAt(i).get('rect_costvalue'),
                                        	costrate: loadgrnitemdetaildatastore.getAt(i).get('rect_costrate'),

	                                        lorryno: loadgrnitemdetaildatastore.getAt(i).get('rect_lorryno'),
                                                wtcardno: loadgrnitemdetaildatastore.getAt(i).get('rect_wtcardno'),
                                                grpcode : loadgrnitemdetaildatastore.getAt(i).get('rect_purgrp'),
                                                grpname : loadgrnitemdetaildatastore.getAt(i).get('led_name'),


						}) 
						);   
 
	/*	
						if(loadgrnitemdetaildatastore.getAt(i).get('rect_item_code') === "1" || loadgrnitemdetaildatastore.getAt(i).get('rect_item_code') === "4"){
							gridfreqty = loadgrnitemdetaildatastore.getAt(i).get('rect_billqty');
						}
						else {
							gridfreqty = loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty');
						}
		           	*/					

					}//For Loop 


grid_tot();




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
grid_tot();
	

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
                  txtWeightSlipNo.focus();
             }
       },
    }
	
    });


 var txtRejPer = new Ext.form.NumberField({
        fieldLabel  : 'Rej % ',
        id          : 'txtRejPer',
        name        : 'txtRejPer',
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
                  txttareqty.focus();
             }
       },
	keyup : function () {
		txtrejqty.setValue(Ext.util.Format.number(((txtmillqty.getValue() * txtRejPer.getValue())) / 100,"0.000"));
			txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtrate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtrate.getValue()),'0.000'));

			//txtTotDedQty.setValue(Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue())+Number(txtmoisqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue()),"0.000"));
		
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
        width       :  288,
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

var txtWeightSlipNo = new Ext.form.NumberField({
        fieldLabel  : 'Weight Card No.',
        id          : 'txtWeightSlipNof',
        name        : 'txtWeightSlipNo',
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
                  cmbitem.focus();
             }
       },
    }	
    });
var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 240,
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

 var txtpendqty = new Ext.form.NumberField({
        fieldLabel  : 'Pend Qty',
        id          : 'txtpendqty',
        name        : 'txtpendqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
readOnly: true,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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
                  txtmillqty.focus();
             }
       },
    }
    });

function find_item_value()
{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");
			txtmillqty.focus();
			txtmillqty.setValue("0");
			}
			//txttareqty.setValue(Number(txtmillqty.getValue()) - Number(txtOtherDedQty.getValue()));
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue());


			if (txtmoisper.getValue() < Number(moistureper + moistol))
			{
				txtmoisqty.setValue(0);
			}
			else
			{
			var totmois = 0;
			totmois = Number(moistureper) + Number(moistol);
				txtmoisqty.setValue(Ext.util.Format.number((txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()) * (txtmoisper.getValue() - totmois) / 100,"0.000"));
				
			}

			//txtTotDedQty.setValue(parseFloat(dedqty));
			if (Number(txttareqty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Tare Qty Should Not be Greater than Mill Qty..");
			txttareqty.focus();
			txttareqty.setValue("0");
			}
	

			if ((txtrejqty.getValue())>(txtmillqty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtrejqty.focus();
			txtrejqty.setValue("0");
			}
                        else
                        {
	         	txtrejqty.setValue(Ext.util.Format.number(((txtmillqty.getValue() * txtRejPer.getValue())) / 100,"0.000"));
                        }  


			txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()-txtmoisqty.getValue(),'0.000'));

			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue()),"0.000"));


                        ivalue = Number(txtgrnqty.getValue()) * Number(txtrate.getValue());

			txtitemval.setRawValue(Ext.util.Format.number( ivalue,'0.00'));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtrate.getValue() ),'0.000'));
			
		

}


var txtmillqty = new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtmillqty',
        name        : 'txtmillqty',
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
                  txtmoisper.focus();
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

var txttareqty = new Ext.form.TextField({
        fieldLabel  : 'Tare Qty',
        id          : 'txttareqty',
        name        : 'txttareqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : false,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
	listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtmoisqty.focus();
             }
       },
	 keyup:function()
		{
		calculateItemvalue();
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
			if (txtmoisper.getValue() < Number(moistureper + moistol))
			{
				txtmoisqty.setValue(0);
			}
			else
			{
			var totmois = 0;
			totmois = Number(moistureper) + Number(moistol);
				txtmoisqty.setValue(Ext.util.Format.number((txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()) * (txtmoisper.getValue() - totmois) / 100,"0.000"));
				
			}
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtrejqty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if (Number(txtOtherDedQty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Lifeless Qty Should Not be Greater than Mill Qty..");
			txtOtherDedQty.focus();
			txtOtherDedQty.setValue("0");
			}
			else
			{
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtrate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtrate.getValue() ),'0.000'));

//			txtTotDedQty.setValue((txttareqty.getValue())+(txtOtherDedQty.getValue())+(txtrejqty.getValue())+(txtdegradeqty.getValue()));
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue()),"0.000"));

			}
*/
		}
	    
}
    });

var txtrejqty = new Ext.form.TextField({
        fieldLabel  : 'Rej Qty',
        id          : 'txtrejqty',
        name        : 'txtrejqty',
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

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtrejqty.getValue())>(txtmillqty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtrejqty.focus();
			txtrejqty.setValue("0");
			}
			else
			{
			txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtrate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtrate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtmoisqty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });

var txtmoisper = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtmoisper',
        name        : 'txtmoisper',
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
                  cmblot.focus();
             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtmoisqty = new Ext.form.TextField({
        fieldLabel  : 'Mois Qty',
        id          : 'txtmoisqty',
        name        : 'txtmoisqty',
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
                  txtrejqty.focus();
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
		
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtrejqty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((txtdegradeqty.getValue())>(txtmillqty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtOtherDedQty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtrate.getValue()  ));
			lblbillrate = (Ext.util.Format.number(txtbillqty.getValue()*(txtrate.getValue()  ),'0.000'));

			//txtTotDedQty.setValue(Number(txtmoisqty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtrejqty.getValue()),"0.000"));
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

var txtgrnqty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrnqty',
        name        : 'txtgrnqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        name        : 'txtrate',
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
var txttotitemqtybill= new Ext.form.TextField({
        fieldLabel  : 'Party Qty',
        id          : 'txttotitemqtybill',
        name        : 'txttotitemqtybill',
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
//		grid_tot();
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
		grid_tot();
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
        {header: "Order Qty", dataIndex: 'ordqty',sortable:true,width:90,align:'left'},//2
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'left'},//3
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'left'},//4
	{header: "Mois%", dataIndex:'moisper',sortable:true,width:90,align:'left'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'left'}, //6
	{header: "Rej %", dataIndex:'rejper',sortable:true,width:90,align:'left'}, //5
        {header: "Rej Qty", dataIndex: 'rejqty',sortable:true,width:90,align:'left'},//9

        {header: "Tar Qty", dataIndex: 'tarqty',sortable:true,width:90,align:'left'},//7
        {header: "O.Ded.Qty", dataIndex: 'othdedqty',sortable:true,width:90,align:'left'},//8
        {header: "Tot Ded", dataIndex: 'totdedqty',sortable:true,width:90,align:'left'},//11
	{header: "GRN Qty", dataIndex:'grnqty',sortable:true,width:90,align:'left'}, //12
 	{header: "Item Rate", dataIndex:'itemrate',sortable:true,width:100,align:'left'}, //13
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},//15
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:70,align:'left'},//16
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:130,align:'left'},//17
	{header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:60,align:'left',hidden:true},//18
	{header: "gcv", dataIndex: 'gcv',sortable:true,width:90,align:'left'},//27
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//,hidden:true},//31
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//,hidden:true},//32
	{header: "Purchase Grp", dataIndex: 'grpname',sortable:true,width:90,align:'left'},//,hidden:true},//31
	{header: "Pur. Grp.Code", dataIndex: 'grpcode',sortable:true,width:90,align:'left'},
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
				txtpendqty.setValue(selrow.get('ordqty'));
				txtbillqty.setValue(selrow.get('billqty'));
				txtmillqty.setValue(selrow.get('millqty'));
				txtmoisper.setValue(selrow.get('moisper'));
				txtmoisqty.setValue(selrow.get('moisqty'));
				txttareqty.setValue(selrow.get('tarqty'));
				txtOtherDedQty.setValue(selrow.get('othdedqty'));
				txtrejqty.setValue(selrow.get('rejqty'));
				txtTotDedQty.setValue(selrow.get('totdedqty'));
				txtgrnqty.setValue(selrow.get('grnqty'));
				txtrate.setValue(selrow.get('itemrate'));
		
				txtitemval.setRawValue(selrow.get('itemvalue'));
				cmblot.setRawValue(selrow.get('lotno'));
				txtRemarks.setValue(selrow.get('remarks'));
				cmblot.setValue(selrow.get('lotcode'));
				cmblot.setRawValue(selrow.get('lotno'));
                                cmbPurGroup.setValue(selrow.get('grpcode'));
	
				//txtgrnqty.setValue(selrow.get('pregrnqty'));
				txtGCV.setValue(selrow.get('gcv'));
				txtRejPer.setValue(selrow.get('rejper'));
		
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
var flxDetail_old = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:220,
    height: 105,
    hidden:false,
    width: 900,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},//1
        {header: "Order Qty", dataIndex: 'ordqty',sortable:true,width:90,align:'left'},//2
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'left'},//3
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'left'},//4
	{header: "Mois%", dataIndex:'moisper',sortable:true,width:90,align:'left'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'left'}, //6
        {header: "Tar Qty", dataIndex: 'tarqty',sortable:true,width:90,align:'left'},//7
        {header: "L.L.Qty", dataIndex: 'llqty',sortable:true,width:90,align:'left'},//8
        {header: "Rej Qty", dataIndex: 'rejqty',sortable:true,width:90,align:'left'},//9
        {header: "Degr Qty", dataIndex: 'degrqty',sortable:true,width:90,align:'left'},//10
 	{header: "Tot Ded", dataIndex: 'totded',sortable:true,width:90,align:'left'},//11
	{header: "GRN Qty", dataIndex:'grnqty',sortable:true,width:90,align:'left'}, //12
 	{header: "Item Rate", dataIndex:'itemrate',sortable:true,width:100,align:'left'}, //13
        {header: "Rate Ded", dataIndex: 'rateded',sortable:true,width:80,align:'left'},//14
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},//15
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:70,align:'left'},//16
	
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:130,align:'left'},//17
	{header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:60,align:'left',hidden:true},//18
 	{header: "Bags", dataIndex: 'bags',sortable:true,width:60,align:'left'},//19
	{header: "Bill No", dataIndex:'billno',sortable:true,width:100,align:'left'},//20
	{header: "Lorry No", dataIndex:'lorryno',sortable:true,width:100,align:'left'},//21
	{header: "Bill Date", dataIndex:'billdate',sortable:true,width:100,align:'left'},//22

 	{header: "Other Charges", dataIndex:'othrchrg',sortable:true,width:80,align:'left'}, //23
        {header: "Rej Per", dataIndex: 'rejper',sortable:true,width:60,align:'left'},//24
        {header: "freadvvouno", dataIndex: 'frevouno',sortable:true,width:70,align:'left'},//25
        {header: "freadv", dataIndex: 'freadv',sortable:true,width:70,align:'left'},//26
	
        {header: "gcv", dataIndex: 'gcv',sortable:true,width:90,align:'left'},//27
	{header: "opttl", dataIndex: 'opttlitem',sortable:true,width:90,align:'left'},//28
 	{header: "GE NO", dataIndex: 'geno',sortable:true,width:90,align:'left'},//29
	{header: "item bill value", dataIndex:'billvalue',sortable:true,width:100,align:'left'},//30
	
 	
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES GRN',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
       
       }
      }
     });         
    }

   }
});


var dgrecord = Ext.data.Record.create([]);



function RefreshData(){
    TrnGrnformpanel.getForm().reset();
    flxDetail.getStore().removeAll();
    InitialData();
};

function InitialData(){
if (userid == 1) {
Ext.getCmp('dtpgrndate').setDisabled(false);
Ext.getCmp('dtpgrndate').setReadOnly(false);
}
gstFlag="Add";
//			Ext.getCmp('txtgrnno').setDisabled(true);
			Ext.getCmp('txtgrnno').show();
			Ext.getCmp('cmbgrnno').hide();
			cmbgrnno.setDisabled(true);
			cmborder.setDisabled(true);
//Ext.getCmp('Confirm').setDisabled(true);			

			tabgrn.setActiveTab(0);
			tabgrn.items.each(function(c){c.disable();})

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
			loadthirdpdatastore.removeAll();
			loadthirdpdatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier",
				 supplierid : 143
                        	 }
				 });
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
                                	items: [cmbitem]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 185,
                                	x           : 390,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtpendqty]
                            	},
			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 500,
                            x           : 600,
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
                                	items: [txtbillqty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtmillqty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 220,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtmoisper]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 200,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtmoisqty]
                            	},      
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtRejPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 200,
                                	x           : 200,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtrejqty]
                            	},
                          	
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txttareqty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 390,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtOtherDedQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 390,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 390,
                                	y           : 90,
                                    	border      : false,
                                	items: [cmblot]
                            	},

				{			 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 390,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtGCV]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 65,
                                	width       : 455,
                                	x           : 390,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRemarks]
                            	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 200,
                                	x           : 600,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtgrnqty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 600,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtrate]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 200,
                                	x           : 600,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtitemval]
                            	},






	

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
		                        	width       : 400,
		                        	x           : 450,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txttotitemqtybill]
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
						flxDetail.getStore().removeAll();
			
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
        	            if (cmbsupplier.getValue()==0 || cmbsupplier.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Supplier Name');
        	                gstSave="false";
        	            }
    	                   if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Area Name');
        	                gstSave="false";
        	            }
                    
			    else if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Grid should not be empty');
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
		                    var grnData = flxDetail.getStore().getRange();                                        
		                    var grnupdData = new Array();
		                    Ext.each(grnData, function (record) {
		                        grnupdData.push(record.data);
		                    });

		 
					var Row= flxDetail.getStore().getCount();
					flxDetail.getSelectionModel().selectAll();
					totgieno='';
					var sel=flxDetail.getSelectionModel().getSelections();
					for(var i=0;i<Row;i++)
					{
						totgieno = totgieno + (sel[i].data.geno) + ',';
					}




                            Ext.Ajax.request({
                            url: 'TrnFuGRNSave.php',
                            params :
                             {
                             	griddet	: Ext.util.JSON.encode(grnupdData),
                          
				cnt		: grnData.length,
		
				gstFlaggrn	: gstFlag,
				compcode	: Gincompcode,
                                finid		: GinFinid,
				edgrnno		: txtgrnno.getValue(),
				edpono		: edpono,
                                supcode 	: cmbsupplier.getValue(),

				ordseqno   	: poseqno,
                                seqno           : seqno,
                                crdays		: txtCrdays.getValue(),
				grndate		: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				areacode	: cmbArea.getValue(),
				freighttype	: 0,
				itemval 	: txttotitemval.getValue(),
		
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
				billval		: txtBillValue.getValue(),	
				frvouno		: 0,
				vouno		: 0,
				acctflag	: '',
				accdate		: '',
				status		: '',
				usrcode		: userid,
				entrydate	: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				geno            : txtGENo.getValue(),
				gedate          : Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"), 
				lorryno         : txtLorryNo.getRawValue(),
				wtslipno        : txtWeightSlipNo.getValue(),
                                roundneed : roundoff,


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("GRN Saved GRN No.-" + obj['GRNNo']);
                                    TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();

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
			width       : 1190,
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
                                	items: [txtgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpgrndate]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 630,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbsupplier]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 200,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmborder]
                            },


					{ 
				        	xtype       : 'fieldset',
				        	labelWidth  : 60,
				        	width       : 320,
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
                                	x           : 630,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtPartybillno]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 630,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtppartybilldate]
                            	},
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 630,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtBillValue]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 630,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtCrdays]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 280,
                                	x           : 910,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGENo]
                            	},

               			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 910,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpGEDate]
                            	},

	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 700,
                                	x           : 910,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtLorryNo]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 700,
                                	x           : 910,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtWeightSlipNo]
                            	},

                        ]
                },


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1190,
			height      : 380,
			x           : 10,
			y           : 135,
			border      : true,
			layout      : 'absolute',
			items:[tabgrn] 
		}]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      :  590,
        width       : 1220,
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
			InitialData();

	   			 }
			
		}
    });
    TrnGrnWindow.show();  
});
