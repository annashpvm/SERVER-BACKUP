Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

    var GinFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');


   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');

    var gstrcpttype;
    var gstPaytype;

    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";


var voufound = 0; 

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
                  CashPaymentEntryWindow.hide();

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



function add_btn_click()
{
                var gstInsert = "true";
                if (cmbAccountName.getValue() == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Payment", "Select Ledger");
                }

                if (cmbAccountName.getValue() == cmbHeadAccount.getValue()) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Payment", "Select Different Ledger");
                }



                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq == cmbAccountName.getValue()) {
                        cnt = cnt + 1;
                    }
                }
                if (gstInsert == "true")
                {
                   if (gridedit === "false")
                   { 

		        if (cnt > 0){
		            gstInsert = "false";
		            Ext.MessageBox.alert("Receipt","This Ledger Already Entered");
		        }
                   }
                   if (gridedit === "true")
                   {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , cmbAccountName.getRawValue());
	 		sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
			sel[idx].set('ledseq'  , cmbAccountName.getValue());
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
                        CalcTotalDebitCredit();
	            }//if(gridedit === "true")
                    else
                    if  (cnt ==0){
                       if (gstInsert == "true") {
                           var totamt;
                           var RowCnt = flxDetail.getStore().getCount() + 1;
                           flxDetail.getStore().insert(
                             flxDetail.getStore().getCount(),
                             new dgrecord({
                                slno: RowCnt,
                                ledname  : cmbAccountName.getRawValue(),
                 
                                dbamt    : Number(txtDebit.getRawValue()),
                                cramt    : 0,
                                ledseq   : acccode,

                                ledtype  : ledtype,
                             })
                            );
                           txtDebit.setRawValue('');
                           CalcTotalDebitCredit();
                           BillAdjustingDetail();
                      }
                   }
               }
}


    function Password() {
		   if (txtpass.getRawValue() === "ca") {
                        Ext.getCmp('editid').setVisible(true);
                    } else {
                        Ext.getCmp('editid').setVisible(false);
                    }
    }

    var txtpass = new Ext.form.TextField({
        fieldLabel: 'Password',
        id: 'txtpass',
        inputType: 'password',
        width: 60,
        name: 'txtpass',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                Password();
            }
        }
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsCashPayment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name'
      ]),
    });

function itemSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsCashPayment.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}



var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchLedgerListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     itemSearch();
            }
         }  
    });


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        x: 0,
        y: 35,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Led Name", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('led_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('led_code');
				cmbAccountName.setValue(selrow.get('led_code'));
                                  
	     

			}
		}
 
    
   }
   });

    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBillAdjustmentDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['refseqno', 'refinvseqno', 'refbankseqno', 'refamount', 'refdate', 'reflastbalamt', 'reftype', 'refpurchaseno', 'refadjagaintno', 'reffinid','refcompcode', 'refpartyinvno', 'refpartyinvdate', 'refdnval', 'refdays', 'screen'])
    });



function getAdjustmentDetails()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
//   flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsCashPayment.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {
	       Ext.getCmp("optBill").setValue(true);
               gstPaytype === "BB";	
               BillAdjustingDetail();
               getAdjustmentDetails2();

              }   
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   

