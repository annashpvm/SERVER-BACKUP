Ext.onReady(function(){
Ext.QuickTips.init();

   //    var GinFinid =localStorage.getItem('tfinid');
  // var Gincompcode = localStorage.getItem('tcompcode');
       var GinFinid = 27;
   var Gincompcode = 1;

  var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
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
      ])
    });
 
var LoadSalenoteNoDatastore =  new Ext.data.Store({
      id: 'LoadSalenoteNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalenoteno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'salenoteno'
      ])
    });

var LoadPaytermDatastore = new Ext.data.Store({
      id: 'LoadPaytermDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpayterms"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'term_name','term_code'
      ]),
    }); 

var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
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
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','item_code'
      ]),
    }); 

var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_code','item_avg_rate','item_stock','uom_code','uom_name'
      ]),
    }); 

var LoadledgerDatastore = new Ext.data.Store({
      id: 'LoadledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    }); 

var LoadCgstledgerDatastore = new Ext.data.Store({
      id: 'LoadCgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcgstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });

var LoadSgstledgerDatastore = new Ext.data.Store({
      id: 'LoadSgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsgstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });

var LoadIgstledgerDatastore = new Ext.data.Store({
      id: 'LoadIgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesnote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadigstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });


var txtunitrate = new Ext.form.NumberField({
        fieldLabel  : 'Unit Rate',
        id          : 'txtunitrate',
        width       : 75,
        name        : 'txtunitrate',
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
			txtcgstval.setRawValue(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue())*9/100);
			txtsgstval.setRawValue(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue())*9/100);
			
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtforoth.getValue()));
			}

		}
   }); 
   
  var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        width       : 75,
        name        : 'txtstock'
   });  
   
 
     var txtsaleqty = new Ext.form.NumberField({
        fieldLabel  : 'Sale Qty',
        id          : 'txtsaleqty',
        width       : 75,
        name        : 'txtsaleqty',
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
			txtcgstval.setRawValue(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue())*9/100);
			txtsgstval.setRawValue(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue())*9/100);
			
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtforoth.getValue()));
			}

		}
   }); 
   
   
     var txtcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST (%)',
        id          : 'txtcgst',
        width       : 75,
	value	    : 9,
        name        : 'txtcgst'
   }); 
   
        var txtsgst = new Ext.form.NumberField({ 	
        fieldLabel  : 'SGST (%)',
        id          : 'txtsgst',
        width       : 75,
	value	    : 9,
        name        : 'txtsgst'
   }); 
        var txtigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST (%)',
        id          : 'txtigst',
        width       : 75,
        name        : 'txtigst'
   }); 
   
   var txtinsvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtinsvalue',
        width       : 75,
	readOnly    :true,
        name        : 'txtinsvalue'
   }); 
  
  var txttotalamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Amount',
        id          : 'txttotalamt',
        width       : 75,
        name        : 'txttotalamt'
   }); 
     var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcgstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtcgstval'
   }); 
   
        var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsgstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtsgstval'
   }); 
        var txtigstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtigstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtigstval'
   }); 
      
   var txtinsurance = new Ext.form.NumberField({
        fieldLabel  : 'Insurance',
        id          : 'txtinsurance',
        width       : 75,
        name        : 'txtinsurance',
	enableKeyEvents: true,	
	listeners   :
		{
		keyup:function()
			{
			txtinsvalue.setRawValue(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue())*Number(this.getValue())/100);
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtforoth.getValue()));
			}

		}
   });
      
   var txtforoth = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtforoth',
        width       : 75,
	enableKeyEvents: true,	
        name        : 'txtforoth',	
	listeners   :
		{
		keyup:function()
			{
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtforoth.getValue()));
			}

		}
   });
   
    var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight',
	enableKeyEvents: true,	
	listeners   :
		{
		keyup:function()
			{
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtforoth.getValue()));
			}

		}
   });
   
 
   var txtcarrier = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No.',
        id          : 'txtcarrier',
        width       : 250,
        name        : 'txtcarrier'
   });
   
     var txtuom = new Ext.form.TextField({
        fieldLabel  : 'UOM',
        id          : 'txtuom',
        width       : 85,
        name        : 'txtuom'
   });
   
   var txtremark = new Ext.form.TextArea({
        fieldLabel  : 'Remark',
        id          : 'txtremark',
        width       : 250,
        name        : 'txtremark'
   });
   
   
     var txttvalue = new Ext.form.NumberField({
        fieldLabel  : '  Value',
        id          : 'txttvalue',
        width       : 75,
        name        : 'txttvalue'
   }); 
   
      var txttcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txttcgst',
        width       : 75,
        name        : 'txttcgst'
   });  
   
   
      var txttsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txttsgst',
        width       : 75,
        name        : 'txttsgst'
   }); 
   
      var txttigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txttigst',
        width       : 75,
        name        : 'txttigst'
   }); 
   
   
      var txtroff = new Ext.form.NumberField({
        fieldLabel  : 'R.Off',
        id          : 'txtroff',
        width       : 75,
        name        : 'txtroff'
   }); 
   
   
      var txtnetamt = new Ext.form.NumberField({
        fieldLabel  : 'Net Amount',
        id          : 'txtnetamt',
        width       : 75,
        name        : 'txtnetamt'
   }); 

      var txtsalenoteno = new Ext.form.NumberField({
        fieldLabel  : 'Sale Note No',
        id          : 'txtsalenoteno',
        width       : 75,
        name        : 'txtsalenoteno'
   }); 
   
   
  /* 'itemname','uon','unitrate','qty','amount','cgstper','cgstval','sgstper','sgstval','igstper','igstval','insper',
'insval','freight','others','totamt','purled','cgstled','cgstled','igstled','freightled','insled','otherled','itemcode','purled','cgstledcode',
'sgstledcode','igstledcode','insledcode','otherledcode','uomcode','editcode'*/
   
 var addbtn = new Ext.Button({
        text: 'ADD',
        width: 60,
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',
	listeners:{ 
    		click: function(){
			
                	 	var RowCnt = grid2.getStore().getCount() + 1;
                  		grid2.getStore().insert(
                           	grid2.getStore().getCount(),
                           	new dgrecord({
				               itemname:item_combo.getRawValue(),
				               uon:txtuom.getRawValue(),
				               unitrate:txtunitrate.getRawValue(),
					       qty:txtsaleqty.getRawValue(),
					       recutpcs:'0',
					       cgstper:txtcgst.getRawValue(),
					       cgstval:txtcgstval.getRawValue(),
					       sgstper:txtsgst.getRawValue(),
					       sgstval:txtsgstval.getRawValue(),
					       igstper:txtigst.getRawValue(),
					       igstval:txtigstval.getRawValue(),
					       insval:txtinsurance.getRawValue(),
					       freight:txtcarrier.getRawValue(),
					       others:txtforoth.getRawValue(),
					       totamt:txttotalamt.getRawValue(),
					       purled:purchase_combo.getValue(),
					       cgstled:cgst_combo.getValue(),
					       sgstled:sgst_combo.getValue(),
					       igstled:igst_combo.getValue(),
					       freightled:frieght_combo.getValue(),
					       insled:insurance_combo.getValue(),
					       otherled:'0',
					       itemcode:item_combo.getValue(),
					       purled:othexp_combo.getValue(),
					       cgstledcode:'0',
					       sgstledcode:'0',
					       igstledcode:'0',
					       insledcode:'0',
					       otherledcode:'0',
					       uomcode:'0',
					       editcode:'0'



                           				              })
                          					);
								/*txtinsppcs.reset();
								txtrejectedpcs.reset();
								txtrecutpcs.reset();
								txtmakingpcs.reset();
								txtpasspcs.reset();*/
                        	}    
		  }
	       	              
	

})
 
 
var store = new Ext.data.Store({
     
    });

