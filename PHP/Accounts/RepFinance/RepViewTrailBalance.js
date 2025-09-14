
Ext.onReady(function() {
    Ext.QuickTips.init();


requires:[
    "/ext-3.4.1/examples/ux/GroupSummary.js" //your_file_name inside the ux folder
]
   var compcode = localStorage.getItem('gincompcode');
   var finid    = localStorage.getItem('ginfinid');
   var millname = localStorage.getItem('gstcompany');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');



   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  


   var yearfinid=0;
   var totdb,totcr;
   var ledname="";
   var ledgercode=0;
   var ledgertype="";
   var acctran_led_code;
   var accrefvouno,clsbal; 
   var b='';
   var pvr_cramt,pvr_dbamt;
   var monthcode;
   var typevou;
   var accref_vouno;
   var accref_voudate;
   var accref_payref_no;
   var acctrail_inv_no;
   var acctradbamt;
   var acctrancramt;
   var accref_vou_type;
   var curbal_obcramt,curbal_obdbamt,monthtype;
   var fvr_opbal,fst_dbcr, balmon;
   var dgrecord = Ext.data.Record.create([]);
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);
   var flagtypenw;

    var grpcode =0;

    var MainGroupCode = 0;
    var MainGroupName = '';


    var SubGroupCode = 0;
    var SubGroupName = '';

    var SubGroup2Code = 0;
    var SubGroup2Name = '';

    var SubLedgerCode = 0;
    var SubLedgerName = '';
    
    var ledger_debit = 0;   
    var ledger_credit = 0;

   var printtype='PDF';

   var repmonth ='';

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 


    var txttotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtdbt',
        name        : 'txtdbt',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtcredit',
        name        : 'txtcredit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txtob = new Ext.form.NumberField({
        fieldLabel  : 'Opening Balance',
        id          : 'txtob',
        name        : 'txtob',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtcb = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcb',
        name        : 'txtcb',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var lblob = new Ext.form.Label({
        fieldLabel  : 'Opening Balance',
        id          : 'lblob',
        name        : 'acob',
        width       : 80,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblcb = new Ext.form.Label({
        fieldLabel  : 'Closing Balance',
        id          : 'lblcb',
        name        : 'accb',
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 120,
        hidden:true
    });
var lblCrDrcl = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrcl',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblCrDr = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDr',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });
 




var loadGroupLedgerDatastore = new Ext.data.GroupingStore({
      id: 'loadGroupLedgerDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTB2NDgroup_alllist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
//           'subgrp', 'grp_name', 'ledgername', 'acctran_led_code', 'closing','debit','credit'

      {name:'subgrp',type:'int'},
      {name:'grp_name',type:'string'},
      {name:'cust_type',type:'string'},
      {name:'cust_name',type:'string'},
      {name:'debit',type:'float'},
      {name:'credit',type:'float'},  
      {name:'acctran_led_code',type:'int'},

      ]
      ),
      sortInfo: {field: 'subgrp', direction: 'ASC'},
            groupField: 'grp_name',
});

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
  //  title: 'Report Format type',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
               {boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});
  var Ledger2DataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: 'clsFinancials.php'
            }),
             baseParams:{task:"loadgrid"},
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'Ledger2DataStore'
        },[
           'invno','pdate','invval','atype'
          ])
    });

 var loadLedgerDetailsDatastore = new Ext.data.Store({
        id: 'loadLedgerDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_Ledger_Details"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_voudate','accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgername', 'partyledger', 'led_code' , 'accref_vou_type', 'partyledger'])
    });


 var loadTBDetailsDatastore = new Ext.data.Store({
      id: 'loadTBDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTBMaingroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'maingrp', 'grp_name','closing'


      ]),
    });



 var loadTBGrp1DetailsDatastore = new Ext.data.Store({
      id: 'loadTBGrp1DetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTB2NDgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'subgrp', 'grp_name','closing'


      ]),
    });


 var loadTBGrp2DetailsDatastore = new Ext.data.Store({
      id: 'loadTBGrp2DetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTBIIIgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'subgrp2', 'grp_name','closing'


      ]),
    });

 var loadTBLedgerDetailsDatastore = new Ext.data.Store({
      id: 'loadTBLedgerDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTB_Ledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[  'acctran_led_code', 'cust_name','cust_type', 'closing'


      ]),
    });

