Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var eqcode = 0;

var loadEquipmentdatastore = new Ext.data.Store({
      id: 'loadEquipmentdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsequipmaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadEquipment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'equip_code','equip_name','section_code', 'section_name'
      ]),
    });	


var loadSectionDatastore = new Ext.data.Store({
      id: 'loadSectionDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsequipmaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadSection"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'section_code', 'section_name'
      ]),
    });	

   function RefreshData(){
        txtEquipment.setRawValue("");	
	loadEquipmentdatastore.load({
        	 url: 'clsequipmaster.php', 
              	 params:
        	 {
                	 task:"loadEquipment"
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
            {header: "Equipment code" , Id: 'equip_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Equipment Name" , Id: 'equip_name', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "Section code"   , Id: 'section_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Section Name"   , Id: 'section_name', sortable:true,width:170,align:'left', menuDisabled: true},           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('equip_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtEquipment.getValue()) {
    return 'equip_name'
    }
}
},
store:loadEquipmentdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxequipdetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtEquipment.setValue(selrow.get('equip_name'));
			eqcode=selrow.get('equip_code');
 			cmbSection.setValue(selrow.get('section_code'));

			 flxequipdetail .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
var cmbSection= new Ext.form.ComboBox({
        fieldLabel      : 'Section Name',
        width           : 300,
        displayField    : 'section_name', 
        valueField      : 'section_code',
        hiddenName      : '',
        id              : 'cmbSection',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSectionDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,

    	style      : "border-radius:5px;",   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",     
	listeners:{
        select: function(){
	}
	}
   });
   
   
var txtEquipment = new Ext.form.TextField({
        fieldLabel  : 'Equipment Name',
        id          : 'txtEquipment',
        name        : 'txtEquipment',
        width       :  300,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadEquipmentdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                   flxequipdetail.getStore().filter('equip_name', txtEquipment.getValue());  
            }
        }
  

  });
  


   var Equippanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'EQUIPMENT MASTER',
    header      : true,
    width       : 600,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'Equippanel',
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

				if( txtEquipment.getRawValue() == '' ) 
				{

					alert("Enter Equipment Name");
					txtEquipment.setFocus();
				}
				else if( cmbSection.getRawValue() == '' || cmbSection.getValue() == 0) 
				{

					alert("Select Section Name");
					cmbSection.setFocus();
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
						     equipmasname  : txtEquipment.getRawValue(),
						     equipmascode  : eqcode,
						     seccode       : cmbSection.getValue(),
                                                     machine       : 'Y',
                                                     cogen         : 'Y',
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    Equippanel.getForm().reset();
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
                    handler: function(){
                       RefreshData();
                    }
                  
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
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
                width   : 600,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 260,
                y       : 25,	
                items:[
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 500,
                        	x           : 10,
                        	y           : 20,
                            	border      : false,
                        	items: [txtEquipment]
                          },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 500,
                        	x           : 10,
                        	y           : 60,
                            	border      : false,
                        	items: [cmbSection]
                          },
                                                    
                                          
                       flxequipdetail,

       ]
       
       }
       ]
       
 
});
   
 
 var equipWindow = new Ext.Window({
	height      : 560,
        width       : 1200,
        y           : 50,
        title       :'EQUIPMENT MASTER',
        items       : 'Equippanel',
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
         //      RefreshData();
             }
             }
            });
             
            equipWindow.show();  
        });      
   
