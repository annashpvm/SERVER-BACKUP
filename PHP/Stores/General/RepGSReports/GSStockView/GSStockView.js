Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');


   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 

   var grpcode  = 0;
   var grpname = '';
   var subgrpcode  = 0;
   var subgrpname = '';
   var itemcode  = 0;
   var itemname = '';


    var printtype='PDF';

    var monthstartdate = new Ext.form.DateField({

        id: 'monthfirstdate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    });
    var monthenddate = new Ext.form.DateField({
        fieldLabel : ' Stock As on ',
        id: 'monthenddate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",   
        width       : 120,   
    });

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
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




   var txtOpeningStock = new Ext.form.NumberField({
        fieldLabel  : 'Opening Stock',
        id          : 'txtOpeningStock',
        name        : 'txtOpeningStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtOpeningValue = new Ext.form.NumberField({
        fieldLabel  : 'Opening Value',
        id          : 'txtOpeningValue',
        name        : 'txtOpeningValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txtClosingStock = new Ext.form.NumberField({
        fieldLabel  : 'Closing Stock',
        id          : 'txtClosingStock',
        name        : 'txtClosingStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtClosingValue = new Ext.form.NumberField({
        fieldLabel  : 'Closing Value',
        id          : 'txtClosingValue',
        name        : 'txtClosingValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtMainGrpValue = new Ext.form.NumberField({
        fieldLabel  : 'Main Group Value',
        id          : 'txtMainGrpValue',
        name        : 'txtMainGrpValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtSubGrpValue = new Ext.form.NumberField({
        fieldLabel  : 'Sub Group Value',
        id          : 'txtSubGrpValue',
        name        : 'txtSubGrpValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemStock = new Ext.form.NumberField({
        fieldLabel  : 'Total Stock',
        id          : 'txtItemStock',
        name        : 'txtItemStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Item Value',
        id          : 'txtItemValue',
        name        : 'txtItemValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});

var lblDetail2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail2',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
});


var lblDetail3 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail3',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
});




    var btnLedger = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Ledger View",
	width   : 90,
	height  : 35,
        id:'btnLedger',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&itemcode=" + encodeURIComponent(itemcode);
//                    var p6 = "&maingroupname=" + enodeURIComponent(grpname);

 		    var param = (p1+p2+p3+p4+p5) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedgerItem.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedgerItem.rptdesign' + param, '_blank');	



	    }
	}
    })




    var btnView = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepMainGroupStock.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepMainGroupStock.rptdesign' + param, '_blank');	



	    }
	}
	});


    var btnView2 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView2',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(grpcode);
                    var p6 = "&maingroupname=" + encodeURIComponent(grpname);

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepGroup_Itemwise_Stock.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepGroup_Itemwise_Stock.rptdesign' + param, '_blank');	



	    }
	}
	});



    var btnView2_withAcutal = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView2_withAcutal',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(grpcode);
                    var p6 = "&maingroupname=" + encodeURIComponent(grpname);

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepGroup_Itemwise_Stock_Vs_Actual.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepGroup_Itemwise_Stock_Vs_Actual.rptdesign' + param, '_blank');	



	    }
	}
	});


    var btnView3 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView3',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){

		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(subgrpcode);
                    var p6 = "&subgrpname=" + encodeURIComponent(subgrpname);

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepSubgrpStockList.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepSubgrpStockList.rptdesign' + param, '_blank');	




	    }
	}
	});


    var btnView4 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView4',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){

		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(subgrpcode);
                    var p6 = "&subgrpname=" + encodeURIComponent(subgrpname);

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepSubgrpStockList.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepSubgrpStockList.rptdesign' + param, '_blank');	




	    }
	}
	});

function grid_tot(){

       var tval = 0;
       txtMainGrpValue.setValue('');
       var Row= flxGroup.getStore().getCount();
       flxGroup.getSelectionModel().selectAll();
       var sel=flxGroup.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.closingvalue) > 0)
              {
		      tval =tval+Number(sel[i].data.closingvalue);

              }
         }
   //      tval = Ext.util.Format.number(parseFloat(tval),'000,00,00,000.00');
         txtMainGrpValue.setValue(tval);
}


