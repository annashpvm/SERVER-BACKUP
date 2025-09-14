Ext.onReady(function(){
    Ext.QuickTips.init();

//var yearfin=localStorage.getItem('accfinyear');

//var yearfin='2020-2021' 
//var compcode = localStorage.getItem('tcompcode');
//var compname = localStorage.getItem('tcompname');
//var fin = localStorage.getItem('tfinid');
var yearfin  = localStorage.getItem('gstyear'); 
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');




   var ginFinid = localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var ginCompcode = localStorage.getItem('gincompcode');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');


   var GinUser = localStorage.getItem('ginusername');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var dngsttype = localStorage.getItem('GSTTYPE');




    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    
    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');


    tbgeneral.add(new Ext.Toolbar.SplitButton({
        id:'masmenu',text: '<b>MASTERS</b>',
        width: 150,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[
            	{
                    text: '<b> GENERAL PURCHASE MASTERS </b>',
                         id   : 'GENPUR',
                         menu:{
                         items:[

    		{
                    text: '<b>ITEM LOCATION MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Stores/General/MasItemLocation/FrmMasItemLocation.php');
                    }
                },

    		{
                    text: '<b>PURCHASE MAIN GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/MasPurchaseGroup/FrmMasPurchaseGroup.php');
                    }
                },

    		{
                    text: '<b>PURCHASE SUB GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/MasPurchaseSubGroup/FrmMasPurchaseGroup.php');
                    }
                },


                {
                    text: '<b>STORES ITEM MASTER </b>',
                    group: 'theme',
                    handler: function(){
//                           window.location.href=('http://10.0.0.251/SHVPM/Stores/General/MasStoresItem/FrmMasPurItem.php');
                           window.location.href=('http://10.0.0.251/SHVPM/Masters/MasStoresItem/FrmMasPurItem.php');

                    }
                },

/*

                {
                    text: '<b>STORES ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                    
                        window.location.href=('/SHVPM/Purchase/General/MasPurItem/FrmMasPurItem.php');
                    }
                },

*/
                {
                    text: '<b>ITEM MASTER SPECIFICATIONS </b>',
                    group: 'theme',
                    handler: function(){
                    
                        window.location.href=('/SHVPM/Purchase/General/MasPurItemSpec/FrmMasPurItemSpec.php');
                    }
                },


                {
                    text: '<b>SERVICE ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/MasServiceItem/FrmMasServiceItem.php');
                    }
                },
                {

                    text: '<b>OTHER SALES ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Stores/General/MasOtherItemMaster/FrmMasOtherItemMaster.php');
                    }
                },

                {
                    text: '<b>WORKORDER MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/MasWorkorder/FrmMasWorkorder.php');
                    }
                },

                {
                    text: '<b>MOTOR MAKE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/MasMotorMake/FrmMasMotorMake.php');
                    }
                },

                {
                    text: '<b>MOTOR ITEM MASTER</b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasMotorItem/FrmMasMotorItem.php');
                    }
                },


                {
                    text: '<b>PURCHASE TAX MASTER  </b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasPurTax/FrmMasPurTax.php');
                    }
                },


    		{
                    text: '<b>STORES OPENING STOCK ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Stores/General/MasOpeningStock/FrmMasOpening.php');
                    }
                },


    		{
                    text: '<b>STORES MINIMUM STOCK ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Stores/General/MasMinimumStock/FrmMinimumStock.php');
                    }
                },



                         ]
                        }       
                }, 

            	{
                    text: '<b> RAW MATERIAL MASTERS </b>',
                         id   : 'RMPUR',
                         menu:{
                         items:[


    		{
                    text: '<b>RAWMATERIAL ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasRawItem/FrmMasRawItem.php');
                    }
                },
    		{
                    text: '<b>RATE / MOISTURE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/MasWPItemRate/FrmMasWPItemRate.php');
                    }
                },


                {
                    text: '<b>WASTE PAPER GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasPaperGroup/FrmMasPaperGroup.php');
                    }
                },

                {
                    text: '<b>WASTE PAPER TAX MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasPaperTax/FrmMasPaperTax.php');
                    }
                },
                {
                    text: '<b>WASTE PAPER OPENING ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/MasOpeningStock/FrmMasOPStock.php');
                    }
                },

                {
                    text: '<b>WASTE PAPER GST Debit Note Exemption Supplier List </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasGSTBillSuppliers/FrmMasGSTBillsSupplier.php');
                    }
                }



                         ]
                        }       
                }, 
            	{
                    text: '<b> FUEL MASTERS </b>',
                         id   : 'FUPUR',
                         menu:{
                         items:[
                {
                    text: '<b>FUEL OPENING ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/MasOpeningStock/FrmMasOPStock.php');
                    }
                },

    		{
                    text: '<b>FUEL PURCHASE GROUP</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/MasPurchaseGroup/FrmMasPurchaseGroup.php');
                    }
                },

    		{
                    text: '<b>FUEL ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/MasFuelItem/FrmMasFuItem.php');
                    }
                },

                {
                    text: '<b>ITEM RATE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/MasItemRate/FrmMasItemRate.php');
                    }
                },
                         ]
                        }       
                },
    		{
                    text: '<b>SUPPLIER MASTER</b>',
                    group: 'theme',
                    
                    handler: function(){
                        window.location.href=('/SHVPM/Masters/CreditorMaster/FrmMasCreditorNew.php');
                    }
                },
    		{
                    text: '<b>SUPPLIER BANK MASTER</b>',
                    group: 'theme',
                    
                    handler: function(){
                        window.location.href=('/SHVPM/Purchase/General/SupBankMaster/FrmMasSupplierBank.php');
                    }
                },
                {
                    text: '<b>AREA MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasArea/FrmMasArea.php');
                    }
                } ,

		    {
		        text: '<b>M/C Sections Master </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/MasSection/massection.php');
		        }
		    },

		    {
		        text: '<b>M/C Equipment Master</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/MasEquipment/equipmaster.php');

		        }
		    },

                {
                    text: '<b>HSN CODE MASTER</b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasHSNCode/FrmMasHSNCode.php');
                    }
                },
                {
                    text: '<b>UNIT MASTER</b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasUnit/FrmUnit.php');
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
                        window.location.href=('http://10.0.0.251/SHVPM/Stores/YearChange/yearChange.php');
                        
                    }
                }, 


		
            ]
        }
     }),
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>GENERAL STORES</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[



		           {
                                text: '<b>GRN ENTRY </b>',
                                group: 'theme',
                                handler: function(){

                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRN.php');
                                }
                            },



		           {
                                text: '<b>GRN RETURN CUM DEBIT NOTE </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRNReturn/FrmTrnGRNReturn.php');
                                }
                            },
