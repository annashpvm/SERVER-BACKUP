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
   var handlingparty = 0;
   var frightparty = 0;
   var unloadingparty = 0;

   var hcgst = 0; // handling cgst
   var hsgst =0; // handling sgst
   var itemname = "";


    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "loadlastvouno"}, // this parameter asks for listing
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




var lblParty1 = new Ext.form.Label({
    fieldLabel  : 'PARTY',
    id          : 'lblParty1',
    labelStyle : "font-size:12px;font-weight:bold;",
    width       : 60
});

var lblBillNo1 = new Ext.form.Label({
    fieldLabel  : 'Bill No',
    id          : 'lblBillNo1',
    labelStyle : "font-size:12px;font-weight:bold;",
    width       : 60
});

var lblBilldt = new Ext.form.Label({
    fieldLabel  : 'Bill Date',
    id          : 'lblBilldt',
    labelStyle : "font-size:12px;font-weight:bold;",
    width       : 60
});

var lblBillAmt1 = new Ext.form.Label({
    fieldLabel  : 'Amount',
    id          : 'lblBillAmt',
    labelStyle : "font-size:12px;font-weight:bold;",
    width       : 60
});

var lblLoading = new Ext.form.Label({
    fieldLabel  : 'loading',
    id          : 'lblLoading',
    width       : 60
});

var lblFreight = new Ext.form.Label({
    fieldLabel  : 'Freight',
    id          : 'lblFreight',
    width       : 60
});


var lblUnloading = new Ext.form.Label({
    fieldLabel  : 'Unloading',
    id          : 'lblUnloading',
    width       : 60
});


   var txtLoadingParty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtLoadingParty',
        name        : 'txtLoadingParty',
        width       :  195,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtFreightParty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFreightParty',
        name        : 'txtFreightParty',
        width       :  195,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtUnloadigParty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtUnloadigParty',
        name        : 'txtUnloadigParty',
        width       :  195,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtLoadingAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtLoadingAmount',
        name        : 'txtLoadingAmount',
        width       :  80,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtFreightAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFreightAmount',
        name        : 'txtFreightAmount',
        width       :  80,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtUnloadigAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtUnloadigAmount',
        name        : 'txtUnloadigAmount',
        width       :  80,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtLoadingBill = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtLoadingBill',
        name        : 'txtLoadingBill',
        width       :  80,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                flxaccupdation(); 
           }
        }
   });

   var txtFreightBill = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFreightBill',
        name        : 'txtFreightBill',
        width       :  80,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                
                
                lxaccupdation(); 
           }
        }      
   });


   var txtUnloadigBill = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtUnloadigBill',
        name        : 'txtUnloadigBill',
        width       :  80,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                flxaccupdation(); 
           }
        }       
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
        tabindex   : 2,
   });


   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',

        value:  new Date()
   });

   var txtSupplier = new Ext.form.NumberField({
        fieldLabel  : 'Supplier Name.',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  360,
	readOnly : true,
        tabindex : 2
   });


   var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  165,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                flxaccupdation(); 
           }
        }
   });


   var txtBillAmt = new Ext.form.NumberField({
        fieldLabel  : 'Bill Amount',
        id          : 'txtBillAmt',
        name        : 'txtBillAmt',
        width       :  120,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                txtPartyValue.setValue(txtBillAmt.getValue());
            if (Number(txtBillAmt.getValue()) >  Number(txtGRNValue.getValue()))
            {
                txtDiffValue.setValue(Ext.util.Format.number(txtBillAmt.getValue()-txtGRNValue.getValue(),"0.00"));
            }
            else
            {
                txtDiffValue.setValue('');
            }                
                flxaccupdation(); 
           },
        }
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
        width       :  475,
        tabindex : 2
   });

   var txtDNoteRemarks = new Ext.form.TextField({
        fieldLabel  : 'ReMarks',
        id          : 'txtDNoteRemarks',
        name        : 'txtDNoteRemarks',
        width       :  500,
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


   var dtLoadingBill= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtLoadingBill',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        enableKeyEvents: true,
        listeners:{
           select:function(){
                flxaccupdation(); 
           }
        }
   });

   var dtFreightBill= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtFreightBill',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        enableKeyEvents: true,
        listeners:{
           select:function(){
                flxaccupdation(); 
           }
        }
   });

   var dtUnloadingBill= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtUnloadingBill',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        enableKeyEvents: true,
        listeners:{
           select:function(){
                flxaccupdation(); 
           }

        }
   });


   var txtHandlingAmount = new Ext.form.NumberField({
        fieldLabel  : 'Handling',
        id          : 'txtHandlingAmount',
        name        : 'txtHandlingAmount',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingcgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.CGST%',
        id          : 'txtHandlingcgstper',
        name        : 'txtHandlingcgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingsgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.SGST%',
        id          : 'txtHandlingsgstper',
        name        : 'txtHandlingsgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });






var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Remarks",
    width   : 60,
    height  : 20,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){     
            txtPurchaseRemarks.setRawValue("RECEIPT OF " + itemname+ " - BILL NO." + txtInvNo.getRawValue() + " Dt. " + Ext.util.Format.date(dtInvNo.getValue(),"d-m-Y")+ " P.QTY " + txtPartyWt.getValue() + " MT OUR GRN NO. " + cmbGRNNo.getRawValue()  + " G.QTY " + txtGRNWt.getValue() + " MT");
	if (txttotDebitDNote.getValue() > 0)
	{  
            txtDNoteRemarks.setRawValue("DEBITED TO YOUR ACCOUNT - EX.MOIS / QTY SHORTAGE AGAINST YOUR B.No." + txtInvNo.getRawValue() + " Dt. " +  Ext.util.Format.date	(dtInvNo.getValue(),"d-m-Y") + " - OUR GRN NO. " +  cmbGRNNo.getRawValue());  
        }
        }
    }
});  

