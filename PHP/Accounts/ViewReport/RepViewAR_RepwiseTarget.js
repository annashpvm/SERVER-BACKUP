Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var millname =localStorage.getItem('gstcompany');

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



   var OVERDUE  = 'N';
   var OD_payterms =  'PT';
   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  


   var yearfinid=0;
   var totdb,totcr;
   var ledname="";
   var ledcode=0;
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

    var RepresentativeCode = 0;
    var RepresentativeCode2 = 0;
    var RepresentativeName = '';


    var SubGroupCode = 0;
    var SubGroupName = '';

    var SubGroup2Code = 0;
    var SubGroup2Name = '';

    var SubLedgerCode = 0;
    var SubLedgerName = '';


   var printtype='PDF';

   var repopt ='OverDue Outstanding';

var alldueoption = 0;

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
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
        columns: 3,
        rows : 1,
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

/*
var optDueDateOpt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
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
        rows : 2,
        id: 'optDueDateOpt',
        items: [
		{boxLabel: 'Payment Terms', name: 'optDueDateOpt', id:'optDueDate1', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                            OD_payterms =  'PT'
                                            ProcessRepData();
                                            flxBillsDetails.getColumnModel().setHidden(6, true);
					}
				}
			}
		},
		{boxLabel: 'Pay Terms + Grace Days', name: 'optDueDateOpt', id:'optDueDate2', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          OD_payterms =  'PTGD'
                                          ProcessRepData();
                                            flxBillsDetails.getColumnModel().setHidden(6, false);
					}
				}
			}
		},
            
        ],
    }



    ]
});
*/

