Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var optcompany = 'A';
var repoption = 'D';
GinCompcode = '%';



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
    
    

var CollectionsReportFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Collections Report',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'CollectionsReportFormPanel',
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
                    var form = CollectionsReportFormPanel.getForm();
                    if (form.isValid()) {
                   
		                    Ext.Ajax.request({
		                    url: 'CollectionsRPT.php',
		                    params :
		                     {
					compcode	: GinCompcode,
		                       finid		: GinFinid,
		                       fromdate	: Ext.util.Format.date(dtpfromdate.getValue(),"Y-m-d"),
		                       todate		: Ext.util.Format.date(dtptodate.getValue(),"Y-m-d"),
		                       RPT		: "BILLWISE"
		                                                    	
					},
		                      
		                   });	                    
                  
                    var fdate=Ext.getCmp('dtpfromdate').value;
                    var tdate=Ext.getCmp('dtptodate').value;		
		     
		     var v1 = GinCompcode;
		    
		     var v3 =  fdate + " 00:00:00.000";
		     var v4 =  tdate + " 00:00:00.000";
		     
                     var p1 = "&compcode="+encodeURIComponent(v1);
                     
                     var p3 = "&fromdate="+encodeURIComponent(v3);
                     var p4 = "&todate="+encodeURIComponent(v4);
                     var parm = (p1+p3+p4);
                     
                     if(repoption == 'D')
                     {
  window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalesCollectionDatewise.rptdesign' + parm ,  '_blank' );     
                     }
                     else
                     {
  window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepSalesCollection.rptdesign' + parm ,  '_blank' );  
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
                height:200,
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
                x       : 20,
                y       : -2,
                columns :  3,
                items: [
                    {boxLabel: 'All', name: 'Optcompany', id:'optAll',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     optcompany="A";
                     GinCompcode = '%';
                     }
                     }
                     }
                    },
                    {boxLabel: 'SHVPM', name: 'Optcompany',id:'optSHVPM', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       optcompany="D";
                       GinCompcode = 1;
                       }
                       }
                       }
                    },
                     {boxLabel: 'VJPM', name: 'Optcompany',id:'optvjpm', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       optcompany="V";
                       GinCompcode = 2;
                       }
                       }
                       }
                    }]
                }
                   ]
               }
               ]
               },
               {xtype: 'fieldset',
                title: 'Account',
                layout : 'hbox',
                border:true,
                height:50,
                width:350,
                layout      : 'absolute',
                x: 30,
                y: 80,
             items:[
              {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 20,
                y       : -2,
                columns :  3,
                items: [
                 {boxLabel: 'Datewise', name: 'optcollectiontype', id:'optdatewise',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     repoption="D";
                     }}}},
                     {boxLabel: 'Partywise', name: 'optcollectiontype', id:'optpartywise',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     repoption="P";
                     }}}},
                     {boxLabel: 'Agentwise', name: 'optcollectiontype', id:'optagentwise',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     repoption="A";
                     }}}},
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
                y           : 140,
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



     var RepCollectionsWindow = new Ext.Window({
        height      : 310,
        width       : 420,
        items       : CollectionsReportFormPanel,
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
       RepCollectionsWindow.show();
});
