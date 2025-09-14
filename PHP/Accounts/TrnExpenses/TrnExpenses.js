/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

   var gstfinyear = localStorage.getItem('gstyear');
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');


   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var GinUser = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

   var  invfin = localStorage.getItem('invfin');

    var testbtn = 0;
    var slno;
    var accledcode = 0;
    var flag;
    var curcode;
    var dgaccrecord = Ext.data.Record.create([]);
    var dateon;
    var getdate;

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');


    var ledgercode = 0;

 
    var ledtype ="G";

    var taxtype = 'I';

    var editrow = 0;   
    var gridedit = "false";

    var accseqno = 0;
    var docseqno = 0;

    var ledDRCR ="";


    var ledpartycode =0;
    var partystate = 0;

    var supcode = 0;
    var tdscode = 0;
    var tdsledcode = 0;
    var output = 'N';
    var payterms = 0;
    var CreditLedCode = 0;

    var tabchange = 0;

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
//                save_click();       
                        if (gstFlag == "Edit")
                        {

			Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
			    if (btn == 'ok'){
				txtReason.setRawValue(text)
                                save_click();
			    }
			});
                        } 

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
                  ExpensesEntryWindow.hide();

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



    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
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
    var lblAmount = new Ext.form.Label({
        fieldLabel: 'Amount',
        id: 'lblAmount',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var  lblLedName= new Ext.form.Label({
        fieldLabel: 'Ledger',
        id: 'lblLedName',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var  lblTotTaxable = new Ext.form.Label({
        fieldLabel: 'Total Taxable',
        id: 'lblTotTaxable',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });

    var  lblTotCGST = new Ext.form.Label({
        fieldLabel: 'Total CGST',
        id: 'lblTotCGST',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });



    var  lblTotSGST = new Ext.form.Label({
        fieldLabel: 'Total SGST',
        id: 'lblTotSGST',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });



    var  lblTotIGST = new Ext.form.Label({
        fieldLabel: 'Total IGST',
        id: 'lblTotSGT',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });

    var  lblTotTDS = new Ext.form.Label({
        fieldLabel: 'Total TDS',
        id: 'lblTotTDS',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var  lblTotOthers = new Ext.form.Label({
        fieldLabel: 'Total Others ',
        id: 'lblTotOthers',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });

    var  lblTotalValue = new Ext.form.Label({
        fieldLabel: 'Total Value',
        id: 'lblTotalValue',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 700,
        height: 30,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
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
                    taxtype = "O";

                } else {
                    output = 'N';
                    taxtype = "I";
                }
                findledgers();
            }
        }
    });




    var txtPartyBillNo = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtPartyBillNo',
        width       : 110,
        name        : 'txtPartyBillNo',
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
//                   dtpBillDate.focus();
		const input = document.getElementById('dtpBillDate');
		const end = input.value.length;
		input.setSelectionRange(0,0);
		input.focus();
             }
          }

         }
    })

    var txtTotTaxValue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotTaxValue',
        width: 100,
        name: 'txtTotTaxValue',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });


    var txtTotCGST = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotCGST',
        width: 100,
        name: 'txtTotCGST',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });


    var txtTotSGST = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotSGST',
        width: 100,
        name: 'txtTotSGST',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });


    var txtTotIGST = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotIGST',
        width: 100,
        name: 'txtTotIGST',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotTDS = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotTDS',
        width: 100,
        name: 'txtTotIGST',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotOther = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotOther',
        width: 100,
        name: 'txtTotOther',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });


    var txtTotalValue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotalValue',
        width: 110,
        name: 'txtTotalValue',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });




    var txtItemTotal = new Ext.form.NumberField({
        fieldLabel: 'Sub Total',
        id: 'txtItemTotal',
        width: 120,
        name: 'txtItemTotal',
        enableKeyEvents: true,
        readOnly   : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });




  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinNewDays+1))
        {     
             alert("You are Not Allowed to Raise the document in the date of " +  Ext.util.Format.date(dt_voucher,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the document in Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Document Date is not in current finance year. Please check");
    }

 }


  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinEditDays+1))
        {     
             alert("You are Not Allowed to Modify this document. Contact HOD for Corrections.." );
             Ext.getCmp('save').setDisabled(true);  
        }
        else
        {
             Ext.getCmp('save').setDisabled(false);  

        }       
 }




    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              NewDateCheck();
              txtPartyName.focus();
           },
           keyup:function(){
              NewDateCheck();
              txtPartyName.focus();
            },
        }  	
        
    });




    var dtpBillDate = new Ext.form.DateField({
        fieldLabel: 'Bill Date',
        id: 'dtpBillDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtHSN.focus();
             }
          },
            select: function () {
            }   
        }
    });

    var LoadExpVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadExpVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsExpenses.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadExpVouNoDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
 'eh_compcode', 'eh_fincode', 'eh_expno', 'eh_expvouno', 'eh_voudate', 'eh_partycode', 'eh_partyledcode', 'eh_refno',  'eh_refdate', 'eh_taxable', 'eh_cgstamount', 'eh_sgstamount', 'eh_igstamount', 'eh_tdsamount', 'eh_round', 'eh_totalamount', 'eh_seqno', 'et_compcode', 'et_fincode', 'et_expno', 'et_slno', 'et_hsn', 'et_taxable', 'et_taxable_code', 'et_cgstper', 'et_cgstamt', 'et_cgst_ledcode', 'et_sgstper', 'et_sgstamt', 'et_sgst_ledcode', 'et_igstper', 'et_igstamt', 'et_igst_ledcode', 'et_others_reason', 'et_others', 'et_tdscode', 'et_tdsledcode', 'et_tdsamount', 'et_amount','sup_refname','sup_state','sup_gstin','et_tdsfor','et_tdsper','eh_servicetype',
'tax_ledname', 'cgst_ledname', 'sgst_ledname', 'igst_ledname', 'tds_ledname','cust_name' ,'cust_code' ,'led_custcode' 

          ])
    });

    


    var LoadPartyTDSTypedatastore = new Ext.data.Store({
        id: 'LoadPartyTDSTypedatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsExpenses.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadPartyTDSType"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['tds_code','tds_ledcode','tds_name', 'tds_description', 'tds_per'])
    });



    var LoadTDSPercentageDatastore = new Ext.data.Store({
        id: 'LoadTDSPercentageDatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsExpenses.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadTDSPer"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['tds_code','tds_ledcode','tds_name', 'tds_description', 'tds_per'])
    });




var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 120,
    height: 120,
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
            check:function(optRounding,checked){
            if(checked==true){
                 roundoff ="Y";
                 txtRounding.setValue(0);

                 grid_tot();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(optRounding,checked){
            if(checked==true){
                roundoff ="N";
                txtRounding.setValue(0);
                 grid_tot();   
               }
              }
             }}  , //,txtfreight
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(optRounding,checked){
            if(checked==true){
                roundoff ="M";
                rounding = 1;
                txtRounding.setValue(0);
                 grid_tot();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});



 var loadServiceListDatastore = new Ext.data.Store({
      id: 'loadServiceListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExpenses.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadServiceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'tds_service_type_code', 'tds_service_type_name'

      ]),
    });


 var loadTDSListDatastore = new Ext.data.Store({
      id: 'loadTDSListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/Masters/MasTDS/ClsTDS.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTDSList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'tds_code','tds_ledcode','tds_name', 'tds_description', 'tds_per'

      ]),
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
                url: 'ClsExpenses.php',      // File to connect to
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
      id: 'LoadSGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExpenses.php',      // File to connect to
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
      id: 'LoadIGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExpenses.php',      // File to connect to
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

