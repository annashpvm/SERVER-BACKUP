Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gsttype='R';
    var GinFinid=localStorage.getItem('ginfinid');
    var gstfinyear=localStorage.getItem('gstyear');
    var GinCompcode =localStorage.getItem('gincompcode');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');


    var dgadjrecord = Ext.data.Record.create([]);
    var gstfin='';


var printtype = "PDF";

var ledgercode = 0;
var ledtype    = '';
var partycode  = 0;

var vouchertype = 'BKR';
var vouseqno = 0;

var vouno = '';
const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 


var seqno    =  0;
var invno    =  '';
var invdate  =  new Date();

var voudate  =  new Date();
var invwt    =  0;
var invvalue =  0;
var tobeadjust  =  0;
var totaladjusted = 0;
var crdays = 0;

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       
            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                chk_adjustments();      
            }
        }]);
new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                BillAdjustmentEntryFormPanel.hide();
            }
        }]);




 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_type'
      ]),
    });


 var loadCreditNoteListDatastore = new Ext.data.Store({
      id: 'loadCreditNoteListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCreditNotelist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dbcr_seqno', 'dbcr_vouno', 'dbcr_date', 'voudate', 'dbcr_value'
      ]),
    });



 var loadCreditNoteDetailsDatastore = new Ext.data.Store({
      id: 'loadCreditNoteDetailsDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCreditNote_Adjusted"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'ref_docno', 'ref_docdate', 'invdate', 'ref_adjvouno', 'accref_voudate', 'voudate', 'ref_invno', 'ref_invdate', 'refinvdate', 'ref_adjamount'
      ]),
    });


 var loadCreditNoteInvoiceDetailsDatastore = new Ext.data.Store({
      id: 'loadCreditNoteInvoiceDetailsDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCreditNote_InvDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cn_invno', 'cn_invdate','invdate', 'cn_qty', 'cn_invamt', 'cn_pendingamt', 'cn_adjusted', 'cn_balance', 'cd_value', 'cd_cgst', 'cd_sgst', 'cd_round', 'cd_amount'


      ]),
    });


function grid_tot1(){
        var dr = 0;
        txtTotal.setRawValue(0);
        var selrows = flxCreditNote.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxCreditNote.getStore().getAt(i);
            dr = dr + Number(rec.get('dbcr_value'));

        }

        txtTotal.setRawValue(Ext.util.Format.number(dr,'0.00'));
}


function grid_tot2(){
        var dr = 0;
        txtAdjTotal.setRawValue(0);
        var selrows = flxCreditNoteAdjustments.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxCreditNoteAdjustments.getStore().getAt(i);
            dr = dr + Number(rec.get('ref_adjamount'));

        }

        txtAdjTotal.setRawValue(Ext.util.Format.number(dr,'0.00'));
}



function grid_tot3(){
        var cdvalue = 0;
        var cdcgst  = 0;
        var cdsgst  = 0;
        var cdamount  = 0;

        txtTaxValue.setRawValue(0);
        txtCGST.setRawValue(0);
        txtSGST.setRawValue(0);

        var selrows = flxCreditNoteDetails.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxCreditNoteDetails.getStore().getAt(i);
            cdvalue = cdvalue + Number(rec.get('cd_value'));
            cdcgst  = cdcgst + Number(rec.get('cd_cgst'));
            cdsgst  = cdsgst + Number(rec.get('cd_cgst'));
            cdamount  = cdamount + Number(rec.get('cd_amount'));

        }

        txtTaxValue.setRawValue(Ext.util.Format.number(cdvalue,'0.00'));
        txtCGST.setRawValue(Ext.util.Format.number(cdcgst,'0.00'));
        txtSGST.setRawValue(Ext.util.Format.number(cdsgst,'0.00'));
        txtCDAmount.setRawValue(Ext.util.Format.number(cdamount,'0.00'));

}


var txtTaxValue = new Ext.form.NumberField({
fieldLabel: 'Tax Value',
id: 'txtTaxValue',
width: 90,
name: 'txtTaxValue',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});

var txtCGST = new Ext.form.NumberField({
fieldLabel: 'CGST',
id: 'txtCGST',
width: 80,
name: 'txtCGST',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});

