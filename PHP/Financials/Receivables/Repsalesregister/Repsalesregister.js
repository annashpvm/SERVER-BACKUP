Ext.onReady(function() {
Ext.QuickTips.init();
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
var reptype = "D";

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
    
    

var SalesRegisterFormPannel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Sales Register',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'SalesRegisterFormPannel',
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
                    var form = SalesRegisterFormPannel.getForm();
                    if (form.isValid()) {
                  
                     var fdate=Ext.getCmp('dtpfromdate').value;	
                     var tdate=Ext.getCmp('dtptodate').value;		
		       var v1 =  fdate + " 00:00:00.000";
		       var v2 =  tdate + " 00:00:00.000";
		       var v3 = compcode;
		       var v4= ginfinid;
	
                     var p1 = "&compcode="+encodeURIComponent(v3);
                     var p2 = "&finid="+encodeURIComponent(v4);
                     var p3 = "&fromdate="+encodeURIComponent(v1);
                     var p4 = "&todate="+encodeURIComponent(v2);

                     var parm = (p1+p2+p3+p4);
                     if(reptype == "D")
                     {
 window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccSalesRegister.rptdesign' + parm ,  '_blank' );   
                     }
                     else
                     {
                       window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccSalesRegisterabs.rptdesign' + parm ,  '_blank' );   
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
                            SalesRegisterWindow.hide();
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
                title: 'Sales Register',
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
                    {boxLabel: 'Detail', name: 'optsalesregister', id:'optdetail',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     reptype="D";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Abstract', name: 'optsalesregister',id:'optabstract', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       reptype="A";
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



     var SalesRegisterWindow = new Ext.Window({
        height      : 260,
        width       : 420,
        items       : SalesRegisterFormPannel,
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
       SalesRegisterWindow.show();
});
