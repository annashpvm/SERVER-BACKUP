Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');
    var GinUser = localStorage.getItem('ginusername');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

   var rounding = 0;

   var seqno = 0;

   var poseqno = 0;
   var grnseqno = 0;  
   var gstFlag = "Add";

var accseqno = 0;
var roundoff ="Y";
var qclnolist = '';
var ticketnolist = '';
var supcode = 0;


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
                  TrnGrnWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  RefreshData();
            }
        }]);


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



   function check_password_Rate()
   {
      if (txtPasswordRate.getRawValue() == "rate@123")
      {
         chkratediff = 1;
         Ext.getCmp('save').setDisabled(false);
      }
      else
      {
         chkratediff = 0;
         Ext.getCmp('save').setDisabled(true);
      }    

   }   


   var txtPasswordRate = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPasswordRate',
        name        : 'txtPasswordRate',
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
            check_password_Rate();
          },


           blur:function(){
              check_password_Rate();
           },
           keyup:function(){
              check_password_Rate();
           },
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

 

            else if ( txttotgrnval.getValue()==0)
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
			    url: 'TrnRMGRNNoChange.php',
			    params :
			     {
			     	griddet: Ext.util.JSON.encode(grnupdData),
				cnt:grnData.length,

		

				gstFlaggrn : gstFlag,                                 
				compcode:GinCompcode,
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

 
            else if ( cmbQCEntNo.getValue()==0)
            {
                Ext.Msg.alert('GRN','Select QC Entry NO,');
   
                gstSave="false";
            }     

            else if ( txttotgrnval.getValue()==0)
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
			{
		  
			    var grnData = flxDetail.getStore().getRange();                                        
			    var grnupdData = new Array();
			    Ext.each(grnData, function (record) {
				grnupdData.push(record.data);
			    });
                        }          

			    Ext.Ajax.request({
			    url: 'TrnRMGRNDelete.php',
			    params :
			     {
			     	griddet: Ext.util.JSON.encode(grnupdData),
				cnt:grnData.length,

		

				gstFlaggrn : gstFlag,                                 
				compcode:GinCompcode,
				finid:GinFinid,
				seqno  : seqno,
				grnno  : txtGRNNo.getValue(),
                                edgrnno : txtGRNNo.getRawValue(),
				ordseqno : poseqno,
				accseqno : accseqno,
				qcinsno  : cmbQCEntNo.getValue(),
				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("GRN DELETED No.-" + obj['GRNNo']);
		//                                    TrnGrnformpanel.getForm().reset();
				    flxDetail.getStore().removeAll();


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
				compcode   : GinCompcode,
				finid      : GinFinid,
				grnno      : txtGRNNo.getValue(),
                                edgrnno    : txtGRNNo.getRawValue(),
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


var cmbPayMode = new Ext.form.ComboBox({
        fieldLabel      : 'Payment Mode',
        width           : 100,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbPayMode',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DA','DP','TT','LC','HSS'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
});



var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:15,
    height: 220,
    hidden:false,
    width: 1000,
   id:'my-grid3',
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:40,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:55,align:'left',hidden : true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:350,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden : true},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden : true},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
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
   autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'249'},
listeners:{

specialkey:function(f,e){

       },
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


function grid_tot_acc(){
        var dr = 0;
        var cr = 0;
         txtTotDebit.setRawValue(0);
         txtTotCredit.setRawValue(0);



	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);

            dr = Math.round(dr * 100) / 100;
            cr = Math.round(cr * 100) / 100;
         }
 

         txtTotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txtTotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));


}




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
	      ledcode   : ledcode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : "0",
              credit    : Ext.util.Format.number(txttotgrnval.getRawValue(),'0.00'),
              billno    : txtbillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
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
	      debit     : Ext.util.Format.number(txttotitemval.getRawValue(),'0.00'),
              credit    : 0,
              ledtype   : "G",
              billno    : txtbillno.getRawValue(),
              billdt    : Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
              }) 
        );
       grid_tot_acc();
}


var edacctflag = 'N';
    var loadgrnitemdetaildatastore = new Ext.data.Store({
      id: 'loadgrnitemdetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['party_item', 'itmh_name', 'lot_no', 'ordqty', 'rect_grnqty', 'stk_qty', 'rect_minqty', 'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_educessper', 'rect_educessamount', 'itmh_ledcode', 'act_rect_qty' ,'lot_refno','rect_lotno','pendqty',
'rect_mois_for_material','rect_mois_for_qty', 'rect_lifeless_per', 'rect_reject_per', 'rect_ticketno','rect_mat_pack_type' ,'rect_itemvalue','rect_costrate','rect_costvalue' ]),
    });


var userdatastore = new Ext.data.Store({
      id: 'userdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"userdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'usr_code', 'usr_dept', 'usr_name', 'usr_pwd', 'usr_type'
      ]),
    });




