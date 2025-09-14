Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var usertype = localStorage.getItem('ginuser');

   var a4yn = localStorage.getItem('A4YN');

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
 
   var sales_ledcode ,cgst_ledcode ,sgst_ledcode ,igst_ledcode = 0;

var accrefno = 0;     
   var vouno = ''
//   var a4inv = "Y";
//   var a4inv  = a4yn;

   var desplocation = "V";
 var loadhsnDataStore = new Ext.data.Store({
      id: 'loadhsnDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsnlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'tariff_code', type: 'int',mapping:'tariff_code'},
	{name:'tariff_name', type: 'string',mapping:'tariff_name'}
      ]),
    });


   var loadInvnodatastore = new Ext.data.Store({
      id: 'loadInvnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
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


   var loadInvoicelistDataStore = new Ext.data.Store({
      id: 'loadInvoicelistDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
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
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_ref','invh_date','invh_party','invh_slipno','invh_agent','invh_docu','invh_our_bank','invh_crd_days','invh_grace_days',
'invh_odiper','invh_vehi_no','invh_trans','invh_lrno','invh_lrdate','invh_dest','invh_desp_location','invh_lcno','invh_lcdate','invh_party_bank',
'invh_delivery_add1','invh_delivery_add2','invh_delivery_add3','invh_delivery_city','invh_delivery_pin','invh_delivery_gst','invh_statecode','invh_taxtag',
'invh_instruction1','invh_instruction2','invh_dest','invh_party_ordno','invh_party_orddt','invh_our_ordno','invh_our_orddt','invh_sgst_per','invh_cgst_per',
'invh_igst_per','invh_insper','invh_comm','invh_frt_rate','invh_frt_amt','invh_party_bank','invh_noofbun','invh_noofreels','invh_type','type_name',
'invh_vouno','invh_acc_refno'
 
      ]),
    });



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
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

var PackslipnoDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pckh_no'
      ]),
    });

var PackslipdetailDataStore = new Ext.data.Store({
      id: 'PackslipdetailDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'type_name','type_code','weight','pckh_ordno','pckh_orddate','pckh_ackno','pckh_ackdt','nos','unit','rate','amount','pckh_date','varcode',
'var_name','hsncode','sizecode','var_size1','var_size2' ,'rate','amount','cashdisc','cashflg','dealdisc','dealflg','reeldisc','reelflg',
'regdisc','regflg','adddisc','addflg','qcdev','losspmt','ordt_crdays','ordt_comm','pckh_noofreels','pckh_noofbun','size'
      ]),
    });



/*
var PackslipdiscountDataStore = new Ext.data.Store({
      id: 'PackslipdiscountDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdiscount"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wt','pckh_ackno','pckh_ackdt','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
'var_tariffno','pckt_var','var_size1','var_size2'
      ]),
    });
*/

var PackslipAlldetailsDataStore = new Ext.data.Store({
      id: 'PackslipAlldetailsDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipalldetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'agentname','agentcode','ordh_tax','taxcode','tax_name','ordh_sgst','ordh_cgst','ordh_igst','ordh_ins_yn' ,'ordh_insper' ,   'ordh_gracedays','ordh_docu','ordh_dest','ordh_delivery_add1','ordh_delivery_add2','ordh_delivery_add3','ordh_delivery_city',
'ordh_delivery_pin','ordh_delivery_gst','ordh_cust_rem','ordh_our_rem','ordh_bank','transport','ordh_trans','ordh_odiper','ordh_frt'

      ]),
    });

/*
var PackslipinsuranceDataStore = new Ext.data.Store({
      id: 'PackslipinsuranceDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipinsurance"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wt','pckh_ackno','pckh_ackdt','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
'var_tariffno','pckt_var','var_size1','var_size2'
      ]),
    });
*/

 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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



 var loadStatesstore = new Ext.data.Store({
      id: 'loadStatesstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
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
        valueField      : 'var_code',
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
        allowblank      : true  ,
 });


