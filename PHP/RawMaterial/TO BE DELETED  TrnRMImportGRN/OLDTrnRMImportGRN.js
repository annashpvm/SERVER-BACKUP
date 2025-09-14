
Ext.onReady(function(){
   Ext.QuickTips.init();

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');

   var poseqno = 0;
   var invseqno = 0;
   var grnseqno = 0;  


   var agentcode =0;
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemgrpcode = 0;
	var gridedit = "false";
	var degrchk = "true";
	var editrow = 0;
	var FrePaidby = 0;


var POOutThrowPer =0;

var frttype = "M";
var dedqty;
var lifelessqty;
var POMoisPer;
var frttype;
var stper;
var scper;
var suptype;
var stamt;
var scamt;
var fareacode;
var freitem;
var freqty;
var tonfre = 0;
//var gstGroup;

var Validatechk = "true";
var freitemcode =0;
var freqty =0;
var gstFlag = "Add";
var poseqno, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var poseqno, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_millval, pdb_totedval, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;
var PQTY =0, GQTY =0, purvalue =0,receiptdt,supledcode,billnoh,billdt,billvalueh,
tcsamth,cessmth,handlingmt,cgstph,sgstph,
igstph,chkgrnh,frtsupledcode,handlingledcode;

var pdb_totvalnew = 0;

var dgrecord = Ext.data.Record.create([]);
var dgrecordflxitem = Ext.data.Record.create([]);


function calculate_GRNqty()
{

	if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
	{
	alert("Mill Qty Should Not be Greater than Pending Qty..");
	txtmillqty.focus();
	txtmillqty.setValue("0");
	}


	txtdedqty.setValue(parseFloat(dedqty));
	if (Number(txttareqty.getValue())>Number(txtmillqty.getValue()))
	{
		alert("Tare Qty Should Not be Greater than Mill Qty..");
		txttareqty.focus();
		txttareqty.setValue("0");
	}


	if ( Number(txtrejqty.getValue())> Number(txtmillqty.getValue()))
	{
		alert("Rej Qty Should Not be Greater than Mill Qty..");
		txtrejqty.focus();
		txtrejqty.setValue("0");
	}


        if (Number(txtmoisper.getValue()) <  Number(POMoisPer))
	{
		txtmoisqty.setValue(0);
	}
	else
	{
	        txtmoisqty.setValue(Ext.util.Format.number((Number(txtmillqty.getValue()) - Number(txttareqty.getValue()) - Number(txtrejqty.getValue())) * (Number(txtmoisper.getValue()) - POMoisPer) / 100,"0.000"));
			
	}

	if ( Number(txtOutThrowPer.getValue()) <  Number(POOutThrowPer))
	{
		txtOutThrowQty.setValue(0);
	}
	else
	{
		txtOutThrowQty.setValue(Ext.util.Format.number(Number(txtmillqty.getValue()) * (Number(txtOutThrowPer.getValue()) - POOutThrowPer) / 100,"0.000"));
			
	}


	if ((Number(txtdegradeqty.getValue()))>Number(txtmillqty.getValue()))
	{
		alert("Degrade Qty Should Not be Greater than Mill Qty..");
		txtdegradeqty.focus();
		txtdegradeqty.setValue("0");
	}


           txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue())+Number(txtOutThrowQty.getValue()),'0.000'));

        txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txtdedqty.getValue(),'0.000'));

	txtitemval.setValue(txtgrnqty.getValue()*(Number(txtUSDRate.getValue())*Number(txtExRate.getValue())  ));

 }


var loadINVNoItemListDataStore = new Ext.data.Store({
  id: 'loadINVNoItemListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMImportGRN.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVitem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itmh_name', 'itmh_code'
  ])
});




 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      autoLoad : true,   
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
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
            url: 'ClsRMImportGRN.php',      // File to connect to
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




 var loadthirddatastore = new Ext.data.Store({
      id: 'loadthirddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadthird"}, // this parameter asks for listing
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
	
 var loadagentdatastore = new Ext.data.Store({
      id: 'loadagentdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadagent"}, // this parameter asks for listing
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

	var loadponodatastore = new Ext.data.Store({
      id: 'loadponodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_no','ordh_seqno'
      ]),
    });

	var loadINVitemdatastore = new Ext.data.Store({
	id: 'loadINVitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImportGRN.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadINVitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code'
	]),
	});
	
	var loaddegrdatastore = new Ext.data.Store({
	id: 'loaddegrdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImportGRN.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadpoitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code'
	]),
	});

	var loaddegritemdatastore = new Ext.data.Store({
	id: 'loaddegritemdatastore',
autoLoad:true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImportGRN.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loaddegritem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code'
	]),
	});
	var loadpoheaderdatastore = new Ext.data.Store({
	id: 'loadpoheaderdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImportGRN.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadpoordhr"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_remarks', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_itemvalue', 'ordh_roundingoff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'cancelflag', 'sup_type'
	]),
	});
	var loadgrnnodatastore = new Ext.data.Store({
      id: 'loadgrnnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno','rech_no','rech_seqno'
      ]),
    });
    var loadaccupdhstore = new Ext.data.Store({
      id: 'loadaccupdhstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceipth"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_sgst_per', 'rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_edamount', 'rech_servicecharge', 'rech_freight', 'rech_roundingoff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_educessamount', 'rech_geno', 'rech_gedate', 'rech_acc_seqno', 'censtatus', 'sup_type', 'sup_name', 'frt_sup_name', 'sup_code', 'frt_sup_code', 'sup_led_code', 'frt_sup_led_code'
      ]),
    });

    var loadaccupdtstore = new Ext.data.Store({
      id: 'loadaccupdtstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceiptt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_educessper', 'rect_educessamount', 'itmh_name', 'lot_refno', 'wc_seqno', 'wc_compcode', 'wc_fincode', 'wc_no', 'wc_date', 'wc_area_code', 'wc_sup_code', 'wc_itemgrp', 'wc_supervisor', 'wc_vehicleno', 'wc_transportname', 'wc_wb_no', 'wc_tarewt', 'wc_netwt', 'wc_status', 'wc_usr_code', 'wc_entry_date'
      ]),
    });    
    var loadgrndetaildatastore = new Ext.data.Store({
      id: 'loadgrndetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_sgst_per', 'rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_edamount', 'rech_servicecharge', 'rech_freight', 'rech_roundingoff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_educessamount', 'rech_geno', 'rech_gedate', 'sup_type', 'ordh_no', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper','rech_truckno','rech_otheramt', 'invh_invoiceno', 'invh_invoicerefno', 'invh_clearing', 'invh_clearing', 'invh_agent','rech_invhdseqno','rech_ordhdseqno' 
      ]),
    });

    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'grn_item', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_educessper', 'rect_educessamount', 'itmh_ledcode', 'act_rect_qty' ,'lot_refno','rect_lotno','pendqty',
'rect_outthrper','rect_outthrqty','rect_exrate'
      ]),
    });

    var loadwtcarddatastore = new Ext.data.Store({
      id: 'loadwtcarddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwtcard"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wc_no','wc_seqno'
      ]),
    });
    var loadwtcarddtdatastore = new Ext.data.Store({
      id: 'loadwtcarddtdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwtcarddt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wc_date','wc_area_code','area_name','wc_vehicleno','wc_transportname'
      ]),
    });
    var loadfreightdatastore = new Ext.data.Store({
      id: 'loadfreightdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'aif_seqno','aif_tonfreight','aif_tonfreight_tipper'
      ]),
    });
    var loadfreighttondatastore = new Ext.data.Store({
      id: 'loadfreighttondatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
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

    var loadfreightloddatastore = new Ext.data.Store({
      id: 'loadfreightloddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
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
                url: 'ClsRMImportGRN.php',      // File to connect to
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


var loaddegritemqtydatastore = new Ext.data.Store({
      id: 'loaddegritemqtydatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddegritemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pitr_rate'
      ]),
    });


var loaditemqtydatastore = new Ext.data.Store({
      id: 'loaditemqtydatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invt_item_code', 'invt_qty','invt_portqty', 'invt_recqty', 'invt_moisper', 'invt_outthrowper', 'invt_dedper', 'invt_itemUSDrate', 'invt_itemvalue','invt_exrate'
      ]),
    });

var loadamnddatastore = new Ext.data.Store({
      id: 'loadamnddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadamnd"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 'amnt_unit_rate','rect_grnqty'
      ]),
    });
var userdatastore = new Ext.data.Store({
      id: 'userdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"userdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'usr_code', 'usr_dept', 'usr_name', 'usr_pwd', 'usr_type'
      ]),
    });

	var txtgrnno = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtgrnno',
        name        : 'txtgrnno',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
		tabindex : 2
    });

