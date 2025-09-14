Ext.onReady(function(){
   Ext.QuickTips.init();

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemgrpcode = 0;
	var gridedit = "false";
	var degrchk = "true";
	var editrow = 0;
	var FrePaidby = 0;

var dedqty;
var lifelessqty;
var pomoistureper,pooutthroper;
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

var Validatechk = "true";
var freitemcode =0;
var freqty =0;

var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;

var invspono;
var clclearing =0,clcgst =0; clsgst =0; cligst =0; clfrt =0, totfrt = 0;

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; 
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_millval, pdb_totedval, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;

var dgrecord = Ext.data.Record.create([]);
var dgrecordflxitem = Ext.data.Record.create([]);

 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
/*var loadfilldtstore = new Ext.data.Store({
      id: 'loadfilldtstore',
	autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
    });*/
    
var loaddispdegritemstore = new Ext.data.Store({
      id: 'loaddispdegritemstore',
	autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddispdegritem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','itmh_code'
      ])
    });
        
 var loadthirddatastore = new Ext.data.Store({
      id: 'loadthirddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadagent"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sagt_code', type: 'int',mapping:'sagt_code'},
	{name:'sagt_name', type: 'string',mapping:'sagt_name'}
      ]),
    });

	var loadponodatastore = new Ext.data.Store({
      id: 'loadponodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invh_invoiceno', 'invh_seqno'
      ]),
    });

	var loadpoitemdatastore = new Ext.data.Store({
	id: 'loadpoitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImGrn.php',      // File to connect to
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
		url: 'ClsRMImGrn.php',      // File to connect to
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
	var loadInvdetdatastore = new Ext.data.Store({
	id: 'loadInvdetdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadinvsdt"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_no', 'invh_poseqno', 'invh_date', 'ordh_date', 'invh_cvdval', 'invh_cvdeduval', 'invh_exchangerate', 'invh_netduty', 'invh_cnfcharges', 'invh_qty'
	]),
	});	
	var loadpoheaderdatastore = new Ext.data.Store({
	id: 'loadpoheaderdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadpoheader"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_refno', 'ordh_sup_code', 'ordh_agent_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_origincountry', 'ordh_originport', 'ordh_arrivalport', 'ordh_paymode', 'ordh_lcdays', 'ordh_nagodays', 'ordh_creditdays', 'ordh_interstatus', 'ordh_payterms', 'ordh_remarks', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_itemcurvalue', 'ordh_exrate', 'ordh_totalcurvalue', 'ordh_itemvalue', 'ordh_roundingoff','ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'cancelflag'
	]),
	});
	
	var loadvewhandlingdatastore = new Ext.data.Store({
	id: 'loadvewhandlingdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadvewhand"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'invh_seqno', 'invh_compcode', 'invh_fincode', 'invh_invoiceno', 'invh_invoicerefno', 'invh_poseqno', 'invh_lcdseqno', 'invh_highseascomp', 'invh_sup_code', 'invh_date', 'invh_paymode', 'invh_creditdays', 'invh_origincountry', 'invh_originport', 'invh_arrivalport', 'invh_vesselname', 'invh_partybank', 'invh_lcbank', 'invh_doccleared', 'invh_bankrefno', 'invh_billladingno', 'invh_billladingdate', 'invh_shipmentdate', 'invh_billentryno', 'invh_billentrydate', 'invh_expecarrdate', 'invh_cararrdate', 'invh_exchangerate', 'invh_invcurvalue', 'invh_invoicevalue', 'invh_landcosper', 'invh_basicdutyper', 'invh_specdutyper', 'invh_landcostval', 'invh_basicdutval', 'invh_specdutval', 'invh_totduty', 'invh_dutyroundoff', 'invh_netduty', 'invh_igst_per', 'invh_igst_amt', 'invh_cnfagentcode', 'invh_linercode', 'invh_cnfcharges', 'invh_linercharges', 'invh_boeexrate', 'invh_status', 'invh_bestatus', 'invh_partyaccstat', 'invh_partyvouno', 'invh_dutyaccstat', 'invh_dutyvouno', 'invh_jv_vouno', 'invh_usr_code', 'invh_entry_date', 'invh_content', 'invh_brightness', 'invh_dateofprint', 'invh_printdate', 'invh_outthrows', 'invh_consstatus', 'invh_qtystatus', 'invh_educessper', 'invh_educessval', 'invh_cvdper', 'invh_cvdval', 'invh_cvdeduper', 'invh_cvdeduval', 'invh_interest', 'invh_duty_by_mill', 'invh_duty_depb_yn', 'invh_agent', 'inv_hdcode', 'inv_supcode', 'inv_billno', 'inv_billdate', 'inv_cfs_charges', 'inv_liner_charges', 'inv_cha_charges', 'inv_demmurage_charges', 'inv_service_charges', 'inv_other_charges', 'inv_taxable', 'inv_cgst_per', 'inv_sgst_per', 'inv_igst_per', 'inv_cgst_amt', 'inv_sgst_amt', 'inv_igst_amt', 'inv_bill_amount', 'inv_liner_by', 'inv_cha_supcode', 'inv_freight', 'inv_rcno', 'inv_rcdate', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax','sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'cha_code', 'cha_name'
	]),
	});
		
	var loadgrnnodatastore = new Ext.data.Store({
      id: 'loadgrnnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
    var loadgrndetaildatastore = new Ext.data.Store({
      id: 'loadgrndetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_sgst_per', 'rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_edamount', 'rech_servicecharge', 'rech_freight', 'rech_roundingoff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_educessamount', 'rech_geno', 'rech_gedate', 'sup_type', 'ordh_no', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper'
      ]),
    });

    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'grn_item', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_educessper', 'rect_educessamount', 'itmh_ledcode', 'act_rect_qty' 
      ]),
    });

    var loadwtcarddatastore = new Ext.data.Store({
      id: 'loadwtcarddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invt_pen_qty','invt_itemcurrate'
      ]),
    });
var loadordqtydatastore = new Ext.data.Store({
      id: 'loadordqtydatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadordqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordt_moisper', 'ordt_outthroughper', 'ordt_edpercentage', 'ordt_educessper'
      ]),
    });    

var loadamnddatastore = new Ext.data.Store({
      id: 'loadamnddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImGrn.php',      // File to connect to
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
                url: 'ClsRMImGrn.php',      // File to connect to
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
        style       :  {textTransform: "uppercase"},
	readOnly : true,
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
	else if (txtbillqty.getValue()==0 || txtbillqty.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtbillqty.focus();
	}
	else if (Number(txtbillqty.getValue()) >  Number(txtpendqty.getValue()))
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
		txtbillqty.focus();
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

var itemtcs =0;
		var Rowk= flxDetail.getStore().getCount();
        	flxDetail.getSelectionModel().selectAll();

		flxitem.getSelectionModel().selectAll();
		var selk=flxDetail.getSelectionModel().getSelections();
		var selj=flxitem.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{
			if (totgrnqty > 0){
				if (txttcsval.getValue() > 0 ) { itemtcs=0;
					itemtcs = (Number(txttcsval.getValue()) / totgrnqty) * Number(selk[i].data.grnqty);
				}
				if (frtype === "1" ){
					pdb_costvalue = Ext.util.Format.number(
					(Number(selk[i].data.itemvalue) + (Number(txtservicecharges.getValue()) / totgrnqty) * Number(selk[i].data.grnqty)  + itemtcs ) ,"0.00");


                       			pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.grnqty)), "0.00000");
				}
				else {
					pdb_costvalue = Ext.util.Format.number(
(Number(selk[i].data.itemvalue) + (Number(txtservicecharges.getValue()) / totgrnqty) * Number(selk[i].data.grnqty)  + Number(selj[i].data.frvalue) + itemtcs ) ,"0.00");


                      			pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.grnqty)), "0.00000");
				}

			}
			else {
				pdb_costvalue = 0;
			        pdb_costrate = 0;
			}
selk[i].set('costval', pdb_costvalue);
selk[i].set('costrate', pdb_costrate);
		}
						


}