function grid_tot(){
        var dr = 0;
        var cr = 0;
      
//alert("Total Checking");   
         txttotDebit.setRawValue(0);
         txttotCredit.setRawValue(0);
         txttotDebitDNote.setRawValue(0);
         txttotCreditDNote.setRawValue(0);


	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
//alert(sel[i].data.debit);
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 

         txttotDebit.setValue(Ext.util.Format.number(Math.round(dr*100/100),'0.00'));
         txttotCredit.setValue(Ext.util.Format.number(Math.round(cr*100/100),'0.00'));
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
            baseParams:{task:"ViewFuelGrnDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'rech_ledtype', 'rech_ledcode', 'led_name', 'amount'

      ]),
    });


var loadGRNdetailsAllStore = new Ext.data.Store({
      id: 'loadGRNdetailsAllStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewFuelGrnAllDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'rech_sup_code', 'rech_agent_code', 'rech_date','rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 
'rech_cgst_per','rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_servicecharge', 'rech_handling_cgstper',
'rech_handling_sgstper', 'rech_freight', 'rech_othcharges', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode',
'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno',
'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_royality', 'rech_royality_amt', 'rech_dmft', 'rech_dmft_amt',
'rech_nmet', 'rech_nmet_amt','rect_item_code','rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper',
'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_rateded', 'rect_partyitemcode',
'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_billdate', 'rect_frtadvvouno',
'rect_frtadvamt', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount', 'rect_unloadparty', 'itmh_code', 'itmh_name',  'itmh_ledcode', 'itmh_cstledcode',
'itmh_impledcode', 'itmh_hsncode', 'itmh_cgstper', 'itmh_sgstper', 'itmh_igstper', 'itmh_sgstledcode', 'itmh_cgstledcode', 'itmh_igstledcode', 
'sup_code', 'sup_refname','sup_agentcode','sup_led_code','purledname', 'purledcode', 'cgstledname', 'tax_cgst_ledcode', 'sgstledname', 'tax_sgst_ledcode', 'igstledname','tax_igst_ledcode'


      ]),
    });



