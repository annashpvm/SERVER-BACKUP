Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');

   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');    


   var millname =localStorage.getItem('gstcompany');

   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  

   var printtype='OTHERS';
   var yearfinid=0;
   var totdb,totcr;
   var ledname="";
   var ledcode=0;
   var ledgercode=0;

   var printtype = "PDF";
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
   var ledtype = ''; 
   var ledger_debit = 0;   
    var ledger_credit = 0;
   var ledcode_length = 0;
   var ledgercodelist ='';
   var ledgercodelist2 ='';
const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
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
                    ledtype = "C";
		    var p1 = "&ledcode="+encodeURIComponent(ledgercodelist2);                
		    var p2 ="&compcode="+encodeURIComponent(compcode);      
		    var p3 = "&finid=" + encodeURIComponent(finid);

	            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	    var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p6 = "&ledname="+encodeURIComponent(cmbLedgerGroup.getRawValue());
       		    var p7 = "&ledtype="+encodeURIComponent(ledtype);

 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=xls' + param, '_blank');
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
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 3,
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


 var loadLedgerReportGrpListDatastore = new Ext.data.Store({
      id: 'loadLedgerReportGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReportLedgerGroupList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'rep_merge_code', 'rep_merge_name'
      ]),
    });

 var loadReportGrpLedgerListDatastore = new Ext.data.Store({
      id: 'loadReportGrpLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReportGroupLedgerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'ledcodelist', 
      ]),
    });

     var cmbLedgerGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Select Report Group',
        width           : 350,
        displayField    : 'rep_merge_name',
        valueField      : 'rep_merge_code',
        hiddenName      : 'rep_merge_name',
        id              : 'cmbLedgerGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadLedgerReportGrpListDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
                 	loadReportGrpLedgerListDatastore.removeAll();
			loadReportGrpLedgerListDatastore.load({
                        url: 'ClsViewStatements.php',
                        params:
                            {
                                task:"loadReportGroupLedgerList",
                                reportgroup:cmbLedgerGroup.getValue()
                       
                            },
                      	callback:function()
			    {
                               ledgercodelist = loadReportGrpLedgerListDatastore.getAt(0).get('ledcodelist');
                                ledcode_length =    ledgercodelist.length;
                                ledgercodelist2 = ledgercodelist.slice(1,ledcode_length-1);


                               LedgerClick();


                            }   
                        });  
         }
        }   
});  
      



     

  function LedgerClick(){
		
		LedgerClickLoadDataStore.removeAll();
		LedgerClickLoad2DataStore.removeAll();
		lblCrDr.setText("");
		fst_dbcr='';
		monthtype='';
		flagtypenw='';
                flxrep.getStore().removeAll();
                 LedgerClickLoadDataStore.load({
                    url: 'ClsViewStatements.php',
                    params:{
                        task:'LedgerGroupClick',
                        compcode:compcode,
                        finid:finid,
                        ledcodelist:ledgercodelist,
                    },
                    callback:function(){
                        var cnt=LedgerClickLoadDataStore.getCount();

			
                        if(cnt>0) { 


                            curbal_obcramt=0;
                            curbal_obdbamt=0;
                       //     ledcode=LedgerClickLoadDataStore.getAt(0).get('curbal_led_code');
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
                    url: 'ClsViewStatements.php',
                    params:{
                        task:'loadLedgerGroupMonthwise',
                        compcode:compcode,
                        finid:finid,
                        ledcodelist:ledgercodelist,
                    },
                    callback:function(){
                        var cnt=LedgerClickLoad2DataStore.getCount();

//alert(cnt);
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
                                    grid_tot();
                                    grid_closebal();
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


var chqno ='';
var invno = '';
  function MonthClick(){
                flxDetails.getStore().removeAll();
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


/*
              MonthClickVocDataStore.load({
                    url: 'ClsViewStatements.php',
                    params:{
                        task:'loadDocumentList',
                compcode:compcode,
                finid:finid,
                ledcode:ledcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledgertype :ledtype, 

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
                               accref_voudate=MonthClickVocDataStore.getAt(i).get('accref_voudate');
                               accref_payref_no=MonthClickVocDataStore.getAt(i).get('accref_payref_no');
                               acctrail_inv_no=MonthClickVocDataStore.getAt(i).get('acctrail_inv_no');
                               ledname=MonthClickVocDataStore.getAt(i).get('led_name');
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
                                   

                               if(accref_vou_type=="BR"){
                                   typevou="BANK RECEIPT";
                               }else  if(accref_vou_type=="BP"){
                                   typevou="BANK PAYMENT";
                               }else  if(accref_vou_type=="CR"){
                                   typevou="CASH RECEIPT";
                               }else  if(accref_vou_type=="CP"){
                                   typevou="CASH PAYMENT";
                               }else  if(accref_vou_type=="WA"){
                                   typevou="SALE MISLLANEOUS STORES";
                               }else  if(accref_vou_type=="WS"){
                                   typevou="SALE MISLLANEOUS ACCOUNTS";
                               }else{
                                   typevou="GENERAL";
                               }
                               flxDetails.getStore().insert(
                                flxDetails.getStore().getCount(),
                                new dgrecord({
                                    month:i+1,
                                    accountledger : party,
                                    accref_vouno:accrefvouno,

                                    accref_voudate:accref_voudate,
                                    accref_payref_no:invno,
                                    Chequeno:chqno,
                                    Account:ledname,
                                    Debit:acctradbamt,
                                    Credit:acctrancramt,
                                    Vouctype:typevou
                                })
                                );
                             grid_tot2();
                            }
                        }
                    }
         });
*/

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

                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));
                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
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




  function grid_tot2(){
	totdb="";
        totcr="";
        var Row1= flxDetails.getStore().getCount();
        ledger_debit = 0;
        ledger_credit = 0;

        flxDetails.getSelectionModel().selectAll();
        var sele=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totdb=Number(totdb)+Number(sele[i].data.acctran_dbamt);
            totcr=Number(totcr)+Number(sele[i].data.acctran_cramt);
        }

        ledger_debit = totdb;
        ledger_credit = totcr;
        var Dr2 = formatter.format(totdb);
        var Cr2 = formatter.format(totcr);
        txtLedgerDebit.setRawValue(Dr2);
        txtLedgerCredit.setRawValue(Cr2)
}




  function grid_closebal(){
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

  var ledgerDataStore = new Ext.data.Store({
        id: 'ledgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"ledgerNameNEW"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string',mapping: 'led_name'}
        ])
    });

 var LedgerClickLoadDataStore = new Ext.data.Store({
        id: 'LedgerClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
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
            url: 'ClsViewStatements.php',  // File to connect to
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


  var MonthOpeningDataStore = new Ext.data.Store({
        id: 'MonthOpeningDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_GroupLedger_Opening"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
'curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_voudate','accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgername', 'partyledger', 'led_code' , 'accref_vou_type'
        ])
    });


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
        },[
'curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_voudate','accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgername', 'partyledger', 'led_code' , 'accref_vou_type'
        ])
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
	flxDetails.getStore().removeAll();     
	MonthClickVocDataStore.removeAll();

	MonthClickVocDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDocumentList',
                compcode:compcode,
                finid:finid,
                ledcode:ledcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
                { 
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
                               accref_voudate=MonthClickVocDataStore.getAt(i).get('accref_voudate');
                               accref_payref_no=MonthClickVocDataStore.getAt(i).get('accref_payref_no');
                               acctrail_inv_no=MonthClickVocDataStore.getAt(i).get('acctrail_inv_no');
                               ledname=MonthClickVocDataStore.getAt(i).get('led_name');
                               acctradbamt=MonthClickVocDataStore.getAt(i).get('acctran_dbamt');
                               acctrancramt=MonthClickVocDataStore.getAt(i).get('acctran_cramt');
                               accref_vou_type=MonthClickVocDataStore.getAt(i).get('accref_vou_type');
                               if(accref_vou_type=="BR"){
                                   typevou="BANK RECEIPT";
                               }else  if(accref_vou_type=="BP"){
                                   typevou="BANK PAYMENT";
                               }else  if(accref_vou_type=="CR"){
                                   typevou="CASH RECEIPT";
                               }else  if(accref_vou_type=="CP"){
                                   typevou="CASH PAYMENT";
                               }else  if(accref_vou_type=="WA"){
                                   typevou="SALE MISLLANEOUS STORES";
                               }else  if(accref_vou_type=="WS"){
                                   typevou="SALE MISLLANEOUS ACCOUNTS";
                               }else{
                                   typevou="GENERAL";
                               }
                               flxDetails.getStore().insert(
                                flxDetails.getStore().getCount(),
                                new dgrecord({
                                    month:i+1,
                                    accountledger : party,
                                    accref_vouno:accrefvouno,
                                    accref_voudate:accref_voudate,
                                    accref_payref_no:acctrail_inv_no,
                                    Chequeno:accref_payref_no,
                                    Account:ledname,
                                    Debit:acctradbamt,
                                    Credit:acctrancramt,
                                    Vouctype:typevou
                                })
                                );
                             grid_tot2();
                            }
                        }
                }

	    });

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
    Process_Month_Ledger_Data();
  
}
 var opamt = 0;
    var cloamt = 0;

    function Process_Month_Ledger_Data()
    {

                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);


	MonthOpeningDataStore.removeAll();
	MonthOpeningDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_GroupLedger_Opening',
                compcode  : compcode,
                finid     : finid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   :ledgercodelist2,
                ledgertype   : 'C',
		},
		scope:this,
		callback:function()
       		{
                   var cnt=MonthOpeningDataStore.getCount();
                   if(cnt>0)
                   {

                    opamt =  Number(MonthOpeningDataStore.getAt(0).get('curbal_obdbamt'))+Number(MonthOpeningDataStore.getAt(0).get('trn_opdr')) - Number(MonthOpeningDataStore.getAt(0).get('curbal_obcramt')) - Number(MonthOpeningDataStore.getAt(0).get('trn_opcr')) ;
 
                   var opamt2 = formatter.format(Math.abs(opamt));


                    if (opamt > 0)      
                       txtOpening_Debit.setRawValue(opamt2);
                    else
                       txtOpening_Credit.setRawValue(opamt2);
                  }
               } 
           }); 


        flxDetails.getStore().removeAll();
	MonthClickVocDataStore.removeAll();
	MonthClickVocDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Ledger_Details',
                compcode  : compcode,
                finid     : finid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   :ledgercodelist2,
                ledgertype   : 'C',
		},
		scope:this,
		callback:function()
       		{
                   var cnt=MonthClickVocDataStore.getCount();
                   if(cnt>0)
                   {

 

                   for(var j=0; j<cnt; j++)
 		   { 



                       flxDetails.getStore().insert(
                       flxDetails.getStore().getCount(),
                       new dgrecord({
                           sno          : j+1,	
// 			   voudate  : MonthClickVocDataStore.getAt(j).get('accref_voudate'),
                           voudate  : Ext.util.Format.date(MonthClickVocDataStore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   led_name : MonthClickVocDataStore.getAt(j).get('ledgername'),
 	                   acctran_dbamt : MonthClickVocDataStore.getAt(j).get('acctran_dbamt'),
 			   acctran_cramt  : MonthClickVocDataStore.getAt(j).get('acctran_cramt'),
                           accref_payref_no : MonthClickVocDataStore.getAt(j).get('accref_payref_no'),
 			   accref_vouno  : MonthClickVocDataStore.getAt(j).get('accref_vouno'),
                           accref_vou_type : MonthClickVocDataStore.getAt(j).get('accref_vou_type'),
			   accref_seqno : MonthClickVocDataStore.getAt(j).get('accref_seqno'),
			   led_code : MonthClickVocDataStore.getAt(j).get('acctran_led_code'),

                        })
                       );
        
                   }   
                   } 
                   grid_tot2();  


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


    var txttotdebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotdebit2',
        name        : 'txttotdebit2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotcredit2',
        name        : 'txttotcredit2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
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
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
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
                tabOverall.setActiveTab(1);
                var selerow =flxrep.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    var a =selerow[i].get('month');
                }
                cmbMonth.setRawValue(a);
                MonthClick();
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
	id:'my-grid2',
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 440,
        width: 1100,
        border:false,
        x: 370,
        y: 40,
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "Date ", dataIndex: 'voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,             },
            {header: "Description", dataIndex: 'led_name',width:300,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('led_name');
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
                tabOverall.setActiveTab(2);
                var selerow =flxDetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
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
                                        //txtnarration2.setRawValue(VouNoClickDetailsNewDataStore.getAt(0).get('accref_narration'));
//                                        txtvouref.setRawValue(VouNoClickDetailsNewDataStore.getAt(0).get('accref_payref_no'));
//                                        txtRefDate.setRawValue(VouNoClickDetailsNewDataStore.getAt(0).get('accref_payref_date'));
//                                        txtnarration.setRawValue(VouNoClickDetailsNewDataStore.getAt(0).get('accref_narration'));

                                    }
                                }
                            });
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
    
    /*var btnview = new Ext.Button({
        style   : 'text-align:center;',
        text    : " TDS",
        width   : 60,id:'btnview',
        x       : 10,
        y       : 200,
        listeners: {
            click: function(){
                   
		    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finid="+encodeURIComponent(yearfinid);
                    var ledcode="&lednew="+encodeURIComponent(ledcod);

		    var param = (fin + com +ledcode) ;

		    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/accountstdreport.rptdesign' + param, '_blank');	
	    }
	}
	});*/

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

    var btnviewlast = new Ext.Button({
        style: 'text-align:center;',
        text: " Report",
        width: 60, id: 'btnviewlast',
        x: 10,
        y: 200,
        listeners: {
            click: function () {
                var com = "&compcode=" + encodeURIComponent(compcode);
                var fin = "&fincode=" + encodeURIComponent(finid);
                var lcode = "&ledgercode=" + encodeURIComponent(ledcode);
                var rmonth = "&repmonth=" + encodeURIComponent(monthcode);
                var rmonthname = "&repmonthname=" + encodeURIComponent(cmbMonth.getRawValue());

                var param = ( com + fin  + lcode + rmonth + rmonthname );

		if(monthcode>0 && ledcode >0){

                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger.rptdesign' + param, '_blank');
	
                }
            }
        }
    });


    var btnConfirmationBalance = new Ext.Button({
        style: 'text-align:center;',
        text: " Confirmation of Accounts",
        width: 100, id: 'btnviewlast',
        x: 10,
        y: 200,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                var p1 = "&compcode=" + encodeURIComponent(compcode);
                var p2 = "&fincode=" + encodeURIComponent(finid);
                var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	        var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p5 = "&ledcode="+encodeURIComponent(ledcode);

                var param = (p1+p2+p3+p4+p5);
                if (printtype == "PDF") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalance.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalance.rptdesign&__format=xlsX&' + param, '_blank');
                else
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalance.rptdesign' + param, '_blank');
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
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'Monthly Balance',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 250,
			layout  : 'absolute',
			x       : 950,
			y       : 10,
			items:[optprinttype],
	},




        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 30,
            height      : 100,
            width       : 600, 		 
            labelWidth  : 150,
            border      : false,
            items : [cmbLedgerGroup]
        },    

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 430,
            y           : 80,
            width       :400,
            labelWidth  : 200,
            border      : false,
            items : [lblob]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 80,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtob]
        },{
            xtype       : 'fieldset',
            x           : 730,
            y           : 80,
            border      : false,
            width       :250,
            items : [lblCrDr]
        },{
            xtype       : 'fieldset',
            x           : 780,
            y           : 65,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [btnPrint]
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
            x           : 1000,
            y           : 105,
            layout       :'hbox',
            border      : false,
            width       :250,
            items : [btnConfirmationBalance]
        },



