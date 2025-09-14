Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid =localStorage.getItem('ginfinid');
   var yearfinid=0;
   var totdb,totcr;
   var ledname="";
   var ledcod=0;
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

  function LedgerClick(){
		
		LedgerClickLoadDataStore.removeAll();
		LedgerClickLoad2DataStore.removeAll();
		lblCrDr.setText("");
		fst_dbcr='';
		monthtype='';
		flagtypenw='';
                flxrep.getStore().removeAll();
                 LedgerClickLoadDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledname:ledcod
                    },
                    callback:function(){
                        var cnt=LedgerClickLoadDataStore.getCount();
			
                        if(cnt>0){
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
                txttotdebit.setValue("0");
                txttotcredit.setValue("0");
                 LedgerClickLoad2DataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad2',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledcod:ledcode
                    },
                    callback:function(){
                        var cnt=LedgerClickLoad2DataStore.getCount();
			
                        if(cnt>0){
                          fvr_opbal=txtob.getRawValue();
                          var debit=LedgerClickLoad2DataStore.getAt(0).get('debit');
                          var credit=LedgerClickLoad2DataStore.getAt(0).get('credit');
                          var month=0;
			  month=LedgerClickLoad2DataStore.getAt(0).get('month');
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
                          }else{

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
                        }
                    }
                });

  }

  function MonthClick(){
                flxdetails.getStore().removeAll();
		MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(cmbmonth.getRawValue()=="JANUARY"){
                    monthcode=1;
                }else  if(cmbmonth.getRawValue()=="FEBRUARY"){
                    monthcode=2;
                }else  if(cmbmonth.getRawValue()=="MARCH"){
                    monthcode=3;
                }else  if(cmbmonth.getRawValue()=="APRIL"){
                    monthcode=4;
                }else  if(cmbmonth.getRawValue()=="MAY"){
                    monthcode=5;
                }else  if(cmbmonth.getRawValue()=="JUNE"){
                    monthcode=6;
                }else  if(cmbmonth.getRawValue()=="JULY"){
                    monthcode=7;
                }else  if(cmbmonth.getRawValue()=="AUGUST"){
                    monthcode=8;
                }else  if(cmbmonth.getRawValue()=="SEPTEMBER"){
                    monthcode=9;
                }else  if(cmbmonth.getRawValue()=="OCTOBER"){
                    monthcode=10;
                }else  if(cmbmonth.getRawValue()=="NOVEMBER"){
                    monthcode=11;
                }else  if(cmbmonth.getRawValue()=="DECEMBER"){
                    monthcode=12;
                }

              MonthClickVocDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:{
                        task:'MonthVocNo',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledcode:ledcode,
                        month:monthcode
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
                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    month:i+1,
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
                             grid_tot();
                            }
                        }
                    }
         });

  }

  function VoucherClick(){
	       VouNoClickLoadDataStore.removeAll();
	       VouNoClickDetailsDataStore.removeAll();
	       AccInvNoDataStore.removeAll();
               flxld.getStore().removeAll();
	       txtvou.setRawValue('');
	       txtvouref.setRawValue("");
	       txtvoudate.setRawValue("");
	       txtmode.setRawValue('');
               txtno.setRawValue('');
               txtdate.setRawValue('');
               txtnarration2.setRawValue('');
               txtnarration.setRawValue('');
                VouNoClickLoadDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:{
                        task:'VouNoClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        vouno:cmbvoc.getRawValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){
                                txtvou.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
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
                                url: '/SHVPM/Financials/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetails',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:cmbvoc.getRawValue()
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsDataStore.getCount();
                                    if(cnt>0){
                                        txtmode.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_paymode'));
                                        txtno.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_no'));
                                        txtdate.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_date1'));
                                        txtnarration2.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
                                        //txtnarration.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
					txtvouref.setRawValue("");
					txtvoudate.setRawValue("");
                                        AccInvNoDataStore.load({
                                            url: '/SHVPM/Financials/clsRepFinancials.php',
                                            params:{
                                                task:'AccInvNo',
                                                fcompcode:compcode,
                                                ffinid:finid,
                                                vouno:b
                                            },
                                            callback:function(){
                                                txtvouref.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_no'));
                                                txtvoudate.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_date1'));
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
            url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
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
         'accref_narration'
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
            url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
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
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"MonthVocNo"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno','accref_voudate','acctrail_inv_no','led_name','accref_payref_no','accref_narration','acctran_dbamt','acctran_cramt','accref_vou_type'])
    });

     var AccInvNoDataStore = new Ext.data.Store({
        id: 'AccInvNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
        },['acctrail_inv_no','acctrail_inv_date1'])
    });

     var LedgerCodeCrDataStore = new Ext.data.Store({
        id: 'LedgerCodeCrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
        },['accref_voudate','acctran_dbamt','acctran_cramt','led_name'])
    });

    var VouNoClickDetailsDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',  // File to connect to
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
        },['accref_paymode','accref_payref_no','accref_payref_date1','accref_narration'])
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

    var cmbmonth = new Ext.form.ComboBox({
        id         : 'cmbmonth',
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

    var txtLtotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtLtotdebit',
        name        : 'txtLtotdebit',
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

    var txtLtotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtLtotcredit',
        name        : 'txtLtotcredit',
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
        width       : 80
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
        width       : 120,
        hidden:true
    });

