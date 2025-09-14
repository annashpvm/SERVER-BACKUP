Ext.onReady(function(){
    Ext.QuickTips.init();

    var ginuser = localStorage.getItem('accuserid');
    var yearfin = localStorage.getItem('gstyear');
    var company = localStorage.getItem('gstcompany');
    var finid = localStorage.getItem('ginfinid');
    var powerid = localStorage.getItem('powerid');
    var compcode = localStorage.getItem('gincompcode');
    var GinFinid = localStorage.getItem('ginfinid');

    var GinUser = localStorage.getItem('gstuser');
    var GinUserid = localStorage.getItem('ginuser');


    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    tb.add(new Ext.Toolbar.SplitButton({
        text: '<b>General</b>',
        id: 'mnuGeneral',
        width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/GeneralMenuPage.php');

            }
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Payables</b>',
        width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/PayablesMenuPage.php');

            }
        }
     }),

     new Ext.Toolbar.SplitButton({
        text: '<b>Receivables</b>',
        width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/ReceivablesMenuPage.php');

            }
        }
     }),
        
    new Ext.Toolbar.SplitButton({
       text: '<b>Cash & Bank</b>',
       width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/CashBankMenuPage.php');

            }
        }
    }),
/*new Ext.Toolbar.SplitButton({
       text: '<b>Funds Management</b>',
       width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/FundsManagementMenuPage.php');

            }
        }
    }),*/
    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b> PAYABLE UPDATION </b>',
        width: 150, //style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[                    
            	{
                    text: '<b>GENERAL STORES</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationStores.php');
                    }
                },
            	{
                    text: '<b>FUEL </b>',
                    group: 'theme',
                     handler: function(){
                       window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationFuel.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - INDEGINEIOUS</b>',
                    group: 'theme',
                    handler: function(){
                       window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationRM.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - IMPORT</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationImportDC.php');
                    }
                }, 
            	{
                    text: '<b>WORK ORDER GRNS</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationWorkGRN.php');
                    }
                }, 
            	{
                    text: '<b>OTHER SALES</b>',
                    group: 'theme',
                    handler: function(){
                              window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationOtherSales.php');
                    }
                }, 
            	{
                    text: '<b>SALES NOTE</b>',
                    group: 'theme',
                    handler: function(){
                              window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnSaleNoteUpdation.php');
                    }
                },                 


             ]}

    }),

  new Ext.Toolbar.SplitButton({
       text: '<b>Division Change</b>',  
       width:100, 
	handler: function () {
           window.location.href=('/SHVPM/Financials/CompanyChange/Company.php');
        }
    }),
  new Ext.Toolbar.SplitButton({
       text: '<b>Year Change</b>',  
       width:100, 
	handler: function () {
           window.location.href=('/SHVPM/Financials/YearChange/year.php');
        }
    }),
    new Ext.Toolbar.SplitButton({
        text: '<b>LogOut</b>',
        width:100,
        handler: function () {
             window.location.href=('http://192.168.11.14');
        }
    }),
   new Ext.Toolbar.SplitButton({
        text: '<b>F5-Refresh</b>',
        width:100,
        iconCls: 'bmenu',
       handler: function(){
                        window.location.reload();
                    }
     })
    );
    


    var tbcashbank = new Ext.Toolbar();
    tbcashbank.render('toolbar');
    tbcashbank.add(new Ext.Toolbar.SplitButton({
        text: '<b>Entry</b>',
        width:100,id:'tranid',
        iconCls: 'bmenu',
        menu:{
            items:[
                {
                    text: '<b>Receipts</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Bank</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },                        
                            {
                                text: '<b>Cash</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },

                        /*    {
                                text: '<b>Region</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/TrnRegionalReceipt/FrmTrnRegionalReceipt.php');
                                }
                            }*/
                        ]
                    }
                },
                {
                    text: '<b>Payments</b>',
                    menu:{
                        items:[
                                                    {
                                text: '<b>Bank</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/TrnBankPayment/FrmTrnBankPayment.php');
                                }
                            },
                            {
                                text: '<b>Cash</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/TrnCashPayment/FrmTrnCashPayment.php');
                                }
                            },

                        ]
                    }
                },
                {
                    text: '<b>Contra</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnContra/FrmTrnContra.php');
                    }
                },
                {
                    text: '<b>Journal</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnJournal/FrmTrnJournal.php');
                    }
                },
		
              /*  {
                    text: '<b>Advance Deduction</b>',
                    group: 'theme',hidden:true,
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnAdvancededuction/FrmTrnAdvancededuction.php');
                    }
                },
*/

                {
                    text: '<b>Bill Discount</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnBilldiscount/FrmTrnBilldiscount.php');
                    }
                },
                {
                    text: '<b>Bill Realisation</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnBillrealisation/FrmTrnBillrealisation.php');
                    }
                },
                {
                    text: '<b>Reversal</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnReversal/FrmTrnReversal.php');
                    }
                },

                {
                    text: '<b>Bill Adjustment</b>',
                    group: 'theme',
                    handler: function(){
                       window.location.href=('/SHVPM/Financials/CashandBank/TrnBilladjustment/FrmTrnBilladjustment.php');
                    }
                },
               /* {
                    text: '<b>Monthly Bank Interest</b>',
                    group: 'theme',hidden:true,
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnMonthlybankinterest/FrmMonthlyBankInterest.php');
                    }
                },*/
		{
                    text: '<b>Provision Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnJournalProvision/FrmTrnJournalprovision.php');
                    }
                },{
                    text: '<b>Bank to Bank Transfer</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/TrnBankPaymentBtoB/TrnBankPaymentBtoB.php');
                    }
                }, 
                {
                    text: '<b>Financial Corrections</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/EditAccounts/FrmEdit.php');
                    }
                },         /*       {
                    text: '<b>Bank Master</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Bank_Reconciliation/Bank_Master/Bank_Master.php');
                    }
                },               {
                    text: '<b>Bank Reconciliation</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Bank_Reconciliation/Bank_Reconciliation/Bank_Reconciliation.php');
                    }
                },        {
                    text: '<b>Bank Statement Download</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Bank_Reconciliation/statementdownload/statementdownload.php');
                    }
                },*/{
                    text: '<b>Excel Upload-Bank Reconsulation</b>',
                    group: 'theme',hidden:false,
                    handler: function(){
                        window.open('/SHVPM/Financials/CashandBank/excel/index.php');
                    }
                },{
                    text: '<b> Bank Reconsulation</b>',
                    group: 'theme',hidden:true,
                    handler: function(){
                        //window.location.href=('/SHVPM/Financials/CashandBank/Reconsulation/Reconsulation.php');
			 window.location.href=('/SHVPM/Financials/CashandBank/TrnBankRecon/FrmTrnBankRecon.php');
                    }
                }
            ]
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Reports</b>',
        width:100,
        iconCls: 'bmenu',
        menu:{
            items:[
                {
                    text: '<b>Documents</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Preprinted Voucher</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepPreprintedvoucher/FrmRepPreprintedvoucher.php');
                                }
                            },
                            {
                                text: '<b>Cheque Printing</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepChequeprinting/FrmRepChequeprinting.php');
                                }
                            },
                            {
                                text: '<b>Covering Letter</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepCoveringletter/FrmRepCoveringletter.php');
                                }
                            },
                            {
                                text: '<b>Voucher Printing</b>',
                                menu:{
                                    items:[
                                        {
                                            text: '<b>Receipt</b>',
                                            group: 'theme',
                                            handler: function(){
                                                window.location.href=('/SHVPM/Financials/CashandBank/RepVoucherprinting/FrmRepVoucherprinting.php');
                                            }
                                        },
                                        {
                                            text: '<b>Payment</b>',
                                            group: 'theme',
                                            handler: function(){
                                                window.location.href=('/SHVPM/Financials/CashandBank/RepVoucherprinting/FrmRepVoucherprinting.php');
                                            }
                                        },
                                        {
                                            text: '<b>Contra</b>',
                                            group: 'theme',
                                            handler: function(){
                                                window.location.href=('/SHVPM/Financials/CashandBank/RepVoucherprinting/FrmRepVoucherprinting.php');
                                            }
                                        },
                                        {
                                            text: '<b>Journal</b>',
                                            group: 'theme',
                                            handler: function(){
                                                window.location.href=('/SHVPM/Financials/CashandBank/RepVoucherprinting/FrmRepVoucherprinting.php');
                                            }
                                        },
                                        {
                                            text: '<b>Expense</b>',
                                            group: 'theme',
                                            handler: function(){
                                                window.location.href=('/SHVPM/Financials/CashandBank/RepVoucherprinting/FrmRepVoucherprinting.php');
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    text: '<b>Overall Report</b>',
                    group: 'theme',
                    handler: function(){
			window.open('/SHVPM/Financials/CashandBank/OverallReport/overallreport.php');
                    }
                },
                {
                    text: '<b>TCS Book</b>',
                    group: 'theme',
                    handler: function(){
			window.open('/SHVPM/Financials/CashandBank/Reptcs/Reptcs.php');
                    }
                },
                {
                    text: '<b>Bank Check Detsils Report</b>',
                    group: 'theme',
                    handler: function(){
			window.location.href=('/SHVPM/Financials/CashandBank/RepBankCheck/RepBankCheck.php');
                    }
                },
                {
                    text: '<b>Ledger Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepLedgerbook/FrmRepLedgerbook.php');
                    }
                },
                {
                    text: '<b>Cash Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepCashbook/FrmRepCashbook.php');
                    }
                },{
                    text: '<b>Day Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Repdaybook/Repdaybook.php');
                    }
                },{
                    text: '<b>Tds Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Reptdsbook/Reptdsbook.php');
                    }
                },
                {
                    text: '<b>Bank Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepBankbook/FrmRepBankbook.php');
                    }
                },
                {
                    text: '<b>Contra Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepContraregister/FrmRepContraregister.php');
                    }
                },
                {
                    text: '<b>Journal Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepJournalregister/FrmRepJournalregister.php');
                    }
                },
                {
                    text: '<b>Bank Payment Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepBankpaymentregister/FrmRepBankpaymentregister.php');
                    }
                },
                {
                    text: '<b>Bank Receipt Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepBankreceiptregister/FrmRepBankreceiptregister.php');
                    }
                },
                {
                    text: '<b>Bank CC/PC Interest</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepBankccpcinterest/FrmRepBankccpcinterest.php');
                    }
                },
              /*  {
                    text: '<b>FBN/FBP Bill Discounting Detail</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepFbnfbpbilldiscounting/FrmRepFbnfbpbilldiscounting.php');
                    }
                },*/
                {
                    text: '<b>Filters</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Match Word</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepFilterMatchword/FrmRepFilterMatchword.php');
                                }
                            }/*,
                            {
                                text: '<b>Type of Balance</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepFilterbalancetype/FrmRepFilterbalancetype.php');
                                }
                            },
                            {
                                text: '<b>Cheque Balance</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepFilterchequebalance/FrmRepFilterchequebalance.php');
                                }
                            }*/
                        ]
                    }
                },
                {
                    text: '<b>Abstract</b>',
                    menu:{
                        items:[
                          /*  {
                                text: '<b>Group</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractgroup/FrmRepAbstractgroup.php');
                                }
                            },*/
                            {
                                text: '<b>Group (New)</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractgroupnew/FrmRepAbstractgroupnew.php');
                                }
                            },
                            {
                                text: '<b>Ledger Book</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractledgerbook/FrmRepAbstractledgerbook.php');
                                }
                            },
                            {
                                text: '<b>Ledger</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractledger/FrmRepAbstractledger.php');
                                }
                            },
                          /*  {
                                text: '<b>Sales Tax</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractsalestax/FrmRepAbstractsalestax.php');
                                }
                            },*/
                            {
                                text: '<b>Bank Payment</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractbankpayment/FrmRepAbstractbankpayment.php');
                                }
                            },
                            {
                                text: '<b>Bank Receipt</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractbankreceipt/FrmRepAbstractbankreceipt.php');
                                }
                            },
                            {
                                text: '<b>TDS Party wise</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstracttdspartywise/FrmRepAbstracttdspartywise.php');
                                }
                            },
                            {
                                text: '<b>Rectification</b>',
                                group: 'theme',
                                handler: function(){
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepWrongEntryCheck.rptdesign',  '_blank' );
                                }
                            },
                            {
                                text: '<b>Input Tax TNVAT</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/CashandBank/RepAbstractinputtaxtnvat/FrmRepAbstractinputtaxtnvat.php');
                                }
                            } 
                        ]
                    }
                },
                {
                    text: '<b>Sales Tax Report</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/RepSalestax/FrmRepSalestax.php');
                    }
                },
		/*{
                    text: '<b>Bank Reconciliation Report(Unreconciled)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Bank_Reconciliation/Reconciliation_Report/Reconciliation_Report.php');
                    }
                },
		{
                    text: '<b>Bank Reconciliation Report(Reconciled)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/CashandBank/Bank_Reconciliation/Bankrecon_Reconciled_Report/bankrecon_reconciled_Report.php');
                    }
                }*/
            ]
        }
     }),
          new Ext.Toolbar.Button({
            text: '<b>SHVPM</b>',style: 'background-color: yellow;',
            width:400,id:'btnheader1'   
          }),

          new Ext.Toolbar.Button({
            text: '<b>SHVPM2</b>',style: 'background-color: yellow;',
            width:300,id:'btnheader2'   
          }),


    );
    tb.doLayout();
    tbcashbank.doLayout();
               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'HEAD OFFICE';
               }
               else
               {
                  voupoint= 'MILL';
               }

