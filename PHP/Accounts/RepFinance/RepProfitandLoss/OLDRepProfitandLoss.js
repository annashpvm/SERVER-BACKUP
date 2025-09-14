Ext.onReady(function(){
    Ext.QuickTips.init();

   var compcode = localStorage.getItem('gincompcode');
   var ginfinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var gstfinyear = localStorage.getItem('gstyear');
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

var RepTrialBalanceFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Profit and Loss',
        width       : 530,
        height      : 320,
     bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RepTrialBalanceFormPanel',
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
//                    var d1 =  fdate + " 00:00:00.000";
//                    var d2 =  tdate + " 00:00:00.000";

                    var d1 =  fdate;
                    var d2 =  tdate;


                    var p1 = "&fromdate="+encodeURIComponent(d1);
                    var p2 = "&todate="+encodeURIComponent(d2);
                    var p3 = "&fincode="+encodeURIComponent(ginfinid);
                    var p4 = "&compcode="+encodeURIComponent(compcode);
		        var rdchk=RepTrialBalanceFormPanel.getForm().getValues()['chkabs'];
                    var test = (p1+p2+p3+p4) ;
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepProfitandLoss_Detailed.rptdesign&__format=pdf&.rptdesign'+test,  '_blank' );
/*

			if (rdchk=="1")
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepProfitandLossAbs.rptdesign'+test,  '_blank' );
			else if (rdchk=="2")
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepProfitandLoss.rptdesign'+test,  '_blank' );
			else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepProfitandLossWoProvision.rptdesign'+test,  '_blank' );

*/
                    }
                   
                   }

                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            RepTrialBalanceWindow.hide();
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
              },
{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:40,
                width:300,
                x: 30,
                y:100,
              items: [
            {
                xtype: 'checkboxgroup',
		border  :  false,
                x       : 0,
                y       : 0,
                columns :  2,
                items: [
                   {boxLabel: 'Abstract', name: 'chkabs', inputValue: 1 ,checked : false},
                   {boxLabel: 'With Provision', name: 'chkabs', inputValue: 2 ,checked : false}
			]
	    }
		     ]
	    }
]
               });



     var RepTrialBalanceWindow = new Ext.Window({
        height      : 250,
        width       : 530,
        items       : RepTrialBalanceFormPanel,
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
            		  //var gstfinyear=localStorage.getItem('accfinyear');
			  //FDate.setValue(gstfinyear.substring(5,9)-1+'-04-'+'01');
			  FDate.setValue(finstdate);
}
}


    });
       RepTrialBalanceWindow.show();
});    
    