function validatechkgrid()
{

	Validatechk="true";
	if (cmbitem.getValue()==0 || cmbitem.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Select Item Code');
		Validatechk="false";
	}
	else if (txtPortQty.getValue()==0 || txtPortQty.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtPortQty.focus();
	}
	else if (Number(txtPortQty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('GRN','Bill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (txtmillqty.getValue()==0 || txtmillqty.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Mill Qty Should be Greater than Zero');
		Validatechk="false";
	}
	else if (Number(txtmillqty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('GRN','Mill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (Number(txtmoisper.getValue()) >  100)
	{
		Ext.Msg.alert('GRN','Moisture % Should not be Greater than 100%');
		Validatechk="false";
	}
	else if (cmblot.getValue()==0 || cmblot.getRawValue()=="" || cmblot.getRawValue() < 0 )
	{
		Ext.Msg.alert('GRN','Lot No Should be Selected ');
		Validatechk="false";
	}

}

function validatechkgriddegr()
{

	Validatechk="true";
	if (cmbitemdegr.getValue()==0 || cmbitemdegr.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Select Degrated Item');
		Validatechk="false";
	}
	else if (cmbitemdegrto.getValue()==0 || cmbitemdegrto.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Select Degrated To Item');
		Validatechk="false";
	}
	else if (cmbitemdegr.getValue() === cmbitemdegrto.getValue())
	{
		Ext.Msg.alert('GRN','Both Item should not be the Same');
		Validatechk="false";
		txtPortQty.focus();
	}
	else if (Number(txtgrn1qty.getValue()) <= 0 || txtgrn1qty.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','GRN Qty Should be Greater than Zero');
		Validatechk="false";
	}
	else if (Number(txtgrn1qty.getValue()) >  Number(txtdegrqty.getValue()))
	{
		Ext.Msg.alert('GRN','GRN Qty Should not be Greater than Degr. Qty');
		Validatechk="false";
	}
	else if (Number(txtitemrate.getValue()) <= 0 || txtitemrate.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Item Rate Should be Greater than Zero');
		Validatechk="false";
	}
	else if (cmblotdr.getValue()==0 || cmblotdr.getRawValue()=="" || cmblotdr.getRawValue() < 0 )
	{
		Ext.Msg.alert('GRN','Lot No Should be Selected ');
		Validatechk="false";
	}

}

function calcost(){

       var totalgrnqty = Number(txttotitemqty.getValue());
       var addnlvalue  = Number(txtfreight.getValue()) +  Number(txtotherchrgs.getValue());
       var addnl1 =0;

		var Rowk= flxDetail.getStore().getCount();
        	flxDetail.getSelectionModel().selectAll();
		var selk=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{
                    if (totalgrnqty > 0){
                       pdb_costvalue = 0;
                       pdb_costrate = 0;
                       addnl1 =  addnlvalue / totalgrnqty * Number(selk[i].data.grnqty);
		       pdb_costvalue = Ext.util.Format.number((Number(selk[i].data.itemvalue) + addnl1) ,"0.00");
                       pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.grnqty)), "0.00000");
                       selk[i].set('costval', pdb_costvalue);
                       selk[i].set('costrate', pdb_costrate);
                    }
		}
						




}

function calcostdegr(){


       var totalgrnqty =  Number(txttotitemqty.getValue());
       var addnlvalue  = Number(txtfreight.getValue()) +  Number(txtotherchrgs.getValue());
       var addnl1 =0;



		var Rowk= flxDetaildegr.getStore().getCount();
                if (Rowk > 0)
                {
			flxDetaildegr.getSelectionModel().selectAll();
			var selk=flxDetaildegr.getSelectionModel().getSelections();
			for(var i=0;i<Rowk;i++)
			{
		            if (totalgrnqty > 0){
		               pdb_costvalue = 0;
		               pdb_costrate = 0;
		               addnl1 =  addnlvalue / totalgrnqty * Number(selk[i].data.degrgrnqty);
			       pdb_costvalue = Ext.util.Format.number((Number(selk[i].data.degritemvalue) + addnl1) ,"0.00");
		               pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.degrgrnqty)), "0.00000");
		               selk[i].set('costval', pdb_costvalue);
		               selk[i].set('costrate', pdb_costrate);
		            }
			}
		}				


}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function refresh(){

txtpendqty.reset();
txtPortQty.reset();
txtmillqty.reset();
txtmoisper.reset();
txtmoisqty.reset();
txttareqty.reset();
txtlifelessqty.reset();
txtrejqty.reset();
txtdegradeqty.reset();
txtdedqty.reset();
txtgrnqty.reset();
txtUSDRate.reset();
txtExRate.reset();
txtOutThrowPer.reset();
txtOutThrowQty.reset();

txtitemval.reset();
cmblot.reset();	

txtRemarks.reset();
				
}

var pdb_totqty =0;

function grid_tot(){

	pdb_totval = 0;
	pdb_totedval = 0;

        var totgrnvalue  =0; 
        var totgrnvalue2  =0; 

	totgrnqty = 0;
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
	{
		pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(sel[i].data.itemvalue)), "0.00");
		totgrnqty = Ext.util.Format.number(Number(totgrnqty) + Number(sel[i].data.grnqty),"0.000");
	}

	txttotitemqty.setValue(Ext.util.Format.number((Number(totgrnqty) + Number(totgrndrqty)),"0.000"));
	txttotitemval.setValue(Number(pdb_totval) + Number(totgrndrvalue));


        pdb_totvalnew = Number(pdb_totval) + Number(txtfreight.getValue());


	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );

	txtcgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtcgstper.getValue()/100,"0"));
	txtsgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtsgstper.getValue()/100,"0"));
	txtigstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtigstper.getValue()/100,"0"));

   	var tcs_calc =0;

    	tcs_calc = Number(pdb_totvalnew) + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue());
	txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));

//	txtotherchrgs.setRawValue(Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtigstval.getValue()));

//	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );

	totgrnvalue = Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue());
        totgrnvalue2 =  totgrnvalue.toFixed(0) ;

	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));


       findLandingCost();



//calcost(); 

}


function findLandingCost(){

       pdb_totvalnew = Number(txttotitemval.getValue());
       txtlandingcost.setRawValue(Number(pdb_totvalnew)+Number(txtotherchrgs.getValue())+Number(txtfreight.getValue())) ; 

        if (Number(txtcgstper.getValue()) > 0)
            txtcgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtcgstper.getValue()/100,"0"));
        if (Number(txtsgstper.getValue()) > 0)
            txtsgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtsgstper.getValue()/100,"0"));
        if (Number(txtigstper.getValue()) > 0)
            txtigstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtigstper.getValue()/100,"0"));

//	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) +Number(txtotherchrgs.getValue()) );

//(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );

	totgrnvalue = Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue());
        totgrnvalue2 =  totgrnvalue.toFixed(0) ;

	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));


   //    findLandingCost();

calcost(); 
calcostdegr()

}

function grid_tot_old(){
			totgrnqty=0;
			totgrnvalue=0;
			cgstval = 0;
			sgstval = 0;
			grnrate = 0;
			//totgrndrqty=0;
			//totgrndrvalue=0;
			//grndrrate=0;

        		var Row= flxDetail.getStore().getCount();
        		flxDetail.getSelectionModel().selectAll();

        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    totgrnqty=Number(totgrnqty)+Number(sel[i].data.grnqty);
				    totgrnvalue=Number(totgrnvalue)+Number(sel[i].data.itemvalue);
				    grnrate=Number(grnrate)+Number(sel[i].data.itemrate);
        			}
				    txttotitemqty.setValue(totgrnqty + totgrndrqty);
				    txttotitemval.setValue(totgrnvalue + totgrndrvalue);
				    txtcgstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtcgstper.getValue()/100);
				    txtsgstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtsgstper.getValue()/100);
				    txtigstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtigstper.getValue()/100);

txttotgrnval.setValue(totgrnvalue + totgrndrvalue + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );
//txtlandingcost.setRawValue(Ext.util.Format.number((totgrnqty + totgrndrqty) * (grnrate + grndrrate)),"0.00");

//txtlandingcost.setRawValue(Ext.util.Format.number(Number(Number(totgrnqty) + Number(totgrndrqty)) * (Number(grnrate) + Number(grndrrate))),'0.00');



//txtpartybillval.setRawValue(Number(txttotitemval.getValue())+Number(txtcgstval.getValue())+Number(txtsgstval.getValue()));
//txtotherchrgs.setRawValue(Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtigstval.getValue()));

txtlandingcost.setRawValue((Number(totgrnqty) + Number(totgrndrqty)) * (Number(grnrate) + Number(grndrrate)));

		 }

function CalDegrval()
{
	
	totgrndrqty=0;
	totgrndrvalue=0;
	grndrrate=0;

	var Rowdr = flxDetaildegr.getStore().getCount();
	flxDetaildegr.getSelectionModel().selectAll();
		var seldr=flxDetaildegr.getSelectionModel().getSelections();
		for(var i=0;i<Rowdr;i++)
		{
		    totgrndrqty=Number(totgrndrqty)+Number(seldr[i].data.degrgrnqty);
		    totgrndrvalue=Number(totgrndrvalue)+Number(seldr[i].data.degritemvalue);
		    grndrrate=Number(grndrrate)+Number(seldr[i].data.degritemrate);
		}
calcostdegr();
}

function CalculateTax()
{

	if (suptype === 1)
	{

	
/*		if (opttype.getValue() === true)  {
		   stamt = Ext.util.Format.number((stper * ((Number(txttotitemval.getValue()) + Number(lbl_toted_value)) / 100) + 0.5), "0.00");	}
		else {*/
		   stamt = Ext.util.Format.number((stper * ((Number(txttotitemval.getValue()) + Number(lbl_totfre_value) + Number(lbl_toted_value)) / 100) + 0.5), "0");
		//}
	}
	/*else {
        	stamt = Ext.util.Format.number(((stper * (Number(txttotitemval.getValue()) + Number(lbl_toted_value)) / 100) + 0.5), "0.00");
	}*/
  	
    var tcs_calc =0;

    tcs_calc = Number(txttotitemval.getValue()) + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue()) + Number(txtfreight.getValue());
 //alert(tcs_calc);
 /*   txtcgstval.setRawValue(Ext.util.Format.number((txtcgstper.getValue() * (Number(txttotitemval.getValue()) / 100) ),"0"));
    txtsgstval.setRawValue(Ext.util.Format.number((txtsgstper.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));
    txtigstval.setRawValue(Ext.util.Format.number((txtigstper.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));*/

    txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));
//    txtotherchrgs.setRawValue(Ext.util.Format.number((txtcgstval.getValue() + txtsgstval.getValue() + txtigstval.getValue()), "0"));



    


}


var AgentDataStore = new Ext.data.Store({
  id: 'AgentDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMImportGRN.php',      // File to connect to
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


var cmbAgent = new Ext.form.ComboBox({
    fieldLabel      : 'Agent ',
    width           : 250,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbAgent',
    typeAhead       : true,
    mode            : 'local',
    store           : AgentDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    readOnly        : true,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
        }
    }
});

