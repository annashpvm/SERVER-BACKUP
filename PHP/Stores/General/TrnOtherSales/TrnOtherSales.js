Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var  gststate = localStorage.getItem('GSTTYPE');
   var  invfin = localStorage.getItem('invfin');

   var gstfinyear = localStorage.getItem('gstyear');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    

  var editrow = 0;
  var gridedit = "false";
  var viewopt = 0; 
  var gstFlag = "Add";

  var suptype = 0;
  var custstate = 0;
  var docno =0;
  var seqno = 0;  

 var custledcode = 0;
  var saleslcode,cgstlcode,sgstlcode,igstlcode = 0;
  var saleslname,cgstlname,sgstlname,igstlname = '';
  var ledgercode = 0;

var accseqno = 0;
var roundoff ="Y";

var supcode =0;
 var EInvStatusDataStore = new Ext.data.Store({
      id: 'EInvStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEInvStatus"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ErrorCode','ErrorDiscripion','InvStatus'
	 ]),
    })

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


 var EWayStatusDataStore = new Ext.data.Store({
      id: 'EWayStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEWayStatus"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ErrorCode','ErrorDiscripion','InvStatus'
	 ]),
    })


        var txtTCS = new Ext.form.NumberField({
        fieldLabel  : 'TCS (%)',
        id          : 'txtTCS',
        width       : 75,
        name        : 'txtTCS',
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
                         calculateItemValue();

			}

		}
   }); 



var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 160,
    height:90,
    defaultType : 'textfield',

    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding', id:'RoundNeed',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 calculateItemValue();
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                calculateItemValue();
               }
              }
             }}  , //,txtfreight



        ],
    },

    ],
});


  var acvouno = '';
  var LoadSeqNoDatastore = new Ext.data.Store({
      id: 'LoadSeqNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSeqNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'os_seqno'
      ])
    });

  var LoadCustomerDetailDatastore = new Ext.data.Store({
      id: 'LoadCustomerDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgstno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_gstin','cust_state','cust_code'
      ])
    });

 
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


          'cust_code', 'cust_ref','cust_gstin','cust_state','cust_code'
 

      ]),
    });



function PartySearch()
{
        supcode = 0;
        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplier.getRawValue(),
                        gststate : gststate,
		},
        });
}


  var LoadCustomerDetailDatastore2 = new Ext.data.Store({
      id: 'LoadCustomerDetailDatastore2',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOSheader"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_gstin','cust_state','cust_code','cust_gst_type','os_date','U_TCSStatus'
      ])
    });


  var LoadCustomerDatastore = new Ext.data.Store({
      id: 'LoadCustomerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','cust_code' 
      ])
    });
 
var LoadsaleinvnoDatastore =  new Ext.data.Store({
      id: 'LoadsaleinvnoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadothsaleno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'ss_invno'
      ])
    });


var LoadsaleinvnoDetailDatastore =  new Ext.data.Store({
      id: 'LoadsaleinvnoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadothsalenodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'os_date', 'os_custcode', 'os_item', 'os_rate', 'os_qty', 'os_value', 'os_others', 'os_taxable', 'os_cgstper', 'os_cgst', 'os_sgstper', 'os_sgst','os_acvou_no','os_accupd','os_docno',
'os_igstper', 'os_igst', 'os_netamt', 'os_paymode', 'os_transport', 'os_vehno', 'os_remarks', 'os_ourref', 'os_partyref', 'os_accupd',
'os_acvou_no','os_acvou_date','salitem_code', 'salitem_name', 'salitem_uom', 'salitem_hsn',  'uom_code', 'uom_name', 'uom_short_name',
'salitem_cgstper', 'salitem_sgstper','salitem_igstper','salitem_salesledcode_tn', 'salitem_salesledcode_os', 'salitem_cgstledcode', 'salitem_sgstledcode',  'salitem_igstledcode', 'tn_sal_ledger','os_sal_ledger', 'cgst_ledger', 'sgst_ledger', 'igst_ledger', 'os_seqno', 'os_rounding','cust_name','cust_gst_type',
 'U_TCSStatus','U_EWBStatus','E_inv_confirm','U_ReUpload','U_AckNo','U_EWayBillNo','os_acc_seqno','os_tcsper','os_tcsamt',
'os_delivery_addr1', 'os_delivery_addr2', 'os_delivery_addr3', 'os_delivery_city', 'os_delivery_pin', 'os_delivery_gst','invh_ewaybillno'
 



      ])
    });


var LoadsaleinvnoListDatastore =  new Ext.data.Store({
      id: 'LoadsaleinvnoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"getothersalenolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'os_invno'
      ])
    });

var LoadPaytermDatastore = new Ext.data.Store({
      id: 'LoadPaytermDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpayterms"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'term_name','term_code'
      ]),
    }); 

var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcarrier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'carr_name','carr_code'
      ]),
    });

 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'salitem_name','salitem_code'
      ]),
    }); 

var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'uom_short_name','salitem_hsn','salitem_cgstper', 'salitem_sgstper','salitem_igstper','salitem_salesledcode_tn', 'salitem_salesledcode_os', 'salitem_cgstledcode', 'salitem_sgstledcode',  'salitem_igstledcode', 'tn_sal_ledger',
'os_sal_ledger', 'cgst_ledger', 'sgst_ledger', 'igst_ledger'
      ]),
    }); 

var LoadledgerDatastore = new Ext.data.Store({
      id: 'LoadledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    }); 

var LoadCgstledgerDatastore = new Ext.data.Store({
      id: 'LoadCgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcgstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });

var LoadSgstledgerDatastore = new Ext.data.Store({
      id: 'LoadSgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsgstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });

var LoadIgstledgerDatastore = new Ext.data.Store({
      id: 'LoadIgstledgerDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOthSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadigstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });



function calculateItemValue(){
       var value = 0;
       var disvalue = 0;
       var pfvalue = 0;

       var frt  = 0;
       var taxable = 0;

       var cgst = 0;
       var sgst = 0;
       var igst = 0;
       var itemvalue=0;
       var net = 0;
       var taxable = 0;

       value = Number(txtunitrate.getRawValue()) * Number(txtsaleqty.getRawValue()) ; 
       txtvalue.setValue(Ext.util.Format.number(value,'0.00'));


       taxable = Number(value) + Number(txtothers.getValue()); 

       if (txtcgst.getValue() > 0 && value > 0 )  {
  //         cgst =  Ext.util.Format.number(Math.round(taxable *  Number(txtcgst.getValue())/100),'0.00');
           cgst =  taxable *  Number(txtcgst.getValue())/100;
           cgst =  Math.round(cgst*100)/100;
           cgst = cgst.toFixed(2); 
       } 
       txtcgstval.setRawValue(Ext.util.Format.number(cgst,'0.00'));

       if (txtsgst.getValue() > 0 && value > 0 )  {
//           sgst =  Ext.util.Format.number(Math.round(taxable *  Number(txtsgst.getValue())/100),'0.00'); 
           sgst =  taxable *  Number(txtsgst.getValue())/100;
           sgst =  Math.round(sgst*100)/100;
           sgst = sgst.toFixed(2);
       } 

       txtsgstval.setRawValue(Ext.util.Format.number(sgst,'0.00'));

       if (txtigst.getValue() > 0 && value > 0 )  {
//           igst =  Ext.util.Format.number(Math.round(taxable *  Number(txtigst.getValue())/100),'0.00'); 
           igst =  taxable *  Number(txtigst.getValue())/100; 
           ogst =  Math.round(igst*100)/100;
           igst = igst.toFixed(2);
       } 



       txtigstval.setRawValue(Ext.util.Format.number(igst,'0.00'));


      itemvalue =  Number(taxable)+Number(cgst)+Number(sgst)+Number(igst);



      var tcsvalue = Number(itemvalue) * Number(txtTCS.getValue())/100;
 
      tcsvalue = Ext.util.Format.number(tcsvalue,'0.00');
      txtTCSval.setValue(tcsvalue);     



      itemvalue  =  Number(itemvalue) + Number(tcsvalue);
         itemvalue =  itemvalue.toFixed(2);
//alert(roundoff);
        if (roundoff == "Y")           
        {     
          txttotalamt.setRawValue(Ext.util.Format.number(Math.round(itemvalue),'0.00'));
          invround = Number(txttotalamt.getValue()) - Number(itemvalue);
          txtRound.setRawValue(Ext.util.Format.number(invround,'0.00'));
          
        }   
        else
        {
         txttotalamt.setValue(Ext.util.Format.number(itemvalue,'0.00'));    
         txtRound.setRawValue(0)
        }      









}

var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 150,
    hidden:false,
    width: 850,
   id:'my-grid3',
scope: this,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left',hidden :true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:400,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : true},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : true},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});

   var txttotDebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},

   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   });


var txtunitrate = new Ext.form.NumberField({
        fieldLabel  : 'Unit Rate',
        id          : 'txtunitrate',
        width       : 75,
        name        : 'txtunitrate',
	enableKeyEvents: true,
	listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtvalue.focus();
             }
       },
		keyup:function()
			{
                         calculateItemValue();
			}

		}
   }); 
   
  var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        width       : 75,
        name        : 'txtstock'
   });  
   
   var txtGSTIN = new Ext.form.TextField({
        fieldLabel  : 'GSTIN',
        id          : 'txtGSTIN',
        width       : 160,
        name        : 'txtGSTIN',
        readOnly    : true,

   });  
   
     var txtsaleqty = new Ext.form.NumberField({
        fieldLabel  : 'Sale Qty',
        id          : 'txtsaleqty',
        width       : 75,
        name        : 'txtsaleqty',
	enableKeyEvents: true,
	listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtunitrate.focus();
             }
       },
		keyup:function()
			{
                         calculateItemValue();

			}

		}
   }); 

     var txtvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtvalue',
        width       : 75,
        name        : 'txtvalue',
	enableKeyEvents: true,
        readOnly  : true,

        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},


listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtothers.focus();
             }
       },
}


   });


var fdbl_totalvalue;
var cgst_val;
var sgst_val;
var igst_val;
function grid_tot(){
			fdbl_totalvalue=0;
			fdbl_totalactval = 0;
			cgst_val  =0;
			sgst_val  =0;
			igst_val  =0;
             		totamt    =0;
                        round1    = 0;
                        tcs       = 0;
        		var Row= flxDetail.getStore().getCount();
			
			
        			flxDetail.getSelectionModel().selectAll();
        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.taxablevalue);
				    cgst_val = Number(cgst_val)+Number(sel[i].data.cgstval);
				    sgst_val = Number(sgst_val)+Number(sel[i].data.sgstval);
				    igst_val = Number(igst_val)+Number(sel[i].data.igstval);
				    totamt = Number(totamt)+Number(sel[i].data.totamt);
				    round1 = Number(round1)+Number(sel[i].data.rounding);
				    tcs = Number(tcs)+Number(sel[i].data.tcsamt);

        			}
//					alert(cgst_val);
			    	txttvalue.setRawValue(Ext.util.Format.number(fdbl_totalvalue,'0.00'));
				txttcgst.setRawValue(Ext.util.Format.number(cgst_val,'0.00'));
				txttsgst.setRawValue(Ext.util.Format.number(sgst_val,'0.00'));
				txttigst.setRawValue(Ext.util.Format.number(igst_val,'0.00'));
				txtNetAmount.setRawValue(Ext.util.Format.number(totamt,'0.00'));
                                txtRoff.setRawValue(Ext.util.Format.number(round1,'0.00'));
                                txtTotTCS.setRawValue(Ext.util.Format.number(tcs,'0.00'));
						
		   }
   

/*'cmbCustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval',
'totamt','editcode'*/
   
     var txtcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST (%)',
        id          : 'txtcgst',
        width       : 75,
        name        : 'txtcgst',
        readOnly    : true,
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
                         calculateItemValue();

			}

		}
   }); 
   
        var txtsgst = new Ext.form.NumberField({ 	
        fieldLabel  : 'SGST (%)',
        id          : 'txtsgst',
        width       : 75,
        name        : 'txtsgst',
        readOnly    : true,
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
                         calculateItemValue();

			}

		}
   }); 
        var txtigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST (%)',
        id          : 'txtigst',
        width       : 75,
        name        : 'txtigst',
        readOnly    : true,
	enableKeyEvents: true,
	listeners   :
		{
		keyup:function()
			{
                         calculateItemValue();

			}

		}
   }); 


   
   var txtinsvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtinsvalue',
        width       : 75,
	readOnly    :true,
        name        : 'txtinsvalue'
   }); 

 
   
  var txttotalamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Amount',
        id          : 'txttotalamt',
        width       : 75,
        name        : 'txttotalamt'
   }); 
     var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcgstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtcgstval'
   }); 
   
        var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsgstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtsgstval'
   }); 
        var txtigstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtigstval',
        width       : 75,
	readOnly    :true,
        name        : 'txtigstval'
   }); 
   
 
        var txtTCSval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSval',
        width       : 75,
	readOnly    :true,
        name        : 'txtigstval'
   }); 
   
   /*
   var txtinsurance = new Ext.form.NumberField({
        fieldLabel  : 'Insurance',
        id          : 'txtinsurance',
        width       : 75,
        name        : 'txtinsurance',
	enableKeyEvents: true,	
	listeners   :
		{
		keyup:function()
			{
                         calculateItemValue();
			}

		}
   });
   
 */
   
   var txtothers = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtothers',
        width       : 75,
	enableKeyEvents: true,	
        name        : 'txtothers',	
	listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnsubmit.focus();
             }
       },
		keyup:function()
			{
                          calculateItemValue();
			}

		}
   });
   
/*    var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight',
	enableKeyEvents: true,	
	listeners   :
		{
		keyup:function()
			{
			txttotalamt.setRawValue(Number(Number(txtsaleqty.getValue())*Number(txtunitrate.getValue()))+Number(txtcgstval.getValue())+Number(txtsgstval.getValue())+Number(txtinsvalue.getValue())+Number(txtfreight.getValue())+Number(txtothers.getValue()));
			}

		}
   });
   
 */

   var txtRound = new Ext.form.NumberField({
        fieldLabel  : 'Rounding',
        id          : 'txtRound',
        name        : 'txtRound',
        width       :  60,
	readOnly : true,
//    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 

    });


   var txtTruck = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No.',
        id          : 'txtTruck',
        width       : 150,
        name        : 'txtTruck',
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtremark.focus();
             }
       },
}	
   });
   

   var txtEwayBillNo = new Ext.form.TextField({
        fieldLabel  : 'E-way Bill No.',
        id          : 'txtEwayBillNo',
        width       : 150,
        name        : 'txtEwayBillNo',
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtremark.focus();
             }
       },
}	
   });


     var txtuom = new Ext.form.TextField({
        fieldLabel  : 'UOM',
        id          : 'txtuom',
        width       : 85,
        name        : 'txtuom',
        readOnly    : true,
   });
   
   var txtremark = new Ext.form.TextArea({
        fieldLabel  : 'Remark',
        id          : 'txtremark',
        width       : 450,
        name        : 'txtremark',
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtourref.focus();
             }
       },
}	
   });
   
   
     var txttvalue = new Ext.form.NumberField({
        fieldLabel  : '  Value',
        id          : 'txttvalue',
        width       : 75,
        name        : 'txttvalue'
   }); 
   
      var txttcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txttcgst',
        width       : 75,
        name        : 'txttcgst',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   });  
   
   
      var txttsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txttsgst',
        width       : 75,
        name        : 'txttsgst',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   }); 
   
      var txttigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txttigst',
        width       : 75,
        name        : 'txttigst',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   }); 
   
   
      var txtRoff = new Ext.form.NumberField({
        fieldLabel  : 'R.Off',
        id          : 'txtRoff',
        width       : 75,
        name        : 'txtRoff',
        readOnly    : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   }); 
   
   
      var txtNetAmount = new Ext.form.NumberField({
        fieldLabel  : 'Net Amount',
        id          : 'txtNetAmount',
        width       : 90,
        readOnly    : true,
        name        : 'txtNetAmount',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   });

      var txtTotTCS = new Ext.form.NumberField({
        fieldLabel  : 'TCS Amount',
        id          : 'txtTotTCS',
        width       : 90,
        readOnly    : true,
        name        : 'txtTotTCS',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   }); 

 

      var txtSalesInvNo = new Ext.form.TextField({
        fieldLabel  : 'Sales Inv No',
        id          : 'txtSalesInvNo',
        width       : 130 ,
        name        : 'txtSalesInvNo',
        readOnly    : true,
 enableKeyEvents: true,
        listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtsales.focus();
             }
       },
}
   }); 


     var txtourref = new Ext.form.TextField({
        fieldLabel  : 'Our Ref',
        id          : 'txtourref',
        width       : 300,
        name        : 'txtourref',
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyref.focus();
             }
       },
}	
   });

     var txtpartyref = new Ext.form.TextField({
        fieldLabel  : 'Party Ref',
        id          : 'txtpartyref',
        width       : 300,
        name        : 'txtpartyref'
   });
   
   
   
  /* 'cmbCustomer','uon','unitrate','qty','amount','cgstper','cgstval','sgstper','sgstval','igstper','igstval','insper',
'insval','freight','others','totamt','purled','cgstled','cgstled','igstled','freightled','insled','otherled','itemcode','purled','cgstledcode',
'sgstledcode','igstledcode','insledcode','otherledcode','uomcode','editcode'*/
//    'cmbCustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval','totamt','editcode'



