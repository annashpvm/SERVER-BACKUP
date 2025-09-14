/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

    var ginFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginCompcode = localStorage.getItem('gincompcode');
   var  invfin = localStorage.getItem('invfin');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');
    var dntype = '';  

   var dngsttype = localStorage.getItem('GSTTYPE');


var NewDays = localStorage.getItem('newdays');
var EditDays   = localStorage.getItem('editdays');



    var slno;
    var accledcode = 0;
    var flag;
    var curcode;
    var dgaccrecord = Ext.data.Record.create([]);
    var dateon;
    var getdate;
    var taxtypenew = 'CS';
    var powerid=localStorage.getItem('powerid');	

    var ledtype ="O";
    var taxtypenew = 'CS';

    var editrow = 0;   
    var gridedit = "false";

    var accseqno = 0;
    var docseqno = 0; 
    var dnseqno = 0;

    var ledDRCR ="";
    var ledpartycode =0;
    var partystate = 0;

    var output = 'N';
    var oldremarks = '';   
    var btnSave = new Ext.Button({
        text: 'Temp Save',
        width: 70,
        height: 50,
        tooltip:'Click To Add',
        border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	    listeners:{
		click: function(){ 
                    save_clickNew();

                }
            }
    }); 

                        


    var chkOutput = new Ext.form.Checkbox({
        name: 'Output',
        boxLabel: 'Output',
        id: 'chkOutput',
        checked: false,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    output = 'Y';
                    ledtype = "O";
                    value   = 1;     

                } else {
                    output = 'N';
                    ledtype = "I";
                }
                findledgers();
                value   = 0;
            }
        }
    });


new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                       if (ginFinid < 24)
                          save_click();
                       else
                          save_clickNew();
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
                  StoreDebiteNoteEntryWindow.hide();

            }
        }]);

    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
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


    var txtRemarks = new Ext.form.TextArea({
        fieldLabel: 'Remarks',
        id: 'txtRemarks',
        width: 600,
        height: 50,
        cellWrap: true,
        name: 'txtRemarks',
        enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'299'},
        listeners: {
        }
    });


   var loadDNDateDatastore = new Ext.data.Store({
      id: 'loadDNDateDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDNDate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dnmaxdate'
      ]),
    });



var LoadDebitNoteVoucherListDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherListDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'pur_vouno'
      ]),
    });



var loadDNVouNoDatasore = new Ext.data.Store({
  id: 'loadDNVouNoDatasore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsDebitNote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadDNNumber"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['vouno'])
})



    var LoadPurVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadPurVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsDebitNote.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadDebitNoteVoucherDetail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['pur_seqno', 'pur_compcode', 'pur_finid', 'pur_vouno', 'pur_date','pur_partycode', 'pur_billno', 'pur_billdate', 'pur_slno', 'pur_description', 'pur_hsn', 'pur_rate', 'pur_qty', 'pur_uom', 'pur_value', 'pur_taxvalue', 'pur_taxledger', 'pur_cgst_per', 'pur_cgst_amt', 'pur_cgst_ledger', 'pur_sgst_per', 'pur_sgst_amt', 'pur_sgst_ledger','pur_igst_per', 'pur_igst_amt', 'pur_igst_ledger', 'pur_rounding', 'pur_round', 'pur_totalamount', 'pur_accseqno', 'cust_code', 'cust_name', 'led_grp_code','cust_type', 'led_custcode','pur_dnseqno','pur_remarks','pur_partyledcode' ,'pur_output','pur_rate_type','pur_other_amt','pur_INR_Rate','pur_other_amt2', ])
    });




var rateopt ="INR";
var optRate = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rate in INR / USD',

    fieldLabel: '',
    layout : 'hbox',
    width: 180,
    height: 60,
    defaultType : 'textfield',
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optRate',
        items: [
            {boxLabel: 'INR', name: 'optRate', id:'rateoptINR',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 rateopt ="INR";
               }
              }
             }
            },
            {boxLabel: 'USD', name: 'optRate', id:'rateoptUSD',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                rateopt ="USD"; 
               }
              }
             }}  , 


        ],
    },

    ],
});



var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 400,
    height: 60,
    defaultType : 'textfield',
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding', id:'RoundNeed',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 txtRounding.setValue(0);
                 calculateGSTvalue();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                txtRounding.setValue(0);
                calculateGSTvalue();   
               }
              }
             }}  , //,txtfreight
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="M";
                rounding = 1;
        //        txtRounding.setValue(0);
                calculateGSTvalue();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});


    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
      autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "GeneralLedger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });

var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'ClsDebitNote.php',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'ClsDebitNote.php',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })


    var cmbOtherLedger = new Ext.form.ComboBox({
        fieldLabel: 'Other Ledger',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbOtherLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        enableKeyEvents: true,
        style: {textTransform: "uppercase"},
        listeners: {
            specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
          //        txtCgstper.focus();
             }
       },

            select: function () {
                grpcodetds = 0;
                add_btn_click();
            }
        }
    });


    var cmbCreditLedger = new Ext.form.ComboBox({
        fieldLabel: 'Ledger',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbCreditLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        enableKeyEvents: true,
        style: {textTransform: "uppercase"},
        listeners: {
            specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCgstper.focus();
             }
       },

            select: function () {
                grpcodetds = 0;
                add_btn_click();
            }
        }
    });



    var txtINRRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtINRRate',
        width: 100,
        name: 'txtINRRate',
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        decimalPrecision: 2,
    });



    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 100,
        name: 'txtTotDebit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 100,
        name: 'txtTotCredit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });




    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 60,
        name: 'txtRounding',
        enableKeyEvents: true,
        //allowDecimals: false,

        listeners: {
            keyup: function () {
              calculateGSTvalue()

            }   
        }
    });


    var txtPartyAmount = new Ext.form.NumberField({
        fieldLabel: 'Total Amount',
        id: 'txtPartyAmount',
        width: 110,
        name: 'txtPartyAmount',
        enableKeyEvents: true,
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
    });

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbSGSTledger.focus();
             }
        },
           select: function(){

           }
        } 
});


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger',
        width           : 300,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbIGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});



    var txtCgstper = new Ext.form.NumberField({
        fieldLabel: 'CGST % Amt',
        id: 'txtCgstper',
        width: 40,
        name: 'txtCgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
 //       readOnly: true,

        listeners: {
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbCGSTledger.focus();
             }
        },
            keyup: function () {
               txtSgstper.setValue(txtCgstper.getValue());
               findledgers()

            }   
        }
    });


    var txtCgstvalue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCgstvalue',
        width: 110,
        name: 'txtCgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtSgstper = new Ext.form.NumberField({
        fieldLabel: 'SGST % Amt',
        id: 'txtSgstper',
        width: 40,
        name: 'txtSgstper',
        enableKeyEvents: true,
   //     readOnly: true,
        //allowDecimals: false,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtSgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtSgstvalue',
        width: 110,
        name: 'txtSgstvalue',
        enableKeyEvents: true,
        readOnly: true,
        //allowDecimals: false,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtIgstper = new Ext.form.NumberField({
        fieldLabel: 'IGST % Amt',
        id: 'txtIgstper',
        width: 40,
        name: 'txtIgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
  //      readOnly: true,
        listeners: {
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtIgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtIgstvalue',
        width: 110,
        name: 'txtIgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 60,
        name: 'txtRounding',
        enableKeyEvents: true,
        //allowDecimals: false,

        listeners: {
            keyup: function () {
               calculateGSTvalue()

            }   
        }
    });
        
    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','cust_type', 'led_custcode'])
    });



