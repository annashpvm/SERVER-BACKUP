Ext.onReady(function(){
   Ext.QuickTips.init();
   	var Gincompcode = localStorage.getItem('gincompcode');
   	var GinFinid = localStorage.getItem('ginfinid');
   	var GinYear = localStorage.getItem('gstyear');
   	var userid = localStorage.getItem('ginuser');
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemtypep = "-1";
	var chkrate = 0;
	var oldopstk =0, oldopvalue  = 0;

        var chkitemcode = 0; 

        new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);


  var loadunitdatastore = new Ext.data.Store({
      id: 'loadunitdatastore',
      autoload : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOPStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadunit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'uom_code', type: 'int',mapping:'uom_code'},
	{name:'uom_name', type: 'string',mapping:'uom_name'}
      ]),
    });


  var loadLocationDataStore = new Ext.data.Store({
      id: 'loadLocationDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOPStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLocation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'loc_code', type: 'int',mapping:'loc_code'},
	{name:'loc_name', type: 'string',mapping:'loc_name'}
      ]),
    });

  var loadItemStockDatastore = new Ext.data.Store({
      id: 'loadItemStockDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOPStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['uom_short_name','item_avg_rate','item_stock'
      ]),
    });


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOPStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

          'item_code', 'item_name','item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5', 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10','item_uom'
 

      ]),
    });



var cmbUOM = new Ext.form.ComboBox({
        fieldLabel      : 'UOM',
        width           :  80,
        displayField    : 'uom_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbUOM',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadunitdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


var cmbLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Location',
        width           :  130,
        displayField    : 'loc_name', 
        valueField      : 'loc_code',
        hiddenName      : '',
        id              : 'cmbLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : loadLocationDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


function itemSearch()
{


        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsOPStock.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
		},
        });
}






   function flxItemClick()
  {
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			if ((selrow != null)){
				gridedit = "true";
				editrow = selrow;
				chkitemcode = selrow.get('item_code');
				txtItemName.setValue(selrow.get('item_name'));
				cmbUOM.setValue(selrow.get('item_uom'));
 


                                flxItem.hide();  
                       //         txtQty.focus();

                        loadItemStockDatastore.removeAll();
			loadItemStockDatastore.load({
                        url: 'ClsOPStock.php',
                        params:
                            {
                                task:"loadItemStock",
                                itemcode:chkitemcode,
                                compcode:Gincompcode,
                                finid:Ginfinid,
                            },
                           callback: function () {
                               var cnt = loadItemStockDatastore.getCount(); 
                               if (cnt > 0) {
                                       lblunit.setText(loadItemStockDatastore.getAt(0).get('uom_short_name'));                        
                                       txtAvgCost.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStkQty.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));



                                    } else {
                                      alert('not found'); 
                                    } 
                           } 


                         });  
   
			}

  }

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 500,
        width: 420,
        x: 50,
        y: 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'item_uom',sortable:true,width:60,align:'left'},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flxItemClick();
                        }
                     });
             },
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                flxItemClick();
		}
 
    
   }
   });


var txtItemName = new Ext.form.TextField({
	fieldLabel  : 'Item Name',
	id          : 'txtItemName',
	name        : 'txtItemName',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec1.focus();
		     }
		     if (e.getKey() == e.DOWN)
		     {
	 
		     flxItem.getSelectionModel().selectRow(0)
		     flxItem.focus;
		     flxItem.getView().focusRow(0);
		     }
		  },


	    keyup: function () {
                loadSearchItemListDatastore.removeAll();
                  if (txtItemName.getRawValue() != '')
                  {
                     flxItem.getEl().setStyle('z-index','10000');
                     flxItem.show();
                     itemSearch();
                  }
                  else
                  {
                     flxItem.hide();
                  }   
            }
	}
	});



