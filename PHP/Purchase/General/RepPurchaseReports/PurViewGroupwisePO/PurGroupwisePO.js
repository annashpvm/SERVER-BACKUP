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

 function data_refresh()
 {
	loadItemPODataStore.removeAll();
	loadItemPODataStore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params: {
	    	task      : 'loadItemPOPendings',
		compcode  : GinCompcode,
		finid     : GinFinid,
		startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),  
		enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),  
		grpcode   : GrpCode,  
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



 var loadItemPODataStore = new Ext.data.Store({
      id: 'loadItemPODataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemPOPendings"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[      'item_code', 'item_name', 'uom_short_name','pend_qty', 'rate', 'pend_value'

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

 var loadSearchGroupDatastore = new Ext.data.Store({
      id: 'loadSearchGroupDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchGroupList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'grp_code', 'grp_name'
 

      ]),
    });



function GroupSearch()
{

        loadSearchGroupDatastore.removeAll();
        loadSearchGroupDatastore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params:
		{
			task:"loadSearchGroupList",
			group : txtGroup.getRawValue(),
		},
        });
}
    var btnView = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Abstract",
	width   : 90,
	height  : 50,
        id:'btnView',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 ="&grpcode="+encodeURIComponent(GrpCode);    
		    var p6 ="&grpname="+encodeURIComponent(GrpName);  

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupwisePOPending.rptdesign&__format=pdf&' + param, '_blank');	
                    else
                    if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupwisePOPending.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupwisePOPending.rptdesign' + param, '_blank');	



	    }
	}
	});

    var btnView2 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Detailed",
	width   : 90,
	height  : 50,
        id:'btnView2',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 ="&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 ="&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 ="&grpcode="+encodeURIComponent(GrpCode);    
		    var p6 ="&grpname="+encodeURIComponent(GrpName);  

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupPartywisePOPending.rptdesign&__format=pdf&' + param, '_blank');	
                    else
                    if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupPartywisePOPending.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurGroupPartywisePOPending.rptdesign' + param, '_blank');		



	    }
	}
	});

var txtGroup = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtGroup',
        name        : 'txtGroup',
        width       :  280,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchGroupDatastore.removeAll();
                  if (txtGroup.getRawValue() != '')
                  {  
                     GroupSearch();
                  }
                  else
                  {
			loadSearchGroupDatastore.removeAll();
			loadSearchGroupDatastore.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params:
				{
					task  :"loadSearchGroupList",
		                        group : '0',
				},
			});
                  } 
            }
         }  
    });



   var dgrecord = Ext.data.Record.create([]);
   var flxGroup = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 280,
//        header : false,
        x: 15,
        y: 22,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Group Code", dataIndex: 'grp_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'grp_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchGroupDatastore,
        listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxGroup.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('sup_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				GrpCode  = selrow.get('grp_code');
				GrpName  = selrow.get('grp_name');
                                txtGroup.setRawValue(selrow.get('grp_name'));
                                data_refresh();

				lblGroup.setText("Detail for   : " + GrpName  );
				lblGroup.getEl().setStyle('color', 'red');
				lblGroup.getEl().setStyle('font-size', '18px');
				lblGroup.getEl().setStyle('font-weight', 'bold');

                           }

			}

          }

   });













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
    x:400,
    y:65,
    height: 450,
    hidden:false,
    width: 840,
    //id: 'my-grid',  
    id   : 'flxPO',
    columns:
    [ 	 	
        {header: "Code"  , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden : true},
        {header: "Item"  , dataIndex: 'item_name',sortable:false,width:370,align:'left', menuDisabled: true},
        {header: "UOM"   , dataIndex: 'uom_short_name',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'pend_qty',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'pend_value',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Rate"  , dataIndex: 'rate',sortable:false,width:100,align:'left', menuDisabled: true},

    ],
     store: loadItemPODataStore,
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

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 445,
                width   : 330,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 70,

                items:[

           	     { 
			   xtype       : 'fieldset',
			   title       : '',
			   labelWidth  : 1,
			   width       : 600,
			   x           : 0,
			   y           : -10,
			   border      : false,
			   items: [txtGroup]
	              }, flxGroup,




					
                ]

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
		             items: [btnView]
		       },

     		      { 
		             xtype       : 'fieldset',
		             title       : '',
		             labelWidth  : 70,
		             width       : 120,
		             border      : false,
			     x           : 1170,
			     y           : 0,
		             items: [btnView2]
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
		loadSearchGroupDatastore.removeAll();
		loadSearchGroupDatastore.load({
			url: '/SHVPM/Purchase/General/ClsPurRep.php',
			params:
			{
				task  :"loadSearchGroupList",
                                group : '0',
			},
		});	
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
