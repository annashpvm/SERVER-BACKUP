Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var subledgrpcode =0;

 var grptype = "";
 var grppltype = "";
 var loadLedgerMainGrpListDatastore = new Ext.data.Store({
      id: 'loadLedgerMainGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedgerSubGoupLevel1.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParentGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'grp_code', 'grp_name'
      ]),
    });

 var loadSubGrpListDatastore = new Ext.data.Store({
      id: 'loadSubGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedgerSubGoupLevel1.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'subgrpcode', 'subgrpname', 'parentgrpcode', 'parentgrpname'
      ]),
    });



  var loadParentGroupDetaildatastore = new Ext.data.Store({
      id: 'loadParentGroupDetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedgerSubGoupLevel1.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParentDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'grp_code', 'grp_name', 'grp_parent_code', 'grp_type', 'grp_pl_type'
      ]),
    });


   var txtSubGroupName = new Ext.form.TextField({
        fieldLabel  : 'Sub Group Name',
        id          : 'txtSubGroupName',
        name        : 'txtSubGroupName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
	     
	     if (flxDetail.store.find('subgrpname', txtSubGroupName.getRawValue()) != -1){
	     	flxDetail.getStore().filter('subgrpname', txtSubGroupName.getRawValue());   
	     }
	     else
	     {
		     flxDetail.getStore().filter('subgrpname', '');
	     }

	    }
	}
    });


     var cmbLedgerMainGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Main Group Name',
        width           : 250,
        displayField    : 'grp_name',
        valueField      : 'grp_code',
        hiddenName      : 'grp_name',
        id              : 'cmbLedgerMainGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadLedgerMainGrpListDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
	
			loadParentGroupDetaildatastore.load({
                        url: 'ClsLedgerSubGoupLevel1.php',
                        params:
                            {
                                task:"loadParentDetails",
                                grpcode:cmbLedgerMainGroup.getValue()
                       
                            },
                      	callback:function()
			    {
                               grptype = loadParentGroupDetaildatastore.getAt(0).get('grp_type');
                               grppltype = loadParentGroupDetaildatastore.getAt(0).get('grp_pl_type');
                            }   
                        });  
         }
        }   
});  
        



 
   function RefreshData(){

	txtSubGroupName.setValue("");
        saveflag = "Add";
        subledgrpcode =0;
        loadSubGrpListDatastore.removeAll();
	loadSubGrpListDatastore.load({
          url:'ClsLedgerSubGoupLevel1.php',
          params:
       	  {
           task:"loadSubGroup"
          }
	});
   };


   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 330,
        width: 900,
        x: 170,
        y: 180,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Sub Grp Code", dataIndex: 'subgrpcode',sortable:true,width:90,align:'left'},   
		{header: "Sub Grp Name", dataIndex: 'subgrpname',sortable:true,width:330,align:'left'},
		{header: "Grp Code", dataIndex: 'parentgrpcode',sortable:true,width:90,align:'left'},   
		{header: "Grp Name", dataIndex: 'parentgrpname',sortable:true,width:330,align:'left'},


        ],
       store:loadSubGrpListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			subledgrpcode = selrow.get('subgrpcode');
			txtSubGroupName.setRawValue(selrow.get('subgrpname'));
                        cmbLedgerMainGroup.setValue(selrow.get('parentgrpcode'));
			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });


   var MasLedgerGroupformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'LEDGER SUB GROUP LEVEL - I',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasLedgerGroupformpanel',
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
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
	
				if(txtSubGroupName.getRawValue()=="" || txtSubGroupName.getRawValue()==0)
				{
					alert("Enter Group Name");
					txtSubGroupName.focus();
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
		                            	url: 'MasLedgerSubGroupLevel1Save.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        subledgrpcode : subledgrpcode,   
							subgrpname    : txtSubGroupName.getRawValue(),
                                                        parentgrpcode : cmbLedgerMainGroup.getValue(),
							grptype       : grptype,
							grppltype     : grppltype,


						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasLedgerGroupformpanel.getForm().reset();
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
                            MasLedgerGroupWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'LEDGER SUB GROUP MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 140,
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
                                	items: [txtSubGroupName]
                            },
			   { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 450,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbLedgerMainGroup]
                            },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasLedgerGroupWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'LEDGER SUB GROUP LEVEL - I',
        items       : MasLedgerGroupformpanel,
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
			txtSubGroupName.focus();
			
		}
        } 
    });
    MasLedgerGroupWindow.show();  
});
