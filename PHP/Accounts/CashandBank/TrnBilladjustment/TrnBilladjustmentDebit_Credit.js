Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gsttype='R';
    var GinFinid=localStorage.getItem('ginfinid');
    var gstfinyear=localStorage.getItem('gstyear');
    var GinCompcode =localStorage.getItem('gincompcode');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



    var dgadjrecord = Ext.data.Record.create([]);
    var gstfin='';



var ledgercode = 0;
var ledtype    = '';
var partycode  = 0;

var vouchertype = 'BKR';
var vouseqno = 0;

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 


var seqno    =  0;
var invno    =  '';
var invdate  =  new Date();
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



 var loadAdjustmentsPendingsDatastore = new Ext.data.Store({
      id: 'loadAdjustmentsPendingsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadUnAdjustedBills"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
         'accref_seqno', 'cust_name', 'acctrail_led_code', 'accref_vouno', 'acctrail_inv_no', 'acctrail_inv_date', 'invdate', 'acctrail_inv_value', 'acctrail_adj_value', 'balance', 'acctrail_amtmode','acctrail_crdays'
      ]),
    });


   function add_adjustments()
   {

        var totadj = 0;
        var actual_adjusted = 0;  

        flxCredit.getSelectionModel().selectAll();
        var selrows = flxCredit.getSelectionModel().getCount();
        var sel = flxCredit.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {

             if ( Number(sel[i].data.pendingamt) > Number(sel[i].data.adjamt)  && tobeadjust > 0 )
             { 

		     if ((Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt)) >= tobeadjust )
		     {
                          actual_adjusted = tobeadjust;
                          var t1 = Number(sel[i].data.adjamt);
		          sel[i].set('adjamt', Ext.util.Format.number(Number(tobeadjust)+Number(t1), '0.00') );
                          totaladjusted =  Number(totaladjusted) + Number(tobeadjust);
		          tobeadjust = 0;
		     } 
		     else
		     {
                          actual_adjusted = Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt);  
                          totadj =  sel[i].data.pendingamt - sel[i].data.adjamt;
		          sel[i].set('adjamt', sel[i].data.pendingamt);
                          totaladjusted =  Number(totaladjusted) + Number(totadj);
		          tobeadjust = Number(tobeadjust)- Number(totadj);
                          tobeadjust = Ext.util.Format.number(tobeadjust, '0.00');
		     }
	             flxAdjustments.getStore().insert(
	                 flxAdjustments.getStore().getCount(),
	                 new dgrecord({
			     mainseqno   : seqno,               
                             maindocno   : invno, 
	                     maindocdate : invdate,
			     adjseqno    : sel[i].data.accref_seqno,  
	                     adjdocno    : sel[i].data.acctrail_inv_no, 
	                     adjdocdate	 : sel[i].data.acctrail_inv_date,  
                             adjamt      : Ext.util.Format.number(actual_adjusted, '0.00'), 
                             payterms    : crdays, 

	                  })
	              );

/*
		     if ((Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt)) >= tobeadjust )
		     {
		          sel[i].set('adjamt', tobeadjust );
                          totaladjusted =  Number(totaladjusted) + Number(tobeadjust);
		          tobeadjust = 0;
		     } 
		     else
		     {
                          t =  sel[i].data.pendingamt - sel[i].data.adjamt
		          sel[i].set('adjamt', sel[i].data.pendingamt);
                          totaladjusted =  Number(totaladjusted) + Number(t);
		          tobeadjust = Number(tobeadjust)- Number(t);
                          tobeadjust = Ext.util.Format.number(tobeadjust, '0.00');
		     }
*/

             }              
        }

   }      


var dtpDate = new Ext.form.DateField({
    fieldLabel : 'ADJUST UPTO DATE',
    id         : 'dtpDate',
    name       : 'dtpDate',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
 enableKeyEvents: true,   

    width : 100,

    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                     load_data();
 
             }
       },
            blur:function(){
         
              load_data();
	
            }
    }
});


