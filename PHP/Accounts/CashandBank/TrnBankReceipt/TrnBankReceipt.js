/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var gstFlag;
   var GinUser = localStorage.getItem('ginusername');
   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');

    var GinFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');

   var  invfin = localStorage.getItem('invfin');

    var editfind = 0;
  // var GinUser = localStorage.getItem('gstuser');
  // var GinUserid = localStorage.getItem('ginuser');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');  

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));
    var rounding = 0;
    var cdtaxval = 0;
    var crnoteseqno = 0;
    var gstrcpttype;
    var gstPaytype;
    var totadjamtvalue;
    var gstbillnos;
    var narra;
    var totalval;
    var desc;
    var date;
    var dgadjrecord = Ext.data.Record.create([]);
    var fm = Ext.form;
    var dgaccrecord = Ext.data.Record.create([]);
    var dgrecord = Ext.data.Record.create([]);
    var dgrecord2 = Ext.data.Record.create([]);

    var fromdate;
    var todate;
    var ledgercode = 0;
    var partycode = 0;
    var accledgercode = 0;

    var quality = '';

    var invnolist = '';
    var ledtype ="G";

    var seqno = 0;
    var editrow = 0; 
    var editrow2 = 0; 
  
    var gridedit = "false";

    var ECreditNote = "N";

    var salledcode = 0;  var cgstledcode = 0; var sgstledcode = 0; var igstledcode = 0;
    var salledname = '';  var cgstledname = '';  var sgstledname = '';  var igstledname = '';

    var cdpermt = 0;
    var ratediffmt = 0;
    var totinvwt = 0;

    var lblAcctname = new Ext.form.Label({
        fieldLabel  : 'Account Name',
        id          : 'lblAcctname',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
   

 var billnolist = '';

    var lblType = new Ext.form.Label({
        fieldLabel  : 'Type',
        id          : 'lblType',
        width       : 50,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
    
    
    var lblDebit = new Ext.form.Label({
        fieldLabel  : 'Debit',
        id          : 'lblDebit',
        width       : 70,
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
  
    });
    
    var txtDebit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDebit',
        width       : 90,
        name        : 'debit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
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
    
    
    var txtQty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtQty',
        width       : 90,
        name        : 'txtQty',
        readOnly : 'true',
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

    var txtCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCredit',
        width       : 90,
        name        : 'credit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
             }
          }
        } 
    });

 var loadECNStatus = new Ext.data.Store({
      id: 'loadECNStatus',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"check_e_credit_note_status"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'E_inv_confirm'
      ]),
    });


 var loadInvVarietyDatastore = new Ext.data.Store({
      id: 'loadInvVarietyDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceVarity"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'vargrp_type_name'
      ]),
    });


 var loadLedgerListDatastore = new Ext.data.Store({
      id: 'loadLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','led_type'
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_ref','cust_type'
      ]),
    });


function getCNRemarks()
{
/*
        if (ratediffmt > 0)
           Remarks = "BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS CASH DISCOUNT Rs." + cdpermt + "/MT AND RATE DIFFERENCE Rs." + ratediffmt + "/MT AGAINST INV. NO(s) ";
        else
           Remarks = "BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS CASH DISCOUNT Rs." + cdpermt + "/MT AGAINST INV. NO(s) ";
*/

        flxAdjustDetails.getSelectionModel().selectAll();
        var selrows = flxAdjustDetails.getSelectionModel().getCount();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        gstbillnos = "";
        narra = '';
        totinvwt = 0;
	
        var getinvno = '';  
       billnolist = '';

        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.cdamount) > 0 && Number(sel[i].data.adjamt) > 0 ) {
                gstbillnos = gstbillnos + sel[i].data.invno + ",";
                totinvwt = Number(totinvwt)+ Number(sel[i].data.invwt);
                if (sel[i].data.invno.substring(0,3)  == "TN/" || sel[i].data.invno.substring(0,3)  == "OS/")
                { 
                   getinvno = sel[i].data.invno;
			if (billnolist == '')
			   billnolist +=  sel[i].data.invno;
			else
			   billnolist +=  ',' + sel[i].data.invno.substring(0,7); 
                }
            }
        }

        quality  = '';
        loadInvVarietyDatastore.removeAll();
        loadInvVarietyDatastore.load({
            url: 'clsBankReceipt.php',
            params:
                    {
                        task  :"loadInvoiceVarity",
                        compcode : GinCompcode,
                        invno : getinvno,   
                  
                    },
                     callback : function() {  
         	var cnt = loadInvVarietyDatastore.getCount();
                if (cnt > 0)
                {
                     quality  = loadInvVarietyDatastore.getAt(0).get('vargrp_type_name');   

                } 

                     }
        });




        totinvwt =  Ext.util.Format.number(totinvwt,'0.000');

        txtQty.setRawValue(totinvwt);

   //     txtRefBills.setRawValue(gstbillnos);

        var totcd_pmt =   Number(cdpermt) + Number(ratediffmt);

//        txtCNRemarks.setRawValue(Remarks+ gstbillnos+ 'Qty : ' + totinvwt + ' MTS * ' + totcd_pmt  + ' + GST = CD AMOUNT : ' + txtTotCDAmt.getRawValue()+'/-' );



     //      Remarks = "BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS CASH DISCOUNT Rs." + cdpermt + "/MT AGAINST INV. NO(s) ";

/*
        flxCD.getSelectionModel().selectAll();
        var selrows = flxCD.getSelectionModel().getCount();
        var sel = flxCD.getSelectionModel().getSelections();
        gstbillnos = "";
 
        for (var i = 0; i < selrows; i++) {

            if (Number(sel[i].data.qty) > 0 && Number(sel[i].data.CDValue) > 0 ) {
                gstbillnos = gstbillnos + 'FOR INV NO(S) ' +  sel[i].data.invno;

                gstbillnos = gstbillnos + 'CASH DISCOUNT : ' +  sel[i].data.cdpmt;
                if (Number(sel[i].data.ratediff) > 0)
                   gstbillnos = gstbillnos + 'RATE DIFF : ' +  sel[i].data.ratediff;

                gstbillnos = gstbillnos + 'QTY : ' +  sel[i].data.qty;
                gstbillnos = gstbillnos + 'VALUE : ' +  sel[i].data.CDValue;

            }
        }


         txtCNRemarks.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS " + gstbillnos );

*/
     //       flxCD.getSelectionModel().selectAll();
//            const selCD = flxCD.getSelectionModel().getSelections();

var allRows = flxCD.getStore().getRange();

var gstbillnos = '';

for (var i = 0; i < allRows.length; i++) {
    var row = allRows[i].data;
    if (Number(row.qty) > 0 && Number(row.CDValue) > 0) {
        gstbillnos += 'FOR INV NO(S) : ' + row.invno + ': ';
        gstbillnos += 'CASH DISCOUNT: Rs.' + row.cdpmt + '/MT, ';
        if (Number(row.ratediff) > 0) {
            gstbillnos += 'RATE DIFF: Rs.' + row.ratediff + '/MT, ';
        }
        gstbillnos += 'QTY: ' + row.qty + ' MTS, ';
        gstbillnos += 'VALUE: Rs.' + row.CDValue + '/- ';


   
    }
}

gstbillnos =  gstbillnos + " + GST  Total CD Amount : " + Ext.util.Format.number(txtTotCDAmt.getRawValue(),"0.00") +'/-';

txtCNRemarks.setRawValue("BEING THE AMOUNT CREDITED TO YOUR ACCOUNT TOWARDS " + gstbillnos);
        


}




var btnRemarks	 = new Ext.Button({
    style   : 'text-align:center;',
    text    : "GET Credi Note-Remarks",
    width   : 60,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){     

               getCNRemarks();

        }
    }
});  


    var btnSubmit = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Submit",
        width   : 60,
        x       : 850,
        y       : 95,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function(){
     	        flxAccounts.getSelectionModel().selectAll();

	        var selrows = flxAccounts.getSelectionModel().getCount();
	        var sel = flxAccounts.getSelectionModel().getSelections();
			var idx = flxAccounts.getStore().indexOf(editrow2);
               		sel[idx].set('ledname' , cmbAccountName.getRawValue());
			sel[idx].set('debit'   , Number(txtDebit.getRawValue()));
	 		sel[idx].set('credit'   , Number(txtCredit.getRawValue()));
                        sel[idx].set('ledcode'  , cmbAccountName.getValue());
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();

           grid_tot_acc();
            }
        }
    });

   function cmbtypechange()
   {

        if (cmbType.getValue()==1){
            txtDebit.enable();
            Ext.getCmp('txtDebit').focus(true, 1);
            txtCredit.disable();
            txtCredit.setValue("");
	    txtDebit.setValue("");	
        }else if (cmbType.getValue()==2){
            txtDebit.disable();
            txtCredit.enable();
            Ext.getCmp('txtCredit').focus(true, 1);
	    txtCredit.setValue("");	
            txtDebit.setValue("");
        }else{
            txtDebit.disable();
            txtCredit.disable();
            txtDebit.setValue("");
            txtCredit.setValue("");
        }

   }


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
                   cmbtypechange();
            },
            change: function(){
                   cmbtypechange();
            },
            select : function(){
                   cmbtypechange();
            }
        }
    });
    

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                if (gstFlag == "Edit")
                {

		Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
		    if (btn == 'ok'){
			txtReason.setRawValue(text)
 
		    }
		});
                } 

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
                  BankReceiptEntryWindow.hide();

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
        width: 400,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });



function RecordSave()
{

                        Ext.getCmp('save').setDisabled(true);  

		        var accData = flxDetail.getStore().getRange();
		        var accupdData = new Array();
		        Ext.each(accData, function (record) {
		            accupdData.push(record.data);
		        });

		        var accadjData = flxAdjustDetails.getStore().getRange();
		        var accadjupdData = new Array();
		        Ext.each(accadjData, function (record) {
		            accadjupdData.push(record.data);
		        });


		        var CreditNoteData = flxAccounts.getStore().getRange();
		        var CreditNoteupdData = new Array();
		        Ext.each(CreditNoteData, function (record) {
		            CreditNoteupdData.push(record.data);
		        });

		        Ext.Ajax.request({
		            url: 'FrmTrnBankReceiptSave.php',
		            params: {
		                griddet: Ext.util.JSON.encode(accupdData),
		                gridadjdet: Ext.util.JSON.encode(accadjupdData),
		                gridcreditnote: Ext.util.JSON.encode(CreditNoteupdData),

		                cnt: accData.length,
		                adjcnt: accadjData.length,
                	        creditnotecnt: CreditNoteData.length,

                                finsuffix :invfin,
		                finid: GinFinid,
		                finyear: gstfinyear,
		                compcode: GinCompcode,
		                accrefseq: seqno,
		                vouno: txtVouNo.getRawValue(),
		                voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
		                bankname: txtBankName.getRawValue(),
		                refno: txtRefNo.getRawValue(),
		                refdate: Ext.util.Format.date(dtpRefDate.getValue(), "Y-m-d"),
		                narration: txtNarration.getRawValue(),
		                paytype: gstPaytype,
		                paymode: cmbPaymode.getRawValue(),
		                payno: txtNo.getRawValue(),
		                paydate: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
		                headacct: cmbHeadAccount.getValue(),
		                rcptamt  : Number(txtTotCredit.getRawValue()) , //- Number(txtTotDebit.getRawValue()),
		                totadjamt: Number(txtTotNetAmt.getRawValue()),
                                usercode : GinUserid, 
                                reason   : txtReason.getRawValue(),
		                flagtype: gstFlag,

                                usercode : GinUserid,
                                qty      : txtQty.getRawValue(),


                                generateCN : 'YES',
		                CNRemarks: txtCNRemarks.getRawValue(),  
                                cgstledcode : cgstledcode,
                                sgstledcode : sgstledcode,
                                igstledcode : igstledcode,

                                salledcode  : salledcode,

                                ledgercode  : ledgercode,
                                partycode   : partycode,
                                CreditValue : txtTotCDAmt.getValue(),
                                roff        : rounding, 
                                itemname    : quality,

                                crnoteseqno : crnoteseqno,
                                cnvouno     : txtCNNo.getValue(),  
                                billnolist  : billnolist,  

		              },
		            callback: function (options, success, response)
		            {
		                var obj = Ext.decode(response.responseText);
		                if (obj['success'] === "true") {


                                    BankReceiptEntryFormPanel.remove(flxAccounts, false);
                                    tabAccounts.setActiveTab(0);
				    flxAccounts.getStore().removeAll();
                                    flxAccounts.store.clearData();
				    flxDetail.getStore().removeAll();
				    flxAccounts.getStore().removeAll();
				    RefreshData();
				    Ext.getCmp('txtAccountName').focus(false, 200);


			Ext.MessageBox.show({
			    title: "",
			    msg: "Bank Receipt Entry Saved -" + obj['vouno'],
			    icon: Ext.MessageBox.WARNING,
			    buttons: Ext.MessageBox.OK,
			    fn: function(buttonId) {
				if (buttonId === "ok") {
                                    BankReceiptEntryFormPanel.remove(flxAccounts, false);
                                    tabAccounts.setActiveTab(0);
				    flxAccounts.getStore().removeAll();
                                    flxAccounts.store.clearData();
				    flxDetail.getStore().removeAll();
				    flxAccounts.getStore().removeAll();
				    RefreshData();
				    Ext.getCmp('txtAccountName').focus(false, 200);
				}
			    }
			});

		               }
		                 else {
                               	Ext.MessageBox.alert("Bank Receipt Not Saved! Pls Check!- " + obj['vouno']);  
		                }
		            }
		        });//msg2
}