var loadINVNoDetailDataStore = new Ext.data.Store({
  id: 'loadINVNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMImportGRN.php',      // File to connect to
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

                                dtpInvDate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_date'),'d-m-Y'));
                                cmbAgent.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_agent'));
                                poseqno = loadINVNoDetailDataStore.getAt(0).get('invh_poseqno');
                                invseqno = loadINVNoDetailDataStore.getAt(0).get('invh_seqno');
                                agentcode = loadINVNoDetailDataStore.getAt(0).get('invh_agent');

//alert(invseqno);


		                loadponodatastore.removeAll();
				loadponodatastore.load({
		                url: 'ClsImportExpenses.php',
		                params:
		                    {
		                        task:"loadpono",
		                        seqno    : poseqno,
				    	compcode : Gincompcode,
				    	finid    : GinFinid,
		                    },
		                    callback: function () 
				    {
                                         cmbpono.setValue(loadponodatastore.getAt(0).get('ordh_no'));
                                    } 
                               }); 

				loadINVNoItemListDataStore.load({
				   url: 'ClsRMImportGRN.php',
				   params:
				   {
				        task  : "loadINVitem",
				        seqno :  invseqno,
				   },
			            callback: function () 
				    {
//alert(loadINVNoItemListDataStore.getCount());
//alert(loadINVNoItemListDataStore.getAt(0).get('itmh_name'));
                                    }

                                });        



                            }  
                        });   
                   }
         }
  });


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "ADD",
    width   : 80,
    height  : 40,
    x       : 1080,
    y       : 105,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    

		validatechkgrid();
		if (Validatechk === "true")
		{
			var itemseq = cmbitem.getValue();
		        
		        flxDetail.getSelectionModel().selectAll();
		        var selrows = flxDetail.getSelectionModel().getCount();
		        var sel = flxDetail.getSelectionModel().getSelections();

		        var cnt = 0;
		        for (var i=0;i<selrows;i++)
			{
		            if (sel[i].data.itemname == cmbitem.getRawValue())
			    {
		                cnt = cnt + 1;
		            }
				
		        }
		if(gridedit === "true")
		{

				var itemseq = cmbitem.getValue();
				//alert(cmbunloadparty.getValue());
				Ext.getCmp('cmbitem').setDisabled(false);

	
				valoffreight = 0;
				txtfreight.setValue('0');
				
				

			gridedit = "false";

			//var idxitem = flxitem.getStore().indexOf(editrow);
			var idx = flxDetail.getStore().indexOf(editrow);

			sel[idx].set('itemcode', cmbitem.getValue());
			sel[idx].set('itemname', cmbitem.getRawValue());
			sel[idx].set('ordqty', txtpendqty.getRawValue());
			sel[idx].set('portqty', txtPortQty.getRawValue());
			sel[idx].set('millqty', txtmillqty.getValue());
			sel[idx].set('moisper', txtmoisper.getValue());
			sel[idx].set('moisqty', txtmoisqty.getValue());
			sel[idx].set('outper', txtOutThrowPer.getValue());
			sel[idx].set('outqty', txtOutThrowQty.getValue());
			sel[idx].set('tarqty', Number(txttareqty.getValue()));
			sel[idx].set('llqty', Number(txtlifelessqty.getValue()));
			sel[idx].set('rejqty', Number(txtrejqty.getValue()));
			sel[idx].set('degrqty', Number(txtdegradeqty.getRawValue()));

			sel[idx].set('totded', Number(txtdedqty.getValue()));
			sel[idx].set('grnqty', txtgrnqty.getValue());
			sel[idx].set('itemrate', txtUSDRate.getValue());
			sel[idx].set('exrate', txtExRate.getValue());
			sel[idx].set('itemvalue' ,txtitemval.getValue());
			sel[idx].set('lotno', cmblot.getRawValue());

			sel[idx].set('remarks', txtRemarks.getValue().toUpperCase());
			sel[idx].set('lotcode', cmblot.getValue());
	
			sel[idx].set('pregrnqty', txtgrnqty.getValue());
/*

			flxitem.getSelectionModel().selectAll();
				var selrowsf = flxitem.getSelectionModel().getCount();
				var selfi = flxitem.getSelectionModel().getSelections();
				freqty =0;
				for (var i=0;i<selrowsf;i++)
				{
					
					if (selfi[i].data.itemcode == itemseq)
					{
						
						
						//flxitem.getStore().remove(selfi[i]);
						freitem = cmbitem.getValue();
						

						gridfreqty = txtgrnqty.getValue();

					selfi[i].set('qty',gridfreqty);
					
					//selfi[i].set('wheeltype',cmbWheeltype.getRawValue());
					//selfi[i].set('geno',txtGIENo.getValue());


					}

				}

*/

				for (var i=0;i<selrows;i++)
				{
				
					freqty = freqty + Number(sel[i].data.qty);
					
				}
					

		                    	grid_tot();
					CalculateTax();
					grid_tot();
					refresh();

			flxDetail.getSelectionModel().clearSelections();



		}//if(gridedit === "true")
		else{

			if (cnt ==0)
			{
		            var RowCnt = flxDetail.getStore().getCount() + 1;
		            flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({

		                    	slno:RowCnt,
					itemcode:cmbitem.getValue(),
		                    	itemname:cmbitem.getRawValue(),
				    	ordqty:txtpendqty.getRawValue(),
				    	portqty:txtPortQty.getRawValue(),
					millqty:txtmillqty.getRawValue(),
					moisper:txtmoisper.getRawValue(),
					moisqty:txtmoisqty.getRawValue(),
					outper :txtOutThrowPer.getRawValue(),
					outqty :txtOutThrowQty.getRawValue(),
					tarqty:Number(txttareqty.getRawValue()),
					llqty:Number(txtlifelessqty.getRawValue()),
					rejqty:Number(txtrejqty.getRawValue()),
					degrqty:Number(txtdegradeqty.getRawValue()),
					totded:Number(txtdedqty.getRawValue()),
					grnqty:txtgrnqty.getRawValue(),
					itemrate:txtUSDRate.getRawValue(),
					exrate:txtExRate.getRawValue(),

					itemvalue:txtitemval.getRawValue(),
					lotno:cmblot.getRawValue(),
					remarks:txtRemarks.getValue().toUpperCase(),
					lotcode: cmblot.getValue(),
	
					pregrnqty:txtgrnqty.getRawValue()



		                }) 
		                );
/*
				//CalJKFreight();
	 		    var RowCnt1 = flxitem.getStore().getCount() + 1;
		            flxitem.getStore().insert(
		                flxitem.getStore().getCount(),
		                new dgrecordflxitem({
		                    	slno:RowCnt1,
					itemcode:cmbitem.getValue(),
		                    	itemname:cmbitem.getRawValue(),
				    	qty:txtgrnqty.getRawValue(),
					frvalue :0,


		                }) 
		                );

					freitem = cmbitem.getValue();
					freqty = freqty + Number(txtgrnqty.getRawValue());
					//CalDegrval();
		                    	//grid_tot();
					//CalculateTax();
*/




					grid_tot();
					refresh();


			}
			else
			{
			alert("Same Item Already Exist");
			
			}
		}
		}
		else
		{
		//alert("Wrong");
		}
            }
}
});

 /*{header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Code", dataIndex: 'itemname',sortable:true,width:150,align:'left'},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},
        {header: "Qty", dataIndex: 'qty',sortable:true,width:90,align:'left'},
        {header: "Ton Freight", dataIndex: 'unitrate',sortable:true,width:90,align:'left'},
        {header: "Load Freight", dataIndex:'totvalue',sortable:true,width:100,align:'left'}*/
var dtpgrndate = new Ext.form.DateField({
    fieldLabel : 'GRN Date',
    id         : 'dtpgrndate',
    name       : 'date',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    //readOnly: true,
    listeners:{
            change:function(){
           /*     duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);*/
            }
    }
});

var dtpInvDate = new Ext.form.DateField({
    fieldLabel : 'Inv Date',
    id         : 'dtpInvDate',
    name       : 'date',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 80,
    readOnly: true,
    listeners:{
            change:function(){
             /*   duedateval=this.getValue();
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
        width           : 300,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitem',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : loadINVNoItemListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{

        select: function(){
var pono = 0;
var chkgrnqty = 0;
var chkitmrate = 0;

	if (poseqno > 0) { //Edit
		pono = poseqno;
		chkstatus = "E"
/*				
		loadamnddatastore.removeAll();
		loadamnddatastore.load({
		url: 'ClsRMImportGRN.php',
		params:
		{
			task:"loadamnd",
			pono : pono,
			item : cmbitem.getValue(),
			qrycode : "GRN"
		},
		callback:function()
		{
			chkgrnqty = loadamnddatastore.getAt(0).get('rect_grnqty');

		}
		});
		loadamnddatastore.removeAll();
		loadamnddatastore.load({
		url: 'ClsRMImportGRN.php',
		params:
		{
			task:"loadamnd",
			pono : pono,
			item : cmbitem.getValue(),
			qrycode : "RATE"
		},
		callback:function()
		{
			chkitmrate = loadamnddatastore.getAt(0).get('amnt_unit_rate');

		}
		});
*/

	}
	else { //Add
		pono = cmbpono.getValue();
		chkstatus = "N"
	}

	txtmoisqty.setValue(0);
	txtdedqty.setValue(0);
	txtgrnqty.setValue(0);
	loaditemqtydatastore.removeAll();
	loaditemqtydatastore.load({
		url: 'ClsRMImportGRN.php',
		params:
		{
			task:"loaditemqty",
			seqno : invseqno,
			item : cmbitem.getValue(),
			status : chkstatus
		},
	callback:function()
	{

//		txtpendqty.setValue((Number(loaditemqtydatastore.getAt(0).get('invt_qty')) + Number(chkgrnqty)));
		txtpendqty.setValue(Number(loaditemqtydatastore.getAt(0).get('invt_qty')) - Number(loaditemqtydatastore.getAt(0).get('invt_recqty')) );
         	txtUSDRate.setValue(loaditemqtydatastore.getAt(0).get('invt_itemUSDrate'));
		txtExRate.setValue(loaditemqtydatastore.getAt(0).get('invt_exrate'));
		POMoisPer = loaditemqtydatastore.getAt(0).get('invt_moisper');
                POOutThrowPer = loaditemqtydatastore.getAt(0).get('invt_outthrowper');



		
	}
	});





	}
}
   });

