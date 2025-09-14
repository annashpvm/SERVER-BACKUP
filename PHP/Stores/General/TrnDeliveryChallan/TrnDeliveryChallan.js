Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";

    var hsncode = 0;

   var  dctype = localStorage.getItem('DCTYPE');

 var supcode = 0;
 var itemcode = 0;

 var recdqty = 0;
 
 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name','cust_gstin','cust_state','sup_led_code'
 

      ]),
    });

 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to

                method: 'POST'
            }),
            baseParams:{task:"loadSearchItemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_code','item_name','uom_short_name','item_hsncode'
 

      ]),
    });


 var loadDCdatastore = new Ext.data.Store({
      id: 'loadDCdatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dcno'
      ]),
    }); 


 var loadDClistdatastore = new Ext.data.Store({
      id: 'loadDClistdatastore',
    //  autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dch_no'
      ]),
    }); 


 var loadDCNodetaildatastore = new Ext.data.Store({
      id: 'loadDCNodetaildatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dch_date', 'dch_party', 'dch_tag', 'dch_type', 'dch_dept', 'dch_retype', 'dch_carrier', 'dch_freight','dch_frt_amt', 'dch_return_days','dch_remarks', 'dch_refno', 'dch_refdate', 'dch_truck', 'dct_item_code', 'dct_issqty', 'dct_purpose','dct_slno','dct_recqty',
'cust_code',  'cust_ref', 'item_code', 'item_name', 'item_desc, item_uom', 'item_hsncode',  'uom_short_name','dct_rate','item_hsncode','dch_freight_type','dct_spec','dch_despthro'
      ]),
    });
var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'uom_short_name','item_hsncode'
      ]),
    }); 


   


 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcarrier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'carr_name','carr_code'
      ]),
    });

 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_code','item_name','uom_short_name'
      ]),
    }); 
    
 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','cust_code'
      ]),
    }); 

 var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'department_name','department_code'
      ]),
    }); 


var lblItem = new Ext.form.Label({
	fieldLabel  : 'Item Name',
	id          : 'lblItem',
	name        : 'lblItem',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblUOM = new Ext.form.Label({
	fieldLabel  : 'UNIT',
	id          : 'lblUOM',
	name        : 'lblUOM',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblQty = new Ext.form.Label({
	fieldLabel  : 'Qty',
	id          : 'lblQty',
	name        : 'lblQty',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblRate = new Ext.form.Label({
	fieldLabel  : 'Rate',
	id          : 'lblRate',
	name        : 'lblRate',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblSpec = new Ext.form.Label({
	fieldLabel  : 'Specifications',
	id          : 'lblSpec',
	name        : 'lblSpec',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblPurpose = new Ext.form.Label({
	fieldLabel  : 'Purpose',
	id          : 'lblPurpose',
	name        : 'lblPurpose',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

/*      
var cmbitem = new Ext.form.ComboBox({


        id: 'cmbitem',
        store: LoadItemDatastore,
   	displayField: 'item_name',
        valueField  : 'item_code',
        hiddenName : 'item_name'     ,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'',
        editable:true,
        labelWidth:30,
        width: 250,
    	listeners:{
        select:function(){

//alert(cmbitem.getValue());			
			LoadItemDetDatastore.load({
                        url: 'ClsDeliveryChallan.php',
                        params:
                            {
                                task:"loaditemdet",
				item:cmbitem.getValue()
                            },
				callback:function(){

				txtuom.setRawValue(LoadItemDetDatastore.getAt(0).get('uom_short_name'));
                                hsncode = LoadItemDetDatastore.getAt(0).get('item_hsncode');
				
        	       		}
                        });         
        }
          }
    
       
 });

*/
var cmbdept = new Ext.form.ComboBox({
        id: 'cmbdept',
        store: LoadDeptDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:true,
        width: 300,
        displayField: 'department_name',
        valueField: 'department_code',
        hiddenName : 'department_code',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",   
 	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtrefno.focus();

             }
         }
       }   
      });
/*

var cmbparty = new Ext.form.ComboBox({
        id: 'cmbparty',
        store:  LoadSupplierDatastore,
        displayField: 'cust_ref',
        valueField: 'cust_code',
        hiddenName : 'cust_code',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 380,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	listeners:{
        select:function(){
        }
    }
});
*/

var cmbfreight = new Ext.form.ComboBox({
        id: 'cmbfreight',
        store:  ['NIL','TO PAY','PAID'],
        displayField: 'NIL',
        valueField: '1',
        hiddenName : '',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        fieldLabel:'Freight Type',
        width: 100,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtfreight.focus();

             }
         }
       }
});
 
 
   var txtDCNo = new Ext.form.NumberField({
        fieldLabel  : 'DC No.',
        id          : 'txtDCNo',
        width       : 75,
        name        : 'txtDCNo',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   });



  var txtDCqty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDCqty',
        width       : 60,
        name        : 'txtDCqty',
	enableKeyEvents: true,
                    decimalPrecision: 3,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtRate.focus();

             }
         }
       }
   });


  var txtRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRate',
        width       : 80,
        name        : 'txtRate',
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtSpec.focus();

             }
         }
       }
   });

  var txtSpec = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSpec',
        width       : 300,
        name        : 'txtSpec',
	enableKeyEvents: true,
       autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'200'},
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtpurpose.focus();

             }
         }
       }
   });

  var txtpurpose = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtpurpose',
        width       : 230,
        name        : 'txtpurpose',
	enableKeyEvents: true,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'150'},
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   btnsubmit.focus();

             }
         }
       }
   });

  var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        width       : 500,
        name        : 'txtremarks',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'200'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbfreight.focus();

             }
         }
       }
   });

  var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Frt Amount',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtrefno.focus();

             }
         }
       }
   });


  var txtreturndays = new Ext.form.NumberField({
        fieldLabel  : 'Ex.Return.Days',
        id          : 'txtreturndays',
        width       : 50,
        name        : 'txtreturndays',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtremarks.focus();

             }
         }
       }
   });


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtPartyName.getRawValue(),
		},
        });
}

