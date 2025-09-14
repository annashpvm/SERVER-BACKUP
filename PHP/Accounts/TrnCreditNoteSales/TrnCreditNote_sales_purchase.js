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



var ledgercode = 0;
var ledtype    = '';
var partycode  = 0;

var vouchertype = 'BKR';
var vouseqno = 0;

var cdeligibledays = 0;
var invcdamount = 0;
const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 


var seqno    =  0;
var invno    =  '';
var invdate  =  new Date();
var vouno    =  '';
var voudate  =  new Date();
var invwt    =  0;
var invvalue =  0;
var tobeadjust1  =  0;
var tobeadjust2  =  0;
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
         'accref_seqno', 'cust_name', 'acctrail_led_code', 'accref_vouno', 'acctrail_inv_no', 'acctrail_inv_date', 'invdate', 'acctrail_inv_value', 'acctrail_adj_value', 'balance', 'acctrail_amtmode','acctrail_crdays', 'accref_voudate', 'voudate','invqty'
      ]),
    });

    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsCreditNote.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ControlCreditNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_vouno'])
    });





    var txtDebitTotal = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtDebitTotal',
        width: 100,
        name: 'txtDebitTotal',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtCreditTotal = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtCreditTotal',
        width: 100,
        name: 'txtCreditTotal',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtCNRemarks = new Ext.form.TextArea({
        fieldLabel: 'Credit Note Remarks',
        id: 'txtCNRemarks',
        width: 600,
        height: 60,
       cellWrap: true,
        name: 'txtCNRemarks',
        style: {textTransform: "uppercase"},
 
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners: {
            blur: function () {
               txtCNRemarks.setValue(txtCNRemarks.getValue().toUpperCase());
            },
        }       

    });