function chk_adjustments()
{

	flxDebit.getSelectionModel().selectAll();
	var Debitrows = flxDebit.getSelectionModel().getCount();
	var debit = flxDebit.getSelectionModel().getSelections();

	for (var db = 0; db < Debitrows ; db++) {
            if ( Number(debit[db].data.pendingamt) > Number(debit[db].data.adjamt))
            { 
		    seqno    =  Number(debit[db].data.accref_seqno);
		    invno    =  debit[db].data.acctrail_inv_no;
		    invdate  =  debit[db].data.acctrail_inv_date;
		    invvalue  =  Number(debit[db].data.acctrail_inv_value);
		    tobeadjust =  Number(debit[db].data.pendingamt);
                    crdays     =  Number(debit[db].data.payterms);
		    totaladjusted = 0;
		    add_adjustments();
                    debit[db].set('adjamt', Ext.util.Format.number(Number(totaladjusted), '0.00') );
		    CalcTotalDebitCredit();
            }
	}

}

          


    var btnAdjust = new Ext.Button({
        style: 'text-align:center;',
        text: "ADJUST",
        width: 80,
        height: 40,
        id : 'btnAdjust',
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                  chk_adjustments();
        }
       }  
    });





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

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 120,
        name: 'txtTotDebit',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 120,
        name: 'txtTotCredit',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtTotDebitAdjusted= new Ext.form.NumberField({
        fieldLabel: 'Adjusted',
        id: 'txtTotDebitAdjusted',
        width: 120,
        name: 'txtTotDebitAdjusted',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotCreditAdjusted = new Ext.form.NumberField({
        fieldLabel: 'Adjusted',
        id: 'txtTotCreditAdjusted',
        width: 120,
        name: 'txtTotCreditAdjusted',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotalAdjusted = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted',
        id: 'txtTotalAdjusted',
        width: 120,
        name: 'txtTotalAdjusted',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    function CalcTotalDebitCredit() {
        var gintotal = 0;
        var ginadj   = 0;


        flxDebit.getSelectionModel().selectAll();
        var selrows = flxDebit.getSelectionModel().getCount();
        var sel = flxDebit.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            gintotal = gintotal + Number(sel[i].data.pendingamt);
            ginadj   = ginadj   + Number(sel[i].data.adjamt);
        }




        txtTotDebit.setRawValue(Ext.util.Format.number(gintotal, '0.00'));
        txtTotDebitAdjusted.setRawValue(Ext.util.Format.number(ginadj, '0.00'));


  //      txtTotDebit.setValue(gintotal);

        gintotal = 0;
        ginadj = 0;

        flxCredit.getSelectionModel().selectAll();
        var selrows = flxCredit.getSelectionModel().getCount();
        var sel = flxCredit.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            gintotal = gintotal + Number(sel[i].data.pendingamt);
            ginadj   = ginadj   + Number(sel[i].data.adjamt);
        }

        txtTotCredit.setRawValue(Ext.util.Format.number(gintotal, '0.00'));
        txtTotCreditAdjusted.setRawValue(Ext.util.Format.number(ginadj, '0.00'));

   //     txtTotCredit.setValue(gintotal);

        ginadj = 0;
/*
        flxAdjustments.getSelectionModel().selectAll();
        var selrows = flxAdjustments.getSelectionModel().getCount();
        var sel = flxAdjustments.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            ginadj   = ginadj   + Number(sel[i].data.adjamt);
        }
        txtTotalAdjusted.setRawValue(Ext.util.Format.number(ginadj, '0.00'));
*/

        var selrows = flxAdjustments.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxAdjustments.getStore().getAt(i);
            ginadj = ginadj + Number(rec.get('adjamt'));
        }

        txtTotalAdjusted.setValue(Ext.util.Format.number(ginadj, '0.00'));


    }


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

function load_data()
{
            flxDebit.getStore().removeAll();
            flxCredit.getStore().removeAll();
            flxAdjustments.getStore().removeAll();
	    loadAdjustmentsPendingsDatastore.removeAll();
	    loadAdjustmentsPendingsDatastore.load({
	        url: 'ClsBillAdjustments.php',
	        params:
                {
                    task: "loadUnAdjustedBills",
                    fincode : GinFinid,
                    compcode: GinCompcode,
                    ledcode : ledgercode ,
                    asondate : Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
                },
	        callback: function () {
	 	   var cnt = loadAdjustmentsPendingsDatastore.getCount();
                   if (cnt>0)          
                   {
                      for(var j=0; j<cnt; j++) 
                      {
                      if (loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_amtmode') == "D")
                      {   
	              flxDebit.getStore().insert(
	                 flxDebit.getStore().getCount(),
	                 new dgrecord({
			     accref_seqno      : loadAdjustmentsPendingsDatastore.getAt(j).get('accref_seqno'),               
                             acctrail_inv_no   : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_no'), 
	                     acctrail_inv_date : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_date'),
			     invdate           : loadAdjustmentsPendingsDatastore.getAt(j).get('invdate'),  
	                     acctrail_inv_value: loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_value'), 
	                     pendingamt	       : loadAdjustmentsPendingsDatastore.getAt(j).get('balance'), 
                             adjamt            : 0, 
	                     payterms          : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_crdays'),    

	                  })
	              );
                      }
                      else
                      {   
	              flxCredit.getStore().insert(
	                 flxCredit.getStore().getCount(),
	                 new dgrecord({
			     accref_seqno      : loadAdjustmentsPendingsDatastore.getAt(j).get('accref_seqno'),               
                             acctrail_inv_no   : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_no'), 
	                     acctrail_inv_date : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_date'),
			     invdate           : loadAdjustmentsPendingsDatastore.getAt(j).get('invdate'),  
	                     acctrail_inv_value: loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_value'), 
	                     pendingamt	       : loadAdjustmentsPendingsDatastore.getAt(j).get('balance'), 
                             adjamt            : 0,
	                  })
	              );
                      }
     
                      }
CalcTotalDebitCredit();

                    }



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


var dgrecord = Ext.data.Record.create([]);
    var flxDebit = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 580,
        x: 10,
        y: 40,
        id: 'my-grid',  

        columns: [         
            {header: "SeqNO", dataIndex: 'accref_seqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Inv. No.", dataIndex: 'acctrail_inv_no',sortable:true,width:120,align:'center'},
            {header: "Date", dataIndex: 'acctrail_inv_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:110,align:'center'},
            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:110,align:'right' },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:110,align:'right' },
            {header: "Adj Amt", dataIndex: 'adjamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Paymt Terms", dataIndex: 'payterms',sortable:true,width:110,align:'right',hidden : false},
        ],
        store:[],
    });
    

     var flxCredit = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 650,
        x: 610,
        y: 40,
        id: 'my-grid2',  

        columns: [         
            {header: "SeqNO", dataIndex: 'accref_seqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Inv. No.", dataIndex: 'acctrail_inv_no',sortable:true,width:140,align:'center'},
            {header: "Date", dataIndex: 'acctrail_inv_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:110,align:'center'},
            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:120,align:'right' },
            {header: "Balance", dataIndex: 'pendingamt',sortable:true,width:110,align:'left',hidden : false},
            {header: "Adj Amt", dataIndex: 'adjamt',sortable:true,width:110,align:'right',hidden : false},
        ],
        store:[],
    });
    

     var flxAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 1100,
        x: 10,
        y: 40,
        id: 'my-grid2',  

        columns: [         
            {header: "Seq No",    dataIndex: 'mainseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Doc. No..", dataIndex: 'maindocno',sortable:true,width:140,align:'center'},
            {header: "Doc Date",  dataIndex: 'maindocdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "Adj. Seqno",dataIndex: 'adjseqno',sortable:true,width:110,align:'center',hidden : true},
            {header: "Adj. Doc",  dataIndex: 'adjdocno',sortable:true,width:140,align:'center' },
            {header: "Adj Doc Dt.", dataIndex: 'adjdocdate',sortable:true,width:110,align:'left',hidden : false},
            {header: "Adj Amt",    dataIndex: 'adjamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Pay Terms",  dataIndex: 'payterms',sortable:true,width:110,align:'center',hidden : false},
        ],
        store:[],
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


 
var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Account Name',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  400,
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

var lblDebit = new Ext.form.Label({
fieldLabel: 'DEBIT BILLS',
id: 'lblDebit',
width: 200,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
});


var lblCredit = new Ext.form.Label({
fieldLabel: 'CREDIT BILLS',
id: 'lblCredit',
width: 200,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
});



var tabAadjustment = new Ext.TabPanel({
    id          : 'tabAadjustment',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 460,
    width       : 1300,	
    x           : 10,
    y           : 0,

     items : 
       [
          {
             xtype: 'panel',
             id   : 'tab1', 
             title: 'BILL DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [
                   {
                       xtype: 'fieldset',
                        title: '',
                        labelWidth: 300,
                        width: 250,
                        x: 5,
                        y: 0,
                        border: false,
                        items: [lblDebit]
                   },

                   {
                       xtype: 'fieldset',
                        title: '',
                        labelWidth: 300,
                        width: 250,
                        x: 650,
                        y: 0,
                        border: false,
                        items: [lblCredit]
                   },
                   flxDebit,flxCredit,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 90,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotDebit]
		    }, 
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 330,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotDebitAdjusted]
		    }, 
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 770,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCredit]
                    },
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 400,
		        x: 1010,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCreditAdjusted]
                    },  
             ]
           },
          {
             xtype: 'panel',
             id   : 'tab2', 
             title: 'ADJUSTMENT DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [

                 flxAdjustments,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 130,
		        width: 400,
		        x: 700,
		        y: 390,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotalAdjusted]
                    },

  
             ]
           }
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
	
                            Ext.Ajax.request({
                            url: 'TrnBilladjustmentDebit_Credit_Save.php',
                            params :
                            {
                             	griddet_debit : Ext.util.JSON.encode(DebitupdData),                          
				cnt_debit     : DebitData.length,

                             	griddet_credit : Ext.util.JSON.encode(CreditupdData),                          
				cnt_credit     : CreditData.length,

                             	griddet_adjust : Ext.util.JSON.encode(AdjustupdData),                          
				cnt_adjust     : AdjustData.length,
				compcode	: GinCompcode,
                                finid		: GinFinid,
				ledcode		: ledgercode

                            },
                            callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Adjustments are Completed." );
                                    RefreshData();
                                  }else
				  {
                     	Ext.MessageBox.alert("Adjustments ared Not Saved! Pls Check!");                                                  
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
                {
//save
                    text: 'Save',
                    id : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                          save_click();           
                    }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
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
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            BillAdjustmentEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
          {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 550,
                x: 0,
                y: 10,
                border: false,
                items: [txtAccountName]
            },

          {
                xtype: 'fieldset',
                title: '',
                labelWidth: 140,
                width: 550,
                x: 550,
                y: 10,
                border: false,
                items: [dtpDate]
            },

          {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 550,
                x: 850,
                y: 5,
                border: false,
                items: [btnAdjust]
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
                items: [tabAadjustment]
             }, flxLedger,  
 
           ]

    });
    
    
    function RefreshData(){
	gstFlag = "Add";
	txtTotDebit.setValue('');
	txtTotCredit.setValue('');
	txtTotDebitAdjusted.setValue('');
	txtTotCreditAdjusted.setValue('');
	txtTotalAdjusted.setValue('');

	flxLedger.hide(); 
	flxDebit.getStore().removeAll();
	flxCredit.getStore().removeAll();
	flxAdjustments.getStore().removeAll();

        txtAccountName.setValue('');
        Ext.getCmp('txtAccountName').focus(false, 200);
    

    }
    
    var BillAdjustmentEntryWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'Bill Adjustment Entry',
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



