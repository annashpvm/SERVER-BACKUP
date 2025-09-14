Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gstAdjtype='C';
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');

    var GinUser = localStorage.getItem('ginusername');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

    var  invfin = localStorage.getItem('invfin');
    var powerid=localStorage.getItem('powerid');	
    var gindbtotal;
    var gincrtotal;
    var ledgercode = 0;
    var ledtype ="G";
    var acseqno = 0;
    var editrow = 0;   
    var gridedit = "false";
    var dbcr = "P";
    var chkamt = 0;
    var ledgercount = 0;

    var txtRemarks = new Ext.form.TextField({
        fieldLabel: 'Narration',
        id: 'txtRemarks',
        width: 400,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        name: 'txtRemarks',
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'59'},
	style      :"border-radius: 5px;textTransform: uppercase; ",
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  add_btn_click();
             }       
             },
    //        blur: function () {
//                add_btn_click();
//            }
          } 	
    });

    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });


    var dgadjrecord = Ext.data.Record.create([]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  JournalEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);

    
    var txtAmountDr = new Ext.form.NumberField({
        fieldLabel  : 'Debit Amount',
        id          : 'txtAmountDr',
        width       : 90,
        name        : 'amount',
        readOnly    : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });
    
    var txtAmountCr = new Ext.form.NumberField({
        fieldLabel  : 'Credit Amount',
        id          : 'txtAmountCr',
        width       : 90,
        name        : 'amount',
        readOnly    : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });
    
    var txtTotadjamtDr = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted',
        id          : 'txtTotadjamtDr',
        width       : 110,readOnly:true,
        name        : 'adjamount',
    	labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},

    });
    
    var txtTotadjamtCr = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted',
        id          : 'txtTotadjamtCr',
        width       : 110,readOnly:true,
        name        : 'adjamount2',
    	labelStyle	: "font-size:12px;font-weight:bold;",
   	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });
    

    var UnAdjustedBillDetaildatastore = new Ext.data.Store({
        id: 'UnAdjustedBillDetaildatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "getunadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['acctrail_inv_no','acctrail_inv_date','dbcr_invvalue','acctrail_inv_value','accref_finid',
            'acctrail_adj_value','accref_vou_type','accref_seqno','accref_vouno','acctrail_crdays','acctrail_led_code' ])
    });

    var UnAdjustedBillDetaildatastore2 = new Ext.data.Store({
        id: 'UnAdjustedBillDetaildatastore2',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "getunadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['acctrail_inv_no','acctrail_inv_date','dbcr_invvalue','acctrail_inv_value','accref_finid',
            'acctrail_adj_value','accref_vou_type','accref_seqno','accref_vouno','acctrail_crdays','acctrail_led_code' ])
    });


    var UnAdjustedBillDetaildatastore3 = new Ext.data.Store({
        id: 'UnAdjustedBillDetaildatastore3',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "getunadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['acctrail_inv_no','acctrail_inv_date','dbcr_invvalue','acctrail_inv_value','accref_finid',
            'acctrail_adj_value','accref_vou_type','accref_seqno','accref_vouno','acctrail_crdays','acctrail_led_code' ])
    });

function CalcSum_Dr(){
        var selrows = flxDebitAdjustments.getStore().getCount();
        var ginadjtotal = 0;
        txtTotadjamtDr.setValue("");
        for (var ii=0;ii<selrows;ii++){
            var rec = flxDebitAdjustments.getStore().getAt(ii);
            if (Number(rec.get('adjamt'))>0){
                if (cmbAdjType.getValue() == "A"){
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                }else{
                }
            }
        }
    retval=Ext.util.Format.number(Number(rec.data.pendingamt) - Number(rec.data.adjamt),"0.00");

        txtTotadjamtDr.setRawValue(Ext.util.Format.number(ginadjtotal,"0.00"));
    }
    
function CalcSum_Cr(){
        var selrows = flxCreditAdjustments.getStore().getCount();
        var ginadjtotal = 0;
        txtTotadjamtCr.setValue("");
        for (var ii=0;ii<selrows;ii++){
            var rec = flxCreditAdjustments.getStore().getAt(ii);
            if (Number(rec.get('adjamt'))>0){
                if (cmbAdjType.getValue() == "A"){
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                }else{
                }
            }
        }
        txtTotadjamtCr.setRawValue(Ext.util.Format.number(ginadjtotal,"0.00"));
    }


    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsJournal.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBillAdjustmentDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['ref_slno', 'ref_docseqno', 'ref_docno', 'ref_docdate', 'ref_adjseqno', 'ref_adjvouno', 'ref_invno', 'ref_invdate', 'ref_adjamount', 'ref_paymt_terms', 'ref_adj_days', 'ref_adj_by', 'ref_adjusted_on',
'acctrail_accref_seqno' , 'acctrail_inv_value',  'acctrail_led_code','acctrail_crdays','ref_adjvoutype',
'acctrail_crdays','ref_ledcode',
'invh_crd_days', 'invh_grace_days'])
    });

    var LoadAdjustmentDetailsdatastore2 = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore2',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsJournal.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBillAdjustmentDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['ref_slno', 'ref_docseqno', 'ref_docno', 'ref_docdate', 'ref_adjseqno', 'ref_adjvouno', 'ref_invno', 'ref_invdate', 'ref_adjamount', 'ref_paymt_terms', 'ref_adj_days', 'ref_adj_by', 'ref_adjusted_on',
'acctrail_accref_seqno' , 'acctrail_inv_value',  'acctrail_led_code','acctrail_crdays','ref_adjvoutype',
'acctrail_crdays','ref_ledcode',
'invh_crd_days', 'invh_grace_days'])
    });


function loadAdjustments()
{
                   flxAdjustments.getStore().removeAll();  
                  if (Number(txtTotadjamtCr.getValue())  > 0)
                    {

			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'C',

		                })
		                );
                            }  
                        }
                    } 



                      if (Number(txtTotadjamtDr.getValue())  > 0)
                    {
			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'D',
		                })
		                );
                            }  
                        }
                    } 
}

