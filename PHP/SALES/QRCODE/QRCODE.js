Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var printtype='PDF';


var btnUpdate = new Ext.Button({
    style   : 'text-align:center;',
    text    : "UPDATE",
    width   : 40,
    height  : 40,
    x       : 00,
    y       : 40,
    bodyStyle:{"background-color":"#ebebdf"},  
     listeners:{
         click: function(){              

                   Ext.Ajax.request({
	                url: 'distance.php',
	                params: {
	      
		                

	                },
                              callback: function(options, success, response)
                              {
                              }
                   });  
 

         } 
    }
});

 var loadgeneral = new Ext.data.Store({
      id: 'loadgeneral',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadrepno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'seqno','repno'

      ]),
    });
/*
 var cmbReport = new Ext.form.ComboBox({
        fieldLabel      : 'Report Name',
        width           : 200,
        displayField    : 'field2',
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbReport',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select Report Type--',
        mode            : 'local',
        store           : [['1','GRN CUM INVOICE'],['2','PURCHASE ORDER'],['3','ISSUE SLIP'],['4','PURCHASE ORDER - Annexure']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false, 
        editable        : false,
        allowblank      : false,
	listeners:{
               select : function(){
			if (cmbReport.getValue() == "1") {
				cmbstrepno.label.update('GRN No');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/SALES/ClsSalesRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "GRN"

					}

				});

			}
			else if (cmbReport.getValue() == "2") {
				cmbstrepno.label.update('PO No');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/SALES/ClsSalesRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "PO"

					}

				});

			}
		}
	}
   });

*/
 var cmbstrepno = new Ext.form.ComboBox({
        fieldLabel      : 'No.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbstrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadgeneral,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });

 var cmbedrepno = new Ext.form.ComboBox({
        fieldLabel      : 'To.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbedrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadgeneral,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });

var dtpstdate = new Ext.form.DateField({
    fieldLabel : 'From',
    id         : 'dtpstdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var dtpeddate = new Ext.form.DateField({
    fieldLabel : 'To',
    id         : 'dtpeddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

 var Rpttype="Invoice";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
//    height:10,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 10,
        id: 'optRpttype',

        items: [
		{boxLabel: 'Invoice', name: 'optRpttype', id:'optDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Invoice";

					}
				}
			}
		},


            
        ],
    }



    ]
});
 


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});
var tabsalstmt = new Ext.TabPanel({
    	id          : 'SALSTMT',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 270,
	width       : 645,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            title: 'Sales Statement',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype
		]
	},
/*
	{
            xtype: 'panel',
            title: 'Sales Statement Consolidated Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		]
	},
	{
            xtype: 'panel',
            title: 'Export Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		]
	},
*/
	]
});

   
var RepGeneralFormPannel = new Ext.FormPanel({
	renderTo    : Ext.getBody(),
	xtype       : 'form',
	title       : 'General Reports',
	header      : false,
	width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
	height      : 650,
	x           : 0,
	y           : 0,
	frame       : false,
	id          : 'RepGeneralFormPannel',
	method      : 'POST',
	layout      : 'absolute',
	reader: new Ext.data.JsonReader({
		    root:'rows',
		    totalProperty: 'results',
		    id:'id'
		    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                 {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                    listeners:{
                      click: function () {
          			var invoice ="TN/150/22-23"; 
                               i1 = "EXTRA COPY";     
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
          			var p3 = "&invno=" + String(encodeURIComponent(invoice));                                    
                                var p4 = "&displayword=" + encodeURIComponent(i1);
			var param = (p1+p2+p3+p4) ;

			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
			else
			{
                           if (printtype == "PDF") {
				    if (Rpttype == "Invoice") {				
//				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/QRCODERptSalesInvoice.rptdesign&__format=pdf&' + param, '_blank'); 

				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/testqr.rptdesign&__format=pdf&', '_blank'); 
				    }
				    else if (Rpttype == "Partywise Sales with Amount Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&__format=pdf&' + param, '_blank');
				    }
				    else if (Rpttype == "Partywise Sales") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartywise.rptdesign&__format=pdf&' + param, '_blank');
				    }
				    else if (Rpttype == "Itemwise Sales") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesItemwise.rptdesign&__format=pdf&' + param, '_blank');
				    }

				    else if (Rpttype == "Rep-Partywise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&__format=pdf&' + param, '_blank');
                                    }		
				    else if (Rpttype == "Rep-Party-Sizewise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank');		
		    }
				    else if (Rpttype == "Repwise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwiseSales.rptdesign&__format=pdf&' + param, '_blank');		
		    }
				    else if (Rpttype == "Dealer-Party-Sizewise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDealerPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank');		
		    }




                           }   
                           else
                           {
				    if (Rpttype == "Daily Sales") {				
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign' + param, '_blank'); 
				    }
				    else if (Rpttype == "Partywise Sales with Amount Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign' + param, '_blank');
				    }
				    else if (Rpttype == "Partywise Sales") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartywise.rptdesign' + param, '_blank');
				    }
				    else if (Rpttype == "Itemwise Sales") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesItemwise.rptdesign' + param, '_blank');
				    }
				    else if (Rpttype == "Rep-Partywise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&' + param, '_blank');
                                    }		
				    else if (Rpttype == "Rep-Party-Sizewise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartySizewiseSales.rptdesign&' + param, '_blank');		
		    }
				    else if (Rpttype == "Repwise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwiseSales.rptdesign&' + param, '_blank');		
		    }
				    else if (Rpttype == "Dealer-Party-Sizewise Sales Details") {
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDealerPartySizewiseSales.rptdesign&' + param, '_blank');		
		    }



                           }

	                }
		     }  
                   }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
RepgeneralWindow.hide();
                        }
                }]
        },
        items: [

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 260,
			y       : 10,
			items:[optprinttype],
		},
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 300,
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 70,

			items:[tabsalstmt],
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 500,
			x           : 95,
			y           : 390,
			layout  : 'absolute',
			height  : 140,
			style:{ border:'1px solid red'},
			border      : false,
			items: [ btnUpdate,
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 0,
					y           : 0,
					border      : false,
					items: [dtpstdate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 250,
					y           : 0,
					border      : false,
					items: [dtpeddate]
				},
			]
		},
        ],
    });
    
   
    var RepgeneralWindow = new Ext.Window({
	height      : 550,
        width       : 750,
	x	    : 200,
        y           : 35,
        title       : 'Sales Statement Reports',
        items       : RepGeneralFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
	
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
