Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var finstartdate = localStorage.getItem('gfinstdate');

	//	localStorage.setItem("gfinstdate",finstdate);

   var usertype = localStorage.getItem('ginuser');
   usertype = 1
   var  gsttype = localStorage.getItem('GSTTYPE');
   var  invfin = localStorage.getItem('invfin');
   var  invoiceno  = 0; 
   var  invseqno  = 0; 
   var gstFlag = "Add";
   var fm = Ext.form;
   var invtype =0;
   var socno =0;
   var sofinyear = 0;
   var commision = 0;
   var bundles = 0;
   var reels = 0;
   var smsno = '';
   var partycode = 0;
   var taxcode =0;
   var ourbankcode =0;
   var transcode =0;
   var slipno = 0;      
   var odiper =0;   
   var packslipno = '';
   var packno_date = "";
   var sales_ledcode ,cgst_ledcode ,sgst_ledcode ,igst_ledcode = 0;     
   var vouno = ''
//   var a4inv = "Y";
//   var a4inv  = a4yn;

   var desplocation = "V";

Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};

 var loadSONoListDataStore = new Ext.data.Store({
      id: 'loadSONoListDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONOlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'pckt_sono','pckt_sodate'
	 ]),
    })

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
	'invh_invrefno','invh_seqno'
      ]),
});

var loadtruckDataStore = new Ext.data.Store({
      id: 'loadtruckDataStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadtruck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wpckh_vehicleno'
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
	'cust_code','cust_ref','cust_phone','invh_date','invh_party','invh_slipno','invh_agent','invh_docu','invh_our_bank','invh_crd_days','invh_grace_days',
'invh_odiper','invh_vehi_no','invh_trans','invh_lrno','invh_lrdate','invh_dest','invh_desp_location','invh_lcno','invh_lcdate','invh_party_bank',
'invh_delivery_add1','invh_delivery_add2','invh_delivery_add3','invh_delivery_city','invh_delivery_pin','invh_delivery_gst','invh_statecode','invh_taxtag',
'invh_instruction1','invh_instruction2','invh_dest','invh_party_ordno','invh_party_orddt','invh_our_ordno','invh_our_orddt','invh_sgst_per','invh_cgst_per',
'invh_igst_per','invh_insper','invh_comm','invh_frt_rate','invh_frt_amt','invh_party_bank','invh_noofbun','invh_noofreels','invh_type','type_name',
'invh_vouno','invh_acc_refno','invh_seqno','invh_ewaybillno','U_TCSStatus','invh_tcs_per', 'invh_tcs_amt','SMSsent'
 
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
	{name:'cust_ref', type: 'string',mapping:'cust_ref'},
	{name:'cust_smsno', type: 'string',mapping:'cust_smsno'},
	{name:'repr_mobile', type: 'string',mapping:'repr_mobile'},
	{name:'cust_phone', type: 'string',mapping:'cust_phone'},
	{name:'cust_email', type: 'string',mapping:'cust_email'},
	{name:'cust_zip', type: 'string',mapping:'cust_zip'},
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
//'type_name','type_code','weight','pckh_ordno','pckh_orddate','pckt_sono','pckt_sodate','nos','unit','rate','amount','pckh_date','varcode',
//'var_name','hsncode','sizecode','var_size1','var_size2' ,'rate','amount','cashdisc','cashflg','dealdisc','dealflg','reeldisc','reelflg',
//'regdisc','regflg','adddisc','addflg','qcdev','losspmt','ordt_crdays','ordt_comm','pckh_noofreels','pckh_noofbun','size'
'weight','pckh_ordno','pckh_orddate','pckt_sono','pckt_sodate','nos','unit','rate','amount','pckh_date','varcode','var_name','hsncode',
'sizecode','var_size1','var_size2' ,'rate','amount','qcdev','losspmt','ordt_crdays','pckh_noofreels','size','pckh_truck'
      ]),
});

var PackslipdetailDataStoreNew = new Ext.data.Store({
      id: 'PackslipdetailDataStoreNew',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadslipdetInv"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'hsncode','var_name','unit','size','nos','weight','rate','amount','varcode','sizecode','qcdev','losspmt'
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
	'wt','pckt_sono','pckt_sodate','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
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
	'ordh_creditdays','ordh_tax','taxcode','tax_name','ordh_sgst','ordh_cgst','ordh_igst','ordh_ins_yn' ,'ordh_insper' ,   'ordh_gracedays','ordh_docu','ordh_dest','ordh_delivery_add1','ordh_delivery_add2','ordh_delivery_add3','ordh_delivery_city',
'ordh_delivery_pin','ordh_delivery_gst','ordh_cust_rem','ordh_our_rem','ordh_bank','transport','ordh_trans','ordh_odiper','ordh_frt',
'ordh_creditdays'
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
	'wt','pckt_sono','pckt_sodate','pckh_noofreels','pckh_noofbun','pckt_unit','pckh_date','d.var_name','var_grpcode','var_name',
'var_tariffno','pckt_var','var_size1','var_size2'
      ]),
    });
*/

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

var btnReupload = new Ext.Button({
    id      : 'btnReupload',
    style   : 'text-align:center;',
    text    : "RE UPLOAD",
    tooltip : 'Reupload',
    width   : 150,
    height  : 50,
    x       : 40,
    y       : 130,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesReUpload.php',
		      params :
		      {
                         	invhcompcode  :Gincompcode,
	        		invhfincode   :GinFinid,
		                invhparty  : cmbCustomer.getRawValue(),
		         	invhrefno  : txtInvNo.getRawValue(),
			 	invhdate   : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
				invhtotwt  : txttotqty.getRawValue(),
				invhnetamt : txtNetAmt.getRawValue(),
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("E-Inv - Reuploaded "); 
	/*

		            var obj = Ext.decode(response.responseText);

		            if (obj['success']==="true")					     
		            {
		                Ext.MessageBox.alert("SMS SENT  -" + obj['msg']);
		            }  
		            else
		            {
		         Ext.MessageBox.alert("SMS not Send - Please check customer SMS Number.." + obj['msg']);                                                  
		            }

	*/
		      }
                      }); 
            }
       }
   }
});       

