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

var Rpttype="Roll / Reel wise Finished Produciton";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:500,
    height:150,
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
		{boxLabel: 'Roll / Reel wise Finished Produciton', name: 'optRpttype', id:'optRF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Roll / Reel wise Finished Produciton";

					}
				}
			}
		},
		{boxLabel: 'Rollwise Finished Produciton - Abstract', name: 'optRpttype', id:'optRFA', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rollwise Finished Produciton - Abstract";

					}
				}
			}
		},
		{boxLabel: 'Roll - Reel wise Finished Produciton - Date & Shift wise Detail', name: 'optRpttype', id:'optDS', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rollwise Finished Produciton - Datewise Detail";

					}
				}
			}
		},

		{boxLabel: 'Rollwise Finished Produciton - Date & Shift wise Abstract', name: 'optRpttype', id:'optRFS', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rollwise Finished Produciton - Date & Shift wise Abstract";

					}
				}
			}
		},

		{boxLabel: 'Rollwise Finished Produciton - Datewise Abstract', name: 'optRpttype', id:'optfinabs', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rollwise Finished Produciton - Datewise Abstract";

					}
				}
			}
		},

		{boxLabel: 'Daily Sizewise Finished Production', name: 'optRpttype', id:'optPS', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Daily Sizewise Finished Production";

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
	height      : 255,
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
			var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p3= "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
			var param = (p1+p2+p3) ;


                        if (printtype == "PDF") 

        		{
			    if (Rpttype == "Roll / Reel wise Finished Produciton") {	
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4= "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				param = (p1+p2+p3+p4) ;			
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Roll_Reelwise_Production.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
			    else  if (Rpttype == "Rollwise Finished Produciton - Abstract") {	
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4= "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				param = (p1+p2+p3+p4) ;			
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Rollwise_Production.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Datewise Detail") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_ReelNowiseProduction.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
			    else if (Rpttype == "Daily Sizewise Finished Production") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_SizewiseProduction.rptdesign&__format=pdf&' + param, '_blank');
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Date & Shift wise Abstract") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_ShiftwiseFinishedProduction.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Datewise Abstract") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Date_RollwiseFinishedProduction.rptdesign&__format=pdf&' + param, '_blank'); 
			    }
	                }
                        else
        		{
			    if (Rpttype == "Roll / Reel wise Finished Produciton") {	
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4= "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				param = (p1+p2+p3+p4) ;			
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Roll_Reelwise_Production.rptdesign' + param, '_blank'); 
			    }
			    else  if (Rpttype == "Rollwise Finished Produciton - Abstract") {	
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4= "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				param = (p1+p2+p3+p4) ;			
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Rollwise_Production.rptdesign' + param, '_blank'); 
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Datewise Detail") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_ReelNowiseProduction.rptdesign' + param, '_blank'); 
			    }
			    else if (Rpttype == "Daily Sizewise Finished Production") {
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_SizewiseProduction.rptdesign' + param, '_blank');
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Date & Shift wise Abstract") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_ShiftwiseFinishedProduction.rptdesign' + param, '_blank'); 
			    }
			    else if (Rpttype == "Rollwise Finished Produciton - Datewise Abstract") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Date_RollwiseFinishedProduction.rptdesign' + param, '_blank'); 
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
			height  : 280,
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
