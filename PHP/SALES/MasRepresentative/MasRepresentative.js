Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var Repcode = 0;

var loadRepDatastore = new Ext.data.Store({
      id: 'loadRepDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasRepresentative.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadRepresentative"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'repr_code', 'repr_name','repr_mobile', 'repr_addr1', 'repr_addr2', 'repr_addr3', 'repr_pincode','repr_accgrp','grp_name','repr_active' ]),
    });	


var loadRepGroupDatastore = new Ext.data.Store({
      id: 'loadRepGroupDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasRepresentative.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadRepGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grp_code', 'grp_name']),
    });	
var txtRepName = new Ext.form.TextField({
        fieldLabel  : 'Rep Name',
        id          : 'txtRepName',
        name        : 'txtRepName',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : loadRepDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  txtAdd1.setValue('');
		  txtAdd2.setValue('');
                  txtAdd3.setValue('');
                  txtPin.setValue('');
                  flxRep.getStore().filter('repr_name', txtRepName.getValue());  
            }
        }

  });

var cmbActive = new Ext.form.ComboBox({
        fieldLabel      : 'Active (Y/N)',
        width       :  70,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbActive',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
});  


var txtAdd1 = new Ext.form.TextField({
        fieldLabel  : 'Address',
        id          : 'txtAdd1',
        name        : 'txtAdd1',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
     //   style       : 'background-color: #00FF00;border-radius:5px;',
    //    autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'2'},
   //	  disabled : true,
		tabindex : 2
  });


var txtAdd2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdd2',
        name        : 'txtAdd2',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var txtAdd3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdd3',
        name        : 'txtAdd3',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin Code',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var txtMobile = new Ext.form.TextField({
        fieldLabel  : 'Mobile No',
        id          : 'txtMobile',
        name        : 'txtMobile',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });



var cmbRepGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Acc Group',
        width           : 250,
        displayField    : 'grp_name', 
        valueField      : 'grp_code',
        hiddenName      : '',
        id              : 'cmbRepGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRepGroupDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function () {
           }
        }    
   });



   function RefreshData(){
        txtRepName.setRawValue("");	
        cmbActive.setValue('Y');
	loadRepDatastore.load({
        	 url: 'ClsMasRepresentative.php', 
              	 params:
        	 {
                	 task:"loadRepresentative"
               	 }
	});	
};

var dgrecord = Ext.data.Record.create([]);
var flxRep = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 1100,
        x: 40,
        y: 250,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "code"       , Id: 'repr_code', sortable:true,width:50,align:'left', menuDisabled: true},       
            {header: "REP   Name" , Id: 'repr_name', sortable:true,width:300,align:'left', menuDisabled: true},
            {header: "Mobile "    , Id: 'repr_mobile', sortable:true,width:110,align:'left', menuDisabled: true},
            {header: "Address1 "  , Id: 'repr_addr1', sortable:true,width:200,align:'left', menuDisabled: true}, 
            {header: "Address2"   , Id: 'repr_addr2', sortable:true,width:200,align:'left', menuDisabled: true},                  
            {header: "Address3"   , Id: 'repr_addr3', sortable:true,width:200,align:'left', menuDisabled: true},    
            {header: "Pin"        , Id: 'repr_pin', sortable:true,width:100,align:'left', menuDisabled: true},            
            {header: "Group"      , Id: 'repr_accgrp', sortable:true,width:100,align:'left', menuDisabled: true},            
            {header: "GroupName"  , Id: 'grp_name', sortable:true,width:180,align:'left', menuDisabled: true},            
            {header: "Active"     , Id: 'repr_active', sortable:true,width:180,align:'left', menuDisabled: true},   
                    
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('repr_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtRepName.getValue()) {
    return 'repr_name'
    }
}
},
store:loadRepDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxRep.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;
	

                        saveflag = "Edit";
			Repcode = selrow.get('repr_code');
			txtRepName.setValue(selrow.get('repr_name'));
			txtAdd1.setValue(selrow.get('repr_addr1'));
			txtAdd2.setValue(selrow.get('repr_addr2'));  
             		txtAdd3.setValue(selrow.get('repr_addr3'));
              		txtPin.setValue(selrow.get('repr_pin'));
               		cmbRepGroup.setValue(selrow.get('repr_accgrp'));
      		        txtMobile.setValue(selrow.get('repr_mobile'));
         		cmbActive.setValue(selrow.get('repr_active'));
			flxRep.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });

   var MasRepPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : ' NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasRepPanel',
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
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
//alert(txtRepName.getRawValue());
				if( txtRepName.getRawValue() == '' ) 
				{

					alert("Enter Dealer Name");
					txtRepName.setFocus();
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
//SAVE
						Ext.Ajax.request({
		                            	url: 'FrmRepresentativeSave.php',
                		       	        params:
						{
						     savetype    : saveflag,
						     reprcode  : Repcode,
						     reprname  : txtRepName.getRawValue(),
						     repradd1  : txtAdd1.getRawValue(),
						     repradd2  : txtAdd2.getRawValue(),
						     reprradd3 : txtAdd3.getRawValue(),
						     reprpin   : txtPin.getRawValue(),
						     reprmobile : txtMobile.getRawValue(),
						     reprgroup  : cmbRepGroup.getValue(),
						     repractive : cmbActive.getValue(),



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
						    MasRepPanel.getForm().reset();
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
                            MasRepWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 260,
                width   : 600,
  
              //style   : { border:'1px solid blue'},
                style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 10,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtRepName]
                          },
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                  
                                	items: [txtAdd1]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtAdd2]
                            },

                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtAdd3]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtPin]
                            },

                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMobile]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 180,
                                    	border      : false,
                                	items: [cmbRepGroup]
                            },

                        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 95,
                                	width       : 550,
                                	x           : 390,
                                	y           : 180,
                                    	border      : false,
                                	items: [cmbActive]
                            },


                ]

            },flxRep
            
        ],
    });
    
   
    var MasRepWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
        y           : 35,
        title       : 'REP MASTER',
        items       : MasRepPanel,
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
			txtRepName.focus();
	   	        txtRepName.setHeight(25);
                        RefreshData();
 		 }
			
		}
    });
    MasRepWindow.show();  
});
