Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');

   var gstfinyear = localStorage.getItem('gstyear');


   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');

   var userid = localStorage.getItem('ginuserid');
   var usertype = localStorage.getItem('ginuser');
   var rounding = 0;

   var seqno = 0;
   var poseqno = 0;

   var gstStatus = "N";
   var gstFlag = "Add";
   var gstStatus = "N";
   var itemgrpcode = 0;
   var gridedit = "false";
   var FrePaidby = 0;

   var lotcode = 0;
   var dntype = '';
               var dngsttype = "N";
var ledgercode = 0;

var cgstledcode = 0;
var sgstledcode = 0;
var igstledcode = 0;
var cgstledger  = '';
var sgstledger  = '';
var igstledger  = '';

var cgstledcodeDN = 0;
var sgstledcodeDN = 0;
var igstledcodeDN = 0;
var cgstledgerDN  = '';
var sgstledgerDN  = '';
var igstledgerDN  = '';


var grnitemcode = 0;
var supcode = 0;
var degitemcode = 0;

var accseqno = 0;
var dnaccseqno = 0;
var dnseqno = 0;
                        var moisremarks = '';
                        var finesremarks = '';
                        var sandremarks = '';
                        var othdedremarks = '';

                        var remarks ='';


   var loadDNDateDatastore = new Ext.data.Store({
      id: 'loadDNDateDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDNDate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dnmaxdate'
      ]),
    });




var hsncode = '';
 var loadTicketNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelTicketList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_ticketno',
      ]),
    });




var grn_status = 'C';
var opt_GRN_Status = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'GRN COMPLETED',
    fieldLabel: '',
    layout : 'vbox',
    defaultType : 'textfield',
    width:140,
    height:100,
    x:85,
    y:100,
    border: true,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  true,
                	x       : 100,          
                	y       : -30,
                	columns :  1,
                        id      : 'opt_GRN_Status',
                	items: [
                    	{boxLabel: 'Completed', name: 'opt_GRN_Status',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                          	       	grn_status = 'C';
                      		}
                        }
                        }},
                        {boxLabel: 'Pending', name: 'opt_GRN_Status', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                        grn_status = 'P';

			         }
                            }
                         }},
                        ],
                  }
           ]

});




var txtNewGRNNo = new Ext.form.TextField({
        fieldLabel  : 'Change GRN Number As ',
        id          : 'txtNewGRNNo',
        name        : 'txtNewGRNNo',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });


   function check_password()
   {
      if (txtPassword.getRawValue() == "admin@123")
      {
         btnGRNNoChange.show();
      }
      else
      {
         btnGRNNoChange.hide();
      }    

   }   


   var txtNewBillNo = new Ext.form.TextField({
        fieldLabel  : 'Change Bill No.',
        id          : 'txtNewBillNo',
        width       : 150,
        name        : 'txtNewBillNo',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
      //          Ext.getCmp('dtpBill').focus(false, 0);	
		const input = document.getElementById('dtpNewBill');
		const end = input.value.length;
		input.setSelectionRange(0,0);
		input.focus();
}
            }
       },
   });


  var dtpNewBill = new Ext.form.DateField
    ({
       fieldLabel : ' Bill Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       id          : 'dtpNewBill',
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

             }
       },
}   
    });
   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',

        width       :  80,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 

    });



   function check_password2()
   {
      if (txtPassword2.getRawValue() == "admin@123")
      {
         btnDelete.show();
      }
      else
      {
         btnDelete.hide();
      }    

   }   


   var txtPassword2 = new Ext.form.TextField({
        fieldLabel  : 'GRN Delete PassWord',
        id          : 'txtPassword2',
        name        : 'txtPassword2',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  80,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password2();
           },
           keyup:function(){
              check_password2();
           },
        }
    }); 
   

var btnGRNNoChange = new Ext.Button({
    style   : 'text-align:center;',
    id       : 'btnGRNNoChange',
    text    : "Change No.",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
          if (cmbGRNNo.getRawValue()== "" || cmbGRNNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select GRN Number');
                gstSave="false";
            }  

 
            else if ( txtQCNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select QC Entry NO,');
   
                gstSave="false";
            }     

            else if ( txtGRNValue.getValue()==0)
            {
                Ext.Msg.alert('GRN', 'GRN VALUE IS EMPTY..,');

                gstSave="false";
            } 

            else if (accseqno == "0")
            {
                Ext.Msg.alert('GRN','Select GRN Number,');
                cmbPONO.focus();
                gstSave="false";
            }                  

            else
            {
            Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'KINDLY COFIRM. Do You Want To CHANGE THE GRN ...',
		    fn: function(btn)
			{
		    if (btn === 'yes')
			{
		  
			    var grnData = flxDetail.getStore().getRange();                                        
			    var grnupdData = new Array();
			    Ext.each(grnData, function (record) {
				grnupdData.push(record.data);
			    });
                        }          

			    Ext.Ajax.request({
			    url: 'TrnFUGRNNoChange.php',
			    params :
			     {
			     	griddet: Ext.util.JSON.encode(grnupdData),
				cnt:grnData.length,


				gstFlaggrn : gstFlag,                                 
				compcode:Gincompcode,
				finid:GinFinid,
				seqno  : seqno,
				grnno  : txtGRNNo.getValue(),
                                edgrnno : txtGRNNo.getRawValue(),
				ordseqno : poseqno,
				accseqno : accseqno,
				newgrnno  : txtNewGRNNo.getValue(),
                                          
				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("GRN CHANGED No.-" + obj['GRNNo']);
		//                                    TrnGrnformpanel.getForm().reset();
				    flxDetail.getStore().removeAll();


				    RefreshData();
		//				    TrnGrnformpanel.getForm().reset();
				  }else
					{
			Ext.MessageBox.alert("GRN Not CHANGED! Pls Check!- " + obj['GRNNo']);                                                  
				    }
				}

			   }); 
                        } 
                 }); 
             }
          }   
    } 
});

   function check_password3()
   {
      if (txtPassword3.getRawValue() == "admin@123")
      {
         btnBillNoChange.show();
      }
      else
      {
         btnBillNoChange.hide();
      }    

   }   


   var txtPassword3 = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword3',
        name        : 'txtPassword3',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  80,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password3();
          },


           blur:function(){
              check_password3();
           },
           keyup:function(){
              check_password3();
           },
        }
    }); 


var btnBillNoChange = new Ext.Button({
    style   : 'text-align:center;',
    id       : 'btnBillNoChange',
    text    : "Change Bill No.",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
          if (cmbGRNNo.getRawValue()== "" || cmbGRNNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select GRN Number');
                gstSave="false";
            }  

 
    

            else if ( txtGRNValue.getValue()==0)
            {
                Ext.Msg.alert('GRN', 'GRN VALUE IS EMPTY..,');

                gstSave="false";
            } 

            else if (accseqno == "0")
            {
                Ext.Msg.alert('GRN','Select GRN Number,');
                cmbPONO.focus();
                gstSave="false";
            }                  

            else
            {
            Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'KINDLY COFIRM. Do You Want To CHANGE THE BILL NO ...',
		    fn: function(btn)
			{
		    if (btn === 'yes')
			{
		         Ext.Ajax.request({
			    url: 'TrnGRNBillNoChange.php',
			    params :
			     {


				gstFlaggrn : gstFlag,                                 
				compcode   : Gincompcode,
				finid      : GinFinid,
				grnno      : cmbGRNNo.getValue(),
                                edgrnno    : cmbGRNNo.getRawValue(),
				accseqno   : accseqno,
				newbillno  : txtNewBillNo.getRawValue(),
                                NewBillDt  : Ext.util.Format.date(dtpNewBill.getValue(),"Y-m-d"),	         
                                          
				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("BILL NO CHANGED No.-" + obj['GRNNo']);
		//                                    TrnGrnformpanel.getForm().reset();
		//		    flxDetail.getStore().removeAll();


				    RefreshData();
		//				    TrnGrnformpanel.getForm().reset();
				  }else
					{
			Ext.MessageBox.alert("BILL NO Not CHANGED! Pls Check!- " + obj['GRNNo']);                                                  
				    }
				}

			   }); 
                         }
                        } 
                 }); 
             }
          }   
    } 
});  

var btnDelete = new Ext.Button({
    style   : 'text-align:center;',
    id       : 'delete',
    text    : "DELETE",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{

//                        seqno = loadgrndetaildatastore.getAt(0).get('rech_seqno');
//                        poseqno= loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');
//                        accseqno= loadgrndetaildatastore.getAt(0).get('rech_acc_seqno')
        click: function(){   
            if (cmbGRNNo.getRawValue()== "" || cmbGRNNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select GRN Number');
                gstSave="false";
            }  

 
            else if ( cmbTicketNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select Ticket No.');
   
                gstSave="false";
            }     

            else if ( txtGRNValue.getValue()==0)
            {
                Ext.Msg.alert('GRN', 'GRN VALUE IS EMPTY..,');

                gstSave="false";
            } 

            else if (accseqno == "0")
            {
                Ext.Msg.alert('GRN','Select GRN Number,');
                cmbPONO.focus();
                gstSave="false";
            }                  

            else
            {
            Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'KINDLY COFIRM. Do You Want To DELELET THE GRN ...',
		    fn: function(btn)
			{
		    if (btn === 'yes')
    

			    Ext.Ajax.request({
			    url: 'TrnFUGRNDelete.php',
			    params :
			     {

				gstFlaggrn : gstFlag,                                 
				compcode : Gincompcode,
				finid    : GinFinid,
				seqno    : seqno,
				grnno    : cmbGRNNo.getValue(),
                                edgrnno  : cmbGRNNo.getRawValue(),
				ordseqno : poseqno,
				accseqno : accseqno,
				dnaccseqno  : dnaccseqno ,
				dnseqno  : dnseqno ,

                                ticketno : cmbTicketNo.getRawValue(),
                              	qcinsno  : txtQCNo.getValue(),
				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("GRN DELETED No.-" + obj['GRNNo']);
		//                                    TrnGrnformpanel.getForm().reset();
				    flxGRNDetail.getStore().removeAll();


				    RefreshData();
		//				    TrnGrnformpanel.getForm().reset();
				  }else
					{
			Ext.MessageBox.alert("GRN Not DELETED! Pls Check!- " + obj['GRNNo']);                                                  
				    }
				}

			   }); 
                        } 
                 }); 
             }
          }   
            
    }
}); 

 var loadCheck_QC_TicketNoDatastore = new Ext.data.Store({
      id: 'loadCheck_QC_TicketNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"load_QC_Ticket_Detail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
    'qc_fuel_compcode', 'qc_fuel_fincode', 'qc_fuel_entryno', 'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_area', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_itemcode', 'qc_fuel_ticketwt', 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_tot_ded_qty', 'qc_fuel_acceptqty', 'qc_fuel_qtydiff_qty', 'qc_fuel_qtydiff_rate', 'qc_fuel_qtydiff_value', 'qc_fuel_qtydiff_remarks', 'qc_fuel_mois_dn_yn', 'qc_fuel_mois_rate', 'qc_fuel_mois_value', 'qc_fuel_mois_remarks', 'qc_fuel_fines_dn_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_fines_remarks', 'qc_fuel_sand_dn_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_sand_remarks', 'qc_fuel_othded_qty', 'qc_fuel_othded_rate', 'qc_fuel_othded_value', 'qc_fuel_otherded_remarks', 'qc_fuel_total_ded_qty', 'qc_fuel_tot_taxable', 'qc_fuel_cgst_per', 'qc_fuel_sgst_per', 'qc_fuel_igst_per', 'qc_fuel_cgst_value', 'qc_fuel_sgst_value', 'qc_fuel_igst_value', 'qc_fuel_round_need', 'qc_fuel_rounding', 'qc_fuel_debitamount', 'qc_fuel_pur_ledger', 'qc_fuel_millqty', 'qc_fuel_billno', 'qc_fuel_billdate', 'qc_fuel_billqty', 'qc_fuel_billvalue', 'qc_fuel_debitnote_no', 'qc_fuel_debitnote_date', 'qc_fuel_dn_raised', 'qc_fuel_grn_raised', 'qc_fuel_vessel_name', 'qc_fuel_itemrate', 'qc_fuel_otherdedqty', 'qc_fuel_degrade_item', 'qc_fuel_degrade_qty', 'qc_fuel_degrade_rate', 'qc_fuel_dataentrydate', 'qc_fuel_modifydate', 'itmh_code', 'itmh_name', 'itmh_moisture_ARB', 'itmh_moisture_ADB', 'itmh_ash', 'itmh_volatile', 'itmh_fixedcarbon', 'itmh_fines', 'itmh_sand', 'itmh_iron', 'itmh_gcv_ADB', 'itmh_gcv_ARB', 'itmh_hsncode', 'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc', 'cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days', 'cust_grace_days', 'cust_repr', 'cust_panno', 'cust_gstin', 'cust_dealer', 'cust_smsno', 'cust_partygroup', 'cust_noof_visits1', 'cust_desp_target1', 'cust_payperf1', 'cust_tcs_applied', 'cust_distance', 'cust_addnlwt', 'cust_lock', 'cust_overdue_msg', 'cust_area', 'cust_addnl_cd_days', 'cust_acc_group', 'cust_gst_type', 'cust_tds_type', 'cust_tds_yn', 'cust_wp_gstinv_supplier_yn', 'cust_type', 'createdby', 'createddate', 'seqno', 'deg_item_name'
      ]),
    });



var gsttaxper = 0;
   var  invfin = localStorage.getItem('invfin');

var degrchk = "true"; var editrow = 0; var cessmtval = 0; var dedqty; var lifelessqty; var moistureper; var frttype; var stper = 0;
var scper = 0; var stamt = 0; var scamt = 0; var gridfreqty = 0; var fareacode = 0; var freitem; var freqty; var tonfre = 0; //var gstGroup;
var supplierid = 77; var Validatechk = "true"; 

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totgrnqty = 0,totgrnvalue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var totgrnvalue,cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_totval, pdb_tot_billval, pdb_totedval, totgrnqty, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;


var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(T)',
    id          : 'lblqty',
    width       : 60
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 60
});

var lblCGST = new Ext.form.Label({
    fieldLabel  : 'CGST',
    id          : 'lblCGST',
    width       : 60
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'SGST',
    id          : 'lblSGST',
    width       : 60
});

var lblIGST = new Ext.form.Label({
    fieldLabel  : 'IGST',
    id          : 'lblIGST',
    width       : 60
});

var lblParty = new Ext.form.Label({
    fieldLabel  : 'PARTY',
    id          : 'lblParty',
    width       : 60
});

var lblGRN = new Ext.form.Label({
    fieldLabel  : 'GRN',
    id          : 'lblGRN',
    width       : 60
});

var lblDiff = new Ext.form.Label({
    fieldLabel  : 'DIFF.',
    id          : 'lblDiff',
    width       : 60
});

var lblCess = new Ext.form.Label({
    fieldLabel  : 'CESS',
    id          : 'lblCess',
    width       : 60
});

var lblTCS = new Ext.form.Label({
    fieldLabel  : 'TCS',
    id          : 'lblTCS',
    width       : 60
});



var lblPurchase = new Ext.form.Label({
    fieldLabel  : 'PURCHASE',
    id          : 'lblPurchase',
    width       :  250,
    labelStyle : "font-size:14px;font-weight:bold;color:#cc00cc",
});


var lblDebitNote = new Ext.form.Label({
    fieldLabel  : 'DEBIT NOTE ',
    id          : 'lblPurchase',
    width       :  250,
    labelStyle : "font-size:14px;font-weight:bold;color:#cc00cc",
});


var lblFixed = new Ext.form.Label({
    fieldLabel  : 'Fixed',
    id          : 'lblFixed',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblActual = new Ext.form.Label({
    fieldLabel  : 'Actual',
    id          : 'lblActual',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDiff2 = new Ext.form.Label({
    fieldLabel  : 'Diff',
    id          : 'lblDiff2',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


   var txtDegradeItem = new Ext.form.TextField({
        fieldLabel  : 'Item',
        id          : 'txtDegradeItem',
        name        : 'txtDegradeItem',
        width       :  250,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDegradeRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtDegradeRate',
        name        : 'txtDegradeRate',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		}, 
        tabindex : 2
   });

   var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });

   var txtDegradeValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtDegradeValue',
        name        : 'txtDegradeValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });

   var txtDegradeDebitValue = new Ext.form.NumberField({
        fieldLabel  : 'Debit Value',
        id          : 'txtDegradeDebitValue',
        name        : 'txtDegradeDebitValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });


   var txtPartyWT = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtPartyWT',
        name        : 'txtPartyWT',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyValue',
        name        : 'txtPartyValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCGST',
        name        : 'txtPartyCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartySGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartySGST',
        name        : 'txtPartySGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtPartyIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyIGST',
        name        : 'txtPartyIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyCess',
        name        : 'txtPartyCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtPartyTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyTCS',
        name        : 'txtPartyTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffWt',
        name        : 'txtDiffWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffValue',
        name        : 'txtDiffValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCGST',
        name        : 'txtDiffCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSGST',
        name        : 'txtDiffSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });
   var txtDiffIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffIGST',
        name        : 'txtDiffIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });


   var txtDiffCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffCess',
        name        : 'txtDiffCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });

   var txtDiffTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffTCS',
        name        : 'txtDiffTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        tabindex : 2
   });






  var txtGRNWt = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtGRNWt',
        name        : 'txtGRNWt',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });





  var txtGRNActualValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNActualValue',
        name        : 'txtGRNActualValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });


  var txtGRNWt2 = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty(t)',
        id          : 'txtGRNWt2',
        name        : 'txtGRNWt2',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     
        decimalPrecision: 3,
        tabindex : 2
   });

  var txtGRNValue2 = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNValue2',
        name        : 'txtGRNValue2',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCGST',
        name        : 'txtGRNCGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNSGST',
        name        : 'txtGRNSGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });
   var txtGRNCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNCess',
        name        : 'txtGRNCess',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });

   var txtGRNIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNIGST',
        name        : 'txtGRNIGST',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });


   var txtGRNTCS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNTCS',
        name        : 'txtGRNTCS',
        width       :  65,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style      : "border-radius:5px;",     

        tabindex : 2
   });
var lblDedQty = new Ext.form.Label({
    fieldLabel  : 'Ded.Qty',
    id          : 'lblDedQty',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDedRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblDedRate',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDedValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblDedValue',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


   var txtHandlingAmount = new Ext.form.NumberField({
        fieldLabel  : 'Handling',
        id          : 'txtHandlingAmount',
        name        : 'txtHandlingAmount',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingcgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.CGST%',
        id          : 'txtHandlingcgstper',
        name        : 'txtHandlingcgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingsgstper = new Ext.form.NumberField({
        fieldLabel  : 'Handling.SGST%',
        id          : 'txtHandlingsgstper',
        name        : 'txtHandlingsgstper',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });


   var txtHandlingcgstamt = new Ext.form.NumberField({
        fieldLabel  : 'Handling.CGST',
        id          : 'txtHandlingcgstamt',
        name        : 'txtHandlingcgstamt',
        width       :  60,
	readOnly : true,
        tabindex : 2
   });

   var txtHandlingsgstamt = new Ext.form.NumberField({
        fieldLabel  : 'Handling.SGST',
        id          : 'txtHandlingsgstamt',
        name        : 'txtHandlingsgstamt',
        width       :  60,
	readOnly : true,
        tabindex : 2
   });


var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroupDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
  ])
})


    var loadDNVouNoDatasore = new Ext.data.Store({
        id: 'loadDNVouNoDatasore',
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsFuGrn.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadDNNumber"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['vouno'])
    });
    




 var loadunloadpartydatastore = new Ext.data.Store({
      id: 'loadunloadpartydatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadunloadparty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });

 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });



 var loadGSTDatastore = new Ext.data.Store({
      id: 'loadGSTDatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGST"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype'
      ]),
    });


 var loaditemqtydatastore = new Ext.data.Store({
      id: 'loaditemqtydatastore',
	
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 'ordt_item_code','ordt_qty','tol_per','tol_all_qty' ,'ordt_pen_qty','ordt_unit_rate','ordt_edpercentage', 'ordt_moisper','ordt_purgrp'
      ]),
    });


    var loadfreightdatastore = new Ext.data.Store({
      id: 'loadfreightdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'aif_seqno','aif_tonfreight','aif_tonfreight_tipper','arf_seqno','arf_loadfreight','arf_loadfreight_tipper', 
'arf_loadfreight_10w', 'arf_loadfreight_12w'
      ]),
    });

    var loadfreighttondatastore = new Ext.data.Store({
      id: 'loadfreighttondatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreightton"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'aif_seqno', 'aif_party_code', 'aif_area_code', 'aif_type', 'aif_itmh_code', 'aif_tonfreight', 'aif_tonfreight_tipper'
      ]),
    });

    var loadaccupdhstore = new Ext.data.Store({
      id: 'loadaccupdhstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceipth"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_servicecharge', 'rech_handling_cgstper', 'rech_handling_sgstper', 'rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_royality', 'rech_royality_amt', 'rech_dmft', 'rech_dmft_amt', 'rech_nmet', 'rech_nmet_amt', 'rech_acc_seqno',  'sup_type', 'sup_name', 'frt_sup_name', 'handling_sup_name', 'cust_code', 'frt_cust_code', 'sup_led_code', 'sup_taxcode', 'frt_sup_led_code', 'tax_ledcode', 'handling_led_code'
      ]),
    });

    var loadaccupdtstore = new Ext.data.Store({
      id: 'loadaccupdtstore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreceiptt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount', 'rect_unloadparty', 'rect_lorry_wheels',  'itmh_name', 'lot_refno'
      ]),
    });

    var loadfreightloddatastore = new Ext.data.Store({
      id: 'loadfreightloddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfreightlod"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'arf_seqno', 'arf_party_code', 'arf_area_code', 'arf_type', 'arf_loadfreight', 'arf_loadfreight_10w', 'arf_loadfreight_12w', 'arf_loadfreight_tipper'
      ]),
    });

 var loadlotnodatastore = new Ext.data.Store({
      id: 'loadlotnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlotno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_refno','lot_code'
      ]),
    });
