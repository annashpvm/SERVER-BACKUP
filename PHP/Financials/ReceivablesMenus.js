Ext.onReady(function(){
    Ext.QuickTips.init();
    var ginuser = localStorage.getItem('accuserid');
    var yearfin = localStorage.getItem('gstyear');
    var company = localStorage.getItem('gstcompany');
    var finid = localStorage.getItem('ginfinid');
    var powerid = localStorage.getItem('powerid');
    var compcode = localStorage.getItem('gincompcode');
    var GinFinid = localStorage.getItem('ginfinid');
    var tb = new Ext.Toolbar();

    var GinUser = localStorage.getItem('gstuser');
    var GinUserid = localStorage.getItem('ginuser');

    tb.render('toolbar');
    tb.add(new Ext.Toolbar.SplitButton({
        text: '<b>General</b>',
        id: 'mnuGeneral',
        width: 100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/GeneralMenuPage.php');

            }
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Payables</b>',
        width: 100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/PayablesMenuPage.php');

            }
        }
     }),

     new Ext.Toolbar.SplitButton({
        text: '<b>Receivables</b>',
        width: 100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/ReceivablesMenuPage.php');

            }
        }
     }),
        
    new Ext.Toolbar.SplitButton({
       text: '<b>Cash & Bank</b>',
       width: 100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/CashBankMenuPage.php');

            }
        }
    }),
/*new Ext.Toolbar.SplitButton({
       text: '<b>Funds Management</b>',
       width: 100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/FundsManagementMenuPage.php');

            }
        }
    }),*/

    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b> PAYABLE UPDATION </b>',
        width: 150,//style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[                    
            	{
                    text: '<b>GENERAL STORES</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationStores.php');
                    }
                },
            	{
                    text: '<b>FUEL </b>',
                    group: 'theme',
                     handler: function(){
                       window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationFuel.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - INDEGINEIOUS</b>',
                    group: 'theme',
                    handler: function(){
                       window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationRM.php');
                    }
                },

            	{
                    text: '<b>WASTE PAPER - IMPORT</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationImportDC.php');
                    }
                }, 
            	{
                    text: '<b>WORK ORDER GRNS</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationWorkGRN.php');
                    }
                }, 
            	{
                    text: '<b>OTHER SALES</b>',
                    group: 'theme',
                    handler: function(){
                              window.location.href=('http://192.168.11.14/SHVPM/Financials/PayablesUpdation/TrnPayableUpdationOtherSales.php');
                    }
                }, 


             ]}

    }),

