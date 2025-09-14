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
	var actstk =0, actbag = 0, trnstk = 0, trnbag = 0;

	var loaditemdatastore = new Ext.data.Store({
		id: 'loaditemdatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsLotStock.php',      // File to connect to
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
			url: 'ClsLotStock.php',      // File to connect to
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
			url: 'ClsLotStock.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadchkrate"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[ 'stk_seqno', 'stk_compcode', 'stk_fincode', 'stk_lotseqno', 'stk_itemcode', 'stk_opstk', 'stk_opbags', 'stk_opvalue', 'stk_actopstk', 'stk_actopbags', 'stk_usrcode', 'stk_entrydate', 'cancelflag', 'Stock','Bags'
		]),

	});

	var loadLotdatastore = new Ext.data.Store({
	      id: 'loadLotdatastore',
	      autoLoad : true,
	      proxy: new Ext.data.HttpProxy({
		        url: 'ClsLotStock.php',      // File to connect to
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
		

				loadchkratedatastore.removeAll();
				loadchkratedatastore.load({
					url: 'ClsLotStock.php',
					params:
					{
					task:"loadchkrate",
					compcode:Gincompcode,
					finid:GinFinid,
					lotcode : cmblot.getValue(),
					itemcode : cmbitem.getValue()					
					},
					callback:function()
					{
						//txtitemrate.setValue(loadchkratedatastore.getAt(0).get('pitr_rate'));
						//chkrate = loadchkratedatastore.getAt(0).get('arf_seqno');
						trnstk = loadchkratedatastore.getAt(0).get('Stock');
		

						txtopstock.setValue(loadchkratedatastore.getAt(0).get('stk_opstk'));
						txtopbags.setValue(loadchkratedatastore.getAt(0).get('stk_opbags'));
						txtopvalue.setValue(loadchkratedatastore.getAt(0).get('stk_opvalue'));

						actstk = loadchkratedatastore.getAt(0).get('stk_opstk');
						actbag = loadchkratedatastore.getAt(0).get('stk_opbags');
						
					}
				});
		}
               }
});
	var cmblot = new Ext.form.ComboBox({
		fieldLabel      : 'Lot No',
		width           :  200,
		displayField    : 'lot_refno', 
		valueField      : 'lot_code',
		hiddenName      : '',
		id              : 'cmblot',
		typeAhead       : true,
		mode            : 'local',
		store           : loadLotdatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
		listeners:{

		select: function(){



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

	var txtopbags = new Ext.form.TextField({
		fieldLabel  : 'Opening Bags',
		id          : 'txtopbags',
		name        : 'txtopbags',
		width       :  150,
		style       :  {textTransform: "uppercase"},
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
		cmblot.reset();
		itemtypep = "0";
		InitialData();
	};

	function InitialData(){

		loaditemdatastore.removeAll();
		loaditemdatastore.load({
		url: 'ClsLotStock.php',
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
		url: 'ClsLotStock.php',
		params:
		{
		    task:"loadparty",
		    finid:GinFinid,
		    compcode:Gincompcode,
		    itemtype: itemtypep
		},

		});
	};

   var MasItemOpeningPanel = new Ext.FormPanel({
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
        id          : 'MasItemOpeningPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click: function () {
				var gstSave;
				
				gstSave="true";
				if(cmbitem.getRawValue()=="" || cmbitem.getValue()==0)
				{
					Ext.Msg.alert("Select the Area details and continue");
					cmbitem.setFocus();
					gstSave="false";
				}
				else if(cmblot.getValue()=="" || cmblot.getValue()==0)
				{
					Ext.Msg.alert("Select the Party details and continue");
					cmblot.setFocus();
					gstSave="false";
				}
				else if(txtopstock.getValue()=="" || txtopstock.getValue()==0)
				{
					Ext.Msg.alert("Opening Stock should not be Empty");
					txtopstock.setFocus();
					gstSave="false";
				}

				else if(txtopvalue.getValue()=="" || txtopvalue.getValue()==0)
				{
					Ext.Msg.alert("Enter Opening Value");
					txtopvalue.setFocus();
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
				            	url: '	MasLotStockSave.php',
				       	        params:
						{
							compcode:Gincompcode,
							finid:GinFinid,
							lotcode: cmblot.getValue(),
							itemcode: cmbitem.getValue(),
							opstk: txtopstock.getValue(),
							opval: txtopvalue.getValue(),
							usercode: 0,
							stkdt : new Date()
						},
						callback: function (options, success, response)
		                        	{
							var obj = Ext.decode(response.responseText);
							if (obj['success']==="true"){                                
								Ext.MessageBox.alert("Details Saved");
								MasItemOpeningPanel.getForm().reset();
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
                            MasItemOpeningWindow.hide();
			    window.location.href=('http://192.168.11.14/SHVPM/Fuel/FuelMainPage.php');
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'OPENING STOCK ENTRY ',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 550,
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
				x           : 60,
				y           : 90,
				border      : false,
				items: [cmbitem]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 300,
				x           : 60,
				y           : 130,
				border      : false,
				items: [txtopstock]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 300,
				x           : 60,
				y           : 170,
				border      : false,
				items: [txtopvalue]
			},



                ]

            }
            
        ],
    });
    
   
    var MasItemOpeningWindow = new Ext.Window({
	height      : 500,
        width       : 580,
        y           : 35,
        title       : 'OPENING STOCK ENTRY',
        items       : MasItemOpeningPanel,
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
    MasItemOpeningWindow.show();  
});
