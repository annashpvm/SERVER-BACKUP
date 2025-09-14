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

 var custcode = 0;
 var custname = 0;


   var printtype='PDF';


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
})
 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/SALES/ClsSalesMain.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}
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




    var btnViewMonthBreakup = new Ext.Button({
        style: 'text-align:center;',
        text: "Abstract Print",
        width: 70,
        id: 'btnViewMonthBreakup',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
                    var p2 = "&fincode=" + encodeURIComponent(GinFinid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-  d"));	
	            var p4 = "&custcode=" + encodeURIComponent(custcode);	

                    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyMonthwiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyMonthwiseAbstract.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyMonthwiseAbstract.rptdesign' + param, '_blank');	
            }
       }

    });




    var btnViewPartyBillwise = new Ext.Button({
        style: 'text-align:center;',
        text: "Billwise Print",
        width: 70,
        id: 'btnViewPartyBillwise',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
                    var p2 = "&finid=" + encodeURIComponent(GinFinid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate,"Y-m-  d"));	
	            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate,"Y-m-  d"));	
                    var p5 = "&partytype=" + encodeURIComponent('1');
                    var p6 = "&custcodelist=" + encodeURIComponent(custcode);


                    var param = (p1+p2+p3+p4+p5+p6) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign' + param, '_blank');	
	
            }
       }

    });

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code',type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });



 var loadFinishedDespatchedDatastore = new Ext.data.Store({
      id: 'loadFinishedDespatchedDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinishedDespatched"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'finwt', 'despwt', 'value1'


      ]),
    });


 var loadPartySalesDataStore = new Ext.data.Store({
      id: 'loadFinishedDespatchedDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartywiseSales"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_code', 'cust_ref', 'despwt', 'value1']),
    });


 var loadInvoiceDataStore = new Ext.data.Store({
      id: 'loadInvoiceDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invh_date','invh_invrefno','invwt','invh_netamt']),
    });



var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});


   var txttotProdQty = new Ext.form.NumberField({
        fieldLabel  : 'Prodn Qty',
        id          : 'txttotProdQty',
        name        : 'txttotProdQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txttotSalesQty',
        name        : 'txttotSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Inv.Amout',
        id          : 'txttotSalesValue',
        name        : 'txttotSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });
/*
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
        flxMonth.getStore().removeAll();
        flxInvoice.getStore().removeAll();
        Month_Add_inGrid();
	loadFinishedDespatchedDatastore.removeAll();
	loadFinishedDespatchedDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadPartyMonthDespatched',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                custcode : cmbCustomer.getValue(),

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadFinishedDespatchedDatastore.getCount();
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadFinishedDespatchedDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  
             		       for (var i=0;i<selrows;i++){               
                     		    if (sel[i].data.rmonth === loadFinishedDespatchedDatastore.getAt(j).get('rmonth'))
                  		    {
                                        sel[i].set('saleqty', Ext.util.Format.number(loadFinishedDespatchedDatastore.getAt(j).get('despwt'),'0.000'));
	                               sel[i].set('salevalue', Ext.util.Format.number(loadFinishedDespatchedDatastore.getAt(j).get('value1'),'0.00'));
			            }
                              }
			}
                       grid_tot();

                   }    

                }         
	  });
	   }
       }
});
*/
var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ESC)
             {
                flxPartydet.hide();
             }
             if (e.getKey() == e.ENTER)
             {

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxPartydet.getSelectionModel().selectRow(0)
             flxPartydet.focus;
             flxPartydet.getView().focusRow(0);
             }
             if (e.getKey() == e.UP)
             {
 
              txtCustomer.focus;
             }
          },

	    keyup: function () {
		flxPartydet.getEl().setStyle('z-index','10000');
                flxPartydet.show();
                loadSearchPartyListDatastore.removeAll();
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });


function loadPartyDetails()
{
			var sm = flxPartydet.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
 
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custname = selrow.get('cust_ref');
                                txtCustomer.setRawValue(selrow.get('cust_ref'));

			  flxPartydet.hide();	
		loadFinishedDespatchedDatastore.removeAll();
	loadFinishedDespatchedDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadPartyMonthDespatched',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                custcode : custcode,
	
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadFinishedDespatchedDatastore.getCount();
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
                       for (var i=0;i<selrows;i++){ 
                           sel[i].set('saleqty', '0.000');
	                   sel[i].set('salevalue','0.00');
                       }

		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();

		       var cnt = loadFinishedDespatchedDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  
             		       for (var i=0;i<selrows;i++){ 
             
                     		    if (sel[i].data.rmonth === loadFinishedDespatchedDatastore.getAt(j).get('rmonth'))
                  		    {
                                        sel[i].set('saleqty', Ext.util.Format.number(loadFinishedDespatchedDatastore.getAt(j).get('despwt'),'0.000'));
	                               sel[i].set('salevalue', Ext.util.Format.number(loadFinishedDespatchedDatastore.getAt(j).get('value1'),'0.00'));
			            }
                              }
			}
                      grid_tot();
 
                   }    

                }         
	  });
   }
		

}

var dgrecord = Ext.data.Record.create([]);
   var flxPartydet = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 350,
//        header : false,
        x: 125,
        y: 80,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	

	'render' : function(cmp) {
	    cmp.getEl().on('keypress', function(e) {
		if (e.getKey() == e.ENTER) {
		   loadPartyDetails();

		}
	     });
	},  
	'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
	   loadPartyDetails();
	} 
		
         }





   });


   var txtSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtSalesQty',
        name        : 'txtSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Inv.Amt',
        id          : 'txtSalesValue',
        name        : 'txtSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

