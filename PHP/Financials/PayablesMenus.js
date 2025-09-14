Ext.onReady(function () {
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
        width: 100,
        listeners: {
            click: function () {
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href = ('http://10.0.0.251/SHVPM/Financials/GeneralMenuPage.php');

            }
        }
    }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Payables</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/PayablesMenuPage.php');

                    }
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Receivables</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                        window.location.href = ('/SHVPM/Financials/ReceivablesMenuPage.php');

                    }
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Cash & Bank</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                        window.location.href = ('/SHVPM/Financials/CashBankMenuPage.php');

                    }
                }
            }),
	/*new Ext.Toolbar.SplitButton({
                text: '<b>Funds Management</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                        window.location.href = ('/SHVPM/Financials/FundsManagementMenuPage.php');

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


             ]}

    }),

            new Ext.Toolbar.SplitButton({
                text: '<b>Division Change</b>',
                width: 100,
                handler: function () {
                    window.location.href = ('/SHVPM/Financials/CompanyChange/Company.php');
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Year Change</b>',
                width: 100,
                handler: function () {
                    window.location.href = ('/SHVPM/Financials/YearChange/year.php');
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>LogOut</b>',
                width: 100,
                handler: function () {
                    window.location.href=('www.google.com');
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>F5-Refresh</b>',
                width: 100,
                iconCls: 'bmenu',
                handler: function () {
                    window.location.reload();
                }
            })
            );

    var tbpayable = new Ext.Toolbar();
    tbpayable.render('toolbar');
    tbpayable.add(new Ext.Toolbar.SplitButton({
        text: '<b>Entry</b>',
        width: 100, id: 'tranid',
        iconCls: 'bmenu',
        menu: {
            items: [
/*
                {
                    text: '<b>Purchases </b>',
                    group: 'theme', id: 'ireg',
                    handler: function () {
                        window.location.href = ('/SHVPM/Financials/Payables/TrnPurchases/FrmTrnPurchase.php');
                    }
                },

*/
                {
                    text: '<b>Expenses</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('/SHVPM/Financials/Payables/TrnExpenses/FrmTrnExpenses.php');
                    }
                },
                {
                    text: '<b>Debit Note</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('/SHVPM/Financials/Payables/TrnDebitNote/FrmTrnDebitNote.php');
                    }
                }
            ]
        }
    }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Status</b>',
                width: 100,
                iconCls: 'bmenu',
                menu: {
                    items: [
                       {
                            text: '<b>Outstanding</b>',hidden:true,
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepOutstanding/FrmRepOutstanding.php');
                            }
                        },
                                        {
                         text: '<b>Ageing Detail</b>',
                         group: 'theme',
                         handler: function(){
                         window.location.href=('/SHVPM/Financials/Payables/RepAgeingdetail/FrmRepAgeingdetail.php');
                         }
                         },
		{
                            text: '<b>Payables Ageing New- working progress</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepOutstandingAboveGivenDayspayable/FrmRepOutstandingAboveGivenDayspayable.php');
                            }
                        }, {
                            text: '<b>Payables Ageing New 2- working progress</b>',hidden:true,
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepAgeingReportNew2/FrmRepAgeingReportNew2.php');
                            }
                        }, 
                        {
                            text: '<b>Ageing Report New</b>', hidden: true,
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepAgeingreportnew/FrmRepAgeingreportnew.php');
                            }
                        }
                    ]
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Reports</b>',
                width: 100,
                iconCls: 'bmenu',
                menu: {
                    items: [
 			{
                            text: '<b>Accounts Payables Reports</b>',
                            group: 'theme',
                            handler: function () {
                             window.location.href = ('/SHVPM/Financials/Payables/RepPayables/Payables.php');

                            }
                        },     
/*
 			{
                            text: '<b>Accounts Payables -- Agewise</b>',
                            group: 'theme',
                            handler: function () {
                             window.location.href = ('/SHVPM/Financials/Payables/RepPayableAgewise/PayableAgewise.php');

                            }
                        },   
*/
                  
                        {
                            text: '<b>Purchase Register</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPurchaseregister/FrmRepPurchaseregister.php');
                            }
                        },
                        {
                            text: '<b>Purchase Register (No wise)</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPurchaseregisternowise/FrmRepPurchaseregisternowise.php');
                            }
                        },
                        /*   {
                         text: '<b>Yarn Purchase Register</b>',
                         group: 'theme',
                         handler: function(){
                         window.location.href=('/Financials/Payables/RepYarnpurchaseregister/FrmRepYarnpurchaseregister.php');
                         }
                         },*/
                        {
                            text: '<b>Pending MINs</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPendingmins/FrmRepPendingmins.php');
                            }
                        },
                        {
                            text: '<b>MIN List</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepMinlist/FrmRepMinlist.php');
                            }
                        },
                        {
                            text: '<b>Pending Work Order MINs</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPendingworkordermins/FrmRepPendingworkordermins.php');
                            }
                        },
                        {
                            text: '<b>Store Purchases</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepStorepurchases/FrmRepStorepurchases.php');
                            }
                        },
                        {
                            text: '<b>Expenses Register</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepExpenseregister/FrmRepExpenseregister.php');
                            }
                        },
                        {
                            text: '<b>Debit Note Register</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepDebitnoteregister/FrmRepDebitnoteregister.php');
                            }
                        },
                        {
                            text: '<b>Debit Note Printing</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepDebitnoteprinting/FrmRepDebitnoteprinting.php');
                            }
                        },
                        {
                            text: '<b>GST Purchase Register</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPurchaseregisterGst/FrmRepPurchaseregisterGst.php');
                            }
                        }
                        , {
                            text: '<b>PURCHASE AGEING</b>',
                            group: 'theme', hidden: true,
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepPurchaseAgeing/PurchaseAgeing.php');
                            }
                        },{
                            text: '<b>Expenses Abs Register</b>',
                            group: 'theme',
                            handler: function () {
				window.location.href = ('/SHVPM/Financials/Payables/RepGST/GST.php');
                            }
                        },{
                            text: '<b>Closing Check Overall</b>',
                            group: 'theme',
                            handler: function () {
                    var d1 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var d2 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var p1 = "&fmdate="+encodeURIComponent(d1);
                    var p2 = "&tdate="+encodeURIComponent(d2);
                    var p3 = "&finid="+encodeURIComponent(finid);
                    var p4 = "&comp="+encodeURIComponent(company);
		    
                    var test = (p1+p2+p3+p4) ;

                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceMonthnew.rptdesign'+test,  '_blank' );
                            }
                        }, {
                            text: '<b>Closing Check Overall-Billwise</b>',
                            group: 'theme',
                            handler: function () {
                    var d1 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var d2 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var p1 = "&fmdate="+encodeURIComponent(d1);
                    var p2 = "&tdate="+encodeURIComponent(d2);
                    var p3 = "&finid="+encodeURIComponent(finid);
                    var p4 = "&comp="+encodeURIComponent(company);
		    
                    var test = (p4 + p3) ;

                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceMonthnewbillwise.rptdesign'+test,  '_blank' );
                            }
                        },  {
                            text: '<b>Closing Check Overall-Advance wise</b>',
                            group: 'theme',
                            handler: function () {
                    var d1 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var d2 =  new Date().format('Y-m-d') + " 00:00:00.000";
                    var p1 = "&fmdate="+encodeURIComponent(d1);
                    var p2 = "&tdate="+encodeURIComponent(d2);
                    var p3 = "&finid="+encodeURIComponent(finid);
                    var p4 = "&comp="+encodeURIComponent(company);
		    
                    var test = (p4 + p3) ;

                     window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceMonthnewadvwise.rptdesign'+test,  '_blank' );
                            }
                        },  {
                            text: '<b>Payables Advance Ageing</b>',
                            group: 'theme',
                            handler: function () {
                                var p3 = "&compcode="+encodeURIComponent(company);
                                var p5 = "&finid="+encodeURIComponent(finid);

                                var test = (p3+p5);
                                
                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/debitage.rptdesign' + test,  '_blank' );
                            }
                        },  
                                          
                        	{
                            text: '<b>Payables Ageing</b>',
                            group: 'theme',
                            handler: function () {
                               // window.location.href = ('/SHVPM/Financials/Payables/PrnPurchaseageing/FrmPrnPurchaseageing.php');
                                window.location.href = ('/SHVPM/Financials/Payables/RepPurchaseAgeing/PurchaseAgeing.php');
                            }
                        }, {
                            text: '<b>Expense Details</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('/SHVPM/Financials/Payables/RepExpense/RepExpense.php');
                            }
                        }, {
                            text: '<b>Month Wise Yarn Purchase Details</b>',
                            group: 'theme',
                            handler: function () {
				window.location.href = ('/SHVPM/Financials/Payables/Repmonthwise/monthwise.php');
                            }
                        },{
                    text: '<b>Payable Bill Adjustment  With Advance</b>',
                    group: 'theme', id: 'adjpay',
                    handler: function () {
                        window.location.href = ('/SHVPM/Financials/Payables/TrnBilladjustmentpay/FrmTrnBilladjustmentpay.php');
                    }
                }, {
                    text: '<b>Payable Bill Adjustment Without Advance</b>',
                    group: 'theme', id: 'adjpaytrail',
                    handler: function () {
                        window.location.href = ('/SHVPM/Financials/Payables/TrnBilladjustmentpaydummy/FrmTrnBilladjustmentpaydummy.php');
                    }
                },

                    ]
                }
            }),
            new Ext.Toolbar.Button({
                text: '<b>company</b>', style: 'background-color: e1f756;',
               width: 400, id: 'btnheader1'

            }),

          new Ext.Toolbar.Button({
            text: '<b>SHVPM2</b>',style: 'background-color: yellow;',
            width:300,id:'btnheader2'   
          }),


            );
    tb.doLayout();
    tbpayable.doLayout();

       if (GinUser === 'Accounts-HO')
       {
          voupoint = 'HEAD OFFICE';
       }
       else
       {
          voupoint= 'MILL';
       }

    Ext.getCmp('btnheader1').setText( '<b>'  +  company  +  '</b>');
    Ext.getCmp('btnheader2').setText( '<b>'  +  ' Finance Year : ' + yearfin +  '</b>');


