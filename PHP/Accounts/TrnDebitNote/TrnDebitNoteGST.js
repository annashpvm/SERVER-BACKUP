/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();

    var gstFlag;
    var gdt_enddate;
    var gst_depname;
    var OptExpComm;
    var invdate;
    var invcomm;
    var invdiscount;
    var invvalue;
    var totalinv;
    var invno;
    var gincrvalue = 0;
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfinuser = localStorage.getItem('ginuser');
    var gstfincompcode = localStorage.getItem('gincompcode');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

   var  invfin = localStorage.getItem('invfin');

   var GinUser = localStorage.getItem('ginusername');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));


    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsDebitNoteGST.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "ControlDebitNo2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });


    var txtQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtQty',
        width       : 90,
        name        : 'txtQty',
        decimalPrecision: 3,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        enableKeyEvents: true,
        listeners:{

        }
});

var cmbCRDR = new Ext.form.ComboBox({
        fieldLabel      : 'Sales/Purchase',
        width           : 150,
        displayField    :  'field2', 
        valueField      :  'field1',
        hiddenName      : '',
        id              : 'cmbCRDR',
        typeAhead       : true,
        mode            : 'local',
        store           : [['C','SALES'],['S','PURCHASES']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
        listeners:{
           select: function(){

           }
        }    
})

 var loadVargrpDataStore = new Ext.data.Store({
      id: 'loadVargrpDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarMainGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'vargrp_type_code', type: 'int',mapping:'vargrp_type_code'},
	{name:'vargrp_type_name', type: 'string',mapping:'vargrp_type_name'}
      ]),
    });



    var txtDELPass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtDELPass',
        name        : 'txtDELPass',
        inputType: 'password',
        width       :  150,
        border      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtDELPass.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtDELPass.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Delete the Debit No. ...'+cmbDNNo.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnDebitNoteDelete.php',
                               
             
                                       params :
				       {
		                                savetype  : gstFlag,
		                                finid     : ginfinid,
		                                compcode  : gstfincompcode,
		                                accrefseq : accseqno,
		                                dncrseqno : dncrseqno,
		                                conval    : vouseqno,
		                                vouno     : txtDNNo.getRawValue(),
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("DEBIT NOTE Deleted -" + obj['msg']);
                                                DebitNoteFormPanel.getForm().reset();
						flxDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("DEBIT NOTE Not Deleted . Check " + obj['msg']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });



var cmbQuality = new Ext.form.ComboBox({
        fieldLabel      : 'Product',
        width           : 250,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : '',
        id              : 'cmbQuality',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVargrpDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",

           listeners:{
                select: function () {

			}
                      }    

   });


var cmbReason = new Ext.form.ComboBox({
        fieldLabel      : 'Reason',
        width           : 150,
        displayField    :  '', 
        valueField      :  '',
        hiddenName      : '',
        id              : 'cmbReason',
        typeAhead       : true,
        mode            : 'local',
        store           :  ['CASH DISC','RATE DIFF','QTY DIFF','QLY','QLY DIFF','SAL RETURN','OTHERS'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
        listeners:{
           select: function(){

           }
        } 
})

    var dgrecord = Ext.data.Record.create([]);
    var billflag;
    var gindbtotal;
    var taxtypenew = 'CS';
    var ledgertype = "I";
    var partytype = "G";
    var GinUser = localStorage.getItem('gstuser');
    var voupoint;
    var accseqno = 0;
    var dncrseqno = 0;
    var vouseqno = 0;
    var dgrecord = Ext.data.Record.create([]);
    var editrow = 0;   
    var gridedit = "false";
    var dntype = '';  
    
    var dncndate = new Date();

    var dngsttype = localStorage.getItem('GSTTYPE');

    var partycode = 0;
    var partyledcode = 0;
    var ledstate = 0;

    var txtPass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPass',
        name        : 'txtPass',
        inputType: 'password',
        width       :  150,
        border      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPass.getValue() == "")
		       alert("Enter Password ...");
		    else if (txtPass.getValue() != "admin")
               	       alert("Password Error Please check..."); 
                    else
                    {
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Confirm Again Are you sure to Cancel the Debit No. ...'+cmbDNNo.getRawValue(),
                            fn: function(btn)
                            {
                                if (btn === 'yes')
				{

                                       Ext.Ajax.request({
                                       url: 'TrnDebitNoteCancelSave.php',
                               
             
                                       params :
				       {
		                                savetype  : gstFlag,
		                                finid     : ginfinid,
		                                compcode  : gstfincompcode,
		                                accrefseq : accseqno,
		                                dncrseqno : dncrseqno,
		                                conval    : vouseqno,
		                                vouno     : cmbDNNo.getRawValue(),
	  
					},
				        callback: function(options, success, response)
				        {
		                            var obj = Ext.decode(response.responseText);
                  			    if (obj['success']==="true")
				            {                                
				                Ext.MessageBox.alert("DEBIT NOTE Cancelled -" + obj['msg']);
                                                CreditNoteFormPanel.getForm().reset();
						flxDetail.getStore().removeAll();
						RefreshData();
				             }else
				             {
				                Ext.MessageBox.alert("DEBIT NOTE Not Cancelled . Check " + obj['msg']);                                                  
				              }
				          }
				       });       
		                    }

		     	      	}
		        });
                    }           

             }
          },

        } 
    });


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
                  DebitNoteWindow.hide();

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




    var lblReason = new Ext.form.Label({
        fieldLabel: 'Reason for Modification',
        id: 'lblReason',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 300,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });



var GSTYN ="Y";
var optGSTAutoYN = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'GST CALCULATION BY',

    fieldLabel: '',
    layout : 'hbox',
    width: 300,
    height: 80,
    defaultType : 'textfield',
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optGSTAutoYN',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'AutoMatic', name: 'optGSTAutoYN', id:'optGSTYes',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 GSTYN ="Y";
                 Ext.getCmp('txtCgstvalue').setReadOnly(true);  
                 Ext.getCmp('txtSgstvalue').setReadOnly(true);  
                 Ext.getCmp('txtIgstvalue').setReadOnly(true);  
                 calculateGSTvalue();
               }
              }
             }
            },
            {boxLabel: 'Manual', name: 'optGSTAutoYN', id:'optGSTNO',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                GSTYN ="N";
                 Ext.getCmp('txtCgstvalue').setReadOnly(false);  
                 Ext.getCmp('txtSgstvalue').setReadOnly(false);  
                 Ext.getCmp('txtIgstvalue').setReadOnly(false);  
                 calculateGSTvalue();
               }
              }
             }}  , //,txtfreight
        ],
    },

    ],
});



var findGSTTYPEDataStore = new Ext.data.Store({
      id: 'findGSTTYPEDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findGSTType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['cust_type','statecode','cust_code']),
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
'cust_name', 'led_addr1', 'led_addr2','cust_type'])
    });


var LoadDebitNoteVoucherDetailDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherDetailDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'dbcr_vouno', 'dbcr_date','dbcr_partycode', 'dbcr_partyledcode', 'dbcr_ledcode', 'dbcr_value', 'dbcr_narration', 'dbcr_party_type', 'dbcrt_serialno', 'dbcrt_inv_no', 'dbcrt_inv_date', 'dbcrt_grossvalue', 'dbcrt_value', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_igstper', 'dbcr_output',
'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode','dbcr_party_type', 'dbcrt_sgstledcode','dbcrt,_tcsvalue', 'dbcrt_tcsper', 'dbcrt_tcsledcode', 'cust_name' ,'dbcr_accseqno','dbcr_seqno','dbcr_no','dbcrt_rounding','dbcr_hsncode','U_AckNo','dbcr_reason','dbcr_qty'
      ]),
    });




var LoadDebitNoteVoucherDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dbcr_vouno'
      ]),
    });




var LoadDebitNoteDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteDataStoref',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDNNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'hsncode','var_name','unit','size','nos','weight','rate','amount','varcode','sizecode','taxval','invh_cgst_per','invh_sgst_per','invh_igst_per',
'tax_sal_led_code','tax_cgst_ledcode','tax_sgst_ledcode','tax_igst_ledcode'
      ]),
    });

function calculateValue(){

   var dcgst  = 0;
   var dsgst  = 0;
   var digst  = 0;
   var dtaxval =0;
   var Row= flxDetail.getStore().getCount();

 flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
tdisc = 0;
           if (sel[i].data.diffrate > 0 ) {
              dcgst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;
              dsgst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;
              digst =  Number(sel[i].data.diffrate) * Number(sel[i].data.invh_cgst_per)/100;

              dtaxval = Number(sel[i].data.diffrate)* Number(sel[i].data.weight)
              dtaxval =  Ext.util.Format.number(dtaxval,'0.00')
              sel[i].set('difftaxval', dtaxval);
           }
           else
           {
                   sel[i].set('difftaxval', '');
           }
        }
       dtaxval =0;
        for(i=0;i<Row;i++)
        {
           if (sel[i].data.difftaxval > 0 ) {
              dtaxval =   dtaxval +  Number(sel[i].data.difftaxval);
           }
        }
        dtaxval =  Ext.util.Format.number(dtaxval,'0.00')
        txtTotCredit.setValue(dtaxval);
//        txtTaxable.setValue(Math.round(dtaxval));
        txtTaxable.setValue(dtaxval);
        calculateGSTvalue();

}

function calculateGSTvalue(){
var partyvalue = 0;
var cgstamt1 = 0;
var sgstamt1 = 0;
var igstamt1 = 0;
if (GSTYN == "Y")
{

       if ( txtTaxable.getValue() > 0 && txtCgstper.getValue()>0)
       {  
             cgstamt1 =  Math.round(txtTaxable.getValue() * Number(txtCgstper.getValue())/100* 100) / 100;
             txtCgstvalue.setValue(Ext.util.Format.number(cgstamt1.toFixed(2),'0.00'));


       }  
       else
             txtCgstvalue.setValue('');

       if (txtTaxable.getValue() > 0 && txtSgstper.getValue()>0)
       {  
             sgstamt1 =  Math.round(txtTaxable.getValue() * Number(txtSgstper.getValue())/100* 100) / 100;
             txtSgstvalue.setValue(Ext.util.Format.number(sgstamt1.toFixed(2),'0.00'));

       } 
       else
             txtSgstvalue.setValue('');
        if (txtTaxable.getValue() > 0 && txtIgstper.getValue()>0)
{
             igstamt1 =  Math.round(txtTaxable.getValue() * Number(txtIgstper.getValue())/100* 100) / 100;
             txtIgstvalue.setValue(Ext.util.Format.number(igstamt1.toFixed(2),'0.00'));
}



       else
 {            txtIgstvalue.setValue('');
}

// alert(txtRounding.getValue());


}
//       partyvalue = Number(txtTaxable.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtRounding.getValue())

  //     txtPartyDebit.setValue(Ext.util.Format.number( partyvalue,'0.00'));

       partyvalue = Number(txtTaxable.getValue())+ Number(txtCgstvalue.getValue()) + Number(txtSgstvalue.getValue()) + Number(txtIgstvalue.getValue()) + Number(txtOtherAmount.getValue()); 



         txtPartyDebit.setRawValue(Ext.util.Format.number(Math.round(partyvalue),'0.00'));

          invround = Number(txtPartyDebit.getValue()) - Number(partyvalue);
          txtRounding.setRawValue(Ext.util.Format.number(invround,'0.00'))



}



    var dgaccrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 155,
    hidden:false,
    width: 780,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
 //   	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "Led. Code", dataIndex:'ledcode',sortable:false,width:100,align:'left',hidden:true},
       {header: "Led. Name", dataIndex:'ledname',sortable:false,width:400,align:'left'},
       {header: "Debit", dataIndex:'debit',sortable:false,width:120,align:'right'},
       {header: "Credit", dataIndex:'credit',sortable:false,width:120,align:'right'},
       {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 100, align: 'left',hidden:true}
    ],

    store: [],

    listeners:{

        keyup:function(){
           calculateItemValue();
        },
        keydown:function(){ 
           calculateItemValue();
        },
       blur:function(){
           calculateItemValue();

        }      
/*
         'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
	        var selected_rows = flxDetail.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++)
                {
		   colname = 'value';
                   selected_rows[i].set(colname, '100000');
                }
          }
*/
    }
/*
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         

    }

   }
*/

});




var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'ClsDebitNoteGST.php',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'ClsDebitNoteGST.php',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger',
        width           : 400,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger',
        width           : 400,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger',
        width           : 400,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbIGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});




