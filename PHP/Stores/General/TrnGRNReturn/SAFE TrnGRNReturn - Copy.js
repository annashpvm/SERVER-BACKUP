Ext.onReady(function(){
Ext.QuickTips.init();
   
   var grnflag="P"; 
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var gstyear =localStorage.getItem('gstyear');

   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');

   var  invfin = localStorage.getItem('invfin');
   var supcode = 0;
   var  purtype = localStorage.getItem('STRTYPE');

   var gstFlag = "Add";

   var accseqno = 0;
   var grnaccseqno = 0;

   var purchasegroup = 0;

   var cgst_ledcode = 0;
   var sgst_ledcode = 0;
   var igst_ledcode = 0;

   var cgst_percentage = 0;
   var sgst_percentage = 0;
   var igst_percentage = 0;

   var cgst_amount = 0;
   var sgst_amount = 0;
   var igst_amount = 0;


var loadDNVouNoDatasore = new Ext.data.Store({
  id: 'loadDNVouNoDatasore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsGrnReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadDNNumber"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['vouno'])
})


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrnReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name', 'cust_state'
      ]),
    });


    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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


 var GRNdetailsLoadDataStore = new Ext.data.Store({
      id: 'GRNdetailsLoadDataStore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrnReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'mint_comp_code', 'mint_minno', 'mint_mindate', 'mint_fin_code', 'mint_pono', 'mint_podate', 'mint_pofrom', 'mint_cust_code', 'mint_item_code', 'mint_inv_qty','mint_rcvd_qty', 'mint_rej_qty', 'mint_unit_rate', 'mint_cost_rate','mint_pack_per', 'mint_others', 'mint_frt_val',
'mint_freight', 'mint_discount', 'mint_qcdev_val', 'mint_value','mint_ind_comp_code', 'mint_ind_fin_code', 'mint_ind_no', 'mint_mod_status', 'mint_qc_status', 
'mint_cr_status', 'mint_pftype', 'mint_slno', 'mint_disamt', 'mint_pfamt', 'mint_expirydate','mint_np_qty', 'mint_others_qty', 'mint_cgst_per',
'mint_cgst_amt', 'mint_sgst_per', 'mint_sgst_amt', 'mint_igst_per', 'mint_igst_amt', 'mint_inward_amt', 'mint_tax_freight', 'mint_tax_freight2', 
'mint_clr1_cgst_per', 'mint_clr1_sgst_per', 'mint_clr1_igst_per', 'mint_clr1_transport', 'mint_clr2_cgst_per', 'mint_clr2_sgst_per', 'mint_clr2_igst_per','minh_roundneeded',
'mint_clr2_transport', 'mint_machine', 'mint_rcm', 'item_code', 'item_name', 'item_group_code', 'item_qcupd', 'uom_short_name', 'grp_tngst_code', 
'grp_cst_code', 'grp_imp_code', 'grp_cen_ledger_code', 'grp_freight_code', 'minh_minno', 'minh_type', 'minh_bill_no', 
'minh_bill_date', 'minh_remarks', 'minh_carrier', 'mint_cr_status', 'minh_acct_status', 'minh_credit_days', 'sup_type', 'grp_educess_code', 'minh_geno',
'minh_gedate', 'minh_lrno', 'minh_lrdate', 'minh_accupd','mint_rebate', 'mint_machine','mint_tcs_per','mint_tcs_amt','mint_accept_qty','mint_otherspm', 'mint_purgroup','led_name','minh_roundneeded','cust_ref','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst','cust_code','mint_insurance','minh_acc_seqno'


      ]),
    });


 var ReceiptReturnHeaderLoadDataStore = new Ext.data.Store({
      id: 'ReceiptReturnHeaderLoadDataStore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrnReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGRNReturnHederdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'debh_date', 'debh_supcode', 'debh_grnno', 'debh_grdate', 'debh_billno', 'debh_billdate', 'debh_taxable', 'debh_netamount', 'debh_roundoff', 'debh_ent_date', 'debh_vouno', 'debh_remarks', 'debh_user', 'cust_code', 'cust_name', 'cust_ref','cust_state','cust_code','debt_pono', 'debt_podate', 'debt_ind_no', 'debt_ind_fincode', 'debt_slno', 'debt_item_code', 'debt_qty', 'debt_unit_rate', 'debt_value', 'debt_discount', 'debt_disamt', 'debt_pfamt', 'debt_freight', 'debt_others', 'debt_taxable', 'debt_cgst_per', 'debt_cgst_amt', 'debt_sgst_per', 'debt_sgst_amt', 'debt_igst_per', 'debt_igst_amt', 'debt_item_value', 'debt_pur_ledger', 'debt_cgst_ledger', 'debt_sgst_ledger', 'debt_igst_ledger','debh_accseqno','debh_additional','debh_addnl_ledcode'
      ]),
    });


var loadGRNListDatasore = new Ext.data.Store({
  id: 'loadGRNListDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsGrnReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadGRNNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['minh_minno'
  ])
});


var loadRRNoListDatasore = new Ext.data.Store({
  id: 'loadRRNoListDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsGrnReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadRRNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['debh_no'])
});




 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrnReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','cust_code'
      ]),
    });



var btnUpdate = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "Update",
    width   : 50,
    height  : 25,
    listeners:{
        click: function(){  

       if (flxDetail.getStore().getCount()==0)
            {
                Ext.Msg.alert('GRN Return','Grid should not be empty..');
                gstSave="false";
            }
       else if (myFormPanel.getForm().findField('txtBillNo').getRawValue() == "")
        {
               Ext.Msg.alert('GRN Return','Bill Number should not  be Empty.....');
        }
        else if (Number(txtReturnValue.getRawValue()) == 0)
        {
               Ext.Msg.alert('GRN Return','GRN Return Amount is empty');
        }
        else if (Number(grnaccseqno) == 0)
        {
               Ext.Msg.alert('GRN Return','GRN Seqno No is empty');
        }

	else
	{               
	   Ext.MessageBox.show({
           title: 'Confirmation',
           icon: Ext.Msg.QUESTION,
	   buttons: Ext.MessageBox.YESNO,
           msg: 'Do You Want to save the Record',
    	   fn: function(btn)
	   {         
	      if (btn == 'yes')
              {   
	       flxDetail.getSelectionModel().selectAll();
               var minDeta = flxDetail.getStore().getRange();                                
	       var minupData = new Array();
               Ext.each(minDeta, function (record) {
               minupData.push(record.data);
               });  
                        var accData = flxAccounts.getStore().getRange();
                        var accupdData = new Array();
                        Ext.each(accData, function (record) {
                            accupdData.push(record.data);
                        });

               Ext.Ajax.request({
              url: 'TrnGRNReturnSaveTemp.php',
//              url: 'TrnGRNReturnSave.php',
               params:
		{       

		griddet: Ext.util.JSON.encode(minupData),                                      
		cnt:minDeta.length,
                griddet2: Ext.util.JSON.encode(accupdData),
                cnt2: accData.length,

                savetype   : gstFlag,
                grnflag    : grnflag,   
                compcode   : Gincompcode,
		fincode    : GinFinid,
                rrno       : txtRRNo.getValue(),
       		rrdate     : Ext.util.Format.date(dtpRR.getValue(),"Y-m-d"),	

                grnno      : cmbGRNNo.getValue(),
       		grndate    : Ext.util.Format.date(dtpGRN.getValue(),"Y-m-d"),	
		supcode    : supcode,
		billno     : Ext.getCmp('txtBillNo').getValue(),
		billdate   : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),	

		taxable    : txtTaxable.getValue(),
		roundoff   : txtroundoff.getValue(),
		retamount  : txtReturnValue.getValue(),
		remarks    : txtRemarks.getRawValue(),
		entdate    : Ext.util.Format.date(new Date(),"Y-m-d"),
		vouno      : txtVouNo.getValue(),
                user       : UserId,
                finsuffix  : invfin,
                accseqno   : accseqno,
                grnaccseqno: grnaccseqno,

                purchasegroup : purchasegroup,
                cgst_percentage : cgst_percentage,
                sgst_percentage : sgst_percentage,
                igst_percentage : igst_percentage,
		cgst_amount     : txttotcgst.getValue(),
		sgst_amount     : txttotsgst.getValue(),
		igst_amount     : txttotigst.getValue(),

                cgst_ledcode  : cgst_ledcode,
                sgst_ledcode  : sgst_ledcode,
                igst_ledcode  : igst_ledcode,
		addnl_amt     : txtOthers.getValue(),
		addnl_ledcode : cmbOtherLedger.getValue(),

   
//						minhseqno : '0'
        	},
                callback: function(options, success, response)
                {
                 var obj = Ext.decode(response.responseText);
                 var grndisp = ""; 

                grndisp = "Receipt Return - Saved - No."; 
		if (obj['success']==="true")
		{                                
                    Ext.MessageBox.alert( grndisp + obj['returnno']);
//			                            myFormPanel.getForm().reset();						
                    flxDetail.getStore().removeAll();
                    flxAccounts.getStore().removeAll();
                    RefreshData();
              }else
		{
Ext.MessageBox.alert("Receipt Return  Not Saved! Pls Check!- " + obj['returnno']);                                                  
    }
}


                    });      //loop y end
                  }       //loop x start
                 } 
            });   

        }  //loop w start   
        }
    }  
});

