Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
//var gstGroup;

 var loadmotormakedatastore = new Ext.data.Store({
      id: 'loadmotormakedatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMotorItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadmotormake"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'mot_makecode', type: 'int',mapping:'mot_makecode'},
	{name:'mot_make', type: 'string',mapping:'mot_make'}
      ]),
    });
	
var loadlocationDataStore = new Ext.data.Store({
      id: 'loadlocationDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMotorItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlocation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'equip_code', type: 'int',mapping:'equip_code'},
	{name:'equip_name', type: 'string',mapping:'equip_name'}
      ]),
    });
	
	var txtitemname = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtitemname',
        name        : 'txtitemname',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });


var cmbmake = new Ext.form.ComboBox({
        fieldLabel      : 'Make',
        width           : 250,
        displayField    : 'mot_make', 
        valueField      : 'mot_makecode',
        hiddenName      : '',
        id              : 'cmbmake',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadmotormakedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbtypemotor = new Ext.form.ComboBox({
        fieldLabel      : 'Type of Motor',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbtypemotor',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['AC MOTOR','DC MOTOR'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmblocation = new Ext.form.ComboBox({
        fieldLabel      : 'Location Used',
        width           : 250,
        displayField    : 'equip_name', 
        valueField      : 'equip_code',
        hiddenName      : '',
        id              : 'cmblocation',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadlocationDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbmill = new Ext.form.ComboBox({
        fieldLabel      : 'Mill',
        width           : 250,
        displayField    : 'pono', 
        valueField      : 'poseqno',
        hiddenName      : '',
        id              : 'cmbmill',
        typeAhead       : true,
        mode            : 'local',
        store           : ['SHVPM'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

 var txthp = new Ext.form.NumberField({
        fieldLabel  : 'HP',
        id          : 'txthp',
        name        : 'txthp',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 var txtrpm = new Ext.form.NumberField({
        fieldLabel  : 'RPM',
        id          : 'txtrpm',
        name        : 'txtrpm',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 var txtslno = new Ext.form.NumberField({
        fieldLabel  : 'Sl.No',
        id          : 'txtslno',
        name        : 'txtslno',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var txtyear = new Ext.form.TextField({
        fieldLabel  : 'Year of Purchase',
        id          : 'txtyear',
        name        : 'txtyear',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 var motortype="HP";
var optmttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:130,
    height:40,
    x:380,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optmttype',
        items: [
            {boxLabel: 'HP', name: 'optmttype', id:'opthp', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            motortype="HP";
               }
              }
             }
            },
            {boxLabel: 'KW', name: 'optmttype', id:'optkw', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            motortype="KW";
               }
              }
             }}
        ]
    }
    ]
});

   function RefreshData(){
txtyear.setValue("");
txtslno.setValue("");
txtrpm.setValue("");
txthp.setValue("");
txtitemname.setValue("");
cmbmill.setValue("");
cmbtypemotor.setValue("");
cmbmake.setValue("");
};

   var MasMotorItemformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'MOTOR ITEM MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasMotorItemformpanel',
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
					alert("Enter ItemName");
					txtitemname.focus();
				}
				else if(txthp.getValue()=="" || txthp.getValue()==0)
				{
					alert("Enter HP");
					txthp.focus();
				}
				else if(txtrpm.getRawValue()=="")
				{
					alert("Enter RPM");
					txtrpm.focus();
				}
				else if(txtslno.getRawValue()=="")
				{
					alert("Enter SlNo");
					txtslno.focus();
				}
				else if(cmbmake.getRawValue()=="" || cmbmake.getValue()==0)
				{
					alert("Select Motor Make..");
					cmbmake.focus();
				}
				else if(cmbtypemotor.getRawValue()=="" || cmbtypemotor.getValue()==0)
				{
					alert("Select Type of Motor..");
					cmbtypemotor.focus();
				}
				else if(txtyear.getRawValue()=="" || txtyear.getValue()==0)
				{
					alert("Enter Year of Purchase");
					txtyear.focus();
				}
				else if(cmblocation.getRawValue()=="" || cmblocation.getValue()==0)
				{
					alert("Select Location..");
					cmblocation.focus();
				}
				else if(cmbmill.getRawValue()=="" || cmbmill.getValue()==0)
				{
					alert("Select Mill..");
					cmbmill.focus();
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
		                            	url: 'MasMotorItemSave.php',
                		       	        params:
						{
						itemname : txtitemname.getRawValue(),
						hp : txthp.getValue(),
						rpm	: txtrpm.getValue(),
						make : cmbmake.getValue(),
						slno : txtslno.getValue(),
						year : txtyear.getRawValue(),
						location : cmblocation.getValue(),
						mill : cmbmill.getValue(),
						mttype : motortype,
						itemcode : 0
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasMotorItemformpanel.getForm().reset();
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
                            MasMotorItemWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'MOTOR ITEM MASTER',
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
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtitemname]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txthp]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 600,
                                	x           : 190,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtrpm]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 340,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtslno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtyear]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [cmbmill]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 420,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbtypemotor]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbmake]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmblocation]
                            },optmttype
			
                ]

            }
            
        ],
    });
    
   
    var MasMotorItemWindow = new Ext.Window({
	height      : 400,
        width       : 580,
        y           : 35,
        title       : 'MOTOR ITEM MASTER',
        items       : MasMotorItemformpanel,
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
			loadmotormakedatastore.removeAll();
			loadmotormakedatastore.load({
                        	 url:'ClsMotorItem.php',
                        	 params:
                       		 {
                         	 task:"loadmotormake"
                        	 }
				 });

			loadlocationDataStore.removeAll();
			loadlocationDataStore.load({
                        	 url:'ClsMotorItem.php',
                        	 params:
                       		 {
                         	 task:"loadlocation"
                        	 }
				 });
			
	   		
			 }
		}
    });
    MasMotorItemWindow.show();  
});