var loadgrndetaildatastore = new Ext.data.Store({
      id: 'loadgrndetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_sgst_per', 'rech_sgst_amt', 'rech_cgst_per', 'rech_cgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_tcs_per', 'rech_tcs_amt', 'rech_edamount', 'rech_servicecharge', 'rech_freight', 'rech_roundingoff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_educessamount', 'rech_geno', 'rech_gedate', 'cust_taxtag', 'ordh_no', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper','cust_ref','rech_purledger','rech_acc_seqno','rech_paymode', 'ordh_igstper','rech_truckno','rech_otheramt','rech_crdays','rech_roundingoff','rech_roundneeded','rech_qc_ins_no',
'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'

      ]),
    });


var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 290,
    height:60,
    defaultType : 'textfield',
    x:600,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding', id:'RoundNeed',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 findLandingCost();   
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                findLandingCost();   
               }
              }
             }}  , //,txtfreight
            {boxLabel: 'Manual', name: 'optRounding' , id:'RoundManual',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="M";
                rounding = 1;
                findLandingCost();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});



	var loadpoitemdatastore = new Ext.data.Store({
	id: 'loadpoitemdatastore',
	proxy: new Ext.data.HttpProxy({
		url: 'ClsRMImportGRN.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadpoitem"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'itmh_name','itmh_code','ordt_unit_rate'
	]),
	});
var dgrecord = Ext.data.Record.create([]);

var loadImportItemDataStore = new Ext.data.Store({
      id: 'loadImportItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCItems"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','qc_rm_itemcode','ticketwt'
      ]),
});


var loadponodatastore = new Ext.data.Store({
      id: 'loadponodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_no','ordh_seqno'
      ]),
});


var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMImportGRN.php',      // File to connect to
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


 var loadQCEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entryno', 'qc_rm_ticketno','qc_rm_truck', 'ticketwt'
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','qc_rm_supcode', 'cust_taxtag','cus_wp_gstinv_supplier_yn' 
      ]),
    });






   var loadGRNNoDatastore = new Ext.data.Store({
      id: 'loadGRNNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMImportGRN.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno','rech_no','rech_seqno'
      ]),
    });





var txttotitemqty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txttotitemqty',
        name        : 'txttotitemqty',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotitemval= new Ext.form.NumberField({
        fieldLabel  : 'Total Item Value',
        id          : 'txttotitemval',
        name        : 'txttotitemval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txttotgrnval= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txttotgrnval',
        name        : 'txttotgrnval',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Round Off',
        id          : 'txtroundoff',
        name        : 'txtroundoff',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
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

var txtlandingcost = new Ext.form.TextField({
        fieldLabel  : 'Landing Cost',
        id          : 'txtlandingcost',
        name        : 'txtlandingcost',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


function grid_tot2(){
	pdb_totval = 0;
	pdb_totedval = 0;

	totgrnqty = 0;

        var totgrnvalue  =0; 
        var totgrnvalue2  =0; 
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

                totgrnqty = Number(totgrnqty) + Number(sel[i].data.ticketwt) ;
                pdb_totval = Number(pdb_totval) + Number(sel[i].data.itemvalue);

        }

	txttotitemqty.setValue(Ext.util.Format.number(Number(totgrnqty),"0.000"));
	txttotitemval.setRawValue(Ext.util.Format.number(Number(pdb_totval),"0.00"));


grid_tot();
}





function grid_tot(){

	pdb_totval = 0;
	pdb_totedval = 0;

	totgrnqty = 0;

        var totgrnvalue  =0; 
        var totgrnvalue2  =0; 
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {




          rate1 = sel[i].data.itemvalue / sel[i].data.billwt;

          rate1 = Math.round(rate1  * 10000) / 10000;
          rate1 = Math.round((rate1 +0.0001+ Number.EPSILON) * 100) / 100;
          rate1 = rate1.toFixed(2);  

   

          rate1 =  Ext.util.Format.number(rate1,'0.00');
          sel[i].set('itemrate', rate1);

        }


        for(var i=0;i<Row;i++)
        {
                totgrnqty = Number(totgrnqty) + Number(sel[i].data.ticketwt) ;
                pdb_totval = Number(pdb_totval) + Number(sel[i].data.itemvalue);

        }

	txttotitemqty.setValue(Ext.util.Format.number(Number(totgrnqty),"0.000"));
	txttotitemval.setRawValue(Ext.util.Format.number(Number(pdb_totval),"0.00"));




 
           pdb_totval = Number(pdb_totval);









	txttotgrnval.setValue(Number(pdb_totval)  );


	totgrnvalue =  Number(pdb_totval);

//alert("roundoff1");
        if (roundoff == "Y")           
           totgrnvalue2 =  totgrnvalue.toFixed(0) ;
        else
           totgrnvalue2 =  totgrnvalue;

        if (rounding == 1)        
{
//  	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue) + Number(txtroundoff.getValue()) ,"0.00"));
        totgrnvalue2 =  Number(totgrnvalue2)  + Number(txtroundoff.getValue());

}
        else   
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));



	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));


//	txtlandingcost.setRawValue(Number(txttotgrnval.getValue()) - Number(txtotherchrgs.getValue()));
//	txtlandingcost.setRawValue(Number(pdb_totvalnew)+txtotherchrgs.getValue()) ;


       findLandingCost();