function calcostdegr(){

var itemtcs =0;
		var Rowjk= flxDetail.getStore().getCount();
		var Rowk= flxDetaildegr.getStore().getCount();
        	flxDetaildegr.getSelectionModel().selectAll();

		flxitem.getSelectionModel().selectAll();
		var selk=flxDetaildegr.getSelectionModel().getSelections();
		var selj=flxitem.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{

			if (totgrndrqty > 0){
				var frevalue = 0;
if(Number(selj[i+Rowjk].data.frvalue) > 0){frevalue = Number(selj[i+Rowjk].data.frvalue);}
				
				if (txttcsval.getValue() > 0 ) { itemtcs=0;
					itemtcs = (Number(txttcsval.getValue()) / totgrndrqty) * Number(selk[i].data.degrgrnqty);
				}
				if (frtype === "1" ){
					pdb_costvalue = Ext.util.Format.number(
					(Number(selk[i].data.degritemvalue) + (Number(txtservicecharges.getValue()) / totgrndrqty) * Number(selk[i].data.degrgrnqty)  + itemtcs ) ,"0.00");


                       			pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.degrgrnqty)), "0.00000");
				}
				else {
					pdb_costvalue = Ext.util.Format.number(
(Number(selk[i].data.degritemvalue) + (Number(txtservicecharges.getValue()) / totgrndrqty) * Number(selk[i].data.degrgrnqty)  + frevalue + itemtcs ) ,"0.00");


                      			pdb_costrate = Ext.util.Format.number((pdb_costvalue / Number(selk[i].data.degrgrnqty)), "0.00000");
				}

			}
			else {
				pdb_costvalue = 0;
			        pdb_costrate = 0;
			}
selk[i].set('costval', pdb_costvalue);
selk[i].set('costrate', pdb_costrate);
		}
						


}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;

function CalJKFreight() {

	txttonnage.setValue('0');
	txtload.setValue('0');
	freitemcode = 0;totfretnlorry =0; totfretntipper = 0;chkitemt = 0; chkiteml = 0;
	tongrid = 0; lodgrid =0; tongridtot =0; lodgridtot =0; valoffreight =0;callodfr =0;

	var Row= flxitem.getStore().getCount();
	if (Row > 0 ) {
		flxitem.getSelectionModel().selectAll();
		flxDetail.getSelectionModel().selectAll();
		var sel=flxitem.getSelectionModel().getSelections();
		var seljk=flxDetail.getSelectionModel().getSelections();
		var chkitemt = loadfreighttondatastore.getCount();
		var chkiteml = loadfreightloddatastore.getCount();
		for(var i=0;i<Row;i++)
		{ 
			if (chkitemt > 0) {
			for(var j=0;j<chkitemt;j++)
			{
				if(loadfreighttondatastore.getAt(j).get('aif_itmh_code') === sel[i].data.itemcode && loadfreighttondatastore.getAt(j).get('aif_area_code') === fareacode ) { 
					tongrid = 0;
					//Format$((Val(prs_tonfreight!aif_tonfreight) + (Val(flx_itemdet.TextMatrix(pin_cnt, 27)))) * (Val(flx_itemdet.TextMatrix(pin_cnt, 3))), "0.00")
						tongrid = sel[i].data.qty * loadfreighttondatastore.getAt(j).get('aif_tonfreight');
						sel[i].set('tonfreight', Ext.util.Format.number(tongrid,"0.00"));

				tongridtot = Number(tongridtot) + Number(tongrid);

				}
			}//for(var j=0;j<chkitemt;j++)
			}//if (chkitemt > 0)
		
			if (chkiteml > 0) {	
			for(var j=0;j<chkiteml;j++)
			{

		
				if(loadfreightloddatastore.getAt(j).get('arf_area_code') === fareacode) {
					callodfr=0;
					lodgrid = (loadfreightloddatastore.getAt(j).get('arf_loadfreight'));

					callodfr = (lodgrid / freqty) * (Number(sel[i].data.qty));

						
					sel[i].set('LoadFreight', Ext.util.Format.number(callodfr,"0.00"));
						
						
					
					lodgridtot = Number(lodgridtot) + Number(callodfr);
				}
			}//for(var j=0;j<chkiteml;j++)
			}//if (chkiteml > 0)

				if (Number(tongrid) > Number(callodfr)){
					
					sel[i].set('frvalue', Ext.util.Format.number(callodfr,"0.00"));
					

				}
				else{
					if (Number(tongrid) > 0) {
						sel[i].set('frvalue', Ext.util.Format.number(tongrid,"0.00"));
					}
					else {
						sel[i].set('frvalue', Ext.util.Format.number(callodfr,"0.00"));
					}
				}
		



		}//for(var i=0;i<Row;i++)

			txttonnage.setValue(Ext.util.Format.number(tongridtot,"0.00"));
			txtload.setValue(Ext.util.Format.number(lodgridtot,"0.00"));
			//if (frtype === "3" || frtype === "0" || frtype === "2"){
				
				if (Number(txttonnage.getValue()) > Number(txtload.getValue())){
					valoffreight = txtload.getValue();
					txtfreight.setValue(txtload.getValue());
					

				}
				else{
					valoffreight = txttonnage.getValue();
					txtfreight.setValue(txttonnage.getValue());
				}
			//}
			//else{
			//	txtfreight.setValue('0');  valoffreight = 0;
			//}

  	grid_tot();CalDegrval();
	} //if (Row > 0 )

}//function CalTonFreight()


function refresh(){

txtpendqty.reset();
txtbillqty.reset();
txtmillqty.reset();
txtmoisper.reset();
txtmoisqty.reset();
txttareqty.reset();
txtlifelessqty.reset();
txtrejqty.reset();
txtdegradeqty.reset();
txtdedqty.reset();
txtgrnqty.reset();
txtrate.reset();
txtrateded.reset();
txtitemval.reset();
cmblot.reset();	

			
}

function dispdegritem(){
	sltdegritemcode = 0;

	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
	{
		if (sel[i].data.degrqty > 0) {
			sltdegritemcode = sltdegritemcode + "," + sel[i].data.itemcode;
		}
	}
	
	loaddispdegritemstore.removeAll();
	loaddispdegritemstore.load({
		url: 'ClsRMImGrn.php',
		params:
		{
		    task:"loaddispdegritem",
		    sltdegritemcode : sltdegritemcode
		}	
	});
}

function newcalmethod(){

var pdb_totval, pdb_totqty , pdb_totbillqty;

    pdb_totval = 0;
    pdb_totqty = 0;
    pdb_totbillqty = 0;
    
    	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
	{
		pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(sel[i].data.ditemvalue)), "0.00");
		pdb_totqty = Ext.util.Format.number(Number(pdb_totqty) + Number(sel[i].data.grnqty),"0.000");
		pdb_totbillqty = Ext.util.Format.number(Number(pdb_totbillqty) + Number(sel[i].data.billqty),"0.000");
	}
	
	var Rowdr = flxDetaildegr.getStore().getCount();
	flxDetaildegr.getSelectionModel().selectAll();
	var seldr=flxDetaildegr.getSelectionModel().getSelections();
	for(var i=0;i<Rowdr;i++)
	{
	    pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(seldr[i].data.degritemvalue)), "0.00");
	    pdb_totqty = Ext.util.Format.number(Number(pdb_totqty) + Number(seldr[i].data.degrgrnqty),"0.000");
	}	

       txttotitemvalD.setValue(Ext.util.Format.number(pdb_totval, "0.00"));
       txttotitemqty.setValue(Ext.util.Format.number(pdb_totqty, "0.000"));
       txtTMillqty.setValue(pdb_totbillqty);
       
   /* Dim PinCvd As Long
    Dim PinEducvd As Long
	if (txtTMillqty.getValue() > 0 && txtInvqty.getValue() > 0) Then
        txtclrchg.setValue(Ext.util.Format.number((txttotclrchg.getValue() / txtInvqty.getValue()) * txtTMillqty.getValue(), "0.00"));
        
        txtcgstval.setValue( Ext.util.Format.number((txtcgstper.setValue() / txtInvqty.getValue()) * Val(lbl_recmillqty.Caption), "0.00"));
        txtsgstval.setValue( Ext.util.Format.number((txtsgstper.setValue() / txtInvqty.getValue()) * Val(lbl_recmillqty.Caption), "0.00"));
        txtigstval.setValue( Ext.util.Format.number((txtigstper.setValue() / txtInvqty.getValue()) * Val(lbl_recmillqty.Caption), "0.00"));
    
    ElseIf fin_status = 0 Then
        txt_clearingcharges.Text = Format$(0, "0.000")
        txt_custduty.Text = Format$(0, "0.000")
    End If       */
        
        txttotitemval.setValue(Ext.util.Format.number((txttotitemvalD.getValue() * txtexcrate.getValue()), "0.00"));
        
	pdb_totgrn_value = Number(txttotitemval.getValue()) + Number(txtclrchg.getValue()) + Number(txtlocalFrChrg.getValue());
        
	txttotgrnval.setValue(Ext.util.Format.number(pdb_totgrn_value, "0.00"));
    	txtroundoff.setValue(Ext.util.Format.number(txttotgrnval.getValue() - pdb_totgrn_value, "0.00"));
}



var pdb_totqty =0;