function getAdjustmentDetails()
{


   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;

       LoadAdjustmentDetailsdatastore2.removeAll();
       LoadAdjustmentDetailsdatastore2.load({
           url: 'ClsJournal.php',
           params: {
	        task     : 'LoadBillAdjustmentDetails',
                seqno    : acseqno,
                compcode : gstfincompcode,   
                ledcode  : ledgercode,
                dbcr     : "R",
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore2.getCount();

              if (cnt>0)
              {
      
               for(var j=0; j<cnt; j++) 
               {
//alert(LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_invno'));
                        invoiceno = LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_invno');
                        adjusted = Number(LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_adjamount'));
	                invdate  = LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_invdate');

		        invamt  =  LoadAdjustmentDetailsdatastore2.getAt(j).get('acctrail_inv_value');
		        crdays  =  LoadAdjustmentDetailsdatastore2.getAt(j).get('acctrail_crdays');

		        voutype =  LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_adjvoutype');

		        accrefseqno =  LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_adjseqno');
		        accrefvouno = LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_adjvouno');
                        accledcode  = LoadAdjustmentDetailsdatastore2.getAt(j).get('ref_ledcode');
                        rowadjusted = 0;  
                        rowpending= 0;  

			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                        reccount = 0; 
			for (var i = 0; i < selrows; i++) {

			        if (sel[i].data.invno == invoiceno ) {
		                    rowadjusted = Number(sel[i].data.adjamt) + Number(adjusted) ;
	                            rowpending = Number(sel[i].data.pendingamt) + Number(rowadjusted);
                                    rowbalance = Number(rowpending) - Number(rowadjusted);  
		                    sel[i].set('adjamt', rowadjusted);
		                    sel[i].set('pendingamt', rowpending);
		                    sel[i].set('balance', rowbalance); 
		                    reccount = reccount+1;

				}
                        }


		        if  (reccount == 0 )
		        {  



                        var RowCnt = flxCreditAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxCreditAdjustments.getStore().getCount()+1;
		        flxCreditAdjustments.getStore().insert(
		                flxCreditAdjustments.getStore().getCount(),
		                new dgrecord({

                            invno: invoiceno,
                            invdate: invdate,
                            invamt: invamt,
                            payterms: crdays,
                            dbcramt: adjusted,
                            adjamt    : adjusted,    
                            balamt     : 0,
                            pendingamt: adjusted,
                            voutype: voutype,
                 //           Year:gstfin,
                            accrefseqno: accrefseqno,
                            accrefvouno: accrefvouno ,
                            ledcode : accledcode


		                })
		                );



		                CalcSum_Cr();
		        }

	                CalcSum_Cr();


		}

   //  alert(txtTotadjamtCr.getValue());
                        loadAdjustments();

              } 
/*  
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }  
*/ 
          }
      });  
}   



function getAdjustmentDetails3()
{


   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;
  //  flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'ClsJournal.php',
           params: {
	        task     : 'LoadBillAdjustmentDetails',
                seqno    : acseqno,
                compcode : gstfincompcode,
                ledcode  : ledgercode,
                dbcr     : "P",
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {
      
               for(var j=0; j<cnt; j++) 
               {

//alert("adjustments");
                        invoiceno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invno');
                        adjusted = Number(LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjamount'));
	                invdate  = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invdate');

		        invamt  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_inv_value');
		        crdays  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_crdays');

		        voutype =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvoutype');

		        accrefseqno =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjseqno');
		        accrefvouno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvouno');
                        accledcode  = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_ledcode');
                        rowadjusted = 0;  
                        rowpending= 0;  

			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                        reccount = 0; 
			for (var i = 0; i < selrows; i++) {

			        if (sel[i].data.invno == invoiceno ) {
		                    rowadjusted = Number(sel[i].data.adjamt) + Number(adjusted) ;
	                            rowpending = Number(sel[i].data.pendingamt) + Number(rowadjusted);
                                    rowbalance = Number(rowpending) - Number(rowadjusted);  
		                    sel[i].set('adjamt', rowadjusted);
		                    sel[i].set('pendingamt', rowpending);
		                    sel[i].set('balance', rowbalance);
		                    reccount = reccount+1;
				}


                        }

//alert(reccount);
		        if  (reccount == 0 )
		        {  




                        var RowCnt = flxDebitAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxDebitAdjustments.getStore().getCount()+1;
		        flxDebitAdjustments.getStore().insert(
		                flxDebitAdjustments.getStore().getCount(),
		                new dgrecord({

                            invno: invoiceno,
                            invdate: invdate,
                            invamt: invamt,
                            payterms: crdays,
                            dbcramt: adjusted,
                            adjamt    : adjusted,    
                            balamt     : 0,
                            pendingamt: adjusted,
                            voutype: voutype,
                 //           Year:gstfin,
                            accrefseqno: accrefseqno,
                            accrefvouno: accrefvouno ,
                            ledcode : accledcode


		                })
		                );



		                CalcSum_Dr();
		        }

   	                CalcSum_Dr();  
		}

   	                CalcSum_Dr();  
//alert(txtTotadjamtDr.getValue());
loadAdjustments();
              } 
/*  
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }  
*/ 
          }
      });  
}   


    var flxAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200, //380,
        width: 850,
        x: 5,
        y: 580,
        id :'flxAdjustments',
        columns: [         
            {header: "Vouno", dataIndex: 'accrefvouno',sortable:true,width:80,align:'left',hidden : false},
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 90, align: 'left'},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:80,align:'left'},
            {header: "P.Terms", dataIndex: 'payterms', sortable: true, width: 80, align: 'center',hidden : true},
            {header: "Inv Amt", dataIndex: 'invamt',sortable:true,width:90,align:'left',hidden : true },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:80,align:'right'},
            {header: "Adjusted", dataIndex: 'adjamt',sortable:true,width:80,align:'right'},
            {header: "Balance", dataIndex: 'balamt',sortable:true,width:90,align:'right'},
            {header: "Accrefseqno", dataIndex: 'accrefseqno',sortable:true,width:40,align:'left',hidden:false},
            {header: "Type", dataIndex: 'voutype',sortable:true,width:40,align:'left',hidden:false},
            {header: "ledcode", dataIndex: 'ledcode',sortable:true,width:40,align:'left',hidden:false},
            {header: "drcr", dataIndex: 'drcr',sortable:true,width:40,align:'left',hidden:false},

        ]
    });
    



    var flxDebitAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200, //380,
        width: 850,
        x: 5,
        y: 5,
        id :'flxdebit',
        enableKeyEvents: true,
        keys: {
		key: Ext.EventObject.ENTER,
		fn: function() {txtRemarks.focus();},
		scope: this
        }, 
  
        columns: [         
            {header: "Vouno", dataIndex: 'accrefvouno',sortable:true,width:80,align:'left',hidden : true},
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 90, align: 'left'},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:80,align:'left'},
            {header: "P.Terms", dataIndex: 'payterms', sortable: true, width: 80, align: 'center',hidden : true},
            {header: "Inv Amt", dataIndex: 'invamt',sortable:true,width:90,align:'left',hidden : true },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:80,align:'right'},
            {header: "Adjusted", dataIndex: 'adjamt',sortable:true,width:80,align:'right',
                editor: {
                    xtype:'numberfield',
                    allowBlank:true,
                    enableKeyEvents: true,
                    listeners:{
                        focus:function(){
                            var sm = flxDebitAdjustments.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotadjamtDr.setValue(Number(txtTotadjamtDr.getRawValue())-Number(this.getRawValue()));
                        },
                        blur:function(){
                            CalcSum_Dr();
                        },
                        keyup: function(){
                            var sm = flxDebitAdjustments.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt=0;
                            pendingamt = Number(selrow.get('pendingamt'));
                            if (Number(this.getRawValue())>Number(pendingamt)){
                                Ext.MessageBox.alert("Bill Adjustment","Adjusted amount cannot be greater than pending amount");
                                this.setValue("");
                                selrow.set('adjamt',"");
                                CalcSum_Dr();
                            }else{
                                if (Number(txtTotadjamtDr.getRawValue())<Number(txtAmountDr.getRawValue())){
                                    if(Number(txtAmountDr.getRawValue())-Number(txtTotadjamtDr.getRawValue())>Number(this.getRawValue())){
                                        
                                    }else {

                                        this.setValue(Number(txtAmountDr.getRawValue())-Number(txtTotadjamtDr.getRawValue()));
                                    }
                                }else{
                                    this.setValue("");
                                }
                            }
                        }
                    }
                },
                listeners: {
                    click: function(){
                        UpdateReceiptBillsAdjusted();
                    }
                }
            },
            {header: "Balance", dataIndex: 'balamt',sortable:true,width:90,align:'right',
                renderer: function(v, params, record){
                    var retval;
                    if (Number(record.data.adjamt)>0){
                        retval=Ext.util.Format.number(Number(record.data.pendingamt) - Number(record.data.adjamt),"0.00");
                    }else{
                        retval=Number(record.data.pendingamt);
                    }
                    return retval;
                }
            },
            {header: "Accrefseqno", dataIndex: 'accrefseqno',sortable:true,width:40,align:'left',hidden:false},
            {header: "Type", dataIndex: 'voutype',sortable:true,width:40,align:'left',hidden:false},
            {header: "ledcode", dataIndex: 'ledcode',sortable:true,width:40,align:'left',hidden:false},
        ]
    });
    


  //  var fm = Ext.form;
    var flxCreditAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 850,
        x: 5,
        y: 310,
        id :'flxcredit',
        enableKeyEvents: true,
        keys: {
		key: Ext.EventObject.ENTER,
		fn: function() {txtRemarks.focus();},
		scope: this
        }, 
  
        columns: [         
            {header: "Vouno", dataIndex: 'accrefvouno',sortable:true,width:80,align:'left',hidden : true},     
            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 90, align: 'left'},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:80,align:'left'},
            {header: "P.Terms", dataIndex: 'payterms', sortable: true, width: 80, align: 'center',hidden : true},
            {header: "Inv Amt", dataIndex: 'invamt',sortable:true,width:90,align:'left',hidden : true },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:80,align:'right'},
            {header: "Adjusted", dataIndex: 'adjamt',sortable:true,width:80,align:'right',
                editor: {
                    xtype:'numberfield',
                    allowBlank:true,
                    enableKeyEvents: true,
                    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
         //   alert("Enter");        
             }
          },

                        focus:function(){
                            var sm = flxCreditAdjustments.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotadjamtCr.setValue(Number(txtTotadjamtCr.getRawValue())-Number(this.getRawValue()));
                        },
                        blur:function(){
                            CalcSum_Cr();
                        },
                        keyup: function(){
                            var sm = flxCreditAdjustments.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt=0;
                            pendingamt = Number(selrow.get('pendingamt'));
                            if (Number(this.getRawValue())>Number(pendingamt)){
                                Ext.MessageBox.alert("Bill Adjustment","Adjusted amount cannot be greater than pending amount");
                                this.setValue("");
                                selrow.set('adjamt',"");
                                CalcSum_Cr();
                            }else{
                                if (Number(txtTotadjamtCr.getRawValue())<Number(txtAmountCr.getRawValue())){
                                    if(Number(txtAmountCr.getRawValue())-Number(txtTotadjamtCr.getRawValue())>Number(this.getRawValue())){
                                        
                                    }else {

                                        this.setValue(Number(txtAmountCr.getRawValue())-Number(txtTotadjamtCr.getRawValue()));
                                    }
                                }else{
                                    this.setValue("");
                                }
                            }
                        }
                    }
                },
                listeners: {



                    click: function(){
                        UpdateReceiptBillsAdjusted2();
                    }
                }
            },
            {header: "Balance", dataIndex: 'balamt',sortable:true,width:90,align:'right',
                renderer: function(v, params, record){
                    var retval;
                    if (Number(record.data.adjamt)>0){
                        retval=Ext.util.Format.number(Number(record.data.pendingamt) - Number(record.data.adjamt),"0.00");
                    }else{
          //              retval=Number(record.data.pendingamt);
                        retval=Ext.util.Format.number(record.data.pendingamt,"0.00");
                    }
                    return retval;
                }
            },
            {header: "Accrefseqno", dataIndex: 'accrefseqno',sortable:true,width:40,align:'left',hidden:false},
            {header: "Type", dataIndex: 'voutype',sortable:true,width:40,align:'left',hidden:false},
            {header: "ledcode", dataIndex: 'ledcode',sortable:true,width:40,align:'left',hidden:false},
        ],
        listeners:{

          specialkey:function(f,e){
//alert(e.getKey());
             if (e.getKey() == e.ENTER)
             { 
//            alert("Enter");        
             }
         }
 }
    });
    