/*
		    	  {
		            text: '<b> GRN ENTRY </b>',
		                 menu:{
		                 items:[
		                        {
		                           text: '<b> PAPER MACHINE </b>',
		                           group: 'theme',
		                           handler: function(){
                                                 window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRN.php');
		                                  }
		                        },


		                        {
		                           text: '<b> PAPER MACHINE </b>',
		                           group: 'theme',
		                           handler: function(){
                                                  window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRN.php');
		                                  }
		                        },

		                        {
		                           text: '<b>POWER PLANT</b>',
		                           group: 'theme',
		                           handler: function(){
		                                  localStorage.setItem("STRTYPE",'PSC');     
                                                  window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRN.php');
                                           }  
		                        },
		                     ]
		                  }, 
		           },
		    	  {
		            text: '<b> GRN RETURN - DEBIT NOTE  </b>',
		                 menu:{
		                 items:[
		                        {
		                           text: '<b> PAPER MACHINE </b>',
		                           group: 'theme',
		                           handler: function(){
		                                  localStorage.setItem("STRTYPE",'PSP');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRNReturn/FrmTrnGRNReturn.php');
		                                  }
		                        },

		                        {
		                           text: '<b>POWER PLANT</b>',
		                           group: 'theme',
		                           handler: function(){
		                                  localStorage.setItem("STRTYPE",'PSC');     
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRNReturn/FrmTrnGRNReturn.php');
                                           }  
		                        },

		                        {
		                           text: '<b>ACCOUNTS UPDATE</b>',
		                           group: 'theme',
		                           handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRNReturn/FrmTrnGRNReturnAccounts.php');
                                           }  
		                        },


		                     ]
		                  }, 
		           },
*/
                {
                    text: '<b>Stores -Debit Note</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('/SHVPM/Stores/General/TrnDebitNote/FrmTrnDebitNote.php');
                                }
                            },
                            {
                                text: '<b>Debit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('/SHVPM/Stores/General/TrnDebitNote/FrmTrnDebitNote.php');
                                }
                            },
                      


                        ]
                    }
                },

