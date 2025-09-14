Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstFlag;
   var fbo_flg,porate;
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var GinUser = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');


   var itemhsncode;
   var potype='B';
   var editrow = 0;
   var supplierid = 78;
   var gstadd ="true";
   var dept;
   var servchrgval = 0;
   var gstFlag = "Add";
   var servchval = 0;
   var poseqno  = 0;
   var gridedit = "false";
   var gridedit2 = "false";

   var supcode = 0;
   var printtype = "PDF";
   var itemcode = 0;
   var areacode = 0;

   var porows = 0;  
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

function grid_tot(){
	fdbl_totalvalue=0;
        var totqty = 0;
        var grossval = 0;
        var cgst = 0;
        var sgst = 0;
        var igst = 0;
        var netval = 0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+sel[i].data.value;
            totqty = totqty + Number(sel[i].data.qty);
            grossval =  grossval + Number(sel[i].data.value);               
        }

        txtTotQty.setValue(totqty);  
        txtGrossvalue.setValue(grossval);
        CalculatePOValue();
}


function CalculatePOValue()
{
        var subtotal1 = 0;
        var tcsamt = 0;

        cgst= Number(txtCGST.getValue())* txtGrossvalue.getValue()/100;
        sgst= Number(txtSGST.getValue())* txtGrossvalue.getValue()/100;
        igst= Number(txtIGST.getValue())* txtGrossvalue.getValue()/100;

	txtCGSTvalue.setValue(cgst);
        txtSGSTvalue.setValue(sgst);
	txtIGSTvalue.setValue(igst);


        subtotal1 = (Number(txtCGSTvalue.getValue())+Number(txtSGSTvalue.getValue())+Number(txtIGSTvalue.getValue()) + Number(txtGrossvalue.getValue()));

        txttcsval.setValue(Math.round(subtotal1 * Number(txttcs.getValue() / 100)));
        txtPOValue.setValue(subtotal1+Number(txttcsval.getValue()));




}


var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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



 var loadPurchaseOrderPartyListDatastore = new Ext.data.Store({
      id: 'loadPurchaseOrderPartyListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPOPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'sup_code', 'sup_name','sup_type' 
      ]),
    });



var loadareadatastore = new Ext.data.Store({
      id: 'loadareadatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
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


var PONoListDataStore = new Ext.data.Store({
  id: 'PONoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPartyPONOlist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_no','ordh_seqno'
  ])
});




var LoadAmendmentSeqNoDataStore = new Ext.data.Store({
  id: 'LoadAmendmentSeqNoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPOAmdNo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['amnh_seqno','amnh_amnddate'
  ])
});




var TaxDataStore = new Ext.data.Store({
  id: 'TaxDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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

var PaymentmodeDataStore = new Ext.data.Store({
  id: 'PaymentmodeDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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
            url: 'ClsPo.php',      // File to connect to
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
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "itemdet"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itmh_moisture_per'])
});



var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
 autoLoad :true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadItem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'itmh_code','itmh_name'
  ])
});

var PONoDataStore = new Ext.data.Store({
  id: 'PONoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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
var lblPono = new Ext.form.Label({
    fieldLabel  : 'PO No',
    id          : 'lblPono',
    width       : 60,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
});
var lblPodate = new Ext.form.Label({
    fieldLabel  : 'PO Date',
    id          : 'lblPodate',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});

var dtpPodate = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly   : true,
    anchor     : '100%',
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPONo.focus();
             }
       },
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
		//alert(days5); 
              /*  if((parseInt(days5)>1) || parseInt(days5)<1){
                    Ext.Msg.alert("Alert",'Invalid Date or Wrong Date');
                    dtpPodate.setRawValue(new Date().format('Y-m-d'));
                }*/ //Hold for Testing Jackuline On 17 Apr 2021
              }
    }
});


var dtpRefdate = new Ext.form.DateField({
    fieldLabel : 'Ref Date',
    id         : 'dtpRefdate',
    name       : 'date',
    format     : 'd-m-Y',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
    anchor     : '100%',
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurchaseLedger.focus();
             }
       },
}
});


var txtAmendNo = new Ext.form.TextField({
    fieldLabel  : 'Amend.No.',
    id          : 'txtAmendNo',
    width       : 80,
    name        : 'txtAmendNo',
    readOnly:true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    disabled : true,
    listeners:{
    change:function(){
    }
    }
});




var lblSupplier = new Ext.form.Label({
    fieldLabel  : 'Supplier Name',
    id          : 'lblSupplier',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});

var lblArea = new Ext.form.Label({
    fieldLabel  : 'Area',
    id          : 'lblArea',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});



var itemcode;


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	if ((selrow != null)){
		supcode = selrow.get('sup_code');
		suptype = selrow.get('sup_type');
		txtSupplierName.setValue(selrow.get('sup_name'));
		flxLedger.hide();
   	        lblItem.show();
	        lblQty.show();
                cmbPONo.focus();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsPo.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                            //    gsttype : dngsttype,  

			},
		});

		PONoListDataStore.removeAll();
		PONoListDataStore.load({
			url: 'ClsPo.php',
			params:
			{
				task:"loadPartyPONOlist",
				suppliercode  : supcode,
                                compcode      : Gincompcode, 
                                fincode       : GinFinid, 
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
		{header: "Led Code", dataIndex: 'sup_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'sup_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'sup_type',sortable:true,width:50,align:'left'},

        ],
        store:loadPurchaseOrderPartyListDatastore,

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

        loadPurchaseOrderPartyListDatastore.removeAll();
        loadPurchaseOrderPartyListDatastore.load({
		url: 'ClsPo.php',
		params:
		{
			task:"loadPOPartylist",
			ledger : txtSupplierName.getRawValue(),
		},
        });
}




var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
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
                cmbPONo.focus();
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
	        loadPurchaseOrderPartyListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    });







var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItem',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
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

var lblMois = new Ext.form.Label({
    fieldLabel  : 'Mois %',
    id          : 'lblMois',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var cmbArea = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 150,
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

var cmbArea2 = new Ext.form.ComboBox({
    fieldLabel      : 'AREA NAME',
    width           : 150,
    displayField    : 'area_name', 
    valueField      : 'area_code',
    id              : 'cmbArea2',
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


var icode,deptcode;
var cmbItemName = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 200,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItemName',
    typeAhead       : true,
    mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : ItemLoadDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOrderQty.focus();
             }
       },
        select:function(){

			ItemDetailsDataStore.load({
                        url: 'ClsPo.php',
                        params:
                            {
                                task:"itemdet",
                                itemcode: cmbItemName.getValue()
                            },
                            scope: this,
                            callback: function () 
				{
                                txtMoisture.setValue(ItemDetailsDataStore.getAt(0).get('itmh_moisture_per'));

                            }
                        });         
        }
    }
});

