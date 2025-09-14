Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var fm = Ext.form;
   var userid   = localStorage.getItem('ginuser');
   var usertype = localStorage.getItem('ginusertype');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var finStartDate = localStorage.getItem('gfinstdate');
   var finEndDate = localStorage.getItem('gfineddate');

   
   var fincode_approval = 0;

   var gstFlag = "Add";
   var dealercode = 0;
   var repcode = 0;
   var custtype = 0;
   var taxcode = 0;
   var ins = "N";
   var insper = 0;
   var gstadd ="true";
   var viewopt = 0;

   var editrow = 0;
   var gridedit = "false";
   var sotype = localStorage.getItem('SOTYPE');
   var fwt = 0;
   var iwt = 0;    
   var reelnolist = '';

   var shade = 'NAT';

   var displaysize = ""; 

 var custcode = 0;
 var custname = 0;
 var custledcode = 0;

 var areacode    = 0;
 var areagrpcode = 0;

 var cust_area_price = 'cust';
 var cust_area_priceType = 'C';

var ExtraAmt_PT = 0;
var pricearea = 0;
var pricearea = 0;
var gnos = 0;

var varietycode = 0;
var vargrpcode = 0;

   function check_password()
   {
      if (txtPassword.getRawValue() == "mrate")
      {
        Ext.getCmp('txtrate').setReadOnly(false);  
      }
      else
      {
        Ext.getCmp('txtrate').setReadOnly(true);  
      }    

   }   


   var txtCashDiscMT_7Days_30dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 7 Days',
        id          : 'txtCashDiscMT_7Days_30dayPT',
        name        : 'txtCashDiscMT_7Days_30dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });

   var txtRateDiff = new Ext.form.NumberField({
        fieldLabel  : 'Rate Difference',
        id          : 'txtRateDiff',
        name        : 'txtRateDiff',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });




   var txtCashDiscMT_7Days_45dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 7 Days',
        id          : 'txtCashDiscMT_7Days_45dayPT',
        name        : 'txtCashDiscMT_7Days_45dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_30Days_45dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 30 Days',
        id          : 'txtCashDiscMT_30Days_45dayPT',
        name        : 'txtCashDiscMT_30Days_45dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });
	

   var txtCashDiscMT_7Days_60dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 7 Days',
        id          : 'txtCashDiscMT_7Days_60dayPT',
        name        : 'txtCashDiscMT_7Days_60dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_30Days_60dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 30 Days',
        id          : 'txtCashDiscMT_30Days_60dayPT',
        name        : 'txtCashDiscMT_30Days_60dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_45Days_60dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 45 Days',
        id          : 'txtCashDiscMT_45Days_60dayPT',
        name        : 'txtCashDiscMT_45Days_60dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });
	


   var txtCashDiscMT_7Days_90dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 7 Days',
        id          : 'txtCashDiscMT_7Days_90dayPT',
        name        : 'txtCashDiscMT_7Days_90dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });

   var txtCashDiscMT_30Days_90dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 30 Days',
        id          : 'txtCashDiscMT_30Days_90dayPT',
        name        : 'txtCashDiscMT_30Days_90dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });

   var txtCashDiscMT_45Days_90dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 45 Days',
        id          : 'txtCashDiscMT_45Days_90dayPT',
        name        : 'txtCashDiscMT_45Days_90dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_60Days_90dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 60 Days',
        id          : 'txtCashDiscMT_60Days_90dayPT',
        name        : 'txtCashDiscMT_60Days_90dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_75Days_90dayPT = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 75 Days',
        id          : 'txtCashDiscMT_75Days_90dayPT',
        name        : 'txtCashDiscMT_75Days_90dayPT',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


  var loadGodownStockReelNowiseDataStore = new Ext.data.Store({
        id: 'loadGodownStockReelNowiseDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadGodownStockReelNowise"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code', 'var_name', 'stk_sr_no', 'stk_wt'])
    });



var GetRatecodeDatastore = new Ext.data.Store({
        id: 'GetRatecodeDatastore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ratecode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['rate_code','rate_fincode','rate_item_code'])
    });


var GetAreaRatecodeDatastore = new Ext.data.Store({
        id: 'GetAreaRatecodeDatastore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findAreaRateCode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['rate_code','rate_fincode','rate_item_code'])
    });



   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  60,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 
    });


    var chkChange = new Ext.form.Checkbox({
        name: 'chkChange',
        boxLabel: '',
        labelSeparator: "",
        fieldLabel: 'Change Customer',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        id: 'chkChange',
        checked: false,
        width: 100,
//        disabled: true,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
		 if (Number(txtInvQty.getValue()) > 0)  
		       Ext.getCmp('txtCustomer').setDisabled(true);  
		 else
		    Ext.getCmp('txtCustomer').setDisabled(false);  
                } else {

                }
            }
        }
    });



var Find90DaysDueDataStore = new Ext.data.Store({
        id: 'Find90DaysDueDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "find90daysdue"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'invbalance','nos','duedate', 'avldays','balance', 'allowed'
])
    });



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref','cust_led_code','cust_cr_days' , 'cust_grace_days','area_code', 'rate_areacode','area_rategrp'
 

      ]),
    });



function PartySearch()
{
        flxParty.show();
        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsTrnSalesOrder.php',
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
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxchk = 1;
                     

                   flxParty.hide();
//                   btnAdd.focus();
           
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
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });

function flx_change()
{

                        cmbDestination.setDisabled(true);   
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
                        custledcode = 0;
			areacode    = 0;
			areagrpcode = 0;
			if ((selrow != null)){

				gridedit = "false";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custledcode = selrow.get('cust_led_code');

				custname = selrow.get('cust_ref');
                                txtCustomer.setRawValue(selrow.get('cust_ref'));

			        txtPayTerms.setValue(selrow.get('cust_cr_days'));
          			txtGraceDays.setValue(selrow.get('cust_grace_days'));

	                        txtPayTerms.setDisabled(true);   
				txtGraceDays.setDisabled(true);  



				areacode = selrow.get('area_code');
//                                areagrpcode = selrow.get('rate_areacode');
                                areagrpcode = selrow.get('area_rategrp');


				  txtAddr1.setRawValue(""); 
				  txtAddr2.setRawValue(""); 
				  txtAddr3.setRawValue(""); 
				  txtAddr4.setRawValue(""); 
				  txtPin.setRawValue(""); 
				  txtGstNo.setRawValue("");



1615,1616,1619,2068,432
//1615	SRI LAKSHMI ENTERPRISES - SIVAKASI
//1616	SRI VISHNU PAPERS - SIVAKASI
//1619	SREE SAPTHAGIRI TRADERS
//2068	SUGANTHI CUTTING WORKS - SIVAKASI
//432	SRI SAKTHI PAPER CONVERTORS-COIMBARORE

//                            if (areacode == 24)
                           if (custcode == 1615 || custcode == 1616  || custcode == 1619 || custcode == 2068  || custcode == 432  )
                            {
                               cmbDestination.setDisabled(false);   
                            }
/*
			    LoadDeliveryAddressDatastore.removeAll();
			    LoadDeliveryAddressDatastore.load({
				url: 'ClsTrnSalesOrder.php',
				params: {
				    task: 'loadDeliveryAddress',
				     custcode:custcode,  
				},
			      	callback:function()
				{
				  txtAddr1.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add1')); 
				  txtAddr2.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add2')); 
				  txtAddr3.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add3')); 
				  txtAddr4.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_city')); 
				  txtPin.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_pin')); 
				  txtGstNo.setValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_gst'));


				}
			    });  
*/
                           Find90DaysDueDataStore.removeAll(); 
				Find90DaysDueDataStore.load({
		                url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
		                params:
                                {
		                       task:"find90daysdue",
		                        ledcode:custcode,
                                        custcode:custcode,
                                        sodate: Ext.util.Format.date(dptSONo.getValue(),"Y-m-d"),

		                },
				callback:function()
			        {
                                  cnt = Find90DaysDueDataStore.getCount();
				  if (cnt > 0)
                                  {  

//		                  if (Find90DaysDueDataStore.getAt(0).get('avldays') < 0  && Find90DaysDueDataStore.getAt(0).get('nos') == 0  )
		                  if (Find90DaysDueDataStore.getAt(0).get('balance') > 0 && Find90DaysDueDataStore.getAt(0).get('allowed') == 0  )
		                  { 
                                             txtOverDue.setValue(Find90DaysDueDataStore.getAt(0).get('balance'));
		                             Ext.getCmp('cmbPriceno').setDisabled(true);   
                                             Ext.getCmp('save').setDisabled(true);   
//		                             alert("This customer having > 90 days outstanding. You can't raise the SO");
		                             alert("This customer having Overdue outstanding. You can't raise the SO");
		                  }
                                  else
                                  {  
                                     Ext.getCmp('cmbPriceno').setDisabled(false);
                                     Ext.getCmp('save').setDisabled(false);      
                                  }


                                  }     

                                 }
                                });


			rateitemcode = 0;
 //alert(cmbCustomer.getValue());
//alert(GinFinid);
// alert(Gincompcode);
                        cmbPriceno.clearValue();
                        GetAreaRatecodeDatastore.removeAll();
                        GetRatecodeDatastore.removeAll();                   
                        findRepDataStore.removeAll();                   
          		findRepDataStore.load({
                        url: '/SHVPM/SALES/ClsSalesMain.php',
                        params:
                            {
                                task:"findRepName",
                                custcode:custcode,                    
                            },
                            callback:function()
   		            {

//alert(findRepDataStore.getAt(0).get('tax_name'));


			    repcode = findRepDataStore.getAt(0).get('repr_code');
                            custtype = findRepDataStore.getAt(0).get('cust_type');
                            taxcode = findRepDataStore.getAt(0).get('tax_code');
//			    cmbTax.setRawValue(findRepDataStore.getAt(0).get('tax_name'));
			    cmbTax.setValue(findRepDataStore.getAt(0).get('tax_code'));
			    txtCgstPer.setValue(findRepDataStore.getAt(0).get('tax_cgst'));
                            txtSgstPer.setValue(findRepDataStore.getAt(0).get('tax_sgst'));
                            txtIgstPer.setValue(findRepDataStore.getAt(0).get('tax_igst'));
                 	    }
                        });

			GetRatecodeDatastore.load({
                        url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
                        params:
                            {
                                task:"ratecode",
                                custcode:custcode,
                                finid:  GinFinid ,
                                compcode: Gincompcode,                       
//                                finid:  cmbPriceno.getValue() ,
                            },
			callback:function()
		            {
                            var cnt  = GetRatecodeDatastore.getCount();
                            if (cnt > 0)
                            {     
                                 cust_area_price = 'cust';
                                 cust_area_priceType = 'C';
                                 cmbAreaPriceno.hide();
                                 cmbPriceno.show();
                                 cmbPriceno.focus();

                            }
                            else
                            {

				GetAreaRatecodeDatastore.load({
		                url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
		                params:
		                    {
		                        task:"findAreaRateCode",
		                        areacode:areagrpcode,
		                        finid:  GinFinid ,
		                        compcode: Gincompcode,                       
		                    },
				    callback:function()
				    {
		                    var cnt  = GetAreaRatecodeDatastore.getCount();
		                    if (cnt > 0)
                                        cust_area_price = 'area';
                                        cust_area_priceType = 'A';
                                        cmbAreaPriceno.show();
                                        cmbPriceno.hide();
                                        cmbAreaPriceno.focus();
		                    }      

  
                               });   
     
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
        height: 150,
        width: 350,
//        header : false,
        x: 105,
        y: 22,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
		{header: "Customer Code", dataIndex: 'cust_led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'area_code',sortable:true,width:60,align:'left',hidden:false},   
		{header: "", dataIndex: 'area_rategrp',sortable:true,width:60,align:'left',hidden:false},   

        ],
        store:loadSearchPartyListDatastore,

    listeners:{	

             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flx_change();
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                           flx_change();
		
         }

			}



   });


var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = flxGodownStock.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.stk_sr_no);
}
}
}
});


var fm1 = Ext.form;
   var flxGodownStock = new Ext.grid.EditorGridPanel({
        frame: false,
     //   sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 250,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        selModel: sm1,
        columns: [ sm1,  
		{header: "Reel No", dataIndex: 'stk_sr_no',sortable:true,width:100,align:'left'},   
		{header: "Weight", dataIndex: 'stk_wt',sortable:true,width:90,align:'right'},   
		{header: "Item code", dataIndex: 'var_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Size", dataIndex: 'var_name',sortable:true,width:120,align:'left',hidden:true},

        ],
        store:loadGodownStockReelNowiseDataStore,

    listeners:{	
                click : function() {
		    wt = "0";
                    gnos = 0;
                    reelnolist = "";
		    var sel = flxGodownStock .getSelectionModel().getSelections();
                    txtGodownNos.setValue(sel.length);
		    for (var t=0; t<sel.length; t++)
		    {
			if (reelnolist === "")
			      reelnolist =  sel[t].data.stk_sr_no;
			else
			      reelnolist = reelnolist + ","  + sel[t].data.stk_sr_no;

                              wt =  Number(wt) + Number(sel[t].data.stk_wt);
                              txtGodownQty.setValue(wt);
		    }
     
                },  
              }

   });

var LoadDeliveryAddressDatastore = new Ext.data.Store({
        id: 'LoadDeliveryAddressDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadDeliveryAddress"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'delivery_add1','delivery_add2','delivery_add3','delivery_city','delivery_pin','delivery_gst'
])
    });


new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'Are you sure want to Exit...',
		    fn: function(btn)
                    {
		        if (btn === 'yes')
			{
                          TrnSalesOrder1Window.hide();
                        }
                    }  
               });   
            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "c",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                Ext.getCmp('godown').hide();
          Ext.getCmp('godown').hide();
	  txtGodownStk.setRawValue(txtGodownQty.getValue()); 
	  txtGodownReels.setRawValue(txtGodownNos.getValue());
          txtNoofReels.focus();
            }
        }]);



  var getShadeCodeDataStore = new Ext.data.Store({
       id: 'getShadeCodeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findShadecode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['shade_shortname','shade_code','shade_shortcode'])
    });



 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });



var lblvariety = new Ext.form.Label({
    fieldLabel  : 'Variety',
    id          : 'lblvariety',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblshade = new Ext.form.Label({
    fieldLabel  :'Shade',
    id          : 'lblshade',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblBF = new Ext.form.Label({
    fieldLabel  :'BF',
    id          : 'lblBF',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblGSM = new Ext.form.Label({
    fieldLabel  :'GSM',
    id          : 'lblGSM',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblSize = new Ext.form.Label({
    fieldLabel  : 'Size',
    id          : 'lblsize',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblRB = new Ext.form.Label({
    fieldLabel  : '(R / B)',
    id          : 'lblRB',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});
var lblDia = new Ext.form.Label({
    fieldLabel  : 'Dia(R)',
    id          : 'lblDia',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblrate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblrate',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblqty = new Ext.form.Label({
    fieldLabel  : 'Qty(t)',
    id          : 'lblqty',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lbldespdate = new Ext.form.Label({
    fieldLabel  : 'Desp.Date',
    id          : 'lbldespdate',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblsizein = new Ext.form.Label({
    fieldLabel  : 'Size In',
    id          : 'lblsizein',
    width       : 80,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblGodown = new Ext.form.Label({
    fieldLabel  : 'Godown Stk',
    id          : 'lblGodown',
    width       : 80,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



 var loadOrderNoListDataStore = new Ext.data.Store({
      id: 'loadOrderNoListDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOrderNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono'
      ]),
    });


 var loadinsperdatastore = new Ext.data.Store({
      id: 'loadinsperdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinsdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'def_ins'
      ]),
    });

   var txtTotQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty(t)',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  80,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });


   var txtGodownQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGodownQty',
        name        : 'txtGodownQty',
        width       :  80,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtGodownNos = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtGodownNos',
        name        : 'txtGodownNos',
        width       :  60,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtFinQty = new Ext.form.NumberField({
        fieldLabel  : 'Finished(t)',
        id          : 'txtFinQty',
        name        : 'txtFinQty',
        width       :  80,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });

   var txtInvQty = new Ext.form.NumberField({
        fieldLabel  : 'Invoiced(t)',
        id          : 'txtInvQty',
        name        : 'txtInvQty',
        width       :  80,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });

   var txtGodownReels = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGodownReels',
        name        : 'txtGodownReels',
        width       :  30,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;color:#f51505",
    });

   var txtGodownStk = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGodownStk',
        name        : 'txtGodownStk',
        width       :  50,
	readOnly : true,
        decimalPrecision: 3,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;color:#f51505",
    });

   var txtSONo = new Ext.form.NumberField({
        fieldLabel  : 'S.O. No.',
        id          : 'txtSONo',
        name        : 'ordno',
        width       :  100,
//	readOnly : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'7'},
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
			const input = document.getElementById('dptSONo');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
		     }
		  }  
        }  

    });



  function datecheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_so = dptSONo.getValue();
        var diffdays = (dt_today.getDate()-dt_so.getDate());
        var diffdays = (dt_today.getTime()-dt_so.getTime());
//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >4)
        {     
             alert("You are Not Allowed to Raise the SO in the date of " +  Ext.util.Format.date(dt_so,"d-m-Y"));
             dptSONo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             dptSONo.focus();

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the SO in future date");
             dptSONo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }


//alert(finStartDate);
//alert(finEndDate);


 //       if(Ext.util.Format.date(dptSONo.getRawValue(),"Y-m-d") > Ext.util.Format.date(finEndDate,"Y-m-d")){
//            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
//        }

 }

  function POdatecheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_so = dptSONo.getValue();
        var dt_po = dptPO.getValue();

        var diffdays = (dt_today.getDate()-dt_po.getDate());

        var diffdays = (dt_today.getTime()-dt_po.getTime());

        var podiffdays = (dt_po.getTime()-dt_so.getTime());



//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24));

        podiffdays = Math.ceil(podiffdays / (1000 * 60 * 60 * 24));

//alert(diffdays);
        if (podiffdays >0)
        {     
             alert("PO Date is greater than  SO date");
             dptPO.setRawValue(Ext.util.Format.date(dt_so,"d-m-Y"));
             dptPO.focus();

        }


 }

 var dptSONo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSONo',
        name: 'Date',
        format: 'd-m-Y',
        width       :  120,
//        readOnly : true,
        value: new Date(),
         	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
       	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          datecheck();
		          cmbPO.focus();
		     }
		  },
 
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }  

 });

var dptPO= new Ext.form.DateField({
     fieldLabel: 'PO.Date',
     id: 'dptPO',
     name: 'Date',
     format: 'd-m-Y',
     value: new Date(),
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          POdatecheck();
		          txtCustomer.focus();
		     }
		  } ,
           blur:function(){
              POdatecheck();
           },
           keyup:function(){
              POdatecheck();
            }, 
        }  

 });

 var dptDespdate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dptDespdate',
        name: 'dptDespdate',
        format: 'd-m-Y',
        value: new Date(),
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          add_btn_click();
		     }
		  }  
        }  

   
});

    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 400,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });


 var txtrate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  80,
        readOnly    : false,
        tabindex    : 2,
        readOnly    : true,
});


 var txtDia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDia',
        name        : 'txtDia',
        width       :  40,
        readOnly    : false,
        tabindex : 2
 });

var txtBF = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtBF',
        name        : 'txtBF',
        width       :  40,
        readOnly    : true,
        tabindex : 2
});
var txtGSM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  45,
        readOnly    : true,
        tabindex : 2
});
var txtqty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  50,
        tabindex : 2,
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          dptDespdate.focus();
		     }
		  }  
        }  

});
var lblNoofReels = new Ext.form.Label({
    fieldLabel  : 'No.(R)',
    id          : 'lblNoofReels',
    width       : 80,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
});
function findweight()
   {

    if (cmbSizetype.getValue() == "I")
    {

        txtqty.setValue(Number(cmbSizeList.getRawValue())*10 * Number(txtNoofReels.getValue())/1000); 
    } 
    else
    {

        txtqty.setValue((Number(cmbSizeList.getRawValue())/2.54)*10 * Number(txtNoofReels.getValue())/1000); 
    } 
}
   var txtNoofReels = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtNoofReels',
        name        : 'txtNoofReels',
        width       :  50,
        tabindex : 2,
	enableKeyEvents : true,
        listeners   :{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtqty.focus();
             }
          } ,

           blur:function(){
                 findweight();  
           },
           keyup:function(){
              findweight();
           }
        }

    });

   var txtPayTerms = new Ext.form.NumberField({
        fieldLabel  : 'Paymt.Terms',
        id          : 'txtPayTerms',
        name        : 'txtPayTerms',
//        readOnly    : true,
        width       :  40,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGraceDays.focus();
             }
          }  
        }  


    });


   var txtOverDue = new Ext.form.NumberField({
        fieldLabel  : 'Over Due',
        id          : 'txtOverDue',
        name        : 'txtOverDue',
        width       :  120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

        tabindex    : 2,
        readOnly    : true, 
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},   

    });


   var txtCommission = new Ext.form.NumberField({
        fieldLabel  : 'Commission',
        id          : 'txtCommission',
        name        : 'txtCommission',
        width       :  50,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPayTerms.focus();
             }
          }  
        }  
    });
   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  40,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
        tabindex : 2,
//        readOnly    : true,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  if (areacode == 24)
                     cmbDestination.focus();                           
                  else
                     btnPriceTermConfirm.focus();
             }
          }  
        }  
    });



   var txtFrtperton = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtperton',
        name        : 'txtFrtperton',
        width       :  70,
        tabindex : 2
    });

   var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
        readOnly    : true,
        tabindex    : 2
    });
   var txtSgstPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSgstPer',
        name        : 'txtSgstPer',
        width       :  50,
        readOnly    : true,
        tabindex : 2
    });
   var txtIgstPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIgstPer',
        name        : 'txtIgstPer',
        width       :  50,
        readOnly    : true,
      
        tabindex : 2
    });
   var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : 'Ins %',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  50,
        tabindex : 2,
        value    : 0,
    });

   var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
        tabindex : 2
    });

   var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Customer Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  400,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2
    });

   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
        tabindex : 2
    });

   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
        tabindex : 2
    });
   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address3.',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  500,
        tabindex : 2
    });

   var txtAddr4 = new Ext.form.TextField({
        fieldLabel  : 'City.',
        id          : 'txtAddr4',
        name        : 'txtAddr4',
        width       :  500,
        tabindex : 2
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
        tabindex : 2
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
        tabindex : 2
    });


   var txtSize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtSize',
        name        : 'txtSize',
        width       :  100,
        tabindex : 2
    });
/*
   var txtStartNo = new Ext.form.NumberField({
        fieldLabel  : 'StartNo.',
        id          : 'txtStartNo',
        name        : 'txtStartNo',
        width       :  100,
        tabindex : 2
    });

   var txtEndNo = new Ext.form.NumberField({
        fieldLabel  : 'End No.',
        id          : 'txtEndNo',
        name        : 'txtEndNo',
        width       :  100,
        tabindex : 2
    });

   var txtWt = new Ext.form.NumberField({
        fieldLabel  : 'Weight',
        id          : 'txtWt',
        name        : 'txtWt',
        width       :  100,
        tabindex : 2
    });

*/

var loadordernodatastore = new Ext.data.Store({
      id: 'loadordernodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOrderNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordno'
      ]),
    });


 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });


 var loadAgentStore = new Ext.data.Store({
      id: 'loadAgentStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAgentDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });


 var findRepDataStore = new Ext.data.Store({
      id: 'findRepDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findRepName"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['repr_name','repr_code','cust_type','tax_code','tax_name','tax_sgst','tax_cgst','tax_igst'
      ]),	
    });


 var loadTaxStore = new Ext.data.Store({
      id: 'loadTaxStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTaxDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'tax_code', type: 'int',mapping:'tax_code'},
	{name:'tax_name', type: 'string',mapping:'tax_name'}
      ]),
    });

 var loadBankNameStore = new Ext.data.Store({
      id: 'loadBankNameStore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBankDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'bank_code', type: 'int',mapping:'bank_code'},
	{name:'bank_name', type: 'string',mapping:'bank_name'}
      ]),
    });

 var loadTransportStore = new Ext.data.Store({
      id: 'loadTransportStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTransportDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });

  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });

  var loadGodownStockDataStore = new Ext.data.Store({
        id: 'loadGodownStockDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadGodownStock"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['nos', 'wt'])
    });




  var loadSizeDataStore = new Ext.data.Store({
        id: 'loadSizeDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','size'])
    });

  var getRatedetailsDataStore = new Ext.data.Store({
        id: 'getRatedetailsDataStore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findRateDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26','rate_bf28','rate_bf30', 'rate_bf32',  'rate_othershades','rate_gsmfrom', 'rate_gsmto', 'rate2_gsmfrom', 'rate2_gsmto', 'rate2_extraamt', 'rate3_gsmfrom', 'rate3_gsmto', 'rate3_extraamt', 'rate4_gsmfrom', 'rate4_gsmto', 'rate4_extraamt','rate5_gsmfrom', 'rate5_gsmto', 'rate5_extraamt', 'rate_sheet_extraamt',
'rate_rate', 'rate_crdays', 'rate_cashdisc_per', 'rate_cashdisc_days', 'rate_gst_per', 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit','rate_bf28_bit','rate_bf30_bit', 'rate_bf32_bit','rate_bitreel',
'rate_bf18gsm120', 'rate_bf18gsm100', 'rate_bf18gsm90', 'rate_bf18gsm80', 'rate_bf18gsm70', 'rate_bf18gsm60', 
'rate_bf18gsm50', 
'rate_bf20gsm120', 'rate_bf20gsm100', 'rate_bf20gsm90', 'rate_bf20gsm80', 'rate_bf20gsm70', 'rate_bf20gsm60', 'rate_bf20gsm50', 
'rate_bf22gsm120', 'rate_bf22gsm100', 'rate_bf22gsm90', 'rate_bf22gsm80', 'rate_bf22gsm70', 'rate_bf22gsm60', 'rate_bf22gsm50', 
'rate_bf24gsm120', 'rate_bf24gsm100', 'rate_bf24gsm90', 'rate_bf24gsm80', 'rate_bf24gsm70', 'rate_bf24gsm60', 'rate_bf24gsm50', 
'rate_bf26gsm120', 'rate_bf26gsm100', 'rate_bf26gsm90', 'rate_bf26gsm80', 'rate_bf26gsm70', 'rate_bf26gsm60', 'rate_bf26gsm50', 
'rate_bf28gsm120', 'rate_bf28gsm100', 'rate_bf28gsm90', 'rate_bf28gsm80', 'rate_bf28gsm70', 'rate_bf28gsm60', 'rate_bf28gsm50', 
'rate_bf30gsm120', 'rate_bf30gsm100', 'rate_bf30gsm90', 'rate_bf30gsm80', 'rate_bf30gsm70', 'rate_bf30gsm60', 'rate_bf30gsm50', 
'rate_bf32gsm120', 'rate_bf32gsm100', 'rate_bf32gsm90', 'rate_bf32gsm80', 'rate_bf32gsm70', 'rate_bf32gsm60', 'rate_bf32gsm50', 
'rate_bf34gsm120', 'rate_bf34gsm100', 'rate_bf34gsm90', 'rate_bf34gsm80', 'rate_bf34gsm70', 'rate_bf34gsm60', 'rate_bf34gsm50','rate_bf12_bit','rate_bf12'
])
    });

  var getAreaRatedetailsDataStore = new Ext.data.Store({
        id: 'getAreaRatedetailsDataStore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findAreaRateDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
'var_code', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm', 'arearate_bf14', 'arearate_bf16', 'arearate_bf18', 'arearate_bf20', 'arearate_bf22', 'arearate_bf24', 'arearate_bf26','arearate_bf28','arearate_bf30', 'arearate_bf32',  'arearate_othershades','arearate_gsmfrom', 'arearate_gsmto', 'arearate_gsmfrom2', 'arearate_gsmto2', 'arearate_extraamt2', 'arearate_gsmfrom3', 'arearate_gsmto3', 'arearate_extraamt3', 'arearate_gsmfrom4', 'arearate_gsmto4', 'arearate_extraamt4',  'arearate_sheet_extraamt',
'arearate_rate', 'arearate_crdays', 'arearate_cashdisc_per', 'arearate_cashdisc_days', 'arearate_gst_per', 'arearate_bf14_bit', 'arearate_bf16_bit', 'arearate_bf18_bit', 'arearate_bf20_bit', 'arearate_bf22_bit', 'arearate_bf24_bit', 'arearate_bf26_bit','arearate_bf28_bit','arearate_bf30_bit', 'arearate_bf32_bit','arearate_bitreel',
'area_bf18gsm120', 'area_bf18gsm100', 'area_bf18gsm90', 'area_bf18gsm80', 'area_bf18gsm70', 'area_bf18gsm60', 'area_bf18gsm50', 'area_bf20gsm120', 'area_bf20gsm100', 'area_bf20gsm90', 'area_bf20gsm80', 'area_bf20gsm70', 'area_bf20gsm60', 'area_bf20gsm50', 'area_bf22gsm120', 'area_bf22gsm100', 'area_bf22gsm90', 'area_bf22gsm80', 'area_bf22gsm70', 'area_bf22gsm60', 'area_bf22gsm50', 'area_bf24gsm120', 'area_bf24gsm100', 'area_bf24gsm90', 'area_bf24gsm80', 'area_bf24gsm70', 'area_bf24gsm60', 'area_bf24gsm50', 'area_bf26gsm120', 'area_bf26gsm100', 'area_bf26gsm90', 'area_bf26gsm80', 'area_bf26gsm70', 'area_bf26gsm60', 'area_bf26gsm50', 'area_bf28gsm120', 'area_bf28gsm100', 'area_bf28gsm90', 'area_bf28gsm80', 'area_bf28gsm70', 'area_bf28gsm60', 'area_bf28gsm50', 'area_bf30gsm120', 'area_bf30gsm100', 'area_bf30gsm90', 'area_bf30gsm80', 'area_bf30gsm70', 'area_bf30gsm60', 'area_bf30gsm50', 'area_bf32gsm120', 'area_bf32gsm100', 'area_bf32gsm90', 'area_bf32gsm80', 'area_bf32gsm70', 'area_bf32gsm60', 'area_bf32gsm50', 'area_bf34gsm120', 'area_bf34gsm100', 'area_bf34gsm90', 'area_bf34gsm80', 'area_bf34gsm70', 'area_bf34gsm60', 'area_bf34gsm50','arearate_gsm_fr_rate','arearate_gsm_br_rate'
])

    });


  var GetVarietyNameDatastore = new Ext.data.Store({
        id: 'GetVarietyNameDatastore',
        autoLoad : true,  
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "verietyname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_size1','var_size2','size3'])
    });



/*
var OverDueCheckDataStore = new Ext.data.Store({
        id: 'OverDueCheckDataStore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "CheckOverdue"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['c_code', 'c_name', 'c_allow_uptodate'])
    });
*/



var GetVarietyGroupDatastore = new Ext.data.Store({
        id: 'GetVarietyGroupDatastore',
       autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadVartyGroup"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_typecode'])
    });



