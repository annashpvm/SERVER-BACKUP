Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');


 var loadPurMainGrpListDatastore = new Ext.data.Store({
      id: 'loadPurMainGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPurGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'grp_code', 'grp_name', 'grp_tn_ledcode', 'grp_os_ledcode', 'grp_imp_ledcode', 'grp_tn_ledname', 'grp_os_ledname', 'grp_imp_ledname'
      ]),
    });


  var loadledgerdatastore = new Ext.data.Store({
      id: 'loadledgerdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledger"}, // this parameter asks for listing
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


	var txtGroupname = new Ext.form.TextField({
        fieldLabel  : 'Group Name',
        id          : 'txtGroupname',
        name        : 'txtGroupname',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });

var cmbTNPurledger = new Ext.form.ComboBox({
        fieldLabel      : 'Within State Ledger',
        width           : 400,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbTNPurledger',
        typeAhead       : true,
        mode            : 'local',
        store           : loadledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });



var cmbOSPurledger = new Ext.form.ComboBox({
        fieldLabel      : 'Other State Ledger',
        width           : 400,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbOSPurledger',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbImportPurledger = new Ext.form.ComboBox({
        fieldLabel      : 'Import Ledger',
        width           : 400,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbImportPurledger',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });


 
   function RefreshData(){

	txtGroupname.setValue("");
   };


   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 260,
        width: 1210,
        x: 20,
        y: 240,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   

		{header: "Grp Code", dataIndex: 'grp_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Grp Name", dataIndex: 'grp_name',sortable:true,width:330,align:'left'},
		{header: "TN Pur.Ledger", dataIndex: 'grp_tn_ledname',sortable:true,width:100,align:'center'},
		{header: "TN Pur.Ledcode", dataIndex: 'grp_tn_ledcode',sortable:true,width:255,align:'left'},
		{header: "OS Pur.Ledger", dataIndex: 'grp_os_ledname',sortable:true,width:100,align:'center'},  
		{header: "OS Pur.Ledcode", dataIndex: 'grp_os_ledcode',sortable:true,width:255,align:'l	eft'},
		{header: "Imp Pur.Ledger", dataIndex: 'grp_imp_ledname',sortable:true,width:100,align:'right'},
		{header: "TN Pur.Ledcode", dataIndex: 'grp_imp_ledcode',sortable:true,width:100,align:'center'},


        ],
store:loadPurMainGrpListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
        loaditemgrpdatastore.removeAll();
        loaditemgrpdatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loaditemgroup",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });
        loadunitdatastore.removeAll();
        loadunitdatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadunit",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });
        loadhsndatastore.removeAll();
        loadhsndatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadhsn",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });                
        
         Ext.Msg.show({
             title: 'Purchase Item Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){
		AEDFlag = "Edit";
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));


			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				item_code = selrow.get('item_code');
				
				txtItemname.setValue(selrow.get('item_name'));
				txtUsage.setValue(selrow.get('item_desc'));
				cmbunit.setValue(selrow.get('uom_code'));
				cmbQualityChk.setValue(selrow.get('item_qcupd'));
				cmbitemgrp.setValue(selrow.get('item_group_code'));
				cmbhsncode.setValue(selrow.get('hsn_sno'));
				
				
				flxDetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
    
   }

   });


   var MasPurchaseGroupformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PURCHASE GROUP MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasPurchaseGroupformpanel',
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
	
				if(txtGroupname.getRawValue()=="" || txtGroupname.getRawValue()==0)
				{
					alert("Enter Group Name");
					txtGroupname.focus();
				}
	

				else if(cmbTNPurledger.getRawValue()=="" || cmbTNPurledger.getValue()==0)
				{
					alert("Select State Ledger");
					cmbTNPurledger.focus();
				}
				else if(cmbOSPurledger.getRawValue()=="" || cmbOSPurledger.getValue()==0)
				{
					alert("Select Other Ledger");
					cmbOSPurledger.focus();
				}
				else if(cmbImportPurledger.getRawValue()=="" || cmbImportPurledger.getValue()==0)
				{
					alert("Select Import Ledger");
					cmbImportPurledger.focus();
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
		                            	url: 'MasPurchaseGroupSave.php',
                		       	        params:
						{
							groupname : txtGroupname.getRawValue(),
             						tnledcode  : cmbTNPurledger.getValue(),
							osledcode  : cmbOSPurledger.getValue(),
							impledcode : cmbImportPurledger.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasPurchaseGroupformpanel.getForm().reset();
							RefreshData();
						
                                                }
                                             	else 
						{
                                             
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     
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
                            MasPurchaseGroupWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'PURCHASE Main GROUP MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 210,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 450,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGroupname]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbTNPurledger]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 600,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbOSPurledger]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 600,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbImportPurledger]
                            }
	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasPurchaseGroupWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'PURCHASE MAIN GROUP MASTER',
        items       : MasPurchaseGroupformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtGroupname.focus();
				loadledgerdatastore.load({
                        	 url:'ClsPurchaseGroup.php',
                        	 params:
                       		 {
                         	 task:"loadledger"
                        	 }
				 });
	   			 }
			
		}
    });
    MasPurchaseGroupWindow.show();  
});
