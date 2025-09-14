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

var btnDatewiseAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "DATE WISE Consumption",
	width   : 120,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){    

//var excelfile =    *d:\rptDatewiseSales.xls*;
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&option=" + encodeURIComponent(2);

                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseConsumption.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseConsumption.rptdesign&__format=XLS' + param, '_blank');
}
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUDatewiseConsumption.rptdesign' + param, '_blank');
     
       	 }
        }   
});





var btnItemwiseAbstract = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Item Wise Consumption",
	width   : 120,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){    

//var excelfile =    *d:\rptDatewiseSales.xls*;
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&option=" + encodeURIComponent(2);

                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemwiseConsumption.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemwiseConsumption.rptdesign&__format=XLS' + param, '_blank');
}
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemwiseConsumption.rptdesign' + param, '_blank');
     
       	 }
        }   
});

   var printtype='PDF';

   var txttotIssueQty = new Ext.form.NumberField({
        fieldLabel  : 'Cons. Qty',
        id          : 'txttotIssueQty',
        name        : 'txttotIssueQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotIssueValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txttotIssueValue',
        name        : 'txttotIssueValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });




   var txtDayIssueQty = new Ext.form.NumberField({
        fieldLabel  : 'Consumption Qty',
        id          : 'txtDayIssueQty',
        name        : 'txtDayIssueQty',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtDayIssueValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtDayIssueValue',
        name        : 'txtDayIssueValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


function grid_tot(){

        var tissqty = 0;
        var tissval = 0;

         txttotIssueQty.setValue('');
         txttotIssueValue.setValue('');

        var Row= flxDateList.getStore().getCount();
        flxDateList.getSelectionModel().selectAll();
        var sel=flxDateList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.qty) > 0)
              {
		      tissqty =tissqty+Number(sel[i].data.qty);
		      tissval=tissval+Number(sel[i].data.value);
              }
         }
         txttotIssueQty.setValue(tissqty);
         txttotIssueValue.setValue(tissval);



}

function grid_tot_Date(){

        var tissqty = 0;
        var tissval = 0;

         txtDayIssueQty.setValue('');
         txtDayIssueValue.setValue('');

        var Row= flxDateConsumptionList.getStore().getCount();
        flxDateConsumptionList.getSelectionModel().selectAll();
        var sel=flxDateConsumptionList.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.qty) > 0)
              {
		      tissqty =tissqty+Number(sel[i].data.qty);
		      tissval=tissval+Number(sel[i].data.value);
              }
         }
         txtDayIssueQty.setValue(tissqty);
         txtDayIssueValue.setValue(tissval);



}
 var loadDateWiseConsumptionDataStore = new Ext.data.Store({
      id: 'loadDateWiseConsumptionDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDatewiseList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['issdate', 'issh_date', 'qty', 'value' ]),
    });


 var loadDayConsumptionDataStore = new Ext.data.Store({
      id: 'loadDayConsumptionDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDayConsumption"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['itmh_name', 'qty', 'value' ]),
    });



var dgrecord = Ext.data.Record.create([]);



var flxDateList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 350,
    hidden:false,
    width: 350,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: " DATE"    ,  dataIndex: 'issdate',sortable:false,width:110,align:'left', menuDisabled: true },
        {header: " DATE"    ,  dataIndex: 'issh_date',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "QTY"    , dataIndex: 'qty',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "VALUE" , dataIndex: 'value',sortable:false,width:120,align:'right', menuDisabled: true},

    ],
    store:loadDateWiseConsumptionDataStore,
    listeners:{	

            'cellclick': function (flxDateList, rowIndex, cellIndex, e) {
		var sm = flxDateList.getSelectionModel();
		var selrow = sm.getSelected();
                txtDayIssueQty.setValue('');
                txtDayIssueValue.setValue(selrow.get('')) 

     //      lblDetail2.setText('');

            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('issh_date'),"d-m-Y"));
       //     lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
  //          lblDetail1.getEl().setStyle('font-weight', 'bold');     

//    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

           loadDayConsumptionDataStore .removeAll();
	    loadDayConsumptionDataStore .removeAll();
	    loadDayConsumptionDataStore .load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadDayConsumption',
		compcode:Gincompcode,
                startdate: Ext.util.Format.date(selrow.get('issh_date'),"Y-m-d"), 
                enddate: Ext.util.Format.date(selrow.get('issh_date'),"Y-m-d"), 
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



var flxDateConsumptionList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 350,
    hidden:false,
    width: 750,
    id: 'my-grid',  

    columns:
    [ 	 	

        {header: " Item Name"    ,  dataIndex: 'itmh_name',sortable:false,width:250,align:'left', menuDisabled: true },
        {header: "QTY"    , dataIndex: 'qty',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "VALUE" , dataIndex: 'value',sortable:false,width:150,align:'right', menuDisabled: true},

    ],
    store:loadDayConsumptionDataStore,
    listeners:{	

            'cellclick': function (flxDateList, rowIndex, cellIndex, e) {
		var sm = flxDateList.getSelectionModel();
		var selrow = sm.getSelected();
                txtInvSalesQty.setValue('');
                txtInvSalesValue.setValue(selrow.get('')) 

//          	find_dates(selrow.get('cust_code'));
            repdate = selrow.get('invh_date')
           lblDetail2.setText('');

            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
            lblDetail1.getEl().setStyle('color', 'red');
            lblDetail1.getEl().setStyle('font-size', '18px');
            lblDetail1.getEl().setStyle('font-weight', 'bold');     

//    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

           loadInvoiceItemDataStore.removeAll();
	    loadInvoiceDataStore.removeAll();
	    loadInvoiceDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadInvoiceListDate',
		compcode:Gincompcode,
		finid:GinFinid,
                repdate: Ext.util.Format.date( selrow.get('invh_date'),"Y-m-d"),  
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
	loadDateWiseConsumptionDataStore.removeAll();
	loadDateWiseConsumptionDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseList',
                compcode:Gincompcode,
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
          
	loadDateWiseConsumptionDataStore.removeAll();
	loadDateWiseConsumptionDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDatewiseList',
                compcode:Gincompcode,
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
                  loadDateWiseConsumptionDataStore.removeAll();
                  loadDayConsumptionDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
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
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 180,
                             border  : false,
		             x       : 1125,
			     y       : 90,
                             items: [btnDatewiseAbstract]
                        },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 180,
                             border  : false,
		             x       : 1125,
			     y       : 190,
                             items: [btnItemwiseAbstract]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
                             width   : 400,
		             x       : -10,
			     y       : 60,
                             items: [flxDateList]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : true,
                              width   : 750,
		             x       : 350,
			     y       : 60,
                             items: [flxDateConsumptionList]
                        },

                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : -10,
                       y           : 420,
                       border      : false,
                       items: [txttotIssueQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 50,
                       width       : 400,
                       x           : 170,
                       y           : 420,
                       border      : false,
                       items: [txttotIssueValue]
                      },


                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 130,
                       width       : 400,
                       x           : 600,
                       y           : 420,
                       border      : false,
                       items: [txtDayIssueQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 870,
                       y           : 420,
                       border      : false,
                       items: [txtDayIssueValue]
                      },

               ]
             },
            ]
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
        title       : 'Consumption Details',
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
