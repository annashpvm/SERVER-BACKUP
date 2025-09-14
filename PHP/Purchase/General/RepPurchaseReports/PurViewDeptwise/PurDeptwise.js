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

var inditemcode = 0;

var lblIndent = new Ext.form.Label({
    fieldLabel  : 'Indent Details',
    id          : 'lblIndent',
    width       : 350,
    labelStyle  : "font-size:14px;font-weight:bold;color:#e8150d ",
});

var lblPO = new Ext.form.Label({
    fieldLabel  : 'PO Details',
    id          : 'lblPO',
    width       : 150,
    labelStyle  : "font-size:14px;font-weight:bold;color:#e8150d ",
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN Details',
    id          : 'lblGRN',
    width       : 150,
    labelStyle  : "font-size:14px;font-weight:bold;color:#e8150d ",
});




  var loaddeptdatastore = new Ext.data.Store({
      id: 'loaddeptdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/TrnIndent/ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'dept_code', type: 'int',mapping:'dept_code'},
	{name:'dept_name', type: 'string',mapping:'dept_name'}
      ]),
    });



 var loadMonthIndentData = new Ext.data.Store({
      id: 'loadMonthIndentData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeptMonthIndentDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'ind_no','ind_date','item_code','item_name','ind_qty','ind_value'

      ]),
    })




 var loadItemIndentDataStore = new Ext.data.Store({
      id: 'loadItemIndentDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIndentItemDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'ind_no','ind_date','item_code','item_name','ind_qty','ind_po_qty','ind_rec_qty','ind_fin_code'

      ]),
    })


 var loadPOItemDataStore = new Ext.data.Store({
      id: 'loadPOItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPOItemDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'phd_pono', 'phd_podate','cust_ref','item_name','ptr_unit_rate','ptr_ord_qty','ptr_rec_qty'

      ]),
    })

 var loadGRNItemDataStore = new Ext.data.Store({
      id: 'loadGRNItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGRNItemDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['minh_type' , 'minh_minno' , 'minh_mindate', 'cust_ref','item_name','mint_accept_qty','mint_unit_rate'

      ]),
    })


 var loadIndentData = new Ext.data.Store({
      id: 'loadIndentData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeptMonthIndents"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadMonthPOData = new Ext.data.Store({
      id: 'loadMonthPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthPODetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'phd_pono', 'phd_podate', 'ptr_ind_no', 'cust_ref','item_name', 'ptr_ord_qty'

      ]),
    })



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

var reptype = "I";

var optRepType = new Ext.form.FieldSet({
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
        id: 'optRepType',
        items: [
		{boxLabel: 'INDENT', name: 'optRepType', id:'optIndent', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    reptype = "I";
                                             if (cmbDepartment.getValue() != '' ) process_indent();

					}
				}
			}
		},
		{boxLabel: 'PO', name: 'optRepType', id:'optPO', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    reptype = "P";
                        if (cmbDepartment.getValue() != '' ) process_po();
					}
				}
			}
		},
            
        ],
    }
    ]
});

 function process_indent()
{
         Month_Add_inGrid();
			    Ext.getCmp('flxPO').hide();  
			    Ext.getCmp('flxIndent').show(); 
     
			    loadIndentData.removeAll();
			    loadIndentData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadDeptMonthIndents',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                                deptcode : cmbDepartment.getValue(),  
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadIndentData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadIndentData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadIndentData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadIndentData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
				}
			    });
}

