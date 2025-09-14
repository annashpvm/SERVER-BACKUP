Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var partyledcode = 0;
   var partycode = 0;
   var purledgername = 0;
   var purledgername = 0;
   var cgstledgercode = 0;
   var cgstledgername = 0;
   var sgstledgercode =0;
   var sgstledgername = 0;
   var igstledgercode = 0;
   var igstledgername = 0;

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
    fieldLabel  : 'PARTY',
    id          : 'lblParty',
    width       : 60
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN',
    id          : 'lblGRN',
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

   var txtPartyCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCGST',
        name        : 'txtPartyCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartySGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartySGST',
        name        : 'txtPartySGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtPartyIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyIGST',
        name        : 'txtPartyIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
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
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',

        value: new Date()
   });

   var txtSupplier = new Ext.form.NumberField({
        fieldLabel  : 'Supplier Name.',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  360,
	readOnly : true,
        tabindex : 2
   });


   var txtInvNo = new Ext.form.NumberField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  165,
	readOnly : true,
        tabindex : 2
   });


   var txtBillAmt = new Ext.form.NumberField({
        fieldLabel  : 'Bill Amount',
        id          : 'txtBillAmt',
        name        : 'txtBillAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2
   });

   var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty(t)',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  90,
	readOnly : true,
        tabindex : 2
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
        width       :  500,
	readOnly : true,
        tabindex : 2
   });

   var txtDNoteRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtDNoteRemarks',
        name        : 'txtDNoteRemarks',
        width       :  500,
	readOnly : true,
        tabindex : 2
   });

   var dtInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtInvNo',
        name: 'Date',
        format: 'd-m-Y',

        value: new Date()
   });

   var dtGRNNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtGRNNo',
        name: 'Date',

        format: 'd-m-Y',

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







var loadGRNdetailsStore2 = new Ext.data.Store({
      id: 'loadGRNdetailsStore2',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewFuelGrnDetails"}, // this parameter asks for listing
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
'led_name','sup_refname','sup_led_code','sup_taxcode'

      ]),
    });


var loadGRNdetailsStore = new Ext.data.Store({
      id: 'loadGRNdetailsStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewFuelGrnDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_grnno', 'rech_grndate', 'rech_ledtype', 'rech_ledcode', 'rech_amount', 'rech_dn_amt', 'rech_dn_cgst', 'rech_dn_sgst', 'rech_dn_igst', 'rech_tcs_amt', 'rech_cess_amt', 'rech_partybillno', 'rech_partybilldate','rech_partybillamt', 'rech_partyqty', 'rech_truck', 'rech_grnqty', 'led_code','led_name'

      ]),
    });

var LoadGRNDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_grnno'
      ]),
    });

var cmbGRNNo = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No. ',
        width           : 100,
        displayField    : 'rech_grnno', 
        valueField      : 'rech_grnno',
        hiddenName      : '',
        id              : 'cmbGRNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadGRNDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){
                   loadGRNdetailsStore.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewFuelGrnDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    grnno:cmbGRNNo.getValue()
                                },
                           	callback:function()
				{

                                    dtGRNNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('rech_date'),"d-m-Y"));
                                    txtSupplier.setRawValue(loadGRNdetailsStore.getAt(0).get('sup_refname'));

                                    txtInvNo.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_billno'));
                                    dtInvNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('rech_billdate'),"d-m-Y"));
                                    txtPartyValue.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_billvalue'));
				    txtBillAmt.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_billvalue'));
                                    partyledcode = loadGRNdetailsStore.getAt(0).get('sup_led_code');
                                    partycode = loadGRNdetailsStore.getAt(0).get('rech_sup_code');


				    txtGRNCGST.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_cgst_amt')); 
				    txtGRNSGST.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_sgst_amt')); 
				    txtGRNIGST.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_igst_amt')); 
                                    txtGRNTCS.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_tcs_amt')); 
                                    txtGRNCess.setRawValue(loadGRNdetailsStore.getAt(0).get('rech_servicecharge')); 
		                    txtGRNValue.setRawValue(Ext.util.Format.number(loadGRNdetailsStore.getAt(0).get('rech_totalamount'),"0.00")); 
                                    var cnt=loadGRNdetailsStore.getCount();

