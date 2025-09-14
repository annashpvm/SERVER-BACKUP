Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";
    var returntype = "N";
    var recq = 0;
    var drecqty= 0;
    var freitemcode;
    var balqty = 0;

 var loadDCRecptdatastore = new Ext.data.Store({
      id: 'loadDCRecptdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCrecptno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dcrecptno'
      ]),
    }); 


 var loadDCNolistdatastore = new Ext.data.Store({
      id: 'loadDCNolistdatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCnolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dch_no','dch_fincode'
      ]),
    }); 


 var loadDCrecptnolistdatastore = new Ext.data.Store({
      id: 'loadDCrecptnolistdatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCrecptnolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dcr_no','dch_fincode'
      ]),
    }); 



 var loadDCNoDetailDataStore = new Ext.data.Store({
      id: 'loadDCNoDetailDataStore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dch_date', 'dch_party', 'genh_tag', 'genh_type', 'dch_dept', 'genh_retype', 'genh_carrier', 'dch_freight','dch_frt_amt', 'genh_days','dch_remarks', 'dch_refno', 'dch_refdate', 'dch_truckno', 'dct_item_code', 'dct_issqty', 'dct_recqty', 'dct_purpose','dct_slno','dct_spec',
'cust_code',  'cust_ref', 'item_code', 'item_name', 'item_desc, item_uom', 'item_hsncode',  'uom_short_name'
      ]),
    });


/*
 var loadDCNoDetailDataStore2 = new Ext.data.Store({
      id: 'loadDCNoDetailDataStore2',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	//'dch_date', 'dch_party', 'genh_tag', 'genh_type', 'dch_dept', 'genh_retype', 'genh_carrier', 'dch_freight','dch_frt_amt', 'genh_days','dch_remarks', 'dch_refno', 'dch_refdate', 'dch_truckno', 'dct_ritem_code', 'dct_rissqty', 'dct_recqty', 'dct_rpurpose','dct_rslno','cust_code',  'cust_ref', 'item_code', 'item_name', 'item_desc, item_uom', 'item_hsncode',  'uom_short_name'
//'dct_rissqty' 
'balqty'
      ]),
    });
*/

 var loadDCrecptnodetaildatastore = new Ext.data.Store({
      id: 'loadDCrecptnodetaildatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCrecptnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 'dcr_date', 'dcr_party', 'dcr_dcno', 'dcr_dcdate', 'dcr_dcfincode', 'dcr_truck', 'dcr_freight_type', 'dcr_freight', 'dcr_itemcode', 'dcr_newitemcode', 'dcr_recd_qty', 'dcr_purpose', 'dcr_remaks', 'dct_item_code', 'dct_issqty', 'dct_recqty', 'dct_rate', 'dct_purpose', 'dct_hsncode','item_name' , 'uom_short_name','dch_date', 'dch_party', 'dch_dept','dch_no','dcr_inwardno', 'dcr_inwarddate', 'dcr_slno','dct_spec'
      ]),
    });


var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'uom_short_name'
      ]),
    }); 


   


 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
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
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_code','item_name'
      ]),
    }); 
    
 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
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
                url: 'ClsDeliveryChallanReceipt.php',      // File to connect to
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
        fieldLabel:'Item',
        editable:true,
        labelWidth:30,
        width: 250,

    	listeners:{
        select:function(){

//alert(cmbitem.getValue());			
			LoadItemDetDatastore.load({
                        url: 'ClsDeliveryChallanReceipt.php',
                        params:
                            {
                                task:"loaditemdet",
				item:cmbitem.getValue()
                            },
				callback:function(){

				txtuom.setRawValue(LoadItemDetDatastore.getAt(0).get('uom_short_name'));
				
        	        		}
                        });         
        }
          }
    
      
 });

*/


