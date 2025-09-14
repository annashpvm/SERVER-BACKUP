Ext.onReady(function(){
    Ext.QuickTips.init();
 var company = localStorage.getItem('acccompcode');
 var yearfin=localStorage.getItem('accfinyear');
var finid=localStorage.getItem('accfinid');  
var powerid=localStorage.getItem('powerid');
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
    new Ext.Toolbar.SplitButton({
       text: '<b>Funds Management</b>',
       width:100,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/FundsManagementMenuPage.php');

            }
        }
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
             window.location.href=('/Modules/index.php');
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
                    text: '<b>Bank Master</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Bank_Master/Bank_Master.php');
                    }
                },               {
                    text: '<b>Bank Reconciliation</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Bank_Reconciliation/Bank_Reconciliation.php');
                    }
                },        {
                    text: '<b>Bank Statement Download</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/statementdownload/statementdownload.php');
                    }
                },
		 {
                    text: '<b>ECS Master</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/ECS/ECS_Master.php');
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
                    text: '<b>Bank Reconciliation Report(Unreconciled)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Reconciliation_Report/Reconciliation_Report.php');
                    }
                },
		{
                    text: '<b>Bank Reconciliation Report(Reconciled)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Bankrecon_Reconciled_Report/bankrecon_reconciled_Report.php');
                    }
                },
		{
                    text: '<b>Bank Reconciliation Report(Reconciled) New</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Bankrecon_Reconciled_Report_New/bankrecon_reconciled_Report.php');
                    }
                },
		{
                    text: '<b>Funds Planning</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Funds_Planning/Funds_Planning.php');
                    }
                },
		{
                    text: '<b>Bank Interest Calculation</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Interest_Calc/Interest_Calc.php');
                    }
                }
            ]
        }
     }),
          new Ext.Toolbar.Button({
        text: '<b>KG</b>',style: 'background-color: yellow;',
        width:100,id:'btnheader'   
       
    
     })
    );
    tb.doLayout();
    tbcashbank.doLayout();

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



    var timevar=200;
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

        } 
    else{
	  Ext.getCmp('btnheader').setText('Log Again!');
 	  window.location.href=('/SHVPM/Financials/FinancialsLogin.php');
    }
   },timevar);
});