var GetVarietylistDatastore = new Ext.data.Store({
        id: 'GetVarietylistDatastore',
       autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ApprovedVarietydetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_groupcode', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26','rate_bf28','rate_bf30', 'rate_bf32', 'rate_othershades', 'rate_gsmfrom', 'rate_gsmto', 'rate2_gsmfrom', 'rate2_gsmto', 'rate2_extraamt', 'rate3_gsmfrom', 'rate3_gsmto', 'rate3_extraamt', 'rate4_gsmfrom', 'rate4_gsmto', 'rate4_extraamt', 
'rate_rate', 'rate_crdays', 'rate_cashdisc_per', 'rate_cashdisc_days', 'rate_gst_per' , 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit','rate_bf28_bit','rate_bf30_bit', 'rate_bf32_bit','rate_price_terms'])
    });


var GetAreaVarietylistDatastore = new Ext.data.Store({
        id: 'GetAreaVarietylistDatastore',
       autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "AreaApprovedVarietydetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_groupcode', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26','rate_bf28','rate_bf30', 'rate_bf32', 'rate_othershades', 'rate_gsmfrom', 'rate_gsmto', 'rate2_gsmfrom', 'rate2_gsmto', 'rate2_extraamt', 'rate3_gsmfrom', 'rate3_gsmto', 'rate3_extraamt', 'rate4_gsmfrom', 'rate4_gsmto', 'rate4_extraamt', 
'rate_rate', 'rate_crdays', 'rate_cashdisc_per', 'rate_cashdisc_days', 'rate_gst_per' , 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit','rate_bf28_bit','rate_bf30_bit', 'rate_bf32_bit'])
    });

var GetGridDetailsDatastore = new Ext.data.Store({
        id: 'GetGridDetailsDatastore',
        autoLoad : true, 
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "griddetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_name','var_code','rate_code','var_unit','basicrate','rate_comm','disc_cash','disc_dealer','disc_reel_rebate','disc_regional',
'disc_additional','invupd1','invupd2','invupd3','invupd4','invupd5','qcdev','despdate'])
    });


var LoadordernoDetailsDatastore = new Ext.data.Store({
        id: 'LoadordernoDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadordernodetails1"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ordh_comp_code','ordh_fincode','ordh_sono','ordh_sodate','ordh_ref','ordh_refdt','ordh_party','ordh_type','ordh_trans','ordh_rep','ordh_tax','ordh_odiper',
'ordh_docu','ordh_bank','ordh_dest','ordh_can_stat','ordh_can_reason','ordh_cust_rem','ordh_our_rem','ordh_ins_yn','ordh_insper','ordh_agent',
'ordh_delivery_add1','ordh_delivery_add2','ordh_delivery_add3','ordh_delivery_city','ordh_delivery_pin','ordh_delivery_gst','ordh_gracedays','ordh_cashdisdays1',
'ordh_cashdisdays2','ordh_cashdisdays3','ordh_cashdisdays4','ordh_cashdisper1','ordh_cashdisper2','ordh_cashdisper3','ordh_cashdisper4','ordh_cashdisamt1',
'ordh_cashdisamt2','ordh_cashdisamt3','ordh_cashdisamt4','ordh_cgst','ordh_sgst','ordh_igst','cancelflag','cust_ref','tax_name',
'tax_sgst','tax_cgst','tax_igst','sup_name','repr_name','type_name','agentname','ordh_creditdays','ordh_gracedays','ordh_comm','ordh_apprno','ordh_appr_type',
'ordh_destination','ordh_payterm_30days_7days_receipt ' , 'ordh_payterm_60days_30days_receipt' , 'ordh_payterm_60days_45days_receipt','ordh_ratediff','ordh_payterm_90days_30days_receipt','ordh_payterm_90days_45days_receipt','ordh_payterm_90days_60days_receipt','ordh_payterm_90days_75days_receipt',
'ordh_payterm_60days_7days_receipt','ordh_payterm_45days_7days_receipt','ordh_payterm_45days_30days_receipt'
])
    });


var LoadordernoItemDetailsDatastore = new Ext.data.Store({
        id: 'LoadordernoItemDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadorderdetailstrailer"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ordt_comp_code','ordt_fincode','ordt_sono','ordt_var_code','ordt_qty','ordt_adv_qty','ordt_apprno','ordt_rate','ordt_cappr_no', ,'ordt_qcdev_yn','ordt_loss_pmt', 'ordt_despdt', 'ordt_crdays', 'ordt_clo_stat', 'ordt_clo_reason', 'ordt_adv_tag', 'ordt_des_tag', 'ordt_approved', 'ordt_ma_tag', 'var_code', 'var_name', 'var_grpcode', 'var_unit', 'var_size1', 'var_size2', 'var_reams', 'var_sheets','shade_shortname','ordt_stk_wt','ordt_stk_reels', 'var_tariffno','var_desc','var_typecode','var_bf','var_gsm','var_shade','var_inchcm','ordt_no_of_reels','ordt_fin_wt','ordt_inv_wt'
])
    });


function grid_tot(){

        var wt = 0;	
        var fwt = 0;	
        var iwt = 0;	

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.qty);
              fwt=fwt+Number(sel[i].data.finwt);
              iwt=iwt+Number(sel[i].data.invwt);
         }

         txtTotQty.setValue(Ext.util.Format.number(wt,'0.000'));
         txtFinQty.setValue(Ext.util.Format.number(fwt,'0.000'));
         txtInvQty.setValue(Ext.util.Format.number(iwt,'0.000'));

         if (fwt > 0)  
               Ext.getCmp('txtCustomer').setDisabled(true);  
         else
            Ext.getCmp('txtCustomer').setDisabled(false);  

}

var ishade = "NAT";
var isize  = "";


var cmbDestination = new Ext.form.ComboBox({
        fieldLabel      : 'Destination',
        width           : 150,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbDestination',
        typeAhead       : true,
        mode            : 'local',
        store           : ['SIVAKASI','THENI','VIRUDHUNAGAR','SIVAGANGAI'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{ 
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnPriceTermConfirm.focus();
             }
          } ,

             select: function () {
/*
               getsizes();
                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();

               if (cmbRB.getValue() == '2')            
                  Ext.getCmp('txtrate').setReadOnly(false);  
               else
                  Ext.getCmp('txtrate').setReadOnly(true);  
*/
              btnPriceTermConfirm.focus();

            }
        }
});
    


var cmbRB = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbRB',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','REELS'],['2','BUNDLES']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
	enableKeyEvents: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{ 

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbSizeList.focus();
             }
          } ,
             select: function () {
               getsizes();
                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();

/*
               if (cmbRB.getValue() == '2')            
                  Ext.getCmp('txtrate').setReadOnly(false);  
               else
                  Ext.getCmp('txtrate').setReadOnly(true);  

*/

            }
        }
});
       

var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : 'S.O. No.',
        width           : 100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
       style : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
             select: function () {

                         flxDetail.getStore().removeAll();

		         LoadordernoDetailsDatastore.load({

				url: 'ClsTrnSalesOrder.php',
				params: {
				    task: 'loadordernodetails1',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    ordno:cmbSONo.getValue()
                                },
                           	callback:function()
				{
//alert(LoadordernoDetailsDatastore.getAt(0).get('ordh_creditdays'));

                                 cmbvarietylist.setDisabled(false); 
                                 Ext.getCmp('pt').setDisabled(false);    

                      
                                if (cmbSONo.getValue() == 1000 || cmbSONo.getValue() == 1001)
                                    Ext.getCmp('txtrate').setReadOnly(false);  
                                else
                                    Ext.getCmp('txtrate').setReadOnly(true);  




                                if (LoadordernoDetailsDatastore.getAt(0).get('ordh_appr_type') == "A")
                                {     
                                    cust_area_price = 'area';
                                    cust_area_priceType = 'A';
                                    cmbAreaPriceno.show();
                                    cmbPriceno.hide();
                                    cmbAreaPriceno.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_apprno'));  
                                    cmbAreaPriceno.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_apprno')); 
                                }                            
                                else
                                {     
                                    cust_area_price = 'cust';
                                    cust_area_priceType = 'C'; 
                                    cmbAreaPriceno.hide();
                                    cmbPriceno.show();
                                  cmbPriceno.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_apprno'));  
                                  cmbPriceno.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_apprno')); 
                                }                            



                                  txtSONo.setValue(cmbSONo.getValue());
                                  dptSONo.setRawValue(Ext.util.Format.date(LoadordernoDetailsDatastore.getAt(0).get('ordh_sodate'),"d-m-Y"));                  
                                  repcode = LoadordernoDetailsDatastore.getAt(0).get('ordh_rep');
                    
                                  taxcode = LoadordernoDetailsDatastore.getAt(0).get('ordh_tax');

                                  txtCustomer.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('cust_ref'));   
                           
                                  custcode  = LoadordernoDetailsDatastore.getAt(0).get('ordh_party'); 

                                  cmbPO.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_ref'));  
                                  txtCommission.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_comm'));  
                                  cmbDestination.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_destination')); 
                                  dptPO.setRawValue(Ext.util.Format.date(LoadordernoDetailsDatastore.getAt(0).get('ordh_refdt'),"d-m-Y"));
                                  cmbTax.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_tax'));
                                  txtCgstPer.setValue(LoadordernoDetailsDatastore.getAt(0).get('tax_cgst'));          
                                  txtSgstPer.setValue(LoadordernoDetailsDatastore.getAt(0).get('tax_sgst'));
                                  txtIgstPer.setValue(LoadordernoDetailsDatastore.getAt(0).get('tax_igst'));
                               
                                  txtPayTerms.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_creditdays')); 

                                  txtGraceDays.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_gracedays')); 
//alert(LoadordernoDetailsDatastore.getAt(0).get('ordh_ins_yn'));
            
                                  txtCustIns.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_cust_rem'));

                                  if (LoadordernoDetailsDatastore.getAt(0).get('ordh_ins_yn') == "Y")
                                  {
                               	        cmbInsYN.setRawValue('YES');
                               	        cmbInsYN.setValue('YES');
                                  }
                                  else
                                  {
                              	        cmbInsYN.setRawValue('NO');
                              	        cmbInsYN.setValue('NO');

                                  }
                                  txtInsPer.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_insper'));
                                  txtAddr1.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_add1')); 
                                  txtAddr2.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_add2')); 
                                  txtAddr3.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_add3')); 
                                  txtAddr4.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_city')); 
                                  txtPin.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_pin')); 
                                  txtGstNo.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_delivery_gst')); 

                                  txtCashDiscMT_7Days_30dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_30days_7days_receipt '));  

                                  txtCashDiscMT_7Days_60dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_60days_7days_receipt'));  
                                  txtCashDiscMT_30Days_60dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_60days_30days_receipt'));  
                                  txtCashDiscMT_45Days_60dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_60days_45days_receipt')); 



                                  txtCashDiscMT_7Days_90dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_90days_7days_receipt')); 
                                  txtCashDiscMT_30Days_90dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_90days_30days_receipt')); 
                                  txtCashDiscMT_45Days_90dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_90days_45days_receipt')); 
                                  txtCashDiscMT_60Days_90dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_90days_60days_receipt')); 
                                  txtCashDiscMT_75Days_90dayPT.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_payterm_90days_75days_receipt')); 

 
                                  txtRateDiff.setValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_ratediff'));  
                                  priceConfirm();
                   
                                } 
                             });

		             LoadordernoItemDetailsDatastore.load({

				url: 'ClsTrnSalesOrder.php',
				params: {
				    task: 'loadorderdetailstrailer',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    ordno:cmbSONo.getValue()
                                },
                           	callback:function()
				{

                                   var cnt=LoadordernoItemDetailsDatastore.getCount();
	                           if(cnt>0)
		                       {    





//                                          cmbPriceno.setValue(LoadordernoItemDetailsDatastore.getAt(0).get('ordt_apprno'));  
//                                          cmbPriceno.setRawValue(LoadordernoItemDetailsDatastore.getAt(0).get('ordt_apprno')); 
                           
                                          if (LoadordernoItemDetailsDatastore.getAt(0).get('ordt_adv_qty') > 0)
                                          {
                                                 alert("Despatch Advice Raised.  You cannot Modify...");
                                                  Ext.getCmp('save').setDisabled(false);
                                          } 

                                          for(var j=0; j<cnt; j++)
 		                          { 
                                            var RowCnt    = flxDetail.getStore().getCount() + 1;   
/*
                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "NS")
                                            {   
                                                ishade  = "NAT";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "DP")
                                            {   
                                                ishade  = "DP";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "GY")
                                            {   
                                                ishade  = "GYT";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "SY")
                                            {   
                                                ishade  = "SHYS";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "GB")
                                            {   
                                                ishade  = "GREY-BRD";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "VV")
                                            {   
                                                ishade  = "SHVV+";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "BB")
                                            {   
                                                ishade  = "BB";
                                            }
*/



                                            ishade  = LoadordernoItemDetailsDatastore.getAt(j).get('shade_shortname');

                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_inchcm') == "I")
                                            {   
                                                isize  = "Inch";
                                            }
                                            else
                                            {   
                                                isize  = "CM";
                                            }


                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_unit') == "1")
                                               displaysize =  LoadordernoItemDetailsDatastore.getAt(j).get('var_size2') 
                                            else
    
                                               displaysize =  LoadordernoItemDetailsDatastore.getAt(j).get('var_size1') 
+"X"+ LoadordernoItemDetailsDatastore.getAt(j).get('var_size2')  
                                            flxDetail.getStore().insert(
	                                       flxDetail.getStore().getCount(),
                                                 
	                                       new dgrecord({
                                                   sno       : j+1,         
						   varname   : LoadordernoItemDetailsDatastore.getAt(j).get('var_desc'),
						   varcode   : LoadordernoItemDetailsDatastore.getAt(j).get('var_grpcode'),
						   shade     : ishade,
				                   bf        : LoadordernoItemDetailsDatastore.getAt(j).get('var_bf'),
						   gsm       : LoadordernoItemDetailsDatastore.getAt(j).get('var_gsm'),
						   rate      : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_rate'),
						   sizein    : isize,
//						   size      : LoadordernoItemDetailsDatastore.getAt(j).get('var_size2'),
						   size      : displaysize,

						   sizecode  : LoadordernoItemDetailsDatastore.getAt(j).get('var_code'),
						   qty       : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_qty'),
                                                   reels     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_no_of_reels'),
						   despdate  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_despdt'),
						   finwt     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_fin_wt'),
						   invwt     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_inv_wt'),
						   soclose   : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_clo_stat'),
						   closereason  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_clo_reason'),
						   gdstkwt   : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_stk_wt'),
						   gdstkreels  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_stk_reels'),
	                                       })
                               	            );
                grid_tot();

		GetVarietylistDatastore.load({
                        url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
                        params:
                            {
                                task:"ApprovedVarietydetails",
                                finid:  GinFinid ,
                                compcode: Gincompcode,
                                apprno:  cmbPriceno.getRawValue()       
                            },
                         callback:function()
                           {

                           }
               });

                                      }
                                  }

                                }
                             });
                    }
              }
                       

});
	
var cmbPO = new Ext.form.ComboBox({
        fieldLabel      : 'PO No. ',
        width           : 200,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbPO',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Phone Order','E-Mail ','Letter'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
			const input = document.getElementById('dptPO');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
		     }
		  }  
        }  


});


var cmbSizetype = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbSizetype',
        typeAhead       : true,
        mode            : 'local',
        store           :  [['I','Inch'],['C','CM']],  
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbRB.focus();
             }
          } ,
        select: function(){

                getsizes();
                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();

                     }

		   }
});




var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        hiddenName      : '',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {


          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbSizetype.focus();
             }
          },
            select: function ()  
           {

        cmbSizeList.reset();

        loadSizeDataStore.removeAll();

                getShadeCodeDataStore.removeAll();
        
                getShadeCodeDataStore.load({
                    url: 'ClsTrnSalesOrder.php', // File to connect to
                    params:
                            {
                                task: "findShadecode",
                                shadecode :cmbShade.getValue()
                            },
                    callback: function () {


                        var cnt = getShadeCodeDataStore.getCount(); 
                        if (cnt > 0) 
                        {
                            shade  = getShadeCodeDataStore.getAt(0).get('shade_shortcode');

//alert(shade);
       getsizes();

                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();
                        }  
                        else 
                        {
                           alert('not found');
                        }

                   }
                });


              }
        } 
   });


