Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstFlag;
   var fbo_flg,porate;

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
 


   var GinUser = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');


   var itemhsncode;
   var potype='B';
   var poseqno = 0; 
   var dept;


   var supcode = 0;
   var suptype = '';

   var printtype = "PDF";
   var gridedit = "false";
var servchrgval = 0;
var servchval = 0;
var cessmtval = 0;
var supplierid = 77;
var handlingval = 0;
var handlingval1 = 0;
var handlingval2 = 0;

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}


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
                  JournalEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
                 cmbArea.foucs();
            }
        }]);


function grid_tot(){
        totalvalue=0;
        totalqty =0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totalvalue=totalvalue+Number(sel[i].data.totvalue);
            totalqty =   totalqty+Number(sel[i].data.qty);
        }
        txtTotQty.setValue(totalqty);
        txtTotValue.setValue(totalvalue); 

}


var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 140,
    height:90,
    defaultType : 'textfield',
    x:740,
    y:0,
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
                 CalculatePOValue();   
                 grid_tot();
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                CalculatePOValue();   
                grid_tot();
               }
              }
             }},





        ],
    },

    ],
});

var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
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


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_taxtag' 
      ]),
    });






function CalculatePOValue()
{
     var povalue = 0;
     txtCGSTvalue.setValue('');
     txtSGSTvalue.setValue('');
     txtIGSTvalue.setValue('');
     txtCessAmt.setValue('');
     txtHandingAmount.setValue('');
     txtHandlingcgstval.setValue('');
     txtHandlingsgstval.setValue('');



     if (Number(txtCGST.getValue()) > 0)
        txtCGSTvalue.setRawValue(Number(txtTotValue.getValue())*Number(txtCGST.getValue())  /100);
     if (Number(txtSGST.getValue()) > 0)
        txtSGSTvalue.setRawValue(Number(txtTotValue.getValue())*Number(txtSGST.getValue())  /100);
     if (Number(txtIGST.getValue()) > 0)
        txtIGSTvalue.setRawValue(Number(txtTotValue.getValue())*Number(txtIGST.getValue())  /100);
     if (Number(txtCessPMT.getValue()) > 0)
        txtCessAmt.setValue(Number(txtCessPMT.getValue())*Number(txtTotQty.getValue()));
     if (Number(txtHandlingPMT.getValue()) > 0)
        txtHandingAmount.setValue(Number(txtHandlingPMT.getValue())*Number(txtTotQty.getValue()) );
     if (Number(txtHandingAmount.getValue()) > 0 &&  Number(txtHandlingcgst.getValue()) > 0  )
        txtHandlingcgstval.setValue(Number(txtHandingAmount.getValue())*Number(txtHandlingcgst.getValue())/100 );    
     if (Number(txtHandingAmount.getValue()) > 0 &&  Number(txtHandlingsgst.getValue()) > 0  )
        txtHandlingsgstval.setValue(Number(txtHandingAmount.getValue())*Number(txtHandlingsgst.getValue())/100 );    


      povalue = Number(txtTotValue.getValue()) +  Number(txtCGSTvalue.getValue()) + Number(txtSGSTvalue.getValue()) + Number(txtIGSTvalue.getValue()) + Number(txtCessAmt.getValue()) + Number(txtHandingAmount.getValue()) + Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) 
; 


//    txtPOValue.setValue(parseFloat(txtTotValue.getValue())+  parseFloat(txtCGSTvalue.getValue())+ parseFloat(txtSGSTvalue.getValue())+       parseFloat(txtIGSTvalue.getValue())+  parseFloat(txtCessAmt.getValue())+ parseFloat(txtHandingAmount.getValue())+ parseFloat(txtHandlingcgstval.getValue())+                parseFloat(txtHandlingsgstval.getValue()));

        if (roundoff == "Y")           
        {    
           povalue2 =  povalue.toFixed(0);
           txtroundoff.setValue(Ext.util.Format.number(povalue-povalue2,"0.00"));
           povalue = povalue2;
        
        }
        else if (roundoff == "N")           
        {  
           povalue =  povalue.toFixed(2);    
           txtroundoff.setValue(0);
        }  
          

   txtPOValue.setValue(povalue);
}
 


var VendoraddDataStore = new Ext.data.Store({
  id: 'VendoraddDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "vendoradd"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['cust_addr1','cust_addr2','cust_addr3','cust_city','cust_taxtag'
  ])
});

var PONoDataStore = new Ext.data.Store({
  id: 'PONoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'ordh_no'
  ])
});



var PONoListDataStore = new Ext.data.Store({
  id: 'PONoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'ordh_no','ordh_seqno'
  ])
});
var ItemRateDataStore = new Ext.data.Store({
  id: 'ItemRateDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'pitr_seqno', 'pitr_item_code', 'pitr_cust_code', 'pitr_rate', 'pitr_rate_tipper'
  ])
});

var TaxDataStore = new Ext.data.Store({
  id: 'TaxDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "taxdetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days', 'cust_grace_days', 'cust_repr', 'cust_panno', 'cust_gstin', 'cust_dealer', 'cust_smsno', 'cust_partygroup', 'cust_noof_visits1', 'cust_desp_target1', 'cust_payperf1', 'cust_tcs_applied', 'cust_distance', 'cust_addnlwt', 'cust_lock', 'cust_overdue_msg', 'cust_area', 'cust_addnl_cd_days', 'cust_acc_group', 'cust_gst_type', 'cust_tds_type', 'cust_tds_yn', 'cust_wp_gstinv_supplier_yn', 'cust_type',  'seqno',' cust_destination_enable_yn'
  ])
})

var PaymentmodeDataStore = new Ext.data.Store({
  id: 'PaymentmodeDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadpaymode"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['term_code','term_name'
  ])
});

var CarriageDataStore = new Ext.data.Store({
  id: 'CarriageDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadcarrtype"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['carr_code','carr_name'
  ])
});

var ItemDetailsDataStore = new Ext.data.Store({
  id: 'ItemDetailsDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "itemstock"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itmh_moisture_ARB','itmh_fines','itmh_sand'])
});


var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'cust_code', type: 'int', mapping: 'cust_code'},
    {name: 'cust_ref', type: 'string', mapping: 'cust_ref'}
  ])
});

var VendorthrdDataStore = new Ext.data.Store({
  id: 'VendorthrdDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'cust_code', type: 'int', mapping: 'cust_code'},
    {name: 'cust_ref', type: 'string', mapping: 'cust_ref'}
  ])
});

var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaditem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'itmh_code','itmh_name'
  ])
});



var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
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
});



var loadareadatastore = new Ext.data.Store({
      id: 'loadareadatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'area_code', type: 'int',mapping:'area_code'},
	{name:'area_name', type: 'string',mapping:'area_name'}
      ]),
    });



var cmbArea = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 160,
    displayField    : 'area_name', 
    valueField      : 'area_code',
    id              : 'cmbArea',
    typeAhead       : true,
    mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : loadareadatastore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbItemName.focus();
             }
       },
        select:function(){

     
        }
    }
});




var lblPurGroup = new Ext.form.Label({
    fieldLabel  : 'Pur. Group',
    id          : 'lblPurGroup',
    width       : 150,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

/*
var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Group',
    width           : 200,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
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
                  cmbArea.focus();
             }
          }
        },
        select: function () 
        { 
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuPo.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{

                  txtCGST.setRawValue('');
                  txtSGST.setRawValue('');
                  txtIGST.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';

 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();
                    if (cnt >0)
                    {
                          txtCGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
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
});
*/

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
      specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbArea.focus();
             }
       },
        select: function () 
        { 
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuPo.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{

                  txtCGST.setRawValue('');
                  txtSGST.setRawValue('');
                  txtIGST.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';

 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();
                    if (cnt >0)
                    {
                          txtCGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');

                    } 
  //                  find_value(); 

 //               flxaccupdation(); 
                CalculatePOValue();
                grid_tot(); 
  
		}
	      });  

      }   
}
});

