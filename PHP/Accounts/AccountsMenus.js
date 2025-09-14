Ext.onReady(function(){
    Ext.QuickTips.init();
    var yearfin  = localStorage.getItem('gstyear'); 
    var compcode = localStorage.getItem('gincompcode');
    var compname = localStorage.getItem('gstcompany');
    var fin      = localStorage.getItem('ginfinid');
    var usertype = localStorage.getItem('ginuser');

var map = new Ext.KeyMap(document, [


    {
        key: Ext.EventObject.F1,
        fn: function() {
            window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
        }
    },
    {
        key: Ext.EventObject.F2,
        fn: function() {
            window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashPayment/FrmTrnCashPayment.php');

        }
    },


    {
        key: Ext.EventObject.F8,
        fn: function() {
            window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepViewTrailBalance.html');     
        }
    },
    {
        key: Ext.EventObject.F9,
        fn: function() {
            window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportLedger.php');   
        }
    },

    {
        key: Ext.EventObject.F10,
        fn: function() {
           window.location.href=('http://10.0.0.251/SHVPM/Accounts/YearChange/yearChange.php');
        }
    },
]);

    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(





    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b>GENERAL MASTERS</b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[  
/*
                {
                    text: '<b>Group</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasGroup/FrmMasGroup.php');
                    }
                },
*/
                 {
                    text: '<b>Ledger Parent Group  </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasParentGroup/FrmMasParentGroup.php');
                    }
                },
                 {
                    text: '<b>Ledger SubGroup Level - I  </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasLedgerSubGroupLevel1/FrmMasLedgerSubGroupLevel1.php');
                    }
                },

                 {
                    text: '<b>Ledger SubGroup Level -II  </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasLedgerSubGroupLevel2/FrmMasLedgerSubGroupLevel2.php');
                    }
                },



                {
                    text: '<b>MASTERS</b>',
                    menu:{
                        items:[
	    		{
		            text: '<b>Ledger Master</b>',
		            group: 'theme',
		            handler: function(){
		                window.location.href=('http://10.0.0.251/SHVPM/Accounts/Masters/MasLedger/FrmMasLedger.php');
		                
		            }
		        },   
			{
		            text: '<b>Debtor Master</b>',
		            group: 'theme',
		            handler: function(){
		                window.location.href=('http://10.0.0.251/SHVPM/Masters/DebitorMaster/MasSalesCustomerNew.php');
		 
		                
		            }
		        }, 
			{
		            text: '<b>Creditor Master</b>',
		            group: 'theme',
		            handler: function(){
		                window.location.href=('/SHVPM/Masters/CreditorMaster/FrmMasCreditorNew.php');                        
		            }
                }, 

                      


                        ]
                    }
                },


 

                {
                    text: '<b>Ledger Group Modification</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasLedger/FrmMasLedger1.php');
                    }
                 }, 
                {
                    text: '<b>Report Ledger Merge Group</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasLedgerMergeGroup/FrmMasLedgerMergeGroup.php');
                    }
                 }, 
                {
                    text: '<b> GST INPUT TAX CREDIT - Group Ledgers </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasITCGroup/FrmMasITCGroup.php');
                    }
                 }, 


                {
                    text: '<b>TDS MASTER</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasTDS/FrmMasTDS.php');
                    }
                 }, 


                {
                    text: '<b>TCS - Exemption Customers</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/TCSExemption/frmTCSExemption.php');
                    }
                 }, 

                {
                    text: '<b>Overdue Messageg Exemption List</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/OverdueMsgExemption/frmODMsgExemption.php');
                    }
                 }, 

		{
                    text: '<b>Password Change</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Masters/PasswordChange/frmmaspassword.php');
                    }
                 }, 

    		{
                    text: '<b>SALES CUSTOMER MASTER - HISTORY and LOCK CUSTOMERS </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Masters/DebitorMaster/MasSalesCustomerLog.php');
                        
                    }
                }, 

    		{
                    text: '<b> SO ALLOW FOR MORE THN 90 DAYS DUE </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Masters/Mas90DAYSDUE/FrmMas90DAYS.php');
                        
                    }
                }, 

    		{
                    text: '<b> BLACK LIST CUSTOMER LIST </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Masters/MasBlackListCustomer/FrmMasBlackList.php');
                        
                    }
                }, 


    		{
                    text: '<b> Extra CD Days Allowed </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Masters/MasExtraCDdays/FrmMasExtraCDDays.php');
                        
                    }
                }, 