var btnsubmit = new Ext.Button({
        text: 'ADD',
        width: 70,
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
	listeners:{ 
            blur : function(){

                flxaccupdation();
  //              grid_tot2();
            },  
 	
            click: function(){
	 	      var cnt2 = 0;

                      var gstadd="true";


                      if (Number(custledcode)==0){
                          Ext.MessageBox.alert("OTHER SALES ", "Select Party Name..");
                          txtSupplier.focus();
                          gstadd="false";
                       }

                      if (Number(txtsaleqty.getValue())===0){
                          Ext.MessageBox.alert("OTHER SALES ", "Enter quantity..");
                          txtsaleqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtunitrate.getValue())===0){
                          Ext.MessageBox.alert("OTHER SALES ", "Enter Rate..");
                          txtunitrate.focus();
                          gstadd="false";
                       }

                       if(gstadd=="true")
                       {
//                           var itemseq = item_combo.getValue();
                           flxDetail.getSelectionModel().selectAll();
                           var selrows = flxDetail.getSelectionModel().getCount();
                           var sel = flxDetail.getSelectionModel().getSelections();
                           var cnt = 0;
                           for (var i=0;i<selrows;i++)
	                   {
                              if (sel[i].data.itemname == cmbitem.getRawValue())
	                      {
                                   cnt = cnt + 1;
                              }

                              if (sel[i].data.cgstper != txtcgst.getValue())
	                      {
                                   cnt2 = cnt2 + 1;
                              }

                           }
                           if(gridedit === "true")
              	           {
		           	gridedit = "false";
                               	var idx = flxDetail.getStore().indexOf(editrow);
                                var tamt = 0;
            	          	sel[idx].set('itemname'    , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'    , cmbitem.getValue());
        	          	sel[idx].set('qty'         , txtsaleqty.getValue());
        	          	sel[idx].set('unitrate'    , txtunitrate.getValue());
            	          	sel[idx].set('amount'      , txtvalue.getValue());
        	          	sel[idx].set('uom'         , txtuom.getRawValue());
        	          	sel[idx].set('others'      , txtothers.getValue());
        	          	sel[idx].set('taxablevalue', Number(txtvalue.getValue())+Number(txtothers.getValue()));
            	          	sel[idx].set('cgstper'     , txtcgst.getValue());
        	          	sel[idx].set('cgstval'     , txtcgstval.getValue());
            	          	sel[idx].set('sgstper'     , txtsgst.getValue());
        	          	sel[idx].set('sgstval'     , txtsgstval.getValue());
            	          	sel[idx].set('igstper'     , txtigst.getValue());
        	          	sel[idx].set('igstval'     , txtigstval.getValue());
                                sel[idx].set('totamt'      , txttotalamt.getValue());
                                sel[idx].set('salledcode'  ,  saleslcode);
                                sel[idx].set('salledname'  ,  saleslname);
                                sel[idx].set('cgstlcode'  , cgstlcode);
                                sel[idx].set('cgstlname'  , cgstlname);
                                sel[idx].set('sgstlcode'  , sgstlcode);
                                sel[idx].set('sgstlname'  , sgstlname);
                                sel[idx].set('igstlcode'  , igstlcode);
                                sel[idx].set('igstlname'  , igstlname);
                                sel[idx].set('rounding'  , txtRound.getValue());
                                sel[idx].set('tcsper'  , txtTCS.getValue());
                                sel[idx].set('tcsamt'  , txtTCSval.getValue());
              
                           	flxDetail.getSelectionModel().clearSelections();

                           
                            }
             	            else if (cnt > 0) 
                            {
                               Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                            } 
             	            else if (cnt2 > 0) 
                            {
                               Ext.MessageBox.alert("Grid","Different GST % Not Allowed.");
                            } 
                            else
                            {
		               var RowCnt = flxDetail.getStore().getCount() + 1;
		               flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({
				   itemname:cmbitem.getRawValue(),
				   itemcode :cmbitem.getValue(),
				   uom:txtuom.getRawValue(),
				   unitrate:txtunitrate.getValue(),
				   qty:txtsaleqty.getValue(),
				   amount:txtvalue.getValue(),
				   others:txtothers.getValue(),
				   taxablevalue:Number(txtvalue.getValue())+Number(txtothers.getValue()),
				   cgstper:txtcgst.getValue(),
				   cgstval:txtcgstval.getValue(),
				   sgstper:txtsgst.getValue(),
				   sgstval:txtsgstval.getValue(),
		                   igstper:txtigst.getValue(),
				   igstval:txtigstval.getValue(),
				   totamt:txttotalamt.getValue(),

                                   salledcode  : saleslcode,
                                   salledname  : saleslname,
                                   cgstlcode : cgstlcode,
                                   cgstlname : cgstlname,
                                   sgstlcode : sgstlcode,
                                   sgstlname : sgstlname,
                                   igstlcode : igstlcode,
                                   igstlname : igstlname,
                                   rounding  : txtRound.getValue(),
            			    tcsper  : txtTCS.getValue(),
				    tcsamt  : txtTCSval.getValue(),
				   editcode:'N',

		                })
		               );


                        }
                      } 
			       txtunitrate.setValue(0);
			       txtsaleqty.setValue(0);
			       txtvalue.setValue(0);
			       txtothers.setValue(0);
		               txtcgst.setValue(0);
	 		       txtcgstval.setValue(0);
			       txtsgst.setValue(0);
			       txtsgstval.setValue(0);
		               txtigst.setValue();
			       txtigstval.setValue();
			       txttotalamt.setValue();
  			       txtTCSval.setValue();
			       txtTCS.setValue();
		               grid_tot();
                               flxaccupdation(); 
//alert("grid");
//grid_tot2();
		  }
      }
})
 
 
var store = new Ext.data.Store({
     
    });