var btnSMS = new Ext.Button({
    id      : 'btnSMS',
    style   : 'text-align:center;',
    text    : "SEND SMS",
    tooltip : 'Sent SMS to Customer...',
    width   : 150,
    height  : 50,
    x       : 40,
    y       : 70,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'TrnSalesSMS.php',
		      params :
		      {
                         	invhcompcode  :Gincompcode,
	        		invhfincode   :GinFinid,
		                invhparty  : cmbCustomer.getRawValue(),
		         	invhrefno  : txtInvNo.getRawValue(),
			 	invhdate   : Ext.util.Format.date(dptInvNo.getValue(),"d-m-Y"),
				invhtotwt  : txttotqty.getRawValue(),
				invhnetamt : txtNetAmt.getRawValue(),
		                smsnumber  : txtSMSNo.getRawValue(),
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("SMS  Send to Customer - "); 
	/*

		            var obj = Ext.decode(response.responseText);

		            if (obj['success']==="true")					     
		            {
		                Ext.MessageBox.alert("SMS SENT  -" + obj['msg']);
		            }  
		            else
		            {
		         Ext.MessageBox.alert("SMS not Send - Please check customer SMS Number.." + obj['msg']);                                                  
		            }

	*/
		      }
                      }); 
            }
       }
   }
});       

var btnEInvoice = new Ext.Button({
    id      : 'btnEInvoice',
    style   : 'text-align:center;',
    text    : "GENERATE E-INVOICE",
    width   : 150,
    height  : 50,
    x       : 40,
    y       : 10,    
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   listeners:{
       click: function(){
             if (txtNetAmt.getValue() == 0)
             {
                 alert("Invoice Amount is Empty.. ");
             }           
             else
             {
	      Ext.Ajax.request({
	      url: 'TrnSalesE-Inv.php',
	      params :
	      {
                     	invhcompcode  :Gincompcode,
			invhfincode   :GinFinid,
			invhrefno     :txtInvNo.getRawValue(),
                        invhseqno     :invseqno, 
	      },
	      callback: function(options, success, response)
	      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("Invoice Confirmed for E-Invoice  -" + obj['msg']);
                      TrnSalesInvoicePanel.getForm().reset();
                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("Invoice Confirmed for E-Invoice. Please check.." + obj['msg']);                                                  
                  }
	      }
              }); 
            }
       }
   }
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
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
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
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
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
        allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ",         
   });



var btnUpdate = new Ext.Button({
    style   : 'text-align:center;',
    text    : "UPDATE",
    width   : 40,
    height  : 40,
    x       : 200,
    y       : 440,
    id      : 'btnUpdate',
    bodyStyle:{"background-color":"#ebebdf"},  
     listeners:{
         click: function(){              

                   Ext.Ajax.request({
	                url: 'deldelTrnSalesInvoiceSaveTEMP.php',
	                params: {
	      
		                savetype:gstFlag,
                             	invhcompcode  :Gincompcode,
				invhfincode   :GinFinid,
                                gsttype       :gsttype,    
				invhrefno     :txtInvNo.getRawValue(),
                                invhno        :invoiceno, 
                                invhseqno     :invseqno, 
				invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
				invhpartyordno:txtReference.getRawValue(),
				invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),
				invhourordno  :txtSO.getRawValue(),
				invhourorddt  :Ext.util.Format.date(dptSO.getValue(),"Y-m-d"),
				invhparty     :cmbCustomer.getValue(),
				invhcrddays   :txtCreditDays.getRawValue(),  
				invhtaxtag    :taxcode,
				invhinsper    :txtInsPer.getRawValue(),
				invhinsamt    :txtInsAmt.getRawValue(),
				invhfrtrate   :Number(txtFrt.getRawValue()),
				invhfrtamt    :txtFrtAmt.getRawValue(),
				invhroff      :txtRound.getRawValue(),
				invhnetamt    :txtNetAmt.getRawValue(),
				invhnoofreels :reels, 
				invhtotwt     :txttotqty.getRawValue(),
				invhslipno    :cmbSlipNo.getRawValue(),
				invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
				invhvehino    :txtVehicle.getRawValue(),
				invhlrno      :txtLrNo.getRawValue(),
				invhlrdate    :Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"),
			        invhvouno     :vouno,
				invhvouyear   :Ext.util.Format.date(dptInvNo.getValue(),"Y"),
				invhtaxableamt:txttottaxable.getRawValue(),
				invhothers      :0,
				invhsgstper     :txtSgstPer.getRawValue(),
				invhsgstamt       :txtSgstAmt.getRawValue(),
				invhcgstper       :txtCgstPer.getRawValue(),
				invhcgstamt       :txtCgstAmt.getRawValue(),
				invhigstper       :txtIgstPer.getRawValue(),
				invhigstamt       :txtIgstAmt.getRawValue(),
				invhtcsper        : Number(txtTCSPer.getRawValue()),
				invhtcsamt        : Number(txtTCSAmt.getRawValue()),
				cancelflag	  :'0', 
                                invhdelivery_add1 :txtAddr1.getRawValue(),
                                invhdelivery_add2 :txtAddr2.getRawValue(),
                                invhdelivery_add3 :txtAddr3.getRawValue(),
                                invhdelivery_city :txtAddr4.getRawValue(),
                                invhdelivery_pin  :txtPin.getRawValue(), 
                                invhstatecode     :Number(cmbState.getValue()), 
                                invhinstruction  :txtCustIns.getRawValue(), 
                                invhdelivery_gst  :txtGstNo.getRawValue(),
                                invh_sal_ledcode  :sales_ledcode,
                                invh_cgst_ledcode :cgst_ledcode,                                
                                invh_sgst_ledcode :sgst_ledcode,                               
                                invh_igst_ledcode :igst_ledcode,                              
                                invh_description  :'Sales', 
                                invhewaybillno    : txtEwayBillNo.getRawValue(), 
                                sonolist          : packslipno,

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

                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Invoice Not Saved - Please check customer Master and Provide STATE / GST /DEALER and other essentials " + obj['msg']);                                                  
                                    }
                                }
                   });  
 

         } 
    }
});

