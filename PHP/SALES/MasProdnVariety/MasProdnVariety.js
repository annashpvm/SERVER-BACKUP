Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var txtProdnVariety = new Ext.form.TextField({
        fieldLabel  : 'Variety Name',
        id          : 'txtProdnVariety',
        name        : 'txtProdnVariety',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });
	
  var txtGsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGsm',
        name        : 'txtGsm',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
 
 var loadProdnVarGrpDataStore = new Ext.data.Store({
      id: 'loadVargrpDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasProdnVariety.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_grpcode', type: 'int',mapping:'var_grpcode'},
	{name:'var_grpname', type: 'string',mapping:'var_grpname'}
      ]),
    });

var cmbVarSubGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Variety Group',
        width           : 250,
        displayField    : 'var_grpname', 
        valueField      : 'var_grpcode',
        hiddenName      : '',
        id              : 'cmbVarSubGroup',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadProdnVarGrpDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

   function RefreshData(){
        txtProdnVariety.setRawValue("");	
};

   var MasProdnVartyPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasProdnVartyPanel',
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
                    id  : 'save' ,
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

	                	if(txtProdnVariety.getRawValue()=="" || txtProdnVariety.getRawValue()==0)
				{
					alert("Enter Production Main Group Name");
					txtProdSubGroup.setFocus();
				}
                          	else if(txtGsm.getValue()=="" || txtGsm.getValue()==0)
				{
					alert("Enter Print Option");
					txtGsm.setFocus();
				}
                         	else if(cmbVarSubGroup.getRawValue()=="" || cmbVarSubGroup.getValue()==0)
				{
					alert("Select Production Main Grop..");
					cmbVarSubGroup.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You Want to save the Record',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmMasProdnVarietySave.php',
		                                params:
						{

				        	variety    : txtProdnVariety.getRawValue(),		
						gsm        : txtGsm.getValue(),
						vargrpcode : cmbVarSubGroup.getValue() 
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasProdnVartyPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
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
                            MasProdnVarietyWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 270,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtProdnVariety]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbVarSubGroup]
                            },	
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtGsm]
                            } ,
                ]
            }
        ],
    });
    
   
    var MasProdnVarietyWindow = new Ext.Window({
	height      : 380,
        width       : 700,
        y           : 35,
        title       : 'PRODUCTION VARIETY MASTER',
        items       : MasProdnVartyPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtProdnVariety.focus();
	                      }
			
		}
    });
   Ext.getCmp('save').setDisabled(true);
    MasProdnVarietyWindow.show();  
});