var purchase_combo = new Ext.form.ComboBox({
        id: 'purchase_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Purchase  Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var cgst_combo = new Ext.form.ComboBox({
        id: 'cgst_combo',
        store: LoadCgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'CGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var sgst_combo = new Ext.form.ComboBox({
        id: 'sgst_combo',
        store: LoadSgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'SGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var igst_combo = new Ext.form.ComboBox({
        id: 'igst_combo',
        store: LoadIgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'IGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});


var frieght_combo = new Ext.form.ComboBox({
        id: 'frieght_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Frieght Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var insurance_combo = new Ext.form.ComboBox({
        id: 'insurance_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Insurance Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var othexp_combo = new Ext.form.ComboBox({
        id: 'othexp_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Other Exp. Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});
    
       var payment_combo = new Ext.form.ComboBox({
        id: 'payment_combo',
        store: LoadPaytermDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Payment Mode',
        editable:true,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : 'term_name',
        width: 200

    });

var store3 = new Ext.data.Store({
      
    });
    
    
var name_combo = new Ext.form.ComboBox({
        id: 'name_combo',
        store: LoadSupplierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Customer ',
        editable:true,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : '',
        width: 250
  });
  
  var transport_combo = new Ext.form.ComboBox({
        id: 'transport_combo',
        store: LoadCarrierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Transport',
        editable:false,
        displayField: 'carr_name',
        valueField: 'carr_code',
        hiddenName : 'carr_name',
        width: 200
  });

 var cst_combo = new Ext.form.ComboBox({
        id: 'cst_combo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'TNGST / CST No - Date',
        editable:false,
        width: 150
});
      
      
 
 
      
       var item_combo = new Ext.form.ComboBox({
        id: 'item_combo',
        store: LoadItemDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item Name',
        editable:false,
        labelWidth:30,
        displayField: 'item_name',
        valueField: 'item_code',
        hiddenName : 'item_name',
        width: 200,
    	listeners:{
        select:function(){
			
			LoadItemDetDatastore.load({
                        url: 'ClsSalesnote.php',
                        params:
                            {
                                task:"loaditemdet",
                                compcode:Gincompcode,
				finid:GinFinid,
				item:item_combo.getValue()
                            },
				callback:function(){
				txtuom.setRawValue(LoadItemDetDatastore.getAt(0).get('uom_name'));
				txtstock.setRawValue(LoadItemDetDatastore.getAt(0).get('item_stock'));
				txtunitrate.setRawValue(LoadItemDetDatastore.getAt(0).get('item_avg_rate'));

				
        	        		}
                        });         
        }
    }
       
      });
      
 
 



var store6 = new Ext.data.Store({
       
    });

/*var partyname = new Ext.form.ComboBox({
        id: 'partyname',
        store: LoadSupplierDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_refcode',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:false,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 250
           
      });*/

  var date1 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
    
    
  var date2 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
 
    var gridstore2 = new Ext.data.JsonStore({
       
    });

    

var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})

var gridstore2 = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'gridstore2'
        },[
           'itemname','uon','unitrate','qty','amount','cgstper','cgstval','sgstper','sgstval','igstper','igstval','insper',
'insval','freight','others','totamt','purled','cgstled','cgstled','igstled','freightled','insled','otherled','itemcode','purled','cgstledcode',
'sgstledcode','igstledcode','insledcode','otherledcode','uomcode','editcode'
        ])
    });

