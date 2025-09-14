Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gstAdjtype='C';
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');

    var GinUser = localStorage.getItem('ginusername');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 


    var powerid=localStorage.getItem('powerid');	
    var gindbtotal;
    var gincrtotal;
    var ledgercode = 0;
    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";



function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsJournal.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}

var txtAccountName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  370,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   cmbType.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtAccountName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtAccountName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
    });

 

    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });



 var loadLedgerGrpListDatastore = new Ext.data.Store({
      id: 'loadLedgerGrpListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLedgerGroupList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'led_name', 'led_code'
      ]),
    });



 var loadtGrpLedgerListDatastore = new Ext.data.Store({
      id: 'loadtGrpLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupLedgerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'ledcodelist', 
      ]),
    });


 var loadReportGrpLedgerBalanceDatastore = new Ext.data.Store({
      id: 'loadReportGrpLedgerBalanceDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReportGroupLedgerBalance"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'ledgercode', 'led_name', 'closing', 'debit_balance', 'credit_balance','led_type' ,'ledger_type'
      ]),
    });


     var cmbLedgerGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Select Group',
        width           : 300,
        displayField    : 'led_name',
        valueField      : 'led_code',
        hiddenName      : 'led_name',
        id              : 'cmbLedgerGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadLedgerGrpListDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
                        flxAutoJVDetails.getStore().removeAll();
                 	loadtGrpLedgerListDatastore.removeAll();
			loadtGrpLedgerListDatastore.load({
                        url: 'ClsJournal.php',
                        params:
                            {
                                task:"loadGroupLedgerList",
                                reportgroup:cmbLedgerGroup.getValue()
                       
                            },
                      	callback:function()
			    {
                               ledgercodelist = loadtGrpLedgerListDatastore.getAt(0).get('ledcodelist');
                               ledcode_length =    ledgercodelist.length;
                               ledgercodelist2 = ledgercodelist.slice(1,ledcode_length-1);

                        	
                              	loadReportGrpLedgerBalanceDatastore.removeAll();
				loadReportGrpLedgerBalanceDatastore.load({
		                url: 'ClsJournal.php',
		                params:
		                    {
		                        task:"loadReportGroupLedgerBalance",
			                finid    : ginfinid,
			                compcode : gstfincompcode,
		                        ledcode  : ledgercodelist2,
                                        asondate : Ext.util.Format.date(dtpBalanceAson.getValue(),"Y-m-d"), 
		               
		                    },
		              	callback:function()
				    {
				      var cnt=loadReportGrpLedgerBalanceDatastore.getCount();
				      if (cnt>0)
				      {
				          for(var j=0; j<cnt; j++) 
				          {


                  if (Number(loadReportGrpLedgerBalanceDatastore.getAt(j).get('debit_balance'))+Number(loadReportGrpLedgerBalanceDatastore.getAt(j).get('credit_balance')) > 0 )
                  {				                                
				              flxAutoJVDetails.getStore().insert(
				                 flxAutoJVDetails.getStore().getCount(),
				                 new dgrecord({
						     led_code: loadReportGrpLedgerBalanceDatastore.getAt(j).get('ledgercode'),  
						     led_name: loadReportGrpLedgerBalanceDatastore.getAt(j).get('led_name'),  

				                     dbamt   : loadReportGrpLedgerBalanceDatastore.getAt(j).get('debit_balance'),
						     cramt   : loadReportGrpLedgerBalanceDatastore.getAt(j).get('credit_balance'), 
				                     dbamt2  : loadReportGrpLedgerBalanceDatastore.getAt(j).get('debit_balance'),
						     cramt2   : loadReportGrpLedgerBalanceDatastore.getAt(j).get('credit_balance'),  
				                     totamt  : Number(loadReportGrpLedgerBalanceDatastore.getAt(j).get('debit_balance'))+ Number(loadReportGrpLedgerBalanceDatastore.getAt(j).get('credit_balance')),
				                     led_type: loadReportGrpLedgerBalanceDatastore.getAt(j).get('led_type'),
				                     ledger_type: loadReportGrpLedgerBalanceDatastore.getAt(j).get('ledger_type'),
				                  })
				              );
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
    

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  JournalEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);





    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 400,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name','led_type'
      ]),
    });





function add_btn_click()
{
                var gstInsert = "true";



	        flxDetail.getSelectionModel().selectAll();
	        var selrows = flxDetail.getSelectionModel().getCount();
	        var sel = flxDetail.getSelectionModel().getSelections();
	        var cnt = 0;
	



                if (gstInsert == "true")
                {
                if (gridedit === "false")
                { 

		        if (cnt > 0){
		            gstInsert = "false";
		            Ext.MessageBox.alert("Journal","This Ledger Already Entered");
		        }
                }
                if (gridedit === "true")
                {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
			sel[idx].set('type'    , cmbType.getRawValue());
			sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
sel[idx].set('ledseq'  , ledgercode);
			//sel[idx].set('ledseq'  , txtAccountName.getValue());
			sel[idx].set('totamt'  , Number(txtDebit.getRawValue()) + Number(txtCredit.getRawValue()));
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
                        CalcTotalDebitCredit();
		}//if(gridedit === "true")
                else
                if  (cnt ==0){
                    var totamt;
/*
                    if (cmbType.getValue()==1){
                        totamt=Number(txtDebit.getRawValue())
                    }else if (cmbType.getValue()==2){
                        totamt=Number(txtCredit.getRawValue())
                    }
*/



                    totamt= Number(txtDebit.getRawValue())+ Number(txtCredit.getRawValue())
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            ledname : txtAccountName.getRawValue(),   
                            type    : cmbType.getRawValue(),
                            dbamt   : Number(txtDebit.getRawValue()),
                            cramt   : Number(txtCredit.getRawValue()),
                           // ledseq  : txtAccountName.getValue(),
	                    ledseq   : ledgercode,

                            totamt  : totamt,
                            ledtype : ledtype
                        })
                    );

/*
                        Ledgerdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"txtAccountName",
                            compcode:gstfincompcode
                        }
                    });
*/

  
                    CalcTotalDebitCredit();
ledgercode = 0;   
//                    txtTotNetamt.setRawValue(totamt);
//                    BillAdjustingDetail();
//                    RefreshGridData();
                }
            }
                   txtDebit.setRawValue('');
                   txtCredit.setRawValue('');

}



    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'},
            {name: 'led_type', type: 'string', mapping: 'led_type'},
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });


     function grid_tot(){
        flxAutoJVDetails.getSelectionModel().selectAll();
        var selrows = flxAutoJVDetails.getSelectionModel().getCount();
        var sel = flxAutoJVDetails.getSelectionModel().getSelections();
         gindbtotal = 0;
         gincrtotal = 0;
        for (var i=0;i<selrows;i++){
            gindbtotal = Number(gindbtotal)+Number(sel[i].data.dbamt);
            gincrtotal = Number(gincrtotal)+Number(sel[i].data.cramt);
        };
        var Dr2 = formatter.format(gindbtotal);
        var Cr2 = formatter.format(gincrtotal);
        var diff = 0;
        var jvamt = 0;
        if (Number(gindbtotal) > Number(gincrtotal))
        {   
           diff = Math.abs(Number(gindbtotal)-Number(gincrtotal));
           var Dr3 = formatter.format(diff);
           txtDiffDbamt.setRawValue(Dr3);
           txtDiffCramt.setRawValue('');
           jvamt = gindbtotal;
        } 
        else
          {   
           diff = Math.abs(Number(gindbtotal)-Number(gincrtotal));
           var Dr3 = formatter.format(diff);
           txtDiffCramt.setRawValue(Dr3);
           txtDiffDbamt.setRawValue('');
           jvamt = gincrtotal;

        }   

        txtGroupDbamt.setRawValue(Dr2);
        txtGroupCramt.setRawValue(Cr2);
        txtDiffAmount.setRawValue(formatter.format(jvamt));
        txtJVAmount.setRawValue(jvamt.toFixed(2));
    };



     function CalcTotalDebitCredit(){
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
         gindbtotal = 0;
         gincrtotal = 0;
        for (var i=0;i<selrows;i++){

            gindbtotal = Number(gindbtotal)+Number(sel[i].data.dbamt);
            gincrtotal = Number(gincrtotal)+Number(sel[i].data.cramt);
//alert(gindbtotal);
//alert(gincrtotal);

        };

        txtTotaldbamt.setRawValue(gindbtotal.toFixed(2));
        txtTotalcramt.setRawValue(gincrtotal.toFixed(2));
    };

    
    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbjouledger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'led_code', type: 'int', mapping: 'led_code'},
          {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo:{field: 'led_name', direction: "ASC"}
    });
    
    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbvoucher"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
          {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
    //    sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });

    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'led_name', 'led_addr1', 'led_addr2','led_type', 'led_custcode'])
    });



    var txtVouno = new Ext.form.TextField({
        fieldLabel  : 'Vou No',
        id          : 'txtVouno',
        width       : 90,
        name        : 'txtVouno',
        readOnly    : 'true',
    })

    
    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel      : 'Vou No',
        width           : 90,
        store           : Voucherdatastore, //readOnly:true,
        displayField    : 'vou_no',
        valueField      : 'vou_seqno',
        hiddenName      : 'vou_no',
        id              : 'cmbVouno',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        style :{textTransform:"uppercase"},
        listeners:{
           select: function(){
                      Ext.getCmp('editchk').hide();
                      flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbVouno.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouno.setRawValue(cmbVouno.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefno.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefdate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('led_name'),                          				                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('led_type'),
	                                  })
                                      );
                                  }
                CalcTotalDebitCredit();
                EditDateCheck();
                              }  
                          }
                      });  
            }    
        }
    });
    
   
  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinNewDays+1))
        {     
             alert("You are Not Allowed to Raise the document in the date of " +  Ext.util.Format.date(dt_voucher,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the document in Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Document Date is not in current finance year. Please check");
    }

 }


  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinEditDays+1))
        {     
             alert("You are Not Allowed to Modify this document. Contact HOD for Corrections.." );
             Ext.getCmp('save').setDisabled(true);  
        }
        else
        {
             Ext.getCmp('save').setDisabled(false);  

        }       
 }




    var dtpBalanceAson= new Ext.form.DateField({
        fieldLabel: 'Balance As on ',
        id: 'dtpBalanceAson',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              dtpVouDate.setValue(dtpBalanceAson.getValue());
           },
           keyup:function(){
              dtpVouDate.setValue(dtpBalanceAson.getValue());
            },

        }  	
        
    });



    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
        }  	
        
    });


    var lblAcctname = new Ext.form.Label({
        fieldLabel  : 'Account Name',
        id          : 'lblAcctname',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
   





    var lblType = new Ext.form.Label({
        fieldLabel  : 'Type',
        id          : 'lblType',
        width       : 50,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
    
   function cmbtypechange()
   {

        if (cmbType.getValue()==1){
            txtDebit.enable();
            Ext.getCmp('txtDebit').focus(true, 1);
            txtCredit.disable();
            txtCredit.setValue("");
	    txtDebit.setValue("");	
        }else if (cmbType.getValue()==2){
            txtDebit.disable();
            txtCredit.enable();
            Ext.getCmp('txtCredit').focus(true, 1);
	    txtCredit.setValue("");	
            txtDebit.setValue("");
        }else{
            txtDebit.disable();
            txtCredit.disable();
            txtDebit.setValue("");
            txtCredit.setValue("");
        }

   }


    var cmbType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'type_name',
        valueField      : 'type_code',
        hiddenName      : 'type_name',
        id              : 'cmbType',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        store           : [['1','Dr'],['2','Cr']],
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
            Ext.getCmp('txtDebit').focus(true, 1);
             }
          },

            blur: function(){
                   cmbtypechange();
            },
            change: function(){
                   cmbtypechange();
            },
            select : function(){
                   cmbtypechange();
            }
        }
    });
    
    var lblDebit = new Ext.form.Label({
        fieldLabel  : 'Debit',
        id          : 'lblDebit',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
  
    });
    
    var txtDebit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDebit',
        width       : 90,
        name        : 'debit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
             }
          }
        } 
    });
    
    var lblCredit = new Ext.form.Label({
        fieldLabel  : 'Credit',
        id          : 'lblCredit',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

    });
    
    var txtCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCredit',
        width       : 90,
        name        : 'credit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
             }
          }
        } 
    });
    

