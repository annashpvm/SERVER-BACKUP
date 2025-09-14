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

function grid_tot(){


        var arrivedqty  = 0;
        var acceptedqty = 0;

        txtTotArrivedQty.setValue('');
        txtTotAcceptedQty.setValue('');

        var Row= flxDateList.getStore().getCount();

        flxDateList.getSelectionModel().selectAll();

        var sel=flxDateList.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
              if (Number(sel[i].data.ticketwt) > 0)
              {
		      arrivedqty =arrivedqty+Number(sel[i].data.ticketwt);
		      acceptedqty=acceptedqty+Number(sel[i].data.acceptedwt);
              }

         }
         txtTotArrivedQty.setRawValue(arrivedqty);
         txtTotAcceptedQty.setRawValue(acceptedqty);
}

function grid_tot_Date(){

        var arrivedqty  = 0;
        var acceptedqty = 0;

        txtDayArrivedQty.setValue('');
        txtDayAcceptedQty.setValue('');

        var Row= flxDebitNote.getStore().getCount();
        flxDebitNote.getSelectionModel().selectAll();
        var sel=flxDebitNote.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
              if (Number(sel[i].data.qc_fuel_ticketwt) > 0)
              {
		      arrivedqty =arrivedqty+Number(sel[i].data.qc_fuel_ticketwt);
		      acceptedqty=acceptedqty+Number(sel[i].data.qc_fuel_acceptqty);
              }
         }
         txtDayArrivedQty.setRawValue(arrivedqty);
         txtDayAcceptedQty.setRawValue(acceptedqty);

}

   var txtTotArrivedQty = new Ext.form.NumberField({
        fieldLabel  : 'Arrived Qty',
        id          : 'txtTotArrivedQty',
        name        : 'txtTotArrivedQty',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtTotAcceptedQty = new Ext.form.NumberField({
        fieldLabel  : 'Accepted Qty',
        id          : 'txtTotAcceptedQty',
        name        : 'txtTotAcceptedQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


   var txtDayArrivedQty = new Ext.form.NumberField({
        fieldLabel  : 'Day Arrived Qty',
        id          : 'txtDayArrivedQty',
        name        : 'txtDayArrivedQty',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtDayAcceptedQty = new Ext.form.NumberField({
        fieldLabel  : 'Day Accepted Qty',
        id          : 'txtDayAcceptedQty',
        name        : 'txtDayAcceptedQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

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
        value: new Date()   
    });

    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date()   
    });


 var loadDebitNoteListDateDataStore = new Ext.data.Store({
      id: 'loadDebitNoteListDateDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDailyDNList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_ref','qc_fuel_debitnote_date','qc_fuel_debitnote_no','qc_fuel_debitamount','qc_fuel_entryno','qc_fuel_entrydate','qc_fuel_ticketno','qc_fuel_truck'
 ]),
    });

function process_data()
{

	loadDebitNoteListDateDataStore.removeAll();
	loadDebitNoteListDateDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDailyDNList',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
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
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
               process_data();     
       	 }
        }   
});





var btnVoucherPrint = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "VOCHER PRINTING",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
				var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var vouno = "&vouno=" + encodeURIComponent('0');

                                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
                                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	


				var param =(compcode+fincode+vouno+fromdate+todate);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNote.rptdesign&__format=pdf&' + param, '_blank'); 


       	 }
        }   
});


var btnSupplierDN = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier Wise",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var fincode = "&fincode=" + encodeURIComponent(GinFinid);
		var vouno = "&vouno=" + encodeURIComponent('0');

		var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
		var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	
                var param =(compcode+fincode+vouno+fromdate+todate);
       		if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteSupplierwise.rptdesign&__format=pdf&' + param, '_blank'); 
                else if (printtype == "XLS")       
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteSupplierwise.rptdesign&__format=XLS&' + param, '_blank'); 
                 else
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteSupplierwise.rptdesign' + param, '_blank'); 

       	 }
        }   
});




var btnDatewiseDN = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Date Wise",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var fincode = "&fincode=" + encodeURIComponent(GinFinid);
		var vouno = "&vouno=" + encodeURIComponent('0');

		var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
		var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	
                var param =(compcode+fincode+vouno+fromdate+todate);
       		if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteDatewise.rptdesign&__format=pdf&' + param, '_blank'); 
                else if (printtype == "XLS")       
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteDatewise.rptdesign&__format=XLS&' + param, '_blank'); 
                 else
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNoteDatewise.rptdesign' + param, '_blank'); 

       	 }
        }   
});




     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUEST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){

                  find_dates(cmbMonth.getValue());         
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






var flxDebitNote = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:50,
    height: 370,
    width: 1200,
    id: 'my-grid',  

    columns:
    [ 	 
	
        {header: "Supplier",  dataIndex: 'cust_ref',sortable:false,width:250,align:'left' },
        {header: "Date",  dataIndex: 'qc_fuel_debitnote_date',sortable:false,width:100,align:'left'  },
        {header: "DN No."  , dataIndex: 'qc_fuel_debitnote_no',sortable:false,width:130,align:'center'},
        {header: "DN Amount"   , dataIndex: 'qc_fuel_debitamount',sortable:false,width:110,align:'right',},
        {header: "QC No."  , dataIndex: 'qc_fuel_entryno',sortable:false,width:70,align:'center'},
        {header: "QC Date",  dataIndex: 'qc_fuel_entrydate',sortable:false,width:100,align:'left' },
        {header: "Ticket"  , dataIndex: 'qc_fuel_ticketno',sortable:false,width:60,align:'center'},
        {header: "Truck"   , dataIndex: 'qc_fuel_truck',sortable:false,width:110,align:'left',},
     
  
    ],

    store:loadDebitNoteListDateDataStore,
    listeners:{	

            'cellclick': function (flxDebitNote, rowIndex, cellIndex, e) {
		var sm = flxDebitNote.getSelectionModel();
		var selrow = sm.getSelected();


				var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var vouno   = "&vouno=" + encodeURIComponent(selrow.get('qc_fuel_debitnote_no'));
                                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
                                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	


				var param =(compcode+fincode+vouno+fromdate+todate);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNote.rptdesign&__format=pdf&' + param, '_blank'); 




     
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
    monthstartdate.setValue(yr+"-"+rmon+"-01");


    var curday  = Ext.util.Format.date(new Date(),"d");
    var curmon  = Ext.util.Format.date(new Date(),"m");


    if (Number(curmon) == Number(mmon))
       mdays = curday;



    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

    process_data();
    
}

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
        title: 'DATE WISE DEBIT NOTE',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
{ 
			xtype   : 'fieldset',
//			title   : '',
//			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 920,
			y       : 5,
			items:[optprinttype],
		},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                             width   : 300,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 10,
                             width   : 300,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             width   : 300,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 12,
                             items: [btnProcess]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 60,
                             items: [btnVoucherPrint]
                        },




			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 100,
                             items: [btnDatewiseDN]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 140,
                             items: [btnSupplierDN]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
                             width   : 1000,
			     y       : 80,
                             items: [flxDebitNote]
                        },

         


        ],
    },
    {    
        xtype: 'panel',
        title: '',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
        ],
    }  ,

    ]  
});

    function Refreshdata()
    {
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        m1 = parseInt(m1);
        cmbMonth.setValue(m1);
        find_dates(m1);

    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'FUEL DEBIT NOTE Details',
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
