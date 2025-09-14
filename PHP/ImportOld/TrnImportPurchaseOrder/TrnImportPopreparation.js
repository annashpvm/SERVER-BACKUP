Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstFlag;
   var fbo_flg,porate;
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var userid = localStorage.getItem('ginuser');

   var itemhsncode;
   var potype='B';

var supplierid = 184;

   var dept;
var servchrgval = 0;
var servchval = 0;
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
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+sel[i].data.totvalue;
        }
        txttotusd.setValue(Ext.util.Format.number(fdbl_totalvalue,'0.00'));

        txtNetval.setValue(Ext.util.Format.number(fdbl_totalvalue * Number(txtexrate.getValue(),'0.00')));


}


var VendoraddDataStore = new Ext.data.Store({
  id: 'VendoraddDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "vendoradd"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['sup_addr1','sup_addr2','sup_addr3'
  ])
});

var TaxDataStore = new Ext.data.Store({
  id: 'TaxDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
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
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
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
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
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
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "itemdet"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itmh_moisture_per','itmh_tare_per','itmh_convlossper','itmh_outthrough','itmh_prohiper'])
});


var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
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

var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
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

var LoadponoDataStore = new Ext.data.Store({
  id: 'LoadponoDataStore',
  //autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadpono"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'po_no'
  ])
});


var LoadCountryDataStore = new Ext.data.Store({
  id: 'LoadCountryDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadcountry"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'country_name','country_code'
  ])
});

var LoadPortDataStore = new Ext.data.Store({
  id: 'LoadPortDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadport"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'port_name','port_code'
  ])
});

var lblPodate = new Ext.form.Label({
    fieldLabel  : 'PO Date',
    id          : 'lblPodate',
    width       : 60
});

var lblPono = new Ext.form.Label({
    fieldLabel  : 'PO No',
    id          : 'lblPono',
    width       : 60
})
var dtpPodate = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    readOnly   : true,
    anchor     : '100%',
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
		//alert(days5); 
              /*  if((parseInt(days5)>1) || parseInt(days5)<1){
                    Ext.Msg.alert("Alert",'Invalid Date or Wrong Date');
                    dtpPodate.setRawValue(new Date().format('Y-m-d'));
                }*/ //Hold for Testing Jackuline On 17 Apr 2021
              }
    }
});

var lblPartyname = new Ext.form.Label({
    fieldLabel  : 'Party Name',
    id          : 'lblPartyname',
    width       : 60
});

var itemcode;

var cmbPartyname = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 400,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPartyname',
    typeAhead       : true,
    mode            : 'local',
    store           : VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function(){

        }
    }
});



var cmbAgent = new Ext.form.ComboBox({
    fieldLabel      : 'Agent ',
    width           : 400,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbAgent',
    typeAhead       : true,
    mode            : 'local',
    store           : VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function(){
        }
    }
});



var lblItems = new Ext.form.Label({
    fieldLabel  : 'Items',
    id          : 'lblItems',
    width       : 60
});

var lblbuyerpo = new Ext.form.Label({
    fieldLabel  : 'Prod No',
    id          : 'lblbuyerpo',
    width       : 60
});


var icode,deptcode;
var cmbItems = new Ext.form.ComboBox({
    fieldLabel      : 'Item',
    width           : 300,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItems',
    typeAhead       : true,
    mode            : 'local',
    store           : ItemLoadDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){

			ItemDetailsDataStore.load({
                        url: 'ClsImportPo.php',
                        params:
                            {
                                task:"itemdet",
                                itemcode: cmbItems.getValue()
                            },
                            scope: this,
                            callback: function () 
				{
                                txtmoisture.setValue(ItemDetailsDataStore.getAt(0).get('itmh_moisture_per'));
                                txttare.setValue(ItemDetailsDataStore.getAt(0).get('itmh_tare_per'));
                                txtoutthrow.setValue(ItemDetailsDataStore.getAt(0).get('itmh_outthrough'));
                                txtprohibitive.setValue(ItemDetailsDataStore.getAt(0).get('itmh_prohiper'));


                            }
                        });         
        }
    }
});