var lblArea = new Ext.form.Label({
    fieldLabel  : 'Area',
    id          : 'lblArea',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});


var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItem',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblMois = new Ext.form.Label({
    fieldLabel  : 'Mois%',
    id          : 'lblMois',
    width       : 50,
    labelStyle : "font-size:13px;font-weight:bold;color:#0080ff",
    
});
var lblFines = new Ext.form.Label({
    fieldLabel  : 'Fines%',
    id          : 'lblFines',
    width       : 50,

    labelStyle  : "font-size:13px;font-weight:bold;color:#0080ff",
});


var lblSand = new Ext.form.Label({
    fieldLabel  : 'Sand%',
    id          : 'lblSand',
    width       : 50,

    labelStyle  : "font-size:13px;font-weight:bold;color:#0080ff",
});



var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(t)',
    id          : 'lblQty',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblPono = new Ext.form.Label({
    fieldLabel  : 'PO No',
    id          : 'lblPono',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;width:60;padding:0px 0px 0px 0px;",
    style      :"border-radius: 5px; ",
});

var lblPodate = new Ext.form.Label({
    fieldLabel  : 'PO Date',
    id          : 'lblPodate',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;width:60;padding:0px 0px 0px 0px;",
    style      :"border-radius: 5px; ",
});



var PODetailDataStore = new Ext.data.Store({
  id: 'PODetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPODetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
'ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_remarks', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_handling_cgstper', 'ordh_handling_sgstper','ordh_itemvalue', 'ordh_roundinff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'ordh_custduty_mt', 'ordh_handling_mt', 'ordh_handling_party', 'ordh_gcv', 'ordh_gcv_tol', 'ordh_mois', 'ordh_mois_tol', 'ordh_inh_mois', 'ordh_inh_mois_tol', 'ordh_ash', 'ordh_ash_tol', 'ordh_sulpher', 'ordh_size', 'ordh_hgi', 'ordh_tcs', 'ordh_vol_matter', 'ordh_cess_pmt', 'ordt_hdseqno', 'ordt_seqno', 'ordt_item_code', 'ordt_indh_seqno', 'ordt_enqh_seqno', 'ordt_qty', 'ordt_rec_qty', 'ordt_can_qty', 'ordt_pen_qty', 'ordt_unit_rate', 'ordt_item_value', 'ordt_edpercentage', 'ordt_moisper', 'ordt_tareper', 'ordt_status', 'cust_code', 'cust_name', 'cust_ref', 'cust_addr1', 'cust_addr2', 'cust_addr3', 'cust_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'cust_taxtag', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin',  'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_cstledcode', 'itmh_impledcode', 'itmh_outthrough', 'itmh_prohiper', 'itmh_hsncode',  'indh_seqno', 'indh_compcode', 'indh_fincode', 'indh_no', 'indh_date', 'indh_dept', 'indh_value', 'indh_status', 'indh_remarks', 'indh_usr_code', 'indh_entry_date', 'ordh_total_mois','ordh_refno', 'ordh_refdate', 'ordh_mois_tol','ordh_fixed_carbon','ordh_gcv_adb', 'ordh_gcv_adbtol', 'ordh_gcv_arb', 'ordt_moisper','ordt_finesper', 'ordt_sandper' ,'ordh_purledger', 'ordh_gcv_arbtol','ordh_vessal','ordh_preparedby','ordt_purgrp','led_name','led_code','area_code','area_name','ordh_roundneed'

  
  ])
});

var cmbPONo = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 80,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : '',
    id              : 'cmbPONo',
    typeAhead       : true,
    mode            : 'local',
    store           : PONoListDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
        select:function(){

                     txtPONo.setValue(cmbPONo.getRawValue());
//tabOrderAmendment.setActiveTab(2);tabOrderAmendment.setActiveTab(1); tabOrderAmendment.setActiveTab(0);
			flxDetail.getStore().removeAll();
	
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsFuPo.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                       	},
                        callback: function () 
                        {

   
			PODetailDataStore.load({
                        url: 'ClsFuPo.php',
                        params:
                            {
                                task:"loadPODetail",
                                ordcode: cmbPONo.getRawValue(),
			    	compcode: Gincompcode,
			    	finid: GinFinid,
                            },
                            scope: this,
                            callback: function () 
			    {




				dtpPodate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_date'),'d-m-Y'));
				poseqno = PODetailDataStore.getAt(0).get('ordh_seqno');




			
				txtHandlingPMT.setValue(PODetailDataStore.getAt(0).get('ordh_handling_mt'));
				txtHandlingcgst.setValue(PODetailDataStore.getAt(0).get('ordh_handling_cgstper'));
				txtHandlingsgst.setValue(PODetailDataStore.getAt(0).get('ordh_handling_sgstper'));

                                txtRefNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_refno'));
                                dtpRefDate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_refdate'),'d-m-Y'));

          

                                txtSupplierName.setValue(PODetailDataStore.getAt(0).get('cust_ref'));
                                cmbPurchaseLedger.setValue(PODetailDataStore.getAt(0).get('ordh_purledger'));
                                supcode = PODetailDataStore.getAt(0).get('ordh_sup_code');
                                suptype = PODetailDataStore.getAt(0).get('cust_taxtag')
				var RowCnt = PODetailDataStore.getCount();
				for (var i=0;i<RowCnt;i++)
				{

					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						areacode:PODetailDataStore.getAt(i).get('area_code'),
						areaname:PODetailDataStore.getAt(i).get('area_name'),
						itemcode:PODetailDataStore.getAt(i).get('ordt_item_code'),
						itemname:PODetailDataStore.getAt(i).get('itmh_name'),
						unitrate:PODetailDataStore.getAt(i).get('ordt_unit_rate'),
						qty     :PODetailDataStore.getAt(i).get('ordt_qty'),
						totvalue:PODetailDataStore.getAt(i).get('ordt_item_value'),
						recdqty :PODetailDataStore.getAt(i).get('ordt_rec_qty'),
						cancqty :PODetailDataStore.getAt(i).get('ordt_can_qty'),
		                                mois : PODetailDataStore.getAt(i).get('ordt_moisper'),
                                                fines :  PODetailDataStore.getAt(i).get('ordt_finesper'),
                                                sand  :  PODetailDataStore.getAt(i).get('ordt_sandper'),         			pendqty :PODetailDataStore.getAt(i).get('ordt_pen_qty'),

					}) 
					);

				}//For Loop

				dtpwefdate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_wef_date'),'d-m-Y'));
				txtCGST.setValue(PODetailDataStore.getAt(0).get('ordh_cgstper'));
				txtSGST.setValue(PODetailDataStore.getAt(0).get('ordh_sgstper'));
				txtIGST.setValue(PODetailDataStore.getAt(0).get('ordh_igstper'));
				txtIGST.setRawValue(PODetailDataStore.getAt(0).get('ordh_igstper'));

				txttcs.setValue(PODetailDataStore.getAt(0).get('ordh_tcs'));
				txtCessPMT.setValue(PODetailDataStore.getAt(0).get('ordh_cess_pmt'));	

				txtPaymtDays.setValue(PODetailDataStore.getAt(0).get('ordh_creditdays'));
				txtOrderTerms.setValue(PODetailDataStore.getAt(0).get('ordh_terms'));
				txtRemarks.setValue(PODetailDataStore.getAt(0).get('ordh_remarks'));	

				cmbPayMode.setValue(PODetailDataStore.getAt(0).get('ordh_paymode'));
				cmbDespatchThrough .setValue(PODetailDataStore.getAt(0).get('ordh_carriagetype'));

    tabPurchaseOrder.setActiveTab(1);
	                        txtGCVADB.setRawValue(PODetailDataStore.getAt(0).get('ordh_gcv_adb'));
				txtGCVADB_PM.setRawValue(PODetailDataStore.getAt(0).get('ordh_gcv_adbtol'));
	                        txtGCVARB.setRawValue(PODetailDataStore.getAt(0).get('ordh_gcv_arb'));
				txtGCVARB_PM.setRawValue(PODetailDataStore.getAt(0).get('ordh_gcv_arbtol'));
				txtTotMoisturePercentage.setValue(PODetailDataStore.getAt(0).get('ordh_total_mois'));
				txtTotMoisturePM.setValue(PODetailDataStore.getAt(0).get('ordh_mois_tol'));
				txtTotInhrMoisturePercentage.setValue(PODetailDataStore.getAt(0).get('ordh_inh_mois'));
				txtFixedCarbon.setValue(PODetailDataStore.getAt(0).get('ordh_fixed_carbon'));
				txtAshPercentage.setValue(PODetailDataStore.getAt(0).get('ordh_ash'));
				txtSulpherPercentage.setValue(PODetailDataStore.getAt(0).get('ordh_sulpher'));
				txtVolatileMatter.setValue(PODetailDataStore.getAt(0).get('ordh_vol_matter'));
				txtsize.setValue(PODetailDataStore.getAt(0).get('ordh_size'));
				txtVessal.setValue(PODetailDataStore.getAt(0).get('ordh_vessal'));

    tabPurchaseOrder.setActiveTab(0);

                        if (PODetailDataStore.getAt(0).get('ordh_roundneed') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else if (PODetailDataStore.getAt(0).get('ordh_roundneed') == "N")
                           Ext.getCmp("optRounding").setValue(2);


				grid_tot();
				CalculatePOValue();

				//flxDetail.getSelectionModel().clearSelections();
				
			     }
			     });//PODetailDataStore
			     }
			     });//PODetailDataStore



		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuPo.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : PODetailDataStore.getAt(0).get('ordh_purledger'),

		},
		callback:function()
		{

                  txtCGST.setRawValue('');
                  txtSGST.setRawValue('');
                  txtIGST.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';

 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();
                    if (cnt >0)
                    {
                          txtCGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGST.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');

                    } 
  
		}
	      });
		
