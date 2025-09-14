Ext.onReady(function(){
   Ext.QuickTips.init();

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');


    var GinUser = localStorage.getItem('ginusername');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

   var rounding = 0;

   var seqno = 0;

   var poseqno = 0;

var ledgercode = 0;

var gstFlag = "Add";
var gstStatus = "N";
var itemgrpcode = 0;
var gridedit = "false";
var degrchk = "true";
var editrow = 0;
var FrePaidby = 0;

var cgstledcode = 0;
var sgstledcode = 0;
var igstledcode = 0;
var cgstledger  = '';
var sgstledger  = '';
var igstledger  = '';

var areagrpcode = 0;
var supwp_gsttype = 'N';
var dedqty;
var lifelessqty;
var pomoistureper;
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
var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_millval, pdb_totedval, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;
var PQTY =0, GQTY =0, purvalue =0,receiptdt,supledcode,billnoh,billdt,billvalueh,
tcsamth,cessmth,handlingmt,cgstph,sgstph,
igstph,chkgrnh,frtsupledcode,handlingledcode;

var pdb_totvalnew = 0;

var cgstval1 = 0;
var sgstval1 = 0;
var igitval1 = 0;

var ledcode;
var supcode;
var suptype;

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
                  TrnGrnWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  RefreshData();
            }
        }]);


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
    fieldLabel : 'VOUCHER  Date',
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



function save_click()
{
	    var gstSave;
            gstSave="true";
            if (supcode==0 || txtSupplierName.getRawValue()=="")
            {
                Ext.Msg.alert('GRN','Select Party Name');
                gstSave="false";
            }
            else if (txtbillno.getRawValue()=="" || txtbillno.getRawValue()==0)
            {
                Ext.Msg.alert('GRN','Enter Bill No');
                gstSave="false";
            }    
            else if (txtBillValue.getRawValue()=="" || txtBillValue.getRawValue()==0)
            {
                Ext.Msg.alert('GRN','Enter Party Bill Value');
                gstSave="false";
            }  

 
            else if (cmbArea.getRawValue()=="" || cmbArea.getRawValue()==0)
            {
                Ext.Msg.alert('GRN','Select Loading Area,');
                cmbArea.focus();
                gstSave="false";
            }     

            else if (cmbPurchaseLedger.getRawValue()=="" || cmbPurchaseLedger.getRawValue()==0)
            {
                Ext.Msg.alert('GRN','Select Purchase Ledger ..,');
                cmbArea.focus();
                gstSave="false";
            } 

            else if (cmbPONO.getRawValue()=="")
            {
                Ext.Msg.alert('GRN','Select PO Number,');
                cmbPONO.focus();
                gstSave="false";
            }                  
            else if (txtCrdays.getRawValue()=="")
            {
                Ext.Msg.alert('GRN','Enter Payment Terms,');

                gstSave="false";
                txtCrdays.focus();
            }      
            else if (txttotgrnval.getValue()=="")
            {
                Ext.Msg.alert('GRN','GRN Amount is Empty,');
                txtCrdays.focus();
                gstSave="false";
            } 
            else if (Number(txttotgrnval.getValue()) > Number(txtBillValue.getValue()))
            {
                Ext.Msg.alert('GRN','Total GRN Value should not less than Party Bill Value');
                txtBillValue.focus();
                gstSave="false";
            }   
	    else if (flxGRNDetail.rows==0)
            {
                Ext.Msg.alert('GRN','Grid should not be empty');
                gstSave="false";
            } 
            else if(Number(txtTotDebit.getRawValue())!=Number(txtTotCredit.getRawValue())){
                Ext.MessageBox.alert("Fuel-GRN","The Transactions Debit and Credit Amount are not  Equal");
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
if (gstFlag === "Add"){ flxGRNDetail.getSelectionModel().selectAll(); 
}
          
            var grnData = flxGRNDetail.getStore().getRange();                                        
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
		var Row= flxGRNDetail.getStore().getCount();
		flxGRNDetail.getSelectionModel().selectAll();
		totgieno='';
		var sel=flxGRNDetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
			remarks = remarks + sel[i].data.itemname + "- Qty : " + sel[i].data.grnqty + " Rate : "  + sel[i].data.itemrate  + "/MT" ;
		}




/*
            var edgrnData = flxGRNDetail_old.getStore().getRange();                                        
            var edgrnupdData = new Array();
            Ext.each(edgrnData, function (record) {
                edgrnupdData.push(record.data);
            });


*/



            Ext.Ajax.request({
            url: 'TrnRMGRNSaveAccounts.php',
            params :
             {
             	griddet: Ext.util.JSON.encode(grnupdData),

     //        	edgriddet: Ext.util.JSON.encode(edgrnupdData),

		cnt:grnData.length,

//				degrcnt: degrData.length,  
//				edcnt:edgrnData.length,
//				eddegrcnt: eddegrData.length, 

             	griddetacc      : Ext.util.JSON.encode(accupdData),                          
		cntacc		: accData.length,	

		gstFlaggrn : gstFlag,                                 
		compcode:Gincompcode,
                finid:GinFinid,
                seqno  : seqno,
		edgrnno: txtGRNNo.getValue(),
		edpono: edpono,
                supcode : supcode,
		ordseqno : poseqno,
		crdays   : txtCrdays.getValue(),
		grndate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
                qcinsno  : cmbQCEntNo.getValue(),
		areacode: cmbArea.getValue(),
                areagrpcode : areagrpcode,
                truck   : txtvehicle.getRawValue(),
		freighttype: frtype,

		itemval : txttotitemval.getValue(),

		sgstper: txtSGSTPer.getValue(),
		sgstamt: txtsgstval.getValue(),
		cgstper : txtCGSTPer.getValue(),
		cgstamt : txtcgstval.getValue(),
		igstper : txtIGSTPer.getValue(),
		igstamt : txtigstval.getValue(),
		tcsper : txttcsper.getValue(),
		tcsamt: txttcsval.getValue(),

		freight:  txtfreight.getValue(),
                otheramt : txtotherchrgs.getValue(),
		roundoff: txtroundoff.getValue(),
		totamt: txttotgrnval.getValue(),
		billno: txtbillno.getValue(),
		billdate:Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
		billval: txtBillValue.getValue(),

		frvouno:0,
		vouno:0,
		acctflag:'',
		accdate:'',
		status:'',
		usrcode:GinUserid,
		entrydate: Ext.util.Format.date(dtpgrndate.getValue(),"Y-m-d"),
		gateentryno: txtgateno.getRawValue(),
		gatedate: Ext.util.Format.date(dtpgatedate.getValue(),"Y-m-d"),
                roundneed : roundoff,
                purledger : cmbPurchaseLedger.getValue(),

                remarks         : remarks,
          	vouno   	: txtVouNo.getValue(),
		voudate		: Ext.util.Format.date(dtVouDate.getValue(),"Y-m-d"),


		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("GRN SAVED No.-" + obj['GRNNo']);
//                                    TrnGrnformpanel.getForm().reset();
                    flxGRNDetail.getStore().removeAll();


                    RefreshData();
//				    TrnGrnformpanel.getForm().reset();
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


function edit_click()
{
	gstFlag = "Edit";
	flxGRNDetail.getStore().removeAll();
	Ext.getCmp('txtGRNNo').hide();
	Ext.getCmp('cmbgrnno').setDisabled(false);
	Ext.getCmp('cmbgrnno').show();

	loadgrnnodatastore.removeAll();
	loadgrnnodatastore.load({
		url:'ClsRMGrn.php',
		params:
		{
			task:"loadgrnno",
			finid : GinFinid,
			compcode : Gincompcode,
			gstFlag : gstFlag
		},
		callback:function()
		{
		//	cmbgrnno.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
		}
	});
}


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



	var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        name        : 'txtGRNNo',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,

	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   dtpgrndate.focus();
             }
        }  
        }  
	    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name','qc_rm_supcode', 'sup_type','sup_wp_gstinv_supplier_yn' 
      ]),
    });




 var loadQCEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entrydate', 'qc_rm_ticketdate', 'qc_rm_supcode', 'qc_rm_truck', 'qc_rm_ticketno', 'qc_rm_ticketwt', 'qc_rm_itemcode', 'qc_rm_moisper', 'qc_rm_moisqty', 'qc_rm_llessper', 'qc_rm_llessqty', 'qc_rm_rejectper','qc_rm_moisfor',  'qc_rm_rejectqty', 'qc_rm_degradeqty', 'qc_rm_acceptqty', 'qc_rm_remarks', 'qc_rm_packtype', 'itmh_name',  'sup_code', 'sup_name','qc_rm_moisper_totalmaterial', 'qc_rm_moisforqty','qc_rm_itemtype', 'sup_refname','qc_rm_slno','wc_area_code','wc_unloadingtime','area_name','qc_rm_area','qc_rm_unloadingtime',
'qc_rm_billno','qc_rm_billdate','qc_rm_rate','qc_rm_pur_ledger','qc_rm_billvalue','qc_rm_billqty','qc_rm_millqty',
'areagrp_code', 'areagrp_name','tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
      ]),

    });

 var loadQCEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entryno',
      ]),
    });



