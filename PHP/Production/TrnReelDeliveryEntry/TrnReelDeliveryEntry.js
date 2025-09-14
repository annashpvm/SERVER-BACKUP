Ext.onReady(function() {
Ext.QuickTips.init();


var txtdcno = new Ext.form.NumberField({
        fieldLabel  : 'DC No',
        id          : 'txtdcno',
        name        : 'txtdcno',
        width       : 50,
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
        width           : 300,
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
   
var cmbmcselect = new Ext.form.ComboBox({
        fieldLabel      : 'Select Machine',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmcselect',
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
   
//--------------Tab 1---------------

var cmbvar = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 350,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbvar',
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

var txtgsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var reelsfrom = "1";
var optreelsfrom = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Reels From',
    fieldLabel: '',
    layout : 'hbox',
    width:90,
    height:75,
    x:430,
    y:10,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid skyblue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optreelsfrom',
        items: [
            {boxLabel: 'Rewinder', name: 'optreelsfrom', id:'optreelsfromrewind', inputValue: '1', checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reelsfrom = "1";
            
               }
              }
             }
            },
            {boxLabel: 'Salvage', name: 'optreelsfrom', id:'optreelsfromsalvage', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reelsfrom = "2";
            
               }
              }
             }},
        ]
    }
    ]
});

var txtsize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtsize',
        name        : 'txtsize',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxsize = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 70,
        width: 170,
        x: 575,
        y: 35,        
        columns: [   
            {header: "", dataIndex: 'size',sortable:true,width:165,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });
   
   
var txtreelno = new Ext.form.NumberField({
        fieldLabel  : 'Reel No',
        id          : 'txtreelno',
        name        : 'txtreelno',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxreelnodetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 170,
        x: 835,
        y: 35,        
        columns: [   
            {header: "", dataIndex: 'reelno',sortable:true,width:165,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var dgrecord = Ext.data.Record.create([]);
var flxvarietydetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 160,
        width: 820,
        x: 10,
        y: 105,        
        columns: [   
            {header: "Variety Name", dataIndex: 'varname',sortable:true,width:130,align:'left'},
            {header: "Variety Code", dataIndex: 'varcode',sortable:true,width:50,align:'left',hidden:'true'},  
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:60,align:'left'},
            {header: "Size(CM)", dataIndex: 'size',sortable:true,width:150,align:'left'}, 
            {header: "Reel No", dataIndex: 'reelno',sortable:true,width:150,align:'left'}, 
            {header: "Weight(Kgs)", dataIndex: 'wt',sortable:true,width:80,align:'left'},
            {header: "Source", dataIndex: 'source',sortable:true,width:100,align:'left'}, 
            {header: "MA No", dataIndex: 'mano',sortable:true,width:100,align:'left'}, 
            {header: "Order Ref", dataIndex: 'ord_ref',sortable:true,width:100,align:'left'},
            {header: "RG1 code", dataIndex: 'rg1_code',sortable:true,width:80,align:'left'},
            {header: "Lot", dataIndex: 'lot',sortable:true,width:60,align:'left'}, 
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtnoofreels = new Ext.form.NumberField({
        fieldLabel  : 'No.of Reels',
        id          : 'txtnoofreels',
        name        : 'txtnoofreels',
        width       : 95,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});
var txttotwtkgs = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight (Kgs)',
        id          : 'txttotwtkgs',
        name        : 'txttotwtkgs',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxsizedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 70,
        width: 970,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Variety", dataIndex: 'variety',sortable:true,width:130,align:'left'},
            {header: "Var Code", dataIndex: 'varcode',sortable:true,width:60,align:'left'},  
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:60,align:'left'},
            {header: "Lot", dataIndex: 'lot',sortable:true,width:60,align:'left'},
            {header: "Size(CM)", dataIndex: 'size',sortable:true,width:150,align:'left'},
            {header: "Nos", dataIndex: 'nos',sortable:true,width:60,align:'left'},             
            {header: "Weight(Kgs)", dataIndex: 'wt',sortable:true,width:80,align:'left'},
            {header: "Cut Width", dataIndex: 'cut_width',sortable:true,width:100,align:'left'}, 
            {header: "Cut Length", dataIndex: 'cut_length',sortable:true,width:100,align:'left'}, 
            {header: "Sheet/Ream", dataIndex: 'sheet_ream',sortable:true,width:100,align:'left'}, 
            {header: "Ream wt", dataIndex: 'ream_wt',sortable:true,width:80,align:'left'}, 
            {header: "Reams/Bund", dataIndex: 'reams_bund',sortable:true,width:80,align:'left'}, 
            {header: "Rate/MT", dataIndex: 'rate_mt',sortable:true,width:80,align:'left'},
            {header: "DCWT", dataIndex: 'dc_wt',sortable:true,width:80,align:'left'},
             
        ],
store:[''], //loadsalledgerlistdatastore,
   });
   