grid_tot();
CalculatePOValue();
         flxDetail.getSelectionModel().clearSelections();
        }
    }
});

var dtpPodate = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    readOnly   : true,
    anchor     : '100%',
    labelStyle	: "font-size:12px;font-weight:bold;width:60;padding:0px 0px 0px 0px;",
    style      :"border-radius: 5px; ",
    
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
//		alert(days5); 
//                if((parseInt(days5)>100) || parseInt(days5)<1000){
                if((parseInt(days5)>100) ){

                    Ext.Msg.alert("Alert",'Invalid Date or Wrong Date');
                    dtpPodate.setRawValue(new Date().format('Y-m-d'));
                } 
              }
    }
});

var lblPartyname = new Ext.form.Label({
    fieldLabel  : 'Supplier Name',
    id          : 'lblPartyname',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;width:100;padding:0px 0px 0px 0px;",
    style      :"border-radius: 5px; ",
    
});

var itemcode;



function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	if ((selrow != null)){
		supcode = selrow.get('cust_code');
		suptype = selrow.get('cust_taxtag');
		txtSupplierName.setValue(selrow.get('cust_name'));
		flxLedger.hide();
   	        lblItem.show();
	        lblQty.show();
                txtRefNo.focus();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsFuPo.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                            //    gsttype : dngsttype,  

			},
		});





             

	}

}

   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 420,
        id : flxLedger,
        x: 250,
        y: 40,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_taxtag',sortable:true,width:50,align:'left'},

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
		url: 'ClsFuPo.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSupplierName.getRawValue(),
		},
        });
}




var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
	        lblItem.show();
	        lblQty.show();
                txtRefNo.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        lblItem.hide();
	        lblQty.hide();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    });


var icode,deptcode;
var cmbItemName = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 220,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItemName',
    typeAhead       : true,
    mode            : 'local',
    store           : ItemLoadDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtMois.focus();
             }
          },

        select:function(){

			ItemDetailsDataStore.load({
                        url: 'ClsFuPo.php',
                        params:
                            {
                                task:"itemdet",
                                itemcode: cmbItemName.getValue()
                            },
                            scope: this,
                            callback: function () 
				{
                                txtMois.setValue(ItemDetailsDataStore.getAt(0).get('itmh_moisture_ARB'));
                                txtFines.setValue(ItemDetailsDataStore.getAt(0).get('itmh_fines'));
                                txtSand.setValue(ItemDetailsDataStore.getAt(0).get('itmh_sand'));

                            }
                        });  
       			ItemRateDataStore.load({
	                url: 'ClsFuPo.php',
	                params:
	                    {
	                        task:"itemrate",
	                        itemcode: cmbItemName.getValue(),
				Vendorcode: supcode
	                    },
	                    scope: this,
	                    callback: function () 
				{
					if (ItemRateDataStore.getCount() > 0 ) {
	                        		txtRate.setRawValue(ItemRateDataStore.getAt(0).get('pitr_rate'));
	                        	}
				}
		                       
		        });
        }
    }
});

var txtPreparedBy = new Ext.form.TextField({
    fieldLabel  : 'Prepared By',
    id          : 'txtPreparedBy',
    width       : 200,
    name        : 'txtPreparedBy',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style       :{textTransform:"uppercase"},
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpDuedate.focus();
             }
          },
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});




var txtRefNo = new Ext.form.TextField({
    fieldLabel  : 'Ref.No',
    id          : 'txtRefNo',
    width       : 200,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'txtRefNo',
    enableKeyEvents: true,
    listeners:{
	     specialkey:function(f,e){
	     if (e.getKey() == e.ENTER)
	     {
		  dtpRefDate.focus();
	     }
	  }
     }
});


var dtpRefDate = new Ext.form.DateField({
    fieldLabel : 'Ref. Date',
    id         : 'dtpRefDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    anchor     : '100%',
    width : 100,
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


var txtAddr1 = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtAddr1',
    width       : 400,
    name        : 'addr1',
    readOnly:true,
    disabled:true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
});

var txtAddr2 = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtAddr2',
    width       : 400,
    name        : 'addr2',
    readOnly:true,
    disabled:true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
});

var txtItems = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtItems',
    width       : 400,
    name        : 'txtitems',
    readOnly:true,
    disabled:true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
});


var txtqono = new Ext.form.TextField({
    fieldLabel  : 'Qo No',
    id          : 'txtqono',
    width       : 80,
    name        : 'txtqono',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
});

var txtPONo = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtPONo',
    width       : 70,
    name        : 'txtPONo',
    readOnly:true,
    disabled : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
    
    listeners:{
    change:function(){
    }
    }
});

var txtQty = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtQty',
    width       : 60,
    name        : 'requiredqty',
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRate.focus();
             }
          },
        keyup:function(){
            
           // txtValue.setValue(parseFloat(txtQty.getValue()* txtRate.getValue()));  
	   
fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtQty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtQty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);

            porate=Ext.util.Format.number(txtRate.getValue(),"0.00"); 

        
        },
        keydown:function(){ 
       
            //txtValue.setValue(parseFloat(txtQty.getValue())* txtRate.getValue());
		fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtQty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtQty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
            txtTotValue.setValue(parseFloat(txtQty.getValue()*txtRate.getValue()));
            porate=Ext.util.Format.number(txtRate.getValue(),"0.00");


        },
       blur:function(){
        
           // txtValue.setValue(parseFloat(txtQty.getValue()*txtRate.getValue())); 
	 fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtQty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtQty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
            txtTotValue.setValue(parseFloat(txtQty.getValue()*txtRate.getValue()));
            porate=Ext.util.Format.number(txtRate.getValue(),"0.00");
//Ext.util.Format.number(Number(this.getValue()) * Number(itm_qty), '0.00');


        }      
    }
});

