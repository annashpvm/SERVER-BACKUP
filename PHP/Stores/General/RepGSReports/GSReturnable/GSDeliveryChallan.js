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

var loadDCListLedgerDatastore = new Ext.data.GroupingStore({
      id: 'loadDCListLedgerDatastore',
       proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeliveryChallan"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'department_name','dc_date','dch_no','cust_name','item_name','uom_short_name','dct_issqty',
'dct_recqty','pendqty','dct_rate','dch_return_days','duedate2','oddays','dch_date','dct_spec','dct_purpose'
/*
      {name:'grp_name',type:'string'},
      {name:'subgrp',type:'int'},
      {name:'led_name',type:'string'},
      {name:'debit',type:'float'},
      {name:'credit',type:'float'},  
      {name:'acctran_led_code',type:'int'},
*/
      ]
      ),
      sortInfo: {field: 'dch_date', direction: 'ASC'},
            groupField: 'department_name',
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
    loadDCListLedgerDatastore.removeAll();
    loadDCListLedgerDatastore.load({
        url: '/SHVPM/Stores/ClsViewRep.php',
	params: {
           task: 'loadDeliveryChallan',
	   finid:GinFinid,
	   compcode:Gincompcode,
           asondate : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),  				
           fromdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
           todate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
           repopt   : 2,  					
	},
        callback:function()
        {

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

            {header: "Department", dataIndex: 'department_name',sortable:true,width:100,align:'left'},
            {header: "Date", dataIndex: 'dc_date',sortable:true,width:100,align:'center'},
            {header: "DCNo", dataIndex: 'dch_no',sortable:true,width:80,align:'center'},
            {header: "Party", dataIndex: 'cust_name',sortable:true,width:200,align:'left'},
            {header: "Item Name", dataIndex: 'item_name',sortable:true,width:150,align:'left'},
            {header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:80,align:'center'},
	    {header: "Iss Qty", dataIndex: 'dct_issqty',sortable:true,width:90,align:'right'},
	    {header: "Recd Qty", dataIndex: 'dct_recqty',sortable:true,width:90,align:'right'},
	    {header: "Pend Qty", dataIndex: 'pendqty',sortable:true,width:90,align:'right'},
	    {header: "Rate", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
//	    {header: "Value", dataIndex: 'dct_rate',sortable:true,width:80,align:'right'},
	    {header: "ADays", dataIndex: 'dch_return_days',sortable:true,width:80,align:'right'},
	    {header: "Due Date", dataIndex: 'duedate2',sortable:true,width:90,align:'right'},
	    {header: "OD DAYS", dataIndex: 'oddays',sortable:true,width:75,align:'right'},
	    {header: "Specifications ", dataIndex: 'dct_spec',sortable:true,width:200,align:'right'},
	    {header: "Purpose", dataIndex: 'dct_purpose',sortable:true,width:200,align:'right'},

        ],
        store: loadDCListLedgerDatastore,

  

 
        frame: true,

        listeners:{	
       'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                dcno = selrow.get('dch_no');

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&dctype=" + encodeURIComponent('R');
                var p4 = "&dcno=" + encodeURIComponent(dcno); 
		var param = (p1+p2+p3+p4) ;                        
                if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign' + param, '_blank');     


        
        }   
        }

   });


 var DeliveryChallanPanel = new Ext.TabPanel({
    id          : 'DeliveryChallanPanel',
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
        title: 'DELIVERY CHALLAN DETAILS',
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



    var DeliveryChallanWindow = new Ext.Window({
	height      : 590,
        width       : 1300,
	//x	    : 250,
       // y           : 35,
        title       : '',
        items       : DeliveryChallanPanel,
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
    DeliveryChallanWindow.show();  
});
