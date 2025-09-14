Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var printtype = "PDF";
   var voutype = 'GJV'


   var vouchertype = '';
   var vouchername = '';

   optionselect ="P";
   optionDate ="P";


   var printtype='PDF';

   var repopt ='Over Due Bills Oustanding';


     var loadCN_DN_Datastore = new Ext.data.Store({
        id: 'loadCN_DN_Datastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"find_column_Ledger"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno','accref_voudate','accrefvoudate','cust_ref','accref_vou_type','accref_vouno','vou_refno','cust_gstin','Qty',
'rate','value1','invamt','GST SALES @ 12%','GST SALES @ 12%(BLUE BOARD)' ,'GST SALES @12% (DUPLEX)', 'GST SALES@12%(PBL)','CGST','SGST','ROUNDED OFF', 'IGST SALES @ 12%','IGST@12% COLLECTED',  'GST SALES RETURN 12%','IGST SALES RETURN 12%','IGST SALES RETURN @12% (PBL)' , 'REBATE AND DISCOUNT PAID','BAD DEBTS - WRITE OFF', 'TCS @01% COLLECTED'])
    });


    var grid_DNCN = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
 //   id: 'my-grid-font', 
   features: [{
        ftype: 'summary'
    }],

style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 350,
        width: 1290,
        border:false,


        enableKeyEvents: true,
        columns: [

            {header: "Seqno", dataIndex: 'accref_seqno',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true },

            {header: "Date", dataIndex: 'accref_voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true},

            {header: "Date", dataIndex: 'accrefvoudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Particulars", dataIndex: 'cust_ref',width:250,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Vou Type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Voucher No", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Ref No", dataIndex: 'vou_refno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "GST IN", dataIndex: 'cust_gstin',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "Qty", dataIndex: 'Qty',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Gross Total", dataIndex: 'invamt',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,summaryType: 'sum',},

            {header: "GST SALES @ 12%", dataIndex: 'GST SALES @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true, },

            {header: "GST SALES @ 12%(BLUE BOARD)", dataIndex: 'GST SALES @ 12%(BLUE BOARD)', width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "GST SALES @12% (DUPLEX)", dataIndex: 'GST SALES @12% (DUPLEX)',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "GST SALES@12%(PBL)", dataIndex: 'GST SALES@12%(PBL)',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "CGST", dataIndex: 'CGST',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "SGST", dataIndex: 'SGST',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "ROUNDE,D OFF", dataIndex: 'ROUNDED OFF',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "IGST@12 COLLECTED", dataIndex: 'ROUNDED OFF',width:110,align:'right',sortable: false, defaultSortable: false,menuDisabled: true,},


            {header: "IGST@12% COLLECTED", dataIndex: 'IGST@12% COLLECTED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "GST SALES RETURN 12%", dataIndex: 'GST SALES RETURN 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "IGST SALES RETURN 12%", dataIndex: 'IGST SALES RETURN 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "IGST SALES RETURN @12% (PBL)", dataIndex: 'IGST SALES RETURN @12% (PBL)',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "REBATE AND DISCOUNT PAID", dataIndex: 'REBATE AND DISCOUNT PAID',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "BAD DEBTS - WRITE OFF", dataIndex: 'BAD DEBTS - WRITE OFF',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "TCS @0.1% COLLECTED", dataIndex: 'TCS @01% COLLECTED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

         ],



         store:loadCN_DN_Datastore,
         listeners :{


            'rowDblClick' : function(grid_CGST,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },
            'rowselect' : function(grid_CGST,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        },



    });



     var loadCN_DN_Datastore2 = new Ext.data.Store({
        id: 'loadCN_DN_Datastore2',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"find_column_Ledger"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno','accref_voudate','accrefvoudate','cust_ref','accref_vou_type','accref_vouno','vou_refno','cust_gstin','Qty','rate','value1','invamt','INPUT CGST@205%','INPUT SGST@205%','WASTE PAPER-GST 5%','INPUT -IGST@5%','WASTE PAPER-IGST 5%','VEHICLE MAINTENANCE GST 18%','INPUT CGST @9%','INPUT SGST @9%','TCS PAID-PURCHASE','MACHINERY MAINTENANCE-GST 18%','CHEMICAL-GST 18%','MACHINERY MAINTENANCE -IGST 18%','INPUT IGST @18%','CREDIT NOTE TO BE RECEIVED', 'CREDIT NOTE TO BE RECEIVED-PURCHASE-GST','CREDIT NOTE TO BE RECEIVED-PURCHASE-IGST','REBATE AND DISCOUNT RECEIVED','MACHINERY MAINTENANCE -IGST 12%','INPUT -IGST @ 12%','INTEREST TO BE RECEIVED','IGST SALES @ 12%','IGST SALES @ 12%(PBL)',
'IGST@12% COLLECTED','BIO FUEL GST 12%','INPUT -CGST @ 6%','INPUT -SGST @ 6%','SUNDRY EXPENSE',
'VEHICLE MAINTENANCE GST 28%','INPUT CGST@14%','INPUT SGST@14%','ROUNDED OFF'


])
    });



     var load_JV_Datastore = new Ext.data.Store({
        id: 'load_JV_Datastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"find_column_Ledger"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno','accref_voudate','accrefvoudate','cust_ref','accref_vou_type','accref_vouno','vou_refno','cust_gstin','Qty','rate','value1','invamt','INPUT CGST@205%','INPUT SGST@205%','WASTE PAPER-GST 5%','INPUT -IGST@5%','WASTE PAPER-IGST 5%','VEHICLE MAINTENANCE GST 18%','INPUT CGST @9%','INPUT SGST @9%','TCS PAID-PURCHASE','MACHINERY MAINTENANCE-GST 18%','CHEMICAL-GST 18%','MACHINERY MAINTENANCE -IGST 18%','INPUT IGST @18%','CREDIT NOTE TO BE RECEIVED','REBATE AND DISCOUNT RECEIVED','MACHINERY MAINTENANCE -IGST 12%','INPUT -IGST @ 12%','INTEREST TO BE RECEIVED','IGST SALES @ 12%','IGST SALES @ 12%(PBL)',
'IGST@12% COLLECTED','BIO FUEL GST 12%','INPUT -CGST @ 6%','INPUT -SGST @ 6%','SUNDRY EXPENSE',
'VEHICLE MAINTENANCE GST 28%','INPUT CGST@14%','INPUT SGST@14%','ROUNDED OFF'

])
    });

    var grid_JV = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
 //   id: 'my-grid-font', 
   features: [{
        ftype: 'summary'
    }],

