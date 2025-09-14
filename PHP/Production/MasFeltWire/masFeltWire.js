Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var fcode = 0;

var loadFeltWiredatastore = new Ext.data.Store({
      id: 'loadFeltWiredatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsFeltWire.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadFeltWire"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'fw_code','fw_name','fw_type'
      ]),
    });	

   function RefreshData(){
        txtFeltWire.setRawValue("");
        saveflag = "Add";	
	loadFeltWiredatastore.load({
        	 url: 'clsFeltWire.php', 
              	 params:
        	 {
                	 task:"loadFeltWire"
               	 }
	});	
};


var cmbType = new Ext.form.ComboBox({
        fieldLabel      : 'Type',
        width           : 100,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbType',
        typeAhead       : true,
        mode            : 'local',
        store           : [['F','FELT'],['W','WIRE'],['S','SCREENS']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                  refresh();
	}
	}
   });


var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxFeltWireDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 360,
        width: 550,
        x: 110,
        y: 50,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid',  

           
        columns: [    
            {header: "code"    , Id: 'fw_code', sortable:true,width:100,align:'left', menuDisabled: true,hidden :true},       
            {header: "Name", Id: 'fw_name', sortable:true,width:400,align:'left', menuDisabled: true},
            {header: "Type", Id: 'fw_type', sortable:true,width:100,align:'left', menuDisabled: true},           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('fw_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtFeltWire.getValue()) {
    return 'fw_name'
    }
}
},
store:loadFeltWiredatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxFeltWireDetails.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtFeltWire.setValue(selrow.get('fw_name'));
			fcode=selrow.get('fw_code');
			cmbType.setValue(selrow.get('fw_type'));
//			alert(fcode);
			 flxFeltWireDetails .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
   
var txtFeltWire = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtFeltWire',
        name        : 'txtFeltWire',
        width       :  550,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadFeltWiredatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                    flxFeltWireDetails.getStore().filter('fw_name', txtFeltWire.getValue());  
            }
        }
  

  });
  


   var FeltWirePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'FeltWirePanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
                  {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtFeltWire.getRawValue() == '' ) 
				{

					alert("Enter Section Name");
					txtFeltWire.setFocus();
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
		                            	url: 'frmFeltWiresave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     fwname   : txtFeltWire.getRawValue(),
						     fwcode   : fcode,
                                                     fwtype   : cmbType.getValue(), 

						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    FeltWirePanel.getForm().reset();
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
                            FeltWireWindow.hide();
                    }      
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 485,
                width   : 900,
  
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
                                	width       : 1000,
                                	x           : 0,
                                	y           : 10,
                                    	border      : false,
                                	items: [txtFeltWire]
                          },
                          
                                          
                       flxFeltWireDetails,

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 1000,
                                	x           : 0,
                                	y           : 420,
                                    	border      : false,
                                	items: [cmbType]
                          },

       ]
       
       }
       ]
       
 
});
   
 
 var FeltWireWindow = new Ext.Window({
	height      : 610,
        width       : 1200,
        y           : 30,
        title       :'FELT / WIRE / SCREEN MASTER',
        items       : 'FeltWirePanel',
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
             
            FeltWireWindow.show();  
        });      
   
