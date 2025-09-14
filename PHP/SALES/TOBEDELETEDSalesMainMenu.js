Ext.onReady(function(){
    Ext.QuickTips.init();
  //  var tb = new Ext.Toolbar();
//    tb.render('toolbar');


var yearfin  = localStorage.getItem('gstyear'); 
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');
    
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');
var UserLogin= localStorage.getItem('ginuserlogin');





    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(



    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b> GENERAL MASTERS</b>',
        width: 150,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[   
    		{
                    text: '<b>SALES CUSTOMER MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Masters/DebitorMaster/MasSalesCustomer.php');
                        
                    }
                }, 
                { 
                    text: '<b>SALES CUSTOMER MASTER - New </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Masters/DebitorMaster/MasSalesCustomerNew.php');
                        
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
                    text: '<b> CUSTOMER PAYMENT TERMS / GRACE DAYS ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasPaymentTerms/FrmMasPaymentTerms.php');
                        
                    }
                }, 




    		{
                    text: '<b>PACKING - SIDE EDGE PROTECTOR CUSTOMER LIST</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSideEdgeProtector/frmSideEdgeProtector.php');
                        
                    }
                },   
    		{
                    text: '<b>CUSTOMER STANDARD DELIVERY ADDRESS </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MassalDelieryAddress/MasSalesDeliveryAddress.php');
                        
                    }
                },     
    		{
                    text: '<b>DEALER MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasDealer/FrmMasDealer.php');
                        
                    }
                },     
    		{
                    text: '<b>REPRESENTATIVE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasRepresentative/FrmMasRepresentative.php');
                        
                    }
                },     

            	{
                    text: '<b>TAX MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasTax/FrmMasTax.php');
                    }
                },                
            	{
                    text: '<b>PRODUCT TYPE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasProductType/FrmMasProdType.php');
                    }
                },
            	{
                    text: '<b>VARIETY - GSM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasBFGSM/FrmMasBFGSM.php');
                    }
                },
            	{
                    text: '<b>SHADE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasShade/FrmMasShade.php');
                    }
                },
               	{
                    text: '<b>SIZE MASTER </b>',
                    group: 'theme',
                     handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSize/FrmMasSize.php');
                    }
                },

               	{
                    text: '<b>AREA MASTER </b>',
                    group: 'theme',
                     handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasAreaGroup/FrmMasAreaGroup.php');
                    }
                },


	{
                    text: '<b>Reel Close </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/SALES/EXCEL/export_to_Excel.php');
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReelClose/TrnSalesReelClose.php');
                    }
                },

               	{
                    text: '<b>Reel Release </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/SALES/EXCEL/export_to_Excel.php');
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReelRelease/TrnSalesReelRelease.php');
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
                    text: '<b> FINANCE YEAR CHANGE </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/YearChange/yearChange.php');
                        
                    }
                }, 

              	
               /*
            	{
                    text: '<b>BANK DETAILS MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasBankDetails/FrmMasBankDetails.php');
                    }
                },
*/


             ]}

    }),






   new Ext.Toolbar.SplitButton({
        text: '<b>OTHER MASTERS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
/*
            	{
                    text: '<b>AEEAWISE PRICE MASTER ENTRY </b>',
                         id   : 'inv',
                         menu:{
                         items:[
                                {
                                   text: '<b>KRAFT / OTHERS </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("PRICETYPE",'K');   
   window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesAreaPrice_Kraft.php');
                                          }
                                },

                                {
                                   text: '<b>PAPER BAG</b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("PRICETYPE",'P');   
   window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesAreaPrice_PaperBag.php');
                                          }
                                },
                             ]
                          }, 
                },

*/
            	{
                    text: '<b>AEEAWISE PRICE MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesAreaPrice.php');
                    }
                },
            	{
                    text: '<b>CUSTOMERWISE PRICE MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesRate.php');
                    }
                },
            	{
                    text: '<b>REEL LOCATION ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnReelLocation/FrmReelLocation.php');
                    }
                },
            	{
                    text: '<b>CUSTOMERWISE PRICE MASTER - VIEW </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesRateView.php');
                    }
                },
       ]}
   }),



   new Ext.Toolbar.SplitButton({
        text: '<b>TRANSACTIONS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
       menu:{
            items:[
/*
            	{
                    text: '<b>DESPATCH TARGET ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesDespTarget/TrnSalesDespatchTarget.php');
                    }
                },
*/
            	{
                    text: '<b>MONTH WISE DESPATCH TARGET ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesMonthTarget/TrnSalesMonthTarget.php');
                    }
                },
            	{
                    text: '<b>FINISHED GOODS ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesFinishedGoodsEntry/TrnSalesFinishedGoods.php');
                    }
                },
            	{
                    text: '<b>SALES ORDER ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                         localStorage.setItem("SOTYPE",'F');  
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesOrder/TrnSalesOrder.php');
                    }
                },

            	{
                    text: '<b>DESPATCH PLAN ENTRY/PRINT</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesDespatchAdvice/TrnSalesDespatchAdvice.php');
                    }
                },
