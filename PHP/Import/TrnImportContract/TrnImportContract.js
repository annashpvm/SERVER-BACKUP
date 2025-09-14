Ext.onReady(function(){
   Ext.QuickTips.init();

   var gstFlag;
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var userid = localStorage.getItem('ginuser');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var portcode = 0;
var ordseqno = 0;
var poseqno = 0;

var invqty = 0;

var PODetailDataStore = new Ext.data.Store({
  id: 'PODetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsMasContract.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPODetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_terms', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_itemvalue', 'ordh_roundingoff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'ordt_hdseqno', 'ordt_seqno', 'ordt_item_code', 'ordt_indh_seqno', 'ordt_enqh_seqno', 'ordt_qty', 'ordt_rec_qty', 'ordt_can_qty', 'ordt_pen_qty', 'ordt_unit_rate', 'ordt_item_value', 'ordt_edpercentage', 'ordt_moisper', 'ordt_tareper', 'ordt_status', 'ordt_educessper', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_group','itmh_outthrough','itmh_prohiper','itmh_hsncode','ordt_outper' ,'ordh_refno','ordh_refdate','ordh_preparedby','ordh_payterms','ordh_deliveryterms','ordh_origincountry','ordh_originport','cmbDischargePort','ordh_arrivalport','ordh_shiftment','ordh_remarks', 'ordh_bankacno', 'ordh_bankname', 'ordh_bankcode', 'ordh_branchcode', 'ordh_swiftcode', 'ordh_bankadd1', 'ordh_bankadd2', 'ordh_bankadd3','ordh_agent_code' ,'ordt_inv_qty', 'ordt_usdrate','ordt_usdvalue'
  ])
});