var cmbHsnCode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN Code',
        width           : 250,
        displayField    : 'tariff_name', 
        valueField      : 'tariff_code',
        hiddenName      : '',
        id              : 'cmbHsnCode',
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



   var txtInvNo = new Ext.form.NumberField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtInvType = new Ext.form.TextField({
        fieldLabel  : 'Inv Type',
        id          : 'txtInvType',
        name        : 'txtInvType',
        width       :  250,
	readOnly : true,
        tabindex : 2
    });

   var txtReference = new Ext.form.TextField({
        fieldLabel  : 'Party Ord.No.',
        id          : 'txtReference',
        name        : 'txtReference',
        width       :  250,
	readOnly : true,
        tabindex : 2
    });

    var dptInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptInvNo',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });

    var dptRef= new Ext.form.DateField({
        fieldLabel: 'Ref.Date',
        id: 'dptRef',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });

    var dptSlip = new Ext.form.DateField({
        fieldLabel: 'Slip.Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });


   var txtSOC = new Ext.form.TextField({
        fieldLabel  : 'SOC.No.',
        id          : 'txtSOC',
        name        : 'txtSOC',
        width       :  250,
	readOnly : true,
        tabindex : 2
    });

    var dptSOC = new Ext.form.DateField({
        fieldLabel: 'SOC.Date',
        id: 'dptSOC',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });


    var lblInsPer = new Ext.form.Label({
       fieldLabel  : 'INS %',
       id          : 'lblInsPer',
       width       : 60
    });

   var lblFrt = new Ext.form.Label({
       fieldLabel  : 'FRT',
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
        listeners   :{
           blur:function(){
              calculateItemValue();
           }
        }
    });

   var txttotqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (Kgs)',
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
        listeners   :{
           blur:function(){
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

   var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Customer Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  500,
        tabindex : 2
    });

   var txtOurIns = new Ext.form.TextField({
        fieldLabel  : 'OurIns.',
        id          : 'txtOurIns',
        name        : 'txtOurIns',
        width       :  500,
        tabindex : 2
    });



   var txtVehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No.',
        id          : 'txtVehicle',
        name        : 'txtVehicle',
        width       :  250,
	readOnly : false,
        tabindex : 2
    });

   var txtLrNo = new Ext.form.TextField({
        fieldLabel  : 'LR No.',
        id          : 'txtLrNo',
        name        : 'txtLrNo',
        width       :  200,
        tabindex : 2
    });

    var dptLrNo = new Ext.form.DateField({
        fieldLabel: 'LR.Date',
        id: 'dptLrNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

   var txtLcNo = new Ext.form.TextField({
        fieldLabel  : 'LC No.',
        id          : 'txtLcNo',
        name        : 'txtLcNo',
        width       :  200,
        tabindex : 2
    });

    var dptLcNo = new Ext.form.DateField({
        fieldLabel: 'LC.Date',
        id: 'dptLcNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });




   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  100,
        tabindex : 2
    });


   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  100,
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





 var loadAgentStore = new Ext.data.Store({
      id: 'loadAgentStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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


 var findAgentDataStore = new Ext.data.Store({
      id: 'findAgentDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findAgentName"}, // this parameter asks for listing
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



 var loadTaxStore = new Ext.data.Store({
      id: 'loadTaxStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
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
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
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
	





var cmbSlipNo = new Ext.form.ComboBox({
        fieldLabel      : 'Slip No. ',
        width           : 100,
        displayField    : 'pckh_no', 
        valueField      : 'pckh_no',
        hiddenName      : '',
        id              : 'cmbSlipNO',
        typeAhead       : true,
        mode            : 'local',
        store           : PackslipnoDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
        select: function(){
	
			findAgentDataStore.load({
                        url: '/DPM/SALES/ClsSalesMain.php',
                        params:
                            {
                                task:"findAgentName",
                                custcode:cmbCustomer.getValue()                     
                            }
                        }); 

getpackslipdetails();
/*

			PackslipdetailDataStore.removeAll();
			PackslipdetailDataStore.load({

                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadslipdet",
                                custcode:cmbCustomer.getValue(),
				slipno : cmbSlipNo.getValue(),
				fincode : GinFinid,
				compcode : Gincompcode,   
                                a4 : a4yn                
                            },
                            scope: this,
                            callback:function() 
				{

                                socno = PackslipdetailDataStore.getAt(0).get('pckh_ackno');
                                txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
                                txtSOC.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ackno'));
                                dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
                                dptSOC.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_ackdt'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
                                txtInvType.setRawValue(PackslipdetailDataStore.getAt(0).get('type_name'));
                                txtCreditDays.setValue(PackslipdetailDataStore.getAt(0).get('ordt_crdays'));
                                commision =  PackslipdetailDataStore.getAt(0).get('ordt_comm');
                                invtype =  PackslipdetailDataStore.getAt(0).get('type_code');
                                bundles =  PackslipdetailDataStore.getAt(0).get('pckh_noofbun');
                                reels =  PackslipdetailDataStore.getAt(0).get('pckh_noofreels');
//alert(reels);

				PackslipAlldetailsDataStore.removeAll();
				PackslipAlldetailsDataStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params:
		                    {

		                        task:"loadslipalldetails",
		                        ordno:txtSOC.getRawValue(),
		                        ordno:socno,
				   	fincode : GinFinid,
					compcode : Gincompcode        
		                    },
		                    scope: this,
		                    callback:function() 

				    {
		                        txtCgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cgst'));
		                        txtSgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_sgst'));
		                        txtIgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_igst'));
		                        
		                        txtFrt.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_frt'));
	
				        cmbAgent.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('agentname'));


		                        agentcode = PackslipAlldetailsDataStore.getAt(0).get('agentcode'); 
	 
		                        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');

		                        ourbankcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_bank');
		                        transcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_trans');

		                        odiper = PackslipAlldetailsDataStore.getAt(0).get('ordh_odiper');
					cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		                        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

		                        cmbDocuments.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_docu'));   
		                        txtPartyBank.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_bank'));     
		                        txtGraceDays.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_gracedays')); 
		                        txtDestination.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_dest'));   
		                        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cust_rem'));
		                        txtOurIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_our_rem')); 

		                        txtAddr1.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add1')); 
		                        txtAddr2.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add2')); 
		                        txtAddr3.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add3')); 
		                        txtAddr4.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_city')); 
		                        txtPin.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_pin')); 
		                        txtGstNo.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_gst')); 

		                        cmbTransport.setValue(PackslipAlldetailsDataStore.getAt(0).get('transport'));

			                calculateItemValue(); 

					getTaxDataStore.removeAll();      
					getTaxDataStore.load({
					    url: 'ClsTrnSalesInvoice.php', // File to connect to
                                             params:
						    {
						        task: "findTaxCode",
						        taxcode:PackslipAlldetailsDataStore.getAt(0).get('ordh_tax')
						    },
					    callback: function () {
						var cnt = getTaxDataStore.getCount(); 
						if (cnt > 0) {
						           txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
						           txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
						           txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
						           taxcode = getTaxDataStore.getAt(0).get('tax_code');

						           sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
						           cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
						           sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
						           igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

						           calculateItemValue();

				                }
     
						 else {
                                                     alert('not found');

					        } 
					   }

					});
		                    }
		                }); 
		             }
                      }); 
*/

         },
   blur:function(){
           calculateItemValue();

        }
	}
});



function loadpackingslip()
{

}


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
	
	

			findAgentDataStore.load({
                        url: '/DPM/SALES/ClsSalesMain.php',
                        params:
                            {
                                task:"findAgentName",
                                custcode:cmbCustomer.getValue()                     
                            }
                        }); 
 
			PackslipnoDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params:
                            {
                                task:"loadslipno",
    		           	fincode : GinFinid,
				compcode : Gincompcode,                                
                                custcode:cmbCustomer.getValue()                     
                            },
                         callback:function() 
                      	 {
                  	      cmbSlipNo.setValue(PackslipnoDataStore.getAt(0).get('pckh_no'));
		  	      getpackslipdetails();

                         }

                        }); 
   
         }
	}
 
});




function getpackslipdetails()
{
	PackslipdetailDataStore.removeAll();
	PackslipdetailDataStore.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdet",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
		a4 : a4yn                
	    },
	    scope: this,
	    callback:function() 
		{

		socno = PackslipdetailDataStore.getAt(0).get('pckh_ackno');
		txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
		txtSOC.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ackno'));
		dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
		dptSOC.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_ackdt'),"d-m-Y"));
		dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
		txtInvType.setRawValue(PackslipdetailDataStore.getAt(0).get('type_name'));
		txtCreditDays.setValue(PackslipdetailDataStore.getAt(0).get('ordt_crdays'));
		commision =  PackslipdetailDataStore.getAt(0).get('ordt_comm');
		invtype =  PackslipdetailDataStore.getAt(0).get('type_code');
		bundles =  PackslipdetailDataStore.getAt(0).get('pckh_noofbun');
		reels =  PackslipdetailDataStore.getAt(0).get('pckh_noofreels');

		PackslipAlldetailsDataStore.removeAll();
		PackslipAlldetailsDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params:
		    {

		        task:"loadslipalldetails",
		        ordno:txtSOC.getRawValue(),
		        ordno:socno,
		   	fincode : GinFinid,
			compcode : Gincompcode        
		    },
		    scope: this,
		    callback:function() 

		    {
		        txtCgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cgst'));
		        txtSgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_sgst'));
		        txtIgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_igst'));
		        
		        txtFrt.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_frt'));

			cmbAgent.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('agentname'));


		        agentcode = PackslipAlldetailsDataStore.getAt(0).get('agentcode'); 

		        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');

		        ourbankcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_bank');
		        transcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_trans');

		        odiper = PackslipAlldetailsDataStore.getAt(0).get('ordh_odiper');
			cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

		        cmbDocuments.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_docu'));   
		        txtPartyBank.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_bank'));     
		        txtGraceDays.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_gracedays')); 
		        txtDestination.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_dest'));   
		        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cust_rem'));
		        txtOurIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_our_rem')); 

		        txtAddr1.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add1')); 
		        txtAddr2.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add2')); 
		        txtAddr3.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add3')); 
		        txtAddr4.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_city')); 
		        txtPin.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_pin')); 
		        txtGstNo.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_gst')); 

		        cmbTransport.setValue(PackslipAlldetailsDataStore.getAt(0).get('transport'));

		        calculateItemValue(); 

			getTaxDataStore.removeAll();      
			getTaxDataStore.load({
			    url: 'ClsTrnSalesInvoice.php', // File to connect to
		             params:
				    {
					task: "findTaxCode",
					taxcode:PackslipAlldetailsDataStore.getAt(0).get('ordh_tax')
				    },
			    callback: function () {
				var cnt = getTaxDataStore.getCount(); 
				if (cnt > 0) {
					   txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
					   txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
					   txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));
					   taxcode = getTaxDataStore.getAt(0).get('tax_code');

					   sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
					   cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
					   sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
					   igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

					   calculateItemValue();

			        }

				 else {
		                     alert('not found');

				} 
			   }

			});
		    }
		}); 
	     }
	}); 


}



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
            url: 'ClsTrnSalesInvoice.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findTaxCode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_code','tax_cgst','tax_sgst','tax_igst','tax_sal_led_code','tax_cgst_ledcode','tax_sgst_ledcode','tax_igst_ledcode'])
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
            select: function ()             
            {

                getTaxDataStore.removeAll();
        
                getTaxDataStore.load({
                    url: 'ClsTrnSalesInvoice.php', // File to connect to
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

                                   sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
                                   cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
                                   sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
                                   igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');

                                   calculateItemValue();
//alert(getTaxDataStore.getAt(0).get('sales_ledcode'));
alert(sales_ledcode);
alert(cgst_ledcode);
alert(sgst_ledcode);
alert(igst_ledcode);
                                    }
                         else {alert('not found');

                       } 
                   }

                });
               

           } 
        }    


});