var txtMois = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtMois',
    width       : 50,
    name        : 'txtMois',
    readOnly    : false,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",       
    disabled:false,
    listeners   :{

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFines.focus();
             }
        },


        }
});

var txtFines = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtFines',
    width       : 50,
    name        : 'txtFines',
    readOnly    : false,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",       
    disabled:false,
    listeners   :{

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSand.focus();
             }
        },


        }

});


var txtSand = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtSand',
    width       : 50,
    name        : 'txtSand',
    readOnly    : false,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",       
    disabled:false,
    listeners   :{

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtQty.focus();
             }
        },


        }

});

var txtRate = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtRate',
    width       : 60,
    name        : 'txtRate',
    readOnly    : false,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",       
    disabled:false,
    listeners   :{

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  add_btn_click();
                  cmbArea.focus();
             }
        },

	keyup:function(){
          
            txtValue.setValue(parseFloat(txtQty.getValue()*txtRate.getValue()));
        },
	keydown:function(){
          
            txtValue.setValue(parseFloat(txtQty.getValue()*txtRate.getValue()));
        },
	blur:function(){
          
        }
    }

});

var txtValue = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtValue',
    width       : 80,
    name        : 'txtvalue',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    readOnly:true,
    listeners:{
    blur:function(){
		fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtQty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtQty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
    }
    }
});


var txtTotQty = new Ext.form.NumberField({
    fieldLabel  : 'Total Qty(t)',
    id          : 'txtTotQty',
    width       : 100,
    name        : 'txtTotQty',
    readOnly:true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
    listeners:{
    blur:function(){
    }
    }
});


var txtTotValue = new Ext.form.NumberField({
    fieldLabel  : 'Total Value',
    id          : 'txtTotValue',
    width       : 100,
    name        : 'txtTotValue',
    readOnly:true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
    listeners:{
    blur:function(){
    }
    }
});



var txtIGST = new Ext.form.NumberField({
    fieldLabel  : 'IGST %',
    id          : 'txtIGST',
    name        : 'txtIGST',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,   
    //disabled :true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
    listeners : {
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCessPMT.focus();
             }
       },
      change : function()
        {
          CalculatePOValue();
        },
        keyup : function()
        {
          CalculatePOValue();
        },
      blur : function()
        {
          CalculatePOValue();
        }
   }
});


var txttcs = new Ext.form.TextField({
    fieldLabel  : 'TCS %',
    id          : 'txttcs',
    name        : 'txttcs',
    width       : 60,//50,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,   
//    readOnly:false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",         
    listeners : {

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtHandlingPMT.focus();
             }
       },
      keyup : function()
	{


	}
   }
});

var txttcsval = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txttcsval',
    name        : 'txttcsval',
    width       : 80,//100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
    enableKeyEvents: true,
    allowBlank: true,   
    readOnly:true,     
    listeners : {
      change : function()
        {
	  
        }, 
        
      blur : function()
        {
            
        }
   }
});




var txtIGSTvalue = new Ext.form.NumberField({
    id          : 'txtIGSTvalue',
    name        : 'txtIGSTvalue',
    width       : 80,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,
//    disabled : true,
    readOnly: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
});

var txtSGST = new Ext.form.NumberField({
    fieldLabel  : 'SGST %',
    id          : 'txtSGST',
    name        : 'txtSGST',
     width       : 50,
    readOnly: false,        
    allowBlank: true,
//disabled :true,
    enableKeyEvents: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners : {
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtIGST.focus();
             }
       },
      change : function()
        {
          CalculatePOValue();
        },
        keyup : function()
        {
          CalculatePOValue();
        },
      blur : function()
        {
          CalculatePOValue();
        }
   }
});

var txtSGSTvalue = new Ext.form.NumberField({
    id          : 'txtSGSTvalue',
    name        : 'txtSGSTvalue',
     width       : 80,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,
    //disabled : true,
    readOnly : true,    
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
});



var txtCGST = new Ext.form.NumberField({
    fieldLabel  : 'CGST %',
    id          : 'txtCGST',
    name        : 'txtCGST',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
	//disabled :true,
    allowBlank: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners : {
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSGST.focus();
             }
       },
      change : function()
        {
          CalculatePOValue();
        },
        keyup : function()
        {
          CalculatePOValue();
        },
      blur : function()
        {
          CalculatePOValue();
        }
      }
});

var txtCGSTvalue = new Ext.form.NumberField({
    id          : 'txtCGSTvalue',
    name        : 'txtCGSTvalue',
    width       : 80,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,
//    disabled : true,
    readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
});

var txtCessPMT = new Ext.form.TextField({
    fieldLabel  : 'Comp.Cess/MT',
    id          : 'txtCessPMT',
    name        : 'txtCessPMT',
    width       : 60,
    enableKeyEvents: true,
    allowBlank: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners : {
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txttcs.focus();
             }
       },
      change : function()
        {
          CalculatePOValue();
        },
        keyup : function()
        {
          CalculatePOValue();
        },
      blur : function()
        {
          CalculatePOValue();
        }
}
});

var txtCessAmt = new Ext.form.NumberField({
    id          : 'txtCessAmt',
    name        : 'txtCessAmt',
    width       : 80,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,
    disabled : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
});

var checkdis='N';
var chkdiscount = new Ext.form.Checkbox({
name    : 'wtax',
boxLabel: 'With.Tax',
fieldLabel: '',
id      : 'chkdiscount',
checked : false,
width   : 80,
 listeners:{
        check:function(rb,checked){           
           if(checked===true){
             checkdis = "Y";
             txtIGST.setValue('0');
             txtIGSTvalue.setValue('0');
             txtSGST.setValue('0');
             txtSGSTvalue.setValue('0');
             txtCGST.setValue('0');
             txtCGSTvalue.setValue('0');


             txtTotValue.setValue('0');
           }
           else
            {
             checkdis = "N";
             txtIGST.setValue('0');
             txtIGSTvalue.setValue('0');
             txtSGST.setValue('0');
             txtSGSTvalue.setValue('0');
             txtCGST.setValue('0');
             txtCGSTvalue.setValue('0');
             txtTotValue.setValue('0');
            }            
        }
       }
});