function grid_tot(){

	pdb_totval = 0;
	pdb_totedval = 0;
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

	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) + Number(txtservicecharges.getValue()));

	txtcgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtcgstper.getValue()/100,"0"));
	txtsgstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtsgstper.getValue()/100,"0"));
	txtigstval.setValue(Ext.util.Format.number(Number(pdb_totvalnew + totgrndrvalue)*txtigstper.getValue()/100,"0"));

   	 var tcs_calc =0;

    	tcs_calc = Number(pdb_totvalnew) + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue());
	txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));

	txtotherchrgs.setRawValue(Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtigstval.getValue())+Number(txtservicecharges.getValue()));

	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) + Number(txtservicecharges.getValue()));
	txtlandingcost.setRawValue(Number(txttotgrnval.getValue()) - Number(txtotherchrgs.getValue()));
	
calcost(); 

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

    txtcgstval.setRawValue(Ext.util.Format.number((txtcgstper.getValue() * (Number(txttotitemval.getValue()) / 100) ),"0"));
    txtsgstval.setRawValue(Ext.util.Format.number((txtsgstper.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));
    txtigstval.setRawValue(Ext.util.Format.number((txtigstper.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));

    txtotherchrgs.setRawValue(Ext.util.Format.number((txtcgstval.getValue() + txtsgstval.getValue() + txtigstval.getValue() + txtservicecharges.getValue()), "0"));

    txtservicecharges.setRawValue(Ext.util.Format.number(txtservpermt.getValue() * txttotitemqty.getValue() , "0"));


}

function calvalqty(){
	txtdedqty.setValue(Ext.util.Format.number(Number(txtoutthroqty.getValue())+Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
	txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txtdedqty.getValue(),'0.000'));	
	txtitemval.setValue(Ext.util.Format.number((txtbillqty.getValue() - txtdegradeqty.getValue())*(txtrate.getValue() - txtrateded.getValue()),"0.00"));	
		

}
var btnSubmit = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "ADD",
    width   : 95,
    height  : 30,
    x       : 860,
    y       : 150,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    
var gcgst,gsgst,gigst;
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
		        
		    if (txtcgstval.getValue() > 0 && txtmillqty.getValue() > 0) {
		       gcgst = Ext.util.Format.number(((txtcgstval.getValue() / txttotqty.getValue()) * (txtbillqty.getValue() )), "0.00")
		    }
		    if (txtsgstval.getValue() > 0 && txtmillqty.getValue() > 0) {
		       gsgst = Ext.util.Format.number(((txtsgstval.getValue() / txttotqty.getValue()) * (txtbillqty.getValue()) ), "0.00")
		    }
		    
		    if (txtigstval.getValue() > 0 && txtmillqty.getValue() > 0) {
		       gigst = Ext.util.Format.number(((txtigstval.getValue() / txttotqty.getValue()) * (txtbillqty.getValue() )), "0.00")
		    }		        
		        
		        
		if(gridedit === "true")
		{

				var itemseq = cmbitem.getValue();
				//alert(cmbunloadparty.getValue());
				Ext.getCmp('cmbitem').setDisabled(false);

				txttonnage.setValue('0');
				valoffreight = 0;
				txtfreight.setValue('0');
				
				

			gridedit = "false";

			//var idxitem = flxitem.getStore().indexOf(editrow);
			var idx = flxDetail.getStore().indexOf(editrow);

			sel[idx].set('itemcode', cmbitem.getValue());
			sel[idx].set('itemname', cmbitem.getRawValue());
			sel[idx].set('ordqty', txtpendqty.getRawValue());
			sel[idx].set('billqty', txtbillqty.getRawValue());
			sel[idx].set('millqty', txtmillqty.getValue());
			sel[idx].set('moisper', txtmoisper.getValue());
			sel[idx].set('moisqty', txtmoisqty.getValue());
			sel[idx].set('tarqty', txttareqty.getValue());
			sel[idx].set('llqty', txtlifelessqty.getValue());
			sel[idx].set('rejqty', txtrejqty.getValue());
			sel[idx].set('degrqty', txtdegradeqty.getRawValue());

			sel[idx].set('totded', txtdedqty.getValue());
			sel[idx].set('grnqty', txtgrnqty.getValue());
			sel[idx].set('itemrate', txtrate.getValue());
			sel[idx].set('rateded', txtrateded.getValue());
			sel[idx].set('itemvalue' ,txtitemval.getValue());
			sel[idx].set('lotno', cmblot.getRawValue());

			sel[idx].set('remarks', txtRemarks.getValue());
			sel[idx].set('lotcode', cmblot.getValue());
			sel[idx].set('pregrnqty', txtgrnqty.getValue());


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

			 		    /*var RowCnt = flxitem.getStore().getCount() + 1;
					    flxitem.getStore().insert(
						flxitem.getStore().getCount(),
						new dgrecord({
						    	slno:RowCnt,
							itemcode:cmbitem.getValue(),
						    	itemname:cmbitem.getRawValue(),
						    	qty:gridfreqty,
							wheeltype : cmbWheeltype.getRawValue(),
							geno: txtGIENo.getValue()

						}) 
						);*/

					}

				}

				for (var i=0;i<selrowsf;i++)
				{
				
					freqty = freqty + Number(selfi[i].data.qty);
					
				}
					
					//CalJKFreight();
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
					itemcode:cmbitem.getValue(),//0
		                    	itemname:cmbitem.getRawValue(),
				    	ordqty:txtpendqty.getRawValue(),
				    	billqty:txtbillqty.getRawValue(),
					millqty:txtmillqty.getRawValue(),
					moisper:txtmoisper.getRawValue(),
					moisqty:txtmoisqty.getRawValue(),
					tarqty:txttareqty.getRawValue(),
					llqty:txtlifelessqty.getRawValue(),
					rejqty:txtrejqty.getRawValue(),
					degrqty:txtdegradeqty.getRawValue(),
					totded:txtdedqty.getRawValue(),
					grnqty:txtgrnqty.getRawValue(),
					ditemrate:txtrate.getRawValue(),
					drateded:txtrateded.getRawValue(),
					ditemvalue:txtitemval.getRawValue(),
					lotno:cmblot.getRawValue(),
					remarks:txtRemarks.getValue(),
					lotcode: cmblot.getValue(),
					otper:txtoutthroper.getValue(),
					otqty:txtoutthroqty.getValue(),
					adjqty:0 ,
					premillqty:txtbillqty.getValue(),
					prebillqty:txtmillqty.getValue(),
					cgst:gcgst,
					sgst:gsgst,
					igst:gigst

		                }) 
		                );

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
					dispdegritem();					
		                    	newcalmethod();
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