function grid_tot2(){

       var tval = 0;
       txtSubGrpValue.setValue('');
       var Row= flxSubGroup.getStore().getCount();


       flxSubGroup.getSelectionModel().selectAll();
       var sel=flxSubGroup.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.closingvalue) > 0)
              {
		      tval =tval+Number(sel[i].data.closingvalue);
              }
         }
         txtSubGrpValue.setValue(tval);
}


function grid_tot3(){

       var tval = 0;
       var tqty = 0;
       txtItemValue.setValue('');
       txtItemStock.setValue('');

       var Row= flxItem.getStore().getCount();
       flxItem.getSelectionModel().selectAll();
       var sel=flxItem.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.closingvalue) > 0)
              {
		      tval =tval + Number(sel[i].data.closingvalue);
		      tqty =tqty + Number(sel[i].data.closingstock);

              }
        }
        txtItemValue.setValue(tval);
        txtItemStock.setValue(tqty);
}


function grid_tot_ledger(){

       var rval = 0;
       var rqty = 0;

       var ival = 0;
       var iqty = 0;


       var cval = 0;
       var cqty = 0;

       txtClosingStock.setValue('');
       txtClosingValue.setValue('');

       var Row= flxLedger.getStore().getCount();
       flxLedger.getSelectionModel().selectAll();
       var sel=flxLedger.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.rec_val) + Number(sel[i].data.iss_val) > 0)
              {
		      rval =rval + Number(sel[i].data.rec_val);
		      rqty =rqty + Number(sel[i].data.rec_qty);
		      ival =ival + Number(sel[i].data.iss_val);
		      iqty =iqty + Number(sel[i].data.iss_qty);

              }
        }

        cval = Number(txtOpeningValue.getValue()) + Number(rval) - Number(ival); 
        cqty = Number(txtOpeningStock.getValue()) + Number(rqty) - Number(iqty); 



        txtClosingValue.setValue(cval);
        txtClosingStock.setValue(cqty);
}


 var loadGroupListDataStore = new Ext.data.Store({
      id: 'loadGroupListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'grp_code', 'grp_name', 'closingvalue'
      ]),
    });


 var loadSubGroupListDataStore = new Ext.data.Store({
      id: 'loadSubGroupListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroupDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'subgrp_code', 'subgrp_name', 'closingvalue'
      ]),
    });

 var loadItemListDataStore = new Ext.data.Store({
      id: 'loadItemListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'item_code', 'item_name', 'uom_short_name', 'closingstock', 'closingvalue'
      ]),
    });

 var loadItemLedgerDataStore = new Ext.data.Store({
      id: 'loadItemLedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemLedgerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
          'doctype', 'type', 'doc_no', 'doc_date', 'doc_date2', 'rec_qty', 'rec_val', 'iss_qty', 'iss_val', 'iss_cr_status', 'cust_name', 'cost_name', 'item_code', 'op_rec_qty', 'op_rec_val', 'op_ret_rec_qty', 'op_ret_rec_val', 'op_adjm_qty', 'op_adjm_val', 'op_iss_qty', 'op_iss_val', 'op_ret_iss_qty', 'op_ret_iss_val', 'op_adjp_qty', 'op_adjp_val', 'item_code', 'item_name', 'item_comp_code', 'item_avg_rate', 'item_stock', 'op_qty', 'op_value', 'item_fin_code', 'uom_short_name', 'subgrp_name', 'grp_name'
      ]),
    });


