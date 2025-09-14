Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 



  var printtype='PDF';

 var GrpCode = 0;
 var GrpName = 0;




 var loadGroupItemsData = new Ext.data.Store({
      id: 'loadGroupItemsData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupitemList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
 // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'phd_pono', 'phd_podate', 'ptr_ind_no', 'sup_refname','item_name', 'ptr_ord_qty'

      ]),
    })



 var loadPODataStore = new Ext.data.Store({
      id: 'loadPODataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPOHistory"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[      'phd_other_ref', 'ptr_ind_no', 'ptr_podate','ptr_pono', 'cust_name', 'item_name',
'ptr_remarks', 'uom_short_name', 'ptr_ord_qty','phd_deliverydate', 'minh_minno','minh_bill_no', 'minh_bill_date',
'mint_recdqty_bill', 'mint_accept_qty'

      ]),
    })


 var loadItem_Party_PODataStore = new Ext.data.Store({
      id: 'loadItem_Party_PODataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItem_Party_POPendings"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[  
'phd_podate', 'phd_pono', 'cust_ref', 'item_name', 'uom_short_name', 'pend_qty', 'pend_value', 'rate'

      ]),
    })



 function data_refresh()
 {
	loadPODataStore.removeAll();
	loadPODataStore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params: {
	    	task      : 'loadPOHistory',
		compcode  : GinCompcode,
		finid     : GinFinid,
		startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),  
		enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),  
		},
		scope:this,
		callback:function()
		{

		}
	}); 
} 

 var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date() ,
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              data_refresh();
           },
           keyup:function(){
              data_refresh();
            },
           change:function(){
              data_refresh();
            },
        }   
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
        width : 110,
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              data_refresh();
           },
           keyup:function(){
              data_refresh();
            },
           change:function(){
              data_refresh();
            },
        }   
   
    });

var lblGroup = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGroup',
    width       : 150,
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});







    var btnReport1 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Report-1",
	width   : 90,
	height  : 50,
        id:'btnReport1',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 = "&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 = "&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals.rptdesign&__format=pdf&' + param, '_blank');	
                    else
                    if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals.rptdesign' + param, '_blank');	



	    }
	}
	});



    var btnReport2 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Report-2",
	width   : 90,
	height  : 50,
        id:'btnReport2',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 = "&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 = "&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals2.rptdesign&__format=pdf&' + param, '_blank');	
                    else
                    if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals2.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDatewisePO_Arrivals2.rptdesign' + param, '_blank');	



	    }
	}
	});



   var dgrecord = Ext.data.Record.create([]);













 var loadPOData = new Ext.data.Store({
      id: 'loadPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeptMonthPOs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadpreprint = new Ext.data.Store({
      id: 'loadpreprint',
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


 var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

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




var dgrecord = Ext.data.Record.create([]);



var flxPO = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:65,
    height: 450,
    hidden:false,
    width: 1200,
    //id: 'my-grid',  
    id   : 'flxPO',
    columns:
    [ 
	 	
        {header: "Department"  , dataIndex: 'phd_other_ref',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Indent"  , dataIndex: 'ptr_ind_no',sortable:false,width:50,align:'left', menuDisabled: true},
        {header: "PO Date"  , dataIndex: 'ptr_podate',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "PO No."  , dataIndex: 'ptr_pono',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Supplier"  , dataIndex: 'cust_name',sortable:false,width:250,align:'left', menuDisabled: true},
        {header: "Item Name"  , dataIndex: 'item_name',sortable:false,width:370,align:'left', menuDisabled: true},
        {header: "Specifications"  , dataIndex: 'ptr_remarks',sortable:false,width:370,align:'left', menuDisabled: true},
        {header: "UOM"   , dataIndex: 'uom_short_name',sortable:false,width:70,align:'center', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'ptr_ord_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Commitment" , dataIndex: 'phd_deliverydate',sortable:false,width:130,align:'center', menuDisabled: true},
        {header: "GRN No."  , dataIndex: 'minh_minno',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Bill No."  , dataIndex: 'minh_bill_no',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Date of Receipt"  , dataIndex: 'minh_mindate',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Qty Receipt"  , dataIndex: 'mint_recdqty_bill',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Accepted Qty"  , dataIndex: 'mint_accept_qty',sortable:false,width:100,align:'right', menuDisabled: true},



    ],
     store: loadPODataStore,
    listeners:{	

            'cellclick': function (flxPO, rowIndex, cellIndex, e) {
                  var sm = flxPO.getSelectionModel();
		  var selrow = sm.getSelected();
                  var ItemCode = selrow.get('item_code')
                        RepPrePrintFormPannel.setActiveTab(1);
			loadItem_Party_PODataStore.removeAll();
			loadItem_Party_PODataStore.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadItem_Party_POPendings',
				compcode  : GinCompcode,
				finid     : GinFinid,
				startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),  
				enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),  
				itemcode  : ItemCode,  
				},
				scope:this,
				callback:function()
				{

				}
			}); 

   }
}
});

var flxItem = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:65,
    height: 450,
    hidden:false,
    width: 1260,
    //id: 'my-grid',  
    id   : 'flxItem',
    columns:
    [ 	 	
        {header: "PO DATE"  , dataIndex: 'phd_podate',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "PO NO"  , dataIndex: 'phd_pono',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "SUPPLIER"  , dataIndex: 'cust_ref',sortable:false,width:300,align:'left', menuDisabled: true},
        {header: "ITEM NAME"  , dataIndex: 'item_name',sortable:false,width:300,align:'left', menuDisabled: true},

        {header: "UOM"   , dataIndex: 'uom_short_name',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'pend_qty',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'pend_value',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Rate"  , dataIndex: 'rate',sortable:false,width:100,align:'left', menuDisabled: true},

    ],
     store: loadItem_Party_PODataStore,
    listeners:{	

            'cellclick': function (flxPO, rowIndex, cellIndex, e) {
                  var sm = flxPO.getSelectionModel();
		  var selrow = sm.getSelected();
                  var pono = selrow.get('phd_pono')


   }
}
});

   var RepPrePrintFormPannel = new Ext.TabPanel({
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'GROUP LIST',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 10,
			     y       : 20,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 210,
			     y       : 20,
                       	     width   : 250,
                             items: [monthenddate]
                        },


      flxPO,

	{
	    xtype       : 'fieldset',
	    title       : '',
	    width       : 700,
	    labelWidth  : 1,
	    x           : 420,
	    y           : 13,
	    defaultType : 'Label',
	    border      : false,
	    items: [lblGroup]
	},



		{ 
			xtype   : 'fieldset',
			title   : 'PRINT TYPE',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 860,
			y       : 0,
			items:[optprinttype],
		},

		      { 
		             xtype       : 'fieldset',
		             title       : '',
		             labelWidth  : 70,
		             width       : 120,
		             border      : false,
			     x           : 1075,
			     y           : 0,
		             items: [btnReport1]
		       },
		      { 
		             xtype       : 'fieldset',
		             title       : '',
		             labelWidth  : 70,
		             width       : 120,
		             border      : false,
			     x           : 1175,
			     y           : 0,
		             items: [btnReport2]
		       },     
        ],
      },

      {
        xtype: 'panel',
        title: 'PARTYWISE DETAILS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
               flxItem       
        ]
      }       

      ], 
    });
    


   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
	x	    : 10,
        y           : 35,
        title       : 'Groupwise Penging Orders ',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
                monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d"));
                data_refresh();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