function add_btn_click()
{


	    var gstadd="true";
	
	if(supcode==0) 
	{
                Ext.MessageBox.alert("Fuel-PO", "Select Supplier..");  	
	}            
	else if(cmbItemName.getValue()==0 || cmbItemName.getRawValue()=="")
	{
                Ext.MessageBox.alert("Fuel-PO", "Select Item..");  
                 gstadd="false";
        }
	/*else if(txtqono.getValue() == '')
	{
                Ext.MessageBox.alert("Fuel-PO", "Enter QoNo..");
                 gstadd="false";
        }*/
	else if((txtQty.getValue() == '') || (txtQty.getValue() == 0))
	    {
                Ext.MessageBox.alert("Fuel-PO", "Po Qty Should not be Zero..");
                 gstadd="false";
                 txtQty.focus()

            }
	else if(txtRate.getValue()==0)
	{
                Ext.MessageBox.alert("Fuel-PO", "Enter Rate..");
                gstadd="false";
                 txtRate.focus()
        }  

            if(gstadd=="true")
            {
		
                var ginitemseq = cmbItemName.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
     //               if (sel[i].data.itemseq === cmbItemName.getValue())
//		    {
  //                      cnt = cnt + 1;
//                    }
                }
	        if(gridedit === "true")
		{
	//			var itemseq = cmbItemName.getValue();
	//			Ext.getCmp('cmbItemName').setDisabled(false);
				var idx = flxDetail.getStore().indexOf(editrow);
				sel[idx].set('itemcode', cmbItemName.getValue());
				sel[idx].set('itemname', cmbItemName.getRawValue());
				sel[idx].set('areacode', cmbArea.getValue());
				sel[idx].set('areaname', cmbArea.getRawValue());

				sel[idx].set('reqqty', txtQty.getRawValue());
				sel[idx].set('mois', txtMois.getRawValue());
				sel[idx].set('fines', txtFines.getRawValue());
				sel[idx].set('sand', txtSand.getRawValue());

                           	sel[idx].set('qty', txtQty.getRawValue());
				sel[idx].set('unitrate', txtRate.getRawValue());
				sel[idx].set('totvalue', parseFloat(txtRate.getRawValue()*txtQty.getRawValue()));


                }
                else      
                
		if (cnt > 0)
		{
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {
                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            slno:RowCnt,
                            areaname:cmbArea.getRawValue(),
                            areacode:cmbArea.getValue(),
                            itemname:cmbItemName.getRawValue(),
                            itemcode:cmbItemName.getValue(),
		            mois : txtMois.getRawValue(),
		            fines :  txtFines.getRawValue(),
			    sand  :  txtSand.getRawValue(),

                            qty:txtQty.getRawValue(),
                            unitrate:txtRate.getRawValue(),
                            totvalue:parseFloat(txtRate.getRawValue()*txtQty.getRawValue()),

	           


                        }) 
                        );
                            grid_tot();
                            CalculatePOValue();
                            txtQty.setValue("");
                            txtRate.setValue("");
                            txtValue.setValue("");
//GeneralCalTax();
                }
                         grid_tot();
                            CalculatePOValue();
                            txtQty.setValue("");
                            txtRate.setValue("");
                            txtValue.setValue("");
                
            }
}


var btnSubmit = new Ext.Button({
    //style   : 'text-align:center;border-radius: 50%;     background-color:red;     border: 1px solid #000;  ',//border-radius: 50%;border: 1px solid #000;
    text    : "SUBMIT",
    width   : 80,
    height  : 25,
    x       : 860,
    y       : 10,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    //html:'<span class="bigBtn">Damn you hayate</span>',
    //border : true,
//bodyStyle:{"background-color":"#FEDDFF;"},

    listeners:{
        click: function(){              

               add_btn_click();
              cmbArea.focus();
        }
    }
});

var txtTotIGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.IGST',
    id          : 'txtTotIGST',
    name        : 'txtTotIGST',
    width       : 100,
    readOnly: true,
    allowBlank: true,
   
    });
    
var txtTotSGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.SGST',
    id          : 'txtTotSGST',
    name        : 'txtTotSGST',
     width       : 100,
    readOnly: true,        
    allowBlank: true
});

var txtTotCGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.CGST',
    id          : 'txtTotCGST',
    name        : 'txtTotCGST',
    width       : 100,
    readOnly: true,
    allowBlank: true
});

var txtGrossval = new Ext.form.NumberField({
    fieldLabel  : 'Gross Val',
    id          : 'txtGrossval',
    name        : 'txtGrossval',
    width       : 90,
    //readOnly: true,
    allowBlank: true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners : {
        change:function()
        {


        },
    }


});

var txtPOValue = new Ext.form.NumberField({
    fieldLabel  : 'Purchase Order Value',
    id          : 'txtPOValue',
    name        : 'txtPOValue',
    width       : 100,
    readOnly: true,
    allowBlank: true,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
    style      :"border-radius: 5px; ",     
});

var lblGrandtotal = new Ext.form.Label({
    fieldLabel  : 'Grd Tot',
    id          : 'lblGrandtotal',
    width       : 90,
    style:{
         color: 'Red' ,
         backgroundColor:'White'
    }
});

var txtTotDiscount = new Ext.form.NumberField({
    fieldLabel  : 'Tot Dis%',
    id          : 'txtTotDiscount',
    width       : 40,
    name        : 'totdiscount',
    maxLength   : 5,
    maxValue    : 90,
    minValue    : 0,
    readOnly    : true,
    enableKeyEvents: true,	
    listeners : {
        change:function()
        {

        },
        blur:function()
        {
            if(txtDiscount.getRawValue()===""){
                    txtDiscount.setRawValue("0");
            }
        }
    }
});

var txtTotDiscountval = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtTotDiscountval',
    width       : 80,
    name        : 'totdiscountvalue',
    readOnly    : true,
    enableKeyEvents: true,
    listeners : {
        change : function()
        {
            
        },
        keyup : function(){
        }
    }
});



var dtpDuedate = new Ext.form.DateField({
    fieldLabel : 'Due Date',
    id         : 'dtpDuedate',
    name       : 'date',
    format     : 'd-m-Y',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    listeners:{
            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                //txtPaymtDays.setValue(diffDays);
            }
    }
});

var dtpwefdate = new Ext.form.DateField({
    fieldLabel : 'W.E.F Date',
    id         : 'dtpwefdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
//    anchor     : '100%',
    width : 100,
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPreparedBy.focus();
             }
       },

            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                //txtPaymtDays.setValue(diffDays);
            }
    }
});

var txtOrderTerms = new Ext.form.TextField({
    fieldLabel  : 'Terms of Delivery',
    id          : 'txtOrderTerms',        
    width       : 200,
    name        : 'txtOrderTerms',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRemarks.focus();
             }
       },

       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtPaymtDays = new Ext.form.TextField({
    fieldLabel  : 'Payment Terms',
    id          : 'txtPaymtDays',
    width       : 50,
    name        : 'scheduledays',
    style      :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbDespatchThrough .focus();
             }
       },

       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtservicechrg = new Ext.form.TextField({
    fieldLabel  : 'Service Charges/MT',
    id          : 'txtservicechrg',
    width       : 50,
    name        : 'scheduledays',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
CalculatePOValue();
//GeneralCalTax();
         }
    }
});

var txtHandlingPMT = new Ext.form.TextField({
    fieldLabel  : 'Handling Charges/MT',
    id          : 'txtservicechrg',
    width       : 50,
    name        : 'scheduledays',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtHandlingcgst.focus();
             }
       },

       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
CalculatePOValue();
//GeneralCalTax();
         }
    }
});


var txtroundoff = new Ext.form.NumberField({
    fieldLabel  : 'Rounding',
    id          : 'txtroundoff',
    width       : 50,
    name        : 'txtroundoff',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{


    }
});


var txtLoadingMT = new Ext.form.TextField({
    fieldLabel  : 'Loading Charges /MT',
    id          : 'txtLoadingMT',
    width       : 90,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    
    listeners:{
       change: function(){
	
               
CalculatePOValue();
//GeneralCalTax();
txtHandingAmount.setValue(handlingval2);
         }
    }
});

var txtHandlingcgst = new Ext.form.TextField({
    fieldLabel  : 'Handling CGST %  ',
    id          : 'txtHandlingcgst',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    enableKeyEvents: true,
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtHandlingsgst.focus();
             }
       },


       Keyup: function(){
	
               
CalculatePOValue();
//GeneralCalTax();

         }
    }
});

var txtHandlingsgst = new Ext.form.TextField({
    fieldLabel  : 'Handling SGST % ',
    id          : 'txtHandlingsgst',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
   enableKeyEvents: true,
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPayMode.focus();
             }
       },

       keyup: function(){
              
              CalculatePOValue();

         }
    }
});

