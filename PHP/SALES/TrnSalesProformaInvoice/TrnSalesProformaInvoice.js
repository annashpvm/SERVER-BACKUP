Ext.onReady(function(){
  
Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var GinCompcode = localStorage.getItem('gincompcode');



   var gstFlag = "Add";

   var fm = Ext.form;

   var invtype =0;
   var socno =0;
   var commision = 0;
   var bundles = 0;
   var reels = 0;

   var agentcode = 0;
   var partycode = 0;
   var taxcode =0;

   var ourbankcode =0;

   var transcode =0;

   var slipno = 0;      
   var odiper =0;   

   var editrow = 0;
   var gridedit = "false";


//   var a4inv = "Y";
//   var a4inv  = a4yn;

   var   gridedit = "true";
   var desplocation = "V";
 var loadhsnDataStore = new Ext.data.Store({
      id: 'loadhsnDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsnlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'hsncode', type: 'int',mapping:'hsncode'},

      ]),
    });


   var loadInvnodatastore = new Ext.data.Store({
      id: 'loadInvnodatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invno'
      ]),
    });

   var loadHSNCODEdatastore = new Ext.data.Store({
      id: 'loadHSNCODEdatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findHSNcode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'vargrp_type_hsncode'
      ]),
    });



   var loadCustomerGSTdatastore = new Ext.data.Store({
      id: 'loadCustomerGSTdatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer_GST"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_taxtag'
      ]),
    });

   var loadInvoicelistDataStore = new Ext.data.Store({
      id: 'loadInvoicelistDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invh_no'
      ]),
    });



   var loadInvoicedetailsDataStore = new Ext.data.Store({
      id: 'loadInvoicedetailsDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

'invh_comp_code', 'invh_fincode', 'invh_no', 'invh_date', 'invh_party_ordno', 'invh_party_orddt', 'invh_party', 'invh_agent', 'invh_crd_days', 'invh_insper', 'invh_frt_rate', 'invh_others', 'invh_sgst_per', 'invh_cgst_per', 'invh_igst_per', 'invh_hsncode', 'invh_variety', 'invh_units', 'invh_wt', 'invh_rate', 'invh_size', 'invh_qdiston', 'invh_A4inv', 'invh_value', 'invh_taxable', 'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_fax', 'cust_email', 'cust_web', 'cust_cont', 'cust_tngst', 'cust_tngstdt', 'cust_cst', 'cust_cstdate', 'cust_taxtag', 'cust_cr_days', 'cust_gr_days', 'cust_cr_limit', 'cust_agent', 'cust_repr', 'cust_group', 'cust_dest', 'cust_rep', 'cust_range', 'cust_division', 'cust_eccno', 'cust_type', 'cust_rnino', 'cust_agtgrp', 'cust_panno', 'cust_tinno', 'cust_shortname', 'cust_gstin','var_desc','invh_variety','invh_shade','invh_delivery_add1','invh_delivery_add2',
'invh_delivery_add3','invh_delivery_city','invh_delivery_pin','invh_delivery_gst','invh_delivery_state','invh_frt_qty'


      ]),
    });



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
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






 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_groupcode', type: 'int',mapping:'var_groupcode'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
    });



 var loadStatesstore = new Ext.data.Store({
      id: 'loadStatesstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstates"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'state_code', type: 'int',mapping:'state_code'},
	{name:'state_name', type: 'string',mapping:'state_name'}
      ]),
    });



var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State',
        width           : 250,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'local',
        store           : loadStatesstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
 });


var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 250,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdnVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
        select: function(){
                loadHSNCODEdatastore.removeAll();
        
                loadHSNCODEdatastore.load({
                    url: 'ClsTrnSalesProformaInvoice.php', // File to connect to
                    params:
                            {
                                task: "findHSNcode",
                                varcode:cmbVariety.getValue()
                            },
                    callback: function () {
                        var cnt = loadHSNCODEdatastore.getCount(); 
                        if (cnt > 0) {
                           cmbhsncode.setRawValue(loadHSNCODEdatastore.getAt(0).get('vargrp_type_hsncode'));
                           cmbhsncode.setValue(loadHSNCODEdatastore.getAt(0).get('vargrp_type_hsncode'));

                       } 
                   }

                });	
	

    
         }
	}


 });

   var txtTCSPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSPer',
        name        : 'txtTCSPer',
        width       :  50,
        value       : "0",
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
 	enableKeyEvents: true,
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           },
           keyup:function(){
              calculateItemValue();
           },
           change:function(){
              calculateItemValue();
           }
        }
    });

   var txtTCSAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSAmt',
        name        : 'txtTCSAmt',
        width       :  70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });
var cmbhsncode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN',
        width           : 90,
        displayField    : 'hsncode', 
        valueField      : 'hsncode',
        hiddenName      : '',
        id              : 'cmbhsncode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadhsnDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true
   });

    var lblFrtQty = new Ext.form.Label({
       fieldLabel  : 'Frt.Qty',
       id          : 'lblFrtQty',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });


   var lblFrt = new Ext.form.Label({
       fieldLabel  : 'FRT/(t)',
       id          : 'lblFrt',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });

   var lblTCS = new Ext.form.Label({
       fieldLabel  : 'TCS',
       id          : 'lblTCS',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });

   var txtFrtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtQty',
        name        : 'txtFrtQty',
        width       :  90,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       : "border-radius: 5px;  textTransform: uppercase ", 
    	enableKeyEvents: true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           },
           keyup:function(){
              calculateItemValue();
           },
        }
    });

 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesProformaInvoice.php',      // File to connect to
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

