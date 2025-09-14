Ext.onReady(function(){
   Ext.QuickTips.init(); 

var optPayType = new Ext.form.RadioGroup({
        title: 'Pay Type',
        columns: 2,
        rows :1,
        id: 'optPayType',
        layout: 'hbox',
        width: 200,
        height :40,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "OptType"},
        items: [
            {boxLabel: 'Against Bills', id: 'optBill', inputValue: 1,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";

                            flxAdjustDetails.getStore().removeAll();
                            BillAdjustingDetail();

                        }
                    }
                }
            },
            {boxLabel: 'Advance', id: 'optAdv', inputValue: 2, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "AD";
                            flxAdjustDetails.getStore().removeAll();
                        }
                    }
                }
            }
        ]
    });
var txttotal = new Ext.form.NumberField({
        fieldLabel  : 'TOTAL',
        id          : 'txttotal',
        name        : 'txttotal',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#000000",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
		tabindex : 2
});
var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:100,
    height: 150,
    hidden:false,
    width:950,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "NO", dataIndex:'reel', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "AMOUNT", dataIndex:'bf14', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "RATE", dataIndex:'bf16', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "QUALITY", dataIndex:'bf18', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "VALUE", dataIndex:'bf20', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "22", dataIndex:'bf22', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "24", dataIndex:'bf24', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "26", dataIndex:'bf26', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "28", dataIndex:'bf28', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "30", dataIndex:'bf30', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
    ],
    store: [], //BFDataStore,

});
 
var txtvalue = new Ext.form.NumberField({
        fieldLabel  : 'VALUE',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#000000",
        style       :  {textTransform: "uppercase"},
//	readOnly    : true,
	tabindex    : 2
});
 var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'RATE',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#000000",
        style       :  {textTransform: "uppercase"},
//	readOnly    : true,
	tabindex    : 2
});
var txtitem = new Ext.form.TextField({
        fieldLabel  : 'ITEM',
        id          : 'txtitem',
        name        : 'txtitem',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#000000",
        style       :  {textTransform: "uppercase"},
//	readOnly    : true,
        tabindex    : 2
    });       
var grndate = new Ext.form.DateField({
         fieldLabel : 'GRN DATE',
         id         : 'grndate',
         name       : 'date',
         format     : 'd-m-Y',
         value      : new Date(),
         labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
         width      : 100,
});
 var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'SUPPLIER',
        width           : 80,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbsupplier',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1','2','3','4','5'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
var txtGrnno = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGrnno',
        name        : 'txtGrnno',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });   


 var tabTest = new Ext.TabPanel({
    id          : 'tabTest',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 600,
    width       : 1000,
    x           :10,
    y		:250,
 
           
     items       : [
                    {
                     xtype: 'panel',
                     title: 'QUALITY DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelwidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtitem]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 200,
                        	y           : 0,
                            	border      : false,
                        	items: [txtrate]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 400,
                        	y           : 0,
                            	border      : false,
                        	items: [txtvalue]
                    },        
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 100,
                        	y           : 50,
                            	border      : false,
                        	items: [flxDetail]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 550,
                        	y           : 50,
                            	border      : false,
                        	items: [btnadd]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 100,
                        	y           : 205,
                            	border      : false,
                        	items: [txttotal]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 100,
                        	y           : 205,
                            	border      : false,
                        	items: [txttotal]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 450,
                        	y           : 100,
                            	border      : false,
                        	items: [optPayType]
                    },                                                                                                                                                        
                            ]
                     },
                                       {
                     xtype: 'panel',
                     title: 'VALUE DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: []
                     },
                   ]  
});
    
var TestPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 250,	
	bodyStyle   :{"background-color":"#228B22"},
        height      : 150,
        x           : 50,
        y           : 50,
        frame       : false,
        id          : 'TestPanel',
        method      : 'POST',
        layout      : 'absolute',
        border       : true,
        items:[
              {   
	   xtype       : 'fieldset',
	   title       : '',
	   width       : 750,
	   height      : 150,
	   x           : 10,
	   y           : 10,
	   border      : true,
	   layout      : 'absolute',
	   items:[
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtGrnno]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 400,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbsupplier]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 70,
                            	border      : false,
                        	items: [grndate]
                    },
                    ]
                    },
                    {  
	   xtype       : 'fieldset',
	   title       : '',
	   width       : 750,
	   height      : 300,
	   x           : 10,
	   y           : 150,
	   border      : true,
	   layout      : 'absolute',
	   items:[{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                                height      : 300,
                        	width       : 750,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [tabTest]
                    },
                   ]
                   },                    
               ]
	       },
);
var Empwindow = new Ext.Window({
	height      : 500,
        width       : 800,
        x	     :300,
        y           : 100,
        title       :'DESING MASTER',
        items       : 'TestPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : true,
        draggable   : true,
 	listeners:{
               show:function(){
             }
             }
            });
             
           Empwindow.show();  
             
});     
