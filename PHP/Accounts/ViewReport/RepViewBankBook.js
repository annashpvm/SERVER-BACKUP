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

   var vouseqno = 0;
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

   var openDr = 0;
   var openCr = 0;
   var printtype='PDF';



  var MonthClick_Datewise_DataStore = new Ext.data.Store({
        id: 'MonthClick_Datewise_DataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadCashBookPeriod_Datewise"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_voudate','voudate','acctran_dbamt' ,'acctran_cramt'])
 });




var lblCrDr = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDr',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '18px','font-weight':'bold'
        },
        name        : 'lblCrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });




var lblCrDr3 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDr3',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblCrDrPeriod = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrPeriod',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblCrDrPeriod2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrPeriod2',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
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



var lblCrDrDaycl = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrDaycl',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });




 var BankDataStore = new Ext.data.Store({
      id: 'BankDataStore',

      proxy: new Ext.data.HttpProxy({
               url: '/SHVPM/Accounts/clsAccounts.php',
                method: 'POST'
            }),
            baseParams:{task: "BANK"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'cust_code', type: 'int', mapping: 'cust_code'},
        {name: 'cust_name', type: 'string', mapping: 'cust_name'}
      ]),
      sortInfo:{field: 'cust_code', direction: "DESC"}
    });

 


function process_main_abstract()
{
            gstledcode=cmbBank.getValue();
            gstaccname=cmbBank.getRawValue();

        var dt_today = new Date();

//alert(finstartdate);

 

 //       monthStartdate  = finstartdate;
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d")); 
      monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));


      if (Ext.util.Format.date(dt_today,"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d"))
          monthenddate.setValue(Ext.util.Format.date(finenddate,"Y-m-d"));

//alert(monthstartdate.getValue());
//alert(monthenddate.getValue());

//-- opening
  
	loadCashBankOpeningDatastore.removeAll();
	loadCashBankOpeningDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadCashBookOpening',
                compcode:Gincompcode,
                finid:GinFinid,
                ledcode : gstledcode,

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadCashBankOpeningDatastore.getCount();
                   openDr = 0;
                   openCr = 0;

                   if(cnt>0)
                   {
                       openDr = Number(loadCashBankOpeningDatastore.getAt(0).get('curbal_obdbamt'));
                       openCr = Number(loadCashBankOpeningDatastore.getAt(0).get('curbal_obcramt'));;

                       var openDr2 = formatter.format(openDr);	
                       var openCr2 = formatter.format(openCr);	
                          
                       if (openDr >0)
                       {
                          txtOpening2.setValue(openDr);
                          lblCrDr.setText('DR');
                       }
                       else
                       {

                          txtOpening2.setValue(openCr);  
                          lblCrDr.setText('CR');
                       }

                       if (openDr >0)
                       {
                          txtOpening.setRawValue(openDr2);
                       }
                       else
                       {
                          txtOpening.setRawValue(openCr2);  
                       }
  

                   }    

                }         
	  });


          Month_Add_inGrid();


	loadCashBankDetailsDatastore.removeAll();
	loadCashBankDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadCashBookDetails',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(ToDate.getValue(),"Y-m-d"), 
                ledcode : gstledcode,

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadCashBankDetailsDatastore.getCount();
                   var dr  = 0;
                   var cr  = 0;
                   clo = openDr - openCr; 

                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadCashBankDetailsDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){    
//alert(loadCashBankDetailsDatastore.getAt(j).get('rmonth')); 
//alert(sel[i].data.month); 
          
                     		    if (sel[i].data.month === loadCashBankDetailsDatastore.getAt(j).get('rmonth'))
                  		    {
                                        dr = Number(loadCashBankDetailsDatastore.getAt(j).get('dramt'));
                                        cr = Number(loadCashBankDetailsDatastore.getAt(j).get('cramt'));
                                        clo = clo + dr - cr;
                                        var cloval = Math.abs(clo);


	                                sel[i].set('debit', Ext.util.Format.number(loadCashBankDetailsDatastore.getAt(j).get('dramt'),'0.00'));
                                        sel[i].set('credit', Ext.util.Format.number(loadCashBankDetailsDatastore.getAt(j).get('cramt'),'0.00'));
	                               sel[i].set('closing', Ext.util.Format.number(cloval,'0.00'));

			            }
                              }
			}

                       grid_tot();

                }   

             }     
	  });


