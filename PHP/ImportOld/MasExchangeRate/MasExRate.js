Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
//var gstGroup;

 var loadyeardatastore = new Ext.data.Store({
      id: 'loadyeardatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasExRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'state_code', type: 'int',mapping:'state_code'},
	{name:'state_name', type: 'string',mapping:'state_name'}
      ]),
    });
	
var loadmonthdatastore = new Ext.data.Store({
      id: 'loadmonthdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasExRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadtype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmg_code', type: 'int',mapping:'itmg_code'},
	{name:'itmg_name', type: 'string',mapping:'itmg_name'}
      ]),
    });
	
	var txtcustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtcustomer',
        name        : 'txtcustomer',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });


var cmbmonth = new Ext.form.ComboBox({
        fieldLabel      : 'Month',
        width           : 250,
        displayField    : 'itmg_name', 
        valueField      : 'itmg_code',
        hiddenName      : '',
        id              : 'cmbmonth',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadmonthdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbcurrency = new Ext.form.ComboBox({
        fieldLabel      : 'Currency',
        width           : 250,
        displayField    : 'itmg_name', 
        valueField      : 'itmg_code',
        hiddenName      : '',
        id              : 'cmbcurrency',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadmonthdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbyear = new Ext.form.ComboBox({
        fieldLabel      : 'Year',
        width           : 250,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbyear',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadyeardatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });


 var txtremarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
        width       :  250,
	height	    : 50,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var txtcurrval = new Ext.form.NumberField({
        fieldLabel  : 'Currency Value',
        id          : 'txtcurrval',
        name        : 'txtcurrval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
  function RefreshData(){
txtcurrval.setValue("");
cmbyear.setValue("");
cmbmonth.setValue("");

};

   var MasExRateFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'EXCHANGE RATE MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 340,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasExRateFormpanel',
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
				if(cmbyear.getRawValue()=="" || cmbyear.getValue()==0)
				{
					alert("Select Year..");
					cmbyear.setFocus();
				}
				else if(cmbmonth.getRawValue()=="" || cmbmonth.getValue()==0)
				{
					alert("Select Month..");
					cmbmonth.setFocus();
				}
				else if(txtcurrval.getRawValue()=="" )
				{
					alert("Enter Currency Value..");
					txtcurrval.setFocus();
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
		                            	url: 'MasExRateSave.php',
                		       	        params:
						{
						state : cmbyear.getValue(),
						type : cmbmonth.getValue(),
						pincode : txtcurrval.getValue()
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                              //      msg: 'Item Name Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{*/
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasExRateFormpanel.getForm().reset();
							RefreshData();
							/*}
							}
                                                	});*/
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
                                                       /* }
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
                            MasExRateWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'EXCHANGE RATE MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 280,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 420,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbyear]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbmonth]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbcurrency]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 220,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtcurrval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtremarks]
                            }
              ]

            }
            
        ],
    });
    
   
    var MasExRateWindow = new Ext.Window({
	height      : 380,
        width       : 580,
        y           : 35,
        title       : 'EXCHANGE RATE MASTER',
        items       : MasExRateFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtcustomer.setfocus();
			loadyeardatastore.removeAll();
			loadyeardatastore.load({
                        	 url:'ClsMasExRate.php',
                        	 params:
                       		 {
                         	 task:"loadstate"
                        	 }
				 });

			loadmonthdatastore.removeAll();
			loadmonthdatastore.load({
                        	 url:'ClsMasExRate.php',
                        	 params:
                       		 {
                         	 task:"loadtype"
                        	 }
				 });
			
	   		
			 }
		}
    });
    MasExRateWindow.show();  
});