function save_click()
{


       if (flxDetail.getStore().getCount()==0)
            {
                Ext.Msg.alert('GRN Return','Grid should not be empty..');
                gstSave="false";
            }
       else if (myFormPanel.getForm().findField('txtBillNo').getRawValue() == "")
        {
               Ext.Msg.alert('GRN Return','Bill Number should not  be Empty.....');
        }
        else if (Number(txtReturnValue.getRawValue()) == 0)
        {
               Ext.Msg.alert('GRN Return','GRN Return Amount is empty');
        }
        else if (Number(grnaccseqno) == 0)
        {
               Ext.Msg.alert('GRN Return','GRN Seqno No is empty');
        }

	else
	{               
	   Ext.MessageBox.show({
           title: 'Confirmation',
           icon: Ext.Msg.QUESTION,
	   buttons: Ext.MessageBox.YESNO,
           msg: 'Do You Want to save the Record',
    	   fn: function(btn)
	   {         
	      if (btn == 'yes')
              {   
	       flxDetail.getSelectionModel().selectAll();
               var minDeta = flxDetail.getStore().getRange();                                
	       var minupData = new Array();
               Ext.each(minDeta, function (record) {
               minupData.push(record.data);
               });  
                        var accData = flxAccounts.getStore().getRange();
                        var accupdData = new Array();
                        Ext.each(accData, function (record) {
                            accupdData.push(record.data);
                        });

               Ext.Ajax.request({
//              url: 'TrnGRNReturnSaveTemp.php',
              url: 'TrnGRNReturnSave.php',
               params:
		{       

		griddet: Ext.util.JSON.encode(minupData),                                      
		cnt:minDeta.length,
                griddet2: Ext.util.JSON.encode(accupdData),
                cnt2: accData.length,

                savetype   : gstFlag,
                grnflag    : grnflag,   
                compcode   : Gincompcode,
		fincode    : GinFinid,
                rrno       : txtRRNo.getValue(),
       		rrdate     : Ext.util.Format.date(dtpRR.getValue(),"Y-m-d"),	

                grnno      : cmbGRNNo.getValue(),
       		grndate    : Ext.util.Format.date(dtpGRN.getValue(),"Y-m-d"),	
		supcode    : supcode,
		billno     : Ext.getCmp('txtBillNo').getValue(),
		billdate   : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),	

		taxable    : txtTaxable.getValue(),
		roundoff   : txtroundoff.getValue(),
		retamount  : txtReturnValue.getValue(),
		remarks    : txtRemarks.getRawValue(),
		entdate    : Ext.util.Format.date(new Date(),"Y-m-d"),
		vouno      : txtVouNo.getValue(),
                user       : UserId,
                finsuffix  : invfin,
                accseqno   : accseqno,
                grnaccseqno: grnaccseqno,

                purchasegroup : purchasegroup,
                cgst_percentage : cgst_percentage,
                sgst_percentage : sgst_percentage,
                igst_percentage : igst_percentage,
		cgst_amount     : txttotcgst.getValue(),
		sgst_amount     : txttotsgst.getValue(),
		igst_amount     : txttotigst.getValue(),

                cgst_ledcode  : cgst_ledcode,
                sgst_ledcode  : sgst_ledcode,
                igst_ledcode  : igst_ledcode,
		addnl_amt     : txtOthers.getValue(),
		addnl_ledcode : cmbOtherLedger.getValue(),

   
//						minhseqno : '0'
        	},
                callback: function(options, success, response)
                {
                 var obj = Ext.decode(response.responseText);
                 var grndisp = ""; 

                grndisp = "Receipt Return - Saved - No."; 
		if (obj['success']==="true")
		{                                
                    Ext.MessageBox.alert( grndisp + obj['returnno']);
//			                            myFormPanel.getForm().reset();						
                    flxDetail.getStore().removeAll();
                    flxAccounts.getStore().removeAll();
                    RefreshData();
              }else
		{
Ext.MessageBox.alert("Receipt Return  Not Saved! Pls Check!- " + obj['returnno']);                                                  
    }
}


                    });      //loop y end
                  }       //loop x start
                 } 
            });   

        }  //loop w start   
} 


var txtRRNo = new Ext.form.NumberField({
        fieldLabel  : 'Return No',
        id          : 'txtRRNo',
        width       : 90,
        name        : 'txtRRNo',
        readOnly    : 'ture',
        enableKeyEvents: true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpGRN.focus();
             }
       },
           keyup:function(){

           }
        }  

   }); 


     var txtCGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtCGSTPM',
        width       : 75,
        maxvalue    : 2.00,
        name        : 'txtCGSTPM',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        decimalPrecision: 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        listeners:{
          change:function(){
        
              if (Number(txttotcgst.getValue()) > 0 )        
              {
               txtSGSTPM.setValue(txtCGSTPM.getValue());
              }
              else
              {

                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);        
              }           
              if (Number(txtCGSTPM.getValue()) > 2)
              {   
                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);
              } 
              gstValueChange();
          },
          keyup:function(){
              if (Number(txtCGSTPM.getValue()) > 2)
              {   
                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);
              } 
          gstValueChange();
         }
        } 
   }); 

     var txtSGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtSGSTPM',
        width       : 75,
        name        : 'txtSGSTPM',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              gstValueChange();
          },
          keyup:function(){
           gstValueChange();
         }
        } 
   }); 
     var txtIGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtIGSTPM',
        width       : 75,
        name        : 'txtIGSTPM',
         decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              gstValueChange();
          },
          keyup:function(){
          gstValueChange();
         }
        } 
   }); 