new Ext.Toolbar.SplitButton({
       text: '<b>Division Change</b>',  
       width: 100, 
	handler: function () {
           window.location.href=('/SHVPM/Financials/CompanyChange/Company.php');
        }
    }),
    new Ext.Toolbar.SplitButton({
        text: '<b>LogOut</b>',
        width: 100,
        handler: function () {
            window.location.href=('http://192.168.11.14');
        }
    }),
   new Ext.Toolbar.SplitButton({
        text: '<b>F5-Refresh</b>',
        width: 100,
        iconCls: 'bmenu',
       handler: function(){
                        window.location.reload();
                    }
     })
    );
    
    var tbreceivable = new Ext.Toolbar();
    tbreceivable.render('toolbar');
    tbreceivable.add(new Ext.Toolbar.SplitButton({
        text: '<b>Entry</b>',
        width: 100,id:'tranid',
        iconCls: 'bmenu',
        menu:{
            items:[
              /*  {
                    text: '<b>Yarn Sales</b>',
                    group: 'theme',id:'ysid',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/TrnYarnSales/FrmTrnYarnSales.php');
                    }
                },*/
                {
                    text: '<b>Credit Note</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/TrnCreditNote/FrmTrnCreditNote.php');
                    }
                }
            ]
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Status</b>',
        width: 100,
        iconCls: 'bmenu',
        menu:{
            items:[
                {
                    text: '<b>Outstanding</b>',hidden:true,
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepOutstanding/FrmRepOutstanding.php');
                    }
                },
                {
                    text: '<b>Outstanding above given days</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepOutstandingAboveGivenDays/FrmRepOutstandingAboveGivenDays.php');
                    }
                },
                {
                    text: '<b>Ageing Detail</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepAgeingDetail/FrmRepAgeingDetail.php');
                    }
                },
                {
                    text: '<b>Ageing Report New</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepAgeingReportNew/FrmRepAgeingReportNew.php');
                    }
                },
                {
                    text: '<b>Regional Sales Collection</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepRegionalSalesCollection/FrmRepRegionalSalesCollection.php');
                    }
                },
                {
                    text: '<b>Sales CD Statement</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSalesCDStatement/FrmRepSalesCDStatement.php');
                    }
                }
            ]
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Reports</b>',
        width: 100,
        iconCls: 'bmenu',
        menu:{
            items:[
 			{
                            text: '<b>Receivables Reports</b>',
                            group: 'theme',
                            handler: function () {
                             window.location.href = ('/SHVPM/Financials/Receivables/RepReceivables/Receivables.php');

                            }
                        },   
    
 			{
                            text: '<b>Receivables - Other Reports </b>',
                            group: 'theme',
                            handler: function () {
                             window.location.href = ('/SHVPM/Financials/Receivables/RepReceivablesOtherReports/ReceivablesOtherReports.php');

                            }
                        },       
                        {
                            text: '<b>Collections Report</b>',
                            group: 'theme',
                            handler: function () {
                             window.location.href = ('/SHVPM/Financials/Receivables/RepCollections/RepCollections.php');

                            }
                        },  
                        {
                    text: '<b>Sales Detail</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Sales Detail</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/Receivables/Repsalesregister/Repsalesregister.php');
                                }
                            }
                        ]
                    }
                },  
                 {
                    text: '<b>TDS Reports</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Reptdsreports/Reptdsreports.php');
                    }
                },   
                {
                    text: '<b>Bill Adjustment</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Repbilladjustment/Repbilladjustment.php');
                    }
                },    
                 {
                    text: '<b>Expenses Summary/Confirmation of Balance/Statement of Accounts</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSummaryConfirmationStatement/RepSummaryConfirmationStatement.php');
                    }
                }, 
                {
                    text: '<b>Revenue Reports</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepRevenue/RepRevenue.php');
                    }
                },  
                 {
                    text: '<b>GST Reports</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Repgstreports/Repgstreports.php');
                    }
                }, 
                {
                    text: '<b>Agentwise Sales Commission</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Repagentwisesalescommission/Repagentwisesalescommission.php');
                    }
                }, 
               {
                    text: '<b>Export Sales</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepExportsales/FrmRepExportsales.php');
                    }
                },
                 {
                    text: '<b>Domestic Sales</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepDomesticsales/FrmRepDomesticsales.php');
                    }
                },
                
                {
                    text: '<b>Sales Register Selective</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Denim Sales</b>',
                                group: 'theme',
                                handler: function(){
				    var repflag = "DENIMSALES";
			            localStorage.setItem("accrepflag",repflag);
                                    window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterDenim/FrmRepSalesregisterDenim.php');
                                }
                            },
                            {
                                text: '<b>Indigo Sales</b>',
                                group: 'theme',
                                handler: function(){
				    var repflag = "INDIGOSALES";
			            localStorage.setItem("accrepflag",repflag);
                                    window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterDenim/FrmRepSalesregisterDenim.php');
                                }
                            },
                            {
                                text: '<b>Export Sales</b>',
                                group: 'theme',
                                handler: function(){
				    var repflag = "EXPORTSALES";
			            localStorage.setItem("accrepflag",repflag);
                                    window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterDenim/FrmRepSalesregisterDenim.php');
                                }
                            },
                            {
                                text: '<b>Yarn Sales</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/Receivables/RepSalesRegisterYarn/FrmRepSalesRegisterYarn.php');
                                }
                            },
                            {
                                text: '<b>Waste Sales</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/Receivables/RepSalesRegisterWaste/FrmRepSalesRegisterWaste.php');
                                }
                            }
                        ]
                    }
                },
                {
                    text: '<b>Excise</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Insurance Register</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Insurance Register";
			            localStorage.setItem("gstreptitle",reptitle);
                                    window.location.href=('/SHVPM/Financials/Receivables/RepInsuranceregister/FrmRepInsuranceregister.php');
                                }
                            },
                            {
                                text: '<b>Difference Duty</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Excise Register";
			            localStorage.setItem("gstreptitle",reptitle);
//                                    window.location.href=('/SHVPM/Financials/Receivables/RepDifferenceduty/FrmRepDifferenceduty.php');
                                    window.location.href=('/SHVPM/Financials/Receivables/RepInsuranceregister/FrmRepInsuranceregister.php');
                                }
                            } 
                        ]
                    }
                },
                {
                    text: '<b>Credit Note Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepCreditnoteregister/FrmRepCreditnoteregister.php');
                    }
                },
                {
                    text: '<b>Credit Note Printing</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepCreditnoteprinting/FrmRepCreditnoteprinting.php');
                    }
                },
                {
                    text: '<b>RG Stock Report</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Production</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Ouncewise Production Report";
			            localStorage.setItem("gstreptitle",reptitle);
//                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockproduction/FrmRepRgstockproduction.php');
                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockdirecttoparty/FrmRepRgstockdirecttoparty.php');
                                }
                            },
                            {
                                text: '<b>Domestic Sales</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Ouncewise Domestic Sales Report";
			            localStorage.setItem("gstreptitle",reptitle);
//                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockdomesticsales/FrmRepRgstockdomesticsales.php');
                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockdirecttoparty/FrmRepRgstockdirecttoparty.php');
                                }
                            },
                            {
                                text: '<b>Export Sales</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Ouncewise Export Sales Report";
			            localStorage.setItem("gstreptitle",reptitle);
//                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockexportsales/FrmRepRgstockexportsales.php');
                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockdirecttoparty/FrmRepRgstockdirecttoparty.php');
                                }
                            },
                            {
                                text: '<b>Direct to Party</b>',
                                group: 'theme',
                                handler: function(){
				var reptitle = "Ouncewise Direct to Party Report";
			            localStorage.setItem("gstreptitle",reptitle);
                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstockdirecttoparty/FrmRepRgstockdirecttoparty.php');
                                }
                            },
                            {
                                text: '<b>Production Details (Set wise)</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/SHVPM/Financials/Receivables/RepRgstocksetwiseproduction/FrmRepRgstocksetwiseproduction.php');
                                }
                            }
                        ]
                    }
                },
                {
                    text: '<b>Fabric GST Sales Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterDenimGst/FrmRepSalesregisterDenimGst.php');
                    }
                },
		{
                    text: '<b>Waste GST Sales Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterWasteGst/FrmRepSalesregisterWasteGst.php');
                    }
                },
		{
                    text: '<b>Yarn GST Sales Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSalesRegisterYarnGst/FrmRepSalesRegisterYarnGst.php');
                    }
                },
		{
                    text: '<b>Export GST Sales Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepExportSalesregisterGst/FrmRepExportSalesregisterGst.php');
                    }
                },
		{
                    text: '<b>Rice Bran Oil and Coal Sales Register</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepSalesregisterOilGst/FrmRepSalesregisterOilGst.php');
                    }
                },
		{
                    text: '<b>HSNCodewise Consolidated Report</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/RepHSNCodeSalesregisterGst/FrmRepHSNCodeSalesregisterGst.php');
                    }
                },{
                    text: '<b>PowerPlant Sales Details</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Repivoice/Frminvoice.php');
                    }
                },
			{
                    text: '<b>Receipt to Invoice Wise Details</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Reprecptvsadj/FrmRepadj.php');
                    }
                },{
                    text: '<b>Invoice to Receipt Wise Details</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Reprecptvsadjnew/FrmRepadjnew.php');
                    }
                },
{
                    text: '<b>BIT Stock Transfer Details</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/Receivables/Repbitstocktransfer/FrmRepSalesconsolidated.php');
                    }
                }

            ]
        }
     }),
           new Ext.Toolbar.Button({
                text: '<b>company</b>', style: 'background-color: e1f756;',
               width: 400, id: 'btnheader1'

            }),

          new Ext.Toolbar.Button({
            text: '<b>SHVPM</b>',style: 'background-color: yellow;',
            width:300,id:'btnheader2'   
          }),


    );
    tb.doLayout();
    tbreceivable.doLayout();

       if (GinUser === 'Accounts-HO')
       {
          voupoint = 'HEAD OFFICE';
       }
       else
       {
          voupoint= 'MILL';
       }


