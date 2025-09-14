Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

var txtwoname = new Ext.form.TextField({
        fieldLabel  : 'Wo Name',
        id          : 'txtwoname',
        name        : 'txtwoname',
        width       :  350,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });
	

 var txtpurpose = new Ext.form.TextField({
        fieldLabel  : 'Purpose',
        id          : 'txtpurpose',
        name        : 'txtpurpose',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 
   function RefreshData(){
        txtpurpose.setRawValue("");
	txtwoname.setRawValue("");
	
};

   var MasWoformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WORKORDER MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasWoformpanel',
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

				if(txtwoname.getRawValue()=="" || txtwoname.getRawValue()==0)
				{
					alert("Enter Lotno");
					txtwoname.focus();
				}
				else if(txtpurpose.getRawValue()=="" || txtpurpose.getRawValue()==0)
				{
					alert("Enter Remarks");
					txtpurpose.focus();
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
		                            	url: 'FrmMasWoSave.php',
                		       	        params:
						{
							purpose : txtpurpose.getRawValue(),
							woname : txtwoname.getRawValue()
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasWoformpanel.getForm().reset();
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
                            MasWoWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'WORKORDER MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 130,
                width   : 500,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtwoname]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtpurpose]
                            }
                ]

            }
            
        ],
    });
    
   
    var MasWoWindow = new Ext.Window({
	height      : 230,
        width       : 550,
        y           : 35,
        title       : 'WORKORDER MASTER',
        items       : MasWoformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtwoname.focus();
	   			 }
			
		}
    });
    MasWoWindow.show();  
});
