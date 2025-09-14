Ext.onReady(function(){
    Ext.QuickTips.init();
    var finid=0;	
    finid=localStorage.getItem('accfinid');

    if(finid>0){
	finid=localStorage.getItem('accfinid');
    }else{
	finid=0;
    }	
    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    tb.add(new Ext.Toolbar.SplitButton({
        text: '<b>General</b>',
        id: 'mnuGeneral',id:'tranid1',
        width: 150,
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/GeneralMenuPage.php');

            }
        }
     }),
     new Ext.Toolbar.SplitButton({
        text: '<b>Payables</b>',
        width: 150,id:'tranid2',
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/PayablesMenuPage.php');

            }
        }
     }),

     new Ext.Toolbar.SplitButton({
        text: '<b>Receivables</b>',
        width: 150,id:'tranid3',
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/ReceivablesMenuPage.php');

            }
        }
     }),
        
    new Ext.Toolbar.SplitButton({
       text: '<b>Cash & Bank</b>',
       width: 150,id:'tranid4',
        listeners: {
            click: function(){
                //Ext.MessageBox.alert("Menu",this.getId());
                window.location.href=('/SHVPM/Financials/CashBankMenuPage.php');

            }
        }
    }),
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
                    text: '<b>SALE NOTE </b>',
                    group: 'theme',
                    handler: function(){
                              window.location.href=('http://10.0.0.251/SHVPM/Financials/PayablesUpdation/TrnSaleNoteUpdation.php');
                    }
                }, 


             ]}

    }),
new Ext.Toolbar.SplitButton({
       text: '<b>Division Change</b>',  
       width: 150, 
	handler: function () {
           window.location.href=('/SHVPM/Financials/CompanyChange/Company.php');
        }
    }),
  new Ext.Toolbar.SplitButton({
       text: '<b>Year Change</b>',  
       width: 150, 
	handler: function () {
           window.location.href=('/SHVPM/Financials/YearChange/year.php');
        }
    }),
    new Ext.Toolbar.SplitButton({
        text: '<b>LogOut</b>',
        width:150,
        handler: function () {
            window.location.href=('http://10.0.0.251');
        }
    }),
   new Ext.Toolbar.SplitButton({
        text: '<b>F5-Refresh</b>',
        width: 150,
        iconCls: 'bmenu',
        handler: function(){
                        window.location.reload();
                    }
      })
    );
    
    tb.doLayout();

      /*  var timevar=1000;
        setInterval(function () {
	    if(finid==0||finid=="")
	    {
	    window.location.href=('/SHVPM/Financials/FinancialsLogin.php');
	    }
 	   },timevar);*/
});