function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsDeliveryChallan.php',
		params:
		{
			task:"loadSearchItemlist",
			item : txtItemName.getRawValue(),
		},
        });
}

  var txtPartyName = new Ext.form.TextField({
        fieldLabel  : 'Party Name ',
        id          : 'txtPartyName',
        width       : 350,
        name        : 'txtPartyName',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    enableKeyEvents: true,
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 cmbdept.focus();
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
//                  if (txtPartyName.getRawValue() != '')
                     PartySearch();
 //flxParty.hide();
            }

}
   });



  var txtItemName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtItemName',
        width       : 270,
        name        : 'txtItemName',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    enableKeyEvents: true,
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 txtDCqty.focus();
             }
             
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
            },
	    keyup: function () {
         	flxItem.getEl().setStyle('z-index','10000');
                flxItem.show();
                LoadItemDatastore.removeAll();
//                  if (txtItemName.getRawValue() != '')
                     ItemSearch();
 //flxParty.hide();
            }

}
   });


  var txtTruck = new Ext.form.TextField({
        fieldLabel  : 'Truck ',
        id          : 'txtTruck',
        width       : 200,
        name        : 'txtTruck',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
       autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'29'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                //   txtreturndays.focus();

             }
         }
       }
   });


  var txtDespThrough = new Ext.form.TextField({
        fieldLabel  : 'Despatch Through ',
        id          : 'txtDespThrough',
        width       : 200,
        name        : 'txtDespThrough',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
       autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtreturndays.focus();

             }
         }
       }
   });

  var txtuom = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtuom',
        width       : 70,
        readOnly    : true,
        name        : 'txtuom'
   });

  var dtDCdate = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtDCdate',
       id          : 'dtDCdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 100,
       editable    : false,
       value: new Date().format('d-m-Y'),
       labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtPartyName.focus();
                   dtref.setRawValue(dtDCdate.getRawValue());
             }
         },
           keyup:function(){
            dtref.setRawValue(dtDCdate.getRawValue());
          },
           blur:function(){
          dtref.setRawValue(dtDCdate.getRawValue());
           },
       }
    });
    
  var dtref = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtref',
       id          : 'dtref',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y'),
       labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtItemName.focus();

             }
         }
       }
        
    });

   var txtrefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No.',
        id          : 'txtrefno',
        width       : 170,
        name        : 'txtrefno',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'20'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   dtref.focus();

             }
         }
       }
   });

  var txttotqty = new Ext.form.TextField({
        fieldLabel  : 'Total Qty',
        id          : 'txttotqty',
        width       : 60,
        readOnly    : true,
        name        : 'txttotqty',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   });


  var txttotvalue = new Ext.form.TextField({
        fieldLabel  : 'Total Value ',
        id          : 'txttotvalue',
        width       : 90,
        readOnly    : true,
        name        : 'txttotvalue',
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   });