function process_po()
{
         Month_Add_inGrid();	
	 Ext.getCmp('flxPO').show();  
				 Ext.getCmp('flxIndent').hide(); 

			    loadPOData.removeAll();
			    loadPOData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadDeptMonthPOs',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                                deptcode : cmbDepartment.getValue(),   
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadPOData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadPOData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadPOData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadPOData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
				}
			    });

}

 var cmbDepartment = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width           : 250,
        displayField    : 'dept_name',
        valueField      : 'dept_code',
        hiddenName      : '',
        id              : 'cmbDepartment',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select Department--',
        mode            : 'local',
        store           : loaddeptdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false, 
        editable        : false,
        allowblank      : false,
	listeners:{
               select : function(){
//alert(cmbDepartment.getValue());
                flxMonth.getStore().removeAll();
                flxIndent.getStore().removeAll();
                flxPO.getStore().removeAll();
       

			if (reptype  == "I") {
                              process_indent();
			}
			else if (reptype  == "P") {
                              process_po(); 		
			}


		}
	}
   });



function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 

    rmon = ("0"+mmon).slice(-2);
    monthstartdate = yr+"-"+rmon+"-01";
    monthenddate = yr+"-"+rmon+"-"+mdays;


     if (reptype  == "I")  {


	    loadMonthIndentData.removeAll();
	    loadMonthIndentData.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params: {
	    	task: 'loadDeptMonthIndentDetails',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
		enddate: Ext.util.Format.date(monthenddate,"Y-m-d"), 
                deptcode : cmbDepartment.getValue(),         
		},
		scope:this,
		callback:function()
		{
	    //      grid_tot_party();
		}
	    });
          }
     else if (reptype  == "P") {      
    	    loadMonthPOData.removeAll();
	    loadMonthPOData.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params: {
	    	task: 'loadDeptMonthPODetails',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
		enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
                deptcode : cmbDepartment.getValue(),  
		},
		scope:this,
		callback:function()
		{
	    //      grid_tot_party();
		}
	    });             
     }  
}

var dgrecord = Ext.data.Record.create([]);

var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:200,
    height: 290,
    hidden:false,
    width: 460,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Nos" , dataIndex: 'nos',sortable:false,width:130,align:'center', menuDisabled: true},
        {header: "Value"  , dataIndex: 'purvalue',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMonth, rowIndex, cellIndex, e) {
		var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();
                repmonth = selrow.get('rmonth');
          	find_dates(selrow.get('moncode'));
        }      
	
   }
});

var flxIndent = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 700,
    id   : 'flxIndent',
//    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Ind.No" , dataIndex: 'ind_no',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'ind_date',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_code',sortable:false,width:100,align:'left', menuDisabled: true ,hidden : true },
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'ind_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Value" , dataIndex: 'ind_value',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store: loadMonthIndentData,
    listeners:{	

       'cellDblclick': function (flxIndent, rowIndex, cellIndex, e) {

		var sm = flxIndent.getSelectionModel();
		var selrow = sm.getSelected();
                inditemcode = selrow.get('item_code');
                indno       = selrow.get('ind_no');


		    loadItemIndentDataStore.removeAll();
		    loadItemIndentDataStore.load({
			url: '/SHVPM/Purchase/General/ClsPurRep.php',
			params: {
		    	task: 'loadIndentItemDetails',
			compcode:GinCompcode,
			fincode :GinFinid,
			item: inditemcode, 
		        indno : indno,  
			},
			scope:this,
			callback:function()
			{
 			   var cnt=loadItemIndentDataStore.getCount();
			   if(cnt>0)
			   {
		            var fincode = loadItemIndentDataStore.getAt(0).get('ind_fin_code');
			   
                            loadPOItemDataStore.removeAll();
			    loadPOItemDataStore.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadPOItemDetails',
				compcode:GinCompcode,
				fincode :fincode,
				item: inditemcode, 
				indno : indno,  
				},
				scope:this,
				callback:function()
				{
                                }
                             }); 

                            loadGRNItemDataStore.removeAll();
			    loadGRNItemDataStore.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadGRNItemDetails',
				compcode:GinCompcode,
				fincode :fincode,
				item: inditemcode, 
				indno : indno,  
				},
				scope:this,
				callback:function()
				{
                                }
                             }); 

                           }
		        } 
		    });
                tabPO.setActiveTab(1);

        } 

    }
});


var flxIndentStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,

    height: 120,
    hidden:false,
    width: 1200,
    id   : 'flxIndentStatus',