/*
                            {
                                text: '<b>Stores Debit Note - ACCOUNTS UPDATION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251//SHVPM/Stores/General/TrnDebitNote/FrmTrnDebitNoteAccounts.php');
                                }
                            },

*/
		           {
                                text: '<b>CONSUMPTIONS ENTRY</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnIssue/FrmTrnIssue.php');
                                }
                            },

                            {
                                text: '<b>ISSUE RETURN</b>',
                                group: 'theme',
                                handler: function(){

                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnIssue/FrmTrnIssueReturn.php');
                                }
                            },


                {
                    text: '<b>STOCK ADJUSTMENTS </b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Adjustment (+) </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("ADJTYPE",'AP');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnStockAdjustment/FrmStockAdjustment.php');
                                }
                            },
                            {  
                                text: '<b>Adjustment (-) </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("ADJTYPE",'AM');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnStockAdjustment/FrmStockAdjustment.php');
                                }

                            },
                      


                        ]
                    }
                },



//                            {
//                                text: '<b>STORES-SALES NOTE</b>',
//                                group: 'theme',
//                                handler: function(){
//                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnSalesNote/FrmTrnSalesNote.php');
//                                }
//                            },


            	{
                    text: '<b>FLY ASH / OTHERS-SALES ENTRY</b>',
                         menu:{
                         items:[
                                {
                                   text: '<b>TN SALES </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'TNOS');   
         window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/FrmTrnOtherSales.php');
                                          }
                                },

                                {
                                   text: '<b>IGST SALES</b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'OSOS');     
                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/FrmTrnOtherSales.php');
                                          }
                                },
                                {
                                   text: '<b>INVOICE PRINT </b>',
                                   group: 'theme',
                                   handler: function(){
                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/TrnOtherSalesPrint.php');
                                          }
                                },
                                {
                                   text: '<b>CANCEL </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("GSTTYPE",'CAN');     
                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/FrmTrnOtherSalesCancel.php');
                                          }
                                },
                                {
                                   text: '<b>DELETE TN SALES </b>',
                                   group: 'theme',
                                   handler: function(){
                                             localStorage.setItem("GSTTYPE",'TNOS');    
                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/FrmTrnOtherSalesDelete.php');
                                          }
                                },
                                {
                                   text: '<b>DELETE OS SALES </b>',
                                   group: 'theme',
                                   handler: function(){
                                             localStorage.setItem("GSTTYPE",'OSOS');    
                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnOtherSales/FrmTrnOtherSalesDelete.php');
                                          }
                                },

                             ]
                          }, 
                },

                            {
                                text: '<b>WORKORDER-GRN</b>',
                                group: 'theme',
                                handler: function(){
                                               window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnWoGRN/FrmTrnWoGRN.php'); 
                                     }
                             },