var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  100,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
});

function datecheck()
  {
        var dt_today = new Date();
        var dt_invoice = dptInvNo.getValue();

//        var diffdays = (dt_today.getDate()-dt_invoice.getDate());
        var diffdays = dt_today.getTime()-dt_invoice.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >2)
        {     
             alert("You are Not Allowed to Raise the invoice in the date of " +  Ext.util.Format.date(dt_invoice,"d-m-Y"));
             dptInvNo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the invoice in Future date");
             dptInvNo.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

 }

var txtReference = new Ext.form.TextField({
        fieldLabel  : 'Party Ord.No.',
        id          : 'txtReference',
        name        : 'txtReference',
        width       :  150,
//	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var dptInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptInvNo',
        name: 'Date',
        format: 'd-m-Y',
//        readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }  	
});
var dptRef= new Ext.form.DateField({
        fieldLabel: 'Ref.Date',
        id: 'dptRef',
        name: 'Date',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
});
var dptSlip = new Ext.form.DateField({
        fieldLabel: 'Slip.Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
});
var txtSMSNo = new Ext.form.TextField({
        fieldLabel  : 'SMS No.(Rep & Party)',
        id          : 'txtSMSNo',
        name        : 'txtSMSNo',
        width       :  200,
 	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;  textTransform: uppercase ", 
 });
var txtSO = new Ext.form.TextField({
        fieldLabel  : 'SO.No.',
        id          : 'txtSO',
        name        : 'txtSO',
        width       :  150,
//	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var dptSO = new Ext.form.DateField({
        fieldLabel: 'SO. Date',
        id: 'dptSO',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
});

var lblInsPer = new Ext.form.Label({
       fieldLabel  : 'INS %',
       id          : 'lblInsPer',
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

var txtInsAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsAmt',
        name        : 'txtInsAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var txtOthers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthers',
        name        : 'txtOthers',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});


var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	
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
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
	
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var txtSgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstAmt',
        name        : 'txtSgstAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var txtIgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstAmt',
        name        : 'txtIgstAmt',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

        listeners   :{
           blur:function(){
              calculateItemValue();
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

var txttotqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (Kgs)',
        id          : 'txttotqty',
        name        : 'txttotqty',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

 });

var txttotvalue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotvalue',
        name        : 'txttotvalue',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txttottaxable = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable Value',
        id          : 'txttottaxable',
        name        : 'txttottaxable',
        width       :  100,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
});

var txtFrt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrt',
        name        : 'txtFrt',
        width       :  60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
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

var txtRound = new Ext.form.NumberField({
        fieldLabel  : 'Rounding',
        id          : 'txtRound',
        name        : 'txtRound',
        width       :  50,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtNetAmt = new Ext.form.NumberField({
        fieldLabel  : 'Net Amount',
        id          : 'txtNetAmt',
        name        : 'txtNetAmt',
        width       :  200,
	readOnly : true,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
 });

var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Cust.Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  500,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtVehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No.',
        id          : 'txtVehicle',
        name        : 'txtVehicle',
        width       :  250,
	readOnly : false,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtLrNo = new Ext.form.TextField({
        fieldLabel  : 'LR No.',
        id          : 'txtLrNo',
        name        : 'txtLrNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var txtEwayBillNo = new Ext.form.TextField({
        fieldLabel  : 'Eway BillNo.',
        id          : 'txtEwayBillNo',
        name        : 'txtEwayBillNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

});

var dptLrNo = new Ext.form.DateField({
        fieldLabel: 'LR.Date',
        id: 'dptLrNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        
});

var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
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
});

