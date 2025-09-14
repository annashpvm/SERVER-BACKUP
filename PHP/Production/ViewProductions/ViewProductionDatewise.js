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


var txtTotProdn = new Ext.form.NumberField({
	fieldLabel  : 'Total Production',
	id          : 'txtTotProdn',
	name        : 'txtTotProdn',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        readOnly  :  true,
    	enableKeyEvents: true,
     	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 12,
        decimalPrecision: 3,
        enableKeyEvents: true,
        listeners:{

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
          
	loadMCProductionListDataStore.removeAll();
	loadMCProductionListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadMCProductions',
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
['7','JULY'],['8','AUGUEST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
                  lblDetail1.setText('');
                  lblDetail2.setText('');

                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    



 var loadMCProductionListDataStore = new Ext.data.Store({
      id: 'loadMCProductionListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMCProductions"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['prd_date', 'proddate', 'gsm100', 'gsm101_120', 'gsm121_140', 'gsm141_150', 'gsm151_180', 'gsm181_200', 'gsm201_220', 'gsm221_240', 'gsm241_250', 'gsm251_270', 'gsm271_280', 'gsm281_300', 'gsm301_320', 'abovegsm_320', 'dayprodn' ]),
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
	loadMCProductionListDataStore.removeAll();
	loadMCProductionListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadMCProductions',
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


var btnDatewise = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "DATE WISE DETAILED",
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
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/RepGSMwiseMCProduction.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/RepGSMwiseMCProduction.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/RepGSMwiseMCProduction.rptdesign' + param, '_blank');
     
       	 }
        }   
});

function grid_tot(){

        var totprodn = 0;

         txtTotProdn.setValue('');


        var Row= flxProduction.getStore().getCount();
        flxProduction.getSelectionModel().selectAll();
        var sel=flxProduction.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.dayprodn) > 0)
              {
		  totprodn =totprodn+Number(sel[i].data.dayprodn);

              }
         }
         txtTotProdn.setValue(Ext.util.Format.number(totprodn,'0.000'));


}




var dgrecord = Ext.data.Record.create([]);



var flxProduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 400,
    hidden:false,
    width: 1350,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DATE"    ,  dataIndex: 'proddate',sortable:false,width:110,align:'left', menuDisabled: true },
        {header: "DATE"    ,  dataIndex: 'prd_date',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},

        {header: "<=100"    , dataIndex: 'gsm100',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "101-120" , dataIndex: 'gsm101_120',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "121-140" , dataIndex: 'gsm121_140',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "141-150" , dataIndex: 'gsm141_150',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "151-180" , dataIndex: 'gsm151_180',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "181-200" , dataIndex: 'gsm181_200',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "201-220" , dataIndex: 'gsm201_220',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "221-240" , dataIndex: 'gsm221_240',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "241-250" , dataIndex: 'gsm241_250',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "251-270" , dataIndex: 'gsm251_270',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "271-280" , dataIndex: 'gsm271_280',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "281-300" , dataIndex: 'gsm281_300',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "301-320" , dataIndex: 'gsm301_320',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: " > 320"  , dataIndex: 'abovegsm_320',sortable:false,width:77,align:'right', menuDisabled: true},
        {header: "TOTAL "  , dataIndex: 'dayprodn',sortable:false,width:77,align:'right', menuDisabled: true},

    ],
    store:loadMCProductionListDataStore,
    listeners:{	

            'cellclick': function (flxProduction, rowIndex, cellIndex, e) {
		var sm = flxProduction.getSelectionModel();
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
                       labelWidth  : 70,
                       width       : 400,
                       x           : 800,
                       y           : -12,
                       border      : false,
                       items: [btnDatewise]
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
                             items: [flxProduction]
                        },

 
			   { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 150,
				width       : 400,
				x           : 1000,
				y           : 462,
			    	border      : false,
				items: [txtTotProdn]
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
        find_dates(m1);



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Producton Details',
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
