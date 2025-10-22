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
                        window.location.href=('http://10.0.0.251/SHVPM/ImportOld/MasExchangeRate/FrmMasExRate.php');
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
	                           text: '<b>IMPORT PURCHASE ORDER</b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/TrnImportPurchaseOrder/FrmTrnImportPopreparation.php');
	                                }
	                    },
	                    { 
	                           text: '<b>IMPORT PURCHASE ORDER - Amendment </b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/TrnImportOrderAmend/FrmTrnImportPoAmendment.php');
	                                }
	                    },
                            {
                                text: '<b>CNF CHARGES ENTRY</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/Trncnfentry/Trncnfentry.php');
                                }
                            },
                            {
                                text: '<b>LC APPLICATION</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/TrnFrmlcapplicationdetails/TrnFrmlcapplicationdetails.php');
                                }
                            },
                            {
                                text: '<b>LC DETAILS</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/Trnfrmlcdetails/Trnfrmlcdetails.php');
                                }
                            },
                            {
                                text: '<b>RAWMATERIAL INVOICE</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/Trnfrmrawmeterialinvoice/Trnfrmrawmeterialinvoice.php');
                                }
                            },
                            {
                                text: '<b>BILL OF ENTRY</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/Trnfrmbillofentry/Trnfrmbillofentry.php');
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
	                           text: '<b>GENERAL REPORTS</b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/RepImportReports/ImpGeneralReports/RepImpGeneral.php');
	                                }
	                    },
	                    { 
	                           text: '<b>PRE-PRINTED REPORTS</b>',
			                group: 'theme',
			                handler: function(){
			                    window.location.href=('http://10.0.0.251/SHVPM/ImportOld/RepImportReports/ImpPreprintReports/RepImpPrePrint.php');
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
/*

	if(compname=="VJPM")
	{
	var c = "VIJAYALAKSHMI PAPER MILLS";
	}
	else
	{
	var c = "DANALAKSHMI PAPER MILLS";
	}

	if(fin=="27")
	{
	var f = "2020-2021";
	}
	else
	{
	var f = "2019-2020";
    //        window.location.href=('http://192.168.145.10');
	}

	Ext.getCmp('comp').setText(c);
	Ext.getCmp('finyear').setText(yearfin);



*/

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
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Denim & Apparel Fabric '+'---'+yearfin);
    }
    else if(company==4)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : Hometextiles'+'---'+yearfin);    
    
    }
    else if(company==10)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : UNIT - KG DENIM (US) INC'+'---'+yearfin);    
    
    }
   else if(company==11)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : SRINIVASA AGRO'+'---'+yearfin);    
    
    }     else if(company==8)
    {
    Ext.getCmp('btnheader').setText('KG DENIM LIMITED : POWER PLANT'+'---'+yearfin);    
    
    }  
    else{
	  Ext.getCmp('btnheader').setText('Log Again!');
 	  window.location.href=('/Financials/FinancialsLogin.php');
    }
     },timevar);*/
});