var loadfilldtstore = new Ext.data.Store({
      id: 'loadfilldtstore',
	autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfilldt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_grnqty','amnt_unit_rate'
      ])
    });	
 var loadgrnpodatastore = new Ext.data.Store({
      id: 'loadgrnpodatastore',
	anchor     : '100%',
autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnpo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ordh_seqno','ordh_compcode','ordh_fincode','ordh_no','ordh_from','ordh_cust_code','ordh_date','ordh_terms','ordh_carriagetype',
'ordh_paymode','ordh_creditdays','ordh_overdueintper','ordh_payterms','ordh_remarks','ordh_frttype','ordh_frtparty_code','ordh_stper',
'ordh_scper','ordh_cgstper','ordh_sgstper','ordh_igstper','ordh_handling_mt','ordh_handling_cgstper','ordh_handling_sgstper','ordh_itemvalue','ordh_roundinff','ordh_totalvalue',
'ordh_status','ordh_amndstatus','ordh_amndposeqno','ordh_usr_code','ordh_entry_date','ordh_wef_date','ordh_custduty_mt','ordh_handling_mt',
'ordh_handling_party','ordh_gcv','ordh_gcv_tol','ordh_mois','ordh_mois_tol','ordh_inh_mois','ordh_inh_mois_tol','ordh_ash','ordh_ash_tol',
'ordh_sulpher','ordh_size','ordh_hgi','ordh_tcs','ordh_vol_meter','ordh_cess_pmt','ordh_royality','ordh_dmft','ordh_nmet','cancelflag','sup_type'


      ]),
    });

var TaxDataStore = new Ext.data.Store({
  id: 'TaxDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "taxdetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['cust_code', 'sup_name', 'cust_ref', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'tax_code', 'tax_name', 'tax_sales', 'tax_surcharge', 'tax_paidby', 'tax_type', 'tax_ledcode', 'tax_cgst_per', 'tax_sgst_per', 'tax_igst_per', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode'
  ])
})


	var loadgrnitemdatastore = new Ext.data.Store({
	id: 'loadgrnitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsFuGrn.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadgrnitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code'
	]),
	});
var loadponodatastore = new Ext.data.Store({
      id: 'loadponodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_seqno','ordh_no'
      ]),
    });
	
var loadgrnnodatastore = new Ext.data.Store({
      id: 'loadgrnnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno','rech_no', 'rech_seqno'
      ]),
    });

var loadgrneddtdatastore = new Ext.data.Store({
      id: 'loadgrneddtdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGrnQcCombine"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_date', 'rech_sup_code', 'rech_qcseqno', 'rech_ordhdseqno', 'rech_ticketno', 'rech_ticketdate', 'rech_truckno', 'rech_crdays', 'rech_area_code', 'rech_itemvalue', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_handling_pmt', 'rech_handling_cgstper', 'rech_handling_sgstper', 'rech_handling_cgstamt', 'rech_handling_sgstamt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_freight', 'rech_cgst_pm', 'rech_sgst_pm', 'rech_igst_pm', 'rech_othcharges', 'rech_roundingoff', 'rech_totalamount', 'rech_roundneeded', 'rech_purgrp', 'rech_acctflag', 'rech_acc_seqno', 'rech_accdate', 'rech_dnno', 'rech_dndate', 'rech_dnseqno', 'rech_dnaccseqno', 'rech_dn_cgst', 'rech_dn_sgst', 'rech_dn_igst', 'rech_dn_value', 'rech_debitnote_amount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_geno', 'rech_gedate', 'rech_usr_code', 'rech_entry_date', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_billqty', 'rect_billrate', 'rect_billvalue', 'rect_millqty', 'rect_mois_fixed', 'rect_mois_actual', 'rect_moisper', 'rect_moisqty', 'rect_sand_fixed', 'rect_sand_actual', 'rect_sandper', 'rect_sandqty', 'rect_fines_fixed', 'rect_fines_actual', 'rect_finesper', 'rect_finesqty', 'rect_fines_rate', 'rect_othdedqty', 'rect_totdedqty', 'rect_debitnote_value', 'rect_itemrate', 'rect_grnqty', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_remarks', 'rect_deg_item', 'rect_deg_qty', 'rect_deg_rate', 'rect_deg_value', 'rect_deg_debitvalue', 'cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days', 'cust_grace_days', 'cust_repr', 'cust_panno', 'cust_gstin', 'cust_dealer', 'cust_smsno', 'cust_partygroup', 'cust_noof_visits1', 'cust_desp_target1', 'cust_payperf1', 'cust_tcs_applied', 'cust_distance', 'cust_addnlwt', 'cust_lock', 'cust_overdue_msg', 'cust_area', 'cust_addnl_cd_days', 'cust_acc_group', 'cust_gst_type', 'cust_tds_type', 'cust_tds_yn', 'cust_wp_gstinv_supplier_yn', 'cust_type', 'createdby', 'createddate', 'seqno', 'qc_fuel_compcode', 'qc_fuel_fincode', 'qc_fuel_entryno', 'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_area', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_itemcode', 'qc_fuel_ticketwt', 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_tot_ded_qty', 'qc_fuel_acceptqty', 'qc_fuel_qtydiff_qty', 'qc_fuel_qtydiff_rate', 'qc_fuel_qtydiff_value', 'qc_fuel_qtydiff_remarks', 'qc_fuel_mois_dn_yn', 'qc_fuel_mois_rate', 'qc_fuel_mois_value', 'qc_fuel_mois_remarks', 'qc_fuel_fines_dn_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_fines_remarks', 'qc_fuel_sand_dn_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_sand_remarks', 'qc_fuel_othded_qty', 'qc_fuel_othded_rate', 'qc_fuel_othded_value', 'qc_fuel_otherded_remarks', 'qc_fuel_total_ded_qty', 'qc_fuel_tot_taxable', 'qc_fuel_cgst_per', 'qc_fuel_sgst_per', 'qc_fuel_igst_per', 'qc_fuel_cgst_value', 'qc_fuel_sgst_value', 'qc_fuel_igst_value', 'qc_fuel_round_need', 'qc_fuel_rounding', 'qc_fuel_debitamount', 'qc_fuel_pur_ledger', 'qc_fuel_millqty', 'qc_fuel_billno', 'qc_fuel_billdate', 'qc_fuel_billqty', 'qc_fuel_billvalue', 'qc_fuel_debitnote_no', 'qc_fuel_debitnote_date', 'qc_fuel_dn_raised', 'qc_fuel_grn_raised', 'qc_fuel_vessel_name', 'qc_fuel_itemrate', 'qc_fuel_otherdedqty', 'qc_fuel_degrade_item', 'qc_fuel_degrade_qty', 'qc_fuel_degrade_rate', 'qc_fuel_dataentrydate', 'qc_fuel_modifydate', 'itmh_code', 'itmh_name', 'itmh_moisture_ARB', 'itmh_moisture_ADB', 'itmh_ash', 'itmh_volatile', 'itmh_fixedcarbon', 'itmh_fines', 'itmh_sand', 'itmh_iron', 'itmh_gcv_ADB', 'itmh_gcv_ARB', 'itmh_hsncode', 'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc', 'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purT37ype', 'tax_state', 'degrade_itemname','itmh_hsncode', 'rech_dn_purledger' ,'rech_grn_status' ,'rech_dndate'
      ]),
    });
    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'grn_item', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno','rect_gedate', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount','rect_unloadparty', 'rect_lorry_wheels','itmh_ledcode', 'act_rect_qty','rect_wtcardno','rect_othdedqty','itmh_name','lot_refno','rect_billvalue','rech_purgrp','rect_gcv','led_name'

      ]),
    });
var loaditempodatastore = new Ext.data.Store({
      id: 'loaditempodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditempo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','itmh_code'
      ]),
    });

var loadAreadatastore = new Ext.data.Store({
      id: 'loadAreadatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'area_name','area_code'
      ]),
    });
var loadordnodatastore = new Ext.data.Store({
      id: 'loadordnodatastore',
// autoLoad: true,
  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadordno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'ordh_seqno', type: 'int',mapping:'ordh_seqno'},
	{name:'ordh_no', type: 'string',mapping:'ordh_no'}
      ])
    });	



var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        name        : 'txtGRNNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
enableKeyEvents: true, 
  listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpGRNDate.focus();
             }
       },
}		
});

var txtDNVouNo = new Ext.form.TextField({
    fieldLabel  : ' No.',
    id          : 'txtDNVouNo',
    name        : 'txtDNVouNo',
    width       :  140,
    style       :  {textTransform: "uppercase"},
    readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    enableKeyEvents: true, 
    listeners:{

    }		
});


var dtpDNDate = new Ext.form.DateField({
    fieldLabel : 'DN Date',
    id         : 'dtpDNDate',
    name       : 'date',
    labelStyle	: "font-size:12px;font-weight:bold;",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 110,
    readOnly: true,
    enableKeyEvents: true,
    listeners:{

    }  
});


var dtVouDate = new Ext.form.DateField({
    fieldLabel : 'Voucher Date',
    id         : 'dtVouDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
 enableKeyEvents: true,   
//    anchor     : '100%',
    width : 100,
//	disabled:true,    
    //readOnly: true,
    listeners:{
    }
});



var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroup"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname'
  ])
})


var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:30,
    height: 240,
    hidden:false,
    width: 600,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:50,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left',hidden : true},
    ],
    store: [],
    listeners:{	
    }

});



var flxAccountsDNOTE = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:650,
    y:30,
    height: 240,
    hidden:false,
    width: 800,
   id:'my-grid6',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:270,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : 'true'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left',hidden : true},
    ],
    store: [],
    listeners:{	
    }

});



var dramt = 0;
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
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : "0",
              credit    : Ext.util.Format.number(txtGRNValue.getRawValue(),'0.00'),
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

//Purchase Account - Debit
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : cmbPurchaseLedger.getValue(),
	      ledname   : cmbPurchaseLedger.getRawValue(),
	      debit     : Ext.util.Format.number(txtTotGRNValueBill.getRawValue(),'0.00'),
              credit    : 0,
              ledtype   : "G",
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              }) 
        );
//CGST Account - Debit

// alert(txtCGSTValue.getValue());
        if (txtCGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledger,
		      debit     :  Ext.util.Format.number(txtCGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//SGST Account - Debit

        if (txtSGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledger,
		      debit     :  Ext.util.Format.number(txtSGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//IGST Account - Debit

        if (txtIGSTValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledger,
		      debit     : Ext.util.Format.number(txtIGSTValue.getRawValue(),'0.00'),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//TCS Account - Debit

        if (txtTCSValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1865',
		      ledname   : 'TCS PAID-PURCHASE',
		      debit     : txtTCSValue.getRawValue(),
		      credit    : 0,
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
		      }) 
		);
         }

//CESS Account - Debit

        if (txtCessValue.getValue() > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "2026",
		      ledname   : "COMPENSATION CESS @400/ PER/MTS",
		      debit     : txtCessValue.getValue(),
		      credit    : 0,
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
                      ledtype   : "G",
		      }) 
		);
         }


//HANDLING Account - Debit

         if (txtHandCharges.getValue() > 0 )
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : "1757",
		      ledname   : "HANDLING CHARGES-GST 18%",
		      debit     : txtHandCharges.getRawValue(),
		      credit    : 0,
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
                      ledtype   : "G",

		      }) 
		);
         }


       if (txtHandCharges.getValue() > 0  &&  txtHandlingcgstval.getRawValue() > 0)
         {

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1669',
		      ledname   : 'INPUT CGST @9%',
		      debit     :txtHandlingcgstval.getRawValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);

		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : '1676',
		      ledname   : 'INPUT SGST @9%',
		      debit     :txtHandlingsgstval.getRawValue(),
		      credit    : 0,
                      billno    : "",     
                      ledtype   : "G",
		      }) 
		);

         }

        rounding = Number(txtroundoff.getValue()); 
	var rounddr = 0;
	var roundcr = 0;
	if ( rounding  > 0)
	   rounddr = rounding;
	else
	   roundcr = Math.abs(rounding);


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
		      billno    : txtBillno.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
	}



        flxAccountsDNOTE.getStore().removeAll();
//Party Account - Credit
        var RowCnt1 = flxAccountsDNOTE.getStore().getCount() + 1;
        flxAccountsDNOTE.getStore().insert(
          flxAccountsDNOTE.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : ledgercode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : Ext.util.Format.number(txtDNPartyValue.getRawValue(),'0.00'),
              credit    : '0',
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );


var ledgername2 = '';
var ledgercode2 = '';

if (cmbDNoteLedger.getRawValue() == "BIO FUEL EXEMPT")
{
   ledgername2 = 'REBATE AND DISCOUNT RECEIVED';
   ledgercode2 = '2652';
}
else
{
   ledgername2 = 'CREDIT NOTE TO BE RECEIVED';
   ledgercode2 = '4993';
}
 
//Purchase Account - Credit
        var RowCnt1 = flxAccountsDNOTE.getStore().getCount() + 1;
        flxAccountsDNOTE.getStore().insert(
          flxAccountsDNOTE.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : ledgercode2,
	      ledname   : ledgername2,
	      debit     : 0,
              credit    :  Ext.util.Format.number(txtDNPartyValue.getRawValue() ,'0.00'),
              ledtype   : "G",
              billno    : txtBillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
              }) 
        );
/*

        if (txtCGSTDN.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNOTE.getStore().getCount() + 1;
		flxAccountsDNOTE.getStore().insert(
		  flxAccountsDNOTE.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledger,
		      debit     : 0,
		      credit    :  Ext.util.Format.number(txtCGSTDN.getRawValue() ,'0.00'),
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//SGST Account - Debit

        if (txtSGSTDN.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNOTE.getStore().getCount() + 1;
		flxAccountsDNOTE.getStore().insert(
		  flxAccountsDNOTE.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledger,
		      debit     :  0,
		      credit    : Ext.util.Format.number(txtSGSTDN.getRawValue() ,'0.00'),
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

//IGST Account - Debit

        if (txtIGSTDN.getValue() > 0)
        {
		var RowCnt1 = flxAccountsDNOTE.getStore().getCount() + 1;
		flxAccountsDNOTE.getStore().insert(
		  flxAccountsDNOTE.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledger,
		      debit     : 0,
		      credit    :  Ext.util.Format.number(txtIGSTDN.getRawValue() ,'0.00'),
                      ledtype   : "G",
                      billno    : txtBillno.getRawValue(),
                      billdt    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
	         }) 
		);
         }

*/
       grid_tot_acc();
}

function get_DebitNote_Ledger()
{
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbDNoteLedger.getValue(),

		},
		callback:function()
		{


                  var dngsttype = "N";

                  cgstledcodeDN = 0;
                  sgstledcodeDN = 0;
                  igstledcodeDN = 0;
                  cgstledgerDN  = '';
                  sgstledgerDN  = '';
                  igstledgerDN  = '';


 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();

                    if (cnt >0)
                    {


                        gsttaxper = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_gst'); 

                        if (loadPurchaseGroupDetailDatasore.getAt(0).get('tax_gst') == 0)
                        {

                           dngsttype = "N";
                           txtCGSTDN.setRawValue('0'); 
                           txtSGSTDN.setRawValue('0'); 
                           txtIGSTDN.setRawValue('0'); 

                        }
                        else
                        { 
                           dngsttype = "G";   
                        }     


                          cgstledcodeDN = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcodeDN = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcodeDN = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledgerDN  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledgerDN  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledgerDN  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');


	    loadDNVouNoDatasore.load({
		url: 'ClsFuGrn.php',
		params:
		{	
		task    : 'LoadDNNumber',
		finid   : GinFinid,
		compcode: Gincompcode,
                gsttype : dngsttype,  


		},
		callback: function(){




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

                if (dngsttype == "G")
                {                 
                   vno = "DNG/"+vno;    
                   dntype = 'DNG';    
                }   
                else
                {  
                   vno = "DNN/"+vno;    
                   dntype = 'DNN';
                }   


                if (gstFlag == "Add")
                   txtDNVouNo.setValue(vno);
                else
                   txtDNVouNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_dnno'));    


		}
	});

                    } 
  //                  find_value(); 

 //               flxaccupdation(); 


                grid_tot(); 
  
		}
	      });  

}

function get_Purchase_Ledger()
{
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{


                  var dngsttype = "N";
                  txtCGSTPer.setRawValue('');
                  txtSGSTPer.setRawValue('');
                  txtIGSTPer.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';


 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();

                    if (cnt >0)
                    {


                        gsttaxper = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_gst'); 

                        if (loadPurchaseGroupDetailDatasore.getAt(0).get('tax_gst') == 0)
                        {

                           dngsttype = "N";
                           txtCGSTDN.setRawValue('0'); 
                           txtSGSTDN.setRawValue('0'); 
                           txtIGSTDN.setRawValue('0'); 

                        }
                        else
                        { 
                           dngsttype = "G";   
                        }     

                                        if (suptype == 24)
                                        {  

					txtCGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
					txtSGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
					txtIGSTPer.setValue(0);
                                        }   

                                        else
                                        {  
					txtCGSTPer.setValue(0);
					txtSGSTPer.setValue(0);
					txtIGSTPer.setValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
                                        }   


                          cgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');



                    } 
  //                  find_value(); 

 //               flxaccupdation(); 


                grid_tot(); 
  
		}
	      });  


if (gstFlag == "Add")
{
	loadDNDateDatastore.removeAll();
	loadDNDateDatastore.load({
        	 url:'ClsFuGrn.php',
        	 params:
       		 {
         	 task:"LoadDNDate",
		 finid    : GinFinid,
		 compcode : Gincompcode,
                 gsttype  : dngsttype,  
        	 },
		callback:function()
		{

                  if(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d"))
                  {  
                     dtpDNDate.setValue(Ext.util.Format.date(finenddate),'d-m-Y');

                  } 
                  else
 
                  {
                     dtpDNDate.setValue(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate')),'d-m-Y'); 
                  } 

        var dtDN  = dtpDNDate.getValue();
        var dtGRN = dtpGRNDate.getValue();

        var diffdays = dtGRN.getTime()-dtDN.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
        if (diffdays >= 0)
           dtpDNDate.setValue(dtpGRNDate.getValue());

//alert(dtpDNDate.getValue());

		}
		 });
}
}

var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Ledger',
    width           : 170,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,

    labelStyle	: "font-size:12px;font-weight:bold;",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    enableKeyEvents: true, 
    listeners:{
         select: function () 
        { 

    //            cmbDNoteLedger.setValue(cmbPurchaseLedger.getValue());
                get_Purchase_Ledger();
        } ,  

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillQty.focus();
             }
       },
}
});


var cmbDNoteLedger = new Ext.form.ComboBox({
    fieldLabel      : 'DB Note Ledger',
    width           : 230,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbDNoteLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,

    labelStyle	: "font-size:12px;font-weight:bold;",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    enableKeyEvents: true, 
    listeners:{
         select: function () 
        { 
                get_DebitNote_Ledger();
        } ,  

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillQty.focus();
             }
       },
}
});

function calcost(){



		var Rowk= flxDetail.getStore().getCount();
        	flxDetail.getSelectionModel().selectAll();
		
		var selk=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{

//                  if (gstFlag == "Add")
//                  {      



                   pdb_costvalue =  Number(txtLandingCost.getValue());
//Number(txtGRNQty.getValue()) * Number(selk[i].get('partygrnqty'));



                   pdb_costrate =   pdb_costvalue / Number(selk[i].get('grnqty'));



                   selk[i].set('costval', Ext.util.Format.number(pdb_costvalue,'0.00'));
                   selk[i].set('costrate', Ext.util.Format.number(pdb_costrate,'0.00000'));
//                  } 

		}

}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function Refresh(){

   rounding = 0;

	txtBillQty.setValue('');
	txtMillQty.setValue('');
	txtFixedMoisPer.setValue('');
	txtMoisQty.setValue('');

	txtOtherDedQty.setValue('');
	txtFinesQty.setValue('');
//	txtdegradeqty.setValue('');
	txtTotDedQty.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');
	txtBillRate.setValue('');

txtFixedMoisPer.setValue('');

txtActualMoisPer.setValue('');
txtDiffMoisPer.setValue('');
txtMoisQty.setRawValue('');


txtFixedFinesPer.setValue('');
txtActualFinesPer.setValue('');
txtDiffFinesPer.setValue('');
txtFinesQty.setRawValue('');
txtFixedSandPer.setValue('');
txtActualSandPer.setValue('');
txtDiffSandPer.setValue('');
txtSandQty.setRawValue('');

txtOtherDedQty.setRawValue('');

txtTotDedQty.setRawValue('');

txtDegradeItem.setRawValue('');
txtDegradeRate.setRawValue('');
txtDegradeQty.setRawValue('');

txtMoisValue.setRawValue('');
txtFinesValue.setRawValue('');
txtSandValue.setRawValue('');
txtOtherDedValue.setRawValue('');
txtDegradeValue.setRawValue('');
txtDegradeDebitValue.setRawValue('');
txtBillItemValue.setRawValue('');
txtTicketWt.setRawValue('');
txtItemValue.setRawValue('');

  }