/*

    		{
                    text: '<b> COLLECTION UPDATION FROM EXCEL</b>',
                    group: 'theme',
                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Collection/import_Collections.php');
                        
                    }
                }, 
    		{
                    text: '<b> CREDIT NOTE UPDATION FROM EXCEL</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_CreditNote.php');
                        
                    }
                }, 
    		{
                    text: '<b> DEBITE NOTE UPDATION FROM EXCEL</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_DebitNote.php');
                        
                    }
                }, 
    		{
                    text: '<b> JOURNAL UPDATION FROM EXCEL</b>',
                    group: 'theme',
                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Collection/import_Journals.php');
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_Journal.php');

                    }
                }, 


    		{
                    text: '<b> COLLECTION UPDATION FROM EXCEL - (Advance Adjustments)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Collection/import_Collections_advance.php');
                        
                    }
                }, 
*/

                 {
                    text: '<b>Mill Truck List </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasMillTruck/FrmMasMillTruck.php');
                    }
                },

                 {
                    text: '<b> TDS Service Type List </b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/Masters/MasTDS_ServiceType/FrmMasTDSSeviceType.php');
                    }
                },


    		{
                    text: '<b> FINANCE YEAR CHANGE </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/YearChange/yearChange.php');
                        
                    }
                }, 


           ]       
        },
         

    }),

    new Ext.Toolbar.SplitButton({
        id:'btnopening',text: '<b>OPENING ENTRY</b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[   
    		{
                    text: '<b>Ledger Opening Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnOpening/TrnLedgerOpening.php');
                        
                    }
                }, 
    		{
                    text: '<b>Closing Stock</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnOpening/TrnClosingStock.php');
                        
                    }
                },
    		{
                    text: '<b>Opening Bills Outstanding Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnOpeningBills/TrnOpeningBills.php');
                        
                    }
                }, 
    		{
                    text: '<b>Ledgerwise Bills OPENING Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnDRbills/TrnDRbills.php');
                        
                    }
                }, 
                {
                    text: '<b>Accounts Correction</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/EditAccounts/FrmEdit.php');
                    }
                 }, 

                {
                    text: '<b>Ledger Correction</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Accounts/EditAccounts/FrmEditLedger.php');
                    }
                 }, 


           ]       
        },
         

    }),
