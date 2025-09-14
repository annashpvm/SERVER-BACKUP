Ext.onReady(function(){
   Ext.QuickTips.init();
   
   var CompDataStore = new Ext.data.Store({
      id: 'CompDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "acccompany"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'comp_code', type: 'int', mapping: 'comp_code'},
        {name: 'comp_name', type: 'string', mapping: 'comp_name'}
      ]),
      sortInfo:{field: 'comp_code', direction: "ASC"}
    });

   var cmbcompany = new Ext.form.ComboBox({
        fieldLabel      : 'Comapany',
        width           : 200,
        store      : CompDataStore,
        displayField:'comp_name',
        valueField:'comp_code',
        hiddenName:'comp_name',
        id:'cmbcompany',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
        allowblank:false,
         listeners:{
                select:function(){
                        var gstcompcode=Ext.getCmp('cmbcompany').getValue();
                        var gstcompname=Ext.getCmp('cmbcompany').getRawValue();
                         localStorage.setItem("acccompcode",gstcompcode);
                        // localStorage.setItem("acccompcode",gstcompname); 
                         window.location.href=('/Financials/GeneralMenuPage.php');
	
                }
         }
   });

    var CompanyMasWindow = new Ext.Window({
        height      : 100,
        width       : 340,
        y           : 90,
        title       : 'Division Change',
        layout      : 'fit',
        closable    : true,
        bodyStyle:{"background-color":"#3399CC"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
          items       : [
                     {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 500,
                        x           : 100,
                        y           : 100,
                        border      : false,
                        items: [cmbcompany]
                    }],
        listeners   :{
            show:function(){
               CompDataStore.load({
                    url:'/Modules/UserLogin.php',
                    params:{
                        task:'acccompany'
                    }
                });
            }
        }
    });
    CompanyMasWindow.show();
});

