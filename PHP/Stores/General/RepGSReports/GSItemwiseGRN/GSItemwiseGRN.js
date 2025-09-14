Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');


   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 

   var repname = '';
    var printtype='PDF';

    var monthstartdate = new Ext.form.DateField({
        id: 'monthfirstdate',
        format: 'y-m-d',
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
        id: 'monthenddate',
        format: 'y-m-d',
        value: new Date()   
    });

var itemcode = 0;
var loadMonthWiseGRNData = new Ext.data.Store({
      id: 'loadMonthWiseGRNData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemMonthGRNS"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[      'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/MasPurItem/ClsPurItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
              'item_code', 'item_name'
      ]),
    });



function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: '/SHVPM/Purchase/General/MasPurItem/ClsPurItem.php',
		params:
		{
			task:"loadSearchitemlist",
			item : txtItem.getRawValue(),
		},
        });
}

var txtItem = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItem',
        name        : 'txtItem',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 if (itemcode == 0)
                 {    
                    alert("Select Ledger Name ...");
                    txtItem.focus();
                 }
                 else
                 {    
                   flxItem.hide();
                 }     
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },

	    keyup: function () {
                loadSearchItemListDatastore.removeAll();
                  if (txtItem.getRawValue() != '')
                     ItemSearch();
            }
         }  
    });


function grid_chk_flxItemr()
{

			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_name'));
                        itemcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				itemcode = selrow.get('item_code');
//				txtItemname.setValue(selrow.get('item_name'));
                                txtItem.setRawValue(selrow.get('item_name'));
            flxMonth.getStore().removeAll();
            Month_Add_inGrid()
    	    loadMonthWiseGRNData.removeAll();
	    loadMonthWiseGRNData.load({
		url: '/SHVPM/Stores/ClsPurRep.php',
		params: {
	    	task: 'loadItemMonthGRNS',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
                item : itemcode,  
		},
		scope:this,
		callback:function()
		{
	            var cnt=loadMonthWiseGRNData.getCount();
		    if(cnt>0)
                    {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
		       var sel = flxMonth.getSelectionModel().getSelections();

		       for(var j=0; j<cnt; j++)
		       {  
   		       for (var i=0;i<selrows;i++){    
	 
	    		    if (sel[i].data.rmonth === loadMonthWiseGRNData.getAt(j).get('rmonth'))
	      		    {
				sel[i].set('nos', Ext.util.Format.number(loadMonthWiseGRNData.getAt(j).get('nos'),'0'));
				sel[i].set('purvalue', Ext.util.Format.number(loadMonthWiseGRNData.getAt(j).get('purvalue'),'0.00'));

			    }
			}
			}
//                       grid_tot();

		   }  
                   else
		       {  
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
		       var sel = flxMonth.getSelectionModel().getSelections();
	   		   for (var i=0;i<selrows;i++){    
			           sel[i].set('nos','');
			           sel[i].set('purvalue','');
		           }
                       }  

                   }
	    }); 


		
                           }


}