var cmbDNNo = new Ext.form.ComboBox({
        fieldLabel: 'Debit Note No',
        width           : 120,
        displayField    : 'dbcr_vouno', 
        valueField      : 'dbcr_vouno',
        hiddenName      : '',
        id              : 'cmbDNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadDebitNoteVoucherDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){
                       Ext.getCmp('editchk').hide();

                       flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.removeAll();

                       LoadDebitNoteVoucherDetailDataStore.removeAll();

     	               LoadDebitNoteVoucherDetailDataStore.load({
                           url: 'ClsDebitNoteGST.php',
	                   params: {
			        task: 'LoadDebitNoteVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbDNNo.getRawValue(),
	                  },
		          callback: function () {

//                             alert(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno'));

                                Ext.getCmp('doccancel').show();

                                txtDNNo.setRawValue(cmbDNNo.getRawValue());
                                dtpVouDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_date'),"d-m-Y"));  
                                accseqno = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_accseqno');    
                                dncrseqno = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_seqno');   
                                vouseqno  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_no');   
                                txtAccountName.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('cust_name'));
				txtPartyDebit.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_value'));
				txtHSNCode.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_hsncode'));
                                partycode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_partycode');
                                partyledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_partyledcode');
                                partytype = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_party_type');

				txtRefNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_no'));

                                dtpRefDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_inv_date'),"d-m-Y"));  
				txtTotCredit.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtTaxable.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_grossvalue'));
				txtCgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstper'));
				txtCgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstvalue'));
				txtSgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstper'));
				txtSgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstvalue'));
				txtIgstper.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstper'));
				txtIgstvalue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstvalue'));

               findledgers();

				txtNarration.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_narration'));
				cmbCreditLedger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_ledcode'));
				cmbCGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_cgstledcode'));
				cmbSGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_sgstledcode'));
				cmbIGSTledger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_igstledcode'));
				if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_rounding') != 0 )
				txtRounding.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcrt_rounding'));
                                else
                                  txtRounding.setRawValue('');

                               if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_output') == 'Y')
                                   Ext.getCmp("chkOutput").setValue(true);
                               else
                                   Ext.getCmp("chkOutput").setValue(false);
                                
                               if (partytype == 'C' &&  dntype == 'SDN' )
                                   Ext.getCmp('EInv').setVisible(true);
                               else
                                   Ext.getCmp('EInv').setVisible(false);

				cmbReason.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_reason'));
				txtQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('dbcr_qty'));


       if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('U_AckNo') == '')
       {  

           Ext.getCmp('save').setDisabled(false);
	   Ext.getCmp('doccancel').show();
           Ext.getCmp('docdelete').show();


       } 
       else  
       {    
           alert("E-Debite Note Generated. Can't Modify this document. .." );
           Ext.getCmp('save').setDisabled(true);
           Ext.getCmp('btnEInvoice').setDisabled(true);
           Ext.getCmp('btnReupload').setDisabled(true);
           Ext.getCmp('docdelete').hide();
	   Ext.getCmp('doccancel').show();

       }  



calculateGSTvalue();


                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: partyledcode,
		            },
                    callback: function () {
                            partytype =  findLedgerdatastore.getAt(0).get('cust_type');

//alert(partytype);
                            findGSTTYPEDataStore.removeAll();
	                    findGSTTYPEDataStore.load({
		      		    url: 'ClsDebitNoteGST.php',
				    params:
				    {
					task: "findGSTType",
			                ledtype : findLedgerdatastore.getAt(0).get('cust_type'),
					ledcode : findLedgerdatastore.getAt(0).get('cust_code'),
				    },
			            callback: function () {

                                       partycode = findGSTTYPEDataStore.getAt(0).get('cust_code');
                                       partyledcode = findGSTTYPEDataStore.getAt(0).get('cust_code');  
                                       partytype = findGSTTYPEDataStore.getAt(0).get('cust_type'); 
                                       if (findGSTTYPEDataStore.getAt(0).get('statecode') == 24 )
                                       { 
                                           taxtypenew = "CS";
                                           if (dngsttype == "G")
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(true);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(true);
                                                txtIgstper.setValue(0); 
                                                txtIgstvalue.setValue(0); 
                                                cmbIGSTledger.setValue(''); 

                                            }    
                                            else
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtIgstper.setValue(0);
                                                txtIgstvalue.setValue(0); 
                                                cmbIGSTledger.setValue(''); 

                                            }    

                                       }
                                       else
                                       { 
                                           taxtypenew = "I";
                                           if (dngsttype == "G")
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(true);
		                                Ext.getCmp('txtSgstper').setDisabled(true)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(true);
					        Ext.getCmp('cmbSGSTledger').setDisabled(true);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtCgstper.setValue(0);
                                                txtSgstper.setValue(0);
                                                txtCgstvalue.setValue(0); 
                                                txtSgstvalue.setValue(0); 
                                                cmbCGSTledger.setValue(''); 
                                                cmbSGSTledger.setValue(''); 
                                            }    
                                            else
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtCgstper.setValue(0);
                                                txtSgstper.setValue(0);
                                                txtCgstvalue.setValue(0); 
                                                txtSgstvalue.setValue(0); 
                                                cmbCGSTledger.setValue(''); 
                                                cmbSGSTledger.setValue(''); 

                                            }    

                                       }

                                    }
                             });
//alert(taxtypenew)
                      }
		});



	                  }
			});

                      flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbDNNo.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('cust_name'),                          				                     type    : drcr,
	                                     debit   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     credit  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledcode : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('cust_type'),
	                                  })
                                      );
                                  }
                CalcTotalDebitCredit();
                EditDateCheck();
                              }  
                          }
                      });  

	EInvStatusDataStore.removeAll();
    	EInvStatusDataStore.load({
		url: 'ClsDebitNoteGST.php',
		params: {
			task: 'loadEInvStatus',
			invno:cmbDNNo.getRawValue(),
		        fincode : ginfinid,
		        compcode: gstfincompcode,
             



		},
	      	callback:function()
	  	{

              } 
        });  

           }
        } 
});


    var PartynameDataStore = new Ext.data.Store({
        id: 'PartynameDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Partyname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });


    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "GeneralLedger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_code', 'cust_name'])
    });


    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsDebitNoteGST.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ControlDebitNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_vouno'])
    });



    var InvoiceDetails2DataStore = new Ext.data.Store({
        id: 'InvoiceDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'acctrail_inv_date', 'acctran_totamt', 'acctrail_inv_value'
        ])
    });


 var TdsLedgergetDataStore = new Ext.data.Store({
      id: 'TdsLedgergetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/datechk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"TdsLedgerget"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'led_grp_code'

      ]),
    });



    var PartyAddressDataStore = new Ext.data.Store({
        id: 'PartyAddressDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Address"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_addr1', 'led_addr2'
        ])
    });

    var bill;


    var txtHSNCode = new Ext.form.TextField({
        fieldLabel: 'HSN CODE',
        id: 'txtHSNCode',
        width: 150,
        name: '',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref No',
        id: 'txtRefNo',
        width: 150,
        name: '',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefDate',
        name: 'date',
        width: 100,
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
//value: '2020-03-31',
//        anchor: '100%',
        listeners: {
            select: function () {
            }
        }
    });


    var txtDNNo = new Ext.form.TextField({
        fieldLabel: 'Debit Note No',
        id: 'txtDNNo',
        width: 120,
        name: '',
//        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var txtRemarks = new Ext.form.TextField({
        fieldLabel: 'Remarks',
        id: 'txtRemarks',
        width: 100,
        name: '',
 //       readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


function add_btn_click()
{

                flxDetail.getStore().removeAll();

                var gstInsert = "true";
                if (partyledcode == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select Debit Party / Ledger");
                }

                if (GSTYN == "Y")
                {    
		        if (cmbCreditLedger.getValue() == 0) {
		            gstInsert = "false";
		            Ext.MessageBox.alert("Debit Note", "Select Credit Ledger");
		        }
                }

                if (cmbCGSTledger.getValue() == 0 && txtCgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select CGST Ledger");
                    cmbCGSTledger.focus();
                }


                if (cmbSGSTledger.getValue() == 0 && txtSgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select SGST Ledger");
                    cmbSGSTledger.focus();
                }

                if (cmbIGSTledger.getValue() == 0 && txtIgstvalue.getValue() > 0 ) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Debit Note", "Select IGST Ledger");
                    cmbIGSTledger.focus();
                }


                var cnt = 0;

/*
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq === partyledcode) {
                        cnt = cnt + 1;
                    }
                }
*/

                if (gstInsert == "true")
                {
                   if (gridedit === "false")
                   { 
                        if (cnt > 0) {
                            gstInsert = "false";
                            Ext.MessageBox.alert("Receipt", "This Ledger Already Entered");
                        }
                  }
                  if (gridedit === "true")
                   {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
	 		sel[idx].set('dramt'   , Number(txtPartyDebit.getValue()));
			sel[idx].set('ledseq'  , partyledcode);
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
                        CalcTotalDebitCredit();
                        txtCredit.setRawValue('');
                          CalcTotalDebitCredit();
                          BillAdjustingDetail();
//                          txtAccountName.setRawValue('');
//                          txtAccountName.focus();
	            }//if(gridedit === "true")
                    else
                    if  (cnt ==0){
    
                        if (gstInsert === "true") {
                           var totamt;
                           var RowCnt = flxDetail.getStore().getCount() + 1;
                           flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgaccrecord({
                                    slno: RowCnt,
                                    ledcode: partyledcode,
                                    ledname: txtAccountName.getRawValue(),
                                    debit : Ext.util.Format.number(Number(txtPartyDebit.getRawValue()),'0.00'),

                                    credit : 0,
                                    ledtype : partytype
                                })
                          );
                          if (Number(txtTaxable.getValue()) > 0)
                          {  
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbCreditLedger.getValue(),
		                            ledname: cmbCreditLedger.getRawValue(),
		                            debit : 0,
		 
		                            credit : Ext.util.Format.number(Number(txtTaxable.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }


                          if (Number(txtCgstvalue.getValue()) > 0)
                          { 
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbCGSTledger.getValue(),
		                            ledname: cmbCGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtCgstvalue.getRawValue()),'0.00'),
	
	                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtSgstvalue.getValue()) > 0)
                          { 
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbSGSTledger.getValue(),
		                            ledname: cmbSGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtSgstvalue.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtIgstvalue.getValue()) > 0)
                          { 
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: cmbIGSTledger.getValue(),
		                            ledname: cmbIGSTledger.getRawValue(),
		                            debit : 0,
                                            credit : Ext.util.Format.number(Number(txtIgstvalue.getRawValue()),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }
                          if (Number(txtRounding.getValue()) > 0)
                          { 
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno: RowCnt,
		                            ledcode: 1859,
		                            ledname: 'ROUNDED OFF',
		                            debit : 0,
                                            credit : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),

		                            ledtype : 'G'
		                        })
		                  );
                          }

                          if (Number(txtRounding.getValue()) < 0)
                          { 
		                   flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgaccrecord({
		                            slno    : RowCnt,
		                            ledcode : 1859,
		                            ledname : 'ROUNDED OFF',
		                            credit  : 0,
                                            debit   : Ext.util.Format.number(Math.abs(Number(txtRounding.getRawValue())),'0.00'),
		                            ledtype : 'G'
		                        })
		                  );
                          }

                          CalcTotalDebitCredit();
                          //BillAdjustingDetail();
                          //txtCredit.setRawValue('');