var cmborgincountry = new Ext.form.ComboBox({
    fieldLabel      : 'Orgin Country',
    width           : 250,
    displayField    : 'country_name',
    valueField      : 'country_code',
    hiddenName      : 'country_code',
    id              : 'cmborgincountry',
    typeAhead       : true,
    mode            : 'local',
    store           : LoadCountryDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){
        }
    }
});

var cmborginport = new Ext.form.ComboBox({
    fieldLabel      : 'Orgin Port',
    width           : 250,
    displayField    : 'port_name',
    valueField      : 'port_code',
    hiddenName      : 'port_code',
    id              : 'cmborginport',
    typeAhead       : true,
    mode            : 'local',
    store           : LoadPortDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){
        }
    }
});

var cmbarrivalport = new Ext.form.ComboBox({
    fieldLabel      : 'Arrival Port',
    width           : 250,
    displayField    : 'port_name',
    valueField      : 'port_code',
    hiddenName      : 'port_code',
    id              : 'cmbarrivalport',
    typeAhead       : true,
    mode            : 'local',
    store           : LoadPortDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){
        }
    }
});

var txtqono = new Ext.form.TextField({
    fieldLabel  : 'Qo No',
    id          : 'txtqono',
    width       : 80,
    name        : 'txtqono'
});


var lblUom = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lblUom',
    width       : 50
});

var txtmoisture = new Ext.form.TextField({
    fieldLabel  : 'Moisture%',
    id          : 'txtmoisture',
    width       : 50,
    name        : 'stock'
});

var txttare = new Ext.form.TextField({
    fieldLabel  : 'Tare%',
    id          : 'txttare',
    width       : 50,
    name        : 'stock'
});

var txtpono = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtpono',
    width       : 60,
    name        : 'Po No',
    readOnly:true,
    listeners:{
    change:function(){
    }
    }
});

var txtexrate = new Ext.form.NumberField({
    fieldLabel  : 'Ex.Rate',
    id          : 'txtexrate',
    width       : 70,
    name        : 'txtexrate',
    enableKeyEvents : true,
    listeners:{
       keyup:function(){
           grid_tot();
        }
    }
});

var txtreference = new Ext.form.TextField({
    fieldLabel  : 'Reference',
    id          : 'txtreference',
    width       : 300,
    name        : 'txtreference',
    listeners:{
    change:function(){
    }
    }
});

var txtcrdays = new Ext.form.NumberField({
    fieldLabel  : 'Credit Days',
    id          : 'txtcrdays',
    width       : 70,
    name        : 'txtcrdays',
    listeners:{
    change:function(){
    }
    }
});


var txtlcdays = new Ext.form.NumberField({
    fieldLabel  : 'LC Days',
    id          : 'txtlcdays',
    width       : 70,
    name        : 'txtlcdays',
    listeners:{
    change:function(){
    }
    }
});

var txtnegotiationdays = new Ext.form.NumberField({
    fieldLabel  : 'Negotiation Days',
    id          : 'txtnegotiationdays',
    width       : 70,
    name        : 'txtnegotiationdays',
    listeners:{
    change:function(){
    }
    }
});

var lblQono = new Ext.form.Label({
    fieldLabel  : 'Qo No',
    id          : 'lblQono',
    width       : 50
});


var lblPendqty = new Ext.form.Label({
    fieldLabel  : 'Al PoQty',
    id          : 'lblPendqty',
    width       : 70
});

var lblbomqty = new Ext.form.Label({
    fieldLabel  : 'Bom.Qty',
    id          : 'lblbomqty',
    width       : 70
});



var lblReqqty = new Ext.form.Label({
    fieldLabel  : 'Po.Qty',
    id          : 'lblReqqty',
    width       : 70
});