var LoadGRNDataStore = new Ext.data.Store({
      id: 'LoadGRNDataStore',
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

                   refresh();    
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
				    var cnt=loadGRNdetailsStore.getCount();
				    for(var j=0; j<cnt; j++)
				    {
                                        if (loadGRNdetailsStore.getAt(j).get('rech_ledtype') == "P")
                                        {

                                            txtSupplier.setRawValue(loadGRNdetailsStore.getAt(j).get('led_name'));
                                            txtGRNAmt.setValue(loadGRNdetailsStore.getAt(j).get('amount'));

                                        }
                                        else if (loadGRNdetailsStore.getAt(j).get('rech_ledtype') == "H")

			                {
                                            txtLoadingParty.setRawValue(loadGRNdetailsStore.getAt(j).get('led_name'));
                                            txtLoadingAmount.setValue(loadGRNdetailsStore.getAt(j).get('amount'));
					    handlingparty = loadGRNdetailsStore.getAt(j).get('rech_ledcode');
                                        }
                                        else if (loadGRNdetailsStore.getAt(j).get('rech_ledtype') == "F")

			                {
                                            txtFreightParty.setRawValue(loadGRNdetailsStore.getAt(j).get('led_name'));
                                            txtFreightAmount.setValue(loadGRNdetailsStore.getAt(j).get('amount'));
                                            frightparty = loadGRNdetailsStore.getAt(j).get('rech_ledcode');
                                        }
                                        else if (loadGRNdetailsStore.getAt(j).get('rech_ledtype') == "U")

			                {
                                            txtUnloadigParty.setValue(loadGRNdetailsStore.getAt(j).get('led_name'));
                                            txtUnloadigAmount.setValue(loadGRNdetailsStore.getAt(j).get('amount'));
                                            unloadingparty = loadGRNdetailsStore.getAt(j).get('rech_ledcode');
                                        }


                                    }

              
 
                                }
                    });  

                   loadGRNdetailsAllStore.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewFuelGrnAllDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    grnno:cmbGRNNo.getValue()
                                },
                           	callback:function()
				{
                                    dtGRNNo.setRawValue(Ext.util.Format.date(loadGRNdetailsAllStore.getAt(0).get('rech_date'),"d-m-Y"));
//                                    txtInvNo.setRawValue(loadGRNdetailsAllStore.getAt(0).get('rech_billno'));
                                    dtInvNo.setRawValue(Ext.util.Format.date(loadGRNdetailsAllStore.getAt(0).get('rech_billdate'),"d-m-Y"));

				    txtBillAmt.setRawValue(loadGRNdetailsAllStore.getAt(0).get('rech_billvalue'));
			            txtPartyValue.setRawValue(loadGRNdetailsAllStore.getAt(0).get('rech_billvalue'));
                                    partyledcode = loadGRNdetailsAllStore.getAt(0).get('sup_led_code');
                                    partycode = loadGRNdetailsAllStore.getAt(0).get('rech_sup_code');
                                    itemname  = loadGRNdetailsAllStore.getAt(0).get('itmh_name');

				    txtGRNCGST.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_cgst_amt')); 
				    txtGRNSGST.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_sgst_amt')); 
				    txtGRNIGST.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_igst_amt')); 
                                    txtGRNTCS.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_tcs_amt')); 
                                    txtGRNCess.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_cess_amount')); 
		                    txtGRNValue.setValue(Ext.util.Format.number(loadGRNdetailsAllStore.getAt(0).get('rech_totalamount'),"0.00")); 
                                    var cnt=loadGRNdetailsAllStore.getCount();


                                    purledgercode = loadGRNdetailsAllStore.getAt(0).get('purledcode');
                                    purledgername = loadGRNdetailsAllStore.getAt(0).get('purledname');
                                    cgstledgercode = loadGRNdetailsAllStore.getAt(0).get('tax_cgst_ledcode');    
                                    cgstledgername = loadGRNdetailsAllStore.getAt(0).get('cgstledname');
                                    sgstledgercode = loadGRNdetailsAllStore.getAt(0).get('tax_sgst_ledcode');    
                                    sgstledgername = loadGRNdetailsAllStore.getAt(0).get('sgstledname');
                                    igstledgercode = loadGRNdetailsAllStore.getAt(0).get('tax_igst_ledcode');    
                                    igstledgername = loadGRNdetailsAllStore.getAt(0).get('igstledname');


				   txtHandlingAmount.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_servicecharge'));
				   txtHandlingcgstper.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_handling_cgstper'));
				   txtHandlingsgstper.setValue(loadGRNdetailsAllStore.getAt(0).get('rech_handling_sgstper'));


                                    var billqty =0;
                                    var millqty =0;
                                    var grnqty =0;
                                    var billvalue =0;
                                    var millvalue =0;
                                    var billcgst =0;
                                    var billsgst =0;
                                    var billigst =0;
                                    var billtcs =0;
                                    var billcess =0;

                                    var grnvalue =0;
                                    var grncgst =0;
                                    var grnsgst =0;
                                    var grnigst =0;
                                    var grntcs =0;
                                    var grncess =0;

                                  
			            for(var j=0; j<cnt; j++)
                                    {
                                           if (j==0)
                                           {
                                              txtInvNo.setRawValue(loadGRNdetailsAllStore.getAt(0).get('rect_billno'));
                                           }
//                                           else
//                                           {
//                                              txtInvNo.setRawValue(txtInvNo.getRawValue()+","+loadGRNdetailsAllStore.getAt(0).get('rect_billno'));
//                                           }
    

                                           billqty   = billqty + Number(loadGRNdetailsAllStore.getAt(j).get('rect_billqty')); 		            
                                           millqty   = millqty + Number(loadGRNdetailsAllStore.getAt(j).get('rect_millqty')); 		            
                                           grnqty    = grnqty + Number(loadGRNdetailsAllStore.getAt(j).get('rect_grnqty')); 		            
                                           billvalue  = billvalue + (Number(loadGRNdetailsAllStore.getAt(j).get('rect_billqty')) * Number(loadGRNdetailsAllStore.getAt(j).get('rect_itemrate')) ); 		            
                                           millvalue  = millvalue + (Number(loadGRNdetailsAllStore.getAt(j).get('rect_millqty')) * Number(loadGRNdetailsAllStore.getAt(j).get('rect_itemrate')) ); 		            
                                           grnvalue  = grnvalue + (Number(loadGRNdetailsAllStore.getAt(j).get('rect_grnqty')) * Number(loadGRNdetailsAllStore.getAt(j).get('rect_itemrate')) ); 		            
 
                                    }

                                   billcgst = Math.round(billvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_cgst_per'))/100,0);
                                   billsgst = Math.round(billvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_sgst_per'))/100,0);
                                   billigst = Math.round(billvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_igst_per'))/100,0);
                                   billtcs  = Math.round((billvalue+billcgst+billsgst+billigst) * Number(loadGRNdetailsAllStore.getAt(0).get('rech_tcs_per'))/100,0);
                                   billcess = Math.round(billqty * Number(loadGRNdetailsAllStore.getAt(0).get('rech_cess_pmt')),0);

                                   grncgst = Math.round(grnvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_cgst_per'))/100,0);
                                   grnsgst = Math.round(grnvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_sgst_per'))/100,0);
                                   grnigst = Math.round(grnvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_igst_per'))/100,0);
                                   grntcs  = Math.round((grnvalue+grncgst+grnsgst+grnigst) * Number(loadGRNdetailsAllStore.getAt(0).get('rech_tcs_per'))/100,0);
                                   grncess = Math.round(grnvalue * Number(loadGRNdetailsAllStore.getAt(0).get('rech_cess_pmt')),0);

                 hcgst = Ext.util.Format.number(Math.round((txtHandlingAmount.getRawValue() * txtHandlingcgstper.getRawValue()/100)),"0.00");
                 hsgst = Ext.util.Format.number(Math.round((txtHandlingAmount.getRawValue() * txtHandlingsgstper.getRawValue()/100)),"0.00");



			   	   



                                    txtBillQty.setValue(Ext.util.Format.number(billqty,"0.000")); 

                                    txtPartyWt.setValue(Ext.util.Format.number(billqty,"0.000")); 
                                    txtPartyCGST.setValue(Ext.util.Format.number(billcgst,"0.00"));  
                                    txtPartySGST.setValue(Ext.util.Format.number(billsgst,"0.00"));  
                                    txtPartyIGST.setValue(Ext.util.Format.number(billigst,"0.00"));  
                                    txtPartyTCS.setValue(Ext.util.Format.number(billtcs,"0.00")); 
                                    txtPartyCess.setValue(Ext.util.Format.number(billcess,"0.00")); 

//alert(grnvalue);
//alert(grncgst);
//alert(grnsgst);
//alert(grnigst);
//alert(grntcs);
//alert(grncess);

                                    txtGRNWt.setValue(Ext.util.Format.number(grnqty,"0.000")); 

                                    txtDiffWt.setValue(Ext.util.Format.number(billqty-grnqty,"0.000"));

                                    if (Number(txtBillAmt.getValue()) >  Number(txtGRNValue.getValue()))
                                    {
                                        txtDiffValue.setValue(Ext.util.Format.number(txtBillAmt.getValue()-txtGRNValue.getValue(),"0.00"));
                                    }
                                    else
                                    {
                                        txtDiffValue.setValue('');
                                    }
                          
                                    if (txtDiffValue.getValue() > 0)
                                    { 
                  			    txtDiffCGST.setValue(Ext.util.Format.number(billcgst-txtGRNCGST.getValue(),"0.00"));
					    txtDiffSGST.setValue(Ext.util.Format.number(billsgst-txtGRNSGST.getValue(),"0.00"));
					    txtDiffIGST.setValue(Ext.util.Format.number(billigst-txtGRNIGST.getValue(),"0.00"));
					    txtDiffCess.setValue(Ext.util.Format.number(billcess-txtGRNCess.getValue(),"0.00"));
					    txtDiffTCS.setValue(Ext.util.Format.number(billtcs-txtGRNTCS.getValue(),"0.00"));
                                   }
                                   else
                    		   if (txtDiffWt.getValue() > 0)
                                    { 
                                            txtDiffValue.setValue(Ext.util.Format.number(txtBillAmt.getValue()-(grnvalue+grncgst+grnsgst+grnigst+grntcs+grncess),"0.00"));
					    txtDiffCGST.setValue(Ext.util.Format.number(billcgst-grncgst,"0.00"));
					    txtDiffSGST.setValue(Ext.util.Format.number(billsgst-grnsgst,"0.00"));
					    txtDiffIGST.setValue(Ext.util.Format.number(billigst-grnigst,"0.00"));
					    txtDiffCess.setValue(Ext.util.Format.number(billcess-grncess,"0.00"));
					    txtDiffTCS.setValue(Ext.util.Format.number(billtcs-grntcs,"0.00"));

	
                                   }

 
             		     flxaccupdation(); 
/*
                             grid_tot();   
				 var diff = 0;
				 diff =  txttotDebit.getValue()-txttotCredit.getValue(); 
				 var sel1 = flxAccounts.getSelectionModel().getSelections();           		
				 sel1[1].set('debit',sel1[1].get('debit')-diff);
				 diff =  txttotDebitDNote.getValue()-txttotCreditDNote.getValue(); 
				 var sel1 = flxAccountsDNote.getSelectionModel().getSelections();           		
				 sel1[1].set('Credit',sel1[1].get('Crdit')-diff);
*/

                                },



                   }); 


           }
        } 
});

