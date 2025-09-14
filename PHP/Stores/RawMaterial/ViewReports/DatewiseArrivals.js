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

   var fitemcode = 0;
   var fitemname = "";

    var printtype = "PDF";

var repdate;

   var txtAllPartyPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtAllPartyPurchaseQty',
        name        : 'txtAllPartyPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtAllPartyPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtAllPartyPurchaseValue',
        name        : 'txtAllPartyPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


    var btnAllGRNwisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "GRN wise Print",
        width: 100,
        id: 'btnAllGRNwisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(Gincompcode); 
                    var p2 = "&finid=" + encodeURIComponent(GinFinid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-d"));
 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDatewiseReceipt.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDatewiseReceipt.rptdesign' + param, '_blank');		
                }
            }

    });


 var loadAllGRNDataStore = new Ext.data.Store({
      id: 'loadAllGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPartyMonthArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no','cust_ref', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_cust_code','rect_item_code'
]),
    });

 var loadGRNDataStore = new Ext.data.Store({
      id: 'loadGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParty_Item_GRNwise_Arrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_cust_code','rect_item_code'
]),
    });


var lblParty = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty',
        name        : 'lblParty',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var flxGRNAll = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 450,
    hidden:false,
    width: 1300,
    id: 'my-grid2',  

    columns:
    [ 	 



        {header: "Date" , dataIndex: 'rech_date',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "GRN No" , dataIndex: 'rech_no',sortable:false,width:85,align:'left', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:200,align:'left', menuDisabled: true},

        {header: "Bill No" , dataIndex: 'rech_billno',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Bill Date" , dataIndex: 'rech_billdate',sortable:false,width:105,align:'left', menuDisabled: true},
        {header: "Truck"  , dataIndex: 'rech_truckno',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itmh_name',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Rate/MT" , dataIndex: 'rect_itemrate',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'rect_grnqty',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "Value" , dataIndex: 'rect_itemvalue',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store:loadAllGRNDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
                
                  var sm = flxGRN.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('rech_no')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 



   }
}
});

var lblParty2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty2',
        name        : 'lblParty2',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblItem = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblItem',
        name        : 'lblItem',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });
 var loadDateArrivalsDataStore = new Ext.data.Store({
      id: 'loadDateArrivalsDataStore',
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
      },['rechdate', 'rech_date', 'grnqty', 'grnvalue', 'avgrate' ]),
    });


 var loadDate_Party_ArrivalsDataStore = new Ext.data.Store({
      id: 'loadDate_Party_ArrivalsDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewise_PartywiseArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_ref', 'cust_code', 'grnqty', 'grnvalue','avgrate' ]),
    });


function grid_tot_Allgrn(){
  
        var pqty   = 0;
        var pvalue = 0;
        var Row= flxGRNAll.getStore().getCount();
        flxGRNAll.getSelectionModel().selectAll();
        var sel=flxGRNAll.getSelectionModel().getSelections();


       for(var i=0;i<Row;i++)

        {
              if (Number(sel[i].data.rect_grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.rect_grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.rect_itemvalue);

              }
         }


         txtAllPartyPurchaseQty.setRawValue(Ext.util.Format.number(pqty,"0.000"));
         txtAllPartyPurchaseValue.setRawValue(Ext.util.Format.number(pvalue,"0.00"));




}



function grid_tot(){

        var twt = 0;
        var tval = 0;

         txttotItemQty.setValue('');
         txttotItemValue.setValue('');

        var Row= flxDate.getStore().getCount();
        flxDate.getSelectionModel().selectAll();
        var sel=flxDate.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.grnqty) > 0)
              {
		      twt =twt+Number(sel[i].data.grnqty);
		      tval=tval+Number(sel[i].data.grnvalue);
              }
         }


         txttotItemQty.setRawValue(Ext.util.Format.number(twt,"0.000"));
         txttotItemValue.setRawValue(Ext.util.Format.number(tval,"0.00"));



}