calcost(); 

}
function calcost(){

       var totalgrnqty = Number(txttotitemqty.getValue());
       var addnlvalue  = 0;
       var addnl1 =0;

//alert("cost value");

		var Rowk= flxDetail.getStore().getCount();
        	flxDetail.getSelectionModel().selectAll();
		var selk=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Rowk;i++)
		{

                    if (totalgrnqty > 0){
                       pdb_costvalue = 0;
                       pdb_costrate = 0;
                //       addnl1 =  addnlvalue / totalgrnqty * Number(selk[i].data.billqty);


		       pdb_costvalue = Ext.util.Format.number((Number(selk[i].data.itemvalue)) ,"0.00");
                       pdb_costrate = Ext.util.Format.number((pdb_costvalue / (Number(selk[i].data.billwt)) ), "0.00000");
//alert(pdb_costvalue);
                       selk[i].set('costvalue', pdb_costvalue);
                       selk[i].set('costrate', pdb_costrate);
                    }
		}
		
        flxaccupdation();				




}

function findLandingCost(){



       pdb_totvalnew = Number(txttotitemval.getValue());
       txtlandingcost.setRawValue(Number(pdb_totvalnew)) ; 
//	txttotgrnval.setValue(Number(pdb_totvalnew) + Number(txtcgstval.getValue())+Number(txtsgstval.getValue()) + Number(txtigstval.getValue())+ Number(txttcsval.getValue()) +Number(txtotherchrgs.getValue()) );


	totgrnvalue =  Number(pdb_totvalnew) ;

//        totgrnvalue2 =  totgrnvalue.toFixed(0) ;
//alert("roundoff2");
        if (roundoff == "Y")           
           totgrnvalue2 =  totgrnvalue.toFixed(0) ;
        else
           totgrnvalue2 =  totgrnvalue;

//alert(rounding);
        if (rounding == 1)        
{
//  	txttotgrnval.setValue(Ext.util.Format.number(Number(totgrnvalue) + Number(txtroundoff.getValue()) ,"0.00"));
     totgrnvalue2 =  Number(totgrnvalue2) + Number(txtroundoff.getValue());
}
        else   
        txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));



	txttotgrnval.setRawValue(Ext.util.Format.number(Number(totgrnvalue2),"0.00"));


    //    txtroundoff.setValue(Ext.util.Format.number(totgrnvalue2-totgrnvalue,"0.00"));


calcost(); 
//calcostdegr()

}


    var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        name        : 'txtGRNNo',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
//	readOnly : true,
		tabindex : 2
    });

    var txtTotTicketWT = new Ext.form.TextField({
        fieldLabel  : 'Total Ticket WT',
        id          : 'txtTotTicketWT',
        name        : 'txtTotTicketWT',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
//	readOnly : true,
		tabindex : 2
    });



var cmbGRNNo = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        width           : 100,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        hiddenName      : '',
        id              : 'cmbGRNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadGRNNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
 	select: function(){

		flxDetail.getStore().removeAll();

	//	flxitem.getStore().removeAll();
		tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);


		loadgrndetaildatastore.removeAll();//sprm_sel_recheddet
            	loadgrndetaildatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                    task:"loadgrndetail", 
                    finid: GinFinid,
		    compcode: GinCompcode,
		    grnno   : cmbGRNNo.getValue(),
		    gstFlag : gstFlag
                },
		callback:function(){
			grnseqno = loadgrndetaildatastore.getAt(0).get('rech_seqno');   
                        seqno = loadgrndetaildatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrndetaildatastore.getAt(0).get('rech_ordhdseqno');

                        suptype = loadgrndetaildatastore.getAt(0).get('cust_taxtag');

          //              cmbQCEntNo.setValue(loadgrndetaildatastore.getAt(0).get('rech_qc_ins_no'));

                        accseqno= loadgrndetaildatastore.getAt(0).get('rech_acc_seqno');
//alert(accseqno);
                        txtGRNNo.setValue(cmbGRNNo.getRawValue());
                        cmbPayMode.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_paymode'));
                        
			dtpGRNDate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_date'),'d-m-Y'));
			txtSupplierName.setRawValue(loadgrndetaildatastore.getAt(0).get('cust_ref'));
			supcode = loadgrndetaildatastore.getAt(0).get('rech_sup_code');
		        ledcode = loadgrndetaildatastore.getAt(0).get('rech_sup_code');
                   	txtCrdays.setValue(loadgrndetaildatastore.getAt(0).get('rech_crdays'));


                        if (loadgrndetaildatastore.getAt(0).get('rech_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else if (loadgrndetaildatastore.getAt(0).get('rech_roundneeded') == "N")
                           Ext.getCmp("optRounding").setValue(2);
                        else
                           Ext.getCmp("optRounding").setValue(3);


			txtbillno.setValue(loadgrndetaildatastore.getAt(0).get('rech_billno'));
			dtpbilldate.setRawValue(Ext.util.Format.date(loadgrndetaildatastore.getAt(0).get('rech_billdate'),'d-m-Y'));
			txtBillValue.setRawValue(loadgrndetaildatastore.getAt(0).get('rech_totalamount'));
		

                        edpono = 0;



        loadpoitemdatastore.removeAll();
	loadponodatastore.removeAll();
            loadponodatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                    task:"loadpono",
		    compcode : GinCompcode,
		    finid : GinFinid,
		    supcode : supcode
                },
		callback : function(){

		}
            });


		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsRMImportGRN.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                            //    gsttype : dngsttype,  

			},
			callback : function(){
        cmbPurchaseLedger.setValue(loadgrndetaildatastore.getAt(0).get('rech_purledger'));
			}                           
		});



			loadgrnitemdetaildatastore.removeAll();//sprm_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsRMImportGRN.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: GinCompcode,
				    finid: GinFinid,
				    grnno: cmbGRNNo.getRawValue(),
				    ordno: edpono
				},
				callback: function(){
					var RowCnt = loadgrnitemdetaildatastore.getCount();
					var j = 0;
					totgrndrqty=0;
					totgrndrvalue=0;
					grndrrate=0;
					txtRemarks.setRawValue(loadgrnitemdetaildatastore.getAt(0).get('rect_remarks'));
					for (var i=0;i<RowCnt;i++)
					{
					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
						slno:i + 1,
						itemcode: loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
	                    			itemname: loadgrnitemdetaildatastore.getAt(i).get('itmh_name'),

					    	billwt: loadgrnitemdetaildatastore.getAt(i).get('rect_billqty'),
						ticketwt: loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),

					    	itemvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
						itemrate: loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
					    	costvalue: loadgrnitemdetaildatastore.getAt(i).get('rect_costvalue'),
						costrate: loadgrnitemdetaildatastore.getAt(i).get('rect_costrate'),
						}) 
         				);  
 
 
		                        }    
               grid_tot2();

                                }
                        });       







		}
		});


	}

      }
   });