function refresh(){
   flxAccounts.getStore().removeAll();
   flxAccountsDNote.getStore().removeAll();

   txtLoadingParty.setValue(''); 
   txtFreightParty.setValue('');
   txtUnloadigParty.setValue(''); 
   txtLoadingAmount.setValue('');
   txtFreightAmount.setValue('');
   txtUnloadigAmount.setValue('');
   txtLoadingBill.setValue('');
   txtFreightBill.setValue('');
   txtUnloadigBill.setValue('');
   txtPartyWt.setValue('');
   txtPartyValue.setValue('');
   txtPartyCGST.setValue('');
   txtPartySGST.setValue('');
   txtPartyIGST.setValue('');
   txtPartyCess.setValue('');
   txtPartyTCS.setValue('');
   txtDiffWt.setValue('');
   txtDiffValue.setValue('');
   txtDiffCGST.setValue('');
   txtDiffCGST.setValue('');
   txtDiffSGST.setValue('');
   txtDiffIGST.setValue('');
   txtDiffCess.setValue('');
   txtDiffTCS.setValue('');
   txtGRNWt.setValue('');
   txtGRNValue.setValue('');
   txtGRNCGST.setValue('');
   txtGRNSGST.setValue('');
   txtGRNCess.setValue('');
   txtGRNIGST.setValue('');
   txtGRNTCS.setValue('');
   txtPurchaseRemarks.setRawValue('');
   txtDNoteRemarks.setRawValue('');
   txtHandlingAmount.setValue() 
   txtHandlingcgstper.setValue()



}


