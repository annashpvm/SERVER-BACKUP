Ext.onReady(function(){
   Ext.QuickTips.init();
	var Gincompcode = localStorage.getItem('gincompcode');
	var GinFinid = localStorage.getItem('ginfinid');
	var GinYear = localStorage.getItem('gstyear');
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemtypep = "-1";
	var chkrate = 0;

	var loaditemdatastore = new Ext.data.Store({
		id: 'loaditemdatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsItemRate.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loaditem"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[
			'itmh_name','itmh_code'
		]),

	});

	var loadpartydatastore = new Ext.data.Store({
		id: 'loadpartydatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsItemRate.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadparty"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[
			'sup_refname','sup_code'
		]),

	});

	var loadchkratedatastore = new Ext.data.Store({
		id: 'loadchkratedatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsItemRate.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadchkrate"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[
			'pitr_seqno', 'pitr_item_code', 'pitr_sup_code', 'pitr_rate'
		]),

	});

	var cmbitem = new Ext.form.ComboBox({
		fieldLabel      : 'Item',
		width           : 250,
		displayField    : 'itmh_name', 
		valueField      : 'itmh_code',
		hiddenName      : '',
		id              : 'cmbitem',
		typeAhead       : true,
		mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
		store           : loaditemdatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : true,
		sortable	: true,
	});

	var cmbparty = new Ext.form.ComboBox({
		fieldLabel      : 'Party',
		width           : 250,
		displayField    : 'sup_refname', 
		valueField      : 'sup_code',
		hiddenName      : '',
		id              : 'cmbparty',
		typeAhead       : true,
		mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
		store           : loadpartydatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : false,
		listeners:{

		select: function(){
		loadchkratedatastore.removeAll();
		    loadchkratedatastore.load({
			url: 'ClsItemRate.php',
			params:
			{
			task:"loadchkrate",
			itemcode: cmbitem.getValue(),
			partycode : cmbparty.getValue()
			},
			callback:function()
			{
				txtitemrate.setValue(loadchkratedatastore.getAt(0).get('pitr_rate'));
				chkrate = loadchkratedatastore.getAt(0).get('pitr_seqno');
				
			}
		    });


		}
		}


	});

	var txtitemrate = new Ext.form.TextField({
		fieldLabel  : 'Item Rate',
		id          : 'txtitemrate',
		name        : 'txtitemrate',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
		width       :  250,
		style       :  {textTransform: "uppercase"},
	});


	function RefreshData(){
		cmbitem.reset();
		cmbparty.reset();
		itemtypep = "0";
		InitialData();
	};

	function InitialData(){

		loaditemdatastore.removeAll();
		loaditemdatastore.load({
		url: 'ClsItemRate.php',
		params:
		{
		    task:"loaditem",
		    finid:GinFinid,
		    compcode:Gincompcode,
		    itemtype: itemtypep
		},

		});
		loadpartydatastore.removeAll();
		loadpartydatastore.load({
		url: 'ClsItemRate.php',
		params:
		{
		    task:"loadparty",
		    finid:GinFinid,
		    compcode:Gincompcode,
		    itemtype: itemtypep
		},

		});
	};

   var MasItemRateformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ITEM RATE MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasItemRateformpanel',
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
  /*      {
            text: ' Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
            height: 40,
            fontSize:20,
            width:50,
            align : 'right',
            icon: '/Pictures/Add.png',
            listeners:{
                click: function () {
			gstFlag = "Add";

			
                }
            }
        },'-',
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";
			

                }
            }
        },'-', */              
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click: function () {
				var gstSave;
				
				gstSave="true";
				if(cmbitem.getRawValue()=="" || cmbitem.getValue()==0)
				{
					gstSave="false";
					alert("Select the Item details and continue");
					cmbitem.focus();
					
				}
				else if(cmbparty.getValue()=="" || cmbparty.getValue()==0)
				{
					alert("Select the Party details and continue");
					cmbparty.focus();
					gstSave="false";
				}
				else if(txtitemrate.getRawValue()=="" || txtitemrate.getRawValue() < 0 )
				{
					alert("Item Rate should not be Empty");
					txtitemrate.focus();
					gstSave="false";
				}

				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn){
					if (btn == 'yes'){
						if (gstSave === "true"){

						Ext.Ajax.request({
				            	url: 'MasItemRateSave.php',
				       	        params:
						{
							compcode:Gincompcode,
							finid:GinFinid,
							itemcode: cmbitem.getValue(),
							partycode: cmbparty.getValue(),
							itemrate: txtitemrate.getValue(),
							chkrate: chkrate
						},
						callback: function (options, success, response)
		                        	{
							var obj = Ext.decode(response.responseText);
							if (obj['success']==="true"){                                
								Ext.MessageBox.alert("Details Saved");
								MasItemRateformpanel.getForm().reset();
								RefreshData();
								
							}else{
								Ext.MessageBox.alert("Details Not Saved! Pls Check!");                                                  
							}
		                      
					 	}   
						});//'MasItemRateSave.php'end
						}  

			    	
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
                            MasItemRateWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ITEM RATE MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 360,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 50,
				border      : false,
				items: [cmbitem]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 100,
				border      : false,
				items: [cmbparty]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 150,
				border      : false,
				items: [txtitemrate]
			},

                ]

            }
            
        ],
    });
    
   
    var MasItemRateWindow = new Ext.Window({
	height      : 450,
        width       : 580,
        y           : 35,
        title       : 'ITEM RATE MASTER',
        items       : MasItemRateformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			//if (gstFlag === "Add"){
//cmbitem.focus();
				InitialData();


			//}			
	   		
		}
	}
    });
    MasItemRateWindow.show();  
});
