Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var printtype="PDF";

 var loadgeneral = new Ext.data.Store({
      id: 'loadgeneral',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/RawMaterial/ClsRMRep.php',      // File to connect to
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
					url:'/SHVPM/Fuel/ClsFuRep.php',
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
					url:'/SHVPM/Fuel/ClsFuRep.php',
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


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
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
 var Rpttype="";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:95,
    x:20,
    y:20,
    border: false,
    
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        readOnly :true,
        items: [
		{boxLabel: 'Datewise Receipt Register', name: 'optRpttype', id:'optrecD', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="recD";

					}
				}
			}
		},
		{boxLabel: 'Partywise Receipt Register', name: 'optRpttype', id:'optrecP', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="recP";

					}
				}
			}
		},
/*
		{boxLabel: 'Area-Itemwise Receipt ', name: 'optRpttype', id:'optareaitem1', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="recptareaitem1";

					}
				}
			}
		}
*/            
        ],
    }



    ]
});

var optIsstype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:95,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optIsstype',
        items: [
		{boxLabel: 'Issue - Register', name: 'optIsstype', id:'optissReg', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="issReg";

					}
				}
			}
		},
		{boxLabel: 'Issue - Abstract', name: 'optIsstype', id:'optissAbs', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="issAbs";

					}
				}
			}
		}
            
        ],
    }



    ]
});

var optStktype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:95,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optStktype',
        items: [
		{boxLabel: 'Quantitywise Stock Abstract', name: 'optStktype', id:'optrecStk', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkqty";

					}
				}
			}
		},
		{boxLabel: 'Quantity/Value Receipt Register', name: 'optStktype', id:'optrecQV', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkqtyval";

					}
				}
			}
		}
            
        ],
    }

    ]
});



var optDegrade = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:95,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optDegrade',
        items: [
		{boxLabel: 'Item Partywise Degrade', name: 'optDegrade', id:'optItemPartywiseDegrade', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optItemPartywiseDegrade";

					}
				}
			}
		},
/*
		{boxLabel: 'Quantity/Value Receipt Register', name: 'optDegrade', id:'optrecQV', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkqtyval";

					}
				}
			}
		}
  */          
        ],
    }

    ]
});

 
var tabgeneral = new Ext.TabPanel({
    	id          : 'GENERAL',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 275,
	width       : 645,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            title: 'Receipt',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype
		]
	},
/*
	{
            xtype: 'panel',
            title: 'Degrade/Rejection',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optDegrade
		]
	},
	{
            xtype: 'panel',
            title: 'Issue',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optIsstype
		]
	},
	{
            xtype: 'panel',
            title: 'Stock',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optStktype
		]
	}
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
        height      : 600,
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
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var finid = "&finid=" + encodeURIComponent(GinFinid);
				var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				var compcode1 = "&compcode1=0";
				var ptype = "&ptype=0";

				if (Rpttype ==="")
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else
				{
                                 if (printtype == "PDF") {
				    if (Rpttype == "recD") {
					var param =(compcode+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign&__format=pdf&' + param, '_blank'); 
				    }
				    if (Rpttype == "recP") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPartywiseReceipt.rptdesign&__format=pdf&' + param, '_blank'); 
				    }
					
				    if (Rpttype == "stkqty") {
					var param =(compcode+compcode1+finid+fromdate+todate+ptype);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyStockAbs.rptdesign&__format=pdf&' + param, '_blank'); 
				    }
				    if (Rpttype == "stkqtyval") {
					var param =(compcode+compcode1+finid+fromdate+todate+ptype);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyValStockAbs.rptdesign&__format=pdf&' + param, '_blank'); 
				    }
				    if (Rpttype == "issReg") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMIssueRegister.rptdesign&__format=pdf&' + param, '_blank'); 
				    }	
				    if (Rpttype == "issAbs") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMIssueAbstract.rptdesign&__format=pdf&' + param, '_blank'); 
				    }		
				    if (Rpttype == "optItemPartywiseDegrade") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDegradeItemwise.rptdesign&__format=pdf&' + param, '_blank'); 
				    }	
				    if (Rpttype == "recptareaitem1") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMAreaItemwise_Arrivals.rptdesign&__format=pdf&' + param, '_blank'); 
				    }	

		                  }
                                  else
                                    { 
 				    if (Rpttype == "recD") {
					var param =(compcode+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign' + param, '_blank'); 
				    }
				    if (Rpttype == "recP") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPartywiseReceipt.rptdesign' + param, '_blank'); 
				    }
					
				    if (Rpttype == "stkqty") {
					var param =(compcode+compcode1+finid+fromdate+todate+ptype);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyStockAbs.rptdesign' + param, '_blank'); 
				    }
				    if (Rpttype == "stkqtyval") {
					var param =(compcode+compcode1+finid+fromdate+todate+ptype);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyValStockAbs.rptdesign' + param, '_blank'); 
				    }
				    if (Rpttype == "issReg") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMIssueRegister.rptdesign' + param, '_blank'); 
				    }	
				    if (Rpttype == "issAbs") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMIssueAbstract.rptdesign' + param, '_blank'); 
				    }		
				    if (Rpttype == "optItemPartywiseDegrade") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDegradeItemwise.rptdesign' + param, '_blank'); 
				    }	
				    if (Rpttype == "recptareaitem1") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMAreaItemwise_Arrivals.rptdesign' + param, '_blank'); 
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
			//style:{ border:'1px solid red'},
			layout  : 'absolute',
			x       : 30,
			y       : 75,

			items:[tabgeneral],
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
        title       : 'Rawmeterial General Reports',
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
			/* loadgrnprint.load({
				 url: '/SHVPM/Fuel/ClsFuRep.php', 
		        	 params:
		       		 {
		         	 task:"loadgrnno",
				 finid:GinFinid,
				 compcode: GinCompcode

		        	 }
			 });	*/	
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
