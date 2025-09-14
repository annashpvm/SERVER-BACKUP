Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 GinCompcode =1;
 GinFinid = 21;

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

 var Rpttype="Daily Inward";
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
		{boxLabel: 'Daily Inward', name: 'optRpttype', id:'optDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Daily Inward";

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
            title: 'Inward Reports',bodyStyle:{"background-color":"#ebebdf"},
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

var io = "I";
   
var RepInwardPannel = new Ext.FormPanel({
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
	id          : 'RepInwardPannel',
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

			var p1 = "&stdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p2 = "&eddate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		        var p3 = "&iotag="  + encodeURIComponent(io);

			var param = (p1+p2+p3) ;

			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
			else
			{
			    if (Rpttype == "Daily Inward") {				
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=inwardoutward/rpt_inward_datewise.rptdesign' + param, '_blank'); 
//			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign' + param, '_blank'); 

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
RepInwardWindow.hide();
                        }
                }]
        },
        items: [
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 350,
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 30,

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
    
   
    var RepInwardWindow = new Ext.Window({
	height      : 550,
        width       : 750,
	x	    : 200,
        y           : 35,
        title       : 'Inward Reports',
        items       : RepInwardPannel,
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
    RepInwardWindow.show();  
});
