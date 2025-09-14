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

var loadDCReceiptDatastore = new Ext.data.GroupingStore({
      id: 'loadDCReceiptDatastore',
       proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeliveryReceipts"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dcr_date', 'dcr_no','dcr_dcno','dcr_dcdate','cust_name','item_name','uom_short_name','dcr_recd_qty'
  ,'dcr_date2','dcr_dcdate2',
      ]
      ),
   });

    var btnView = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Datewise",
	width   : 120,
	height  : 35,
        id:'btnView',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){

		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                  var p3 ="&asondate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	
	            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	            var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p6 ="&opt="+encodeURIComponent(2);    	
 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepReturnablePendingList.rptdesign' + param, '_blank');	




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
        value: new Date()  ,
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              process_data();
           },
           keyup:function(){
              process_data();
            },
           change:function(){
              process_data();
            },
        }  	
 
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
        width : 110,
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              process_data();
           },
           keyup:function(){
              process_data();
            },
           change:function(){
              process_data();
            },
        }  	   
    });


function process_data()
{


    loadDCReceiptDatastore.removeAll();
    loadDCReceiptDatastore.load({
        url: '/SHVPM/Stores/ClsViewRep.php',
	params: {
           task: 'loadDeliveryReceipts',
	   finid    : GinFinid,
	   compcode : Gincompcode,
           fromdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
           todate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
	},
        callback:function()
        {
           var cnt=loadDCReceiptDatastore.getCount();
           grid_tot();    

	},

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


    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

    process_data();
                  
    
}


  function grid_tot(){


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
        height: 450,
        width: 1255,
         id: 'my-grid',     
        columns: [   


            {header: "Date", dataIndex: 'dcr_date2',sortable:true,width:110,align:'center'},
            {header: "Recpt No", dataIndex: 'dcr_no',sortable:true,width:100,align:'center'},
            {header: "DC No", dataIndex: 'dcr_dcno',sortable:true,width:100,align:'center'},
            {header: "DC Date", dataIndex: 'dcr_dcdate2',sortable:true,width:110,align:'center'},
            {header: "Party", dataIndex: 'cust_name',sortable:true,width:300,align:'left'},
            {header: "Item Name", dataIndex: 'item_name',sortable:true,width:250,align:'left'},
            {header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:100,align:'center'},
            {header: "Recd.Qty", dataIndex: 'dcr_recd_qty',sortable:true,width:100,align:'center'},
        ],
        store: loadDCReceiptDatastore,

        frame: true,

        listeners:{	
       'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                vouno = selrow.get('dcr_no');

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&vouno=" + encodeURIComponent(vouno);
		var param = (p1+p2+p3) ;    
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryReceipt.rptdesign&__format=pdf' + param);   


        
        }   
        }

   });


 var DeliveryReceiptPanel = new Ext.TabPanel({
    id          : 'DeliveryReceiptPanel',
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
        title: 'RECEIPT DETAILS',
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
		             items: [btnView]
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



    var DeliveryReceiptWindow = new Ext.Window({
	height      : 590,
        width       : 1300,
	//x	    : 250,
       // y           : 35,
        title       : '',
        items       : DeliveryReceiptPanel,
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
    DeliveryReceiptWindow.show();  
});