/*
 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name'
      ]),
    });

function itemSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsJournal.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}
*/


    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 400,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
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

function LedgerSearch()
{
        ledgercode = 0;
        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsJournal.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}



/*
var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search Ledger',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchLedgerListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     itemSearch();
            }
         }  
    });
*/


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		ledgercode = selrow.get('cust_code');
		ledtype    = selrow.get('cust_type');

//				cmbAccountName.setValue(selrow.get('cust_code'));
		txtAccountName.setValue(selrow.get('cust_name'));
                cmbType.focus() 
                flxLedger.hide();   


	}

}


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxLedger,
        x: 15,
        y: 120,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:330,align:'left'},

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
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
   }
   });



function UpdateReceiptBillsAdjusted(){
        var sm = flxDebitAdjustments.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxDebitAdjustments.store.indexOf(selrow);
        var rcnt = flxDebitAdjustments.getStore().getCount();
        txtTotadjamtDr.setValue("");
        for (var i=0;i<rcnt;i++){
            var rec = flxDebitAdjustments.getStore().getAt(i);
            if (Number(rec.get('adjamt'))>0 && i!=rownum){
                if (cmbAdjType.getValue() == "A"){
                    txtTotadjamtDr.setValue(Number(txtTotadjamtDr.getRawValue())+Number(rec.get('adjamt')));
                }else{
                }
            }
        }
        if (cmbAdjType.getValue() != "A"){

        }else{
            if (Number(txtTotadjamtDr.getRawValue())<Number(txtAmountDr.getRawValue())){
                if(Number(txtAmountDr.getRawValue())-Number(txtTotadjamtDr.getRawValue())>selrow.get('pendingamt') && selrow.get('pendingamt')>0){
                    selrow.set('adjamt',selrow.get('pendingamt'));
                }else if (selrow.get('pendingamt')>0){
                    selrow.set('adjamt',Number(txtAmountDr.getRawValue())-Number(txtTotadjamtDr.getRawValue()));
                }else{
                    selrow.set('adjamt',0);
                }
                selrow.set('balamt',selrow.get('pendingamt')-selrow.get('adjamt'));
                CalcSum_Dr();
            }
        }
    }
 

function UpdateReceiptBillsAdjusted2(){
        var sm = flxCreditAdjustments.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxCreditAdjustments.store.indexOf(selrow);
        var rcnt = flxCreditAdjustments.getStore().getCount();
        txtTotadjamtCr.setValue("");
        for (var i=0;i<rcnt;i++){
            var rec = flxCreditAdjustments.getStore().getAt(i);
            if (Number(rec.get('adjamt'))>0 && i!=rownum){
                if (cmbAdjType.getValue() == "A"){
                    txtTotadjamtCr.setValue(Number(txtTotadjamtCr.getRawValue())+Number(rec.get('adjamt')));
                }else{
                }
            }
        }
        if (cmbAdjType.getValue() != "A"){

        }else{
            if (Number(txtTotadjamtCr.getRawValue())<Number(txtAmountCr.getRawValue())){
                if(Number(txtAmountCr.getRawValue())-Number(txtTotadjamtCr.getRawValue())>selrow.get('pendingamt') && selrow.get('pendingamt')>0){
                    selrow.set('adjamt',selrow.get('pendingamt'));
                }else if (selrow.get('pendingamt')>0){
                    selrow.set('adjamt',Number(txtAmountCr.getRawValue())-Number(txtTotadjamtCr.getRawValue()));
                }else{
                    selrow.set('adjamt',0);
                }
                selrow.set('balamt',selrow.get('pendingamt')-selrow.get('adjamt'));
                CalcSum_Cr();
            }
        }
    }
 