var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:40,
    height: 180,
    hidden:false,
    width: 750,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:350,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxAccounts.getSelectionModel();
		    var selrow = sm.getSelected();

                    gridedit = "true";
		    editrow2  = selrow;


                    cmbAccountName.setValue(selrow.get('ledcode'));
                    accledgercode = selrow.get('ledcode');
                   // txtAccountName.setValue(selrow.get('ledseq'));
                    txtDebit.setValue(selrow.get('debit'));
                    txtCredit.setValue(selrow.get('credit'));


                    flxAccounts.getSelectionModel().clearSelections();
                    if (selrow.get('debit') >0)
                    {
                        txtDebit.enable();
                        txtCredit.disable();
                    }  
                    else 
                    {
                        txtDebit.disable();
                        txtCredit.enable();
                    }

		}
                   else if (btn === 'no'){
                        var sm = flxAccounts.getSelectionModel();
                        var selrow = sm.getSelected();

                        flxAccounts.getStore().remove(selrow);
                        flxAccounts.getSelectionModel().selectAll();
                   }
    //     CalcTotalDebitCredit();
           grid_tot_acc();
             }

        });  
    }
   }

});



    var txtCNNo = new Ext.form.TextField({
        fieldLabel: 'Credit Note No',
        id: 'txtCNNo',
        width: 90,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var dtpCNDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpCNDate',
        name: 'dtpCNDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
//value: '2020-03-31',
        width: 115,
        listeners: {
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
            select: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            },
            blur: function () {
                dateon = 0;
                getdate = this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'DATECHECKING',
                        datechk: getdate
                    },
                    callback: function () {
                        dateon = DateCheckingDataStore.getAt(0).get('date');
                        if (dateon > 0) {
                            Ext.Msg.alert('Alert', 'Invalid Date');
                            dtpDate.setRawValue(new Date().format('d-m-Y'));
                        }
                    }
                });
            }
        }
    });



   function add_adjustments()
   {

        var totadj = 0;
        var actual_adjusted = 0;  

        flxCredit.getSelectionModel().selectAll();
        var selrows = flxCredit.getSelectionModel().getCount();
        var sel = flxCredit.getSelectionModel().getSelections();


//alert(tobeadjust1);
//alert(tobeadjust2);
//alert(invcdamount);
        var countchk = 0;
        for (var i = 0; i < selrows; i++) {

             if (Number(sel[i].data.pendingamt) > Number(sel[i].data.adjamt) && tobeadjust1 > 0 && tobeadjust2 > 0)
             { 

		    vouno    =  sel[i].data.accref_vouno;
		    voudate  =  sel[i].data.accref_voudate;

                    voudate2 = new Date(voudate);
                    invdate2 = new Date(invdate);

			var diffdays = voudate2.getTime()-invdate2.getTime();
			diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24));


                        cdeligibledays = diffdays;


                  if (diffdays < 8)
                  {   
		     if ((Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt)) >= tobeadjust1 )
		     {
                          actual_adjusted = tobeadjust1;
                          var t1 = Number(sel[i].data.adjamt);
		                  sel[i].set('adjamt', Ext.util.Format.number(Number(tobeadjust1)+Number(t1), '0.00') );
                          totaladjusted =  Number(totaladjusted) + Number(tobeadjust1);
		                  tobeadjust1 = 0;
                          tobeadjust2 = Number(tobeadjust2)-Number(t1);
    //                      alert(tobeadjust2);
		     } 
		     else
		     {
                          actual_adjusted = Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt);  
                          totadj =  sel[i].data.pendingamt - sel[i].data.adjamt;
		          sel[i].set('adjamt', sel[i].data.pendingamt);
                          totaladjusted =  Number(totaladjusted) + Number(totadj);
		          tobeadjust1 = Number(tobeadjust1)- Number(totadj);
                          tobeadjust1 = Ext.util.Format.number(tobeadjust1, '0.00');
                          tobeadjust2 = Number(tobeadjust2)-Number(totadj);
     //                     alert(tobeadjust2);
		      }
                   } 
                   else
                  {   
                    /*
                     if (countchk == 0)
                     {
                        tobeadjust2 = Number(tobeadjust1)-Number(invcdamount);
                        invcdamount = 0;
                        countchk =0;
//alert(tobeadjust2);
                     } 
 */
		     if ((Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt)) >= tobeadjust2 )
		     {
                          actual_adjusted = tobeadjust2;
                          var t1 = Number(sel[i].data.adjamt);
		          sel[i].set('adjamt', Ext.util.Format.number(Number(tobeadjust2)+Number(t1), '0.00') );
                          totaladjusted =  Number(totaladjusted) + Number(tobeadjust2);
		          tobeadjust2 = 0;
		     } 
		     else
		     {
                          actual_adjusted = Number(sel[i].data.pendingamt)-Number(sel[i].data.adjamt);  
                          totadj =  sel[i].data.pendingamt - sel[i].data.adjamt;
		          sel[i].set('adjamt', sel[i].data.pendingamt);
                          totaladjusted =  Number(totaladjusted) + Number(totadj);
		          tobeadjust2 = Number(tobeadjust2)- Number(totadj);
                          tobeadjust2 = Ext.util.Format.number(tobeadjust2, '0.00');
		      }
                   } 
 

	             flxAdjustments.getStore().insert(
	                 flxAdjustments.getStore().getCount(),
	                 new dgrecord({
			     mainseqno   : seqno,               
                             maindocno   : invno, 
	                     maindocdate : invdate,
	                     invqty      :  Ext.util.Format.number(invwt, '0.000'), 
                             adjvouno    : vouno, 
	                     adjvoudate  : voudate,
			     adjseqno    : sel[i].data.accref_seqno,  
	                     adjinvno    : sel[i].data.acctrail_inv_no, 
	                     adjinvdate	 : sel[i].data.acctrail_inv_date,  
                             adjamt      : Ext.util.Format.number(actual_adjusted, '0.00'), 
                             payterms    : crdays, 
                             adjdays     : diffdays, 

	                  })
	              );



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
            if ( Number(debit[db].data.balamt) > Number(debit[db].data.adjamt))
            { 


		    seqno    =  Number(debit[db].data.accref_seqno);
		    invno    =  debit[db].data.acctrail_inv_no;
		    invdate  =  debit[db].data.acctrail_inv_date;

		    invvalue  =  Number(debit[db].data.acctrail_inv_value);
		    tobeadjust1 =  Number(debit[db].data.balamt);
		    tobeadjust2 =  Number(debit[db].data.pendingamt);
		    tobeadjust3 =  Number(debit[db].data.balamt);
            crdays     =  Number(debit[db].data.payterms);
            invwt     =  Number(debit[db].data.invqty);

		    pendamt =  Number(debit[db].data.pendingamt);

                    invcdamount =  Number(debit[db].data.cdamt1);
                    cdeligibledays = 0;
		    totaladjusted = 0;

		    add_adjustments();

                    debit[db].set('adjamt', Ext.util.Format.number(Number(totaladjusted), '0.00') );

                    var amt1 =  parseFloat(tobeadjust3.toFixed(0)); 
                    var amt2 =  parseFloat(totaladjusted.toFixed(0)); 

                    if (Number(amt1) > Number(amt2) || Number(cdeligibledays) > 7 )
                    {
                        debit[db].set('cdvalue1',0 );
                        debit[db].set('cdcgst1',0 );
                        debit[db].set('cdsgst1',0 );
                        debit[db].set('cdamt1',0 );
                        debit[db].set('balamt',Ext.util.Format.number(pendamt, '0.00') );
                    }  
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
                  Ext.getCmp('btnAdjust').setDisabled(true); 
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



    var txtCDPMT = new Ext.form.NumberField({
        fieldLabel: 'CD PMT',
        id: 'txtCDPMT',
        width: 60,
        name: 'txtCDPMT',
        value : 500,
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtTotInvQty = new Ext.form.NumberField({
        fieldLabel: ' Total Qty (t)',
        id: 'txtTotInvQty',
        width: 90,
        name: 'txtTotInvQty',
        readOnly : true,
        decimalPrecision: 3,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtCDValue = new Ext.form.NumberField({
        fieldLabel: ' CD VALUE',
        id: 'txtCDValue',
        width: 90,
        name: 'txtCDValue',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtCGST = new Ext.form.NumberField({
        fieldLabel: ' CGST',
        id: 'txtCGST',
        width: 90,
        name: 'txtCGST',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtSGST = new Ext.form.NumberField({
        fieldLabel: ' SGST',
        id: 'txtSGST',
        width: 90,
        name: 'txtSGST',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtCDAmount = new Ext.form.NumberField({
        fieldLabel: ' CD AMOUNT',
        id: 'txtCDAmount',
        width: 90,
        name: 'txtCDAmount',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtRound= new Ext.form.NumberField({
        fieldLabel: ' Rounding',
        id: 'txtRound',
        width: 90,
        name: 'txtRound',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
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


    function sumInvQty() {
        var gintotal = 0;
        var cdvalue = 0;
        var cgst    = 0;
        var sgst    = 0;
        var cdamount = 0;

        var invnos = '';

        flxInvDetails.getSelectionModel().selectAll();
        var selrows = flxInvDetails.getSelectionModel().getCount();
        var sel = flxInvDetails.getSelectionModel().getSelections();


        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.cdamount) > 0)
            {   
                gintotal = gintotal + Number(sel[i].data.invqty);
                if (i == 0)
                   invnos =  sel[i].data.invdocno;
                else
                   invnos = invnos + ',' + sel[i].data.invdocno;

            }
             cdvalue  = Number(cdvalue) + Number(sel[i].data.cdvalue);
             cgst     = Number(cgst) + Number(sel[i].data.cgst);
             sgst     = Number(sgst) + Number(sel[i].data.sgst);
             cdamount = Number(cdamount) + Number(sel[i].data.cdamount);

 
        }


                
//        cdvalue = gintotal * Number(txtCDPMT.getValue());
  //      cgst    = cdvalue * 6 /100;
    //    sgst    = cdvalue * 6 /100;
      //  cgst    = cgst.toFixed(2);   
        //sgst    = sgst.toFixed(2);


   //     cdamount  = Number(cdvalue)+Number(cgst) +Number(sgst);
     //   cdamount2 = Number(cdvalue)+Number(cgst) +Number(sgst);

   //     roundoff =  cdamount.toFixed(0) - cdamount2;
 
        roundoff = 0;
        txtCDValue.setRawValue(Ext.util.Format.number(cdvalue , '0.00'));
        txtCGST.setRawValue(Ext.util.Format.number(cgst , '0.00'));
        txtSGST.setRawValue(Ext.util.Format.number(sgst , '0.00'));
        txtRound.setRawValue(Ext.util.Format.number(roundoff , '0.00'));

        txtCDAmount.setRawValue(Ext.util.Format.number(cdamount.toFixed(2) , '0.00'));
        txtTotInvQty.setRawValue(Ext.util.Format.number(gintotal, '0.000'));

         gintotal = Ext.util.Format.number(gintotal, '0.000');

        txtCNRemarks.setValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS CASH DISCOUNT Rs.500/MT AGAINST INV NO(S) " + invnos + ' Qty : ' + gintotal + " MT, CD Value " + txtCDValue.getRawValue() + " + GST = Rs." +  txtCDAmount.getRawValue()) ;

        flxaccupdation();

   }


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
            flxInvDetails.getStore().removeAll();
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

                      var cdvalue = Number(loadAdjustmentsPendingsDatastore.getAt(j).get('invqty')) * 500;    
                      cdvalue     = parseFloat(cdvalue.toFixed(2));   
                      var cdcgst  = Number(cdvalue) * 0.06;  
                      cdcgst      = Math.round(cdcgst * 100) / 100;
                      cdcgst      = parseFloat(cdcgst.toFixed(2));   
                      var cdsgst  = parseFloat(cdcgst.toFixed(2));   
                      var cdamount= Number(cdvalue) + Number(cdcgst) + Number(cdsgst);
                      cdamount    = parseFloat(cdamount.toFixed(2));   

                      var balanceamt = Number(loadAdjustmentsPendingsDatastore.getAt(j).get('balance')) - Number(cdamount); 
                      balanceamt     = parseFloat(balanceamt.toFixed(2));      
	              flxDebit.getStore().insert(
	                 flxDebit.getStore().getCount(),
	                 new dgrecord({
			     accref_seqno      : loadAdjustmentsPendingsDatastore.getAt(j).get('accref_seqno'),               
                             acctrail_inv_no   : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_no'), 
	                     acctrail_inv_date : loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_date'),
			     invdate           : loadAdjustmentsPendingsDatastore.getAt(j).get('invdate'),  
                             invqty            : loadAdjustmentsPendingsDatastore.getAt(j).get('invqty'),   
	                     acctrail_inv_value: loadAdjustmentsPendingsDatastore.getAt(j).get('acctrail_inv_value'), 
	                     pendingamt	       : loadAdjustmentsPendingsDatastore.getAt(j).get('balance'), 
                             cdvalue1          : Ext.util.Format.number(cdvalue,'0.00'),
                             cdcgst1           : Ext.util.Format.number(cdsgst,'0.00'),
                             cdsgst1           : Ext.util.Format.number(cdsgst,'0.00'),
                             cdamt1            : Ext.util.Format.number(cdamount,'0.00'),

                             balamt            : Ext.util.Format.number(balanceamt,'0.00'),
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
                             accref_vouno   : loadAdjustmentsPendingsDatastore.getAt(j).get('accref_vouno'), 
	                     accref_voudate : loadAdjustmentsPendingsDatastore.getAt(j).get('accref_voudate'),
			     voudate           : loadAdjustmentsPendingsDatastore.getAt(j).get('voudate'),  
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
chk_adjustments();
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
                  Ext.getCmp('btnAdjust').setDisabled(false); 
	    flxLedger.hide();  
            load_data();

	}
}




function grid_tot_acc(){
        var dr = 0;
        var cr = 0;
        txtDebitTotal.setRawValue(0);
        txtCreditTotal.setRawValue(0);

        var selrows = flxAccounts.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxAccounts.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));

        }

//if (dr != cr)
//alert("not tallied");


        txtDebitTotal.setRawValue(Ext.util.Format.number(dr,'0.00'));
        txtCreditTotal.setRawValue(Ext.util.Format.number(cr,'0.00'));


}


function flxaccupdation() {

        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        flxAccounts.getStore().removeAll();
//Party Account - Credit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : ledgercode,
	      ledname   : txtAccountName.getRawValue(),
	      debit     : "0",
              credit    : Ext.util.Format.number(txtCDAmount.getRawValue(),'0.00'),
              ledtype   : 'P',
              }) 
        );
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : '1741',
	      ledname   : 'GST SALES @12%',
	      debit     : Ext.util.Format.number(txtCDValue.getRawValue(),'0.00') ,
              credit    : "0",
              ledtype   : 'G',
              }) 
        );

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : 1644,
		      ledname   : 'CGST',
		      debit     : Ext.util.Format.number(txtCGST.getRawValue(),'0.00') ,
		      credit    : "0",
		      ledtype   : 'G',
		      }) 
		);


		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : 1645,
		      ledname   : 'SGST',
		      debit     : Ext.util.Format.number(txtSGST.getRawValue(),'0.00') ,
		      credit    : "0",
		      ledtype   : 'G',
		      }) 
		);

	   rounddr = 0;
	   roundcr = 0;


	if ( Number(txtRound.getValue())  > 0)
	   rounddr = Number(txtRound.getValue());
	else
	   roundcr = Math.abs(Number(txtRound.getValue()));


	if (Number(txtRound.getValue()) != 0)
	{
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : 1859,
		      ledname   : 'ROUNDED OFF',
		      debit     : Ext.util.Format.number(rounddr,'0.00'),
		      credit    : Ext.util.Format.number(roundcr,'0.00'),
		      ledtype   : "G",
		      }) 
		);
	}


      grid_tot_acc();
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
            {header: "Inv Qty", dataIndex: 'invqty',sortable:true,width:80,align:'right' },

            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:110,align:'right' },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:110,align:'right' },
            {header: "CD Value", dataIndex: 'cdvalue1',sortable:true,width:90,align:'right' },
            {header: "CGST", dataIndex: 'cdcgst1',sortable:true,width:80,align:'right' },
            {header: "SGST", dataIndex: 'cdsgst1',sortable:true,width:80,align:'right' },
            {header: "CD Amt", dataIndex: 'cdamt1',sortable:true,width:90,align:'right' },
            {header: "Bal Amt", dataIndex: 'balamt',sortable:true,width:110,align:'right' },
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
            {header: "Vou No.", dataIndex: 'accref_vouno',sortable:true,width:140,align:'center'},
            {header: "Date", dataIndex: 'accref_voudate',sortable:true,width:110,align:'center',hidden : true},
            {header: "Vou Date", dataIndex: 'voudate',sortable:true,width:110,align:'center'},
            {header: "Inv. No.", dataIndex: 'acctrail_inv_no',sortable:true,width:140,align:'center'},
            {header: "Date", dataIndex: 'acctrail_inv_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Inv Date", dataIndex: 'invdate',sortable:true,width:110,align:'center'},
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
        width: 1250,
        x: 10,
        y: 40,
        id: 'my-grid2',  

        columns: [         
            {header: "Seq No",    dataIndex: 'mainseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Doc. No..", dataIndex: 'maindocno',sortable:true,width:140,align:'center'},
            {header: "Doc Date",  dataIndex: 'maindocdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "Inv Qty",   dataIndex: 'invqty',sortable:true,width:80,align:'right' },
            {header: "Adj. Seqno",dataIndex: 'adjseqno',sortable:true,width:110,align:'center',hidden : true},
            {header: "Adj. VouNo",  dataIndex: 'adjvouno',sortable:true,width:140,align:'center' },
            {header: "Adj Vou Dt.", dataIndex: 'adjvoudate',sortable:true,width:110,align:'left',hidden : false},
            {header: "Adj. Doc",  dataIndex: 'adjinvno',sortable:true,width:140,align:'center' },
            {header: "Adj Doc Dt.", dataIndex: 'adjinvdate',sortable:true,width:110,align:'left',hidden : false},
            {header: "Adj Amt",    dataIndex: 'adjamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Pay Terms",  dataIndex: 'payterms',sortable:true,width:110,align:'center',hidden : false},
            {header: "AdjDays",  dataIndex: 'adjdays',sortable:true,width:110,align:'center',hidden : false},
        ],
        store:[],
    });
    

     var flxInvDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 450,
        x: 10,
        y: 40,
        id: 'my-grid2',  

        columns: [         
            {header: "Seq No",    dataIndex: 'invseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Doc. No..", dataIndex: 'invdocno',sortable:true,width:140,align:'center'},
            {header: "Doc Date",  dataIndex: 'invdocdate',sortable:true,width:110,align:'center',hidden : false},
            {header: "Inv Qty",   dataIndex: 'invqty',sortable:true,width:80,align:'right' },
            {header: "Inv Balance", dataIndex: 'invbalance',sortable:true,width:100,align:'right' },
            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:120,align:'right' },
            {header: "Pending", dataIndex: 'pendingamt',sortable:true,width:110,align:'right',hidden : false},
            {header: "Adjusted", dataIndex: 'adjusted',sortable:true,width:110,align:'right',hidden : false},
            {header: "CD Value", dataIndex: 'cdvalue',sortable:true,width:110,align:'right',hidden : false},
            {header: "CGST", dataIndex: 'cgst',sortable:true,width:110,align:'right',hidden : false},
            {header: "SGST", dataIndex: 'sgst',sortable:true,width:110,align:'right',hidden : false},
            {header: "CD Amount", dataIndex: 'cdamount',sortable:true,width:110,align:'right',hidden : false},
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




function grid_move() {

    flxInvDetails.getStore().removeAll();

    let finalStore = flxInvDetails.getStore();

    // Re-select all rows to ensure correct selection (could be optimized out if not needed)
    flxAdjustments.getSelectionModel().selectAll();
    var sel = flxAdjustments.getSelectionModel().getSelections();

    for (var i = 0; i < sel.length; i++) {
        var recData = sel[i].data;

        // Only process if Adjusted amount > 0
    //    if (Number(recData.adjdays ) < 8) {
            var exists = false;

            // Check if the record already exists in the final store
            for (var j = 0; j < finalStore.getCount(); j++) {
                var existing = finalStore.getAt(j);
                if (
                     existing.get('invdocno') === recData.maindocno
                ) {
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                // Add record to final store
                finalStore.add(new dgrecord({
                    invseqno: Number(recData.mainseqno),
                    invdocno: recData.maindocno,
                    invdocdate: recData.maindocdate,
                    invqty:  Ext.util.Format.number(recData.invqty, '0.000'),



                }));
            }
   //     }
    }





    // Re-select all rows to ensure correct selection (could be optimized out if not needed)
    flxDebit.getSelectionModel().selectAll();
    var sel = flxDebit.getSelectionModel().getSelections();

    for (var i = 0; i < sel.length; i++) {
        var recData = sel[i].data;


            var exists = false;

            // Check if the record already exists in the final store
            for (var j = 0; j < finalStore.getCount(); j++) {
                var existing = finalStore.getAt(j);
                if (
                     existing.get('invdocno') === recData.acctrail_inv_no
                ) {
                    var balamt   = Number(recData.pendingamt) - Number(recData.adjamt)- Number(recData.cdamt1);
                    var invamt   = Number(recData.acctrail_inv_value) ;
                    var pendamt  = Number(recData.pendingamt);
                    var adjamt   = Number(recData.adjamt);
                    var cdval    = Number(recData.cdvalue1);
                    var cgst     = Number(recData.cdcgst1);
                    var sgst     = Number(recData.cdsgst1);
                    var cdamount = Number(recData.cdamt1);

                    if (balamt < 0)
                        balamt = 0;
 /*
                    if (balamt == 0)
                    { 
                       cdval = Number(recData.invqty) * 500;
                       cgst  = cdval * 0.06;
                       sgst  = cdval * 0.06;

                       cdval = cdval.toFixed(2);
                       cgst  = cgst.toFixed(2);
                       sgst  = sgst.toFixed(2);
                       cdamount = Number(cdval) + Number(cgst) + Number(sgst);
                    }
*/
                    existing.set('invbalance', balamt.toFixed(2) );
                    existing.set('acctrail_inv_value', invamt.toFixed(2) );
                    existing.set('pendingamt', pendamt.toFixed(2) );
                    existing.set('adjusted', adjamt.toFixed(2) );
                    existing.set('cdvalue', cdval);
                    existing.set('cgst', cgst);
                    existing.set('sgst', sgst);
                    existing.set('cdamount', cdamount.toFixed(2)  );
                    exists = true;
                    break;
                }
            }

    }



    sumInvQty();
}


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
                         grid_move();
                   }   

        }
},
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
           },

          {
             xtype: 'panel',
             id   : 'tab3', 
             title: 'CREDIT NOTE DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [

                 flxInvDetails,

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 60,
		        width: 400,
		        x: 10,
		        y: 220,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCDPMT]
                    },
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 220,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotInvQty]
                    },
  		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 250,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCDValue]
                    },
  		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCGST]
                    },
  		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 300,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtSGST]
                    },
