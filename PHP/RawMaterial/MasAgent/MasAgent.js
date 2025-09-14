Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

var txtagentname = new Ext.form.TextField({
        fieldLabel  : 'Agent Name',
        id          : 'txtagentname',
        name        : 'txtagentname',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });
	

   function RefreshData(){
        txtagentname.setRawValue("");	
};

   var MasAgentformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'AGENT MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasAgentformpanel',
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

				if(txtagentname.getRawValue()=="" || txtagentname.getRawValue()==0)
				{
					alert("Enter AgentName");
					txtlotno.setFocus();
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
		                            	url: 'FrmMasAgentSave.php',
                		       	        params:
						{
							agentname : txtagentname.getRawValue()
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
						    MasAgentformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasAgentformpanel.getForm().reset();
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
                            MasAgentWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'AGENT MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 90,
                width   : 400,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtagentname]
                            }
                ]

            }
            
        ],
    });
    
   
    var MasAgentWindow = new Ext.Window({
	height      : 200,
        width       : 450,
        y           : 35,
        title       : 'AGENT MASTER',
        items       : MasAgentformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtagentname.focus();
	   			 }
			
		}
    });
    MasAgentWindow.show();  
});