function save_click() 
{


        var saverecord = 'Y';

	Caladj();
	var rcnt = flxDetail.getStore().getCount();
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
	}
        else if (rcnt == 0) {
            Ext.MessageBox.alert("Alert", "Check Receipt Amount and Press Enter Key in the Receipt Amount");
        } 
        else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
	    Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
	} else if (rcnt <= 0) {
	    Ext.MessageBox.alert("Receipt", "Transactions Details Not Available ..");
	} else if (cmbHeadAccount.getValue() == 0) {
	    Ext.MessageBox.alert("Receipt", "Select the Head of Account");
	} else if (cmbHeadAccount.getRawValue() == '') {
	    Ext.MessageBox.alert("Receipt", "Select the Head of Account");
	} else if (txtTotNetAmt.getRawValue() <= 0 && gstPaytype == "BB") {
	    Ext.MessageBox.alert("Receipt", "You have selected Bill to Bill mode & no bills are adjusted" + totadjamtvalue);
	} else if (txtTotNetAmt.getRawValue() > 0 && gstPaytype == "AD") {
	    Ext.MessageBox.alert("Receipt", "You have to select Bill to Bill mode in order to adjust bills");
	} else if (Number(txtTotNetAmt.getRawValue()) > Number(txtTotCredit.getRawValue()) ) {
	    Ext.MessageBox.alert("Receipt", "Adjusted Amout is heigh then received amount");
	} 
        else if( Number(txtTotCDAmt.getValue()) > 0 && Number(txtDebitTotal.getValue())!=Number(txtCreditTotal.getValue())){
     Ext.MessageBox.alert("Receipt","In Credit Note,  Debit and Credit Totals are not Equal. click CREDIT NOTE tab and continue");


/*
            var diff = 0;
            diff =  Number(txtDebitTotal.getValue())-Number(txtDebitTotal.geValue()); 
            var sel1 = flxAccounts.getSelectionModel().getSelections();           		
            sel1[1].set('debit',sel1[1].get('debit')-diff);
alert(diff);
*/

        }

        else if( Number(txtTotCDAmt.getValue()) > 0 && (Number(txtDebitTotal.getValue()) == 0 || Number(txtCreditTotal.getValue())== 0 ) ){
            Ext.MessageBox.alert("Receipt","Credit Note Debit and Credit Total are not Equal. click CREDIT NOTE tab and continue")
        }
        else if( Number(txtTotNetAmt.getValue()) >  Number(txtRecAmt.getValue())  ){
            Ext.MessageBox.alert("Receipt","Adjustment amount is heigher than receipt amount. Can't save the record")
        }

        else if( Number(txttotCDValue.getValue()) > 0 && txtCNRemarks.getRawValue() == "" ){
            Ext.MessageBox.alert("Receipt","Credit Note Remark is Empty. Can't save the record")
        }


        else {
	    Caladj();
	    Ext.Msg.show({
		title: 'Receipt Voucher',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
		msg: 'Are You Sure to Add This Record?',
		fn: function (btn) {
		    if (btn == 'yes') {

                    if (Number(txtTotCDAmt.getValue()) > 0)
                    { 

                          saverecord = 'N';
                        Ext.Msg.show({
                            title: 'Confirmation Again',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'This Receipt having CREDIT NOTE . Kindly CONFIRM AGAIN to SAVE the Record..',
                            fn: function(btn)
                            {
                                if (btn === 'yes')
                                {   
                                   saverecord = 'Y';
                                   RecordSave();
                                }   
                                else
                                   saverecord = 'N';



                            }
                        });
                     }
                     else
                     {
                          saverecord = 'Y';
                     }  

                  
                     if (saverecord == 'Y' )
                     {
                        RecordSave();


                    } // save record
		    }
		}
  
	    });//msg1
	}

}


function edit_click() 
{
    gstFlag = "Edit";
    cmbVouNo.show();
	Voucherdatastore.load({
	    url: '/SHVPM/Accounts/clsAccounts.php',
	    params:
	    {
		task: "cmbvoucher",
		finid    : GinFinid,
		compcode : GinCompcode,
		voutype  :'BKR',
	    }
	});

}

function add_btn_click()
{
//alert(txtAccountName.getRawValue());
//alert(ledgercode);
//alert(ledtype);
                flxDetail.getStore().removeAll();
                flxAdjustDetails.getStore().removeAll();
                var gstInsert = "true";
                if (ledgercode == 0) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Select Ledger");
                }
                if (txtAccountName.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Select Ledger");
                }


                if (txtAccountName.getRawValue() == cmbHeadAccount.getRawValue()) {
                    gstInsert = "false";
                    Ext.MessageBox.alert("Receipt", "Select Different Ledger");
                }



                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.ledseq == ledgercode) {
                        cnt = cnt + 1;
                    }
                }
                if (gstInsert == "true")
                {
                   if (gridedit === "false")
                   { 

		        if (cnt > 0){
		            gstInsert = "false";
		            Ext.MessageBox.alert("Receipt","This Ledger Already Entered");
		        }
                   }
                   if (gridedit === "true")
                   {


			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , txtAccountName.getRawValue());
	 		sel[idx].set('cramt'   , Number(txtReceiptAmt.getRawValue()));
			sel[idx].set('ledseq'  , ledgercode);
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
			gridedit = "false";
                        CalcTotalDebitCredit();
//                        txtReceiptAmt.setRawValue('');
                        Ext.getCmp('btnAdd').setDisabled(true);  
	            }//if(gridedit === "true")
                    else
                    if  (cnt ==0){
                       if (gstInsert == "true") {

                           var totamt;
                           var RowCnt = flxDetail.getStore().getCount() + 1;
                           flxDetail.getStore().insert(
                             flxDetail.getStore().getCount(),
                             new dgrecord({
                                slno: RowCnt,
                                ledname  : txtAccountName.getRawValue(),
                 
                                cramt    : Number(txtReceiptAmt.getRawValue()),
                                dbamt    : 0,
                                ledseq   : ledgercode,

                                ledtype  : ledtype,
                             })
                            );

//                           txtReceiptAmt.setRawValue('');
                           CalcTotalDebitCredit();


                           BillAdjustingDetail();
                           Ext.getCmp('btnAdd').setDisabled(true);  
                      }
                   }
