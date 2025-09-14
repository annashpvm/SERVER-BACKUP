Ext.onReady(function(){
   Ext.QuickTips.init();


  var getMillDataStore = new Ext.data.Store({
        id: 'getMillDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findmillname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['company_pass'])
    });


 var loadMillDataStore = new Ext.data.Store({
      id: 'loadMillDataStore',
     proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadmillname"}, // this parameter asks for listing

      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'company_code', type: 'int',mapping:'company_code'},
	{name:'company_name', type: 'string',mapping:'company_name'}
      ]),
    });


 var loadFinYearDataStore = new Ext.data.Store({
      id: 'loadFinYearDataStore',
     proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),

            baseParams:{task:"loadFinYear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'fin_code', type: 'int',mapping:'fin_code'},
	{name:'fin_year', type: 'string',mapping:'fin_year'}
      ]),
    });

var millcode;
var cmbmill = new Ext.form.ComboBox({
        fieldLabel      : 'Company Name',
        width           : 350,
        displayField    : 'company_name', 
        valueField      : 'company_code',
        hiddenName      : '',
        id              : 'cmbmill',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadMillDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,   
        listeners: {
            select: function () {
                getMillDataStore.removeAll();
                getMillDataStore.load({

                    url: 'ClsSalesMain.php', // File to connect to
                    params:
                            {
                                task: "findmillname",
                                millcode:cmbmill.getValue()
                            },
                    callback: function () {
                        var cnt = getMillDataStore.getCount(); 
                        if (cnt > 0) {
                            txtpasswd.setRawValue(getMillDataStore.getAt(0).get('company_pass'));
                       } else {
                            alert('not found'); 
                        } 
                    } 
                });
            }
        } 
   });


var cmbFinYear = new Ext.form.ComboBox({
        fieldLabel      : 'Fin Year',
        width           : 180,
        displayField    : 'fin_year', 
        valueField      : 'fin_code',
        hiddenName      : '',
        id              : 'cmbFinYear',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadFinYearDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true   
   });

   var txtpasswd = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtpasswd',
        name        : 'txtpasswd',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });
function CheckValid()
{
	window.location.href=('SalesMainPage.php');
}

   var SalesLoginPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SALES SYSTEM LOGIN SCREEN',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 500,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'SalesLoginPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        
         items: [
            { xtype   : 'fieldset',
                title  : 'SALES SYSTEM LOGIN SCREEN',   
                layout  : 'hbox',
                border  : true,
                height  : 200,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 30,
                y       : 70,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                 	items: [cmbmill]
                         },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                 	items: [cmbFinYear]
                         },
			 { 
                                	xtype       : 'fieldset',

                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 800,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtpasswd]
                         },
			 
	        ],
            }

      ] ,

     buttonAlign:'center',
     buttons:[
              {text:'Login',handler:CheckValid},{text:'Exit',handler: function () {
                window.open("SalesLoginMenu.php", "_self");
              } 
            
              }]

    });


    var LoginWindow = new Ext.Window({
	height      : 450,
        width       : 650,
        y           : 35,
        title       : 'SALES SYSTEM',
        items       : SalesLoginPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false
  });
    LoginWindow.show();  
});