style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 350,
        width: 1260,
        border:false,


        enableKeyEvents: true,
        columns: [

            {header: "Seqno", dataIndex: 'accref_seqno',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true },

            {header: "Date", dataIndex: 'accref_voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true},

            {header: "Date", dataIndex: 'accrefvoudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Particulars", dataIndex: 'cust_ref',width:250,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Vou Type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Voucher No", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Ref No", dataIndex: 'vou_refno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "GST IN", dataIndex: 'cust_gstin',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "Qty", dataIndex: 'Qty',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Gross Total", dataIndex: 'invamt',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,summaryType: 'sum',},

            {header: "INPUT CGST@2.5%", dataIndex: 'INPUT CGST@205%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true, },

            {header: "INPUT SGST@2.5%", dataIndex: 'INPUT SGST@205%', width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "WASTE PAPER-GST 5%", dataIndex: 'WASTE PAPER-GST 5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST@5%", dataIndex: 'INPUT -IGST@5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "WASTE PAPER-IGST 5%", dataIndex: 'WASTE PAPER-IGST 5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "VEHICLE MAINTENANCE GST 18%", dataIndex: 'VEHICLE MAINTENANCE GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "INPUT CGST @9%", dataIndex: 'INPUT CGST @9%',width:110,align:'right',sortable: false, defaultSortable: false,menuDisabled: true,},


            {header: "INPUT SGST @9%", dataIndex: 'INPUT SGST @9%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "TCS PAID-PURCHASE", dataIndex: 'TCS PAID-PURCHASE',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "MACHINERY MAINTENANCE-GST 18%", dataIndex: 'MACHINERY MAINTENANCE-GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "CHEMICAL-GST 18%", dataIndex: 'CHEMICAL-GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "MACHINERY MAINTENANCE -IGST 18%", dataIndex: 'MACHINERY MAINTENANCE -IGST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT IGST @18%", dataIndex: 'INPUT IGST @18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "CREDIT NOTE TO BE RECEIVED", dataIndex: 'CREDIT NOTE TO BE RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "REBATE AND DISCOUNT RECEIVED", dataIndex: 'REBATE AND DISCOUNT RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "MACHINERY MAINTENANCE -IGST 12%", dataIndex: 'MACHINERY MAINTENANCE -IGST 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST @ 12%", dataIndex: 'INPUT -IGST @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},





            {header: "INTEREST TO BE RECEIVED", dataIndex: 'INTEREST TO BE RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "IGST SALES @ 12%", dataIndex: 'IGST SALES @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "IGST SALES @ 12%(PBL)", dataIndex: 'IGST SALES @ 12%(PBL)',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "IGST@12% COLLECTED", dataIndex: 'IGST@12% COLLECTED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "BIO FUEL GST 12%", dataIndex: 'BIO FUEL GST 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -CGST @ 6%", dataIndex: 'INPUT -CGST @ 6%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -SGST @ 6%", dataIndex: 'INPUT -SGST @ 6%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST @ 12%", dataIndex: 'INPUT -IGST @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "SUNDRY EXPENSE", dataIndex: 'SUNDRY EXPENSE',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "VEHICLE MAINTENANCE GST 28%", dataIndex: 'VEHICLE MAINTENANCE GST 28%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT CGST@14%", dataIndex: 'INPUT CGST@14%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "INPUT SGST@14%", dataIndex: 'INPUT SGST@14%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},




            {header: "ROUNDED OFF", dataIndex: 'ROUNDED OFF',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},
         ],



         store:load_JV_Datastore,
         listeners :{


            'rowDblClick' : function(grid_CGST,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },
            'rowselect' : function(grid_CGST,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        },



    });



    var grid_DNCN2 = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
 //   id: 'my-grid-font', 
   features: [{
        ftype: 'summary'
    }],

style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 350,
        width: 1260,
        border:false,


        enableKeyEvents: true,
        columns: [

            {header: "Seqno", dataIndex: 'accref_seqno',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true },

            {header: "Date", dataIndex: 'accref_voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,hidden : true},

            {header: "Date", dataIndex: 'accrefvoudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Particulars", dataIndex: 'cust_ref',width:250,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Vou Type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true },

            {header: "Voucher No", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Ref No", dataIndex: 'vou_refno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "GST IN", dataIndex: 'cust_gstin',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "Qty", dataIndex: 'Qty',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "Gross Total", dataIndex: 'invamt',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,summaryType: 'sum',},

            {header: "INPUT CGST@2.5%", dataIndex: 'INPUT CGST@205%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true, },

            {header: "INPUT SGST@2.5%", dataIndex: 'INPUT SGST@205%', width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "WASTE PAPER-GST 5%", dataIndex: 'WASTE PAPER-GST 5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST@5%", dataIndex: 'INPUT -IGST@5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "WASTE PAPER-IGST 5%", dataIndex: 'WASTE PAPER-IGST 5%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "VEHICLE MAINTENANCE GST 18%", dataIndex: 'VEHICLE MAINTENANCE GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "INPUT CGST @9%", dataIndex: 'INPUT CGST @9%',width:110,align:'right',sortable: false, defaultSortable: false,menuDisabled: true,},


            {header: "INPUT SGST @9%", dataIndex: 'INPUT SGST @9%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "TCS PAID-PURCHASE", dataIndex: 'TCS PAID-PURCHASE',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "MACHINERY MAINTENANCE-GST 18%", dataIndex: 'MACHINERY MAINTENANCE-GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "CHEMICAL-GST 18%", dataIndex: 'CHEMICAL-GST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "MACHINERY MAINTENANCE -IGST 18%", dataIndex: 'MACHINERY MAINTENANCE -IGST 18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT IGST @18%", dataIndex: 'INPUT IGST @18%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "CREDIT NOTE TO BE RECEIVED", dataIndex: 'CREDIT NOTE TO BE RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "REBATE AND DISCOUNT RECEIVED", dataIndex: 'REBATE AND DISCOUNT RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "CREDIT NOTE TO BE RECEIVED-PURCHASE-GST'", dataIndex: 'CREDIT NOTE TO BE RECEIVED-PURCHASE-GST',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "CREDIT NOTE TO BE RECEIVED-PURCHASE-IGST", dataIndex: 'CREDIT NOTE TO BE RECEIVED-PURCHASE-IGST',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "MACHINERY MAINTENANCE -IGST 12%", dataIndex: 'MACHINERY MAINTENANCE -IGST 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST @ 12%", dataIndex: 'INPUT -IGST @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},





            {header: "INTEREST TO BE RECEIVED", dataIndex: 'INTEREST TO BE RECEIVED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "IGST SALES @ 12%", dataIndex: 'IGST SALES @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "IGST SALES @ 12%(PBL)", dataIndex: 'IGST SALES @ 12%(PBL)',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "IGST@12% COLLECTED", dataIndex: 'IGST@12% COLLECTED',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "BIO FUEL GST 12%", dataIndex: 'BIO FUEL GST 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -CGST @ 6%", dataIndex: 'INPUT -CGST @ 6%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -SGST @ 6%", dataIndex: 'INPUT -SGST @ 6%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT -IGST @ 12%", dataIndex: 'INPUT -IGST @ 12%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "SUNDRY EXPENSE", dataIndex: 'SUNDRY EXPENSE',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "VEHICLE MAINTENANCE GST 28%", dataIndex: 'VEHICLE MAINTENANCE GST 28%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "INPUT CGST@14%", dataIndex: 'INPUT CGST@14%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},


            {header: "INPUT SGST@14%", dataIndex: 'INPUT SGST@14%',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},




            {header: "ROUNDED OFF", dataIndex: 'ROUNDED OFF',width:110,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,},
         ],



         store:loadCN_DN_Datastore2,
         listeners :{


            'rowDblClick' : function(grid_CGST,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },
            'rowselect' : function(grid_CGST,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =grid_CGST.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        },



    });

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date() ,
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              monthenddate.setValue(monthstartdate.getValue());
              loadvoucherList();
           },
           keyup:function(){
              monthenddate.setValue(monthstartdate.getValue());
              loadvoucherList();
            },
           change:function(){
              monthenddate.setValue(monthstartdate.getValue());
              loadvoucherList();
            },
        }  	

 
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });





function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 

    lblDetail.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    rmon = ("0"+mmon).slice(-2);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;
//    alert(monthstartdate);  
//    alert(monthenddate);  

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

 //    alert(monthstartdate);  
//    alert(monthenddate);  


         
	loadVouTypeListDataStore.removeAll();
	loadVouTypeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouTypeList',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{


		}
	    });
     
}




     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    



 var loadVouTypeListDataStore = new Ext.data.Store({
      id: 'loadVouTypeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouTypeList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['accref_vou_type','vou_name','nos' ]),
    });

 var loadVouNoDataStore = new Ext.data.Store({
      id: 'loadVouNoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'accref_vou_type','accref_seqno','accref_vouno','accref_payref_no','accref_voudate','cust_name','acctran_dbamt','acctran_cramt','acctran_led_code' ]),
    });



var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});

var txttotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtdbt',
        name        : 'txtdbt',
        width       : 120,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txtcredit',
        name        : 'txtcredit',
        width       : 120,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

var optSelect = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optSelect',
        items: [
		{boxLabel: 'PartyWise', name: 'optSelect', id:'prtPartywise', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionselect ="P";
                                            loadvoucherList();

					}
				}
			}
		},
		{boxLabel: 'All Details', name: 'optSelect', id:'optAllDetails', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionselect ="A";
                                            loadvoucherList();
					}
				}
			}
		},
            
        ],
    }



    ]
});

var optDate = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optDate',
        items: [
		{boxLabel: 'Period', name: 'optDate', id:'optPeriod', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionDate ="P";
                                            loadvoucherList();

					}
				}
			}
		},
		{boxLabel: 'For Date', name: 'optDate', id:'optDate', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionDate ="D";
                                            loadvoucherList();
					}
				}
			}
		},
            
        ],
    }



    ]
});

   var txttotProdQty = new Ext.form.NumberField({
        fieldLabel  : 'Prodn Qty',
        id          : 'txttotProdQty',
        name        : 'txttotProdQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txttotSalesQty',
        name        : 'txttotSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Inv.Amout',
        id          : 'txttotSalesValue',
        name        : 'txttotSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



   var txtSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtSalesQty',
        name        : 'txtSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Inv.Amt',
        id          : 'txtSalesValue',
        name        : 'txtSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

var btnBack = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "BACK",
	width   : 80,
	height  : 35,
	x       : 700,
	y       : 430,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
                 flxVouTypeList.show(); 

                 grid_tot_party();
       	 }
        }   
});


  function grid_tot(){
	totdb="";
        totcr="";
//alert("Hello");
        var Row1= flxVouNoDetail.getStore().getCount();
        flxVouNoDetail.getSelectionModel().selectAll();
        var sele=flxVouNoDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totdb=Number(totdb)+Number(sele[i].data.acctran_dbamt);
            totcr=Number(totcr)+Number(sele[i].data.acctran_cramt);
        }
        txttotdebit.setRawValue(Ext.util.Format.number(totdb,"0.00"));
        txttotcredit.setRawValue(Ext.util.Format.number(totcr,"0.00"));
}






