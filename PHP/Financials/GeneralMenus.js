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
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/ReceivablesMenuPage.php');

                    }
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Cash & Bank</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/CashBankMenuPage.php');

                    }
                }
            }),



          /*  new Ext.Toolbar.SplitButton({
                text: '<b>Funds Management</b>',
                width: 100,
                listeners: {
                    click: function () {
                        //Ext.MessageBox.alert("Menu",this.getId());
                         window.location.href=('http://10.0.0.251/SHVPM/FundsManagementMenuPage.php');

                    }
                }
            }),*/

    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b> PAYABLE UPDATION </b>',
        width: 150,style: 'background-color: DEC5C0;',
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
                    window.location.href = ('http://10.0.0.251/SHVPM/CompanyChange/Company.php');
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>Year Change</b>',
                width: 100,
                handler: function () {
                    window.location.href = ('http://10.0.0.251/SHVPM/YearChange/year.php');
                }
            }),
            new Ext.Toolbar.SplitButton({
                text: '<b>LogOut</b>',
                width: 150,
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

    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(new Ext.Toolbar.SplitButton({
        id: 'btnmaster', text: '<b>Masters</b>',
        width: 100,
        iconCls: 'bmenu',
        menu: {
            items: [
/*
                {
                    text: '<b>Bank</b>',
                    group: 'theme',
                    handler: function () {

                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/MasBank/FrmMasBank.php');
                    }
                },
*/
                {
                    text: '<b>Group</b>',
                    group: 'theme',
                    handler: function () {

                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/MasGroup/FrmMasGroup.php');
                    }
                },
                {
                    text: '<b>Ledger</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/MasLedger/FrmMasLedger.php');
                    }
                },

                {
                    text: '<b>Ledger Group Modification</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/MasLedger/FrmMasLedger1.php');
                    }
                 },
             /*  {
                    text: '<b>AR / AP BILLS Modification</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/General/MasLedger/FrmAPARcorrection.php');
                    }
                },*/
               {
                    text: '<b>SOC (SALES ORDER CONFIRMATION) APPROVAL</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/FrmSocApprove/FrmSocApprove.php');
                    }
                }

            ]
        }
    }),
            new Ext.Toolbar.SplitButton({
                text: '<b>View</b>',
                width: 100,
                iconCls: 'bmenu',
                menu: {
                    items: [
                        {
                            text: '<b>Trial Balance</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/RepTrialBalance/FrmRepTrialBalance.php');
// window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepTrialBalance.rptdesign',  '_blank' );
                            }
                        },
                        /*{
                         text: '<b>FinYear Process</b>',
                         group: 'theme',
                         handler: function(){
                         window.location.href=('/Financials/General/TrnFinyearProcess/TrnFinyearlogin.php');
                         }
                         },
                         {
                         text: '<b>Profit & Loss Account</b>',
                         group: 'theme',
                         handler: function(){
                         window.location.href=('/Financials/General/RepProfitandLoss/FrmRepProfitandLoss.php');
                         }
                         },*/
                        {
                            text: '<b>Profit & Loss</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/RepKgdlProfitandLoss/FrmRepKgdlProfitandLoss.php');
                            }
                        },
                        /* {
                         text: '<b>Profit & Loss A/c (New)</b>',
                         group: 'theme',
                         handler: function(){
                         window.location.href=('/Financials/Financials/General/RepProfitandLossNew/FrmRepProfitandLossNew.php');
                         }
                         },*/
                        {
                            text: '<b>Balance Sheet</b>',
                            group: 'theme',
                            handler: function () {
                                window.location.href = ('http://10.0.0.251/SHVPM/Financials/General/RepBalanceSheet/FrmRepBalanceSheet.php');
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
    tbgeneral.doLayout();


//    Ext.getCmp('btnheader').setText( '<b>           '  +  company + '  -   Finance Year : ' + yearfin  + "          --         " + '  DATA  ENTRY LOCATION :-   ' + voupoint + '</b>');  


    Ext.getCmp('btnheader1').setText( '<b>'  +  company  +  '</b>');
    Ext.getCmp('btnheader2').setText( '<b>'  +  ' Finance Year : ' + yearfin +  '</b>');


  /*  if (ginuser ==="1")
    {
        Ext.getCmp('btnmaster').setVisible(true);
        Ext.getCmp('tableid').setVisible(true);
        Ext.getCmp('tableid1').setVisible(true);
        Ext.getCmp('tableid14').setVisible(true);
        Ext.getCmp('tableid48').setVisible(true);
        Ext.getCmp('tableid2').setVisible(false);
        Ext.getCmp('tableid3').setVisible(true);
    } else
    {
//         Ext.getCmp('btnmaster').setVisible(false);
        Ext.getCmp('tableid').setVisible(true);
        Ext.getCmp('tableid1').setVisible(false);
        Ext.getCmp('tableid14').setVisible(false);
        Ext.getCmp('tableid48').setVisible(false);
        Ext.getCmp('tableid2').setVisible(false);
        Ext.getCmp('tableid3').setVisible(true);
    }
    if (GinFinid < 27 && powerid === 'capitalsoft') {
       // Ext.getCmp('tranid').setVisible(true);
    } else if (GinFinid > 26 && powerid === 'capital') {
       // Ext.getCmp('tranid').setVisible(true);
    } else if (GinFinid < 27 && powerid === 'capital') {
      //  Ext.getCmp('tranid').setVisible(false);
    }

 /*   if (ginuser == 72)
    {

        Ext.getCmp('btnmaster').setVisible(false);
    }*/


   /* var timevar = 200;
    setInterval(function () {
        if (company == 1)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Denim & Apparel Fabric ' + '---' + yearfin);
        } else if (company == 4)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Hometextiles' + '---' + yearfin);

        } else if (company == 10)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : UNIT - KG DENIM (US) INC' + '---' + yearfin);

        } else if (company == 11)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : SRINIVASA AGRO' + '---' + yearfin);

        } else if (company == 8)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : POWER PLANT' + '---' + yearfin);

        } 
	else if (company == 12)
        {
            Ext.getCmp('btnheader').setText('KG DENIM LIMITED : SIZING UNIT' + '---' + yearfin);

        } 
	else {
            Ext.getCmp('btnheader').setText('Log Again!');
            window.location.href = ('/Financials/FinancialsLogin.php');


        }
    }, timevar);*/
});