//                          txtAccountName.setRawValue('');
//                          txtAccountName.focus();
                       }
                 }
              }
}


    function CalcTotalDebitCredit() {


        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        var gintotgst = 0;
        var gintottds = 0;

        for (var i = 0; i < selrows; i++) {
            gindbtotal = gindbtotal + Number(sel[i].data.debit);
            gincrtotal = gincrtotal + Number(sel[i].data.credit);
   //         gintotgst = gintotgst + Number(sel[i].data.gst);
    //        gintottds = gintottds + Number(sel[i].data.tdsval);
        }
//        txtTotaldbamt.setValue(Number(gindbtotal) + Number(gintotgst));
        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
//        txtTotalgst.setValue(gintotgst);
//        txtTotaltds.setValue(gintottds);

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
    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        x: 330,
        y: 165,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                        add_btn_click();

        }
       }  
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code','cust_name','cust_type','cust_state'
      ]),
    });



function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsDebitNoteGST.php',
		params:
		{
			task:"loadPartyList",
			ledger : txtAccountName.getRawValue(),
		},
        });
}


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){
		partycode    = selrow.get('cust_code');
		partyledcode = selrow.get('cust_code');
		ledtype      = selrow.get('cust_type');
		partytype    = selrow.get('cust_type');
            	ledstate     = selrow.get('cust_state');
		txtAccountName.setValue(selrow.get('cust_name'));
                flxLedger.hide();   
                txtTaxable.focus();

	        if (dngsttype == "G")
		{    
			Ext.getCmp('txtCgstper').setDisabled(false);
		        Ext.getCmp('txtSgstper').setDisabled(false)
		        Ext.getCmp('txtIgstper').setDisabled(false);
			Ext.getCmp('cmbCGSTledger').setDisabled(false);
			Ext.getCmp('cmbSGSTledger').setDisabled(false);
			Ext.getCmp('cmbIGSTledger').setDisabled(false);
		        txtIgstper.setValue(0); 
		        txtIgstvalue.setValue(0); 
		        cmbIGSTledger.setValue(''); 
  
		        if (ledstate == 24)
			{    


				Ext.getCmp('txtCgstper').setDisabled(false);
				Ext.getCmp('txtSgstper').setDisabled(false)
				Ext.getCmp('txtIgstper').setDisabled(true);
				Ext.getCmp('cmbCGSTledger').setDisabled(false);
				Ext.getCmp('cmbSGSTledger').setDisabled(false);
				Ext.getCmp('cmbIGSTledger').setDisabled(true);
				txtCgstper.setValue('');
				txtSgstper.setValue('');
				txtIgstper.setValue('');
				txtCgstvalue.setValue(''); 
				txtSgstvalue.setValue(''); 
				txtIgstvalue.setValue(''); 
		   	}
		        else if (ledstate != 24)
			{   
	 
				Ext.getCmp('txtCgstper').setDisabled(true);
				Ext.getCmp('txtSgstper').setDisabled(true)
				Ext.getCmp('txtIgstper').setDisabled(false);
				Ext.getCmp('cmbCGSTledger').setDisabled(true);
				Ext.getCmp('cmbSGSTledger').setDisabled(true);
				Ext.getCmp('cmbIGSTledger').setDisabled(false);
				txtCgstper.setValue('');
				txtSgstper.setValue('');
				txtIgstper.setValue('');
				txtCgstvalue.setValue(''); 
				txtSgstvalue.setValue(''); 
				txtIgstvalue.setValue(''); 
		   	}
                 }
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
        x: 600,
        y: 45,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true}, 
		{header: "Party Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:60,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:60,align:'left'},
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




var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Debited To',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   txtTaxable.focus();

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


/*
    var cmbParty1name = new Ext.form.ComboBox({
        fieldLabel: 'Debited To',
        width: 350,
        store: PartynameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'txtAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {

            select: function () {

                var Invseq = 0;

                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: txtAccountName.getValue(),
		            },
                    callback: function () {
         
                            findGSTTYPEDataStore.removeAll();
	                    findGSTTYPEDataStore.load({


		      		    url: 'ClsDebitNoteGST.php',
				    params:
				    {
					task: "findGSTType",
			                ledtype : findLedgerdatastore.getAt(0).get('cust_type'),
					ledcode : findLedgerdatastore.getAt(0).get('led_custcode'),
				    },
			            callback: function () {
       
                                       partycode = findGSTTYPEDataStore.getAt(0).get('led_custcode');
                                       partyledcode = findGSTTYPEDataStore.getAt(0).get('cust_code'); 
                                       partytype = findGSTTYPEDataStore.getAt(0).get('cust_type'); 

//alert(partytype);
//alert(partycode);

//alert(partyledcode);

                                       if (findGSTTYPEDataStore.getAt(0).get('statecode') == 24 )
                                       { 
                                           taxtypenew = "CS";
                                           if (dngsttype == "G")
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(true);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(true);
                                                txtIgstper.setValue(0); 
                                                txtIgstvalue.setValue(0); 
                                                cmbIGSTledger.setValue(''); 

                                            }    
                                            else
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtIgstper.setValue(0);
                                                txtIgstvalue.setValue(0); 
                                                cmbIGSTledger.setValue(''); 

                                            }    

                                       }
                                       else
                                       { 
                                           taxtypenew = "I";
                                           if (dngsttype == "G")
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(true);
		                                Ext.getCmp('txtSgstper').setDisabled(true)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(true);
					        Ext.getCmp('cmbSGSTledger').setDisabled(true);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtCgstper.setValue(0);
                                                txtSgstper.setValue(0);
                                                txtCgstvalue.setValue(0); 
                                                txtSgstvalue.setValue(0); 
                                                cmbCGSTledger.setValue(''); 
                                                cmbSGSTledger.setValue(''); 
                                            }    
                                            else
                                           {    
                                		Ext.getCmp('txtCgstper').setDisabled(false);
		                                Ext.getCmp('txtSgstper').setDisabled(false)
                                                Ext.getCmp('txtIgstper').setDisabled(false);
					        Ext.getCmp('cmbCGSTledger').setDisabled(false);
					        Ext.getCmp('cmbSGSTledger').setDisabled(false);
					        Ext.getCmp('cmbIGSTledger').setDisabled(false);
                                                txtCgstper.setValue(0);
                                                txtSgstper.setValue(0);
                                                txtCgstvalue.setValue(0); 
                                                txtSgstvalue.setValue(0); 
                                                cmbCGSTledger.setValue(''); 
                                                cmbSGSTledger.setValue(''); 

                                            }    

                                       }
//alert(taxtypenew);

                                    }
                             });

                      }
		});


*/


  function NewDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
/*
        if (diffdays > (GinNewDays+1))
        {     
             alert("You are Not Allowed to Raise the document in the date of " +  Ext.util.Format.date(dt_voucher,"d-m-Y"));
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

*/
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the document in Future date");
             dtpVouDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

    if(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Document Date is not in current finance year. Please check");
    }

 }


  function EditDateCheck()
  {
        var dt_today = new Date();
        var dt_voucher = dtpVouDate.getValue();

        var diffdays = dt_today.getTime()-dt_voucher.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//TO BE CHECKED
/* 
        if (diffdays > (GinEditDays+1))
        {     
             alert("You are Not Allowed to Modify this document. Contact HOD for Corrections.." );
             Ext.getCmp('save').setDisabled(true);  
        }
        else
        {
             Ext.getCmp('save').setDisabled(false);  

        }    
*/   
 }




    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
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



    var txtDebitValue = new Ext.form.NumberField({
        fieldLabel: 'Debit 1 Value',
        id: 'txtDebitValue',
        width: 60,
        name: 'DebitValue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txtDebitValue.getValue() > txtInvValue.getValue()) {
                    Ext.Msg.alert("Alert", "Debit Note value should not be greater than invoice value");
                    txtDebitValue.setValue('');
                }
            }
        }
    });





    var grpcodetds = 0;
    var cmbCreditLedger = new Ext.form.ComboBox({
        fieldLabel: 'Credit Ledger',
        width: 400,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbCreditLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        style: {textTransform: "uppercase"},
        listeners: {
            /*blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }, */

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCgstper.focus();
              }
              },

            select: function () {
                grpcodetds = 0;
                txttdsper.setValue('');
                txttdsvalue.setValue('');
                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/SHVPM/Accounts/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbCreditLedger.getValue()
                    },
                    callback: function () {
/*
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                        if (grpcodetds === '65') {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.show();
                            txttdsvalue.show();
                        } else {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.hide();
                            txttdsvalue.hide();
                        }
*/
                    }
                });
            }
        }
    });

    var txttdsper = new Ext.form.NumberField({
        fieldLabel: 'TDS%',
        id: 'txttdsper', hidden: true,
        width: 100,
        name: 'txttdsper'
    });

    var txttdsvalue = new Ext.form.NumberField({
        fieldLabel: 'TDS AMT',
        id: 'txttdsvalue', hidden: true,
        width: 100,
        name: 'txttdsvalue'
    });

    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 100,
        name: 'txtTotDebit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 100,
        name: 'txtTotCredit',
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 700,
        height: 50,
        name: 'Narration',
        style: {textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });





function findledgers()
{
        LoadCGSTLedgerDataStore.removeAll();
        LoadCGSTLedgerDataStore.load({
           url: 'ClsDebitNoteGST.php',
           params: {
                task: "loadCGSTledgers",
		ledgertype : ledgertype,
		gsttype : taxtypenew,
	 	gstper  : txtCgstper.getValue(),
           },
   	   callback:function()
           {
               cmbCGSTledger.setValue(LoadCGSTLedgerDataStore.getAt(0).get("cust_code"));

           } 
       });

        LoadSGSTLedgerDataStore.removeAll();
        LoadSGSTLedgerDataStore.load({
           url: 'ClsDebitNoteGST.php',
           params: {
                task: "loadSGSTledgers",
		ledgertype : ledgertype,
		gsttype : taxtypenew,
	 	gstper  : txtCgstper.getValue(),
           },
  	   callback:function()
           {
               cmbSGSTledger.setValue(LoadSGSTLedgerDataStore.getAt(0).get("cust_code"));

           } 
       });  

        LoadIGSTLedgerDataStore.removeAll();
        LoadIGSTLedgerDataStore.load({
           url: 'ClsDebitNoteGST.php',
           params: {
                task: "loadIGSTledgers",
		ledgertype : ledgertype,
		gsttype : taxtypenew,
	 	gstper  : txtIgstper.getValue(),
           },
  	   callback:function()
           {
               cmbIGSTledger.setValue(LoadIGSTLedgerDataStore.getAt(0).get("cust_code"));

           } 
       });  
     calculateGSTvalue();
}



    var txtTaxable = new Ext.form.NumberField({
        fieldLabel: 'Taxable Value',
        id: 'txtTaxable',
        width: 110,
        name: 'txtTaxable',
        enableKeyEvents: true,
        style : "font-size:14px;font-weight:bold",
        //allowDecimals: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbCreditLedger.focus();
              }
              },
              keyup: function () {
                  calculateGSTvalue();
                },
              keychange: function () {
                  calculateGSTvalue();
                },

        }
    });

    var txtPartyDebit = new Ext.form.NumberField({
        fieldLabel: 'Debited Amount',
        id: 'txtPartyDebit',
        width: 110,
        name: 'txtPartyDebit',
        enableKeyEvents: true,
        readOnly : true,
        style : "font-size:14px;font-weight:bold",
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        //allowDecimals: false,
         
        listeners: {

        }
    });

    var txtRounding = new Ext.form.NumberField({
        fieldLabel: 'Rounded Off',
        id: 'txtRounding',
        width: 60,
        name: 'txtRounding',
        enableKeyEvents: true,
        //allowDecimals: false,

        listeners: {
            keyup: function () {
               calculateGSTvalue()

            }   
        }
    });

    var txtOtherAmount= new Ext.form.NumberField({
        fieldLabel: 'Other Amount ',
        id: 'Others',
        width: 110,
        name: 'txtOtherAmount',
        enableKeyEvents: true,
        //allowDecimals: false,
//        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtCgstper = new Ext.form.NumberField({
        fieldLabel: 'CGST % Amt',
        id: 'txtCgstper',
        width: 40,
        name: 'txtCgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
 //       readOnly: true,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCgstvalue.focus();
              }
              },
            keyup: function () {
               txtSgstper.setValue(txtCgstper.getValue());
               findledgers()

            }   
        }
    });


    var txtCgstvalue = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtCgstvalue',
        width: 110,
        name: 'txtCgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSgstper.focus();
              }
              },
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                    txtSgstvalue.setRawValue(txtCgstvalue.getRawValue());
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtSgstper = new Ext.form.NumberField({
        fieldLabel: 'SGST % Amt',
        id: 'txtSgstper',
        width: 40,
        name: 'txtSgstper',
        enableKeyEvents: true,
   //     readOnly: true,
        //allowDecimals: false,
        listeners: {
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSgstvalue.focus();
              }
              },
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtSgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtSgstvalue',
        width: 110,
        name: 'txtSgstvalue',
        enableKeyEvents: true,
        readOnly: true,
        //allowDecimals: false,
        listeners: {
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtIgstper.focus();
              }
              },
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txtIgstper = new Ext.form.NumberField({
        fieldLabel: 'IGST % Amt',
        id: 'txtIgstper',
        width: 40,
        name: 'txtIgstper',
        enableKeyEvents: true,
        //allowDecimals: false,
  //      readOnly: true,
        listeners: {
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtIgstvalue.focus();
              }
              },
            keyup: function () {
               findledgers()
            }   
        }
    });



    var txtIgstvalue= new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtIgstvalue',
        width: 110,
        name: 'txtIgstvalue',
        enableKeyEvents: true,
        //allowDecimals: false,
        readOnly: true,
        listeners: {
            keyup: function () {
                if (txtCgstvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var txttcsvalue = new Ext.form.NumberField({
        fieldLabel: 'TCS',
        id: 'txttcsvalue',
        width: 100,
        name: 'txttcsvalue',
        enableKeyEvents: true,
        listeners: {
            keyup: function () {
                if (txttcsvalue.getRawValue() > 0) {
                    calculateGSTvalue();
                } else {
                    calculateGSTvalue();
                }
            }
        }
    });

    var output = 'N';
    var chkOutput = new Ext.form.Checkbox({
        name: 'Output',
        boxLabel: 'Output',
        id: 'chkOutput',
        checked: false,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    output = 'Y';
                    ledgertype = "O";

                } else {
                    output = 'N';
                    ledgertype = "I";
                }
                findledgers();
            }
        }
    });



 var EInvStatusDataStore = new Ext.data.Store({
      id: 'EInvStatusDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDebitNoteGST.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEInvStatus"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ErrorCode','ErrorDiscripion','InvStatus'
	 ]),
    })



