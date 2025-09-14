Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');


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
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
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
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
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
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
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
		{boxLabel: 'Datewise Purchase Order', name: 'optRpttype', id:'optrecI', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="DatewisePOlist";

					}
				}
			}
		},

		{boxLabel: 'Partywise Purchase Order ', name: 'optRpttype', id:'optrecD', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="PartywisePOlist";

					}
				}
			}
		},

		{boxLabel: 'Itemwise Purchase Order ', name: 'optRpttype', id:'optitemr', inputValue: 3,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="ItemwisePOlist";

					}
				}
			}
		},
            
        ],
    }



    ]
});

var optIndentReports = new Ext.form.FieldSet({
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
        id: 'optIndentReports',
        items: [
		{boxLabel: 'Indent - Datewise', name: 'optIndentReports', id:'optinddatewise', inputValue: 1,checked:false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Indent - Datewise";

					}
				}
			}
		},
		{boxLabel: 'Indent - Pending', name: 'optIndentReports', id:'optindpending', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Indent - Pending";

					}
				}
			}
		}
            
        ],
    }



    ]
});
 
var tabgeneral = new Ext.TabPanel({
    	id          : 'GENERAL',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 285,
	width       : 645,	
	x           : 0,
	y           : 0,
    items       : [

	{
            xtype: 'panel',
            title: 'Purchase Report',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype
		]
	},
	{
            xtype: 'panel',
            title: 'Indent Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optIndentReports
		]
	},
/*	{
            xtype: 'panel',
            title: 'Stock',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optstkRpttype
		]
	}*/
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
                     //fp.getForm().reset();
                    listeners:{

                        click: function () {


//				var fstdate = "&fstdate=" + encodeURIComponent(finstdate);
				//var opdate = "&opdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
//var rtype = "&rtype=" + encodeURIComponent(1);

				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var finid = "&finid=" + encodeURIComponent(GinFinid);


				var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
				var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );
				
//				var param = (compcode+finid+fstdate+opdate+fromdate+todate+rtype) ;
				var param = (compcode+finid+fromdate+todate) ;

				if (Rpttype ==="")
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else
				{


				    if (Rpttype == "DatewisePOlist") {
                                      if (printtype == "PDF") 
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewiseReport.rptdesign&__format=pdf&'+param, '_blank'); 
                                      else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewiseReport.rptdesign'+param, '_blank'); 
 
                                    }     
				    else if (Rpttype == "PartywisePOlist") {

                                      	var param = (fromdate+todate+compcode);
                                        if (printtype == "PDF") 
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurPartywiseOrderStatus.rptdesign&__format=pdf&'+param, '_blank');
                                        else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurPartywiseOrderStatus.rptdesign'+param, '_blank');
 
           			    }	
			
				    else if (Rpttype == "ItemwisePOlist") {

                                      	var param = (fromdate+todate+compcode);

                                        if (printtype == "PDF") 
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurItemwiseOrderStatus.rptdesign&__format=pdf&'+param, '_blank'); 
                                        else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurItemwiseOrderStatus.rptdesign'+param, '_blank'); 

				    	
           			    }	

				    else if (Rpttype == "Indent - Datewise") {

                                      	var param = (fromdate+finid+todate+compcode);

                                        if (printtype == "PDF") 
			  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewiseIndent.rptdesign&__format=pdf&'+param, '_blank'); 
                                         else
			  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewiseIndent.rptdesign'+param, '_blank');                                           
				    	
           			    }	
				    else if (Rpttype == "Indent - Pending") {

                                      	var param = (fromdate+finid+todate+compcode);

                                        if (printtype == "PDF") 
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDeptwiseIndent.rptdesign&__format=pdf&'+param, '_blank'); 
                                        else
				    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDeptwiseIndent.rptdesign'+param, '_blank'); 
				    	
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
			title   : 'PRINT TYPE',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 250,
			y       : 0,
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
			y       : 70,

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
        title       : 'Purchase General Reports',
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
				 url: '/SHVPM/Purchase/General/ClsPurRep.php', 
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
