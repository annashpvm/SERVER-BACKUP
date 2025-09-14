Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;

var txtfinyear = new Ext.form.ComboBox({
	fieldLabel      : 'Finyear',
	width           : 150,
	displayField    : 'fin_year',
	valueField      : 'fin_code',
	hiddenName      : 'fin_year',
	id              : 'txtfinyear',
	typeAhead       : true,
	mode            : 'local',
	forceSelection  : false,
	triggerAction   : 'all',
	selectOnFocus   : false,
	editable        : true,
	allowblank      : false,
   	labelStyle 	: "font-size:12px;font-weight:bold;",
    	style      	: "border-radius:5px;",
	store           : [''], //FinyearDataStore,
	listeners: {
	select: function () {
	finid=Ext.getCmp('txtfinyear').getValue();
	gstFinyear=Ext.getCmp('txtfinyear').getRawValue();
	finstdate=gstFinyear.substr(0,4) + '-04-01';
	fineddate=gstFinyear.substr(5,4) + '-03-31';
	}   
	}
});

var cmbgodown = new Ext.form.ComboBox({
        fieldLabel      : 'Godown Name',
        width           : 270,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbgodown',
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
   
var locationdisplay = "1";
var optlocationdisplay = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'LOCATION DETAILS DISPLAY',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:60,
    x:410,
    y:0,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optlocationdisplay',
        items: [
            {boxLabel: 'All', name: 'optlocationdisplay', id:'optlocationdisplayall', inputValue: '1',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		locationdisplay = "1";
            
               }
              }
             }
            },
            {boxLabel: 'Blank', name: 'optlocationdisplay', id:'optlocationdisplayblank', inputValue: '2',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		locationdisplay = "2";
            
               }
              }
             }},
        ]
    }
    ]
});   



var txtvarno = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvarno',
        name        : 'txtvarno',
        width       : 180,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});


var dgrecord = Ext.data.Record.create([]);
var flxVarno = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 80,
        width: 180,
        x: 650,
        y: 30,        
        columns: [   
            {header: "", dataIndex: 'varno',sortable:true,width:175,align:'left'}, //hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lblreelno = new Ext.form.Label({
	fieldLabel  : 'Reel No',
	id          : 'lblreelno',
	name        : 'lblreelno',
	width       :  90,
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
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxReelno = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 180,
        x: 15,
        y: 170,        
        columns: [   
            {header: "", dataIndex: 'reelno',sortable:true,width:175,align:'left'}, //hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lblbundleno = new Ext.form.Label({
	fieldLabel  : 'Bundle No',
	id          : 'lblbundleno',
	name        : 'lblbundleno',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var txtbundleno = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtbundleno',
        name        : 'txtbundleno',
        width       : 180,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxBundleno = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 180,
        x: 200,
        y: 170,        
        columns: [   
            {header: "", dataIndex: 'bundleno',sortable:true,width:175,align:'left'}, //hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });
   
   
var lblreels = new Ext.form.Label({
	fieldLabel  : 'Reels',
	id          : 'lblreels',
	name        : 'lblreels',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxReels = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 240,
        x: 400,
        y: 135,        
        columns: [   
            {header: "Reel.No", dataIndex: 'reelno',sortable:true,width:120,align:'left'},
            {header: "Godown", dataIndex: 'godown',sortable:true,width:50,align:'left'},
            {header: "Code", dataIndex: 'code',sortable:true,width:50,align:'left'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtnoofreels = new Ext.form.NumberField({
        fieldLabel  : 'No of Reels',
        id          : 'txtnoofreels',
        name        : 'txtnoofreels',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblbundles = new Ext.form.Label({
	fieldLabel  : 'Bundles',
	id          : 'lblbundles',
	name        : 'lblbundles',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxBundles = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 240,
        x: 650,
        y: 135,        
        columns: [   
            {header: "Bundle No", dataIndex: 'bundleno',sortable:true,width:120,align:'left'},
            {header: "Godown", dataIndex: 'godown',sortable:true,width:50,align:'left'},
            {header: "Code", dataIndex: 'code',sortable:true,width:50,align:'left'},            
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtnoofbundles = new Ext.form.NumberField({
        fieldLabel  : 'No of Bundles',
        id          : 'txtnoofbundles',
        name        : 'txtnoofbundles',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});


/*   var lstModulename = new Ext.ux.form.MultiSelect({
        fieldLabel: '',
        width: 250,
        height: 250,
        allowBlank:true,
        id:'lstModulename',
        name:'lstModulename',
        mode: 'local',
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        store: [''], //ModulesnameDataStore,
        displayField:'modname',
        valueField: 'modseqno',
        selectOnFocus:true,
 	style:{
             color: '#2d3838' 	     
        },
   });   */

var TrnWarehouseStkLocationEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WARE HOUSE STOCK LOCATION ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
        frame       : false,
        id          : 'TrnWarehouseStkLocationEntryFormPanel',
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
                            TrnWarehouseStkLocationEntryWindow.RefreshData();
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
                            TrnWarehouseStkLocationEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                
		{
		 xtype  : 'fieldset',
                title	: '',
                layout : 'hbox',
                border	:true,
		labelStyle : "font-size:12px;font-weight:bold;",
   		style      : "border-radius:5px;",                   
                height	:440,
                width	:920,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
			{
				xtype	    : 'fieldset',
				title	    : '',
				labelWidth  : 100,
				width	    : 280,
				x	    : 10,
				y	    : -10,
				border	    : false,
				items	    : [txtfinyear]
			},
			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 10,
				y           : 25,
				border      : false,
				items	    : [cmbgodown]
			},optlocationdisplay,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 220,
				x           : 630,
				y           : -5,
				border      : false,
				items       : [txtvarno]
			},flxVarno,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 70,
				x           : 20,
				y           : 100,
				border      : false,
				items	    : [lblreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 215,
				x           : -5,
				y           : 130,
				border      : false,
				items       : [txtreelno]
			},flxReelno,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 100,
				x           : 200,
				y           : 100,
				border      : false,
				items	    : [lblbundleno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 215,
				x           : 180,
				y           : 130,
				border      : false,
				items       : [txtbundleno]
			},flxBundleno,			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 60,
				x           : 420,
				y           : 100,
				border      : false,
				items	    : [lblreels]
			},flxReels,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 200,
				x           : 400,
				y           : 360,
				border      : false,
				items       : [txtnoofreels]
			},			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 80,
				x           : 660,
				y           : 100,
				border      : false,
				items	    : [lblbundles]
			},flxBundles,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 220,
				x           : 650,
				y           : 360,
				border      : false,
				items       : [txtnoofbundles]
			},
			/*
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 280,
                        height      : 250,
                        x           : 0,
                        y           : 23,
                        border      : false,
                        items: [lstModulename]
                    }*/
			             
                	]
		  },
			
		]
               });

     var TrnWarehouseStkLocationEntryWindow = new Ext.Window({
        height      : 550,
        width       : 950,
        y           : 40,
        layout      : 'fit',
        items       : TrnWarehouseStkLocationEntryFormPanel,
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
       TrnWarehouseStkLocationEntryWindow.show();
});