function flxaccupdation(){

        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        var found = 0;
        
        flxAccountsDNote.getStore().removeAll();
        flxAccounts.getStore().removeAll();
 
//        flxAccountsDNote.getStore().sync();

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
              billno    : txtInvNo.getRawValue(),
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
	      ledcode   : purledgercode,
	      ledname   : purledgername,
	      debit     : Number(txtPartyValue.getRawValue())-Number(txtPartyCGST.getRawValue())-Number(txtPartySGST.getRawValue())-Number(txtPartyIGST.getRawValue())-Number(hcgst)-Number(hcgst)- Number(txtPartyCess.getRawValue()) - Number(txtUnloadigAmount.getValue()),
              credit    : 0,
              billno    : "",     
              ledtype   : "G",
              }) 
        );

//alert("Wait1");
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
                      billno    : "",     
                      ledtype   : "G",
   
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
                      billno    : "",     
                      ledtype   : "G",
 
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
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);
         }


//CESS Account - Debit

        if (txtPartyCess.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "121",
		      ledname   : "COAL / FUEL PURCHASE - CESS",
		      debit     : txtPartyCess.getValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
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
                      billno    : "",     
                      ledtype   : "G",

		      }) 
		);
         }

//UNLOADING PARTY Account - Debit

         if (txtUnloadigAmount.getValue() > 0 &&  unloadingparty  > 0 )
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '50',
		      ledname   : 'COAL / FUEL HANDLING CHARGES',
		      debit     : txtUnloadigAmount.getRawValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",

		      }) 
		);
         }

