Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;

   var GinUser = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');





    var gstrcpttype;
    var gstPaytype;
    var dateon;
    var getdate;
    var headcode = 0;
    var acccode = 0;


    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";


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
                  CashReceiptEntryWindow.hide();

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
                    Ext.MessageBox.alert("Receipt", "Select Ledger");
          

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
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
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
                 
                                dbamt    : 0,
                                cramt    : Number(txtCredit.getRawValue()),
                                ledseq   : acccode,

                                ledtype  : ledtype,
                             })
                            );
                           txtCredit.setRawValue('');
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
                  url: 'clsCashReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCRVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acCIRan_accref_seqno', 
'acCIRan_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acCIRan_totamt', 'acCIRan_paytype',
'led_name', 'led_addr1', 'led_addr2','led_type', 'led_custcode'])
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



 var HeadAccountdatastore = new Ext.data.Store({
      id: 'HeadAccountdatastore',
	//autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"cmbcashacct"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    });    

    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login By ',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });

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
                url: 'clsCashReceipt.php',      // File to connect to
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
		url: 'clsCashReceipt.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}



var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search Ledger',
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


    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Cash.Account',
        id: 'lblHeadAcnt',
        width: 50,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
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

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
	displayField    : 'led_name',
	valueField      : 'led_code',
        hiddenName      : 'led_code',
        id              : 'cmbHeadAccount',
        typeAhead       : true,
        mode            : 'local',
        store           : HeadAccountdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,

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
            {boxLabel: 'Against Bills', id: 'optBill', inputValue: 1,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "BB";
                                 flxAdjustDetails.getStore().removeAll();
                                 BillAdjustingDetail();
                               
                        }
                    }
                }
            },
            {boxLabel: 'Others', id: 'optAdv', inputValue: 2, checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            gstPaytype = "AD";
                                 flxAdjustDetails.getStore().removeAll();
                        }
                    }
                }
            }
        ]
    });

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



    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsCashReceipt.php',      // File to connect to
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
           url: 'clsBankReceipt.php',
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
      })
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
           url: 'clsCashReceipt.php',
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

                            invno = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvno');
                            invdate = LoadAdjustmentDetailsdatastore.getAt(j).get('refpartyinvdate');
                            invamt= LoadAdjustmentDetailsdatastore.getAt(j).get('refdnval');
                            dbcramt= LoadAdjustmentDetailsdatastore.getAt(j).get('recpay_amount');
                            totamt= 0;
                            pendingamt= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            adjamt= Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            voutype= LoadAdjustmentDetailsdatastore.getAt(j).get('reftype');
                            balamt=  Number(LoadAdjustmentDetailsdatastore.getAt(j).get('refamount'));
                            Narrate= "";
                            accrefseqno= LoadAdjustmentDetailsdatastore.getAt(j).get('refinvseqno');
                            accrefvouno=LoadAdjustmentDetailsdatastore.getAt(j).get('refpurchaseno');


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
                                    pendingamt: pendingamt,
                                    adjamt: adjamt,
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
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   


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
                      flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsCashReceipt.php',
	                   params: {
			        task: 'LoadCRVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
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
                getAdjustmentDetails();
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
                   txtCredit.focus();
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



    var curcode = 0;

 


    var lblCredit = new Ext.form.Label({
        fieldLabel: 'Credit',
        id: 'lblCredit',
        width: 50,
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCredit',
        width: 90,
        name: 'Credit',
        disabled: true,
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
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 60,
        width: 760,
       id: 'my-grid',  
        x: 10,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 60, align: 'left',hidden: true},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 120, align: 'left'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: true},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'left',hidden: true},
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
                    txtCredit.setValue(selrow.get('cramt'));
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
        fieldLabel: '',
        id: 'txtTotDebit', readOnly: true,
        width: 80,
        name: 'TotDebit'
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Total Amount',
        id: 'txtTotCredit', readOnly: true,
        width: 80,
        name: 'TotCredit'
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 80,
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

    var txtRecAmt = new Ext.form.NumberField({
        fieldLabel: 'Receipt Amount',
        id: 'txtRecAmt',
        width: 80,
        name: 'RecAmt'
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Bank Name',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        listeners: {

        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Payment Mode',
        width: 60,
        store: [[1, 'CQ'], [2, 'DD'], [3, 'MT'], [4, 'TT']],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
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
        width: 150,
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var ReceiptAdjBillDetdatastore = new Ext.data.Store({
        id: 'ReceiptAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getrcptadjbilldet"}, // this parameter asks for listing
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
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'left', hidden : 'true' },
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
                                if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                                    if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {

                                    } else {
                                        this.setValue(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
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
                        UpdateReceiptBillsAdjusted();
                    }
                }
            },

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
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'left'},
            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left'},
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left'}
        ]
    });

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'TOTAL ADJUSTED ',readOnly:true,
        id: 'txtTotNetAmt',
        width: 120,
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

        }
    });