var purchase_combo = new Ext.form.ComboBox({
        id: 'purchase_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Purchase  Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var cgst_combo = new Ext.form.ComboBox({
        id: 'cgst_combo',
        store: LoadCgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'CGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var sgst_combo = new Ext.form.ComboBox({
        id: 'sgst_combo',
        store: LoadSgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'SGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var igst_combo = new Ext.form.ComboBox({
        id: 'igst_combo',
        store: LoadIgstledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'IGST Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});


var frieght_combo = new Ext.form.ComboBox({
        id: 'frieght_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Frieght Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var insurance_combo = new Ext.form.ComboBox({
        id: 'insurance_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Insurance Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});

var othexp_combo = new Ext.form.ComboBox({
        id: 'othexp_combo',
        store: LoadledgerDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Other Exp. Ledger',
        editable:false,
        width: 200,
	displayField: 'led_name',
        valueField: 'led_code',
	hiddenName : 'led_name'
});


 var cmbSalInvNo = new Ext.form.ComboBox({
        id: 'cmbSalInvNo',
        store:  LoadsaleinvnoListDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Sales Inv No',
        editable:true,
        displayField: 'os_invno',
        valueField: 'os_invno',
        hiddenName : 'os_invno',
        width: 130,
        listeners:{




                blur: function () {
                     flxaccupdation();
                },    
                select: function () {

                Ext.getCmp('save').setDisabled(false);
  //              Ext.getCmp('accupd').setDisabled(false);

                               Ext.getCmp('EInv').hide();
			       txtunitrate.setValue(0);
			       txtsaleqty.setValue(0);
			       txtvalue.setValue(0);
			       txtothers.setValue(0);
		               txtcgst.setValue(0);
	 		       txtcgstval.setValue(0);
			       txtsgst.setValue(0);
			       txtsgstval.setValue(0);
		               txtigst.setValue();
			       txtigstval.setValue();
			       txttotalamt.setValue();

            		       txtEwayBillNo.setValue();

                        var gstRegsistered = 'U';
			LoadCustomerDetailDatastore2.load({
                        url: 'ClsOthSales.php',
                        params:
                            {
                                        task: 'loadOSheader',
					finid:GinFinid,
					compcode:Gincompcode,
                                	invno:cmbSalInvNo.getRawValue(),
                                        gsttype : gststate

                            },

			    callback:function(){

      
				gstRegsistered = LoadCustomerDetailDatastore2.getAt(0).get('cust_gst_type');
				custstate      = LoadCustomerDetailDatastore2.getAt(0).get('cust_state');
				custledcode    = LoadCustomerDetailDatastore2.getAt(0).get('cust_code');
				txtGSTIN.setValue(LoadCustomerDetailDatastore2.getAt(0).get('cust_gstin'));
                                if (Gincompcode != 90 && gstRegsistered == "R" )
		                {      
                                    if (LoadCustomerDetailDatastore2.getAt(0).get('os_date') < '2024-01-01')
                                    {  
				        Ext.getCmp('EInv').hide();
				        Ext.getCmp('btnEInvoice').hide();
                                    }
                                    else
                                    {  
                                        if (LoadCustomerDetailDatastore2.getAt(0).get('U_TCSStatus') == 'S')
                                        {
						Ext.getCmp('EInv').show();
						Ext.getCmp('btnEInvoice').hide();
                                        }
                                        else if (LoadCustomerDetailDatastore2.getAt(0).get('U_TCSStatus') == 'E')
                                        {
						Ext.getCmp('EInv').show();
                                		Ext.getCmp('btnEInvoice').hide();
						Ext.getCmp('btnReupload').show();
                                        }
                                        else
                                        {
                                           Ext.getCmp('EInv').show();
				           Ext.getCmp('btnEInvoice').show();
                                        }
                                    }
 
		                }
        	            }
                        });


			flxDetail.getStore().removeAll();
			LoadsaleinvnoDetailDatastore.removeAll();
			LoadsaleinvnoDetailDatastore.load({
		                url: 'ClsOthSales.php',
		                params: {
		                    task: 'loadothsalenodetail',
					finid:GinFinid,
					compcode:Gincompcode,
                                	invno:cmbSalInvNo.getRawValue(),
                                        gsttype : gststate
		                },
//				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = LoadsaleinvnoDetailDatastore.getCount();

                                   if(cnt>0)
                  		    {  


                                  txtAddr1.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_addr1')); 
                                  txtAddr2.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_addr2')); 
                                  txtAddr3.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_addr3')); 
                                  txtAddr4.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_city')); 
                                  txtPin.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_pin')); 
                                  txtGstNo.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_delivery_gst')); 




                                           accseqno= LoadsaleinvnoDetailDatastore.getAt(0).get('os_acc_seqno');

                                           txtSalesInvNo.setValue(cmbSalInvNo.getValue());

                                           seqno = LoadsaleinvnoDetailDatastore.getAt(0).get('os_seqno'); 
                                           docno = LoadsaleinvnoDetailDatastore.getAt(0).get('os_docno'); 

		                           supcode = LoadsaleinvnoDetailDatastore.getAt(0).get('os_custcode');
                                           acvouno  = LoadsaleinvnoDetailDatastore.getAt(0).get('os_acvou_no'); 
		                           txtSupplier.setRawValue(LoadsaleinvnoDetailDatastore.getAt(0).get('cust_name')); 

                                           dtsales.setRawValue(Ext.util.Format.date(LoadsaleinvnoDetailDatastore.getAt(0).get('os_date'),"d-m-Y"));	
                                           cmbpayment.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_paymode'));
					   cmbtransport.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_transport'));



                                           txtEwayBillNo.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('invh_ewaybillno'));
					   txtTruck.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_vehno'));
					   txtremark.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_remarks'));
					   txtourref.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_ourref'));
					   txtpartyref.setValue(LoadsaleinvnoDetailDatastore.getAt(0).get('os_partyref'));
                                           if (LoadsaleinvnoDetailDatastore.getAt(0).get('os_igst') > 0)
                                           {
 				              saleslcode = LoadsaleinvnoDetailDatastore.getAt(0).get('salitem_salesledcode_os');
                                              saleslname = LoadsaleinvnoDetailDatastore.getAt(0).get('os_sal_ledger');                 
                                           }
                                           else    
                                           {
 				              saleslcode = LoadsaleinvnoDetailDatastore.getAt(0).get('salitem_salesledcode_tn');
                                              saleslname = LoadsaleinvnoDetailDatastore.getAt(0).get('tn_sal_ledger');                 
                                           }




/*
                                         if (LoadsaleinvnoDetailDatastore.getAt(0).get('os_accupd') == "Y")
                                         {
                                             alert("Accounts updation done.  You can't Modify..")
                                             Ext.getCmp('save').setDisabled(true);
                                             Ext.getCmp('accupd').setDisabled(true);


                                         }

*/
                                         if (LoadsaleinvnoDetailDatastore.getAt(0).get('E_inv_confirm') == "Y" &&  LoadsaleinvnoDetailDatastore.getAt(0).get('U_TCSStatus') == "S")
                                         {
                                             alert("E-Invoice Generated.  You can't Modify..")
                                             Ext.getCmp('save').setDisabled(true);

                                         }


                             if (LoadsaleinvnoDetailDatastore.getAt(0).get('U_TCSStatus') == "E")
                                {
                                    Ext.getCmp('btnReupload').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnReupload').hide();
                                }


                               if (LoadsaleinvnoDetailDatastore.getAt(0).get('E_inv_confirm') == "Y" && ( LoadsaleinvnoDetailDatastore.getAt(0).get('U_EWBStatus') == "E" ||  LoadsaleinvnoDetailDatastore.getAt(0).get('U_EWBStatus') == ""  ) )

                                {
                                    Ext.getCmp('btnReupload').show();
                                }
                                else
                                {
                                    Ext.getCmp('btnReupload').hide();
                                }

/*
if (LoadsaleinvnoDetailDatastore.getAt(0).get('os_date') < '2023-12-01')
{
        Ext.getCmp('EInv').hide();
        Ext.getCmp('btnEInvoice').hide();
}
*/



		            	           for(var j=0; j<cnt; j++)
				           { 

//alert(LoadsaleinvnoDetailDatastore.getAt(j).get('os_sgstper'));

		                              var itemname1     = LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_name');
		                              var itemcode1     = LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_code');
		                              var uom1          = LoadsaleinvnoDetailDatastore.getAt(j).get('uom_short_name');
		                              var unitrate1     = LoadsaleinvnoDetailDatastore.getAt(j).get('os_rate');
		                              var qty1          = LoadsaleinvnoDetailDatastore.getAt(j).get('os_qty');
		                              var amount1       = LoadsaleinvnoDetailDatastore.getAt(j).get('os_value');
		                              var others1       = LoadsaleinvnoDetailDatastore.getAt(j).get('os_others');
		                              var taxablevalue1 = LoadsaleinvnoDetailDatastore.getAt(j).get('os_taxable');
		                              var cgstper1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_cgstper');
		                              var cgstval1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_cgst');
		                              var sgstper1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_sgstper');
		                              var sgstval1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_sgst');
		                              var igstper1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_igstper');
		                              var igstval1      = LoadsaleinvnoDetailDatastore.getAt(j).get('os_igst');
                                              var totamt1       = LoadsaleinvnoDetailDatastore.getAt(j).get('os_netamt');



		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  itemname    :LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_name'), //itemname1,
						  itemcode    :itemcode1, //itemcode1,
					          uom         :uom1,
						  unitrate    :unitrate1,
						  qty         :qty1,
						  amount      :amount1,
						  others      :others1,
						  taxablevalue:taxablevalue1,
						  cgstper     :cgstper1,
						  cgstval     :cgstval1,
						  sgstper     :sgstper1,
						  sgstval     :sgstval1,
						  igstper     :igstper1,
						  igstval     :igstval1,
						  totamt      :totamt1,

				                   salledcode  : saleslcode,
				                   salledname  : saleslname,
				                   cgstlcode : LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_cgstledcode'),
				                   cgstlname : LoadsaleinvnoDetailDatastore.getAt(j).get('cgst_ledger'),
				                   sgstlcode : LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_sgstledcode'),
				                   sgstlname : LoadsaleinvnoDetailDatastore.getAt(j).get('sgst_ledger'),
				                   igstlcode : LoadsaleinvnoDetailDatastore.getAt(j).get('salitem_igstledcode'),
				                   igstlname : LoadsaleinvnoDetailDatastore.getAt(j).get('igst_ledger'),
				                   rounding : LoadsaleinvnoDetailDatastore.getAt(j).get('os_rounding'),
				                   tcsper : LoadsaleinvnoDetailDatastore.getAt(j).get('os_tcsper'),
				                   tcsamt : LoadsaleinvnoDetailDatastore.getAt(j).get('os_tcsamt'),

		                                  })
		                              );
                                              grid_tot();
		                           }










					EInvStatusDataStore.removeAll();
				    	EInvStatusDataStore.load({
						url: 'ClsOthSales.php',
						params: {
							task: 'loadEInvStatus',
							invno:cmbSalInvNo.getRawValue(),
							compcode :Gincompcode,
							finid:GinFinid
						},
					      	callback:function()
					  	{

					      } 
					});    



					EWayStatusDataStore.removeAll();
				    	EWayStatusDataStore.load({
						url: 'ClsOthSales.php',
						params: {
							task: 'loadEWayStatus',
							invno:cmbSalInvNo.getRawValue(),
							compcode :Gincompcode,
							finid:GinFinid
						},
					      	callback:function()
					  	{

					      } 
					});


                                    }

editdatecheck();

                                }

			  });
          flxaccupdation();
      
          } }
    });