//LOADING PARTY - Account - Credit
        if (txtLoadingAmount.getValue() > 0 &&  handlingparty  > 0 )
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : handlingparty,
		      ledname   : txtLoadingParty.getRawValue(),
		      debit     : 0,
		      credit    : txtLoadingAmount.getRawValue(),
                      billno    : txtLoadingBill.getRawValue(),
                      billdt    : Ext.util.Format.date(dtLoadingBill.getValue(),"Y-m-d"),
                      ledtype   : "P",

		      }) 
		);


	flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        var Row= flxAccounts.getStore().getCount();

         for(var i=0;i<Row;i++){
                lcode  =  Number(sel[i].data.ledcode);
                amt    =  Number(sel[i].data.debit); 
 		if(Ext.util.Format.number(purledgercode,"0") === Ext.util.Format.number(lcode,"0")) 
                {
                    amt = amt + Number(txtLoadingAmount.getRawValue());
                    sel[i].set('debit',amt );			
		}
          }


         }



//FREIGHT PARTY - Account - Credit
        if (txtFreightAmount.getValue() > 0 &&  frightparty  > 0 )
        {

		 found = 0;  
		 for(var i=0;i<Row;i++){
		        lcode  =  Number(sel[i].data.ledcode);
		        amt    =  Number(sel[i].data.credit); 
	 		if(Ext.util.Format.number(frightparty,"0") === Ext.util.Format.number(lcode,"0")) 
		        {
		            amt = amt + Number(txtFreightAmount.getRawValue());
		            sel[i].set('credit',amt );			
		            found = 1;
			}
                 } 
                 if (found == 0) {
			var RowCnt1 = flxAccounts.getStore().getCount() + 1;
			flxAccounts.getStore().insert(
			  flxAccounts.getStore().getCount(),
			  new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : frightparty ,
			      ledname   : txtFreightParty.getRawValue(),
			      debit     : 0,
			      credit    : txtFreightAmount.getRawValue(),
		              billno    : txtFreightBill.getRawValue(),
		              billdt    : Ext.util.Format.date(dtFreightBill.getValue(),"Y-m-d"),
		              ledtype   : "P",
			      }) 
			);
                 } 
//alert("Wait ");
		flxAccounts.getSelectionModel().selectAll();
		var sel=flxAccounts.getSelectionModel().getSelections();
		var Row= flxAccounts.getStore().getCount();

		 for(var i=0;i<Row;i++){
			lcode  =  Number(sel[i].data.ledcode);
			amt    =  Number(sel[i].data.debit); 
	 		if(Ext.util.Format.number(purledgercode,"0") === Ext.util.Format.number(lcode,"0")) 
			{
			    amt = amt + Number(txtFreightAmount.getRawValue());
			    sel[i].set('debit',amt );			
			}
		  }

         }


//UNLOADING PARTY - Account - Credit
        if (txtUnloadigAmount.getValue() > 0 &&  unloadingparty  > 0 )
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : unloadingparty ,
		      ledname   : txtUnloadigParty.getRawValue(),
		      debit     : 0,
		      credit    : txtUnloadigAmount.getRawValue(),
                      billno    : txtUnloadigBill.getRawValue(),
                      billdt    : Ext.util.Format.date(dtUnloadingBill.getValue(),"Y-m-d"),
                      ledtype   : "P",
		      }) 
		);
     

	flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        var Row= flxAccounts.getStore().getCount();

         for(var i=0;i<Row;i++){
                lcode  =  Number(sel[i].data.ledcode);
                amt    =  Number(sel[i].data.debit); 
 		if(Ext.util.Format.number(purledgercode,"0") === Ext.util.Format.number(lcode,"0")) 
                {
                    amt = amt +   Number(txtUnloadigAmount.getRawValue());
                    sel[i].set('debit',amt );			
		}
          }

       }
       if (txtHandlingAmount.getRawValue() > 0  &&  txtHandlingcgstper.getRawValue() > 0)
         {

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '112',
		      ledname   : 'INPUT TAX CREDIT CGST 9%',
		      debit     :hcgst,
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '191',
		      ledname   : 'INPUT TAX CREDIT SGST 9%',
		      debit     :hsgst,
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
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
                      billno    : txtInvNo.getRawValue(),
                      billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                      ledtype   : "P",
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
		      credit    : txtDiffValue.getRawValue()-txtDiffCGST.getRawValue()-txtDiffSGST.getRawValue()-txtDiffIGST.getRawValue()-txtDiffCess.getRawValue()-txtDiffTCS.getRawValue()-txtDiffCess.getRawValue(),
                      billno    : "",     
                      ledtype   : "G",

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
                      billno    : "",     
                      ledtype   : "G",

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
                      billno    : "",     
                      ledtype   : "G",

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
                      billno    : "",     
                      ledtype   : "G",

		      }) 
		);
         }


//CESS Account - Differ

        if (txtDiffCess.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "121",
		      ledname   : "COAL / FUEL PURCHASE - CESS",
		      debit     : 0,
		      credit    : txtDiffCess.getValue(),
                      billno    : "",     
                      ledtype   : "G",
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
                      billno    : "",     
                      ledtype   : "G",

		      }) 
		);
         }

         grid_tot();
}
 