function grid_tot2(){

        var twt = 0;
        var tval = 0;

         txttotPartyQty.setValue('');
         txttotPartyValue.setValue('');

        var Row= flxSupplier.getStore().getCount();
        flxSupplier.getSelectionModel().selectAll();
        var sel=flxSupplier.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.grnqty) > 0)
              {
		      twt =twt+Number(sel[i].data.grnqty);
		      tval=tval+Number(sel[i].data.grnvalue);
              }
         }
         txttotPartyQty.setValue(twt);
         txttotPartyValue.setValue(tval);



}
function grid_tot_grn(){
  
        var pqty   = 0;
        var pvalue = 0;
        var Row= flxGRN.getStore().getCount();
        flxGRN.getSelectionModel().selectAll();
        var sel=flxGRN.getSelectionModel().getSelections();


       for(var i=0;i<Row;i++)

        {
              if (Number(sel[i].data.rect_grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.rect_grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.rect_itemvalue);

              }
         }

         txtPartyPurchaseQty.setValue(pqty);
         txtPartyPurchaseValue.setValue(pvalue);


}


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




   var txttotItemQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (t)',
        id          : 'txttotItemQty',
        name        : 'txttotItemQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotItemValue',
        name        : 'txttotItemValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txttotPartyQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (t)',
        id          : 'txttotPartyQty',
        name        : 'txttotPartyQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotPartyValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotPartyValue',
        name        : 'txttotPartyValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
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
        value: new Date(),
        width : 110   
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





/*
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(m1);
        find_dates(m1);


     mdays = Ext.util.Format.date(new Date(),"d");
*/

//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
          
	loadDateArrivalsDataStore.removeAll();
	loadDateArrivalsDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseArrivals',
                compcode:Gincompcode,
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
   //               lblDetail1.setText('');
//                  lblDetail2.setText('');
            loadDate_Party_ArrivalsDataStore.removeAll();
	    loadGRNDataStore.removeAll();
                  loadDateArrivalsDataStore.removeAll();
                  loadDateArrivalsDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });



var flxDate = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 400,
    hidden:false,
    width: 550,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DATE"  ,  dataIndex: 'rechdate',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "DATE"  ,  dataIndex: 'rech_date',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "GRN QTY"    , dataIndex: 'grnqty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "GRN VALUE" , dataIndex: 'grnvalue',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "AVG RATE" , dataIndex: 'avgrate',sortable:false,width:90,align:'right', menuDisabled: true},


    ],
    store:loadDateArrivalsDataStore,
    listeners:{	

            'cellclick': function (flxDate, rowIndex, cellIndex, e) {
		var sm = flxDate.getSelectionModel();
		var selrow = sm.getSelected();
                txttotPartyQty.setValue('');
                txttotPartyValue.setValue('') 


                reportfor = selrow.get('rechdate')
                repdate  = selrow.get('rech_date')
 

//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  : " + reportfor);

            loadDate_Party_ArrivalsDataStore.removeAll();
	    loadGRNDataStore.removeAll();
	    loadDate_Party_ArrivalsDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadDatewise_PartywiseArrivals',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(repdate,"Y-m-d"), 
                enddate: Ext.util.Format.date(repdate,"Y-m-d"), 

		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });



	    loadAllGRNDataStore.removeAll();
	    loadAllGRNDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadAllPartyMonthArrivals',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(repdate,"Y-m-d"),  
                enddate  : Ext.util.Format.date(repdate,"Y-m-d"),  
		},
		scope:this,
		callback:function()
		{

                   grid_tot_Allgrn();
		}
	    });
     
    }
 }
});





