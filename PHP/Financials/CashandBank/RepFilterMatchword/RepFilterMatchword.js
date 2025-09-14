Ext.onReady(function() {
Ext.QuickTips.init();


 
 var LedgerDataStore = new Ext.data.Store({
      id: 'LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
               url: '/SHVPM/Financials/clsFinancials.php',
                method: 'POST'
            }),
            baseParams:{task: "cmbLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_code', direction: "DESC"}
    });

  
 
var cmbLedger = new Ext.form.ComboBox({
        id         : 'cmbLedger',
        fieldLabel : 'Account Name',
        width      : 300,
        store      : LedgerDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        emptyText:'Select Account Name',
        listeners:{
            select :function(){
          
    }
    }

    });

var cmbOption = new Ext.form.ComboBox({
        id         : 'cmbOption',
        fieldLabel : 'Search Option',
        width      : 300,
        store      : ['Anything','Ledger Name','Mode Type','Narration','Reference','Voucher','Voucher Date',
                      'Ledger Amount','Voucher Number','Voucher Type'],
        valueField: 'name',
        displayField: 'name',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        emptyText:'Select Search Option',
        listeners:{
            select :function(){

    }
    }

    });

var cmbType = new Ext.form.ComboBox({
        id         : 'cmbType',
        fieldLabel : 'Search Type',
        width      : 300,
        store      : ['Equal to','Containing','Starting with','Ending with','Not Equal to','Not Containing','Not Starting with',
                      'Not Ending with','CQ','DD','PO'],
        valueField: 'name',
        displayField: 'name',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        emptyText:'Select Search Type',
        listeners:{
            select :function(){

    }
    }

    });


var Fdate = new Ext.form.DateField(
    {
        name: 'Fdate',
        id: 'Fdate',
        format     : 'Y-m-d',
        value      : new Date(),
        fieldLabel: 'From',
        submitFormat: 'Y-m-d',
        allowBlank: false
    }
);

var Tdate = new Ext.form.DateField({
        name: 'Tdate',
        id: 'Tdate',
        format     : 'Y-m-d',
        value      : new Date(),
        fieldLabel: 'To'

    });

var txtValue = new Ext.form.TextField({
        fieldLabel  : 'Search Value',
        id          : 'txtValue',
        name        : 'txtValue',
        width       :  300
   });



var FilterFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'FILTERING',
        width       : 500,
        height      : 400,
        bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'FilterFormPanel',
        method      : 'post',
        layout      : 'absolute',
       
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png'             
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png'             


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png' ,
                    listeners:{
                        click: function(){
                            AgingWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {xtype: 'fieldset',
                title: 'Date',
                layout : 'vbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [Fdate]
                },
                {xtype       : 'fieldset',
                title       : '',
                x           : 220,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [Tdate]
                }
                ]
                },
               {xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                border:true,
                height:160,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 100,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 85,
                items: [cmbLedger]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 85,
                items: [cmbOption]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 85,
                items: [cmbType]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 90,
                border      : false,
                labelWidth  : 85,
                items: [txtValue]
                }
                ]
              }
              
              ]
               });



     var FilterWindow = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : FilterFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        x      : 45,
        y      : 48


    });
       FilterWindow.show();
});
