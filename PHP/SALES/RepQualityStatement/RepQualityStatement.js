Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var fm = Ext.form; 
   var usertype = localStorage.getItem('ginuser');
   var gstFlag = "Add";
   var dealercode = 0;
   var repcode = 0;
   var custtype = 0;
   var taxcode = 0;
   var ins = "Y";
   var insper = 0;
   var gstadd ="true";
   var viewopt = 0;

   var editrow = 0;
   var gridedit = "false";
   var qlylist = "0";

   var custlist = "0";  
   var repprint = 1;

   var qlyopt  = 0;
   var custopt = 0;
   var repopt = 0;

   var printtype="PDF";



var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    width:300,
    height:90,

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
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
   var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url:'ClsQualityStatement.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'quality', 'vargrp_type_short_code', 'var_bf'
      ]),
    });



 var loadReportDataStore = new Ext.data.Store({
      id: 'loadReportDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsQualityStatement.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSalesDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'var_desc', 'cust_ref', 'qty', 'beforetax'
      ]),
    });


 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsQualityStatement.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });

var txtQty = new Ext.form.TextField({
        fieldLabel  : 'Tot.Qty',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly   : true,
  });

var txtValue = new Ext.form.TextField({
        fieldLabel  : 'Tot.Value',
        id          : 'txtValue',
        name        : 'txtValue',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly   : true,
  });


function grid_tot(){

        var despwt = 0;
        var despval = 0;
        var Row= FlxDespatch.getStore().getCount();
        FlxDespatch.getSelectionModel().selectAll();
        var sel=FlxDespatch.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
              if (Number(sel[i].data.qty) > 0)
              {
		      despwt=despwt+Number(sel[i].data.qty);
		      despval=despval+Number(sel[i].data.beforetax);
              }
         }
         txtQty.setValue(despwt);
         txtValue.setValue(despval);

}
var txtCustomerName = new Ext.form.TextField({
        fieldLabel  : 'Customer Name',
        id          : 'txtCustomerName',
        name        : 'txtCustomerName',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : loadAllCustomerStore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  FlxCustomer.getStore().filter('cust_ref', txtCustomerName.getValue());  
            }
        }

  });

var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = FlxQuality.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.quality);
}
}
}
});

var sm2 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm2) {
var selected_rows = FlxCustomer.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.cust_ref);
}
}
}
});


 var loadSalesSizestore = new Ext.data.Store({
      id: 'loadSalesSizestore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsQualityStatement.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsizedetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'quality','bf','gsm','size','reelno','weight'
      ]),
    });




function getQualityDetails()
{

            qlylist = "0";
  	    var sel = FlxQuality.getSelectionModel().getSelections();
	    for (var t=0; t<sel.length; t++)
	    {
		if (qlylist === "")
		      qlylist =  sel[t].data.quality;
		else
		      qlylist = qlylist + ","  + sel[t].data.quality;
	    }
//            sonolist = sonolist+")";


}

function getCustomerDetails()
{
    custlist = "0";
    var sel = FlxCustomer.getSelectionModel().getSelections();
    for (var t=0; t<sel.length; t++)
    {
	if (custlist === "")
	      custlist =  sel[t].data.cust_ref;
	else
	      custlist = custlist + ","  + sel[t].data.cust_ref;
    }
}

var fm1 = Ext.form;
var FlxQuality = new Ext.grid.EditorGridPanel({
    frame: false,
    id : 'FlxQuality',
    hideHeaders : false,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 280,
    width: 200,
    x: 280,
    y: 10,
    selModel: sm1,
    columns: [sm1,
        {header: "Quality", dataIndex: 'quality',sortable:true,width:70,align:'left',hidden:false}

    ],
    store   : loadVarietyDatastore,
	  listeners:{
                'cellclick' : function (flxDesc, rowIndex, cellIndex, e) {
                     getQualityDetails();
                    }
          }

});  