var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'Shade',
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
});  


   var txtInvNo = new Ext.form.NumberField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


   var txtReference = new Ext.form.TextField({
        fieldLabel  : 'Party Refer.',
        id          : 'txtReference',
        name        : 'txtReference',
        width       :  250,
        tabindex : 2
    });

    var dptInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptInvNo',
        name: 'Date',
        format: 'd-m-Y',

        value: new Date()
    });

    var dptRef= new Ext.form.DateField({
        fieldLabel: 'Ref.Date',
        id: 'dptRef',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });




    var lblInsPer = new Ext.form.Label({
       fieldLabel  : 'INS %',
       id          : 'lblInsPer',
       width       : 60
    });

   var lblFrt = new Ext.form.Label({
       fieldLabel  : 'FRT/t',
       id          : 'lblFrt',
       width       : 60
    });

   var lblOthers = new Ext.form.Label({
       fieldLabel  : 'Others',
       id          : 'lblOthers',
       width       : 60
    });

   var txtInsAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsAmt',
        name        : 'txtInsAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtOthers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthers',
        name        : 'txtOthers',
        width       :  100,
	readOnly : false,
        tabindex : 2
    });


   var txtsize = new Ext.form.TextField({
        fieldLabel  : 'Size',
        id          : 'txtsize',
        name        : 'txtsize',
        width       :  150,
        tabindex : 2
    });

   var txtvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value ',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


   var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
        tabindex : 2,
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });
   var txtSgstPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSgstPer',
        name        : 'txtSgstPer',
        width       :  50,
        tabindex : 2,
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });
   var txtIgstPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIgstPer',
        name        : 'txtIgstPer',
        width       :  50,
        tabindex : 2,
	readOnly : true,
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });

   var txtCgstAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtCgstAmt',
        name        : 'txtCgstAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtSgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstAmt',
        name        : 'txtSgstAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtIgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstAmt',
        name        : 'txtIgstAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  50,
        tabindex : 2,

      enableKeyEvents : true,
      listeners   :{
           keyup:function(){
           calculateItemValue();
        }
      }
    });

   var txttotqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (mt)',
        id          : 'txttotqty',
        name        : 'txttotqty',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txttotvalue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotvalue',
        name        : 'txttotvalue',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txttottaxable = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable Value',
        id          : 'txttottaxable',
        name        : 'txttottaxable',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtFrt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrt',
        name        : 'txtFrt',
        width       :  50,
        tabindex : 2,
        enableKeyEvents : true,
        listeners   :{
           keyup:function(){
           calculateItemValue();
           }
       }
    });


   var txtRound = new Ext.form.NumberField({
        fieldLabel  : 'Rounding',
        id          : 'txtRound',
        name        : 'txtRound',
        width       :  50,
	readOnly : true,
        tabindex : 2
    });

   var txtNetAmt = new Ext.form.NumberField({
        fieldLabel  : 'Net Amount',
        id          : 'txtNetAmt',
        name        : 'txtNetAmt',
        width       :  200,
	readOnly : true,
        tabindex : 2
    });

   var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
        tabindex : 2
    });


   var txtDestination = new Ext.form.TextField({
        fieldLabel  : 'Destination',
        id          : 'txtDestination',
        name        : 'txtDestination',
        width       :  250,
        tabindex : 2
    });



   var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate.',
        id          : 'txtrate',
        name        : 'txtrate',
        width       :  90,
        tabindex : 2,
      enableKeyEvents : true,
      listeners   :{
           keyup:function(){
           calculateItemValue();
        }
    }  
  });



   var txtdisc = new Ext.form.NumberField({
        fieldLabel  : 'Disc.',
        id          : 'txtdisc',
        name        : 'txtdisc',
        width       :  100,
        tabindex : 2,
      enableKeyEvents : true,
      listeners   :{
           keyup:function(){
           calculateItemValue();
        }
    }
    });

   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });
   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address3.',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });

   var txtAddr4 = new Ext.form.TextField({
        fieldLabel  : 'City.',
        id          : 'txtAddr4',
        name        : 'txtAddr4',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},

    });



   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  100,
        tabindex : 2
    });


   var txtqty = new Ext.form.NumberField({
        fieldLabel  : 'Qty (T)',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  60,
        enableKeyEvents : true,
        decimalPrecision: 3,
        listeners   :{
           keyup:function(){
           calculateItemValue();
        }
    }

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



var btnSubmit = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 80,
        text    : "ADD",
        x       : 350,
        y       : 45,
    	listeners:{
        click: function(){    



          	var addok;
                      addok ="true";
                         if (cmbVariety.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Sales ','Select Variety.....');
        	                addok="false";
        	         }
         	         else if (cmbCustomer.getValue()==0 || cmbCustomer.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Sales ','Select HSN code..');
        	                addok="false";
        	         }
      	  
         	         else if ( cmbhsncode.getRawValue() == "")
        	         {
        	                Ext.Msg.alert('Sales ','Select HSN code..');
        	                addok="false";
        	         }
               	         else if (cmbShade.getRawValue() =="")
        	         {
        	                Ext.Msg.alert('Sales ','Select Shade');
        	                addok="false";
        	         }
               	         else if (txtsize.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Sales ','Enter Size..');
        	                addok="false";
        	         }

        	         else if (txtqty.getValue()=="" || txtqty.getValue==0)
        	         {
        	                Ext.Msg.alert('Sales','Enter Qty..');
        	                addok="false";
        	         }                    
	                 else if (txtrate.getValue()=="" || txtrate.getValue==0)
        	         {
        	                Ext.Msg.alert('Sales','Enter Rate..');
        	                addok="false";
        	         }      


                         else 
                         {
	
//Ext.Msg.alert('Sales','ok..');
		           var itemseq = cmbVariety.getValue();
		           flxDetail.getSelectionModel().selectAll();
		           var selrows = flxDetail.getSelectionModel().getCount();
		           var sel = flxDetail.getSelectionModel().getSelections();
			   var cnt = 0;
                           for (var i=0;i<selrows;i++)
                           {
                              if (sel[i].data.size == txtsize.getRawValue() && sel[i].data.varcode == cmbVariety.getValue())
	                      {
                                cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")

                           {
             			gridedit = "false";
                        	var idx = flxDetail.getStore().indexOf(editrow);


 
                               frt = Math.round(Number(txtqty.getRawValue()) * Number(txtFrt.getRawValue()));
                               ins = Math.round(txtvalue.getRawValue() * txtInsPer.getRawValue()/100);   
               
                                value1 = Number(txtvalue.getValue()) +  Number(ins) + Number(frt);
 
                           	sel[idx].set('hsncode' , cmbhsncode.getRawValue());
          			sel[idx].set('varname' , cmbVariety.getRawValue());
                                sel[idx].set('varcode' , cmbVariety.getValue());
	         		sel[idx].set('shade'    , cmbShade.getRawValue());
             			sel[idx].set('size'    , txtsize.getValue());
				sel[idx].set('weight'  , txtqty.getValue());
				sel[idx].set('rate'    , txtrate.getValue());
                                sel[idx].set('disc'    , txtdisc.getValue());
				sel[idx].set('value'   , txtvalue.getValue());
				sel[idx].set('taxval'  , value1);

              			flxDetail.getSelectionModel().clearSelections();

		            }//if(gridedit === "true")

                            else
                            if (cnt ==0)
                            { 
                               var RowCnt = flxDetail.getStore().getCount() + 1;
                               flxDetail.getStore().insert(
                                 flxDetail.getStore().getCount(),
                                 new dgrecord({
                                   slno:RowCnt,
		        	   hsncode  : cmbhsncode.getRawValue(),
          			   varname  : cmbVariety.getRawValue(),
                                   varcode  : cmbVariety.getValue(),
	         		   shade    : cmbShade.getRawValue(),
             			   size     : txtsize.getValue(),
				   weight   : txtqty.getValue(),
				   rate     : txtrate.getValue(),
                                   disc     : txtdisc.getValue(),
				   value    : txtvalue.getValue(),
				   taxval   : txtvalue.getValue(),
	

                                 }) 
                               );

		            }
                            else
                            {
	                 	alert("Same Item Already Exist");
                            } 
                               calculateItemValue();
                               grid_tot();
	          	       refresh();

            }
  }
}
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
	'cust_code','cust_ref'
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
      autoLoad : true,
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



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });
	






var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
        listeners:{
        select: function(){
                loadCustomerGSTdatastore.removeAll();
        
                loadCustomerGSTdatastore.load({
                    url: 'ClsTrnSalesProformaInvoice.php', // File to connect to
                    params:
                            {
                                task: "loadcustomer_GST",
                                custcode:cmbCustomer.getValue()
                            },
                    callback: function () {
                        var cnt = loadCustomerGSTdatastore.getCount(); 
                        if (cnt > 0) {
                           cmbTax.setValue(loadCustomerGSTdatastore.getAt(0).get('cust_taxtag'));

				getTaxDataStore.removeAll();
		
				getTaxDataStore.load({
				    url: 'ClsTrnSalesProformaInvoice.php', // File to connect to
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
				                   taxcode = getTaxDataStore.getAt(0).get('tax_code');
				                   calculateItemValue();
		//CalculateItemValue();
		//alert(getTaxDataStore.getAt(0).get('tax_code'));
				                    }
				         else {alert('not found');

				       } 
				   }

				});
                           calculateItemValue();
                       } 
                   }

                });	
	

    
         }
	}
 
});