var lblCrDrcl = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrcl',
style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100
    });

var lblCrDr = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDr',
style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100
    });

var lblcompany = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblcompany',
        name        : 'lblcompany',
	style: {
            'color':'#FFDEAD',readOnly:true,
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
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'actot',
        width       : 80
    });

    var lblTtot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lblTtot',
        name        : 'actTot',
        width       : 80
    });

    var grpcodetds=0;
    var cmbledger = new Ext.form.ComboBox({
        id         : 'cmbledger',
        fieldLabel : 'Ledger',
        width      : 300,
	style: {
            'color':'#0C5DA9',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        store      : ledgerDataStore,
        displayField:'led_name',
        valueField:'led_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
	emptyText: 'Type Ledger Name',
        editable: true,
        listeners:{
            select :function(){
		flxld.getStore().removeAll();
		flxrep.getStore().removeAll();
		flxdetails.getStore().removeAll();
                ledname=cmbledger.getRawValue();
                ledcod=cmbledger.getValue();
		txtob.setRawValue('0.00');
		txtcb.setRawValue('0.00');
		txttotdebit.setRawValue('0.00');
		txttotcredit.setRawValue('0.00');
			if(finid>0){	
			//btnview.show();
			txtob.setRawValue('0.00');
			txtcb.setRawValue('0.00');
			txttotdebit.setRawValue('0.00');
			txttotcredit.setRawValue('0.00');
		        LedgerClick();
		        grpcodetds = 0;
		        /*TdsLedgergetDataStore.removeAll();
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
			  });	*/
		     }
            }	
        }
    });

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
        height: 240,
        width: 1000,
        border:false,
        x: 370,
        y: 40,
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
                cmbmonth.setRawValue(a);
                MonthClick();
            }
        }
    });

    var flxdetails = new Ext.grid.EditorGridPanel({
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
        height: 300,
        width: 1000,
        border:false,
        x: 370,
        y: 40,
        columns: [
            {header: "S.No", dataIndex: 'month',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,hidden:true,},
            {header: "Voucher No", dataIndex: 'accref_vouno',width:130,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('accref_vouno');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "Voucher Date", dataIndex: 'accref_voudate',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Ref No", dataIndex: 'accref_payref_no',width:180,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Cheque No", dataIndex: 'Chequeno',width:100,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Account Name", dataIndex: 'Account',width:210,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden:true},
            {header: "Debit", dataIndex: 'Debit',width:150,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Credit", dataIndex: 'Credit',width:150,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
            {header: "Vouc Type", dataIndex: 'Vouctype',width:190,align:'left',sortable: false,defaultSortable: false,menuDisabled: true}
        ],
         listeners :{
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
                                url: '/SHVPM/Financials/clsRepFinancials.php',
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
                                        txtnarration.setRawValue(VouNoClickDetailsNewDataStore.getAt(0).get('accref_narration'));
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
        width       : 100
    });

    var txtvou = new Ext.form.TextField({
        fieldLabel  : 'Voucher',
        id          : 'txtvou',
        name        : 'txtvou',
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtvouref = new Ext.form.TextField({
        fieldLabel  : 'Refference No',
        id          : 'txtvouref',
        name        : 'txtvoref',
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtvoudate = new Ext.form.TextField({
        fieldLabel  : 'Voucher Date',
        id          : 'txtvdate',
        name        : 'txtvdate',
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
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

		    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/SalesLedgerdetails.rptdesign' + param, '_blank');	
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
		    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/led.rptdesign', '_blank');	
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
                 
		    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finyear="+encodeURIComponent(yearfinid);
                    var ledcode="&ledger="+encodeURIComponent(ledcod);

		    var param = (ledcode + fin + com ) ;

		    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/accountsprint.rptdesign' + param, '_blank');	
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
                var fin = "&finyear=" + encodeURIComponent(yearfinid);
                var ledcode = "&ledger=" + encodeURIComponent(ledcod);
                var monthy = "&monthnamep=" + encodeURIComponent(monthcode);

                var param = (fin + com + ledcode + monthy);

		if(monthcode>0 && ledcod>0){
                    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/SalesLedgerdetailsMonth.rptdesign' + param, '_blank');
                }
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
        bodyStyle: {"background-color": "#0C5DA9"},
        layout: 'absolute',
        items: [
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            height      : 100,
            width:500, 		 
            labelWidth  : 80,
            border      : false,
            items : [cmbledger]
        },     /*   {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 42,
            height      : 100,
            width:500, 		 
            labelWidth  : 80,
            border      : false,
            items : [cmbcompany]
        },*/
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 400,
            y           : 10,
            width       :400,
            labelWidth  : 200,
            border      : false,
            items : [lblob]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 10,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtob]
        },{
            xtype       : 'fieldset',
            x           : 730,
            y           : 15,
            border      : false,
            width       :250,
            items : [lblCrDr]
        },{
            xtype       : 'fieldset',
            x           : 800,
            y           : 10,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [btnPrint]
        },
	{
            xtype       : 'fieldset',
            x           : 730,
            y           : 320,
            border      : false,
            width       :250,
            items : [lblCrDrcl]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 250,
            y           : 315,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lbltot]
        },
        {
            xtype       : 'fieldset',
            x           : 320,
            y           : 315,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 450,
            y           : 315,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotcredit]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height : 250,
            x           : 10,
            y           : 75,
            border      : false,
            items : [flxrep]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 315,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [txtcb]
        },/*{
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
            x           : 15,
            y           : 53,
            border      : false,
            width       :500,
            items : [lblcompany]
        },
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
        title: 'Voucher',
        bodyStyle: {"background-color": "#0C5DA9"},
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
            items : [cmbmonth]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height : 1200,
            x           : 10,
            y           : 75,
            border      : false,
            items : [flxdetails]
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
        },{
                        xtype: 'fieldset',
                        width: 800,
                        height: 100,
                        labelWidth: 0,
                        x: 850,
                        y: 400,
                        border: false,
                        anchor: '100%',
                        items: [btnviewlast]
                    },
        ]
    }, {
        xtype: 'panel',
        title: 'Transaction',
        bodyStyle: {"background-color": "#0C5DA9"},
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
            items : [cmbvoc]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 50,
            height      : 100,
            labelWidth  : 80,
            border      : false,
            items : [txtvou]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 10,
            height      : 100,
            labelWidth  : 80,
            border      : false,
            items : [txtvouref]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 50,
            height      : 100,
            labelWidth  : 80,
            border      : false,
            items : [txtvoudate]
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
            x           : 360,
            y           : 300,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtLtotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 520,
            y           : 300,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtLtotcredit]
        },
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
    }
    ]
});

var myWin = new Ext.Window({
    id     : 'myWin',
    height : 600,
    width  : 900,
    bodyStyle: {"background-color": "#0C5DA9"},
    x:180,
    y:60,
    maximized:true,
    items  : [tabOverall],
    listeners:{
        show:function(){
        	alert(compcode);
        	//alert(finid);
	   	 /*yearchangeDataStore.load({
		        url: '/SHVPM/Financials/clsRepFinancials.php',  
		        params:
		        {
		            task:"YEARFIN"	
		        },
				callback:function(){
					cmbcompany.setRawValue(yearchangeDataStore.getAt(0).get('fin_year'));
					yearfinid=yearchangeDataStore.getAt(0).get('fin_id');
				}
		    });	*/
		    	ledgerDataStore.load({
		        url: '/SHVPM/Financials/clsRepFinancials.php',  
		        params:
		        {
		            task:"ledgerNameNEW",
		            fcompcode:compcode	,
			    finid:finid	
		        }
		    });	
            if(localStorage.getItem('gincompcode')==1)
	    {
	    Ext.getCmp('lblcompany').setText("SRI HARI VENKATESWARA PAPER MILLS (P) LTD :  OVER ALL REPORT");
	    }

	    else if(localStorage.getItem('gincompcode')==90)
	    {
	    Ext.getCmp('lblcompany').setText("TRIAL STROE : OVER ALL REPORT");    
	    }else{
		  Ext.getCmp('lblcompany').setText('Log Again!');
	    }
	    var timevar=1000;
            setInterval(function () {
	    if(localStorage.getItem('gincompcode')==1)
	    {
	    Ext.getCmp('lblcompany').setText("SRI HARI VENKATESWARA PAPER MILLS (P) LTD:  OVER ALL REPORT");
	    }
 
	    else if(localStorage.getItem('gincompcode')==90)
	    {
	    Ext.getCmp('lblcompany').setText("TRIAL STORE : OVER ALL REPORT");    
	    }   
	  else{
		  Ext.getCmp('lblcompany').setText('Log Again!');
	 	  window.location.href=('/SHVPM/Financials/FinancialsLogin.php');
	    }
 	   },timevar);
 	   
        }
    }
});
myWin.show();
    });




