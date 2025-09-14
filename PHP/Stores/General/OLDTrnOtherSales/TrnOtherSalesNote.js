Ext.onReady(function(){
Ext.QuickTips.init();

   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
  
  var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadothsaleno"}, // this parameter asks for listing
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
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'salitem_name','salitem_code'
      ]),
    }); 

var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
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
                url: 'ClsOthSales.php',      // File to connect to
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


var fdbl_totalvalue;
var cgst_val;
var sgst_val;
var igst_val;
function grid_tot(){
			fdbl_totalvalue=0;
			fdbl_totalactval = 0;
			cgst_val  =0;
			sgst_val  =0;
			igst_val  =0;
        		var Row= flxDetail.getStore().getCount();
			
			
        			flxDetail.getSelectionModel().selectAll();
        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.totamt);
				    cgst_val = Number(cgst_val)+Number(sel[i].data.cgstval);
				    sgst_val = Number(sgst_val)+Number(sel[i].data.sgstval);
				    igst_val = Number(igst_val)+Number(sel[i].data.igstval);
				   
        			}
					alert(cgst_val);
       				    	txttvalue.setValue(fdbl_totalvalue);
					txttcgst.setValue(cgst_val);
					txttsgst.setValue(sgst_val);
					txttigst.setValue(igst_val);
					txtnetamt.setValue(Number(fdbl_totalvalue)+Number(cgst_val)+Number(sgst_val)+Number(igst_val))
				   
						
		   }
   

/*'cmbcustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval',
'totamt','editcode'*/
   
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
        width       : 80,
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

     var txtourref = new Ext.form.TextField({
        fieldLabel  : 'Our Ref',
        id          : 'txtourref',
        width       : 150,
        name        : 'txtourref'
   });

     var txtpartyref = new Ext.form.TextField({
        fieldLabel  : 'Party Ref',
        id          : 'txtpartyref',
        width       : 150,
        name        : 'txtpartyref'
   });
   
   
   
  /* 'cmbcustomer','uon','unitrate','qty','amount','cgstper','cgstval','sgstper','sgstval','igstper','igstval','insper',
'insval','freight','others','totamt','purled','cgstled','cgstled','igstled','freightled','insled','otherled','itemcode','purled','cgstledcode',
'sgstledcode','igstledcode','insledcode','otherledcode','uomcode','editcode'*/
    'cmbcustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval',