var cmbAgent = new Ext.form.ComboBox({
        fieldLabel      : 'Agent ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbAgent',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAgentStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
//        autoSelect      : true,
        listeners:{
	
        select: function(){
		  agentcode = cmbAgent.getValue();                     
                          }


       }   
});





var getTaxDataStore = new Ext.data.Store({
        id: 'getTaxDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesProformaInvoice.php', // File to connect to
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
        fieldLabel      : 'GST Type ',
        width           : 300,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbTax',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTaxStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function ()                 {
//                RefreshData();

//alert(cmbTax.getValue());
                getTaxDataStore.removeAll();
        
                getTaxDataStore.load({
                    url: 'ClsTrnSalesProformaInvoice.php', // File to connect to
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
                                   taxcode = getTaxDataStore.getAt(0).get('tax_code');
                                   calculateItemValue();
//CalculateItemValue();
//alert(getTaxDataStore.getAt(0).get('tax_code'));
                                    }
                         else {alert('not found');

                       } 
                   }

                });
              }
        } 


});


var cmbDocuments = new Ext.form.ComboBox({
        fieldLabel      : 'Documents ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDocuments',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DIRECT','THROUGH BANK','LC'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


 var txtPartyBank = new Ext.form.TextField({
        fieldLabel  : 'Partys Bank.',
        id          : 'txtPartyBank',
        name        : 'txtPartyBank',
        width       :  350,
        tabindex : 2
});


/*
var cmbPartyBank = new Ext.form.ComboBox({
        fieldLabel      : 'Partys Bank ',
        width           : 350,
        displayField    : 'bank_name', 
        valueField      : 'bank_code',
        hiddenName      : '',
        id              : 'cmbPartyBank',
        typeAhead       : true,
        mode            : 'remote',
        store           : 'loadBankNameStore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

*/

var cmbOurBank = new Ext.form.ComboBox({
        fieldLabel      : 'Our Bank ',
        width           : 350,
        displayField    : 'bank_name', 
        valueField      : 'bank_code',
        hiddenName      : '',
        id              : 'cmbOurBank',
        typeAhead       : true,
        mode            : 'local',
        store           : loadBankNameStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
       listeners:{
        select: function(){
		  ourbankcode = cmbOurBank.getValue();                     
                        }
       }  
});



var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Inv No.',
        width           : 100,
        displayField    : 'invh_no', 
        valueField      : 'invh_no',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvoicelistDataStore ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true  ,
        listeners:{
                select: function () {
                        flxDetail.getStore().removeAll();
			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesProformaInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:GinCompcode
                                	//invno:cmbInvNo.getValue()
		                },
				scope: this,
                                callback:function()
                                {
                                //cmbCustomer.setValue(loadAllCustomerStore.getAt(0).get('cust_code')); 
                                }

			  });
			loadProdnVariety.removeAll();
			loadProdnVariety.load({
		                url: 'ClsTrnSalesProformaInvoice.php',
		                params: {
		                    task: 'loadVariety',
					fincode:GinFinid,
					compcode:GinCompcode

		                },
				scope: this,
                                callback:function()
                                {
                                
                                }

			  });			  
			  

                    	loadInvoicedetailsDataStore.load({
			url: 'ClsTrnSalesProformaInvoice.php',
			params: {
			        task: 'loadInvoiceNoDetails',
				invno:cmbInvNo.getValue(),
				compcode :GinCompcode,
                                finid:GinFinid
			},
                      	callback:function()
                  	{

                                txtInvNo.setValue(cmbInvNo.getValue());
                                partycode = loadInvoicedetailsDataStore.getAt(0).get('invh_party');
             			 cmbCustomer.setValue(loadInvoicedetailsDataStore.getAt(0).get('cust_code'));


                                dptInvNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));

				 


                                txtReference.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_ordno'));
                            dptRef.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_party_orddt'),"d-m-Y"));

             
                                txtCgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_cgst_per'));
                                txtSgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_sgst_per'));
                                txtIgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_igst_per'));
        
				txtFrt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_rate'));
				txtFrtQty.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_qty'));
				
				

//				txtrate.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_rate'));
				//txtqty.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_wt'));
//				txtdisc.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_qdiston'));

                              cmbTax.setValue(loadInvoicedetailsDataStore.getAt(0).get('cust_taxtag'));
//                              transcode = loadInvoicedetailsDataStore.getAt(0).get('invh_trans');
//                              cmbTransport.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_trans'));

                                txtInsPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_insper'));

//                                cmbDocuments.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_docu'));   
//                                txtPartyBank.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_bank'));  
//                                txtCreditDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_crd_days')); 

//                              txtDestination.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_dest'));   

                                txtAddr1.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add1')); 
                                txtAddr2.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add2')); 
                                txtAddr3.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add3')); 
                                txtAddr4.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_city')); 
                                txtPin.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_pin')); 
                                txtGstNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_gst')); 
                                cmbState.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_state')); 

                                var cnt=loadInvoicedetailsDataStore.getCount();

      				for(var j=0; j<cnt; j++)
	                        {

					 RowCnt = flxDetail.getStore().getCount() + 1;
				         flxDetail.getStore().insert(
				         flxDetail.getStore().getCount(),
				         new dgrecord({
				           slno:RowCnt,

					   hsncode  : loadInvoicedetailsDataStore.getAt(j).get('invh_hsncode'),
		  			   varname  : loadInvoicedetailsDataStore.getAt(j).get('var_desc'),
				           varcode  : loadInvoicedetailsDataStore.getAt(j).get('invh_variety'),
			 		   shade    : loadInvoicedetailsDataStore.getAt(j).get('invh_shade'),
		     			   size     : loadInvoicedetailsDataStore.getAt(j).get('invh_size'),
					   weight   : loadInvoicedetailsDataStore.getAt(j).get('invh_wt'),
					   rate     : loadInvoicedetailsDataStore.getAt(j).get('invh_rate'),
					   value    : loadInvoicedetailsDataStore.getAt(j).get('invh_value'),
					   taxval   : loadInvoicedetailsDataStore.getAt(j).get('invh_taxable'),

				         }) 
				       );
                                }

              // grid_tot();
              calculateItemValue();

                        }

                        });