//                                    var purledgername = loadGRNdetailsStore.getAt(0).get('led_name');
//                                    var purledgercode = loadGRNdetailsStore.getAt(0).get('itmh_ledcode');


                                    var billqty =0;
                                    var millqty =0;
                                    var grnqty =0;
                                    var billvalue =0;
                                    var millvalue =0;
                                    var billcgst =0;
                                    var billsgst =0;
                                    var billigst =0;
                                    var grnvalue =0;
			            for(var j=0; j<cnt; j++)
                                    {

                                           billqty   = billqty + Number(loadGRNdetailsStore.getAt(j).get('rect_billqty')); 		            
                                           millqty   = millqty + Number(loadGRNdetailsStore.getAt(j).get('rect_millqty')); 		            
                                           grnqty    = grnqty + Number(loadGRNdetailsStore.getAt(j).get('rect_grnqty')); 		            
                                           billvalue  = billvalue + (Number(loadGRNdetailsStore.getAt(j).get('rect_billqty')) * Number(loadGRNdetailsStore.getAt(j).get('rect_itemrate')) ); 		            
                                           millvalue  = millvalue + (Number(loadGRNdetailsStore.getAt(j).get('rect_millqty')) * Number(loadGRNdetailsStore.getAt(j).get('rect_itemrate')) ); 		            
                                           grnvalue  = grnvalue + (Number(loadGRNdetailsStore.getAt(j).get('rect_grnqty')) * Number(loadGRNdetailsStore.getAt(j).get('rect_itemrate')) ); 		            
 
                                    }

                                   var billcgst = Math.round(billvalue * Number(loadGRNdetailsStore.getAt(0).get('rech_cgst_per'))/100,0);
                                   var billsgst = Math.round(billvalue * Number(loadGRNdetailsStore.getAt(0).get('rech_sgst_per'))/100,0);
                                   var billigst = Math.round(billvalue * Number(loadGRNdetailsStore.getAt(0).get('rech_igst_per'))/100,0);
                                   var billtcs  = Math.round((billvalue+billcgst+billsgst+billigst) * Number(loadGRNdetailsStore.getAt(0).get('rech_tcs_per'))/100,0);
                                   var billcess = Math.round((billvalue+billcgst+billsgst+billigst) * Number(loadGRNdetailsStore.getAt(0).get('rech_servicecharge'))/100,0);

			   	   
                                    txtBillQty.setValue(Ext.util.Format.number(billqty,"0.000")); 

                                    txtPartyWt.setRawValue(Ext.util.Format.number(billqty,"0.000")); 
                                    txtPartyCGST.setRawValue(Ext.util.Format.number(billcgst,"0.00"));  
                                    txtPartySGST.setRawValue(Ext.util.Format.number(billsgst,"0.00"));  
                                    txtPartyIGST.setRawValue(Ext.util.Format.number(billigst,"0.00"));  
                                    txtPartyTCS.setRawValue(Ext.util.Format.number(billtcs,"0.00")); 
                                    txtPartyCess.setRawValue(Ext.util.Format.number(billcess,"0.00")); 


                                    txtGRNWt.setRawValue(Ext.util.Format.number(grnqty,"0.000")); 
                                    txtDiffWt.setRawValue(Ext.util.Format.number(billqty-grnqty,"0.000"));
                                    txtDiffValue.setRawValue(Ext.util.Format.number(txtBillAmt.getValue()-txtGRNValue.getValue(),"0.00"));
				    txtDiffCGST.setRawValue(Ext.util.Format.number(billcgst-txtGRNCGST.getValue(),"0.00"));
				    txtDiffSGST.setRawValue(Ext.util.Format.number(billsgst-txtGRNSGST.getValue(),"0.00"));
				    txtDiffIGST.setRawValue(Ext.util.Format.number(billigst-txtGRNIGST.getValue(),"0.00"));
				    txtDiffCess.setRawValue(Ext.util.Format.number(billcess-txtGRNCess.getValue(),"0.00"));
				    txtDiffTCS.setRawValue(Ext.util.Format.number(billtcs-txtGRNTCS.getValue(),"0.00"));

                                LoadGSTDataStore.removeAll();
                                LoadGSTDataStore.load({
					url: 'clsPayableUpdation.php',
					params: {
					    task: 'loadWPL_Ledgers',
					    custcode: loadGRNdetailsStore.getAt(0).get('rech_sup_code'),
		                        },
		                   	callback:function()
					{
                                             purledgercode = LoadGSTDataStore.getAt(0).get('purledcode');
                                             purledgername = LoadGSTDataStore.getAt(0).get('purledname');
                                             cgstledgercode = LoadGSTDataStore.getAt(0).get('tax_cgst_ledcode');    
                                             cgstledgername = LoadGSTDataStore.getAt(0).get('cgstledname');
                                             sgstledgercode = LoadGSTDataStore.getAt(0).get('tax_sgst_ledcode');    
                                             sgstledgername = LoadGSTDataStore.getAt(0).get('sgstledname');
                                             igstledgercode = LoadGSTDataStore.getAt(0).get('tax_igst_ledcode');    
                                             igstledgername = LoadGSTDataStore.getAt(0).get('igstledname');
					     flxaccupdation(); 
                                        }
                                });

                                },



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
	      ledname   : txtSupplier.getRawValue(),
	      debit     : "0",
              credit    : txtPartyValue.getRawValue(),
              }) 
        );