function findLandingCost()
{
	var tcs_calc =0;

        var billcgst = 0;
        var billsgst = 0;
        var billigst = 0;


        var grncgst = 0;
        var grnsgst = 0;
        var grnigst = 0;

        var grntcs =0;

        var actgrnvalue = 0;

        actgrnvalue = Number(txtGRNQty.getValue()) * Number(txtRate.getValue());
        actgrnvalue = Ext.util.Format.number(actgrnvalue, "0.00");


       txtGRNActualValue.setRawValue(Ext.util.Format.number(actgrnvalue, "0.00"));



        billcgst = (txtTotGRNValueBill.getValue() * txtCGSTPer.getValue()) / 100;
        billcgst = Math.round(billcgst * 100) / 100;
        billsgst = (txtTotGRNValueBill.getValue() * txtSGSTPer.getValue()) / 100;
        billsgst = Math.round(billsgst * 100) / 100;
        billigst = (txtTotGRNValueBill.getValue() * txtIGSTPer.getValue()) / 100;
        billigst = Math.round(billigst * 100) / 100;



        grncgst = (txtItemValue.getValue() * txtCGSTPer.getValue()) / 100;
        grncgst = Math.round(grncgst * 100) / 100;
        grnsgst = (txtItemValue.getValue() * txtSGSTPer.getValue()) / 100;
        grnsgst = Math.round(grnsgst * 100) / 100;
        grnigst = (txtItemValue.getValue() * txtIGSTPer.getValue()) / 100;
        grnigst = Math.round(grnigst * 100) / 100;


        txtCGSTDiff.setValue(Ext.util.Format.number(grncgst, "0.00"));
    	txtSGSTDiff.setValue(Ext.util.Format.number(grnsgst, "0.00"));
    	txtIGSTDiff.setValue(Ext.util.Format.number(grnigst, "0.00"));


  

        billcgst = Number(billcgst)+ Number(txtCGSTPM.getValue());
        billsgst = Number(billsgst)+ Number(txtSGSTPM.getValue());
        billigst = Number(billigst)+ Number(txtIGSTPM.getValue());




        txtCGSTValue.setValue(Ext.util.Format.number(billcgst, "0.00"));
    	txtSGSTValue.setValue(Ext.util.Format.number(billsgst, "0.00"));
    	txtIGSTValue.setValue(Ext.util.Format.number(billigst, "0.00"));

        txtPartyCGST.setValue(Ext.util.Format.number(billcgst, "0.00"));
    	txtPartySGST.setValue(Ext.util.Format.number(billsgst, "0.00"));
    	txtPartyIGST.setValue(Ext.util.Format.number(billigst, "0.00"));

/*
        var dval = Number(txtDNValue.getValue()) + Number(txtValueDiff.getValue());

        txtDNValue.setRawValue( Ext.util.Format.number(dval, "0.00"));
        txtDNValue2.setRawValue( Ext.util.Format.number(dval, "0.00"))
*/

        if (gsttaxper > 0)
        { 
		dnotecgst = (txtDNValue.getValue() * txtCGSTPer.getValue()) / 100;
		dnotecgst = Math.round(dnotecgst * 100) / 100;

		dnotesgst = (txtDNValue.getValue() * txtSGSTPer.getValue()) / 100;
		dnotesgst = Math.round(dnotesgst * 100) / 100;

		dnoteigst = (txtDNValue.getValue() * txtIGSTPer.getValue()) / 100;
		dnoteigst = Math.round(dnoteigst * 100) / 100;

        } 
        else
        {
         dnotecgst = 0;  
         dnotesgst = 0;
         dnoteigst = 0;

        }    



    
        dnoteamount = Number(txtDNValue2.getValue()) + Number(dnotecgst) + Number(dnotesgst) + Number(dnoteigst);
        var dnoteamt2 = 0;
        var dnotevalue = 0;
        dnoteamt2 =  dnoteamount.toFixed(0);
        dnotevalue = Number(dnoteamt2) - Number(dnotecgst) - Number(dnotesgst) - Number(dnoteigst);  



             txtCGSTDN.setRawValue(Ext.util.Format.number(dnotecgst, "0.00"));
             txtSGSTDN.setRawValue(Ext.util.Format.number(dnotesgst, "0.00"));
             txtIGSTDN.setRawValue(Ext.util.Format.number(dnoteigst, "0.00"));


             txtDNPartyValue.setRawValue(Ext.util.Format.number(dnoteamt2, "0.00"));
             txtDNValue2.setRawValue(Ext.util.Format.number(dnotevalue, "0.00"));

//dnoteamount



//Modified on 21/06/2024 for TCS calculation
	tcs_calc = Number(txtTotGRNValueBill.getValue()) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue();

	tcs_calc = Number(txtTotGRNValueBill.getValue()) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue()+ Number(txtCessValue.getValue()) + Number(txtHandCharges.getValue())+Number(txtHandlingcgstval.getValue()) +Number(txtHandlingsgstval.getValue());


	txtTCSValue.setRawValue(Ext.util.Format.number((txtTCSPer.getValue() * (tcs_calc / 100) ), "0"));

//	txtTotGRNQtybill.setValue(Ext.util.Format.number(tot_billqty,"0.000"));
	txttotBillValue.setValue(pdb_tot_billval);










	pdb_grn_value = Number(txtTotGRNValueBill.getValue()) + Number(txtCGSTValue.getValue()) + Number(txtSGSTValue.getValue()) + Number(txtIGSTValue.getValue())+Number(handlingval1)  + Number(txtCessValue.getValue())+Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) +Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());


//  alert(roundoff);

 
      pdb_landingcost = Number(txtTotGRNValueBill.getValue()) +Number(handlingval1)  + Number(txtCessValue.getValue()) + Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue())+Number(txtFrtValue.getValue());




       if (Number(txtDNPartyValue.getValue()) > 0 &&  Number(txtDNValue2.getValue()) > 0)
           pdb_landingcost = Number(pdb_landingcost) - Number(txtDNValue2.getValue());        




  //     txtroundoff.setValue(0);



        totgrnvalue = pdb_grn_value
//alert(totgrnvalue);
        if (roundoffNeed == "Y")     
        {         

           pdb_grn_value =  pdb_grn_value.toFixed(0) ;
           pdb_landingcost =  pdb_landingcost.toFixed(0) ;
           txtroundoff.setRawValue(Ext.util.Format.number(pdb_grn_value-totgrnvalue,"0.00"));
        }


         if (roundoffNeed == "M")  
    
	{

	     pdb_grn_value =  Number(totgrnvalue) + Number(txtroundoff.getValue());

	}


	txtLandingCost.setRawValue(Ext.util.Format.number((pdb_landingcost), "0.00"));


//	txtGRNValue.setRawValue(Ext.util.Format.number((pdb_grn_value), "0.00"));
//	txtGRNValue.setRawValue(pdb_grn_value);
        txtGRNValue.setRawValue(Ext.util.Format.number(pdb_grn_value,"0.00"));
  //      txtPartyValue.setRawValue(Ext.util.Format.number(pdb_grn_value,"0.00"));

//        billtcs  = Math.round((Number(txtPartyValue.getValue()) +amt_cgst+amt_sgst+amt_cgst) * Number(txtTCSPer.getValue())/100,0);

        if (Number(txtTCSPer.getValue()) > 0)
        {  
           billtcs  = Math.round((Number(txtPartyValue.getValue()) +billcgst+billsgst+billigst) *  Number(txtTCSPer.getValue())/100,0);

           grntcs  = Math.round((Number(txtGRNValue.getValue()) +grncgst+grnsgst+grnigst) *  Number(txtTCSPer.getValue())/100,0);
        }  
        else
        { 
          billtcs  = 0;
          grntcs  = 0;
        }  


        billcess = Math.round(Number(txtPartyValue.getValue()) * Number(txtCessPerMT.getValue()) ,0);
        grncess = Math.round(Number(txtGRNValue.getValue()) * Number(txtCessPerMT.getValue()) ,0);

        txtPartyCGST.setValue(Ext.util.Format.number(billcgst, "0.00"));
    	txtPartySGST.setValue(Ext.util.Format.number(billsgst, "0.00"));
    	txtPartyIGST.setValue(Ext.util.Format.number(billigst, "0.00"));
        txtPartyTCS.setValue(Ext.util.Format.number(billtcs,"0.00")); 
        txtPartyCess.setValue(Ext.util.Format.number(billcess,"0.00"));

        txtGRNWt.setValue(txtGRNQty.getRawValue()); 

  //      txtGRNActualValue.setRawValue(Ext.util.Format.number(grnvalue, "0.00"));
        txtGRNCGST.setValue(grncgst); 
	txtGRNSGST.setValue(grnsgst); 
	txtGRNIGST.setValue(grnigst); 
	txtGRNTCS.setValue(Ext.util.Format.number(grntcs,"0.00")); 
	txtGRNCess.setValue(Ext.util.Format.number(grncess,"0.00")); 
    //    txtgrnvalue.setRawValue(txtGRNValue.getRawValue()); 




	if (Number(txtPartyValue.getValue() ) >  Number(txtGRNActualValue.getValue()))
	{
            txtDiffValue.setValue(Ext.util.Format.number(txtPartyValue.getValue()-txtGRNActualValue.getValue(),"0.00"));
	}
	else
	{
           txtDiffValue.setValue('');
	}
                          
	if (Number(txtPartyWT.getValue() ) >  Number(txtGRNWt.getValue()))
	{
            txtDiffWt.setValue(Ext.util.Format.number(txtPartyWT.getValue()-txtGRNWt.getValue(),"0.000"));
	}
	else
	{
           txtDiffWt.setValue('');
	}


	txtDiffCGST.setValue(Ext.util.Format.number(billcgst-grncgst,"0.00"));
	txtDiffSGST.setValue(Ext.util.Format.number(billsgst-grnsgst,"0.00"));
	txtDiffIGST.setValue(Ext.util.Format.number(billigst-grnigst,"0.00"));
	txtDiffCess.setValue(Ext.util.Format.number(billcess-grncess,"0.00"));
	txtDiffTCS.setValue(Ext.util.Format.number(billtcs-grntcs,"0.00"));





calcost(); 

}

function grid_tot_acc(){
        var dr = 0;
        var cr = 0;
         txtTotDebit.setRawValue(0);
         txtTotCredit.setRawValue(0);

         txtTotDebitDN.setRawValue(0);
         txtTotCreditDN.setRawValue(0);

        var selrows = flxAccounts.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxAccounts.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));


        }

            dr = Math.round(dr * 100) / 100;
            cr = Math.round(cr * 100) / 100;


         txtTotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));

        var dr = 0;
        var cr = 0;

        selrows = flxAccountsDNOTE.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxAccountsDNOTE.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));


        }

            dr = Math.round(dr * 100) / 100;
            cr = Math.round(cr * 100) / 100;

         txtTotDebitDN.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotCreditDN.setRawValue(Ext.util.Format.number(cr,'0.00'));


}


var itemnamelist = 'Received ';

function grid_tot(){

            var chkfrepaidby;

    
	    pdb_totval = 0;
	    pdb_totedval = 0;
	    pdb_totqty = 0;
	    totgrdothrchrg = 0;
	    pdb_freightadvance = 0;
	    tot_billqty = 0;
	    pdb_tot_millqty = 0;
	    totgrnqty = 0;
	    pdb_tot_billval = 0;
	    totgrdothrchrg = 0;
	    pdb_totgrn_value2 = 0;
	    //txt_gate_entryno.Text = "";
	    pdb_unloading = 0;
	    handlingval1 =0;

            partyqty   = 0;      
            partyvalue = 0;
            grnqty     = 0;    
            
            dnoteval = 0;
            dnotecgst = 0;
            dnotesgst = 0;
            dnoteigst = 0;
            dnoteamount = 0;
               

            var Row= flxDetail.getStore().getCount();
	    flxDetail.getSelectionModel().selectAll();
            var sel=flxDetail.getSelectionModel().getSelections();
        itemnamelist = 'Received ';
/*
	    for(var i=0;i<Row;i++)
	    {

             if (itemnamelist ==  'Received ')
                 itemnamelist = itemnamelist +  sel[i].data.itemname;
              else
                 itemnamelist = itemnamelist + ' , '+ sel[i].data.itemname;



			pdb_totval = Ext.util.Format.number((Number(pdb_totval) + Number(sel[i].data.billItemvalue)), "0.00");
			totgrnqty = Ext.util.Format.number(Number(totgrnqty) + Number(sel[i].data.partygrnqty),"0.000");

			pdb_tot_millqty = Ext.util.Format.number(Number(pdb_tot_millqty) + Number(sel[i].data.millqty),"0.000");

			tot_billqty = Ext.util.Format.number(Number(tot_billqty) + Number(sel[i].data.billqty), "0.000");

			partyvalue =  pdb_totval;  Number(sel[i].data.billqty) * Number(sel[i].data.itemrate);

			dnoteval = Number(dnoteval)+  Number(sel[i].data.dnvalue2);
                      
                        dnoteamount = Number(dnoteamount)+  Number(sel[i].data.dnpartyvalue);
  
                        if (gsttaxper > 0)
                        { 
			dnotecgst = Number(dnotecgst)+  Number(sel[i].data.dncgst);
			dnotesgst = Number(dnotesgst)+  Number(sel[i].data.dnsgst);
			dnoteigst = Number(dnoteigst)+  Number(sel[i].data.dnigst);
                        txtDNValue2.setRawValue(Ext.util.Format.number(dnoteval, "0.00"));
                        } 
                        else
                        {
                         dnotecgst = 0;  
                         dnotesgst = 0;
                         dnoteigst = 0;
                         txtDNValue2.setRawValue(Ext.util.Format.number(dnoteamount, "0.00"));
                        }        


	     }

*/

	    for(var i=0;i<Row;i++)
	    {
		partyqty   = Number(partyqty)   + Number(sel[i].data.billqty);
		partyvalue = Number(partyvalue) + Number(sel[i].data.billitemvalue); 
                grnqty     = Number(grnqty) + Number(sel[i].data.grnqty); 
            }  





             txtTotGRNQtybill.setRawValue(Ext.util.Format.number(partyqty, "0.000"));
             txtTotGRNValueBill.setRawValue(Ext.util.Format.number(partyvalue, "0.00"));
             txtPartyWT.setRawValue(Ext.util.Format.number(partyqty, "0.000"));
             txtPartyValue.setRawValue(Ext.util.Format.number(partyvalue, "0.00"));

             txtDNValue2.setRawValue(txtDNValue.getRawValue() );
 



            handlingval1 = partyqty * txtHandlingPMT.getValue();
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100), "0.00" ));
            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtCessValue.setValue(Ext.util.Format.number( Number(partyqty) * txtCessPerMT.getValue(),"0.00"));

             addnlfrt  = Number(txtTotGRNQtybill.getValue()) * Number(txtFrtMT.getValue());
            txtFrtValue.setValue(addnlfrt);





/*


             txtCGSTDN.setRawValue(Ext.util.Format.number(dnotecgst, "0.00"));
             txtSGSTDN.setRawValue(Ext.util.Format.number(dnotesgst, "0.00"));
             txtIGSTDN.setRawValue(Ext.util.Format.number(dnoteigst, "0.00"));

             txtDNPartyValue.setRawValue(Ext.util.Format.number(dnoteamount, "0.00"));

             pdb_tot_billval = Number(txtBillValue.getValue());




            handlingval1 = totgrnqty * txtHandlingPMT.getValue();
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100), "0.00" ));
            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtCessValue.setValue(Ext.util.Format.number( Number(totgrnqty) * txtCessPerMT.getValue(),"0.00"));
		
             addnlfrt  = Number(totgrnqty) * Number(txtFrtMT.getValue());
            txtFrtValue.setValue(addnlfrt);

            lbl_tot_millqty = Ext.util.Format.number(pdb_tot_millqty, "0.000");
            lbl_tot_value_for_millqty = Ext.util.Format.number(pdb_tot_billval, "0.000");

            txtTotGRNValueBill = Ext.util.Format.number(pdb_totval, "0.00");
            lbl_totitemqty = Ext.util.Format.number(totgrnqty, "0.000");
	  
	

	     newtaxval = Number(lbl_tot_value_for_millqty); 

*/
    	
//alert(partyvalue);

//alert(newtaxval);
//alert(txtCGSTPer.getValue());




             //txtCGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtCGSTPer.getValue()) / 100), "0.00"));
//    	     txtSGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtSGSTPer.getValue()) / 100), "0.00"));
//    	     txtIGSTValue.setValue(Ext.util.Format.number(((newtaxval * txtIGSTPer.getValue()) / 100), "0.00"));
  


//       txtRemarksAcc.setRawValue(itemnamelist + " vide your Bill Number " + txtBillno.getRawValue() + " Dt. " +   Ext.util.Format.date(dtpBillDate.getValue(),"d-m-Y"),)  
	    

get_DebitNote_Ledger();
      findLandingCost();
    	
        flxaccupdation();

}

var roundoffNeed ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 180,
    height:100,
    defaultType : 'textfield',
    x:900,
    y:20,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoffNeed ="Y";
                 Ext.getCmp('txtroundoff').setReadOnly(true);  
                 txtroundoff.setValue('0');
                 findLandingCost();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoffNeed ="N";
                 txtroundoff.setValue('0');
                 Ext.getCmp('txtroundoff').setReadOnly(true);  
                findLandingCost();   
               }
              }
             }} ,
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoffNeed ="M";
                 Ext.getCmp('txtroundoff').setReadOnly(false); 
          
                findLandingCost(); 

               }
              }
             }} 

        ],
    },

    ],
});







function calculateItemvalue(){

   var totdedqty = 0;
   var grnqty = 0;

       totdedqty =  Number(txtMoisQty.getValue())+Number(txtFinesQty.getValue())+Number(txtSandQty.getValue()) + Number(txtOtherDedQty.getValue());

       txtTotDedQty.setRawValue(Ext.util.Format.number(totdedqty, "0.000"));
       grnqty =  Number(txtBillQty.getValue()) - Number(totdedqty) ;

       txtGRNQty.setRawValue(Ext.util.Format.number(grnqty, "0.000"));
       txtGRNWt.setRawValue(Ext.util.Format.number(grnqty, "0.000"));
       grnvalue = Number(grnqty) * Number(txtRate.getValue());
       txtItemValue.setRawValue(Ext.util.Format.number(grnvalue, "0.00"));

       txtGRNActualValue.setRawValue(Ext.util.Format.number(grnvalue, "0.00"));
}

function CalculateTax()
{


}

function validatechkgrid()
{

	Validatechk="true";
	if (cmbItemName.getValue()==0 || cmbItemName.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Item Code');
		Validatechk="false";
	}
	else if (txtRate.getValue()==0 || txtRate.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Item Rate should not be empty');
		Validatechk="false";
	}
	else if (txtBillno.getValue()==0 || txtBillno.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Bill No to be Entered');
		Validatechk="false";
	}
	else if (txtTruckNo.getValue()==0 || txtTruckNo.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Lorry No to be Entered');
		Validatechk="false";
	}

	else if (txtBillQty.getValue()==0 || txtBillQty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtBillQty.focus();
	}

	else if (txtTicketWt.getValue()==0 || txtTicketWt.getRawValue()=="" || txtGRNQty.getRawValue() == "")
	{
		Ext.Msg.alert('Fuel-GRN','Ticket Weight Should be Greater than Zero');
		Validatechk="false";
	}

	else if (Number(txtFixedMoisPer.getValue()) >  100)
	{
		Ext.Msg.alert('Fuel-GRN','Moisture % Should not be Greater than 100%');
		Validatechk="false";
	}

/*
	else if (txtBillValue.getValue()==0 || txtBillValue.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Value Should be Greater than Zero');
		Validatechk="false";
	}
*/
	else if (cmbTicketNo.getValue()==0 || cmbTicketNo.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Ticket No');
		Validatechk="false";
	}
	else if (cmbPurchaseLedger.getValue()==0 || cmbPurchaseLedger.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Purchase Ledger');
		Validatechk="false";
	}



}

var txtHandlingcgst = new Ext.form.TextField({
    fieldLabel  : 'H.CGST %',
    id          : 'txtHandlingcgst',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
    enableKeyEvents: true,
    listeners:{
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
    }
});

var txtHandlingsgst = new Ext.form.TextField({
    fieldLabel  : 'H.SGST %',
    id          : 'txtHandlingsgst',
    width       : 60,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
   enableKeyEvents: true,
    listeners:{
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
    }
});