var opt_year = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'vbox',
    defaultType : 'textfield',
    width:92,
    height:100,
    x:0,
    y:0,
    border: false,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  false,
                	x       : 100,          
                	y       : -30,
                       // border: true,
			//layout : 'hbox',
                	columns :  1,
                        id      : 'opt_year',
                	items: [
                    	{boxLabel: 'Cur.Yr', name: 'opt_year',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                          	       	txtDCyear.setValue(Ginfinid);
                                        flxDetail.getStore().removeAll(); 
                                        cmbDCNo.setValue('');    
                                        loadDCNolistdatastore.removeAll();
                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		       task: 'loadsupplier',
			finid:txtDCyear.getValue(),
			compcode:Gincompcode,
		      	}
                 });
                      		}
                        }
                        }},
                        {boxLabel: 'Pre.Yr', name: 'opt_year', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  txtDCyear.setValue(Ginfinid-1);
                                  flxDetail.getStore().removeAll();  
                                  cmbDCNo.setValue('');    
                                  loadDCNolistdatastore.removeAll();
                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		       task: 'loadsupplier',
			finid:txtDCyear.getValue(),
			compcode:Gincompcode,
		      	}
                 });
			         }
                            }
                         }},//txtDCyear
                        ],
                  }
           ]

});

var cmbdept = new Ext.form.ComboBox({
        id: 'cmbdept',
        store: LoadDeptDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:false,
        width: 180,
        displayField: 'department_name',
        valueField: 'department_code',
        hiddenName : 'department_code'       
      });

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
    	listeners:{
        select:function(){
//alert(txtDCyear.getValue());
                        flxDetail.getStore().removeAll();
                        loadDCNolistdatastore.removeAll();
			loadDCNolistdatastore.load({
                        url: 'ClsDeliveryChallanReceipt.php',
                        params:
                            {
                                task:"loadDCnolist",
                                finid:txtDCyear.getValue(),
                                compcode:Gincompcode,
				supcode:cmbparty.getValue()
                            },
				callback:function(){


				
        	        		}
                        }); 

        }
    }
});


var cmbFreight = new Ext.form.ComboBox({
        id: 'cmbFreight',
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
        width: 100
});
 
 
 var txtreceiptno = new Ext.form.NumberField({
        fieldLabel  : 'Receipt No.',
        id          : 'txtreceiptno',
        width       : 75,
        name        : 'txtreceiptno'
   });

  var txtrecptqty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtrecptqty',
        width       : 40,
        name        : 'txtrecptqty'
   });

  var txtpurpose = new Ext.form.TextField({
        fieldLabel  : 'Purpose',
        id          : 'txtpurpose',
        width       : 200,
        name        : 'txtpurpose'
   });

  var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        width       : 500,
        name        : 'txtremarks'
   });

  var txtFreight = new Ext.form.NumberField({
        fieldLabel  : 'Frt Amount',
        id          : 'txtFreight',
        width       : 75,
        name        : 'txtFreight'
   });

  var txtTruckno = new Ext.form.TextField({
        fieldLabel  : 'Truck ',
        id          : 'txtTruckno',
        width       : 300,
        name        : 'txtTruckno'
   });

  var txtuom = new Ext.form.TextField({
        fieldLabel  : 'UOM ',
        id          : 'txtuom',
        width       : 70,
        readOnly    : true,
        name        : 'txtuom'
   });

  var dtrecpt = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtrecpt',
       id          : 'dtrecpt',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });



 
 var txtInwardNo = new Ext.form.NumberField({
        fieldLabel  : 'Inward No.',
        id          : 'txtInwardNo',
        width       : 75,
        name        : 'txtInwardNo'
   });

  var dtInward = new Ext.form.DateField
    ({
       fieldLabel : ' Inwared Date',
       name        : 'dtInward',
       id          : 'dtInward',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });

  var dtDCNO = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtDCNO',
       id          : 'dtDCNO',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
/*    
  var dtref = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtref',
       id          : 'dtref',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });

   var txtrefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No.',
        id          : 'txtrefno',
        width       : 170,
        name        : 'txtrefno'
   });
*/
  var txttotqty = new Ext.form.TextField({
        fieldLabel  : 'Total ',
        id          : 'txttotqty',
        width       : 50,
        readOnly    : true,
        name        : 'txttotqty'
   });