function myFunction() {
    window.print();
}

 /*  var yearchangeDataStore = new Ext.data.Store({
      id: 'yearchangeDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "YEARFIN"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_id', type: 'int', mapping: 'fin_id'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_id', direction: "DESC"}
    });*/




  var MonthClickVocDataStore = new Ext.data.Store({
        id: 'MonthClickVocDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadSalesDocumentList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['voudate', 'ledgername', 'voutype', 'accref_payref_no', 'acctran_dbamt', 'acctran_cramt', 'accref_vou_type','accref_vouno','accref_seqno', 'led_code','partyledger' ,'accref_voudate'])
    });

    var txtVouDate = new Ext.form.TextField({
        fieldLabel  : 'Voucher Date',
        id          : 'txtVouDate',
        name        : 'txtVouDate',
        readOnly: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtvouref = new Ext.form.TextField({
        fieldLabel  : 'Reference No',
        id          : 'txtvouref',
        name        : 'txtvoref',
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });

    var txtRefDate = new Ext.form.TextField({
        fieldLabel  : 'Ref Date',
        id          : 'txtvdate',
        name        : 'txtvdate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });








    var cmbvoc = new Ext.form.ComboBox({
        id         : 'cmbvoc',
        fieldLabel : 'Voucher No',
        width      : 100,
 	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        store:MonthClickVocDataStore,
        displayField:'accref_vouno',
        valueField:'accref_vouno',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        tabIndex:1,
        selectOnFocus:false,
        editable: false,
          listeners:{
            select :function(){
                VoucherClick();
            }
          }
    });

   var txtOpening_Debit = new Ext.form.NumberField({
        fieldLabel  : 'Opening(Db)',
        id          : 'txtOpening_Debit',
        name        : 'txtOpening_Debit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        tabindex : 2,
//        style : "font-size:14px;font-weight:bold;text-align: 'right';",
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtOpening_Credit = new Ext.form.NumberField({
        fieldLabel  : 'Opening(Cr)',
        id          : 'txtOpening_Credit',
        name        : 'txtOpening_Credit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtClosing_Debit = new Ext.form.NumberField({
        fieldLabel  : 'Closing(Db)',
        id          : 'txtClosing_Debit',
        name        : 'txtClosing_Debit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtClosing_Credit = new Ext.form.NumberField({
        fieldLabel  : 'Closing(Cr)',
        id          : 'txtClosing_Credit',
        name        : 'txtClosing_Credit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtLedgerDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtLedgerDebit',
        name        : 'txtLedgerDebit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtLedgerCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtLedgerCredit',
        name        : 'txtLedgerCredit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtGridTotalDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtGridTotalDebit',
        name        : 'txtGridTotalDebit',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtGridTotalCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtGridTotalCredit',
        name        : 'txtGridTotalCredit',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



   var txtTotalDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit',
        name        : 'txtTotalDebit',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


   var txtTotalCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit',
        name        : 'txtTotalCredit',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtTotalDebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit2',
        name        : 'txtTotalDebit2',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotalCredit2 = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit2',
        name        : 'txtTotalCredit2',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotalDebit3 = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit3',
        name        : 'txtTotalDebit3',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotalCredit3 = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit3',
        name        : 'txtTotalCredit3',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });




   var txtTotalDebit4 = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit4',
        name        : 'txtTotalDebit4',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotalCredit4 = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit4',
        name        : 'txtTotalCredit4',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

    
   var btnview = new Ext.Button({
        style   : 'text-align:center;',
        text    : " VIEW DOCUMENT",
        width   : 100,id:'btnview',
        x       : 10,
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

                   var vno = cmbvoc.getRawValue().substring(0,3);                

                   var invno = txtvouref.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&invno=" + encodeURIComponent(invno);
                   i1 = "ORIGINAL FOR BUYER";
         	   var p4 = "&displayword=" + encodeURIComponent(i1);
 	 	   var param = (p1 + p2 + p3 + p4 );   
                   if (printtype == "PDF") 
                   {
                   if (vno  == "GSI") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf' + param); 
                   }
                   else
                   {
                   if (vno  == "GSI") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                   }



	    }
	}
	});


    var flxld = new Ext.grid.EditorGridPanel({
        frame: false,
        store: Ledger2DataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
	id:'my-grid3',
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 220,
        width: 1000,
        border:false,
        x: 370,
        y: 40,
        columns: [
            {header: "Ledger Name", dataIndex: 'cust_name',width:350,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
            renderer : function(value, meta ,record) {
		    var deb=record.get('debit');
		    var cre=record.get('credit');
		    if(deb>0) {
			meta.style = "background-color:#FFDEAD;";
		    }else if(cre>0) {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	   },
            {header: "Debit", dataIndex: 'debit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'
	    },
            {header: "Credit", dataIndex: 'credit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'}
        ]
    });
    

    var txtnarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtnar',
        name        : 'txtnar',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        width       : 700
    });

    var txtnarration2 = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtnarration2',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'txtnarration2',
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 750
    });

    var txtmode = new Ext.form.TextField({
        fieldLabel  : 'Mode',
        id          : 'txtmode',
        name        : 'txtmode',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 100
    });

    var txtno = new Ext.form.TextField({
        fieldLabel  : 'No',
        id          : 'txtno',
        name        : 'txtno',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 100
    });


    var txtdate = new Ext.form.TextField({
        fieldLabel  : 'Date',
        id          : 'txtdate',
        name        : 'txtdate',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtVouDate = new Ext.form.TextField({
        fieldLabel  : 'Voucher Date',
        id          : 'txtVouDate',
        name        : 'txtVouDate',
        readOnly: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtvouref = new Ext.form.TextField({
        fieldLabel  : 'Reference No',
        id          : 'txtvouref',
        name        : 'txtvoref',
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });

    var txtRefDate = new Ext.form.TextField({
        fieldLabel  : 'Ref Date',
        id          : 'txtvdate',
        name        : 'txtvdate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });
  function VoucherClick(){

	       VouNoClickLoadDataStore.removeAll();
	       VouNoClickDetailsDataStore.removeAll();
	       AccInvNoDataStore.removeAll();
               flxld.getStore().removeAll();
	       txtVouDate.setRawValue('');
	       txtvouref.setRawValue("");
	       txtRefDate.setRawValue("");
	       txtmode.setRawValue('');
               txtno.setRawValue('');
               txtdate.setRawValue('');
               txtnarration2.setRawValue('');
               txtnarration.setRawValue('');
                VouNoClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'VouNoClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        vouno:cmbvoc.getRawValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){
//alert(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));

                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));
//                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
//                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");
                                txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");                         


                                for(var i=0;i<cnt;i++){
                                var lednam=VouNoClickLoadDataStore.getAt(i).get('cust_name');
                                var acctdbamt=VouNoClickLoadDataStore.getAt(i).get('acctran_dbamt');
                                var acctcramt=VouNoClickLoadDataStore.getAt(i).get('acctran_cramt');
                                flxld.getStore().insert(
                                flxld.getStore().getCount(),
                                new dgrecord2({
                                    cust_name:lednam,
                                    debit:acctdbamt,
                                    credit:acctcramt
                                })
                                );
                              grid_tot_trans();
                          }
                           VouNoClickDetailsDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetails',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:cmbvoc.getRawValue()
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsDataStore.getCount();
                                    if(cnt>0){
//                                        txtmode.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_paymode'));
//                                        txtvouref.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_no'));
//                                        txtRefDate.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_date'));
//                                        txtnarration2.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
                                        //txtnarration.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
//					txtvouref.setRawValue("");
					//txtRefDate.setRawValue("");
                                        AccInvNoDataStore.load({
                                            url: '/SHVPM/Accounts/clsRepFinancials.php',
                                            params:{
                                                task:'AccInvNo',
                                                fcompcode:compcode,
                                                ffinid:finid,
                                                vouno:b
                                            },
                                            callback:function(){
//                                                txtvouref.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_no'));
//                                                txtRefDate.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_date1'));
                                            }
                                         });
                                    }
                                }
                            });
                        }
                    }
                });
  }


function grid_tot(){

        var dr = 0;
        var cr = 0;
        var clo = 0;
        var Row= flxMainGroup.getStore().getCount();
        flxMainGroup.getSelectionModel().selectAll();
        var sel=flxMainGroup.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
         }


        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);

//        txtTotalDebit.setValue(Ext.util.Format.number(dr,"0.00"));
//        txtTotalCredit.setValue(Ext.util.Format.number(cr,"0.00"));

        txtTotalDebit.setRawValue(Dr2);
        txtTotalCredit.setRawValue(Cr2);

}


  function grid_tot2(){
        var dr = 0;
        var cr = 0;
        var Row1= flxMainSubGroup.getStore().getCount();

        flxMainSubGroup.getSelectionModel().selectAll();
        var sel=flxMainSubGroup.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
        }

        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);


        txtTotalDebit2.setRawValue(Dr2);
        txtTotalCredit2.setRawValue(Cr2);


         dr = 0;
         cr = 0;
        var Row1= flxMainSubGroup2.getStore().getCount();

        flxMainSubGroup2.getSelectionModel().selectAll();
        var sel=flxMainSubGroup2.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
        }

        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);


        txtGridTotalDebit.setRawValue(Dr2);
        txtGridTotalCredit.setRawValue(Cr2);

//        txtTotalDebit2.setValue(Ext.util.Format.number(dr,"0.00"));
//        txtTotalCredit2.setValue(Ext.util.Format.number(cr,"0.00"));
}


  function grid_tot3(){
        var dr = 0;
        var cr = 0;
        var Row1= flxSubGroup2.getStore().getCount();

        flxSubGroup2.getSelectionModel().selectAll();
        var sel=flxSubGroup2.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
        }
 //       txtTotalDebit3.setValue(Ext.util.Format.number(dr,"0.00"));
//        txtTotalCredit3.setValue(Ext.util.Format.number(cr,"0.00"));

        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);
        txtTotalDebit3.setRawValue(Dr2);
        txtTotalCredit3.setRawValue(Cr2)

}


  function grid_tot4(){
        var dr = 0;
        var cr = 0;
        var Row1= flxLedger.getStore().getCount();

        flxLedger.getSelectionModel().selectAll();
        var sel=flxLedger.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
        }
//        txtTotalDebit4.setValue(Ext.util.Format.number(dr,"0.00"));
//        txtTotalCredit4.setValue(Ext.util.Format.number(cr,"0.00"));

        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);
        txtTotalDebit4.setRawValue(Dr2);
        txtTotalCredit4.setRawValue(Cr2)
}



  function grid_tot5(){
        var dr = 0;
        var cr = 0;
        ledger_debit = 0;
        ledger_credit = 0;

        var Row1= flxDetails.getStore().getCount();

        flxDetails.getSelectionModel().selectAll();
        var sel=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.acctran_dbamt);
	      cr=cr+Number(sel[i].data.acctran_cramt);
        }