var PONoDataStore = new Ext.data.Store({
  id: 'PONoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsMasContract.php',      // File to connect to
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


var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsMasContract.php',      // File to connect to
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
 autoLoad :true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsMasContract.php',      // File to connect to
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


var btnSubmit = new Ext.Button({
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
    text    : "ADD",
    width   : 80,
    height  : 35,
  // labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//bodyStyle:{"background-color":"#ebebdf"},
//style : "font-size:14px;font-weight:bold",
 listeners:{
        click: function(){       
	    var gstadd="true";
//alert(cmbCustomer.getValue());

	    if(cmbItem.getRawValue()=="" || cmbItem.getValue()==0)
	    {
		alert("Select Item Name..");
                gstadd="false";
                cmbItem.setFocus();
	    }



	    if(txtRate.getRawValue()=="" || txtRate.getValue()==0)
	    {
		alert("Rate is zero..");
                gstadd="false";
                txtRate.setFocus();
	    }

	    if(txtQty.getRawValue()=="" || txtQty.getValue()==0)
	    {
		alert("Enter Order  Quantity..");
                gstadd="false";
                txtQty.setFocus();
	    }

            if(gstadd=="true")
            { 
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemcode === cmbItem.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

//alert(gstadd);
//alert(gridedit);
        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('itemcode' , cmbItem.getValue());
			sel[idx].set('itemname' , cmbItem.getRawValue());
			sel[idx].set('qty'      , txtQty.getValue());
			sel[idx].set('rate'     , txtRate.getValue());
			sel[idx].set('value'    , Number(txtQty.getValue())* Number(txtRate.getValue()) );

			flxDetail.getSelectionModel().clearSelections();
		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      
    



                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
		                   itemcode   : cmbItem.getValue(),
		                   itemname   : cmbItem.getRawValue(),
			           qty        : txtQty.getValue(),
                                   rate       : Number(txtRate.getValue()),
				   value      : Number(txtQty.getValue()) * Number(txtRate.getValue()),

                        }),
                   );

                   txtQty.setValue('');
                   txtRate.setValue('');

    
                }

             }

 grid_tot();
      }
      
     }
});
var txtPONo = new Ext.form.TextField({
        fieldLabel  : 'Contract No.',
        id          : 'txtPONo',
        name        : 'txtPONo',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtTotQty = new Ext.form.TextField({
        fieldLabel  : 'Total Qty.',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtTotValue = new Ext.form.TextField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

var txtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          decimalPrecision: 3,

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtRefNo = new Ext.form.TextField({
        fieldLabel  : 'Ref/Ind. No.',
        id          : 'txtRefNo',
        name        : 'txtRefNo',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankACNo = new Ext.form.TextField({
        fieldLabel  : 'Bank A/c No.',
        id          : 'txtBankACNo',
        name        : 'txtBankACNo',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankName = new Ext.form.TextField({
        fieldLabel  : 'Bank Name.',
        id          : 'txtBankName',
        name        : 'txtBankName',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankCode = new Ext.form.TextField({
        fieldLabel  : 'Bank Code.',
        id          : 'txtBankCode',
        name        : 'txtBankCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBranchCode = new Ext.form.TextField({
        fieldLabel  : 'Branch Code.',
        id          : 'txtBranchCode',
        name        : 'txtBranchCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtSwiftCode = new Ext.form.TextField({
        fieldLabel  : 'Swift Code.',
        id          : 'txtSwiftCode',
        name        : 'txtSwiftCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankAdd1 = new Ext.form.TextField({
        fieldLabel  : 'Address ',
        id          : 'txtBankAdd1',
        name        : 'txtBankAdd1',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankAdd2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtBankAdd2',
        name        : 'txtBankAdd2',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtBankAdd3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtBankAdd3',
        name        : 'txtBankAdd3',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtShipDetails = new Ext.form.TextField({
        fieldLabel  : 'Shipment Details',
        id          : 'txtShipDetails',
        name        : 'txtShipDetails',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtDeliveryRemarks = new Ext.form.TextField({
        fieldLabel  : 'Delivery Remarks',
        id          : 'txtDeliveryRemarks',
        name        : 'txtDeliveryRemarks',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });
var dtpPodate = new Ext.form.DateField({
    fieldLabel : 'Date ',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
              }
    }
});


function grid_tot(){
        var totqty = 0;
        var totval = 0;

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totqty = totqty + Number(sel[i].data.qty);
            totval =  totval + Number(sel[i].data.value);               
        }

        txtTotQty.setValue(totqty);  
        txtTotValue.setValue(totval);
}




var dtpRefdate = new Ext.form.DateField({
    fieldLabel : 'Ref. Date ',
    id         : 'dtpRefdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
              }
    }
});


var lblItems = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItems',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(t)',
    id          : 'lblQty',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblRate = new Ext.form.Label({
    fieldLabel  : 'USD Rate',
    id          : 'lblRate',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})



var txtSpec_wt_per_container = new Ext.form.TextField({
        fieldLabel  : 'Weight per Containers(Mts)',
        id          : 'txtSpec_wt_per_container',
        name        : 'txtSpec_wt_per_container',
        width       :  150,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : '25',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtSpec2_qty_diff = new Ext.form.TextField({
        fieldLabel  : 'Quantity difference',
        id          : 'txtSpec2_qty_diff',
        name        : 'txtSpec2_qty_diff',
        width       :  150,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
//        value    : '+ / 10 %',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtSpec3_shipping_line = new Ext.form.TextField({
        fieldLabel  : 'Shipping Line',
        id          : 'txtSpec3_shipping_line',
        name        : 'txtSpec3_shipping_line',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : '',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtSpec4_free_days = new Ext.form.TextField({
        fieldLabel  : 'Free Days',
        id          : 'txtSpec4_free_days',
        name        : 'txtSpec4_free_days',
        width       :  150,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : '21 Calendar days only',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtSpec5_moisture = new Ext.form.TextField({
        fieldLabel  : 'Moisture',
        id          : 'txtSpec5_moisture',
        name        : 'txtSpec5_moisture',
        width       :  150,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : 'As per global standard',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });



var txtSpec6_material = new Ext.form.TextField({
        fieldLabel  : 'Material',
        id          : 'txtSpec6_material',
        name        : 'txtSpec6_material',
        width       :  150,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : '',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });



var txtSpec6_local_charges = new Ext.form.TextField({
        fieldLabel  : 'Local Charges',
        id          : 'txtSpec6_local_charges',
        name        : 'txtSpec6_local_charges',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
        value    : 'as per Liners / Carriers',    

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var LoadPortDataStore = new Ext.data.Store({
      id: 'LoadPortDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasContract.php',      // File to connect toClsMasContract
                method: 'POST'
            }),
            baseParams:{task:"loadPortList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'port_code', 'port_name','country_code','country_name',
      ]),
    });



var LoadCountryDataStore = new Ext.data.Store({
      id: 'LoadCountryDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasContract.php',      // File to connect toClsMasContract
                method: 'POST'
            }),
            baseParams:{task:"loadCountryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'country_code','country_name'
      ]),
    });	


var cmbCountry = new Ext.form.ComboBox({
        fieldLabel      : 'Country of Orgin ',
        width           : 200,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbCountry',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
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
                    } 
       }
  });


var cmbLoadingPort= new Ext.form.ComboBox({
        fieldLabel      : 'Loading Port',
        width           : 200,
        displayField    : 'port_name', 
        valueField      : 'port_code',
        hiddenName      : '',
        id              : 'cmbLoadingPort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadPortDataStore,
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
                    } 
       }
  });

var cmbDischargePort= new Ext.form.ComboBox({
        fieldLabel      : 'Discharge Port',
        width           : 200,
        displayField    : 'port_name', 
        valueField      : 'port_code',
        hiddenName      : '',
        id              : 'cmbDischargePort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadPortDataStore,
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
                    } 
       }
  });
var cmbAgent = new Ext.form.ComboBox({
    fieldLabel      : 'Agent ',
    width           : 350,
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
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
        }
    }
});



var cmbPartyName = new Ext.form.ComboBox({
    fieldLabel      : 'Supplier',
    width           : 350,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPartyName',
    typeAhead       : true,
    mode            : 'local',
    store           : VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){



        }
    }
});



var cmbPayTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Terms',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPayTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['100% DP','100% DA','LC 30 DAYS'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});

var cmbDeliveryTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Delivery Terms',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbDeliveryTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['CIF TUTICORIN'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});



var cmbItem = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 200,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItem',
    typeAhead       : true,
    mode            : 'local',
    store           : ItemLoadDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});

