Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var fm = Ext.form; 
   var usertype = localStorage.getItem('ginuser');
   var gstFlag = "Add";
   var dealercode = 0;
   var repcode = 0;
   var custtype = 0;
   var taxcode = 0;
   var ins = "Y";
   var insper = 0;
   var gstadd ="true";
   var viewopt = 0;
   var editrow = 0;
   var gridedit = "false";
   var sonolist = "1";
   var repopt  = 1;
   var repprint = 10;

   var stockopt = 2;

   var printtype='PDF';
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var finstartdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate'); 


   var reelopt = 'A';   

   var lastmonthenddate = new Date();




 var custcode = 0;
 var custname = 0;


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDespatchPending.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });



var loadRepListDatastore = new Ext.data.Store({
      id: 'loadRepListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/TrnSalesDespTarget/ClsTrnSalesDespatchTarget.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRepresentative"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'repr_code', 'repr_name'
 
      ]),
    });



var cmbRepresentative = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  200,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbRepresentative',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRepListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                        
	}
	}
});


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsDespatchPending.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}

var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });
var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 160,
        width: 420,
        x: 750,
        y: 35,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custname = selrow.get('cust_ref');
                                txtCustomer.setRawValue(selrow.get('cust_ref'));

                FlxReel.getStore().removeAll();
		loadSONodatastore.load({
			url: 'ClsDespatchPending.php',
			params: {
			    task: 'loadSONo',
			    party: custcode,
			    compcode : Gincompcode,
		            finid    : GinFinid
			},
	 	        callback:function()
		        { 
		        }
                });

			}


		}
 
    
   }
   });


   var loadSONodatastore = new Ext.data.Store({
      id: 'loadSONodatastore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsDespatchPending.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono','ordh_sodate'
      ]),
    });



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDespatchPending.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code',type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });


var optReelOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width: 350,
    height:50,
    x:700,
    y:470,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optReelOption',
        items: [
           {boxLabel: 'All Reels', name: 'optReelOption', id:'optStockAllReels', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     reelopt = 'A';  
                    
                  }
               }
              }
            },
            {boxLabel: 'Full Reels', name: 'optReelOption', id:'optStockFullReels', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     reelopt = 'F';  
                
               }
              }
             }},

            {boxLabel: 'Bit Reels', name: 'optReelOption', id:'optStockBitReels', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     reelopt = 'B';                  
               }
              }
             }},            
            ]
             }
             ]
             });

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    width:300,
    height:50,
    x:10,
    y:10,

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

var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = FlxSONumber.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.ordh_sono);
}
}
}
});

/*

                           var compcode = "";
			    var sel = FlxSONumber.getSelectionModel().getSelections();
			    for (var t=0; t<sel.length; t++)
			    {
				if (compcode === "")
				      compcode =  sel[t].data.company_code;
				else
				      compcode = compcode + ","  + sel[t].data.company_code;
			    }
			    if (compcode=="")
			    compcode=GinCompcode;

*/
 var loadSalesSizestore = new Ext.data.Store({
      id: 'loadSalesSizestore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDespatchPending.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsizedetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'quality','bf','gsm','size','reelno','weight'
      ]),
    });

function getSONoDetails()
{

            sonolist = "1";
	    var sel = FlxSONumber .getSelectionModel().getSelections();
	    for (var t=0; t<sel.length; t++)
	    {
		if (sonolist === "")
		      sonolist =  sel[t].data.ordh_sono;
		else
		      sonolist = sonolist + ","  + sel[t].data.ordh_sono;
	    }
//            sonolist = sonolist+")";
    		loadSalesSizestore.removeAll();
			loadSalesSizestore.load({
			url: 'ClsDespatchPending.php',
			params: {
		    	task: 'loadsizedetails',
		    	party:custcode,
		    	compcode :Gincompcode,
		        finid :GinFinid,
		    	sono : sonolist,
			// FlxSONumber .getSelectionModel().clearSelections();
			},
		
		   	callback:function()
		 	{
//        		alert(loadSalesSizestore.getAt(0).get('quality'));
//                       alert(loadSalesSizestore.getAt(0).get('reelno'));

		        }    
		   });

}