var cmbItemName2 = new Ext.form.ComboBox({
    fieldLabel      : 'ITEM NAME',
    width           : 200,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItemName2',
    typeAhead       : true,
    mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : ItemLoadDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOrderQty.focus();
             }
       },
        select:function(){

			ItemDetailsDataStore.load({
                        url: 'ClsPo.php',
                        params:
                            {
                                task:"itemdet",
                                itemcode: cmbItemName.getValue()
                            },
                            scope: this,
                            callback: function () 
				{
                                txtMoisture.setValue(ItemDetailsDataStore.getAt(0).get('itmh_moisture_per'));

                            }
                        });         
        }
    }
});
var txtItems = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtItems',
    width       : 400,
    name        : 'txtitems',
    readOnly:true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    disabled:true
});


var txtRefNo = new Ext.form.TextField({
    fieldLabel  : 'Ref.No',
    id          : 'txtRefNo',
    width       : 130,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'txtRefNo',
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpRefdate.focus();
             }
       },
}
});


var lblUom = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lblUom',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 50
});

var txtMoisture = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtMoisture',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'stock'
});




var txtMoisture2 = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtMoisture2',
    width       : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'stock'
});



var lblQono = new Ext.form.Label({
    fieldLabel  : 'Qo No',
    id          : 'lblQono',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 50
});


var lblPendqty = new Ext.form.Label({
    fieldLabel  : 'Al PoQty',
    id          : 'lblPendqty',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 70
});

var lblbomqty = new Ext.form.Label({
    fieldLabel  : 'Bom.Qty',
    id          : 'lblbomqty',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 70
});




var txtOrderQty = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtOrderQty',
    width       : 70,
    name        : 'txtOrderQty',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRate.focus();
             }
       },
        keyup:function(){
                txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue())); 
        }  ,    
        change:function(){
                txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue())); 
        }      

    }
});


var txtRate = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtRate',
    width       : 80,
    name        : 'qorate',
    readOnly    : false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,   
    disabled:false,
    listeners   :{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtValue.focus();
             }
       },
	keyup:function(){
          
	  /*  var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtRate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");*/
               
	//txtRate.setValue(Ext.util.Format.number(changeporate,"0.00"));
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
        },
	keydown:function(){
          
	   /* var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtRate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");
               
	txtRate.setValue(Ext.util.Format.number(changeporate,"0.00"));*/
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
        },
	blur:function(){
          
	    var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtRate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");
               
	txtRate.setValue(Ext.util.Format.number(changeporate,"0.00"));
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
        }
    }

});

var txtAreaName = new Ext.form.TextField({
    fieldLabel  : 'Area Name',
    id          : 'txtAreaName',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'txtRefNo',
    readOnly    : true,
    listeners:{

   }
});


var txtItemName = new Ext.form.TextField({
    fieldLabel  : 'Item Name',
    id          : 'txtItemName',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'txtRefNo',
    readOnly    : true,
    listeners:{

   }
});
var txtRevisedRate = new Ext.form.NumberField({
    fieldLabel  : 'Revised Rate',
    id          : 'txtRevisedRate',
    width       : 80,
    name        : 'txtRevisedRate',
    readOnly    : false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,   
    disabled:false,
    listeners   :{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRevisedQty.focus();
             }
       },
	keyup:function(){
          
        },
	keydown:function(){
          

        },
	blur:function(){

        }
    }

});

var txtRevisedQty = new Ext.form.NumberField({
    fieldLabel  : 'Revised Qty',
    id          : 'txtRevisedQty',
    width       : 80,
    name        : 'txtRevisedQty',
    readOnly    : false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,   
    disabled:false,
    listeners   :{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpwefdate.focus();
             }
       },
	keyup:function(){
          
        },
	keydown:function(){
          

        },
	blur:function(){

        }
    }

});


var lblItemremark = new Ext.form.Label({
    fieldLabel  : 'Item Remark',
    id          : 'lblItemremark',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 100
});

var txtItemremark = new Ext.form.TextField({
    fieldLabel  : 'Item Remark',
    id          : 'txtItemremark',
    width       : 500,
    name        : 'itemremark',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     style      :{textTransform:"uppercase"},
        listeners:{
           change: function(field,newValue,oldValue){
                   field.setValue(newValue.toUpperCase());
             }
        }
});



var txtValue = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtValue',
    width       : 100,
    name        : 'txtvalue',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    readOnly:true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnSubmit.focus();
             }
       },

    blur:function(){
		fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtOrderQty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtOrderQty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
    }
    }
});

var txtitemtotValue = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtitemtotValue',
    width       : 100,
    name        : 'txtitemtotValue',
    readOnly:true,
    hidden:true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
    blur:function(){
          // fdbl_totalvalue=parseFloat(txtRate.getRawValue()*txtOrderQty.getRawValue());
    }
    }
});


var txtIGST = new Ext.form.NumberField({
    fieldLabel  : 'IGST %',
    id          : 'txtIGST',
    name        : 'txtIGST',
    width       : 50,
    readOnly  :true,
    enableKeyEvents: true,
    allowBlank: true,   

labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners : {
      change : function()
        {
        }
   }
});


var txttcs = new Ext.form.NumberField({
    fieldLabel  : 'TCS %',
    id          : 'txttcs',
    name        : 'txttcs',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,   
    readOnly:false,   
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
    listeners : {
     /* change : function()
        {
	   
var tcsp =0;
tcsp =txttcs.getValue();

var tcsval = 0; 
tcsval = (Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue()) + Number(txtGrossvalue.getValue()));

txttcsval.setRawValue(Math.round(tcsval * tcsp / 100));
 txttaxablevalue.setRawValue(Number(txttcsval.getRawValue())+Number(txtOthersvalnew.getRawValue())+Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue())-Number(txtDiscountval.getRawValue())); 
txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+ servchval);
        }, */
      keyup : function()
	{
	//txttcsvalue=0;
	//txttcsvalue=Ext.util.Format.number(Number(txttcsvalue.getRawValue())*100); 
	//alert(txttcsvalue);
var tcsp =0;
tcsp =txttcs.getValue();

var tcsval = 0; 
tcsval = (Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue()) + Number(txtGrossvalue.getValue()));

//tcsval = Ext.util.Format.number(Number(txtGrossvalue.getValue()),"0");

txttcsval.setRawValue(Math.round(tcsval * tcsp / 100));
         // txttcsval.setRawValue(Number(txttcs.getValue())*Number(txtGrossvalue.getValue())/100);
 txttaxablevalue.setRawValue(Number(txttcsval.getRawValue())+Number(txtOthersvalnew.getRawValue())+Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue())-Number(txtDiscountval.getRawValue())); 
txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);

	}
   }
});

