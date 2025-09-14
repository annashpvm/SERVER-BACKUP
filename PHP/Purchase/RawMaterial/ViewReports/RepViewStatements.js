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
    var monthstartdate = new Ext.form.DateField({
        id: 'monthfirstdate',
        format: 'y-m-d',
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
        id: 'monthenddate',
        format: 'y-m-d',
        value: new Date()   
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


var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
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



   var txttotPurQty = new Ext.form.NumberField({
        fieldLabel  : 'Purchase Qty',
        id          : 'txttotPurQty',
        name        : 'txttotPurQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Purchase Value',
        id          : 'txttotPurchaseValue',
        name        : 'txttotPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtMonthPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtMonthPurchaseQty',
        name        : 'txtMonthPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtMonthPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtMonthPurchaseValue',
        name        : 'txtMonthPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtPartyPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtPartyPurchaseQty',
        name        : 'txtPartyPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtItemQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtItemQty',
        name        : 'txtItemQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtItemValue',
        name        : 'txtItemValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



function grid_tot(){

        var pqty   = 0;
        var pvalue = 0;
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.purvalue);

              }
         }

         txttotPurQty.setValue(pqty);
         txttotPurchaseValue.setValue(pvalue);




}

function grid_tot_party(){
    

        var pqty   = 0;
        var pvalue = 0;
        var Row= flxParty.getStore().getCount();
        flxParty.getSelectionModel().selectAll();
        var sel=flxParty.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {
              if (Number(sel[i].data.grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.purvalue);

              }
         }
         txtMonthPurchaseQty.setValue(pqty);
         txtMonthPurchaseValue.setValue(pvalue);

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


function grid_tot_item(){

        var pqty   = 0;
        var pvalue = 0;
        var Row= flxItem.getStore().getCount();
       flxItem.getSelectionModel().selectAll();
        var sel=flxItem.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {
              if (Number(sel[i].data.rect_grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.rect_grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.rect_itemvalue);

              }
         }
         txtItemQty.setValue(pqty);
         txtItemValue.setValue(pvalue);


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

var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
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

    lblDetail.setText("Detail for the Month of  : " + repmonth );
            lblDetail.getEl().setStyle('color', 'red');
            lblDetail.getEl().setStyle('font-size', '18px');
            lblDetail.getEl().setStyle('font-weight', 'bold');   

//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    rmon = ("0"+mmon).slice(-2);
    monthstartdate = yr+"-"+rmon+"-01";
    monthenddate = yr+"-"+rmon+"-"+mdays;
//    alert(monthstartdate);  
//    alert(monthenddate);  
    loadPartyPurchaseDataStore.removeAll();
    loadPartyPurchaseDataStore.load({
        url: 'ClsViewStatements.php',
        params: {
    	task: 'loadPartywisePurchases',
        compcode:Gincompcode,
        finid:GinFinid,
        startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
        enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
	},
	scope:this,
	callback:function()
	{
          grid_tot_party();
        }
    });
    grid_tot_party();
    
}

var dgrecord = Ext.data.Record.create([]);
var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:30,
    y:300,
    height: 350,
    hidden:false,
    width: 500,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "GRN - Qty"  , dataIndex: 'grnqty',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Pur.-Value"  , dataIndex: 'purvalue',sortable:false,width:150,align:'left', menuDisabled: true},
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
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate,"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate,"Y-m-d"));
		    var p4 = "&itemcode="+encodeURIComponent(0);
		    var p5 = "&partycode="+encodeURIComponent(repparty);
 		    var param = (p1+p2+p3+p4+p5) ;
 if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign' + param, '_blank');
                 /*   if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_Party_GRNwiseArrivals.rptdesign' + param, '_blank');*/		
                }
            }

    });


    var btnPartywisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Partywise Print",
        width: 100,
        id: 'btnPartywisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate,"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate,"Y-m-d"));
		    var p4 = "&itemcode="+encodeURIComponent(0);

 		    var param = (p1+p2+p3+p4) ;
 if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_PartywiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_PartywiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_PartywiseArrivals.rptdesign' + param, '_blank');		
                  /*  if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_PartywiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRM_PartywiseArrivals.rptdesign' + param, '_blank');*/		
                }
            }

    });