var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
        select: function(){
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

                                socno = PackslipdetailDataStore.getAt(0).get('pckt_sono');
                                txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
                                txtSO.setRawValue(PackslipdetailDataStore.getAt(0).get('pckt_sono'));
                                dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
                                dptSO.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
            
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
		                        ordno:txtSO.getRawValue(),
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
	

	 
		                        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');

		                        ourbankcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_bank');
		                        transcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_trans');

		                        odiper = PackslipAlldetailsDataStore.getAt(0).get('ordh_odiper');
					cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		                        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

  
    
		        
		   
		
		                        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_our_rem')); 

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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
        select: function(){
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

          packslipno = '';
          packno_date= '';
          loadSONoListDataStore.removeAll();
          loadSONoListDataStore.load({
	  url: 'ClsTrnSalesInvoice.php',
	  params:
                {
		    task:"loadSONOlist",
		        
		        slipno :cmbSlipNo.getValue(),
		   	fincode : GinFinid,
			compcode : Gincompcode        
		    },
		    scope: this,
		    callback:function() 
		    {
                           var cnt=loadSONoListDataStore.getCount();

//alert(Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/y"));

	                   if(cnt>0)
			   {                         
		            for(var j=0; j<cnt; j++)
                            {
                               if (j ==0)    
                               {
                                 packslipno =   loadSONoListDataStore.getAt(j).get('pckt_sono')
                                 packno_date =   loadSONoListDataStore.getAt(j).get('pckt_sono') + " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/Y");
                               }
                               else
                               {
                                 packslipno =  packslipno + "," + loadSONoListDataStore.getAt(j).get('pckt_sono')
                                 packno_date =  packno_date + "," + loadSONoListDataStore.getAt(j).get('pckt_sono')+ " dt." +Ext.util.Format.date(loadSONoListDataStore.getAt(0).get('pckt_sodate'),"d/m/y");
                               }
  
                             }
                             
                             txtSO.setRawValue(packslipno);
                           }     

                    }
                });


//alert(packslipno);


	PackslipdetailDataStoreNew.removeAll();
	PackslipdetailDataStoreNew.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdetInv",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{
                }
      
        });


   


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
        
	    },
	    scope: this,
	    callback:function() 
		{

		socno = PackslipdetailDataStore.getAt(0).get('pckt_sono');
		txtReference.setRawValue(PackslipdetailDataStore.getAt(0).get('pckh_ordno'));
//		txtSO.setRawValue(PackslipdetailDataStore.getAt(0).get('pckt_sono'));
		txtSO.setRawValue(packno_date);

		dptRef.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_orddate'),"d-m-Y"));
		dptSO.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"d-m-Y"));
		dptSlip.setRawValue(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckh_date'),"d-m-Y"));
		txtCreditDays.setValue(PackslipdetailDataStore.getAt(0).get('ordh_creditdays'));
		txtVehicle.setValue(PackslipdetailDataStore.getAt(0).get('pckh_truck'));


		var m = Ext.util.Format.date(dptSO.getValue(),"m");
		sofinyear = Ext.util.Format.date(dptSO.getValue(),"y");

                  

//alert(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"Y-m-d") );
//alert(Ext.util.Format.date(finstartdate,"Y-m-d"));

               if(Ext.util.Format.date(PackslipdetailDataStore.getAt(0).get('pckt_sodate'),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
                 sofinyear = sofinyear - 1;

               }  
                    
                



//		bundles =  PackslipdetailDataStore.getAt(0).get('pckh_noofbun');
		reels =  PackslipdetailDataStore.getAt(0).get('pckh_noofreels');

		PackslipAlldetailsDataStore.removeAll();
		PackslipAlldetailsDataStore.load({
		url: 'ClsTrnSalesInvoice.php',
		params:
		    {

		        task:"loadslipalldetails",
//		        ordno    : txtSO.getRawValue(),
		        ordno    : socno,
		   	fincode  : sofinyear,
			compcode : Gincompcode        
		    },
		    scope: this,
		    callback:function() 

		    {
		        txtCgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cgst'));
		        txtSgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_sgst'));
		        txtIgstPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_igst'));
		        
                        if (PackslipAlldetailsDataStore.getAt(0).get('ordh_frt') > 0 )
                        {
		        txtFrt.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_frt'));
                        } 
	 

		        taxcode = PackslipAlldetailsDataStore.getAt(0).get('ordh_tax');
//alert(PackslipAlldetailsDataStore.getAt(0).get('ordh_creditdays'));

			cmbTax.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('tax_name'));
		        txtInsPer.setRawValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_insper'));

                        txtCreditDays.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_creditdays'));

		       // txtPartyBank.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_bank')); 


		
		
		        txtCustIns.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_cust_rem')); 

		        txtAddr1.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add1')); 
		        txtAddr2.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add2')); 
		        txtAddr3.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_add3')); 
		        txtAddr4.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_city')); 
		        txtPin.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_pin')); 
		        txtGstNo.setValue(PackslipAlldetailsDataStore.getAt(0).get('ordh_delivery_gst')); 

//		        cmbTransport.setValue(PackslipAlldetailsDataStore.getAt(0).get('transport'));

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
		                     alert('not found - Select GST TYPE again');

				} 
			   }

			});
		    }
		}); 
	     }
	}); 

/*
	loadtruckDataStore.removeAll();
	loadtruckDataStore.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadtruck",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,
	    },
	    callback:function() 
		{
			if(loadtruckDataStore.getCount() > 0){
                    txtVehicle.setValue(loadtruckDataStore.getAt(0).get('wpckh_vehicleno')); 
                    }
            }
        });     
*/
}








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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
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
//alert(sales_ledcode);
//alert(cgst_ledcode);
//alert(sgst_ledcode);
//alert(igst_ledcode);
                                    }
                         else {alert('not found - Select GST TYPE again');

                       } 
                   }

                });
               

           } 
        }    


});


function getgstdetails()
{

}