var PONoListDataStore = new Ext.data.Store({
  id: 'PONoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsMasContract.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_no','ordh_seqno'
  ])
});



var cmbPONo = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 80,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : 'ordh_no',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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

                    //RefreshData();
			PODetailDataStore.load({
                        url: 'ClsMasContract.php',
                        params:
                            {
                                task:"loadPODetail",
                                ordno: cmbPONo.getRawValue(),
			    	compcode: Gincompcode,
			    	finid: GinFinid,
                            },
                            scope: this,
                            callback: function () 
			    {

                                txtPONo.setValue(cmbPONo.getValue()); 
				dtpPodate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_date'),'d-m-Y'));


                                txtRefNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_refno')); 
				dtpRefdate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_refdate'),'d-m-Y'));
            
				ordseqno = PODetailDataStore.getAt(0).get('ordh_seqno');

                                cmbPartyName.setValue(PODetailDataStore.getAt(0).get('ordh_sup_code'));

                                cmbAgent.setValue(PODetailDataStore.getAt(0).get('ordh_agent_code'));

                                txtBankACNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankacno'));
                                txtBankName.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankname'));
                                txtBankCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankcode'));
                                txtBranchCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_branchcode'));
                                txtSwiftCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_swiftcode'));
                                txtBankAdd1.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd1'));
                                txtBankAdd2.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd2'));
                                txtBankAdd3.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd3'));

                                invqty = 0;

				var RowCnt = PODetailDataStore.getCount();
				for (var i=0;i<RowCnt;i++)
				{

                                        invqty = Number(invqty)+ Number(PODetailDataStore.getAt(i).get('ordt_inv_qty'));

					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
				                   itemcode   : PODetailDataStore.getAt(i).get('itmh_code'),
						   itemname   : PODetailDataStore.getAt(i).get('itmh_name'),
						   qty        : PODetailDataStore.getAt(i).get('ordt_qty'),
				                   rate       : PODetailDataStore.getAt(i).get('ordt_usdrate'),
						   value      : PODetailDataStore.getAt(i).get('ordt_usdvalue'),


						slno:i + 1,
	
					}) 
					);

				}//For Loop
		

				cmbPayTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_payterms'));	
				cmbDeliveryTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_deliveryterms'));
				cmbCountry.setValue(PODetailDataStore.getAt(0).get('ordh_origincountry'));

				cmbLoadingPort.setValue(PODetailDataStore.getAt(0).get('ordh_originport'));	
				cmbDischargePort.setValue(PODetailDataStore.getAt(0).get('ordh_arrivalport'));
				txtShipDetails.setRawValue(PODetailDataStore.getAt(0).get('ordh_shiftment'));
			        txtDeliveryRemarks.setRawValue(PODetailDataStore.getAt(0).get('ordh_remarks'));



                                poseqno = PODetailDataStore.getAt(0).get('ordh_seqno');


				grid_tot();

                                
				flxDetail.getSelectionModel().clearSelections();

                                if (invqty > 0)
                                    {
                                    Ext.getCmp('save').setDisabled(true);                                    
                                    alert("Invoice Raised against this contract . You can't Modify");
                                    }
                                else
                                    Ext.getCmp('save').setDisabled(false);
				
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





