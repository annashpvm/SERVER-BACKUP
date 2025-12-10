Ext.onReady(function() {
Ext.QuickTips.init();


var txtrecptno = new Ext.form.NumberField({
	fieldLabel  : 'Receipt No',
	id          : 'txtrecptno',
	name        : 'txtrecptno',
	width       : 70,
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

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 130,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbsupervisor',
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
   
var cmboperator = new Ext.form.ComboBox({
        fieldLabel      : 'Operator',
        width           : 190,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmboperator',
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

var cmbcutmc = new Ext.form.ComboBox({
        fieldLabel      : 'Cutting M/C',
        width           : 500,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbcutmc',
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


var cmbdcno = new Ext.form.ComboBox({
        fieldLabel      : 'DC No',
        width           : 80,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbdcno',
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
   
var dtdcdate = new Ext.form.DateField({
    fieldLabel : 'DC Date',
    id         : 'dtdcdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 80,
});   

var cmbmano = new Ext.form.ComboBox({
        fieldLabel      : 'MA NO',
        width           : 80,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmano',
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

var cmbordno = new Ext.form.ComboBox({
        fieldLabel      : 'Order.no',
        width           : 80,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbordno',
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

var txtlotno = new Ext.form.NumberField({
	fieldLabel  : 'Lot.no',
	id          : 'txtlotno',
	name        : 'txtlotno',
	width       : 80,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var cmbpalrefno = new Ext.form.ComboBox({
        fieldLabel      : 'Pallet Ref.no',
        width           : 350,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbpalrefno',
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
   
var txtvarqty = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtvarqty',
	name        : 'txtvarqty',
	width       : 65,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var cmborgsize = new Ext.form.ComboBox({
        fieldLabel      : 'Orginal Size',
        width           : 120,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmborgsize',
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

var cmblot = new Ext.form.ComboBox({
        fieldLabel      : 'Lot',
        width           : 120,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmblot',
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

var txtdcqty = new Ext.form.NumberField({
	fieldLabel  : 'DC Qty',
	id          : 'txtdcqty',
	name        : 'txtdcqty',
	width       : 65,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtdcbalqty = new Ext.form.NumberField({
	fieldLabel  : 'DC Bal Qty',
	id          : 'txtdcbalqty',
	name        : 'txtdcbalqty',
	width       : 65,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

//var dcbalqty = 'N';
var chkdcbalqty = new Ext.form.Checkbox({
	name: '',
	boxLabel: '',
	id: 'chkdcbalqty',
	checked: false,
	width: 30,
	listeners: {
	    /*check: function (rb, checked) {
		if (checked === true) {
		    dcbalqty = 'Y';
		}else{
		    dcbalqty = 'N';
		}
	    }*/
	}
});

//var varchange = 'N';
var chkvarchange = new Ext.form.Checkbox({
	name: '',
	boxLabel: 'Variety Change',
	id: 'chkvarchange',
	checked: false,
	width: 120,
	listeners: {
	    /*check: function (rb, checked) {
		if (checked === true) {
		    varchange = 'Y';
		}else{
		    varchange = 'N';
		}
	    }*/
	}
});

var txtitem = new Ext.form.NumberField({
	fieldLabel  : 'Item',
	id          : 'txtitem',
	name        : 'txtitem',
	width       : 170,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxitem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 110,
        width: 170,
        x: 50,
        y: 35,        
        columns: [   
            {header: "", dataIndex: 'item',sortable:true,width:165,align:'left'}, //hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtgsm = new Ext.form.NumberField({
	fieldLabel  : 'GSM',
	id          : 'txtgsm',
	name        : 'txtgsm',
	width       : 70,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtsize = new Ext.form.NumberField({
	fieldLabel  : 'Size',
	id          : 'txtsize',
	name        : 'txtsize',
	width       : 135,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtsheets = new Ext.form.NumberField({
	fieldLabel  : 'Sheets',
	id          : 'txtsheets',
	name        : 'txtsheets',
	width       : 90,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtreamwt = new Ext.form.NumberField({
	fieldLabel  : 'Ream Wt',
	id          : 'txtreamwt',
	name        : 'txtreamwt',
	width       : 70,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtnoofream = new Ext.form.NumberField({
	fieldLabel  : 'No.of Ream',
	id          : 'txtnoofream',
	name        : 'txtnoofream',
	width       : 100,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttotwt = new Ext.form.NumberField({
	fieldLabel  : 'Tot.Wt',
	id          : 'txttotwt',
	name        : 'txttotwt',
	width       : 90,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtpallrefno = new Ext.form.NumberField({
	fieldLabel  : 'Pallet Ref.No',
	id          : 'txtpallrefno',
	name        : 'txtpallrefno',
	width       : 420,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtoldwt = new Ext.form.NumberField({
	fieldLabel  : 'Old.wt',
	id          : 'txtoldwt',
	name        : 'txtoldwt',
	width       : 80,
	enableKeyEvents: true,
	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});





var TrnBundleReceiptEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	//labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnBundleReceiptEntryFormPanel',
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
                            //TrnReamReceiptEntryWindow.RefreshData();
                            TrnBundleReceiptEntryWindow.RefreshFormPanel();
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
                            TrnBundleReceiptEntryWindow.hide();
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
		border		: true,
		//labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
		height		: 95,
		width		: 800,
		layout 	: 'absolute',
		x		: 5,
		y		: 10,
		items:[
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 160,
			x           : 0,
			y           : -5,
			border      : false,
			items       : [txtrecptno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 145,
			x           : 145,
			y           : -5,
			border      : false,
			items	    : [dtdate]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 65,
			width       : 225,
			x           : 285,
			y           : -5,
			border      : false,
			items	    : [cmbsupervisor]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 275,
			x           : 505,
			y           : -5,
			border      : false,
			items	    : [cmboperator]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 75,
			width       : 605,
			x           : 0,
			y           : 35,
			border      : false,
			items	    : [cmbcutmc]
		},

		
		],
	     },
	     	{
		xtype  	: 'fieldset',
		title		: 'DETAILS',
		layout 	: 'hbox',
		border		: true,
		//labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid skyblue;border-radius:5px;",                
		height		: 180,
		width		: 160,
		layout 	: 'absolute',
		x		: 810,
		y		: 5,
		items:[

		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 165,
			x           : -10,
			y           : -10,
			border      : false,
			items	    : [cmbdcno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 165,
			x           : -10,
			y           : 25,
			border      : false,
			items	    : [dtdcdate]
		},		
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 165,
			x           : -10,
			y           : 55,
			border      : false,
			items	    : [cmbmano]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 165,
			x           : -10,
			y           : 85,
			border      : false,
			items	    : [cmbordno]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 55,
			width       : 165,
			x           : -10,
			y           : 115,
			border      : false,
			items       : [txtlotno]
		},
		
		],
	     },
	     	{
		xtype  	: 'fieldset',
		title		: '',
		layout 	: 'hbox',
		border		: true,
		//labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid lightblue;border-radius:5px;",                
		height		: 280,
		width		: 800,
		layout 	: 'absolute',
		x		: 5,
		y		: 110,
		items:[
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 460,
			x           : 0,
			y           : -10,
			border      : true,
			items	    : [cmbpalrefno]
		},
		/*{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 5,
			width       : 100,
			x           : 680,
			y           : 0,
			border      : false,
			items       : [txtvarqty]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 75,
			width       : 225,
			x           : 0,
			y           : 40,
			border      : false,
			items	    : [cmborgsize]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 25,
			width       : 175,
			x           : 220,
			y           : 40,
			border      : false,
			items	    : [cmblot]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 135,
			x           : 400,
			y           : 40,
			border      : false,
			items       : [txtdcqty]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 155,
			x           : 530,
			y           : 40,
			border      : false,
			items       : [txtdcbalqty]
		},			
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 1,
			width       : 50,
			x           : 660,
			y           : 45,
			border      : false,
			items	    : [chkdcbalqty]
		},			
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 1,
			width       : 130,
			x           : -5,
			y           : 80,
			border      : false,
			items	    : [chkvarchange]
		},*/
		
		],
	     },
	     	{
		xtype  	: 'fieldset',
		title		: 'Bundles to be Transfer',
		layout 	: 'hbox',
		border		: true,
		//labelStyle 	: "font-size:12px;font-weight:bold;",
		style      	: "border:0.25px solid yellow;border-radius:5px;",                
		height		: 60,
		width		: 800,
		layout 	: 'absolute',
		x		: 5,
		y		: 470,
		items:[
		/*{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 35,
			width       : 240,
			x           : 0,
			y           : 0,
			border      : false,
			items       : [txtitem]
		},flxitem,
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 160,
			x           : 230,
			y           : 0,
			border      : false,
			items       : [txtgsm]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 25,
			width       : 190,
			x           : 400,
			y           : 0,
			border      : false,
			items       : [txtsize]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 160,
			x           : 590,
			y           : 0,
			border      : false,
			items       : [txtsheets]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 160,
			x           : 230,
			y           : 55,
			border      : false,
			items       : [txtreamwt]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 60,
			width       : 190,
			x           : 400,
			y           : 55,
			border      : false,
			items       : [txtnoofream]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 160,
			x           : 590,
			y           : 55,
			border      : false,
			items       : [txttotwt]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 70,
			width       : 520,
			x           : 230,
			y           : 105,
			border      : false,
			items       : [txtpallrefno]
		},*/
		
		],
	     },
		/*{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 40,
			width       : 150,
			x           : 830,
			y           : 310,
			border      : false,
			items       : [txtoldwt]
		},*/
	]
});

     var TrnBundleReceiptEntryWindow = new Ext.Window({
        height      : 610,
        width       : 1200,
        y           : 35,
        title       : 'BUNDLE RECEIPT ENTRY',
        layout      : 'fit',
        items       : TrnBundleReceiptEntryFormPanel,
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
       TrnBundleReceiptEntryWindow.show();
});