var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Inv No.',
        width           : 120,
        displayField    : 'invh_invrefno', 
        valueField      : 'invh_seqno',
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
                select: function () {
//                        griddet.getStore().removeAll();

                        Ext.getCmp('btnEInvoice').show();

                       
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

//alert(loadAllCustomerStore.getAt(0).get('cust_phone'));
//alert(loadAllCustomerStore.getAt(0).get('cust_zip'));

//alert(loadAllCustomerStore.getAt(0).get('cust_zip').length);
 
                           if (loadAllCustomerStore.getAt(0).get('cust_phone') == '' || loadAllCustomerStore.getAt(0).get('cust_zip') == '' ||  loadAllCustomerStore.getAt(0).get('cust_zip').length != 6 )
                           { 
                       	         Ext.getCmp('btnEInvoice').hide();
                                 alert("Customer Phone /  Pincode is empty or Error.. Please check and continue");
                           }
                             


                                cmbCustomer.setValue(loadAllCustomerStore.getAt(0).get('cust_code')); 
                                smsno  = loadAllCustomerStore.getAt(0).get('repr_mobile'); 
                                if (loadAllCustomerStore.getAt(0).get('cust_smsno') != '')
                                   smsno = smsno + ","+ loadAllCustomerStore.getAt(0).get('cust_smsno');
                         
                                txtSMSNo.setValue(smsno);     
//                                txtSMSNo.setValue(loadAllCustomerStore.getAt(0).get('repr_mobile')); 
//                                txtSMSNo.setValue(loadAllCustomerStore.getAt(0).get('cust_smsno')); 
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
                                txtInvNo.setRawValue(cmbInvNo.getRawValue());

                                partycode = loadInvoicedetailsDataStore.getAt(0).get('invh_party');
                           



                                dptInvNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));



                                invseqno =  loadInvoicedetailsDataStore.getAt(0).get('invh_seqno');

                                txtReference.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_party_ordno'));
                                txtSO.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_our_ordno'));
                                dptRef.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_party_orddt'),"d-m-Y"));
                                dptSO.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_our_orddt'),"d-m-Y"));
                                dptSlip.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));
 


                                txtLrNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_lrno'));
                                dptLrNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_lrdate'),"d-m-Y"));



                                bundles =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofbun');
                                reels =  loadInvoicedetailsDataStore.getAt(0).get('invh_noofreels');




                                cmbSlipNo.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));        
                                cmbSlipNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_slipno'));    

                                txtCgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_cgst_per'));
                                txtSgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_sgst_per'));
                                txtIgstPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_igst_per'));

                                txtTCSPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_per'));
                                txtTCSAmt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_tcs_amt'));

                          
           
                                taxcode = loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag');

                                cmbTax.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_taxtag'));

                                txtVehicle.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_vehi_no'));

                                txtInsPer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_insper'));
                                txtFrt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_rate'));
                                txtFrtAmt.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_frt_amt'));

                                txtCreditDays.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_crd_days')); 
    
               
   
                                txtCustIns.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_instruction2')); 
 
                                txtAddr1.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add1')); 
                                txtAddr2.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add2')); 
                                txtAddr3.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_add3')); 
                                txtAddr4.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_city')); 
                                txtPin.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_pin')); 
                                txtGstNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_delivery_gst')); 

                                txtEwayBillNo.setValue(loadInvoicedetailsDataStore.getAt(0).get('invh_ewaybillno')); 



                                vouno  =  loadInvoicedetailsDataStore.getAt(0).get('invh_vouno');
 
//alert(loadInvoicedetailsDataStore.getAt(0).get('invh_vouno'));


                                slipno = loadInvoicedetailsDataStore.getAt(0).get('invh_slipno');        
               

                                var cnt=loadInvoicedetailsDataStore.getCount();


                                if (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == "E")
                                {
                                    Ext.getCmp('btnReupload').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnReupload').hide();
                                }
                                 if (loadInvoicedetailsDataStore.getAt(0).get('SMSsent') == "N")
                                {
                                    Ext.getCmp('btnSMS').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnSMS').hide();
                                }


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
                                                     alert('not found. please select GST TYPE again');

					        } 
					   }

					});


                                        if  (loadInvoicedetailsDataStore.getAt(0).get('U_TCSStatus') == 'S')
                                             Ext.getCmp('save').setDisabled(true);
                                        else
                                        { 
		                                var dt_today = new Date();
		                                var dt_invoice = dptInvNo.getValue();
		                                var diffdays = (dt_today.getDate()-dt_invoice.getDate());
		                                if (diffdays >0)
		                                     Ext.getCmp('save').setDisabled(true);
		                                else
		                                     Ext.getCmp('save').setDisabled(false);
                                        }  
 



/*



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
     
                            },
                            scope: this,
                            callback:function() 
			    {

//alert(PackslipdetailDataStore.getCount());
                               calculateItemValue(); 
                            }

                            }); 

*/


	PackslipdetailDataStoreNew.removeAll();
	PackslipdetailDataStoreNew.load({

	url: 'ClsTrnSalesInvoice.php',
	params:
	    {
		task:"loadslipdetInv",
		custcode:cmbCustomer.getValue(),
		slipno : cmbSlipNo.getValue(),
		fincode : GinFinid,
		compcode : Gincompcode,   
        
	    },
	    scope: this,
	    callback:function() 
		{
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",         
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
   var Row= flxDetailInv.getStore().getCount();



        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {


           tdisc = 0;




          value1 = (sel[i].data.rate - tdisc)* sel[i].data.weight /1000;
          

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
             frt = Math.round(Number(txttotqty.getRawValue()/1000) * Number(txtFrt.getRawValue()));
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




function grid_tot(){
        var value1 = 0;
        var taxable = 0;
        var wt = 0;	
	var Row= flxDetailInv.getStore().getCount();
        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();
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
	var Row= flxDetailInv.getStore().getCount();
        flxDetailInv.getSelectionModel().selectAll();
        var sel=flxDetailInv.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
//'FOR STORE DATA IN GRID
           if (Number(sel[i].data.value) > 0 && txttotvalue.getRawValue() > 0 && txttottaxable.getRawValue() > 0 )  {
//              value1=Math.round(Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue()));
              value1= Number(sel[i].data.value)/Number(txttotvalue.getRawValue())* Number(txttottaxable.getRawValue());

              sel[i].set('taxval', Ext.util.Format.number(value1,'0.00'));
           }  
         }
}


var dgrecord = Ext.data.Record.create([]);

var flxDetailInv = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 120,
    hidden:false,
    width: 990,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "HSN Code", dataIndex:'hsncode',sortable:false,width:100,align:'left'},
       {header: "Size Code", dataIndex:'var_name',sortable:false,width:120,align:'left'},
       {header: "Units", dataIndex:'unit',sortable:false,width:100,align:'left',hidden :true},
       {header: "Size", dataIndex:'size',sortable:false,width:100,align:'left'},
       {header: "Nos", dataIndex:'nos',sortable:false,width:100,align:'left'},
       {header: "Weight", dataIndex:'weight',sortable:false,width:100,align:'left'},
       {header: "Rate", dataIndex:'rate',sortable:false,width:100,align:'left'},
       {header: "Amount", dataIndex:'amount',sortable:false,width:100,align:'left',hidden :true},
       {header: "Var Code", dataIndex:'varcode',sortable:false,width:100,align:'left',hidden :true},
       {header: "Size Code", dataIndex:'sizecode',sortable:false,width:100,align:'left',hidden :true},
       {header: "Value", dataIndex:'value',sortable:false,width:100,align:'left'},
       {header: "Tax Value", dataIndex:'taxval',sortable:false,width:100,align:'left'},
       {header: "QC Dev Y/N", dataIndex:'qcdev',sortable:false,width:100,align:'left',hidden :true},
       {header: "Loss Per MT", dataIndex:'losspmt',sortable:false,width:100,align:'left',hidden :true},





    ],

    store: PackslipdetailDataStoreNew,

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
         'cellclick': function (flxDetailInv, rowIndex, cellIndex, e) {
	        var selected_rows = flxDetailInv.getSelectionModel().getSelections();
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
           var sm = flxDetailInv.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetailInv.getStore().remove(selrow);
        flxDetailInv.getSelectionModel().selectAll();
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
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetailInv.getSelectionModel().selectAll();
//                var selrows = flxDetailInv.getSelectionModel().getCount();
  //              var sel = flxDetailInv.getSelectionModel().getSelections();
                var RowCnt = flxDetailInv.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetailInv.getSelectionModel().getCount();
                   var sel = flxDetailInv.getSelectionModel().getSelections();

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
                      flxDetailInv.getStore().insert(
                      flxDetailInv.getStore().getCount(),
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
		                       title       : 'E - INV',
		                       width       : 250,
		                       height      : 480,
		                       x           : 1070,
		                       y           : 10,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnSMS,btnEInvoice,btnReupload,
                                       ]
		                          
		                },


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
		                       labelWidth  : 60,
                		       width       : 200,
		                       x           : 230,
                		       y           : 60,
		                       border      : false,
                		       items: [dptSlip]
                                     },  
              
                    
		  	           ]	  