var txttcsval = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txttcsval',
    name        : 'txttcsval',
    width       : 100,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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

var txttaxablevalue = new Ext.form.NumberField({
    fieldLabel  : 'Total Tax Value',
    id          : 'txttaxablevalue',
    name        : 'txttaxablevalue',
    width       : 100,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,   
    readOnly:true,  
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",   
    listeners : {
      change : function()
        {
	  txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);
         
        }, 
        
      blur : function()
        {
              txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);
        }
   }
});


var txtIGSTvalue = new Ext.form.NumberField({
    id          : 'txtIGSTvalue',
    name        : 'txtIGSTvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
});


var txtSGSTvalue = new Ext.form.NumberField({
    id          : 'txtSGSTvalue',
    name        : 'txtSGSTvalue',
     width       : 100,
    readOnly: true,
    enableKeyEvents: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
});


var txtTotQty = new Ext.form.NumberField({
    fieldLabel  : 'Total Qty(t)',
    id          : 'txtTotQty',
    name        : 'txtTotQty',
    width       : 60,
    readOnly: false,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,
    readOnly  :true,
    allowBlank: true,
    listeners : {
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRate.focus();
             }
       },

    }
});


var txtSGST = new Ext.form.NumberField({
    fieldLabel  : 'SGST %',
    id          : 'txtSGST',
    name        : 'txtSGST',
    width       : 50,
//     readOnly  :true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,

    allowBlank: true,
    listeners : {
      keyup : function()
        {
CalculatePOValue();
        }
   }
});


var txtCGST = new Ext.form.NumberField({
    fieldLabel  : 'CGST %',
    id          : 'txtCGST',
    name        : 'txtCGST',
    width       : 50,
//     readOnly  :true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,

    allowBlank: true,
    listeners : {
      keyup : function()
        {
        CalculatePOValue();
        }
   }
});

var txtCGSTvalue = new Ext.form.NumberField({
    id          : 'txtCGSTvalue',
    name        : 'txtCGSTvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
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
             txtDiscount.setValue('0');
             txtDiscountval.setValue('0');
             txtitemtotValue.setValue('0');
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
             txtDiscount.setValue('0');
             txtDiscountval.setValue('0');
             txtitemtotValue.setValue('0');
            }            
        }
       }
});

var txtDiscount = new Ext.form.NumberField({
    fieldLabel  : 'Dis%',
    id          : 'txtDiscount',
    width       : 40,
    name        : 'discount',
    maxLength   : 2,
    maxValue: 90,
    minValue: 0,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,	
    listeners : {
        change:function()
        {
           if(txtDiscount.getRawValue()<100){
    if(parseFloat(txtGrossvalue.getValue())>0)
      {
        var disval=0;
        var itemtotval=0;
        var itval=0;
        var stval=0;
        var ctval=0;
        if(checkdis=="N")
        {
        disval=Ext.util.Format.number((parseFloat(txtDiscount.getRawValue())*parseFloat(txtGrossvalue.getValue()))/Number(100),"0.00");
        itval=Ext.util.Format.number(((Number(txtIGST.getRawValue())*(Number(txtGrossvalue.getRawValue())-disval))/Number(100)),"0.00");
        stval=Ext.util.Format.number(((Number(txtSGST.getRawValue())*(Number(txtGrossvalue.getRawValue())-disval))/Number(100)),"0.00");
        ctval=Ext.util.Format.number(((Number(txtCGST.getRawValue())*(Number(txtGrossvalue.getRawValue())-disval))/Number(100)),"0.00");
             
        itemtotval=Ext.util.Format.number((parseFloat(txtValue.getValue())+parseFloat(itval)+parseFloat(stval)+parseFloat(ctval)-parseFloat(disval)),"0.00");
        }
       
        txtDiscountval.setRawValue(disval);
        txtIGSTvalue.setRawValue(itval);
        txtSGSTvalue.setRawValue(stval);
        txtCGSTvalue.setRawValue(ctval);
 txttaxablevalue.setRawValue(Number(txttcsval.getRawValue())+Number(txtOthersvalnew.getRawValue())+Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue())-Number(txtDiscountval.getRawValue())); 
txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);
        //txtitemtotValue.setRawValue(itemtotval);

//        txtPOValue.setValue(parseFloat(fdbl_totalvalue)+
//                parseFloat(txtTotIGST.getValue())+
//                parseFloat(txtTotSGST.getValue())+
//                parseFloat(txtTotCGST.getValue())-parseFloat(txtDiscountval.getValue()));
       }
    }else{
        Ext.Msg.alert("STORES","Invalid %");
        txtDiscountval.setValue("");
        txtDiscount.focus();
    }
        },
        blur:function()
        {
            if(txtDiscount.getRawValue()===""){
                    txtDiscount.setRawValue("0");
            }
        }
    }
});

var txtDiscountval = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtDiscountval',
    width       : 80,
    name        : 'discountvalue',
    readOnly    : true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,
    listeners : {
        change : function()
        {
             if(txtDiscountval.getRawValue()<fdbl_totalvalue&&fdbl_totalvalue>0){
                txtDiscount.setRawValue(Ext.util.Format.number(((Number(txtDiscountval.getRawValue()))*Number(100))/Number(fdbl_totalvalue)),"0.00");
                txtPOValue.setValue(parseFloat(fdbl_totalvalue)+
                        parseFloat(txtTotIGST.getValue())+
                        parseFloat(txtTotSGST.getValue())+
                        parseFloat(txtTotCGST.getValue())+servchval-parseFloat(txtDiscountval.getValue()));
               //txtOthersval.setRawValue(Ext.util.Format.number((Number((txtOthers.getRawValue())*(Number(fdbl_totalvalue)+Number(txtSedval.getRawValue())+Number(txtExcisedutyval.getRawValue())-Number(txtDiscountval.getRawValue())))/100)),"0.00");
             }else{
                  if(txtDiscountval.getRawValue()>fdbl_totalvalue){
                      Ext.Msg.alert("Pur-Ord","Invalid Value");
                  }
             }
        },
        keyup : function(){
                //txtSedval.setRawValue(Ext.util.Format.number(((Number(txtSed.getRawValue()))*Number(txtExcisedutyval.getRawValue()))/Number(100)),"0.00");
                //txtTnvatval.setRawValue(Ext.util.Format.number((Number((txtTnvat.getRawValue())*(Number(fdbl_totalvalue)+Number(txtSedval.getRawValue())+Number(txtExcisedutyval.getRawValue())-Number(txtDiscountval.getRawValue())))/100)),"0.00");
                //txtCstval.setRawValue(Ext.util.Format.number((Number((txtCst.getRawValue())*(Number(fdbl_totalvalue)+Number(txtSedval.getRawValue())+Number(txtExcisedutyval.getRawValue())-Number(txtDiscountval.getRawValue())))/100)),"0.00");
                //txtOthersval.setRawValue(Ext.util.Format.number((Number((txtOthers.getRawValue())*(Number(fdbl_totalvalue)+Number(txtSedval.getRawValue())+Number(txtExcisedutyval.getRawValue())-Number(txtDiscountval.getRawValue())))/100)),"0.00");
       }
    }
});