function grid_tot(){
//alert("Function called");
        fdbl_qty=0;
        fdbl_value=0;
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
             fdbl_qty=Number(fdbl_qty)+Number(sel[i].data.qty);
             fdbl_value=Number(fdbl_value)+Number(sel[i].data.value1);
	}
   	txttotqty.setValue(fdbl_qty);
   	txttotvalue.setValue(fdbl_value);
   }



    var txtPass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPass',
        name        : 'txtPass',
        inputType: 'password',
        width       :  50,
        border      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPass.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtPass.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Delete the DC No. ...'+cmbDCno.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnDeleiveryChallanDelete.php',
                               
             
                                       params :
				       {
						dchcompcode    : Gincompcode,
						dchfincode     : Ginfinid,
                                          	dchno          : txtDCNo.getValue(),
						dchdate        : Ext.util.Format.date(dtDCdate.getValue(),"Y-m-d"),
                               			dchtype        : dctype,
						dchparty       : supcode,
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("Delivery Challan Deleted -" + obj['dcno']);
	                                        myFormPanel.getForm().reset();
                                                flxDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("Delivery Challan Not Deleted. Check " + obj['dcno']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });


    var txtPass2 = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPass2',
        name        : 'txtPass2',
        inputType: 'password',
        width       :  50,
        border      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPass2.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtPass2.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Cancel the DC No. ...'+cmbDCno.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnDeleiveryChallanCancel.php',
                               
             
                                       params :
				       {
						dchcompcode    : Gincompcode,
						dchfincode     : Ginfinid,
                                          	dchno          : txtDCNo.getValue(),
						dchdate        : Ext.util.Format.date(dtDCdate.getValue(),"Y-m-d"),
                               			dchtype        : dctype,
						dchparty       : supcode,
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("Delivery Challan Deleted -" + obj['dcno']);
	                                        myFormPanel.getForm().reset();
                                                flxDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("Delivery Challan Not Deleted. Check " + obj['dcno']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });


 var cmbDCno = new Ext.form.ComboBox({
        id: 'cmbDCno',
        store:  loadDClistdatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'',
        editable:true,
        displayField: 'dch_no',
        valueField: 'dch_no',
        hiddenName : 'dch_no',
        width: 75,

        listeners:{
                select: function () {


			flxDetail.getStore().removeAll();
			loadDCNodetaildatastore.removeAll();
			loadDCNodetaildatastore.load({
		                url: 'ClsDeliveryChallan.php',
		                params: {
		                    task: 'loadDCNodetail',
					finid:Ginfinid,
					compcode:Gincompcode,
                                	dcno:cmbDCno.getValue(),
                                        dctype : dctype,
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadDCNodetaildatastore.getCount();
//alert(cnt);
                                   if(cnt>0)
                  		    {  
         Ext.getCmp('docdelete').show();
         Ext.getCmp('doccancel').show();
                                           txtDCNo.setValue(cmbDCno.getValue());
                                           dtDCdate.setRawValue(Ext.util.Format.date(loadDCNodetaildatastore.getAt(0).get('dch_date'),"d-m-Y"));

                                           dtref.setRawValue(Ext.util.Format.date(loadDCNodetaildatastore.getAt(0).get('dch_refdate'),"d-m-Y"));
                                                                     
                                           txtPartyName.setRawValue(loadDCNodetaildatastore.getAt(0).get('cust_ref')); 
		                           supcode = loadDCNodetaildatastore.getAt(0).get('dch_party'); 
		                           cmbdept.setValue(loadDCNodetaildatastore.getAt(0).get('dch_dept')); 
 				           cmbfreight.setRawValue(loadDCNodetaildatastore.getAt(0).get('dch_freight_type'));
 				           txtfreight.setValue(loadDCNodetaildatastore.getAt(0).get('dch_freight'));
				 	   txtTruck.setRawValue(loadDCNodetaildatastore.getAt(0).get('dch_truck'));
				 	   txtDespThrough.setRawValue(loadDCNodetaildatastore.getAt(0).get('dch_despthro'));

					   txtremarks.setValue(loadDCNodetaildatastore.getAt(0).get('dch_remarks'));
					   txtrefno.setValue(loadDCNodetaildatastore.getAt(0).get('dch_refno'));
                                           txtreturndays.setValue(loadDCNodetaildatastore.getAt(0).get('dch_return_days'));



		            	           for(var j=0; j<cnt; j++)
				           { 
		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
                                              recdqty = Number(recdqty) + loadDCNodetaildatastore.getAt(j).get('dct_recqty');
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  itemname  :loadDCNodetaildatastore.getAt(j).get('item_name'), //itemname1,
						  itemcode  :loadDCNodetaildatastore.getAt(j).get('item_code'),
					          uom       :loadDCNodetaildatastore.getAt(j).get('uom_short_name'),
						  qty       :loadDCNodetaildatastore.getAt(j).get('dct_issqty'),
						  rate      :loadDCNodetaildatastore.getAt(j).get('dct_rate'),
						  value1    :loadDCNodetaildatastore.getAt(j).get('dct_issqty')*loadDCNodetaildatastore.getAt(j).get('dct_rate'),
						  hsn       :loadDCNodetaildatastore.getAt(j).get('item_hsncode'),
						  purpose   :loadDCNodetaildatastore.getAt(j).get('dct_purpose'),
						  specification   :loadDCNodetaildatastore.getAt(j).get('dct_spec'),


		                                  })
		                              );
                                              grid_tot();
                                             
		                           }
                                         
                                    if (recdqty > 0)
                                    {
                                      Ext.getCmp('save').setDisabled(true);
                                      alert("Already Quantity Received the DC No. Can't Modify...");
                                    }
                                    else
                                    {
                                      Ext.getCmp('save').setDisabled(false);
                                    }          


                                    }
  flxDetail.getSelectionModel().clearSelections(); 
                                }

			  });

          } }




    });

