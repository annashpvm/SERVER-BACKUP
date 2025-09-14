Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var voutype  = localStorage.getItem('voutype');


   var yr  = localStorage.getItem('gstyear');
   var  invfin = localStorage.getItem('invfin');
   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";



   var printtype='PDF';
   var hsnhead  = '';  
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);

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


    var loadBRPendingDetailsDataStore = new Ext.data.Store({
        id: 'loadBRPendingDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_BR_Pending"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno', 'accref_voudate', 'accref_vouno', 'cust_ref', 'acctrail_inv_value', 'acctrail_adj_value', 'balance'])
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
        },['accref_voudate','acctran_dbamt','acctran_cramt','led_name','accref_payref_no','accref_payref_date'])
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

                   var vno = cmbvoc.getRawValue();                

                   var invno = txtvouref.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&vouno=" + encodeURIComponent(vno);
 	 	   var param = (p1 + p2 + p3);   

		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintExpenses.rptdesign&__format=pdf' + param); 




	    }
	}
	});


   var btnAbsPrint = new Ext.Button({
        style   : 'text-align:center;',
        text    : "DATEWISE PRINT",
        width   : 180,
        id      :'btnAbsPrint',
        x       : 10,
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

                   var vtype = voutype;                

                   var invno = txtvouref.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
             	   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
	           var p3 = "&voutype=" + encodeURIComponent(vtype);
	 	    var param = (p1 + p2 + p3);   
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Amount_Pending.rptdesign&__format=pdf'+ param); 




	    }
	}
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
      }, [ 'sno' ,'accref_voudate', 'led_name', 'voutype', 'accref_payref_no', 'accref_vouno', 'acctran_dbamt', 'acctran_cramt', 'acctran_led_code', 'accref_seqno'

      ]),
    });



   var loadTDSListDataStore = new Ext.data.Store({
      id: 'loadTDSListDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTDSDatewiseList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'eh_expvouno', 'eh_voudate2',  'partyledname','led_pan_no', 'eh_refno', 'eh_refdate2','billamt','taxable','cgstamt', 'sgstamt', 'igstamt', 'ledgername', 'tdsvalue','et_tdsper', 'tdsamount'
      ]),
    });


   var loadInvoiceDataStore = new Ext.data.Store({
      id: 'loadInvoiceDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'voudate', 'party', 'gstin', 'voutype', 'vouno', 'uqc', 'totqty', 'totalamt', 'taxableamt', 'igstamt', 'cgstamt', 'sgstamt', 'cessamt','invh_vouno'
      ]),
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
      },['quality', 'vargrp_type_short_code', 'vargrp_type_code', 'cust_ref', 'cust_code', 'invwt', 'invvalue' ]),
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
	loadTDSListDataStore.removeAll();
	loadTDSListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadTDSDatewiseList',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   : 0,

		},

       	scope:this,
		callback:function()
		{

                   grid_tot();
		}
	    });
     
       	 }
        }   
});





function grid_tot(){


}




function grid_tot_Invoice(){
        var qty  = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var value1 = 0;

        var Row= flxAdjustments.getStore().getCount();
        flxAdjustments.getSelectionModel().selectAll();
        var sel=flxAdjustments.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
	      qty =Number(qty)+Number(sel[i].data.totqty);

	      taxable=Number(taxable)+Number(sel[i].data.taxableamt);
	      igst=Number(igst)+Number(sel[i].data.igstamt);
	      cgst=Number(cgst)+Number(sel[i].data.cgstamt);
	      sgst=Number(sgst)+Number(sel[i].data.sgstamt);
	      cess=Number(cess)+Number(sel[i].data.cessamt);
	      value1=Number(value1)+Number(sel[i].data.totalamt);

        }
        txtTotQty.setRawValue(Ext.util.Format.number(qty,"0.000"));
        txtTotTaxable1.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST1.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST1.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST1.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotCess1.setRawValue(Ext.util.Format.number(cess,"0.00"));
        txtTotValue1.setRawValue(Ext.util.Format.number(value1,"0.00"));

}


var dgrecord = Ext.data.Record.create([]);

var fm1 = Ext.form;



var flxAdjustments = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 400,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 
       {header: "Seq No", dataIndex: 'accref_seqno',sortable:true,width:75,align:'left',hidden:true},
       {header: "Vou.No", dataIndex: 'accref_vouno',sortable:true,width:140,align:'left',hidden:false},
       {header: "Vou.Date", dataIndex: 'accref_voudate',sortable:true,width:120,align:'left',hidden:false},
       {header: "Customer", dataIndex: 'cust_ref',sortable:true,width:350,align:'left'},	
       {header: "Received" ,  dataIndex: 'acctrail_inv_value',sortable:false,width:120,align:'right', menuDisabled: true},
       {header: "Adusted", dataIndex: 'acctrail_adj_value',sortable:true,width:120,align:'right'},	
       {header: "Balance", dataIndex: 'balance',sortable:true,width:120,align:'right'},	

    ],


    store:loadBRPendingDetailsDataStore,
    listeners:{	


            'rowDblClick' : function(flxAdjustments,rowIndex,cellIndex,e){

                var selerow =flxAdjustments.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                tabOverall.setActiveTab(1);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

                var selerow =flxAdjustments.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                tabOverall.setActiveTab(1);
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

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
        title: 'DATE WISE DETAILS',
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
			     y       : 60,
                             items: [flxAdjustments]
                        },


	

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 200,
                             border  : false,
		             x       : 1000,
			     y       : 500,
                             items: [btnAbsPrint]
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


    function Refreshdata()
    {

                loadBRPendingDetailsDataStore.load({
                    url: 'ClsViewStatements.php',
                    params:{
                        task:'load_BR_Pending',
                        fcompcode:Gincompcode,
                        ffinid:GinFinid,
                        voutype : voutype,

                    },
                    callback:function(){
                    }
                });   
  
    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'TDS - DATEWISE',
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
			
	},

    });
    ReppreprintWindow.show();  


});
   