var txtothersnew = new Ext.form.TextField({
    fieldLabel  : 'Others%',
    id          : 'txtothersnew',
    width       : 40,
    name        : 'others',
    readOnly    : false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,
    listeners : {
        change : function()
        {
 	txtOthersvalnew.setRawValue(Number(txtothersnew.getValue())*Number(txtGrossvalue.getRawValue())/100);
 txttaxablevalue.setRawValue(Number(txttcsval.getRawValue())+Number(txtOthersvalnew.getRawValue())+Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue())-Number(txtDiscountval.getRawValue())); 
txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);
        },

	keyup : function()
	{
 	txtOthersvalnew.setRawValue(Number(txtothersnew.getValue())*Number(txtGrossvalue.getRawValue())/100);
 txttaxablevalue.setRawValue(Number(txttcsval.getRawValue())+Number(txtOthersvalnew.getRawValue())+Number(txtCGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtIGSTvalue.getRawValue())-Number(txtDiscountval.getRawValue())); 
txtPOValue.setRawValue(Number(txttaxablevalue.getRawValue())+Number(txtGrossvalue.getRawValue())+servchval);
	}
	
    }
});


var txtOthersvalnew = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtOthersvalnew',
    width       : 80,
    readOnly    : true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'txtOthersvalnew',
     listeners : {
        change : function()
        {
            if(this.getRawValue()<fdbl_totalvalue){
            if(fdbl_totalvalue>0){
                txtOthers.setRawValue(Ext.util.Format.number((Number(txtOthersval.getRawValue())*Number(100))/Number(fdbl_totalvalue)-Number(txtDiscountval.getRawValue())),"0.00");
            }
        }else{
            Ext.Msg.alert("Pur-Ord","Invalid %");
             this.setValue("");
        }
        },blur : function()
        {
            if(txtOthersval.getRawValue()===""){
                    txtOthersval.setRawValue("0");
            }
        }
    }
});



var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 60,
    height  : 40,
    x       : 750,
    y       : 10,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();

	    var gstadd="true";
	



	if(supcode == 0) 
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Supplier..");  	
	}            
	else if(cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Area..");  
                 gstadd="false";
        }
	else if(cmbItemName.getValue()==0 || cmbItemName.getRawValue()=="")
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Item..");  
                 gstadd="false";
        }
	/*else if(txtRefNo.getValue() == '')
	{
                Ext.MessageBox.alert("Pur-Ord", "Enter QoNo..");
                 gstadd="false";
        }*/
	else if((txtOrderQty.getValue() == '') || (txtOrderQty.getValue() == 0))
	    {
                Ext.MessageBox.alert("Pur-Ord", "Po Qty Should not be Zero..");
                 gstadd="false";
            }
	else if(txtRate.getValue()==0)
	{
                Ext.MessageBox.alert("Pur-Ord", "Enter Rate..");
                gstadd="false";
        }  

            if(gstadd=="true")
            {
		

                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq === cmbItemName.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('areaname' , cmbArea.getRawValue());
			sel[idx].set('areacode' , cmbArea.getValue());
			sel[idx].set('itemname' , cmbItemName.getRawValue());
			sel[idx].set('itemcode' , cmbItemName.getValue());
			sel[idx].set('qty'      , txtOrderQty.getValue());
			sel[idx].set('unitrate' , txtRate.getValue());
			sel[idx].set('value'    , txtValue.getValue());
			sel[idx].set('moisture' , txtMoisture.getValue());
			sel[idx].set('oldnew' , 'N');
			flxDetail.getSelectionModel().clearSelections();
                            txtOrderQty.setValue("0.000");
                            txtRate.setValue("0.00");
                            txtValue.setValue("0.00");

		}//if(gridedit === "true")

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
                            areaname  : cmbArea.getRawValue(),
                            areacode  : cmbArea.getValue(),
                            itemname  : cmbItemName.getRawValue(),
                            itemcode  : cmbItemName.getValue(),

                            reqqty    : txtOrderQty.getRawValue(),
                            unitrate  : txtRate.getRawValue(),
                            value     : parseFloat(txtRate.getRawValue()*txtOrderQty.getRawValue()), 
	                    qono      : txtRefNo.getValue(),
			    qty	      : txtOrderQty.getValue(),
                            oldnew    : 'N',
                            moisture  : txtMoisture.getValue(),
                        }) 
                        );
                            grid_tot();
  //                          CalculatePOValue();
                            txtOrderQty.setValue("0.000");
                            txtRate.setValue("0.00");
                            txtValue.setValue("0.00");
  //                         GeneralCalTax();
                }
                
            }
        }
    }
});



var btnAmend = new Ext.Button({
    style   : 'text-align:center;',
    text    : "AMEND",
    width   : 60,
    height  : 40,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();

	    var gstadd="true";
	



	if(supcode == 0) 
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Supplier..");  	
	}            
	else if(supcode ==0 )
	{
                Ext.MessageBox.alert("Pur-Ord", "Item Error.");  
                 gstadd="false";
        }
	else if(cmbItemName2.getRawValue()== "")
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Item..");  
                 gstadd="false";
        }

	else if( Number(txtRevisedRate.getValue()) == 0  &&  Number(txtRevisedQty.getValue())  == 0)
	    {
                Ext.MessageBox.alert("Pur-Ord", "Enter Rate or Qty..");
                 gstadd="false";
            }


            if(gstadd=="true")
            {
		

                flxAmend.getSelectionModel().selectAll();
                var selrows = flxAmend.getSelectionModel().getCount();
                var sel = flxAmend.getSelectionModel().getSelections();

                var cnt = 0;
        	if(gridedit2 === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit2 = "false";

                       	var idx = flxAmend.getStore().indexOf(editrow);
			sel[idx].set('areaname' , cmbArea2.getRawValue());
			sel[idx].set('areacode' , cmbArea2.getValue());
			sel[idx].set('itemname' , cmbItemName2.getRawValue());
			sel[idx].set('itemcode' , cmbItemName2.getValue());
			sel[idx].set('qty'      , txtRevisedQty.getValue());
			sel[idx].set('rate'     , txtRevisedRate.getValue());
			sel[idx].set('wef'      , Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"));
                     	sel[idx].set('value'    , txtRevisedRate.getValue());
			sel[idx].set('moisture' , Number(txtRevisedQty.getValue())* Number(txtRevisedRate.getValue()));
			flxAmend.getSelectionModel().clearSelections();

                         txtRevisedQty.setValue('');
                         txtRevisedRate.setValue('');


		}//if(gridedit === "true")

                else

  


		if (cnt > 0)
		{
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {
                    var RowCnt = flxAmend.getStore().getCount() + 1;
                    flxAmend.getStore().insert(
                        flxAmend.getStore().getCount(),
                        new dgrecord({
                            slno:RowCnt,
                            areaname  : cmbArea2.getRawValue(),
                            areacode  : cmbArea2.getValue(),
                            itemname  : cmbItemName2.getRawValue(),
                            itemcode  :  cmbItemName2.getValue(),
	                    rate      : txtRevisedRate.getValue(),
			    qty	      : txtRevisedQty.getValue(),
                            wef       : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"),
                            value     : Number(txtRevisedQty.getValue())* Number(txtRevisedRate.getValue()),
                            moisture  : txtMoisture2.getValue(),


                        }) 
                        );
                }
                         txtRevisedQty.setValue('');
                         txtRevisedRate.setValue('');
            }
        }
    }
});


var txtTotIGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.IGST',
    id          : 'txtTotIGST',
    name        : 'txtTotIGST',
    width       : 100,
    readOnly: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
    });
    
var txtTotSGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.SGST',
    id          : 'txtTotSGST',
    name        : 'txtTotSGST',
     width       : 100,
    readOnly: true, 
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",       
    allowBlank: true
});

var txtTotCGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.CGST',
    id          : 'txtTotCGST',
    name        : 'txtTotCGST',
    width       : 100,
    readOnly: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var txtGrossvalue = new Ext.form.NumberField({
    fieldLabel  : 'Gross Value',
    id          : 'txtGrossvalue',
    name        : 'txtGrossvalue',
    width       : 100,
    //readOnly: true,
    allowBlank: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners : {
        change:function()
        {
alert('ok');

        },
    }


});

var txtPOValue = new Ext.form.NumberField({
    fieldLabel  : 'PO Value',
    id          : 'txtPOValue',
    name        : 'txtPOValue',
    width       : 100,
    readOnly: true,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var lblGrandtotal = new Ext.form.Label({
    fieldLabel  : 'Grd Tot',
    id          : 'lblGrandtotal',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 90,
    style:{
         color: 'Red' ,
         backgroundColor:'White'
    }
});

var lblDiscount = new Ext.form.Label({
    fieldLabel  : 'Discount',
    id          : 'lblDiscount',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
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
    fieldLabel : 'Delivery Date',
    id         : 'dtpDuedate',
    name       : 'date',
    format     : 'd-m-Y',
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
                txtPaymtDays.setValue(diffDays);
            }
    }
});

var dtpwefdate = new Ext.form.DateField({
    fieldLabel : 'W.E.F Date',
    id         : 'dtpwefdate',
    name       : 'date',
    format     : 'd-m-Y',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnAmend.focus();
             }
       },

            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtPaymtDays.setValue(diffDays);
            }
    }
});

var txtorderterms = new Ext.form.TextField({
    fieldLabel  : 'Order Terms',
    id          : 'txtorderterms',        
    width       : 300,
    name        : 'txtorderterms',
    style       :{textTransform:"uppercase"},
 enableKeyEvents: true,
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

var txtPreparedBy = new Ext.form.TextField({
    fieldLabel  : 'Prepared By',
    id          : 'txtPreparedBy',
    width       : 200,
    name        : 'txtPreparedBy',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtPaymtDays = new Ext.form.TextField({
    fieldLabel  : 'Paymt Terms',
    id          : 'txtPaymtDays',
    width       : 50,
    name        : 'scheduledays',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    style      :{textTransform:"uppercase"},
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOrderTerms.focus();
             }
       },

       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var txtOrderTerms = new Ext.form.TextArea({
    fieldLabel  : 'Order Terms',
    id          : 'txtOrderTerms',
    width       : 250,
    height      : 50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    name        : 'Order Terms',
     style       :{textTransform:"uppercase"},
 enableKeyEvents: true,
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

var txtdeliveryrem = new Ext.form.TextField({
    fieldLabel  : 'Delivery Remarks',
    id          : 'txtdeliveryrem',
    width       : 250,
//    height      : 50,
    name        : 'remarks',
     style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtHandling = new Ext.form.TextField({
    fieldLabel  : 'Handling',
    id          : 'txtHandling',
    width       : 250,
    name        : 'handling',
     style       :{textTransform:"uppercase"},
    listeners:{
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
    style       :{textTransform:"uppercase"},
    listeners:{
    blur:function(){
          /*  logoDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'cmbpaymode'
                }
            });*/
    },
    change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});


var PODetailDataStore = new Ext.data.Store({
  id: 'PODetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPODetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_terms', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_itemvalue', 'ordh_roundingoff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'ordt_hdseqno', 'ordt_seqno', 'ordt_item_code', 'ordt_indh_seqno', 'ordt_enqh_seqno', 'ordt_qty', 'ordt_rec_qty', 'ordt_can_qty', 'ordt_pen_qty', 'ordt_unit_rate', 'ordt_item_value', 'ordt_edpercentage', 'ordt_moisper', 'ordt_tareper', 'ordt_status', 'ordt_educessper', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_group', 'itmh_outthrough', 'itmh_prohiper', 'itmh_hsncode','ordt_outper' , 'ordh_refno','ordh_refdate','ordh_preparedby',
'area_code','area_name'
  ])
});

var cmbPONo = new Ext.form.ComboBox({
    fieldLabel      : 'PO No.',
    width           : 90,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : 'ordh_no',
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : PONoListDataStore,
    id              : 'cmbPONo',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){

                    flxDetail.getStore().removeAll();


	    LoadAmendmentSeqNoDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'loadPOAmdNo',
                     ordcode  : cmbPONo.getRawValue(),
                     compcode : Gincompcode,
		     finid    : GinFinid,
                },

		callback : function(){

		txtAmendNo.setValue(LoadAmendmentSeqNoDataStore.getAt(0).get('amnh_seqno'));
		}

            });



                    //RefreshData();
			PODetailDataStore.load({
                        url: 'ClsPo.php',
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


                                txtRefNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_refno')); 
				dtpRefdate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_refdate'),'d-m-Y'));
                                txtPreparedBy.setRawValue(PODetailDataStore.getAt(0).get('ordh_preparedby')); 

				ordseqno = PODetailDataStore.getAt(0).get('ordh_seqno');

                                txtSupplierName.setValue(PODetailDataStore.getAt(0).get('sup_refname'));

                                supcode = PODetailDataStore.getAt(0).get('ordh_sup_code');

				porows = PODetailDataStore.getCount();

				var RowCnt = PODetailDataStore.getCount();
				for (var i=0;i<RowCnt;i++)
				{
//alert(i);
					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						areaname :PODetailDataStore.getAt(i).get('area_name'),
						areacode :PODetailDataStore.getAt(i).get('area_code'),

						itemname :PODetailDataStore.getAt(i).get('itmh_name'),
						itemcode :PODetailDataStore.getAt(i).get('ordt_item_code'),
						unitrate :PODetailDataStore.getAt(i).get('ordt_unit_rate'),
						qty:PODetailDataStore.getAt(i).get('ordt_qty'),
						value:PODetailDataStore.getAt(i).get('ordt_item_value'),
						recdqty:PODetailDataStore.getAt(i).get('ordt_rec_qty'),
						cancelqty:PODetailDataStore.getAt(i).get('ordt_can_qty'),
						pendqty:PODetailDataStore.getAt(i).get('ordt_pen_qty'),
						oldnew : 'O',
						moisture:PODetailDataStore.getAt(i).get('ordt_moisper'),
                                                amend   : PODetailDataStore.getAt(i).get('ordt_status'),
					}) 
					);

				}//For Loop
				
				txtCGST.setValue(PODetailDataStore.getAt(0).get('ordh_cgstper'));
				txtSGST.setValue(PODetailDataStore.getAt(0).get('ordh_sgstper'));
				txtIGST.setValue(PODetailDataStore.getAt(0).get('ordh_igstper'));
				txttcs.setValue(PODetailDataStore.getAt(0).get('ordh_tcsper'));	
			
				txtPaymtDays.setValue(PODetailDataStore.getAt(0).get('ordh_creditdays'));
			//	txtpaymentterms.setValue(PODetailDataStore.getAt(0).get('ordh_payterms'));	
			//	txtorderterms.setValue(PODetailDataStore.getAt(0).get('ordh_terms'));
				txtOrderTerms.setValue(PODetailDataStore.getAt(0).get('ordh_terms'));	

				cmbpaymode.setValue(PODetailDataStore.getAt(0).get('ordh_paymode'));
				cmbDespatchThrough.setValue(PODetailDataStore.getAt(0).get('ordh_carriagetype'));

                                poseqno = PODetailDataStore.getAt(0).get('ordh_seqno');
//				cmbfreight.setValue(PODetailDataStore.getAt(0).get('ordh_frttype'));
			
//alert(PODetailDataStore.getAt(0).get('ordh_carriagetype'));

				grid_tot();

				flxDetail.getSelectionModel().clearSelections();
				
			     }
			     });//PODetailDataStore
				//POdelvyDataStore.removeAll();
grid_tot();
//CalculatePOValue();
//CalculateTaxValue();
         flxDetail.getSelectionModel().clearSelections();
        }
    }

});



