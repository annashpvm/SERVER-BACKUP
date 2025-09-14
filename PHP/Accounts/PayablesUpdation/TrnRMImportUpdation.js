Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var partyledcode = 0;
   var partycode = 0;
   var purledgercode = 0;
   var purledgername = 0;
   var purledgername = 0;
   var cgstledgercode = 0;
   var cgstledgername = 0;
   var sgstledgercode =0;
   var sgstledgername = 0;
   var igstledgercode = 0;
   var igstledgername = 0;
   var itemname = "";

   var invwt = 0;  
   var portwt = 0;
   var millwt = 0;
   var grnwt = 0;
  



var loadGRNDetailsDataStore = new Ext.data.Store({
  id: 'loadGRNDetailsDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadImportGRNDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['rech_no', 'portqty', 'millqty', 'grnqty','grnamt'  
  ])
});

var loadGRNAmountDataStore = new Ext.data.Store({
  id: 'loadGRNAmountDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadImportGRNValue"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['grnamt'
  ])
});



 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      autoLoad : true,   
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'},

      ]),
    });

var loadInvNoListDataStore = new Ext.data.Store({
  id: 'loadInvNoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadInvNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_invoicerefno','invh_seqno','sup_led_code'

  ])
});


var loadINVNoDetailDataStore = new Ext.data.Store({
  id: 'loadINVNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'clsPayableUpdation.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_seqno', 'invh_compcode', 'invh_fincode', 'invh_invoiceno', 'invh_invoicerefno', 'invh_date', 'invh_refno', 'invh_refdate', 'invh_poseqno', 'invh_sup_code', 'invh_agent', 'invh_payterms', 'invh_deliveryterms', 'invh_shiftment', 'invh_origincountry', 'invh_originport', 'invh_arrivalport', 'invh_bankacno', 'invh_bankname', 'invh_bankcode', 'invh_branchcode', 'invh_swiftcode', 'invh_bankadd1', 'invh_bankadd2', 'invh_bankadd3', 'invh_billladingno', 'invh_billladingdate', 'invh_billentryno', 'invh_billentrydate', 'invh_exchangerate', 'invh_invoicevalue', 'invh_BCD', 'invh_ACD', 'invh_SWS', 'invh_CVD', 'invh_IGST', 'invh_otherduty', 'invh_interest', 'invh_penalty', 'invh_fine', 'invh_totduty', 'invh_clearing','invh_vesselname', 'invh_shipmentdate', 'invh_doccleared', 'invh_partyaccstat', 'invh_partyvouno', 'invh_dutyaccstat', 'invh_dutyvouno', 'invh_jv_vouno', 'invt_seqno', 'invt_item_code', 'invt_qty', 'invt_portqty','invt_millqty', 'invt_recqty', 'invt_moisper', 'invt_outthroughper', 'invt_dedper', 'invt_itemrate', 'invt_itemvalue','ordh_no' , 'ordh_date', 'invh_20feet_container','invh_40feet_container','itmh_name' , 'invt_item_code','rech_totalamount'
  ])
});


    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });

var LoadGSTDataStore = new Ext.data.Store({
      id: 'LoadGSTDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWPL_Ledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'tax_name', 'purledcode', 'purledname', 'tax_cgst_per', 'tax_sgst_per','tax_igst_per', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode', 
 'cgstledname', 'sgstledname', 'igstledname'
      ]),
    });

var LoadLedgerDataStore = new Ext.data.Store({
      id: 'LoadLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	  'led_code', 'led_name'
      ]),
    });



var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(T)',
    id          : 'lblqty',
    width       : 60
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 60
});

var lblCGST = new Ext.form.Label({
    fieldLabel  : 'CGST',
    id          : 'lblCGST',
    width       : 60
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'SGST',
    id          : 'lblSGST',
    width       : 60
});

var lblIGST = new Ext.form.Label({
    fieldLabel  : 'IGST',
    id          : 'lblIGST',
    width       : 60
});

var lblParty = new Ext.form.Label({
    fieldLabel  : 'PORT',
    id          : 'lblParty',
    width       : 60
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN',
    id          : 'lblGRN',
    width       : 60
});


var lblMILL = new Ext.form.Label({
    fieldLabel  : 'MILL',
    id          : 'lblMILL',
    width       : 60
});