//  find_closing(); 
        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);

}



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

var vouchertype = "BKP,BKR";
var vouchername = "BANK BOOK";

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



var flxDatewiseList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:60,
    height: 300,
    hidden:false,
    width: 700,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DATE"    , dataIndex: 'voudate',sortable:false,width:110,align:'left', menuDisabled: true },
        {header: "DATE"    , dataIndex: 'accref_voudate',sortable:false,width:130,align:'left', menuDisabled: true,hidden:true},
        {header: "DEBIT"   , dataIndex: 'acctran_dbamt',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "CREDIT"  , dataIndex: 'acctran_cramt',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "CLOSING" , dataIndex: 'closing',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store: [],
    listeners:{	

            'cellDblclick': function (flxInvoiceList, rowIndex, cellIndex, e) {
		var sm = flxInvoiceList.getSelectionModel();
		var selrow = sm.getSelected();
                repdate = selrow.get('accref_voudate')
	        monthstartdate.setValue(Ext.util.Format.date(repdate,"d-m-Y")); 
	        monthenddate.setValue(Ext.util.Format.date(repdate,"d-m-Y"));
                tabOverall.setActiveTab(1);
	        process_data();
     
    }
 }
});




    var btnviewDatewiseAbstract = new Ext.Button({
        style: 'text-align:center;',
        text: " View",
        width: 60, id: 'btnviewDatewiseAbstract',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


var columnCount = flxdetails.getColumnModel().getColumnCount(true);



var lblText = Ext.getCmp('lblCrDr').getEl().dom.innerHTML;



                    var p1 = "&ledcode="+encodeURIComponent(2139);    
		    var p2 = "&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&finid=" + encodeURIComponent(GinFinid);

                    var p4 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-  d"));	
                    

	            var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	            var p7 = "&lename=" + encodeURIComponent(cmbBank.getRawValue());
	            var p8 = "&prtdsp=" + encodeURIComponent('B');
	            var p9 = "&opening=" + encodeURIComponent(txtOpening3.getRawValue());
	            var p10 = "&drcr=" + encodeURIComponent(lblText);

 		    var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9+p10) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook_Datewise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook_Datewise.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook_Datewise.rptdesign' + param, '_blank');	
            }
        }
    });


  var cmbBank = new Ext.form.ComboBox({
        id         : 'cmbBank',
        fieldLabel : 'Bank Name',
        width      : 320,
        store      : BankDataStore,
        displayField:'cust_name',
        valueField:'cust_code',
        hiddenName:'cust_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Bank Name',
 	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners:{
            select :function(){
             process_main_abstract();
            }
         }

    });



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



 var loadCashBankDetailsDatastore = new Ext.data.Store({
      id: 'loadCashBankDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCashBookDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'dramt', 'cramt', 'value1'


      ]),
    });


 var loadCashBankOpeningDatastore = new Ext.data.Store({
      id: 'loadCashBankOpeningDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCashBookOpening"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'curbal_obdbamt' ,'curbal_obcramt'


      ]),
    });