function add_btn_click()
{
                var gstInsert = "true";



 
                if (txtAccountName.getValue()==0||txtAccountName.getRawValue()=="" || ledgercode == 0 ){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Journal","Select Ledger");
                }else if (cmbType.getRawValue()== 'Dr'){
                    if (txtDebit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Debit Amount");
                        Ext.getCmp('txtDebit').focus(false, 200);
 
                    }
                }else if (cmbType.getRawValue()== 'Cr'){
                    if (txtCredit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Credit Amount");
                        Ext.getCmp('txtCredit').focus(false, 200);

                    }
                }


	        flxDetail.getSelectionModel().selectAll();
	        var selrows = flxDetail.getSelectionModel().getCount();
	        var sel = flxDetail.getSelectionModel().getSelections();
	        var cnt = 0;
	        for (var i=0;i<selrows;i++){
	            if (sel[i].data.ledseq == txtAccountName.getValue()){
	                cnt = cnt + 1;
	            }
	        }



                if (gstInsert == "true")
                {
                if (gridedit === "false")
                { 

		        if (cnt > 0){
		            gstInsert = "false";
		            Ext.MessageBox.alert("Journal","This Ledger Already Entered");
		        }
                }
                if (gridedit === "true")
                {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
			sel[idx].set('type'    , cmbType.getRawValue());
			sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
                        sel[idx].set('ledseq'  , ledgercode);
			sel[idx].set('totamt'  , Number(txtDebit.getRawValue()) + Number(txtCredit.getRawValue()));
			sel[idx].set('ledtype' , ledtype);
                	sel[idx].set('narration' , txtRemarks.getRawValue().toUpperCase());
                        txtRemarks.setValue('');
			flxDetail.getSelectionModel().clearSelections();


                    if (Number(txtDebit.getValue())  > 0)
                    {
			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            seqno = Number(sel[i].data.accrefseqno);
        
			    var sm = flxAdjustments.getSelectionModel();
			    var selrow = sm.getSelected();
			    var rownum = flxAdjustments.store.indexOf(selrow);
			    var rcnt = flxAdjustments.getStore().getCount();
			    for (var j=0;j<rcnt;j++){
				    var rec = flxAdjustments.getStore().getAt(j);
			//alert(rec.get('accrefseqno'));
				    if (Number(rec.get('accrefseqno')) == Number(seqno)){
            			       rec.set('adjamt',0);
				    }
                             }
                        }
                    } 
                    if (Number(txtCredit.getValue())  > 0)
                    {
			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            seqno = Number(sel[i].data.accrefseqno);
        
			    var sm = flxAdjustments.getSelectionModel();
			    var selrow = sm.getSelected();
			    var rownum = flxAdjustments.store.indexOf(selrow);
			    var rcnt = flxAdjustments.getStore().getCount();
			    for (var j=0;j<rcnt;j++){
				    var rec = flxAdjustments.getStore().getAt(j);
			//alert(rec.get('accrefseqno'));
				    if (Number(rec.get('accrefseqno')) == Number(seqno)){
            			       rec.set('adjamt',0);
				    }
                            }
                        }
                    } 

                    if (Number(txtDebit.getValue())  > 0)
                    {

			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'C',

		                })
		                );
                            }  
                        }
                    }     
                      if (Number(txtCredit.getValue())  > 0)
                    {
			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'D',
		                })
		                );
                            }  
                        }
                    }  


                        CalcTotalDebitCredit();
		}//if(gridedit === "true")
                else
                if  (cnt ==0){
                    var totamt;
                    totamt= Number(txtDebit.getRawValue())+ Number(txtCredit.getRawValue())
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            ledname : txtAccountName.getRawValue(),   
                            type    : cmbType.getRawValue(),
                            dbamt   : Number(txtDebit.getRawValue()),
                            cramt   : Number(txtCredit.getRawValue()),
	                    ledseq  : ledgercode,
                            totamt  : totamt,
                            ledtype : ledtype,
                            narration : txtRemarks.getRawValue().toUpperCase(),
                        })
                    );

                    if (Number(txtDebit.getValue())  > 0)
                    {

			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'C',
		                })
		                );
                            }  
                        }
                    }     
                      if (Number(txtCredit.getValue())  > 0)
                    {
			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'D',
		                })
		                );
                            }  
                        }
                    }  

             
                    txtRemarks.setValue('');
                    txtAccountName.focus();
		    txtAccountName.setRawValue('');
                    CalcTotalDebitCredit();
                    ledgercode = 0;   

                }
            }


            txtDebit.setRawValue('');
            txtCredit.setRawValue('');

}



    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'},
            {name: 'cust_type', type: 'string', mapping: 'cust_type'},
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });


     function CalcTotalDebitCredit(){
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
         gindbtotal = 0;
         gincrtotal = 0;
        for (var i=0;i<selrows;i++){
            gindbtotal = Number(gindbtotal)+Number(sel[i].data.dbamt);
            gincrtotal = Number(gincrtotal)+Number(sel[i].data.cramt);
        };
        txtTotaldbamt.setRawValue(gindbtotal.toFixed(2));
        txtTotalcramt.setRawValue(gincrtotal.toFixed(2));
    };

    
    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbjouledger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'cust_code', type: 'int', mapping: 'cust_code'},
          {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo:{field: 'cust_name', direction: "ASC"}
    });
    
    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbvoucher"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
          {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
    //    sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });

    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','cust_type', 'led_custcode' ,'acctran_narration' ])
    });



    var txtVouno = new Ext.form.TextField({
        fieldLabel  : 'Vou No',
        id          : 'txtVouno',
        width       : 90,
        name        : 'txtVouno',
        readOnly    : 'true',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
    })

    
    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel      : 'Vou No',
        width           : 90,
        store           : Voucherdatastore, //readOnly:true,
        displayField    : 'vou_no',
        valueField      : 'vou_seqno',
        hiddenName      : 'vou_no',
        id              : 'cmbVouNo',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
        listeners:{
           select: function(){
                      Ext.getCmp('editchk').hide();

                       Ext.getCmp('DebitFlx').setDisabled(true);
                       flxAdjustments.getStore().removeAll();  
                       flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                              txtVouno.setRawValue(cmbVouNo.getRawValue());
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              ledgercount = 0;
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      acseqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouno.setRawValue(cmbVouNo.getRawValue());



                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefno.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefdate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      ledgercode  = LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'); 
                                      custtype = LoadVouNoDetailsdatastore.getAt(j).get('cust_type');
                                      if (custtype != 'G')
                                          ledgercount += 1;
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)           
                                      { 
                                         drcr = 'Dr';
                                         txtAmountCr.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'));	
                                      }  
                                      else
                                      {
                                         drcr = 'Cr';
                                         txtAmountDr.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'));	
                                      }
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),           
			                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),
                                             narration : LoadVouNoDetailsdatastore.getAt(j).get('acctran_narration'),

	                                  })
                                      );



                                  }

                                  for(var j=0; j<cnt; j++) 
                                  {


                                      acseqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouno.setRawValue(cmbVouNo.getRawValue());
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefno.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefdate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      ledgercode  = LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'); 
                                      custtype = LoadVouNoDetailsdatastore.getAt(j).get('cust_type');



                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                      { 
                                         drcr = 'Dr';
                                         dbcr = "P";


                                         if (custtype != "G" && ledgercount == 0)    
                                         {
   				            flxCreditAdjustments.getStore().removeAll(); 
				            InsertUnAdjustedBillDetail2();
				            getAdjustmentDetails();
                                         }    
                                      } 
 
                                      else
                                      {

                                         drcr = 'Cr';
                                         dbcr = "R";
                                         if (custtype != "G" && ledgercount == 0)    
                                         {
   				            flxDebitAdjustments.getStore().removeAll(); 
				            InsertUnAdjustedBillDetail3();
				            getAdjustmentDetails3();
                                         }    

	

                                      }



                                  }

                CalcTotalDebitCredit();
                EditDateCheck();

                              }  




                          }