function grid_tot(){

        var pqty   = 0;
        var pvalue = 0;
        var Row= flxStock.getStore().getCount();
        flxStock.getSelectionModel().selectAll();
        var sel=flxStock.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.itmt_opqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.itmt_opqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.itmt_opvalue);

              }
         }

         txtTotalQty.setValue(pqty);
         txtTotalValue.setValue(pvalue);




}



   var txtTotalQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtTotalQty',
        name        : 'txtTotalQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtTotalValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotalValue',
        name        : 'txtTotalValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



        function save_click()
        {        	
        	var gstSave;
		
		gstSave="true";
		if(txtItemName.getRawValue()=="" || txtItemName.getValue()==0)
		{
			Ext.Msg.alert("Select the Item Name and continue");
			txtItemName.setFocus();
			gstSave="false";
		}
/*
		else if(cmbLocation.getRawValue()=="" || cmbLocation.getValue()==0)
		{
			Ext.Msg.alert("Select the Location and continue");
			cmbLocation.setFocus();
			gstSave="false";
		}
*/
		else
		{
			Ext.MessageBox.show({
                        title: 'Confirmation',
                        icon: Ext.Msg.QUESTION,
			buttons: Ext.MessageBox.YESNO,
            		msg: 'Do u want to save',
            		fn: function(btn){
			if (btn == 'yes'){
				if (gstSave === "true"){

				Ext.Ajax.request({
		            	url: '	MasOPStockSave.php',
		       	        params:
				{
					compcode:Gincompcode,
					finid:GinFinid,

					itemcode : chkitemcode,
					opstk    : txtopstock.getValue(),
					opval    : txtopvalue.getValue(),
				     	oldopstk   : oldopstk,
			 		oldopvalue : oldopvalue,
			                location   : cmbLocation.getValue(),

				},
				callback: function (options, success, response)
                        	{
					var obj = Ext.decode(response.responseText);
					if (obj['success']==="true"){                                
						Ext.MessageBox.alert("Details Saved");
//								MasOpeningpanel.getForm().reset();
						RefreshData();
						
					}else{
						Ext.MessageBox.alert("Details Not Saved! Pls Check!");                                                  
					}
                      
			 	}   
				});//'MasLotStockSave.php'end
				}  

	    	
         		}
                	}
    			});
		}
        }


	var loadpartydatastore = new Ext.data.Store({
		id: 'loadpartydatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsOPStock.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadparty"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[
			'sup_refname','sup_code'
		]),

	});

	var loadchkratedatastore = new Ext.data.Store({
		id: 'loadchkratedatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsOPStock.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadchkrate"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[ 'stk_seqno', 'stk_compcode', 'stk_fincode', 'stk_lotseqno', 'stk_itemcode', 'stk_opstk',  'stk_opvalue', 'stk_actopstk', 'stk_actopbags', 'stk_usrcode', 'stk_entrydate', 'cancelflag', 'Stock','Bags'
		]),

	});

	var loadLotdatastore = new Ext.data.Store({
	      id: 'loadLotdatastore',
	      autoLoad : true,
	      proxy: new Ext.data.HttpProxy({
		        url: 'ClsOPStock.php',      // File to connect to
		        method: 'POST'
		    }),
		    baseParams:{task:"loadlot"}, // this parameter asks for listing
	      reader: new Ext.data.JsonReader({
		          // we tell the datastore where to get his data from
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	      },[
		'lot_refno','lot_code'
	      ]),
	});

 var loadStockListDatastore = new Ext.data.Store({
      id: 'loadStockListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOPStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadStockList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'item_name', 'item_code','uom_short_name','item_uom' ,'item_yr_opqty', 'item_yr_opval', 'item_avg_rate' ,'item_loc_code'
      ]),
    });


   var flxStock = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 700,
        id : flxStock,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   



		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:300,align:'left'},
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:60,align:'left',hidden:false}, 
		{header: "UOM", dataIndex: 'item_uom',sortable:true,width:60,align:'left',hidden:false},   
		{header: "Op.Qty (t)", dataIndex: 'item_yr_opqty',sortable:false,width:100,align:'right'},
		{header: "Op.Value", dataIndex: 'item_yr_opval',sortable:false,width:120,align:'right'},
		{header: "Rate/t", dataIndex: 'item_avg_rate',sortable:false,width:100,align:'right'},
		{header: "Location", dataIndex: 'item_loc_code',sortable:false,width:100,align:'right'},

        ],
        store:loadStockListDatastore,

        listeners:{	
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){

		var sm = flxStock.getSelectionModel();
		var selrow = sm.getSelected();
	        chkitemcode = selrow.get('item_code');
		txtItemName.setValue(selrow.get('item_name'));
		cmbUOM.setValue(selrow.get('item_uom'));
		txtopstock.setValue(selrow.get('item_yr_opqty'));
		txtopvalue.setValue(selrow.get('item_yr_opval'));

             	oldopstk   = selrow.get('item_yr_opqty');
                oldopvalue = selrow.get('item_yr_opval');
            	cmbLocation.setValue(selrow.get('item_loc_code'));
        }
   }
   });



	var txtopstock = new Ext.form.TextField({
		fieldLabel  : 'Opening Stock',
		id          : 'txtopstock',
		name        : 'txtopstock',
		width       :  150,
		style       :  {textTransform: "uppercase"},
                labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	});


	var txtopvalue = new Ext.form.TextField({
		fieldLabel  : 'Opening Value',
		id          : 'txtopvalue',
		name        : 'txtopvalue',
		width       :  150,
		style       :  {textTransform: "uppercase"},
                 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	});

	function RefreshData(){

		itemtypep = "0";

             	oldopstk =0;
                oldopvalue  = 0;
		txtItemName.setRawValue('');
                txtopstock.setValue('');
                txtopvalue.setValue('');
		getStockDetails();
	};


        function getStockDetails()
        {
		loadStockListDatastore.removeAll();
		loadStockListDatastore.load({
		url: 'ClsOPStock.php',
		params:
		{
		    task:"loadStockList",
		    finid:GinFinid,
		    compcode:Gincompcode,
		},
		callback:function()
       		{
                   var cnt=loadStockListDatastore.getCount();
                   if(cnt>0)
                     grid_tot(); 
                }  
		});
        }

	function InitialData(){

                flxItem.hide();
                getStockDetails();

	};

   var MasOpeningpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GENERAL STORES OPENING STOCK ENTRY ',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasOpeningpanel',
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
  /*      {
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
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";
			

                }
            }
        },'-', */              
                {
//SAVE
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click: function () {
                               save_click();
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
                            MasWPOpeningWindow.hide();

                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'GENERAL STORES OPENING STOCK ENTRY ',
                layout  : 'hbox',
                border  : true,
                height  : 470,
                width   : 500,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 500,
				x           : 0,
				y           : 30,
				border      : false,
				items: [txtItemName]
			}, flxItem,

          		{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbUOM]
                            },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 300,
				x           : 0,
				y           : 130,
				border      : false,
				items: [txtopstock]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 300,
				x           : 0,
				y           : 180,
				border      : false,
				items: [txtopvalue]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 300,
				x           : 0,
				y           : 230,
				border      : false,
				items: [cmbLocation]
			},



                ]

            },
            { xtype   : 'fieldset',
                title   : 'OPENING STOCK LIST ',
                layout  : 'hbox',
                border  : true,
                height  : 470,
                width   : 775,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 540,
                y       : 10,
                items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 800,
				x           : 10,
				y           : 10,
				border      : false,
				items: [flxStock]
			},
                ]
            } ,

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
		             x       : 750,
			     y       : 480,
                             items: [txtTotalQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 110,
                             border  : false,
		             x       : 980,
			     y       : 480,
                             items: [txtTotalValue]
                        },  



            
        ],
    });
    
   
    var MasWPOpeningWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'GENERAL STORES OPENING STOCK ENTRY',
        items       : MasOpeningpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
	//closeAction : window.location.href=('http://192.168.11.14/SHVPM/Fuel/FuelMainPage.php'),
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			//if (gstFlag === "Add"){

				InitialData();


			//}			
	   		
		}
	}
    });
    MasWPOpeningWindow.show();  
});