function getgstdetails()
{

}



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


var cmbDespLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Despatch From ',
        width           : 350,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : 'field1',
        id              : 'cmbDespLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : [['V','VILAMPATTI'],['C','COIMBATORE']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,        
        listeners:{
	
        select: function(){
                   if (cmbDespLocation.getRawValue() == "VILAMPATTI") {
                       desplocation = "V";
                    }
                   else {
                       desplocation = "C";
                   }

               }

       } 
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
        mode            : 'remote',
        store           : 'loadBankNameStore',
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
//                        griddet.getStore().removeAll();

			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                	invno:cmbInvNo.getValue()
		                },
				scope: this,
                                callback:function()
                                {
                                cmbCustomer.setValue(loadAllCustomerStore.getAt(0).get('cust_code')); 
                                }

			  });

                    	loadInvoicedetailsDataStore.load({
			url: 'ClsTrnSalesInvoice.php',
			params: {
			        task: 'loadInvoiceNoDetails',
				invno:cmbInvNo.getValue(),
				compcode :Gincompcode,
                                finid:GinFinid
			},
                      	callback:function()
                  	{

                                txtInvNo.setValue(cmbInvNo.getValue());
                                partycode = loadInvoicedetailsDataStore.getAt(0).get('invh_party');
                                agentcode = loadInvoicedetailsDataStore.getAt(0).get('invh_agent');



                                dptInvNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));



                                accrefno = loadInvoicedetailsDataStore.getAt(0).get('invh_acc_refno');

alert(accrefno);

                                txtReference.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_ordno'));
                                txtSOC.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_our_ordno'));
                                dptRef.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_party_orddt'),"d-m-Y"));
                                dptSOC.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_our_orddt'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));
                                txtInvType.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('type_name'));


                                txtLrNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_lrno'));
                                dptLrNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_lrdate'),"d-m-Y"));

                                txtLcNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_lcno'));
                                dptLcNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_lcdate'),"d-m-Y"));


                                commision =  loadInvoicedetailsDataStore.getAt(0).get('invh_comm');
                                invtype =  loadInvoicedetailsDataStore.getAt(0).get('invh_type');
                                bundles =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofbun');
                                reels =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofreels');


                                cmbAgent.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_agent'));   

                                cmbSlipNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));        
                                cmbSlipNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));    

                                txtCgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_cgst_per'));
                                txtSgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_sgst_per'));
                                txtIgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_igst_per'));
           
                                taxcode = loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag');

                                cmbTax.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag'));
                                transcode = loadInvoicedetailsDataStore.getAt(0).get('invh_trans');
                                cmbTransport.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_trans'));