/*
    new Ext.Toolbar.SplitButton({
        id:'btnCBtrans',text: '<b>CASH / BANK ENTRY</b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[  
                {
                    text: '<b>Cash Transactions</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Cash Receipts </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Cash Payments </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashPayment/FrmTrnCashPayment.php');
                                }
                            },

                      


                        ]
                    }
                },
                {
                    text: '<b>Bank Transactions</b>',
                    menu:{
                        items:[

                            {
                                text: '<b>Bank Receipts </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },  
                            {
                                text: '<b>Bank Payments</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankPayment/FrmTrnBankPayment.php');
                                }
                            },
                            {
                                text: '<b>Bank Reconciliation </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankReconciliation/FrmTrnBankReconciliation.php');
                                }
                            },

                        ]
                    }
                },
            ]
        }
    }),     
*/               
    new Ext.Toolbar.SplitButton({
        id:'btntrans',text: '<b>DATA ENTRIES</b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[
                {
                    text: '<b>Cash Transactions</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Cash Receipts </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Cash Payments </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnCashPayment/FrmTrnCashPayment.php');
                                }
                            },

                      


                        ]
                    }
                },
                {
                    text: '<b>Bank Transactions</b>',
                    menu:{
                        items:[

                            {
                                text: '<b>Bank Receipts</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankReceipt/FrmTrnBankReceiptNew.php');
                                }
                            },  

                            {
                                text: '<b>Bank Payments</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankPayment/FrmTrnBankPayment.php');
                                }
                            },
                            {
                                text: '<b>Bank Reconciliation </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankReconciliation/FrmTrnBankReconciliation.php');
                                }
                            },


                            {
                                text: '<b>Bank Receipts - Old Method </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },  
                        ]
                    }
                },   
                {
                    text: '<b>Debit Note</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>SALES - Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'SG');   
                                    window.location.href=('/SHVPM/Accounts/TrnDebitNote/FrmTrnDebitNoteGST.php');
                                }
                            },

                            {
                                text: '<b>PURCHASE - Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('/SHVPM/Accounts/TrnDebitNote/FrmTrnDebitNoteGST.php');
                                }
                            },
                            {
                                text: '<b>PURCHASE - Debit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('/SHVPM/Accounts/TrnDebitNote/FrmTrnDebitNoteGST.php');
                                }
                            },
                            {
                                text: '<b>Debit Note - Sales Invoice</b>',
                                group: 'theme',
                                handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnDebitNoteSales/FrmTrnDebitNote.php');
                                }
                            },
                      


                        ]
                    }
                },
                {
                    text: '<b>Credit Note</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Credit Note - Sales Invoice </b>',
                                group: 'theme',
                                handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnCreditNoteSales/FrmTrnCreditNote.php');
                                }
                            },
                      
                            {
                                text: '<b>Credit Note - Sales Return </b>',
                                group: 'theme',
                                handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnCreditNoteSales/FrmTrnCreditNoteSalesReturn.php');
                                }
                            },

                            {
                                text: '<b>Credit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('/SHVPM/Accounts/TrnCreditNote/FrmTrnCreditNote.php');
                                }
                            },
                            {
                                text: '<b>Credit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('/SHVPM/Accounts/TrnCreditNote/FrmTrnCreditNote.php');
                                }
                            },



			    {
				text: '<b>Sales Vs Purchase Credit Note Entry</b>',
				group: 'theme',
				handler: function(){

				    window.location.href=('/SHVPM/Accounts/TrnCreditNoteSales/FrmTrnCreditNote_Sales_Purchase.php');
				}
			    },

			    {
				text: '<b>Sales Vs Purchase Credit Note - Adjustment Details </b>',
				group: 'theme',
				handler: function(){

				    window.location.href=('/SHVPM/Accounts/TrnCreditNoteSales/FrmTrnCreditNote_Sales_Purchase_View.php');
				}
			    },

                            {
                                text: '<b>Credit Note - New </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('/SHVPM/Accounts/TrnCreditNote/FrmTrnCreditNoteNew.php');
                                }
                            },



                        ]
                    }
                },

       		{
                    text: '<b>Expenses Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnExpenses/FrmTrnExpenses.php');
                        
                    }
                }, 
       		{
                    text: '<b>Journal Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnJournal/FrmTrnJournal.php');
                        
                    }
                },
       		{
                    text: '<b> Ledger Group Balance Transfer - Journal Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnGroupTransferJournal/FrmTrnGrpTransferJournal.php');
                        
                    }
                },

       		{
                    text: '<b> GST ITC - Journal Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnGST_ITC_Journal/FrmTrnGSTITCJournal.php');
                        
                    }
                },

       		{
                    text: '<b>Purchase Accounting Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnPurchaseAccount/FrmTrnPurchaseAccount.php');
                        
                    }
                },
       		{
                    text: '<b>Sales Accounting Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnSalesAccount/FrmTrnSalesAccount.php');
                        
                    }
                },
       		{
                    text: '<b>Provisonal Journal Entry</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/TrnProvisionalJournal/FrmTrnJournalprovision.php');
                        
                    }
                }, 
	        {
			text: '<b>Bill Adjustments</b>',
			group: 'theme',
			handler: function(){
			    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBilladjustment/FrmTrnBilladjustment.php');
			}
	       },

	        {
			text: '<b>Bill Adjustments - Change </b>',
			group: 'theme',
			handler: function(){
			    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBilladjustment/FrmTrnBilladjustmentChange.php');
			}
	       },

	        {
			text: '<b> Debit VS Credit Bill Adjustments  </b>',
			group: 'theme',
			handler: function(){
			    window.location.href=('/SHVPM/Accounts/CashandBank/TrnBilladjustment/FrmTrnBilladjustmentDebit_Credit.php');
			}
	       },

	        {
			text: '<b> Vehicle Expenses  </b>',
			group: 'theme',
			handler: function(){
			    window.location.href=('/SHVPM/Accounts/VehicleMaintenance/TrnVehicleExpenses.php');
			}
	       },

            {
                text: '<b>Test </b>',
                group: 'theme',
                handler: function(){
                    window.location.href=('/SHVPM/Accounts/Test/ViewRep.php');
//                   window.location.href=('/SHVPM/Accounts/CashandBank/TrnBankPayment/FrmTrnBankPaymentNew.php');
                        
                }
            },



           ]       
        },
         

    }),