//Purchase Account - Debit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : purledgercode,
	      ledname   : purledgername,
	      debit     : txtPartyValue.getRawValue()-txtPartyCGST.getRawValue()-txtPartySGST.getRawValue()-txtPartyIGST.getRawValue()-txtPartyCess.getRawValue()-txtPartyTCS.getRawValue(),
              credit    : 0,
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
		      ledcode   : '199',
		      ledname   : 'TDS ON WASTE PAPER',
		      debit     : txtPartyTCS.getRawValue(),
		      credit    : 0,
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
		      ledcode   : '199',
		      ledname   : 'TDS ON WASTE PAPER',
		      debit     : "0",
		      credit    : txtDiffTCS.getRawValue(),
		      }) 
		);
         }

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


var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 150,
    hidden:false,
    width: 630,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'left'},
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
    y:270,
    height: 150,
    hidden:false,
    width: 630,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});



/*
var TrnPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnPayableUpdationPanel',
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
                    if (txtInvNo.getRawValue()==0 || txtInvNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Invoice no connot be Empty.....');
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

                           
//                          var invData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(invData, function (record) {
                                poupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnSalesInvoieSave.php',

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
				invhsgstamt     :txtGRNSGSTAmt.getRawValue(),
				invhcgstper     :txtCgstPer.getRawValue(),
				invhcgstamt     :txtGRNCGSTAmt.getRawValue(),
				invhigstper     :txtIgstPer.getRawValue(),
				invhigstamt     :txtGRNIGSTAmt.getRawValue(),
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
                                    TrnPayableUpdationPanel.getForm().reset();

 //                              flxDetail.getStore().removeAll();
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
                    TrnPayableUpdationPanel.getForm().reset();
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
                    TrnPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 625,
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
				},



                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 45,
                          border      : false,
                          items: [cmbGRNNo]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 200,
                          x           : 280,
                          y           : 45,
                          border      : false,
                          items: [dtGRNNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 75,
                          border      : false,
                          items: [txtSupplier]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 290,
                          x           : 0,
                          y           :105,
                          border      : false,
                          items: [txtInvNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 300,
                          x           : 280,
                          y           : 105,
                          border      : false,
                          items: [dtInvNo]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 135,
                          border      : false,
                          items: [txtBillAmt]
                       },
  
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 180,
                          x           : 280,
                          y           : 135,
                          border      : false,
                          items: [txtBillQty]
                       },

       {  xtype       : 'fieldset',
                 title       : '',
                 width       : 600,
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
                            x           : 85,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 155,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 300,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 355,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 420,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCess]

                        },

		   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 495,
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
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 30,
		         border      : false,
		         items:[txtPartyWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 30,
		         border      : false,
		         items:[txtPartyValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 30,
		         border      : false,
		         items:[txtPartyCGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 30,
		         border      : false,
		         items:[txtPartySGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 30,
		         border      : false,
		         items:[txtPartyIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 30,
		         border      : false,
		         items:[txtPartyCess],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
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
                            items: [lblGRN]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 60,
		         border      : false,
		         items:[txtGRNWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 60,
		         border      : false,
		         items:[txtGRNValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 60,
		         border      : false,
		         items:[txtGRNCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 60,
		         border      : false,
		         items:[txtGRNSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 60,
		         border      : false,
		         items:[txtGRNIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 60,
		         border      : false,
		         items:[txtGRNCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 60,
		         border      : false,
		         items:[txtGRNTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 90,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiff]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 90,
		         border      : false,
		         items:[txtDiffWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 90,
		         border      : false,
		         items:[txtDiffValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 90,
		         border      : false,
		         items:[txtDiffCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 90,
		         border      : false,
		         items:[txtDiffSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 90,
		         border      : false,
		         items:[txtDiffIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 90,
		         border      : false,
		         items:[txtDiffCess],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 90,
		         border      : false,
		         items:[txtDiffTCS],
		     },

                 ]
              },   

  
                      ],

              }  ,

       

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 670,
                 height      : 500,
                 x           : 640,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            x           : 0,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblpurchase]

                        },

	
	           flxAccounts,
                  
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 190,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 190,
		         border      : false,
		         items:[txttotCredit],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 100,
		         y           : 220,
		         border      : false,
		         items:[txtPurchaseRemarks],
                       },

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            x           : 0,
                            y           : 205,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbldebitnote]

                        },
			flxAccountsDNote,

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 430,
		         border      : false,
		         items:[txttotDebitDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 430,
		         border      : false,
		         items:[txttotCreditDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 100,
		         y           : 450,
		         border      : false,
		         items:[txtDNoteRemarks],
                       },


                ]
             }    
 
            ], 
 


});
 	
*/

var TrnFuelPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnFuelPayableUpdationPanel',
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

                            Ext.Ajax.request({
                            url: 'TrnSalesInvoieSave.php',

                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: invData.length  ,
                                savetype:gstFlag,
                                invh_description  :'Sales', 
  
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
                                    TrnFuelPayableUpdationPanel.getForm().reset();

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
                    TrnFuelPayableUpdationPanel.getForm().reset();
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
                    TrnStoresPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 500,
                 height      : 60,
                 x           : 350,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 0,
                          border      : false,
                          items: [cmbGRNNo]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 200,
                          x           : 250,
                          y           : 0,
                          border      : false,
                          items: [dtGRNNo]
                       },
                 ]
              },       

	      {
		    xtype: 'tabpanel',
		    activeTab: 0,
		    height: 450,
		    width: 1315,
		    x: 10,
		    y: 72,
		    items: [
			    {
				xtype: 'panel',
				title: 'PURCHAE DETAILS',
				width: 200,
				height: 200,
				layout: 'absolute',
				items: [

			        ]
		           },
			    {
				xtype: 'panel',
				title: 'ACCOUNTS DETAILS',
				width: 200,
				height: 200,
				layout: 'absolute',
				items: [ ]
		           },
                      ]
               } 

          ]
});


    function RefreshData() {
    }



    var TrnPayableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'FUEL - Accounting Screen',
        items       : TrnFuelPayableUpdationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFFE0"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
             show:function(){
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadFuelgrnno',
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
  
             }    
          } 
    });
       TrnPayableUpdationWindow.show();  
});