//     grid_tot();
//calculateItemValue(); 



                }

	}

});



var cmbTransport = new Ext.form.ComboBox({
        fieldLabel      : 'Transport ',
        width           : 350,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbTransport',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTransportStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
        select: function(){
		  transcode = cmbTransport.getValue();                     
                          }
       }   

});

var colname;

function calculateItemValue(){
   grid_tot();
   var taxable = 0;
   var value1 = 0;
   var tdisc = 0;
   var ins = 0;
   var cgst = 0;
   var sgst = 0;
   var igst = 0;
   var frt  = 0;
   var oth = 0;
   var taxabletotal = 0;
   var invround  =0;
   var netamt =0;
   var tcs = 0;

  txtInsAmt.setRawValue(0);
  txtCgstAmt.setRawValue(0);
  txtSgstAmt.setRawValue(0);
  txtIgstAmt.setRawValue(0);
  txtFrtAmt.setRawValue(0);
  txtOthers.setRawValue(0);
  txtTCSAmt.setRawValue(0);

   txtvalue.setValue(Number(txtrate.getValue())*Number(txtqty.getValue()));
   var Row= flxDetail.getStore().getCount();



        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {


           tdisc = 0;




          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight ;

//          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight /1000;          

          value1 =  Ext.util.Format.number(value1,'0.00');


//'FOR STORE DATA IN GRID
          sel[i].set('value', value1);
//



//          sel[i].data.value = sel[i].data.rate;
         //sel[i].data.value = (sel[i].data.rate - tdisc)/ sel[i].data.weight /1000;
        }
//alert(tdisc);


//       sel[i].data.value.setValue((sel[i].data.rate - tdisc)/ sel[i].data.weight /1000);
 //       sel[i].data.value.setValue(sel[i].data.rate);


          grid_tot();

      
          if (txtFrt.getRawValue() > 0 && value1 > 0 )  {
//alert(txtFrtQty.getRawValue());
             frt = Math.round(Number(txtFrtQty.getRawValue()) * Number(txtFrt.getRawValue()));
          }
//temp 
      //    frt = txtFrt.getRawValue();
               
          if (txtInsPer.getRawValue() > 0 && txttotvalue.getRawValue() > 0 )  {
             ins = (txttotvalue.getRawValue() * txtInsPer.getRawValue()/100);   
          }


          txtInsAmt.setRawValue(Ext.util.Format.number(ins,'0.00'));
          txtFrtAmt.setRawValue(Ext.util.Format.number(frt,'0.00'));


          grid_tot();


          taxabletotal = (Number(txttotvalue.getRawValue()) + Number(txtInsAmt.getRawValue()) + Number(txtFrtAmt.getRawValue()));

          txttottaxable.setRawValue(Ext.util.Format.number(taxabletotal,'0.00'));

    

          if (txtCgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             cgst = Math.round(taxable * txtCgstPer.getRawValue()/100);
             cgst = taxabletotal * txtCgstPer.getRawValue()/100;   
             cgst = cgst.toFixed(2);
//             cgst = Math.round(cgst*100/100);
          }

          txtCgstAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
          
          if (txtSgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             sgst = Math.round(taxabletotal * txtSgstPer.getRawValue()/100); 
             sgst = taxabletotal * txtSgstPer.getRawValue()/100; 
             sgst = sgst.toFixed(2);
          }
          txtSgstAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));


          if (txtIgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             igst = Math.round(taxabletotal * txtIgstPer.getRawValue()/100); 
             igst = taxabletotal * txtIgstPer.getRawValue()/100; 
             igst = igst.toFixed(2);

          }
          txtIgstAmt.setRawValue(Ext.util.Format.number(igst,'0.00'))


      findtaxablevalue();
      if (txtTCSPer.getRawValue() > 0 && taxabletotal > 0 )  {
           tcs =  (Number(taxabletotal) + Number(cgst) + Number(sgst) + Number(igst)) * txtTCSPer.getValue() /100;

           txtTCSAmt.setRawValue(Math.round(tcs*100/100));
      }

      netamt =  Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtTCSAmt.getRawValue());

