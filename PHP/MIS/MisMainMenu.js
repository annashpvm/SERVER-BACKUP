Ext.onReady(function(){
    Ext.QuickTips.init();
    
    var yearfin  = localStorage.getItem('gstyear'); 
    var compcode = localStorage.getItem('gincompcode');
    var compname = localStorage.getItem('gstcompany');
    var fin      = localStorage.getItem('ginfinid');
    var usertype = localStorage.getItem('ginuser');


var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(

new Ext.Toolbar.SplitButton({
        text: '<b>TEST</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
		{
                    text: '<b>IMPORT FROM EXCEL - MISSING CUSTOMERS</b>',
                    group: 'theme',
                     handler: function(){
                        //window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel.php');
                    //    window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Missing_Customer.php');

                    }
                },
	{
                    text: '<b>IMPORT FROM EXCEL - MISSING SUPPLIERS</b>',
                    group: 'theme',
                     handler: function(){
                    //    window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_suppliers.php');
            window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_SupplierMaster_Missings.php');

                    }
                },

	{
                    text: '<b>IMPORT FROM EXCEL - SUPPLIERS ADDRESS UPDATION </b>',
                    group: 'theme',
                     handler: function(){
                    //    window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_suppliers.php');
            window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Supplier_AddressAll.php');

                    }
                },


               	{
                    text: '<b>IMPORT FROM EXCEL - MIS STOCK</b>',
                    group: 'theme',
                     handler: function(){
             //           window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Stock_Update.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - MISSING LEDGER</b>',
                    group: 'theme',
                     handler: function(){
                      window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Ledger.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - EQUIPMENT MASTER </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_equipment.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - PURCHASE - MISSING ITEM MASTER </b>',
                    group: 'theme',
                     handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_purchaseItemMaster.php');
     window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_purchaseItemMaster_Missings.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - PURCHASE -ITEM MASTER GROUP CHANGE </b>',
                    group: 'theme',
                     handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_purchaseItemMaster.php');
     window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Stores_Item_group_change.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - TRIAL BALANCE OPENING  </b>',
                    group: 'theme',
                     handler: function(){
//      window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Acc_TB_opening.php');
                    }
                },

               	{
                    text: '<b>IMPORT FROM EXCEL - STORES OPENING  </b>',
                    group: 'theme',
                     handler: function(){
      window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Stores_Opening.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - Accounts OPENING BILLS  </b>',
                    group: 'theme',
                     handler: function(){
      window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_Accounts_opening_bills.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL -RM/FU ITEM MASTER  </b>',
                    group: 'theme',
                     handler: function(){
    //  window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_RawmaterialItem.php');
                    }
                },
               	{
                    text: '<b>IMPORT FROM EXCEL - PURCHASE BANK </b>',
                    group: 'theme',
                     handler: function(){
      window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/import_from_Excel_SupplierBank.php');
                    }
                },

               	{
                    text: '<b>EXPORT TO EXCEL </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/export_to_Excel.php');
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/mail.php');
                    }
                },

               	{
                    text: '<b>DRAG  </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/export_to_Excel.php');
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/upload.php');
                    }
                },

         
               	{
                    text: '<b>Mail </b>',
                    group: 'theme',
                     handler: function(){
 //                       window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/export_to_Excel.php');
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/mailsentdb2.php');
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/mail.php');
                  window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/newmail.php');
                    }
                },

         
               	{
                    text: '<b>Json </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/jasontest.php');
                    }
                },
         
               	{
                    text: '<b>PDO </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/PDO.php');
                    }
                },
         
               	{
                    text: '<b>TREE</b>',
                    group: 'theme',
                     handler: function(){

//                  window.location.href=('http://10.0.0.251/SHVPM/MIS/treegridnew/treegrid.html');
                  window.location.href=('http://10.0.0.251/SHVPM/MIS/treegridnew/treegridNew.html');
                    }
                },
               	{
                    text: '<b>table</b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/EXCEL/table.php');
                    }
                },
               	{
                    text: '<b>grid</b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/testgrid/testgrid.php');
                    }
                },

               	{
                    text: '<b>grid - group </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/test/file.php');
                    }
                },
               	{
                    text: '<b> test row edit </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/test/testRowEdit.php');
                    }
                },
               	{
                    text: '<b> LISTVIEW </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/ListView/testListView.html');
                    }
                },
               	{
                    text: '<b> TESTING </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/TestingNew/testingnew.php');
                    }
                },
               	{
                    text: '<b> TRAINING </b>',
                    group: 'theme',
                     handler: function(){

                  window.location.href=('http://10.0.0.251/SHVPM/MIS/Trainee/Trainee.php');
                    }
                },


       ],

}
       
}),

new Ext.Toolbar.SplitButton({
        text: '<b>MASTERS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[
            	{
                    text: '<b>USER MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasUsers/FrmMasUser.php');
                    }
                },
            	{
                    text: '<b>PASSWORD MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasPassword/FrmMasPassword.php');
                    }
                },
            	{
                    text: '<b>DEPARTMENT MASTER </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasDepartment/MasterDepartment.php');
                    }
                },
            ]
        }
}),