function loadvoucherList()
{
    loadVouNoDataStore.removeAll();
    loadVouNoDataStore.load({
	url: 'ClsViewStatements.php',
	params: {
    	task: 'loadVouNoList',
	compcode:Gincompcode,
	finid:GinFinid,
        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),  
        enddate  : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),  
        voutype  : vouchertype, 
        ledtype  : optionselect, 
	},
	scope:this,
	callback:function()
	{

           grid_tot();
	}
    });

}


var dgrecord = Ext.data.Record.create([]);
var flxVouTypeList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:40,
    height: 385,
    hidden:false,
    width: 380,
    id: 'my-grid5',  

    columns:
    [ 	 	
        {header: "Vou type" , dataIndex: 'accref_vou_type',sortable:false,width:60,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('accref_vou_type');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }},
        {header: "Vou Name" , dataIndex: 'vou_name',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Vouchers" , dataIndex: 'nos',sortable:false,width:60,align:'left', menuDisabled: true},

    ],
    store:loadVouTypeListDataStore,
    listeners:{	

            'cellclick': function (flxVouTypeList, rowIndex, cellIndex, e) {
		var sm = flxVouTypeList.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));
            vouchertype = selrow.get('accref_vou_type')
            vouchername = selrow.get('vou_name')
            loadvoucherList();



     
    }
 }
});



var flxVouNoDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:180,
    y:40,
    height: 385,
    hidden:false,
    width: 750,
 //   id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Vou Type" , dataIndex: 'accref_vou_type',sortable:false,width:60,align:'left', menuDisabled: true,hidden : true
},
        {header: "Seq No" , dataIndex: 'accref_seqno',sortable:true,width:125,align:'center', menuDisabled: true,hidden : true
},
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:true,width:100,align:'center', menuDisabled: true,
},
        {header: "Ref/Inv No" , dataIndex: 'accref_payref_no',sortable:false,width:110,align:'left', menuDisabled: true,
},
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:true,width:90,align:'center', menuDisabled: false},
        {header: "Ledger" , dataIndex: 'cust_name',sortable:true,width:260,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('cust_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }},
        {header: "Debit" , dataIndex: 'acctran_dbamt',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "Credit" , dataIndex: 'acctran_cramt',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "Head Code" , dataIndex: 'acctran_led_code',sortable:false,width:80,align:'right', menuDisabled: true,hidden : true},

    ],
    store:loadVouNoDataStore,
    listeners:{	

            'cellDblclick': function (flxVouTypeList, rowIndex, cellIndex, e) {



		var sm = flxVouTypeList.getSelectionModel();
		var selrow = sm.getSelected();


                voutype = selrow.get('accref_vou_type');


                    if (voutype == "GJV")
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param, '_blank');
                    }     
                    else if (voutype == "CHR" || voutype == "BKR")
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&seqno="+encodeURIComponent( selrow.get('accref_seqno'));
 		    var param = (p1+p2+p3) ;

                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param, '_blank');
                    }       
                    else if (voutype == "CHP"  || voutype == "BKP" )
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&seqno="+encodeURIComponent( selrow.get('accref_seqno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&seqno="+encodeURIComponent( selrow.get('accref_seqno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNoteAcc.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNoteAcc.rptdesign' + param, '_blank');
                    }   
                    else if (voutype == "GSI" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&invno="+encodeURIComponent( selrow.get('accref_payref_no'));
                    i1 = "ORIGINAL FOR BUYER";
         	    var p4 = "&displayword=" + encodeURIComponent(i1);
                    var param = (p1 + p2 + p3 + p4  ); 
                    if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                    else
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign'+ param); 
                    }  
                    else if (voutype == "OSI" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&invno="+encodeURIComponent( selrow.get('accref_payref_no'));
                    i1 = "ORIGINAL FOR BUYER";
         	    var p4 = "&displayword=" + encodeURIComponent(i1);
                    var param = (p1 + p2 + p3 + p4  ); 


                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf' + param);  
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                    }   
                    else if (voutype == "PWP" || voutype == "PIW" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param);
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param);  
                    }    
                    else if (voutype == "PFU" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var param = (p1 + p2 + p3 ); 

                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 
                    }  
                    else if (voutype == "PGS" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 ="&minno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var p4 ="&purtype="+encodeURIComponent(voutype);
                    var param = (p1 + p2 + p3 + p4 ); 
                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
                    }  
    }
 }
});