//alert(txttottaxable.getRawValue());
//alert(netamt);

      netamt = Math.round(netamt*100/100);


      txtNetAmt.setRawValue(Ext.util.Format.number(netamt,'0.00'));

      invround = Number(netamt) - (Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtTCSAmt.getRawValue()));


      txtRound.setRawValue(Ext.util.Format.number(invround,'0.00'))

 

}


function calculateValue(){
   grid_tot();
   var value = 0;
   var taxable = 0;
   var value1 = 0;
   var tdisc = 0;
   var ins = 0;
   var cgst = 0;
   var sgst = 0;
   var igst = 0;
   var frt  = 0;
   var oth = 0;
   var taxabletotal = 0;
   var invround  =0;
   var netamt =0;


     var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
           value = (Number(sel[i].data.weight)/1000) * (Number(sel[i].data.rate) - Number(sel[i].data.disc)) ;
           if (txtFrt.getValue() > 0 && txttottaxable.getValue() > 0 ) 
           {
               frt = Math.round(Number(txtFrtQty.getRawValue()) * Number(txtFrt.getRawValue()));
           }
     
           if (txtInsPer.getRawValue() > 0 && txttottaxable.getValue() > 0 )  {
              ins = Math.round(txttotvalue.getRawValue() * txtInsPer.getRawValue()/100);   
           }
           txtInsAmt.setRawValue(Ext.util.Format.number(ins,'0.00'));
           txtFrtAmt.setRawValue(Ext.util.Format.number(frt,'0.00'));
           value1 = Number(value) +  Number(ins) + Number(frt);
           sel[i].set('taxval', Ext.util.Format.number(value1,'0.00'));
         }

      //grid_tot();

          taxabletotal = txttottaxable.getValue();

          if (txtCgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             cgst = Math.round(taxable * txtCgstPer.getRawValue()/100);
             cgst = taxabletotal * txtCgstPer.getRawValue()/100;   
             cgst = Math.round(cgst*100/100);
          }

          txtCgstAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
          
          if (txtSgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
             sgst = Math.round(taxabletotal * txtSgstPer.getRawValue()/100); 
          }
          txtSgstAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));


          if (txtIgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
             igst = Math.round(taxabletotal	 * txtIgstPer.getRawValue()/100); 
          }
          txtIgstAmt.setRawValue(Ext.util.Format.number(igst,'0.00'))
       


        // findtaxablevalue();


         netamt =  Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtOthers.getRawValue());

         netamt = Math.round(netamt*100/100);
         txtNetAmt.setRawValue(Ext.util.Format.number(netamt,'0.00'));

          invround = Number(netamt) - (Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtOthers.getRawValue()));
      txtRound.setRawValue(Ext.util.Format.number(invround,'0.00'))


}