var txtDCyear = new Ext.form.NumberField({
        fieldLabel  : 'Year',
        id          : 'txtDCyear',
        width       : 40,
        name        : 'txtDCyear',
        readOnly    : true,   
        enableKeyEvents: true,
});

function grid_tot(){
//alert("Function called");
        fdbl_qty=0;

	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
		if ( Number(sel[i].data.recdqty) > Number(sel[i].data.qty)){
			alert('Received Qty Should not greater than Balance Qty'); 
                        sel[i].set('recdqty','0');
                       
		}
		else{
             		fdbl_qty=Number(fdbl_qty)+Number(sel[i].data.recdqty); }
	}
   	txttotqty.setValue(Ext.util.Format.number(fdbl_qty ,'0.000'));
   }

 var cmbReceiptNo = new Ext.form.ComboBox({
        id        : 'cmbReceiptNo',
        store     :  loadDCrecptnolistdatastore,
        typeAhead : true,
        mode      : 'local',
        forceSeltypeAhead: true,
        triggerAction : 'all',
        selectOnFocus : true,
        fieldLabel    :'Receipt No.',
        editable      : true,
        displayField  : 'dcr_no',
        valueField    : 'dcr_no',
        hiddenName    : '',
        width: 75,

        listeners:{
                select: function () {

//alert(cmbReceiptNo.getValue());
//alert(cmbReceiptNo.getRawValue());
			flxDetail.getStore().removeAll();



			loadDCrecptnodetaildatastore.removeAll();
			loadDCrecptnodetaildatastore.load({
		                url: 'ClsDeliveryChallanReceipt.php',
		                params: {
		                    task: 'loadDCrecptnodetail',
					finid:Ginfinid,
					compcode:Gincompcode,
                                	recptno:cmbReceiptNo.getRawValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadDCrecptnodetaildatastore.getCount();

                                   if(cnt>0)
                  		    {  


                                           txtreceiptno.setValue(cmbReceiptNo.getValue());
                                           dtrecpt.setRawValue(Ext.util.Format.date(loadDCrecptnodetaildatastore.getAt(0).get('dcr_date'),"d-m-Y"));
                                           txtInwardNo.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dcr_inwardno')); 
                                           dtInward.setRawValue(Ext.util.Format.date(loadDCrecptnodetaildatastore.getAt(0).get('dcr_inwarddate'),"d-m-Y"));
		                           cmbdept.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dch_dept')); 
                                           cmbparty.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dch_party')); 
                                           dtDCNO.setRawValue(Ext.util.Format.date(loadDCrecptnodetaildatastore.getAt(0).get('dcr_dcdate'),"d-m-Y"));
                                           cmbDCNo.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dch_no'));
               
 				           cmbFreight.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dcr_freight_type'));
				 	   txtTruckno.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dcr_truck'));
					   txtremarks.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dcr_remaks'));
					   txtFreight.setValue(loadDCrecptnodetaildatastore.getAt(0).get('dcr_freight'));

                                                   for(var j=0; j<cnt; j++)
                 			           { 
		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  slno      :loadDCrecptnodetaildatastore.getAt(j).get('dcr_slno'),   
                                                  itemname  :loadDCrecptnodetaildatastore.getAt(j).get('item_name'), //itemname1,
						  itemcode  :loadDCrecptnodetaildatastore.getAt(j).get('dcr_itemcode'),
					          uom       :loadDCrecptnodetaildatastore.getAt(j).get('uom_short_name'),
						  qty       :loadDCrecptnodetaildatastore.getAt(j).get('dct_issqty'),
                                                  recdqty   : Number(loadDCrecptnodetaildatastore.getAt(j).get('dcr_recd_qty')), 
                                                  oldqty    : Number(loadDCrecptnodetaildatastore.getAt(j).get('dcr_recd_qty')), 
						  rate      :loadDCrecptnodetaildatastore.getAt(j).get('dct_rate'),
						  value1    :loadDCrecptnodetaildatastore.getAt(j).get('dct_issqty')*loadDCrecptnodetaildatastore.getAt(j).get('dct_rate'),
						  hsn       :loadDCrecptnodetaildatastore.getAt(j).get('item_hsncode'),
						  purpose   :loadDCrecptnodetaildatastore.getAt(j).get('dct_purpose'),
                                                  specification  :loadDCrecptnodetaildatastore.getAt(j).get('dct_spec'),
		                                  })
		                              );
                     	                           }
                                                }

/*
                                           for(var j=0; j<cnt; j++)
                 			   { 
alert(j)
						var Row= flxDetail.getStore().getCount();
						flxDetail.getSelectionModel().selectAll();
						var sel=flxDetail.getSelectionModel().getSelections();
alert(Row)
                                                for(var i=0;i<Row;i++)
                                                {
                                                icode =  Number(sel[i].data.itemcode); 
                         if (loadDCrecptnodetaildatastore.getAt(j).get('item_code') == icode)
                         {
alert("found");
     	                   }
                              }
                                    }

*/
                                    grid_tot();
                                   flxDetail.getSelectionModel().clearSelections(); 
                           }
			});
grid_tot();
                }
        }
});


 var cmbDCNo = new Ext.form.ComboBox({
        id: 'cmbDCNo',
        store:  loadDCNolistdatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'DC. No',
        editable:true,
        displayField: 'dch_no',
        valueField: 'dch_no',
        hiddenName : 'dch_no',
        width: 60,

        listeners:{
                select: function () {

//alert(cmbDCNo.getValue());
			flxDetail.getStore().removeAll();
			loadDCNoDetailDataStore.removeAll();
			loadDCNoDetailDataStore.load({
		                url: 'ClsDeliveryChallanReceipt.php',
		                params: {
		                    task: 'loadDCnodetail',
					finid:txtDCyear.getValue(),
					compcode:Gincompcode,
                                	dcno:cmbDCNo.getRawValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadDCNoDetailDataStore.getCount();
//alert(cnt);
                                   if(cnt>0)
                  		    {  

//                                           txtreceiptno.setValue(cmbDCNo.getValue());
                                           dtDCNO.setRawValue(Ext.util.Format.date(loadDCNoDetailDataStore.getAt(0).get('dch_date'),"d-m-Y"));
		                           cmbdept.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_dept')); 

/*
                                           dtref.setRawValue(Ext.util.Format.date(loadDCNoDetailDataStore.getAt(0).get('dch_refdate'),"d-m-Y"));
                           
//		                           cmbparty.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_party')); 
		                           cmbdept.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_dept')); 
                                           cmbcarrier.setValue(loadDCNoDetailDataStore.getAt(0).get('genh_carrier'));
 				           cmbFreight.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_freight'));
				 	   txtTruckno.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_truckno'));
					   txtremarks.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_remarks'));
					   txtFreight.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_frt_amt'));
					   txtrefno.setValue(loadDCNoDetailDataStore.getAt(0).get('dch_refno'));
                                           txtreturndays.setValue(loadDCNoDetailDataStore.getAt(0).get('genh_days'));
*/
		            	           for(var j=0; j<cnt; j++)

            			           { 
		balqty =Number(loadDCNoDetailDataStore.getAt(j).get('dct_issqty'))-Number(loadDCNoDetailDataStore.getAt(j).get('dct_recqty'));

		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  slno        : j+1,
                                                  itemname    :loadDCNoDetailDataStore.getAt(j).get('item_name'), //itemname1,
						  itemcode    :loadDCNoDetailDataStore.getAt(j).get('dct_item_code'),
					          uom         :loadDCNoDetailDataStore.getAt(j).get('uom_short_name'),
                                  	          qty         :Ext.util.Format.number(balqty ,'0.000'),
                                                  recdqty     :loadDCNoDetailDataStore.getAt(j).get('dct_recqty'), 
                                                
						  purpose     :loadDCNoDetailDataStore.getAt(j).get('dct_purpose'),
                                                  specification :loadDCNoDetailDataStore.getAt(j).get('dct_spec'),
		                                  })
		                              );
                                              grid_tot();
                                             
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

var btnsubmit = new Ext.Button({
        text: 'ADD',
        width: 60,
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',
	listeners:{ 
            click: function(){

                      var gstadd="true";
                      if (Number(txtrecptqty .getValue())===0){
                          Ext.MessageBox.alert("DC RECEIPT ", "Enter quantity..");
                          txtsaleqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtpurpose.getValue())===0){
                          Ext.MessageBox.alert("DC RECEIPT ", "Enter Rate..");
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
                              if (sel[i].data.itemname == cmbitem.getRawValue())
	                      {
                                   cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")
              	           {
		           	gridedit = "false";
                               	var idx = flxDetail.getStore().indexOf(editrow);
                                var tamt = 0;
            	          	sel[idx].set('itemname'    , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'    , cmbitem.getValue());
        	          	sel[idx].set('qty'         , txtrecptqty.getValue());
        	          	sel[idx].set('uom'         , txtuom.getRawValue());
        	          	sel[idx].set('purpose'     , txtpurpose.getValue());
                           	flxDetail.getSelectionModel().clearSelections();
                                grid_tot();
                                cmbitem.setValue('');
        	          	txtrecptqty.setValue('');
        	          	txtuom.setRawValue('');
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
				   itemname  : cmbitem.getRawValue(),
				   itemcode  : cmbitem.getValue(),
				   uom       : txtuom.getRawValue(),
				   qty       : txtrecptqty.getValue(),
				   purpose   : txtpurpose.getValue(),
		                })
		               );
                               grid_tot();

			       txtuom.setValue('');
			       txtrecptqty.setValue('');
			       txtpurpose.setValue('');
                        }
      }
	 	
		  }
      }
})
   var fm = Ext.form;


var dgrecord = Ext.data.Record.create([]);

      var flxDetail = new Ext.grid.EditorGridPanel({
        store            : [],
        frame            : false,
	id		 : 'dcgrid',
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        scrollable: true,
	clicksToEdit:1,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
 		{dataIndex:'slno',header: "SL No",width: 50,align: 'center',sortable: true},            
 		{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'itemcode',header: "Item Code",width: 60,align: 'left',sortable: true},
 		{dataIndex:'uom',header: "UOM",width: 100, align: 'left',sortable: true},
 		{dataIndex:'qty',header: "Bal.Qty",width: 100, align: 'left',sortable: true},
            	{dataIndex:'recdqty',header: "Recd.Qty", width: 60,align: 'left', sortable: true,
               	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    blur: function () {

	 		flxDetail.getSelectionModel().clearSelections();
                        grid_tot();
          	},
		
		}}},


  		{dataIndex:'newitemname',header: "New Item Name",width: 250,align: 'left',sortable: true,
       		editor: new fm.ComboBox({
	           	
          		store: LoadItemDatastore,
	          	displayField: 'item_name',
            		valueField: 'item_code',
			hiddenName :'',
		        id: 'cmbitem',
	            	typeAhead: true,
          	    	mode: 'remote',
	            	forceSelection: true,
	              	triggerAction: 'all',
               	 	selectOnFocus: true,
	                editable: true,
             		allowblank: false,
            		lazyRender:true,
			listeners : {
			select : function() {
			 	var recordIndex = LoadItemDatastore.find('item_code', this.getValue());
				var sel = flxDetail.getSelectionModel().getSelections();
				itemcode = LoadItemDatastore.getAt(recordIndex).get('item_code');
                         	itemname = LoadItemDatastore.getAt(recordIndex).get('item_name');
				sel[0].set('newitemcode', itemcode);
                        	sel[0].set('newitemname', itemname);

			}
			},

            
		}),
            /*renderer: function(item_code) {
                var recordIndex = LoadItemDatastore.find('item_code', item_code);

                if (recordIndex === -1) {
                   //  This is one way to handle unknown values
                    return '' + item_code;
                }

                alert(LoadItemDatastore.getAt(recordIndex).get('item_name'));
            }*/
	  	},

		{dataIndex:'newitemcode',header: "New Item Code",width: 60,align: 'left',sortable: true},
 		{dataIndex:'oldqty',header: "Old.Qty",width: 50, align: 'left',sortable: true},
 		{dataIndex:'specification',header: "specification",width: 200, align: 'left',sortable: true},

        	{dataIndex:'purpose',header: "Remarks", width: 300,align: 'left', sortable: true,
         	editor:{
		    xtype:'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    blur: function () {

	 		flxDetail.getSelectionModel().clearSelections();

          	},
		
		}}},

        ],
        stripeRows: true,
        height:100,
        width:1000,
	listeners:{
             	    blur: function () {
			flxDetail.getSelectionModel().clearSelections();
                          grid_tot();
          	},
		//afterrender :function () {flxDetail.getSelectionModel().clearSelections();grid_tot();}
		}
     
     });

 

