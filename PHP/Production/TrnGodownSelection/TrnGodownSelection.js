Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;

var lbldetails = new Ext.form.Label({
	fieldLabel  : 'REEL LOCATION SELECTION',
	id          : 'lbldetails',
	name        : 'lbldetails',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:15px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var reelfrom = "1";
  

var cmbreelno = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width           : 300,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbreelno',
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
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var txtwtkg = new Ext.form.NumberField({
        fieldLabel  : 'Weight in kgs',
        id          : 'txtwtkg',
        name        : 'txtwtkg',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});



var txtvariety = new Ext.form.NumberField({
        fieldLabel  : 'Variety',
        id          : 'txtvariety',
        name        : 'txtvariety',
        width       : 300,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});



var txtgsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtsize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtdocno',
        name        : 'txtdocno',
        width       : 120,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtrollno = new Ext.form.NumberField({
        fieldLabel  : 'Roll No',
        id          : 'txtrollno',
        name        : 'txtrollno',
        width       : 120,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtlotno = new Ext.form.NumberField({
        fieldLabel  : 'Lot No',
        id          : 'txtlotno',
        name        : 'txtlotno',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtstatusreel = new Ext.form.NumberField({
        fieldLabel  : 'Status of the Reel',
        id          : 'txtstatusreel',
        name        : 'txtstatusreel',
        width       : 300,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtentrynodate = new Ext.form.NumberField({
        fieldLabel  : 'Entry No. & Date',
        id          : 'txtentrynodate',
        name        : 'txtentrynodate',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtqcstatus1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtqcstatus1',
        name        : 'txtqcstatus1',
        width       : 640,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtqcstatus2 = new Ext.form.NumberField({
        fieldLabel  : 'Present QC Status',
        id          : 'txtqcstatus2',
        name        : 'txtqcstatus2',
        width       : 640,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var cmblocation = new Ext.form.ComboBox({
        fieldLabel      : 'Location',
        width           : 300,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmblocation',
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
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
   
var TrnGodownSelectionFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Reel LOCATION SELECTION',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnGodownSelectionFormPanel',
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
                            gstFlag = "Edit";
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
                            TrnGodownSelectionWindow.RefreshData();
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
                            TrnGodownSelectionWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 300,
				width       : 270,
				x           : 250,
				y           : 0,
				border      : false,
				items	    : [lbldetails]
			},                
		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid gray;border-radius:5px;",                
                height		:380,
                width		:825,
                layout 	: 'absolute',
                x		: 5,
                y		: 40,
             items:[
             	             
             {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid green;border-radius:5px;",              
                height		:280,
                width		:800,
                layout 	: 'absolute',
                x		: 0,
                y		: 30,
             items:[	
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 410,
				x           : 10,
				y           : 10,
				border      : false,
				items	    : [cmbreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 210,
				x           : 550,
				y           : 10,
				border      : false,
				items       : [txtwtkg]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 410,
				x           : 10,
				y           : 50,
				border      : false,
				items       : [txtvariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 215,
				x           : 550,
				y           : 50,
				border      : false,
				items       : [txtgsm]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 230,
				x           : 10,
				y           : 85,
				border      : false,
				items       : [txtsize]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 230,
				x           : 280,
				y           : 85,
				border      : false,
				items       : [txtrollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 215,
				x           : 550,
				y           : 85,
				border      : false,
				items       : [txtlotno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 410,
				x           : 10,
				y           : 115,
				border      : false,
				items       : [txtstatusreel]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 220,
				x           : 540,
				y           : 115,
				border      : false,
				items       : [txtentrynodate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 750,
				x           : 10,
				y           : 150,
				border      : false,
				items       : [txtqcstatus1]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 750,
				x           : 10,
				y           : 185,
				border      : false,
				items       : [txtqcstatus2]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 410,
				x           : 10,
				y           : 220,
				border      : false,
				items	    : [cmblocation]
			},								             
              	]
	  },	
	  			             
      	]
      },		
      ]
});

     var TrnGodownSelectionWindow = new Ext.Window({
        height      : 540,
        width       : 855,
        y           : 40,
        layout      : 'fit',
        items       : TrnGodownSelectionFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
onEsc:function(){
},
        listeners:
            {
                
            }
    });
       TrnGodownSelectionWindow.show();
});