//                   txtAccountName.setRawValue('');    
//                   ledgercode = 0;   
               }
}

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
//        sortInfo:{field: 'vou_seqno', direction: "ASC"}
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

    
    var VouNodatastore2 = new Ext.data.Store({
        id: 'VouNodatastore2',
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


    
    var VouNodatastore3 = new Ext.data.Store({
        id: 'VouNodatastore3',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "ControlCreditNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_vouno'])
    });


    var LoadGSTDetailsdatastore = new Ext.data.Store({
        id: 'LoadGSTDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadInvGSTDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['acctran_accref_seqno', 'cust_acc_group','acctran_led_code', 'cust_name', 'invh_acc_refno', 'hsncode'])
    });



    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadBRVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'cust_add1','cust_type',  ,'cust_grp_code','accref_link_seqno'])
    });


    var LoadCNOTEVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadCNOTEVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCreditNoteVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','led_type', 'led_custcode' ,'cust_acc_group','accref_link_seqno'])
    });



    var LoadCNOTEAmountDetailsdatastore = new Ext.data.Store({
        id: 'LoadCNOTEAmountDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadCreditNoteAmountDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['dbcrt_seqno', 'dbcrt_inv_no', 'dbcrt_inv_date', 'dbcrt_grossvalue', 'dbcrt_value', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_igstper', 'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode', 'dbcrt_tcsvalue', 'dbcrt_tcsper', 'dbcrt_tcsledcode', 'dbcrt_otheramt', 'dbcrt_otherledcode', 'dbcrt_rounding', 'dbcrt_frtamt', 'dbcrt_frtledcode', 'dbcrt_taxable'])
    });


    var LoadAdjustmentDetailsdatastore = new Ext.data.Store({
        id: 'LoadAdjustmentDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
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
'acctrail_gracedays','invh_crd_days', 'invh_grace_days',  'ordh_payterm_30days_7days_receipt', 'ordh_payterm_45days_7days_receipt', 'ordh_payterm_45days_30days_receipt', 'ordh_payterm_60days_7days_receipt', 'ordh_payterm_60days_30days_receipt', 'ordh_payterm_60days_45days_receipt',  'ordh_payterm_90days_7days_receipt', 'ordh_payterm_90days_30days_receipt', 'ordh_payterm_90days_45days_receipt',  'ordh_payterm_90days_60days_receipt', 'ordh_payterm_90days_75days_receipt','invwt', 'invh_taxableamt','rate_cashdisc_per','invh_cgst_per','invh_sgst_per', 'invh_igst_per','invh_frt_amt', 'dbcrt_inv_no', 'dbcrt_taxable', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_value', 'dbcrt_igstper', 'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode','ordh_ratediff'
])
    });




    var LoadInvoiceCashDiscountDetailsdatastore = new Ext.data.Store({
        id: 'LoadInvoiceCashDiscountDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsBankReceipt.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "loadInvoiceCashDiscountDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
 'dbcrt_inv_no', 'dbcrt_taxable', 'dbcrt_igstvalue', 'dbcrt_cgstvalue', 'dbcrt_sgstvalue', 'dbcrt_value', 'dbcrt_igstper', 'dbcrt_cgstper', 'dbcrt_sgstper', 'dbcrt_igstledcode', 'dbcrt_cgstledcode', 'dbcrt_sgstledcode'
])
    });

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
            {name: 'led_type', type: 'string', mapping: 'led_type'},
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });

    var LoadAddnl_CDDays_Detdatastore = new Ext.data.Store({
        id: 'LoadAddnl_CDDays_Detdatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'clsBankReceipt.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "load_Addnl_CD_Days"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cust_addnl_cd_days'
])
    });


    var ReceiptAdjBillDetdatastore = new Ext.data.Store({
        id: 'ReceiptAdjBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getrcptadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno', 'accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_comp_code',
            'accref_finid', 'acctrail_inv_no', 'acctrail_inv_date', 'acctrail_inv_date2','acctrail_inv_value',
            'acctrail_adj_value', 'acctran_cramt', 'acctran_dbamt', 'dbcr_invvalue', 'acctrail_crdays', 'acctrail_gracedays','invh_crd_days', 'invh_grace_days','ordh_payterm_30days_7days_receipt', 'ordh_payterm_45days_7days_receipt', 'ordh_payterm_45days_30days_receipt','ordh_payterm_60days_7days_receipt',
 'ordh_payterm_60days_30days_receipt' ,'ordh_payterm_45days_7days_receipt', 'ordh_payterm_45days_30days_receipt',
'ordh_payterm_60days_7days_receipt',  'ordh_payterm_60days_30days_receipt', 'ordh_payterm_60days_45days_receipt',
'ordh_payterm_90days_7days_receipt','ordh_payterm_90days_30days_receipt','ordh_payterm_90days_45days_receipt','ordh_payterm_90days_60days_receipt',
'ordh_payterm_90days_75days_receipt','invwt','invh_taxableamt','rate_cashdisc_per','invh_cgst_per','invh_sgst_per','invh_igst_per','invh_frt_amt',
'ordh_ratediff'

])
    });

    var OpeningBillDetdatastore = new Ext.data.Store({
        id: 'OpeningBillDetdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "getobadjbilldet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ob_seqno', 'ob_vou_no', 'ob_vou_date', 'ob_comp_code', 'ob_fin_id', 'ob_led_code', 'ob_ref_no',
            'ob_ref_date', 'ob_totamt', 'ob_adjamt', 'ob_cramt', 'ob_dbamt', 'dbcr_invvalue',
'invno', 'invdate', 'invamt', 'adjamt', 'pendingamt', 'acctrail_led_code', 'accref_comp_code', 'accref_finid', 'accref_seqno', 'accref_vouno', 'accref_vou_type'
])
    });

    var BillDetailDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'BillDetailDataStore'
        }, ['invno', 'invdate', 'invamt', 'dbcramt', 'totamt', 'pendingamt', 'adjamt', 'voutype', 'balamt',
            'accrefseqno', 'accrefvouno',
  'acctrail_led_code', 'accref_comp_code', 'accref_finid', 'accref_seqno', 'accref_vouno', 'accref_vou_type',
'invh_crd_days', 'invh_grace_days','ordh_payterm_30days_7days_receipt ', 'ordh_payterm_60days_30days_receipt' , 'ordh_payterm_60days_45days_receipt'

])
    });

    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'AccountDetDataStore'
        }, ['slno', 'ledname', 'currency', 'amount', 'exgrate', 'type', 'dbamt', 'cramt', 'ledseq', 'curseq', 'totamt'])
    });

    var Currencydatastore = new Ext.data.Store({
        id: 'Currencydatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbcurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cur_code', type: 'int', mapping: 'currency_code'},
            {name: 'cur_name', type: 'string', mapping: 'currency_symbol'}
        ]),
        sortInfo: {field: 'cur_code', direction: "ASC"}
    });

    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadAllLedgerList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });

    var HeadAccountdatastore = new Ext.data.Store({
        id: 'HeadAccountdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbbankacct"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ]),
        sortInfo: {field: 'cust_name', direction: "ASC"}
    });

    function remarkfun() {
        Caladj();
//        txtRefBills.setRawValue('');
        txtNarration.setRawValue("");
        flxAdjustDetails.getSelectionModel().selectAll();
        var selrows = flxAdjustDetails.getSelectionModel().getCount();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        gstbillnos = "";
        narra = '';
        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.adjamt) > 0) {
                gstbillnos = gstbillnos + sel[i].data.invno + ",";
            }
        }
   //     txtRefBills.setRawValue(gstbillnos);
        txtNarration.setRawValue("RECEIVED VIDE " + txtBankName.getRawValue() + " - " + cmbPaymode.getRawValue() + " No. " + txtRefNo.getRawValue() +   "  Dated : " + dtpRefDate.getRawValue() + "      " + "RefNo:" + gstbillnos  );
    }

    function Caladj() {
        flxAdjustDetails.getSelectionModel().selectAll();
        var selrows = flxAdjustDetails.getSelectionModel().getCount();
        var sel = flxAdjustDetails.getSelectionModel().getSelections();
        totadjamtvalue = 0;
        for (var i = 0; i < selrows; i++) {
            if (Number(sel[i].data.adjamt) > 0) {
                totadjamtvalue = Number(totadjamtvalue) + Number(sel[i].data.adjamt);
            }
        }
        txtTotNetAmt.setValue(totadjamtvalue);
    }



    function CalcTotalDebitCredit() {



        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();

        var gincdamt = 0;  
        var gincdval = 0;      
        var gindbtotal = 0;
        var gincrtotal = 0;

        var gincgstamt = 0;
        var ginsgstamt = 0;
        var ginigstamt = 0;   

        for (var i = 0; i < selrows; i++) {

            if (Number(sel[i].data.adjamt) == 0 && Number(sel[i].data.cdamount) > 0 )
            {
                    var rec = flxAdjustDetails.getStore().getAt(i);
                    rec.set('adjamt', 0);
                    rec.set('cdvalue', 0);
                    rec.set('cgstamount', 0);
                    rec.set('sgstamount', 0);
                    rec.set('igstamount', 0);
                    rec.set('cdamount', 0);
            }  

            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
            gincdamt   = gincdamt   + Number(sel[i].data.cdamount);
            gincdval   = gincdval   + Number(sel[i].data.cdvalue);

            gincgstamt = gincgstamt   + Number(sel[i].data.cgstamount);
            ginsgstamt = ginsgstamt   + Number(sel[i].data.sgstamount);
            ginigstamt = ginigstamt   + Number(sel[i].data.igstamount);
        }

        txtTotDebit.setValue(gindbtotal);
        txtTotCredit.setValue(gincrtotal);
        txtTotCDAmt.setValue(gincdamt);
        txtTotCDValue.setValue(gincdval);

        txtTotCGSTAmount.setValue(gincgstamt);
        txtTotSGSTAmount.setValue(ginsgstamt);
        txtTotIGSTAmount.setValue(ginigstamt);


        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));



        if (gstFlag == "Edit" && crnoteseqno > 0 && Number(gincdamt) == 0 )
        {
             alert("You can't remove all adjustments. Because Alreday credit note generated..")
             Ext.getCmp('save').setDisabled(true);  
alert("1");             
        }               
        else
        {
             Ext.getCmp('save').setDisabled(false);               
        }               



        flxaccupdation(); 
    }

    function BillAdjustingDetail() {

        var pendamt = 0;
        var balamt = 0;
        txtAddnlCDDays.setValue(0);

            LoadAddnl_CDDays_Detdatastore.removeAll();
            LoadAddnl_CDDays_Detdatastore.load({
                url: 'clsBankReceipt.php',
                params:
                        {
                            task: "load_Addnl_CD_Days",
                            custcode : partycode,
                        },
                callback: function () {
         	var cnt = LoadAddnl_CDDays_Detdatastore.getCount();
                if (cnt > 0)
                {
                     txtAddnlCDDays.setValue(LoadAddnl_CDDays_Detdatastore.getAt(0).get('cust_addnl_cd_days'));   
                } 
                }
            });  


        if (flxDetail.getStore().getCount() == 1 && gstPaytype === "BB") {
            var ginledcode = flxDetail.getStore().getAt(0).get('ledseq');


            ReceiptAdjBillDetdatastore.removeAll();
            ReceiptAdjBillDetdatastore.load({
                url: '/SHVPM/Accounts/clsAccounts.php',
                params:
                        {
                            task: "getrcptadjbilldet",
                            finid: GinFinid,
                            ledcode: ledgercode , //ginledcode,
                            compcode: GinCompcode
                        },
                callback: function () {
                    var RowCnt = ReceiptAdjBillDetdatastore.getCount();

                    for (var i = 0; i < RowCnt; i++) {
                        pendamt = Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
                                  Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value'));
                        pendamt = pendamt.toFixed(2); 
                        pendamt =  Ext.util.Format.number(pendamt,'0.00');

                        var tax = ReceiptAdjBillDetdatastore.getAt(i).get('invh_taxableamt')-ReceiptAdjBillDetdatastore.getAt(i).get('invh_frt_amt');
//alert(tax);
//alert(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'));


                        flxAdjustDetails.getStore().insert(
                                flxAdjustDetails.getStore().getCount(),
                                new dgadjrecord({
                                    invno: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_no'),
                                    invdate: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date'),
                                    invdate2: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_date2'),
                                    payterms: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_crdays'),
                                    grdays: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_gracedays'),

                                    invamt: ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value'),
                                    dbcramt: ReceiptAdjBillDetdatastore.getAt(i).get('dbcr_invvalue'),
                                    totamt: 0,
                                    pendingamt:Ext.util.Format.number(pendamt,'0.00'),
                                    pendingamt2:Ext.util.Format.number(pendamt,'0.00'),

                                    adjamt: 0,
                                    voutype: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vou_type'),
 //                                   balamt: Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_inv_value')) -
//                                            Number(ReceiptAdjBillDetdatastore.getAt(i).get('acctrail_adj_value')),
                                    balamt:Ext.util.Format.number(pendamt,'0.00'),
                                    accrefseqno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_seqno'),
                                    accrefvouno: ReceiptAdjBillDetdatastore.getAt(i).get('accref_vouno'),

                                    crddays: ReceiptAdjBillDetdatastore.getAt(i).get('invh_crd_days'),

                                    PMT30dayscdamt: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_30days_7days_receipt'),

                                    PMT45dayscdamt1: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_45days_7days_receipt'),
                                    PMT45dayscdamt2: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_45days_30days_receipt'),


                                    PMT60dayscdamt1: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_60days_7days_receipt'),
                                    PMT60dayscdamt2: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_60days_30days_receipt'),
                                    PMT60dayscdamt3: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_60days_45days_receipt'),


                                    PMT90dayscdamt1: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_90days_7days_receipt'),
                                    PMT90dayscdamt2: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_90days_30days_receipt'),
                                    PMT90dayscdamt3: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_90days_45days_receipt'),
                                    PMT90dayscdamt4: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_90days_60days_receipt'),
                                    PMT90dayscdamt5: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_payterm_90days_75days_receipt'),


                                    ratediff: ReceiptAdjBillDetdatastore.getAt(i).get('ordh_ratediff'),
                                    invwt: ReceiptAdjBillDetdatastore.getAt(i).get('invwt'),
                                    taxable: tax,
                                    cdper: ReceiptAdjBillDetdatastore.getAt(i).get('rate_cashdisc_per'),

//                                    cdvalue : 0,
                                    cgstper  : ReceiptAdjBillDetdatastore.getAt(i).get('invh_cgst_per'),
                                    cgstamount: 0,
                                    sgstper  : ReceiptAdjBillDetdatastore.getAt(i).get('invh_sgst_per'),
                                    sgstamount: 0,
                                    igstper  : ReceiptAdjBillDetdatastore.getAt(i).get('invh_igst_per'),
                                    igstamount: 0,
                                    cdamount: 0,

                                })
                                );
                    }
 getAdjustmentDetails2();

       LoadInvoiceCashDiscountDetailsdatastore.removeAll();
       LoadInvoiceCashDiscountDetailsdatastore.load({
           url: 'clsBankReceipt.php',
           params: {
	        task  : 'loadInvoiceCashDiscountDetails',
                seqno : seqno,
                compcode : GinCompcode,
                crnoteseqno : crnoteseqno,
          },

          callback: function () {
              var cnt=LoadInvoiceCashDiscountDetailsdatastore.getCount();

              if (cnt>0)
              {

                     for (var j = 0; j < cnt; j++) {

                     invoiceno  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_inv_no');
                     invoiceno  =invoiceno.substring(0,13);
                     invoiceno  =invoiceno.trim();

                     cdamt  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_value');
                     cdtax  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_taxable');
                     cgst  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_cgstvalue');
                     sgst  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_sgstvalue');
                     igst  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_igstvalue');
                     cgstled  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_cgstledcode');
                     sgstled  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_sgstledcode');
                     igstled  = LoadInvoiceCashDiscountDetailsdatastore.getAt(j).get('dbcrt_igstledcode');


			flxAdjustDetails.getSelectionModel().selectAll();
			var selrows = flxAdjustDetails.getSelectionModel().getCount();
			var sel = flxAdjustDetails.getSelectionModel().getSelections();
		        reccount = 0;  
			for (var i = 0; i < selrows; i++) {

				if (sel[i].data.invno == invoiceno ) {
                                    pendamt = Number(sel[i].data.pendingamt) + Number(cdamt);

			            sel[i].set('cdvalue', cdtax);
			            sel[i].set('cgstamount', cgst);
			            sel[i].set('sgstamount', sgst);
			            sel[i].set('igstamount', igst);
			            sel[i].set('cdamount', cdamt);
	           	            sel[i].set('pendingamt', pendamt);
                    	            sel[i].set('pendingamt2', pendamt);
  
//                                    pendingamt:Ext.util.Format.number(pendamt,'0.00'),
//                                    pendingamt2:Ext.util.Format.number(pendamt,'0.00'),






		                }
		         }
                     }
                    CalcSum(); 
                       flxAccounts.getStore().removeAll();
     if (crnoteseqno > 0)
               { 


                          LoadGSTDetailsdatastore.removeAll();
     	                   LoadGSTDetailsdatastore.load({
                           url: 'clsBankReceipt.php',
	                   params: {
			        task: 'LoadInvGSTDetails',
                                seqno : crnoteseqno,
	                  },
		          callback: function () {
                              var cnt=LoadGSTDetailsdatastore.getCount();
                              if (cnt>0)
                              {


                                  for(var j=0; j<cnt; j++) 
                                  {

                                    if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 72)
                                    {  
                                   salledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   salledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                                    if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1644  )
                                    {  
                                   cgstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   cgstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                              if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1645  )
                                    {  
                                   sgstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   sgstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                              if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1646  )
                                    {  
                                   igstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   igstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
//alert(salledname);
//alert(cgstledname);

                              }
                             }
                          } 
                          });



                       flxAccounts.getStore().removeAll();
                       LoadCNOTEVouNoDetailsdatastore.removeAll();
     	               LoadCNOTEVouNoDetailsdatastore.load({
                           url: 'clsBankReceipt.php',
	                   params: {
			        task: 'LoadCreditNoteVoucherDetails',
			        fincode  : GinFinid,
			        compcode : GinCompcode,
                                cnseqno  : crnoteseqno,
	                  },
		          callback: function () {
                              var cnt1=LoadCNOTEVouNoDetailsdatastore.getCount();
                              if (cnt1>0)
                              {

                                      txtCNNo.setValue(LoadCNOTEVouNoDetailsdatastore.getAt(0).get('accref_vouno'));   
                                      txtCNRemarks.setValue(LoadCNOTEVouNoDetailsdatastore.getAt(0).get('accref_narration'));

                                   for (var jj = 0; jj < cnt1; jj++) { 


                                      var drcr = ''; 
                                      if (LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';


 var ledgername = LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('cust_name');  


                                      flxAccounts.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : ledgername,                          	
			                     type    : drcr,
	                                     dbamt   : LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('acctran_dbamt'),
					     cramt   : LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('acctran_cramt'),  
                                             totamt  : Number(LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('acctran_dbamt'))+ Number(LoadCNOTEVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('acctran_led_code'), 
                                             ledtype : LoadCNOTEVouNoDetailsdatastore.getAt(jj).get('led_type'),
	                                  })
                                      );
                                    }
                                  }

                          }


           
                      });  
                 }    

                 editfind = 0;

              }   
 
          }
      });



                    CalcSum();
            
//        RefreshGridData();

                }
            });
        } else if (flxDetail.getStore().getCount() > 1) {
            if (Number(txtTotNetAmt.getRawValue()) > Number(txtRecAmt.getRawValue())) {
                var sm = flxAdjustDetails.getSelectionModel();
                var selrow = sm.getSelected();
                var rcnt = flxAdjustDetails.getStore().getCount();
                for (var i = 0; i < rcnt; i++) {
                    var rec = flxAdjustDetails.getStore().getAt(i);
                    rec.set('adjamt', 0);
                    rec.set('cdvalue', 0);
                    rec.set('cgstamount', 0);
                    rec.set('sgstamount', 0);
                    rec.set('igstamount', 0);
                    rec.set('cdamount', 0);
                    rec.set('pendingamt2', selrow.get('pendingamt')); 
                }
                CalcSum();
            }
        }
    }

    function CalcSum() {

        var selrows = flxAdjustDetails.getStore().getCount();
        var ginadjtotal = 0;
        var gincdval = 0;  
        var gincdamt = 0;    

        var gincgstamt = 0;
        var ginsgstamt = 0;
        var ginigstamt = 0;   



        gstbillnos = "";
        narra = '';
        txtTotNetAmt.setValue("");
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (rec.get('voutype') !== "AD") {
                if (Number(rec.get('adjamt')) > 0 ) {
                    ginadjtotal = ginadjtotal + Number(rec.get('adjamt'));
                    gincdamt = gincdamt + Number(rec.get('cdamount'));

                     if (isNaN(Number(rec.get('cdvalue')))) 
                        gincdval = gincdval;

                     else
                        gincdval = gincdval + Number(rec.get('cdvalue'));

                    gincgstamt = gincgstamt   + Number(rec.get('cgstamount'));
                    ginsgstamt = ginsgstamt   + Number(rec.get('sgstamount'));
                    ginigstamt = ginigstamt   + Number(rec.get('igstamount'));


                       }

            }
                   if (rec.get('adjamt') == 0 )
                   {

			  rec.set('cdvalue', 0);
			  rec.set('cgstamount', 0);
			  rec.set('sgstamount', 0);
			  rec.set('igstamount', 0);
			  rec.set('cdamount', 0);
			  rec.set('cdmt', 0);
                   } 

        }

        var newcdamount = Number(gincdval) + Number(gincgstamt) + Number(ginsgstamt) + Number(ginigstamt);  
      
        newcdamount =  Math.round(newcdamount*100/100); 




        txtTotNetAmt.setValue(ginadjtotal);
//        txtTotCDAmt.setValue(gincdamt);
        txtTotCDAmt.setValue(newcdamount);
        txtTotCDValue.setValue(gincdval);

        txtTotCGSTAmount.setValue(gincgstamt);
        txtTotSGSTAmount.setValue(ginsgstamt);
        txtTotIGSTAmount.setValue(ginigstamt);



        if (gstFlag == "Edit" && crnoteseqno > 0 && Number(newcdamount) == 0 )
        {
             alert("You can't remove all adjustments. Because Alreday credit note generated..")
             Ext.getCmp('save').setDisabled(true); 
              

        }               
        else
        {
            if (ECreditNote == "N")
                Ext.getCmp('save').setDisabled(false);               
            else
                Ext.getCmp('save').setDisabled(true);               

        }    



       flxaccupdation(); 
    }


/*
    function RefreshGridData() {

        txtReceiptAmt.setValue("");

        txtAccountName.setValue("");
    }


 function RefreshGridData() {

        txtReceiptAmt.setValue("");
        txtAccountName.setRawValue("");
        gstFlag = "Add";
        flxLedger.hide();
        dtpVouDate.focus();

        gstrcpttype = "BANK RECEIPTS";
//        gstPaytype = "BB";


        loadLedgerListDatastore.removeAll();
        loadLedgerListDatastore.load({
            url: 'clsBankReceipt.php',
            params:
                    {
                        task      : "loadLedgerlist",
                         
                    },
                     callback : function() {  
			const input = document.getElementById('dtpVouDate');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
                     }
        });


        HeadAccountdatastore.removeAll();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task      : "cmbcashacct",
                        compcode  : GinCompcode,
                         
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); 

                     cmbHeadAccount.setValue(1653);
                     }
        });

                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'BKR'
                        },
                        callback: function(){

                                       if (GinFinid >= 24)  
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


                                     vno =  "BKR/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtVouNo.setValue(vno);
                                  }
                                  else
                                  {
                                      txtVouNo.setRawValue("BKR"+VouNodatastore.getAt(0).get('con_value'));
                                  } 
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
        headcode = '2139';
        cmbVouNo.hide();
    }
*/
    var txtVouNo = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtVouNo',
        width: 120,
        name: 'txtVouNo',
        readOnly : 'true',
        enableKeyEvents: true,
        listeners: {

        }
    });


    var txtCNNo = new Ext.form.TextField({
        fieldLabel: 'Credit Note No.',
        id: 'txtCNNo',
        width: 130,
        name: 'txtCNNo',
        readOnly : 'true',
        enableKeyEvents: true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        listeners: {

        }
    });