var cmbRRNo = new Ext.form.ComboBox({
    fieldLabel      : 'Return No',
    width           :  90,
    displayField    : 'debh_no',
    valueField      : 'debh_no',
    hiddenName      : 'debh_no',
    id              : 'cmbRRNo',
    typeAhead       : true,
    mode            : 'local',
    store           : loadRRNoListDatasore,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function () {
                    txtRRNo.setValue(cmbRRNo.getValue())
                    gstFlag = "Edit";
                    ReceiptReturnHeaderLoadDataStore.removeAll(); 
                    ReceiptReturnHeaderLoadDataStore.load({
                       url: 'ClsGrnReturn.php',
                       params:
                       {
                          task:"loadGRNReturnHederdetails",
                          retno:cmbRRNo.getValue(),
                          compcode:Gincompcode,
                          finid:GinFinid,
                       },  
                       callback: function () 
		       {


                           var cntrr = ReceiptReturnHeaderLoadDataStore.getCount();
                           accseqno  = ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_accseqno');
                           grnno     = ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_grnno');
                           dtpRR.setRawValue(Ext.util.Format.date(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_date'),"d-m-Y"));
                           txtSupplierName.setRawValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('cust_ref'));    
                           cmbGRNNo.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_grnno')); 
                           txtVouNo.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_vouno')); 
                           txtVouNo2.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_vouno')); 
                           Ext.getCmp('txtSupplierName').setDisabled(true);  

                           txtRemarks.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_remarks'));  

                           cmbOtherLedger.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_addnl_ledcode'));  
                           txtOthers.setValue(ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_additional'));  

                           supcode = ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_supcode');   


                    GRNdetailsLoadDataStore.removeAll(); 
                    GRNdetailsLoadDataStore.load({
                       url: 'ClsGrnReturn.php',
                       params:
                       {
                          task:"loadgrndetails",
                          grnno:ReceiptReturnHeaderLoadDataStore.getAt(0).get('debh_grnno'),
                          compcode:Gincompcode,
                          finid:GinFinid,
                          GRNtype :purtype,

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=GRNdetailsLoadDataStore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  


                             grnaccseqno = GRNdetailsLoadDataStore.getAt(0).get('minh_acc_seqno');
                             partycode = GRNdetailsLoadDataStore.getAt(0).get('mint_cust_code');
                             partyledcode = GRNdetailsLoadDataStore.getAt(0).get('cust_code');
                             dtpBill.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_date'),"d-m-Y"));
                             dtpGRN.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('mint_mindate'),"d-m-Y"));
                             txtBillNo.setRawValue(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_no'));
                             for(var j=0; j<cnt; j++)
		             { 

                               var sno1               = GRNdetailsLoadDataStore.getAt(j).get('mint_slno');
                               var pono1              = GRNdetailsLoadDataStore.getAt(j).get('mint_pono');
                               var podate1            = GRNdetailsLoadDataStore.getAt(j).get('mint_podate');
                               var itemname1          = GRNdetailsLoadDataStore.getAt(j).get('item_name');
                               var uom1               = GRNdetailsLoadDataStore.getAt(j).get('uom_short_name');
			       var pobalqty1          = GRNdetailsLoadDataStore.getAt(j).get('mint_inv_qty'); 
                               var mintinvqty1        = GRNdetailsLoadDataStore.getAt(j).get('mint_inv_qty');
			       var mintrcvdqty1       = GRNdetailsLoadDataStore.getAt(j).get('mint_rcvd_qty');
            		       var mintacceptqty1     = GRNdetailsLoadDataStore.getAt(j).get('mint_accept_qty')-GRNdetailsLoadDataStore.getAt(j).get('mint_rej_qty');
                               var mintunitrate1      = GRNdetailsLoadDataStore.getAt(j).get('mint_unit_rate');
                               var mintdiscount1      = GRNdetailsLoadDataStore.getAt(j).get('mint_discount');
                               var mintdisamt1        = GRNdetailsLoadDataStore.getAt(j).get('mint_disamt');
 		               var mintpfper1         = GRNdetailsLoadDataStore.getAt(j).get('mint_pack_per');
	 		       var mintpfamt1         = GRNdetailsLoadDataStore.getAt(j).get('mint_pfamt');
                               var mintothers1        = GRNdetailsLoadDataStore.getAt(j).get('mint_others');  
                               var mintcgstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_per');
                               var mintsgstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_sgst_per');
                               var mintigstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_igst_per');
                               var mintsgstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_sgst_amt');
			       var mintcgstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_amt');
                               var mintigstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_igst_amt');
		               var mintfreight1       = GRNdetailsLoadDataStore.getAt(j).get('mint_freight');
		               var mintqcreq1         = GRNdetailsLoadDataStore.getAt(j).get('mint_qc_status');


                               var mintotherspm      =  GRNdetailsLoadDataStore.getAt(j).get('mint_otherspm');  
                               var mintclrfreight1    = GRNdetailsLoadDataStore.getAt(j).get('mint_tax_freight');
                               var mintcrstatus1      = GRNdetailsLoadDataStore.getAt(j).get('mint_cr_status');
                               var mintvalue1         = GRNdetailsLoadDataStore.getAt(j).get('mint_value');
                               var mintitemcode1      = GRNdetailsLoadDataStore.getAt(j).get('mint_item_code');                      
                               var mintgrpcode1       = GRNdetailsLoadDataStore.getAt(j).get('item_grp_code');
                               var mintindentno1      = GRNdetailsLoadDataStore.getAt(j).get('mint_ind_no');
                               var mintfincode1       = GRNdetailsLoadDataStore.getAt(j).get('mint_ind_fin_code');

                               var RowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                 new dgrecord({
	                             sno               : sno1,
                                     pono              : pono1,
                                     podate            : Ext.util.Format.date(podate1,"Y-m-d"),
                                     itemname          : itemname1,
                                     uom               : uom1, 
                                     pobalqty          : pobalqty1, 
                                     mintinvqty        : mintinvqty1,
                                     mintrcvdqty       : mintrcvdqty1,
                                     mintacceptqty     : mintacceptqty1,
			             mintunitrate      : mintunitrate1,
			             mintdiscount      : mintdiscount1,
                                     mintdisamt        : mintdisamt1,
			             mintpfper         : mintpfper1,
                                     mintpfamt         : mintpfamt1,
                                     mintothers        : mintothers1,
                                     mintcgstper       : GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_per'),
                                     mintsgstper       : mintsgstper1,
			             mintigstper       : mintigstper1,
			             mintsgstamt       : mintsgstamt1,
			             mintcgstamt       : mintcgstamt1,
			             mintigstamt       : mintigstamt1,
			             mintfreight       : mintfreight1,
		                     mintqcreq         :'Y',

                                     mintotherpm       : mintotherspm,
                                     mintcrstatus      : mintcrstatus1,
                                     mintvalue         : mintvalue1,
                                     vatstatus         : 'N',
              		             cgstled           : 0,
                                     sgstled           : 0, 
			             igstled           : 0,

                                     mintitemcode      : mintitemcode1,//  itemcode,
                                     mintgrpcode       : mintgrpcode1,
                                     ledcode           :'0',
                                     mintindentno      : mintindentno1,
                                     mintfincode       : mintfincode1,
                                     stock:'0',	
			             tot:'0',
			             totqty:'0',
                 	             itc:'N',
                                     oldgrnqty         : mintacceptqty1,
                                     oldgrnval         : mintvalue1,
                                     minttcsper        : GRNdetailsLoadDataStore.getAt(j).get('mint_tcs_per'),
                                     minttcsval        : GRNdetailsLoadDataStore.getAt(j).get('mint_tcs_amt'),
                                     mintrebate        : GRNdetailsLoadDataStore.getAt(j).get('mint_rebate'),
                                     purgrpname        : GRNdetailsLoadDataStore.getAt(j).get('led_name'),
                                     purgrpcode        : GRNdetailsLoadDataStore.getAt(j).get('mint_purgroup'),
                                     cgstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_cgstledcode'),
                                     sgstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_sgstledcode'),
                                     igstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_igstledcode'),
                                     cgstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_cgstledger'),
                                     sgstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_sgstledger'),
                                     igstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_igstledger'),  
                                     insurance         : GRNdetailsLoadDataStore.getAt(j).get('mint_insurance'), 
                                   })
                                );
	     

   
                             } // for loop end
// Return details are loaded

                   var selrows = flxDetail.getStore().getCount();
                   for (var k = 0; k < selrows; k++) {
                   var rec = flxDetail.getStore().getAt(k);
                   itemcode = rec.get('mintitemcode')  
alert(itemcode);
                   for(var i=0; i<cntrr; i++)
                   { 


                         if (itemcode == ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_item_code'))
                         {
alert(ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_item_code'));
			    rec.set('rejectedqty',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_qty'));
			    rec.set('rejectedvalue',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_value'));
			    rec.set('disc',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_discount'));
			    rec.set('discamt',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_disamt'));
			    rec.set('pfamt',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_pfamt'));
			    rec.set('cgstper',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_cgst_per'));
			    rec.set('sgstper',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_sgst_per'));
			    rec.set('igstper',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_igst_per'));
			    rec.set('cgstamt',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_cgst_amt'));
			    rec.set('sgstamt',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_sgst_amt'));
			    rec.set('igstamt',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_igst_amt'));
			    rec.set('others',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_others'));
			    rec.set('freight',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_freight'));

			    rec.set('tcsper',0);
			    rec.set('tcsval',0);
			    rec.set('rebate',0);
			    rec.set('itemvalue',ReceiptReturnHeaderLoadDataStore.getAt(i).get('debt_item_value'));
                         }      
                          
                   } 
                            find_value();
                            grid_tot();
                            flxaccupdation();
                   }   





                         }  
                         else {  
                            alert("GRN Retrun Number not found..."); 
                         }  // if end
            
                      }  // call back function end
                   });





                       }
                     });




               }

    }     
});


  var dtpRR = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 100,
       editable    : true,
       value: new Date().format('d-m-Y'),
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
enableKeyEvents: true,
 listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplierName.focus();
             }
       },
}
        
    });


 var LoadRRNoDatastore = new Ext.data.Store({
      id: 'LoadRRNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrnReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRRNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'retno'
      ]),
    });

var txtRemarks = new Ext.form.TextField({
    fieldLabel  : 'Remarks',
    id          : 'txtRemarks',
    name        : 'txtRemarks',
    width       :  900,
    height      :  50,
    style       :  {textTransform: "uppercase"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true, 
    listeners:{

    }		
});


var txtVouNo = new Ext.form.TextField({
    fieldLabel  : 'Voucher No',
    id          : 'txtVouNo',
    name        : 'txtVouNo',
    width       :  120,
    style       :  {textTransform: "uppercase"},
    readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true, 
    listeners:{

    }		
});

var txtVouNo2 = new Ext.form.TextField({
    fieldLabel  : 'Voucher No',
    id          : 'txtVouNo2',
    name        : 'txtVouNo2',
    width       :  120,
    style       :  {textTransform: "uppercase"},
    readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true, 
    listeners:{

    }		
});



var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 210,
    hidden:false,
    width: 850,
   id:'my-grid3',
scope: this,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:400,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden :'true'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden :'true'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});

   var txttotDebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},

   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
   });


     var txtTotalValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtTotalValue',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotalValue'
   }); 
   
   

     var txtTotInsurance = new Ext.form.NumberField({
        fieldLabel  : 'Insurance',
        id          : 'txtTotInsurance',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotInsurance'
   }); 
   

     var txtTaxable = new Ext.form.NumberField({
        fieldLabel  : 'Taxable Value',
        id          : 'txtTaxable',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTaxable'
   }); 
   
      var txttotdisc = new Ext.form.NumberField({
        fieldLabel  : 'Discount',
        id          : 'txttotdisc',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotdisc'
   }); 
     var txtTotPF = new Ext.form.NumberField({
        fieldLabel  : 'PF',
        id          : 'txtTotPF',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotPF'
   }); 
   
        var txttotfreight1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txttotfreight1',
        width       : 90,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotfreight1'
   }); 
        var txttotothval = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txttotothval',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotothval'
   }); 
   

   var txtOthers = new Ext.form.NumberField({
        fieldLabel  : 'Others 2',
        id          : 'txtothers',
        width       : 90,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtothers',
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                find_value();
           },
           blur:function(){
                find_value();
           },
        }  
   }); 
   

    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
      autoLoad : true,
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


    var cmbOtherLedger = new Ext.form.ComboBox({
        fieldLabel: 'Other Ledger',
        width: 300,
        store: LedgernameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbOtherLedger',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        enableKeyEvents: true,
        style: {textTransform: "uppercase"},
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners: {
            specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
          //        txtCgstper.focus();
             }
       },

            select: function () {
                grpcodetds = 0;
               find_value();
            }
        }
    });

   
     var txttotcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txttotcgst',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotcgst'
   }); 
   
      var txttotsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txttotsgst',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotsgst'

   }); 
     var txttotigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txttotigst',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotigst'
   }); 
   
     var txttotTCS = new Ext.form.NumberField({
        fieldLabel  : 'TCS',
        id          : 'txttotTCS',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotigst'
   }); 
   
        var txtTotOthersPM = new Ext.form.NumberField({
        fieldLabel  : 'OTH+/-',
        id          : 'txtTotOthersPM',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotOthersPM'
   }); 
   
   var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Roundoff',
        id          : 'txtrnd1',
        width       : 75,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtrnd1',
        enableKeyEvents: true,
        listeners:{
          change:function(){
//alert("Hai");

              calculateItemValue(); 
              grid_tot();
          },
          keyup:function(){
//alert("Hai");

              calculateItemValue(); 
              grid_tot();
          },
        }
   }); 
        var txtlandvalue = new Ext.form.NumberField({
        fieldLabel  : 'GRN / Landing Value',
        id          : 'txtlanval',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtlanval'
   }); 
   
      var txtReturnValue = new Ext.form.NumberField({
        fieldLabel  : 'Return Value',
        id          : 'txtReturnValue',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtReturnValue'
   }); 


