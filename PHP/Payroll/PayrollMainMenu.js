Ext.onReady(function(){
    Ext.QuickTips.init();
    



var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(

new Ext.Toolbar.SplitButton({
        text: '<b>MASTERS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	{
                    text: '<b>DEPARTMENT MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasDepartment/MasterDepartment.php');
                    }
                },

                
                {
                    text: '<b>DESIGNATION MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasDesignation/MasterDesignation.php');
                    }
                },
       
       
       	 {
                    text: '<b>QUALIFICATION MASTER </b>',
                    group: 'theme',
                   handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasQualification/MasterQualification.php');
                    }
                },
       
       	 {
                    text: '<b>RELIGION MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasReligion/MasterReligion.php');
                    }
                },
       	
       	 {
                    text: '<b>COMMUNITY MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasCommunity/MasterCommunity.php');
                    }
                },
       
       	 {
                    text: '<b>CASTE ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasCaste/MasterCaste.php');
                    }
                },

       	 {
                    text: '<b>DEDUCTION MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasDeduction/MasterDeduction.php');
                    }
                },
       
       	 {
                    text: '<b>DECLARE HOLIDAY MASTER </b>',
                    group: 'theme',
                   /* handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesRate.php');
                    }*/
                },
       
       	 {
                    text: '<b>BANK MASTER </b>',
                    group: 'theme',
                 /*   handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesRate.php');
                    }*/
                },
       
       	 {
                    text: '<b>MILLS DETAILS ENTRY </b>',
                    group: 'theme',
                   /* handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/SALES/MasSalesRate/FrmMasSalesRate.php');
                    }*/
                },
       
       ]}
       
       }),
       
        new Ext.Toolbar.SplitButton({
        text: '<b>EMPLOYEE MASTERS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	{
                    text: '<b>EMPLOYEE DETAILS ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasEmployee/MasterEmployee.php');
                    }
                },
                
                {
                    text: '<b>EMPLOYEE WEEK OFF MODIFICATION </b>',
                    group: 'theme',
                      /*  handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/MasSalesRate/FrmMasSalesRate.php');
                    }*/
                },
                
                {
                    text: '<b>PF NOMINEE MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/TEST/Test.php');
                    }
                },

                {
                    text: '<b> MURALI </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/murali/MasMurali.php');
                    }
                },
                {
                    text: '<b> SALARY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Salary/Salary.php');
                    }
                },
                {
                    text: '<b> PRO </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/pro/Pro.php');
                    }
                },


                ]
                }
                }),
        new Ext.Toolbar.SplitButton({
        text: '<b>DATA ENTRY</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	{
                    text: '<b>ATTENDANCE ENTRY </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Attendanceentry/Attendanceentry.php');
                    }
                },
                {
                    text: '<b>STAFF MONTHLY DEDUCTION(ALL DEDUCTIONS)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/StaffMonthlyDeductions/Staffmonthlydeductionsphp.php');
                    }
                },
                {
                    text: '<b>DEDUCTION ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Deduction entry/Deductionsentryphp.php');
                    }
                },
                {
                    text: '<b>WORKERS - MONTHLY DEDUCTION(ALL DEDUCTIONS)</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Workerdeduction/workersdeductionphp.php');
                    }
                },
                
                
                
                
                ]
                }
                }),
       new Ext.Toolbar.SplitButton({
        text: '<b>PAY COLLECTIONS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[{
                    text: '<b>PAY COLLECTIONS</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Paycollections/Paycollectionsphp.php');
                    }
                },]
                 }
}),
       new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[{
                    text: '<b>PAYSLIP PRINTING</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/Payroll/Payslipprinting/payslipprintingphp.php');
                    }
                },]
                 }
}),  
 
       
   )
            
       
   
   
 tbgeneral.doLayout();
});
