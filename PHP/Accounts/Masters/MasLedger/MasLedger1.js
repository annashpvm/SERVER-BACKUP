Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



    var findGroupNameDataStore = new Ext.data.Store({
      id: 'findGroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "findGroupName"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_prefix','grp_code','grp_name' ]),
      sortInfo:{field: 'grp_name', direction: "ASC"}
    });




    var GroupNameDataStore = new Ext.data.Store({
      id: 'GroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'subgrpcode','subgrpname'
      ]),
      sortInfo:{field: 'subgrpname', direction: "ASC"}
    });


      var LedCodeLedgerDataStore = new Ext.data.Store({
      id: 'LedCodeLedgerDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "LoadAllLedgerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_code','led_name'])
    });


var cmbGroupName = new Ext.form.ComboBox({
        id         : 'cmbGroupName',
        name	   : 'GroupName',
        fieldLabel : 'Group Name',
        store:GroupNameDataStore,
        width      : 350,
        displayField:'subgrpname',
        valueField:'subgrpcode',
        hiddenName:'subgrpname',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){
//             grpcode=this.getValue()
          }
       }
    });


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "VIEW GROUP PENDING DETAILS",
    width   : 200,
    height  : 25,
    x       : 200,
    y       : 0,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){       
                LedCodeLedgerDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php',
                    params:{
                        task:'GeneralLedger2'
                    },
                    callback:function(){

                    }
                });
         }
    }
});


var txtLedgerPrefix = new Ext.form.TextField({
        fieldLabel  : 'Ledger Prefix',
        id          : 'txtLedgerPrefix',
        name        : 'txtLedgerPrefix',
        width       :  100,
        tabindex : 2
});


var cmbLedgerName = new Ext.form.ComboBox({
        id         : 'cmbLedgerName',
        name	   : 'cmbLedgerName',
        fieldLabel : 'Ledger Name ',
        store:LedCodeLedgerDataStore,
        width      : 350,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){

                   findGroupNameDataStore.removeAll();
			findGroupNameDataStore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                            {
                                task:"findGroupName",
                                ledcode:cmbLedgerName.getValue()                     
                            },
                            callback:function()
   		            {

			    cmbGroupName.setValue(findGroupNameDataStore.getAt(0).get('grp_code'));
			    txtLedgerPrefix.setRawValue(findGroupNameDataStore.getAt(0).get('led_prefix'));

			    
			    }
                        });  

          }
       }
    });

   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Master',
        width       : 700,
        height      : 500,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'MasLedgerFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png'
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                           if (cmbLedgerName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Ledger Code should not be empty...!");
                             }
                           else if (cmbGroupName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Group name should not be empty...!");
                             }
                            else {

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
		                            	url: 'MasLedgerSave1.php',
                		       	        params:
						{
			                          ledger_code   : cmbLedgerName.getValue(),
			                          ledger_grpcode: cmbGroupName.getValue(),
			                          ledger_prefix : txtLedgerPrefix.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasGeneralLedgerPanel.getForm().reset();
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
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function(){
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasLedgerWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{
                 xtype: 'fieldset',
                title: 'Ledger Details',
                layout : 'absolute',
                border:true,
                height:340,
                width:730,
                x: 10,
                y: 0,
                     items:[

                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 30,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbLedgerName]
                       },


                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 90,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbGroupName]
                       },
		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 0,
		         y           : 150,
		         border      : false,
		         items:[txtLedgerPrefix],
		     },
			 btnSubmit

               ]
             }
            ]
         });

    function RefreshData(){
            txtLedgerPrefix.setValue('');

    }

     var MasLedgerWindow = new Ext.Window({
        height      : 440,
        width       : 760,
        items       : MasLedgerFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 120,
onEsc:function(){
},
        listeners:{
            show:function(){
                GroupNameDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php', 
                    params:{
                        task:'GroupName',
                        compcode:gincompcode
                    }
                });

                LedCodeLedgerDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php',
                    params:{
                        task:'LoadAllLedgerList'
                    },
                    callback:function(){

                    }
                });
            }
        }
    });
       MasLedgerWindow.show();
});