function grid_tot2(){
        var dr = 0;
        var cr = 0;

	var Row= flxAccounts.getStore().getCount();


        //flxAccounts.getSelectionModel().selectAll();
//        var sel=flxAccounts.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {

            var rec = flxAccounts.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));
         }
 


//         txttotDebit.setValue(Ext.util.Format.number((dr*100/100),'0.00'));
//         txttotCredit.setalue(Ext.util.Format.number((cr*100/100),'0.00'));

         txttotDebit.setValue(Ext.util.Format.number(dr,'0.00'));
         txttotCredit.setValue(Ext.util.Format.number(cr,'0.00'));


}


function grid_tot(){
	var value = 0;
        var disc =0;
        var pf  =0;
        var cgst =0;
        var sgst =0;
        var igst =0;
        var frt =0;
        var others =0;
        var otherpm =0;
        var inward =0;
        var taxfrt = 0;
        var taxfrtgst = 0;
        var frtgst =0;
        var totvalue = 0;
        var landing = 0;
        var rebate = 0;
        var ins = 0;
        var tcs = 0;

        txtTaxable.setValue(0);
        txttotdisc.setValue(0);
        txtTotPF.setValue(0);
        txttotfreight1.setValue(0);
        txttotothval.setValue(0);
        txtTotInsurance.setValue(0);  


        txtTotOthersPM.setValue(0);


        txtlandvalue.setValue(0);

        txtReturnValue.setValue(0);

        var Row= flxDetail.getStore().getCount();

        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {


            cgst = cgst + Number(sel[i].data.cgstamt);
            sgst = sgst + Number(sel[i].data.sgstamt);
            igst = igst + Number(sel[i].data.igstamt);

            value=value+ Number(sel[i].data.rejectedvalue) ;

            disc = disc + Number(sel[i].data.discamt);
            pf   = pf + Number(sel[i].data.pfamt);
            frt = frt + Number(sel[i].data.freight);
            others = others+ Number(sel[i].data.others); 
            otherpm = otherpm + Number(sel[i].data.otherpm);
            rebate = rebate + Number(sel[i].data.rebate);
            ins = ins + Number(sel[i].data.insurance);
            tcs = tcs + Number(sel[i].data.tcsval);              

        }
//        landing = value - disc + pf + frt + others + otherpm - rebate ;


        landing = value - disc;

        totvalue = value - disc + pf + frt + cgst + sgst + igst + others + otherpm - rebate + tcs + ins + Number(txtOthers.getValue());

        txttotcgst.setRawValue(cgst.toFixed(2));
        txttotsgst.setRawValue(sgst.toFixed(2));
        txttotigst.setRawValue(igst.toFixed(2));





        value = Math.round(value * 1000) / 1000;
        value = Math.round(value * 100) / 100;


        landing = Math.round(landing * 1000) / 1000;
        landing = Math.round(landing * 100) / 100;



        totvalue = Math.round(totvalue * 1000) / 1000;
        totvalue = Math.round(totvalue * 100) / 100;


        txtTotalValue.setRawValue(value.toFixed(2));
        txttotdisc.setRawValue(disc.toFixed(2));
        txtTotPF.setRawValue(pf.toFixed(2));
        txttotfreight1.setRawValue(frt.toFixed(2));
        txttotothval.setRawValue(others.toFixed(2));
        txtTotInsurance.setRawValue(ins.toFixed(2));
        txttotTCS.setRawValue(tcs.toFixed(2));

        txtTotOthersPM.setValue(otherpm.toFixed(2));


        txtlandvalue.setRawValue(Ext.util.Format.number(landing,'0.00'));


         totgrnvalue2 =  totvalue.toFixed(2);

         totgrnvalue =  totvalue.toFixed(0);
         txtroundoff.setRawValue(Ext.util.Format.number(totgrnvalue-totgrnvalue2,"0.00"));

         txtReturnValue.setRawValue(Ext.util.Format.number(totgrnvalue,"0.00"));

         txtRemarks.setValue("BEING THE AMOUNT DEBITED TO YOUR ACCOUNT TOWARDS FOR YOUR BILL NO." + 
txtBillNo.getRawValue()+ " Dt. " + Ext.util.Format.date(dtpBill.getValue(),"d-m-Y"));

          flxaccupdation();





   //     txtlandvalue.setValue(landing.toFixed(2));

}



function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        var rounding =0;
        var rebate = 0;

        flxAccounts.getStore().removeAll();
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();




        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : supcode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : txtReturnValue.getRawValue(),
              credit    : "0",
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );


    
//-- For INSURANCE
            insamt = 0;
            k =0;

              if ( Number(txtTotInsurance.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 1836,
			      ledname   : 'INSURANCE PREMIUM',
			      debit     : "0",
			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : txtTotInsurance.getRawValue(),
                              ledtype   : "G",
                        }) 
                        );
             }       
         

    