var dtpbilldate = new Ext.form.DateField({
    fieldLabel : 'Order Date',
    id         : 'dtpbilldate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
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
        typeAhead       : true,
        mode            : 'local',
        store           : loadpoitemdatastore,
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

	if (edpono > 0) { //Edit
		pono = edpono;
		chkstatus = "E"
				
		loadamnddatastore.removeAll();
		loadamnddatastore.load({
		url: 'ClsRMImGrn.php',
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
		url: 'ClsRMImGrn.php',
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
		url: 'ClsRMImGrn.php',
		params:
		{
			task:"loaditemqty",
			pono : pono,
			item : cmbitem.getValue()
			
		},
	callback:function()
	{
	
		txtpendqty.setValue(loaditemqtydatastore.getAt(0).get('invt_pen_qty') + chkgrnqty);
		txtrate.setValue(loaditemqtydatastore.getAt(0).get('invt_itemcurrate'));

	
	}
	});	
	loadordqtydatastore.removeAll();
	loadordqtydatastore.load({
		url: 'ClsRMImGrn.php',
		params:
		{
			task:"loadordqty",
			pono : pono,
			item : cmbitem.getValue()
			
		},
	callback:function()
	{
	
		txtmoisper.setValue(loadordqtydatastore.getAt(0).get('ordt_moisper'));
		txtoutthroper.setValue(loadordqtydatastore.getAt(0).get('ordt_outthroughper'));

		dedqty = 0;
		pomoistureper = (loadordqtydatastore.getAt(0).get('ordt_moisper'));
		pooutthroper = (loadordqtydatastore.getAt(0).get('ordt_outthroughper'));

		
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
		flxitem.getStore().removeAll();
		tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
		loadgrndetaildatastore.removeAll();//sprm_sel_recheddet
            	loadgrndetaildatastore.load({
                url: 'ClsRMImGrn.php',
                params:
                {
                    task:"loadgrndetail", 
                    finid: GinFinid,
		    compcode: Gincompcode,
		    grnno: cmbgrnno.getValue(),
		    gstFlag : gstFlag
                },
		callback:function(){
			

			dtpgrndate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_date'),'d-m-Y'));
			cmbsupplier.setValue(loadgrndetaildatastore.getAt(0).get('rech_sup_code'));
			loadfreighttondatastore.removeAll();
			loadfreighttondatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadfreightton",
				    suplrcode :loadgrndetaildatastore.getAt(0).get('rech_sup_code')
				}
			});
			loadfreightloddatastore.removeAll();
			loadfreightloddatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadfreightlod",
				    suplrcode :loadgrndetaildatastore.getAt(0).get('rech_sup_code')
				}
			});
			if(loadgrndetaildatastore.getAt(0).get('rech_sup_code') === loadgrndetaildatastore.getAt(0).get('rech_agent_code'))
			{
				Ext.getCmp('cmbagent').setDisabled(true);
			}

			txtgateno.setValue(loadgrndetaildatastore.getAt(0).get('rech_geno'));
			dtpgatedate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtbillno.setValue(loadgrndetaildatastore.getAt(0).get('rech_billno'));
			dtpbilldate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_billdate'),'d-m-Y'));
			cmbpono.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_no'));
			//cmbpono.setValue(loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno'));
			Ext.getCmp('cmbpono').setDisabled(true);
			edpono = loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');
			edfradvvouno = loadgrndetaildatastore.getAt(0).get('rech_fradvvouno');
			edfreightadvance = loadgrndetaildatastore.getAt(0).get('rech_freightadvance');
			txtpartybillval.setValue(loadgrndetaildatastore.getAt(0).get('rech_billvalue'));
			stper = 0; scper = 0;
			if((loadgrndetaildatastore.getAt(0).get('rech_stper')) !== "0.00"){ 
				stper = loadgrndetaildatastore.getAt(0).get('rech_stper');
			}
			if((loadgrndetaildatastore.getAt(0).get('rech_scper')) !== "0.00"){ 
				scper = loadgrndetaildatastore.getAt(0).get('rech_scper');
			}
			loadpoitemdatastore.removeAll();
			    loadpoitemdatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadpoitem",
				    compcode: Gincompcode,
				    finid: GinFinid,
				    ordcode: edpono
				}
			    });
			txtcgstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_cgstper'));
			txtsgstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_sgstper'));
			txtigstper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_igstper'));
			txtigstval.setDisabled(true);
			txttcsper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_tcsper'));
			txttcsval.setDisabled(true);
			if((loadgrndetaildatastore.getAt(0).get('rech_servicecharge')) !== "0.00"){ 
				txtservpermt.setValue(loadgrndetaildatastore.getAt(0).get('rech_servicecharge'));
			}
			edsuptype = loadgrndetaildatastore.getAt(0).get('sup_type');
			edacctflag = loadgrndetaildatastore.getAt(0).get('rech_acctflag');
			
			loadwtcarddatastore.removeAll();//sp_sel_wtcards
			loadwtcarddatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadwtcard", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    supcode: loadgrndetaildatastore.getAt(0).get('rech_sup_code'),
				    finmodtype: 0,
				    finrecpttype: 0,
				    grnno: cmbgrnno.getValue()
				},
				callback : function(){}


			});
			cmbwtcard.setValue(loadgrndetaildatastore.getAt(0).get('rech_wtcardno'));
			
			loadwtcarddtdatastore.removeAll();
			    loadwtcarddtdatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadwtcarddt",
				    compcode: Gincompcode,
				    finid: GinFinid,
				    wtcode: loadgrndetaildatastore.getAt(0).get('rech_wtcardno')
				},
				scope: this,
				callback: function()
				{

					txtarea.setValue(loadwtcarddtdatastore.getAt(0).get('area_name'));
					txtvehicle.setValue(loadwtcarddtdatastore.getAt(0).get('wc_vehicleno'));
					txttransport.setValue(loadwtcarddtdatastore.getAt(0).get('wc_transportname'));
					fareacode = loadwtcarddtdatastore.getAt(0).get('wc_area_code');
					
					 

					
				}
			    });

			cmbThirdParty.setValue(loadgrndetaildatastore.getAt(0).get('rech_frpartycode'));
			FrePaidby = loadgrndetaildatastore.getAt(0).get('rech_freighttype');
			Ext.getCmp('optfrtype').setValue(Number(FrePaidby));
			fareacode = loadgrndetaildatastore.getAt(0).get('rech_area_code');
			loadgrnitemdetaildatastore.removeAll();//sprm_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    grnno: cmbgrnno.getValue(),
				    ordno: edpono
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
				    		ordqty: loadgrnitemdetaildatastore.getAt(i).get('ordqty'),
					    	billqty: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
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
						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_no'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						bags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),
						pregrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);   
					flxDetail_old.getStore().insert(
					flxDetail_old.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
				    		ordqty: loadgrnitemdetaildatastore.getAt(i).get('ordqty'),
					    	billqty: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
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
						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_no'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						bags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),
						pregrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);     
						//var RowCnt2 = flxitem.getStore().getCount(); 
						flxitem.getStore().insert(
						flxitem.getStore().getCount(),
						new dgrecord({
							slno: i + 1,
							itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						    	itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						    	qty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);    
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
						degrlotno: loadgrnitemdetaildatastore.getAt(i).get('lot_no'),
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
						degrlotno: loadgrnitemdetaildatastore.getAt(i).get('lot_no'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
						degrlotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						degrbags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),


						}) 
						); 
//						var RowCnt2 = flxitem.getStore().getCount();
						flxitem.getStore().insert(
						flxitem.getStore().getCount(),
						new dgrecord({
							slno: i + 1,
							itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
						    	itemname: loadgrnitemdetaildatastore.getAt(i).get('grn_item'),
						    	qty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);  
				    totgrndrqty=Number(totgrndrqty)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'));
				    totgrndrvalue=Number(totgrndrvalue)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'));
				    grndrrate=Number(grndrrate)+Number(loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'));
				    freqty = freqty +  Number(loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'));
					} //else condition1
			 

					}//For Loop
				 grid_tot(); CalculateTax();CalDegrval(); grid_tot(); CalJKFreight();

				}//callback function loadgrnitemdetail

			});//loadgrnitemdetail
			//Freight Details




		}
		});//loadgrndetaildatastore
//if (edacctflag != '') {
//	Ext.Msg.alert("Sorry!!! A/C updatation has been done <br> <br> U can View the Data, Edit Option not Allowed");

//}


	if (userdatastore.getAt(0).get('usr_type') === "1") {

}



	}
	}

   });


var cmbwtcard = new Ext.form.ComboBox({
        fieldLabel      : 'Wt.Card',
        width           : 150,
        displayField    : 'wc_no', 
        valueField      : 'wc_seqno',
        hiddenName      : '',
        id              : 'cmbwtcard',
        typeAhead       : true,
        mode            : 'local',
        store           : loadwtcarddatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	autoSelect	: true,
	listeners:{
 	select: function(){

		loadwtcarddtdatastore.removeAll();
		    loadwtcarddtdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadwtcarddt",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    wtcode: cmbwtcard.getValue()
			},
			
			callback: function()
			{
				txtarea.setValue(loadwtcarddtdatastore.getAt(0).get('area_name'));
				txtvehicle.setValue(loadwtcarddtdatastore.getAt(0).get('wc_vehicleno'));
				txttransport.setValue(loadwtcarddtdatastore.getAt(0).get('wc_transportname'));
				fareacode = loadwtcarddtdatastore.getAt(0).get('wc_area_code');
				
				CalJKFreight(); //Hold for RawMaterial on 10 Apr 2021

				
			}
		    });
	},
	change: function(){
		loadwtcarddtdatastore.removeAll();
		    loadwtcarddtdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadwtcarddt",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    wtcode: cmbwtcard.getValue()
			},
			scope: this,
			callback: function()
			{
				txtarea.setValue(loadwtcarddtdatastore.getAt(0).get('area_name'));
				txtvehicle.setValue(loadwtcarddtdatastore.getAt(0).get('wc_vehicleno'));
				txttransport.setValue(loadwtcarddtdatastore.getAt(0).get('wc_transportname'));
				fareacode = loadwtcarddtdatastore.getAt(0).get('wc_area_code');
				
				CalJKFreight(); //Hold for RawMaterial on 10 Apr 2021

				
			}
		    });
	},

	/*afterrender: function()
	{
		loadwtcarddtdatastore.removeAll();
		    loadwtcarddtdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadwtcarddt",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    wtcode: cmbwtcard.getValue()
			},
			scope: this,
			callback: function()
			{
				txtarea.setValue(loadwtcarddtdatastore.getAt(0).get('area_name'));
				txtvehicle.setValue(loadwtcarddtdatastore.getAt(0).get('wc_vehicleno'));
				txttransport.setValue(loadwtcarddtdatastore.getAt(0).get('wc_transportname'));
				fareacode = loadwtcarddtdatastore.getAt(0).get('wc_area_code');
				
				CalJKFreight(); //Hold for RawMaterial on 10 Apr 2021

				
			}
		    });
	}*/
	}

   });