function process_data()
{

flxGroup.getStore().removeAll();
		    Ext.Ajax.request({
		    url: '/SHVPM/Stores/General/RepGSReports/RepGSRPT.php',
		    params :
		     {
		       compcode     : GinCompcode,
		       finid	    : GinFinid,
		       fromdate	    : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		       todate	    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
		       finstartdate : finstartdate,
		       RPT	    : "STORELEDGER"
		                                    	
		    },
                    callback:function()
	            {

			loadGroupListDataStore.removeAll();
			loadGroupListDataStore.load({
			 url: '/SHVPM/Stores/ClsViewRep.php',
				params: {
			    	task: 'loadGroupDetails',
				compcode:GinCompcode,
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
			    }); 

}
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
               process_data();
    
       	 }
        }   
});

 var loadPartyPurchaseDataStore = new Ext.data.Store({
      id: 'loadPartyPurchaseDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthGRNList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'docno','docdate','purtype', 'sup_refname', 'amount'
      ]),
    });


 var loadStoresData = new Ext.data.Store({
      id: 'loadStoresData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthVoucherDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'rmonth', 'nos', 'purvalue'
      ]),
    });




 var loadpreprint = new Ext.data.Store({
      id: 'loadpreprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
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


    
var dgrecord = Ext.data.Record.create([]);
var flxGroup = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:90,
    height: 400,
    hidden:false,
    width: 460,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Grp Code" , dataIndex: 'grp_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Group Name" , dataIndex: 'grp_name',sortable:false,width:270,align:'left', menuDisabled: true},
        {header: "Closing Value"  , dataIndex: 'closingvalue',sortable:false,width:170,align:'right', menuDisabled: true},
    ],
    store: loadGroupListDataStore,
    listeners:{	
       'cellclick': function (flxGroup, rowIndex, cellIndex, e) {
		var sm = flxGroup.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grp_code');
                grpname = selrow.get('grp_name');
           
		lblDetail.setText("Detail for   : " + grpname  );
		lblDetail.getEl().setStyle('color', 'red');
		lblDetail.getEl().setStyle('font-size', '18px');
		lblDetail.getEl().setStyle('font-weight', 'bold');
		loadSubGroupListDataStore.removeAll();
		loadSubGroupListDataStore.load({
		 url: '/SHVPM/Stores/ClsViewRep.php',
		        params: {
		    	task: 'loadSubGroupDetails',
		        compcode:GinCompcode,
		        finid:GinFinid,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                        grpcode : grpcode
			},

	       	scope:this,
			callback:function()
			{

		           grid_tot2();
			}
		    });
     
        
        }      
	
   }
});

var flxSubGroup = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:90,
    height: 400,
    hidden:false,
    width: 670,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Grp Code" , dataIndex: 'subgrp_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Group Name" , dataIndex: 'subgrp_name',sortable:false,width:270,align:'left', menuDisabled: true},
        {header: "Closing Value"  , dataIndex: 'closingvalue',sortable:false,width:170,align:'right', menuDisabled: true},
    ],
     store: loadSubGroupListDataStore,
    listeners:{	

            'cellclick': function (flxSubGroup, rowIndex, cellIndex, e) {
                var sm = flxSubGroup.getSelectionModel();
                var selrow = sm.getSelected();
                subgrpcode = selrow.get('subgrp_code');
                subgrpname = selrow.get('subgrp_name');

		lblDetail2.setText("Detail for   : " + subgrpname  );
//		lblDetail2.getEl().setStyle('color', 'red');
//		lblDetail2.getEl().setStyle('font-size', '18px');
		//lblDetail2.getEl().setStyle('font-weight', 'bold');
                RepPrePrintFormPannel.setActiveTab(1);
		loadItemListDataStore.removeAll();
		loadItemListDataStore.load({
		 url: '/SHVPM/Stores/ClsViewRep.php',
		        params: {
		    	task: 'loadItemDetails',
		        compcode:GinCompcode,
		        finid:GinFinid,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                        grpcode : subgrpcode
			},

	       	scope:this,
			callback:function()
			{

		           grid_tot3();
			}
		    });
     

   }
}
});