//--------Tab-1 end---------

//--------Tab-2---------

var txtpackwrap = new Ext.form.NumberField({
        fieldLabel  : 'Packing Wrapper',
        id          : 'txtpackwrap',
        name        : 'txtpackwrap',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txthdpe = new Ext.form.NumberField({
        fieldLabel  : 'HDPE',
        id          : 'txthdpe',
        name        : 'txthdpe',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtgumtape = new Ext.form.NumberField({
        fieldLabel  : 'Gum Tape',
        id          : 'txtgumtape',
        name        : 'txtgumtape',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtmarker = new Ext.form.NumberField({
        fieldLabel  : 'Markers',
        id          : 'txtmarker',
        name        : 'txtmarker',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtshuttle = new Ext.form.NumberField({
        fieldLabel  : 'Shuttle',
        id          : 'txtshuttle',
        name        : 'txtshuttle',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});
     
var txtlabel = new Ext.form.NumberField({
        fieldLabel  : 'Labels',
        id          : 'txtlabel',
        name        : 'txtlabel',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttruckno = new Ext.form.NumberField({
        fieldLabel  : 'Truck No',
        id          : 'txttruckno',
        name        : 'txttruckno',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtweigbrdgewt = new Ext.form.NumberField({
        fieldLabel  : 'Weight Briedge Wt (Kgs)',
        id          : 'txtweigbrdgewt',
        name        : 'txtweigbrdgewt',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtweightcardno = new Ext.form.NumberField({
        fieldLabel  : 'Weightment Card No',
        id          : 'txtweightcardno',
        name        : 'txtweightcardno',
        width       : 170,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});






   
var tabReeldeliverynote = new Ext.TabPanel({
    id          : 'Consumption',
    xtype       : 'tabpanel',
    bodyStyle   : {"background-color":"#eaeded"},
    activeTab   : 0,
    height      : 400,
    width       : 1020,
    x           : 10,
    y           : 40,
    items       : [
        {
            xtype: 'panel',
            title: 'Party and Quality Details ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
            	{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 430,
			x           : 0,
			y           : 10,
			border      : false,
			items	    : [cmbvar]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 160,
			x           : 270,
			y           : 50,
			border      : false,
			items       : [txtgsm]
		},optreelsfrom,			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 230,
			x           : 530,
			y           : 0,
			border      : false,
			items       : [txtsize]
		},flxsize,			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 250,
			x           : 770,
			y           : 0,
			border      : false,
			items       : [txtreelno]
		},flxreelnodetails,flxvarietydetails,			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 185,
			x           : 835,
			y           : 160,
			border      : false,
			items       : [txtnoofreels]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 95,
			width       : 185,
			x           : 835,
			y           : 200,
			border      : false,
			items       : [txttotwtkgs]
		},
		{
		xtype  	: 'fieldset',
		title		: 'Size Details',
		layout 	: 'hbox',
		border		: true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
		height		: 100,
		width		: 1000,
		layout 	: 'absolute',
		x		: 5,
		y		: 265,
		items:[
			flxsizedetails,
	             ]
             },
	              
		]
        },
        {
            xtype: 'panel',
            title: 'Other Details ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 0,
			border      : false,
			items       : [txtpackwrap]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 50,
			border      : false,
			items       : [txthdpe]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 100,
			border      : false,
			items       : [txtgumtape]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 150,
			border      : false,
			items       : [txtmarker]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 200,
			border      : false,
			items       : [txtshuttle]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 150,
			y           : 250,
			border      : false,
			items       : [txtlabel]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 500,
			y           : 0,
			border      : false,
			items       : [txttruckno]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 500,
			y           : 50,
			border      : false,
			items       : [txtweigbrdgewt]
		},			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 300,
			x           : 500,
			y           : 110,
			border      : false,
			items       : [txtweightcardno]
		},

            ]
        },
   ]
});   


var txtbundlerecd = new Ext.form.NumberField({
        fieldLabel  : 'Bundle Recd',
        id          : 'txtbundlerecd',
        name        : 'txtbundlerecd',
        width       : 95,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});    
   
var dgrecord = Ext.data.Record.create([]);
var flxaddilsizedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 90,
        width: 830,
        x: 10,
        y: 450,        
        columns: [   
            {header: "Variety", dataIndex: 'variety',sortable:true,width:130,align:'left'},
            {header: "Var Code", dataIndex: 'varcode',sortable:true,width:60,align:'left'},  
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:60,align:'left'},
            {header: "Lot", dataIndex: 'lot',sortable:true,width:60,align:'left'},
            {header: "Size(CM)", dataIndex: 'size',sortable:true,width:150,align:'left'},
            {header: "Nos", dataIndex: 'nos',sortable:true,width:60,align:'left'},             
            {header: "Weight(Kgs)", dataIndex: 'wt',sortable:true,width:80,align:'left'},
            {header: "Cut Width", dataIndex: 'cut_width',sortable:true,width:100,align:'left'}, 
            {header: "Cut Length", dataIndex: 'cut_length',sortable:true,width:100,align:'left'}, 
            {header: "Sheet/Ream", dataIndex: 'sheet_ream',sortable:true,width:100,align:'left'}, 
            {header: "Ream wt", dataIndex: 'ream_wt',sortable:true,width:80,align:'left'}, 
            {header: "Reams/Bund", dataIndex: 'reams_bund',sortable:true,width:80,align:'left'}, 
            {header: "Rate/MT", dataIndex: 'rate_mt',sortable:true,width:80,align:'left'},
            {header: "DCWT", dataIndex: 'dc_wt',sortable:true,width:80,align:'left'},
             
        ],
store:[''], //loadsalledgerlistdatastore,
   });   
      
var TrnReelDeliveryEntryFormPanel = new Ext.form.FormPanel({
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
        id          : 'TrnReelDeliveryEntryFormPanel',
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
                            TrnReelDeliveryEntryWindow.RefreshData();
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
                            TrnReelDeliveryEntryWindow.hide();
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
			width       : 120,
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
			x           : 200,
			y           : 0,
			border      : false,
			items: [dtdate]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 370,
			x           : 350,
			y           : 0,
			border      : false,
			items	    : [cmbparty]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 280,
			x           : 720,
			y           : 0,
			border      : false,
			items	    : [cmbmcselect]
		},tabReeldeliverynote,			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 70,
			width       : 195,
			x           : 835,
			y           : 470,
			border      : false,
			items       : [txtbundlerecd]
		},flxaddilsizedetails,

	]
});

     var TrnReelDeliveryEntryWindow = new Ext.Window({
        height      : 615,
        width       : 1050,
        y           : 35,
        title       : 'SHEET CONVERSION - REELS- DELIVERY ENTRY',
        layout      : 'fit',
        items       : TrnReelDeliveryEntryFormPanel,
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
       TrnReelDeliveryEntryWindow.show();
});

