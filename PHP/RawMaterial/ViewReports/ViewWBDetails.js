Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var itemname = '0';


function grid_tot(){


        var acceptedqty = 0;


        var Row= flxArrivalsList.getStore().getCount();
        flxArrivalsList.getSelectionModel().selectAll();
        var sel=flxArrivalsList.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
              if (Number(sel[i].data.wc_acceptedwt) > 0)
              {
		      acceptedqty=acceptedqty+Number(sel[i].data.wc_acceptedwt);
              }
         }
         txtTotTickets.setRawValue(Row);
         txtTotAcceptedQty.setRawValue(acceptedqty);

}

   var txtTotTickets = new Ext.form.NumberField({
        fieldLabel  : 'Total Tickets',
        id          : 'txtTotTickets',
        name        : 'txtTotTickets',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtTotAcceptedQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Accepted Weight',
        id          : 'txtTotAcceptedQty',
        name        : 'txtTotAcceptedQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });
;

var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           change:function(){
               process_data();
           },
           blur:function(){
               process_data();
           },
           keyup:function(){
               process_data();
            },
        }     
    });

    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
               process_data();
           },
           keyup:function(){
               process_data();
            },
        }    
    });



 var loadDatewiseWeightSlipDataStore = new Ext.data.Store({
      id: 'loadDatewiseWeightSlipDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewiseWBDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
't_wb_2nd_time','ticketdate','t_wb_ticketno','t_wb_vehicle','t_wb_item', 't_wb_1st_time1', 't_wb_2nd_time1',  'emptywt', 'loadwt','t_wb_net_weight','t_wb_party'
]),
    });



function process_data()
{

	loadDatewiseWeightSlipDataStore.removeAll();
	loadDatewiseWeightSlipDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseWBDetails',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d 00:00:00"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d 23:59:59"), 

		},

		callback:function()
		{
                  grid_tot();
		}
	    });


}

var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 45,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
               process_data();     
       	 }
        }   
});


var btnDatewise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Date wise",
	width   : 100,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


             fdate = monthstartdate.getValue();
             tdate = monthstartdate.getValue();

	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(fdate,"Y-m-d")+ " 00:00:00.0");	   
            var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(tdate,"Y-m-d") + " 23:59:59.0");
	    var param = (p1+p2+p3) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLSX") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge.rptdesign&__format=XLSX&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge.rptdesign' + param, '_blank');
       	 }
        }   
});

var btnWP = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "WASET PAPER",
	width   : 100,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


             fdate = monthstartdate.getValue();
             tdate = monthstartdate.getValue();

	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(fdate,"Y-m-d")+ " 00:00:00.0");	   
            var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(tdate,"Y-m-d") + " 23:59:59.0");
	    var p4 = "&grpcode="+encodeURIComponent('1');   

	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLSX") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign&__format=XLSX&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign' + param, '_blank');
       	 }
        }   
});

var btnFuel = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Fuel",
	width   : 100,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


             fdate = monthstartdate.getValue();
             tdate = monthstartdate.getValue();

	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(fdate,"Y-m-d")+ " 00:00:00.0");	   
            var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(tdate,"Y-m-d") + " 23:59:59.0");
	    var p4 = "&grpcode="+encodeURIComponent('9');   

	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLSX") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign&__format=XLSX&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_fuel_arrivals.rptdesign' + param, '_blank');
       	 }
        }   
});

 var printtype = "PDF";

 var loadArrivalsDatastore = new Ext.data.Store({
      id: 'loadArrivalsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'grnqty',  'purvalue'


      ]),
    });


 var loadPartyPurchaseDataStore = new Ext.data.Store({
      id: 'loadPartyPurchaseDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartywisePurchases"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['sup_code','sup_name', 'grnqty', 'purvalue']),
    });


 var loadGRNDataStore = new Ext.data.Store({
      id: 'loadGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyMonthArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_sup_code','rect_item_code'
]),
    });


 var loadItemDataStore = new Ext.data.Store({
      id: 'loadItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyItemArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['itmh_name','rect_item_code','rect_grnqty','rect_itemvalue'
]),
    });


var itemtype = "A";


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






var flxArrivalsList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:50,
    height: 400,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 

        {header: "Date "     ,dataIndex: 't_wb_2nd_time',sortable:false,width:95,align:'left',hidden : true },
        {header: "Date "     ,dataIndex: 'ticketdate',sortable:false,width:95,align:'left' },	
        {header: "Ticket No" ,dataIndex: 't_wb_ticketno',sortable:false,width:90,align:'center'},
        {header: "Truck"      ,  dataIndex: 't_wb_vehicle',sortable:false,width:120,align:'left',},
        {header: "Material Name" , dataIndex: 't_wb_item',sortable:false,width:150,align:'left'},    

        {header: "In Time ",     dataIndex: 't_wb_1st_time1',sortable:false,width:170,align:'left' },  
        {header: "Out Time ",     dataIndex: 't_wb_2nd_time1',sortable:false,width:170,align:'left' },  
        {header: "Empty Wt" , dataIndex: 'emptywt',sortable:false,width:80,align:'right'},
        {header: "Load Wt" ,  dataIndex: 'loadwt',sortable:false,width:80,align:'right' },
        {header: "Net Wt" ,   dataIndex: 't_wb_net_weight',sortable:false,width:80,align:'right'},
        {header: "Party Name" , dataIndex: 't_wb_party',sortable:false,width:250,align:'left'},       
    ],

    store:loadDatewiseWeightSlipDataStore,
    listeners:{	

            'cellclick': function (flxArrivalsList, rowIndex, cellIndex, e) {
		var sm = flxArrivalsList.getSelectionModel();
		var selrow = sm.getSelected();
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
               var p2 = "&ticketdate=" + encodeURIComponent(Ext.util.Format.date(selrow.get('t_wb_2nd_time'),"Y-m-d"));	
		var p3 = "&ticketno=" + encodeURIComponent(selrow.get('t_wb_ticketno'));
		var param =(p1+p2+p3);
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_Ticket.rptdesign&__format=pdf&' + param, '_blank'); 
  
     }

 }
});

var dgrecord = Ext.data.Record.create([]);


   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
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
        title: 'DATE WISE ARRIVALS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


                { 
			xtype   : 'fieldset',
//			title   : '',
//			layout  : 'hbox',
                         labelWidth  : 0,
			border  : true,
			height  : 100,
			width   : 200,
	//		layout  : 'absolute',
			x       : 820,
			y       : -10,
			items:[optprinttype],
		},


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             width       : 220,
                             border  : false,
		             x       : 100,
			     y       : 10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 220,
                             border  : false,
		             x       : 300,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 110,
                             border  : false,
		             x       : 580,
			     y       : 12,
                             items: [btnProcess]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1050,
			     y       : -10,
                             items: [btnDatewise]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1200,
			     y       : -10,
                             items: [btnWP]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1200,
			     y       : 30,
                             items: [btnFuel]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 80,
                             items: [flxArrivalsList]
                        },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 150,
                       width       : 400,
                       x           : 100,
                       y           : 500,
                       border      : false,
                       items: [txtTotTickets]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 190,
                       width       : 400,
                       x           : 400,
                       y           : 500,
                       border      : false,
    //                   items: [txtTotAcceptedQty]
                      },



        ],
    },

    ]  
});

    function Refreshdata()
    {
       process_data();

    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Weighment Details',
        items       : tabOverall,
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
    ReppreprintWindow.show();  
});