/*
  		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 320,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtRound]
                    },
*/
  		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 400,
		        x: 150,
		        y: 350,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCDAmount]
                    },


                     flxAccounts,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 600,
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtDebitTotal]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 820,
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCreditTotal]
		    }, 
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 800,
		        x: 500,
		        y: 330,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCNRemarks]
		    }, 


             ]
           }


        ]           
   });     


   function save_click()
   {

        var allok = 0;     

        flxDebit.getSelectionModel().selectAll();
        var selrows = flxDebit.getSelectionModel().getCount();
        var sel = flxDebit.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.adjamt) > Number(sel[i].data.pendingamt) ) 
            {
            alert ("Adjusted Amount is greater than Pending Amount for the Inv. No : " + sel[i].data.acctrail_inv_no + " Please check" );
            allok = 1;
            } 
        }


   
      if (allok == 0)
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
		                adjdate        : Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),



		                CNRemarks      : txtCNRemarks.getRawValue(),  

                                cdvalue        : Number(txtCDValue.getValue()),     
                                cdcgst         : Number(txtCGST.getValue()),     
                                cdsgst         : Number(txtCGST.getValue()),     
                                cdamount       : Number(txtCDAmount.getValue()),   
                                cdround        : Number(txtRound.getValue()),     
                                cdqty          : txtTotInvQty.getValue().toFixed(3),   




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
                width: 500,
                x: 0,
                y: 10,
                border: false,
                items: [txtAccountName]
            },

          {
                xtype: 'fieldset',
                title: '',
                labelWidth: 140,
                width: 300,
                x: 480,
                y: 10,
                border: false,
                items: [dtpDate]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 100,
                x: 770,
                y: 5,
                border: false,
     //           items: [btnAdjust]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 300,
                x: 880,
                y: 5,
                border: false,
                items: [txtCNNo]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 50,
                width: 550,
                x: 1100,
                y: 5,
                border: false,
                items: [dtpCNDate]
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
             }, flxLedger,  
 
           ]

    });
    
    
    function RefreshData(){
	gstFlag = "Add";

        Ext.getCmp('btnAdjust').setDisabled(false); 


	txtTotDebit.setValue('');
	txtTotCredit.setValue('');
	txtTotDebitAdjusted.setValue('');
	txtTotCreditAdjusted.setValue('');
	txtTotalAdjusted.setValue('');

	txtCDValue.setValue('');
	txtCGST.setValue('');
	txtSGST.setValue('');
	txtCDAmount.setValue('');
	txtRound.setValue('');


	txtDebitTotal.setRawValue('');
	txtDebitTotal.setRawValue('');

	txtTotInvQty.setValue('');
	txtCNRemarks.setRawValue('');



	flxLedger.hide(); 
	flxDebit.getStore().removeAll();
	flxCredit.getStore().removeAll();
	flxAdjustments.getStore().removeAll();
	flxInvDetails.getStore().removeAll();

	flxAccounts.getStore().removeAll();


        txtAccountName.setValue('');

        ControlmasterDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'ControlCreditNo',
                ginfinid: GinFinid,
                gincompcode: GinCompcode
            },
            callback: function () {
                       if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 10)
                        {                                              
                          vno = "00"+ControlmasterDataStore.getAt(0).get('accref_vouno');
                        }                                      
                        else
                        {  
                             if (ControlmasterDataStore.getAt(0).get('accref_vouno') < 100) 
                             {                                              
                              vno = "0"+ControlmasterDataStore.getAt(0).get('accref_vouno');                   
                             }
                             else 
                             {      
                               vno = ControlmasterDataStore.getAt(0).get('accref_vouno');  
                             }
                        } 


                     vno =  "CNG-"+vno.slice(-4);  
//                                     vno = vno.trim() +'/'+ invfin; 
                     txtCNNo.setValue(vno);      

            }
        });

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