var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})

var btnRefresh = new Ext.Button({
        text: 'R',
        width: 60,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 

	listeners:{ 
            click: function(){
        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsDeliveryChallan.php',
		params:
		{
			task:"loadSearchItemlist",
			item : txtItemName.getRawValue(),
		},
        });

        }
        }    
});


var btnsubmit = new Ext.Button({
        text: 'ADD',
        width: 60,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',
	listeners:{ 
            click: function(){

                      var gstadd="true";


                      if ( txtPartyName.getRawValue()== "" ){
                          Ext.MessageBox.alert("Delivery Challan ", "Select Party Name..");
                          txtPartyName.focus();
                          gstadd="false";
                       }

                      if (Number(txtDCqty.getValue())===0){
                          Ext.MessageBox.alert("Delivery Challan ", "Enter quantity..");
                          txtsaleqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtpurpose.getValue())===0){
                          Ext.MessageBox.alert("Delivery Challan ", "Enter Purpose..");
                          txtunitrate.focus();
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
                              if (sel[i].data.itemname == txtItemName.getRawValue()  && sel[i].data.specification == txtSpec.getRawValue() )
	                      {
                                   cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")
              	           {
		           	gridedit = "false";
                               	var idx = flxDetail.getStore().indexOf(editrow);
                                var tamt = 0;
            	          	sel[idx].set('itemname'    , txtItemName.getRawValue());
        	          	sel[idx].set('itemcode'    , itemcode);
        	          	sel[idx].set('qty'         , txtDCqty.getValue());
        	          	sel[idx].set('rate'        , txtRate.getValue());
        	          	sel[idx].set('uom'         , txtuom.getRawValue());
        	          	sel[idx].set('hsn'         , hsncode);
                          	sel[idx].set('value1'      , Number(txtDCqty.getValue()) * Number(txtRate.getValue()));
        	          	sel[idx].set('specification' , txtSpec.getValue());     
               	          	sel[idx].set('purpose'     , txtpurpose.getValue());
                           	flxDetail.getSelectionModel().clearSelections();
                                grid_tot();
                                cmbitem.setValue('');
        	          	txtDCqty.setValue('');
        	          	txtuom.setRawValue('');
                                txtpurpose.setValue('');
                                txtRate.setValue('');
                              txtSpec.setValue('');
                            }
             	            else if (cnt > 0) 
                            {
                               Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                            } 
                            else
                            {
		               var RowCnt = flxDetail.getStore().getCount() + 1;
		               flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({
				   itemname  : txtItemName.getRawValue(),
				   itemcode  : itemcode,
				   uom       : txtuom.getRawValue(),                            
				   hsn       : hsncode,
				   qty       : txtDCqty.getValue(),
                                   rate      : txtRate.getValue(),
				   value1    : Number(txtDCqty.getValue()) * Number(txtRate.getValue()),
				   purpose   : txtpurpose.getValue(),
				   specification : txtSpec.getValue(),

		                })
		               );
                               grid_tot();

			       txtuom.setValue('');
			       txtDCqty.setValue('');
			       txtpurpose.setValue('');
                               txtRate.setValue('');
                               txtSpec.setValue('');

                        }
      }
	 	
		  }
      }
})

