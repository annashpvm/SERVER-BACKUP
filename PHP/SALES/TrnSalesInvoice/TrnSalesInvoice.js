Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');

	//	localStorage.setItem("gfinstdate",finstdate);

    var gstfinyear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuserid');
   var usertype = localStorage.getItem('ginuser');


   usertype = 1
   var  gsttype = localStorage.getItem('GSTTYPE');
   var  invfin = localStorage.getItem('invfin');

   var  fromyear = localStorage.getItem('fromyear');
   var  toyear = localStorage.getItem('toyear');


   var  invoiceno  = 0; 
   var  invseqno  = 0; 

   var gstFlag = "Add";

   var fm = Ext.form;
   var fm1 = Ext.form;
   var invtype =0;
   var socno =0;
   var sofinyear = 0;
   var commision = 0;
   var bundles = 0;
   var reels = 0;

   var smsno = '';
   var partycode = 0;
   var taxcode =0;

   var ourbankcode =0;

   var transcode =0;

   var slipno = 0;      
   var odiper =0;   

   var packslipno = '';
   var packno_date = "";
 
   var sales_ledcode ,cgst_ledcode ,sgst_ledcode ,igst_ledcode = 0;
     
   var vouno = '';

   var desplocation = "V";

   var accseqno = 0;
   var einvconfirm = 'N';
   var errcode = 0;
   var partyname = '';
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




/*
function grid_move() {



     flxSizeRate.getStore().removeAll();


    let finalStore = flxSizeRate.getStore();

    // Re-select all rows to ensure correct selection (could be optimized out if not needed)
    flxDetailInv.getSelectionModel().selectAll();
    var sel = flxDetailInv.getSelectionModel().getSelections();

    for (var i = 0; i < sel.length; i++) {
        var recData = sel[i].data;

            var exists = false;

            // Check if the record already exists in the final store
            for (var j = 0; j < finalStore.getCount(); j++) {
                var existing = finalStore.getAt(j);



               if (existing.get('var_name').trim() === recData.var_name.trim()  && existing.get('sizecode') === recData.sizecode )

                {


                    if(Number(existing.get('rate')) === Number(recData.rate))
                    {
                       exists = true;
                       break;
                    } 
                    else
                    {
                         alert("A record with the same Size and Rate fields exists but with a different rate. Can't Add the Record. Check the rate in the Rate and Continue..");
                         exists = true;
                    }   
                }
            }

            if (!exists) {
                // Add record to final store
                finalStore.add(new dgrecord({
                    sizecode  : Number(recData.sizecode),
                    var_name : recData.var_name,
                    rate     : Number(recData.rate),

                }));
            }



        }
    }


*/

function grid_move() {
    // Clear the destination store first
    let finalStore = flxSizeRate.getStore();
    finalStore.removeAll();

    // Temporary map to track what's being added
    let tempMap = {};

    // Select all rows from source grid
    flxDetailInv.getSelectionModel().selectAll();
    let sel = flxDetailInv.getSelectionModel().getSelections();

    for (let i = 0; i < sel.length; i++) {
        let recData = sel[i].data;
        let key = recData.var_name.trim() + "_" + recData.sizecode;
        let rate = Number(recData.rate);

        // Check if same var_name + sizecode already added
        if (tempMap.hasOwnProperty(key)) {
            if (tempMap[key] === rate) {
                // Duplicate with same rate — skip silently
                continue;
            } else {
                // Duplicate with different rate — block
                alert("A record with the same Size with a different rate. Can't SAVE this record.");
                Ext.getCmp('save').setDisabled(true);
                continue;

            }
        }

        // No conflict — add to final store and track it
        finalStore.add(new dgrecord({
            sizecode: Number(recData.sizecode),
            var_name: recData.var_name,
            rate: rate
        }));

        tempMap[key] = rate;
    }
}





   var txtAckNo = new Ext.form.TextField({
        fieldLabel  : 'Ack No.',
        id          : 'txtAckNo',
        name        : 'txtAckNo',
        width       :  400,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });


   var txtIRNNo = new Ext.form.TextField({
        fieldLabel  : 'IRN No.',
        id          : 'txtIRNNo',
        name        : 'txtIRNNo',
        width       :  1000,

//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    });

   var txtQRCode = new Ext.form.TextArea({
        fieldLabel  : 'QR Code',
        id          : 'txtQRCode',
        name        : 'txtQRCode',
        width       :  1000,
        height      : 140,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });



var btnIRNUpdate = new Ext.Button({
    id      : 'btnIRNUpdate',
    style   : 'text-align:center;',
    text    : "ACK / IRN / QR CODE UPDATE",
    tooltip : 'IRN UPDATE',
    width   : 100,
    height  : 30,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesInvoiceIRN_ACK_Update.php',
		      params :
		      {
                         	invhcompcode  : Gincompcode,
	        		invhfincode   : GinFinid,
		                invhparty     : cmbCustomer.getRawValue(),
		         	invhrefno     : txtInvNo.getRawValue(),
			 	invhdate      : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
                   		invhIRN       : txtIRNNo.getRawValue(),  
                  		invhACK       : txtAckNo.getRawValue(),  
                                invhqrcode    : txtQRCode.getRawValue(),                        	

		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Invoice Payment Terms  -Updated "); 
                         TrnSalesInvoicePanel.getForm().reset();
                         RefreshData();

		      }
                      }); 
            }
       }
   }
});       



Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};


 var findDistanceDataStore = new Ext.data.Store({
      id: 'findDistanceDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyDistance"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_distance'
	 ]),
    })


var btnGSTRefresh = new Ext.Button({
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
    text    : "GST Refresh & Update",
    width   : 100,
    height  : 35,
    x       : 200,
    y       : 200,
  // labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//bodyStyle:{"background-color":"#ebebdf"},
//style : "font-size:14px;font-weight:bold",
 listeners:{
        click: function(){       
		      Ext.Ajax.request({
		      url: 'TrnSalesINVOICEGSTUpdate.php',
		      params :
		      {
                         	compcode  : Gincompcode,
	        		fincode   : GinFinid,
		                party     : cmbCustomer.getValue(),
		                invno     : cmbInvNo.getRawValue(),
		         	
		      },
		      callback: function(options, success, response)
		      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("GST Type is Changed -" + obj['msg']);
//                      TrnSalesInvoicePanel.getForm().reset();
//                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("GST Type Not Changed Please check.." + obj['msg']);                                                  
                  }
		      }
                      }); 
       }
     }
});

 var findTotalInvoiceAmountDataStore = new Ext.data.Store({
      id: 'findTotalInvoiceAmountDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceAmount"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'salesinvamt'
	 ]),
    })


 var EInvStatusDataStore = new Ext.data.Store({
      id: 'EInvStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
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


 var EWayStatusDataStore = new Ext.data.Store({
      id: 'EWayStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEWayStatus"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ErrorCode','ErrorDiscripion','InvStatus'
	 ]),
    })

 var loadSONoListDataStore = new Ext.data.Store({
      id: 'loadSONoListDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONOlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'pckt_sono','pckt_sodate'
	 ]),
    })





 var loadhsnDataStore = new Ext.data.Store({
      id: 'loadhsnDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsnlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'tariff_code', type: 'int',mapping:'tariff_code'},
	{name:'tariff_name', type: 'string',mapping:'tariff_name'}
      ]),
    });


   var loadInvnodatastore = new Ext.data.Store({
      id: 'loadInvnodatastore',
 //     autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invno'
      ]),
    });


   var loadInvoicelistDataStore = new Ext.data.Store({
      id: 'loadInvoicelistDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invh_invrefno','invh_seqno'
      ]),
    });

   var loadtruckDataStore = new Ext.data.Store({
      id: 'loadtruckDataStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadtruck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wpckh_vehicleno'
      ]),
    });



   var loadInvoicedetailsDataStore = new Ext.data.Store({
      id: 'loadInvoicedetailsDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_ref','cust_phone','invh_date','invh_party','invh_slipno','invh_agent','invh_docu','invh_our_bank','invh_crd_days','invh_grace_days',
'invh_odiper','invh_vehi_no','invh_trans','invh_lrno','invh_lrdate','invh_dest','invh_desp_location','invh_lcno','invh_lcdate','invh_party_bank',
'invh_delivery_add1','invh_delivery_add2','invh_delivery_add3','invh_delivery_city','invh_delivery_pin','invh_delivery_gst','invh_statecode','invh_taxtag',
'invh_instruction','invh_instruction','invh_dest','invh_party_ordno','invh_party_orddt','invh_our_ordno','invh_our_orddt','invh_sgst_per','invh_cgst_per',
'invh_igst_per','invh_insper','invh_comm','invh_frt_rate','invh_frt_amt','invh_party_bank','invh_noofbun','invh_noofreels','invh_type','type_name',
'invh_vouno','invh_acc_refno','invh_seqno','invh_ewaybillno','U_TCSStatus','invh_tcs_per','invh_grace_days', 'invh_tcs_amt','SMSsent','invh_frtqty','invh_delivery_statecode' ,'invh_acc_refno','invh_distance','U_EWBStatus','E_inv_confirm',
'invh_transportname' ,'invh_transportGST','U_ReUpload','U_AckNo','U_EWayBillNo','U_QR', 'U_irnno'
 
      ]),
    });



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'},
	{name:'cust_smsno', type: 'string',mapping:'cust_smsno'},
	{name:'repr_mobile', type: 'string',mapping:'repr_mobile'},
	{name:'cust_phone', type: 'string',mapping:'cust_phone'},
	{name:'cust_email', type: 'string',mapping:'cust_email'},
	{name:'cust_zip', type: 'string',mapping:'cust_zip'},
	{name:'cust_gstin', type: 'string',mapping:'cust_gstin'},
	{name:'cust_name', type: 'string',mapping:'cust_name'},
      ]),
    });

var PackslipnoDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pckh_no'
      ]),
    });


var PackslipNetWtDataStore = new Ext.data.Store({
      id: 'PackslipNetWtDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipNetWt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['pckh_totwt'
      ]),
    });

var PackslipdetailDataStore = new Ext.data.Store({
      id: 'PackslipdetailDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
//'type_name','type_code','weight','pckh_ordno','pckh_orddate','pckt_sono','pckt_sodate','nos','unit','rate','amount','pckh_date','varcode',
//'var_name','hsncode','sizecode','var_size1','var_size2' ,'rate','amount','cashdisc','cashflg','dealdisc','dealflg','reeldisc','reelflg',
//'regdisc','regflg','adddisc','addflg','qcdev','losspmt','ordt_crdays','ordt_comm','pckh_noofreels','pckh_noofbun','size'
'weight','pckh_ordno','pckh_orddate','pckt_sono','pckt_sodate','nos','unit','rate','amount','pckh_date','varcode','var_name','hsncode',
'sizecode','var_size1','var_size2' ,'rate','amount','qcdev','losspmt','ordt_crdays','pckh_noofreels','size','pckh_truck',

      ]),
    });



var PackslipdetailDataStoreNew = new Ext.data.Store({
      id: 'PackslipdetailDataStoreNew',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdetInv"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'hsncode','var_name','unit','size','nos','weight','rate','amount','varcode','sizecode','qcdev','losspmt'
      ]),
    });



/*
var PackslipdiscountDataStore = new Ext.data.Store({
      id: 'PackslipdiscountDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdiscount"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wt','pckt_sono','pckt_sodate','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
'var_tariffno','pckt_var','var_size1','var_size2'
      ]),
    });
*/

var PackslipAlldetailsDataStore = new Ext.data.Store({
      id: 'PackslipAlldetailsDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipalldetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_creditdays','ordh_tax','taxcode','tax_name','ordh_sgst','ordh_cgst','ordh_igst','ordh_ins_yn' ,'ordh_insper' ,   'ordh_gracedays','ordh_docu','ordh_dest','ordh_delivery_add1','ordh_delivery_add2','ordh_delivery_add3','ordh_delivery_city',
'ordh_delivery_pin','ordh_delivery_gst','ordh_cust_rem','ordh_our_rem','ordh_bank','transport','ordh_trans','ordh_odiper','ordh_frt',
'ordh_creditdays','ordh_gracedays'
      ]),
    });