function getAdjustmentDetails()
{

   var invoiceno = '';
   var adjusted = 0;
   var rowadjusted = 0;
//   flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsBankReceipt.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
                compcode : GinCompcode,
                crnoteseqno : crnoteseqno,
          },

          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {
	       Ext.getCmp("optBill").setValue(true);
               gstPaytype === "BB";	



               BillAdjustingDetail();

              }   
              else
              {
            	    Ext.getCmp("optAdv").setValue(true);
                    gstPaytype === "AD";              
              }   
          }
      });  
}   


function getAdjustmentDetails2()
{


   var invoiceno = '';
   var adjusted = 0;
   var adjusted2 = 0;
   var rowadjusted = 0;
   var rowpending = 0;
   var reccount = 0;
  //  flxAdjustDetails.getStore().removeAll();
       LoadAdjustmentDetailsdatastore.removeAll();
       LoadAdjustmentDetailsdatastore.load({
           url: 'clsBankReceipt.php',
           params: {
	        task  : 'LoadBillAdjustmentDetails',
                seqno : seqno,
                crnoteseqno : crnoteseqno,
                compcode : GinCompcode,
          },
          callback: function () {
              var cnt=LoadAdjustmentDetailsdatastore.getCount();

              if (cnt>0)
              {
      
               for(var j=0; j< cnt; j++) 
               {


   cdvalue= 0;
   taxable= 0;
   cdamt= 0;
   cgstamount= 0;
   sgstamount= 0;
   igstamount= 0;

// Annadurai




//alert(LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_ratediff'));
                        invoiceno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invno');
                        adjusted2 = Number(LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjamount'));
	                invdate  = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_invdate');




		        invamt  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_inv_value');
		        crdays  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_crdays');
                        grdays  =  LoadAdjustmentDetailsdatastore.getAt(j).get('acctrail_gracedays'); 
		        
                        voutype =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvoutype');

		        accrefseqno =  LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjseqno');
		        accrefvouno = LoadAdjustmentDetailsdatastore.getAt(j).get('ref_adjvouno');

                        crddays = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_crd_days');

                        ratediff = LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_ratediff');
                        ratediffmt = LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_ratediff');


		        PMT30dayscdamt = LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_30days_7days_receipt');


		        PMT45dayscdamt1 = LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_45days_7days_receipt');
		        PMT45dayscdamt2 = LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_45days_30days_receipt');


                        PMT60dayscdamt1 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_60days_7days_receipt');
                        PMT60dayscdamt2 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_60days_30days_receipt');
                        PMT60dayscdamt3 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_60days_45days_receipt');


                        PMT90dayscdamt1 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_90days_7days_receipt');
                        PMT90dayscdamt2 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_90days_30days_receipt');
                        PMT90dayscdamt3 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_90days_45days_receipt');
                        PMT90dayscdamt4 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_90days_60days_receipt');
                        PMT90dayscdamt5 =  LoadAdjustmentDetailsdatastore.getAt(j).get('ordh_payterm_90days_75days_receipt');



                        if (PMT30dayscdamt > 0)
                           cdpermt = PMT30dayscdamt;


                        if (PMT45dayscdamt1 > 0)
                           cdpermt = PMT45dayscdamt1;
                        if (PMT45dayscdamt2 > 0)
                           cdpermt = PMT45dayscdamt2;


                        if (PMT60dayscdamt1 > 0)
                           cdpermt = PMT60dayscdamt1;

                        if (PMT60dayscdamt2 > 0)
                           cdpermt = PMT60dayscdamt2;

                        if (PMT60dayscdamt3 > 0)
                           cdpermt = PMT60dayscdamt3;


                        if (PMT90dayscdamt1 > 0)
                           cdpermt = PMT90dayscdamt1;
                        if (PMT90dayscdamt2 > 0)
                           cdpermt = PMT90dayscdamt2;
                        if (PMT90dayscdamt3 > 0)
                           cdpermt = PMT90dayscdamt3;

                        if (PMT90dayscdamt4 > 0)
                           cdpermt = PMT90dayscdamt4;

                        if (PMT90dayscdamt5 > 0)
                           cdpermt = PMT90dayscdamt5;



                        invwt    =  LoadAdjustmentDetailsdatastore.getAt(j).get('invwt');
                        taxable = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_taxableamt')-LoadAdjustmentDetailsdatastore.getAt(j).get('invh_frt_amt');
                        cdper = LoadAdjustmentDetailsdatastore.getAt(j).get('rate_cashdisc_per');
                        cdvalue = LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_taxable');
                        cgstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_cgst_per');
                        cgstamount= LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_cgstvalue');
                        sgstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_sgst_per');
                        sgstamount= LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_sgstvalue');
                        igstper  = LoadAdjustmentDetailsdatastore.getAt(j).get('invh_igst_per');
                        igstamount= LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_igstvalue');




                        cdamt = 0;
                        cdtaxval  = LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_taxable');
                        cdamt  = LoadAdjustmentDetailsdatastore.getAt(j).get('dbcrt_value');

                        rowadjusted = 0;  
                        rowpending= 0;  

			flxAdjustDetails.getSelectionModel().selectAll();
			var selrows = flxAdjustDetails.getSelectionModel().getCount();
			var sel = flxAdjustDetails.getSelectionModel().getSelections();
                        reccount = 0;  

        dtpInvDate.setValue(Ext.util.Format.date(invdate, "Y-m-d"));

        var dt_inv = dtpInvDate.getValue();


        var dt_coll = dtpRefDate.getValue();

        var diffdays = dt_coll.getTime()-dt_inv.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        diffdays = diffdays - Number(txtAddnlCDDays.getValue());  
        var PTGD = Number(crdays) + Number(grdays);
        var cdpermt_new = 0;
        if (PTGD <= 7 )
           cdpermt_new = 0;
        if (PTGD == 30 && diffdays < 11)
           cdpermt_new = PMT30dayscdamt;
        else if (PTGD == 45 && diffdays < 11)
           cdpermt_new = PMT45dayscdamt1;
        else if (PTGD == 45 && diffdays <= 35)
           cdpermt_new = PMT45dayscdamt2;
        else if (PTGD == 60 && diffdays < 11)
           cdpermt_new = PMT60dayscdamt1;
        else if (PTGD == 60 && diffdays <= 35)
           cdpermt_new = PMT60dayscdamt2;
        else if (PTGD == 60 && diffdays <= 45)
           cdpermt_new = PMT60dayscdamt3;
        else if (PTGD == 90 && diffdays < 11)
           cdpermt_new = PMT60dayscdamt1;
        else if (PTGD == 90 && diffdays <= 35)
           cdpermt_new = PMT60dayscdamt2;
        else if (PTGD == 90 && diffdays <= 45)
           cdpermt_new = PMT60dayscdamt3;
        else if (PTGD == 90 && diffdays <= 60)
           cdpermt_new = PMT60dayscdamt4;
        else if (PTGD == 90 && diffdays <= 75)
           cdpermt_new = PMT90dayscdamt5;

			for (var i = 0; i < selrows; i++) {

			        if (sel[i].data.invno == invoiceno ) {



		                    rowadjusted = Number(sel[i].data.adjamt) + Number(adjusted2) ;
		 //                   rowpending = Number(sel[i].data.pendingamt) + Number(adjusted);
	                           rowpending = Number(sel[i].data.pendingamt) ;
		                    sel[i].set('adjamt', rowadjusted);
		                    sel[i].set('pendingamt', rowpending);
		                    sel[i].set('cdvalue', cdtaxval);
		                    sel[i].set('taxable', cdtaxval);
		                    sel[i].set('cdmt', cdpermt_new);
		                    reccount = reccount+1;
				}
                        }




		        if  (reccount == 0 )
		        {  


                        var RowCnt = flxAdjustDetails.getStore().getCount()+1 ;

		        flxAdjustDetails.getStore().insert(
		                flxAdjustDetails.getStore().getCount(),
		                new dgrecord2({
		                    invno: invoiceno,
		                    invdate: invdate,

		                    invdate2:   Ext.util.Format.date(invdate, "d-m-Y"),

		                    invamt: invamt,
		                    payterms: crdays,
		                    totamt: invamt,
		                    pendingamt: adjusted ,
		                    pendingamt2: adjusted ,

		                    adjamt: adjusted2,
		                    voutype: voutype,
	

		                    accrefseqno: accrefseqno,
		                    accrefvouno: accrefvouno,
                                    PMT30dayscdamt: PMT30dayscdamt,
                                    crddays: crddays,
                                    grdays : grdays,
                                    ratediff: ratediff,
                                    invwt: invwt,
                                    taxable: taxable,
                                    cdper: cdper,

                                    cdvalue : cdtaxval,
                                    cgstper  : cgstper,
                                    cgstamount: cgstamount,
                                    sgstper  : sgstper,
                                    sgstamount: sgstamount,
                                    igstper  : igstper,
                                    igstamount: igstamount,
                                    cdamount: cdamt,

		                    PMT45dayscdamt1 :PMT45dayscdamt1,
		                    PMT45dayscdamt2 :PMT45dayscdamt2,


                                    PMT60dayscdamt1: PMT60dayscdamt1,
                                    PMT60dayscdamt2: PMT60dayscdamt2,
                                    PMT60dayscdamt3: PMT60dayscdamt3,

                                    PMT90dayscdamt1: PMT90dayscdamt1,
                                    PMT90dayscdamt2: PMT90dayscdamt2,
                                    PMT90dayscdamt3: PMT90dayscdamt3,
                                    PMT90dayscdamt4: PMT90dayscdamt4,
                                    PMT90dayscdamt5: PMT90dayscdamt5,
                                    cdmt           : cdpermt_new,


		                })
		                );

adjusted = 0;

		                CalcSum();
		        }
                        grid_move();
	                CalcSum();

		}



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

  

    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 120,
        store: Voucherdatastore,
        displayField: 'vou_no',
        valueField: 'vou_seqno',
        hiddenName: 'vou_no',
        id: 'cmbVouNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners:{
           select: function(){

               //        Ext.getCmp('editchk').show();

                       ECreditNote = "N";
                       flxAdjustDetails.getStore().removeAll();
                       flxAccounts.getStore().removeAll();
                       flxDetail.getStore().removeAll();
                       LoadVouNoDetailsdatastore.removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: 'clsBankReceipt.php',
	                   params: {
			        task: 'LoadBRVoucherDetails',
			        fincode : GinFinid,
			        compcode: GinCompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {

                                  editfind = 0;

                                  crnoteseqno  = LoadVouNoDetailsdatastore.getAt(0).get('accref_link_seqno');


txtAccountName.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('cust_name'));
txtReceiptAmt.setRawValue(LoadVouNoDetailsdatastore.getAt(0).get('acctran_cramt'));
      
      
                                      ledtype = LoadVouNoDetailsdatastore.getAt(0).get('cust_type');
                                      ledgercode = LoadVouNoDetailsdatastore.getAt(0).get('acctran_led_code');
                                      partycode = LoadVouNoDetailsdatastore.getAt(0).get('acctran_led_code');


                                  for(var j=0; j<cnt; j++) 
                                  {
           
//alert(LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'));

                                      if (Number(LoadVouNoDetailsdatastore.getAt(j).get('cust_acc_group')) == 42)
                                        cmbHeadAccount.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'));
//                                      else                                             

                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());

      
                                      cmbPaymode.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_paymode'));
                                      dtpVouDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      txtBankName.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_bank_name'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';



                                      if (Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')) >0)

                                      {
                                      ledtype = LoadVouNoDetailsdatastore.getAt(j).get('cust_type');
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
			                   })
		                           );
                                      }
                                  }


if (crnoteseqno > 0)
    Ext.getCmp('optPayType').setDisabled(true);  
else
    Ext.getCmp('optPayType').setDisabled(false);  



               CalcTotalDebitCredit();
               getAdjustmentDetails();
               EditDateCheck();


                            if (crnoteseqno  > 0)
                            {




		               loadECNStatus.removeAll();
	     	               loadECNStatus.load({
		                   url: 'clsBankReceipt.php',
			           params: {
					task: 'check_e_credit_note_status',
					fincode  : GinFinid,
					compcode : GinCompcode,
		                        cnseqno  : crnoteseqno,
			          },
				  callback: function () {
		                      var cnt=loadECNStatus.getCount();
		                      if (cnt>0)
		                      {
		                              if (loadECNStatus.getAt(0).get('E_inv_confirm') == "Y")
		                              {  
		                       alert("E-Credit Note Already generated. You can't Modify this Bank Receipt...");
		                       Ext.getCmp('save').setDisabled(true);  
                       ECreditNote = "Y";

		                              }
		                              else
		                              {     
		                               Ext.getCmp('save').setDisabled(false);    
		                              }   
                                       }           
                                  }   
                               });   



                            }
                            else
                            {    

                               Ext.getCmp('save').setDisabled(false);    
                            }   



        


                 }
                          }
                      });  
            }    
        }

    });

    var lblPayMode = new Ext.form.Label({
        fieldLabel: 'Payment Mode',
        id: 'lblPayMode',
        width: 100,
        labelStyle  : "font-size:13px;font-weight:bold;color:#fc9403",
    });


    var lblRefNo = new Ext.form.Label({
        fieldLabel: 'Ref.No.',
        id: 'lblRefNo',
        width: 80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblRefDate = new Ext.form.Label({
        fieldLabel: 'Ref. Date.',
        id: 'lblRefDate',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var lblBank = new Ext.form.Label({
        fieldLabel: 'Party Bank Name.',
        id: 'lblBank',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var lblVouNo = new Ext.form.Label({
        fieldLabel: 'Vou. No.',
        id: 'lblVouNo',
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblVouDate = new Ext.form.Label({
        fieldLabel: 'Vou.Date',
        id: 'lblVouDate',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblHeadAcnt = new Ext.form.Label({
        fieldLabel: 'Bank.Account',
        id: 'lblHeadAcnt', 
        width: 100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


    var cmbAccountName = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 360,
        store: loadLedgerListDatastore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbAccountName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
          
             }
          },
          select: function () {
            }
        }
    });

    var cmbHeadAccount = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 300,
        store: HeadAccountdatastore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbHeadAccount',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
            select: function () {
                if (cmbHeadAccount.getRawValue() === txtAccountName.getRawValue() && cmbHeadAccount.getRawValue()!=="") {
                    Ext.MessageBox.show({
                        title: 'Alert',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Same Head Account and AccName!',
                        fn: function (btn) {
                            if (btn === 'yes') {
                                cmbHeadAccount.setRawValue("");
                                cmbHeadAccount.focus();
                            } else {
                                cmbHeadAccount.setRawValue("");
                                cmbHeadAccount.focus();
                            }
                        }
                    });
                }
            }, blur: function () {
                if (cmbHeadAccount.getRawValue() === txtAccountName.getRawValue() && cmbHeadAccount.getRawValue()!== "") {
                    Ext.MessageBox.show({
                        title: 'Alert',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.MessageBox.YESNO,
                        msg: 'Same Head Account and AccName!',
                        fn: function (btn) {
                            if (btn === 'yes') {
                                cmbHeadAccount.setRawValue("");
                                cmbHeadAccount.focus();
                            } else {
                                cmbHeadAccount.setRawValue("");
                                cmbHeadAccount.focus();
                            }
                        }
                    });
                }
            }
        }
    });

    var optPayType = new Ext.form.RadioGroup({
        title: 'Pay Type',
        columns: 2,
        rows :1,
        id: 'optPayType',
        layout: 'hbox',
        width: 200,
        height :40,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "OptType"},
        items: [
            {boxLabel: 'Against Bills', id: 'optBill', inputValue: 1,checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            txtTotNetAmt.setValue(''); 
                            txtTotCDAmt.setValue('');
                            txtDebitTotal.setValue('');
                            txtCreditTotal.setValue('');
                            txtTotCGSTAmount.setValue('');
                            txtTotSGSTAmount.setValue('');
                            txtTotIGSTAmount.setValue('');
                            rounding = 0;

                            gstPaytype = "BB";
                            flxAdjustDetails.getStore().removeAll();
                            flxAccounts.getStore().removeAll();
                            BillAdjustingDetail();

                        }
                    }
                }
            },
            {boxLabel: 'Advance', id: 'optAdv', inputValue: 2, 
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {

                            txtTotNetAmt.setValue('0'); 
                            txtTotCDAmt.setValue('0'); 
                            txtDebitTotal.setValue('');
                            txtCreditTotal.setValue('');
                            txtTotCGSTAmount.setValue('');
                            txtTotSGSTAmount.setValue('');
                            txtTotIGSTAmount.setValue('');
                            rounding = 0;

                            gstPaytype = "AD";
                            flxAdjustDetails.getStore().removeAll();
                            flxAccounts.getStore().removeAll();
                        }
                    }
                }
            }
        ]
    });

    var ledgertype = 'A';
    var optLedType = new Ext.form.RadioGroup({
        title: 'Ledger Type',
        columns: 2,
        rows :1,
        id: 'optLedType',
        layout: 'hbox',
        width: 200,
        height :40,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "optLedType"},
        items: [
            {boxLabel: 'Customer', id: 'optCust', inputValue: 1,checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                            ledgertype = 'C';
                        }
                    }
                }
            },
            {boxLabel: 'All', id: 'optAllLedger', inputValue: 2, 
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                              ledgertype = 'A';
                        }
                    }
                }
            }
        ]
    });

    var cdtype = 'Y';

    var optCDType = new Ext.form.RadioGroup({
        title: 'CD Type',
        columns: 2,
        rows :1,
        id: 'optCDType',
        layout: 'hbox',
        width: 190,
        height :30,
        x: 20,
        y: 15,
        defaults: {xtype: "radio", name: "optCDType"},
        items: [
            {boxLabel: 'yes (default)', id: 'optCDYes', inputValue: 1,checked: true,
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                           cdtype = 'Y';
                        }
                    }
                }
            },
            {boxLabel: 'No', id: 'optCDNo', inputValue: 2, 
                listeners: {
                    'check': function (rb, checked) {
                        if (checked === true) {
                           cdtype = 'N';
                        }
                    }
                }
            }
        ]
    });


    var dateon;
    var getdate;


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

    dtpRefDate.setRawValue(dtpVouDate.getRawValue());

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
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   txtAccountName.focus();
             }
          },
        }  	
        
    });

    var dtpInvDate= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpInvDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
        }  	
        
    });


    var lblAccount = new Ext.form.Label({
        fieldLabel: 'Ledger Name' ,
        id: 'lblAccount',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });


var txtAccountName = new Ext.form.TextField({
        fieldLabel  : '',
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
                 if (ledgercode == 0)
                 {    
                    alert("Select Ledger Name ...");
                    txtAccountName.focus();
                 }
                 else
                 {    
		        flxDetail.getStore().removeAll();
		        flxAdjustDetails.getStore().removeAll();
		        txtReceiptAmt.focus();
		        BillAdjustingDetail();
                 } 


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
//                Ext.WindowManager.bringToFront('flxLedger');
                flxLedger.getEl().setStyle('z-index','10000');
                flxLedger.show();
                loadSearchLedgerListDatastore.removeAll();
                  if (txtAccountName.getRawValue() != '')
                     LedgerSearch();
            }
         }  
    });






    var lblAmt = new Ext.form.Label({
        fieldLabel: 'Amount',
        id: 'lblAmt',hidden:true,
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtAmt',hidden:true,
        width: 70,
        name: 'Amount',
        disabled: true
    });

    var lblExgRate = new Ext.form.Label({
        fieldLabel: 'Exg.Rate',
        id: 'lblExgRate',hidden:true,
        width: 50
    });



    var lblReceipt = new Ext.form.Label({
        fieldLabel: 'Receipt Amount',
        id: 'lblReceipt',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });
 var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login By ',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        readOnly : true,
        listeners: {
        }
    });

    var txtReceiptAmt = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtReceiptAmt',
        width: 100,
        name: 'Credit',
        disabled: true,
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
    //              btnAdd.focus();
                add_btn_click();
             }
          }
       
        }    
    });

    var txtAddnlCDDays = new Ext.form.NumberField({
        fieldLabel: 'Additional CD Days',
        id: 'txtAddnlCDDays',
        width: 40,
        name: 'txtAddnlCDDays',
        disabled: true,
        enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{

       
        }    
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        id : 'btnAdd',
        x: 580,
        y: 20,
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

    var btnClearAdj = new Ext.Button({
        style: 'text-align:center;',
        text: "R",
        width: 40,
        x: 720,
        y: 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
        click: function () {
		var selrows = flxAdjustDetails.getStore().getCount();
                var pamt = 0;
	//	txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));

                for (var k = 0 ; k <2;k++) {
		for (var i = 0; i < selrows; i++) {
		    var rec = flxAdjustDetails.getStore().getAt(i);
		    if (rec.get('voutype') !== "AD") {

                            pamt =   Number(rec.get('pendingamt')) + Number(rec.get('adjamt')); 
                            if ( Number(pamt) >  Number(rec.get('invamt')))
                               pamt = Number(rec.get('invamt'));
		            rec.set('pendingamt',pamt);
		            rec.set('pendingamt2',pamt);
  		            rec.set('adjamt',0);
                            rec.set('cdamount', "0");
                            rec.set('cdvalue', 0);
                            rec.set('cgstamount', 0);
                            rec.set('sgstamount', 0);
                            rec.set('igstamount', 0);
                            rec.set('cdamount', 0);
		            rec.set('adjamt',0);
		    }
		}
                }
                CalcSum();
     }
        }
    });

 var dgrecord = Ext.data.Record.create([]);


    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 0,
        width: 0,
        id: 'my-grid',  
        x: 10,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname', sortable: true, width: 350, align: 'left'},
            {header: "Debit", dataIndex: 'dbamt', sortable: true, width: 60, align: 'right',hidden: true},
            {header: "Credit", dataIndex: 'cramt', sortable: true, width: 120, align: 'right'},
            {header: "Ledseqno", dataIndex: 'ledseq', sortable: true, width: 40, align: 'left', hidden: false},
            {header: "totamt", dataIndex: 'totamt', sortable: true, width: 60, align: 'right',hidden: false},
            {header: "ledtype", dataIndex: 'ledtype', sortable: true, width: 60, align: 'left'},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'BANK RECEIPT ENTRY',
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
                   // ledgercode.setValue(selrow.get('ledseq'));
                    txtReceiptAmt.setValue(selrow.get('cramt'));
                    ledtype =  selrow.get('ledtype');

                      Ext.getCmp('btnAdd').setDisabled(false);  
                    flxDetail.getSelectionModel().clearSelections();

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




function grid_move() {

            var cdvalue1 = 0;
            var totcdqty = 0;
            var totcdvalue = 0;
            var invlist = '';
   flxCD.getStore().removeAll();


    let CDStore = flxCD.getStore();

    flxAdjustDetails.getSelectionModel().selectAll();
    var sel = flxAdjustDetails.getSelectionModel().getSelections();

    for (var i = 0; i < sel.length; i++) {
        var recData = sel[i].data;

        if (Number(recData.cdamount ) >0) {
            var exists = false;

            // Check if the record already exists in the final store
            for (var j = 0; j < CDStore.getCount(); j++) {
                var existing = CDStore.getAt(j);
                if (Number(existing.get('cdpmt')) == Number(recData.cdmt) ) {
                    if ( Number(recData.adjamt) > 0)
                    { 
                    totcdqty = Number(existing.get('qty')) +  Number(recData.invwt);
                    totcdvalue = Number(totcdqty) * (Number(recData.cdmt)+ Number(recData.ratediff));
                    } 
                    exists = true;
                    break;
                }
            }


            if (!exists) {
                // Add record to final store
                cdvalue1 = (Number(recData.cdmt)+ Number(recData.ratediff)) * Number(recData.invwt);
                cdvalue1 =    Ext.util.Format.number(Number(cdvalue1), '0.00') ;                
  
                CDStore.add(new dgrecord({
                    cdpmt    : Number(recData.cdmt),
                    ratediff : Number(recData.ratediff),
                    qty      : Number(recData.invwt),
                    invno    : recData.invno,
                    CDValue  : cdvalue1 ,
                }));
            }
            else
            {

                    invlist = existing.get('invno') + ',' + recData.invno;   
                    existing.set('qty', totcdqty.toFixed(3) );
                    existing.set('CDValue', totcdvalue.toFixed(2) );
                    existing.set('invno',invlist  );
            }          

        }
    }




/*
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
                    var balamt   = Number(recData.pendingamt) - Number(recData.adjamt);
                    var invamt   = Number(recData.acctrail_inv_value) ;
                    var pendamt  = Number(recData.pendingamt);
                    var adjamt   = Number(recData.adjamt);
                    var cdval    =  0;
                    var cgst     =  0;
                    var sgst     =  0;
                    var cdamount =  0;
 
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
                    existing.set('invbalance', balamt.toFixed(2) );
                    existing.set('acctrail_inv_value', invamt.toFixed(2) );
                    existing.set('pendingamt', pendamt.toFixed(2) );
                    existing.set('adjusted', adjamt.toFixed(2) );
                    existing.set('cdvalue', cdval);
                    existing.set('cgst', cgst);
                    existing.set('sgst', sgst);
                    existing.set('cdamount', cdamount );
                    exists = true;
                    break;
                }
            }

    }


*/;
}

var flxCD = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 160,
        width: 470,
        id: 'my-grid',  
	x:780,
	y:140,
        columns: [         
            {header: "CD PMT", dataIndex: 'cdpmt', sortable: true, width: 70, align: 'left'},
            {header: "Rate Diff", dataIndex: 'ratediff', sortable: true, width: 80, align: 'right'},
            {header: "Qty", dataIndex: 'qty', sortable: true, width: 60, align: 'right'},
            {header: "Value", dataIndex: 'CDValue', sortable: true, width: 90, align: 'right',hidden: false},
            {header: "Inv Nos.", dataIndex: 'invno', sortable: true, width: 600, align: 'left', hidden: false},

        ],
        store:[],

    listeners:{	
    }
 });




    var txttotCDQty = new Ext.form.NumberField({
        fieldLabel: 'Total CD Qty',
        id: 'txttotCDQty',
        width: 80,
        name: 'txttotCDQty',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txttotCDValue = new Ext.form.NumberField({
        fieldLabel: ' Total CD Value',
        id: 'txttotCDValue',
        width: 100,
        name: 'txttotCDValue',
        readOnly : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
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


    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Debit', readOnly: true,
        id: 'txtTotDebit',
        width: 80,
        name: 'TotDebit',
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: 'Total Credit', readOnly: true,
        id: 'txtTotCredit',
        width: 100,
        name: 'TotCredit',
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    });

    var txtRefNo = new Ext.form.TextField({
        fieldLabel: 'Ref. No',
        id: 'txtRefNo',
        width: 200,
        name: 'RefNo',
        enableKeyEvents: true,
        style: {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'29'},
    });

    var txtRefBills = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtRefBills',
        width: 2000,
        name: 'txtRefBills',
        enableKeyEvents: true,
        style: {textTransform: "uppercase"}
    });

    var dtpRefDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpRefDate',
        name: 'RefDate',
        format: 'd-m-Y',
        value: new Date(),
	//value: '2020-03-31',
    //    anchor: '100%',
        width: 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtRecAmt = new Ext.form.NumberField({
        fieldLabel: 'Receipt Amount',
        id: 'txtRecAmt',
        width: 80,
        name: 'RecAmt'
    });

    var txtBankName = new Ext.form.TextField({
        fieldLabel: 'Party Bank',
        id: 'txtBankName',
        width: 200,
        name: 'BankName',
        style: {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'34'},
        listeners: {
            blur: function () {
                txtNarration.setValue(txtBankName.getValue().toUpperCase());
            }
        }
    });

    var cmbPaymode = new Ext.form.ComboBox({
        fieldLabel: 'Receipt Mode',
        width: 80,
        store: [[1, 'CHQ'], [2, 'DD'], [3,'NEFT'], [4, 'RTGS'], [5, 'IMPS'], [6, 'TRANSFER'], [7, 'ONLINE'], [8, 'UPI']],
        displayField: 'Paymode_id',
        valueField: 'Paymode_code',
        hiddenName: 'Paymode_id',
        id: 'cmbPaymode',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowblank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var txtNo = new Ext.form.TextField({
        fieldLabel: 'No',
        id: 'txtNo',
        width: 60,
        name: 'No'
    });

    var dtpDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpDate',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
//value: '2020-03-31',
        anchor: '100%'
    });

    var lblAdjustingDoc = new Ext.form.Label({
        fieldLabel: 'Adjusting Document',
        id: 'lblAdjustingDoc',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });



    function ClearAdjusted() {
		var selrows = flxAdjustDetails.getStore().getCount();
		for (var i = 0; i < selrows; i++) {
		    var rec = flxAdjustDetails.getStore().getAt(i);
		    if (rec.get('adjamt') == 0 && rec.get('cdamount') > 0) {
		        rec.set('cdvalue',0);
		        rec.set('cgstamount',0);
		        rec.set('sgstamount',0);
		        rec.set('igstamount',0);
		        rec.set('cdamount',0);
		    }
		}
                CalcSum();

    }    



    function UpdateAdjusted() {

        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if ( Number(rec.get('cdamount')) > 0 && Number(rec.get('adjamt')) > 0)
            {  
                  var tadj = Number(rec.get('cdamount'))  + Number(rec.get('adjamt'));
                  var pendamount = Number(rec.get('pendingamt2'));

                     if (Number(tadj) > Number(pendamount)) 
                     {
//alert(Number(tadj));
                  rec.set('cdvalue', 0);
                  rec.set('cgstamount', 0);
                  rec.set('sgstamount', 0);
                  rec.set('igstamount', 0);
                  rec.set('cdamount', 0);


                     } 
                    
            }
        }

 

    }      


    function UpdateReceiptBillsAdjusted() {
//alert("1");

if (editfind  == 0)
{
        ClearAdjusted();
        var cashdisc_value  = 0;
        var cashdisc_cgst_amt = 0;
        var cashdisc_sgst_amt = 0;
        var cashdisc_igst_amt = 0;
        var cashdisc_amount = 0;

        var cashdisc_value_method1  = 0;
        var cashdisc_value_method2  = 0;

var adjustedamount = 0;


        Ext.getCmp('chkremark').setValue(false);
        txtNarration.setRawValue("");
        var sm = flxAdjustDetails.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjustDetails.store.indexOf(selrow);
        var rcnt = flxAdjustDetails.getStore().getCount();
        txtRecAmt.setValue(Number(txtTotCredit.getRawValue()) - Number(txtTotDebit.getRawValue()));
        txtTotNetAmt.setValue("");
        for (var i = 0; i < rcnt; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (rec.get('voutype') !== 'AD') {


                if (Number(rec.get('adjamt')) > 0 && i !== rownum) {
                    txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) + Number(rec.get('adjamt')));
                }
                    
            }
        }

        var PTGD = Number(selrow.get('payterms')) + Number(selrow.get('grdays'));

        dtpInvDate.setValue(Ext.util.Format.date(selrow.get('invdate'), "Y-m-d"));

        var dt_inv = dtpInvDate.getValue();


        var dt_coll = dtpRefDate.getValue();

        var diffdays = dt_coll.getTime()-dt_inv.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        diffdays = diffdays - Number(txtAddnlCDDays.getValue());    
             