//        txtLedgerDebit.setValue(Ext.util.Format.number(dr,"0.00"));
//        txtLedgerCredit.setValue(Ext.util.Format.number(cr,"0.00"));

        ledger_debit = dr;
        ledger_credit = cr;

        var Dr2 = formatter.format(dr);
        var Cr2 = formatter.format(cr);
        txtLedgerDebit.setRawValue(Dr2);
        txtLedgerCredit.setRawValue(Cr2)
}

  function grid_closebal(){
	clsbal="";
        var Row1= flxMainGroup.getStore().getCount();
        flxMainGroup.getSelectionModel().selectAll();
        var sele=flxMainGroup.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            clsbal=sele[i].data.expsales;
        }
        txtcb.setRawValue(Ext.util.Format.number(clsbal,"0.00"));
}

  function grid_tot_trans(){
	pvr_dbamt="";
        pvr_cramt="";
        var Row= flxld.getStore().getCount();
        flxld.getSelectionModel().selectAll();
        var sel=flxld.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.debit);
            pvr_cramt=Number(pvr_cramt)+Number(sel[i].data.credit);
        }
        txtLtotdebit.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtLtotcredit.setRawValue(Ext.util.Format.number(pvr_cramt,"0.00"));
}

  function grid_tot_ledger(){
	totdb="";
        totcr="";
        var Row1= flxrep.getStore().getCount();
        flxrep.getSelectionModel().selectAll();
        var sele=flxrep.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totdb=Number(totdb)+Number(sele[i].data.debit);
            totcr=Number(totcr)+Number(sele[i].data.credit);
        }
        txttotdebit.setRawValue(Ext.util.Format.number(totdb,"0.00"));
        txttotcredit.setRawValue(Ext.util.Format.number(totcr,"0.00"));
}


  function grid_closebal_ledger(){
	clsbal="";
        var Row1= flxrep.getStore().getCount();
        flxrep.getSelectionModel().selectAll();
        var sele=flxrep.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            clsbal=sele[i].data.expsales;
        }
        txtcb.setRawValue(Ext.util.Format.number(clsbal,"0.00"));
}


  var VouNoClickDetailsNewDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsNewDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"VouNoClickDetailsNew"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'accref_narration','accref_payref_no','accref_payref_date'
        ])
    });


    var TdsLedgergetDataStore = new Ext.data.Store({
        id: 'TdsLedgergetDataStore',
        proxy: new Ext.data.HttpProxy({
            url:'/SHVPM/Financials/datechk.php',
            method: 'POST'
        }),
        baseParams: {task: "TdsLedgerget"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_grp_code'
        ])
    });




 var LedgerClickLoadDataStore = new Ext.data.Store({
        id: 'LedgerClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerClickLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['curbal_led_code','curbal_obcramt','curbal_obdbamt'])
    });

    var LedgerClickLoad2DataStore = new Ext.data.Store({
        id: 'LedgerClickLoad2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerClickLoad2"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['debit','credit','month','expsales'])
    });



     var AccInvNoDataStore = new Ext.data.Store({
        id: 'AccInvNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"AccInvNo"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctrail_inv_no','acctrail_inv_date'])
    });

     var LedgerCodeCrDataStore = new Ext.data.Store({
        id: 'LedgerCodeCrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerCodeCr"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctran_led_code','acctran_cramt'])
    });

     var LedgerSelDataStore = new Ext.data.Store({
        id: 'LedgerSelDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerSel"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['ledgername'])
    });

      var VouNoClickLoadDataStore = new Ext.data.Store({
        id: 'VouNoClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date'])
    });

    var VouNoClickDetailsDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickDetails"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_paymode','accref_payref_no','accref_payref_date','accref_narration'])
    });

   /*var cmbcompany = new Ext.form.ComboBox({
        fieldLabel      : 'Year',
        width           : 135,
        store      : yearchangeDataStore,
        displayField:'fin_year',
        valueField:'fin_id',
        hiddenName:'fin_year',
	style: {
            'color':'#0C5DA9',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        id:'cmbcompany',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
	emptyText: 'Select Year',
        editable: true,
        allowblank:false,
         listeners:{
                select:function(){
                    	yearfinid=Ext.getCmp('cmbcompany').getValue();
			if(yearfinid>0){	
			btnview.show();
			txtob.setRawValue('0.00');
			txtcb.setRawValue('0.00');
			txttotdebit.setRawValue('0.00');
			txttotcredit.setRawValue('0.00');
		        LedgerClick();
		        grpcodetds = 0;
		        TdsLedgergetDataStore.removeAll();
		        TdsLedgergetDataStore.load({
		            url: '/SHVPM/Financials/datechk.php',
		            params: {
		                task: 'TdsLedgerget',
				ledger:ledcod
		            },
		            callback: function () {
		             grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
			     if(grpcodetds==='65'){
				btnview.show();
			     }else{
				btnview.show();
			     }
		            }
			  });	
		     }
                }               
         }
   });*/





var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
                  ProcessMainGrpData();
             }
          }

});

var btnProcessLedger = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
		flxDetails.getStore().removeAll();     
		MonthClickVocDataStore.removeAll();
		Process_Month_Ledger_Data();
		grid_tot2();
       	 }
        }   
});

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });


    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });

    var monthstartdate2 = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate2',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });


    var monthenddate2 = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate2',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });

/*
function Process_Month_Ledger_Data()
{
              MonthClickVocDataStore.load({
                    url: 'ClsViewStatements.php',
                    params:{
                    task:'loadDocumentList',
                compcode:compcode,
                finid:finid,
                ledcode:ledgercode,
                startdate: Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){
			    acctradbamt=0;
			    acctrail_inv_no='';	
			    acctrancramt=0;	
			    accrefvouno='';	
			    accref_vou_type='';
			    accref_payref_no='';
			    ledname='';	

                            for(var i=0;i<cnt;i++){
                               party =MonthClickVocDataStore.getAt(i).get('partyledger');
                               accrefvouno=MonthClickVocDataStore.getAt(i).get('accref_vouno');
                               accrefseqnno=MonthClickVocDataStore.getAt(i).get('accref_seqno');
                               voudate   = Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('accref_voudate'),"d-m-Y"),
                               accref_payref_no=MonthClickVocDataStore.getAt(i).get('accref_payref_no');
                               acctrail_inv_no=MonthClickVocDataStore.getAt(i).get('acctrail_inv_no');
                               ledname=MonthClickVocDataStore.getAt(i).get('ledgername');
                               ledcode=MonthClickVocDataStore.getAt(i).get('acctran_ledcode');
                               acctradbamt=MonthClickVocDataStore.getAt(i).get('acctran_dbamt');
                               acctrancramt=MonthClickVocDataStore.getAt(i).get('acctran_cramt');
                               accref_vou_type=MonthClickVocDataStore.getAt(i).get('accref_vou_type');
                               if (accref_vou_type == 'GSI' ||  accref_vou_type == 'PLW'  ||  accref_vou_type == 'PFF'  ||  accref_vou_type == 'PSC'  ||  accref_vou_type == 'PSP'    )
                               {       
                                  chqno  = '';
                                  invno  = accref_payref_no;
                               }
                               else
                               {       
                                  chqno  = accref_payref_no;
                                  invno  = 0;
                               }
                                   

                           if(accref_vou_type=="BKR"){
                                   typevou="BANK RECEIPT";
                               }else  if(accref_vou_type=="BKP"){
                                   typevou="BANK PAYMENT";
                               }else  if(accref_vou_type=="CIR"){
                                   typevou="CASH RECEIPT";
                               }else  if(accref_vou_type=="CIP"){
                                   typevou="CASH PAYMENT";
                               }
                               else  if(accref_vou_type=="GJV"){
                                   typevou="JOURNAL";
                               }
                               else  if(accref_vou_type=="WA"){
                                   typevou="SALE MISLLANEOUS STORES";
                               }else  if(accref_vou_type=="WS"){
                                   typevou="SALE MISLLANEOUS ACCOUNTS";
                               }else{
                                   typevou="GENERAL";
                               }
                               var inc = 0;
                               flxDetails.getStore().insert(
                                flxDetails.getStore().getCount(),
                                new dgrecord({
                                    sno: i+1,
                                    voudate         : voudate,
                                    led_name        : party,
                                    accref_vou_type : accref_vou_type,
                                    accref_vouno    : accrefvouno,
                                    accref_payref_no: invno,
                                    acctran_dbamt   : acctradbamt,
                                    acctran_cramt   : acctrancramt,
                                    accref_seqno    : accrefseqnno,
                                    led_code        : ledcode,
                                                })
                                );
                             grid_tot2();
                            }
                        }
                    }
         });
}
*/