//item - 3 - end
                             },
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : '',
                                  width       : 545,
                                  height      : 120,
                                  x           : 510,
                                  y           : 10,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                     	     { 
                                                  xtype       : 'fieldset',
                         		          title       : '',
		                                  labelWidth  : 110,
                		                  width       : 300,
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
                                                  x           : 300,
          		                          y           : 0,
                        	                  border      : false,
                                                  items: [dptRef]
   		                            },

                                     	     { 
                                                  xtype       : 'fieldset',
                         		          title       : '',
		                                  labelWidth  : 110,
                		                  width       : 300,
                                                  x           : 0,
		                                  y           : 30,
                		                  border      : false,
                                		  items: [txtSO]
		                             },
	                         	     { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
          	                                  labelWidth  : 80,
                    		                  width       : 400,
                                                  x           : 300,
          		                          y           : 30,
                        	                  border      : false,
                                                  items: [dptSO]
   		                            },


                                            { 
                                                  xtype       : 'fieldset',
                                                  title       : '',
                                                  labelWidth  : 110,
                                                  width       : 450,
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
                                            height      : 170,
                                            x           : 0,
                                            y           : 0,
                                            border      : true,
                                            layout      : 'absolute',
                                            items:[ flxDetailInv
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
                                             y           : 330,
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
                                             y           : 330,
                                             border      : true,
                                             layout      : 'absolute',
                                             items:[
                                              {
                                                   xtype       : 'fieldset',
                                                   title       : '',
                                                   width       : 120,
                                                   x           : 35,
                                                   y           : -15,
                                                   defaultType : 'Label',
                                                   border      : false,
                                                   items: [lblInsPer]
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
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 15,
                                                y           : 10,
                                                border      : false,
                                                items: [txtInsPer] 
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
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 10,
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

/*                                             {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 10,
                                                width       : 100,
                                                x           : 170,
                                                y           : 35,
                                                border      : false,
                                                items: [txtOthers] 
                                             },
*/
 					     ]	
                                 },

                                 {   
                                             xtype       : 'fieldset',
                                             title       : '',
                                             width       : 220,
                                             height      : 100,
                                             x           : 810,
                                             y           : 330,
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
                                                width       : 200,
                                                x           : 1,
                                                y           : 40,
                                                border      : false,
                                                items: [txtNetAmt] 
                                             },
 					     ]	
                                 },
           
                              
                                 {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 150,
                                                width       : 400,
                                                x           : 370,
                                                y           : 435,
                                                border      : false,
                                                items: [txtSMSNo] 
                                   },btnUpdate,


                           ],


                        },


