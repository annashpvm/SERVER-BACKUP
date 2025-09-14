Ext.onReady(function(){
    Ext.QuickTips.init();
 
var yearfin=localStorage.getItem('gstyear');
//var yearfin='2020-2021'
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');

    var tb = new Ext.Toolbar();
    tb.render('toolbar');
    
    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b>MASTERS</b>',
        width: 80,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[

		    {
		        text: '<b>Supervisor Master </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/MasSupervisor/MasSupervisor.php');
		        }
		    },
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

		        text: '<b>Variety Master </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/MasBFGSM/FrmMasBFGSM.php');
		        }
		    },

		    {

		        text: '<b>Production Target Entry </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/MasProductionTarget/ProductionTarget.php');
		        }
		    },


		    {
		        text: '<b>FELT/WIRE/SCREEN Master </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/MasFeltWire/masFeltWire.php');
		        }
		    },


		{
                    text: '<b>Password Change</b>',
                    group: 'theme',
                    handler: function () {
                        window.location.href = ('http://10.0.0.251/SHVPM/Masters/PasswordChange/frmmaspassword.php');
                    }
                 },     

		
            ]
        }
     }),
	 
	
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>MACHINE ENTRY</b>',
        width: 80,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                            {
                                text: '<b>M/C Production Entry</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnProdnEntry/TrnProdnEntry.php');
                                }
                            },
/*
                            {
                                text: '<b>M/C Down Time Entry </b>',
                                group: 'theme',
                                handler: function(){
                              
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnDownTimeEntry/TrnDownTimeEntry.php');
                                }
                            },
*/

            	{
                    text: '<b>M/C Down Time Entry </b>',
                         id   : 'mcdown',
                         menu:{
                         items:[
                                {
                                   text: '<b> SHIFT DOWN TIME ENTRY </b>',
                                   group: 'theme',
                                   handler: function(){
                                          localStorage.setItem("DOWNTYPE",'SHIFT');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnDownTimeEntry/TrnDownTimeEntry.php');
                                          }
                                },

                                {
                                   text: '<b>MACHINE SHUT ENTRY</b>',
                                   group: 'theme',
                                   handler: function(){
                                    localStorage.setItem("DOWNTYPE",'SHUT');   
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnDownTimeEntry/TrnDownTimeEntry.php');
                                          }
                                },
                             ]
                          }, 
                },

                            {
                                text: '<b>Roll Card Entry</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnRollcardEntry/TrnRollcardEntry.php');
                                }
                            },
                            {
                                text: '<b>Roll Breaks Entry</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnRollBreaksEntry/TrnRollBreaksEntry.php');
                                }
                            },

		    {
		        text: '<b>FELT/WIRE/SCREEN Replacement </b>',
		        group: 'theme',
		        handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/Production/TrnFeltWire/TrnFeltWire.php');
		        }
		    },


                            /*{
                                text: '<b>Others</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnOthers/TrnBudget.php');
                                }
                            },
                            {
                                text: '<b>Reference</b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/Production/TrnProdnEntryref/TrnProdnEntryref.php');
                                }
                            },*/
                        ]
                },

     }),
     
     new Ext.Toolbar.SplitButton({
        text: '<b>REWINDER TRANSACTIONS</b>',
        width: 80,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
			{
                                text: '<b>ReWinder Entry</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnWinderEntry/TrnWinderEntry.php');
                                }
                        },
			{
                                text: '<b>ReWinder Entry - New </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReWinderEntry/TrnReWinderEntry.php');
                                }
                        },
/*
                       {
                                text: '<b>Reel Variety Change</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReelVarietyChange/TrnReelVarietyChange.php');
                                }
                        },
                       {
                                text: '<b>Reel Rotation</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReelRotation/TrnReelRotation.php');
                                }
                        },
                       {
                                text: '<b>Self Consumption Entry</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnSelfConsumptionEntry/TrnSelfConsumptionEntry.php');
                                }
                        },            
			{
                                text: '<b>Godown Selection</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnGodownSelection/TrnGodownSelection.php');
                                }
                        },   
*/         
			{
                                text: '<b>Reel Trace in the Finished Stock</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/SALES/TrnReelTraceFinStk/TrnReelTraceFinStk.php');
                                }
                        },
