Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode  = localStorage.getItem('gincompcode');
   var GinFinid     = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate   = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var fitemcode = 0;
   var fitemname = "";
   var printtype = "PDF";
   var grpcode = 0;
   var grpname = '';
   var subgrpcode = 0;
   var subgrpname = '';
   var itemcode =0;
   var itemname ='';



   var txtTotQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });

   var txtTotTaxable = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable',
        id          : 'txtTotTaxable',
        name        : 'txtTotTaxable',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });

   var txtTotCGST = new Ext.form.NumberField({
        fieldLabel  : 'Total CGST',
        id          : 'txtTotCGST',
        name        : 'txtTotCGST',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });

   var txtTotSGST = new Ext.form.NumberField({
        fieldLabel  : 'Total SGST',
        id          : 'txtTotSGST',
        name        : 'txtTotSGST',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });

   var txtTotIGST = new Ext.form.NumberField({
        fieldLabel  : 'Total IGST',
        id          : 'txtTotIGST',
        name        : 'txtTotIGST',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });


   var txtTotAMT = new Ext.form.NumberField({
        fieldLabel  : 'Total AMOUNT',
        id          : 'txtTotAMT',
        name        : 'txtTotAMT',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

   });
    var btnView_Datewise = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Datewise Sales ",
	width   : 120,
	height  : 35,
        id:'btnView_Datewise',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesDatewise.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesDatewise.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesDatewise.rptdesign' + param, '_blank');	



	    }
	}
});


    var btnView_Partywise = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Partywise Sales ",
	width   : 120,
	height  : 35,
        id:'btnView_Partywise',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesPartywise.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesPartywise.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesPartywise.rptdesign' + param, '_blank');	



	    }
	}
});




var btnView_Itemwise = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Itemwise Sales ",
	width   : 120,
	height  : 35,
        id:'btnView_Itemwise',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesItemwise.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesItemwise.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepOtherSalesItemwise.rptdesign' + param, '_blank');		



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