/*
            	{
                    text: '<b>PACKING SLIP PREPARATION</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesPackslipPrepare/TrnSalesPackslipPrepare.php');
	                    }
                },


            	{
                    text: '<b>PACKING SLIP DOWNLOAD</b>',
                    group: 'theme',
                    handler: function(){
      //                  window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesPackingSlipDownload/TrnSalesPackSlipDownload.php');
	                    }
                },


*/
            	{
                    text: '<b>PACKING SLIP ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                       window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesPackingSlip/TrnSalesPackSlip.php');
	                    }
                },
/*

            	{
                    text: '<b>SALES INVOICE ENTRY </b>',
                         menu:{
                         items:[
                                {
                                   text: '<b>TN SALES </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'TN');   
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoice/TrnSalesInvoice.php');
                                          }
                                },

                                {
                                   text: '<b>IGST SALES</b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'OS');     
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoice/TrnSalesInvoice.php');
                                          }
                                },
                             ]
                          }, 
                },

*/
            	{
                    text: '<b>SALES INVOICE ENTRY </b>',
                         id   : 'inv',
                         menu:{
                         items:[
                                {
                                   text: '<b>TN SALES </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'TN');   
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoice/TrnSalesInvoice.php');
                                          }
                                },

                                {
                                   text: '<b>IGST SALES</b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'OS');     
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoice/TrnSalesInvoice.php');
                                          }
                                },
                                {
                                   text: '<b>SEZ SALES</b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'SEZ');     
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoice/TrnSalesInvoice.php');
                                          }
                                },
                             ]
                          }, 
                },
            	{
                    text: '<b>PRODUCTION PLAN </b>',
                    group: 'theme',
                    handler: function(){
                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesProductionPlan/TrnSalesProdPlan.php');
                      }
                 },
               	{
                    text: '<b>PRODUCTION PLAN AMENDMENT </b>',
                    group: 'theme',
                    handler: function(){
                         window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesPPAmendment/TrnSalesPPAmend.php');
                    }
                 },
            	{
                    text: '<b>STOCK - CUSTOMER / GODOWN TRANSFER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesStockTransfer/TrnSalesStockTransfer.php');
	                    }
                },

            	{
                    text: '<b>STOCK - BF / GSM CHANGE  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesStockTransfer/TrnSalesStockTransferBF.php');
	                    }
                },



/*
             	{
                    text: '<b>REEL VARIETY CHANGE</b>',
                    group: 'theme',
                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReelVarietyChange/TrnSalesReelVarietyChange.php');
                      window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReelVarietyChange/TrnSalesReelVarietyChange.php');
	                    }
                },
*/
            	{
                    text: '<b>REEL WEIGHT / SO / SIZE CHANGE </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReelWeightChange/TrnSalesReelWeightChange.php');
	                    }
                }, 

            	{
                    text: '<b>SALVAGE ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesSalvage/TrnSalesReelSalvage.php');
	                    }
                }, 

            	{
                    text: '<b>REPULP ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesRepulpStockEntry/TrnSalesRepulpStockEntry.php');
	                    }
                }, 
        	{
                    text: '<b>SALES RETURN ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesReturn/TrnSalesReturn.php');
	                    }
                },

            	{
                    text: '<b>SHEET CONVERSION ENTRY </b>',
                         menu:{
                         items:[
                                {
                                   text: '<b>DELIVERY CHALLAN </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'TN');   
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesDeliveryChallan/TrnSalesDeliveryChallan.php');
                                          }
                                },

                                {
                                   text: '<b> BUNDLE RECEIPT </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'OS');     
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesBundleReceipt/TrnSalesBundleReceipt.php');
                                          }
                                },

                                {
                                   text: '<b> REEL RECEIPT </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'OS');     
                                          window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesBundleReceipt/TrnSalesReelReceipt.php');
                                          }
                                },
                             ]
                          }, 
                },
