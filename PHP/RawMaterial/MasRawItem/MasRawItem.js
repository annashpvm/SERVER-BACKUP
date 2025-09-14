Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
var saveFlag;

var itemcode = 0;

 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRawItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_outthrough',  'itmh_prohiper', 'itmh_hsncode', 
'itmh_specification', 'itmh_type', 'itmh_group',

      ]),
    });



 var loadpurchaseledgerdatastore = new Ext.data.Store({
      id: 'loadpurchaseledgerdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRawItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpurledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });
	
var loaditemgrpDataStore = new Ext.data.Store({
      id: 'loaditemgrpDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRawItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemgrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmg_code', type: 'int',mapping:'itmg_code'},
	{name:'itmg_name', type: 'string',mapping:'itmg_name'}
      ]),
    });
	
	var txtitemname = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtitemname',
        name        : 'txtitemname',
        width       :  250,
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       // style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2,
        store       : LoadItemDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  flxDetail.getStore().filter('itmh_name', txtitemname.getValue());  
            }
        }
    });




var cmbitemgroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 250,
        displayField    : 'itmg_name', 
        valueField      : 'itmg_code',
        hiddenName      : '',
        id              : 'cmbitemgroup',
        typeAhead       : true,
        mode            : 'remote',
        store           : loaditemgrpDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,

   });