var rateitemcode;

 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSize.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
    });



var cmbPriceno = new Ext.form.ComboBox({
        fieldLabel      : 'Price Ent.No',
        width           : 80,
        displayField    : 'rate_code', 
        valueField      : 'rate_code',
        hiddenName      : '',
        id              : 'cmbPriceno',
        typeAhead       : true,
        mode            : 'local',
        store           : GetRatecodeDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
      labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
       enableKeyEvents: true,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtCommission.focus();         
             }
        },    
        select: function(){

		GetVarietylistDatastore.load({
                        url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
                        params:
                            {
                                task:"ApprovedVarietydetails",
                                finid    : GinFinid ,
                                compcode : Gincompcode,
                                apprno   : cmbPriceno.getRawValue()       
                            },
                         callback:function()
                           {

/*   

                           txtPayTerms.setValue(GetVarietylistDatastore.getAt(0).get('rate_price_terms'));

//alert(GetVarietylistDatastore.getAt(0).get('rate_price_terms'));

                           if (GetVarietylistDatastore.getAt(0).get('rate_price_terms') <= 7)
                           {
//	                        txtPayTerms.setDisabled(true);   
				//txtGraceDays.setDisabled(true);                            
                           }
                           else
                           {
	                        txtPayTerms.setDisabled(false);   
				txtGraceDays.setDisabled(false);                            
                           }
*/
                           }
               }); 
		
        }
    }

});


var cmbAreaPriceno = new Ext.form.ComboBox({
        fieldLabel      : 'Price Ent.No',
        width           : 80,
        displayField    : 'rate_code', 
        valueField      : 'rate_code',
        hiddenName      : '',
        id              : 'cmbAreaPriceno',
        typeAhead       : true,
        mode            : 'local',
        store           : GetAreaRatecodeDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
      labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
             enableKeyEvents: true, 
    listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtCommission.focus();         
             }
        },  
        select: function(){

//alert(cmbPriceno.getRawValue());
//alert(rateitemcode);

		GetAreaVarietylistDatastore .load({
                        url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
                        params:
                            {
                                task:"AreaApprovedVarietydetails",
                                finid:  GinFinid ,
//                                finid:   cmbPriceno.getValue(),

                                compcode: Gincompcode,
                                apprno:  cmbAreaPriceno.getRawValue()       
                            },
                         callback:function()
                           {
  //alert('ok');
             //              txtPayTerms.setValue(GetVarietylistDatastore.getAt(0).get('rate_crdays'));
                           }
               }); 
			
        }
    }

});


function find_vartygroup()
{

	GetVarietyGroupDatastore .load({
        url: 'ClsTrnSalesOrder.php',
        params:
            {
                task:"loadVartyGroup",
                varty   :  cmbvarietylist.getValue() ,
       
            },
	 callback:function()
	    {
               var cnt=GetVarietyGroupDatastore.getCount();
               vargrpcode = 0;
               if (cnt >0)                     
                  vargrpcode = Number(GetVarietyGroupDatastore.getAt(0).get('var_typecode'));

//alert(vargrpcode);
            }
         });   
}


var cmbvarietylist = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 130,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbvarietylist',
        typeAhead       : true,
        mode            : 'local',
        store           : 'GetVarietylistDatastore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
	enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  varietycode = cmbvarietylist.getValue();
                  find_vartygroup();

                  if (varietycode > 0) 
                     cmbShade.focus();
             }
          },

        select: function(){
                varietycode = cmbvarietylist.getValue();
                find_vartygroup();
                getsizes();
                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();

                     }

		   }

});


var rate = 0;
var gsm = 0;
var bf  = 0;

var gsmfrom1 = 0;
var gsmfrom2 = 0;
var gsmfrom3 = 0;
var gsmfrom4 = 0;
var gsmfrom5 = 0;
var gsmto1   = 0;
var gsmto2   = 0;
var gsmto3   = 0;
var gsmto4   = 0;
var gsmto5   = 0;
var extraamt =0;

function get_ratedetails() {

        if (cmbShade.getValue() > 0 )
        {
	getRatedetailsDataStore.load({
        url: 'ClsTrnSalesOrder.php',
        params:
            {
                task:"findRateDetails",
		finid      : GinFinid ,
//		finid      : cmbPriceno.getValue() ,
		compcode   : Gincompcode,
                apprno     : cmbPriceno.getRawValue(),
                varty      : cmbvarietylist.getValue() ,
                shade      : cmbShade.getRawValue() ,
                vargrpcode : vargrpcode,
        
            },
	 callback:function()
	    {

                var cnt=getRatedetailsDataStore.getCount();


                if (cnt ==0)
                {
                    alert("Rate Details Not Available for this Quality / Shade. Please check in Rate Master");
                }
                else
                {

//Modified on 08/08/24 for QUALITY checking (ie KRAFT / BLUE BOARD)

                rate =0;
                extraamt = 0;
                txtBF.setValue(getRatedetailsDataStore.getAt(0).get('var_bf'));
                txtGSM.setValue(getRatedetailsDataStore.getAt(0).get('var_gsm'));
                bf  = getRatedetailsDataStore.getAt(0).get('var_bf');
                gsm = Number(getRatedetailsDataStore.getAt(0).get('var_gsm'));

//alert(bf);
//alert(getRatedetailsDataStore.getAt(0).get('var_typecode'));

                  if (getRatedetailsDataStore.getAt(0).get('var_typecode')  == 14)
                  {
// 18BF
			if (bf == 18 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm120'));
			} 
			else if (bf == 18 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm100'));
			}    
			else if (bf == 18 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm90'));
			}    
			else if (bf == 18 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm80'));
			}    
			else if (bf == 18 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm70'));
			}    
			else if (bf == 18 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm60'));
			}    
			else if (bf == 18 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18gsm50'));
			}    


// 20BF
			if (bf == 20 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm120'));
			} 
			else if (bf == 20 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm100'));
			}    
			else if (bf == 20 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm90'));
			}    
			else if (bf == 20 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm80'));
			}    
			else if (bf == 20 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm70'));
			}    
			else if (bf == 20 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm60'));
			}    
			else if (bf == 20 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20gsm50'));
			} 
// 22BF
			if (bf == 22 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm120'));
			} 
			else if (bf == 22 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm100'));
			}    
			else if (bf == 22 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm90'));
			}    
			else if (bf == 22 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm80'));
			}    
			else if (bf == 22 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm70'));
			}    
			else if (bf == 22 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm60'));
			}    
			else if (bf == 22 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22gsm50'));
			} 

//24 BF
		        if (bf == 24 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm120'));
			} 
			else if (bf == 24 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm100'));
			}    
			else if (bf == 24 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm90'));
			}    
			else if (bf == 24 && gsm == 80 )
			{

            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm80'));
			}    
			else if (bf == 24 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm70'));
			}    
			else if (bf == 24 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm60'));
			}    
			else if (bf == 24 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24gsm50'));
			} 


// 26BF
			if (bf == 26 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm120'));
			} 
			else if (bf == 26 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm100'));
			}    
			else if (bf == 26 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm90'));
			}    
			else if (bf == 26 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm80'));
			}    
			else if (bf == 26 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm70'));
			}    
			else if (bf == 26 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm60'));
			}    
			else if (bf == 26 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26gsm50'));
			} 

// 28BF
			if (bf == 28 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm120'));
			} 
			else if (bf == 28 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm100'));
			}    
			else if (bf == 28 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm90'));
			}    
			else if (bf == 28 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm80'));
			}    
			else if (bf == 28 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm70'));
			}    
			else if (bf == 28 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm60'));
			}    
			else if (bf == 28 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28gsm50'));
			} 

// 30BF
			if (bf == 30 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm120'));
			} 
			else if (bf == 30 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm100'));
			}    
			else if (bf == 30 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm90'));
			}    
			else if (bf == 30 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm80'));
			}    
			else if (bf == 30 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm70'));
			}    
			else if (bf == 30 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm60'));
			}    
			else if (bf == 30 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30gsm50'));
			} 

// 32BF
			if (bf == 32 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm120'));
			} 
			else if (bf == 32 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm100'));
			}    
			else if (bf == 32 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm90'));
			}    
			else if (bf == 32 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm80'));
			}    
			else if (bf == 32 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm70'));
			}    
			else if (bf == 32 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm60'));
			}    
			else if (bf == 32 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf32gsm50'));
			} 

// 34BF
			if (bf == 34 && gsm == 120 )
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm120'));
			} 
			else if (bf == 34 && gsm == 100 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm100'));
			}    
			else if (bf == 34 && gsm == 90 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm90'));
			}    
			else if (bf == 34 && gsm == 80 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm80'));
			}    
			else if (bf == 34 && gsm == 70 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm70'));
			}    
			else if (bf == 34 && gsm == 60 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm60'));
			}    
			else if (bf == 34 && gsm == 50 )
			{
            		   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf34gsm50'));
			} 


                        txtrate.setValue(rate);
                        txtrate.setValue(Number(rate)+Number(ExtraAmt_PT));
                  }
//KRAFT
                else
                {    



      // alert(getRatedetailsDataStore.getAt(0).get('rate_bf30'));

                                                                  
                 
                gsmfrom1 = Number(getRatedetailsDataStore.getAt(0).get('rate_gsmfrom'));
                gsmfrom2 = Number(getRatedetailsDataStore.getAt(0).get('rate2_gsmfrom'));
                gsmfrom3 = Number(getRatedetailsDataStore.getAt(0).get('rate3_gsmfrom'));
                gsmfrom4 = Number(getRatedetailsDataStore.getAt(0).get('rate4_gsmfrom'));
                gsmfrom5 = Number(getRatedetailsDataStore.getAt(0).get('rate5_gsmfrom'));

                gsmto1   = Number(getRatedetailsDataStore.getAt(0).get('rate_gsmto'));
		gsmto2   = Number(getRatedetailsDataStore.getAt(0).get('rate2_gsmto'));
		gsmto3   = Number(getRatedetailsDataStore.getAt(0).get('rate3_gsmto'));
		gsmto4   = Number(getRatedetailsDataStore.getAt(0).get('rate4_gsmto'));
		gsmto5   = Number(getRatedetailsDataStore.getAt(0).get('rate5_gsmto'));


//alert("extraamt");
//alert(extraamt);
//alert(gsmfrom2);
//alert(gsmto2);


    //            if (getRatedetailsDataStore.getAt(0).get('var_typecode') != 1) 
//                {
  //                  rate = getRatedetailsDataStore.getAt(0).get('rate_rate');
     //           }
       //         else
         //       {

//              if ( Number(bf) == 0) 


//              {
                   if (gsm >= gsmfrom1 && gsm <= gsmto1)
                   {
                       extraamt = 0;
                   }                  
		   else if (gsm >= gsmfrom2 && gsm <= gsmto2 && bf > 0)
			{
			extraamt = getRatedetailsDataStore.getAt(0).get('rate2_extraamt');
			}
		   else if (gsm >= gsmfrom3 && gsm <= gsmto3 && bf > 0)
			{
			extraamt = getRatedetailsDataStore.getAt(0).get('rate3_extraamt');
			}
		   else if (gsm >= gsmfrom4 && gsm <= gsmto4 && bf > 0)
			{
			extraamt = getRatedetailsDataStore.getAt(0).get('rate4_extraamt');
			}
		   else if (gsm >= gsmfrom5 && gsm <= gsmto5 && bf > 0)
			{
			extraamt = getRatedetailsDataStore.getAt(0).get('rate5_extraamt');
			}
//                 }

//alert(extraamt);
//alert(cmbSizeList.getRawValue());

//alert(cmbShade.getValue() );
//alert(getRatedetailsDataStore.getAt(0).get('rate_bf16'));

                 if (cmbShade.getValue() != 1 && bf > 0 )
                 {
                      extraamt = Number(extraamt)+ Number(getRatedetailsDataStore.getAt(0).get('rate_othershades'));
//alert("shade");
//alert(extraamt);
                 }


                 if (cmbRB.getRawValue() == "BUNDLES")
                 {
                      extraamt = Number(extraamt)+ Number(getRatedetailsDataStore.getAt(0).get('rate_sheet_extraamt'));
                 }



//FOR SIZE CONDITION 
//alert(cmbSizeList.getRawValue());
                if (cmbSizeList.getRawValue() != '')   
                {  
//start
//alert(cmbRB.getRawValue());
                if (cmbRB.getRawValue() == "BUNDLES" && bf == 0 )
                {
//alert("bun Rate");
//alert(getRatedetailsDataStore.getAt(0).get('rate_rate'));
                  rate = Number(getRatedetailsDataStore.getAt(0).get('rate_rate'))+Number(extraamt);
                  txtrate.setValue(rate);
                }
                else
                {     
                if ((cmbSizetype.getValue() == "I" && Number(cmbSizeList.getRawValue())) > 16 || (cmbSizetype.getValue() == "C" && Number(cmbSizeList.getRawValue()) > 41))  
                {



                 if (sotype == 'S')
                 { 
                      extraamt = Number(extraamt)+ 1000;
                 } 


			if (bf == 0)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_rate')) + Number(extraamt);
			} 
			else if (bf == 12)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf12'))+Number(extraamt);
			}   
			else if (bf == 14)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf14'))+Number(extraamt);
			}    
			else if (bf == 16)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf16'))+Number(extraamt);

//alert(rate);
			}   
			else if (bf == 18)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18'))+Number(extraamt);
			}  
			else if (bf == 20)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20'))+Number(extraamt);
			}  
			else if (bf == 22)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22'))+Number(extraamt);
			}  
			else if (bf == 24)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24'))+Number(extraamt);
			}  
			else if (bf == 26)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26'))+Number(extraamt);
			}  
			else if (bf == 28)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28'))+Number(extraamt);
			}    
			else if (bf == 30)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30'))+Number(extraamt);
			}    

                       txtrate.setValue(rate);
          
                  }
                  else
                {

//Modified on 26/09/24 informed by Mrs.Suganya for Remove Rs.1000/- Extra for Bit Reels 
/*
                 if (sotype == 'S')
                 { 
                      extraamt = Number(extraamt)+ 1000;
                 } 
*/

			if (bf == 0)
			{
			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bitreel')) + Number(extraamt);
			   
			} 
			else if (bf == 12)
			{

////Modified on 27/11/24 informed by Mrs.Suganya for Add  Rs.1000/- Extra for Bit Reels with BF  
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf12_bit'))+Number(extraamt);
			}    
			else if (bf == 14)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf14_bit'))+Number(extraamt);

			}    
			else if (bf == 16)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf16_bit'))+Number(extraamt);

			}   
			else if (bf == 18)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf18_bit'))+Number(extraamt);

			}  
			else if (bf == 20)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf20_bit'))+Number(extraamt);

			}  
			else if (bf == 22)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf22_bit'))+Number(extraamt);

			}  
			else if (bf == 24)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf24_bit'))+Number(extraamt);

			}  
			else if (bf == 26)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf26_bit'))+Number(extraamt);

			}  
			else if (bf == 28)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf28_bit'))+Number(extraamt);
			}    
			else if (bf == 30)
			{
                           if (sotype == 'S')
                           { 
			      extraamt = Number(extraamt)+ 1000;
			    } 

			   rate = Number(getRatedetailsDataStore.getAt(0).get('rate_bf30_bit'))+Number(extraamt);

			}    
                       txtrate.setValue(rate);

                  }

               }


  //end

          }