/*
    new Ext.Toolbar.SplitButton({
        id:'btnupdate',text: '<b> PAYABLE UPDATION </b>',
        width: 140,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[                    
            	{
                    text: '<b>GENERAL STORES - Paper Machine</b>',
                    group: 'theme',
                    handler: function(){
                        localStorage.setItem("GRNTYPE",'P');  
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationStores.php');
                    }
                },
            	{
                    text: '<b>GENERAL STORES - Cogen </b>',
                    group: 'theme',
                    handler: function(){
                        localStorage.setItem("GRNTYPE",'C');  
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationStores.php');
                    }
                },
            	{
                    text: '<b>FUEL </b>',
                    group: 'theme',
                     handler: function(){
                       window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationFuel.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - INDEGINEIOUS</b>',
                    group: 'theme',
                    handler: function(){
                       window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationRM.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - IMPORT - PURCHASE A/C </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationRMImport.php');
                    }
                }, 

            	{
                    text: '<b>WASTE PAPER - IMPORT - CLEAING A/C </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationRMImportClearing.php');
                    }
                }, 


            	{
                    text: '<b>WORK ORDER GRNS</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationWorkGRN.php');
                    }
                }, 
            	{
                    text: '<b>OTHER SALES</b>',
                    group: 'theme',
                    handler: function(){
                              window.location.href=('http://10.0.0.251/SHVPM/Accounts/PayablesUpdation/TrnPayableUpdationOtherSales.php');
                    }
                }, 


             ]}

    }),

new Ext.Toolbar.SplitButton({
        id:'btnsprep',text: '<b> SALES/PURCHASE REPORTS </b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[  

                {
                    text: '<b>SALES</b>',
                    menu:{
                        items:[
            	{
                    text: '<b>SALES STATEMENT - Monthwise </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStatements.php');
                    }
                },

           	{
                    text: '<b>SALES STATEMENT - Party Seletion </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStatementsPartywise.php');
                    }
                },
           	{
                    text: '<b>SALES STATEMENT - Datewise </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStatementsDatewise.php');
                    }
                },
           	{
                    text: '<b>SALES STATEMENT - Qualitywise </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStatementsQualitywise.php');
                    }
                },

           	{
                    text: '<b>SALES RETURN - Datewise </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStatementsReturnDatewise.php');
                    }
                },

           	{
                    text: '<b>STOCK STATEMENT </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewStockStatement.php');
                    }
                },

           	{
                    text: '<b> SO NUMBER LIST </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepViewSONOList.php');
                    }
                },


           	{
                    text: '<b> REPWISE ORDER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewSales/RepREPOrder.php');
                    }
                },

		{
                    text: '<b>SALES INVOICE /PACKING SLIP PRINTING</b>',
                    group: 'theme',
                    handler: function(){
                      window.location.href=('http://10.0.0.251/SHVPM/SALES/FrmRepSalesInvoicePrint/FrmRepSalesInvoicePrint.php');
                    }
                },
  
           	{
                    text: '<b>SALES ORDER PRINTING</b>',
                    group: 'theme',
                    handler: function(){
                         window.location.href=('http://10.0.0.251/SHVPM/SALES/FrmRepSalesSOPrint/FrmRepSalesSOPrint.php');
                    }
                },


               {

		        text: '<b>ORDER STATEMENTS</b>',
		        group: 'theme',
		        handler: function(){
			    
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALOrderReports/RepSALOrder.php');  
		        }
  
                },
             {

		        text: '<b>PRODUCITON STATEMENTS</b>',
		        group: 'theme',
		        handler: function(){
			    
		             window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALProductionReports/RepSALProduction.php');  
		        }
  
                },

               {

		        text: '<b>SALES STATEMENTS</b>',
		        group: 'theme',
		        handler: function(){
			    
		              window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALSalStmtReports/RepSALSalStmt.php');  
		        }
  
                },
		 {

		        text: '<b>SALES QUALITYWISE</b>',
		        group: 'theme',
		        handler: function(){
		           window.location.href=('http://10.0.0.251/SHVPM/SALES/RepQualityStatement/RepQualiStatement.php');  
		        }
  
                },

               {

		        text: '<b>STOCK STATEMENTS</b>',
		        group: 'theme',
		        handler: function(){
			    
		             window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALStockStmtReports/RepSALStockStmt.php'); 
		        }
                },
               {

		        text: '<b>DESPATCH PENDING</b>',
		        group: 'theme',
		        handler: function(){
		          window.location.href=('http://10.0.0.251/SHVPM/SALES/RepDespatchPending/RepDespPending.php'); 
		        }
                },
 		


               {

		        text: '<b>PRODUCTION PLAN</b>',
		        group: 'theme',
		        handler: function(){
			    
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/RepProductoinPlan/RepProductonPlan.php'); 
		        }
                },   


                        ]
                    }
                },
                {
                    text: '<b>PURCHASE</b>',
                    menu:{
                        items:[

                            {
                                text: '<b> RAW MATERIAL </b>',
                       menu:{
                        items:[
                         {
                              text: '<b> GENERAL REPORTS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/StoresMainPage.php');
                                }
                            }, 
                           {
                              text: '<b> VOUCHER PRINTING </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/RawMaterial/RepRMReports/RMPreprintReports/RepRMPrePrint.php');
                                }
                            }, 
                        {
                              text: '<b> MONTHLY PURCHASE DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/RawMaterial/ViewReports/RepViewStatements.php');
                                }
                            },  
                         {
                              text: '<b> ITEMWISE PURCHASE DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/RawMaterial/ViewReports/RepViewItemwiseArrivals.php');
                                }
                            },  
                         

                        ]
                    }

                },
                       {
                          text: '<b> FUEL </b>',
                     menu:{
                        items:[
                         {
                              text: '<b> GENERAL REPORTS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Fuel/RepFuelReports/FuelGeneralReports/RepFuelGeneral.php');
                                }
                            },  
                          {
                              text: '<b> PREPRINTED REPORTS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Fuel/RepFuelReports/FuelPreprintReports/RepFuelPrePrint.php');
                                }
                            },
 {
                              text: '<b> PURCHASE DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                  window.location.href=('/SHVPM/Fuel/ViewReports/RepViewStatements.php');
                                }
                            },

                        ]
                    }
                       },

                       {
                          text: '<b> STORES </b>',
                     menu:{
                        items:[
                         {
                              text: '<b> GENERAL REPORTS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSGeneralReports/RepGSGeneral.php');
                                }
                            },  
                          {
                              text: '<b> VOUCHER PRINTING </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSPreprintReports/RepGSPrePrint.php');
                                }
                            },  
                          {
                              text: '<b> PARTYWISE GRN DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSPartywiseGRN/RepPartywiseGRN.php');
                                }
                            },  
                           {
                               text: '<b> ITEMWISE GRN DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSItemwiseGRN/RepItemwiseGRN.php');
                                }
                            },  
                              {
                              text: '<b> GROUPWISE GRN DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSGroupwiseGRN/RepGroupwiseGRN.php');
                                }
                            },  
                              {
                              text: '<b> STOCK LIST </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Stores/RepGSReports/GSStockView/RepGSStockView.php');
                                }
                            },  
		           { 

			        text: '<b>STOCK SUMMARY </b>',
				group: 'theme',
				handler: function(){
			        window.location.href=('http://10.0.0.251/SHVPM/Stores/RepGSReports/GSStockSummary/FrmGSStockSummary.php');
		        }
  
                },

		 { 

                        text: '<b>SALES DETAILS  </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RepGSReports/GSSales/FrmGSSales.php');
		        }
  
                },




                        ]
                    }
                       },



            ]
        }
},
               {

		        text: '<b>TRUCK WISE DESPATCH DETAILS</b>',
		        group: 'theme',
		        handler: function(){
			    
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewTruckwise.php');
		        }
                }, 
]
}
    }),          


*/

    new Ext.Toolbar.SplitButton({
        id:'btnsales2',text: '<b>SALES/PURCHASES</b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[  

	        {
			text: '<b> Stores GRN Corrections  </b>',
			group: 'theme',
			handler: function(){
			    window.location.href=('/SHVPM/Accounts/StoresGRN/FrmTrnGRN.php');
			}
	       },
    		{
                    text: '<b> SALES </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/SALES/SalesMainPage.php');
                        
                    }
                }, 
    		{
                    text: '<b> PURCHASES </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Stores/StoresMainPage.php');
                        
                    }
                }, 

               {

		        text: '<b>TRUCK WISE DESPATCH DETAILS</b>',
		        group: 'theme',
		        handler: function(){
			    
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewTruckwise.php');
		        }
                }, 
 
               {

		        text: '<b>AREA PRICE - VERIFICATION</b>',
		        group: 'theme',
                        id : 'areaprice',  
		        handler: function(){
			    
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/AreaPrice/FrmAreaPrice.php');
		        }
                }, 

               {

		        text: '<b>CUSTOMER PRICE - VERIFICATION</b>',
		        group: 'theme',
		        handler: function(){
			    
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/AreaPrice/FrmCustomerPrice.php');
		        }
                }, 



         ]
     }
 }),


    new Ext.Toolbar.SplitButton({
        id:'btnreps',text: '<b>ACCOUNTS REPORTS </b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[  
    		{
                    text: '<b> Day Book </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportDayBook.php');
                        
                    }
                }, 