new Ext.Toolbar.SplitButton({
        text: '<b>DATA IMPORT FROM TALLY </b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[



            	{
                    text: '<b> Journals  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_Journal.php');
                    }
                },

            	{
                    text: '<b> Cash  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_Cash.php');
                    }
                },

            	{
                    text: '<b> Bank  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_Bank.php');
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/test.php');
                    }
                },



            	{
                    text: '<b> Debit Note - Accounts </b>',
                    group: 'theme',
                    handler: function(){
//                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_DebitNote.php');

                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_DebitNote.php');
                    }
                },



            	{
                    text: '<b> Credit Note - Accounts  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_CreditNote.php');
                    }
                },


            	{
                    text: '<b> Purchases </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_Purchases.php');
                    }
                },
            	{
                    text: '<b> Other Sales </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_OtherSales.php');
                    }
                },

            	{
                    text: '<b> Debit Note Transactions Update from acc_ref  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_DebitNote_Upd.php');
                    }
                },
            	{
                    text: '<b> Credit Note Transactions Update from acc_ref  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_CreditNote_Upd.php');
                    }
                },
                {   
                    text: '<b> Debit Note - Cancel Update  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_DebitNote_cancelled.php');
                    }
                },

                {   
                    text: '<b> BILLS OUTSTANDING UPDATION </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_BillsOutstanding.php');
                    }
                },

/*
            	{
                    text: '<b> Credit Note - Header  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/Import/import_CreditNote_Upd.php');
                    }
                },
*/


       ],


}
       
       }),

new Ext.Toolbar.SplitButton({
        text: '<b>MS ACCESS</b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[



            	{
                    text: '<b> MS Access  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MSACCESS/MSAccess.php');
                    }
                },
		{
                    text: '<b> AR CORRECTION  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasARCorrection/FrmMasARCorrection.php');
                    }
                },





       ],

}
       
       }),
new Ext.Toolbar.SplitButton({
        text: '<b> CORRECTIONS </b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[



            	{
                    text: '<b> Finished Stock Corrections  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasCorrections/frmFinCorrection.php');
                    }
                },
{
                    text: '<b> ReelWeight Change Corrections  </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/MasCorrections/FrmReelWtChangeCorrection.php');
                    }
                },


       ],

}
       
       }),



new Ext.Toolbar.SplitButton({
        text: '<b>RAWMATERIAL  </b>',
        width: 150,
 //       iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

                    {
                        text: '<b>Debit Note - GST -  Delete </b>',
                        group: 'theme',
                        handler: function(){
                            localStorage.setItem("GSTTYPE",'G');   
                            window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnRMDebitNote/FrmTrnRMDebitNote.php');
                        }
                    },
                    {
                        text: '<b>Debit Note - NON GST - Delete</b>',
                        group: 'theme',
                        handler: function(){
                            localStorage.setItem("GSTTYPE",'N');   
                            window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnRMDebitNote/FrmTrnRMDebitNote.php');
                        }
                    },


            ]     
        }
}),

new Ext.Toolbar.SplitButton({
        text: '<b>FUEL  </b>',
        width: 150,
   //     iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

                    {
                        text: '<b>Debit Note - GST -  Delete </b>',
                        group: 'theme',
                        handler: function(){
                            localStorage.setItem("GSTTYPE",'G');   
                            window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnFuDebitNote/FrmTrnFuDebitNote.php');
                        }
                    },
                    {
                        text: '<b>Debit Note - NON GST - Delete</b>',
                        group: 'theme',
                        handler: function(){
                            localStorage.setItem("GSTTYPE",'N');   
                            window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnFuDebitNote/FrmTrnFuDebitNote.php');
                        }
                    },


            ]     
        }
}),


new Ext.Toolbar.SplitButton({
        text: '<b> YEAR OPENING TRANSFER </b>',
        width: 150,
       // iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{
            items:[

            	{
                    text: '<b> New Finance Year Creation </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnFinYearCreation/frmFinYearCreation.php');
                    }
                },    

            	{
                    text: '<b> Stores ITEM - Movement </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnStoresOpeningTransfer/frmStoresItemMovement.php');
                    }
                },


            	{
                    text: '<b> Accounts Ledger Opening Transfer </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnLedgerOpeningTransfer/frmLedgerOpeningTransfer.php');
                    }
                },

            	{
                    text: '<b> Stores Closing Stock -  Opening Transfer </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnStoresOpeningTransfer/frmStoresOpeningTransfer.php');
                    }
                },

            	{
                    text: '<b> Waste Paper Closing Stock -  Opening Transfer </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnWastePaperOpeningTransfer/frmWastePaperOpeningTransfer.php');
                    }
                },
            	{
                    text: '<b> Fuel Closing Stock -  Opening Transfer </b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/MIS/TrnFuelOpeningTransfer/frmFuelOpeningTransfer.php');
                    }
                },



       
          ],

 }
        
       }),


   new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
        handler: function () {
            window.location.href=('http://www.google.com');
        }

   }),
       
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'finyear', style: 'background-color: #F1F5EA',
                width: 130
            }),
			
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'comp', style: 'background-color: #F1F5EA',
                width: 130,
		
            }),

 
   ) 
       
   
   
 tbgeneral.doLayout();
    Ext.getCmp('comp').setText(compname);
    Ext.getCmp('finyear').setText(yearfin);
});