var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:5,
    y:45,
    height: 100,
    hidden:false,
    width: 550,
    columns:
    [
            {header: "Item code", dataIndex: 'itemcode', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true},       
            {header: "Item Name", dataIndex: 'itemname', sortable:true,width:200,align:'left', menuDisabled: true},
            {header: "Qty (t)", dataIndex: 'qty', sortable:true,width:100,align:'left', menuDisabled: true},
            {header: "Rate ", dataIndex: 'rate', sortable:true,width:100,align:'left', menuDisabled: true },       
            {header: "Value ", dataIndex: 'value', sortable:true,width:100,align:'left', menuDisabled: true },   
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
             Ext.Msg.show({
             title: 'RM PO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();

		                cmbItem.setValue(selrow.get('itemcode'));
				txtQty.setValue(selrow.get('qty'));
				txtRate.setValue(selrow.get('rate'));


	              }
		      else if (btn === 'no')
                      {
                           var sm = flxDetail.getSelectionModel();
		           var selrow = sm.getSelected();
	                   flxDetail.getStore().remove(selrow);
		           flxDetail.getSelectionModel().selectAll();
		      }
                     grid_tot();

             } 
        });        
    }

   }
});

var tabContract = new Ext.TabPanel({
    id          : 'tabContract',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 280,
    width       : 530,
    items       : [
                   {
                     xtype: 'panel',
                     title: 'Port / Payment Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 5,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbPayTerms]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 35,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbDeliveryTerms]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 65,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbCountry]
		                },


		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 95,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbLoadingPort]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 125,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbDischargePort]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 155,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtShipDetails]
		                },


		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 185,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtDeliveryRemarks]
		                },


                     ]
                   },
 
                    {
                     xtype: 'panel',
                     title: 'Specifications',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 400,
		                    x           : 0,
		                    y           : 5,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec_wt_per_container]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 35,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec2_qty_diff]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 65,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec3_shipping_line]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 95,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec4_free_days]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 125,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec5_moisture]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 155,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec6_material]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 210,
		                    width       : 480,
		                    x           : 0,
		                    y           : 185,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtSpec6_local_charges]
		                },
                     ]
                   },
    ]
})


   var MasContractMainPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'COUNTRY NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasContractMainPanel',
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
                Ext.getCmp('cmbPONo').setVisible(true);
 
		PONoListDataStore.load({
		url: 'ClsMasContract.php',
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
//save
                    text: 'Save',
                    id     : 'save',  
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
                        //alert(txtPONo.getRawValue());
				if( txtPONo.getRawValue() == '' ) 
				{

					alert("Enter country Name");
					txtPONo.setFocus();
				}
                            	else if(txtRefNo.getRawValue()=="" )
			        {
					alert("Enter Reference / Indent Number.");
					txtRefNo.setFocus();
				}
                            	else if(txtTotQty.getRawValue()=="" )
			        {
					alert("Qty Details is empty.");
					txtTotQty.setFocus();
				}
                   	        else if(txtTotValue.getRawValue()=="" )
			        {
					alert("Value is empty.");
					txtTotValue.setFocus();
				}
	                        else if(cmbAgent.getRawValue()=="" || cmbAgent.getValue()==0)
			        {
					alert("Select Agent Name..");
					cmbAgent.setFocus();
				}

	                        else if(cmbPartyName.getRawValue()=="" || cmbPartyName.getValue()==0)
			        {
					alert("Select Supplier Name..");
					cmbPartyName.setFocus();
				}



	                        else if(cmbPayTerms.getRawValue()=="" )
			        {
					alert("Select Payment Terms ..");
					cmbPayTerms.setFocus();
				}


	                        else if(cmbDeliveryTerms.getRawValue()=="" )
			        {
					alert("Select Delivery Terms ..");
					cmbDeliveryTerms.setFocus();
				}


	                        else if(cmbDischargePort.getRawValue()=="" || cmbDischargePort.getValue()==0)
			        {
					alert("Select Discharge Port..");
					cmbDischargePort.setFocus();
				}
	                        else if(cmbLoadingPort.getRawValue()=="" || cmbLoadingPort.getValue()==0)
			        {
					alert("Select Loading Port..");
					cmbLoadingPort.setFocus();
				}

                            	else if(cmbCountry.getRawValue()=="" || cmbCountry.getValue()==0)
			        {
					alert("Select Country..");
					cmbCountry.setFocus();
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
   //                         if (gstSave === "true")
//	                        {  

                           
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });


                            Ext.Ajax.request({
                            url: 'FrmTrnImportContractSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),  
            			cnt: poData.length,  
                                savetype   : gstFlag,                                  
                                compcode   : Gincompcode,
                                finid      : GinFinid,
                                poseqno    : poseqno,    
                                pono       : txtPONo.getValue(),
                                podate     : Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                                refno      : txtRefNo.getRawValue(),
                                refdate    : Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
          			agent      : cmbAgent.getValue(),
           			party      : cmbPartyName.getValue(),
                                bankacno   : txtBankACNo.getRawValue(),
                                bankname   : txtBankName.getRawValue(),
                                bankcode   : txtBankCode.getRawValue(),
                                branchcode : txtBranchCode.getRawValue(),
                                swiftcode  : txtSwiftCode.getRawValue(),
                                bankadd1   : txtBankAdd1.getRawValue(),
                                bankadd2   : txtBankAdd2.getRawValue(),
                                bankadd3   : txtBankAdd3.getRawValue(),
                          	payterms   : cmbPayTerms.getRawValue(),
                             	delyterms  : cmbDeliveryTerms.getRawValue(),
                         	country    : cmbCountry.getValue(),
                              	loadingport: cmbLoadingPort.getValue(),
                         	discharport: cmbDischargePort.getValue(),
                              	shipdetails: txtShipDetails.getRawValue(),
                              	delremarks : txtDeliveryRemarks.getRawValue(),
				ordh_wt_per_container : txtSpec_wt_per_container.getRawValue(), 
				ordh_qty_diff  : txtSpec2_qty_diff.getRawValue(),  
				ordh_shipping_line  : txtSpec3_shipping_line.getRawValue(),  
				ordh_free_days  : txtSpec4_free_days.getRawValue(),  
				ordh_moisture  : txtSpec5_moisture.getRawValue(),  
				ordh_material  : txtSpec6_material.getRawValue(),  
				ordh_local_charges  : txtSpec6_local_charges.getRawValue(), 


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("CONTRACT Order No -" + obj['pono']);
                                    MasContractMainPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();

                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("CONTRACT Order Not Completed! Pls Check!- " + obj['pono']);                                                  
                                    }
                                }
                           });         
   
  //                        	}
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
                            MasContractWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 70,
                width   : 550,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 20,
                y       : 20,	
                items:[
	
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 5,
                            labelWidth  : 100,
                            border      : false,
                            items : [txtPONo]
                        },

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 5,
                            labelWidth  : 100,
                            border      : false,
                            items : [cmbPONo]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            x           : 200,
                            y           : 5,
                            labelWidth  : 100,
                            border      : false,
                            items : [dtpPodate]
                        },
                ]

            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 550,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 20,
                y       : 105,	
                items:[

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 400,
                            x           : 0,
                            y           : 5,
                            labelWidth  : 110,
                            border      : false,
                            items : [txtRefNo]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            x           : 0,
                            y           : 35,
                            labelWidth  : 110,
                            border      : false,
                            items : [dtpRefdate]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : 65,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbAgent]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : 115,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbPartyName]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 145,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankACNo]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 170,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankName]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 195,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankCode]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 220,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBranchCode]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 245,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSwiftCode ]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 270,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd1]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 295,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd2]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 320,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd3]
                        },
                ]
           },
	   { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 485,
                width   : 550,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 580,
                y       : 20,	
                items:[
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItems]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 330,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },


                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 250,
                            x           : 0,
                            y           : 10,
                            border      : false,
                            items: [cmbItem]
                        },


                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 220,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtQty]
                        },
                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 320,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRate]
                        },
                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 420,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [btnSubmit]
                        },

                       flxDetail,


                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 50,
                            y           : 140,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotQty]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 300,
                            y           : 140,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotValue]
                        },

                    
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 540,
                            x           : 10,
                            y           : 170,
                            defaultType : 'textfield',
                            border      : false,
                            items: [tabContract]
                        },

                ]
           },   	
            
        ],
    });


   function RefreshData(){
        txtPONo.setRawValue("");

        MasContractMainPanel.getForm().reset();
        flxDetail.getStore().removeAll();
        txtSpec_wt_per_container.setValue('25 Mts');
        txtSpec2_qty_diff.setValue('+ / 10 %');
        txtSpec3_shipping_line.setValue('Dahnay/one/Transasia');
        txtSpec4_free_days.setValue('21 Calendar days only');
        txtSpec5_moisture.setValue('As per global standard');
        txtSpec6_material.setValue('');
        txtSpec6_local_charges.setValue('as per Liners / Carriers');

        gstFlag = "Add";	
        Ext.getCmp('cmbPONo').setVisible(false);
        Ext.getCmp('save').setDisabled(false);
/*
	LoadPortDataStore.load({
        	 url: 'ClsMasContract.php', 
              	 params:
        	 {
                	 task:"loadPortList"
               	 }
	});
*/
            PONoDataStore.removeAll();
            PONoDataStore.load({
		url: 'ClsMasContract.php',
		params: {
		task: 'LoadPONo',
		compcode: Gincompcode,
		finid: GinFinid
		},
		callback : function(){
		txtPONo.setValue(PONoDataStore.getAt(0).get('ordh_no'));
		}
            });


	
};

    
   
    var MasContractWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
        y           : 35,
        title       : 'CONTRACT ENTRY',
        items       : MasContractMainPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtPONo.focus();
//	   	        txtPONo.setHeight(25);	
                        RefreshData();
	   }
			
		}
    });
    MasContractWindow.show();  
});