var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{

   flxMonth.getStore().removeAll();
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
           debit  : '',
           credit : '',
           closing : '',
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

   var txtOpening = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtOpening',
        name        : 'txtOpening',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtOpening3 = new Ext.form.NumberField({
        fieldLabel  : 'Opening Balance',
        id          : 'txtOpening3',
        name        : 'txtOpening3',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtDayTotalDebit = new Ext.form.NumberField({
        fieldLabel  : 'TOTAL ',
        id          : 'txtDayTotalDebit',
        name        : 'txtDayTotalDebit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtDayTotalCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDayTotalCredit',
        name        : 'txtDayTotalCredit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtDayTotalClosing = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDayTotalClosing',
        name        : 'txtDayTotalClosing',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
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
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
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
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtTotalClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtTotalClosing',
        name        : 'txtTotalClosing',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtOpening2 = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtOpening2',
        name        : 'txtOpening2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
 //   	enableKeyEvents: true,
        listeners   :{
//renderer: function (value, meta, record) {
//                return  value*-1;
//            }
            blur: function( value) {

            }

         }


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
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
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
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtTotalClosing2 = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtTotalClosing2',
        name        : 'txtTotalClosing2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



  function process_data()
  {
              flxdetails.getStore().removeAll();


             rdate= monthenddate.getValue().add(Date.DAY, 1);




              LoadOpeningClosingDataStore.removeAll();
              LoadOpeningClosingDataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadLedgerOpening_Closing',
                         compcode:compcode,
                         finid:finid,
                         ledcode:cmbBank.getValue(),
                         startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=LoadOpeningClosingDataStore.getCount();
                        if(cnt>0){


                          if (LoadOpeningClosingDataStore.getAt(0).get('trnobclosing') > 0)
                          {    
                              txtLOpening.setRawValue(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing'));
                              lblCrDrPeriod.setText('DR');

                              txtOpening3.setValue(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing'));
                              lblCrDr3.setText('DR');

                          }  
                          else
                           {    
                              txtLOpening.setRawValue(Math.abs(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing')));
                              lblCrDrPeriod.setText('CR');

                              txtOpening3.setRawValue(Math.abs(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing')));
                              lblCrDr3.setText('CR');
                          }   


                        }
                    }   
              });
             LoadOpeningClosingDataStore2.removeAll();
              LoadOpeningClosingDataStore2.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadLedgerOpening_Closing',
                         compcode:compcode,
                         finid:finid,
                         ledcode:cmbBank.getValue(),
                         startdate: Ext.util.Format.date(rdate,"Y-m-d"), 
                         enddate: Ext.util.Format.date(rdate,"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=LoadOpeningClosingDataStore2.getCount();
                        if(cnt>0){

                          if (LoadOpeningClosingDataStore2.getAt(0).get('trnobclosing') > 0)
                          {    
                              txtLClosing.setRawValue(LoadOpeningClosingDataStore2.getAt(0).get('trnobclosing'));
                              lblCrDrPeriod2.setText('DR');
                          }  
                          else
                           {    
                              txtLClosing.setRawValue(Math.abs(LoadOpeningClosingDataStore2.getAt(0).get('trnobclosing')));
                              lblCrDrPeriod2.setText('CR');
                          }   


                        }
                    }   
              });


              MonthClickVocDataStore.removeAll();
              MonthClickVocDataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadCashBookPeriod',
                         compcode:compcode,
                         finid:finid,
                         ledcode:cmbBank.getValue(),
                         startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){
                            for(var i=0;i<cnt;i++){

                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    sno          : i+1,
                                    accref_voudate : Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('accref_voudate'),"d-m-Y"),
                                    cust_name     : MonthClickVocDataStore.getAt(i).get('cust_name'),
                                    acctran_dbamt: MonthClickVocDataStore.getAt(i).get('acctran_dbamt'),
                                    acctran_cramt: MonthClickVocDataStore.getAt(i).get('acctran_cramt'),
                                    accref_vouno: MonthClickVocDataStore.getAt(i).get('accref_vouno'),
                                    accref_seqno: MonthClickVocDataStore.getAt(i).get('accref_seqno'),
                                    led_code    : MonthClickVocDataStore.getAt(i).get('ledcode2'),

                                    accref_narration: MonthClickVocDataStore.getAt(i).get('accref_narration'),
                                    accref_payref_no: MonthClickVocDataStore.getAt(i).get('accref_payref_no'),
                                    accref_payref_date: Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('accref_payref_date')),
                                })
                                );
                             grid_tot2();
                            }
                        }
                    }
         });

         grid_click();




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


                process_data();


  }

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

                                //alert(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));

                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));
