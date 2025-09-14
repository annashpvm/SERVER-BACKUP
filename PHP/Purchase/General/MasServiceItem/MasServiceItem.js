Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');


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
	//	disabled : true,
		tabindex : 2
    });

var txtitemdesc = new Ext.form.TextField({
        fieldLabel  : 'Item Description',
        id          : 'txtitemdesc',
        name        : 'txtitemdesc',
        width       :  350,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });

var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  100,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });


var cmbunit = new Ext.form.ComboBox({
        fieldLabel      : 'Units',
        width           : 180,
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
        displayField    : 'hsn_code', 
        valueField      : 'hsn_sno',
        hiddenName      : '',
        id              : 'cmbhsncode',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadhsndatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
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
				else if(txtitemdesc.getValue()=="" || txtitemdesc.getValue()==0)
				{
					alert("Enter Description");
					txtcgst.setFocus();
				}
				else if(cmbunit.getRawValue()=="" || cmbunit.getValue()==0)
				{
					alert("Select Unit");
					cmbunit.setFocus();
				}
				else if(txtrate.getRawValue()=="" || txtrate.getValue()==0)
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
							itemname : txtitemname.getRawValue(),
							itemdesc : txtitemdesc.getRawValue(),
							unit : cmbunit.getValue(),
							rate : txtrate.getRawValue(),
							hsncode : cmbhsncode.getValue()
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
                height  : 240,
                width   : 500,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
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
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtitemdesc]
                            },
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbunit]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 200,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtrate]
                            },
			
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbhsncode]
                            }
                ]

            }
            
        ],
    });
    

   function RefreshData(){
        cmbhsncode.setRawValue("");
	txtrate.setRawValue("");
	cmbunit.setRawValue("");
	txtitemdesc.setRawValue("");
	txtitemname.setRawValue("");
	
};

   
    var MasServiceItemWindow = new Ext.Window({
	height      : 350,
        width       : 550,
        y           : 35,
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
			txtitemname.focus();
			
	   			 }
			
		}
    });
    MasServiceItemWindow.show();  
});