var dgrecord = Ext.data.Record.create([]);
var dgrecordflxitem = Ext.data.Record.create([]);

 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
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

 var loadthirddatastore = new Ext.data.Store({
      id: 'loadthirddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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

	var loadpoitemdatastore = new Ext.data.Store({
	id: 'loadpoitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadpoitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code','ordt_unit_rate'
	]),
	});
	
	var loaddegrdatastore = new Ext.data.Store({
	id: 'loaddegrdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMGrn.php',      // File to connect to
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
		url: 'ClsRMGrn.php',      // File to connect to
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
		url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_sgst_per', 'rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_edamount', 'rech_servicecharge', 'rech_freight', 'rech_roundingoff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_educessamount', 'rech_geno', 'rech_gedate', 'sup_type', 'ordh_no', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper','sup_refname','rech_purledger','sup_led_code', 'ordh_igstper','rech_truckno','rech_otheramt','rech_crdays','rech_roundingoff','rech_roundneeded','rech_qc_ins_no',
'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'

      ]),
    });

    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'itmh_name', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_educessper', 'rect_educessamount', 'itmh_ledcode', 'act_rect_qty' ,'lot_refno','rect_lotno','pendqty',
'rect_mois_for_material','rect_mois_for_qty', 'rect_lifeless_per', 'rect_reject_per', 'rect_ticketno','rect_mat_pack_type' ,'rect_itemvalue','rect_costrate','rect_costvalue' ]),
    });

    var loadwtcarddatastore = new Ext.data.Store({
      id: 'loadwtcarddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordt_item_code','ordt_qty','tol_per','tol_all_qty' ,'ordt_pen_qty','ordt_unit_rate','ordt_edpercentage', 'ordt_moisper','rect_grnqty'
      ]),
    });

var loadamnddatastore = new Ext.data.Store({
      id: 'loadamnddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
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
                url: 'ClsRMGrn.php',      // File to connect to
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


var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMGrn.php',      // File to connect to
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



var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMGrn.php',      // File to connect to
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

    
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
		url: 'ClsRMGrn.php',
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

                          txtCGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
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

      }   
}
});


var cmbPackingType = new Ext.form.ComboBox({
        fieldLabel      : 'Packing Type',
        width           : 100,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbPackingType',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['B','BUNDLE'],['L','LOOSE']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code' ,'itmh_name',
      ]),
    });


var cmbItem = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItem',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemListDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
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



function find_grnqty()
{
    var acceptqty =0;
    var deductionqty =0;
    txtMoisWt.setValue('');
    txtRemarks.setRawValue('');

    txtMoisForQty.setValue('');
    if (txtMoisTotalMaterail.getValue() > 0)
    {
    txtMoisForQty.setValue(Ext.util.Format.number(Number(txtTicketWt.getValue())  * Number(txtMoisTotalMaterail.getValue())  / 100,"0.000"));
    txtRemarks.setRawValue( txtMoisTotalMaterail.getValue() + "% Material Having Moisture " + txtMoisPer.getValue()+"% " );

    }


//alert(txtRemarks.getRawValue());

    if (txtMoisPer.getValue() > 10)
    {
    txtMoisWt.setValue(Ext.util.Format.number(Number(txtMoisForQty.getValue())  * Number(txtMoisPer.getValue()-10)  / 100,"0.000"));
    txtRemarks.setRawValue(txtRemarks.getRawValue()+ "Ex. Moisture " + Ext.util.Format.number((txtMoisPer.getValue() - 10), "0.00") + "(%)" + " for the Qty : "+ Ext.util.Format.number(txtMoisForQty.getValue(), "0.0") + " Kgs. Deducted "  + Ext.util.Format.number(txtMoisWt.getValue(), "0.0") + " Kgs." + " ,");

    }

//alert(txtRemarks.getRawValue());


    if (txtLLessPer.getValue() > 0)
    txtLLessQty.setValue(Ext.util.Format.number(Number(txtTicketWt.getValue())  * Number(txtLLessPer.getValue())  / 100,"0.000"));
    if (txtLLessQty.getValue() <= 0)
       txtLLessQty.setValue('');

    if (txtRejectPer.getValue() > 0)
    txtRejectQty.setValue(Ext.util.Format.number(Number(txtTicketWt.getValue())  * Number(txtRejectPer.getValue())  / 100,"0.000"));
    if (txtRejectQty.getValue() <= 0)
       txtRejectQty.setValue('');


    if (Number(txtLLessQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " LifeLess Qty : "+ txtLLessQty.getValue() + " Kgs" ) ;

    if (Number(txtRejectQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Rejection Qty : "+ txtRejectQty.getValue() + " Kgs" ) ;


    if (Number(txtDegradeQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Degraded Qty : "+ txtDegradeQty.getValue() + " Kgs" ) ;


  //  txtMoisWt.toFixed(3);
//    txtLLessQty.toFixed(3);
    acceptqty = Number(txtTicketWt.getValue()) -  Number(txtMoisWt.getValue()) -  Number(txtLLessQty.getValue()) -  Number(txtRejectQty.getValue())  -  Number(txtDegradeQty.getValue()); 

    if (acceptqty <0)
       acceptqty =0;     
    txtAcceptWt.setValue(Ext.util.Format.number(acceptqty,"0.000"));
  
    deductionqty = Number(txtMoisWt.getValue()) +  Number(txtLLessQty.getValue()) +  Number(txtRejectQty.getValue()) +   Number(txtDegradeQty.getValue());
    if (deductionqty == 0 && txtRemarks.getRawValue() == "" )
      txtRemarks.setRawValue("Accepted Qty : "+ txtAcceptWt.getValue() + " Kgs" ) ;



}



var txtRemarks = new Ext.form.TextField({
	fieldLabel  : 'Remarks',
	id          : 'txtRemarks',
	name        : 'txtRemarks',
	width       :  500,
	style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	listeners   : {
	}
});

var txtTicketWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTicketWt',
        name        : 'txtTicketWt',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }  
    });


var txtMoisPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisPer',
        name        : 'txtMoisPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    });


var txtMoisTotalMaterail = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisTotalMaterail',
        name        : 'txtMoisTotalMaterail',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    })



var txtMoisForQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisForQty',
        name        : 'txtMoisForQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    });



var txtMoisWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisWt',
        name        : 'txtMoisWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txtLLessPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtLLessPer',
        name        : 'txtLLessPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtLLessQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtLLessQty',
        name        : 'txtLLessQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }   
   });

var txtRejectQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRejectQty',
        name        : 'txtRejectQty',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtRejectPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRejectPer',
        name        : 'txtRejectPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }   

    });

var txtAcceptWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAcceptWt',
        name        : 'txtAcceptWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotTicketWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Ticket Qty',
        id          : 'txttotTicketWt',
        name        : 'txttotTicketWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txttotAcceptWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Accepted Qty',
        id          : 'txttotAcceptWt',
        name        : 'txttotAcceptWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });



var txtTicketNo = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTicketNo',
        name        : 'txtTicketNo',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });




var lblTicketNo = new Ext.form.Label({
    fieldLabel  : 'Ticket No',
    id          : 'lblTicketNo',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblTicketWT = new Ext.form.Label({
    fieldLabel  : 'Wt(Kgs)',
    id          : 'lblTicketWT',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItem',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblMoisper = new Ext.form.Label({
    fieldLabel  : 'Mois %',
    id          : 'lblMoisper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblMoisQty = new Ext.form.Label({
    fieldLabel  : 'Mois Qty',
    id          : 'lblMoisQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblMoisForPer = new Ext.form.Label({
    fieldLabel  : 'Mois % of Material',
    id          : 'lblMoisForPer',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblMoisForQty = new Ext.form.Label({
    fieldLabel  : 'Mois For the Qty',
    id          : 'lblMoisForQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 55
});

var lbllifelessper = new Ext.form.Label({
    fieldLabel  : 'L.less %',
    id          : 'lbllifelessper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lbllifelessQty = new Ext.form.Label({
    fieldLabel  : 'L.Less Qty',
    id          : 'lbllifelessQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblRejectper = new Ext.form.Label({
    fieldLabel  : 'Reject %',
    id          : 'lblRejectper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblRejectQty = new Ext.form.Label({
    fieldLabel  : 'Reject Qty',
    id          : 'lblRejectQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblDegradeQty = new Ext.form.Label({
    fieldLabel  : 'Degraded',
    id          : 'lblDegradeQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});



var lblAcceptedQty = new Ext.form.Label({
    fieldLabel  : 'Accepted Qty',
    id          : 'lblAcceptedQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var value1 = 0;
var costrate = 0;
var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
bodyStyle:{"background-color":"#ebebdf"},
    listeners:{



        click: function(){              
          //  flxGRNDetail.show();
          //  flx_poDetails.hide();


	    var gstadd="true";
	
	if(Number(txtTicketNo.getValue())==0) 
	{
                Ext.MessageBox.alert("QC", "Select Ticket No...");  	
	}            
	if(Number(txtTicketWt.getValue())==0) 
	{
                Ext.MessageBox.alert("QC", " Ticket Weight is empty...");  	
	}            

	else if(cmbItem.getValue()==0 || cmbItem.getRawValue()=="")
	{
                Ext.MessageBox.alert("QC", "Select Item..");  
                 gstadd="false";
        }
	
	else if((txtAcceptWt.getValue() == '') || (txtAcceptWt.getValue() == 0))
	    {
                Ext.MessageBox.alert("QC", "Accept qty Should not be Zero..");
                 gstadd="false";
            }
	else if(txtRemarks.getRawValue()=='')
	{
                Ext.MessageBox.alert("QC", "Enter REMARKS line..");
                gstadd="false";
        }  

            if(gstadd=="true")
            {
		
                var ginitemseq = cmbItem.getRawValue();
                flxGRNDetail.getSelectionModel().selectAll();
                var selrows = flxGRNDetail.getSelectionModel().getCount();
                var sel = flxGRNDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemcode === cmbItem.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                        value1 = Number(txtAcceptWt.getValue()) *  Number(txtRate.getValue());

                        value1 = Ext.util.Format.number(value1,"0.00");
                        costrate = Ext.util.Format.number(value1/Number(txtAcceptWt.getValue()) ,"0.00");

                       	var idx = flxGRNDetail.getStore().indexOf(editrow);
			sel[idx].set('ticketno'   , txtTicketNo.getValue());
			sel[idx].set('ticketwt'   , txtTicketWt.getValue());
			sel[idx].set('itemname'   , cmbItem.getRawValue());
			sel[idx].set('itemcode'   , cmbItem.getValue());
			sel[idx].set('moismatrialqty' , txtMoisTotalMaterail.getValue());
			sel[idx].set('moisforqty'    , txtMoisForQty.getValue());
			sel[idx].set('moisper'    , txtMoisPer.getValue());
			sel[idx].set('moisqty'    , txtMoisWt.getValue());
			sel[idx].set('lifelessper', txtLLessPer.getValue());
			sel[idx].set('lifelessqty', txtLLessQty.getValue());
			sel[idx].set('rejectper'  , txtRejectPer.getValue());
			sel[idx].set('rejectqty'  , txtRejectQty.getValue());
			sel[idx].set('degradeqty' , txtDegradeQty.getValue());
			sel[idx].set('grnqty'  , txtAcceptWt.getValue());
			sel[idx].set('remarks'    , txtRemarks.getValue());
                        sel[idx].set('seqno'      , seqno);			
                   	sel[idx].set('packtype'   , cmbPackingType.getRawValue());
			sel[idx].set('itemrate'  , txtRate.getValue());
			sel[idx].set('itemvalue'  , value1);
			sel[idx].set('costvalue'  , value1);
			sel[idx].set('costrate'  , costrate);


			flxGRNDetail.getSelectionModel().clearSelections();
                        refresh();


		}//if(gridedit === "true")

                else

                
		if (cnt > 0)
		{
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {
                    var RowCnt = flxGRNDetail.getStore().getCount() + 1;
                    flxGRNDetail.getStore().insert(
                        flxGRNDetail.getStore().getCount(),
                        new dgrecord({
                                slno        :  RowCnt,
		              	ticketno    :  txtTicketNo.getValue(),
				ticketwt    :  txtTicketWt.getValue(),
				itemname    :  cmbItem.getRawValue(),
				itemcode    :  cmbItem.getValue(),
				moismatrialqty  :  txtMoisTotalMaterail.getValue(),
				moisforqty     :  txtMoisForQty.getValue(),
				moisper     :  txtMoisPer.getValue(),
				moisqty     :  txtMoisWt.getValue(),
				lifelessper :  txtLLessPer.getValue(),
				lifelessqty :  txtLLessQty.getValue(),
				rejectper   :  txtRejectPer.getValue(),
				rejectqty   :  txtRejectQty.getValue(),
				degradeqty  :  txtDegradeQty.getValue(),
				grnqty      :  txtAcceptWt.getValue(),
                   	        packtype    :  cmbPackingType.getRawValue(),
				remarks     :  txtRemarks .getValue(),
                                seqno       :  seqno,

                        }) 
                        );
                       refresh();
                }

                grid_tot();
            }
        }
    }
});

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

       var totalgrnqty = Number(txttotitemqty.getValue());
       var addnlvalue  = Number(txtfreight.getValue()) +  Number(txtotherchrgs.getValue());
       var addnl1 =0;



		var Rowk= flxGRNDetail.getStore().getCount();
        	flxGRNDetail.getSelectionModel().selectAll();
		var selk=flxGRNDetail.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{
                    if (totalgrnqty > 0){
                       pdb_costvalue = 0;
                       pdb_costrate = 0;
                       addnl1 =  addnlvalue / totalgrnqty * Number(selk[i].data.grnqty);

		       pdb_costvalue = Ext.util.Format.number((Number(selk[i].data.itemvalue) + addnl1) ,"0.00");
                       pdb_costrate = Ext.util.Format.number((pdb_costvalue / (Number(selk[i].data.grnqty)) ), "0.00000");
//alert(pdb_costvalue);
                       selk[i].set('costvalue', pdb_costvalue);
                       selk[i].set('costrate', pdb_costrate);
                    }
		}
						




}

function calcostdegr(){

/*

       var totalgrnqty =  Number(txttotitemqty.getValue());
       var addnlvalue  = Number(txtfreight.getValue()) +  Number(txtotherchrgs.getValue());
       var addnl1 =0;

		var Rowk= flxGRNDetaildegr.getStore().getCount();
        	flxGRNDetaildegr.getSelectionModel().selectAll();
		var selk=flxGRNDetaildegr.getSelectionModel().getSelections();
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
						
*/

}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function refresh(){
        flxLedger.hide(); 
        txtTicketWt.setValue(txtDegradeQty.getValue()); 
        txtMoisPer.setValue('');
	txtMoisWt.setValue('');
	txtLLessPer.setValue('');
	txtLLessQty.setValue('');
	txtRejectPer.setValue('');
	txtRejectQty.setValue('');
	txtAcceptWt.setValue(txtDegradeQty.getValue());
        txtDegradeQty.setValue('');
	txtRemarks.setValue('');
        txtMoisForQty.setValue('');

        txtcreditdays.setValue('30');
				
}

var pdb_totqty =0;



function remove_deduction_qty()
{
	var Row= flxGRNDetail.getStore().getCount();
	flxGRNDetail.getSelectionModel().selectAll();

	var sel=flxGRNDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {

          ticketwt = sel[i].data.ticketwt;

          sel[i].set('moismatrialqty', 0);
          sel[i].set('moisper', 0);
          sel[i].set('moisforqty', 0);
          sel[i].set('moisqty', 0);
          sel[i].set('lifelessper', 0);
          sel[i].set('lifelessqty', 0);
          sel[i].set('rejectper', 0);
          sel[i].set('rejectqty', 0);
          sel[i].set('degradeqty', 0);
          sel[i].set('grnqty', ticketwt);
          grid_tot();

        }


}
function grid_tot(){

	pdb_totval = 0;
	pdb_totedval = 0;

	totgrnqty = 0;

        var totgrnvalue  =0; 
        var totgrnvalue2  =0; 
	var Row= flxGRNDetail.getStore().getCount();
	flxGRNDetail.getSelectionModel().selectAll();

	var sel=flxGRNDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {


          value1 = Number(sel[i].data.itemrate) * Number(sel[i].data.grnqty);

//alert(Number(sel[i].data.grnqty));
          value1 = Math.round(value1  * 10000) / 10000;
          value1 = Math.round((value1 +0.0001+ Number.EPSILON) * 100) / 100;
          value1 = value1.toFixed(2);  

   

          value1 =  Ext.util.Format.number(value1,'0.00');
          sel[i].set('itemvalue', value1);

        }


        for(var i=0;i<Row;i++)
        {
                totgrnqty = Number(totgrnqty) + Number(sel[i].data.grnqty) ;
                pdb_totval = Number(pdb_totval) + Number(sel[i].data.itemvalue);

        }

	txttotitemqty.setValue(Ext.util.Format.number(Number(totgrnqty),"0.000"));
	txttotitemval.setRawValue(Ext.util.Format.number(Number(pdb_totval),"0.00"));




        if (frtype == 'S')
           pdb_totval = Number(pdb_totval) + Number(txtfreight.getValue());

        else
           pdb_totval = Number(pdb_totval);




	cgstval1 =  Number(pdb_totval) * txtCGSTPer.getValue()/100;
	sgstval1 =  Number(pdb_totval) * txtSGSTPer.getValue()/100;
	igstval1 =  Number(pdb_totval) * txtIGSTPer.getValue()/100;


        cgstval1 = Math.round(cgstval1 * 100) / 100;
        sgstval1 = Math.round(sgstval1 * 100) / 100;
        igstval1 = Math.round(igstval1 * 100) / 100;



	txtcgstval.setValue(Ext.util.Format.number(cgstval1,"0.00"));
	txtsgstval.setValue(Ext.util.Format.number(sgstval1,"0.00"));
	txtigstval.setValue(Ext.util.Format.number(igstval1,"0.00"));







//	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );






   	var tcs_calc =0;

    	tcs_calc = Number(pdb_totval) + Number(txtcgstval.getValue()) + Number(txtsgstval.getValue()) + Number(txtigstval.getValue());
	txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));

//	txtotherchrgs.setRawValue(Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtigstval.getValue()));

	txttotgrnval.setValue(Number(pdb_totval) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );


	totgrnvalue =  Number(pdb_totval) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) ;

//alert("roundoff1");
        if (roundoff == "Y")           
           totgrnvalue2 =  totgrnvalue.toFixed(0) ;
        else
           totgrnvalue2 =  totgrnvalue;

        if (rounding == 1)        
{
//  	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue) + Number(txtroundoff.getValue()) ,"0.00"));
        totgrnvalue2 =  Number(totgrnvalue2)  + Number(txtroundoff.getValue());

}
        else   
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));



	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));

       txtBillValue.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));