var cmbpono = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 100,
        displayField    : 'invh_invoiceno',  
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbpono',
        typeAhead       : true,
        mode            : 'local',
        store           : loadponodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
 	select: function(){
	tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
		loadpoitemdatastore.removeAll();
		    loadpoitemdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadpoitem",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbpono.getValue()
			}
		    });

		loadwtcarddatastore.removeAll();
		    loadwtcarddatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadwtcard",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    supcode: cmbsupplier.getValue(),
			    finmodtype: 0,
			    finrecpttype: 0,
			    grnno: 0
			}
			
		    });
			loadfreighttondatastore.removeAll();
			loadfreighttondatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadfreightton",
				    suplrcode :cmbsupplier.getValue()
				}
			});
			loadfreightloddatastore.removeAll();
			loadfreightloddatastore.load({
				url: 'ClsRMImGrn.php',
				params:
				{
				    task:"loadfreightlod",
				    suplrcode :cmbsupplier.getValue()
				}
			});
		loadInvdetdatastore.removeAll();
		loadInvdetdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadinvsdt",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbpono.getValue()
			},
			callback : function()
			{
				txtexcrate.setValue(loadInvdetdatastore.getAt(0).get('invh_exchangerate'));	
				dtpinvsdate.setValue(Ext.util.Format.date(loadInvdetdatastore.getAt(0).get('invh_date'),'d-m-Y'));
				txtbillno.setValue(loadInvdetdatastore.getAt(0).get('ordh_no'));			
				dtpbilldate.setValue(Ext.util.Format.date(loadInvdetdatastore.getAt(0).get('ordh_date'),'d-m-Y'));
				invspono = loadInvdetdatastore.getAt(0).get('invh_poseqno');
				txttotqty.setValue(Ext.util.Format.number(loadInvdetdatastore.getAt(0).get('invh_qty'),"0.000"));
				txttotclrchg.setValue(loadInvdetdatastore.getAt(0).get('invh_cnfcharges'));
				
			}
		});		
		loadpoheaderdatastore.removeAll();

		    loadpoheaderdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadpoheader",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    invspono: cmbpono.getValue()
			},
			scope : this,
			callback : function()
			{	
				
				
				FrePaidby = loadpoheaderdatastore.getAt(0).get('ordh_frttype');
				//Ext.getCmp('optfrtype').setValue(Number(FrePaidby));
				
			CalculateTax();
				
			}
		    });   
		    
		    loadvewhandlingdatastore.removeAll();
		    loadvewhandlingdatastore.load({
			url: 'ClsRMImGrn.php',
			params:
			{
			    task:"loadvewhand",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbpono.getValue()
			},
			scope : this,
			callback : function()
			{
				for(var i=0;i<loadvewhandlingdatastore.getCount();i++)
				{
					clclearing = clclearing + Number(loadvewhandlingdatastore.getAt(i).get('inv_cfs_charges')) + Number(loadvewhandlingdatastore.getAt(i).get('inv_liner_charges')) + Number(loadvewhandlingdatastore.getAt(i).get('inv_cha_charges')) + Number(loadvewhandlingdatastore.getAt(i).get('inv_demmurage_charges')) + Number(loadvewhandlingdatastore.getAt(i).get('inv_other_charges')) + Number(loadvewhandlingdatastore.getAt(i).get('inv_service_charges'));
                    			clcgst = clcgst + Number(loadvewhandlingdatastore.getAt(i).get('inv_cgst_amt'));
                    			clsgst = clsgst + Number(loadvewhandlingdatastore.getAt(i).get('inv_sgst_amt'));
                    			cligst = cligst + Number(loadvewhandlingdatastore.getAt(i).get('inv_igst_amt'));
                    			clfrt = clfrt + Number(loadvewhandlingdatastore.getAt(i).get('inv_freight'));
				}
					txttotclrchg.setValue(clclearing);
        txtcgstper.setValue(clcgst);
        txtsgstper.setValue(clsgst);
        txtigstper.setValue(cligst);
        totfrt = clfrt;
			}	    
		    });


        

	}
	}


   });

var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Party',
        width           : 250,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbsupplier',
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

	loadponodatastore.removeAll();
            loadponodatastore.load({
                url: 'ClsRMImGrn.php',
                params:
                {
                    task:"loadpono",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    supcode : cmbsupplier.getValue()
                },
		callback : function(){
			//if (loadponodatastore.getCount() <=0){
				//Ext.getCmp('cmbagent').setDisabled(false);
				loadagentdatastore.removeAll();
				loadagentdatastore.load({
					url: 'ClsRMImGrn.php',
					params:
					{
					task:"loadagent",
					compcode : Gincompcode,
					finid : GinFinid,
					supcode : cmbsupplier.getValue()
					},
				callback : function() {
					cmbagent.setValue(loadagentdatastore.getAt(0).get('sagt_code'));
					
				}
				});
			//}
			//else{
			//	Ext.getCmp('cmbagent').setDisabled(true);
			
			//}
		}
            });

	}
	}

   });

var cmbagent = new Ext.form.ComboBox({
        fieldLabel      : 'Agent',
        width           : 250,
        displayField    : 'sagt_name', 
        valueField      : 'sagt_code',
        hiddenName      : '',
        id              : 'cmbagent',
        typeAhead       : true,
        mode            : 'local',
        store           : loadagentdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmblot = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 100,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
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


 var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Order No',
        id          : 'txtbillno',
        name        : 'txtbillno',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });
var txtfrecal = new Ext.form.NumberField({
        fieldLabel  : 'Freight Value',
        id          : 'txtfrecal',
        name        : 'txtfrecal',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
var txtexcrate = new Ext.form.TextField({
        fieldLabel  : 'Ex.Rate',
        id          : 'txtexcrate',
        name        : 'txtexcrate',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });    
var txtgateno = new Ext.form.TextField({
        fieldLabel  : 'GE. No',
        id          : 'txtgateno',
        name        : 'txtgateno',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txtarea = new Ext.form.TextField({
        fieldLabel  : 'Area',
        id          : 'txtarea',
        name        : 'txtarea',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txttransport = new Ext.form.TextField({
        fieldLabel  : 'Transport',
        id          : 'txttransport',
        name        : 'txttransport',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txttonnage = new Ext.form.TextField({
        fieldLabel  : 'Tonnage Based',
        id          : 'txttonnage',
        name        : 'txttonnage',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	listeners:{
	change:function()
	{

		if (txttonnage.getValue() > txtload.getValue())			
		{
			if (txtload.getValue() != '' && txtload.getValue() != 0)
			{
				txtfreight.setRawValue(txtload.getValue());
			}
			else
			{
				txtfreight.setRawValue(txttonnage.getValue());
				
			}
		}
		else
		{
			txtfreight.setRawValue(txttonnage.getValue());
		}
			var Rowchk= flxitem.getStore().getCount();
			flxitem.getSelectionModel().selectAll();
			var sell=flxitem.getSelectionModel().getSelections();
			sell[(Rowchk-1)].set('frvalue', txtfreight.getValue());

				
				

	}
	}
    });

var txtload = new Ext.form.TextField({
        fieldLabel  : 'Load Based',
        id          : 'txtload',
        name        : 'txtload',
        width       :  110,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
listeners:{
	change:function()
	{

		if (txttonnage.getValue() > txtload.getValue())			
		{
			txtfreight.setRawValue(txtload.getValue());
		}
		else
		{
			txtfreight.setRawValue(txttonnage.getValue());
		}

	}
	}
    });

var dtpgatedate = new Ext.form.DateField({
    fieldLabel : 'GE Date',
    id         : 'dtpgatedate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
    listeners:{
            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);
            }
    }
});

var dtpinvsdate = new Ext.form.DateField({
    fieldLabel : 'Invs. Date',
    id         : 'dtpinvsdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
    listeners:{
            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);
            }
    }
});
 var frtype="0";
var optfrtype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Freight',
    fieldLabel: '',
    layout : 'hbox',
    width:300,
    height:65,
    x:80,
    y:90,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optfrtype',
	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Company', name: 'rb',  inputValue: 0,//,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            frtype="0";
Ext.getCmp('cmbThirdParty').disable();
               }
              }
             }
            },
            {boxLabel: 'Supplier', name: 'rb',  inputValue: 1,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            frtype="1";
Ext.getCmp('cmbThirdParty').disable();
               }
              }
             }},
            {boxLabel: 'Third Party', name: 'rb',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            frtype="2";
Ext.getCmp('cmbThirdParty').enable();
               }
              }
             }}
        ]
    }
    ]
});

 var txtpendqty = new Ext.form.TextField({
        fieldLabel  : 'Pend Qty',
        id          : 'txtpendqty',
        name        : 'txtpendqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    });

 var txtbillqty = new Ext.form.TextField({
        fieldLabel  : 'Port Wt',
        id          : 'txtbillqty',
        name        : 'txtbillqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
	listeners:{
	   keyup:function()
		{
		if (Number(txtbillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Bill Qty Should Not be Greater than Pending Qty..");
			txtbillqty.focus();
			txtbillqty.setValue("0");
			}
		else {
			txtInvqty.setValue(txtbillqty.getValue());
		}
		
		}
	}
    });

var txtmillqty = new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtmillqty',
        name        : 'txtmillqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");
			txtmillqty.focus();
			txtmillqty.setValue("0");
			}
			calvalqty();
			
			
		},
	    change:function()
		{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");

			txtmillqty.focus();
			txtmillqty.setValue("0");
			}

			calvalqty();
		},
	    keyup:function()
		{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");

			txtmillqty.focus();
			txtmillqty.setValue("0");
			}

			calvalqty();
			
		}
}
    });

