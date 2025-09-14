Ext.onReady(function(){
    Ext.QuickTips.init();

/* 
//var yearfin=localStorage.getItem('accfinyear');
var compcode = localStorage.getItem('tcompcode');
var compname = localStorage.getItem('tcompname');
var fin = localStorage.getItem('tfinid');
*/

var yearfin  = localStorage.getItem('gstyear'); 
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');

var induser      = localStorage.getItem('indusr');

    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    var txtpass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtpass',
        name        : 'txtpass',
        inputType: 'password',
        width       :  150,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
    });    
    
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
                    text: '<b>ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                    
//                        window.location.href=('/SHVPM/Purchase/General/MasPurItem/FrmMasPurItem.php');
                        window.location.href=('http://10.0.0.251/SHVPM/Masters/MasStoresItem/FrmMasPurItem.php');

                    }
                },

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
                    text: '<b>PURCHASE TAX MASTER - new </b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasPurGrpGST/FrmMasPurGrpGST.php');
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
/*
    		{
                    text: '<b>ITEM RATE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasItemRate/FrmMasItemRate.php');
                    }
                },
*/

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
                    text: '<b>WASTE PAPER GST BILL SUPPLIER LIST </b>',
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
                        window.location.href=('/SHVPM/Masters/CreditorMaster/FrmMasCreditor.php');
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
                    text: '<b>AREA GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasAreaGroup/FrmMasAreaGroup.php');
                    }
                } ,
                {
                    text: '<b>AREA REPORT GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasAreaGroup/FrmMasAreaReportGroup.php');
                    }
                } ,


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
		
            ]
        }
     }),
	 
	
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>GENERAL PURCHASE </b>',
        width: 150, id:'trnmenu',
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

                            {
                                text: '<b>PURCHASE INDENT</b>',
                                group: 'theme',
                                id:'prcind2',
                                handler: function(){
                                    localStorage.setItem("indtype",'P');   
                                    window.location.href=('/SHVPM/Purchase/General/TrnIndent/FrmTrnIndent.php');
                                }
                            },

                            {
                                text: '<b>INDENT AUTHORISATION</b>',
                                group: 'theme',
                                id:'Authind',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnIndentAuthorisation/FrmTrnIndAuthorisation.php');
                                }
                            },
                            {
                                text: '<b>PURCHASE ORDER</b>',
                                group: 'theme',
                                id:'purpo',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnPurchaseOrder/FrmTrnPopreparation.php');
                                }
                            },
                            {
                                text: '<b>PURCHASE ORDER - AMENDMENT </b>',
                                group: 'theme',
                                id:'pupoamd',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnPurchaseOrderAmendment/FrmTrnPoAmendment.php');
                                }
                            },

/*			
	 {
                                text: '<b>ISSUE/ISSUE RETURN</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnIssue/FrmTrnIssue.php');
                                }
                            },
                            {
                                text: '<b>STORES-SALES NOTE</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnSalesNote/FrmTrnSalesNote.php');
                                }
                            },
                            {
                                text: '<b>OTHERS-SALES NOTE</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnSalesNote/FrmTrnSalesNote.php');
                                }
                            },*/
                            {
                                text: '<b>WORKORDER</b>',
                                group: 'theme',
                                id:'purwo',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnWorkorder/TrnWorkorder.php');
                                }
                            },
		    		{
				    text: '<b>FUNDS REQUESTION ENTRY</b>',
				    group: 'theme',
				    
				    handler: function(){
				        window.location.href=('/SHVPM/Purchase/General/TrnFundsRequest/FrmFundsRequest.php');
				    }
				},
		    		{
				    text: '<b>PURCHASE ENTRY</b>',
				    group: 'theme',
				    
				    handler: function(){
                                     window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/TrnPurchaseEntry/FrmTrnGRN.php');
				    }
				},

                {
                    text: '<b>FUNDS PLANNING</b>',
                    menu:{
                        items:[
                            {
                                text: '<b> FUNDS - PLAN </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnFundsPlan/FrmFundsPlanning.php');
                                }
                            },
                            {
                                text: '<b>FUNDS - PAID</b>',
                                group: 'theme',
                                handler: function(){
 
                                    window.location.href=('/SHVPM/Purchase/General/TrnFundsPlan/FrmFundsPaid.php');
                                }
                            },
                      


                        ]
                    }
                },


