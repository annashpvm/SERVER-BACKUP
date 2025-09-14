Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var printtype='PDF';

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

var Rpttype="Rollwise Machine Production";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:200,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'Rollwise Machine Production', name: 'optRpttype', id:'optDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rollwise Machine Production";

					}
				}
			}
		},
		{boxLabel: 'Daily Machine Production', name: 'optRpttype', id:'optPS', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Daily Machine Production";

					}
				}
			}
		},
		{boxLabel: 'Machine Production - Qualitywise', name: 'optRpttype', id:'optqlywise', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Machine Production - Qualitywise";

					}
				}
			}
		},
		{boxLabel: 'Machine Production - BFwise', name: 'optRpttype', id:'optBFwise', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Machine Production - BFwise";

					}
				}
			}
		},
		{boxLabel: 'Machine Production - GSMwise', name: 'optRpttype', id:'optGSMwise', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Machine Production - GSMwise";

					}
				}
			}
		},
		{boxLabel: 'Pending Rolls', name: 'optRpttype', id:'optPendingRolls', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Pending Rolls";

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
	height      : 325,
	width       : 645,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            title: 'Production Statement',bodyStyle:{"background-color":"#ebebdf"},
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
			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&stdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&eddate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
			var param = (p1+p2+p3+p4) ;

                        if (printtype == "PDF") 
                        {

			    if (Rpttype == "Rollwise Machine Production") 
                            {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_daily_mcprod_Rollwise_detail.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
			    else if (Rpttype == "Daily Machine Production") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_daily_mcprod_detail.rptdesign&__format=pdf&' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - Qualitywise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_Varietywise.rptdesign&__format=pdf&' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - BFwise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_BFwise.rptdesign&__format=pdf&' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - GSMwise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_GSMwise.rptdesign&__format=pdf&' + param, '_blank');
			    }
			    else if (Rpttype == "Pending Rolls") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_PendingRolls.rptdesign&__format=pdf&' + param, '_blank');
			    }


                       }
                       else
                        {

			    if (Rpttype == "Rollwise Machine Production") 
                            {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_daily_mcprod_Rollwise_detail.rptdesign' + param, '_blank'); 
			    }
			    else if (Rpttype == "Daily Machine Production") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_daily_mcprod_detail.rptdesign' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - Qualitywise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_Varietywise.rptdesign' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - BFwise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_BFwise.rptdesign' + param, '_blank');
			    }
			    else if (Rpttype == "Machine Production - GSMwise") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_mcprod_GSMwise.rptdesign' + param, '_blank');
			    }
			    else if (Rpttype == "Pending Rolls") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_PendingRolls.rptdesign' + param, '_blank');
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
			height  : 70,
			style:{ border:'1px solid red'},
			border      : false,
			items: [
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
        title       : 'Prodcution Reports',
        items       : RepGeneralFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
	
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