function grid_tot2(){

        var selrows = flxAccounts.getStore().getCount();
        var dr = 0;
        var cr = 0;




        for (var i = 0; i < selrows; i++) {
            var rec = flxAccounts.getStore().getAt(i);

            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));
        }


         txttotDebit.setRawValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));




/*
	var Row2= flxAccounts.getStore().getCount();

alert(Row2);
//        flxAccounts.getSelectionModel().clearSelections();
        flxAccounts.getSelectionModel().selectAll();
alert("fn called");
        var sel2=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row2;i++)
        {
//ert(i);
//alert(sel[i].data.debit);
            dr=dr+Number(sel2[i].data.debit);
            cr=cr+Number(sel2[i].data.credit);


         }
         flxAccounts.getSelectionModel().clearSelections();
         txttotDebit.setRawValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));
*/



}



function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt   = 0;    
        var dbamt = 0;
        var cramt = 0;


        var salamt = 0;

        var cgstamt = 0;
        var sgstamt = 0;

        var igstamt = 0;
        var tcsamt = 0;



        flxAccounts.getStore().removeAll();
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : custledcode,
	      ledname   : txtSupplier.getRawValue(),
	      debit     : txtNetAmount.getRawValue(),
              credit    : 0,
              billno    : txtSalesInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

    
        for(var i=0;i<Row;i++)
        {
            sallcode  =  Number(sel[i].data.salledcode); 
            sallname  =  sel[i].data.salledname; 
            salamt    =  Number(salamt) + Number(sel[i].data.taxablevalue); 

            cgstlcode =  Number(sel[i].data.cgstlcode); 
            sgstlcode =  Number(sel[i].data.sgstlcode); 
            igstlcode =  Number(sel[i].data.igstlcode); 

            cgstlname =  sel[i].data.cgstlname; 
            sgstlname =  sel[i].data.sgstlname; 
            igstlname =  sel[i].data.igstlname; 


            cgstamt   = Number(cgstamt) + Number(sel[i].data.cgstval);
            sgstamt   = Number(sgstamt) + Number(sel[i].data.sgstval);
            igstamt   = Number(igstamt) + Number(sel[i].data.igstval);
            tcsamt    = Number(tcsamt)  + Number(sel[i].data.tcsamt);

        }     

//-- For Sales Ledger


            if (salamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : sallcode,
			      ledname   : sallname,
			      debit     : 0,
			      credit    : Ext.util.Format.number(salamt,'0.00'),
                              ledtype   : "G",
                              billno    : txtSalesInvNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end


//-- For CGST Ledger

            if (cgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : cgstlcode,
			      ledname   : cgstlname,
			      debit     : 0,
			      credit    : Ext.util.Format.number(cgstamt,'0.00'),
                              ledtype   : "G",
                              billno    : txtSalesInvNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end

//-- For SGST Ledger

            if ( sgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : sgstlcode,
			      ledname   : sgstlname,
			      debit     : 0,
			      credit    : Ext.util.Format.number(sgstamt,'0.00'),
                              ledtype   : "G",
                              billno    : txtSalesInvNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end

//-- For IGST Ledger

            if ( igstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : igstlcode,
			      ledname   : igstlname,
			      debit     : 0,
			      credit    : Ext.util.Format.number(igstamt,'0.00'),
                              ledtype   : "G",
                              billno    : txtSalesInvNo.getRawValue(),  
                              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end



//--end


//-- For TCS Ledger
            dbamt = 0;
            k =0;


            if (txtTotTCS.getValue() >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 1680,
			      ledname   : 'TCS @0.1% COLLECTED',
			      debit     : 0,
			      credit    : Ext.util.Format.number(txtTotTCS.getValue(),'0.00'),
                              ledtype   : "G",
                              billno    : txtSalesInvNo.getRawValue(),  
                              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

                        }) 
                        );
            } 


var dr = 0;
var cr = 0;
if (txtRoff.getValue() >0)
   cr = txtRoff.getValue();
else
   dr = Math.abs(txtRoff.getValue());


//Rounding off
if (txtRoff.getValue() != 0)
{
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : 1859,
	      ledname   : 'ROUNDED OFF',
	      debit     : Ext.util.Format.number(dr,'0.00'),
              credit    : Ext.util.Format.number(cr,'0.00'),
              billno    : txtSalesInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),
              ledtype   : "G",
              }) 
        );
}



grid_tot2();

}

    
       var cmbpayment = new Ext.form.ComboBox({
        id: 'cmbpayment',
        store: LoadPaytermDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Payment Mode',
        editable:true,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : 'term_name',
        width: 300,
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbtransport.focus();
             }
       },
}

    });

var store3 = new Ext.data.Store({
      
    });


var txtSupplier = new Ext.form.TextField({
    fieldLabel  : 'Party Name',
    id          : 'txtSupplier',
    width       : 400,
    name        : 'txtSupplier',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    style      :"border-radius: 5px;textTransform: uppercase; ", 
    enableKeyEvents: true,
    listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyrefdate.focus();
             }
             
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
            },
	    keyup: function () {
         	flxParty.getEl().setStyle('z-index','10000');
                flxParty.show();
                loadSearchPartyListDatastore.removeAll();
                  if (txtSupplier.getRawValue() != '')
                     PartySearch();
 //flxParty.hide();
            }

}
});
  
  var cmbtransport = new Ext.form.ComboBox({
        id: 'cmbtransport',
        store: LoadCarrierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Transport',
        editable:false,
        displayField: 'carr_name',
        valueField: 'carr_code',
        hiddenName : 'carr_name',
        width: 300,
listeners   :
		{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTruck.focus();
             }
       },
}
  });

 var cst_combo = new Ext.form.ComboBox({
        id: 'cst_combo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'TNGST / CST No - Date',
        editable:false,
        width: 150
});
           
       var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: LoadItemDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item Name',
        editable:false,
        labelWidth:30,
        displayField: 'salitem_name',
        valueField: 'salitem_code',
        hiddenName : 'salitem_name',
        width: 300,
    	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtsaleqty.focus();
             }
       },
        select:function(){


                if (supcode == 0)
                {
                   alert("Select Party Name and Continue... ")
                   cmbitem.setRawValue('');

                }    
                else
                { 
			txtremark.setRawValue(cmbitem.getRawValue());
			LoadItemDetDatastore.load({
                        url: 'ClsOthSales.php',
                        params:
                            {
                                task:"loaditemdet",
				item:cmbitem.getValue()
                            },
				callback:function(){
				txtuom.setValue(LoadItemDetDatastore.getAt(0).get('uom_short_name'));
                                if (custstate == 24)       
		                        {
					txtcgst.setValue(LoadItemDetDatastore.getAt(0).get('salitem_cgstper'));
					txtsgst.setValue(LoadItemDetDatastore.getAt(0).get('salitem_sgstper'));
					saleslcode = LoadItemDetDatastore.getAt(0).get('salitem_salesledcode_tn');
					saleslname = LoadItemDetDatastore.getAt(0).get('tn_sal_ledger');
					cgstlcode = LoadItemDetDatastore.getAt(0).get('salitem_cgstledcode');
					sgstlcode = LoadItemDetDatastore.getAt(0).get('salitem_sgstledcode');
                			igstlcode = 0;
					cgstlname = LoadItemDetDatastore.getAt(0).get('cgst_ledger');
					sgstlname = LoadItemDetDatastore.getAt(0).get('sgst_ledger');
					igstlname = '';
					txtigst.setRawValue(0);
        calculateItemValue();     
		                        }      
			        else
		                        {
					txtcgst.setValue(0);
					txtsgst.setValue(0);
					txtigst.setRawValue(LoadItemDetDatastore.getAt(0).get('salitem_igstper'));

					saleslcode = LoadItemDetDatastore.getAt(0).get('salitem_salesledcode_os');
					saleslname = LoadItemDetDatastore.getAt(0).get('os_sal_ledger');
					cgstlcode = 0;
					sgstlcode = 0;
                			igstlcode = LoadItemDetDatastore.getAt(0).get('salitem_igstledcode');
					cgstlname = '';
					sgstlname = '';
					igstlname = LoadItemDetDatastore.getAt(0).get('igst_ledger');
        calculateItemValue();     
		                        }   

       
        	        	}
   

                        });  
        calculateItemValue();  
        }     
        }
    }
       
      });
      