var txtReqqty = new Ext.form.TextField({
    fieldLabel  : 'Qty',
    id          : 'txtReqqty',
    width       : 70,
    name        : 'requiredqty',
    enableKeyEvents: true,
    listeners:{
        keyup:function(){
            
           // txtValue.setValue(parseFloat(txtReqqty.getValue()* txtUrate.getValue()));  
	   
fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtUrate.getRawValue()*txtReqqty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtUrate.getRawValue())*Number(txtReqqty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);

            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            porate=Ext.util.Format.number(txtUrate.getValue(),"0.00"); 
        },
        keydown:function(){ 
       
            //txtValue.setValue(parseFloat(txtReqqty.getValue())* txtUrate.getValue());
		fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtUrate.getRawValue()*txtReqqty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtUrate.getRawValue())*Number(txtReqqty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            porate=Ext.util.Format.number(txtUrate.getValue(),"0.00");

        },
       blur:function(){
        
           // txtValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue())); 
	 fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtUrate.getRawValue()*txtReqqty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtUrate.getRawValue())*Number(txtReqqty.getRawValue()),'0.00');
           txtValue.setRawValue(fdbl_totalvalue);
            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            porate=Ext.util.Format.number(txtUrate.getValue(),"0.00");
//Ext.util.Format.number(Number(this.getValue()) * Number(itm_qty), '0.00');
        }      
    }
});

var lblQorate = new Ext.form.Label({
    fieldLabel  : 'Qo Rate',
    id          : 'lblQorate',
    width       : 50
});

var txtoutthrow = new Ext.form.TextField({
    fieldLabel  : 'Out Throw%',
    id          : 'txtoutthrow',
    width       : 60,
    name        : 'qorate',
    readOnly    : false,
    enableKeyEvents: true,   
});

var txtprohibitive = new Ext.form.TextField({
    fieldLabel  : 'Prohibitive %',
    id          : 'txtprohibitive',
    width       : 80,
    name        : 'qorate',
    readOnly    : false,
    enableKeyEvents: true,   
});


var txtUrate = new Ext.form.TextField({
    fieldLabel  : 'U.Rate',
    id          : 'txtUrate',
    width       : 80,
    name        : 'qorate',
    readOnly    : false,
    enableKeyEvents: true,   
    disabled:false,
    listeners   :{
	keyup:function(){
          
	  /*  var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtUrate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");*/
               
	//txtUrate.setValue(Ext.util.Format.number(changeporate,"0.00"));
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
        },
	keydown:function(){
          
	   /* var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtUrate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");
               
	txtUrate.setValue(Ext.util.Format.number(changeporate,"0.00"));*/
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
        },
	blur:function(){
          
	    var changeporate = 0;
	    
             changeporate=Ext.util.Format.number(Number(txtUrate.getValue()),"0.00");
	    
	    
		//alert(Ext.util.Format.number(changeporate,'0.000'));
	    changeporate = Ext.util.Format.number(changeporate,"0.00");
               
	txtUrate.setValue(Ext.util.Format.number(changeporate,"0.00"));
            //Ext.MessageBox.alert(asr);
            txtValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
            txtitemtotValue.setValue(parseFloat(txtReqqty.getValue()*txtUrate.getValue()));
        }
    }

});


var lblItemremark = new Ext.form.Label({
    fieldLabel  : 'Item Remark',
    id          : 'lblItemremark',
    width       : 100
});

var txtItemremark = new Ext.form.TextField({
    fieldLabel  : 'Item Remark',
    id          : 'txtItemremark',
    width       : 500,
    name        : 'itemremark',
     style      :{textTransform:"uppercase"},
        listeners:{
           change: function(field,newValue,oldValue){
                   field.setValue(newValue.toUpperCase());
             }
        }
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 50
});

var lblcurrency = new Ext.form.Label({
    fieldLabel  : 'Currency',
    id          : 'lblcurrency',
    width       : 50
});

var txtValue = new Ext.form.TextField({
    fieldLabel  : 'Value $',
    id          : 'txtValue',
    width       : 100,
    name        : 'txtvalue',
    readOnly:true,
    listeners:{
    blur:function(){
		fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtUrate.getRawValue()*txtReqqty.getRawValue());
	   fdbl_totalvalue=Ext.util.Format.number(Number(txtUrate.getRawValue())*Number(txtReqqty.getRawValue()),'0.00');
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
    listeners:{
    blur:function(){
          // fdbl_totalvalue=parseFloat(txtUrate.getRawValue()*txtReqqty.getRawValue());
    }
    }
});
var igstval;
var igstdiscoval;
var totigval;





var txtCurrency = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtCurrency',
    width       : 80,
    name        : 'currency'
});

var btndelSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Submit",
    width   : 50,
    height  : 20,
    x       : 630,
    y       : 310,
    listeners:{
        click: function(){              
	    var gstadd="true";
	if(txtdeliveryrem.getRawValue()==0 || txtdeliveryrem.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Pur-Ord", "Enter Delivery Remarks..");  	
	}            
	else 
	{
                 var RowCnt1 = flxdeldetail.getStore().getCount() + 1;
                    flxdeldetail.getStore().insert(
                        flxdeldetail.getStore().getCount(),
                        new dgrecord({
                            slno:RowCnt1,
                            deldate: Ext.util.Format.date(dtpDeliverydate.getValue(),"Y-m-d"),
                            deliremarks:txtdeliveryrem.getRawValue()
                        }) 
                        );
        }
}
}
});

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 850,
    y       : 40,
bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();

	    var gstadd="true";
	
	if(cmbPartyname.getValue()==0) 
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Supplier..");  	
	}            
	else if(cmbItems.getValue()==0 || cmbItems.getRawValue()=="")
	{
                Ext.MessageBox.alert("Pur-Ord", "Select Item..");  
                 gstadd="false";
        }
	/*else if(txtqono.getValue() == '')
	{
                Ext.MessageBox.alert("Pur-Ord", "Enter QoNo..");
                 gstadd="false";
        }*/
	else if((txtReqqty.getValue() == '') || (txtReqqty.getValue() == 0))
	    {
                Ext.MessageBox.alert("Pur-Ord", "Po Qty Should not be Zero..");
                 gstadd="false";
            }
	else if(txtUrate.getValue()==0)
	{
                Ext.MessageBox.alert("Pur-Ord", "Enter Rate..");
                gstadd="false";
        }  

            if(gstadd=="true")
            {
		
                var ginitemseq = cmbItems.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq === cmbItems.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }
                
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
                            itemname: cmbItems.getRawValue(),
                            reqqty:txtReqqty.getRawValue(),
                            unitrate:txtUrate.getRawValue(),
                            totvalue:parseFloat(txtUrate.getRawValue()*txtReqqty.getRawValue()),

                            itemseq  : cmbItems.getValue(),
	                    qono     : txtqono.getValue(),
			    qty      : txtReqqty.getValue(),
                            moisture : txtmoisture.getValue(),
       			    tare     : txttare.getValue(),
                            outthrow : txtoutthrow.getValue(),
                            prohibitive: txtprohibitive.getValue(),
                        }) 
                        );
                            grid_tot();
                            
                            txtReqqty.setValue("0.000");
                            txtUrate.setValue("0.00");
                            txtValue.setValue("0.00");
                }
                
            }
        }
    }
});

    

var txttotusd = new Ext.form.NumberField({
    fieldLabel  : 'Total US $',
    id          : 'txttotusd',
    name        : 'txttotusd',
    width       : 100,
    readOnly: true,
    allowBlank: true,
    listeners : {
        change:function()
        {

        },
    }


});

var txtNetval = new Ext.form.NumberField({
    fieldLabel  : 'Net Value Rs.',
    id          : 'txtNetval',
    name        : 'txtNetval',
    width       : 150,
    readOnly: true,
    allowBlank: true
});




var int_status ="Y";
var optINTtype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Interest Type',
    fieldLabel: '',
    layout : 'hbox',
    width:120,
    height:80,
   x:800,
   y:3,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optINTtype',
        items: [
            {boxLabel: 'Yes', name: 'optINTtype', id:'optINTyes', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            int_status="Y";
               }
              }
             }
            },
            {boxLabel: 'No', name: 'optINTtype', id:'optINTno', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            int_status="N";
               }
              }
             }}
        ]
    }
    ]
});

var vartyfor ="N";
var optvartytype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Variety Type',
    fieldLabel: '',
    layout : 'hbox',
    width:120,
    height:80,
    x:800,
    y:100,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optvartytype',
        disabled:true,
        items: [
            {boxLabel: 'Newsprint', name: 'optvartytype', id:'optvartynp', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            vartyfor="N";
               }
              }
             }
            },
            {boxLabel: 'Others', name: 'optvartytype', id:'optvartyothers', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            vartyfor="O";
               }
              }
             }}
        ]
    }
    ]
});