var txtSGST = new Ext.form.NumberField({
fieldLabel: 'SGST',
id: 'txtSGST',
width: 80,
name: 'txtSGST',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});


var txtCDAmount = new Ext.form.NumberField({
fieldLabel: 'CD AMOUNT',
id: 'txtCDAmount',
width: 100,
name: 'txtCDAmount',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});



var txtTotal = new Ext.form.NumberField({
fieldLabel: 'Total',
id: 'txtTotal',
width: 120,
name: 'txtTotal',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});


var txtAdjTotal = new Ext.form.NumberField({
fieldLabel: 'Total',
id: 'txtAdjTotal',
width: 120,
name: 'txtAdjTotal',
readOnly : true,
labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
	    'color':'#900C3F ',readOnly:true,'text-align': 'right',
	    'style': 'Helvetica',
	    'font-size': '14px','font-weight':'bold'
	},
});



function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsBillAdjustments.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}



    var dgrecord = Ext.data.Record.create([]);

    var flxCreditNote = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 350,
        x: 10,
        y: 40,
        id: 'my-grid',  


        columns: [         
            {header: "SeqNO", dataIndex: 'dbcr_seqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Vou. No.", dataIndex: 'dbcr_vouno',sortable:true,width:120,align:'center'},
            {header: "Date", dataIndex: 'dbcr_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Date", dataIndex: 'voudate',sortable:true,width:110,align:'center',hidden : false},
            {header: "CD AMOUNT", dataIndex: 'dbcr_value',sortable:true,width:110,align:'center'},
        ],
        store: loadCreditNoteListDatastore,

        listeners:{	

	       'cellDblclick': function (flxCreditNote, rowIndex, cellIndex, e) {
			var sm = flxCreditNote.getSelectionModel();
			var selrow = sm.getSelected();
	
		        vouno      = selrow.get('dbcr_vouno');

		    flxCreditNoteAdjustments.getStore().removeAll();

		    loadCreditNoteDetailsDatastore.removeAll();
		    loadCreditNoteDetailsDatastore.load({
			url: 'ClsBillAdjustments.php',
			params:
			{
			    task     : "loadCreditNote_Adjusted",
			    fincode  : GinFinid,
			    compcode : GinCompcode,
			    ledcode  : ledgercode ,
			    vouno    : vouno,

			},
			callback: function () {
		 	   var cnt = loadCreditNoteListDatastore.getCount();
			   grid_tot2();

			}
		    }); 

		    flxCreditNoteDetails.getStore().removeAll();

		    loadCreditNoteInvoiceDetailsDatastore.removeAll();
		    loadCreditNoteInvoiceDetailsDatastore.load({
			url: 'ClsBillAdjustments.php',
			params:
			{
			    task     : "loadCreditNote_InvDetails",
			    fincode  : GinFinid,
			    compcode : GinCompcode,
			    ledcode  : ledgercode ,
			    vouno    : vouno,

			},
			callback: function () {
		 	   var cnt = loadCreditNoteInvoiceDetailsDatastore.getCount();
			   grid_tot3();
      //                     txtCDAmount.setRawValue(loadCreditNoteInvoiceDetailsDatastore.getAt(0).get('cd_amount'));


			}
		    }); 


		 }
         } 

    });



    var flxCreditNoteAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 170,
        width: 800,
        x: 400,
        y: 40,
        id: 'my-grid2',  



        columns: [         
            {header: "Inv No", dataIndex: 'ref_docno',sortable:true,width:110,align:'left',hidden : false},
            {header: "Inv Date", dataIndex: 'ref_docdate',sortable:true,width:120,align:'center',hidden : true},
            {header: "INv Date", dataIndex: 'invdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "GRN No", dataIndex: 'ref_adjvouno',sortable:true,width:110,align:'center',hidden : false},
            {header: "GRN Date", dataIndex: 'accref_voudate',sortable:true,width:110,align:'left',hidden : true},
            {header: "GRN Date", dataIndex: 'voudate',sortable:true,width:120,align:'center'},
            {header: "Sup.Inv.No", dataIndex: 'ref_invno',sortable:true,width:110,align:'center',hidden : false},
            {header: "Sup.Inv.Date", dataIndex: 'ref_invdate',sortable:true,width:110,align:'center',hidden : true},
            {header: "Sup.Inv.Date", dataIndex: 'refinvdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "Adj AMOUNT", dataIndex: 'ref_adjamount',sortable:true,width:110,align:'center'},
        ],
        store: loadCreditNoteDetailsDatastore,
    });




    var flxCreditNoteDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm1: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 140,
        width: 800,
        x: 400,
        y: 240,
       id: 'my-grid3',  



        columns: [         
            {header: "Inv No", dataIndex: 'cn_invno',sortable:true,width:110,align:'left',hidden : false},
            {header: "Inv Date", dataIndex: 'cn_invdate',sortable:true,width:120,align:'center',hidden : true},
            {header: "Inv Date", dataIndex: 'invdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "QTY", dataIndex: 'cn_qty',sortable:true,width:90,align:'center',hidden : false},
            {header: "Inv Amount", dataIndex: 'cn_invamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Pending", dataIndex: 'cn_pendingamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Adjusted", dataIndex: 'cn_adjusted',sortable:true,width:110,align:'right'},
            {header: "Balance", dataIndex: 'cn_balance',sortable:true,width:110,align:'right',hidden : false},

            {header: "VALUE", dataIndex: 'cd_value',sortable:true,width:100,align:'right',hidden : false},
            {header: "CGST", dataIndex: 'cd_cgst',sortable:true,width:90,align:'right'},
            {header: "SGST", dataIndex: 'cd_sgst',sortable:true,width:90,align:'right'},
            {header: "CD AMT", dataIndex: 'cd_amount',sortable:true,width:90,align:'right'},
        ],

        store: loadCreditNoteInvoiceDetailsDatastore,
    });





 var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 450,
        id : flxLedger,
        x: 100,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:50,align:'left'},



        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
                   'render' : function(cmp) {
                            cmp.getEl().on('keypress', function(e) {
                                if (e.getKey() == e.ENTER) {
                                   grid_chk_flxLedger();

                                }
                             });
                     },   
                   'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                          grid_chk_flxLedger();

                },

    
   }
   });



    var btnCDPrint = new Ext.Button({
        style: 'text-align:center;',
        text: "CN-Print",
        width: 60,
        id: 'btnCDPrint',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 = "&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 = "&fincode="+encodeURIComponent(GinFinid); 
                    var p3 = "&vouno=" + encodeURIComponent(vouno);
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote.rptdesign&__format=XLSX' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote.rptdesign' + param, '_blank');

                }
            }

    });





    var btnCD_Datawise = new Ext.Button({
        style: 'text-align:center;',
        text: "DATE WISE",
        width: 60,
        id: 'btnCD_Datawise',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 = "&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 = "&fincode="+encodeURIComponent(GinFinid); 
                    var p3 = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
                    var p4 = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	
		    var p5 = "&ledcode="+encodeURIComponent(ledgercode); 
 	 	    var param = (p1+p2+p3+p4+p5) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote_Datewise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote_Datewise.rptdesign&__format=XLSX' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_WPAdjustment_CreditNote_Datewise.rptdesign' + param, '_blank');

                }
            }

    });