//            	{
//                    text: '<b>SAMPLE / OTHER PURPOSE DELIVERY NOTE ENTRY </b>',
//                    group: 'theme',
//                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesSample/TrnSalesSampleEntry.php');
//	                   }
//                }, 

//            	{
//                    text: '<b>INVOICE RATE MODIFICATIONS</b>',
//                    group: 'theme',
//                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoiceModify/TrnSalesInvoiceModify.php');
//                  }
//                },
           	{


                    text: '<b>INVOICE CANCEL </b>',
                    group: 'theme',
                    handler: function(){
                           window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoiceCancel/TrnSalesInvoiceCancel.php');
	                    }

                },

           	{


                    text: '<b>INVOICE DELETE </b>',
                    group: 'theme',
                    handler: function(){
                           window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesInvoiceDelete/TrnSalesInvoiceDelete.php');
	                    }

                },  


            	{
                    text: '<b>PROFORMA INVOICE ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesProformaInvoice/TrnSalesProformaInvoice.php');
	                    }
                },

/*
            	{
                    text: '<b>WAREHOUSE STOCK MOVE TO WIP</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesStockmovetowip/TrnSalesStockmovetowip.php');
	                    }
                },



            	{
                    text: '<b>GATE PASS</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesGatePass/TrnSalesGatePass.php');
	                    }
                },








           	{
                    text: '<b>TRACE REEL/BUNDLE </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnSalesTrace/TrnSalesTrace.php');
	                    }
                },



*/
       ]}
   
}),
   new Ext.Toolbar.SplitButton({
        text: '<b> REPORTS - 1</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{

            items:[
                {
                        text: '<b>Reel Trace in the Finished Stock</b>',
                        group: 'theme',
                        handler: function(){
                           window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnReelTraceFinStk/TrnReelTraceFinStk.php');
                        }
                },
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
                    text: '<b> VIEW GROUPwise customer List </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/ViewGroup/RepView.php');
                    }
                },


                {
                   text: '<b> Repwise- Receviables Outstanding</b>',
                   group: 'theme',
                   handler: function(){
   window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportAR_Repwise.php');

                          }
                },

            ] 
        }
  }),   

   new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS - 2 </b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{

            items:[
 
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

		        text: '<b>ORDER / PRODUCTION Pending STATEMENTS</b>',
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

/*
		
               {

		        text: '<b>GST REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALGeneralReports/RepSALGeneral.php');
		        }
  
                },
		
		
               {

		        text: '<b>QRCODE</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/QRCODE/QRCODE.php');
//                            window.location.href=('http://10.0.0.251/SHVPM/SALES/phpqrcode/phpqrcode.php');
		        }
  
                },

*/

       ]}
   }),	


   new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
        handler: function () {
            window.location.href=('http://www.google.com');
        }

   }),

 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'finyear', style: 'background-color: #F1F5EA',
                width: 150
            }),
			
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'comp', style: 'background-color: #F1F5EA',
                width: 150,
		
            }),



)
   
//    tb.doLayout();
    tbgeneral.doLayout();



        if (UserLogin == 'annait' || UserLogin == 'vinothini' || UserLogin == 'suganyasal' || UserLogin == 'jeyasal' || UserLogin == 'bsection'   )
        { 
            Ext.getCmp('so2').setVisible(true);
            Ext.getCmp('dc').setVisible(true);
        }
        else   
        { 
            Ext.getCmp('so2').setVisible(false);
            Ext.getCmp('dc').setVisible(false);
        }

        if (UserLogin == 'bsection')
            Ext.getCmp('inv').setVisible(false);


	Ext.getCmp('comp').setText(compname);
	Ext.getCmp('finyear').setText(yearfin);


});