var cmbgrnno = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        width           : 100,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        hiddenName      : '',
        id              : 'cmbgrnno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadgrnnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
 	select: function(){

             

		flxDetail.getStore().removeAll();
		flxDetaildegr.getStore().removeAll();
	//	flxitem.getStore().removeAll();
		tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
		loadgrndetaildatastore.removeAll();//sprm_sel_recheddet
            	loadgrndetaildatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                    task:"loadgrndetail", 
                    finid: GinFinid,
		    compcode: Gincompcode,
		    grnno: cmbgrnno.getValue(),
		    gstFlag : gstFlag
                },
		callback:function(){
			
                     
                        txtgrnno.setValue(cmbgrnno.getRawValue()); 

                        grnseqno = loadgrndetaildatastore.getAt(0).get('rech_seqno');      
                        poseqno = loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');

                        invseqno = loadgrndetaildatastore.getAt(0).get('rech_invhdseqno');
                        
			dtpgrndate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_date'),'d-m-Y'));
			cmbPartyName.setValue(loadgrndetaildatastore.getAt(0).get('rech_sup_code'));
			cmbAgent.setValue(loadgrndetaildatastore.getAt(0).get('invh_agent'));

                        cmbInvNo.setRawValue(loadgrndetaildatastore.getAt(0).get('invh_invoicerefno'));


                        txtfreight.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_freight'));
                        txtotherchrgs.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_otheramt'));
                        txtvehicle.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_truckno'));
			txtgateno.setValue(loadgrndetaildatastore.getAt(0).get('rech_geno'));
			dtpgatedate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
		//	txtbillno.setValue(loadgrndetaildatastore.getAt(0).get('rech_billno'));
			dtpInvDate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_billdate'),'d-m-Y'));
			cmbpono.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_no'));
			//cmbpono.setValue(loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno'));
			Ext.getCmp('cmbpono').setDisabled(true);
			poseqno = loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');
			txtpartybillval.setValue(loadgrndetaildatastore.getAt(0).get('rech_billvalue'));
			stper = 0; scper = 0;

			loadINVNoItemListDataStore.removeAll();
			    loadINVNoItemListDataStore.load({
				url: 'ClsRMImportGRN.php',
				params:
				{
				    task:"loadINVitem",
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    seqno    : invseqno
				}
			    });
			txtcgstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_cgstper'));
			txtsgstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_sgstper'));
			txtigstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_igstper'));
	//		txtigstval.setDisabled(true);
			txttcsper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_tcsper'));
	//		txttcsval.setDisabled(true);

			edsuptype = loadgrndetaildatastore.getAt(0).get('sup_type');
			edacctflag = loadgrndetaildatastore.getAt(0).get('rech_acctflag');

//alert(edacctflag);

			cmbwtcard.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_wtcardno'));
             		cmbArea.setValue(loadgrndetaildatastore.getAt(0).get('rech_area_code'));
	


			fareacode = loadgrndetaildatastore.getAt(0).get('rech_area_code');
			loadgrnitemdetaildatastore.removeAll();//sprm_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsRMImportGRN.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    grnno: cmbgrnno.getRawValue(),
				    ordno: poseqno
				},
				callback: function(){


					var RowCnt = loadgrnitemdetaildatastore.getCount();
					var j = 0;
					totgrndrqty=0;
					totgrndrvalue=0;
					grndrrate=0;
					for (var i=0;i<RowCnt;i++)
					{

					if(loadgrnitemdetaildatastore.getAt(i).get('rect_item_code') === loadgrnitemdetaildatastore.getAt(i).get('rect_partyitemcode') ){//if condition1

					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
				    		ordqty: Number(loadgrnitemdetaildatastore.getAt(i).get('pendqty'))+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty')),
					    	portqty: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
						millqty: loadgrnitemdetaildatastore.getAt(i).get('rect_millqty'),
						moisper: loadgrnitemdetaildatastore.getAt(i).get('rect_moisper'),
						moisqty: loadgrnitemdetaildatastore.getAt(i).get('rect_moisqty'),
						tarqty: loadgrnitemdetaildatastore.getAt(i).get('rect_tareqty'),
						llqty: loadgrnitemdetaildatastore.getAt(i).get('rect_lifelessqty'),
						rejqty: loadgrnitemdetaildatastore.getAt(i).get('rect_rejqty'),
						degrqty: loadgrnitemdetaildatastore.getAt(i).get('rect_degqty'),
						totded: loadgrnitemdetaildatastore.getAt(i).get('rect_totdedqty'),
						grnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						itemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						exrate: loadgrnitemdetaildatastore.getAt(i).get('rect_exrate'),

						rateded: loadgrnitemdetaildatastore.getAt(i).get('rect_rateded'),
						itemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						bags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),
						pregrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
                           			outper : loadgrnitemdetaildatastore.getAt(i).get('rect_outthrper'),
                                		outqty : loadgrnitemdetaildatastore.getAt(i).get('rect_outthrqty'),
						}) 
						);   
					flxDetail_old.getStore().insert(
					flxDetail_old.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
				    		ordqty: loadgrnitemdetaildatastore.getAt(i).get('ordqty'),
					    	billqty: loadgrnitemdetaildatastore.getAt(i).get('rect_portqty'),
						millqty: loadgrnitemdetaildatastore.getAt(i).get('rect_millqty'),
						moisper: loadgrnitemdetaildatastore.getAt(i).get('rect_moisper'),
						moisqty: loadgrnitemdetaildatastore.getAt(i).get('rect_moisqty'),
						tarqty: loadgrnitemdetaildatastore.getAt(i).get('rect_tareqty'),
						llqty: loadgrnitemdetaildatastore.getAt(i).get('rect_lifelessqty'),
						rejqty: loadgrnitemdetaildatastore.getAt(i).get('rect_rejqty'),
						degrqty: loadgrnitemdetaildatastore.getAt(i).get('rect_degqty'),
						totded: loadgrnitemdetaildatastore.getAt(i).get('rect_totdedqty'),
						grnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						itemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						rateded: loadgrnitemdetaildatastore.getAt(i).get('rect_rateded'),
						itemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						bags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),
						pregrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);     
						//var RowCnt2 = flxitem.getStore().getCount(); 
/*
						flxitem.getStore().insert(
						flxitem.getStore().getCount(),
						new dgrecord({
							slno: i + 1,
							itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						    	itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						    	qty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);    
*/
						freqty = freqty +  Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'));       	
					} //if condition1
					else{
					
					
					flxDetaildegr.getStore().insert(
					flxDetaildegr.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						degritemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_partyitemcode'),
						degritemname: loadgrnitemdetaildatastore.getAt(i).get('party_item'),
						drdegrqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						degrtoitemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						degrtoitemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						degrgrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						degritemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						degritemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						degrlotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						degrlotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						degrbags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),


						}) 
						); 
					flxDetaildegr_old.getStore().insert(
					flxDetaildegr_old.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						degritemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_partyitemcode'),
						degritemname: loadgrnitemdetaildatastore.getAt(i).get('party_item'),
						drdegrqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						degrtoitemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						degrtoitemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						degrgrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						degritemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						degritemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						degrlotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						degrlotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						degrbags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),


						}) 
						); 
/*						var RowCnt2 = flxitem.getStore().getCount();
						flxitem.getStore().insert(
						flxitem.getStore().getCount(),
						new dgrecord({
							slno: i + 1,
							itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						    	itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						    	qty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						); 
*/ 
				    totgrndrqty=Number(totgrndrqty)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'));
				    totgrndrvalue=Number(totgrndrvalue)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'));
				    grndrrate=Number(grndrrate)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'));
				    freqty = freqty +  Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'));
					} //else condition1
			 

					}//For Loop
				 grid_tot(); CalculateTax();CalDegrval();  grid_tot();

				}//callback function loadgrnitemdetail

			});//loadgrnitemdetail
			//Freight Details
			if(!edacctflag == "N"){
				Ext.getCmp('save').setDisabled(true);
				Ext.getCmp('Confirm').setDisabled(true);
				Ext.Msg.alert('RawMaterial-GRN','Sorry!!! A/C Updatation has been done.\n U can view the data, Edit Option not Allowed');
			}
			else{
				Ext.getCmp('save').setDisabled(false);
			}




		}
		});//loadgrndetaildatastore


	if (userdatastore.getAt(0).get('usr_type') === "1") {

}



	}
	}

   });


var cmbwtcard = new Ext.form.ComboBox({
        fieldLabel      : 'Wt.Slip No.',
        width           : 150,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbwtcard',
        typeAhead       : true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        mode            : 'local',
        store           : [],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
 	select: function(){

				
			}
	}

   });