/*
var PackslipinsuranceDataStore = new Ext.data.Store({
      id: 'PackslipinsuranceDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipinsurance"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wt','pckt_sono','pckt_sodate','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
'var_tariffno','pckt_var','var_size1','var_size2'
      ]),
    });
*/

 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
    });



 var loadStatesstore = new Ext.data.Store({
      id: 'loadStatesstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstates"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'state_code', type: 'int',mapping:'state_code'},
	{name:'state_name', type: 'string',mapping:'state_name'}
      ]),
    });



var btnRefreshService = new Ext.Button({
    id      : 'btnRefreshService',
    style   : 'text-align:center;',
    text    : "SERVICE REFRESH",
    tooltip : 'Service Refresh',
    width   : 150,
    height  : 40,
    x       : 100,
    y       : 400,       
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
		      url: 'TrnEInvServiceRefresh.php',
/*
		      url: 'TrnRoadDistance.php',


              callback: function(options, success, response)
              {

                var obj = Ext.decode(response.responseText);
                          
                    Ext.MessageBox.alert("Road Distance -" + obj['distance']);
              }

*/

                      }); 
            }
       }
});     


var btnCrdaysChange = new Ext.Button({
    id      : 'btnCrdaysChange',
    style   : 'text-align:center;',
    text    : "PAYMENT TERMS UPDATE",
    tooltip : 'CR DAYS UPDATE',
    width   : 150,
    height  : 30,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesInvoiceUpdate.php',
		      params :
		      {
                         	invhcompcode  : Gincompcode,
	        		invhfincode   : GinFinid,
		                invhparty     : cmbCustomer.getRawValue(),
		         	invhrefno     : txtInvNo.getRawValue(),
			 	invhdate      : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
                   		invhcrddays   : txtCreditDays.getRawValue(),  
                  		invhgracedays : txtGraceDays.getRawValue(),  
                                ewaybillno    : txtEwayBillNo.getRawValue(),
                        	invhvehino    :txtVehicle.getRawValue(),
  		                invhslipno    :cmbSlipNo.getRawValue(),
                 		invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                                accseqno : accseqno,


		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Invoice Payment Terms  -Updated "); 
                         TrnSalesInvoicePanel.getForm().reset();
                         RefreshData();

		      }
                      }); 
            }
       }
   }
});       


var btnTruckChange = new Ext.Button({
    id      : 'btnTruckChange',
    style   : 'text-align:center;',
    text    : "TRUCK UPDATE",
    tooltip : 'TRCUK UPDATE',
    width   : 150,
    height  : 30,
  
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
		      url: 'TrnSalesInvoiceTruckUpdate.php',
		      params :
		      {
                         	invhcompcode  : Gincompcode,
	        		invhfincode   : GinFinid,
		                invhparty     : cmbCustomer.getRawValue(),
		         	invhrefno     : txtInvNo.getRawValue(),
			 	invhdate      : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
                        	invhvehino    :txtVehicle.getRawValue(),
  		                invhslipno    :cmbSlipNo.getRawValue(),
                 		invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                                accseqno : accseqno,


		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Truck Details  -Updated "); 
                         TrnSalesInvoicePanel.getForm().reset();
                         RefreshData();

		      }
                      }); 

       }
   }
}); 


var btnEwayUpdate = new Ext.Button({
    id      : 'btnEwayUpdate',
    style   : 'text-align:center;',
    text    : "E-WAY BILL UPDATE",
    tooltip : 'E-WAY BILL UPDATE"',
    width   : 150,
    height  : 30,
  
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
		      url: 'TrnSalesInvoiceEwayNoUpdate.php',
		      params :
		      {
                         	invhcompcode  : Gincompcode,
	        		invhfincode   : GinFinid,
		                invhparty     : cmbCustomer.getRawValue(),
		         	invhrefno     : txtInvNo.getRawValue(),
			 	invhdate      : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
                        	invhvehino    : txtVehicle.getRawValue(),
  		                invhslipno    : cmbSlipNo.getRawValue(),
                 		invhslipdt    : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                                ewaybillno    : txtEwayBillNo.getRawValue(),
                                accseqno : accseqno,


		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Truck Details  -Updated "); 
                         TrnSalesInvoicePanel.getForm().reset();
                         RefreshData();

		      }
                      }); 

       }
   }
}); 


var btnDistanceUpdate = new Ext.Button({
    id      : 'btnDistanceUpdate',
    style   : 'text-align:center;',
    text    : " UPDATE",
    tooltip : 'Distance UPDATE',
    width   :  50,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesInvoiceDistanceUpdate.php',
		      params :
		      {
                         	invhcompcode  : Gincompcode,
	        		invhfincode   : GinFinid,
		                invhparty     : cmbCustomer.getRawValue(),
		         	invhrefno     : txtInvNo.getRawValue(),
			 	invhdate      : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
                   		invhdistance  : txtDistance.getRawValue(),  

		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Road Distance -Updated "); 
                         TrnSalesInvoicePanel.getForm().reset();
                         RefreshData();

		      }
                      }); 
            }
       }
   }
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
		      url: 'TrnSalesReUpload.php',
		      params :
		      {
                         	invhcompcode  :Gincompcode,
	        		invhfincode   :GinFinid,
		                invhparty  : cmbCustomer.getRawValue(),
		         	invhrefno  : txtInvNo.getRawValue(),
			 	invhdate   : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
				invhtotwt  : txttotqty.getRawValue(),
				invhnetamt : txtNetAmt.getRawValue(),
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



var btnSMS = new Ext.Button({
    id      : 'btnSMS',
    style   : 'text-align:center;',
    text    : "SEND SMS",
    tooltip : 'Sent SMS to Customer...',
    width   : 150,
    height  : 50,
    x       : 770,
    y       : 435,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesSMS.php',
		      params :
		      {
                         	invhcompcode  :Gincompcode,
	        		invhfincode   :GinFinid,
//		                invhparty  : cmbCustomer.getRawValue(),
		                invhparty  : partyname,
		         	invhrefno  : txtInvNo.getRawValue(),
			 	invhdate   : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
				invhtotwt  : txttotqty.getRawValue(),
				invhnetamt : txtNetAmt.getRawValue(),
		                smsnumber  : txtSMSNo.getRawValue(),
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("SMS  Send to Customer - "); 
                         Ext.getCmp('btnSMS').setDisabled(true);  
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
   }
});       



var btnEInvoice = new Ext.Button({
    id      : 'btnEInvoice',
    style   : 'text-align:center;',
    text    : "GENERATE E-INVOICE",
    width   : 150,
    height  : 50,
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
             if (txtNetAmt.getValue() == 0)
             {
                 alert("Invoice Amount is Empty.. ");
             }           
             else
             {
	      Ext.Ajax.request({
	      url: 'TrnSalesE-Inv.php',
	      params :
	      {
                     	invhcompcode  :Gincompcode,
			invhfincode   :GinFinid,
			invhrefno     :txtInvNo.getRawValue(),
                        invhseqno     :invseqno, 
	      },
	      callback: function(options, success, response)
	      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("Invoice Confirmed for E-Invoice  -" + obj['msg']);
                      TrnSalesInvoicePanel.getForm().reset();
                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("Invoice Confirmed for E-Invoice. Please check.." + obj['msg']);                                                  
                  }
	      }
              }); 
            }
       }
   }
});       


var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State',
        width           : 250,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'local',
        store           : loadStatesstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
 });


var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 250,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdnVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
 });


var cmbHsnCode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN Code',
        width           : 250,
        displayField    : 'tariff_name', 
        valueField      : 'tariff_code',
        hiddenName      : '',
        id              : 'cmbHsnCode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadhsnDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ",         
   });