function add_btn_click()
{

          if  (gstFlag == "Add")
            txtRemarks.setRawValue("BEING DEBITED TO YOUR ACCOUNT FOR QTY / QUALITY DIFFERENCE IN THE Inv. No." + txtPartyBillNo.getRawValue()+ " Dt. " + Ext.util.Format.date(dtpBilldate.getValue(),"d-m-Y")  ) ;
          else
             txtRemarks.setValue(oldremarks);

        var narra = "DEBITED TO YOUR A/C FOR BILL NO. " + txtPartyBillNo.getRawValue() + " DT. " + Ext.util.Format.date(dtpBilldate.getValue(), "d-m-Y")  ;
        narra = narra.substring(0,59)  


                flxAccounts.getStore().removeAll();

                var gstInsert = "true";

                if (txtPartyName.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Purchases", "Select Party / Ledger");
                }

                if (cmbCreditLedger.getValue() == 0 && txtTaxableValue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Purchases", "Select Credit Ledger");
                }

                if (cmbCGSTledger.getValue() == 0 && txtCgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Purchases", "Select CGST Ledger");
                    cmbCGSTledger.focus();
                }


                if (cmbSGSTledger.getValue() == 0 && txtSgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Purchases", "Select SGST Ledger");
                    cmbSGSTledger.focus();
                }

                if (cmbIGSTledger.getValue() == 0 && txtIgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Purchases", "Select IGST Ledger");
                    cmbIGSTledger.focus();
                }

                if (cmbOtherLedger.getValue() == 0 && cmbOtherLedger.getRawValue() == '' &&  txtOtherAmt2.getValue() > 0 ) {
                    gstInsert = "false";
                    alert("Select OTHER Ledger");
                    cmbOtherLedger.focus();
                }


                var cnt = 0;
/*

                flxAccounts.getSelectionModel().selectAll();
                var selrows = flxAccounts.getSelectionModel().getCount();
                var sel = flxAccounts.getSelectionModel().getSelections();

                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq === cmbAccountName.getValue()) {
                        cnt = cnt + 1;
                    }
                }
*/

//alert(gstInsert);
if (ledDRCR != "G")
    ledDRCR = "P";  
                        if (gstInsert === "true") {

                           var totamt;
                           var RowCnt = flxAccounts.getStore().getCount() + 1;
                           flxAccounts.getStore().insert(
                                flxAccounts.getStore().getCount(),
                                new dgaccrecord({
                                    slno: RowCnt,
                                    ledcode: accledcode,
                                    ledname: txtPartyName.getRawValue(),
                                    debit : Ext.util.Format.number(Number(txtPartyAmount.getRawValue()),'0.00'),
                                    credit : 0,
                                    ledtype : ledDRCR,
                                    description : narra,
                                })
                          );
                           flxAccounts.getStore().insert(
                                flxAccounts.getStore().getCount(),
                                new dgaccrecord({
                                    slno: RowCnt,
                                    ledcode: cmbCreditLedger.getValue(),
                                    ledname: cmbCreditLedger.getRawValue(),
                 credit : Ext.util.Format.number(Number(txtTaxableValue.getRawValue()),'0.00'),        
                                    debit : 0,

                                    ledtype : 'G'
                                })
                          );
                          if (Number(txtOtherAmt2.getValue()) > 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbOtherLedger.getValue(),
		                            ledname: cmbOtherLedger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtOtherAmt2.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtCgstvalue.getValue()) > 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbCGSTledger.getValue(),
		                            ledname: cmbCGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtCgstvalue.getRawValue()),'0.00'),
	
	                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtSgstvalue.getValue()) > 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbSGSTledger.getValue(),
		                            ledname: cmbSGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtSgstvalue.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtIgstvalue.getValue()) > 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbIGSTledger.getValue(),
		                            ledname: cmbIGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtIgstvalue.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }


                          if (Number(txtRounding.getValue()) > 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: 1859,
		                            ledname: 'ROUNDED OFF',
		                            debit  : 0,
                                            credit   : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }

                          if (Number(txtRounding.getValue()) < 0)
                          { 
		                   flxAccounts.getStore().insert(
		                        flxAccounts.getStore().getCount(),
		                        new dgaccrecord({
		                            slno    : RowCnt,
		                            ledcode : 1859,
		                            ledname : 'ROUNDED OFF',

		                            credit : 0,
                                            debit : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),
		                            ledtype : 'G'
		                        })
		                  );
                          }

                          CalcTotalDebitCredit();
                          //BillAdjustingDetail();
                          //txtCredit.setRawValue('');
