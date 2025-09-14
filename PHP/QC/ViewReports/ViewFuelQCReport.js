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

        var Row= flxArrivalsList.getStore().getCount();
        flxArrivalsList.getSelectionModel().selectAll();
        var sel=flxArrivalsList.getSelectionModel().getSelections();
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



 var loadDatewiseFuelArrivalsDataStore = new Ext.data.Store({
      id: 'loadDatewiseFuelArrivalsDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewiseFuelArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['ticketdate','qc_fuel_ticketdate', 'ticketwt', 'acceptedwt' ]),
    });

 var loadArrivalsfortheDateDataStore = new Ext.data.Store({
      id: 'loadArrivalsfortheDateDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelArrivalsDate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_ref', 'cust_gstin','qc_fuel_truck','qc_fuel_entryno', 'qc_fuel_ticketno', 'qc_fuel_ticketwt',   'qc_fuel_tot_ded_qty', 'qc_fuel_acceptqty', 'qc_fuel_remarks', 'area_name' ]),
    });

function process_data()
{

	loadDatewiseFuelArrivalsDataStore.removeAll();
	loadDatewiseFuelArrivalsDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseFuelArrivals',
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




var btnPartyItemAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier-Item-Abstract",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartyItemwiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartyItemwiseAbstract.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartyItemwiseAbstract.rptdesign' + param, '_blank');
       	 }
        }   
});

 btnItemPartyAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item -Supplier Abstract",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemPartywiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemPartywiseAbstract.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemPartywiseAbstract.rptdesign' + param, '_blank');
       	 }
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


var btnDatewise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Date wise-Inspection",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionDatewise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionDatewise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionDatewise.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnItemPartywiseAbs = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item-Partywise-Abstract",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemwise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemwise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCItemwise.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnItemwise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item wise Inspection",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnItemwise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item wise Inspection",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionItemwise.rptdesign' + param, '_blank');
       	 }
        }   
});

var btnPartywise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Party wise Inspection ",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionPartywise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionPartywise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionPartywise.rptdesign' + param, '_blank');
       	 }
        }   
});

var btnPartyItemwiseAbs = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item-Partywise-Abs",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartywise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartywise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCPartywise.rptdesign' + param, '_blank');
       	 }
        }   
});



var btnItemMonthAbs = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item - Daywise",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&finid="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFueltemwiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFueltemwiseAbstract.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFueltemwiseAbstract.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnPartyItemDayReport = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Party-Item-Day Report",
	width   : 150,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&finid="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
        
	    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelPartywiseDayArrivals.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelPartywiseDayArrivals.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelPartywiseDayArrivals.rptdesign' + param, '_blank');
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
	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&fincode="+encodeURIComponent(GinFinid);
	    var p3  = "&entryno=" + encodeURIComponent(0);
            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionVouPrint.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepfuelQCInspectionVouPrint.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionVouPrint.rptdesign' + param, '_blank');
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
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
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
      },['cust_code','cust_name', 'grnqty', 'purvalue']),
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


var flxDateList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:50,
    height: 400,
    width: 320,

    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DATE"    ,  dataIndex: 'ticketdate',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "DATE"    ,  dataIndex: 'qc_fuel_ticketdate',sortable:false,width:100,align:'left', menuDisabled: true,hidden : true },
        {header: "Arrival QTY"  , dataIndex: 'ticketwt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Accepted QTY" , dataIndex: 'acceptedwt',sortable:false,width:100,align:'right', menuDisabled: true},

    ],

    store:loadDatewiseFuelArrivalsDataStore,
    listeners:{	

            'cellclick': function (flxDateList, rowIndex, cellIndex, e) {
		var sm = flxDateList.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));
            repdate = selrow.get('qc_fuel_ticketdate')

            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('qc_fuel_ticketdate'),"d-m-Y"));
    //        lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



	    loadArrivalsfortheDateDataStore.removeAll();
	    loadArrivalsfortheDateDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadFuelArrivalsDate',
		compcode:Gincompcode,
		finid:GinFinid,
                repdate: Ext.util.Format.date(repdate,"Y-m-d"),  
		},
		scope:this,
		callback:function()
		{
                   grid_tot_Date();
		}
	    });

     
    }
 }
});



var flxArrivalsList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:50,
    height: 370,
    width: 750,
    id: 'my-grid',  

    columns:
    [ 	 
	
        {header: "Supplier",  dataIndex: 'cust_ref',sortable:false,width:200,align:'left' },
        {header: "GST IN",  dataIndex: 'cust_gstin',sortable:false,width:80,align:'left' ,hidden : true },
        {header: "entryno",  dataIndex: 'qc_fuel_entryno',sortable:false,width:70,align:'left'  },
        {header: "Ticket"  , dataIndex: 'qc_fuel_ticketno',sortable:false,width:70,align:'center'},
        {header: "Truck"   , dataIndex: 'qc_fuel_truck',sortable:false,width:100,align:'center',},
        {header: "Ticket Wt" , dataIndex: 'qc_fuel_ticketwt',sortable:false,width:80,align:'right'},
        {header: "Ded Qty" , dataIndex: 'qc_fuel_tot_ded_qty',sortable:false,width:100,align:'right'},
        {header: "Acc. Qty" , dataIndex: 'qc_fuel_acceptqty',sortable:false,width:100,align:'right'},
      
  
    ],

    store:loadArrivalsfortheDateDataStore,
    listeners:{	

            'cellclick': function (flxArrivalsList, rowIndex, cellIndex, e) {
		var sm = flxArrivalsList.getSelectionModel();
		var selrow = sm.getSelected();
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var fincode = "&fincode=" + encodeURIComponent(GinFinid);
		var entryno = "&entryno=" + encodeURIComponent(selrow.get('qc_fuel_entryno'));
                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	


		var param =(compcode+fincode+entryno+fromdate+todate);
		window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspection.rptdesign&__format=pdf&' + param, '_blank'); 


     
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
        title: 'DATE WISE ARRIVALS',
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
			x       : 820,
			y       : 5,
			items:[optprinttype],
		},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                       width       : 300,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 10,
                       width       : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                       width       : 250,
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
			     y       : 10,
                             items: [btnVoucherPrint]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 40,
                             items: [btnDatewise]

                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 70,
                             items: [btnItemwise]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 100,
                             items: [btnPartywise]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 130,
                             items: [btnItemPartywiseAbs]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 160,
                             items: [btnPartyItemwiseAbs]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 200,
                             items: [btnItemMonthAbs]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 240,
                             items: [btnPartyItemDayReport]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 280,
                             items: [btnPartyItemAbstract]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1160,
			     y       : 320,
                             items: [btnItemPartyAbstract]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
                             labelWidth  : 1,
                             width       : 350,
		             x       : 10,
			     y       : 80,
                             items: [flxDateList]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 390,
                            width       : 750,
			     y       : 80,
                             items: [flxArrivalsList]
                        },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 90,
                       width       : 400,
                       x           : 10,
                       y           : 500,
                       border      : false,
                       items: [txtTotArrivedQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 190,
                       y           : 500,
                       border      : false,
                       items: [txtTotAcceptedQty]
                      },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 700,
                       y           : 500,
                       border      : false,
                       items: [txtDayArrivedQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 130,
                       width       : 400,
                       x           : 950,
                       y           : 500,
                       border      : false,
                       items: [txtDayAcceptedQty]
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
        title       : 'FUEL QC Inspection Details',
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
