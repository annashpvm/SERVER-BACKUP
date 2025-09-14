Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;

var txtdocno = new Ext.form.NumberField({
        fieldLabel  : 'Document No',
        id          : 'txtdocno',
        name        : 'txtdocno',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dtdocdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdocdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});




var selreelbundle = "1";


var selreelsfrom = "1";
var optselreelsfrom = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Select Reels From',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:55,
    x:450,
    y:20,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid skyblue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optselreelsfrom',
        items: [
            {boxLabel: 'From Rewinder', name: 'optselreelsfrom', id:'optselreelsfromrewinder', inputValue: '1', checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		selreelsfrom = "1";
            
               }
              }
             }
            },
            {boxLabel: 'From Salvage', name: 'optselreelsfrom', id:'optselreelsfromsalvage', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		selreelsfrom = "2";
            
               }
              }
             }},
        ]
    }
    ]
});


var lblvariety = new Ext.form.Label({
	fieldLabel  : 'Variety',
	id          : 'lblvariety',
	name        : 'lblvariety',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtvariety = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvariety',
        name        : 'txtvariety',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxvardetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 200,
        x: 10,
        y: 130,        
        columns: [   
            {header: "", dataIndex: 'variety',sortable:true,width:190,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lblsize = new Ext.form.Label({
	fieldLabel  : 'Size',
	id          : 'lblsize',
	name        : 'lblsize',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtsize = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsize',
        name        : 'txtsize',
        width       : 140,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxsizedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 140,
        x: 225,
        y: 130,        
        columns: [   
            {header: "", dataIndex: 'variety',sortable:true,width:130,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lblreelno = new Ext.form.Label({
	fieldLabel  : 'Reel Number',
	id          : 'lblreelno',
	name        : 'lblreelno',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtreelno = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtreelno',
        name        : 'txtreelno',
        width       : 180,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxreelnodetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 180,
        x: 385,
        y: 130,        
        columns: [   
            {header: "", dataIndex: 'variety',sortable:true,width:170,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtweight = new Ext.form.NumberField({
        fieldLabel  : 'Weight',
        id          : 'txtweight',
        name        : 'txtweight',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 40,
    height  : 40,
    x       : 720,
    y       : 210,
   labelStyle : "font-:10px;font-weight:bold;",
   style      : "border-radius:10px;",
   style      :{'background':'#e8badf'},

}); 

var dgrecord = Ext.data.Record.create([]);
var flxselfconsumpdetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 170,
        width: 810,
        x: 0,
        y: 260,        
        columns: [   
            {header: "Variety", dataIndex: 'variety',sortable:true,width:100,align:'left'}, 
            {header: "Varcode", dataIndex: 'varcode',sortable:true,width:70,align:'left'},
            {header: "Size", dataIndex: 'size',sortable:true,width:80,align:'left'},
            {header: "Reel No", dataIndex: 'reel_no',sortable:true,width:120,align:'left'},
            {header: "Weight", dataIndex: 'weight',sortable:true,width:70,align:'left'}, 
            {header: "Ord No", dataIndex: 'ord_no',sortable:true,width:70,align:'left'},
            {header: "MA No", dataIndex: 'ma_no',sortable:true,width:70,align:'left'},
            {header: "Source", dataIndex: 'source',sortable:true,width:70,align:'left'},
            {header: "R/B", dataIndex: 'r_b',sortable:true,width:70,align:'left'}, 
            {header: "Code", dataIndex: 'code',sortable:true,width:70,align:'left'},
            {header: "QC Result", dataIndex: 'qc_result',sortable:true,width:80,align:'left'},
            {header: "Lotno", dataIndex: 'lot_no',sortable:true,width:80,align:'left'},
                                                                                  
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtnoofreels = new Ext.form.NumberField({
        fieldLabel  : 'No of Reels',
        id          : 'txtnoofreels',
        name        : 'txtnoofreels',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txttotweight = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txttotweight',
        name        : 'txttotweight',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

   
var TrnSelfConsumptionEntryFormPanel = new Ext.form.FormPanel({
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
        id          : 'TrnSelfConsumptionEntryFormPanel',
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
                            TrnSelfConsumptionEntryWindow.RefreshData();
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
                            TrnSelfConsumptionEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[               
		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
                height		:450,
                width		:830,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 190,
				x           : 200,
				y           : -10,
				border      : false,
				items       : [txtdocno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 440,
				y           : -10,
				border      : false,
				items: [dtdocdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 80,
				x           : 70,
				y           : 70,
				border      : false,
				items	    : [lblvariety]
			},			
			{
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 230,
				x           : -5,
				y           : 90,
				border      : false,
				items       : [txtvariety]
			},flxvardetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 50,
				x           : 270,
				y           : 70,
				border      : false,
				items	    : [lblsize]
			},			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 170,
				x           : 210,
				y           : 90,
				border      : false,
				items       : [txtsize]
			},flxsizedetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 420,
				y           : 70,
				border      : false,
				items	    : [lblreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 210,
				x           : 370,
				y           : 90,
				border      : false,
				items       : [txtreelno]
			},flxreelnodetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 40,
				width       : 160,
				x           : 580,
				y           : 90,
				border      : false,
				items       : [txtweight]
			},btnadd,flxselfconsumpdetails,
		      	]
    		  },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 170,
				x           : 400,
				y           : 460,
				border      : false,
				items       : [txtnoofreels]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 65,
				width       : 175,
				x           : 600,
				y           : 460,
				border      : false,
				items       : [txttotweight]
			},
      ]
});

     var TrnSelfConsumptionEntryWindow = new Ext.Window({
        height      : 580,
        width       : 855,
        y           : 40,
        title       : 'Self Consumption ENTRY',
        layout      : 'fit',
        items       : TrnSelfConsumptionEntryFormPanel,
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
       TrnSelfConsumptionEntryWindow.show();
});