function save_click()
{


                        var rcnt = flxDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        /*var gstRefno;
                        if(txtRefno.getRawValue()==""){
                            gstRefno = cmbVouno.getRawValue();
                        }else{
                            gstRefno = txtRefno.getRawValue();
                        }*/
                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
                        if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length <5  )  )
                        {
                            Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setRawValue(text)
		                        save_click();
				    }
				});
                                       
                        }
                        else if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(rcnt<=0){
                            Ext.MessageBox.alert("Journal","Transactions Details Not Avaliable ..");
                        }else if(Number(txtTotaldbamt.getRawValue())!=Number(txtTotalcramt.getRawValue())){
                            Ext.MessageBox.alert("Journal","The Transactions Debit and Credit Amount are not  Equal");
                        }else {
                            Ext.Msg.show({
                                title: 'Journal Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Save This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnJournalSave.php',
                                            params:{
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: seqno,
                                                vouno: txtVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d"),
                                                bankname: "",
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "GJV",
                                                paymode: "",
                                                payno: "",
                                                paydate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                usercode : GinUserid, 
                                                reason   : txtReason.getRawValue(),
            
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
                                                        Ext.Msg.show({
                                                        title: 'Saved',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Record saved with Voucher No -'+ obj['vouno'],
                                                        fn: function(btn){
                                                            if (btn == 'yes'){
                                                                window.location.reload();
                                                            }else{
                                                                window.location.reload();
                                                            }
                                                        }
                                                        });
                                                }else{
                                                    Ext.MessageBox.alert("Alert","Record not saved - " + obj['vouno']);
                                                }
                                            }
                                       });
                                    }
                                }
                            });
                        }
}



