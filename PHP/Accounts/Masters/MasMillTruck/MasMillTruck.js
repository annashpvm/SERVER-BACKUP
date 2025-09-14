Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var truck_code =0;

 var loadTruckListDatastore = new Ext.data.Store({
      id: 'loadTruckListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMillTruck.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMillTruck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'truck_no','truck_code'

      ]),
    });





	var txtTruckNo = new Ext.form.TextField({
        fieldLabel  : 'Truck No.',
        id          : 'txtTruckNo',
        name        : 'txtTruckNo',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });

 
   function RefreshData(){

	txtTruckNo.setValue("");
        saveflag = "Add";
        truck_code =0;
        loadTruckListDatastore.removeAll();
	loadTruckListDatastore.load({
          url:'ClsMillTruck.php',
          params:
       	  {
           task:"loadMillTruck"
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

		{header: "Truck Code", dataIndex: 'truck_code',sortable:true,width:90,align:'left',hidden:true},   
		{header: "Truck No", dataIndex: 'truck_no',sortable:true,width:330,align:'left'},


        ],
       store:loadTruckListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			truck_code = selrow.get('truck_code');
			txtTruckNo.setRawValue(selrow.get('truck_no'));

			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });


   var MasTruckPanel = new Ext.FormPanel({
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
        id          : 'MasTruckPanel',
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
	
				if(txtTruckNo.getRawValue()=="" || txtTruckNo.getRawValue()==0)
				{
					alert("Enter Group Name");
					txtTruckNo.focus();
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
		                            	url: 'MasMillTruckSave.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        truckcode : truck_code,   
							truckno    : txtTruckNo.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasTruckPanel.getForm().reset();
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
                            MasTruckWindow.hide();
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
                                	items: [txtTruckNo]
                            },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasTruckWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'MILL TRUCK LIST',
        items       : MasTruckPanel,
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
			txtTruckNo.focus();

		}
         } 
    });
    MasTruckWindow.show();  
});
