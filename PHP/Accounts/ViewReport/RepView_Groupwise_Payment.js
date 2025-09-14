Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var millname =localStorage.getItem('gstcompany');
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
   var ledcode=0;

   var suppliername="";
   var suppliercode=0;

   var partypayents = 0;

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

    var repcode =0;

    var GroupCode = 0;
    var GroupName = '';


    var SubGroupCode = 0;
    var SubGroupName = '';

    var SubGroup2Code = 0;
    var SubGroup2Name = '';

    var SubLedgerCode = 0;
    var SubLedgerName = '';


   var printtype='PDF';

   var repopt ='Bills';



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
                     task:"load_GroupParty_Bills_Payments"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno', 'accref_voudate', 'acctran_dbamt', 'ref_invno', 'ref_invdate', 'ref_adjamount','accref_seqno' ])
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
        },['curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_voudate','accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgername', 'partyledger', 'cust_code' , 'accref_vou_type'])
    });


 var loadGroupPaymentDatastore = new Ext.data.Store({
      id: 'loadGroupPaymentDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"load_Groupwise_Payment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[  'cust_acc_group', 'grp_name', 'paidamt'


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

 var loadGroupPartyPaymentDatastore = new Ext.data.Store({
      id: 'loadGroupPartyPaymentDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"load_Group_Party_Payments"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[  'cust_code','cust_name',  'paidamt' 


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
                     task:"loadDocumentList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno','accref_voudate','acctrail_inv_no','cust_name','accref_payref_no','accref_narration','acctran_dbamt','acctran_cramt','accref_vou_type','partyledger' ])
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
        width      : 140,
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



   var txtTotalPayments = new Ext.form.NumberField({
        fieldLabel  : 'Total Payments ',
        id          : 'txtTotalPayments',
        name        : 'txtTotalPayments',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });



   var txtGroupTotalPayments = new Ext.form.NumberField({
        fieldLabel  : 'Total Payments',
        id          : 'txtGroupTotalPayments',
        name        : 'txtGroupTotalPayments',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });





   var txtTotalCollAmt = new Ext.form.NumberField({
        fieldLabel  : 'Total Collected Amt',
        id          : 'txtTotalCollAmt',
        name        : 'txtTotalCollAmt',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtTotalAdjAmt = new Ext.form.NumberField({
        fieldLabel  : 'Total Adj Amt',
        id          : 'txtTotalAdjAmt',
        name        : 'txtTotalAdjAmt',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
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
                   var voutype = cmbvoc.getRawValue().substring(0,3);                
                   var grnno = cmbvoc.getRawValue().substring(3);       

                   var invno = txtvouref.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&invno=" + encodeURIComponent(invno);

                   i1 = "ORIGINAL FOR BUYER";
         	   var p4 = "&displayword=" + encodeURIComponent(i1);

           	   var p5 = "&vouno="+encodeURIComponent(cmbvoc.getRawValue());

		   var p6 = "&seqno=" + encodeURIComponent(SeqNo);


 	 	   var param = (p1 + p2 + p3 + p4 ); 

 	 	   var param2 = (p1 + p2 + p5 ); 

  
                   if (voutype  == "GSI") 
                   {
                    if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf' + param); 
                   }
                   else if  (voutype  == "OSI") 
                   {
                   if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                   } 
                   else if (voutype == "GJV")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param2, '_blank');
                    }     
                    else if (voutype == "CHR" || voutype == "BKR")
                    {  
   	 	    var param2 = (p1 + p2 + p6 );
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param2, '_blank');
                    }       
                    else if (voutype == "CHP"  || voutype == "BKP" )
                    {
   	 	    var param2 = (p1 + p2 + p6 );  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param2, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param2, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign' + param2, '_blank');
                    }  
                    else if (voutype == "PLW" )
                    {  
//                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(grnno);
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param);
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param);  
                    }    
                    else if (voutype == "PPF" )
                    {  
//                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(grnno);
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 
                    }  
                    else if (voutype == "PSC" || voutype == "PSP" )
                    {  
//                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 ="&minno="+encodeURIComponent(grnno);
                    var p4 ="&purtype="+encodeURIComponent(voutype);
                    var param = (p1 + p2 + p3 + p4 ); 
                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
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
            {header: "Ledger Name", dataIndex: 'ledger',width:350,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
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
                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
//                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");
//                                txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");                         

                                txtnarration2.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));
                                txtnarration.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));
                                for(var i=0;i<cnt;i++){
                                var lednam=VouNoClickLoadDataStore.getAt(i).get('cust_name');
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
/*
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

*/
                        }
                    }
                });
  }