//                          cmbAccountName.setRawValue('');
     //                     cmbAccountName.focus();
    //                   }
      
              }
                         CalcTotalDebitCredit();
}



    function RefreshData() {
   //     flxParty.hide();






        Ext.getCmp('cmbDNNo').setVisible(false);
        Ext.getCmp('save').setDisabled(false); 
        Ext.getCmp('editchk').hide();

        flxPurchase.getStore().removeAll();
        flxAccounts.getStore().removeAll();

        DebitNoteEntryFormPanel.getForm().reset();
        gstFlag = "Add";
         flxParty.hide();
           accseqno = 0;
           docseqno = 0;
           dnseqno =0;

	  loadDNVouNoDatasore.load({
	    url: 'ClsDebitNote.php',
	    params: {
		task    : 'LoadDNNumber',
		finid   : ginFinid,
		compcode: ginCompcode,
                gsttype : dngsttype,  
                
	    },
	    callback: function () {

/*
                var vno = " 00"+loadDNVouNoDatasore.getAt(0).get('vouno');   

                vno = vno.slice(-4);    
                vno = vno.trim() +'/'+ invfin; 
                if (dngsttype == "G")
                   vno = "DNG/"+vno;    
                else
                   vno = "DNN/"+vno;    
		txtDnNo.setRawValue(vno);

*/


                var vno = " 00"+loadDNVouNoDatasore.getAt(0).get('vouno');   

               if (loadDNVouNoDatasore.getAt(0).get('vouno') < 10)
                {                                              
                  vno = "00"+loadDNVouNoDatasore.getAt(0).get('vouno');
                }                                      
                else
                {  
                     if (loadDNVouNoDatasore.getAt(0).get('vouno') < 100) 
                     {                                              
                      vno = "0"+loadDNVouNoDatasore.getAt(0).get('vouno');                   
                     }
                     else 
                     {      
                       vno = loadDNVouNoDatasore.getAt(0).get('vouno');  
                     }
                } 

             vno =  vno.slice(-4);  
             vno =  vno.trim() +'/'+ invfin; 
//alert(vno);
                if (dngsttype == "G")
                   vno = "DNG/"+vno;    
                else
                   vno = "DNN/"+vno;    
		txtDnNo.setRawValue(vno);

                if (dngsttype == "G")
                {     
                   dntype = 'DNG';                   
                   Ext.getCmp('txtCgstper').setDisabled(false); 
                   Ext.getCmp('txtSgstper').setDisabled(false); 
                   Ext.getCmp('txtIgstper').setDisabled(false); 

                }
                else
                {  
                   dntype = 'DNN';
                   Ext.getCmp('txtCgstper').setDisabled(true); 
                   Ext.getCmp('txtSgstper').setDisabled(true); 
                   Ext.getCmp('txtIgstper').setDisabled(true); 

                }
	    }
	  });


	loadDNDateDatastore.removeAll();
	loadDNDateDatastore.load({
        	 url:'ClsDebitNote.php',
        	 params:
       		 {
         	 task     :"LoadDNDate",
		 finid    : ginFinid,
		 compcode : ginCompcode,
                 gsttype  : dngsttype,  
        	 },
		callback:function()
		{

                    if (Ext.util.Format.date(dtpVouDate.getValue(),'d-m-Y') <= Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),'d-m-Y'))
                     {

                       dtpVouDate.setValue(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),'d-m-Y')); 
                     }  

                  } 


		 });



        for (var i = 0; i < 30; i++) {
        flxPurchase.getStore().insert(
                flxPurchase.getStore().getCount(),
                new dgrecord({
			description : '',
			hsn         : '',
			qty         : '',
			rate        : '',
			value       : 0,
         }));
         }

	
    }

    function RefreshGridData() {


    }

    function CalcTotal() {

        flxPurchase.getSelectionModel().selectAll();
        var selrows = flxPurchase.getSelectionModel().getCount();
        var sel = flxPurchase.getSelectionModel().getSelections();
        var gintotal = 0;

        for (var i = 0; i < selrows; i++) {
              if (rateopt == "USD")
                 sel[i].data.value = Number(sel[i].data.rate)*  Number(sel[i].data.qty) * Number(txtINRRate.getValue());
              else
                 sel[i].data.value = Number(sel[i].data.rate)*  Number(sel[i].data.qty);


       }

        for (var i = 0; i < selrows; i++) {
//alert(Number(sel[i].data.rate));
//alert(Number(sel[i].data.value));
            gintotal = gintotal + Number(sel[i].data.value);
        }
       gintotal = gintotal + Number(txtOtherAmt.getValue());
           

        if (dntype == 'DNN')

           txtTaxableValue.setRawValue(Ext.util.Format.number(Math.round(gintotal),'0.00'));
        else
           txtTaxableValue.setValue(gintotal);

        flxPurchase.getSelectionModel().clearSelections();
        calculateGSTvalue();
    }



    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbPartyName"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'},
            {name: 'cust_type', type: 'string', mapping: 'cust_type'},
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'},
            {name: 'cust_type', type: 'string', mapping: 'cust_type'},
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


;

    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/datechk.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DATECHECKING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['date'])
    });

    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getvouno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['con_value'])
    });

    var txtDnNo = new Ext.form.TextField({
        fieldLabel  : 'Debit Note No.',
        id          : 'txtDnNo',
        width       : 120,
        name        : 'txtDnNo',
        readOnly    : 'true',
    })
/*
    var dtpVouDate = new Ext.form.DateField({
        fieldLabel: 'Vou Date',
        id: 'dtpVouDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        enableKeyEvents: true,
        anchor: '100%',
        listeners: {
            specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPartyName.focus();
             }
            },
            select: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            },
            blur: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });

*/


  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtpVouDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >30)
        {     
             alert("You are Not Allowed to Raise the DEBIT NOTE in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the DEBIT NOTE in the Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","DEBIT NOTE Date is not in the current finance year. Please Change the Fin Year");
    }

    else if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","DEBIT NOTE Date is not in the current finance year. Please Change the Fin Year");
    }



	loadDNDateDatastore.removeAll();
	loadDNDateDatastore.load({
        	 url:'ClsDebitNote.php',
        	 params:
       		 {
         	 task:"LoadDNDate",
		 finid    : ginFinid,
		 compcode : ginCompcode,
                 gsttype  : dngsttype,  
        	 },
		callback:function()
		{

                  if (Ext.util.Format.date(dtpVouDate.getValue(),'d-m-Y') < Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),'d-m-Y'))
                   {
alert("You can't raise the Debit Note in the Date of " +  Ext.util.Format.date(dtpVouDate.getValue(),'d-m-Y') + " Because alreday Debit Note raised in the date " + Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),'d-m-Y'));   
                       dtpVouDate.setValue(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),'d-m-Y')); 
                    }  
                  } 

		 });

 }



    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: ' Date',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
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


    var txtPartyBillNo = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtPartyBillNo',
        width       : 120,
        name        : 'txtPartyBillNo',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   dtpBilldate.focus();