var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 90,
    height  : 30,
    x       : 1020,
    y       : 160,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    labelStyle	: "font-size:12px;font-weight:bold;",

    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    

		validatechkgrid();


		
		if (Validatechk === "true")
		{

			flxDetail.getSelectionModel().selectAll();
		        var selrows = flxDetail.getSelectionModel().getCount();
		        var sel = flxDetail.getSelectionModel().getSelections();

		        var cnt = 0,gecnt = 0;
		        for (var i=0;i<selrows;i++)
			{

		            if (sel[i].data.geno == txtGENo.getRawValue())
			    {
		                cnt = cnt + 1;
		            }
		        }
                        var grnvalue =   Number(txtGRNQty.getRawValue())* Number(txtRate.getRawValue());
                        grnvalue =  Ext.util.Format.number(grnvalue,'0.00');
			if(gridedit === "true")
			{
				var itemseq = cmbItemName.getValue();
				//alert(cmbunloadparty.getValue());
				Ext.getCmp('cmbItemName').setDisabled(false);

				var idx = flxDetail.getStore().indexOf(editrow);

				sel[idx].set('itemcode', cmbItemName.getValue());
				sel[idx].set('itemname', cmbItemName.getRawValue());
			
				sel[idx].set('billqty', txtBillQty.getRawValue());
				sel[idx].set('billrate', txtBillRate.getRawValue());
				sel[idx].set('billitemvalue', txtBillItemValue.getRawValue());
				

				sel[idx].set('ticketwt', txtTicketWt.getValue());
				sel[idx].set('itemrate', txtRate.getValue());
				sel[idx].set('itemvalue',txtItemValue.getValue());


				sel[idx].set('grnqty', txtGRNQty.getValue());
				sel[idx].set('grnvalue',txtItemValue.getValue());


				sel[idx].set('fixedMois', txtFixedMoisPer.getRawValue());
				sel[idx].set('actualMois', txtActualMoisPer.getRawValue());
				sel[idx].set('ExMoisper', txtFixedMoisPer.getRawValue());
				sel[idx].set('moisqty', txtMoisQty.getRawValue());	



				sel[idx].set('fixedfines', txtFixedFinesPer.getRawValue());
				sel[idx].set('actualfines', txtActualFinesPer.getRawValue());
				sel[idx].set('Exfines', txtDiffFinesPer.getValue());
				sel[idx].set('finesqty', txtFinesQty.getValue());

	
				sel[idx].set('fixedsand', txtFixedSandPer.getValue());
				sel[idx].set('actualsand', txtActualSandPer.getValue());
				sel[idx].set('Exsand', txtDiffSandPer.getValue());
				sel[idx].set('sandqty', txtSandQty.getRawValue());

				sel[idx].set('othdedqty', txtOtherDedQty.getValue());

	             		sel[idx].set('totdedqty', txtTotDedQty.getValue());
	             		sel[idx].set('dnvalue', txtDNValue.getValue());
				sel[idx].set('partygrnqty', txtGRNQty.getValue());
     
				sel[idx].set('moisvalue', txtMoisValue.getValue());
	             		sel[idx].set('finesvalue', txtFinesValue.getValue());
	             		sel[idx].set('sandvalue', txtSandValue.getValue());
				sel[idx].set('othdedvalue', othdedvalue);
     
				sel[idx].set('degitemname', txtDegradeItem.getValue());
	             		sel[idx].set('degitem', degitemcode);
	             		sel[idx].set('degrate', txtDegradeRate.getValue());	
				sel[idx].set('degqty', txtDegradeQty.getValue());
	             		sel[idx].set('degvalue', txtDegradeDebitValue.getValue());


	             		sel[idx].set('remarks',remarks);

				sel[idx].set('remarksmois', moisremarks);
	             		sel[idx].set('remarksfines', finesremarks);
	             		sel[idx].set('remarkssand', sandremarks);
	             		sel[idx].set('remarksotherded', othdedremarks);



                                Refresh();
                                grid_tot();
				//if(fareacode > 0) {  }


				//flxDetail.getSelectionModel().clearSelections();
				gridedit = "false";
				

			}//if(gridedit === "true")var 
			else{
				if (cnt ==0)
				{
				 
		           	 	var RowCnt = flxDetail.getStore().getCount() + 1;
		            		flxDetail.getStore().insert(
		                	flxDetail.getStore().getCount(),
		               		new dgrecord({
				            	slno:RowCnt,

						itemcode    :  cmbItemName.getValue(),
				            	itemname    :  cmbItemName.getRawValue(),
					    	billqty	    :  txtBillQty.getRawValue(),
                  				billrate    :  txtBillRate.getRawValue(),
		                		billitemvalue :  txtBillItemValue.getRawValue(),

						ticketwt    :  txtTicketWt.getRawValue(),
                  				itemrate    :  txtRate.getRawValue(),
		                		itemvalue   :  txtItemValue.getRawValue(),
                         			grnqty      :  txtGRNQty.getRawValue(),
                         			grnvalue    :  grnvalue,
						fixedMois   :  txtFixedMoisPer.getRawValue(),
                                                actualMois  :  txtFixedMoisPer.getRawValue(),
                                                ExMoisper   :  txtDiffMoisPer.getRawValue(),
						moisqty	    :  txtMoisQty.getRawValue(),
						fixedfines  :  txtFixedFinesPer.getRawValue(),
						actualfines :  txtActualFinesPer.getRawValue(),
						Exfines     :  txtDiffFinesPer.getRawValue(),
						finesqty    :  txtFinesQty.getValue(),  

						fixedsand   :  txtFixedSandPer.getRawValue(),
						actualsand  :  txtActualSandPer.getRawValue(),
						Exsand      :  txtDiffSandPer.getRawValue(),
						sandqty     :  txtSandQty.getRawValue(),

				        	moisvalue  : txtMoisValue.getRawValue(),
				        	finesvalue : txtFinesValue.getRawValue(),
				                sandvalue  : txtSandValue.getRawValue(),
				                othdedvalue : othdedvalue,

                                                degitemname : txtDegradeItem.getRawValue(),
				                degitem     : degitemcode,
                        	                degrate     : txtDegradeRate.getRawValue(),
                                                degqty      : txtDegradeQty.getRawValue(),
                                                degvalue    : txtDegradeDebitValue.getRawValue(),

                                                remarks        : remarks,
						remarksqtydiff : '',
						remarksmois    : moisremarks,
						remarksfines   : finesremarks,
						remarkssand     : sandremarks,
						remarksotherded : othdedremarks,

                                othdedqty  : otherdedqty,
				totdedqty  : dedqty,
         


/*
				remarks: remarks,

		
	
				costval: loadgrneddtdatastore.getAt(i).get('rect_costvalue'),
                        	costrate: loadgrneddtdatastore.getAt(i).get('rect_costrate'),

                                degitemname :  loadgrneddtdatastore.getAt(i).get('deg_item_name'),
				degitem : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_item'),
                        	degrate : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate'),				
                        	degqty     : degqty,
                                degvalue   : degval,
                        	moisvalue  : moisval,
                                finesrate  : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_rate'),
                        	finesvalue : finesval,
                                sandvalue  : sandval,
                                othdedvalue : othdedvalue,
                                dnvalue2    : dnvalue,
                                dncgst      : dncgst,  
                                dnsgst      : dnsgst,  
                                dnigst      : dnigst,  
                                dnpartyvalue : dnparty,  
                                remarksmois : moisremarks,
                                remarksfines : finesremarks,
                                remarkssand : sandremarks,
                                remarksotherded : othdedremarks,
*/

			                }) 
			                );

	
  //                                      Refresh();
grid_tot();  
					//if(fareacode > 0) {  }

				}//if cnt==0
				else
				{

					if(cnt == 1){
						alert("Gate Entry Number already selected");
					}
					else if(gecnt == 1){
						alert("Gate Entry Number already selected");
					}
			
				}//else cnt=0
			}//else(gridedit === "true")
		}//if (Validatechk === "true")

            }
}
});


  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtpGRNDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >40)
        {     
             alert("You are Not Allowed to Raise the GRN in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtpGRNDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the GRN in Future date");
             dtpGRNDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please Change the Fin Year");
    }

    else if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please change the Fin Year");
    }

if (gstFlag == "Add")
{

	loadDNDateDatastore.removeAll();
	loadDNDateDatastore.load({
        	 url:'ClsFuGrn.php',
        	 params:
       		 {
         	 task:"LoadDNDate",
		 finid    : GinFinid,
		 compcode : Gincompcode,
                 gsttype  : dngsttype,  
        	 },
		callback:function()
		{

                  if(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate'),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d"))
                  {  
                     dtpDNDate.setValue(Ext.util.Format.date(finenddate),'d-m-Y');
                  } 
                  else
 
                  {
                     dtpDNDate.setValue(Ext.util.Format.date(loadDNDateDatastore.getAt(0).get('dnmaxdate')),'d-m-Y'); 
                  } 

        var dtDN  = dtpDNDate.getValue();
        var dtGRN = dtpGRNDate.getValue();

        var diffdays = dtGRN.getTime()-dtDN.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
        if (diffdays >= 0)
           dtpDNDate.setValue(dtpGRNDate.getValue());


		}
		 });


}

 }


var dtpGRNDate = new Ext.form.DateField({
    fieldLabel : 'GRN. Date',
    id         : 'dtpGRNDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
    width : 100,

    readOnly: true,
    editable: false, 
    onTriggerClick: function() {
        // override to disable date picker
        return false;
    },

    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplierName.focus();
             }
       },
           change:function(){
              datecheck();
           },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            }
    }
});


var dtpTicketDate = new Ext.form.DateField({
    fieldLabel : 'Ticket. Date',
    id         : 'dtpTicketDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",  
 enableKeyEvents: true,   
//    anchor     : '100%',
    width : 100,
//	disabled:true,    
    readOnly: true,
    listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
            change:function(){
         
  
 

	
            }
    }
});

var dtpGEDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpGEDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
//    anchor     : '100%',
    width : 100,
enableKeyEvents: true, 
    //readOnly: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTruckNo.focus();
             }
       },
            change:function(){
           /*     duedateval=this.getValue();loadgrnpo
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);*/
            }
    }
});

var cmbItemName = new Ext.form.ComboBox({
        fieldLabel      : 'Item',
        width           : 290,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
        typeAhead       : true,
        mode            : 'local',
        store           : loaditempodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
        listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurchaseLedger.focus();
             }
       },
	select : function(){

		loaditemqtydatastore.removeAll();
		loaditemqtydatastore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loaditemqty",
		    itemcode : cmbItemName.getValue(),
		    ordcode : cmbPONO.getValue(),
		    gstFlag : gstFlag
		},
		scope : this,
		callback:function()
		{

                        cmbPurchaseLedger.setValue(loaditemqtydatastore.getAt(0).get('ordt_purgrp'));
			loadfilldtstore.removeAll();
			loadfilldtstore.load({
			url : 'ClsFuGrn.php',
			params : 
			{
				task : "loadfilldt",
				qrycode: "GRN",
				grnno:  cmbGRNNo.getValue(),
				itemcode: cmbItemName.getValue()
			},
			
			callback : function()
			{

				var fillcnt;
				fillcnt =   loadfilldtstore.getCount();

				if (fillcnt > 0 )//&& (!loadfilldtstore.getAt(0).get('rect_grnqty') == "null"))
				{

				if (loadfilldtstore.getAt(0).get('rect_grnqty') !== null) {
					pdb_grnqty = loadfilldtstore.getAt(0).get('rect_grnqty');
				}

				}
				//pdb_grnqty = Number(Ext.isEmpty(loadfilldtstore.getAt(0).get('rect_grnqty') ? 0 : loadfilldtstore.getAt(0).get('rect_grnqty')) );

			var toleranceallqty = Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('tol_all_qty')), "0.000");
			
			txtFixedMoisPer.setValue(Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000"));
			moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
                        txtRate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
			calculateItemvalue();
				
/*
			loadfilldtstore.removeAll();

			loadfilldtstore.load({
			url : 'ClsFuGrn.php',
			params : 
			{
				task : "loadfilldt",
				qrycode: "RATE",
				grnno:  cmbPONO.getValue(),
				itemcode: cmbItemName.getValue(),
				billdate: Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
			},
			
			callback : function()
			{
				var fillcnt;
				fillcnt =   loadfilldtstore.getCount();

				if (fillcnt > 0 )//&& (!loadfilldtstore.getAt(0).get('amnt_unit_rate') == "null"))
				{
				
					//pdb_itemrate = Number(Ext.isEmpty(loadfilldtstore.getAt(0).get('amnt_unit_rate') ? 0 : loadfilldtstore.getAt(0).get('amnt_unit_rate')) );
					//pdb_itemrate = loadfilldtstore.getAt(0).get('amnt_unit_rate');
					if((cmbPONO.getRawValue().charAt(2)) == "A"){
						txtRate.setValue(Ext.util.Format.number(loadfilldtstore.getAt(0).get('amnt_unit_rate'), "0.00"));
					}
					else{
						txtRate.setValue(Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('ordt_unit_rate')), "0.00"));
					}
				}
			}
			});
*/

			}
			});



			
		}
	    	});
	}
        
	}
   });


 var frtype="0";


var cmbPONO = new Ext.form.ComboBox({
    fieldLabel      : 'Order No',
    width           : 150,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : '',
    id              : 'cmbPONO',
    typeAhead       : true,
    mode            : 'local',
    store           : loadordnodatastore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    //tabindex	    : 0,
    allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    

    listeners:{

 		specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbArea.focus();
             }
       },

 select: function(){

                        poseqno = cmbPONO.getValue();  	

			loaditempodatastore.removeAll();
			    loaditempodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditempo",
				    ordcode: cmbPONO.getValue()
				}
			    });

/*
			loadfreighttondatastore.removeAll();
			loadfreighttondatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightton",
				    suplrcode :txtSupplierName.getValue()
				}
			});
			loadfreightloddatastore.removeAll();
			loadfreightloddatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadfreightlod",
				    suplrcode :txtSupplierName.getValue()
				}
			});

*/
			loadgrnpodatastore.removeAll();
			loadgrnpodatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadgrnpo",
				 ordcode : cmbPONO.getValue()
                        	 },

			callback : function()
			{
				var grnpocount;
                   		grnpocount=0;
                   		grnpocount=loadgrnpodatastore.getCount();

				dtpBillDate.setValue(new Date(loadgrnpodatastore.getAt(0).get('ordh_date')));
				FrePaidby = loadgrnpodatastore.getAt(0).get('ordh_frttype');
//Ext.getCmp('optfrtype').setValue(loadgrnpodatastore.getAt(0).get('ordh_frttype'));




                          	txtPayTerms.setValue(loadgrnpodatastore.getAt(0).get('ordh_creditdays'));
				txtCGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_cgstper'));
				txtSGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_sgstper'));
				txtIGSTPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_igstper'));
				

				txtTCSPer.setValue(loadgrnpodatastore.getAt(0).get('ordh_tcs'));

				moistol = loadgrnpodatastore.getAt(0).get('ordh_mois_tol');	
				txtCessPerMT.setValue(Ext.isEmpty(loadgrnpodatastore.getAt(0).get('ordh_cess_pmt')) ? 0 : loadgrnpodatastore.getAt(0).get('ordh_cess_pmt'));
				txtHandlingPMT.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_mt'));
				txtHandlingcgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrnpodatastore.getAt(0).get('ordh_handling_sgstper'));
																


			}
				 
			});


	},


	}
   });
  
var txtSupplierName = new Ext.form.TextField({
    fieldLabel  : 'Supplier Name',
    id          : 'txtSupplieName',
    width       : 280,
    name        : 'txtSupplierName',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true,
    readOnly   : true,

    listeners:{

     }
});


