Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var reptype = 'D';


   var dtpfromdate = new Ext.form.DateField({
        name: 'dtpfromdate',
        id: 'dtpfromdate',
        fieldLabel: 'From Date',
        format     : 'Y-m-d',
        value      : new Date()

    });
    
      var dtptodate = new Ext.form.DateField({
        name: 'dtptodate',
        id: 'dtptodate',
        fieldLabel: 'To Date',
        format     : 'Y-m-d',
        value      : new Date()

    });
    
    

var TDSReportFormPannel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'TDS Reports',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'TDSReportFormPannel',
        method      : 'post',
        layout      : 'absolute',
         
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',icon: '/Pictures/refresh.png',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',icon: '/Pictures/view.png',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40,
                  listeners:{
                        click:
                          function () {
                    var form = TDSReportFormPannel.getForm();
                    if (form.isValid()) {
                  
                     var fdate=Ext.getCmp('dtpfromdate').value;		
                     var tdate=Ext.getCmp('dtptodate').value;	
                     
			var v1 = GinCompcode;
			var v2 = GinFinid;
			var v3 =  fdate + " 00:00:00.000";
			var v4 =  tdate + " 00:00:00.000";

		     
                     var p1 = "&fromdate="+encodeURIComponent(v3);
                     var p2 = "&todate="+encodeURIComponent(v4);
                     var p3 = "&compcode="+encodeURIComponent(v1);
                     var p4 = "&finid="+encodeURIComponent(v2);

                     var parm = (p1+p2+p3+p4);
                     if(reptype == 'D')
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accreptdsdatewise.rptdesign' + parm ,  '_blank' );               
                     }
                     else
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accreptdssectionwise.rptdesign' + parm ,  '_blank' );             
                     }
                     }
                    }
                    }
                    },'-',

                {
                    text: 'Exit',icon: '/Pictures/exit.png',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            TDSReportWindow.hide();
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
                height:150,
                width:390,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {  xtype: 'fieldset',
                title: 'TDS Reports',
                layout : 'vbox',
                border:true,
                height:50,
                width:350,
                layout      : 'absolute',
                x: 10,
                y: 0,
             items:[
                    {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 20,
                y       : -2,
                columns :  2,
                items: [
                    {boxLabel: 'Datewise', name: 'opttdsreports', id:'optdatewise',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     reptype="D";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Sectionwise', name: 'opttdsreports',id:'optsectionwise', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       reptype="S";
                       }
                       }
                       }
                    }]
                }
                   ]
               }
               ]
               },
              
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                height:50,
                width:350,
                x           : 30,
                y           : 100,
                border      : true,
                labelWidth  : 75,
                layout      : 'absolute',
                
                items: [
                
                	{xtype: 'fieldset',
                	title: '',
		        width: 230,
		        x: -10,
		        y: -5,
		        border: false,
		        labelWidth: 60,
		        items: [dtpfromdate]
            		},
            		{xtype: 'fieldset',
                	title: '',
		        width: 230,
		        x: 160	,
		        y: -5,
		        border: false,
		        labelWidth: 50,
		        items: [dtptodate]
            		}
                	]
                }
               ]
    });



     var TDSReportWindow = new Ext.Window({
        height      : 260,
        width       : 420,
        items       : TDSReportFormPannel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 90,
	listeners:
            {
                show:function(){
		
                }
            }      

    });
       TDSReportWindow.show();
});
