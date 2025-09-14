Ext.onReady(function(){
    Ext.QuickTips.init();
   /* var ginfinid =localStorage.getItem('accfinid');
   var gstfinyear = localStorage.getItem('accfinyear');
   var gstfinuser = localStorage.getItem('accuserid');
   var compcode =localStorage.getItem('acccompcode');*/
   
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var GinYear = localStorage.getItem('gstyear');
   var fineddate = localStorage.getItem('gfineddate');
          
    
 var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
//readOnly:true,
        fieldLabel: 'From',
        format     : 'Y-m-d',
        value      : new Date(),

    });

var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To',
        format     : 'Y-m-d',
        value      : new Date(),
	listeners:{
select:function(){
if(FDate.getRawValue()>TDate.getRawValue()){
Ext.Msg.alert("Alert","Date Select Properly");
}
}
}

});

var RepBalanceSheetFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Balance Sheet',
        width       : 530,
        height      : 320,
     bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RepBalanceSheetFormPanel',
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
                    var fdate=Ext.getCmp('FDate').value;
                    var tdate=Ext.getCmp('TDate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";

		    var p1 = "&finid="+encodeURIComponent(GinFinid);
		    var p2 = "&compcode="+encodeURIComponent(GinCompcode);
                    var p3 = "&fromdate="+encodeURIComponent(d1);
                    var p4 = "&todate="+encodeURIComponent(d2);
                    
		        
                    var parm = (p1+p2+p3+p4);
			
		    window.open('http://192.168.11.14:8080/birt-viewer/frameset?__report=accounts/AccRepPurchaseVoucherDetails.rptdesign'+parm,  '_blank' );
			
                    }
                   
                   }

                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            RepBalanceSheetWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {  xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                border:true,
                height:75,
                width:450,
                layout      : 'absolute',
                x: 30,
                y: 10,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           : 40,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [FDate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           :230,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [TDate]
                }
                ]
              }

]
               });



     var RepBalanceSheetWindow = new Ext.Window({
        height      : 250,
        width       : 530,
        items       : RepBalanceSheetFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#3399CC"},

       
        y      : 80,
listeners:{
show:function(){
var datenew=new Date();
FDate.setValue('2016-04-01');
}
}


    });
       RepBalanceSheetWindow.show();
});    
    
