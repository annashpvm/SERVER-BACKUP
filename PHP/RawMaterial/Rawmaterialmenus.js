Ext.onReady(function(){
    Ext.QuickTips.init();
 
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
                    text: '<b>RAWMATERIAL ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasRawItem/FrmMasRawItem.php');
                    }
                },
/*
    		{
                    text: '<b>ITEM RATE MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasItemRate/FrmMasItemRate.php');
                    }
                },

                {
                    text: '<b>LOT MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasLot/FrmMasLot.php');
                    }
                },

                {
                    text: '<b>ITEM FREIGHT MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasItemFreight/FrmMasItemFreight.php');
                    }
                },
                {
                    text: '<b>PARTY AREA FREIGHT MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasAreaFreight/FrmMasAreaFreight.php');
                    }
                },
                {
                    text: '<b>LOT WISE OPENING ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasLotStock/FrmMasLotStock.php');
                    }
                },
                {
                    text: '<b>WASTE PAPER GST BILL SUPPLIER LIST </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasGSTBillSuppliers/FrmMasGSTBillsSupplier.php');
                    }
                },
                {
                    text: '<b>WASTE PAPER TAX MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasPaperTax/FrmMasPaperTax.php');
                    }
                },


*/
                {
                    text: '<b>WASTE PAPER GROUP MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasPaperGroup/FrmMasPaperGroup.php');
                    }
                },


                {
                    text: '<b>AREA MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasArea/FrmMasArea.php');
                    }
                } ,

                {
                    text: '<b>WEIGH BRIDGE ITEM MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasWeigeBridge/FrmMasWB.php');
                    }
                },


                {
                    text: '<b>WEIGH BRIDGE PARTY MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/MasWeigeBridgeParty/FrmMasWBParty.php');
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
                                text: '<b>WEIGHT SLIP ENTRY </b>',
                                group: 'theme',
                                handler: function(){
   //                                 window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/TrnRmWeightcard/FrmTrnRmWeightcard.php');
                                    window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/TrnRmWeightcard/FrmTrnRmWeightcard.php');

                                }
                            },
                            {
                                text: '<b>WEIGHT SLIP - TICKET DUPLICATION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/TrnRmWeightcard/FrmTrnRmWeightcardDuplicate.php');
                                }
                            },
                            {
                                text: '<b>WEIGHT SLIP MODIFICATIONS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/TrnRmWeightcard/FrmTrnRmWeightcardModify.php');
                                }
                            },

                            {
                                text: '<b>----------------------------------------------------</b>',
                                group: 'theme',
                                handler: function(){

                                }
                            },

                            {
                                text: '<b>WEIGH BRIDGE ENTRY SLIP MODIFICATIONS </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/TrnRmWeightcard/FrmTrnRmWeighBridgeEntry.php');
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
			text: '<b>WEIGH BRIDGE DETAILS </b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/ViewReports/RepViewWBDetails.php');
			}
		},

		{
			text: '<b>MONTHLY PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/ViewReports/RepViewStatements.php');
			}
		},
		{
			text: '<b>ITEMWISE PURCHASE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/ViewReports/RepViewItemwiseArrivals.php');
			}
		},
		{
			text: '<b>TRUCK WEIGHMENT DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/ViewReports/RepViewWeighment.php');
			}
		},
                      
		{
			text: '<b>QC INSPECTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/QC/ViewReports/RepViewRMQCReport.php');
			}
		},

/*
		{
			text: '<b>DEBIT NOTE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/RawMaterial/ViewReports/RepViewRMDebitNote.php');
			}
		},
*/


                        ]
                },

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