function find_dates(mmon)
{

    var rmon ='';
    var mdays = 0;
    var yr=0;
    

    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 

    rmon = ("0"+mmon).slice(-2);




    monthstartdate2.setValue(yr+"-"+rmon+"-01");
    monthenddate2.setValue(yr+"-"+rmon+"-"+mdays);

     Process_Month_Ledger_Data();

 }




    var txttotdebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotdebit2',
        name        : 'txttotdebit2',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotcredit2',
        name        : 'txttotcredit2',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txttotdebit3 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotdebit3',
        name        : 'txttotdebit3',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit3 = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotcredit3',
        name        : 'txttotcredit3',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txttotdebit4 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotdebit4',
        name        : 'txttotdebit4',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit4 = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotcredit4',
        name        : 'txttotcredit4',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtFinYear = new Ext.form.NumberField({
        fieldLabel  : 'Finance Year',
        id          : 'txtFinYear',
        name        : 'txtFinYear',
        width       : 80,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtLtotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtLtotdebit',
        name        : 'txtLtotdebit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtLtotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txtLtotcredit',
        name        : 'txtLtotcredit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


var lblcompany = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblcompany',
        name        : 'lblcompany',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 550
    });


var lblMainGroup = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblMainGroup',
        name        : 'lblMainGroup',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblSubGroup = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblSubGroup',
        name        : 'lblSubGroup',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

var lblSubGroup2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblSubGroup2',
        name        : 'lblSubGroup2',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblLedgerName = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblLedgerName',
        name        : 'lblLedgerName',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblLedgerName2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblLedgerName2',
        name        : 'lblLedgerName2',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

var lblLedgerName3 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblLedgerName3',
        name        : 'lblLedgerName3',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

  function MonthClick(){


                flxDetails.getStore().removeAll();

		MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(repmonth =="JANUARY"){
                    monthcode=1;
                }else  if(repmonth=="FEBRUARY"){
                    monthcode=2;
                }else  if(repmonth=="MARCH"){
                    monthcode=3;
                }else  if(repmonth=="APRIL"){
                    monthcode=4;
                }else  if(repmonth=="MAY"){
                    monthcode=5;
                }else  if(repmonth=="JUNE"){
                    monthcode=6;
                }else  if(repmonth=="JULY"){
                    monthcode=7;
                }else  if(repmonth=="AUGUST"){
                    monthcode=8;
                }else  if(repmonth=="SEPTEMBER"){
                    monthcode=9;
                }else  if(repmonth=="OCTOBER"){
                    monthcode=10;
                }else  if(repmonth=="NOVEMBER"){
                    monthcode=11;
                }else  if(repmonth=="DECEMBER"){
                    monthcode=12;
                }



                find_dates(monthcode);     



  }
    var cmbMonth = new Ext.form.ComboBox({
        id         : 'cmbMonth',
        fieldLabel : 'Month',
        width      : 250,
	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        store : ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY',
                    'AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
        displayField:'month_name',
        valueField:'month_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners:{
            select :function(){
                MonthClick();
            }
        }
    });


    var lbltot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lbltot',
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        name        : 'actot',
        width       : 80
    });

    var lblTtot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lblTtot',
        name        : 'actTot',
        width       : 80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var grpcodetds=0;

var dgrecord = Ext.data.Record.create([]);
var flxMainGroup = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 350,
    hidden:false,
    width: 400,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:140,align:'left', menuDisabled: true,
},
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:120,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:120,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'rowDblclick': function (flxMainGroup, rowIndex, cellIndex, e) {
		var sm = flxMainGroup.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                MainGroupCode = selrow.get('grpcode');
                MainGroupName = selrow.get('grpname')
                lblMainGroup.setText("Details for : " + selrow.get('grpname'));
                ProcessMainSubGrpData();

        }      
	
   }
});


var flxMainSubGroup = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:260,
    y:100,
    height: 350,
    hidden:false,
    width: 380,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:140,align:'left', menuDisabled: true,
},
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:120,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:120,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMainGroup, rowIndex, cellIndex, e) {
		var sm = flxMainSubGroup.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                SubGroupCode = selrow.get('grpcode');
                SubGroupName = selrow.get('grpname')
                lblSubGroup.setText("Details for : " + selrow.get('grpname'));
                tabOverall.setActiveTab(1);
                ProcessSubGrpData();
        }      
	
   }
});


    // define a custom summary function
    Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
        return v + (record.data.credit);
    };


var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
               flxMainSubGroup2.getStore().filter('ledgername', txtSearch.getValue());  
            }
         }  
    });


  // utilize custom extension for Group Summary
    var summary = new Ext.ux.grid.GroupSummary();

var flxMainSubGroup2 = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    scrollbar: true,
    x:300,
    y:10,
    height: 450,
    hidden:false,
    width: 650,
  //  id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	

        {header: "Description " , dataIndex: 'grp_name',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},
        {header: "Description " , dataIndex: 'subgrp',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},
        {header: "led code " , dataIndex: 'acctran_led_code',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},
        {header: "led type " , dataIndex: 'cust_type',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},
        {header: "Ledger " , dataIndex: 'cust_name',sortable:false,width:200,align:'left', menuDisabled: true,
                summaryType: 'count',
                summaryRenderer: function(v, params, data){
                    return ((v === 0 || v > 1) ? '(' + v +' Ledger)' : '(1 Ledger)');
                },
        },
        {header: "Debit" , dataIndex: 'debit', sortable:true,width:100,align:'right',summaryType: 'sum',renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }},

        {header: "Credit" , dataIndex: 'credit', sortable:true,width:100,align:'right',summaryType: 'sum',renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }},
    ],
     store: loadGroupLedgerDatastore,

 
        view: new Ext.grid.GroupingView({
            forceFit: false,
            showGroupName: false,
            enableNoGroups: false,
            enableGroupingMenu: false,
            hideGroupedColumn: true

        }),

        plugins: summary,
/*
        tbar : [{
            text: 'Toggle',
            tooltip: 'Toggle the visibility of summary row',
            handler: function(){summary.toggleSummaries();}
        }],
*/

 
        frame: true,

        clicksToEdit: 1,
        collapsible: true,
        animCollapse: false,
        trackMouseOver: false,
        //enableColumnMove: false,
        title: '',
        iconCls: 'icon-grid',
        renderTo: document.body,
        listeners:{	

	       'rowDblClick': function (flxMainSubGroup2, rowIndex, cellIndex, e) {
			var sm = flxMainSubGroup2.getSelectionModel();
			var selrow = sm.getSelected();
			ledgercode = selrow.get('acctran_led_code');
			SubLedgerCode = selrow.get('acctran_led_code');
			SubLedgerName = selrow.get('ledgername')
   
                        ledgertype = selrow.get('cust_type');

			lblLedgerName.setText("Details for : " + selrow.get('ledgername'));
			lblLedgerName2.setText("Details for : " + selrow.get('ledgername'));

			tabOverall.setActiveTab(2);
			ProcessPartyLedgerData();
                },
                'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
					var sm = flxMainSubGroup2.getSelectionModel();
					var selrow = sm.getSelected();
					ledcode = selrow.get('acctran_led_code');
					SubLedgerCode = selrow.get('acctran_led_code');
					SubLedgerName = selrow.get('ledgername')
                                        ledgertype = selrow.get('cust_type');       

					lblLedgerName.setText("Details for : " + selrow.get('ledgername'));
                           		lblLedgerName2.setText("Details for : " + selrow.get('ledgername'));
					tabOverall.setActiveTab(2);
					ProcessPartyLedgerData();
                                }
                             });
                 },
     

        }, 


});

var flxSubGroup2  = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:350,
    y:100,
    height: 350,
    hidden:false,
    width: 490,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:200,align:'left', menuDisabled: true,
},
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:130,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:130,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxSubGroup2, rowIndex, cellIndex, e) {
		var sm = flxSubGroup2.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                SubGroup2Code = selrow.get('grpcode');
                SubGroup2Name = selrow.get('grpname')
                lblSubGroup2	.setText("Details for : " + selrow.get('grpname'));
                ProcessLedgerData();
        }      
	
   }
});