var btnAccUpdate = new Ext.Button({
    style   : 'text-align:center;',
    text    : "I-MODIFY",
    width   : 40,
    height  : 40,
    x       : 700,
    y       : 400,
    id      : 'btnAccUpdate',
    bodyStyle:{"background-color":"#ebebdf"},  
     listeners:{
         click: function(){              

                   Ext.Ajax.request({
	                url: 'TrnSalesInvoiceMissingSave.php',
	                params: {
	      
		                savetype:gstFlag,
                             	invhcompcode  :Gincompcode,
				invhfincode   :GinFinid,
                                gsttype       :gsttype,    
				invhrefno     :txtInvNo.getRawValue(),
                                invhno        :invoiceno, 
                                invhseqno     :invseqno, 
				invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
				invhpartyordno:txtReference.getRawValue(),
				invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),
				invhourordno  :txtSO.getRawValue(),
				invhourorddt  :Ext.util.Format.date(dptSO.getValue(),"Y-m-d"),
				invhparty     :cmbCustomer.getValue(),
				invhcrddays   :txtCreditDays.getRawValue(), 
                 		invhgracedays : txtGraceDays.getRawValue(),  
				invhtaxtag    :taxcode,
				invhinsper    :txtInsPer.getRawValue(),
				invhinsamt    :txtInsAmt.getRawValue(),
				invhfrtrate   :Number(txtFrt.getRawValue()),
				invhfrtamt    :txtFrtAmt.getRawValue(),
				invhroff      :txtRound.getRawValue(),
				invhnetamt    :txtNetAmt.getRawValue(),
				invhnoofreels :reels, 
				invhtotwt     :txttotqty.getRawValue(),
				invhslipno    :cmbSlipNo.getRawValue(),
				invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
				invhvehino    :txtVehicle.getRawValue(),
				invhlrno      :txtLrNo.getRawValue(),
				invhlrdate    :Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"),
			        invhvouno     :vouno,
				invhvouyear   :Ext.util.Format.date(dptInvNo.getValue(),"Y"),
				invhtaxableamt:txttottaxable.getRawValue(),
				invhothers      :0,
				invhsgstper     :txtSgstPer.getRawValue(),
				invhsgstamt       :txtSgstAmt.getRawValue(),
				invhcgstper       :txtCgstPer.getRawValue(),
				invhcgstamt       :txtCgstAmt.getRawValue(),
				invhigstper       :txtIgstPer.getRawValue(),
				invhigstamt       :txtIgstAmt.getRawValue(),
				invhtcsper        : Number(txtTCSPer.getRawValue()),
				invhtcsamt        : Number(txtTCSAmt.getRawValue()),
				cancelflag	  :'0', 
                                invhdelivery_add1 :txtAddr1.getRawValue(),
                                invhdelivery_add2 :txtAddr2.getRawValue(),
                                invhdelivery_add3 :txtAddr3.getRawValue(),
                                invhdelivery_city :txtAddr4.getRawValue(),
                                invhdelivery_pin  :txtPin.getRawValue(), 
                                invhstatecode     :Number(cmbState.getValue()), 
                                invhinstruction  :txtCustIns.getRawValue(), 
                                invhdelivery_gst  :txtGstNo.getRawValue(),
                                invh_sal_ledcode  :sales_ledcode,
                                invh_cgst_ledcode :cgst_ledcode,                                
                                invh_sgst_ledcode :sgst_ledcode,                               
                                invh_igst_ledcode :igst_ledcode,                              
                                invh_description  :'Sales', 
                                invhewaybillno    : txtEwayBillNo.getRawValue(), 
                                sonolist          : packslipno,
                                accseqno          :accseqno,   

	                },
                              callback: function(options, success, response)
                              {
//alert("Test");
//alert(Reels);
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Invoice Saved  -" + obj['msg']);
//                                    RefreshData();
                                    TrnSalesInvoicePanel.getForm().reset();

                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Invoice Not Saved - Please check customer Master and Provide STATE / GST /DEALER and other essentials " + obj['msg']);                                                  
                                    }
                                }
                   });  
 

         } 
    }
});




   var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  100,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
    });


  function datecheck()
  {
        var dt_today = new Date();
        var dt_invoice = dptInvNo.getValue();
        var dt_Slip     = dptSlip.getValue();



//        var diffdays = (dt_today.getDate()-dt_invoice.getDate());
        var diffdays = dt_today.getTime()-dt_invoice.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Raise the invoice in the date of " +  Ext.util.Format.date(dt_invoice,"d-m-Y"));
             dptInvNo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the invoice in Future date");
             dptInvNo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

// for checking packing slip

        var diffdays2 = dt_Slip.getTime()-dt_invoice.getTime();
        diffdays2 = Math.ceil(diffdays2 / (1000 * 60 * 60 * 24));

        if (diffdays2 !=0 )
        {     
             alert("Invoice Date not matched with Packing Slip Date");
             Ext.getCmp('save').setDisabled(true);
        }
        else
        {
           Ext.getCmp('save').setDisabled(false);       
        }    

    if(Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
    }

 }


  function editdatecheck()
  {
        var dt_today = new Date();
        var dt_invoice = dptInvNo.getValue();
        var dt_Slip     = dptSlip.getValue();



//        var diffdays = (dt_today.getDate()-dt_invoice.getDate());
        var diffdays = dt_today.getTime()-dt_invoice.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Raise / Modify the invoice in the date of " +  Ext.util.Format.date(dt_invoice,"d-m-Y"));    
             Ext.getCmp('save').setDisabled(true);  
        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the invoice in Future date");
             dptInvNo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

// for checking packing slip

        var diffdays2 = dt_Slip.getTime()-dt_invoice.getTime();
        diffdays2 = Math.ceil(diffdays2 / (1000 * 60 * 60 * 24));

        if (diffdays2 !=0 )
        {     
             alert("Invoice Date not matched with Packing Slip Date");
             Ext.getCmp('save').setDisabled(true);
        }
        else
        {
   //        Ext.getCmp('save').setDisabled(false);       
        }    

    if(Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
    }

 }
   var txtReference = new Ext.form.TextField({
        fieldLabel  : 'Party Ord.No.',
        id          : 'txtReference',
        name        : 'txtReference',
        width       :  150,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

    var dptInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptInvNo',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,

        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }  	
        
    });

    var dptRef= new Ext.form.DateField({
        fieldLabel: 'Ref.Date',
        id: 'dptRef',
        name: 'Date',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
    });

    var dptSlip = new Ext.form.DateField({
        fieldLabel: 'Slip.Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
    });

   var txtSMSNo = new Ext.form.TextField({
        fieldLabel  : 'SMS No.(Rep & Party)',
        id          : 'txtSMSNo',
        name        : 'txtSMSNo',
        width       :  200,
// 	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;  textTransform: uppercase ", 
    });


   var txtSO = new Ext.form.TextField({
        fieldLabel  : 'SO.No.',
        id          : 'txtSO',
        name        : 'txtSO',
        width       :  150,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

    var dptSO = new Ext.form.DateField({
        fieldLabel: 'SO. Date',
        id: 'dptSO',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
    });


    var lblInsPer = new Ext.form.Label({
       fieldLabel  : 'INS %',
       id          : 'lblInsPer',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });


    var lblFrtQty = new Ext.form.Label({
       fieldLabel  : 'Frt.Qty',
       id          : 'lblFrtQty',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });


   var lblFrt = new Ext.form.Label({
       fieldLabel  : 'FRT/(t)',
       id          : 'lblFrt',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });

   var lblTCS = new Ext.form.Label({
       fieldLabel  : 'TCS',
       id          : 'lblTCS',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });

   var txtTotalSalesAmt = new Ext.form.NumberField({
        fieldLabel  : 'Sales Upto',
        id          : 'txtTotalSalesAmt',
        name        : 'txtTotalSalesAmt',
        width       :  120,
	readOnly : true,
   // 	labelStyle	: "font-size:12px;font-weight:bold;",
//    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        style : "font-size:14px;font-weight:bold;color:#ff0000",
        labelStyle      : "font-size:14px;font-weight:bold;color:#ff0066",

    });


   var txtInsAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsAmt',
        name        : 'txtInsAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });


   var txtFrtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtQty',
        name        : 'txtFrtQty',
        width       :  90,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    	enableKeyEvents: true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           },
           keyup:function(){
              calculateItemValue();
           },
        }
    });

   var txtDistance = new Ext.form.NumberField({
        fieldLabel  : 'Road distance(KM)',
        id          : 'txtDistance',
        name        : 'txtDistance',
        width       :  90,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    	enableKeyEvents: true,
        listeners   :{
        }
    });



   var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtOthers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthers',
        name        : 'txtOthers',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });


   var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });
   var txtSgstPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSgstPer',
        name        : 'txtSgstPer',
        width       :  50,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });
   var txtIgstPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIgstPer',
        name        : 'txtIgstPer',
        width       :  50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });

   var txtCgstAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtCgstAmt',
        name        : 'txtCgstAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtSgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstAmt',
        name        : 'txtSgstAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtIgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstAmt',
        name        : 'txtIgstAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });

   var txtTCSPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSPer',
        name        : 'txtTCSPer',
        width       :  50,
        value       : "0",
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
 	enableKeyEvents: true,
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           },
           keyup:function(){
              calculateItemValue();
           },
           change:function(){
              calculateItemValue();
           }
        }
    });

   var txtTCSAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSAmt',
        name        : 'txtTCSAmt',
        width       :  70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });

   var txtPackSlipQty = new Ext.form.NumberField({
        fieldLabel  : 'Packslip Wt',
        id          : 'txtPackSlipQty',
        name        : 'txtPackSlipQty',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txttotqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (Kgs)',
        id          : 'txttotqty',
        name        : 'txttotqty',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txttotvalue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotvalue',
        name        : 'txttotvalue',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txttottaxable = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable Value',
        id          : 'txttottaxable',
        name        : 'txttottaxable',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txtFrt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrt',
        name        : 'txtFrt',
        width       :  60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    	enableKeyEvents: true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           },
           keyup:function(){
              calculateItemValue();
           },
        }
    });


   var txtRound = new Ext.form.NumberField({
        fieldLabel  : 'Rounding',
        id          : 'txtRound',
        name        : 'txtRound',
        width       :  50,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txtNetAmt = new Ext.form.NumberField({
        fieldLabel  : 'Net Amount',
        id          : 'txtNetAmt',
        name        : 'txtNetAmt',
        width       :  200,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });




   var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Cust.Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  700,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'99'},


    });



   var txtVehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No.',
        id          : 'txtVehicle',
        name        : 'txtVehicle',
        width       :  250,
	readOnly : false,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });

   var txtLrNo = new Ext.form.TextField({
        fieldLabel  : 'LR No.',
        id          : 'txtLrNo',
        name        : 'txtLrNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'12'}, 

    });

   var txtEwayBillNo = new Ext.form.TextField({
        fieldLabel  : 'Eway BillNo.',
        id          : 'txtEwayBillNo',
        name        : 'txtEwayBillNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });



    var dptLrNo = new Ext.form.DateField({
        fieldLabel: 'LR.Date',
        id: 'dptLrNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
    });




   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",
   //     readOnly : true, 
    });


   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
   //     readOnly : true,
    });


   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });
   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address3.',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtAddr4 = new Ext.form.TextField({
        fieldLabel  : 'City.',
        id          : 'txtAddr4',
        name        : 'txtAddr4',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},

    });



   var txtTransport = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtTransport',
        name        : 'txtTransport',
        width       :  275,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'50'},

    });


   var txtTransportGST = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtTransportGST',
        name        : 'txtTransportGST',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},

    });



 var loadTaxStore = new Ext.data.Store({
      id: 'loadTaxStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTaxDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'tax_code', type: 'int',mapping:'tax_code'},
	{name:'tax_name', type: 'string',mapping:'tax_name'}
      ]),
    });

 var loadBankNameStore = new Ext.data.Store({
      id: 'loadBankNameStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBankDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'bank_code', type: 'int',mapping:'bank_code'},
	{name:'bank_name', type: 'string',mapping:'bank_name'}
      ]),
    });



 var loadTransportStore = new Ext.data.Store({
      id: 'loadTransportStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTransportDetails"}, // this parameter asks for listing
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



  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });
	





var cmbSlipNo = new Ext.form.ComboBox({
        fieldLabel      : 'Slip No. ',
        width           : 100,
        displayField    : 'pckh_no', 
        valueField      : 'pckh_no',
        hiddenName      : '',
        id              : 'cmbSlipNO',
        typeAhead       : true,
        mode            : 'local',
        store           : PackslipnoDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
        select: function(){
	


getpackslipdetails();

/*

			PackslipdetailDataStore.removeAll();
			PackslipdetailDataStore.load({

                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadslipdet",
                                custcode:cmbCustomer.getValue(),
				slipno : cmbSlipNo.getValue(),
				fincode : GinFinid,
				compcode : Gincompcode,   
                                a4 : a4yn                
                            },
                            scope: this,
                            callback:function() 
				{

                                socno = PackslipdetailDataStore.getAt(0).get('pckt_sono');
                                txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
                                txtSO.setRawValue(PackslipdetailDataStore.getAt(0).get('pckt_sono'));
                                dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
                                dptSO.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
            
                                txtCreditDays.setValue(PackslipdetailDataStore.getAt(0).get('ordt_crdays'));
                                commision =  PackslipdetailDataStore.getAt(0).get('ordt_comm');
                                invtype =  PackslipdetailDataStore.getAt(0).get('type_code');
                                bundles =  PackslipdetailDataStore.getAt(0).get('pckh_noofbun');
                                reels =  PackslipdetailDataStore.getAt(0).get('pckh_noofreels');
//alert(reels);

				PackslipAlldetailsDataStore.removeAll();
				PackslipAlldetailsDataStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params:
		                    {

		                        task:"loadslipalldetails",
		                        ordno:txtSO.getRawValue(),
		                        ordno:socno,
				   	fincode : GinFinid,
					compcode : Gincompcode        
		                    },
		                    scope: this,
		                    callback:function() 

				    {
		                        txtCgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cgst'));
		                        txtSgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_sgst'));
		                        txtIgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_igst'));
		                        
		                        txtFrt.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_frt'));
	

	 
		                        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');

		                        ourbankcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_bank');
		                        transcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_trans');

		                        odiper = PackslipAlldetailsDataStore.getAt(0).get('ordh_odiper');
					cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		                        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

  
    
		        
		   
		
		                        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_our_rem')); 

		                        txtAddr1.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add1')); 
		                        txtAddr2.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add2')); 
		                        txtAddr3.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add3')); 
		                        txtAddr4.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_city')); 
		                        txtPin.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_pin')); 
		                        txtGstNo.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_gst')); 

		                        cmbTransport.setValue(PackslipAlldetailsDataStore.getAt(0).get('transport'));

			                calculateItemValue(); 

					getTaxDataStore.removeAll();      
					getTaxDataStore.load({
					    url: 'ClsTrnSalesInvoice.php', // File to connect to
                                             params:
						    {
						        task: "findTaxCode",
						        taxcode:PackslipAlldetailsDataStore.getAt(0).get('ordh_tax')
						    },
					    callback: function () {
						var cnt = getTaxDataStore.getCount(); 
						if (cnt > 0) {
						           txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
						           txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
						           txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
						           taxcode = getTaxDataStore.getAt(0).get('tax_code');

						           sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
						           cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
						           sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
						           igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

						           calculateItemValue();

				                }
     
						 else {
                                                     alert('not found');

					        } 
					   }

					});
		                    }
		                }); 
		             }
                      }); 
*/

         },
   blur:function(){
           calculateItemValue();

        }
	}
});



function loadpackingslip()
{

}


var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
        select: function(){

			findDistanceDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadPartyDistance",
                                custcode:cmbCustomer.getValue()                     
                            },
                         callback:function() 
                      	 {
                  	      txtDistance.setValue(findDistanceDataStore.getAt(0).get('cust_distance'));
                         }

                        });

			PackslipnoDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadslipno",
    		           	fincode : GinFinid,
				compcode : Gincompcode,                                
                                custcode:cmbCustomer.getValue()                     
                            },
                         callback:function() 
                      	 {
                  	      cmbSlipNo.setValue(PackslipnoDataStore.getAt(0).get('pckh_no'));
		  	      getpackslipdetails();
    
                         }

                        });

			findTotalInvoiceAmountDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadInvoiceAmount",
    		           	finid     : GinFinid,
				compcode  : Gincompcode,                                
                                custcode  : cmbCustomer.getValue(),
                                startdate : Ext.util.Format.date(finstartdate ,"Y-m-d"),

                            },
                         callback:function() 
                      	 {

         

            			var cnt = findTotalInvoiceAmountDataStore.getCount(); 
				if (cnt > 0) {
//                                   alert(findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt'));

                                  txtTotalSalesAmt.setValue(findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt'));

                                   if (findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt') >= 5000000)
                                   {  
//                                      txtTCSPer.setRawValue(0.1);
//                                      txtTCSPer.setValue(0.1);
                                      txtTCSPer.setRawValue(0);
                                      txtTCSPer.setValue(0);
                                      calculateItemValue();
                                   }

                                   else
                                   {  
                                      txtTCSPer.setRawValue(0);
                                      txtTCSPer.setValue(0);
                                      calculateItemValue();

                                   }


                                }

                         }

                        });  
   
         }
	}
 
});