function grid_tot(){

        var camt = 0;

        var Row= flxGroupwise.getStore().getCount();
        flxGroupwise.getSelectionModel().selectAll();
        var sel=flxGroupwise.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {
	      camt=Number(camt)+Number(sel[i].data.paidamt);
         }
        txtTotalPayments.setValue(Ext.util.Format.number(camt,"0.00"));


}


  function grid_tot2(){
        var camt  = 0;

        var Row1= flxSupplier.getStore().getCount();

        flxSupplier.getSelectionModel().selectAll();
        var sel=flxSupplier.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      camt=Number(camt)+Number(sel[i].data.paidamt);
        }
        txtGroupTotalPayments.setValue(Ext.util.Format.number(camt,"0.00"));
    
}


  function grid_tot3(){


        var invcoll = 0;

        var Row1= flxVocuherDetails.getStore().getCount();

        flxVocuherDetails.getSelectionModel().selectAll();
        var sel=flxVocuherDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      invcoll=Number(invcoll)+Number(sel[i].data.refamount);
        }

        txtTotalAdjAmt.setValue(Ext.util.Format.number(invcoll,"0.00"));
        txtTotalCollAmt.setValue(Ext.util.Format.number(partypayents,"0.00"));

}






  function grid_closebal(){
	clsbal="";
        var Row1= flxGroupwise.getStore().getCount();
        flxGroupwise.getSelectionModel().selectAll();
        var sele=flxGroupwise.getSelectionModel().getSelections();
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
            'cust_acc_group'
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
        },['cust_name'])
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
		             grpcodetds = TdsLedgergetDataStore.getAt(0).get('cust_acc_group');
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
                  ProcessGroupData();
             }
          }

});


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date() ,
        enableKeyEvents: true,  
	listeners:{
          keyup: function(){  
                  ProcessGroupData();
             },
          change: function(){  
                  ProcessGroupData();
             }
          }
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date(),
        enableKeyEvents: true,  
	listeners:{
          keyup: function(){  
                  ProcessGroupData();
             },
          change: function(){  
                  ProcessGroupData();
             }
          }   
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

var dgrecord = Ext.data.Record.create([]);
var flxGroupwise = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 350,
    hidden:false,
    width: 530,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "Group Code" , dataIndex: 'cust_acc_group',sortable:false,width:50,align:'left', menuDisabled: true ,hidden : true},
        {header: "Group Name " , dataIndex: 'grp_name',sortable:false,width:300,align:'left', menuDisabled: true,
},
        {header: "Payments" , dataIndex: 'paidamt',sortable:false,width:170,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxGroupwise, rowIndex, cellIndex, e) {
		var sm = flxGroupwise.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('cust_acc_group');
                GroupCode = selrow.get('cust_acc_group');
                GroupName = selrow.get('grp_name');

                lblMainGroup.setText("Details for : " + GroupName);
                ProcessSupplierData();

        }      
	
   }
});


var flxSupplier = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:350,
    y:100,
    height: 350,
    hidden:false,
    width: 620,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "Led Code" , dataIndex: 'cust_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Supplier " , dataIndex: 'cust_name',sortable:false,width:300,align:'left', menuDisabled: true,
},
        {header: "Paid" , dataIndex: 'paidamt',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxGroupwise, rowIndex, cellIndex, e) {
		var sm = flxSupplier.getSelectionModel();
		var selrow = sm.getSelected();
                suppliercode = selrow.get('cust_code');
                suppliername = selrow.get('cust_name')
                partypayents = selrow.get('paidamt')
                lblLedgerName.setText("Details for : " + selrow.get('cust_name'));
                lblSubGroup2.setText("Details for : " + selrow.get('cust_name'));
/*
                if (repopt =='Ledger')
                {
                   tabOverall.setActiveTab(2);
                   ProcessPartyLedgerData();
                }
                else
                {
                   tabOverall.setActiveTab(1);
                   ProcessPartyBillsData();
                }
*/
                   tabOverall.setActiveTab(2);
        //           ProcessPartyLedgerData();
                   tabOverall.setActiveTab(1);
                   ProcessPartyBillsData();
 


        }      
	
   }
});


var balamt = 0;

    function ProcessPartyBillsData()
    {


        flxVocuherDetails.getStore().removeAll();
	loadBillsDetailsDatastore.removeAll();
	loadBillsDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task      : 'load_GroupParty_Bills_Payments',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                suppliercode  : suppliercode,
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

//alert(loadBillsDetailsDatastore.getAt(j).get('accref_seqno'));
  //                     balamt = loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value')-loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value');
                       flxVocuherDetails.getStore().insert(
                       flxVocuherDetails.getStore().getCount(),
                       new dgrecord({

                           accref_voudate  : Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   accref_vouno : loadBillsDetailsDatastore.getAt(j).get('accref_vouno'),
 	                   acctran_dbamt : loadBillsDetailsDatastore.getAt(j).get('acctran_dbamt'),
 			   refpartyinvno  : loadBillsDetailsDatastore.getAt(j).get('ref_invno'),
                           refpartyinvdate  : Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('ref_invdate'),"d-m-Y"),
                           refamount : loadBillsDetailsDatastore.getAt(j).get('ref_adjamount'),
		           seqno     : loadBillsDetailsDatastore.getAt(j).get('accref_seqno'),

                        })
                       );
        
                   }   
                   } 
                   grid_tot3();  

 
                   


                }         
	  });

        var m1 = 0;
       
    }

