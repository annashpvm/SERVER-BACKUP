Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var portcode = 0;

var txtPort = new Ext.form.TextField({
        fieldLabel  : 'Port Name',
        id          : 'txtPort',
        name        : 'txtPort',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : LoadCountryDataStore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

    

                  flxPort.getStore().filter('port_name', txtPort.getValue());  
            }
        }

  });



var LoadPortDataStore = new Ext.data.Store({
      id: 'LoadPortDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPort.php',      // File to connect toClsMasPort
                method: 'POST'
            }),
            baseParams:{task:"loadPortList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'port_code', 'port_name','country_code','country_name',
      ]),
    });



var LoadCountryDataStore = new Ext.data.Store({
      id: 'LoadCountryDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPort.php',      // File to connect toClsMasPort
                method: 'POST'
            }),
            baseParams:{task:"loadCountryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'country_code','country_name'
      ]),
    });	


var cmbCountry = new Ext.form.ComboBox({
        fieldLabel      : 'Country ',
        width           : 250,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbCountry',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });



   function RefreshData(){
        txtPort.setRawValue("");	
	LoadPortDataStore.load({
        	 url: 'ClsMasPort.php', 
              	 params:
        	 {
                	 task:"loadPortList"
               	 }
	});	
};

   var dgrecord = Ext.data.Record.create([]);

   var flxPort = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 650,
        x: 500,
        y: 20,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "Port code", Id: 'port_code', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true},       
            {header: "Port Name", Id: 'port_name', sortable:true,width:300,align:'left', menuDisabled: true},

            {header: "Country code", Id: 'country_code', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true},       
            {header: "Country Name", Id: 'country_name', sortable:true,width:300,align:'left', menuDisabled: true},
                
           ],

store:LoadPortDataStore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxPort.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			portcode = selrow.get('port_code');
			txtPort.setValue(selrow.get('port_name'));
                        cmbCountry.setValue(selrow.get('country_code'));
			flxPort.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });

   var MasProdMainPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'COUNTRY NAME',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
                        //alert(txtPort.getRawValue());
				if( txtPort.getRawValue() == '' ) 
				{

					alert("Enter country Name");
					txtPort.setFocus();
				}
                            	else if(cmbCountry.getRawValue()=="" || cmbCountry.getValue()==0)
			        {
					alert("Select Country..");
					cmbCountry.setFocus();
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
		                            	url: 'FrmMasPortSave.php',
                		       	        params:
						{
						     savetype    : saveflag,
						     portcode    : portcode,
						     portname    : txtPort.getRawValue(),
						     countrycode : cmbCountry.getValue(),
		
			
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
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 150,
                width   : 450,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 10,
                y       : 20,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 450,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtPort]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 450,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbCountry]
                          },

                ]

            },flxPort
            
        ],
    });
    
   
    var MasProdWindow = new Ext.Window({
	height      : 500,
        width       : 1200,
        y           : 35,
        title       : 'PORT MASTER',
        items       : MasProdMainPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtPort.focus();
	   	        txtPort.setHeight(25);		 }
			
		}
    });
    MasProdWindow.show();  
});