var flxLedger  = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:320,
    y:100,
    height: 330,
    hidden:false,
    width: 600,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:200,align:'left', menuDisabled: true,
},
        {header: "led type " , dataIndex: 'cust_type',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:130,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:130,align:'right', menuDisabled: true,
renderer: function (val, metaData, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
//         style: 'currency',
         currency: 'INR',
         });
      }
   }
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'rowDblClick': function (flxLedger, rowIndex, cellIndex, e) {
		var sm = flxLedger.getSelectionModel();
		var selrow = sm.getSelected();
                ledcode = selrow.get('grpcode');
                ledgercode = selrow.get('grpcode');

                ledgertype = selrow.get('cust_type');
                SubLedgerCode = selrow.get('grpcode');
                SubLedgerName = selrow.get('grpname')


                lblLedgerName.setText("Details for : " + selrow.get('grpname'));
                lblLedgerName2.setText("Details for : " + selrow.get('grpname'));

                tabOverall.setActiveTab(2);
                ProcessPartyLedgerData();

        }      
	
   }
});


 var flxDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
    id: 'my-grid-font', 
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 480,
        width: 1200,
        border:false,
        x: 10,
        y: 40,

        enableKeyEvents: true,
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "Date ", dataIndex: 'voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,             },
            {header: "Description", dataIndex: 'ledgername',width:300,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('ledgername');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "Voucher Type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Vou. No.", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Ref. No.", dataIndex: 'accref_payref_no',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "Debit", dataIndex: 'acctran_dbamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Credit", dataIndex: 'acctran_cramt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Inv type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Seq. No.", dataIndex: 'accref_seqno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Led Code", dataIndex: 'led_code',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
        ],
         listeners :{



            'rowDblClick' : function(flxDetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(4);

		var sm = flxDetails.getSelectionModel();
		var selrow = sm.getSelected();
                VouNo = selrow.get('accref_vouno');


                cmbvoc.setRawValue(VouNo);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },'cellclick': function (flxDetails, rowIndex, cellIndex, e) {
                 var selected_rows =flxDetails.getSelectionModel().getSelections();
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.accref_vouno;
		         }
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
                                     }
                                }
                            });
	   },
            'rowselect' : function(flxDetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(4);
                var selerow =flxDetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        }
    });


/*
var map = new Ext.KeyMap("flxDetails", {
    key: 13, // or Ext.EventObject.ENTER
//alert("Hello");
    fn: testhello, //return false to cancel the event, or whatever you want to do in the method
    scope: this.value(),  //the 'this' variable that you would like to use inside the myHandler method
});


function testhello()
{
alert("Hai");
myobject ='01';
}

*/	



   /* var btnview2 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "OverAll",
        width   : 60,id:'btnview2',
        x       : 400,
        y       : 255,
        listeners: {
            click: function(){
                    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finyear="+encodeURIComponent(yearfinid);
                    var ledcode="&ledger="+encodeURIComponent(ledcod);

		    var param = (fin + com + ledcode) ;

	
	    }
	}
	});		

    var btnview3 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Ledger",
        width   : 60,id:'btnview3',
        x       : 400,
        y       : 255,
        listeners: {
            click: function(){
	
	    }
	}
	});*/

    var btnMainGrpPrint = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Main Group Print",
        width   : 60,
        id:'btnMainGrpPrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
             finstartdate 

                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
    var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
            	    var p5 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));

 		    var param = (p1+p2+p3+p4+p5) ;
          if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainGroup.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainGroup.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainGroup.rptdesign' + param, '_blank');

//alert(param);
                 /*   if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainGroup.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainGroup.rptdesign' + param, '_blank');*/	



	    }
	}
	});



    var btnFullTBPrint = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Full TB Print",
        width   : 60,
        id:'btnFullTBPrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
              

                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&comp="+encodeURIComponent(compcode);      
                    var p3 = "&fmdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	  
                    var p4 = "&tdate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 		    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosingNew.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosingNew.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosingNew.rptdesign' + param, '_blank');

//alert(param);
              /*      if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosingNew.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosingNew.rptdesign' + param, '_blank');*/	



	    }
	}
	});

    var btnSubGrpPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Sub Group Print",
        width: 60, 
        id: 'btnSubGrpPrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
;


                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 = "&maingroup="+encodeURIComponent(MainGroupCode);
		    var p6 = "&maingrpname="+encodeURIComponent(MainGroupName);
	            var p7 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));
       

 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainSubGroup.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainSubGroup.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainSubGroup.rptdesign' + param, '_blank');

                  /*  if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainSubGroup.rptdesign&__format=pdf&' + param, '_blank');	
                     else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBMainSubGroup.rptdesign' + param, '_blank');	*/

                }
            }

    });


    var btnSubGrpPrint2 = new Ext.Button({
        style: 'text-align:center;',
        text: " Sub Group2 Print",
        width: 60,
        id: 'btnSubGrpPrint2',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 = "&maingroup="+encodeURIComponent(SubGroupCode);
		    var p6 = "&maingrpname="+encodeURIComponent(SubGroupName);
      	    var p7 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d")); 

 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBSubGroup.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBSubGroup.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBSubGroup.rptdesign' + param, '_blank');
/*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBSubGroup.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBSubGroup.rptdesign' + param, '_blank');*/	
                }
            }

    });



    var btnSubGrpPrint3 = new Ext.Button({
        style: 'text-align:center;',
        text: " Sub Group3 Print ",
        width: 60, id: 'btnSubGrpPrint3',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 = "&maingroup="+encodeURIComponent(SubGroup2Code);
		    var p6 = "&maingrpname="+encodeURIComponent(SubGroup2Name);
           var p7 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));

 		    var param = (p1+p2+p3+p4+p5+p6+p7);
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBLedgerwise.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBLedgerwise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBLedgerwise.rptdesign' + param, '_blank');
               /*     if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBLedgerwise.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepViewTBLedgerwise.rptdesign' + param, '_blank');*/
	
                }
            }
    });



    var btnLedgerPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Ledger Print",
        width: 60,
        id: 'btnLedgerPrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		    var p1 = "&ledcode="+encodeURIComponent(SubLedgerCode);                
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
		    var p3 = "&finid=" + encodeURIComponent(finid);

	            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p6 = "&ledname="+encodeURIComponent(SubLedgerName);
       
       		    var p7 = "&ledtype="+encodeURIComponent(ledgertype);

 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');
       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });


    function ProcessMainGrpData()
    {
           txtOpening_Debit.setValue(0);
           txtOpening_Credit.setValue(0);
           txtClosing_Debit.setValue(0);
           txtClosing_Credit.setValue(0);

        txtTotalDebit.setValue(0);
        txtTotalCredit.setValue(0);
        txtTotalDebit2.setValue(0);
        txtTotalCredit2.setValue(0);
        txtTotalDebit3.setValue(0);
        txtTotalCredit3.setValue(0);
        txtTotalDebit4.setValue(0);
        txtTotalCredit4.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0)

        txtGridTotalDebit.setValue(0);
        txtGridTotalCredit.setValue(0)


        flxMainGroup.getStore().removeAll();
        flxMainSubGroup.getStore().removeAll();
        flxMainSubGroup2.getStore().removeAll();
        flxSubGroup2.getStore().removeAll();

        flxLedger.getStore().removeAll();
        flxDetails.getStore().removeAll();
	loadTBDetailsDatastore.removeAll();
	loadTBDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTBMaingroup',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                finfirstdate :Ext.util.Format.date(finstartdate,"Y-m-d"), 

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadTBDetailsDatastore.getCount();

                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadTBDetailsDatastore.getAt(j).get('closing') != 0 )
                   {
		           var dr = 0;
		           var cr = 0;
                       if (Number(loadTBDetailsDatastore.getAt(j).get('closing')) > 0)
                           dr = Ext.util.Format.number(loadTBDetailsDatastore.getAt(j).get('closing'),"0.00");
                       else
                           cr = Ext.util.Format.number(Math.abs(loadTBDetailsDatastore.getAt(j).get('closing')),"0.00");
                       flxMainGroup.getStore().insert(
                       flxMainGroup.getStore().getCount(),
                       new dgrecord({	
 			   grpcode : loadTBDetailsDatastore.getAt(j).get('maingrp'),
			   grpname : loadTBDetailsDatastore.getAt(j).get('grp_name'),
			   debit   : dr,
			  credit   : cr ,
                        })
                       );
        
                   } 
                   }   
                   } 
                   grid_tot();  

                }         
	  });

        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  


    function ProcessMainSubGrpData()
    {


	txtOpening_Debit.setValue(0);
	txtOpening_Credit.setValue(0);
	txtClosing_Debit.setValue(0);
	txtClosing_Credit.setValue(0);

        txtTotalDebit2.setValue(0);
        txtTotalCredit2.setValue(0);
        txtTotalDebit3.setValue(0);
        txtTotalCredit3.setValue(0);
        txtTotalDebit4.setValue(0);
        txtTotalCredit4.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);
        txtGridTotalDebit.setValue(0);
        txtGridTotalCredit.setValue(0);


        flxMainSubGroup.getStore().removeAll();
        flxSubGroup2.getStore().removeAll();
        flxLedger.getStore().removeAll();
	loadTBGrp1DetailsDatastore.removeAll();
	loadTBGrp1DetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTB2NDgroup',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                finfirstdate :Ext.util.Format.date(finstartdate,"Y-m-d"), 
                mgrpcode   : grpcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadTBGrp1DetailsDatastore.getCount();
