Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');

 var saveflag = "Add";
 var purgrpcode =0;

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
	
	'grp_code', 'grp_name'
      ]),
    });

 var loadSubGrpListDatastore = new Ext.data.Store({
      id: 'loadSubGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'subgrp_code', 'subgrp_name', 'subgrp_grpcode', 'grp_code', 'grp_name'
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
	     
	     if (flxDetail.store.find('subgrp_name', txtSubGroupName.getRawValue()) != -1){
	     	flxDetail.getStore().filter('subgrp_name', txtSubGroupName.getRawValue());   
	     }
	     else
	     {
		     flxDetail.getStore().filter('subgrp_name', '');
	     }

	    }
	}
    });


     var cmbPurGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Main Group Name',
        width           : 250,
        displayField    : 'grp_name',
        valueField      : 'grp_code',
        hiddenName      : 'grp_name',
        id              : 'cmbPurGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadPurMainGrpListDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
/*	
			loadsectionDataStore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadsection",
                                compcode:Gincompcode,
				finid:Ginfinid,
				dept:cmbdept.getValue(),
                                machine:cmbmachine.getRawValue()
                       
                            }
                        });      
*/

	}
} 
   });

 
   function RefreshData(){

	txtSubGroupName.setValue("");
        saveflag = "Add";
        purgrpcode =0;
        loadSubGrpListDatastore.removeAll();
	loadSubGrpListDatastore.load({
          url:'ClsPurchaseGroup.php',
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

		{header: "Sub Grp Code", dataIndex: 'subgrp_code',sortable:true,width:90,align:'left'},   
		{header: "Sub Grp Name", dataIndex: 'subgrp_name',sortable:true,width:330,align:'left'},
		{header: "Grp Code", dataIndex: 'subgrp_grpcode',sortable:true,width:90,align:'left'},   
		{header: "Grp Name", dataIndex: 'grp_name',sortable:true,width:330,align:'left'},


        ],
       store:loadSubGrpListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			purgrpcode = selrow.get('subgrp_code');
			txtSubGroupName.setRawValue(selrow.get('subgrp_name'));
                        cmbPurGroup.setValue(selrow.get('subgrp_grpcode'));
			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
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
		                            	url: 'MasPurchaseGroupSave.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        purgrpcode : purgrpcode,   
							subgrpname : txtSubGroupName.getRawValue(),
                                                        grpcode    : cmbPurGroup.getValue(),

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
                title   : 'PURCHASE SUB GROUP MASTER',
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
                                	items: [cmbPurGroup]
                            },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasPurchaseGroupWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'PURCHASE SUB GROUP MASTER',
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
			txtSubGroupName.focus();
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