/*
                                menu:{
                                    items:[
                                        {
                                        text: '<b>NON DELIVERY NOTE BASED </b>',
                                        group: 'theme',
                                        handler: function(){
                                                window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnWoGRN/FrmTrnWoGRN.php'); 
                                            }
                                        },
                                        { 
                                        text: '<b>DELIVERY NOTE BASED </b>',
                                        group: 'theme',
                                        handler: function(){
                                                 window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnWoGRNdcbased/FrmTrnWoGRN.php'); 
                                            }
                                        },
                                    ]
				 } 

                            },
*/
                            {
                                text: '<b>DELIVERY CHALLAN / RECEIPT </b>',
                                group: 'theme',
                                menu:{
                                    items:[
                                        {
                                        text: '<b>DELIVERY CHALLAN - RETURNABLE </b>',
                                        group: 'theme',
                                        handler: function(){
                                              localStorage.setItem("DCTYPE",'R');   
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryChallan/FrmDeliveryChallan.php');
                                            }
                                        },
                                        {    
                                        text: '<b>DELIVERY CHALLAN - NON RETURNABLE </b>',
                                        group: 'theme',
                                        handler: function(){
                                              localStorage.setItem("DCTYPE",'N');  
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryChallan/FrmDeliveryChallan.php');
                                            }
                                        },
/*
                                        { 
                                        text: '<b>DELIVERY NOTE - WORK ORDER BASED </b>',
                                        group: 'theme',
                                        handler: function(){
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryNoteWObased/FrmDeliveryNotewobased.php');
                                            }
                                        },
*/


                {
                    text: '<b>RECEIPTS AGAINST DELIVERY CHALLAN</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>BY SUPPLIER </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryChallanReceipt/FrmDeliveryChallanReceipt.php');
                                }
                            },
                            {
                                text: '<b>BY DC</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryChallanReceipt/FrmDeliveryChallanReceipt_byDC.php');
                                }
                            },
                      


                        ]
                    }
                },




                                    ]

                                }
                            },




    		{
                    text: '<b>Ledger Details </b>',
                    group: 'theme',
                    handler: function(){

                        window.location.href=('http://10.0.0.251/SHVPM/Accounts/ViewReport/ViewReportLedgerStores.php');
                        
                    }
                },

//		           {
//                                text: '<b>GRN ENTRY - OLD  </b>',
//                                group: 'theme',
//                                handler: function(){
////                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRN.php');
//                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnGRN/FrmTrnGRNNew.php');
  //                              }
//                            },