//alert(selrow.get('payterms'));
//alert(diffdays)


        if (selrow.get('voutype') !== 'AD' && Number(selrow.get('pendingamt')) > 1 ) {

                 cashdisc_value = 0;
                 ratediffmt = selrow.get('ratediff');

    //      if ( Number(selrow.get('invamt')) ==  Number(selrow.get('pendingamt')))    
//          {  



                   if (PTGD <= 7 )
                   {

			  selrow.set('cdvalue', 0);
			  selrow.set('cgstamount', 0);
			  selrow.set('sgstamount', 0);
			  selrow.set('igstamount', 0);
			  selrow.set('cdamount', 0);
			  selrow.set('cdmt', 0);


                   } 
                  else if ( PTGD == 30)
                   {  
//Modified on 27/02/2024 
                    if (diffdays < 8 )
  //                    if (diffdays < 11 )

                      {

// alert(diffdays);

                          if (cdtype == 'Y')
                          {
                              cashdisc_value = selrow.get('invwt')*(Number(selrow.get('PMT30dayscdamt'))+Number(selrow.get('ratediff')));

                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT30dayscdamt') * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
    
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;
//alert(cashdisc_value);
                          cdpermt = selrow.get('PMT30dayscdamt');
        
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');



                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);



                          adjustedamount =  Number(selrow.get('adjamt'));
                          pendamount =  Number(selrow.get('pendingamt2'));
//alert(selrow.get('adjamt'));

                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

//alert(cashdisc_amount);
// UpdateAdjusted();

//Modified on 02/04/
// start
/*
                          if (Number(cashdisc_amount) > 0 && Number(adjustedamount) > 0)
                          {  
                             var tadj = Number(cashdisc_amount)+Number(adjustedamount);
//alert(Number(pendamount));
//alert(Number(tadj));
                             if (Number(tadj) > Number(pendamount)) 
                             {
//alert(Number(tadj));
                          selrow.set('cdvalue', 0);
                          selrow.set('cgstamount', 0);
                          selrow.set('sgstamount', 0);
                          selrow.set('igstamount', 0);
                          selrow.set('cdamount', 0);


                             }                              
                 
                          }

                          if (Number(adjustedamount) == 0)
                          {  
		                  selrow.set('cdvalue', 0);
		                  selrow.set('cgstamount', 0);
		                  selrow.set('sgstamount', 0);
		                  selrow.set('igstamount', 0);
		                  selrow.set('cdamount', 0);
                          }                              

*/

//below line added on 18/03/2024
          //                 selrow.set('adjamt', Number(pendamount) - Number(cashdisc_amount));

//alert(cashdisc_amount);

                      }
                      else
                      {  
                          selrow.set('cdvalue', 0);
                      }
                   }


                   else if (PTGD == 45)
                   {  
 
// alert(diffdays);

//Modified on 27/02/2024 
                      if (diffdays < 8 )
//                      if (diffdays < 11)
                      {
                          if (cdtype == 'Y')
                          {
                              cashdisc_value = selrow.get('invwt')*(Number(selrow.get('PMT45dayscdamt1'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT45dayscdamt1'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
           
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');

        //                  if (cdpermt == 0)
                             cdpermt = selrow.get('PMT45dayscdamt1');

                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

                      }

                      else if (diffdays <= 30 )
//                      else if (diffdays <= 35 )
                      {

                          if (cdtype == 'Y')
                          {
                              cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT45dayscdamt2'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
//                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT60dayscdamt1')  * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT45dayscdamt2'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
                                 
           //              if (cdpermt == 0)
                           cdpermt = selrow.get('PMT45dayscdamt2');
            
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');



                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

                      }
                      else
                      {  
                          selrow.set('cdvalue', 0);
                      }
                   }
// PAYMENT TERMS FOR 60 DAYS
                   else if (PTGD == 60)
                   {  
 

//alert(selrow.get('payterms'));
//alert(diffdays);
//                      if (diffdays <= 30 )


                      if (diffdays < 8)
                      {
                          if (cdtype == 'Y')
                          {
//                              cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt1');
                              cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT60dayscdamt1'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT60dayscdamt1'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
           
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');


                          cdpermt = selrow.get('PMT60dayscdamt1');

                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);


                      }
                     else if (diffdays <= 30 )
                      {
               //           cashdisc_value = selrow.get('invwt')*selrow.get('ordh_payterm_60days_30days_receipt');


                          if (cdtype == 'Y')
                          {
//                              cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt1');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT60dayscdamt2'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
//                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT60dayscdamt1') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT60dayscdamt2'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
       
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;

//                           if (cdpermt == 0)

                             cdpermt = selrow.get('PMT60dayscdamt2');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

                      }
                     else if (diffdays <= 45 )
//                      else if (diffdays <= 50 )
                      {


                          if (cdtype == 'Y')
                          {
                             //cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt2');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT60dayscdamt3'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT60dayscdamt3') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT60dayscdamt3'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;

        //                  if (cdpermt == 0)
                              cdpermt = selrow.get('PMT60dayscdamt3');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

// TO BE CHECKED HERE
		var iamt     =  selrow.get('invamt')
		var tadjamt  =  selrow.get('adjamt') + selrow.get('cdamount');
		if (Number(tadjamt) > iamt )
                {  
                   alert("Adjustment amount and Credit Note amount = " + tadjamt + ". It is  higher than the Invoice Amount. "+ iamt + " Please check"  )
                       selrow.set('cdamount', 0);
                       selrow.set('adjamt', 0);

                }  


                      }                         
                      else
                      {  
                          selrow.set('cdvalue', 0);
                      }
                   }

// PAYMENT TERMS FOR 90 DAYS
                   else if (PTGD == 90)
                   {  
 

//alert(selrow.get('payterms'));
//alert(diffdays);
//                      if (diffdays <= 30 )


                      if (diffdays < 8)
                      {
                          if (cdtype == 'Y')
                          {
//                              cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt1');
                              cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT90dayscdamt1'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT90dayscdamt1'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;
                          }
         
           
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');


                          cdpermt = selrow.get('PMT90dayscdamt1');

                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

                      }
                     else if (diffdays <= 30 )
                      {
               //           cashdisc_value = selrow.get('invwt')*selrow.get('ordh_payterm_60days_30days_receipt');


                          if (cdtype == 'Y')
                          {
//                              cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt1');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT90dayscdamt2'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
//                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT60dayscdamt1') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT90dayscdamt2'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;

  //                        if (cdpermt == 0)
                             cdpermt = selrow.get('PMT90dayscdamt2');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

                      }
                     else if (diffdays <= 45 )
//                      else if (diffdays <= 50 )
                      {


                          if (cdtype == 'Y')
                          {
                             //cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt2');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT90dayscdamt3'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT90dayscdamt3') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT90dayscdamt3'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;

  //                        if (cdpermt == 0)
                             cdpermt = selrow.get('PMT90dayscdamt3');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

// TO BE CHECKED HERE
		var iamt     =  selrow.get('invamt')
		var tadjamt  =  selrow.get('adjamt') + selrow.get('cdamount');
		if (Number(tadjamt) > iamt )
                {  
                   alert("Adjustment amount and Credit Note amount = " + tadjamt + ". It is  higher than the Invoice Amount. "+ iamt + " Please check"  )
                       selrow.set('cdamount', 0);
                       selrow.set('adjamt', 0);

                }  


                      } 
                     else if (diffdays <= 60 )
//                      else if (diffdays <= 50 )
                      {


                          if (cdtype == 'Y')
                          {
                             //cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt2');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT90dayscdamt4'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT90dayscdamt4') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT90dayscdamt4'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;
 //                         if (cdpermt == 0)
                             cdpermt = selrow.get('PMT90dayscdamt4');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

// TO BE CHECKED HERE
		var iamt     =  selrow.get('invamt')
		var tadjamt  =  selrow.get('adjamt') + selrow.get('cdamount');
		if (Number(tadjamt) > iamt )
                {  
                   alert("Adjustment amount and Credit Note amount = " + tadjamt + ". It is  higher than the Invoice Amount. "+ iamt + " Please check"  )
                       selrow.set('cdamount', 0);
                       selrow.set('adjamt', 0);

                }  


                      } 

                     else if (diffdays <= 75 )
//                      else if (diffdays <= 50 )
                      {


                          if (cdtype == 'Y')
                          {
                             //cashdisc_value = selrow.get('invwt')*selrow.get('PMT60dayscdamt2');
                             cashdisc_value = selrow.get('invwt')* (Number(selrow.get('PMT90dayscdamt5'))+Number(selrow.get('ratediff')));
                          }   
                          else
                          {
                              cashdisc_value = Math.round(selrow.get('invwt')*selrow.get('PMT90dayscdamt5') * 100) / 100;
                              cashdisc_value = Math.round(selrow.get('invwt')*(Number(selrow.get('PMT90dayscdamt5'))+Number(selrow.get('ratediff'))) * 100) / 100;
                              cashdisc_value = cashdisc_value.toFixed(0);
                              cashdisc_value = (cashdisc_value)/1.12;

                          }
         
                          cashdisc_value = Math.round(cashdisc_value * 100) / 100;

//                          if (cdpermt == 0)
                             cdpermt = selrow.get('PMT90dayscdamt5');

                          if (Number(cashdisc_value) > 0 && Number(selrow.get('cgstper')) > 0)
                              cashdisc_cgst_amt = Number(cashdisc_value)*Number(selrow.get('cgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('sgstper')) > 0)
                              cashdisc_sgst_amt = Number(cashdisc_value)*Number(selrow.get('sgstper'))/100;
                          if (Number(cashdisc_value) > 0 && Number(selrow.get('igstper')) > 0)
                              cashdisc_igst_amt = Number(cashdisc_value)*Number(selrow.get('igstper'))/100;


                          cashdisc_value =  Ext.util.Format.number(cashdisc_value,'0.00');
                          cashdisc_cgst_amt =  Ext.util.Format.number(cashdisc_cgst_amt,'0.00');
                          cashdisc_sgst_amt =  Ext.util.Format.number(cashdisc_sgst_amt,'0.00');
                          cashdisc_igst_amt =  Ext.util.Format.number(cashdisc_igst_amt,'0.00');




                          cashdisc_amount = (Number(cashdisc_value) + Number(cashdisc_cgst_amt) + Number(cashdisc_sgst_amt)+ Number(cashdisc_igst_amt)); //.toFixed(0);


                          cashdisc_amount = Math.round(cashdisc_amount*100/100);
                          selrow.set('cdvalue', cashdisc_value);
                          selrow.set('cgstamount', cashdisc_cgst_amt);
                          selrow.set('sgstamount', cashdisc_sgst_amt);
                          selrow.set('igstamount', cashdisc_igst_amt);
                          selrow.set('cdamount', cashdisc_amount);
			  selrow.set('cdmt', cdpermt);

// TO BE CHECKED HERE
		var iamt     =  selrow.get('invamt')
		var tadjamt  =  selrow.get('adjamt') + selrow.get('cdamount');
		if (Number(tadjamt) > iamt )
                {  
                   alert("Adjustment amount and Credit Note amount = " + tadjamt + ". It is  higher than the Invoice Amount. "+ iamt + " Please check"  )
                       selrow.set('cdamount', 0);
                       selrow.set('adjamt', 0);

                }  


                      } 
                        
                      else
                      {  
                          selrow.set('cdvalue', 0);
                      }
                   }


                   if  (selrow.get('cdamount') > 0)
                   {

//alert(selrow.get('cdamount'));
                           var accseqno =  selrow.get('accrefseqno');
                           var percgst  =  selrow.get('cgstper');
                           var persgst  =  selrow.get('sgstper');
                           var perigst  =  selrow.get('igstper');
                           LoadGSTDetailsdatastore.removeAll();
     	                   LoadGSTDetailsdatastore.load({
                           url: 'clsBankReceipt.php',
	                   params: {
			        task: 'LoadInvGSTDetails',
                                seqno : accseqno,
	                  },
		          callback: function () {
                              var cnt=LoadGSTDetailsdatastore.getCount();
                              if (cnt>0)
                              {


                                  for(var j=0; j<cnt; j++) 
                                  {

                                    if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 72)
                                    {  
                                   salledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   salledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                                    if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1644  )
                                    {  
                                   cgstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   cgstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                              if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1645  )
                                    {  
                                   sgstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   sgstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
                              if (LoadGSTDetailsdatastore.getAt(j).get('cust_acc_group') == 44 && LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code') == 1646  )
                                    {  
                                   igstledcode = LoadGSTDetailsdatastore.getAt(j).get('acctran_led_code');       
                                   igstledname = LoadGSTDetailsdatastore.getAt(j).get('cust_name');       
                                    }
//alert(salledname);
//alert(cgstledname);

                              }
                             }

                             grid_move();
                          } 
                          });


    flxaccupdation(); 
                   }    
 
       
                   } 
 // }

//End

//to be checked here
//Modified on 17/02/23


//             if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > selrow.get('pendingamt') && selrow.get('pendingamt') > 0) 






            if (Number(txtTotNetAmt.getRawValue()) < Number(txtRecAmt.getRawValue())) {
//modified on 03/05/2024
//alert(selrow.get('cdamount'));

//alert(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) + selrow.get('cdamount') );

//                if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) >= selrow.get('pendingamt')   && selrow.get('pendingamt') > 0) {

                if ((Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) + selrow.get('cdamount') ) >= selrow.get('pendingamt')   && selrow.get('pendingamt') > 0) {


                    if (Number(selrow.get('pendingamt')) >  Number(selrow.get('cdamount')))
                        selrow.set('pendingamt2', selrow.get('pendingamt')-selrow.get('cdamount'));

                    selrow.set('adjamt', Ext.util.Format.number(selrow.get('pendingamt2'),'0.00'));


                } else if (selrow.get('pendingamt') > 0) {
                    selrow.set('adjamt', Ext.util.Format.number(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()),'0.00'));

                } else {
                    selrow.set('adjamt', 0);
                          selrow.set('cdvalue', 0);
                          selrow.set('cgstamount', 0);
                          selrow.set('sgstamount', 0);
                          selrow.set('igstamount', 0);
                          selrow.set('cdamount', 0);
			  selrow.set('cdmt', 0);

                }

        //        selrow.set('adjamt', selrow.get('pendingamt') - selrow.get('cdamount'));

                selrow.set('balamt', selrow.get('pendingamt') - selrow.get('adjamt'));
                CalcSum();

               if (selrow.get('balamt') >2 )
               {
/*
                          selrow.set('cdvalue', 0);
                          selrow.set('cgstamount', 0);
                          selrow.set('sgstamount', 0);
                          selrow.set('igstamount', 0);
                          selrow.set('cdamount', 0);
*/

               }  
            }

     flxaccupdation();
        }


    }





var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:70,
    y:140,
    height: 160,
    hidden:false,
    width: 650,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:350,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
//	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
//	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left',hidden : true},
    ],
    store: [],
    listeners:{	
/*
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
                    if (selrow.get('debit') >0)
                       cmbType.setRawValue('Dr');
                    else
                       cmbType.setRawValue('Cr');

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
*/
   }

});


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


        var qty1 = 0;
        var value1 = 0;

	txttotCDQty.setValue('');
	txttotCDValue.setValue('');

        var selrows = flxCD.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxCD.getStore().getAt(i);
            qty1 = qty1 + Number(rec.get('qty'));
            value1 = value1 + Number(rec.get('CDValue'));

        }
        txttotCDQty.setRawValue(Ext.util.Format.number(qty1,'0.000'));
        txttotCDValue.setRawValue(Ext.util.Format.number(value1,'0.00'));

}


var dramt = 0;
function flxaccupdation() {



/*
        var selrows = flxAdjustDetails.getStore().getCount();
        for (var i = 0; i < selrows; i++) {
            var rec = flxAdjustDetails.getStore().getAt(i);
            if (rec.get('voutype') !== "AD") {

alert(rec.get('adjamt'));
                   if (Number(rec.get('adjamt')) == 0  && Number(rec.get('cdamount')) > 0 ) 
                      rec.set('cdamount',0);

            }
        }
*/

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
              credit    : Ext.util.Format.number(txtTotCDAmt.getRawValue(),'0.00'),
              ledtype   : 'P',
              }) 
        );
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : salledcode,
	      ledname   : salledname,
	      debit     : Ext.util.Format.number(txtTotCDValue.getRawValue(),'0.00') ,
              credit    : "0",
              ledtype   : 'G',
              }) 
        );

        if (Number(txtTotCGSTAmount.getValue()) > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledname,
		      debit     : Ext.util.Format.number(txtTotCGSTAmount.getRawValue(),'0.00') ,
		      credit    : "0",
		      ledtype   : 'G',
		      }) 
		);
        }      

        if (Number(txtTotSGSTAmount.getValue()) > 0)    
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledname,
		      debit     : Ext.util.Format.number(txtTotSGSTAmount.getRawValue(),'0.00') ,
		      credit    : "0",
		      ledtype   : 'G',
		      }) 
		);
        } 

       if (Number(txtTotIGSTAmount.getValue()) > 0)
        {
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledname,
		      debit     : Ext.util.Format.number(txtTotIGSTAmount.getRawValue(),'0.00') ,
		      credit    : "0",
		      ledtype   : 'G',
		      }) 
		);
        } 

        var subtot = Number(txtTotCDAmt.getRawValue()) - Number(txtTotCDValue.getRawValue()) - Number(txtTotCGSTAmount.getRawValue()) - Number(txtTotSGSTAmount.getRawValue()) - Number(txtTotIGSTAmount.getRawValue());

        subtot = Ext.util.Format.number(subtot,'0.00');
        var subtot2  = Math.round(subtot*100/100);

        rounding =Ext.util.Format.number(Number(subtot)-Number(subtot2),'0.00');
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
		      ledtype   : "G",
		      }) 
		);
	}


       grid_tot_acc();
}

    var flxAdjustDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        //store: BillDetailDataStore,
        store: LoadAdjustmentDetailsdatastore,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 240,
        width: 1200,
        x: 0,
        y: 60,
        columns: [

            {header: "Inv No", dataIndex: 'invno', sortable: true, width: 90, align: 'left'},
            {header: "Date", dataIndex: 'invdate', sortable: true, width: 90, align: 'left', hidden: true},
            {header: "Date", dataIndex: 'invdate2', sortable: true, width: 90, align: 'center'},
            {header: "P.Terms", dataIndex: 'payterms', sortable: true, width: 70, align: 'center'},
            {header: "GR Days", dataIndex: 'grdays', sortable: true, width: 70, align: 'center'},
            {header: "Inv Amt", dataIndex: 'invamt', sortable: true, width: 80, align: 'right' },
            {header: "DN / CN", dataIndex: 'dbcramt', sortable: true, width: 60, align: 'right', hidden: true},
            {header: "Total Amount", dataIndex: 'totamt', sortable: true, width: 90, align: 'right' , hidden: true},
            {header: "Pend. Amt", dataIndex: 'pendingamt', sortable: true, width: 80, align: 'right'},
            {header: "To be Adj", dataIndex: 'pendingamt2', sortable: true, width: 80, align: 'right'},
            {header: "Adjusted", dataIndex: 'adjamt', sortable: true, width: 80, align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {

                        focus: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();

                            this.setValue(Number(selrow.get('adjamt')));
                            txtTotNetAmt.setValue(Number(txtTotNetAmt.getRawValue()) - Number(this.getRawValue()));


                   if (selrow.get('adjamt') == 0 )
                   {

			  selrow.set('cdvalue', 0);
			  selrow.set('cgstamount', 0);
			  selrow.set('sgstamount', 0);
			  selrow.set('igstamount', 0);
			  selrow.set('cdamount', 0);
			  selrow.set('cdmt', 0);
                   } 

                        },
                        blur: function () {
                            CalcSum();
                        },
		
                        keyup: function () {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;





                            selrow.set('adjamt', "0");

                            selrow.set('cdamount', "0");
                            selrow.set('cdvalue', 0);
                            selrow.set('cgstamount', 0);
                            selrow.set('sgstamount', 0);
                            selrow.set('igstamount', 0);
                            selrow.set('cdamount', 0);
			    selrow.set('cdmt', 0);

//                            selrow.set('pendingamt2', selrow.get('pendingamt'));  
                            pendingamt = Number(selrow.get('pendingamt2'));
                            if (Number(this.getRawValue()) > Number(pendingamt)) {
//alert("!2!");
                                Ext.MessageBox.alert(" Receipt", "Adjusted amount cannot be greater than pending amount");
                                this.setValue("0");
                                selrow.set('adjamt', "0");
                            selrow.set('cdamount', "0");
                            selrow.set('cdvalue', 0);
                            selrow.set('cgstamount', 0);
                            selrow.set('sgstamount', 0);
                            selrow.set('igstamount', 0);
                            selrow.set('cdamount', 0);
			    selrow.set('cdmt', 0);
                            CalcSum();
                            UpdateReceiptBillsAdjusted();
                            } else {


//alert(txtTotNetAmt.getRawValue());
//alert(txtRecAmt.getRawValue());

                 CalcSum();

                                if (Number(txtTotNetAmt.getRawValue()) <= Number(txtRecAmt.getRawValue())) {
                                    if (Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()) > Number(this.getRawValue())) {
var anna = 0;

                                    } else {


                                        this.setValue(Number(txtRecAmt.getRawValue()) - Number(txtTotNetAmt.getRawValue()));
//alert(txtRecAmt.getRawValue());
//alert(txtTotNetAmt.getRawValue());
         UpdateReceiptBillsAdjusted();

                                    }
                                } else {

                                    this.setValue("0");



                                }
                            }
                        }
                    }
                },
                listeners: {
                    click: function () {
                        UpdateReceiptBillsAdjusted();
                    },
                   
                }
            },
            {header: "Balance", dataIndex: 'balamt', sortable: true, width: 70, align: 'right',
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.adjamt) > 0) {

                        if (Number(record.data.pendingamt) >= Number(record.data.adjamt))
                        {  
                            retval = Number(record.data.pendingamt) - Number(record.data.adjamt) - Number(record.data.cdamount) ;
//alert(record.data.cdamount);

//alert(retval);




// for checking Extra One Rupees


//annadurai changed the if qry on 09/03/2024

  //                           if (Number(retval) < 0)
   //                               retval =0; 

//                            if (Number(retval) > Number(record.data.cdamount)+2)
                            if (Number(retval) > 2)

                            {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
		                  selrow.set('cdvalue', 0);
		                  selrow.set('cgstamount', 0);
		                  selrow.set('sgstamount', 0);
		                  selrow.set('igstamount', 0);
		                  selrow.set('cdamount', 0);
			          selrow.set('cdmt', 0);
  
                            }

                            else if (Number(retval) < 0)

                            {
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
		                  selrow.set('cdvalue', 0);
		                  selrow.set('cgstamount', 0);
		                  selrow.set('sgstamount', 0);
		                  selrow.set('igstamount', 0);
		                  selrow.set('cdamount', 0);
            			  selrow.set('cdmt', 0);
                            }

                            else
                            {
                                UpdateReceiptBillsAdjusted();
                            } 



                        }


                        else
                        { 
                            retval = 0; 

                        }  

                    } else {


                        retval = Number(record.data.pendingamt2);

                    }

                    return retval;
                }
            },
            {header: "Type", dataIndex: 'voutype', sortable: true, width: 40, align: 'center', hidden: true},

            {header: "Accrefseqno", dataIndex: 'accrefseqno', sortable: true, width: 40, align: 'left', hidden: false},
            {header: "AccrefVouno", dataIndex: 'accrefvouno', sortable: true, width: 60, align: 'left', hidden: true},
            {header: "Qty(t)", dataIndex: 'invwt', sortable: true, width: 60, align: 'right'},
            {header: "CD Amount", dataIndex: 'cdamount', sortable: true, width: 100, align: 'right'},
            {header: "Crdays", dataIndex: 'crddays', sortable: true, width: 60, align: 'center', hidden: true},
            {header: "PMT30<= 7days", dataIndex: 'PMT30dayscdamt', sortable: true, width: 80, align: 'center'},

            {header: "PMT45<= 7days",  dataIndex: 'PMT45dayscdamt1', sortable: true, width: 80, align: 'center'},
            {header: "PMT45<= 30days", dataIndex: 'PMT45dayscdamt2', sortable: true, width: 80, align: 'center'},

            {header: "PMT60<= 7days",  dataIndex: 'PMT60dayscdamt1', sortable: true, width: 80, align: 'center'},
            {header: "PMT60<= 30days", dataIndex: 'PMT60dayscdamt2', sortable: true, width: 80, align: 'center'},
            {header: "PMT60<= 45days", dataIndex: 'PMT60dayscdamt3', sortable: true, width: 80, align: 'center'},

            {header: "PMT90<= 7days",  dataIndex: 'PMT90dayscdamt1', sortable: true, width: 80, align: 'center'},
            {header: "PMT90<= 30days", dataIndex: 'PMT90dayscdamt2', sortable: true, width: 80, align: 'center'},
            {header: "PMT90<= 45days", dataIndex: 'PMT90dayscdamt3', sortable: true, width: 80, align: 'center'},
            {header: "PMT90<= 60days", dataIndex: 'PMT90dayscdamt4', sortable: true, width: 80, align: 'center'},
            {header: "PMT90<= 75days", dataIndex: 'PMT90dayscdamt5', sortable: true, width: 80, align: 'center'},


            {header: "Rate Diff", dataIndex: 'ratediff', sortable: true, width: 60, align: 'center'},
            {header: "Value", dataIndex: 'taxable', sortable: true, width: 90, align: 'right'},
            {header: "CD %", dataIndex: 'cdper', sortable: true, width: 60, align: 'right'},

            {header: "CD Value", dataIndex: 'cdvalue', sortable: true, width: 90, align: 'right'},
            {header: "CGST %", dataIndex: 'cgstper', sortable: true, width: 60, align: 'center'},
            {header: "CGST Amt", dataIndex: 'cgstamount', sortable: true, width: 60, align: 'right'},
            {header: "SGST %", dataIndex: 'sgstper', sortable: true, width: 60, align: 'center'},
            {header: "SGST Amt", dataIndex: 'sgstamount', sortable: true, width: 60, align: 'right'},
            {header: "IGST %", dataIndex: 'igstper', sortable: true, width: 60, align: 'center'},
            {header: "IGST Amt", dataIndex: 'igstamount', sortable: true, width: 60, align: 'right'},
            {header: "CD PMT", dataIndex: 'cdmt', sortable: true, width: 60, align: 'right'},
        ],
        store:[],
        listeners:{
	
                            'celldblclick' : function(flxDesc, rowIndex, cellIndex, e){
                            var sm = flxAdjustDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            selrow.set('adjamt', "0");


                          },


        }
    });



 /*var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsBankReceipt.php',      // File to connect to
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
		url: 'clsBankReceipt.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}
*/