//for getting adjustment details


                      });  




            }    
        }
    });
    
   
  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays > (GinNewDays+1))
        {     
             alert("You are Not Allowed to Raise the document in the date of " +  Ext.util.Format.date(dt_voucher,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the document in Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Document Date is not in current finance year. Please check");
    }
    dtpRefdate.setRawValue(dtpVouDate.getRawValue());

 }


  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 



        if (diffdays > (GinEditDays+1))
        {     
             alert("You are Not Allowed to Modify this document. Contact HOD for Corrections.." );
             Ext.getCmp('save').setDisabled(true);  
        }
        else
        {
             Ext.getCmp('save').setDisabled(false);  
        }       

 
 }




    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: 'Vou. Date ',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
        }  	
        
    });
    var lblAcctname = new Ext.form.Label({
        fieldLabel  : 'Account Name',
        id          : 'lblAcctname',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
   


var txtAccountName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  370,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 if (ledgercode == 0)
                 {    
                    alert("Select Ledger Name ...");
                    txtAccountName.focus();
                 }
                 else
                 {    
                   flxLedger.hide();
                   cmbType.focus();
                 }     
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtAccountName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtAccountName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
    });

 

    




    var lblType = new Ext.form.Label({
        fieldLabel  : 'Type',
        id          : 'lblType',
        width       : 50,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
    
   function cmbtypechange()
   {
//alert(cmbType.getValue());
        if (cmbType.getValue()==1){
            txtDebit.enable();
            Ext.getCmp('txtDebit').focus(true, 1);
            txtCredit.disable();
            txtCredit.setValue("");
	    txtDebit.setValue("");
            dbcr = "P";	
        }else if (cmbType.getValue()==2){
            txtDebit.disable();
            txtCredit.enable();
            Ext.getCmp('txtCredit').focus(true, 1);
	    txtCredit.setValue("");	
            txtDebit.setValue("");
            dbcr = "R";
        }else{
            txtDebit.disable();
            txtCredit.disable();
            txtDebit.setValue("");
            txtCredit.setValue("");
        }

   }

     var cmbAdjType = new Ext.form.ComboBox({
        id: 'cmbAdjType',
        store: [],
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
  //      fieldLabel:'RCM (Y /N)',
        editable:false,
        store: [['A','ADJUSTMENTS'],['O','OTHERS']],
       
        width: 110,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
                Ext.getCmp('DebitFlx').setDisabled(false);


    if (cmbType.getRawValue()=="Dr")
    {
  //       Ext.getCmp('flxdebit').setDisabled(true);
    //     Ext.getCmp('flxcredit').setDisabled(false);

flxCreditAdjustments.getEl().dom.style.pointerEvents = 'auto';
flxCreditAdjustments.getEl().dom.style.opacity = 1;

flxDebitAdjustments.getEl().dom.style.pointerEvents = 'none';
flxDebitAdjustments.getEl().dom.style.opacity = 0.5; // optional visual cue


    }
    else
    {
  //       Ext.getCmp('flxdebit').setDisabled(false);
//         Ext.getCmp('flxcredit').setDisabled(true);

flxCreditAdjustments.getEl().dom.style.pointerEvents = 'none';
flxCreditAdjustments.getEl().dom.style.opacity = 0.5; // optional visual cue

flxDebitAdjustments.getEl().dom.style.pointerEvents = 'auto';
flxDebitAdjustments.getEl().dom.style.opacity = 1; // optional visual cue


    }



    if (gstFlag == "Add")
    {     
                cmbAdjType.hide(); 
                if (cmbAdjType.getValue() == "A")
                { 
                if (Number(txtDebit.getValue()) > 0)
                {  

                        flxCreditAdjustments.getStore().removeAll(); 
                        flxCreditAdjustments.show();

   //                      flxcredit.editingPlugin.startEdit(rec, 4);

               //        flxcredit.getSelectionModel().setCurrentPosition({row: 1, column: 4});
                }
                else
                {  
                        flxDebitAdjustments.getStore().removeAll(); 
                        flxDebitAdjustments.show();

                }
                InsertUnAdjustedBillDetail();
//             btnSubmit.focus();
                }
                else
                {
                      txtRemarks.focus();
                }    


     
             }
           }   
          },
                 blur: function(){
            
            },
            change: function(){
            
            },
            select : function(){
            
            }  
         } 
    });
    


    var cmbType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'type_name',
        valueField      : 'type_code',
        hiddenName      : 'type_name',
        id              : 'cmbType',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        store           : [['1','Dr'],['2','Cr']],
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
               Ext.getCmp('txtDebit').focus(true, 1);
             }
          },

            blur: function(){
      //             cmbtypechange();
            },
            change: function(){
       //            cmbtypechange();
            },
            select : function(){
                   cmbtypechange();
            }

        }
    });
    
    var lblDebit = new Ext.form.Label({
        fieldLabel  : 'Debit',
        id          : 'lblDebit',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
  
    });
    

function InsertUnAdjustedBillDetail(){

	  UnAdjustedBillDetaildatastore.removeAll(); 
          UnAdjustedBillDetaildatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task: "getunadjbilldet",
                compcode : gstfincompcode,
                ledcode  : ledgercode,
                finid    : ginfinid,
                voutype  : dbcr
            },
            callback: function(){
                var RowCnt = UnAdjustedBillDetaildatastore.getCount();


                for(var i=0;i<RowCnt;i++){
                    var finid=UnAdjustedBillDetaildatastore.getAt(i).get('accref_finid');
                    gstfin =   gstfinyear;

                       var tamt = Number(UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value')) -
                                    Number(UnAdjustedBillDetaildatastore.getAt(i).get('dbcr_invvalue'));
                       var pamt = UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value') -
                                    Number(UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_adj_value'));

                    if (dbcr == 'R')
                    {
                    flxDebitAdjustments.getStore().insert(
                        flxDebitAdjustments.getStore().getCount(),
                        new dgadjrecord({
                            invno: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_no'),
                            invdate: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_date'),
                            invamt: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value'),
                            payterms: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_crdays'),
                            dbcramt: Ext.util.Format.number(UnAdjustedBillDetaildatastore.getAt(i).get('dbcr_invvalue'),"0.00"),
                            adjamt    : 0,    
                            totamt    : Ext.util.Format.number(tamt,"0.00"),
                            pendingamt: Ext.util.Format.number(pamt,"0.00"),
                            voutype: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vou_type'),
                            Year:gstfin,
                            accrefseqno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_seqno'),
                            accrefvouno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vouno'),
                            ledcode : UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_led_code')
                        })
                    );
                  }
                  else
                  {
                    flxCreditAdjustments.getStore().insert(
                        flxCreditAdjustments.getStore().getCount(),
                        new dgadjrecord({
                            invno: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_no'),
                            invdate: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_date'),
                            invamt: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_inv_value'),
                            payterms: UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_crdays'),
                            dbcramt: Ext.util.Format.number(UnAdjustedBillDetaildatastore.getAt(i).get('dbcr_invvalue'),"0.00"),
                            adjamt    : 0,    
                            totamt    : Ext.util.Format.number(tamt,"0.00"),
                            pendingamt: Ext.util.Format.number(pamt,"0.00"),
                            voutype: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vou_type'),
                            Year:gstfin,
                            accrefseqno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_seqno'),
                            accrefvouno: UnAdjustedBillDetaildatastore.getAt(i).get('accref_vouno'),
                            ledcode : UnAdjustedBillDetaildatastore.getAt(i).get('acctrail_led_code')
                        })
                    );
                  }

                }


//var editor = flxCreditAdjustments.getPlugin('myRowEditor');
//flxCreditAdjustments.getSelectionModel().select(lastRowCounter);   //0 based selector.
//editor.startEdit(lastRowCounter,5);  //start editing on Second column.


            }
        });
    }