/*
    var txtCreditLedger = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'txtCreditLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
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
            }
        }
    });

*/



    var txtHSN = new Ext.form.NumberField({
        fieldLabel: 'HSN',
        id: 'txtHSN',
        width: 100,
        name: 'txtHSN',
        style : "font-size:14px;font-weight:bold",
  //      labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'8'},
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbServiceType.focus();
             }
          }

         }

    });

    var txtOtherReason = new Ext.form.TextField({
        fieldLabel: 'Others Reason',
        id: 'txtOtherReason',
        width: 120,
        name: 'txtOtherReason',
        style : "font-size:14px;font-weight:bold",
  //      labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        //allowDecimals: false,
 //       readOnly: true,
        listeners: {
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtOtherAmount.focus();
             }
          },


            keyup: function () {

               findledgers()

            }   
        }
    });


    var txtOtherAmount = new Ext.form.NumberField({
        fieldLabel: 'Other Amts',
        id: 'txtOtherAmount',
        width: 120,
        name: 'txtOtherAmount',
  //      labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        enableKeyEvents: true,
        //allowDecimals: false,
 //       readOnly: true,
        listeners: {

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
//alert("test");
                   add_btn_click();
             }
          },
            keyup: function () {

               findledgers()

            }   
        }
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
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
    });

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
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
                   txtSgstper.focus();
             }
          },

           select: function(){

           }
        } 
});



var cmbServiceType = new Ext.form.ComboBox({
        fieldLabel      : 'Service Type',
        width           : 300,
        displayField    : 'tds_service_type_name', 
        valueField      : 'tds_service_type_code',
        hiddenName      : '',
        id              : 'cmbServiceType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadServiceListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtTaxableValue.focus();
             }
          }


        } 
});


var cmbTDSType = new Ext.form.ComboBox({
        fieldLabel      : 'TDS Type',
        width           : 200,
        displayField    : 'tds_name', 
        valueField      : 'tds_code',
        hiddenName      : '',
        id              : 'cmbTDSType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTDSListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtOtherReason.focus();
             }
          },
           select: function(){
 
			LoadTDSPercentageDatastore.removeAll();
				LoadTDSPercentageDatastore.load({
				  url:'ClsExpenses.php',
				  params:
			       	  {
				   task:"LoadTDSPer",
                                   tdscode  : cmbTDSType.getValue(),  
				  },
              		          callback: function () {
                                   var cnt=LoadTDSPercentageDatastore.getCount();
                                   tdscode = LoadTDSPercentageDatastore.getAt(0).get('tds_code');
                                   tdsledcode = LoadTDSPercentageDatastore.getAt(0).get('tds_ledcode');
                                   txtTDSPer.setValue(LoadTDSPercentageDatastore.getAt(0).get('tds_per'));
                                   if (LoadTDSPercentageDatastore.getAt(0).get('tds_code') > 0)
                                        txtTDSfor.setValue(txtTaxableValue.getValue());
                                   else
                                        txtTDSfor.setValue(0);
                                   calculateGSTvalue();

                                  }
				});


           }
        } 
});




var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
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

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtIgstper.focus();
             }
          },
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
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
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtTDSfor.focus();
             }
          },

           select: function(){

           }
        } 
});



    var txtCgstper = new Ext.form.NumberField({
        fieldLabel: 'CGST %',
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
               findledgers();

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
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
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
        fieldLabel: 'SGST %',
        id: 'txtSgstper',
        width: 40,
        name: 'txtSgstper',
        enableKeyEvents: true,
   //     readOnly: true,
        //allowDecimals: false,
        listeners: {

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbSGSTledger.focus();
             }
          },
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
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
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
        fieldLabel: 'IGST %',
        id: 'txtIgstper',
        width: 40,
        name: 'txtIgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
  //      readOnly: true,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                   if (Number(txtIgstper.getRawValue()) > 0) 
                      cmbIGSTledger.focus();
                   else
                      txtTDSfor.focus();  
           
             }
          },

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
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
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


    var txtTDSPer = new Ext.form.NumberField({
        fieldLabel: 'TDS %',
        id: 'txtTDSPer',
        width: 40,
        name: 'txtIgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
       readOnly: true,
        listeners: {
            keyup: function () {
               findledgers()
               calculateGSTvalue();
            }   
        }
    });



    var txtTDSValue= new Ext.form.NumberField({
        fieldLabel: 'Less TDS Amt',
        id: 'txtTDSValue',
        width: 110,
        name: 'txtTDSValue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners: {
            keyup: function () {

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
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
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




    function RefreshData() {
   //     flxParty.hide();
         tabchange = 0;
         Ext.getCmp('editchk').hide();
         txtUserName.setRawValue(GinUser); 
        Ext.getCmp('save').setDisabled(false);    
        Ext.getCmp('cmbVouno').setVisible(false);
ExpensesEntryFormPanel.getForm().reset();
flxTrans.getStore().removeAll();
flxAccounts.getStore().removeAll();
gstFlag = "Add";
            flxParty.hide();
            flxLedger.hide();

           accseqno = 0;
           docseqno = 0;


                   VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'EXP'
                        },
                        callback: function(){

//                                     var vno = VouNodatastore.getAt(0).get('con_value');
                                       if (VouNodatastore.getAt(0).get('con_value') < 10)
                                        {                                              
                                          vno = "00"+VouNodatastore.getAt(0).get('con_value');
                                        }                                      
                                        else
                                        {  
                                             if (VouNodatastore.getAt(0).get('con_value') < 100) 
                                             {                                              
                                              vno = "0"+VouNodatastore.getAt(0).get('con_value');                   
                                             }
                                             else 
                                             {      
                                               vno = VouNodatastore.getAt(0).get('con_value');  
                                             }
                                        } 


                                     vno =  "EXP/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtVouNo.setValue(vno);

			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
    

                        }
                    });
	
    }

    function RefreshGridData() {


    }

    function CalcTotal() {

        flxTrans.getSelectionModel().selectAll();
        var selrows = flxTrans.getSelectionModel().getCount();
        var sel = flxTrans.getSelectionModel().getSelections();
        var gintotal = 0;

        for (var i = 0; i < selrows; i++) {
//alert(Number(sel[i].data.rate));
//alert(Number(sel[i].data.value));
            gintotal = gintotal + Number(sel[i].data.value);
        }
        txtTaxableValue.setValue(gintotal);

        flxTrans.getSelectionModel().clearSelections();
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


    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsExpenses.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadExpNoList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'eh_expvouno', type: 'string', mapping: 'eh_expvouno'}
        ]),
    //    sortInfo: {field: 'eh_expvouno', direction: "ASC"}
    });


    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['con_value'])
    });

    var txtVouNo = new Ext.form.TextField({
        fieldLabel  : 'Vou No',
        id          : 'txtVouNo',
        width       : 120,
        name        : 'txtVouNo',
        readOnly    : 'true',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    })

  


    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel: 'Vou No',
        width: 120,
        store: Voucherdatastore,
        displayField: 'eh_expvouno',
        valueField: 'eh_expvouno',
        hiddenName: 'eh_expvouno',
        id: 'cmbVouno', readOnly: false,
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){

      //     Ext.getCmp('editchk').show();
                      flxTrans.getStore().removeAll();
                      flxAccounts.getStore().removeAll();
     	               LoadExpVouNoDetailsdatastore.load({
                           url: 'ClsExpenses.php',
	                   params: {
			        task: 'LoadExpVouNoDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouno.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadExpVouNoDetailsdatastore.getCount();
                                       var sno = 1

                              if (cnt>0)
                              {

                                   txtVouNo.setRawValue(cmbVouno.getRawValue());
                                   dtpVouDate.setRawValue(Ext.util.Format.date(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_voudate'),"d-m-Y"));  
                                   txtPartyBillNo.setRawValue(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_refno'));
                                   dtpBillDate.setRawValue(Ext.util.Format.date(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_refdate'),"d-m-Y"));  


                                   cmbServiceType.setValue(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_servicetype'));
                                   accseqno = LoadExpVouNoDetailsdatastore.getAt(0).get('eh_seqno');
                                   docseqno = LoadExpVouNoDetailsdatastore.getAt(0).get('eh_expno');

                                   tdscode = LoadExpVouNoDetailsdatastore.getAt(0).get('et_tdscode');
   
                                   txtPartyName.setRawValue(LoadExpVouNoDetailsdatastore.getAt(0).get('cust_name'));
                      

                                   supcode = LoadExpVouNoDetailsdatastore.getAt(0).get('eh_partycode');

                                   txtRounding.setValue(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_round'));
                                   txtPartyAmount.setValue(LoadExpVouNoDetailsdatastore.getAt(0).get('eh_totalamount'));



                                  for(var j=0; j<cnt; j++)
                                  { 
//alert("loop");
//alert(LoadExpVouNoDetailsdatastore.getAt(j).get('et_hsn'));
//alert(LoadExpVouNoDetailsdatastore.getAt(j).get('et_taxable'));
 
                                         flxTrans.getStore().insert(
	                                 flxTrans.getStore().getCount(),
                                         new dgrecord({



                                    hsncode: LoadExpVouNoDetailsdatastore.getAt(j).get('et_hsn'),
                                    taxable: LoadExpVouNoDetailsdatastore.getAt(j).get('et_taxable'),
                                    taxablecode: LoadExpVouNoDetailsdatastore.getAt(j).get('et_taxable_code'),
                                    taxablename : LoadExpVouNoDetailsdatastore.getAt(j).get('tax_ledname'),

                                    cgstper : LoadExpVouNoDetailsdatastore.getAt(j).get('et_cgstper'),
                                    cgstamt : LoadExpVouNoDetailsdatastore.getAt(j).get('et_cgstamt'),
                                    cgstledcode: LoadExpVouNoDetailsdatastore.getAt(j).get('et_cgst_ledcode'),
                                    cgstledname: LoadExpVouNoDetailsdatastore.getAt(j).get('cgst_ledname'),

                                    sgstper : LoadExpVouNoDetailsdatastore.getAt(j).get('et_sgstper'),
                                    sgstamt : LoadExpVouNoDetailsdatastore.getAt(j).get('et_sgstamt'),
                                    sgstledcode: LoadExpVouNoDetailsdatastore.getAt(j).get('et_sgst_ledcode'),
                                    sgstledname: LoadExpVouNoDetailsdatastore.getAt(j).get('sgst_ledname'),

                                    igstper : LoadExpVouNoDetailsdatastore.getAt(j).get('et_igstper'),
                                    igstamt : LoadExpVouNoDetailsdatastore.getAt(j).get('et_igstamt'),
                                    igstledcode:  LoadExpVouNoDetailsdatastore.getAt(j).get('et_igst_ledcode'),
                                    igstledname:  LoadExpVouNoDetailsdatastore.getAt(j).get('igst_ledname'),
                                    other_reason : LoadExpVouNoDetailsdatastore.getAt(j).get('et_others_reason'),
                                    other_amount : LoadExpVouNoDetailsdatastore.getAt(j).get('et_others'),
                                    tdsfor       : LoadExpVouNoDetailsdatastore.getAt(j).get('et_tdsfor'),
                                    tdsper       : LoadExpVouNoDetailsdatastore.getAt(j).get('et_tdsper'),

                                    tdscode	 : LoadExpVouNoDetailsdatastore.getAt(j).get('et_tdscode'),
                                    tdsledcode   : LoadExpVouNoDetailsdatastore.getAt(j).get('et_tdsledcode'),
                                    tdsledname   : LoadExpVouNoDetailsdatastore.getAt(j).get('tds_ledname'),
                                    tdsvalue     : LoadExpVouNoDetailsdatastore.getAt(j).get('et_tdsamount'),

                                    totval: LoadExpVouNoDetailsdatastore.getAt(j).get('et_amount'),


   // 'tax_ledname', 'cgst_ledname', 'sgst_ledname', 'igst_ledname', 'tds_ledname'

                                          })  
                                          );
                                  }
                             grid_tot();      

                              }
                         }      
                       });   

     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouno.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              flxAccounts.getStore().removeAll();
                                       var sno = 1
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');

//alert(seqno);
                                      txtVouNo.setRawValue(cmbVouno.getRawValue());
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
        
                      grid_tot2();   
                              }  
                      grid_tot2();   
                          }
                      }); 
            grid_tot2(); 
            EditDateCheck(); 
 
            }    
        }
 
    });


    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        heigt: 100,
        x: 600,
        y: 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
            testbtn = 0;
                add_btn_click();