var optRepOpt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
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
      //  rows : 10,
        id: 'optRepOpt',
        items: [

   		{boxLabel: 'Accounts Receivable Target & Collection', name: 'optRepOpt', id:'opt_ar_due_coll', inputValue: 11,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Accounts Receivable Target & Collection';
					}
				}
			}
		}, 

		{boxLabel: ' <=7 Days Outstanding', name: 'optRepOpt', id:'opt_OD7_Days', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='7 Days Outstanding';
					}
				}
			}
		}, 

		{boxLabel: ' >= 100 Days Outstanding', name: 'optRepOpt', id:'opt_OD100_Days', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='100 Days Outstanding';
					}
				}
			}
		}, 
		{boxLabel: 'OverDue Outstanding', name: 'optRepOpt', id:'optOverDue', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    repopt ='OverDue Outstanding';

                                        
					}
				}
			}
		},
		{boxLabel: 'Long Pending OverDue Outstanding', name: 'optRepOpt', id:'optOverDueLong', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    repopt ='Long Pending OverDue Outstanding';

                                        
					}
				}
			}
		},
		{boxLabel: 'Outstanding & Collections', name: 'optRepOpt', id:'opt_ODCollect', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Oustanding & Collections';

					}
				}
			}
		},
		{boxLabel: 'Long Pending Oustanding & Collections', name: 'optRepOpt', id:'opt_LongPending', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Long Pending Oustanding & Collections';

					}
				}
			}
		}, 

		{boxLabel: 'Oustanding & Collections With Percentage', name: 'optRepOpt', id:'opt_ODCollect_per', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Oustanding & Collections With Percentage';

					}
				}
			}
		}, 

		{boxLabel: 'NEW Oustanding & Collections With Percentage', name: 'optRepOpt', id:'opt_ODCollect_perNew', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='NEW Oustanding & Collections With Percentage';

					}
				}
			}
		}, 


		{boxLabel: ' >= 100 Days Outstanding & Collections', name: 'optRepOpt', id:'opt_OD100_Days_due_coll', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='100 Days Outstanding & Collections';
					}
				}
			}
		}, 

		{boxLabel: 'Customer Abstract Overdue_Collection', name: 'optRepOpt', id:'opt_custabs', inputValue: 7,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Customer Abstract Overdue_Collection';
					}
				}
			}
		},
		{boxLabel: 'Week wise Overdue_Collection', name: 'optRepOpt', id:'opt_week_coll', inputValue: 8,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Week wise Overdue_Collection';
					}
				}
			}
		},  

		{boxLabel: 'Week wise Overdue + 30 Days due and its Collection', name: 'optRepOpt', id:'opt_week_coll2', inputValue: 9,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Week wise Overdue + 30 Days due and its Collection';
					}
				}
			}
		},  



		{boxLabel: 'All outstanding & week wise collection', name: 'optRepOpt', id:'opt_allout_collect', inputValue: 10,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='All outstanding & week wise collection';
					}
				}
			}
		},  

		{boxLabel: 'All outstanding & week wise collection Percentage', name: 'optRepOpt', id:'opt_allout_collect_Per', inputValue: 11,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='All outstanding & week wise collection Percentage';
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


 var loadBillsDetailsDatastore = new Ext.data.Store({
        id: 'loadBillsDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_Bills_Details"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['led_name', 'acctrail_led_code', 'acctrail_inv_no','acctrail_inv_date', 'acctrail_inv_value', 'acctrail_adj_value', 'acctrail_crdays','acctrail_gracedays', 'duedate', 'oddays','acctrail_amtmode'])
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
        },['curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_voudate','accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgername', 'partyledger', 'led_code' , 'accref_vou_type'])
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
      },[ 'maingrp', 'grp_name','closing','subgrp2'


      ]),
    });


 var loadRepOverdueDatastore = new Ext.data.Store({
      id: 'loadRepOverdueDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRep_Overdue_Outstanding"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'grp_name', 'grp_code', 'balanceamt','repr_accgrp'


      ]),
    });



 var loadRepAllDueDatastore = new Ext.data.Store({
      id: 'loadRepAllDueDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRep_All_Outstanding"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'grp_name', 'grp_code', 'balanceamt','repr_accgrp'


      ]),
    });


 var loadPartyOverdueDatastore = new Ext.data.Store({
      id: 'loadPartyOverdueDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParty_Overdue_Outstanding"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'ledname', 'acctrail_led_code', 'balanceamt','cust_smsno','cust_overdue_msg','minday','maxday','acctrail_amtmode'


      ]),
    });



 var loadTBGrp1DetailsDatastore = new Ext.data.Store({
      id: 'loadTBGrp1DetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIIIgroup"}, // this parameter asks for listing
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
      },[  'acctran_led_code', 'led_name', 'closing'


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
        },['voudate', 'led_name', 'voutype', 'accref_payref_no', 'acctran_dbamt', 'acctran_cramt', 'accref_vou_type','accref_vouno','accref_seqno', 'led_code'  ])
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
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
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
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
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
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
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
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
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
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
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
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


   var txtTotalDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit',
        name        : 'txtTotalDebit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


   var txtTotalCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit',
        name        : 'txtTotalCredit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });

   var txtTotalDebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit2',
        name        : 'txtTotalDebit2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


   var txtTotalCredit2 = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit2',
        name        : 'txtTotalCredit2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });

   var txtTotalDebitAmount = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit Amount',
        id          : 'txtTotalDebitAmount',
        name        : 'txtTotalDebitAmount',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


   var txtTotalCreditAmount = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit Amount',
        id          : 'txtTotalCreditAmount',
        name        : 'txtTotalCreditAmount',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


   var txtTotalBalAmt = new Ext.form.NumberField({
        fieldLabel  : 'Total Bal Amount',
        id          : 'txtTotalBalAmt',
        name        : 'txtTotalBalAmt',
        width       :  140,
	readOnly    :  true,
        labelStyle  :  "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
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
                                var lednam=VouNoClickLoadDataStore.getAt(i).get('led_name');
                                var acctdbamt=VouNoClickLoadDataStore.getAt(i).get('acctran_dbamt');
                                var acctcramt=VouNoClickLoadDataStore.getAt(i).get('acctran_cramt');
                                flxld.getStore().insert(
                                flxld.getStore().getCount(),
                                new dgrecord2({
                                    ledger:lednam,
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
        var Row= flxRepwiseDue.getStore().getCount();
        flxRepwiseDue.getSelectionModel().selectAll();
        var sel=flxRepwiseDue.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
         }
        txtTotalDebit.setRawValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit.setRawValue(Ext.util.Format.number(cr,"0.00"));

}


  function grid_tot2(){
        var dr = 0;
        var cr = 0;
        var Row1= flxCustomer.getStore().getCount();

        flxCustomer.getSelectionModel().selectAll();
        var sel=flxCustomer.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
        }
        txtTotalDebit2.setRawValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit2.setRawValue(Ext.util.Format.number(cr,"0.00"));
}


  function grid_tot3(){


        var inv = 0;
        var col = 0;
        var bal = 0;
        var drbal = 0;
        var crbal = 0;

        var Row1= flxBillsDetails.getStore().getCount();

        flxBillsDetails.getSelectionModel().selectAll();
        var sel=flxBillsDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
//	      inv=Number(inv)+Number(sel[i].data.acctrail_inv_value);
//	      col=Number(col)+Number(sel[i].data.acctrail_adj_value);
//	      bal=Number(bal)+Number(sel[i].data.invbalamt);
              if (sel[i].data.acctrail_amtmode == 'D')
                 drbal = Number(drbal)+Number(sel[i].data.invbalamt);     
              else
                 crbal = Number(crbal)+Number(sel[i].data.invbalamt);     
        }
        txtTotalDebitAmount.setRawValue(Ext.util.Format.number(drbal,"0.00"));
        txtTotalCreditAmount.setRawValue(Ext.util.Format.number(crbal,"0.00"));
        var clbal =  Number(drbal)-Number(crbal);
        txtTotalBalAmt.setRawValue(Ext.util.Format.number(Math.abs(clbal),"0.00"));
        if (clbal > 0)
           lblDrCr.setText("Dr");
        else
           lblDrCr.setText("Cr");
 
 

}




  function grid_tot5(){
        var dr = 0;
        var cr = 0;

        var Row1= flxDetails.getStore().getCount();
        flxDetails.getSelectionModel().selectAll();
        var sel=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {

	      dr=Number(dr)+Number(sel[i].data.acctran_dbamt);
	      cr=cr+Number(sel[i].data.acctran_cramt);

        }

        txtLedgerDebit.setRawValue(Ext.util.Format.number(dr,"0.00"));
        txtLedgerCredit.setRawValue(Ext.util.Format.number(cr,"0.00"));
}

  function grid_closebal(){
	clsbal="";
        var Row1= flxRepwiseDue.getStore().getCount();
        flxRepwiseDue.getSelectionModel().selectAll();
        var sele=flxRepwiseDue.getSelectionModel().getSelections();
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
        },['led_name'])
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
        },['accref_voudate','acctran_dbamt','acctran_cramt','led_name','accref_payref_no','accref_payref_date'])
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
                  ProcessRepData();
             }
          }

});


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date(),
  //      readOnly : true,   
    });

    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              ProcessRepData();
           },
           keyup:function(){
              ProcessRepData();
            },
           change:function(){
              ProcessRepData();
            },
        }  
    });