var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 90,
    hidden:false,
    width: 1220,
    columns:
    [
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:200,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:100,align:'left',hidden : true},
        {header: "BillWt", dataIndex: 'billwt',sortable:true,width:80,align:'right',
        editor: {
            xtype: 'numberfield',
            allowBlank: true,
            enableKeyEvents: true,
            decimalPrecision: 3,
            listeners: {
                focus: function () {
                    var sm = flxDetail.getSelectionModel();
                    var selrow = sm.getSelected();
                    this.setValue(Number(selrow.get('billwt')));
      //              this.setRawValue(Ext.util.Format.number(Number(selrow.get('itemrate')),"0.00"));
                    grid_tot();
                },
                blur: function () {
                     grid_tot();
                },
                keyup: function () {
               
                },
   
            }
        } 
        } ,
        {header: "Accept Wt", dataIndex: 'ticketwt',sortable:true,width:80,align:'right',
        editor: {
            xtype: 'numberfield',
            allowBlank: true,
            enableKeyEvents: true,
            decimalPrecision: 3,
            listeners: {
                focus: function () {
                    var sm = flxDetail.getSelectionModel();
                    var selrow = sm.getSelected();
                    this.setValue(Number(selrow.get('ticketwt')));
      //              this.setRawValue(Ext.util.Format.number(Number(selrow.get('itemrate')),"0.00"));
                    grid_tot();
                },
                blur: function () {
                     grid_tot();
                },
                keyup: function () {
               
                },
   
            }
        }
 },


        {header: "Value", dataIndex: 'itemvalue',sortable:true,width:120,align:'right',
 
        editor: {
            xtype: 'numberfield',
            allowBlank: true,
            enableKeyEvents: true,
            decimalPrecision: 2,
            listeners: {
                focus: function () {
                    var sm = flxDetail.getSelectionModel();
                    var selrow = sm.getSelected();
                    this.setValue(Number(selrow.get('itemvalue')));

                    grid_tot();
                },
                blur: function () {
                     grid_tot();
                },
                keyup: function () {
               
                },
   
            }
        }
        },

        {header: "Rate", dataIndex: 'itemrate',sortable:true,width:100,align:'right'} ,

        

        {header: "Cost Value", dataIndex: 'costvalue',sortable:true,width:120,align:'left' },
        {header: "Cost Rate", dataIndex: 'costrate',sortable:true,width:120,align:'left' },
        {header: "type", dataIndex: 'itemtype',sortable:true,width:100,align:'left',hidden : true},


    ],
    store: [],
    listeners:{	

          
  }  

});





 var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtbillno',
        name        : 'txtbillno',
        width       :  130,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'39'},
    });



var dtpbilldate = new Ext.form.DateField({
    fieldLabel : 'Bill Date',
    id         : 'dtpbilldate',
    name       : 'date',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
//    readOnly: true,
    listeners:{
            change:function(){
             /*   duedateval=this.getValue();
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(dateval);
                var secondDate = new Date(duedateval);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                txtcreditdays.setValue(diffDays);*/
            }
    }
});

 var txtCrdays = new Ext.form.NumberField({
        fieldLabel  : 'Paymt Terms',
        id          : 'txtCrdays',
        name        : 'txtCrdays',
        width       :  50,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });


  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtpGRNDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >90)
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

 }