//                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
//                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");
                                txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");                         

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

         clo = openDr-openCr+dr-cr; 


         txtTotalDebit2.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotalCredit2.setRawValue(Ext.util.Format.number(cr,'0.00'));
         txtTotalClosing2.setRawValue(Ext.util.Format.number( Math.abs(clo),'0.00'));
   
    

                       if (clo >0)
                       {
                          lblCrDrcl.setText('DR');
                       }
                       else
                       {
                          lblCrDrcl.setText('CR');
                       }


                       var dr2 = formatter.format(dr);	
                       var cr2 = formatter.format(cr);	
                       var clo = formatter.format(Math.abs(clo));	
                         

         txtTotalDebit.setRawValue(dr2);
         txtTotalCredit.setRawValue(cr2);
         txtTotalClosing.setRawValue(clo);

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



function grid_sum_daytotal(){

        var dr = 0;
        var cr = 0;
        var clo = 0;
        var Row= flxDatewiseList.getStore().getCount();
        flxDatewiseList.getSelectionModel().selectAll();
        var sel=flxDatewiseList.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {


	      dr = Number(dr)+Number(sel[i].data.acctran_dbamt);
	      cr = Number(cr)+Number(sel[i].data.acctran_cramt);
              var clo = sel[i].data.closing;
         }


/*
         txtDayTotalDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtDayTotalCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));
         txtDayTotalClosing.setRawValue(Ext.util.Format.number( Math.abs(clo),'0.00'));
 */  
    

                       if (clo >0)
                       {
                          lblCrDrDaycl.setText('DR');
                       }
                       else
                       {
                          lblCrDrDaycl.setText('CR');
                       }


                       var dr2 = formatter.format(dr);	
                       var cr2 = formatter.format(cr);	
                       var clo = formatter.format(Math.abs(clo));	
                         

         txtDayTotalDebit.setRawValue(dr2);
         txtDayTotalCredit.setRawValue(cr2);
         txtDayTotalClosing.setRawValue(clo);
   

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


  var LoadOpeningClosingDataStore = new Ext.data.Store({
        id: 'LoadOpeningClosingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadLedgerOpening_Closing"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cur_led_code', 'trnobclosing' ])
    });

  var LoadOpeningClosingDataStore2 = new Ext.data.Store({
        id: 'LoadOpeningClosingDataStore2',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadLedgerOpening_Closing"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cur_led_code', 'trnobclosing' ])
    });


  var MonthClickVocDataStore = new Ext.data.Store({
        id: 'MonthClickVocDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadCashBookPeriod"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno', 'accref_vouno','accref_voudate','accref_narration','actran_led_code',
'acctran_dbamt' ,'acctran_cramt','accref_payref_no','accref_payref_date', 'ledcode2','yropdebit', 
 'yropcredit', 'trnobdebit', 'trnobcreit','cust_name' ])
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
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date','accref_narration'])
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
                 process_data();
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
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{

           keyup:function(){
              process_data();
            },
           change:function(){
              process_data();
            },
        }    
    });



    var FromDate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'yrstartdate',
	format: 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });


    var ToDate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'yrenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date() ,
       	enableKeyEvents: true,
        listeners:{

           keyup:function(){
              process_main_abstract();
            },
           change:function(){
              process_main_abstract();
            },
        }    
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


var loop = monthstartdate.getValue();
var end  = monthenddate.getValue();


                flxDatewiseList.getStore().removeAll();
	//	MonthClickVocDataStore.removeAll();

while(loop <= end){
        var RowCnt = flxDatewiseList.getStore().getCount() + 1;
        flxDatewiseList.getStore().insert(
        flxDatewiseList.getStore().getCount(),
        new dgrecord({
           voudate        : Ext.util.Format.date(loop,"d-m-Y"),
           accref_voudate : Ext.util.Format.date(loop,"Y-m-d"),
           acctran_dbamt  : '0',
           acctran_cramt  : '0',
           closing        : '0',
       }) 
       );


   var newDate = loop.setDate(loop.getDate() + 1);
   loop = new Date(newDate);
}


     // var dt_from = monthstartdate.getValue();
      //var dt_to   = monthenddate.getValue();

//for (var d = new dt_from ; d <= dt_to; d.setDate(d.getDate() + 1)) {
  //  alert(d);
