Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode  = localStorage.getItem('gincompcode');
   var GinFinid     = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate   = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  



var loadPendingListLedgerDatastore = new Ext.data.GroupingStore({
      id: 'loadPendingListLedgerDatastore',
       proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReturnablePendingList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'department_name','dch_date','dch_no','sup_name','item_name','uom_short_name','dct_issqty','dct_rate','dct_rate'
/*
      {name:'grp_name',type:'string'},
      {name:'subgrp',type:'int'},
      {name:'led_name',type:'string'},
      {name:'debit',type:'float'},
      {name:'credit',type:'float'},  
      {name:'acctran_led_code',type:'int'},
*/
      ]
      ),
      sortInfo: {field: 'dch_date', direction: 'ASC'},
            groupField: 'department_name',
});


    var AsonDate = new Ext.form.DateField({
        fieldLabel : ' Pending List As on ',
        id: 'AsonDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",   
        width       : 120,   
    });


var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       

		    Ext.Ajax.request({
		    url: '/SHVPM/Stores/RepGSReports/GSGeneralReports/RepGSRPT.php',
		    params :
		     {
		       compcode     : GinCompcode,
		       finid	    : GinFinid,
		       fromdate	    : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		       todate	    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
		       finstartdate : finstartdate,
		       RPT	    : "STORELEDGER"
		                                    	
		    },
                    callback:function()
	            {

			loadGroupListDataStore.removeAll();
			loadGroupListDataStore.load({
			 url: '/SHVPM/Stores/ClsViewRep.php',
				params: {
			    	task: 'loadGroupDetails',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
				enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

				},

		       	scope:this,
				callback:function()
				{

				   grid_tot();
				}
			    });

                    }
			    });     
       	 }
        }   
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
 


    // define a custom summary function
    Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
        return v + (record.data.credit);
    };

  // utilize custom extension for Group Summary
    var summary = new Ext.ux.grid.GroupSummary();


var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
         hidden:false,
        stripeRows : true,
        scrollable: true,
        x: 10,
        y: 80,
        height: 400,
        width: 1280,
         id: 'my-grid',     
        columns: [   

            {header: "Department", dataIndex: 'department_name',sortable:true,width:100,align:'left'},
            {header: "Date", dataIndex: 'dch_date',sortable:true,width:100,align:'left'},
            {header: "DCNo", dataIndex: 'dch_no',sortable:true,width:150,align:'left'},
            {header: "Party", dataIndex: 'sup_name',sortable:true,width:250,align:'left'},
            {header: "Item Name", dataIndex: 'item_name',sortable:true,width:100,align:'left'},
            {header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:80,align:'center'},
	    {header: "Qty", dataIndex: 'dct_issqty',sortable:true,width:100,align:'right'},
	    {header: "Rate", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
	    {header: "Value", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
	    {header: "Due Date", dataIndex: 'os_taxable',sortable:true,width:100,align:'right'},
	    {header: "OD DAYS", dataIndex: 'os_cgstper',sortable:true,width:75,align:'right'},

        ],
        store: loadPendingListLedgerDatastore,

  
        view: new Ext.grid.GroupingView({
            forceFit: false,
            showGroupName: false,
            enableNoGroups: false,
            enableGroupingMenu: false,
            hideGroupedColumn: true

        }),
        plugins: summary,
/*
        tbar : [{
            text: 'Toggle',
            tooltip: 'Toggle the visibility of summary row',
            handler: function(){summary.toggleSummaries();}
        }],
*/

 
        frame: true,

        clicksToEdit: 1,
        collapsible: true,
        animCollapse: false,
        trackMouseOver: false,
        //enableColumnMove: false,
        title: '',
        iconCls: 'icon-grid',
        renderTo: document.body,
        listeners:{	
       'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                invno = selrow.get('os_invno');

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&invno=" + encodeURIComponent(invno);
                var p4 = "&displayword=" + encodeURIComponent("ORIGINAL FOR BUYER"); 
		var param = (p1+p2+p3+p4) ;                        
                if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param, '_blank');     


        
        }   
        }

   });



 var RepSalesPannel = new Ext.TabPanel({
    id          : 'RepSalesPannel',
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
        title: 'Returnable List',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{
		    xtype       : 'fieldset',
		    title       : '',
		    labelWidth  : 150,
		    width       : 400,
		    x           : 20,
		    y           : 20,
		    border      : false,
		    items: [AsonDate]
		}, 

		{ 
		     xtype   : 'fieldset',
		     title   : '',
		     labelWidth  : 70,
		     width       : 120,
		     border  : false,
		     x       : 350,
		     y       : 15,
		     items: [btnProcess]
		},
                { 
			xtype   : 'fieldset',

			border  : true,
			height  : 50,
			width   : 300,
			layout  : 'absolute',
			x       : 720,
			y       : 20,
			items:[optprinttype],
           	},
                flxDetail,

         ],
    } ,
   
    ]       
});



function Refreshdata()
    {

   	loadPendingListLedgerDatastore.removeAll();
	loadGroupLedgerDatastore.load({
	 url: '/SHVPM/Stores/ClsViewRep.php',
                params: {
	    	task: 'loadReturnablePendingList',
                compcode:Gincompcode,
                finid:GinFinid,
                asondate: Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{

                }      
	  });

}


    var OtherSalesWindow = new Ext.Window({
	height      : 590,
        width       : 1300,
	//x	    : 250,
       // y           : 35,
        title       : 'Stores Returnable Pending List',
        items       : RepSalesPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
             
             Refreshdata();
             
               }    
			
	}
    });
    OtherSalesWindow.show();  
});
