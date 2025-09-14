Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var eqcode = 0;

var loadequipmentdatastore = new Ext.data.Store({
      id: 'loadequipmentdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsequipmaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadequipment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'equip_code','equip_name'
      ]),
    });	

   function RefreshData(){
        txtequipmentname.setRawValue("");	
	loadequipmentdatastore.load({
        	 url: 'clsequipmaster.php', 
              	 params:
        	 {
                	 task:"loadequipment"
               	 }
	});	
};

var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxequipdetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 550,
        x: 0,
        y: 120,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid',  

           
        columns: [    
            {header: "Equipment code"    , Id: 'equip_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Equipment Name", Id: 'equip_name', sortable:true,width:170,align:'left', menuDisabled: true},
           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('equip_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtequipmentname.getValue()) {
    return 'equip_name'
    }
}
},
store:loadequipmentdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxequipdetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtequipmentname.setValue(selrow.get('equip_name'));
			eqcode=selrow.get('equip_code');
			alert(eqcode);
			 flxequipdetail .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
   
var txtequipmentname = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtequipmentname',
        name        : 'txtequipmentname',
        width       :  280,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadequipmentdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                   flxequipdetail.getStore().filter('equip_name', txtequipmentname.getValue());  
            }
        }
  

  });
  


   var equippanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'EQUIPMENT MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'equippanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtequipmentname.getRawValue() == '' ) 
				{

					alert("Enter Equipment Name");
					txtequipmentname.setFocus();
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
		                            	url: 'frmequipmastersave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     equipmasname  : txtequipmentname.getRawValue(),
						     equipmascode   : eqcode,
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    equippanel.getForm().reset();
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
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
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                     icon: '/Pictures/exit.png',
                    handler: function(){	
                            equipWindow.hide();
                        }
   
                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'EQUIPMENT',
                layout  : 'hbox',
                border  : true,
                height  : 420,
                width   : 500,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 260,
                y       : 25,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtequipmentname]
                          },
                          
                                          
                       flxequipdetail,

       ]
       
       }
       ]
       
 
});
   
 
 var equipWindow = new Ext.Window({
	height      : 700,
        width       : 1200,
        y           : 50,
        title       :'EQUIPMENT MASTER',
        items       : 'equippanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){
         //      RefreshData();
             }
             }
            });
             
            equipWindow.show();  
        });      
   