var cmbpono = new Ext.form.ComboBox({
        fieldLabel      : 'Contract No',
        width           : 70,
        displayField    : 'ordh_no', 
        valueField      : 'ordh_seqno',
        hiddenName      : '',
        id              : 'cmbpono',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : loadponodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        readOnly        : true,
	listeners:{
 	select: function(){
	tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);

                poseqno = cmbpono.getValue();
		loadINVitemdatastore.removeAll();
		    loadINVitemdatastore.load({
			url: 'ClsRMImportGRN.php',
			params:
			{
			    task:"loadpoitem",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbpono.getValue()
			}
		    });

		loadpoheaderdatastore.removeAll();

		    loadpoheaderdatastore.load({
			url: 'ClsRMImportGRN.php',
			params:
			{
			    task:"loadpoheader",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbpono.getValue()
			},
			scope : this,
			callback : function()
			{	
				
				FrePaidby = loadpoheaderdatastore.getAt(0).get('ordh_frttype');
				
				stper = loadpoheaderdatastore.getAt(0).get('ordh_stper');
				scper = loadpoheaderdatastore.getAt(0).get('ordh_scper');
				suptype = loadpoheaderdatastore.getAt(0).get('sup_type');
				txtcgstper.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_cgstper'));
				txtsgstper.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_sgstper'));
				txtigstper.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_igstper'));
				txtigstval.setDisabled(true);
				txttcsper.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_tcsper'));
				txttcsval.setDisabled(true);
	

				

				CalculateTax();
				
			}
		    });   Ext.getCmp('optfrtype').setValue(Number(FrePaidby));

	}
	}


   });

var cmbPartyName = new Ext.form.ComboBox({
        fieldLabel      : 'Party',
        width           : 300,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        hiddenName      : '',
        id              : 'cmbPartyName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsupplierdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	autoSelect: true,
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

var cmblot = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 90,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        id              : 'cmblot',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadlotnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });


var txtfrecal = new Ext.form.NumberField({
        fieldLabel  : 'Freight Value',
        id          : 'txtfrecal',
        name        : 'txtfrecal',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
var txtgateno = new Ext.form.TextField({
        fieldLabel  : 'GE. No',
        id          : 'txtgateno',
        name        : 'txtgateno',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });




var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  150,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });


var dtpgatedate = new Ext.form.DateField({
    fieldLabel : 'GE Date',
    id         : 'dtpgatedate',
    name       : 'date',
    format     : 'd-m-Y',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
    listeners:{
            change:function(){
/*
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);
*/
            }
    }
});






var txtOutThrowPer = new Ext.form.TextField({
        fieldLabel  : 'Out Thro(%)',
        id          : 'txtOutThrowPer',
        name        : 'txtOutThrowPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	enableKeyEvents: true, 
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
	listeners:{
		change:function()
		{
		        calculate_GRNqty();	
		},

		keyup:function()
		{
		        calculate_GRNqty();	
		},
		keydown:function()
		{
		        calculate_GRNqty();	
		}
	}
    });

var txtOutThrowQty = new Ext.form.TextField({
        fieldLabel  : 'Out Thro Qty',
        id          : 'txtOutThrowQty',
        name        : 'txtOutThrowQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });
var txtInvqty = new Ext.form.TextField({
        fieldLabel  : 'Inv Qty',
        id          : 'txtInvqty',
        name        : 'txtInvqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
    });



 var txtpendqty = new Ext.form.TextField({
        fieldLabel  : 'Pend Qty',
        id          : 'txtpendqty',
        name        : 'txtpendqty',
        width       :  70,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    });

 var txtPortQty = new Ext.form.TextField({
        fieldLabel  : 'Port Qty',
        id          : 'txtPortQty',
        name        : 'txtPortQty',
        width       :  70,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txtmillqty = new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtmillqty',
        name        : 'txtmillqty',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        width       :  70,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
                calculate_GRNqty()	
		},
	    change:function()
		{
                calculate_GRNqty()	
		},
	    keyup:function()
		{
                calculate_GRNqty()	
		}
    }
    });

var txttareqty = new Ext.form.TextField({
        fieldLabel  : 'Tare Qty',
        id          : 'txttareqty',
        name        : 'txttareqty',
        width       :  90,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : false,
    enableKeyEvents: true, 
	listeners:{
	 keyup:function()
		{
                  calculate_GRNqty();
			
		}
	}
    });

var txtlifelessqty = new Ext.form.Field({
        fieldLabel  : 'Lifeless Qty',
        id          : 'txtlifelessqty',
        name        : 'txtlifelessqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        visible     : false,
        //allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{
			if (txtmoisper.getValue() < POMoisPer)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
			txtmoisqty.setValue((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - POMoisPer) / 100);
			
		}
			//txtdedqty.setValue(txttareqty.getValue()+txtlifelessqty.getValue()+txtrejqty.getValue()+txtdegradeqty.getValue());
txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if (Number(txtlifelessqty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Lifeless Qty Should Not be Greater than Mill Qty..");
			txtlifelessqty.focus();
			txtlifelessqty.setValue("0");
			}
			else
			{
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtUSDRate.getValue()));
//			txtdedqty.setValue((txttareqty.getValue())+(txtlifelessqty.getValue())+(txtrejqty.getValue())+(txtdegradeqty.getValue()));
txtdedqty.setValue(Ext.util.Format.number( Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			}

		}
	    
}
    });

var txtrejqty = new Ext.form.TextField({
        fieldLabel  : 'Rej Qty',
        id          : 'txtrejqty',
        name        : 'txtrejqty',
        width       :  90,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{
                calculate_GRNqty();
          	}
			
	}

    });

var txtmoisper = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtmoisper',
        name        : 'txtmoisper',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true, 
	tabindex : 1,
	listeners:{
		change:function()
		{

		        calculate_GRNqty();	
		},
		keyup:function()
		{

		        calculate_GRNqty();	
		},
		keydown:function()
		{

		        calculate_GRNqty();	
		}
        }   
    });

var txtmoisqty = new Ext.form.TextField({
        fieldLabel  : 'Mois Qty',
        id          : 'txtmoisqty',
        name        : 'txtmoisqty',
        width       :  90,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtdegradeqty = new Ext.form.TextField({
        fieldLabel  : 'Degrade Qty',
        id          : 'txtdegradeqty',
        name        : 'txtdegradeqty',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
//	readOnly : true, 
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{
		if(txtdegradeqty.getValue() > 0)
		{
                    cmbitemdegr.setRawValue(Ext.getCmp("cmbitem").getRawValue()); 
                    cmbitemdegr.setValue(Ext.getCmp("cmbitem").getValue()); 
		}
                calculate_GRNqty();	
		}
	    
}
    });

var txtdedqty = new Ext.form.TextField({
        fieldLabel  : 'Tot. Ded. Qty',
        id          : 'txtdedqty',
        name        : 'txtdedqty',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtgrnqty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrnqty',
        name        : 'txtgrnqty',
        width       :  90,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtUSDRate = new Ext.form.Field({
        fieldLabel  : 'Rate(USD)',
        id          : 'txtUSDRate',
        name        : 'txtUSDRate',
        width       :  70,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true
    });

var txtExRate = new Ext.form.Field({
        fieldLabel  : 'INR/USD',
        id          : 'txtExRate',
        name        : 'txtExRate',
        width       :  70,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true
    });



var txtitemval = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtitemval',
        name        : 'txtitemval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txttotitemqty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txttotitemqty',
        name        : 'txttotitemqty',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotitemval= new Ext.form.NumberField({
        fieldLabel  : 'Total Item Value',
        id          : 'txttotitemval',
        name        : 'txttotitemval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotgrnval= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txttotgrnval',
        name        : 'txttotgrnval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Round Off',
        id          : 'txtroundoff',
        name        : 'txtroundoff',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtlandingcost = new Ext.form.TextField({
        fieldLabel  : 'Landing Cost',
        id          : 'txtlandingcost',
        name        : 'txtlandingcost',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtotherchrgs = new Ext.form.NumberField({
        fieldLabel  : 'Other Charges',
        id          : 'txtotherchrgs',
        name        : 'txtotherchrgs',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
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

var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        name        : 'txtfreight',
        width       :  90,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true
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


var txtpartybillval = new Ext.form.NumberField({
        fieldLabel  : 'Party BillValue',
        id          : 'txtpartybillval',
        name        : 'txtpartybillval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
    });

var txtcgstper = new Ext.form.TextField({
        fieldLabel  : 'CGST%',
        id          : 'txtcgstper',
        name        : 'txtcgstper',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : 'CGST Value',
        id          : 'txtcgstval',
        name        : 'txtcgstval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgstper = new Ext.form.TextField({
        fieldLabel  : 'SGST%',
        id          : 'txtsgstper',
        name        : 'txtsgstper',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : 'SGST Value',
        id          : 'txtsgstval',
        name        : 'txtsgstval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtigstper = new Ext.form.TextField({
        fieldLabel  : 'IGST%',
        id          : 'txtigstper',
        name        : 'txtigstper',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtigstval = new Ext.form.NumberField({
        fieldLabel  : 'IGST Value',
        id          : 'txtigstval',
        name        : 'txtigstval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttcsper = new Ext.form.TextField({
        fieldLabel  : 'TCS%',
        id          : 'txttcsper',
        name        : 'txttcsper',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true
    });

var txttcsval = new Ext.form.NumberField({
        fieldLabel  : 'TCS Value',
        id          : 'txttcsval',
        name        : 'txttcsval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });





 var txtRemarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  500,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });


var GetAreaListDatastore = new Ext.data.Store({
      id: 'GetAreaListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect toClsMasArea
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'area_code','area_name'
      ]),
    });	



var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Loading Area',
        width           : 220,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbArea',
        typeAhead       : true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        mode            : 'local',
        store           : GetAreaListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
	  select: function(){
	  }  
	}
   });



var cmbitemdegr = new Ext.form.ComboBox({
        fieldLabel      : 'Degraded Item Name',
        width           : 300,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitemdegr',
        typeAhead       : true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        mode            : 'local',
        store           : loadINVNoItemListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{

        select: function(){

	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
	var sel=flxDetail.getSelectionModel().getSelections();
	var j =0;
		txtdegrqty.setRawValue('0');
	for(var i=0;i<Row;i++)
	{
		if (sel[i].data.itemcode == cmbitemdegr.getValue())
		{
			//alert(sel[i].data.degrqty);
			txtdegrqty.setRawValue(sel[i].data.degrqty);
		}
	}
	}
	}
   });


var cmbitemdegrto = new Ext.form.ComboBox({
        fieldLabel      : 'Degraded To',
        width           : 200,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitemdegrto',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loaddegritemdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
	listeners:{

        select: function(){
	loaddegritemqtydatastore.removeAll();
            loaddegritemqtydatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                task:"loaddegritemqty",
		supno : cmbPartyName.getValue(),
		item : cmbitemdegrto.getValue()
                },
		callback:function()
		{
			txtitemrate.setValue(0);
			txtitemrate.setValue(loaddegritemqtydatastore.getAt(0).get('pitr_rate'));
			
		}
            });
		txtitemvalue.setValue(Number
			(txtgrn1qty.getValue() * txtitemrate.getValue()) );
	
	},
	blur: function(){
		txtitemvalue.setValue(Number
			(txtgrn1qty.getValue() * txtitemrate.getValue()) );
	}
}
   });

var txtdegrqty = new Ext.form.TextField({
        fieldLabel  : 'Degr. Qty',
        id          : 'txtdegrqty',
        name        : 'txtdegrqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true
    });

var txtgrn1qty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrn1qty',
        name        : 'txtgrn1qty',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
	listeners:{
        change: function(){
		txtitemvalue.setValue(Number
			(txtgrn1qty.getValue() * txtitemrate.getValue()) );
	}
	}
    });
var txtitemrate = new Ext.form.NumberField({
        fieldLabel  : 'Item Rate',
        id          : 'txtitemrate',
        name        : 'txtitemrate',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    	listeners:{
        change: function(){
		txtitemvalue.setValue(Number
			(txtgrn1qty.getValue() * txtitemrate.getValue()) );
	},
        keyup: function(){
		txtitemvalue.setValue(Number
			(txtgrn1qty.getValue() * txtitemrate.getValue()) );
	}
	}

	
    });


var txtitemvalue= new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtitemvalue',
        name        : 'txtitemvalue',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,

    });