//-- For PACKING AND FORWARDING CHARGES (P&F)
            dbamt = 0;
            k =0;

              if ( Number(txtTotPF.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2309,
			      ledname   : 'PACKING CHARGES -GST',
			      debit     : "0",
			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : txtTotPF.getRawValue(),
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end

    
//-- For FREIGHT INWARD GST
            dbamt = 0;
            k =0;

              if ( Number(txttotfreight1.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '2020',
			      ledname   : 'FREIGHT INWARD -GST',
			      debit     : "0",
			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit     : txttotfreight1.getRawValue(),
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end

//-- For OTHER CHARGES
            dbamt = 0;
            k =0;

              if ( Number(txttotothval.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '2019',
			      ledname   : 'OTHER CHARGES',
			      debit     : "0",
			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit     : txttotothval.getRawValue(),
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end

//-- For ADDITIONAL CHARGES
            dbamt = 0;
            k =0;

              if ( Number(txtOthers.getValue()) >0 && cmbOtherLedger.getValue() > 0){
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : cmbOtherLedger.getValue(),
			      ledname   : cmbOtherLedger.getRawValue(),
			      debit     : "0",
			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit     : txtOthers.getRawValue(),
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end

        for(var i=0;i<Row;i++)
        {

            purlcode =  Number(sel[i].data.purgrpcode); 
            purlname =  sel[i].data.purgrpname; 
//            puramt   =  Number(sel[i].data.rejectedvalue) - Number(sel[i].data.discamt) +  Number(sel[i].data.freight)  +  Number(sel[i].data.others)  ; 

            puramt   =  Number(sel[i].data.rejectedvalue) - Number(sel[i].data.discamt) +  Number(sel[i].data.tcsval) ; 

//alert(puramt);
            cgstlcode     =  Number(sel[i].data.cgstled); 
            sgstlcode     =  Number(sel[i].data.sgstled); 
            igstlcode     =  Number(sel[i].data.igstled); 
            frtpartylcode =   0; // Number(sel[i].data.frtparty); 
            frtlcode      =   0; // Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  0; // sel[i].data.frtledname; 
            frtlname      =  0; // sel[i].data.frtglledname; 

  

            cgstamt   =  Number(sel[i].data.cgstamt);
            sgstamt   =  Number(sel[i].data.sgstamt);
            igstamt   =  Number(sel[i].data.igstamt);

            inamt     =  Number(sel[i].data.inwardamt);
            frtamt    =  Number(sel[i].data.frtamt);
            rebate    =  Number(sel[i].data.rebate);



//-- For Purchase Ledger
            cramt = 0;
            k =0;

    //        flxAccounts.getSelectionModel().selectAll();


            var selrows = flxAccounts.getSelectionModel().getCount();

            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){

                if (Number(sel1[j].data.ledcode) == purlcode )
                {    
                   cramt =  puramt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', Ext.util.Format.number(cramt,"0.00"));
                   k =1;
                }
            }


            if (k==0 && puramt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : purlcode,
			      ledname   : purlname,
			      debit     : "0",
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : Ext.util.Format.number(puramt,"0.00"),
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end



//-- For CGST Ledger
            crmt = 0;
            k =0;

    //        flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == cgstled )
                {    
                   cramt =  cgstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', cramt);
                   k =1;
                }
            }
            if (k==0 && cgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : cgstlcode,
			      ledname   : cgstlname,
			      credit    :  Ext.util.Format.number(cgstamt,"0.00"),
			      debit     : "0",
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),           
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For SGST Ledger
            cramt = 0;
            k =0;

//            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == sgstlcode )
                {    
                   cramt =  sgstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', cramt);
                   k =1;
                }
            }
            if (k==0 && sgstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : sgstlcode,
			      ledname   : sgstlname,
			      debit     : "0",
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),        
			      credit    :   Ext.util.Format.number(sgstamt,"0.00"),
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

//-- For IGST Ledger
            cramt = 0;
            k =0;

//            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == igstlcode )
                {    
                   cramt =  igstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', cramt);
                   k =1;
                }
            }
            if (k==0 && igstamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : igstlcode,
			      ledname   : igstlname,
			      debit     : "0",
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),         
			      credit    :   Ext.util.Format.number(igstamt,"0.00"),
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

//-- For Inward Ledger - Debit
            cramt = 0;
            k =0;

 //           flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == 1607 )
                {    
                   cramt =  inamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', Ext.util.Format.number(cramt,"0.00"));
                   k =1;
                }
            }
            if (k==0 && inamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '1607',
			      ledname   : 'INWARD MATERIAL HANDLING CHARGES',
			      debit     : "0",
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),       
			      credit    : inamt,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For Freight Ledger - Debit
            cramt = 0;
            k =0;

      //      flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) ==  1604 )
                {    
                   cramt =  frtamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', cramt);
                   k =1;
                }
            }
            if (k==0 && frtamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
//			      ledcode   : '1604',
//			      ledname   : 'INWARD MATERIAL FREIGHT CHARGES',
			      ledcode   : '2020',
			      ledname   : 'FREIGHT INWARD -GST',

			      debit     : "0",

              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : frtamt,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end



//-- For REBATE AND DISCOUNT - Credit

            k =0;

  //          flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) ==  1856 )
                {    
                   rebate =  rebate + Number(sel1[j].data.credit);
                   sel1[j].set('credit', rebate);
                   k =1;
                }
            }
            if (k==0 && rebate >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '1856',
			      ledname   : 'REBATE AND DISCOUNT',

			      debit     : "0",

              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : rebate,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end



//-- For Inward Ledger - Credit
            cramt = 0;
            k =0;


//--end


           frtpartylcode =  Number(sel[i].data.frtparty); 
            frtlcode      =  Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  sel[i].data.frtledname;



 


       //     flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(sel1[j].get('credit'));
                  sel1[j].set('debit',Ext.util.Format.number(Number(sel1[j].get('debit')*100/100),'0.00'));
                  sel1[j].set('credit',Ext.util.Format.number(Number(sel1[j].get('credit')*100/100),'0.00'));
            }   
           
           

rounding = txtroundoff.getValue();

var rounddr = 0;
var roundcr = 0;
if (rounding < 0)
   rounddr = Math.abs(rounding);
else
   roundcr = Math.abs(rounding);


 
  
        }  


if (rounding != 0)
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
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),
              ledtype   : "G",
              }) 
        );
}
            grid_tot2();
            var diff = 0;
            diff =  txttotDebit.getRawValue()-txttotCredit.getRawValue(); 
            var sel1 = flxAccounts.getSelectionModel().getSelections();           		
            sel1[1].set('debit',sel1[1].get('debit')-diff);
       grid_tot2();



}		 



 function find_value()
 {

        var landvalue = 0;
        var selrows = flxDetail.getStore().getCount();
//alert(selrows)
        for (var i = 0; i < selrows; i++) {

            var rec = flxDetail.getStore().getAt(i);


            var retvalue =   Number(rec.get('mintunitrate')) * Number(rec.get('rejectedqty'));

            rec.set('rejectedvalue',retvalue);
            rec.set('disc',Number(rec.get('mintdiscount')));
            rec.set('pfper',Number(rec.get('mintpfper')));
            rec.set('cgstper',Number(rec.get('mintcgstper')));
            rec.set('sgstper',Number(rec.get('mintsgstper')));
            rec.set('igstper',Number(rec.get('mintigstper')));
            rec.set('tcsper',Number(rec.get('minttcsper')));
            rec.set('rebate',Number(rec.get('mintrebate')));
            rec.set('tcsval',Number(rec.get('minttcsval')));
       
            rec.set('itemvlaue',0);
            disvalue = 0;


            if ( Number(rec.get('mintdiscount'))  > 0 && retvalue > 0 )
            {
               disvalue =  Ext.util.Format.number((Number(retvalue) *  Number(rec.get('mintdiscount')) )/100,'0.00'); 
            } 
            else
            {   
               disvalue = Number(rec.get('mintdisamt')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
            }  

            rec.set('discamt',disvalue);



            pfvalue = 0;


	if (rec.get('pfyesno') == 'Y')
	{

		    if ( Number(rec.get('mintpfper'))  > 0 && retvalue > 0  )  {
	alert(rec.get('pfyesno'));
		       pfvalue =  Ext.util.Format.number((Number(retvalue) - Number(disvalue))  *  Number(rec.get('mintpfper')) /100,'0.00'); 
		    } 
		    else
		    {
		       pfvalue = Number(rec.get('mintpfamt')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
		    }       
	}
            rec.set('pfamt',pfvalue);


               othervalue = Number(rec.get('mintothers')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
           rec.set('others',othervalue);


               frtvalue = Number(rec.get('mintfreight')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
           rec.set('freight',frtvalue);


               otherPMvalue = Number(rec.get('mintotherpm')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
           rec.set('otherpm',otherPMvalue);

insval = 0;
            if ( Number(rec.get('insurance'))  > 0 && retvalue > 0 )  {
               insval  = Number(rec.get('insurance')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
               rec.set('insurance',insval);

            }

               rebate = Number(rec.get('mintrebate')) / Number(rec.get('mintrcvdqty'))  * Number(rec.get('rejectedqty'));
           rec.set('rebate',rebate);


            var taxable = Number(retvalue) - Number(disvalue) + Number(pfvalue)+ Number(frtvalue)+ Number(othervalue)+ Number(insval);


            cgstamount = 0;

            if ( Number(rec.get('cgstper'))  > 0 && taxable > 0 )  {
               cgstamount =  Ext.util.Format.number(Number(taxable) *  Number(rec.get('cgstper')) /100,'0.00'); 
            } 
            rec.set('cgstamt',cgstamount);

            sgstamount = 0;

            if ( Number(rec.get('sgstper'))  > 0 && taxable > 0 )  {
               sgstamount =  Ext.util.Format.number(Number(taxable) *  Number(rec.get('sgstper')) /100,'0.00'); 
            } 
            rec.set('sgstamt',sgstamount);


            igstamount = 0;

            if ( Number(rec.get('igstper'))  > 0 && taxable > 0 )  {
               igstamount =  Ext.util.Format.number(Number(taxable) *  Number(rec.get('igstper')) /100,'0.00'); 
            } 
            rec.set('igstamt',igstamount);

            tcsamount = 0;

            if ( Number(rec.get('tcsper'))  > 0 && taxable > 0 )  {
               tcsamount =  Ext.util.Format.number( (Number(taxable)+ 
Number(cgstamount) + Number(sgstamount) + Number(igstamount) ) *  Number(rec.get('tcsper')) /100,'0.00'); 
            } 

            rec.set('tcsval',tcsamount);


            landvalue  = Number(retvalue) - Number(disvalue);
//alert(landvalue);

//            rec.set('itemvalue',Number(taxable) + Number(cgstamount) + Number(sgstamount) + Number(igstamount) + Number(tcsamount) - Number(rebate)  );
            rec.set('itemvalue', Number(landvalue));

test =1;

        }
        grid_tot();
       




 }




  var dtpGRN = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 100,
       editable    : false,
       value: new Date().format('d-m-Y'),
       readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
enableKeyEvents: true,
 listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplierName.focus();
             }
       },
}
        
    });


var txtBillNo = new Ext.form.TextField({
        fieldLabel  : 'Bill NO.',
        id          : 'txtBillNo',
        width       : 120,
        name        : 'txtBillNo',
        readOnly    : 'true',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
});

    
  var dtpBill = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 120,
       editable    : false,
       readOnly    : true,
       value: new Date().format('d-m-Y'),

   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
 enableKeyEvents: true,
      listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbpono.focus();
             }
       },
}   
    });

/*
var txtSupplierName = new Ext.form.ComboBox({
        id: 'txtSupplierName',
        fieldLabel  : 'Supplier Name',
        store: LoadSupplierDatastore,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'cust_ref',
        valueField: 'cust_code',
        hiddenName : 'cust_code',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable:true,
        width: 400,
        listeners:{
            select: function () {
                suppcode = txtSupplierName.getValue();   

                loadGRNListDatasore.removeAll();
	   	loadGRNListDatasore.load({
		  url: 'ClsGrnReturn.php',
		  params: {
			    task: 'loadGRNNoList',
			    finid   :GinFinid,
			    compcode:Gincompcode,
                            supcode :txtSupplierName.getValue(),    
		            GRNtype :purtype,
	 	          },
		  callback:function()
			  {
		          }

	   	});	
	   }
	}
  });
  
*/

   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 420,
        id : flxLedger,
	enableKeyEvents: true,
        x: 250,
        y: -5,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "sup code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:330,align:'left'},
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


function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){
          	supstate = selrow.get('cust_state');
		supcode = selrow.get('cust_code');
                partyledcode= selrow.get('cust_code');
		txtSupplierName.setValue(selrow.get('cust_name'));
		flxLedger.hide();
                cmbGRNNo.focus();
        } 

        loadGRNListDatasore.removeAll();
   	loadGRNListDatasore.load({
	  url: 'ClsGrnReturn.php',
	  params: {
		    task: 'loadGRNNoList',
		    finid   :GinFinid,
		    compcode:Gincompcode,
                    supcode :supcode,    
	            GRNtype :purtype,
 	          },
	  callback:function()
		  {
	          }

   	});


}


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsGrn.php',
		params:
		{
			task:"loadSearchLedgerlist",
			party : txtSupplierName.getRawValue(),
		},
        });
}