// for Credit Adjustments
function InsertUnAdjustedBillDetail2(){

	  UnAdjustedBillDetaildatastore2.removeAll(); 
          UnAdjustedBillDetaildatastore2.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task: "getunadjbilldet",
                compcode : gstfincompcode,
                ledcode  : ledgercode,
                finid    : ginfinid,
                voutype  : dbcr
            },
            callback: function(){
                var RowCnt = UnAdjustedBillDetaildatastore2.getCount();


                for(var i=0;i<RowCnt;i++){
                    var finid=UnAdjustedBillDetaildatastore2.getAt(i).get('accref_finid');
                    gstfin =   gstfinyear;

                       var tamt = Number(UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_inv_value')) -
                                    Number(UnAdjustedBillDetaildatastore2.getAt(i).get('dbcr_invvalue'));
                       var pamt = UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_inv_value') -
                                    Number(UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_adj_value'));

                    flxCreditAdjustments.getStore().insert(
                        flxCreditAdjustments.getStore().getCount(),
                        new dgadjrecord({
                            invno: UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_inv_no'),
                            invdate: UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_inv_date'),
                            invamt: UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_inv_value'),
                            payterms: UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_crdays'),
                            dbcramt: Ext.util.Format.number(UnAdjustedBillDetaildatastore2.getAt(i).get('dbcr_invvalue'),"0.00"),
                            adjamt    : 0,    
                            totamt    : Ext.util.Format.number(tamt,"0.00"),
                            pendingamt: Ext.util.Format.number(pamt,"0.00"),
                            voutype: UnAdjustedBillDetaildatastore2.getAt(i).get('accref_vou_type'),
                            Year:gstfin,
                            accrefseqno: UnAdjustedBillDetaildatastore2.getAt(i).get('accref_seqno'),
                            accrefvouno: UnAdjustedBillDetaildatastore2.getAt(i).get('accref_vouno'),
                            ledcode : UnAdjustedBillDetaildatastore2.getAt(i).get('acctrail_led_code')
                        })
                    );
                  }

                }
        });
    }


// for Debit Adjustments
function InsertUnAdjustedBillDetail3(){

	  UnAdjustedBillDetaildatastore3.removeAll(); 
          UnAdjustedBillDetaildatastore3.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task: "getunadjbilldet",
                compcode : gstfincompcode,
                ledcode  : ledgercode,
                finid    : ginfinid,
                voutype  : dbcr
            },
            callback: function(){
                var RowCnt = UnAdjustedBillDetaildatastore3.getCount();


                for(var i=0;i<RowCnt;i++){
                    var finid=UnAdjustedBillDetaildatastore3.getAt(i).get('accref_finid');
                    gstfin =   gstfinyear;

                       var tamt = Number(UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_inv_value')) -
                                    Number(UnAdjustedBillDetaildatastore3.getAt(i).get('dbcr_invvalue'));
                       var pamt = UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_inv_value') -
                                    Number(UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_adj_value'));

                    flxDebitAdjustments.getStore().insert(
                        flxDebitAdjustments.getStore().getCount(),
                        new dgadjrecord({
                            invno: UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_inv_no'),
                            invdate: UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_inv_date'),
                            invamt: UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_inv_value'),
                            payterms: UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_crdays'),
                            dbcramt: Ext.util.Format.number(UnAdjustedBillDetaildatastore3.getAt(i).get('dbcr_invvalue'),"0.00"),
                            adjamt    : 0,    
                            totamt    : Ext.util.Format.number(tamt,"0.00"),
                            pendingamt: Ext.util.Format.number(pamt,"0.00"),
                            voutype: UnAdjustedBillDetaildatastore3.getAt(i).get('accref_vou_type'),
                            Year:gstfin,
                            accrefseqno: UnAdjustedBillDetaildatastore3.getAt(i).get('accref_seqno'),
                            accrefvouno: UnAdjustedBillDetaildatastore3.getAt(i).get('accref_vouno'),
                            ledcode : UnAdjustedBillDetaildatastore3.getAt(i).get('acctrail_led_code')
                        })
                    );
                  }

                }
        });
    }

    var txtDebit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDebit',
        width       : 90,
        name        : 'debit',
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                    
                 txtAmountCr.setValue(txtDebit.getValue());
                 if (ledtype != 'G')
                 {  
                   cmbAdjType.show();  
                   Ext.getCmp('cmbAdjType').focus(true, 1);
                 }
                 else
                 {
                    btnSubmit.focus();
                 }    

             }
          }
        } 
    });
    
    var lblCredit = new Ext.form.Label({
        fieldLabel  : 'Credit',
        id          : 'lblCredit',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",


    });
    
    var txtCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCredit',
        width       : 90,
        name        : 'credit',
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                txtAmountDr.setValue(txtCredit.getValue());
                 if (ledtype != 'G')
                 {  
                   cmbAdjType.show();  
                   Ext.getCmp('cmbAdjType').focus(true, 1);
                 }
                 else
                 {
                    btnSubmit.focus();
                 }     
             }
          }
        } 
    });
    

function save_click()
{

/*
// Add data into Adjustment Grid

                    flxAdjustments.getStore().removeAll(); 
                    if (Number(txtTotadjamtDr.getValue())  > 0)
                    {

			flxCreditAdjustments.getSelectionModel().selectAll();
			var selrows = flxCreditAdjustments.getSelectionModel().getCount();
			var sel = flxCreditAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'C',
		                })
		                );
                            }  
                        }
                    }     
                      if (Number(txtTotadjamtCr.getValue())  > 0)
                    {
			flxDebitAdjustments.getSelectionModel().selectAll();
			var selrows = flxDebitAdjustments.getSelectionModel().getCount();
			var sel = flxDebitAdjustments.getSelectionModel().getSelections();
                      	for (var i = 0; i < selrows; i++) {
                            if (Number(sel[i].data.adjamt) > 0)
                            {

                        var RowCnt = flxAdjustments.getStore().getCount() ;

                        if (RowCnt ==0)
                            RowCnt = flxAdjustments.getStore().getCount()+1;
		        flxAdjustments.getStore().insert(
		                flxAdjustments.getStore().getCount(),
		                new dgrecord({
		                    accrefvouno  : sel[i].data.accrefvouno,
		                    invno      : sel[i].data.invno,
		                    invdate    : sel[i].data.invdate,
		                    invamt     : sel[i].data.invamt,
		                    payterms   : sel[i].data.payterms,
		                    dbcramt    : sel[i].data.dbcramt,
		                    adjamt     : sel[i].data.adjamt,    
		                    balamt     : sel[i].data.balamt,
		                    pendingamt : sel[i].data.pendingamt,
		                    accrefseqno: sel[i].data.accrefseqno,
		                    voutype    : sel[i].data.voutype,
		                    ledcode    : sel[i].data.ledcode ,
		                    drcr       : 'D',
		                })
		                );
                            }  
                        }
                    } 



*/

                        var rcnt = flxDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        /*var gstRefno;
                        if(txtRefno.getRawValue()==""){
                            gstRefno = cmbVouNo.getRawValue();
                        }else{
                            gstRefno = txtRefno.getRawValue();
                        }*/
                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
                        if (gstFlag == "Edit" && (txtReason.getRawValue() == ''  || txtReason.getRawValue().length <5  )  )
                        {
                            Ext.MessageBox.alert("Alert", "Reason for Edit is mandatory. Provide Reason..");
				Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
				    if (btn == 'ok'){
					txtReason.setRawValue(text)
		                        save_click();
				    }
				});
                                       
                        }
                        else if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(rcnt<=0){
                            Ext.MessageBox.alert("Journal","Transactions Details Not Avaliable ..");
                        }else if(Number(txtTotaldbamt.getRawValue())!=Number(txtTotalcramt.getRawValue())){
                            Ext.MessageBox.alert("Journal","The Transactions Debit and Credit Amount are not  Equal");
                        }else if( Number(txtDebit.getValue()) >0 || Number(txtCredit.getValue())){
                            Ext.MessageBox.alert("Journal"," Click SUBMIT button and Continue");
                        } 
                         else {
                            Ext.Msg.show({
                                title: 'Journal Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Save This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){


                                         Ext.getCmp('save').setDisabled(true);     

                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
/*

                                        var DebitData = flxDebitAdjustments.getStore().getRange();
                                        var DebitupdData = new Array();
                                        Ext.each(DebitData, function (record) {
                                            DebitupdData.push(record.data);
                                        });

                                        var CreditData = flxCreditAdjustments.getStore().getRange();
                                        var CreditupdData = new Array();
                                        Ext.each(CreditData, function (record) {
                                            CreditupdData.push(record.data);
                                        });

*/
                                        var AdjData = flxAdjustments.getStore().getRange();
                                        var AdjupdData = new Array();
                                        Ext.each(AdjData, function (record) {
                                            AdjupdData.push(record.data);
                                        });

                                        Ext.Ajax.request({
                                            url: 'FrmTrnJournalSave.php',
                                            params:{
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                cnt: accData.length,
/*
                                                debitgriddet: Ext.util.JSON.encode(DebitupdData),
                                                debitcnt: DebitData.length,

                                                credigriddet: Ext.util.JSON.encode(CreditupdData),
                                                creditcnt: CreditData.length,
*/
                                                adjgriddet: Ext.util.JSON.encode(AdjupdData),
                                                adjcnt: AdjData.length,

                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: acseqno,
                                                vouno: txtVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d"),
                                                bankname: "",
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "GJV",
                                                paymode: "",
                                                payno: "",
                                                paydate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                flagtype: gstFlag,

                                                usercode : GinUserid, 
                                                reason   : txtReason.getRawValue(),
            
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
                                                        RefreshData();

                                                        Ext.Msg.show({
                                                        title: 'Saved',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Record saved with Voucher No -'+ obj['vouno'],
                                                        fn: function(btn){
                                                            if (btn == 'yes'){
//                                                                window.location.reload();
                                                                RefreshData();
            
                                                            }else{
//                                                                window.location.reload();
                                                                RefreshData();
                                                            }
                                                        }
                                                        });
                                                }else{
                                                    Ext.MessageBox.alert("Alert","Record not saved - " + obj['vouno']);
                                                }
                                            }
                                       });
                                    }
                                }
                            });
                        }
}



