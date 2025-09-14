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



   var txtTotIssueValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Consumption Value',
        id          : 'txtTotIssueValue',
        name        : 'txtTotIssueValue',
        width       :  120,
	readOnly : true,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },

   });

var loadFeltWireListDatastore = new Ext.data.GroupingStore({
      id: 'loadFeltWireListDatastore',
       proxy: new Ext.data.HttpProxy({
                url: 'ClsFeltWire.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFeltWireList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'fw_mounteddate','fw_mountedshift', 'supervisor', 'shiftincharge','fw_section','fw_size', 'fw_wireno','fw_suplier', 
 'fw_lifestatus', 'fw_reason', 'fw_removeddate', 'fw_removedshift','fw_prod_garantee', 'fw_prod_yield'
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
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 

  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_chemical_consumption.rptdesign&__format=pdf&' + param, '_blank'); 
                    else if (printtype == "XLS") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_chemical_consumption.rptdesign&__format=XLS&' + param, '_blank'); 
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_chemical_consumption.rptdesign' + param, '_blank');	




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


    loadFeltWireListDatastore.removeAll();
    loadFeltWireListDatastore.load({
        url: 'ClsFeltWire.php',
	params: {
           task: 'loadFeltWireList',
	   finid    : GinFinid,
	   compcode : Gincompcode,
           fromdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
           todate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
	},
        callback:function()
        {
           var cnt=loadFeltWireListDatastore.getCount();
           grid_tot();    

	},

     });                    
}




function grid_tot(){
	totvalue  =0;

        var Row1= flxDetail.getStore().getCount();

        flxDetail.getSelectionModel().selectAll();
        var sele=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totvalue =Number(totvalue)+Number(sele[i].data.issvalue);


        }
        txtTotIssueValue.setRawValue(Ext.util.Format.number(totvalue,"0.00"));


}





 
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






            {header: "Mounted Date", dataIndex: 'fw_mounteddate',sortable:true,width:100,align:'center'},
            {header: "Shift", dataIndex: 'fw_mountedshift',sortable:true,width:100,align:'center'},
            {header: "Supervisor", dataIndex: 'supervisor',sortable:true,width:120,align:'center'},
            {header: "Shift Incharge", dataIndex: 'shiftincharge',sortable:true,width:120,align:'left'},
            {header: "Section", dataIndex: 'fw_section',sortable:true,width:100,align:'right'},
            {header: "Size", dataIndex: 'fw_size',sortable:true,width:100,align:'center'},
            {header: "Wire Number", dataIndex: 'fw_wireno',sortable:true,width:100,align:'right'},
            {header: "Supplier", dataIndex: 'fw_suplier',sortable:true,width:120,align:'right'},

            {header: "Life Status", dataIndex: 'fw_lifestatus',sortable:true,width:100,align:'right'},
            {header: "Reason", dataIndex: 'fw_reason',sortable:true,width:100,align:'center'},
            {header: "Removed Date", dataIndex: 'fw_removeddate',sortable:true,width:100,align:'right'},
            {header: "Removed Shift", dataIndex: 'fw_removedshift',sortable:true,width:120,align:'right'},
            {header: "Prodn Guarantee", dataIndex: 'fw_prod_garantee',sortable:true,width:100,align:'right'},
            {header: "Prodn Yield", dataIndex: 'fw_prod_yield',sortable:true,width:100,align:'center'},

        ],
        store: loadFeltWireListDatastore,

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


 var ConsumptionPanel = new Ext.TabPanel({
    id          : 'ConsumptionPanel',
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
        title: 'CONSUMPTION DETAILS',
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
		             labelWidth  : 200,
		             width       : 450,
		             border  : false,
			     x       : 850,
			     y       : 525,
		             items: [txtTotIssueValue]
		        },
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
        loadFeltWireListDatastore.removeAll(); 
	loadFeltWireListDatastore.load({
        	 url: 'ClsFeltWire.php', 
              	 params:
        	 {
                     task:"loadFeltWireList",
                     fincode:GinFinid,
		     compcode:Gincompcode,
               	 },
		  callback:function()
                 {
           
                 }
	});




    }  



    var ConsumptionWindow = new Ext.Window({
	height      : 630,
        width       : 1300,
	//x	    : 250,
        y           : 35,
        title       : '',
        items       : ConsumptionPanel,
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
    ConsumptionWindow.show();  
});