var dgrecord1 = Ext.data.Record.create([]);
var flxEInvStatus = new Ext.grid.EditorGridPanel({
    frame: false,
    sm1: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 150,
    hidden:false,
    title:'E-INV STATUS',
    width: 330,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ",     
//    font-size:18px,
    columns:
    [
       {header: "S/E", dataIndex:'ErrorCode',sortable:false,width:30,align:'left'},
       {header: "Description", dataIndex:'ErrorDiscripion',sortable:false,width:1000,align:'left'},

    ],
    store: EInvStatusDataStore,
});






var btnReupload = new Ext.Button({
    id      : 'btnReupload',
    style   : 'text-align:center;',
    text    : "RE UPLOAD",
    tooltip : 'Reupload',
    width   : 150,
    height  : 40,
    x       : 200,
    y       : 5,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){

		      Ext.Ajax.request({
		      url: 'FrmTrnDebitNoteE_Inv_Reupload.php',
		      params :
		      {
                        finid    :  ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbDNNo.getRawValue(),
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("E-Inv - Reuploaded "); 
	/*

		            var obj = Ext.decode(response.responseText);

		            if (obj['success']==="true")					     
		            {
		                Ext.MessageBox.alert("SMS SENT  -" + obj['msg']);
		            }  
		            else
		            {
		         Ext.MessageBox.alert("SMS not Send - Please check customer SMS Number.." + obj['msg']);                                                  
		            }

	*/
		      }
                      }); 
       }
   }
});       



var btnEInvoice = new Ext.Button({
    id      : 'btnEInvoice',
    style   : 'text-align:center;',
    text    : "GENERATE E-DEBIT NOTE",
    width   : 150,
    height  : 30,
    x       : 40,
    y       : 10,    
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   listeners:{
       click: function(){
             if (txtTotDebit.getValue() == 0 || txtTotCredit.getValue() == 0 )
             {
                 alert("Debit / Credit Amount is Empty.. ");
             }           
             else
             {
	      Ext.Ajax.request({
	      url: 'FrmTrnDebitNoteE_Inv_Confirm.php',
	      params :
	      {
                        finid: ginfinid,
                        compcode : gstfincompcode,
			vouno    : cmbDNNo.getRawValue(),
	      },
	      callback: function(options, success, response)
	      {
                  var obj = Ext.decode(response.responseText);
                  if (obj['success']==="true")
                  { 
                      Ext.MessageBox.alert("DEBIE NOTE Confirmed for E-Debit Note  -" + obj['vouno']);
//                      TrnSalesInvoicePanel.getForm().reset();
                      RefreshData();
                  }else
                  {
                  Ext.MessageBox.alert("DEBIT Note not Confirmed for E-Debit Note. Please check.." + obj['vouno']);                                                  
                  }
	      }
              }); 
            }
       }
   }
});

