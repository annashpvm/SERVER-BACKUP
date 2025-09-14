Ext.onReady(function() {
Ext.QuickTips.init();



var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelVarietyChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode'
      ]),
    });

var cmbOldVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Old Variety',
        width           : 250,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbOldVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyDatastore,
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

var cmbNewVariety = new Ext.form.ComboBox({
        fieldLabel      : 'New Variety',
        width           : 250,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbNewVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyDatastore,
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

var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txtBF = new Ext.form.NumberField({
        fieldLabel  : 'BF',
        id          : 'txtBF',
        name        : 'txtBF',
        width       : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});



var txtsize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtsize',
        name        : 'txtsize',
        width       : 140,
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
        height: 160,
        width: 140,
        x: 95,
        y: 100,        
        columns: [   
            {header: "", dataIndex: 'size',sortable:true,width:130,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });



var txtreelno = new Ext.form.NumberField({
        fieldLabel  : 'Reel No',
        id          : 'txtreelno',
        name        : 'txtreelno',
        width       : 200,
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
        height: 160,
        width: 200,
        x: 315,
        y: 100,        
        columns: [   
            {header: "", dataIndex: 'reelno',sortable:true,width:190,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var dgrecord = Ext.data.Record.create([]);
var flxvarchangedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 160,
        width: 510,
        x: 10,
        y: 280,        
        columns: [   
            {header: "Old Variety Name", dataIndex: 'old_varname',sortable:true,width:130,align:'left'},
            {header: "Old Variety Code", dataIndex: 'old_varcode',sortable:true,width:70,align:'left',hidden:'true'}, 
            {header: "Reel Number", dataIndex: 'reelno',sortable:true,width:150,align:'left'}, 
            {header: "Weight", dataIndex: 'wt',sortable:true,width:80,align:'left'}, 
            {header: "New Variety Name", dataIndex: 'new_varname',sortable:true,width:130,align:'left'}, 
            {header: "New Variety Code", dataIndex: 'new_varcode',sortable:true,width:70,align:'left',hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var txtnoofreels = new Ext.form.NumberField({
        fieldLabel  : 'No of Reels',
        id          : 'txtnoofreels',
        name        : 'txtnoofreels',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});

var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex   : 1,        
});
   
var TrnReelVarietyChangeFormPanel = new Ext.form.FormPanel({
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
        id          : 'TrnReelVarietyChangeFormPanel',
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
                            TrnReelVarietyChangeWindow.RefreshData();
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
                            TrnReelVarietyChangeWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 360,
			x           : 0,
			y           : 0,
			border      : false,
			items	    : [cmbOldVariety]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 360,
			x           : 0,
			y           : 30,
			border      : false,
			items	    : [cmbNewVariety]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 110,
			x           : 380,
			y           : 0,
			border      : false,
			items       : [txtBF]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 30,
			width       : 110,
			x           : 500,
			y           : 0,
			border      : false,
			items       : [txtGSM]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 250,
			x           : 0,
			y           : 60,
			border      : false,
			items       : [txtsize]
		},flxsizedetails,			
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 280,
			x           : 250,
			y           : 60,
			border      : false,
			items       : [txtreelno]
		},flxreelnodetails,flxvarchangedetails,			
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 70,
			width       : 170,
			x           : 100,
			y           : 450,
			border      : false,
			items       : [txtnoofreels]
		},			
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 70,
			width       : 170,
			x           : 300,
			y           : 450,
			border      : false,
			items       : [txttotwt]
		},
	]
});


function RefreshData()
{

}


     var TrnReelVarietyChangeWindow = new Ext.Window({
        height      : 580,
        width       : 650,
        y           : 40,
        title       : 'REEL VARIETY CHANGE',
        layout      : 'fit',
        items       : TrnReelVarietyChangeFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
	//bodyStyle:{"background-color":"#E9EEDD"},
onEsc:function(){
},
        listeners:
            {
                show:function(){
                      RefreshData();	   	
	   	}
       
            }
    });
       TrnReelVarietyChangeWindow.show();
});

