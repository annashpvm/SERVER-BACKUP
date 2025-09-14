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



   var printtype='PDF';

var truckno = '';
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


    var curday  = Ext.util.Format.date(new Date(),"d");
    var curmon  = Ext.util.Format.date(new Date(),"m");


    if (Number(curmon) == Number(mmon))
       mdays = curday;
       


    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
          
	loadTruckTypeListDataStore.removeAll();
	loadTruckTypeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTruckTypeDetails',
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
                  lblDetail1.setText('');
                  lblDetail2.setText('');
                  loadTruckListDataStore.removeAll();
                  loadTruckListDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    



 var loadTruckTypeListDataStore = new Ext.data.Store({
      id: 'loadTruckTypeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTruckTypeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['truck', 'weight' ]),
    });


 var loadTruckListDataStore = new Ext.data.Store({
      id: 'loadTruckListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTruckList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['truck', 'weight']),
    });




 var loadTruckDetailDataStore = new Ext.data.Store({
      id: 'loadTruckDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTruckDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['cust_ref', 'invh_invrefno', 'invh_date', 'weight', 'cust_city', 'invh_delivery_city', 'invh_vehi_no']),
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
    width       : 150,
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



   var txtTruckSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtTruckSalesQty',
        name        : 'txtTruckSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
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
        loadTruckListDataStore.removeAll();
	loadTruckDetailDataStore.removeAll();
	loadTruckTypeListDataStore.removeAll();
	loadTruckTypeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTruckTypeDetails',
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


var btnMillTruck = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "MILL TRUCK DETAILS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){    


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                var p4 = "&opt=" + encodeURIComponent(1);
                var param = (p1+p2+p3+p4);

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign&__format=xls' + param, '_blank');
    //    	 window.Excel.Workbook.Open("teste.xls");

}
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign' + param, '_blank');
     
       	 }
        }   
});



var btnOtherTruck = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "OTHERS TRUCK DETAILS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){    


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                var p4 = "&opt=" + encodeURIComponent(2);
                var param = (p1+p2+p3+p4);
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign&__format=xls' + param, '_blank');
    //    	 window.Excel.Workbook.Open("teste.xls");

}
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Truckwise_Despatch.rptdesign' + param, '_blank');
     
       	 }
        }   
});

function grid_tot(){

        var tdespwt = 0;
        var tdespval = 0;

         txttotSalesQty.setValue('');


        var Row= flxTruckTypeList.getStore().getCount();
        flxTruckTypeList.getSelectionModel().selectAll();
        var sel=flxTruckTypeList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.weight) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.weight);
              }
         }
         txttotSalesQty.setValue(tdespwt);



}

function grid_tot_TruckDetails(){
    

         txtInvSalesQty.setValue('');
        var tdespwt = 0;
        var tdespval = 0;

        var Row= flxInvoiceList.getStore().getCount();
        flxInvoiceList.getSelectionModel().selectAll();
        var sel=flxInvoiceList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.weight) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.weight);

              }
         }
         txtInvSalesQty.setValue(tdespwt);


}

function grid_tot_Trucktype(){
  
        var tdespwt = 0;
        var tdespval = 0;

         txtTruckSalesQty.setValue('');


        var Row= flxTruckList.getStore().getCount();
        flxTruckList.getSelectionModel().selectAll();
        var sel=flxTruckList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.weight) > 0)
              {
		      tdespwt =tdespwt+Number(sel[i].data.weight);

              }
         }
         txtTruckSalesQty.setValue(tdespwt);



}



var dgrecord = Ext.data.Record.create([]);



var flxTruckTypeList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 350,
    hidden:false,
    width: 265,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "TRUCK TYPE"    ,  dataIndex: 'truck',sortable:false,width:140,align:'left', menuDisabled: true },

        {header: "WEIGHT"    , dataIndex: 'weight',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadTruckTypeListDataStore,
    listeners:{	

            'cellclick': function (flxTruckTypeList, rowIndex, cellIndex, e) {
		var sm = flxTruckTypeList.getSelectionModel();
		var selrow = sm.getSelected();
                txtInvSalesQty.setValue('');



            trucktype = selrow.get('truck')
           lblDetail2.setText('');

            lblDetail1.setText("Detail for  -  : " + trucktype );
            lblDetail1.getEl().setStyle('color', 'red');
            lblDetail1.getEl().setStyle('font-size', '14px');
            lblDetail1.getEl().setStyle('font-weight', 'bold');     

	    loadTruckDetailDataStore.removeAll();
	    loadTruckListDataStore.removeAll();
	    loadTruckListDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadTruckList',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                trucktype : trucktype,  
		},
		scope:this,
		callback:function()
		{
                   grid_tot_Trucktype();
		}
	    });

     
    }
 }
});



var flxTruckList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 350,
    hidden:false,
    width: 265,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "TRUCK"    ,  dataIndex: 'truck',sortable:false,width:140,align:'left', menuDisabled: true },

        {header: "WEIGHT"    , dataIndex: 'weight',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadTruckListDataStore,
    listeners:{	

            'cellclick': function (flxTruckList, rowIndex, cellIndex, e) {
		var sm = flxTruckList.getSelectionModel();
		var selrow = sm.getSelected();
  
           lblDetail2.setText('');
            truck = selrow.get('truck')
            lblDetail1.setText("Detail for the : " + truck );
            lblDetail1.getEl().setStyle('color', 'red');
            lblDetail1.getEl().setStyle('font-size', '18px');
            lblDetail1.getEl().setStyle('font-weight', 'bold');     
            truckno = selrow.get('truck')

	    loadTruckDetailDataStore.removeAll();
	    loadTruckDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadTruckDetails',
		compcode : Gincompcode,
		finid    : GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                truckno  : truckno,  
		},
		scope:this,
		callback:function()
		{
                   grid_tot_TruckDetails();
		}
	    });

     
    }
 }
});


var flxInvoiceList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:250,
    y:30,
    height: 350,
    hidden:false,
    width: 650,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Customer "    ,  dataIndex: 'cust_ref',sortable:false,width:240,align:'left', menuDisabled: true},
        {header: "Invoice No."    , dataIndex: 'invh_invrefno',sortable:false,width:120,align:'center', menuDisabled: true},
        {header: "Inv Date"    , dataIndex: 'invh_date',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Inv Wt " , dataIndex: 'weight',sortable:false,width:70,align:'right', menuDisabled: true},
        {header: "Cust Place " , dataIndex: 'cust_city',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Delivery Place " , dataIndex: 'invh_delivery_city',sortable:false,width:100,align:'right', menuDisabled: true},

    ],
    store:loadTruckDetailDataStore,
    listeners:{	

            'cellclick': function (flxTruckTypeList, rowIndex, cellIndex, e) {
		var sm = flxTruckTypeList.getSelectionModel();
		var selrow = sm.getSelected();


     
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
				            width       : 300,
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
                             items: [flxTruckTypeList]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
			     y       : 60,
                             items: [flxTruckList]
                        },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 10,
                       y           : 420,
                       border      : false,
                       items: [txttotSalesQty]
                      },


                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 350,
                       y           : 420,
                       border      : false,
                       items: [txtTruckSalesQty]
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
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 600,
			     y       : 60,
                             items: [flxInvoiceList]
                        },


                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 805,
                       y           : 450,
                       border      : false,
                       items: [btnMillTruck]
                      },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 955,
                       y           : 450,
                       border      : false,
                       items: [btnOtherTruck]
                      },
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {

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
