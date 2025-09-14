Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var AEDFlag = "Add";
var taxseq = 0;

 var loadTaxListDatastore = new Ext.data.Store({
      id: 'loadTaxListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadTaxList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_purcode', 'tax_purname', 'tax_gst', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger'
 
      ]),
    });




 var LoadCgstLedgerStore = new Ext.data.Store({
      id: 'LoadCgstLedgerStore',
 //     autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
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
                url: 'ClsPurchaseGroup.php',      // File to connect to
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
                url: 'ClsPurchaseGroup.php',      // File to connect to
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


   function find_gstper()
   {
      txtCGSTPer.setValue('');
      txtSGSTPer.setValue('');
      txtIGSTPer.setValue('');
      if (txtGSTPer.getValue() == 0)
      {
          txtCGSTPer.setValue(0);
          txtSGSTPer.setValue(0);
          txtIGSTPer.setValue(0);
      } 

      if (txtGSTPer.getValue() > 0)
      {
          txtCGSTPer.setValue(txtGSTPer.getValue()/2);
          txtSGSTPer.setValue(txtGSTPer.getValue()/2);
          txtIGSTPer.setValue(txtGSTPer.getValue());

		    	LoadCgstLedgerStore.removeAll();
			LoadCgstLedgerStore.load({
		        url: 'ClsPurchaseGroup.php',
		        params: {
			     task: 'LoadgstLedger',
		             gsttype :'%INPUT%',   
		             gst :  txtCGSTPer.getValue()
		        }
		        });

    
		    	LoadSgstLedgerStore.removeAll();
			LoadSgstLedgerStore.load({
		        url: 'ClsPurchaseGroup.php',
		        params: {
			     task: 'LoadgstLedger',
		             gsttype :'%INPUT%',   
		             gst :  txtSGSTPer.getValue()
		        }
		        });
            	LoadIgstLedgerStore.removeAll();
		LoadIgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtIGSTPer.getValue()
                },
                callback:function()
                {
                }
             });



      }  
   }
   

   var txtGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'GST %',
        id          : 'txtGSTPer',
        name        : 'txtGSTPer',
        width       :  60,
        enableKeyEvents: true,
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            keyup:function(){
                  find_gstper();
            } ,
            change:function(){
                  find_gstper();
            } , 
        } 
        
    });

   var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCGSTPer',
        name        : 'txtCGSTPer',
        width       :  60,
        enableKeyEvents: true,
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            keyup:function(){
            	LoadCgstLedgerStore.removeAll();
		LoadCgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtCGSTPer.getValue()
                },
                callback:function()
                {
                    txtSGSTPer.setValue(txtCGSTPer.getValue());
		    	LoadSgstLedgerStore.removeAll();
			LoadSgstLedgerStore.load({
		        url: 'ClsPurchaseGroup.php',
		        params: {
			     task: 'LoadgstLedger',
		             gsttype :'%INPUT%',   
		             gst :  txtSGSTPer.getValue()
		        }
		        });

                }
             });
            }  
        } 
        
    });
	
  var txtSGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSGSTPer',
        name        : 'txtSGSTPer',
        width       :  60,
        allowBlank  :  true,
	tabindex : 1,
        enableKeyEvents: true,
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            keyup:function(){
            	LoadSgstLedgerStore.removeAll();
		LoadSgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtSGSTPer.getValue()
                },
                callback:function()
                {
                }
             });
            }  
        } 
    });
  var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIGSTPer',
        name        : 'txtIGSTPer',
        width       :  60,
        allowBlank  :  true,
        enableKeyEvents: true,
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            keyup:function(){
            	LoadIgstLedgerStore.removeAll();
		LoadIgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'%INPUT%',   
                     gst :  txtIGSTPer.getValue()
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
            url: 'ClsPurchaseGroup.php', // File to connect to
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



var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPurchaseGroup.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroup"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['led_code','led_name'
  ])
});