var fm2 = Ext.form;
var FlxCustomer = new Ext.grid.EditorGridPanel({
    frame: false,
    id : 'FlxCustomer',
    hideHeaders : false,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 250,
    width: 500,
    searchSettings: { fields: ['cust_ref'], operator: 'contains', key: 'Ha', ignoreCase: true },
    x: 500,
    y: 40,
    selModel: sm2,
    columns: [sm2,
        {header: "Customer", dataIndex: 'cust_ref',sortable:true,width:400,align:'left',hidden:false}

    ],
    store   : loadAllCustomerStore,
	  listeners:{
                'cellclick' : function (FlxCustomer, rowIndex, cellIndex, e) {
                     getCustomerDetails();
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

var dtpasondate = new Ext.form.DateField({
    fieldLabel : 'As On Date',
    id         : 'dtpasondate',
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

var btnView = new Ext.Button({
    style   : 'text-align:center;',
    text    : "View",
    width   : 80,
    height  : 40,
    x       : 1050,
    y       : 250,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   tabindex : 1,
   listeners:{
       click: function()
       {
                loadReportDataStore.removeAll();
		loadReportDataStore.load({
                url: 'ClsQualityStatement.php',
                params: {
                    task: 'loadSalesDetails',
		    compcode : Gincompcode,
		    fincode  : GinFinid,
                    fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),	
                    todate   : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),	
                    quality  : qlylist,
                    customer : custlist,     
                    qlyopt   : qlyopt,
                    custopt  : custopt,
                },
            	callback: function (options, success, response)
                {
            grid_tot();  
                }
            });
     //       grid_tot();  
       }
   }
});

var btnPrint = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Print",
    width   : 80,
    height  : 40,
    x       : 1150,
    y       : 250,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   tabindex : 1,
   listeners:{
    click: function(){

//alert(sonolist);



		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&quality=" + String(encodeURIComponent(qlylist));
		var p6 = "&customer=" + String(encodeURIComponent(custlist));
                var p7 = "&qlyopt=" + encodeURIComponent(qlyopt);
                var p8 = "&custopt=" + encodeURIComponent(custopt);
                var param = (p1+p2+p3+p4+p5+p6+p7+p8);
                        if (Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d")  <  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") ) 
                        {
                          alert("Error in the Data Selection...Plese check..");
                        }
			else
                if (repopt == 0) 
                {      
		        if (printtype == "PDF")           
		   	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBF.rptdesign&__format=PDF&' + param, '_blank');
			else
		   	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBF.rptdesign&__format=XLS&' + param, '_blank');
                 } 
                else        
                if (repopt == 1)   
                {     
			if (printtype == "PDF")  
	   	    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSM.rptdesign&__format=PDF&' + param, '_blank');
		        else
	   	    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSM.rptdesign&__format=XLS&' + param, '_blank');
                 }
                else
                if (repopt == 2)                
                {     
		   if (printtype == "PDF")  
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSMParty.rptdesign&__format=PDF&' + param, '_blank');
                   else
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSMParty.rptdesign&__format=XLS&' + param, '_blank');

                }      
                else
                if (repopt == 3)   
                {     
		   if (printtype == "PDF")               
           	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyAbstract.rptdesign&__format=PDF&' + param, '_blank');
                   else
           	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyAbstract.rptdesign&__format=XLS&' + param, '_blank');

                }   
                else
                if (repopt == 4) 
                {     
		   if (printtype == "PDF")               
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyBFGSMMonthwise.rptdesign&__format=PDF&' + param, '_blank');
                   else
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyBFGSMMonthwise.rptdesign&__format=XLS&' + param, '_blank');

                }
                else
                if (repopt == 5)                
                {     
		   if (printtype == "PDF")   
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMParty.rptdesign&__format=PDF&' + param, '_blank');                 
                   else
   	    	      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMParty.rptdesign&__format=XLS&' + param, '_blank');                 
                }    
                if (repopt == 6)                
                {     
		   if (printtype == "PDF")   
               	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/                 RepSalesGSMBFParty.rptdesign&__format=PDF&' + param, '_blank');     
                   else
               	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/                 RepSalesGSMBFParty.rptdesign&__format=XLS&' + param, '_blank');     
                }
   }
    }
});
 

var fm2 = Ext.form;
var FlxDespatch = new Ext.grid.EditorGridPanel({
    frame: false,
   sm: new Ext.grid.RowSelectionModel(),
  
    autoShow: true,
    stripeRows : true,
    scrollable: true,
 
    height: 220,
    width: 780,
    x: 450,
    y: 300,
    
    columns: [
        {header: "Quality",   dataIndex: 'var_desc',sortable:true,width:150,align:'left', menuDisabled: true},
	{header: "Customer",  dataIndex: 'cust_ref',     sortable:true,width:280,align:'left', menuDisabled: true},
	{header: "QTY",       dataIndex: 'qty',    sortable:true,width:100,align:'left', menuDisabled: true},
	{header: "BEFORE TAX",dataIndex: 'beforetax',   sortable:true,width:120,align:'left', menuDisabled: true},
	
    ],
    store : loadReportDataStore,
});  

var optRepSelect = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: 'Select Report',
    layout : 'hbox',
    width: 180,
    height:200,
    x:1050,
    y:10,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRepSelect',
        items: [
            {boxLabel: 'BFwise', name: 'optRepSelect', id:'optbf', inputValue: 2,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  repopt = 0;
               }
              }
             }},

            {boxLabel: 'BF - GSMise', name: 'optRepSelect', id:'optbfgsm', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 1;                    
                  }
               }
              }
            },

            {boxLabel: 'BF - GSM - Partywise', name: 'optRepSelect', id:'optpartybf', inputValue: 1, 
              listeners:{ 
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 2;                    
                  }
               }
              }
            },
           
      
            {boxLabel: 'Partywise', name: 'optRepSelect', id:'optparty', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 3;                    
                  }
               }
              }
            },  
            {boxLabel: 'Party-BF-GSMwise', name: 'optRepSelect', id:'optpartybfgsm', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 4;                    
                  }
               }
              }
            },

            {boxLabel: 'GSM - Pary wise', name: 'optRepSelect', id:'optpartygsm', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 5;                    
                  }
               }
              }
            },  
  /*
            {boxLabel: 'GSM - BF - Pary wise', name: 'optRepSelect', id:'optpartygsmbf', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                  repopt = 6;                    
                  }
               }
              }
            },  
*/

    ]
             }
             ]
             });