//    Ext.getCmp('btnheader').setText( '<b>           '  +  company + '  -   Finance Year : ' + yearfin +   "          --         " + '  DATA  ENTRY LOCATION :-   ' + voupoint +  '</b>');

    Ext.getCmp('btnheader1').setText( '<b>'  +  company  +  '</b>');
    Ext.getCmp('btnheader2').setText( '<b>'  +  ' Finance Year : ' + yearfin +  '</b>');
  
	/*if (ginuser==72)  
    {
	
	 Ext.getCmp('tranid').setVisible(false);
    }*/


    if (finid < 27 && powerid === 'capitalsoft') {
        Ext.getCmp('tranid').setVisible(true);
    } else if (finid > 26 && powerid === 'capital') {
        Ext.getCmp('tranid').setVisible(true);
    } else if (finid < 27 && powerid === 'capital') {
        Ext.getCmp('tranid').setVisible(false);
    }



  /*  var timevar=200;
    setInterval(function () {
    if(company==1)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Denim & Apparel Fabric'+'---'+yearfin);
    }
    else if(company==4)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Hometextiles'+'---'+yearfin);    
    
    }
    else if(company==10)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : UNIT - KG DENIM (US) INC'+'---'+yearfin);    
    
    } else if(company==8)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : POWER PLANT'+'---'+yearfin);    
    
    }
  else if(company==11)
    {
     Ext.getCmp('btnheader').setText('KG DENIM LIMITED : SRINIVASA AGRO'+'---'+yearfin);    
     Ext.getCmp('sbmmadfabid').setVisible(false);
     Ext.getCmp('sbmmadfabid2').setVisible(false);
     Ext.getCmp('sbmmadwo2').setVisible(false);	
    }
else if (company == 12)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : SIZING UNIT' + '---' + yearfin);
  Ext.getCmp('sbmmadfabid').setVisible(false);
     Ext.getCmp('sbmmadfabid2').setVisible(false);
     Ext.getCmp('sbmmadwo2').setVisible(false);	

        } 
    else{
	  Ext.getCmp('btnheader').setText('Log Again!');
 	  window.location.href=('/SHVPM/Financials/FinancialsLogin.php');
    }
   },timevar);*/
});