'totamt','editcode'
var addbtn = new Ext.Button({
        text: 'ADD',
        width: 60,
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',
	listeners:{ 
    		click: function(){
			
                	 				var RowCnt = flxDetail.getStore().getCount() + 1;
                          				flxDetail.getStore().insert(
                           				flxDetail.getStore().getCount(),
                           				new dgrecord({
				                			  cmbcustomer:cmbitem.getRawValue(),
									  itemcode :cmbitem.getValue(),
				              				  uon:txtuom.getRawValue(),
				            				  unitrate:txtunitrate.getRawValue(),
									  qty:txtsaleqty.getRawValue(),
									  amount:txttotalamt.getRawValue(),
									  others:txtforoth.getRawValue(),
									  taxablevalue:'0',
									  cgstper:txtcgst.getRawValue(),
									  cgstval:txtcgstval.getRawValue(),
									  sgstper:txtsgst.getRawValue(),
									  sgstval:txtsgstval.getRawValue(),
									  igstper:txtigst.getRawValue(),
									  igstval:txtigstval.getRawValue(),
									  totamt:txttotalamt.getRawValue(),
									  editcode:'N'
									  


                           				              })
                          					);
								/*txtinsppcs.reset();
								txtrejectedpcs.reset();
								txtrecutpcs.reset();
								txtmakingpcs.reset();
								txtpasspcs.reset();*/
grid_tot();
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
    
       var cmbpayment = new Ext.form.ComboBox({
        id: 'cmbpayment',
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
    
    
var cmbcustomer = new Ext.form.ComboBox({
        id: 'cmbcustomer',
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
  
  var cmbtransport = new Ext.form.ComboBox({
        id: 'cmbtransport',
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
      
      
 
 
      
       var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: LoadItemDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item Name',
        editable:false,
        labelWidth:30,
        displayField: 'salitem_name',
        valueField: 'salitem_code',
        hiddenName : 'salitem_name',
        width: 200,
    	listeners:{
        select:function(){
			
			LoadItemDetDatastore.load({
                        url: 'ClsOthSales.php',
                        params:
                            {
                                task:"loaditemdet",
                                compcode:Gincompcode,
				finid:GinFinid,
				item:cmbitem.getValue()
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

  var dtsales = new Ext.form.DateField
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
        },[ 'cmbcustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval',
'totamt','editcode'
        ])
    });

/*-------------------- Second grid panel ---------------------- */
var dgrecord = Ext.data.Record.create([]);
      var flxDetail = new Ext.grid.EditorGridPanel({
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
        
 		{id:'cmbcustomer',header: "Item Name",width: 285,align: 'center',sortable: true},
		{id:'itemcode',header: "Item Code",width: 60,align: 'center',sortable: true},
 		{id:'uon',header: "UOM",width: 100, align: 'center',sortable: true},
		{id:'unitrate',header: "Unit Rate",width: 60,align: 'center',sortable: true},
        	{id:'qty',header: "Quantity", width: 60,align: 'center', sortable: true},
		{id:'amount',header: "Amount", width: 100, align: 'center', sortable: true},
		{id:'others',header: "Others",width: 60,align: 'center',sortable: true},
		{id:'taxablevalue',header: "Taxable Value",width: 60,align: 'center',sortable: true},
 		{id:'cgstper',header: "CGST %", width: 60,align: 'right',sortable: true},
		{id:'cgstval',header: "CGST Val",width: 60,align: 'right',sortable: true},
		{id:'sgstper ', header: "SGST %",width: 60, align: 'center', sortable: true},
		{id:'sgstval',header: "SGST Val",width: 60,align: 'center',sortable: true},
		{id:'igstper ', header: "IGST %",width: 60, align: 'center', sortable: true},
		{id:'igstval', header: "IGST Val", width: 60, align: 'center',sortable: true},
		{id:'totamt',header: "Total Amt",width: 60,align: 'center',sortable: true},
		{id:'editcode',header: "Edit Qty",width: 60,align: 'center',sortable: true},

       

       
        ],
        stripeRows: true,
        height:170,
        width:1050
     });



 

var myFormPanel = new Ext.form.FormPanel({
        width        :  1050, 
        title        : 'MISCELLANEOUS SALES',
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
                       height: 120,
                       width: 800,
                       labelWidth:80,
                       x: 40,  
                       y : 5,
                       items: [
                            txtsalenoteno
                            ,dtsales ,

                            { 
                               xtype: 'fieldset',
                       title: '',
                       border: true,
                       width: 350,
                       labelWidth:60,
                       x: 0,  
                       y: 0,
                       items: [
                              cmbcustomer
                          ]
                       },

                      ],
                    },
                   
         /* {
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
                    x: 580,  
                    y: 80,
                    items: [
                       cmbitem
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:70,
                    x: 580,  
                    y: 80,
                    items: [
                       txtuom
                    ]
                    },
 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:70,
                    x: 780,  
                    y: 80,
                    items: [
                       txtunitrate
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
                       txtcgst,txtsgst,txtigst//,txtinsurance,txtfreight
                     
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
                        //txtstock,
			txtcgstval,txtsgstval,txtigstval//,txtinsvalue
                      
                    ]
                    },
{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:70,
                    x: 0,  
                    y: 210,
                    items: [
                       txtforoth
                    ]
                    },
                       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 100,
                    width: 175,
                    labelWidth:70,
                    x:0,  
                    y:100,
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
                    y:150,
                    items: [
                       txttotalamt
                    ]
                    },
                    
                     /*  {
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
                    },*/
                
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 100,
                    labelWidth:75,
                    x:550,  
                    y:150,
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
                    y:250,
                    items: [
                      flxDetail
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
                    y:440,
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
                    y:440,
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
                    y:440,
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
                    y:440,
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
                    y:440,
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
                    y:440,
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
                    border: true,
                    height: 230,
                    width: 855,
                    labelWidth:85,
                    x:0 ,  
                    y:0 ,
                    items: [
                       cmbpayment,cmbtransport,txtcarrier,txtremark,txtourref,txtpartyref
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
                                               var finData = flxDetail.getStore().getRange();                                        
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
	                                        snhseqno : '0',
						snhcompcode :'1',
						snhfincode : '27',
						snhdate : '0',
						snhcustcode : '0',
						snhpaymode : cmbpayment.getValue(),
						snhtransport :cmbtransport.getValue(),
						snhvehno : txtcarrier.getRawValue(),
						snhremarks : txtremark.getRawValue(),
						ourref:txtourref.getRawValue(),
						partyref:txtpartyref.getRawValue()
						
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Sales Saved -" + obj['saleno']);
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
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
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadothsaleno',
					    finid:GinFinid,
					    compcode:Gincompcode
						
					},
					callback:function()
					{
					txtsalenoteno.setValue(LoadSalenoteNoDatastore.getAt(0).get('salenoteno'));
					}
				    	});

					LoadSupplierDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadsupplier'
					}
				    	});

					LoadCarrierDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadcarrier'
					}
				    	});

					LoadPaytermDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadpayterms'
					}
				    	});

					LoadItemDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loaditem'
					}
				    	});
					
					LoadledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadledger'
					}
				    	});

					LoadCgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadcgstledger'
					}
				    	});

					LoadSgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadsgstledger'
					}
				    	});

					LoadIgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadigstledger'
					}
				    	});
					}
				  }


  
});
  window_form.show();
  
});