//	txtlandingcost.setRawValue(Number(txttotgrnval.getValue()) - Number(txtotherchrgs.getValue()));
//	txtlandingcost.setRawValue(Number(pdb_totvalnew)+txtotherchrgs.getValue()) ;


        findLandingCost();
        calcost(); 
        flxaccupdation();
        grid_tot_acc();      
}



function grid_tot_acc(){
        var dr = 0;
        var cr = 0;
         txtTotDebit.setRawValue(0);
         txtTotCredit.setRawValue(0);



	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);

            dr = Math.round(dr * 100) / 100;
            cr = Math.round(cr * 100) / 100;
         }
 

         txtTotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));


}


function findLandingCost(){



        if (frtype == 'S')
           {  
           pdb_totvalnew = Number(txttotitemval.getValue()) + Number(txtfreight.getValue());
           txtlandingcost.setRawValue(Number(pdb_totvalnew)+Number(txtotherchrgs.getValue())) ; 
           }   

        else
           {
           pdb_totvalnew = Number(txttotitemval.getValue());
           txtlandingcost.setRawValue(Number(pdb_totvalnew)+Number(txtotherchrgs.getValue())+Number(txtfreight.getValue())) ; 

           }  

//	txtcgstval.setRawValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtCGSTPer.getValue()/100,"0.00"));
//	txtsgstval.setRawValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtSGSTPer.getValue()/100,"0.00"));
//	txtigstval.setRawValue(Ext.util.Format.number(Number(pdb_totvalnew)*txtIGSTPer.getValue()/100,"0.00"));


	cgstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtCGSTPer.getValue()/100;
	sgstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtSGSTPer.getValue()/100;
	igstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtIGSTPer.getValue()/100;


        cgstval1 = Math.round(cgstval1 * 100) / 100;
        sgstval1 = Math.round(sgstval1 * 100) / 100;
        igstval1 = Math.round(igstval1 * 100) / 100;



	txtcgstval.setValue(Ext.util.Format.number(cgstval1,"0.00"));
	txtsgstval.setValue(Ext.util.Format.number(sgstval1,"0.00"));
	txtigstval.setValue(Ext.util.Format.number(igstval1,"0.00"));



//	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) +Number(txtotherchrgs.getValue()) );


	totgrnvalue =  Number(pdb_totvalnew) + Number(totgrndrvalue) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) ;

//        totgrnvalue2 =  totgrnvalue.toFixed(0) ;
//alert("roundoff2");
        if (roundoff == "Y")           
           totgrnvalue2 =  totgrnvalue.toFixed(0) ;
        else
           totgrnvalue2 =  totgrnvalue;

//alert(rounding);
        if (rounding == 1)        
{
//  	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue) + Number(txtroundoff.getValue()) ,"0.00"));
     totgrnvalue2 =  Number(totgrnvalue2) + Number(txtroundoff.getValue());
}
        else   
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));



	txttotgrnval.setRawValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));

   txtBillValue.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));

    //    txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));


calcost(); 
//calcostdegr()

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

        		var Row= flxGRNDetail.getStore().getCount();
        		flxGRNDetail.getSelectionModel().selectAll();

        			var sel=flxGRNDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    totgrnqty=Number(totgrnqty)+Number(sel[i].data.grnqty);
				    totgrnvalue=Number(totgrnvalue)+Number(sel[i].data.itemvalue);
				    grnrate=Number(grnrate)+Number(sel[i].data.itemrate);
        			}
				    txttotitemqty.setValue(totgrnqty + totgrndrqty);
				    txttotitemval.setValue(totgrnvalue + totgrndrvalue);

//				    txtcgstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtCGSTPer.getValue()/100);
//				    txtsgstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtSGSTPer.getValue()/100);
//				    txtigstval.setRawValue(Number(totgrnvalue + totgrndrvalue)*txtIGSTPer.getValue()/100);


	cgstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtCGSTPer.getValue()/100;
	sgstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtSGSTPer.getValue()/100;
	igstval1 =  Number(pdb_totvalnew + totgrndrvalue)* txtIGSTPer.getValue()/100;


        cgstval1 = Math.round(cgstval1 * 100) / 100;
        sgstval1 = Math.round(sgstval1 * 100) / 100;
        igstval1 = Math.round(igstval1 * 100) / 100;



	txtcgstval.setValue(Ext.util.Format.number(cgstval1,"0.00"));
	txtsgstval.setValue(Ext.util.Format.number(sgstval1,"0.00"));
	txtigstval.setValue(Ext.util.Format.number(igstval1,"0.00"));


txttotgrnval.setValue(totgrnvalue + totgrndrvalue + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) );
//txtlandingcost.setRawValue(Ext.util.Format.number((totgrnqty + totgrndrqty) * (grnrate + grndrrate)),"0.00");

//txtlandingcost.setRawValue(Ext.util.Format.number(Number(Number(totgrnqty) + Number(totgrndrqty)) * (Number(grnrate) + Number(grndrrate))),'0.00');



//txtBillValue.setRawValue(Number(txttotitemval.getValue())+Number(txtcgstval.getValue())+Number(txtsgstval.getValue()));
//txtotherchrgs.setRawValue(Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtigstval.getValue()));

txtlandingcost.setRawValue((Number(totgrnqty) + Number(totgrndrqty)) * (Number(grnrate) + Number(grndrrate)));

		 }

function CalDegrval()
{
/*	
	totgrndrqty=0;
	totgrndrvalue=0;
	grndrrate=0;

	var Rowdr = flxGRNDetaildegr.getStore().getCount();
	flxGRNDetaildegr.getSelectionModel().selectAll();
		var seldr=flxGRNDetaildegr.getSelectionModel().getSelections();
		for(var i=0;i<Rowdr;i++)
		{
		    totgrndrqty=Number(totgrndrqty)+Number(seldr[i].data.degrgrnqty);
		    totgrndrvalue=Number(totgrndrvalue)+Number(seldr[i].data.degritemvalue);
		    grndrrate=Number(grndrrate)+Number(seldr[i].data.degritemrate);
		}
*/
//calcostdegr();
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
 /*   txtcgstval.setRawValue(Ext.util.Format.number((txtCGSTPer.getValue() * (Number(txttotitemval.getValue()) / 100) ),"0"));
    txtsgstval.setRawValue(Ext.util.Format.number((txtSGSTPer.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));
    txtigstval.setRawValue(Ext.util.Format.number((txtIGSTPer.getValue() * (Number(txttotitemval.getValue()) / 100) ), "0"));*/

    txttcsval.setRawValue(Ext.util.Format.number((txttcsper.getValue() * (tcs_calc / 100) ), "0"));
//    txtotherchrgs.setRawValue(Ext.util.Format.number((txtcgstval.getValue() + txtsgstval.getValue() + txtigstval.getValue()), "0"));



    


}




var btnRounding = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "M",
    width   : 10,
    height  : 10,
 border: 0,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
               rounding = 1;

        }
    }
 });

/*

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "ADD",
    width   : 80,
    height  : 40,
    x       : 880,
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
		        
		        flxGRNDetail.getSelectionModel().selectAll();
		        var selrows = flxGRNDetail.getSelectionModel().getCount();
		        var sel = flxGRNDetail.getSelectionModel().getSelections();

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
			var idx = flxGRNDetail.getStore().indexOf(editrow);

			sel[idx].set('itemcode', cmbitem.getValue());
			sel[idx].set('itemname', cmbitem.getRawValue());
			sel[idx].set('ordqty', txtpendqty.getRawValue());
			sel[idx].set('billqty', txtbillqty.getRawValue());
			sel[idx].set('millqty', txtmillqty.getValue());
			sel[idx].set('moisper', txtmoisper.getValue());
			sel[idx].set('moisqty', txtmoisqty.getValue());
			sel[idx].set('tarqty', Number(txttareqty.getValue()));
			sel[idx].set('llqty', Number(txtlifelessqty.getValue()));
			sel[idx].set('rejqty', Number(txtrejqty.getValue()));
			sel[idx].set('degrqty', Number(txtdegradeqty.getRawValue()));

			sel[idx].set('totded', Number(txtdedqty.getValue()));
			sel[idx].set('grnqty', txtgrnqty.getValue());
			sel[idx].set('itemrate', txtRate.getValue());
	
			sel[idx].set('itemvalue' ,txtitemval.getValue());
			sel[idx].set('lotno', cmblot.getRawValue());

			sel[idx].set('remarks', txtRemarks.getValue().toUpperCase());
			sel[idx].set('lotcode', cmblot.getValue());
	
			sel[idx].set('pregrnqty', txtgrnqty.getValue());

				for (var i=0;i<selrows;i++)
				{
				
					freqty = freqty + Number(sel[i].data.qty);
					
				}
					

		                    	grid_tot();
					CalculateTax();
					grid_tot();
					refresh();

			flxGRNDetail.getSelectionModel().clearSelections();



		}//if(gridedit === "true")
		else{

			if (cnt ==0)
			{
		            var RowCnt = flxGRNDetail.getStore().getCount() + 1;
		            flxGRNDetail.getStore().insert(
		                flxGRNDetail.getStore().getCount(),
		                new dgrecord({

		                    	slno:RowCnt,
					itemcode:cmbitem.getValue(),
		                    	itemname:cmbitem.getRawValue(),
				    	ordqty:txtpendqty.getRawValue(),
				    	billqty:txtbillqty.getRawValue(),
					millqty:txtmillqty.getRawValue(),
					moisper:txtmoisper.getRawValue(),
					moisqty:txtmoisqty.getRawValue(),
					tarqty:Number(txttareqty.getRawValue()),
					llqty:Number(txtlifelessqty.getRawValue()),
					rejqty:Number(txtrejqty.getRawValue()),
					degrqty:Number(txtdegradeqty.getRawValue()),
					totded:Number(txtdedqty.getRawValue()),
					grnqty:txtgrnqty.getRawValue(),
					itemrate:txtRate.getRawValue(),

					itemvalue:txtitemval.getRawValue(),
					lotno:cmblot.getRawValue(),
					remarks:txtRemarks.getValue().toUpperCase(),
					lotcode: cmblot.getValue(),
	
					pregrnqty:txtgrnqty.getRawValue()



		                }) 
		                );



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

}*/
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
	enableKeyEvents: true,
    listeners:{
            change:function(){
           /*     duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);*/
            },


          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtSupplierName.focus();
             }
        }  
        }  
});

