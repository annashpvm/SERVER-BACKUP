Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var reptype = "DT";



   var dtpfromdate = new Ext.form.DateField({
        name: 'dtpfromdate',
        id: 'dtpfromdate',
        fieldLabel: 'From Date',
        format     : 'd-m-Y',
        value      : new Date()

    });
    
      var dtptodate = new Ext.form.DateField({
        name: 'dtptodate',
        id: 'dtptodate',
        fieldLabel: 'To Date',
        format     : 'd-m-Y',
        value      : new Date()

    });
    
    

var RevenueReportsFormPannel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Revenue Report',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'RevenueReportsFormPannel',
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
                    var form = RevenueReportsFormPannel.getForm();
                    if (form.isValid()) {
                    
		                   /* Ext.Ajax.request({
		                    url: 'CollectionsRPT.php',
		                    params :
		                     {
					compcode	: GinCompcode,
		                       finid		: GinFinid,
		                       fromdate	: Ext.util.Format.date(dtpfromdate.getValue(),"Y-m-d"),
		                       todate		: Ext.util.Format.date(dtptodate.getValue(),"Y-m-d"),
		                       RPT		: ""
		                                                    	
					},
		                      
		                   });	  */             
                  
                     var fdate=Ext.util.Format.date(dtpfromdate.getValue(),"Y-m-d");//Ext.getCmp('dtpfromdate').value;	
                     var tdate=Ext.util.Format.date(dtptodate.getValue(),"Y-m-d");//Ext.getCmp('dtptodate').value;		
		     var v3 =  fdate + " 00:00:00.000";
		     var v4 =  tdate + " 00:00:00.000";
		     var v1 = GinCompcode;
		     var v2 = GinFinid;
		  
                     var p1 = "&compcode="+encodeURIComponent(v1);
                     var p2 = "&finid="+encodeURIComponent(v2);
                     var p3 = "&fromdate="+encodeURIComponent(v3);
                     var p4 = "&todate="+encodeURIComponent(v4);
                    
                   

                     var parm = (p1+p2+p3+p4);
                     
                     if(reptype =="DT")
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/SHVPMreprevenuedatewise.rptdesign' + parm ,  '_blank' );         
                     }
                     else if(reptype =="HN")
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/SHVPMreprevenuehsnwise.rptdesign' + parm ,  '_blank' );         
                     }
                     else
                     {
                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/SHVPMreprevenuedutywise.rptdesign' + parm ,  '_blank' );         
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
                            RepCollectionsWindow.hide();
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
                height:125,
                width:390,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {  xtype: 'fieldset',
                title: 'Options',
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
                x       : 0,
                y       : -2,
                columns :  3,
                items: [
                    {boxLabel: 'Datewise', name: 'repopt', id:'optdatewise',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     reptype="DT";
                     }
                     }
                     }
                    },
                    {boxLabel: 'HSN Codewise', name: 'repopt',id:'opthsnwise', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       reptype="HN";
                       }
                       }
                       }
                    },
                     {boxLabel: 'Dutywise', name: 'repopt',id:'optdutywise', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       reptype="DU";
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
                y           : 80,
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



     var RepRevenueReportsWindow = new Ext.Window({
        height      : 235,
        width       : 420,
        items       : RevenueReportsFormPannel,
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
       RepRevenueReportsWindow.show();
});
