Ext.onReady(function(){
   Ext.QuickTips.init();
   
   var yearchangeDataStore = new Ext.data.Store({
      id: 'yearchangeDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsYearChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadFinYears"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_code', type: 'int', mapping: 'fin_code'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_id', direction: "ASC"}
    });

   var cmbYear = new Ext.form.ComboBox({
        fieldLabel      : 'Year',
        width           : 200,
        store      : yearchangeDataStore,
        displayField:'fin_year',
        valueField:'fin_code',
        hiddenName:'fin_year',
        id:'cmbYear',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
        allowblank:false,
         listeners:{
                select:function(){
			var finid=Ext.getCmp('cmbYear').getValue();
			var gstFinyear=Ext.getCmp('cmbYear').getRawValue();		    
			var finstdate=gstFinyear.substr(0,4) + '-04-01';
			var fineddate=gstFinyear.substr(5,4) + '-03-31';
			localStorage.setItem("ginfinid",finid);	
			localStorage.setItem("gstyear",gstFinyear);
			localStorage.setItem("gfinstdate",finstdate);
			localStorage.setItem("gfineddate",fineddate);
                         window.location.href=('/SHVPM/Stores/StoresMainPage.php');
                }
         }
   });

    var FinYearMasWindow = new Ext.Window({
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
                        y           : 110,
                        border      : false,
                        items: [cmbYear]
                    }],
        listeners   :{
            show:function(){
               yearchangeDataStore.load({
                    url:'ClsYearChange.php',
                    params:{
                        task:'loadFinYears'
                    }
                });
            }
        }
    });
    FinYearMasWindow.show();
});

 