/*-------------------- Second grid panel ---------------------- */
var dgrecord = Ext.data.Record.create([]);
      var grid2 = new Ext.grid.EditorGridPanel({
        store            : gridstore2,
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
        
        {id:'itemname',header: "Item Name",width: 285,align: 'center',sortable: true},
        {id:'uon',header: "UOM",width: 100, align: 'center',sortable: true},
        {id:'unitrate',header: "Unit Rate",width: 60,align: 'center',sortable: true},
        {id:'qty',header: "Quantity", width: 60,align: 'center', sortable: true},
        {id:'amount',header: "Amount", width: 100, align: 'center', sortable: true},
        {id:'cgstper',header: "CGST %", width: 60,align: 'right',sortable: true},
        {id:'cgstval',header: "CGST Val",width: 60,align: 'right',sortable: true},
        {id:'sgstper ', header: "SGST %",width: 60, align: 'center', sortable: true},
        {id:'sgstval',header: "SGST Val",width: 60,align: 'center',sortable: true},
        {id:'igstper ', header: "IGST %",width: 60, align: 'center', sortable: true},
        {id:'igstval', header: "IGST Val", width: 60, align: 'center',sortable: true},
 	{id:'insper',header: "Ins Per",width: 60,align: 'center',sortable: true},
	{id:'insval',header: "Ins Val",width: 60,align: 'center',sortable: true},
	{id:'freight',header: "Freight",width: 60,align: 'center',sortable: true},
	{id:'others',header: "Others",width: 60,align: 'center',sortable: true},
	{id:'totamt',header: "Total Amt",width: 60,align: 'center',sortable: true},
	{id:'purled',header: "Purchase Leg",width: 60,align: 'center',sortable: true},
	{id:'cgstled',header: "CGST LED",width: 60,align: 'center',sortable: true},
	{id:'sgstled',header: "SGST LED",width: 60,align: 'center',sortable: true},
	{id:'igstled',header: "IGST LED",width: 60,align: 'center',sortable: true},
	{id:'freightled',header: "Freight Led",width: 60,align: 'center',sortable: true},
	{id:'insled',header: "Ins Led",width: 60,align: 'center',sortable: true},
	{id:'otherled',header: "Other Led",width: 60,align: 'center',sortable: true},
	{id:'itemcode',header: "Item Code",width: 60,align: 'center',sortable: true},
	{id:'purled',header: "Pur Ledcode",width: 60,align: 'center',sortable: true},
	{id:'cgstledcode',header: "CGST Ledcode",width: 60,align: 'center',sortable: true},
	{id:'sgstledcode',header: "SGST Ledcode",width: 60,align: 'center',sortable: true},
	{id:'igstledcode',header: "IGST Ledcode",width: 60,align: 'center',sortable: true},
	{id:'insledcode',header: "Insurance Ledcode",width: 60,align: 'center',sortable: true},
	{id:'otherledcode',header: "Other Ledcode",width: 60,align: 'center',sortable: true},
	{id:'uomcode',header: "UOM Code",width: 60,align: 'center',sortable: true},
	{id:'editcode',header: "Edit code",width: 60,align: 'center',sortable: true},

       
        ],
        stripeRows: true,
        height:170,
        width:1050
     });



 

