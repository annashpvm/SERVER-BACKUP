
Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode  = localStorage.getItem('gincompcode');
   var GinFinid     = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate   = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  


var printtype = "PDF"
var loadPendingListLedgerDatastore = new Ext.data.GroupingStore({
      id: 'loadPendingListLedgerDatastore',
       proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReturnablePendingListDatewise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'dc_date','dch_no','department_name','cust_name','item_name','uom_short_name','dct_issqty',
'dct_recqty','pendqty','dct_rate','dch_return_days','duedate2','oddays','dch_date','dct_spec','dct_purpose'

      ]
      ),
      sortInfo: {field: 'dch_date', direction: 'ASC'},

});


    var AsonDate = new Ext.form.DateField({
        fieldLabel : ' Pending List As on ',
        id: 'AsonDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",   
        width       : 120,   
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              process_data();
           },
           keyup:function(){
              process_data();
            },
           change:function(){
              process_data();
            },
        } 
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
                 process_data();
	       	 }
        }   
});


    var btnView_Pending = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Report Print ",
	width   : 120,
	height  : 35,
        id:'btnView_Pending',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                  var p3 ="&asondate=" + encodeURIComponent(Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"));	
	            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"));
	            var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"));
		    var p6 ="&opt="+encodeURIComponent(1);    	
 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign&__format=xls&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign' + param, '_blank');	



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
 




var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
         hidden:false,
        stripeRows : true,
        scrollable: true,
        x: 10,
        y: 80,
        height: 450,
        width: 1255,
         id: 'my-grid',     
        columns: [   

            {header: "Date", dataIndex: 'dc_date',sortable:true,width:110,align:'center'},
            {header: "DCNo", dataIndex: 'dch_no',sortable:true,width:80,align:'center'},
            {header: "Department", dataIndex: 'department_name',sortable:true,width:130,align:'left'},
            {header: "Party", dataIndex: 'cust_name',sortable:true,width:250,align:'left'},
            {header: "Item Name", dataIndex: 'item_name',sortable:true,width:200,align:'left'},
            {header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:80,align:'center'},
	    {header: "Iss Qty", dataIndex: 'dct_issqty',sortable:true,width:90,align:'right'},
	    {header: "Recd Qty", dataIndex: 'dct_recqty',sortable:true,width:90,align:'right'},
	    {header: "Pend Qty", dataIndex: 'pendqty',sortable:true,width:90,align:'right'},
	    {header: "Rate", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
//	    {header: "Value", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
	    {header: "ADays", dataIndex: 'dch_return_days',sortable:true,width:80,align:'right'},
	    {header: "Due Date", dataIndex: 'duedate2',sortable:true,width:90,align:'right'},
	    {header: "OD DAYS", dataIndex: 'oddays',sortable:true,width:75,align:'right'},
	    {header: "Specifications ", dataIndex: 'dct_spec',sortable:true,width:200,align:'right'},
	    {header: "Purpose", dataIndex: 'dct_purpose',sortable:true,width:200,align:'right'},


        ],
        store: loadPendingListLedgerDatastore,


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
       'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                dcno = selrow.get('dch_no');

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&dctype=" + encodeURIComponent('R');
                var p4 = "&dcno=" + encodeURIComponent(dcno); 
		var param = (p1+p2+p3+p4) ;                        
                if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=xls&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign' + param, '_blank');     


        
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
		             title   : '',
		             labelWidth  : 1,
		             width       : 150,
		             border  : false,
			     x       : 1020,
			     y       : 10,
		             items: [btnView_Pending]
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


function process_data()
{
   	loadPendingListLedgerDatastore.removeAll();
	loadPendingListLedgerDatastore.load({
	 url: '/SHVPM/Stores/ClsViewRep.php',
                params: {
	    	task: 'loadReturnablePendingListDatewise',
                compcode:Gincompcode,
                finid:GinFinid,
                asondate: Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"),
                fromdate: Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"),
                todate: Ext.util.Format.date(AsonDate.getValue(),"Y-m-d"),
                repopt : 2,
		},
		scope:this,
		callback:function()
       		{
     var cnt=loadPendingListLedgerDatastore.getCount();
//alert(GRNdetailsLoadDataStore.getAt(0).get('cust_name'));
                }      
	  });
}

function Refreshdata()
{
process_data();
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

