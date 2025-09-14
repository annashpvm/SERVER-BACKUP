Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');

  var loadunitdatastore = new Ext.data.Store({
      id: 'loadunitdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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

 var loaditemcodeexistchk = new Ext.data.Store({
      id: 'loaditemcodeexistchk',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"itemcodechk"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cnt'
      ]),
    });


  var loaditemgrpdatastore = new Ext.data.Store({
      id: 'loaditemgrpdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'grp_code', type: 'int',mapping:'grp_code'},
	{name:'grp_name', type: 'string',mapping:'grp_name'}
      ]),
    });


  var loadhsndatastore = new Ext.data.Store({
      id: 'loadhsndatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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
        width       :  400,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });

var txtitemdesc = new Ext.form.TextField({
        fieldLabel  : 'Item Description',
        id          : 'txtitemdesc',
        name        : 'txtitemdesc',
        width       :  400,
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

var cmbquality = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbquality',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Needed','2.Not Needed'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbindent = new Ext.form.ComboBox({
        fieldLabel      : 'Indent',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbindent',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Needed','2.Not Needed'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbitemgrp = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 250,
        displayField    : 'grp_name', 
        valueField      : 'grp_code',
        hiddenName      : '',
        id              : 'cmbitemgrp',
        typeAhead       : true,
        mode            : 'remote',
        store           : loaditemgrpdatastore,
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


   var MasItemformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ITEM MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasItemformpanel',
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
				else if(cmbquality.getRawValue()=="" || cmbquality.getValue()==0)
				{
					alert("Select Quality");
					cmbquality.setFocus();
				}
				else if(cmbindent.getRawValue()=="" || cmbindent.getValue()==0)
				{
					alert("Select Indent");
					cmbindent.setFocus();
				}
				else if(cmbitemgrp.getRawValue()=="" || cmbitemgrp.getValue()==0)
				{
					alert("Select ItemGroup");
					cmbindent.setFocus();
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
     alert(cmbquality.getRawValue().substring(0,1));
     alert(cmbindent.getRawValue().substring(0,1));

						{
						Ext.Ajax.request({
		                            	url: 'MasPurItemSave.php',
                                           
                		       	        params:
						{
/*							itemname : txtitemname.getRawValue(),
							itemdesc : txtitemdesc.getRawValue(),
							unit : cmbunit.getRawValue(),
							quality : cmbquality.getRawValue(),
							indent : cmbindent.getRawValue(),
							itemgrp : cmbitemgrp.getRawValue(),
							hsncode : cmbhsncode.getRawValue()

*/
			        

                                                        itemname : txtitemname.getRawValue(),
							itemdesc : txtitemdesc.getRawValue(),
							unit     : cmbunit.getValue(),
                                                        quality  : cmbquality.getRawValue().substring(0,1),       
							indent   : cmbindent.getRawValue().substring(0,1),
							itemgrp  : cmbitemgrp.getValue(),
							hsncode  : cmbhsncode.getValue()
						},

						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasItemformpanel.getForm().reset();
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
                            MasItemWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 310,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 520,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtitemname]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 520,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtitemdesc]
                            },
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 300,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbunit]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbquality]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbindent]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmbitemgrp]
                            },
			
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [cmbhsncode]
                            }
                ]

            }
            
        ],
    });
    

   function RefreshData(){
        cmbhsncode.setRawValue("");
	cmbquality.setRawValue("");
	cmbunit.setRawValue("");
	txtitemdesc.setRawValue("");
	txtitemname.setRawValue("");
	
};

   
    var MasItemWindow = new Ext.Window({
	height      : 400,
        width       : 600,
        y           : 35,
        title       : 'ITEM MASTER',
        items       : MasItemformpanel,
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
    MasItemWindow.show();  
});