/*
                        {
                                text: '<b>Warehouse Stock Transfer</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnWarehouseStkTransferReel/TrnWarehouseStkTransferReel.php');
                                }
                        },
                        {
                                text: '<b>Warehouse Stock Location Entry</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnWarehouseStkLocationEntry/TrnWarehouseStkLocationEntry.php');
                                }
                            },
*/                            
                        ]
                },

     }),
     
     new Ext.Toolbar.SplitButton({
        text: '<b>FINISHING ENTRY </b>',
        width: 80,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
                       {
                                text: '<b>Reel Weight Entry</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReelWeightEntry/TrnReelWeight.php');
                                }
                        },
/*
                       {
                                text: '<b>Reel Date Change</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReelDateChange/TrnReelDateChange.php');
                                }
                        },
*/
                       {
                                text: '<b>Roll Production View</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnRollView/TrnRollView.php');
                                }
                        },
/*
                       {
                                text: '<b>Reel Weight Entry - II </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/TrnReelWeightEntry_II/TrnReelWeight.php');
                                }
                        },
*/
                   ]
             },
     }),

	 new Ext.Toolbar.SplitButton({
        text: '<b>CONSUMPTION ENTRIES</b>',
        width: 70,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

                    {
                        text: '<b>Chemical Consumption Entry</b>',
                        group: 'theme',
                        handler: function(){
                            window.location.href=('http://10.0.0.251/SHVPM/Production/TrnConsumptionEntry/TrnConsumptionEntry.php');
                        }
                    },
                  ]
                },

     }),

	 new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 70,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

			{
                                text: '<b>MACHINE PRODUCTION</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/RepMCProductionReports/RepMCProduction.php');
                                }
                        },

			{
                                text: '<b>MACHINE PRODUCTION - MONTHWISE </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/ViewProductions/RepViewProductionMonthwise.php');
                                }
                        },
			{
                                text: '<b>MACHINE PRODUCTION - DATEWISE </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/ViewProductions/RepViewProductionDatewise.php');
                                }
                        },
			{
                                text: '<b>ROLLWISE LOSS </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/ViewProductions/RepViewRollwiseLoss.php');
                                }
                        },
			{
                                text: '<b>SHIFT INCHARGE PERFORMANCE </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/ViewProductions/RepViewSupervisorPerformance.php');
                                }
                        },
			{
                                text: '<b>DOWN TIME DETAILS </b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/ViewProductions/RepViewDownTime.php');
                                }
                        },
			{
                                text: '<b>FINISHED PRODUCTION</b>',
                                group: 'theme',
                                handler: function(){
                                window.location.href=('http://10.0.0.251/SHVPM/Production/RepFinishedProductionReports/RepFinishedProduction.php');
                                }
                        },

              {
                text: '<b>CONSUMPTION REPORT </b>',
                group: 'theme',
                handler: function(){
                      window.location.href=('http://10.0.0.251/SHVPM/Production/RepConsumption/FrmConsumptions.php');
                    }
                },


             {

		        text: '<b>PRODUCTION STATEMENTS</b>',
		        group: 'theme',
		        handler: function(){
			    
		            window.location.href=('http://10.0.0.251/SHVPM/SALES/RepSALReports/SALProductionReports/RepSALProduction.php'); 
		        }
  
                },

              {
                text: '<b>FELT/WIRE HISTORY </b>',
                group: 'theme',
                handler: function(){
                      window.location.href=('http://10.0.0.251/SHVPM/Production/RepFeltWire/FrmFeltWire.php');
                    }
                },



                   ]
                },

     }),


	 
/*
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
*/ 
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

    
    tb.doLayout();
    tbgeneral.doLayout();

	Ext.getCmp('comp').setText(compname);
	Ext.getCmp('finyear').setText(yearfin);

});