//alert(loadInvoicedetailsDataStore.getAt(0).get('invh_vehi_no'));
                                txtVehicle.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_vehi_no'));

                                txtInsPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_insper'));
                                txtFrt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_rate'));
                                txtFrtAmt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_amt'));

                                cmbDocuments.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_docu'));   
                                txtPartyBank.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_bank'));  
                                txtCreditDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_crd_days')); 
                                txtGraceDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_grace_days')); 
                                txtDestination.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_dest'));   
                                txtCustIns.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_instruction1'));
                                txtOurIns.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_instruction2')); 
 
                                txtAddr1.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add1')); 
                                txtAddr2.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add2')); 
                                txtAddr3.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add3')); 
                                txtAddr4.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_city')); 
                                txtPin.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_pin')); 
                                txtGstNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_gst')); 

                                ourbankcode = loadInvoicedetailsDataStore.getAt(0).get('invh_our_bank');
               
                                odiper = loadInvoicedetailsDataStore.getAt(0).get('invh_odiper');
                                vouno  =  loadInvoicedetailsDataStore.getAt(0).get('invh_vouno');
 
//alert(loadInvoicedetailsDataStore.getAt(0).get('invh_vouno'));

    
                                slipno = loadInvoicedetailsDataStore.getAt(0).get('invh_slipno');        
                                cmbDespLocation.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_desp_location')); 

                                var cnt=loadInvoicedetailsDataStore.getCount();



					getTaxDataStore.removeAll();      
					getTaxDataStore.load({
					    url: 'ClsTrnSalesInvoice.php', // File to connect to
                                             params:
						    {
						        task: "findTaxCode",
						        taxcode:loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag')
						    },
					    callback: function () {
						var cnt = getTaxDataStore.getCount(); 
						if (cnt > 0) {
						           txtCgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_cgst'));
						           txtSgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_sgst'));
						           txtIgstPer.setRawValue(getTaxDataStore.getAt(0).get('tax_igst'));

						           sales_ledcode = getTaxDataStore.getAt(0).get('tax_sal_led_code');
						           cgst_ledcode  = getTaxDataStore.getAt(0).get('tax_cgst_ledcode');
						           sgst_ledcode  = getTaxDataStore.getAt(0).get('tax_sgst_ledcode');
						           igst_ledcode  = getTaxDataStore.getAt(0).get('tax_igst_ledcode');


				                }
     
						 else {
                                                     alert('not found');

					        } 
					   }

					});







          	          PackslipdetailDataStore.removeAll();
              		  PackslipdetailDataStore.load({

                          url: 'ClsTrnSalesInvoice.php',
                          params:
                            {
                                task:"loadslipdet",
                                custcode:partycode,
				slipno : cmbSlipNo.getValue(),
				fincode : GinFinid,
				compcode : Gincompcode,   
                                a4 : a4yn               
                            },
                            scope: this,
                            callback:function() 
			    {

//alert(PackslipdetailDataStore.getCount());
                               calculateItemValue(); 
                            }

                            }); 








                           calculateItemValue(); 




                        }

                        });


  




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

  txtInsAmt.setRawValue(0);
  txtCgstAmt.setRawValue(0);
  txtSgstAmt.setRawValue(0);
  txtIgstAmt.setRawValue(0);
  txtFrtAmt.setRawValue(0);
  txtOthers.setRawValue(0);

   var Row= flxDetail.getStore().getCount();