var txtHandlingcgstval = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtHandlingcgstval',
    width       : 80,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
       readOnly: true,
    listeners:{
       change: function(){
         }
    }
});

var txtHandlingsgstval = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtHandlingsgstval',
    width       : 80,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
       readOnly: true,
    listeners:{
       change: function(){
	
               
CalculatePOValue();
//GeneralCalTax();

         }
    }
});

var txtHandingAmount = new Ext.form.TextField({
    fieldLabel  : 'Handling Expenses',
    id          : 'txtHandingAmount',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    readOnly    : true,
    style      :"border-radius: 5px; ", 
    listeners:{
       change: function(){
               
         }
    }
});

var txtLoadingamt = new Ext.form.TextField({
    fieldLabel  : 'Loading Expenses',
    id          : 'txtLoadingamt',
    width       : 80,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    listeners:{
       change: function(){
               
CalculatePOValue();
//GeneralCalTax();
         }
    }
});

var cmbHandling = new Ext.form.ComboBox({
    fieldLabel      : 'Loading Party',
    width           : 260,
    displayField    : 'cust_ref',
    valueField      : 'cust_code',
    hiddenName      : '',
    id              : 'cmbHandling',
    typeAhead       : true,
    store           : VendorthrdDataStore,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : true,
    allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
        
    }
});

var txtRemarks = new Ext.form.TextArea({
    fieldLabel  : 'Remarks',
    id          : 'txtRemarks',
    width       : 200,
    height      : 50,
    name        : 'remarks',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
     
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpwefdate.focus();
             }
       },

 	
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});



var txtFreight = new Ext.form.TextField({
    fieldLabel  : 'Freight',
    id          : 'txtFreight',
    width       : 250,
    name        : 'freight',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    style       :{textTransform:"uppercase"},
    listeners:{
    blur:function(){
          /*  logoDataStore.load({
                url: 'ClsFuPo.php',
                params: {
                    task: 'cmbPayMode'
                }
            });*/
    },
    change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtGCVADB = new Ext.form.NumberField({
    fieldLabel  : 'GCV (ADB) - Kcal/kg',
    id          : 'txtGCVADB',
    width       : 80,
    name        : 'txtGCVADB',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var txtGCVARB = new Ext.form.NumberField({
    fieldLabel  : 'GCV (ARB) - Kcal/kg',
    id          : 'txtGCVARB',
    width       : 80,
    name        : 'txtGCVARB',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var txtGCVARB_PM = new Ext.form.TextField({
    fieldLabel  : ' + / - ',
    id          : 'txtGCVARB_PM',
    width       : 60,
    name        : 'txtGCVARB_PM',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var txtGCVADB_PM = new Ext.form.TextField({
    fieldLabel  : ' + / - ',
    id          : 'txtGCVADB_PM',
    width       : 60,
    name        : 'txtGCVADB_PM',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});




var txtTotMoisturePercentage = new Ext.form.TextField({
  //  fieldLabel  : 'Total Moisture % &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(ARB)',
    fieldLabel  : 'Total Moisture (ARB) % ',
    id          : 'txtTotMoisturePercentage',
    width       : 80,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
var txtTotMoisturePM = new Ext.form.TextField({
    fieldLabel  : ' + / - ',
    id          : 'txtTotMoisturePM',
    width       : 60,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
var txtTotInhrMoisturePercentage = new Ext.form.TextField({
    //fieldLabel  : 'Inherent Mositure % &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; (ADB)',
    fieldLabel  : 'Inherent Mositure (ADB) %',
    id          : 'txtTotInhrMoisturePercentage',
    width       : 80,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtAshPercentage = new Ext.form.TextField({
    fieldLabel  : 'Ash (ADB)%',
    id          : 'txtAshPercentage',
    width       : 100,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtSulpherPercentage = new Ext.form.TextField({
    fieldLabel  : 'Sulpher (ADB) %',
    id          : 'txtSulpherPercentage',
    width       : 80,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
var txtVolatileMatter = new Ext.form.TextField({
    fieldLabel  : ' Volatile Matter (ADB)%',
    id          : 'txtVolatileMatter',
    width       : 80,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtFixedCarbon = new Ext.form.TextField({
    fieldLabel  : ' Fixed Carbon (ADB)%',
    id          : 'txtFixedCarbon',
    width       : 150,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var txtsize = new Ext.form.TextField({
    fieldLabel  : 'Size',
    id          : 'txtsize',
    width       : 150,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
var txtVessal = new Ext.form.TextField({
    fieldLabel  : 'Vessal ',
    id          : 'txtVessal',
    width       : 300,
    name        : '',
    style       :{textTransform:"uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
/*var txtTCSP = new Ext.form.TextField({
    fieldLabel  : 'TCS % ',
    id          : 'txtTCSP',
    width       : 150,
    name        : '',
    style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
var txtTCS = new Ext.form.TextField({
    fieldLabel  : '  ',
    id          : 'txtTCS',
    width       : 80,
    name        : '',
    style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});*/

   var lblSize = new Ext.form.Label({
        fieldLabel: 'mm',
        id: 'lblSize',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",         
        width: 20
    });

var cmbPayMode = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Mode',
    width           : 200,
    displayField    : 'term_name',
    valueField      : 'term_code',
    hiddenName      : 'term_code',
    store           : PaymentmodeDataStore,
    id              : 'cmbPayMode',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
        labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
   enableKeyEvents: true,
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPaymtDays.focus();
             }
       },
    }   



});  

var cmbDespatchThrough  = new Ext.form.ComboBox({
    fieldLabel      : 'Desp.Through',
    width           : 200,
    displayField    : 'carr_name',
    valueField      : 'carr_code',
    hiddenName      : 'carr_code',
    store           : CarriageDataStore,
    id              : 'cmbDespatchThrough ',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",   
   enableKeyEvents: true,
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOrderTerms.focus();
             }
       },
    } 
  
});



var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:50,
    height: 110,
    hidden:false,
    width: 920,
    columns:
    [
        {header: "S.No.", dataIndex: 'slno',sortable:true,width:50,align:'left'},
        {header: "Area Name", dataIndex: 'areaname',sortable:true,width:170,align:'left'},
        {header: "Area code", dataIndex: 'areacode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:200,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Mois%", dataIndex: 'mois',sortable:true,width:75,align:'left'},
        {header: "Fines%", dataIndex: 'fines',sortable:true,width:75,align:'left'},
        {header: "Sand%", dataIndex: 'sand',sortable:true,width:75,align:'left'},
        {header: "Qty(t)", dataIndex: 'qty',sortable:true,width:80,align:'left'},
        {header: "Rate(t)", dataIndex: 'unitrate',sortable:true,width:90,align:'left'},
        {header: "Tot Value", dataIndex:'totvalue',sortable:true,width:100,align:'left'},


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

				gridedit = "true";
				editrow = selrow;

				cmbArea.setRawValue(selrow.get('areaname'));
				cmbArea.setValue(selrow.get('areacode'));

				cmbItemName.setValue(selrow.get('itemcode'));
				cmbItemName.setRawValue(selrow.get('itemname'));

				txtMois.setValue(selrow.get('mois'));
				txtFines.setValue(selrow.get('fines'));
				txtSand.setValue(selrow.get('sand'));
				txtQty.setValue(selrow.get('qty'));
				txtRate.setValue(selrow.get('unitrate'));
				txtValue.setValue(selrow.get('totvalue'));


				flxDetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
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


var tabPurchaseOrder = new Ext.TabPanel({
    id          : 'PurchaseOrder',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ffe6ff"},
    activeTab   : 0,
    height      : 670,
    width       : 1340,
    x           : 2,
    y           : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    items       : [
        {
            xtype: 'panel',
            title: 'Po-Preparation',bodyStyle:{"background-color":"#ffe6ff"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : 'TOBE REMOVED',
                    id          : 'remove',
                    width       : 10,
                    height      : 5,
                    x           : 1560,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
 


		        {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 920,
		            height      : 60,
		            x           : 45,
		            y           : 275,
		            border      : true,
		            layout      : 'absolute',
		            items: [			     
		 			{
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 130,
				            width       : 250,
				            x           : 0,
				            y           : 0,
				            defaultType : 'textfield',
				            border      : false,
				            items: [txtLoadingMT]
				        }, 		
		 			{
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 90,
				            width       : 390,
				            x           : 250,
				            y           : 0,
				            defaultType : 'textfield',
				            border      : false,
				            items: [cmbHandling]
				        },                        	          
		 			{
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 115,
				            width       : 230,
				            x           : 650,
				            y           : 0,
				            defaultType : 'textfield',
				            border      : false,
				            items: [txtLoadingamt]
				        },
			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 65,
                            width       : 250,
                            x           : 470,
                            y           : 350,
                            border      : false,
                            items: [txtGrossval] 
                        },
/*
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 230,
                            x           : 650,
                            y           : 350,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttaxablevalue]
                        },  
*/
				]
			},
                           ]
                },   

                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 350,
                    height      : 403,
                    x           : 970,
                    y           : 10,
                    border      : true,
                    layout      : 'absolute',
                    items: [ 
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : -10,
                            y           : 10,
                            border      : false,
                            items: [cmbPayMode]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 190,
                            x           : -10,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtPaymtDays]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : -10,
                            y           : 90,
                            border      : false,
                            items: [cmbDespatchThrough]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : -10,
                            y           : 140,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtOrderTerms]
                        },


                       
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 450,
                            x           : -10,
                            y           : 180,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRemarks]
                        },


{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : -10,
                            y           : 240,
                            border      : false,
                            items: [dtpwefdate]
                        },

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : -10,
                            y           : 270,
                            border      : false,
                            items: [txtPreparedBy]
                        },






                    ]
                },


                {
                    xtype       : 'fieldset',
                    title       : 'Item Detail',
                    width       : 955,
                    height      : 410,
                    x           : 10,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [



                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblArea]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 250,
                            x           : -10,
                            y           : 10,
                            border      :false,
                            items: [cmbArea]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 215,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItem]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 290,
                            x           : 180,
                            y           : 10,
                            border      : false,
                            items: [cmbItemName]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 425,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMois]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 125,
                            x           : 420,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtMois]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 485,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblFines]
                        },



                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 125,
                            x           : 480,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtFines]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 545,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSand]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 125,
                            x           : 540,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSand]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 100,
                            x           : 610,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 125,
                            x           : 600,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtQty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 690,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 35,
                            width       : 145,
                            x           : 640,
                            y           : 10,
                            border      : false,
                            items: [txtRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 770,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 750,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtValue]
                        },  flxDetail, btnSubmit,

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 380,
                            x           : 10,
                            y           : 160,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 380,
                            x           : 10,
                            y           : 190,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotValue]
                        },



  
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 180,
                            x           : 10,
                            y           : 220,
                            border      : false,
                            items: [txtCGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 180,
                            y           : 220,
                            border      : false,
                            items: [txtCGSTvalue] 
                        },
			{			
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 180,
                            x           : 10,
                            y           : 250,
                            border      : false,
                            items: [txtSGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 180,
                            y           : 250,
                            border      : false,
                            items: [txtSGSTvalue] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 180,
                            x           : 10,
                            y           : 280,
                            border      : false,
                            items: [txtIGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 180,
                            y           : 280,
                            border      : false,
                            items: [txtIGSTvalue] 
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 220,
                            x           : 10,
                            y           : 310,
                            border      : false,
                            items:[txtCessPMT]
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 180,
                            y           : 310,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtCessAmt]
                        },


		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 220,
                            x           : 10,
                            y           : 340,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttcs]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 180,
                            y           : 340,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttcsval]
			}, 


                                                                  
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 250,
                            x           : 380,
                            y           : 160,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtHandlingPMT]
                        },  
        


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 350,
                            x           : 380,
                            y           : 190,
                            border      : false,
                            items: [txtHandingAmount] 
                        }, 


 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 250,
                            x           : 380,
                            y           : 220,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtHandlingcgst]
                        },
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 600,
                            y           : 220,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtHandlingcgstval]
                        },
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 250,
                            x           : 380,
                            y           : 250,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtHandlingsgst]
                        },
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 600,
                            y           : 250,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtHandlingsgstval]
                        },                                                                                                

 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 400,
                            x           : 380,
                            y           : 280,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtroundoff]
                        },
                       
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 200,
                            width       : 500,
                            x           : 380,
                            y           : 340,
                            border      : false,
                            items: [txtPOValue] 
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 200,
                            width       : 500,
                            x           : 720,
                            y           : 200,
                            border      : false,
                            items: [optRounding] 
                        },


                    ]
                }
            ]
        },

       
	{
		    xtype: 'panel',
		    title: 'Specifications & Others ',bodyStyle:{"background-color":"#ffe6ff"},
		    layout: 'absolute',
		    items: [

		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 430,
                            x           : 50,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotMoisturePercentage]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 400,
                            x           : 340,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotMoisturePM]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 40,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotInhrMoisturePercentage]
			},


		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 70,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtVolatileMatter]
			},

		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 100,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtFixedCarbon]
			},

		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 130,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSulpherPercentage]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 160,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtGCVADB]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 400,
                            x           : 340,
                            y           : 160,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtGCVADB_PM]
			},



		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 190,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtGCVARB]
			},
		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 400,
                            x           : 340,
                            y           : 190,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtGCVARB_PM]
			},



		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 220,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtAshPercentage]
			},


		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 600,
                            x           : 50,
                            y           : 250,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtVessal]
			},

		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 190,
                            width       : 530,
                            x           : 50,
                            y           : 280,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtsize]
			},



			]
	}
    ]
});