const input = document.getElementById('dtpBilldate');
const end = input.value.length;
input.setSelectionRange(0,0);
input.focus();

             }
          } 
       }      
    })

    var dtpBilldate = new Ext.form.DateField({
        fieldLabel: 'Bill Date',
        id: 'dtpBilldate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        enableKeyEvents: true,
        listeners: {
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   flxPurchase.focus();

             }
          } ,
            select: function () {
            }   
        }
    });

    var cmbDNNo = new Ext.form.ComboBox({
        fieldLabel: 'Debit Note No.',
        width: 120,
        store: LoadDebitNoteVoucherListDataStore,
        displayField: 'pur_vouno',
        valueField: 'pur_vouno',
        hiddenName: 'vou_no',
        id: 'cmbDNNo', readOnly: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners:{
           select: function(){
                      flxPurchase.getStore().removeAll();
                      flxAccounts.getStore().removeAll();

                        Ext.getCmp('editchk').hide();
     	               LoadPurVouNoDetailsdatastore.load({
                           url: 'ClsDebitNote.php',
	                   params: {
			        task: 'LoadDebitNoteVoucherDetail',
			        fincode : ginFinid,
			        compcode: ginCompcode,
                                vouno   : cmbDNNo.getRawValue(),
                                dntype  : dntype,
	                  },
		          callback: function () {
                              var cnt=LoadPurVouNoDetailsdatastore.getCount();
                                       var sno = 1

                              if (cnt>0)
                              {

//alert(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_round'));

//   Ext.getCmp("optRounding").setValue(2);


                     rateopt = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rate_type');
                     if (LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rate_type') == "INR")
                     {
      
                           Ext.getCmp("optRate").setValue(1);
                       
                     }  
                     else
                     {

                           Ext.getCmp("optRate").setValue(2);
                       

                     }


    
                                   txtDnNo.setRawValue(cmbDNNo.getRawValue());
                                   dtpVouDate.setRawValue(Ext.util.Format.date(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_date'),"d-m-Y"));  
                                   txtPartyBillNo.setRawValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_billno'));

                                   dtpBilldate.setRawValue(Ext.util.Format.date(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_billdate'),"d-m-Y"));  

                                   accseqno = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_accseqno');
                                   docseqno = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_seqno');
                                   dnseqno = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_dnseqno');

                                   txtOtherAmt.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_other_amt'));
                                   txtOtherAmt2.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_other_amt2'));
/*
                                   if (accseqno > 0)
                                   {  
                                       Ext.getCmp('save').setDisabled(true);  
                                       alert("Accounts Udataion has been completed.. You can't Modify..")
    
                                   }  
                                   else
                                       Ext.getCmp('save').setDisabled(false);  

*/
                                   cmbCreditLedger.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_taxledger'));
                                   txtTaxableValue.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_taxvalue'));
                                   txtCgstper.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_cgst_per'));
                                   txtCgstvalue.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_cgst_amt'));
                                   txtSgstper.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_sgst_per'));
                                   txtSgstvalue.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_sgst_amt'));
                                   txtIgstper.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_igst_per'));
                                   txtIgstvalue.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_igst_amt'));



                                   cmbCGSTledger.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_cgst_ledger'));
                                   cmbSGSTledger.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_sgst_ledger'));
                                   cmbIGSTledger.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_igst_ledger'));


                                   txtRounding.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rounding'));
                                   txtPartyAmount.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_totalamount'));

                                   txtINRRate.setValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_INR_Rate'));
 findledgers();

                                   txtRemarks.setRawValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_remarks'));
                                oldremarks = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_remarks');
				accledcode = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_partycode');


				txtPartyName.setRawValue(LoadPurVouNoDetailsdatastore.getAt(0).get('cust_name'));
                                ledDRCR = LoadPurVouNoDetailsdatastore.getAt(0).get('cust_type'); 



                                ledpartycode = LoadPurVouNoDetailsdatastore.getAt(0).get('pur_partycode');

/*
                                   if (LoadPurVouNoDetailsdatastore.getAt(0).get('pur_output') == 'Y')
                                      Ext.getCmp('chkOutput').setValue(true); 
                                   else
                                      Ext.getCmp('chkOutput').setValue(false); 

*/


                                  for(var j=0; j<cnt; j++)
                                  { 
 
//alert(LoadPurVouNoDetailsdatastore.getAt(j).get('pur_value'));

                                         flxPurchase.getStore().insert(
	                                 flxPurchase.getStore().getCount(),
                                         new dgrecord({
					     description : LoadPurVouNoDetailsdatastore.getAt(j).get('pur_description'),      
                                             hsn   : LoadPurVouNoDetailsdatastore.getAt(j).get('pur_hsn'),
                                             uom   : LoadPurVouNoDetailsdatastore.getAt(j).get('pur_uom'),
					     qty   : LoadPurVouNoDetailsdatastore.getAt(j).get('pur_qty'),  
                                             rate  : Number(LoadPurVouNoDetailsdatastore.getAt(j).get('pur_rate')),
                                             value : LoadPurVouNoDetailsdatastore.getAt(j).get('pur_value'), 
                                          })  
                                          );
                                  }

//alert(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_round'));

//alert(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rate_type'));

                     if (LoadPurVouNoDetailsdatastore.getAt(0).get('pur_round') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                     else if (LoadPurVouNoDetailsdatastore.getAt(0).get('pur_round') == "N")
                           Ext.getCmp("optRounding").setValue(2);
                     else
                           Ext.getCmp("optRounding").setValue(3);

//alert(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rate_type'));



/*
                     if (LoadPurVouNoDetailsdatastore.getAt(0).get('pur_rate_type') == "INR")
                     {
      
                           Ext.getCmp("optRate").setValue(1);
                     }  
                     else
                     {

                           Ext.getCmp("optRate").setValue(2);
                     }
*/
        flxPurchase.getStore().insert(
                flxPurchase.getStore().getCount(),
                new dgrecord({
			description : '',
			hsn         : '',
			qty         : '',
			rate        : '',
			value       : 0,
         }));
        flxPurchase.getStore().insert(
                flxPurchase.getStore().getCount(),
                new dgrecord({
			description : '',
			hsn         : '',
			qty         : '',
			rate        : '',
			value       : 0,
         }));

                              }
                         }      
                       });   
     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginFinid,
			        compcode: ginCompcode,
                                vouno   : cmbDNNo.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                                       var sno = 1
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');

//alert(seqno);
                                      txtDnNo.setRawValue(cmbDNNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  

                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';

                                      flxAccounts.getStore().insert(
	                                 flxAccounts.getStore().getCount(),
                                         new dgrecord({
                                             slno    : sno,
		
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),                          				                     type    : drcr,
	                                     debit   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     credit   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledcode  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),
	                                  })
                                      );
                                      sno = sno +1;
                                  }
          
                CalcTotalDebitCredit();
                              }  
                          }
                      }); 
      CalcTotalDebitCredit();
             txtRemarks.setRawValue(LoadPurVouNoDetailsdatastore.getAt(0).get('pur_remarks'));

            }    
        }
 
    });





    var dgrecord = Ext.data.Record.create([]);


    var flxPurchase = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 120,
        width: 950,
        x: 10,
        y: 50,
        columns: [

            {header: "Description", dataIndex: 'description', sortable: true, width: 270, align: 'left',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {


//				flxPurchase.getStore().insert(
					//flxPurchase.getStore().getCount(),
//					new dgrecord({
				 //}));
                        }
                    }    
                }},
            {header: "UOM", dataIndex: 'uom', sortable: true, width: 50, align: 'left',
              editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "HSN", dataIndex: 'hsn', sortable: true, width: 100, align: 'left',
              editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true
                }},
            {header: "QTY", dataIndex: 'qty', sortable: true, width: 100, align: 'left',
              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    decimalPrecision: 3,

                    listeners: {
                       blur:function(){
                              CalcTotal();
                        },
                        keyup: function () {
                            var sm = flxPurchase.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxPurchase.getSelectionModel().getSelections();
                            var invqty  = Number(selrow.get('qty'));
                            var invrate  = Number(selrow.get('rate'));

            //                this.setValue(Number(selrow.get('qty')));

                     if (rateopt == "USD")
                          var val1 = Ext.util.Format.number(Number(invrate) * Number(txtINRRate.getValue()) * Number(this.getValue()) , '0.00');
                     else
                          var val1 = Ext.util.Format.number(Number(invrate) * Number(this.getValue()) , '0.00');

//                            selrow.set('value', val1);
   

                            for (var a = 0; a < selected_rows.length; a++)
                            {
                            selected_rows[a].set('value', val1);
                            }

                        },

                    }
                }},

            {header: "RATE", dataIndex: 'rate', sortable: true, width: 100, align: 'left',
              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxPurchase.getSelectionModel();
                            var selrow = sm.getSelected();
//                            this.setValue(Number(selrow.get('rate')));
//
                        },
                        blur:function(){
                              CalcTotal();
                        },
                        keyup: function () {
                            var sm = flxPurchase.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxPurchase.getSelectionModel().getSelections();
                            var invqty  = Number(selrow.get('qty'));
//                            var invrate  = Number(selrow.get('rate'));

//alert(invqty);
//alert(this.getValue());
             
//                            this.setValue(Number(selrow.get('rate')));
                     if (rateopt == "USD")
                            var val1 = Ext.util.Format.number(Number(invqty) * Number(txtINRRate.getValue()) * Number(this.getValue()) , '0.00');
                     else
                            var val1 = Ext.util.Format.number(Number(invqty) * Number(this.getValue()) , '0.00');
 


//                           selrow.set('value', val1);
   
                            for (var a = 0; a < selected_rows.length; a++) 
                            {
                                selected_rows[a].set('value', val1);

                            }
     //                           CalcTotal();
                        }
                    }
                }},
            {header: "AMOUNT", dataIndex: 'value', sortable: true, width: 120, align: 'left',
              renderer: function (v, params, record) {
                    var retval;
                     if (rateopt == "USD")
                         retval = Number(record.data.qty) * Number(record.data.rate)*Number(txtINRRate.getValue());
                     else
                         retval = Number(record.data.qty) * Number(record.data.rate);

                     retval = Ext.util.Format.number(retval, '0.00');
 
                    return retval;
              }
            },

        ],
        listeners: {
             'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
 //                   CalcTotal();

                    }
           }

    });

    var dgaccrecord = Ext.data.Record.create([]);