var dtpbilldate = new Ext.form.DateField({
    fieldLabel : 'Bill Date',
    id         : 'dtpbilldate',
    name       : 'date',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
    listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtBillValue.focus();
             }
        }  ,
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
        width           : 200,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitem',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
		url: 'ClsRMGrn.php',
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
		url: 'ClsRMGrn.php',
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
		pono = cmbPONO.getValue();
		chkstatus = "N"
	}

	txtmoisqty.setValue(0);
	txtdedqty.setValue(0);
	txtgrnqty.setValue(0);
	loaditemqtydatastore.removeAll();
	loaditemqtydatastore.load({
		url: 'ClsRMGrn.php',
		params:
		{
			task:"loaditemqty",
			pono : pono,
			item : cmbitem.getValue(),
			status : chkstatus
		},
	callback:function()
	{

		txtpendqty.setValue((Number(loaditemqtydatastore.getAt(0).get('ordt_pen_qty')) + Number(chkgrnqty)));

		if((cmbPONO.getRawValue().charAt(2)) == "A" && chkitmrate == 0 ){ 
			chkitmrate = loaditemqtydatastore.getAt(0).get('ordt_unit_rate');
		}
		if((cmbPONO.getRawValue().charAt(2)) == "A") {
			txtRate.setValue(chkitmrate);
		}
		else { 
			txtRate.setValue(loaditemqtydatastore.getAt(0).get('ordt_unit_rate')); 
		}

		txtmoisper.setValue(loaditemqtydatastore.getAt(0).get('ordt_moisper'));

		txtRate.setValue(loaditemqtydatastore.getAt(0).get('ordt_unit_rate'));

		dedqty = 0;
		pomoistureper = (loaditemqtydatastore.getAt(0).get('ordt_moisper'));

		
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

		flxGRNDetail.getStore().removeAll();

	//	flxitem.getStore().removeAll();
		tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);
		loadgrndetaildatastore.removeAll();//sprm_sel_recheddet
            	loadgrndetaildatastore.load({
                url: 'ClsRMGrn.php',
                params:
                {
                    task:"loadgrndetail", 
                    finid: GinFinid,
		    compcode: Gincompcode,
		    grnno: cmbgrnno.getValue(),
		    gstFlag : gstFlag
                },
		callback:function(){
			

		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsRMGrn.php',
			params:
			{
				task:"loadPurGroup",
				supptype : loadgrndetaildatastore.getAt(0).get('sup_type'),
                 
			},
                     	callback:function(){
                        cmbPurchaseLedger.setValue(loadgrndetaildatastore.getAt(0).get('rech_purledger'));
                        } 
			   
		});

     
                        seqno = loadgrndetaildatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');

                        cmbQCEntNo.setValue(loadgrndetaildatastore.getAt(0).get('rech_qc_ins_no'));
//alert(poseqno);

                        txtGRNNo.setValue(cmbgrnno.getRawValue());
                        
			dtpgrndate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_date'),'d-m-Y'));
			supcode = loadgrndetaildatastore.getAt(0).get('rech_sup_code');
			txtSupplierName.setRawValue(loadgrndetaildatastore.getAt(0).get('sup_refname'));
                   	txtCrdays.setValue(loadgrndetaildatastore.getAt(0).get('rech_crdays'));

                        ledgercode = loadgrndetaildatastore.getAt(0).get('sup_led_code');

                        if (loadgrndetaildatastore.getAt(0).get('rech_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else if (loadgrndetaildatastore.getAt(0).get('rech_roundneeded') == "N")
                           Ext.getCmp("optRounding").setValue(2);
                     else
                           Ext.getCmp("optRounding").setValue(3);

                        txtfreight.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_freight'));
                        txtotherchrgs.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_otheramt'));
                        txtvehicle.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_truckno'));
			txtgateno.setValue(loadgrndetaildatastore.getAt(0).get('rech_geno'));
			dtpgatedate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtbillno.setValue(loadgrndetaildatastore.getAt(0).get('rech_billno'));
			dtpbilldate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_billdate'),'d-m-Y'));

			cmbPONO.setValue(loadgrndetaildatastore.getAt(0).get('ordh_no'));
                        if (loadgrndetaildatastore.getAt(0).get('ordh_no') == 0 )
                            cmbPONO.setRawValue('Not Applicable');


			Ext.getCmp('cmbPONO').setDisabled(true);
			edpono = loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');
			txtBillValue.setValue(loadgrndetaildatastore.getAt(0).get('rech_billvalue'));
			stper = 0; scper = 0;



			loadpoitemdatastore.removeAll();
			    loadpoitemdatastore.load({
				url: 'ClsRMGrn.php',
				params:
				{
				    task:"loadpoitem",
				    compcode: Gincompcode,
				    finid: GinFinid,
				    ordcode: edpono
				}
			    });
			txtCGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_cgstper'));
			txtSGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_sgstper'));
			txtIGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_igstper'));
	//		txtigstval.setDisabled(true);
			txttcsper.setRawValue(loadgrndetaildatastore.getAt(0).get('ordh_tcsper'));
	//		txttcsval.setDisabled(true);

			edsuptype = loadgrndetaildatastore.getAt(0).get('sup_type');
			edacctflag = loadgrndetaildatastore.getAt(0).get('rech_acctflag');


//			txtTicketNo.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_wtcardno'));
             		cmbArea.setValue(loadgrndetaildatastore.getAt(0).get('rech_area_code'));
			FrePaidby = loadgrndetaildatastore.getAt(0).get('rech_freighttype');
                        if (FrePaidby == 'M')
                        {
                              Ext.getCmp('optfrtype').setValue(1);
                        }
                        else
                        {
                              Ext.getCmp('optfrtype').setValue(2);
                        }  



			fareacode = loadgrndetaildatastore.getAt(0).get('rech_area_code');
	txtroundoff.setValue(loadgrndetaildatastore.getAt(0).get('rech_roundingoff'));

//alert(txtroundoff.getValue());

			loadgrnitemdetaildatastore.removeAll();//sprm_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsRMGrn.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    grnno: cmbgrnno.getRawValue(),
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

					flxGRNDetail.getStore().insert(
					flxGRNDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('itmh_name'),
						ticketno: loadgrnitemdetaildatastore.getAt(i).get('rect_ticketno'),

					    	billwt: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
						ticketwt: loadgrnitemdetaildatastore.getAt(i).get('rect_millqty'),
                                                moismatrialqty: loadgrnitemdetaildatastore.getAt(i).get('rect_mois_for_material'),
                                                moisforqty: loadgrnitemdetaildatastore.getAt(i).get('rect_mois_for_qty'),
						moisper: loadgrnitemdetaildatastore.getAt(i).get('rect_moisper'),
						moisqty: loadgrnitemdetaildatastore.getAt(i).get('rect_moisqty'),
//						tarqty: loadgrnitemdetaildatastore.getAt(i).get('rect_tareqty'),
						lifelessqty: loadgrnitemdetaildatastore.getAt(i).get('rect_lifelessqty'),
						rejectqty: loadgrnitemdetaildatastore.getAt(i).get('rect_rejqty'),


						lifelessper: loadgrnitemdetaildatastore.getAt(i).get('rect_lifeless_per'),
						rejectper: loadgrnitemdetaildatastore.getAt(i).get('rect_reject_per'),


						degradeqty: loadgrnitemdetaildatastore.getAt(i).get('rect_degqty'),
						totded: loadgrnitemdetaildatastore.getAt(i).get('rect_totdedqty'),
						grnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
						itemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
						rateded: loadgrnitemdetaildatastore.getAt(i).get('rect_rateded'),
						itemvalue : loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						costvalue : loadgrnitemdetaildatastore.getAt(i).get('rect_costvalue'),
						costrate  : loadgrnitemdetaildatastore.getAt(i).get('rect_costrate'),
						packtype  : loadgrnitemdetaildatastore.getAt(i).get('rect_mat_pack_type'),


//						lotno: loadgrnitemdetaildatastore.getAt(i).get('lot_refno'),
						remarks: loadgrnitemdetaildatastore.getAt(i).get('rect_remarks'),
//						lotcode: loadgrnitemdetaildatastore.getAt(i).get('rect_lotno'),
						//bags: loadgrnitemdetaildatastore.getAt(i).get('rect_grnbags'),
//						pregrnqty: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

						}) 
						);   
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
	

					}//For Loop
				 grid_tot(); CalculateTax();CalDegrval();  

				}//callback function loadgrnitemdetail

			});//loadgrnitemdetail
			//Freight Details

                          txtCGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setRawValue(loadgrndetaildatastore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadgrndetaildatastore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadgrndetaildatastore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadgrndetaildatastore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadgrndetaildatastore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadgrndetaildatastore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadgrndetaildatastore.getAt(0).get('tax_igstledger');


                        grid_tot();

			if(edacctflag == "Y"){
				Ext.getCmp('save').setDisabled(true);
	
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


var poitemcode =0;
var poitemrate = 0;
var acceptedqty = 0;
var cmbPONO = new Ext.form.ComboBox({
        fieldLabel      : 'Po No',
        width           : 110,
        displayField    : 'ordh_no', 
        valueField      : 'ordh_seqno',
        hiddenName      : '',
        id              : 'cmbPONO',
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
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtbillno.focus();
             }
        }  ,
 	select: function(){
	tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);



                poseqno = cmbPONO.getValue();  
		loadpoitemdatastore.removeAll();
		loadpoitemdatastore.load({
			url: 'ClsRMGrn.php',
			params:
			{
			    task:"loadpoitem",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbPONO.getValue()
			},
			scope : this,
			callback : function()
			{

	                   var cnt=loadpoitemdatastore.getCount();

	                   if(cnt>0)
		           {
                                  for(var j=0; j<cnt; j++)
	                          { 
				     poitemcode = loadpoitemdatastore.getAt(j).get('itmh_code');
				     poitemrate = loadpoitemdatastore.getAt(j).get('ordt_unit_rate');



//alert(poitemrate);
			             var Row= flxGRNDetail.getStore().getCount();
				     flxGRNDetail.getSelectionModel().selectAll();
				     var sel=flxGRNDetail.getSelectionModel().getSelections();
				     for(var i=0;i<Row;i++)
                                     {
					  if ( Number(sel[i].data.itemcode) == poitemcode)
                                          {
                                                acceptedqty = Number(sel[i].get('grnqty'));
     //                                      	colname = 'itemrate';		
                                                sel[i].set('itemrate', poitemrate);
                                                sel[i].set('itemvalue', poitemrate*acceptedqty);

                                          }                 
                          	     }


                                  }
       //                           grid_tot();

                           } 
//               grid_total(); 
		        }     
		});

                txtbillno.focus();
		loadpoheaderdatastore.removeAll();

		    loadpoheaderdatastore.load({
			url: 'ClsRMGrn.php',
			params:
			{
			    task:"loadpoheader",
			    compcode: Gincompcode,
			    finid: GinFinid,
			    ordcode: cmbPONO.getValue()
			},
			scope : this,
			callback : function()
			{	
                            var cnt = loadpoheaderdatastore.getCount();		
                            if (cnt > 0)
                            {
				FrePaidby = loadpoheaderdatastore.getAt(0).get('ordh_frttype');
				
				stper = loadpoheaderdatastore.getAt(0).get('ordh_stper');
				scper = loadpoheaderdatastore.getAt(0).get('ordh_scper');
				suptype = loadpoheaderdatastore.getAt(0).get('sup_type');
                         	txtCrdays.setValue(loadpoheaderdatastore.getAt(0).get('ordh_creditdays'));
				txtCGSTPer.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_cgstper'));
				txtSGSTPer.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_sgstper'));
				txtIGSTPer.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_igstper'));
				txtigstval.setDisabled(true);
				txttcsper.setRawValue(loadpoheaderdatastore.getAt(0).get('ordh_tcsper'));
				txttcsval.setDisabled(true);
	                      }
    grid_tot();
				

				CalculateTax();
				
			}
		    });   Ext.getCmp('optfrtype').setValue(Number(FrePaidby));

	}
	}


   });