var dtpGRNDate = new Ext.form.DateField({
    fieldLabel : 'GRN Date',
    id         : 'dtpGRNDate',
    name       : 'date',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    //readOnly: true,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtSupplierName.focus();
             }
        } ,

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

var txtBillValue = new Ext.form.NumberField({
        fieldLabel  : 'Bill Value',
        id          : 'txtBillValue',
        name        : 'txtBillValue',
        width       :  100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true
    });


var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Ledger',
    width           : 280,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,

    
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    enableKeyEvents: true, 
    listeners:{
       select: function () 
        { 
               grid_tot(); 
   
        }   
    }
});

function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){
		ledcode = selrow.get('cust_code');
		supcode = selrow.get('qc_rm_supcode');
		suptype = selrow.get('cust_taxtag');
		supwp_gsttype = selrow.get('cust_wp_gst_dnote_yn');

		txtSupplierName.setValue(selrow.get('cust_name'));
		flxLedger.hide();
                flxDetail.getStore().removeAll();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsRMImportGRN.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                            //    gsttype : dngsttype,  

			},
		});


        loadQCEntryNoListDatastore.removeAll();
	loadQCEntryNoListDatastore.removeAll();
            loadQCEntryNoListDatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                    task:"loadQCEntryList",
		    compcode : GinCompcode,
		    finid : GinFinid,
		    supcode : supcode
                },
		callback : function(){

		}
            });


        loadpoitemdatastore.removeAll();
	loadponodatastore.removeAll();
            loadponodatastore.load({
                url: 'ClsRMImportGRN.php',
                params:
                {
                    task:"loadpono",
		    compcode : GinCompcode,
		    finid : GinFinid,
		    supcode : supcode
                },
		callback : function(){

		}
            });



             

	}

}




function getQCNoDetails()
{
           
            t_ticketwt = "0";
            qclnolist = "0";
            ticketnolist = "0";

	    var sel = flxQCNoList .getSelectionModel().getSelections();
	    for (var t=0; t<sel.length; t++)
	    {
                 t_ticketwt = Number(t_ticketwt)  + Number(sel[t].data.ticketwt);
		if (qclnolist === "")
		      qclnolist =  sel[t].data.qc_rm_entryno;
		else
		      qclnolist = qclnolist + ","  + sel[t].data.qc_rm_entryno;

		if (ticketnolist === "")
		      ticketnolist =  sel[t].data.qc_rm_ticketno;
		else
		      ticketnolist = ticketnolist + ","  + sel[t].data.qc_rm_ticketno;

	    }



            t_ticketwt =  Ext.util.Format.number(t_ticketwt,"0.000");
            txtTotTicketWT.setRawValue(t_ticketwt);

    	    loadImportItemDataStore.removeAll();
	    loadImportItemDataStore.load({
		url: 'ClsRMImportGRN.php',
		params: {
	    	task     : 'loadQCItems',
	    	supcode  : supcode,
	    	compcode : GinCompcode,
	        finid    : GinFinid,
	    	qcnos     : qclnolist,
		// FlxSONumber .getSelectionModel().clearSelections();
		},
	
	   	callback:function()
	 	{
                  var cnt = loadImportItemDataStore.getCount();
                          flxDetail.getStore().removeAll();      
//       		alert(loadImportItemDataStore.getAt(0).get('ticketwt'));
                  if (cnt > 0) 
                  {
                   for (var i=0;i<cnt;i++)
		   {
                      twt  =   Ext.util.Format.number(loadImportItemDataStore.getAt(i).get('ticketwt'),'0.000'); 

    		      flxDetail.getStore().insert(
		      flxDetail.getStore().getCount(),
	              new dgrecord({
                                        billwt      :  twt,	
				      	ticketno    :  loadImportItemDataStore.getAt(i).get('qc_rm_ticketno'),
					ticketwt    :  twt,
					itemname    :  loadImportItemDataStore.getAt(i).get('itmh_name'),
					itemcode    :  loadImportItemDataStore.getAt(i).get('qc_rm_itemcode'),
					grnqty      :  twt,
                                        itemrate    :   loadImportItemDataStore.getAt(i).get('qc_rm_rate'),
                                        itemvalue   :  0,
                                        costrate    :  0,
                                        costvalue   :  0,
                    		        itemtype   :  loadImportItemDataStore.getAt(i).get('qc_rm_itemtype'),
				}) 
				); 



                   } 

                  } 

	        }    
	   });



          
}