var ordtype="I";

var optpotype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:45,
    x:700,
    y:10,
    border: true,

    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optpotype',   
        disabled:true,
        items: [
            {boxLabel: 'Indent', name: 'optpotype', id:'optind', inputValue: 1,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            ordtype="I";
               }
              }
             }
            },
            {boxLabel: 'Direct', name: 'optpotype', id:'optdir', inputValue: 2,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            ordtype="D";
               }
              }
             }}
        ]
    }
    ]
});

var ordsource = "M";
var optcomptype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:45,
    x:700,
    y:60,
    border: true,
    disabled:true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optcomptype',
        items: [
            {boxLabel: 'HO', name: 'optcomptype', id:'optho', inputValue: 1,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	ordsource = "H";
               }
              }
             }
            },
            {boxLabel: 'MILL', name: 'optcomptype', id:'optmill', inputValue: 2,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	ordsource = "M";
               }
              }
             }}
        ]
    }
    ]
});

var dtpwefdate = new Ext.form.DateField({
    fieldLabel : 'WEF Date',
    id         : 'dtpwefdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,

});




var dtpDeliverydate = new Ext.form.DateField({
    fieldLabel : 'Delivery Date',
    id         : 'dtpDeliverydate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
/*
    listeners:{
            change:function(){
                duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                
            }
    }
*/
});


var txtorderterms = new Ext.form.TextField({
    fieldLabel  : 'Order Terms',
    id          : 'txtorderterms',        
    width       : 250,
    name        : 'modeoftransport',
    style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtpaymentterms = new Ext.form.TextField({
    fieldLabel  : 'Payment Terms',
    id          : 'txtpaymentterms',
    width       : 250,
    name        : 'paymentdays',
     style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});




var txtRemarks = new Ext.form.TextArea({
    fieldLabel  : 'Remarks',
    id          : 'txtRemarks',
    width       : 400,
    height      : 50,
    name        : 'remarks',
     style       :{textTransform:"uppercase"},
    listeners:{
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

var cmbpaymode = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Mode',
    width           : 250,
    displayField    : 'term_name',
    valueField      : 'term_code',
    hiddenName      : 'term_code',
    store           : PaymentmodeDataStore,
    id              : 'cmbpaymode',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false
});  

var cmbcarriage = new Ext.form.ComboBox({
    fieldLabel      : 'Carriage Type',
    width           : 250,
    displayField    : 'carr_name',
    valueField      : 'carr_code',
    hiddenName      : 'carr_code',
    store           : CarriageDataStore,
    id              : 'cmbcarriage',
    typeAhead       : true,
    mode            : 'remote',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false
});

var cmbfreight = new Ext.form.ComboBox({
    fieldLabel      : 'Freight Type',
    width           : 250,
    displayField    : 'field2',
    valueField      : 'field1',
    hiddenName      : 'field1',
    store           : [[0, 'PAID BY US'],[1,'PAID BY SUPPLIER'],[2,'PAID BY THIRD PARTY']],
    id              : 'cmbfreight',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : true,
    allowblank      : false,
    listeners:{
    select: function(){
	supplierid = 184;


	if (cmbfreight.getValue() === 2 )
	{
		cmbfrparty.setDisabled(false);
	}
	else
	{
		cmbfrparty.setDisabled(true);
	}
/*	

	    VendorDataStore.removeAll();
	    VendorDataStore.load({
                url: 'ClsImportPo.php',
                params: {
                    task: 'loadsupplier',
		    supplierid: supplierid
                }
            });
*/
	supplierid = 184;
    }
    }
});

var cmbfrparty = new Ext.form.ComboBox({
    fieldLabel      : 'Freight Party',
    width           : 250,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    store           : VendorDataStore,
    id              : 'cmbfrparty',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : true,
    allowblank      : false

});
 
var dgrecorddel = Ext.data.Record.create([]);
var flxdeldetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:30,
    y:340,
    height: 80,
    hidden:false,
    width: 700,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Delivery Date", dataIndex: 'deldate',sortable:true,width:150,align:'left'},
        {header: "Delivery Remarks", dataIndex: 'deliremarks',sortable:true,width:400,align:'left'}
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
           var sm = flxdeldetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxdeldetail.getStore().remove(selrow);
        flxdeldetail.getSelectionModel().selectAll();
        grid_tot();
        
       }
      }
     });         
    }

   }
});


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:90,
    height: 160,
    hidden:false,
    width: 900,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},
        {header: "Qty", dataIndex: 'qty',sortable:true,width:90,align:'left'},
        {header: "$ Rate", dataIndex: 'unitrate',sortable:true,width:90,align:'left'},
        {header: "$ Value", dataIndex:'totvalue',sortable:true,width:100,align:'left'},
        {header: "Qo No", dataIndex:'qono',sortable:true,width:100,align:'left'},        
        {header: "Moisture%", dataIndex:'moisture',sortable:true,width:100,align:'left'}, 
        {header: "Out Throw%", dataIndex:'outthrow',sortable:true,width:100,align:'left'},
        {header: "Tare%", dataIndex:'tare',sortable:true,width:100,align:'left'}, 
        {header: "Prohibitive%", dataIndex:'prohibitive',sortable:true,width:100,align:'left'}, 
        {header: "Item Seq", dataIndex: 'itemseq',sortable:true,width:80,align:'left',hidden:true},
      //  {header: "Ind Seqno", dataIndex: 'indseqno',sortable:true,width:80,align:'left',hidden:true},
      //  {header: "Qo Seqno", dataIndex: 'qoseqno',sortable:true,width:80,align:'left',hidden:true},
       // {header: "Currency", dataIndex: 'currency',sortable:true,width:100,align:'left',hidden:true}
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