function getpackslipdetails()
{

                packslipno = '';
                packno_date= '';
		loadSONoListDataStore.removeAll();
		loadSONoListDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params:
		    {

		        task:"loadSONOlist",
		        
		        slipno :cmbSlipNo.getValue(),
		   	fincode : GinFinid,
			compcode : Gincompcode        
		    },
		    scope: this,
		    callback:function() 
		    {
                           var cnt=loadSONoListDataStore.getCount();

//alert(Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/y"));

	                   if(cnt>0)
			   {                         
		            for(var j=0; j<cnt; j++)
                            {

                               if (j ==0)    
                                 packslipno =  loadSONoListDataStore.getAt(j).get('pckt_sono') + " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(j).get('pckt_sodate'),"d/m/Y");
                               else
                                 packslipno =  packslipno + " , " + loadSONoListDataStore.getAt(j).get('pckt_sono') + " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(j).get('pckt_sodate'),"d/m/y");


//alert(packslipno);
/*
                               if (j ==0)    
                               {
                                 packslipno =   loadSONoListDataStore.getAt(j).get('pckt_sono')
                                 packno_date =   loadSONoListDataStore.getAt(j).get('pckt_sono') + " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/Y");


                               }
                               else
                               {

                                 packslipno =  packslipno + "," + loadSONoListDataStore.getAt(j).get('pckt_sono')
                                 packno_date =  packno_date + "," + loadSONoListDataStore.getAt(j).get('pckt_sono')+ " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/y");


                               }
*/  
                             }
                  

                             txtSO.setRawValue(packslipno);
                             txtSO.setValue(packslipno);

//     alert(txtSO.getRawValue());      
                           }     

                    }
                });


//alert(packslipno);


	PackslipdetailDataStoreNew.removeAll();
	PackslipdetailDataStoreNew.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdetInv",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{
                }
      
        });


   

	PackslipNetWtDataStore.removeAll();
	PackslipNetWtDataStore.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipNetWt",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{


                var packwt = PackslipNetWtDataStore.getAt(0).get('pckh_totwt');   
		txtPackSlipQty.setRawValue(Ext.util.Format.number(packwt,'0.0'));

                }
   
      
        });




	PackslipdetailDataStore.removeAll();
	PackslipdetailDataStore.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdet",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{

		socno = PackslipdetailDataStore.getAt(0).get('pckt_sono');
		txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
//		txtSO.setRawValue(PackslipdetailDataStore.getAt(0).get('pckt_sono'));
//		txtSO.setRawValue(packno_date);

		dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
		dptSO.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"d-m-Y"));
		dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
		txtCreditDays.setValue(PackslipdetailDataStore.getAt(0).get('ordh_creditdays'));
		txtGraceDays.setValue(PackslipdetailDataStore.getAt(0).get('ordh_gracedays'));
		txtVehicle.setValue(PackslipdetailDataStore.getAt(0).get('pckh_truck'));


                 
             

		var m = Ext.util.Format.date(dptSO.getValue(),"m");
		sofinyear = Ext.util.Format.date(dptSO.getValue(),"y");

                  

//alert(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"Y-m-d") );
//alert(Ext.util.Format.date(finstartdate,"Y-m-d"));

               if(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
                 sofinyear = sofinyear - 1;

               }  
 //Add below line on 02/01/2023

                sofinyear = socno.substring(0,2);




		reels =  PackslipdetailDataStore.getAt(0).get('pckh_noofreels');

		PackslipAlldetailsDataStore.removeAll();
		PackslipAlldetailsDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params:
		    {

		        task:"loadslipalldetails",
//		        ordno    : txtSO.getRawValue(),
		        ordno    : socno,
		   	fincode  : sofinyear,
			compcode : Gincompcode        
		    },
		    scope: this,
		    callback:function() 

		    {
		        txtCgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cgst'));
		        txtSgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_sgst'));
		        txtIgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_igst'));
		        
                        if (PackslipAlldetailsDataStore.getAt(0).get('ordh_frt') > 0 )
                        {
		        txtFrt.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_frt'));
                        } 
	 

		        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');
//alert(PackslipAlldetailsDataStore.getAt(0).get('ordh_creditdays'));

			cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

                        txtCreditDays.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_creditdays'));
                        txtGraceDays.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_gracedays'));

		       // txtPartyBank.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_bank')); 


		
		
		        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cust_rem')); 

		        txtAddr1.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add1')); 
		        txtAddr2.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add2')); 
		        txtAddr3.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add3')); 
		        txtAddr4.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_city')); 
		        txtPin.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_pin')); 
		        txtGstNo.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_gst')); 

//		        cmbTransport.setValue(PackslipAlldetailsDataStore.getAt(0).get('transport'));

		        calculateItemValue(); 

			getTaxDataStore.removeAll();      
			getTaxDataStore.load({
			    url: 'ClsTrnSalesInvoice.php', // File to connect to
		             params:
				    {
					task: "findTaxCode",
					taxcode:PackslipAlldetailsDataStore.getAt(0).get('ordh_tax')
				    },
			    callback: function () {
				var cnt = getTaxDataStore.getCount(); 
				if (cnt > 0) {
					   txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
					   txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
					   txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
					   taxcode = getTaxDataStore.getAt(0).get('tax_code');

//					   sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
					   cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
					   sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
					   igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

					   calculateItemValue();
grid_move();

			        }

				 else {
		                     alert('not found - Select GST TYPE again');

				} 
			   }

			});

			LoadSalesLedgerCodeDataStore.removeAll();      
			LoadSalesLedgerCodeDataStore.load({
			    url: 'ClsTrnSalesInvoice.php', // File to connect to
		             params:
				    {
					task: "loadSalesLedgerCode",
					slipno : cmbSlipNo.getValue(),
                        		fincode : GinFinid,
                             		compcode : Gincompcode,  
				    },
			    callback: function () {
				var cnt = LoadSalesLedgerCodeDataStore.getCount(); 
				if (cnt > 0) {
                                   if (gsttype == 'TN')  
                                      sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('tn_sales_ledcode');
                                   else if (gsttype == 'OS')  
                                      sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('os_sales_ledcode');
                                    else
                                      sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('sez_sales_ledcode');
 
			        }

				 else {
		                     alert('Sales Ledger not properly set in the Product Type Master. please check');

				} 
			   }

			});



		    }
		}); 
	     }
	}); 

/*
	loadtruckDataStore.removeAll();
	loadtruckDataStore.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadtruck",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,
	    },
	    callback:function() 
		{
			if(loadtruckDataStore.getCount() > 0){
                    txtVehicle.setValue(loadtruckDataStore.getAt(0).get('wpckh_vehicleno')); 
                    }
            }
        });     
*/
}



var LoadSalesLedgerCodeDataStore = new Ext.data.Store({
        id: 'LoadSalesLedgerCodeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesInvoice.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSalesLedgerCode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tn_sales_ledcode','os_sales_ledcode','sez_sales_ledcode'])
    });






var getTaxDataStore = new Ext.data.Store({
        id: 'getTaxDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesInvoice.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findTaxCode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_code','tax_cgst','tax_sgst','tax_igst','tax_sal_led_code','tax_cgst_ledcode','tax_sgst_ledcode','tax_igst_ledcode'])
    });


var cmbTax = new Ext.form.ComboBox({
        fieldLabel      : 'GST Type ',
        width           : 300,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbTax',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTaxStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners: {
            select: function ()             
            {

                getTaxDataStore.removeAll();
        
                getTaxDataStore.load({
                    url: 'ClsTrnSalesInvoice.php', // File to connect to
                    params:
                            {
                                task: "findTaxCode",
                                taxcode:cmbTax.getValue()
                            },
                    callback: function () {
                        var cnt = getTaxDataStore.getCount(); 
                        if (cnt > 0) {
                                   txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
                                   txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
                                   txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
                                   taxcode = getTaxDataStore.getAt(0).get('tax_code');

//                                   sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
                                   cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
                                   sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
                                   igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

                                   calculateItemValue();
//alert(getTaxDataStore.getAt(0).get('sales_ledcode'));
//alert(sales_ledcode);
//alert(cgst_ledcode);
//alert(sgst_ledcode);
//alert(igst_ledcode);
                                    }
                         else {alert('not found - Select GST TYPE again');

                       } 
                   }

                });
               

           } 
        }    


});


function getgstdetails()
{

}







var tcsper = 0;
var tcsamt = 0;

var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Inv No.',
        width           : 120,
        displayField    : 'invh_invrefno', 
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvoicelistDataStore ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true  ,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
                select: function () {
//                        griddet.getStore().removeAll();
          
                if (cmbInvNo.getRawValue().substr(0,6)  == 'TN/001')
                {
                    Ext.getCmp('txtRound').setReadOnly(false);
                    Ext.getCmp('txtNetAmt').setReadOnly(false);    
                }     
                else
                {
                    Ext.getCmp('txtRound').setReadOnly(true);
                    Ext.getCmp('txtNetAmt').setReadOnly(true);    
                }     
    
                        einvconfirm = 'N';
                        Ext.getCmp('btnSMS').setDisabled(true);  
                        if (Gincompcode != 90)
                        {        
                        Ext.getCmp('btnSMS').setDisabled(false);  
                        Ext.getCmp('EInv').show();
                        Ext.getCmp('btnEInvoice').show();
                        } 
            
			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                	invno:cmbInvNo.getValue(),
                                        
		                },
				scope: this,
                                callback:function()
                                {

//alert(loadAllCustomerStore.getAt(0).get('cust_phone'));
//alert(loadAllCustomerStore.getAt(0).get('cust_gstin'));

//alert(loadAllCustomerStore.getAt(0).get('cust_gstin').length);
                           Ext.getCmp('btnTruckChange').hide();

                           errcode = 0;
                           partyname ='';
                           if (loadAllCustomerStore.getAt(0).get('cust_phone') == '' || loadAllCustomerStore.getAt(0).get('cust_zip') == '' ||  loadAllCustomerStore.getAt(0).get('cust_zip').length != 6  ||  loadAllCustomerStore.getAt(0).get('cust_gstin').length != 15 || loadAllCustomerStore.getAt(0).get('cust_gstin') == ''  )
                           { 
                       	         Ext.getCmp('btnEInvoice').hide();
                                 alert("Customer GST Number/ Phone /  Pincode is empty or Error.. Please check in Customer Master and continue");
                                 errcode = 1;
                           }
                             


                                cmbCustomer.setValue(loadAllCustomerStore.getAt(0).get('cust_code')); 
                                smsno  = loadAllCustomerStore.getAt(0).get('repr_mobile'); 
                                if (loadAllCustomerStore.getAt(0).get('cust_smsno') != '')
                                   smsno = smsno + ","+ loadAllCustomerStore.getAt(0).get('cust_smsno');
                         
                                txtSMSNo.setValue(smsno);   

                                partyname = loadAllCustomerStore.getAt(0).get('cust_name'); 


//                                txtSMSNo.setValue(loadAllCustomerStore.getAt(0).get('repr_mobile')); 
//                                txtSMSNo.setValue(loadAllCustomerStore.getAt(0).get('cust_smsno')); 
                                }

			  });






                    	loadInvoicedetailsDataStore.load({
			url: 'ClsTrnSalesInvoice.php',
			params: {
			        task: 'loadInvoiceNoDetails',
				invno:cmbInvNo.getValue(),
				compcode :Gincompcode,
                                finid:GinFinid
			},
                      	callback:function()
                  	{


                                Ext.getCmp('btnDistanceUpdate').show();


                                txtInvNo.setValue(cmbInvNo.getValue());
                                txtInvNo.setRawValue(cmbInvNo.getRawValue());

                                partycode = loadInvoicedetailsDataStore.getAt(0).get('invh_party');
                           



                                dptInvNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));


                                accseqno =  loadInvoicedetailsDataStore.getAt(0).get('invh_acc_refno');

                                invseqno =  loadInvoicedetailsDataStore.getAt(0).get('invh_seqno');

                                txtDistance.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_distance'));

                                txtReference.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_ordno'));
                                txtSO.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_our_ordno'));
                                dptRef.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_party_orddt'),"d-m-Y"));
                                dptSO.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_our_orddt'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));
 


                                txtLrNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_lrno'));
                                dptLrNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_lrdate'),"d-m-Y"));



                                bundles =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofbun');
                                reels =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofreels');


               
                                
                                cmbSlipNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));        
                                cmbSlipNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));    

                                txtCgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_cgst_per'));
                                txtSgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_sgst_per'));
                                txtIgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_igst_per'));

                                txtTCSPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_per'));
                                txtTCSAmt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_amt'));

                                tcsper =  loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_per');
                                tcsamt  = loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_amt');

                 
           
                                taxcode = loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag');

                                cmbTax.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag'));

                                txtVehicle.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_vehi_no'));

                                txtInsPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_insper'));
                                txtFrt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_rate'));
                                txtFrtAmt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_amt'));

                                txtCreditDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_crd_days')); 
                                txtGraceDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_grace_days'));     
               
   
                                txtCustIns.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_instruction')); 
 
                                txtAddr1.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add1')); 
                                txtAddr2.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add2')); 
                                txtAddr3.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add3')); 
                                txtAddr4.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_city')); 
                                txtPin.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_pin')); 
                                txtGstNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_gst')); 


                                txtTransport.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_transportname')); 
                                txtTransportGST.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_transportGST')); 


                                cmbState.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_statecode')); 
                                txtEwayBillNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_ewaybillno')); 

                                txtFrtQty.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frtqty'));

                                txtAckNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('U_AckNo'));
                                txtIRNNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('U_irnno'));
                                txtQRCode.setValue(loadInvoicedetailsDataStore.getAt(0).get('U_QR'));



                                vouno  =  loadInvoicedetailsDataStore.getAt(0).get('invh_vouno');
 
