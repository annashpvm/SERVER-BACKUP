Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var reptype ='I';
var outtype = 'A'; 
var intype = 'A'; 


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
    
    

var GSTReportsFormPannel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GST Reports',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'GSTReportsFormPannel',
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
                    var form = GSTReportsFormPannel.getForm();
                    if (form.isValid()) {
                    if(reptype == 'I')
                     {
		                    Ext.Ajax.request({
		                    url: 'GSTRPT.php',
		                    params :
		                     {
					compcode	: GinCompcode,
		                       finid		: GinFinid,
		                       fromdate	: Ext.util.Format.date(dtpfromdate.getValue(),"Y-m-d"),
		                       todate		: Ext.util.Format.date(dtptodate.getValue(),"Y-m-d"),
		                       RPT		: "GST"
		                                                    	
					},
		                      
		                   });	 
			}                  
                    var fdate=Ext.getCmp('dtpfromdate').value;
                    var tdate=Ext.getCmp('dtptodate').value;	
                    
                     var v1 = GinCompcode
                     var v2 = GinFinid;	
		     var v3 =  fdate + " 00:00:00.000";
		     var v4 =  tdate + " 00:00:00.000";
		     
                     var p1 = "&cmpcode="+encodeURIComponent(v1);
                     var p2 = "&finid="+encodeURIComponent(v2);
                     var p3 = "&fmdate="+encodeURIComponent(v3);
                     var p4 = "&tdate="+encodeURIComponent(v4);
                    
                     var parm = (p1+p2+p3+p4);
                     if(reptype == 'I')
                     {
                     	if(intype=='A')
                     		{
                     		window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accreppurchasechecklist.rptdesign');
                     		}
                     	else if(intype=='B')
                     		{
             			window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accrepgsthsncodewise.rptdesign');
                     		}
                     	else if(intype=='C')
                     		{
                     		window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accreppurchasechecklistnongst.rptdesign');
                     		}
                     	else if(intype=='F')
                     		{
                     		window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accrepgstb2bpurchaserptdesign.rptdesign');
                     		}
                     		
                     		
                     }
                     else
                     {
                     	if(outtype == 'A')
                     		{
                     		window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accrepgstbtb.rptdesign' + parm ,  '_blank' );
                     		}
                     	else if(outtype == 'B')
                     		{
                     		window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/Accrepgstbtbothers.rptdesign' + parm ,  '_blank' );
                     		}
 	
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
                height:320,
                width:390,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {  xtype: 'fieldset',
                title: 'Report Type',
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
                x       : 1,
                y       : -2,
                columns :  2,
                items: [
                    {boxLabel: 'Inward Reports', name: 'opttype', id:'optinward',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     reptype="I";
                     Ext.getCmp('optinwardrep').setVisible(true);
                     Ext.getCmp('optutwardrep').setVisible(false);
                     }
                     }
                     }
                    },
                    {boxLabel: 'Outward Reports', name: 'opttype',id:'optout', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       reptype="O";
                       Ext.getCmp('optinwardrep').setVisible(false);
                       Ext.getCmp('optutwardrep').setVisible(true);
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
                title: 'Inward Reports',
                layout : 'hbox',
                id:'optinwardrep',
                border:true,
                height:180,
                width:350,
                layout      : 'absolute',
                x: 30,
                y: 80,
             items:[
              {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 1,
                y       : -2,
                columns :  1,
                items: [
                 {boxLabel: 'Purchase-Checklist', name: 'inrepoption', id:'optchklist',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="A";
                     }}}},
                     {boxLabel: 'Purchase-HSN Code Wise', name: 'inrepoption', id:'opthsn',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="B";
                     }}}},
                     {boxLabel: 'Purchase-Non GST Suppliers', name: 'inrepoption', id:'optnongst',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="C";
                     }}}},
                     {boxLabel: 'Purchase-Returns Debit & Credit Note', name: 'inrepoption', id:'optdbcr',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="D";
                     }}}},
                     {boxLabel: 'Purchase-Account Headwise', name: 'inrepoption', id:'optacched',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="E";
                     }}}},
                      {boxLabel: 'Purchase-B2B', name: 'inrepoption', id:'optb2b',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     intype="F";
                     }}}}
                   ]
                   }
                   ]
                },
                {xtype: 'fieldset',
                title: 'Outward Reports',
                layout : 'hbox',
                id:'optutwardrep',
                border:true,
                height:180,
                width:350,
                layout      : 'absolute',
                x: 30,
                y: 80,
             items:[
              {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 1,
                y       : -2,
                columns :  1,
                items: [
                {boxLabel: 'B2B-Taxable Supply to Registered Tax Payer', name: 'outrepoption', id:'optoutb2b',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     outtype="A";
                     }}}},
    {boxLabel: 'B2B-Taxable Supply to Registered Tax Payer -Other State', name: 'outrepoption', id:'optb2both',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     outtype="B";
                     }}}},
                 {boxLabel: 'B2CL-Taxable Supply to Registered Tax Payer', name: 'outrepoption', id:'optb2cl',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     outtype="C";
                     }}}},
               {boxLabel: 'B2CS-Taxable Supply to Un-Registered Tax Payer', name: 'outrepoption', id:'optb2cs',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     outtype="D";
                     }}}},
                     {boxLabel: 'HSN- wise sales Summary Report', name: 'outrepoption', id:'optouthsn',inputValue: 1, checked: false,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     outtype="E";
                     }}}}
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
                y           : 265,
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



     var RepGSTReportsWindow = new Ext.Window({
        height      : 430,
        width       : 420,
        items       : GSTReportsFormPannel,
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
                Ext.getCmp('optinwardrep').setVisible(true);
                Ext.getCmp('optutwardrep').setVisible(false);
		
                }
            }      

    });
       RepGSTReportsWindow.show();
});