function edit_click()
{

            gstFlag = "Edit";
            cmbVouno.show();
            txtVouno.hide();
		Voucherdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		    {
			task: "cmbvoucher",
			finid: ginfinid,
			voutype: 'GJV',
			compcode: gstfincompcode
		    }
		});


}
    var btnSubmit = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Submit",
        width   : 60,
        x       : 715,
        y       : 30,
        listeners: {
            click: function(){
                  add_btn_click();     

            }
        }
    });


 function GenerateJV()
 {
                flxDetail.getStore().removeAll();


                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            ledname : cmbLedgerGroup.getRawValue(),   
                            type    : 'Cr',
                            dbamt   : 0,
                            cramt   : txtJVAmount.getRawValue(),
	                    ledseq  : cmbLedgerGroup.getValue(),
                            totamt  :  txtJVAmount.getRawValue(),
                            ledtype : 'G'
                        })
                    );



		flxAutoJVDetails.getSelectionModel().selectAll();
     
		var selrows = flxAutoJVDetails.getSelectionModel().getCount();
		var sel = flxAutoJVDetails.getSelectionModel().getSelections();
             	var dbjvamt = 0;
		var crjvamt = 0;
                var drcr = '';

		for (var i=0;i<selrows+1;i++){

//                    var rec   = flxAutoJVDetails.getStore().getAt(i);
//                    ledname   = rec.get('led_name');
                    ledname   = sel[i].data.led_name;
                    ledcode   = sel[i].data.led_code;

		    dbamt     = Number(sel[i].data.dbamt2);
		    cramt     = Number(sel[i].data.cramt2); 
                 
                    partytype = sel[i].data.led_type;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            ledname : ledname,   
                            type    : 'Dr',
                            dbamt   :Number(dbamt),
                            cramt   : 0,
	                    ledseq  : ledcode,
                            totamt  : Number(cramt),
                            ledtype : 'G'
                        })
                    );


                    tabAccJVPanel.setActiveTab(1);
                    CalcTotalDebitCredit();
                    CalcTotalDebitCredit();

		};

 }

    var btnGenerate = new Ext.Button({
        style: 'text-align:center;',
        text: " GENERATE JV",
        width: 100, id: 'btnGenerate',
        x: 10,
        y: 200,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
               GenerateJV();
            }   
        }
    });

    
    var btnRemove = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Remove",
        width   : 60,
        x       : 715,
        y       : 30,
        handler: function(){
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
        }
    });
 