//alert(Row);
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {

           tdisc = 0;
           if (sel[i].data.cashflg=="Y") {
              tdisc = tdisc + Number(sel[i].data.cashdisc);
           }


           if (sel[i].data.dealflg=="Y") {
              tdisc = tdisc + Number(sel[i].data.dealdisc);
           }

           if (sel[i].data.reelflg=="Y") {
              tdisc = tdisc + Number(sel[i].data.reeldisc); 
           }

           if (sel[i].data.regflg=="Y") {
              tdisc = tdisc + Number(sel[i].data.regdisc); 
           }

           if (sel[i].data.addflg=="Y") {
              tdisc = tdisc + Number(sel[i].data.adddisc); 
           }

//alert(a4yn);

          if (a4yn == "Y") {
          sel[i].set('amount', sel[i].data.rate * sel[i].data.nos);
          value1 = (sel[i].data.rate - tdisc)* sel[i].data.nos;
          }
          else
          {
          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight /1000;
          }   
          

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
             frt = Math.round(Number(txttotqty.getRawValue()) * Number(txtFrt.getRawValue()));
          }
     
          if (txtInsPer.getRawValue() > 0 && txttotvalue.getRawValue() > 0 )  {
             ins = (txttotvalue.getRawValue() * txtInsPer.getRawValue()/100);   
          }

          txtInsAmt.setRawValue(Ext.util.Format.number(ins,'0.00'));
          txtFrtAmt.setRawValue(Ext.util.Format.number(frt,'0.00'));


          grid_tot();


          taxabletotal = (Number(txttotvalue.getRawValue()) + Number(txtInsAmt.getRawValue()) + Number(txtFrtAmt.getRawValue()));

          txttottaxable.setRawValue(Ext.util.Format.number(taxabletotal,'0'));

    

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


      findtaxablevalue();

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
//            taxable=taxable+Number(sel[i].data.taxval);  
         }
 
         txttotqty.setRawValue(Ext.util.Format.number(wt,'0.0'));
         txttotvalue.setRawValue(Ext.util.Format.number(value1,'0.00'));
//         txttottaxable.setRawValue(Ext.util.Format.number(taxable,'0.00'));
         findtaxablevalue(); 

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
              value1=Math.round(Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue()));
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
    x:10,
    y:0,
    height: 120,
    hidden:false,
    width: 990,
//    font-size:18px,
    columns:
    [
       {header: "HSN Code", dataIndex:'hsncode',sortable:true,width:100,align:'left'},
       {header: "Item Description", dataIndex:'var_name',sortable:true,width:100,align:'left'},
       {header: "Units", dataIndex:'unit',sortable:true,width:100,align:'left'},
       {header: "Weight", dataIndex:'weight',sortable:true,width:100,align:'left'},
       {header: "Rate", dataIndex:'rate',sortable:true,width:100,align:'left'},
       {header: "Amount", dataIndex:'amount',sortable:true,width:100,align:'left'},
       {header: "Var Code", dataIndex:'varcode',sortable:true,width:100,align:'left'},
       {header: "Size Code", dataIndex:'sizecode',sortable:true,width:100,align:'left'},
       {header: "Size", dataIndex:'size',sortable:true,width:100,align:'left'},
       {header: "Cash Disc", dataIndex:'cashdisc',sortable:true,width:100,align:'left'},
       {header: "Cash Y/N", dataIndex:'cashflg',sortable:true,width:100,align:'left'},
       {header: "Dealer Disc", dataIndex:'dealdisc',sortable:true,width:100,align:'left'},
       {header: "Dealer Y/N", dataIndex:'dealflg',sortable:true,width:100,align:'left'},
       {header: "Reel Disc", dataIndex:'reeldisc',sortable:true,width:100,align:'left'},
       {header: "Reel Y/N", dataIndex:'reelflg',sortable:true,width:100,align:'left'},
       {header: "REG Disc", dataIndex:'regdisc',sortable:true,width:100,align:'left'},
       {header: "REG Y/N", dataIndex:'regflg',sortable:true,width:100,align:'left'},
       {header: "Addnl Disc", dataIndex:'adddisc',sortable:true,width:100,align:'left'},
       {header: "Addnl Y/N", dataIndex:'addflg',sortable:true,width:100,align:'left'},
       {header: "Value", dataIndex:'value',sortable:true,width:100,align:'left'},
       {header: "Tax Value", dataIndex:'taxval',sortable:true,width:100,align:'left'},
       {header: "QC Dev Y/N", dataIndex:'qcdev',sortable:true,width:100,align:'left'},
       {header: "Loss Per MT", dataIndex:'losspmt',sortable:true,width:100,align:'left'},
       {header: "New Variety", dataIndex:'newvarty',sortable:true,width:100,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: loadProdnVariety,
		displayField: 'var_desc',
		valueField: 'var_code',
		hiddenName: 'var_desc',
	   	id: 'cmbVariety',
	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
				    	selectOnFocus: false,
				    	editable: true,
				    	allowblank: false,
				    	listeners: {
				        select: function () {
	
				        		   }
				    		}
					})
		  	},
       {header: "New HSN", dataIndex:'newhsn',sortable:true,width:100,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: loadhsnDataStore,
		displayField: 'tariff_name',
		valueField: 'tariff_code',
		hiddenName: 'tariff_code',
	   	id: 'cmbHsnCode',
	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
				    	selectOnFocus: false,
				    	editable: true,
				    	allowblank: false,
				    	listeners: {
				        select: function () {
	
				        		   }
				    		}
					})
         
       },

       {header: "New GSM", dataIndex:'newgsm',sortable:true,width:100,align:'left',
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "Nos", dataIndex:'nos',sortable:true,width:100,align:'left'},




    ],

    store: PackslipdetailDataStore,

    listeners:{

        keyup:function(){
           calculateItemValue();
        },
        keydown:function(){ 
           calculateItemValue();
        },
       blur:function(){
           calculateItemValue();

        }      
/*
         'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
	        var selected_rows = flxDetail.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++)
                {
		   colname = 'value';
                   selected_rows[i].set(colname, '100000');
                }
          }
*/
    }