//}





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



    var txttotdebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotdebit2',
        name        : 'txttotdebit2',
        width       : 120,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
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
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
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

    var txtLOpening = new Ext.form.NumberField({
        fieldLabel  : 'Opening Balance',
        id          : 'txtLOpening',
        name        : 'txtLOpening',
        width       : 120,
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

    var txtLClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing Balance',
        id          : 'txtLClosing',
        name        : 'txtLClosing',
        width       : 120,
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


var lblCASHBANK = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCASHBANK',
        name        : 'lblCASHBANK',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
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
        {header: "Closing"  , dataIndex: 'closing',sortable:false,width:150,align:'right', menuDisabled: true,
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

       'cellclick': function (flxMonth, rowIndex, cellIndex, e) {
		var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();
                repmonth = selrow.get('month');
          	find_dates(selrow.get('moncode'));
                txtLClosing.setRawValue(selrow.get('closing'));     
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
        height: 400,
        width: 1280,
        border:false,
        x: 370,
        y: 40,

        enableKeyEvents: true,
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "Date ", dataIndex: 'accref_voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,             },
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
            {header: "Vou. No.", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Debit", dataIndex: 'acctran_dbamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Credit", dataIndex: 'acctran_cramt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Description", dataIndex: 'accref_narration',width:250,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Chq/Ref", dataIndex: 'accref_payref_no',width:100,align:'center',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Chq/Ref dt", dataIndex: 'accref_payref_date',width:110,align:'center',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},

            {header: "Seq. No.", dataIndex: 'accref_seqno',width:80,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Led Code", dataIndex: 'cust_code',width:100,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
        ],
         listeners :{

            specialkey: function(f,e){  
                if(e.getKey()==e.ENTER){  
                    alert("I hit enter!"); 
                }  
            },

            'rowDblClick' : function(flxdetails,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(3);
                var selerow =flxdetails.getSelectionModel().getSelections();

                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                     vouseqno = selerow[i].get('accref_seqno');
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
//alert("Hai");
                tabOverall.setActiveTab(3);
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
        width: 800,
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
        width       : 140
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
        y       : 10,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){


                 var columnCount = flxdetails.getColumnModel().getColumnCount(true);
                 var voutype = cmbvoc.getRawValue().substring(0,3);                
                  
                   var invno = txtvouref.getValue();
                   if (invno == '')
                      invno = cmbvoc.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&invno=" + encodeURIComponent(invno);


                   i1 = "ORIGINAL FOR BUYER";
         	   var p4 = "&displayword=" + encodeURIComponent(i1);

           	   var p5 = "&vouno="+encodeURIComponent(cmbvoc.getRawValue());

		   var p6 = "&seqno=" + encodeURIComponent(vouseqno);

 	 	   var param = (p1 + p2 + p3 + p4 ); 

 	 	   var param2 = (p1 + p2 + p5 ); 
 	 	   var param3 = (p1 + p2 + p6 ); 

  
                   if (voutype  == "GSI") 
                   {
                    if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param);
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=xls' + param, '_blank'); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign' + param); 
                   }
                   else if  (voutype  == "OSI") 
                   {
                   if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else if (printtype == "XLS") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=xls'+ param); 

                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                   } 
                   else if (voutype == "GJV")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=xls&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param2, '_blank');
                    }     
                    else if (voutype == "CHR" || voutype == "BKR")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param3, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=xls&' + param3, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param3, '_blank');
                    }       
                    else if (voutype == "CHP"  || voutype == "BKP" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param3, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=xls&' + param3, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param3, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=xls&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param2, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=xls&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign' + param2, '_blank');
                    }  








	    }
	}
	});


    var btnviewDatewise = new Ext.Button({
        style: 'text-align:center;',
        text: " View",
        width: 60, id: 'btnviewDatewise',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


var columnCount = flxdetails.getColumnModel().getColumnCount(true);



                    var p1 = "&ledcode="+encodeURIComponent(cmbBank.getValue());    
		    var p2 = "&compcode="+encodeURIComponent(compcode);      
	            var p3 = "&finid=" + encodeURIComponent(GinFinid);

                    var p4 = "&finstartdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-  d"));	
                    

	            var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
	            var p7 = "&lename=" + encodeURIComponent('BANK BOOK');
	            var p8 = "&prtdsp=" + encodeURIComponent('B');

 		    var param = (p1+p2+p3+p4+p5+p6+p7+p8) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign' + param, '_blank');	
            }
        }
    });


    function Refreshdata()
    {
     Month_Add_inGrid();
    }  