/*
alert(testbtn);
if (testbtn == 1)
{
          grid_tot();
          CalcTotalDebitCredit();
}
*/
        },
         afterclick : function() {
            Ext.MessageBox.alert('Alert box', 'Mouse over event is called');
         }
       }  
    });

    var dgrecord = Ext.data.Record.create([]);


    var flxTrans = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 120,
        width: 1000,
        x: 10,
        y: 20,
        columns: [

            {header: "Taxable", dataIndex: 'taxable', sortable: true, width: 100, align: 'left'},
            {header: "HSN", dataIndex: 'hsncode', sortable: true, width: 100, align: 'left'},
            {header: "Taxablecode", dataIndex: 'taxablecode', sortable: true, width: 100, align: 'left',hidden : true},
            {header: "Taxable Name ", dataIndex: 'taxablename', sortable: true, width: 200, align: 'left'},
            {header: "CGST %", dataIndex: 'cgstper', sortable: true, width: 100, align: 'left'},
            {header: "CGST Amt", dataIndex: 'cgstamt', sortable: true, width: 100, align: 'left'},
            {header: "CGST Ledcode ", dataIndex: 'cgstledcode', sortable: true, width: 100, align: 'left',hidden : true},
            {header: "CGST LedName ", dataIndex: 'cgstledname', sortable: true, width: 200, align: 'left'},
            {header: "SCGST %", dataIndex: 'sgstper', sortable: true, width: 100, align: 'left'},
            {header: "SGST Amt", dataIndex: 'sgstamt', sortable: true, width: 100, align: 'left'},
            {header: "SGST Ledcode ", dataIndex: 'sgstledcode', sortable: true, width: 100, align: 'left',hidden : true},
            {header: "SGST LedName ", dataIndex: 'sgstledname', sortable: true, width: 200, align: 'left'},
            {header: "IGST %", dataIndex: 'igstper', sortable: true, width: 100, align: 'left'},
            {header: "IGST Amt", dataIndex: 'igstamt', sortable: true, width: 100, align: 'left'},
            {header: "IGST Ledcode ", dataIndex: 'igstledcode', sortable: true, width: 100, align: 'left',hidden : true},
            {header: "IGST LedName ", dataIndex: 'igstledname', sortable: true, width: 200, align: 'left'},
            {header: "Others Reason ", dataIndex: 'other_reason', sortable: true, width: 100, align: 'left'},
            {header: "Others Amount ", dataIndex: 'other_amount', sortable: true, width: 100, align: 'left'},
            {header: "TDS FOR ", dataIndex: 'tdsfor', sortable: true, width: 100, align: 'left'},
            {header: "TDS % ", dataIndex: 'tdsper', sortable: true, width: 100, align: 'left'},
            {header: "TDS CODE ", dataIndex: 'tdscode', sortable: true, width: 100, align: 'left'},
            {header: "TDS LEDCODE ", dataIndex: 'tdsledcode', sortable: true, width: 100, align: 'left',hidden : true},
            {header: "TDS LEDNAME ", dataIndex: 'tdsledname', sortable: true, width: 200, align: 'left'},
            {header: "TDS Value ", dataIndex: 'tdsvalue', sortable: true, width: 100, align: 'left'},
            {header: "Total ", dataIndex: 'totval', sortable: true, width: 100, align: 'left'},


        ],
        listeners: {
              'render': function(component) {


 
             }, 

             'cellDblclick' : function(flxTrans, rowIndex, cellIndex, e){



         Ext.Msg.show({
             title: 'EXPENSES ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxTrans.getSelectionModel();
		    var selrow = sm.getSelected();
                    gridedit = "true";
		    editrow  = selrow;

                    txtHSN.setValue(selrow.get('hsncode'));
                    txtTaxableValue.setValue(selrow.get('taxable'));
                    txtCreditLedger.setValue(selrow.get('taxablename'));
                    CreditLedCode = selrow.get('taxablecode');


                    txtCgstper.setValue(selrow.get('cgstper'));
                    txtCgstvalue.setValue(selrow.get('cgstamt'));
                    cmbCGSTledger.setValue(selrow.get('cgstledcode'));

                    txtSgstper.setValue(selrow.get('sgstper'));
                    txtSgstvalue.setValue(selrow.get('sgstamt'));
                    cmbSGSTledger.setValue(selrow.get('sgstledcode'));

                    txtIgstper.setValue(selrow.get('igstper'));
                    txtIgstvalue.setValue(selrow.get('igstamt'));
                    cmbIGSTledger.setValue(selrow.get('igstledcode'));
                    findledgers();
                    txtOtherReason.setValue(selrow.get('other_reason')),
                    txtOtherAmount.setRawValue(selrow.get('other_amount')),


                    txtTDSfor.setValue(selrow.get('tdsfor'));
                    txtTDSPer.setValue(selrow.get('tdsper'));

                    cmbTDSType.setValue(selrow.get('tdscode')); 
                    tdsledcode = selrow.get('tdsledcode');
                    txtTDSValue.setRawValue(selrow.get('tdsvalue'));

                    txtItemTotal.setRawValue(selrow.get('totval'));

                    flxTrans.getSelectionModel().clearSelections();

		}
                   else if (btn === 'no'){
                        var sm = flxTrans.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxTrans.getStore().remove(selrow);
                        flxTrans.getSelectionModel().selectAll();
                   }
         CalcTotalDebitCredit();
             }
        }); 



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
    height: 300,
    hidden:false,
    width: 1300,
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
       {header: "Remarks", dataIndex: 'remarks', sortable: true, width: 500, align: 'left'},
    ],

    store: [],