//    Ext.getCmp('btnheader2').setText( '<b>           '  +  company + '  -   Finance Year : ' + yearfin +    "          --         " + '  DATA  ENTRY LOCATION :-   ' + voupoint + '</b>');  
/*

    if (finid < 27 && powerid === 'capitalsoft') {
        Ext.getCmp('tranid').setVisible(true);
    } else if (finid > 26 && powerid === 'capital') {
        Ext.getCmp('tranid').setVisible(true);
    } else if (finid < 27 && powerid === 'capital') {
        Ext.getCmp('tranid').setVisible(false);
    }
    if (ginuser == 1)
    {

        Ext.getCmp('adjpaytrail').setVisible(true);
        Ext.getCmp('adjpay').setVisible(true);
        Ext.getCmp('correctid').setVisible(true);
        Ext.getCmp('correctidledg').setVisible(false);
        Ext.getCmp('correctidround').setVisible(false);
        Ext.getCmp('correctidwith').setVisible(false);


    } else
    {
        Ext.getCmp('adjpaytrail').setVisible(true);
        Ext.getCmp('adjpay').setVisible(true);
        Ext.getCmp('correctidledg').setVisible(false);
        Ext.getCmp('correctid').setVisible(false);
        Ext.getCmp('correctidround').setVisible(false);
        Ext.getCmp('correctidwith').setVisible(false);
    }
*/
  /*  var timevar = 200;
    setInterval(function () {
        Ext.getCmp('btnppclose').setVisible(false);
        if (company == 1)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : Denim & Apparel Fabric' + '---' + yearfin);
            Ext.getCmp('sbmmadfabid').setVisible(false);
            Ext.getCmp('sbmmadfabid2').setVisible(false);
            Ext.getCmp('sbmmadfabid3').setVisible(false);
            Ext.getCmp('sbmmadwo2').setVisible(false);
            Ext.getCmp('ipp').setVisible(false);
            Ext.getCmp('btnppclose').setVisible(false);
        } else if (company == 4)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : Hometextiles' + '---' + yearfin);
            Ext.getCmp('sbmmadfabid').setVisible(false);
            Ext.getCmp('sbmmadfabid2').setVisible(true);
            Ext.getCmp('sbmmadfabid3').setVisible(true);
            Ext.getCmp('sbmmadwo2').setVisible(true);
            Ext.getCmp('ipp').setVisible(false);
            Ext.getCmp('btnppclose').setVisible(false);

        } else if (company == 10)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : UNIT - KG DENIM (US) INC' + '---' + yearfin);
            Ext.getCmp('sbmmadfabid').setVisible(false);
            Ext.getCmp('sbmmadfabid2').setVisible(false);
            Ext.getCmp('sbmmadfabid3').setVisible(false);
            Ext.getCmp('sbmmadwo2').setVisible(false);
            Ext.getCmp('ipp').setVisible(false);
            Ext.getCmp('btnppclose').setVisible(false);
        } else if (company == 11)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : SRINIVASA AGRO' + '---' + yearfin);
            Ext.getCmp('sbmmadfabid').setVisible(false);
            Ext.getCmp('sbmmadfabid2').setVisible(false);
            Ext.getCmp('sbmmadfabid3').setVisible(false);
            Ext.getCmp('sbmmadwo2').setVisible(false);
            Ext.getCmp('ipp').setVisible(false);
            Ext.getCmp('btnppclose').setVisible(false);

        } else if (company == 8)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : POWER PLANT' + '---' + yearfin);
            Ext.getCmp('impmnu').setVisible(false);
            Ext.getCmp('sbmmadwo2').setVisible(false);
            Ext.getCmp('mnucotton').setVisible(false);
            Ext.getCmp('sbmmadfabid').setVisible(false);
            Ext.getCmp('sbmmadfabid2').setVisible(false);
            Ext.getCmp('sbmmadfabid3').setVisible(false);
            Ext.getCmp('ipp').setVisible(true);
            Ext.getCmp('ireg').setVisible(false);
            Ext.getCmp('btnppclose').setVisible(false);
        } 
else if (company == 12)
        {
            Ext.getCmp('btnheader2').setText('KG DENIM LIMITED : SIZING UNIT' + '---' + yearfin);

        } 
else {
            Ext.getCmp('btnheader2').setText('Log Again!');
            window.location.href = ('/Financials/FinancialsLogin.php');
        }
    }, timevar);**/
});