var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = flxQCNoList.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.qc_rm_entryno);
}
}
}
});




    var fm1 = Ext.form;
   var flxQCNoList = new Ext.grid.EditorGridPanel({
    frame: false,
    id : 'flxQCNoList',
    hideHeaders : false,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
        height: 120,
        width: 470,
        id : flxQCNoList,
        x: 750,
        y: 0,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
       selModel: sm1,
        columns: [  sm1, 
		{header: "QC No", dataIndex: 'qc_rm_entryno',sortable:true,width:90,align:'left',hidden:false},   
		{header: "Ticket No", dataIndex: 'qc_rm_ticketno',sortable:true,width:90,align:'left'},
		{header: "Truck", dataIndex: 'qc_rm_truck',sortable:true,width:110,align:'left'},
		{header: "Tickt Wt ", dataIndex: 'ticketwt',sortable:true,width:100,align:'right'},
        ],
        store:loadQCEntryNoListDatastore,

        listeners:{	
                click : function() {
                  getQCNoDetails();
                },  
                'cellclick' : function (flxDesc, rowIndex, cellIndex, e) {
                  getQCNoDetails();
               }          
        }
   });



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 350,
        id : flxLedger,
        x: 300,
        y: 55,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'qc_rm_supcode',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_taxtag',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_wp_gst_dnote_yn',sortable:true,width:50,align:'left'},

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


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsRMImportGRN.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSupplierName.getRawValue(),
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
//                   cmbQCEntNo.focus();
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


var btnRounding = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "M",
    width   : 10,
    height  : 10,
 border: 0,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
               rounding = 1;

        }
    }
 });

var cmbPONO = new Ext.form.ComboBox({
        fieldLabel      : 'Po No',
        width           : 110,
        displayField    : 'ordh_no', 
        valueField      : 'ordh_seqno',
        hiddenName      : '',
        id              : 'cmbPONO',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : loadponodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
 	select: function(){
	tabgrn.setActiveTab(1); tabgrn.setActiveTab(0);

                poseqno = cmbPONO.getValue();  
		loadpoitemdatastore.removeAll();
		loadpoitemdatastore.load({
			url: 'ClsRMImportGRN.php',
			params:
			{
			    task:"loadpoitem",
			    compcode: GinCompcode,
			    finid: GinFinid,
			    ordcode: cmbPONO.getValue()
			},
			scope : this,
			callback : function()
			{

	                   var cnt=loadpoitemdatastore.getCount();

	                   if(cnt>0)
		           {
                                  for(var j=0; j<cnt; j++)
	                          { 
				     poitemcode = loadpoitemdatastore.getAt(j).get('itmh_code');
				     poitemrate = loadpoitemdatastore.getAt(j).get('ordt_unit_rate');



//alert(poitemrate);
			             var Row= flxDetail.getStore().getCount();
				     flxDetail.getSelectionModel().selectAll();
				     var sel=flxDetail.getSelectionModel().getSelections();
				     for(var i=0;i<Row;i++)
                                     {
					  if ( Number(sel[i].data.itemcode) == poitemcode)
                                          {
                                                acceptedqty = Number(sel[i].get('grnqty'));
     //                                      	colname = 'itemrate';		
                                                sel[i].set('itemrate', poitemrate);
                                                sel[i].set('itemvalue', poitemrate*acceptedqty);

                                          }                 
                          	     }


                                  }
       //                           grid_tot();

                           } 
//               grid_total(); 
		        }     
		});



	}
	}


   });