//TAB2 START
                        {
                           xtype: 'panel',
                           title: 'Delivery & Truck Details',bodyStyle:{"background-color":"#ebebdf"},
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
                                            width       : 5000,
                                            x           : 560,
                                            y           : 0,
                                            border      : false,                                            
                                            items: [cmbTransport]
                                         },   

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 00,
                                            y           : 30,
                                            border      : false,
                                            items: [txtVehicle]
                                         },


                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 00,
                                            y           : 60,
                                            border      : false,
                                            items: [txtLrNo]
                                         },

                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 00,
                                            y           : 90,
                                            border      : false,
                                            items: [txtEwayBillNo]
                                         },


                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 500,
                                            x           : 300,
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
                                            y           : 0,
                                            border      : false,
                                            items: [txtCreditDays]
                                         },




           
                                         { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 80,
                                            width       : 800,
                                            x           : 0,
                                            y           :120,
                                            border      : false,
                                            items: [txtCustIns]
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
                                  y           : 200,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : -10,
                                             border      : false,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 17,	
                                             border      : false,
                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 44,
                                             border      : false,
                                             items: [txtAddr3] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 71,	
                                             border      : false,
                                             items: [txtAddr4] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
                                             width       : 800,
                                             x           : 0,
                                             y           : 95,	
                                             border      : false,
                                             items: [cmbState] 
                                         },


                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 62,
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
   //         icon: '/SHVPM/Pictures/add.png',
            listeners:{
                click: function () {
                    gstFlag = "Add";
                    TrnSalesInvoicePanel.getForm().reset();
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
//alert(usertype);
                    gstFlag = "Edit";
                    Ext.getCmp('cmbInvNo').show();

                    if (usertype == 1)
                    {
                        Ext.getCmp('save').setDisabled(false);
                    }
                    else
                    {
                        Ext.getCmp('save').setDisabled(true);
                    }
  
                    loadInvoicelistDataStore.removeAll();
                    loadInvoicelistDataStore.load({
     			url: 'ClsTrnSalesInvoice.php',
			params: {
			    task: 'loadInvoiceNoList',
			    finid: GinFinid,
			    compcode:Gincompcode,
                            gsttype :gsttype,
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

alert(ourbankcode);
alert(cmbState.getValue());*/
             

var timeremoval = new Date();
timeremoval.setTime(new Date().getTime() + (10*60*1000));
//alert (timeremoval);



     var gstSave;
//save

                    gstSave="true";
                    if (txtInvNo.getRawValue()==0 || txtInvNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Invoice no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxDetailInv.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Sales-Invoice','Grid should not be empty..');
        	                gstSave="false";
	                    }

                    else if (cmbTax.getRawValue()==0 || cmbTax.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Tax Type.....');
                        gstSave="false";
                    }
/*
                    else if (cmbTransport.getValue()==0 || cmbTransport.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Transport.....');
                        gstSave="false";
                        cmbTransport.setfocus();
                    }
*/
                    else if (taxcode == 0 )
                    {
                        Ext.Msg.alert('Sales-Invoice','Select Tax Name.....');
                        gstSave="false";
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

                      
    
                            var invData = flxDetailInv.getStore().getRange();                                        
                            var invupdData = new Array();
                            Ext.each(invData, function (record) {
                                invupdData.push(record.data);
                            });

//save
//alert(invupdData);


 


                            Ext.Ajax.request({
                           url: 'TrnSalesInvoiceSave.php',
//                            url: 'tempsave.php',
                            params :
                             {

				griddetinv : Ext.util.JSON.encode(invupdData),     
			        cnt: invData.length  ,
                                savetype:gstFlag,
                             	invhcompcode  :Gincompcode,
				invhfincode   :GinFinid,
                                gsttype       :gsttype,    
				invhrefno     :txtInvNo.getRawValue(),
                                invhno        :invoiceno, 
                                invhseqno     :invseqno, 
				invhdate      :Ext.util.Format.date(dptInvNo.getValue(),"Y-m-d"),
				invhtime      :Ext.util.Format.date(new Date(),"H:i"),//Ext.util.Format.date(dptInvNo.getValue(),"H:i"),  
                 		invhtimeremove:Ext.util.Format.date(timeremoval,"H:i"),
				invhpartyordno:txtReference.getRawValue(),
				invhpartyorddt:Ext.util.Format.date(dptRef.getValue(),"Y-m-d"),
				invhourordno  :txtSO.getRawValue(),
				invhourorddt  :Ext.util.Format.date(dptSO.getValue(),"Y-m-d"),
				invhparty     :cmbCustomer.getValue(),
				invhcrddays   :txtCreditDays.getRawValue(),  
				invhtaxtag    :taxcode,
				invhinsper    :txtInsPer.getRawValue(),
				invhinsamt    :txtInsAmt.getRawValue(),
				invhfrtrate   :Number(txtFrt.getRawValue()),
				invhfrtamt    :txtFrtAmt.getRawValue(),
				invhroff      :txtRound.getRawValue(),
				invhnetamt    :txtNetAmt.getRawValue(),
				invhnoofreels :reels, 
				invhtotwt     :txttotqty.getRawValue(),
				invhslipno    :cmbSlipNo.getRawValue(),
				invhslipdt    :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
				invhvehino    :txtVehicle.getRawValue(),
				invhlrno      :txtLrNo.getRawValue(),
				invhlrdate    :Ext.util.Format.date(dptLrNo.getValue(),"Y-m-d"),
			        invhvouno     :vouno,
				invhvouyear   :Ext.util.Format.date(dptInvNo.getValue(),"Y"),
				invhtaxableamt:txttottaxable.getRawValue(),
				invhothers      :0,
				invhsgstper     :txtSgstPer.getRawValue(),
				invhsgstamt       :txtSgstAmt.getRawValue(),
				invhcgstper       :txtCgstPer.getRawValue(),
				invhcgstamt       :txtCgstAmt.getRawValue(),
				invhigstper       :txtIgstPer.getRawValue(),
				invhigstamt       :txtIgstAmt.getRawValue(),
				invhtcsper        : Number(txtTCSPer.getRawValue()),
				invhtcsamt        : Number(txtTCSAmt.getRawValue()),
				cancelflag	  :'0', 
                                invhdelivery_add1 :txtAddr1.getRawValue(),
                                invhdelivery_add2 :txtAddr2.getRawValue(),
                                invhdelivery_add3 :txtAddr3.getRawValue(),
                                invhdelivery_city :txtAddr4.getRawValue(),
                                invhdelivery_pin  :txtPin.getRawValue(), 
                                invhstatecode     :Number(cmbState.getValue()), 
                                invhinstruction  :txtCustIns.getRawValue(), 
                                invhdelivery_gst  :txtGstNo.getRawValue(),
                                invh_sal_ledcode  :sales_ledcode,
                                invh_cgst_ledcode :cgst_ledcode,                                
                                invh_sgst_ledcode :sgst_ledcode,                               
                                invh_igst_ledcode :igst_ledcode,                              
                                invh_description  :'Sales', 
                                invhewaybillno    : txtEwayBillNo.getRawValue(), 
                                sonolist          : packslipno,
              
  
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

                                    RefreshData();
                                 }
                                 else  
                                 if (obj['success']==="Available")
					{                                
                                    Ext.MessageBox.alert("Same Invoice Number Already Saved -" + obj['msg']);
                                  }

                                  else
				   {
Ext.MessageBox.alert("Invoice Not Saved - Please check customer Master and Provide STATE / GST /DEALER and essential" + obj['msg']);                                                  
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



/*
var itime =Ext.util.Format.date(new Date(),"H:i")
alert(itime);

var d1 = new Date();
var d2 = new Date();
//d2.setTime(d1.getTime());

d2.setTime(d1.getTime() + (30*60*1000));
alert (d2);




var dt = new Date();
alert(dt);
alert(dt.getDate()+2);
//var dt2 = new Date().getValue().add(Ext.Date.DAY,10);
//alert(dt2);
var itime =Ext.util.Format.date(new Date(),"H:i")
alert(itime);

//alert(Ext.Date.add(new Date(),Ext.Date.MINUTE,10));

//document.write(dt.format(Date.patterns.ShortTime));
*/

//        Ext.getCmp('btnEInvoice').hide();
//        Ext.getCmp('btnSMS').hide();

		     Ext.getCmp('btnSMS').hide();
	             Ext.getCmp('btnEInvoice').hide();
	             Ext.getCmp('btnReupload').hide();

        cmbInvNo.setRawValue('');
        cmbInvNo.setValue('');
        flxDetailInv.getStore().removeAll();
        Ext.getCmp('cmbInvNo').hide();
        Ext.getCmp('cmbTransport').hide();

        txtAddr1.setRawValue('');
        txtAddr2.setRawValue('');
        txtAddr3.setRawValue('');
  
         
        txtPin.setRawValue('');

        txtCustIns.setRawValue('');

        Ext.getCmp('save').setDisabled(false);
        txtVehicle.setRawValue('');

 	loadInvnodatastore.removeAll();
	loadInvnodatastore.load({
        url: 'ClsTrnSalesInvoice.php',
        params: {
                    task: 'loadInvoiceNo',
                    compcode:Gincompcode,
                    finid:GinFinid ,
                    gsttype : gsttype
                },
		callback:function()
      		{
//                    if (loadInvnodatastore.getAt(0).get('invno') == 1) {
//                          txtInvNo.setValue(GinFinid+Gincompcode+"001");
//                          invoiceno = 1;
//                     }    
//                     else {
//                          txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));
//                          invoiceno = 1;
//                          } 


                                       invoiceno = loadInvnodatastore.getAt(0).get('invno')
                                       if (loadInvnodatastore.getAt(0).get('invno') < 10)
                                        {                                              
//                                          alert("00"+loadInvnodatastore.getAt(0).get('invno'));
                                          ino = "00"+loadInvnodatastore.getAt(0).get('invno');
                                        }                                      
                                        else
                                        {  
                                             if (loadInvnodatastore.getAt(0).get('invno') < 100) 
                                             {                                              
//                                              alert("0"+loadInvnodatastore.getAt(0).get('invno')); 
                                              ino = "0"+loadInvnodatastore.getAt(0).get('invno');                   
                                             }
                                             else 
                                             {      
                                               ino = loadInvnodatastore.getAt(0).get('invno');  
                                             }
                                        } 
                                         txtInvNo.setValue(gsttype+'/'+ino+'/'+invfin);



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
	  });


   };
   


    var ino = 0;

    var TrnSalesInvoiceWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
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


                     Ext.getCmp('btnUpdate').hide();
                                  
		     Ext.getCmp('btnSMS').hide();
	             Ext.getCmp('btnEInvoice').hide();
	             Ext.getCmp('btnReupload').hide();




                     Ext.getCmp('cmbTax').setDisabled(true);  
                     Ext.getCmp('cmbTransport').hide();
                     RefreshData();
/*
			loadInvnodatastore.removeAll();

			loadInvnodatastore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadInvoiceNo',
                                    compcode:Gincompcode,
                                    finid:GinFinid,
                                    gsttype : gsttype 
		                },
				callback:function()
	               		{

//alert(loadInvnodatastore.getAt(0).get('invno').slice(-4));
//alert(loadInvnodatastore.getAt(0).get('invno').slice(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(0,4));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(5));
//alert(loadInvnodatastore.getAt(0).get('invno').substring(3));
//alert('GS'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3)));
 
                                vouno = 'GSI'+Number(loadInvnodatastore.getAt(0).get('invno').substring(3));

//                                if (loadInvnodatastore.getAt(0).get('invno') == 1) {
//                                    txtInvNo.setValue(gsttype+'/'+"001"+'/'+invfin);
                                    
//                                    invoiceno = 1
  //                                 }
    
//                                  else {
                                       invoiceno = loadInvnodatastore.getAt(0).get('invno')

                                       if (loadInvnodatastore.getAt(0).get('invno') < 10)
                                        {                                              
//                                          alert("00"+loadInvnodatastore.getAt(0).get('invno'));
                                          ino = "00"+loadInvnodatastore.getAt(0).get('invno');
                                        }                                      
                                        else
                                        {  
                                             if (loadInvnodatastore.getAt(0).get('invno') < 100) 
                                             {                                              
//                                             alert("0"+loadInvnodatastore.getAt(0).get('invno')); 
                                              ino = "0"+loadInvnodatastore.getAt(0).get('invno');                   
                                             }
                                             else 
                                             {      
                                               ino = loadInvnodatastore.getAt(0).get('invno');  
                                             }
                                        } 
                                         txtInvNo.setValue(gsttype+'/'+ino+'/'+invfin);

//                                     txtInvNo.setValue(loadInvnodatastore.getAt(0).get('invno'));

                                     //invoiceno = "00"+loadInvnodatastore.getAt(0).get('invno');
//                                     invoiceno = loadInvnodatastore.getAt(0).get('invno');

//                                  } 
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
*/
                    }
        } 
    });
       TrnSalesInvoiceWindow.show();  
});
