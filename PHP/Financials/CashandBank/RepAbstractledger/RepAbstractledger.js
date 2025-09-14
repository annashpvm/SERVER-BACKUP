Ext.onReady(function(){
    Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('acccompcode');
var ginfinid = localStorage.getItem('accfinid');
    
   var dtpFromdate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpFromdate',
        name       : 'pack_date',
        format     : 'Y-m-d',
        value      : new Date()
   });

   var dtpTodate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpTodate',
        name       : 'bl_date',
        format     : 'Y-m-d',
        value      : new Date()
   }); 
   
   
    var AccnameDataStore = new Ext.data.Store({
      id: 'AccnameDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "LED"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'ledcode', type: 'int',   mapping:'led_code'},
        {name: 'ledname', type: 'string', mapping:'led_name'}
      ])
    });
    
         var cmbAccountname = new Ext.form.ComboBox({
        fieldLabel      : 'Account Name',
        width           : 350,
        displayField    :'ledname',
        valueField      :'ledcode',
        hiddenName      :'ledname',
        id              :'cmbAccountname',
        store           : AccnameDataStore,
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   :false,
        editable        : true,
        allowblank      :false

    });
   
    
    

   

    var pnlstpstd = new Ext.Panel({
        title       : 'Ledger Abstract',
        id          : 'pnlstpstd',
        width       : 500,        bodyStyle:{"background-color":"#20B2AA"},
        height      : 600,
        x           : 5,
        y           : 5,
        border      : true,
        layout      : 'absolute'
    });
    
   
      

    var WRFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Abstract',
        width       : 500,
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'WRFormPanel',            bodyStyle:{"background-color":"#3399CC"},
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['cust_name']),
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #3399CC;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                            var form = WRFormPanel.getForm();
                            if (cmbAccountname.getRawValue()=="" ){
                                Ext.MessageBox.alert("Alert","Select Account Name...");
                            }
                            else {
                            if (form.isValid())  {
                                var finid=23; 
                                var compcode=1;

                                var fdate=Ext.getCmp('dtpFromdate').value;
                                var tdate=Ext.getCmp('dtpTodate').value;
                                var d1 =  fdate + " 00:00:00.000";
                                var d2 =  tdate + " 23:59:59.000";
                               
                                var d3 = cmbAccountname.getValue();
                                var d4 = cmbAccountname.getRawValue();
                                
                                var p1 = "&ledcode="+encodeURIComponent(d3);
                                var p2 = "&compcode="+encodeURIComponent(GinCompcode);
                                var p3 = "&finid="+encodeURIComponent(ginfinid);
                                var p4 = "&fromdate="+encodeURIComponent(d1);
                                var p5 = "&todate="+encodeURIComponent(d2);
                                var p6 = "&outpara1="+encodeURIComponent(d4);
                                
                                var test = (p1+p2+p3+p4+p5+p6);
                                window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/acc_sp_rep_abstractledger.rptdesign' + test,  '_blank' );
                            }
                            }
                         }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            AbstractLedgerWindow.hide();
                        }
                    }
                }]
        },
        items       : [
                    {
                        xtype   : 'fieldset',
                        title   : 'Date',
                        layout  : 'hbox',
                        border  : true,
                        height  : 80,
                        width   : 420,
                        layout  : 'absolute',
                        x       : 10,
                        y       : 0,
                        
                        items:[
                        { xtype     : 'fieldset',
                          title     : 'From',
                          x         : 0,
                          y         : 0,
                          border    : false,
                          labelWidth: 30,
                          items     : [dtpFromdate]
                        },
                        { xtype     : 'fieldset',
                          title     : 'To',
                          x         : 200,
                          y         : 0,
                          border    : false,
                          labelWidth: 30,
                          items     : [dtpTodate]
                        }
                        ]
                    },
                {   xtype       : 'fieldset',
                    title       : 'Account',
                    layout      : 'hbox',
                    labelWidth  : 20,
                    height      : 77,
                    width       : 420,
                    x           : 10,
                    y           : 80,
                    border      : true,
                    layout      : 'absolute',
                    items: [{
                        xtype       : 'fieldset',
                        title       : '',
                        layout      : 'hbox',
                        labelWidth  : 20,
                        height      : 200,
                        width       : 400,
                        x           : 10,
                        y           : 10,
                        border      : false,
                        layout      : 'absolute',
                        items: [cmbAccountname]
                        }
                    ]
                  }
                    
            ]
    });
    
    
    var AbstractLedgerWindow = new Ext.Window({
	height      : 300,
        width       : 500,
        y           : 120,
        items       : WRFormPanel,          bodyStyle:{"background-color":"#3399CC"},
        layout      : 'fit', 
        //layout      : 'absolute',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners:
            {
                show:function(){
                AccnameDataStore.load({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'LED'
                       }
                });
                //Ext.getCmp('cmbAccountname').bindStore(AccnameDataStore);                
                }
            }
    });
    AbstractLedgerWindow.show();  
});
