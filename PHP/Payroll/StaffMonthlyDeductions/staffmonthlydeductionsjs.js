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
       {header: "Deduct_Code", Id:'code1', width:80, align:'center', sortable:true, menuDisabled: true},
       {header: "Deduction Name", Id:'name2', width:80, align:'center', sortable:true, menuDisabled: true}, 
       {header: "Deduction Amount", Id:'amount3', width:80, align:'center', sortable:true, menuDisabled: true},
    ]
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
 var btnsave = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SAVE",
    width   : 50,
    height  : 30,
    x       : 10,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#FFFF00",
   style      : "border-radius:10px;",
   tabindex : 1,
});
var txtdesignation = new Ext.form.TextField({
        fieldLabel  : 'DESIGNATION',
        id          : 'txtdesignation',
        name        : 'txtdesignation',
        width       :  150,
        labelStyle  : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var txtempcode = new Ext.form.TextField({
        fieldLabel  : 'EMP.CODE',
        id          : 'txtempcode',
        name        : 'txtempcode',
        width       :  150,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var txtavailableworkingdays = new Ext.form.TextField({
        fieldLabel  : 'AVAILABLE WORKING DAYS',
        id          : 'txtavailableworkingdays',
        name        : 'txtavailableworkingdays',
        width       :  150,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var txtdepartment = new Ext.form.TextField({
        fieldLabel  : 'DEPARTMENT',
        id          : 'txtdepartment',
        name        : 'txtdepartment',
        width       :  150,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var txtemployetype = new Ext.form.TextField({
        fieldLabel  : 'EMPLOYE TYPE',
        id          : 'txtemployetype',
        name        : 'txtemployetype',
        width       :  150,
        labelStyle : "font-size:14px;font-weight:bold;color:#FFFF00",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
        tabindex : 2
    });
var cmbemployeename = new Ext.form.ComboBox({
        fieldLabel      : 'EMPLOYEE NAME',
        width           : 700,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbemployeename',
        typeAhead       : true,
        scrollable      : true,
        mode            : 'local',
        store           : ['ANNADURAI VADAMALAIRAJ','ARUNA J','BALASUBRAMANIAN D','BHUVANESWARI S','CHELLAPANDIAN S','DHAMODHARAN R','JOTHI LAKSHAMI M','KARUTHAPANDIAN M','LINGAMMALDEVI S','M SIVARAMAKRISHNAN','M.SETHURAMAN'],
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
        scrollable      : true,
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
var cmbyear = new Ext.form.ComboBox({
        fieldLabel      : 'YEAR',
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

var TestPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 1000,	
	bodyStyle   : {"background-color":"#228B22"},
        height      : 600,
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
	   title       : 'EMPLOYEE DEDUCTION DETAILS',
	   width       : 850,
	   height      : 100,
	   x           : 10,
	   y           : 10,
	   border      : true,
	   layout      : 'absolute',
	   items:[ 
                 { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbmonth]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 400,
                        	x           : 500,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbyear]
                  },
                 ]
              },
              {   
	   xtype       : 'fieldset',
	   title       : '',
	   width       : 850,
	   height      : 200,
	   x           : 10,
	   y           : 100,
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
                        	items: [cmbemployeename]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 0,
                        	y           : 50,
                            	border      : false,
                        	items: [txtemployetype]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 0,
                        	y           : 100,
                            	border      : false,
                        	items: [txtdepartment]
                  }, 
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 0,
                        	y           : 130,
                            	border      : false,
                        	items: [txtavailableworkingdays]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 500,
                        	y           : 0,
                            	border      : false,
                        	items: [txtempcode]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 500,
                        	y           : 50,
                            	border      : false,
                        	items: [txtdesignation]
                  },                            
                  ]
               },
               { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                                height      : 800,
                        	width       : 500,
                        	x           : 10,
                        	y           : 300,
                            	border      : false,
                        	items: [flxDetail]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 30,
                        	y           : 30,
                            	border      : false,
                        	items: [btnsave]
                  },
                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 400,
                        	x           : 10,
                        	y           : 20,
                            	border      : false,
                        	items: [btnexit]
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