var cmblotdr = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 80,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'cmblotdr',
        typeAhead       : true,
        mode            : 'remote',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loadlotnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });
var txtdegrrmks= new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtdegrrmks',
        name        : 'txtdegrrmks',
        width       :  500,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
    });

var btnSubmitdr = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 40,
    x       : 700,
    y       : 130,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    

	validatechkgriddegr();

	if (Validatechk === "true")
	{
		//var itemseq = cmbitem.getValue();

		flxDetaildegr.getSelectionModel().selectAll();
		var selrows = flxDetaildegr.getSelectionModel().getCount();
		var sel = flxDetaildegr.getSelectionModel().getSelections();
		var cnt = 0;
		for (var i=0;i<selrows;i++)
		{
		//sel[i].set(millqty, "0");
		    if (sel[i].data.itemname == cmbitemdegrto.getRawValue())
		    {
			cnt = cnt + 1;
		    }
		}
		if (cnt ==0)
		{
			
		    var RowCnt = flxDetaildegr.getStore().getCount() + 1;
		    flxDetaildegr.getStore().insert(
			flxDetaildegr.getStore().getCount(),
			new dgrecord({
			    	slno:RowCnt,
				degritemcode:cmbitemdegr.getValue(),
				degritemname:cmbitemdegr.getRawValue(),
				drdegrqty:txtdegrqty.getValue(),
				degrtoitemcode:cmbitemdegrto.getValue(),
				degrtoitemname:cmbitemdegrto.getRawValue(),
				degrgrnqty:txtgrn1qty.getValue(),
				degritemrate:txtitemrate.getValue(),
				degritemvalue:txtitemvalue.getValue(),
				degrlotno:cmblotdr.getRawValue(),
				remarks:txtdegrrmks.getValue(),
				degrlotcode:cmblotdr.getValue(),
		
			}) 
			);
		txtdegrqty.setValue(Ext.util.Format.number(Number(txtdegrqty.getValue()) - Number(txtgrn1qty.getValue()),'0.000'));
/*
	 		    var RowCnt = flxitem.getStore().getCount() + 1;
		            flxitem.getStore().insert(
		                flxitem.getStore().getCount(),
		                new dgrecord({
		                    	slno:RowCnt,
					itemcode:cmbitemdegrto.getValue(),
		                    	itemname:cmbitemdegrto.getRawValue(),
				    	qty:txtgrn1qty.getRawValue(),


		                }) 
		                );
*/
				freqty = freqty + Number(txtgrn1qty.getRawValue());
		grid_tot();  
			
		CalDegrval(); 
CalculateTax(); 
grid_tot();
		}
		else
		{
		alert("Same Item Already Exist");

		}
	}

    	}
}
});


var flxDetaildegr = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
tabIndex : 1,
    x:10,
    y:180,
    height: 100,
    hidden:false,
    width: 900,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Code", dataIndex: 'degritemcode',sortable:true,width:90,align:'left',hidden:true},
        {header: "Degraded From", dataIndex: 'degritemname',sortable:true,width:260,align:'left'},
        {header: "Degr Qty", dataIndex: 'drdegrqty',sortable:true,width:90,align:'left'},
 	{header: "Item Code", dataIndex: 'degrtoitemcode',sortable:true,width:90,align:'left',hidden:true},
	{header: "Item Name", dataIndex:'degrtoitemname',sortable:true,width:260,align:'left'}, 
 	{header: "GRN Qty", dataIndex:'degrgrnqty',sortable:true,width:90,align:'left'}, 
        {header: "Item Rate", dataIndex: 'degritemrate',sortable:true,width:90,align:'left'},
        {header: "Item Value", dataIndex: 'degritemvalue',sortable:true,width:90,align:'left'},
        {header: "Lot No", dataIndex: 'degrlotno',sortable:true,width:90,align:'left'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:200,align:'left'},
 	{header: "Lot code", dataIndex: 'degrlotcode',sortable:true,width:90,align:'left'},
	{header: "Pre Grn Qty", dataIndex:'pregrnqty',sortable:true,width:100,align:'left'},//20
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//hidden:true},//21
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//hidden:true},//22
//	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left'},//,hidden:true},//23
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'RAWMATERIAL GRN',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetaildegr.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetaildegr.getStore().remove(selrow);
        flxDetaildegr.getSelectionModel().selectAll();
        grid_tot();
	
CalDegrval(); 
CalculateTax();
       // CalculatePOVal();
       }
      }
     });         
    }

   }
});

var flxDetaildegr_old = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:120,
    height: 130,
    hidden:false,
    width: 1230,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Code", dataIndex: 'degritemcode',sortable:true,width:90,align:'left',hidden:true},
        {header: "Degraded From", dataIndex: 'degritemname',sortable:true,width:260,align:'left'},
        {header: "Degr Qty", dataIndex: 'drdegrqty',sortable:true,width:90,align:'left'},
 	{header: "Item Code", dataIndex: 'degrtoitemcode',sortable:true,width:90,align:'left',hidden:true},
	{header: "Item Name", dataIndex:'degrtoitemname',sortable:true,width:260,align:'left'}, 
 	{header: "GRN Qty", dataIndex:'degrgrnqty',sortable:true,width:90,align:'left'}, 
        {header: "Item Rate", dataIndex: 'degritemrate',sortable:true,width:90,align:'left'},
        {header: "Item Value", dataIndex: 'degritemvalue',sortable:true,width:90,align:'left'},
        {header: "Lot No", dataIndex: 'degrlotno',sortable:true,width:90,align:'left'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:200,align:'left'},
 	{header: "Lot code", dataIndex: 'degrlotcode',sortable:true,width:90,align:'left',hidden:true},
	{header: "Bags", dataIndex:'degrbags',sortable:true,width:100,align:'left'},
	{header: "Pre Grn Qty", dataIndex:'pregrnqty',sortable:true,width:100,align:'left'},//20
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left',hidden:true},//21
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left',hidden:true},//22
	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left',hidden:true},//23
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
       
    }

   }
});


