Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var partyname = "";
   var gsttype = 'b2b';

   var printtype='PDF';
   var hsnhead  = '';  
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);



   var btnPrintGSTR1Abs = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-Ledger wise",
        width   : 100,
        id      :'btnPrintGSTR1Abs',
        x       : 1200,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var param = (comp+fin+fd+td) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Ledgerwise_Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Ledgerwise_Abstract.rptdesign&__format=XLSX' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Ledgerwise_Abstract.rptdesign' + param, '_blank');



	    }
	}
	});




   var btnPrintGSTR1_Type_Abs = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-Sub-Abstract",
        width   : 100,
        id      :'btnPrintGSTR1_Type_Abs',
        x       : 800,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var gst = "&gsttype="+encodeURIComponent(gsttype);

                 var param = (comp+fin+fd+td+gst) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign' + param, '_blank');



	    }
	}
	});


   var btnPrintGSTR1_Customer_Details = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-Detail",
        width   : 100,
        id      :'btnPrintGSTR1_Customer_Details',
        x       : 950,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

            if (partyname != "" && gsttype != "")
            {  
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var party = "&party="+encodeURIComponent(partyname);
                 var gst = "&gsttype="+encodeURIComponent(gsttype);
                 var param = (comp+fin+fd+td+party+gst) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign' + param, '_blank');

              } 

	    }
	}
	});

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
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date','accref_narration'])
    });
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
 	 	   var param = (p1 + p2 + p3 + p4  );   
                   if (vno  == "GSI") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf' + param); 




	    }
	}
	});

 var loadDayBookDatastore = new Ext.data.Store({
      id: 'loadDayBookDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDayBookDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      }, [ 'sno' ,'accref_voudate', 'cust_name', 'voutype', 'accref_payref_no', 'accref_vouno', 'acctran_dbamt', 'acctran_cramt', 'acctran_led_code', 'accref_seqno'

      ]),
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
        store:loadDayBookDatastore,
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





   var loadGSTR1LedgerListDataStore = new Ext.data.Store({
      id: 'loadGSTR1LedgerListDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1LedgerAbstract"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grp', 'saltype', 'ledgername', 'qty', 'goodsValue', 'freight', 'taxable', 'igst', 'cgst', 'sgst', 'tottaxamt', 'nos','doclist'
      ]),
    });


   var loadGSTR1LedgerDetailDataStore = new Ext.data.Store({
      id: 'loadGSTR1LedgerDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1LedgerDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invh_date', 'invh_invrefno', 'cust_name', 'qty', 'goodsValue', 'freight', 'taxable', 'igst', 'cgst', 'sgst', 'tcs', 'tottaxamt', 'totalamt'
      ]),
    });


   var loadGSTR1PartyDetailDataStore = new Ext.data.Store({
      id: 'loadGSTR1PartyDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1PartyDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invh_vouno', 'saldate', 'invdate', 'voucherno', 'salesvalue', 'igstamount', 'cgstamount', 'sgstamount', 'invamount'
      ]),
    });


   var txtTotVouchers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotVouchers',
        name        : 'txtTotValue',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 0,
    });




   var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable',
        name        : 'txtTotTaxable',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST',
        name        : 'txtTotIGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST',
        name        : 'txtTotCGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST',
        name        : 'txtTotSGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCess',
        name        : 'txtTotCess',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotTaxAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxAmount',
        name        : 'txtTotTaxAmount',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotValue1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue1',
        name        : 'txtTotValue1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable1',
        name        : 'txtTotTaxable1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST1',
        name        : 'txtTotIGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST1',
        name        : 'txtTotCGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST1',
        name        : 'txtTotSGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotFreight1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotFreight1',
        name        : 'txtTotFreight1',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotTax1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTax1',
        name        : 'txtTotTax1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotVocuhers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotVocuhers',
        name        : 'txtTotVocuhers',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