/*
    		{
                    text: '<b> Groupwise Outstanding </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportGroupOutstanding.php');
                        
                    }
                }, 

*/
    		{
                    text: '<b>Sales Register </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportSalesRegister.php');
                        
                    }
                }, 
    		{
                    text: '<b>Purchase Register </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportPurchaseRegister.php');
                        
                    }
                }, 
    		{
                    text: '<b>Cash Book Register </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportCashBook.php');
                        
                    }
                }, 
    		{
                    text: '<b>Bank Book Register </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportBankBook.php');
                        
                    }
                }, 

    		{
                    text: '<b>Receipt and Adjustment Details </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewBankReceipt_Adjustments.html');
                        
                    }
                }, 

    		{
                    text: '<b>Ledger Details </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportLedger.php');
                        
                    }
                }, 
    		{
                    text: '<b>Ledger Details - (REPORT GROUP) </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportLedgerReportGroup.php');
                        
                    }
                }, 

    		{
                    text: '<b>Voucher Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepVouRegister/FrmRepRegister.php');
                        
                    }
                }, 
       		{
                    text: '<b>Voucher List</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportVoucherList.php');
                        
                    }
                }, 
    		{
                    text: '<b>VOUCHER ENTRY / MODIFICATION LOGS</b>',
                    group: 'theme',
                         menu:{
                         items:[

		       		{
				    text: '<b>Voucher Entry History</b>',
				    group: 'theme',
				    handler: function(){
				        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportVoucherHistory.php');
				        
				    }
				}, 


		       		{
				    text: '<b>Voucher Entry History - Departmentwise</b>',
				    group: 'theme',
				    handler: function(){
				        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportVoucherHistoryDeptWise.php');
				        
				    }
				}, 


		       		{
				    text: '<b>Voucher Modifications History</b>',
				    group: 'theme',
				    handler: function(){
				        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportVoucherModificationsHistory.php');
				        
				    }
				}, 

                          ]
                         }
                },