/* 
    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php'
            }),
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'AccountDetDataStore'
        },['ledname','currency','amount','exgrate','type','dbamt','cramt','ledseq','curseq','totamt'])
    });
    
*/
    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 760,
        x: 20,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname',sortable:true,width:290,align:'left'},
            {header: "Type", dataIndex: 'type',sortable:true,width:50,align:'left'},
            {header: "Debit", dataIndex: 'dbamt',sortable:true,width:100,align:'right'},
            {header: "Credit", dataIndex: 'cramt',sortable:true,width:100,align:'right'},
            {header: "Ledseqno", dataIndex: 'ledseq',sortable:true,width:60,align:'left',hidden:true},
            {header: "totamt", dataIndex: 'totamt',sortable:true,width:80,align:'left',hidden:true},
            {header: "ledtype", dataIndex: 'ledtype',sortable:true,width:60,align:'left',hidden:true},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
                    gridedit = "true";
		    editrow  = selrow;

ledgercode = selrow.get('ledseq');
                   // txtAccountName.setValue(selrow.get('ledseq'));
                    txtDebit.setValue(selrow.get('dbamt'));
                    txtCredit.setValue(selrow.get('cramt'));
                    cmbType.setRawValue(selrow.get('type'));
                    flxDetail.getSelectionModel().clearSelections();
                    if (selrow.get('type') == 'Dr')
                    {
                        txtDebit.enable();
                        txtCredit.disable();
                    }  
                    else 
                    {
                        txtDebit.disable();
                        txtCredit.enable();
                    }
		}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
         CalcTotalDebitCredit();
             }
        });         
    }
   }
    });

