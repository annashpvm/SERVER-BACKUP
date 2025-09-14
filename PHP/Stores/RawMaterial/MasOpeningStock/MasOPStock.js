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




        new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

        function save_click()
        {        	
        	var gstSave;
		
		gstSave="true";
		if(cmbitem.getRawValue()=="" || cmbitem.getValue()==0)
		{
			Ext.Msg.alert("Select the Area details and continue");
			cmbitem.setFocus();
			gstSave="false";
		}

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

					itemcode: cmbitem.getValue(),
					opstk: txtopstock.getValue(),
					opval: txtopvalue.getValue(),
					usercode: 0,
				     	oldopstk   : oldopstk,
					oldopvalue : oldopvalue,

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
	var loaditemdatastore = new Ext.data.Store({
		id: 'loaditemdatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsOPStock.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loaditem"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[
			'itmh_name','itmh_code'
		]),

	});

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
          'itmh_name', 'itmh_code', 'itmt_opqty', 'itmt_opvalue', 'avgrate' 
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



		{header: "Item Name", dataIndex: 'itmh_name',sortable:true,width:330,align:'left'},
		{header: "Item Code", dataIndex: 'itmh_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Open.Qty (t)", dataIndex: 'itmt_opqty',sortable:false,width:100,align:'right'},
		{header: "Open.Value", dataIndex: 'itmt_opvalue',sortable:false,width:150,align:'right'},
		{header: "Rate/t", dataIndex: 'avgrate',sortable:false,width:100,align:'right'},

        ],
        store:loadStockListDatastore,

        listeners:{	
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){

		var sm = flxStock.getSelectionModel();
		var selrow = sm.getSelected();
	        chkitemcode = selrow.get('itmh_code');
		cmbitem.setValue(selrow.get('itmh_code'));

		txtopstock.setValue(selrow.get('itmt_opqty'));
		txtopvalue.setValue(selrow.get('itmt_opvalue'));

             	oldopstk   = selrow.get('itmt_opqty');
                oldopvalue = selrow.get('itmt_opvalue');

        }
   }
   });



	var cmbitem = new Ext.form.ComboBox({
		fieldLabel      : 'Item Name',
		width           : 280,
		displayField    : 'itmh_name', 
		valueField      : 'itmh_code',
		hiddenName      : '',
		id              : 'cmbitem',
		typeAhead       : true,
		mode            : 'local',
		store           : loaditemdatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : true,
                labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
		listeners:{

		select: function(){
		
			     	oldopstk =0;
				oldopvalue  = 0;
				loadchkratedatastore.removeAll();
				loadchkratedatastore.load({
					url: 'ClsOPStock.php',
					params:
					{
					task:"loadchkrate",
					compcode:Gincompcode,
					finid:GinFinid,
	
					itemcode : cmbitem.getValue()					
					},
					callback:function()
					{
						//txtitemrate.setValue(loadchkratedatastore.getAt(0).get('pitr_rate'));
						//chkrate = loadchkratedatastore.getAt(0).get('arf_seqno');
						trnstk = loadchkratedatastore.getAt(0).get('Stock');
		

						txtopstock.setValue(loadchkratedatastore.getAt(0).get('stk_opstk'));
						txtopvalue.setValue(loadchkratedatastore.getAt(0).get('stk_opvalue'));

						
					}
				});

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
		cmbitem.setRawValue('');
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

		loaditemdatastore.removeAll();
		loaditemdatastore.load({
		url: 'ClsOPStock.php',
		params:
		{
		    task:"loaditem",
		    finid:GinFinid,
		    compcode:Gincompcode,
		    itemtype: itemtypep
		},

		});
		loadpartydatastore.removeAll();
		loadpartydatastore.load({
		url: 'ClsOPStock.php',
		params:
		{
		    task:"loadparty",
		    finid:GinFinid,
		    compcode:Gincompcode,
		    itemtype: itemtypep
		},
		});

                getStockDetails();

	};

   var MasOpeningpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'OPENING STOCK ENTRY ',
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
			    window.location.href=('http://192.168.11.14/SHVPM/Fuel/FuelMainPage.php');
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'WASTE PAPER OPENING STOCK ENTRY ',
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
				labelWidth  : 120,
				width       : 500,
				x           : 10,
				y           : 90,
				border      : false,
				items: [cmbitem]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 300,
				x           : 10,
				y           : 130,
				border      : false,
				items: [txtopstock]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 300,
				x           : 10,
				y           : 170,
				border      : false,
				items: [txtopvalue]
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
            }   ,

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
        title       : 'WASTE PAPER OPENING STOCK ENTRY',
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
