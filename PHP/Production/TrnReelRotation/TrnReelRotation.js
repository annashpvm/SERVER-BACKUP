Ext.onReady(function() {
Ext.QuickTips.init();

var selectreelty = "1";
var optselectreelty = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Select Reels Type',
    fieldLabel: '',
    layout : 'hbox',
    width:300,
    height:55,
    x:100,
    y:5,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid skyblue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optselectreelty',
        items: [
            {boxLabel: 'All Reels', name: 'optselectreelty', id:'optselectreeltyall', inputValue: '1', checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		selectreelty = "1";
            
               }
              }
             }
            },
            {boxLabel: 'Unprocessed Reels', name: 'optselectreelty', id:'optselectreeltyunpro', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		selectreelty = "2";
            
               }
              }
             }},
        ]
    }
    ]
});

var selreelsfrom = "1";
var cmbreelno = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width           : 180,
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
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var txtentno = new Ext.form.NumberField({
        fieldLabel  : 'Entry No',
        id          : 'txtentno',
        name        : 'txtentno',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dtentdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtentdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 85,
});

var txtrollno = new Ext.form.NumberField({
        fieldLabel  : 'Roll No',
        id          : 'txtrollno',
        name        : 'txtrollno',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtlotno = new Ext.form.NumberField({
        fieldLabel  : 'Lot No',
        id          : 'txtlotno',
        name        : 'txtlotno',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtvariety = new Ext.form.NumberField({
        fieldLabel  : 'Variety',
        id          : 'txtvariety',
        name        : 'txtvariety',
        width       : 330,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtgsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtsize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtsize',
        name        : 'txtsize',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtwtinkg = new Ext.form.NumberField({
        fieldLabel  : 'Weight in Kgs',
        id          : 'txtwtinkg',
        name        : 'txtwtinkg',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtreelstatus = new Ext.form.NumberField({
        fieldLabel  : 'Status of Reel',
        id          : 'txtreelstatus',
        name        : 'txtreelstatus',
        width       : 300,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtPPNo = new Ext.form.NumberField({
        fieldLabel  : 'PP No',
        id          : 'txtPPNo',
        name        : 'txtPPNo',
        width       : 205,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtpreqcstatus = new Ext.form.NumberField({
        fieldLabel  : 'Present QC Status',
        id          : 'txtpreqcstatus',
        name        : 'txtpreqcstatus',
        width       : 300,
        height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtordno = new Ext.form.NumberField({
        fieldLabel  : 'Ord No',
        id          : 'txtordno',
        name        : 'txtordno',
        width       : 205,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtatperstg1 = new Ext.form.NumberField({
        fieldLabel  : 'At Present Stage',
        id          : 'txtatperstg1',
        name        : 'txtatperstg1',
        width       : 300,
        height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttobechgas1 = new Ext.form.NumberField({
        fieldLabel  : 'To be Changed as',
        id          : 'txttobechgas1',
        name        : 'txttobechgas1',
        width       : 200,
       // height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxchangedas1details = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 60,
        width: 200,
        x: 530,
        y: 25,        
        columns: [   
            {header: "", dataIndex: 'location',sortable:true,width:190,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtatperstg2 = new Ext.form.NumberField({
        fieldLabel  : 'At Present Stage',
        id          : 'txtatperstg2',
        name        : 'txtatperstg2',
        width       : 300,
//      height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttobechgas2 = new Ext.form.NumberField({
        fieldLabel  : 'To be Changed as',
        id          : 'txttobechgas2',
        name        : 'txttobechgas2',
        width       : 300,
       // height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxchangedas2details = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 60,
        width: 300,
        x: 90,
        y: 60,        
        columns: [   
            {header: "", dataIndex: 'location',sortable:true,width:290,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtqcreason = new Ext.form.NumberField({
        fieldLabel  : 'QC Reason',
        id          : 'txtqcreason',
        name        : 'txtqcreason',
        width       : 200,
       // height	    : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxqcreasondetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 90,
        width: 200,
        x: 530,
        y: 30,        
        columns: [   
            {header: "", dataIndex: 'location',sortable:true,width:190,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });
   
var TrnReelRotationFormPanel = new Ext.form.FormPanel({
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
        id          : 'TrnReelRotationFormPanel',
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
                            TrnReelRotationWindow.RefreshData();
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
                            TrnReelRotationWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[ 
         	optselectreelty,
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 260,
			x           : 10,
			y           : 55,
			border      : false,
			items	    : [cmbreelno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 170,
			x           : 250,
			y           : 55,
			border      : false,
			items       : [txtentno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 145,
			x           : 410,
			y           : 55,
			border      : false,
			items: [dtentdate]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 130,
			x           : 540,
			y           : 55,
			border      : false,
			items       : [txtrollno]
		},			
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 45,
			width       : 150,
			x           : 660,
			y           : 55,
			border      : false,
			items       : [txtlotno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 410,
			x           : 10,
			y           : 90,
			border      : false,
			items       : [txtvariety]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 140,
			x           : 410,
			y           : 90,
			border      : false,
			items       : [txtgsm]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 120,
			x           : 550,
			y           : 90,
			border      : false,
			items       : [txtsize]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 45,
			width       : 155,
			x           : 660,
			y           : 90,
			border      : false,
			items       : [txtwtinkg]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 410,
			x           : 10,
			y           : 120,
			border      : false,
			items       : [txtreelstatus]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 275,
			x           : 540,
			y           : 120,
			border      : false,
			items       : [txtPPNo]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 410,
			x           : 10,
			y           : 150,
			border      : false,
			items       : [txtpreqcstatus]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 275,
			x           : 540,
			y           : 150,
			border      : false,
			items       : [txtordno]
		},
		{
		xtype  	: 'fieldset',
		title		: 'Reel Status',
		layout 	: 'hbox',
		border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
		height		:120,
		width		:830,
		layout 	: 'absolute',
		x		: 5,
		y		: 210,
		items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 410,
				x           : 0,
				y           : -10,
				border      : false,
				items       : [txtatperstg1]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 95,
				width       : 325,
				x           : 420,
				y           : -10,
				border      : false,
				items       : [txttobechgas1]
			},flxchangedas1details,
             
             ]
             },
		{
		xtype  	: 'fieldset',
		title		: 'QC Status',
		layout 	: 'hbox',
		border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
		height		:160,
		width		:830,
		layout 	: 'absolute',
		x		: 5,
		y		: 335,
		items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 410,
				x           : 0,
				y           : -10,
				border      : false,
				items       : [txtatperstg2]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 410,
				x           : 0,
				y           : 25,
				border      : false,
				items       : [txttobechgas2]
			},flxchangedas2details, 
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 95,
				width       : 325,
				x           : 420,
				y           : -10,
				border      : false,
				items       : [txtqcreason]
			},flxqcreasondetails,   

		]
		},        
      ]
});

     var TrnReelRotationWindow = new Ext.Window({
        height      : 580,
        width       : 855,
        y           : 40,
        title       : 'REEL ROTATION',
        layout      : 'fit',
        items       : TrnReelRotationFormPanel,
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
       TrnReelRotationWindow.show();
});