var flxVocuherDetails  = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:350,
    y:100,
    height: 420,
    hidden:false,
    width: 1000,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:false,width:130,align:'center', menuDisabled: true,
},
        {header: "Paid Amount" , dataIndex: 'acctran_dbamt',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Bill No"  , dataIndex: 'refpartyinvno',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Bill.Date"    , dataIndex: 'refpartyinvdate',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Adjusted"   , dataIndex: 'refamount',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Advance "   , dataIndex: 'advance',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "Seq No" , dataIndex: 'seqno',sortable:false,width:100,align:'center', menuDisabled: true,hidden : true},



    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellDblclick': function (flxVocuherDetails, rowIndex, cellIndex, e) {
		var sm = flxVocuherDetails.getSelectionModel();
		var selrow = sm.getSelected();
                vouno  = selrow.get('accref_vouno');
                SeqNo  = selrow.get('seqno');


                cmbvoc.setRawValue(vouno);
                VoucherClick();
                tabOverall.setActiveTab(2);
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:vouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
                                    }
                                }
                            });

        }      
	
   }
});


    var btnBillPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Print",
        width: 60,
        id: 'Print ',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(suppliercode);
//
       

 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Partywise_Payments.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Partywise_Payments.rptdesign' + param, '_blank');	
                }
            }

    });



    var btnGroupAbstract = new Ext.Button({
        style: 'text-align:center;',
        text: " Group Details Print",
        width: 60,
        id: 'btnGroupAbstract',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
	   var p1 = "&compcode="+encodeURIComponent(compcode);      
           var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));


 		    var param = (p1+p2+p3+p3) ;
if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroupwisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroupwisePayments.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroupwisePayments.rptdesign' + param, '_blank');
                  /*  if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroupwisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroupwisePayments.rptdesign' + param, '_blank');*/	
                }
            }

    });

    var btnGroupPartyAbstract = new Ext.Button({
        style: 'text-align:center;',
        text: " Group - Party Details Print",
        width: 60,
        id: 'btnGroupPartyAbstract',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
	   var p1 = "&compcode="+encodeURIComponent(compcode);      
           var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
           var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));


 		    var param = (p1+p2+p3+p3) ;
if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_AllPartywisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_AllPartywisePayments.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_AllPartywisePayments.rptdesign' + param, '_blank');
       
                  /*  if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_AllPartywisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_AllPartywisePayments.rptdesign' + param, '_blank');*/	
                }
            }

    });


    var btnRepParty = new Ext.Button({
        style: 'text-align:center;',
        text: "Party Abstract",
        width: 60, id: 'btnRepParty',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

 		    var p1 ="&compcode="+encodeURIComponent(compcode);      
                    var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&grpcode="+encodeURIComponent(GroupCode);       

 		    var param = (p1+p2+p3+p4) ;
if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_PartywisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_PartywisePayments.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_PartywisePayments.rptdesign' + param, '_blank');
       
                   /* if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_PartywisePayments.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGroup_PartywisePayments.rptdesign' + param, '_blank');*/
	
                }
            }
    });



    function ProcessGroupData()
    {

        txtTotalPayments.setValue(0);

        txtGroupTotalPayments.setValue(0);
        txtTotalCollAmt.setValue(0);




        flxGroupwise.getStore().removeAll();
        flxSupplier.getStore().removeAll();
        flxVocuherDetails.getStore().removeAll();


	loadGroupPaymentDatastore.removeAll();
	loadGroupPaymentDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Groupwise_Payment',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                mgrpcode   : 51,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadGroupPaymentDatastore.getCount();

                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadGroupPaymentDatastore.getAt(j).get('closing') != 0 )
                   {

                       flxGroupwise.getStore().insert(
                       flxGroupwise.getStore().getCount(),
                       new dgrecord({	
 			   cust_acc_group : loadGroupPaymentDatastore.getAt(j).get('cust_acc_group'),
			   grp_name     : loadGroupPaymentDatastore.getAt(j).get('grp_name'),
			   paidamt      : loadGroupPaymentDatastore.getAt(j).get('paidamt')
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


    function ProcessSupplierData()
    {



	txtGroupTotalPayments.setValue(0);


	txtTotalCollAmt.setValue(0);



        flxSupplier.getStore().removeAll();
       

	loadGroupPartyPaymentDatastore.removeAll();
	loadGroupPartyPaymentDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Group_Party_Payments',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                grpcode   : GroupCode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadGroupPartyPaymentDatastore.getCount();
//alert(cnt);
                   
                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
                   if (loadGroupPartyPaymentDatastore.getAt(j).get('collamt') != 0 )
                   {
                       flxSupplier.getStore().insert(
                       flxSupplier.getStore().getCount(),
                       new dgrecord({	
 			   cust_code : loadGroupPartyPaymentDatastore.getAt(j).get('cust_code'),
			   cust_name : loadGroupPartyPaymentDatastore.getAt(j).get('cust_name'),
			   paidamt  : loadGroupPartyPaymentDatastore.getAt(j).get('paidamt'),

                        })
                       );
        
                   } 
                   }   
                   } 
                   grid_tot2();  

                }         
	  });




        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  