var tabPurchaseOrder = new Ext.TabPanel({
    id          : 'PurchaseOrder',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1500,
    x           : 2,
    items       : [
        {
            xtype: 'panel',
            title: 'Po-Preparation',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 960,
                    height      : 130,
                    x           : 10,
                    y           : 0,
                    border      : true,
                    layout      : 'absolute',
                    items: [optpotype,optcomptype,
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : -20,
                            y           : 20,
                            labelWidth  : 20,
                            border      : false,
                            items : [txtpono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 82,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPodate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 75,
                            y           : 20,
                            labelWidth  : 1,
                            border      : false,
                            items : [dtpPodate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 210,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPartyname]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 430,
                            x           : 200,
                            y           : 20,
                            border      : false,
                            items: [cmbPartyname]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 500,
                            x           : 150,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbAgent]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 500,
                            x           : 150,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtreference]
                        },
                    ]
                },
                {
                    xtype       : 'fieldset',
                    title       : 'Item Detail',
                    width       : 960,
                    height      : 350,
                    x           : 10,
                    y           : 135,
                    border      : true,
                    layout      : 'absolute',
                    items: [
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 400,
                            x           : 10,
                            y           : -10,
                            border      : false,
                            items: [cmbItems]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 200,
                            x           : 380,
                            y           : -10,
                            border      : false,
                            items: [txtqono]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 200,
                            x           : 540,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtReqqty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 200,
                            x           : 680,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtUrate]
                        }, 
                      


			

                      
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 400,
                            x           : 10,
                            y           : 40,
                            border      : false,
                            items: [txtmoisture]
                        },
                      
      
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 400,
                            x           : 150,
                            y           : 40,
                            border      : false,
                            items: [txttare]
                        },

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 90,
                            width       : 200,
                            x           : 290,
                            y           : 40,
                            border      : false,
                            items: [txtoutthrow]
                        },

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 90,
                            width       : 180,
                            x           : 470,
                            y           : 40,
                            border      : false,
                            items: [txtprohibitive]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 250,
                            x           : 650,
                            y           : 40,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtValue]
                        },   
                         
                   /*     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 40,
                            width       : 170,
                            x           : 130,
                            y           : 210,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtDiscount]
                        },  
{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 130,
                            y           : 240,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtDiscountval]
                        }, 
   			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 170,
                            x           : 0,
                            y           : 210,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtothersnew]
                        },  
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 20,
                            y           : 240,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtOthersvalnew]
                        }, */

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 65,
                            width       : 200,
                            x           : 0,
                            y           : 280,
                            border      : false,
                            items: [txttotusd] 
                        },
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

			 btnSubmit,
                     //flx_poDetails,
			flxDetail,
                       
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 250,
                            x           : 580,
                            y           : 280,
                            border      : false,
                            items: [txtNetval] 
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Po-Other Detail',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : 'Other Detail',
                    width       : 950,
                    height      : 480,
                    x           : 5,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [

/*

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 200,
                            x           : 200,
                            y           : 3,
                            defaultType : 'textfield',
                            border      : false,
                            items: [optINTtype]
                        },
*/
			optINTtype,
			optvartytype,
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 300,
                            x           : 0,
                            y           : 3,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtexrate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 300,
                            x           : 0,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtcrdays]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : 0,
                            y           : 60,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtlcdays]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : 0,
                            y           : 90,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtnegotiationdays]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : 120,
                            border      : false,
                            items: [cmborgincountry]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : 150,
                            border      : false,
                            items: [cmborginport]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : 180,
                            border      : false,
                            items: [cmbarrivalport]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtorderterms]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtpaymentterms]
                        },


                       
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 60,
                            border      : false,
                            items: [cmbpaymode]
                        },
{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 90,
                            border      : false,
                            items: [cmbcarriage]
                        },
{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 120,
                            border      : false,
                            items: [cmbfreight]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 150,
                            border      : false,
                            items: [cmbfrparty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 600,
                            x           : 0,
                            y           : 230,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRemarks]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 400,
                            y           : 180,
                            border      : false,
                            items: [dtpwefdate]
                        },


			{
                    xtype       : 'fieldset',
                    title       : 'Delivery Detail',
                    width       : 780,
		    height	: 150,
                    x           : 10,
                    y           : 290,
                    labelWidth  : 80,
                    border      : true,
                    items : [dtpDeliverydate]
                } ,
{
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 580,
		    height	: 240,
                    x           : 230,
                    y           : 300,
                    labelWidth  : 120,
                    border      : false,
                    items : [txtdeliveryrem]
                } ,btndelSubmit,flxdeldetail
                    ]
                }
            ]
        }
    ]
});

var TrnPoFormPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PURCHASE ORDER',
    header      : false,
    width       : 950,
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

	         if (flxDetail.getStore().getCount()==0)
                    {
                        Ext.Msg.alert('Pur-Ord','Item Details Grid  is empty..');
                        gstSave="false";
                    } 
		    else if (flxdeldetail.getStore().getCount()==0)
                    {
                        Ext.Msg.alert('Pur-Ord',' Delivery Grid details is empty..');
                        gstSave="false";
                    } 
 
                    else if (txtorderterms.getRawValue()==0 || txtorderterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Order Terms.....');
                        gstSave="false";
                    }
                    else if (txtpaymentterms.getRawValue()==0 || txtpaymentterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Payment Terms..');
                        gstSave="false";
                    }
                    else if (txtcrdays.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Credit Days..');
                        gstSave="false";
                    }
                    

                    else if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbcarriage.getValue()==0 || cmbcarriage.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Carriage..');
                        gstSave="false";
                    }
		   else if ( cmbfreight.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Type..');
                        gstSave="false";
                    } 
		   else if (((cmbfreight.getValue() == 3)) && (cmbfrparty.getValue()==0 || cmbfrparty.getRawValue()==""))
			
			{
				Ext.Msg.alert('Fuel-PO','Select Freight Party..');
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

                            var deliData = flxdeldetail.getStore().getRange();                                        
                            var deliupdData = new Array();
                            Ext.each(deliData, function (record) {
                                deliupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnImportPOPreparationSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),                                      
				deligriddet : Ext.util.JSON.encode(deliupdData),                                                
                               
//                                po_duedate:Ext.util.Format.date(dtpDeliverydate.getValue(),"Y-m-d"),
                        
				cnt: poData.length,
				delicnt : deliData.length,

                                ordhcompcode  : Gincompcode,
                                ordhfincode   : GinFinid,
				ordhfrom      : ordsource,
                                ordhrefno     : txtreference.getRawValue(), 
                                ordhsup_code  : cmbPartyname.getValue(),
                                ordhagent     : cmbAgent.getValue(),
                                ordhdate      : Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"), 
                                ordhterms     : txtorderterms.getRawValue(),
                                ordhcarriagetype  : cmbcarriage.getValue(),
                                ordhorigincountry : cmborgincountry.getValue(),   
                                ordhoriginport    : cmborginport.getValue(),   
                                ordharrivalport   : cmbarrivalport.getValue(),   
                        	ordhpaymode       : cmbpaymode.getValue(),
                                ordhlcdays        : txtlcdays.getValue(),
                                ordhnagodays      : txtnegotiationdays.getValue(),
                                ordhcreditdays    : txtcrdays.getValue(),
                                ordhinterstatus   : int_status,
				ordhpayterms      : txtpaymentterms.getRawValue(),
                                ordhremarks       : txtRemarks.getRawValue(),
				ordhfrttype       : cmbfreight.getValue(),
                                ordhfrtparty_code : cmbfrparty.getValue(),
				ordhitemcurvalue  : txttotusd.getRawValue(),
				ordhexrate        : txtexrate.getRawValue(),
				ordhitemvalue     : txtNetval.getRawValue(),
				ordhstatus        : "O",
				ordhamndstatus    : "N",
				ordhamndposeqno   : 0,
				ordhusr_code      : userid,
				ordhentry_date    : Ext.util.Format.date(new Date(),"Y-m-d"),
				ordhwef_date      : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d"),
                                varty             : vartyfor,

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono']);
                                    TrnPoFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
				    flxdeldetail.getStore().removeAll();
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
                    TrnPoWindow.hide();
                }
            }
        }]
    },
    items: [ tabPurchaseOrder ]
});

