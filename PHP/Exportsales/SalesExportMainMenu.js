Ext.onReady(function(){
    Ext.QuickTips.init();


var yearfin=localStorage.getItem('gstyear');
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin = localStorage.getItem('ginfinid');

    var tb = new Ext.Toolbar();
    tb.render('toolbar');
         
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
                    text: '<b>VARIETY MAIN GROUP</b>',
                    group: 'theme',
                    handler: function(){
//                        window.location.href=('/SHVPM/SALES/MasVarietyMainGroup/FrmMasProdMain.php');
                    }
                },
            	{
                    text: '<b>VARIETY SUB GROUP</b>',
                    group: 'theme',
                    handler: function(){
  //                      window.location.href=('/SHVPM/SALES/MasVarietySubGroup/FrmMasProdSubGroup.php');
                    }
                },

            	{
                    text: '<b>PRODUCTION VARIETY</b>',
                    group: 'theme',
                    handler: function(){
    //                    window.location.href=('/SHVPM/SALES/MasProdnVariety/FrmMasProdnVariety.php');
                    }
                }, 
            	{
                    text: '<b>SALES VARIETY </b>',
                    group: 'theme',
                     handler: function(){
      //                  window.location.href=('/SHVPM/SALES/MasSalesVariety/FrmMasSalesVariety.php');
                    }
                },
            	{
                    text: '<b>TAX MASTER </b>',
                    group: 'theme',
                     handler: function(){
        //                window.location.href=('/SHVPM/SALES/MasSalesTax/FrmMasSalesTax.php');
                    }
                }


             ]}

    }),

   new Ext.Toolbar.SplitButton({
        text: '<b>TRANSACTIONS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
       menu:{
            items:[
            	{
                    text: '<b>EXPORT PROFORMA INVOICE</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Exportsales/TrnProformaInvoice/TrnExSalesProformaInv.php');
                    }
                },

            	{
                    text: '<b>EXPORT INVOICE</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Exportsales/TrnInvoice/TrnExportInv.php');
                    }
                },

       ]}
   }),
   
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
                        window.location.href=('/SHVPM/MasGroup/FrmMasGroup.php');
                    }
                },

                {
                    text: '<b>CHANGE FINYEAR</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('/SHVPM/MasLedger/FrmMasLedger.php');
                    }
                },
	
            ]
        }
     }),   
new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;'
   }),	
new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',style: 'background-color: DEC5C0;',
        width:150,
        handler: function () {
            window.location.href=('http://192.168.11.14');
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
