Ext.onReady(function(){
   Ext.QuickTips.init();
   
   var yearchangeDataStore = new Ext.data.Store({
      id: 'yearchangeDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "YEARFIN"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_id', type: 'int', mapping: 'fin_id'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_id', direction: "ASC"}
    });

   var cmbcompany = new Ext.form.ComboBox({
        fieldLabel      : 'Year',
        width           : 200,
        store      : yearchangeDataStore,
        displayField:'fin_year',
        valueField:'fin_id',
        hiddenName:'fin_year',
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
                        var yearfinid=Ext.getCmp('cmbcompany').getValue();
                        var yearfinraw=Ext.getCmp('cmbcompany').getRawValue();
                        localStorage.setItem("accfinid",yearfinid);
			localStorage.setItem("accfinyear",yearfinraw);
                        window.location.href=('/Financials/GeneralMenuPage.php');
                }
         }
   });

    var CompanyMasWindow = new Ext.Window({
        height      : 100,
        width       : 340,
        y           : 90,
        title       : 'Year Change',
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
               yearchangeDataStore.load({
                    url:'/Modules/UserLogin.php',
                    params:{
                        task:'YEARFIN'
                    }
                });
            }
        }
    });
    CompanyMasWindow.show();
});

