Ext.onReady(function() {
    Ext.QuickTips.init();

   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var millname =localStorage.getItem('gstcompany');

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  

   var vouchertype = '';

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

   var printtype='PDF';


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


 var loadPurchaseDetailsDatastore = new Ext.data.Store({
      id: 'loadPurchaseDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPurchaseDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'dramt', 'cramt', 'value1'


      ]),
    });



    var btnColumnAR = new Ext.Button({
        style: 'text-align:center;',
        text: " -  Columnar  -",
//        text: " Ledger Print",
        width: 60,
        id: 'btnColumnAR',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

var vouchertype = "PFU,PWP,PIW,PGS";
var vouchername = "PURCHASE REGISTER";

		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 = "&finid=" + encodeURIComponent(GinFinid);

	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));            
		    var p5 = "&voucher_type="+encodeURIComponent(vouchertype);
		    var p6 = "&voucher_name="+encodeURIComponent(vouchername);

 		    var param = (p1+p2+p3+p4+p5+p6) ;


		    if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
	                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign&__format=XLS&'+ param , '_blank');
		    else
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign'+ param , '_blank');





       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });




var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
   for (var i=1;i<13;i++)
   {   
        switch (i) {
           case 1 :
             monthdisplay = "APRIL";
             monthcode = 4;
             break;
           case 2 :
             monthdisplay = "MAY";
             monthcode = 5;
             break;
           case 3 :
             monthdisplay = "JUNE";
             monthcode = 6;
             break;
           case 4 :
             monthdisplay = "JULY";
             monthcode = 7;
             break;
           case 5 :
             monthdisplay = "AUGUST";
             monthcode = 8;
             break;
           case 6 :
             monthdisplay = "SEPTEMBER";
             monthcode = 9;
             break;
           case 7 :
             monthdisplay = "OCTOBER";
             monthcode = 10;
             break;
           case 8 :
             monthdisplay = "NOVEMBER";
             monthcode = 11;
             break;
           case 9 :
             monthdisplay = "DECEMBER";
             monthcode = 12;
             break;
           case 10 :
             monthdisplay = "JANUARY";
             monthcode = 1;
             break;
           case 11 :
             monthdisplay = "FEBRUARY";
             monthcode = 2;
             break;
           case 12 :
             monthdisplay = "MARCH";
             monthcode = 3;
             break;
        
        }  
        var RowCnt = flxMonth.getStore().getCount() + 1;
        flxMonth.getStore().insert(
        flxMonth.getStore().getCount(),
        new dgrecord({
           moncode : monthcode,
           month  : monthdisplay,
       }) 
       );
   }
}




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


   var txtTotalClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtTotalClosing',
        name        : 'txtTotalClosing',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


  function voucher_type_list()
  {

              flxdetails.getStore().removeAll();
              MonthClickVocDataStore.removeAll();
              MonthClickVocDataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadPurchaseDocumentList',
                compcode    : compcode,
                finid       : finid,
                startdate   : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate     : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                voucherType : vou_type,
                    },
                    callback:function(){
                        var cnt=MonthClickVocDataStore.getCount();
//alert(cnt);
                        if(cnt>0){
                            for(var i=0;i<cnt;i++){
                               vouchertype = '';
                               if (MonthClickVocDataStore.getAt(i).get('voutype') == "PWP") 
                                  vouchertype = 'Local WP';
                               else if (MonthClickVocDataStore.getAt(i).get('voutype') == "PIW") 
                                  vouchertype = 'Import WP';
                               else if (MonthClickVocDataStore.getAt(i).get('voutype') == "PGS") 
                                  vouchertype = 'Stores';
                               else if (MonthClickVocDataStore.getAt(i).get('voutype') == "PSC") 
                                  vouchertype = 'GS Power Plant';                
                               else if (MonthClickVocDataStore.getAt(i).get('voutype') == "PFU") 
                                  vouchertype = 'Fuel';
                               else if (MonthClickVocDataStore.getAt(i).get('voutype') == "PDE") 
                                  vouchertype = 'PurchaseDirect';


                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    sno          : i+1,
                                    voudate      : MonthClickVocDataStore.getAt(i).get('voudate'),
                                    cust_name     : MonthClickVocDataStore.getAt(i).get('cust_name'),
                                    voutype      : vouchertype,
                                    accref_payref_no: MonthClickVocDataStore.getAt(i).get('accref_payref_no'),
                                    acctran_dbamt: MonthClickVocDataStore.getAt(i).get('acctran_dbamt'),
                                    acctran_cramt: MonthClickVocDataStore.getAt(i).get('acctran_cramt'),
                                    accref_vou_type: MonthClickVocDataStore.getAt(i).get('accref_vou_type'),
                                    accref_vouno: MonthClickVocDataStore.getAt(i).get('accref_vouno'),
                                    accref_seqno: MonthClickVocDataStore.getAt(i).get('accref_seqno'),
                                    cust_code    : MonthClickVocDataStore.getAt(i).get('cust_code'),

                                    taxable: MonthClickVocDataStore.getAt(i).get('taxable'),
                                    cgstamt: MonthClickVocDataStore.getAt(i).get('cgstamt'),
                                    sgstamt: MonthClickVocDataStore.getAt(i).get('sgstamt'),
                                    igstamt: MonthClickVocDataStore.getAt(i).get('igstamt'),
                                    tdsamt : MonthClickVocDataStore.getAt(i).get('tdsamt'),
                                    cust_gstin: MonthClickVocDataStore.getAt(i).get('cust_gstin'),


                                })
                                );
                             grid_tot2();
                            }
                        }
                    }
         });
  } 
  function MonthClick(){
                flxdetails.getStore().removeAll();
		MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(cmbMonth.getRawValue()=="JANUARY"){
                    monthcode=1;
                }else  if(cmbMonth.getRawValue()=="FEBRUARY"){
                    monthcode=2;
                }else  if(cmbMonth.getRawValue()=="MARCH"){
                    monthcode=3;
                }else  if(cmbMonth.getRawValue()=="APRIL"){
                    monthcode=4;
                }else  if(cmbMonth.getRawValue()=="MAY"){
                    monthcode=5;
                }else  if(cmbMonth.getRawValue()=="JUNE"){
                    monthcode=6;
                }else  if(cmbMonth.getRawValue()=="JULY"){
                    monthcode=7;
                }else  if(cmbMonth.getRawValue()=="AUGUST"){
                    monthcode=8;
                }else  if(cmbMonth.getRawValue()=="SEPTEMBER"){
                    monthcode=9;
                }else  if(cmbMonth.getRawValue()=="OCTOBER"){
                    monthcode=10;
                }else  if(cmbMonth.getRawValue()=="NOVEMBER"){
                    monthcode=11;
                }else  if(cmbMonth.getRawValue()=="DECEMBER"){
                    monthcode=12;
                }

                find_dates(monthcode);     
                voucher_type_list();




  }

  function VoucherClick(){


	       VouNoClickLoadDataStore.removeAll();
	       VouNoClickDetailsDataStore.removeAll();
	       AccInvNoDataStore.removeAll();
               flxld.getStore().removeAll();
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


function grid_tot(){

        var dr = 0;
        var cr = 0;
        var clo = 0;
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.debit)+Number(sel[i].data.credit) > 0)
              {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
              } 
         }
         txtTotalDebit.setValue(dr);
         txtTotalCredit.setValue(cr);
         txtTotalClosing.setValue(Math.abs(dr-cr));

}


  function grid_tot2(){
	totdb="";
        totcr="";
        var Row1= flxdetails.getStore().getCount();

        flxdetails.getSelectionModel().selectAll();
        var sele=flxdetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totdb=Number(totdb)+Number(sele[i].data.acctran_dbamt);
            totcr=Number(totcr)+Number(sele[i].data.acctran_cramt);
        }
        txttotdebit2.setRawValue(Ext.util.Format.number(totdb,"0.00"));
        txttotcredit2.setRawValue(Ext.util.Format.number(totcr,"0.00"));
}




  function grid_closebal(){
	clsbal="";
        var Row1= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sele=flxMonth.getSelectionModel().getSelections();
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


  var MonthClickVocDataStore = new Ext.data.Store({
        id: 'MonthClickVocDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadPurchaseDocumentList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['voudate', 'cust_name', 'voutype','accref_vouno', 'accref_payref_no', 'acctran_dbamt', 'acctran_cramt', 'accref_vou_type','accref_seqno', 'cust_code' , 'taxable', 'cgstamt', 'sgstamt', 'igstamt', 'tdsamt' , 'cust_gstin'])
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
		flxdetails.getStore().removeAll();     
		MonthClickVocDataStore.removeAll();

		MonthClickVocDataStore.load({
		 url: 'ClsViewStatements.php',
		        params: {
		    	task: 'loadPurchaseDocumentList',
		        compcode:compcode,
		        finid:finid,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

			},
                        scope:this,
                        callback:function(){
                        var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){
                            for(var i=0;i<cnt;i++){

                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    sno          : i+1,
                                    voudate      : MonthClickVocDataStore.getAt(i).get('voudate'),
                                    cust_name     : MonthClickVocDataStore.getAt(i).get('cust_name'),
                                    voutype      : MonthClickVocDataStore.getAt(i).get('voutype'),
                                    accref_payref_no: MonthClickVocDataStore.getAt(i).get('accref_payref_no'),
                                    acctran_dbamt: MonthClickVocDataStore.getAt(i).get('acctran_dbamt'),
                                    acctran_cramt: MonthClickVocDataStore.getAt(i).get('acctran_cramt'),
                                    accref_vou_type: MonthClickVocDataStore.getAt(i).get('accref_vou_type'),
                                    accref_vouno: MonthClickVocDataStore.getAt(i).get('accref_vouno'),
                                    accref_seqno: MonthClickVocDataStore.getAt(i).get('accref_seqno'),

                                    led_code    : MonthClickVocDataStore.getAt(i).get('cust_code'),

                                    taxable: MonthClickVocDataStore.getAt(i).get('taxable'),
                                    cgstamt: MonthClickVocDataStore.getAt(i).get('cgstamt'),
                                    sgstamt: MonthClickVocDataStore.getAt(i).get('sgstamt'),
                                    igstamt: MonthClickVocDataStore.getAt(i).get('igstamt'),
                                    tdsamt : MonthClickVocDataStore.getAt(i).get('tdsamt'),
                                    cust_gstin : MonthClickVocDataStore.getAt(i).get('cust_gstin'),

                                })
                                );
                             grid_tot2();
                            }
                        }
                    }
		 });
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



    //mdays = Ext.util.Format.date(new Date(),"d");