var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:30,
    height: 200,
    hidden:false,
    width: 780,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
 //   	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "Led. Code", dataIndex:'ledcode',sortable:false,width:100,align:'left'},
       {header: "Led. Name", dataIndex:'ledname',sortable:false,width:320,align:'left'},
       {header: "Debit", dataIndex:'debit',sortable:false,width:120,align:'right'},
       {header: "Credit", dataIndex:'credit',sortable:false,width:120,align:'right'},
       {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 100, align: 'left'},
       {header: "Description",     dataIndex: 'description',sortable:true,width:350,align:'left'},

    ],

    store: [],

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
         'cellclick': function (flxAccounts, rowIndex, cellIndex, e) {
	        var selected_rows = flxAccounts.getSelectionModel().getSelections();
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
           var sm = flxAccounts.getSelectionModel();
        var selrow = sm.getSelected();
        flxAccounts.getStore().remove(selrow);
        flxAccounts.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         

    }

   }
*/

});


 var findPartyTypeDatastore = new Ext.data.Store({
      id: 'findPartyTypeDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findPartyType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

         'statecode'
 

      ]),
    });


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"getSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name','cust_type',
 

      ]),
    });

function grid_chk_flxLedger()
{
	var sm = flxParty.getSelectionModel();
	var selrow = sm.getSelected();
	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		gridedit = "true";
		editrow = selrow;
		accledcode = selrow.get('cust_code');
		txtPartyName.setRawValue(selrow.get('cust_name'));
                ledDRCR = selrow.get('cust_type');
                ledpartycode = selrow.get('cust_code');

                flxParty.hide();
//                            tabAccPurchase.show();

                txtPartyBillNo.focus();
                findPartyTypeDatastore.removeAll();
                findPartyTypeDatastore.load({
		url: 'ClsDebitNote.php',
		params:
		{
			task       :"findPartyType",
			partydrcr  : ledDRCR,
                        partycode  : ledpartycode,
		},
                callback: function () {
                      partystate = 0
                      var cnt = findPartyTypeDatastore.getCount(); 
                      if (cnt > 0)
                         partystate =  findPartyTypeDatastore.getAt(0).get('statecode');
//                                 alert(partystate); 
                }    
                });




	}

}

   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        hideHeaders : false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 500,
        width: 720,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:60,align:'left',hidden:false},   
		{header: "", dataIndex: 'led_custcode',sortable:true,width:60,align:'left',hidden:false},   
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
    
   }
   });


function calculateGSTvalue(){
var partyvalue = 0;
var cgstamt1 = 0;
var sgstamt1 = 0;
var igstamt1 = 0;
//txtRounding.setValue(0);

       if ( txtTaxableValue.getValue() > 0 && txtCgstper.getValue()>0)
       {  
             cgstamt1 =  Math.round(txtTaxableValue.getValue() * Number(txtCgstper.getValue())/100* 100) / 100;

             txtCgstvalue.setValue(Ext.util.Format.number(cgstamt1.toFixed(2),'0.00'));

 //            txtCgstvalue.setValue(Ext.util.Format.number(txtTaxableValue.getValue() * Number(txtCgstper.getValue())/100).toFixed(2),'0.00');
       }  
       else
             txtCgstvalue.setValue('');

       if (txtTaxableValue.getValue() > 0 && txtSgstper.getValue()>0)
       {  
             sgstamt1 =  Math.round(txtTaxableValue.getValue() * Number(txtSgstper.getValue())/100* 100) / 100;
             txtSgstvalue.setValue(Ext.util.Format.number(sgstamt1.toFixed(2),'0.00'));
//             txtSgstvalue.setValue(Ext.util.Format.number(txtTaxableValue.getValue() * Number(txtSgstper.getValue())/100).toFixed(2),'0.00');
       } 
       else
             txtSgstvalue.setValue('');
        if (txtTaxableValue.getValue() > 0 && txtIgstper.getValue()>0)
{
             igstamt1 =  Math.round(txtTaxableValue.getValue() * Number(txtIgstper.getValue())/100* 100) / 100;
             txtIgstvalue.setValue(Ext.util.Format.number(igstamt1.toFixed(2),'0.00'));
}
//             txtIgstvalue.setValue(Ext.util.Format.number(txtTaxableValue.getValue() * Number(txtIgstper.getValue())/100).toFixed(2),'0.00');


       else
 {            txtIgstvalue.setValue('');
}

// alert(txtRounding.getValue());

       partyvalue = Number(txtTaxableValue.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue())  +  Number(txtOtherAmt2.getValue()) ;
           txtPartyAmount.setValue(Ext.util.Format.number( partyvalue,'0.00'));


        if (roundoff == "M")   
        {
       partyvalue = Number(txtTaxableValue.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtRounding.getValue());
          txtPartyAmount.setValue(Ext.util.Format.number( partyvalue,'0.00'));
        }
        else if (roundoff == "Y")
        {         
           totPurValue =  partyvalue.toFixed(0);
           txtRounding.setValue(Ext.util.Format.number(totPurValue-partyvalue,"0.00"))
           txtPartyAmount.setValue(Ext.util.Format.number( totPurValue,'0.00'));
        }   
        else
        {
           txtPartyAmount.setValue(Ext.util.Format.number( partyvalue,'0.00'));
        }



     //   add_btn_click();
}


function ledgerSearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsDebitNote.php',
		params:
		{
			task   :"loadSearchPartylist",
			party  : txtPartyName.getRawValue(),
		},
        });
}

           

    var txtPartyName = new Ext.form.TextField({
        fieldLabel: 'Party Name',
        id: 'txtPartyName',
        width: 300,
        name: 'txtPartyName',
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {

                flxParty.getEl().setStyle('z-index','10000');
                flxParty.show();


   //             Ext.getCmp('tabAccPurchase').hide();   
                loadSearchPartyListDatastore.removeAll();
                  if (txtPartyName.getRawValue() != '')
                     ledgerSearch();
            },
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   txtPartyBillNo.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
          }

         }  
    });

    var txtTaxableValue = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value ',
        readOnly: true,
        id: 'txtTaxableValue',
        width: 110,
        name: 'txtTaxableValue',
        enableKeyEvents: true,
        //allowDecimals: false,

        listeners: {
            keyup: function () {
              calculateGSTvalue()

            }   
        }
    });


    var txtOtherAmt = new Ext.form.NumberField({
        fieldLabel: 'Other Charges ',
        id: 'txtOtherAmt',
        width: 110,
        name: 'txtOtherAmt',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
               CalcTotal();

            }   
        }
    });


    var txtOtherAmt2 = new Ext.form.NumberField({
        fieldLabel: 'Other Charges(Taxable) ',
        id: 'txtOtherAmt2',
        width: 110,
        name: 'txtOtherAmt2',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
               CalcTotal();

            }   
        }
    });


	

function findledgers()
{

            	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: 'ClsDebitNote.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : ledtype,
				gsttype : partystate,
			 	gstper  : txtCgstper.getValue(),
                           },
                   	   callback:function()
	                   {
                               var cnt=LoadCGSTLedgerDataStore.getCount();
                               if (cnt > 0)
                               cmbCGSTledger.setValue(LoadCGSTLedgerDataStore.getAt(0).get('cust_code'));
//alert(LoadCGSTLedgerDataStore.getAt(0).get('cust_code'));

                           } 
                       });

               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: 'ClsDebitNote.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtCgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                               var cnt=LoadSGSTLedgerDataStore.getCount();
                               if (cnt > 0)
                               cmbSGSTledger.setValue(LoadSGSTLedgerDataStore.getAt(0).get('cust_code'));
//alert(LoadSGSTLedgerDataStore.getAt(0).get('cust_code'));

                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: 'ClsDebitNote.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : txtIgstper.getValue(),
                           },
	          	   callback:function()
	                   {
                               var cnt=LoadIGSTLedgerDataStore.getCount();
                               if (cnt > 0)
                              cmbIGSTledger.setValue(LoadIGSTLedgerDataStore.getAt(0).get('cust_code'));

                           } 
                       });  
     calculateGSTvalue();
}


var tabAccPurchase = new Ext.TabPanel({
    id          : 'tabAccPurchase',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 450,
    width       : 850,	
    x           : 10,
    y           : 0,
listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabAccPurchase.getActiveTab();
                    if (activeTab.id == 'tab2')
    //                   alert("The active tab in the panel is " + activeTab.id);
           add_btn_click(); 

        }
},

//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     id   : 'tab1', 
                     title: 'Value DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 450,
                        x: 0,
                        y: 5,
                        border: false,
                        items: [txtPartyName]
                    },


                       
            {xtype: 'fieldset',
                title: '',
                id   : 'hidecontrol',  
                width: 500,
                height: 420,
                x: 0,
                y: 50,
                border: false,
                layout: 'absolute',
                style: 'padding:0px',
                items: [flxParty]
             }, 
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 450,
                        x: 450,
                        y: 5,
                        border: false,
                        items: [txtPartyBillNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 200,
                        x: 650,
                        y: 5,
                        border: false,
                        items: [dtpBilldate]
                    },


		            flxPurchase,
		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 150,
		                width: 450,
		                x: 10,
		                y: 160,
		                border: false,
		                items: [txtOtherAmt]
		            },
		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 150,
		                width: 450,
		                x: 10,
		                y: 190,
		                border: false,
		                items: [txtOtherAmt2]
		            },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 600,
				x: 300,
				y: 190,
				defaultType: 'textfield',
				border: false,
				items: [cmbOtherLedger]
			    },

		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 150,
		                width: 450,
		                x: 10,
		                y: 220,
		                border: false,
		                items: [txtTaxableValue]
		            },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 600,
				x: 300,
				y: 220,
				defaultType: 'textfield',
				border: false,
				items: [cmbCreditLedger]
			    },

			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 200,
				x: 10,
				y: 260,
				defaultType: 'textfield',
				border:false,
				items: [txtCgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 160,
				y: 260,
				defaultType: 'textfield',
				border: false,
				items: [txtCgstvalue]
			    },
		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 90,
		                width: 600,
		                x: 300,
		                y: 260,
		                border: false,
		                items: [cmbCGSTledger]
		            },

	                    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 200,
				x: 700,
				y: 230,
				defaultType: 'textfield',
				border: false,
				items: [chkOutput]
			    },

			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 200,
				x: 10,
				y: 290,
				defaultType: 'textfield',
				border:false,
				items: [txtSgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 160,
				y: 290,
				defaultType: 'textfield',
				border: false,
				items: [txtSgstvalue]
			    },

			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 90,
			        width: 600,
			        x: 300,
			        y: 290,
			        border: false,
			        items: [cmbSGSTledger]
			    },
			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 200,
				x: 10,
				y: 320,
				defaultType: 'textfield',
				border:false,
				items: [txtIgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 160,
				y: 320,
				defaultType: 'textfield',
				border: false,
				items: [txtIgstvalue]
			    },


			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 90,
			        width: 600,
			        x: 300,
			        y: 320,
			        border: false,
			        items: [cmbIGSTledger]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 500,
				x: 10,
				y: 350,
				defaultType: 'textfield',
				border: false,
				items: [txtRounding]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 600,
				x: 400,
				y: 360,
				defaultType: 'textfield',
				border: false,
				items: [optRounding]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 300,
				x: 10,
				y: 380,
				defaultType: 'textfield',
				border: false,
				items: [txtPartyAmount]
			    },



                     ]  
                   },
                   {
                     xtype: 'panel',
                     id   : 'tab2', 
                     title: 'LEDGER POSTING DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [ flxAccounts ,
/*
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 300,
				x: 10,
				y: 360,
				defaultType: 'textfield',
				border: false,
				items: [btnSave]
			    },
*/
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 100,
                y: 260,
                defaultType: 'textfield',
                border: false,
                items: [txtTotDebit]
            }, 

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 320,
                y: 260,
                defaultType: 'textfield',
                border: false,
                items: [txtTotCredit]
            }, 


                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 750,
                        	x           : 50,
                        	y           : 300,
                            	border      : false,
                        	items: [txtRemarks]
                    },



                     ]  
                   },

                  ]
});




    function CalcTotalDebitCredit() {


        flxAccounts.getSelectionModel().selectAll();
        var selrows = flxAccounts.getSelectionModel().getCount();
        var sel = flxAccounts.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        var gintotgst = 0;
        var gintottds = 0;

        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.debit);
            gincrtotal = gincrtotal + Number(sel[i].data.credit);
   //         gintotgst = gintotgst + Number(sel[i].data.gst);
    //        gintottds = gintottds + Number(sel[i].data.tdsval);
        }