function getAdjustmentDetails2()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;
    flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsCashPayment.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {

               for(var j=0; j<cnt; j++) 
               {
                        invoiceno = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvno');
                        adjusted = Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
		            invdate = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvdate');
		            invamt = LoadAdjustmentDetailsdatastore.getAt(j).get('refdnval');
		            dbcramt = LoadAdjustmentDetailsdatastore.getAt(j).get('recpay_amount');
		            totamt = 0;
		            PendAmount= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount')) ;
		            Adjusted= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
		            voutype= LoadAdjustmentDetailsdatastore.getAt(j).get('reftype');
		            balamt=  Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
		            Narrate= "";
		            accrefseqno= LoadAdjustmentDetailsdatastore.getAt(j).get('refinvseqno');
		            accrefvouno= LoadAdjustmentDetailsdatastore.getAt(j).get('refpurchaseno');


                        rowadjusted = 0;  
                        rowpending= 0;  

			flxAdjustDetails.getSelectionModel().selectAll();
			var selrows = flxAdjustDetails.getSelectionModel().getCount();
			var sel = flxAdjustDetails.getSelectionModel().getSelections();
                        reccount = 0;   
			for (var i = 0; i < selrows; i++) {
			        if (sel[i].data.invno == invoiceno ) {

		                    rowadjusted = Number(sel[i].data.adjamt) + adjusted  ;
		                    rowpending = Number(sel[i].data.pendingamt) + adjusted  ;
		                    sel[i].set('adjamt', rowadjusted);
		                    sel[i].set('pendingamt', rowpending);
		                    reccount = reccount+1;
				}
                        }

		        if  (reccount == 0 )
		        {  


		                flxAdjustDetails.getStore().insert(
		                        flxAdjustDetails.getStore().getCount(),
		                        new dgadjrecord({
		                            invno: invno,
		                            invdate: invdate,
		                            invamt: invamt,
		                            dbcramt: dbcramt,
		                            totamt: 0,
		                            PendAmount: PendAmount,
		                            Adjusted: adjusted,
		                            voutype: voutype,
		                            balamt:  balamt,
		                            Narrate: "",
		                            accrefseqno: accrefseqno,
		                            accrefvouno: accrefvouno,
		                        })
	 	                        );
	                      CalcSum();
		       }
	                      CalcSum();
		}



        CalcSum();


              }   
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   



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

  var dtpVouDate = new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpVouDate',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        listeners: {
            select: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            },
            blur: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpVouDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
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
//        sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    


    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashPayment.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCPVoucherDetails"}, // this parameter asks for listing
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



    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Cash.Account',
        id: 'lblHeadAcnt',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtVouNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtVouNo',
        width: 80,
        name: 'txtVouNo',
        readOnly : 'true',
        enableKeyEvents: true,
        listeners: {

        }
    });


    var lblVouNo = new Ext.form.Label({
        fieldLabel: 'Vou. No.',
        id: 'lblVouNo',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblVouDate = new Ext.form.Label({
        fieldLabel: 'Vou.Date',
        id: 'lblVouDate',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var HeadAccountdatastore = new Ext.data.Store({
        id: 'HeadAccountdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbcashacct"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });


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


    var headcode = 0;

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: HeadAccountdatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbHeadAccount',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                headcode = cmbHeadAccount.getValue();

            }, blur: function () {
                headcode = cmbHeadAccount.getValue();
            }
        }
    });

    var optPayType = new Ext.form.RadioGroup({
        title: '',
        columns: 1,
        rows :2,
        id: 'optPayType',
        layout: 'hbox',
        width: 185,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "OptType"},
        items: [
            {boxLabel: 'Against Bill', id: 'optBill', inputValue: 1,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";

                        }
                    }
                }
            },
            {boxLabel: 'Others', id: 'optAdv', inputValue: 2, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "AD";

                        }
                    }
                }
            }
        ]
    });

    var dateon;
    var getdate;

    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/datechk.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DATECHECKING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['date'])
    });




    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 80,
        store: Voucherdatastore,
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbVouNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners:{
           select: function(){
                      voufound = 0;
                      flxDetail.getStore().removeAll();

     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashPayment.php',
	                   params: {
			        task: 'LoadCPVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                                
            //                  txtVouNo.setRawValue(cmbVouNo.getRawValue());
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                                  voufound = 1;
                                  for(var j=0; j<cnt; j++) 
                                  {

                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
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
                getAdjustmentDetails();

                              }  
//
if (voufound == 0)
{

   	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashPayment.php',
	                   params: {
			        task: 'LoadCPVoucherDetails_2',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                                
                              txtVouNo.setRawValue(cmbVouNo.getRawValue());
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {

                                  for(var j=0; j<cnt; j++) 
                                  {

                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
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
                              }  
                          }
                      });  
}    


                          }
                      });  

            }    
        }

    });
    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Account',
        id: 'lblAccount',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadAllLedgerList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });

    var acccode = 0;
    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 400,
        store: Ledgerdatastore,
        displayField: 'led_name',
        valueField: 'led_code',
        hiddenName: 'led_name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtDebit.focus();
             }
          },
            select: function () {
                acccode = cmbAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});

            }, blur: function () {
                acccode = cmbAccountName.getValue();
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAccountName.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});

            }
        }
    });

    var lblCurrency = new Ext.form.Label({
        fieldLabel: 'Currency',
        id: 'lblCurrency',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var Currencydatastore = new Ext.data.Store({
        id: 'Currencydatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbcurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cur_code', type: 'int', mapping: 'currency_code'},
            {name: 'cur_name', type: 'string', mapping: 'currency_symbol'}
        ]),
        sortInfo: {field: 'cur_code', direction: "ASC"}
    });

    var curcode = 0;
    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 60,
	readOnly:true,	
        store: Currencydatastore,
        displayField: 'cur_name',
        valueField: 'cur_code',
        hiddenName: 'cur_name',
        id: 'cmbCurrency',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                curcode = cmbCurrency.getValue();
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmt.disable();
                    txtExgRate.disable();
                    txtAmt.setValue("");
                    txtExgRate.setValue("");
                } else {
                    txtAmt.enable();
                    txtExgRate.enable();
                }
            }, blur: function () {
                curcode = cmbCurrency.getValue();
                if (cmbCurrency.getRawValue() == "INR") {
                    txtAmt.disable();
                    txtExgRate.disable();
                    txtAmt.setValue("");
                    txtExgRate.setValue("");
                } else {
                    txtAmt.enable();
                    txtExgRate.enable();
                }
            }
        }
    });

    var lblAmt = new Ext.form.Label({
        fieldLabel: 'Amount',
        id: 'lblAmt',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmt',
        width: 70,
        name: 'Amount',
        disabled: true,

    });

    var lblExgRate = new Ext.form.Label({
        fieldLabel: 'Exg.Rate',
        id: 'lblExgRate',
        width: 50
    });

    var txtExgRate = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtExgRate',
        width: 60,
        name: 'ExgRate',
        disabled: true
    });

    var lblType = new Ext.form.Label({
        fieldLabel: 'Type',
        id: 'lblType',
        width: 50
    });



    var cmbType = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 60,
        store: [[1, 'Cr'], [2, 'Dr']],
        displayField: 'Type_name',
        valueField: 'Type_code',
        hiddenName: 'Type_name',
        id: 'cmbType',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                if (cmbType.getRawValue() == "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                } else
                if (cmbType.getRawValue() == "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                }
                if (cmbCurrency.getRawValue() != "INR") {
                    if (this.getValue() == 1) {
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtDebit.setValue("");
                    } else if (this.getValue() == 2) {
                        txtDebit.setValue(Ext.util.Format.number((Number(txtAmt.getRawValue()) * Number(txtExgRate.getRawValue())), "0.00"));
                        txtCredit.setValue("");
                    }
                }
            },
            select: function () {
                if (cmbType.getRawValue() == "Dr") {
                    txtCredit.disable();
                    txtDebit.enable();
                } else
                if (cmbType.getRawValue() == "Cr") {
                    txtCredit.enable();
                    txtDebit.disable();
                }
            }
        }
    });

    var lblDebit = new Ext.form.Label({
        fieldLabel: 'Debit',
        id: 'lblDebit',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtDebit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtDebit',
        width: 100,
        name: 'Debit',
        disabled: false,
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnAdd.focus();
             }
          }
        }

    });


      var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 70,
        x: 600,
        y: 25,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                add_btn_click();

            }
        }
    });

    var btnRemove = new Ext.Button({
        style: 'text-align:center;',
        text: "Del",
        width: 40,
        x: 720,
        y: 30,
        handler: function () {
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
            if (flxDetail.getStore().getCount() >= 1) {
                BillAdjustingDetail();
            } else {
                flxAdjustDetails.getStore().removeAll();
            }
        }
    });

    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'AccountDetDataStore'
        }, ['slno', 'ledname', 'currency', 'amount', 'exgrate', 'type', 'dbamt', 'cramt', 'ledseq', 'curseq', 'totamt'])
    });

    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 70,
        width: 730,
        x: 0,
        y: 0,
        columns: [
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 120, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left'},
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
                    cmbAccountName.setRawValue(selrow.get('ledname'));
                    cmbAccountName.setValue(selrow.get('ledseq'));
                    txtDebit.setValue(selrow.get('dbamt'));
                    ledtype =  selrow.get('ledtype');
                    flxDetail.getSelectionModel().clearSelections();

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

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Total Debit', readOnly: true,
        id: 'txtTotDebit',
        width: 100,
        name: 'TotDebit',
        readOnly : true,
    });



    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 110,
        name: 'RefNo',
        style: {textTransform: "uppercase"},
        listeners: {
            change: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            },
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpRefDate.focus();
             }
            }  
        }
    });

    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefDate',
        name: 'RefDate',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%',
        listeners: {

             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtNarration.focus();
             }
          }
        }
    });

    var txtPayAmt = new Ext.form.NumberField({
        fieldLabel: 'Payment Amount',
        id: 'txtPayAmt',
        width: 80,
        name: 'PayAmt'
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',
        width: 60,
       store: [[1, 'CHQ'], [2, 'DD'], [3, 'NEFT']],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false
    });

    var txtNo = new Ext.form.TextField({
        fieldLabel: 'No',
        id: 'txtNo',
        width: 60,
        name: 'No'
    });

    var dtpDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpDate',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%'
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',
        id: 'lblAdjustingDoc',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var PaymentAdjBillDetdatastore = new Ext.data.Store({
        id: 'PaymentAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getpayadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_comp_code',
            'accref_finid', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_value',
            'acctrail_adj_value', 'acctran_cramt', 'acctran_dbamt', 'dbcr_invvalue'])
    });

    var OpeningBillDetdatastore = new Ext.data.Store({
        id: 'OpeningBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getobadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ob_seqno', 'ob_vou_no', 'ob_vou_date', 'ob_comp_code', 'ob_fin_id', 'ob_led_code', 'ob_ref_no',
            'ob_ref_date', 'ob_totamt', 'ob_adjamt', 'ob_cramt', 'ob_dbamt', 'dbcr_invvalue'])
    });


    var BillDetailDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'dbcramt', 'totamt', 'pendingamt', 'adjamt', 'voutype', 'balamt',
            'accrefseqno', 'accrefvouno'])
    });

    var dgadjrecord = Ext.data.Record.create([]);
    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: BillDetailDataStore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 110,
        width: 685,
        x: 0,
        y: 0,
        columns: [
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 80, align: 'left'},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 80, align: 'left'},
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'left' },
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 60, align: 'left' , hidden : 'true'},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left' , hidden : 'true' },
            {header: "Pending Amt", dataIndex: 'pendingamt', sortable: true, width: 80, align: 'left'},
            {header: "Adjusted", dataIndex: 'adjamt', sortable: true, width: 80, align: 'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) - Number(this.getRawValue()));
                        },
                        blur: function () {
                            CalcSum();
                        },
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
                            pendingamt = Number(selrow.get('pendingamt'));
                            if (Number(this.getRawValue()) > Number(pendingamt)) {
                                Ext.MessageBox.alert("Regional Receipt", "Adjusted amount cannot be greater than pending amount");
                                this.setValue("");
                                selrow.set('adjamt', "");
                                CalcSum();
                            } else {
                                if (Number(txtTotNetAmt.getRawValue()) < Number(txtPayAmt.getRawValue())) {
                                    if (Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                                    }
                                } else {
                                    this.setValue("");
                                }
                            }
                        }
                    }
                },
                listeners: {
                    click: function () {
                        UpdatePaymentBillsAdjusted();
                    }
                }
            },
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left'},
            {header: "Balance", dataIndex: 'balamt', sortable: true, width: 70, align: 'left',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.adjamt) > 0) {
                        retval = Number(record.data.pendingamt) - Number(record.data.adjamt);
                    } else {
                        retval = Number(record.data.pendingamt);
                    }
                    return retval;
                }
            },
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left', hidden: true}
        ]
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted ',
        id: 'txtTotNetAmt', readOnly: true,
        readOnly:true,
                width: 80,
        name: 'TotNetAmt'
    });

    var lblNarration = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarration',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtNarration = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtNarration',
        width: 600,
        height: 40,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });


    var tabCashPayment = new Ext.TabPanel({
        id: 'tabCashPaymentDetail',
        bodyStyle: {"background-color": "#fffffe"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        xtype: 'tabpanel',
        activeTab: 0,
        height: 565,
        width: 1300,
        items: [
            {
                xtype: 'panel',
                title: 'Payment Details',
                bodyStyle: {"background-color": "#fffffe"},
                style: {
                    'color': 'blue',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 75,
                        x: 5,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [
 
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: 0,
                                border: false,
                                items: [lblVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [txtVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [cmbVouNo]
                            },
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 100,
                                y: 0,
                                border: false,
                                items: [lblVouDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 100,
                                y: 20,
                                border: false,
                                items: [dtpVouDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 245,
                                y: 0,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 245,
                                y: 20,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 180,
                                height: 70,
                                x: 600,
                                y: -10,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [
                                    optPayType
                                ]
                            },




                        ]
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 480,
                        height: 490,
                        x: 800,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 520,
                        	x           : 10,
                        	y           : -10,
                            	border      : false,
                        	items: [txtSearch]
                    },flxLedger,

   

                        ]  
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 410,
                        x: 5,
                        y: 87,
                        border: true,
                        style       : 'padding:0px',
                                layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: 0,
                                border: false,
                                items: [lblAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 430,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [cmbAccountName]
                            },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 430,
                                x: 480,
                                y: -5,
                                border: false,
                                items: [lblDebit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 440,
                                y: 17,
                                border: false,
                                items: [txtDebit]
                            }, btnAdd, // btnRemove,
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 800,
                                x: 0,
                                y: 50,
                                border: false,
                                items: [flxDetail]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 300,
                                x: 0,
                                y: 130,
                                border: false,
                                items: [txtRefNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 215,
                                x: 250,
                                y: 130,
                                border: false,
                                items: [dtpRefDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 250,
                                x: 500,
                                y: 130,
                                border: false,
                                items: [txtTotDebit]
                            },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 10,
                                y: 160,
                                border: false,
                                items: [lblNarration]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 800,
                                height: 200,
                                x: 10,
                                y: 180,
                                border: false,
                                items: [txtNarration]
                            },

                         {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 230,
                                width: 150,
                                x: 0,
                                y: 230,
                                border: false,
                                items: [lblAdjustingDoc]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 850,
                                x: 0,
                                y: 250,
                                border: false,
                                items: [flxAdjustDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 400,
                                x: 150,
                                y: 370,
                                border: false,
                                items: [txtTotNetAmt]
                            },


                        ]
                    },
/*
                      { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 60,
		                width       : 150,
		                x           : 120,
		                y           : 300,
		                border      : false,
		                items: [txtpass]
		            },
*/

                ]
            },
/*
            {
                xtype: 'panel',
                title: 'Other Details',
                layout: 'absolute',
                bodyStyle: {"background-color": "#fffffe"},
                style: {
                    'color': 'white',
                    'style': 'Helvetica',
                    'font-size': '15px', 'font-weight': 'bold'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#fffffe"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 390,
                        x: 2,
                        y: 2,
                        border: true,
                        layout: 'absolute',
                        items: [

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 250,
                                x: 0,
                                y: 60,
                                border: false,
                                items: [txtPayAmt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                bodyStyle: {"background-color": "#fffffe"},
                                style: {
                                    'color': 'white',
                                    'style': 'Helvetica',
                                    'font-size': '15px', 'font-weight': 'bold'
                                },
                                width: 465,
                                height: 115,
                                x: 230,
                                y: 2,
                                border: true,
                                layout: 'absolute',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 100,
                                        width: 350,
                                        x: 0,
                                        y: 0,
                                        border: false,
                                        items: [txtBankName]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 100,
                                        width: 250,
                                        x: 0,
                                        y: 40,
                                        border: false,
                                        items: [cmbPaymode]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 30,
                                        width: 250,
                                        x: 170,
                                        y: 40,
                                        border: false,
                                        items: [txtNo]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        labelWidth: 30,
                                        width: 180,
                                        x: 270,
                                        y: 40,
                                        border: false,
                                        items: [dtpDate]
                                    },
                                ]
                            },

                        ]
                    }
                ]
            }
*/
        ]
    });


 function edit_click()
 {
        gstFlag = "Edit";
        cmbVouNo.show();
	Voucherdatastore.load({
	    url: '/SHVPM/Accounts/clsAccounts.php',
	    params:
	    {
		task: "cmbvoucher",
		finid: GinFinid,
		voutype: 'CIP',
		compcode: GinCompcode
	    }
	});
}

 function save_click()
 {
                CalcSum();


                var rcnt = flxDetail.getStore().getCount();
                var fromdate;
		var crdr=Number(txtTotDebit.getRawValue());
                var todate;
                fromdate = "04/01/" + gstfinyear.substring(0, 4);
                todate = "03/31/" + gstfinyear.substring(5, 9);
                if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                    Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                    Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                } else if (rcnt <= 0) {
                    Ext.MessageBox.alert("Payment", "Transactions Details Not Available ..");
                } else if (cmbHeadAccount.getValue() == 0) {
                    Ext.MessageBox.alert("Payment", "Select the Head of Account");
                } else if ( Number(txtTotNetAmt.getRawValue()) <= 0 && gstPaytype == "BB") {
                    Ext.MessageBox.alert("Payment", "You have selected Bill to Bill mode & no bills are adjusted");
//                } else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
//                    Ext.MessageBox.alert("Payment", "You have to select Bill to Bill mode in order to adjust bills");
                } else if (crdr <= 0) {
                    Ext.MessageBox.alert("Payment", "check details!");
                } else {
                    Ext.Msg.show({
                        title: 'Payment Voucher',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Are You Sure to Add This Record?',
                        fn: function (btn) {
                            if (btn == 'yes') {
                                var accData = flxDetail.getStore().getRange();
                                var accupdData = new Array();
                                Ext.each(accData, function (record) {
                                    accupdData.push(record.data);
                                });
                                var accadjData = flxAdjustDetails.getStore().getRange();
                                var accadjupdData = new Array();
                                Ext.each(accadjData, function (record) {
                                    accadjupdData.push(record.data);
                                });
                                Ext.Ajax.request({
                                    url: 'FrmTrnCashPaymentSave.php',
                                    params: {
                                        griddet: Ext.util.JSON.encode(accupdData),
                                        gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                        finid: GinFinid,
                                        finyear: gstfinyear,
                                        compcode: GinCompcode,
                                        accrefseq: seqno,
                                        vouno: txtVouNo.getRawValue(),

                                        voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                        bankname: txtBankName.getRawValue(),
                                        refno: txtRefNo.getRawValue(),
                                        refdate: Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
                                        narration: txtNarration.getRawValue(),
                                        paytype: gstPaytype,
                                        paymode: cmbPaymode.getRawValue(),
                                        payno: txtNo.getRawValue(),
                                        paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                        headacct: headcode,
                                        rcptamt: Number(txtTotDebit.getRawValue()),
                                        totadjamt: Number(txtTotNetAmt.getRawValue()),
                                        flagtype: gstFlag,
                                        cnt: accData.length,
                                        adjcnt: accadjData.length,
  
                                    },
                                    callback: function (options, success, response)
                                    {
                                        var obj = Ext.decode(response.responseText);
                                        if (obj['success'] == "true") {

                                        Ext.MessageBox.alert( 'Cash Payment saved with Voucher No -' + obj['vouno']);
/*                                            Ext.Msg.show({
                                                title: 'Saved',
                                                icon: Ext.Msg.QUESTION,
                                                buttons: Ext.MessageBox.YESNO,
                                                msg: 'Record saved with Voucher No -' + obj['vouno'],

                                                fn: function (btn) {
                                                    if (btn == 'yes') {
                                                        window.location.reload();
                                                    } else {
                                                        window.location.reload();
                                                    }




                                                }
                                            });
*/
				    CashPaymentEntryFormPanel.getForm().reset();
				    flxLedger.getStore().removeAll();
				    flxDetail.getStore().removeAll();
				    flxAdjustDetails.getStore().removeAll();

				    RefreshGridData();
                   		    RefreshData();

                                        } else {
                                            Ext.MessageBox.alert("Alert", "Record not saved - " + obj['vouno']);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
}


    var totalval;
    var CashPaymentEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Cash Payment Entry',
        bodyStyle: {"background-color": "#3399CC"},
        header: false,
        width: 1100,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashPaymentEntryFormPanel',
        method: 'POST',
        layout: 'absolute',


        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {

            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: ' Add',
                    style: 'text-align:center;',
                    tooltip: 'Add Details...', hidden: true,
                    height: 40,
                    fontSize: 20,
                    width: 50,
                    align: 'right',
                    icon: '/Pictures/Add.png',
                    listeners: {
                        click: function () {
                            gstFlag = "Add";
                        }
                    }
                }, '-',
//edit
                {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30, hidden: false,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                             edit_click();
                        }
                    }
                }, '-',
                {
                    text: 'Save',
                    style: 'text-align:center;', //hidden: true,
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
        listeners: {


            click: function () {
                       save_click();

            }
        }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                                  RefreshData();
                                  RefreshGridData() 
                        }
                    }
                }, '-',
                {
                    text: 'View',
                    style: 'text-align:center;', hidden: true,
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {

                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            CashPaymentEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            tabCashPayment
        ]
    });

    function RefreshData() {
        voufound = 0;
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        gstFlag = "Add";
        txtRefNo.setValue("");
        txtDebit.setValue("");
   //     txtCredit.setValue("");
        txtRefNo.setValue("");
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        cmbAccountName.setValue("");
        txtTotDebit.setValue("");

        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        txtAmt.setValue("");
        txtExgRate.setValue("");
        Ext.getCmp('optBill').setValue(false);
        Ext.getCmp('optAdv').setValue(true);
        gstPaytype = "AD";
        txtPayAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");

        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        gstrcpttype = "CASH PAYMENT";
    //    cmbCurrency.setRawValue('INR');
        cmbType.setRawValue('Dr');
        headcode = '2139';
        cmbVouNo.hide();
    }

    function CalcTotalDebitCredit() {
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
        }
        txtTotDebit.setValue(gindbtotal);
  
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
    }

    function BillAdjustingDetail() {
        if (flxDetail.getStore().getCount() == 1 && gstPaytype == "BB") {
            var ginledcode = flxDetail.getStore().getAt(0).get('ledseq');
            flxAdjustDetails.getStore().removeAll();
/*
            OpeningBillDetdatastore.removeAll();
            OpeningBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getobadjbilldet",
                            finid: 11,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = OpeningBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {
                        var voutype;
                        if (OpeningBillDetdatastore.getAt(i).get('ob_dbamt') > 0) {
                            voutype = "OB";
                        } else {
                            voutype = "AD";
                        }
                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: OpeningBillDetdatastore.getAt(i).get('ob_ref_no'),
                                    invdate: OpeningBillDetdatastore.getAt(i).get('ob_ref_date'),
                                    invamt: OpeningBillDetdatastore.getAt(i).get('ob_totamt'),
                                    dbcramt: OpeningBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: Number(OpeningBillDetdatastore.getAt(i).get('ob_totamt')) -
                                            Number(OpeningBillDetdatastore.getAt(i).get('dbcr_invvalue')),
                                    pendingamt: Number(OpeningBillDetdatastore.getAt(i).get('ob_totamt')) -
                                            Number(OpeningBillDetdatastore.getAt(i).get('ob_adjamt')),
                                    adjamt: "",
                                    voutype: voutype,
                                    balamt: "",
                                    accrefseqno: OpeningBillDetdatastore.getAt(i).get('ob_seqno'),
                                    accrefvouno: OpeningBillDetdatastore.getAt(i).get('ob_vou_no')
                                })
                                );
                    }
                }
            });

*/


            PaymentAdjBillDetdatastore.removeAll();
            PaymentAdjBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getpayadjbilldet",
                            finid: GinFinid,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = PaymentAdjBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {
                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invamt: PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    adjamt:0, 
                                    dbcramt: PaymentAdjBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('dbcr_invvalue')),
                                    pendingamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    voutype: PaymentAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
                                    balamt: Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(PaymentAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    accrefseqno: PaymentAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: PaymentAdjBillDetdatastore.getAt(i).get('accref_vouno')
                                })
                                );
                    }
                    CalcSum();
       //             RefreshGridData();
                }
            });
        } else if (flxDetail.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtPayAmt.getRawValue())) {
                var sm = flxAdjustDetails.getSelectionModel();
                var selrow = sm.getSelected();
                var rcnt = flxAdjustDetails.getStore().getCount();
                for (var i = 0; i < rcnt; i++) {
                    var rec = flxAdjustDetails.getStore().getAt(i);
                    rec.set('adjamt', 0);
                }
                CalcSum();
            }
        }
    }

    function CalcSum() {
        var selrows = flxAdjustDetails.getStore().getCount();
        var ginadjtotal = 0;
        txtTotNetAmt.setValue("");
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                } else {

                }
            }

        }
        txtTotNetAmt.setValue(ginadjtotal);
    }

    function UpdatePaymentBillsAdjusted() {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtPayAmt.setValue(Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                } else {
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {
            selrow.set('adjamt', selrow.get('pendingamt'));
            CalcSum();
        } else {
            if (Number(txtTotNetAmt.getRawValue()) < Number(txtPayAmt.getRawValue())) {
                if (Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Number(txtPayAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();
            }
        }
    }

    function RefreshGridData() {
        cmbAccountName.setValue("");
        gstFlag = "Add";


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

    var CashPaymentEntryWindow = new Ext.Window({
        width: 1300,
        height: 600,
        y: 25,
        items: CashPaymentEntryFormPanel,
        bodyStyle: {"background-color": "#3399CC"},
        title: 'Cash Payment Entry',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners: {
                 


            show: function () {
                gstFlag = "Add";
		RefreshGridData(); 
                curcode = 1;
                Ext.getCmp('optBill').setValue(true);
                Ext.getCmp('optAdv').setValue(false);
                cmbType.disable();
            }
        }
    });
    CashPaymentEntryWindow.show();
});