function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('led_code'));
	if ((selrow != null)){
		ledcode = selrow.get('led_code');
		supcode = selrow.get('qc_rm_supcode');
		suptype = selrow.get('sup_type');
		supwp_gsttype = selrow.get('sup_wp_gstinv_supplier_yn');

		txtSupplierName.setValue(selrow.get('led_name'));
		flxLedger.hide();
                cmbQCEntNo.focus();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsRMGrn.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                            //    gsttype : dngsttype,  

			},
		});



        loadQCEntryNoListDatastore.removeAll();
	loadQCEntryNoListDatastore.removeAll();
            loadQCEntryNoListDatastore.load({
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




        loadpoitemdatastore.removeAll();
	loadponodatastore.removeAll();
            loadponodatastore.load({
                url: 'ClsRMGrn.php',
                params:
                {
                    task:"loadpono",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    supcode : supcode
                },
		callback : function(){

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
        x: 250,
        y: -5,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'qc_rm_supcode',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'sup_type',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'sup_wp_gstinv_supplier_yn',sortable:true,width:50,align:'left'},

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


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsRMGrn.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSupplierName.getRawValue(),
		},
        });
}




var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
        readOnly  : true,
	listeners:{

         }  
    });

function get_purchase_ledgers()
{
      
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsRMGrn.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{

                  grid_tot();

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
                          txtCGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
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

}



var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'QC Insp. No.',
        width           : 100,
        displayField    : 'qc_rm_entryno', 
        valueField      : 'qc_rm_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadQCEntryNoListDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
    enableKeyEvents: true,  
        listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbPONO.focus();
             }   
             },
           select: function(){
                flxGRNDetail.getStore().removeAll();
            	loadQCEntryNoDetailDatastore.removeAll();
		loadQCEntryNoDetailDatastore.load({
		 	url:'ClsRMGrn.php',
			params:
	   		{
			task:"loadQCEntryNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){

               
                        if (loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_billdate') != null)
                           dtpbilldate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_billdate'),'d-m-Y'));
                        txtbillno.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_billno'));
                        txtBillValue.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_billvalue'));
                        cmbArea.setValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_area'));



                        areagrpcode = loadQCEntryNoDetailDatastore.getAt(0).get('areagrp_code');

                        areacode = loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_area');

                        unloaddate = loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_unloadingtime');

                        supcode = loadQCEntryNoDetailDatastore.getAt(0).get('sup_code');
	                txtvehicle.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_truck'));

                        cmbPurchaseLedger.setValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_pur_ledger'));



                          txtCGSTPer.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadQCEntryNoDetailDatastore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadQCEntryNoDetailDatastore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadQCEntryNoDetailDatastore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadQCEntryNoDetailDatastore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadQCEntryNoDetailDatastore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadQCEntryNoDetailDatastore.getAt(0).get('tax_igstledger');


                        var bl ="";
			var RowCnt = loadQCEntryNoDetailDatastore.getCount();
//                        txttotTicketWt.setValue('');
//                        txttotAcceptWt.setValue('');
			for (var i=0;i<RowCnt;i++)
			{
                                if (loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_packtype') == "B")
                                    bl = "BUNDLE";
                                else 
                                    bl = "LOOSE";

                                bwt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_billqty')/1000,'0.000'); 
                                twt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketwt')/1000,'0.000'); 

                                moiswt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisqty')/1000,'0.000'); 

                                llwt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_llessqty')/1000,'0.000'); 
                                regwt =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectqty')/1000,'0.000'); 

                               degwt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_degradeqty')/1000,'0.000'); 

                               grnwt  =   Ext.util.Format.number(loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_acceptqty')/1000,'0.000'); 


          			flxGRNDetail.getStore().insert(
				flxGRNDetail.getStore().getCount(),
				new dgrecord({
				      	slno        :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_slno'),	
                                        billwt      :  bwt,	
				      	ticketno    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketno'),
					ticketwt    :  twt,
					itemname    :  loadQCEntryNoDetailDatastore.getAt(i).get('itmh_name'),
					itemcode    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_itemcode'),
                                        moismatrialqty    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper_totalmaterial'),
                        		moisforqty     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisforqty'),
					moisper     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper'),
					moisqty     :  moiswt,
					lifelessper :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_llessper'),
					lifelessqty :  llwt,
					rejectper   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectper'),
					rejectqty   :  regwt,
					degradeqty  :  degwt,
					grnqty      :  grnwt,
		           	        packtype    :  bl,
					remarks     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_remarks'),
                                        itemrate    :   loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rate'),
                                        itemvalue   :  0,
                                        costrate    :  0,
                                        costvalue   :  0,
                    		        itemtype   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_itemtype'),
				}) 
				); 
                     }    
 
                     get_purchase_ledgers();
               grid_tot();
          cmbPONO.focus();

	
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

 var txtCrdays = new Ext.form.NumberField({
        fieldLabel  : 'Paymt Terms',
        id          : 'txtCrdays',
        name        : 'txtCrdays',
        width       :  50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbPurchaseLedger.focus();
             }
        }  
        }  


    });


 var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtbillno',
        name        : 'txtbillno',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,


	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   dtpbilldate.focus();
             }
        }  
        }  
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
var txtgateno = new Ext.form.NumberField({
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
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);
            }
    }
});

 var frtype="M";