var fm1 = Ext.form;
var FlxSONumber = new Ext.grid.EditorGridPanel({
    frame: false,
    id : FlxSONumber,
    hideHeaders : false,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 300,
    width: 200,
    x: 430,
    y: 90,
    selModel: sm1,
    columns: [sm1,
        {header: "SO NO", dataIndex: 'ordh_sono',sortable:true,width:70,align:'left',hidden:false}

    ],
    store   : loadSONodatastore,
	  listeners:{
                click : function() {
                  getSONoDetails();
                },  
                'cellclick' : function (flxDesc, rowIndex, cellIndex, e) {
                                        //cmbSize.reset();

//					alert('hello');
                     getSONoDetails();
				   }
		     }
	
});  

var dtpstdate = new Ext.form.DateField({
    fieldLabel : 'From',
    id         : 'dtpstdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var dtpeddate = new Ext.form.DateField({
    fieldLabel : 'To',
    id         : 'dtpeddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var txtStockDays = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtStockDays',
        name        : 'txtStockDays',
        width       :  40,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });


var dtpasondate = new Ext.form.DateField({
    fieldLabel : 'As On Date',
    id         : 'dtpasondate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){
// alert("Hai");

        var dt_invoice = dtpasondate.getValue() ;

//alert(dt_invoice.getFullYear());
//alert(dt_invoice.getMonth());
//alert(dt_invoice.getDate());

      //  var dt_ason =  dt_invoice.getDate() - Ext.util.Format.date(dtpasondate.getValue(),"d") ;
       lastmonthenddate = new Date(dt_invoice.getFullYear(), dt_invoice.getMonth(), -0);

//alert(lastmonthenddate);

            }
    }
});

