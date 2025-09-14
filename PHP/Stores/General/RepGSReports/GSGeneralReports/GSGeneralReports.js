Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var finstartdate = localStorage.getItem('gfinstdate');


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



 var loadgeneral = new Ext.data.Store({
      id: 'loadgeneral',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Fuel/ClsFuRep.php',      // File to connect to
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

 var loadreportstore = new Ext.data.Store({
      id: 'loadreportstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSReports.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreport"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
'item_code'
      ]),
    });


 var loadstoreLedgerstore = new Ext.data.Store({
      id: 'loadstoreLedgerstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSReports.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstoreledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
'item_code'
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
		/*{boxLabel: 'Itemwise Receipt Register', name: 'optRpttype', id:'optrecI', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="recI";

					}
				}
			}
		},*/
		{boxLabel: 'Partywise Receipt Register', name: 'optRpttype', id:'optrecP', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="recP";

					}
				}
			}
		}
            
        ],
    }



    ]
});
 


var optIssueReports = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:140,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optIssueReports',
        items: [
		{boxLabel: 'Datewise Issue Register', name: 'optIssueReports', id:'optissedatewise', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optissedatewise";
					}
				}
			}
		},

		{boxLabel: 'Consumption - Department-Sectionwise - Abstract', name: 'optIssueReports', id:'optcons_dept_section', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optcons_dept_section_abstract";

					}
				}
			}
		},

		{boxLabel: 'Consumption - Departmentwise - Abstract', name: 'optIssueReports', id:'optcons_department', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optcons_dept_abstract";

					}
				}
			}
		},
	

            
        ],
    }
   ]
});


var optStockReports = new Ext.form.FieldSet({
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
        id: 'optStockReports',
        items: [
		{boxLabel: 'Stock List', name: 'optStockReports', id:'optstklist', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Stock List";




					}
				}
			}
		},

		{boxLabel: 'Stock Abstract', name: 'optStockReports', id:'optstkabs', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Stock Abstract";

					}
				}
			}
		},
		{boxLabel: 'Store Ledger', name: 'optStockReports', id:'optstore_ledger', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optstore_ledger";

					}
				}
			}
		},	
            
        ],
    }



    ]
});

var tabgeneral = new Ext.TabPanel({
    	id          : 'GENERAL',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 375,
	width       : 1150,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            id  : 'panel1',  
            title: 'Receipt',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype
		]
	},
	{
            xtype: 'panel',
            id  : 'panel2',
            title: 'Issue / Consumption',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optIssueReports
		]
	},
	{
            xtype: 'panel',
            id  : 'panel3',
            title: 'Stock',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',

            items: [ 
                      optStockReports
		],

	}

	],


listeners: {
    'tabchange': function(tabPanel, tab) {

         if(tab.id == 'panel3' ){
//           alert("tab changed");
             dtpstdate.setRawValue(Ext.util.Format.date(finstartdate,"d-m-Y"));
     //        Ext.getCmp('dtpstdate').setDisabled(true);  
     			loadreportstore.removeAll();
			loadreportstore.load({
				url:'ClsGSReports.php',
				params:
				{
				task:"loadreport",
				finid : GinFinid,
				compcode : GinCompcode,
				fromdate :  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
                       	todate   : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),                                      
				}

			}) ;                                

         }
         else if (tab.id == 'panel2') {
             dtpstdate.setRawValue(Ext.util.Format.date(new Date(),"d-m-Y"));
     //        Ext.getCmp('dtpstdate').setDisabled(false);          
		  
			    
         
         }
         
         else
         {
             dtpstdate.setRawValue(Ext.util.Format.date(new Date(),"d-m-Y"));
             //Ext.getCmp('dtpstdate').setDisabled(false);                      

         }
    }
}




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
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {


//alert(Rpttype);
				if (Rpttype ==="" &&  optIssueReports === "")
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else
				{
	                            var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				    var finid = "&finid=" + encodeURIComponent(GinFinid);
				    var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
				    var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );
				    if (Rpttype == "recD") {
					var param =(compcode+fromdate+todate);
                                        if (printtype == "PDF") 						
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptStoresdatwise_receipt.rptdesign&__format=pdf' + param, '_blank'); 
                                        else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptStoresdatwise_receipt.rptdesign' + param, '_blank'); 

               	    }
				    else if (Rpttype == "recP") {
					var param =(compcode+finid+fromdate+todate);
	                                if (printtype == "PDF") 					
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptStorespartywise_receipt.rptdesign&__format=pdf' + param, '_blank'); 
                                        else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptStorespartywise_receipt.rptdesign' + param, '_blank'); 


				    }

				    if (Rpttype == "optissedatewise") {
					var param =(compcode+finid+fromdate+todate);
					
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresDatewiseIssue.rptdesign' + param, '_blank'); 
				    }
				    if (Rpttype == "optcons_dept_abstract") {
					var param =(compcode+finid+fromdate+todate);
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresConsumption_dept_abstract.rptdesign' + param, '_blank'); 

				    }

				    if (Rpttype == "optcons_dept_section_abstract") {
					var param =(compcode+finid+fromdate+todate);
					
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresConsumption_dept_section_abstract.rptdesign' + param, '_blank'); 

					

				    }

				    if (Rpttype == "optstore_ledger") {
				    var param;
		                    Ext.Ajax.request({
		                    url: 'RepGSRPT.php',
		                    params :
		                     {
				       compcode     : GinCompcode,
		                       finid	    : GinFinid,
		                       fromdate	    : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
		                       todate	    : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
		                       finstartdate :  finstartdate,
		                       RPT	    : "STORELEDGER"
		                                                    	
			            },

		                      
		                   });	

				    var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
				    var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );
			    
					param =(compcode+finid+fromdate+todate);
					
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedger.rptdesign' + param, '_blank'); 

					

				    }


				    if (Rpttype == "Stock List") {
		     			loadreportstore.removeAll();
					loadreportstore.load({
						url:'ClsGSReports.php',
						params:
						{
						task:"loadreport",
						finid : GinFinid,
						compcode : GinCompcode,
						fromdate :  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
		                                todate   : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),                                      
	 					}

					});

		                        var repdate = "&repdate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );                                    
	   				var param =(compcode+finid+fromdate+todate+repdate);
					    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStockList.rptdesign' + param, '_blank'); 
				
				    }                   


				    if (Rpttype == "Stock Abstract") {
		     			loadreportstore.removeAll();
					loadreportstore.load({
						url:'ClsGSReports.php',
						params:
						{
						task:"loadreport",
						finid : GinFinid,
						compcode : GinCompcode,
						fromdate :  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
		                                todate   : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),                                      
	 					}

					});
		                        var repdate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );                                    
	   				var param =(compcode+finid+fromdate+todate);
					    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStockAbstract.rptdesign' + param, '_blank'); 
				
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
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 10,
			items:[optprinttype],
		},


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 450,
			width   : 1200,
			//style:{ border:'1px solid red'},
			layout  : 'absolute',
			x       : 35,
			y       : 60,

			items:[tabgeneral],
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 500,
			x           : 95,
			y           : 450,
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
	height      : 600,
        width       : 1250,
        y           : 35,
        title       : 'Stores General Reports',
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