var flxItem = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:70,
    height: 450,
    hidden:false,
    width: 950,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Item Code" , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Item Name" , dataIndex: 'item_name',sortable:false,width:450,align:'left', menuDisabled: true},
        {header: "UOM" , dataIndex: 'uom_short_name',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Closing Stock"  , dataIndex: 'closingstock',sortable:false,width:170,align:'right', menuDisabled: true},
        {header: "Closing Value"  , dataIndex: 'closingvalue',sortable:false,width:170,align:'right', menuDisabled: true},
    ],
    store: loadItemListDataStore,
    listeners:{	

            'cellclick': function (flxSubGroup, rowIndex, cellIndex, e) {
                var sm = flxSubGroup.getSelectionModel();
                var selrow = sm.getSelected();
                itemcode = selrow.get('item_code');
                itemname = selrow.get('item_name');
                    lblDetail3.setText("Detail for the Item : " + itemname  );

                    txtClosingValue.setValue(selrow.get('closingvalue'));
                    txtClosingStock.setValue(selrow.get('closingstock'));
/*
		    Ext.Ajax.request({
		    url: '/SHVPM/Stores/RepGSReports/GSGeneralReports/RepGSRPT.php',
		    params :
		     {
		       compcode     : GinCompcode,
		       finid	    : GinFinid,
		       fromdate	    : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		       todate	    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
		       finstartdate : finstartdate,
		       RPT	    : "STORELEDGER"
		                                    	
		    },
                    callback:function() 
	  	    {
*/

//annadurai 
                        flxLedger.getStore().removeAll();
		        RepPrePrintFormPannel.setActiveTab(2);
			loadItemLedgerDataStore.removeAll();
			loadItemLedgerDataStore.load({
			url: '/SHVPM/Stores/ClsViewRep.php',
			params: {
		    	task: 'loadItemLedgerDetails',
			compcode:GinCompcode,
			finid:GinFinid,
	                itemcode : itemcode
			},

		       	scope:this,
			callback:function()
			{

                           var cnt=loadItemLedgerDataStore.getCount();
	                   if(cnt>0)
		           {

			      txtOpeningValue.setValue(loadItemLedgerDataStore.getAt(0).get('op_value'));
			      txtOpeningStock.setValue(loadItemLedgerDataStore.getAt(0).get('op_qty'));

                               for(var j=0; j<cnt; j++)
                               { 
                                  var RowCnt    = flxLedger.getStore().getCount() + 1;   
                                  flxLedger.getStore().insert(
                                  flxLedger.getStore().getCount(),
                                  new dgrecord({
          			   doctype       : loadItemLedgerDataStore.getAt(j).get('doctype'),
          			   type          : loadItemLedgerDataStore.getAt(j).get('type'),
              			   item_code     : loadItemLedgerDataStore.getAt(j).get('item_code'),
              			   doc_no        : loadItemLedgerDataStore.getAt(j).get('doc_no'),
              			   doc_date      : loadItemLedgerDataStore.getAt(j).get('doc_date'),
              			   doc_date2     : loadItemLedgerDataStore.getAt(j).get('doc_date2'),
              			   cust_name     : loadItemLedgerDataStore.getAt(j).get('cust_name'),
              			   rec_qty       : loadItemLedgerDataStore.getAt(j).get('rec_qty'),
              			   rec_val       : loadItemLedgerDataStore.getAt(j).get('rec_val'),
              			   iss_qty       : loadItemLedgerDataStore.getAt(j).get('iss_qty'),
              			   iss_val       : loadItemLedgerDataStore.getAt(j).get('iss_val'),
              			   item_avg_rate : loadItemLedgerDataStore.getAt(j).get('item_avg_rate'),
                                   })
                                 );
                               } 
			  grid_tot_ledger();   
                           }   
                   

			}
		    });


//                    }

//                   });

                    

   }
}
});



