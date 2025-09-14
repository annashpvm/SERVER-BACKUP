Ext.onReady(function(){
    Ext.QuickTips.init();
 
/*var compcode = localStorage.getItem('tcompcode');
var compname = localStorage.getItem('tcompname');
var fin = localStorage.getItem('tfinid');*/
var yearfin=localStorage.getItem('gstyear');
//var yearfin='2020-2021'

var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin = localStorage.getItem('ginfinid');

    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    
    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b>MASTERS</b>',
        width: 150,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[


    		{
                    text: '<b>EXCHANGE RATE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Import/MasExchangeRate/FrmMasExRate.php');
                    }
                },
    		{
                    text: '<b>COUNTRY MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Import/MasCountry/FrmMasCountry.php');
                    }
                },
    		{
                    text: '<b>PORT MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Import/MasPort/FrmMasPort.php');
                    }
                },
		
            ]
        }
     }),
	 
	
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>TRANSACTIONS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	                    {
	                           text: '<b>IMPORT CONTRACT ENTRY </b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/Import/TrnImportContract/FrmTrnImportContract.php');
	                                }
	                    },
	                    { 
	                           text: '<b>IMPORT INVOICE ENTRY </b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/Import/TrnImportInvoice/FrmTrnImportInvoice.php');
	                                }
	                    },
                             {
                                text: '<b>IMPORT EXPENSES ENTRY</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Import/TrnImportInvoiceExpenses/FrmTrnImportInvoiceExpenses.php');
                                }
                            },
                        ]
                },

     }),

     
	 new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	                    {
	                           text: '<b>VOUCHER PRINTING</b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/Import/RepVoucherPrinting/RepImpVoucherPrint.php');
	                                }
	                    },
                        ]
                },

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


