Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var soopt = 0;

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date() ,
    	enableKeyEvents: true,
    	listeners : {
            change: function () {
                  process_data();
            },
            blur: function () {
                  process_data();
            },
        } 
 
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date() ,
    	enableKeyEvents: true,
    	listeners : {
            change: function () {
                  process_data();
            },
            blur: function () {
                  process_data();
            },
        }  
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


var repopt = 'Datewise';



 var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtQlySearch',
        name        : 'txtQlySearch',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  true,
	tabindex : 1,
        readOnly : false,
        store       : loadSOListDataStore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {


                  flxSONOList.getStore().filter('cust_name', txtSearch.getValue());  
            }
        }
    });


function process_data()
{
	loadSOListDataStore.removeAll();
	loadSOListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadSOHistory',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		},

       	scope:this,
		callback:function()
		{


		}
	    });
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
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    alert(monthstartdate);  
//    alert(monthenddate);  
          
     process_data(); 
     
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
    



 var loadSOListDataStore = new Ext.data.Store({
      id: 'loadSOListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOHistory"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['ordh_sodate', 'cust_name','ordh_sono', 'var_desc', 'shade_shortname', 'ordt_qty','ordt_fin_wt', 'pckh_date', 'pckh_invno', 'invwt', 'with1day', 'with1_4days', 'with5_7days', 'with8_10days', 'above10days' ]),
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
                 flxSONOList.show(); 

                 grid_tot_party();
       	 }
        }   
});


function grid_tot(){



        var prodwt = 0;
        var despwt = 0;
        var despval = 0;


}

function grid_tot_party(){
    

        var prodwt = 0;
        var despwt = 0;
        var despval = 0;
        var Row= flxSONOList.getStore().getCount();
        flxSONOList.getSelectionModel().selectAll();
        var sel=flxSONOList.getSelectionModel().getSelections();



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


}



var dgrecord = Ext.data.Record.create([]);



var flxSONOList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:40,
    height: 380,
    hidden:false,
    width: 1250,
    id: 'my-grid',  






    columns:
    [ 	 	
        {header: "SO DATE" , dataIndex: 'ordh_sodate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Customer" , dataIndex: 'cust_name',sortable:false,width:300,align:'left', menuDisabled: true},
        {header: "SO NO" , dataIndex: 'ordh_sono',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Quality"   , dataIndex: 'var_desc',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "SHADE"   , dataIndex: 'shade_shortname',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "SO QTY"   , dataIndex: 'ordt_qty',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "FIN WT"   , dataIndex: 'ordt_fin_wt',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "INV NOS"   , dataIndex: 'pckh_invno',sortable:false,width:120,align:'center', menuDisabled: true},
        {header: "INV WT"   , dataIndex: 'invwt',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "With in a Day"   , dataIndex: 'with1day',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "1-4 days Delay"   , dataIndex: 'with1_4days',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "5-7 days Delay"   , dataIndex: 'with5_7days',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "8-10 days Delay"   , dataIndex: 'with8_10days',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "Above Days"   , dataIndex: 'above10days',sortable:false,width:80,align:'right', menuDisabled: true},





    ],
    store:loadSOListDataStore,
    listeners:{	

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
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
				var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                              	var p5 = "&repopt=" + encodeURIComponent(3);
                              	var p6 = "&reelopt=" + encodeURIComponent('A');
				var param = (p1+p2+p3+p4+p5+p6) ;


//alert(repopt);


               	                if (printtype == "PDF") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderHistory.rptdesign&__format=pdf&' + param, '_blank');
                                else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderHistory.rptdesign&__format=XLS&' + param, '_blank');
                                else
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderHistory.rptdesign' + param, '_blank');
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
                x       : 10,
                y       : 10,

                items:[

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 50,
			y       : -15,
			items:[optprinttype],
	        },


	
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [cmbMonth]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 30,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 30,
                             items: [monthenddate]
                        },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 700,
			     y       : 30,
                             items: [txtSearch]
                        },		
	
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 60,
                             items: [flxSONOList]
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
        title       : 'SO Details',
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

        if (UserName == 'annait'  || UserName == 'suganyasal' || UserName == 'jeyasal'   )
        { 
            soopt = 1;

        }
        else   
        { 
            soopt = 0;
        }

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
