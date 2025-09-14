Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var printtype='PDF';
   var yearfin  = localStorage.getItem('gstyear'); 


 var custcode = 0;
 var custname = 0;
 var partytype = 'A'
 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesReports.php',      // File to connect to
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



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsSalesReports.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSearch.getRawValue(),
		},
        });
}

var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
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
        height: 200,
        width: 420,
        x: 0,
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
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custname = selrow.get('cust_ref');

                  		flxPartySelected.getSelectionModel().selectAll();
			        var selrows = flxPartySelected.getSelectionModel().getCount();
			        var sel = flxPartySelected.getSelectionModel().getSelections();
				var stkcnt  = 0;
                                for (var k=0;k<selrows;k++) 
                                { 
                                    if (sel[k].data.cust_code == custcode)
                                    {
                                        stkcnt = stkcnt + 1;
                                    }
                                } 
                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Customer  Already Selected");
			        }
				else
				{

				   var RowCnt = flxPartySelected.getStore().getCount() + 1;  
                                   flxPartySelected.getStore().insert(
                                   flxPartySelected.getStore().getCount(),
                                    new dgrecord({
					  cust_code    : custcode,
					  cust_ref     : custname,
                                    })
                   		   );
                  		}
                        	flxPartySelected.getSelectionModel().clearSelections();
			}


		}
 
    
   }
   });


   var flxPartySelected = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 420,
        x: 0,
        y: 250,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Selected Customer List", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

         Ext.Msg.show({
             title: 'Customer',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Customer!',
             fn: function(btn){
               if (btn === 'yes'){
                  var sm = flxPartySelected.getSelectionModel();
                  var selrow = sm.getSelected();
                  flxPartySelected.getStore().remove(selrow);
                  flxPartySelected.getSelectionModel().selectAll();

               }
            }
         });

				}
 
    
   }
   });




 var loadgeneral = new Ext.data.Store({
      id: 'loadgeneral',
     
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadrepno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'seqno','repno'

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


 var loadCustomerListDatastore = new Ext.data.Store({
      id: 'loadCustomerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ViewGroup/ClsView.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'cust_group_name', 'cust_group_code'
 
      ]),
    });



var cmbRepresentative = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
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


var cmbGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Party Group',
        width           :  320,
        displayField    : 'cust_group_name', 
        valueField      : 'cust_group_code',
        hiddenName      : '',
        id              : 'cmbGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadCustomerListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
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

 var Rpttype="Daily Sales";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:800,
    height:300,
    x:0,
    y:0,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