constructor: function(config) {
      this.initConfig(config);
      return this;
},

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
                url: 'ClsExpenses.php',      // File to connect to
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
                url: 'ClsExpenses.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name','cust_type','led_custcode','cust_state','cust_cr_days'
 

      ]),
    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExpenses.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name','cust_type','led_custcode','cust_state'
 

      ]),
    });


function grid_chk_flxParty()
{

		var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){
                                tdscode    = 0;
                                tdsledcode = 0;
				supcode    = selrow.get('cust_code');
				ledtype    = selrow.get('cust_type');
				partystate = selrow.get('cust_state');
				payterms   = selrow.get('cust_cr_days');

                                txtPartyBillNo.focus();
//				txtAccountName.setValue(selrow.get('cust_code'));
				txtPartyName.setValue(selrow.get('cust_name'));
//                                txtCredit.focus() 
                                flxParty.hide();   

				LoadPartyTDSTypedatastore.removeAll();
				LoadPartyTDSTypedatastore.load({
				  url:'ClsExpenses.php',
				  params:
			       	  {
				   task:"LoadPartyTDSType",
                                   supcode  : supcode,  
				  },
              		          callback: function () {
                                   var cnt=LoadPartyTDSTypedatastore.getCount();
                                   tdscode = LoadPartyTDSTypedatastore.getAt(0).get('tds_code');
                                   tdsledcode = LoadPartyTDSTypedatastore.getAt(0).get('tds_ledcode');
                                   cmbTDSType.setValue(LoadPartyTDSTypedatastore.getAt(0).get('tds_code'));
                                   txtTDSPer.setValue(LoadPartyTDSTypedatastore.getAt(0).get('tds_per'));


//                                   if (LoadPartyTDSTypedatastore.getAt(0).get('tds_code') > 0)
//                                   {     
//                                        txtTDSfor.setValue(txtTaxableValue.getValue());
//                                   }
//                                   else
//                                   { 
//                                     txtTDSfor.setValue(0);
//                                   }

                                   calculateGSTvalue();
 
                                  }
				});






			}
}




function grid_chk_flxLedger()
{

        CreditLedCode = 0;
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){
		tdscode    = 0;
		tdsledcode = 0;
		CreditLedCode    = selrow.get('cust_code');
		txtCreditLedger.setValue(selrow.get('cust_name'));
		flxLedger.hide();   
	}
}

   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        hideHeaders : false,
        sm: new Ext.grid.RowSelectionModel(),
	enableKeyEvents: true,
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 500,
        width: 520,
        id :  'flxLedger',
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "Led type", dataIndex: 'cust_type',sortable:true,width:60,align:'left',hidden:true},   
		{header: "party Code", dataIndex: 'led_custcode',sortable:true,width:60,align:'left',hidden:true},  
		{header: "State", dataIndex: 'cust_state',sortable:true,width:60,align:'left',hidden:true},  
 
        ],
        store:loadSearchLedgerListDatastore,

        listeners:{	


                   'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
                                   grid_chk_flxLedger();
                                }
                             });
                     },      
                    'cellDblclick' : function(flxLedger, rowIndex, cellIndex, e){
                  	 grid_chk_flxLedger();
			}
		}
 
    
   });


   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        hideHeaders : false,
        sm: new Ext.grid.RowSelectionModel(),
	enableKeyEvents: true,
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 500,
        width: 520,
        id :  'flxParty',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "Led type", dataIndex: 'cust_type',sortable:true,width:60,align:'left',hidden:true},   
		{header: "party Code", dataIndex: 'led_custcode',sortable:true,width:60,align:'left',hidden:true},  
		{header: "State", dataIndex: 'cust_state',sortable:true,width:60,align:'left',hidden:true},  
 		{header: "cust_cr_days", dataIndex: 'cust_cr_days',sortable:true,width:60,align:'left',hidden:true},  
        ],
        store:loadSearchPartyListDatastore,

        listeners:{	


                   'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
                                   grid_chk_flxParty();
                                }
                             });
                     },      
                    'cellDblclick' : function(flxParty, rowIndex, cellIndex, e){
                  	 grid_chk_flxParty();
			}
		}
 
    
   });

function calculateGSTvalue(){
var partyvalue = 0;
var cgstamt1 = 0;
var sgstamt1 = 0;
var igstamt1 = 0;


 

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




       if (txtTDSfor.getValue() > 0 && txtTDSPer.getValue()>0)
       {
          var tdsval = Math.round(txtTDSfor.getValue() * Number(txtTDSPer.getValue())/100* 100) / 100;       
          txtTDSValue.setRawValue(tdsval.toFixed(0));
       }     
       else
          txtTDSValue.setValue(0);


// alert(txtRounding.getValue());

       partyvalue = Number(txtTaxableValue.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtOtherAmount.getValue()) - Number(txtTDSValue.getValue()) ;

          txtItemTotal.setRawValue(Ext.util.Format.number( partyvalue,'0.00'));

}


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsExpenses.php',
		params:
		{
			task   :"loadSearchPartylist",
			ledger  : txtPartyName.getRawValue(),
		},
        });
}

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsExpenses.php',
		params:
		{
			task   :"loadSearchLedgerlist",
			ledger : txtCreditLedger.getRawValue(),
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
	        flxParty.show();
                flxParty.getEl().setStyle('z-index','10000');
	        flxParty.show();
	        loadSearchPartyListDatastore.removeAll();
	        if (txtPartyName.getRawValue() != '')
	            PartySearch();
            },
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
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



    var txtCreditLedger = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtCreditLedger',
        width: 300,
        name: 'txtCreditLedger',
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {

	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
	        if (txtCreditLedger.getRawValue() != '')
	            LedgerSearch();
            },
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtPartyBillNo.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          }

         }  
    });



    var txtTaxableValue = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value ',
        id: 'txtTaxableValue',
        width: 110,
        name: 'txtTaxableValue',
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        //allowDecimals: false,
 //       readOnly: true,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtCreditLedger.focus();
             }
          },
            keyup: function () {
                        if (tdscode > 0)
                            txtTDSfor.setValue(txtTaxableValue.getValue());
                        else
                            txtTDSfor.setValue(0);



               findledgers()

            }   
        }
    });


    var txtTDSfor = new Ext.form.NumberField({
        fieldLabel: 'TDS for ',
        id: 'txtTDSfor',
        width: 110,
        name: 'txtTDSfor',
        enableKeyEvents: true,
        //allowDecimals: false,
 //       readOnly: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbTDSType.focus();
             }
          },
            keyup: function () {

               findledgers()

            }   
        }
    })

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 685,
        height: 50,
        name: 'narration',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });
	