var lblTaxValue = new Ext.form.Label({
    fieldLabel  : 'TOT TAX VAL',
    id          : 'lblTaxValue',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblIGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL IGST',
    id          : 'lblIGST',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblCGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL CGST',
    id          : 'lblCGST',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL SGST',
    id          : 'lblSGST',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblCESS = new Ext.form.Label({
    fieldLabel  : 'TOTAL CESS',
    id          : 'lblCESS',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblTotalValue = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALIE',
    id          : 'lblTotalValue',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

   var txtTotValue2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue2',
        name        : 'txtTotValue2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable2',
        name        : 'txtTotTaxable2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST2',
        name        : 'txtTotIGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST2',
        name        : 'txtTotCGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST2',
        name        : 'txtTotSGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCess2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCess2',
        name        : 'txtTotCess2',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
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

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date()   
    });






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



// mdays = Ext.util.Format.date(new Date(),"d");


//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
          
	flxld.getStore().removeAll();
	flxGSTR1_Detail.getStore().removeAll();
	flxGSTR1_Customer.getStore().removeAll();

	loadGSTR1LedgerListDataStore.removeAll();
	loadGSTR1LedgerListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadGSTR1LedgerAbstract',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

    
		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Main()
		}
	    });



     
}




     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        width : 150,
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
                  lblDetail1.setText('');
                  lblDetail2.setText('');
                  loadPartyListDataStore.removeAll();
                  loadGSTR1LedgerDetailDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    




 var loadPartyListDataStore = new Ext.data.Store({
      id: 'loadPartyListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespatchedPartywise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['quality', 'vargrp_type_short_code', 'vargrp_type_code', 'cust_name', 'cust_code', 'invwt', 'invvalue' ]),
    });


var lblGSTTypeHeader = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTTypeHeader',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});

var lblGSTTypeHeader2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTTypeHeader2',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});

