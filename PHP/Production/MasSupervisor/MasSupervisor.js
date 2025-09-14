Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var svcode = 0;
var spvrtype= "M";
var loadsupervisordatastore = new Ext.data.Store({
      id: 'loadsupervisordatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clssupervisormaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadsupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code','spvr_name','spvr_type','stype',
      ]),
    });	

   function RefreshData(){
        txtsupervisorname.setRawValue("");	
	loadsupervisordatastore.load({
        	 url: 'clssupervisormaster.php', 
              	 params:
        	 {
                	 task:"loadsupervisor"
               	 }
	});	
};

var fm = Ext.form;    
   var dgrecord = Ext.data.Record.create([]);
   var flxsupervisordetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 600,
        x: 0,
        y: 170,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid',  

           
        columns: [    
            {header: "Supervisor code"    , Id: 'spvr_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Supervisor Name", Id: 'spvr_name', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "Supervisor Type", Id: 'spvr_type', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "SType", Id: 'stype', sortable:true,width:170,align:'left', menuDisabled: true},
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('spvr_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtsupervisorname.getValue()) {
    return 'spvr_name'
    }
}
},
store:loadsupervisordatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxsupervisordetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtsupervisorname.setValue(selrow.get('spvr_name'));
			svcode=selrow.get('spvr_code');
			//alert(svcode);
			 flxsupervisordetail .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
   
var txtsupervisorname = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtsupervisorname',
        name        : 'txtsupervisorname',
        width       :  200,
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
         style       :  {textTransform: "uppercase"},

	tabindex : 2,
	store       : loadsupervisordatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                    flxsupervisordetail.getStore().filter('spvr_name', txtsupervisorname.getValue());  
            }
        }
  

  });
  
var optspvrtype = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width:600,
    height:70,
    x:80,
    y:10,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optshade',
        items: [
            {boxLabel: 'MCOPERATOR', name: 'optspvrtype', id:'optMCOPERATOR', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     spvrtype = "M";
                    
                  }
               }
              }
            },
            {boxLabel: 'REWINDEROPERATOR', name: 'optspvrtype', id:'optREWINDEROPERATOR', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   spvrtype = "R";
                
               }
              }
             }},
              {boxLabel: 'SHIFTINCHARGE', name: 'optspvrtype', id:'optSHIFTINCHARGE', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   spvrtype = "S";
                  
               }
              }
             }},
            ]
             }
             ]
             });


   var supervisorpanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SUPERVISOR MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'supervisorpanel',
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

				if( txtsupervisorname.getRawValue() == '' ) 
				{

					alert("Enter Supervisor Name");
					txtsupervisorname.setFocus();
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
		                            	url: 'frmsupervisormastersave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     supermasname  : txtsupervisorname.getRawValue(),
						     supermascode   : svcode,
						     supermastype   : spvrtype,
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    supervisorpanel.getForm().reset();
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
                  
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,

			listeners:{
			click: function(){
				SupervisorWindow.hide();
			   }
			}
                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'SUPERVISOR',
                layout  : 'hbox',
                border  : true,
                height  : 520,
                width   : 800,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 25,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 20,
                                	y           : 95,
                                    	border      : false,
                                	items: [txtsupervisorname]
                          },
                          
                                          
                       flxsupervisordetail,
			optspvrtype,
       ]
       
       }
       ]
       
 
});
   
 
 var SupervisorWindow = new Ext.Window({
	height      : 700,
        width       : 1200,
        y           : 50,
        title       :'SUPERVISOR MASTER',
        items       : 'supervisorpanel',
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
             
            SupervisorWindow.show();  
        });      
   