/*
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         

    }

   }
*/

});







var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 200,
    y       : 300,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
//                var selrows = flxDetail.getSelectionModel().getCount();
  //              var sel = flxDetail.getSelectionModel().getSelections();
                var RowCnt = flxDetail.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetail.getSelectionModel().getCount();
                   var sel = flxDetail.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
            Ext.MessageBox.alert("Grid","Number " + sel[j].data.number + " Already Entered.");
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
	            if (cnt === 0)
	            {
            //             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
              //      }
                //    else
                  //  {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),
                      new dgrecord({
                            itemname: cmbSize.getRawValue(),
                            itemcode: cmbSize.getValue(),
                            number:i,
                            weight:txtWt.getRawValue(),
                            destag:'',
                            hsncode:''
                           })
                      );
                    }
                }
          }
  }
}
});




var TrnSalesInvoice = new Ext.TabPanel({
    id          : 'Sales Order Acceptance',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1500,
    x           : 2,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'Order & Item Details',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
//item - 2 - start
                     items: [
                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 500,
                               height      : 150,
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
                                       y           : 30,
                                       border      : false,
                                       items: [cmbCustomer]
                                     },

                                     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 220,
                                       x           : 0,
                                       y           : 60,
                                       border      : false,
                                       items: [cmbSlipNo]
   		                     },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 50,
                		       width       : 200,
		                       x           : 230,
                		       y           : 60,
		                       border      : false,
                		       items: [dptSlip]
                                     },  
                                     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 350,
                                       x           : 0,
                                       y           : 90,
                                       border      : false,
                                       items: [txtInvType]
                                      },               
                    
		  	           ]	  
//item - 3 - end
                             },
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 500,
                                  height      : 150,
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
                		                  width       : 250,
                                                  x           : 0,
		                                  y           : 30,
                		                  border      : false,
                                		  items: [txtSOC]
		                             },
	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 400,
                                                  x           : 250,
          		                          y           : 30,
                        	                  border      : false,
                                                  items: [dptSOC]
   		                            },


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 80,
                                                  width       : 480,
                                                  x           : 0,
                                                  y           : 60,
                                                  border      : false,
                                                  items: [cmbAgent]
                                            },
                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 80,
                                                  width       : 410,
                                                  x           : 0,
                                                  y           : 90,
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
                                  y           : 170,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                            xtype       : 'fieldset',
                                            title       : '',
                                            width       : 1010,
                                            height      : 170,
                                            x           : 0,
                                            y           : 0,
                                            border      : true,
                                            layout      : 'absolute',
                                            items:[ flxDetail
                                            ]
                                          } ,

                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 50,
                                                y           : 130,
                                                border      : false,
                                                items: [txttotqty] 
                                          },


                                          {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 100,
                                                width       : 400,
                                                x           : 400,
                                                y           : 130,
                                                border      : false,
                                                items: [txttotvalue] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 700,
                                                y           : 130,
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
                                             width       : 300,
                                             height      : 100,
                                             x           : 450,
                                             y           : 360,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                              {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 45,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblInsPer]
                                             },
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 120,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblFrt]
                                             },
                                             {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 190,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblOthers]
                                             },
                        
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 25,
                                                y           : 10,
                                                border      : false,
                                                items: [txtInsPer] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 125,
                                                x           : 95,
                                                y           : 10,
                                                border      : false,
                                                items: [txtFrt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 15,
                                                y           : 35,
                                                border      : false,
                                                items: [txtInsAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 90,
                                                y           : 35,
                                                border      : false,
                                                items: [txtFrtAmt] 
                                             },
                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 170,
                                                y           : 35,
                                                border      : false,
                                                items: [txtOthers] 
                                             },
 					     ]	
                                 },

                                 {   
                                             xtype       : 'fieldset',
                                             title       : '',
                                             width       : 240,
                                             height      : 100,
                                             x           : 770,
                                             y           : 360,
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
                                  {
                                   xtype       : 'fieldset',
                                   title       : '',
                                   width       : 1060,
                                   height      : 470,
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
                                            width       : 500,
                                            x           : 0,
                                            y           : 0,
                                            border      : false,
                                            items: [cmbDocuments]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 0,
                                            border      : false,
                                            items: [cmbTransport]
                                         },   
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 0,
                                            y           : 30,
                                            border      : false,
                                            items: [txtPartyBank]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 30,
                                            border      : false,
                                            items: [txtVehicle]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 0,
                                            y           : 60,
                                            border      : false,
                                            items: [cmbOurBank]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 60,
                                            border      : false,
                                            items: [txtLrNo]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 800,
                                            y           : 60,
                                            border      : false,
                                            items: [dptLrNo]
                                         },

                                        { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 0,
                                            y           : 90,
                                            border      : false,
                                            items: [txtLcNo]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 90,
                                            border      : false,
                                            items: [dptLcNo]
                                          },
 
                                       { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 0,
                                            y           : 120,
                                            border      : false,
                                            items: [txtCreditDays]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 120,
                                            border      : false,
                                            items: [txtGraceDays]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 0,
                                            y           : 150,
                                            border      : false,
                                            items: [txtDestination]
                                         },
                            
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 500,
                                            y           : 150,
                                            border      : false,
                                            items: [cmbDespLocation]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 800,
                                            x           : 0,
                                            y           : 180,
                                            border      : false,
                                            items: [txtCustIns]
                                         },
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 800,
                                            x           : 0,
                                            y           : 210,
                                            border      : false,
                                            items: [txtOurIns]
                                         },
                                  ],
                             },