var txttareqty = new Ext.form.TextField({
        fieldLabel  : 'Tare Qty',
        id          : 'txttareqty',
        name        : 'txttareqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : false,
    enableKeyEvents: true, 
	listeners:{
	 keyup:function()
		{
			txtdedqty.setValue(parseFloat(dedqty));
			if (Number(txttareqty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Tare Qty Should Not be Greater than Mill Qty..");
			txttareqty.focus();
			txttareqty.setValue("0");
			}
			else
			{

				calvalqty();

			}
			
		}
	}
    });

var txtlifelessqty = new Ext.form.TextField({
        fieldLabel  : 'Lifeless Qty',
        id          : 'txtlifelessqty',
        name        : 'txtlifelessqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{
			if (txtmoisper.getValue() < pomoistureper)
			{
			txtmoisqty.setValue(0);
			}
			else
			{
			txtmoisqty.setValue((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100);
			
			}

			if (Number(txtlifelessqty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Lifeless Qty Should Not be Greater than Mill Qty..");
			txtlifelessqty.focus();
			txtlifelessqty.setValue("0");
			}
			else
			{
				calvalqty();
			}

		}
	    
}
    });

var txtrejqty = new Ext.form.TextField({
        fieldLabel  : 'Rej Qty',
        id          : 'txtrejqty',
        name        : 'txtrejqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{

			if ((txtrejqty.getValue())>(txtmillqty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtrejqty.focus();
			txtrejqty.setValue("0");
			}
			else
			{
				calvalqty();

			}
			
		}
	    
}
    });

var txtmoisper = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtmoisper',
        name        : 'txtmoisper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	enableKeyEvents: true, 
	tabindex : 1,
	listeners:{
	change:function()
	{


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		calvalqty();
	},
	keyup:function()
	{


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		calvalqty();
	},
	keydown:function()
	{


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		calvalqty();
	}
	}
    });

var txtmoisqty = new Ext.form.TextField({
        fieldLabel  : 'Mois Qty',
        id          : 'txtmoisqty',
        name        : 'txtmoisqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txtoutthroper = new Ext.form.TextField({
        fieldLabel  : 'Out Thro(%)',
        id          : 'txtoutthroper',
        name        : 'txtoutthroper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	enableKeyEvents: true, 
	tabindex : 1,
	listeners:{
	change:function()
	{


		if (txtoutthroper.getValue() < pooutthroper)
		{
			txtoutthroqty.setValue(0);
		}
		else
		{
			txtoutthroqty.setValue(Ext.util.Format.number(Number(txtmillqty.getValue()) * (Number(txtoutthroper.getValue()) - pooutthroper) / 100,"0.000"));
			
		}
		calvalqty();
	},
	keyup:function()
	{


		if (txtoutthroper.getValue() < pooutthroper)
		{
			txtoutthroqty.setValue(0);
		}
		else
		{
			txtoutthroqty.setValue(Ext.util.Format.number(Number(txtmillqty.getValue()) * (Number(txtoutthroper.getValue()) - pooutthroper) / 100,"0.000"));
			
		}
		calvalqty();
	},
	keydown:function()
	{

		if (txtoutthroper.getValue() < pooutthroper)
		{
			txtoutthroqty.setValue(0);
		}
		else
		{
			txtoutthroqty.setValue(Ext.util.Format.number(Number(txtmillqty.getValue()) * (Number(txtoutthroper.getValue()) - pooutthroper) / 100,"0.000"));
			
		}
		calvalqty();
	}
	}
    });