//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);



    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
/*       
	loadInvDateListDataStore.removeAll();
	loadInvDateListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadInvListDatewise',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot();
		}
	    });
*/     
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



    var vou_type = 'All';
    var cmbVouType = new Ext.form.ComboBox({
        id         : 'cmbVouType',
        fieldLabel : 'Voucher Type',
        width      : 120,
	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        store : ['All','Waste Paper','Fuel','Stores'],
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
               if (cmbVouType.getRawValue() == "Waste Paper")
                 vou_type = 'WP';
               else if (cmbVouType.getRawValue() == "Fuel")
                 vou_type = 'FU';
               else if (cmbVouType.getRawValue() == "Stores")
                 vou_type = 'STR';
               else
                 vou_type = 'All';


                voucher_type_list();               
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
var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 350,
    hidden:false,

    width: 600,
    id: 'my-grid-font', 
style: {
            'font-size': '12px','font-weight':'bold'
        },
	columnLines: true,
    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Month" , dataIndex: 'month',sortable:false,width:150,align:'left', menuDisabled: true,
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
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Closing"  , dataIndex: 'closing',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMonth, rowIndex, cellIndex, e) {
		var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();
                repmonth = selrow.get('month');
          	find_dates(selrow.get('moncode'));
                tabOverall.setActiveTab(1);
                var selerow =flxMonth.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    var a =selerow[i].get('month');
                }
                cmbMonth.setRawValue(a);
                MonthClick();
        }      
	
   }
});