function findledgers()
{

            	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: 'ClsExpenses.php',
                           params: {
		                task    : "loadCGSTledgers",
				taxtype : taxtype,
				gsttype : partystate,
			 	gstper  : txtCgstper.getValue(),
                           },
                   	   callback:function()
	                   {
		               var cnt = LoadCGSTLedgerDataStore.getCount(); 
			       if (cnt > 0) 
                               cmbCGSTledger.setValue(LoadCGSTLedgerDataStore.getAt(0).get("led_code"));

                           } 
                       });

               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: 'ClsExpenses.php',
                           params: {
		                task: "loadSGSTledgers",
				taxtype : taxtype,
				gsttype : partystate,
			 	gstper  : txtCgstper.getValue(),
                           },
	          	   callback:function()
	                   {
		               var cnt = LoadSGSTLedgerDataStore.getCount(); 
			       if (cnt > 0) 
                               cmbSGSTledger.setValue(LoadSGSTLedgerDataStore.getAt(0).get("led_code"));

                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: 'ClsExpenses.php',
                           params: {
		                task: "loadIGSTledgers",
				taxtype : taxtype,
				gsttype : partystate,
			 	gstper  : txtIgstper.getValue(),
                           },
	          	   callback:function()
	                   {
		               var cnt = LoadIGSTLedgerDataStore.getCount(); 
			       if (cnt > 0) 
                               cmbIGSTledger.setValue(LoadIGSTLedgerDataStore.getAt(0).get("led_code"));

                           } 
                       });  
     calculateGSTvalue();
}


var tabAccPurchase = new Ext.TabPanel({
    id          : 'tabAccPurchase',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 460,
    width       : 1310,	
    x           : 10,
    y           : 0,
listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabAccPurchase.getActiveTab();
                   if (activeTab.id == 'tab2')
    //                   alert("The active tab in the panel is " + activeTab.id);
 
           {
           tabchange = 1;
           grid_tot();

           CalcTotalDebitCredit(); 
           }

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
                        x: 10,
                        y: 10,
                        border: false,
                        items: [txtPartyName]
                    },




                    
		    {xtype: 'fieldset',
		        title: '',
		        id   : 'hidecontrol',  
		        width: 350,
		        height: 420,
		        x: 100,
		        y: 40,
		        border: false,
		        layout: 'absolute',
		        style: 'padding:0px',
		        items: [flxParty]
		     },    



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 250,
                x: 430,
                y: 30,
                border: false,
                items: [lblAmount]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 100,
                x: 650,
                y: 30,
                border: false,
                items: [lblLedName]
            },

		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 110,
		                width: 250,
		                x: 300,
		                y: 50,
		                border: false,
		                items: [txtTaxableValue]
		            },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 350,
				x: 540,
				y: 50,
				defaultType: 'textfield',
				border: false,
				items: [txtCreditLedger]
			    },

		    {xtype: 'fieldset',
		        title: '',
		        id   : 'hidecontrol2',  
		        width: 350,
		        height: 420,
		        x: 540,
		        y: 80,
		        border: false,
		        layout: 'absolute',
		        style: 'padding:0px',
		        items: [flxLedger]
		     },    

			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 50,
				width: 400,
				x: 450,
				y: 10,
				defaultType: 'textfield',
				border:false,
				items: [txtHSN]
			    },

			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 450,
				x: 650,
				y: 10,
				defaultType: 'textfield',
				border:false,
				items: [cmbServiceType]
			    },



                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 10,
                        y: 40,
                        border: false,
                        items: [txtPartyBillNo]
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 250,
                        x: 10,
                        y: 70,
                        border: false,
                        items: [dtpBillDate]
                    },
			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 60,
				width: 200,
				x: 300,
				y: 80,
				defaultType: 'textfield',
				border:false,
				items: [txtCgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 410,
				y: 80,
				defaultType: 'textfield',
				border: false,
				items: [txtCgstvalue]
			    },
		            {
		                xtype: 'fieldset',
		                title: '',
		                labelWidth: 1,
		                width: 350,
		                x: 540,
		                y: 80,
		                border: false,
		                items: [cmbCGSTledger]
		            },

	                    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 200,
				x: 750,
				y: 30,
				defaultType: 'textfield',
				border: false,
				items: [chkOutput]
			    },

	                    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 200,
				x: 1200,
				y: 90,
                                height : 80, 
				border: false,
				items: [btnAdd]
			    },



			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 60,
				width: 200,
				x: 300,
				y: 110,
				defaultType: 'textfield',
				border:false,
				items: [txtSgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 410,
				y: 110,
				defaultType: 'textfield',
				border: false,
				items: [txtSgstvalue]
			    },

			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 1,
			        width: 350,
			        x: 540,
			        y: 110,
			        border: false,
			        items: [cmbSGSTledger]
			    },
			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 60,
				width: 200,
				x: 300,
				y: 140,
				defaultType: 'textfield',
				border:false,
				items: [txtIgstper]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 150,
				x: 410,
				y: 140,
				defaultType: 'textfield',
				border: false,
				items: [txtIgstvalue]
			    },


			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 1,
			        width: 350,
			        x: 540,
			        y: 140,
			        border: false,
			        items: [cmbIGSTledger]
			    },

			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 60,
			        width: 350,
			        x: 100,
			        y: 170,
			        border: false,
			        items: [txtTDSfor]
			    },


			    {
			        xtype: 'fieldset',
			        title: '',
			        labelWidth: 60,
			        width: 350,
			        x: 300,
			        y: 170,
			        border: false,
			        items: [cmbTDSType]
			    },



			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 45,
				width: 210,
				x: 580,
				y: 170,
				defaultType: 'textfield',
				border:false,
				items: [txtTDSPer]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 280,
				x: 680,
				y: 170,
				defaultType: 'textfield',
				border: false,
				items: [txtTDSValue]
			    },


			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 200,
				x: 890,
				y: 50,
				defaultType: 'textfield',
				border:false,
				items: [txtOtherReason]
			    },



			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 90,
				width: 200,
				x: 890,
				y: 80,
				defaultType: 'textfield',
				border:false,
				items: [txtOtherAmount]
			    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 250,
                        x: 890,
                        y: 120,
                        border: false,
                        items: [txtItemTotal]
                    },





			     {
				xtype: 'fieldset',
				title: '',
				labelWidth: 50,
				width: 1000,
				x: 10,
				y: 200,
				defaultType: 'textfield',
				border:false,
				items: [flxTrans]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 100,
				width: 600,
				x: 1050,
				y: 150,
				defaultType: 'textfield',
				border: false,
				items: [optRounding]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 100,
				width: 300,
				x: 1050,
				y: 290,
				defaultType: 'textfield',
				border: false,
				items: [txtRounding]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 100,
				width: 300,
				x: 1050,
				y: 320,
				defaultType: 'textfield',
				border: false,
				items: [txtPartyAmount]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 20,
				y: 320,
				border: false,
				items: [lblTotTaxable]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 150,
				y: 320,
				border: false,
				items: [lblTotCGST]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 270,
				y: 320,
				border: false,
				items: [lblTotSGST]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 385,
				y: 320,
				border: false,
				items: [lblTotIGST]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 505,
				y: 320,
				border: false,
				items: [lblTotTDS]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 250,
				x: 620,
				y: 320,
				border: false,
				items: [lblTotOthers]
			    },



			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 150,
				width: 300,
				x: 780,
				y: 320,
				defaultType: 'textfield',
				border: false,
				items: [lblTotalValue]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 10,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotTaxValue]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 130,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotCGST]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 250,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotSGST]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 370,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotIGST]
			    },
			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 490,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotTDS]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 610,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotOther]
			    },

			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 1,
				width: 300,
				x: 760,
				y: 340,
				defaultType: 'textfield',
				border: false,
				items: [txtTotalValue]
			    },


			    {
				xtype: 'fieldset',
				title: '',
				labelWidth: 70,
				width: 800,
				height: 110,
				x: 10,
				y:  370,
				defaultType: 'textfield',
				border: false,
				items: [txtNarration]
		 
			   },

                     ] ,

            listeners: {
                'tabchange': function(panel, tab){
 //                   alert("1");
                }
            }


                   },
                   {
                     xtype: 'panel',
                     id   : 'tab2',
                     title: 'LEDGER POSTING DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [ flxAccounts ,








            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 100,
                y: 360,
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
                y: 360,
                defaultType: 'textfield',
                border: false,
                items: [txtTotCredit]
            }, 

                     ]  
                   },
                  ],

});