/*
                            {
                                text: '<b> OTHER RECEIPT AND ISSUE ENTRY </b>',
                                group: 'theme',
                                menu:{
                                    items:[

                                        {
                                        text: '<b>RECEIPT NOTE </b>',
                                        group: 'theme',
                                        handler: function(){
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnReceiptNote/FrmTrnReceiptNote.php');
                                            }
                                        },
                                        {
                                        text: '<b>ISSUE ENTRY </b>',
                                        group: 'theme',
                                        handler: function(){
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnIssueEntry/FrmTrnIssueEntry.php');
                                            }
                                        },
                                        { 
                                        text: '<b>DELIVERY NOTE - WORK ORDER BASED </b>',
                                        group: 'theme',
                                        handler: function(){
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryNoteWObased/FrmDeliveryNotewobased.php');
                                            }
                                        },
                                        {
                                        text: '<b>RECEIPTS </b>',
                                        group: 'theme',
                                        handler: function(){
                                              window.location.href=('http://10.0.0.251/SHVPM/Stores/General/TrnDeliveryNoteReceipt/FrmDeliveryNoteReceipt.php');
                                            }
                                        },
                                    ]

                                }
                            }
*/
                        ]
                },

     }),
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>GENERAL REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
               {

		        text: '<b>ITEM Ledger</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSItemStockView/RepGSItemStockView.php');
		        }
  
                },

               {

		        text: '<b>GENERAL REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSGeneralReports/RepGSGeneral.php');
		        }
  
                },

               {

		        text: '<b> VOUCHER PRINTING </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSPreprintReports/RepGSPrePrint.php');
		        }
  
                },

		{
			text: '<b>DATE-GRN WISE ARRIVAL DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSDatewiseArrivals/RepViewDateGRNwiseArrivals.php');
			}
		},




               {

                        text: '<b>PARTY WISE GRN DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSPartywiseGRN/RepPartywiseGRN.php');
		        }
  
                },
               {

                        text: '<b>ITEM WISE GRN DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSItemwiseGRN/RepItemwiseGRN.php');
		        }
  
                },
                { 

                        text: '<b>GROUP WISE GRN DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSGroupwiseGRN/RepGroupwiseGRN.php');
		        }
  
                },
                { 

                        text: '<b>STOCK LIST </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSStockView/RepGSStockView.php');
		        }
  
                },
		 { 

                        text: '<b>STOCK SUMMARY </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSStockSummary/FrmGSStockSummary.php');
		        }
  
                },

		 { 

                        text: '<b>SALES DETAILS  </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSSales/FrmGSSales.php');
		        }
  
                },

		 { 

                        text: '<b>DELIVERY CHALLAN DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSReturnable/FrmGSDelvieryChallan.php');
		        }
  
                },

		 { 

                        text: '<b>RETURNABLE PENDING LIST - DEPARTMENTWISE </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSReturnable/GSReturnable.html');
		        }
  
                },
		 { 

                        text: '<b>RETURNABLE PENDING LIST - DATE TWISE </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSReturnable/FrmGSDCReturnable.php');
		        }
  
                },
		 { 

                        text: '<b>RECEIPTS AGAINST DELIVERY NOTES </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSReturnable/FrmGSDelvieryReceipts.php');
		        }
  
                },




                {
                    text: '<b>CONSUMPTION REPORTS </b>',
                    menu:{
                        items:[
                            {
                                text: '<b>DATE WISE CONSUMPTION REPORT</b>',
                                group: 'theme',
                                handler: function(){
                                  window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSConsumption/FrmConsumptionsDatewise.php');
                                }
                            },
                            {
                                text: '<b>DEPARTMENTWISE CONSUMPTIONS </b>',
                                group: 'theme',
                                handler: function(){
                                  window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSConsumption/FrmConsumptionsDepartmentWise.php');
                                }
                            },
                      


                        ]
                    }
                },

                {
                    text: '<b>ALL DEBIT NOTE DETAILS</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/DebitNotes/FrmDebitNotes.php');
                                }
                            },
                            {
                                text: '<b>Debit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/DebitNotes/FrmDebitNotes.php');
                                }
                            },
                      


                        ]
                    }
                },

               {

		        text: '<b>DEPARTMENT WISE INDENT / PO </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurViewDeptwise/RepPurDeptwise.php');
		        }
  
                },

               {

		        text: '<b>PARTY WISE PO DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurViewPartyPO/RepPurPartyPO.php');
		        }
  
                },
               {

		        text: '<b>GROUP WISE PENDING PURCHASE ORDERS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurViewGroupwisePO/RepPurGroupwisePO.php');
		        }
  
                },

               {

		        text: '<b>ITEM WISE PENDING PURCHASE ORDERS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurViewItemwisePO/RepPurItemwisePO.php');
		        }
  
                },

               {

                        text: '<b> GRN PENDING DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/RepGSReports/GSGRNPending/RepGRNPending.php');
		        }
  
                },
/*
               {

		        text: '<b>INDENT STATUS VIEW</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/General/FrmRepIndentStatus/FrmRepIndentStatus.php');
		        }
  
                },
		{
			text: '<b>Daily Arrivals</b>',
			group: 'theme',
			handler: function(){
			window.open('http://10.0.0.251:8080/birt/frameset?__report=GeneralStores/RepRMDailyArrivals.rptdesign' , '_blank');                                    
			//window.location.href=('http://10.0.0.251:8080/birt/frameset?__report=RawMaterial/RepRMDailyArrivals.rptdesign');
			}
		},*/

                        ]
                },

     }),

