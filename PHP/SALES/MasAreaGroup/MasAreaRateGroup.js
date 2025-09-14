Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var areacode =0;

 var loadAreaGroupListDatastore = new Ext.data.Store({
      id: 'loadAreaGroupListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAreaRateList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'rate_areacode','rate_areaname'

      ]),
    });



	var txtAreaName = new Ext.form.TextField({
        fieldLabel  : 'Area Group Name',
        id          : 'txtAreaName',
        name        : 'txtAreaName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
       	style: 'background-color: #00FF00;border-radius:5px;',
    	enableKeyEvents: true,
        store       : loadAreaGroupListDatastore,
    	listeners : {
            keyup: function () {


                  flxArea.getStore().filter('ratearea_name', txtAreaName.getValue());  
            }
        }


    });

 
   function RefreshData(){

	txtAreaName.setValue("");
        saveflag = "Add";
        areacode =0;
        loadAreaGroupListDatastore.removeAll();
	loadAreaGroupListDatastore.load({
          url:'ClsAreaGroup.php',
          params:
       	  {
           task:"loadAreaRateList"
          }
	});
   };


   var dgrecord = Ext.data.Record.create([]);
   var flxArea = new Ext.grid.EditorGridPanel({
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

		{header: "Area Code", dataIndex: 'rate_areacode',sortable:true,width:90,align:'left',hidden : true},   
		{header: "Area Name", dataIndex: 'rate_areaname',sortable:true,width:330,align:'left'},

        ],

viewConfig: {
getRowClass: function(record) {
    var red = record.get('area_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtAreaName.getValue()) {
    return 'area_name'
    }
}
},
       store:loadAreaGroupListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxArea.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			areacode = selrow.get('rate_areacode');
			txtAreaName.setRawValue(selrow.get('rate_areaname'));

			flxArea.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

;


   var MasAreaGroupformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'AREA RATE MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasAreaGroupformpanel',
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
	
				if(txtAreaName.getRawValue()=="" || txtAreaName.getRawValue()==0)
				{
					alert("Enter Area Name");
					txtAreaName.focus();
				}

		
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'MasAreaRateGroupSave.php',
                		       	        params:
						{
                                                        savetype  : saveflag,
                                                        areacode  : areacode,   
							areaname  : txtAreaName.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasAreaGroupformpanel.getForm().reset();
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
                            MasAreaGroupWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'AREA GROUP MASTER',
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
                                	items: [txtAreaName]
                            },


	
                ]

            },flxArea,
            
        ],
    });
    

    var MasAreaGroupWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'AREA - RATE MASTER',
        items       : MasAreaGroupformpanel,
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
			txtAreaName.focus();
                        RefreshData();
			
	       }   	
      }
    });
    MasAreaGroupWindow.show();  
});