var cmbPurchaseLedger = new Ext.form.ComboBox({
        fieldLabel      : 'Purchase Ledger',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbPurchaseLedger',
        typeAhead       : true,
        mode            : 'local',
        store           : loadPurchaseGroupDatasore,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
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
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
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
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
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
     labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
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
	txtCGSTPer.setRawValue("");
	txtSGSTPer.setRawValue("");
        txtIGSTPer.setRawValue("");
         AEDFlag = "Add";
			loadTaxListDatastore.load({
				url: 'ClsPurchaseGroup.php',
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

            {header: "Pur. Led Code", dataIndex: 'tax_purcode',sortable:true,width:50,align:'left'},
            {header: "Pur Led Name", dataIndex: 'tax_purname',sortable:true,width:150,align:'left'},
            {header: "GST %", dataIndex: 'tax_gst',sortable:true,width:60,align:'left'}, 
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
        store:loadTaxListDatastore,

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
				txtGSTPer.setValue(selrow.get('tax_gst'));
				txtCGSTPer.setValue(selrow.get('tax_cgstper'));
				txtSGSTPer.setValue(selrow.get('tax_sgstper'));
				txtIGSTPer.setValue(selrow.get('tax_igstper'));
                		cmbPurchaseLedger.setValue(selrow.get('tax_purcode'));
              			cmbcgstledger.setValue(selrow.get('tax_cgstledcode'));				
              			cmbsgstledger.setValue(selrow.get('tax_sgstledcode'));				
              			cmbigstledger.setValue(selrow.get('tax_igstledcode'));				
			

				flxDetail.getSelectionModel().clearSelections();

		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
   }

   });

   var MasItemGroupPanel = new Ext.FormPanel({
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
        id          : 'MasItemGroupPanel',
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

                                if(cmbPurchaseLedger.getRawValue()=="" || cmbPurchaseLedger.getValue()==0)
				{
					alert("Select Purchase Ledger..");
					cmbPurchaseLedger.setFocus();
				}
                                else
                                if(txtGSTPer.getRawValue()=="" || cmbPurchaseLedger.getValue()==0)
				{
					alert("Enter Tax Name..");
					cmbPurchaseLedger.setFocus();
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

                                                        purledcode      : cmbPurchaseLedger.getValue(),
                                                        purledname      : cmbPurchaseLedger.getRawValue(),
							taxsgst_ledger  : cmbsgstledger.getRawValue(), 
							taxcgst_ledger  : cmbcgstledger.getRawValue(), 
							taxigst_ledger  : cmbigstledger.getRawValue(),  
							taxsgst_ledcode : cmbsgstledger.getValue(), 
							taxcgst_ledcode : cmbcgstledger.getValue(), 
							taxigst_ledcode : cmbigstledger.getValue(),  
							taxsgst         : txtSGSTPer.getValue(),   
							taxcgst         : txtCGSTPer.getValue(), 							        taxigst         : txtIGSTPer.getValue(),  
							taxgst          : txtGSTPer.getValue(),   


       
 	
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasItemGroupPanel.getForm().reset();
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
                            MasFuelItemGroupWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 260,
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
                              width       : 500,
                              x           : 0,
                              y           : 10,
                              border      : false,
                              items: [cmbPurchaseLedger]
                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 250,
                              x           : 0,
                              y           : 50,
                              border      : false,
                              items: [txtGSTPer]
                            },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 400,
                              x           : 0,
                              y           : 90,
                              border      : false,
                              items: [txtCGSTPer]
                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 100,
                              width       : 420,
                              x           : 220,
                              y           : 90,
                              border      : false,
                              items: [cmbcgstledger]

                             },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 300,
                              x           : 0,
                              y           : 140,
                              border      : false,
                              items: [txtSGSTPer]
                            } ,   
		
  
                           { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 420,
                             x           : 220,
                             y           : 140,
                             border      : false,
                             items: [cmbsgstledger]


                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 300,
                              x           : 0,
                              y           : 190,
                              border      : false,
                              items: [txtIGSTPer]
                            } ,

  
                             { 
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : 100,
                               width       : 420,
                               x           : 220,
                               y           : 190,
                               border      : false,
                               items: [cmbigstledger]

                             },
                ]
            },
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 230,
                width   : 950,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 290,
                items:[flxDetail]
            },    

        ],
    });
    
   
    var MasFuelItemGroupWindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 35,
        title       : 'Fuel Item Group /GST Master ',
        items       : MasItemGroupPanel,
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
    MasFuelItemGroupWindow.show();  
});