//        rows : 16,
        id: 'optRpttype',

        items: [
		{boxLabel: 'Daily Sales', name: 'optRpttype', id:'optDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Daily Sales";

					}
				}
			}
		},
		{boxLabel: 'Partywise Sales - Sizewise', name: 'optRpttype', id:'optPS', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Partywise Sales-Sizewise";

					}
				}
			}
		},


		{boxLabel: 'Partywise Sales-BF & GSM (%)', name: 'optRpttype', id:'optBFGSM', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Partywise Sales - BF & GSM";

					}
				}
			}
		},
		{boxLabel: 'Partywise Sales - Invoice wise', name: 'optRpttype', id:'optSalDet', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Partywise Sales - Invoice wise";

					}
				}
			}
		},
		{boxLabel: 'Repwise Sales Details', name: 'optRpttype', id:'optSalRepwise', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repwise Sales Details";

					}
				}
			}
		},
		{boxLabel: 'Repwise Sales - Monthwise Details', name: 'optRpttype', id:'optSalRepMonthwise', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repwise Sales - Monthwise Details";

					}
				}
			}
		},
		{boxLabel: 'Rep-Customerwise Sales - Monthwise Details', name: 'optRpttype', id:'optSalRepCustMonthwise', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

						Rpttype="Rep-Customerwise Sales - Monthwise Details";

					}
				}
			}
		},
		{boxLabel: 'Rep-Partywise Sales Details', name: 'optRpttype', id:'optSalRepParty', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rep-Partywise Sales Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);
					}
				}
			}
		},
		{boxLabel: 'Rep-Party-Sizewise Sales Details', name: 'optRpttype', id:'optSalRepPartySize', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rep-Party-Sizewise Sales Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

					}
				}
			}
		},
		{boxLabel: 'Rep-BF-Party Sales Details', name: 'optRpttype', id:'optSalRepBFParty', inputValue: 22,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rep-BF-Party Sales Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

					}
				}
			}
		},
		{boxLabel: 'Rep-BF-Party-Sizewise Sales Details', name: 'optRpttype', id:'optSalRepBFPartySize', inputValue: 20,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Rep-BF-Party-Sizewise Sales Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

					}
				}
			}
		},
			{boxLabel: 'Rep-GSM-Party-Sizewise Sales Details', name: 'optRpttype', id:'optSalRepGSMPartySize', inputValue: 7,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							Rpttype="Rep-GSM-Party-Sizewise Sales Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

						}
					}
				}
			},
		{boxLabel: 'Dealer-Party-Sizewise Sales Details', name: 'optRpttype', id:'optSalDealerPartySize', inputValue: 8,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Dealer-Party-Sizewise Sales Details";

					}
				}
			}
		},
		{boxLabel: 'Repwise-Party Performance Details', name: 'optRpttype', id:'RepwisePerformance', inputValue: 9,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repwise Performance Details";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);

					}
				}
			}
		},
		{boxLabel: 'Repwise-PartyGroupwise Performance Details', name: 'optRpttype', id:'RepwisePerformance2', inputValue: 10,hidden:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repwise Performance Details2";
                                                Ext.getCmp('cmbRepresentative').setVisible(true);
                                                Ext.getCmp('cmbGroup').setVisible(false);
					}
				}
			}
		},

		{boxLabel: 'Groupwise-Partywise Performance Details', name: 'optRpttype', id:'RepwisePerformance3', inputValue: 11,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Repwise Performance Details3";
                                                Ext.getCmp('cmbRepresentative').setVisible(false);
                                                Ext.getCmp('cmbGroup').setVisible(true);


					}
				}
			}
		},

		{boxLabel: 'Area-Partywise Sales', name: 'optRpttype', id:'Areawise', inputValue: 12,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Area-Partywise Sales";

					}
				}
			}
		},
		{boxLabel: 'BF-GSMwise Sales', name: 'optRpttype', id:'optbfgsm', inputValue: 13,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="BF-GSMwise Sales";

					}
				}
			}
		},
		{boxLabel: 'BF-GSM-Payment Termswise Sales', name: 'optRpttype', id:'optbfgsmpayterms', inputValue: 13,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="BF-GSM-Payment Termswise Sales";

					}
				}
			}
		},
		{boxLabel: 'BF-GSM-Sizewise Sales', name: 'optRpttype', id:'optIS', inputValue: 14,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="BF-GSM-Sizewise Sales";

					}
				}
			}
		},
		{boxLabel: 'GSMwise Sales', name: 'optRpttype', id:'optgsm', inputValue: 15,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GSMwise Sales";

					}
				}
			}
		},

		{boxLabel: 'GSM - Customer wise Sales', name: 'optRpttype', id:'optgsmparty', inputValue: 16,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GSM - Customer wise Sales";

					}
				}
			}
		},

         	{boxLabel: 'RATE Master', name: 'optRpttype', id:'optrate', inputValue: 17,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                              Rpttype="RATE Master";
                                              Ext.getCmp('cmbRepresentative').setVisible(true);
					}
				}
			}
		},


         	{boxLabel: 'RATE Master With Entry No', name: 'optRpttype', id:'optrate2', inputValue: 18,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                              Rpttype="RATE Master With Entry No";
                                              Ext.getCmp('cmbRepresentative').setVisible(true);
					}
				}
			}
		},

         	{boxLabel: 'RATE Master - Bill Rate', name: 'optRpttype', id:'optrate3', inputValue: 19,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                              Rpttype="RATE Master - Bill Rate";
                                              Ext.getCmp('cmbRepresentative').setVisible(true);
					}
				}
			}
		},

         	{boxLabel: 'RATE Master - Areawise', name: 'optRpttype', id:'optrate4', inputValue: 19,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                              Rpttype="RATE Master - Areawise";
                                              Ext.getCmp('cmbRepresentative').setVisible(true);
					}
				}
			}
		},

         	{boxLabel: 'Month-BF-Range-For Furnish', name: 'optRpttype', id:'optfurnish', inputValue: 20,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                              Rpttype="furnish";
                                              Ext.getCmp('cmbRepresentative').setVisible(false);
					}
				}
			}
		},   
        ],
    }



    ]
});
 


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
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


var optPartytype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optPartytype',
        items: [
		{boxLabel: 'All customers', name: 'optPartytype', id:'AllParty', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    partytype="A";

					}
				}
			}
		},
		{boxLabel: 'Selective Customer', name: 'optPartytype', id:'Selective', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    partytype="S";

					}
				}
			}
		},
            
        ],
    }



    ]
});