var lblDiff = new Ext.form.Label({
    fieldLabel  : 'DIFF.',
    id          : 'lblDiff',
    width       : 60
});

var lblCess = new Ext.form.Label({
    fieldLabel  : 'CESS',
    id          : 'lblCess',
    width       : 60
});

var lblTCS = new Ext.form.Label({
    fieldLabel  : 'TCS',
    id          : 'lblTCS',
    width       : 60
});

var lblpurchase = new Ext.form.Label({
    fieldLabel  : 'PURCHASE DETAILS',
    id          : 'lblpurchase',
    width       : 500,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",     
});


var lbldebitnote = new Ext.form.Label({
    fieldLabel  : 'DEBIT NOTE DETAILS',
    id          : 'lbldebitnote',
    width       : 500,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",     
});
   var txtPartyWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtPartyWt',
        name        : 'txtPartyWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyValue',
        name        : 'txtPartyValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtFreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtFreight',
        name        : 'txtFreight',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCGST',
        name        : 'txtPartyCGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffCGST.setValue(Number(txtPartyCGST.getValue())-Number(txtGRNCGST.getValue()));
                 flxaccupdation(); 
          }

        }      

   });

   var txtPartySGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartySGST',
        name        : 'txtPartySGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffSGST.setValue(Number(txtPartySGST.getValue())-Number(txtGRNSGST.getValue()));
                 flxaccupdation(); 
          }

        } 
   });
   var txtPartyIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyIGST',
        name        : 'txtPartyIGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
                 txtDiffIGST.setValue(Number(txtPartyIGST.getValue())-Number(txtGRNIGST.getValue()));
                 flxaccupdation(); 
          }

        } 
   });

   var txtPartyCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCess',
        name        : 'txtPartyCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyTCS',
        name        : 'txtPartyTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMILLWt',
        name        : 'txtMILLWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLValue',
        name        : 'txtMILLValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLCGST',
        name        : 'txtMILLCGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{


        }      

   });

   var txtMILLSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLSGST',
        name        : 'txtMILLSGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){

          }

        } 
   });
   var txtMILLIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLIGST',
        name        : 'txtMILLIGST',
        width       :  65,
//	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          keyup:function(){
          }

        } 
   });

   var txtMILLCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLCess',
        name        : 'txtMILLCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtMILLTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMILLTCS',
        name        : 'txtMILLTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffWt',
        name        : 'txtDiffWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffValue',
        name        : 'txtDiffValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSGST',
        name        : 'txtDiffSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtDiffIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffIGST',
        name        : 'txtDiffIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtDiffCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCess',
        name        : 'txtDiffCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffTCS',
        name        : 'txtDiffTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtVouNo = new Ext.form.NumberField({
        fieldLabel  : 'Vou No.',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        width       :  70,
//	readOnly : true,
//    	labelStyle : "font-size:10px;font-weight:bold;",
	//style      : "border-radius:5px;",     
        tabindex : 2
   });

   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });




var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No. ',
        width           : 250,
        displayField    : 'invh_invoicerefno', 
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                        loadINVNoDetailDataStore.removeAll();
			loadINVNoDetailDataStore.load({
                        url: 'clsPayableUpdation.php',
                        params:
                            {
                                task:"loadINVNoDetail",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {
//   alert(loadINVNoDetailDataStore.getAt(0).get('invh_seqno'));
var partyval = 0;

                                dtVouNo.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_date'),"d-m-Y"));
                                dtInvNo.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_date'),'d-m-Y'));
  
//                                txtBillAmt.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_invoicevalue'));
//alert(loadINVNoDetailDataStore.getAt(0).get('invh_invoicevalue'));

                                partyval = loadINVNoDetailDataStore.getAt(0).get('invh_invoicevalue');
                                partyval = Math.round(partyval * 100) / 100;
                                partyval = partyval.toFixed(0);

                                txtPartyValue.setValue(partyval);
                                txtBillAmt.setValue(partyval);

                                txtGRNValue.setValue(loadINVNoDetailDataStore.getAt(0).get('rech_totalamount'));
				var RowCnt = loadINVNoDetailDataStore.getCount();
 			        for (var i=0;i<RowCnt;i++)
                                {
                                   invwt = Number(invwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_qty'));
                                   portwt = Number(portwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_portqty'));
                                   millwt = Number(millwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_millqty'));
                                   grnwt = Number(grnwt) + Number(loadINVNoDetailDataStore.getAt(i).get('invt_recqty'));

                                }    
                                txtBillQty.setValue(invwt);					
                                txtPartyWt.setValue(portwt);	
                                txtMILLWt.setValue(millwt);	
                                txtGRNWt.setValue(grnwt);
flxaccupdation();
	


                            }  
                        });   
                        loadGRNAmountDataStore.removeAll();
			loadGRNAmountDataStore.load({
                        url: 'clsPayableUpdation.php',
                        params:
                            {
                                task:"loadImportGRNValue",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {

                                txtGRNValue.setValue(loadGRNAmountDataStore.getAt(0).get('grnamt'));
flxaccupdation();

                            }  
                        });  

                        loadGRNDetailsDataStore.removeAll();
			loadGRNDetailsDataStore.load({
                        url: 'clsPayableUpdation.php',
                        params:
                            {
                                task:"loadImportGRNDetail",
                                invno    : cmbInvNo.getRawValue(),
                                supcode  : cmbPartyName.getValue(),
			    	compcode : Gincompcode,
			    	finid    : GinFinid,
                            },
                            callback: function () 
			    {

//alert("Hello");

                            }  
                        }); 
 
flxaccupdation();
                   }
         }
  });


   var txtBillAmt = new Ext.form.NumberField({
        fieldLabel  : 'Bill Amount',
        id          : 'txtBillAmt',
        name        : 'txtBillAmt',
        width       :  120,
//	readOnly : true,
        tabindex : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
	    keyup:function()
		{
                     flxaccupdation();			
		}
        } 
   });

   var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty(t)',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  90,
	readOnly : true,
        tabindex : 2,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   });


   var txtGRNAmt = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNAmt',
        name        : 'txtGRNAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2
   });

  var txtGRNWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtGRNWt',
        name        : 'txtGRNWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

  var txtGRNValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNValue',
        name        : 'txtGRNValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCGST',
        name        : 'txtGRNCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNSGST',
        name        : 'txtGRNSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });
   var txtGRNCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCess',
        name        : 'txtGRNCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNIGST',
        name        : 'txtGRNIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });


   var txtGRNTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNTCS',
        name        : 'txtGRNTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });



   var txttotDebit = new Ext.form.TextField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotDebitDNote = new Ext.form.TextField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebitDNote',
        name        : 'txttotDebitDNote',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotCreditDNote = new Ext.form.TextField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCreditDNote',
        name        : 'txttotCreditDNote',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtPurchaseRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtPurchaseRemarks',
        name        : 'txtPurchaseRemarks',
        width       :  450,
	readOnly : true,
        tabindex : 2
   });

   var txtDNoteRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtDNoteRemarks',
        name        : 'txtDNoteRemarks',
        width       :  450,
	readOnly : true,
        tabindex : 2
   });

   var dtInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtInvNo',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });



function grid_tot(){
        var dr = 0;
        var cr = 0;
         txttotDebit.setRawValue(0);
         txttotCredit.setRawValue(0);
         txttotDebitDNote.setRawValue(0);
         txttotCreditDNote.setRawValue(0);


	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 
         txttotDebit.setRawValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));
        dr = 0;
        cr = 0;


	var Row= flxAccountsDNote.getStore().getCount();
        flxAccountsDNote.getSelectionModel().selectAll();
        var sel=flxAccountsDNote.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 
         txttotDebitDNote.setValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCreditDNote.setValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));


}







var loadGRNdetailsStore = new Ext.data.Store({
      id: 'loadGRNdetailsStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewWPLGrnDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
'rech_sup_code', 'rech_date','rech_sgst_per','rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt',
'rech_tcs_per', 'rech_tcs_amt', 'rech_servicecharge', 'rech_freight', 'rech_totalamount', 'rech_billno', 'rech_billdate', 
'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno','rech_geno','rech_gedate', 'rect_seqno', 'rect_item_code', 'rect_billqty', 'rect_millqty', 
'rect_grnqty','rect_itemrate', 'rect_partyitemcode', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'itmh_name', 'itmh_ledcode',
'led_name','sup_refname','sup_led_code','sup_taxcode','rect_degqty'

      ]),
    });


var LoadGRNDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWPLgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_grnno'
      ]),
    });


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Remarks",
    width   : 60,
    height  : 20,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){     
            txtPurchaseRemarks.setRawValue("RECEIPT OF " + itemname+ " - BILL NO." + cmbInvNo.getRawValue() + " Dt. " + Ext.util.Format.date(dtInvNo.getValue(),"d-m-Y")+ " P.QTY " + txtPartyWt.getValue() + " MT OUR GRN NO. " + cmbPartyName.getRawValue()  + " G.QTY " + txtGRNWt.getValue() + " MT");
	if (txttotDebitDNote.getValue() > 0)
	{  
            txtDNoteRemarks.setRawValue("DEBITED TO YOUR ACCOUNT - EX.MOIS/QTY Shortage AGAINST YOUR B.No." + cmbInvNo.getRawValue() + " Dt. " +  Ext.util.Format.date	(dtInvNo.getValue(),"d-m-Y") + " - OUR GRN NO. " +  cmbPartyName.getRawValue());  
        }
        }
    }
});  


var cmbPartyName = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name. ',
        width           : 300,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbPartyName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsupplierdatastore,
       labelStyle       : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){
               partyledcode = 0;
               loadInvNoListDataStore.removeAll();
	       loadInvNoListDataStore.load({
			url: 'clsPayableUpdation.php',
			params: {
			    task: 'LoadInvNoList',
			    compcode : Gincompcode,
			    finid    : GinFinid,
		            supcode  : cmbPartyName.getValue(),
			},
		       callback: function () {
// alert(loadInvNoListDataStore.getAt(0).get('sup_led_code'));                          
              		partyledcode = loadInvNoListDataStore.getAt(0).get('sup_led_code');
			}
		});
          }
        }

});



function flxaccupdation() {

        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        flxAccounts.getStore().removeAll();
        flxAccountsDNote.getStore().removeAll();
//Party Account - Credit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : partyledcode,
	      ledname   : cmbPartyName.getRawValue(),
	      debit     : "0",
              credit    : txtBillAmt.getValue(),
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );
//Purchase Account - Debit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : '1785',
	      ledname   : 'WASTE PAPER PURCHASE-IMPORT',
	      debit     : txtBillAmt.getValue()-txtPartyCGST.getRawValue()-txtPartySGST.getRawValue()-txtPartyIGST.getRawValue()-txtPartyCess.getRawValue()-txtPartyTCS.getRawValue(),
              credit    : 0,
              ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
              }) 
        );