function getGRNDetails()
{
	Ext.getCmp('save').setDisabled(true);
	tabgrn.setActiveTab(0);

        flxDetail.getStore().removeAll();
	loadgrneddtdatastore.removeAll();
	loadgrneddtdatastore.load({
		url:'ClsFuGrn.php',
		params:
		{
		task:"loadGrnQcCombine",
		finid : GinFinid,
		compcode : Gincompcode,
		grnno : cmbGRNNo.getValue()
		},
		callback:function()
		{

  txtLandingCost.setValue(0);
  txtGRNQty.setValue(0);


                       	var RowCnt = loadgrneddtdatastore.getCount();

			if ((loadgrneddtdatastore.getCount()) == 0){
				Ext.Msg.alert('Fuel-GRN','Receipt Details not Found');
			}
			else{


                      if (loadgrneddtdatastore.getAt(0).get('rech_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else
                           Ext.getCmp("optRounding").setValue(2);


                             if (loadgrneddtdatastore.getAt(0).get('rech_grn_status') == 'P')
                             {
                                 Ext.getCmp('opt_GRN_Status').setValue(2);
                                 grn_status = "P";
                                 Ext.getCmp('opt_GRN_Status').setDisabled(false);
                             }
                             else
                             {
                                 Ext.getCmp('opt_GRN_Status').setValue(1);
                                 grn_status = "C";
                                 Ext.getCmp('opt_GRN_Status').setDisabled(true);

                             }  



/*
			loadGSTDatastore.removeAll();
			loadGSTDatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadGST",
				    taxcode : loadgrneddtdatastore.getAt(0).get('rech_purgrp'),

				},
				callback : function() {
		                    var cnt = loadGSTDatastore.getCount();
		                    if (cnt > 0) {

//suptype = loadgrneddtdatastore.getAt(0).get('sup_type');

//alert(loadgrneddtdatastore.getAt(0).get('sup_type')); 
                                        if (suptype == 24)
                                        {  
					txtCGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_cgstper'));
					txtSGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_sgstper'));
					txtIGSTPer.setValue(0);
                                        }   

                                        else 
                                        {  
					txtCGSTPer.setValue(0);
					txtSGSTPer.setValue(0);
					txtIGSTPer.setValue(loadGSTDatastore.getAt(0).get('tax_igstper'));
                                        }   


				          cgstledcode = loadGSTDatastore.getAt(0).get('tax_cgstledcode');
				          sgstledcode = loadGSTDatastore.getAt(0).get('tax_sgstledcode');
				          igstledcode = loadGSTDatastore.getAt(0).get('tax_igstledcode');
				          cgstledger  = loadGSTDatastore.getAt(0).get('tax_cgstledger');
				          sgstledger  = loadGSTDatastore.getAt(0).get('tax_sgstledger');
				          igstledger  = loadGSTDatastore.getAt(0).get('tax_igstledger');
                                    }
                                }
			});
*/
               
			
                                        if (suptype == 24)
                                        {  
					txtCGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_cgstper'));
					txtSGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_sgstper'));
					txtIGSTPer.setValue(0);
                                        }   

                                        else 
                                        {  
					txtCGSTPer.setValue(0);
					txtSGSTPer.setValue(0);
					txtIGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_igstper'));
                                        }   



				          cgstledcode = loadgrneddtdatastore.getAt(0).get('tax_cgstledcode');
				          sgstledcode = loadgrneddtdatastore.getAt(0).get('tax_sgstledcode');
				          igstledcode = loadgrneddtdatastore.getAt(0).get('tax_igstledcode');
				          cgstledger  = loadgrneddtdatastore.getAt(0).get('tax_cgstledger');
				          sgstledger  = loadgrneddtdatastore.getAt(0).get('tax_sgstledger');
				          igstledger  = loadgrneddtdatastore.getAt(0).get('tax_igstledger');



                        seqno = loadgrneddtdatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');

                        hsncode  = loadgrneddtdatastore.getAt(0).get('itmh_hsncode');

                        accseqno = loadgrneddtdatastore.getAt(0).get('rech_acc_seqno');
                        dnaccseqno = loadgrneddtdatastore.getAt(0).get('rech_dnaccseqno');
                        dnseqno = loadgrneddtdatastore.getAt(0).get('rech_dnseqno');

                        txtPayTerms.setValue(loadgrneddtdatastore.getAt(0).get('rech_crdays'));

                	txtDNVouNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_dnno'));




			dtpGRNDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
			dtpDNDate.setValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_dndate'),'d-m-Y'));


			dtVouDate.setValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
		        dtpTicketDate.setRawValue(loadgrneddtdatastore.getAt(0).get('qc_fuel_ticketdate'));
                               

                	suptype = loadgrneddtdatastore.getAt(0).get('cust_state');


                	supcode = loadgrneddtdatastore.getAt(0).get('rech_sup_code');

			txtSupplierName.setRawValue(loadgrneddtdatastore.getAt(0).get('cust_ref'));

                        ledgercode = loadgrneddtdatastore.getAt(0).get('rech_sup_code');

                        txtQCNo.setValue(loadgrneddtdatastore.getAt(0).get('qc_fuel_entryno'));
                        cmbTicketNo.setValue(loadgrneddtdatastore.getAt(0).get('qc_fuel_ticketno'));
			txtBillno.setValue(loadgrneddtdatastore.getAt(0).get('rech_billno'));
			dtpBillDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_billdate'),'d-m-Y'));       
			txtBillValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));
			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtTruckNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_truckno'));        
                        cmbPurchaseLedger.setValue(loadgrneddtdatastore.getAt(0).get('rech_purgrp')); 

                        cmbDNoteLedger.setValue(loadgrneddtdatastore.getAt(0).get('rech_dn_purledger')); 


                        cmbArea.setValue(loadgrneddtdatastore.getAt(0).get('rech_area_code')); 
                        grnitemcode = loadgrneddtdatastore.getAt(0).get('rect_item_code'),


                        txtFrtMT.setRawValue('');
                        if (grnitemcode == 23)
                        {

                           txtFrtMT.setValue('490.00');
                           txtFrtMT.setRawValue('490.00');
                        }
                     

                        txtGRNNo.setValue(cmbGRNNo.getRawValue());
	                for (var i=0;i<RowCnt;i++)
			{






                        moisqtyded  = loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_qty')/1000;
                        sandqtyded  = loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_qty')/1000;
                        finesqtyded = loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_qty')/1000;

                        otherdedqty = loadgrneddtdatastore.getAt(i).get('qc_fuel_otherdedqty')/1000;


                        moisqtyded =  Ext.util.Format.number(moisqtyded, "0.000");
                        sandqtyded =  Ext.util.Format.number(sandqtyded, "0.000");
                        finesqtyded =  Ext.util.Format.number(finesqtyded, "0.000");
                        otherdedqty =  Ext.util.Format.number(otherdedqty, "0.000");

   
                        dedqty = Number(moisqtyded)+Number(sandqtyded)+Number(finesqtyded)+Number(otherdedqty);

                        if (loadgrneddtdatastore.getAt(0).get('qc_fuel_total_ded_qty') > 0)
                           dedqty = loadgrneddtdatastore.getAt(0).get('qc_fuel_total_ded_qty')/1000; 
                        else
                           dedqty = 0;
                        dedqty =  Ext.util.Format.number(dedqty, "0.000");

                        grnqty = Number(loadgrneddtdatastore.getAt(i).get('rect_grnqty'));

                        millgrnqty = Number(loadgrneddtdatastore.getAt(i).get('rect_grnqty'))- Number(dedqty);


                        grnqty =  Ext.util.Format.number(grnqty, "0.000");
                        millgrnqty =  Ext.util.Format.number(millgrnqty, "0.000");

                    //    debitvalue =  Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_debitamount'));

                        grnvalue = Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate'))* Number(grnqty)


                        grnvalue = Math.round(grnvalue * 100) / 100;
                        grnvalue =  Ext.util.Format.number(grnvalue, "0.00");
                        
                        lotcode = loadgrneddtdatastore.getAt(i).get('rect_lotno')




                        if (Number(moisqtyded) > 0)
                        {
                           remarks = "Qty " + moisqtyded + " Kgs Deducted due to Ex-Mois % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_diff');
                           moisremarks =  moisqtyded + " Kgs Deducted due to Ex-Mois % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_diff');

                        }    
                        if (Number(finesqtyded) > 0)
                        {   
                           remarks = remarks +  " Qty " + finesqtyded + " Kgs Deducted due to Ex-Fines % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_diff');
                           finesremarks = finesqtyded + " Kgs Deducted due to Ex-Fines % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_diff');

                        } 
                        if (Number(sandqtyded) > 0)
                        {                    
                           remarks = remarks +  " Qty " + sandqtyded + " Deducted due to Ex-Sand % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_diff');
                           sandremarks =  sandqtyded + " Kgs Deducted due to Ex-Sand % " +loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_diff');
                        }

                        if (Number(otherdedqty) > 0)
                        {                    
                           remarks = remarks +  " Other Deduction Qty " + otherdedqty;           
                           othdedremarks =  " Other Deduction Qty " + otherdedqty + " Kgs";
                        }




                        var degval = 0;
                        var degqty = 0;

                        if ( Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate')) >0 && Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty')) > 0) 
                        {
                            degval =  (Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate')) - Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate'))) * Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty'))/1000;
                            degqty = Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_qty'))/1000;

                        }


                        moisval =    Number(moisqtyded) * Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate')) ;
                        finesval =    Number(finesqtyded) * Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_rate')) ;
                        sandval =    Number(sandqtyded) * Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate')) ;

                        othdedvalue = Number(otherdedqty)* Number(loadgrneddtdatastore.getAt(i).get('rect_itemrate')) ;

                        moisval =  Ext.util.Format.number(moisval, "0.00");
                        finesval =  Ext.util.Format.number(finesval, "0.00");
                        sandval =  Ext.util.Format.number(sandval, "0.00");        
                        othdedvalue =  Ext.util.Format.number(othdedvalue, "0.00");        

                        debitvalue = Number(moisval) + Number(finesval) + Number(sandval) + Number(othdedvalue) + Number(degval);

//                        debitvalue = (Math.round(debitvalue * 100) / 100).toFixed(0) ;
                        debitvalue = Ext.util.Format.number(debitvalue, "0.00");

                        dnvalue = Ext.util.Format.number(debitvalue, "0.00");
                        var dncgst = 0;
                        var dnsgst = 0;
                        var dnigst = 0;
                        var dnparty = 0;




                        if (Number(dnvalue) > 0 && Number(loadgrneddtdatastore.getAt(0).get('tax_cgstper')) > 0)
                           dncgst =    Number(dnvalue)  * Number(loadgrneddtdatastore.getAt(0).get('tax_cgstper'))/100

                        if (Number(dnvalue) > 0 && Number(loadgrneddtdatastore.getAt(0).get('tax_sgstper')) > 0)
                           dnsgst =    Number(dnvalue)  * Number(loadgrneddtdatastore.getAt(0).get('tax_cgstper'))/100

                        if (Number(dnvalue) > 0 && Number(loadgrneddtdatastore.getAt(0).get('tax_igstper')) > 0)
                           dnigst =    Number(dnvalue)  * Number(loadgrneddtdatastore.getAt(0).get('tax_igstper'))/100

                        dncgst = Ext.util.Format.number(dncgst, "0.00");
                        dnsgst = Ext.util.Format.number(dnsgst, "0.00");
                        dnigst = Ext.util.Format.number(dnigst, "0.00");

                        dnparty = Number(dnvalue)+Number(dncgst)+Number(dnsgst)+Number(dnigst);
                        dnparty = (Math.round(dnparty * 100) / 100).toFixed(0) ;

                        dnvalue =  Number(dnparty)-Number(dncgst)-Number(dnsgst)-Number(dnigst);



			flxDetail.getStore().insert(
			flxDetail.getStore().getCount(),
			new dgrecord({
				slno:i + 1,
				itemcode  : loadgrneddtdatastore.getAt(i).get('rect_item_code'),
            			itemname  : loadgrneddtdatastore.getAt(i).get('itmh_name'),
			    	billqty   : loadgrneddtdatastore.getAt(i).get('rect_billqty'),

				billrate   : loadgrneddtdatastore.getAt(i).get('rect_billrate'),
				billitemvalue   : loadgrneddtdatastore.getAt(i).get('rect_billvalue'),
				ticketwt   : loadgrneddtdatastore.getAt(i).get('rect_millqty'),

                                grnqty   : loadgrneddtdatastore.getAt(i).get('rect_grnqty'),
                                grnvalue : loadgrneddtdatastore.getAt(i).get('rect_itemvalue'),


				fixedMois : loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_fixed'),
				actualMois: loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_actual'),
				ExMoisper : loadgrneddtdatastore.getAt(i).get('qc_fuel_mois_arb_diff'),
				moisqty   : moisqtyded,

				fixedfines : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_fixed'),
				actualfines: loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_actual'),
				Exfines    : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_diff'),
				finesqty   : finesqtyded,

				fixedsand  : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_fixed'),
				actualsand : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_actual'),
				Exsand     : loadgrneddtdatastore.getAt(i).get('qc_fuel_sand_diff'),

                                cgstpm      : loadgrneddtdatastore.getAt(i).get('rech_cgst_pm'),
                                sgstpm      : loadgrneddtdatastore.getAt(i).get('rech_sgst_pm'),
                                igstpm      : loadgrneddtdatastore.getAt(i).get('rech_igst_pm'),

                                costval     : loadgrneddtdatastore.getAt(i).get('rect_costvalue'),
                                costrate    : loadgrneddtdatastore.getAt(i).get('rect_costrate'),

        

				sandqty    : sandqtyded,
                                othdedqty  : otherdedqty,
				totdedqty  : dedqty,
                                dnvalue    : debitvalue, 
				partygrnqty: grnqty,
				millgrnqty : millgrnqty,
				itemrate: loadgrneddtdatastore.getAt(i).get('rect_itemrate'),
				itemvalue: grnvalue,
				remarks: remarks,



                                degitemname :  loadgrneddtdatastore.getAt(i).get('degrade_itemname'),
				degitem : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_item'),
                        	degrate : loadgrneddtdatastore.getAt(i).get('qc_fuel_degrade_rate'),				
                        	degqty     : degqty,
                                degvalue   : degval,
                        	moisvalue  : moisval,
                                finesrate  : loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_rate'),
                        	finesvalue : finesval,
                                sandvalue  : sandval,
                                othdedvalue : othdedvalue,
                                dnvalue2    : dnvalue,
                                dncgst      : dncgst,  
                                dnsgst      : dnsgst,  
                                dnigst      : dnigst,  
                                dnpartyvalue : dnparty,  
                                remarksmois : moisremarks,
                                remarksfines : finesremarks,
                                remarkssand : sandremarks,
                                remarksotherded : othdedremarks,
				}) 
				);   

                                get_Purchase_Ledger();




                        }
  




			loadordnodatastore.removeAll();
			loadordnodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadordno",
				    compcode : Gincompcode,
				    finid : GinFinid,
				    supcode : loadgrneddtdatastore.getAt(0).get('rech_sup_code'),
				    gstFlag : gstFlag
				},
				callback : function() {
                                        cmbPONO.setValue(loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno')); 



                                }
			});


			edpono = loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
                 	txtOtherChrges.setValue(loadgrneddtdatastore.getAt(0).get('rech_othcharges'));



			txtCGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_cgst_per'));
			txtSGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_sgst_per'));
			txtIGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('rech_igst_per'));
			
	
						
			txtIGSTValue.setDisabled(true);
			txtTCSPer.setRawValue(loadgrneddtdatastore.getAt(0).get('rech_tcs_per'));
			txtTCSValue.setDisabled(true);
			txtCessPerMT.setValue(loadgrneddtdatastore.getAt(0).get('rech_cess_pmt'));
                        txtCessValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_cess_amount'));


//	
			moistol =  loadgrneddtdatastore.getAt(0).get('ordh_mois_tol');
				txtHandlingPMT.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_pmt'));
				txtHandlingcgst.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_cgstper'));
				txtHandlingsgst.setValue(loadgrneddtdatastore.getAt(0).get('rech_handling_sgstper'));				
			edsuptype = loadgrneddtdatastore.getAt(0).get('sup_type');
			edacctflag = loadgrneddtdatastore.getAt(0).get('rech_acctflag');


				loaditempodatastore.removeAll();
				    loaditempodatastore.load({
					url: 'ClsFuGrn.php',
					params:
					{
					    task:"loaditempo",
					    ordcode: edpono
					}
				    });

	//		}//else

                        }  
//alert(edacctflag);



                      grid_tot();
/*

			if(edacctflag == "Y"){
				Ext.getCmp('save').setDisabled(true);
				Ext.Msg.alert('Fuel-GRN','Sorry!!! A/C Updatation has been done.\n U can view the data, Edit Option not Allowed');
				//Ext.getCmp('save').setDisabled(false);Ext.getCmp('Confirm').setDisabled(false);
			}
			else{
				Ext.getCmp('save').setDisabled(false);
			}
*/


 	//	Ext.getCmp('save').setDisabled(true);

		}


	});
grid_tot();
	

    }


var cmbGRNNo = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        labelStyle	: "font-size:12px;font-weight:bold;",
       style      :"border-radius: 5px; ",
        width           : 100,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        hiddenName      : '',
        id              : 'cmbGRNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadgrnnodatastore,
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,        
        listeners:{
        select:function(){
  Ext.getCmp('tab2').setDisabled(true);  
  Ext.getCmp('tab3').setDisabled(true); 
             getGRNDetails();
        } 
        }
   });

/*
 var txtBillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtBillno',
        name        : 'txtBillno',
        width       :  100,

        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	

    });

*/
var txtBillno = new Ext.form.TextField({
        fieldLabel  : 'Party Bill No',
        id          : 'txtBillno',
        name        : 'txtBillno',
        width       :  150,
        
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px;  textTransform: uppercase ", 
	enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpBillDate.focus();
             }
           },
	     blur:function()
		{
                 grid_tot();   
		},


    }
});


var dtpBillDate = new Ext.form.DateField({
    fieldLabel : 'Party Bill Date',
    id         : 'dtpBillDate',
    name       : 'PBilldate',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
enableKeyEvents: true,   
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillValue.focus();
             }
          },
	     blur:function()
		{
                 grid_tot();   
		},
    }
       
});





 var txtTruckNo = new Ext.form.TextField({
        fieldLabel  : 'Lorry No',
        id          : 'txtTruckNo',
        name        : 'txtTruckNo',
        width       :  100,
	border : true,
       // style       :  {border-radius:5},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
 enableKeyEvents: true,   
	tabindex : 1,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbTicketNo.focus();
             }
       },
    }
	
    });


 var txtFixedFinesPer = new Ext.form.NumberField({
        fieldLabel  : 'Fines % ',
        id          : 'txtFixedFinesPer',
        name        : 'txtFixedFinesPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtActualFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualFinesPer',
        name        : 'txtActualFinesPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtDiffFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffFinesPer',
        name        : 'txtDiffFinesPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });


function find_item_value()
{
     var ivalue = 0;
     var ivalue2 = 0;


       ivalue = Number(txtTicketWt.getValue()) * Number(txtRate.getValue());
       txtItemValue.setRawValue(Ext.util.Format.number( ivalue,'0.00'));

       ivalue2 = Number(txtBillQty.getValue()) * Number(txtBillRate.getValue());
       txtBillItemValue.setRawValue(Ext.util.Format.number( ivalue2,'0.00'));


	var qtydiff = Number(txtBillQty.getValue())- Number(txtTicketWt.getValue());
        if (qtydiff < 0)
            qtydiff = 0;  
	var valuediff = Number(qtydiff) * Number(txtRate.getValue());

	txtQtyDiff.setRawValue(Ext.util.Format.number(qtydiff, "0.000"));
	txtValueDiff.setRawValue(Ext.util.Format.number(valuediff, "0.00"));


        debitvalue = Number(txtMoisValue.getValue()) + Number(txtFinesValue.getValue()) + Number(txtSandValue.getValue()) + Number(txtOtherDedValue.getValue()) + Number(txtDegradeValue.getValue()) + Number(txtDegradeDebitValue.getValue())  + Number(valuediff);


        txtDNValue.setRawValue( Ext.util.Format.number(debitvalue, "0.00"));
        txtDNValue2.setRawValue( Ext.util.Format.number(debitvalue, "0.00"));

        var tdqty = Number(txtMoisQty.getValue())+ Number(txtFinesQty.getValue())+Number(txtSandQty.getValue()) + Number(txtOtherDedQty.getValue()) + Number(txtDegradeQty.getValue()) + Number(txtQtyDiff.getValue());

        
        txtTotDedQty.setRawValue(Ext.util.Format.number(tdqty, "0.000"));


}

var txtFinesQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFinesQty',
        name        : 'txtFinesQty',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtFinesQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtFinesQty.focus();
			txtFinesQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });



 var txtFixedSandPer = new Ext.form.NumberField({
        fieldLabel  : 'Sand % ',
        id          : 'txtFixedSandPer',
        name        : 'txtFixedSandPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtActualSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualSandPer',
        name        : 'txtActualSandPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });

 var txtDiffSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSandPer',
        name        : 'txtDiffSandPer',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
    
             }
       },
	keyup : function () {

	}
	}
    });



var txtSandQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSandQty',
        name        : 'txtSandQty',
        width       :  60,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true,
        decimalPrecision: 3, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtFinesQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtFinesQty.focus();
			txtFinesQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });

   var txtRemarksAcc = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarksAcc',
        width       : 700,
        height      : 40,

   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtRemarks',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
}
   });

   var txtRemarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        width       : 700,
        height      : 40,

   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtRemarks',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
}
   });


/*var cmbGIENo = new Ext.form.ComboBox({
        fieldLabel      : 'Gate Inward Entry No.',
        width           : 100,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbGIENo',
        typeAhead       : true,
        mode            : 'local',
        store           : [],
       // forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true
   });*/
var txtGENo = new Ext.form.TextField({
        fieldLabel  : 'Gate Entry No.',
        id          : 'txtGENo',
        name        : 'txtGENo',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpGEDate.focus();
             }
       },
    }
    });

var cmbTicketNo = new Ext.form.ComboBox({
        fieldLabel      : 'Ticket No.',
        width           : 100,
        displayField    : 'wc_ticketno', 
        valueField      : 'wc_ticketno',
        hiddenName      : '',
        id              : 'cmbTicketNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTicketNoListDatastore,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ", 
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        enableKeyEvents: true,   
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPONO.focus();
             }
             },
           select: function(){
                 flxDetail.getStore().removeAll();
                loadCheck_QC_TicketNoDatastore.removeAll();
		loadCheck_QC_TicketNoDatastore.load({
		 	url:'ClsFuGrn.php',
			params:
	   		{
			task:"load_QC_Ticket_Detail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        ticketno : cmbTicketNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){
			
                        var cnt = loadCheck_QC_TicketNoDatastore.getCount();

                        if (cnt > 0)
                        {

			loadordnodatastore.removeAll();
			cmbPONO.reset();


			    loadordnodatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadordno",
				    compcode : Gincompcode,
				    finid : GinFinid,
				    supcode : supcode,
				    gstFlag : gstFlag
				},
				scope: this,
				callback: function () 
				{
			
                   		cmbPONO.setValue(0);
				loaditempodatastore.removeAll();
				    loaditempodatastore.load({
					url: 'ClsFuGrn.php',
					params:
					{
					    task:"loaditempo",
					    ordcode: cmbPONO.getValue()
					},
					callback: function () 
					{
		                        cmbItemName.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemcode'));

		                        }  
				    });


                        degitemcode = 0;

                        hsncode  = loadCheck_QC_TicketNoDatastore.getAt(0).get('itmh_hsncode');

//alert(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'));

                        txtDegradeItem.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('deg_item_name'));
                        cmbArea.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_area'));

		        dtpTicketDate.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'));


	//	        dtpGRNDate.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'));
	//	        dtpGRNDate.setRawValue(Ext.util.Format.date(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate')),"d-m-Y");

//			dtpTicketDate.setValue(Ext.util.Format.date(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'),'d-m-Y'));

			dtpGRNDate.setValue(Ext.util.Format.date(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'),'d-m-Y'));

Ext.util.Format.date(dtpNewBill.getValue(),"d-m-Y")
                       
                        if (cmbItemName.getValue() == 5)         
                           txtPayTerms.setRawValue(5);        
                        else if (cmbItemName.getValue() == 23)         
                           txtPayTerms.setRawValue(60);        
                        else   
                           txtPayTerms.setRawValue(30);        
//alert(dtpTicketDate.getRawValue());

                        var ticketwt = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketwt')/1000;
                        ticketwt =  Ext.util.Format.number(ticketwt, "0.000");

                        txtTicketWt.setRawValue(ticketwt);

                        txtRate.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate'), "0.00"));
                        txtBillRate.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate'), "0.00"));

                        txtMoisRate.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate'), "0.00"));

                        txtFinesRate.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate'), "0.00"));

                        txtFinesRate.setRawValue(Ext.util.Format.number(2000, "0.00"));

                        txtSandRate.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate'), "0.00"));


			dtpGEDate.setRawValue(Ext.util.Format.date(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketdate'),'d-m-Y'));


                        supcode = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_supcode');
                        ledgercode = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_supcode');

                        suptype = loadCheck_QC_TicketNoDatastore.getAt(0).get('cust_state');

                        txtSupplierName.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('cust_ref'));
       
                        areacode = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_area');

                        txtQCNo.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_entryno'));

                        txtTruckNo.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_truck'));
       
//			txtTicketWt.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_ticketwt')/1000,"0.000"));
			txtGRNQty.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_acceptqty')/1000,"0.000"));

			txtBillQty.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_billqty')/1000,"0.000"));


//			txtGRNWt.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_acceptqty')/1000,"0.000"));


                	find_item_value();   

                        moisqtyded  = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_qty')/1000;
                        sandqtyded  = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_qty')/1000;
                        finesqtyded = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_qty')/1000;

                        otherdedqty = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_otherdedqty')/1000;


                        moisqtyded =  Ext.util.Format.number(moisqtyded, "0.000");
                        sandqtyded =  Ext.util.Format.number(sandqtyded, "0.000");
                        finesqtyded =  Ext.util.Format.number(finesqtyded, "0.000");
                        otherdedqty =  Ext.util.Format.number(otherdedqty, "0.000");


                        var qtydiff = Number(txtBillQty.getValue())  - Number(txtTicketWt.getValue());
                          
                        if (qtydiff < 0)
                            qtydiff = 0;                 
      
                        var valuediff = Number(qtydiff) * Number(txtRate.getValue());

                        txtQtyDiff.setRawValue(Ext.util.Format.number(qtydiff, "0.000"));
                        txtValueDiff.setRawValue(Ext.util.Format.number(valuediff, "0.00"));

                        dedqty = Number(moisqtyded)+Number(sandqtyded)+Number(finesqtyded)+Number(otherdedqty) + Number(qtydiff);

			txtFixedMoisPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_fixed'));

                        txtActualMoisPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_actual'));
                        txtDiffMoisPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_diff'));
			txtMoisQty.setRawValue(moisqtyded);


			txtFixedFinesPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_fixed'));
                        txtActualFinesPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_actual'));
                        txtDiffFinesPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_diff'));
			txtFinesQty.setRawValue(finesqtyded);

			txtFixedSandPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_fixed'));
                        txtActualSandPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_actual'));
                        txtDiffSandPer.setValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_diff'));
			txtSandQty.setRawValue(sandqtyded);

			txtOtherDedQty.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_otherdedqty')/1000,"0.000"));


                        var tdedqty = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_tot_ded_qty')/1000 + Number(txtQtyDiff.getValue());
 

//			txtTotDedQty.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_tot_ded_qty')/1000,"0.000"));

			txtTotDedQty.setRawValue(Ext.util.Format.number(tdedqty,"0.000"));

        		degitemcode  = loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_item');

                        var degval = 0;
                        var degDebitRate = 0;
                        var degDebitValue = 0;

                        txtDegradeItem.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('deg_item_name'));
                        txtDegradeRate.setRawValue(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_rate'));
			txtDegradeQty.setRawValue(Ext.util.Format.number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_qty')/1000,"0.000"));

                        if ( Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_rate')) >0 && Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_qty')) > 0) 
                        {    

                            degval =  Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_rate')) * Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_qty'))/1000;

                            degDebitRate = Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate')) - Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_rate')); 

                            degDebitValue = Number(degDebitRate) * Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_degrade_qty'))/1000;
                        } 

                       degval =  Ext.util.Format.number(degval, "0.00");
                       degDebitValue =  Ext.util.Format.number(degDebitValue, "0.00");

                        moisval =    Number(moisqtyded) * Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate')) ;
//                        finesval =    Number(finesqtyded) * Number(loadgrneddtdatastore.getAt(i).get('qc_fuel_fines_rate')) ;
                        finesval =    Number(finesqtyded) * 2000;
  
                        sandval =    Number(sandqtyded) * Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate')) ;

                        othdedvalue = Number(otherdedqty)* Number(loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_itemrate')) ;

                        moisval =  Ext.util.Format.number(moisval, "0.00");
                        finesval =  Ext.util.Format.number(finesval, "0.00");
                        sandval =  Ext.util.Format.number(sandval, "0.00");        
                        othdedvalue =  Ext.util.Format.number(othdedvalue, "0.00");        

                        debitvalue = Number(moisval) + Number(finesval) + Number(sandval) + Number(othdedvalue) + Number(degDebitValue) + Number(valuediff);

                        txtMoisValue.setRawValue(Ext.util.Format.number(moisval, "0.00"));
                        txtFinesValue.setRawValue(Ext.util.Format.number(finesval, "0.00"));
                        txtSandValue.setRawValue(Ext.util.Format.number(sandval, "0.00"));
                        txtOtherDedValue.setRawValue(Ext.util.Format.number(othdedvalue, "0.00"));
                        txtDegradeValue.setRawValue(degval);
                        txtDegradeDebitValue.setRawValue(degDebitValue);

                        txtDNValue.setRawValue( Ext.util.Format.number(debitvalue, "0.00"));
                        txtDNValue2.setRawValue( Ext.util.Format.number(debitvalue, "0.00"));





                        if (Number(moisqtyded) > 0)
                        {
                           remarks = "Qty " + moisqtyded + " Kgs Deducted due to Ex-Mois % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_diff');
                           moisremarks =  moisqtyded + " Kgs Deducted due to Ex-Mois % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_mois_arb_diff');

                        }    
                        if (Number(finesqtyded) > 0)
                        {   
                           remarks = remarks +  " Qty " + finesqtyded + " Kgs Deducted due to Ex-Fines % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_diff');
                           finesremarks = finesqtyded + " Kgs Deducted due to Ex-Fines % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_fines_diff');

                        } 
                        if (Number(sandqtyded) > 0)
                        {                    
                           remarks = remarks +  " Qty " + sandqtyded + " Deducted due to Ex-Sand % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_diff');
                           sandremarks =  sandqtyded + " Kgs Deducted due to Ex-Sand % " +loadCheck_QC_TicketNoDatastore.getAt(0).get('qc_fuel_sand_diff');
                        }

                        if (Number(otherdedqty) > 0)
                        {                    
                           remarks = remarks +  " Other Deduction Qty " + otherdedqty;           
                           othdedremarks =  " Other Deduction Qty " + otherdedqty + " Kgs";
                        }





   
				}

			    });

                       }
                       else
                       {
                              alert("Quality entry not made for this Ticket Number..");
                       }      
                 }    
	        });			
     
	   }
        }      
   });




