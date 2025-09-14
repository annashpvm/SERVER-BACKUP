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
           keyup:function(){fva
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

	var loadItemListDataStore = new Ext.data.Store({
      id: 'loadItemListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'item_grpname','item_grpcode'
      ]),
    });

 var loadDatewiseWeightSlipDataStore = new Ext.data.Store({
      id: 'loadDatewiseWeightSlipDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewiseTruck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['wc_ticketno', 'wc_date', 'wc_time', 'wc_area_code', 'wc_sup_code', 'wc_item', 'wc_vehicleno', 'wc_emptywt', 'wc_loadwt', 'wc_netwt', 'wc_supplier', 'wc_partyloadwt', 'wc_partyemptywt', 'wc_partynetwt', 'wc_acceptedwt','wc_process', 'wt_type','area_name','ticketdate','item_grpname']),
    });



function process_data()
{

	loadDatewiseWeightSlipDataStore.removeAll();
	loadDatewiseWeightSlipDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseTruck',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                iname : itemname, 
		},

		callback:function()
		{
                  grid_tot();
		}
	    });
     
	loadItemListDataStore.removeAll();
	loadItemListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadItemList',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

		callback:function()
		{

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
	width   : 200,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){ 


	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&fincode="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var p5 = "&iname="+encodeURIComponent(itemname);
	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Datewise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Datewise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Datewise.rptdesign' + param, '_blank');
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
	width   : 200,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&fincode="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var p5 = "&iname="+encodeURIComponent(itemname);
	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Partywise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Partywise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Partywise.rptdesign' + param, '_blank');
       	 }
        }   
});



var btnItemGrpwise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item GROUP wise",
	width   : 200,
	height  : 20,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
	    var p1 = "&compcode="+encodeURIComponent(Gincompcode);   
   	    var p2 = "&fincode="+encodeURIComponent(GinFinid);
            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	    var p5 = "&iname="+encodeURIComponent(itemname);
	    var param = (p1+p2+p3+p4+p5) ;
if (printtype == "PDF") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Itemwise.rptdesign&__format=pdf&' + param, '_blank');
            else if (printtype == "XLS") 
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Itemwise.rptdesign&__format=XLS&' + param, '_blank');
            else
	    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRM_Ticket_Itemwise.rptdesign' + param, '_blank');
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


var cmbGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 300,
        displayField    : 'item_grpname', 
        valueField      : 'item_grpcode',
        hiddenName      : '',
        id              : 'cmbGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemListDataStore,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           
           select: function(){
                itemname = cmbGroup.getRawValue();
                
                btnProcess.focus();
                process_data();

           },
           keyup : function() {
              if (cmbGroup.getRawValue() == "")
                  itemname ="0";
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

var optItemType = new Ext.form.FieldSet({
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
        columns: 2,
        rows : 1,
        id: 'optItemType',
        items: [
		{boxLabel: 'All Items', name: 'optItemType', id:'optall', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    itemtype = "A";

					}
				}
			}
		},
		{boxLabel: 'Selective Item', name: 'optItemType', id:'optselective', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						itemtype = "S";


					}
				}
			}
		},
            

            
        ],
    }



    ]
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


	
        {header: "Ticket No" ,dataIndex: 'wc_ticketno',sortable:false,width:70,align:'center'},
        {header: "Date ",     dataIndex: 'ticketdate',sortable:false,width:95,align:'left' },
        {header: "Time ",     dataIndex: 'wc_time',sortable:false,width:105,align:'left' },  
        {header: "Supplier",  dataIndex: 'wc_supplier',sortable:false,width:190,align:'left' },
        {header: "Truck"   ,  dataIndex: 'wc_vehicleno',sortable:false,width:120,align:'left',},
        {header: "Item" ,     dataIndex: 'wc_item',sortable:false,width:150,align:'left'},
        {header: "Load Wt" ,  dataIndex: 'wc_loadwt',sortable:false,width:75,align:'right' },
        {header: "Empty Wt" , dataIndex: 'wc_emptywt',sortable:false,width:75,align:'right'},
        {header: "Net Wt" ,   dataIndex: 'wc_netwt',sortable:false,width:75,align:'right'},

        {header: "P.Load Wt" ,  dataIndex: 'wc_partyloadwt',sortable:false,width:75,align:'right' },
        {header: "P.Empty Wt" , dataIndex: 'wc_partyemptywt',sortable:false,width:75,align:'right'},
        {header: "P.Net Wt" ,   dataIndex: 'wc_partynetwt',sortable:false,width:75,align:'right'},

        {header: "Accepted Wt" , dataIndex: 'wc_acceptedwt',sortable:false,width:80,align:'right'},
        {header: "Area Name" , dataIndex: 'area_name',sortable:false,width:130,align:'left'},       
        {header: "Item Group" , dataIndex: 'item_grpname',sortable:false,width:130,align:'left'},    
    ],

    store:loadDatewiseWeightSlipDataStore,
    listeners:{	
/*
            'cellclick': function (flxArrivalsList, rowIndex, cellIndex, e) {
		var sm = flxArrivalsList.getSelectionModel();
		var selrow = sm.getSelected();
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var fincode = "&fincode=" + encodeURIComponent(GinFinid);
		var entryno = "&entryno=" + encodeURIComponent(selrow.get('qc_rm_entryno'));
		var param =(compcode+fincode+entryno);
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQCInspection.rptdesign&__format=pdf&' + param, '_blank'); 
  
     }
*/
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



        var dt2_today = new Date();     

        var day1 = 0;
        var mon1 = 0;
       
        mon1 = Ext.util.Format.date(dt2_today,"m"); 
        day1 = Ext.util.Format.date(dt2_today,"j"); 

//alert(mon1);
//alert(mmon);
        if (Number(mmon)== Number(mon1))
           mdays = day1;    

    mdays = ("0"+mdays).slice(-2);
    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
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
			border  : false,
			height  : 50,
			width   : 260,
			layout  : 'absolute',
			x       : 20,
			y       : 30,
			items:[optItemType],
		},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
                             width   : 440,
		             x       : 280,
			     y       : 45,
                             items: [cmbGroup]
                        },


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
                             border  : false,
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
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 110,
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
		             x       : 1050,
			     y       : 20,
                             items: [btnPartywise]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 1,
                             width       : 250,
                             border  : false,
		             x       : 1050,
			     y       : 50,
                             items: [btnItemGrpwise]
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
                       items: [txtTotAcceptedQty]
                      },



        ],
    },

    ]  
});

    function Refreshdata()
    {
        itemname = "0";

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