var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
	flxVouNoDetail.getStore().removeAll();     
	loadVouNoDataStore.removeAll();

	loadVouNoDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouNoList',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                voutype    : vouchertype, 
                ledtype    : optionselect, 
		},

       	scope:this,
		callback:function()
                { 

       grid_tot();
                     var cnt=loadVouNoDataStore.getCount();
                        if(cnt>0){
                        }
                }

	    });

                 grid_tot();
       	 }
        }   
});

  
    var btnColumnPrint_CreditNote = new Ext.Button({
        style: 'text-align:center;',
        text: " PRINT",
        width: 60,
        id: 'btnColumnPrint_CreditNote',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


	            var p1 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p2 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p3 = "&ledname="+encodeURIComponent("CREDIT NOTE");
 		    var param = (p1+p2+p3) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Credit_Note.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Credit_Note.rptdesign&__format=XLS'+ param , '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Credit_Note.rptdesign'+ param , '_blank');
       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });



    var btnColumnPrint_JV = new Ext.Button({
        style: 'text-align:center;',
        text: " PRINT",
        width: 60,
        id: 'btnColumnPrint_JV',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


	            var p1 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p2 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p3 = "&ledname="+encodeURIComponent("DEBIT NOTE");
 		    var param = (p1+p2+p3) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/new_report_1.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/new_report_1.rptdesign&__format=XLS'+ param , '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/new_report_1.rptdesign'+ param , '_blank');
       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });


    var btnColumnPrint_DebitNote = new Ext.Button({
        style: 'text-align:center;',
        text: " PRINT",
        width: 60,
        id: 'btnColumnPrint_DebitNote',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


	            var p1 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p2 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p3 = "&ledname="+encodeURIComponent("DEBIT NOTE");
 		    var param = (p1+p2+p3) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Debit_Note.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Debit_Note.rptdesign&__format=XLS'+ param , '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/Rep_Column_Debit_Note.rptdesign'+ param , '_blank');
       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });


    var btnColumnAR = new Ext.Button({
        style: 'text-align:center;',
        text: " -  Columnar  -",
//        text: " Ledger Print",
        width: 60,
        id: 'btnColumnAR',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		    var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
		    var p2 = "&finid=" + encodeURIComponent(GinFinid);

	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));            
		    var p5 = "&voucher_type="+encodeURIComponent(vouchertype);
		    var p6 = "&voucher_name="+encodeURIComponent(vouchername);

 		    var param = (p1+p2+p3+p4+p5+p6) ;

if (vouchertype == "GJV")
{
		    if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeJV.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
	                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeJV.rptdesign&__format=XLS&'+ param , '_blank');
		    else
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeJV.rptdesign'+ param , '_blank');
}