var btnPrint = new Ext.Button({
    style   : 'text-align:center;',
    text    : "	View",
    width   : 80,
    height  : 40,
    x       : 500,
    y       : 430,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   tabindex : 1,
   listeners:{
       click: function(){


//alert(repprint);


                if (repopt == 1  && custcode == 0)
                {
                    alert("Select Customer");
                    Ext.getCmp('cmbCustomer').focus(false, 200);
                }
                else  
                { 


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&sono=" + String(encodeURIComponent(sonolist));
		var p4 = "&opt=" + encodeURIComponent(repopt);
		var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p7 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
                var p8 = "&repprint=" + encodeURIComponent(repprint);
                var p9 = "&stockopt=" + encodeURIComponent(stockopt);
                var p10 = "&agedate=" + encodeURIComponent(txtStockDays.getValue());
                var p11 = "&reelopt=" + encodeURIComponent(reelopt);
                var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11) ;

                if (repprint == 4 )
                {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
                var p4 = "&lastmonthdate=" + encodeURIComponent(Ext.util.Format.date(lastmonthenddate,"Y-m-d"));
		var p5 = "&prtopt=" + encodeURIComponent('A');
            	var p6 = "&reelopt=" + encodeURIComponent(reelopt);
                var param = (p1+p2+p3+p4+p5+p6) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingAgewise.rptdesign&__format=pdf&' + param, '_blank');

                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingAgewise.rptdesign&__format=XLS&' + param, '_blank');

                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingAgewise.rptdesign' + param, '_blank');
                }

                else if (repprint == 13 )
                {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
                var p4 = "&lastmonthdate=" + encodeURIComponent(Ext.util.Format.date(lastmonthenddate,"Y-m-d"));
		var p5 = "&prtopt=" + encodeURIComponent('A');
            	var p6 = "&reelopt=" + encodeURIComponent(reelopt);
                var param = (p1+p2+p3+p4+p5+p6) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Rep_Agewise.rptdesign&__format=pdf&' + param, '_blank');

                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Rep_Agewise.rptdesign&__format=XLS&' + param, '_blank');

                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Rep_Agewise.rptdesign' + param, '_blank');
                }


                else if (repprint == 14 )
                {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);
                var param = (p1+p2+p3+p4+p5+p6) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract_Agewise.rptdesign&__format=pdf&' + param, '_blank');

                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract_Agewise.rptdesign&__format=XLS&' + param, '_blank');

                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract_Agewise.rptdesign' + param, '_blank');
                }


                else if (repprint == 15 )
                {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);
                var param = (p1+p2+p3+p4+p5+p6) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingOnly_Areawise_Abstract_Agewise_.rptdesign&__format=pdf&' + param, '_blank');

                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingOnly_Areawise_Abstract_Agewise_.rptdesign&__format=XLS&' + param, '_blank');

                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pendingOnly_Areawise_Abstract_Agewise_.rptdesign' + param, '_blank');
                }
                else if (repprint == 5 )
                {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
            	var p4 = "&reelopt=" + encodeURIComponent(reelopt);
                var param = (p1+p2+p3+p4) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewise.rptdesign&__format=XLS&' + param, '_blank');

              else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewise.rptdesign' + param, '_blank');
                }
                else if (repprint == 6 )
                {


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
            	var p4 = "&reelopt=" + encodeURIComponent(reelopt);
                var param = (p1+p2+p3+p4) ;

//alert(param);
                if (printtype == "PDF")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewiseGSMwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewiseGSMwise.rptdesign&__format=XLS&' + param, '_blank');
              else
              
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_GodownStockAgewiseGSMwise.rptdesign' + param, '_blank');
                }

                else if (repprint == 8 )
                { 

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);
                var param = (p1+p2+p3+p4+p5+p6) ;


                if (printtype == "PDF")
    	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise.rptdesign&__format=XLS&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise.rptdesign' + param, '_blank');
                } 
                else if (repprint == 12 )
                { 

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);
                var param = (p1+p2+p3+p4+p5+p6) ;


                if (printtype == "PDF")
    	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract.rptdesign&__format=XLS&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Areawise_Abstract.rptdesign' + param, '_blank');
                } 
                else if (repprint == 10 )
                { 

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);
                var param = (p1+p2+p3+p4+p5+p6) ;


                if (printtype == "PDF")
    	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Area_ReelNowise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Area_ReelNowise.rptdesign&__format=XLS&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Area_ReelNowise.rptdesign' + param, '_blank');
                } 
                else if (repprint == 9 )
                { 

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
		var p5 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(dtpasondate.getValue(),"Y-m-d"));
	        var p6 = "&dateopt=" + encodeURIComponent(dateoption);

                    if (cmbRepresentative.getRawValue() == '')
                        rcode = 0;
                    else
                        rcode =  cmbRepresentative.getValue();

  	            var p7 = "&repcode=" + encodeURIComponent(rcode);
                    var param = (p1+p2+p3+p4+p5+p6+p7) ;




                if (printtype == "PDF")
    	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Repwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS")
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Repwise.rptdesign&__format=XLS&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending_Repwise.rptdesign' + param, '_blank');
                } 
                else
                 {
                if (printtype == "PDF")
{

  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending.rptdesign&__format=pdf&' + param, '_blank');
}
                else if (printtype == "XLS")
{

  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending.rptdesign&__format=XLS&' + param, '_blank');
}
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_despatch_pending.rptdesign' + param, '_blank');
                }



                }

       }
   }
});
 

var fm2 = Ext.form;
var FlxReel = new Ext.grid.EditorGridPanel({
    frame: false,
   sm: new Ext.grid.RowSelectionModel(),
   // id : FlxReel,
   // hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
  //  editable : true,
    height: 260,
    width: 580,
    x: 650,
    y: 200,
    
    columns: [
        {header: "Quality", dataIndex: 'quality',sortable:true,width:150,align:'left', menuDisabled: true},
	{header: "BF  ",    dataIndex: 'bf',     sortable:true,width:40,align:'left', menuDisabled: true},
	{header: "GSM",     dataIndex: 'gsm',    sortable:true,width:60,align:'left', menuDisabled: true},
	{header: "Size",    dataIndex: 'size',   sortable:true,width:120,align:'left', menuDisabled: true},
	{header: "Reel No", dataIndex: 'reelno', sortable:true,width:100,align:'left', menuDisabled: true},
	{header: "Weight",  dataIndex: 'weight', sortable:true,width:80,align:'left', menuDisabled: true},
	
    ],
    store : loadSalesSizestore,
});  
/*
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 100,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {

                FlxReel.getStore().removeAll();
		loadSONodatastore.load({
			url: 'ClsDespatchPending.php',
			params: {
			    task: 'loadSONo',
			    party:cmbCustomer.getValue(),
			    compcode : Gincompcode,
		            finid    : GinFinid
			},
	 	        callback:function()
		        { 
		        }
                });
	   }
       }
});

*/

