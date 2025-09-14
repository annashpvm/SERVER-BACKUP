Ext.onReady(function() {
Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('acccompcode');
   var GinFinid = localStorage.getItem('accfinid');

 var BankDataStore = new Ext.data.Store({
      id: 'BankDataStore',
      proxy: new Ext.data.HttpProxy({
               url: '/SHVPM/Financials/clsRepFinancials.php',
                method: 'POST'
            }),
            baseParams:{task: "BANK",
			comp : GinCompcode}, // this parameter asks for listing
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



 var gstledcode;
 var gstaccname;
  var cmbBank = new Ext.form.ComboBox({
        id         : 'cmbBank',
        fieldLabel : 'Account Name',
        width      : 320,
        store      : BankDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Account Name',
        listeners:{
            select :function(){
            gstledcode=this.getValue();
            gstaccname=this.getRawValue();
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



var gstoption="B";

var BankPaymentRegisterFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bank Payment Register',
        width       : 500,
        height      : 350,
               bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'BankPaymentRegisterFormPanel',
        method      : 'post',
        layout      : 'absolute',

        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
               
                {
                    text: 'Refresh', icon: '/Pictures/refresh.png',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                 {
                    text: 'View',
                    style  : 'text-align:center;',icon: '/Pictures/view.png',
                    tooltip: 'View Details...', height: 40,
                     listeners:{
                        click:
                          function () {
                    var form = BankPaymentRegisterFormPanel.getForm();
                    if (form.isValid()) {

                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";
                    var comcode=1;
                    var finid=22;

                    var led="&ledcode="+encodeURIComponent(gstledcode);
                    var com="&compcode="+encodeURIComponent(GinCompcode);
                    var fin="&finid="+encodeURIComponent(GinFinid);
                    var fd = "&fmdate="+encodeURIComponent(d1);
                    var td = "&todate="+encodeURIComponent(d2);
                    var lename="&ledname="+encodeURIComponent(gstaccname);
                    var bk="&bank="+encodeURIComponent(gstaccname);

                     if (gstoption=='P')
                     {
                     var test = (led+fin+com+fd+td) ;
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchasePayment.rptdesign'+test,  '_blank' );
                     }
                     else if(gstoption=='Q')
                     {
                     var test = (fin+com+fd+td) ;
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBankPaymentSummary.rptdesign'+test,  '_blank' );
                     }
                     else if(gstoption=='B')
                     {
                     var test = (fin+com+fd+td) ;
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBankPayment.rptdesign'+test,  '_blank' );
                     }
                     else if(gstoption=='D')
                     {
                     var test = (fin+com+fd+td+bk) ;
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBankReceiptDatewise.rptdesign'+test,  '_blank' );
                     }
                    }
                    }
                    }


                 },'-',


                {
                    text: 'Exit', icon: '/Pictures/exit.png',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            BankPaymentRegisterWindow.hide();
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
                height:140,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                
                {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 30,
                y       : 0,
                columns : 2,
                items: [
                    {boxLabel: 'BankWise', name: 'OptType', id:'optBank',inputValue: 1,checked: true,height:30,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="B";
                     }
                     }
                     }
                    },
                    {boxLabel: 'DateWise', name: 'OptType',id:'optDate', inputValue: 2,height:30,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="D";
                     }
                     }
                     }},
                     {boxLabel: 'Payment History', name: 'OptType',id:'optPayment', inputValue: 3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="P";
                     }
                     }
                     }
                    },
                     {boxLabel: 'Payment Summery', name: 'OptType',id:'optSummery', inputValue: 4,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="Q";
                     }
                     }
                     }
                    }
                    

                   ]
                },
                 { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 80,
                border      : false,
                labelWidth  : 85,
                items: [cmbBank]
                }
                ]
              },
               {xtype: 'fieldset',
                title: 'Period',
                layout : 'hbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 160,
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
              }

              ]
               });



     var BankPaymentRegisterWindow = new Ext.Window({
        height      : 350,
        width       : 500,
        items       : BankPaymentRegisterFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
           bodyStyle:{"background-color":"#3399CC"},
        y      : 120,
	listeners:{
        show:function(){
        BankDataStore.load({
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'BANK',
			comp : GinCompcode
                       }
                    });
                         gstoption="B";
 	
}}



    });
       BankPaymentRegisterWindow.show();
});