/*
		    		{
				    text: '<b>PURCHASE ENTRY</b>',
		                 menu:{
		                 items:[
		                        {
		                           text: '<b> PAPER MACHINE </b>',
		                           group: 'theme',
		                           handler: function(){
		                                  localStorage.setItem("STRTYPE",'PSP');   
                                                  window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/TrnPurchaseEntry/FrmTrnGRN.php');
		                                  }
		                        },

		                        {
		                           text: '<b>POWER PLANT</b>',
		                           group: 'theme',
		                           handler: function(){
		                                  localStorage.setItem("STRTYPE",'PSC');     
                                                  window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/TrnPurchaseEntry/FrmTrnGRN.php');
                                           }  
		                        },
		                     ]
		                  }, 
				},

			  {
                                text: '<b>WORKORDER-GRN</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnWoGRN/FrmTrnWoGRN.php');
                                }
                            },
			  /*  {
                                text: '<b>WORKORDER-LUMPSUM</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnWoLumpsum/FrmTrnWoLumpsum.php');
                                }
                            },
			    {
                                text: '<b>WORKORDER-ITEM & LABOUR</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnWoItemLabour/FrmTrnWoItemLabour.php');
                                }
                            },
                            {
                                text: '<b>TRANSPORT CLEARANCE</b>',
                                group: 'theme',
                                id:'purtrans',
                                handler: function(){
                                    window.location.href=('/SHVPM/Purchase/General/TrnTransportClearance/FrmTrnTransportClearance.php');
                                }
                            } */
                        ]
                },

     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>GENERAL REPORTS</b>',
        width: 150, id:'rptmenu',
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
               {

		        text: '<b>GENERAL REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurGeneralReports/RepPurGeneral.php');
		        }
  
                },
               {

		        text: '<b>VOUCHER PRINTING</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurPreprintReports/RepPurPrePrint.php');
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

		        text: '<b>DATE WISE PO & RECEIPT DETAILS </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurViewDatewisePO/RepPurDatewisePO.php');
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

            ]
        }
     }),