var txtQCNo = new Ext.form.NumberField({
        fieldLabel  : 'QC Ent No.',
        id          : 'txtQCNo',
        name        : 'txtQCNo',
        width       :  100,
        allowBlank  :  false,
        readOnly    : true,
	tabindex : 1,
enableKeyEvents: true,  
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
           //       cmbItemName.focus();
             }
       },
    }	
    });

var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 210,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAreadatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillno.focus();
             }
       },

	   select:function()
		{

			fareacode = cmbArea.getValue();
			txttonnage.setValue('0');
grid_tot();
if(fareacode > 0) {


}

	   	},
	   change:function()
	   	{

			if (frtype === "2" || frtype === "0" || frtype === "3"){
				
				if (Number(txttonnage.getValue()) > Number(txtload.getValue())){
					valoffreight = txtload.getValue();
					txtFreight.setValue(txtload.getValue());
				}
				else{
					valoffreight = txttonnage.getValue();
					txtFreight.setValue(txttonnage.getValue()); 
				}
			}
			else{
				txtFreight.setValue('0'); valoffreight = 0;
			}
	
	   	},
		
		

	}
   });





var txttransport = new Ext.form.TextField({
        fieldLabel  : 'Transport',
        id          : 'txttransport',
        name        : 'txttransport',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttonnage = new Ext.form.TextField({
        fieldLabel  : 'Tonnage Based',
        id          : 'txttonnage',
        name        : 'txttonnage',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
    });

var txtload = new Ext.form.TextField({
        fieldLabel  : 'Load Based',
        id          : 'txtload',
        name        : 'txtload',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
	tabindex : 1,
	listeners : {
		keyup : function(){
			if (frtype === "3" || frtype === "0" || frtype === "2"){
				
				if (Number(txttonnage.getValue()) > Number(txtload.getValue())){
					valoffreight = txtload.getValue();
					txtFreight.setValue(txtload.getValue());
				}
				else{
					valoffreight = txttonnage.getValue();
					txtFreight.setValue(txttonnage.getValue());
				}
			}
			else{
				txtFreight.setValue('0'); valoffreight = 0;
			}
		}
	}
    });



 var txtBillQty = new Ext.form.NumberField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
              //    txtMillQty.focus();
             }
       },
	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
    }
    });




var txtMillQty = new Ext.form.NumberField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtMillQty',
        name        : 'txtMillQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFixedMoisPer.focus();
             }
       },

	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
}
    });



var txtTicketWt = new Ext.form.NumberField({
        fieldLabel  : 'Ticket Wt',
        id          : 'txtTicketWt',
        name        : 'txtTicketWt',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
decimalPrecision: 3,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFixedMoisPer.focus();
             }
       },

	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
}
    });

var txtOtherDedValue = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOtherDedValue',
        name        : 'txtOtherDedValue',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
	tabindex : 1,
        readOnly  : true,
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},  	
	listeners:{
        }
});  


var txtOtherDedQty = new Ext.form.TextField({
        fieldLabel  : 'Oth.Ded.Qty',
        id          : 'txtOtherDedQty',
        name        : 'txtOtherDedQty',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
	tabindex : 1,
        readOnly  : true,
    	enableKeyEvents: true, 
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
	listeners:{
	keyup:function()
		{
			calculateItemvalue();
       	find_item_value();   
/*
			if (txtFixedMoisPer.getValue() < Number(moistureper + moistol))
			{
				txtMoisQty.setValue(0);
			}
			else
			{
			var totmois = 0;
			totmois = Number(moistureper) + Number(moistol);
				txtMoisQty.setValue(Ext.util.Format.number((txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()) * (txtFixedMoisPer.getValue() - totmois) / 100,"0.000"));
				
			}
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtFinesQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if (Number(txtOtherDedQty.getValue())>Number(txtMillQty.getValue()))
			{
			alert("Lifeless Qty Should Not be Greater than Mill Qty..");
			txtOtherDedQty.focus();
			txtOtherDedQty.setValue("0");
			}
			else
			{
			//txtGRNQty.setValue(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue());
txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue((txttareqty.getValue())+(txtOtherDedQty.getValue())+(txtFinesQty.getValue())+(txtdegradeqty.getValue()));
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));

			}
*/
		}
	    
}
    });

var txtFixedMoisPer = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtFixedMoisPer',
        name        : 'txtFixedMoisPer',
        width       :  50,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });


var txtActualMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtActualMoisPer',
        name        : 'txtActualMoisPer',
        width       :  50,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtDiffMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDiffMoisPer',
        name        : 'txtDiffMoisPer',
        width       :  50,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtMoisQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMoisQty',
        name        : 'txtMoisQty',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 3,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFinesQty.focus();
             }
       },
}
    });



var txtMoisRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisRate',
        name        : 'txtMoisRate',
        width       :  65,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFinesQty.focus();
             }
       },
}
    });


var txtFinesRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFinesRate',
        name        : 'txtFinesRate',
        width       :  65,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFinesQty.focus();
             }
       },
}
    });


var txtSandRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSandRate',
        name        : 'txtSandRate',
        width       :  65,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtFinesQty.focus();
             }
       },
}
    });




var txtMoisValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisValue',
        name        : 'txtMoisValue',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
         }
});



var txtFinesValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFinesValue',
        name        : 'txtFinesValue',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
         }
});



var txtSandValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSandValue',
        name        : 'txtSandValue',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners:{
         }
});

   var txtDegradeItem = new Ext.form.TextField({
        fieldLabel  : 'Item',
        id          : 'txtDegradeItem',
        name        : 'txtDegradeItem',
        width       :  250,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });

   var txtDegradeRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtDegradeRate',
        name        : 'txtDegradeRate',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},  
        tabindex : 2
   });

   var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });

   var txtDegradeValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtDegradeValue',
        name        : 'txtDegradeValue',
        width       :  70,
	readOnly : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
        tabindex : 2
   });

/*
var txtdegradeqty = new Ext.form.TextField({
        fieldLabel  : 'Degrade Qty',
        id          : 'txtdegradeqty',
        name        : 'txtdegradeqty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:14px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	

	listeners:{
	keyup:function()
		{
		
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtFinesQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((txtdegradeqty.getValue())>(txtMillQty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtFinesQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue()  ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue()  ),'0.000'));

			//txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtFinesQty.getValue()),"0.000"));
			}
		
		}
	    
}
    });
*/
var txtTotDedQty = new Ext.form.TextField({
        fieldLabel  : 'Tot.Ded.Qty',
        id          : 'txtTotDedQty',
        name        : 'txtTotDedQty',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtDNValue = new Ext.form.NumberField({
        fieldLabel  : 'DEBIT NOTE VALUE',
        id          : 'txtDNValue',
        name        : 'txtDNValue',
        width       :  110,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });


var txtDNValue2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDNValue2',
        name        : 'txtDNValue2',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtCGSTDN = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCGSTDN',
        name        : 'txtCGSTDN',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtSGSTDN = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSGSTDN',
        name        : 'txtSGSTDN',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtIGSTDN = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTDN',
        name        : 'txtIGSTDN',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


var txtDNPartyValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDNPartyValue',
        name        : 'txtDNPartyValue',
        width       :  90,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtIGSTDN = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTDN',
        name        : 'txtIGSTDN',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });




var txtGRNQty = new Ext.form.TextField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtGRNQty',
        name        : 'txtGRNQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},

 enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
        }      	
    });


var txtBillRate = new Ext.form.NumberField({
        fieldLabel  : 'Bill Rate',
        id          : 'txtBillRate',
        name        : 'txtBillRate',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
 enableKeyEvents: true,   
	listeners:{


	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
},


    });



var txtRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
 enableKeyEvents: true,   
	listeners:{


	   blur:function()
		{
          	find_item_value();   
		},

	    change:function()
		{
          	find_item_value();   

		},
	    keyup:function()
		{
          	find_item_value();   
		}
},


    });



var txtItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtItemValue',
        name        : 'txtItemValue',
        width       :  100,
//        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtBillItemValue = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtBillItemValue',
        name        : 'txtBillItemValue',
        width       :  100,
//        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtTotGRNQty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txtTotGRNQty',
        name        : 'txtTotGRNQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtTotGRNValueBill= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotGRNValueBill',
        name        : 'txtTotGRNValueBill',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });
var txtTotGRNQtybill= new Ext.form.TextField({
        fieldLabel  : 'Party Qty',
        id          : 'txtTotGRNQtybill',
        name        : 'txtTotGRNQtybill',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttotBillValue= new Ext.form.NumberField({
        fieldLabel  : 'Party Bill Value',
        id          : 'txttotBillValue',
        name        : 'txttotBillValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	

    });
var txtGRNValue= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txtGRNValue',
        name        : 'txtGRNValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '14px','font-weight':'bold'
		},
    });

var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Round Off',
        id          : 'txtroundoff',
        name        : 'txtroundoff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	value	    :  0,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
        enableKeyEvents: true,   
	listeners:{
	   blur:function()
		{
		 findLandingCost(); 	
		},
	    change:function()
		{
                 findLandingCost(); 
           	},
	    keyup:function()
		{
                 findLandingCost(); 
           	},  
        } 


    });

var txtLandingCost = new Ext.form.NumberField({
        fieldLabel  : 'Landing Cost',
        id          : 'txtLandingCost',
        name        : 'txtLandingCost',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtOtherChrges = new Ext.form.NumberField({
        fieldLabel  : 'Other Charges',
        id          : 'txtOtherChrges',
        name        : 'txtOtherChrges',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
       	enableKeyEvents: true, 
    style      :"border-radius: 5px; ",	
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });


var txtFreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtFreight',
        name        : 'txtFreight',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });


var txtFrtMT= new Ext.form.NumberField({
        fieldLabel  : 'Freight/MT',
        id          : 'txtFrtMT',
        name        : 'txtFrtMT',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });

var txtFrtValue = new Ext.form.NumberField({
        fieldLabel  : 'Freight AMOUNT',
        id          : 'txtFrtValue',
        name        : 'txtFrtValue',
        width       :  100,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
       	enableKeyEvents: true, 
	listeners : {
		keyup:function(){
		grid_tot();
	}
	}
    });

var txtHandlingcgstval = new Ext.form.TextField({
    fieldLabel  : 'H.SGST.Value',
    id          : 'txtHandlingcgstval',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
       	enableKeyEvents: true, 
    listeners:{
       change: function(){
	
               
         }
    }
});

var txtHandlingsgstval = new Ext.form.TextField({
    fieldLabel  : 'H.CGST.Value',
    id          : 'txtHandlingsgstval',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
   
    listeners:{
       change: function(){
	
         }
    }
});    

var txtBillValue = new Ext.form.NumberField({
        fieldLabel  : 'Bill Value',
        id          : 'txtBillValue',
        name        : 'txtBillValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	//readOnly : true
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPayTerms.focus();
             }
       },
 
	keyup:function(){
//		grid_tot();
	}
	}

    });

var txtPayTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPayTerms',
        name        : 'txtPayTerms',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	//readOnly : true
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGENo.focus();
             }
       },
 
	keyup:function(){
//		grid_tot();
	}
	}

    });




var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtCGSTPer',
        name        : 'txtCGSTPer',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });



var txtCGSTDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCGSTDiff',
        name        : 'txtCGSTDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});

var txtSGSTDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSGSTDiff',
        name        : 'txtSGSTDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});


var txtIGSTDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTDiff',
        name        : 'txtIGSTDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});


var txtCessDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCessDiff',
        name        : 'txtCessDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});

var txtHandlingDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtHandlingDiff',
        name        : 'txtHandlingDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});


var txtHandlingCGSTDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtHandlingCGSTDiff',
        name        : 'txtHandlingCGSTDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});

var txtHandlingSGSTDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtHandlingSGSTDiff',
        name        : 'txtHandlingSGSTDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});

var txtTCSDiff = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSDiff',
        name        : 'txtTCSDiff',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
});


var txtQtyDiff = new Ext.form.NumberField({
        fieldLabel  : 'Qty Diff',
        id          : 'txtQtyDiff',
        name        : 'txtQtyDiff',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 3,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '12px','font-weight':'bold'
		}
});

var txtValueDiff = new Ext.form.NumberField({
        fieldLabel  : 'Value Diff',
        id          : 'txtValueDiff',
        name        : 'txtValueDiff',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica','border-radius': '5px',
		    'font-size': '12px','font-weight':'bold'
		}
});


var txtCGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'CGST Value',
        id          : 'txtCGSTValue',
        name        : 'txtCGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });




var txtSGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtSGSTPer',
        name        : 'txtSGSTPer',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtSGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'SGST Value',
        id          : 'txtSGSTValue',
        name        : 'txtSGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtIGSTPer',
        name        : 'txtIGSTPer',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtIGSTValue = new Ext.form.NumberField({
        fieldLabel  : 'IGST Value',
        id          : 'txtIGSTValue',
        name        : 'txtIGSTValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });




     var txtCGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtCGSTPM',
        width       : 50,
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
              grid_tot();
          },
          keyup:function(){
              if (Number(txtCGSTPM.getValue()) > 2)
              {   
                  txtCGSTPM.setValue(0);
                  txtSGSTPM.setValue(0);
              } 
          grid_tot();
         }
        } 
   }); 

     var txtSGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtSGSTPM',
        width       : 50,
        name        : 'txtSGSTPM',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              grid_tot();
          },
          keyup:function(){
           grid_tot();
         }
        } 
   }); 
     var txtIGSTPM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtIGSTPM',
        width       : 50,
        name        : 'txtIGSTPM',
         decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              grid_tot();
          },
          keyup:function(){
          grid_tot();
         }
        } 
   }); 


var txtTCSPer = new Ext.form.TextField({
        fieldLabel  : 'TCS%',
        id          : 'txtTCSPer',
        name        : 'txtTCSPer',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    	enableKeyEvents: true, 
	listeners:{
 
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
       }

    });

var txtTCSValue = new Ext.form.NumberField({
        fieldLabel  : 'TCS Value',
        id          : 'txtTCSValue',
        name        : 'txtTCSValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtCessPerMT = new Ext.form.NumberField({
        fieldLabel  : 'Cess / MT ',
        id          : 'txtCessPerMT',
        name        : 'txtCessPerMT',
        width       :  60,

        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    	enableKeyEvents: true, 
	listeners:{
 
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
       }
    });

var txtCessValue = new Ext.form.NumberField({
        fieldLabel  : 'Cess Amount',
        id          : 'txtCessValue',
        name        : 'txtCessValue',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });


var txtHandlingPMT = new Ext.form.NumberField({
        fieldLabel  : 'Handling	 /MT',
        id          : ' txtHandlingPMT',
        name        : ' txtHandlingPMT',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	disabled:true,
//	readOnly : true,
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function(){
		grid_tot();
	}
	}	
    }); 


    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebit',
        width: 100,
        name: 'txtTotDebit',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCredit',
        width: 100,
        name: 'txtTotCredit',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

    });


    

    var txtTotDebitDN = new Ext.form.NumberField({
        fieldLabel: 'Debit Total',
        id: 'txtTotDebitDN',
        width: 100,
        name: 'txtTotDebitDN',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotCreditDN = new Ext.form.NumberField({
        fieldLabel: 'Credit Total',
        id: 'txtTotCreditDN',
        width: 100,
        name: 'txtTotCreditDN',
        readOnly : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

    });

var txtHandCharges = new Ext.form.NumberField({
        fieldLabel  : 'Amount',
        id          : 'txtHandCharges',
        name        : 'txtHandCharges',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	value	    :  0,
	tabindex : 1,
//	disabled:true,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });    

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:210,
    height: 95,
    hidden:false,
    width: 1080,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},//1
        {header: "Bill Qty", dataIndex: 'billqty',sortable:true,width:90,align:'right'},//3
 	{header: "Bill Rate",dataIndex:'billrate',sortable:true,width:100,align:'center'}, //13
        {header: "Bill Item Value", dataIndex: 'billitemvalue',sortable:true,width:100,align:'left'},//15
 	{header: "Ticket WT", dataIndex: 'ticketwt',sortable:true,width:90,align:'right'},//4
 	{header: "Item Rate",dataIndex:'itemrate',sortable:true,width:100,align:'center'}, //13
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},//15
	{header: " GRN Qty",  dataIndex:'grnqty',sortable:true,width:120,align:'right'}, //12
	{header: " GRN Value",  dataIndex:'grnvalue',sortable:true,width:120,align:'right'}, //12
 	{header: "Mois%(F)", dataIndex: 'fixedMois',sortable:true,width:90,align:'right'},//4
 	{header: "Mois%(A)", dataIndex: 'actualMois',sortable:true,width:90,align:'right'},//4
	{header: "Ex.Mois%", dataIndex:'ExMoisper',sortable:true,width:90,align:'right'}, //5
 	{header: "Moisqty", dataIndex:'moisqty',sortable:true,width:90,align:'right'}, //6
	{dataIndex:'moisvalue', header: "Mois.Value",width: 60,align: 'center',sortable: true},  

	{header: "Fines%(F)", dataIndex:'fixedfines',sortable:true,width:90,align:'right'}, //5
        {header: "Fines%(A)", dataIndex: 'actualfines',sortable:true,width:90,align:'right'},//9
        {header: "Ex.Fines%", dataIndex: 'Exfines',sortable:true,width:90,align:'right'},//9
        {header: "Fines Qty", dataIndex: 'finesqty',sortable:true,width:90,align:'right'},//7
	{dataIndex:'finesrate', header: "Fines.Rate",width: 60,align: 'center',sortable: true},  
	{dataIndex:'finesvalue', header: "Fines.Value",width: 60,align: 'center',sortable: true},  
  
	{header: "Sand%(F)", dataIndex:'fixedsand',sortable:true,width:90,align:'right'}, //5
        {header: "Sand%(A)", dataIndex: 'actualsand',sortable:true,width:90,align:'right'},//9
        {header: "Ex.Sand%", dataIndex: 'Exsand',sortable:true,width:90,align:'right'},//9
        {header: "Sand Qty", dataIndex: 'sandqty',sortable:true,width:90,align:'right'},//7
	{dataIndex:'sandvalue', header: "Sand.Value",width: 60,align: 'center',sortable: true},  
	{dataIndex:'othdedvalue', header: "Oth.Ded.Value",width: 60,align: 'center',sortable: true},

        {header: "Oth Ded",  dataIndex: 'othdedqty',sortable:true,width:90,align:'right'},//11

	{dataIndex:'degitemname', header: "Deg.Itemname",width: 60,align: 'center',sortable: true},
	{dataIndex:'degitem', header: "Deg.Item",width: 60,align: 'center',sortable: true},
	{dataIndex:'degrate', header: "Deg.Rate",width: 60,align: 'center',sortable: true},
	{dataIndex:'degqty', header: "Deg.Qty",width: 60,align: 'center',sortable: true},  
	{dataIndex:'degvalue', header: "Deg.Value",width: 60,align: 'center',sortable: true},  


        {header: "Tot Ded",  dataIndex: 'totdedqty',sortable:true,width:90,align:'right'},//11



        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:130,align:'left'},//17
	{header: "costValue", dataIndex: 'costval',sortable:true,width:90,align:'right'},//,hidden:true},//31
	{header: "costRate", dataIndex: 'costrate',sortable:true,width:90,align:'right'},//,hidden:true},//32
	{dataIndex:'cgstpm', header: "CGST PM",width: 60,align: 'center',sortable: true},
	{dataIndex:'sgstpm', header: "SGST PM",width: 60,align: 'center',sortable: true},
	{dataIndex:'igstpm', header: "IGST PM",width: 60,align: 'center',sortable: true},  


	{dataIndex:'dnvalue', header: "VALUE",width: 60,align: 'center',sortable: true},
	{dataIndex:'dncgst', header: "DN CGST",width: 60,align: 'center',sortable: true},
	{dataIndex:'dnsgst', header: "DN SGST",width: 60,align: 'center',sortable: true},
	{dataIndex:'dnigst', header: "DN IGST",width: 60,align: 'center',sortable: true},
	{dataIndex:'dnpartyvalue', header: "DN VALUE",width: 60,align: 'center',sortable: true},


	{dataIndex:'remarksqtydiff', header: "Qty Remarks",width: 100,align: 'left',sortable: true},
	{dataIndex:'remarksmois', header: "Mois Remarks",width: 100,align: 'left',sortable: true},
	{dataIndex:'remarksfines', header: "Fines Remarks",width: 100,align: 'left',sortable: true},
	{dataIndex:'remarkssand', header: "Sand Remarks",width: 100,align: 'left',sortable: true},
	{dataIndex:'remarksotherded', header: "Oth Ded Remarks",width: 100,align: 'left',sortable: true},

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES GRN',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,

		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('itemcode'));


			if ((selrow != null)){

  Ext.getCmp('tab2').setDisabled(false);  
  Ext.getCmp('tab3').setDisabled(false); 
  Ext.getCmp('save').setDisabled(false);

				Ext.getCmp('cmbItemName').setDisabled(true);

				gridedit = "true";
				editrow = selrow;

				cmbItemName.setValue(selrow.get('itemcode'));
				cmbItemName.setRawValue(selrow.get('itemname'));

				txtBillQty.setRawValue(selrow.get('billqty'));




				txtTicketWt.setRawValue(selrow.get('ticketwt'));
				txtBillRate.setRawValue(selrow.get('billrate'));
				txtBillItemValue.setRawValue(selrow.get('billitemvalue'));


				txtFixedMoisPer.setValue(selrow.get('fixedMois'));
                                txtActualMoisPer.setValue(selrow.get('actualMois'));
                                txtDiffMoisPer.setValue(selrow.get('ExMoisper'));
				txtMoisQty.setValue(selrow.get('moisqty'));

				txtFixedFinesPer.setValue(selrow.get('fixedfines'));
                                txtActualFinesPer.setValue(selrow.get('actualfines'));
                                txtDiffFinesPer.setValue(selrow.get('Exfines'));
				txtFinesQty.setValue(selrow.get('finesqty'));

				txtFixedSandPer.setValue(selrow.get('fixedsand'));
                                txtActualSandPer.setValue(selrow.get('actualsand'));
                                txtDiffSandPer.setValue(selrow.get('Exsand'));
				txtSandQty.setValue(selrow.get('sandqty'));


				txtOtherDedQty.setValue(selrow.get('othdedqty'));
	

                                txtTotDedQty.setRawValue(Ext.util.Format.number(selrow.get('totdedqty')), "0.000");
                                txtDNValue.setRawValue(Ext.util.Format.number(selrow.get('dnvalue')), "0.00");

		//		txtTotDedQty.setValue(selrow.get('totdedqty'));
				txtGRNQty.setValue(selrow.get('partygrnqty'));
	


				txtRate.setValue(selrow.get('itemrate'));
		
				txtItemValue.setRawValue(selrow.get('itemvalue'));
				txtRemarks.setValue(selrow.get('remarks'));

                                txtDegradeItem.setValue(selrow.get('degitemname'));
                                txtDegradeRate.setValue(selrow.get('degrate'));
                                txtDegradeQty.setValue(selrow.get('degqty'));
//annadurai

var degval2 = Number(selrow.get('degrate')) * Number(selrow.get('degqty'));
                                txtDegradeValue.setRawValue(degval2);
                                txtDegradeDebitValue.setValue(selrow.get('degvalue'));

                                degitemcode = selrow.get('degitem'); 

                                txtMoisRate.setRawValue(selrow.get('itemrate'));
                                txtFinesRate.setRawValue(selrow.get('finesrate'));
                                txtSandRate.setRawValue(selrow.get('itemrate'));
                                txtMoisValue.setRawValue(selrow.get('moisvalue'));
                                txtFinesValue.setRawValue(selrow.get('finesvalue'));
                                txtSandValue.setRawValue(selrow.get('sandvalue'));
                                txtOtherDedValue.setRawValue(selrow.get('othdedvalue'));	
                                txtDNValue.setRawValue(selrow.get('dnvalue'));	

calculateItemvalue();
/*
	var qtydiff = Number(txtBillQty.getValue())  - Number(txtTicketWt.getValue());
        if (qtydiff < 0)
            qtydiff = 0; 

	var valuediff = Number(qtydiff) * Number(txtRate.getValue());

        var tdqty = Number(txtMoisQty.getValue())+ Number(txtFinesQty.getValue())+Number(txtSandQty.getValue()) + Number(txtOtherDedQty.getValue()) + Number(txtDegradeQty.getValue());

        
        txtTotDedQty.setRawValue(Ext.util.Format.number(tdqty, "0.000"));

	txtQtyDiff.setRawValue(Ext.util.Format.number(qtydiff, "0.000"));
	txtValueDiff.setRawValue(Ext.util.Format.number(valuediff, "0.00"));

*/
find_item_value(); 

           /*
	
				//txtGRNQty.setValue(selrow.get('pregrnqty'));

		
		
				loaditemqtydatastore.removeAll();
				loaditemqtydatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loaditemqty",
				    itemcode : cmbItemName.getValue(),
				    ordcode : edpono,
				    gstFlag : gstFlag
				},
				callback :function() {
					moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
				}
				});
*/
				
				flxDetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('itemcode'));
		var chkgen = (selrow.get('geno'));
		flxDetail.getStore().remove(selrow);
		flxDetail.getSelectionModel().selectAll();



                Refresh();
                grid_tot();


		}
		}

     });   
     
    }

   }
});



var dgrecord = Ext.data.Record.create([]);



function RefreshData(){
//    TrnGrnformpanel.getForm().reset();


        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();

    cmbDNoteLedger.setValue(0);
    cmbPurchaseLedger.setValue(0);
    txtDNVouNo.setRawValue('');
    flxDetail.getStore().removeAll();
    flxAccounts.getStore().removeAll();
    flxAccountsDNOTE.getStore().removeAll();
	txtFrtMT.setValue('');
	txtFrtValue.setValue('');

	txtQCNo.setValue('');
	txtSupplierName.setValue('');
	txtBillno.setValue('');

	txtBillValue.setValue('');
	txtPayTerms.setValue('');
	txtGENo.setValue('');
	txtTruckNo.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');

	txtActualMoisPer.setValue('');
	txtActualFinesPer.setValue('');
	txtActualSandPer.setValue('');

        cmbGRNNo.setValue('');
        cmbGRNNo.setRawValue('');
	cmbTicketNo.setValue('');

txtItemValue.setRawValue('');
txtBillItemValue.setRawValue('');
txtDegradeItem.setRawValue('');
txtTicketWt.setRawValue('');
txtRate.setRawValue('');
txtBillRate.setRawValue('');
txtMoisRate.setRawValue('');
txtFinesRate.setRawValue('');
txtSandRate.setRawValue('');

supcode =0;
ledgercode = 0;
txtBillQty.setRawValue('');
txtGRNWt.setRawValue('');

txtFixedMoisPer.setValue('');

txtActualMoisPer.setValue('');
txtDiffMoisPer.setValue('');
txtMoisQty.setRawValue('');


txtFixedFinesPer.setValue('');
txtActualFinesPer.setValue('');
txtDiffFinesPer.setValue('');
txtFinesQty.setRawValue('');
txtFixedSandPer.setValue('');
txtActualSandPer.setValue('');
txtDiffSandPer.setValue('');
txtSandQty.setRawValue('');

txtOtherDedQty.setRawValue('');

txtTotDedQty.setRawValue('');

txtDegradeItem.setRawValue('');
txtDegradeRate.setRawValue('');
txtDegradeQty.setRawValue('');

txtMoisValue.setRawValue('');
txtFinesValue.setRawValue('');
txtSandValue.setRawValue('');
txtOtherDedValue.setRawValue('');
txtDegradeValue.setRawValue('');
txtDegradeDebitValue.setRawValue('');

txtDNValue.setRawValue('');
txtDNValue2.setRawValue('');
txtTotGRNQtybill.setRawValue('');
txtTotGRNValueBill.setRawValue('');
txttotBillValue.setRawValue('');
txtCGSTValue.setRawValue('');
txtCGSTPM.setRawValue('');
txtSGSTValue.setRawValue('');
txtSGSTPM.setRawValue('');
txtIGSTValue.setRawValue('');
txtIGSTPM.setRawValue('');
txtCessPerMT.setRawValue('');
txtCessValue.setRawValue('');
txtHandlingPMT.setRawValue('');
txtHandCharges.setRawValue('');
txtHandlingcgst.setRawValue('');
txtHandlingcgstval.setRawValue('');
txtHandlingsgst.setRawValue('');
txtHandlingsgstval.setRawValue('');
txtTCSValue.setRawValue('');
txtOtherChrges.setRawValue('');     
txtFreight.setRawValue('');              	
txtGRNValue.setRawValue('');
txtroundoff.setRawValue('');
txtLandingCost.setRawValue('');
txtDNValue2.setRawValue('');
txtCGSTDN.setRawValue('');
txtSGSTDN.setRawValue('');
txtIGSTDN.setRawValue('');
txtDNPartyValue.setRawValue('');
txtFrtMT.setRawValue('');
txtFrtValue.setRawValue('');
	
    InitialData();
//get_DebitNote_Ledger();
};

function InitialData(){

	Ext.getCmp('txtGRNNo').show();
	Ext.getCmp('cmbGRNNo').hide();


        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();


var tabPanel = Ext.getCmp('GRN');
tabPanel.hideTabStripItem(2);

  Ext.getCmp('tab2').setDisabled(false);  
  Ext.getCmp('tab3').setDisabled(false); 

	if (userid == 1) {
		Ext.getCmp('dtpGRNDate').setDisabled(false);
		Ext.getCmp('dtpGRNDate').setReadOnly(false);
	}
	gstFlag="Add";

				loadTicketNoListDatastore.removeAll();
				    loadTicketNoListDatastore.load({
					url: 'ClsFUGrn.php',
					params:
					{
					    task:"loadFuelTicketList",
					    compcode : Gincompcode,
					    finid    : GinFinid,
					},
					callback : function(){
/*
				Ext.getCmp('dtpGRNDate').focus(false, 0);	
				const input = document.getElementById('dtpGRNDate');
				const end = input.value.length;
				input.setSelectionRange(0,0);
				input.focus();
*/
					}
                                });



			loadgrnnodatastore.removeAll();
			loadgrnnodatastore.load({
                        	 url:'ClsFuGrn.php',
                        	 params:
                       		 {
                         	 task:"loadgrnno",
				 finid : GinFinid,
				 compcode : Gincompcode,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{

                                  if (GinFinid >= 24)  
                                  {    
                                     var vno = "000"+loadgrnnodatastore.getAt(0).get('grnno');   
                                     vno =  "FU"+vno.slice(-4);  
  	                             txtGRNNo.setValue(vno);
                                  }
                                  else
                                  {
                                     txtGRNNo.setValue(loadgrnnodatastore.getAt(0).get('grnno'));

                                  }  


				}
				 });
};






var tabgrn = new Ext.TabPanel({
    	id          : 'GRN',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#FFFEF2"},
	activeTab   : 0,
	height      : 375,
	width       : 1290,	
	x           : 0,
	y           : 0,
        listeners: {
          'tabchange': function(tabPanel, tab) {
           grid_tot();
        }},

    items       : [
	{
            xtype: 'panel',
            title: 'Item Details',bodyStyle:{"background-color":"#FFFEF2"},
            layout: 'absolute',
            items: [
			{ xtype   : 'fieldset',
	                title   : 'Item Details',
		  	layout  : 'hbox',
        	        border  : true,
        	        height  : 340,
        	        width   : 1250,
                        id      : 'tab1',
			style:{ border:'1px solid red',color:' #581845 ' },
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 0,
        	        items:[

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 460,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblFixed]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 515,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblActual]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 590,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDiff2]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 650,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDedQty]
		                },

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 730,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDedRate]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 810,
		                    y           : 17,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDedValue]
		                },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 430,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbItemName]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 390,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtTicketWt]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 600,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtRate]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 800,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtItemValue]
                            	},                        	

                    {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : '',
                            width       : 400,
                            x           : 1090,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [opt_GRN_Status]
                     },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtBillQty]
                            	},

/*

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 200,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtMillQty]
                            	},

*/
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtBillRate]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 250,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtBillItemValue]
                            	},  


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 390,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtFixedMoisPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 450,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtActualMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 515,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtDiffMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 580,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtMoisQty]
                            	}, 

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 655,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtMoisRate]
                            	}, 
   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 730,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtMoisValue]
                            	},   


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 390,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtFixedFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 450,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtActualFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 515,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtDiffFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 580,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtFinesQty]
                            	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 655,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtFinesRate]
                            	}, 

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 730,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtFinesValue]
                            	},   

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 390,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtFixedSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 450,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtActualSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 515,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtDiffSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 580,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtSandQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 655,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtSandRate]
                            	}, 
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 730,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtSandValue]
                            	},  
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 550,
                                	y           : 115,
                                    	border      : false,
                                	items: [txtOtherDedQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 730,
                                	y           : 115,
                                    	border      : false,
                                	items: [txtOtherDedValue]
                            	},  

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 550,
                                	y           : 145,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 145,
                                	width       : 320,
                                	x           : 606,
                                	y           : 175,
                                    	border      : false,
                                	items: [txtDNValue]
                            	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 190,
                                	x           : 900,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtQtyDiff]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 190,
                                	x           : 900,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtValueDiff]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 190,
                                	x           : 900,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtGRNQty]
                            	},





		{
			xtype       : 'fieldset',
			title       : 'Degrade Details',
			width       : 380,
			height      : 102,
			x           : 10,
			y           : 105,
			border      : true,
                        id      : 'tabdegrade',
			layout      : 'absolute',
			items:[
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtDegradeItem]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 12,
                                    	border      : false,
                                	items: [txtDegradeQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 180,
                                	y           : 12,
                                    	border      : false,
                                	items: [txtDegradeValue]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 34,
                                    	border      : false,
                                	items: [txtDegradeRate]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 180,
                                	y           : 34,
                                    	border      : false,
                                	items: [txtDegradeDebitValue]
                            },
                         ]
                   } ,   

	

btnSubmit,flxDetail,


	

			     ]	//item detail frame
                	},
            	]//1st tab
        },//panel1sttab
        			{ 
				xtype   : 'fieldset',
			        title   : 'Value Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
                                id      : 'tab2',
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

					{ 
	                                	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 400,
		                        	x           : 0,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNQtybill]
                            		},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 400,
		                        	x           : 200,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNValueBill]
		                    	},




	/*
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 750,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txttotBillValue]
		                    	},

*/

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 200,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTValue]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 400,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTPM]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 200,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTValue]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 400,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTPM]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 200,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTValue]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 400,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTPM]
		                    	},
				{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 130,
		                            	border      : false,
						items: [txtCessPerMT]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 200,
		                        	y           : 130,
		                            	border      : false,
						items: [txtCessValue]
		                        	
		                    	},

				{ 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 100,
	                        	width       : 320,
	                        	x           : 0,
	                        	y           : 160,
	                            	border      : false,
	                        	items: [txtHandlingPMT]
	                    	},
				{ 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 90,
	                        	width       : 320,
	                        	x           : 200,
	                        	y           : 160,
	                            	border      : false,
	                        	items: [txtHandCharges]
	                    	},                           	

				{ 

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtHandlingcgst]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtHandlingcgstval]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 320,
                                	x           : 0,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtHandlingsgst]
                            	},optRounding,

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 200,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtHandlingsgstval]
                            	},  

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 100,
		                        	width       : 320,
		                        	x           : 0,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSPer]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 320,
		                        	x           : 200,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSValue]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTDiff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTDiff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTDiff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 130,
		                            	border      : false,
		                        	items: [txtCessDiff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 160,
		                            	border      : false,
		                        	items: [txtHandlingDiff]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 190,
		                            	border      : false,
		                        	items: [txtHandlingCGSTDiff]
		                    	},




					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 220,
		                            	border      : false,
		                        	items: [txtHandlingSGSTDiff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 30,
		                        	width       : 320,
		                        	x           : 480,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSDiff]
		                    	},



	
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 650,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtOtherChrges]
                            	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 650,
		                        	y           : 160,
		                            	border      : false,
		                        	items: [txtFreight]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 650,
		                        	y           : 190,
		                            	border      : false,
		                        	items: [txtroundoff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 650,
		                        	y           : 220,
		                            	border      : false,
		                        	items: [txtGRNValue]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 650,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtLandingCost]
		                    	},



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 1000,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtDNValue2]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 1000,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtCGSTDN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 1000,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtSGSTDN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 1000,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtIGSTDN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 250,
                                	x           : 1000,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtDNPartyValue]
                            	},


					{ 
					xtype   : 'fieldset',
					title   : 'Freight for Steam Coal',bodyStyle:{"background-color":"#FFFEF2"},
					border  : true,
					height  : 180,
					width   : 290,
					style:{ border:'1px solid red',color:' #581845 '},
					layout  : 'absolute',
					x       : 900,
					y       : 130,
					items:[
						{ 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 120,
				                	width       : 320,
				                	x           : 10,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtFrtMT]
				            	},
						{ 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 120,
				                	width       : 320,
				                	x           : 10,
				                	y           : 35,
				                    	border      : false,
				                	items: [txtFrtValue]
				            	},

                                        ]
                                        }    



				]//tax
			},   //tax



       			{ 
				xtype   : 'fieldset',
			        title   : 'Party Difference Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
                                id      : 'tabtab',
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[
/*
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 85,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 155,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 300,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 355,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 420,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCess]

                        },

		   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 495,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTCS]

                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty]

                        },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 10,
		         border      : false,
		         items:[txtPartyWT],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 10,
		         border      : false,
		         items:[txtPartyValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 10,
		         border      : false,
		         items:[txtPartySGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 10,
		         border      : false,
		         items:[txtPartyIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 10,
		         border      : false,
		         items:[txtPartyCess],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 10,
		         border      : false,
		         items:[txtPartyTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 35,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblGRN]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 35,
		         border      : false,
		         items:[txtGRNWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 35,
		         border      : false,
		         items:[txtGRNActualValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 35,
		         border      : false,
		         items:[txtGRNSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 35,
		         border      : false,
		         items:[txtGRNIGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 35,
		         border      : false,
		         items:[txtGRNCess],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 35,
		         border      : false,
		         items:[txtGRNTCS],
		     },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 60,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiff]

                        },



                   {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 10,
		         y           : 60,
		         border      : false,
		         items:[txtDiffWt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 83,
		         y           : 60,
		         border      : false,
		         items:[txtDiffValue],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 156,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 225,
		         y           : 60,
		         border      : false,
		         items:[txtDiffSGST],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 295,
		         y           : 60,
		         border      : false,
		         items:[txtDiffIGST],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 365,
		         y           : 60,
		         border      : false,
		         items:[txtDiffCess],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 50, 
		         x           : 435,
		         y           : 60,
		         border      : false,
		         items:[txtDiffTCS],
		     },





		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 220,
                         labelWidth  : 70, 
		         x           : 0,
		         y           : 100,
		         border      : false,
		         items:[txtHandlingAmount],
		     	},


				{  xtype       : 'fieldset',
				 title       : '',
				 width       : 200,
		                 labelWidth  : 100, 
				 x           : 180,
				 y           : 100,
				 border      : false,
				 items:[txtHandlingcgstper],
			     	},


				{  xtype       : 'fieldset',
				 title       : '',
				 width       : 200,
		                 labelWidth  : 100, 
				 x           : 350,
				 y           : 100,
				 border      : false,
				 items:[txtHandlingsgstper],
			     	},
		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 180,
		         y           : 125,
		         border      : false,
		         items:[txtHandlingcgstamt],
		     	},


		        {  xtype       : 'fieldset',
		         title       : '',
		         width       : 200,
                         labelWidth  : 100, 
		         x           : 350,
		         y           : 125,
		         border      : false,
		         items:[txtHandlingsgstamt],
		     	},

*/
                                ]
                         },  



       			{ 
				xtype   : 'fieldset',
			        title   : 'Ledger Posting Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
                                id      : 'tab3',
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 950,
                                	x           : 800,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtDNVouNo]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 950,
                                	x           : 1000,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtpDNDate]
                            },


		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 250,
		                    x           : 10,
		                    y           : -10,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblPurchase]
		                },


		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 280,
                         	labelWidth  : 250,
		                    x           : 658,
		                    y           : -10,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDebitNote]
		                },


                    flxAccounts,flxAccountsDNOTE,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 100,
		        y: 280,
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
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCredit]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 700,
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotDebitDN]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 920,
		        y: 280,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCreditDN]
		    }, 

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 65,
                                	width       : 1110,
                                	x           : 10,
                                	y           : 260,
                                    	border      : false,
         //                       	items: [txtRemarksAcc]
                            	},

                                ]
                         },   


        {
            xtype: 'panel',
            id   : 'tab4', 
            title: '',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 190,
                        	width       : 320,
                        	x           : 50,
                        	y           : 40,
                            	border      : false,
                        	items: [txtNewGRNNo]
                    },

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 380,
		        y: 40,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnGRNNoChange]
		    }, 


		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 500,
		        y: 40,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtPassword]
		    }, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 150,
		        width: 300,
		        x: 800,
		        y: 40,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtPassword2]
		    }, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 1100,
		        y: 40,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnDelete]
		    }, 

                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 250,
                    width: 500,
                    labelWidth:90,
                    x:50 ,  
                    y:95 ,
                    items: [

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 190,
                        	width       : 500,
                        	x           : 50,
                        	y           : 80,
                            	border      : false,
                        	items: [txtNewBillNo]
                    },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 190,
                        	width       : 500,
                        	x           : 50,
                        	y           : 110,
                            	border      : false,
                        	items: [dtpNewBill]
                    },

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 190,
		        width: 300,
		        x: 400,
		        y: 80,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtPassword3]
		    }, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 400,
		        y: 110,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnBillNoChange]
		    }, 

                    ]
                  },
            ]
         }                  
    
],


});


   var TrnGrnformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Goods Recipt Note (Local)',
        header      : false,
        width       : 927,	
	bodyStyle   :{"background-color":"#ECE5B6"},
        height      : 690,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnGrnformpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #FFFEF2;",
            height: 40,
            style   :'background-color:#FFFEF2',
            fontSize:18,
            items: [

			{
				text: ' Add',
				style  : 'text-align:center;',
				tooltip: 'Add Details...',
				height: 40,
				fontSize:20,
				width:50,
				align : 'right',
				icon: '/Pictures/Add.png',
				listeners:{
					click: function () {
						gstFlag = "Add";

//                        	if (gstFlag === "Edit") {
//                        	Ext.getCmp('Confirm').setDisabled(false);
//                        	}
//                        	else {
//                        	Ext.getCmp('Confirm').setDisabled(true);
//                        	}						
						Ext.getCmp('txtGRNNo').setDisabled(true);
						Ext.getCmp('txtGRNNo').show();
						Ext.getCmp('cmbGRNNo').hide();		
						//txtGRNNo.setFocus();
						//txtCGSTPer.setRawValue('2.5');
						//txtSGSTPer.setRawValue('2.5');
						txtIGSTPer.setDisabled(true);
						txtIGSTValue.setDisabled(true);
						txtTCSPer.setDisabled(true);
						txtTCSValue.setDisabled(true);
						loadsupplierdatastore.removeAll();
						loadsupplierdatastore.load({
							 url:'ClsFuGrn.php',
							 params:
					       		 {
						 	 task:"loadsupplier",
							 supplierid : 77
							 }
							 });

						loadgrnnodatastore.removeAll();
						loadgrnnodatastore.load({
							 url:'ClsFuGrn.php',
							 params:
					       		 {
						 	 task:"loadgrnno",
							 finid : GinFinid,
							 compcode : Gincompcode,
							 gstFlag : gstFlag
							 },
							callback:function()
							{
							txtGRNNo.setValue(loadgrnnodatastore.getAt(0).get('grnno'));
							}
							 });
	
					}
				}
			},'-',
			{
				text: 'Edit',
				id :'Edit',
				style  : 'text-align:center;',
				tooltip: 'Modify Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
					click: function () {
						gstFlag = "Edit";
//edit
/*
						if (gstFlag === "Edit") {
						Ext.getCmp('Confirm').setDisabled(false);
						}
						else {
						Ext.getCmp('Confirm').setDisabled(true);
						}
*/						
						flxDetail.getStore().removeAll();
			
	Ext.getCmp('cmbGRNNo').show();


						loadgrnnodatastore.removeAll();
						loadgrnnodatastore.load({
							url:'ClsFuGrn.php',
							params:
							{
								task:"loadgrnno",
								finid : GinFinid,
								compcode : Gincompcode,
								gstFlag : gstFlag
							},
							callback:function()
							{
								//cmbGRNNo.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
                                                    cmbGRNNo.setRawValue('FU');

							}
						});
  cmbGRNNo.setRawValue('FU');

					}
				}
			},'-',