var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   txtBillNo.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    });

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden:false,
    stripeRows : true,
    scrollable: true,
    x:10,
    y:200,
    height: 150,
    width: 1255,
    columns:
    [            
            	{dataIndex:'sno',header: "S.no",width: 40,align: 'center',sortable: true,hidden: false},
            	{dataIndex:'pono',header: "PO.no",width: 80,align: 'center',sortable: true,hidden: false},
            	{dataIndex:'podate',header: "PO.Date",width: 80,align: 'center',sortable: true,hidden: false},
         	{dataIndex:'itemname',header: "Item Name",width: 285,align: 'left',sortable: true},
		{dataIndex:'uom',header: "UOM",width: 100,align: 'center',sortable: true},
		{dataIndex:'pobalqty',header: " Pend.Qty",width: 60,align: 'center',sortable: true,},
		{dataIndex:'mintinvqty',header: "Invo. Qty", width: 60, align: 'center',sortable: true},
		{dataIndex:'mintrcvdqty',header: "Recd. Qty", width: 100, align: 'center',sortable: true},
		{dataIndex:'mintacceptqty',header: "Accept. Qty", width: 100, align: 'center',sortable: true},
		{dataIndex:'mintunitrate',header: "Unit rate", width: 90, align: 'center',sortable: true},


		{dataIndex:'mintdiscount', header: "Dis (%)",width: 60,align: 'center',sortable: true,   hidden:true},
		{dataIndex:'mintdisamt', header: "Dis Value",width: 60,align: 'center',sortable: true,hidden:true},
	 	{dataIndex:'mintpfper', header: "PF (%)",width: 60,align: 'center',sortable: true,hidden:true},
	 	{dataIndex:'mintpfamt', header: "PF Value",width: 60,align: 'center',sortable: true,hidden:true},
           	{dataIndex:'mintothers',header: "Others",width: 60,align: 'center',sortable: true ,hidden:true},
           	{dataIndex:'mintothers2',header: "Others(+)",width: 60,align: 'center',sortable: true ,hidden:true},
	 	{dataIndex:'mintcgstper', header: "CGST %",width: 60,align: 'center',sortable: true,hidden:true},
	 	{dataIndex:'mintcgstamt', header: "CGST Value",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintsgstper', header: "SGST %",width: 60,align: 'center',sortable: true,hidden:true},
 		{dataIndex:'mintsgstamt', header: "SGST Value",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintigstper', header: "IGST %",width: 60,align: 'center',sortable: true,hidden:true},
 		{dataIndex:'mintigstamt', header: "IGST Value",width: 60,align: 'center',sortable: true,hidden:true},
 		{dataIndex:'mintfreight', header: "Freight",width: 60,align: 'center',sortable: true,hidden:true},
//		{dataIndex:'mintqcreq', header: "QC Req",width: 60,align: 'center',sortable: true},
	//	{dataIndex:'mintinward', header: "Inward",width: 60,align: 'center',sortable: true},
                {dataIndex:'mintotherpm',header: "Others +/-)",width: 60,align: 'center',sortable: true,hidden:true},
 		{dataIndex:'mintvalue', header: "Value",width: 70,align: 'center',sortable: true,hidden:true},
 		{dataIndex:'mintCostvalue', header: "Cost Value",width: 70,align: 'center',sortable: true,hidden:true},
		{dataIndex:'minttcsper', header: "TCS PER",width: 50,align: 'center',sortable: true,hidden:true},
		{dataIndex:'minttcsval', header: "TCS AMT",width: 50,align: 'center',sortable: true,hidden:true},   
		{dataIndex:'mintrebate', header: "Rebate",width: 50,align: 'center',sortable: true,hidden:true},   
	//        {dataIndex:'mintins', header: "Insurance",width: 50,align: 'center',sortable: true,hidden:false},   
		{dataIndex:'mintcrstatus', header: "C/R Status",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'cgstled', header: "CGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'sgstled', header: "SGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'igstled', header: "IGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintitemcode', header: "Item Code",width: 60,align: 'center',sortable: true,hidden:true},
	        {dataIndex:'mintgrpcode', header: "Group Code",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'ledcode', header: "Led Code",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintindentno', header: "Indent No",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintfincode', header: "I.FinCode",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'stock', header: "Stock",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'tol', header: "Tol %",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'totqty', header: "Tot Qty",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'itc', header: "ITC",width: 0,align: 'center',sortable: true,hidden:true},
		{dataIndex:'oldgrnqty', header: "OLD.GRNQTY",width: 50,align: 'center',sortable: true,hidden:true},
	 	{dataIndex:'oldgrnval', header: "OLD.GRNVAL",width: 50,align: 'center',sortable: true,hidden:true} ,
                {header: "Pur.GrpName", dataIndex: 'purgrpname',sortable:true,width:100,align:'left',hidden:true},
                {header: "Pur.Grpcode", dataIndex: 'purgrpcode',sortable:true,width:100,align:'left',hidden:true},
		{dataIndex:'rejectedqty',header: "Reject. Qty", width: 100,default : '0', align: 'center',sortable:true ,       editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,

			renderer: function(val, meta, record){
			    if(val) return 0;
			    return record.get('rejectedqty');
			},
    

                    listeners: {
			specialkey:function(f,e){

				     if (e.getKey() == e.ENTER)
				     {
					  find_value();
				     }
			       },

                    focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            rate = Number(selrow.get('mintunitrate'));
                             grnqty = Number(selrow.get('mintacceptqty'));

                            this.setValue(Number(selrow.get('rejectedqty')));

                            if (Number(this.getRawValue()) > Number(grnqty)) {
                                Ext.MessageBox.alert(" Return", "Return Qty cannot be greater than GRN Qty");
                                this.setValue("0");
                                selrow.set('rejectedqty', "0");
                                 selrow.set('rejectedvalue', "0");
                            } 
                            find_value();
                            
                        },

                        blur: function () {
                            find_value();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var grnqty = 0;
                            if (gstFlag == "Add")
                               grnqty = Number(selrow.get('mintacceptqty'));
                            else
                               grnqty = Number(selrow.get('mintrcvdqty'));

                            rate = Number(selrow.get('mintunitrate'));
                            purchasegroup   = Number(selrow.get('purgrpcode'));
                            cgst_percentage = Number(selrow.get('mintcgstper'));
                            sgst_percentage = Number(selrow.get('mintsgstper'));
                            igst_percentage = Number(selrow.get('mintigstper'));

                            cgst_ledcode = Number(selrow.get('cgstled'));
                            sgst_ledcode = Number(selrow.get('sgstled'));
                            igst_ledcode = Number(selrow.get('igstled'));


//alert(Number(selrow.get('sno')));

/*
                            if (Number(this.getRawValue()) > Number(grnqty)) {
                                Ext.MessageBox.alert(" Return", "Return Qty cannot be greater than GRN Qty");
                                this.setValue("0");
                                selrow.set('rejectedqty', "0");
                                selrow.set('rejectedvalue', "0");
                            } 
*/
                           find_value();
     
                        },



                    }
                 }
                },  
		{dataIndex:'rejectedvalue',header: "Reject. Value", width: 100, align:'center',sortable:true},

		{dataIndex:'disc', header: "Dis (%)",width: 60,align: 'center',sortable: true,},
		{dataIndex:'discamt', header: "Dis Value",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'pfyesno', header: "PF YES/NO",width: 60,align: 'center',sortable: true,
                },
	 	{dataIndex:'pfper', header: "PF (%)",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'pfamt', header: "PF Value",width: 60,align: 'center',sortable: true,},
           	{dataIndex:'others',header: "Others",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'cgstper', header: "CGST %",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'cgstamt', header: "CGST Value",width: 60,align: 'center',sortable: true},
		{dataIndex:'sgstper', header: "SGST %",width: 60,align: 'center',sortable: true},
 		{dataIndex:'sgstamt', header: "SGST Value",width: 60,align: 'center',sortable: true},
		{dataIndex:'igstper', header: "IGST %",width: 60,align: 'center',sortable: true},
 		{dataIndex:'igstamt', header: "IGST Value",width: 60,align: 'center',sortable: true},
 		{dataIndex:'freight', header: "Freight",width: 60,align: 'center',sortable: true},
                {dataIndex:'otherpm',header: "Others +/-)",width: 60,align: 'center',sortable: true},

		{dataIndex:'tcsper', header: "TCS PER",width: 50,align: 'center',sortable: true},
		{dataIndex:'tcsval', header: "TCS AMT",width: 50,align: 'center',sortable: true}, 
		{dataIndex:'insurance', header: "insurance",width: 50,align: 'center',sortable: true}, 
  
		{dataIndex:'rebate', header: "Rebate",width: 50,align: 'center',sortable: true},  
 		{dataIndex:'itemvalue', header: "Value",width: 70,align: 'center',sortable: true}, 
		{dataIndex:'cgstledname', header: "CGST LEDNAME",width: 60,align: 'center',sortable: true},
		{dataIndex:'sgstledname', header: "SGST LEDNAME",width: 60,align: 'center',sortable: true},
		{dataIndex:'igstledname', header: "IGST LEDNAME",width: 60,align: 'center',sortable: true},
          
     ],
    store: [],
    listeners:{	
            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {

                if (cellIndex == 50)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.pfyesno == '')
                                    flag = 'N';
                                else                                   
                                    flag = selected_rows[i].data.pfyesno;
                                             

                               	colname = 'pfyesno';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				} else 
				{
				   selected_rows[i].set(colname, 'N');
				}
                                find_value();
                       }   
                }
  
             }  ,
 }

});


    
var cmbGRNNo = new Ext.form.ComboBox({
    fieldLabel      : 'GRN No',
    width           :  90,
    displayField    : 'minh_minno',
    valueField      : 'minh_minno',
    hiddenName      : 'minh_minno',
    id              : 'cmbGRNNo',
    typeAhead       : true,
    mode            : 'local',
    store           : loadGRNListDatasore,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function () {

                    GRNdetailsLoadDataStore.removeAll(); 
                    GRNdetailsLoadDataStore.load({
                       url: 'ClsGrnReturn.php',
                       params:
                       {
                          task:"loadgrndetails",
                          grnno:cmbGRNNo.getRawValue(),
                          compcode:Gincompcode,
                          finid:GinFinid,
                          GRNtype :purtype,

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=GRNdetailsLoadDataStore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  


                             grnaccseqno = GRNdetailsLoadDataStore.getAt(0).get('minh_acc_seqno');



                             partycode = GRNdetailsLoadDataStore.getAt(0).get('mint_cust_code');
                             partyledcode = GRNdetailsLoadDataStore.getAt(0).get('mint_cust_code');
                             dtpBill.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_date'),"d-m-Y"));
                             dtpGRN.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('mint_mindate'),"d-m-Y"));
                             txtBillNo.setRawValue(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_no'));
                             for(var j=0; j<cnt; j++)
		             { 

                               var sno1               = GRNdetailsLoadDataStore.getAt(j).get('mint_slno');
                               var pono1              = GRNdetailsLoadDataStore.getAt(j).get('mint_pono');
                               var podate1            = GRNdetailsLoadDataStore.getAt(j).get('mint_podate');
                               var itemname1          = GRNdetailsLoadDataStore.getAt(j).get('item_name');
                               var uom1               = GRNdetailsLoadDataStore.getAt(j).get('uom_short_name');
			       var pobalqty1          = GRNdetailsLoadDataStore.getAt(j).get('mint_inv_qty'); 
                               var mintinvqty1        = GRNdetailsLoadDataStore.getAt(j).get('mint_inv_qty');
			       var mintrcvdqty1       = GRNdetailsLoadDataStore.getAt(j).get('mint_rcvd_qty');
            		       var mintacceptqty1     = GRNdetailsLoadDataStore.getAt(j).get('mint_accept_qty')-GRNdetailsLoadDataStore.getAt(j).get('mint_rej_qty');
                               var mintunitrate1      = GRNdetailsLoadDataStore.getAt(j).get('mint_unit_rate');
                               var mintdiscount1      = GRNdetailsLoadDataStore.getAt(j).get('mint_discount');
                               var mintdisamt1        = GRNdetailsLoadDataStore.getAt(j).get('mint_disamt');
 		               var mintpfper1         = GRNdetailsLoadDataStore.getAt(j).get('mint_pack_per');
	 		       var mintpfamt1         = GRNdetailsLoadDataStore.getAt(j).get('mint_pfamt');
                               var mintothers1        = GRNdetailsLoadDataStore.getAt(j).get('mint_others');  
                               var mintcgstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_per');
                               var mintsgstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_sgst_per');
                               var mintigstper1       = GRNdetailsLoadDataStore.getAt(j).get('mint_igst_per');
                               var mintsgstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_sgst_amt');
			       var mintcgstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_amt');
                               var mintigstamt1       = GRNdetailsLoadDataStore.getAt(j).get('mint_igst_amt');
		               var mintfreight1       = GRNdetailsLoadDataStore.getAt(j).get('mint_freight');
		               var mintqcreq1         = GRNdetailsLoadDataStore.getAt(j).get('mint_qc_status');


                               var mintotherspm      =  GRNdetailsLoadDataStore.getAt(j).get('mint_otherspm');  
                               var mintclrfreight1    = GRNdetailsLoadDataStore.getAt(j).get('mint_tax_freight');
                               var mintcrstatus1      = GRNdetailsLoadDataStore.getAt(j).get('mint_cr_status');
                               var mintvalue1         = GRNdetailsLoadDataStore.getAt(j).get('mint_value');
                               var mintitemcode1      = GRNdetailsLoadDataStore.getAt(j).get('mint_item_code');                      
                               var mintgrpcode1       = GRNdetailsLoadDataStore.getAt(j).get('item_grp_code');
                               var mintindentno1      = GRNdetailsLoadDataStore.getAt(j).get('mint_ind_no');
                               var mintfincode1       = GRNdetailsLoadDataStore.getAt(j).get('mint_ind_fin_code');




                               var RowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                 new dgrecord({
	                             sno               : sno1,
                                     pono              : pono1,
                                     podate            : Ext.util.Format.date(podate1,"Y-m-d"),
                                     itemname          : itemname1,
                                     uom               : uom1, 
                                     pobalqty          : pobalqty1, 
                                     mintinvqty        : mintinvqty1,
                                     mintrcvdqty       : mintrcvdqty1,
                                     mintacceptqty     : mintacceptqty1,
			             mintunitrate      : mintunitrate1,
			             mintdiscount      : mintdiscount1,
                                     mintdisamt        : mintdisamt1,
			             mintpfper         : mintpfper1,
                                     mintpfamt         : mintpfamt1,
                                     mintothers        : mintothers1,
                                     mintcgstper       : GRNdetailsLoadDataStore.getAt(j).get('mint_cgst_per'),
                                     mintsgstper       : mintsgstper1,
			             mintigstper       : mintigstper1,
			             mintsgstamt       : mintsgstamt1,
			             mintcgstamt       : mintcgstamt1,
			             mintigstamt       : mintigstamt1,
			             mintfreight       : mintfreight1,
		                     mintqcreq         :'Y',

                                     mintotherpm       : mintotherspm,
                                     mintcrstatus      : mintcrstatus1,
                                     mintvalue         : mintvalue1,
                                     vatstatus         : 'N',
              		             cgstled           : 0,
                                     sgstled           : 0, 
			             igstled           : 0,

                                     mintitemcode      : mintitemcode1,//  itemcode,
                                     mintgrpcode       : mintgrpcode1,
                                     ledcode           :'0',
                                     mintindentno      : mintindentno1,
                                     mintfincode       : mintfincode1,
                                     stock:'0',	
			             tot:'0',
			             totqty:'0',
                 	             itc:'N',
                                     oldgrnqty         : mintacceptqty1,
                                     oldgrnval         : mintvalue1,
                                     minttcsper        : GRNdetailsLoadDataStore.getAt(j).get('mint_tcs_per'),
                                     minttcsval        : GRNdetailsLoadDataStore.getAt(j).get('mint_tcs_amt'),
                                     insurance         : GRNdetailsLoadDataStore.getAt(j).get('mint_insurance'),
                                     mintrebate        : GRNdetailsLoadDataStore.getAt(j).get('mint_rebate'),
                                     purgrpname        : GRNdetailsLoadDataStore.getAt(j).get('led_name'),
                                     purgrpcode        : GRNdetailsLoadDataStore.getAt(j).get('mint_purgroup'),
                                     cgstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_cgstledcode'),
                                     sgstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_sgstledcode'),
                                     igstled           : GRNdetailsLoadDataStore.getAt(j).get('tax_igstledcode'),
                                     cgstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_cgstledger'),
                                     sgstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_sgstledger'),
                                     igstledname       : GRNdetailsLoadDataStore.getAt(j).get('tax_igstledger'), 
                                     rejectedqty       :'0',
                                     rejectedvalue     :'0',
                                     pfyesno           : 'Y', 
 
                                   })
                                );
	     
/*
                                if (GRNdetailsLoadDataStore.getAt(0).get('minh_accupd') == "Y") {
                                 alert("Accounts updation done.  You can't Modify..")
                                   Ext.getCmp('save').setDisabled(true);
                                 
                                }
                                else {
                                             Ext.getCmp('save').setDisabled(false);

                                }

*/
   
                             } // for loop end

                            flxaccupdation();
                         }  
                         else {  
                            alert("GRN Retrun Number not found..."); 
                         }  // if end
            
                      }  // call back function end
                   });



               }


    }     
});

