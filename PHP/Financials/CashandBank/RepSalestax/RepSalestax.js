Ext.onReady(function() {
Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('acccompcode');
   var GinFinid = localStorage.getItem('accfinid');

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

var gstoption="L";

var RepAbstractsalestaxFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Sales tax Report',
        width       : 500,
        height      : 350,
               bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RepAbstractsalestaxFormPanel',
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
                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";
                    var p1="&compcode="+encodeURIComponent(GinCompcode);
                    var p2="&finid="+encodeURIComponent(GinFinid);
                    var p3="&fmdate="+encodeURIComponent(d1);
                    var p4="&todate="+encodeURIComponent(d2);
                     var test = (p1+p2+p3+p4) ;
                     if (gstoption=='L')
                     {
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalestaxLocal.rptdesign'+test,  '_blank' );
                     }
                     else if(gstoption=='I')
                     {
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalestaxInterstate.rptdesign'+test,  '_blank' );
                     }
                     else if(gstoption=='E')
                     {
                     var test = (p3+p4) ;
			if (GinCompcode=="1")
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalestaxExportVm.rptdesign'+test,  '_blank' );
			else
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalestaxExportSbm.rptdesign'+test,  '_blank' );
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
                            RepAbstractsalestaxWindow.hide();
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
                height:50,
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
                columns : 3,
                items: [
                    {boxLabel: 'Local', name: 'OptType', id:'optlocal',inputValue: 1,checked: true,height:30,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="L";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Interstate', name: 'OptType',id:'optinter', inputValue: 2,height:30,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="I";
                     }
                     }
                     }},
                     {boxLabel: 'Export', name: 'OptType',id:'optexport', inputValue: 3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="E";
                     }
                     }
                     }
                    }
                   ]
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
                y: 80,
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



     var RepAbstractsalestaxWindow = new Ext.Window({
        height      : 300,
        width       : 500,
        items       : RepAbstractsalestaxFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
           bodyStyle:{"background-color":"#3399CC"},
        y      : 90,
	listeners:{
        show:function(){
             gstoption="L";
 	}
	}
    });
       RepAbstractsalestaxWindow.show();
});