//    Ext.getCmp('btnheader2').setText( '<b>           '  +  company + '  -   Finance Year : ' + yearfin   + "          --         " + '  DATA  ENTRY LOCATION :-   ' + voupoint + '</b>');  

    Ext.getCmp('btnheader1').setText( '<b>'  +  company  +  '</b>');
    Ext.getCmp('btnheader2').setText( '<b>'  +  ' Finance Year : ' + yearfin +  '</b>');


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
    Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : Denim & Apparel Fabric'+'---'+yearfin);
    }
    else if(company==4)
    {
    Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : Hometextiles'+'---'+yearfin);    
    
    }
    else if(company==10)
    {
    Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : UNIT - KG DENIM (US) INC'+'---'+yearfin);    
    
    } else if(company==8)
    {
        Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : POWER PLANT'+'---'+yearfin);   
	Ext.getCmp('ysid').setVisible(false);    
    }

else if(company==11)
    {
    Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : SRINIVASA AGRO'+'---'+yearfin);    
     Ext.getCmp('sbmmadfabid').setVisible(false);
     Ext.getCmp('sbmmadfabid2').setVisible(false);
     Ext.getCmp('sbmmadwo2').setVisible(false);	

    
    }  
else if (company == 12)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : SIZING UNIT' + '---' + yearfin);
    Ext.getCmp('sbmmadfabid').setVisible(false);
     Ext.getCmp('sbmmadfabid2').setVisible(false);
     Ext.getCmp('sbmmadwo2').setVisible(false);	

        } 
   else{
	  Ext.getCmp('btnheader2').setText('Log Again!');
 	  window.location.href=('/SHVPM/Financials/FinancialsLogin.php');
    }
 },timevar);*/
});

