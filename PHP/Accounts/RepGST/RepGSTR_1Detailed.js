Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




   var printtype='PDF';

 var gstreptype = '1';

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
               {boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


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

 var Rpttype="GST Report - All SALES Invoicewise";
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
		{boxLabel: 'GST Report - All SALES Invoicewise', name: 'optRpttype', id:'optGSTinv', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GST Report - All SALES Invoicewise";
                                                gstreptype = '1';

						Ext.getCmp('ratef').hide();

					}
				}
			}
		},

		{boxLabel: 'GST Report - TN SALES Invoicewise', name: 'optRpttype', id:'optGSTinv2', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GST Report - TN SALES Invoicewise";
                                                gstreptype = 'TN';
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},
		{boxLabel: 'GST Report - OS SALES Invoicewise', name: 'optRpttype', id:'optGSTinv3', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GST Report - OS SALES Invoicewise";
                                                gstreptype = 'OS';
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},


		{boxLabel: 'GST Report - B2B Invoices', name: 'optRpttype', id:'optB2B', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GST Report - B2B Invoices";
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},
/*
		{boxLabel: 'Weight Changed', name: 'optRpttype', id:'optweightchanged', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Weight Changed";
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},

		{boxLabel: 'Repulp Details', name: 'optRpttype', id:'optRepulp', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repulp Details";
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},

		{boxLabel: 'Repulp Abstract', name: 'optRpttype', id:'optRepulpabs', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repulp Abstract";
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},
		{boxLabel: 'QC Deviation', name: 'optRpttype', id:'optqcdev', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="QC Deviation";
						Ext.getCmp('ratef').hide();

					}
				}
			}
		},
		{boxLabel: 'Loadmen Wages', name: 'optRpttype', id:'optldmw', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="LoadmenWages";
						Ext.getCmp('ratef').show();

					}
				}
			}
		},	
	
*/
            
        ],
    }



    ]
});

var lblRate = new Ext.form.Label({
	fieldLabel  : 'MG ITEMS',
	id          : 'lblRate',
	name        : 'lblRate',
	width       :  200,
    	enableKeyEvents: true,
    	labelStyle : "font-size:9px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

});

var lblBRate = new Ext.form.Label({
	fieldLabel  : 'OTHERS',
	id          : 'lblBRate',
	name        : 'lblBRate',
	width       :  200,
    	enableKeyEvents: true,
    	labelStyle : "font-size:9px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

});

var txtRlMGRate = new Ext.form.TextField({
	fieldLabel  : 'Reel Rate',
	id          : 'txtRlMGRate',
	name        : 'txtRlMGRate',
	width       :  60,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

});

var txtRlOTRate = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtRlOTRate',
	name        : 'txtRlOTRate',
	width       :  60,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

}); 
var txtBdMGRate = new Ext.form.TextField({
	fieldLabel  : 'Bundle Rate',
	id          : 'txtBdMGRate',
	name        : 'txtBdMGRate',
	width       :  60,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

});

var txtBdOTRate = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtBdOTRate',
	name        : 'txtBdOTRate',
	width       :  60,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	

}); 
 var cmbLoc = new Ext.form.ComboBox({
        fieldLabel      : 'Location',
        width           : 150,
        displayField    : 'field2',
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbLoc',
	labelStyle 	: 'font-size:10px;font-weight:bold;',
	style      	: "border-radius:5px;",     
        typeAhead       : true,
	emptyText       : '--Select Report Type--',
        mode            : 'local',
        store           : [['M','MILL']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false, 
        editable        : true,
        allowblank      : false,
	listeners:{
               select : function(){
               }
	}
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
            title: 'General Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype,
            
		{ 
			xtype   : 'fieldset',
			title   : 'Rate',
			//layout  : 'hbox',
			id : "ratef",
			border  : true,
			height  : 150,
			width   : 250,
			layout  : 'absolute',
			x       : 370,
			y       : 30,

			items:[
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 150,
					x           : 90,
					y           : -15,
					border      : false,
					items: [lblRate]
				},	
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 150,
					x           : 165,
					y           : -15,
					border      : false,
					items: [lblBRate]
				},							
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 160,
					x           : 5,
					y           : 10,
					border      : false,
					items: [txtRlMGRate]
				},	
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 140,
					x           : 150,
					y           : 10,
					border      : false,
					items: [txtRlOTRate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 160,
					x           : 5,
					y           : 40,
					border      : false,
					items: [txtBdMGRate]
				},	
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 140,
					x           : 150,
					y           : 40,
					border      : false,
					items: [txtBdOTRate]
				},	
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 5,
					y           : 70,
					border      : false,
					items: [cmbLoc]
				},															
			],
		},            
            
		]
	},


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
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
                 	var p5 = "&invtype=" + String(encodeURIComponent(gstreptype));


			var param = (p1+p2+p3+p4+p5);

			if (Rpttype == "")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
			else
			{

			    if (Rpttype == "GST Report - All SALES Invoicewise" ||  Rpttype == "GST Report - TN SALES Invoicewise" || Rpttype == "GST Report - OS SALES Invoicewise" ) {	
  if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGST_Invoicewise.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGST_Invoicewise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGST_Invoicewise.rptdesign' + param, '_blank');
                         
                             /*   if (printtype == "PDF") 			
			   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGST_Invoicewise.rptdesign&__format=pdf&' + param, '_blank');
                                else
			   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGST_Invoicewise.rptdesign' + param, '_blank');*/

			    }
                            else if (Rpttype="GST Report - B2B Invoices")
                            {
                               var param = (p1+p3+p4);
  if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepB2BInvoices.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepB2BInvoices.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepB2BInvoices.rptdesign' + param, '_blank');
        
                           /* if (printtype == "PDF") 
			   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepB2BInvoices.rptdesign&__format=pdf&' + param, '_blank')
                            else
			   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepB2BInvoices.rptdesign' + param, '_blank')*/


                            }
			    else if (Rpttype == "LoadmenWages") {
			    
			    	var rrate = "&rrate=" + encodeURIComponent(txtRlOTRate.getValue());
			    	var rratemg = "&rratemg=" + encodeURIComponent(txtRlMGRate.getValue());
			    	var brate = "&brate=" + encodeURIComponent(txtBdOTRate.getValue());
			    	var bratemg = "&bratemg=" + encodeURIComponent(txtBdMGRate.getValue());
			    	var loc = "&loc=" + encodeURIComponent(cmbLoc.getValue());
			    	param = (param + rrate + rratemg + brate + bratemg + loc);
				window.open('http://192.168.11.14:8080/birt/frameset?__report=Sales/RepSalLoadmanwages.rptdesign' + param, '_blank');
			    }			    
	                }
		     }  
                   }
                },'-',                
                {
                    text: 'Refr	esh',
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
			border  : true,
			height  : 320,
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 60,

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
        title       : 'Sales GST Reports',
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
               show:function(){Ext.getCmp('ratef').hide();
	
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