var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:145,
    height: 100,
    hidden:false,
    width: 1150,
    columns:
    [

        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},//1
        {header: "Order Qty", dataIndex: 'ordqty',sortable:true,width:90,align:'left'},//2
        {header: "Port Qty", dataIndex: 'portqty',sortable:true,width:90,align:'left'},//3
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'left'},//4
	{header: "Mois%", dataIndex:'moisper',sortable:true,width:90,align:'left'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'left'},//6 
	{header: "Out%", dataIndex:'outper',sortable:true,width:90,align:'left'}, //5
 	{header: "Out qty", dataIndex:'outqty',sortable:true,width:90,align:'left'},//6 
        {header: "Tare Qty", dataIndex: 'tarqty',sortable:true,width:90,align:'left'},//7
        {header: "L.L.Qty", dataIndex: 'llqty',sortable:true,width:90,align:'left'},//8
        {header: "Rej Qty", dataIndex: 'rejqty',sortable:true,width:90,align:'left'},//9
        {header: "Degr Qty", dataIndex: 'degrqty',sortable:true,width:90,align:'left'},//10
 	{header: "Tot Ded", dataIndex: 'totded',sortable:true,width:90,align:'left'},//11
	{header: "GRN Qty", dataIndex:'grnqty',sortable:true,width:90,align:'left'}, //12
 	{header: "Item Rate", dataIndex:'itemrate',sortable:true,width:100,align:'left'},//13 
 	{header: "Ex-Rate", dataIndex:'exrate',sortable:true,width:100,align:'left'},//13 
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},//15
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:90,align:'left'},//16
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:260,align:'left'},//17
	{header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:90,align:'left'},//18
	{header: "Pre Grn Qty", dataIndex:'pregrnqty',sortable:true,width:100,align:'left'},//20
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//hidden:true},//21
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//hidden:true},//22
//	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left'},//hidden:true},//23

 	
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
var nbRows = flxDetaildegr.getStore().getTotalCount();
			if (nbRows > 0) {
				flxDetaildegr.getSelectionModel().selectAll();
				var selrows = flxDetaildegr.getSelectionModel().getCount();
				var sel = flxDetaildegr.getSelectionModel().getSelections();
				var cnt = 0;
				for (var i=0;i<selrows;i++)
				{

					if (sel[i].data.degritemcode == chkitem)
					{

						Ext.Msg.alert('GRN','Sorry!!! Edit or Delete option not allowed <br><br> Since this item having Degrated details <br> Please delete this item from degrated details and Try again!');

						degrchk = "false";
					}

				}
			}
			if ((selrow != null) && (degrchk === "true")){

degrchk = "true";

				gridedit = "true";
				editrow = selrow;

				cmbitem.setValue(selrow.get('itemcode'));
				cmbitem.setRawValue(selrow.get('itemname'));
				txtpendqty.setValue(selrow.get('ordqty'));
				txtPortQty.setValue(selrow.get('portqty'));
				txtmillqty.setValue(selrow.get('millqty'));
				txtmoisper.setValue(selrow.get('moisper'));
				txtmoisqty.setValue(selrow.get('moisqty'));
				txttareqty.setValue(selrow.get('tarqty'));
				txtlifelessqty.setValue(selrow.get('llqty'));
				txtrejqty.setValue(selrow.get('rejqty'));
				txtdegradeqty.setValue(selrow.get('degrqty'));
				txtdedqty.setValue(selrow.get('totded'));
				txtgrnqty.setValue(selrow.get('grnqty'));
				txtUSDRate.setValue(selrow.get('itemrate'));
				txtExRate.setValue(selrow.get('exrate'));

				txtitemval.setValue(selrow.get('itemvalue'));
				cmblot.setRawValue(selrow.get('lotno'));
				txtRemarks.setValue(selrow.get('remarks'));
				cmblot.setValue(selrow.get('lotcode'));

				txtgrnqty.setValue(selrow.get('pregrnqty'));

				POMoisPer= txtmoisper.getValue();

				flxDetail.getSelectionModel().clearSelections();
//				flxitem.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('itemcode'));
		flxDetail.getStore().remove(selrow);
		flxDetail.getSelectionModel().selectAll();
/*
		flxitem.getSelectionModel().selectAll();
		var selrows = flxitem.getSelectionModel().getCount();
		var sel = flxitem.getSelectionModel().getSelections();
		var cnt = 0;
		for (var i=0;i<selrows;i++)
		{

			if (sel[i].data.itemcode == chkitem)
			{
				flxitem.getStore().remove(sel[i]);
			}

		}
*/
		flxDetaildegr.getSelectionModel().selectAll();
		var selrows = flxDetaildegr.getSelectionModel().getCount();
		var sel = flxDetaildegr.getSelectionModel().getSelections();
		var cnt = 0;
		for (var i=0;i<selrows;i++)
		{

			if (sel[i].data.degritemcode == chkitem)
			{
				flxDetaildegr.getStore().remove(sel[i]);
			}

		}

grid_tot();
		}
		}

     });         
    }

   }
});

var flxDetail_old = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:160,
    height: 130,
    hidden:false,
    width: 930,
    columns:
    [

        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},
        {header: "Order Qty", dataIndex: 'ordqty',sortable:true,width:90,align:'left'},
        {header: "Bill Qty", dataIndex: 'portqty',sortable:true,width:90,align:'left'},
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'left'},
	{header: "Mois%", dataIndex:'moisper',sortable:true,width:90,align:'left'}, 
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'left'}, 
        {header: "Tare Qty", dataIndex: 'tarqty',sortable:true,width:90,align:'left'},
        {header: "L.L.Qty", dataIndex: 'llqty',sortable:true,width:90,align:'left'},
        {header: "Rej Qty", dataIndex: 'rejqty',sortable:true,width:90,align:'left'},
        {header: "Degr Qty", dataIndex: 'degrqty',sortable:true,width:90,align:'left'},
 	{header: "Tot Ded", dataIndex: 'totded',sortable:true,width:90,align:'left'},
	{header: "GRN Qty", dataIndex:'grnqty',sortable:true,width:90,align:'left'}, 
 	{header: "Item Rate", dataIndex:'itemrate',sortable:true,width:100,align:'left'}, 
        {header: "Rate Ded", dataIndex: 'rateded',sortable:true,width:90,align:'left'},
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:90,align:'left'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:260,align:'left'},
	{header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:90,align:'left',hidden:true},
 	{header: "Bags", dataIndex: 'bags',sortable:true,width:90,align:'left'},
	{header: "Pre Grn Qty", dataIndex:'pregrnqty',sortable:true,width:100,align:'left'},
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left',hidden:true},
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left',hidden:true},
	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left',hidden:true},
 	
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
    }

   }
});









function RefreshData(){
        gstFlag ="Add";
        flxDetail.getStore().removeAll();
        flxDetaildegr.getStore().removeAll();
    //    Ext.getCmp('txtgrnno').setDisabled(true);
	Ext.getCmp('txtgrnno').show();
	Ext.getCmp('cmbgrnno').hide();		
	//txtgrnno.setFocus();
	//txtcgstper.setRawValue('2.5');
	//txtsgstper.setRawValue('2.5');

	//txtigstper.setDisabled(true);
//	txtigstval.setDisabled(true);
	//txttcsper.setDisabled(true);
//	txttcsval.setDisabled(true);


	loadsupplierdatastore.removeAll();
	loadsupplierdatastore.load({
        	 url:'ClsRMImportGRN.php',
        	 params:
       		 {
         	 task:"loadsupplier"
        	 }
		 });

	userdatastore.removeAll();
	userdatastore.load({
        	 url:'ClsRMImportGRN.php',
        	 params:
       		 {
         	 task:"userdet",
		 userid : userid
        	 },
		 
		 });
	loadgrnnodatastore.removeAll();
	loadgrnnodatastore.load({
        	 url:'ClsRMImportGRN.php',
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

var tabgrn = new Ext.TabPanel({
    id          : 'GRN',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1250,
    x           : 2,
    items       : [
        {
            xtype: 'panel',
            title: 'Item & Tax Details',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbgrnno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
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
                                	width       : 600,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbPartyName]
                            },

    

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 110,
		                    width       : 500,
		                    x           : 200,
		                    y           : 30,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbInvNo]
		                },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 500,
                                	x           : 630,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbAgent]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 630,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpInvDate]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 220,
                                	x           : 800,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbpono]
                            },
			
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 1000,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtgateno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 400,
                                	x           : 1000,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpgatedate]
                            },


			{ xtype   : 'fieldset',
	                title   : 'Item Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 275,	
        	        width   : 1210,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 67,
        	        items:[

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbitem]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 350,
                                	x           : 380,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtpendqty]
                            },

                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 320,
                                	x           : 530,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtUSDRate]
                            },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 320,
                                	x           : 690,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtExRate]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 280,
                                	x           : 850,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtPortQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 280,
                                	x           : 1000,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtmillqty]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 1000,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtlifelessqty]
                            },


                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 20,
                                    	border      : false,
                                	items: [txttareqty]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtrejqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtmoisper]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtmoisqty]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 250,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtOutThrowPer]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 250,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtOutThrowQty]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 500,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtdegradeqty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 500,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtdedqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 500,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtgrnqty]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 740,
                                	y           : 20,
                                    	border      : false,
                                	items: [cmblot]
                            },


{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 740,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtitemval]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 650,
                                	x           : 250,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtRemarks]
                            },btnSubmit,flxDetail
]
                },
	{ xtype   : 'fieldset',
	                title   : 'Tax Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 180,
        	        width   : 1210,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 340,
        	        items:[
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemqty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 270,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtcgstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 270,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtcgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtsgstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 270,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtsgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtigstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 270,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtigstval]
                            },


{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txttcsper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 270,
                                	y           : 100,
                                    	border      : false,
                                	items: [txttcsval]
                            },

          		 
 				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 55,
                                	width       : 320,
                                	x           : 550,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtfreight]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 800,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtotherchrgs]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 800,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtlandingcost]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 800,
                                	y           : 45,
                                    	border      : false,
                                	items: [txtroundoff]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 800,
                                	y           : 70,
                                    	border      : false,
                                	items: [txttotgrnval]
                            },



{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 800,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtpartybillval]
                            },




]
}    
            ]
        },
 {
            xtype: 'panel',
            title: 'Degraded Details',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
		{ xtype   : 'fieldset',
	                title   : 'Degraded Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 320,
        	        width   : 965,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 10,
        	        items:[
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 160,
                        	width       : 600,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbitemdegr]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 600,
                        	x           : 480,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbitemdegrto]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 570,
                        	x           : 0,
                        	y           : 40,
                            	border      : false,
                        	items: [txtdegrqty]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 600,
                        	x           : 0,
                        	y           : 70,
                            	border      : false,
                        	items: [txtgrn1qty]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 500,
                        	x           : 0,
                        	y           : 100,
                            	border      : false,
                        	items: [txtitemrate]
			},

			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 700,
                        	x           : 0,
                        	y           : 130,
                            	border      : false,
                        	items: [txtdegrrmks]
			},


			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 500,
                        	x           : 300,
                        	y           : 40,
                            	border      : false,
                        	items: [txtitemvalue]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 300,
                        	x           : 300,
                        	y           : 70,
                            	border      : false,
                        	items: [cmblotdr]
			},

                        btnSubmitdr,flxDetaildegr
			]
		}, 

		{ xtype   : 'fieldset',
	                title   : '',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 120,
        	        width   : 965,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 350,
        	        items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbwtcard]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 280,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbArea]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtvehicle]
                            },

  
		]
		}
	]
	}
],

});


   var TrnGrnformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 927,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
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
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
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
	//		Ext.getCmp('txtgrnno').setDisabled(true);
			Ext.getCmp('txtgrnno').show();
			Ext.getCmp('cmbgrnno').hide();		
			//txtgrnno.setFocus();
			//txtcgstper.setRawValue('2.5');
			//txtsgstper.setRawValue('2.5');
	//		txtigstper.setDisabled(true);