/*{
            xtype       : 'fieldset',
            x           : 940,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview2]
        },{
            xtype       : 'fieldset',
            x           : 10,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview]
        },*/

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 400,
            y           : 350,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lblcb]
        },/*{
            xtype       : 'fieldset',
            x           : 150,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview3]
        },*/



        ]
    },

    {
        xtype: 'panel',
        title: 'Transactions',
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
            width       : 1100,
            height      : 1300,
            x           : 10,
            y           : 70,
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

/*
        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 350,
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
            x           : 600,
            y           : 480,
            border      : false,
            anchor: '100%',
            items : [txttotcredit2]
        },


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
                        x: 1100,
                        y: 10,
                        border: false,
                        anchor: '100%',
                        items: [btnviewlast]
                    },
        ]
    }, {
        xtype: 'panel',
        title: 'Voucher',
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
    items  : [tabOverall],

onEsc:function(){
},
    listeners:{
      
        show:function(){
 
        txtFinYear.setRawValue(yearfin);
        monthstartdate.setValue(finstdate);
        monthenddate.setValue(fineddate);
    	ledgerDataStore.load({
		url: '/SHVPM/Accounts/clsRepFinancials.php',  
		params:
		{
		    task:"ledgerNameNEW",
		    fcompcode:compcode	,
		    finid:finid	
		}
        });	
        Ext.getCmp('lblcompany').setText(millname);
  
        }
    }
});
myWin.show();
    });