var flxSupplier = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:500,
//    y:100,
    height: 400,
    hidden:false,
    width: 700,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Supplier Name"  ,  dataIndex: 'cust_ref',sortable:false,width:350,align:'left', menuDisabled: true },
        {header: "Supplier Code"  ,  dataIndex: 'cust_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},

        {header: "QTY"    , dataIndex: 'grnqty',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "VALUE" , dataIndex: 'grnvalue',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "AVG RATE" , dataIndex: 'avgrate',sortable:false,width:100,align:'right', menuDisabled: true},
    ],
    store:loadDate_Party_ArrivalsDataStore,
    listeners:{	
            'cellclick': function (flxInvoiceList, rowIndex, cellIndex, e) {
		var sm = flxInvoiceList.getSelectionModel();
		var selrow = sm.getSelected();

    

            lblParty.setText("Detail for  : " + selrow.get('cust_ref') );
            lblParty2.setText("Detail for  : " + selrow.get('cust_ref') );


            repparty = selrow.get('cust_code');
            tabOverall.setActiveTab(1);
	    loadGRNDataStore.removeAll();
	    loadGRNDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadParty_Item_GRNwise_Arrivals',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(repdate,"Y-m-d"), 
                enddate: Ext.util.Format.date(repdate,"Y-m-d"), 
                supcode    : repparty, 
                itemcode   : fitemcode,
		},
		scope:this,
		callback:function()
		{
                   grid_tot_grn();
		}
	    });


     
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
	loadDateArrivalsDataStore.removeAll();
	loadDateArrivalsDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseArrivals',
                compcode:Gincompcode,
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
        }   
});    



    var btnDatewisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Datewise Print",
        width: 100,
        id: 'btnDatewisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);  
                    var p2 = "&finid=" + encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 

 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign' + param, '_blank');
                }
            }

    });


    var btnDatePartywisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Date-Parttwise Print",
        width: 130,
        id: 'btnDatePartywisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);  
                    var p2 = "&finid=" + encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-d"));
 

 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseReceipt.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseReceipt.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseReceipt.rptdesign' + param, '_blank');

            }
      }
    });



    var btnGRNwisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "GRN wise Print",
        width: 100,
        id: 'btnGRNwisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(repdate,"Y-m-d"));
		    var p4 = "&itemcode="+encodeURIComponent(0);
		    var p5 = "&partycode="+encodeURIComponent(repparty);
 		    var param = (p1+p2+p3+p4+p5) ;
 if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign' + param, '_blank');
				
            }
        }

    });


   var txtPartyPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtPartyPurchaseQty',
        name        : 'txtPartyPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtPartyPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtPartyPurchaseValue',
        name        : 'txtPartyPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


var flxGRN = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 450,
    hidden:false,
    width: 1200,
    id: 'my-grid',  

    columns:
    [ 	 



        {header: "Date" , dataIndex: 'rech_date',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "GRN No" , dataIndex: 'rech_no',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Bill No" , dataIndex: 'rech_billno',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Bill Date" , dataIndex: 'rech_billdate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Truck"  , dataIndex: 'rech_truckno',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itmh_name',sortable:false,width:220,align:'left', menuDisabled: true},
        {header: "Rate/MT" , dataIndex: 'rect_itemrate',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'rect_grnqty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Value" , dataIndex: 'rect_itemvalue',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store:loadGRNDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
                
                  var sm = flxGRN.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('rech_no')
//  alert(grnno);

  
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param); 



   }
}
});

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
			width   : 300,
			layout  : 'absolute',
			x       : 1000,
			y       : 10,
			items:[optprinttype],
		},


			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 60,
			    border      : false,
			    width       :500,
                             items: [lblItem]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 20,
                	     width   : 350,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 20,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 20,
                       	     width   : 250,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 22,
                             items: [btnProcess]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 80,
                             items: [flxDate]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 600,
			     y       : 80,
                             items: [flxSupplier]
                        },
       
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 20,
                       y           : 500,
                       border      : false,
                       items: [txttotItemQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 250,
                       y           : 500,
                       border      : false,
                       items: [txttotItemValue]
                      },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 650,
                       y           : 500,
                       border      : false,
                       items: [txttotPartyQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 500,
                       border      : false,
                       items: [txttotPartyValue]
                      },

		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnDatewisePrint]
		},


		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 500,
		    border      : false,
		    width       : 1,
                    labelWidth  : 50,
		    items : [btnDatePartywisePrint]
		},

     ]
    } ,

    {    
        xtype: 'panel',
        title: 'GRNWISE ARRIVALS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [flxGRN]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 490,
                             items: [txtPartyPurchaseQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 800,
			     y       : 490,
                             items: [txtPartyPurchaseValue]
                        },

			{ 
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 10,
			    border      : false,
			    width       :500,
                             items: [lblParty]
                        },

		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnGRNwisePrint]
		},


        ],
    }  ,

    {    
        xtype: 'panel',
        title: 'DATE-GRN WISE ARRIVALS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [flxGRNAll]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 490,
                             items: [txtAllPartyPurchaseQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 800,
			     y       : 490,
                             items: [txtAllPartyPurchaseValue]
                        },


		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 480,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnAllGRNwisePrint]
		},

        ],
    }  

    ],
    });
    function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(parseInt(m1));
        find_dates(m1);

        monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

    }  

    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
  //      title       : '',  //'Itemwise Purchase Details',
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