var store = new Ext.data.Store({
     
    });


var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Receipt from Delivery Challan',
        style        : 'margin: 5px ',
        height       : 580,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        id           : 'myFormPanel',
        layout       : 'absolute',
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
                           gstFlag = "Edit";
                           Ext.getCmp('cmbReceiptNo').show(); 
                           loadDCrecptnolistdatastore.removeAll();
                           loadDCrecptnolistdatastore.load({
      		              url: 'ClsDeliveryChallanReceipt',
                              params: {
			          task: 'loadDCrecptnolist',
			          finid: Ginfinid,
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(loadDCrecptnolistdatastore.getCount());	
                              }
                           });

                        }
                    }
                    
                },'-',
                {
//save
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {
//alert(cmbDCNo.getValue());
grid_tot();
//alert(cmbDCNo.getRawValue());
//alert(cmbparty.getValue());
//alert(cmbdept.getValue());

//alert(txtreceiptno.getValue());
//alert(gstFlag);
   //alert(Ext.util.Format.date(new Date(),"Y-m-d"))
                            if (flxDetail.getStore().getCount()==0)
         	            {
        	                Ext.Msg.alert('Receipt Entry','Grid should not be empty..');
        	                gstSave="false";
	                    }
                            else if (Number(txttotqty.getValue()) == 0  )
                            {
                                  Ext.Msg.alert('Receipt Entry','Receipt qty is Empty.....');
                            }

                            else if (cmbparty.getRawValue() == "" || cmbparty.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Receipt Entry','Party  Name is Empty.....');
                            }
                            else if (cmbdept.getRawValue() == "" || cmbdept.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Receipt Entry','Department Name is Empty.....');
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
				               url: 'TrnDeliveryChallanReceiptSave.php',
				               params:
						{
						griddet: Ext.util.JSON.encode(finupdData),       
 						cnt: finData.length,
                                                savetype     : gstFlag,

						dcrcompcode  : Gincompcode,
						dcrfincode   : Ginfinid,
						dcrno        : txtreceiptno.getValue(),
						dcrdate      : Ext.util.Format.date(dtrecpt.getValue(),"Y-m-d"),
						dcrparty     : cmbparty.getValue(),
                                                dcrdcno      : cmbDCNo.getValue(),
						dcrdcdate    : Ext.util.Format.date(dtDCNO.getValue(),"Y-m-d"),
                 				dcrdcfincode : txtDCyear.getValue(), 
                                  		dcrtruckno   : txtTruckno.getValue(),
                             			dcrfrttype   : cmbFreight.getRawValue(),                             							dcrfrtamt    : txtFreight.getRawValue(),
                             			dcrremarks   : txtremarks.getRawValue(),                            
                                                inwardno     : txtInwardNo.getValue(),
						inwarddt     : Ext.util.Format.date(dtInward.getValue(),"Y-m-d"),

                                        	},
 
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{      
	                                    RefreshData();                          
	                                    Ext.MessageBox.alert(" Receipt Saved -" + obj['recptno'] + " Sucessfully");
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Receipt Not Saved!- " + obj['recptno']);                                                  
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png',
                    listeners:{
                      click: function () {
                        var d2 = "R";
			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(Ginfinid);
			var p3 = "&vouno=" + encodeURIComponent(cmbReceiptNo.getValue());
			var param = (p1+p2+p3) ;    
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryReceipt.rptdesign&__format=pdf' + param); 
                   
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
                       border: true,
                       height: 110,
                       width: 210,
                       layout : 'absolute', 
                       labelWidth:80,
                       x: 10,  
                       y : 10,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      txtreceiptno
                                  ]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      cmbReceiptNo
                                  ]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [
                                      dtrecpt
                                  ]
                               },
                       ]
                    },

                            {
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : '',
			       height	   : 110,
                               width       : 110,
                               x           : 220,
                               y           : 10,
                               //defaultType : 'textfield',
                               border      : true,
                               items: [opt_year]
                            },
{
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : 35,
			      //height	   : 90,
                               width       : 110,
                               x           : 230,
                               y           : 73,
                               //defaultType : 'textfield',
                               border      : false,
                               items: [txtDCyear]
                            },          



                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 110,
                       width: 580,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  330,  
                       y : 10,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      cmbparty
                                  ]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 170,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [cmbDCNo]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:25,
                                  x: 150,  
                                  y: 30,
                                  items: [dtDCNO]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 250,
                                  labelWidth:35,
                                  x: 300,  
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
                       height:180,
                       width: 900,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 130,
                       items: [

/*                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 0,
                                  items: [cmbitem]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:40,
                                  x: 310,  
                                  y: 0,
                                  items: [txtuom]
                                },


                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 240,
                                  labelWidth:40,
                                  x: 430,  
                                  y: 0,
                                  items: [txtrecptqty]
                               },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:60,
                                  x: 530,  
                                  y: 0,
                                  items: [txtpurpose]
                               }, 
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:60,
                                  x: 800,  
                                  y: 0,
                                  items: [btnsubmit]
                               }, 
*/
                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 190,
                                  width: 850,
                                  labelWidth:75,
                                  x:10,  
                                  y:0,
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
                                  y:125,
                                  items: [txttotqty]
                              },

                       ]
                    },

                    {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:170,
                       width: 900,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 320,
                       items: [

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 0,
                                  items: [txtTruckno]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:70,
                                  x: 300,  
                                  y: 0,
                                  items: [txtInwardNo]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 480,  
                                  y: 0,
                                  items: [dtInward]
                                },


                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 600,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 30,
                                  items: [txtremarks]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 60,
                                  items: [cmbFreight]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 240,  
                                  y: 60,
                                  items: [txtFreight]
                                },