function RefreshData(){
    gstFlag = "Add";
    dateval=new Date();

            duedateval=new Date();
      	supplierid = 184;
       VendorDataStore.load({
                url: 'ClsImportPo.php',
                params: {
                    task : 'loadsupplier',
                    supplierid: supplierid
                }
            });


            LoadponoDataStore.load({
                url: 'ClsImportPo.php',
                params: {
                    task: 'loadpono',
                    finid    : GinFinid,
                    compcode : Gincompcode   ,

                },
                callback: function () 
		{

                    txtpono.setValue(LoadponoDataStore.getAt(0).get('po_no'));
                }

            });

            cmbPartyname.focus();
           
}

var dateval,duedateval;
var TrnPoWindow = new Ext.Window({
    height      : 590,
    width       : 1000,
    x : 120,
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
    listeners:
    {
        show:function(){
            //alert(potype);
           // txtIGST.hide();
           // txtIGSTvalue.hide();
	    ordtype="I";

            dateval=new Date();
            duedateval=new Date();

/*  
            VendorDataStore.load({

                url: 'ClsImportPo.php',
                params: {
                    task: 'loadsupplier',
		    supplierid: supplierid
                }
            });
*/

	 PaymentmodeDataStore.load({
                url: 'ClsImportPo.php',
                params: {
                    task: 'loadpaymode'
                }
            });

		CarriageDataStore.load({
                url: 'ClsImportPo.php',
                params: {
                    task: 'loadcarrtype'
                }
            });

            ItemLoadDataStore.removeAll();
            ItemLoadDataStore.load({
            url: 'ClsImportPo.php',
            params:
                {
                    task:"LoadItem"
                },
            callback: function(){
                    var cnt=ItemLoadDataStore.getCount();
                    if(cnt>0){
                        cmbItems.setRawValue(ItemLoadDataStore.getAt(0).get('itmh_name'));
                        itemcode=ItemLoadDataStore.getAt(0).get('itmh_code');
                    }else{
                        cmbItems.setValue("");
                        Ext.Msg.alert("Alert",'No Item Found.. ');
				cmbPartyname.focus();
                         }
                       }
              });

RefreshData();
              cmbPartyname.focus();
          }
    }
});
TrnPoWindow.show();
});