function load_data()
{
            flxCreditNote.getStore().removeAll();
            flxCreditNoteAdjustments.getStore().removeAll();
            flxCreditNoteDetails.getStore().removeAll();

	    loadCreditNoteListDatastore.removeAll();
	    loadCreditNoteListDatastore.load({
	        url: 'ClsBillAdjustments.php',
	        params:
                {
                    task     : "loadCreditNotelist",
                    fincode  : GinFinid,
                    compcode : GinCompcode,
                    ledcode  : ledgercode ,
                    fromdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
                    todate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),

                },
	        callback: function () {
	 	   var cnt = loadCreditNoteListDatastore.getCount();
                   grid_tot1();

	        }
	    }); 


}



function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

            ledgercode = selrow.get('cust_code');
            ledtype    = selrow.get('cust_type');
            partycode  = selrow.get('cust_code');
	    txtAccountName.setValue(selrow.get('cust_name'));
	    flxLedger.hide();  
            load_data();

	}
}


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date() ,
        enableKeyEvents: true,
        listeners:{
           blur:function(){
              load_data();
           },
           keyup:function(){
              load_data();
            },
           change:function(){
              load_data();
            },
        }  
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              load_data();
           },
           keyup:function(){
              load_data();
            },
           change:function(){
              load_data();
            },
        }  
    });