/*

    function ProcessSubGrpData()
    {
                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);


        txtTotalCollAmt.setValue(0);
        txtTotalPayments4.setValue(0);
        txtTotalCredit4.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0)

        flxVocuherDetails.getStore().removeAll();
  
	loadTBGrp2DetailsDatastore.removeAll();
	loadTBGrp2DetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Groupwise_Payment',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
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
                       flxVocuherDetails.getStore().insert(
                       flxVocuherDetails.getStore().getCount(),
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


    var opamt = 0;
    var cloamt = 0;
    function ProcessPartyLedgerData()
    {

                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);


	loadLedgerDetailsDatastore.removeAll();
	loadLedgerDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Ledger_Details',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   : ledcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadLedgerDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                    opamt =  Number(loadLedgerDetailsDatastore.getAt(0).get('curbal_obdbamt'))+Number(loadLedgerDetailsDatastore.getAt(0).get('trn_opdr')) - Number(loadLedgerDetailsDatastore.getAt(0).get('curbal_obcramt')) - Number(loadLedgerDetailsDatastore.getAt(0).get('trn_opcr')) ;
 




                    if (opamt > 0)      
                       txtOpening_Debit.setValue(opamt);
                    else
                       txtOpening_Credit.setValue(Math.abs(opamt));
 

                   for(var j=0; j<cnt; j++)
 		   { 



                       flxDetails.getStore().insert(
                       flxDetails.getStore().getCount(),
                       new dgrecord({
                           sno          : j+1,	
// 			   voudate  : loadLedgerDetailsDatastore.getAt(j).get('accref_voudate'),
                           voudate  : Ext.util.Format.date(loadLedgerDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   led_name : loadLedgerDetailsDatastore.getAt(j).get('ledgername'),
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
                   grid_tot5();  
                   } 


                    cloamt = opamt + Number(txtLedgerDebit.getValue()) - Number(txtLedgerCredit.getValue()) ;

                    if (cloamt > 0)      
                       txtClosing_Debit.setValue(cloamt);
                    else
                       txtclosing_Credit.setValue(Math.abs(cloamt));
 
                   


                }         
	  });

        var m1 = 0;
       
    }  

*/



    function Refreshdata()
    {

//
        var dt_today = new Date();

//alert(finstartdate);

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

       ProcessGroupData();

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
        title: 'Payment',
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
			width   : 220,
			layout  : 'absolute',
			x       : 700,
			y       : 10,
			items:[optprinttype],
		},






			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 15,
			     y       : 50,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 250,
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
			    items : [flxGroupwise]
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
			    title       : '',
			    width       : 1100,
			    height      :  350,
			    x           : 550,
			    y           : 90,
			    border      : false,
			    items : [flxSupplier]
			},
		{
		    xtype       : 'fieldset',
		    x           : 110,
		    y           : 450,
		    border      : false,
		    width       : 500,
                    labelWidth  : 130,
		    items : [txtTotalPayments]
		},

		{
		    xtype       : 'fieldset',
		    x           : 200,
		    y           : 480,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnGroupAbstract]
		},

		{
		    xtype       : 'fieldset',
		    x           : 360,
		    y           : 480,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnGroupPartyAbstract]
		},



		{
		    xtype       : 'fieldset',
		    x           : 700,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 120,
		    items : [txtGroupTotalPayments]
		},


		{
		    xtype       : 'fieldset',
		    x           : 700,
		    y           : 480,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnRepParty]
		},


        ]
    },

    {
        xtype: 'panel',
        title: 'Date wise Payments',
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
		    title       : '',
		    width       : 1100,
		    height      : 500,
		    x           : 10,
		    y           : 50,
		    border      : false,
		    items : [flxVocuherDetails]
		},


		{
		    xtype       : 'fieldset',
		    x           : 180,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 140,
		    items : [txtTotalCollAmt]
		},


		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 140,
		    items : [txtTotalAdjAmt]
		},

		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 350,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnBillPrint]
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
    height : 600,
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

;



        }
    }
});
myWin.show();
    });