var lblGSTPatyName = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTPatyName',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});
var lblDetail1 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblDetail1 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblDetail2 = new Ext.form.Label({
    fieldLabel  : 'TOTAL TAXABLE',
    id          : 'lblDetail2',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail3 = new Ext.form.Label({
    fieldLabel  : 'IGST AMOUNT',
    id          : 'lblDetail3',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail4 = new Ext.form.Label({
    fieldLabel  : 'CGST AMOUNT',
    id          : 'lblDetail4',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail5 = new Ext.form.Label({
    fieldLabel  : 'SGST AMOUNT',
    id          : 'lblDetail5',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail6 = new Ext.form.Label({
    fieldLabel  : 'CESS AMT',
    id          : 'lblDetail6',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail7 = new Ext.form.Label({
    fieldLabel  : 'TOT TAX AMOUNT',
    id          : 'lblDetail7',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail8 = new Ext.form.Label({
    fieldLabel  : 'TOT VOUCHERS',
    id          : 'lblDetail8',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail11 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail11',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblDetail21 = new Ext.form.Label({
    fieldLabel  : 'TOTAL TAXABLE',
    id          : 'lblDetail21',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail31 = new Ext.form.Label({
    fieldLabel  : 'IGST AMOUNT',
    id          : 'lblDetail31',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail41 = new Ext.form.Label({
    fieldLabel  : 'CGST AMOUNT',
    id          : 'lblDetail41',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail51 = new Ext.form.Label({
    fieldLabel  : 'SGST AMOUNT',
    id          : 'lblDetail51',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail61 = new Ext.form.Label({
    fieldLabel  : 'FREIGHT AMT',
    id          : 'lblDetail61',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail71 = new Ext.form.Label({
    fieldLabel  : 'TOT Vouchers',
    id          : 'lblDetail71',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail81 = new Ext.form.Label({
    fieldLabel  : 'TOT TAX AMT',
    id          : 'lblDetail81',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
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
	loadGSTR1LedgerListDataStore.removeAll();
	loadGSTR1LedgerListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadGSTR1LedgerAbstract',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Main();
		}
	    });
     
       	 }
        }   
});




function grid_tot_customer(){
        var nos = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var tottax = 0;
        var totinvamt = 0;
        var Row= flxGSTR1_Customer.getStore().getCount();
        flxGSTR1_Customer.getSelectionModel().selectAll();
        var sel=flxGSTR1_Customer.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
	      taxable=Number(taxable)+Number(sel[i].data.salesvalue);
	      igst=Number(igst)+Number(sel[i].data.igstamount);
	      cgst=Number(cgst)+Number(sel[i].data.cgstamount);
	      sgst=Number(sgst)+Number(sel[i].data.sgstamount);
	      cess=Number(cess)+Number(sel[i].data.cessamt);
	      tottax=Number(tottax)+Number(sel[i].data.taxamount);
	      totinvamt=Number(totinvamt)+Number(sel[i].data.invamount);
        }


        txtTotTaxable2.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST2.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST2.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST2.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotCess2.setRawValue(Ext.util.Format.number(cess,"0.00"));
        txtTotValue2.setRawValue(Ext.util.Format.number(totinvamt,"0.00"));


}


function grid_tot_ledgerwise(){
        var nos = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var frt  = 0;
        var tottax = 0;
        var totinvamt = 0;
        var Row= flxGSTR1_Detail.getStore().getCount();
        flxGSTR1_Detail.getSelectionModel().selectAll();
        var sel=flxGSTR1_Detail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {

	      taxable=Number(taxable)+Number(sel[i].data.taxable);
	      igst=Number(igst)+Number(sel[i].data.igst);
	      cgst=Number(cgst)+Number(sel[i].data.cgst);
	      sgst=Number(sgst)+Number(sel[i].data.sgst);
	      frt =Number(frt)+Number(sel[i].data.freight);
	      tottax=Number(tottax)+Number(sel[i].data.tottaxamt);
	      totinvamt=Number(totinvamt)+Number(sel[i].data.totalamt);
        }


        txtTotVocuhers.setRawValue(Ext.util.Format.number(Row,"0"));
        txtTotTaxable1.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST1.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST1.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST1.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotFreight1.setRawValue(Ext.util.Format.number(frt,"0.00"));
        txtTotTax1.setRawValue(Ext.util.Format.number(tottax,"0.00"));
        txtTotValue1.setRawValue(Ext.util.Format.number(totinvamt,"0.00"));

}




function grid_tot_Main(){
        var vounos  = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var invvalue = 0;
        var tottax = 0;

        var Row= flxGSTR1.getStore().getCount();
        flxGSTR1.getSelectionModel().selectAll();
        var sel=flxGSTR1.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
	      vounos =Number(vounos)+Number(sel[i].data.nos);

	      taxable=Number(taxable)+Number(sel[i].data.goodsValue);
	      igst=Number(igst)+Number(sel[i].data.igst);
	      cgst=Number(cgst)+Number(sel[i].data.cgst);
	      sgst=Number(sgst)+Number(sel[i].data.sgst);
	      tottax=Number(tottax)+Number(sel[i].data.tottaxamt);

        }
        txtTotVouchers.setRawValue(Ext.util.Format.number(vounos,"0"));
        txtTotTaxable.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotTaxAmount.setRawValue(Ext.util.Format.number(tottax,"0.00"));

}


var dgrecord = Ext.data.Record.create([]);

var fm1 = Ext.form;



var flxGSTR1 = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 350,
    hidden:false,
    width: 1400,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "printorder", dataIndex: 'grp',sortable:true,width:40,align:'left',hidden:true},
        {header: "type", dataIndex: 'saltype',sortable:true,width:50,align:'left',hidden:true},
        {header: "Particulars", dataIndex: 'ledgername',sortable:true,width:250,align:'left',hidden:false},
        {header: "Qty(t)", dataIndex: 'qty',sortable:true,width:90,align:'right'},	
        {header: "Gross Value" , dataIndex: 'goodsValue',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Freight" , dataIndex: 'freight',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Taxable Amount", dataIndex: 'taxable',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "IGST Amount", dataIndex: 'igst',sortable:true,width:130,align:'right'},	
        {header: "CGST Amount", dataIndex: 'cgst',sortable:true,width:130,align:'right'},	
        {header: "SGST Amount" , dataIndex: 'sgst',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "TAX  Amount" , dataIndex: 'tottaxamt',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Vou.Count", dataIndex: 'nos',sortable:true,width:90,align:'center'},	
        {header: "Document List", dataIndex: 'doclist',sortable:true,width:1000,align:'left'},
    ],

    store:loadGSTR1LedgerListDataStore,
    listeners:{	

            'cellclick': function (flxGSTR1, rowIndex, cellIndex, e) {
		var sm = flxGSTR1.getSelectionModel();
		var selrow = sm.getSelected();

            tabOverall.setActiveTab(1);

            lblGSTTypeHeader.setText("Voucher List for : " + selrow.get('ledgername')  );
            lblGSTTypeHeader2.setText(" Voucher List for : " + selrow.get('ledgername')  );
                gsttype =  selrow.get('gtype');
		flxld.getStore().removeAll();
		flxGSTR1_Detail.getStore().removeAll();
		flxGSTR1_Customer.getStore().removeAll();

            grp =  selrow.get('grp')    

            if (grp == 1 || grp == 3 || grp == 4 )
            {     
	    loadGSTR1LedgerDetailDataStore.removeAll();
	    loadGSTR1LedgerDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1LedgerDetail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                grpcode : grp,
                ledname: selrow.get('ledgername')  ,
		},
		scope:this,
		callback:function()
		{
                  grid_tot_ledgerwise();
   
		}
	    });
            }    
            else if (grp == 2)
            {     
	    loadGSTR1LedgerDetailDataStore.removeAll();
	    loadGSTR1LedgerDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1LedgerDetail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                grpcode : grp,
             ledname: selrow.get('ledgername')  ,
		},
		scope:this,
		callback:function()
		{
                  grid_tot_ledgerwise();
   
		}
	    });
            }   
/*
            else if (grp == 4)
            {     
	    loadGSTR1LedgerDetailDataStore.removeAll();
	    loadGSTR1LedgerDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1LedgerDetail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                grpcode : grp,
                ledname: selrow.get('ledgername')  ,
		},
		scope:this,
		callback:function()
		{
                  grid_tot_ledgerwise();
   
		}
	    });
            }  
*/      
    }
 }
});

  function VoucherClick(){

//alert("HELLO");
//alert(cmbvoc.getRawValue());

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
                        fcompcode:Gincompcode,
                        ffinid:GinFinid,
                        vouno:cmbvoc.getValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){
//alert(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));

                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));
                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtnarration2.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));
                                txtnarration.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));
//                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");
  //                              txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");                         


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



var flxGSTR1_Detail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 410,
    hidden:false,
    width: 1300,
  //  id: 'my-grid',  

    columns:
    [ 	 



        {header: "Date", dataIndex: 'invh_date',sortable:true,width:90,align:'center',hidden:false},
        {header: "Inv.No ", dataIndex: 'invh_invrefno',sortable:true,width:100,align:'center',hidden:false},
        {header: "Particulars", dataIndex: 'cust_name',sortable:true,width:250,align:'left',hidden:false},
        {header: "Qty(t)", dataIndex: 'qty',sortable:true,width:90,align:'right'},	
        {header: "Gross Value" , dataIndex: 'goodsValue',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Freight" , dataIndex: 'freight',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Taxable Amount", dataIndex: 'taxable',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "IGST Amount", dataIndex: 'igst',sortable:true,width:130,align:'right'},	
        {header: "CGST Amount", dataIndex: 'cgst',sortable:true,width:130,align:'right'},	
        {header: "SGST Amount" , dataIndex: 'sgst',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "TCS Amount", dataIndex: 'tcs',sortable:true,width:130,align:'right'},
        {header: "TAX  Amount" , dataIndex: 'tottaxamt',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Net Amt", dataIndex: 'totalamt',sortable:true,width:100,align:'left'},

    ],

    store:loadGSTR1LedgerDetailDataStore,
    listeners:{	


            'rowDblClick': function (flxGSTR1, rowIndex, cellIndex, e) {
		var sm = flxGSTR1_Detail.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));



   	flxld.getStore().removeAll();
	flxGSTR1_Customer.getStore().removeAll();


            tabOverall.setActiveTab(2);



                var selerow =flxGSTR1_Detail.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('invh_invrefno');
                }

	       flxld.getStore().removeAll();


                tabOverall.setActiveTab(3);
                cmbvoc.setValue(b);

//alert(cmbvoc.getValue());
                VoucherClick();
	        flxld.getSelectionModel().selectAll();



/*
            lblGSTPatyName.setText("Document List for : " + selrow.get('cust_name')  );
            partyname =  selrow.get('cust_name'); 
	    loadGSTR1PartyDetailDataStore.removeAll();
	    loadGSTR1PartyDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1PartyDetail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                party  : selrow.get('cust_name') ,
                gsttype  : gsttype,
		},
		scope:this,
		callback:function()
		{
                   grid_tot_customer();
                   qlylist = "";
		}
	    });
*/
     
    }


}
});




