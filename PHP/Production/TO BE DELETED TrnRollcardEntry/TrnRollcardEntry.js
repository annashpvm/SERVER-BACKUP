Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;



var dtproddate = new Ext.form.DateField({
    fieldLabel : 'M/C  P.DATE',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});

var lblprollno = new Ext.form.Label({
	fieldLabel  : 'Parent Roll No',
	id          : 'lblprollno',
	name        : 'lblprollno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var cmbprollno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbprollno',
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
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var lblBF = new Ext.form.Label({
	fieldLabel  : 'BF',
	id          : 'lblBF',
	name        : 'lblBF',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

   
var cmbbatch = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbbatch',
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
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });   

var lblrollwt = new Ext.form.Label({
	fieldLabel  : 'WT (Tons)',
	id          : 'lblrollwt',
	name        : 'lblrollwt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtrollwt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtrollwt',
        name        : 'txtrollwt',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblmcdeckle = new Ext.form.Label({
	fieldLabel  : 'M/C Deckle',
	id          : 'lblmcdeckle',
	name        : 'lblmcdeckle',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtmcdeckle = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtmcdeckle',
        name        : 'txtmcdeckle',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblvar = new Ext.form.Label({
	fieldLabel  : 'Variety',
	id          : 'lblvar',
	name        : 'lblvar',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtvar = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvar',
        name        : 'txtvar',
        width       : 190,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblgsm = new Ext.form.Label({
	fieldLabel  : 'GSM',
	id          : 'lblgsm',
	name        : 'lblgsm',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtgsm = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblmano = new Ext.form.Label({
	fieldLabel  : 'MA No',
	id          : 'lblmano',
	name        : 'lblmano',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtmano = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtmano',
        name        : 'txtmano',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtbright = new Ext.form.NumberField({
        fieldLabel  : 'Bright (%)',
        id          : 'txtbright',
        name        : 'txtbright',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtbreaks = new Ext.form.NumberField({
        fieldLabel  : 'Breaks',
        id          : 'txtbreaks',
        name        : 'txtbreaks',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtrolldia = new Ext.form.NumberField({
        fieldLabel  : 'Roll Dia',
        id          : 'txtrolldia',
        name        : 'txtrolldia',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txttotnoset = new Ext.form.NumberField({
        fieldLabel  : 'Total No. of sets',
        id          : 'txttotnoset',
        name        : 'txttotnoset',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});
   
var cmbselectsetno = new Ext.form.ComboBox({
        fieldLabel      : 'Select SET No',
        width           : 60,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbselectsetno',
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
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   }); 

var cmbselallsetsamdeck = new Ext.form.ComboBox({
        fieldLabel      : 'Select All Sets are same Deckle',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbselallsetsamdeck',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Yes','No'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   }); 

var cmbrewinddeckl = new Ext.form.ComboBox({
        fieldLabel      : 'Rewinder Deckle',
        width           : 350,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbrewinddeckl',
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
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   }); 


var dgrecord = Ext.data.Record.create([]);
var flxrollcard = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 1040,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Quality", dataIndex: 'quality',sortable:true,width:100,align:'left'}, 
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:50,align:'left'},  
            {header: "SET", dataIndex: 'set',sortable:true,width:80,align:'left'},
            {header: "SIZE", dataIndex: 'size',sortable:true,width:150,align:'left'}, 
            {header: "REEL TYPE", dataIndex: 'reel_type',sortable:true,width:80,align:'left'}, 
            {header: "REMARKS", dataIndex: 'remarks',sortable:true,width:150,align:'left'},
            {header: "PROCESS", dataIndex: 'process',sortable:true,width:50,align:'left'},
            {header: "LOTNO", dataIndex: 'lotno',sortable:true,width:50,align:'left'},
            {header: "VARIETY", dataIndex: 'variety',sortable:true,width:100,align:'left'},
            {header: "ORDER", dataIndex: 'order',sortable:true,width:70,align:'left'},
        ],
store:[], //loadsalledgerlistdatastore,

    

   });
/*
var lblcheck = new Ext.form.Label({
	fieldLabel  : 'CHECK FOR REWINDER DATA IF ROLL CARD IS PROCESS OR NOT',
	id          : 'lblcheck',
	name        : 'lblcheck',
	width       :  120,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var btncheck = new Ext.Button({
        icon	:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 60,
        text    : "CHECK ",
        x       : 1020,
        y       : 75,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;", 
    	listeners:{
        click: function(){    
          	var addok;
	              addok ="true";

	          	       refresh();

            
  }
}
});
*/

var dgrecord = Ext.data.Record.create([]);
var flxsetbatch = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 240,
        x: 930,
        y: 150,        
        columns: [   
            {header: "SET", dataIndex: 'set',sortable:true,width:80,align:'left'}, 
            {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:80,align:'left'},  
            {header: "BATCH", dataIndex: 'batch',sortable:true,width:80,align:'left'},
        ],
store:[], //loadsalledgerlistdatastore,

    

   });

var TrnRollcardEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ROLL CARD ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
        frame       : false,
        id          : 'TrnRollcardEntryFormPanel',
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
                            TrnRollcardEntryWindow.RefreshData();
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
                            TrnRollcardEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                
		{
		  xtype	: 'fieldset',
                title	: '',
                layout 	: 'hbox',
                border	:true,
                height	:440,
                width	:920,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 210,
				x           : 680,
				y           : -10,
				border      : false,
				items	    : [dtproddate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 120,
				x           : 5,
				y           : 25,
				border      : false,
				items	    : [lblprollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 120,
				x           : -5,
				y           : 60,
				border      : false,
				items	     : [cmbprollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 120,
				y           : 25,
				border      : false,
				items	    : [lblBF]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 2,
				width       : 100,
				x           : 110,
				y           : 60,
				border      : false,
				items	     : [cmbbatch]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 90,
				x           : 210,
				y           : 25,
				border      : false,
				items	    : [lblrollwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 100,
				x           : 200,
				y           : 60,
				border      : false,
				items       : [txtrollwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 310,
				y           : 25,
				border      : false,
				items	    : [lblmcdeckle]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 110,
				x           : 300,
				y           : 60,
				border      : false,
				items       : [txtmcdeckle]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 420,
				y           : 25,
				border      : false,
				items	    : [lblvar]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 225,
				x           : 410,
				y           : 60,
				border      : false,
				items       : [txtvar]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 80,
				x           : 645,
				y           : 25,
				border      : false,
				items	    : [lblgsm]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 635,
				y           : 60,
				border      : false,
				items       : [txtgsm]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 90,
				x           : 740,
				y           : 25,
				border      : false,
				items	    : [lblmano]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 100,
				x           : 730,
				y           : 60,
				border      : false,
				items       : [txtmano]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 165,
				x           : 0,
				y           : 110,
				border      : false,
				items       : [txtbright]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 165,
				x           : 0,
				y           : 140,
				border      : false,
				items       : [txtbreaks]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 165,
				x           : 0,
				y           : 170,
				border      : false,
				items       : [txtrolldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 190,
				x           : 180,
				y           : 120,
				border      : false,
				items       : [txttotnoset]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 190,
				x           : 180,
				y           : 170,
				border      : false,
				items	     : [cmbselectsetno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 200,
				width       : 300,
				x           : 400,
				y           : 120,
				border      : false,
				items	     : [cmbselallsetsamdeck]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 500,
				x           : 400,
				y           : 170,
				border      : false,
				items	     : [cmbrewinddeckl]
			},
			             
                	]
		  },
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 220,
				width       : 230,
				x           : 930,
				y           : 30,
				border      : true,
				items	    : [lblcheck]
			},
*/

//                     btncheck,
flxsetbatch,
		{
		xtype	: 'fieldset',
                title	: 'CUTTING SIZE',
                layout 	: 'hbox',
                border	: true,
                height	: 200,
                width	: 900,
                layout 	: 'absolute',
                x	: 15,
                y	: 240,
             	items:[
			flxrollcard,
             	   ]
            	 }
		]
               });

     var TrnRollcardEntryWindow = new Ext.Window({
        height      : 550,
        width       : 1200,
        y           : 40,
        layout      : 'fit',
        items       : TrnRollcardEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
        listeners:
            {
                
            }
    });
       TrnRollcardEntryWindow.show();
});