var txtoutthroqty = new Ext.form.TextField({
        fieldLabel  : 'Out Thro Qty',
        id          : 'txtoutthroqty',
        name        : 'txtoutthroqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
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


var txtdegradeqty = new Ext.form.TextField({
        fieldLabel  : 'Degrade Qty',
        id          : 'txtdegradeqty',
        name        : 'txtdegradeqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true, 
    	enableKeyEvents: true, 
	listeners:{
	keyup:function()
		{

		calvalqty();

		}
	    
}
    });

var txtdedqty = new Ext.form.TextField({
        fieldLabel  : 'Ded. Qty',
        id          : 'txtdedqty',
        name        : 'txtdedqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtgrnqty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrnqty',
        name        : 'txtgrnqty',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtrate = new Ext.form.Field({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtrateded = new Ext.form.TextField({
        fieldLabel  : 'Ded. Rate',
        id          : 'txtrateded',
        name        : 'txtrateded',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
enableKeyEvents: true, 
	listeners:{
	keyup:function(){
		calvalqty();
	}
	}
    });

var txtitemval = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtitemval',
        name        : 'txtitemval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txttotitemqty= new Ext.form.TextField({
        fieldLabel  : 'Total ItemQty(MT)',
        id          : 'txttotitemqty',
        name        : 'txttotitemqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotitemval= new Ext.form.NumberField({
        fieldLabel  : 'Total ItemValue(Rs)',
        id          : 'txttotitemval',
        name        : 'txttotitemval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotitemvalD= new Ext.form.NumberField({
        fieldLabel  : 'Total ItemValue($)',
        id          : 'txttotitemvalD',
        name        : 'txttotitemvalD',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotclrchg= new Ext.form.NumberField({
        fieldLabel  : 'Total Clearing Charges',
        id          : 'txttotclrchg',
        name        : 'txttotclrchg',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtclrchg= new Ext.form.NumberField({
        fieldLabel  : 'Clearing Charges',
        id          : 'txtclrchg',
        name        : 'txtclrchg',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtlocalFrChrg= new Ext.form.NumberField({
        fieldLabel  : 'Local Freight Charges(Rs)',
        id          : 'txtlocalFrChrg',
        name        : 'txtlocalFrChrg',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtTMillqty= new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtTMillqty',
        name        : 'txtTMillqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
	
    });

 var chkfqtyRecv = new Ext.form.Checkbox({
	id : 'chkfqtyRecv' ,
	boxLabel: 'Full Qty Received', 
	name: 'chkfqtyRecv', 
	inputValue: 1});

var txtfqtyRecv= new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtfqtyRecv',
        name        : 'txtfqtyRecv',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotgrnval= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value(Rs)',
        id          : 'txttotgrnval',
        name        : 'txttotgrnval',
        width       :  100,
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
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        name        : 'txtfreight',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtpartybillval = new Ext.form.NumberField({
        fieldLabel  : 'Party BillValue',
        id          : 'txtpartybillval',
        name        : 'txtpartybillval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
    });

var txtcgstper = new Ext.form.TextField({
        fieldLabel  : 'CGST Amt',
        id          : 'txtcgstper',
        name        : 'txtcgstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : 'CGST Val',
        id          : 'txtcgstval',
        name        : 'txtcgstval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgstper = new Ext.form.TextField({
        fieldLabel  : 'SGST Amt',
        id          : 'txtsgstper',
        name        : 'txtsgstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : 'SGST Val',
        id          : 'txtsgstval',
        name        : 'txtsgstval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtigstper = new Ext.form.TextField({
        fieldLabel  : 'IGST Amt',
        id          : 'txtigstper',
        name        : 'txtigstper',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtigstval = new Ext.form.NumberField({
        fieldLabel  : 'IGST Val',
        id          : 'txtigstval',
        name        : 'txtigstval',
        width       :  100,
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
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttcsval = new Ext.form.NumberField({
        fieldLabel  : 'TCS Val',
        id          : 'txttcsval',
        name        : 'txttcsval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txttotqty',
        name        : 'txttotqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });
var txtservpermt = new Ext.form.NumberField({
        fieldLabel  : 'Service Charges/MT',
        id          : 'txtservpermt',
        name        : 'txtservpermt',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	disabled:true,
	//readOnly : true
    });

var txtservicecharges = new Ext.form.NumberField({
        fieldLabel  : 'Service Charges',
        id          : 'txtservicecharges',
        name        : 'txtservicecharges',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	disabled:true,
	readOnly : true
    });
var cmbThirdParty = new Ext.form.ComboBox({
        fieldLabel      : 'Third Party Name',
        width           : 250,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbThirdParty',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadthirddatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	Enabled     : false
   });

 var txtRemarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  490,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });
var cmbitemdegr = new Ext.form.ComboBox({
        fieldLabel      : 'Degraded Item Name',
        width           : 350,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitemdegr',
        typeAhead       : true,
        mode            : 'local',
        store           : loaddispdegritemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
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
        width           : 280,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitemdegrto',
        typeAhead       : true,
        mode            : 'local',
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
                url: 'ClsRMImGrn.php',
                params:
                {
                task:"loaddegritemqty",
		supno : cmbsupplier.getValue(),
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
	readOnly : true
    });

var txtgrn1qty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrn1qty',
        name        : 'txtgrn1qty',
        width       :  100,
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
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
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
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,

    });
var cmblotdr = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 100,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'cmblotdr',
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
var txtdegrrmks= new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtdegrrmks',
        name        : 'txtdegrrmks',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
    });

var btnSubmitdr = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 100,
    height  : 25,
    x       : 580,
    y       : 69,
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
				freqty = freqty + Number(txtgrn1qty.getRawValue());

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
    y:120,
    height: 100,
    hidden:false,
    width: 930,
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
	{header: "Pre Grn Qty", dataIndex:'pregrnqty',sortable:true,width:100,align:'left'},//20
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//hidden:true},//21
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//hidden:true},//22
	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left'},//,hidden:true},//23
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
    width: 930,
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
    y:190,
    height: 75,
    hidden:false,
    width: 930,
    columns:
    [

        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},//1
        {header: "Order Qty", dataIndex: 'ordqty',sortable:true,width:90,align:'left'},//2
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'left'},//3
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:90,align:'left'},//4
	{header: "Mois%", dataIndex:'moisper',sortable:true,width:90,align:'left'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'left'},//6 
        {header: "Tare Qty", dataIndex: 'tarqty',sortable:true,width:90,align:'left'},//7
        {header: "L.L.Qty", dataIndex: 'llqty',sortable:true,width:90,align:'left'},//8
        {header: "Rej Qty", dataIndex: 'rejqty',sortable:true,width:90,align:'left'},//9
        {header: "Degr Qty", dataIndex: 'degrqty',sortable:true,width:90,align:'left'},//10
 	{header: "Tot Ded", dataIndex: 'totded',sortable:true,width:90,align:'left'},//11
	{header: "GRN Qty", dataIndex:'grnqty',sortable:true,width:90,align:'left'}, //12
 	{header: "Item Rate($)", dataIndex:'ditemrate',sortable:true,width:100,align:'left'},//13 
        {header: "Rate Ded($)", dataIndex: 'drateded',sortable:true,width:90,align:'left'},//14
        {header: "Item Value($)", dataIndex: 'ditemvalue',sortable:true,width:100,align:'left'},//15
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:90,align:'left'},//16
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:260,align:'left'},//17
	{header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:90,align:'left',hidden:true},//18


	{header: "OT %", dataIndex:'otper',sortable:true,width:100,align:'left'},//20
	{header: "OT Qty", dataIndex: 'otqty',sortable:true,width:90,align:'left'},//hidden:true},//21
	{header: "Adj Qty", dataIndex: 'adjqty',sortable:true,width:90,align:'left'},//hidden:true},//22
	

	{header: "Mill Qty", dataIndex:'premillqty',sortable:true,width:100,align:'left'},//23
	{header: "Bill Qty", dataIndex: 'prebillqty',sortable:true,width:90,align:'left'},//hidden:true},//24
	{header: "cgst", dataIndex: 'cgst',sortable:true,width:90,align:'left'},//hidden:true},//25
	{header: "sgst", dataIndex: 'sgst',sortable:true,width:90,align:'left'},//hidden:true},//26
	{header: "igst", dataIndex: 'igst',sortable:true,width:90,align:'left'},//hidden:true},//27

	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//hidden:true},//28
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//hidden:true},//29
	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left'},//hidden:true},//30

 	
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
				txtbillqty.setValue(selrow.get('billqty'));
				txtmillqty.setValue(selrow.get('millqty'));
				txtmoisper.setValue(selrow.get('moisper'));
				txtmoisqty.setValue(selrow.get('moisqty'));
				txttareqty.setValue(selrow.get('tarqty'));
				txtlifelessqty.setValue(selrow.get('llqty'));
				txtrejqty.setValue(selrow.get('rejqty'));
				txtdegradeqty.setValue(selrow.get('degrqty'));
				txtdedqty.setValue(selrow.get('totded'));
				txtgrnqty.setValue(selrow.get('grnqty'));
				txtrate.setValue(selrow.get('itemrate'));
				txtrateded.setValue(selrow.get('rateded'));
				txtitemval.setValue(selrow.get('itemvalue'));
				cmblot.setRawValue(selrow.get('lotno'));
				txtRemarks.setValue(selrow.get('remarks'));
				cmblot.setValue(selrow.get('lotcode'));

				txtgrnqty.setValue(selrow.get('pregrnqty'));

				pomoistureper= txtmoisper.getValue();

				flxDetail.getSelectionModel().clearSelections();
				flxitem.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('itemcode'));
		flxDetail.getStore().remove(selrow);
		flxDetail.getSelectionModel().selectAll();

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
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'left'},
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
 

	{header: "OT %", dataIndex:'otper',sortable:true,width:100,align:'left'},//20
	{header: "OT Qty", dataIndex: 'otqty',sortable:true,width:90,align:'left'},//hidden:true},//21
	{header: "Adj Qty", dataIndex: 'adjqty',sortable:true,width:90,align:'left'},//hidden:true},//22
	

	{header: "Mill Qty", dataIndex:'premillqty',sortable:true,width:100,align:'left'},//23
	{header: "Bill Qty", dataIndex: 'prebillqty',sortable:true,width:90,align:'left'},//hidden:true},//24
	{header: "cgst", dataIndex: 'cgst',sortable:true,width:90,align:'left'},//hidden:true},//25
	{header: "sgst", dataIndex: 'sgst',sortable:true,width:90,align:'left'},//hidden:true},//26
	{header: "igst", dataIndex: 'igst',sortable:true,width:90,align:'left'},//hidden:true},//27

	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'left'},//hidden:true},//28
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'left'},//hidden:true},//29
	{header: "frvalue", dataIndex: 'frvalue',sortable:true,width:90,align:'left'},//hidden:true},//30
 	
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
    }

   }
});



var flxitem = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    tabIndex	: 0,
    x:520,
    y:20,
    height: 130,
    hidden:false,
    width: 450,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:50,align:'left',hidden: true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:150,align:'left'},
        {header: "Qty", dataIndex: 'qty',sortable:true,width:60,align:'left'},
        {header: "Ton Freight", dataIndex: 'tonfreight',sortable:true,width:60,align:'left'},
        {header: "Load Freight", dataIndex:'LoadFreight',sortable:true,width:60,align:'left'},
	{header: "Freight", dataIndex:'frvalue',sortable:true,width:100,align:'left'}//,hidden: true}
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxitem, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES GRN',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxitem.getSelectionModel();
        var selrow = sm.getSelected();

        flxitem.getStore().remove(selrow);
        flxitem.getSelectionModel().selectAll();
    //    grid_tot();
     //   CalculatePOVal();
       }
      }
     });         
    }

   }
});

var flxitem_old = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:520,
    y:20,
    height: 130,
    hidden:false,
    width: 530,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:150,align:'left',hidden: true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},
        {header: "Qty", dataIndex: 'qty',sortable:true,width:90,align:'left'},
        {header: "Ton Freight", dataIndex: 'tonfreight',sortable:true,width:90,align:'left'},
        {header: "Load Freight", dataIndex:'LoadFreight',sortable:true,width:100,align:'left'},
	{header: "Freight", dataIndex:'frvalue',sortable:true,width:100,align:'left',hidden: true}
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxitem, rowIndex, cellIndex, e){
       
    }

   }
});