var optselectiveQuality = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width: 210,
    height:70,
    x:20,
    y:100,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optquality',
        items: [
            {boxLabel: 'All Quality', name: 'optselective', id:'optAllQly', inputValue: 2,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  qlyopt  = 0;
                  Ext.getCmp('FlxQuality').setDisabled(true);       
                
               }
              }
             }},

            {boxLabel: 'Selective Quality', name: 'optselective', id:'optQly1', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                    qlyopt  = 1;
                    Ext.getCmp('FlxQuality').setDisabled(false);
                    
                  }
               }
              }
            },

              
            ]
             }
             ]
             });





var optselectiveCustomer = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width: 210,
    height:70,
    x:20,
    y:180,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optcustomer',
        items: [
            {boxLabel: 'All Customer', name: 'optselectiveCustomer', id:'optAllCust', inputValue: 2,checked:true, 
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                    custopt  = 0;
                    Ext.getCmp('FlxCustomer').setDisabled(true);        
                
               }
              }
             }},

            {boxLabel: 'Selective Customer', name: 'optselectiveCustomer', id:'optcust', inputValue: 1,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     custopt  = 1;
                     Ext.getCmp('FlxCustomer').setDisabled(false);                    
                  }
               }
              }
            },

              
            ]
             }
             ]
             });

var RepQualiStatementPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PRODUCTION ENTRY',
        header      : false,
        width       : 1340,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 750,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepQualiStatementPanel',
        method      : 'POST',
        layout      : 'absolute',
        items       : [     
		    { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 565,
		        width   : 1280,
			//style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
		                { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 140,
					width       : 500,
					x           : 500,
					y           : 0,
					border      : false,
					items: [txtCustomerName]
                       		},
		                { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 300,
					x           : 700,
					y           : 511,
					border      : false,
					items: [txtQty]
                       		},
		                { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 400,
					x           : 900,
					y           : 511,
					border      : false,
					items: [txtValue]
                       		},

                       { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : -10,
                             items: [optprinttype]
                        },

		                   FlxQuality,FlxDespatch,btnView,btnPrint,optselectiveQuality,optselectiveCustomer,optRepSelect,
                                   FlxCustomer,
				   { 
					xtype       : 'fieldset',
					title       : '',
                                        id          : 'fromtodate',
					labelWidth  : 50,
					width       : 210,
					x           : 20,
					y           : 290,
					layout  : 'absolute',
					height  : 100,
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
							x           : 0,
							y           : 40,
							border      : false,
							items: [dtpeddate]
						},
					]
					},

				  

                        ],
                    }
       ],     
});

function RefreshData()
{
                Ext.getCmp('FlxQuality').setDisabled(true);
                Ext.getCmp('FlxCustomer').setDisabled(true);
		loadAllCustomerStore.load({
                url: 'ClsQualityStatement.php',
                params: {
                    task: 'loadcustomer',
		    compcode:Gincompcode

                }
            });

}
  var TrnQualityStatement = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 25,
        title       : 'QUALITY STATEMENT',
        items       : RepQualiStatementPanel,
        layout      : 'fit',
        closable    : true,
	bodyStyle   :{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                      RefreshData();	   	
	   	}

		}
    });
    TrnQualityStatement.show(); 


});