/*
var map = new Ext.KeyMap("flxdetails", {
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

    var flxdetails = new Ext.grid.EditorGridPanel({
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
        height: 330,
        width: 1100,
        border:false,
        x: 370,
        y: 40,

        enableKeyEvents: true,
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "Date ", dataIndex: 'voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,             },
            {header: "Account Name", dataIndex: 'cust_name',width:300,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,
		renderer : function(value, meta ,record) {
		    var vou=record.get('cust_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "GST IN", dataIndex: 'cust_gstin',width:145,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "Voucher Type", dataIndex: 'voutype',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'},
            {header: "Vou. No.", dataIndex: 'accref_vouno',width:120,align:'left',menuDisabled: false,align: 'center'},
            {header: "Doc. No.", dataIndex: 'accref_payref_no',width:120,align:'left',sortable: true,defaultSortable: false,menuDisabled: false,align: 'center'},

            {header: "Debit", dataIndex: 'acctran_dbamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Credit", dataIndex: 'acctran_cramt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Taxable", dataIndex: 'taxable',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "SGST", dataIndex: 'sgstamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "CGST", dataIndex: 'cgstamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "IGST", dataIndex: 'igstamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "TDS", dataIndex: 'tdsamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "Inv type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},

            {header: "Seq. No.", dataIndex: 'accref_seqno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right',hidden : 'true'},
            {header: "Led Code", dataIndex: 'cust_code',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right',hidden : 'true'},
        ],
         listeners :{

            specialkey: function(f,e){  
                if(e.getKey()==e.ENTER){  
                    alert("I hit enter!"); 
                }  
            },

            'rowDblClick' : function(flxdetails,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =flxdetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },'cellclick': function (flxdetails, rowIndex, cellIndex, e) {
                 var selected_rows =flxdetails.getSelectionModel().getSelections();
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
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){
alert("Hai");
                tabOverall.setActiveTab(2);
                var selerow =flxdetails.getSelectionModel().getSelections();
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

     var btnviewDatewise = new Ext.Button({
        style: 'text-align:center;',
        text: " Date wise ",
        width: 100, id: 'btnviewDatewise',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		    var p1 = "&compcode="+encodeURIComponent(compcode);      
                    var p2 = "&fincode=" + encodeURIComponent(finid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&voutype=" + encodeURIComponent(vou_type);
 		    var param = (p1+p2+p3+p4+p5) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepPurchaseMonthDaywise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepPurchaseMonthDaywise.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepPurchaseMonthDaywise.rptdesign' + param, '_blank');	
            }
        }
    })

   var btnviewPurReg = new Ext.Button({
        style   : 'text-align:center;',
        text    : " PURCHASE REGISTER ",
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

		    var p1 = "&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p4 = "&voutype=" + encodeURIComponent(vou_type);
 		    var param = (p1+p2+p3+p4) ;

                    if (vou_type == "FU")
                    {  
		            if (printtype == "PDF") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Fuel.rptdesign&__format=pdf&' + param, '_blank');
		            else if (printtype == "XLS") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Fuel.rptdesign&__format=xls' + param, '_blank');
		            else
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Fuel.rptdesign' + param, '_blank');
                     }  


                    else if (vou_type == "WP")
                    {  
		            if (printtype == "PDF") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_WastePaper.rptdesign&__format=pdf&' + param, '_blank');
		            else if (printtype == "XLS") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_WastePaper.rptdesign&__format=xls' + param, '_blank');
		            else
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_WastePaper.rptdesign' + param, '_blank');
                     }  
                     else
                    {  
		            if (printtype == "PDF") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Stores.rptdesign&__format=pdf&' + param, '_blank');
		            else if (printtype == "XLS") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Stores.rptdesign&__format=xls' + param, '_blank');
		            else
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_PurchaseRegister_Stores.rptdesign' + param, '_blank');
                     }       
	    }
	}
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


                  var grnno = cmbvoc.getRawValue().substring(3);
                  var purtype = cmbvoc.getRawValue().substring(0,3);

//alert(grnno);
//alert(purtype);

                  if (purtype == "PSP" ||  purtype == "PSC")
                  {       
		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&minno=" + encodeURIComponent(grnno);
             	  var p4 = "&purtype=" + encodeURIComponent(purtype);
                  var param = (p1+p2+p3+p4) ;  
//                  if (printtype == "PDF") 
		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param);
//                  else
//		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param);
                  }
                  else if (purtype == "PPF") 
                  {       
		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&grnno=" + encodeURIComponent(grnno);
             	  var param = (p1+p2+p3) ;  
//                  if (printtype == "PDF") 
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
//                  else
//		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param);
                  }   
                  else if (purtype == "PLW") 
                  {       
		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&grnno=" + encodeURIComponent(grnno);
             	  var param = (p1+p2+p3) ;  
//                if (printtype == "PDF") 
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param, '_blank'); 
//                  else
//		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param);
                  }                    
                   
	    }
	}
	});



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

    var btnPrint = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Print",
        width   : 60,id:'btnPrint',
        x       : 10,
        y       : 200,
        listeners: {
            click: function(){
                   ledcode = cmbledger.getValue();

// alert("Hello");

// alert(ledcode);

		    var com="&compcode="+encodeURIComponent(compcode);
                    var fin = "&fincode=" + encodeURIComponent(finid);
                    var ledcode="&ledgercode="+encodeURIComponent(ledcode);
// alert(fin);

		    var param = (com + fin + ledcode) ;
//alert(param);
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger_montwise.rptdesign' + param, '_blank');	
	    }
	}
	});


    function Refreshdata()
    {

        Month_Add_inGrid();
        var dt_today = new Date();

//alert(finstartdate);

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

//alert(monthstartdate.getValue());
//alert(monthenddate.getValue());


	loadPurchaseDetailsDatastore.removeAll();
	loadPurchaseDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadPurchaseDetails',

                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadPurchaseDetailsDatastore.getCount();
                   var dr = 0;
                   var cr = 0;
                   var clo = 0;

                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadPurchaseDetailsDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){    
//alert(loadPurchaseDetailsDatastore.getAt(j).get('rmonth')); 
//alert(sel[i].data.month); 
          
                     		    if (sel[i].data.month === loadPurchaseDetailsDatastore.getAt(j).get('rmonth'))
                  		    {
                                        dr = Number(loadPurchaseDetailsDatastore.getAt(j).get('dramt'));
                                        cr = Number(loadPurchaseDetailsDatastore.getAt(j).get('cramt'));;
                                        clo = Math.abs(clo - dr + cr);

	                                sel[i].set('debit', Ext.util.Format.number(loadPurchaseDetailsDatastore.getAt(j).get('dramt'),'0.00'));
                                        sel[i].set('credit', Ext.util.Format.number(loadPurchaseDetailsDatastore.getAt(j).get('cramt'),'0.00'));
	                               sel[i].set('closing', Ext.util.Format.number(clo,'0.00'));
			            }
                              }
			}
                       grid_tot();

                   }    

                }         
	  });

        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  

    var btnViewMonthBreakup = new Ext.Button({
        style: 'text-align:center;',
        text: "Print",
        width: 70,
        id: 'btnViewMonthBreakup',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		    var p1 = "&compcode="+encodeURIComponent(compcode);      
                    var p2 = "&fincode=" + encodeURIComponent(finid);
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5  = "&opt=" + encodeURIComponent(2);
 		    var param = (p1+p2+p3+p4+p5) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSalesMonthwiseAbstract.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSalesMonthwiseAbstract.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSalesMonthwiseAbstract.rptdesign' + param, '_blank');	
            }
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
    height      : 500,
    width       : 1310,
    items       : [
    {
        xtype: 'panel',
        title: 'Monthly Details',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [




        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height :     350,
            x           : 10,
            y           : 10,
            border      : false,
            items : [flxMonth]
        },

        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 400,
            x           : 650,
            y           : 250,
            border      : false,
            items : [btnViewMonthBreakup]
        },

		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 380,
		    border      : false,
		    width       : 430,
                    labelWidth  : 50,
		    items : [txtTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 200,
		    y           : 380,
		    border      : false,
		    width       : 500,
                    labelWidth  : 50,
		    items : [txtTotalCredit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 400,
		    y           : 380,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalClosing]
		},


        ]
    },

    {
        xtype: 'panel',
        title: 'Daywise Details',
        bodyStyle: {"background-color": "#f9f2ec"},
        layout: 'absolute',
        items: [
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            height      : 100,
            labelWidth  : 80,
            border      : false,
            items : [cmbMonth]
        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 600,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 800,
			     y       : 10,
                             items: [btnProcess]
                        },

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 950,
            y           : 10,
            labelWidth  : 110,
            border      : false,
            items : [cmbVouType]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 1200,
            x           : 10,
            y           : 70,
            border      : false,
            items : [flxdetails]
        },


        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 500,
            y           : 420,
            border      : false,
            anchor: '100%',
            items : [txttotdebit2]
        },


        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 750,
            y           : 420,
            border      : false,
            anchor: '100%',
            items : [txttotcredit2]
        },

/*
        {
            xtype       : 'fieldset',
            width       : 800,
            height : 100,
            labelWidth  : 100,
            x           : 0,
            y           : 400,
            border      : false,
            anchor: '100%',
            items : [txtnarration]
        },
*/



                   {
                        xtype: 'fieldset',
                        width: 200,
                        labelWidth: 0,
                        x: 1100,
                        y: 160,
                        border: false,
                        items: [btnviewPurReg]
                    },

                    {
                        xtype: 'fieldset',
                        width: 200,
                        labelWidth: 0,
                        x: 1100,
                        y: 100,
                        border: false,
                        items: [btnviewDatewise]
                    },


		{
		xtype       : 'fieldset',
		width       : 200,

		labelWidth  : 1,
		x           : 1100,
		y           : 200,
		border      : false,
		items : [btnColumnAR]
		},

        ]
    }, {
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
    y:36,
    maximized:false,
        method: 'POST',
        layout: 'absolute',

    items  : [

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
			height  : 50,
			width   : 280,
			layout  : 'absolute',
			x       : 650,
			y       : 0,
			items:[optprinttype],
	},

		{
		    xtype       : 'fieldset',
		    x           : 0,
		    y           : 50,

		    border      : false,
		    width       : 1400,
		    items : [tabOverall]
		},


],

onEsc:function(){
},
    listeners:{
      
        show:function(){
             
            txtFinYear.setRawValue(yearfin);
            cmbVouType.setValue('All');
	    Ext.getCmp('lblcompany').setText(millname);
            Refreshdata();
        }
    }
});
myWin.show();
    });




