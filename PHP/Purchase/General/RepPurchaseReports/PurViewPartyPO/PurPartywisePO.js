Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 



  var printtype='PDF';

 var supcode = 0;
 var supname = 0;
  var purheadname = '';

 var loadPartyMonthPOData = new Ext.data.Store({
      id: 'loadPartyMonthPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyPODetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'phd_pono', 'phd_podate', 'ptr_ind_no', 'cust_ref','item_name', 'ptr_ord_qty'

      ]),
    })



 var loadMonthWisePOData = new Ext.data.Store({
      id: 'loadMonthWisePOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyMonthPOs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[      'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name'
 

      ]),
    });



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplier.getRawValue(),
		},
        });
}

var txtSupplier = new Ext.form.TextField({
        fieldLabel  : 'Supplier',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplier.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
             },

	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
                  if (txtSupplier.getRawValue() != '')
                     PartySearch();
            }
         }  
    });


function flxparty_click()
{
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('cust_code');
				supname = selrow.get('cust_name');
                                txtSupplier.setRawValue(selrow.get('cust_name'));
 
    	    loadMonthWisePOData.removeAll();
	    loadMonthWisePOData.load({
		url: '/SHVPM/Stores/General/ClsPurRep.php',
		params: {
	    	task: 'loadPartyMonthPOs',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                party : supcode,  
		},
		scope:this,
		callback:function()
		{
	            var cnt=loadMonthWisePOData.getCount();
		    if(cnt>0)
                    {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
		       var sel = flxMonth.getSelectionModel().getSelections();

		       for(var j=0; j<cnt; j++)
		       {  
   		       for (var i=0;i<selrows;i++){    
	 
	    		    if (sel[i].data.rmonth === loadMonthWisePOData.getAt(j).get('rmonth'))
	      		    {
				sel[i].set('nos', Ext.util.Format.number(loadMonthWisePOData.getAt(j).get('nos'),'0'));
				sel[i].set('purvalue', Ext.util.Format.number(loadMonthWisePOData.getAt(j).get('purvalue'),'0.00'));

			    }
			}
			}
//                       grid_tot();

		   }  
                   }
	    }); 


		
                           }

}


var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 125,
        width: 350,
//        header : false,
        x: 115,
        y: 22,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,
        listeners:{
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flxparty_click();
                        }
                     });
             },	
           'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                flxparty_click();
 	    }
        }

   });













 var loadPOData = new Ext.data.Store({
      id: 'loadPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDeptMonthPOs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadpreprint = new Ext.data.Store({
      id: 'loadpreprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
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


var optprinttype = new Ext.form.FieldSet({
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



 function process_indent()
{
         Month_Add_inGrid();

     
			    loadIndentData.removeAll();
			    loadIndentData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadDeptMonthIndents',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                                deptcode : cmbDepartment.getValue(),  
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadIndentData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadIndentData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadIndentData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadIndentData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
				}
			    });
}

function process_po()
{
         Month_Add_inGrid();	


			    loadPOData.removeAll();
			    loadPOData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadDeptMonthPOs',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                                deptcode : cmbDepartment.getValue(),   
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadPOData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadPOData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadPOData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadPOData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
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

    rmon = ("0"+mmon).slice(-2);
    monthstartdate = yr+"-"+rmon+"-01";
    monthenddate = yr+"-"+rmon+"-"+mdays;


    	    loadPartyMonthPOData.removeAll();
	    loadPartyMonthPOData.load({
		url: '/SHVPM/Stores/General/ClsPurRep.php',
		params: {
	    	task: 'loadPartyPODetails',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
		enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
                party : supcode,  
		},
		scope:this,
		callback:function()
		{
	    //      grid_tot_party();
		}   

           });    

            
  
}

var dgrecord = Ext.data.Record.create([]);

var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:200,
    height: 290,
    hidden:false,
    width: 460,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Nos" , dataIndex: 'nos',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Value"  , dataIndex: 'purvalue',sortable:false,width:150,align:'left', menuDisabled: true},
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


var flxPO = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 700,
    //id: 'my-grid',  
    id   : 'flxPO',
    columns:
    [ 	 	
        {header: "PO.No" , dataIndex: 'phd_pono',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'phd_podate',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Ind.No" , dataIndex: 'ptr_ind_no',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'ptr_ord_qty',sortable:false,width:100,align:'left', menuDisabled: true},

    ],
     store: loadPartyMonthPOData,
    listeners:{	

            'cellclick': function (flxPO, rowIndex, cellIndex, e) {
                  var sm = flxPO.getSelectionModel();
		  var selrow = sm.getSelected();

               purheadname ="P.MANIVANNAN";
                  var pono = selrow.get('phd_pono')
	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&pono=" + encodeURIComponent(pono);
        	var p4 = "&purhead=" + encodeURIComponent(purheadname);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 



   }
}
});

var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
        flxMonth.getStore().removeAll();

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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if (cmbDepartment.getValue()==0)
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}

				else
				{

				//	var pono=Ext.getCmp('cmbstrepno').getRawValue();
					if(cmbDepartment.getValue() == "1"){
				

						var d2='P';  
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);  
						var p3 = "&indno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;     
       if (printtype == "PDF") 
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "2"){
				

						var d2='P';

						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&pono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;   
                                                if (printtype == "PDF")                       
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                                                else
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "5"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&clrno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurTransportClearance.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "6"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&gentno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDeliveryNoteReceipt.rptdesign' + param , '_blank'); 

					}
					else if(cmbDepartment.getValue() == "7"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&wono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurWorkOrder.rptdesign' + param , '_blank'); 

					}		                   
		                }
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
                flxMonth.getStore().removeAll();

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
                height  : 180,
                width   : 460,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[

                
                  			     { 
						   xtype       : 'fieldset',
						   title       : '',
						   labelWidth  : 100,
						   width       : 600,
						   x           : 0,
						   y           : -10,
						   border      : false,
						   items: [txtSupplier]
					   }, flxParty,


					
                ]

            }, 

            { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 20,
			     y       : 210,
                             items: [flxMonth]	
            },      flxPO,

		{ 
			xtype   : 'fieldset',
			title   : 'PRINT TYPE',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 650,
			y       : 0,
			items:[optprinttype],
		},
            
        ],
    });
    


   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
	x	    : 10,
        y           : 35,
        title       : 'Purchase PrePrinted Reports',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
                 monthstartdate =  Ext.util.Format.date(finstartdate,"Y-m-d"),


                 Month_Add_inGrid();

			 /*loadgrnprint.load({
				 url: '/SHVPM/Purchase/General/ClsPurRep.php', 
		        	 params:
		       		 {
		         	 task:"loadgrnno",
				 finid:GinFinid,
				 compcode: GinCompcode

		        	 }
			 });	*/	
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