//view
                {
                    text: 'View',

                    style  : 'text-align:center;',
		    id	:  'view',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {


                var dnno = 'NIL';
                if (txtDNVouNo.getRawValue() != '')
                       dnno = txtDNVouNo.getRawValue();

                printtype = "PDF";
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(cmbGRNNo.getRawValue());

		var p4 = "&vouno=" + encodeURIComponent(dnno);

                var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"));	
                var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"));	


		var param = (p1+p2+p3+p4+p5+p6) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 

                           

                        }
                    }
                },'-',  


                {
//save
                    text: 'Save',
                    id : 'save',
                    style  : 'text-align:center;',

                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                 	tabgrn.setActiveTab(1);
                 	tabgrn.setActiveTab(2);
                 	tabgrn.setActiveTab(0);
			var gstSave;
                        var remarks;

	                    gstSave="true";


        var dtgrn  = dtpGRNDate.getValue();
        var dtbill = dtpBillDate.getValue();
        var diffdays = dtgrn.getTime()-dtbill.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 





			    if( diffdays < 0  ){

             		       Ext.Msg.alert("Alert","GRN Date is Greater than Bill Date. Please check");
//				gstSave="false";
			    }


        	            if (txtSupplierName.getValue()==0 || txtSupplierName.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Supplier Name');
        	                gstSave="false";
        	            }
    	                   if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Area Name');
        	                gstSave="false";
        	            }
			   if (txtGRNNo.getRawValue() == '')
			    {
				 Ext.Msg.alert('GRN','GRN Number is empty');
				 gstSave="false";
			    }
				
    	                   if (txtBillno.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Bill Number is Empty. Please check');
        	                gstSave="false";
                                txtBillno.focus();
        	            }


			    if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Grid should not be empty');
        	                gstSave="false";
	                    } 

			    if (txtTotDebit.getValue() == 0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Error in Amount...');
        	                gstSave="false";
	                    } 



			    if (flxAccounts.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Check Value & Ledger Posting Details ');
        	                gstSave="false";
	                    } 




                            if(Number(txtTotDebit.getRawValue())!=Number(txtTotCredit.getRawValue())){
                               gstSave="false";
                                Ext.MessageBox.alert("Fuel-GRN","The Transactions Debit and Credit Amount are not  Equal");
                            }

                            if(Number(txtTotDebit.getRawValue()) == 0 || Number(txtTotCredit.getRawValue()) == 0){
                               gstSave="false";
                                Ext.MessageBox.alert("Fuel-GRN","Error in Value . please click VALUE DETAILS tab and continue");
                            }

    	                   if (Number(txtTotDebitDN.getValue()) > 0 && txtDNVouNo.getRawValue() == '' )
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Debit Note Ledger and Continue');
        	                gstSave="false";
                                txtBillno.focus();
        	            }
    	                   if (Number(cmbDNoteLedger.getValue()) ==  0 && txtDNVouNo.getRawValue() != '' )
        	            {
        	                Ext.Msg.alert('Fuel-GRN','Select Debit Note Ledger and Continue');
        	                gstSave="false";
                                txtBillno.focus();
        	            }


        	            if ( gstSave == "true")
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
		                    var grnData = flxDetail.getStore().getRange();                                        
		                    var grnupdData = new Array();
		                    Ext.each(grnData, function (record) {
		                        grnupdData.push(record.data);
		                    });

		                   
		                    var accData = flxAccounts.getStore().getRange();                                        
		                    var accupdData = new Array();
		                    Ext.each(accData, function (record) {
		                       accupdData.push(record.data);
		                    });


		                   
		            var accDataDN = flxAccountsDNOTE.getStore().getRange();                                        
		                    var accupdDataDN = new Array();
		                    Ext.each(accDataDN, function (record) {
		                       accupdDataDN.push(record.data);
		                    });


		                        remarks = "Received ";    
					var Row= flxDetail.getStore().getCount();
					flxDetail.getSelectionModel().selectAll();
					totgieno='';
					var sel=flxDetail.getSelectionModel().getSelections();
					for(var i=0;i<Row;i++)
					{
						remarks = remarks + sel[i].data.itemname + "- Qty : " + sel[i].data.grnqty + " MT Rate : "  + sel[i].data.itemrate  + "/MT" ;
					}


			var qtydiff = Number(txtBillQty.getValue())- Number(txtTicketWt.getValue());
			if (qtydiff < 0)
			    qtydiff = 0; 

                            Ext.Ajax.request({
                            url: 'TrnFuGRNSave.php',
                            params :
                             {

                             	griddet         : Ext.util.JSON.encode(grnupdData),                          
				cnt		: grnData.length,

                             	griddetacc      : Ext.util.JSON.encode(accupdData),                          
				cntacc		: accData.length,	

                             	griddetaccDN    : Ext.util.JSON.encode(accupdDataDN),                          
				cntaccDN	: accDataDN.length,	
	
				gstFlaggrn	: gstFlag,
				compcode	: Gincompcode,
                                finid		: GinFinid,

				geno		: txtGENo.getRawValue(),
				gedate		: Ext.util.Format.date(dtpGEDate.getValue(),"Y-m-d"),



				grnno		: txtGRNNo.getRawValue(),
				grndate		: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
		
		
				edgrnno		: txtGRNNo.getValue(),
                                ticketno	: cmbTicketNo.getRawValue(),
                                ticketdate 	: Ext.util.Format.date(dtpTicketDate.getRawValue(),"Y-m-d"),

                        	DNdate          : Ext.util.Format.date(dtpDNDate.getValue(),"Y-m-d"),

                                lorryno         : txtTruckNo.getValue(),

                                hsncode         : hsncode, 
                                seqno           : seqno,
                                party           : supcode,
                                payterms        : txtPayTerms.getValue(),
				areacode	: cmbArea.getValue(),
				itemvalue 	: txtTotGRNValueBill.getValue(),
				sgstper		: txtSGSTPer.getValue(),
				sgstamt		: Ext.util.Format.number(txtSGSTValue.getValue(), "0.00"),
				cgstper 	: txtCGSTPer.getValue(),
				cgstamt 	: Ext.util.Format.number(txtCGSTValue.getValue(), "0.00"),
				igstper 	: txtIGSTPer.getValue(),
				igstamt 	: Ext.util.Format.number(txtIGSTValue.getValue(), "0.00"),
                         	handlingmt	: txtHandlingPMT.getValue(),
				handlingcgst	: txtHandlingcgst.getValue(),
                                handlingsgst	: txtHandlingsgst.getValue(), 
				handlingcgstamt	: txtHandlingcgstval.getValue(),
                                handlingsgstamt	: txtHandlingsgstval.getValue(), 	
		
				tcsper 		: txtTCSPer.getValue(),
				tcsamt		: Ext.util.Format.number(txtTCSValue.getValue(), "0.00"),

				cessmt		: txtCessPerMT.getValue(),
				cessamt 	: Ext.util.Format.number(txtCessValue.getValue(), "0.00"),
			
				freight		: Ext.util.Format.number(txtFreight.getValue(), "0"),
				othrchrg	: Ext.util.Format.number(txtOtherChrges.getValue(),"0.00"),
                                roundoff	: txtroundoff.getValue(),
				totamt		: Ext.util.Format.number(txtGRNValue.getValue(), "0.00"),
				billno		: txtBillno.getRawValue(),
				billdate	: Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
				billvalue       : Number(txtBillValue.getValue()),	
				usrcode		: userid,
                                roundneed       : roundoffNeed,

                                remarks         : remarks,
                                remarksacc      : txtRemarks.getRawValue(),


                                ordseqno        : cmbPONO.getValue(),
                              	qcentno         : txtQCNo.getValue(),
//FOR DEBIT NOTE ADDITIONS
	                  	vouno   	: txtDNVouNo.getValue(),
                                dntype          : dntype, 
                                finsuffix       : invfin,
                                purledcode      : cmbPurchaseLedger.getValue(),
                                dnpurledcode    : cmbDNoteLedger.getValue(),
 
                                dncgst          : txtCGSTDN.getValue(),
                                dnsgst          : txtSGSTDN.getValue(),
                                dnigst          : txtIGSTDN.getValue(),
                                dntaxable       : txtDNValue2.getValue(),
                                debitnoteamount : txtDNPartyValue.getValue(),
                                dnqty           : txtTotDedQty.getValue(),
                                cgstledcode : cgstledcode,
		                sgstledcode : sgstledcode,
		                igstledcode : igstledcode,
                                qtydiff     : Number(qtydiff),
                                itemrate    : Number(txtMoisRate.getValue()),
                                cgstpm      : Number(txtCGSTPM.getValue()),
                                sgstpm      : Number(txtSGSTPM.getValue()),
                                igstpm      : Number(txtIGSTPM.getValue()),  
                                degvalue    : Number(txtDegradeValue.getValue()),    
                                degdebitvalue : Number(txtDegradeDebitValue.getValue()),
                                ratefinesrate :  Number(txtFinesRate.getValue()), 

				accseqno    :  Number(accseqno), 
				dnaccseqno  :  Number(dnaccseqno), 
				dnseqno     :  Number(dnseqno), 
                                grnstatus   : grn_status,   



				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{     
                                  RefreshData();                           
                                    Ext.MessageBox.alert("GRN Saved GRN No.-" + obj['GRNNo']);
                  //                  TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();

                                    RefreshData();
                                  }else
				  {
                     	Ext.MessageBox.alert("GRN Not Saved! Pls Check!");                                                  
                                    }
                                }
                           });         
   
                          	}
     				}
                            }
                        });
                    }
                        }
                    }
                },'-',  
/*
                {
			text: 'Confirm',
			id : 'Confirm',
			style  : 'text-align:center;',
			tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
			icon: '/Pictures/refresh.png',
			listeners:{
			click: function () {
			gstFlag = "Confirm";
			Ext.Msg.show({
			title: 'Confirmation',
			icon: Ext.Msg.QUESTION,
			buttons: Ext.MessageBox.YESNO,
			msg: 'Do You Want To Receipt Updation...',
			fn: function(btn)
			{
			if (btn === 'yes'){ 
			
			loadaccupdhstore.removeAll();
			loadaccupdhstore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadreceipth",
				    edgrnno	: cmbGRNNo.getValue()
				},
				callback : function() {
				
				
				receiptdt = loadaccupdhstore.getAt(0).get('rech_date');
				supledcode = loadaccupdhstore.getAt(0).get('sup_led_code');
				
				billdt = loadaccupdhstore.getAt(0).get('rech_billdate');
				billvalueh = loadaccupdhstore.getAt(0).get('rech_billvalue');
				tcsamth = loadaccupdhstore.getAt(0).get('rech_tcs_amt');
				cessmth = loadaccupdhstore.getAt(0).get('rech_cess_pmt');
				handlingmt = loadaccupdhstore.getAt(0).get('rech_handling_mt');
				cgstph = loadaccupdhstore.getAt(0).get('rech_cgst_per');
				sgstph = loadaccupdhstore.getAt(0).get('rech_sgst_per');
				igstph = loadaccupdhstore.getAt(0).get('rech_igst_per');
				chkgrnh = loadaccupdhstore.getAt(0).get('rech_no');
				frtsupledcode = loadaccupdhstore.getAt(0).get('frt_sup_led_code');
				handlingledcode = loadaccupdhstore.getAt(0).get('handling_led_code');
				
				
				loadaccupdtstore.removeAll();
				loadaccupdtstore.load({
					url: 'ClsFuGrn.php',
					params:
					{
					task:"loadreceiptt",
					edgrnno	: cmbGRNNo.getValue()
					},
					callback : function() {
					
					for(j=0;j<loadaccupdtstore.getCount();j++){
						
						chkdel = j;
						billnoh = loadaccupdtstore.getAt(j).get('rect_billno');
						chklotno = loadaccupdtstore.getAt(j).get('rect_lotno');
						itemval2 = loadaccupdtstore.getAt(j).get('rect_itemvalue2');
						billqtyt = loadaccupdtstore.getAt(j).get('rect_billqty');
						lorrynot = loadaccupdtstore.getAt(j).get('rect_lorryno');
						grnqtyt = loadaccupdtstore.getAt(j).get('rect_grnqty');
						frtval = loadaccupdtstore.getAt(j).get('rect_freightvalue');
						unloadexpt = loadaccupdtstore.getAt(j).get('rect_unloadamount');
						unloadledcode = loadaccupdtstore.getAt(j).get('rect_unloadparty');
						
		                    Ext.Ajax.request({
		                    url: 'TrnFuGRNSave.php',
		                    params :
		                     {
					gstFlaggrn	: gstFlag,
					chkdel		: chkdel,
					compcode	: Gincompcode,
		                       finid		: GinFinid,
					edgrnno  	: cmbGRNNo.getValue(),
					receiptdt	: receiptdt,
					supledcode	: supledcode,
					billnoh	: billnoh,
					billdt		: billdt,
					billvalueh	: billvalueh,
					tcsamth	: tcsamth,
					cessmth	: cessmth,
					handlingmt	: handlingmt,
					cgstph		: cgstph,
					sgstph		: sgstph,
					igstph		: igstph,
					chkgrnh	: chkgrnh,
					frtsupledcode	: frtsupledcode,
					handlingledcode : handlingledcode,
					chklotno	: chklotno,
					itemval2	: itemval2,
					billqtyt	: billqtyt,
					lorrynot	: lorrynot,
					grnqtyt	: grnqtyt,
					frtval		: frtval,
					unloadledcode	: unloadledcode, 
					unloadexpt	: unloadexpt,				


					},
		                      callback: function(options, success, response)
		                      {
		                        var obj = Ext.decode(response.responseText);
		                         if (obj['success']==="true")
						{                                
		                            Ext.MessageBox.alert("GRN Account Updtion Done -" + obj['GRNNo']);
		                            TrnGrnformpanel.getForm().reset();
		                            flxDetail.getStore().removeAll();
			
		                            RefreshData();
		                          }else
					  {
				Ext.MessageBox.alert("GRN Account Updtion Not Saved! Pls Check!- " + obj['GRNNo']);                                                  
		                            }
		                        }
		                   });  						
						
					}
					}

				});
				
				
				}
			});					
					
					
					
					
    
					}
					else {
					}

				}
				});               

			}
			}
                },'-',   
*/                           
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
			InitialData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    
                    handler: function(){ 
                            TrnGrnWindow.hide();
                        }
                        
                }]
        },
        items: [


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1285,
			height      : 130,
			x           : 10,
			y           : 0,
			border      : true,
			layout      : 'absolute',
			items:[
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGRNNo]
                            },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbGRNNo]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpGRNDate]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 700,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbTicketNo]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 700,
                                	x           : 0,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtQCNo]
                            	},


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 630,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtSupplierName]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 280,
                                	x           : 200,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbPONO]
                            },


					{ 
				        	xtype       : 'fieldset',
				        	labelWidth  : 100,
				        	width       : 350,
				        	x           : 200,
				        	y           : 60,
				            	border      : false,
				        	items: [cmbArea]
				    	},



					{ 
				        	xtype       : 'fieldset',
				        	labelWidth  : 100,
				        	width       : 350,
				        	x           : 200,
				        	y           : 80,
				            	border      : false,
				        	items: [dtpTicketDate]
				    	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 350,
                                	x           : 600,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtBillno]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 600,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpBillDate]
                            	},
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 600,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtBillValue]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 600,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtPayTerms]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 280,
                                	x           : 875,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGENo]
                            	},

               			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 45,
                                	width       : 300,
                                	x           : 1100,
                                	y           : 0,
                                    	border      : false,
                                	items: [dtpGEDate]
                            	},

	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 700,
                                	x           : 875,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtTruckNo]
                            	},
			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 875,
                            y           : 50,
                            border      : false,
                            items: [cmbPurchaseLedger]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 875,
                            y           : 75,
                            border      : false,
                            items: [cmbDNoteLedger]
                        },


                        ]
                },


		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1285,
			height      : 390,
			x           : 10,
			y           : 135,
			border      : true,
			layout      : 'absolute',
			items:[tabgrn] 
		}]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      :  600,
        width       : 1320,
 //       x	     : 20,
        y           : 35,
        title       : 'Goods Recipt Note (Fuel)',
        items       : TrnGrnformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFEF2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
 
                      dtpTicketDate.hide();
			InitialData();

//alert("Test")
	   			 }
			
		}
    });
    TrnGrnWindow.show();  
});