var lblTargetFrom = new Ext.form.Label({
    fieldLabel  : 'Target From',
    id          : 'lblTargetFrom',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblTargetTo = new Ext.form.Label({
    fieldLabel  :'Target To',
    id          : 'lblTargetTo',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblCollUpto = new Ext.form.Label({
    fieldLabel  :'Collection Upto',
    id          : 'lblCollUpto',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



    var dtCollectionFrom = new Ext.form.DateField({
	fieldLabel: '',
        id: 'dtCollectionFrom',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });


    var dtCollectionTo = new Ext.form.DateField({
	fieldLabel: '',
        id: 'dtCollectionTo',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });

    var dtCollectionUpto = new Ext.form.DateField({
	fieldLabel: '',
        id: 'dtCollectionUpto',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });

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

var lblOutstandingType = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblOutstandingType',
        name        : 'lblOutstandingType',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

var lblDrCr = new Ext.form.Label({
        fieldLabel  : 'Dr',
        id          : 'lblDrCr',
        name        : 'lblDrCr',
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold','text-align': 'left',
        },
        width       : 50
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


    var lbltot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lbltot',
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
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


    var btnAbstract = new Ext.Button({
        style: 'text-align:center;',
        text: "RepWise Target",
        width: 60,
        id: 'btnAbstract',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 = "&compcode="+encodeURIComponent(compcode);      
                    var p2 = "&asondate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 		    var param = (p1+p2) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepRepTarget_Abstract.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepRepTarget_Abstract.rptdesign&__format=XLSX' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepRepTarget_Abstract.rptdesign' + param, '_blank');

                }
            }

    });



var dgrecord = Ext.data.Record.create([]);
var flxRepwiseDue = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:150,
    height: 320,
    hidden:false,
    width: 530,

    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true ,hidden : true},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:200,align:'left', menuDisabled: true,
},
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:130,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxRepwiseDue, rowIndex, cellIndex, e) {
		var sm = flxRepwiseDue.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                RepresentativeCode  = selrow.get('grpcode');
                RepresentativeCode2 = selrow.get('grpcode');
                RepresentativeName  = selrow.get('grpname');
//                Ext.getCmp('btnSMS').setDisabled(false);  
 //               lblMainGroup.setText("Details for : " + selrow.get('grpname'));
	              
	     var p1 = "&compcode="+encodeURIComponent(compcode);      
             var p2 = "&asondate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	
             var p3 = "&collfromdate="+encodeURIComponent(Ext.util.Format.date(dtCollectionFrom.getValue(),"Y-m-d"));	
             var p4 = "&colltodate="+encodeURIComponent(Ext.util.Format.date(dtCollectionTo.getValue(),"Y-m-d"));	
       	     var p5 = "&repcode="+encodeURIComponent(grpcode);
             var p6 = "&collupto="+encodeURIComponent(Ext.util.Format.date(dtCollectionUpto.getValue(),"Y-m-d"));	




            if (repopt =='Oustanding & Collections With Percentage')
               var p8 = "&percentage="+encodeURIComponent('Y');
            else     
               var p8 = "&percentage="+encodeURIComponent('N');



            if (repopt == 'Long Pending Oustanding & Collections' || repopt =='Long Pending OverDue Outstanding' )
               var p7 = "&duetype="+encodeURIComponent('L');
            else     
               var p7 = "&duetype="+encodeURIComponent('A');

  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8);

	    if (repopt == 'OverDue Outstanding' || repopt =='Long Pending OverDue Outstanding')
            {
		if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Excel.rptdesign&__format=XLSX' + param, '_blank');
		    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget.rptdesign' + param, '_blank');
            } 
            else if (repopt == 'Oustanding & Collections' ||  repopt == 'Long Pending Oustanding & Collections'  || repopt =='Oustanding & Collections With Percentage')
            { 
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Excel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection.rptdesign' + param, '_blank');
            } 

            else if (repopt == 'NEW Oustanding & Collections With Percentage' )
            { 
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionNew.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionNew_Excel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionNew.rptdesign' + param, '_blank');
            }	 

            else if (repopt == '100 Days Outstanding' )
            { 
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_dueAbove100Days.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_dueAbove100DaysExcel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_dueAbove100Days.rptdesign' + param, '_blank');
            }	 
            else if (repopt == '100 Days Outstanding & Collections' )
            { 
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionAbove100Days.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionAbove100DaysExcel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_CollectionAbove100Days.rptdesign' + param, '_blank');
            }	 
            else if (repopt == '7 Days Outstanding' )
            { 
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection7Days.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection7Days.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection7Days.rptdesign' + param, '_blank');
            }	



            else if (repopt == 'Customer Abstract Overdue_Collection' )
            { 

            var p9 = "&oddays1="+encodeURIComponent('0');
  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9);
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_AbstractExcel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Abstract.rptdesign' + param, '_blank');
            }

            else if (repopt == 'Week wise Overdue_Collection' )
            { 
            var p9 = "&oddays1="+encodeURIComponent('0');
  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9);
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign' + param, '_blank');
            }



            else if (repopt == 'Week wise Overdue + 30 Days due and its Collection'  )
            { 

            var p9 = "&oddays1="+encodeURIComponent('30');
  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9);
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_RepTarget_Collection_Customer_Weekwise.rptdesign' + param, '_blank');
            }




            else if (repopt == 'All outstanding & week wise collection'  )
            { 

            var p9 = "&oddays1="+encodeURIComponent('30');
  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9);
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise.rptdesign' + param, '_blank');
            }



            else if (repopt == 'All outstanding & week wise collection Percentage'  )
            { 

            var p9 = "&oddays1="+encodeURIComponent('30');
  	    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9);
		if (printtype == "PDF") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise_percentage.rptdesign&__format=pdf&'+param,  '_blank' );
				    else if (printtype == "XLS") 
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise_percentageExcel.rptdesign&__format=XLSX' + param, '_blank');
				    else
				    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Rep_AllOutstanding_Collection_Customer_Weekwise_percentage.rptdesign' + param, '_blank');
            }
            else if (repopt == 'Accounts Receivable Target & Collection')
            { 

		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	 var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(0);
                    var p5 = "&repcode="+encodeURIComponent(RepresentativeCode);
                    var p6 = "&coll_from="+encodeURIComponent(Ext.util.Format.date(dtCollectionFrom.getValue(),"Y-m-d"));
                    var p7 = "&coll_to="+encodeURIComponent(Ext.util.Format.date(dtCollectionUpto.getValue(),"Y-m-d"));
		    var param = (p1+p2+p3+p4+p5+p6+p7) ;

		    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_SelectiveRep_ARBillwise_OutstandingBills_with_percentage_Collections.rptdesign&__format=pdf&' + param, '_blank');
		    else if (printtype == "XLS") 
{
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_SelectiveRep_ARBillwise_OutstandingBills_with_percentage_CollectionsExcel.rptdesign&__format=XLSX&' + param, '_blank');

}
		    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_SelectiveRep_ARBillwise_OutstandingBills_with_percentage_Collections.rptdesign' + param, '_blank');
            }


        }      

	
   }
});




