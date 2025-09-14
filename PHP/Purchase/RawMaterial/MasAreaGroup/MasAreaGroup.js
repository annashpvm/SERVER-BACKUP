Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var areagrpcode = 0;

var txtAreaGroup = new Ext.form.TextField({
        fieldLabel  : ' Area Group',
        id          : 'txtAreaGroup',
        name        : 'txtAreaGroup',
        width       :  250,
	labelStyle  : "font-size:14px;font-weight:bold;color:#ff33cc",
        tabindex : 2,
        store       : GetAreaListDatastore,
    	enableKeyEvents: true,
        style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  flxArea.getStore().filter('areagrp_name', txtAreaGroup.getRawValue());  
            }
        }

    });
	


 


var GetAreaListDatastore = new Ext.data.Store({
      id: 'GetAreaListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasAreaGroup.php',      // File to connect toClsMasArea
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'areagrp_code','areagrp_name'
      ]),
    });	


   function RefreshData(){

	 saveflag = "Add";
	 areagrpcode = 0;


        GetAreaListDatastore.removeAll();	
	GetAreaListDatastore.load({
        	 url: 'ClsMasAreaGroup.php', 
              	 params:
        	 {
                	 task:"loadAreaList"
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
        height: 320,
        width: 800,
        x: 80,
        y: 120,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

        
        columns: [    
            {header: "Area Group code" , Id: 'areagrp_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Area Group Name", Id: 'areagrp_name', sortable:true,width:250,align:'left', menuDisabled: true},

                       
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('areagrp_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtAreaGroup.getValue()) {
    return 'areagrp_name'
    }
}
},
store:GetAreaListDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxArea.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	

                        saveflag = "Edit";
			areagrpcode = selrow.get('areagrp_code');
			
			txtAreaGroup.setValue(selrow.get('areagrp_name'));




			flxArea.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

   var MasAreaformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'AREA GROUP MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasAreaformpanel',
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

				if(txtAreaGroup.getRawValue()=="" || txtAreaGroup.getRawValue()==0)
				{
					alert("Enter Loading Area");
					txtAreaGroup.setFocus();
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
		                            	url: 'FrmMasAreaGroupSave.php',
                		       	        params:
						{
		                                        savetype    : saveflag,  
                               			        areagrpcode : areagrpcode,		
							AreaGroup : txtAreaGroup.getRawValue()
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
						    MasAreaformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasAreaformpanel.getForm().reset();
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
                            MasAreaWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'AREA GROUP MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 80,
                width   : 450,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 260,
                y       : 20,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtAreaGroup]
                            },

                ]

            },flxArea
            
        ],
    });
    
   
    var MasAreaWindow = new Ext.Window({
	height      : 550,
        width       : 1000,
        y           : 35,
        title       : 'AREA GROUP MASTER',
        items       : MasAreaformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtAreaGroup.focus();
	   			 }
			
		}
    });
    MasAreaWindow.show();  
});