function edit_click()
{


            cmbVouNo.setRawValue('GJV-');
            gstFlag = "Edit";
            cmbVouNo.show();
            txtVouno.hide();
		Voucherdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		    {
			task: "cmbvoucher",
			finid: ginfinid,
			voutype: 'GJV',
			compcode: gstfincompcode
		    },
	  	   callback:function()
		   {

//		       Ext.getCmp('flxdebit').setDisabled(true);  
//		       Ext.getCmp('flxcredit').setDisabled(true);
		   } 
		});


}
    var btnSubmit = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Submit",
        width   : 60,
        x       : 515,
        y       : 60,
        listeners: {
            click: function(){
                  add_btn_click(); 
 //       Ext.getCmp('DebitFlx').hide();
//        Ext.getCmp('CreditFlx').hide();    

            }
        }
    });
    
    var btnRemove = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Remove",
        width   : 60,
        x       : 715,
        y       : 30,
        handler: function(){
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
        }
    });
    
    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php'
            }),
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'AccountDetDataStore'
        },['ledname','currency','amount','exgrate','type','dbamt','cramt','ledseq','curseq','totamt'])
    });
    

    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 760,
        x: 20,
        y: 90,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname',sortable:true,width:270,align:'left'},
            {header: "Type", dataIndex: 'type',sortable:true,width:50,align:'left'},
            {header: "Debit", dataIndex: 'dbamt',sortable:true,width:100,align:'right'},
            {header: "Credit", dataIndex: 'cramt',sortable:true,width:100,align:'right'},
            {header: "Ledseqno", dataIndex: 'ledseq',sortable:true,width:60,align:'left',hidden:true},
            {header: "totamt", dataIndex: 'totamt',sortable:true,width:80,align:'left',hidden:true},
            {header: "ledtype", dataIndex: 'ledtype',sortable:true,width:60,align:'left',hidden:true},
            {header: "Narration", dataIndex: 'narration', sortable: true, width: 300, align: 'left', hidden: false}
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
                    gridedit = "true";
		    editrow  = selrow;
                    txtAccountName.setRawValue(selrow.get('ledname'));
                    ledgercode = selrow.get('ledseq');
                    ledtype    = selrow.get('ledtype');
                   // txtAccountName.setValue(selrow.get('ledseq'));
                    txtDebit.setValue(selrow.get('dbamt'));
                    txtAmountDr.setValue(selrow.get('dbamt'));
                    txtCredit.setValue(selrow.get('cramt'));
                    cmbType.setRawValue(selrow.get('type'));
                    txtRemarks.setValue(selrow.get('narration'));
                    if (selrow.get('dbamt') > 0)
                    {
                       dbcr = "P";
                    }
                    else
                    {
                       dbcr = "R";
                    }
   
                    flxDetail.getSelectionModel().clearSelections();
                    if (selrow.get('type') == 'Dr')
                    {
                        txtDebit.enable();
                        txtCredit.disable();
                        if (ledtype != 'G')    
                        {
 //                          Ext.getCmp('DebitFlx').hide();
  //                         Ext.getCmp('CreditFlx').show();
                           flxCreditAdjustments.getStore().removeAll(); 
                           InsertUnAdjustedBillDetail();
                           getAdjustmentDetails();
                        }
                        else
                        {
//                           Ext.getCmp('DebitFlx').hide();
//                           Ext.getCmp('CreditFlx').hide();
                        }
    

                    }  
                    else 
                    {
                        txtDebit.disable();
                        txtCredit.enable();
                        if (ledtype != 'G')    
                        {
                           flxDebitAdjustments.getStore().removeAll(); 
                           InsertUnAdjustedBillDetail();
                           getAdjustmentDetails3();
//                           Ext.getCmp('DebitFlx').show();
//                           Ext.getCmp('CreditFlx').hide();
                        }
                        else
                        {
//                           Ext.getCmp('DebitFlx').hide();
//                           Ext.getCmp('CreditFlx').hide();
                        }
                    }
		}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
         CalcTotalDebitCredit();
             }
        });         
    }
   }




    });



    
    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtTotaldbamt',readOnly:true,
        width       :  100,
        name        : 'totaldbamt',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });
    
    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel  : 'Total Crdit',
        id          : 'txtTotalcramt',readOnly:true,
        width       : 100,
        name        : 'totalcramt',
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });
    
    var txtRefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No',
        id          : 'txtRefno',
        width       : 180,
        name        : 'refno',
        style :{textTransform:"uppercase"},
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'29'},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });
    
    var dtpRefdate = new Ext.form.DateField({
        fieldLabel : 'Ref Date',
        id         : 'dtpRefdate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
//value: '2020-03-31',
        anchor     : '100%' 
    });
    
    var txtNarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtNarration',
        width       : 675,
        height      : 50,
        name        : 'narration',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });
    
    var JournalEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Journal Entry',
        header      : false,
        width       : 2000,//438,

                        bodyStyle: {"background-color": "#fff0ff"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'JournalEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),




        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: ' Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '/Pictures/Add.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Add";
                            RefreshData();
                        }
                    }
                },'-',
                {
//edit
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/Pictures/edit.png',
                    listeners:{
                      click: function () {
                             edit_click();

                        }
                    }
                },'-',
                {
//save
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                            save_click();
                    }


                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',hidden:false,
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(gstfincompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginfinid);
				var vouno = "&vouno=" + encodeURIComponent(cmbVouNo.getRawValue());

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                          window.location.reload();
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
                            JournalEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [

		    {   xtype       : 'fieldset',
		        title       : '',
                        id          : 'DebitFlx',
		        width       : 460,
		        height      : 510,
		        x           : 868,
		        y           : 2,
		        border      : true,
		        layout      : 'absolute',
		        style       : 'padding:0px',
		        items: [

				    { 
				        xtype       : 'fieldset',
				        title       : 'DEBIT VOUCHERS',
				        labelWidth  : 60,
				        width       : 440,
				        x           : 0,
				        y           : 10,
				        border      : false,
				        items: [flxDebitAdjustments]
				    },

				    { 
				        xtype       : 'fieldset',
				        title       : 'CREDIT VOUCHERS',
				        labelWidth  : 60,
				        width       : 440,
				        x           : 0,
				        y           : 260,
				        border      : false,
				        items: [flxCreditAdjustments]
				    },


				    { 
				        xtype       : 'fieldset',
				        title       : '',
				        labelWidth  : 100,
				        width       : 350,
				        x           : 180,
				        y           : 230,
				        defaultType : 'textfield',
				        border      : false,
				        items: [txtTotadjamtDr]
				    } ,

				    { 
				        xtype       : 'fieldset',
				        title       : '',
				        labelWidth  : 100,
				        width       : 350,
				        x           : 180,
				        y           : 473,
				        defaultType : 'textfield',
				        border      : false,
				        items: [txtTotadjamtCr]
				    } ,


		        ]
		     },  


 
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 350,
                        x           : 210,
                        y           : 475,
                        defaultType : 'textfield',
                        border      : false,
      //                  items: [txtAmountDr]
                    } ,
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 350,
                        x           : 500,
                        y           : 475,
                        defaultType : 'textfield',
                        border      : false,
       //                 items: [txtAmountCr]
                    } ,



            {   xtype       : 'fieldset',
                title       : '',
                width       : 850,
                height      : 60,
                x           : 10,
                y           : 2,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 7,
                        border      : false,
                        items: [cmbVouNo]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 7,
                        border      : false,
                        items: [txtVouno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 400,
                        x           : 300,
                        y           : 7,
                         border      : false,
                        items : [dtpVouDate]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 850,
                height      : 280,
                x           : 10	,
                y           : 65,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 180,
                        labelWidth  : 180,
                        x           : 5,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblAcctname]
                    },
                  /*  { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 450,
                        x           : 0,
                        y           : 20,
                        border      : false,
                        items: [txtAccountName]
                    },*/
{
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 420,
                                x: 0,
                                y: 20,
                                border: false,
//                                items: [cmbAccountName]
                                items: [txtAccountName]
                            }, 


                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 80,
                        x           : 405,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 400,
                        y           : 20,
                        border      : false,
                        items: [cmbType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 500,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 495,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 120,
                        x           : 605,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCredit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 600,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtCredit]
                    }, 


                     {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 550,
                                x: 0,
                                y: 50,
                                border: false,
                                items: [txtRemarks]
                            }, 

                    btnSubmit,  flxDetail,

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 150,
                        x           : 700,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [cmbAdjType]
                    }, 

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 375,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotaldbamt]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 570,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotalcramt]
                    },
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 850,
                height      : 110,
                x           : 10,
                y           : 350,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 300,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtRefno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 310,
                        y           : 0,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpRefdate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 775,
                        x           : 0,
                        y           : 30,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtNarration]
                    },

                ]
            },flxLedger,flxAdjustments,


                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                       id : 'editchk',
                        width: 460,
                        height: 455,
                        x: 850,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 300,
                                width: 250,
                                x: 5,
                                y: -10,
                                border: false,
                                items: [lblReason]
                            },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 5,
                        	width       : 520,
                        	x           : 5,
                        	y           : 15,
                            	border      : false,
                        	items: [txtReason]
                    },


                        ]  
                    },
        ]
    });
    
    function RefreshData(){
        gstFlag = "Add";
        Ext.getCmp('editchk').hide();
        txtUserName.setRawValue(GinUser);   
        Ext.getCmp('save').setDisabled(false);  
        Ext.getCmp('flxdebit').setDisabled(false);  
        Ext.getCmp('flxcredit').setDisabled(false);  
        Ext.getCmp('DebitFlx').setDisabled(false);  

        cmbVouNo.hide();
        txtVouno.show();
        flxCreditAdjustments.getStore().removeAll();
        flxDebitAdjustments.getStore().removeAll(); 
        flxAdjustments.getStore().removeAll(); 
  

      dtpVouDate.focus();
//       Ext.getCmp('DebitFlx').hide();
//        Ext.getCmp('CreditFlx').hide();
        cmbAdjType.hide();
        cmbAdjType.setValue('A');
        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task:"cmbjouledger"
            },
  	   callback:function()
           {
			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
           } 

        });

        txtDebit.enable();
        txtCredit.disable();


        txtTotalcramt.setValue("");
        txtTotaldbamt.setValue("");

        txtCredit.setValue("");
        txtDebit.setValue("");

        txtAmountDr.setValue("");
        txtDebit.setValue("");
        txtDebit.setValue("");
        txtRefno.setRawValue("");

        txtNarration.setValue("");
        txtAmountCr.setValue("");
        txtTotadjamtDr.setValue('');
        txtTotadjamtCr.setValue('');