var flxLedger = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:70,
    height: 450,
    hidden:false,
    width: 1200,
    id: 'my-grid',  
    columns:
    [ 
        {header: "DocType" , dataIndex: 'doctype',sortable:false,width:50,align:'left', menuDisabled: true,hidden:false},
        {header: "Type" , dataIndex: 'type',sortable:false,width:50,align:'left', menuDisabled: true,hidden:false},	 	
        {header: "Item Code" , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Doc No" , dataIndex: 'doc_no',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Doc. Date" , dataIndex: 'doc_date',sortable:false,width:100,align:'center', menuDisabled: true,hidden : true},
        {header: "Doc. Date" , dataIndex: 'doc_date2',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Supplier"  , dataIndex: 'cust_name',sortable:false,width:250,align:'center', menuDisabled: true},
        {header: "Receipt Qty"  , dataIndex: 'rec_qty',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Receipt Value"  , dataIndex: 'rec_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Issue Qty"  , dataIndex: 'iss_qty',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Issue Value"  , dataIndex: 'iss_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Rate"  , dataIndex: 'item_avg_rate',sortable:false,width:110,align:'right', menuDisabled: true},

    ],
     store: [], // loadItemListDataStore,
    listeners:{	


            'rowDblClick' : function(flxLedger,rowIndex,cellIndex,e){
//                tabOverall.setActiveTab(2);

		var sm = flxLedger.getSelectionModel();
		var selrow   = sm.getSelected();
                var docno    = selrow.get('doc_no')
                var doctype    = selrow.get('type')
                var grntype    = selrow.get('doctype')


                if (doctype == "RE" &&  grntype == "P")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
                 }
                if (doctype == "RE" &&  grntype == "I")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param); 
                 }

                if (doctype == "IS")
                { 
  		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&fromno=" + encodeURIComponent(docno);
		  var p4 = "&tono=" + encodeURIComponent(docno);
            	  var p5 = "&voutype=" + encodeURIComponent('IS');
                  var param = (p1+p2+p3+p4+p5) ;  

		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresIssuePrint.rptdesign&__format=pdf' + param); 
                 }


            }

}
});

