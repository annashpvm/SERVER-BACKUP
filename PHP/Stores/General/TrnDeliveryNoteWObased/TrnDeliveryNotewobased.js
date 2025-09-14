Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";
    var returntype = "R";
    var wodate = new Date();

    var woseqno = 0;  


 var loadDNdatastore = new Ext.data.Store({
      id: 'loadDNdatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dnno'
      ]),
    }); 


 var loadDNlistdatastore = new Ext.data.Store({
      id: 'loadDNlistdatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnnolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'genh_no'
      ]),
    }); 


 var loadDNNodetaildatastore = new Ext.data.Store({
      id: 'loadDNNodetaildatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'genh_date', 'genh_party', 'genh_tag', 'genh_type', 'genh_dept', 'genh_retype', 'genh_carrier', 'genh_freight','genh_frt_amt', 'genh_days','genh_remarks', 'genh_refno', 'genh_refdate', 'genh_truckno', 'gent_item_code', 'gent_issqty', 'gent_purpose','gent_slno','gent_pono','gent_podate',
'sup_code',  'sup_refname', 'item_code', 'item_name', 'item_desc, item_uom', 'item_hsncode',  'uom_short_name'
      ]),
    });

var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'uom_short_name','qty'
      ]),
    }); 



 var loadWorkorderlistdatastore = new Ext.data.Store({
      id: 'loadWorkorderlistdatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadworkordnolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'woh_no'
      ]),
    }); 


 var loadWorkorderitemdatastore = new Ext.data.Store({
      id: 'loadWorkorderitemdatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadworkorderitems"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'woh_seqno','item_name','item_code','woh_date'
      ]),
    }); 




 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
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



 var cmbcarrier = new Ext.form.ComboBox({
        id: 'cmbcarrier',
        store: LoadCarrierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Carrier',
        editable:true,
        width: 250,
        displayField: 'carr_name',
        valueField: 'carr_code',
        hiddenName : 'carr_code'
     
      });
      


  


 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','item_code'
      ]),
    }); 
    



 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'sup_refname','sup_code'
      ]),
    }); 

 var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNotewobased.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dept_name','dept_code'
      ]),
    }); 

      
var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: loadWorkorderitemdatastore,
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
//alert(cmbwono.getValue());			
			LoadItemDetDatastore.load({
                        url: 'ClsDeliveryNotewobased.php',
                        params:
                            {
                                task:"loaditemdet",
				item      : cmbitem.getValue(),
                                finid     : txtwoyear.getValue(),
                                compcode  : Gincompcode,
                                wono      : cmbwono.getValue()

                            },
				callback:function(){

				txtuom.setRawValue(LoadItemDetDatastore.getAt(0).get('uom_short_name'));
                       		txtwoqty.setRawValue(LoadItemDetDatastore.getAt(0).get('qty'));
				
        	        		}
                        });         
        }
          }
    
       
 });



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
                          	       	txtwoyear.setValue(Ginfinid);
                                        flxDetail.getStore().removeAll(); 
                                        cmbwono.setValue('');    
                                        loadWorkorderlistdatastore.removeAll();
                      		}
                        }
                        }},
                        {boxLabel: 'Pre.Yr', name: 'opt_year', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  txtwoyear.setValue(Ginfinid-1);
                                  flxDetail.getStore().removeAll();  
                                  cmbwono.setValue('');    
                                  loadWorkorderlistdatastore.removeAll();
			         }
                            }
                         }},//txtwoyear
                        ],
                  }
           ]

});

var cmbwono = new Ext.form.ComboBox({
        id: 'cmbwono',
        store: loadWorkorderlistdatastore,
   	displayField: 'woh_no',
        valueField  : 'woh_no',
        hiddenName : ''     ,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'',
        editable:true,
        labelWidth:30,
        width: 70,
    	listeners:{
        select:function(){
			loadWorkorderitemdatastore.load({
                        url: 'ClsDeliveryNotewobased.php',
                        params:
                            {
                                task:"loadworkorderitems",
				partycode : cmbparty.getValue(),
                                finid     : txtwoyear.getValue(),
                                compcode  : Gincompcode,
                                wono      : cmbwono.getValue()
                          },
				callback:function(){
//alert(loadWorkorderitemdatastore.getCount());
alert(loadWorkorderitemdatastore.getAt(0).get('woh_seqno'));

                                wodate = loadWorkorderitemdatastore.getAt(0).get('woh_date');
                                woseqno = loadWorkorderitemdatastore.getAt(0).get('woh_seqno');

//				alert(loadWorkorderitemdatastore.getAt(0).get('woh_date'));
				
        	        	}
                        });
        }
        }
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
        width: 300,
        displayField: 'dept_name',
        valueField: 'dept_code',
        hiddenName : 'dept_code'       
      });

 