//for SAPTAGIRI GROUP - If destination not SIVAKASI - 500/- Reduced from Rate
                       if (areacode == 24 &&  cmbDestination.getRawValue() != "SIVAKASI" && txtrate.getValue() > 5000)
                       {  
                          txtrate.setValue(Number(rate)+Number(ExtraAmt_PT) -500 );
                       }  
//Modified on 27/09/24 As per approval 
//432	SRI SAKTHI PAPER CONVERTORS-COIMBARORE if Destination is SIVAKASI - Extra Rs.500/-
                       else if (custcode == 432 &&  cmbDestination.getRawValue() == "SIVAKASI" && txtrate.getValue() > 5000)
                       {  
                          txtrate.setValue(Number(rate)+Number(ExtraAmt_PT) + 500 );
                       }  
                       else
                       {
                           if ( txtrate.getValue() > 0)
                             txtrate.setValue(Number(rate)+Number(ExtraAmt_PT));
                       } 




                if ( areacode == 24 && bf == 0 && gsm >= 150  && gsm <= 180 && cmbSizetype.getValue() == "I" && Number(cmbSizeList.getRawValue()) >= 17 &&  Number(cmbSizeList.getRawValue()) <= 21 )
                {
                    txtrate.setValue(getRatedetailsDataStore.getAt(0).get('rate_bf14') );

                }       

               }
              }
	    }
        }); 
      //  getsizes();
     }
     else
     {
        alert("Select Shade Type...");
     }      
}



function get_ratedetails_Area() {

        if (cmbShade.getValue() > 0 )
        {
	getAreaRatedetailsDataStore.load({
        url: 'ClsTrnSalesOrder.php',
        params:
            {
                task:"findAreaRateDetails",
		finid   :  GinFinid ,
		compcode:  Gincompcode,
                apprno  :  cmbAreaPriceno.getRawValue(),
                varty   :  cmbvarietylist.getValue() ,
                shade   :  cmbShade.getRawValue() ,  
                vargrpcode : vargrpcode,  
            },
	 callback:function()
	    {

                var cnt=getAreaRatedetailsDataStore.getCount();


                if (cnt ==0)
                {
                    alert("Rate Details Not Available for this Quality / Shade. Please check in Rate Master");
                }
                else
                {

                rate =0;
                extraamt = 0;
                txtBF.setValue(getAreaRatedetailsDataStore.getAt(0).get('var_bf'));
                txtGSM.setValue(getAreaRatedetailsDataStore.getAt(0).get('var_gsm'));
                bf  = getAreaRatedetailsDataStore.getAt(0).get('var_bf');               
                gsm = Number(getAreaRatedetailsDataStore.getAt(0).get('var_gsm'));


                  if (getAreaRatedetailsDataStore.getAt(0).get('var_typecode')  == 14)
                  {

// 18BF
			if (bf == 18 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm120'));
			} 
			else if (bf == 18 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm100'));
			}    
			else if (bf == 18 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm90'));
			}    
			else if (bf == 18 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm80'));
			}    
			else if (bf == 18 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm70'));
			}    
			else if (bf == 18 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm60'));
			}    
			else if (bf == 18 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf18gsm50'));
			}    


// 20BF
			if (bf == 20 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm120'));
			} 
			else if (bf == 20 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm100'));
			}    
			else if (bf == 20 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm90'));
			}    
			else if (bf == 20 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm80'));
			}    
			else if (bf == 20 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm70'));
			}    
			else if (bf == 20 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm60'));
			}    
			else if (bf == 20 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf20gsm50'));
			} 
// 22BF
			if (bf == 22 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm120'));
			} 
			else if (bf == 22 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm100'));
			}    
			else if (bf == 22 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm90'));
			}    
			else if (bf == 22 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm80'));
			}    
			else if (bf == 22 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm70'));
			}    
			else if (bf == 22 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm60'));
			}    
			else if (bf == 22 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf22gsm50'));
			} 

//24 BF
		        if (bf == 24 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm120'));
			} 
			else if (bf == 24 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm100'));
			}    
			else if (bf == 24 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm90'));
			}    
			else if (bf == 24 && gsm == 80 )
			{

            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm80'));
			}    
			else if (bf == 24 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm70'));
			}    
			else if (bf == 24 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm60'));
			}    
			else if (bf == 24 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf24gsm50'));
			} 


// 26BF
			if (bf == 26 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm120'));
			} 
			else if (bf == 26 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm100'));
			}    
			else if (bf == 26 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm90'));
			}    
			else if (bf == 26 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm80'));
			}    
			else if (bf == 26 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm70'));
			}    
			else if (bf == 26 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm60'));
			}    
			else if (bf == 26 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf26gsm50'));
			} 

// 28BF
			if (bf == 28 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm120'));
			} 
			else if (bf == 28 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm100'));
			}    
			else if (bf == 28 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm90'));
			}    
			else if (bf == 28 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm80'));
			}    
			else if (bf == 28 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm70'));
			}    
			else if (bf == 28 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm60'));
			}    
			else if (bf == 28 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf28gsm50'));
			} 

// 30BF
			if (bf == 30 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm120'));
			} 
			else if (bf == 30 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm100'));
			}    
			else if (bf == 30 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm90'));
			}    
			else if (bf == 30 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm80'));
			}    
			else if (bf == 30 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm70'));
			}    
			else if (bf == 30 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm60'));
			}    
			else if (bf == 30 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf30gsm50'));
			} 

// 32BF
			if (bf == 32 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm120'));
			} 
			else if (bf == 32 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm100'));
			}    
			else if (bf == 32 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm90'));
			}    
			else if (bf == 32 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm80'));
			}    
			else if (bf == 32 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm70'));
			}    
			else if (bf == 32 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm60'));
			}    
			else if (bf == 32 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf32gsm50'));
			} 

// 34BF
			if (bf == 34 && gsm == 120 )
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm120'));
			} 
			else if (bf == 34 && gsm == 100 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm100'));
			}    
			else if (bf == 34 && gsm == 90 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm90'));
			}    
			else if (bf == 34 && gsm == 80 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm80'));
			}    
			else if (bf == 34 && gsm == 70 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm70'));
			}    
			else if (bf == 34 && gsm == 60 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm60'));
			}    
			else if (bf == 34 && gsm == 50 )
			{
            		   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('area_bf34gsm50'));
			} 



                        txtrate.setValue(rate);
                        txtrate.setValue(Number(rate)+Number(ExtraAmt_PT));

                  }
                  else
                {    

                gsmfrom1 = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmfrom'));
                gsmfrom2 = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmfrom2'));
                gsmfrom3 = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmfrom3'));
                gsmfrom4 = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmfrom4'));
                gsmto1   = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmto'));
		gsmto2   = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmto2'));
		gsmto3   = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmto3'));
		gsmto4   = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsmto4'));




                   if (gsm >= gsmfrom1 && gsm <= gsmto1)
                   {
                       extraamt = 0;
                   }                  
		   else if (gsm >= gsmfrom2 && gsm <= gsmto2)
			{
			extraamt = getAreaRatedetailsDataStore.getAt(0).get('arearate_extraamt2');
			}
		   else if (gsm >= gsmfrom3 && gsm <= gsmto3)
			{
			extraamt = getAreaRatedetailsDataStore.getAt(0).get('arearate_extraamt3');
			}
		   else if (gsm >= gsmfrom4 && gsm <= gsmto4)
			{
			extraamt = getAreaRatedetailsDataStore.getAt(0).get('arearate_extraamt4');
			}




//alert(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf16'));

                 if (cmbShade.getValue() != 1)
                 {
                      extraamt = Number(extraamt)+ Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_othershades'));
//alert(extraamt);
                 }

// for BUNDLE RATE

                 if (cmbRB.getRawValue() == "BUNDLES")
                 {
                      extraamt = Number(extraamt)+ Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_sheet_extraamt'));
//alert(extraamt);
                 }


//FOR SIZE CONDITION 

                if (cmbSizeList.getRawValue() > 0)   
                {  
                if ((cmbSizetype.getValue() == "I" && Number(cmbSizeList.getRawValue())) > 16 || (cmbSizetype.getValue() == "C" && Number(cmbSizeList.getRawValue()) > 41))  
                {

                 if (sotype == 'S')
                      extraamt = Number(extraamt)+ 1000;

			if (bf == 0)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsm_fr_rate')) + Number(extraamt);
			} 
			else if (bf == 14)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf14'))+Number(extraamt);
			}    
			else if (bf == 16)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf16'))+Number(extraamt);

//alert(rate);
			}   
			else if (bf == 18)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf18'))+Number(extraamt);
			}  
			else if (bf == 20)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf20'))+Number(extraamt);
			}  
			else if (bf == 22)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf22'))+Number(extraamt);
			}  
			else if (bf == 24)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf24'))+Number(extraamt);
			}  
			else if (bf == 26)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf26'))+Number(extraamt);
			}  
			else if (bf == 28)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf28'))+Number(extraamt);
			}    
			else if (bf == 30)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf30'))+Number(extraamt);
			}    

                       txtrate.setValue(rate);
                  }
                  else
                {
			if (bf == 0)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_gsm_br_rate')) + Number(extraamt);
			} 
			else if (bf == 14)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf14_bit'))+Number(extraamt);
			}    
			else if (bf == 16)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf16_bit'))+Number(extraamt);
//alert(rate);
			}   
			else if (bf == 18)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf18_bit'))+Number(extraamt);
			}  
			else if (bf == 20)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf20_bit'))+Number(extraamt);
			}  
			else if (bf == 22)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf22_bit'))+Number(extraamt);
			}  
			else if (bf == 24)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf24_bit'))+Number(extraamt);
			}  
			else if (bf == 26)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf26_bit'))+Number(extraamt);
			}  
			else if (bf == 28)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf28_bit'))+Number(extraamt);
			}    
			else if (bf == 30)
			{
			   rate = Number(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf30_bit'))+Number(extraamt);
			}    
                       txtrate.setValue(rate);

                  }





               }
                       if (areacode == 24 &&  cmbDestination.getRawValue() != "SIVAKASI" && txtrate.getValue() > 5000)
                       {  
                          txtrate.setValue(arearate_bf14 );
                       }  
                       else
                       {
                           if ( txtrate.getValue() > 0)
                             txtrate.setValue(Number(rate)+Number(ExtraAmt_PT));
                       } 


                if ( areacode == 24 && bf == 0 && gsm >= 150  && gsm <= 180 && cmbSizetype.getValue() == "I" && Number(cmbSizeList.getRawValue()) >= 17 &&  Number(cmbSizeList.getRawValue()) <= 21 )
                {

                    txtrate.setValue(getAreaRatedetailsDataStore.getAt(0).get('arearate_bf14') );

                }       
    



              }
             }  
	    }
        }); 
      //  getsizes();
     }
     else
     {
        alert("Select Shade Type...");
     }      
}

function get_godownStock()
{

        var size_cm = 0;
        var size_in = 0;

        var size_cm_from = 0;
        var size_cm_to = 0;

        var size_in_from = 0;
        var size_in_to = 0;


        if (cmbSizetype.getValue() == "I")
        {
           size_cm = (cmbSizeList.getRawValue()*2.54).toFixed(0);
           size_in = cmbSizeList.getRawValue();
           size_in_from = Number(size_in_from)+1
           size_in_from = (Number(size_in_from)*2.54).toFixed(0);

        }    
        else
        {
           size_cm = cmbSizeList.getRawValue();
           size_in = (cmbSizeList.getRawValue()/2.54).toFixed(2);

        }    
  
        
           
        loadGodownStockDataStore.removeAll();
	loadGodownStockDataStore.load({
        url: 'ClsTrnSalesOrder.php',
        params:
            {
                task:"loadGodownStock",
                compcode    : Gincompcode,
                varietycode : varietycode,
                size_cm     : size_cm, 
                size_in     : size_in, 
            },
	 callback:function()
	    {
		txtGodownReels.setRawValue(''); 
		txtGodownStk.setRawValue('');
		txtGodownNos.setRawValue(''); 
		txtGodownQty.setRawValue('');

		var cnt = loadGodownStockDataStore.getCount();
                if (cnt>0)
                {
                if (loadGodownStockDataStore.getAt(0).get('wt') > 0)
                {    
	 	   txtGodownReels.setRawValue(loadGodownStockDataStore.getAt(0).get('nos')); 
		   txtGodownStk.setRawValue(loadGodownStockDataStore.getAt(0).get('wt')); 
	alert(txtGodownStk.getRawValue()+ " MT - " + txtGodownReels.getRawValue()+ " Reels are available in the Godown Stock..")

		loadGodownStockReelNowiseDataStore.removeAll();
		loadGodownStockReelNowiseDataStore.load({
		url: 'ClsTrnSalesOrder.php',
		params:
		    {
		        task:"loadGodownStockReelNowise",
		        compcode    : Gincompcode,
		        varietycode : varietycode,
		        size_cm     : size_cm, 
		        size_in     : size_in, 
	 //               sizecode  : cmbSizeList.getValue(),
		    },
		 callback:function()
                 {
		      flxGodownStock.getEl().setStyle('z-index','80000');

                      Ext.getCmp('godown').show();

                 }
                });

                }
                }   

	    }
	  
        });
}

var cmbSizeList = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 120,
        displayField    : 'size', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSizeList',
        typeAhead       : true,
        mode            : 'local',
        store           : 'loadSizeDataStore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          txtNoofReels.focus();
                          get_godownStock();
		     }
		  } , 


	    select: function(){
//alert(cmbSizeList.getRawValue());


                          get_godownStock();
                if (cust_area_price == 'cust')
                   get_ratedetails();
                else
                   get_ratedetails_Area();
     
            }   
        }    
});





function getsizes() {

//alert("Test1");
        txtrate.setValue('');
        cmbSizeList.reset();
        loadSizeDataStore.removeAll();
	loadSizeDataStore.load({
        url: 'ClsTrnSalesOrder.php',
        params:
            {
                task:"loadSizeDetails",
                varty  : cmbvarietylist.getValue() ,
                sizein : cmbSizetype.getValue(),
                shade  : shade,
                rb     : cmbRB.getValue(), 
            },
	 callback:function()
	    {
//		var cnt = GetGridDetailsDatastore.getCount();
//		var item = GetGridDetailsDatastore.getAt(0).get('rate_comp_code')
	    }
	  
        }); 
}

var cmbInsYN = new Ext.form.ComboBox({
        fieldLabel      : 'Insurance',
        width           : 80,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbInsYN',
        typeAhead       : true,
        mode            : 'local',
        store           : ['YES','NO'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        value           : 'NO',
        listeners:{
	
        select: function(){
                   if (cmbInsYN.getRawValue() == "YES") {
                       ins = "Y";
                       Ext.getCmp('txtInsPer').setReadOnly(false);
                       txtInsPer.setValue(insper);
                    }
                   else {
                         txtInsPer.setValue(0);
                         Ext.getCmp('txtInsPer').setReadOnly(true);
                         ins = "N";
                         txtInsPer.setValue(0);
                   }


               }

       }   

});


var cmbCDChangeYN = new Ext.form.ComboBox({
        fieldLabel      : 'Do you want to change the CD/PMT',
        width           : 80,
        hiddenName      : '',
        id              : 'cmbCDChangeYN',
        typeAhead       : true,
        mode            : 'local',
        store           : ['YES','NO'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        value           : 'NO',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
	   select: function(){

	   }
       }   

});


var getTaxDataStore = new Ext.data.Store({
        id: 'getTaxDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findTaxCode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_code','tax_cgst','tax_sgst','tax_igst'])
    });