var tabgrn = new Ext.TabPanel({
    id          : 'GRN',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 670,
    width       : 1300,
    x           : 2,
    items       : [
        {
            xtype: 'panel',
            title: 'Item & Tax Details',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
             flxLedger,

           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 1260,
           height      : 320,
           x           : 10,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 220,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbPONO]
                            },


			

                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 220,
                                	x           : 230,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtbillno]
                            },
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 260,
                                	x           : 475,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtpbilldate]
                            },


                            {  
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 320,
                                	x           : 700,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtBillValue]
                            },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 220,
                                	x           : 950,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtCrdays]
                            },

        
				 {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 700,
		                    x           : 475,
		                    y           : 20,
		                    border      : false,
		                    items: [cmbPurchaseLedger]
		                },
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 290,
                                	x           : 950,
                                	y           : 20,
                                    	border      : false,
                                	items: [cmbPayMode]
                            },

                            flxDetail,

           ]       
           }, 


	                { xtype   : 'fieldset',
	                title   : '',
        	        layout  : 'hbox',
        	        border  : true,
        	        height  : 150,
        	        width   : 1260,
			style:{ border:'1px solid red',color:' #581845 '},
        	        layout  : 'absolute',
        	        x       : 10,
        	        y       : 180,
        	        items:[
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemqty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 270,
                                	y           : -10,
                                    	border      : false,
                                	items: [txttotitemval]
                            },
                            optRounding,		 


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtlandingcost]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtroundoff]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 50,
                                	x           : 1150,
                                	y           : 25,
                                    	border      : false,
                                	items: [btnRounding]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 900,
                                	y           : 55,
                                    	border      : false,
                                	items: [txttotgrnval]
                            },



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtRemarks]
                            },




]
}  
            ]    
          },

        {
            xtype: 'panel',
            title: 'Ledger Posting',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
                   flxAccounts,
		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 350,
		        x: 100,
		        y: 260,
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
		        y: 260,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtTotCredit]
		    }, 

            ]
        }, 



        {
            xtype: 'panel',
            id   : 'tab3', 
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
       ]
 });

   var TrnGrnformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'IMPORT GRN ENTRY',
        header      : false,
        width       : 100,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
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
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
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
     //       icon: '/SHVPM/Pictures/add.png',
            listeners:{
                click: function () {
			gstFlag = "Add";
	//		Ext.getCmp('txtGRNNo').setDisabled(true);
			Ext.getCmp('txtGRNNo').show();
			Ext.getCmp('cmbGRNNo').hide();		


			loadGRNNoDatastore.removeAll();
			loadGRNNoDatastore.load({
                        	 url:'ClsRMImportGRN.php',
                        	 params:
                       		 {
                         	 task:"loadgrnno",
				 finid : GinFinid,
				 compcode : GinCompcode,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{
				txtGRNNo.setValue(loadGRNNoDatastore.getAt(0).get('grnno'));
				}
				 });



                }
            }
        },'-',
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
	    //disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";
			flxDetail.getStore().removeAll();
			Ext.getCmp('txtGRNNo').hide();
			Ext.getCmp('cmbGRNNo').setDisabled(false);
			Ext.getCmp('cmbGRNNo').show();
    		
			loadGRNNoDatastore.removeAll();
			loadGRNNoDatastore.load({
				url:'ClsRMImportGRN.php',
				params:
				{
					task:"loadgrnno",
					finid : GinFinid,
					compcode : GinCompcode,
					gstFlag : gstFlag
				},
				callback:function()
				{
					cmbGRNNo.setValue(loadGRNNoDatastore.getAt(0).get('rech_seqno'));
				}
			});

			//RefreshData();

                }
            }
        },'-',
        
       {    
//SAVE
                    text: 'Save',
                    id	:  'save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
  
			var gstSave;
	                    gstSave="true";

			    fromdate = "04/01/"+gstfinyear.substring(0,4);
			    todate = "03/31/"+gstfinyear.substring(5,9);


			    if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
				    Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
				gstSave="false";
			    }

			    if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
				    Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
				gstSave="false";
			    }




        	            if (supcode==0 || txtSupplierName.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Select Party Name');
        	                gstSave="false";
        	            }
        	            else if (txtbillno.getRawValue()=="" || txtbillno.getRawValue()==0)
        	            {
        	                Ext.Msg.alert('GRN','Enter Bill No');
        	                gstSave="false";
        	            }    
        	            else if (txtBillValue.getRawValue()=="" || txtBillValue.getRawValue()==0)
        	            {
        	                Ext.Msg.alert('GRN','Enter Party Bill Value');
        	                gstSave="false";
        	            }  
