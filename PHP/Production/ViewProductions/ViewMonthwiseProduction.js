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
    var monthstartdate = new Ext.form.DateField({
        id: 'monthfirstdate',
        format: 'Y-m-d',
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
        id: 'monthenddate',
        format: 'Y-m-d',
        value: new Date()   
    });

    var finddate = new Ext.form.DateField({
        id: 'finddate',
        format: 'Y-m-d',
        value: new Date()   
    });


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
});

 var loadMonthwiseProductionDatastore = new Ext.data.Store({
      id: 'loadMonthwiseProductionDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMCProductions_Monthwise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'mcprodwt' 


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
        fieldLabel  : 'Sales Value',
        id          : 'txttotSalesValue',
        name        : 'txttotSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
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
        fieldLabel  : 'Sales Value',
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
	y       : 460,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
                 flxParty.show(); 

                lblDetail.setText("Detail for the Month of  : " + repmonth );
                 grid_tot_party();
       	 }
        }   
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

                   var fdate  = Ext.util.Format.date(monthenddate.getValue(),"Y-m-d");
                    if (finenddate >  fdate )
                       finddate = monthenddate.getValue();
                    else
                       finddate = finenddate;



		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
                    var p2 = "&fincode=" + encodeURIComponent(GinFinid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));	
	            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(finddate,"Y-m-d"));
                    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Monthwise_MachineProduction.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Monthwise_MachineProduction.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_Monthwise_MachineProduction.rptdesign' + param, '_blank');	
            }
       }

    });


    var btnViewMonthPartyBreakup = new Ext.Button({
        style: 'text-align:center;',
        text: "All Partywise Abstract ",
        width: 70,
        id: 'btnViewMonthPartyBreakup',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
                    var p2 = "&fincode=" + encodeURIComponent(GinFinid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate,"Y-m-  d"));	
	            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate,"Y-m-  d"));	
                    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesMonth_Partywise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesMonth_Partywise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesMonth_Partywise.rptdesign' + param, '_blank');	
            }
       }

    });



    var btnViewMonthPartyBillwiseBreakup = new Ext.Button({
        style: 'text-align:center;',
        text: "All Party Bill wise Print",
        width: 70,
        id: 'btnViewMonthPartyBillwiseBreakup',

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
                    var p5 = "&partytype=" + encodeURIComponent('A');
                    var p6 = "&custcodelist=" + encodeURIComponent(0);


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


  var btnViewPartyBillwise = new Ext.Button({
        style: 'text-align:center;',
        text: " Bill wise Print",
        width: 70,
        id: 'btnViewMonthPartyBillwiseBreakup',

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

function grid_tot(){

        var prodwt = 0;
        var despwt = 0;
        var despval = 0;
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.mcprodn) > 0)
              {
		      prodwt=Number(prodwt)+Number(sel[i].data.mcprodn);

              }
         }
         txttotProdQty.setValue(prodwt);


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



var dgrecord = Ext.data.Record.create([]);

var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 350,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "M/C Prodn" , dataIndex: 'mcprodn',sortable:false,width:110,align:'right', menuDisabled: true},

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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

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
                height  : 520,
                width   : 1280,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 5,

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
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 40,
                             items: [flxMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 10,
			     y       : 410,
                             items: [txttotProdQty]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 1000,
			     y       : 410,
                             items: [monthenddate]
                        },



        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 400,
            x           : 350,
            y           : 450,
            border      : false,
            items : [btnViewMonthBreakup]
        },


		
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {
        Month_Add_inGrid();

	loadMonthwiseProductionDatastore.removeAll();
	loadMonthwiseProductionDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadMCProductions_Monthwise',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                enddate: Ext.util.Format.date(finenddate,"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadMonthwiseProductionDatastore.getCount();
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadMonthwiseProductionDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  
             		       for (var i=0;i<selrows;i++){               
                     		    if (sel[i].data.rmonth === loadMonthwiseProductionDatastore.getAt(j).get('rmonth'))
                  		    {
	                                sel[i].set('mcprodn', Ext.util.Format.number(loadMonthwiseProductionDatastore.getAt(j).get('mcprodwt'),'0.000'));
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
        y           : 20,
        title       : 'M/C Production Details',
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