var cmbTax = new Ext.form.ComboBox({
        fieldLabel      : 'GST  ',
        width           : 250,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbTax',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTaxStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        readOnly        : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold;color:#28470c",
        listeners: {
            select: function ()                 {
//                RefreshData();
                getTaxDataStore.removeAll();
        
                getTaxDataStore.load({
                    url: 'ClsTrnSalesOrder.php', // File to connect to
                    params:
                            {
                                task: "findTaxCode",
                                taxcode:cmbTax.getValue()
                            },
                    callback: function () {
                        var cnt = getTaxDataStore.getCount(); 
                        if (cnt > 0) {
                                   txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
                                   txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
                                   txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
                                   taxcode = findRepDataStore.getAt(0).get('tax_code');

                                    }
                         else {alert('not found');

                       } 
                   }
                });
              }
        } 


});

var colname;
var flag = '';
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:0,
    height: 140,
    hidden:false,
    width: 1200,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "S.No"    , dataIndex: 'sno',sortable:false,width:40,align:'left', menuDisabled: true},	
        {header: "Variety" , dataIndex: 'varname',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "VarCode" , dataIndex: 'varcode',sortable:false,width:70,align:'left', menuDisabled: true,hidden:true},
        {header: "Shade "  , dataIndex: 'shade',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "BF"      , dataIndex: 'bf',sortable:false,width:50,align:'left', menuDisabled: true},
        {header: "GSM "    , dataIndex: 'gsm',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Rate"    , dataIndex: 'rate',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Size In" , dataIndex: 'sizein',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Size "   , dataIndex: 'size',sortable:false,width:110,align:'left', menuDisabled: true},
	{header: "Dia "    , dataIndex: 'dia',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Sizecode"  , dataIndex: 'sizecode',sortable:false,width:60,align:'left', menuDisabled: true,hidden:true},
        {header: "Qty"         , dataIndex: 'qty',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Reels"         , dataIndex: 'reels',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Desp.Date "  , dataIndex: 'despdate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Fin.Wt "  , dataIndex: 'finwt',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Inv.Wt "  , dataIndex: 'invwt',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Stk.Wt "  , dataIndex: 'gdstkwt',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Stk.Reels "  , dataIndex: 'gdstkreels',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "ReelNoList"  , dataIndex: 'reellist',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Close "  , dataIndex: 'soclose',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "Close Reason"  , dataIndex: 'closereason',sortable:false,width:150,align:'left', menuDisabled: true,
   	editor:{
		    xtype:'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { grid_tot();
	}}}},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	

            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {

                if (cellIndex == 19)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.soclose == '')
                                    flag = 'N';
                                else                                   
                                    flag = selected_rows[i].data.soclose;
                                             

                               	colname = 'soclose';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				} else 
				{
				   selected_rows[i].set(colname, 'N');
				}
                       }   
                }
  
             }  ,
 

            'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {

             if (cellIndex != 19)
             {
             Ext.Msg.show({
             title: 'SO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();

		                cmbvarietylist.setRawValue(selrow.get('varname'));
		                cmbvarietylist.setValue(selrow.get('varcode'));
			        cmbShade.setRawValue(selrow.get('shade'));


                                txtBF.setValue(selrow.get('bf'));
				txtGSM.setValue(selrow.get('gsm'));



			        cmbSizetype.setRawValue(selrow.get('sizein'));

                                fwt = selrow.get('finwt');
                                iwt = selrow.get('invwt');

                                getsizes();

///alert(selrow.get('rate'));
				cmbSizeList.setValue(selrow.get('sizecode'));
			        cmbSizeList.setRawValue(selrow.get('size'));
				txtNoofReels.setValue(selrow.get('reels'));

                                txtBF.setValue(selrow.get('bf'));
				txtqty.setValue(selrow.get('qty'));
			        dptDespdate.setValue(Ext.util.Format.date(selrow.get('despdate'),"Y-m-d"));
				txtrate.setValue(selrow.get('rate'));

                                if (fwt > 0)
                                {
				        cmbvarietylist.setDisabled(true);   
					cmbShade.setDisabled(true);   
		                        txtBF.setDisabled(true);   
					txtGSM.setDisabled(true);   
		                        cmbRB.setDisabled(true);   
					cmbSizetype.setDisabled(true);   
					cmbSizeList.setDisabled(true);   
                                }       
                                else
                                {
				        cmbvarietylist.setDisabled(false);   
					cmbShade.setDisabled(false);   
		                        txtBF.setDisabled(false);   
					txtGSM.setDisabled(false);   
		                        cmbRB.setDisabled(false);   
					cmbSizetype.setDisabled(false);   
					cmbSizeList.setDisabled(false);   
                                }            
	              }
		      else if (btn === 'no')
                      {
		                if (viewopt == 0)
		                { 
		                    var sm = flxDetail.getSelectionModel();
		                    var selrow = sm.getSelected();
                                    fwt = selrow.get('finwt');
                                    iwt = selrow.get('invwt');
                                    if (fwt > 0) 
                                    {
                                       alert("Finished Entries are Made aginst this SO. You can't Delete");
                                    }
                                    else
                                    {
                                       flxDetail.getStore().remove(selrow);
		                       flxDetail.getSelectionModel().selectAll();
                                    }
		                }  
		                else
		                {
		                    alert("In GRN EDIT option - you cannot delete the Row..");
		                }   
		     
		      }
                     grid_tot();

             } 
        });
   }
   }
}
});

var btnClose = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "Close",
    width   : 50,
    height  : 25,
    listeners:{
        click: function(){  
          Ext.getCmp('godown').hide();
	  txtGodownStk.setRawValue(txtGodownQty.getValue()); 
	  txtGodownReels.setRawValue(txtGodownNos.getValue());
          txtNoofReels.focus();

        }
    }  
});


function priceConfirm()
{
           var no_of_days = Number(txtPayTerms.getValue())+ Number(txtGraceDays.getValue());
           if (no_of_days == 1 || no_of_days == 3  || no_of_days == 15 || no_of_days == 7  || no_of_days == 30 || no_of_days == 45 || no_of_days == 60 || no_of_days == 75 || no_of_days == 90)
           {         
           cmbvarietylist.setDisabled(false);
           cmbDestination.setDisabled(true);   
    
           txtPayTerms.setDisabled(true); 
           txtGraceDays.setDisabled(true); 
           ExtraAmt_PT = 0;

           if (no_of_days <= 7) 
           {      
                txtCashDiscMT_7Days_30dayPT.setValue('0');
		txtCashDiscMT_7Days_45dayPT.setValue('0');
		txtCashDiscMT_30Days_45dayPT.setValue('0');

		txtCashDiscMT_7Days_60dayPT.setValue('0');
		txtCashDiscMT_30Days_60dayPT.setValue('0');
		txtCashDiscMT_45Days_60dayPT.setValue('0');

		txtCashDiscMT_7Days_90dayPT.setValue('0');
		txtCashDiscMT_30Days_90dayPT.setValue('0');
		txtCashDiscMT_45Days_90dayPT.setValue('0');
		txtCashDiscMT_60Days_90dayPT.setValue('0');
		txtCashDiscMT_75Days_90dayPT.setValue('0');
           }

           if (no_of_days == 30) 
           {      
                txtCashDiscMT_7Days_30dayPT.setValue('500');

		txtCashDiscMT_7Days_45dayPT.setValue('0');
		txtCashDiscMT_30Days_45dayPT.setValue('0');

		txtCashDiscMT_7Days_60dayPT.setValue('0');
		txtCashDiscMT_30Days_60dayPT.setValue('0');
		txtCashDiscMT_45Days_60dayPT.setValue('0');

		txtCashDiscMT_7Days_90dayPT.setValue('0');
		txtCashDiscMT_30Days_90dayPT.setValue('0');
		txtCashDiscMT_45Days_90dayPT.setValue('0');
		txtCashDiscMT_60Days_90dayPT.setValue('0');
		txtCashDiscMT_75Days_90dayPT.setValue('0');
           }



           if (no_of_days == 45) 
           {      
                txtCashDiscMT_7Days_30dayPT.setValue('0');

		txtCashDiscMT_7Days_45dayPT.setValue('1000');
		txtCashDiscMT_30Days_45dayPT.setValue('500');

		txtCashDiscMT_7Days_60dayPT.setValue('0');
		txtCashDiscMT_30Days_60dayPT.setValue('0');
		txtCashDiscMT_45Days_60dayPT.setValue('0');

		txtCashDiscMT_7Days_90dayPT.setValue('0');
		txtCashDiscMT_30Days_90dayPT.setValue('0');
		txtCashDiscMT_45Days_90dayPT.setValue('0');
		txtCashDiscMT_60Days_90dayPT.setValue('0');
		txtCashDiscMT_75Days_90dayPT.setValue('0');
           }


           if (no_of_days == 60) 
           {      
                txtCashDiscMT_7Days_30dayPT.setValue('0');

		txtCashDiscMT_7Days_45dayPT.setValue('0');
		txtCashDiscMT_30Days_45dayPT.setValue('0');

		txtCashDiscMT_7Days_60dayPT.setValue('1500');
		txtCashDiscMT_30Days_60dayPT.setValue('1000');
		txtCashDiscMT_45Days_60dayPT.setValue('500');

		txtCashDiscMT_7Days_90dayPT.setValue('0');
		txtCashDiscMT_30Days_90dayPT.setValue('0');
		txtCashDiscMT_45Days_90dayPT.setValue('0');
		txtCashDiscMT_60Days_90dayPT.setValue('0');
		txtCashDiscMT_75Days_90dayPT.setValue('0');
           }

           if (no_of_days == 90) 
           {      
                txtCashDiscMT_7Days_30dayPT.setValue('0');

		txtCashDiscMT_7Days_45dayPT.setValue('0');
		txtCashDiscMT_30Days_45dayPT.setValue('0');

		txtCashDiscMT_7Days_60dayPT.setValue('0');
		txtCashDiscMT_30Days_60dayPT.setValue('0');
		txtCashDiscMT_45Days_60dayPT.setValue('0');

		txtCashDiscMT_7Days_90dayPT.setValue('2500');
		txtCashDiscMT_30Days_90dayPT.setValue('2000');
		txtCashDiscMT_45Days_90dayPT.setValue('1500');
		txtCashDiscMT_60Days_90dayPT.setValue('1000');
		txtCashDiscMT_75Days_90dayPT.setValue('500');
           }



           switch (no_of_days) 
           {     
           case 45:
                ExtraAmt_PT = 500;
                break;
           case 60:
                ExtraAmt_PT = 1000;
                break;
           case 75:
                ExtraAmt_PT = 1500;
                break;
           case 90:
                ExtraAmt_PT = 2000;
                break;
 
           }  


//alert(ExtraAmt_PT);

         if (areacode == 24 && cmbDestination.getRawValue() == "" )
         {  
             alert("Destination is empty .. Please check ...");              
             cmbvarietylist.setDisabled(true);
             cmbDestination.setDisabled(false);   
             cmbDestination.focus();

         }  
         else
           cmbvarietylist.focus();
         }
 
         else
         {
             alert("Payment term + Grace Days total is wrong .. Please check ...");

         }    
}

var btnPriceTermConfirm = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "Confirm",
    width   : 50,
    height  : 25,
    listeners:{



        click: function(){  
            priceConfirm();
        }      
    }  
});

var btnPriceTermRefresh = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "Refresh",
    width   : 50,
    height  : 25,
    listeners:{
        click: function(){  

           if (Number(txtFinQty.getValue())+Number(txtInvQty.getValue()) > 0)
              alert("Finished / Invoice Qty are Made in the SO, We can't Refresh the Data");
           else
           {     
		   cmbvarietylist.setDisabled(true); 
		   cmbDestination.setDisabled(false);     
		   flxDetail.getStore().removeAll();
		   txtrate.setValue('');
/*
                           if (GetVarietylistDatastore.getAt(0).get('rate_price_terms') <= 7)
                           {
	                        txtPayTerms.setDisabled(true);   
				txtGraceDays.setDisabled(true);                            
                           }
                           else
                           {
	                        txtPayTerms.setDisabled(false);   
				txtGraceDays.setDisabled(false);                            
                        }
 */  
           }  
 
        }      
    }  
});


var btnGSTRefresh = new Ext.Button({
 //  style   : 'text-align:left;font-size:14px;font-weight:bold',
 
/*  style : {
        'color' : 'red',
        'font-size' : '15px',
        'font-weight' : 'bold'
    },
*/ 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "GST Refresh & Update",
    width   : 100,
    height  : 35,
    x       : 200,
    y       : 200,
  // labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//bodyStyle:{"background-color":"#ebebdf"},
//style : "font-size:14px;font-weight:bold",
 listeners:{
        click: function(){       
		      Ext.Ajax.request({
		      url: 'TrnSalesOrderGSTUpdate.php',
		      params :
		      {
                         	compcode  : Gincompcode,
	        		fincode   : GinFinid,
		                party     : custcode,
		                sono      : cmbSONo.getRawValue(),
		         	
		      },
		      callback: function(options, success, response)
		      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("GST Type is Changed -" + obj['msg']);
//                      TrnSalesInvoicePanel.getForm().reset();
//                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("GST Type Not Changed Please check.." + obj['msg']);                                                  
                  }
		      }
                      }); 
       }
     }
});

var btnSubmit = new Ext.Button({
 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 80,
    height  : 35,
    x       : 200,
    y       : 200,

 listeners:{
        click: function(){       
            add_btn_click();
	        cmbvarietylist.setDisabled(false);   
		cmbShade.setDisabled(false);   
                txtBF.setDisabled(false);   
		txtGSM.setDisabled(false);   
                cmbRB.setDisabled(false);   
		cmbSizetype.setDisabled(false);   
		cmbSizeList.setDisabled(false);   
       }
     }
});

var tabSalesOrder = new Ext.TabPanel({
    id          : 'tabSalesOrder',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1700,
    x           : 2,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'Order Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
//item - 2 - start
                     items: [
                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 320,
                               height      : 200,
                               x           : 10,
                               y           : 10,
                               border      : true,
                               layout      : 'absolute',
//item - 3 - start
                               items:[
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [txtSONo]
                                      },

                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [cmbSONo]
                                      },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 80,
                		       width       : 500,
		                       x           : 0,
                		       y           : 35,
		                       border      : false,
                		       items: [dptSONo]
   		                     },
                   		     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 360,
                                       x           : 0,
                                       y           : 70,
                                       border      : false,
                                       items: [cmbPO]
	                             },
                                     { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 80,
                    		       width       : 400,
	                               x           : 0,
          		               y           : 105,
                        	       border      : false,
		                       items: [dptPO]
   		                    },
		  	           ]	  
//item - 3 - end
                             },
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 990,
                                  height      : 200,
                                  x           : 330,
                                  y           : 10,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[

                
                  			     { 
						   xtype       : 'fieldset',
						   title       : '',
						   labelWidth  : 100,
						   width       : 600,
						   x           : -10,
						   y           : -10,
						   border      : false,
						   items: [txtCustomer]
					   }, flxParty,



                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 460,
                                             y           : -10,
                                             border      : false,
                                             items: [cmbPriceno]
                                        },

                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 460,
                                             y           : -10,
                                             border      : false,
                                             items: [cmbAreaPriceno]
                                        },

   					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 200,
                                             x           : 650,
                                             y           : -10,
                                             border      : false,
                                             items: [txtCommission]
                                        }, 

                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 60,
                                             width       : 250,
                                             x           : 820,
                                             y           : -10,
                                             border      : false,
                                             items: [txtPassword]
                                        },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 100,
                                            width       : 410,
                                            x           : 460,
                                            y           : 20,
                                            border      : false,
                                            items: [cmbTax]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 100,
                                            width       : 410,
                                            x           : 830,
                                            y           : 20,
                                            border      : false,
                                            items: [btnGSTRefresh]
                                         },   


    					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 500,
                                             x           : 460,
                                             y           : 50,
                                             border      : false,
                                             items: [txtOverDue]
                                        }, 
				        {
				                  xtype       : 'fieldset',
				                  title       : '',
                                                  id          : 'pt',  
				                  width       : 495,
				                  height      : 85,
				                  x           : 470,
				                  y           : 90,
				                  border      : true,
				                  layout      : 'absolute',
				                  items:[
							{ 
				                             xtype       : 'fieldset',
				                             title       : '',
				                             labelWidth  : 100,
				                             width       : 200,
				                             x           : 0,
				                             y           : -10,
				                             border      : false,
				                             items: [txtPayTerms]
				                        },
		   					{ 
				                             xtype       : 'fieldset',
				                             title       : '',
				                             labelWidth  : 100,
				                             width       : 200,
				                             x           : 180,
				                             y           : -10,
				                             border      : false,
				                             items: [txtGraceDays]
				                        },  

				                         { 
				                            xtype       : 'fieldset',
				                            title       : '',
				                            labelWidth  : 100,
				                            width       : 100,
				                            x           : 350,
				                            y           : -10,
				                            border      : false,
				                            items: [btnPriceTermConfirm]
				                         },   

				                         { 
				                            xtype       : 'fieldset',
				                            title       : '',
				                            labelWidth  : 100,
				                            width       : 100,
				                            x           : 407,
				                            y           : -10,
				                            border      : false,
				                            items: [btnPriceTermRefresh]
				                         },   



    					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 500,
                                             x           : 0,
                                             y           : 30,
                                             border      : false,
                                             items: [cmbDestination]
                                        }, 


                                                  ]
                                         }, 

                                        ],

       
                             },