//    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Ind.No" , dataIndex: 'ind_no',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'ind_date',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Ind Qty" , dataIndex: 'ind_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Ord Qty" , dataIndex: 'ind_po_qty',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Recd Qty" , dataIndex: 'ind_rec_qty',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store: loadItemIndentDataStore,
    listeners:{	

            'cellDblclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var indno = selrow.get('ind_no')
		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&indno=" + encodeURIComponent(indno);
                  var param = (p1+p2+p3) ;  
                  if (printtype == "PDF") 
		     window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
	             window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 


   }
}
});

var flxPOStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,

    height: 120,
    hidden:false,
    width: 1200,
    id   : 'flxPOStatus',
//    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "PO.No" , dataIndex: 'phd_pono',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'phd_podate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Rate" , dataIndex: 'ptr_unit_rate',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "PO Qty" , dataIndex: 'ptr_ord_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Recd Qty" , dataIndex: 'ptr_rec_qty',sortable:false,width:120,align:'right', menuDisabled: true},

    ],
     store: loadPOItemDataStore,
    listeners:{	

            'cellDblclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var pono = selrow.get('phd_pono')
  
var purchasehead = '.';
	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&pono=" + encodeURIComponent(pono);
		var p4 = "&purhead=" + encodeURIComponent(purchasehead);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank');


   }
}
});



var flxGRNStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,

    height: 120,
    hidden:false,
    width: 1200,
    id   : 'flxGRNStatus',
//    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Type" , dataIndex: 'minh_type',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "GRN No." , dataIndex: 'minh_minno',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "GRN Date" , dataIndex: 'minh_mindate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'mint_accept_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Rate" , dataIndex: 'mint_unit_rate',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store: loadGRNItemDataStore,
    listeners:{	

            'cellDblclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('minh_minno')
                  var grntype = selrow.get('minh_type')

		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&minno=" + encodeURIComponent(grnno);

                  if (grntype == "P")
                  {    
		     	  var p4 = "&purtype=" + encodeURIComponent(grntype);
		          var param = (p1+p2+p3+p4) ;  
		          if (printtype == "PDF") 
			  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param);
		          else
			  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param);
                   }
                   else
                   {
		          var param = (p1+p2+p3) ;  
		          if (printtype == "PDF") 
			  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param);
		          else
			  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign' + param);
                   }    

   }
}
});


var flxPO = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 700,
    //id: 'my-grid',  
    id   : 'flxPO',
    columns:
    [ 	 	
        {header: "PO.No" , dataIndex: 'phd_pono',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'phd_podate',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Ind.No" , dataIndex: 'ptr_ind_no',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'ptr_ord_qty',sortable:false,width:100,align:'left', menuDisabled: true},

    ],
     store: loadMonthPOData,
    listeners:{	

            'cellclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var pono = selrow.get('phd_pono')
  
var purchasehead = '.';
	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&pono=" + encodeURIComponent(pono);
		var p4 = "&purhead=" + encodeURIComponent(purchasehead);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 



   }
}
});

var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
        flxMonth.getStore().removeAll();

   for (var i=1;i<13;i++)
   {   
        switch (i) {
           case 1 :
             monthdisplay = "APRIL";
             monthcode = 4;
             break;
           case 2 :
             monthdisplay = "MAY";
             monthcode = 5;
             break;
           case 3 :
             monthdisplay = "JUNE";
             monthcode = 6;
             break;
           case 4 :
             monthdisplay = "JULY";
             monthcode = 7;
             break;
           case 5 :
             monthdisplay = "AUGUST";
             monthcode = 8;
             break;
           case 6 :
             monthdisplay = "SEPTEMBER";
             monthcode = 9;
             break;
           case 7 :
             monthdisplay = "OCTOBER";
             monthcode = 10;
             break;
           case 8 :
             monthdisplay = "NOVEMBER";
             monthcode = 11;
             break;
           case 9 :
             monthdisplay = "DECEMBER";
             monthcode = 12;
             break;
           case 10 :
             monthdisplay = "JANUARY";
             monthcode = 1;
             break;
           case 11 :
             monthdisplay = "FEBRUARY";
             monthcode = 2;
             break;
           case 12 :
             monthdisplay = "MARCH";
             monthcode = 3;
             break;
        
        }
  
        var RowCnt = flxMonth.getStore().getCount() + 1;

        flxMonth.getStore().insert(
        flxMonth.getStore().getCount(),
        new dgrecord({
           moncode : monthcode,
           rmonth  : monthdisplay,
       }) 
       );
   }
}
 