//alert(cnt);
                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadTBGrp1DetailsDatastore.getAt(j).get('closing') != 0 )
                   {
		           var dr = 0;
		           var cr = 0;
                       if (Number(loadTBGrp1DetailsDatastore.getAt(j).get('closing')) > 0)
                           dr = Ext.util.Format.number(loadTBGrp1DetailsDatastore.getAt(j).get('closing'),"0.00");
                       else
                           cr = Ext.util.Format.number(Math.abs(loadTBGrp1DetailsDatastore.getAt(j).get('closing')),"0.00");
                       flxMainSubGroup.getStore().insert(
                       flxMainSubGroup.getStore().getCount(),
                       new dgrecord({	
 			   grpcode : loadTBGrp1DetailsDatastore.getAt(j).get('subgrp'),
			   grpname : loadTBGrp1DetailsDatastore.getAt(j).get('grp_name'),
			   debit   : dr,
			   credit   : cr ,
                        })
                       );
        
                   } 
                   }   
                   } 
                   grid_tot2();  

                }         
	  });

	loadGroupLedgerDatastore.removeAll();
	loadGroupLedgerDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTB2NDgroup_alllist',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
                finfirstdate :Ext.util.Format.date(finstartdate,"Y-m-d"),  
                mgrpcode   : grpcode,
		},
		scope:this,
		callback:function()
       		{
                    grid_tot2();  
                }      
	  });


        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  


    function ProcessSubGrpData()
    {
                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);

        txtTotalDebit3.setValue(0);
        txtTotalCredit3.setValue(0);
        txtTotalDebit4.setValue(0);
        txtTotalCredit4.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0)

        flxSubGroup2.getStore().removeAll();
        flxLedger.getStore().removeAll();
	loadTBGrp2DetailsDatastore.removeAll();
	loadTBGrp2DetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTBIIIgroup',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                finfirstdate :Ext.util.Format.date(finstartdate,"Y-m-d"), 
                mgrpcode   : grpcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadTBGrp2DetailsDatastore.getCount();
//alert(cnt);
                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadTBGrp2DetailsDatastore.getAt(j).get('closing') != 0 )
                   {
		           var dr = 0;
		           var cr = 0;
                       if (Number(loadTBGrp2DetailsDatastore.getAt(j).get('closing')) > 0)
                           dr = Ext.util.Format.number(loadTBGrp2DetailsDatastore.getAt(j).get('closing'),"0.00");
                       else
                           cr = Ext.util.Format.number(Math.abs(loadTBGrp2DetailsDatastore.getAt(j).get('closing')),"0.00");
                       flxSubGroup2.getStore().insert(
                       flxSubGroup2.getStore().getCount(),
                       new dgrecord({	
 			   grpcode : loadTBGrp2DetailsDatastore.getAt(j).get('subgrp2'),
			   grpname : loadTBGrp2DetailsDatastore.getAt(j).get('grp_name'),
			   debit   : dr,
			   credit   : cr ,
                        })
                       );
        
                   } 
                   }   
                   } 
                   grid_tot3();  

                }         
	  });

        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  


    var flxrep = new Ext.grid.EditorGridPanel({
        frame: true,
        store: [],
	id:'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
	style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 300,
        width: 850,
        border:false,
        x: 370,
        y: 70,
        columns: [
            {header: "Month", dataIndex: 'month',width:260,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var monthcolor=record.get('month');
		    if(monthcolor=='JANUARY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='FEBRUARY') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MARCH') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='APRIL') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MAY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='JUNE') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='JULY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='AUGUST') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='SEPTEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='OCTOBER') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='NOVEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='DECEMBER') {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	    },
            {header: "Debit", dataIndex: 'debit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Credit", dataIndex: 'credit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Balance", dataIndex: 'expsales',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
	    {header: "Type", dataIndex: 'type',width:80,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'}
        ],
         listeners :{
            'rowDblClick' : function(flxrep,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(3);
                var selerow =flxrep.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    repmonth =selerow[i].get('month');
                }
                MonthClick();
            }
        }
    });


    function ProcessLedgerData()
    {

                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);


        txtTotalDebit4.setValue(0);
        txtTotalCredit4.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0)

        flxLedger.getStore().removeAll();
        flxDetails.getStore().removeAll();
	loadTBLedgerDetailsDatastore.removeAll();
	loadTBLedgerDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTB_Ledgers',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                finfirstdate :Ext.util.Format.date(finstartdate,"Y-m-d"), 
                mgrpcode   : grpcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadTBLedgerDetailsDatastore.getCount();
//alert(cnt);
                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadTBLedgerDetailsDatastore.getAt(j).get('closing') != 0 )
                   {
		           var dr = 0;
		           var cr = 0;
                       if (Number(loadTBLedgerDetailsDatastore.getAt(j).get('closing')) > 0)
                           dr = Ext.util.Format.number(loadTBLedgerDetailsDatastore.getAt(j).get('closing'),"0.00");
                       else
                           cr = Ext.util.Format.number(Math.abs(loadTBLedgerDetailsDatastore.getAt(j).get('closing')),"0.00");
                       flxLedger.getStore().insert(
                       flxLedger.getStore().getCount(),
                       new dgrecord({	
 			   grpcode : loadTBLedgerDetailsDatastore.getAt(j).get('acctran_led_code'),
			   grpname : loadTBLedgerDetailsDatastore.getAt(j).get('cust_name'),
			   cust_type: loadTBLedgerDetailsDatastore.getAt(j).get('cust_type'),

			   debit   : dr,
			   credit   : cr ,
                        })
                       );
        
                   } 
                   }   
                   } 
                   grid_tot4();  

                }         
	  });

        var m1 = 0;
       
    }  


    var opamt = 0;
    var cloamt = 0;


  function ProcessPartyLedgerData(){
		
		LedgerClickLoadDataStore.removeAll();
		LedgerClickLoad2DataStore.removeAll();
		lblCrDr.setText("");
		fst_dbcr='';
		monthtype='';
		flagtypenw='';
                flxrep.getStore().removeAll();
                 LedgerClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledname:ledgercode
                    },
                    callback:function(){
                        var cnt=LedgerClickLoadDataStore.getCount();

			
                        if(cnt>0) { 

                            curbal_obcramt=0;
                            curbal_obdbamt=0;
                            ledcode=LedgerClickLoadDataStore.getAt(0).get('curbal_led_code');
                            curbal_obcramt=LedgerClickLoadDataStore.getAt(0).get('curbal_obcramt');
                            curbal_obdbamt=LedgerClickLoadDataStore.getAt(0).get('curbal_obdbamt');
                            if(curbal_obcramt>0){
                                curbal_obcramt=LedgerClickLoadDataStore.getAt(0).get('curbal_obcramt');
                                txtob.setRawValue(curbal_obcramt);
                                fst_dbcr="CR";
                                lblCrDr.setText(fst_dbcr);
                            }else if(curbal_obdbamt>0){
                                curbal_obdbamt=LedgerClickLoadDataStore.getAt(0).get('curbal_obdbamt');
                                txtob.setRawValue(curbal_obdbamt);
                                fst_dbcr="DR";
                                lblCrDr.setText(fst_dbcr);
                            }else{
                                txtob.setRawValue("0");
				fst_dbcr="CR";
				lblCrDr.setText(fst_dbcr);
                            }
                } 
                txttotdebit.setValue("0");
                txttotcredit.setValue("0");
//load start
                 LedgerClickLoad2DataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad2',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledcod:ledcode
                    },
                    callback:function(){
                        var cnt=LedgerClickLoad2DataStore.getCount();

// if start			
                        if(cnt>0){
                          fvr_opbal=txtob.getRawValue();
                          var debit=LedgerClickLoad2DataStore.getAt(0).get('debit');
                          var credit=LedgerClickLoad2DataStore.getAt(0).get('credit');
                          var month=0;
			  month=LedgerClickLoad2DataStore.getAt(0).get('month');


//for loop start
                          for(var i=0;i<cnt;i++){
                          debit=LedgerClickLoad2DataStore.getAt(i).get('debit');
                          credit=LedgerClickLoad2DataStore.getAt(i).get('credit');
                          month=LedgerClickLoad2DataStore.getAt(i).get('month');
                          if(month=="1"){
                              monthtype="JANUARY";
                          }else if(month=="2"){
                              monthtype="FEBRUARY";
                          }else if(month=="3"){
                              monthtype="MARCH";
                          }else if(month=="4"){
                              monthtype="APRIL";
                          }else if(month=="5"){
                              monthtype="MAY";
                          }else if(month=="6"){
                              monthtype="JUNE";
                          }else if(month=="7"){
                              monthtype="JULY";
                          }else if(month=="8"){
                              monthtype="AUGUST";
                          }else if(month=="9"){
                              monthtype="SEPTEMBER";
                          }else if(month=="10"){
                              monthtype="OCTOBER";
                          }else if(month=="11"){
                              monthtype="NOVEMBER";
                          }else if(month=="12"){
                              monthtype="DECEMBER";
                          }

                           var balm;
			   flagtypenw='';
                           if(fst_dbcr=="DR"){
                           if(i==0){
                              balm=((Number(fvr_opbal)+Number(debit))-Number(credit));
                              var new1=balm;
			     if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==1){
                              balm=((Number(new1)+Number(debit))-Number(credit));
                               var new2=balm;
			      if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==2){
                              balm=((Number(new2)+Number(debit))-Number(credit));
                               var new3=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==3){
                              balm=((Number(new3)+Number(debit))-Number(credit));
                               var new4=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==4){
                              balm=((Number(new4)+Number(debit))-Number(credit));
                               var new5=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==5){
                              balm=((Number(new5)+Number(debit))-Number(credit));
                              var new6=balm;
                             if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==6){
                              balm=((Number(new6)+Number(debit))-Number(credit));
                               var new7=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==7){
                              balm=((Number(new7)+Number(debit))-Number(credit));
                               var new8=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==8){
                              balm=((Number(new8)+Number(debit))-Number(credit));
                               var new9=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==9){
                              balm=((Number(new9)+Number(debit))-Number(credit));
                               var new10=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==10){
                              balm=((Number(new10)+Number(debit))-Number(credit));
                               var new11=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==11){
                              balm=((Number(new11)+Number(debit))-Number(credit));
                              var new12=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }
                           } else if(fst_dbcr=="CR"){
			   flagtypenw='';	
                           if(i==0){
                              balm=((Number(fvr_opbal)-Number(debit))+Number(credit));
                               new1=balm;
 			     if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==1){
                              balm=((Number(new1)-Number(debit))+Number(credit));
                               new2=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==2){
                              balm=((Number(new2)-Number(debit))+Number(credit));
                                new3=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==3){
                              balm=((Number(new3)-Number(debit))+Number(credit));
                               new4=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==4){
                              balm=((Number(new4)-Number(debit))+Number(credit));
                               new5=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==5){
                              balm=((Number(new5)-Number(debit))+Number(credit));
                               new6=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==6){
                              balm=((Number(new6)-Number(debit))+Number(credit));
                               new7=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==7){
                              balm=((Number(new7)-Number(debit))+Number(credit));
                               new8=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==8){
                              balm=((Number(new8)-Number(debit))+Number(credit));
                               new9=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==9){
                              balm=((Number(new9)-Number(debit))+Number(credit));
                               new10=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==10){
                              balm=((Number(new10)-Number(debit))+Number(credit));
                               new11=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==11){
                              balm=((Number(new11)-Number(debit))+Number(credit));
                              new12=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                            }
                           }
			      lblCrDrcl.setText(flagtypenw);
		               if (balm<0)
		                {
		                    balm = Math.abs(balm);
		                }
                                flxrep.getStore().insert(
                                flxrep.getStore().getCount(),                       
                                new dgrecord1({
                                    month:monthtype,
                                    debit:debit,
                                    credit:credit,
                                    expsales:Ext.util.Format.number(balm,"0.00"),
				    type:flagtypenw
                                })
                                );
                                    grid_tot_ledger();
                                    grid_closebal_ledger();
									//myFunction();
                            var RowCnt = flxrep.getStore().getCount();
                            flxrep.getSelectionModel().selectAll();
                            var sel1 = flxrep.getSelectionModel().getSelections();
                            for (var j=0;j<RowCnt;j++)
                            {
                              if(i>1){
                                    fvr_opbal=Number(fvr_opbal)+Number(sel1[j].data.expsales);
                                }
                            }
                           }
// for loop end

                          }
//if end
                          else{

			    var cnnt=flxrep.getStore().getCount();
			     if(cnnt==0){
				if(fst_dbcr==="CR"){		
				  lblCrDrcl.setText('CR');
				}else {
				  lblCrDrcl.setText('DR');
				}
			     }
                              txtcb.setRawValue(txtob.getRawValue());
                            }
                           }
                         });
//load end