var flxGSTR1_Customer = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 410,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 


        {header: "invh_vouno", dataIndex: 'invh_vouno',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'saldate',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'invdate',sortable:true,width:105,align:'center',hidden:false},

        {header: "Voucher No", dataIndex: 'voucherno',sortable:true,width:130,align:'center'},
        {header: "TAXABLE AMOUNT"    ,  dataIndex: 'salesvalue',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "IGST AMOUNT", dataIndex: 'igstamount',sortable:true,width:140,align:'right'},	
        {header: "CGST AMOUNT", dataIndex: 'cgstamount',sortable:true,width:140,align:'right'},	
        {header: "SGST AMOUNT", dataIndex: 'sgstamount',sortable:true,width:140,align:'right'},	
        {header: "CESS AMT" , dataIndex: 'cessamt',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "GROSS TOTAL" , dataIndex: 'invamount',sortable:false,width:140,align:'right', menuDisabled: true},

    ],

    store:loadGSTR1PartyDetailDataStore,
    listeners:{	


            'rowDblClick' : function(flxGSTR1_Customer,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);

                var selerow =flxGSTR1_Customer.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('voucherno');
                }

	       flxld.getStore().removeAll();

//alert(b);
                tabOverall.setActiveTab(3);
                cmbvoc.setValue(b);