var tabPO = new Ext.TabPanel({
    id          : 'PurchaseOrder',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#eaeded"},
    activeTab   : 0,
    height      : 550,
    width       : 1325,
    x           : 2,
    items       : [
        {
            xtype: 'panel',
            title: 'INDENT / PO DETAILS',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1260,
                    height      : 480,
                    x           : 10,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 120,
                width   : 460,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 15,
			y       : 0,
			items:[optRepType],
		},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 450,
				x           : 10,
				y           : 55,
				border      : false,
				items: [cmbDepartment]
			},


					
                ]

            }, 

            { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 20,
			     y       : 160,
                             items: [flxMonth]	
            },     flxIndent, flxPO,

		{ 
			xtype   : 'fieldset',
			title   : 'PRINT TYPE',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 650,
			y       : 0,
			items:[optprinttype],
		},

                    ]
                 }
             ]  
         },
        {
            xtype: 'panel',
            title: 'PO / GRN DETAILS',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1260,
                    height      : 490,
                    x           : 10,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
			    labelWidth  : 300,
			    x		: 10,
			    y		: -10,
                            border      : false,
                            items: [lblIndent]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
			    labelWidth  : 300,
			    x		: 10,
			    y		: 155,
                            border      : false,
                            items: [lblPO]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
			    labelWidth  : 300,
			    x		: 10,
			    y		: 315,
                            border      : false,
                            items: [lblGRN]
                        },

			    { 
		             xtype   : 'fieldset',
		             title   : '',
		             border  : false,
			     x       : 10,
			     y       : 10,
		             items: [flxIndentStatus]	
			    },

			    { 
		             xtype   : 'fieldset',
		             title   : '',
		             border  : false,
			     x       : 10,
			     y       : 175,
		             items: [flxPOStatus]	
			    },

			    { 
		             xtype   : 'fieldset',
		             title   : '',
		             border  : false,
			     x       : 10,
			     y       : 335,
		             items: [flxGRNStatus]	
			    },


                    ]
                 }
             ]  
         },
     ]                   
   });

   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
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
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if (cmbDepartment.getValue()==0)
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}

				else
				{

				//	var pono=Ext.getCmp('cmbstrepno').getRawValue();
					if(cmbDepartment.getValue() == "1"){
				

						var d2='P';  
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);  
						var p3 = "&indno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;     
       if (printtype == "PDF") 
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "2"){
				

						var d2='P';

						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&pono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;   
                                                if (printtype == "PDF")                       
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                                                else
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "5"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&clrno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurTransportClearance.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "6"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&gentno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDeliveryNoteReceipt.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "7"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&wono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurWorkOrder.rptdesign' + param , '_blank'); 

					}		                   
		                }
			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                flxMonth.getStore().removeAll();
                flxIndent.getStore().removeAll();
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
ReppreprintWindow.hide();
                        }
                }]
        },
       items: [tabPO]
/*
        items: [

            
        ],
*/
    });
    


   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
	x	    : 10,
        y           : 35,
        title       : 'Purchase PrePrinted Reports',
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
    

                 Ext.getCmp('flxPO').hide();  
                 Ext.getCmp('flxIndent').show();  
                 Month_Add_inGrid();

			 /*loadgrnprint.load({
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
    ReppreprintWindow.show();  
});