var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 400,
        x : 500,
        y : 60,

 //        id : flxParty,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_gstin',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'cust_state',sortable:true,width:330,align:'left',hidden:true},
		{header: "ledcode", dataIndex: 'sup_led_code',sortable:true,width:330,align:'left',hidden:true},


        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
				supcode = selrow.get('cust_code');
				supname = selrow.get('cust_name');
                                txtPartyName.setRawValue(selrow.get('cust_name'));
//                        	txtGSTIN.setValue(selrow.get('cust_gstin'));
                                custstate   = selrow.get('cust_state');
                                custledcode= selrow.get('sup_led_code');
                                flxParty.hide();  
                               cmbdept.focus();
                        }
                     });
             },
        'cellclick' : function(flxParty, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){


					supcode = selrow.get('cust_code');
				supname = selrow.get('cust_name');
                                txtPartyName.setRawValue(selrow.get('cust_name'));
                        	//txtGSTIN.setValue(selrow.get('cust_gstin'));
                                custstate   = selrow.get('cust_state');
                                custledcode= selrow.get('sup_led_code');
                                flxParty.hide();  
                                cmbdept.focus();			    

			}
               }
          }

   });


   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 400,
        x : 30,
        y : 170,

 //        id : flxParty,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:330,align:'left'},
		{header: "HSN", dataIndex: 'item_hsncode',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			itemcode = selrow.get('item_code');

                        txtItemName.setRawValue(selrow.get('item_name'));

			txtuom.setRawValue(selrow.get('uom_short_name'));
                        hsncode = selrow.get('item_hsncode');

                        flxItem.hide();  
                        txtDCqty.focus();
                        }
                     });
             },
        'cellclick' : function(flxItem, rowIndex, cellIndex, e){
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){


				var chkitem = (selrow.get('item_code'));
				itemcode = selrow.get('item_code');

		                txtItemName.setRawValue(selrow.get('item_name'));

				txtuom.setRawValue(selrow.get('uom_short_name'));
		                hsncode = selrow.get('item_hsncode');

		                flxItem.hide();  
                                 txtDCqty.focus();
			}
               }
          }

   });