//alert(loadInvoicedetailsDataStore.getAt(0).get('invh_vouno'));


                                slipno = loadInvoicedetailsDataStore.getAt(0).get('invh_slipno');        
               

                                var cnt=loadInvoicedetailsDataStore.getCount();

                                Ext.getCmp('btnCrdaysChange').show();

                                if (loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') != "Y")
                                Ext.getCmp('btnTruckChange').show();

                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') != "S"  )
                                Ext.getCmp('btnTruckChange').show();


                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_AckNo') == ""  )
                                {
                                    alert("E-Invoice may be uploaded in the E-Invoice Portal. Please check in the E-Invoice Portal. After confirmed in the E-Invoice portal you may raise the E-Way bill for this Invoice");

                                Ext.getCmp('btnTruckChange').hide();
                                }

//alert(loadInvoicedetailsDataStore.getAt(0).get('U_EWayBillNo'));
                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_AckNo') == "" &&  loadInvoicedetailsDataStore.getAt(0).get('U_EWayBillNo') == ""  )
                                {

                                Ext.getCmp('btnEwayUpdate').show();
                                }
//                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') == "E" &&  loadInvoicedetailsDataStore.getAt(0).get('U_EWayBillNo') == ""  )
                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_EWayBillNo').trim() == ""  )
                                {

                                Ext.getCmp('btnEwayUpdate').show();
                                }


                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "E")
                                {
                                    Ext.getCmp('btnReupload').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnReupload').hide();
                                }

//                               if ( loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') == "E" ||  loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') == ""   )
                               if (loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" && ( loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') == "E" ||  loadInvoicedetailsDataStore.getAt(0).get('U_EWBStatus') == ""  ) )

                                {
                                    Ext.getCmp('btnReupload').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnReupload').hide();
                                }

                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_AckNo') == ""  )
                                {
                                     Ext.getCmp('txtAckNo').setDisabled(false);  
                                     Ext.getCmp('btnIRNUpdate').setDisabled(false);  
                                } 
                                else
                                {
                                     Ext.getCmp('txtAckNo').setDisabled(true);    
                                     Ext.getCmp('btnIRNUpdate').setDisabled(true);
                                }  
 
                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_irnno') == ""  )
                                {
                                     Ext.getCmp('txtIRNNo').setDisabled(false);  
                                     Ext.getCmp('btnIRNUpdate').setDisabled(false);  
                                } 
                                else
                                {
                                     Ext.getCmp('txtIRNNo').setDisabled(true);    
                                     Ext.getCmp('btnIRNUpdate').setDisabled(true);
                                }  
 
                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "S" &&  loadInvoicedetailsDataStore.getAt(0).get('E_inv_confirm') == "Y" &&  loadInvoicedetailsDataStore.getAt(0).get('U_QR') == ""  )
                                {
                                     Ext.getCmp('txtQRCode').setDisabled(false);  
                                     Ext.getCmp('btnIRNUpdate').setDisabled(false);  
                                } 
                                else
                                {
                                     Ext.getCmp('txtQRCode').setDisabled(true);    
                                     Ext.getCmp('btnIRNUpdate').setDisabled(true);
                                
                                 }

                                 if (loadInvoicedetailsDataStore.getAt(0).get('SMSsent') == "N")
                                {
                                    Ext.getCmp('btnSMS').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnSMS').hide();
                                }

					getTaxDataStore.removeAll();      
					getTaxDataStore.load({
					    url: 'ClsTrnSalesInvoice.php', // File to connect to
                                             params:
						    {
						        task: "findTaxCode",
						        taxcode:loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag')
						    },
					    callback: function () {
						var cnt = getTaxDataStore.getCount(); 
						if (cnt > 0) {
						           txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
						           txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
						           txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));

//						           sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
						           cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
						           sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
						           igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');


				                }
     
						 else {
                                                     alert('not found. please select GST TYPE again');

					        } 
					   }

					});


				LoadSalesLedgerCodeDataStore.removeAll();      
				LoadSalesLedgerCodeDataStore.load({
				    url: 'ClsTrnSalesInvoice.php', // File to connect to
				     params:
					    {
						task: "loadSalesLedgerCode",
						slipno : loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'),
		                		fincode : GinFinid,
		                     		compcode : Gincompcode,  
					    },
				    callback: function () {
					var cnt = LoadSalesLedgerCodeDataStore.getCount(); 
					if (cnt > 0) {
		                           if (gsttype == 'TN')  
		                              sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('tn_sales_ledcode');
		                           else if (gsttype == 'OS')  
		                              sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('os_sales_ledcode');
		                           else
		                              sales_ledcode = LoadSalesLedgerCodeDataStore.getAt(0).get('sez_sales_ledcode');	 
					}

					 else {
				             alert('Sales Ledger not properly set in the Product Type Master. please check');

					} 
				   }

				});


                                        if  (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == 'S' )
                                             { 
                                             Ext.getCmp('save').setDisabled(true);
                                             Ext.getCmp('btnEInvoice').hide();
                                             einvconfirm = 'Y';
                                             }  
                                        else
                                        { 
		                                var dt_today = new Date();
		                                var dt_invoice = dptInvNo.getValue();

		                                var diffdays = (dt_today.getDate()-dt_invoice.getDate());

		                                if (diffdays >10)
		                                   {
                                                      Ext.getCmp('save').setDisabled(true);
                                                      Ext.getCmp('btnEInvoice').hide();
                                                   }
		                                else if (diffdays >1)
		                                   {
                                                      Ext.getCmp('save').setDisabled(true);
                                                   }
		                                else
                                                   { 
                                                        Ext.getCmp('save').setDisabled(false);
                                                        Ext.getCmp('btnEInvoice').show();
                                                   }  
                                        }  
  
 
 //       Ext.getCmp('btnSMS').show();
//        Ext.getCmp('btnReupload').show();
//        Ext.getCmp('btnEInvoice').show();


/*



          	          PackslipdetailDataStore.removeAll();
              		  PackslipdetailDataStore.load({

                          url: 'ClsTrnSalesInvoice.php',
                          params:
                            {
                                task:"loadslipdet",
                                custcode:partycode,
				slipno : cmbSlipNo.getValue(),
				fincode : GinFinid,
				compcode : Gincompcode,   
     
                            },
                            scope: this,
                            callback:function() 
			    {

//alert(PackslipdetailDataStore.getCount());
                               calculateItemValue(); 
                            }

                            }); 

*/


	EInvStatusDataStore.removeAll();
    	EInvStatusDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params: {
			task: 'loadEInvStatus',
			invno:cmbInvNo.getRawValue(),
			compcode :Gincompcode,
		        finid:GinFinid
		},
	      	callback:function()
	  	{
/*
                   var cnt=EInvStatusDataStore.getCount();
                   if (cnt >0) 
                   { 
alert("Found");   
                       for(var j=0; j<cnt; j++)
 		       {
alert( EInvStatusDataStore.getAt(j).get('ErrorCode'));
                               EInvStatusDataStore.getStore().insert(
	                            EInvStatusDataStore.getStore().getCount(),
                                    new dgrecord({
                                        ErrorCode       : EInvStatusDataStore.getAt(j).get('ErrorCode'),
					ErrorDiscripion : EInvStatusDataStore.getAt(j).get('ErrorDiscripion'),
                                    })
                                );
                       }   
		}
*/
              } 
        });    



	EWayStatusDataStore.removeAll();
    	EWayStatusDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params: {
			task: 'loadEWayStatus',
			invno:cmbInvNo.getRawValue(),
			compcode :Gincompcode,
		        finid:GinFinid
		},
	      	callback:function()
	  	{

              } 
        });



	PackslipdetailDataStoreNew.removeAll();
	PackslipdetailDataStoreNew.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdetInv",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{
calculateItemValue(); 
                }
      
        });

			findTotalInvoiceAmountDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadInvoiceAmount",
    		           	finid     : GinFinid,
				compcode  : Gincompcode,                                
                                custcode  : cmbCustomer.getValue(),
                                startdate : Ext.util.Format.date(finstartdate ,"Y-m-d"),

                            },
                         callback:function() 
                      	 {

                                

            			var cnt = findTotalInvoiceAmountDataStore.getCount(); 
				if (cnt > 0) {
//                                   alert(findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt'));

                                  txtTotalSalesAmt.setValue(findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt'));

                                   if (findTotalInvoiceAmountDataStore.getAt(0).get('salesinvamt') >= 5000000)
                                   {  
                                      txtTCSPer.setRawValue(0.1);
                                      txtTCSPer.setValue(0.1);
                                      calculateItemValue();
                                   }
                                   else if (cmbCustomer.getValue() == 640 && GinFinid == 22)
                                   {
                                      txtTCSPer.setRawValue(0.1);
                                      txtTCSPer.setValue(0.1);
                                      calculateItemValue();
                                   }
                                   else
                                   {  
                                      txtTCSPer.setRawValue(0);
                                      txtTCSPer.setValue(0);
                                      calculateItemValue();
                                   }


                                }

                         }

                        });  



                                                     if (errcode == 1)
                                                     {
                                                        Ext.getCmp('save').setDisabled(true);
                                                        Ext.getCmp('btnEInvoice').hide();
                                                     }




                           calculateItemValue(); 




                        }

                        });



                }

	}

});



var cmbTransport = new Ext.form.ComboBox({
        fieldLabel      : 'Transport ',
        width           : 350,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbTransport',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTransportStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
        select: function(){
		  transcode = cmbTransport.getValue();                     
                          }
       }   

});

var colname;