function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'clsBankReceipt.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
                        ledgertype :ledgertype,   
		},
        });
}

/*var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  150,
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
                partycode  = selrow.get('cust_code');

	//				txtAccountName.setValue(selrow.get('cust_code'));
		txtAccountName.setValue(selrow.get('cust_ref'));
                flxDetail.getStore().removeAll();
                flxAdjustDetails.getStore().removeAll();
		txtReceiptAmt.focus();
                BillAdjustingDetail();
		flxLedger.hide();   


	}
}

 var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 450,
        id : flxLedger,
        x: 15,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
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

    var txtTotNetAmt = new Ext.form.NumberField({
        fieldLabel: 'Total Adjusted',
        id: 'txtTotNetAmt', readOnly: true,
        width: 120,
        name: 'TotNetAmt',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

    var txtTotCDAmt = new Ext.form.NumberField({
        fieldLabel: 'Total CD AMT',
        id: 'txtTotCDAmt', readOnly: true,
        width: 120,
        name: 'txtTotCDAmt',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

    var txtTotCDValue = new Ext.form.NumberField({
        fieldLabel: 'Total CD Value',
        id: 'txtTotCDValue', readOnly: true,
        width: 120,
        name: 'txtTotCDValue',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });


    var txtTotCGSTAmount = new Ext.form.NumberField({
        fieldLabel: 'Total CGST Amount',
        id: 'txtTotCGSTAmount', readOnly: true,
        width: 120,
        name: 'txtTotCGSTAmount',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });


    var txtTotSGSTAmount = new Ext.form.NumberField({
        fieldLabel: 'Total SGST Amount',
        id: 'txtTotSGSTAmount', readOnly: true,
        width: 120,
        name: 'txtTotSGSTAmount',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

    var txtTotIGSTAmount = new Ext.form.NumberField({
        fieldLabel: 'Total IGST Amount',
        id: 'txtTotIGSTAmount', readOnly: true,
        width: 120,
        name: 'txtTotIGSTAmount',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

    var lblNarration = new Ext.form.Label({
        fieldLabel: 'Narration',
        id: 'lblNarration',
        width: 50,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var chkremark = new Ext.form.Checkbox({
        name: 'Remark',
        boxLabel: 'Remark',
        id: 'chkremark',
        checked: false,
        width: 80,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    remarkfun();
                } else if (checked === false) {
                    txtNarration.setRawValue("");
                }
            }
        }
    });

    var txtNarration = new Ext.form.TextField({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 600,
        height: 40,
        name: 'Narration',
        style: {textTransform: "uppercase"},
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners: {
            blur: function () {
               txtNarration.setValue(txtNarration.getValue().toUpperCase());
            }
        }
    });


function columnWrap(val){
    return '<div style="white-space:normal !important;">'+ val +'</div>';
}

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

var tabAccounts = new Ext.TabPanel({
    id          : 'tabAccounts',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 690,
    width       : 1300,
    x           : 2,
    y           : 70,
        listeners: {
          'tabchange': function(tabPanel, tab) {
           flxAccounts.getStore().removeAll();
           grid_tot_acc();
           flxaccupdation(); 

           getCNRemarks();
        }},
 
    items       : [



        {
            xtype: 'panel',
            title: 'Receipt Details',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [

            {
                xtype: 'fieldset',
                title: '',
                width: 1260,
                height: 120,
                x: 5,
                y: 5,
                border: true,
                style: 'padding:0px',
                        layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 180,
                        width: 150,
                        x: 5,
                        y: -10,
                        border: false,
                        items: [lblAccount]
                    },
                         {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 430,
                                x: 0,
                                y: 10,
                                border: false,
                                items: [txtAccountName]
                            }, 

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 140,
                                width: 430,
                                x: 0,
                                y: 75,
                                border: false,
                                items: [txtAddnlCDDays]
                            }, 
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 150,
                        x: 420,
                        y: -10,
                        border: false,
                        items: [lblReceipt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 150,
                        x: 420,
                        y: 10,
                        border: false,
                        items: [txtReceiptAmt]
                    }, btnAdd, 
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        width: 800,
                        x: 0,
                        y: 45,
                        border: false,
                        items: [flxDetail]
                    },

/*
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 150,
                        x: 450,
                        y: 140,
                        border: false,
                        items: [txtTotDebit]
                    },
*/
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 250,
                        x: 300,
                        y: 45,
                        border: false,
                        items: [txtTotCredit]
                    },
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 110,
		        width: 400,
		        x: 600,
		        y: 5,
		        border: false,
		        items: [cmbPaymode]
		    },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 400,
                x: 820,
                y: 5,
                border: false,
                items: [txtBankName]
            },


            {
                xtype: 'fieldset',
                title: 'CashDisc Incl. GST',
                labelWidth: 1,
                width: 200,
                x: 980,
                y: 40,
                border: true,
                items: [optCDType]
            },





            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 110,
                width: 400,
                x: 600,
                y: 35,
                border: false,
                items: [txtRefNo]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 110,
                width: 400,
                x: 600,
                y: 70,
                border: false,
                items: [dtpRefDate]
            },



                ]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 1300,
                x: 5,
                y: 125,
                border: false,
                items: [flxAdjustDetails]
            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        x: 1210,
                        y: 190,
                        border: false,
                        items: [btnClearAdj]
                    },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 950,
                y: 370,
                border: false,
                items: [txtTotNetAmt]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 950,
                y: 400,
                border: false,
                items: [txtTotCDAmt]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 140,
                width: 500,
                x: 700,
                y: 450,
                border: false,
                items: [txtTotCDValue]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 10,
                y: 450,
                border: false,
                items: [txtTotCGSTAmount]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 250,
                y: 450,
                border: false,
                items: [txtTotSGSTAmount]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 500,
                x: 500,
                y: 450,
                border: false,
                items: [txtTotIGSTAmount]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 110,
                width: 800,
                height: 200,
                x: 0,
                y: 380,
                border: false,
                items: [txtNarration]
            },

              flxLedger,
             {
                xtype: 'fieldset',
                title: '',
                labelWidth: 10,
                width: 150,
                height: 50,
                x: 780,
                y: 390,
                border: false,
                items: [chkremark]
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
                        width: 480,
                        height: 80,
                        x: 800,
                        y: 90,
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
},
         {
            xtype: 'panel',
            title: 'Credit Note',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 180,
                        labelWidth  : 180,
                        x           : 70,
                        y           : 65,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblAcctname]
                    },