var store6 = new Ext.data.Store({
       
    });

/*var partyname = new Ext.form.ComboBox({
        id: 'partyname',
        store: LoadCustomerDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_refcode',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:false,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 250
           
      });*/



  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtsales.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Raise the Invoice in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtsales.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             if (gstFlag == "Edit")
                Ext.getCmp('save').setDisabled(true);
             else
                Ext.getCmp('save').setDisabled(false);

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the Invoice in Future date");
             dtsales.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtsales.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please Change the Fin Year");
    }

    else if(Ext.util.Format.date(dtsales.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please change the Fin Year");
    }

 }


  function editdatecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtsales.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Modify the Invoice in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             Ext.getCmp('save').setDisabled(true);
        }

 }
  var dtsales = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y'),
enableKeyEvents: true,
        listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplier.focus();
             }
       },

           change:function(){
              datecheck();
           },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
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
        height: 350,
        width: 400,
        x : 370,
        y : 50,

 //        id : flxParty,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:400,align:'left'},
		{header: "", dataIndex: 'cust_gstin',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'cust_state',sortable:true,width:330,align:'left',hidden:true},
		{header: "ledcode", dataIndex: 'cust_code',sortable:true,width:330,align:'left',hidden:true},


        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
				supcode = selrow.get('cust_code');
				supname = selrow.get('cust_ref');
                                txtSupplier.setRawValue(selrow.get('cust_ref'));
                        	txtGSTIN.setValue(selrow.get('cust_gstin'));
                                custstate   = selrow.get('cust_state');
                                custledcode= selrow.get('cust_code');
                                flxParty.hide();
                                cmbitem.focus();  
                        }
                     });
             },
        'cellDblclick' : function(flxParty, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('cust_code');
				supname = selrow.get('cust_ref');
                                txtSupplier.setRawValue(selrow.get('cust_ref'));
                        	txtGSTIN.setValue(selrow.get('cust_gstin'));
                                custstate   = selrow.get('cust_state');
                                custledcode= selrow.get('cust_code');
                                flxParty.hide(); 
                                cmbitem.focus(); 			    

			}
               }
          }

   });


    
  var date2 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})

/*var gridstore2 = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'gridstore2'
        },[ 'cmbCustomer','itemcode','uon','unitrate','qty','amount','others','taxablevalue','cgstper','cgstval','sgstper','sgstval','igstper','igstval',
'totamt','editcode'
        ])
    });*/

/*-------------------- Second grid panel ---------------------- */
var dgrecord = Ext.data.Record.create([]);
      var flxDetail = new Ext.grid.EditorGridPanel({
        store            : [],
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
        
 		{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'itemcode',header: "Item Code",width: 60,align: 'center',sortable: true,hidden :true},
 		{dataIndex:'uom',header: "UOM",width: 100, align: 'center',sortable: true},
		{dataIndex:'unitrate',header: "Unit Rate",width: 60,align: 'center',sortable: true},
        	{dataIndex:'qty',header: "Quantity", width: 60,align: 'center', sortable: true},
		{dataIndex:'amount',header: "Amount", width: 100, align: 'center', sortable: true},
		{dataIndex:'others',header: "Others",width: 60,align: 'center',sortable: true},
		{dataIndex:'taxablevalue',header: "Taxable Value",width: 60,align: 'center',sortable: true},
 		{dataIndex:'cgstper',header: "CGST %", width: 60,align: 'right',sortable: true},
		{dataIndex:'cgstval',header: "CGST Val",width: 60,align: 'right',sortable: true},
		{dataIndex:'sgstper', header: "SGST %",width: 60, align: 'left', sortable: true},
		{dataIndex:'sgstval',header: "SGST Val",width: 60,align: 'right',sortable: true},
		{dataIndex:'igstper', header: "IGST %",width: 60, align: 'right', sortable: true},
		{dataIndex:'igstval', header: "IGST Val", width: 60, align: 'right',sortable: true},
		{dataIndex:'totamt',header: "Total Amt",width: 60,align: 'right',sortable: true,hidden :true},
		{dataIndex:'editcode',header: "Edit Qty",width: 60,align: 'right',sortable: true},
		{dataIndex:'salledcode',header: "S.Ledcode",width: 60,align: 'right',sortable: true,hidden :true},
		{dataIndex:'salledname',header: "S.LedName",width: 60,align: 'right',sortable: true},
		{dataIndex:'cgstlcode',header: "CGST.Ledcode",width: 60,align: 'right',sortable: true,hidden :true},
		{dataIndex:'cgstlname',header: "CGST.Ledname",width: 60,align: 'right',sortable: true},
		{dataIndex:'sgstlcode',header: "SGST.Ledcode",width: 60,align: 'right',sortable: true,hidden :true},
		{dataIndex:'sgstlname',header: "SGST.Ledname",width: 60,align: 'right',sortable: true},
		{dataIndex:'igstlcode',header: "IGST.Ledcode",width: 60,align: 'right',sortable: true,hidden :true},
		{dataIndex:'igstlname',header: "IGST.Ledname",width: 60,align: 'right',sortable: true},
		{dataIndex:'rounding',header: "rounding",width: 60,align: 'right',sortable: true},
		{dataIndex:'tcsper',header: "TCS %",width: 60,align: 'right',sortable: true},       
		{dataIndex:'tcsamt',header: "TCS AMT",width: 60,align: 'right',sortable: true},       

        ],
        stripeRows: true,
        height:100,
        width:1250,


       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'OTHER SALES ENTRY',
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
			cmbitem.setValue(selrow.get('itemcode'));
			txtuom.setRawValue(selrow.get('uom'));
		        txtunitrate.setValue(selrow.get('unitrate'));
			txtsaleqty.setValue(selrow.get('qty'));
			txtvalue.setValue(selrow.get('amount'));
		        txtothers.setValue(selrow.get('others'));
			txtcgst.setValue(selrow.get('cgstper'));
			txtcgstval.setValue(selrow.get('cgstval'));
			txtsgst.setValue(selrow.get('sgstper'));
		        txtsgstval.setValue(selrow.get('sgstval'));
                        txtigst.setValue(selrow.get('igstper'));
		        txtigstval.setValue(selrow.get('igstval'));
			txttotalamt.setValue(selrow.get('totamt'));
                        txtRound.setValue(selrow.get('rounding'));    
	                flxDetail.getSelectionModel().clearSelections();
	            }
                 else if (btn === 'no')
                       {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                        }  
             
             }
//                   calculateItemValue();
  //                 grid_tot()();
        });         
    }
 }

     });
/*


function UpdateAccounts()
{
 	 var gstSave;
         gstSave="true";
         if (flxAccounts.getStore().getCount()==0)
         {
               Ext.Msg.alert('Updation','Grid should not be empty..');
               gstSave="false";
	  }
          else if (txtremark.getRawValue() == "" )
          {
               Ext.Msg.alert('Updation','Enter Description....');
               txtremark.focus();
               gstSave="false";
          }
          else if (txttotDebit.getValue() != txttotCredit.getValue())
          {
               Ext.Msg.alert('Updation','Total Debit and Credit is Not Tally......');
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
		            var accData = flxAccounts.getStore().getRange();                                        
		            var poupdData = new Array();
		            Ext.each(accData, function (record) {
		                poupdData.push(record.data);
		            });
		            Ext.Ajax.request({
		            url: 'FrmOtherSalesAccountsSave.php',
		            params :
		             {
				griddet: Ext.util.JSON.encode(poupdData),     
				cnt: accData.length,

	//                                savetype:gstFlag,
		             	compcode    :Gincompcode,
				finyear     :GinFinid,
		             	voutype     :'OSI',
		              	voutypedn   :"",

				vouno       :acvouno,
				voudate     :Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

				grnno       : txtSalesInvNo.getRawValue(),
				grnate      : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),

				refno       : txtSalesInvNo.getRawValue(),
				refdate     : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),
		                narration   : txtremark.getRawValue(),
		   		grnamount   : txtNetAmount.getValue(),
		                debitamount : txtNetAmount.getValue(),

				},
		              callback: function(options, success, response)
		              {

		                var obj = Ext.decode(response.responseText);
			
		                 if (obj['success']==="true")
				 {                                
		                    Ext.MessageBox.alert("Other Sales Details Updated - " + obj['vno']);

		                    myFormPanel.getForm().reset();
		                   
				    flxAccounts.getStore().removeAll();

		                    RefreshData();
		                  }else
			          {
                                       Ext.MessageBox.alert("Updation Error- " + obj['vno']);                                                  
		                  }
		                }
		           });       

                  	}
			}
                    }
                });
            }


}
*/

