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

    	/*	{
                    text: '<b>SUPPLIER MASTER</b>',
                    group: 'theme',
                    
                    handler: function(){
                        window.location.href=('/SHVPM/Masters/CreditorMaster/FrmMasCreditor.php');
                    }
                },
*/
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
/*

                {
                    text: '<b>ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                    
                        window.location.href=('/SHVPM/Purchase/General/MasPurItem/FrmMasPurItem.php');
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
                    text: '<b>HSN CODE MASTER</b>',
                    group: 'theme',
                    handler: function()
			{
                        window.location.href=('/SHVPM/Purchase/General/MasHSNCode/FrmMasHSNCode.php');
                    }
                },
*/
		
            ]
        }
     }),
	 
	
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>TRANSACTIONS</b>',
        width: 150, id:'trnmenu',
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                            {
                                text: '<b>PURCHASE INDENT</b>',
                                group: 'theme',
                                id:'prcind',
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
			   /* {
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
        text: '<b>REPORTS</b>',
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

		        text: '<b>PREPRINTED REPORTS</b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Purchase/General/RepPurchaseReports/PurPreprintReports/RepPurPrePrint.php');
		        }
  
                },
            ]
        }
     }),
     
   /*  new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',
        menu:{
            items:[
               {
                    text: '<b>ACCOUNTING REPORTS</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Cash Book</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Bank Book</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>Purchase Day Book</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Sales Day Book</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>Debit Note Books</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>Credit Note Books</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>Journal Register</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>General Ledger</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>Sub Ledgers</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                            {
                                text: '<b>Statement of Accounts</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            }
                        ]
                    }
                },
				 {
                    text: '<b>MANAGERIAL REPORTS</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Trial Balance</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Profit & Loss</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>Balance Sheet</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>Cash Flow</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>Funds Flow</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>Ratio Analysis</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                        ]
                    }
                },
				 {
                    text: '<b>FUNDS  MANAGEMENT</b>',
                    menu:{
                        items:[
                            {
                                text: '<b>Bank Reconcilation</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnCashReceipt/FrmTrnCashReceipt.php');
                                }
                            },
                            {
                                text: '<b>Bank Recon Reports</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>CC Interest Recon</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
							{
                                text: '<b>CC Limits Management</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('/Financials/CashandBank/TrnBankReceipt/FrmTrnBankReceipt.php');
                                }
                            },
                        ]
                    }
                },
				 
            ]
        }
     }),*/

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
	Ext.getCmp('masmenu').setVisible(true);
	Ext.getCmp('purpo').setVisible(false);
	Ext.getCmp('pupoamd').setVisible(false);
	Ext.getCmp('purwo').setVisible(false);
	//Ext.getCmp('purtrans').setVisible(false);

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