/*
new Ext.Toolbar.SplitButton({
        id:'btnutilities',text: '<b>UTILITIES</b>',style: 'background-color: DEC5C0;',
        width: 150,
        iconCls: 'bmenu',
        menu:{
            items:[


    		{
                    text: '<b>CHANGE COMPANY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MasGroup/FrmMasGroup.php');
                    }
                },

                {
                    text: '<b>CHANGE FINYEAR</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MasLedger/FrmMasLedger.php');
                    }
                },
	
            ]
        }
     }),	 
*/

new Ext.Toolbar.SplitButton({
        text: '<b>RAWMATERIAL ENTRY </b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[


                {
                    text: '<b>Rawmaterial -Debit Note</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/TrnRMDebitNote/FrmTrnRMDebitNote.php');
                                }
                            },
                            {
                                text: '<b>Debit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/TrnRMDebitNote/FrmTrnRMDebitNote.php');
                                }
                            },
                      


                        ]
                    }
                },
/*

                            {
                                text: '<b>RM Debit Note - ACCOUNTS UPDATION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMDebitNote/FrmTrnRMDebitNoteAccounts.php');
                                }
                            },

*/

	    {
		text: '<b>RM GRN ENTRY - LOCAL </b>',
		group: 'theme',
		handler: function(){
//  		window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMGRNNew/FrmTrnRMGRN.php');
          	window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMGRN/FrmTrnRMGRN.php');

		}
	    },


	    {
		text: '<b>RM GRN ENTRY - IMPORT </b>',
		group: 'theme',
		handler: function(){
			window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMImportGRN/FrmTrnRMImportGRN.php');
		}
	    },
/*
	    {
		text: '<b>RM GRN ENTRY - ACCOUNTS UPDATION </b>',
		group: 'theme',
		handler: function(){
			window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMGRN/FrmTrnRMGRNAccounts.php');

		}
	    },
*/
	    {
		text: '<b>CONSUMPTIONS ENTRY</b>',
		group: 'theme',
		handler: function(){
		    window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnIssue/FrmTrnIssue.php');
		}
	    },


	    {
		text: '<b>ISSUE RETURN</b>',
		group: 'theme',
		handler: function(){
		    window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnIssueReturn/FrmTrnIssueReturn.php');
		}
	    },
/*
	    {
		text: '<b>RM GRN ENTRY - LOCAL - NEW </b>',
		group: 'theme',
		handler: function(){
			window.location.href=('http://10.0.0.251//SHVPM/Stores/RawMaterial/TrnRMGRN/FrmTrnRMGRN.php');
		}
	    },
*/
            ]     
        }
}),

new Ext.Toolbar.SplitButton({
        text: '<b>RAWMATERIAL REPORTS </b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                 {
		        text: '<b>GENERAL REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/RepRMReports/RMGeneralReports/RepRMGeneral.php');
		        }
  
                },

               {

		        text: '<b>VOUCHER PRINTING</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/RepRMReports/RMPreprintReports/RepRMPrePrint.php');
		        }
  
                },

/*
		{
			text: '<b>PARTYWISE PURCHASE ORDER DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewRMPartywisePO.php');
			}
		},
*/

		{
			text: '<b>DATE-GRN WISE ARRIVAL DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewDateGRNwiseArrivals.php');
			}
		},



		{
			text: '<b>MONTHLY ARRIVALS DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewStatements.php');
			}
		},
		{
			text: '<b>ITEMWISE GRN DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewItemwiseArrivals.php');
			}
		},
                {  

			text: '<b>DAYWISE ARRIVALS DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewDatewiseArrivals.php');
			}
		},

		{
			text: '<b>TRUCK WEIGHMENT DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewWeighment.php');
			}
		},
                      
		{
			text: '<b>QC INSPECTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/QC/ViewReports/RepViewRMQCReport.php');
			}
		},

		{
			text: '<b>STOCK DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewStockStatement.php');
			}
		},

		{
			text: '<b>STOCK SUMMARY</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewStockSummary.php');
			}
		},

		{
			text: '<b>DEBIT NOTE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewRMDebitNote.php');
			}
		},


		{
			text: '<b>CONSUMPTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/RawMaterial/ViewReports/RepViewConsumptionDatewise.php');
			}
		},
            ]     
        }
}),