/*
                 
        	            else if (cmbArea.getRawValue()=="" || cmbArea.getRawValue()==0)
        	            {
        	                Ext.Msg.alert('GRN','Select Loading Area,');
                                cmbArea.focus();
        	                gstSave="false";
        	            }     
*/
        	            else if (cmbPurchaseLedger.getRawValue()=="" || cmbPurchaseLedger.getRawValue()==0)
        	            {
        	                Ext.Msg.alert('GRN','Select Purchase Ledger ..,');
                                cmbArea.focus();
        	                gstSave="false";
        	            } 

        	            else if (cmbPONO.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Select PO Number,');
                                cmbPONO.focus();
        	                gstSave="false";
        	            }   
        	            else if (cmbPayMode.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Select Payment mode,');
                                cmbPayMode.focus();
        	                gstSave="false";
        	            }   
                            
        	            else if (txtCrdays.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','Enter Payment Terms,');
                                txtCrdays.focus();
        	                gstSave="false";
        	            }      
        	            else if (txttotgrnval.getValue()=="")
        	            {
        	                Ext.Msg.alert('GRN','GRN Amount is Empty,');
                                txtCrdays.focus();
        	                gstSave="false";
        	            } 
        	            else if (Number(txttotgrnval.getValue()) > Number(txtBillValue.getValue()))
        	            {
        	                Ext.Msg.alert('GRN','Total GRN Value should not less than Party Bill Value');
                                txtBillValue.focus();
        	                gstSave="false";
        	            }   
			    else if (flxDetail.rows==0)
        	            {
        	                Ext.Msg.alert('GRN','Grid should not be empty');
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
if (gstFlag === "Add"){ flxDetail.getSelectionModel().selectAll(); 
}
                          
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
	


                            Ext.Ajax.request({
                            url: 'TrnRMImportGRNSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(grnupdData),
             			cnt:grnData.length,

			     	griddetacc      : Ext.util.JSON.encode(accupdData),                          
				cntacc		: accData.length,


				gstFlaggrn : gstFlag,                                 
				compcode:GinCompcode,
                                finid:GinFinid,
                                seqno  : seqno,
				edgrnno: txtGRNNo.getRawValue(),
				edpono:  0,// edpono,
                                supcode : supcode,
				ordseqno : poseqno,
				crdays   : txtCrdays.getValue(),
				grndate: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
                                qcinsno  : qclnolist,
				areacode : 6,
                                areagrpcode : 6,
                                truck   : '',
				freighttype: 'I',
			        accseqno : accseqno,
				itemval : txttotitemval.getValue(),

				sgstper: 0,
				sgstamt: 0,
				cgstper : 0,
				cgstamt : 0,
				igstper : 0,
				igstamt : 0,
				tcsper : 0,
				tcsamt: 0,	
				freight:  0,
                                otheramt : 0,
				roundoff: txtroundoff.getValue(),
				totamt: txttotgrnval.getValue(),
				billno: txtbillno.getValue(),
				billdate:Ext.util.Format.date(dtpbilldate.getValue(),"Y-m-d"),
				billval: txtBillValue.getValue(),

				frvouno:0,
				vouno:0,
				acctflag:'',
				accdate:'',
				status:'',
				usrcode:GinUserid,
				entrydate: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
				gateentryno: '0',
				gatedate: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
                                roundneed : roundoff,
                                purledger : cmbPurchaseLedger.getValue(),
                                ticketnolist : ticketnolist,
                                paymode : cmbPayMode.getRawValue(), 
                                remarks   : txtRemarks.getRawValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{  
                                    RefreshData();                              
                                    Ext.MessageBox.alert("GRN SAVED No.-" + obj['GRNNo']);
                                    flxDetail.getStore().removeAll();
                                    flxAccounts.getStore().removeAll();
                                    flxQCNoList.getStore().removeAll();
                                    RefreshData();

                                  }else
					{
			Ext.MessageBox.alert("GRN Not Saved! Pls Check!- " + obj['GRNNo']);                                                  
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

                       {
//VIEW
                    text: 'View',
                    id	:  'view',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

		        printtype = "PDF";
		 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&grnno=" + encodeURIComponent(cmbGRNNo.getRawValue());
			var param = (p1+p2+p3) ;   
		        if (printtype == "PDF")                       
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param); 
		        else

			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param); 
		           
                        }  
                    }

                },
     
  
                             
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
TrnGrnformpanel.getForm().reset();
                            RefreshData();
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
           width       : 1260,
           height      : 170,
           x           : 10,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[
                 flxQCNoList,

                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 250,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtGRNNo]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 250,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [cmbGRNNo]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 250,
                        	x           : 0,
                        	y           : 40,
                            	border      : false,
                        	items: [dtpGRNDate]
                    },
                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 500,
                        	x           : 200,
                        	y           : 0,
                            	border      : false,
                        	items: [txtSupplierName]
                    },

                  { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
                        	width       : 250,
                        	x           : 900,
                        	y           : 112,
                            	border      : false,
                        	items: [txtTotTicketWT]
                    },



           ]    
        }, 
         

           { 
                	xtype       : 'fieldset',
                	title       : '',
                	labelWidth  : 80,
                	width       : 1300,
                	x           : 0,
                	y           : 170,
                    	border      : false,
                	items: [tabgrn]
            },

       flxLedger,

       ]
    });
    
   
function RefreshData(){
    flxLedger.hide();
     gstFlag = "Add";
//			Ext.getCmp('txtGRNNo').setDisabled(true);
			Ext.getCmp('txtGRNNo').show();
			Ext.getCmp('cmbGRNNo').hide();
//			Ext.getCmp('txtlifelessqty').hide();

    seqno = 0;
    poseqno = 0;

	txtSupplierName.setRawValue('');
	txtbillno.setRawValue('');
	txtBillValue.setRawValue('');

	txtCrdays.setRawValue('');

	txtTotDebit.setRawValue('');
	txtTotCredit.setRawValue('');
	txtRemarks.setRawValue('');
	txttotitemqty.setRawValue('');
	txttotitemval.setRawValue('');

	txtlandingcost.setRawValue('');
	txttotgrnval.setRawValue('');
	txtroundoff.setRawValue('');
        cmbPayMode.setRawValue('');
        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();

			loadGRNNoDatastore.removeAll();
			loadGRNNoDatastore.load({
                        	 url:'ClsRMImportGRN.php',
                        	 params:
                       		 {
                         	 task:"loadgrnno",
				 finid : GinFinid,
				 compcode : GinCompcode,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{
//				txtGRNNo.setValue(loadGRNNoDatastore.getAt(0).get('grnno'));
                                  if (GinFinid >= 24)  
                                  {    
//alert(loadGRNNoDatastore.getAt(0).get('grnno')); 
                                     var vno = "000"+loadGRNNoDatastore.getAt(0).get('grnno'); 
//alert(vno);  
                                     vno =  "WP"+vno.slice(-4);  
//alert(vno);
  	                             txtGRNNo.setValue(vno);
                                  }
                                  else
                                  {
                                     txtGRNNo.setValue(loadgrnnodatastore.getAt(0).get('grnno'));
                                  }  

				}
				 });


}

    var TrnGrnWindow = new Ext.Window({
	height      : 620,
        width       : 1300,
        y           : 25,
        title       : 'GRN',
        items       : TrnGrnformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	onEsc: function() {

	},
	listeners:{



               show:function(){

	              RefreshData();		
		}
       }  
    });
    TrnGrnWindow.show();  
});