var dgrecord = Ext.data.Record.create([]);
   var flxItem = new Ext.grid.EditorGridPanel({
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
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchItemListDatastore,

        listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxItemr();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxItemr();
             }

          }

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

 var loadItemPurchaseDataStore = new Ext.data.Store({
      id: 'loadItemPurchaseDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemMonthGRNDETAILS"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'docno','docdate','purtype', 'cust_ref', 'amount'
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

var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
        flxMonth.getStore().removeAll();
        flxGRN.getStore().removeAll();
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

var invprttype = "1";
var optinvprttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
//    width:250,
    height:50,
//    x:500,
//    y:85,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 4,
        rows : 1,
        id: 'optinvprttype',
        items: [
            {boxLabel: 'Original' , name: 'optinvprttype', id:'optinvtype1', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "ORIGINAL FOR BUYER";
                         invprttype = "1";

                     }
                 }
               }
            },
            {boxLabel: 'Duplicate' , name: 'optinvprttype', id:'optinvtype2', inputValue: 2,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "DUPLICATE FOR TRANSPORTER";

                         invprttype = "2";

                     }
                 }
               }
            },
            {boxLabel: 'Extra Copy' , name: 'optinvprttype', id:'optinvtype3', inputValue: 3,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "EXTRA COPY";
                         invprttype = "3";

                     }
                 }
               }
            },
            {boxLabel: 'Triplicate' , name: 'optinvprttype', id:'optinvtype4', inputValue: 4,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "EXTRA COPY";
                         invprttype = "4";

                     }
                 }
               }
            },            
       ]
      }   

    ]



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

    rmon = ("0"+mmon).slice(-2);
    monthstartdate = yr+"-"+rmon+"-01";
    monthenddate = yr+"-"+rmon+"-"+mdays;

    loadItemPurchaseDataStore.removeAll();
    loadItemPurchaseDataStore.load({
        url: '/SHVPM/Stores/ClsGSRep.php',
        params: {
    	task: 'loadItemMonthGRNDETAILS',
        compcode:GinCompcode,
        finid:GinFinid,
        startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
        enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
        item : itemcode,
	},
	scope:this,
	callback:function()
	{
     //     grid_tot_party();
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
        {header: "No of GRNs" , dataIndex: 'nos',sortable:false,width:130,align:'center', menuDisabled: true},
        {header: "Purchase-Value"  , dataIndex: 'purvalue',sortable:false,width:150,align:'right', menuDisabled: true},
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

var flxGRN = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 670,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "GRN No" , dataIndex: 'docno',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Date" , dataIndex: 'docdate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Type" , dataIndex: 'purtype',sortable:false,width:70,align:'left', menuDisabled: true , hidden : true},
        {header: "Party" , dataIndex: 'cust_ref',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "GRN/INV.Amount" , dataIndex: 'amount',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store: loadItemPurchaseDataStore,
    listeners:{	

            'cellclick': function (flxGRN, rowIndex, cellIndex, e) {
                  var sm = flxGRN.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('docno');
                  var purtype = selrow.get('purtype');

		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&minno=" + encodeURIComponent(grnno);

		   var param = (p1+p2+p3) ;   

                  if ( purtype == "P")
                  { 
                   if (printtype == "PDF") 
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
                   else
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
  
                  }
                  if ( purtype == "I")
                  { 
                   if (printtype == "PDF") 
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param); 
                   else
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign' + param); 

                 }
                    


   }
}
});





   
  function loadVocherList()
  {
        Month_Add_inGrid();
	Ext.getCmp('optinvprttype').hide();

    loadStoresData.removeAll();
    loadStoresData.load({
        url: '/SHVPM/Stores/ClsGSRep.php',
        params: {
    	task: 'loadMonthVoucherDetails',
        compcode:GinCompcode,
        finid:GinFinid,
        startdate: Ext.util.Format.date(finstartdate,"Y-m-d"),  
        repname : repname,
	},
	scope:this,
	callback:function()
	{
                   var cnt=loadStoresData.getCount();
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
                       for(var j=0; j<cnt; j++)
                       {  
   		       for (var i=0;i<selrows;i++){    
         
            		    if (sel[i].data.rmonth === loadStoresData.getAt(j).get('rmonth'))
              		    {
                                sel[i].set('nos', Ext.util.Format.number(loadStoresData.getAt(j).get('nos'),'0'));
                                sel[i].set('purvalue', Ext.util.Format.number(loadStoresData.getAt(j).get('purvalue'),'0.000'));

		            }
                        }
			}
//                       grid_tot();

                   }   
        }
    });

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
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 160,
                width   : 450,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 10,

                items:[
                    
  			     { 
				   xtype       : 'fieldset',
				   title       : '',
				   labelWidth  : 100,
				   width       : 600,
				   x           : 0,
				   y           : -10,
				   border      : false,
				   items: [txtItem]
			   }, flxItem,


	
                ]

            },
            { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 20,
			     y       : 170,
                             items: [flxMonth]	
            },

            flxGRN,
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
    
    function RefreshData()
    {
/*
        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: '/SHVPM/Purchase/General/MasPurItem/ClsPurItem.php',
		params:
		{
			task:"loadSearchitemlist",
			item : '',
		},
        });
*/
    }

    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
	x	    : 80,
        y           : 35,
        title       : 'Stores PrePrinted Reports',
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
                RefreshData();
               }    
			
	}
    });
    ReppreprintWindow.show();  
});
