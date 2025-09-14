Ext.onReady(function() {
Ext.QuickTips.init();


var txtdcno = new Ext.form.NumberField({
	fieldLabel  : 'DC No',
	id          : 'txtdcno',
	name        : 'txtdcno',
	width       : 140,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dtdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 85,
});

var cmbparty = new Ext.form.ComboBox({
        fieldLabel      : 'Party',
        width           : 375,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbparty',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
   
var txtpackwrap = new Ext.form.NumberField({
        fieldLabel  : 'Packing Wrapper',
        id          : 'txtpackwrap',
        name        : 'txtpackwrap',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txthdpe = new Ext.form.NumberField({
        fieldLabel  : 'HDPE',
        id          : 'txthdpe',
        name        : 'txthdpe',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtgumtape = new Ext.form.NumberField({
        fieldLabel  : 'Gum Tape',
        id          : 'txtgumtape',
        name        : 'txtgumtape',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtmarker = new Ext.form.NumberField({
        fieldLabel  : 'Markers',
        id          : 'txtmarker',
        name        : 'txtmarker',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtshuttle = new Ext.form.NumberField({
        fieldLabel  : 'Shuttle',
        id          : 'txtshuttle',
        name        : 'txtshuttle',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});
     
var txtlabel = new Ext.form.NumberField({
        fieldLabel  : 'Labels',
        id          : 'txtlabel',
        name        : 'txtlabel',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttruckno = new Ext.form.NumberField({
        fieldLabel  : 'Truck No',
        id          : 'txttruckno',
        name        : 'txttruckno',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtweigbrdgewt = new Ext.form.NumberField({
        fieldLabel  : 'Weight Briedge Wt (Kgs)',
        id          : 'txtweigbrdgewt',
        name        : 'txtweigbrdgewt',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtweightcardno = new Ext.form.NumberField({
        fieldLabel  : 'Weightment Card No',
        id          : 'txtweightcardno',
        name        : 'txtweightcardno',
        width       : 240,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var TrnPackingMaterialDeliveryEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnPackingMaterialDeliveryEntryFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
		    {
                    text: 'New',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Add Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                        }
                    }
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                  // alert( Ext.getCmp('checktest').getValue());
                   
                  }
                }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            TrnPackingMaterialDeliveryEntryWindow.RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            TrnPackingMaterialDeliveryEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 210,
			x           : 50,
			y           : 0,
			border      : false,
			items       : [txtdcno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 145,
			x           : 350,
			y           : 0,
			border      : false,
			items: [dtdate]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 445,
			x           : 50,
			y           : 30,
			border      : false,
			items	    : [cmbparty]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 70,
			border      : false,
			items       : [txtpackwrap]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 110,
			border      : false,
			items       : [txthdpe]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 150,
			border      : false,
			items       : [txtgumtape]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 200,
			border      : false,
			items       : [txtmarker]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 240,
			border      : false,
			items       : [txtshuttle]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 280,
			border      : false,
			items       : [txtlabel]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 320,
			border      : false,
			items       : [txttruckno]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 360,
			border      : false,
			items       : [txtweigbrdgewt]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 400,
			x           : 50,
			y           : 400,
			border      : false,
			items       : [txtweightcardno]
		},
	]
});

     var TrnPackingMaterialDeliveryEntryWindow = new Ext.Window({
        height      : 530,
        width       : 550,
        y           : 35,
        title       : 'PACKING MATERIAL DELIVERY ENTRY',
        layout      : 'fit',
        items       : TrnPackingMaterialDeliveryEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
	//bodyStyle:{"background-color":"#E9EEDD"},
        listeners:
            {
                
            }
    });
       TrnPackingMaterialDeliveryEntryWindow.show();
});