{
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 520,
                                x: 60,
                                y: 90,
                                border: false,

                                items: [cmbAccountName]
                            }, 


                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 90,
                        x           : 505,
                        y           : 65,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 500,
                        y           : 90,
                        border      : false,
                        items: [cmbType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 600,
                        y           : 65,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 595,
                        y           : 90,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 120,
                        x           : 705,
                        y           : 65,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCredit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 700,
                        y           : 90,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtCredit]
                    }, btnSubmit, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 120,
		        width: 350,
		        x: 50,
		        y: 10,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCNNo]
		    }, 


		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 40,
		        width: 350,
		        x: 502,
		        y: 10,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtQty]
		    }, 

                     flxAccounts,flxCD,


		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 300,
		        y: 300,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtDebitTotal]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 520,
		        y: 300,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCreditTotal]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 800,
		        y: 300,
		        defaultType: 'textfield',
		        border: false,
		        items: [txttotCDQty]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 1000,
		        y: 300,
		        defaultType: 'textfield',
		        border: false,
		        items: [txttotCDValue]
		    }, 

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 800,
		        x: 80,
		        y: 350,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtCNRemarks]
		    }, 
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 800,
		        x: 800,
		        y: 360,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnRemarks]
		    }, 

            ]
         },
]
});                     


    var BankReceiptEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bank Receipt Entry',

                        bodyStyle: {"background-color": "#f7fffe"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        header: false,
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'BankReceiptEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
//save
                {
                    text: 'Save',
                    id  : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
               listeners: {
                  click: function() {
                        if (gstFlag == "Edit")
                        {
			Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
			    if (btn == 'ok'){
				txtReason.setRawValue(text)
			    }
			});
                        } 
                        save_click();

                  }
               }
                }, '-',
//edit
                {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30, hidden: false,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            cmbVouNo.setRawValue('BKR/');
			flxDetail.getStore().removeAll();
			flxAdjustDetails.getStore().removeAll();
			txtNarration.setValue("");
			txtTotNetAmt.setValue("");

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

				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var seqno2 = "&seqno=" + encodeURIComponent(seqno);

				var param =(compcode+fincode+seqno2);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param, '_blank'); 
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
   //                            RefreshGridData();
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
                            BankReceiptEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 1320,
                height: 65,
                x: 5,
                y: 5,
                border: true,
                layout: 'absolute',
                items: [
				
 
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 5,
                                y: -15,
                                border: false,
                                items: [lblVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 10,
                                border: false,
                                items: [txtVouNo]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 0,
                                y: 10,
                                border: false,
                                items: [cmbVouNo]
                            },
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 135,
                                y: -15,
                                border: false,
                                items: [lblVouDate]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 150,
                                x: 130,
                                y: 10,
                                border: false,
                               items: [dtpVouDate]
                            },

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 150,
                                x: 280,
                                y: -15,
                                border: false,
                                items: [lblHeadAcnt]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 1,
                                width: 400,
                                x: 275,
                                y: 10,
                                border: false,
                                items: [cmbHeadAccount]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 230,
                                height: 43,
                                x:  640,
                                y: 0,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                                items: [optPayType]
                            },
/*
                            {
                                xtype: 'fieldset',
                                title: '',
                                width: 230,
                                height: 43,
                                x:  870,
                                y: 0,
                                border: true,
                                style: 'padding:0px',
                                layout: 'absolute',
                            items: [optLedType]
                            },

*/
		{
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 70,
                                width: 300,
                                x: 1100,
                                y: 0,
                                border: false,
                                items: [txtUserName]
                            },
                ]
            },

	    {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 1290,
                                x: -5,
                                y: 65,
                                border: false,
                                items: [tabAccounts]
             },

                        ]  
    



    });



    function RefreshData() {


//alert("hello");


        txtReceiptAmt.setValue("");
        txtAccountName.setRawValue("");
        gstFlag = "Add";
        flxLedger.hide();



        txtCNRemarks.setRawValue("");
        txtNarration.setRawValue("");
         flxDetail.getStore().removeAll();
       
        txtCredit.setValue("");
        txtDebit.setValue("");
        flxLedger.hide();
        txtTotCDAmt.setValue("");
        txtTotCDValue.setValue("");
        txtTotCGSTAmount.setValue("");
        txtTotSGSTAmount.setValue("");
        txtTotIGSTAmount.setValue("");
        subtot = 0;
        subtot2 = 0;
        roundcr = 0;
        ledgercode = 0;
        salledcode =0;
        salledname='';  



         flxAccounts.getStore().removeAll();
         Ext.getCmp('save').setDisabled(false);  
         Ext.getCmp('btnAdd').setDisabled(false);  
         Ext.getCmp('editchk').hide();
        gstFlag = "Add";
        txtRefNo.setValue("");
        Ext.getCmp('chkremark').setValue(false);
        txtRecAmt.setValue("");
        txtBankName.setValue("");
        txtNo.setValue("");

        txtTotDebit.setValue("");
        txtTotCredit.setValue("");
        cmbVouNo.setValue("");
   //     RefreshGridData();
        flxDetail.getStore().removeAll();
        flxAdjustDetails.getStore().removeAll();
        txtNarration.setValue("");
        txtTotNetAmt.setValue("");
        cmbPaymode.setValue('CHQ');
        gstrcpttype = "BANK RECEIPTS";
        gstPaytype = "BB";
        Ext.getCmp("optBill").setValue(true);
        cmbVouNo.hide();
        txtDebitTotal.setValue("");
        txtCreditTotal.setValue("");

        dtpVouDate.focus();
        HeadAccountdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "cmbbankacct",
                        compcode: GinCompcode,
                        finid : GinFinid
                    },
                     callback : function() {  HeadAccountdatastore.getCount(); 
                     cmbHeadAccount.setValue(1653);
                     }
        });
        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
                    {
                        task: "LoadAllLedgerList",
                        compcode: GinCompcode
                    },
                     callback : function() {  


                     }
        });

                   VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'BKR'
                        },
                        callback: function(){

                                  if (GinFinid >= 24)  
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


                                     vno =  "BKR/"+vno.slice(-4);  
                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtVouNo.setValue(vno);





                                  }
                                  else
                                  {
                                      txtVouNo.setRawValue("BKR"+VouNodatastore.getAt(0).get('con_value'));

                                  } 


              //              txtVouNo.setRawValue("BKR"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });

                   VouNodatastore3.load({
                        url: 'clsBankReceipt.php',
                        params:
                        {
                            task: "ControlCreditNo",
                            finyear: GinFinid,
                            compcode: GinCompcode,
                            voutype : 'CNG'
                        },
                        callback: function(){

            //                txtCNNo.setValue(VouNodatastore3.getAt(0).get('accref_vouno'));

                                  if (GinFinid >= 24)  
                                  {    
//                                     var vno = "00"+VouNodatastore3.getAt(0).get('accref_vouno');   
//                                     vno =  "CNG-"+vno.slice(-3);  
//  	                             txtCNNo.setValue(vno);


                                       if (VouNodatastore3.getAt(0).get('accref_vouno') < 10)
                                        {                                              
                                          vno = "00"+VouNodatastore3.getAt(0).get('accref_vouno');
                                        }                                      
                                        else
                                        {  
                                             if (VouNodatastore3.getAt(0).get('accref_vouno') < 100) 
                                             {                                              
                                              vno = "0"+VouNodatastore3.getAt(0).get('accref_vouno');                   
                                             }
                                             else 
                                             {      
                                               vno = VouNodatastore3.getAt(0).get('accref_vouno');  
                                             }
                                        } 


                                     vno =  "CNG-"+vno.slice(-4);  
//                                     vno = vno.trim() +'/'+ invfin; 
  	                             txtCNNo.setValue(vno);

                                  }
                                  else
                                  {
                                     txtCNNo.setValue(VouNodatastore3.getAt(0).get('accref_vouno'));

                                  } 


                        }
                    });


        txtReceiptAmt.enable();
    }


    var BankReceiptEntryWindow = new Ext.Window({
        width: 1350,
        height: 610,
        y: 30,
        items: BankReceiptEntryFormPanel,
        bodyStyle: {"background-color": "#f7fffe"},
        title: 'Bank Receipt Entry',
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

//Ext.get('txtCNRemarks').setStyle('word-wrap', 'break-word');
                  dtpVouDate.setRawValue(new Date().format('d-m-Y'));
                  dtpRefDate.setRawValue(new Date().format('d-m-Y'));
                  RefreshData();
flxAccounts.store.clearData();
 txtUserName.setRawValue(GinUser); 
// flxDetail.hide();  
 txtTotCredit.hide();
btnAdd.hide();
            }
        }
    });
    BankReceiptEntryWindow.show();
});