function grid_click()
{
    //          MonthClick_Datewise_DataStore.removeAll();


              LoadOpeningClosingDataStore.removeAll();
              LoadOpeningClosingDataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadLedgerOpening_Closing',
                         compcode:compcode,
                         finid:finid,
                         ledcode:cmbBank.getValue(),
                         startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=LoadOpeningClosingDataStore.getCount();
                        if(cnt>0){


                          if (LoadOpeningClosingDataStore.getAt(0).get('trnobclosing') > 0)
                          {    
                              txtLOpening.setRawValue(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing'));
                              lblCrDrPeriod.setText('DR');

                              txtOpening3.setValue(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing'));
                              lblCrDr3.setText('DR');

                          }  
                          else
                           {    
                              txtLOpening.setRawValue(Math.abs(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing')));
                              lblCrDrPeriod.setText('CR');

                              txtOpening3.setRawValue(Math.abs(LoadOpeningClosingDataStore.getAt(0).get('trnobclosing')));
                              lblCrDr3.setText('CR');
                          }   


                        }
                    }   
              });

              MonthClick_Datewise_DataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadCashBookPeriod_Datewise',
                         compcode:compcode,
                         finid:finid,
                         ledcode:cmbBank.getValue(),
                         startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=MonthClick_Datewise_DataStore.getCount();
                        if(cnt>0){

                            flxDatewiseList.getSelectionModel().selectAll();
		            var selrows = flxDatewiseList.getSelectionModel().getCount();
			    var sel  = flxDatewiseList.getSelectionModel().getSelections();
                            for(var i=0;i<cnt;i++){
                                var vdate = Ext.util.Format.date(MonthClick_Datewise_DataStore.getAt(i).get('accref_voudate'),"Y-m-d");
                                var dbamt = MonthClick_Datewise_DataStore.getAt(i).get('acctran_dbamt');
                                var cramt = MonthClick_Datewise_DataStore.getAt(i).get('acctran_cramt');
				for (j=0;j<selrows;j++){
//alert(vdate);
//alert(sel[j].data.accref_voudate);
				    if (sel[j].data.accref_voudate == vdate)
				    {
					    sel[j].set('acctran_dbamt', dbamt);
					    sel[j].set('acctran_cramt', cramt);

			            }
				 }  
                            }
  //                          txtOpening3.setValue(txtLOpening.getValue());
                            var clo = Number(txtOpening3.getValue());	
                            for (j=0;j<selrows;j++){
				var dr = Number(sel[j].get('acctran_dbamt'));
		                var cr = Number(sel[j].get('acctran_cramt'));
                                clo = clo - dr + cr;
                                var cloval = Math.abs(clo);
                                sel[j].set('closing', Ext.util.Format.number(cloval,'0.00'));

                            }  


                        }
grid_sum_daytotal();
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
    width       : 1500,
        listeners: {
          'tabchange': function(tabPanel, tab) {
          grid_click();

        }},
 

    items       : [
    {
        xtype: 'panel',
        title: 'Monthly Details',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{
		    xtype       : 'fieldset',
		    x           : 380,
		    y           : 10,
		    border      : false,
		    width       : 500,
                    labelWidth  : 70,
		    items : [txtOpening]
		},

          {
            xtype       : 'fieldset',
            x           : 580,
            y           : 18,
            border      : false,
            width       :250,
            items : [lblCrDr]
        },

        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 320,
            x           : 10,
            y           : 40,
            border      : false,
            items : [flxMonth]
        },



		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 370,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 200,
		    y           : 370,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 400,
		    y           : 490,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalClosing]
		},
          {
            xtype       : 'fieldset',
            x           : 578,
            y           : 490,
            border      : false,
            width       :250,
            items : [lblCrDrcl]
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
            width       : 1300,
            height      : 640,
            x           : 10,
            y           : 50,
            border      : false,
            items : [flxdetails]
        },

        {
            xtype       : 'fieldset',
            x           : 180,
            y           : 480,
            border      : false,
            labelWidth  : 120,
            width       :400,
            items : [txtLOpening]
        },


        {
            xtype       : 'fieldset',
            x           : 430,
            y           : 480,
            border      : false,
            width       :250,
            items : [lblCrDrPeriod]
        },

        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 500,
            y           : 480,
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
            y           : 480,
            border      : false,
            anchor: '100%',
            items : [txttotcredit2]
        },


        {
            xtype       : 'fieldset',
            x           : 1000,
            y           : 480,
            border      : false,
            labelWidth  : 120,
            width       :400,
            items : [txtLClosing]
        },


        {
            xtype       : 'fieldset',
            x           : 1250,
            y           : 480,
            border      : false,
            width       :250,
            items : [lblCrDrPeriod2]
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
                        width: 800,
                        height: 100,
                        labelWidth: 0,
                        x: 1000,
                        y: 10,
                        border: false,
                        anchor: '100%',
                        items: [btnviewDatewise]
                    },



		{
		xtype       : 'fieldset',
		width       : 200,

		labelWidth  : 1,
		x           : 1170,
		y           : 10,
		border      : false,
		items : [btnColumnAR]
		},
        ]
    }, 

    {
        xtype: 'panel',
        title: 'Daywise Closing Balance',
        bodyStyle: {"background-color": "#f9f2ec"},
        layout: 'absolute',
        items: [

		{
		    xtype       : 'fieldset',
		    x           : 300,
		    y           : 10,
		    border      : false,
		    width       : 500,
                    labelWidth  : 130,
		    items : [txtOpening3]
		},


		  {
		    xtype       : 'fieldset',
		    x           : 580,
		    y           : 10,
		    border      : false,
		    width       :250,
		    items : [lblCrDr]
		},


		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 1300,
		    height      : 360,
		    x           : 10,
		    y           : 50,
		    border      : false,
		    items : [flxDatewiseList]
		},


        {
            xtype       : 'fieldset',
            width       : 800,
            labelWidth  : 130,
            x           : 10,
            y           : 370,
            border      : false,

            items : [txtDayTotalDebit]
        },

        {
            xtype       : 'fieldset',
            width       : 800,
            labelWidth  : 1,
            x           : 300,
            y           : 370,
            border      : false,
            items : [txtDayTotalCredit]
        },

        {
            xtype       : 'fieldset',
            width       : 800,
            labelWidth  : 1,
            x           : 475,
            y           : 485,
            border      : false,
            items : [txtDayTotalClosing]
        },

          {
            xtype       : 'fieldset',
            x           : 600,
            y           : 485,
            border      : false,
            width       :250,
            items : [lblCrDrDaycl]
        },


                  {
                        xtype: 'fieldset',
                        width: 800,
                        height: 100,
                        labelWidth: 0,
                        x: 800,
                        y: 150,
                        border: false,
                        anchor: '100%',
                        items: [btnviewDatewiseAbstract]
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
            width       : 1000,
            height      : 235,
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
            items : [txtnarration]
        },

/*
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

*/
        ]
    },

    ]
});

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 




    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bank Receipt Entry',


                        bodyStyle: {"background-color": "#f7fffe"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        header: false,
        width: 1500,
        height: 600,
        x: 10,
        y: 10,
        frame: false,
        id: 'FormPanel',
        method: 'POST',
        layout: 'absolute',

    items  : [

	{
            xtype       : 'fieldset',
            x           : 15,
            y           : 10,
            border      : false,
            width       :500,
            items : [lblCASHBANK]
        },


                { xtype       : 'fieldset',
                title       : '',
                x           : 15,
                y           : 50,
                border      : false,
                labelWidth  : 120,
                items: [cmbBank]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 650,
                y           : 10,
                border      : false,
                labelWidth  : 90,
                items: [FromDate]
                },

                { xtype       : 'fieldset',
                title       : '',
                x           : 650,
                y           : 40,
                border      : false,
                labelWidth  : 90,
                items: [ToDate]
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
			x       : 1000,
			y       : 10,
			items:[optprinttype],
	},


		{
		    xtype       : 'fieldset',
		    x           : 0,
		    y           : 75,

		    border      : false,
		    width       : 1400,
		    items : [tabOverall]
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
//    items  : [tabOverall],

    items: FormPanel,
onEsc:function(){
},
    listeners:{
      
        show:function(){
             
            txtFinYear.setRawValue(yearfin);
	    Ext.getCmp('lblCASHBANK').setText("BANK BOOK");
            Refreshdata();


            FromDate.setRawValue(Ext.util.Format.date(finstartdate,"d-m-Y"),)

    //        Ext.getCmp('yrstartdate').setDisabled(true);  
//   var x=1234567890.3;
  // var x2 = Intl.NumberFormat('en-IN').format(x);

  // var x1 = Ext.util.Format.number(x2,'0.00');

//alert(formatter.format(x));	
//alert(x2);
//alert(x.toLocaleString('en-IN')); 
//     alert(Intl.NumberFormat('en-IN').format(x));
//     alert(Intl.NumberFormat('en-IN').format(x1));
            BankDataStore.load({
                      url: '/SHVPM/Accounts/clsAccounts.php',
                       params: {
                        task: "cmbbankacct",
                        compcode: Gincompcode,
                        finid : GinFinid
                       },
                    callback : function() {  BankDataStore.getCount(); 
                     cmbBank.setValue(1653);

	loadCashBankOpeningDatastore.removeAll();
	loadCashBankOpeningDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadCashBookOpening',
                compcode:Gincompcode,
                finid:GinFinid,
                ledcode : 1653,

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadCashBankOpeningDatastore.getCount();
                   openDr = 0;
                   openCr = 0;

                   if(cnt>0)
                   {
                       openDr = Number(loadCashBankOpeningDatastore.getAt(0).get('curbal_obdbamt'));
                       openCr = Number(loadCashBankOpeningDatastore.getAt(0).get('curbal_obcramt'));;
                          

                       var openDr2 = formatter.format(openDr);	
                       var openCr2 = formatter.format(openCr);	
                          
                       if (openDr >0)
                       {
                          txtOpening2.setValue(openDr);

                          lblCrDr.setText('DR');
                       }
                       else
                       {
                          txtOpening2.setValue(openCr);  

                          lblCrDr.setText('CR');


                       }

//var label = Ext.getCmp('lblCrDr');
//var labelText = label.text; // works if you stored it on creation
//alert(labelText);


                       if (openDr >0)
                       {
                          txtOpening.setRawValue(openDr2);
                       }
                       else
                       {
                          txtOpening.setRawValue(openCr2);  
                       }
  

                   }    

                }         
	  });

	loadCashBankDetailsDatastore.removeAll();
	loadCashBankDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadCashBookDetails',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 
                enddate: Ext.util.Format.date(finenddate,"Y-m-d"), 
                ledcode : 1653,

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadCashBankDetailsDatastore.getCount();
                   var dr  = 0;
                   var cr  = 0;
                   clo = openDr - openCr; 

                   if(cnt>0)
                   {
      
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadCashBankDetailsDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){    
//alert(loadCashBankDetailsDatastore.getAt(j).get('rmonth')); 
//alert(sel[i].data.month); 
          
                     		    if (sel[i].data.month === loadCashBankDetailsDatastore.getAt(j).get('rmonth'))
                  		    {
                                        dr = Number(loadCashBankDetailsDatastore.getAt(j).get('dramt'));
                                        cr = Number(loadCashBankDetailsDatastore.getAt(j).get('cramt'));
                                        clo = clo + dr - cr;
                                        var cloval = Math.abs(clo);


	                                sel[i].set('debit', Ext.util.Format.number(loadCashBankDetailsDatastore.getAt(j).get('dramt'),'0.00'));
                                        sel[i].set('credit', Ext.util.Format.number(loadCashBankDetailsDatastore.getAt(j).get('cramt'),'0.00'));
	                               sel[i].set('closing', Ext.util.Format.number(cloval,'0.00'));

			            }
                              }
			}

                       grid_tot();

                }   

             }     
	  });

                     }
                    });
	 
        }
    }
});
myWin.show();
    });