var myFormPanel = new Ext.form.FormPanel({
        width        :  1150, 
        title        : 'GRN RETRUN / DEBIT NOTE',
        style        : 'margin: 5px ',
        height       : 600,
        frame        : false,
        bodyStyle    : 'background: url(../GRN/icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'myFormPanel',
        layout       : 'absolute',
 
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                  
                    },[
                     {},
                       
        ]),
        items : [
                {
		    xtype: 'tabpanel',
		    activeTab: 0,
		    height: 520,
		    width: 1280,
		    x: 0,
		    y: 5,
/*
		listeners: {
		    'tabchange': function(tabPanel, tab) {
			flxaccupdation();
		    }
		},
*/
		    items: [
		    {
		        xtype: 'panel',
		        title: 'GRN - Item Details',
		        width: 200,
		        height: 300,
		        layout: 'absolute',
		        items: [
		            {
		            xtype: 'fieldset',
		            title: 'GRN Details',
		            border: true,
		            height:  100,
		            width: 1255,
		           layout: 'absolute',
		    //        labelWidth:80,
		            x: 10,  
		            y: 10,
		            items: [
			               {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 110,
				            width       : 380,
				            x           : 5,
				            y           : -5,
				            border      : false,
				            items: [txtRRNo]
				        },  
			               {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 110,
				            width       : 380,
				            x           : 5,
				            y           : -5,
				            border      : false,
				            items: [cmbRRNo]
				        },  
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 60,
				            width       : 230,
				            x           : 280,
				            y           : -5,
				            border      : false,
				            items: [dtpRR]
				        },  

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 110,
				            width       : 600,
				            x           : 5,
				            y           : 30,
				            border      : false,
				            items: [txtSupplierName]
				        }, 
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 60,
				            width       : 380,
				            x           : 550,
				            y           : -5,
				            border      : false,
				            items: [cmbGRNNo]
				        },  
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 60,
				            width       : 200,
				            x           : 550,
				            y           : 30,
				            border      : false,
				            items: [dtpGRN]
				        },                         
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 60,
				            width       : 380,
				            x           : 800,
				            y           : -5,
				            border      : false,
				            items: [txtBillNo]
				        },  
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 60,
				            width       : 230,
				            x           : 800,
				            y           : 30,
				            border      : false,
				            items: [dtpBill]
				        },  
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 75,
				            width       : 380,
				            x           : 1000,
				            y           : -5,
				            border      : false,
				            items: [txtVouNo2]
				        },  	      


				    ]

				},
		                {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 0,
		                    x           : 0,
		                    y           : 120,
		                    border      : false,
		                    items: [flxDetail]
		                },  





                   {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 200,
                    width: 1255,
                    labelWidth:1,
		           layout: 'absolute',
                    x:10 ,  
                    y:280 ,
                    items: [

 		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 0,
		            border      : false,
		            items: [txtTotInsurance]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 30,
		            border      : false,
		            items: [txtTotalValue]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 60,
		            border      : false,
		            items: [txttotdisc]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 90,
		            border      : false,
		            items: [txtTotPF]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 120,
		            border      : false,
		            items: [txttotfreight1]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 110,
		            width       : 600,
		            x           : 5,
		            y           : 150,
		            border      : false,
		            items: [txttotothval]
		        }, 



		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 90,
		            width       : 600,
		            x           : 250,
		            y           : 0,
		            border      : false,
		            items: [txttotcgst]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 90,
		            width       : 600,
		            x           : 250,
		            y           : 30,
		            border      : false,
		            items: [txttotsgst]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 90,
		            width       : 600,
		            x           : 250,
		            y           : 60,
		            border      : false,
		            items: [txttotigst]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 90,
		            width       : 600,
		            x           : 250,
		            y           : 90,
		            border      : false,
		            items: [txttotTCS]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 90,
		            width       : 600,
		            x           : 250,
		            y           : 120,
		            border      : false,
		            items: [txtTotOthersPM]
		        },

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 40,
		            width       : 600,
		            x           : 420,
		            y           : 0,
		            border      : false,
		            items: [txtCGSTPM]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 40,
		            width       : 600,
		            x           : 420,
		            y           : 30,
		            border      : false,
		            items: [txtSGSTPM]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 40,
		            width       : 600,
		            x           : 420,
		            y           : 60,
		            border      : false,
		            items: [txtIGSTPM]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 70,
		            width       : 600,
		            x           : 550,
		            y           : 0,
		            border      : false,
		            items: [txtOthers]
		        }, 
		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 130,
		            width       : 600,
		            x           : 720,
		            y           : 0,
		            border      : false,
		            items: [cmbOtherLedger]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 130,
		            width       : 600,
		            x           : 720,
		            y           : 30,
		            border      : false,
		            items: [txtroundoff]
		        }, 


		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 130,
		            width       : 600,
		            x           : 720,
		            y           : 60,
		            border      : false,
		            items: [txtlandvalue]
		        }, 

		        {
		            xtype       : 'fieldset',
		            title       : '',
		            labelWidth  : 130,
		            width       : 600,
		            x           : 720,
		            y           : 100,
		            border      : false,
		            items: [txtReturnValue]
		        }, 


                    ]
                 },


                 {
                    xtype: 'fieldset',
                    border: false,
                    width: 465,
                    labelWidth:60,
                    x: 100,  
                    y: 100,
	               items: [flxLedger]
                  },                  

                ],


		    },

            {
                xtype: 'panel',
                title: 'Ledger Posting',
                width: 200,
                height: 300,
                layout: 'absolute',
		listeners: {
		    'tabchange': function(tabPanel, tab) {
			flxaccupdation();
		    }
		},
                items: [


				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 75,
				            width       : 380,
				            x           : 1000,
				            y           : -5,
				            border      : false,
				            items: [btnUpdate]
				        },  	      


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 40,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtVouNo]
                            },



  		           {
				    xtype: 'fieldset',
				    title: ' ',
				    border: true,
				    height: 240,
				    width: 1100,
				    labelWidth:85,
				    x:10 ,  
				    y:110 ,
				    items: [flxAccounts]
		          },

			  {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 x           : 880,
				 y           : 180,
				 border      : false,
				 items:[txttotDebit],
		           },
			   {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 x           : 880,
				 y           : 220,
				 border      : false,
				 items:[txttotCredit],
		           },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 1100,
                                	x           : 40,
                                	y           : 380,
                                    	border      : false,
                                	items: [txtRemarks]
                            },

                ]
            },            
            ]
        } ,
    
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png',
                    listeners:{
                       click: function () {
                            gstFlag = "Add";
                       }
                    }
                    
                },'-',
