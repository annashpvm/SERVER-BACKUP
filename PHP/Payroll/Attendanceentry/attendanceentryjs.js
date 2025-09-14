Ext.onReady(function(){
   Ext.QuickTips.init();

var txtdetotalnumberrecords = new Ext.form.TextField({
        fieldLabel  : 'TOTAL NUMBER RECORDS',
        id          : 'txtdetotalnumberrecords',
        name        : 'txtdetotalnumberrecords',
        width       :  150,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var btnexit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "EXIT",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var btnrefresh = new Ext.Button({
    style   : 'text-align:center;',
    text    : "REFRESH",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var btnsave = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SAVE",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var btnedit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "EDIT",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var btnnew = new Ext.Button({
    style   : 'text-align:center;',
    text    : "NEW",
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
    height: 90,
    hidden:false,
    width:950,
    id: 'my-grid',
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Reel", dataIndex:'reel', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "14", dataIndex:'bf14', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "16", dataIndex:'bf16', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "18", dataIndex:'bf18', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "20", dataIndex:'bf20', width:80,align:'center',sortable:false, menuDisabled: true,
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

var cmbyear = new Ext.form.ComboBox({
        fieldLabel      : 'YEAR',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbyear',
        typeAhead       : true,
        mode            : 'local',
        store           : ['2023','2024'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle      : "font-size:12px;font-weight:bold;color:#FFFF00",
    	style           : "border-radius:5px;",         
});

var cmbmonth = new Ext.form.ComboBox({
        fieldLabel      : 'MONTH',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmonth',
        typeAhead       : true,
        mode            : 'local',
        store           : ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMPER','OCTOBER','NOVEMBER','DECEMBER'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,                                        
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle      : "font-size:12px;font-weight:bold;color:#FFFF00",
    	style           : "border-radius:5px;",         
});
var TestPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 250,	
	bodyStyle   :{"background-color":"#228B22"},
        height      : 150,
        x           : 100,
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
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 20,
                        	y           : 30,
                            	border      : false,
                        	items: [cmbmonth]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 500,
                        	y           : 30,
                            	border      : false,
                        	items: [cmbyear]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 0,
                        	y           : 100,
                            	border      : false,
                        	items: [flxDetail]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 0,
                        	y           : 470,
                            	border      : false,
                        	items: [btnnew]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 70,
                        	y           : 470,
                            	border      : false,
                        	items: [btnedit]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 140,
                        	y           : 470,
                            	border      : false,
                        	items: [btnsave]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 210,
                        	y           : 470,
                            	border      : false,
                        	items: [btnrefresh]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 280,
                        	y           : 470,
                            	border      : false,
                        	items: [btnexit]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 400,
                        	y           : 470,
                            	border      : false,
                        	items: [txtdetotalnumberrecords]
               },
              ]
});
var Empwindow = new Ext.Window({
	height      : 550,
        width       : 900,
        x	    : 200,
        y           : 50,
        title       :'DATA ENTRY',
        items       : [TestPanel],
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