var tabsalstmt = new Ext.TabPanel({
    	id          : 'SALSTMT',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 320,
	width       : 800,	
	x           : 0,
	y           : 0,
        border      : true,
    items       : [
	{
            xtype: 'panel',
            title: 'Sales Statement',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype
		]
	},
/*
	{
            xtype: 'panel',
            title: 'Sales Statement Consolidated Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		]
	},
	{
            xtype: 'panel',
            title: 'Export Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		]
	},
*/
	]
});

   
var RepGeneralFormPannel = new Ext.FormPanel({
	renderTo    : Ext.getBody(),
	xtype       : 'form',
	title       : 'General Reports',
	header      : false,
	width       : 825	,	
	bodyStyle   :{"background-color":"#F1F5EA"},
	height      : 650,
	x           : 0,
	y           : 0,
	frame       : false,
	id          : 'RepGeneralFormPannel',
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
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                    listeners:{
                      click: function () {

                            var rcode = 0;
                            var party_code = "";
                            flxPartySelected.getSelectionModel().selectAll();
			    var selp = flxPartySelected.getSelectionModel().getSelections();
			    for (var p=0; p<selp.length; p++)
			    {
				if (party_code === "")
				      party_code =  selp[p].data.cust_code;
				else
				      party_code = party_code + ","  + selp[p].data.cust_code;
			    }
			    if (party_code=="")
			    party_code='%';


//alert(Rpttype);


                       	var p5 = "";
                  	var p6 = "";
                        var p7 = "";
                        var p8 = "";
                        var p9 = "";



			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
			var param = (p1+p2+p3+p4) ;
//alert(printtype);
			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
                        else
                        if (Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d")  <  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") ) 
                        {
                          alert("Error in the Data Selection...Plese check..");
                        }
			else
           		{
 
                         if (Rpttype == "Daily Sales") {
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Partywise Sales - Invoice wise") {
		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Partywise Sales-Sizewise") {


		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartywise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartywise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartywise.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Partywise Sales - BF & GSM") {
		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyBFGSMwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyBFGSMwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesPartyBFGSMwise.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "BF-GSMwise Sales") {
		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSMwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSMwise_Excel.rptdesign&__format=xlsx&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSMwise.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "BF-GSM-Payment Termswise Sales") {
		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
alert(param);
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSM_PaymtTermswise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSM_PaymtTermswise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesBFGSM_PaymtTermswise.rptdesign&' + param, '_blank'); 

                          }


                         if (Rpttype == "GSMwise Sales") {
		            var p5 = "&partytype=" + encodeURIComponent(partytype);
			    var p6 = "&custcodelist=" + encodeURIComponent(party_code);
			    var param = (p1+p2+p3+p4+p5+p6) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMwise.rptdesign&' + param, '_blank'); 

                          }


                         if (Rpttype == "Rep-Partywise Sales Details") {
//annadurai

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p5 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Area-Partywise Sales") {
			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
			var param = (p1+p2+p3+p4) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptAreaPartywiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptAreaPartywiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptAreaPartywiseSales.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Dealer-Party-Sizewise Sales Details") {

          	            var p5 = "&repcode=" + encodeURIComponent(0);
                            var param = (p1+p2+p3+p4+p5) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDealerPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDealerPartySizewiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDealerPartySizewiseSales.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "Repwise Performance Details") {
              	        var p5 = "&repcode=" + encodeURIComponent(cmbRepresentative.getValue());
                  	var p6 = "&financeyear=" + encodeURIComponent(yearfin);
                        var p7 = "&partygrp=0";
                        var p8 = "&mmonth=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"n"));
                        var p9 = "&myear=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y"));
			var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "Repwise Performance Details2") {
                     	var p5 = "&repcode=" + encodeURIComponent(cmbRepresentative.getValue());
                  	var p6 = "&financeyear=" + encodeURIComponent(yearfin);
                        var p7 = "&partygrp=1"
                        var p8 = "&mmonth=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"n"));
                        var p9 = "&myear=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y"));
			var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance2.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance2.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance2.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Repwise Performance Details3") {
                  	var p5 = "&repcode=0";
                  	var p6 = "&financeyear=" + encodeURIComponent(yearfin);
                        var p7 = "&partygrp=" + encodeURIComponent(cmbGroup.getValue());
                        var p8 = "&partygrpname=" + encodeURIComponent(cmbGroup.getRawValue());
                        var p9 = "&mmonth=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"n"));
                        var p10 = "&myear=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y"));
			var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9+p10) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance3.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance3.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwisePerformance3.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Rep-BF-Party Sales Details") {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p5 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartywiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartywiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartywiseSales.rptdesign&' + param, '_blank'); 

                          }

                       if (Rpttype == "Rep-BF-Party-Sizewise Sales Details") {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p5 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartySizewiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepBFPartySizewiseSales.rptdesign&' + param, '_blank'); 

                          }
	

                         if (Rpttype == "Rep-GSM-Party-Sizewise Sales Details") {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p5 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepGSMPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepGSMPartySizewiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepGSMPartySizewiseSales.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "BF-GSM-Sizewise Sales") {
				var p5 = "&partytype=" + encodeURIComponent(partytype);
				var p6 = "&custcodelist=" + encodeURIComponent(party_code);
				var param = (p1+p2+p3+p4+p5+p6);
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesItemwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesItemwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesItemwise.rptdesign&' + param, '_blank'); 

                          }


                         if (Rpttype == "GSM - Customer wise Sales") {
				var p5 = "&partytype=" + encodeURIComponent(partytype);
				var p6 = "&custcodelist=" + encodeURIComponent(party_code);
				var param = (p1+p2+p3+p4+p5+p6);
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMPartywise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMPartywise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGSMPartywise.rptdesign&' + param, '_blank'); 

                          }


                         if (Rpttype == "Repwise Sales Details") {
          	            var p5 = "&repcode=" + encodeURIComponent(0);
                            var param = (p1+p2+p3+p4+p5) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepwiseSales.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "Rep-Partywise Sales Details") {

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartywiseSales.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "Rep-Party-Sizewise Sales Details") {

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p5 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5) ;

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartySizewiseSales.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartySizewiseSales.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepPartySizewiseSales.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "Repwise Sales - Monthwise Details") {

                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepMonthwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepMonthwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepMonthwise.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "Rep-Customerwise Sales - Monthwise Details") {
              	        var p5 = "&repcode=" + encodeURIComponent(cmbRepresentative.getValue());
                  	var p6 = "&financeyear=" + encodeURIComponent(yearfin);
                        var p7 = "&partygrp=0";
                        var p8 = "&mmonth=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"n"));
                        var p9 = "&myear=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y"));
			var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9) ;


                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise.rptdesign&' + param, '_blank'); 

                          }



                         if (Rpttype == "RATE Master" || (Rpttype == "RATE Master With Entry No" )) {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();


                            if (Rpttype == "RATE Master")
                               rateopt = 0;
                            else
                               rateopt = 1;   

          	            var p3 = "&repcode=" + encodeURIComponent(rcode);
          	            var p4 = "&rateopt=" + encodeURIComponent(rateopt);
                            var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetails.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetails.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetails.rptdesign&' + param, '_blank'); 

                          }

                         if (Rpttype == "RATE Master - Bill Rate"  ) {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

                               rateopt = 0;

         	            var p3 = "&repcode=" + encodeURIComponent(rcode);
          	            var p4 = "&rateopt=" + encodeURIComponent(rateopt);
                            var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsWithRateAddition.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsWithRateAddition.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsWithRateAddition.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "RATE Master - Areawise"  ) {
                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

                               rateopt = 0;

         	            var p3 = "&repcode=" + encodeURIComponent(rcode);
          	            var p4 = "&rateopt=" + encodeURIComponent(rateopt);
                            var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsAreaWise.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsAreaWise.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRateDetailsAreaWise.rptdesign&' + param, '_blank'); 

                          }
                         if (Rpttype == "furnish"  ) {
                            var param = (p1+p2+p3+p4) ;
                            if (printtype == "PDF") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesforFurnish.rptdesign&__format=pdf&' + param, '_blank'); 
                            else if (printtype == "XLS") 
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesforFurnish.rptdesign&__format=xls&' + param, '_blank'); 
                            else
			 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesforFurnish.rptdesign&' + param, '_blank'); 

                          }

	                }

		     }  
                   }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                    icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