function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('led_code'));
	if ((selrow != null)){

		ledgercode = selrow.get('led_code');
		ledtype    = selrow.get('led_type');

//				cmbAccountName.setValue(selrow.get('led_code'));
		txtAccountName.setValue(selrow.get('led_name'));
                cmbType.focus() 
                flxLedger.hide();   


	}

}


  var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxLedger,
        x: 15,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'led_type',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
   }
   });

    var flxAutoJVDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 170,
        width: 950,
        x: 20,
        y: 90,
    id: 'my-grid',  
        columns: [         
            {header: "Led. Code",    dataIndex: 'led_code',sortable:true,width:70,align:'left',hidden:true},
            {header: "Account Name", dataIndex: 'led_name',sortable:true,width:400,align:'left'},
            {header: "Closing (Dr)", dataIndex: 'dbamt',sortable:true,width:150,align:'right' ,
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
            {header: "Closing (Cr)", dataIndex: 'cramt',sortable:true,width:150,align:'right',
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
            {header: "Closing (Dr)", dataIndex: 'dbamt2',sortable:true,width:150,align:'right',hidden:true},
            {header: "Closing (Cr)", dataIndex: 'cramt2',sortable:true,width:150,align:'right',hidden:true},
            {header: "C / S",  dataIndex: 'led_type',sortable:true,width:60,align:'left',hidden:true},
            {header: "Ledger type",  dataIndex: 'ledger_type',sortable:true,width:120,align:'left',hidden:true},
        ],
        store:[],

        listeners:{
	
        }
    });
    
    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtTotaldbamt',readOnly:true,
        width       :  100,
        name        : 'totaldbamt',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });
    
    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel  : 'Total Crdit',
        id          : 'txtTotalcramt',readOnly:true,
        width       : 100,
        name        : 'totalcramt',
         labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });

    var txtDiffAmount = new Ext.form.NumberField({
        fieldLabel  : 'Diff Amount',
        id          : 'txtDiffAmount',
        width       :  140,
        name        : 'txtDiffAmount',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });

    var txtJVAmount = new Ext.form.NumberField({
        fieldLabel  : 'JV Amount',
        id          : 'txtJVAmount',
        width       :  140,
        name        : 'txtJVAmount',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });
    
    var txtDiffDbamt = new Ext.form.NumberField({
        fieldLabel  : 'Diff Debit',
        id          : 'txtDiffDbamt',readOnly:true,
        width       :  140,
        name        : 'txtDiffDbamt',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });
    
    var txtDiffCramt = new Ext.form.NumberField({
        fieldLabel  : 'Diff Crdit',
        id          : 'txtDiffCramt',readOnly:true,
        width       : 140,
        name        : 'txtDiffCramt',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });


    
    var txtGroupDbamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtGroupDbamt',readOnly:true,
        width       :  140,
        name        : 'txtGroupDbamt',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });
    
    var txtGroupCramt = new Ext.form.NumberField({
        fieldLabel  : 'Total Crdit',
        id          : 'txtGroupCramt',readOnly:true,
        width       : 140,
        name        : 'txtGroupCramt',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });

    var txtRefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No',
        id          : 'txtRefno',
        width       : 80,
        name        : 'refno',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });
    
    var dtpRefdate = new Ext.form.DateField({
        fieldLabel : 'Ref Date',
        id         : 'dtpRefdate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
//value: '2020-03-31',
        anchor     : '100%' 
    });
    
    var txtNarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtNarration',
        width       : 675,
        height      : 50,
        name        : 'narration',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });


var tabAccJVPanel = new Ext.TabPanel({
    id          : 'tabAccJVPanel',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 490,
    width       : 1250,	
    x           : 10,
    y           : 10,
listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabAccJVPanel.getActiveTab();
               if (activeTab.id == 'tab2')
          GenerateJV(); 

        }


},

    items       : [
                   {
                     xtype: 'panel',
                     id   : 'tab1', 
                     title: 'LEDGER SELECTION',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 20,
			    y           : 30,
			    width       : 520, 		 
			    labelWidth  : 100,
			    border      : false,
			    items : [dtpBalanceAson]
			}, 
			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 20,
			    y           : 60,
			    width       : 520, 		 
			    labelWidth  : 100,
			    border      : false,
			    items : [cmbLedgerGroup]
			}, 

			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 20,
			    y           : 100,
			    labelWidth  : 100,
			    border      : false,

			    items : [flxAutoJVDetails]
			}, 


			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 330,
			    y           : 290,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtGroupDbamt]
			}, 
			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 620,
			    y           : 290,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtGroupCramt]
			}, 



			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 330,
			    y           : 320,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtDiffDbamt]
			}, 
			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 620,
			    y           : 320,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtDiffCramt]
			}, 




			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 620,
			    y           : 360,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtDiffAmount]
			}, 



			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 620,
			    y           : 400,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [txtJVAmount]
			}, 


			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 900,
			    y           : 395,
			    labelWidth  : 100,
			    border      : false,
                	    width       : 400, 	
			    items : [btnGenerate]
			}, 




                          ]
                   },    
                   {
                     xtype: 'panel',
                     id   : 'tab2', 
                     title: 'JV ENTRY',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
          {   xtype       : 'fieldset',
                title       : '',
                width       : 800,
                height      : 60,
                x           : 40,
                y           : 2,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 7,
                        border      : false,
                        items: [cmbVouno]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 7,
                        border      : false,
                        items: [txtVouno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 250,
                        y           : 7,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpVouDate]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 800,
                height      : 280,
                x           : 40	,
                y           : 65,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 180,
                        labelWidth  : 180,
                        x           : 5,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblAcctname]
                    },
{
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 420,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [txtAccountName]
                            }, 


                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 80,
                        x           : 405,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 400,
                        y           : 20,
                        border      : false,
                        items: [cmbType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 500,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 495,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 120,
                        x           : 605,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCredit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 600,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtCredit]
                    }, btnSubmit,  flxDetail,
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 375,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotaldbamt]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 570,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotalcramt]
                    },flxLedger,

                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 800,
                height      : 110,
                x           : 40,
                y           : 350,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 180,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtRefno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 200,
                        y           : 0,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpRefdate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 775,
                        x           : 0,
                        y           : 30,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtNarration]
                    }
                ]
            },


                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                       id : 'editchk',
                        width: 460,
                        height: 455,
                        x: 850,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 300,
                                width: 250,
                                x: 5,
                                y: -10,
                                border: false,
                                items: [lblReason]
                            },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 5,
                        	width       : 520,
                        	x           : 750,
                        	y           : 15,
                            	border      : false,
                        	items: [txtReason]
                    },


                        ]  
                    },
   

                     ]  
                   }
                  ]     
    });
    
    var JournalEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Journal Entry',
        header      : false,
        width       : 438,

                        bodyStyle: {"background-color": "#fff0ff"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'JournalEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: ' Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '/Pictures/Add.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Add";
                            RefreshData();
                        }
                    }
                },'-',
                {
//edit
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/Pictures/edit.png',
                    listeners:{
                      click: function () {
                             edit_click();

                        }
                    }
                },'-',
                {
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                            save_click();
                    }


                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                          window.location.reload();
                        }
                    }
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',hidden:true,
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            JournalEntryWindow.hide();
                        }
                    }
                }]
        },


        items: [tabAccJVPanel]
    });
    
    function RefreshData(){
        flxLedger.hide();
        gstFlag = "Add";
        Ext.getCmp('editchk').hide();
        txtUserName.setRawValue(GinUser);   
        Ext.getCmp('save').setDisabled(false);  
        cmbVouno.hide();
        txtVouno.show();

        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task:"cmbjouledger"
            }
        });

        VouNodatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task: "LoadJournalvouno",
                finyear: ginfinid,
                compcode: gstfincompcode
            },
            callback: function(){
                txtVouno.setValue("GJV"+VouNodatastore.getAt(0).get('con_value'));
            }
        });
                    txtDebit.enable();
        txtCredit.disable();


        txtTotalcramt.setValue("");
        txtTotaldbamt.setValue("");

        txtCredit.setValue("");
        txtDebit.setValue("");

        txtNarration.setValue("");
        txtRefno.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue("Dr");


        flxDetail.getStore().removeAll();
    };
    
    function RefreshGridData(){
        txtDebit.setValue("");
        txtCredit.setValue("");
 
        cmbType.setValue(1);
        cmbType.setRawValue('Dr');


        seqno = 0;   
        cmbVouno.hide();
        gstFlag = "Add";

    };
