Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
  var GinFinid = localStorage.getItem('tfinid');
  var gstFlag = "Add";
  var itemcode = 0;

  var loadItemdatastore = new Ext.data.Store({
      id: 'loadItemdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsServiceItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'item_code', 'item_name' ,'uom_short_name', 'item_rate', 'item_hsncode','hsn_code', 'item_uom'
      ]),
    });

  var loadunitdatastore = new Ext.data.Store({
      id: 'loadunitdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsServiceItem.php',      // File to connect to
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



  var loadhsndatastore = new Ext.data.Store({
      id: 'loadhsndatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsServiceItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsn"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'hsn_sno', type: 'int',mapping:'hsn_sno'},
	{name:'hsn_code', type: 'string',mapping:'hsn_code'}
      ]),
    });




var txtitemname = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtitemname',
        name        : 'txtitemname',
        width       :  350,

        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#d323d9",
	//	disabled : true,
		tabindex : 2
    });

/*var txtitemdesc = new Ext.form.TextField({
        fieldLabel  : 'Item Description',
        id          : 'txtitemdesc',
        name        : 'txtitemdesc',
        width       :  350,
        style       :  {textTransform: "uppercase"},
	 labelStyle : "font-size:14px;font-weight:bold;color:#d323d9",
	//	disabled : true,
		tabindex : 2
    });
*/
var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  90,
        style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#d323d9",
	//	disabled : true,
		tabindex : 2
    });


var cmbunit = new Ext.form.ComboBox({
        fieldLabel      : 'Units',
        width           : 150,
	labelStyle : "font-size:14px;font-weight:bold;color:#d323d9",
        displayField    : 'uom_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbunit',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadunitdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });


  var cmbhsncode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN Code',
        width           : 250,
	labelStyle : "font-size:14px;font-weight:bold;color:#d323d9",
        displayField    : 'hsn_code', 
        valueField      : 'hsn_sno',
        hiddenName      : '',
        id              : 'cmbhsncode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadhsndatastore,
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });


 var dgrecord = Ext.data.Record.create([]);
   var flxServiceItemMaster = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 290,
        width: 800,
        x: 90,
        y: 220,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  
     
        columns: [    
            {header: "code"    , Id: 'item_code', sortable:true,width:50,align:'left', menuDisabled: true},       
            {header: "Item Name", Id: 'item_name', sortable:true,width:300,align:'left', menuDisabled: true},
            {header: "Units"   , Id: 'uom_short_name', sortable:true,width:100,align:'left', menuDisabled: true},                  
            {header: "Rate"    , Id: 'item_rate', sortable:true,width:100,align:'left', menuDisabled: true},    
            {header: "HSN code", Id: 'item_hsncode', sortable:true,width:100,align:'left', menuDisabled: true, hidden:false},   
            {header: "HSN"     , Id: 'hsn_code', sortable:true,width:100,align:'left', menuDisabled: true},   
            {header: "Unit"    , Id: 'item_uom', sortable:true,width:100,align:'left', menuDisabled: true, hidden:false},  
                  
           ],
/*viewConfig: {
getRowClass: function(record) {
    var red = record.get('dealer_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtDealerName.getValue()) {
    return 'dealer_name'
    }
}
},*/
store:loadItemdatastore,
    listeners:{	
        'cellclick' : function(flxServiceItemMaster, rowIndex, cellIndex, e){


			var sm = flxServiceItemMaster.getSelectionModel();
			var selrow = sm.getSelected();
			gstFlag = "Edit";
         		gridedit = "true";
			editrow = selrow;
			itemcode    = selrow.get('item_code');
			txtitemname.setRawValue(selrow.get('item_name'));
			txtrate.setValue(selrow.get('item_rate'));
           		cmbunit.setValue(selrow.get('item_uom'));
           		cmbunit.setRawValue(selrow.get('uom_short_name'));
             		cmbhsncode.setValue(selrow.get('item_hsncode'));
    		        cmbhsncode.setRawValue(selrow.get('hsn_code'));

			flxServiceItemMaster.getSelectionModel().clearSelections();
			}

   }
    

   });

   var MasServiceItemformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SERVICE ITEM MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasServiceItemformpanel',
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
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
	
				if(txtitemname.getRawValue()=="" || txtitemname.getValue()==0)
				{
					alert("Enter Item Name");
					txtitemname.setFocus();
				}
				/*else if(txtitemdesc.getValue()=="" || txtitemdesc.getValue()==0)
				{
					alert("Enter Description");
					txtcgst.setFocus();
				}*/
				else if(cmbunit.getRawValue()=="" || cmbunit.getValue()==0)
				{
					alert("Select Unit");
					cmbunit.setFocus();
				}
				else if(txtrate.getRawValue()=="" )
				{
					alert("Select Rate");
					txtrate.setFocus();
				}
				else if(cmbhsncode.getRawValue()=="" || cmbhsncode.getValue()==0)
				{
					alert("Select HSN Code");
					cmbhsncode.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'MasServiceItemSave.php',
                		       	        params:
						{
                                                        saveflag : gstFlag,
                                                        itemcode : itemcode,
							itemname : txtitemname.getRawValue(),
							//itemdesc : txtitemdesc.getRawValue(),
							unit : cmbunit.getValue(),
							rate : txtrate.getRawValue(),
							hsncode : cmbhsncode.getRawValue()
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasServiceItemformpanel.getForm().reset();
							RefreshData();
						
                                                }
                                             	else 
						{
                                               
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved... ");
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
                            MasServiceItemWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'SERVICE ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 200,
                width   : 600,
		//style:{ border:'1px solid red',color:' #581845 '},
		style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 20,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtitemname]
                            },
				/*{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtitemdesc]
                            },*/
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 280,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbunit]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 250,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtrate]
                            },
			
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbhsncode],
                            }
                ]

            },flxServiceItemMaster,
            
        ],
    });

   function RefreshData(){
        gstFlag = "Add";
        itemcode=0;
        cmbhsncode.setRawValue("");
	txtrate.setRawValue("");
	cmbunit.setRawValue("");
	//txtitemdesc.setRawValue("");
	txtitemname.setRawValue("");
                    loadItemdatastore.removeAll();
                    loadItemdatastore.load({
     			url: 'ClsServiceItem.php',
			params: {
			    task: 'loadItemDetails',
  
		        },
                      	callback:function()
                        {
			    //alert(loadOrderNoListDataStore.getCount());	


                        }
             	    });  	
};

   
    var MasServiceItemWindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 33,
        title       : 'SERVICE ITEM MASTER',
        items       : MasServiceItemformpanel,
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
			txtitemname.focus();

			
	   			 }
			
		}
    });
    MasServiceItemWindow.show();  
});
