
Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
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

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 

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

    var MainGroupCode = 0;
    var MainGroupName = '';


    var SubGroupCode = 0;
    var SubGroupName = '';

    var SubGroup2Code = 0;
    var SubGroup2Name = '';

    var SubLedgerCode = 0;
    var SubLedgerName = '';


   var printtype='PDF';

var indirectexpenses = 0;
var salesaccount = 0;
var purchaseaccount = 0;
var directexpenses = 0;
var indirectincomes = 0;
var openingstock = 0;
var codeindirectexpenses = 0;
var codesalesaccount = 0;
var codepurchaseaccount = 0;
var codedirectexpenses = 0;
var codeindirectincomes = 0;
var codeopeningstock = 0;
var subtotalexp = 0;
var subtotalinc = 0;
var profit_loss = 0;


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
//           'subgrp', 'grp_name', 'led_name', 'acctran_led_code', 'closing','debit','credit'

      {name:'grp_name',type:'string'},
      {name:'subgrp',type:'int'},
      {name:'led_name',type:'string'},
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


    // define a custom summary function
    Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
        return v + (record.data.credit);
    };

  // utilize custom extension for Group Summary
    var summary = new Ext.ux.grid.GroupSummary();

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,

    x:300,
    y:100,
    height: 350,
    hidden:false,
    width: 600,
  //  id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	

        {header: "Description " , dataIndex: 'grp_name',sortable:false,width:100,align:'left', menuDisabled: true,hidden :true},

        {header: "Ledger " , dataIndex: 'led_name',sortable:false,width:200,align:'left', menuDisabled: true,
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
        renderTo: document.body

});

  var PLMaingrpDataStorPLMaingrpDataStore = new Ext.data.Store({
        id: 'PLMaingrpDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadPandLMainGroup"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['grpcode1','grp_name', 'Obdebit', 'Obcredit', 'debit', 'credit', 'closing' ])
    });

  var loadOpeningStockDataStore = new Ext.data.Store({
        id: 'loadOpeningStockDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadOpeningStock"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['grpcode2','grpname2', 'Obdebit', 'Obcredit', 'debit', 'credit' , 'closing' ])
    });

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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
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
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


   var txtTotalCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit',
        name        : 'txtTotalCredit',
        width       :  120,
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
        width       :  120,
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
        width       :  120,
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
        width       :  120,
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
        width       :  120,
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
        width       :  120,
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
        store: [],
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
        var Row= flxMainGroup.getStore().getCount();
        flxMainGroup.getSelectionModel().selectAll();
        var sel=flxMainGroup.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
         }
        txtTotalDebit.setValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit.setValue(Ext.util.Format.number(cr,"0.00"));

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
        txtTotalDebit2.setValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit2.setValue(Ext.util.Format.number(cr,"0.00"));
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
        txtTotalDebit3.setValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit3.setValue(Ext.util.Format.number(cr,"0.00"));
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
        txtTotalDebit4.setValue(Ext.util.Format.number(dr,"0.00"));
        txtTotalCredit4.setValue(Ext.util.Format.number(cr,"0.00"));
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
        txtLedgerDebit.setValue(Ext.util.Format.number(dr,"0.00"));
        txtLedgerCredit.setValue(Ext.util.Format.number(cr,"0.00"));
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
                  ProcessMainGrpData();
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

var lblExpenses = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblExpenses',
        name        : 'lblExpenses',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '18px','font-weight':'bold'
        },
        width       : 550
    });


var lblIncomes = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblIncomes',
        name        : 'lblIncomes',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '18px','font-weight':'bold'
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

var flxExpenses = new Ext.grid.EditorGridPanel({
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
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:170,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('grpname');
		    if(vou === "SUB TOTAL") {
			meta.style = "background-color:#ffff00;";
		    }
		    if(vou === "TOTAL") {
			meta.style = "background-color:#ff00ff;";
		    }
		    return value;
		  }
},

        {header: "Amount" , dataIndex: 'amount',sortable:false,width:150,align:'right', menuDisabled: true,

renderer: function (val, meta, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
         currency: 'INR',
         });
      }
   },
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMainGroup, rowIndex, cellIndex, e) {
		var sm = flxMainGroup.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                MainGroupCode = selrow.get('grpcode');
                MainGroupName = selrow.get('grpname')
                lblMainGroup.setText("Details for : " + selrow.get('grpname'));
//                ProcessMainSubGrpData();

        }      
	
   }
});