var cmbpaymode = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Mode',
    width           : 250,
    displayField    : 'term_name',
    valueField      : 'term_code',
    hiddenName      : 'term_code',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : PaymentmodeDataStore,
    id              : 'cmbpaymode',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPaymtDays.focus();
             }
       },
}
});


var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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
		url: 'ClsPo.php',
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
}
});


  

var cmbDespatchThrough = new Ext.form.ComboBox({
    fieldLabel      : 'Despatch Through',
    width           : 250,
    displayField    : 'carr_name',
    valueField      : 'carr_code',
    hiddenName      : 'carr_code',
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : CarriageDataStore,
    id              : 'cmbDespatchThrough',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbpaymode.focus();
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
    height: 150,
    hidden:false,
    width: 780,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:50,align:'left'},
        {header: "Area Name", dataIndex: 'areaname',sortable:true,width:120,align:'left'},
        {header: "Area code", dataIndex: 'areacode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:190,align:'left'},
        {header: "Item Code",  dataIndex: 'itemcode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Qty"     ,  dataIndex: 'qty',sortable:true,width:65,align:'right'},
        {header: "Rate", dataIndex: 'unitrate',sortable:true,width:80,align:'right'},
        {header: "Value"    , dataIndex:'value',sortable:true,width:100,align:'right'},
    
        {header: "recdqty", dataIndex: 'recdqty',sortable:true,width:80,align:'left',hidden:true},
        {header: "cancelqty", dataIndex: 'cancelqty',sortable:true,width:80,align:'left',hidden:true},
        {header: "pendqty", dataIndex: 'pendqty',sortable:true,width:80,align:'left',hidden:true},
        {header: "Mois %", dataIndex:'moisture',sortable:true,width:70,align:'center'},
        {header: "new/old", dataIndex:'oldnew',sortable:true,width:1,align:'center',hidden:false},
        {header: "Amend(Y/N)", dataIndex:'amend',sortable:true,width:80,align:'center'},

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

             if (cellIndex == 13)
             { 
		     Ext.Msg.show({
		     title: 'RM PO PREPARATION',
		     icon: Ext.Msg.QUESTION,
		     buttons: Ext.MessageBox.YESNO,
		     msg: 'Press YES to Amend the - Qty & Rate  CANCEL to EXIT',
		     fn: function(btn){
			     if (btn === 'yes')
		             {


				     var sm = flxDetail.getSelectionModel();
				     var selrow = sm.getSelected();
			 	     gridedit = "true";
				     editrow = selrow;
				     flxDetail.getSelectionModel().clearSelections();
                                     if (selrow.get('amend') != 'A')
                                     {
				        cmbArea2.setValue(selrow.get('areacode'));
				        cmbItemName2.setValue(selrow.get('itemcode'));
				        txtRevisedQty.setValue(selrow.get('qty'));
				        txtMoisture2.setValue(selrow.get('moisture'));
            	                        colname = 'amend';
			                selrow.set(colname, 'Y');
                                     }  
                                     else
                                     {
                                        alert("Alreaday Amended this Item...");
                                     }   
		                        
			      }
		             grid_tot();

		       } 
		     }); 
               }
               else
               { 
var acode =0;
var icode =0;
var imois = 0;
var iqty =0;
var irate =0;
 			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxDetail.getSelectionModel().clearSelections();
                        if (selrow.get('oldnew') != 'O')
                        {
                      	editrow  = selrow;
                 	gridedit = "true";
			acode    =  selrow.get('areacode');
			icode    =  selrow.get('itemcode');
			imois    =  selrow.get('moisture');
			iqty     =  selrow.get('qty');
			irate    =  selrow.get('unitrate');
	 	
			
		     Ext.Msg.show({
		     title: 'RM PO PREPARATION',
		     icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
		     fn: function(btn){
			     if (btn === 'yes')
		             {
				        cmbArea.setValue(acode);
				        cmbItemName.setValue(icode);
		                        txtMoisture.setValue(imois);
					txtOrderQty.setValue(iqty);
					txtRate.setValue(irate);
		                        txtValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));
		                        txtitemtotValue.setValue(parseFloat(txtOrderQty.getValue()*txtRate.getValue()));

			      }
			      else if (btn === 'no')
		              {
			           flxDetail.getStore().remove(selrow);
				   flxDetail.getSelectionModel().selectAll();
			      }
		             grid_tot();

		       } 
		     }); 
                    }
               }
       
    }

   }
});