//        txtTotaldbamt.setValue(Number(gindbtotal) + Number(gintotgst));
        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
//        txtTotalgst.setValue(gintotgst);
//        txtTotaltds.setValue(gintottds);

    }

   function edit_click()
   {
           gstFlag = "Edit";
           cmbDNNo.show();


               Ext.getCmp('cmbDNNo').setVisible(true);
               gstFlag = 'Edit';
               LoadDebitNoteVoucherListDataStore.load({
                   url: 'ClsDebitNote.php',
	           params: {
			task: 'LoadDebitNoteVoucherList',
			fincode : ginFinid,
			compcode: ginCompcode,
                        gsttype : dngsttype,  

	          },
		  callback: function () {

	          }
		});
    }

   function save_clickNew()
   { 

        var rcnt = flxPurchase.getStore().getCount();
        var fromdate;
        var todate;
        fromdate = "04/01/" + gstfinyear.substring(0, 4);
        todate = "03/31/" + gstfinyear.substring(5, 9);
        if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length <5  )  )
        {
               Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setRawValue(text)
		                        save_clickNew();
				    }
				});
         }        
        else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
        } else if (rcnt <= 0) {
            Ext.MessageBox.alert("Debit Note", "Transactions Details Not Avaliable ..");
        } else if (Number(txtTotDebit.getRawValue()) !== Number(txtTotCredit.getRawValue())) {
            Ext.MessageBox.alert("Debit Note", "The Transactions Debit and Credit Amount are not  Equal");
        } else if (Number(txtTotDebit.getRawValue())  == 0) { // !== Number(txtPartyAmount.getRawValue())) {
            Ext.MessageBox.alert("Debit Note", "Please check LEDGER POSTING and continue to save");
        } 

      	else
        		{
        		 Ext.Msg.show({
                        title: 'Stores Debit Note',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Are You Sure to Add This Record?',
                        fn: function (btn) {
                    	 if (btn === 'yes') {

                        var purData = flxPurchase.getStore().getRange();
                        var purupdData = new Array();
                        Ext.each(purData, function (record) {
                            purupdData.push(record.data);
                        });

                        var accData = flxAccounts.getStore().getRange();
                        var accupdData = new Array();
                        Ext.each(accData, function (record) {
                            accupdData.push(record.data);
                        });
                        Ext.Ajax.request({
                            url: 'TrnDebitNoteSaveNew.php',
                            params: {
                                griddet: Ext.util.JSON.encode(accupdData),
                                cnt: accData.length,
                                griddet2: Ext.util.JSON.encode(purupdData),
                                cnt2: purData.length,

                                flagtype: gstFlag,
            
                                finid: ginFinid,
                                finyear: gstfinyear,
                                compcode: ginCompcode,
                                accrefseq: accseqno,

                                docseqno  : docseqno,
                                dnseqno   : dnseqno,

                                finsuffix :invfin,
                                vouno: txtDnNo.getRawValue(),
                                voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                bankname: "",
                                refno:  txtPartyBillNo.getRawValue(),
                                refdate: Ext.util.Format.date(dtpBilldate.getValue(), "Y-m-d"),
                                voutype: dntype,
                                paymode: "",
                                output: output,

                                party   : ledpartycode,
                                partyledcode : accledcode,
                                gltype   :   ledDRCR,
                                drcrledger: cmbCreditLedger.getValue(),
                                taxable : txtTaxableValue.getValue(),
                                cgstper: txtCgstper.getValue(),
                                cgstval: txtCgstvalue.getRawValue(),
                                sgstper: txtSgstper.getValue(),
                                sgstval: txtSgstvalue.getRawValue(),
                                igstper: txtIgstper.getValue(),
                                igstval: txtIgstvalue.getRawValue(),

                                rounding : txtRounding.getValue(), 
                                roundoff : roundoff,   
                                totalamount: Number(txtPartyAmount.getValue()),
                                others : Number(txtOtherAmt.getValue()),
                                otheramt2 : Number(txtOtherAmt2.getValue()),
                             
                                cgst  : cmbCGSTledger.getValue(),
                                sgst  : cmbSGSTledger.getValue(),
                                igst  : cmbIGSTledger.getValue(),

                                usercode : GinUserid, 
                                reason   : txtReason.getRawValue(),
                                remarks  : txtRemarks.getRawValue(),
                                ratetype : rateopt,
                                inrrate  : txtINRRate.getValue(),

                            },
                            callback: function (options, success, response)
                            {
                                var obj = Ext.decode(response.responseText);
                                if (obj['success'] === "true") {
				    RefreshData();
				    Ext.MessageBox.alert("Record saved with Voucher No - -" + obj['vouno']);
				    RefreshData();


                                } else {
                                    Ext.MessageBox.alert("Debit Note", "Record Not Saved ");
                                }
                            }
                        });
                    }
                }
            });
        		}
   }   

   function save_click()
   { 

        var rcnt = flxPurchase.getStore().getCount();
        var fromdate;
        var todate;
        fromdate = "04/01/" + gstfinyear.substring(0, 4);
        todate = "03/31/" + gstfinyear.substring(5, 9);
        if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length <5  )  )
        {
               Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setRawValue(text)
		                        save_click();
				    }
				});
         }        
        else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
        } else if (rcnt <= 0) {
            Ext.MessageBox.alert("Debit Note", "Transactions Details Not Avaliable ..");
        } else if (Number(txtTotDebit.getRawValue()) !== Number(txtTotCredit.getRawValue())) {
            Ext.MessageBox.alert("Debit Note", "The Transactions Debit and Credit Amount are not  Equal");
        } 

      	else
        		{
        		 Ext.Msg.show({
                        title: 'Stores Debit Note',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Are You Sure to Add This Record?',
                        fn: function (btn) {
                    	 if (btn === 'yes') {

                        var purData = flxPurchase.getStore().getRange();
                        var purupdData = new Array();
                        Ext.each(purData, function (record) {
                            purupdData.push(record.data);
                        });

                        var accData = flxAccounts.getStore().getRange();
                        var accupdData = new Array();
                        Ext.each(accData, function (record) {
                            accupdData.push(record.data);
                        });
                        Ext.Ajax.request({
                            url: 'TrnDebitNoteSave.php',
                            params: {
                                griddet: Ext.util.JSON.encode(accupdData),
                                cnt: accData.length,
                                griddet2: Ext.util.JSON.encode(purupdData),
                                cnt2: purData.length,

                                flagtype: gstFlag,
            
                                finid: ginFinid,
                                finyear: gstfinyear,
                                compcode: ginCompcode,
                                accrefseq: seqno,

                                docseqno  : docseqno,
                                dnseqno   : dnseqno,


                                vouno: txtDnNo.getRawValue(),
                                voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                bankname: "",
                                refno:  txtPartyBillNo.getRawValue(),
                                refdate: Ext.util.Format.date(dtpBilldate.getValue(), "Y-m-d"),
                                voutype: dntype,
                                paymode: "",
                                output: output,

                                party   : ledpartycode,
                                partyledcode : accledcode,
                                gltype   :   ledDRCR,
                                drcrledger: cmbCreditLedger.getValue(),
                                taxable : txtTaxableValue.getValue(),
                                cgstper: txtCgstper.getValue(),
                                cgstval: txtCgstvalue.getRawValue(),
                                sgstper: txtSgstper.getValue(),
                                sgstval: txtSgstvalue.getRawValue(),
                                igstper: txtIgstper.getValue(),
                                igstval: txtIgstvalue.getRawValue(),

                                rounding : txtRounding.getValue(), 
                                roundoff : roundoff,   
                                totalamount: Number(txtPartyAmount.getValue()),
                                others : Number(txtOtherAmt.getValue()),
                             
                                cgst  : cmbCGSTledger.getValue(),
                                sgst  : cmbSGSTledger.getValue(),
                                igst  : cmbIGSTledger.getValue(),

                                usercode : GinUserid, 
                                reason   : txtReason.getRawValue(),
                                remarks  : txtRemarks.getRawValue(),
                                ratetype : rateopt,

                            },
                            callback: function (options, success, response)
                            {
                                var obj = Ext.decode(response.responseText);
                                if (obj['success'] === "true") {
				    Ext.MessageBox.alert("Record saved with Voucher No - -" + obj['vouno']);
				    RefreshData();


                                } else {
                                    Ext.MessageBox.alert("Debit Note", "Record Not Saved ");
                                }
                            }
                        });
                    }
                }
            });
        		}
   }   

    var DebitNoteEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Debit Note Entry',
        header: false,
        width: 438,
        height: 280,
        bodyStyle: {"background-color": "#fff0ff"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x: 0,
        y: 0,
        frame: false,
        id: 'DebitNoteEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, []),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
              {
                    text: 'Add',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                           gstFlag = "Add";
			   RefreshData();
                    }
                    }
                }, '-',
                {
//save
                    text: 'Save',
                    id  : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/save.png',
                    handler: function () {
                               if (ginFinid < 24)
                                  save_click();
                               else
                                  save_clickNew();                              
                  	}

                }, '-',