var dgrecord1 = Ext.data.Record.create([]);
var flxEInvStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:120,
    height: 185,
    hidden:false,
    title:'E-INV STATUS',
    width: 220,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "S/E", dataIndex:'ErrorCode',sortable:false,width:30,align:'left'},
       {header: "Description", dataIndex:'ErrorDiscripion',sortable:false,width:1000,align:'left'},

    ],
    store: EInvStatusDataStore,
});




var dgrecord1 = Ext.data.Record.create([]);
var flxEWayStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:300,
    height: 150,
    hidden:false,
    title:'E-WAY-BILL STATUS',
    width: 220,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "S/E", dataIndex:'ErrorCode',sortable:false,width:30,align:'left'},
       {header: "Description", dataIndex:'ErrorDiscripion',sortable:false,width:1000,align:'left'},

    ],
    store: EWayStatusDataStore,
});




var btnReupload = new Ext.Button({
    id      : 'btnReupload',
    style   : 'text-align:center;',
    text    : "RE UPLOAD",
    tooltip : 'Reupload',
    width   : 150,
    height  : 50,
    x       : 40,
    y       : 60,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){

		      Ext.Ajax.request({
		      url: 'TrnOSSalesReUpload.php',
		      params :
		      {
                     	invcompcode:Gincompcode,
			invfincode :GinFinid,
			invno      :txtSalesInvNo.getRawValue(),
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
             if (txtNetAmount.getValue() == 0)
             {
                 alert("Invoice Amount is Empty.. ");
             }           
             else
             {
	      Ext.Ajax.request({
	      url: 'TrnOSSalesE-Inv.php',
	      params :
	      {
                     	invcompcode:Gincompcode,
			invfincode :GinFinid,
			invno      :txtSalesInvNo.getRawValue(),
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


var tabOS = new Ext.TabPanel({
    id          : 'tabOS',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 550,
    width       : 1350,	
    x           : 10,
    y           : 10,
    listeners: {

     'tabchange': function(tabPanel, tab) {
            var activeTab = tabOS.getActiveTab();
            if (activeTab.id == 'tab2')
            {  
             grid_tot2(); 
             txtremark.setRawValue("SALES OF " + cmbitem.getRawValue());
             }  

        }
    },
    items: [
           {  
                xtype: 'panel',
                title: 'Qty & Amount Details ',
                width: 200,
                height: 250,
                layout: 'absolute',
                id   : 'tab1', 
                items: [
 				 { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:80,
                                  x: 20,  
                                  y: 20,
                                  items: [txtSalesInvNo]
                                },
 				{ 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:80,
                                  x: 20,  
                                  y: 60,
                                  items: [dtsales]
                                },     
 { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:80,
                                  x: 20,  
                                  y: 20,
                                  items: [cmbSalInvNo]
                                },
                                             
                   
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 450,
                    labelWidth:80,
                    x: 20,  
                    y: 90,
                    items: [cmbitem]
                    },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 550,
                            x           : 280,
                            y           : 20,
                            border      : false,
                            items: [txtSupplier]
                        },
//---- anna



                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 200,
                    labelWidth:30,
                    x: 470,  
                    y: 90,
                    items: [txtuom]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 100,
                    width: 175,
                    labelWidth:60,
                    x:600,  
                    y:90,
                    items: [txtsaleqty]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:60,
                    x: 750,  
                    y: 90,
                    items: [txtunitrate]
                    },
		    { 
                        xtype: 'fieldset',
                        title: '',
                        border: false,
                        width: 450, 
                        labelWidth:60,
                        x: 800,  
                        y: 20,
                        items: [txtGSTIN]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:50,
                    x: 920,  
                    y: 90,
                    items: [txtvalue]
                    },

                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 250,
                    labelWidth:80,
                    x: 20,  
                    y: 120,
                    items: [txtothers]
                    },

                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 200,
                    width: 900,
                    labelWidth:80,
                    //layout: 'absolute',
                    x:20,  
                    y:151,
                    items: [
                       txtcgst,txtsgst,txtigst ,txtTCS //,txtinsurance,txtfreight
                     
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 200,
                    width: 270,
                    labelWidth:50,
                    x:140,  
                    y:151,
                    items: [
                        //txtstock,
			txtcgstval,txtsgstval,txtigstval,txtTCSval
                      
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 200,
                    labelWidth:80,
                    x:335,  
                    y:160,
                    items: [txtRound]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 200,
                    labelWidth:80,
                    x:335,  
                    y:200,
                    items: [txttotalamt]
                    }, flxParty,

/*
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 450,
                            x           : 370,
                            y           : 40,
                            border      : false,
                            items: [flxParty]
                        },
*/

                            
                    
                     /*  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 250,
                    width: 350,
                    labelWidth:120,
                    x: 580,  
                    y: 5,
                    items: [
                      purchase_combo,cgst_combo,sgst_combo,igst_combo,frieght_combo,insurance_combo,othexp_combo
                    ]
                    },*/
                
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 200,
                    labelWidth:75,
                    x:800,  
                    y:150,
                    items: [optRounding]
                    },

                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 80,
                    width: 100,
                    labelWidth:75,
                    x:550,  
                    y:180,
                    items: [btnsubmit]
                    },


                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 1300,
                    labelWidth:75,
                    x:0,  
                    y:270,
                    items: [flxDetail]
                    },
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:0,  
                    y:380,
                    items: [txttvalue]
                    },
			{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:160,  
                    y:380,
                    items: [txttcgst]
                    },
                      
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:320,  
                    y:380,
                    items: [txttsgst]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:480,  
                    y:380,
                    items: [txttigst]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 150,
                    labelWidth:40,
                    x:640,  
                    y:380,
                    items: [txtRoff]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 230,
                    labelWidth:100,
                    x:800,  
                    y:380,
                    items: [txtNetAmount]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 230,
                    labelWidth:100,
                    x:1000,  
                    y:380,
                    items: [txtTotTCS]
                    },

		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE',
		                       width       : 250,
		                       height      : 480,
		                       x           : 1070,
		                       y           : 10,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnEInvoice,btnReupload,flxEInvStatus,flxEWayStatus,
             
                                       ]
		                          
		                },


                ],
            },
            {
                xtype: 'panel',
                title: 'Other Details',
                width: 383,
                height: 200,
                layout: 'absolute',
                id   : 'tab2', 
                items: [
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: true,
                    height: 230,
                    width: 1250,
                    labelWidth:85,
                    x:10 ,  
                    y:10 ,
                    items: [
                       cmbpayment,cmbtransport,txtTruck,txtremark,txtourref,txtpartyref,
                    ]
                 },

                 {
                    xtype: 'fieldset',
                    title: ' ',
                    width: 300,
                    labelWidth:85,
                    x:500 ,  
                    y:10 ,
                    border: false,
                    items: [txtEwayBillNo]
                 },


                             {   
                                  xtype       : 'fieldset',
                                  title       : 'DELIVERY ADDRESS',
                                  width       : 600,
                                  height      : 180,
                                  x           : 600,
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
                    xtype: 'fieldset',
                    title: ' ',
                    border: true,
                    height: 180,
                    width: 1100,
                    labelWidth:85,
                    x:10 ,  
                    y:250 ,
                    items: [flxAccounts]
                 },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 880,
		         y           : 300,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 880,
		         y           : 350,
		         border      : false,
		         items:[txttotCredit],
                       },
                ],
            },


           
    ]


})