var cmbpurledger = new Ext.form.ComboBox({
        fieldLabel      : 'Purchase Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbpurledger',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadpurchaseledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbitemtype = new Ext.form.ComboBox({
        fieldLabel      : 'Item Type',
        width           : 250,
        displayField    : 'pono', 
        valueField      : 'poseqno',
        hiddenName      : '',
        id              : 'cmbitemtype',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : [['1','INDIGENOUS'],['2','IMPORT']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

 var txtmoisture = new Ext.form.NumberField({
        fieldLabel  : 'Moisture(%)',
        id          : 'txtmoisture',
        name        : 'txtmoisture',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    });

 var txttare = new Ext.form.NumberField({
        fieldLabel  : 'Tare %',
        id          : 'txttare',
        name        : 'txttare',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 var txtconvloss = new Ext.form.NumberField({
        fieldLabel  : 'Loss %',
        id          : 'txtconvloss',
        name        : 'txtconvloss',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var txtspec = new Ext.form.TextArea({
        fieldLabel  : 'Specification',
        id          : 'txtspec',
        name        : 'txtspec',
        width       :  400,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var txtoutthrow = new Ext.form.NumberField({
        fieldLabel  : 'Out Throw',
        id          : 'txtoutthrow',
        name        : 'txtoutthrow',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var txtprohibitive = new Ext.form.NumberField({
        fieldLabel  : 'Prohibitive %',
        id          : 'txtprohibitive',
        name        : 'txtprohibitive',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 var txthsncode = new Ext.form.NumberField({
        fieldLabel  : 'HSN Code',
        id          : 'txthsncode',
        name        : 'txthsncode',
        width       :  150,
        value       : '4707',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });




var dgrecord = Ext.data.Record.create([]);

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 410,
    hidden:false,
    width: 490,
//    font-size:18px,
    columns:
    [
            {header: "code"        , Id: 'itmh_code', sortable:true,width:10,align:'left', menuDisabled: true ,hidden : true },       
            {header: "Item Name"   , Id: 'itmh_name', sortable:true,width:250,align:'left', menuDisabled: true},
            {header: "Mois % "     , Id: 'itmh_moisture_per', sortable:true,width:60,align:'left', menuDisabled: true}, 
            {header: "Tare % "     , Id: 'itmh_tare_per', sortable:true,width:60,align:'left', menuDisabled: true ,hidden : true},                  
            {header: "Loss % "     , Id: 'itmh_convlossper', sortable:true,width:60,align:'left', menuDisabled: true ,hidden : true},    
            {header: "Out Throw"   , Id: 'itmh_outthrough', sortable:true,width:60,align:'left', menuDisabled: true ,hidden : true},                  
            {header: "Prohibitive" , Id: 'itmh_prohiper', sortable:true,width:60,align:'left', menuDisabled: true ,hidden : true},
            {header: "HSN"         , Id: 'itmh_hsncode', sortable:true,width:60,align:'left', menuDisabled: true},
            {header: "Specification", Id: 'itmh_specification', sortable:true,width:200,align:'left', menuDisabled: true},  
            {header: "Type"         , Id: 'itmh_type', sortable:true,width:200,align:'left', menuDisabled: true},  

    ],
	viewConfig: {
	getRowClass: function(record) {
	    var red = record.get('itmh_name') // shows if a CPE is dead or not (HS = Dead)
	    if (red == txtitemname.getValue()) {
	    return 'itmh_name'
	    }
         }
	},
    store: LoadItemDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();

         		gridedit = "true";
			editrow = selrow;
	

                        saveFlag = "Edit";
	                itemcode = selrow.get('itmh_code')
			txtitemname.setValue(selrow.get('itmh_name'));
			txtmoisture.setValue(selrow.get('itmh_moisture_per'));
			txttare.setValue(selrow.get('itmh_tare_per'));  
             		txtconvloss.setValue(selrow.get('itmh_convlossper'));
              		txtoutthrow.setValue(selrow.get('itmh_outthrough'));
			txtprohibitive.setValue(selrow.get('itmh_prohiper'));
			txthsncode.setValue(selrow.get('itmh_hsncode'));
			txtspec.setValue(selrow.get('itmh_specification'));
                        cmbitemtype.setValue(selrow.get('itmh_type'));

  
         
    }

   }
});

function RefreshData(){
	saveFlag = "Add";

        txthsncode.setValue('4707');
	itemcode = 0;
	txtprohibitive.setValue("0");
	txtoutthrow.setValue("");
	txtspec.setValue("");
	txtconvloss.setValue("0");
	txttare.setValue("0");
	txtmoisture.setValue("");
	txtitemname.setValue("");

	cmbitemtype.setValue("");
	cmbpurledger.setValue("");
	cmbitemgroup.setValue("");
	LoadItemDatastore.removeAll();
	LoadItemDatastore.load({
        	 url:'ClsRawItem.php',
        	 params:
       		 {
         	 task:"loadItemList"
        	 }
		 });


};

   var MasRawItemformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'RAWMATERIAL ITEM MASTER',
        header      : false,
        width       : 1400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasRawItemformpanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
	
				if(txtitemname.getRawValue()=="" || txtitemname.getValue()==0)
				{
					alert("Enter ItemName");
					txtitemname.focus();
				}
				else if(txtmoisture.getValue()=="" || txtmoisture.getValue()==0)
				{
					alert("Enter Moisture%");
					txtmoisture.focus();
				}
	
//				else if(txtspec.getRawValue()=="" || txtspec.getValue()==0)
//				{
					//alert("Enter Specification");
//					txtspec.focus();
//				}
				else if(cmbitemtype.getRawValue()=="" || cmbitemtype.getValue()==0)
				{
					alert("Select Itemtype..");
					cmbitemtype.focus();
				}
/*
				else if(cmbpurledger.getRawValue()=="" || cmbpurledger.getValue()==0)
				{
					alert("Select Purchase Ledger..");
					cmbpurledger.focus();
				}
				else if(cmbitemgroup.getRawValue()=="" || cmbitemgroup.getValue()==0)
				{
					alert("Select Item Group..");
					cmbitemgroup.focus();
				}

				else if(txtoutthrow.getRawValue()=="" )
				{
					alert("Enter OutThrough%");
					txtoutthrow.focus();
				}
				else if(txtprohibitive.getRawValue()=="")
				{
					alert("Enter Prohibitive%");
					txtprohibitive.focus();
				}
*/
				else if(txthsncode.getValue()=="")
				{
					alert("Enter HSNCode");
					txthsncode.focus();
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
		                            	url: 'MasRawItemSave.php',
                		       	        params:
						{
                                                savetype : saveFlag,
                                                icode    : itemcode,
						itemname : txtitemname.getRawValue(),
						moisture : txtmoisture.getValue(),
						tare	: txttare.getValue(),
						convloss : txtconvloss.getValue(),
						spec : txtspec.getRawValue(),
						itemtype : cmbitemtype.getValue(),
						purledcode : 0, // cmbpurledger.getValue(),
						grpcode :    1, //    cmbitemgroup.getValue(),
						outthrough : txtoutthrow.getValue(),
						prohibitive : txtprohibitive.getValue(),
						hsncode : txthsncode.getValue()
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                              //      msg: 'Item Name Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{*/
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasRawItemformpanel.getForm().reset();
							RefreshData();
							/*}
							}
                                                	});*/
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
                                                       /* }
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
                            MasRawItemWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'RAWMATERIAL ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 580,
		style:{ border:'1px solid red',color:' #0000ff '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtitemname]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbitemtype]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 550,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtspec]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtmoisture]
                            },
/*
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 600,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txttare]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 600,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [txtconvloss]
                            },



			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 600,
                                	x           : 0,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtoutthrow]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 320,
                                    	border      : false,
                                	items: [txtprohibitive]
                            }, 
*/
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txthsncode]
                            }, 



/*
				            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 900,
                                        height      : 900,
                                	x           : 550,
                                	y           : 10,
                                    	border      : false,
                                	items: [flxItem]
                            },
*/

                ]

            } ,

            { xtype   : 'fieldset',
                title   : ' ',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
               layout  : 'absolute',
                x       : 600,
                y       : 10,
                items:[flxDetail]
            }   
           
        ], 
    });
    
   
    var MasRawItemWindow = new Ext.Window({
	height      : 550,
        width       : 1180,
        y           : 35,
        title       : 'RAWMATERIAL ITEM MASTER',
        items       : MasRawItemformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

                        RefreshData();
			txtitemname.focus();
			loadpurchaseledgerdatastore.removeAll();
			loadpurchaseledgerdatastore.load({
                        	 url:'ClsRawItem.php',
                        	 params:
                       		 {
                         	 task:"loadpurledger"
                        	 }
				 });

			loaditemgrpDataStore.removeAll();
			loaditemgrpDataStore.load({
                        	 url:'ClsRawItem.php',
                        	 params:
                       		 {
                         	 task:"loaditemgrp"
                        	 }
				 });
			
	   		
			 }
		}
    });
    MasRawItemWindow.show();  
});