var flxAmend = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 220,
    hidden:false,
    width: 460,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:50,align:'left'},
        {header: "Area Name", dataIndex: 'areaname',sortable:true,width:160,align:'left'},
        {header: "Area Code",  dataIndex: 'areacode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:160,align:'left'},
        {header: "Item Code",  dataIndex: 'itemcode',sortable:true,width:80,align:'left'},
        {header: "Qty"     ,  dataIndex: 'qty',sortable:true,width:70,align:'right'},
        {header: "Rate", dataIndex: 'rate',sortable:true,width:70,align:'right'},
        {header: "WEF", dataIndex: 'wef',sortable:true,width:90,align:'left'},
        {header: "Value"    , dataIndex:'value',sortable:true,width:100,align:'right'},
        {header: "Mois %", dataIndex:'moisture',sortable:true,width:75,align:'center'},
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
              Ext.Msg.show({
             title: 'RM PO AMENDMENT',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxAmend.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxAmend.getSelectionModel().clearSelections();

		                cmbArea2.setValue(selrow.get('areacode'));
		                cmbItemName2.setValue(selrow.get('itemcode'));
                                txtMoisture2.setValue(selrow.get('moisture'));
			        txtRevisedQty.setValue(selrow.get('qty'));
			        txtRevisedRate.setValue(selrow.get('unitrate'));

	              }
		      else if (btn === 'no')
                      {
                           var sm = flxAmend.getSelectionModel();
		           var selrow = sm.getSelected();
	                   flxAmend.getStore().remove(selrow);
		           flxAmend.getSelectionModel().selectAll();
		      }
                     grid_tot();

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
    width       : 1500,
    x           : 2,
    items       : [

        {
            xtype: 'panel',
            title: 'Po-Preparation',bodyStyle:{"background-color":"#ffe6ff"},
            layout: 'absolute',
            items: [


                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 835,
                    height      : 130,
                    x           : 10,
                    y           : 0,
                    border      : true,
                    layout      : 'absolute',
                    items: [ 






                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 550,
                            x           : 7,
                            y           : 0,
                            border      : false,
                            items: [txtSupplierName]
                        },
                 


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 280,
                            x           : 10,
                            y           : 35,
                            labelWidth  : 110,
                            border      : false,
                            items : [cmbPONo]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 220,
                            x           : 240,
                            y           : 30,
                            labelWidth  : 1,
                            border      : false,
                            items : [dtpPodate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 220,
                            x           : 10,
                            y           : 70,
                            labelWidth  : 110,
                            border      : false,
                            items : [txtAmendNo]
                        },




                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 400,
                            x           : 480,
                            y           : 10,
                            border      : false,
                            items: [txtRefNo]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 280,
                            x           : 480,
                            y           : 40,
                            labelWidth  : 130,
                            border      : false,
                            items : [dtpRefdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 400,
                            x           : 480,
                            y           : 70,
                            labelWidth  : 130,
                            border      : false,
                            items : [cmbPurchaseLedger]
                        },
                    ]
                },
                {
                    xtype       : 'fieldset',
                    title       : 'Amendment',
                    width       : 475,
                    height      : 483,
                    x           : 850,
                    y           : 0,
                    border      : true,
                    layout      : 'absolute',
                    items: [


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 0,
                            y           : 0,
                            border      : false,
                            items: [cmbArea2]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 0,
                            y           : 30,
                            border      : false,
                            items: [cmbItemName2]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 0,
                            y           : 60,
                            border      : false,
                            items: [txtRevisedRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 0,
                            y           : 90,
                            border      : false,
                            items: [txtRevisedQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 0,
                            y           : 120,
                            border      : false,
                            items: [dtpwefdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : 300,
                            y           : 110,
                            border      : false,
                            items: [btnAmend]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 740,
                            x           : -10,
                            y           : 160,
                            border      : false,
                            items: [flxAmend]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : 400,
                            border      : false,
                            items: [txtPreparedBy]
                        },






                    ]
                },      

                {
                    xtype       : 'fieldset',
                    title       : 'Item Detail',
                    width       : 835,
                    height      : 350,
                    x           : 10,
                    y           : 135,
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
                            x           : 5,
                            y           : 10,
                            border      :false,
                            items: [cmbArea]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 180,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItem]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 250,
                            x           : 170,
                            y           : 10,
                            border      :false,
                            items: [cmbItemName]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 100,
                            x           : 390,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 130,
                            x           : 380,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtOrderQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 470,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 460,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRate]
                        }, 
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 560,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 130,
                            x           : 550,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtValue]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 670,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMois]
                        },

		        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 670,
                            y           : 10,
                            border      : false,
                            items: [txtMoisture]
                        },





			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 200,
                            x           : 20,
                            y           : 200,
                            border      : false,
                            items: [txtTotQty] 
                        },  





			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 300,
                            x           : 20,
                            y           : 260,
                            border      : false,
                            items: [txtGrossvalue] 
                        },



			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 180,
                            x           : 250,
                            y           : 200,
                            border      : false,
                            items: [txtCGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 170,
                            x           : 390,
                            y           : 200,
                            border      : false,
                            items: [txtCGSTvalue] 
                        },

			{			
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 150,
                            x           : 250,
                            y           : 227,
                            border      : false,
                            items: [txtSGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 390,
                            y           : 227,
                            border      : false,
                            items: [txtSGSTvalue] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 150,
                            x           : 250,
                            y           : 255,
                            border      : false,
                            items: [txtIGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 130,
                            x           : 390	,
                            y           : 255,
                            border      : false,
                            decimalPrecision:2,
                            items: [txtIGSTvalue] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 150,
                            x           : 250,
                            y           : 280,
                            //decimalPrecision:3,
                            border      : false,
                            items: [txttcs]
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 390,
                            y           : 280,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttcsval]
                        },
/*
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 665,
                            y           : 240,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtitemtotValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 250,
                            x           : 300,
                            y           : 280,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttaxablevalue]
                        },
*/
			 btnSubmit,
                     //flx_poDetails,
			flxDetail,
                       
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 250,
                            x           : 550,
                            y           : 250,
                            border      : false,
                            items: [txtPOValue] 
                        }
                    ]
                },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 450,
                            x           : 130,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [flxLedger]
                        },

            ],


        },