function add_btn_click()
{



        var gstInsert = "true";
        if (txtPartyName.getValue() == 0) {
            gstInsert = "false";
            Ext.MessageBox.alert("Purchases", "Select Party / Ledger");
        }

        if (txtCreditLedger.getValue() == 0 && txtTaxableValue.getValue() > 0 ) {
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


        if (cmbServiceType.getValue() == 0 ) {
            gstInsert = "false";
            Ext.MessageBox.alert("Purchases", "Select Service Type");
            cmbServiceType.focus();
        }

        if (txtItemTotal.getValue() == 0) {
            gstInsert = "false";
            Ext.MessageBox.alert("Purchases", "TOTAL AMOUNT IS WRONG");
     
        }



        var cnt = 0;

        if (gridedit === "true")
        {

                flxTrans.getSelectionModel().selectAll();
                var selrows = flxTrans.getSelectionModel().getCount();
                var sel = flxTrans.getSelectionModel().getSelections();

			var idx = flxTrans.getStore().indexOf(editrow);
               		sel[idx].set('hsncode' , txtHSN.getRawValue());
	 		sel[idx].set('taxable'   , Number(txtTaxableValue.getRawValue()));
			sel[idx].set('taxablecode'  , CreditLedCode);
			sel[idx].set('taxablename' , txtCreditLedger.getRawValue());
               		sel[idx].set('cgstper' , txtCgstper.getValue());
	 		sel[idx].set('cgstamt'   , Number(txtCgstvalue.getRawValue()));
			sel[idx].set('cgstledcode'  , cmbCGSTledger.getValue());
			sel[idx].set('cgstledname' , cmbCGSTledger.getRawValue());

               		sel[idx].set('sgstper' , txtSgstper.getValue());
	 		sel[idx].set('sgstamt'   , Number(txtSgstvalue.getRawValue()));
			sel[idx].set('sgstledcode'  , cmbSGSTledger.getValue());
			sel[idx].set('sgstledname' , cmbSGSTledger.getRawValue());

               		sel[idx].set('igstper' , txtIgstper.getValue());
	 		sel[idx].set('igstamt'   , Number(txtIgstvalue.getRawValue()));
			sel[idx].set('igstledcode'  , cmbIGSTledger.getValue());
			sel[idx].set('igstledname' , cmbIGSTledger.getRawValue());

               		sel[idx].set('other_reason' , txtOtherReason.getRawValue());
	 		sel[idx].set('other_amount' , Number(txtOtherAmount.getRawValue()));
			sel[idx].set('tdsfor'  , txtTDSfor.getValue());
			sel[idx].set('tdsper'  , txtTDSPer.getValue());
               		sel[idx].set('tdscode' ,  cmbTDSType.getValue());
	 		sel[idx].set('tdsledcode' , tdsledcode);
			sel[idx].set('tdsledname' , cmbTDSType.getRawValue());
			sel[idx].set('tdsvalue'  , txtTDSValue.getValue());
			sel[idx].set('totval'  , txtItemTotal.getValue());
			sel[idx].set('servicetype'  , cmbServiceType.getValue()); 

			flxTrans.getSelectionModel().clearSelections();
			gridedit = "false";
                        testbtn = 1;
//                        grid_tot();

                        //CalcTotalDebitCredit();
	 }//if(gridedit === "true")
    else

        if (gstInsert === "true") {

           var totamt;
           var RowCnt = flxTrans.getStore().getCount() + 1;
           flxTrans.getStore().insert(
                flxTrans.getStore().getCount(),
                new dgrecord({
                    hsncode: txtHSN.getValue(),
                    taxable: txtTaxableValue.getValue(),          
                    taxablecode: CreditLedCode,
                    taxablename : txtCreditLedger.getRawValue(),

                    cgstper : txtCgstper.getValue(),
                    cgstamt : txtCgstvalue.getValue(),
                    cgstledcode: cmbCGSTledger.getValue(),
                    cgstledname: cmbCGSTledger.getRawValue(),

                    sgstper : txtSgstper.getValue(),
                    sgstamt : txtSgstvalue.getValue(),
                    sgstledcode: cmbSGSTledger.getValue(),
                    sgstledname: cmbSGSTledger.getRawValue(),

                    igstper : txtIgstper.getValue(),
                    igstamt : txtIgstvalue.getValue(),
                    igstledcode: cmbIGSTledger.getValue(),
                    igstledname: cmbIGSTledger.getRawValue(),
                    other_reason : txtOtherReason.getValue(),
                    other_amount : txtOtherAmount.getRawValue(),
                    tdsfor       : txtTDSfor.getRawValue(),
                    tdsper       : txtTDSPer.getValue(),
                    tdscode      : cmbTDSType.getValue(),
                    tdsledcode   : tdsledcode,
                    tdsledname   : cmbTDSType.getRawValue(),
                    tdsvalue     : txtTDSValue.getRawValue(),
                    totval       : txtItemTotal.getValue(),
                    servicetype  : cmbServiceType.getValue(),

                })
               );

 //         grid_tot();
//          CalcTotalDebitCredit();
           testbtn = 1;
          }
           grid_tot();
           CalcTotalDebitCredit();   

                   
}




function flxaccupdation() {

       
        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;

        var rounding =  txtRounding.getValue() ;
        flxAccounts.getStore().removeAll();


        var partyamt =   Number(txtPartyAmount.getValue()) +   Number(txtTotTDS.getValue());


        var k = 0;
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgaccrecord({
              slno      : RowCnt1,
	      ledcode   : supcode,
	      ledname   : txtPartyName.getRawValue(),
	      debit     : "0",
              credit    : Ext.util.Format.number(partyamt,'0.00'),//  txtPartyAmount.getValue(),
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              ledtype   : "P",
              remarks   : txtNarration.getRawValue(),
              }) 
        );

        if (Number(txtTotTDS.getValue()) > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgaccrecord({
		      slno      : RowCnt1,
		      ledcode   : supcode,
		      ledname   : txtPartyName.getRawValue(),
		      debit     : Ext.util.Format.number(Number(txtTotTDS.getValue()),'0.00'),
		      credit    : 0,
		      billno    : txtPartyBillNo.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
		      ledtype   : "P",
                      remarks   : "TDS Amount for Rs."+partyamt
		      }) 
		);
        } 

  //       this.flxAccounts;
  //       flxAccounts.getSelectionModel().clearSelections();

// alert("test 1");

	var Row= flxTrans.getStore().getCount();
	flxTrans.getSelectionModel().selectAll();
        var sel=flxTrans.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