/*

   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Stock List',
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
				if (cmbReport.getValue()==0)
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else if ((cmbstrepno.getValue()==="" && cmbstrepno.getValue()==0) ) {

					Ext.MessageBox.alert("Alert", "Select " + Ext.getCmp('cmbstrepno').fieldLabel );
				}
				else
				{
					var pono=Ext.getCmp('cmbstrepno').getRawValue();
					if(cmbReport.getValue() == "1"){				

						var d2='R';

						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&fincode=" + encodeURIComponent(GinFinid);
						var p3 = "&dctype=" + encodeURIComponent(d2);
						var p4 = "&dcno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=pdf' + param); 
					}
				if(cmbReport.getValue() == "2"){
				

						var d2='N';
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&fincode=" + encodeURIComponent(GinFinid);
						var p3 = "&dctype=" + encodeURIComponent(d2);
						var p4 = "&dcno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDeliveryChallan.rptdesign&__format=pdf' + param); 
					}


					if(cmbReport.getValue() == "4"){
				

						var d2='P';

						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&ordfrom=" + encodeURIComponent(d2);
						var p4 = "&minno=" + encodeURIComponent(pono);
						var param = (p1+p2+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
					}
						
					else if(cmbReport.getValue() == "3"){
				

						var d2='P';

						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&ordfrom=" + encodeURIComponent(d2);
						var p4 = "&pono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresPurchaseOrder.rptdesign' + param); 
					}
					else if(cmbReport.getValue() == "5"){
		
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p4 = "&grnno=" + encodeURIComponent(pono);
						var param = (p1+p2+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresWorkOrderGRN.rptdesign' + param); 
					}
					else if(cmbReport.getValue() == "6" || cmbReport.getValue() == "7") {
		
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&fincode=" + encodeURIComponent(GinFinid);
						var p3 = "&invno=" + encodeURIComponent(pono);
                                                if (invprttype == 1) 
                                                    var p4 = "&displayword=" + encodeURIComponent("ORIGINAL FOR BUYER"); 
                                                else  
                                                if (invprttype == 1) 
                                                    var p4 = "&displayword=" + encodeURIComponent("DUPLICATE FOR TRANSPORTER"); 
                                                else
                                                    var p4 = "&displayword=" + encodeURIComponent("EXTRA COPY"); 

						var param = (p1+p2+p3+p4) ;                        
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
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
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 400,
                            x           : 20,
                            y           : 20,
                            border      : false,
                            items: [monthenddate]
                        }, 


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 300,
			     y       : 15,
                             items: [btnProcess]
                        },

            { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 20,
			     y       : 170,
                             items: [flxGroup]	
            },

            flxSubGroup,
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 650,
			y       : 10,
			items:[optprinttype],
		},
				
            
        ],
    });
    
*/


 var RepPrePrintFormPannel = new Ext.TabPanel({
    id          : 'RepPrePrintFormPannel',
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
        title: 'GROUP WISE STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
	{
	    xtype       : 'fieldset',
	    title       : '',
	    labelWidth  : 100,
	    width       : 400,
	    x           : 20,
	    y           : 20,
	    border      : false,
	    items: [monthenddate]
	}, 


	{ 
	     xtype   : 'fieldset',
	     title   : '',
	     labelWidth  : 70,
	     width       : 120,
	     border  : false,
	     x       : 300,
	     y       : 15,
	     items: [btnProcess]
	},

	{ 
	     xtype   : 'fieldset',
	     title   : '',
	     border  : false,
	     x       : 20,
	     y       : 170,
	     items: [flxGroup]	
	},

	{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 140,
	width       : 400,
	x           : 120,
	y           : 490,
	border      : false,
	items: [txtMainGrpValue]
	},
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 400,
		     y       : 490,
                     items: [btnView]
                },

	{
	    xtype       : 'fieldset',
	    title       : '',
	    width       : 700,
	    labelWidth  : 1,
	    x           : 500,
	    y           : 50,
	    defaultType : 'Label',
	    border      : false,
	    items: [lblDetail]
	},

	flxSubGroup,

	{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 140,
	width       : 400,
	x           : 600,
	y           : 490,
	border      : false,
	items: [txtSubGrpValue]
	},


		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 900,
		     y       : 485,
                     items: [btnView2]
                },



		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1100,
		     y       : 485,
                     items: [btnView2_withAcutal]
                },

	{ 
		xtype   : 'fieldset',
		title   : '',
		layout  : 'hbox',
		border  : true,
		height  : 50,
		width   : 220,
		layout  : 'absolute',
		x       : 650,
		y       : -5,
		items:[optprinttype],
	},

        ],
    },  
    {
		xtype: 'panel',
		title: 'ITEM WISE STOCK',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [
			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 700,
			    labelWidth  : 1,
			    x           : 30,
			    y           : 10,
			    defaultType : 'Label',
			    border      : false,
			    items: [lblDetail2]
			},

			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 40,
			     items: [flxItem]	
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 400,
				y           : 500,
				border      : false,
				items: [txtItemStock]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 400,
				x           : 650,
				y           : 500,
				border      : false,
				items: [txtItemValue]
			},
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 950,
		     y       : 495,
                     items: [btnView3]
                },

		],
    }, 
    {
		xtype: 'panel',
		title: 'ITEM LEDGER',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [
			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 700,
			    labelWidth  : 1,
			    x           : 30,
			    y           : 10,
			    defaultType : 'Label',
			    border      : false,
			    items: [lblDetail3]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 500,
			y           : 0,
			border      : false,
			items: [txtOpeningStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 800,
			y           : 0,
			border      : false,
			items: [txtOpeningValue]
			},
			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 40,
			     items: [flxLedger]	
			},


			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 500,
			y           : 495,
			border      : false,
			items: [txtClosingStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 800,
			y           : 495,
			border      : false,
			items: [txtClosingValue]
			},


		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1150,
		     y       : 0,
                     items: [btnLedger]
                },

/*

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1000,
		     y       : 455,
                     items: [btnView4]
                },
*/

		],
    }, 
    ] 

});


    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 35,
        title       : 'Stores Stock List',
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
               monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d"));
             
                   process_data();         
               }    
			
	}
    });
    ReppreprintWindow.show();  
});