//var dgrecord = Ext.data.Record.create([]);

      var flxDetail = new Ext.grid.EditorGridPanel({
        store            : [],
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
        
 		{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'itemcode',header: "Item Code",width: 60,align: 'left',sortable: true , hidden : true},
 		{dataIndex:'uom',header: "UOM",width: 100, align: 'left',sortable: true},
 		{dataIndex:'hsn',header: "Hsn",width: 100, align: 'left',sortable: true},
        	{dataIndex:'qty',header: "Quantity", width: 70,align: 'left', sortable: true},
        	{dataIndex:'rate',header: "Rate", width: 60,align: 'left', sortable: true},
        	{dataIndex:'value1',header: "Value", width: 60,align: 'left', sortable: true},
        	{dataIndex:'specification',header: "Specification", width: 300,align: 'left', sortable: true},
        	{dataIndex:'purpose',header: "Purpose", width: 300,align: 'left', sortable: true},
        ],
        stripeRows: true,
        height:140,
        width:1250,


       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Delivery Challan ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
                 if (btn === 'yes')
                     {
                        var sm = flxDetail.getSelectionModel();
		        var selrow = sm.getSelected();
                        if (selrow != null) {
                   
         	        gridedit = "true";
        	        editrow = selrow;
//alert(selrow.get('itemcode'));
//alert(selrow.get('itemname'));
			txtItemName.setRawValue(selrow.get('itemname'));
			itemcode = selrow.get('itemcode');

			txtuom.setRawValue(selrow.get('uom'));
			txtDCqty.setValue(selrow.get('qty'));
			txtRate.setValue(selrow.get('rate'));
			txtpurpose.setValue(selrow.get('purpose'));
          		txtSpec.setValue(selrow.get('specification'));
}
	                flxDetail.getSelectionModel().clearSelections();
	            }
                 else if (btn === 'no')
                       {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                        }  
             
             }
//                   calculateItemValue();
  //                 grid_tot()();
        });         
    }
 }

     });

 

var store = new Ext.data.Store({
     
    });


