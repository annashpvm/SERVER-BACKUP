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

   var qlylist = '';

   var printtype='PDF';

   var loadSalesVarietyDataStore = new Ext.data.Store({
      id: 'loadSalesVarietyDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespatchedQuality"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'quality',  'vargrp_type_code', 'invwt', 'invvalue'
      ]),
    });

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    width:300,
    height:70,

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
        value: new Date()   
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



// mdays = Ext.util.Format.date(new Date(),"d");


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
          
	loadSalesVarietyDataStore.removeAll();
	loadSalesVarietyDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDespatchedQuality',
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


	loadPartyListDataStore.removeAll();
	loadPartyListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDespatchedPartywise',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                allbf  : 0,
                selectbf : '',  
		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Party();
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
['7','JULY'],['8','AUGUEST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
                  lblDetail1.setText('');
                  lblDetail2.setText('');
                  loadPartyListDataStore.removeAll();
                  loadInvoiceDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    




 var loadPartyListDataStore = new Ext.data.Store({
      id: 'loadPartyListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespatchedPartywise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['quality', 'vargrp_type_short_code', 'vargrp_type_code', 'cust_ref', 'cust_code', 'invwt', 'invvalue' ]),
    });



 var loadInvoiceDataStore = new Ext.data.Store({
      id: 'loadInvoiceDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespatchedPartywise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invh_date', 'invh_invrefno', 'invwt', 'invvalue' ]),
    });




var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblDetail2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail2',
    width       : 250,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});


var lblDetail3 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail3',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});


   var txttotSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txttotSalesQty',
        name        : 'txttotSalesQty',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Amout',
        id          : 'txttotSalesValue',
        name        : 'txttotSalesValue',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



   var txtPartySalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtPartySalesQty',
        name        : 'txtPartySalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtPartySalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Inv.Amt',
        id          : 'txtPartySalesValue',
        name        : 'txtPartySalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtInvSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtInvSalesQty',
        name        : 'txtInvSalesQty',
        width       :  70,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtInvSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Inv.Amt',
        id          : 'txtInvSalesValue',
        name        : 'txtInvSalesValue',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
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
	loadSalesVarietyDataStore.removeAll();
	loadSalesVarietyDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDespatchedQuality',
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


var btnAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "ABSTRACT",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){    

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFwise.rptdesign&__format=XLS' + param, '_blank');
    //    	 window.Excel.Workbook.Open("teste.xls");

}
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFwise.rptdesign' + param, '_blank');
     
       	 }
        }   
});


var btnPartywise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',
	},
	text    : "PARTY WISE PRINT",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  

//alert(qlylist)
          var repopt = 0;
          if (qlylist == "")
          {    
             repopt = 0;
             qlylist = '0';    
          } 
          else
          {    
             repopt = 1;
          } 
          

 
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p5 = "&opt=" + encodeURIComponent(repopt);
		var p6 = "&bflist=" + encodeURIComponent(qlylist);

                var param = (p1+p2+p3+p4+p5+p6) ;
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomerwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomerwise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomerwise.rptdesign' + param, '_blank');
     
       	 }
        }   
});



var btnPartyInvwise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',
	},
	text    : "PARTY - INV WISE PRINT",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  

//alert(qlylist)
          var repopt = 0;
          if (qlylist == "")
          {    
             repopt = 0;
             qlylist = '0';    
          } 
          else
          {    
             repopt = 1;
          } 
          

 
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p5 = "&opt=" + encodeURIComponent(repopt);
		var p6 = "&bflist=" + encodeURIComponent(qlylist);

                var param = (p1+p2+p3+p4+p5+p6) ;
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomer_Invwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomer_Invwise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFCustomer_Invwise.rptdesign' + param, '_blank');
     
       	 }
        }   
});


function grid_tot(){

        var tdespwt = 0;
        var tdespval = 0;

         txttotSalesQty.setValue('');
         txttotSalesValue.setValue('');

        var Row= FlxQuality.getStore().getCount();
        FlxQuality.getSelectionModel().selectAll();
        var sel=FlxQuality.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.invwt) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.invwt);
		      tdespval=tdespval+Number(sel[i].data.invvalue);
              }
         }
         txttotSalesQty.setValue(tdespwt);
         txttotSalesValue.setValue(tdespval);



}

function grid_tot_Invoice(){
    

        txtInvSalesQty.setValue('');
        txtInvSalesValue.setValue('');
        var tdespwt = 0;
        var tdespval = 0;

        var Row= flxItemList.getStore().getCount();
        flxItemList.getSelectionModel().selectAll();
        var sel=flxItemList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.invwt) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.invwt);
		      tdespval =tdespval+Number(sel[i].data.invvalue);


              }
         }
         txtInvSalesQty.setValue(tdespwt);
         txtInvSalesValue.setValue(tdespval);

}

function grid_tot_Party(){
  
        var tdespwt = 0;
        var tdespval = 0;

         txtPartySalesQty.setValue('');
         txtPartySalesValue.setValue('');

        var Row= flxCustomerList.getStore().getCount();
        flxCustomerList.getSelectionModel().selectAll();
        var sel=flxCustomerList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.invwt) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.invwt);
		      tdespval=tdespval+Number(sel[i].data.invvalue);
              }
         }
         txtPartySalesQty.setValue(tdespwt);
         txtPartySalesValue.setValue(tdespval);


}


var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = FlxQuality.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.quality);
}
}
}
});