var cmbparty = new Ext.form.ComboBox({
        id: 'cmbparty',
        store:  LoadSupplierDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_code',      
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
			loadWorkorderlistdatastore.load({
                        url: 'ClsDeliveryNotewobased.php',
                        params:
                            {
                                task:"loadworkordnolist",
				partycode:cmbparty.getValue(),
                                finid  : txtwoyear.getValue(),
                                compcode    : Gincompcode
                          },
				callback:function(){

//				alert(loadWorkorderlistdatastore.getCount());
				
        	        		}
                        });

        }
    }
});


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
        width: 100
});
 
  
    var txtwoyear = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtwoyear',
        width       : 40,
        name        : 'txtwoyear',
        readOnly    : true,   
        enableKeyEvents: true,
   });

   var txtdnno = new Ext.form.NumberField({
        fieldLabel  : 'Del.Note No.',
        id          : 'txtdnno',
        width       : 75,
        name        : 'txtdnno'
   });


  var txtwoqty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtwoqty',
        width       : 40,
        readOnly    : true,
        name        : 'txtwoqty'
   });


  var txtdnqty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtdnqty',
        width       : 40,
        name        : 'txtdnqty',
         enableKeyEvents: true,
        listeners:{
           keyup:function(){
                 if (Number(txtdnqty.getValue()) >  Number(txtwoqty.getValue())) {
                    alert("Delivery Quantity should not higher than Work order Qty..");
                    txtdnqty.setValue(txtwoqty.getValue());
                 }
           }
        } 

   });

  var txtpurpose = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtpurpose',
        width       : 250,
        name        : 'txtpurpose'
   });

  var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        width       : 500,
        name        : 'txtremarks'
   });

  var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Frt Amount',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight'
   });


  var txtreturndays = new Ext.form.NumberField({
        fieldLabel  : 'Ex.Return.Days',
        id          : 'txtreturndays',
        width       : 50,
        name        : 'txtreturndays'
   });



  var txttruckno = new Ext.form.TextField({
        fieldLabel  : 'Truck ',
        id          : 'txttruckno',
        width       : 300,
        name        : 'txttruckno'
   });

  var txtuom = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtuom',
        width       : 70,
        readOnly    : true,
        name        : 'txtuom'
   });

  var dtdnote = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtdnote',
       id          : 'dtdnote',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
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
       value: new Date().format('d-m-Y')
        
    });

   var txtrefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No.',
        id          : 'txtrefno',
        width       : 170,
        name        : 'txtrefno'
   });

  var txttotqty = new Ext.form.TextField({
        fieldLabel  : 'Total ',
        id          : 'txttotqty',
        width       : 50,
        readOnly    : true,
        name        : 'txttotqty'
   });

var lblwono = new Ext.form.Label({
    fieldLabel  : 'WO No.',
    id          : 'lblwono',
    width       : 60
});

var lblitem = new Ext.form.Label({
    fieldLabel  : 'Item Name.',
    id          : 'lblitem',
    width       : 250
});


var lbluom = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lbluom',
    width       : 60
});
var lblbalqty = new Ext.form.Label({
    fieldLabel  : 'Bal.Qty.',
    id          : 'lblbalqty',
    width       : 60
});

var lbldnqty = new Ext.form.Label({
    fieldLabel  : 'DN.Qty.',
    id          : 'lbldnqty',
    width       : 60
});

var lblpurpose = new Ext.form.Label({
    fieldLabel  : 'Purpose',
    id          : 'lblpurpose',
    width       : 60
});

