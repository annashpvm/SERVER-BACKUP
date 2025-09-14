Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;


var loadvarietypmdatastore = new Ext.data.Store({
      id: 'loadvarietypmdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsvarietypmmaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadvarietypm"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_name','var_decklewidth','var_machspeed','var_power_req','var_stream_req','var_desc'
      ]),
    });	

   function RefreshData(){
        txtvarietypmname.setRawValue("");	
	loadvarietypmdatastore.load({
        	 url: 'clsvarietypmmaster.php', 
              	 params:
        	 {
                	 task:"loadvarietypm"
               	 }
	});	
};

  
   var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxvarietypmdetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 700,
        x: 0,
        y: 330,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid',  

           
        columns: [
         {header: "Name"    , Id: 'var_name', sortable:true,width:100,align:'left', menuDisabled: true},      
           {header: "DeckleWidth"    , Id: 'var_decklewidth', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "MachineSpeed", Id: 'var_machspeed', sortable:true,width:100,align:'left', menuDisabled: true},
            {header: "PowerRequired", Id: 'var_power_req', sortable:true,width:100,align:'left', menuDisabled: true},
             {header: "StreamRequired", Id: 'var_stream_req', sortable:true,width:100,align:'left', menuDisabled: true},
             {header: "Desc", Id: 'var_desc', sortable:true,width:100,align:'left', menuDisabled: true},
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('var_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtvarietypmname.getValue()) {
    return 'var_name','var_decklewidth','var_machspeed','var_power_req','var_stream_req','var_desc'
    }
}
},

store:loadvarietypmdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxvarietypmdetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
			
			txtvarietypmname.setValue(selrow.get('var_name'));
			txtdecklewidth.setValue(selrow.get('var_decklewidth'));
			txtmachspeed.setValue(selrow.get('var_machspeed'));
			txtpowerreq.setValue(selrow.get('var_power_req'));
			txtstreamreq.setValue(selrow.get('var_stream_req'));
			txtdesc.setValue(selrow.get('var_desc'));
         	        flxvarietypmdetail .getSelectionModel().clearSelections();
			}

                 
   }
    

   });
   
 

 var txtvarietypmname = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtvarietypmname',
        name        : 'txtvarietypmname',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
  
  var txtdesc = new Ext.form.TextField({
        fieldLabel  : 'Desc',
        id          : 'txtdesc',
        name        : 'txtdesc',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
 
 
 
   
var txtdecklewidth = new Ext.form.TextField({
        fieldLabel  : 'Deckle Width',
        id          : 'txtdecklewidth',
        name        : 'txtdecklewidth',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
  
  var txtpowerreq = new Ext.form.TextField({
        fieldLabel  : 'Power Required',
        id          : 'txtpowerreq',
        name        : 'txtpowerreq',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
  
  
  
  var txtmachspeed = new Ext.form.TextField({
        fieldLabel  : 'Machine Speed',
        id          : 'txtmachspeed',
        name        : 'txtmachspeed',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
  
   var txtstreamreq = new Ext.form.TextField({
        fieldLabel  : 'Stream Required',
        id          : 'txtstreamreq',
        name        : 'txtstreamreq',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
 
 
  

   var varietypmpanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    header      : true,
    width       :800,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'varietypmpanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 80,
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

				if( txtvarietypmname.getRawValue() == '' ) 
				{

					alert("Enter Varietyparameter Name");
					txtvarietypmname.setFocus();
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
		                            	url: 'frmvarietypmmastersave.php',
                		       	        params:
						{
						    
						     varietymasname   : txtvarietypmname.getRawValue(),
						     varietymasdecklewidth:txtdecklewidth.getRawValue(),
						     varietymasmacspeed:txtmachspeed.getRawValue(),
						     varietymaspowerreq:txtpowerreq.getRawValue(),
						     varietymasstreamreq:txtstreamreq.getRawValue(),
						     varietymasdesc:txtdesc.getRawValue(),
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    varietypmpanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
                                             												
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
					                                                    
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
                            VarietypmWindow.hide();
                        }
   
                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'VARIETY PARAMETER',
                layout  : 'hbox',
                border  : true,
                height  : 520,
                width   : 900,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 25,	
                items:[
                
                	{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:360,
	    		x	:20,
	    		y	:20,
	    		border	:false,
	    		items:[txtvarietypmname]
	    		},
	    	
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtdecklewidth]
                          },
                          
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtmachspeed]
                          },
                        
                            
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 145,
                                    	border      : false,
                                	items: [txtpowerreq]
                          },
                          
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 185,
                                    	border      : false,
                                	items: [txtstreamreq]
                          },
                          
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 225,
                                    	border      : false,
                                	items: [txtdesc]
                          },
                          flxvarietypmdetail,
                                        
                        ]
       
       }
       ]
       
 
});
   
 
 var VarietypmWindow = new Ext.Window({
	height      : 700,
        width       : 1200,
        y           : 50,
        title       :'VARIETY PARAMETER MASTER',
        items       : 'varietypmpanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){
       
             }
             }
            });
             
            VarietypmWindow.show();  
        });      
   