//			txtigstval.setDisabled(true);
//			txttcsper.setDisabled(true);
			//txttcsval.setDisabled(true);
                        	if (gstFlag === "Edit") {
                        	Ext.getCmp('Confirm').setDisabled(false);
                        	}
                        	else {
                        	Ext.getCmp('Confirm').setDisabled(true);
                        	}			
			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsRMImportGRN.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsRMImportGRN.php',
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
//EDIT
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
	    //disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";
			flxDetail.getStore().removeAll();
			Ext.getCmp('txtgrnno').hide();
			Ext.getCmp('cmbgrnno').setDisabled(false);
			Ext.getCmp('cmbgrnno').show();
                        	if (gstFlag === "Edit") {
                        	Ext.getCmp('Confirm').setDisabled(false);
                        	}
                        	else {
                        	Ext.getCmp('Confirm').setDisabled(true);
                        	}			
			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
				url:'ClsRMImportGRN.php',
				params:
				{
					task:"loadgrnno",
					finid : GinFinid,
					compcode : Gincompcode,
					gstFlag : gstFlag
				},
				callback:function()
				{
					cmbgrnno.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
				}
			});

			//RefreshData();

                }
            }
        },'-',
                {
//SAVE
                    text: 'Save',
                    id	:  'save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                        	if (gstFlag === "Edit") {
                        	Ext.getCmp('Confirm').setDisabled(false);
                        	}
                        	else {
                        	Ext.getCmp('Confirm').setDisabled(true);
                        	}
			var gstSave;
	                    gstSave="true";
        	            if (cmbPartyName.getValue()==0 || cmbPartyName.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Select Party Name');
        	                gstSave="false";
        	            }
        	            else if (txtgateno.getRawValue()==0 || txtgateno.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Enter Gate Entry No');
        	                gstSave="false";
        	            }
   
        //	            else if (txtpartybillval.getRawValue()=="" || txtpartybillval.getRawValue==0)
//        	            {
//        	                Ext.Msg.alert('GRN','Enter Party Bill Value');
//        	                gstSave="false";
//        	            }  

        	            else if (cmbwtcard.getRawValue()=="" || cmbwtcard.getRawValue==0)
        	            {
        	                Ext.Msg.alert('GRN','Select Weight Card No.,');
                                cmbwtcard.focus();
        	                gstSave="false";
        	            }                  
        	            else if (cmbArea.getRawValue()=="" || cmbArea.getRawValue==0)
        	            {
        	                Ext.Msg.alert('GRN','Select Loading Area,');
                                cmbArea.focus();
        	                gstSave="false";
        	            }                  

			    else if (flxDetail.rows==0)
        	            {
        	                Ext.Msg.alert('GRN','Grid should not be empty');
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
if (gstFlag === "Add"){ flxDetail.getSelectionModel().selectAll(); flxDetaildegr.getSelectionModel().selectAll();}
                          
                            var grnData = flxDetail.getStore().getRange();                                        
                            var grnupdData = new Array();
                            Ext.each(grnData, function (record) {
                                grnupdData.push(record.data);
                            });

              ;

                            var degrData = flxDetaildegr.getStore().getRange();                                        
                            var degrupdData = new Array();
                            Ext.each(degrData, function (record) {
                                degrupdData.push(record.data);
                            });

                            var edgrnData = flxDetail_old.getStore().getRange();                                        
                            var edgrnupdData = new Array();
                            Ext.each(edgrnData, function (record) {
                                edgrnupdData.push(record.data);
                            });

            
                            var eddegrData = flxDetaildegr_old.getStore().getRange();                                        
                            var eddegrupdData = new Array();
                            Ext.each(eddegrData, function (record) {
                                eddegrupdData.push(record.data);
                            });

	


                            Ext.Ajax.request({
                            url: 'TrnRMImportGRNSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(grnupdData),
				griddegr: Ext.util.JSON.encode(degrupdData), 
                             	edgriddet: Ext.util.JSON.encode(edgrnupdData),
				edgriddegr: Ext.util.JSON.encode(eddegrupdData), 
				cnt:grnData.length,
				degrcnt: degrData.length,  
				edcnt:edgrnData.length,
				eddegrcnt: eddegrData.length, 
				gstFlaggrn : gstFlag,                                 
				compcode:Gincompcode,
                                finid:GinFinid,
				edgrnno: txtgrnno.getValue(),
                                grnseqno : grnseqno,  
				poseqno: poseqno,
                                supcode : cmbPartyName.getValue(),
				ordseqno : cmbpono.getValue(),
                                invseqno : invseqno,
	                        agent    : agentcode,
				grndate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				wtcardno : cmbwtcard.getRawValue(),
				areacode: cmbArea.getValue(),
                                truck   : txtvehicle.getRawValue(),
			//	freighttype: frtype,
	
				itemval : txttotitemval.getValue(),

				sgstper: txtsgstper.getValue(),
				sgstamt: txtsgstval.getValue(),
				cgstper : txtcgstper.getValue(),
				cgstamt : txtcgstval.getValue(),
				igstper : txtigstper.getValue(),
				igstamt : txtigstval.getValue(),
				tcsper : txttcsper.getValue(),
				tcsamt: txttcsval.getValue(),
	
				freight:  txtfreight.getValue(),
                                otheramt : txtotherchrgs.getValue(),
				roundoff: txtroundoff.getValue(),
				totamt: txttotgrnval.getValue(),
				billno: cmbInvNo.getValue(),
				billdate:Ext.util.Format.date(dtpInvDate.getValue(),"Y-m-d"),
				billval: txtpartybillval.getValue(),

				frvouno:0,
				vouno:0,
				acctflag:'',
				accdate:'',
				status:'',
				usrcode:userid,
				entrydate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				gateentryno: txtgateno.getRawValue(),
				gatedate: Ext.util.Format.date(dtpgatedate.getValue(),"Y-m-d"),
 
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("GRN SAVED No.-" + obj['GRNNo']);
                                    TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
				    flxDetaildegr.getStore().removeAll();

                                    RefreshData();
				    TrnGrnformpanel.getForm().reset();
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
				url: 'ClsRMImportGRN.php',
				params:
				{
				    task:"loadreceipth",
				    edgrnno	: cmbgrnno.getValue()
				},
				callback : function() {
				
				
				receiptdt = loadaccupdhstore.getAt(0).get('rech_date');
				supledcode = loadaccupdhstore.getAt(0).get('sup_led_code');
				billnoh = loadaccupdhstore.getAt(0).get('rech_billno');
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
				
				}
			});
				
				loadaccupdtstore.removeAll();
				loadaccupdtstore.load({
					url: 'ClsRMImportGRN.php',
					params:
					{
					task:"loadreceiptt",
					edgrnno	: cmbgrnno.getValue()
					},
					callback : function() {
					var j=0, purvalue =0,PQTY =0, GQTY=0;
					for(j=0;j<loadaccupdtstore.getCount();j++){
						
						chkdel = j;
						
						gst =0;
			
						chklotno = loadaccupdtstore.getAt(j).get('rect_lotno');
						itemval2 = loadaccupdtstore.getAt(j).get('rect_itemvalue');
						portqty  = loadaccupdtstore.getAt(j).get('rect_billqty');
						lorrynot = loadaccupdtstore.getAt(j).get('wc_vehicleno');
						grnqtyt = loadaccupdtstore.getAt(j).get('rect_grnqty');
						frtval = loadaccupdtstore.getAt(j).get('rect_freightvalue');
						
				gst = (itemval2 * cgstph / 100) + (itemval2 * sgstph / 100) + (itemval2 * igstph / 100);
					

				purvalue = Number(purvalue) + (Number(itemval2) + Number(gst) );	
				PQTY = PQTY + Number(portqty);
         			GQTY = GQTY + Number(grnqtyt);					
						}
						
						
		                    Ext.Ajax.request({
		                    url: 'TrnRMGRNSave.php',
		                    params :
		                     {
					gstFlaggrn	: gstFlag,
					chkdel		: chkdel,
					compcode	: Gincompcode,
		                       finid		: GinFinid,
					edgrnno	        : cmbgrnno.getValue(),
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
					portqty 	: portqty,
					lorrynot	: lorrynot,
					grnqtyt	: grnqtyt,
					frtval		: frtval,
					purvalue	: purvalue,
					PQTY		: PQTY,
					GQTY		: GQTY,

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

				});
				}
				else {
				}

				}
				});               

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
TrnGrnformpanel.getForm().reset();
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
                            TrnGrnWindow.hide();
                        }
                }]
        },
        items: [tabgrn]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      : 620,
        width       : 1260,
        y           : 25,
        title       : 'IMPORT GRN ENTRY',
        items       : TrnGrnformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

//			Ext.getCmp('txtgrnno').setDisabled(true);
			Ext.getCmp('txtgrnno').show();
			Ext.getCmp('cmbgrnno').hide();
			Ext.getCmp('txtlifelessqty').hide();
                        dtpInvDate.disable();

Ext.getCmp('Confirm').setDisabled(true);					
			//txtgrnno.setFocus();
			//txtcgstper.setRawValue('2.5');
			//txtsgstper.setRawValue('2.5');
//			txtigstper.setDisabled(true);
			//txtigstval.setDisabled(true);
//			txttcsper.setDisabled(true);
//			txttcsval.setDisabled(true);
			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsRMImportGRN.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			userdatastore.removeAll();
			userdatastore.load({
                        	 url:'ClsRMImportGRN.php',
                        	 params:
                       		 {
                         	 task:"userdet",
				 userid : userid
                        	 },
				 
				 });
			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsRMImportGRN.php',
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
    });
    TrnGrnWindow.show();  
});