/*
        {
            xtype: 'panel',
            title: 'Po-Other Detail',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : 'Other Detail',
                    width       : 850,
                    height      : 480,
                    x           : 5,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : 0,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtorderterms]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : 0,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtpaymentterms]
                        },
 
			{
                    xtype       : 'fieldset',
                    title       : 'Delivery Detail',
                    width       : 780,
		    height	: 210,
                    x           : 10,
                    y           : 230,
                    labelWidth  : 80,
                    border      : true,
                    items : [dtpDuedate]
                } ,
{
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 580,
		    height	: 240,
                    x           : 230,
                    y           : 240,
                    labelWidth  : 80,
                    border      : false,
                    items : [txtdeliveryrem]
                } ,btndelSubmit,flxdeldetail
                    ]
                }
            ]
        }
*/
    ]
});

var TrnPoFormPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PURCHASE ORDER',
    header      : false,
    width       : 827,
    height      : 510,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnPoFormPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
        {
            text: 'Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
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
//edit
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Edit Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {
                gstFlag = "Edit";

 
		PONoListDataStore.load({
		url: 'ClsPo.php',
	        params: {
	            task: 'LoadPONoList',
		    compcode: Gincompcode,
		    finid: GinFinid,
	        },
               callback: function () {
        
		}
	});
                }
            }
        },'-',
			{
//edit
				text: 'View',
				style  : 'text-align:center;',
				tooltip: 'View Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
	                        click: function () {
		  
			 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&finid=" + encodeURIComponent(GinFinid);
				var p3 = "&ordno=" + encodeURIComponent(cmbPONo.getRawValue());
				var param = (p1+p2+p3) ;   
				if (printtype == "PDF")                       
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPurchaseOrder.rptdesign&__format=pdf&' + param); 
				else

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPurchaseOrder.rptdesign' + param); 


                                }
				}
			},'-',
          {
//SAVE
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
                    if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbDespatchThrough.getValue()==0 && cmbDespatchThrough.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Carriage..');
                        gstSave="false";
                    }

                    else if (txtPaymtDays.getRawValue()=="")
                    {
                        Ext.Msg.alert('RM-PO','Enter Credit Days..');
                        gstSave="false";
                    }
                    

                    else if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('RM-PO','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbDespatchThrough.getRawValue()=="")
                    {
                        Ext.Msg.alert('Fuel-PO','Select Carriage..');
                        gstSave="false";
                    }
                    else if (txtPreparedBy.getRawValue()=="")
                    {
                        Ext.Msg.alert('RM-PO','Enter Indent Prepared By..');
                        txtPreparedBy.focus();
                        gstSave="false";
                    }
                  
		    else if (flxDetail.getStore().getCount()==0)
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Item Detail..');
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


                            var amendData = flxAmend.getStore().getRange();                                        
                            var amendupdData = new Array();
                            Ext.each(amendData, function (record) {
                                amendupdData.push(record.data);
                            });




                            Ext.Ajax.request({
                            url: 'TrnOrderAmendmentSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),  
            			cnt: poData.length,  
                             	amendgriddet: Ext.util.JSON.encode(amendupdData),  
            			amendcnt: amendData.length,  
                                  
                                po_company_code:Gincompcode,
                                savetype   :gstFlag,
                                po_finid   :GinFinid,
                                po_date    :Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                                po_duedate :Ext.util.Format.date(dtpDuedate.getValue(),"Y-m-d"),
                                po_vendor_code :supcode,
				po_terms   :txtOrderTerms.getRawValue(),
				po_transport_mode : cmbDespatchThrough.getValue(),
				po_paymode : cmbpaymode.getValue(),
				po_refno   : txtRefNo.getRawValue(),
                                po_refdate :Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
				po_preparedby  : txtPreparedBy.getRawValue(),
				tcsper     : txttcs.getValue(),
				cgstper    : txtCGST.getValue(),
				sgstper    : txtSGST.getValue(),
				igstper    : txtIGST.getValue(),
				itemval    : txtitemtotValue.getValue(),
				creditdays : txtPaymtDays.getValue(),
				roundoff   : 0,
				userid     : GinUserid,
				totval     : txtPOValue.getValue(),
                                pono       : cmbPONo.getValue(),
                                poseqno    : poseqno,
				amendno    : txtAmendNo.getValue(),
				wefdate    : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"),
                                porows     : porows,
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono'] + " Amended" );
//                                    TrnPoFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    flxAmend.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Purchase Order Amended Not Completed! Pls Check!- " + obj['pono']);                                                  
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
                    RefreshData();
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
                    TrnPoWindow.hide();
                }
            }
        }]
    },
    items: [ tabPurchaseOrder ]
});

function RefreshData(){
            porows = 0;
            txtPreparedBy.setRawValue(GinUser);

            flxLedger.hide(); 
	    ordtype="I";
	    txtSGST.show();
	    txtSGSTvalue.show();
	    txtCGST.show();
	    txtCGSTvalue.show();
	   
	    txtIGST.setValue('0');
	    txtIGSTvalue.setValue('0');
	    txtSGST.setValue('0');
	    txtSGSTvalue.setValue('0');
	    txtCGST.setValue('0');
	    txtCGSTvalue.setValue('0');
	    txtDiscount.setValue('0');
	    txtDiscountval.setValue('0');

            dateval=new Date();
            duedateval=new Date();
            gstFlag = "Add";
 
      //      txtorderterms.setRawValue('Pre-Paid');

            PaymentmodeDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'loadpaymode'
                },
		callback : function(){
		  cmbpaymode.setValue(1);
		}
            });

	    CarriageDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'loadcarrtype'
                },

		callback : function(){
		  cmbDespatchThrough.setValue(1);
		}

            });

	    txtPaymtDays.setValue(30);




	




//	              cmbPartyname.focus();
           
}

var dateval,duedateval;
var TrnPoWindow = new Ext.Window({
    height      : 590,
    width       : 1360,
//    x           : 50,
    y           : 30,
    title       : 'PURCHASE ORDER',
    items       : TrnPoFormPanel,bodyStyle:{"background-color":"#eaeded"},
    layout      : 'fit',
    closable    : true,
    minimizable : true,
    maximizable : true,
    //maximized:true,
    resizable   : false,
    border      : false,
    draggable   : false,
  onEsc:function(){
},
 
    listeners:
    {
        show:function(){
              RefreshData();
        }


    }
});
TrnPoWindow.show();
});