/*

    		{
                    text: '<b>Ledger Book</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepLedgerBook/FrmRepLedgerBook.php');
                        
                    }
                }, 

    		{
                    text: '<b>CASH BOOK </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepCashbook/FrmRepCashbook.php');
                        
                    }
                }, 

    		{
                    text: '<b>BANK BOOK </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepBankbook/FrmRepBankbook.php');
                        
                    }
                }, 
*/

    		{
                    text: '<b>Accounts Receivable Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[

                                {
                                   text: '<b> Partys Outstanding </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_Partywise.php');
    
                                          }
                                },
                                {
                                   text: '<b> Repwise- Receviables Outstanding</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_Repwise.php');
    
                                          }
                                },
/*
                                {
                                   text: '<b> AR REGISTER </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepReceivables/RepARRegister/ARReports.php');
    
                                          }
                                },
*/

                             ]
                          }, 

                }, 
//annadurai2211
    		{
                    text: '<b>AR - Collection Target & Collections </b>',
                    group: 'theme',
                         menu:{
                         items:[

    		{
                    text: '<b> Long Pending Due Customer List </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Masters/MasLongPending/FrmMasLongPending.php');
                        
                    }
                }, 

                                {
                                   text: '<b> Repwise- OverDue - Target</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_RepwiseTarget.php');
    
                                          }
                                },

                             ]
                          }, 

                }, 
    		{
                    text: '<b>Accounts Payable Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[
                                {
                                   text: '<b> Groupwise- Payables Outstanding</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAP_Groupwise.php');
    
                                          }
                                },
                                {
                                   text: '<b> Supplierwise Outstanding </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAP_Supplierwise.php');
    
                                          }
                                },

                                {
                                   text: '<b> Groupwise- Payment</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportGroupwise_Payment.php');
    
                                          }
                                },

                                {
                                   text: '<b> AP REGISTER </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepPayable/RepPayables/APReports.php');
    

                                          }
                                },

                             ]
                          }, 
                },


    		{
                    text: '<b>Collection Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[
  
                                {
                                   text: '<b> Repwise- Collections </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportCollection_Repwise.php');
    
                                          }
                                },
                                {
                                   text: '<b> Customerwise- Collections </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportCollection_Custwise.php');
    
                                          }
                                },