function save_click()
{
			CalcSum();
                        var rcnt = flxDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        fromdate = "04/01/" + GinYear.substring(0, 4);
                        todate = "03/31/" + GinYear.substring(5, 9);
                        if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                            Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                        } else if (rcnt <= 0) {
                            Ext.MessageBox.alert("Receipt", "Transactions Details Not Available ..");
                        } else if (cmbHeadAccount.getValue() == 0) {
                            Ext.MessageBox.alert("Receipt", "Select the Head of Account");
                        } else if (txtTotNetAmt.getRawValue() <= 0 && gstPaytype == "BB") {
                            Ext.MessageBox.alert("Receipt", "You have selected Bill to Bill mode & no bills are adjusted");
                        } else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
                            Ext.MessageBox.alert("Receipt", "You have to select Bill to Bill mode in order to adjust bills");
                        } else {
                            Ext.Msg.show({
                                title: 'Receipt Voucher',
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
                                            url: 'FrmTrnCashReceiptSave.php',
                                            params: {
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                finid: GinFinid,
                                                finyear: GinYear,
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
                                                rcptamt: Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()),
                                                totadjamt: Number(txtTotNetAmt.getRawValue()),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                adjcnt: accadjData.length,

                                            },
                                            callback: function (options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success'] == "true") {
                                                  Ext.MessageBox.alert( 'Cash Receipt saved with Voucher No -' + obj['vouno']);
/*
                                                    Ext.Msg.show({
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

				    CashReceiptEntryFormPanel.getForm().reset();
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
					voutype: 'CIR',
					compcode: GinCompcode
				    }
				});

 }


    var tabCashReceipt = new Ext.TabPanel({
        id: 'tabCashReceiptDetail',
        bodyStyle: {"background-color": "#ffffdb"},
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
                title: 'Receipt Details',
                bodyStyle: {"background-color": "#ffffdb"},
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
                        bodyStyle: {"background-color": "#ffffdb"},
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
                                width: 300,
                                x: 5,
                                y: -15,
                                border: false,
                                items: [txtUserName]
                            },
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
/*
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 60,
                                width: 250,
                                x: 550,
                                y: 45,
                                border: false,
                                items: [cmbVouNo]
                            },
*/
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
                        width: 480,
                        height: 475,
                        x: 800,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
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
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 780,
                        height: 400,
                        x: 5,
                        y: 82,
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
                                width: 150,
                                x: 480,
                                y: -5,
                                border: false,
                                items: [lblCredit]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 130,
                                x: 440,
                                y: 17,
                                border: false,
                                items: [txtCredit]
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
/*
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 550,
                                y: 210,
                                border: false,
                                items: [txtTotDebit]
                            },
*/


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 250,
                                x: 0,
                                y: 120,
                                border: false,
                                items: [txtRefNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 80,
                                width: 215,
                                x: 250,
                                y: 120,
                                border: false,
                                items: [dtpRefDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 130,
                                width: 150,
                                x: 10,
                                y: 140,
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
                                y: 160,
                                border: false,
                                items: [txtNarration]
                            },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 350,
                                x: 500,
                                y: 120,
                                border: false,
                                items: [txtTotCredit]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 230,
                                width: 250,
                                x: 0,
                                y: 220,
                                border: false,
                                items: [lblAdjustingDoc]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 850,
                                x: 0,
                                y: 240,
                                border: false,
                                items: [flxAdjustDetails]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 350,
                                x: 0,
                                y: 360,
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


        ]
    });
    var totalval;
    var CashReceiptEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Cash Receipt Entry',
        bodyStyle: {"background-color": "#ffffdb"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 1100,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'CashReceiptEntryFormPanel',
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
//save
                    text: 'Save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,id:'editid',hidden:false,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    handler: function () {
                        save_click();
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
                            RefreshGridData();
                            RefreshData();
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
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            CashReceiptEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            tabCashReceipt
        ]
    });

    function RefreshData() {
        gstFlag = "Add";
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtRefNo.setValue("");
        txtRecAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");
        txtTotDebit.setValue("");
        cmbAccountName.setValue("");
        txtTotCredit.setValue("");
        cmbVouNo.setValue("");
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        gstrcpttype = "CASH RECEIPTS";

   

        Ext.getCmp('optBill').setValue(true);
        Ext.getCmp('optAdv').setValue(false);
        gstPaytype = "AD";
        cmbType.setRawValue('Cr');
        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode: GinCompcode,
                    }
        });


     gstPaytype = "AD";


        curcode = 1;



        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "LoadAllLedgerList",
                        compcode: GinCompcode
                    }
        });
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
        txtTotCredit.setValue(gincrtotal);
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
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
            ReceiptAdjBillDetdatastore.removeAll();
            ReceiptAdjBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getrcptadjbilldet",
                            finid: GinFinid,
                            ledcode: ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = ReceiptAdjBillDetdatastore.getCount();
                    for (var i = 0; i < RowCnt; i++) {

                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invamt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    dbcramt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    totamt: 0,
                                    adjamt: "",
                                 pendingamt: 
Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    voutype: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
                                    balamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    accrefseqno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vouno')
                                })
                                );
                    }
                    CalcSum();
               //     RefreshGridData();
                }
            });
        } else if (flxDetail.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtRecAmt.getRawValue())) {
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
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0) {
                if (rec.get('voutype') != "AD") {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                }
            }
        }
        txtTotNetAmt.setValue(ginadjtotal);
    }

    function UpdateReceiptBillsAdjusted() {
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (Number(rec.get('adjamt')) > 0 && i != rownum) {
                if (rec.get('voutype') != 'AD') {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                }
            }
        }
        if (selrow.get('voutype') == 'AD') {
            selrow.set('adjamt', selrow.get('pendingamt'));
            CalcSum();
        } else {
            if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
                if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', selrow.get('pendingamt'));
                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
                } else {
                    selrow.set('adjamt', 0);
                }
                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();
            }
        }
    }

    function RefreshGridData() {

        txtCredit.setValue("");
        cmbAccountName.setValue("");
        gstFlag = "Add";



        gstrcpttype = "CASH RECEIPTS";
//        gstPaytype = "BB";


        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task      : "cmbcashacct",
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
                            voutype : 'CIR'
                        },
                        callback: function(){

                            txtVouNo.setRawValue("CIR"+VouNodatastore.getAt(0).get('con_value'));
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
        headcode = '2139';
        cmbVouNo.hide();
    }

    var CashReceiptEntryWindow = new Ext.Window({
        width: 1300,
        height: 600,
        y: 25,
        items: CashReceiptEntryFormPanel,
        bodyStyle: {"background-color": "#ffffdb"},
        title: 'Cash Receipt Entry',
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
                txtUserName.setRawValue(GinUser);   
                Ext.getCmp('optBill').setValue(false);
                Ext.getCmp('optAdv').setValue(true);

                txtCredit.enable();

            }
        }
    });
    CashReceiptEntryWindow.show();
});

