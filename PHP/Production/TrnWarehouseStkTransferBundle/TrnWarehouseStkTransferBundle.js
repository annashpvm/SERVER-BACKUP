Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;


var dtproddate = new Ext.form.DateField({
    fieldLabel : 'P.DATE	',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});
   
var fromconv = "1";
var optfromconv = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Conversion',
    fieldLabel: '',
    layout : 'hbox',
    width:170,
    height:80,
    x:760,
    y:0,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optfromconv',
        items: [
            {boxLabel: 'From Sheet Conversion', name: 'optfromconv', id:'optfromconvsheet', inputValue: '1',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		fromconv = "1";
            
               }
              }
             }
            },
            {boxLabel: 'From A4 Conversion', name: 'optfromconv', id:'optfromconva4', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		fromconv = "2";
            
               }
              }
             }
            },
        ]
    }
    ]
});   

var txtentryno = new Ext.form.NumberField({
        fieldLabel  : 'Entry No',
        id          : 'txtentryno',
        name        : 'txtentryno',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxstktransdetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 700,
        x: 10,
        y: 30,        
        columns: [   
            {header: "Variety", dataIndex: 'variety',sortable:true,width:120,align:'left'},
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:50,align:'left'},
            {header: "Size Code", dataIndex: 'size_code',sortable:true,width:50,align:'left'},
            {header: "Size", dataIndex: 'size',sortable:true,width:80,align:'left'},
            {header: "Bundle No", dataIndex: 'bundle_no',sortable:true,width:80,align:'left'},
            {header: "Weight", dataIndex: 'wt',sortable:true,width:50,align:'left'},
            {header: "I.Code", dataIndex: 'icode',sortable:true,width:50,align:'left'},
            {header: "Unit", dataIndex: 'unit',sortable:true,width:50,align:'left'},
            {header: "Des.Tag", dataIndex: 'des_tag',sortable:true,width:50,align:'left'},
            {header: "Trariff No", dataIndex: 'tariff_no',sortable:true,width:80,align:'left'},
            {header: "VARIETY", dataIndex: 'varty',sortable:true,width:100,align:'left'},
            {header: "R No", dataIndex: 'r_no',sortable:true,width:120,align:'left'},
            {header: "Godown", dataIndex: 'godown',sortable:true,width:100,align:'left'},
            {header: "finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'},
            {header: "Refno", dataIndex: 'ref_no',sortable:true,width:120,align:'left'},                                                
        ],
store:[''], //loadsalledgerlistdatastore,
   });


var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});


var lblsizedetails = new Ext.form.Label({
	fieldLabel  : 'Size Details',
	id          : 'lblsizedetails',
	name        : 'lblsizedetails',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:18px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxsizedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 700,
        x: 10,
        y: 295,        
        columns: [   
            {header: "Variety", dataIndex: 'variety',sortable:true,width:120,align:'left'},
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:50,align:'left'},
            {header: "Size", dataIndex: 'size',sortable:true,width:80,align:'left'},
            {header: "Nos", dataIndex: 'nos',sortable:true,width:50,align:'left'},
            {header: "Weight", dataIndex: 'wt',sortable:true,width:100,align:'left'},
            {header: "Size Code", dataIndex: 'size_code',sortable:true,width:80,align:'left'},            
            {header: "R No", dataIndex: 'r_no',sortable:true,width:120,align:'left'},   
            {header: "RG1CODE", dataIndex: 'rg1_code',sortable:true,width:80,align:'left'},
           ],
store:[''], //loadsalledgerlistdatastore,
   });
   
var TrnWarehouseStkTransferBundleFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WARE HOUSE STOCK TRANSFER - BUNDLE',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnWarehouseStkTransferBundleFormPanel',
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
                            TrnWarehouseStkTransferBundleWindow.RefreshData();
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
                            TrnWarehouseStkTransferBundleWindow.hide();
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
                width	:750,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 180,
				x           : 450,
				y           : -10,
				border      : false,
				items	    : [dtproddate]
			},			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 180,
				x           : 50,
				y           : -10,
				border      : false,
				items       : [txtentryno]
			},flxstktransdetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 200,
				x           : 200,
				y           : 230,
				border      : false,
				items       : [txttotwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 130,
				x           : 10,
				y           : 250,
				border      : false,
				items	    : [lblsizedetails]
			},flxsizedetails,			             
                	]
		  },optfromconv,
			
		]
               });

     var TrnWarehouseStkTransferBundleWindow = new Ext.Window({
        height      : 550,
        width       : 950,
        y           : 40,
        layout      : 'fit',
        items       : TrnWarehouseStkTransferBundleFormPanel,
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
       TrnWarehouseStkTransferBundleWindow.show();
});