//Delivery Address box Start
                             {   
                                  xtype       : 'fieldset',
                                  title       : 'DELIVERY ADDRESS',
                                  width       : 600,
                                  height      : 200,
                                  x           : 15,
                                  y           : 270,
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
    title       : 'SALES INVOICE ENTRY',
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
alert(usertype);
                    gstFlag = "Edit";
                    Ext.getCmp('cmbInvNo').show();
                    loadInvoicelistDataStore.removeAll();
                    loadInvoicelistDataStore.load({
     			url: 'ClsTrnSalesInvoice.php',
			params: {
			    task: 'loadInvoiceNoList',
			    finid: GinFinid,
			    compcode:Gincompcode,
                            a4:a4yn
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
/*
alert(cmbCustomer.getValue());
alert(taxcode);
alert(cmbSlipNo.getRawValue());  
alert(agentcode);
alert(ourbankcode);
alert(cmbState.getValue());*/
             
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

                    else if (cmbTransport.getValue()==0 || cmbTransport.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Transport.....');
                        gstSave="false";
                        cmbTransport.setfocus();
                    }

                    else if (txtDestination.getRawValue()=="" )
                    {
                        Ext.Msg.alert('Sales-Invoice','Enter Destination.....');
                        gstSave="false";
                        txtDestination.setfocus();
                   }
                    else if (taxcode == 0 )
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Tax Name.....');
                        gstSave="false";
                        txtDestination.setfocus();
                   }



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
//alert (dptInvNo.getValue());
/*
alert (gstFlag);
alert (GinFinid);
alert (txtInvNo.getRawValue());
alert (Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"));
alert (Ext.util.Format.date(dptInvNo.getValue(),"H:i"));
alert (invtype);
alert (txtReference.getRawValue());
alert (Ext.util.Format.date(dptRef.getValue(),"Y-m-d"));
alert (txtSOC.getRawValue());
alert (Ext.util.Format.date(dptSOC.getValue(),"Y-m-d"));
alert (cmbCustomer.getValue());
alert (agentcode);
alert (ourbankcode);
alert (cmbDocuments.getRawValue());
alert (txtCreditDays.getRawValue());
alert (txtGraceDays.getRawValue());
alert (odiper);
alert (taxcode);
alert (txtInsPer.getRawValue());
alert (txtInsAmt.getRawValue());
alert (commision);
alert (Number(txtFrt.getRawValue()));
alert (txtFrtAmt.getRawValue());
alert (txtRound.getRawValue());
alert (txtNetAmt.getRawValue());
alert (bundles);
alert (reels);
alert (txttotqty.getRawValue());
alert (0);
alert (cmbSlipNo.getRawValue());
alert (Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"));
alert ('');
alert ('');
alert (txtVehicle.getRawValue());
alert ('');
alert (Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"));
alert ('');
alert (transcode);
alert (txtLrNo.getRawValue());
alert (Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"));
alert (txtDestination.getRawValue());
alert ('0');
alert ('');
alert ('');
alert ('');
alert ('');
alert ('0');
alert (txttottaxable.getRawValue());
alert (txtLcNo.getRawValue());
alert (Ext.util.Format.date(dptLcNo.getValue(),"Y-m-d"));
alert ('0');
alert (Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"));
alert (txtPartyBank.getRawValue());
alert (desplocation);
alert (txtOthers.getRawValue());
alert (txtSgstPer.getRawValue());
alert (txtSgstAmt.getRawValue());
alert (txtCgstPer.getRawValue());
alert (txtCgstAmt.getRawValue());
alert (txtIgstPer.getRawValue());
alert (txtIgstAmt.getRawValue());
alert (a4yn);
alert ('N');
alert (0);
alert ( '0.00');
alert ( '');
alert ( '');
alert (txtAddr1.getRawValue());
alert (txtAddr2.getRawValue());
alert (txtAddr3.getRawValue());
alert (txtAddr4.getRawValue());
alert (txtPin.getRawValue());
alert (cmbState.getValue());
alert (txtCustIns.getRawValue());
alert (txtOurIns.getRawValue());
alert (txtGstNo.getRawValue());*/


                            Ext.Ajax.request({
                            url: 'TEMPTrnSalesInvoieSave.php',

                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: invData.length  ,
                                savetype:gstFlag,
                             	invhcompcode  :Gincompcode,
				invhfincode   :GinFinid,
				invhno        :txtInvNo.getRawValue(),
				invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
				invhtime      :Ext.util.Format.date(new Date(),"H:i"),//Ext.util.Format.date(dptInvNo.getValue(),"H:i"),  
				invhtype      :invtype, 
				invhpartyordno:txtReference.getRawValue(),
				invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),
				invhourordno  :txtSOC.getRawValue(),
				invhourorddt  :Ext.util.Format.date(dptSOC.getValue(),"Y-m-d"),
				invhparty     :cmbCustomer.getValue(),
				invhagent     :agentcode,
				invhourbank   :ourbankcode,
				invhdocu      :cmbDocuments.getRawValue(),
				invhcrddays   :txtCreditDays.getRawValue(),  
				invhgracedays :txtGraceDays.getRawValue(),
				invhodiper    :odiper,
				invhtaxtag    :taxcode,
				invhinsper    :txtInsPer.getRawValue(),
				invhinsamt    :txtInsAmt.getRawValue(),
				invhcomm      :commision,  
				invhfrtrate   :Number(txtFrt.getRawValue()),
				invhfrtamt    :txtFrtAmt.getRawValue(),
				invhroff      :txtRound.getRawValue(),
				invhnetamt    :txtNetAmt.getRawValue(),
				invhnoofbun   :bundles,
				invhnoofreels :reels, 
				invhtotwt     :txttotqty.getRawValue(),
				invhcumwt     :0,
				invhslipno    :cmbSlipNo.getRawValue(),
				invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
				invhplano     :'',
				invhrg23no    :'',
				invhvehino    :txtVehicle.getRawValue(),
				invhformno    :'',
				invhformdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),//just
				invhformtag   :'',
				invhtrans     :transcode,
				invhlrno      :txtLrNo.getRawValue(),
				invhlrdate    :Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"),
				invhdest      :txtDestination.getRawValue(),
				invhloca      :'0',
				invhdesptag   :'',
				invhpaytag    :'',
				invhdeposaltag:'',
			        invhvouno     :vouno,
				invhvouyear   :Ext.util.Format.date(dptInvNo.getValue(),"Y"),
				invhtaxableamt:txttottaxable.getRawValue(),
				invhlcno      :txtLcNo.getRawValue(),
				invhlcdate    :Ext.util.Format.date(dptLcNo.getValue(),"Y-m-d"),
				invhexno      :'0',
				invhexdate    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),//just
				invhpartybank   :txtPartyBank.getRawValue(),
				invhdesplocation:desplocation,
				invhothers      :txtOthers.getRawValue(),
				invhsgstper     :txtSgstPer.getRawValue(),
				invhsgstamt     :txtSgstAmt.getRawValue(),
				invhcgstper     :txtCgstPer.getRawValue(),
				invhcgstamt     :txtCgstAmt.getRawValue(),
				invhigstper     :txtIgstPer.getRawValue(),
				invhigstamt     :txtIgstAmt.getRawValue(),
				invhA4inv       :a4yn,
				invhtaxrevyn    :'N',
				invhfrttype     :0,
				cancelflag	: '0.00', 
                                invhnewvariety    : '',
                                invhnewgsm        : '',
                                invhdelivery_add1 :txtAddr1.getRawValue(),
                                invhdelivery_add2 :txtAddr2.getRawValue(),
                                invhdelivery_add3 :txtAddr3.getRawValue(),
                                invhdelivery_city :txtAddr4.getRawValue(),
                                invhdelivery_pin  :txtPin.getRawValue(), 
                                invhstatecode     :cmbState.getValue(), 
                                invhinstruction1  :txtCustIns.getRawValue(), 
                                invhinstruction2  :txtOurIns.getRawValue(), 
                                invhdelivery_gst  :txtGstNo.getRawValue(),
                                invh_sal_ledcode  :sales_ledcode,
                                invh_cgst_ledcode :cgst_ledcode,                                
                                invh_sgst_ledcode :sgst_ledcode,                               
                                invh_igst_ledcode :igst_ledcode,                              
                                invh_description  :'Sales', 
                                invh_acc_refno    : accrefno
  
				},
                              callback: function(options, success, response)
                              {
//alert("Test");
//alert(Reels);
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Invoice Saved  -" + obj['msg']);
//                                    RefreshData();
                                    TrnSalesInvoicePanel.getForm().reset();

                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Invoice Not Saved- " + obj['msg']);                                                  
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


    

   function RefreshData(){
        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbInvNo').hide();
        Ext.getCmp('save').setDisabled(false);
 	loadInvnodatastore.removeAll();
	loadInvnodatastore.load({
        url: 'ClsTrnSalesInvoice.php',
        params: {
                    task: 'loadInvoiceNo',
                    compcode:Gincompcode,
                    finid:GinFinid  
                },
		callback:function()
      		{
                    if (loadInvnodatastore.getAt(0).get('invno') == 1) {
                          txtInvNo.setValue(GinFinid+Gincompcode+"0001");
                     }    
                     else {
                          txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));
                          } 
               }
	  });

   };
   




    var TrnSalesInvoiceWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - INVOICE ENTRY',
        items       : TrnSalesInvoicePanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                        cmbDespLocation.setValue('V');
//alert(a4yn);
			loadInvnodatastore.removeAll();

			loadInvnodatastore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadInvoiceNo',
                                    compcode:Gincompcode,
                                    finid:GinFinid  
		                },
				callback:function()
	               		{

//alert(loadInvnodatastore.getAt(0).get('invno').slice(-4));
//alert(loadInvnodatastore.getAt(0).get('invno').slice(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(5));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(3));
//alert('GS'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3)));
 
                                vouno = 'GS'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3));

                                if (loadInvnodatastore.getAt(0).get('invno') == 1) {
                                    txtInvNo.setValue(GinFinid+Gincompcode+"0001");
                                   }    
                                  else {
                                     txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));


                                  } 
    				}
			  });

			loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                       	invno: 0
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
