Ext.onReady(function() {
Ext.QuickTips.init();
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
   
   
   var VoucherTypeDatastore = new Ext.data.Store({
        id: 'VoucherTypeDatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials2A.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "VoucherType"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'vchtype'
        ])
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

 var gstabs = "N";
    var chkNew = new Ext.form.Checkbox({
        id         : 'chkNew',
        xtype      : 'checkbox',
        fieldLabel : '',
        boxLabel   : 'NewFormat',
        inputValue : 'NewFormat',
        listeners:{
            'check': function(rb,checked){
                if(checked === true){
                    gstabs = "Y";
                } else {
                    gstabs = "N";
                }
            }
        }
    });

    var cmbvchtype = new Ext.form.ComboBox({
        fieldLabel: 'Voucher Type',
        width: 100,
        store: VoucherTypeDatastore,
        displayField: 'vchtype',
        valueField: 'vchtype',
        hiddenName: 'vchtype',
        id: 'cmbvchtype',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
              
            }, blur: function () {
                
            }
        }
    });



var gstoption="A";
var gstrpttype="D";
var gstseloption="A";
var JournalRegiterFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Journal Register',
        width       : 500,
        height      : 400,
      bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'JournalRegiterFormPanel',
        method      : 'post',
        layout      : 'absolute',
       
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',icon: '/Pictures/refresh.png',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',icon: '/Pictures/view.png',
                    tooltip: 'View Details...', height: 40,
                   listeners:{
                        click:
                          function () {

                    var form = JournalRegiterFormPanel.getForm();
                    if (form.isValid()) {

                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";
                    var voutype=Ext.getCmp('cmbvchtype').getRawValue();
                    var vou = "&voutype="+encodeURIComponent(voutype);
                    var fd = "&fmdate="+encodeURIComponent(d1);
                    var td = "&tdate="+encodeURIComponent(d2);
                    var comp = "&comp="+encodeURIComponent(compcode);

                    var test = (vou+fd+td+comp) ;
                    if(gstabs=='Y')
                    {
                     if (gstrpttype=='D')
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccDebitNoteRegisterNewformat.rptdesign'+test,  '_blank' );
                     }

                     }
                    if(gstabs=='N')
                    {
                     if (gstrpttype=='D')
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepDebitNoteRegister.rptdesign'+test,  '_blank' );
                     }
                     if(gstrpttype=='A')
                     {
                      window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepDebitNoteRegisterAmountwise.rptdesign'+test,  '_blank' );
                     }
                     }


                    }
                    }

                   }


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',icon: '/Pictures/exit.png',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            JournalRegiterWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:60,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                /*{
                xtype   : 'radiogroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns : 3,
                items: [
                    {boxLabel: 'Expenses', name: 'OptType', id:'optExpenses',inputValue: 1,checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="A";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Work Order', name: 'OptType',id:'optWorkOrder', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="B";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Work Order VM', name: 'OptType', id:'optWorkOrderVM',inputValue:3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="C";
                     }
                     }
                     }
                    }
                   ]
                }*/
                  { xtype       : 'fieldset',
                title       : '',
                x           : 70,
                y           : 0,
                border      : false,
                labelWidth  : 100,
                width:300,
                items: [cmbvchtype]
                }
                
                ]
              },
               {xtype: 'fieldset',
                title: 'Date',
                layout : 'hbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 70,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [Fdate]
                },
                { xtype       : 'fieldset',
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
                title: 'Option',
                layout : 'vbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 150,
             items:[
                    {
                    xtype   : 'radiogroup',
                    border  :  false,
                    x       : 0,
                    y       : 0,
                    columns : 2,
                    items: [
                        {boxLabel: 'DateWise', name: 'OptRptType', id:'optDetailed',inputValue: 1,checked: true,
                        listeners:{
                        'check':function(rb,checked){
                         if(checked==true){
                          gstrpttype="D";
                         }
                        }
                        }
                        },
                        {boxLabel: 'AmountWise', name: 'OptRptType',id:'optConsolidated', inputValue: 2,
                         listeners:{
                        'check':function(rb,checked){
                         if(checked==true){
                          gstrpttype="A";
                         }
                        }
                        }
                        }
                       ]
                    }
                 ]},
                { xtype     : 'fieldset',
                title       : '',
                x           : 220,
                y           : 230,
                border      : false,
                labelWidth  : 70,
                items: [chkNew]
                }
              
              ]
               });



     var JournalRegisterWindow = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : JournalRegiterFormPanel,bodyStyle:{"background-color":"#3399CC"},
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        y      : 120,
        listeners:
            {
                show:function(){
 			VoucherTypeDatastore.load({
                      url: '/SHVPM/Financials/clsFinancials2A.php',
                       params: {
                           task: 'VoucherType'
                       }
                    });
                }
            }

    });
       JournalRegisterWindow.show();
});