// RIGHT PANEL END

// BOTTOM PANEL START2.Test

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 1310,
                                  height      : 80,
                                  x           : 10,
                                  y           : 215,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 10,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblvariety]
				        },

	
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 175,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblshade]
				        },
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 1,
				            x           : 260,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblBF]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 1,
				            x           : 310,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblGSM]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 80,
				            x           : 720,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblrate]
				        },


				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 370,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblsizein]
				        },
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 460,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblRB]
				        },
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 560,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblSize]
				        },
					{
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 780,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDia]
				        },


				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 840,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblNoofReels ]
				        },



				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 910,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblqty]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 980,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lbldespdate]
				        },
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 1100,
				            y           :-5,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblGodown ]
				        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 5,
                                             y           : 22,
                                             border      : false,
                                             items: [cmbvarietylist]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 160,
                                             y           : 22,
                                             border      : false,
                                             items: [cmbShade]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 100,
                                             x           : 250,
                                             y           : 22,
                                             border      : false,
                                             items: [txtBF]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 100,
                                             x           : 300,
                                             y           :22,
                                             border      : false,
                                             items: [txtGSM]
                                        },


		

				       { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 120,
                                             x           : 360,
                                             y           : 22,
                                             border      : false,
                                             items: [cmbSizetype]
                                        },
				        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 120,
                                             x           : 450,
                                             y           : 22,
                                             border      : false,
                                             items: [cmbRB]
                                        },
				        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 180,
                                             x           : 550,
                                             y           : 22,
                                             border      : false,
                                             items: [cmbSizeList]
                                        },

			               { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 130,
                                             x           : 690,
                                             y           :22,
                                             border      : false,
                                             items: [txtrate]
                                        },

				
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 120,
                                             x           : 780,
                                             y           : 22,
                                             border      : false,
                                             items: [txtDia]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 150,
                                             x           : 840,
                                             y           :22,
                                             border      : false,
                                             items: [txtNoofReels]
                                        },


					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 150,
                                             x           : 900,
                                             y           :22,
                                             border      : false,
                                             items: [txtqty]
                                        },

                                        { 
		                             xtype       : 'fieldset',
			                     title       : '',
		  	                     labelWidth  : 15,
		            		     width       : 400,
			                     x           : 960,
		  		             y           : 22,
		                	     border      : false,
				             items: [dptDespdate]
   		                    },
                                        { 
		                             xtype       : 'fieldset',
			                     title       : '',
		  	                     labelWidth  : 15,
		            		     width       : 200,
			                     x           : 1080,
		  		             y           : 22,
		                	     border      : false,
				             items: [txtGodownReels]
   		                    },
                                        { 
		                             xtype       : 'fieldset',
			                     title       : '',
		  	                     labelWidth  : 15,
		            		     width       : 200,
			                     x           : 1120,
		  		             y           : 22,
		                	     border      : false,
				             items: [txtGodownStk]
   		                    },
				    { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 150,
                                             x           : 1200,
                                             y           : 5,
                                             border      : false,
                                             items: [btnSubmit]
                                        },


                                        ]
                             },
// BOTTOM PANEL END




                             {
                                  xtype       : 'fieldset',
                                  title       : 'Item Details',
                                  width       : 1225,
                                  height      : 200,
                                  x           : 10,
                                  y           : 300,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                    /*    { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 550,
                                            x           : 50,
                                            y           : 0,
                                            border      : false,
                                            items: [txtSize]
                                        },

                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 550,
                                             x           : 50,
                                             y           : 50,
                                             border      : false,
                                             items: [txtUnit]
                                        },*/
					flxDetail,

				{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 300,
                                             x           : 10,
                                             y           : 135,
                                             border      : false,
                                             items: [chkChange]
                                        },



				{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 110,
                                             width       : 300,
                                             x           : 300,
                                             y           : 135,
                                             border      : false,
                                             items: [txtTotQty]
                                        },

				{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 110,
                                             width       : 300,
                                             x           : 500,
                                             y           : 135,
                                             border      : false,
                                             items: [txtFinQty]
                                        },

				{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 110,
                                             width       : 300,
                                             x           : 700,
                                             y           : 135,
                                             border      : false,
                                             items: [txtInvQty]
                                        },
                                        ]
                             },


                                  {
                                   xtype       : 'fieldset',
                                   title       : '',
                                   id          : 'godown',
                                   width       : 360,
                                   height      : 250,
                                   x           : 600,
                                   y           : 200,
                                   border      : true,
                                   layout      : 'absolute',
//item - 3 - start
                                   items:[
                  
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 550,
                                            x           : 50,
                                            y           : -15,
                                            border      : false,
                                            items: [btnClose]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 550,
                                            x           : 20,
                                            y           : 10,
                                            border      : false,
                                            items: [flxGodownStock]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 70,
                                            width       : 550,
                                            x           : 10,
                                            y           : 200,
                                            border      : false,
                                            items: [txtGodownNos]
                                         },
     
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 100,
                                            width       : 550,
                                            x           : 100,
                                            y           : 200,
                                            border      : false,
                                            items: [txtGodownQty]
                                         },
                              ]
                                   },   
// BOTTOM PANEL END


                           ]

                        },



//TAB2 START
                        {
                           xtype: 'panel',
                           title: 'Other Details',bodyStyle:{"background-color":"#ffffcc"},
                           layout: 'absolute',
 	                   items: [



                                  {
                                   xtype       : 'fieldset',
                                   title       : '',
                                   width       : 1060,
                                   height      : 490,
                                   x           : 10,
                                   y           : 10,
                                   border      : true,
                                   layout      : 'absolute',
//item - 3 - start
                                   items:[
      

                  
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 110,
                                            width       : 550,
                                            x           : 0,
                                            y           : 10,
                                            border      : false,
                                            items: [txtCustIns]
                                         },



                                         {   
                                             xtype       : 'fieldset',
                                             title       : 'GST %',
                                             width       : 400,
                                             height      : 70,
                                             x           : 0,
                                             y           : 50,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 0,
                                                y           : 0,
                                                border      : false,
                                                items: [txtCgstPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 125,
                                                y           : 0,
                                                border      : false,
                                                items: [txtSgstPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 60,
                                                width       : 400,
                                                x           : 245,
                                                y           : 0,
                                                border      : false,
                                                items: [txtIgstPer] 
                                             },
 					    ]		
                                         },
                                         {   
                                             xtype       : 'fieldset',
                                             title       : 'INSURANCE',
                                             width       : 300,
                                             height      : 70,
                                             x           : 0,
                                             y           : 120,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 55,
                                                width       : 200,
                                                x           : 0,
                                                y           : 0,
                                                border      : false,
                                                items: [cmbInsYN] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 200,
                                                x           : 150,
                                                y           : 0,
                                                border      : false,
                                                items: [txtInsPer] 
                                             },

 					     ]	
                                         },

                                         {   
                                             xtype       : 'fieldset',
                                             title       : 'FREIGHT /(t)',
                                             width       : 130,
                                             height      : 70,
                                             x           : 420,
                                             y           : 50,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 150,
                                                x           : 7,
                                                y           : 0,
                                                border      : false,
                                                items: [txtFrtperton] 
                                             },

 					     ]	
                                         },




                                  ],
                             },



//Delivery Address box Start
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        id : 'editchk',
                        width: 0,
                        height: 0,
                        x: 1300,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [



                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 5,
                        	width       : 520,
                        	x           : 5,
                        	y           : 15,
                            	border      : false,
                        	items: [txtReason]
                    },


                        ]  
                    },
                             {   
                                  xtype       : 'fieldset',
                                  title       : 'DELIVERY ADDRESS',
                                  width       : 600,
                                  height      : 180,
                                  x           : 15,
                                  y           : 230,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 0,
                                             border      : false,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 27,	
                                             border      : false,
                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 54,
                                             border      : false,
                                             items: [txtAddr3] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 81,	
                                             border      : false,
                                             items: [txtAddr4] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 200,
                                             x           : 0,
                                             y           : 108,	
                                             border      : false,
                                             items: [txtPin] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 300,
                                             x           : 250,
                                             y           : 108,	
                                             border      : false,
                                             items: [txtGstNo] 
                                         },


 					]	
                            },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 120,
                             width       : 500,
                             x           : 350,
                             y           : 160,
                             border      : false,      
         
                             items: [txtRateDiff]
                      },

                     {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 280,
                        width       : 600,
                        x           : 10,
                        y           : 430,
                        border      : false,
//                        items: [cmbCDChangeYN] 
                     },



   	     { xtype   : 'fieldset',
                title   : 'If Payment Terms + Grace Days = 30 Days',
                 width       : 430,
                 height      : 60,
                 x           : 630,
                 y           : 20,
                 border      : true,
                 layout      : 'absolute',
style: {
            'color':'white',
            'style': 'Helvetica',
            'font-size': '15px'
        },
                items:[
              



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : -10,
                             border      : false,      
         
                             items: [txtCashDiscMT_7Days_30dayPT]
                      },





               ]
             },



   	     { xtype   : 'fieldset',
                title   : 'If Payment Terms + Grace Days = 45 Days',
                 width       : 430,
                 height      : 85,
                 x           : 630,
                 y           : 90,
                 border      : true,
                 layout      : 'absolute',
                items:[
              



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : -10,
                             border      : false,      
         
                             items: [txtCashDiscMT_7Days_45dayPT]
                      },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 15,
                             border      : false,      
         
                             items: [txtCashDiscMT_30Days_45dayPT]
                      },

               ]
             },


   	     { xtype   : 'fieldset',
                title   : 'If Payment Terms + Grace Days = 60 Days',
                 width       : 430,
                 height      : 110,
                 x           : 630,
                 y           : 190,
                 border      : true,
                 layout      : 'absolute',
                items:[
              


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : -10,
                             border      : false,      
         
                             items: [txtCashDiscMT_7Days_60dayPT]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 15,
                             border      : false,      
         
                             items: [txtCashDiscMT_30Days_60dayPT]
                      },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 40,
                             border      : false,      
         
                             items: [txtCashDiscMT_45Days_60dayPT]
                      },

               ]
             },




   	     { xtype   : 'fieldset',
                title   : 'If  Payment Terms + Grace Days = 90 Days',
                 width       : 430,
                 height      : 170,
                 x           : 630,
                 y           : 320,
                 border      : true,
                 layout      : 'absolute',
                items:[
              

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 0,
                             border      : false,      
         
                             items: [txtCashDiscMT_7Days_90dayPT]
                      },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 25,
                             border      : false,      
         
                             items: [txtCashDiscMT_30Days_90dayPT]
                      },



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 50,
                             border      : false,      
         
                             items: [txtCashDiscMT_45Days_90dayPT]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 75,
                             border      : false,      
         
                             items: [txtCashDiscMT_60Days_90dayPT]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 500,
                             x           : -10,
                             y           : 100,
                             border      : false,      
         
                             items: [txtCashDiscMT_75Days_90dayPT]
                      },
               ]
             },


//Delivery Address box End



                            ]
                        },



//TAB2 END
         ]
});


function add_btn_click()
{


	    var gstadd="true";


	    if(txtCustomer.getRawValue()=="" || custcode ==0)
	    {
		alert("Select Customer Name..");
                gstadd="false";
                txtCustomer.setFocus();
	    }

	    if(cmbPO.getRawValue()=="")
	    {
		alert("Enter PO Reference..");
                gstadd="false";
                cmbPO.focus();
	    }

	    if(cmbvarietylist.getRawValue()=="" || cmbvarietylist.getValue()==0)
	    {
		alert("Select Variety..");
                gstadd="false";
                cmbvarietylist.focus();
	    }
	    if(cmbSizeList.getRawValue()=="" || cmbSizeList.getValue()==0)
	    {
		alert("Select Size..");
                gstadd="false";
                cmbSizeList.focus();
	    }

	    if(txtrate.getRawValue()=="" || txtrate.getValue()==0)
	    {
		alert("Rate is zero..");
                gstadd="false";
                txtrate.focus();
	    }

	    if(txtqty.getRawValue()=="" || txtqty.getValue()==0)
	    {
		alert("Enter Order  Quantity..");
                gstadd="false";
                txtqty.focus();
	    }

            if  (sotype == "F" && (txtSONo.getRawValue().length != 6 && txtSONo.getRawValue().length != 4)  )
            {
		alert("Error in SO Number..");
                gstadd="false";
                txtSONo.focus();
            }

            if  (sotype == "S" && txtSONo.getRawValue().length != 7 )
            {
		alert("Error in SO Number..");
                gstadd="false";
                txtSONo.focus();
            }

 
            if(gstadd=="true")
            { 
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.sizecode === cmbSizeList.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('varname' , cmbvarietylist.getRawValue());
			sel[idx].set('varcode' , cmbvarietylist.getValue());
			sel[idx].set('shade'   , cmbShade.getRawValue());
			sel[idx].set('bf'      , txtBF.getValue());
			sel[idx].set('gsm'     , txtGSM.getValue());
			sel[idx].set('rate'    , txtrate.getValue());
			sel[idx].set('sizein'  , cmbSizetype.getRawValue());
			sel[idx].set('size'    , cmbSizeList.getRawValue());
			sel[idx].set('dia'    , txtDia.getValue());
			sel[idx].set('sizecode', cmbSizeList.getValue());
			sel[idx].set('qty'     , txtqty.getValue());
			sel[idx].set('reels'   , txtNoofReels.getValue());
			sel[idx].set('despdate', Ext.util.Format.date(dptDespdate.getValue(),"Y-m-d"));
			sel[idx].set('gdstkwt'   , txtGodownStk.getValue());
			sel[idx].set('gdstkreels' , txtGodownReels.getValue());
			sel[idx].set('reellist' , reelnolist);
			flxDetail.getSelectionModel().clearSelections();
         	        txtqty.setValue(0);
                        txtNoofReels.setValue(0);
			txtGodownStk.setValue(0);
			txtGodownReels.setValue(0);

		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      
                        var RowCnt = flxDetail.getStore().getCount() + 1;
                        flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                                   sno       : RowCnt,
		                   varname   : cmbvarietylist.getRawValue(),
		                   varcode   : cmbvarietylist.getValue(),
			           shade     : cmbShade.getRawValue(),
                                   bf        : Number(txtBF.getValue()),
				   gsm       : Number(txtGSM.getValue()),
				   rate      : Number(txtrate.getValue()),
			           sizein    : cmbSizetype.getRawValue(),
				   size      : cmbSizeList.getRawValue(),
				   dia       : Number(txtDia.getValue()),
				   sizecode  : cmbSizeList.getValue(),
				   qty       : Number(txtqty.getValue()),
                                   reels     : Number(txtNoofReels.getValue()),
				   despdate  : Ext.util.Format.date(dptDespdate.getValue(),"Y-m-d"), 
                                   gdstkwt   : Number(txtGodownStk.getValue()),
                                   gdstkreels: Number(txtGodownReels.getValue()),
                                   reellist  : reelnolist,


                               }) 
                               );
                               txtqty.setValue(0);
                               txtNoofReels.setValue(0);
                               txtGodownStk.setValue(0);
			       txtGodownReels.setValue(0);

                }
             cmbvarietylist.focus();
             }

 grid_tot();
      }