var balamt = 0;

    function ProcessPartyBillsData()
    {


        flxBillsDetails.getStore().removeAll();
	loadBillsDetailsDatastore.removeAll();
	loadBillsDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Bills_Details',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   : ledcode,
                alldueopt : alldueoption, 
                dueopt    : OD_payterms
            


		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadBillsDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                     for(var j=0; j<cnt; j++)
 	             { 

//alert(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_date'));
                       balamt = loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value')-loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value');

                       balamt =  Ext.util.Format.number(balamt,"0.00")

                       flxBillsDetails.getStore().insert(
                       flxBillsDetails.getStore().getCount(),
                       new dgrecord({

                           acctrail_inv_date  : Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_date'),"d-m-Y"),
			   acctrail_inv_no : loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_no'),
 	                   acctrail_inv_value : loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value'),
 			   acctrail_adj_value  : loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value'),
                           invbalamt : balamt,
 			   acctrail_crdays  : loadBillsDetailsDatastore.getAt(j).get('acctrail_crdays'),
 			   acctrail_gracedays  : loadBillsDetailsDatastore.getAt(j).get('acctrail_gracedays'),
                           duedate : loadBillsDetailsDatastore.getAt(j).get('duedate'),
			   oddays : loadBillsDetailsDatastore.getAt(j).get('oddays'),
			   acctrail_amtmode  : loadBillsDetailsDatastore.getAt(j).get('acctrail_amtmode'),

                        })
                       );
        
                   }   
                   } 
                   grid_tot3();  

 
                   


                }         
	  });

        var m1 = 0;
       
    }






    function ProcessRepData()
    {



           var rdate    = monthenddate.getValue().add(Date.DAY, 1);


           dtCollectionFrom.setValue(rdate); 
           dtCollectionTo.setValue(rdate); 



           txtOpening_Debit.setValue(0);
           txtOpening_Credit.setValue(0);
           txtClosing_Debit.setValue(0);
           txtClosing_Credit.setValue(0);

        txtTotalDebit.setValue(0);
        txtTotalCredit.setValue(0);
        txtTotalDebit2.setValue(0);
        txtTotalCredit2.setValue(0);
        txtTotalDebitAmount.setValue(0);
        txtTotalCreditAmount.setValue(0);

        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0)


        flxRepwiseDue.getStore().removeAll();


        if (repopt =='All Outstanding')
        {  
		loadRepAllDueDatastore.removeAll();
		loadRepAllDueDatastore.load({
		 url: 'ClsViewStatements.php',
		        params: {
		    	task: 'loadRep_All_Outstanding',
		        compcode  : Gincompcode,
		        asondate  : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

			},
			scope:this,
			callback:function()
	       		{
		           var cnt=loadRepAllDueDatastore.getCount();

		           
		           if(cnt>0)
		           {
		           for(var j=0; j<cnt; j++)
	 		   { 
		           if (loadRepAllDueDatastore.getAt(j).get('balanceamt') != 0 )
		           {
				   var dr = 0;
				   var cr = 0;
		               if (Number(loadRepAllDueDatastore.getAt(j).get('balanceamt')) > 0)
		                   dr = Ext.util.Format.number(loadRepAllDueDatastore.getAt(j).get('balanceamt'),"0.00");
		               else
		                   cr = Ext.util.Format.number(Math.abs(loadRepAllDueDatastore.getAt(j).get('balanceamt')),"0.00");
		               flxRepwiseDue.getStore().insert(
		               flxRepwiseDue.getStore().getCount(),
		               new dgrecord({	
	 			   grpcode : loadRepAllDueDatastore.getAt(j).get('grp_code'),
				   grpname : loadRepAllDueDatastore.getAt(j).get('grp_name'),
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

/*
		loadTBDetailsDatastore.removeAll();
		loadTBDetailsDatastore.load({
		 url: 'ClsViewStatements.php',
		        params: {
		    	task: 'loadTBIIIgroup',
		        compcode:Gincompcode,
		        finid:GinFinid,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
		        fsdate : Ext.util.Format.date(finstartdate,"Y-m-d"),

 
		        mgrpcode   : 24,
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
		               flxRepwiseDue.getStore().insert(
		               flxRepwiseDue.getStore().getCount(),
		               new dgrecord({	
	 			   grpcode : loadTBDetailsDatastore.getAt(j).get('subgrp2'),
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
*/
          }
          else
          {
		loadRepOverdueDatastore.removeAll();
		loadRepOverdueDatastore.load({
		 url: 'ClsViewStatements.php',
		        params: {
		    	task: 'loadRep_Overdue_Outstanding',
		        compcode  : Gincompcode,
		        asondate  : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                        dueoption : OD_payterms, 
			},
			scope:this,
			callback:function()
	       		{
		           var cnt=loadRepOverdueDatastore.getCount();

		           
		           if(cnt>0)
		           {
		           for(var j=0; j<cnt; j++)
	 		   { 
		           if (loadRepOverdueDatastore.getAt(j).get('balanceamt') != 0 )
		           {
				   var dr = 0;
				   var cr = 0;
		               if (Number(loadRepOverdueDatastore.getAt(j).get('balanceamt')) > 0)
		                   dr = Ext.util.Format.number(loadRepOverdueDatastore.getAt(j).get('balanceamt'),"0.00");
		               else
		                   cr = Ext.util.Format.number(Math.abs(loadRepOverdueDatastore.getAt(j).get('balanceamt')),"0.00");
		               flxRepwiseDue.getStore().insert(
		               flxRepwiseDue.getStore().getCount(),
		               new dgrecord({	
                 		   grpcode2 : loadRepOverdueDatastore.getAt(j).get('repr_accgrp'),
	 			   grpcode : loadRepOverdueDatastore.getAt(j).get('grp_code'),
				   grpname : loadRepOverdueDatastore.getAt(j).get('grp_name'),
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

          } 

        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  






    function Refreshdata()
    {

//
        var dt_today = new Date();

//alert(finstartdate);

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

       OD_payterms =  'PTGD'


       ProcessRepData();

//alert(monthstartdate.getValue());
//alert(monthenddate.getValue());



        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



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
        title: 'OUTSTANDING',
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
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 250,
			layout  : 'absolute',
			x       : 620,
			y       : 10,
			items:[optprinttype],
		},


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 400,
			width   : 350,
			layout  : 'absolute',
			x       : 890,
			y       : 100,
			items:[optRepOpt],
		},
/*
		{ 
			xtype   : 'fieldset',
			title   : 'Due Date Based on the ',
			layout  : 'hbox',
			border  : true,
			height  : 90,
			width   : 200,
			layout  : 'absolute',
			x       : 1110,
			y       : 0,
			items:[optDueDateOpt],
		},
*/


		    { xtype   : 'fieldset',
		        title   : 'OVER DUE BILLS OUTSTANDING',
		        layout  : 'hbox',
		        border  : true,
		        height  : 70,
		        width   : 600,
			style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 50,
		        items:[ 

				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 80,
		                     border  : false,
		                     width   : 220,
				     x       : 15,
				     y       : 0,
		                     items: [monthstartdate]
		                },
				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 70,
		                     border  : false,
		                     width   : 220,
				     x       : 250,
				     y       : 0,
		                     items: [monthenddate]
		                },

				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 70,
		                     width       : 120,
		                     border  : false,
				     x       : 450,
				     y       : -10,
		                     items: [btnProcess]
		                },




                           ]
                        },    



		    { xtype   : 'fieldset',
		        title   : 'COLLECTIONS',
		        layout  : 'hbox',
		        border  : true,
		        height  : 80,
		        width   : 600,
			style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 130,
		        items:[ 

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : true,
				            labelWidth  : 100,
				            x           : 35,
				            y           :-15,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblTargetFrom]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : true,
				            labelWidth  : 100,
				            x           : 183,
				            y           :-15,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblTargetTo]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : true,
				            labelWidth  : 120,
				            x           : 353,
				            y           :-15,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblCollUpto]
				        },


				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 1,
		                     border  : false,
		                     width   : 150,
				     x       : 20,
				     y       : 10,
		                     items: [dtCollectionFrom]
		                },
				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 1,
		                     border  : false,
		                     width   : 150,
				     x       : 180,
				     y       : 10,
		                     items: [dtCollectionTo]
		                },
				{ 
		                     xtype   : 'fieldset',
		                     title   : '',
		                     labelWidth  : 1,
		                     border  : false,
		                     width   : 150,
				     x       : 360,
				     y       : 10,
		                     items: [dtCollectionUpto]
		                },

                           ]
                        },    

			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 530,
			    height :     350,
			    x           : 10,
			    y           : 200,
			    border      : false,
			    items : [flxRepwiseDue]
			},

			{
			    xtype       : 'fieldset',
			    x           : 600,
			    y           : 70,
			    border      : false,
			    width       :500,
			    items : [lblMainGroup]
			},
		{
		    xtype       : 'fieldset',
		    x           : 950,
		    y           : 500,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnAbstract]
		},


		{
		    xtype       : 'fieldset',
		    x           : 100,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 320,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit]
		},



        ]
    },

    {
        xtype: 'panel',
        title: 'Billwise Details',
        bodyStyle: {"background-color": "#f9f2ec"},
        layout: 'absolute',
        items: [

		{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : -5,
			    border      : false,
			    width       :500,
			    items : [lblSubGroup2]
			},


		{
			    xtype       : 'fieldset',
			    x           : 500,
			    y           : -5,
			    border      : false,
			    width       :500,
			    items : [lblOutstandingType]
			},




		{
		    xtype       : 'fieldset',
		    x           : 630,
		    y           : 500,
		    border      : false,
		    width       :310,
                    labelWidth  : 140,
		    items : [txtTotalBalAmt]
		},


		{
			    xtype       : 'fieldset',
			    x           : 940,
			    y           : 500,
                            labelWidth  : 1,
			    border      : false,
			    width       : 100,
			    items : [lblDrCr]
			},



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
            Refreshdata();
           lblDrCr.setText('Dr');  





        }
    }
});
myWin.show();
    });