function getQualityDetails()
{

            qlylist = "0";
  	    var sel = FlxQuality.getSelectionModel().getSelections();
	    for (var t=0; t<sel.length; t++)
	    {
		if (qlylist === "")
		      qlylist =  sel[t].data.quality.substring(0,4);
		else
		      qlylist = qlylist + ","  + sel[t].data.quality.substring(0,4);
	    }

	loadPartyListDataStore.removeAll();
	loadPartyListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDespatchedPartywise',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                allbf  : 1,
                selectbf :qlylist,  
		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Party();
		}
	    });


}
var dgrecord = Ext.data.Record.create([]);

var fm1 = Ext.form;
var FlxQuality = new Ext.grid.EditorGridPanel({
    frame: false,
    id : 'FlxQuality',
    hideHeaders : false,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 350,
    width: 350,
    x: 280,
    y: 10,
    selModel: sm1,
    columns: [sm1,
        {header: "Quality", dataIndex: 'quality',sortable:true,width:80,align:'left',hidden:false},
        {header: "Code", dataIndex: 'vargrp_type_code',sortable:true,width:80,align:'left',hidden:true},
        {header: "Quanity", dataIndex: 'invwt',sortable:true,width:90,align:'right',hidden:false},
        {header: "Value", dataIndex: 'invvalue',sortable:true,width:100,align:'right',hidden:false},
    ],
    store   : loadSalesVarietyDataStore,
	  listeners:{
                'cellclick' : function (flxDesc, rowIndex, cellIndex, e) {
                     getQualityDetails();
                    },
    afterrender: function(grid) {
        Ext.defer(function() {
            var headerCheckbox = Ext.get(grid.getEl().dom).select('div.x-grid3-hd-checker').first();
            if (headerCheckbox) {
                headerCheckbox.on('click', function() {
                    getQualityDetails(); // fires on main checkbox click
                });
            }
        }, 500);
    }
          }

});  




var flxCustomerList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:250,
    y:30,
    height: 350,
    hidden:false,
    width: 540,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "Quality", dataIndex: 'quality',sortable:true,width:80,align:'left',hidden:false},
        {header: "Code", dataIndex: 'vargrp_type_code',sortable:true,width:80,align:'left',hidden:true},	
        {header: "Customer "    ,  dataIndex: 'cust_ref',sortable:false,width:240,align:'left', menuDisabled: true},
        {header: "Code", dataIndex: 'cust_code',sortable:true,width:80,align:'left',hidden:true},	
        {header: "Inv Wt " , dataIndex: 'invwt',sortable:false,width:70,align:'right', menuDisabled: true},
        {header: "Inv Amount " , dataIndex: 'invvalue',sortable:false,width:100,align:'right', menuDisabled: true},

    ],
    store:loadPartyListDataStore,
    listeners:{	

            'cellclick': function (FlxQuality, rowIndex, cellIndex, e) {
		var sm = FlxQuality.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));

            custname = selrow.get('cust_ref')
            lblDetail2.setText("For : " + custname );
            lblDetail2.getEl().setStyle('color', 'red');
            lblDetail2.getEl().setStyle('font-size', '14px');
     //       lblDetail2.getEl().setStyle('font-weight', 'bold');  
//alert(qlylist);
            if (qlylist == "")
             qlylist = selrow.get('quality').substring(0,4)

	    loadInvoiceDataStore.removeAll();
	    loadInvoiceDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadDespatchedPartyInvwise',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                allbf  : 1,
                selectbf :qlylist, 
                custcode :  selrow.get('cust_code')
		},
		scope:this,
		callback:function()
		{
                   grid_tot_Invoice();
                   qlylist = "";
		}
	    });

     
    }
 }
});

var flxItemList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:250,
    y:30,
    height: 350,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	

        {header: "Inv Date"    , dataIndex: 'invh_date',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Inv.No "    ,  dataIndex: 'invh_invrefno',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "QTY " , dataIndex: 'invwt',sortable:false,width:70,align:'right', menuDisabled: true},
        {header: "Amount" , dataIndex: 'invvalue',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadInvoiceDataStore,
    listeners:{	

            'cellclick': function (flxItemList, rowIndex, cellIndex, e) {
		var sm = flxItemList.getSelectionModel();
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
        method      : 'POST',
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
                              	var p5 = "&custcode=" + encodeURIComponent(cmbCustomer.getValue());
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
                height  : 515,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 5,
                y       : 5,

                items:[
                       { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 20,
                             items: [optprinttype]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : -10,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : -10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : -10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : -12,
                             items: [btnProcess]
                        },



				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 350,
				            labelWidth  : 1,
				            x           : 360,
				            y           : 30,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDetail1]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 400,
				            labelWidth  : 1,
				            x           : 910,
				            y           : 30,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDetail2]
				        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : -10,
			     y       : 60,
                             items: [FlxQuality]
                        },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : -10,
                       y           : 420,
                       border      : false,
                       items: [txttotSalesQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 150,
                       y           : 420,
                       border      : false,
                       items: [txttotSalesValue]
                      },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 400,
                       y           : 420,
                       border      : false,
                       items: [txtPartySalesQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 650,
                       y           : 420,
                       border      : false,
                       items: [txtPartySalesValue]
                      },


                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 900,
                       y           : 420,
                       border      : false,
                       items: [txtInvSalesQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 1060,
                       y           : 420,
                       border      : false,
                       items: [txtInvSalesValue]
                      },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 350,
			     y       : 60,
                             items: [flxCustomerList]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 900,
			     y       : 60,
                             items: [flxItemList]
                        },



                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 5,
                       y           : 450,
                       border      : false,
                       items: [btnAbstract]
                      },

                      { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 500,
                       y           : 450,
                       border      : false,
                       items: [btnPartywise]
                      },
	
                      { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 650,
                       y           : 450,
                       border      : false,
                       items: [btnPartyInvwise]
                      },
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {
        qlylist = '';
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 

        cmbMonth.setValue(parseInt(m1));
        find_dates(parseInt(m1));



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