function grid_tot(){

        var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            wt=wt+Number(sel[i].data.weight);
            value1=value1+Number(sel[i].data.value);
            taxable=taxable+Number(sel[i].data.taxval);  
         }
 
         txttotqty.setRawValue(Ext.util.Format.number(wt,'0.000'));
         txttotvalue.setRawValue(Ext.util.Format.number(value1,'0.00'));
         txttottaxable.setRawValue(Ext.util.Format.number(taxable,'0.00'));
	 txtFrtAmt.setValue(Math.round(Number(txtFrtQty.getRawValue()) * Number(txtFrt.getRawValue())));         

}

function findtaxablevalue(){
        var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
//'FOR STORE DATA IN GRID
           if (Number(sel[i].data.value) > 0 && txttotvalue.getRawValue() > 0 && txttottaxable.getRawValue() > 0 )  {
              value1=Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue());
              sel[i].set('taxval', Ext.util.Format.number(value1,'0.00'));
           }  
         }
}


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:30,
    height: 80,
    hidden:false,
    width: 990,
//    font-size:18px,
    columns:
    [
       {header: "HSN Code", dataIndex:'hsncode',sortable:true,width:100,align:'left'},
       {header: "Variety", dataIndex:'varname',sortable:true,width:100,align:'left'},
       {header: "Var Code", dataIndex:'varcode',sortable:true,width:100,align:'left'},
       {header: "Shade", dataIndex:'shade',sortable:true,width:100,align:'left'},
       {header: "Size", dataIndex:'size',sortable:true,width:100,align:'left'},
       {header: "Weight", dataIndex:'weight',sortable:true,width:100,align:'left'},
       {header: "Rate", dataIndex:'rate',sortable:true,width:100,align:'left'},
       {header: "Value", dataIndex:'value',sortable:true,width:100,align:'left'},
       {header: "Tax Value", dataIndex:'taxval',sortable:true,width:100,align:'left'},
    ],

    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'PROFRMA INVOICE',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete',
             fn: function(btn){
        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();


         		gridedit = "true";
			editrow = selrow;





			


                        cmbhsncode.setValue(selrow.get('hsncode'));  
                        cmbVariety.setRawValue(selrow.get('varname'));  
			cmbVariety.setValue(selrow.get('varcode'));
			cmbShade.setRawValue(selrow.get('shade'));
			txtsize.setValue(selrow.get('size'));
			txtqty.setValue(selrow.get('weight'));

			txtrate.setValue(selrow.get('rate'));
                        txtvalue.setValue(selrow.get('value'));


			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
		calculateItemValue();
             }
        });         
    }

   }
});








var TrnSalesInvoice = new Ext.TabPanel({
    id          : 'Sales Proforma Invoice',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1500,
    x           : 2,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: ' Item Details',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
//item - 2 - start
                     items: [
                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 500,
                               height      : 120,
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
                                       items: [txtInvNo]
                                      },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [cmbInvNo]
                                      },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 50,
                		       width       : 400,
		                       x           : 230,
                		       y           : 0,
		                       border      : false,
                		       items: [dptInvNo]
   		                     },
                   	
                                     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 550,
                                       x           : 0,
                                       y           : 45,
                                       border      : false,
                                       items: [cmbCustomer]
                                     },
                    
		  	           ]	  
//item - 3 - end
                             },
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 500,
                                  height      : 120,
                                  x           : 550,
                                  y           : 10,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                     	     { 
                                                  xtype       : 'fieldset',
                         		          title       : '',
		                                  labelWidth  : 80,
                		                  width       : 250,
                                                  x           : 0,
		                                  y           : 0,
                		                  border      : false,
                                		  items: [txtReference]
		                             },
	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 400,
                                                  x           : 250,
          		                          y           : 0,
                        	                  border      : false,
                                                  items: [dptRef]
   		                            },


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 80,
                                                  width       : 480,
                                                  x           : 0,
                                                  y           : 30,
                                                  border      : false,
                                                  items: [txtCreditDays]
                                            },

      


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 80,
                                                  width       : 410,
                                                  x           : 0,
                                                  y           : 60,
                                                  border      : false,
                                                  items: [cmbTax]
                                            },
                                        ]
                             },
// RIGHT PANEL END