/* 
function RefreshGridData() {
        cmbAccountName.setValue("");
        gstFlag = "Add";

      flxLedger.hide();

        gstrcpttype = "CASH PAYMENT";
     //   gstPaytype = "AD";

        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode  : GinCompcode,
                         
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); 
                     cmbHeadAccount.setValue(2139);
                     }
        });

                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'CIP'
                        },
                        callback: function(){

                            txtVouNo.setRawValue("CIP"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });


        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "LoadAllLedgerList",
                        compcode: GinCompcode
                    }
        });
      cmbHeadAccount.setValue(2139);
        headcode = '2139';
        cmbVouNo.hide();
    }
    */
    
    function CheckDate(){
        var fromdate;
        var todate;
        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);
        if(dtpVouDate.getRawValue() < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }else if(dtpVouDate.getRawValue() > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }
    }
    
    var JournalEntryWindow = new Ext.Window({
	height      : 580,
        width       : 1300,
        y           : 40,
        title       : 'Journal Entry',
        items       : JournalEntryFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
  onEsc:function(){
},
        listeners:
            {
                show:function(){
       
                    seqno = 0;   

                    cmbVouno.hide();

                    gstFlag = "Add";
flxLedger.hide();
                    Ledgerdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"LoadAllLedgerList",
                            compcode:gstfincompcode
                        }
                    });
                    Voucherdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "cmbvoucher",
                            finid: ginfinid,
                            compcode: gstfincompcode,
                            voutype: 'GJV'
                        }
                    });
                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: ginfinid,
                            compcode: gstfincompcode,
                            voutype : 'GJV'
                        },
                        callback: function(){
                            txtVouno.setValue("GJV"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });
                    txtDebit.enable();
                    txtCredit.disable();

                    Ext.getCmp('editchk').hide();
                    cmbType.setValue(1);
                    cmbType.setRawValue('Dr');

         if (Ext.util.Format.date(dtpBalanceAson.getValue(), "Y-m-d") > Ext.util.Format.date(finenddate, "Y-m-d"))
            dtpBalanceAson.setValue(finenddate);
         if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(finenddate, "Y-m-d"))
            dtpVouDate.setValue(finenddate);

                }
            }
    });
    JournalEntryWindow.show();  
});