var dgrecord = Ext.data.Record.create([]);

var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:20,
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
    y:290,
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
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});




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

		    flxAccounts.getSelectionModel().selectAll();
		    var selrows = flxAccounts.getSelectionModel().getCount();
		    var sel1 = flxAccounts.getSelectionModel().getSelections();
		    for(var j=0;j<selrows;j++){
		        if ( sel1[j].data.ledtype == "P" && sel1[j].data.billno == "")
		        {    
                            Ext.Msg.alert('Updation','Party Bill Number connot be Empty.....');
                            gstSave="false";
		        }
		        if ( sel1[j].data.ledname == "-")
		        {    
                            Ext.Msg.alert('Updation','Ledger Name connot be Empty...Please check..');
                            gstSave="false";
		        }

		    }
                    if (cmbGRNNo.getRawValue()==0 || cmbGRNNo.getRawValue()=="")
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

                    /*else if (Number(txtLoadingAmount.getValue()) > 0 &&  txtLoadingBill.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Loading Bill Number......');
                        txtLoadingBill.focus();
                        gstSave="false";
                    }
                    else if (Number(txtFreightAmount.getValue()) > 0 &&  txtFreightBill.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Freight Bill Number......');
                        txtUnloadigBill.focus();
                        gstSave="false";
                    }
                    else if (Number(txtUnloadigAmount.getValue()) > 0 &&  txtUnloadigBill.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter UnLoading Bill Number......');
                        txtUnloadingBill.focus();
                        gstSave="false";
                    }*/
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

                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: accData.length  ,

				griddetdn: Ext.util.JSON.encode(poupdDatadn),     
			        cntdn: accDatadn.length  ,


