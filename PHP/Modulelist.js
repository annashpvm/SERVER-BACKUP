Ext.onReady(function(){
   Ext.QuickTips.init();
   var ginuser = localStorage.getItem("ginuser");
   var gincomp = localStorage.getItem("gincompcode");
   var ginuser = localStorage.getItem("ginuser");
   var gincompname = localStorage.getItem("gstcompany");

   var gstModurl = "";
var modtype = "";
   
   var txtName = new Ext.form.TextField({
     //   fieldLabel  : 'Modules',
        id          : 'txtName',
        width       : 250,
        name        : 'name',
 style:{
             color: 'Blue' ,
             backgroundColor:'DarkBlue'
	     
        },
   });
   
   var ModulesnameDataStore = new Ext.data.Store({
      id: 'ModulesnameDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadmodule"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'modseqno', type: 'int', mapping: 'modseqno'},
        {name: 'modname', type: 'string', mapping: 'modname'}
      ]),
      sortInfo:{field: 'modname', direction: "ASC"}
   });
   
   var ModuleUrlDataStore = new Ext.data.Store({
      id: 'ModuleUrlDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "modurl"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['modurl','modflag'])
   });



   
   var lstModulename = new Ext.ux.form.MultiSelect({
        fieldLabel: '',
        width: 250,
        height: 250,
        allowBlank:true,
        id:'lstModulename',
        name:'lstModulename',
        mode: 'local',
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        store: ModulesnameDataStore,
        displayField:'modname',
        valueField: 'modseqno',
        selectOnFocus:true,
 	style:{
             color: '#2d3838' 	     
        },

        listeners:{
            click: function(){
                txtName.setRawValue(this.getRawValue());
		//alert(txtName.getRawValue());
		//alert(ginuser);
		ModuleUrlDataStore.removeAll();
                ModuleUrlDataStore.load({
                    url: 'clsuser.php',
                    params: {
                        task: 'modurl',
                        modulename:txtName.getRawValue(),
			moduser : ginuser
                    },
                    callback: function(){

                       gstModurl = ModuleUrlDataStore.getAt(0).get('modurl');
                       modtype = ModuleUrlDataStore.getAt(0).get('modflag');

			Ext.Ajax.request({
				    url: 'menuchk.php',
				    params: {
				        username: ginuser,
					flag : modtype
				    },
				success: function(response){
			        var text = response.responseText;
			        if(text == "success")
			        {
			window.location.href=(gstModurl);
			localStorage.setItem("indusr",modtype); 
		        	}
		        	else
				{
		        	Ext.Msg.alert('Message',text);
				}
			    }
			         
			});
                    }
                });

			
            }
        }
   });
   
   var ModulesListFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'MODULES LIST',
        header      : false,
        width       : 320,	
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false, 
        id          : 'ModulesListFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        bodyStyle: {"background-color": "#b5b4b1"},
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        items: [
            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 400,
                height      : 500,
                x           : 0,
                y           : 0,
                border      : true,
                layout      : 'absolute',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 370,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtName]
                    }, 
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 280,
                        height      : 400,
                        x           : 0,
                        y           : 23,
                        border      : false,
                        items: [lstModulename]
                    }
                ]
            }
            
        ]
    });
    
    var ModulesListWindow = new Ext.Window({
	height      : 400,
        width       : 320,
//        html: '<img src="/Pictures/HDlog.jpg"/>',
//        html: '<img src="d:/SHVPM LOGO/logo.jpg"/>',
        bodyStyle: {"background-color": "yellow"},
        y           : 150,
	x	: 780,
        title       : '....................................MODULES LIST......................................',
        items       : ModulesListFormPanel,	
        layout      : 'fit',
	hideHeaders:true,
        closable    : false,
        minimizable : false,
        maximizable : false,
        resizable   : false,
        border      : true,
        draggable   : false,
        listeners:
            {
                show:function(){ 
                       ModulesnameDataStore.load({
                       url: 'clsuser.php',
                       params: {
                           task: 'loadmodule'
                       }
                    });
                }
            }
    });
    ModulesListWindow.show();  
});