var myFormPanel = new Ext.form.FormPanel({
        width        :  1275, 
        title        : 'Delivery Challan',
        style        : 'margin: 5px ',
        height       : 580,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        id           : 'myFormPanel',
        layout       : 'absolute',
     //   x : 150,
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 45,

            items: [
                {
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',

		    listeners:
	            {
                     	click: function(){
//EDIT
                           Ext.getCmp('cmbDCno').show();
                           gstFlag = "Edit";
                           loadDClistdatastore.removeAll();
                           loadDClistdatastore.load({
      		              url: 'ClsDeliveryChallan',
                              params: {
			          task: 'loadDCNolist',
			          finid   : Ginfinid,
			          compcode:Gincompcode,
                                  dctype  : dctype,
                              },
                              callback:function()
                              { 
//			          alert(loadDClistdatastore.getCount());	
                              }
                           });

                        }
                    }
                    
                },'-',
                {
//SAVE
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {
//alert(txtDCNo.getValue());
//alert(gstFlag);
                        if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Delivery Challan','Grid should not be empty..');
        	                gstSave="false";
	                    }
                            else if (txtPartyName.getRawValue() == "" || supcode == 0  )
                            {
                                  Ext.Msg.alert('Delivery Challan','Party  Name is Empty.....');
                            }
                            else if (cmbdept.getRawValue() == "" || cmbdept.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Challan','Department Name is Empty.....');
                            }
 
      /*   
                            else if (txtremarks.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Challan','Remarks Line is empty .....');
                            }
                            else if (txtrefno.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Challan','Reference	 Line is empty .....');
                            }
*/
                            else if (dctype == "R" && Number(txtreturndays.getRawValue()) == 0)
                            {
                                  Ext.Msg.alert('Delivery Challan','Expected Return Days is empty');
                            }
                            else if (txtTruck.getRawValue()  == "" )
                            {
                                  Ext.Msg.alert('Delivery Challan','Truck Number is empty');
                            }
             	            else
                 		{  
                         	   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
		                           msg: 'Do You Want to save the Record',
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnDeliveryChallanSave.php',
				               params:
						{
						griddet: Ext.util.JSON.encode(finupdData),       
 						cnt: finData.length,
                                                savetype       : gstFlag,
						dchcompcode    : Gincompcode,
						dchfincode     : Ginfinid,
                                          	dchno          : txtDCNo.getValue(),
						dchdate        : Ext.util.Format.date(dtDCdate.getValue(),"Y-m-d"),
                               			dchtype        : dctype,
						dchparty       : supcode,
						dchdept        : cmbdept.getValue(),	
						dchtotqty      : txttotqty.getValue(),  
						dchtotval      : txttotvalue.getValue(),
                      				dchdespthro    : txtDespThrough.getValue(),
                      				dchtruckno     : txtTruck.getValue(),
						dchfreight     : txtfreight.getValue(), 
                                                dchfreighttype : cmbfreight.getRawValue(), 
						dchdays        : txtreturndays.getValue(), 
						dchremarks     : txtremarks.getValue(), 
						dchrefno       : txtrefno.getValue(), 
						dchrefdate     : Ext.util.Format.date(dtref.getValue(),"Y-m-d"),

                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{             
	                                    RefreshData();                   
	                                    Ext.MessageBox.alert("Delivery Challan Saved -" + obj['dcno'] + " Sucessfully");
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Delivery Challan Not Saved!- " + obj['dcno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 

                    
                },'-',
                {
                    text: 'VIEW',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
                    listeners:{
                      click: function () {
                //        var d2 = "R";
			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(Ginfinid);
			var p3 = "&dctype=" + encodeURIComponent(dctype);
			var p4 = "&dcno=" + encodeURIComponent(cmbDCno.getValue());
			var param = (p1+p2+p3+p4) ;    
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=pdf' + param); 
                   
                       }
                    }
                    
                },'-',
                {   
//DELETE
                    text: 'DELETE',
                    id  : 'docdelete',
                    style: 'text-align:center;',
                    tooltip: 'Delete Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtPass').show();
                        }
                    }
                }, '-',

                {   
//CANCEL
                    text: 'CANCEL',
                    id  : 'doccancel',
                    style: 'text-align:center;',
                    tooltip: 'Cancel Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtPass2').show();
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
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
                    icon: '../icons/exit.png',
		    listeners:
	            {
                     	click: function(){
                            window_form.hide();
                        }
                    }
                    
                },
           ],

          },
          items: [ 
                   {
                       xtype: 'fieldset',
                       title: '',
                       id    : 'dcframe',
                       border: true,
                       height: 90,
                       width: 350,
                       layout : 'absolute', 
                       labelWidth:80,
                       x: 10,  
                       y : 10,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:180,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      txtDCNo
                                  ]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:180,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      cmbDCno
                                  ]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:180,
                                  x: 0,  
                                  y: 30,
                                  items: [
                                      dtDCdate
                                  ]
                               },
                       ]
                    },

                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 90,
                       width: 500,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  380,  
                       y : 10,
                       items: [

                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 600,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [txtPartyName]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [
                                      cmbdept
                                  ]
                               },
                       ]
                    },

                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 90,
                       width: 360,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  900,  
                       y : 10,
                       items: [
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [txtrefno]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [dtref]
                                },

                       ]  
                   }, 
                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:260,
                       width: 1250,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 110,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:200,
                                  x: 10,  
                                  y: -10,
                                  items: [lblItem]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:2,
                                  x: 290,  
                                  y: -10,
                                  items: [lblUOM]
                                },


                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 240,
                                  labelWidth:40,
                                  x: 380,  
                                  y: -10,
                                  items: [lblQty]
                               },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 240,
                                  labelWidth:40,
                                  x: 470,  
                                  y: -10,
                                  items: [lblRate]
                               },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:60,
                                  x: 580,  
                                  y: -10,
                                  items: [lblSpec]
                               }, 

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:60,
                                  x: 870,  
                                  y: -10,
                                  items: [lblPurpose]
                               }, 

                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 150,
                                  labelWidth:2,
                                  x: 190,  
                                  y: -15,
                                  items: [btnRefresh]
                                },


                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:2,
                                  x: 0,  
                                  y: 15,
                                  items: [txtItemName]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 80,
                                  labelWidth:2,
                                  x: 280,  
                                  y: 15,
                                  items: [txtuom]
                                },


                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 120,
                                  labelWidth:1,
                                  x: 360,  
                                  y: 15,
                                  items: [txtDCqty]
                               },
              { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 120,
                                  labelWidth:10,
                                  x: 440,  
                                  y: 15,
                                  items: [txtRate]
                               },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:1,
                                  x: 555,  
                                  y: 15,
                                  items: [txtSpec]
                               }, 
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:1,
                                  x: 860,  
                                  y: 15,
                                  items: [txtpurpose]
                               }, 


                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:60,
                                  x: 1150,  
                                  y: 15,
                                  items: [btnsubmit]
                               }, 

                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 235,
                                  width: 1250,
                                  labelWidth:75,
                                  x:10,  
                                  y:45,
                                  items: [flxDetail]
                              },
                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 190,
                                  width: 850,
                                  labelWidth:75,
                                  x:350,  
                                  y:205,
                                  items: [txttotqty]
                              },

                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 190,
                                  width: 850,
                                  labelWidth:75,
                                  x:550,  
                                  y:205,
                                  items: [txttotvalue]
                              },

                       ]
                    },

                    {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:90,
                       width: 1250,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 380,
                       items: [

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 360,
                                  labelWidth:130,
                                  x: 0,  
                                  y: 0,
                                  items: [txtDespThrough]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 230,
                                  labelWidth:60,
                                  x: 350,  
                                  y: 0,
                                  items: [txtTruck]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:100,
                                  x: 600,  
                                  y: 0,
                                  items: [txtreturndays]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 600,
                                  labelWidth:130,
                                  x: 0,  
                                  y: 30,
                                  items: [txtremarks]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 260,
                                  labelWidth:100,
                                  x: 600,  
                                  y: 30,
                                  items: [cmbfreight]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 850,  
                                  y: 30,
                                  items: [txtfreight]
                                },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 1050,
                y:  30,
                defaultType: 'textfield',
                border: false,
                items: [txtPass]
 
           },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 1050,
                y:  30,
                defaultType: 'textfield',
                border: false,
                items: [txtPass2]
 
           },

                      ]
                  },  
                  flxParty,flxItem,
          ]     
    });