function calculateItemValue(){
   grid_tot();
   var taxable = 0;
   var value1 = 0;
   var tdisc = 0;
   var ins = 0;
   var cgst = 0;
   var sgst = 0;
   var igst = 0;
   var frt  = 0;
   var oth = 0;
   var taxabletotal = 0;
   var invround  =0;
   var netamt =0;
   var tcs = 0;

  txtInsAmt.setRawValue(0);
  txtCgstAmt.setRawValue(0);
  txtSgstAmt.setRawValue(0);
  txtIgstAmt.setRawValue(0);
  txtFrtAmt.setRawValue(0);
  txtOthers.setRawValue(0);
  txtTCSAmt.setRawValue(0);
   var Row= flxDetailInv.getStore().getCount();



        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {


           tdisc = 0;




          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight /1000;

//alert(value1);


          value1 = Math.round(value1  * 10000) / 10000;
          value1 = Math.round((value1 +0.0001+ Number.EPSILON) * 100) / 100;
          value1 = value1.toFixed(2);  

//          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight /1000;          

          value1 =  Ext.util.Format.number(value1,'0.00');


//'FOR STORE DATA IN GRID
          sel[i].set('value', value1);
//



//          sel[i].data.value = sel[i].data.rate;
         //sel[i].data.value = (sel[i].data.rate - tdisc)/ sel[i].data.weight /1000;
        }
//alert(tdisc);


//       sel[i].data.value.setValue((sel[i].data.rate - tdisc)/ sel[i].data.weight /1000);
 //       sel[i].data.value.setValue(sel[i].data.rate);


          grid_tot();

      
          if (txtFrt.getRawValue() > 0 && value1 > 0 )  {
             frt = Math.round(Number(txtFrtQty.getRawValue()/1000) * Number(txtFrt.getRawValue()));
          }
//temp 
      //    frt = txtFrt.getRawValue();
               
          if (txtInsPer.getRawValue() > 0 && txttotvalue.getRawValue() > 0 )  {
             ins = (txttotvalue.getRawValue() * txtInsPer.getRawValue()/100);   
          }


          txtInsAmt.setRawValue(Ext.util.Format.number(ins,'0.00'));
          txtFrtAmt.setRawValue(Ext.util.Format.number(frt,'0.00'));


          grid_tot();


          taxabletotal = (Number(txttotvalue.getRawValue()) + Number(txtInsAmt.getRawValue()) + Number(txtFrtAmt.getRawValue()));


          taxabletotal = Math.round(taxabletotal * 100) / 100;

          txttottaxable.setRawValue(Ext.util.Format.number(taxabletotal,'0.00'));

    

          if (txtCgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             cgst = Math.round(taxable * txtCgstPer.getRawValue()/100);
             cgst = taxabletotal * txtCgstPer.getRawValue()/100;  
             cgst = Math.round((cgst+0.001) * 100) / 100;

             cgst = cgst.toFixed(2);
//             cgst = Math.round(cgst*100/100);
          }

          txtCgstAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
          
          if (txtSgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             sgst = Math.round(taxabletotal * txtSgstPer.getRawValue()/100); 
             sgst = taxabletotal * txtSgstPer.getRawValue()/100; 
             sgst = Math.round((sgst+0.001) * 100) / 100;
             sgst = sgst.toFixed(2);
          }
          txtSgstAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));


          if (txtIgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             igst = Math.round(taxabletotal * txtIgstPer.getRawValue()/100); 
             igst = taxabletotal * txtIgstPer.getRawValue()/100; 
             igst = Math.round((igst+0.001) * 100) / 100;
             igst = igst.toFixed(2);

          }
          txtIgstAmt.setRawValue(Ext.util.Format.number(igst,'0.00'))




   var tcsCheckAmt =  Number(txttottaxable.getValue()) + Number(cgst) + Number(sgst) + Number(igst) + Number(txtTotalSalesAmt.getValue());


   if (gstFlag == "Edit")
   {
	      txtTCSPer.setRawValue(tcsper);
	      txtTCSPer.setValue(tcsper);
	      txtTCSAmt.setValue(tcsamt);

   }
   else
   {    
	   if (Number(tcsCheckAmt) >= 5000000)
	   {  
	      txtTCSPer.setRawValue(0.1);
	      txtTCSPer.setValue(0.1);
	   }
	   else
	   {  
	      txtTCSPer.setRawValue(0);
	      txtTCSPer.setValue(0);
	   }
   }    

      findtaxablevalue();



      if (txtTCSPer.getRawValue() > 0 && tcsCheckAmt >= 5000000 )  {
           tcs =  (Number(taxabletotal) + Number(cgst) + Number(sgst) + Number(igst)) * txtTCSPer.getValue() /100;

           txtTCSAmt.setRawValue(Math.round(tcs*100/100));
      }

      netamt =  Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtTCSAmt.getRawValue());

//alert(txttottaxable.getRawValue());
//alert(netamt);

      netamt = Math.round(netamt*100/100);


      txtNetAmt.setRawValue(Ext.util.Format.number(netamt,'0.00'));

      invround = Number(netamt) - (Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtTCSAmt.getRawValue()));


      txtRound.setRawValue(Ext.util.Format.number(invround,'0.00'))


   if (gstFlag == "Edit")
      editdatecheck(); 
   else
      datecheck(); 


}




function grid_tot(){
        var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetailInv.getStore().getCount();
        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            wt=wt+Number(sel[i].data.weight);
            value1=value1+Number(sel[i].data.value);
//            taxable=taxable+Number(sel[i].data.taxval);  
         }
 
         txttotqty.setRawValue(Ext.util.Format.number(wt,'0.0'));
         txttotvalue.setRawValue(Ext.util.Format.number(value1,'0.00'));


                var diffwt = 0; 

                var packwt = txtPackSlipQty.getValue();   
                if (Number(wt) > Number(packwt))
                   diffwt = Number(wt) - Number(packwt);
                else
                   diffwt = Number(packwt) - Number(wt);

//alert(wt);
//alert(packwt);                 

                if (diffwt > 2 && gstFlag == "Add" )
                {    
                   Ext.getCmp('save').setDisabled(true);
                   alert("Packing Slip Weight is Not Tallied with Invoice weight. Please check all SO Sizes and Slip Details and continue ");
                }  
                else
                {
                   if (einvconfirm == 'N')
                       Ext.getCmp('save').setDisabled(false);
                   else
                       Ext.getCmp('save').setDisabled(true);
 
                }     



         if (txtFrtQty.getValue() == 0)
             txtFrtQty.setValue(Ext.util.Format.number(wt,'0.0'));

//         txttottaxable.setRawValue(Ext.util.Format.number(taxable,'0.00'));
         findtaxablevalue(); 

}

function findtaxablevalue(){
        var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetailInv.getStore().getCount();
        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
//'FOR STORE DATA IN GRID
           if (Number(sel[i].data.value) > 0 && txttotvalue.getRawValue() > 0 && txttottaxable.getRawValue() > 0 )  {
//              value1=Math.round(Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue()));
              value1= Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue());

              sel[i].set('taxval', Ext.util.Format.number(value1,'0.00'));
           }  
         }


}


var dgrecord = Ext.data.Record.create([]);

var flxDetailInv = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 120,
    hidden:false,
    width: 990,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "HSN Code", dataIndex:'hsncode',sortable:false,width:100,align:'left'},
       {header: "Size Code", dataIndex:'var_name',sortable:false,width:120,align:'left'},
       {header: "Units", dataIndex:'unit',sortable:false,width:100,align:'left',hidden :true},
       {header: "Size", dataIndex:'size',sortable:false,width:100,align:'left'},
       {header: "Nos", dataIndex:'nos',sortable:false,width:100,align:'left'},
       {header: "Weight", dataIndex:'weight',sortable:false,width:100,align:'left'},
       {header: "Rate", dataIndex:'rate',sortable:false,width:100,align:'left'},
       {header: "Amount", dataIndex:'amount',sortable:false,width:100,align:'left',hidden :true},
       {header: "Var Code", dataIndex:'varcode',sortable:false,width:100,align:'left',hidden :true},
       {header: "Size Code", dataIndex:'sizecode',sortable:false,width:100,align:'left',hidden :true},
       {header: "Value", dataIndex:'value',sortable:false,width:100,align:'left'},
       {header: "Tax Value", dataIndex:'taxval',sortable:false,width:100,align:'left'},
       {header: "QC Dev Y/N", dataIndex:'qcdev',sortable:false,width:100,align:'left',hidden :true},
       {header: "Loss Per MT", dataIndex:'losspmt',sortable:false,width:100,align:'left',hidden :true},





    ],

    store: PackslipdetailDataStoreNew,

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
/*
         'cellclick': function (flxDetailInv, rowIndex, cellIndex, e) {
	        var selected_rows = flxDetailInv.getSelectionModel().getSelections();
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
           var sm = flxDetailInv.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetailInv.getStore().remove(selrow);
        flxDetailInv.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         

    }

   }
*/

});



var flxSizeRate = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:500,
    height: 120,
    hidden:false,
    width: 250,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "Size Code", dataIndex:'var_name',sortable:false,width:120,align:'left'},
       {header: "Var Code", dataIndex:'sizecode',sortable:false,width:100,align:'left',hidden :true},
       {header: "Rate", dataIndex:'rate',sortable:false,width:100,align:'left'},
    ],
    store : []
}); 


var dgrecord1 = Ext.data.Record.create([]);
var flxEInvStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:120,
    height: 185,
    hidden:false,
    title:'E-INV STATUS',
    width: 220,
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


var dgrecord1 = Ext.data.Record.create([]);
var flxEWayStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:300,
    height: 150,
    hidden:false,
    title:'E-WAY-BILL STATUS',
    width: 220,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "S/E", dataIndex:'ErrorCode',sortable:false,width:30,align:'left'},
       {header: "Description", dataIndex:'ErrorDiscripion',sortable:false,width:1000,align:'left'},

    ],
    store: EWayStatusDataStore,
});



var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 200,
    y       : 300,
bodyStyle:{"background-color":"#ebebdf"},
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetailInv.getSelectionModel().selectAll();
//                var selrows = flxDetailInv.getSelectionModel().getCount();
  //              var sel = flxDetailInv.getSelectionModel().getSelections();
                var RowCnt = flxDetailInv.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetailInv.getSelectionModel().getCount();
                   var sel = flxDetailInv.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
            Ext.MessageBox.alert("Grid","Number " + sel[j].data.number + " Already Entered.");
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
	            if (cnt === 0)
	            {
            //             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
              //      }
                //    else
                  //  {
                      flxDetailInv.getStore().insert(
                      flxDetailInv.getStore().getCount(),
                      new dgrecord({
                            itemname: cmbSize.getRawValue(),
                            itemcode: cmbSize.getValue(),
                            number:i,
                            weight:txtWt.getRawValue(),
                            destag:'',
                            hsncode:''
                           })
                      );
                    }
                }
          }
  }
}
});




var TrnSalesInvoice = new Ext.TabPanel({
    id          : 'Sales Order Acceptance',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1500,
    x           : 2,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'Order & Item Details',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
//item - 2 - start
                     items: [

		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE',
		                       width       : 250,
		                       height      : 480,
		                       x           : 1070,
		                       y           : 10,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnEInvoice,btnReupload,flxEInvStatus,flxEWayStatus,
             
                                       ]
		                          
		                },


                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 500,
                               height      : 120,
                               x           : 10,
                               y           : 10,
                               border      : true,
                               layout      : 'absolute',
//item - 3 - start
                               items:[
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [txtInvNo]
                                      },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [cmbInvNo]
                                      },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 50,
                		       width       : 400,
		                       x           : 230,
                		       y           : 0,
		                       border      : false,
                		       items: [dptInvNo]
   		                     },
                   	
                                     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 550,
                                       x           : 0,
                                       y           : 30,
                                       border      : false,
                                       items: [cmbCustomer]
                                     },

                                     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 220,
                                       x           : 0,
                                       y           : 60,
                                       border      : false,
                                       items: [cmbSlipNo]
   		                     },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 60,
                		       width       : 200,
		                       x           : 230,
                		       y           : 60,
		                       border      : false,
                		       items: [dptSlip]
                                     },  
              
                    
		  	           ]	  
//item - 3 - end
                             },
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 545,
                                  height      : 120,
                                  x           : 510,
                                  y           : 10,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                     	     { 
                                                  xtype       : 'fieldset',
                         		          title       : '',
		                                  labelWidth  : 100,
                		                  width       : 300,
                                                  x           : 0,
		                                  y           : 0,
                		                  border      : false,
                                		  items: [txtReference]
		                             },
	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 400,
                                                  x           : 300,
          		                          y           : 0,
                        	                  border      : false,
                                                  items: [dptRef]
   		                            },

                                     	     { 
                                                  xtype       : 'fieldset',
                         		          title       : '',
		                                  labelWidth  : 100,
                		                  width       : 300,
                                                  x           : 0,
		                                  y           : 30,
                		                  border      : false,
                                		  items: [txtSO]
		                             },
	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 400,
                                                  x           : 300,
          		                          y           : 30,
                        	                  border      : false,
                                                  items: [dptSO]
   		                            },


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 100,
                                                  width       : 310,
                                                  x           : 0,
                                                  y           : 60,
                                                  border      : false,
                                                  items: [cmbTax]
                                            },




	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 420,
                                                  x           : 300,
          		                          y           : 60,
                        	                  border      : false,
                                                  items: [txtTotalSalesAmt]
   		                            },
                                        ]
                             },


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 100,
                                                  width       : 310,
                                                  x           : 1200,
                                                  y           : -10,
                                                  border      : false,
                                                  items: [btnGSTRefresh]
                                            },