/*
                                {
                                   text: '<b> Partys Payment Performance </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepReceivables/RepPaymentPerformance/PaymentPerformance.php');
    
                                          }
                                },
*/


                             ]
                          }, 

                },  

    		{
                    text: '<b>GSTR -1 Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[
                                {
                                   text: '<b> GSTR-1 </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewGSTR1.php');
    

                                          }
                                },
                                {
                                   text: '<b> GSTR-1 - LedgerWise Abstract </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewGSTR1LedgerWise.php');
    

                                          }
                                },
                                {
                                   text: '<b> HSN wise Sales - Abstract</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewHSNSalesAbstract.php');
                                          }
                                },
                                {
                                   text: '<b> HSN wise Sales - Detailed </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewHSNSales.php');
                                          }
                                },
                                {
                                   text: '<b> Document Summary Sales</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewDocumentSummary.php');
                                          }
                                },
                                {
                                   text: '<b> GSTR-1 - Normal Sales Details </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepGSTR_1Detailed.php');
    

                                          }
                                },
                                {
                                   text: '<b> GSTR-1 </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/FrmGSTR_1.php');
    

                                          }
                                },

                                {
                                   text: '<b> GSTR-2 </b>',
                                   group: 'theme',
                                   handler: function(){
                 window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/FrmGSTR_2.php');
                                          }
                                },
                             ]
                          }, 
                }, 


    		{
                    text: '<b>GSTR -2 Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[



                                {
                                   text: '<b> UPLOAD GST CSV FILE </b>',
                                   group: 'theme',
                                   handler: function(){
            window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/upload.php');
  //        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/gstr2bupload.html');
                                    }  
                                },


                                {
                                   text: '<b> GSTR- 2 B </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepGST/RepViewGSTR2.php');
                                    } , 

                                },

                             ]
                          }, 
                }, 
    		{
                    text: '<b>TDS Reports</b>',
                    group: 'theme',
                         menu:{
                         items:[
                                {
                                   text: '<b> Date wise </b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepTDS/RepViewTDSDatewise.php');
                                          }
                                },
                                {
                                   text: '<b> TDS Secton Wise</b>',
                                   group: 'theme',
                                   handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepTDS/RepViewTDSSectionwise.php');
                                          }
                                },

                             ]
                          }, 
                }, 
    		{
                    text: '<b>Amount Received & Adjustment Pending </b>',
                    group: 'theme',
                    handler: function(){
                        localStorage.setItem("voutype",'BKR'); 
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportBRAdjPending.php');
                        
                    }
                }, 
    		{
                    text: '<b>Amount Paid & Adjustment Pending </b>',
                    group: 'theme',
                    handler: function(){
                        localStorage.setItem("voutype",'BKP'); 
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportBRAdjPending.php');
                        
                    }
                }, 

               {

		        text: '<b>STATISTICS</b>',
		        group: 'theme',
		        handler: function(){
			    
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/Statistics/FrmStatistics.php');
		        }
                }, 


    		{
                    text: '<b> Bill Adjustment Details </b>',
                    group: 'theme',
                         menu:{
                         items:[

		       		{
				    text: '<b>Check Document</b>',
				    group: 'theme',
				    handler: function(){
				        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepBillAdjustment/FrmBillAdjustmentDocument.php');
				        
				    }
				}, 


		       		{
				    text: '<b>Partywise</b>',
				    group: 'theme',
				    handler: function(){
				        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepBillAdjustment/FrmBillAdjustmentPartywise.php');
				        
				    }
				}, 




                          ]
                         }
                },