function InitialData() {
gstFlag ="Add";

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
                        	 url:'ClsRMImGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			userdatastore.removeAll();
			userdatastore.load({
                        	 url:'ClsRMImGrn.php',
                        	 params:
                       		 {
                         	 task:"userdet",
				 userid : userid
                        	 },
				 
				 });
			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsRMImGrn.php',
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


function RefreshData(){

InitialData();
}

var tabgrn = new Ext.TabPanel({
    id          : 'GRN',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1500,
    x           : 2,
    items       : [
        {
            xtype: 'panel',
            title: 'Item & Tax Details',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [{ 
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
                                	width       : 600,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbsupplier]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 600,
                                	x           : 200,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbagent]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 540,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbpono]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 400,
                                	x           : 540,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpinvsdate]
                            },			

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 220,
                                	x           : 730,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtbillno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 730,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpbilldate]
                            },
			{ xtype   : 'fieldset',
	                title   : 'Item Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 300,
        	        width   : 995,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 70,
        	        items:[

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 410,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbitem]
                            },
                                                        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtexcrate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 350,
                                	x           : 590,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtpendqty]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 280,
                                	x           : 780,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtbillqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 280,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtmillqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 190,
                                	y           : 30,
                                    	border      : false,
                                	items: [txttareqty]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtlifelessqty]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtrejqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 590,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtmoisper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 780,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtmoisqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtoutthroqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 190,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtoutthroper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 590,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtInvqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 780,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtdedqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtdegradeqty]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 590,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtgrnqty]
                            },


{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtrate]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 780,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtrateded]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 590,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtitemval]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [cmblot]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 220,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                items: [txtgateno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [dtpgatedate]
                            },                            
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 640,
                                	x           : 190,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRemarks]
                            },btnSubmit,flxDetail
]
                },
	{ xtype   : 'fieldset',
	                title   : 'Tax Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 200,
        	        width   : 995,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 370,
        	        items:[
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotqty] 
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 115,
                                	width       : 400,
                                	x           : 210,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemqty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 440,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemval]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 690,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemvalD]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 0,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtlocalFrChrg]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 115,
                                	width       : 320,
                                	x           : 210,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtclrchg]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 440,
                                	y           : 20,
                                    	border      : false,
                                	items: [txttotclrchg]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 690,
                                	y           : 20,
                                    	border      : false,
                                	items: [txttotgrnval]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtcgstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 115,
                                	width       : 320,
                                	x           : 210,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtcgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 440,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtsgstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 690,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtsgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtigstper]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 115,
                                	width       : 320,
                                	x           : 210,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtigstval]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 320,
                                	x           : 440,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtTMillqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 690,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtroundoff]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 150,
                                	x           : -5,
                                	y           : 110,
                                    	border      : false,
                                	items: [chkfqtyRecv]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 320,
                                	x           : 130,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtfqtyRecv]
                            }
]
}    
            ]
        },
 {
            xtype: 'panel',
            title: 'Degraded Details',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		{ xtype   : 'fieldset',
	                title   : 'Degraded Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 270,
        	        width   : 995,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 10,
        	        items:[
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
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
                        	labelWidth  : 100,
                        	width       : 600,
                        	x           : 0,
                        	y           : 30,
                            	border      : false,
                        	items: [txtdegrqty]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 60,
                        	width       : 600,
                        	x           : 220,
                        	y           : 30,
                            	border      : false,
                        	items: [txtgrn1qty]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 60,
                        	width       : 600,
                        	x           : 400,
                        	y           : 30,
                            	border      : false,
                        	items: [txtitemrate]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 60,
                        	width       : 600,
                        	x           : 580,
                        	y           : 30,
                            	border      : false,
                        	items: [txtitemvalue]
			},
			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 45,
                        	width       : 600,
                        	x           : 760,
                        	y           : 30,
                            	border      : false,
                        	items: [cmblotdr]
			},

			{

                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 60,
                        	width       : 600,
                        	x           : 220,
                        	y           : 60,
                            	border      : false,
                        	items: [txtdegrrmks]
			},btnSubmitdr,flxDetaildegr
			]
		}, 

		{ xtype   : 'fieldset',
	                title   : 'Freight Charges',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 280,
        	        width   : 995,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 280,
        	        items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 300,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbwtcard]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 230,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtarea]
                            },{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 230,
                                	y           : 30,
                                    	border      : false,
                                	items: [txttransport]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtvehicle]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 510,
                                	y           : 160,
                                    	border      : false,
                                	items: [txttonnage]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 250,
                                	x           : 740,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtload]
                            },flxitem,optfrtype,
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 450,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbThirdParty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 450,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	//items: [txtfrecal]
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
                        	 url:'ClsRMImGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsRMImGrn.php',
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
			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
				url:'ClsRMImGrn.php',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

			var gstSave;
	                    gstSave="true";
        	            if (cmbsupplier.getValue()==0 || cmbsupplier.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Select Party Name');
        	                gstSave="false";
        	            }
        	            else if (txtgateno.getRawValue()==0 || txtgateno.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Enter Gate Entry No');
        	                gstSave="false";
        	            }
        	            else if (txtbillno.getRawValue()=="" || txtbillno.getRawValue==0)
        	            {
        	                Ext.Msg.alert('GRN','Enter Bill No');
        	                gstSave="false";
        	            }    
        	            else if (txtpartybillval.getRawValue()=="" || txtpartybillval.getRawValue==0)
        	            {
        	                Ext.Msg.alert('GRN','Enter Party Bill Value');
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
if (gstFlag === "Add"){ flxDetail.getSelectionModel().selectAll(); flxitem.getSelectionModel().selectAll(); flxDetaildegr.getSelectionModel().selectAll();}
                          
                            var grnData = flxDetail.getStore().getRange();                                        
                            var grnupdData = new Array();
                            Ext.each(grnData, function (record) {
                                grnupdData.push(record.data);
                            });

                            var freData = flxitem.getStore().getRange();                                        
                            var freupdData = new Array();
                            Ext.each(freData, function (record) {
                                freupdData.push(record.data);
                            });

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

                            var edfreData = flxitem_old.getStore().getRange();                                        
                            var edfreupdData = new Array();
                            Ext.each(edfreData, function (record) {
                                edfreupdData.push(record.data);
                            });

                            var eddegrData = flxDetaildegr_old.getStore().getRange();                                        
                            var eddegrupdData = new Array();
                            Ext.each(eddegrData, function (record) {
                                eddegrupdData.push(record.data);
                            });

			    if(cmbagent.getValue() == 0){
				cmbagent.setValue(cmbsupplier.getValue());
				}


                            Ext.Ajax.request({
                            url: 'TrnRMGRNSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(grnupdData),
				gridfre: Ext.util.JSON.encode(freupdData), 
				griddegr: Ext.util.JSON.encode(degrupdData), 
                             	edgriddet: Ext.util.JSON.encode(edgrnupdData),
				edgriddegr: Ext.util.JSON.encode(eddegrupdData), 
				cnt:grnData.length,
				frecnt: freData.length, 
				degrcnt: degrData.length,  
				edcnt:edgrnData.length,
				eddegrcnt: eddegrData.length, 
				gstFlaggrn : gstFlag,                                 
				compcode:Gincompcode,
                                finid:GinFinid,
				edgrnno: cmbgrnno.getValue(),
				edpono: edpono,
                                supcode : cmbsupplier.getValue(),
				ordseqno : cmbpono.getValue(),
				agentcode : cmbagent.getValue(),
				grndate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				wtcardno : cmbwtcard.getValue(),
				areacode: fareacode,//txtarea.getRawValue(),
				freighttype: frtype,
				fradvance : 0,
				itemval : txttotitemval.getValue(),
				scper : scper,
				stper : stper,
				scamt : scamt,
				stamt : stamt,
				sgstper: txtsgstper.getValue(),
				sgstamt: txtsgstval.getValue(),
				cgstper : txtcgstper.getValue(),
				cgstamt : txtcgstval.getValue(),
				igstper : txtigstper.getValue(),
				igstamt : txtigstval.getValue(),
				tcsper : txttcsper.getValue(),
				tcsamt: txttcsval.getValue(),
				servchrg: txtservicecharges.getValue(),
				freight: txttonnage.getValue(), // txtfreight.getValue(),
				roundoff: txtroundoff.getValue(),
				totamt: txtpartybillval.getValue(),
				billno: txtbillno.getValue(),
				billdate:Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
				billval: txtpartybillval.getValue(),
				frparty:cmbThirdParty.getValue(),
				frvouno:0,
				vouno:0,
				acctflag:'',
				accdate:'',
				status:'',
				usrcode:0,
				entrydate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
				gateentryno: txtgateno.getRawValue(),
				gatedate: Ext.util.Format.date(dtpgatedate.getValue(),"Y-m-d")
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("GRN -" + obj['GRNNo']);
                                    TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
				    flxDetaildegr.getStore().removeAll();
				    flxitem.getStore().removeAll();
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
	height      : 680,
        width       : 1030,
        y           : 35,
        title       : 'IMPORT GRN',
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
                        	 url:'ClsRMImGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			userdatastore.removeAll();
			userdatastore.load({
                        	 url:'ClsRMImGrn.php',
                        	 params:
                       		 {
                         	 task:"userdet",
				 userid : userid
                        	 },
				 
				 });
			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsRMImGrn.php',
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