var optfrtype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Freight Paid By',

    fieldLabel: '',
    layout : 'hbox',
    width: 180,
    height:127,
    defaultType : 'textfield',
    x:550,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optfrtype',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Mill', name: 'rb',  inputValue: 1,//,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 frtype="M";
                 findLandingCost();   
               }
              }
             }
            },
            {boxLabel: 'Supplier', name: 'rb',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                frtype="S";
                findLandingCost();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});



var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 160,
    height:127,
    defaultType : 'textfield',
    x:740,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding', id:'RoundNeed',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 findLandingCost();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                findLandingCost();   
               }
              }
             }}  , //,txtfreight
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="M";
                rounding = 1;
                findLandingCost();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});


 var txtpendqty = new Ext.form.TextField({
        fieldLabel  : 'Pend Qty',
        id          : 'txtpendqty',
        name        : 'txtpendqty',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    });

 var txtbillqty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtbillqty',
        name        : 'txtbillqty',
        width       :  100,
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
        width       :  80,
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
			//txttareqty.setValue(Number(txtmillqty.getValue()) - Number(txtlifelessqty.getValue()));
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
			
		},
	    change:function()
		{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");

			txtmillqty.focus();
			txtmillqty.setValue("0");
			}
			//txttareqty.setValue(Number(txtmillqty.getValue()) - Number(txtlifelessqty.getValue()));
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
		},
	    keyup:function()
		{
			if (Number(txtmillqty.getValue())> Number(txtpendqty.getValue()))
			{
			alert("Mill Qty Should Not be Greater than Pending Qty..");

			txtmillqty.focus();
			txtmillqty.setValue("0");
			}
			//txttareqty.setValue(Number(txtmillqty.getValue()) - Number(txtlifelessqty.getValue()));
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
			
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
			txtdedqty.setValue(parseFloat(dedqty));
			if (Number(txttareqty.getValue())>Number(txtmillqty.getValue()))
			{
			alert("Tare Qty Should Not be Greater than Mill Qty..");
			txttareqty.focus();
			txttareqty.setValue("0");
			}
			else
			{
			//txtgrnqty.setValue(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue());
txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
			//txtdedqty.setValue((txttareqty.getValue())+(txtlifelessqty.getValue())+(txtrejqty.getValue())+(txtdegradeqty.getValue()));
txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			}
			
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
			if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
			txtmoisqty.setValue((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100);
			
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
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue()));
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
txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtrejqty.getValue())>(txtmillqty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtrejqty.focus();
			txtrejqty.setValue("0");
			}
			else
			{

txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue()));

txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			}
			
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


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{

			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
		txtgrnqty.setValue(Ext.util.Format.number( txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
	},
	keyup:function()
	{


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
//			txtmoisqty.setValue((txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()) * (txtmoisper.getValue() - pomoistureper) / 100);
			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
		txtgrnqty.setValue(Ext.util.Format.number( txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
	},
	keydown:function()
	{


		if (txtmoisper.getValue() < pomoistureper)
		{
			txtmoisqty.setValue(0);
		}
		else
		{
//			txtmoisqty.setValue((txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()) * (txtmoisper.getValue() - pomoistureper) / 100);
			txtmoisqty.setValue(Ext.util.Format.number((
Number(txtmillqty.getValue())-Number(txttareqty.getValue())-Number(txtrejqty.getValue())-Number(txtlifelessqty.getValue())) * (Number(txtmoisper.getValue()) - pomoistureper) / 100,"0.000"));
			
		}
		txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
		txtgrnqty.setValue(Ext.util.Format.number( txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
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
			//txtdedqty.setValue(txttareqty.getValue()+txtlifelessqty.getValue()+txtrejqty.getValue()+txtdegradeqty.getValue());
txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((Number(txtdegradeqty.getValue()))>Number(txtmillqty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtgrnqty.setValue(Ext.util.Format.number(txtmillqty.getValue()-txttareqty.getValue()-txtrejqty.getValue()-txtlifelessqty.getValue()-txtdegradeqty.getValue()-txtmoisqty.getValue(),'0.000'));
			txtitemval.setValue(txtgrnqty.getValue()*(txtRate.getValue() ));
			//txtdedqty.setValue((txttareqty.getValue())+(txtlifelessqty.getValue())+(txtrejqty.getValue())+(txtdegradeqty.getValue()));
txtdedqty.setValue(Ext.util.Format.number(Number(txtmoisqty.getValue())+Number(txttareqty.getValue())+Number(txtlifelessqty.getValue())+Number(txtrejqty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			}

		if(txtdegradeqty.getValue() > 0)
		{

			cmbitemdegr.setValue(Ext.getCmp("cmbitem").getValue()); //Jack


//txtdegrqty.setValue(txtdegradeqty.getValue());
/*
			//cmbitemdegr.add({id: cmbitem.getValue(), name : cmbitem.getRawValue()});
cmbitemdegr.getStore().insert(0, { "valueField": cmbitem.getValue(), "DisplayField": cmbitem.getRawValue() }, true);
 cmbitemdegr.setValue(0);
                    loaddegritemdatastore.insert(cmbitem.getValue(), {
                        value: cmbitem.getRawValue()
                    })*/
 
		}


			
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

var txtRate = new Ext.form.Field({
        fieldLabel  : 'Rate',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
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


var txtBillValue = new Ext.form.NumberField({
        fieldLabel  : 'Bill Value',
        id          : 'txtBillValue',
        name        : 'txtBillValue',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtCrdays.focus();
             }
        }  
        }  


    });

var txtCGSTPer = new Ext.form.TextField({
        fieldLabel  : 'CGST%',
        id          : 'txtCGSTPer',
        name        : 'txtCGSTPer',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,

	enableKeyEvents: true, 
	listeners:{
	keyup:function()
	{
	  grid_tot();
	  CalculateTax(); 
	},

	}

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

var txtSGSTPer = new Ext.form.TextField({
        fieldLabel  : 'SGST%',
        id          : 'txtSGSTPer',
        name        : 'txtSGSTPer',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
	enableKeyEvents: true, 
	listeners:{
	keyup:function()
	{
	  grid_tot();
	  CalculateTax(); 
	},

	}
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

var txtIGSTPer = new Ext.form.TextField({
        fieldLabel  : 'IGST%',
        id          : 'txtIGSTPer',
        name        : 'txtIGSTPer',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
	enableKeyEvents: true, 
	listeners:{
	keyup:function()
	{
	  grid_tot();
	  CalculateTax(); 
	},

	}
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
//	readOnly : true
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
                url: 'ClsRMGrn.php',      // File to connect toClsMasArea
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
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
	  select: function(){
	  }  
	}
   });





var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:65,
    height: 220,
    hidden:false,
    width: 1000,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : false},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:350,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : true},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : true},
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
              credit    : Ext.util.Format.number(txttotgrnval.getRawValue(),'0.00'),
              billno    : txtbillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
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
	      debit     : Ext.util.Format.number(txttotitemval.getRawValue(),'0.00'),
              credit    : 0,
              ledtype   : "G",
              billno    : txtbillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
              }) 
        );
//CGST Account - Debit

        if (txtcgstval.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledger,
		      debit     :  Ext.util.Format.number(txtcgstval.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtbillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//SGST Account - Debit

        if (txtsgstval.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledger,
		      debit     :  Ext.util.Format.number(txtsgstval.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtbillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//IGST Account - Debit

        if (txtigstval.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledger,
		      debit     : Ext.util.Format.number(txtigstval.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtbillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//TCS Account - Debit

        if (txttcsval.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1865',
		      ledname   : 'TCS PAID-PURCHASE',
		      debit     : txttcsval.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtbillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
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
		      billno    : txtbillno.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
	}

       grid_tot_acc();
}
var flxGRNDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:30,
    height: 140,
    hidden:false,
    width: 1220,
    columns:
    [
        {header: "Sl.No", dataIndex: 'slno',sortable:true,width:50,align:'left'},
        {header: "Ticket No", dataIndex: 'ticketno',sortable:true,width:80,align:'left'},
        {header: "BillWt", dataIndex: 'billwt',sortable:true,width:80,align:'left'} ,
        {header: "Accept Wt", dataIndex: 'ticketwt',sortable:true,width:80,align:'left',
       },
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:180,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:18,align:'left',hidden : 'true'},

        {header: "Rate", dataIndex: 'itemrate',sortable:true,width:100,align:'left'}  ,
        {header: "Mois For Material", dataIndex: 'moismatrialqty',sortable:true,width:80,align:'left'

        },
        {header: "Mois For", dataIndex: 'moisforqty',sortable:true,width:80,align:'left'},
        {header: "Mois %", dataIndex: 'moisper',sortable:true,width:80,align:'left'},
        {header: "Mois Qty", dataIndex: 'moisqty',sortable:true,width:80,align:'left'},
        {header: "Life Less %", dataIndex: 'lifelessper',sortable:true,width:80,align:'left'},
        {header: "Life Less Qty", dataIndex: 'lifelessqty',sortable:true,width:80,align:'left'},
        {header: "Reject %", dataIndex: 'rejectper',sortable:true,width:80,align:'left'},
        {header: "Reject Qty", dataIndex: 'rejectqty',sortable:true,width:80,align:'left'},
        {header: "Degrade Qty", dataIndex: 'degradeqty',sortable:true,width:80,align:'left'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:100,align:'left'},
        {header: "Packing Type", dataIndex: 'packtype',sortable:true,width:100,align:'left'},
        {header: "SeqNo", dataIndex: 'seqno',sortable:true,width:100,align:'left' ,hidden:true },
        {header: "GRN Qty", dataIndex: 'grnqty',sortable:true,width:80,align:'left',
/*
                renderer: function(v, params, record){
                    var retval;
                    retval=Number(record.data.ticketwt);
                    return retval;
                    grid_tot();
                },
*/
        editor: {
            xtype: 'numberfield',
            allowBlank: true,
            enableKeyEvents: true,
            decimalPrecision: 3,
            listeners: {
                focus: function () {
                   if (supwp_gsttype == 'Y')
                   {
		            var sm = flxGRNDetail.getSelectionModel();
		            var selrow = sm.getSelected();
		            this.setValue(Number(selrow.get('grnqty')));
		            grid_tot();
                   } 

                },
                blur: function () {
                     grid_tot();
                },
                keyup: function () {
               
                },
   
            }
        }  ,
        },

        {header: "Value", dataIndex: 'itemvalue',sortable:true,width:120,align:'left',
/*
                renderer: function (v, params, record) {

                    var retval;
                    if (Number(record.data.itemrate) > 0) {
                        retval = Number(record.data.itemrate) * Number(record.data.grnqty)/1000;
                        retval = Ext.util.Format.number(Number(retval),"0.00");
                        grid_tot();
                    } else {
                        retval = 0;
                    }
                    return retval;
                }
*/
        },
        {header: "Cost Value", dataIndex: 'costvalue',sortable:true,width:120,align:'left' },
        {header: "Cost Rate", dataIndex: 'costrate',sortable:true,width:120,align:'left' },
        {header: "type", dataIndex: 'itemtype',sortable:true,width:100,align:'left'},


    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

          if (supwp_gsttype == "N" &&  (cellIndex == 3 || cellIndex == 19) )
          {
              alert('Not Allowed to Modify');
          }    
          if (supwp_gsttype == "Y" &&  cellIndex == 0  )
          {
             Ext.Msg.show({
             title: 'RM GRN Modification',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Press YES to Delete -  NO to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
		     {
		           var sm = flxGRNDetail.getSelectionModel();
			   var selrow = sm.getSelected();
                           itype  = selrow.get('itemtype');
                           if (itype == 'D')    
                           {
			   flxGRNDetail.getStore().remove(selrow);
			   flxGRNDetail.getSelectionModel().selectAll();
                           remove_deduction_qty();
                           }
                           else
                           {
				  Ext.Msg.show({
				  title: 'RM GRN Modification',
				  icon: Ext.Msg.QUESTION,
				  buttons: Ext.MessageBox.YESNO,
				  msg: 'It is not a Degraed item.. --  CONFIRM - YES to Delete -  NO to EXIT',
				  fn: function(btn){
				  if (btn === 'yes')
				  {
				   flxGRNDetail.getStore().remove(selrow);
				   flxGRNDetail.getSelectionModel().selectAll();
			           remove_deduction_qty();
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

});









function RefreshData(){
    seqno = 0;
    poseqno = 0;
    rounding = 0;
	Ext.getCmp('save').setDisabled(false);
        gstFlag ="Add";
        flxGRNDetail.getStore().removeAll();
        flxLedger.hide();
//        Ext.getCmp('txtGRNNo').setDisabled(true);
	Ext.getCmp('txtGRNNo').hide();
	Ext.getCmp('cmbgrnno').show();		
	//txtGRNNo.setFocus();
	//txtCGSTPer.setRawValue('2.5');
	//txtSGSTPer.setRawValue('2.5');

	//txtIGSTPer.setDisabled(true);
//	txtigstval.setDisabled(true);
	//txttcsper.setDisabled(true);
//	txttcsval.setDisabled(true);


    seqno = 0;
    poseqno = 0;

	txtSupplierName.setRawValue('');
	txtbillno.setRawValue('');
	txtBillValue.setRawValue('');
	cmbArea.clearValue();
	txttotgrnval.setValue('');
	cmbQCEntNo.clearValue();
	txtvehicle.setRawValue('');
	txttotitemqty.setRawValue('');
	txttotitemval.setRawValue('');
	txtCrdays.setRawValue('30');



	loadsupplierdatastore.removeAll();
	loadsupplierdatastore.load({
        	 url:'ClsRMGrn.php',
        	 params:
       		 {
         	 task:"loadsupplier"
        	 }
		 });

	userdatastore.removeAll();
	userdatastore.load({
        	 url:'ClsRMGrn.php',
        	 params:
       		 {
         	 task:"userdet",
		 userid : GinUserid
        	 },
		 
		 });

	VouNoDatastore.load({
		url: '/SHVPM/Accounts/clsAccounts.php',
		params:
		{
		task: "LoadLastVouNo",
		finyear  : GinFinid,
		compcode : Gincompcode,
		voutype  : 'PLW'
		},
		callback: function(){


		txtVouNo.setValue("PLW"+VouNoDatastore.getAt(0).get('con_value'));

		}
		 });
            

 edit_click();

}

var tabgrn = new Ext.TabPanel({
    id          : 'GRN',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1300,
    x           : 2,
    y           : 70, 
    items       : [
        {
            xtype: 'panel',
            id   : 'tab1', 
            title: 'Item & Tax Details',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
                            flxLedger,
			{ xtype   : 'fieldset',
	                title   : 'Item Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 210,	
        	        width   : 1260,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 10,
        	        items:[
  
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 220,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbPONO]
                            },


			

                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 220,
                                	x           : 200,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtbillno]
                            },
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 260,
                                	x           : 375,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtpbilldate]
                            },


                            {  
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 562,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtBillValue]
                            },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 220,
                                	x           : 750,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtCrdays]
                            },

        
				 {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 120,
		                    width       : 500,
		                    x           : 930,
		                    y           : -10,
		                    border      : false,
		                    items: [cmbPurchaseLedger]
		                },


                            flxGRNDetail,
                            ]
                           },
	                { xtype   : 'fieldset',
	                title   : 'Tax Details',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 175,
        	        width   : 1260,
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
                                	items: [txtCGSTPer]
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
                                	items: [txtSGSTPer]
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
                                	items: [txtIGSTPer]
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

                         optfrtype, 	optRounding,		 
 				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 55,
                                	width       : 180,
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
                                	x           : 900,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtotherchrgs]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtlandingcost]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : 45,
                                    	border      : false,
                                	items: [txtroundoff]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 50,
                                	x           : 1150,
                                	y           : 45,
                                    	border      : false,
                                	items: [btnRounding]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : 70,
                                    	border      : false,
                                	items: [txttotgrnval]
                            },







]
}    
            ]
        },

        {
            xtype: 'panel',
            id   : 'tab2', 
            title: 'Ledger Posting',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 40,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtVouNo]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 400,
                                	y           : 10,
                                    	border      : false,
                                	items: [dtVouDate]
                            },

                    flxAccounts,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 100,
		        y: 310,
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
		        y: 310,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCredit]
		    }, 
            ]
        }            
],

});


   var TrnGrnformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 100,	
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
//SAVE
                    text: 'Save',
                    id	:  'save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                               save_click();
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
// TrnGrnformpanel.getForm().reset();
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

        items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 1260,
           height      : 100,
           x           : 10,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtGRNNo]
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
                        	y           : 40,
                            	border      : false,
                        	items: [dtpgrndate]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 500,
                        	x           : 200,
                        	y           : 0,
                            	border      : false,
                        	items: [txtSupplierName]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 400,
                        	x           : 200,
                        	y           : 40,
                            	border      : false,
                        	items: [cmbQCEntNo]
                    },

                     { 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 100,
	                        	width       : 400,
	                        	x           : 650,
	                        	y           : 0,
	                            	border      : false,
	                        	items: [cmbArea]
	                    },
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 320,
                        	x           : 650,
                        	y           : 40,
                            	border      : false,
                        	items: [txtvehicle]
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
                        	y           : 40,
                            	border      : false,
                        	items: [dtpgatedate]
                    },

           ]    
        }, 
         

           { 
                	xtype       : 'fieldset',
                	title       : '',
                	labelWidth  : 80,
                	width       : 1300,
                	x           : 0,
                	y           : 105,
                    	border      : false,
                	items: [tabgrn]
            },

       ]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      : 615,
        width       : 1300,
        y           : 25,
        title       : 'GRN',
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

RefreshData();
/*

//			Ext.getCmp('txtGRNNo').setDisabled(true);
			Ext.getCmp('txtGRNNo').hide();
			Ext.getCmp('cmbgrnno').show();
			Ext.getCmp('txtlifelessqty').hide();
                        flxLedger.hide();

    seqno = 0;
    poseqno = 0;

				
			//txtGRNNo.setFocus();
			//txtCGSTPer.setRawValue('2.5');
			//txtSGSTPer.setRawValue('2.5');
//			txtIGSTPer.setDisabled(true);
			//txtigstval.setDisabled(true);
//			txttcsper.setDisabled(true);
//			txttcsval.setDisabled(true);
			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsRMGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			userdatastore.removeAll();
			userdatastore.load({
                        	 url:'ClsRMGrn.php',
                        	 params:
                       		 {
                         	 task:"userdet",
				 userid : GinUserid
                        	 },
				 
				 });

*/
		  }     	
		}
    });
    TrnGrnWindow.show();  
});