function grid_tot(){
//alert("Function called");
        fdbl_qty=0;
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
             fdbl_qty=Number(fdbl_qty)+Number(sel[i].data.qty);
	}
   	txttotqty.setValue(fdbl_qty);
   }

 var cmbdnno = new Ext.form.ComboBox({
        id: 'cmbdnno',
        store:  loadDNlistdatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'',
        editable:true,
        displayField: 'genh_no',
        valueField: 'genh_no',
        hiddenName : 'genh_no',
        width: 75,

        listeners:{
                select: function () {


			flxDetail.getStore().removeAll();
			loadDNNodetaildatastore.removeAll();
			loadDNNodetaildatastore.load({
		                url: 'ClsDeliveryNotewobased.php',
		                params: {
		                    task: 'loaddnnodetail',
					finid:Ginfinid,
					compcode:Gincompcode,
                                	dnno:cmbdnno.getValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadDNNodetaildatastore.getCount();
//alert(cnt);
                                   if(cnt>0)
                  		    {  

                                           txtdnno.setValue(cmbdnno.getValue());
                                           dtdnote.setRawValue(Ext.util.Format.date(loadDNNodetaildatastore.getAt(0).get('genh_date'),"d-m-Y"));

                                           dtref.setRawValue(Ext.util.Format.date(loadDNNodetaildatastore.getAt(0).get('genh_refdate'),"d-m-Y"));
                           
		                           cmbparty.setValue(loadDNNodetaildatastore.getAt(0).get('genh_party')); 
		                           cmbdept.setValue(loadDNNodetaildatastore.getAt(0).get('genh_dept')); 
                                           cmbcarrier.setValue(loadDNNodetaildatastore.getAt(0).get('genh_carrier'));
 				           cmbfreight.setValue(loadDNNodetaildatastore.getAt(0).get('genh_freight'));
				 	   txttruckno.setValue(loadDNNodetaildatastore.getAt(0).get('genh_truckno'));
					   txtremarks.setValue(loadDNNodetaildatastore.getAt(0).get('genh_remarks'));
					   txtfreight.setValue(loadDNNodetaildatastore.getAt(0).get('genh_frt_amt'));
					   txtrefno.setValue(loadDNNodetaildatastore.getAt(0).get('genh_refno'));
                                           txtreturndays.setValue(loadDNNodetaildatastore.getAt(0).get('genh_days'));
		            	           for(var j=0; j<cnt; j++)
				           { 
		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  wono        :loadDNNodetaildatastore.getAt(j).get('gent_pono'), 
                                                  wodate      :loadDNNodetaildatastore.getAt(j).get('gent_podate'), 
                                                  itemname    :loadDNNodetaildatastore.getAt(j).get('item_name'), 
						  itemcode    :loadDNNodetaildatastore.getAt(j).get('item_code'),
					          uom         :loadDNNodetaildatastore.getAt(j).get('uom_short_name'),
						  qty         :loadDNNodetaildatastore.getAt(j).get('gent_issqty'),
                                                  oldqty      :loadDNNodetaildatastore.getAt(j).get('gent_issqty'),
						  purpose     :loadDNNodetaildatastore.getAt(j).get('gent_purpose'),
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
                      if (Number(txtdnqty .getValue())===0){
                          Ext.MessageBox.alert("Delivery Note ", "Enter quantity..");
                          txtsaleqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtpurpose.getValue())===0){
                          Ext.MessageBox.alert("Delivery Note ", "Enter Purpose..");
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

            	          	sel[idx].set('wono'        , cmbwono.getRawValue());
            	          	sel[idx].set('wodate'      , Ext.util.Format.date(wodate,"Y-m-d"));
        	          	sel[idx].set('itemcode'    , cmbitem.getValue());
            	          	sel[idx].set('itemname'    , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'    , cmbitem.getValue());
        	          	sel[idx].set('qty'         , txtdnqty.getValue());
        	          	sel[idx].set('uom'         , txtuom.getRawValue());
        	          	sel[idx].set('purpose'     , txtpurpose.getValue());
                           	flxDetail.getSelectionModel().clearSelections();
                                grid_tot();
                                cmbitem.setValue('');
        	          	txtdnqty.setValue('');
                         	txtwoqty.setValue('');
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
                                   wono      : cmbwono.getRawValue(),   
                                   wodate    : Ext.util.Format.date(wodate,"Y-m-d"),
				   itemname  : cmbitem.getRawValue(),
				   itemcode  : cmbitem.getValue(),
				   uom       : txtuom.getRawValue(),
				   qty       : txtdnqty.getValue(),
                                             
				   purpose   : txtpurpose.getValue(),
		                })
		               );
                               grid_tot();

			       txtuom.setValue('');
			       txtdnqty.setValue('');
			       txtpurpose.setValue('');
                               txtwoqty.setValue('');   
                        }
      }
	 	
		  }
      }
})



var dgrecord = Ext.data.Record.create([]);

      var flxDetail = new Ext.grid.EditorGridPanel({
        store            : [],
        scrollable       : true,
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,

        sm: new Ext.grid.RowSelectionModel(),
        columns: [
        
 		{dataIndex:'wono',header: "WO No.",width: 60,align: 'left',sortable: true},
   	        {dataIndex:'wodate',header: "WO Date",width:60,align: 'left',sortable: true},
               	{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'itemcode',header: "Item Code",width: 60,align: 'left',sortable: true},
 		{dataIndex:'uom',header: "UOM",width: 100, align: 'left',sortable: true},
        	{dataIndex:'qty',header: "Quantity", width: 60,align: 'left', sortable: true},
             	{dataIndex:'oldqty',header: "oldqty", width: 60,align: 'left', sortable: true},
        	{dataIndex:'purpose',header: "Purpose", width: 300,align: 'left', sortable: true},

 
        ],
        stripeRows: true,
        height:100,
        width:1000,


       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'DELIVERY NOTE ENTRY',
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
			cmbwono.setValue(selrow.get('wono'));
			cmbwono.setRawValue(selrow.get('wono'));
			cmbitem.setValue(selrow.get('itemcode'));
			txtuom.setRawValue(selrow.get('uom'));
			txtdnqty.setValue(selrow.get('qty'));
			txtpurpose.setValue(selrow.get('purpose'));
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
        width        :  920, 
        title        : 'Delivery Note - Work order based',
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
                           Ext.getCmp('cmbdnno').show();
                           gstFlag = "Edit";
                           loadDNlistdatastore.removeAll();
                           loadDNlistdatastore.load({
      		              url: 'ClsDeliveryNotewobased.php',
                              params: {
			          task: 'loaddnnolist',
			          finid: txtwoyear.getValue(),
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(loadDNlistdatastore.getCount());	
                              }
                           });

                        }
                    }
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {

alert(woseqno);
alert(gstFlag);
                        if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Delivery Note','Grid should not be empty..');
        	                gstSave="false";
	                    }
                            else if (cmbparty.getRawValue() == "" || cmbparty.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Party  Name is Empty.....');
                            }
                            else if (cmbdept.getRawValue() == "" || cmbdept.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Department Name is Empty.....');
                            }
 
                            else if (cmbcarrier.getRawValue() == "" || cmbcarrier.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Carrier Name cannot be Empty.....');
                            }
                            else if (txtremarks.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Note','Remarks Line is empty .....');
                            }
                            else if (txtrefno.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Note','Reference	 Line is empty .....');
                            }
                            else if (Number(txtreturndays .getRawValue()) == 0)
                            {
                                  Ext.Msg.alert('Delivery Note','Expected Return Days is empty');
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
				               url: 'TrnDeliveryNoteSavewobased.php',
				               params:
						{
						griddet: Ext.util.JSON.encode(finupdData),       
 						cnt: finData.length,
                                                savetype     : gstFlag,
						genhcompcode  : Gincompcode,
						genhfincode   : Ginfinid,
                                                wofinyear     : txtwoyear.getValue(), 
                                                woseqno       : woseqno,    
						genhno        : txtdnno.getValue(),
						genhdate      : Ext.util.Format.date(dtdnote.getValue(),"Y-m-d"),
						genhparty     : cmbparty.getValue(),
						genhtag       : "W",   
						genhtype      : "D",
						genhdept      : cmbdept.getValue(),
						genhretype    : returntype,
						genhtotqty    : txttotqty.getValue(),  
						genhtotval    : 0,
						genhcarrier   : cmbcarrier.getValue(),
						genhfreight   : cmbfreight.getRawValue(),
						genhdays      : txtreturndays.getValue(), 
						genhremarks   : txtremarks.getValue(), 
						genhrefno     : txtrefno.getValue(), 
						genhrefdate   : Ext.util.Format.date(dtref.getValue(),"Y-m-d"),
						genhfrtamt    : 0,
						genhvalue     : 0,
						genhdiscount  : 0,
						genhsertaxper : 0,
						genhsertaxamt : 0,
						genheduper : 0,
						genheduamt : 0,
						genhsheper : 0,
						genhsheamt : 0,
						genhtransunitrate : 0,
						genhtransamt : 0,
						genhotheramt : 0,
						genhlabouramt : 0,
						genhcgstper : 0,
						genhcgstamt : 0,
						genhsgstper : 0,
						genhsgstamt : 0,
						genhigstper : 0,
						genhigstamt : 0,
						genhlessamt : 0,
						genhinwardfrt : 0,
						genhoutwardfrt : 0,
						genhbillno   : 0,
						genhbilldate : Ext.util.Format.date(new Date(),"Y-m-d"), 
						genhgateeno : '',
						genhgateedate :Ext.util.Format.date(new Date(),"Y-m-d"),
						genhtruckno  : txttruckno.getValue(), 
						genhaccupd  : 'N',
						genhaccvouno : 'N',
						genhaccvoudate :Ext.util.Format.date(new Date(),"Y-m-d"),
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Delivery Note Saved -" + obj['dnno'] + " Sucessfully");
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Delivery Note Not Saved!- " + obj['dnno']);                                                  
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
                    icon: '../icons/view.png'
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
                       height: 90,
                       width: 250,
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
                                      txtdnno
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
                                      cmbdnno
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
                                      dtdnote
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
                       x:  260,  
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
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : '',
			       height	   : 90,
                               width       : 150,
                               x           : 760,
                               y           : 10,
                               //defaultType : 'textfield',
                               border      : true,
                               items: [opt_year]
                            },
  
{
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : 15,
			      //height	   : 90,
                               width       : 110,
                               x           : 820,
                               y           : 40,
                               //defaultType : 'textfield',
                               border      : false,
                               items: [txtwoyear]
                            },     

                 {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:200,
                       width: 900,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 110,
                       items: [

                              { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 0,  
                                  y: -10,
                                  items: [lblwono]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:90,
                                  x: 80,  
                                  y: -10,
                                  items: [lblitem]
                                },

                              { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 350,  
                                  y: -10,
                                  items: [lbluom]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:50,
                                  x: 420,  
                                  y: -10,
                                  items: [lblbalqty]
                                },
 
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 480,  
                                  y: -10,
                                  items: [lbldnqty]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 560,  
                                  y: -10,
                                  items: [lblpurpose]
                                },
                                { 
                                   xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 100,
                                  labelWidth:1,
                                  x: -5,  
                                  y: 10,
                                  items: [cmbwono]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:1,
                                  x: 70,  
                                  y: 10,
                                  items: [cmbitem]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:1,
                                  x: 330,  
                                  y: 10,
                                  items: [txtuom]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 70,
                                  labelWidth:1,
                                  x: 410,  
                                  y: 10,
                                  items: [txtwoqty]
                               },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 70,
                                  labelWidth:1,
                                  x: 470,  
                                  y: 10,
                                  items: [txtdnqty]
                               },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 250,
                                  labelWidth:1,
                                  x: 550,  
                                  y: 10,
                                  items: [txtpurpose]
                               }, 
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:60,
                                  x: 800,  
                                  y: 10,
                                  items: [btnsubmit]
                               }, 

                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 190,
                                  width: 850,
                                  labelWidth:75,
                                  x:10,  
                                  y:43,
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
                                  y:147,
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
                                  width: 400,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 0,
                                  items: [cmbcarrier]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:50,
                                  x: 400,  
                                  y: 0,
                                  items: [txttruckno]
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
                                  items: [cmbfreight]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 240,  
                                  y: 60,
                                  items: [txtfreight]
                                },

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
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:90,
                                  x: 440,  
                                  y: 90,
                                  items: [txtreturndays]
                                },

                      ]
                  },  


          ]     



    });