var flxIncomes = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 350,
    hidden:false,
    width: 460,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "GRP Code" , dataIndex: 'grpcode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Description " , dataIndex: 'grpname',sortable:false,width:170,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('grpname');
		    if(vou === "SUB TOTAL") {
			meta.style = "background-color:#ffff00;";
		    }
		    if(vou === "TOTAL") {
			meta.style = "background-color:#ff00ff;";
		    }
		    return value;
		  }
},

        {header: "Amount" , dataIndex: 'amount',sortable:false,width:150,align:'right', menuDisabled: true,

renderer: function (val, meta, r){
    if (val > 0) 
    { 
     return  parseFloat(val).toLocaleString('en-In', {
         maximumFractionDigits: 2,
         minimumFractionDigits: 2,
         currency: 'INR',
         });
      }
   },
},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMainGroup, rowIndex, cellIndex, e) {
		var sm = flxMainGroup.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grpcode');
                MainGroupCode = selrow.get('grpcode');
                MainGroupName = selrow.get('grpname')
                lblMainGroup.setText("Details for : " + selrow.get('grpname'));
//                ProcessMainSubGrpData();

        }      
	
   }
});

function testhello()
{
alert("Hai");
myobject ='01';
}






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
              

                    var p1 = "&finid=" + encodeURIComponent(finid);
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 		    var param = (p1+p2+p3+p4) ;
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
       

 		    var param = (p1+p2+p3+p4+p5+p6) ;
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
       

 		    var param = (p1+p2+p3+p4+p5+p6) ;
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
       

 		    var param = (p1+p2+p3+p4+p5+p6) ;
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
       

 		    var param = (p1+p2+p3+p4+p5+p6) ;
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

	indirectexpenses = 0;
	salesaccount = 0;
	purchaseaccount = 0;
	directexpenses = 0;
	indirectincomes = 0;
	openingstock = 0;
	codeindirectexpenses = 0;
	codesalesaccount = 0;
	codepurchaseaccount = 0;
	codedirectexpenses = 0;
	codeindirectincomes = 0;
	codeopeningstock = 0;
        subtotalexp = 0;
        subtotalinc = 0;


        flxExpenses.getStore().removeAll();
        flxIncomes.getStore().removeAll();
	PLMaingrpDataStorPLMaingrpDataStore.removeAll();
	PLMaingrpDataStorPLMaingrpDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadPandLMainGroup',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{
                   var cnt=PLMaingrpDataStorPLMaingrpDataStore.getCount();

                   if(cnt>0)
                   {
                   for(var j=0; j<cnt; j++)
 		   { 
         
//alert(PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name'));
                    if (PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name')==  "INDIRECT EXPESNES")
                    { 
                       indirectexpenses = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('closing');
                       codeindirectexpenses = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grpcode1');

                    }   
                    else if (PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name')==  "SALES ACCOUNTS")
                    {
                       salesaccount = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('closing');
                       codesalesaccount = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grpcode1');

                    }
                    else if (PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name')==  "PURCHASE ACCOUNTS")
                    { 
                       purchaseaccount = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('closing');
                       codepurchaseaccount = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grpcode1');
                    }

                    else if (PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name')==  "DIRECT EXPENSES")
                    { 
                       directexpenses = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('closing');
                       codedirectexpenses = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grpcode1');
                    }
                    else if (PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grp_name')==  "INDIRECT INCOMES")
                    { 
                       indirectincomes = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('closing');
                       codeindirectincomes = PLMaingrpDataStorPLMaingrpDataStore.getAt(j).get('grpcode1');
                    }

                   }   
                   } 


	loadOpeningStockDataStore.removeAll();
	loadOpeningStockDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadOpeningStock',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadOpeningStockDataStore.getCount();

              
                  if(cnt>0)
                  {
		           for(var j=0; j<cnt; j++)
	 		   { 
 
		            if (loadOpeningStockDataStore.getAt(j).get('grpname2') ==  "OPENING STOCK")
		            {   
		               openingstock = loadOpeningStockDataStore.getAt(j).get('closing')
		               codeopeningstock = loadOpeningStockDataStore.getAt(j).get('grpcode2')
		            } 
		           }   
                  } 
// EXPENSES

//alert(openingstock);
//alert(purchaseaccount);
//alert(directexpenses);
//alert(salesaccount);
//alert(indirectexpenses);

                  subtotalexp = Number(openingstock) + Number(purchaseaccount) + Number(directexpenses);
                  profit_loss =  Number(purchaseaccount) + Number(directexpenses) - Number(salesaccount);
                  subtotalinc = Number(openingstock) + Number(salesaccount) + Number(profit_loss);

                  totalexp =  Number(profit_loss)  + Number(indirectexpenses) 

                  subtotalexp = Ext.util.Format.number(subtotalexp,"0.00");
                  profit_loss = Ext.util.Format.number(profit_loss,"0.00");
                  subtotalinc = Ext.util.Format.number(subtotalinc,"0.00");

                  totalexp = Ext.util.Format.number(totalexp,"0.00");



		  if (openingstock >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:codeopeningstock,
		            grpname:'OPENING STOCK',
		            amount:openingstock
		        })
		        );
		  } 
		  if (purchaseaccount >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:codepurchaseaccount,
		            grpname:'PURCHASE ACCOUNTS',
		            amount:purchaseaccount
		        })
		        );
		  } 
 		  if (directexpenses >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:codedirectexpenses,
		            grpname:'DIRECT EXPENSES',
		            amount:directexpenses
		        })
		        );
		  } 
   		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({

		        })
		        );

 		  if (subtotalexp >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:0,
		            grpname:'SUB TOTAL',
		            amount:subtotalexp
		        })
		        );

		  } 
   		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({

		        })
		        );


		  if (profit_loss >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord1({
		            grpcode:0 ,
		            grpname:'GROSS LOSS',
		            amount: Math.abs(profit_loss)
		        })
		        );
		  } 

 		  if (indirectexpenses >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:codeindirectexpenses,
		            grpname:'INDIRECT EXPENSES',
		            amount:indirectexpenses
		        })
		        );
		  } 

   		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({

		        })
		        );

   		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({

		        })
		        );

 		  if (totalexp >0)
		  { 
		        flxExpenses.getStore().insert(
		        flxExpenses.getStore().getCount(),
		        new dgrecord({
		            grpcode:0,
		            grpname:'TOTAL',
		            amount:totalexp
		        })
		        );
		  }

