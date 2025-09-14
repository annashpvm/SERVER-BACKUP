Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var qlycode = 0;



    var LoadTNSalesLedger = new Ext.data.Store({
        id: 'LoadTNSalesLedger',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasProdType.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadTNLedgers"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


    var LoadOSSalesLedger = new Ext.data.Store({
        id: 'LoadOSSalesLedger',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasProdType.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadOSLedgers"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });



    var LoadSEZSalesLedger = new Ext.data.Store({
        id: 'LoadSEZSalesLedger',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasProdType.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSEZLedgers"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


    var cmbTNSalesLedger = new Ext.form.ComboBox({
        fieldLabel: 'TN-Sales Ledger',
        width: 300,
        store: LoadTNSalesLedger,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbTNSalesLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
          specialkey:function(f,e){
          },
            select: function () {
                }
        }
    });

    var cmbOSSalesLedger = new Ext.form.ComboBox({
        fieldLabel: 'OS-Sales Ledger',
        width: 300,
        store: LoadOSSalesLedger,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbOSSalesLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
          specialkey:function(f,e){
          },
            select: function () {
                }
        }
    });

    var cmbSEZSalesLedger = new Ext.form.ComboBox({
        fieldLabel: 'SEZ-Sales Ledger',
        width: 300,
        store: LoadSEZSalesLedger,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbSEZSalesLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
          specialkey:function(f,e){
          },
            select: function () {
                }
        }
    });


var txtQuality = new Ext.form.TextField({
        fieldLabel  : 'Product Type',
        id          : 'txtQuality',
        name        : 'txtQuality',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : GetProdGroupDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {
                if (saveflag == "Add")
                {
                  txtCode.setValue('');
		  txtHsn.setValue('');
                  flxQly.getStore().filter('vargrp_type_name', txtQuality.getValue());  
                }  
            }
        }

  });

var txtCode = new Ext.form.TextField({
        fieldLabel  : 'Prod.Code',
        id          : 'txtCode',
        name        : 'txtCode',
        width       :  70,
        style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
     //   style       : 'background-color: #00FF00;border-radius:5px;',
        autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'4'},

	//	disabled : true,
		tabindex : 2
  });


var txtHsn = new Ext.form.TextField({
        fieldLabel  : 'HSN Code',
        id          : 'txtHsn',
        name        : 'txtHsn',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });


var GetProdGroupDatastore = new Ext.data.Store({
      id: 'GetProdGroupDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasProdType.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadProdGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'vargrp_type_code','vargrp_type_name','vargrp_type_short_code', 'vargrp_type_hsncode','tn_sales_ledcode','os_sales_ledcode','sez_sales_ledcode','tnledname','osledname','sezledname'
      ]),
    });	

   function RefreshData(){
        txtQuality.setRawValue("");	
        saveflag = "Add";
	GetProdGroupDatastore.load({
        	 url: 'ClsMasProdType.php', 
              	 params:
        	 {
                	 task:"loadProdGroup"
               	 }
	});	
};

   var dgrecord = Ext.data.Record.create([]);
   var flxQly = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 270,
        width: 1150,
        x: 20,
        y: 240,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "Prod code"    , Id: 'vargrp_type_code', sortable:true,width:10,align:'left', menuDisabled: true},       
            {header: "Product Name", Id: 'vargrp_type_name', sortable:true,width:280,align:'left', menuDisabled: true},
            {header: "Code"        , Id: 'vargrp_type_short_code', sortable:true,width:70,align:'left', menuDisabled: true}, 
            {header: "HsnCode"     , Id: 'vargrp_type_hsncode', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "TN LEDCODE"     , Id: 'tn_sales_ledcode', sortable:true,width:50,align:'left', menuDisabled: true},                  
            {header: "OS LEDCODE"     , Id: 'os_sales_ledcode', sortable:true,width:50,align:'left', menuDisabled: true},    
            {header: "SEZ LEDCODE"     , Id: 'sez_sales_ledcode', sortable:true,width:50,align:'left', menuDisabled: true},    

            {header: "TN LEDGER"     , Id: 'tnledname', sortable:true,width:270,align:'left', menuDisabled: true},                  
            {header: "OS LEDGER"     , Id: 'osledname', sortable:true,width:270,align:'left', menuDisabled: true},                  
            {header: "SEZ LEDGER"     , Id: 'sezledname', sortable:true,width:270,align:'left', menuDisabled: true},                  
                   
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('vargrp_type_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtQuality.getValue()) {
    return 'vargrp_type_name'
    }
}
},
store:GetProdGroupDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxQly.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			qlycode = selrow.get('vargrp_type_code');
			txtQuality.setValue(selrow.get('vargrp_type_name'));
			txtCode.setValue(selrow.get('vargrp_type_short_code'));
			txtHsn.setValue(selrow.get('vargrp_type_hsncode'));
                        cmbTNSalesLedger.setValue(selrow.get('tn_sales_ledcode'));
                        cmbOSSalesLedger.setValue(selrow.get('os_sales_ledcode'));
                        cmbSEZSalesLedger.setValue(selrow.get('sez_sales_ledcode'));
			flxQly.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });

   var MasProdMainPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'QUALITY NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasProdMainPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
//SAVE
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
                        //alert(txtQuality.getRawValue());
				if( txtQuality.getRawValue() == '' ) 
				{

					alert("Enter Quality Name");
					txtQuality.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmMasProdTypeSave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     qlycode  : qlycode,
						     quality  : txtQuality.getRawValue(),
						     qcode    : txtCode.getRawValue(),
						     qhsn     : txtHsn.getRawValue(),
                                                     tnledcode :  cmbTNSalesLedger.getValue(),
                                                     osledcode :  cmbOSSalesLedger.getValue(),
                                                     sezledcode :  cmbSEZSalesLedger.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                //    msg: 'Lot No Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasAgentformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasProdMainPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
                                              /*  Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Failed Contact MIS',
                                                    fn: function (btn) 
							{
                                                        if (btn === 'ok') 
							{*/
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     /*   }
                                                    	}
                                                	});*/
                                            	}
                                      
					 	}   
			        		});
			    	
		         		}
                                }
 		    	});
				}
                        }
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasProdWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'PRODUCT TYPE',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 550,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 210,
                y       : 10,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 450,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtQuality]
                          },
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 220,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                  
                                	items: [txtCode]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 300,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtHsn]
                            },

                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 500,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [cmbTNSalesLedger]
                            },

                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 500,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbOSSalesLedger]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 500,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [cmbSEZSalesLedger]
                            },

                ]

            },flxQly
            
        ],
    });
    
   
    var MasProdWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
        y           : 35,
        title       : 'PRODUCT TYPE MASTER',
        items       : MasProdMainPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){
			txtQuality.focus();
	   	        txtQuality.setHeight(25);		 }
			
		}
    });
    MasProdWindow.show();  
});
