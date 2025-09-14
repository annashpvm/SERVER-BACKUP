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

var btnVoucherPrint = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "VOCHER PRINTING",
	width   : 120,
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
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInspectionVouPrint.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInspectionVouPrint.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInspectionVouPrint.rptdesign' + param, '_blank');
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
	width   : 120,
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
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsDatewise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsDatewise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsDatewise.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnPartywise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Party wise",
	width   : 120,
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
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsPartywise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsPartywise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInsPartywise.rptdesign' + param, '_blank');
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
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
           var p5 = "&rmtype=" + encodeURIComponent(1);

	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMLocalArrivals.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMLocalArrivals.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMLocalArrivals.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnPartyMonthAbs = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier - Daywise",
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
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsPartyDatewise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsPartyDatewise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsPartyDatewise.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnPartyDateLocal = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier-For-Day - Local",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
           var p5 = "&rmtype=" + encodeURIComponent(1);

	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateLocal.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateLocal.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateLocal.rptdesign' + param, '_blank');
       	 }
        }   
});



var btnPartyDateImport = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier-For-Day - Import",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
           var p5 = "&rmtype=" + encodeURIComponent(2);

	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateImport.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateImport.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsForDateImport.rptdesign' + param, '_blank');
       	 }
        }   
});





var btnMonthAbsLocal = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Month Abstract - Local",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
           var p5 = "&rmtype=" + encodeURIComponent(1);

	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsLocal.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsLocal.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsLocal.rptdesign' + param, '_blank');
       	 }
        }   
});


var btnMonthAbsImport = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Month Abstract - IMport",
	width   : 120,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	   var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
           var p2 = "&fincode="   +encodeURIComponent(GinFinid);
           var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
           var p5 = "&rmtype=" + encodeURIComponent(2);

	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsImport.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsImport.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMArrivalsMonthArrivalsImport.rptdesign' + param, '_blank');
       	 }
        }   
});



var btnPartyItemAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Supplier-Party-Abstract",
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
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCPartyItemwiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCPartyItemwiseAbstract.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCPartyItemwiseAbstract.rptdesign' + param, '_blank');
       	 }
        }   
});



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
              if (Number(sel[i].data.qc_rm_ticketwt) > 0)
              {
		      arrivedqty =arrivedqty+Number(sel[i].data.qc_rm_ticketwt);
		      acceptedqty=acceptedqty+Number(sel[i].data.qc_rm_acceptqty)+Number(sel[i].data.qc_rm_degradeqty);
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



 var loadDatewiseArrivalsDataStore = new Ext.data.Store({
      id: 'loadDatewiseArrivalsDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewiseArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['ticketdate','qc_rm_ticketdate', 'ticketwt', 'acceptedwt' ]),
    });

 var loadArrivalsfortheDateDataStore = new Ext.data.Store({
      id: 'loadArrivalsfortheDateDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRMArrivalsDate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_ref', 'cust_gstin','qc_rm_truck','qc_rm_entryno', 'qc_rm_ticketno', 'qc_rm_ticketwt', 'qc_rm_moisper_totalmaterial', 'qc_rm_moisforqty', 'qc_rm_moisper', 'qc_rm_moisqty', 'qc_rm_llessper', 'qc_rm_llessqty', 'qc_rm_rejectper', 'qc_rm_rejectqty', 'qc_rm_degradeqty', 'qc_rm_acceptqty', 'qc_rm_remarks', 'area_name' ]),
    });