//                                savetype:gstFlag,
                                paymode   :"FU",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,
                             	voutype   :"PF",
                              	voutypedn :"DN",

				vouno     :txtVouNo.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				grnno     :cmbGRNNo.getRawValue(),
				grndate   :Ext.util.Format.date(dtGRNNo.getValue(),"Y-m-d"),

				refno     : txtInvNo.getRawValue(),
				refdate   : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                                narration : txtPurchaseRemarks.getRawValue(),
                   		grnamount : txtGRNAmt.getValue(),
                                debitamount :txttotCreditDNote.getValue(),
  
				},
                              callback: function(options, success, response)
                              {

                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("FUEL GRN Updated - " + obj['vno']);

                                    TrnFuelPayableUpdationPanel.getForm().reset();
                                   
			            flxAccounts.getStore().removeAll();
			            flxAccountsDNote.getStore().removeAll();

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
                    TrnFuelPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 625,
                 height      : 520,
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
				          labelWidth  : 80,
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

		       {  xtype       : 'fieldset',
		          title       : 'PURCHASE DETAILS',
		          width       : 600,
		          height      : 110,
		          x           : 0,
		          y           : 90,
		          border      : true,
		          style      : "border-radius:10px;",     
		          layout      : 'absolute',
		          items:[
		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 100,
		                  width       : 500,
		                  x           : 0,
		                  y           : -10,
		                  border      : false,
		                  items: [txtSupplier]
		               },


		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 100,
		                  width       : 290,
		                  x           : 0,
		                  y           : 15,
		                  border      : false,
		                  items: [txtInvNo]
		               },


		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 60,
		                  width       : 300,
		                  x           : 280,
		                  y           : 15,
		                  border      : false,
		                  items: [dtInvNo]
		               },

		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 100,
		                  width       : 260,
		                  x           : 0,
		                  y           : 40,
		                  border      : false,
		                  items: [txtBillAmt]
		               },
	  
		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 60,
		                  width       : 180,
		                  x           : 280,
		                  y           : 40,
		                  border      : false,
		                  items: [txtBillQty]
		               },
		
                           ]
                       },
                 
	       {  xtype       : 'fieldset',
		          title       : 'OTHER DETAILS',
		          width       : 600,
		          height      : 170,
		          x           : 0,
		          y           : 200,
		          border      : true,
		          style      : "border-radius:10px;",     
		          layout      : 'absolute',
		          items:[ 


			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 80,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty1]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 280,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblBillNo1]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 380,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblBilldt]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 490,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblBillAmt1]
                        },


			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblLoading]
                        },

           		{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 40,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblFreight]
                        },
           		{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 70,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblUnloading]
                        },

		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 60,
		         y           : 10,
		         border      : false,
		         items:[txtLoadingParty],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 60,
		         y           : 40,
		         border      : false,
		         items:[txtFreightParty],
		     	},

		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 60,
		         y           : 70,
		         border      : false,
		         items:[txtUnloadigParty],
		     	},
		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 260,
		         y           : 10,
		         border      : false,
		         items:[txtLoadingBill],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 260,
		         y           : 40,
		         border      : false,
		         items:[txtFreightBill],
		     	},

		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 260,
		         y           : 70,
		         border      : false,
		         items:[txtUnloadigBill],
		     	},

		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 1,
		                  width       : 140,
		                  x           : 355,
		                  y           : 10,
		                  border      : false,
		                  items: [dtLoadingBill]
		               },

		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 1,
		                  width       : 140,
		                  x           : 355,
		                  y           : 40,
		                  border      : false,
		                  items: [dtFreightBill]
		               },
		               { 
		                  xtype       : 'fieldset',
		                  title       : '',
		                  labelWidth  : 1,
		                  width       : 140,
		                  x           : 355,
		                  y           : 70,
		                  border      : false,
		                  items: [dtUnloadingBill]
		               },
	        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 471,
		         y           : 10,
		         border      : false,
		         items:[txtLoadingAmount],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 471,
		         y           : 40,
		         border      : false,
		         items:[txtFreightAmount],
		     	},

		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 10, 
		         x           : 471,
		         y           : 70,
		         border      : false,
		         items:[txtUnloadigAmount],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 220,
                         labelWidth  : 70, 
		         x           : 0,
		         y           : 100,
		         border      : false,
		         items:[txtHandlingAmount],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 180,
		         y           : 100,
		         border      : false,
		         items:[txtHandlingcgstper],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 350,
		         y           : 100,
		         border      : false,
		         items:[txtHandlingsgstper],
		     	},



		]
                  },


                 {  xtype       : 'fieldset',
                 title       : '',
                 width       : 600,
                 height      : 115,
                 x           : 0,
                 y           : 380,
                 border      : true,
                 style      : "border-radius:10px;",     
                 layout      : 'absolute',
                 items:[

 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 85,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 155,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 300,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 355,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 420,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCess]

                        },

		   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 495,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTCS]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty]

                        },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 10,
		         border      : false,
		         items:[txtPartyWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 10,
		         border      : false,
		         items:[txtPartyValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 10,
		         border      : false,
		         items:[txtPartySGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 10,
		         border      : false,
		         items:[txtPartyIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCess],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 10,
		         border      : false,
		         items:[txtPartyTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 35,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblGRN]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 35,
		         border      : false,
		         items:[txtGRNWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 35,
		         border      : false,
		         items:[txtGRNValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 35,
		         border      : false,
		         items:[txtGRNSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 35,
		         border      : false,
		         items:[txtGRNIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 35,
		         border      : false,
		         items:[txtGRNTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 60,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiff]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 60,
		         border      : false,
		         items:[txtDiffWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 60,
		         border      : false,
		         items:[txtDiffValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 60,
		         border      : false,
		         items:[txtDiffSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 60,
		         border      : false,
		         items:[txtDiffIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCess],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 60,
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
                 height      : 520,
                 x           : 640,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 800,
                            labelWidth  : 200,
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
		         y           : 165,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 165,
		         border      : false,
		         items:[txttotCredit],
                       },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 600,
		         x           : 0,
		         y           : 220,
		         border      : false,
		         items:[btnSubmit],
                       },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 600,
		         x           : 40,
		         y           : 190,
		         border      : false,
		         items:[txtPurchaseRemarks],
                       },
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            labelWidth  : 200,
                            x           : 0,
                            y           : 260,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbldebitnote]

                        },
			flxAccountsDNote,

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 40,
		         y           : 440,
		         border      : false,
		         items:[txttotDebitDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 300,
		         y           : 440,
		         border      : false,
		         items:[txttotCreditDNote],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 600,
		         x           : 40,
		         y           : 465,
		         border      : false,
		         items:[txtDNoteRemarks],
                       },


                ]
             }    
 
            ], 
 


});
 	


    function RefreshData() {
        refresh()
        flxAccounts.getStore().removeAll();
        flxAccountsDNote.getStore().removeAll();
                    VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "loadlastvouno",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PF'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PF"+VouNodatastore.getAt(0).get('con_value'));

                        }
                    });
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
    }



    var TrnFuelPayableUpdationWindow = new Ext.Window({
	height      : 610,
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
                    VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "loadlastvouno",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'PF'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("PF"+VouNodatastore.getAt(0).get('con_value'));

                        }
                    });
  
             }    
          } 
    });
       TrnFuelPayableUpdationWindow.show();  
});