//edit 
                 {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                               edit_click();    
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {

                            RefreshData();
                        }
                    }
                }, '-',
                 {
                    text: 'View',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                        
                        if(gstFlag == 'Edit')
                        {
                        var v1 = ginCompcode
                        var v2 = ginFinid
                        var v3=Ext.getCmp('cmbDNNo').getRawValue();
                        var p1 = "&compcode=" + encodeURIComponent(v1);
			var p2 = "&fincode=" + encodeURIComponent(v2);
			var p3 = "&vouno=" + encodeURIComponent(v3);
			var p4 = "&dept=" + encodeURIComponent('S');

	                var param = (p1+p2+p3+p4) ;

          if (rateopt == "USD")
             window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDebitNoteVoucherUSD.rptdesign&__format=pdf' + param, '_blank');
          else
             window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepDebitNoteVoucher.rptdesign&__format=pdf' + param, '_blank');
  
                        }
                        }
                    }
                }, '-',
                
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            StoreDebiteNoteEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width : 870,
                height: 60,
                x: 2,
                y: 0,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [txtDnNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [cmbDNNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 250,
                        y: 10,
                        labelWidth: 60,
                        border: false,
                        items: [dtpVouDate]
                    }, 



		    {
			xtype: 'fieldset',
			title: '',
			labelWidth: 150,
			width: 600,
			x: 500,
			y: -8,
			defaultType: 'textfield',
			border: false,
			items: [optRate]
		    },
		    {
			xtype: 'fieldset',
			title: 'RATE/USD',
			labelWidth: 1,
			width: 150,
			x: 700,
			y: 3,
			defaultType: 'textfield',
			border: true,
			items: [txtINRRate]
		    },
                ]
            },
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
                        width: 370,
                        height: 80,
                        x: 880,
                        y: 50,
                        border: true,
                        layout: 'absolute',
                        items: [


                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 300,
                                width: 250,
                                x: 5,
                                y: -10,
                                border: false,
                                items: [lblReason]
                            },

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

            {xtype: 'fieldset',
                title: '',

                width: 870,
                height: 460,
                x: 2,
                y: 60,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [tabAccPurchase]
             }, 


        ]
    });


 var StoreDebiteNoteEntryWindow = new Ext.Window({
        height: 600,
        width: 1300,
        y: 40,
        title: 'Stores Debit Note Entry',
        items: DebitNoteEntryFormPanel,
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
onEsc:function(){
},
        listeners:
                {
                    show: function () {
                        RefreshData();
        //               loadgstledgers();  

Ext.getCmp('dtpVouDate').focus(false, 200);
const input = document.getElementById('dtpVouDate');
const end = input.value.length;
input.setSelectionRange(0,0);
input.focus();

                    }
                }
    });
    StoreDebiteNoteEntryWindow.show();
});