RepgeneralWindow.hide();
                        }
                }]
        },
        items: [

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 260,
			y       : 10,
			items:[optprinttype],
		},


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 320,
			layout  : 'absolute',
			x       : 850,
			y       : 10,
			items:[optPartytype],
		},


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 350,
			width   : 830,
			layout  : 'absolute',
			x       : 30,
			y       : 70,

			items:[tabsalstmt],

		},
              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 150,
                width       : 500,
                x           : 350,
                y           : 330,
                border      : false,
                items: [cmbRepresentative]
               },

              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 500,
                x           : 350,
                y           : 320,
                border      : false,
                items: [cmbGroup]
               },


		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 500,
			x           : 95,
			y           : 430,
			layout  : 'absolute',
			height  : 70,
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
					x           : 250,
					y           : 0,
					border      : false,
					items: [dtpeddate]
				},
			]
		},

            { xtype   : 'fieldset',
                title   : 'Search',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 450,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 870,
                y       : 70,
                items:[
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 10,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtSearch]
                            },flxParty,flxPartySelected,


                ]
            },

        ],
    });
    
   
    var RepgeneralWindow = new Ext.Window({
	height      : 600,
        width       : 1330,
	x	    : 10,
        y           : 35,
        title       : 'Sales Statement Reports',
        items       : RepGeneralFormPannel,
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

                   Ext.getCmp('cmbGroup').setVisible(false);
                   Ext.getCmp('cmbRepresentative').setVisible(false);
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