new Ext.Toolbar.SplitButton({
        text: '<b>FUEL ENTRY </b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

                {
                    text: '<b> Fuel -Debit Note</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Debit Note - GST </b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'G');   
                                    window.location.href=('http://10.0.0.251//SHVPM/Stores/Fuel/TrnFuDebitNote/FrmTrnFuDebitNote.php');
                                }
                            },
                            {
                                text: '<b>Debit Note - NON GST</b>',
                                group: 'theme',
                                handler: function(){
                                    localStorage.setItem("GSTTYPE",'N');   
                                    window.location.href=('http://10.0.0.251//SHVPM/Stores/Fuel/TrnFuDebitNote/FrmTrnFuDebitNote.php');
                                }
                            },
                      


                        ]
                    }
                },
/*
                            {
                                text: '<b>Fuel Debit Note - ACCOUNTS UPDATION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251//SHVPM/Stores/Fuel/TrnFuDebitNote/FrmTrnFuDebitNoteAccounts.php');
                                }
                            },



                            {
                                text: '<b>Fuel GRN - Stores Entry </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/TrnFuGRN/FrmTrnFuGRN.php');
                                }
                            },
*/
                            {
                                text: '<b>Fuel GRN Entry </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/TrnFuGRNNew/FrmTrnFuGRN.php');
                                }
                            },



/*
                            {
                                text: '<b>Fuel GRN - Purchase Entry </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/TrnFuGRN/FrmTrnFuGRNPurchase.php');
                                }
                            },

*/
                            {
                                text: '<b>CONSUMPTIONS ENTRY</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/TrnFuIssue/FrmTrnFuIssue.php');
                                }
                            },
                            {
                                text: '<b>ISSUE RETURN</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/TrnFuIssueReturn/FrmTrnFuIssueReturn.php');
                                }
                            },
            ]     
        }
}),

new Ext.Toolbar.SplitButton({
        text: '<b>FUEL REPORTS </b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
               {

		        text: '<b>GENERAL REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/RepFuelReports/FuelGeneralReports/RepFuelGeneral.php');
		        }
  
                },
               {

		        text: '<b>VOUCHER PRINTING</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/RepFuelReports/FuelPreprintReports/RepFuelPrePrint.php');
		        }
  
                },

		{
			text: '<b>DATE-GRN WISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewDateGRNwiseArrivals.php');
			}
		},

		{
			text: '<b>MONTHWISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewStatements.php');
			}
		},

		{
			text: '<b>ITEMWISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewItemwiseArrivals.php');
			}
		},
		{
			text: '<b>DAYWISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewDatewiseArrivals.php');
			}
		},


		{
			text: '<b>STOCK DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewStockStatement.php');
			}
		},

		{
			text: '<b>STOCK SUMMARY</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewStockSummary.php');
			}
		},

		{
			text: '<b>DEBIT NOTE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewFuelDebitNote.php');
			}
		},
		{
			text: '<b>CONSUMPTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Stores/Fuel/ViewReports/RepViewConsumptionDatewise.php');
			}
		},

            ]     
        }
}),

new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',style: 'background-color: DEC5C0;',
        width:150,
        handler: function () {
            window.location.href=('http://10.0.0.251');
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
    );

    
    tb.doLayout();
    tbgeneral.doLayout();
    Ext.getCmp('comp').setText(compname);
    Ext.getCmp('finyear').setText(yearfin);
});