var optselective = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:50,
    x:320,
    y:10,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optselective',
        items: [
            {boxLabel: 'Selective Customer', name: 'optselective', id:'optSelective', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repopt  = 1;
        //             Ext.getCmp('cmbCustomer').setDisabled(false);       
                    
                  }
               }
              }
            },
            {boxLabel: 'All Customer', name: 'optselective', id:'optAll', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     repopt  = 2;
  //                    Ext.getCmp('cmbCustomer').setDisabled(true);       
                
               }
              }
             }},
              
            ]
             }
             ]
             });



var dateoption = 1;

var optDateOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:50,
    x:10,
    y:80,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optDateOption',
        items: [
            {boxLabel: 'As on Date', name: 'optDateOption', id:'optAsonDate', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     dateoption = 1;
                     Ext.getCmp('fromtodate').hide();
                     Ext.getCmp('asondate').show();   
                    
                  }
               }
              }
            },
            {boxLabel: 'For the Period', name: 'optDateOption', id:'optPeriod', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     dateoption = 2;
                     Ext.getCmp('fromtodate').show();
                     Ext.getCmp('asondate').hide();    
                
               }
              }
             }},
              
            ]
             }
             ]
             });




var optStockOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:50,
    id   : 'stkid' ,
    x:300,
    y:470,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optStockOption',
        items: [
            {boxLabel: 'All', name: 'optStockOption', id:'optStockAll', inputValue: 1,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     stockopt  = 1;
                    
                  }
               }
              }
            },
            {boxLabel: 'I', name: 'optStockOption', id:'optStock1', inputValue: 2,checked:true, 
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stockopt  = 2;
                
               }
              }
             }},

            {boxLabel: 'II', name: 'optStockOption', id:'optStock2', inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stockopt  = 3;
                
               }
              }
             }},              
            ]
             }
             ]
             });

var optRepopt = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',

    layout : 'hbox',
  //  header : 'Select',
    width:400,
    height:280,
    x:20,
    y:130,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        items: [
            {boxLabel: 'Despatch Pending New', name: 'optRepopt', id:'optRepopt11', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 10;
//                     Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            },
            {boxLabel: 'Stock Pending As on Date', name: 'optRepopt', id:'optRepopt1', inputValue: 1,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 1;
//                     Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            },
            {boxLabel: 'Stock Pending For the Period', name: 'optRepopt', id:'optRepopt2', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     repprint  = 2;
//                     Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();

                
               }
              }
             }},

            {boxLabel: 'Stock Pending As on Date - Morethen ?? Days Stock', name: 'optRepopt', id:'optRepopt4', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 3;
//                     Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            },

            {boxLabel: 'Agewise Despatch pending ', name: 'optRepopt', id:'optRepopt5', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 4;
//                     Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            }, 

            {boxLabel: 'Agewise Godown Stock', name: 'optRepopt', id:'optRepopt6', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 5;
//                     Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            },    

            {boxLabel: 'Agewise Godown Stock - GSM WISE', name: 'optRepopt', id:'optRepopt7', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 6;
  //                   Ext.getCmp('fromtodate').hide();
//                     Ext.getCmp('asondate').show();
                    
                  }
               }
              }
            },    
             
            {boxLabel: 'Areawise Despatch Pending(Abstract)', name: 'optRepopt', id:'optRepopt12', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 12;
                       Ext.getCmp('optselective').setValue(2);  

  //                   Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            },   

            {boxLabel: 'Areawise Despatch Pending(Agewise)', name: 'optRepopt', id:'optRepopt14', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 14;
                       Ext.getCmp('optselective').setValue(2);  

  //                   Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            }, 
/*
             {boxLabel: 'Areawise Despatch Pending(Agewise) - Exculding Prodn Pending', name: 'optRepopt', id:'optRepopt15', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 15;
                       Ext.getCmp('optselective').setValue(2);  

  //                   Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            }, 
*/
            {boxLabel: 'Areawise Despatch Pending', name: 'optRepopt', id:'optRepopt8', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 8;
                       Ext.getCmp('optselective').setValue(2);  

  //                   Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            },  
            {boxLabel: 'REPwise Despatch Pending', name: 'optRepopt', id:'optRepopt9', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 9;
//                     Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            }, 

            {boxLabel: 'REPwise - Agewise Despatch Pending', name: 'optRepopt', id:'optRepopt13', inputValue: 1, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     repprint  = 13;
//                     Ext.getCmp('fromtodate').show();
//                     Ext.getCmp('asondate').hide();
                    
                  }
               }
              }
            }, 
            ]
             }
             ]
             });

var RepDespPendingPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PRODUCTION ENTRY',
        header      : false,
        width       : 1340,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 700,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepDespPendingPanel',
        method      : 'POST',
        layout      : 'absolute',
        items       : [     
		    { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 550,
		        width   : 1280,
			//style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
/*
				  { 
				       xtype       : 'fieldset',
				       title       : '',
				       labelWidth  : 80,
				       width       : 450,
				       x           : 700,
				       y           : 100,
				       border      : false,
				       items: [cmbCustomer]
				   },

*/


              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 150,
                width       : 500,
                x           : 340,
                y           : 460,
                border      : false,
                items: [cmbRepresentative]
               },


                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 700,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtCustomer]
                            },flxParty,

 FlxSONumber,FlxReel,btnPrint,optRepopt,optprinttype,optselective,optStockOption,optDateOption,
                                    optReelOption,
				  { 
				       xtype       : 'fieldset',
				       title       : '',
				       labelWidth  : 1,
				       width       : 90,
				       x           : 335,
				       y           : 205,
				       border      : false,
				       items: [txtStockDays]
				   },
				   { 
					xtype       : 'fieldset',
					title       : '',
                                        id          : 'fromtodate',
					labelWidth  : 50,
					width       : 300,
					x           : 40,
					y           : 420,
					layout  : 'absolute',
					height  : 100,
					style:{ border:'1px solid red'},
					border      : false,
					items: [
						{ 
						   xtype       : 'fieldset',
						   title       : '',
						   labelWidth  : 50,
					       	   width       : 200,
					           x           : 0,
					           y           : 0,
					           border      : false,
						   items: [dtpstdate]
						},
						{ 
					            xtype       : 'fieldset',
						    title       : '',
					            labelWidth  : 50,
						    width       : 200,
						    x           : 0,
						    y           : 40,
					            border      : false,
						    items: [dtpeddate]
						},
					]
					},

				   { 
					xtype       : 'fieldset',
					title       : '',
                                        id          : 'asondate',
					labelWidth  : 50,
					width       : 300,
					x           : 40,
					y           : 420,
					layout  : 'absolute',
					height  : 100,
					style:{ border:'1px solid red'},
					border      : false,
					items: [
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 80,
							width       : 250,
							x           : 0,
							y           : 20,
							border      : false,
							items: [dtpasondate]
						},

					]
					},

                        ],
                    }
       ],     
});


function RefreshData()
{
txtStockDays.setValue(0);

               dtpstdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 


                Ext.getCmp('fromtodate').hide();

		loadAllCustomerStore.load({
                url: 'ClsDespatchPending.php',
                params: {
                    task: 'loadcustomer',
		    compcode:Gincompcode

                }
            });

}

    var TrnDespatchPending = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 25,
        title       : 'DESPATCH PENDING',
        items       : RepDespPendingPanel,
        layout      : 'fit',
        closable    : true,
	bodyStyle   :{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                    RefreshData();	   	
        var dt_invoice = dtpasondate.getValue() ;

       lastmonthenddate = new Date(dt_invoice.getFullYear(), dt_invoice.getMonth(), -0);

        if (UserName == 'annait' || UserName == 'vinothini' || UserName == 'suganyasal' || UserName == 'jeyasal'   )
        { 
            Ext.getCmp('stkid').setVisible(true);

        }
        else   
        { 
            Ext.getCmp('stkid').setVisible(false);
        }

	   	}

		}
    });
    TrnDespatchPending.show(); 


});