var myFormPanel = new Ext.form.FormPanel({
        width        :  1350, 
        title        : 'MISCELLANEOUS SALES',
        style        : 'margin: 5px ',
        height       : 560,
        frame        : false,
        bodyStyle    : 'background: url(.../icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'myFormPanel',
        layout       : 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, []),
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 30,
            items: [
                {
                    xtype: 'button',
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
		    listeners:
	            {
                     	click: function(){
//EDIT
                           Ext.getCmp('cmbSalInvNo').show();
                           gstFlag = "Edit";
                           LoadsaleinvnoListDatastore.removeAll();
                           LoadsaleinvnoListDatastore.load({
      		              url: 'ClsOthSales',
                              params: {
			          task: 'loadothsalenolist',
			          finid: GinFinid,
			          compcode:Gincompcode,
                                  gsttype : gststate
                              },
                              callback:function()
                              { 
//			          alert(LoadsaleinvnoListDatastore.getCount());	
                              }
                           });

                        }
                    }


                    
                },'-',
                {
//save
                    xtype: 'button',
                    text: 'Save',
                    id: 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {
//alert(gstFlag);
//alert(txtSalesInvNo.getValue());



		      fromdate = "04/01/"+gstfinyear.substring(0,4);
		      todate = "03/31/"+gstfinyear.substring(5,9);

			if(Ext.util.Format.date(dtsales.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
			   Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
				gstSave="false";
			}

			else if(Ext.util.Format.date(dtsales.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
			    Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
				gstSave="false";
			}

                        else if (flxDetail.getStore().getCount()==0)
        	        {
        	                Ext.Msg.alert('SALES','Grid should not be empty ..click ADD button ');
        	                gstSave="false";
	                }
                        else if (cmbpayment.getRawValue() == "" || cmbpayment.getValue() == 0  )
                        {
                               Ext.Msg.alert('SALES','Select Payment Terms.....');
                        }
                        else if (cmbtransport.getRawValue() == "" || cmbtransport.getValue() == 0  )
                        {
                               Ext.Msg.alert('SALES','Select Transport Details.....');
                        }
                        else if (txtTruck.getRawValue() == "")
                        {
                               Ext.Msg.alert('SALES','Select Vehicle Details.....');
                        }
			else if (txttotDebit.getValue() != txttotCredit.getValue())
			{
			      Ext.Msg.alert('Updation','Total Debit and Credit is Not Tally......');
			      gstSave="false";
			 }
             		else
			{   
	                                   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
		                           msg: 'Do You Want to save the Record',
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      { 

                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
					    var accData = flxAccounts.getStore().getRange();                                        
					    var poupdData = new Array();
					    Ext.each(accData, function (record) {
						poupdData.push(record.data);
					    });

                                               Ext.Ajax.request({
				               url: 'TrnOtherSalesSave.php',
				               params:
						{
						griddet      : Ext.util.JSON.encode(finupdData),       
 						cnt          : finData.length,
						griddetacc   : Ext.util.JSON.encode(poupdData),     
						cntacc         : accData.length,
                                                savetype     : gstFlag,
	           				snhinvno     : txtSalesInvNo.getRawValue(),  
                                             	snhdocno     : docno,  
                                		snhsaltype   : gststate,  
	           				snhcompcode  : Gincompcode,
						snhfincode   : GinFinid,
						snhdate      : Ext.util.Format.date(dtsales.getValue(),"Y-m-d"),
						//snhcustcode  : txtSupplier.getRawValue(),
						snhcustcode  : supcode,
						snhpaymode   : cmbpayment.getValue(),
						snhtransport : cmbtransport.getValue(),
						snhvehno     : txtTruck.getValue(),
						snhremarks   : txtremark.getValue(),
						ourref       : txtourref.getValue(),
						partyref     : txtpartyref.getValue(),
                                                acvouno      : acvouno,
                                                seqno        : seqno,
                                                invhtime     : Ext.util.Format.date(new Date(),"Y-m-d H:i"),
					        ewaybillno   : '',  
                                       		accseqno     : accseqno,
						deliveryadd1 : txtAddr1.getRawValue() ,
						deliveryadd2 : txtAddr2.getRawValue(),
						deliveryadd3 : txtAddr3.getRawValue(),
						deliverycity : txtAddr4.getRawValue(),
						deliverypin  : txtPin.getRawValue(),
						deliverygst  : txtGstNo.getRawValue(),


                                        	},
	                                        callback: function(options, success, response)
                                                {

                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{    
                   	                                    RefreshData();
	                                    Ext.MessageBox.alert("Other Sales Entry Saved -" + obj['saleno']);
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
                                            flxAccounts.getStore().removeAll();
	                                    RefreshData();
 
					   // RefreshGridData(); 
	                                  }else
						{
            Ext.MessageBox.alert("Other Sales Entry Not Saved!- " + obj['saleno']);                                                  
                                     }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
                    
                },'-',
/*
                {
                    xtype: 'button',
                    text: 'Accounts Update',
                    id: 'accupd',
                    style  : 'text-align:center;',
                    tooltip: 'Accounts Update...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
                   listeners:{
                      click: function () {

                            UpdateAccounts();
                       }
                    }
                    
                },'-',

*/
                {
                    xtype: 'button',
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
                   listeners:{
                      click: function () {
 
                            RefreshData();
                       }
                    }
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png',
                    listeners:{
                      click: function () {
			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&invno=" + encodeURIComponent(cmbSalInvNo.getRawValue());
		        var p4 = "&displayword=" + encodeURIComponent("ORIGINAL FOR BUYER"); 
			var param = (p1+p2+p3+p4) ;                        
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf&' + param, '_blank');	
                       }
                    }
                },'-',
                {
                    xtype: 'button',
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png',
                    listeners:{
                       click: function(){
                          window_form.hide();
                        }
                    }
                    
                },

            ],

         },
           items: [
            {xtype: 'fieldset',
                title: '',

                width: 1320,
                height: 490,
                x: 2,
                y: 20,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [tabOS]
             },
           ], 

    });


function RefreshData(){
        myFormPanel.getForm().reset();

 Ext.getCmp('save').setDisabled(false);
        txtremark.setRawValue("Other Sales");

        Ext.getCmp('cmbSalInvNo').hide();
        flxDetail.getStore().removeAll();
//flxParty.hide();
        gstFlag = "Add";
     Ext.getCmp('btnEInvoice').hide();
     Ext.getCmp('btnReupload').hide();
     Ext.getCmp('EInv').hide();

 flxParty.hide();
        Ext.getCmp('save').setDisabled(false);
      //  Ext.getCmp('accupd').setDisabled(false);

  					LoadSeqNoDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadSeqNo',
					    finid:GinFinid,
					    compcode:Gincompcode,
						
					},
					callback:function()
					{
                                           seqno = LoadSeqNoDatastore.getAt(0).get('os_seqno');
                                           acvouno = "OSI"+LoadSeqNoDatastore.getAt(0).get('os_seqno');

					}
				    	});

					
					LoadsaleinvnoDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadothsaleno',
					    finid:GinFinid,
					    compcode:Gincompcode,
                                            gsttype : gststate
						
					},
					callback:function()
					{

                                       docno = LoadsaleinvnoDatastore.getAt(0).get('ss_invno');
                                      
	
                                       if (LoadsaleinvnoDatastore.getAt(0).get('ss_invno') < 10)
                                        {                                              
                                           ino = "00"+LoadsaleinvnoDatastore.getAt(0).get('ss_invno');
                                        }                                      
                                        else
                                        {  
                                             if (LoadsaleinvnoDatastore.getAt(0).get('ss_invno') < 100) 
                                             {                                              
                                              ino = "0"+LoadsaleinvnoDatastore.getAt(0).get('ss_invno');                   
                                             }
                                             else 
                                             {      
                                               ino = LoadsaleinvnoDatastore.getAt(0).get('ss_invno');  
                                             }
                                        } 
                                         txtSalesInvNo.setRawValue(gststate+'/'+ino+'/'+invfin);



					}
				    	});

					LoadCustomerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadCustomer'
					}
				    	});

					LoadCarrierDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadcarrier'
					}
				    	});

					LoadPaytermDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadpayterms'
					}
				    	});

					LoadItemDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loaditem'
					}
				    	});
					
					LoadledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadledger'
					}
				    	});

					LoadCgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadcgstledger'
					}
				    	});

					LoadSgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadsgstledger'
					}
				    	});

					LoadIgstledgerDatastore.load({
					url: 'ClsOthSales.php',
					params: {
					    task: 'loadigstledger'
					}
				    	});

}

var window_form = new Ext.Window({
                         width        : 1350,        
                         height       : 600,
                         items        : myFormPanel,
                         closable	:false,
                         resizable	:false,
                         draggable	:false,
            //             x		:130,
                         y		:30,
			listeners:{					
			       show:function()
			       {


				 gstFlag = "Add";
			       //	RefreshGridData(); 
                                 RefreshData();

				
              			}
			  }


  
});
  window_form.show();
  
});