var flxParty = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:270,
    y:40,
    height: 430,
    hidden:false,
    width: 700,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Supplier" , dataIndex: 'cust_code',sortable:false,width:10,align:'left', menuDisabled: true , hidden : true},
        {header: "Supplier" , dataIndex: 'cust_name',sortable:false,width:400,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'grnqty',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'purvalue',sortable:false,width:130,align:'left', menuDisabled: true},
    ],
    store:loadPartyPurchaseDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
		var sm = flxParty.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));

            lblParty.setText("Detail for  : " + selrow.get('cust_name') );
            lblParty2.setText("Detail for  : " + selrow.get('cust_name') );


            repparty = selrow.get('cust_code');
            tabOverall.setActiveTab(1);
	    loadGRNDataStore.removeAll();
	    loadGRNDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadPartyMonthArrivals',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                enddate  : Ext.util.Format.date(monthenddate,"Y-m-d"),  
                supcode    : repparty, 
		},
		scope:this,
		callback:function()
		{
                   grid_tot_grn();
		}
	    });

	    loadItemDataStore.removeAll();
	    loadItemDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadPartyItemArrivals',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                enddate  : Ext.util.Format.date(monthenddate,"Y-m-d"),  
                supcode    : repparty, 
		},
		scope:this,
		callback:function()
		{
                   grid_tot_item();
		}
	    });
     
    }
 }
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
        {header: "Rate/MT" , dataIndex: 'rect_itemrate',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'rect_grnqty',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'rect_itemvalue',sortable:false,width:120,align:'left', menuDisabled: true},
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


var flxItem = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 450,
    hidden:false,
    width: 700,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "Item Name" , dataIndex: 'itmh_name',sortable:false,width:300,align:'left', menuDisabled: true},
        {header: "Item code" , dataIndex: 'rect_item_code',sortable:false,width:220,align:'left', menuDisabled: true,hidden : true},
        {header: "Qty"   , dataIndex: 'rect_grnqty',sortable:false,width:100,align:'rigth', menuDisabled: true},
        {header: "Value" , dataIndex: 'rect_itemvalue',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store:loadItemDataStore,
    listeners:{	

            'cellclick': function (flxItem, rowIndex, cellIndex, e) {
                
                  var sm = flxItem.getSelectionModel();
		  var selrow = sm.getSelected();
   
//  alert(grnno);


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
        title: 'MONTH / PARTYWISE ARRIVALS',
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
			x       : 50,
			y       : 40,
			items:[optprinttype],
		},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 100,
                             items: [flxMonth]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
		             x       : 20,
			     y       : 480,
                             items: [txttotPurQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 110,
                             border  : false,
		             x       : 230,
			     y       : 480,
                             items: [txttotPurchaseValue]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 700,
			     y       : 490,
                             items: [txtMonthPurchaseQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 900,
			     y       : 490,
                             items: [txtMonthPurchaseValue]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 550,
			     y       : 40,
                             items: [flxParty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 650,
			     y       : 0,
                             items: [lblDetail]
                        },
		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 490,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnPartywisePrint]
		},
        ],
    },
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
			    y           : -5,
			    border      : false,
			    width       :500,
                             items: [lblParty]
                        },

		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 480,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnGRNwisePrint]
		},

        ],
    }  ,
    {    
        xtype: 'panel',
        title: 'ITEM WISE ARRIVALS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [flxItem]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 200,
			     y       : 490,
                             items: [txtItemQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 400,
			     y       : 490,
                             items: [txtItemValue]
                        },

			{ 
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : -5,
			    border      : false,
			    width       :500,
                             items: [lblParty2]
                        },

        ],
    }  ,
    ]  
});

    function Refreshdata()
    {
        Month_Add_inGrid();
 
	loadArrivalsDatastore.removeAll();
	loadArrivalsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadArrivals',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadArrivalsDatastore.getCount();
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadArrivalsDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){               
                     		    if (sel[i].data.rmonth === loadArrivalsDatastore.getAt(j).get('rmonth'))
                  		    {
                                        sel[i].set('grnqty', Ext.util.Format.number(loadArrivalsDatastore.getAt(j).get('grnqty'),'0.000'));
	                               sel[i].set('purvalue', Ext.util.Format.number(loadArrivalsDatastore.getAt(j).get('purvalue'),'0.00'));
			            }
                              }
			}
                       grid_tot();

                   }    

                }         
	  });
    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Purchase Details Details',
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