function save_click()
{

                            var gstInsert = "true";

                            var fromdate;
                            var todate;
                            var gstRefno;
                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);
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
                           else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            }  else if (txtAccountName.getRawValue() === cmbCreditLedger.getRawValue()) {
                                Ext.MessageBox.alert("Debit Note", "Party and Creditor Names Are Equal");
                            } else if (partyledcode == 0) {
                                Ext.MessageBox.alert("Debit Note", "Party Name Should Not be Empty");
                            } else if (cmbCreditLedger.getValue() == 0 && GSTYN == "Y") {
                                Ext.MessageBox.alert("Debit Note", "Creditor Name Should Not be Empty");
                            } else if (cmbCRDR.getRawValue() == "") {
                                Ext.MessageBox.alert("Debit Note", "Select Debit Note against SALES or PURCHASE");
                            } else if (cmbReason.getRawValue() == "") {
                                Ext.MessageBox.alert("Debit Note", "Select Reason for Debit Note");
                            } else if (Number(txtTaxable.getValue()) <= 0  && GSTYN == "Y" ) {
                                Ext.MessageBox.alert("Debit Note", "Taxable  Value  Should Not Be Zero");
                            } else if  (  Number(txtCgstper.getValue()) >  0 && (taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                                Ext.MessageBox.alert("Debit Note", "Select CGST / SGST Ledger Names");
                            } else if  ( Number(txtIgstper.getValue()) >  0 &&  (taxtypenew == "I")  && (cmbIGSTledger.getValue() == '')) {
                                Ext.MessageBox.alert("Debit Note", "Select IGST Ledger Names");
                            } else if  (txtCgstvalue.getValue() > 0 && Number(txtCgstper.getValue()) == 0 && GSTYN == "Y") {
                                Ext.MessageBox.alert("Debit Note", "Select GST %");

                            } 
			    else if (flxDetail.getStore().getCount()==0)
				    {
					Ext.Msg.alert('Debit Note','Grid should not be empty..');
					gstSave="false";
				    }
                           else {
                                gstInsert = "true";



                                if (gstInsert === "true") {
                                    Ext.Msg.show({
                                        title: 'Debit Note',
                                        icon: Ext.Msg.QUESTION,
                                        buttons: Ext.MessageBox.YESNO,
                                        msg: 'Save This Record?',
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                               var accData = flxDetail.getStore().getRange();
                                               var accupdData = new Array();
                                               Ext.each(accData, function (record) {
                                                  accupdData.push(record.data);
                                               });

                                                Ext.Ajax.request({
                                                    url: 'FrmTrnDebitNoteGSTSave.php',
                                                    params: {
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        cnt: accData.length,
                                                        savetype: gstFlag,
                                                        finid: ginfinid,
                                                        finyear: gstfinyear,
                                                        compcode: gstfincompcode,

                                                        accrefseq : accseqno,
                                                        dncrseqno : dncrseqno,
                                                        conval    : vouseqno,

                                                        vouno: txtDNNo.getRawValue(),
                                                        voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        bankname: "",
                                                        refno: "",
                                                        refdate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        narration: txtNarration.getRawValue(),
                                                        voutype: dntype,
                                                        paymode: "",
                                                        output: output,
                                                        payno: "",
                                                        paydate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        party   : partycode,
                                                        partyledcode : partyledcode,
                                                        drcrledger: cmbCreditLedger.getValue(),
                                                        tdsper  : txttdsper.getValue(),
                                                        tdsvalue: txttdsvalue.getValue(),
                                                        taxtype: taxtypenew,
                                                        cgstper: txtCgstper.getValue(),
                                                        cgstval: txtCgstvalue.getRawValue(),
                                                        sgstper: txtSgstper.getValue(),
                                                        sgstval: txtSgstvalue.getRawValue(),
                                                        igstper: txtIgstper.getValue(),
                                                        igstval: txtIgstvalue.getRawValue(),


                                                        TCSVAL: txttcsvalue.getRawValue(),
                                                        taxable: Number(txtTaxable.getValue()),
                                                        debitvalue: Number(txtPartyDebit.getValue()),

                                                        billmode: billflag,
                                             
                                                        cgst  : cmbCGSTledger.getValue(),
                                                        sgst  : cmbSGSTledger.getValue(),
                                                        igst  : cmbIGSTledger.getValue(),
//''                                                        cnt: accData.length,
                                                        gltype : partytype,
                                                        invno  :  txtRefNo.getRawValue(),
                                                        invdate :  Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
                                                        rounding : txtRounding.getValue(),
                                                        usercode : GinUserid, 
                                                        reason   : txtReason.getRawValue(), 
                                                        hsncode  : txtHSNCode.getRawValue(),

					                qty      : txtQty.getRawValue(),
					                cdreason : cmbReason.getRawValue(),
                                                        cdCRDR   : cmbCRDR.getValue(), 
                                                        finsuffix :invfin,
                                                        itemname : cmbQuality.getRawValue(),

                                                    },
                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] === "true") {


//							    DebitNoteFormPanel.getForm().reset();
							    flxDetail.getStore().removeAll();
							    RefreshData();
							    Ext.MessageBox.alert("Record saved with Voucher No - -" + obj['vouno']);
/*
                                                            Ext.Msg.show({
                                                                title: 'Saved',
                                                                icon: Ext.Msg.QUESTION,
                                                                buttons: Ext.MessageBox.OK,
                                                                msg: 'Record saved with Voucher No -' + obj['vouno'],
                                                                fn: function (btn) {
                                                                    if (btn === 'ok') {
                                                                        window.location.reload();
                                                                    } else {
                                                                        window.location.reload();
                                                                    }
                                                                }
                                                            });
*/
                                                        } else {
                                                            Ext.MessageBox.alert("Alert", "Record not saved - " + obj['vouno']);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
}


function edit_click()
{
               Ext.getCmp('cmbDNNo').setVisible(true);
               gstFlag = 'Edit';
               LoadDebitNoteVoucherDataStore.load({
                   url: 'ClsDebitNoteGST.php',
	           params: {
			task: 'LoadDebitNoteVoucherList',
			fincode : ginfinid,
			compcode: gstfincompcode,
                        voutype : dntype,
	          },
		  callback: function () {

	          }
		});
}

    var DebitNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Debit Note',
        header: false,
//        bodyStyle: {"background-color": "#acbf95"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'DebitNoteFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
//            bodyStyle: "background: #d7d5fa;",
            height: 40,
  //          style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
//SAVE
                    text: 'Save',
                    id: 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
                               save_click();
                        }
                    }
                }, '-',
                {
//Edit
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                               edit_click();   
                        }
                    }
                }, '-',


                {
                    text: 'View',
                    id: 'view',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(gstfincompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginfinid);
				var vouno = "&seqno=" + encodeURIComponent(accseqno);

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNoteAcc.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',


                {
                    text: 'View -E-Debit Note',
                    id: 'viewcM',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(gstfincompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginfinid);
				var vouno = "&vouno=" + encodeURIComponent(cmbDNNo.getRawValue());

				var param =(compcode+fincode+vouno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrint_ECreditNote.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',

                {
//CANCEL
                    text: 'CANCEL',
                    id  : 'doccancel',
                    style: 'text-align:center;',
                    tooltip: 'Cancel Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtPass').show();
                        }
                    }
                }, '-',

                {
//DELETE
                    text: 'DELETE',
                    id  : 'docdelete',
                    style: 'text-align:center;',
                    tooltip: 'Delete Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtDELPass').show();
                        }
                    }
                }, '-',

                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            DebitNoteWindow.hide();
                        }
                    }
                }]
        },
        items: [
            flxLedger,
            {
                xtype: 'fieldset',
                title: '',
                width: 1270,
                height: 50,
                x: 5,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 300,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtDNNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 380,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbDNNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 200,
                        x: 310,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpVouDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 500,
                        x: 480,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAccountName]
                    }, 

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 500,
                        x: 960,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbCRDR]
                    }
/*

                  {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 400,
                        width: 500,
                        x: 220,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [lblIns]
                    },
*/
                ]
            },


            {
                xtype: 'fieldset',
                title: '',
                width: 1270,
                height: 500,
                x: 5,
                y: 60,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 10,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtTaxable]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 600,
                x: 320,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [cmbCreditLedger]
            },
{
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 200,
                x: 850,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [chkOutput]
            },

{
                xtype: 'fieldset',
                title: '',
                labelWidth: 85,
                width: 300,
                x: 950,
                y: 10,
                defaultType: 'textfield',
                border: false,
                items: [txtHSNCode]
            },

             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 200,
                x: 10,
                y: 40,
                defaultType: 'textfield',
                border:false,
                items: [txtCgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 160,
                y: 40,
                defaultType: 'textfield',
                border: false,
                items: [txtCgstvalue]
            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 600,
                        x: 320,
                        y: 40,
                        border: false,
                        items: [cmbCGSTledger]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 400,
                        x: 860,
                        y: 40,
                        border: false,
                        items: [txtRefNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 300,
                        x: 860,
                        y: 70,
                        border: false,
                        items: [dtpRefDate]
                    },

             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 200,
                x: 10,
                y: 70,
                defaultType: 'textfield',
                border:false,
                items: [txtSgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 160,
                y: 70,
                defaultType: 'textfield',
                border: false,
                items: [txtSgstvalue]
            },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 600,
                        x: 320,
                        y: 70,
                        border: false,
                        items: [cmbSGSTledger]
                    },
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 200,
                x: 10,
                y: 100,
                defaultType: 'textfield',
                border:false,
                items: [txtIgstper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 150,
                x: 160,
                y: 100,
                defaultType: 'textfield',
                border: false,
                items: [txtIgstvalue]
            },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 600,
                        x: 320,
                        y: 100,
                        border: false,
                        items: [cmbIGSTledger]
                    },



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 450,
                y: 130,
                defaultType: 'textfield',
                border: false,
                items: [txtQty]
            }, 

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 450,
                y: 160,
                defaultType: 'textfield',
                border: false,
                items: [cmbReason]
            }, 

            { 
                	xtype       : 'fieldset',
                	title       : '',
                	labelWidth  : 90,
                	width       : 420,
                	x           : 800,
                	y           : 200,
                    	border      : false,
                	items: [cmbQuality]
            },	



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 10,
                y: 130,
                defaultType: 'textfield',
                border: false,
                items: [txtRounding]
            },





            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 150,
                width: 500,
                x: 10,
                y: 160,
                defaultType: 'textfield',
                border: false,
                items: [txtPartyDebit]
            },