//alert(i);
            purlcode =  Number(sel[i].data.taxablecode); 
            purlname =  sel[i].data.taxablename; 
            puramt   =  Number(sel[i].data.taxable); 

            cgstlcode =  Number(sel[i].data.cgstledcode); 
            sgstlcode =  Number(sel[i].data.sgstledcode); 
            igstlcode =  Number(sel[i].data.igstledcode); 
            cgstlname =  sel[i].data.cgstledname; 
            sgstlname =  sel[i].data.sgstledname; 
            igstlname =  sel[i].data.igstledname; 
            cgstamt   =  Number(sel[i].data.cgstamt);
            sgstamt   =  Number(sel[i].data.sgstamt);
            igstamt   =  Number(sel[i].data.igstamt);

            otheramt  = Number(sel[i].data.other_amount);
            tdsledcode = Number(sel[i].data.tdsledcode);
            tdsledname =  sel[i].data.tdsledname; 
            tdstamt   =  Number(sel[i].data.tdsvalue);
     

            tdsledcode = 1681;
            tdsledname =  'TDS PAYABLE'; 

  
   


//-- For Purchase Ledger
            dbamt = 0;
            k =0;

	
           flxAccounts.getSelectionModel().selectAll();

            var selrows = flxAccounts.getSelectionModel().getCount();

            var sel1 = flxAccounts.getSelectionModel().getSelections();

            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == purlcode )
                {    
//alert(dbamt);
                   dbamt =  puramt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', Ext.util.Format.number(dbamt,"0.00"));
                   k =1;
                }
            }
            if (k==0 && puramt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgaccrecord({
			      slno      : RowCnt1,
			      ledcode   : purlcode,
			      ledname   : purlname,
			      debit     : puramt,
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),             
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end



//-- For CGST Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == cgstlcode )
                {    
                   dbamt =  cgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && cgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgaccrecord({
			      slno      : RowCnt1,
			      ledcode   : cgstlcode,
			      ledname   : cgstlname,
			      debit     : cgstamt,
			      billno    : txtPartyBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),            
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For SGST Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == sgstlcode )
                {    
                   dbamt =  sgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && sgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgaccrecord({
			      slno      : RowCnt1,
			      ledcode   : sgstlcode,
			      ledname   : sgstlname,
			      debit     : sgstamt,
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),        
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

//-- For IGST Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == igstlcode )
                {    
                   dbamt =  igstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && igstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgaccrecord({
			      slno      : RowCnt1,
			      ledcode   : igstlcode,
			      ledname   : igstlname,
			      debit     : igstamt,
               billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),          
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end
 

 //-- For TDS Ledger
            dbamt = 0;
            k =0;

           flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == tdsledcode )
                {    
                   dbamt =  tdstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && tdstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgaccrecord({
			      slno      : RowCnt1,
			      ledcode   : tdsledcode,
			      ledname   : tdsledname,
			      debit     : '0',
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),          
			      credit    :  tdstamt,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end
 

/*
            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(sel1[j].get('credit'));
                  sel1[j].set('debit',Ext.util.Format.number(Number(sel1[j].get('debit')*100/100),'0.00'));
                  sel1[j].set('credit',Ext.util.Format.number(Number(sel1[j].get('credit')*100/100),'0.00'));
            }   
 */          

  //    alert("HaiHai3");   


	var rounddr = 0;
	var roundcr = 0;
	if (rounding >0)
	   rounddr = rounding;
	else
	   roundcr = Math.abs(rounding);
  
        }  


if (rounding != 0)
{
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;


        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgaccrecord({
              slno      : RowCnt1,
	      ledcode   : 1859,
	      ledname   : 'ROUNDED OFF',
	      debit     : Ext.util.Format.number(rounddr,'0.00'),
              credit    : Ext.util.Format.number(roundcr,'0.00'),
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),    
              ledtype   : "G",
              }) 
        );
}


       //     flxAccounts.getSelectionModel().clearSelections();

            grid_tot2();

//alert("test 2");

//    grid_tot2();
/*
            var diff = 0;
            diff =  txttotDebit.getRawValue()-txttotCredit.getRawValue(); 
            var sel1 = flxAccounts.getSelectionModel().getSelections();           		
            sel1[1].set('debit',sel1[1].get('debit')-diff);
       grid_tot2();
*/


}		 

function grid_tot2(){
    //     flxAccounts.getSelectionModel().clearSelections();
        var dr = 0;
        var cr = 0;


   //     flxAccounts.getSelectionModel().clearSelections();

//	var Row= flxAccounts.getStore().getCount();

//alert(Row);
  //      flxAccounts.getSelectionModel().selectAll();
//        var sel=flxAccounts.getSelectionModel().getSelections();



        flxAccounts.getSelectionModel().selectAll();
        var selrows = flxAccounts.getSelectionModel().getCount();
        var sel = flxAccounts.getSelectionModel().getSelections();


        for(var i=0;i < selrows;i++)
        {

            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }

         txtTotDebit.setRawValue(Ext.util.Format.number((dr*100/100),'0.00'));
         txtTotCredit.setRawValue(Ext.util.Format.number((cr*100/100),'0.00'));


         flxTrans.getSelectionModel().clearSelections();
         flxAccounts.getSelectionModel().clearSelections();
}


    function grid_tot() {
/*
          txtTaxableValue.setValue('');
          txtCgstper.setValue('');
          txtCgstvalue.setValue('');
          txtSgstper.setValue('');
          txtSgstvalue.setValue('');
          txtIgstper.setValue('');
          txtIgstvalue.setValue('');
          txtOtherAmount.setValue('');
          txtOtherReason.setRawValue('');
          txtTDSfor.setRawValue('');
          txtTDSValue.setValue('');


          txtItemTotal.setValue('');
*/
          var taxable = 0; 
          var cgstamt = 0; 
          var sgstamt = 0; 
          var igstamt = 0; 
          var others = 0; 
          var tds = 0; 
          var tot1 = 0; 

        flxTrans.getSelectionModel().selectAll();
        var selrows = flxTrans.getSelectionModel().getCount();
        var sel = flxTrans.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            taxable = taxable + Number(sel[i].data.taxable);
            cgstamt = cgstamt + Number(sel[i].data.cgstamt);
            sgstamt = sgstamt + Number(sel[i].data.sgstamt);
            igstamt = igstamt + Number(sel[i].data.igstamt);

            others  = others  + Number(sel[i].data.other_amount);
            tds     = tds  + Number(sel[i].data.tdsvalue);

            tot1    = tot1    + Number(sel[i].data.totval);

        }

        txtTotTaxValue.setRawValue(taxable);
        txtTotCGST.setRawValue(cgstamt);
        txtTotSGST.setRawValue(sgstamt);
        txtTotIGST.setRawValue(igstamt);
        txtTotOther.setRawValue(others);
        txtTotalValue.setRawValue(tot1);
        txtTotTDS.setRawValue(tds);



          txtTaxableValue.setValue('');
          txtCgstper.setValue('');
          txtCgstvalue.setValue('');
          txtSgstper.setValue('');
          txtSgstvalue.setValue('');
          txtIgstper.setValue('');
          txtIgstvalue.setValue('');
          txtOtherAmount.setValue('');
          txtOtherReason.setRawValue('');
          txtTDSfor.setRawValue('');
          txtTDSValue.setValue('');


          txtItemTotal.setValue(''); 
           var netamt   = 0;
           var rounding = 0;  

//alert(roundoff);

        if (roundoff == "Y")           
        {    

           netamt   = Math.round(tot1*100/100);
           rounding = Number(netamt)-Number(tot1);
  
           txtPartyAmount.setRawValue(Ext.util.Format.number(netamt,'0.00'));
           txtRounding.setRawValue(Ext.util.Format.number(rounding,"0.00"));
        
        }
        else if (roundoff == "N")           
        {  
           txtPartyAmount.setValue(tot1.toFixed(2));   
           txtRounding.setValue(0);

        }   
        else           
        {  
//alert(totvalue);
   //        totgrnvalue =  totvalue.toFixed(2);    
 //   alert(totgrnvalue);
        }   

        var v1 = cgstamt + sgstamt + igstamt + others;
        var rem1 = "";
        var rem2 = "";

        if (v1 > 0)     
           rem1 =  " + GST + OTHERS : " + v1;   

        if (tds > 0)     
           rem2 =  " - LESS TDS AMOUNT : " + tds;   

       
        txtNarration.setRawValue("BEING CREDITED TO YOUR A/C VALUE : " + txtTotTaxValue.getRawValue() +  rem1 + rem2 + " = TOTAL AMOUNT Rs."+txtPartyAmount.getRawValue() );

          flxaccupdation();



    }




    function CalcTotalDebitCredit() {



    //    flxAccounts.getSelectionModel().selectAll();

     // flxAccounts.getSelectionModel().clearSelections();
//alert("loop");
	var Row= flxAccounts.getStore().getCount();
//alert(Row);
        var sel = flxAccounts.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        var gintotgst = 0;
        var gintottds = 0;

        for (var i = 0; i < Row; i++) {
//alert(i);
            gindbtotal = gindbtotal + Number(sel[i].data.debit);
            gincrtotal = gincrtotal + Number(sel[i].data.credit);
   //         gintotgst = gintotgst + Number(sel[i].data.gst);
    //        gintottds = gintottds + Number(sel[i].data.tdsval);
        }
//        txtTotaldbamt.setValue(Number(gindbtotal) + Number(gintotgst));
        txtTotDebit.setRawValue(gindbtotal);
        txtTotCredit.setRawValue(gincrtotal);
//        txtTotalgst.setValue(gintotgst);
//        txtTotaltds.setValue(gintottds);

    }

    function edit_click()
    {

                           gstFlag = "Edit";
                           cmbVouno.show();
                           Voucherdatastore.load({
			     url: 'ClsExpenses.php',
			     params:
				    {
				        task: "loadExpNoList",
				        fincode  : GinFinid,
				        compcode : GinCompcode,
				    }
        		     });
    }


    function showResult(btn){
        Ext.example.msg('Button Click', 'You clicked the {0} button', btn);
    };


    function showResultText(btn, text){
        Ext.example.msg('Button Click', 'You clicked the {0} button and entered the text "{1}".', btn, text);
    };



    function save_click()
    {
//alert(seqno);

                        var rcnt = flxTrans.getStore().getCount();
                        var fromdate;
                        var todate;
                        fromdate = "04/01/" + gstfinyear.substring(0, 4);
                        todate = "03/31/" + gstfinyear.substring(5, 9);


 //              Ext.MessageBox.alert("Alert", "HELLO Reason..");

/*
       Ext.MessageBox.show({
           title: 'Reason',
           msg: 'Reason for Edit:',
           width:300,
           buttons: Ext.MessageBox.OKCANCEL,
           multiline: true,
           fn: showResultText,

       });
*/




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
                            Ext.MessageBox.alert("Alert", "Voucher Date is  not in current finyear");
                        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date is not in current finyear");
                        } else if (rcnt <= 0) {
                            Ext.MessageBox.alert("Direct Purchases", "Transactions Details Not Avaliable ..");
                        } else if (Number(txtTotDebit.getRawValue()) !== Number(txtTotCredit.getRawValue())) {
                            Ext.MessageBox.alert("Direct Purchases", "The Transactions Debit and Credit Amount are not  Equal");
                        } 

                        else   if (cmbServiceType.getValue() == 0 ) {
		            Ext.MessageBox.alert("Purchases", "Select Service Type");
                        }
                        else   if (tabchange == 0 ) {
		            Ext.MessageBox.alert("Purchases", "Select LEDGER POSTING TAB and Continue");
                        }

                      	else
                        		{



                        		 Ext.Msg.show({
		                        title: 'Expenses Voucher',
		                        icon: Ext.Msg.QUESTION,
		                        buttons: Ext.MessageBox.YESNO,
		                        msg: 'Are You Sure to Add This Record?',
		                        fn: function (btn) {
                                    	 if (btn === 'yes') {

                                        var purData = flxTrans.getStore().getRange();
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
                                            url: 'FrmTrnExpensesSave.php',
                                            params: {

                                                finid: GinFinid,
                                                finyear: gstfinyear,
                                                compcode: GinCompcode,

                                                griddet: Ext.util.JSON.encode(accupdData),
                                                cnt: accData.length,

                                                griddet2: Ext.util.JSON.encode(purupdData),
                                                cnt2: purData.length,

                                                flagtype: gstFlag,                            

                                                accrefseq : accseqno,
                                                conval    : docseqno,
                                                vouno: txtVouNo.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                voutype: 'EXP',

                                                party   : supcode,
   
                                                refno:  txtPartyBillNo.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpBillDate.getValue(), "Y-m-d"),
  
                                                output     : output,

                                                taxable    : txtTotTaxValue.getValue(),
                                                cgstval    : txtTotCGST.getRawValue(),
                                                sgstval    : txtTotSGST.getRawValue(),
                                                igstval    : txtTotIGST.getRawValue(),
                                                tdsval     : txtTotTDS.getRawValue(),
                                                rounding   : txtRounding.getValue(),                    
                                                totalamount: Number(txtPartyAmount.getValue()),
                                              
                                                usercode   : GinUserid, 
                                                reason     : txtReason.getRawValue(),
                                                finsuffix  : invfin,
                   		                narration  : txtNarration.getRawValue(),
                                                servicetype: cmbServiceType.getValue(),
                                                payterms   : payterms,

                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] === "true") {
						    RefreshData();
						    Ext.MessageBox.alert("Expense Saved with Voucher No - -" + obj['vouno']);



                                                } else {
                                                    Ext.MessageBox.alert("Financial", "Record Not Saved ");
                                                }
                                            }
                                        });


                                    }
                                }
                            });
                        		}
    } 

    var ExpensesEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Direct Purchases Entry',
        header: false,
        width: 450,
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
        id: 'ExpensesEntryFormPanel',
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
//                           cmbVouno.setRawValue('');
                           Voucherdatastore.removeAll();
			   VouNodatastore.load({
				url: '/SHVPM/Accounts/clsAccounts.php',
				params:
				{
				    task: "LoadControlExpensesNo",
				    fincode: GinFinid,
				    compcode: GinCompcode,

				},
				callback: function(){

				    txtVouNo.setRawValue("EXP"+VouNodatastore.getAt(0).get('con_value'));
				}
			    });

                        }
                    }
                }, '-',
                {
//save
                    text: 'Save',
                    id : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/save.png',

               listeners: {
                  click: function() {
                        if (gstFlag == "Edit")
                        {
			Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
			    if (btn == 'ok'){
				txtReason.setRawValue(text)
			    }
			});
                        } 
                        save_click();
                  }
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
	           var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&vouno=" + encodeURIComponent(cmbVouno.getRawValue());
 	 	   var param = (p1 + p2 + p3);   

		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintExpenses.rptdesign&__format=pdf' + param); ; 
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
                            ExpensesEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width : 1330,
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
                        labelWidth: 70,
                        width: 220,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [txtVouNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 220,
                        x: 0,
                        y: 10,
                        border: false,
                        items: [cmbVouno]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        width: 190,
                        x: 230,
                        y: 10,
                        labelWidth: 1,
                        border: false,
                        items: [dtpVouDate]
                    }, 



                ]
            },


            {xtype: 'fieldset',
                title: '',

                width: 1330,
                height: 465,
                x: 2,
                y: 70,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [tabAccPurchase]
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
                        width: 480,
                        height: 80,
                        x: 800,
                        y: 5,
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

        ]
    });


 var ExpensesEntryWindow = new Ext.Window({
        height: 610,
        width: 1350,
        y: 30,
        title: 'Expenses Entry',
        items: ExpensesEntryFormPanel,
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

                    }
                }
        });
    ExpensesEntryWindow.show();

/*
Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
    if (btn == 'ok'){
        alert(text);
    }
});

*/

});