// BOTTOM PANEL START2.Test

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 1045,
                                  height      : 350,
                                  x           : 10,
                                  y           : 140,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                            xtype       : 'fieldset',
                                            title       : '',
                                            width       : 1010,
                                            height      : 210,
                                            x           : 0,
                                            y           : 0,
                                            border      : true,
                                            layout      : 'absolute',
		                            items:[
                                                 {
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    width       : 350,
                                                    labelWidth  : 60,
		                                    x           : 0,
		                                    y           :-10,
		                                    border      : false,
		                                    items:[cmbVariety]
		                                  } ,
		                                 { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 30,
		                                    width       : 200,
		                                    x           : 370,
		                                    y           : -10,
		                                    border      : false,
		                                    items: [cmbhsncode]
		                                 },
		                                 { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 60,
		                                    width       : 220,
		                                    x           : 520,
		                                    y           : -10,
		                                    border      : false,
                                                    items: [cmbShade]
		                                 },
		                                 { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 60,
		                                    width       : 220,
		                                    x           : 670,
		                                    y           : -10,
		                                    border      : false,
		                                    items: [txtsize]
		                                 },

		                                 { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 60,
		                                    width       : 140,
		                                    x           : 0,
		                                    y           : 30,
		                                    border      : false,
		                                    items: [txtqty]
		                                 },
		                                 { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 60,
		                                    width       : 180,
		                                    x           : 180,
		                                    y           : 30,
                                                    border      : false,
		                                    items: [txtrate]
		                                 },


		                                { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 50,
		                                    width       : 500,
		                                    x           : 530,
		                                    y           : 30,
		                                    border      : false,
		                                    items: [txtvalue]
		                                 },

		                                { 
		                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    labelWidth  : 50,
		                                    width       : 500,
		                                    x           : 800,
		                                    y           : 30,
		                                    border      : false,
		                                    items: [btnSubmit]
		                                 },


                                                  {
                                                    xtype       : 'fieldset',
		                                    title       : '',
		                                    width       : 1010,
		                                    x           : 0,
		                                    y           : 60,
		                                    border      : false,
		                                    items:[flxDetail]
                                                  } ,
                                                 ]
                                          },      
                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 50,
                                                y           : 170,
                                                border      : false,
                                                items: [txttotqty] 
                                          },


                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 400,
                                                y           : 170,
                                                border      : false,
                                                items: [txttotvalue] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 700,
                                                y           : 170,
                                                border      : false,
                                                items: [txttottaxable] 
                                             },




                                        ] 
                               },
    
                               {                               
                                             xtype       : 'fieldset',
                                             title       : 'GST %',
                                             width       : 400,
                                             height      : 100,
                                             x           : 20,
                                             y           : 360,
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


                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 0,
                                                y           : 25,
                                                border      : false,
                                                items: [txtCgstAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 110,
                                                y           : 25,
                                                border      : false,
                                                items: [txtSgstAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 40,
                                                width       : 150,
                                                x           : 220,
                                                y           : 25,
                                                border      : false,
                                                items: [txtIgstAmt] 
                                             },
 					    ],	
                               },

                               {   
                                             xtype       : 'fieldset',
                                             title       : 'INSURANCE / FREIGHT & OTHERS',
                                             width       : 360,
                                             height      : 100,
                                             x           : 430,
                                             y           : 360,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                              {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 10,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblInsPer]
                                             },
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 80,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblFrtQty]
                                             },                    
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 180,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblFrt]
                                             },

                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 260,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblTCS]
                                             },

                        
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 0,
                                                y           : 10,
                                                border      : false,
                                                items: [txtInsPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 70,
                                                y           : 10,
                                                border      : false,
                                                items: [txtFrtQty] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 125,
                                                x           : 150,
                                                y           : 10,
                                                border      : false,
                                                items: [txtFrt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 125,
                                                x           : 245,
                                                y           : 10,
                                                border      : false,
                                                items: [txtTCSPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 1,
                                                width       : 100,
                                                x           : 0,
                                                y           : 35,
                                                border      : false,
                                                items: [txtInsAmt] 
                                             },

                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 145,
                                                y           : 35,
                                                border      : false,
                                                items: [txtFrtAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 150,
                                                x           : 240,
                                                y           : 35,
                                                border      : false,
                                                items: [txtTCSAmt] 
                                             },

 					     ]	
                                 },

                                 {   
                                             xtype       : 'fieldset',
                                             title       : '',
                                             width       : 240,
                                             height      : 95,
                                             x           : 800,
                                             y           : 365,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[

                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 150,
                                                x           : 1,
                                                y           : 5,
                                                border      : false,
                                                items: [txtRound] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 250,
                                                x           : 1,
                                                y           : 40,
                                                border      : false,
                                                items: [txtNetAmt] 
                                             },
 					     ]	
                                 },
           



                           ]

                        },



//TAB2 START
                        {
                           xtype: 'panel',
                           title: 'Document & Transport Details',bodyStyle:{"background-color":"#ebebdf"},
                           layout: 'absolute',
 	                   items: [

//Delivery Address box Start

                             {   
                                  xtype       : 'fieldset',
                                  title       : 'DELIVERY ADDRESS',
                                  width       : 600,
                                  height      : 200,
                                  x           : 15,
                                  y           : 50,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : -10,
                                             border      : false,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 17,	
                                             border      : false,
                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 44,
                                             border      : false,
                                             items: [txtAddr3] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 71,	
                                             border      : false,
                                             items: [txtAddr4] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 0,
                                             y           : 95,	
                                             border      : false,
                                             items: [cmbState] 
                                         },


                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 200,
                                             x           : 0,
                                             y           : 127,	
                                             border      : false,
                                             items: [txtPin] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 300,
                                             x           : 250,
                                             y           : 127,	
                                             border      : false,
                                             items: [txtGstNo] 
                                         },


 					]	
                            },
//Delivery Address box End


                            ]
                        },
//TAB2 END
         ]
});



var TrnSalesInvoicePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES PROFORMA INVOICE ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesInvoicePanel',
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
//alert(a4yn);
                    gstFlag = "Edit";
                    Ext.getCmp('cmbInvNo').show();
                    loadInvoicelistDataStore.removeAll();
                    loadInvoicelistDataStore.load({
     			url: 'ClsTrnSalesProformaInvoice.php',
			params: {
			    task: 'loadInvoiceNoList',
			    finid: GinFinid,
			    compcode:GinCompcode,
		        },
                      	callback:function()
                        {
//			    alert(loadInvoicelistDataStore.getCount());	
                        }
             	    });



                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
/*
alert(cmbCustomer.getValue());
alert(taxcode);
alert(cmbSlipNo.getRawValue());  
alert(agentcode);
alert(ourbankcode);
alert(cmbState.getValue());*/
   //SAVE          
     var gstSave;


                    gstSave="true";
                    if (txtInvNo.getRawValue()==0 || txtInvNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Invoice no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Sales-Invoice','Grid should not be empty..');
        	                gstSave="false";
	                    }

                    else if (cmbTax.getRawValue()==0 || cmbTax.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Tax Type.....');
                        gstSave="false";
                    }



/*                    else if (txtDestination.getRawValue()=="" )
                    {
                        Ext.Msg.alert('Sales-Invoice','Enter Destination.....');
                        gstSave="false";
                        txtDestination.setfocus();
                   }
*/
                    else{



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

                           
                            var invData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(invData, function (record) {
                                poupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnSalesProformaInvoieSave.php',

                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: invData.length,
                                savetype:gstFlag,
                             	invhcompcode  :GinCompcode,

				invhfincode   :GinFinid,
				invhno        :txtInvNo.getRawValue(),
				invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
				invhpartyordno:txtReference.getRawValue(),
				invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),

                   		invhtaxtag    :cmbTax.getValue(),
				invhparty     :cmbCustomer.getValue(),

				invhcrddays   :txtCreditDays.getRawValue(),  

				invhinsper    :txtInsPer.getRawValue(),
				invhfrtrate   :Number(txtFrt.getRawValue()),

	//			invhothers    :txtOthers.getRawValue(),
				invhsgstper   :txtSgstPer.getRawValue(),
				invhcgstper   :txtCgstPer.getRawValue(),
				invhigstper   :txtIgstPer.getRawValue(),
				invhsgstamt   :txtSgstAmt.getRawValue(),
				invhcgstamt   :txtCgstAmt.getRawValue(),
				invhigstamt   :txtIgstAmt.getRawValue(),


				invhroff      :txtRound.getRawValue(),
				invhnetamt    :txtNetAmt.getRawValue(),


                               invhdelivery_add1 :txtAddr1.getRawValue(),
                               invhdelivery_add2 :txtAddr2.getRawValue(),
                               invhdelivery_add3 :txtAddr3.getRawValue(),
                               invhdelivery_city :txtAddr4.getRawValue(),
                               invhdelivery_pin  :txtPin.getRawValue(), 
                               invhstatecode     :cmbState.getValue(), 
                               invhdelivery_gst  :txtGstNo.getRawValue() ,
		               invhtcsper        : Number(txtTCSPer.getRawValue()),
                               invhtcsamt        : Number(txtTCSAmt.getRawValue()),
                               frtqty            : txtFrtQty.getValue(),
                               invhfrtamt        :Number(txtFrtAmt.getRawValue()),


				},
                              callback: function(options, success, response)
                              {
//alert("Test");
//alert(Reels);
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Proforma Invoice Saved  -" + obj['msg']);
//                                    RefreshData();
                                    TrnSalesInvoicePanel.getForm().reset();

                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Proforma Invoice Not Saved- " + obj['msg']);                                                  
                                    }
                                }
                           });       
   
                          	}
     				}
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
                    TrnSalesInvoicePanel.getForm().reset();
                    RefreshData();
                }
            }
        },'-',
        {
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

			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&fincode="  + encodeURIComponent(GinFinid);
			var p3 = "&invno=" + encodeURIComponent(cmbInvNo.getRawValue());
                        var param = (p1 + p2 + p3);  
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesProformaInvoice.rptdesign&__format=pdf'+ param); 
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
                    TrnSalesInvoiceWindow.hide();
                }
            }
        }]
    },
     items: [ TrnSalesInvoice ]
});



   function refresh(){
        txtsize.setValue('');
        txtqty.setValue('');
        txtrate.setValue('');
        txtdisc.setValue('');

   };
    

   function RefreshData(){
        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbInvNo').hide();
 	loadInvnodatastore.removeAll();
	loadInvnodatastore.load({
        url: 'ClsTrnSalesProformaInvoice.php',
        params: {
                    task: 'loadInvoiceNo',
                    compcode:GinCompcode,
                    finid:GinFinid  
                },
		callback:function()
      		{
                 txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));
               }
	  });

   };
   




    var TrnSalesInvoiceWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - PROFORMA INVOICE ENTRY',
        items       : TrnSalesInvoicePanel,
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
//alert(a4yn);
			loadInvnodatastore.removeAll();

			loadInvnodatastore.load({
		                url: 'ClsTrnSalesProformaInvoice.php',
		                params: {
		                    task: 'loadInvoiceNo',
                                    compcode:GinCompcode,
                                    finid:GinFinid  
		                },
				callback:function()
	               		{

                                  txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));
    				}
			  });

			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesProformaInvoice.php',
		                params: {
		                    task: 'loadcustomer',
	
		                }
//,
//                                callback:function()
//                                {
//alert(loadAllCustomerStore.getCount());
//                                }

			  });
                    }
        } 
    });
       TrnSalesInvoiceWindow.show();  
});