//                        }


                    }
                });

  }




    function Process_Month_Ledger_Data()
    {

                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);

        flxDetails.getStore().removeAll();
	loadLedgerDetailsDatastore.removeAll();
	loadLedgerDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Ledger_Details',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"), 
                ledcode   : ledgercode,
                ledtype   : ledgertype,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadLedgerDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                    opamt =  Number(loadLedgerDetailsDatastore.getAt(0).get('curbal_obdbamt'))+Number(loadLedgerDetailsDatastore.getAt(0).get('trn_opdr')) - Number(loadLedgerDetailsDatastore.getAt(0).get('curbal_obcramt')) - Number(loadLedgerDetailsDatastore.getAt(0).get('trn_opcr')) ;
 
                   var opamt2 = formatter.format(Math.abs(opamt));


                    if (opamt > 0)      
                       txtOpening_Debit.setRawValue(opamt2);
                    else
                       txtOpening_Credit.setRawValue(opamt2);
 

                   for(var j=0; j<cnt; j++)
 		   { 


//alert(loadLedgerDetailsDatastore.getAt(j).get('ledgername'));
                       var displedname = '';
                       if (loadLedgerDetailsDatastore.getAt(j).get('ledgername') == null)
                       {
                            displedname = loadLedgerDetailsDatastore.getAt(j).get('partyledger');
alert(loadLedgerDetailsDatastore.getAt(j).get('partyledger'));


                       }
                       else
                            displedname = loadLedgerDetailsDatastore.getAt(j).get('ledgername');
  

                       flxDetails.getStore().insert(
                       flxDetails.getStore().getCount(),
                       new dgrecord({
                           sno          : j+1,	
// 			   voudate  : loadLedgerDetailsDatastore.getAt(j).get('accref_voudate'),
                           voudate  : Ext.util.Format.date(loadLedgerDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   ledgername : displedname,
 	                   acctran_dbamt : loadLedgerDetailsDatastore.getAt(j).get('acctran_dbamt'),
 			   acctran_cramt  : loadLedgerDetailsDatastore.getAt(j).get('acctran_cramt'),
                           accref_payref_no : loadLedgerDetailsDatastore.getAt(j).get('accref_payref_no'),
 			   accref_vouno  : loadLedgerDetailsDatastore.getAt(j).get('accref_vouno'),
                           accref_vou_type : loadLedgerDetailsDatastore.getAt(j).get('accref_vou_type'),
			   accref_seqno : loadLedgerDetailsDatastore.getAt(j).get('accref_seqno'),
			   led_code : loadLedgerDetailsDatastore.getAt(j).get('acctran_led_code'),

                        })
                       );
        
                   }   
                   } 
                   grid_tot5();  


                    cloamt = opamt + ledger_debit - ledger_credit ;


                  var cloamt2 = formatter.format(Math.abs(cloamt));
                    if (cloamt > 0) 
                    {         
                       txtClosing_Debit.setRawValue(cloamt2);
                    } 
                    else
                    {
                       txtClosing_Credit.setRawValue(cloamt2);

                    }   
                   


                }         
	  });

        var m1 = 0;
       
    }  



    function Refreshdata()
    {

//
        var dt_today = new Date();

//alert(finstartdate);

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

       ProcessMainGrpData();



        var m1 = 0;
       



    }  

   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'Main Group',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
	{
            xtype       : 'fieldset',
            x           : 15,
            y           : 10,
            border      : false,
            width       :500,
            items : [lblcompany]
        },

	{
            xtype       : 'fieldset',
            x           : 400,
            y           : 10,
            border      : false,
            width       :500,
            items : [txtFinYear]
        },

		{ 
			xtype   : 'fieldset',
			title   : '',
//			layout  : 'hbox',
			border  : false,
			height  : 100,
			width   : 120,
			layout  : 'absolute',
			x       : 700,
			y       : -10,
			items:[optprinttype],
		},




			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 210,
		             x       : 15,
			     y       : 50,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
                             width   : 200,
		             x       : 230,
			     y       : 50,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 450,
			     y       : 45,
                             items: [btnProcess]
                        },

			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height :     350,
			    x           : 10,
			    y           : 90,
			    border      : false,
			    items : [flxMainGroup]
			},

			{
			    xtype       : 'fieldset',
			    x           : 550,
			    y           : 70,
			    border      : false,
			    width       :500,
			    items : [lblMainGroup]
			},



			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height      : 350,
			    x           : 430,
			    y           : 90,
			    border      : false,
			    items : [flxMainSubGroup]
			},
		{
		    xtype       : 'fieldset',
		    x           : 5,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 150,
		    y           : 510,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnMainGrpPrint]
		},


		{
		    xtype       : 'fieldset',
		    x           : 350,
		    y           : 510,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnFullTBPrint]
		},
		{
		    xtype       : 'fieldset',
		    x           : 220,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 430,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit2]
		},

		{
		    xtype       : 'fieldset',
		    x           : 630,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit2]
		},

		{
		    xtype       : 'fieldset',
		    x           : 700,
		    y           : 510,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnSubGrpPrint]
		},
			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 450,
			    height      : 480,
			    x           : 830,
			    y           : -10,
			    border      : false,
			    items : [txtSearch]
			},



			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 450,
			    height      : 480,
			    x           : 830,
			    y           : 10,
			    border      : false,
			    items : [flxMainSubGroup2]
			},


		{
		    xtype       : 'fieldset',
		    x           : 850,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtGridTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 1050,
		    y           : 485,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtGridTotalCredit]
		},
        ]
    },

    {
        xtype: 'panel',
        title: 'Sub Details',
        bodyStyle: {"background-color": "#f9f2ec"},
        layout: 'absolute',
        items: [
		{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 70,
			    border      : false,
			    width       :500,
			    items : [lblSubGroup]
			},


		{
			    xtype       : 'fieldset',
			    x           : 600,
			    y           : 70,
			    border      : false,
			    width       :500,
			    items : [lblSubGroup2]
			},


		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 1100,
		    height :     350,
		    x           : 10,
		    y           : 90,
		    border      : false,
		    items : [flxSubGroup2]
		},

		{
		    xtype       : 'fieldset',
		    x           : 200,
		    y           : 480,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnSubGrpPrint2]
		},


			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height      : 350,
			    x           : 520,
			    y           : 90,
			    border      : false,
			    items : [flxLedger]
			},
		{
		    xtype       : 'fieldset',
		    x           : 20,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit3]
		},

		{
		    xtype       : 'fieldset',
		    x           : 250,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit3]
		},

		{
		    xtype       : 'fieldset',
		    x           : 600,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit4]
		},

		{
		    xtype       : 'fieldset',
		    x           : 800,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit4]
		},


		{
		    xtype       : 'fieldset',
		    x           : 700,
		    y           : 480,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnSubGrpPrint3]
		},


        ]
    }, 
    {
        xtype: 'panel',
        title: 'Ledger Monthwise Details',
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [

		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 30,
		    border      : false,
		    width       :500,
		    items : [lblLedgerName2]
		},

		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 1100,
		    height :     350,
		    x           : 10,
		    y           : 120,
		    border      : false,
		    items : [flxrep]
		},
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [txtcb]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 430,
            y           : 70,
            width       :400,
            labelWidth  : 200,
            border      : false,
            items : [lblob]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 70,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtob]
        },{
            xtype       : 'fieldset',
            x           : 730,
            y           : 70,
            border      : false,
            width       :250,
            items : [lblCrDr]
        },
	{
            xtype       : 'fieldset',
            x           : 730,
            y           : 450,
            border      : false,
            width       :250,
            items : [lblCrDrcl]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 250,
            y           : 450,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lbltot]
        },
        {
            xtype       : 'fieldset',
            x           : 320,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 450,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotcredit]
        },

          ]
    },
    {
        xtype: 'panel',
        title: 'Ledger Transaction Details',
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [

		    {
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : -5,
			    border      : false,
			    width       :500,
			    items : [lblLedgerName]
			},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 10,
                             items: [monthstartdate2]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 600,
			     y       : 10,
                             items: [monthenddate2]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 800,
			     y       : 5,
                             items: [btnProcessLedger]
                        },


			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height      : 500,
			    x           : 10,
			    y           : 40,
			    border      : false,
			    items : [flxDetails]
			},

			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 50,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtOpening_Debit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 90,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtOpening_Credit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 130,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtLedgerDebit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 170,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtLedgerCredit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 210,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtClosing_Debit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 250,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtClosing_Credit]
			},

		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 350,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnLedgerPrint]
		},



        ]
    },
 {
        xtype: 'panel',
        title: 'Voucher Detail',
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [cmbvoc]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtVouDate]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtvouref]
        },

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 550,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [btnview]
        },


        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtRefDate]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1200,
            height : 235,
            x           : 10,
            y           : 80,
            border      : false,
            items : [flxld]
        },
        {
            xtype       : 'fieldset',
            x           : 300,
            y           : 300,
            labelWidth  : 120,
            border      : false,
            width       :250,
            items : [txtLtotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 540,
            y           : 300,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtLtotcredit]
        },
/*
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 320,
            y           : 300,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lblTtot]
        },
*/
        {
            xtype       : 'fieldset',
            width       : 800,
            labelWidth  : 100,
            x           : 0,
            y           : 375,
            border      : false,
            items : [txtnarration2]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 70,
            border      : false,
            anchor: '100%',
            x           : 10,
            y           : 340,
            items : [txtmode]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 40,
            border      : false,
            anchor: '100%',
            x           : 315,
            y           : 340,
            items : [txtno]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 40,
            border      : false,
            anchor: '100%',
            x           : 480,
            y           : 340,
            items : [txtdate]
        }
        ]
    },

    ]
});

var myWin = new Ext.Window({
    id     : 'myWin',
    height : 620,
    width  : 1340,
    bodyStyle: {"background-color": "#ffffdb"},
    x:10,
    y:20,
    maximized:false,
    items  : [tabOverall],


onEsc:function(){
},
    listeners:{
      
        show:function(){
             
            txtFinYear.setRawValue(yearfin);
	    Ext.getCmp('lblcompany').setText(millname);

         if (Ext.util.Format.date(monthenddate.getValue(), "Y-m-d") > Ext.util.Format.date(finenddate, "Y-m-d"))
            monthenddate.setValue(finenddate);
            Refreshdata();


        }
    }
});
myWin.show();
    });