function process_data()
{
	loadDatewiseArrivalsDataStore.removeAll();
	loadDatewiseArrivalsDataStore.load({
	 url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadDatewiseArrivals',
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
    hidden:false,
    width: 350,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DATE"    ,  dataIndex: 'ticketdate',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "DATE"    ,  dataIndex: 'qc_rm_ticketdate',sortable:false,width:100,align:'left', menuDisabled: true,hidden : true },
        {header: "Arrival QTY"  , dataIndex: 'ticketwt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Accepted QTY" , dataIndex: 'acceptedwt',sortable:false,width:120,align:'right', menuDisabled: true},

    ],

    store:loadDatewiseArrivalsDataStore,
    listeners:{	

            'cellclick': function (flxDateList, rowIndex, cellIndex, e) {
		var sm = flxDateList.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));
            repdate = selrow.get('qc_rm_ticketdate')

            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('qc_rm_ticketdate'),"d-m-Y"));
    //        lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



	    loadArrivalsfortheDateDataStore.removeAll();
	    loadArrivalsfortheDateDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadRMArrivalsDate',
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
    x:30,
    y:50,
    height: 400,
    hidden:false,
    width: 700,
    id: 'my-grid',  

    columns:
    [ 	 
	
        {header: "Supplier",  dataIndex: 'cust_ref',sortable:false,width:210,align:'left' },
        {header: "GST IN",  dataIndex: 'cust_gstin',sortable:false,width:90,align:'left' ,hidden : true },
        {header: "entryno",  dataIndex: 'qc_rm_entryno',sortable:true,width:90,align:'left' ,hidden : true },
        {header: "QC No."  , dataIndex: 'qc_rm_entryno',sortable:true,width:90,align:'center'},
        {header: "Ticket"  , dataIndex: 'qc_rm_ticketno',sortable:true,width:90,align:'center'},
        {header: "Truck"   , dataIndex: 'qc_rm_truck',sortable:false,width:110,align:'center',},
        {header: "Ticket Wt" , dataIndex: 'qc_rm_ticketwt',sortable:false,width:80,align:'right'},
        {header: "% of Moisture " , dataIndex: 'qc_rm_moisper_totalmaterial',sortable:false,width:80,align:'right'},

        {header: "Moisture Qty" , dataIndex: 'qc_rm_moisforqty',sortable:false,width:80,align:'right' },

        {header: "Mois %" , dataIndex: 'qc_rm_moisper',sortable:false,width:80,align:'right'},
        {header: "Mois Qty" , dataIndex: 'qc_rm_moisqty',sortable:false,width:80,align:'right'},
        {header: "L.less %" , dataIndex: 'qc_rm_moisper',sortable:false,width:80,align:'right'},
        {header: "L.less Qty" , dataIndex: 'qc_rm_llessqty',sortable:false,width:80,align:'right'},
        {header: "Reje %" , dataIndex: 'qc_rm_rejectper',sortable:false,width:80,align:'right'},
        {header: "Rejc Qty" , dataIndex: 'qc_rm_rejectqty',sortable:false,width:80,align:'right'},
        {header: "Degrade Qty" , dataIndex: 'qc_rm_degradeqty',sortable:false,width:80,align:'right'},
        {header: "Accepted Qty" , dataIndex: 'qc_rm_acceptqty',sortable:false,width:80,align:'right'},
        {header: "Remarks " , dataIndex: 'qc_rm_remarks',sortable:false,width:200,align:'right'}, 
        {header: "Area Name" , dataIndex: 'area_name',sortable:false,width:130,align:'right'},       
  
    ],

    store:loadArrivalsfortheDateDataStore,
    listeners:{	

            'cellclick': function (flxArrivalsList, rowIndex, cellIndex, e) {
		var sm = flxArrivalsList.getSelectionModel();
		var selrow = sm.getSelected();
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var fincode = "&fincode=" + encodeURIComponent(GinFinid);
		var entryno = "&entryno=" + encodeURIComponent(selrow.get('qc_rm_entryno'));
                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

		var param =(compcode+fincode+entryno+fromdate+todate);
		window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInspection.rptdesign&__format=pdf&' + param, '_blank'); 


     
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
                             width   : 280,
		             x       : 10,
			     y       : 10,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 10,
                             width   : 220,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             width   : 220,
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
		             x       : 1150,
			     y       : -10,
                             items: [btnDatewise]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 20,
                             items: [btnPartywise]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 50,
                             items: [btnVoucherPrint]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 100,
                             items: [btnItemMonthAbs]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 140,
                             items: [btnPartyMonthAbs]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 180,
                             items: [btnPartyDateLocal]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 220,
                             items: [btnPartyDateImport]
                        },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 260,
                             items: [btnPartyItemAbstract]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 300,
                             items: [btnMonthAbsLocal]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1150,
			     y       : 340,
                             items: [btnMonthAbsImport]
                        },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 80,
                       border      : false,
                             width       : 400,
                             items: [flxDateList]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 380,
			     y       : 80,
                             border      : false,
                             width       : 800,

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
        title       : 'WASTE PAPER QC Inspection Details',
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
});Supplier-For-D