// RIGHT PANEL END

// BOTTOM PANEL START2.Test

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 1045,
                                  height      : 500,
                                  x           : 10,
                                  y           : 140,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                            xtype       : 'fieldset',
                                            title       : '',
                                            width       : 1010,
                                            height      : 170,
                                            x           : 0,
                                            y           : 0,
                                            border      : true,
                                            layout      : 'absolute',
                                            items:[ flxDetailInv
                                            ]
                                          } ,

                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 10,
                                                y           : 130,
                                                border      : false,
                                                items: [txtPackSlipQty] 
                                          },


                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 250,
                                                y           : 130,
                                                border      : false,
                                                items: [txttotqty] 
                                          },


                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 460,
                                                y           : 130,
                                                border      : false,
                                                items: [txttotvalue] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 700,
                                                y           : 130,
                                                border      : false,
                                                items: [txttottaxable] 
                                             },




                                        ] 
                               },
    
                               {                               
                                             xtype       : 'fieldset',
                                             title       : 'GST %',
                                             width       : 400,
                                             height      : 100,
                                             x           : 20,
                                             y           : 330,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 0,
                                                y           : 0,
                                                border      : false,
                                                items: [txtCgstPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 125,
                                                y           : 0,
                                                border      : false,
                                                items: [txtSgstPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 245,
                                                y           : 0,
                                                border      : false,
                                                items: [txtIgstPer] 
                                             },


                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 0,
                                                y           : 25,
                                                border      : false,
                                                items: [txtCgstAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 110,
                                                y           : 25,
                                                border      : false,
                                                items: [txtSgstAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 220,
                                                y           : 25,
                                                border      : false,
                                                items: [txtIgstAmt] 
                                             },
 					    ],	
                               },
                               {   
                                             xtype       : 'fieldset',
                                             title       : 'INSURANCE / FREIGHT & OTHERS',
                                             width       : 360,
                                             height      : 100,
                                             x           : 430,
                                             y           : 330,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                              {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 10,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblInsPer]
                                             },
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 80,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblFrtQty]
                                             },                    
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 180,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblFrt]
                                             },

                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 260,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblTCS]
                                             },

                        
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 0,
                                                y           : 10,
                                                border      : false,
                                                items: [txtInsPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 70,
                                                y           : 10,
                                                border      : false,
                                                items: [txtFrtQty] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 125,
                                                x           : 150,
                                                y           : 10,
                                                border      : false,
                                                items: [txtFrt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 125,
                                                x           : 245,
                                                y           : 10,
                                                border      : false,
                                                items: [txtTCSPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 0,
                                                y           : 35,
                                                border      : false,
                                                items: [txtInsAmt] 
                                             },

                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 145,
                                                y           : 35,
                                                border      : false,
                                                items: [txtFrtAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 150,
                                                x           : 240,
                                                y           : 35,
                                                border      : false,
                                                items: [txtTCSAmt] 
                                             },

/*                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 170,
                                                y           : 35,
                                                border      : false,
                                                items: [txtOthers] 
                                             },
*/
 					     ]	
                                 },

                                 {   
                                             xtype       : 'fieldset',
                                             title       : '',
                                             width       : 220,
                                             height      : 100,
                                             x           : 810,
                                             y           : 330,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[

                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 170,
                                                x           : 1,
                                                y           : 5,
                                                border      : false,
                                                items: [txtRound] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 200,
                                                x           : 1,
                                                y           : 40,
                                                border      : false,
                                                items: [txtNetAmt] 
                                             },
 					     ]	
                                 },
                                 {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 10,
                                                y           : 435,
                                                border      : false,
                                                items: [txtDistance] 
                                   },
                                 {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 250,
                                                x           : 270,
                                                y           : 435,
                                                border      : false,
                                                items: [btnDistanceUpdate] 
                                   },
           
                              
                                 {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 370,
                                                y           : 435,
                                                border      : false,
                                                items: [txtSMSNo] 
                                   }


,btnSMS,//btnRefreshService,

 flxSizeRate ,

                           ],


                        } ,


//TAB2 START
                        {
                           xtype: 'panel',
                           title: 'Delivery & Truck Details',bodyStyle:{"background-color":"#ebebdf"},
                           layout: 'absolute',
 	                   items: [
                                  {
                                   xtype       : 'fieldset',
                                   title       : '',
                                   width       : 1320,
                                   height      : 470,
                                   x           : 10,
                                   y           : 10,
                                   border      : true,
                                   layout      : 'absolute',
//item - 3 - start
                                   items:[
                                         

                   
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 5000,
                                            x           : 560,
                                            y           : 0,
                                            border      : false,                                            
                                            items: [cmbTransport]
                                         },   

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 500,
                                            x           : 00,
                                            y           : 30,
                                            border      : false,
                                            items: [txtVehicle]
                                         },


                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 500,
                                            x           : 00,
                                            y           : 60,
                                            border      : false,
                                            items: [txtLrNo]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 500,
                                            x           : 00,
                                            y           : 90,
                                            border      : false,
                                            items: [txtEwayBillNo]
                                         },


                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 350,
                                            y           : 60,
                                            border      : false,
                                            items: [dptLrNo]
                                         },

                                
 
                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 500,
                                            x           : 0,
                                            y           : 0,
                                            border      : false,
                                            items: [txtCreditDays]
                                         },
                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 250,
                                            y           : 0,
                                            border      : false,
                                            items: [txtGraceDays]
                                         },

                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 580,
                                            y           : 0,
                                            border      : false,
                                            items: [btnCrdaysChange]
                                         },

                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 580,
                                            y           : 30,
                                            border      : false,
                                            items: [btnTruckChange]
                                         },
                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 580,
                                            y           : 80,
                                            border      : false,
                                            items: [btnEwayUpdate]
                                         },


           
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 800,
                                            x           : 0,
                                            y           :120,
                                            border      : false,
                                            items: [txtCustIns]
                                         },

//btnRefreshService,
btnAccUpdate,

                                  ],
                             },
//Delivery Address box Start

                             {   
                                  xtype       : 'fieldset',
                                  title       : 'DELIVERY ADDRESS',
                                  width       : 600,
                                  height      : 200,
                                  x           : 15,
                                  y           : 200,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : -10,
                                             border      : false,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 17,	
                                             border      : false,
                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 44,
                                             border      : false,
                                             items: [txtAddr3] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 71,	
                                             border      : false,
                                             items: [txtAddr4] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 95,	
                                             border      : false,
                                             items: [cmbState] 
                                         },


                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 200,
                                             x           : 0,
                                             y           : 127,	
                                             border      : false,
                                             items: [txtPin] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 300,
                                             x           : 250,
                                             y           : 127,	
                                             border      : false,
                                             items: [txtGstNo] 
                                         },


 					]	
                            },

                             {   
                                  xtype       : 'fieldset',
                                  title       : 'TRANSPORT DETAILS',
                                  width       : 400,
                                  height      : 100,
                                  x           : 870,
                                  y           : 10,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : -10,
                                             border      : false,
                                             items: [txtTransport] 
                                         },

                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 300,
                                             x           : 0,
                                             y           : 30,	
                                             border      : false,
                                             items: [txtTransportGST] 
                                         },


 					]	
                            },

 
//Delivery Address box End


                            ]
                        },

                        {
                           xtype: 'panel',
                           title: 'ACK NO & IRN NO UPDATE ',bodyStyle:{"background-color":"#ebebdf"},
                           layout: 'absolute',
 	                   items: [

                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 1300,
                                             x           : 10,
                                             y           : 30,	
                                             border      : false,
                                             items: [txtAckNo] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 1300,
                                             x           : 10,
                                             y           : 60,	
                                             border      : false,
                                             items: [txtIRNNo] 
                                         },

                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 1300,
                                             x           : 10,
                                             y           : 90,	
                                             border      : false,
                                             items: [txtQRCode] 
                                         },


                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 400,
                                             x           : 1100,
                                             y           : 280,	
                                             border      : false,
                                             items: [btnIRNUpdate] 
                                         },


                           ]
                        } 

//TAB2 END
         ]
});


function save_click()
{
    var timeremoval = new Date();
    timeremoval.setTime(new Date().getTime() + (10*60*1000));
 var gstSave;
//save

    gstSave="true";

                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);



var formattedStartDate = Ext.util.Format.date(finstartdate, 'Y-m-d');
var formattedEndDate   = Ext.util.Format.date(finstartdate, 'Y-m-d');

var formattedInvDate   = Ext.util.Format.date(dptInvNo.getValue(), 'Y-m-d');

//alert(formattedStartDate);
//alert(formattedEndDate);
//alert(formattedInvDate);


    if(Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
    }

    else if (txtInvNo.getRawValue()==0 || txtInvNo.getRawValue()=="")
    {
        Ext.Msg.alert('Sales','Invoice no connot be Empty.....');
        gstSave="false";
    }
    
    else if (flxDetailInv.getStore().getCount()==0)
            {
                Ext.Msg.alert('Sales-Invoice','Grid should not be empty..');
                gstSave="false";
            }

    else if (cmbTax.getRawValue()==0 || cmbTax.getRawValue()=="")
    {
        Ext.Msg.alert('Sales-Invoice','Select Tax Type.....');
        gstSave="false";
    }