var LoadsaleDetailsDatastore = new Ext.data.Store({
      id: 'LoadsaleDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/General/TrnOtherSales/ClsOthSales.php',
                method: 'POST'
            }),
            baseParams:{task:"loadStoresSales"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['os_date', 'os_invno', 'cust_ref', 'cust_gstin', 'salitem_name', 'uom_short_name', 'os_rate', 'os_qty', 'os_others', 'os_taxable', 'os_cgstper', 'os_cgst', 'os_sgstper', 'os_sgst', 'os_igstper', 'os_igst', 'os_rounding', 'os_netamt' ]),
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
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);
    LoadsaleDetailsDatastore.removeAll();
    LoadsaleDetailsDatastore.load({
        url: '/SHVPM/Stores/General/TrnOtherSales/ClsOthSales.php',
	params: {
           task: 'loadStoresSales',
	   finid:GinFinid,
	   compcode:Gincompcode,
           fromdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
           todate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),   					
	},
        callback:function()
        {

           grid_tot();    

	},

     });                    
    
}


  function grid_tot(){
	totqty  =0;
        tottax  =0;
        totcgst =0;
        totsgst =0;
        totigst =0;
        totamt  =0;

        var Row1= flxDetail.getStore().getCount();

        flxDetail.getSelectionModel().selectAll();
        var sele=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totqty =Number(totqty)+Number(sele[i].data.os_qty);
            tottax =Number(tottax)+Number(sele[i].data.os_taxable);
            totcgst=Number(totcgst)+Number(sele[i].data.os_cgst);
            totsgst=Number(totsgst)+Number(sele[i].data.os_sgst);
            totigst=Number(totigst)+Number(sele[i].data.os_igst);
            totamt =Number(totamt)+Number(sele[i].data.os_netamt);

        }
        txtTotQty.setRawValue(Ext.util.Format.number(totqty,"0.000"));
        txtTotTaxable.setRawValue(Ext.util.Format.number(tottax,"0.00"));
        txtTotCGST.setRawValue(Ext.util.Format.number(totcgst,"0.00"));
        txtTotSGST.setRawValue(Ext.util.Format.number(totsgst,"0.00"));
        txtTotIGST.setRawValue(Ext.util.Format.number(totigst,"0.00"));
        txtTotAMT.setRawValue(Ext.util.Format.number(totamt,"0.00"));



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
   
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
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
        height: 400,
        width: 1280,
         id: 'my-grid',     
        columns: [   

            {header: "Date", dataIndex: 'os_date',sortable:true,width:100,align:'left'},
            {header: "Inv. No", dataIndex: 'os_invno',sortable:true,width:150,align:'left'},
            {header: "Party", dataIndex: 'cust_ref',sortable:true,width:250,align:'left'},
            {header: "GST IN", dataIndex: 'cust_gstin',sortable:true,width:150,align:'left'},
            {header: "Item Name", dataIndex: 'salitem_name',sortable:true,width:100,align:'left'},
            {header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:80,align:'center'},
	    {header: "Rate", dataIndex: 'os_rate',sortable:true,width:80,align:'right'},
	    {header: "Qty", dataIndex: 'os_qty',sortable:true,width:100,align:'right'},
	    {header: "Others", dataIndex: 'os_others',sortable:true,width:80,align:'right'},
	    {header: "Taxable", dataIndex: 'os_taxable',sortable:true,width:100,align:'right'},
	    {header: "CGST %", dataIndex: 'os_cgstper',sortable:true,width:75,align:'right'},
	    {header: "CGST AMT", dataIndex: 'os_cgst',sortable:true,width:100,align:'right'},
	    {header: "SGST %", dataIndex: 'os_sgstper',sortable:true,width:75,align:'right'},
	    {header: "SGST AMT", dataIndex: 'os_sgst',sortable:true,width:100,align:'right'},
	    {header: "IGST %", dataIndex: 'os_igstper',sortable:true,width:75,align:'right'},
	    {header: "IGST AMT", dataIndex: 'os_igst',sortable:true,width:100,align:'right'},
	    {header: "Rounding", dataIndex: 'os_rounding',sortable:true,width:100,align:'right'},
	    {header: "INV AMT", dataIndex: 'os_netamt',sortable:true,width:100,align:'right'},

        ],
        store:LoadsaleDetailsDatastore,
        listeners:{	
       'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
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
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=XLSX&' + param, '_blank');	
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
        title: 'FLY ASH / OTHER SALES',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 280,
			     y       : 20,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 480,
			     y       : 20,
                       	     width   : 250,
                             items: [monthenddate]
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

				border  : true,
				height  : 50,
				width   : 300,
				layout  : 'absolute',
				x       : 720,
				y       : 20,
				items:[optprinttype],
	           	},
                        flxDetail,


			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 1,
		             width       : 150,
		             border  : false,
			     x       : 1020,
			     y       : -02,
		             items: [btnView_Datewise]
		        },

			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 1,
		             width       : 150,
		             border  : false,
			     x       : 1020,
			     y       : 35,
		             items: [btnView_Partywise]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 1,
		             width       : 150,
		             border  : false,
			     x       : 1150,
			     y       : -2,
		             items: [btnView_Itemwise]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 70,
		             width       : 250,
		             border  : false,
			     x       : 10,
			     y       : 480,
		             items: [txtTotQty]
		        },

			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 100,
		             width       : 250,
		             border  : false,
			     x       : 210,
			     y       : 480,
		             items: [txtTotTaxable]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 90,
		             width       : 250,
		             border  : false,
			     x       : 430,
			     y       : 480,
		             items: [txtTotCGST]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 90,
		             width       : 250,
		             border  : false,
			     x       : 640,
			     y       : 480,
		             items: [txtTotSGST]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 90,
		             width       : 250,
		             border  : false,
			     x       : 850,
			     y       : 480,
		             items: [txtTotIGST]
		        },
			{ 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 110,
		             width       : 250,
		             border  : false,
			     x       : 1050,
			     y       : 480,
		             items: [txtTotAMT]
		        },
         ],
    } ,
   
    ]       
});



function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(parseInt(m1));
        find_dates(m1);



    }  



    var OtherSalesWindow = new Ext.Window({
	height      : 590,
        width       : 1300,
	//x	    : 250,
       // y           : 35,
        title       : 'Stores Sales Details',
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