//alert(cmbvoc.getValue());
                VoucherClick();
	        flxld.getSelectionModel().selectAll();



            },
/*
            'cellclick': function (flxGSTR1_Detail, rowIndex, cellIndex, e) {
                tabOverall.setActiveTab(2);
                 var selected_rows =flxGSTR1_Detail.getSelectionModel().getSelections();
alert("2-1");
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.invh_vouno;
		         }
       alert("2-2");
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:Gincompcode,
                                    ffinid:GinFinid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
       //  tabOverall.setActiveTab(1);
                                     }
                                }
                            });

	   },
*/
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =flxGSTR1_Detail.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('invh_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

 }
});




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
    width       : 1300,
    items       : [
    {
        xtype: 'panel',
        title: 'GSTR-1 BREAKUP',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
      
                 { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : true,
		             x       : 900,
                             width   : 250,
                             height  : 50,
			     y       : 0,
                             items: [optprinttype]
                        },

                        btnPrintGSTR1Abs,
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                             width   : 300,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 290,
			     y       : 10,
                             width   : 220,

                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             width   : 200,

                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 12,
                             items: [btnProcess]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : true,
		             x       : 10,
   			    width    : 2000,
			     y       : 60,
                             items: [flxGSTR1]
                        },


			{
			    xtype       : 'fieldset',
			    x           : 220,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail8]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 230,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotVouchers]
			},
			{
			    xtype       : 'fieldset',
			    x           : 345,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail2]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 335,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxable]
			},

			{
			    xtype       : 'fieldset',
			    x           : 490,
			    y           : 430,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail3]
			},

			{
			    xtype       : 'fieldset',
			    x           : 475,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotIGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 625,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail4]
			},
			{
			    xtype       : 'fieldset',
			    x           : 610,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 765,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail5]
			},

			{
			    xtype       : 'fieldset',
			    x           : 750,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotSGST]
			},
/*
			{
			    xtype       : 'fieldset',
			    x           : 895,
			    y           : 425,
			    border      : false,
			    width       :300,
		            labelWidth  : 120,
			    items : [lblDetail6]
			},
	
			{
			    xtype       : 'fieldset',
			    x           : 875,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCess]
			},
*/
			{
			    xtype       : 'fieldset',
			    x           : 980,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblDetail7]
			},
			{
			    xtype       : 'fieldset',
			    x           : 970,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxAmount]
			},

/*
			{
			    xtype       : 'fieldset',
			    x           : 1130,
			    y           : 425,
			    border      : false,
			    width       :  500,
		            labelWidth  : 120,
			    items : [lblDetail1]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1115,
			    y           : 450,
			    border      : false,
			    width       : 500,
		            labelWidth  : 10,
			    items : [txtTotValue]
			},

*/

        ]
     } ,
    {
        xtype: 'panel',
        title: 'LEDGERWISE BREAKUP',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


btnPrintGSTR1_Type_Abs,





			{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 20,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblGSTTypeHeader]
			},	

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 60,
                             items: [flxGSTR1_Detail]
                        },




			{
			    xtype       : 'fieldset',
			    x           : 60,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblDetail71]
			},	

			{
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotVocuhers]
			},


			{
			    xtype       : 'fieldset',
			    x           : 240,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail21]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 225,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxable1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 400,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail31]
			},

			{
			    xtype       : 'fieldset',
			    x           : 375,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotIGST1]
			},

			{
			    xtype       : 'fieldset',
			    x           : 550,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail41]
			},
			{
			    xtype       : 'fieldset',
			    x           : 525,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCGST1]
			},

			{
			    xtype       : 'fieldset',
			    x           : 705,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail51]
			},
			{
			    xtype       : 'fieldset',
			    x           : 680,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotSGST1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 840,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail61]
			},

			{
			    xtype       : 'fieldset',
			    x           : 825,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotFreight1]
			},
			{
			    xtype       : 'fieldset',
			    x           : 980,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail81]
			},

			{
			    xtype       : 'fieldset',
			    x           : 965,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTax1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 1110,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail11]
			},


			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotValue1]
			},


        ]
     } ,
   

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
  //          items : [btnview]
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


    function Refreshdata()
    {
        qlylist = '';
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 

        cmbMonth.setValue(parseInt(m1));
        find_dates(parseInt(m1));



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'HSN WISE Sales Details',
        items       : tabOverall,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