/*
    else if (cmbTransport.getValue()==0 || cmbTransport.getRawValue()=="")
    {
        Ext.Msg.alert('Sales-Invoice','Select Transport.....');
        gstSave="false";
        cmbTransport.setfocus();
    }
*/
    else if (taxcode == 0 )
    {
        Ext.Msg.alert('Sales-Invoice','Select Tax Name.....');
        gstSave="false";
   }
    else if (txtDistance.getValue() == 0  || txtDistance.getValue() == ''   )
    {
        Ext.Msg.alert('Sales-Invoice','Enter Road Distance.....');
        gstSave="false";
   }

    else if (txtAddr1.getRawValue().trim() != '' &&  cmbState.getValue() == 0  )
    {
           Ext.Msg.alert('Sales-Invoice','Select Delivery State .....');
           gstSave="false";
    }
    else if (txtAddr1.getRawValue().trim() != '' &&  txtPin.getRawValue() == '' )
    {       
           Ext.Msg.alert('Sales-Invoice','Enter Delivery Pin Code .....');
           gstSave="false";
    }
    else if (txtAddr1.getRawValue().trim() != '' &&  txtGstNo.getRawValue() == '' )
    {       
           Ext.Msg.alert('Sales-Invoice','Enter Delivery GST No .....');
           gstSave="false";
    }
    else if (txtAddr1.getRawValue().trim() != '' &&  txtGstNo.getRawValue().length != 15  )
    {       
           Ext.Msg.alert('Sales-Invoice','Error in  Delivery GST No .....');
           gstSave="false";
    }

    else if (txtSO.getRawValue().trim() == '' )
    {       
           Ext.Msg.alert('Sales-Invoice','Error in  SO No .....');
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

      

            Ext.getCmp('save').setDisabled(true);

            var invData = flxDetailInv.getStore().getRange();                                        
            var invupdData = new Array();
            Ext.each(invData, function (record) {
                invupdData.push(record.data);
            });

//save
//alert(invupdData);





            Ext.Ajax.request({
           url: 'TrnSalesInvoiceSave.php',
//                            url: 'tempsave.php',
            params :
             {

		griddetinv : Ext.util.JSON.encode(invupdData),     
	        cnt: invData.length  ,
                savetype:gstFlag,
             	invhcompcode  :Gincompcode,
		invhfincode   :GinFinid,
                gsttype       :gsttype,    
		invhrefno     :txtInvNo.getRawValue(),
                invhno        :invoiceno, 
                invhseqno     :invseqno, 
		invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
		invhtime      :Ext.util.Format.date(new Date(),"H:i"),//Ext.util.Format.date(dptInvNo.getValue(),"H:i"),  
 		invhtimeremove:Ext.util.Format.date(timeremoval,"H:i"),
		invhpartyordno:txtReference.getRawValue(),
		invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),
		invhourordno  :txtSO.getRawValue(),
		invhourorddt  :Ext.util.Format.date(dptSO.getValue(),"Y-m-d"),
		invhparty     :cmbCustomer.getValue(),
		invhcrddays   :txtCreditDays.getRawValue(),  
		invhgracedays :txtGraceDays.getRawValue(),  
		invhtaxtag    :taxcode,
		invhinsper    :txtInsPer.getRawValue(),
		invhinsamt    :txtInsAmt.getRawValue(),
		invhfrtrate   :Number(txtFrt.getRawValue()),
		invhfrtamt    :txtFrtAmt.getRawValue(),
		invhroff      :txtRound.getRawValue(),
		invhnetamt    :txtNetAmt.getRawValue(),
		invhnoofreels :reels, 
		invhtotwt     :txttotqty.getRawValue(),
		invhslipno    :cmbSlipNo.getRawValue(),
		invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
		invhvehino    :txtVehicle.getRawValue(),
		invhlrno      :txtLrNo.getRawValue(),
		invhlrdate    :Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"),
	        invhvouno     :vouno,
		invhvouyear   :Ext.util.Format.date(dptInvNo.getValue(),"Y"),
		invhtaxableamt:txttottaxable.getRawValue(),
		invhothers      :0,
		invhsgstper     :txtSgstPer.getRawValue(),
		invhsgstamt       :txtSgstAmt.getRawValue(),
		invhcgstper       :txtCgstPer.getRawValue(),
		invhcgstamt       :txtCgstAmt.getRawValue(),
		invhigstper       :txtIgstPer.getRawValue(),
		invhigstamt       :txtIgstAmt.getRawValue(),
		invhtcsper        : Number(txtTCSPer.getRawValue()),
		invhtcsamt        : Number(txtTCSAmt.getRawValue()),
		cancelflag	  :'0', 
                invhdelivery_add1 :txtAddr1.getRawValue(),
                invhdelivery_add2 :txtAddr2.getRawValue(),
                invhdelivery_add3 :txtAddr3.getRawValue(),
                invhdelivery_city :txtAddr4.getRawValue(),
                invhdelivery_pin  :txtPin.getRawValue(), 
                invhstatecode     :Number(cmbState.getValue()), 
                invhinstruction  :txtCustIns.getRawValue(), 
                invhdelivery_gst  :txtGstNo.getRawValue(),
                invh_sal_ledcode  :sales_ledcode,
                invh_cgst_ledcode :cgst_ledcode,                                
                invh_sgst_ledcode :sgst_ledcode,                               
                invh_igst_ledcode :igst_ledcode,                              
                invh_description  :'Sales', 
                invhewaybillno    : txtEwayBillNo.getRawValue(), 
                sonolist          : packslipno,
                frtqty            : txtFrtQty.getValue(),
                roaddistance      : txtDistance.getValue(),
                invhtransportname :txtTransport.getRawValue(),
                invhtransportgst  :txtTransportGST.getRawValue(),
                usercode          : userid,
		},
              callback: function(options, success, response)
              {

                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    RefreshData();
                    Ext.MessageBox.alert("Invoice Saved  -" + obj['msg']);
                    TrnSalesInvoicePanel.getForm().reset();

                    RefreshData();
                 }
                 else  
                 if (obj['success']==="Available")
			{                                
                    Ext.MessageBox.alert("Same Invoice Number Already Saved -" + obj['msg']);

                    Ext.getCmp('save').setDisabled(false);
                  }

                  else
		   {
Ext.MessageBox.alert("Invoice Not Saved - Please check customer Master and Provide STATE / GST /DEALER and essential" + obj['msg']);                                                  
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



   flxDetailInv.getStore().removeAll();
   txtNetAmt.setValue('');
    gstFlag = "Edit";
    Ext.getCmp('cmbInvNo').show();

    if (usertype == 1)
    {
        Ext.getCmp('save').setDisabled(false);
    }
    else
    {
        Ext.getCmp('save').setDisabled(true);
    }

    loadInvoicelistDataStore.removeAll();
    loadInvoicelistDataStore.load({
	url: 'ClsTrnSalesInvoice.php',
	params: {
	    task: 'loadInvoiceNoList',
	    finid: GinFinid,
	    compcode:Gincompcode,
            gsttype :gsttype,
        },
      	callback:function()
        {
//			    alert(loadInvoicelistDataStore.getCount());	
             cmbInvNo.setRawValue(gsttype+"/")


        }
    });
}


var TrnSalesInvoicePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES INVOICE ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesInvoicePanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
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
   //         icon: '/SHVPM/Pictures/add.png',
            listeners:{
                click: function () {
                    gstFlag = "Add";
                    TrnSalesInvoicePanel.getForm().reset();
                    RefreshData();
                }
            }
        },'-',
//EDIT
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//alert(usertype);
                   edit_click();




                }
            }
        },'-',
          {
            text: 'Save',
            id  : 'save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {

                  save_click();
//alert(Ext.util.Format.date(finstartdate,"Y-m-d"));
//alert(Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"));


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

                    TrnSalesInvoicePanel.getForm().reset();
                    RefreshData();
                }
            }
        },'-',
//VIEW
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
                        i1 = "EXTRA COPY";
			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&invno=" + encodeURIComponent(cmbInvNo.getRawValue());
                        var p4 = "&displayword=" + encodeURIComponent(i1);
                        var param = (p1 + p2 + p3 + p4  );  
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

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
                    TrnSalesInvoiceWindow.hide();
                }
            }
        }]
    },
     items: [ TrnSalesInvoice ]
});


    

   function RefreshData(){



/*
var itime =Ext.util.Format.date(new Date(),"H:i")
alert(itime);

var d1 = new Date();
var d2 = new Date();
//d2.setTime(d1.getTime());

d2.setTime(d1.getTime() + (30*60*1000));
alert (d2);




var dt = new Date();
alert(dt);
alert(dt.getDate()+2);
//var dt2 = new Date().getValue().add(Ext.Date.DAY,10);
//alert(dt2);
var itime =Ext.util.Format.date(new Date(),"H:i")
alert(itime);

//alert(Ext.Date.add(new Date(),Ext.Date.MINUTE,10));

//document.write(dt.format(Date.patterns.ShortTime));
*/

//        Ext.getCmp('btnEInvoice').hide();
//        Ext.getCmp('btnSMS').hide();





         errcode = 0;
         Ext.getCmp('btnDistanceUpdate').hide();


                     Ext.getCmp('btnSMS').setDisabled(false);  

		     Ext.getCmp('btnSMS').hide();
	             Ext.getCmp('btnEInvoice').hide();
	             Ext.getCmp('btnReupload').hide();
	             Ext.getCmp('btnCrdaysChange').hide();
	             Ext.getCmp('btnTruckChange').hide();

                 Ext.getCmp('txtAckNo').setDisabled(true);  
                 Ext.getCmp('txtIRNNo').setDisabled(true);  
                 Ext.getCmp('txtQRCode').setDisabled(true);  
                 Ext.getCmp('btnIRNUpdate').setDisabled(true);  


        Ext.getCmp('save').setDisabled(false);


        gstFlag = "Add";

        accseqno = 0;
        cmbInvNo.setRawValue('');
        cmbInvNo.setValue('');
        flxDetailInv.getStore().removeAll();
        Ext.getCmp('cmbInvNo').hide();
        Ext.getCmp('cmbTransport').hide();

        txtAddr1.setRawValue('');
        txtAddr2.setRawValue('');
        txtAddr3.setRawValue('');
        txtAddr4.setRawValue('');
  
         
        txtPin.setRawValue('');

        txtCustIns.setRawValue('');

        txtTransport.setRawValue('');
        txtTransportGST.setRawValue('');
        Ext.getCmp('save').setDisabled(false);
        txtVehicle.setRawValue('');

 	loadInvnodatastore.removeAll();
	loadInvnodatastore.load({
        url: 'ClsTrnSalesInvoice.php',
        params: {
                    task: 'loadInvoiceNo',
                    compcode:Gincompcode,
                    finid:GinFinid ,
                    gsttype : gsttype
                },
		callback:function()
      		{
//                    if (loadInvnodatastore.getAt(0).get('invno') == 1) {
//                          txtInvNo.setValue(GinFinid+Gincompcode+"001");
//                          invoiceno = 1;
//                     }    
//                     else {
//                          txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));
//                          invoiceno = 1;
//                          } 


                                       invoiceno = loadInvnodatastore.getAt(0).get('invno')
                                       if (loadInvnodatastore.getAt(0).get('invno') < 10)
                                        {                                              
//                                          alert("00"+loadInvnodatastore.getAt(0).get('invno'));
                                          ino = "00"+loadInvnodatastore.getAt(0).get('invno');
                                        }                                      
                                        else
                                        {  
                                             if (loadInvnodatastore.getAt(0).get('invno') < 100) 
                                             {                                              
//                                              alert("0"+loadInvnodatastore.getAt(0).get('invno')); 
                                              ino = "0"+loadInvnodatastore.getAt(0).get('invno');                   
                                             }
                                             else 
                                             {      
                                               ino = loadInvnodatastore.getAt(0).get('invno');  
                                             }
                                        } 
                                         txtInvNo.setValue(gsttype+'/'+ino+'/'+invfin);


          
                if (txtInvNo.getValue().substr(0,6)  == 'TN/001')
                {
                    Ext.getCmp('txtRound').setReadOnly(false);
                    Ext.getCmp('txtNetAmt').setReadOnly(false);    
                }     
                else
                {
                    Ext.getCmp('txtRound').setReadOnly(true);
                    Ext.getCmp('txtNetAmt').setReadOnly(true);    
                }     
    


               }



	  });
			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                        gsttype :gsttype,
                                       	invno: 0
		                }
	  });


   };
   


    var ino = 0;

    var TrnSalesInvoiceWindow = new Ext.Window({
	height      : 900,
        width       : 1350,
        y           : 30,
        title       : 'SALES - INVOICE ENTRY',
        items       : TrnSalesInvoicePanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){


                     Ext.getCmp('btnAccUpdate').hide();
                                  
		     Ext.getCmp('btnSMS').hide();
	             Ext.getCmp('btnEInvoice').hide();
	             Ext.getCmp('btnReupload').hide();

	             Ext.getCmp('EInv').hide();
          
	             Ext.getCmp('btnCrdaysChange').hide();
	             Ext.getCmp('btnTruckChange').hide();
	             Ext.getCmp('btnEwayUpdate').hide();

                     Ext.getCmp('cmbTax').setDisabled(true);  
                     Ext.getCmp('cmbTransport').hide();
                     RefreshData();

//alert(finstartdate);
//alert(finenddate);
//alert(GinFinid);

/*
			loadInvnodatastore.removeAll();

			loadInvnodatastore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadInvoiceNo',
                                    compcode:Gincompcode,
                                    finid:GinFinid,
                                    gsttype : gsttype 
		                },
				callback:function()
	               		{

//alert(loadInvnodatastore.getAt(0).get('invno').slice(-4));
//alert(loadInvnodatastore.getAt(0).get('invno').slice(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(5));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(3));
//alert('GS'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3)));
 
                                vouno = 'GSI'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3));

//                                if (loadInvnodatastore.getAt(0).get('invno') == 1) {
//                                    txtInvNo.setValue(gsttype+'/'+"001"+'/'+invfin);
                                    
//                                    invoiceno = 1
  //                                 }
    
//                                  else {
                                       invoiceno = loadInvnodatastore.getAt(0).get('invno')

                                       if (loadInvnodatastore.getAt(0).get('invno') < 10)
                                        {                                              
//                                          alert("00"+loadInvnodatastore.getAt(0).get('invno'));
                                          ino = "00"+loadInvnodatastore.getAt(0).get('invno');
                                        }                                      
                                        else
                                        {  
                                             if (loadInvnodatastore.getAt(0).get('invno') < 100) 
                                             {                                              
//                                             alert("0"+loadInvnodatastore.getAt(0).get('invno')); 
                                              ino = "0"+loadInvnodatastore.getAt(0).get('invno');                   
                                             }
                                             else 
                                             {      
                                               ino = loadInvnodatastore.getAt(0).get('invno');  
                                             }
                                        } 
                                         txtInvNo.setValue(gsttype+'/'+ino+'/'+invfin);

//                                     txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));

                                     //invoiceno = "00"+loadInvnodatastore.getAt(0).get('invno');
//                                     invoiceno = loadInvnodatastore.getAt(0).get('invno');

//                                  } 
    				}
			  });

			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                       	invno: 0
		                }
//,
//                                callback:function()
//                                {
//alert(loadAllCustomerStore.getCount());
//                                }

			  });
*/
                    }
        } 
    });
       TrnSalesInvoiceWindow.show();  
});