var btnBack = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "BACK",
	width   : 80,
	height  : 35,
	x       : 700,
	y       : 430,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
                 flxParty.show(); 
                 flxInvoice.hide(); 
                 grid_tot_party();
       	 }
        }   
});


function grid_tot(){



        var prodwt = 0;
        var despwt = 0;
        var despval = 0;
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.saleqty) > 0)
              {
		      despwt=despwt+Number(sel[i].data.saleqty);
		      despval=despval+Number(sel[i].data.salevalue);
              }
         }
         txttotProdQty.setValue(prodwt);
         txttotSalesQty.setValue(despwt);
         txttotSalesValue.setValue(despval);

}

function grid_tot_party(){
    

        var prodwt = 0;
        var despwt = 0;
        var despval = 0;
        var Row= flxParty.getStore().getCount();
        flxParty.getSelectionModel().selectAll();
        var sel=flxParty.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.despwt) > 0)
              {
		      despwt=despwt+Number(sel[i].data.despwt);
		      despval=despval+Number(sel[i].data.value1);
              }
         }
         txtSalesQty.setValue(despwt);
         txtSalesValue.setValue(despval);

}

function grid_tot_inv(){
  

        var prodwt = 0;
        var despwt = 0;
        var despval = 0;
        var Row= flxInvoice.getStore().getCount();
        flxInvoice.getSelectionModel().selectAll();
        var sel=flxInvoice.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.invwt) > 0)
              {
		      despwt=despwt+Number(sel[i].data.invwt);
		      despval=despval+Number(sel[i].data.invh_netamt);
              }
         }
         txtSalesQty.setValue(despwt);
         txtSalesValue.setValue(despval);

}

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


            repparty = txtCustomer.getRawValue();
            flxInvoice.show(); 
            lblDetail.setText("Detail for the Party  : " + repparty );
	    loadInvoiceDataStore.removeAll();
	    loadInvoiceDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadPartyDetails',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                enddate  : Ext.util.Format.date(monthenddate,"Y-m-d"),  
                party    : custcode, 

		},
		scope:this,
		callback:function()
		{
                   grid_tot_inv();
		}
	    });
    
}

var dgrecord = Ext.data.Record.create([]);
var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:10,
    height: 300,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Sales-Qty"  , dataIndex: 'saleqty',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Inv.Amount"  , dataIndex: 'salevalue',sortable:false,width:150,align:'left', menuDisabled: true},
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


var flxParty = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:400,
    y:20,
    height: 340,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Party" , dataIndex: 'cust_code',sortable:false,width:10,align:'left', menuDisabled: true,hidden:true},
        {header: "Party" , dataIndex: 'cust_ref',sortable:false,width:350,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'despwt',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'value1',sortable:false,width:100,align:'left', menuDisabled: true},
    ],
    store:loadPartySalesDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
		var sm = flxParty.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));
            repparty = selrow.get('cust_ref')
            flxInvoice.show(); 
            lblDetail.setText("Detail for the Party  : " + repparty );
	    loadInvoiceDataStore.removeAll();
	    loadInvoiceDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadPartyDetails',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                enddate  : Ext.util.Format.date(monthenddate,"Y-m-d"),  
                party    : selrow.get('cust_code'), 
		},
		scope:this,
		callback:function()
		{
                   grid_tot_inv();
		}
	    });

     
    }
 }
});

var flxInvoice = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:400,
    y:20,
    height: 350,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Date" , dataIndex: 'invh_date',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Inv. No" , dataIndex: 'invh_invrefno',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'invwt',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Inv.Amount" , dataIndex: 'invh_netamt',sortable:false,width:120,align:'left', menuDisabled: true},
    ],
     store:loadInvoiceDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
                
		var sm = flxParty.getSelectionModel();
		var selrow = sm.getSelected();
                var invno = selrow.get('invh_invrefno')
				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&invno=" + encodeURIComponent(invno);
                                i1 = "ORIGINAL FOR BUYER";
         		        var p4 = "&displayword=" + encodeURIComponent(i1);
				var param = (p1 + p2 + p3 + p4  );    
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

   }
}
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
        method      : 'POS7T',
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
//view
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));
				var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(new Date(),"Y-m-d"));
                              	var p5 = "&custcode=" + encodeURIComponent(txtCustomer.getValue());
				var param = (p1+p2+p3+p4+p5) ;
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepViewPartySales.rptdesign&' + param, '_blank');

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
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 510,
                width   : 1280,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 10,

                items:[
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 50,
			y       : 0,
			items:[optprinttype],
	},

				{ 
						   xtype       : 'fieldset',
						   title       : '',
						   labelWidth  : 100,
						   width       : 600,
						   x           : 10,
						   y           : 50,
						   border      : false,
						   items: [txtCustomer]
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
                             labelWidth  : 70,
                             border  : false,
		             x       : 50,
			     y       : 430,
                             items: [txttotSalesQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
		             x       : 250,
			     y       : 430,
                             items: [txttotSalesValue]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 700,
			     y       : 430,
                             items: [txtSalesQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 900,
			     y       : 430,
                             items: [txtSalesValue]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 650,
			     y       : 50,
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
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 650,
			     y       : 50,
                             items: [flxInvoice]
                        }, 


        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1150,
            height      : 400,
            x           : 500,
            y           : 440,
            border      : false,
            items : [btnViewMonthBreakup]
        },

	


        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 400,
            x           : 1100,
            y           : 440,
            border      : false,
            items : [btnViewPartyBillwise]
        },flxPartydet,

					
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {
        Month_Add_inGrid();
        flxPartydet.hide();
    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Sales Details',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
