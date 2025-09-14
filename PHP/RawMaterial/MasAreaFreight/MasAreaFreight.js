Ext.onReady(function(){
   Ext.QuickTips.init();
   	var Gincompcode = localStorage.getItem('gincompcode');
   	var GinFinid = localStorage.getItem('ginfinid');
   	var GinYear = localStorage.getItem('gstyear');
   	var userid = localStorage.getItem('ginuser');
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemtypep = "-1";
	var chkrate = 0;

	var loaditemdatastore = new Ext.data.Store({
		id: 'loaditemdatastore',

		proxy: new Ext.data.HttpProxy({
			url: 'ClsAreaFreight.php',      // File to connect to
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
			url: 'ClsAreaFreight.php',      // File to connect to
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
			url: 'ClsAreaFreight.php',      // File to connect to
			method: 'POST'
		}),
		baseParams:{task:"loadchkrate"}, // this parameter asks for listing
		reader: new Ext.data.JsonReader({
			  // we tell the datastore where to get his data from
		root: 'results',
		remoteSort: true, 
		totalProperty: 'total',
		id: 'id'
		},[ 'arf_seqno', 'arf_party_code', 'arf_area_code', 'arf_type', 'arf_loadfreight', 'arf_loadfreight_10w', 'arf_loadfreight_12w', 'arf_loadfreight_tipper'
		]),

	});

	var loadAreadatastore = new Ext.data.Store({
	      id: 'loadAreadatastore',
	      autoLoad : true,
	      proxy: new Ext.data.HttpProxy({
		        url: 'ClsAreaFreight.php',      // File to connect to
		        method: 'POST'
		    }),
		    baseParams:{task:"loadarea"}, // this parameter asks for listing
	      reader: new Ext.data.JsonReader({
		          // we tell the datastore where to get his data from
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	      },[
		'area_name','area_code'
	      ]),
	});
	

	var optrawtype = new Ext.form.FieldSet({
		xtype: 'fieldset',
		title: '',
		fieldLabel: '',
		layout : 'hbox',
		width:180,
		height:60,
		x:160,
		y:0,
		border: false,
		items: [
		{
			xtype: 'radiogroup',
			columns: 1,
			rows : 1,
			id: 'optrawtype',
			items: [
				{boxLabel: 'Raw Material', name: 'optrawtype', id:'optfu', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
				if(checked==true){

				}
				}
			}
			}

			]
		}
		]

	});


	var cmbarea = new Ext.form.ComboBox({
		fieldLabel      : 'Area',
		width           : 250,
		displayField    : 'area_name', 
		valueField      : 'area_code',
		hiddenName      : '',
		id              : 'cmbarea',
		typeAhead       : true,
		mode            : 'local',
		store           : loadAreadatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : true,
		listeners:{

		select: function(){

		loadchkratedatastore.removeAll();
		    loadchkratedatastore.load({
			url: 'ClsAreaFreight.php',
			params:
			{
			task:"loadchkrate",
			partycode : cmbparty.getValue(),
			areacode : cmbarea.getValue(),

			
			},
			callback:function()
			{
				//txtitemrate.setValue(loadchkratedatastore.getAt(0).get('pitr_rate'));
				chkrate = loadchkratedatastore.getAt(0).get('arf_seqno');
				txtlorryitemrate.setValue(loadchkratedatastore.getAt(0).get('arf_loadfreight'));
				txtlorry10wrate.setValue(loadchkratedatastore.getAt(0).get('arf_loadfreight_10w'));
				txtlorry12wrate.setValue(loadchkratedatastore.getAt(0).get('arf_loadfreight_12w'));
				txttipperitemrate.setValue(loadchkratedatastore.getAt(0).get('arf_loadfreight_tipper'));
				
			}
		    });
		}
		}
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
		store           : loadpartydatastore,
		forceSelection  : true,
		triggerAction   : 'all',
		selectOnFocus   : false,
		editable        : true,
		tabIndex	: 0,
		allowblank      : true,
		listeners:{

		select: function(){



		}
		}


	});

	var txtlorryitemrate = new Ext.form.TextField({
		fieldLabel  : 'Freight',
		id          : 'txtlorryitemrate',
		name        : 'txtlorryitemrate',
		width       :  150,
		style       :  {textTransform: "uppercase"},
	});

	var txtlorry10wrate = new Ext.form.TextField({
		fieldLabel  : '10 Wheels',
		id          : 'txtlorry10wrate',
		name        : 'txtlorry10wrate',
		width       :  150,
		style       :  {textTransform: "uppercase"},
	});

	var txtlorry12wrate = new Ext.form.TextField({
		fieldLabel  : '12 Wheels',
		id          : 'txtlorry12wrate',
		name        : 'txtlorry12wrate',
		width       :  150,
		style       :  {textTransform: "uppercase"},
	});

	var txttipperitemrate = new Ext.form.TextField({
		fieldLabel  : 'For Tipper',
		id          : 'txttipperitemrate',
		name        : 'txttipperitemrate',
		width       :  150,
		style       :  {textTransform: "uppercase"},
	});


	function RefreshData(){
		cmbparty.reset();
		itemtypep = "0";
		InitialData();
	};

	function InitialData(){

		loaditemdatastore.removeAll();
		loaditemdatastore.load({
		url: 'ClsAreaFreight.php',
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
		url: 'ClsAreaFreight.php',
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
        title       : 'PARTY AREA FREIGHT MASTER',
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
				if(cmbarea.getRawValue()=="" || cmbarea.getValue()==0)
				{
					Ext.Msg.alert("Select the Area details and continue");
					cmbarea.setFocus();
					gstSave="false";
				}
				else if(cmbparty.getValue()=="" || cmbparty.getValue()==0)
				{
					Ext.Msg.alert("Select the Party details and continue");
					cmbparty.setFocus();
					gstSave="false";
				}
				else if(txtlorryitemrate.getRawValue()=="" || txtlorryitemrate.getRawValue() < 0 )
				{
					Ext.Msg.alert("Item Rate should not be Empty");
					txtitemrate.setFocus();
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
				            	url: 'MasAreaFreightSave.php',
				       	        params:
						{
							compcode:Gincompcode,
							finid:GinFinid,
							partycode: cmbparty.getValue(),
							areacode: cmbarea.getValue(),
							lorryitemrate: txtlorryitemrate.getValue(),
							lorry10wrate: txtlorry10wrate.getValue(),
							lorry12wrate: txtlorry12wrate.getValue(),
							tipperitemrate: txttipperitemrate.getValue(),
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
						});//'MasItemFreightSave.php'end
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
			    window.location.href=('http://192.168.11.14/SHVPM/RawMaterial/RawmaterialMainPage.php');
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'PARTY AREA FREIGHT MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 260,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[optrawtype,

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 60,
				border      : false,
				items: [cmbparty]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 90,
				border      : false,
				items: [cmbarea]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				x           : 60,
				y           : 130,
				border      : false,
//				items: [cmbitem]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 350,
				x           : 60,
				y           : 120,
				border      : false,
				items: [txtlorryitemrate]
			},
			/*{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 400,
				height	    : 100,
				x           : 50,
				y           : 100,
				border      : true,
				items: [
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 350,
						x           : 100,
						y           : 10,
						border      : false,
						items: [txtlorryitemrate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 160,
						width       : 350,
						border      : false,
						//items: [txtlorryitemrate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 160,
						width       : 350,
						border      : false,
						//items: [txtlorry10wrate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 160,
						width       : 350,
						border      : false,
						//items: [txtlorry12wrate]
					},

				]
			},*/

                ]

            }
            
        ],
    });
    
   
    var MasItemRateWindow = new Ext.Window({
	height      : 350,
        width       : 580,
        y           : 35,
        title       : 'PARTY AREA FREIGHT MASTER',
        items       : MasItemRateformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
	//closeAction : window.location.href=('http://192.168.11.14/SHVPM/RawMaterial/RawMaterialMainPage.php'),
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			//if (gstFlag === "Add"){

				InitialData();


			//}			
	   		
		}
	}
    });
    MasItemRateWindow.show();  
});