/*
    		{
                    text: '<b>Collection Report - Import from Tally </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepTallyCollections/FrmRepRegister.php');
                        
                    }
                },  
*/
          ]       
        },
         

    }),

    new Ext.Toolbar.SplitButton({
        id:'btnreps2',text: '<b> FINANCE REPORTS </b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[   

    		{
                    text: '<b>Trial Balance - View </b>',
                    group: 'theme',
                    handler: function(){
                 //       window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportTrailBalance.php');  

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepViewTrailBalance.html');                
                    }
                }, 

    		{
                    text: '<b>Profit & Loss - View </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepProfitLoss.html');
                        
                    }
                }, 

    		{
                    text: '<b>Balance Sheet - View </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepBalanceSheet.html');
                        
                    }
                }, 


    		{
                    text: '<b>Trial Balance</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepTrialBalance/FrmRepTrialBalance.php');
                        
                    }
                }, 
                {
                    text: '<b>Profit & Loss  </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepProfitandLoss/FrmRepProfitandLoss.php');
                        
                    }
                }, 

    		{


                    text: '<b>Balance Sheet</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/RepFinance/RepBalanceSheet/FrmRepBalanceSheet.php');
                        
                    }
                }, 
    
           ]       
        },
         

    }),

    new Ext.Toolbar.SplitButton({
        id:'btnsms',text: '<b> OVER DUE SMS / MAIL </b>',
        width: 130,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[   

    		{
                    text: '<b>Over Due Message / Email </b>',
                    group: 'theme',
                    handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_Repwise_SMS.php');
                    
                    }
                }, 

    		{
                    text: '<b>Over Due Message to REP  </b>',
                    group: 'theme',
                    handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_Rep_Overdue_SMS.php');
                    
                    }
                }, 

    
           ]       
        },
         

    }),
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'finyear', style: 'background-color: #F1F5EA',
                width: 130
            }),
			
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'comp', style: 'background-color: #F1F5EA',
                width: 130,
		
            }),
 )
 


    tbgeneral.doLayout();
    Ext.getCmp('comp').setText(compname);
    Ext.getCmp('finyear').setText(yearfin);
    Ext.getCmp('areaprice').setDisabled(true); 
});