function save_click()
{
    var gstSave;
    gstSave="true";
    if (txtOrderTerms.getRawValue()==0 || txtOrderTerms.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Enter Order Terms.....');
        gstSave="false";
    }
    else if(flxDetail.getStore().getCount()==0)
    {
	Ext.MessageBox.alert("Fuel-PO", "Item details not fill");
	gstSave="false";
    } 

    else if (txtPaymtDays.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Enter Credit Days..');
        gstSave="false";
    }
    

    else if (cmbPayMode.getValue()==0 || cmbPayMode.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Select Payment Mode..');
        gstSave="false";
    }

    else if (cmbPurchaseLedger.getValue()==0 || cmbPurchaseLedger.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Select Purchase Group..');
        gstSave="false";
    }
    else if (cmbDespatchThrough .getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Select Carriage..');
        gstSave="false";
    }
    else if (txtPreparedBy.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-PO','Enter PO Prepared By..');
        txtPreparedBy.focus();
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

           
            var poData = flxDetail.getStore().getRange();                                        
            var poupdData = new Array();
            Ext.each(poData, function (record) {
                poupdData.push(record.data);
            });


            Ext.Ajax.request({
            url: 'TrnFuPOPreparationSave.php',
            params :
             {
                savetype                : gstFlag,
             	griddet		: Ext.util.JSON.encode(poupdData),                                      
                po_company_code		: Gincompcode,
		po_finid		: GinFinid,
		cnt			: poData.length,
		po_vendor_code 		: supcode,
                po_no                   : txtPONo.getValue(),
                po_seqno                : poseqno,
                po_date 		: Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                porefno  		: txtRefNo.getValue(),
                porefdate   		: Ext.util.Format.date(dtpRefDate.getValue(),"Y-m-d"),

                orderterms 		: txtOrderTerms.getRawValue(),
		po_transport_mode 	: cmbDespatchThrough.getValue(),
		po_paymode 		: cmbPayMode.getValue(),
		creditdays 		: txtPaymtDays.getRawValue(),

		remarks			: txtRemarks.getRawValue(),

		cgstper 		: txtCGST.getRawValue(),
		sgstper 		: txtSGST.getRawValue(),
		igstper 		: txtIGST.getRawValue(),


		itemval 		: txtTotValue.getRawValue(),
		roundoff 		: 0,
		totval 		        : txtPOValue.getRawValue(),
		userid   		: GinUserid,
		entrydate 		: Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"),
		wefdate 		: Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"),
                handlingmt		: txtHandlingPMT.getValue(),
                handlingcgst		: txtHandlingcgst.getValue(),
                handlingsgst		: txtHandlingsgst.getValue(),
                                              
		handlingamt		: txtHandingAmount.getValue(),


                gcvadb 			: txtGCVADB.getRawValue(),
		gcvadb_tot 	        : txtGCVADB_PM.getRawValue(),
                gcvarb 			: txtGCVARB.getRawValue(),
		gcvarb_tot 	        : txtGCVARB_PM.getRawValue(),

		moispercentage		: txtTotMoisturePercentage.getRawValue(),
		moistolarance 		: txtTotMoisturePM.getRawValue(),
		inh_mois 		: txtTotInhrMoisturePercentage.getRawValue(),
                fixedcarbon             : txtFixedCarbon.getRawValue(), 
		ash 			: txtAshPercentage.getRawValue(),
		tcsp 			: txttcs.getRawValue(),
		sulpher 		: txtSulpherPercentage.getRawValue(),
		volmatr 		: txtVolatileMatter.getRawValue(),
		fusize 			: txtsize.getRawValue(),
		vessal 			: txtVessal.getRawValue(),
		cessmt 			: txtCessPMT.getRawValue(),
                indpreparedby           : txtPreparedBy.getRawValue(),
		purledger       	: cmbPurchaseLedger.getValue(),
                roundneed               : roundoff,
           	poroundoff              : txtroundoff.getValue(),

		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
	
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono']);
                    TrnPoFormPanel.getForm().reset();
                    flxDetail.getStore().removeAll();
//		    flxdeldetail.getStore().removeAll();
                    RefreshData();
                  }else
			{
Ext.MessageBox.alert("Purchase Order Not Completed! Pls Check!- " + obj['pono']);                                                  
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
        Ext.getCmp('cmbPONo').setVisible(true);
        gstFlag = "Edit";
	PONoListDataStore.load({
		url: 'ClsFuPo.php',
		params: {
		    task: 'loadPONoList',
		    compcode: Gincompcode,
		    finid: GinFinid,
		}
	});

}

var TrnPoFormPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'FUEL PURCHASE ORDER',
    header      : false,
    width       : 827,
    height      : 510,bodyStyle:{"background-color":"#D1D0CE"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnPoFormPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 35,
        fontSize:12,
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
                }
            }
        },'-',
        {
//edit
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                     edit_click();

                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 25,
            fontSize:14,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                    save_click();
                }
            }
        },'-',
        {
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 25,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 25,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {
		  
			 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&finid=" + encodeURIComponent(GinFinid);
				var p3 = "&ordno=" + encodeURIComponent(cmbPONo.getRawValue());
				var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelPurchaseOrder.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelPurchaseOrder.rptdesign' + param); 


                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 25,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnPoWindow.hide();
                }
            }
        }]
    },
    items: [ 
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 15,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPodate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 15,
                            y           : 70,
                            labelWidth  : 1,
                            border      : false,
                            items : [dtpPodate]
                        },
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 15,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 200,
                            x           : 15,
                            y           : 15,
                            labelWidth  : 1,
                            border      : false,
                            items : [txtPONo]
                        },   
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 200,
                            x           : 15,
                            y           : 15,
                            labelWidth  : 1,
                            border      : false,
                            items : [cmbPONo]
                        },                      
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 200,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPartyname]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 450,
                            x           : 130,
                            y           : 15,
                            border      : false,
                            items: [txtSupplierName]
                        },
                 


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 350,
                            x           : 650,
                            y           : 20,
                            border      : false,
                            items: [txtRefNo]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 200,
                            x           : 650,
                            y           : 45,
                            labelWidth  : 70,
                            border      : false,
                            items : [dtpRefDate]
                        },


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 350,
                            x           : 940,
                            y           : 45,
                            border      : false,
                            items: [cmbPurchaseLedger]
                        },







                    
    tabPurchaseOrder ,
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 450,
                            x           : 130,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [flxLedger]
                        }]
});