else if (vouchertype == "CHP" || vouchertype == "CHR" )
{
		    if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeCash.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
	                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeCash.rptdesign&__format=XLS&'+ param , '_blank');
		    else
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeCash.rptdesign'+ param , '_blank');
}
else
{
		    if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign&__format=pdf&'+ param,  '_blank' );
		    else if (printtype == "XLS") 
	                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign&__format=XLS&'+ param , '_blank');
		    else
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_ColumnVouTypeOthers.rptdesign'+ param , '_blank');
}



       /*
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');*/	

                }
            }
    });






    var btnColumnSelect = new Ext.Button({
        style: 'text-align:center;',
        text: " Columnar - New ",
        width: 60,
        id: 'btnColumnSelect',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {

            click: function () {

                  if (vouchertype == '')
                     alert("Select Voucher Type...");
                  else
                  {       

		    var tabPanel = Ext.getCmp('tabOverall');

                    var table_name = "";


                    if (vouchertype == "CNG" || vouchertype == "CNN" )
                    { 
                	tabPanel.unhideTabStripItem(1);
                        tabPanel.setActiveTab(1);     
                	tabPanel.hideTabStripItem(2); 
                	tabPanel.hideTabStripItem(3);
                	tabPanel.hideTabStripItem(4);  
                	tabPanel.hideTabStripItem(5);
                        table_name = "temp_column_Debit_Credit_Note"; 
                 	grid_DNCN.getStore().removeAll();
                        loadCN_DN_Datastore.removeAll();
 		        loadCN_DN_Datastore.load({
			   url: 'ClsViewStatements.php',  
			   params:
			   {
				    task:"find_column_Ledger",
				    fcompcode : Gincompcode,
				    finid     : GinFinid,
                                    startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                                    enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
//                                    voutype   : 'CNG,CNN',
                                    voutype   :  vouchertype,
                                    tablename : table_name,
        
                                     	
			  },
			  callback:function(){
	//		alert(loadCN_DN_Datastore.getCount());
			  }
                        });
                    } 

 
                    if (vouchertype == "DNG" || vouchertype == "DNN"  || vouchertype == "SDN" )
                    { 
                	tabPanel.unhideTabStripItem(2);
                        tabPanel.setActiveTab(2);     
                	tabPanel.hideTabStripItem(1); 
                	tabPanel.hideTabStripItem(3);
                	tabPanel.hideTabStripItem(4);  
                	tabPanel.hideTabStripItem(5);
                        table_name = "temp_column_Debit_Credit_Note"; 
                 	grid_DNCN2.getStore().removeAll();
                        loadCN_DN_Datastore2.removeAll();
 		        loadCN_DN_Datastore2.load({
			   url: 'ClsViewStatements.php',  
			   params:
			   {
				    task:"find_column_Ledger",
				    fcompcode : Gincompcode,
				    finid     : GinFinid,
                                    startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                                    enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
 //                                   voutype   : 'DNG,DNN,SDN',
                                    voutype   :  vouchertype,
                                    tablename : table_name,
        
                                     	
			  },
			  callback:function(){
			
				    var cnt = loadCN_DN_Datastore2.getCount();

alert(cnt);
				    if (cnt >0)
				    {

                                     }
			  }
                        });
                    } 
/*
                    if (vouchertype == "GJV" )
                    { 
                	tabPanel.unhideTabStripItem(3);
                        tabPanel.setActiveTab(3);     
                	tabPanel.hideTabStripItem(1); 
                	tabPanel.hideTabStripItem(2);
                	tabPanel.hideTabStripItem(4);  
                	tabPanel.hideTabStripItem(5);
                        table_name = "temp_column_JV"; 
                 	grid_DNCN2.getStore().removeAll();
                        loadCN_DN_Datastore2.removeAll();
 		        loadCN_DN_Datastore2.load({
			   url: 'ClsViewStatements.php',  
			   params:
			   {
				    task:"find_column_Ledger_JV",
				    fcompcode : Gincompcode,
				    finid     : GinFinid,
                                    startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                                    enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                                    voutype   : 'GJV',
                                    tablename : table_name,
        
                                     	
			  },
			  callback:function(){
			
			  }
                        });
                    } 
*/

                    }  
                  }

      }
  });

   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {

//Panel 0
        xtype: 'panel',
        title: 'Voucher List',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [

		{ 
		     xtype   : 'fieldset',
		     title   : '',
		     border  : false,
		     x       : 10,
		     y       : 0,
		     items: [flxVouTypeList]
		},

		{ 
		     xtype   : 'fieldset',
		     title   : '',
		     border  : false,
		     x       : 410,
		     y       : 0,
		     items: [flxVouNoDetail]
		},	

		{
		xtype       : 'fieldset',
		width       : 800,
		height      : 100,
		labelWidth  : 100,
		x           : 520,
		y           : 385,
		border      : false,
		anchor: '100%',
		items : [txttotdebit]
		},


		{
		xtype       : 'fieldset',
		width       : 800,
		height      : 100,
		labelWidth  : 100,
		x           : 800,
		y           : 385,
		border      : false,
		anchor: '100%',
		items : [txttotcredit]

		},



		{
		xtype       : 'fieldset',
		width       : 200,

		labelWidth  : 1,
		x           : 1170,
		y           : 150,
		border      : false,
		items : [btnColumnAR]
		},


		{
		xtype       : 'fieldset',
		width       : 200,

		labelWidth  : 1,
		x           : 1170,
		y           : 205,
		border      : false,
		items : [btnColumnSelect]
		},


        ] 
     },

     {
 
//Panel 1
        xtype: 'panel',
        title: 'COLUMNAR - CREDIT NOTE',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height      : 500,
			    x           : 10,
			    y           : 40,
			    border      : false,
			    items : [grid_DNCN]
			},


		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 10,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnColumnPrint_CreditNote]
		},
        ]
     }  ,

  
     {
 
//Panel 2
        xtype: 'panel',
        title: 'COLUMNAR - DEBIT NOTE',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1300,
			    height      : 500,
			    x           : 10,
			    y           : 40,
			    border      : false,
	           	    items : [grid_DNCN2]
			},


		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 10,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnColumnPrint_DebitNote]
		},
        ]
     }  ,
  
     {
 
//Panel 3
        xtype: 'panel',
        title: 'COLUMNAR - JV',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1300,
			    height      : 500,
			    x           : 10,
			    y           : 40,
			    border      : false,
			    items : [grid_JV]
			},


		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 10,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnColumnPrint_JV]
		},
        ]
     }  ,      

    ]  
});


   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 890,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