function RefreshData(){
        hsncode = 0
        supcode = 0;
        flxParty.hide();
        flxItem.hide();
        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbDCno').hide();
        Ext.getCmp('docdelete').hide();
        Ext.getCmp('doccancel').hide();

        Ext.getCmp('txtPass').hide();
        Ext.getCmp('txtPass2').hide();

        Ext.getCmp('save').setDisabled(false);
        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsDeliveryChallan.php',
		params:
		{
			task:"loadSearchItemlist",
			item : txtItemName.getRawValue(),
		},
        });



 	loadDCdatastore.removeAll();
	loadDCdatastore.load({
        url: 'ClsDeliveryChallan.php',
        params: {
                    task: 'loadDCNo',
                    compcode:Gincompcode,
                    finid:Ginfinid,
                    dctype : dctype,  
                },
		callback:function()
      		{

                    txtDCNo.setValue(loadDCdatastore.getAt(0).get('dcno'));
               }
	  });

   };


var window_form = new Ext.Window({
      width        : 1300,         //1340,
      height       : 590,
      items        : myFormPanel,
      closable:false,
      resizable:false,
      draggable:false,
//      x:10,
      y:35,
      listeners:{
	   show:function()

	   {
//alert(dctype);
//txtDCNo.setText("RETURNABLE DC NO.");

		if (dctype == "R")
		{txtDCNo.label.update("RETURNABLE DC NO.");}
		else{txtDCNo.label.update("NON RETURNABLE DC NO.");}
		 RefreshData();

                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryChallan.php',
                    params: {
		       task: 'loadsupplier'
		      	}
                 });

             	LoadDeptDatastore.load({
		    url: 'ClsDeliveryChallan.php',
                    params: {
		         task: 'loaddept'
	         	}
               	});                                   					
             	LoadItemDatastore.load({
		    url: 'ClsDeliveryChallan.php',
                    params: {
		         task: 'loaditemlist'
	         	}
               	});                                   					

             	LoadCarrierDatastore.load({
		    url: 'ClsDeliveryChallan.php',
                    params: {
		         task: 'loadcarrier'
	         	}
               	});        
                           					

	  }

        }  
  
});
  window_form.show();
  
});