//EDIT
                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
                       click: function () {
                           gstFlag = "Edit";
                           viewopt = 1;
                           cmbRRNo.show();

			   loadRRNoListDatasore.load({
			   url: 'ClsGrnReturn.php',
			   params: {
				    task: 'loadRRNoList',
				    finid:GinFinid,
				    compcode:Gincompcode,
		
			   },
			   callback:function()
			   {


			   }
			   });

                           }
                    }
                    
                },'-',
                {
//save
                    xtype: 'button',
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
            	    listeners:{
                    click:function() {

                        save_click();

                    }
                    }  
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
                    listeners:{
                      click: function () {
                            RefreshData();
                       }
                    }
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png',
                    listeners:{
                      click: function () {
		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&retno=" + encodeURIComponent(cmbRRNo.getValue());
                  var param = (p1+p2+p3) ;  
		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRNReturn.rptdesign&__format=pdf' + param); 
                   
                       }
                    }
                },'-', 

                {
                    xtype: 'button',
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png',
                    listeners:{
                     click: function(){
                        window_form.hide();
                      }
}
                    
                }
            ]
        }
    });



function RefreshData(){
        cmbRRNo.hide();
        flxLedger.hide();
        dtpBill.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
        dtpGRN.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
        gstFlag = "Add";
        Ext.getCmp('txtSupplierName').setDisabled(false); 
        txtSupplierName.setRawValue('');
        txtBillNo.setRawValue('');
        txtTotalValue.setRawValue('');
        txttotDebit.setRawValue('');
        txttotCredit.setRawValue('');

        txtOthers.setRawValue('');
	LoadRRNoDatastore.load({
	url: 'ClsGrnReturn.php',
	params: {
	    task: 'loadRRNo',
	    finid:GinFinid,
	    compcode:Gincompcode,
		
	},
	callback:function()
	{

	txtRRNo.setRawValue(LoadRRNoDatastore.getAt(0).get('retno'));
	}
    	});


   	LoadSupplierDatastore.load({
          url: 'ClsGrnReturn.php',
          params: {
		    task: 'loadsupplier',
		    finid   :GinFinid,
		    compcode:Gincompcode,
                    GRNtype :purtype,
 	          },
          callback:function()
	          {
                  }

   	});


	  loadDNVouNoDatasore.load({
	    url: 'ClsGrnReturn.php',
	    params: {
		task    : 'LoadDNNumber',
		finid   : GinFinid,
		compcode: Gincompcode,
                
	    },
	    callback: function () {
                var vno = " 00"+loadDNVouNoDatasore.getAt(0).get('vouno');   

               if (loadDNVouNoDatasore.getAt(0).get('vouno') < 10)
                {                                              
                  vno = "00"+loadDNVouNoDatasore.getAt(0).get('vouno');
                }                                      
                else
                {  
                     if (loadDNVouNoDatasore.getAt(0).get('vouno') < 100) 
                     {                                              
                      vno = "0"+loadDNVouNoDatasore.getAt(0).get('vouno');                   
                     }
                     else 
                     {      
                       vno = loadDNVouNoDatasore.getAt(0).get('vouno');  
                     }
                } 

		     vno =  vno.slice(-4);  
		     vno =  vno.trim() +'/'+ invfin; 
		     vno = "DNG/"+vno; 

                     txtVouNo.setValue(vno);
                     txtVouNo2.setValue(vno);
  
	    }
	  });


/*
                  ControlmasterDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'ControlDebitNo',
                        ginfinid: GinFinid,
                        gincompcode: Gincompcode
                    },
                    callback: function () {
                        txtVouNo.setValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                  });
*/


        txttotcgst.setValue('');
        txttotsgst.setValue('');
        txttotigst.setValue('');

        txtTaxable.setValue('');
        txttotdisc.setValue('');
        txtTotPF.setValue('');
        txttotfreight1.setValue('');
        txttotothval.setValue("");
        txtTotOthersPM.setValue('');
        txtlandvalue.setValue('');
         txtroundoff.setValue('');
         txtReturnValue.setValue('');
         txtReturnValue.setRawValue('');
         txtVouNo.setRawValue('');
         txtVouNo2.setRawValue('');

         txtRemarks.setValue('');
}



 var window_form = new Ext.Window({
         width        : 1300,         //1340,
         height       : 605,
         items        : myFormPanel,
	 layout      : 'fit',
         closable:false,
         resizable:false,
         draggable:false,
        //0 x:150,
         y:35,
	listeners:{
       		show:function(){
                  	RefreshData();	
                }
        }   
  
});
  window_form.show();
});
