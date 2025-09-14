Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var servicecode =0;


  var loadTDSServiceTypeDataStore = new Ext.data.Store({
      id: 'loadTDSServiceTypeDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTDSServiceType.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadServiceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'tds_service_type_code', type: 'int',mapping:'tds_service_type_code'},
	{name:'tds_service_type_name', type: 'string',mapping:'tds_service_type_name'}
      ]),
    });


	var txtServiceName = new Ext.form.TextField({
        fieldLabel  : 'Service Name',
        id          : 'txtServiceName',
        name        : 'txtServiceName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });

 
   function RefreshData(){

	txtServiceName.setValue("");
        saveflag = "Add";
        servicecode =0;


	loadTDSServiceTypeDataStore.load({
	 url:'ClsTDSServiceType.php',
	 params:
	 {
 	 task:"loadServiceList"
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
        height: 350,
        width: 600,
        x: 300,
        y: 140,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   

		{header: " Code", dataIndex: 'tds_service_type_code',sortable:true,width:90,align:'left',hidden : true},   
		{header: "Service Name", dataIndex: 'tds_service_type_name',sortable:true,width:330,align:'left'},


        ],
       store:loadTDSServiceTypeDataStore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			servicecode = selrow.get('tds_service_type_code');
			txtServiceName.setRawValue(selrow.get('tds_service_type_name'));

			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });


   var MasTDSServicePanel = new Ext.FormPanel({
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
        id          : 'MasTDSServicePanel',
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
	
				if(txtServiceName.getRawValue()=="" || txtServiceName.getRawValue()==0)
				{
					alert("Enter Group Name");
					txtServiceName.focus();
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
		                            	url: 'TDSServiceTypeSave.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        servicecode : servicecode,   
							servicename  : txtServiceName.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasTDSServicePanel.getForm().reset();
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
                            MasTDSServiceTypeWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 100,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,
                items:[
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 450,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtServiceName]
                        },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasTDSServiceTypeWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'TDS SERVICE TYPE MASTER',
        items       : MasTDSServicePanel,
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
			txtServiceName.focus();
                        RefreshData()
                            
	   	}
			
		}
    });
    MasTDSServiceTypeWindow.show();  
});