/*
new Ext.Toolbar.SplitButton({
        id:'btnutilities',text: '<b>UTILITIES</b>',style: 'background-color: DEC5C0;',
        width: 150,
        iconCls: 'bbasemenu',
        menu:{
            items:[


    		{
                    text: '<b>CHANGE COMPANY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/UserLogin.php');
                    }
                },

                {
                    text: '<b>CHANGE FINYEAR</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/UserLogin.php');
                    }
                },
	
            ]
        }
     }),	 
*/
new Ext.Toolbar.SplitButton({
        text: '<b>RAWMATERIAL</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                            {
                                text: '<b>PURCHASE ORDER</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/TrnRMPurchaseOrder/FrmTrnPopreparation.php');
                                }
                            },
                            {
                                text: '<b>ORDER AMENDMENT</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/TrnRMPurchaseOrder/FrmTrnOrderAmendment.php');
                                }
                            },

                            {
                                text: '<b>PURCHASE ENTRY</b>',
                                group: 'theme',
                                handler: function(){
     //                               window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/TrnRMPurchaseEntry/FrmTrnRMGRNAccounts.php');
                                }
                            },

            ]
        }
}),
new Ext.Toolbar.SplitButton({
        text: '<b>RAWMATERIAL REPORTS</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

               {

		        text: '<b>VOUCHER PRINTING</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/RepRMReports/RMPreprintReports/RepRMPrePrint.php');
		        }
  
                },

		{
			text: '<b>PARTYWISE PURCHASE ORDER DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewRMPartywisePO.php');
			}
		},

		{
			text: '<b>MONTHLY ARRIVALS DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewStatements.php');
			}
		},
		{
			text: '<b>ITEMWISE GRN DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewItemwiseArrivals.php');
			}
		},
		{
			text: '<b>TRUCK WEIGHMENT DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewWeighment.php');
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
			text: '<b>DEBIT NOTE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/ViewReports/RepViewRMDebitNote.php');
			}
		},


            ]
        }
}),
new Ext.Toolbar.SplitButton({
        text: '<b>FUEL</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                          {
                                text: '<b>PURCHASE ORDER</b>',
                                group: 'theme',
                                handler: function(){

                                    window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuPurchaseOrder/FrmTrnFuPopreparation.php');
                                }
                            },
                            {
                                text: '<b>ORDER AMENDMENT</b>',
                                group: 'theme',
                                handler: function(){
//                                    window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuOrderAmendment/FrmTrnFuOrderAmendment.php');
                                   window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuPurchaseOrder/FrmTrnFuPoAmendment.php');
                                }
                            },
                              {
                                text: '<b>PURCHASE ENTRY</b>',
                                group: 'theme',
                                handler: function(){
//                                    window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuOrderAmendment/FrmTrnFuOrderAmendment.php');
                                   window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuPurchaseEntry/FrmTrnFuGRNPurchase.php');
                                }
                            },
                              {
                                text: '<b>PURCHASE ENTRY - NEW</b>',
                                group: 'theme',
                                handler: function(){
                                   window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/TrnFuPurchaseEntry/FrmTrnFuGRNPurchaseNew.php');
                                }
                            },
  
  
          ]
        }
}),
new Ext.Toolbar.SplitButton({
        text: '<b>FUEL REPORTS</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
               {

		        text: '<b>GENERAL REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/RepFuelReports/FuelGeneralReports/RepFuelGeneral.php');
		        }
  
                },
               {

		        text: '<b>VOUCHER PRINTING</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/RepFuelReports/FuelPreprintReports/RepFuelPrePrint.php');
		        }
  
                },

		{
			text: '<b>PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/ViewReports/RepViewStatements.php');
			}
		},

		{
			text: '<b>ITEMWISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/ViewReports/RepViewItemwiseArrivals.php');
			}
		},

		{
			text: '<b>DEBIT NOTE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/ViewReports/RepViewFuelDebitNote.php');
			}
		},
         ]
        }
}),	 	 	 	 	 	 	 	 
new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',style: 'background-color: DEC5C0;',
        width:150,
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

     
     
    );

    if (induser === "T") {
	Ext.getCmp('masmenu').setVisible(false);
	Ext.getCmp('purpo').setVisible(false);
	Ext.getCmp('pupoamd').setVisible(false);
	Ext.getCmp('purwo').setVisible(false);
	Ext.getCmp('purtrans').setVisible(false);

	}
    tb.doLayout();
    tbgeneral.doLayout();
	Ext.getCmp('comp').setText(compname);
	Ext.getCmp('finyear').setText(yearfin);




   /* if (ginuser==1)
    {
         Ext.getCmp('btnmaster').setVisible(true);
	 Ext.getCmp('tableid').setVisible(true);
         Ext.getCmp('tableid1').setVisible(true);
         Ext.getCmp('tableid14').setVisible(true);
         Ext.getCmp('tableid48').setVisible(true);
	 Ext.getCmp('tableid2').setVisible(false);
	 Ext.getCmp('tableid3').setVisible(true);
    }
    else
    {
//         Ext.getCmp('btnmaster').setVisible(false);
	 Ext.getCmp('tableid').setVisible(true);
         Ext.getCmp('tableid1').setVisible(false);
         Ext.getCmp('tableid14').setVisible(false);
         Ext.getCmp('tableid48').setVisible(false);
	 Ext.getCmp('tableid2').setVisible(false);
	 Ext.getCmp('tableid3').setVisible(true);
    }
    var timevar=200;
    setInterval(function () {
    if(company==1)
    {
    Ext.getCmp('btnheader').setText('SRI HARI '+'---'+yearfin);
    }
  
    else{
	  Ext.getCmp('btnheader').setText('Log Again!');
 	  window.location.href=('/Financials/FinancialsLogin.php');
    }
     },timevar);*/
});