btnAdd, 
   {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 400,
                        x: 850,
                        y: 110,
                        border: false,
                        items: [optGSTAutoYN]
                    },

                 



   {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 800,
                        x: 10,
                        y: 200,
                        defaultType: 'textfield',
                        border: false,
                        items: [flxDetail]
                    },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 100,
                y: 360,
                defaultType: 'textfield',
                border: false,
                items: [txtTotDebit]
            }, 

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 100,
                width: 350,
                x: 320,
                y: 360,
                defaultType: 'textfield',
                border: false,
                items: [txtTotCredit]
            }, 
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 800,
                height: 200,
                x: 10,
                y:  400,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
 
           },



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 1000,
                y:  410,
                defaultType: 'textfield',
                border: false,
                items: [txtDELPass]
 
           },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 280,
        
                x: 950,
                y:  410,
                defaultType: 'textfield',
                border: false,
                items: [txtPass]
 
           },


		                {
		                       xtype       : 'fieldset',
		                       id          : 'EInv',
		                       title       : 'E - INVOICE - CREDIT NOTE',
		                       width       : 370,
		                       height      : 230,
		                       x           : 850,
		                       y           : 220,
		                       border      : true,
		                       layout      : 'absolute',
	//item - 3 - start
		                       items:[
                                           btnEInvoice,btnReupload,flxEInvStatus
             
                                       ]
		                          
		                },


          ],
      },


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
                        width: 350,
                        height: 80,
                        x: 820,
                        y: 390,
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

     ],
 

    });

    function RefreshData() {
        Ext.getCmp('editchk').hide();
        Ext.getCmp('cmbDNNo').setVisible(false);
        Ext.getCmp('doccancel').hide();
        Ext.getCmp('txtPass').hide();
        Ext.getCmp('save').setDisabled(false);  
         Ext.getCmp('docdelete').hide();

         Ext.getCmp('txtDELPass').hide();

        Ext.getCmp('btnEInvoice').setDisabled(false); 
        Ext.getCmp('btnReupload').setDisabled(false); 
        Ext.getCmp('EInv').setVisible(false);



        gstFlag = "Add";
        billflag = "D";

        flxLedger.hide();
        txtDNNo.setValue('');
        txtTotCredit.setValue('');
        txttcsvalue.setValue('');
        txtDebitValue.setValue('');
//        txtInvDate.setValue('');
//        txtInvValue.setValue('');
        txtNarration.setValue('');


        txttdsper.setValue('');
        txttdsvalue.setValue('');
        txtCgstper.setValue('');
        txtCgstvalue.setRawValue('');
        txtSgstper.setValue('');
        txtSgstvalue.setRawValue('');
        txtIgstper.setValue('');
        txtIgstvalue.setRawValue('');
        txttcsvalue.setRawValue('');
        txtTaxable.setValue('');
        txtPartyDebit.setValue('');
        txtRounding.setValue('');
        txtTotDebit.setValue(''); 
        txtTotCredit.setValue(''); 
        txtRefNo.setValue('');
        cmbReason.setRawValue(''); 
        txtQty.setValue('');
     
        flxDetail.getStore().removeAll();


               if (dngsttype == "SG")
               { 
                  VouNodatastore.load({
                    url: 'ClsDebitNoteGST.php',
                    params: {
                        task: 'ControlDebitNoSales',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                             if (ginfinid >= 24)  
                                  {    
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


                                     vno =  "SDN/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtDNNo.setValue(vno);
                               }
                    }
                  });
                  Ext.getCmp('txtCgstper').setDisabled(false);
                  Ext.getCmp('txtSgstper').setDisabled(false)
                  Ext.getCmp('txtIgstper').setDisabled(false);
                  Ext.getCmp('cmbCGSTledger').setDisabled(false);
                  Ext.getCmp('cmbSGSTledger').setDisabled(false);
                  Ext.getCmp('cmbIGSTledger').setDisabled(false);
                  dntype = 'SDN';
      
                }
               else if (dngsttype == "G")
               { 
                  VouNodatastore.load({
                    url: 'ClsDebitNoteGST.php',
                    params: {
                        task: 'ControlDebitNo',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                             if (ginfinid >= 24)  
                                  {    
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


                                     vno =  "DNG/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtDNNo.setValue(vno);
                               }
                    }
                  });
                  Ext.getCmp('txtCgstper').setDisabled(false);
                  Ext.getCmp('txtSgstper').setDisabled(false)
                  Ext.getCmp('txtIgstper').setDisabled(false);
                  Ext.getCmp('cmbCGSTledger').setDisabled(false);
                  Ext.getCmp('cmbSGSTledger').setDisabled(false);
                  Ext.getCmp('cmbIGSTledger').setDisabled(false);
                  dntype = 'DNG';
      
                }
                else
                {
                  VouNodatastore.load({
                    url: 'ClsDebitNoteGST.php',
                    params: {
                        task: 'ControlDebitNo2',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
//                        txtDNNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
//                        txtDNNo.setRawValue('');



                                  if (ginfinid >= 24)  
                                  {    
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


                                     vno =  "DNN/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtDNNo.setValue(vno);
                                  }
                    }
                  });
                  Ext.getCmp('txtCgstper').setDisabled(true);
                  Ext.getCmp('txtSgstper').setDisabled(true)
                  Ext.getCmp('txtIgstper').setDisabled(true);
                  Ext.getCmp('cmbCGSTledger').setDisabled(true);
                  Ext.getCmp('cmbSGSTledger').setDisabled(true);
                  Ext.getCmp('cmbIGSTledger').setDisabled(true);
                  dntype = 'DNN';
                }   


       cmbCreditLedger.setValue();
        txtAccountName.setValue();

    }

    var DebitNoteWindow = new Ext.Window({
        width: 1300,
        height: 610,
        y: 25,
        items: DebitNoteFormPanel,
        bodyStyle: {"background-color": "#acbf95"},
        title: 'Debit Note',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
onEsc:function(){
},
        listeners: {
            show: function () {
                gstFlag = "Add";
                billflag = "D";
              RefreshData();

               Ext.getCmp('cmbDNNo').setVisible(false);
                txtUserName.setRawValue(GinUser);   

                LedgernameDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'GeneralLedger',
        
                    },
        
                });

               txtNarration.setRawValue("BEING DEBITED TO YOUR ACCOUNT");

                gst_depname = "A";
               	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: 'ClsDebitNoteGST.php',
                           params: {
		                task: "loadCGSTledgers",
				ledgertype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: 'ClsDebitNoteGST.php',
                           params: {
		                task: "loadSGSTledgers",
				ledgertype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: 'ClsDebitNoteGST.php',
                           params: {
		                task: "loadIGSTledgers",
				ledgertype : "I",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
                       cmbIGSTledger.disable();
                       Ext.getCmp('editchk').hide();

            }
        }
    });
    DebitNoteWindow.show();
});