function RefreshData(){
    gstFlag = "Add";
     poseqno = 0;  
       Ext.getCmp('cmbPONo').setVisible(false);
            txtPreparedBy.setRawValue(GinUser);
    dateval=new Date();
   // txtIGST.hide();
  //  txtIGSTvalue.hide();
    txtSGST.show();
    txtSGSTvalue.show();
    txtCGST.show();
    txtCGSTvalue.show();
    
  //  txtIGST.setValue('0');
 //   txtIGSTvalue.setValue('0');
    txtSGST.setValue('0');
    txtSGSTvalue.setValue('0');
    txtCGST.setValue('0');
    txtCGSTvalue.setValue('0');
    
            duedateval=new Date();
            VendorDataStore.load({
                url: 'ClsFuPo.php',
                params: {
                    task: 'loadsupplier'
                }
            });


            PONoDataStore.removeAll();
            PONoDataStore.load({
		url: 'ClsFuPo.php',
		params: {
		task: 'LoadPONo',
		compcode: Gincompcode,
		finid: GinFinid
		},
		callback : function(){
		txtPONo.setValue(PONoDataStore.getAt(0).get('ordh_no'));
		}
            });	


	    CarriageDataStore.load({
                url: 'ClsFuPo.php',
                params: {
                    task: 'loadcarrtype'
                },

		callback : function(){
		  cmbDespatchThrough.setValue(1);
		}

            });


	    PaymentmodeDataStore.load({
                url: 'ClsFuPo.php',
                params: {
                    task: 'loadpaymode'
                },

		callback : function(){
		  cmbPayMode.setValue(7);
		}

            });

            txtTotMoisturePercentage.setValue('30');
            txtTotMoisturePM.setValue('2');
            txtTotInhrMoisturePercentage.setValue('14 to 15%');
            txtVolatileMatter.setValue('39-41%');
            txtFixedCarbon.setValue('by Calculation');
            txtSulpherPercentage.setValue('< 0.6%');
            txtGCVADB.setValue('5600');
            txtGCVADB_PM.setValue('100');
            txtGCVARB.setValue('4500');
            txtGCVARB_PM.setValue('100');  
            txtAshPercentage.setValue('4-5% Max');  
            txtsize.setValue('(0.50mm) 90% Min');





	    txtPaymtDays.setValue(30);
            cmbPayMode.setValue(7);
            txtOrderTerms.setRawValue('');
    	    cmbDespatchThrough.setValue(1);
            flxLedger.hide();
            txtPreparedBy.setRawValue(GinUser);

           
}

var dateval,duedateval;
var TrnPoWindow = new Ext.Window({
    height      : 610,
    width       : 1350,
//    x		: 10,
    y           : 30,
    title       : 'FUEL PURCHASE ORDER',
    items       : TrnPoFormPanel,bodyStyle:{"background-color":"#D1D0CE"},
    layout      : 'fit',
    closable    : true,
    minimizable : true,
    maximizable : true,
    //maximized:true,
    resizable   : false,
    border      : false,
    draggable   : false,
    listeners:
    {
        show:function(){
             RefreshData();





                   }
    }
});
TrnPoWindow.show();
});