//CGST Account - Debit

        if (txtPartyCGST.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledgercode,
		      ledname   : cgstledgername,
		      debit     : txtPartyCGST.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//SGST Account - Debit

        if (txtPartySGST.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledgercode,
		      ledname   : sgstledgername,
		      debit     : txtPartySGST.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//IGST Account - Debit

        if (txtPartyIGST.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledgercode,
		      ledname   : igstledgername,
		      debit     : txtPartyIGST.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//TCS Account - Debit

        if (txtPartyTCS.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1286',
		      ledname   : 'TCS ON WASTE PAPER',
		      debit     : txtPartyTCS.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }


//------------DEBIT NOTE ACCOUNTING -----------

//Party Account - Debit
       if (txtDiffValue.getValue() > 0)
       {
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : partyledcode,
		      ledname   : txtSupplier.getRawValue(),
		      debit     : txtDiffValue.getRawValue(),
		      credit    : "0",
                      billno    : cmbInvNo.getRawValue(),
                      billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                      ledtype   : "P",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
       }

//Purchase Account - Debit
       if (txtDiffValue.getValue() > 0)
       {   
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : purledgercode,
		      ledname   : purledgername,
		      debit     :0,
		      credit    : txtDiffValue.getRawValue()-txtDiffCGST.getRawValue()-txtDiffSGST.getRawValue()-txtDiffIGST.getRawValue()-txtDiffCess.getRawValue()-txtDiffTCS.getRawValue(),
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
        }
//CGST Account - Credit

        if (txtDiffCGST.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledgercode,
		      ledname   : cgstledgername,
		      debit     : "0",
		      credit    : txtDiffCGST.getRawValue(),
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//SGST Account - Credit

        if (txtDiffSGST.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledgercode,
		      ledname   : sgstledgername,
		      debit     : 0,
		      credit    : txtDiffSGST.getRawValue(),
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//IGST Account - Credit

        if (txtDiffIGST.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledgercode,
		      ledname   : igstledgername,
		      debit     : "0",
		      credit    : txtDiffIGST.getRawValue(),
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//TCS Account - Credit

        if (txtDiffTCS.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNote.getStore().getCount() + 1;
		flxAccountsDNote.getStore().insert(
		  flxAccountsDNote.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1286',
		      ledname   : 'TCS ON WASTE PAPER',
		      debit     : "0",
		      credit    : txtDiffTCS.getRawValue(),
                      ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
		      }) 
		);
         }

//alert("testing");

         grid_tot()
         var diff = 0;
         diff =  txttotDebit.getValue()-txttotCredit.getValue(); 
         var sel1 = flxAccounts.getSelectionModel().getSelections();           		
         sel1[1].set('debit',sel1[1].get('debit')-diff);
         diff =  txttotDebitDNote.getValue()-txttotCreditDNote.getValue(); 
         var sel1 = flxAccountsDNote.getSelectionModel().getSelections();           		
         sel1[1].set('Credit',sel1[1].get('Crdit')-diff);


}
 
    





var dgrecord = Ext.data.Record.create([]);


var gstcalc ="G";



var flxGRN = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:430,
    y:30,
    height: 160,
    hidden:false,
    width: 280,
    columns:
    [
	{header: "GRN" ,    dataIndex: 'rech_no',sortable:true,width:45,align:'left'},
	{header: "Port Wt", dataIndex: 'portqty',sortable:true,width:55,align:'left'},
	{header: "Mill Wt", dataIndex: 'millqty',sortable:true,width:55,align:'left'},
	{header: "GRN Wt",  dataIndex: 'grnqty',sortable:true,width:55,align:'left'},
	{header: "GRN Amt",  dataIndex: 'grnamt',sortable:true,width:70,align:'left'},
    ],
    store: loadGRNDetailsDataStore,
    listeners:{	
    }

});




var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:15,
    height: 160,
    hidden:false,
    width: 530,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:280,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:85,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:85,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});


var flxAccountsDNote = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:280,
    height: 130,
    hidden:false,
    width: 530,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:280,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:85,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:85,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},

    ],
    store: [],
    listeners:{	
    }

});




var TrnRMPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnRMPayableUpdationPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
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
                    var gstSave;
                    gstSave="true";
                    if (cmbPartyName.getRawValue()==0 || cmbPartyName.getRawValue()=="")
                    {
                        Ext.Msg.alert('Updation','GRN no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxAccounts.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Updation','Grid should not be empty..');
        	                gstSave="false";
	                    }
          	    else if (flxAccounts.getStore().getCount()==0)
         	            {
        	                Ext.Msg.alert('Updation','Accounts Grid should not be empty..');
        	                gstSave="false";
	                    }

                    else if (Number(txttotDebit.getValue()) != Number(txttotCredit.getValue()))
                    {
                        Ext.Msg.alert('Updation','Total Debit and Credit is Not Tallied......');
                        gstSave="false";
                    }

                    else if (txtPurchaseRemarks.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Remarks for Purchase .....');
                        txtPurchaseRemarks.focus();
                        gstSave="false";
                    }
                    else if (Number(txttotDebitDNote.getValue()) > 0 &&  txtDNoteRemarks.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Remarks for Debit Note .....');
                        txtDNoteRemarks.focus();
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


                            var accDatadn = flxAccountsDNote.getStore().getRange();                                        
                            var poupdDatadn = new Array();
                            Ext.each(accDatadn, function (record) {
                                poupdDatadn.push(record.data);
                            });



                            Ext.Ajax.request({
                            url: 'FrmPayableDataSave.php',
    //                    url: 'test1.php',
                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: accData.length  ,

				griddetdn: Ext.util.JSON.encode(poupdDatadn),     
			        cntdn: accDatadn.length  ,


//                                savetype:gstFlag,
                                paymode   :"RM",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,


                             	voutype   :"PIW",
                              	voutypedn :"DNW",
                              	
				partyledcodeh : partyledcode,
				dnremarks     : txtDNoteRemarks.getRawValue(),
				vouno         : txtVouNo.getRawValue(),
				voudate       : Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				grnno     :cmbPartyName.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				refno     : cmbInvNo.getRawValue(),
				refdate   : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                                narration : txtPurchaseRemarks.getRawValue(),
                   		grnamount : txtGRNValue.getValue(),
                                debitamount :txttotCreditDNote.getValue(),
                                
                                dnamt : txtDiffValue.getValue(),
                                dnqty : txtDiffWt.getValue(),
                                
                                dncgst : txtDiffCGST.getValue(),
                                dnsgst : txtDiffSGST.getValue(),
                                dnigst : txtDiffIGST.getValue(),
                                dncess : txtDiffCess.getValue(),
                                dntcs  : txtDiffTCS.getValue(),
                                
                                dncgstp : 0, // dncgstper,
                                dnsgstp : 0, //dnsgstper,
                                dnigstp : 0, //dnigstper,
                                purledcode : 0, //purledgercode,
                                dncgstcode : 0, //cgstledgercode,
                                dnsgstcode : 0, //sgstledgercode,
                                dnigstcode : 0, //igstledgercode,
                                creditdays : 0,
                                invseqno   :cmbInvNo.getValue(),
  
				},
                              callback: function(options, success, response)
                              {

                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("RAWMATERIAL GRN Updated - " + obj['vno']);

                                    TrnRMPayableUpdationPanel.getForm().reset();
                                   
			            flxAccounts.getStore().removeAll();
			            flxAccountsDNote.getStore().removeAll();

                                    RefreshData();
                                  }else
	         { Ext.MessageBox.alert("Updation Error- " + obj['vno']);                                                  
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
                    TrnRMPayableUpdationPanel.getForm().reset();
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
                    TrnRMPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 745,
                 height      : 500,
                 x           : 10,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 height      : 50,
				 x           : 10,
				 y           : 0,
				 border      : true,
				 layout      : 'absolute',
				 items:[
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 70,
				          width       : 200,
				          x           : 0,
				          y           :-5,
				          border      : false,
				          items: [txtVouNo]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 200,
				          x           : 200,
				          y           : -5,
				          border      : false,
				          items: [dtVouNo]
				       },
				     ],
				}, flxGRN,



                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 55,
                          border      : false,
                          items: [cmbPartyName]
                       },




                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 390,
                          x           : 0,
                          y           :105,
                          border      : false,
                          items: [cmbInvNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 300,
                          x           : 0,
                          y           : 155,
                          border      : false,
                          items: [dtInvNo]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 205,
                          border      : false,
                          items: [txtBillAmt]
                       },
  
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 80,
                          width       : 210,
                          x           : 250,
                          y           : 205,
                          border      : false,
                          items: [txtBillQty]
                       },
                 

       {  xtype       : 'fieldset',
                 title       : '',
                 width       : 720,
                 height      : 180,
                 x           : 0,
                 y           : 250,
                 border      : true,
                 layout      : 'absolute',
                 items:[

 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 100,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 190,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 280,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 355,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 450,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 530,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCess]

                        },

		   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 620,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTCS]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 30,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty]

                        },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 170,
                         labelWidth  : 70, 
		         x           : 10,
		         y           : 30,
		         border      : false,
		         items:[txtPartyWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 100,
                         labelWidth  : 1, 
		         x           : 170,
		         y           : 30,
		         border      : false,
		         items:[txtPartyValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 260,
		         y           : 30,
		         border      : false,
		         items:[txtPartyCGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 340,
		         y           : 30,
		         border      : false,
		         items:[txtPartySGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 425,
		         y           : 30,
		         border      : false,
		         items:[txtPartyIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 510,
		         y           : 30,
		         border      : false,
		         items:[txtPartyCess],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 600,
		         y           : 30,
		         border      : false,
		         items:[txtPartyTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 60,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMILL]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 170,
                         labelWidth  : 70, 
		         x           : 10,
		         y           : 60,
		         border      : false,
		         items:[txtMILLWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 100,
                         labelWidth  : 1, 
		         x           : 170,
		         y           : 60,
		         border      : false,
		         items:[txtMILLValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 260,
		         y           : 60,
		         border      : false,
		         items:[txtMILLCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 340,
		         y           : 60,
		         border      : false,
		         items:[txtMILLSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 425,
		         y           : 60,
		         border      : false,
		         items:[txtMILLIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 510,
		         y           : 60,
		         border      : false,
		         items:[txtMILLCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 600,
		         y           : 60,
		         border      : false,
		         items:[txtMILLTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 90,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblGRN]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 170,
                         labelWidth  : 70, 
		         x           : 10,
		         y           : 90,
		         border      : false,
		         items:[txtGRNWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 100,
                         labelWidth  : 1, 
		         x           : 170,
		         y           : 90,
		         border      : false,
		         items:[txtGRNValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 260,
		         y           : 90,
		         border      : false,
		         items:[txtGRNCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 340,
		         y           : 60,
		         border      : false,
		         items:[txtGRNSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 425,
		         y           : 90,
		         border      : false,
		         items:[txtGRNIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 510,
		         y           : 90,
		         border      : false,
		         items:[txtGRNCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 600,
		         y           : 90,
		         border      : false,
		         items:[txtGRNTCS],
		     },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiff]

                        },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 180,
                         labelWidth  : 80, 
		         x           : 0,
		         y           : 120,
		         border      : false,
		         items:[txtFreight],
		     },
                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 170,
                         labelWidth  : 70, 
		         x           : 10,
		         y           : 120,
		         border      : false,
		         items:[txtDiffWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 100,
                         labelWidth  : 1, 
		         x           : 170,
		         y           : 120,
		         border      : false,
		         items:[txtDiffValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 260,
		         y           : 120,
		         border      : false,
		         items:[txtDiffCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 340,
		         y           : 120,
		         border      : false,
		         items:[txtDiffSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 425,
		         y           : 120,
		         border      : false,
		         items:[txtDiffIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 510,
		         y           : 120,
		         border      : false,
		         items:[txtDiffCess],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 95,
                         labelWidth  : 1, 
		         x           : 600,
		         y           : 120,
		         border      : false,
		         items:[txtDiffTCS],
		     },

                 ]
              },   

  
                      ],

              }  ,

       

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 565,
                 height      : 500,
                 x           : 760,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 400,
                            labelWidth  : 200,
                            x           : 0,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblpurchase]

                        },

	
	           flxAccounts,
                  
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 170,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 170,
		         border      : false,
		         items:[txttotCredit],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
                         labelWidth  : 70,
		         width       : 600,
		         x           : 5,
		         y           : 200,
		         border      : false,
		         items:[txtPurchaseRemarks],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 600,
		         x           : 0,
		         y           : 220,
		         border      : false,
		         items:[btnSubmit],
                       },
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            labelWidth  : 200,
                            x           : 0,
                            y           : 245,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbldebitnote]

                        },
			flxAccountsDNote,

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 410,
		         border      : false,
		         items:[txttotDebitDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 410,
		         border      : false,
		         items:[txttotCreditDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
                         labelWidth  : 70,
		         width       : 600,
		         x           : 5,
		         y           : 440,
		         border      : false,
		         items:[txtDNoteRemarks],
                       },


                ]
             }    
 
            ], 
 


});
 	


    function RefreshData() {
                  VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PIW'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PIW"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadWPLgrnno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      
 }



    var TrnRMPayableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'WASTE PAPER IMPORT- Accounting Screen',
        items       : TrnRMPayableUpdationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFFE0"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

onEsc:function(){
},
	listeners:{
             show:function(){
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadWPLgrnno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      	        LoadGSTDataStore.removeAll();
           	LoadGSTDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadgstledger"
		     // gstper : gst 
                   },
		   callback:function()
	          {
                  } 
           	});  			

      	        LoadLedgerDataStore.removeAll();
           	LoadLedgerDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadledgers"
                   },
		   callback:function()
	          {
                  } 
           	}); 
                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PIW'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PIW"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
  
             }    
          } 
    });
       TrnRMPayableUpdationWindow.show();  
});
