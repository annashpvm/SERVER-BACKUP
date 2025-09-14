Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var printtype='PDF';
   var yearfin  = localStorage.getItem('gstyear'); 


 var custcode = 0;
 var custname = 0;
 var partytype = 'A'
 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesReports.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });






var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
//		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
//		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custname = selrow.get('cust_ref');

                  		flxPartySelected.getSelectionModel().selectAll();
			        var selrows = flxPartySelected.getSelectionModel().getCount();
			        var sel = flxPartySelected.getSelectionModel().getSelections();
				var stkcnt  = 0;
                                for (var k=0;k<selrows;k++) 
                                { 
                                    if (sel[k].data.cust_code == custcode)
                                    {
                                        stkcnt = stkcnt + 1;
                                    }
                                } 
                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Customer  Already Selected");
			        }
				else
				{

				   var RowCnt = flxPartySelected.getStore().getCount() + 1;  
                                   flxPartySelected.getStore().insert(
                                   flxPartySelected.getStore().getCount(),
                                    new dgrecord({
					  cust_code    : custcode,
					  cust_ref     : custname,
                                    })
                   		   );
                  		}
                        	flxPartySelected.getSelectionModel().clearSelections();
			}


		}
 
    
   }
   });


   var flxPartySelected = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
//		{header: "Selected Customer List", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

         Ext.Msg.show({
             title: 'Customer',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Customer!',
             fn: function(btn){
               if (btn === 'yes'){
                  var sm = flxPartySelected.getSelectionModel();
                  var selrow = sm.getSelected();
                  flxPartySelected.getStore().remove(selrow);
                  flxPartySelected.getSelectionModel().selectAll();

               }
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


 var loadRepListDatastore = new Ext.data.Store({
      id: 'loadRepListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/TrnSalesDespTarget/ClsTrnSalesDespatchTarget.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRepresentative"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'repr_code', 'repr_name'
 
      ]),
    });


 var loadCustomerListDatastore = new Ext.data.Store({
      id: 'loadCustomerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ViewGroup/ClsView.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'cust_group_name', 'cust_group_code'
 
      ]),
    });



var cmbRepresentative = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbRepresentative',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRepListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                        
	}
	}
});


var cmbGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Party Group',
        width           :  320,
        displayField    : 'cust_group_name', 
        valueField      : 'cust_group_code',
        hiddenName      : '',
        id              : 'cmbGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadCustomerListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                        
	}
	}
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

 var Rpttype="Invoicewise sales";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:800,
    height:300,
    x:0,
    y:0,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
//        rows : 16,
        id: 'optRpttype',

        items: [
		{boxLabel: 'Invoicewise sales', name: 'optRpttype', id:'optDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Invoicewise sales";

					}
				}
			}
		},
		{boxLabel: 'Customer - Invoicewise Sales', name: 'optRpttype', id:'optPS', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Customer - Invoicewise Sales";

					}
				}
			}
		},


		{boxLabel: 'Customerwise Sales', name: 'optRpttype', id:'optPS1', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Customerwise Sales";

					}
				}
			}
		},

		
		{boxLabel: 'Qualitywise sales', name: 'optRpttype', id:'optSalRepPartySize', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Qualitywise sales";
        
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




var tabsalstmt = new Ext.TabPanel({
    	id          : 'SALSTMT',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 320,
	width       : 800,	
	x           : 0,
	y           : 0,
        border      : true,
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
	width       : 825	,	
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
//view




                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                    listeners:{
                      click: function () {




			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
			var param = (p1+p2+p3+p4) ;
//alert(printtype);
			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
                        else
                        if (Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d")  <  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") ) 
                        {
                          alert("Error in the Data Selection...Plese check..");
                        }
			else
           		{
 
                         if (Rpttype == "Invoicewise sales") {
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Invwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Invwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Invwise.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Customer - Invoicewise Sales") {

			    var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Cust_Invwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Cust_Invwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Cust_Invwise.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Customerwise Sales") {


			    var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Customerwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Customerwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Customerwise.rptdesign&' + param, '_blank'); 

                          }


                         if (Rpttype == "Qualitywise sales") {


			    var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Qualitywise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Qualitywise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesAvgCost_Qualitywise.rptdesign&' + param, '_blank'); 

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
			height  : 350,
			width   : 830,
			layout  : 'absolute',
			x       : 30,
			y       : 70,

			items:[tabsalstmt],

		},
              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 150,
                width       : 500,
                x           : 350,
                y           : 330,
                border      : false,
                items: [cmbRepresentative]
               },

              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 500,
                x           : 350,
                y           : 320,
                border      : false,
                items: [cmbGroup]
               },


		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 500,
			x           : 95,
			y           : 430,
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
        width       : 1330,
	x	    : 10,
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
onEsc:function(){
},
	listeners:{
               show:function(){

                   Ext.getCmp('cmbGroup').setVisible(false);
                   Ext.getCmp('cmbRepresentative').setVisible(false);
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
