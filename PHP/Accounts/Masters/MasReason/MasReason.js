
Ext.onReady(function() {
Ext.QuickTips.init();


var currencyDataStore = new Ext.data.Store({
      id: 'currencyDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "currency"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'currency_code', type: 'int', mapping: 'currency_code'},
        {name: 'currency_name', type: 'string', mapping: 'currency_name'}
      ]),
      sortInfo:{field: 'currency_code', direction: "ASC"}
    });





 var txtcurtext = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtcur',
        name        : 'txtcur',
        width       :  200,
     //   style  :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

var cmbcurrency = new Ext.form.ComboBox({
        id         : 'cmbcurrency',
        fieldLabel : 'Currency',
        width      : 200,
        store      : currencyDataStore,
        displayField:'currency_name',
        valueField:'currency_code',
        hiddenName:'currency_name',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true
    });

 var txtsymbol = new Ext.form.TextField({
        fieldLabel  : 'Currency Symbol',
        id          : 'txtsymbol',
        name        : 'currencysy',
        width       :  200,
     //   style  :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtreason = new Ext.form.TextField({
        fieldLabel  : 'Reason',
        id          : 'txtreason',
        name        : 'txtreason',
        width       :  200,
        style  :  {textTransform: "uppercase"},
        allowBlank  :  false
    });





var reasonFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),

        xtype       : 'form',
        title       : 'Reason Master',
        width       : 600,
        height      : 200,
      bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RegionFormPanel',
        method      : 'post',
        layout      : 'absolute',
tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: ' Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:30,width:100,
                    align : 'right',
                    icon: '../kgsoft/ico/Add.png'

                },'-',
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:30,width:70,
                    icon: '../kgsoft/ico/edit.png'
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../kgsoft/ico/save.png',
                    listeners:{
                    click:function(){
                     reasonFormPanel.getForm().submit({

                     url: 'reasonsave.php',
                       params:
                        {

                            reasonname:txtreason.getRawValue()
                            
                          },


                        success:function()
                             {
                              Ext.MessageBox.alert("Alert","Saved");
                              reasonFormPanel.getForm().reset();
                             },
                          failure:function()
                             {
                              Ext.MessageBox.alert("Alert","Not Saved");
                             }

                    });


                  }

                }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../kgsoft/ico/refresh.png'
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../kgsoft/ico/view.png',
                     //fp.getForm().reset();
 listeners:{
                        click:
                           function () {

}
}
},'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../kgsoft/ico/exit.png',

                    listeners:{
                        click: function applywin(){
                        myWin.hide();

    }
                    }
                }
                ]
            },
         items:[
           

                { xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 80,
                y           : 30,
                border      : false,
                labelWidth  : 100,
                items: [txtreason]
                }

               ]
    });



     var reasonWindow = new Ext.Window({
        height      : 200,
        width       : 600,
        items       : reasonFormPanel,
        closable    : true,maximized:true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
   bodyStyle:{"background-color":"#3399CC"},
        y:90
    });
       reasonWindow.show();
});
