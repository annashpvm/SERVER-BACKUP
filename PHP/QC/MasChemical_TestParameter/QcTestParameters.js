Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var scode = 0;

var loadCDParametersdatastore = new Ext.data.Store({
      id: 'loadCDParametersdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadCDParameters"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'

      },[
	'qc_cd_param_code','qc_cd_param_name'
      ]),
    });	



   function RefreshData(){
        txtParameterName.setRawValue("");
        saveflag = "Add";	
	loadCDParametersdatastore.load({
        	 url: '/SHVPM/QC/ClsQC.php', 
              	 params:
        	 {
                	 task:"loadCDParameters"
               	 }
	});	
};

var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxParameter = new Ext.grid.EditorGridPanel({
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
            {header: "Parameter code"    , Id: 'qc_cd_param_code', sortable:true,width:100,align:'left', menuDisabled: true,hidden:true},       
            {header: "Parameter Name", Id: 'qc_cd_param_name', sortable:true,width:230,align:'left', menuDisabled: true},
           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('qc_cd_param_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtParameterName.getValue()) {
    return 'qc_cd_param_name'
    }
}
},
store:loadCDParametersdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxParameter.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtParameterName.setValue(selrow.get('qc_cd_param_name'));
			scode=selrow.get('qc_cd_param_code');
//			alert(scode);
			 flxParameter .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
   
var txtParameterName = new Ext.form.TextField({
        fieldLabel  : 'Parameter Name',
        id          : 'txtParameterName',
        name        : 'txtParameterName',
        width       :  280,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadCDParametersdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                    flxParameter.getStore().filter('qc_cd_param_name', txtParameterName.getValue());  
            }
        }
  

  });
  


   var ParameterPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'ParameterPanel',
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

				if( txtParameterName.getRawValue() == '' ) 
				{

					alert("Enter Parameter Name");
					txtParameterName.setFocus();
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
		                            	url: 'QCTestParameterSave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     ParameterName  : txtParameterName.getRawValue(),
						     ParameterCode  : scode,
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    ParameterPanel.getForm().reset();
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
                            ParameterWindow.hide();
                    }      
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'Chemical Parameter',
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
                                	labelWidth  : 140,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtParameterName]
                          },
                          
                                          
                       flxParameter,

       ]
       
       }
       ]
       
 
});
   
 
 var ParameterWindow = new Ext.Window({
	height      : 560,
        width       : 1200,
        y           : 50,
        title       :'CHEMICAL PARAMETER MASTER',
        items       : 'ParameterPanel',
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
             
            ParameterWindow.show();  
        });      
   
