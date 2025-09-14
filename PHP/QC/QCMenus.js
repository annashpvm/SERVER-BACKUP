Ext.onReady(function(){
    Ext.QuickTips.init();

//var yearfin=localStorage.getItem('accfinyear');

//var yearfin='2020-2021' 
//var compcode = localStorage.getItem('tcompcode');
//var compname = localStorage.getItem('tcompname');
//var fin = localStorage.getItem('tfinid');
var yearfin  = localStorage.getItem('gstyear'); 
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');




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
                    text: '<b>FUEL ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                   window.location.href=('http://10.0.0.251/SHVPM/Purchase/Fuel/MasFuelItem/FrmMasFuItem.php');
                    }
                },

    		{
                    text: '<b>RAWMATERIAL ITEM MASTER</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Purchase/RawMaterial/MasRawItem/FrmMasRawItem.php');                    }
                },
    		{
                    text: '<b> CHEMICAL TEST PARAMETERS </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/QC/MasChemical_TestParameter/masCDTestParameter.php');                    }
                },




    		{
                    text: '<b> CHEMICAL TEST MEASURING METHODS </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/QC/MasChemical_Measures/masCDMeasures.php');                    }
                },


    		{
                    text: '<b> CHEMICALS PARAMATERS AND ITS SPECIFICATIONS </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/QC/MasChemical_Parameter_Specificaitons/masCDParameter_Specifications.php');                    }
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
        text: '<b>TRANSACTIONS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[


                            {
                                text: '<b> WASTE PAPER - QC INSPECTION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/QC/TrnRMQC/FrmTrnRmQC.php');
                                }
                            },

                            {
                                text: '<b> BIO FUEL - QC INSPECTION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/QC/TrnFuelQC/FrmTrnFuelQC.php');
                                }
                            },


                            {
                                text: '<b> CHEMICAL INSPECTION </b>',
                                group: 'theme',
                                handler: function(){
                                    window.location.href=('http://10.0.0.251/SHVPM/QC/TrnChemical/FrmTrnChemical_Inspection.php');
                                }
                            },
                        ]
                },

     }),
     
	 new Ext.Toolbar.SplitButton({
        text: '<b>WASTE PAPER REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
		{
			text: '<b> WASTE PAPER - QC INSPECTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/QC/ViewReports/RepViewRMQCReport.php');
			}
		},

		{
			text: '<b> PARTYWISE DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/QC/ViewReports/RepViewRMQCReport.php');
			}
		},

            ]
        }
       }), 


	 new Ext.Toolbar.SplitButton({
        text: '<b>FUEL REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

		{
			text: '<b> FUEL - QC INSPECTION DETAILS</b>',
			group: 'theme',
			handler: function(){
		            window.location.href=('http://10.0.0.251/SHVPM/QC/ViewReports/RepViewFuelQCReport.php');
			}
		},

            ]
        }
       }), 
     
new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',style: 'background-color: DEC5C0;',
        width:150,
        handler: function () {
            window.location.href=('http://10.0.0.251/SHVPM');
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