function RefreshData(){
        myFormPanel.getForm().reset();

        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbdnno').hide();
        txtwoyear.setValue(Ginfinid);
 	loadDNdatastore.removeAll();
	loadDNdatastore.load({
        url: 'ClsDeliveryNotewobased.php',
        params: {
                    task: 'loaddnno',
                    compcode:Gincompcode,
                    finid:Ginfinid  
                },
		callback:function()
      		{
//    alert(loadDNdatastore.getAt(0).get('dnno'));
                    txtdnno.setValue(loadDNdatastore.getAt(0).get('dnno'));
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
 		    url: 'ClsDeliveryNotewobased.php',
                    params: {
		       task: 'loadsupplier'
		      	}
                 });

             	LoadDeptDatastore.load({
		    url: 'ClsDeliveryNotewobased.php',
                    params: {
		         task: 'loaddept'
	         	}
               	});                                   					
             	LoadItemDatastore.load({
		    url: 'ClsDeliveryNotewobased.php',
                    params: {
		         task: 'loaditemlist'
	         	}
               	});                                   					

             	LoadCarrierDatastore.load({
		    url: 'ClsDeliveryNotewobased.php',
                    params: {
		         task: 'loadcarrier'
	         	}
               	});        
                           					

	  }

        }  
  
});
  window_form.show();
  
});