// INCOMES

		  if (salesaccount >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({
		            grpcode:codesalesaccount,
		            grpname:'SALES ACCOUNTS',
		            amount:salesaccount
		        })
		        );
		  } 

		  if (openingstock >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({
		            grpcode:codeopeningstock,
		            grpname:'CLOSING STOCK',
		            amount:openingstock
		        })
		        );
		  } 

		  if (profit_loss >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({
		            grpcode:0 ,
		            grpname:'GROSS LOSS',
		            amount: Math.abs(profit_loss)
		        })
		        );
		  } 
   		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({

		        })
		        );

 		  if (subtotalinc >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({
		            grpcode:0,
		            grpname:'SUB TOTAL',
		            amount:subtotalinc
		        })
		        );
		  } 

   		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({

		        })
		        );

 		  if (indirectincomes >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord({
		            grpcode:codeindirectincomes,
		            grpname:'INDIRECT INCOMES',
		            amount:indirectincomes
		        })
		        );
		  } 
 		  if (indirectincomes >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord({
		            grpcode:codeindirectincomes,
		            grpname:'Net Loss',
		            amount: Number(totalexp) - Number(indirectincomes)
		        })
		        );
		  } 
   		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({

		        })
		        );

   		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord1({

		        })
		        );


 		  if (totalexp >0)
		  { 
		        flxIncomes.getStore().insert(
		        flxIncomes.getStore().getCount(),
		        new dgrecord({
		            grpcode:0,
		            grpname:'TOTAL',
		            amount:totalexp
		        })
		        );
		  }

                }         
	  });

                }         
	  });



    }  


    function ProcessMainSubGrpData()
    {


    }  


    function ProcessSubGrpData()
    {


    }  


    function ProcessLedgerData()
    {
       
    }  


    var opamt = 0;
    var cloamt = 0;
    function ProcessPartyLedgerData()
    {

       
    }  

    function Refreshdata()
    {

//
        var dt_today = new Date();

//alert(finstartdate);

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));


           if (Ext.util.Format.date(monthenddate.getValue(), "Y-m-d") > Ext.util.Format.date(finenddate, "Y-m-d"))
            monthenddate.setValue(finenddate);

	   var finstdate='2022-10-31';
           monthenddate.setValue(finstdate);


       ProcessMainGrpData();

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
        title: 'P & L ABSTRACT',
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
            x           : 120,
            y           : 100,
            border      : false,
            width       :500,
            items : [lblExpenses]
        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 340,
                             border  : false,
		             x       : 10,
			     y       : 130,
                             items: [flxExpenses]
                        },
	{
            xtype       : 'fieldset',
            x           : 440,
            y           : 100,
            border      : false,
            width       :500,
            items : [lblIncomes]
        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 340,
                             border  : false,
		             x       : 328,
			     y       : 130,
                             items: [flxIncomes]
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
            title       : '',
            x           : 10,
            y           : 30,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [flxDetail]
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
      
	    Ext.getCmp('lblExpenses').setText('EXPENSES');
	    Ext.getCmp('lblIncomes').setText('INCOMES');
            Refreshdata();


        }
    }
});
myWin.show();
    });