/*
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 90,
                                  items: [txtrefno]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 240,  
                                  y: 90,
                                  items: [dtref]
                                },
*/
                      ]
                  },  


          ]     



    });


function RefreshData(){
        gstFlag = "Add"
        myFormPanel.getForm().reset();
	txtDCyear.setValue(Ginfinid);
        flxDetail.getStore().removeAll(); 
        txtFreight.setValue('');  
        Ext.getCmp('cmbReceiptNo').hide(); 
 	loadDCRecptdatastore.removeAll();
	loadDCRecptdatastore.load({
        url: 'ClsDeliveryChallanReceipt.php',
        params: {
                    task: 'loadDCrecptno',
                    compcode:Gincompcode,
                    finid:Ginfinid  
                },
		callback:function()
      		{

                    txtreceiptno.setValue(loadDCRecptdatastore.getAt(0).get('dcrecptno'));
               }
	  });

   };


var window_form = new Ext.Window({
      width        : 945,         //1340,
      height       : 590,
      items        : myFormPanel,
      closable:false,
      resizable:false,
      draggable:false,
      x:150,
      y:35,
      listeners:{
	   show:function()
	   {
		 RefreshData();
                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		       task: 'loadsupplier',
			finid:Ginfinid,
			compcode:Gincompcode,
		      	}
                 });

             	LoadDeptDatastore.load({
		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		         task: 'loaddept'
	         	}
               	});                                   					
             	LoadItemDatastore.load({
		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		         task: 'loaditemlist'
	         	}
               	});                                   					

             	LoadCarrierDatastore.load({
		    url: 'ClsDeliveryChallanReceipt.php',
                    params: {
		         task: 'loadcarrier'
	         	}
               	});        
                           					

	  }

        }  
  
});
  window_form.show();
  
});