//view
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

       
//                    var fdate=Ext.getCmp('monthstartdate').value;
//                    var tdate=Ext.getCmp('monthenddate').value;
//                    var d1 =  fdate + " 00:00:00.000";
//                    var d2 =  tdate + " 00:00:00.000";


             

                    var vou = "&voutype="+encodeURIComponent(vouchertype);
                    var fd = "&fmdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                    var td = "&tdate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var comp = "&comp="+encodeURIComponent(Gincompcode);

                    var param = (vou+fd+td+comp) ;


if  (optionselect == "P")
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign' + param, '_blank');

/*             
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign' + param, '_blank');	
*/
else
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=xls' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign' + param, '_blank');

		}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                           ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,

                items:[

	
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 0,
                             items: [cmbMonth]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 0,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 0,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 0,
                             items: [btnProcess]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 120,
			layout  : 'absolute',
			x       : 800,
			y       : -10,
			items:[optSelect],
		},	
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 120,
			layout  : 'absolute',
			x       : 900,
			y       : -10,
			items:[optDate],
		},	
		
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 250,
			layout  : 'absolute',
			x       : 1050,
			y       : -10,
			items:[optprinttype],
		},
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 500,
			width   : 1400,
			layout  : 'absolute',
			x       : 10,
			y       : 50,
			items:[tabOverall],
		},
/*

*/	
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {

	var tabPanel = Ext.getCmp('tabOverall');
	tabPanel.hideTabStripItem(1); 
	tabPanel.hideTabStripItem(2); 
	tabPanel.hideTabStripItem(3);
	tabPanel.hideTabStripItem(4);  
	tabPanel.hideTabStripItem(5);

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(parseInt(m1));
        find_dates(parseInt(m1));



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 610,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'VOUCHER Details',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	onEsc:function(){

	},
	listeners:{
               show:function(){

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
