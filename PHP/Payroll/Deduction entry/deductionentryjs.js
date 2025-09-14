Ext.onReady(function(){
   Ext.QuickTips.init();

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    hidden:false,
    width: 300,
    id: 'my-grid',  
    labelStyle	: "font-size:12px;font-weight:bold",
//   font-size:18px,
    columns:
    [
       {header: "emp_code", Id:'code1', width:80, align:'center', sortable:true, menuDisabled: true},
       {header: "Name", Id:'name2', width:80, align:'center', sortable:true, menuDisabled: true}, 
       {header: "Department", Id:'amount3', width:80, align:'center', sortable:true, menuDisabled: true},
       {header: "CAT", Id:'amount3', width:80, align:'center', sortable:true, menuDisabled: true},
       {header: "Deduction", Id:'amount4', width:80, align:'center', sortable:true, menuDisabled: true},
    ]
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
var btnimport = new Ext.Button({
    style   : 'text-align:center;',
    text    : "IMPORT",
    width   : 50,
    height  : 30,
    x       : 860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var cmbdeduction = new Ext.form.ComboBox({
        fieldLabel      : 'DEDUCTION',
        width           :  150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbdeduction',
        typeAhead       : true,
        mode            : 'local',
        store           : ['MESS','SALARY ADVANCE','TDS','LWF','RENT ADVANCE','DAMAGED'],
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
var cmbyear = new Ext.form.ComboBox({
        fieldLabel      : 'cmbyear',
        width           :  150,
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
/*var cmbmonth = new Ext.form.ComboBox({
        fieldLabel      : 'MONTH',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmonth',
        scrollable      : true,
        typeAhead       : true,
        mode            : 'local'
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
});*/
var TestPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 900,	
	bodyStyle   : {"background-color":"#228B22"},
        height      : 550,
        x           : 50,
        y           : 50,
        frame       : false,
        id          : 'TestPanel',
        method      : 'POST',
        layout      : 'absolute',
        border      : true,
        items:[
              {   
	   xtype       : 'fieldset',
	   title       : '',
	   width       : 850,
	   height      : 100,
	   x           : 10,
	   y           : 10,
	   border      : true,
	   layout      : 'absolute',
	   items:[
                /* { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbmonth]
                  },*/
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 300,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbyear]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 0,
                        	y           : 40,
                            	border      : false,
                        	items: [cmbdeduction]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 300,
                        	y           : 40,
                            	border      : false,
                        	items: [btnimport]
                  },        
                  ]
                  },
                  {
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 400,
                        	width       : 400,
                        	x           : 300,
                        	y           : 200,
                            	border      : false,
                        	items: [flxDetail]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 300,
                        	y           : 40,
                            	border      : false,
                        	items: [btnnew]
                  },        
              ]
});
var Empwindow = new Ext.Window({
	height      : 550,
        width       : 900,
        x	    : 50,
        y           : 50,
        title       :'DATA ENTRY',
        items       : [TestPanel],
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : true,
         border      : true,
        draggable   : true,
 	listeners:{
               show:function(){
             }
             }
            });
             
           Empwindow.show();  
});     
