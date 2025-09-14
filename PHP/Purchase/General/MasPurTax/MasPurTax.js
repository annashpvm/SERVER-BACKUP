Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var AEDFlag = "Add";
var taxseq = 0;

 var loadtaxlistdatastore = new Ext.data.Store({
      id: 'loadtaxlistdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPurTax.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadTaxList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_code', 'tax_name', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst'
 
      ]),
    });




 var txtTaxName = new Ext.form.TextField({
        fieldLabel  : 'Tax Name ',
        id          : 'txtTaxName',
        name        : 'txtTaxName',
        width       :  280,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
  });


 var LoadCgstLedgerStore = new Ext.data.Store({
      id: 'LoadCgstLedgerStore',
 //     autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPurTax.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });

 var LoadSgstLedgerStore = new Ext.data.Store({
      id: 'LoadSgstLedgerStore',
//      autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPurTax.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });

 var LoadIgstLedgerStore = new Ext.data.Store({
      id: 'LoadgstLedgerStore',
  //    autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPurTax.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });

   var txtcgstper = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtcgstper',
        name        : 'txtcgstper',
        width       :  60,
        enableKeyEvents: true,
        listeners:{
            keyup:function(){
            	LoadCgstLedgerStore.removeAll();
		LoadCgstLedgerStore.load({
                url: 'ClsMasPurTax.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtcgstper.getValue()
                },
                callback:function()
                {
                    txtsgstper.setValue(txtcgstper.getValue());
		    	LoadSgstLedgerStore.removeAll();
			LoadSgstLedgerStore.load({
		        url: 'ClsMasPurTax.php',
		        params: {
			     task: 'LoadgstLedger',
		             gsttype :'%INPUT%',   
		             gst :  txtsgstper.getValue()
		        }
		        });

                }
             });
            }  
        } 
        
    });
	
  var txtsgstper = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtsgstper',
        name        : 'txtsgstper',
        width       :  60,
        allowBlank  :  true,
	tabindex : 1,
        enableKeyEvents: true,
        listeners:{
            keyup:function(){
            	LoadSgstLedgerStore.removeAll();
		LoadSgstLedgerStore.load({
                url: 'ClsMasPurTax.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtsgstper.getValue()
                },
                callback:function()
                {
                }
             });
            }  
        } 
    });
  var txtigstper = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtigstper',
        name        : 'txtigstper',
        width       :  60,
        allowBlank  :  true,
        enableKeyEvents: true,
        listeners:{
            keyup:function(){
            	LoadIgstLedgerStore.removeAll();
		LoadIgstLedgerStore.load({
                url: 'ClsMasPurTax.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtigstper.getValue()
                },
                callback:function()
                {
                }
             });
            }  
        } 

    });

  var LoadInvtypeStore = new Ext.data.Store({
        id: 'LoadInvtypeStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasPurTax.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadInvtype"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['type_code','type_name'])
    });


var cmbcgstledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbcgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        
        listeners: {
            select: function ()                 {
              }
        } 
   });

var cmbsgstledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbsgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        
        listeners: {
            select: function ()                 {
        } 
  }
   });


var cmbigstledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbigstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        
        listeners: {
            select: function ()                 {
              }
        } 
   });



   function RefreshData(){
	txtcgstper.setRawValue("");
	txtsgstper.setRawValue("");
        txtigstper.setRawValue("");
         AEDFlag = "Add";
			loadtaxlistdatastore.load({
				url: 'ClsMasPurTax.php',
                		params: {
                    			task: 'LoadTaxList'
                		}
			});



};
   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 920,
        x: 0,
        y: 0,
        columns: [   

            {header: "Tax Code", dataIndex: 'tax_code',sortable:true,width:50,align:'left'},
            {header: "Tax Name", dataIndex: 'tax_name',sortable:true,width:150,align:'left'},
            {header: "SGST %", dataIndex: 'tax_sgstper',sortable:true,width:60,align:'left'}, 
            {header: "CGST %", dataIndex: 'tax_cgstper',sortable:true,width:60,align:'left'}, 
            {header: "IGST %", dataIndex: 'tax_igstper',sortable:true,width:60,align:'left'}, 
            {header: "CGST Ledger", dataIndex: 'tax_cgstledcode',sortable:true,width:60,align:'left'},
            {header: "SGST Ledger", dataIndex: 'tax_sgstledcode',sortable:true,width:60,align:'right'},
            {header: "IGST Ledger", dataIndex: 'tax_igstledcode',sortable:true,width:60,align:'left'},
            {header: "CGST Ledger", dataIndex: 'tax_cgstledger',sortable:true,width:200,align:'left'},
            {header: "SGST Ledger", dataIndex: 'tax_sgstledger',sortable:true,width:200,align:'right'},
            {header: "IGST Ledger", dataIndex: 'tax_igstledger',sortable:true,width:200,align:'left'},


        ],
        store:loadtaxlistdatastore,

    listeners:{	

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
         Ext.Msg.show({
             title: 'Purchase GST Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){
		AEDFlag = "Edit";
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('tax_code'));
                                AEDFlag = "Edit";
				gridedit = "true";
				editrow = selrow;
				taxseq = selrow.get('tax_code');				
				txtTaxName.setRawValue(selrow.get('tax_name'));
				txtcgstper.setValue(selrow.get('tax_cgstper'));
				txtsgstper.setValue(selrow.get('tax_sgstper'));
				txtigstper.setValue(selrow.get('tax_igstper'));

				
				
				flxDetail.getSelectionModel().clearSelections();

		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
   }

   });

   var MasPurchaseTaxPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasPurchaseTaxPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                                if(txtTaxName.getRawValue()=="" || txtTaxName.getValue()==0)
				{
					alert("Enter Tax Name..");
					txtTaxName.setFocus();
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
						Ext.Ajax.request({
		                            	url: 'FrmMasPurTaxSave.php',
		                                params:
						{
                                                        saveflag        : AEDFlag,
                                                        taxseq          : taxseq,
							taxname         : txtTaxName.getRawValue(), 
							taxsgst_ledger  : cmbsgstledger.getRawValue(), 
							taxcgst_ledger  : cmbcgstledger.getRawValue(), 
							taxigst_ledger  : cmbigstledger.getRawValue(),  
							taxsgst_ledcode : cmbsgstledger.getValue(), 
							taxcgst_ledcode : cmbcgstledger.getValue(), 
							taxigst_ledcode : cmbigstledger.getValue(),  
							taxsgst         : txtsgstper.getValue(),   
							taxcgst         : txtcgstper.getValue(), 							        taxigst         : txtigstper.getValue(),  

       
 	
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasPurchaseTaxPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     
                                            	}
                                      
					 	}   
			        		});
			    	
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
                            MasPurchaseTaxWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 150,
                y       : 10,	
                items:[

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 450,
                             x           : 0,
                             y           : 10,
                             border      : false,
                             items: [txtTaxName]   	
                           },



                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 400,
                              x           : 0,
                              y           : 50,
                              border      : false,
                              items: [txtcgstper]
                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 100,
                              width       : 420,
                              x           : 220,
                              y           : 50,
                              border      : false,
                              items: [cmbcgstledger]

                             },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 300,
                              x           : 0,
                              y           : 100,
                              border      : false,
                              items: [txtsgstper]
                            } ,   
		
  
                           { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 420,
                             x           : 220,
                             y           : 100,
                             border      : false,
                             items: [cmbsgstledger]


                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 300,
                              x           : 0,
                              y           : 150,
                              border      : false,
                              items: [txtigstper]
                            } ,

  
                             { 
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : 100,
                               width       : 420,
                               x           : 220,
                               y           : 150,
                               border      : false,
                               items: [cmbigstledger]

                             },
                ]
            },
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 250,
                width   : 950,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 250,
                items:[flxDetail]
            },    

        ],
    });
    
   
    var MasPurchaseTaxWindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 35,
        title       : 'PURCHASE GST MASTER',
        items       : MasPurchaseTaxPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                      RefreshData();
		}
        } 
    });
    MasPurchaseTaxWindow.show();  
});