//        cmbType.setRawValue("Dr");

        txtAccountName.setValue("");
        flxDetail.getStore().removeAll();


                   acseqno = 0;   


                    Voucherdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "cmbvoucher",
                            finid: ginfinid,
                            compcode: gstfincompcode,
                            voutype: 'GJV'
                        }
                    });
                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: ginfinid,
                            compcode: gstfincompcode,
                            voutype : 'GJV'
                        },
                        callback: function(){
//                                     var vno = VouNodatastore.getAt(0).get('con_value');
                                       if (VouNodatastore.getAt(0).get('con_value') < 10)
                                        {                                              
                                          vno = "00"+VouNodatastore.getAt(0).get('con_value');
                                        }                                      
                                        else
                                        {  
                                             if (VouNodatastore.getAt(0).get('con_value') < 100) 
                                             {                                              
                                              vno = "0"+VouNodatastore.getAt(0).get('con_value');                   
                                             }
                                             else 
                                             {      
                                               vno = VouNodatastore.getAt(0).get('con_value');  
                                             }
                                        } 


                                     vno =  "GJV-"+vno.slice(-4);  
             //                        vno = vno.trim() +'/'+ invfin; 
  	                             txtVouno.setValue(vno);
                     //       txtVouno.setValue("GJV-"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });
                    txtDebit.enable();
                    txtCredit.disable();

                    Ext.getCmp('editchk').hide();
  //                  cmbType.setValue(1);
   //                 cmbType.setRawValue('Dr');
  		    flxLedger.hide(); 
  		    cmbAdjType.hide(); 

    };
    
    function RefreshGridData(){
        txtDebit.setValue("");
        txtCredit.setValue("");
 
        cmbType.setValue(1);
        cmbType.setRawValue('Dr');
 flxLedger.hide();
        txtAccountName.setValue("");
        acseqno = 0;   
        cmbVouNo.hide();
        gstFlag = "Add";

    };
/* 
function RefreshGridData() {
        cmbAccountName.setValue("");
        gstFlag = "Add";

      flxLedger.hide();

        gstrcpttype = "CASH PAYMENT";
     //   gstPaytype = "AD";

        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbcashacct",
                        compcode  : GinCompcode,
                         
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); 
                     cmbHeadAccount.setValue(2139);
                     }
        });

                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'CIP'
                        },
                        callback: function(){

                            txtVouNo.setRawValue("CIP"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });


        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "LoadAllLedgerList",
                        compcode: GinCompcode
                    }
        });
      cmbHeadAccount.setValue(2139);
        headcode = '2139';
        cmbVouNo.hide();
    }
    */
    
    function CheckDate(){
        var fromdate;
        var todate;
        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);
        if(dtpVouDate.getRawValue() < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }else if(dtpVouDate.getRawValue() > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }
    }
    
    var JournalEntryWindow = new Ext.Window({
	height      : 900,
        width       : 1350,
        y           : 40,
        title       : 'Journal Entry',
        items       : JournalEntryFormPanel,
        layout      : 'fit',
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
       
                    Ledgerdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"LoadAllLedgerList",
                            compcode:gstfincompcode
                        }
                    });
                    RefreshData();
       
                }
            }
    });
    JournalEntryWindow.show();  
});


