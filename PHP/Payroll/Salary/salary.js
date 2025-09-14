Ext.onReady(function(){
   Ext.QuickTips.init();

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
       {header: "Reel", dataIndex:'r	eel', width:80,align:'center',sortable:false, menuDisabled: true},
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



        var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Section',
        width           : 60,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbshift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
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

    var dtproddate = new Ext.form.DateField({
    fieldLabel : 'DATE',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
    width : 100,
});

        var txtpf = new Ext.form.NumberField({
        fieldLabel  : 'PF',
        id          : 'txtpf',
        name        : 'txtpf',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
		tabindex : 2
    });

	var txtgrnno = new Ext.form.NumberField({
        fieldLabel  : 'GRN No',
        id          : 'txtgrnno',
        name        : 'txtgrnno',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
		tabindex : 2
    });


	var txtInvno = new Ext.form.TextField({
        fieldLabel  : 'INV No',
        id          : 'txtInvno',
        name        : 'txtgrnno',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
                     title: 'PRESENT ADDRESS-2',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
	   {   
	   xtype       : 'fieldset',
	   title       : 'XYZ',
	   width       : 500,
	   height      : 100,
	   x           : 10,
	   y           : 10,
	   border      : true,
	   layout      : 'absolute',
	   items:[
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtgrnno]
                    },
           ]
         
	  },


                     ]

                   },
                   {
                     xtype: 'panel',
                     title: 'PRESENT ADDRESS-3',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [flxDetail]
                    },

                     ]
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
        items: [


	   {   
	   xtype       : 'fieldset',
	   title       : 'ESI',
	   width       : 500,
	   height      : 100,
	   x           : 600,
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
                        	items: [txtInvno]
                    },

          ]
	  },

	   {   
	   xtype       : 'fieldset',
	   title       : 'PF',
	   width       : 1000,
	   height      : 200,
	   x           : 150,
	   y           : 130,
	   border      : true,
	   layout      : 'absolute',
	   items:[
                 { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 400,
                        	y           : 100,
                            	border      : false,
                        	items: [btnsave] },
                 { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 100,
                            	border      : false,
                        	items: [cmbshift] 
                 },
                 { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 300,
                        	y           : 5,
                            	border      : false,
                        	items: [dtproddate] 
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtpf] 
                   },


                    ]
	  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 1000,
                        	x           : 0,
                        	y           : 200,
                            	border      : false,
                        	items: [tabTest] 
                   },

        ],                          



});

   
var Empwindow = new Ext.Window({
	height      : 600,
        width       : 1200,
        x	     :10,
        y           : 10,
        title       :'EMPLOYEE MASTER',
        items       : 'TestPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#228B22"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      :true,
        draggable   : true,
 	listeners:{
               show:function(){
             }
             }
            });
             
           Empwindow.show();

  
             
});     