var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Account Name',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  320,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ESC)
             {
                flxLedger.hide();
             }
             if (e.getKey() == e.ENTER)
             {

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
             if (e.getKey() == e.UP)
             {
 
              txtAccountName.focus;
             }
          },
	    keyup: function () {

                loadSearchLedgerListDatastore.removeAll();
                 if (txtAccountName.getRawValue() != '')
                 {
                    flxLedger.getEl().setStyle('z-index','10000');
                    flxLedger.show();
                    LedgerSearch();
                 }
            }
         }  
    });



var tabAdjustment = new Ext.TabPanel({
    id          : 'tabAdjustment',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 460,
    width       : 1300,	
    x           : 10,
    y           : 0,
listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabAdjustment.getActiveTab();
                   if (activeTab.id == 'tab3')
                   {   
//                       alert("The active tab in the panel is " + activeTab.id);
//                         grid_move();
                   }   

        }
},
     items : 
       [
          {
             xtype: 'panel',
             id   : 'tab1', 
             title: 'CREDIT NOTE DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [

                     flxCreditNote, flxCreditNoteAdjustments , 
                     flxCreditNoteDetails,

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 20,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotal]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 800,
		        y: 205,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtAdjTotal]
		    }, 


		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 400,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTaxValue]
		    }, 


		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 70,
		        width: 400,
		        x: 600,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCGST]
		    },

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 70,
		        width: 400,
		        x: 780,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtSGST]
		    },

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 960,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCDAmount]
		    }, 


             ]   
           },
          {
             xtype: 'panel',
             id   : 'tab2', 
             title: 'ADJUSTMENT DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [


  
             ]
           },



        ]           
   });     


   function save_click()
   {

   		var gstSave;
                var remarks;
                gstSave="true";
		if (flxDebit.getStore().getCount()==0)
	        {
	            Ext.Msg.alert('Adjustment','Grid should not be empty');
	            gstSave="false";
                } 
		if (flxCredit.getStore().getCount()==0)
	        {
	            Ext.Msg.alert('Adjustment','Grid should not be empty');
	            gstSave="false";
                } 
		if (flxAdjustments.getStore().getCount()==0)
	        {
	            Ext.Msg.alert('Adjustment','Grid should not be empty');
	            gstSave="false";
                } 
                if (Number(txtTotalAdjusted.getValue())== 0)
	        {
	            Ext.Msg.alert('Adjustment','No Documents are Adjusted..  Check again ');
	            gstSave="false";
                }
                if (Number(txtCDAmount.getValue())== 0)
	        {
	            Ext.Msg.alert('Adjustment','CD Amount should not be empty ');
	            gstSave="false";
                }
                if (Number(txtDebitTotal.getValue())== 0 || Number(txtCreditTotal.getValue())== 0  )
	        {
	            Ext.Msg.alert('Adjustment','CD Amount should not be empty ');
	            gstSave="false";
                }
                if (Number(txtDebitTotal.getValue()) !=  Number(txtCreditTotal.getValue()) )
	        {
	            Ext.Msg.alert('Adjustment','Credit Note Debit & Credit Total Not Tallied ');
	            gstSave="false";
                }
                else
	        {
                  Ext.Msg.show({
                    title: 'Confirmation',
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.MessageBox.YESNO,
                    msg: 'Do You Want To Save...',
                    fn: function(btn)
			{
                    if (btn === 'yes')
			{
                        if (gstSave === "true")
                        {   
		            var DebitData = flxDebit.getStore().getRange();                                        
		            var DebitupdData = new Array();
		            Ext.each(DebitData, function (record) {
		                DebitupdData.push(record.data);
		            });

		            var CreditData = flxCredit.getStore().getRange();                                        
		            var CreditupdData = new Array();
		            Ext.each(CreditData, function (record) {
		                CreditupdData.push(record.data);
		            });
		           
		            var AdjustData = flxAdjustments.getStore().getRange();                                        
		            var AdjustupdData = new Array();
		            Ext.each(AdjustData, function (record) {
		                AdjustupdData.push(record.data);
		            });

			    var CreditNoteData = flxAccounts.getStore().getRange();
			    var CreditNoteupdData = new Array();
			    Ext.each(CreditNoteData, function (record) {
		       	        CreditNoteupdData.push(record.data);
			    });


			    var InvData = flxInvDetails.getStore().getRange();
			    var InvDataupdData = new Array();
			    Ext.each(InvData, function (record) {
		       	        InvDataupdData.push(record.data);
			    });


	
                            Ext.Ajax.request({
                            url: 'TrnBilladjustmentDebit_Credit_Save.php',
                            params :
                            {
                             	griddet_debit  : Ext.util.JSON.encode(DebitupdData),                          
				cnt_debit      : DebitData.length,

                             	griddet_credit : Ext.util.JSON.encode(CreditupdData),                          
				cnt_credit     : CreditData.length,

                             	griddet_adjust : Ext.util.JSON.encode(AdjustupdData),                          
				cnt_adjust     : AdjustData.length,

                             	griddet_CreditNote : Ext.util.JSON.encode(CreditNoteupdData),                          
				cnt_creditnote     : CreditNoteData.length,

                             	griddet_invoice    : Ext.util.JSON.encode(InvDataupdData),                          
				cnt_inv            : InvData.length,
    
                                usercode : GinUserid,
				compcode       : GinCompcode,
                                finid	       : GinFinid,
				ledcode	       : ledgercode,
                     //           crnoteseqno    : crnoteseqno,
                                cnvouno        : txtCNNo.getValue(),  
		                cndate         : Ext.util.Format.date(dtpCNDate.getValue(), "Y-m-d"),
		                CNRemarks      : txtCNRemarks.getRawValue(),  

                                cdvalue        : Number(txtCDValue.getValue()),     
                                cdcgst         : Number(txtCGST.getValue()),     
                                cdsgst         : Number(txtCGST.getValue()),     
                                cdamount       : Number(txtCDAmount.getValue()),   
                                cdround        : Number(txtRound.getValue()),     
                                cdqty          : Number(txtTotInvQty.getValue()),   




                            },
                            callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Credit Note Saved. " +  obj['vouno'] );
                                    RefreshData();
                                  }else
				  {
                     	Ext.MessageBox.alert("Credit note  Not Saved! Pls Check!");                                                  
                                    }
                                }
                           });
                     }
                   }  
                 }
            })
          }     

   }

    
    var BillAdjustmentEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bill Adjustment Entry',
        header      : false,
        width       : 600,
        height      : 280,           bodyStyle: {"background-color": "#fff0ff"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'BillAdjustmentEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',    bodyStyle:{
			"background-color":"#3399CC"
		    },
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [

                  ]

        },
        items: [
          {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 0,
                y: 10,
                border: false,
                items: [txtAccountName]
            },


		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 80,
                     border  : false,
                     width   : 220,
	             x       : 550,
		     y       : 10,
                     items: [monthstartdate]
                },
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
                     width   : 220,
	             x       : 750,
		     y       : 10,
                     items: [monthenddate]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
                     width   : 220,
	             x       : 1000,
		     y       : 10,
                     items: [btnCDPrint]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
                     width   : 220,
	             x       : 1100,
		     y       : 10,
                     items: [btnCD_Datawise]
                },






            {xtype: 'fieldset',
                title: '',

                width: 1300,
                height: 460,
                x: 2,
                y: 60,
                border: true,
                layout: 'absolute',
                style: 'padding:0px',
                items: [tabAdjustment]
             },  flxLedger,  
 
           ]

    });
    
    
    function RefreshData(){
	gstFlag = "Add";

	flxLedger.hide(); 

            flxCreditNote.getStore().removeAll();
            flxCreditNoteAdjustments.getStore().removeAll();
            flxCreditNoteDetails.getStore().removeAll();

        Ext.getCmp('txtAccountName').focus(false, 200);
    

    }

    
    var BillAdjustmentEntryWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'Sales Vs Purchase Credit Note',
        items       : BillAdjustmentEntryFormPanel,
        layout      : 'fit',    bodyStyle:{
        "background-color":"#3399CC"
    },
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
        listeners:
            {

                show:function(){

//  Ext.getCmp('save').setDisabled(true);  
                 RefreshData();
                }
            }
    });
    BillAdjustmentEntryWindow.show();  
});



