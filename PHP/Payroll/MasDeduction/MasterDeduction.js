Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var dcode = 0;

var loadDeductiondatastore = new Ext.data.Store({
      id: 'loadDeductiondatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeductionMaster.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadDeduction"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pdedu_code','pdedu_name'
      ]),
    });	

   function RefreshData(){
        txtDeductionname.setRawValue("");	
	loadDeductiondatastore.load({
        	 url: 'ClsDeductionMaster.php', 
              	 params:
        	 {
                	 task:"loadDeduction"
               	 }
	});	
};

var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxDeductiondetail = new Ext.grid.EditorGridPanel({
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
            {header: "Deduction code", Id: 'pdedu_code', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true },       
            {header: "Deduction Name", Id: 'pdedu_name', sortable:true,width:170,align:'left', menuDisabled: true},
           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('pdedu_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtDeductionname.getValue()) {
    return 'pdedu_name'
    }
}
},
store:loadDeductiondatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDeductiondetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtDeductionname.setValue(selrow.get('pdedu_name'));
			dcode=selrow.get('pdedu_code');

			 flxDeductiondetail .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  
   
var txtDeductionname = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtDeductionname',
        name        : 'txtDeductionname',
        width       :  280,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadDeductiondatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

                    flxDeductiondetail.getStore().filter('pdedu_name', txtDeductionname.getValue());  
            }
        }
  

  });
  


   var Deductionpanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'Deduction MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'Deductionpanel',
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

				if( txtDeductionname.getRawValue() == '' ) 
				{

					alert("Enter Deduction Name");
					txtDeductionname.setFocus();
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
		                            	url: 'FrmMasterDeductionSave.php',
                		       	        params:
						{
						     savetype : saveflag,
						     Deductionname  : txtDeductionname.getRawValue(),
						     Deductioncode   : dcode,
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    Deductionpanel.getForm().reset();
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
                    handler: function(){	
                        DeductionWindow.hide();
                    }                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'Deduction',
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
                                	items: [txtDeductionname]
                          },
                          
                                          
                       flxDeductiondetail,

       ]
       
       }
       ]
       
 
});
   
 
 var DeductionWindow = new Ext.Window({
	height      : 700,
        width       : 1200,
        y           : 50,
        title       :'DEDUCTION MASTER',
        items       : 'Deductionpanel',
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
             
            DeductionWindow.show();  
        });      
   