var myFormPanel = new Ext.form.FormPanel({
        width        :  1050, 
        title        : 'Sales Note Entry',
        style        : 'margin: 5px ',
        height       : 650,
        frame        : false,
        bodyStyle    : 'background: url(.../icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'myFormPanel',
        layout       : 'absolute',
 
          reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                  
                    },[
                     {},
                       
                  ]),
        items        : [
        
            {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 600,
            width: 1050,
            x: 0,
            y: 20,
            items: [
            {
                xtype: 'panel',
                title: 'Sales Note Entry - I',
                width: 200,
                height: 300,
                layout: 'absolute',
                items: [
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 85,
                    width: 200,
                    labelWidth:80,
                    x: 0,  
                    y: 5,
                    items: [
                         
                            txtsalenoteno
                        ,date1
                    ]
                    },
                   
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 85,
                    width: 350,
                    labelWidth:60,
                    x: 200,  
                    y: 5,
                    items: [
                       name_combo
                    ]
                    },/* {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 350,
                    labelWidth:150,
                    x: 200,  
                    y: 45,
                    items: [
                       cst_combo
                    ]
                    },*/
                   
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 300,
                    labelWidth:70,
                    x: 0,  
                    y: 88,
                    items: [
                       item_combo
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:50,
                    x: 300,  
                    y: 88,
                    items: [
                       txtuom
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 200,
                    width: 900,
                    labelWidth:70,
                    //layout: 'absolute',
                    x:0,  
                    y:131,
                    items: [
                       txtunitrate, txtcgst,txtsgst,txtigst,txtinsurance,txtfreight
                     
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 200,
                    width: 270,
                    labelWidth:50,
                    x:170,  
                    y:131,
                    items: [
                        txtstock,txtcgstval,txtsgstval,txtigstval,txtinsvalue,txtforoth
                      
                    ]
                    },
                       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 100,
                    width: 175,
                    labelWidth:50,
                    x:335,  
                    y:131,
                    items: [
                        txtsaleqty
                      
                    ]
                    }, {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 200,
                    labelWidth:80,
                    x:335,  
                    y:250,
                    items: [
                       txttotalamt
                    ]
                    },
                    
                       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 250,
                    width: 350,
                    labelWidth:120,
                    x: 580,  
                    y: 5,
                    items: [
                      purchase_combo,cgst_combo,sgst_combo,igst_combo,frieght_combo,insurance_combo,othexp_combo
                    ]
                    },
                
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 100,
                    labelWidth:75,
                    x:550,  
                    y:250,
                    items: [
                        addbtn
                    ]
                    },{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 190,
                    width: 1050,
                    labelWidth:75,
                    x:0,  
                    y:300,
                    items: [
                      grid2
                    ]
                    },
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:0,  
                    y:490,
                    items: [
                      txttvalue
                    ]
                    },
			{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:160,  
                    y:490,
                    items: [
                      txttcgst
                    ]
                    },
                      
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:320,  
                    y:490,
                    items: [
                      txttsgst
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:480,  
                    y:490,
                    items: [
                      txttigst
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:660,  
                    y:490,
                    items: [
                      txtroff
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 200,
                    labelWidth:80,
                    x:830,  
                    y:490,
                    items: [
                      txtnetamt
                    ]
                    }
                            
                ]
            },
            {
                xtype: 'panel',
                title: 'Sales Note Entry - II',
                width: 383,
                height: 200,
                layout: 'absolute',
                items: [
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 180,
                    width: 855,
                    labelWidth:85,
                    x:0 ,  
                    y:0 ,
                    items: [
                       payment_combo,transport_combo,txtcarrier,txtremark
                    ]
                 }
                 
                ]
            }
            
            ]
        } ,
    
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {
                   	 if(Gincompcode ==0)
			{
				alert("Select Invoice Type..");
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
                                               var finData = grid2.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnSalesNoteSave.php',
				               params:
						{
						griddet: Ext.util.JSON.encode(finupdData),       
 						cnt: finData.length,
						snhcompcode :Gincompcode,
						snhfincode : GinFinid,
						snhno : '0',
						snhdate : Ext.util.Format.date(date1.getValue(),"Y-m-d"),	
						snhcustcode : name_combo.getValue(),
						snhtotamt :txttotalamt.getRawValue() ,
						snhcgst : txtcgstval.getRawValue(),
						snhsgst : txtsgstval.getRawValue(),
						snhigst : txtigstval.getRawValue(),
						snhins : txtinsurance.getRawValue(),
						snhfrieght : txtfreight.getRawValue(),
						snhoth : txtforoth.getRawValue(),
						snhroff : '0',
						snhnetamt : txtnetamt.getRawValue(),
						snhpaymode : payment_combo.getValue(),
						snhtransport :transport_combo.getValue(),
						snhvehno : txtcarrier.getRawValue(),
						snhremarks : txtremark.getRawValue(),
						snhvouno : '0',
						snhusrcode : '0',
						cancelflag : 'N'
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Sales Saved -" + obj['saleno']);
	                                    myFormPanel.getForm().reset();
	                                    grid2.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Sales Not Saved!- " + obj['saleno']);                                                  
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
                    xtype: 'button',
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',
                {
                    xtype: 'button',
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png'
                    
                }
            ]
        }
    });

var window_form = new Ext.Window({
                         width        : 1060,        
                         height       : 700,
                         items        : myFormPanel,
                         closable	:false,
                         resizable	:false,
                         draggable	:false,
                         x		:130,
                         y		:35,
			listeners:{
					
			       		show:function()
					{
					
					LoadSalenoteNoDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadsaleno',
					    finid:GinFinid,
					    compcode:Gincompcode
						
					},
					callback:function()
					{
					txtsalenoteno.setValue(LoadSalenoteNoDatastore.getAt(0).get('salenoteno'));
					}
				    	});

					LoadSupplierDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadsupplier'
					}
				    	});

					LoadCarrierDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadcarrier'
					}
				    	});

					LoadPaytermDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadpayterms'
					}
				    	});

					LoadItemDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loaditem'
					}
				    	});
					
					LoadledgerDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadledger'
					}
				    	});

					LoadCgstledgerDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadcgstledger'
					}
				    	});

					LoadSgstledgerDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadsgstledger'
					}
				    	});

					LoadIgstledgerDatastore.load({
					url: 'ClsSalesnote.php',
					params: {
					    task: 'loadigstledger'
					}
				    	});
					}
				  }


  
});
  window_form.show();
  
});
