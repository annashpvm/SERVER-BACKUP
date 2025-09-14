Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var Lcode = 0;

var txtLoadingArea = new Ext.form.TextField({
        fieldLabel  : 'Loading Area',
        id          : 'txtLoadingArea',
        name        : 'txtLoadingArea',
        width       :  250,
	labelStyle  : "font-size:14px;font-weight:bold;color:#ff33cc",
        tabindex : 2,
        store       : GetAreaListDatastore,
    	enableKeyEvents: true,
        style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  flxArea.getStore().filter('area_name', txtLoadingArea.getRawValue());  
            }
        }

    });
	


 


var GetAreaListDatastore = new Ext.data.Store({
      id: 'GetAreaListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasArea.php',      // File to connect toClsMasArea
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'area_code','area_name'
      ]),
    });	


   function RefreshData(){
        GetAreaListDatastore.removeAll();	
	GetAreaListDatastore.load({
        	 url: 'ClsMasArea.php', 
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
            {header: "Area code" , Id: 'area_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Area Name", Id: 'area_name', sortable:true,width:250,align:'left', menuDisabled: true},

                       
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('area_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtLoadingArea.getValue()) {
    return 'area_name'
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
			Lcode = selrow.get('area_code');
			
			txtLoadingArea.setValue(selrow.get('area_name'));




			flxArea.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

   var MasAreaformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'AREA MASTER',
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

				if(txtLoadingArea.getRawValue()=="" || txtLoadingArea.getRawValue()==0)
				{
					alert("Enter Loading Area");
					txtLoadingArea.setFocus();
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
		                            	url: 'FrmMasAreaSave.php',
                		       	        params:
						{
		
							loadingArea : txtLoadingArea.getRawValue()
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
                title   : 'AREA MASTER',
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
                                	items: [txtLoadingArea]
                            },

                ]

            },flxArea
            
        ],
    });
    
   
    var MasAreaWindow = new Ext.Window({
	height      : 550,
        width       : 1000,
        y           : 35,
        title       : 'AREA MASTER',
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
			txtLoadingArea.focus();
	   			 }
			
		}
    });
    MasAreaWindow.show();  
});