function edit_click()
{
	  gstFlag = "Edit";
	    Ext.getCmp('cmbSONo').show();
	 /*  if (usertype == 1)
	    {
		Ext.getCmp('save').setDisabled(false);
	    }
	    else
	    {
		Ext.getCmp('save').setDisabled(true);
	    }*/
	    loadOrderNoListDataStore.removeAll();
	    loadOrderNoListDataStore.load({
		url: 'ClsTrnSalesOrder.php',
		params: {
		    task: 'loadOrderNoList',
		    finid: GinFinid,
		    compcode:Gincompcode,
		    ordtype : sotype,   
		},
	      	callback:function()
		{
		    //alert(loadOrderNoListDataStore.getCount());	
                                            
                    cmbSONo.setValue(GinFinid)

		}
	    });  
}

function save_click()
{


              

    var gstSave;

    var rateseqno = 0;

    if (cust_area_priceType == 'C')
        rateseqno = cmbPriceno.getValue();
    else
        rateseqno = cmbAreaPriceno.getValue();
 

//alert(flxDetail.getStore().getCount());		 




    gstSave="true";
    if (txtSONo.getRawValue()==0 || txtSONo.getRawValue()=="")
    {
        Ext.Msg.alert('Sales-Order','Enter Order Number.....');
        gstSave="false";
    }

    else if (flxDetail.getStore().getCount()==0)
            {
                Ext.Msg.alert('Sales-Order','Grid should not be empty..');
                gstSave="false";
            }
    else if (cmbTax.getRawValue()==0 || cmbTax.getRawValue()=="")
    {
        Ext.Msg.alert('Sales-Order','Select Tax Type.....');
        gstSave="false";
    }

    else if  ( cust_area_priceType == 'C' &&  Number(cmbPriceno.getValue()) == 0 && custcode != 2151 )
    {
         Ext.Msg.alert('Sales-Order','Select PRICE ENTRY NUMBER .....');
         gstSave="false";
    }

    else if  ( cust_area_priceType == 'A' &&  Number(cmbAreaPriceno.getValue()) == 0)
    {
         Ext.Msg.alert('Sales-Order','Select PRICE ENTRY NUMBER .....');
         gstSave="false";
    }

    else if  (cmbInsYN.getRawValue() == "")
    {
         Ext.Msg.alert('Sales-Order','Select  Insurance YES / NO .....');
         gstSave="false";
    }



    else if (sotype == "F" && (txtSONo.getRawValue().length != 6 && txtSONo.getRawValue().length != 4)  )
    {
         Ext.Msg.alert('Sales-Order','Error in SO Number');
         gstSave="false";
    }

    else if  (sotype == "S" && txtSONo.getRawValue().length != 7 )
    {
         Ext.Msg.alert('Sales-Order','Error in SO Number');
         gstSave="false";
    }

    else if  (cmbInsYN.getRawValue() === "YES" && (txtInsPer.getValue() == 0 || txtInsPer.getRawValue() == ""))
    {
         Ext.Msg.alert('Sales-Order','Enter Insurance Percentage.....');
         gstSave="false";
    }
    else{


    tabSalesOrder.setActiveTab(1);

    Ext.Msg.show({
	    title: 'Confirmation',
	    icon: Ext.Msg.QUESTION,
	    buttons: Ext.MessageBox.YESNO,
	    msg: 'Confirm Again the  Cash Discounts Detail are CORRECT.. If Not correct - change the CD Amount and SAVE...',
	    fn: function(btn)
	    {
		if (btn === 'yes')
		{


       Ext.Msg.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do You Want To Save...',
            fn: function(btn)
		{
            if (btn === 'yes')
		{
            if (gstSave === "true")
                {  
            var SalesData = flxDetail.getStore().getRange();                                        
            var SalesupData = new Array();
            Ext.each(SalesData, function (record) {
                SalesupData.push(record.data);
            });

//alert(cmbPO.getRawValue());

            Ext.Ajax.request({
            url: 'TrnSalesOrderSave.php',
            params :
             {
		cnt: SalesData.length,
               	griddet: Ext.util.JSON.encode(SalesupData),    
                savetype:gstFlag,
             	ordhcompcode : Gincompcode,
		ordhfincode: GinFinid,
                ordhackno   : Number(txtSONo.getValue()),
		ordhackdate: Ext.util.Format.date(dptSONo.getValue(),"Y-m-d"),
		ordhref    : cmbPO.getRawValue(),
		ordhrefdt: Ext.util.Format.date(dptPO.getValue(),"Y-m-d"),
		ordhparty:  custcode,
		ordhrep: repcode,
		ordhtax: taxcode ,// cmbTax.getValue(),
    		ordhcustrem: txtCustIns.getRawValue(),
 		ordhinsyn: ins,
		ordhinsper: Number(txtInsPer.getRawValue()),
		ordhdeliveryadd1:txtAddr1.getRawValue() ,
		ordhdeliveryadd2: txtAddr2.getRawValue(),
		ordhdeliveryadd3: txtAddr3.getRawValue(),
		ordhdeliverycity: txtAddr4.getRawValue(),
		ordhdeliverypin: txtPin.getRawValue(),
		ordhdeliverygst: txtGstNo.getRawValue(),

		ordhcgst: Number(txtCgstPer.getRawValue()),
		ordhsgst: Number(txtSgstPer.getRawValue()),
		ordhigst: Number(txtIgstPer.getRawValue()),
                ordhfrt : Number(txtFrtperton.getRawValue()),
                ordhcrdays : Number(txtPayTerms.getRawValue()),
                ordhgracedays : Number(txtGraceDays.getRawValue()),
                ordhapprno : Number(rateseqno),
                ordhcomm : Number(txtCommission.getRawValue()),
                usercode :  UserId,
	        ordhcanstat: '',
		ordhcanreason: '',
                ordhtype : sotype, 
                cust_area_priceType : cust_area_priceType ,


	        cd30_7days   : Number(txtCashDiscMT_7Days_30dayPT.getValue()),	
		             
	        cd60_30days  : Number(txtCashDiscMT_30Days_60dayPT.getValue()),	
	        cd60_45days  : Number(txtCashDiscMT_45Days_60dayPT.getValue()),


	        ratediff     : Number(txtRateDiff.getValue()),
                custarea     : areacode,
                custdest     : cmbDestination.getRawValue(),

	        cd45_7days   : Number(txtCashDiscMT_7Days_45dayPT.getValue()),	
	        cd45_30days  : Number(txtCashDiscMT_30Days_45dayPT.getValue()),	

	        cd60_7days   : Number(txtCashDiscMT_7Days_60dayPT.getValue()),	

	        cd90_7days   : Number(txtCashDiscMT_7Days_90dayPT.getValue()),	

	        cd90_30days  : Number(txtCashDiscMT_30Days_90dayPT.getValue()),			             
	        cd90_45days  : Number(txtCashDiscMT_45Days_90dayPT.getValue()),			                
	        cd90_60days  : Number(txtCashDiscMT_60Days_90dayPT.getValue()),			             
	        cd90_75days  : Number(txtCashDiscMT_75Days_90dayPT.getValue()),			                

		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Sales Order Saved -" + obj['msg']);
                    TrnSalesOrderPanel.getForm().reset();
                    flxDetail.getStore().removeAll();
                    RefreshData();
                  }else
			{
Ext.MessageBox.alert("Sales Order Not Saved! Pls Check!- " + obj['msg']);                                                  
                    }
                }
           });         

          	}
		}
            }
        });
    }
   }
        });   

}
}
function cancel_click()
{



                                       
	        Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'Do You Want To Cancel the SO ...',
		    fn: function(btn)
		    { 
		    if (btn === 'yes')
                    {

                        
                        Ext.Ajax.request({
				      url: 'TrnSalesOrderCancel.php',
				      params :
				      {
				         	compcode  : Gincompcode,
						fincode   : GinFinid,
						party     : custcode,
						sono      : cmbSONo.getRawValue(),
                                                reason    : txtReason.getValue(),
					 	
				      },
				      callback: function(options, success, response)
				      {
				      var obj = Ext.decode(response.responseText);
                                     if (obj['success']==="true")
				      { 
				      Ext.MessageBox.alert("SO CANCELLLED  -" + obj['msg']);
		//                      TrnSalesInvoicePanel.getForm().reset();
		//                      RefreshData();
				      }else
				      {
				       Ext.MessageBox.alert("SO Not Cancelled Please check.." + obj['msg']);                                                  
				      }
				      }
				      }); 
	                 
			    }


		    }
                  });
}

var TrnSalesOrderPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES ORDER ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesOrderPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
        {
            text: ' Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
            height: 40,
            fontSize:20,
            width:50,
            align : 'right',
            icon: '/Pictures/Add.png',
            listeners:{
                click: function () {
                    gstFlag = "Add";
 		    RefreshData();
                }
            }
        },'-',
//EDIT
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                       edit_click();
   
                }
            }
        },'-',
          {
//save
            text: 'Save',
            id  : 'save',

            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {

                      save_click();

                }
            }
        },'-',
          {
//save
            text: 'Cancel',
            id  : 'cancel',

            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                if (gstFlag == "Edit" && (txtReason.getRawValue() == '' || txtReason.getRawValue().length <5) )
                        {
                            Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setValue(text);
//alert(text);
//					alert(txtReason.getValue());

		                        cancel_click();
				    }
	 	});
                }
            }
            } 
        },'-',

        {
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
//view
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&fromno=" + encodeURIComponent(txtSONo.getValue());  
			var p4 = "&tono=" + encodeURIComponent(txtSONo.getValue());  
		              
		        var param = (p1 + p2 + p3 + p4 );  
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_so_printing.rptdesign&__format=pdf'+ param);    
                }
            }
        },'-',

        {
//view
            text: 'View Godown Reel List',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&sono=" + encodeURIComponent(txtSONo.getValue());  
		              
		        var param = (p1 + p2 );  
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Repsal_Godown_to_desppending.rptdesign&__format=pdf'+ param);    
                }
            }
        },'-',

        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnSalesOrder1Window.hide();
                }
            }
        }]
    },
     items: [tabSalesOrder]
});


    

function RefreshData(){
	 gstFlag = "Add";
         Ext.getCmp('godown').hide();
	TrnSalesOrderPanel.getForm().reset();
        tabSalesOrder.setActiveTab(0);
        cmbDestination.setRawValue('');   
        cmbDestination.setDisabled(true);   
        Ext.getCmp('pt').setDisabled(false);
        Ext.getCmp('txtrate').setReadOnly(true);  
        cmbSizetype.setValue("I");
        Ext.getCmp('editchk').hide();
        cmbShade.setRawValue("NAT");
	custcode = 0;
	custledcode = 0;
        txtTotQty.setValue('');
	flxDetail.getStore().removeAll();
	Ext.getCmp('cmbSONo').hide();
	Ext.getCmp('save').setDisabled(false);
        Ext.getCmp('cmbPriceno').setDisabled(false);

        cmbInsYN.setRawValue('NO');
        cmbInsYN.setValue('NO');
        txtInsPer.setValue("0");

           cmbvarietylist.setDisabled(true); 
           txtPayTerms.setDisabled(false); 
           txtGraceDays.setDisabled(false); 
           cmbDestination.setDisabled(false); 


	loadordernodatastore.removeAll();
	loadordernodatastore.load({
		url: 'ClsTrnSalesOrder.php',
		params: {
		task: 'loadOrderNo',
		compcode : Gincompcode,
		finid : GinFinid,    
                ordtype : sotype,
		},
		callback:function()
		{
		var cnt = loadordernodatastore.getCount();
	                     if (loadordernodatastore.getAt(0).get('ordno') == 1) {
                                    if (ordtype == "F")
                                    {
                                        txtSONo.setValue(GinFinid+"0001");
                                    }
                                    else
                                    {
                                        txtSONo.setValue(GinFinid+"00001");
                                    }

                                   }    
                                  else {
                                   txtSONo.setValue(loadordernodatastore.getAt(0).get('ordno'));
			const input = document.getElementById('dptSONo');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();

                                  } 
		}
	});

  };
   

    var TrnSalesOrder1Window = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 30,
        title       : 'SALES - ORDER ENTRY',
        items       : TrnSalesOrderPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
 	listeners:{
               show:function(){
//alert(userid);
//alert(usertype);
      //              Ext.getCmp('txtrate').setDisabled(true);

//                        Ext.getCmp('cmbTax').setDisabled(true);  
        Ext.getCmp('godown').hide();
        gridedit = 'false';
        txtSONo.focus();

	txtCashDiscMT_7Days_30dayPT.setValue(0);

	txtCashDiscMT_7Days_60dayPT.setValue(0);
	txtCashDiscMT_30Days_60dayPT.setValue(0);
	txtCashDiscMT_45Days_60dayPT.setValue(0);

	txtCashDiscMT_7Days_45dayPT.setValue(0);
	txtCashDiscMT_30Days_45dayPT.setValue(0);

	txtCashDiscMT_7Days_90dayPT.setValue(0);
	txtCashDiscMT_30Days_90dayPT.setValue(0);
	txtCashDiscMT_45Days_90dayPT.setValue(0);
	txtCashDiscMT_60Days_90dayPT.setValue(0);
	txtCashDiscMT_75Days_90dayPT.setValue(0);


                        cmbDestination.setRawValue('');   
                        cmbDestination.setDisabled(true);   
        	        cmbvarietylist.setDisabled(true);   
                        cmbRB.setValue("1");
                        cmbSizetype.setValue("I");
                        cmbShade.setRawValue("NAT");
			loadordernodatastore.removeAll();
			loadordernodatastore.load({
			 url: 'ClsTrnSalesOrder.php',
		                params: {
                	    	task: 'loadOrderNo',
		                compcode:Gincompcode,
                                finid:GinFinid,
                                ordtype : sotype,   
                		},
				scope:this,
				callback:function()
	               		{
				var cnt = loadordernodatastore.getCount();

                                if (loadordernodatastore.getAt(0).get('ordno') == 1) {
                                    if (sotype == "F") {
                                    txtSONo.setValue(GinFinid+"0001"); }
                                    else
                                    {
                                    txtSONo.setValue(GinFinid+"00001"); }
                                   }    
                                  else {
                                   txtSONo.setValue(loadordernodatastore.getAt(0).get('ordno'));

			const input = document.getElementById('dptSONo');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();

                                  } 
   				}
			  });

            		loadinsperdatastore.removeAll();
              		loadinsperdatastore.load({
			 url: 'ClsTrnSalesOrder.php',
		                params: {
                	    	task: 'loadinsdetail',
		                compcode:Gincompcode,
                		},
				scope:this,
				callback:function()
	               		{
				insper = loadinsperdatastore.getAt(0).get('def_ins');
                                }         
			  });

			GetVarietyNameDatastore.removeAll();
			GetVarietyNameDatastore.load({
			 url: '/SHVPM/SALES/TrnSalesOrder/ClsTrnSalesOrder.php',
		                params: {
                	    	task: 'verietyname',
                		}
			  });
//cmbCustomer.focus();

//txtSONo.setValue('');

                    }
        } 
    });
       TrnSalesOrder1Window.show();  
});
